import type { CountryVisaSteps } from './types';

/**
 * Steps for Canada.
 *
 * These sets were already live in production before this file existed — they
 * were created through the admin screen, which stores raw JSON and validates
 * nothing. Importing them verbatim makes the seed the source of truth without
 * regressing copy that is already in front of users.
 */
export const canada: CountryVisaSteps = {
  'Study Permit': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Must remain valid for the entire intended period of study.',
        ],
        pt: [
          'Passaporte válido',
          'Deve permanecer válido durante todo o período de estudos pretendido.',
        ],
        es: [
          'Pasaporte vigente',
          'Debe seguir vigente durante todo el período de estudios previsto.',
        ],
      },
      {
        en: [
          'Digital photo to IRCC specification',
          'Neutral expression, plain background, taken within the last 6 months.',
        ],
        pt: [
          'Foto digital no padrão do IRCC',
          'Expressão neutra, fundo liso, tirada nos últimos 6 meses.',
        ],
        es: [
          'Fotografía digital según el estándar del IRCC',
          'Expresión neutra, fondo liso, tomada en los últimos 6 meses.',
        ],
      },
      {
        en: [
          'Letter of explanation / statement of purpose',
          'Explain your study plan and your ties to your home country.',
        ],
        pt: [
          'Carta de explicação / carta de intenção',
          'Explique seu plano de estudos e seus vínculos com o país de origem.',
        ],
        es: [
          'Carta de explicación / carta de intención',
          'Explica tu plan de estudios y tus vínculos con tu país de origen.',
        ],
        priority: 2,
      },
      {
        en: [
          'Custodian declaration',
          'Only for minors under 17 travelling without a parent or guardian.',
        ],
        pt: [
          'Declaração de responsável (custodian)',
          'Apenas para menores de 17 anos que viajam sem pai, mãe ou responsável.',
        ],
        es: [
          'Declaración de custodio (custodian)',
          'Solo para menores de 17 años que viajan sin padre, madre o tutor.',
        ],
        priority: 3,
        required: false,
      },
    ],
    education: [
      {
        en: [
          'Letter of Acceptance from a DLI',
          'The institution must be a Designated Learning Institution on the IRCC list.',
        ],
        pt: [
          'Carta de aceite de uma DLI',
          'A instituição precisa estar na lista de Designated Learning Institutions do IRCC.',
        ],
        es: [
          'Carta de aceptación de una DLI',
          'La institución debe estar en la lista de Designated Learning Institutions del IRCC.',
        ],
      },
      {
        en: [
          'Provincial Attestation Letter (PAL/TAL)',
          'Required for most study permit applicants; issued by the province or territory.',
        ],
        pt: [
          'Provincial Attestation Letter (PAL/TAL)',
          'Exigida para a maioria dos candidatos; emitida pela província ou território.',
        ],
        es: [
          'Provincial Attestation Letter (PAL/TAL)',
          'Exigida a la mayoría de los solicitantes; la emite la provincia o territorio.',
        ],
      },
      {
        en: [
          'Academic transcripts and diplomas',
          'Certified copies of previous studies.',
        ],
        pt: [
          'Históricos escolares e diplomas',
          'Cópias autenticadas dos estudos anteriores.',
        ],
        es: [
          'Expedientes académicos y títulos',
          'Copias certificadas de los estudios previos.',
        ],
        priority: 2,
      },
      {
        en: [
          'Language test results',
          'IELTS, TOEFL or equivalent, when required by the institution or by the Student Direct Stream.',
        ],
        pt: [
          'Resultado de teste de idioma',
          'IELTS, TOEFL ou equivalente, quando exigido pela instituição ou pelo Student Direct Stream.',
        ],
        es: [
          'Resultado de examen de idioma',
          'IELTS, TOEFL o equivalente, cuando lo exija la institución o el Student Direct Stream.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of funds for tuition and living costs',
          'Must cover the first year of tuition plus the living-cost threshold set by IRCC.',
        ],
        pt: [
          'Comprovação de fundos para mensalidade e custo de vida',
          'Deve cobrir o primeiro ano de mensalidade mais o valor de custo de vida definido pelo IRCC.',
        ],
        es: [
          'Prueba de fondos para matrícula y manutención',
          'Debe cubrir el primer año de matrícula más el umbral de manutención fijado por el IRCC.',
        ],
      },
      {
        en: [
          'Guaranteed Investment Certificate (GIC)',
          'Mandatory if applying through the Student Direct Stream.',
        ],
        pt: [
          'Guaranteed Investment Certificate (GIC)',
          'Obrigatório para quem aplica pelo Student Direct Stream.',
        ],
        es: [
          'Guaranteed Investment Certificate (GIC)',
          'Obligatorio si solicitas por el Student Direct Stream.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Tuition payment receipt',
          'Proof that the first year of tuition has been paid strengthens the application.',
        ],
        pt: [
          'Comprovante de pagamento da mensalidade',
          'Comprovar o primeiro ano pago fortalece a aplicação.',
        ],
        es: [
          'Comprobante de pago de la matrícula',
          'Acreditar el primer año pagado refuerza la solicitud.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Sponsor letter and financial records',
          'If a third party is funding your studies.',
        ],
        pt: [
          'Carta do patrocinador e comprovantes financeiros',
          'Caso um terceiro esteja custeando seus estudos.',
        ],
        es: [
          'Carta del patrocinador y documentación financiera',
          'Si un tercero financia tus estudios.',
        ],
        priority: 3,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Create an IRCC secure account',
          'The whole application is filed and tracked online.',
        ],
        pt: [
          'Criar conta no portal do IRCC',
          'Toda a aplicação é enviada e acompanhada online.',
        ],
        es: [
          'Crear una cuenta en el portal del IRCC',
          'Toda la solicitud se presenta y se sigue en línea.',
        ],
      },
      {
        en: [
          'Complete the study permit application form',
          'Answer every question; blanks cause the application to be returned.',
        ],
        pt: [
          'Preencher o formulário do study permit',
          'Responda todas as perguntas; campos em branco fazem a aplicação ser devolvida.',
        ],
        es: [
          'Completar el formulario del study permit',
          'Responde todas las preguntas; los campos en blanco hacen que devuelvan la solicitud.',
        ],
      },
      {
        en: [
          'Pay the study permit and biometrics fees',
          'Two separate charges, both paid in the IRCC portal.',
        ],
        pt: [
          'Pagar as taxas de study permit e biometria',
          'São duas cobranças separadas, ambas no portal do IRCC.',
        ],
        es: [
          'Pagar las tasas de study permit y biometría',
          'Son dos cobros separados, ambos en el portal del IRCC.',
        ],
      },
      {
        en: [
          'Submit and monitor the application',
          'Respond quickly to any request for additional documents.',
        ],
        pt: [
          'Enviar e acompanhar a aplicação',
          'Responda rapidamente a qualquer pedido de documento adicional.',
        ],
        es: [
          'Enviar y hacer seguimiento de la solicitud',
          'Responde con rapidez a cualquier requerimiento de documentación adicional.',
        ],
        priority: 2,
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometrics appointment',
          'Fingerprints and photo at a Visa Application Centre after paying the biometrics fee.',
        ],
        pt: [
          'Agendamento de biometria',
          'Impressões digitais e foto em um Visa Application Centre após pagar a taxa de biometria.',
        ],
        es: [
          'Cita de biometría',
          'Huellas y fotografía en un Visa Application Centre tras pagar la tasa de biometría.',
        ],
      },
      {
        en: [
          'Immigration medical exam',
          'By an IRCC panel physician; required depending on your country of residence and length of stay.',
        ],
        pt: [
          'Exame médico de imigração',
          'Feito por médico credenciado do IRCC; exigido conforme o país de residência e o tempo de permanência.',
        ],
        es: [
          'Examen médico de inmigración',
          'Realizado por un médico habilitado por el IRCC; exigido según el país de residencia y la duración de la estancia.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Receive the Port of Entry Letter of Introduction',
          'This letter is not the permit itself.',
        ],
        pt: [
          'Receber a Port of Entry Letter of Introduction',
          'Essa carta não é a permissão em si.',
        ],
        es: [
          'Recibir la Port of Entry Letter of Introduction',
          'Esta carta no es el permiso en sí.',
        ],
      },
      {
        en: [
          'Present documents to the CBSA officer on arrival',
          'The study permit is issued at the border, not before travel.',
        ],
        pt: [
          'Apresentar documentos ao agente do CBSA na chegada',
          'O study permit é emitido na fronteira, não antes da viagem.',
        ],
        es: [
          'Presentar los documentos al agente del CBSA a la llegada',
          'El study permit se emite en la frontera, no antes del viaje.',
        ],
      },
      {
        en: [
          'Apply for a Social Insurance Number (SIN)',
          'Needed to work on or off campus.',
        ],
        pt: [
          'Solicitar o Social Insurance Number (SIN)',
          'Necessário para trabalhar dentro ou fora do campus.',
        ],
        es: [
          'Solicitar el Social Insurance Number (SIN)',
          'Necesario para trabajar dentro o fuera del campus.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Maintain full-time enrolment',
          'Dropping below the required course load can invalidate the permit.',
        ],
        pt: [
          'Manter matrícula em tempo integral',
          'Reduzir a carga de disciplinas pode invalidar a permissão.',
        ],
        es: [
          'Mantener la matrícula a tiempo completo',
          'Bajar de la carga lectiva exigida puede invalidar el permiso.',
        ],
        priority: 2,
      },
    ],
  },
  'Permanent Residence (PR)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Copies of every page containing stamps or visas.',
        ],
        pt: [
          'Passaporte válido',
          'Cópias de todas as páginas com carimbos ou vistos.',
        ],
        es: [
          'Pasaporte vigente',
          'Copias de todas las páginas con sellos o visados.',
        ],
      },
      {
        en: [
          'Birth certificate and civil status documents',
          'Marriage, divorce or death certificates where applicable.',
        ],
        pt: [
          'Certidão de nascimento e documentos de estado civil',
          'Certidões de casamento, divórcio ou óbito, quando aplicável.',
        ],
        es: [
          'Partida de nacimiento y documentos de estado civil',
          'Actas de matrimonio, divorcio o defunción cuando corresponda.',
        ],
      },
      {
        en: [
          'Police certificates',
          'From every country where you lived 6 months or more since turning 18.',
        ],
        pt: [
          'Certidões de antecedentes criminais',
          'De todos os países onde você morou 6 meses ou mais depois dos 18 anos.',
        ],
        es: [
          'Certificados de antecedentes penales',
          'De todos los países donde residiste 6 meses o más desde los 18 años.',
        ],
      },
      {
        en: [
          'Digital photos for the application',
          'For the principal applicant and every accompanying family member.',
        ],
        pt: [
          'Fotos digitais para a aplicação',
          'Para o candidato principal e cada familiar acompanhante.',
        ],
        es: [
          'Fotografías digitales para la solicitud',
          'Del solicitante principal y de cada familiar acompañante.',
        ],
        priority: 2,
      },
    ],
    education: [
      {
        en: [
          'Educational Credential Assessment (ECA)',
          'Issued by an IRCC-designated organisation; valid for 5 years.',
        ],
        pt: [
          'Educational Credential Assessment (ECA)',
          'Emitido por organização credenciada pelo IRCC; válido por 5 anos.',
        ],
        es: [
          'Educational Credential Assessment (ECA)',
          'Emitido por una organización designada por el IRCC; válido por 5 años.',
        ],
      },
      {
        en: [
          'Diplomas and academic transcripts',
          'Used to support the ECA and the points claimed.',
        ],
        pt: [
          'Diplomas e históricos escolares',
          'Servem de base para o ECA e para a pontuação reivindicada.',
        ],
        es: [
          'Títulos y expedientes académicos',
          'Sustentan el ECA y los puntos reclamados.',
        ],
        priority: 2,
      },
      {
        en: [
          'Language test results',
          'IELTS General or CELPIP for English; TEF or TCF for French. Valid for 2 years.',
        ],
        pt: [
          'Resultado de teste de idioma',
          'IELTS General ou CELPIP para inglês; TEF ou TCF para francês. Válido por 2 anos.',
        ],
        es: [
          'Resultado de examen de idioma',
          'IELTS General o CELPIP para inglés; TEF o TCF para francés. Válido por 2 años.',
        ],
      },
      {
        en: [
          'Proof of work experience',
          'Reference letters stating job title, NOC duties, hours and dates.',
        ],
        pt: [
          'Comprovação de experiência profissional',
          'Cartas de referência com cargo, atribuições segundo o NOC, carga horária e datas.',
        ],
        es: [
          'Prueba de experiencia laboral',
          'Cartas de referencia con cargo, funciones según el NOC, jornada y fechas.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of settlement funds',
          'Amount depends on family size; not required with a valid job offer or under the Canadian Experience Class.',
        ],
        pt: [
          'Comprovação de fundos de estabelecimento',
          'O valor depende do tamanho da família; dispensado com oferta de emprego válida ou pela Canadian Experience Class.',
        ],
        es: [
          'Prueba de fondos de asentamiento',
          'El monto depende del tamaño de la familia; no se exige con oferta de empleo válida o por la Canadian Experience Class.',
        ],
      },
      {
        en: [
          'Official bank letters',
          'Must show at least 6 months of history and be issued on institutional letterhead.',
        ],
        pt: [
          'Cartas bancárias oficiais',
          'Devem mostrar pelo menos 6 meses de histórico e vir em papel timbrado da instituição.',
        ],
        es: [
          'Cartas bancarias oficiales',
          'Deben mostrar al menos 6 meses de historial y estar en papel membretado de la entidad.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Create an Express Entry profile',
          'Enter the pool and receive a Comprehensive Ranking System (CRS) score.',
        ],
        pt: [
          'Criar o perfil no Express Entry',
          'Entra no pool e recebe uma pontuação no Comprehensive Ranking System (CRS).',
        ],
        es: [
          'Crear el perfil en Express Entry',
          'Entras al pool y recibes una puntuación del Comprehensive Ranking System (CRS).',
        ],
      },
      {
        en: [
          'Receive an Invitation to Apply (ITA)',
          'Issued in periodic draws when your CRS score meets the cut-off.',
        ],
        pt: [
          'Receber o Invitation to Apply (ITA)',
          'Emitido em rodadas periódicas quando sua pontuação CRS atinge a nota de corte.',
        ],
        es: [
          'Recibir la Invitation to Apply (ITA)',
          'Se emite en rondas periódicas cuando tu puntuación CRS alcanza la nota de corte.',
        ],
      },
      {
        en: [
          'Submit the electronic application (eAPR)',
          'Must be filed within 60 days of receiving the ITA.',
        ],
        pt: [
          'Enviar a aplicação eletrônica (eAPR)',
          'Precisa ser enviada em até 60 dias após o ITA.',
        ],
        es: [
          'Enviar la solicitud electrónica (eAPR)',
          'Debe presentarse dentro de los 60 días posteriores a la ITA.',
        ],
      },
      {
        en: [
          'Pay the processing fee and the RPRF',
          'The Right of Permanent Residence Fee can be paid upfront or when requested.',
        ],
        pt: [
          'Pagar a taxa de processamento e a RPRF',
          'A Right of Permanent Residence Fee pode ser paga antecipadamente ou quando solicitada.',
        ],
        es: [
          'Pagar la tasa de tramitación y la RPRF',
          'La Right of Permanent Residence Fee puede pagarse por adelantado o cuando la soliciten.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometrics appointment',
          'Required for the applicant and each accompanying family member.',
        ],
        pt: [
          'Agendamento de biometria',
          'Exigida do candidato e de cada familiar acompanhante.',
        ],
        es: [
          'Cita de biometría',
          'Exigida al solicitante y a cada familiar acompañante.',
        ],
      },
      {
        en: [
          'Immigration medical exam',
          'Only by an IRCC panel physician; results are valid for 12 months.',
        ],
        pt: [
          'Exame médico de imigração',
          'Somente com médico credenciado do IRCC; o resultado vale por 12 meses.',
        ],
        es: [
          'Examen médico de inmigración',
          'Solo con un médico habilitado por el IRCC; el resultado vale 12 meses.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Receive the Confirmation of Permanent Residence (COPR)',
          'Check every field; errors must be corrected before landing.',
        ],
        pt: [
          'Receber a Confirmation of Permanent Residence (COPR)',
          'Confira cada campo; erros precisam ser corrigidos antes do landing.',
        ],
        es: [
          'Recibir la Confirmation of Permanent Residence (COPR)',
          'Revisa cada campo; los errores deben corregirse antes del landing.',
        ],
      },
      {
        en: [
          'Complete the landing process',
          'At a port of entry or through the online landing portal.',
        ],
        pt: [
          'Concluir o processo de landing',
          'Em um porto de entrada ou pelo portal de landing online.',
        ],
        es: [
          'Completar el proceso de landing',
          'En un puerto de entrada o mediante el portal de landing en línea.',
        ],
      },
      {
        en: [
          'Receive the PR card',
          'Mailed to a Canadian address; you must provide one after landing.',
        ],
        pt: [
          'Receber o PR card',
          'Enviado para um endereço canadense; você precisa informar um após o landing.',
        ],
        es: [
          'Recibir la PR card',
          'Se envía a una dirección canadiense; debes indicar una tras el landing.',
        ],
        priority: 2,
      },
      {
        en: [
          'Track days of physical presence',
          'Needed both to renew the PR card and to qualify for citizenship.',
        ],
        pt: [
          'Controlar os dias de presença física',
          'Necessário tanto para renovar o PR card quanto para pedir cidadania.',
        ],
        es: [
          'Llevar el registro de días de presencia física',
          'Necesario tanto para renovar la PR card como para optar a la ciudadanía.',
        ],
        priority: 2,
      },
    ],
  },
};
