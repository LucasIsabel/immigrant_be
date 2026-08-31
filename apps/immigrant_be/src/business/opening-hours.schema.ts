import { BadRequestException } from '@nestjs/common';
import { z } from 'zod';

/**
 * A semana de funcionamento de um negócio.
 *
 * Substitui duas strings livres (`weekdays` / `weekend`) que uma máscara
 * reduzia a uma única janela `HH:MM - HH:MM`: o dono digitava
 * `12:00 – 15:00 e 19:00 – 23:00 (fechado à segunda)` e o campo guardava
 * `12:00 - 15:00`. Serviço partido almoço/jantar — a norma em Portugal e no
 * Brasil — e dia de fechamento não tinham como ser expressos.
 *
 * Mora numa coluna própria do `Business`, e não no `typeData`, por dois
 * motivos: os três tipos que mostram horário tinham cada um a sua gambiarra, e
 * horário é **fato**, não conteúdo editorial — tirá-lo do conteúdo moderado faz
 * corrigir um horário deixar de exigir re-moderação da página.
 */

/** `HH:MM` em 24h. */
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

const intervalSchema = z.object({
  open: z.string().regex(TIME, 'use HH:MM'),
  close: z.string().regex(TIME, 'use HH:MM'),
});

export type OpeningInterval = z.infer<typeof intervalSchema>;

/** Minutos desde a meia-noite. */
export function toMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * O intervalo atravessa para o dia seguinte.
 *
 * `19:00 – 02:00` no sábado quer dizer aberto até domingo às 02:00. É a regra
 * que quebra a comparação ingênua `abre ≤ agora ≤ fecha`, e por isso ela vive
 * no schema, junto do dado, em vez de em cada leitor.
 */
export function crossesMidnight(interval: OpeningInterval): boolean {
  return toMinutes(interval.close) < toMinutes(interval.open);
}

/**
 * Um dia: fechado, ou uma lista de intervalos.
 *
 * O dia **ausente** não é fechado — é "não informado", e a diferença importa:
 * um negócio que não preencheu domingo não deve ser anunciado como fechado no
 * domingo. Quem lê responde `unknown`, não `closed`.
 */
const dayScheduleSchema = z.discriminatedUnion('closed', [
  z.object({ closed: z.literal(true) }),
  z.object({
    closed: z.literal(false),
    intervals: z
      .array(intervalSchema)
      // Quatro é folgado para o mundo real (café da manhã, almoço, jantar e
      // uma madrugada) e finito o bastante para o payload não crescer sozinho.
      .min(1, 'um dia aberto precisa de pelo menos um intervalo')
      .max(4, 'no máximo 4 intervalos por dia'),
  }),
]);

export type DaySchedule = z.infer<typeof dayScheduleSchema>;

export const WEEKDAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;

export type Weekday = (typeof WEEKDAYS)[number];

const weeklyScheduleShape = Object.fromEntries(
  WEEKDAYS.map((day) => [day, dayScheduleSchema.optional()]),
) as Record<Weekday, z.ZodOptional<typeof dayScheduleSchema>>;

export const weeklyScheduleSchema = z
  .object(weeklyScheduleShape)
  .superRefine((week, ctx) => {
    for (const day of WEEKDAYS) {
      const schedule = week[day];
      if (!schedule || schedule.closed) continue;

      schedule.intervals.forEach((interval, index) => {
        const isLast = index === schedule.intervals.length - 1;

        // Só o último intervalo pode atravessar. Um do meio atravessando
        // significaria dois intervalos ocupando o mesmo minuto do dia seguinte,
        // e não há como decidir qual deles vale.
        if (crossesMidnight(interval) && !isLast) {
          ctx.addIssue({
            code: 'custom',
            path: [day, 'intervals', index],
            message: 'só o último intervalo do dia pode virar a meia-noite',
          });
        }

        if (
          !crossesMidnight(interval) &&
          toMinutes(interval.close) === toMinutes(interval.open)
        ) {
          ctx.addIssue({
            code: 'custom',
            path: [day, 'intervals', index],
            message: 'o intervalo abre e fecha no mesmo minuto',
          });
        }

        // Ordenados e sem sobreposição: dois intervalos que se cruzam são um
        // intervalo escrito errado, e aceitá-los faria a contagem de horas
        // abertas depender de qual leitor está perguntando.
        const previous = schedule.intervals[index - 1];
        if (previous && toMinutes(interval.open) < toMinutes(previous.close)) {
          ctx.addIssue({
            code: 'custom',
            path: [day, 'intervals', index],
            message: 'os intervalos precisam estar em ordem e sem sobreposição',
          });
        }
      });
    }
  });

export type WeeklySchedule = z.infer<typeof weeklyScheduleSchema>;

/** 400 nomeando o dia e o intervalo se a semana não fizer sentido. */
export function validateOpeningHours(value?: unknown) {
  if (value === undefined || value === null) return;

  const result = weeklyScheduleSchema.safeParse(value);
  if (result.success) return;

  const message = result.error.issues
    .map((issue) => {
      const path = issue.path
        .map((segment) =>
          typeof segment === 'number' ? `[${segment}]` : `.${String(segment)}`,
        )
        .join('')
        .replace(/^\./, '');
      return path ? `${path}: ${issue.message}` : issue.message;
    })
    .join('; ');

  throw new BadRequestException({ message });
}
