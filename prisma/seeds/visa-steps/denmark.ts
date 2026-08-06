import type { CountryVisaSteps } from './types';

/**
 * Steps for Denmark.
 *
 * Work permits run through named schemes rather than a general work visa: the
 * pay limit scheme for high salaries, the positive lists for occupations in
 * shortage. Which scheme your job fits decides the requirements, so identifying
 * it correctly comes before anything else.
 *
 * After arrival, the CPR number is what makes ordinary life work, and MitID —
 * the national digital identity — is what makes anything online work. Neither
 * comes with the residence permit; both are separate steps.
 *
 * Permanent residence is among the most demanding in Europe: it combines a long
 * qualifying period, a Danish language level, a continuous employment record
 * and a bar on having received public benefits. It is worth planning for from
 * the first year rather than discovering the conditions at the end.
 */
export const denmark: CountryVisaSteps = {
  'Short-Stay Visa (Schengen Type C)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Valid for at least three months beyond departure and issued within the last ten years.',
        ],
        pt: [
          'Passaporte válido',
          'Válido por pelo menos três meses além da saída e emitido nos últimos dez anos.',
        ],
        es: [
          'Pasaporte vigente',
          'Vigente al menos tres meses más allá de la salida y emitido en los últimos diez años.',
        ],
      },
      {
        en: [
          'Online application through the case order portal',
          'Denmark issues a case order ID that must accompany the application; without it the file is not accepted.',
        ],
        pt: [
          'Pedido online pelo portal de ordem de processo',
          'A Dinamarca emite um case order ID que precisa acompanhar o pedido; sem ele o processo não é aceite.',
        ],
        es: [
          'Solicitud en línea por el portal de orden de expediente',
          'Dinamarca emite un case order ID que debe acompañar la solicitud; sin él el expediente no se acepta.',
        ],
      },
      {
        en: [
          'One recent photograph',
          'Passport format, on a light background.',
        ],
        pt: ['Uma fotografia recente', 'Formato passaporte, em fundo claro.'],
        es: ['Una fotografía reciente', 'Formato pasaporte, con fondo claro.'],
      },
      {
        en: [
          'Return flight reservation',
          'A reservation only, matching the dates declared.',
        ],
        pt: [
          'Reserva de voo de volta',
          'Apenas a reserva, coerente com as datas declaradas.',
        ],
        es: [
          'Reserva de vuelo de vuelta',
          'Solo la reserva, coherente con las fechas declaradas.',
        ],
      },
      {
        en: [
          'Proof of accommodation or an invitation',
          'A hotel booking, or an invitation from your host in Denmark.',
        ],
        pt: [
          'Comprovativo de alojamento ou convite',
          'Reserva de hotel, ou convite do anfitrião na Dinamarca.',
        ],
        es: [
          'Comprobante de alojamiento o invitación',
          'Reserva de hotel, o invitación del anfitrión en Dinamarca.',
        ],
      },
      {
        en: [
          'Travel medical insurance',
          'Minimum cover of 30,000 euros, valid across the Schengen area.',
        ],
        pt: [
          'Seguro médico de viagem',
          'Cobertura mínima de 30 mil euros, válida no espaço Schengen.',
        ],
        es: [
          'Seguro médico de viaje',
          'Cobertura mínima de 30 mil euros, válida en el espacio Schengen.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of means for the stay',
          'A daily figure per person; Denmark is expensive and the expectation reflects that.',
        ],
        pt: [
          'Comprovativo de meios para a estada',
          'Um valor diário por pessoa; a Dinamarca é cara e a expectativa reflete isso.',
        ],
        es: [
          'Comprobante de medios para la estancia',
          'Una cifra diaria por persona; Dinamarca es cara y la expectativa lo refleja.',
        ],
      },
      {
        en: [
          'Bank statements from the last three months',
          'The balance has to be consistent with the trip described.',
        ],
        pt: [
          'Extratos bancários dos últimos três meses',
          'O saldo precisa ser coerente com a viagem descrita.',
        ],
        es: [
          'Extractos bancarios de los últimos tres meses',
          'El saldo debe ser coherente con el viaje descrito.',
        ],
      },
      {
        en: [
          'Proof of employment and approved leave',
          'An employer letter, or company documents if you are self-employed.',
        ],
        pt: [
          'Comprovativo de vínculo laboral e férias aprovadas',
          'Carta do empregador, ou documentos da empresa se for autônomo.',
        ],
        es: [
          'Comprobante de vínculo laboral y vacaciones aprobadas',
          'Carta del empleador, o documentos de la empresa si trabaja por cuenta propia.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Create the case order ID and pay the fee',
          'Both are done online before booking the appointment.',
        ],
        pt: [
          'Criar o case order ID e pagar a taxa',
          'Ambos feitos online antes de agendar o atendimento.',
        ],
        es: [
          'Crear el case order ID y pagar la tasa',
          'Ambos se hacen en línea antes de reservar la cita.',
        ],
      },
      {
        en: [
          'Book the appointment at the mission or partner centre',
          'Denmark is represented by another Schengen state in several countries.',
        ],
        pt: [
          'Agendar atendimento na representação ou centro parceiro',
          'A Dinamarca é representada por outro Estado Schengen em vários países.',
        ],
        es: [
          'Reservar cita en la representación o centro asociado',
          'Dinamarca está representada por otro Estado Schengen en varios países.',
        ],
      },
      {
        en: [
          'Submit the application in person',
          'Apply no earlier than six months before travelling.',
        ],
        pt: [
          'Entregar o pedido presencialmente',
          'Peça no máximo seis meses antes da viagem.',
        ],
        es: [
          'Presentar la solicitud en persona',
          'Solicite como mucho seis meses antes de viajar.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection',
          'Fingerprints stay on file for 59 months across Schengen applications.',
        ],
        pt: [
          'Recolha de dados biométricos',
          'As impressões ficam registadas por 59 meses entre pedidos Schengen.',
        ],
        es: [
          'Recogida de datos biométricos',
          'Las huellas quedan registradas 59 meses entre solicitudes Schengen.',
        ],
      },
      {
        en: ['Medical examination', 'Not required for short-stay visas.'],
        pt: ['Exame médico', 'Não é exigido em vistos de curta duração.'],
        es: ['Examen médico', 'No se exige en visados de corta duración.'],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the passport with the visa',
          'Check the validity and the number of entries granted.',
        ],
        pt: [
          'Retirar o passaporte com o visto',
          'Confira a validade e o número de entradas concedidas.',
        ],
        es: [
          'Recoger el pasaporte con el visado',
          'Verifique la validez y el número de entradas concedidas.',
        ],
      },
      {
        en: [
          'Respect the 90 days in any 180 rule',
          'Counted across the whole Schengen area, on a rolling basis.',
        ],
        pt: [
          'Respeitar a regra dos 90 dias em cada 180',
          'Contados em todo o espaço Schengen, de forma móvel.',
        ],
        es: [
          'Respetar la regla de 90 días en cada 180',
          'Se cuentan en todo el espacio Schengen, de forma móvil.',
        ],
      },
      {
        en: [
          'Remember that Greenland and the Faroe Islands are separate',
          'A Schengen visa does not cover them; they require their own endorsement.',
        ],
        pt: [
          'Lembrar que Groenlândia e Ilhas Faroé são separadas',
          'Um visto Schengen não as cobre; elas exigem autorização própria.',
        ],
        es: [
          'Recordar que Groenlandia y las Islas Feroe son aparte',
          'Un visado Schengen no las cubre; requieren su propia autorización.',
        ],
      },
      {
        en: [
          'Do not work on a short-stay visa',
          'Working requires a residence and work permit granted in advance.',
        ],
        pt: [
          'Não trabalhar com visto de curta duração',
          'Trabalhar exige autorização de residência e trabalho concedida com antecedência.',
        ],
        es: [
          'No trabajar con visado de corta duración',
          'Trabajar exige un permiso de residencia y trabajo concedido con antelación.',
        ],
      },
    ],
  },

  'Work Residence Permit (Pay Limit / Positive List)': {
    core_documents: [
      {
        en: [
          'Identify which scheme your job fits',
          'There is no general work visa. The pay limit scheme turns on salary; the positive lists turn on the occupation being in shortage. The scheme decides the requirements.',
        ],
        pt: [
          'Identificar em qual esquema sua vaga se encaixa',
          'Não existe visto de trabalho genérico. O esquema de piso salarial depende do salário; as listas positivas dependem de a ocupação estar em falta. O esquema define os requisitos.',
        ],
        es: [
          'Identificar en qué esquema encaja su empleo',
          'No existe un visado de trabajo genérico. El esquema de umbral salarial depende del salario; las listas positivas dependen de que la ocupación esté en escasez. El esquema define los requisitos.',
        ],
      },
      {
        en: [
          'Valid passport',
          'The permit is never granted for longer than the passport validity.',
        ],
        pt: [
          'Passaporte válido',
          'A autorização nunca é concedida por prazo maior que a validade do passaporte.',
        ],
        es: [
          'Pasaporte vigente',
          'El permiso nunca se concede por más tiempo que la vigencia del pasaporte.',
        ],
      },
      {
        en: [
          'Employment contract signed by both parties',
          'Stating salary, working hours, holiday and the start date, on Danish terms.',
        ],
        pt: [
          'Contrato de trabalho assinado pelas duas partes',
          'Com salário, jornada, férias e data de início, em termos dinamarqueses.',
        ],
        es: [
          'Contrato de trabajo firmado por ambas partes',
          'Con salario, jornada, vacaciones y fecha de inicio, en términos daneses.',
        ],
      },
      {
        en: [
          'Online application with the case order ID',
          'Filed through the immigration portal, with the employer completing their part first.',
        ],
        pt: [
          'Pedido online com o case order ID',
          'Protocolado pelo portal de imigração, com o empregador preenchendo a parte dele antes.',
        ],
        es: [
          'Solicitud en línea con el case order ID',
          'Se presenta por el portal de inmigración, con el empleador completando su parte antes.',
        ],
      },
      {
        en: [
          'Power of attorney for the employer',
          'Signed so the company can act on your behalf in the case, which is how most applications are handled.',
        ],
        pt: [
          'Procuração para o empregador',
          'Assinada para a empresa poder atuar em seu nome no processo, que é como a maioria dos pedidos é conduzida.',
        ],
        es: [
          'Poder para el empleador',
          'Firmado para que la empresa pueda actuar en su nombre en el caso, que es como se gestionan la mayoría de las solicitudes.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Diplomas and academic transcripts',
          'Required for the positive list for higher education, which is restricted to specific qualified occupations.',
        ],
        pt: [
          'Diplomas e históricos escolares',
          'Exigidos na lista positiva para ensino superior, restrita a ocupações qualificadas específicas.',
        ],
        es: [
          'Títulos y expedientes académicos',
          'Exigidos en la lista positiva para educación superior, restringida a ocupaciones cualificadas concretas.',
        ],
      },
      {
        en: [
          'Danish authorisation for regulated professions',
          'Healthcare roles need authorisation from the patient safety authority, and it usually requires Danish at a working level. This is often the longest part.',
        ],
        pt: [
          'Autorização dinamarquesa para profissões regulamentadas',
          'Funções na saúde exigem autorização da autoridade de segurança do paciente, e em geral dinamarquês em nível de trabalho. É frequentemente a etapa mais longa.',
        ],
        es: [
          'Autorización danesa para profesiones reguladas',
          'Los puestos sanitarios exigen autorización de la autoridad de seguridad del paciente, y por lo general danés a nivel de trabajo. Suele ser la parte más larga.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Salary meeting the threshold for the scheme',
          'The pay limit is adjusted annually. Confirm the figure in force rather than relying on an older number.',
        ],
        pt: [
          'Salário que atinge o piso do esquema',
          'O piso salarial é ajustado anualmente. Confirme o valor vigente em vez de confiar num número antigo.',
        ],
        es: [
          'Salario que alcanza el umbral del esquema',
          'El umbral salarial se ajusta anualmente. Confirme la cifra vigente en lugar de fiarse de un número antiguo.',
        ],
      },
      {
        en: [
          'Salary paid into a Danish account',
          'The pay must be transferred to a Danish bank account, which is checked at renewal.',
        ],
        pt: [
          'Salário pago em conta dinamarquesa',
          'A remuneração precisa ser transferida para conta bancária dinamarquesa, o que é conferido na renovação.',
        ],
        es: [
          'Salario pagado en una cuenta danesa',
          'La retribución debe transferirse a una cuenta bancaria danesa, lo que se comprueba en la renovación.',
        ],
      },
      {
        en: [
          'Terms matching Danish standards',
          'Salary and conditions must be customary for the occupation, not merely above the threshold.',
        ],
        pt: [
          'Condições compatíveis com os padrões dinamarqueses',
          'Salário e condições precisam ser usuais para a ocupação, não apenas acima do piso.',
        ],
        es: [
          'Condiciones acordes con los estándares daneses',
          'Salario y condiciones deben ser habituales para la ocupación, no solo estar por encima del umbral.',
        ],
      },
      {
        en: [
          'Pay the case processing fee',
          'Charged when the case order ID is created and not refunded on refusal.',
        ],
        pt: [
          'Pagar a taxa de processamento',
          'Cobrada na criação do case order ID e não devolvida em caso de indeferimento.',
        ],
        es: [
          'Pagar la tasa de tramitación',
          'Se cobra al crear el case order ID y no se devuelve si deniegan.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Create the case order ID and pay before filing',
          'Denmark works this way across all residence categories.',
        ],
        pt: [
          'Criar o case order ID e pagar antes de protocolar',
          'A Dinamarca funciona assim em todas as categorias de residência.',
        ],
        es: [
          'Crear el case order ID y pagar antes de presentar',
          'Dinamarca funciona así en todas las categorías de residencia.',
        ],
      },
      {
        en: [
          'Submit the application before travelling',
          'The permit must be granted before you enter to start work.',
        ],
        pt: [
          'Enviar o pedido antes de viajar',
          'A autorização precisa ser concedida antes de você entrar para começar a trabalhar.',
        ],
        es: [
          'Enviar la solicitud antes de viajar',
          'El permiso debe concederse antes de entrar para empezar a trabajar.',
        ],
      },
      {
        en: [
          'Record biometrics within fourteen days of applying',
          'At a Danish mission or an application centre; the case is not processed until this is done.',
        ],
        pt: [
          'Registar a biometria em até catorze dias do pedido',
          'Numa representação dinamarquesa ou centro de pedidos; o processo não anda enquanto isso não for feito.',
        ],
        es: [
          'Registrar la biometría en catorce días desde la solicitud',
          'En una representación danesa o centro de solicitudes; el caso no avanza hasta hacerlo.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection for the residence card',
          'Fingerprints and photograph, within the deadline after applying.',
        ],
        pt: [
          'Recolha de dados biométricos para o cartão de residência',
          'Impressões digitais e fotografia, dentro do prazo após o pedido.',
        ],
        es: [
          'Recogida de datos biométricos para la tarjeta de residencia',
          'Huellas y fotografía, dentro del plazo tras solicitar.',
        ],
      },
      {
        en: [
          'Register with a general practitioner after arrival',
          'Assigned when you get the CPR number; the GP is the gateway to all other care.',
        ],
        pt: [
          'Registar-se num médico de família após a chegada',
          'Atribuído quando você obtém o CPR; o médico de família é a porta para todo o resto do cuidado.',
        ],
        es: [
          'Registrarse con un médico de cabecera tras la llegada',
          'Se asigna cuando obtiene el CPR; el médico de cabecera es la puerta a toda la demás atención.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Register your address and get a CPR number',
          'At the municipality or an international citizen service centre. Nothing works without it: no bank account, no doctor, no salary paid normally.',
        ],
        pt: [
          'Registar a morada e obter o número CPR',
          'No município ou num centro internacional de atendimento. Nada funciona sem ele: nem conta bancária, nem médico, nem salário pago normalmente.',
        ],
        es: [
          'Registrar su domicilio y obtener el número CPR',
          'En el ayuntamiento o en un centro internacional de atención. Nada funciona sin él: ni cuenta bancaria, ni médico, ni salario pagado con normalidad.',
        ],
      },
      {
        en: [
          'Activate MitID',
          'The national digital identity. Almost every public and banking service online requires it, and it is a separate step from the CPR.',
        ],
        pt: [
          'Ativar o MitID',
          'A identidade digital nacional. Quase todo serviço público e bancário online a exige, e é um passo separado do CPR.',
        ],
        es: [
          'Activar MitID',
          'La identidad digital nacional. Casi todo servicio público y bancario en línea la exige, y es un paso aparte del CPR.',
        ],
      },
      {
        en: [
          'Get a tax card before the first payday',
          'Without it the employer withholds at the highest rate.',
        ],
        pt: [
          'Obter o cartão fiscal antes do primeiro pagamento',
          'Sem ele o empregador retém na alíquota máxima.',
        ],
        es: [
          'Obtener la tarjeta fiscal antes del primer pago',
          'Sin ella el empleador retiene al tipo máximo.',
        ],
        priority: 2,
      },
      {
        en: [
          'Apply for a new permit before changing employer or role',
          'The permit is tied to the specific job and employer it was granted for.',
        ],
        pt: [
          'Pedir nova autorização antes de trocar de empregador ou função',
          'A autorização é vinculada à vaga e ao empregador específicos para os quais foi concedida.',
        ],
        es: [
          'Solicitar un nuevo permiso antes de cambiar de empleador o de puesto',
          'El permiso está ligado al empleo y al empleador concretos para los que se concedió.',
        ],
      },
      {
        en: [
          'Start Danish lessons early',
          'Permanent residence requires a Danish level that takes years to reach, and municipal courses are subsidised for new residents.',
        ],
        pt: [
          'Começar cedo as aulas de dinamarquês',
          'A residência permanente exige um nível de dinamarquês que leva anos para atingir, e os cursos municipais são subsidiados para novos residentes.',
        ],
        es: [
          'Empezar pronto las clases de danés',
          'La residencia permanente exige un nivel de danés que lleva años alcanzar, y los cursos municipales están subvencionados para nuevos residentes.',
        ],
      },
    ],
  },

  'Student Residence Permit': {
    core_documents: [
      {
        en: ['Valid passport', 'Covering the period of study applied for.'],
        pt: ['Passaporte válido', 'Cobrindo o período de estudo pedido.'],
        es: [
          'Pasaporte vigente',
          'Que cubra el periodo de estudio solicitado.',
        ],
      },
      {
        en: [
          'Letter of admission to an approved programme',
          'From an institution and programme approved by the state; a course at an unapproved provider does not support a permit.',
        ],
        pt: [
          'Carta de admissão em programa aprovado',
          'De instituição e programa aprovados pelo Estado; curso em instituição não aprovada não sustenta autorização.',
        ],
        es: [
          'Carta de admisión a un programa aprobado',
          'De una institución y un programa aprobados por el Estado; un curso en una institución no aprobada no sustenta un permiso.',
        ],
      },
      {
        en: [
          'Online application with the case order ID',
          'Filed through the immigration portal.',
        ],
        pt: [
          'Pedido online com o case order ID',
          'Protocolado pelo portal de imigração.',
        ],
        es: [
          'Solicitud en línea con el case order ID',
          'Se presenta por el portal de inmigración.',
        ],
      },
      {
        en: [
          'Receipt for the tuition paid',
          'The first instalment is normally paid before the permit is granted.',
        ],
        pt: [
          'Comprovante do pagamento da mensalidade',
          'A primeira parcela costuma ser paga antes de a autorização ser concedida.',
        ],
        es: [
          'Comprobante del pago de la matrícula',
          'El primer plazo suele pagarse antes de conceder el permiso.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Previous diplomas and transcripts',
          'The studies that qualified you for admission.',
        ],
        pt: [
          'Diplomas e históricos anteriores',
          'Os estudos que qualificaram você para a admissão.',
        ],
        es: [
          'Títulos y expedientes anteriores',
          'Los estudios que le cualificaron para la admisión.',
        ],
      },
      {
        en: [
          'Proof of English or Danish for the programme',
          'The level is set by the institution; most master programmes are taught in English.',
        ],
        pt: [
          'Comprovação de inglês ou dinamarquês para o programa',
          'O nível é definido pela instituição; a maioria dos mestrados é lecionada em inglês.',
        ],
        es: [
          'Prueba de inglés o danés para el programa',
          'El nivel lo fija la institución; la mayoría de los másteres se imparte en inglés.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of funds for the study period',
          'A monthly amount for each month, evidenced by a bank statement or a scholarship letter.',
        ],
        pt: [
          'Comprovação de recursos para o período de estudo',
          'Um valor mensal por cada mês, comprovado por extrato bancário ou carta de bolsa.',
        ],
        es: [
          'Prueba de fondos para el periodo de estudio',
          'Un importe mensual por cada mes, acreditado con extracto bancario o carta de beca.',
        ],
      },
      {
        en: [
          'Pay the case processing fee',
          'Charged when the case order ID is created.',
        ],
        pt: [
          'Pagar a taxa de processamento',
          'Cobrada na criação do case order ID.',
        ],
        es: [
          'Pagar la tasa de tramitación',
          'Se cobra al crear el case order ID.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Create the case order ID and pay before filing',
          'The same mechanism as every other residence category.',
        ],
        pt: [
          'Criar o case order ID e pagar antes de protocolar',
          'O mesmo mecanismo de todas as outras categorias de residência.',
        ],
        es: [
          'Crear el case order ID y pagar antes de presentar',
          'El mismo mecanismo que en las demás categorías de residencia.',
        ],
      },
      {
        en: [
          'Record biometrics within fourteen days of applying',
          'At a Danish mission or an application centre.',
        ],
        pt: [
          'Registar a biometria em até catorze dias do pedido',
          'Numa representação dinamarquesa ou centro de pedidos.',
        ],
        es: [
          'Registrar la biometría en catorce días desde la solicitud',
          'En una representación danesa o centro de solicitudes.',
        ],
      },
      {
        en: [
          'Apply well before the programme starts',
          'Student cases are seasonal and the queues peak before the academic year.',
        ],
        pt: [
          'Pedir bem antes do início do programa',
          'Os processos de estudante são sazonais e as filas atingem o pico antes do ano letivo.',
        ],
        es: [
          'Solicitar bastante antes del inicio del programa',
          'Los casos de estudiante son estacionales y las colas se disparan antes del año académico.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection for the residence card',
          'Within the deadline after applying.',
        ],
        pt: [
          'Recolha de dados biométricos para o cartão de residência',
          'Dentro do prazo após o pedido.',
        ],
        es: [
          'Recogida de datos biométricos para la tarjeta de residencia',
          'Dentro del plazo tras solicitar.',
        ],
      },
      {
        en: [
          'Health cover through the CPR registration',
          'Students registered with a CPR number get access to the public system; private cover fills the gap before that.',
        ],
        pt: [
          'Cobertura de saúde pelo registo do CPR',
          'Estudantes com CPR passam a ter acesso ao sistema público; a cobertura privada preenche o intervalo até lá.',
        ],
        es: [
          'Cobertura sanitaria por el registro del CPR',
          'Los estudiantes con CPR acceden al sistema público; la cobertura privada cubre el intervalo hasta entonces.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Register your address and get a CPR number',
          'The same step as for workers, and equally decisive for daily life.',
        ],
        pt: [
          'Registar a morada e obter o número CPR',
          'O mesmo passo dos trabalhadores, e igualmente decisivo para a vida cotidiana.',
        ],
        es: [
          'Registrar su domicilio y obtener el número CPR',
          'El mismo paso que para los trabajadores, e igual de decisivo para la vida diaria.',
        ],
      },
      {
        en: [
          'Activate MitID',
          'Needed for the university systems, the bank and every public service.',
        ],
        pt: [
          'Ativar o MitID',
          'Necessário para os sistemas da universidade, o banco e todo serviço público.',
        ],
        es: [
          'Activar MitID',
          'Necesario para los sistemas de la universidad, el banco y todo servicio público.',
        ],
      },
      {
        en: [
          'Respect the limit on working hours',
          'Part-time work is capped during term, with more allowed in the summer months.',
        ],
        pt: [
          'Respeitar o limite de horas de trabalho',
          'O trabalho parcial tem teto durante o semestre, com mais horas permitidas nos meses de verão.',
        ],
        es: [
          'Respetar el límite de horas de trabajo',
          'El trabajo parcial tiene tope durante el semestre, con más horas permitidas en los meses de verano.',
        ],
      },
      {
        en: [
          'Show academic progress at each renewal',
          'The institution reports it, and falling behind puts the permit at risk.',
        ],
        pt: [
          'Comprovar progresso acadêmico a cada renovação',
          'A instituição reporta isso, e ficar para trás põe a autorização em risco.',
        ],
        es: [
          'Acreditar progreso académico en cada renovación',
          'La institución lo informa, y quedarse atrás pone en riesgo el permiso.',
        ],
      },
      {
        en: [
          'Apply for the job-search permit before graduating',
          'It allows staying on to look for work after the programme, and it must be applied for while the student permit is still valid.',
        ],
        pt: [
          'Pedir a autorização de busca de emprego antes de se formar',
          'Ela permite ficar procurando trabalho após o programa, e precisa ser pedida enquanto a autorização de estudante ainda é válida.',
        ],
        es: [
          'Solicitar el permiso de búsqueda de empleo antes de graduarse',
          'Permite quedarse a buscar trabajo tras el programa, y debe solicitarse mientras el permiso de estudiante siga vigente.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },

  'Permanent Residence Permit': {
    core_documents: [
      {
        en: [
          'Valid passport and current residence card',
          'Applied for from inside Denmark, holding a valid permit.',
        ],
        pt: [
          'Passaporte válido e cartão de residência atual',
          'Pedida de dentro da Dinamarca, com uma autorização válida.',
        ],
        es: [
          'Pasaporte vigente y tarjeta de residencia actual',
          'Se solicita desde dentro de Dinamarca, con un permiso vigente.',
        ],
      },
      {
        en: [
          'Evidence of the qualifying period of residence',
          'Several years of continuous lawful residence. Time on a student permit generally does not count towards it.',
        ],
        pt: [
          'Comprovação do período qualificado de residência',
          'Vários anos de residência legal contínua. O tempo com autorização de estudante em geral não conta para ele.',
        ],
        es: [
          'Prueba del periodo cualificado de residencia',
          'Varios años de residencia legal continua. El tiempo con permiso de estudiante por lo general no cuenta.',
        ],
      },
      {
        en: [
          'Clean criminal record',
          'A conviction can extend the qualifying period substantially or bar the application outright.',
        ],
        pt: [
          'Ficha criminal limpa',
          'Uma condenação pode estender bastante o período qualificado ou barrar o pedido de vez.',
        ],
        es: [
          'Antecedentes penales limpios',
          'Una condena puede extender bastante el periodo cualificado o impedir la solicitud del todo.',
        ],
      },
      {
        en: [
          'Signed declaration of integration and active citizenship',
          'A formal statement that forms part of the application.',
        ],
        pt: [
          'Declaração assinada de integração e cidadania ativa',
          'Uma declaração formal que faz parte do pedido.',
        ],
        es: [
          'Declaración firmada de integración y ciudadanía activa',
          'Una declaración formal que forma parte de la solicitud.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Danish language certificate at the required level',
          'The level is high and the exam takes preparation. It is the requirement that most often sets the timing of the whole application.',
        ],
        pt: [
          'Certificado de dinamarquês no nível exigido',
          'O nível é alto e o exame exige preparação. É o requisito que mais define o momento de todo o pedido.',
        ],
        es: [
          'Certificado de danés en el nivel exigido',
          'El nivel es alto y el examen requiere preparación. Es el requisito que más determina el momento de toda la solicitud.',
        ],
      },
      {
        en: [
          'Passed the active citizen examination',
          'Or evidence of qualifying civic participation, which can substitute for it.',
        ],
        pt: [
          'Aprovação no exame de cidadão ativo',
          'Ou comprovação de participação cívica qualificante, que pode substituí-lo.',
        ],
        es: [
          'Aprobar el examen de ciudadano activo',
          'O prueba de participación cívica cualificante, que puede sustituirlo.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Continuous full-time employment record',
          'Several years of full-time work in the recent period, documented month by month. Gaps count against you.',
        ],
        pt: [
          'Histórico contínuo de emprego em tempo integral',
          'Vários anos de trabalho em tempo integral no período recente, documentados mês a mês. Lacunas pesam contra.',
        ],
        es: [
          'Historial continuo de empleo a tiempo completo',
          'Varios años de trabajo a tiempo completo en el periodo reciente, documentados mes a mes. Los vacíos pesan en contra.',
        ],
      },
      {
        en: [
          'No public benefits received in the qualifying period',
          'Having drawn certain social assistance bars the application, and this is checked against public records.',
        ],
        pt: [
          'Não ter recebido benefícios públicos no período qualificado',
          'Ter recebido certas assistências sociais barra o pedido, e isso é conferido em registos públicos.',
        ],
        es: [
          'No haber recibido prestaciones públicas en el periodo cualificado',
          'Haber cobrado ciertas ayudas sociales impide la solicitud, y se comprueba contra registros públicos.',
        ],
      },
      {
        en: [
          'No overdue public debt',
          'Outstanding debt to the state blocks the application.',
        ],
        pt: [
          'Sem dívida pública em atraso',
          'Dívida pendente com o Estado bloqueia o pedido.',
        ],
        es: [
          'Sin deuda pública vencida',
          'Una deuda pendiente con el Estado bloquea la solicitud.',
        ],
      },
      {
        en: [
          'Pay the case processing fee',
          'Charged when the case order ID is created.',
        ],
        pt: [
          'Pagar a taxa de processamento',
          'Cobrada na criação do case order ID.',
        ],
        es: [
          'Pagar la tasa de tramitación',
          'Se cobra al crear el case order ID.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply before the current permit expires',
          'A gap breaks the continuous residence the application rests on.',
        ],
        pt: [
          'Pedir antes de a autorização atual vencer',
          'Uma lacuna quebra a residência contínua sobre a qual o pedido se apoia.',
        ],
        es: [
          'Solicitar antes de que caduque el permiso actual',
          'Un vacío rompe la residencia continua en que se apoya la solicitud.',
        ],
      },
      {
        en: [
          'Gather the employment documentation in advance',
          'Payslips and contracts covering the whole period take time to assemble and are examined closely.',
        ],
        pt: [
          'Reunir a documentação de emprego com antecedência',
          'Holerites e contratos cobrindo todo o período levam tempo para juntar e são examinados de perto.',
        ],
        es: [
          'Reunir la documentación laboral con antelación',
          'Nóminas y contratos que cubran todo el periodo llevan tiempo y se examinan con detalle.',
        ],
      },
      {
        en: [
          'Record biometrics within the deadline',
          'The same fourteen-day rule as the other categories.',
        ],
        pt: [
          'Registar a biometria dentro do prazo',
          'A mesma regra de catorze dias das outras categorias.',
        ],
        es: [
          'Registrar la biometría dentro del plazo',
          'La misma regla de catorce días que en las demás categorías.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection for the new card',
          'Taken when the permanent permit is granted.',
        ],
        pt: [
          'Recolha de dados biométricos para o novo cartão',
          'Feita quando a autorização permanente é concedida.',
        ],
        es: [
          'Recogida de datos biométricos para la nueva tarjeta',
          'Se realiza cuando se concede el permiso permanente.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the permanent residence card',
          'The permit no longer needs renewing, though the card is reissued periodically.',
        ],
        pt: [
          'Retirar o cartão de residência permanente',
          'A autorização deixa de precisar de renovação, embora o cartão seja reemitido periodicamente.',
        ],
        es: [
          'Recoger la tarjeta de residencia permanente',
          'El permiso ya no necesita renovarse, aunque la tarjeta se reexpide periódicamente.',
        ],
      },
      {
        en: [
          'Note that long absences can end it',
          'Spending an extended continuous period outside Denmark causes the permanent permit to lapse.',
        ],
        pt: [
          'Saber que ausências longas podem extingui-la',
          'Passar um período contínuo prolongado fora da Dinamarca faz a autorização permanente caducar.',
        ],
        es: [
          'Saber que las ausencias largas pueden extinguirlo',
          'Pasar un periodo continuo prolongado fuera de Dinamarca hace caducar el permiso permanente.',
        ],
      },
      {
        en: [
          'Consider citizenship, but check the conditions carefully',
          'Danish naturalisation adds a higher language level, a separate citizenship test and a self-sufficiency requirement on top of what permanent residence asked for.',
        ],
        pt: [
          'Avaliar a cidadania, mas conferir bem as condições',
          'A naturalização dinamarquesa acrescenta nível de idioma mais alto, um teste de cidadania à parte e uma exigência de autossuficiência, além do que a residência permanente já pediu.',
        ],
        es: [
          'Evaluar la ciudadanía, pero revisar bien las condiciones',
          'La naturalización danesa añade un nivel de idioma más alto, un examen de ciudadanía aparte y un requisito de autosuficiencia, además de lo que ya pidió la residencia permanente.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
