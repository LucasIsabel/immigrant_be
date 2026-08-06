import type { CountryVisaSteps } from './types';

/**
 * Steps for Israel.
 *
 * Israel runs two immigration systems that barely touch each other. One is
 * ordinary: an employer files for a B/1 work permit at the Population and
 * Immigration Authority inside Israel, and only after that approval does a
 * consulate abroad issue anything. Nothing useful can be started at a consulate
 * first. The other is the Law of Return, which is not immigration at all in the
 * usual sense — someone with a Jewish parent or grandparent, or married to such
 * a person, receives citizenship on landing, and the whole file is about proving
 * ancestry rather than qualifications or income.
 *
 * Everything that follows arrival runs through the teudat zehut, the identity
 * number issued by the interior ministry. Without it there is no health fund, no
 * bank account and no employment record.
 */
export const israel: CountryVisaSteps = {
  'Tourist Visa (B/2)': {
    core_documents: [
      {
        en: [
          'Passport valid for at least six months',
          'Counted from the date of entry. Israeli border control applies this strictly and airlines check it before boarding.',
        ],
        pt: [
          'Passaporte válido por pelo menos seis meses',
          'Contados a partir da data de entrada. O controlo de fronteiras israelita aplica isso com rigor e as companhias aéreas conferem antes do embarque.',
        ],
        es: [
          'Pasaporte con al menos seis meses de vigencia',
          'Contados desde la fecha de entrada. El control fronterizo israelí lo aplica con rigor y las aerolíneas lo comprueban antes de embarcar.',
        ],
      },
      {
        en: [
          'Check whether your nationality is exempt from the B/2',
          'Most European and American passports receive the B/2 on arrival without applying in advance. Others must obtain it at a consulate, and the two processes share almost nothing.',
        ],
        pt: [
          'Verificar se a sua nacionalidade é isenta do B/2',
          'A maioria dos passaportes europeus e americanos recebe o B/2 na chegada sem pedido prévio. Os demais precisam obtê-lo num consulado, e os dois processos quase não se parecem.',
        ],
        es: [
          'Comprobar si su nacionalidad está exenta del B/2',
          'La mayoría de los pasaportes europeos y americanos reciben el B/2 a la llegada sin solicitud previa. Los demás deben obtenerlo en un consulado, y ambos procesos apenas se parecen.',
        ],
      },
      {
        en: [
          'Electronic travel authorisation before flying',
          'Visa-exempt travellers now register online in advance and receive an authorisation linked to the passport. It is not a visa, but without it you are not boarded.',
        ],
        pt: [
          'Autorização eletrónica de viagem antes de voar',
          'Viajantes isentos de visto agora registam-se online com antecedência e recebem uma autorização ligada ao passaporte. Não é um visto, mas sem ela não há embarque.',
        ],
        es: [
          'Autorización electrónica de viaje antes de volar',
          'Los viajeros exentos de visado ahora se registran en línea con antelación y reciben una autorización vinculada al pasaporte. No es un visado, pero sin ella no le embarcan.',
        ],
      },
      {
        en: [
          'Return or onward ticket',
          'Asked for at check-in and again at the border. A one-way ticket without a clear explanation is a strong trigger for secondary questioning.',
        ],
        pt: [
          'Passagem de volta ou de continuação',
          'Pedida no check-in e novamente na fronteira. Um bilhete só de ida sem explicação clara é um forte gatilho para entrevista secundária.',
        ],
        es: [
          'Billete de vuelta o de continuación',
          'Se pide en el check-in y de nuevo en la frontera. Un billete de solo ida sin explicación clara es un fuerte detonante de interrogatorio secundario.',
        ],
      },
      {
        en: [
          'Accommodation details or an invitation from your host',
          'If you are staying with someone, have their full name, address and phone number written down. Border officers call hosts to verify.',
        ],
        pt: [
          'Dados de alojamento ou convite do anfitrião',
          'Se você vai ficar na casa de alguém, tenha nome completo, endereço e telefone anotados. Os oficiais de fronteira ligam para os anfitriões para verificar.',
        ],
        es: [
          'Datos del alojamiento o invitación del anfitrión',
          'Si se aloja en casa de alguien, lleve anotados su nombre completo, dirección y teléfono. Los oficiales de frontera llaman a los anfitriones para verificar.',
        ],
      },
      {
        en: [
          'Consular application for non-exempt nationalities',
          'Filed at an Israeli mission with the form, photographs and supporting documents, well before the trip. Processing is not quick and there is no expedited route.',
        ],
        pt: [
          'Pedido consular para nacionalidades não isentas',
          'Feito numa missão israelita com formulário, fotografias e documentos de apoio, bem antes da viagem. A análise não é rápida e não há via acelerada.',
        ],
        es: [
          'Solicitud consular para nacionalidades no exentas',
          'Se presenta en una misión israelí con el formulario, fotografías y documentos de apoyo, bastante antes del viaje. La tramitación no es rápida y no hay vía acelerada.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Funds covering the visit',
          'Israel is expensive and officers do ask how you intend to pay for the stay. A card and a statement are enough; vagueness is not.',
        ],
        pt: [
          'Recursos que cubram a visita',
          'Israel é caro e os oficiais realmente perguntam como você pretende pagar pela estada. Um cartão e um extrato bastam; vaguidão não.',
        ],
        es: [
          'Fondos que cubran la visita',
          'Israel es caro y los oficiales sí preguntan cómo piensa pagar la estancia. Una tarjeta y un extracto bastan; la vaguedad no.',
        ],
      },
      {
        en: [
          'Evidence of ties to your country of residence',
          'A job, studies or family at home is what the border interview is really testing. Young solo travellers without visible ties are questioned longest.',
        ],
        pt: [
          'Provas de vínculo com o seu país de residência',
          'Emprego, estudos ou família em casa é o que a entrevista de fronteira realmente testa. Viajantes jovens sozinhos e sem vínculos visíveis são os mais interrogados.',
        ],
        es: [
          'Pruebas de arraigo en su país de residencia',
          'Un trabajo, estudios o familia en casa es lo que la entrevista de frontera realmente evalúa. Los viajeros jóvenes solos y sin arraigo visible son los más interrogados.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Book the consular appointment early where one is needed',
          'Appointment slots at Israeli missions are limited and often booked weeks ahead, which is usually the longest part of the timeline.',
        ],
        pt: [
          'Marcar cedo o atendimento consular onde ele for necessário',
          'As vagas de atendimento nas missões israelitas são limitadas e costumam estar preenchidas com semanas de antecedência, o que geralmente é a etapa mais longa.',
        ],
        es: [
          'Reservar pronto la cita consular donde sea necesaria',
          'Las citas en las misiones israelíes son limitadas y suelen estar reservadas con semanas de antelación, lo que suele ser la etapa más larga.',
        ],
      },
      {
        en: [
          'Pay the visitor visa fee',
          'Applies only to nationalities that need a visa in advance, is charged per applicant and is not refunded on refusal. Check the current rate at the mission.',
        ],
        pt: [
          'Pagar a taxa do visto de visitante',
          'Aplica-se apenas às nacionalidades que precisam de visto prévio, é cobrada por requerente e não é devolvida em caso de recusa. Confira o valor vigente na missão.',
        ],
        es: [
          'Pagar la tasa del visado de visitante',
          'Solo se aplica a las nacionalidades que necesitan visado previo, se cobra por solicitante y no se devuelve si se deniega. Compruebe la tarifa vigente en la misión.',
        ],
      },
      {
        en: [
          'Allow for variable processing between missions',
          'The same nationality can face very different waiting times depending on which consulate handles the file.',
        ],
        pt: [
          'Prever prazos de análise variáveis entre as missões',
          'A mesma nacionalidade pode enfrentar tempos de espera bem diferentes conforme o consulado que trata do processo.',
        ],
        es: [
          'Prever plazos de tramitación variables entre misiones',
          'La misma nacionalidad puede afrontar tiempos de espera muy distintos según el consulado que tramite el expediente.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Photographs to the consular specification',
          'Required for the visa application; visa-exempt travellers do not need them, since nothing is issued in advance.',
        ],
        pt: [
          'Fotografias conforme a especificação consular',
          'Exigidas no pedido de visto; viajantes isentos não precisam delas, já que nada é emitido antecipadamente.',
        ],
        es: [
          'Fotografías según la especificación consular',
          'Se exigen en la solicitud de visado; los viajeros exentos no las necesitan, ya que no se emite nada por adelantado.',
        ],
      },
      {
        en: [
          'Travel medical insurance',
          'Not a condition of entry, but visitors are outside the national health system entirely and pay full private rates for any treatment.',
        ],
        pt: [
          'Seguro médico de viagem',
          'Não é condição de entrada, mas os visitantes ficam totalmente fora do sistema nacional de saúde e pagam tarifas privadas cheias por qualquer atendimento.',
        ],
        es: [
          'Seguro médico de viaje',
          'No es condición de entrada, pero los visitantes quedan totalmente fuera del sistema nacional de salud y pagan tarifas privadas completas por cualquier tratamiento.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Keep the entry slip you receive instead of a stamp',
          'Israel issues a small card at the border rather than stamping the passport. It is your proof of legal status, and losing it creates problems on departure.',
        ],
        pt: [
          'Guardar o comprovante de entrada que você recebe em vez do carimbo',
          'Israel emite um pequeno cartão na fronteira em vez de carimbar o passaporte. É a sua prova de status legal, e perdê-lo cria problemas na saída.',
        ],
        es: [
          'Conservar el comprobante de entrada que recibe en lugar del sello',
          'Israel emite una pequeña tarjeta en la frontera en lugar de sellar el pasaporte. Es su prueba de estatus legal, y perderla crea problemas al salir.',
        ],
      },
      {
        en: [
          'Note the number of days the officer granted',
          'The B/2 is commonly given for up to three months, but a shorter period is written on the card at the officer’s discretion and that is the number that binds you.',
        ],
        pt: [
          'Reparar em quantos dias o oficial concedeu',
          'O B/2 costuma ser dado por até três meses, mas um período menor pode ser escrito no cartão a critério do oficial, e é esse número que vincula você.',
        ],
        es: [
          'Fijarse en cuántos días concedió el oficial',
          'El B/2 suele darse por hasta tres meses, pero puede escribirse un periodo menor en la tarjeta a criterio del oficial, y ese es el número que le obliga.',
        ],
      },
      {
        en: [
          'Do not work, and remember volunteering counts as work',
          'Even unpaid work on a kibbutz or with an organisation requires a separate B/4 volunteer visa arranged before arrival.',
        ],
        pt: [
          'Não trabalhar, lembrando que voluntariado conta como trabalho',
          'Mesmo trabalho não remunerado num kibutz ou numa organização exige um visto de voluntário B/4 à parte, providenciado antes da chegada.',
        ],
        es: [
          'No trabajar, y recordar que el voluntariado cuenta como trabajo',
          'Incluso el trabajo no remunerado en un kibutz o con una organización exige un visado de voluntario B/4 aparte, gestionado antes de llegar.',
        ],
      },
      {
        en: [
          'Extend at a Population and Immigration Authority branch',
          'Extensions are requested inside Israel before the current permission expires, with a fee, and are granted case by case rather than automatically.',
        ],
        pt: [
          'Estender numa unidade da Autoridade de População e Imigração',
          'As extensões são pedidas dentro de Israel antes de a permissão atual expirar, com taxa, e são concedidas caso a caso, não automaticamente.',
        ],
        es: [
          'Ampliar en una oficina de la Autoridad de Población e Inmigración',
          'Las prórrogas se piden dentro de Israel antes de que caduque el permiso actual, con tasa, y se conceden caso por caso, no automáticamente.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Expect security questioning on entry and on exit',
          'Departure screening at the airport starts hours before the flight and is more thorough than in most countries. Arrive far earlier than you would elsewhere.',
        ],
        pt: [
          'Contar com entrevista de segurança na entrada e na saída',
          'A triagem de saída no aeroporto começa horas antes do voo e é mais minuciosa que na maioria dos países. Chegue bem mais cedo do que faria em outro lugar.',
        ],
        es: [
          'Contar con entrevistas de seguridad al entrar y al salir',
          'El control de salida en el aeropuerto empieza horas antes del vuelo y es más minucioso que en la mayoría de los países. Llegue mucho antes de lo habitual.',
        ],
      },
      {
        en: [
          'Overstaying blocks future entry',
          'Remaining past the date on the card is recorded and is one of the most common reasons for being refused entry on a later trip.',
        ],
        pt: [
          'Ficar além do prazo bloqueia entradas futuras',
          'Permanecer além da data do cartão fica registado e é um dos motivos mais comuns de recusa de entrada numa viagem posterior.',
        ],
        es: [
          'Exceder el plazo bloquea futuras entradas',
          'Permanecer más allá de la fecha de la tarjeta queda registrado y es uno de los motivos más comunes de denegación de entrada en un viaje posterior.',
        ],
      },
    ],
  },

  'Work Visa (B/1)': {
    core_documents: [
      {
        en: [
          'Israeli employer files the permit before anything else',
          'The employer applies to the Population and Immigration Authority for permission to employ you. Until that permit exists there is nothing a consulate can do with your file.',
        ],
        pt: [
          'O empregador israelita protocola a autorização antes de tudo',
          'O empregador pede à Autoridade de População e Imigração permissão para contratar você. Enquanto essa autorização não existir, não há nada que um consulado possa fazer com o seu processo.',
        ],
        es: [
          'El empleador israelí presenta el permiso antes que nada',
          'El empleador solicita a la Autoridad de Población e Inmigración permiso para contratarle. Hasta que ese permiso exista, no hay nada que un consulado pueda hacer con su expediente.',
        ],
      },
      {
        en: [
          'Valid passport for the permit period',
          'The B/1 is issued in yearly terms, so a passport close to expiry shortens the visa granted.',
        ],
        pt: [
          'Passaporte válido para o período da autorização',
          'O B/1 é emitido em períodos anuais, então um passaporte perto de vencer encurta o visto concedido.',
        ],
        es: [
          'Pasaporte vigente para el periodo del permiso',
          'El B/1 se emite en periodos anuales, así que un pasaporte próximo a caducar acorta el visado concedido.',
        ],
      },
      {
        en: [
          'Identify whether you fall under the expert track or a sectoral quota',
          'The expert route is for specialists an Israeli employer cannot find locally. Construction, caregiving and agriculture run on bilateral quotas with entirely different rules and protections.',
        ],
        pt: [
          'Identificar se você entra na via de especialista ou numa cota setorial',
          'A via de especialista é para profissionais que o empregador israelita não encontra localmente. Construção, cuidados e agricultura funcionam por cotas bilaterais com regras e proteções completamente diferentes.',
        ],
        es: [
          'Identificar si entra por la vía de experto o por un cupo sectorial',
          'La vía de experto es para especialistas que el empleador israelí no encuentra localmente. Construcción, cuidados y agricultura funcionan con cupos bilaterales de reglas y protecciones totalmente distintas.',
        ],
      },
      {
        en: [
          'Employment contract in a language you understand',
          'Israeli law requires foreign workers to receive a written contract in a language they read, stating pay, hours, deductions and housing arrangements.',
        ],
        pt: [
          'Contrato de trabalho num idioma que você compreenda',
          'A lei israelita exige que trabalhadores estrangeiros recebam contrato escrito num idioma que leiam, indicando pagamento, jornada, descontos e condições de alojamento.',
        ],
        es: [
          'Contrato de trabajo en un idioma que usted entienda',
          'La ley israelí exige que los trabajadores extranjeros reciban un contrato escrito en un idioma que lean, con el pago, la jornada, las deducciones y el alojamiento.',
        ],
      },
      {
        en: [
          'Police clearance certificate, apostilled',
          'From your country of citizenship and from anywhere you have lived recently. It must be recent when the file is examined, not when you requested it.',
        ],
        pt: [
          'Certidão de antecedentes criminais, apostilada',
          'Do seu país de cidadania e de onde tiver morado recentemente. Precisa estar recente quando o processo for analisado, não quando você a pediu.',
        ],
        es: [
          'Certificado de antecedentes penales, apostillado',
          'De su país de ciudadanía y de donde haya vivido recientemente. Debe estar reciente cuando se examine el expediente, no cuando lo solicitó.',
        ],
      },
      {
        en: [
          'Apostille and certified translation on every foreign document',
          'Israel is strict about this chain, and documents translated by an uncertified translator are returned. Budget weeks for it.',
        ],
        pt: [
          'Apostila e tradução juramentada em todo documento estrangeiro',
          'Israel é rigoroso com essa cadeia, e documentos traduzidos por tradutor não juramentado são devolvidos. Reserve semanas para isso.',
        ],
        es: [
          'Apostilla y traducción jurada en cada documento extranjero',
          'Israel es estricto con esa cadena, y los documentos traducidos por un traductor no jurado se devuelven. Reserve semanas para ello.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Degree certificates and professional credentials',
          'Apostilled, and evaluated where the role is regulated. Medicine, nursing, law and engineering each require Israeli licensing on top of the visa.',
        ],
        pt: [
          'Diplomas e credenciais profissionais',
          'Apostilados e avaliados quando a função for regulamentada. Medicina, enfermagem, direito e engenharia exigem licenciamento israelita além do visto.',
        ],
        es: [
          'Títulos y credenciales profesionales',
          'Apostillados y evaluados cuando el puesto esté regulado. Medicina, enfermería, derecho e ingeniería exigen licencia israelí además del visado.',
        ],
      },
      {
        en: [
          'Evidence that your expertise is genuinely scarce locally',
          'The expert track turns on the employer showing the skill is unavailable in the Israeli labour market. A generic job description is what usually sinks the permit.',
        ],
        pt: [
          'Prova de que a sua especialidade é de fato escassa localmente',
          'A via de especialista depende de o empregador demonstrar que a competência não existe no mercado de trabalho israelita. Uma descrição de vaga genérica é o que costuma afundar a autorização.',
        ],
        es: [
          'Prueba de que su especialidad es realmente escasa localmente',
          'La vía de experto depende de que el empleador demuestre que la competencia no está disponible en el mercado laboral israelí. Una descripción de puesto genérica es lo que suele hundir el permiso.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Salary at or above the expert threshold',
          'The expert track requires paying a multiple of the national average wage, recalculated periodically. An offer below the line cannot be approved however senior the role.',
        ],
        pt: [
          'Salário igual ou acima do patamar de especialista',
          'A via de especialista exige pagar um múltiplo do salário médio nacional, recalculado periodicamente. Uma oferta abaixo da linha não pode ser aprovada, por mais sênior que seja o cargo.',
        ],
        es: [
          'Salario igual o superior al umbral de experto',
          'La vía de experto exige pagar un múltiplo del salario medio nacional, recalculado periódicamente. Una oferta por debajo de la línea no puede aprobarse, por sénior que sea el puesto.',
        ],
      },
      {
        en: [
          'Employer deposit and guarantee for the worker',
          'Employers of foreign workers lodge a financial guarantee and pay levies. A small company unwilling to carry that cost will quietly stall your permit.',
        ],
        pt: [
          'Depósito e garantia do empregador pelo trabalhador',
          'Empregadores de trabalhadores estrangeiros depositam uma garantia financeira e pagam encargos. Uma empresa pequena que não queira arcar com isso vai travar a sua autorização em silêncio.',
        ],
        es: [
          'Depósito y garantía del empleador por el trabajador',
          'Los empleadores de trabajadores extranjeros depositan una garantía financiera y pagan gravámenes. Una empresa pequeña que no quiera asumirlo estancará su permiso en silencio.',
        ],
      },
      {
        en: [
          'Deductions capped by law',
          'What an employer may withhold for housing, insurance and services is limited by regulation. Excessive deductions are the most common abuse in the quota sectors.',
        ],
        pt: [
          'Descontos limitados por lei',
          'O que um empregador pode reter por alojamento, seguro e serviços é limitado por regulamento. Descontos excessivos são o abuso mais comum nos setores de cota.',
        ],
        es: [
          'Deducciones limitadas por ley',
          'Lo que un empleador puede retener por alojamiento, seguro y servicios está limitado por norma. Las deducciones excesivas son el abuso más común en los sectores de cupo.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply at the consulate once the permit number is issued',
          'The consular stage is short and mechanical: you present the approval reference, the passport and the photographs.',
        ],
        pt: [
          'Pedir no consulado assim que o número da autorização for emitido',
          'A etapa consular é curta e mecânica: você apresenta a referência da aprovação, o passaporte e as fotografias.',
        ],
        es: [
          'Solicitar en el consulado una vez emitido el número del permiso',
          'La etapa consular es corta y mecánica: presenta la referencia de la aprobación, el pasaporte y las fotografías.',
        ],
      },
      {
        en: [
          'Pay the work visa fee at the mission',
          'Separate from the permit costs the employer bears. Confirm the amount with the consulate handling your case.',
        ],
        pt: [
          'Pagar a taxa do visto de trabalho na missão',
          'Separada dos custos da autorização que o empregador suporta. Confirme o valor com o consulado que trata do seu caso.',
        ],
        es: [
          'Pagar la tasa del visado de trabajo en la misión',
          'Separada de los costes del permiso que asume el empleador. Confirme el importe con el consulado que tramita su caso.',
        ],
      },
      {
        en: [
          'Enter Israel while the entry visa is still valid',
          'The B/1 issued abroad has a window to travel. Arriving after it lapses means the employer restarts the permit stage.',
        ],
        pt: [
          'Entrar em Israel enquanto o visto de entrada ainda for válido',
          'O B/1 emitido no exterior tem uma janela para viajar. Chegar depois de ela expirar faz o empregador recomeçar a etapa da autorização.',
        ],
        es: [
          'Entrar en Israel mientras el visado de entrada siga vigente',
          'El B/1 emitido en el extranjero tiene una ventana para viajar. Llegar después de que caduque obliga al empleador a reiniciar la etapa del permiso.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical examination before the permit is granted',
          'Screening for tuberculosis, hepatitis and other listed conditions, at an authorised centre. A positive result on the listed conditions ends the application.',
        ],
        pt: [
          'Exame médico antes da concessão da autorização',
          'Rastreio de tuberculose, hepatite e outras condições listadas, em centro autorizado. Um resultado positivo nas condições listadas encerra o pedido.',
        ],
        es: [
          'Examen médico antes de conceder el permiso',
          'Cribado de tuberculosis, hepatitis y otras condiciones listadas, en un centro autorizado. Un resultado positivo en las condiciones listadas termina la solicitud.',
        ],
      },
      {
        en: [
          'Biometric capture during the process',
          'Fingerprints and a facial image are recorded for the permit and again when the identity document is produced in Israel.',
        ],
        pt: [
          'Coleta biométrica durante o processo',
          'Impressões digitais e imagem facial são registadas para a autorização e novamente quando o documento de identidade é produzido em Israel.',
        ],
        es: [
          'Captura biométrica durante el proceso',
          'Se registran huellas dactilares e imagen facial para el permiso y de nuevo cuando se produce el documento de identidad en Israel.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the residence permit inside Israel',
          'The visa gets you in; the permit that lets you stay and work is issued at a Population and Immigration Authority branch after arrival.',
        ],
        pt: [
          'Retirar a autorização de residência dentro de Israel',
          'O visto faz você entrar; a autorização que permite ficar e trabalhar é emitida numa unidade da Autoridade de População e Imigração após a chegada.',
        ],
        es: [
          'Recoger el permiso de residencia dentro de Israel',
          'El visado le hace entrar; el permiso que le deja quedarse y trabajar se emite en una oficina de la Autoridad de Población e Inmigración tras llegar.',
        ],
      },
      {
        en: [
          'Understand the visa is tied to the named employer',
          'Moving to another company requires a new permit filed by the new employer. Leaving the job without one puts you out of status immediately.',
        ],
        pt: [
          'Entender que o visto está ligado ao empregador nomeado',
          'Mudar para outra empresa exige uma nova autorização protocolada pelo novo empregador. Sair do emprego sem ela deixa você fora de status de imediato.',
        ],
        es: [
          'Entender que el visado está ligado al empleador nombrado',
          'Cambiar a otra empresa exige un permiso nuevo presentado por el nuevo empleador. Dejar el trabajo sin él le deja fuera de estatus de inmediato.',
        ],
      },
      {
        en: [
          'Have the employer arrange private medical insurance',
          'Foreign workers are outside the national health insurance system, and the employer is legally required to provide private cover.',
        ],
        pt: [
          'Fazer o empregador contratar seguro médico privado',
          'Trabalhadores estrangeiros ficam fora do sistema nacional de saúde, e o empregador é legalmente obrigado a fornecer cobertura privada.',
        ],
        es: [
          'Hacer que el empleador contrate un seguro médico privado',
          'Los trabajadores extranjeros quedan fuera del sistema nacional de salud, y el empleador está legalmente obligado a proporcionar cobertura privada.',
        ],
      },
      {
        en: [
          'Renew the permit yearly and watch the cumulative cap',
          'Several tracks limit the total number of years a foreign worker may remain, regardless of renewals, and reaching the cap ends the route entirely.',
        ],
        pt: [
          'Renovar a autorização anualmente e observar o limite acumulado',
          'Várias vias limitam o total de anos que um trabalhador estrangeiro pode permanecer, independentemente das renovações, e atingir o teto encerra a rota por completo.',
        ],
        es: [
          'Renovar el permiso cada año y vigilar el tope acumulado',
          'Varias vías limitan el total de años que un trabajador extranjero puede permanecer, sin importar las renovaciones, y alcanzar el tope cierra la vía por completo.',
        ],
      },
      {
        en: [
          'Bring family on a dependent status without work rights',
          'A spouse accompanying a B/1 holder generally receives a status that does not include permission to work, which needs to be planned for financially.',
        ],
        pt: [
          'Trazer a família num status de dependente sem direito a trabalhar',
          'O cônjuge que acompanha um titular de B/1 geralmente recebe um status que não inclui permissão para trabalhar, o que precisa ser planeado financeiramente.',
        ],
        es: [
          'Traer a la familia con un estatus de dependiente sin derecho a trabajar',
          'El cónyuge que acompaña a un titular de B/1 suele recibir un estatus que no incluye permiso para trabajar, lo que hay que planificar económicamente.',
        ],
      },
      {
        en: [
          'Know that years on a B/1 do not build towards citizenship',
          'This is a temporary labour status by design. Time accrued on it is not a path to permanent residence the way it is in many other countries.',
        ],
        pt: [
          'Saber que anos com B/1 não constroem caminho para a cidadania',
          'Este é um status laboral temporário por concepção. O tempo acumulado nele não é caminho para residência permanente como é em muitos outros países.',
        ],
        es: [
          'Saber que los años con B/1 no construyen camino a la ciudadanía',
          'Este es un estatus laboral temporal por diseño. El tiempo acumulado en él no es una vía a la residencia permanente como sí lo es en muchos otros países.',
        ],
        priority: 2,
      },
    ],
  },

  'Aliyah (Law of Return)': {
    core_documents: [
      {
        en: [
          'Establish your eligibility under the Law of Return',
          'A Jewish parent or grandparent, a convert recognised by the state, or the spouse of any of these. This is a different legal universe from the work and visitor categories.',
        ],
        pt: [
          'Estabelecer a sua elegibilidade pela Lei do Retorno',
          'Um pai ou avô judeu, um convertido reconhecido pelo Estado, ou o cônjuge de qualquer um destes. É um universo jurídico distinto do das categorias de trabalho e de visitante.',
        ],
        es: [
          'Establecer su elegibilidad por la Ley del Retorno',
          'Un padre o abuelo judío, un converso reconocido por el Estado, o el cónyuge de cualquiera de ellos. Es un universo jurídico distinto al de las categorías de trabajo y visitante.',
        ],
      },
      {
        en: [
          'Original documents tracing the Jewish line',
          'Birth, marriage and burial records, ketubot, community registers or immigration papers linking each generation. Assembling this is by far the longest part of the process.',
        ],
        pt: [
          'Documentos originais que tracem a linhagem judaica',
          'Registos de nascimento, casamento e sepultamento, ketubot, registos comunitários ou papéis de imigração ligando cada geração. Reunir isso é de longe a parte mais longa do processo.',
        ],
        es: [
          'Documentos originales que tracen la línea judía',
          'Registros de nacimiento, matrimonio y sepultura, ketubot, registros comunitarios o papeles de inmigración que enlacen cada generación. Reunir esto es con diferencia lo más largo del proceso.',
        ],
      },
      {
        en: [
          'Letter from a recognised rabbi or community',
          'Confirming your Jewish status or your active participation in the community. Which rabbis are recognised depends on the country and the stream.',
        ],
        pt: [
          'Carta de um rabino ou comunidade reconhecidos',
          'Confirmando o seu status judaico ou a sua participação ativa na comunidade. Quais rabinos são reconhecidos depende do país e da corrente.',
        ],
        es: [
          'Carta de un rabino o comunidad reconocidos',
          'Que confirme su estatus judío o su participación activa en la comunidad. Qué rabinos son reconocidos depende del país y de la corriente.',
        ],
      },
      {
        en: [
          'Apostilled civil records for you and each generation claimed',
          'Every certificate needs an apostille and a certified translation. A missing apostille on a great-grandparent’s record can hold a file for months.',
        ],
        pt: [
          'Registos civis apostilados seus e de cada geração invocada',
          'Cada certidão precisa de apostila e tradução juramentada. Uma apostila em falta no registo de um bisavô pode segurar o processo por meses.',
        ],
        es: [
          'Registros civiles apostillados suyos y de cada generación invocada',
          'Cada certificado necesita apostilla y traducción jurada. Una apostilla que falte en el registro de un bisabuelo puede retener el expediente durante meses.',
        ],
      },
      {
        en: [
          'Police certificates from every country you have lived in',
          'Required for any country where you spent a significant period as an adult, not only your country of citizenship.',
        ],
        pt: [
          'Certidões policiais de todos os países onde você morou',
          'Exigidas para qualquer país onde você tenha passado um período significativo como adulto, não apenas o país da sua cidadania.',
        ],
        es: [
          'Certificados policiales de cada país donde ha vivido',
          'Se exigen para cualquier país donde haya pasado un periodo significativo siendo adulto, no solo su país de ciudadanía.',
        ],
      },
      {
        en: [
          'Open the file with the Jewish Agency or the consular emissary',
          'The aliyah emissary reviews the ancestry evidence and forwards the case to the interior ministry. There is no online-only route.',
        ],
        pt: [
          'Abrir o processo na Agência Judaica ou com o emissário consular',
          'O emissário de aliá analisa as provas de ascendência e encaminha o caso ao ministério do interior. Não existe rota exclusivamente online.',
        ],
        es: [
          'Abrir el expediente con la Agencia Judía o el emisario consular',
          'El emisario de aliá revisa las pruebas de ascendencia y remite el caso al ministerio del interior. No existe una vía exclusivamente en línea.',
        ],
      },
      {
        en: [
          'Interview with the emissary',
          'A conversation about your background, your connection to Judaism and your plans. The documents are checked here in the original, not as scans.',
        ],
        pt: [
          'Entrevista com o emissário',
          'Uma conversa sobre a sua origem, a sua ligação ao judaísmo e os seus planos. Os documentos são conferidos aqui no original, não em digitalizações.',
        ],
        es: [
          'Entrevista con el emisario',
          'Una conversación sobre su origen, su vínculo con el judaísmo y sus planes. Los documentos se revisan aquí en original, no en copias escaneadas.',
        ],
      },
      {
        en: [
          'Conversion documents where relevant',
          'Conversions are examined for whether the converting body and the process are recognised by the state, which varies by stream and is where files are most often contested.',
        ],
        pt: [
          'Documentos de conversão quando for o caso',
          'As conversões são examinadas quanto ao reconhecimento pelo Estado do órgão convertedor e do processo, o que varia por corrente e é onde os processos mais são contestados.',
        ],
        es: [
          'Documentos de conversión cuando corresponda',
          'Las conversiones se examinan según el reconocimiento estatal del organismo convertidor y del proceso, lo que varía por corriente y es donde más se impugnan los expedientes.',
        ],
        priority: 2,
        required: false,
      },
    ],
    education: [
      {
        en: [
          'Diplomas for professional recognition in Israel',
          'Bring apostilled originals. Regulated professions require Israeli licensing examinations, often in Hebrew, and the recognition process starts only after arrival.',
        ],
        pt: [
          'Diplomas para reconhecimento profissional em Israel',
          'Leve os originais apostilados. Profissões regulamentadas exigem exames de licenciamento israelitas, muitas vezes em hebraico, e o reconhecimento só começa após a chegada.',
        ],
        es: [
          'Títulos para el reconocimiento profesional en Israel',
          'Lleve los originales apostillados. Las profesiones reguladas exigen exámenes de licencia israelíes, a menudo en hebreo, y el reconocimiento solo empieza tras llegar.',
        ],
      },
      {
        en: [
          'Plan for an intensive Hebrew course after arrival',
          'New immigrants are entitled to subsidised ulpan, and the entitlement has a time window from the date of aliyah. Postponing it can mean losing it.',
        ],
        pt: [
          'Planejar um curso intensivo de hebraico após a chegada',
          'Novos imigrantes têm direito a ulpan subsidiado, e o direito tem uma janela de tempo a contar da data da aliá. Adiar pode significar perdê-lo.',
        ],
        es: [
          'Planificar un curso intensivo de hebreo tras la llegada',
          'Los nuevos inmigrantes tienen derecho a ulpán subvencionado, y el derecho tiene una ventana temporal desde la fecha de la aliá. Aplazarlo puede significar perderlo.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'No income or asset test applies',
          'Eligibility rests on ancestry, not on money. This is the single largest difference from every other route into Israel.',
        ],
        pt: [
          'Não se aplica teste de renda nem de patrimônio',
          'A elegibilidade repousa na ascendência, não em dinheiro. Essa é a maior diferença em relação a todas as outras rotas para Israel.',
        ],
        es: [
          'No se aplica prueba de ingresos ni de patrimonio',
          'La elegibilidad descansa en la ascendencia, no en el dinero. Esa es la mayor diferencia frente a todas las demás vías hacia Israel.',
        ],
        required: false,
      },
      {
        en: [
          'Absorption assistance paid after arrival',
          'New immigrants receive a series of payments and benefits over the first period. Know the schedule before you go so you can budget the gap until work starts.',
        ],
        pt: [
          'Auxílio de absorção pago após a chegada',
          'Novos imigrantes recebem uma série de pagamentos e benefícios ao longo do primeiro período. Conheça o cronograma antes de ir para orçar o intervalo até começar a trabalhar.',
        ],
        es: [
          'Ayuda de absorción pagada tras la llegada',
          'Los nuevos inmigrantes reciben una serie de pagos y prestaciones durante el primer periodo. Conozca el calendario antes de ir para presupuestar el intervalo hasta empezar a trabajar.',
        ],
      },
      {
        en: [
          'Plan around the ten-year foreign income exemption',
          'New immigrants are exempt from Israeli tax on foreign income and assets for a decade, counted from the date of aliyah. Structuring afterwards is far harder than structuring before.',
        ],
        pt: [
          'Planejar em torno da isenção de dez anos sobre renda estrangeira',
          'Novos imigrantes ficam isentos de imposto israelita sobre renda e bens no exterior por uma década, contada da data da aliá. Estruturar depois é muito mais difícil do que estruturar antes.',
        ],
        es: [
          'Planificar en torno a la exención de diez años sobre renta extranjera',
          'Los nuevos inmigrantes están exentos del impuesto israelí sobre renta y bienes en el extranjero durante una década, contada desde la fecha de la aliá. Estructurar después es mucho más difícil que antes.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Submit the file and wait for the eligibility decision',
          'The interior ministry decides whether you fall under the law. Cases resting on a single grandparent or a contested conversion take considerably longer.',
        ],
        pt: [
          'Entregar o processo e aguardar a decisão de elegibilidade',
          'O ministério do interior decide se você se enquadra na lei. Casos apoiados num único avô ou numa conversão contestada demoram consideravelmente mais.',
        ],
        es: [
          'Presentar el expediente y esperar la decisión de elegibilidad',
          'El ministerio del interior decide si usted queda bajo la ley. Los casos que se apoyan en un solo abuelo o en una conversión impugnada tardan bastante más.',
        ],
      },
      {
        en: [
          'No fee is charged for the immigration visa',
          'The aliyah visa is issued free, and the flight is commonly subsidised or organised by the agency handling your case.',
        ],
        pt: [
          'Não há cobrança de taxa pelo visto de imigração',
          'O visto de aliá é emitido gratuitamente, e o voo costuma ser subsidiado ou organizado pela agência que trata do seu caso.',
        ],
        es: [
          'No se cobra tasa por el visado de inmigración',
          'El visado de aliá se emite gratis, y el vuelo suele estar subvencionado u organizado por la agencia que lleva su caso.',
        ],
      },
      {
        en: [
          'Receive the immigrant visa before you fly',
          'Boarding without it means you arrive as a tourist and have to convert status from inside the country, which is slower and less generous.',
        ],
        pt: [
          'Receber o visto de imigrante antes de voar',
          'Embarcar sem ele significa chegar como turista e ter de converter o status de dentro do país, o que é mais lento e menos generoso.',
        ],
        es: [
          'Recibir el visado de inmigrante antes de volar',
          'Embarcar sin él significa llegar como turista y tener que convertir el estatus desde dentro del país, lo que es más lento y menos generoso.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric registration on landing',
          'Fingerprints and a photograph are taken when the identity documents are issued at the airport or shortly afterwards.',
        ],
        pt: [
          'Registo biométrico no desembarque',
          'Impressões digitais e fotografia são recolhidas quando os documentos de identidade são emitidos no aeroporto ou logo depois.',
        ],
        es: [
          'Registro biométrico al aterrizar',
          'Se toman huellas dactilares y fotografía cuando se emiten los documentos de identidad en el aeropuerto o poco después.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Receive citizenship on arrival and the immigrant certificate',
          'Unlike almost every other country, the status is granted on landing rather than after years of residence, along with the certificate that unlocks the benefits.',
        ],
        pt: [
          'Receber a cidadania na chegada e o certificado de imigrante',
          'Ao contrário de quase todos os outros países, o status é concedido no desembarque e não após anos de residência, junto com o certificado que destrava os benefícios.',
        ],
        es: [
          'Recibir la ciudadanía al llegar y el certificado de inmigrante',
          'A diferencia de casi todos los demás países, el estatus se concede al aterrizar y no tras años de residencia, junto con el certificado que desbloquea las prestaciones.',
        ],
      },
      {
        en: [
          'Obtain the teudat zehut identity card',
          'The identity number is the key to everything: bank, health, employment, school. A temporary version is issued at the airport and the permanent card later.',
        ],
        pt: [
          'Obter o cartão de identidade teudat zehut',
          'O número de identidade é a chave para tudo: banco, saúde, emprego, escola. Uma versão temporária é emitida no aeroporto e o cartão permanente depois.',
        ],
        es: [
          'Obtener la tarjeta de identidad teudat zehut',
          'El número de identidad es la llave de todo: banco, salud, empleo, escuela. Se emite una versión temporal en el aeropuerto y la tarjeta permanente después.',
        ],
      },
      {
        en: [
          'Choose a health fund within the opening period',
          'Registration with one of the funds has to be done soon after arrival to activate national health coverage, and switching later is only possible at set intervals.',
        ],
        pt: [
          'Escolher um fundo de saúde dentro do período de adesão',
          'A inscrição num dos fundos precisa ser feita logo após a chegada para ativar a cobertura nacional de saúde, e trocar depois só é possível em intervalos determinados.',
        ],
        es: [
          'Elegir un fondo de salud dentro del periodo de alta',
          'La inscripción en uno de los fondos debe hacerse poco después de llegar para activar la cobertura nacional de salud, y cambiar después solo es posible en intervalos fijados.',
        ],
      },
      {
        en: [
          'Check your military service obligation',
          'New immigrants can still be liable for service or a shortened form of it depending on age and marital status at the time of aliyah. Clarify this before you land, not after.',
        ],
        pt: [
          'Verificar a sua obrigação de serviço militar',
          'Novos imigrantes ainda podem ser sujeitos ao serviço ou a uma forma reduzida dele conforme a idade e o estado civil na data da aliá. Esclareça isso antes de desembarcar, não depois.',
        ],
        es: [
          'Comprobar su obligación de servicio militar',
          'Los nuevos inmigrantes aún pueden estar sujetos al servicio o a una forma reducida según la edad y el estado civil en la fecha de la aliá. Aclárelo antes de aterrizar, no después.',
        ],
      },
      {
        en: [
          'Consider deferring citizenship and staying a resident instead',
          'The law allows an eligible immigrant to decline citizenship and hold permanent residence, which matters to people whose other nationality forbids holding two.',
        ],
        pt: [
          'Considerar adiar a cidadania e permanecer como residente',
          'A lei permite que um imigrante elegível recuse a cidadania e mantenha residência permanente, o que importa a quem tem outra nacionalidade que proíbe ter duas.',
        ],
        es: [
          'Considerar aplazar la ciudadanía y quedarse como residente',
          'La ley permite que un inmigrante elegible rechace la ciudadanía y mantenga la residencia permanente, lo que importa a quien tiene otra nacionalidad que prohíbe tener dos.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },

  'Temporary Residence (A/5)': {
    core_documents: [
      {
        en: [
          'Passport valid throughout the permit',
          'The A/5 is issued for a term and renewed, and each renewal is stamped in a valid passport.',
        ],
        pt: [
          'Passaporte válido durante toda a autorização',
          'O A/5 é emitido por um prazo e renovado, e cada renovação é carimbada num passaporte válido.',
        ],
        es: [
          'Pasaporte vigente durante todo el permiso',
          'El A/5 se emite por un plazo y se renueva, y cada renovación se sella en un pasaporte vigente.',
        ],
      },
      {
        en: [
          'Identify the basis on which you qualify',
          'Spouses and unmarried partners of citizens, people at the end of the graduated procedure, some humanitarian cases and those eligible under the Law of Return who did not take citizenship all reach A/5 by different paths.',
        ],
        pt: [
          'Identificar a base pela qual você se qualifica',
          'Cônjuges e companheiros de cidadãos, quem está no fim do procedimento gradual, alguns casos humanitários e elegíveis pela Lei do Retorno que não tomaram cidadania chegam ao A/5 por caminhos diferentes.',
        ],
        es: [
          'Identificar la base por la que usted califica',
          'Cónyuges y parejas de hecho de ciudadanos, quienes están al final del procedimiento gradual, algunos casos humanitarios y elegibles por la Ley del Retorno que no tomaron la ciudadanía llegan al A/5 por vías distintas.',
        ],
      },
      {
        en: [
          'Application at a Population and Immigration Authority branch',
          'Filed inside Israel at the office for your area of residence. There is no consular route for this status.',
        ],
        pt: [
          'Pedido numa unidade da Autoridade de População e Imigração',
          'Protocolado dentro de Israel na unidade da sua área de residência. Não há via consular para este status.',
        ],
        es: [
          'Solicitud en una oficina de la Autoridad de Población e Inmigración',
          'Se presenta dentro de Israel en la oficina de su zona de residencia. No hay vía consular para este estatus.',
        ],
      },
      {
        en: [
          'Evidence that your centre of life is in Israel',
          'Lease, utility bills, employment, children’s schools and bank records. This file is rebuilt and resubmitted at every stage of the process.',
        ],
        pt: [
          'Provas de que o seu centro de vida está em Israel',
          'Contrato de arrendamento, contas de serviços, emprego, escola dos filhos e registos bancários. Esse dossiê é refeito e reapresentado em cada etapa do processo.',
        ],
        es: [
          'Pruebas de que su centro de vida está en Israel',
          'Contrato de alquiler, facturas de servicios, empleo, colegio de los hijos y registros bancarios. Ese expediente se rehace y se vuelve a presentar en cada etapa del proceso.',
        ],
      },
      {
        en: [
          'Proof of the relationship for partner-based cases',
          'Photographs across time, correspondence, joint accounts and statements from people who know you both. Documentary marriage alone is never treated as sufficient.',
        ],
        pt: [
          'Comprovação do relacionamento nos casos baseados em vínculo conjugal',
          'Fotografias ao longo do tempo, correspondência, contas conjuntas e declarações de quem conhece os dois. O casamento documental sozinho nunca é tratado como suficiente.',
        ],
        es: [
          'Prueba de la relación en los casos basados en pareja',
          'Fotografías a lo largo del tiempo, correspondencia, cuentas conjuntas y declaraciones de quienes les conocen. El matrimonio documental por sí solo nunca se considera suficiente.',
        ],
      },
      {
        en: [
          'Understand the graduated procedure that precedes this status',
          'The A/5 usually arrives only after several years on lower permits, each renewed annually and each capable of being refused. It is the end of a staircase, not an entry point.',
        ],
        pt: [
          'Entender o procedimento gradual que antecede este status',
          'O A/5 normalmente só chega depois de vários anos em autorizações inferiores, cada uma renovada anualmente e cada uma passível de recusa. É o fim de uma escada, não uma porta de entrada.',
        ],
        es: [
          'Entender el procedimiento gradual que precede a este estatus',
          'El A/5 suele llegar solo tras varios años con permisos inferiores, cada uno renovado anualmente y cada uno susceptible de denegación. Es el final de una escalera, no una puerta de entrada.',
        ],
      },
      {
        en: [
          'Police clearance from your country of origin',
          'Apostilled and translated, and requested again at later stages if the earlier certificate has gone stale.',
        ],
        pt: [
          'Certidão criminal do seu país de origem',
          'Apostilada e traduzida, e pedida novamente em etapas posteriores se a certidão anterior tiver ficado desatualizada.',
        ],
        es: [
          'Certificado penal de su país de origen',
          'Apostillado y traducido, y solicitado de nuevo en etapas posteriores si el certificado anterior ha quedado desfasado.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence of a shared household',
          'Joint lease, shared bills and a common bank account are read as financial proof of the relationship as much as of solvency.',
        ],
        pt: [
          'Comprovação de domicílio compartilhado',
          'Contrato de arrendamento conjunto, contas partilhadas e conta bancária comum são lidos como prova financeira do relacionamento tanto quanto de solvência.',
        ],
        es: [
          'Prueba de un hogar compartido',
          'Contrato de alquiler conjunto, facturas compartidas y una cuenta bancaria común se leen como prueba financiera de la relación tanto como de solvencia.',
        ],
      },
      {
        en: [
          'Fee at each stage of the procedure',
          'Every annual renewal along the staircase carries its own charge, so the total cost over the years is far larger than the first payment suggests.',
        ],
        pt: [
          'Taxa em cada etapa do procedimento',
          'Cada renovação anual ao longo da escada tem uma cobrança própria, então o custo total ao longo dos anos é bem maior do que o primeiro pagamento sugere.',
        ],
        es: [
          'Tasa en cada etapa del procedimiento',
          'Cada renovación anual a lo largo de la escalera tiene su propio cargo, así que el coste total a lo largo de los años es mucho mayor de lo que sugiere el primer pago.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Book the appointment and attend in person with your partner',
          'Both of you are expected to appear. Sending documents through a lawyer alone does not substitute for the appearance.',
        ],
        pt: [
          'Marcar o atendimento e comparecer presencialmente com o seu parceiro',
          'Espera-se que os dois compareçam. Enviar documentos apenas por um advogado não substitui o comparecimento.',
        ],
        es: [
          'Reservar la cita y acudir en persona con su pareja',
          'Se espera que acudan ambos. Enviar documentos solo a través de un abogado no sustituye la comparecencia.',
        ],
      },
      {
        en: [
          'Expect separate interviews about your daily life',
          'The couple is questioned apart and the answers compared. Inconsistencies about ordinary domestic details are what most often derail a case.',
        ],
        pt: [
          'Contar com entrevistas separadas sobre o cotidiano de vocês',
          'O casal é interrogado em separado e as respostas são comparadas. Inconsistências sobre detalhes domésticos comuns são o que mais frequentemente descarrila um caso.',
        ],
        es: [
          'Contar con entrevistas separadas sobre su vida cotidiana',
          'A la pareja se le interroga por separado y se comparan las respuestas. Las inconsistencias sobre detalles domésticos corrientes son lo que más suele descarrilar un caso.',
        ],
      },
      {
        en: [
          'Renew before the current permit expires, every time',
          'Falling out of status even briefly restarts the graduated procedure from an earlier stage and adds years to the wait.',
        ],
        pt: [
          'Renovar antes de a autorização atual expirar, todas as vezes',
          'Ficar sem status mesmo por pouco tempo reinicia o procedimento gradual a partir de uma etapa anterior e acrescenta anos à espera.',
        ],
        es: [
          'Renovar antes de que caduque el permiso actual, siempre',
          'Quedarse sin estatus aunque sea brevemente reinicia el procedimiento gradual desde una etapa anterior y añade años a la espera.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric identity card issued with the status',
          'A/5 holders receive an identity card marked as temporary residence, with the same identity number carried forward if you later naturalise.',
        ],
        pt: [
          'Cartão de identidade biométrico emitido com o status',
          'Titulares de A/5 recebem um cartão de identidade marcado como residência temporária, com o mesmo número de identidade mantido se você se naturalizar depois.',
        ],
        es: [
          'Tarjeta de identidad biométrica emitida con el estatus',
          'Los titulares de A/5 reciben una tarjeta de identidad marcada como residencia temporal, con el mismo número de identidad que se mantiene si más adelante se naturaliza.',
        ],
      },
      {
        en: [
          'Private cover during the earlier stages',
          'The lower permits in the staircase do not always include national health entitlement, so private insurance is needed until the A/5 is reached.',
        ],
        pt: [
          'Cobertura privada durante as etapas anteriores',
          'As autorizações inferiores da escada nem sempre incluem direito à saúde nacional, então é preciso seguro privado até chegar ao A/5.',
        ],
        es: [
          'Cobertura privada durante las etapas anteriores',
          'Los permisos inferiores de la escalera no siempre incluyen derecho a la salud nacional, así que hace falta seguro privado hasta llegar al A/5.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Work without needing an employer to sponsor you',
          'This is the practical leap the A/5 delivers: unlike the B/1, the right to work is attached to you rather than to a named company.',
        ],
        pt: [
          'Trabalhar sem precisar que um empregador patrocine você',
          'Esse é o salto prático que o A/5 entrega: ao contrário do B/1, o direito de trabalhar está ligado a você e não a uma empresa nomeada.',
        ],
        es: [
          'Trabajar sin necesidad de que un empleador le patrocine',
          'Ese es el salto práctico que da el A/5: a diferencia del B/1, el derecho a trabajar está unido a usted y no a una empresa concreta.',
        ],
      },
      {
        en: [
          'Register with the national insurance institute and a health fund',
          'Temporary residents enter the national health system, but only once they register, and cover begins from registration rather than from the grant.',
        ],
        pt: [
          'Inscrever-se no instituto de seguro nacional e num fundo de saúde',
          'Residentes temporários entram no sistema nacional de saúde, mas só depois de se inscreverem, e a cobertura começa na inscrição e não na concessão.',
        ],
        es: [
          'Inscribirse en el instituto de seguro nacional y en un fondo de salud',
          'Los residentes temporales entran en el sistema nacional de salud, pero solo tras inscribirse, y la cobertura empieza en la inscripción y no en la concesión.',
        ],
      },
      {
        en: [
          'Keep your centre of life in Israel throughout',
          'Extended periods abroad are read as abandoning the process, and the status can be withdrawn on that basis alone.',
        ],
        pt: [
          'Manter o seu centro de vida em Israel durante todo o período',
          'Períodos longos no exterior são lidos como abandono do processo, e o status pode ser retirado apenas por isso.',
        ],
        es: [
          'Mantener su centro de vida en Israel durante todo el periodo',
          'Los periodos largos en el extranjero se leen como abandono del proceso, y el estatus puede retirarse solo por eso.',
        ],
      },
      {
        en: [
          'Report a change in the relationship immediately',
          'Separation or divorce during the procedure ends the basis for the status, and concealing it is treated more severely than the change itself.',
        ],
        pt: [
          'Comunicar imediatamente qualquer mudança no relacionamento',
          'Separação ou divórcio durante o procedimento encerra a base do status, e ocultar isso é tratado com mais severidade do que a própria mudança.',
        ],
        es: [
          'Comunicar de inmediato cualquier cambio en la relación',
          'La separación o el divorcio durante el procedimiento acaba con la base del estatus, y ocultarlo se trata con más severidad que el propio cambio.',
        ],
      },
      {
        en: [
          'Apply for citizenship once the procedure completes',
          'At the end of the staircase naturalisation is requested separately, and it is granted rather than automatic, which surprises couples who assumed the last renewal was the last step.',
        ],
        pt: [
          'Pedir a cidadania quando o procedimento se concluir',
          'No fim da escada a naturalização é requerida à parte, e é concedida em vez de automática, o que surpreende casais que supunham que a última renovação era o último passo.',
        ],
        es: [
          'Solicitar la ciudadanía cuando concluya el procedimiento',
          'Al final de la escalera la naturalización se solicita aparte, y se concede en lugar de ser automática, lo que sorprende a las parejas que suponían que la última renovación era el último paso.',
        ],
        priority: 2,
      },
    ],
  },
};
