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

  'Visitor Visa / Electronic Travel Authorization (eTA)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'The eTA is linked electronically to the passport number, so renewing the passport invalidates it.',
        ],
        pt: [
          'Passaporte válido',
          'A eTA fica vinculada eletronicamente ao número do passaporte, então renovar o passaporte a invalida.',
        ],
        es: [
          'Pasaporte vigente',
          'La eTA queda vinculada electrónicamente al número de pasaporte, así que renovarlo la invalida.',
        ],
      },
      {
        en: [
          'Check whether you need a visa or only an eTA',
          'Visa-exempt nationals flying in need only the eTA; everyone else applies for a temporary resident visa. Getting this wrong wastes the fee.',
        ],
        pt: [
          'Verificar se precisa de visto ou apenas de eTA',
          'Nacionalidades isentas que chegam de avião precisam só da eTA; as demais pedem visto de residente temporário. Errar isso desperdiça a taxa.',
        ],
        es: [
          'Comprobar si necesita visado o solo eTA',
          'Las nacionalidades exentas que llegan en avión solo necesitan la eTA; las demás solicitan visado de residente temporal. Equivocarse aquí desperdicia la tasa.',
        ],
      },
      {
        en: [
          'Online application in the IRCC account',
          'The whole process runs through the secure account, including any later requests for documents.',
        ],
        pt: [
          'Pedido online na conta do IRCC',
          'Todo o processo corre pela conta segura, inclusive pedidos posteriores de documentos.',
        ],
        es: [
          'Solicitud en línea en la cuenta del IRCC',
          'Todo el proceso se lleva por la cuenta segura, incluidas las peticiones posteriores de documentos.',
        ],
      },
      {
        en: [
          'Digital photograph',
          'Recent, on a plain background, meeting the IRCC specification.',
        ],
        pt: [
          'Fotografia digital',
          'Recente, em fundo liso, conforme a especificação do IRCC.',
        ],
        es: [
          'Fotografía digital',
          'Reciente, con fondo liso, según la especificación del IRCC.',
        ],
      },
      {
        en: [
          'Travel itinerary and purpose of the visit',
          'Dates, where you will stay and what you will do.',
        ],
        pt: [
          'Itinerário e motivo da visita',
          'Datas, onde vai ficar e o que vai fazer.',
        ],
        es: [
          'Itinerario y motivo de la visita',
          'Fechas, dónde se alojará y qué hará.',
        ],
      },
      {
        en: [
          'Letter of invitation',
          'From a host in Canada, stating their status and the relationship to you.',
        ],
        pt: [
          'Carta-convite',
          'De um anfitrião no Canadá, indicando o status dele e o vínculo com você.',
        ],
        es: [
          'Carta de invitación',
          'De un anfitrión en Canadá, indicando su estatus y el vínculo con usted.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Evidence of ties to your home country',
          'Employment, studies, property or dependants — what shows you will return.',
        ],
        pt: [
          'Comprovação de vínculos com seu país',
          'Emprego, estudos, imóveis ou dependentes — o que mostra que você retornará.',
        ],
        es: [
          'Prueba de arraigo en su país',
          'Empleo, estudios, propiedades o dependientes: lo que demuestra que regresará.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of funds for the visit',
          'Bank statements from the last four months, consistent with the trip described.',
        ],
        pt: [
          'Comprovação de recursos para a visita',
          'Extratos bancários dos últimos quatro meses, coerentes com a viagem descrita.',
        ],
        es: [
          'Prueba de fondos para la visita',
          'Extractos bancarios de los últimos cuatro meses, coherentes con el viaje descrito.',
        ],
      },
      {
        en: [
          'Proof of employment or income',
          'An employer letter with approved leave, or business documents if self-employed.',
        ],
        pt: [
          'Comprovação de emprego ou renda',
          'Carta do empregador com férias aprovadas, ou documentos da empresa se for autônomo.',
        ],
        es: [
          'Comprobante de empleo o ingresos',
          'Carta del empleador con vacaciones aprobadas, o documentos de la empresa si trabaja por cuenta propia.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Pay the eTA or visa fee',
          'The eTA costs a fraction of the visa and is usually approved within minutes.',
        ],
        pt: [
          'Pagar a taxa da eTA ou do visto',
          'A eTA custa uma fração do visto e costuma ser aprovada em minutos.',
        ],
        es: [
          'Pagar la tasa de la eTA o del visado',
          'La eTA cuesta una fracción del visado y suele aprobarse en minutos.',
        ],
      },
      {
        en: [
          'Pay the biometrics fee',
          'Charged once and valid for ten years across temporary applications.',
        ],
        pt: [
          'Pagar a taxa de biometria',
          'Cobrada uma vez e válida por dez anos em pedidos temporários.',
        ],
        es: [
          'Pagar la tasa de biometría',
          'Se cobra una vez y vale diez años en solicitudes temporales.',
        ],
      },
      {
        en: [
          'Submit the application and follow the account',
          'Any additional request appears in the account, not by e-mail.',
        ],
        pt: [
          'Enviar o pedido e acompanhar pela conta',
          'Qualquer exigência adicional aparece na conta, não por e-mail.',
        ],
        es: [
          'Enviar la solicitud y seguirla en la cuenta',
          'Cualquier requerimiento adicional aparece en la cuenta, no por correo.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometrics appointment',
          'Required for the visa; the eTA does not need it. Book it after the letter of instruction arrives.',
        ],
        pt: [
          'Atendimento de biometria',
          'Exigido para o visto; a eTA dispensa. Agende depois que chegar a carta de instrução.',
        ],
        es: [
          'Cita de biometría',
          'Exigida para el visado; la eTA no la necesita. Resérvela cuando llegue la carta de instrucción.',
        ],
      },
      {
        en: [
          'Immigration medical exam',
          'Only for visits over six months, or if you will work in healthcare or with children.',
        ],
        pt: [
          'Exame médico de imigração',
          'Só em visitas acima de seis meses, ou se for trabalhar na saúde ou com crianças.',
        ],
        es: [
          'Examen médico de inmigración',
          'Solo en visitas de más de seis meses, o si va a trabajar en sanidad o con niños.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Travel with the passport the authorisation is linked to',
          'The eTA is electronic; there is nothing printed to show, but the passport must be the same one.',
        ],
        pt: [
          'Viajar com o passaporte ao qual a autorização está vinculada',
          'A eTA é eletrônica; não há nada impresso para mostrar, mas o passaporte precisa ser o mesmo.',
        ],
        es: [
          'Viajar con el pasaporte al que está vinculada la autorización',
          'La eTA es electrónica; no hay nada impreso que mostrar, pero el pasaporte debe ser el mismo.',
        ],
      },
      {
        en: [
          'Confirm the length of stay granted at the border',
          'The officer decides how long you may stay, normally up to six months. It is not automatic.',
        ],
        pt: [
          'Confirmar na fronteira o prazo de permanência concedido',
          'O oficial decide quanto tempo você pode ficar, normalmente até seis meses. Não é automático.',
        ],
        es: [
          'Confirmar en la frontera el plazo de estancia concedido',
          'El oficial decide cuánto tiempo puede quedarse, normalmente hasta seis meses. No es automático.',
        ],
      },
      {
        en: [
          'Do not work or study without a permit',
          'Only a few short courses are allowed as a visitor; paid work is not.',
        ],
        pt: [
          'Não trabalhar nem estudar sem autorização',
          'Como visitante, só alguns cursos curtos são permitidos; trabalho remunerado não é.',
        ],
        es: [
          'No trabajar ni estudiar sin permiso',
          'Como visitante solo se permiten algunos cursos cortos; el trabajo remunerado no.',
        ],
      },
      {
        en: [
          'Apply to extend before the authorised stay ends',
          'The extension is requested from inside Canada and must be filed before the current status expires.',
        ],
        pt: [
          'Pedir prorrogação antes do fim da estada autorizada',
          'A prorrogação é pedida de dentro do Canadá e precisa ser protocolada antes de o status atual expirar.',
        ],
        es: [
          'Solicitar prórroga antes de que acabe la estancia autorizada',
          'La prórroga se solicita desde dentro de Canadá y debe presentarse antes de que expire el estatus actual.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },

  'Temporary Work Permit': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'The permit is never issued for longer than the passport validity.',
        ],
        pt: [
          'Passaporte válido',
          'A autorização nunca é emitida por prazo maior que a validade do passaporte.',
        ],
        es: [
          'Pasaporte vigente',
          'El permiso nunca se emite por más tiempo que la vigencia del pasaporte.',
        ],
      },
      {
        en: [
          'Written job offer from the Canadian employer',
          'With job title, duties, salary and place of work.',
        ],
        pt: [
          'Oferta de emprego por escrito do empregador canadense',
          'Com cargo, atribuições, salário e local de trabalho.',
        ],
        es: [
          'Oferta de empleo por escrito del empleador canadiense',
          'Con cargo, funciones, salario y lugar de trabajo.',
        ],
      },
      {
        en: [
          'Positive LMIA, or the offer of employment number',
          'Employer-specific permits usually need a Labour Market Impact Assessment; exempt streams use a number generated in the employer portal instead.',
        ],
        pt: [
          'LMIA positiva, ou o número da oferta de emprego',
          'Autorizações vinculadas a um empregador em geral exigem Labour Market Impact Assessment; as vias isentas usam no lugar um número gerado no portal do empregador.',
        ],
        es: [
          'LMIA positiva, o el número de la oferta de empleo',
          'Los permisos vinculados a un empleador suelen exigir Labour Market Impact Assessment; las vías exentas usan en su lugar un número generado en el portal del empleador.',
        ],
      },
      {
        en: [
          'Online application in the IRCC account',
          'Choose employer-specific or open: an open permit is only available in specific situations, not by preference.',
        ],
        pt: [
          'Pedido online na conta do IRCC',
          'Escolha entre vinculada a empregador ou aberta: a autorização aberta só existe em situações específicas, não por preferência.',
        ],
        es: [
          'Solicitud en línea en la cuenta del IRCC',
          'Elija entre vinculada a un empleador o abierta: el permiso abierto solo existe en situaciones concretas, no por preferencia.',
        ],
      },
      {
        en: [
          'Police certificates',
          'Requested for certain countries and occupations, and always where the stay exceeds six months.',
        ],
        pt: [
          'Certidões de antecedentes criminais',
          'Solicitadas para certos países e ocupações, e sempre quando a estada ultrapassa seis meses.',
        ],
        es: [
          'Certificados de antecedentes penales',
          'Se solicitan para ciertos países y ocupaciones, y siempre cuando la estancia supera los seis meses.',
        ],
        priority: 2,
        required: false,
      },
    ],
    education: [
      {
        en: [
          'Qualifications for the occupation',
          'Diplomas, certificates and reference letters supporting the NOC code of the offer.',
        ],
        pt: [
          'Qualificações para a ocupação',
          'Diplomas, certificados e cartas de referência que sustentam o código NOC da oferta.',
        ],
        es: [
          'Cualificaciones para la ocupación',
          'Títulos, certificados y cartas de referencia que respaldan el código NOC de la oferta.',
        ],
      },
      {
        en: [
          'Provincial licence for regulated occupations',
          'Nursing, engineering and the trades require registration with the province before you may practise.',
        ],
        pt: [
          'Licença provincial para ocupações regulamentadas',
          'Enfermagem, engenharia e ofícios técnicos exigem registro na província antes do exercício.',
        ],
        es: [
          'Licencia provincial para ocupaciones reguladas',
          'Enfermería, ingeniería y los oficios exigen registro en la provincia antes de ejercer.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Language test results',
          'Not required for every permit, but some streams and provinces ask for them.',
        ],
        pt: [
          'Resultados de teste de idioma',
          'Não são exigidos em toda autorização, mas algumas vias e províncias os pedem.',
        ],
        es: [
          'Resultados de prueba de idioma',
          'No se exigen en todo permiso, pero algunas vías y provincias los piden.',
        ],
        priority: 3,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of funds for the settling-in period',
          'Enough to support you and any family until the first salary arrives.',
        ],
        pt: [
          'Comprovação de recursos para o período de instalação',
          'Suficiente para sustentar você e a família até chegar o primeiro salário.',
        ],
        es: [
          'Prueba de fondos para el periodo de instalación',
          'Suficientes para mantenerse usted y su familia hasta que llegue el primer salario.',
        ],
      },
      {
        en: [
          'Employer compliance fee, where applicable',
          'Paid by the employer in LMIA-exempt streams, but confirm it was paid before you apply.',
        ],
        pt: [
          'Taxa de conformidade do empregador, quando aplicável',
          'Paga pelo empregador nas vias isentas de LMIA, mas confirme que foi paga antes de pedir.',
        ],
        es: [
          'Tasa de cumplimiento del empleador, cuando aplique',
          'La paga el empleador en las vías exentas de LMIA, pero confirme que se pagó antes de solicitar.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Pay the work permit fee',
          'An open permit carries an extra fee on top.',
        ],
        pt: [
          'Pagar a taxa da autorização de trabalho',
          'A autorização aberta tem uma taxa adicional por cima.',
        ],
        es: [
          'Pagar la tasa del permiso de trabajo',
          'El permiso abierto lleva una tasa adicional encima.',
        ],
      },
      {
        en: [
          'Pay the biometrics fee',
          'Valid for ten years and reused across temporary applications.',
        ],
        pt: [
          'Pagar a taxa de biometria',
          'Válida por dez anos e reaproveitada entre pedidos temporários.',
        ],
        es: [
          'Pagar la tasa de biometría',
          'Vale diez años y se reutiliza entre solicitudes temporales.',
        ],
      },
      {
        en: [
          'Submit the application and monitor the account',
          'Requests for more documents come with a deadline; missing it closes the file.',
        ],
        pt: [
          'Enviar o pedido e acompanhar a conta',
          'Exigências de documentos vêm com prazo; perdê-lo encerra o processo.',
        ],
        es: [
          'Enviar la solicitud y vigilar la cuenta',
          'Los requerimientos de documentos vienen con plazo; incumplirlo cierra el expediente.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometrics appointment',
          'Book it after the letter of instruction arrives in the account.',
        ],
        pt: [
          'Atendimento de biometria',
          'Agende depois que a carta de instrução chegar à conta.',
        ],
        es: [
          'Cita de biometría',
          'Resérvela cuando llegue la carta de instrucción a la cuenta.',
        ],
      },
      {
        en: [
          'Immigration medical exam with a panel physician',
          'Mandatory for healthcare, childcare and agriculture, and for stays over six months from designated countries.',
        ],
        pt: [
          'Exame médico de imigração com médico credenciado',
          'Obrigatório para saúde, cuidado infantil e agricultura, e em estadas acima de seis meses vindas de países designados.',
        ],
        es: [
          'Examen médico de inmigración con médico acreditado',
          'Obligatorio para sanidad, cuidado infantil y agricultura, y en estancias de más de seis meses desde países designados.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the port of entry letter',
          'Approval sends a letter, not the permit. The permit itself is printed when you arrive.',
        ],
        pt: [
          'Guardar a carta de porta de entrada',
          'A aprovação envia uma carta, não a autorização. A autorização em si é impressa na chegada.',
        ],
        es: [
          'Guardar la carta de puerto de entrada',
          'La aprobación envía una carta, no el permiso. El permiso se imprime al llegar.',
        ],
      },
      {
        en: [
          'Check the printed permit before leaving the airport',
          'Employer, occupation and expiry are printed there. An error is far easier to fix on the spot than afterwards.',
        ],
        pt: [
          'Conferir a autorização impressa antes de sair do aeroporto',
          'Empregador, ocupação e validade vêm impressos nela. Um erro é muito mais fácil de corrigir na hora do que depois.',
        ],
        es: [
          'Revisar el permiso impreso antes de salir del aeropuerto',
          'Empleador, ocupación y caducidad vienen impresos. Un error es mucho más fácil de corregir en el momento que después.',
        ],
      },
      {
        en: [
          'Apply for the social insurance number',
          'Without it you cannot be paid. It is requested at a Service Canada office.',
        ],
        pt: [
          'Solicitar o social insurance number',
          'Sem ele não é possível receber salário. É pedido num escritório do Service Canada.',
        ],
        es: [
          'Solicitar el social insurance number',
          'Sin él no se puede cobrar. Se solicita en una oficina de Service Canada.',
        ],
      },
      {
        en: [
          'Register for provincial health coverage',
          'Some provinces impose a waiting period, so take out private insurance for the gap.',
        ],
        pt: [
          'Inscrever-se na cobertura de saúde provincial',
          'Algumas províncias impõem carência, então contrate seguro privado para o intervalo.',
        ],
        es: [
          'Inscribirse en la cobertura sanitaria provincial',
          'Algunas provincias imponen carencia, así que contrate seguro privado para ese intervalo.',
        ],
        priority: 2,
      },
      {
        en: [
          'Plan the transition to permanent residence early',
          'Canadian work experience scores heavily in Express Entry and in the provincial programmes.',
        ],
        pt: [
          'Planejar cedo a transição para a residência permanente',
          'Experiência de trabalho canadense pontua muito no Express Entry e nos programas provinciais.',
        ],
        es: [
          'Planificar pronto la transición a la residencia permanente',
          'La experiencia laboral canadiense puntúa mucho en Express Entry y en los programas provinciales.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },

  'Refugee & Asylum Programs': {
    core_documents: [
      {
        en: [
          'Identity documents, whatever you have',
          'Passport, national ID, birth certificate. A claim is not refused for want of documents, but anything you hold helps establish who you are.',
        ],
        pt: [
          'Documentos de identidade, os que você tiver',
          'Passaporte, identidade nacional, certidão de nascimento. O pedido não é recusado por falta de documentos, mas tudo o que você tiver ajuda a estabelecer quem você é.',
        ],
        es: [
          'Documentos de identidad, los que tenga',
          'Pasaporte, documento nacional, partida de nacimiento. La solicitud no se rechaza por falta de documentos, pero todo lo que tenga ayuda a acreditar quién es.',
        ],
      },
      {
        en: [
          'Basis of Claim form',
          'The written account of what happened and why you cannot return. It is the centre of the case and the hearing is built on it.',
        ],
        pt: [
          'Formulário Basis of Claim',
          'O relato escrito do que aconteceu e por que você não pode voltar. É o centro do caso, e a audiência é construída sobre ele.',
        ],
        es: [
          'Formulario Basis of Claim',
          'El relato escrito de lo ocurrido y de por qué no puede regresar. Es el centro del caso, y la audiencia se construye sobre él.',
        ],
      },
      {
        en: [
          'Evidence supporting the account',
          'Police reports, medical records, news articles, witness statements — whatever corroborates what you describe.',
        ],
        pt: [
          'Provas que sustentam o relato',
          'Boletins de ocorrência, laudos médicos, notícias, declarações de testemunhas — o que corroborar o que você descreve.',
        ],
        es: [
          'Pruebas que sustentan el relato',
          'Denuncias policiales, informes médicos, noticias, declaraciones de testigos: lo que corrobore lo que describe.',
        ],
      },
      {
        en: [
          'Certified translations of foreign documents',
          'Everything not in English or French needs a translation with the translator declaration.',
        ],
        pt: [
          'Traduções certificadas dos documentos estrangeiros',
          'Tudo o que não estiver em inglês ou francês precisa de tradução com a declaração do tradutor.',
        ],
        es: [
          'Traducciones certificadas de los documentos extranjeros',
          'Todo lo que no esté en inglés o francés necesita traducción con la declaración del traductor.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'No proof of funds is required',
          'Unlike every other route here, a refugee claim does not ask you to show money.',
        ],
        pt: [
          'Não é exigida comprovação de recursos',
          'Diferente de todas as outras rotas aqui, o pedido de refúgio não exige que você comprove dinheiro.',
        ],
        es: [
          'No se exige prueba de fondos',
          'A diferencia de todas las demás vías aquí, la solicitud de refugio no exige acreditar dinero.',
        ],
        required: false,
      },
      {
        en: [
          'Apply for the interim federal health programme',
          'It covers medical care while the claim is pending.',
        ],
        pt: [
          'Solicitar o programa federal provisório de saúde',
          'Ele cobre atendimento médico enquanto o pedido está pendente.',
        ],
        es: [
          'Solicitar el programa federal provisional de salud',
          'Cubre la atención médica mientras la solicitud está pendiente.',
        ],
      },
      {
        en: [
          'Apply for a work permit while the claim is pending',
          'Available to claimants and it is what makes the wait sustainable.',
        ],
        pt: [
          'Pedir autorização de trabalho enquanto o pedido corre',
          'Está disponível para solicitantes e é o que torna a espera sustentável.',
        ],
        es: [
          'Solicitar permiso de trabajo mientras se resuelve',
          'Está disponible para los solicitantes y es lo que hace sostenible la espera.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Make the claim at a port of entry or from inside Canada',
          'Both are possible. There is no fee for a refugee claim.',
        ],
        pt: [
          'Fazer o pedido num ponto de entrada ou já dentro do Canadá',
          'Ambos são possíveis. Não há taxa para pedido de refúgio.',
        ],
        es: [
          'Presentar la solicitud en un punto de entrada o ya dentro de Canadá',
          'Ambas opciones son posibles. No hay tasa para la solicitud de refugio.',
        ],
      },
      {
        en: [
          'Attend the eligibility interview',
          'An officer decides whether the claim can be referred to the tribunal. This is not yet the decision on the merits.',
        ],
        pt: [
          'Comparecer à entrevista de elegibilidade',
          'Um oficial decide se o pedido pode ser encaminhado ao tribunal. Ainda não é a decisão sobre o mérito.',
        ],
        es: [
          'Acudir a la entrevista de elegibilidad',
          'Un oficial decide si la solicitud puede remitirse al tribunal. Todavía no es la decisión sobre el fondo.',
        ],
      },
      {
        en: [
          'Submit the Basis of Claim within the deadline',
          'The deadline is short and counted in days. Missing it can end the claim before it is heard.',
        ],
        pt: [
          'Entregar o Basis of Claim dentro do prazo',
          'O prazo é curto e contado em dias. Perdê-lo pode encerrar o pedido antes de ser julgado.',
        ],
        es: [
          'Presentar el Basis of Claim dentro del plazo',
          'El plazo es corto y se cuenta en días. Perderlo puede terminar la solicitud antes de que se resuelva.',
        ],
      },
      {
        en: [
          'Get legal representation',
          'Provincial legal aid covers refugee claims in most provinces. The hearing is adversarial and going in unrepresented materially lowers the odds.',
        ],
        pt: [
          'Conseguir representação jurídica',
          'A assistência judiciária provincial cobre pedidos de refúgio na maioria das províncias. A audiência é contraditória, e ir sem representação reduz materialmente as chances.',
        ],
        es: [
          'Conseguir representación legal',
          'La asistencia jurídica provincial cubre las solicitudes de refugio en la mayoría de las provincias. La audiencia es contradictoria, e ir sin representación reduce materialmente las probabilidades.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: ['Biometrics and photograph', 'Collected when the claim is made.'],
        pt: ['Biometria e fotografia', 'Recolhidas no momento do pedido.'],
        es: [
          'Biometría y fotografía',
          'Se recogen en el momento de la solicitud.',
        ],
      },
      {
        en: [
          'Immigration medical exam',
          'Required for every claimant, done by a panel physician.',
        ],
        pt: [
          'Exame médico de imigração',
          'Exigido de todo solicitante, feito por médico credenciado.',
        ],
        es: [
          'Examen médico de inmigración',
          'Exigido a todo solicitante, realizado por un médico acreditado.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Attend the hearing before the Refugee Protection Division',
          'The tribunal decides the claim. Being consistent with the Basis of Claim matters more than any single document.',
        ],
        pt: [
          'Comparecer à audiência na Refugee Protection Division',
          'O tribunal decide o pedido. Ser coerente com o Basis of Claim pesa mais do que qualquer documento isolado.',
        ],
        es: [
          'Acudir a la audiencia ante la Refugee Protection Division',
          'El tribunal decide la solicitud. Ser coherente con el Basis of Claim pesa más que cualquier documento aislado.',
        ],
      },
      {
        en: [
          'Apply for permanent residence as a protected person',
          'Once protection is granted, this is the route that turns it into permanent status.',
        ],
        pt: [
          'Pedir residência permanente como pessoa protegida',
          'Concedida a proteção, é esta a via que a converte em status permanente.',
        ],
        es: [
          'Solicitar la residencia permanente como persona protegida',
          'Concedida la protección, esta es la vía que la convierte en estatus permanente.',
        ],
      },
      {
        en: [
          'Understand the options if the claim is refused',
          'There may be an appeal, a judicial review, or a pre-removal risk assessment. All have short deadlines.',
        ],
        pt: [
          'Conhecer as opções em caso de indeferimento',
          'Pode caber recurso, revisão judicial ou avaliação de risco pré-remoção. Todos têm prazos curtos.',
        ],
        es: [
          'Conocer las opciones si deniegan la solicitud',
          'Puede caber apelación, revisión judicial o evaluación de riesgo previa a la expulsión. Todos con plazos breves.',
        ],
        priority: 2,
      },
      {
        en: [
          'Do not travel to the country you fled',
          'Returning there, even briefly, is treated as evidence that the fear has ceased and can cost the protection.',
        ],
        pt: [
          'Não viajar ao país de onde você fugiu',
          'Voltar lá, ainda que brevemente, é tratado como prova de que o temor cessou e pode custar a proteção.',
        ],
        es: [
          'No viajar al país del que huyó',
          'Regresar allí, aunque sea brevemente, se toma como prueba de que el temor cesó y puede costar la protección.',
        ],
      },
    ],
  },
};
