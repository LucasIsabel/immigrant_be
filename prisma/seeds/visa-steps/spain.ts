import type { CountryVisaSteps } from './types';

/**
 * Steps for Spain.
 *
 * These sets were already live in production before this file existed — they
 * were created through the admin screen, which stores raw JSON and validates
 * nothing. Importing them verbatim makes the seed the source of truth without
 * regressing copy that is already in front of users.
 */
export const spain: CountryVisaSteps = {
  'Long-Stay / National Visa (Type D) / Residence Permit': {
    core_documents: [
      {
        en: [
          'Passport valid for at least 1 year',
          'Must contain at least two blank pages.',
        ],
        pt: [
          'Passaporte com validade mínima de 1 ano',
          'Precisa ter pelo menos duas páginas em branco.',
        ],
        es: [
          'Pasaporte con vigencia mínima de 1 año',
          'Debe tener al menos dos páginas en blanco.',
        ],
      },
      {
        en: [
          'National visa application form',
          'Solicitud de visado nacional, completed and signed on every page.',
        ],
        pt: [
          'Formulário de visto nacional',
          'Solicitud de visado nacional, preenchido e assinado em todas as páginas.',
        ],
        es: [
          'Formulario de visado nacional',
          'Solicitud de visado nacional, cumplimentada y firmada en todas las páginas.',
        ],
      },
      {
        en: [
          'Recent passport photograph',
          'White background, taken within the last 6 months.',
        ],
        pt: [
          'Foto recente tipo passaporte',
          'Fundo branco, tirada nos últimos 6 meses.',
        ],
        es: [
          'Fotografía reciente tipo carné',
          'Fondo blanco, tomada en los últimos 6 meses.',
        ],
      },
      {
        en: [
          'Criminal record certificate',
          'From every country of residence in the last 5 years, apostilled under the Hague Convention.',
        ],
        pt: [
          'Certidão de antecedentes criminais',
          'De todos os países de residência nos últimos 5 anos, apostilada pela Convenção de Haia.',
        ],
        es: [
          'Certificado de antecedentes penales',
          'De todos los países de residencia en los últimos 5 años, apostillado según el Convenio de La Haya.',
        ],
      },
      {
        en: [
          'Sworn translation into Spanish',
          'Every foreign document must be translated by a traductor jurado.',
        ],
        pt: [
          'Tradução juramentada para o espanhol',
          'Todo documento estrangeiro precisa ser traduzido por um traductor jurado.',
        ],
        es: [
          'Traducción jurada al español',
          'Todo documento extranjero debe ser traducido por un traductor jurado.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Letter of admission from a Spanish institution',
          'For the student route; the institution must be officially accredited.',
        ],
        pt: [
          'Carta de admissão de instituição espanhola',
          'Para a via de estudante; a instituição precisa ser oficialmente credenciada.',
        ],
        es: [
          'Carta de admisión de una institución española',
          'Para la vía de estudiante; la institución debe estar oficialmente acreditada.',
        ],
        required: false,
      },
      {
        en: [
          'Proof of full-time enrolment',
          'Stating the course duration and weekly hours.',
        ],
        pt: [
          'Comprovante de matrícula em tempo integral',
          'Indicando a duração do curso e a carga horária semanal.',
        ],
        es: [
          'Justificante de matrícula a tiempo completo',
          'Indicando la duración del curso y las horas semanales.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Homologation of foreign qualifications',
          'Required for regulated professions such as medicine, law and engineering.',
        ],
        pt: [
          'Homologação de diplomas estrangeiros',
          'Exigida para profissões regulamentadas como medicina, direito e engenharia.',
        ],
        es: [
          'Homologación de títulos extranjeros',
          'Exigida para profesiones reguladas como medicina, derecho e ingeniería.',
        ],
        priority: 3,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of sufficient means',
          'Calculated as a multiple of the IPREM; the multiplier depends on the residence route.',
        ],
        pt: [
          'Comprovação de meios suficientes',
          'Calculada como múltiplo do IPREM; o multiplicador depende da via de residência.',
        ],
        es: [
          'Prueba de medios económicos suficientes',
          'Se calcula como múltiplo del IPREM; el multiplicador depende de la vía de residencia.',
        ],
      },
      {
        en: [
          'Bank statements from the last 6 months',
          'Must show a stable balance, not a single recent deposit.',
        ],
        pt: [
          'Extratos bancários dos últimos 6 meses',
          'Precisam mostrar saldo estável, e não um único depósito recente.',
        ],
        es: [
          'Extractos bancarios de los últimos 6 meses',
          'Deben mostrar un saldo estable, no un único ingreso reciente.',
        ],
      },
      {
        en: [
          'Employment contract or scholarship letter',
          'For the work route or funded study.',
        ],
        pt: [
          'Contrato de trabalho ou carta de bolsa',
          'Para a via de trabalho ou estudo financiado.',
        ],
        es: [
          'Contrato de trabajo o carta de beca',
          'Para la vía laboral o para estudios financiados.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Book an appointment at the correct consulate',
          'You must apply at the consulate holding jurisdiction over your place of residence.',
        ],
        pt: [
          'Agendar no consulado correto',
          'É obrigatório aplicar no consulado com jurisdição sobre o seu local de residência.',
        ],
        es: [
          'Pedir cita en el consulado correcto',
          'Hay que solicitarlo en el consulado con jurisdicción sobre tu lugar de residencia.',
        ],
      },
      {
        en: [
          'Pay the visa fee',
          'The amount varies by nationality on a reciprocity basis.',
        ],
        pt: [
          'Pagar a taxa de visto',
          'O valor varia por nacionalidade, com base em reciprocidade.',
        ],
        es: [
          'Pagar la tasa del visado',
          'El importe varía por nacionalidad por criterio de reciprocidad.',
        ],
      },
      {
        en: [
          'Submit the application in person',
          'Decisions usually take between 1 and 3 months.',
        ],
        pt: [
          'Entregar a aplicação presencialmente',
          'A decisão costuma sair entre 1 e 3 meses.',
        ],
        es: [
          'Presentar la solicitud en persona',
          'La resolución suele tardar entre 1 y 3 meses.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Private health insurance',
          'Full coverage in Spain, no copayments and no waiting periods, from an insurer authorised to operate in Spain.',
        ],
        pt: [
          'Seguro de saúde privado',
          'Cobertura integral na Espanha, sem coparticipação e sem carência, de seguradora autorizada a operar no país.',
        ],
        es: [
          'Seguro médico privado',
          'Cobertura completa en España, sin copagos ni carencias, de una aseguradora autorizada a operar en el país.',
        ],
      },
      {
        en: [
          'Medical certificate',
          'Stating you carry no disease with public-health impact under the International Health Regulations 2005.',
        ],
        pt: [
          'Certificado médico',
          'Atestando que você não tem doença com impacto em saúde pública conforme o Regulamento Sanitário Internacional de 2005.',
        ],
        es: [
          'Certificado médico',
          'Que acredite que no padeces enfermedades con repercusión para la salud pública según el Reglamento Sanitario Internacional de 2005.',
        ],
      },
      {
        en: [
          'Fingerprint collection at the consulate',
          'Taken when the application is filed in person.',
        ],
        pt: [
          'Coleta de digitais no consulado',
          'Feita no momento da entrega presencial da aplicação.',
        ],
        es: [
          'Toma de huellas en el consulado',
          'Se realiza al presentar la solicitud en persona.',
        ],
        priority: 2,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the visa within 1 month of approval',
          'Failing to collect it in time voids the approval.',
        ],
        pt: [
          'Retirar o visto em até 1 mês da aprovação',
          'Não retirar no prazo anula a aprovação.',
        ],
        es: [
          'Recoger el visado en el plazo de 1 mes desde la aprobación',
          'No recogerlo a tiempo anula la concesión.',
        ],
      },
      {
        en: [
          'Travel to Spain within the visa validity',
          'The Type D visa usually allows entry within a 90-day window.',
        ],
        pt: [
          'Viajar para a Espanha dentro da validade do visto',
          'O visto Type D costuma permitir a entrada dentro de uma janela de 90 dias.',
        ],
        es: [
          'Viajar a España dentro de la vigencia del visado',
          'El visado Type D suele permitir la entrada dentro de una ventana de 90 días.',
        ],
      },
      {
        en: [
          'Apply for the TIE within 30 days of arrival',
          'Tarjeta de Identidad de Extranjero, requested at the Oficina de Extranjería or a police station.',
        ],
        pt: [
          'Solicitar o TIE em até 30 dias da chegada',
          'Tarjeta de Identidad de Extranjero, pedida na Oficina de Extranjería ou em delegacia.',
        ],
        es: [
          'Solicitar el TIE en los 30 días siguientes a la llegada',
          'Tarjeta de Identidad de Extranjero, que se pide en la Oficina de Extranjería o en comisaría.',
        ],
      },
      {
        en: [
          'Register on the padrón municipal',
          'Empadronamiento at your local town hall; needed for healthcare and many other formalities.',
        ],
        pt: [
          'Registrar-se no padrón municipal',
          'Empadronamiento na prefeitura local; necessário para saúde pública e várias outras formalidades.',
        ],
        es: [
          'Empadronarse en el padrón municipal',
          'Empadronamiento en tu ayuntamiento; necesario para la sanidad y muchos otros trámites.',
        ],
        priority: 2,
      },
      {
        en: [
          'Register with Social Security',
          'Required if you will be working, whether employed or self-employed (autónomo).',
        ],
        pt: [
          'Inscrever-se na Seguridad Social',
          'Exigido se você for trabalhar, como empregado ou como autônomo.',
        ],
        es: [
          'Darse de alta en la Seguridad Social',
          'Obligatorio si vas a trabajar, por cuenta ajena o como autónomo.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
  'Short-Stay Visa (Schengen Type C)': {
    core_documents: [
      {
        en: [
          'Passport issued within the last 10 years',
          'Valid for at least 3 months beyond the intended departure from the Schengen area, with two blank pages.',
        ],
        pt: [
          'Passaporte emitido nos últimos 10 anos',
          'Válido por pelo menos 3 meses além da data prevista de saída do espaço Schengen, com duas páginas em branco.',
        ],
        es: [
          'Pasaporte expedido en los últimos 10 años',
          'Vigente al menos 3 meses más allá de la fecha prevista de salida del espacio Schengen, con dos páginas en blanco.',
        ],
      },
      {
        en: [
          'Completed Schengen visa application form',
          'Signed by the applicant; by both parents in the case of minors.',
        ],
        pt: [
          'Formulário de visto Schengen preenchido',
          'Assinado pelo requerente; por ambos os pais no caso de menores.',
        ],
        es: [
          'Formulario de visado Schengen cumplimentado',
          'Firmado por el solicitante; por ambos progenitores en el caso de menores.',
        ],
      },
      {
        en: [
          'Two recent biometric photographs',
          'White background, taken within the last 6 months.',
        ],
        pt: [
          'Duas fotos biométricas recentes',
          'Fundo branco, tiradas nos últimos 6 meses.',
        ],
        es: [
          'Dos fotografías biométricas recientes',
          'Fondo blanco, tomadas en los últimos 6 meses.',
        ],
      },
      {
        en: [
          'Round-trip travel reservation',
          'A booking is enough; do not buy the ticket before the visa is granted.',
        ],
        pt: [
          'Reserva de passagem de ida e volta',
          'Basta a reserva; não compre a passagem antes da concessão do visto.',
        ],
        es: [
          'Reserva de viaje de ida y vuelta',
          'Basta con la reserva; no compres el billete antes de la concesión del visado.',
        ],
      },
      {
        en: [
          'Proof of accommodation',
          'Hotel bookings for the whole trip, or a carta de invitación issued by a police station in Spain.',
        ],
        pt: [
          'Comprovação de hospedagem',
          'Reservas de hotel para toda a viagem ou carta de invitación emitida por delegacia na Espanha.',
        ],
        es: [
          'Justificante de alojamiento',
          'Reservas de hotel para todo el viaje o carta de invitación expedida por una comisaría en España.',
        ],
      },
      {
        en: [
          'Copies of previous Schengen visas',
          'Help demonstrate a history of compliance with the 90/180 rule.',
        ],
        pt: [
          'Cópias de vistos Schengen anteriores',
          'Ajudam a demonstrar histórico de cumprimento da regra 90/180.',
        ],
        es: [
          'Copias de visados Schengen anteriores',
          'Ayudan a demostrar un historial de cumplimiento de la regla 90/180.',
        ],
        priority: 3,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of economic means',
          'Spain sets a minimum amount per person per day plus an overall minimum per trip.',
        ],
        pt: [
          'Comprovação de meios econômicos',
          'A Espanha define um valor mínimo por pessoa por dia mais um mínimo global por viagem.',
        ],
        es: [
          'Prueba de medios económicos',
          'España fija una cantidad mínima por persona y día más un mínimo global por viaje.',
        ],
      },
      {
        en: [
          'Bank statements from the last 3 to 6 months',
          'Stamped by the bank or downloaded with a verification code.',
        ],
        pt: [
          'Extratos bancários dos últimos 3 a 6 meses',
          'Carimbados pelo banco ou baixados com código de verificação.',
        ],
        es: [
          'Extractos bancarios de los últimos 3 a 6 meses',
          'Sellados por el banco o descargados con código de verificación.',
        ],
      },
      {
        en: [
          'Employment letter or proof of income',
          'Confirming your position, salary and approved leave dates.',
        ],
        pt: [
          'Carta do empregador ou comprovação de renda',
          'Confirmando cargo, salário e período de férias aprovado.',
        ],
        es: [
          'Carta de la empresa o justificante de ingresos',
          'Confirmando tu puesto, salario y las fechas de vacaciones aprobadas.',
        ],
        priority: 2,
      },
      {
        en: [
          'Sponsorship letter',
          'If a third party is paying for the trip, with their own financial documents attached.',
        ],
        pt: [
          'Carta de patrocínio',
          'Se um terceiro estiver custeando a viagem, acompanhada dos documentos financeiros dele.',
        ],
        es: [
          'Carta de patrocinio',
          'Si un tercero costea el viaje, acompañada de su propia documentación financiera.',
        ],
        priority: 3,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply within the allowed window',
          'No earlier than 6 months before travel and no later than 15 days before departure.',
        ],
        pt: [
          'Aplicar dentro da janela permitida',
          'No máximo 6 meses antes da viagem e no mínimo 15 dias antes do embarque.',
        ],
        es: [
          'Solicitar dentro del plazo permitido',
          'Como máximo 6 meses antes del viaje y como mínimo 15 días antes de la salida.',
        ],
      },
      {
        en: [
          'Book an appointment at the consulate or external provider',
          'Spain uses providers such as BLS and VFS Global in several countries.',
        ],
        pt: [
          'Agendar no consulado ou no prestador externo',
          'A Espanha usa prestadores como BLS e VFS Global em vários países.',
        ],
        es: [
          'Pedir cita en el consulado o en el proveedor externo',
          'España utiliza proveedores como BLS y VFS Global en varios países.',
        ],
      },
      {
        en: [
          'Pay the Schengen visa fee',
          'EUR 90 for adults and EUR 45 for children aged 6 to 11; under 6 are exempt.',
        ],
        pt: [
          'Pagar a taxa do visto Schengen',
          'EUR 90 para adultos e EUR 45 para crianças de 6 a 11 anos; menores de 6 são isentos.',
        ],
        es: [
          'Pagar la tasa del visado Schengen',
          '90 EUR para adultos y 45 EUR para menores de 6 a 11 años; los menores de 6 están exentos.',
        ],
      },
      {
        en: [
          'Attend the appointment with the full document set',
          'Missing documents usually mean the file is not accepted on the day.',
        ],
        pt: [
          'Comparecer ao agendamento com o conjunto completo de documentos',
          'Documento faltando normalmente significa que o processo não é aceito no dia.',
        ],
        es: [
          'Acudir a la cita con el expediente completo',
          'Si falta documentación, normalmente no admiten el expediente ese día.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Travel medical insurance',
          'Minimum coverage of EUR 30,000, valid across the entire Schengen area for the whole trip.',
        ],
        pt: [
          'Seguro viagem médico',
          'Cobertura mínima de EUR 30.000, válida em todo o espaço Schengen durante toda a viagem.',
        ],
        es: [
          'Seguro médico de viaje',
          'Cobertura mínima de 30.000 EUR, válida en todo el espacio Schengen durante todo el viaje.',
        ],
      },
      {
        en: [
          'Fingerprint collection',
          'Taken at the consulate or the external provider; reusable for 59 months once on file.',
        ],
        pt: [
          'Coleta de impressões digitais',
          'Feita no consulado ou no prestador externo; reaproveitável por 59 meses depois de registrada.',
        ],
        es: [
          'Toma de huellas dactilares',
          'Se realiza en el consulado o en el proveedor externo; reutilizable durante 59 meses una vez registrada.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Check the visa sticker carefully',
          'Confirm the validity dates, the number of entries and the number of authorised days.',
        ],
        pt: [
          'Conferir o adesivo do visto com atenção',
          'Confirme as datas de validade, o número de entradas e a quantidade de dias autorizados.',
        ],
        es: [
          'Revisar con atención la etiqueta del visado',
          'Confirma las fechas de vigencia, el número de entradas y los días autorizados.',
        ],
      },
      {
        en: [
          'Respect the 90/180 rule',
          'Maximum 90 days in any rolling 180-day period across the whole Schengen area, not just Spain.',
        ],
        pt: [
          'Respeitar a regra 90/180',
          'No máximo 90 dias a cada período móvel de 180 dias em todo o espaço Schengen, não só na Espanha.',
        ],
        es: [
          'Respetar la regla 90/180',
          'Máximo 90 días en cualquier período móvil de 180 días en todo el espacio Schengen, no solo en España.',
        ],
      },
      {
        en: [
          'Carry the supporting documents at the border',
          'The visa authorises travel; the border officer still decides on admission.',
        ],
        pt: [
          'Levar os documentos comprobatórios na fronteira',
          'O visto autoriza a viagem; quem decide a entrada ainda é o agente de fronteira.',
        ],
        es: [
          'Llevar la documentación de apoyo en la frontera',
          'El visado autoriza el viaje; la admisión la decide el agente fronterizo.',
        ],
        priority: 2,
      },
    ],
  },

  'Permanent Residence / EU Long-Term Resident': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Plus every TIE card issued during the period of residence.',
        ],
        pt: [
          'Passaporte válido',
          'Além de todos os cartões TIE emitidos durante o período de residência.',
        ],
        es: [
          'Pasaporte vigente',
          'Además de todas las tarjetas TIE emitidas durante el periodo de residencia.',
        ],
      },
      {
        en: [
          'Form EX-11, completed',
          'The specific form for long-term residence. Using the wrong EX form gets the file returned.',
        ],
        pt: [
          'Formulário EX-11 preenchido',
          'É o formulário específico da residência de longa duração. Usar o EX errado faz o processo ser devolvido.',
        ],
        es: [
          'Formulario EX-11 cumplimentado',
          'Es el formulario específico de la residencia de larga duración. Usar el EX equivocado hace que devuelvan el expediente.',
        ],
      },
      {
        en: [
          'Proof of five years of continuous legal residence',
          'Absences must not exceed six consecutive months, nor ten months in total across the five years.',
        ],
        pt: [
          'Comprovação de cinco anos de residência legal contínua',
          'As ausências não podem passar de seis meses seguidos, nem de dez meses somados ao longo dos cinco anos.',
        ],
        es: [
          'Prueba de cinco años de residencia legal continuada',
          'Las ausencias no pueden superar seis meses seguidos, ni diez meses sumados a lo largo de los cinco años.',
        ],
      },
      {
        en: [
          'Certificate of registration on the padrón',
          'The empadronamiento is what documents where and since when you have lived somewhere.',
        ],
        pt: [
          'Certificado de empadronamiento',
          'É o empadronamiento que documenta onde e desde quando você mora.',
        ],
        es: [
          'Certificado de empadronamiento',
          'El empadronamiento es lo que documenta dónde y desde cuándo vive.',
        ],
      },
      {
        en: [
          'Three recent passport photographs',
          'To Spanish specification, on a white background.',
        ],
        pt: [
          'Três fotografias recentes tipo passe',
          'No padrão espanhol, em fundo branco.',
        ],
        es: [
          'Tres fotografías recientes tipo carné',
          'Según el estándar español, con fondo blanco.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of income over the period',
          'Employment contracts, payslips or self-employed returns covering the five years.',
        ],
        pt: [
          'Comprovação de renda ao longo do período',
          'Contratos de trabalho, holerites ou declarações de autônomo cobrindo os cinco anos.',
        ],
        es: [
          'Prueba de ingresos a lo largo del periodo',
          'Contratos de trabajo, nóminas o declaraciones de autónomo que cubran los cinco años.',
        ],
      },
      {
        en: [
          'Social security contribution history',
          'The vida laboral report, which also evidences the continuity of your residence.',
        ],
        pt: [
          'Histórico de contribuições à seguridade social',
          'O relatório de vida laboral, que também comprova a continuidade da residência.',
        ],
        es: [
          'Historial de cotizaciones a la seguridad social',
          'El informe de vida laboral, que además acredita la continuidad de la residencia.',
        ],
      },
      {
        en: [
          'Tax situation in order',
          'No outstanding debts with the tax agency or with social security.',
        ],
        pt: [
          'Situação fiscal regularizada',
          'Sem débitos pendentes com a agência tributária nem com a seguridade social.',
        ],
        es: [
          'Situación fiscal regularizada',
          'Sin deudas pendientes con la agencia tributaria ni con la seguridad social.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply at the Oficina de Extranjería',
          'Filed inside Spain, in the province where you live, with a prior appointment.',
        ],
        pt: [
          'Submeter o pedido na Oficina de Extranjería',
          'Feito dentro da Espanha, na província onde você mora, com cita previa.',
        ],
        es: [
          'Presentar la solicitud en la Oficina de Extranjería',
          'Se hace dentro de España, en la provincia donde reside, con cita previa.',
        ],
      },
      {
        en: [
          'Pay the tasa modelo 790 código 052',
          'Paid at a bank before submission; take the stamped receipt with the file.',
        ],
        pt: [
          'Pagar a tasa modelo 790 código 052',
          'Paga no banco antes da entrega; leve o comprovante carimbado junto do processo.',
        ],
        es: [
          'Pagar la tasa modelo 790 código 052',
          'Se paga en el banco antes de presentar; lleve el justificante sellado con el expediente.',
        ],
      },
      {
        en: [
          'Apply before the current card expires',
          'Filing late turns a renewal into an irregularity, and the five-year count can be lost.',
        ],
        pt: [
          'Pedir antes de o cartão atual vencer',
          'Pedir com atraso transforma uma renovação em irregularidade, e a contagem dos cinco anos pode se perder.',
        ],
        es: [
          'Solicitar antes de que caduque la tarjeta actual',
          'Solicitar tarde convierte una renovación en irregularidad, y el cómputo de los cinco años puede perderse.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprinting appointment for the TIE',
          'Booked separately, after the application is approved.',
        ],
        pt: [
          'Cita para a toma de huellas do TIE',
          'Agendada à parte, depois de o pedido ser aprovado.',
        ],
        es: [
          'Cita para la toma de huellas del TIE',
          'Se reserva aparte, después de que aprueben la solicitud.',
        ],
      },
      {
        en: [
          'Registration with the public health system',
          'Evidence of it also helps to demonstrate continuity of residence.',
        ],
        pt: [
          'Inscrição no sistema público de saúde',
          'O comprovativo também ajuda a demonstrar continuidade de residência.',
        ],
        es: [
          'Inscripción en el sistema público de salud',
          'El comprobante también ayuda a demostrar la continuidad de la residencia.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the long-term residence TIE',
          'The card is renewed every five years, but the right itself no longer expires.',
        ],
        pt: [
          'Retirar o TIE de longa duração',
          'O cartão é renovado a cada cinco anos, mas o direito em si já não caduca.',
        ],
        es: [
          'Recoger el TIE de larga duración',
          'La tarjeta se renueva cada cinco años, pero el derecho en sí ya no caduca.',
        ],
      },
      {
        en: [
          'Note that long absences can still cost the status',
          'Twelve consecutive months outside the European Union, or six years outside Spain, ends it.',
        ],
        pt: [
          'Saber que ausências longas ainda podem custar o estatuto',
          'Doze meses seguidos fora da União Europeia, ou seis anos fora da Espanha, o extinguem.',
        ],
        es: [
          'Saber que las ausencias largas aún pueden costar el estatus',
          'Doce meses seguidos fuera de la Unión Europea, o seis años fuera de España, lo extinguen.',
        ],
      },
      {
        en: [
          'Consider applying for nationality',
          'Nationals of Ibero-American countries qualify after two years of legal residence, well before long-term residence is reached.',
        ],
        pt: [
          'Avaliar o pedido de nacionalidade',
          'Nacionais de países ibero-americanos qualificam com dois anos de residência legal, bem antes de se atingir a residência de longa duração.',
        ],
        es: [
          'Evaluar la solicitud de nacionalidad',
          'Los nacionales de países iberoamericanos califican con dos años de residencia legal, mucho antes de alcanzar la residencia de larga duración.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
