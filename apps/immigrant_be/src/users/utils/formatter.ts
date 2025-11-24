import { ImmigrationVisaType, Prisma } from 'generated/prisma';
import {
  PlanResponseDto,
  PlanStatus,
  ImmigrationVisaTypeDto,
} from '../dto/plan-response.dto';
import z from 'zod';
import { JsonValue } from 'generated/prisma/runtime/library';

export const countrySuggestionSchema = z.object({
  cities: z.array(z.string()).min(1),
  country: z.string().min(1),
  reasons: z.array(z.string()).min(1),
  languages: z.array(z.string()).min(1),
  country_id: z.string().uuid(),
  difficulty: z.enum(['Low', 'Medium', 'High']),
  job_market: z.enum(['Low', 'Medium', 'High']),
  health_care: z.enum(['Low', 'Medium', 'High']),
  country_flag: z.string(),
  visa_options: z.array(z.string()).min(1),
  compatibility: z.number().min(0).max(100),
  education_quality: z.enum(['Low', 'Medium', 'High']),
  country_background: z.string().url(),
  investment_required: z.string(),
  average_visa_processing_time: z.string(),
});

export type CountrySuggestion = z.infer<typeof countrySuggestionSchema>;

type PlanWithRelations = Prisma.PlansGetPayload<{
  include: {
    country: true;
    suggestion: true;
    user: true;
    selected_visa_type: true;
  };
}>;

const getSuggestionSchema = (json: JsonValue | null) => {
  console.log('json', typeof json);

  if (!json || typeof json !== 'object') {
    return null;
  }
  return {
    target: json?.['average_visa_processing_time'],
    budget: json?.['investment_required'],
    compatibility: json?.['compatibility'],
  };
};

const formatVisaTypes = (
  visaTypes: ImmigrationVisaType[],
): ImmigrationVisaTypeDto[] => {
  return visaTypes.map((visaType) => ({
    id: visaType.id,
    category: visaType.category,
    description: visaType.description,
    source: visaType.source,
    country_id: visaType.country_id,
    steps: visaType.steps,
  }));
};

export const formatPlanResponse = (
  data: PlanWithRelations,
  visaTypes: ImmigrationVisaType[],
): PlanResponseDto => {
  const suggestion = getSuggestionSchema(data.selected_suggestion);

  debugger;

  return {
    progress: data.progress ?? 0,
    start_date: data.created_at ?? new Date(),
    estimated_end_date: data.country?.processing_time,
    time_to_complete: data.country?.processing_time,
    status: data.status as PlanStatus,
    description: data.description ?? undefined,
    target: suggestion?.target,
    budget: suggestion?.budget,
    english_level: undefined,
    family_members: undefined,
    visa_types: formatVisaTypes(visaTypes),
    flag: data.country?.flag,
    country_name: data.country?.name,
    selected_visa_type: data.selected_visa_type?.category,
    questions: data.steps,
  };
};
