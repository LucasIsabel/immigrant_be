import type { CountryVisaSteps } from './types';

/**
 * Steps for Japan.
 *
 * Almost every stay longer than a tourist trip runs on the Certificate of
 * Eligibility. The sponsor in Japan — an employer, a school, a spouse — obtains
 * it from the regional immigration bureau, sends it abroad, and only then does
 * the applicant take it to an embassy, where the visa itself is a short
 * formality. Someone expecting to build a case at a consulate has the order
 * inverted, and that costs months.
 *
 * Two arrival steps matter as much as the visa: the residence card, issued at
 * major airports on entry, and the municipal address registration within
 * fourteen days, which is what enrols you in health insurance and pension.
 */
export const japan: CountryVisaSteps = {
  'Short-Term Stay Visa': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Check first whether your nationality is visa-exempt for short visits; many are, and applying anyway is unnecessary.',
        ],
        pt: [
          'Passaporte válido',
          'Verifique antes se sua nacionalidade é isenta de visto em visitas curtas; muitas são, e pedir mesmo assim é desnecessário.',
        ],
        es: [
          'Pasaporte vigente',
          'Compruebe primero si su nacionalidad está exenta de visado en visitas cortas; muchas lo están, y solicitarlo igualmente es innecesario.',
        ],
      },
      {
        en: [
          'Visa application form with photograph',
          'One form per applicant, with a recent photograph attached.',
        ],
        pt: [
          'Formulário de pedido de visto com fotografia',
          'Um formulário por requerente, com fotografia recente anexada.',
        ],
        es: [
          'Formulario de solicitud de visado con fotografía',
          'Un formulario por solicitante, con una fotografía reciente adjunta.',
        ],
      },
      {
        en: [
          'Detailed daily itinerary',
          'Japan asks for a schedule of activities day by day, with places and dates. This is more specific than most countries expect.',
        ],
        pt: [
          'Itinerário diário detalhado',
          'O Japão pede um cronograma de atividades dia a dia, com locais e datas. É mais específico do que a maioria dos países exige.',
        ],
        es: [
          'Itinerario diario detallado',
          'Japón pide un cronograma de actividades día a día, con lugares y fechas. Es más específico de lo que exige la mayoría de los países.',
        ],
      },
      {
        en: [
          'Flight reservation and accommodation bookings',
          'Consistent with the itinerary submitted.',
        ],
        pt: [
          'Reserva de voo e de alojamento',
          'Coerentes com o itinerário apresentado.',
        ],
        es: [
          'Reserva de vuelo y de alojamiento',
          'Coherentes con el itinerario presentado.',
        ],
      },
      {
        en: [
          'Letter of guarantee and invitation',
          'If someone in Japan is hosting or funding you, they provide these documents along with proof of their status and income.',
        ],
        pt: [
          'Carta de garantia e convite',
          'Se alguém no Japão hospeda ou custeia você, essa pessoa fornece esses documentos junto com comprovação de status e renda.',
        ],
        es: [
          'Carta de garantía e invitación',
          'Si alguien en Japón le aloja o financia, esa persona aporta esos documentos junto con prueba de su estatus e ingresos.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of funds for the trip',
          'Bank statements consistent with the itinerary and its length.',
        ],
        pt: [
          'Comprovação de recursos para a viagem',
          'Extratos bancários coerentes com o itinerário e a duração dele.',
        ],
        es: [
          'Prueba de fondos para el viaje',
          'Extractos bancarios coherentes con el itinerario y su duración.',
        ],
      },
      {
        en: [
          'Proof of employment or income',
          'An employer letter, tax documents, or business registration if self-employed.',
        ],
        pt: [
          'Comprovação de emprego ou renda',
          'Carta do empregador, documentos fiscais, ou registo da empresa se for autônomo.',
        ],
        es: [
          'Comprobante de empleo o ingresos',
          'Carta del empleador, documentos fiscales, o registro de la empresa si trabaja por cuenta propia.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply at the embassy or through an accredited agency',
          'Several countries only accept applications through designated travel agencies rather than directly.',
        ],
        pt: [
          'Pedir na embaixada ou por agência credenciada',
          'Vários países só aceitam pedidos por agências de viagem designadas, não diretamente.',
        ],
        es: [
          'Solicitar en la embajada o por una agencia acreditada',
          'Varios países solo aceptan solicitudes mediante agencias de viaje designadas, no directamente.',
        ],
      },
      {
        en: [
          'Pay the visa fee',
          'Single or multiple entry, at different rates; some nationalities are exempt by agreement.',
        ],
        pt: [
          'Pagar a taxa do visto',
          'Entrada única ou múltipla, com valores diferentes; algumas nacionalidades são isentas por acordo.',
        ],
        es: [
          'Pagar la tasa del visado',
          'Entrada única o múltiple, con importes distintos; algunas nacionalidades están exentas por acuerdo.',
        ],
      },
      {
        en: [
          'Submit and wait for processing',
          'Short-term decisions are usually quick, often within about a week.',
        ],
        pt: [
          'Entregar e aguardar a análise',
          'Decisões de curta duração costumam ser rápidas, muitas vezes em cerca de uma semana.',
        ],
        es: [
          'Presentar y esperar la tramitación',
          'Las decisiones de corta duración suelen ser rápidas, a menudo en torno a una semana.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints and photograph on arrival',
          'Taken at immigration on entry, not at the embassy.',
        ],
        pt: [
          'Impressões digitais e fotografia na chegada',
          'Recolhidas na imigração na entrada, não na embaixada.',
        ],
        es: [
          'Huellas y fotografía a la llegada',
          'Se toman en inmigración a la entrada, no en la embajada.',
        ],
      },
      {
        en: [
          'Travel medical insurance',
          'Not a formal requirement, but there is no public cover for visitors and Japanese medical costs are high.',
        ],
        pt: [
          'Seguro médico de viagem',
          'Não é exigência formal, mas não há cobertura pública para visitantes e os custos médicos japoneses são altos.',
        ],
        es: [
          'Seguro médico de viaje',
          'No es un requisito formal, pero no hay cobertura pública para visitantes y los costes médicos japoneses son altos.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Complete the online arrival procedures before flying',
          'Immigration and customs declarations are filed online in advance and produce QR codes used at the airport.',
        ],
        pt: [
          'Fazer os procedimentos de chegada online antes de voar',
          'As declarações de imigração e alfândega são preenchidas online com antecedência e geram códigos QR usados no aeroporto.',
        ],
        es: [
          'Completar los trámites de llegada en línea antes de volar',
          'Las declaraciones de inmigración y aduana se presentan en línea con antelación y generan códigos QR que se usan en el aeropuerto.',
        ],
      },
      {
        en: [
          'Do not work on a short-term stay',
          'This status permits tourism, visiting family and business meetings, never paid activity.',
        ],
        pt: [
          'Não trabalhar com estada de curta duração',
          'Esse status permite turismo, visita a familiares e reuniões de negócios, nunca atividade remunerada.',
        ],
        es: [
          'No trabajar con estancia de corta duración',
          'Ese estatus permite turismo, visitas familiares y reuniones de negocios, nunca actividad remunerada.',
        ],
      },
      {
        en: [
          'Do not plan to convert this status from inside Japan',
          'A short-term stay generally cannot be changed to a work or student status without leaving the country.',
        ],
        pt: [
          'Não contar em converter esse status de dentro do Japão',
          'Uma estada de curta duração em geral não pode ser mudada para status de trabalho ou estudo sem sair do país.',
        ],
        es: [
          'No contar con convertir este estatus desde dentro de Japón',
          'Una estancia de corta duración por lo general no puede cambiarse a estatus de trabajo o estudio sin salir del país.',
        ],
        priority: 2,
      },
    ],
  },

  'Work / Long-Term Stay Visas': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Should cover the period of stay being applied for.',
        ],
        pt: [
          'Passaporte válido',
          'Deve cobrir o período de permanência pedido.',
        ],
        es: [
          'Pasaporte vigente',
          'Debe cubrir el periodo de estancia solicitado.',
        ],
      },
      {
        en: [
          'Certificate of Eligibility obtained by your sponsor',
          'The employer or school applies for it at the regional immigration bureau in Japan and posts it to you. This is the real application; the embassy stage is a formality after it.',
        ],
        pt: [
          'Certificate of Eligibility obtido pelo seu patrocinador',
          'O empregador ou a escola o pede no escritório regional de imigração no Japão e o envia a você. Este é o pedido de verdade; a etapa na embaixada é uma formalidade depois dele.',
        ],
        es: [
          'Certificate of Eligibility obtenido por su patrocinador',
          'El empleador o la escuela lo solicita en la oficina regional de inmigración en Japón y se lo envía. Esta es la solicitud real; la etapa en la embajada es un trámite posterior.',
        ],
      },
      {
        en: [
          'Visa application form with photograph',
          'Taken to the embassy together with the original Certificate of Eligibility.',
        ],
        pt: [
          'Formulário de pedido de visto com fotografia',
          'Levado à embaixada junto com o Certificate of Eligibility original.',
        ],
        es: [
          'Formulario de solicitud de visado con fotografía',
          'Se lleva a la embajada junto con el Certificate of Eligibility original.',
        ],
      },
      {
        en: [
          'Employment contract stating the status of residence',
          'The role has to match one of the defined work statuses; Japan does not have a general work visa.',
        ],
        pt: [
          'Contrato de trabalho indicando o status de residência',
          'A função precisa corresponder a um dos status de trabalho definidos; o Japão não tem visto de trabalho genérico.',
        ],
        es: [
          'Contrato de trabajo que indique el estatus de residencia',
          'El puesto debe corresponder a uno de los estatus de trabajo definidos; Japón no tiene un visado de trabajo genérico.',
        ],
      },
      {
        en: [
          'Company documents of the sponsor',
          'Registration certificate, financial statements and a description of the business, supplied by the employer for the eligibility stage.',
        ],
        pt: [
          'Documentos societários do patrocinador',
          'Certidão de registo, demonstrações financeiras e descrição do negócio, fornecidos pelo empregador na etapa de elegibilidade.',
        ],
        es: [
          'Documentos societarios del patrocinador',
          'Certificado de registro, estados financieros y descripción del negocio, aportados por el empleador en la etapa de elegibilidad.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Degree certificate and academic transcripts',
          'Most work statuses require a relevant degree, or a long record of practical experience in its place.',
        ],
        pt: [
          'Diploma e históricos escolares',
          'A maioria dos status de trabalho exige diploma na área, ou um longo histórico de experiência prática no lugar dele.',
        ],
        es: [
          'Título y expedientes académicos',
          'La mayoría de los estatus de trabajo exige un título afín, o un largo historial de experiencia práctica en su lugar.',
        ],
      },
      {
        en: [
          'Curriculum vitae and reference letters',
          'Evidencing the experience that supports the status applied for.',
        ],
        pt: [
          'Currículo e cartas de referência',
          'Comprovando a experiência que sustenta o status pedido.',
        ],
        es: [
          'Currículum y cartas de referencia',
          'Que acrediten la experiencia que sustenta el estatus solicitado.',
        ],
      },
      {
        en: [
          'Japanese language certificate where relevant',
          'Not required for every status, but it scores points under the highly skilled professional system, which shortens the road to permanent residence.',
        ],
        pt: [
          'Certificado de japonês quando relevante',
          'Não é exigido em todo status, mas pontua no sistema de profissional altamente qualificado, que encurta o caminho para a residência permanente.',
        ],
        es: [
          'Certificado de japonés cuando sea relevante',
          'No se exige en todos los estatus, pero puntúa en el sistema de profesional altamente cualificado, que acorta el camino a la residencia permanente.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Salary comparable to a Japanese national in the role',
          'A statutory requirement, not a guideline; underpaying a foreign worker blocks the status.',
        ],
        pt: [
          'Salário comparável ao de um japonês na mesma função',
          'É exigência legal, não recomendação; pagar menos a um trabalhador estrangeiro impede o status.',
        ],
        es: [
          'Salario comparable al de un japonés en el mismo puesto',
          'Es un requisito legal, no una recomendación; pagar menos a un trabajador extranjero bloquea el estatus.',
        ],
      },
      {
        en: [
          'Proof of funds for the settling-in period',
          'Deposits and agency fees for housing in Japan are unusually high and are paid before the first salary.',
        ],
        pt: [
          'Comprovação de recursos para o período de instalação',
          'Depósitos e taxas de imobiliária no Japão são excepcionalmente altos e são pagos antes do primeiro salário.',
        ],
        es: [
          'Prueba de fondos para el periodo de instalación',
          'Los depósitos y las comisiones inmobiliarias en Japón son excepcionalmente altos y se pagan antes del primer salario.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Sponsor files for the Certificate of Eligibility',
          'This stage takes weeks to months and is where the substantive decision is made.',
        ],
        pt: [
          'Patrocinador protocola o Certificate of Eligibility',
          'Essa etapa leva de semanas a meses e é onde a decisão substantiva acontece.',
        ],
        es: [
          'El patrocinador presenta el Certificate of Eligibility',
          'Esa etapa lleva de semanas a meses y es donde se toma la decisión de fondo.',
        ],
      },
      {
        en: [
          'Apply for the visa at the embassy with the certificate',
          'Usually decided within days once the certificate is in hand.',
        ],
        pt: [
          'Pedir o visto na embaixada com o certificado',
          'Em geral decidido em poucos dias com o certificado em mãos.',
        ],
        es: [
          'Solicitar el visado en la embajada con el certificado',
          'Por lo general se resuelve en pocos días con el certificado en mano.',
        ],
      },
      {
        en: [
          'Travel within the certificate validity',
          'The Certificate of Eligibility expires a few months after issue, and an expired one cannot be used.',
        ],
        pt: [
          'Viajar dentro da validade do certificado',
          'O Certificate of Eligibility expira poucos meses após a emissão, e um vencido não pode ser usado.',
        ],
        es: [
          'Viajar dentro de la validez del certificado',
          'El Certificate of Eligibility caduca pocos meses tras su emisión, y uno caducado no sirve.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints and photograph on arrival',
          'Taken at immigration when you enter.',
        ],
        pt: [
          'Impressões digitais e fotografia na chegada',
          'Recolhidas na imigração ao entrar.',
        ],
        es: [
          'Huellas y fotografía a la llegada',
          'Se toman en inmigración al entrar.',
        ],
      },
      {
        en: [
          'Enrol in national health insurance after registering',
          'Compulsory for residents, arranged either through the employer or at the municipal office.',
        ],
        pt: [
          'Inscrever-se no seguro nacional de saúde após o registo',
          'Obrigatório para residentes, providenciado pelo empregador ou no escritório municipal.',
        ],
        es: [
          'Inscribirse en el seguro nacional de salud tras el registro',
          'Obligatorio para residentes, se gestiona por el empleador o en la oficina municipal.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the residence card at the airport',
          'Issued on arrival at the major airports. Carry it at all times — it is your identity document in Japan.',
        ],
        pt: [
          'Receber o cartão de residência no aeroporto',
          'Emitido na chegada nos principais aeroportos. Ande sempre com ele — é o seu documento de identidade no Japão.',
        ],
        es: [
          'Recoger la tarjeta de residencia en el aeropuerto',
          'Se emite a la llegada en los principales aeropuertos. Llévela siempre encima: es su documento de identidad en Japón.',
        ],
      },
      {
        en: [
          'Register your address at the municipal office within fourteen days',
          'This is what enrols you in health insurance and pension, and it is a legal deadline.',
        ],
        pt: [
          'Registar a morada no escritório municipal em até catorze dias',
          'É o que inscreve você no seguro de saúde e na previdência, e é prazo legal.',
        ],
        es: [
          'Registrar su domicilio en la oficina municipal en catorce días',
          'Es lo que le inscribe en el seguro de salud y en la pensión, y es un plazo legal.',
        ],
      },
      {
        en: [
          'Open a bank account and get a personal seal if needed',
          'Many procedures still expect a hanko, though signatures are increasingly accepted.',
        ],
        pt: [
          'Abrir conta bancária e obter um carimbo pessoal se necessário',
          'Muitos procedimentos ainda esperam um hanko, embora assinaturas sejam cada vez mais aceitas.',
        ],
        es: [
          'Abrir una cuenta bancaria y obtener un sello personal si hace falta',
          'Muchos trámites aún esperan un hanko, aunque las firmas se aceptan cada vez más.',
        ],
        priority: 2,
      },
      {
        en: [
          'Get permission before doing work outside your status',
          'Any activity beyond what the status covers needs separate authorisation from immigration.',
        ],
        pt: [
          'Pedir permissão antes de trabalhar fora do seu status',
          'Qualquer atividade além do que o status cobre exige autorização à parte da imigração.',
        ],
        es: [
          'Pedir permiso antes de trabajar fuera de su estatus',
          'Cualquier actividad más allá de lo que cubre el estatus exige autorización aparte de inmigración.',
        ],
      },
      {
        en: [
          'Apply for a re-entry permit or use the special re-entry system',
          'Leaving Japan without either can end your status while you are away.',
        ],
        pt: [
          'Pedir permissão de reentrada ou usar o sistema de reentrada especial',
          'Sair do Japão sem uma das duas pode encerrar seu status enquanto você estiver fora.',
        ],
        es: [
          'Solicitar permiso de reentrada o usar el sistema de reentrada especial',
          'Salir de Japón sin ninguno de los dos puede extinguir su estatus mientras está fuera.',
        ],
      },
    ],
  },

  'Specified Visas (Designated Activities etc.)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Covering the whole period of the designated activity.',
        ],
        pt: [
          'Passaporte válido',
          'Cobrindo todo o período da atividade designada.',
        ],
        es: [
          'Pasaporte vigente',
          'Que cubra todo el periodo de la actividad designada.',
        ],
      },
      {
        en: [
          'Identify which designated activity applies',
          'This status is a container for several unrelated schemes: working holiday, job hunting for graduates, and remote work among them. Each has its own conditions.',
        ],
        pt: [
          'Identificar qual atividade designada se aplica',
          'Esse status é um guarda-chuva para programas distintos entre si: working holiday, busca de emprego para formados e trabalho remoto, entre outros. Cada um tem condições próprias.',
        ],
        es: [
          'Identificar qué actividad designada le aplica',
          'Ese estatus es un contenedor de programas distintos entre sí: working holiday, búsqueda de empleo para titulados y trabajo remoto, entre otros. Cada uno tiene sus propias condiciones.',
        ],
      },
      {
        en: [
          'Visa application form with photograph',
          'Plus the documents specific to the scheme you are applying under.',
        ],
        pt: [
          'Formulário de pedido de visto com fotografia',
          'Além dos documentos específicos do programa sob o qual você está pedindo.',
        ],
        es: [
          'Formulario de solicitud de visado con fotografía',
          'Además de los documentos específicos del programa bajo el que solicita.',
        ],
      },
      {
        en: [
          'Bilateral scheme confirmation for working holiday',
          'Only nationals of partner countries qualify, within an age range and usually once in a lifetime.',
        ],
        pt: [
          'Confirmação do acordo bilateral para working holiday',
          'Só nacionais de países parceiros qualificam, dentro de uma faixa etária e em geral uma vez na vida.',
        ],
        es: [
          'Confirmación del acuerdo bilateral para working holiday',
          'Solo califican nacionales de países socios, dentro de un rango de edad y por lo general una sola vez en la vida.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Employment contract with a foreign company for remote work',
          'The remote work scheme requires the employer and the income to be outside Japan.',
        ],
        pt: [
          'Contrato de trabalho com empresa estrangeira no caso do trabalho remoto',
          'O programa de trabalho remoto exige que o empregador e a renda estejam fora do Japão.',
        ],
        es: [
          'Contrato de trabajo con una empresa extranjera para el trabajo remoto',
          'El programa de trabajo remoto exige que el empleador y los ingresos estén fuera de Japón.',
        ],
        priority: 2,
        required: false,
      },
    ],
    education: [
      {
        en: [
          'Qualification from a recognised university',
          'The job-hunting schemes for graduates are restricted to degrees from institutions meeting a ranking or partnership criterion.',
        ],
        pt: [
          'Qualificação de universidade reconhecida',
          'Os programas de busca de emprego para formados se restringem a diplomas de instituições que cumprem critério de ranking ou de parceria.',
        ],
        es: [
          'Titulación de una universidad reconocida',
          'Los programas de búsqueda de empleo para titulados se limitan a títulos de instituciones que cumplen un criterio de ranking o de convenio.',
        ],
        required: false,
      },
      {
        en: [
          'Plan of activities in Japan',
          'A written statement of what you will do and for how long, which is the substance of the assessment here.',
        ],
        pt: [
          'Plano de atividades no Japão',
          'Uma declaração escrita do que você fará e por quanto tempo, que é a substância da avaliação aqui.',
        ],
        es: [
          'Plan de actividades en Japón',
          'Una declaración escrita de qué hará y durante cuánto tiempo, que es la sustancia de la evaluación aquí.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of funds for the whole stay',
          'These schemes rarely come with a Japanese salary, so the threshold is meaningful and is checked.',
        ],
        pt: [
          'Comprovação de recursos para toda a estada',
          'Esses programas raramente vêm com salário japonês, então o piso é significativo e é conferido.',
        ],
        es: [
          'Prueba de fondos para toda la estancia',
          'Estos programas rara vez vienen con un salario japonés, así que el umbral es significativo y se comprueba.',
        ],
      },
      {
        en: [
          'Evidence of annual income for the remote work scheme',
          'That route sets an income floor that is high relative to the others.',
        ],
        pt: [
          'Comprovação de renda anual no programa de trabalho remoto',
          'Essa rota fixa um piso de renda alto em relação às demais.',
        ],
        es: [
          'Prueba de ingresos anuales en el programa de trabajo remoto',
          'Esa vía fija un umbral de ingresos alto en relación con las demás.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Return ticket or funds to buy one',
          'Required on the working holiday scheme.',
        ],
        pt: [
          'Passagem de volta ou recursos para comprá-la',
          'Exigido no programa de working holiday.',
        ],
        es: [
          'Billete de vuelta o fondos para comprarlo',
          'Exigido en el programa de working holiday.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply at the embassy, or obtain a Certificate of Eligibility first',
          'Which path applies depends on the scheme: working holiday goes straight to the embassy, while others need the certificate.',
        ],
        pt: [
          'Pedir na embaixada, ou obter antes um Certificate of Eligibility',
          'Qual caminho vale depende do programa: working holiday vai direto à embaixada, enquanto outros exigem o certificado.',
        ],
        es: [
          'Solicitar en la embajada, u obtener antes un Certificate of Eligibility',
          'Qué vía aplica depende del programa: working holiday va directamente a la embajada, mientras que otros exigen el certificado.',
        ],
      },
      {
        en: [
          'Pay the visa fee',
          'Charged at the embassy; some schemes are exempt under the bilateral agreement.',
        ],
        pt: [
          'Pagar a taxa do visto',
          'Cobrada na embaixada; alguns programas são isentos pelo acordo bilateral.',
        ],
        es: [
          'Pagar la tasa del visado',
          'Se cobra en la embajada; algunos programas están exentos por el acuerdo bilateral.',
        ],
      },
      {
        en: [
          'Watch the annual quota where one applies',
          'Some bilateral schemes cap the number of places per year and close once filled.',
        ],
        pt: [
          'Acompanhar a cota anual quando houver',
          'Alguns acordos bilaterais limitam o número de vagas por ano e fecham quando preenchidas.',
        ],
        es: [
          'Vigilar el cupo anual cuando lo haya',
          'Algunos acuerdos bilaterales limitan el número de plazas por año y cierran al llenarse.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints and photograph on arrival',
          'Taken at immigration when you enter.',
        ],
        pt: [
          'Impressões digitais e fotografia na chegada',
          'Recolhidas na imigração ao entrar.',
        ],
        es: [
          'Huellas y fotografía a la llegada',
          'Se toman en inmigración al entrar.',
        ],
      },
      {
        en: [
          'Private health insurance for the whole stay',
          'Compulsory on several of these schemes, including the remote work route, because they do not enrol you in the national system.',
        ],
        pt: [
          'Seguro de saúde privado para toda a estada',
          'Obrigatório em vários desses programas, inclusive o de trabalho remoto, porque eles não inscrevem você no sistema nacional.',
        ],
        es: [
          'Seguro de salud privado para toda la estancia',
          'Obligatorio en varios de estos programas, incluido el de trabajo remoto, porque no le inscriben en el sistema nacional.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the residence card if the stay exceeds three months',
          'Shorter designated activities do not produce a residence card.',
        ],
        pt: [
          'Receber o cartão de residência se a estada passar de três meses',
          'Atividades designadas mais curtas não geram cartão de residência.',
        ],
        es: [
          'Recoger la tarjeta de residencia si la estancia supera los tres meses',
          'Las actividades designadas más cortas no generan tarjeta de residencia.',
        ],
      },
      {
        en: [
          'Register your address at the municipal office',
          'Within fourteen days, for stays that produce a residence card.',
        ],
        pt: [
          'Registar a morada no escritório municipal',
          'Em até catorze dias, nas estadas que geram cartão de residência.',
        ],
        es: [
          'Registrar su domicilio en la oficina municipal',
          'En catorce días, para las estancias que generan tarjeta de residencia.',
        ],
      },
      {
        en: [
          'Stay inside the activity that was designated',
          'The permitted work differs sharply between schemes; remote work routes generally do not allow working for a Japanese employer.',
        ],
        pt: [
          'Manter-se dentro da atividade que foi designada',
          'O trabalho permitido varia muito entre programas; rotas de trabalho remoto em geral não permitem trabalhar para empregador japonês.',
        ],
        es: [
          'Mantenerse dentro de la actividad designada',
          'El trabajo permitido varía mucho entre programas; las vías de trabajo remoto por lo general no permiten trabajar para un empleador japonés.',
        ],
      },
      {
        en: [
          'Plan the change of status before the period ends',
          'Most of these schemes are not renewable; converting to a work status requires an employer and a new certificate.',
        ],
        pt: [
          'Planejar a mudança de status antes do fim do período',
          'A maioria desses programas não é renovável; converter para status de trabalho exige um empregador e um novo certificado.',
        ],
        es: [
          'Planificar el cambio de estatus antes de que acabe el periodo',
          'La mayoría de estos programas no es renovable; convertir a un estatus de trabajo exige un empleador y un nuevo certificado.',
        ],
        priority: 2,
      },
    ],
  },

  'Diplomatic / Official Visas': {
    core_documents: [
      {
        en: [
          'Diplomatic or official passport',
          'Issued by the sending government; an ordinary passport does not support this category.',
        ],
        pt: [
          'Passaporte diplomático ou oficial',
          'Emitido pelo governo de origem; passaporte comum não sustenta esta categoria.',
        ],
        es: [
          'Pasaporte diplomático u oficial',
          'Emitido por el gobierno de origen; un pasaporte ordinario no sustenta esta categoría.',
        ],
      },
      {
        en: [
          'Note verbale from the sending government',
          'The formal diplomatic communication requesting the visa, stating the posting and its duration.',
        ],
        pt: [
          'Nota verbal do governo de origem',
          'A comunicação diplomática formal solicitando o visto, com o posto e a duração dele.',
        ],
        es: [
          'Nota verbal del gobierno de origen',
          'La comunicación diplomática formal que solicita el visado, indicando el destino y su duración.',
        ],
      },
      {
        en: [
          'Visa application form with photograph',
          'Submitted through diplomatic channels rather than at a public counter.',
        ],
        pt: [
          'Formulário de pedido de visto com fotografia',
          'Entregue por canais diplomáticos, não num guichê público.',
        ],
        es: [
          'Formulario de solicitud de visado con fotografía',
          'Se presenta por canales diplomáticos, no en una ventanilla pública.',
        ],
      },
      {
        en: [
          'Documents for accompanying family',
          'Spouse and dependent children are covered by the same note verbale, with their relationship evidenced.',
        ],
        pt: [
          'Documentos dos familiares acompanhantes',
          'Cônjuge e filhos dependentes são cobertos pela mesma nota verbal, com o vínculo comprovado.',
        ],
        es: [
          'Documentos de los familiares acompañantes',
          'Cónyuge e hijos dependientes se cubren con la misma nota verbal, con el vínculo acreditado.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'No proof of personal funds is required',
          'The sending government assumes responsibility, which is what distinguishes this category from every other one here.',
        ],
        pt: [
          'Não é exigida comprovação de recursos pessoais',
          'O governo de origem assume a responsabilidade, e é isso que distingue esta categoria de todas as outras aqui.',
        ],
        es: [
          'No se exige prueba de fondos personales',
          'El gobierno de origen asume la responsabilidad, y eso es lo que distingue esta categoría de todas las demás aquí.',
        ],
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Submit through the embassy’s diplomatic section',
          'Not through the general visa counter or an accredited agency.',
        ],
        pt: [
          'Entregar pela seção diplomática da embaixada',
          'Não pelo guichê geral de vistos nem por agência credenciada.',
        ],
        es: [
          'Presentar por la sección diplomática de la embajada',
          'No por la ventanilla general de visados ni por una agencia acreditada.',
        ],
      },
      {
        en: [
          'No visa fee is charged',
          'Diplomatic and official categories are exempt.',
        ],
        pt: [
          'Não há cobrança de taxa de visto',
          'As categorias diplomática e oficial são isentas.',
        ],
        es: [
          'No se cobra tasa de visado',
          'Las categorías diplomática y oficial están exentas.',
        ],
      },
      {
        en: [
          'Allow time for the diplomatic exchange',
          'Processing depends on the correspondence between governments, not on a public service standard.',
        ],
        pt: [
          'Prever tempo para a troca diplomática',
          'A análise depende da correspondência entre governos, não de um prazo de atendimento público.',
        ],
        es: [
          'Prever tiempo para el intercambio diplomático',
          'La tramitación depende de la correspondencia entre gobiernos, no de un plazo de atención al público.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Exemption from fingerprinting on arrival',
          'Holders of diplomatic and official status are not fingerprinted at immigration.',
        ],
        pt: [
          'Isenção de coleta de impressões digitais na chegada',
          'Titulares de status diplomático e oficial não têm impressões coletadas na imigração.',
        ],
        es: [
          'Exención de la toma de huellas a la llegada',
          'Los titulares de estatus diplomático y oficial no pasan por la toma de huellas en inmigración.',
        ],
      },
      {
        en: [
          'Health cover arranged by the mission',
          'Provided through the sending government rather than the Japanese national system.',
        ],
        pt: [
          'Cobertura de saúde providenciada pela missão',
          'Fornecida pelo governo de origem, não pelo sistema nacional japonês.',
        ],
        es: [
          'Cobertura sanitaria gestionada por la misión',
          'La proporciona el gobierno de origen, no el sistema nacional japonés.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Register with the Ministry of Foreign Affairs on arrival',
          'The mission handles the accreditation and the identification card, in place of an ordinary residence card.',
        ],
        pt: [
          'Registar-se no Ministério das Relações Exteriores ao chegar',
          'A missão cuida do credenciamento e do cartão de identificação, no lugar do cartão de residência comum.',
        ],
        es: [
          'Registrarse en el Ministerio de Asuntos Exteriores al llegar',
          'La misión gestiona la acreditación y la tarjeta de identificación, en lugar de una tarjeta de residencia ordinaria.',
        ],
      },
      {
        en: [
          'Note that this time does not count towards permanent residence',
          'Diplomatic and official status sit outside the ordinary residence framework.',
        ],
        pt: [
          'Saber que esse tempo não conta para a residência permanente',
          'Os status diplomático e oficial ficam fora do quadro comum de residência.',
        ],
        es: [
          'Saber que ese tiempo no cuenta para la residencia permanente',
          'Los estatus diplomático y oficial quedan fuera del marco ordinario de residencia.',
        ],
      },
      {
        en: [
          'Change status before the posting ends if you intend to stay',
          'Remaining in Japan afterwards requires a change to an ordinary status of residence.',
        ],
        pt: [
          'Mudar de status antes do fim do posto se pretende ficar',
          'Permanecer no Japão depois disso exige mudança para um status de residência comum.',
        ],
        es: [
          'Cambiar de estatus antes de que acabe el destino si piensa quedarse',
          'Permanecer en Japón después exige el cambio a un estatus de residencia ordinario.',
        ],
        priority: 2,
      },
    ],
  },

  'Permanent Residence (Status of Residence)': {
    core_documents: [
      {
        en: [
          'Valid passport and current residence card',
          'You apply from inside Japan, holding a valid status of residence.',
        ],
        pt: [
          'Passaporte válido e cartão de residência atual',
          'O pedido é feito de dentro do Japão, com um status de residência válido.',
        ],
        es: [
          'Pasaporte vigente y tarjeta de residencia actual',
          'La solicitud se hace desde dentro de Japón, con un estatus de residencia vigente.',
        ],
      },
      {
        en: [
          'Application for permission for permanent residence',
          'Filed at the regional immigration bureau covering where you live.',
        ],
        pt: [
          'Pedido de permissão de residência permanente',
          'Protocolado no escritório regional de imigração da região onde você mora.',
        ],
        es: [
          'Solicitud de permiso de residencia permanente',
          'Se presenta en la oficina regional de inmigración de la zona donde vive.',
        ],
      },
      {
        en: [
          'Certificate of residence and family register extract',
          'The juminhyo showing everyone in the household, obtained at the municipal office.',
        ],
        pt: [
          'Certidão de residência e extrato do registo familiar',
          'O juminhyo mostrando todos do domicílio, obtido no escritório municipal.',
        ],
        es: [
          'Certificado de residencia y extracto del registro familiar',
          'El juminhyo que muestra a todos los del hogar, obtenido en la oficina municipal.',
        ],
      },
      {
        en: [
          'Letter of guarantee from a guarantor in Japan',
          'A Japanese national or permanent resident who vouches for you. This is a personal commitment and finding a guarantor is often the hardest part.',
        ],
        pt: [
          'Carta de garantia de um fiador no Japão',
          'Um japonês ou residente permanente que responde por você. É um compromisso pessoal, e encontrar fiador costuma ser a parte mais difícil.',
        ],
        es: [
          'Carta de garantía de un garante en Japón',
          'Un japonés o residente permanente que responde por usted. Es un compromiso personal, y encontrar garante suele ser lo más difícil.',
        ],
      },
      {
        en: [
          'Written statement of the reasons for applying',
          'Explaining your ties to Japan and why you intend to settle.',
        ],
        pt: [
          'Declaração escrita das razões do pedido',
          'Explicando seus vínculos com o Japão e por que pretende se fixar.',
        ],
        es: [
          'Declaración escrita de los motivos de la solicitud',
          'Explicando sus vínculos con Japón y por qué pretende establecerse.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Evidence of the highly skilled professional points',
          'Reaching the points threshold shortens the required residence dramatically, from around a decade to a few years.',
        ],
        pt: [
          'Comprovação dos pontos de profissional altamente qualificado',
          'Atingir o limiar de pontos encurta drasticamente a residência exigida, de cerca de uma década para poucos anos.',
        ],
        es: [
          'Prueba de los puntos de profesional altamente cualificado',
          'Alcanzar el umbral de puntos acorta drásticamente la residencia exigida, de alrededor de una década a unos pocos años.',
        ],
        required: false,
      },
      {
        en: [
          'Japanese language certificate',
          'Not a formal condition, but it scores points and supports the integration side of the assessment.',
        ],
        pt: [
          'Certificado de japonês',
          'Não é condição formal, mas pontua e sustenta o lado de integração da avaliação.',
        ],
        es: [
          'Certificado de japonés',
          'No es una condición formal, pero puntúa y respalda el lado de integración de la evaluación.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Tax certificates for the last several years',
          'Both payment certificates and taxation certificates, from the municipality and the tax office.',
        ],
        pt: [
          'Certidões fiscais dos últimos anos',
          'Tanto comprovantes de pagamento quanto certidões de tributação, do município e da receita.',
        ],
        es: [
          'Certificados fiscales de los últimos años',
          'Tanto comprobantes de pago como certificados de tributación, del municipio y de la agencia tributaria.',
        ],
      },
      {
        en: [
          'Proof of pension and health insurance payments',
          'Every contribution paid on time. Late payments are the single most common reason permanent residence is refused.',
        ],
        pt: [
          'Comprovação de pagamentos de previdência e seguro de saúde',
          'Cada contribuição paga em dia. Atrasos são de longe o motivo mais comum de indeferimento da residência permanente.',
        ],
        es: [
          'Prueba de pagos de pensión y seguro de salud',
          'Cada cotización pagada a tiempo. Los retrasos son con diferencia el motivo más común de denegación de la residencia permanente.',
        ],
      },
      {
        en: [
          'Evidence of stable income',
          'Employment certificate and income statements showing you can support yourself independently.',
        ],
        pt: [
          'Comprovação de renda estável',
          'Certificado de emprego e comprovantes de renda mostrando que você se sustenta de forma independente.',
        ],
        es: [
          'Prueba de ingresos estables',
          'Certificado de empleo y comprobantes de ingresos que muestren que se mantiene de forma independiente.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Hold the longest available period of stay first',
          'Applicants are normally expected to be on a three or five year status before applying.',
        ],
        pt: [
          'Ter antes o período de permanência mais longo disponível',
          'Espera-se normalmente que o requerente esteja num status de três ou cinco anos antes de pedir.',
        ],
        es: [
          'Tener antes el periodo de estancia más largo disponible',
          'Normalmente se espera que el solicitante esté en un estatus de tres o cinco años antes de solicitar.',
        ],
      },
      {
        en: [
          'File at the regional immigration bureau',
          'The decision commonly takes many months, sometimes more than a year.',
        ],
        pt: [
          'Protocolar no escritório regional de imigração',
          'A decisão comumente leva muitos meses, às vezes mais de um ano.',
        ],
        es: [
          'Presentar en la oficina regional de inmigración',
          'La decisión suele tardar muchos meses, a veces más de un año.',
        ],
      },
      {
        en: [
          'Keep the current status valid while waiting',
          'Renew it normally during the wait; letting it lapse ends the application.',
        ],
        pt: [
          'Manter o status atual válido durante a espera',
          'Renove-o normalmente enquanto aguarda; deixá-lo caducar encerra o pedido.',
        ],
        es: [
          'Mantener vigente el estatus actual durante la espera',
          'Renuévelo con normalidad mientras espera; dejarlo caducar termina la solicitud.',
        ],
      },
      {
        en: [
          'Pay the fee only once it is granted',
          'The revenue stamp is bought when permission is issued, not at lodgement.',
        ],
        pt: [
          'Pagar a taxa só quando for concedida',
          'O selo fiscal é comprado na concessão da permissão, não no protocolo.',
        ],
        es: [
          'Pagar la tasa solo cuando se conceda',
          'El sello fiscal se compra al emitir el permiso, no al presentar.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Photograph for the new residence card',
          'Taken or supplied when the permission is granted.',
        ],
        pt: [
          'Fotografia para o novo cartão de residência',
          'Tirada ou fornecida quando a permissão é concedida.',
        ],
        es: [
          'Fotografía para la nueva tarjeta de residencia',
          'Se toma o se aporta cuando se concede el permiso.',
        ],
      },
      {
        en: [
          'Continuous health insurance enrolment',
          'Gaps in cover count against the application as much as unpaid contributions.',
        ],
        pt: [
          'Inscrição contínua no seguro de saúde',
          'Lacunas na cobertura pesam contra o pedido tanto quanto contribuições não pagas.',
        ],
        es: [
          'Inscripción continua en el seguro de salud',
          'Los vacíos de cobertura pesan contra la solicitud tanto como las cotizaciones impagadas.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the new residence card',
          'Permanent residence removes the activity restrictions, so you may work in anything.',
        ],
        pt: [
          'Retirar o novo cartão de residência',
          'A residência permanente remove as restrições de atividade, então você pode trabalhar em qualquer coisa.',
        ],
        es: [
          'Recoger la nueva tarjeta de residencia',
          'La residencia permanente elimina las restricciones de actividad, así que puede trabajar en cualquier cosa.',
        ],
      },
      {
        en: [
          'Renew the card every seven years',
          'The status is open-ended, but the physical card still expires and must be renewed.',
        ],
        pt: [
          'Renovar o cartão a cada sete anos',
          'O status é por prazo indeterminado, mas o cartão físico ainda vence e precisa ser renovado.',
        ],
        es: [
          'Renovar la tarjeta cada siete años',
          'El estatus es indefinido, pero la tarjeta física sigue caducando y hay que renovarla.',
        ],
      },
      {
        en: [
          'Use the re-entry system when leaving Japan',
          'Permanent residence can still be lost by leaving for a long period without the proper re-entry arrangement.',
        ],
        pt: [
          'Usar o sistema de reentrada ao sair do Japão',
          'A residência permanente ainda pode ser perdida por sair por período longo sem o arranjo de reentrada adequado.',
        ],
        es: [
          'Usar el sistema de reentrada al salir de Japón',
          'La residencia permanente aún puede perderse por salir un periodo largo sin el arreglo de reentrada adecuado.',
        ],
      },
      {
        en: [
          'Keep paying taxes and contributions on time',
          'Permanent residence can be revoked, and compliance remains the condition it rests on.',
        ],
        pt: [
          'Continuar pagando impostos e contribuições em dia',
          'A residência permanente pode ser revogada, e o cumprimento continua sendo a condição em que ela se apoia.',
        ],
        es: [
          'Seguir pagando impuestos y cotizaciones a tiempo',
          'La residencia permanente puede revocarse, y el cumplimiento sigue siendo la condición en la que se apoya.',
        ],
        priority: 2,
      },
    ],
  },
};
