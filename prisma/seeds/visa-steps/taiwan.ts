import type { CountryVisaSteps } from './types';

/**
 * Steps for Taiwan.
 *
 * Residence here is built in two stages that people routinely confuse. The visa
 * only gets you through the door: a resident visa must be converted into an
 * Alien Resident Certificate at an immigration service centre within a short
 * window after landing, and years on that certificate are what eventually
 * qualify you for the permanent version. On the work side the order is inverted
 * from what most expect — the employer obtains the work permit from the labour
 * ministry first, and only then is a visa applied for abroad. The Employment
 * Gold Card is the exception that collapses the whole sequence: visa, resident
 * certificate and an open work permit in a single card, applied for online with
 * no employer at all. A health examination at an approved hospital sits on every
 * residence route, including the permanent one.
 */
export const taiwan: CountryVisaSteps = {
  'Visitor Visa': {
    core_documents: [
      {
        en: [
          'Passport with six months of remaining validity',
          'Counted from the intended date of entry, and checked again by the airline before boarding.',
        ],
        pt: [
          'Passaporte com seis meses de validade restante',
          'Contados a partir da data pretendida de entrada, e conferidos de novo pela companhia aérea antes do embarque.',
        ],
        es: [
          'Pasaporte con seis meses de validez restante',
          'Contados desde la fecha prevista de entrada, y comprobados de nuevo por la aerolínea antes de embarcar.',
        ],
      },
      {
        en: [
          'Check visa-exempt entry before applying',
          'Many nationalities are admitted for a substantial period with no visa. Applying for a visitor visa anyway can leave you with a shorter permitted stay than the exemption would have given.',
        ],
        pt: [
          'Verificar a entrada isenta de visto antes de pedir',
          'Muitas nacionalidades são admitidas por um período considerável sem visto. Pedir um visto de visitante mesmo assim pode resultar numa permanência menor do que a isenção teria dado.',
        ],
        es: [
          'Comprobar la entrada exenta de visado antes de solicitar',
          'Muchas nacionalidades son admitidas por un periodo considerable sin visado. Solicitar un visado de visitante igualmente puede dejarle una estancia permitida menor que la de la exención.',
        ],
      },
      {
        en: [
          'Online application form printed with its barcode',
          'The form is completed on the ministry portal and printed; the printed copy carries a code the office scans, so a handwritten form is not accepted.',
        ],
        pt: [
          'Formulário online impresso com o código de barras',
          'O formulário é preenchido no portal do ministério e impresso; a cópia impressa traz um código que o posto escaneia, então um formulário manuscrito não é aceito.',
        ],
        es: [
          'Formulario en línea impreso con su código de barras',
          'El formulario se completa en el portal del ministerio y se imprime; la copia impresa lleva un código que la oficina escanea, así que un formulario manuscrito no se acepta.',
        ],
      },
      {
        en: [
          'Confirmed itinerary with an onward ticket',
          'Flight bookings and accommodation for the whole stay, consistent with the purpose declared on the form.',
        ],
        pt: [
          'Itinerário confirmado com passagem de saída',
          'Reservas de voo e de alojamento para toda a estada, coerentes com a finalidade declarada no formulário.',
        ],
        es: [
          'Itinerario confirmado con billete de salida',
          'Reservas de vuelo y de alojamiento para toda la estancia, coherentes con el propósito declarado en el formulario.',
        ],
      },
      {
        en: [
          'Invitation letter for business or family visits',
          'From the company or relative in Taiwan, with their registration or identity document attached.',
        ],
        pt: [
          'Carta-convite para visitas de negócios ou de família',
          'Da empresa ou do familiar em Taiwan, com o registo ou documento de identidade dele anexado.',
        ],
        es: [
          'Carta de invitación para visitas de negocios o familiares',
          'De la empresa o del familiar en Taiwán, con su registro o documento de identidad adjunto.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of funds covering the visit',
          'Recent bank statements in your name, proportionate to the length of stay requested.',
        ],
        pt: [
          'Comprovação de recursos para cobrir a visita',
          'Extratos bancários recentes em seu nome, proporcionais à duração da estada pedida.',
        ],
        es: [
          'Prueba de fondos que cubran la visita',
          'Extractos bancarios recientes a su nombre, proporcionales a la duración de la estancia solicitada.',
        ],
      },
      {
        en: [
          'Evidence of ties to your country of residence',
          'An employment letter, enrolment record or business registration showing you have a reason to return.',
        ],
        pt: [
          'Comprovação de vínculos com seu país de residência',
          'Carta do empregador, comprovante de matrícula ou registo de empresa mostrando que você tem motivo para voltar.',
        ],
        es: [
          'Prueba de vínculos con su país de residencia',
          'Carta del empleador, matrícula o registro de empresa que muestre que tiene motivos para volver.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply at a Taipei representative office',
          'Taiwan maintains representative offices rather than embassies in most countries; that office, not a Chinese mission, is where visa applications are filed.',
        ],
        pt: [
          'Pedir num escritório de representação de Taipé',
          'Taiwan mantém escritórios de representação em vez de embaixadas na maioria dos países; é ali, e não numa missão chinesa, que os pedidos de visto são protocolados.',
        ],
        es: [
          'Solicitar en una oficina de representación de Taipéi',
          'Taiwán mantiene oficinas de representación en lugar de embajadas en la mayoría de los países; es allí, y no en una misión china, donde se presentan las solicitudes de visado.',
        ],
      },
      {
        en: [
          'Pay the visa fee for the entry type chosen',
          'Single and multiple entry are priced differently, and reciprocity agreements exempt or discount some nationalities. Check the current tariff at the office handling you.',
        ],
        pt: [
          'Pagar a taxa do visto conforme o tipo de entrada escolhido',
          'Entrada única e múltipla têm preços diferentes, e acordos de reciprocidade isentam ou reduzem para algumas nacionalidades. Confira a tarifa vigente no posto que atende você.',
        ],
        es: [
          'Pagar la tasa del visado según el tipo de entrada elegido',
          'La entrada única y la múltiple tienen precios distintos, y los acuerdos de reciprocidad eximen o rebajan a algunas nacionalidades. Consulte la tarifa vigente en la oficina que le atiende.',
        ],
      },
      {
        en: [
          'Read the duration of stay printed on the visa',
          'The visa states the days granted per entry and whether extension is allowed. A visa marked as non-extendable cannot be prolonged inside the country under any argument.',
        ],
        pt: [
          'Ler a duração de permanência impressa no visto',
          'O visto informa os dias concedidos por entrada e se a prorrogação é permitida. Um visto marcado como não prorrogável não pode ser estendido dentro do país sob nenhum argumento.',
        ],
        es: [
          'Leer la duración de estancia impresa en el visado',
          'El visado indica los días concedidos por entrada y si se permite prórroga. Un visado marcado como no prorrogable no puede alargarse dentro del país bajo ningún argumento.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Photograph matching the published specification',
          'Recent, plain background, to the exact dimensions the office publishes; a rejected photo means a second trip.',
        ],
        pt: [
          'Fotografia dentro da especificação publicada',
          'Recente, fundo liso, nas dimensões exatas que o posto publica; uma foto recusada significa uma segunda viagem.',
        ],
        es: [
          'Fotografía conforme a la especificación publicada',
          'Reciente, fondo liso, con las dimensiones exactas que publica la oficina; una foto rechazada implica un segundo viaje.',
        ],
      },
      {
        en: [
          'Private travel medical cover',
          'Visitors are outside the national health insurance system and pay hospital charges in full.',
        ],
        pt: [
          'Cobertura médica privada de viagem',
          'Visitantes ficam fora do sistema nacional de seguro de saúde e pagam os custos hospitalares integralmente.',
        ],
        es: [
          'Cobertura médica privada de viaje',
          'Los visitantes quedan fuera del sistema nacional de seguro de salud y pagan los cargos hospitalarios íntegros.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Extend at a National Immigration Agency service centre',
          'Applied for at the local service centre before the current permission runs out, and only where the visa permits extension.',
        ],
        pt: [
          'Prorrogar num centro de atendimento da agência de imigração',
          'Pedido no centro de atendimento local antes de a permissão atual acabar, e apenas quando o visto permitir prorrogação.',
        ],
        es: [
          'Prorrogar en un centro de servicio de la agencia de inmigración',
          'Se solicita en el centro de servicio local antes de que se agote el permiso vigente, y solo cuando el visado permita prórroga.',
        ],
      },
      {
        en: [
          'Do not work or enrol in a degree programme as a visitor',
          'Visitor status covers tourism, family visits, short courses and business meetings. Paid work needs a permit obtained beforehand, with no exception for remote arrangements.',
        ],
        pt: [
          'Não trabalhar nem se matricular em curso de graduação como visitante',
          'O status de visitante cobre turismo, visita a familiares, cursos curtos e reuniões de negócios. Trabalho remunerado exige permissão obtida antes, sem exceção para arranjos remotos.',
        ],
        es: [
          'No trabajar ni matricularse en una carrera como visitante',
          'El estatus de visitante cubre turismo, visitas familiares, cursos cortos y reuniones de negocios. El trabajo remunerado exige un permiso obtenido de antemano, sin excepción para arreglos remotos.',
        ],
      },
      {
        en: [
          'Expect to leave in order to switch to a resident visa',
          'Changing from visitor to resident status from inside the country is allowed only in defined situations; most people are told to apply at a representative office abroad.',
        ],
        pt: [
          'Contar com sair do país para mudar para visto de residência',
          'Mudar de visitante para residente de dentro do país só é permitido em situações definidas; a maioria é orientada a pedir num escritório de representação no exterior.',
        ],
        es: [
          'Contar con salir del país para pasar a un visado de residencia',
          'Cambiar de visitante a residente desde dentro del país solo se permite en situaciones definidas; a la mayoría se le indica solicitarlo en una oficina de representación en el extranjero.',
        ],
      },
      {
        en: [
          'Keep the entry record for your departure',
          'Entry and exit dates are what any later residence application is counted against, so save boarding passes and stamps from the start.',
        ],
        pt: [
          'Guardar o registo de entrada para a sua saída',
          'As datas de entrada e saída são a base de contagem de qualquer pedido de residência posterior, então guarde cartões de embarque e carimbos desde o início.',
        ],
        es: [
          'Guardar el registro de entrada para su salida',
          'Las fechas de entrada y salida son la base de cómputo de cualquier solicitud de residencia posterior, así que guarde tarjetas de embarque y sellos desde el principio.',
        ],
        priority: 2,
      },
    ],
  },

  'Employment Gold Card': {
    core_documents: [
      {
        en: [
          'Valid passport for the online submission',
          'Scanned in full colour, including the data page and any pages holding relevant residence history.',
        ],
        pt: [
          'Passaporte válido para o envio online',
          'Digitalizado a cores, incluindo a página de dados e quaisquer páginas com histórico de residência relevante.',
        ],
        es: [
          'Pasaporte vigente para el envío en línea',
          'Escaneado a color, incluida la página de datos y las páginas con historial de residencia relevante.',
        ],
      },
      {
        en: [
          'Identify which qualifying field you apply under',
          'The card is granted across several designated fields — science and technology, economy, education, culture and arts, sport, finance, law and architecture — and each is reviewed by its own ministry with its own criteria.',
        ],
        pt: [
          'Identificar em qual área qualificadora você se enquadra',
          'O cartão é concedido em várias áreas designadas — ciência e tecnologia, economia, educação, cultura e artes, desporto, finanças, direito e arquitetura — e cada uma é avaliada pelo seu ministério, com critérios próprios.',
        ],
        es: [
          'Identificar bajo qué campo cualificador solicita',
          'La tarjeta se concede en varios campos designados —ciencia y tecnología, economía, educación, cultura y artes, deporte, finanzas, derecho y arquitectura— y cada uno lo revisa su propio ministerio con criterios propios.',
        ],
      },
      {
        en: [
          'Submit through the single joint application platform',
          'One online submission is routed to the immigration, labour and foreign affairs authorities together, which is why this route replaces three separate procedures.',
        ],
        pt: [
          'Enviar pela plataforma única de pedido conjunto',
          'Um único envio online é encaminhado às autoridades de imigração, trabalho e relações exteriores ao mesmo tempo, e é por isso que esta rota substitui três procedimentos separados.',
        ],
        es: [
          'Enviar por la plataforma única de solicitud conjunta',
          'Un solo envío en línea se dirige a la vez a las autoridades de inmigración, trabajo y exteriores, y por eso esta vía sustituye tres trámites separados.',
        ],
      },
      {
        en: [
          'Digital photograph and identity declarations',
          'Uploaded to the portal along with the declarations on criminal record and previous residence in Taiwan.',
        ],
        pt: [
          'Fotografia digital e declarações de identidade',
          'Carregadas no portal junto com as declarações sobre antecedentes criminais e residência anterior em Taiwan.',
        ],
        es: [
          'Fotografía digital y declaraciones de identidad',
          'Se suben al portal junto con las declaraciones sobre antecedentes penales y residencia previa en Taiwán.',
        ],
      },
      {
        en: [
          'Supporting evidence for the special professional criteria',
          'Recommendation letters, press coverage, patents, awards or contracts, depending on the field. Reviewers weigh substance here, so a thin file is refused even when the formal boxes are ticked.',
        ],
        pt: [
          'Provas de apoio aos critérios de profissional especial',
          'Cartas de recomendação, cobertura de imprensa, patentes, prémios ou contratos, conforme a área. Os avaliadores pesam substância aqui, então um processo magro é recusado mesmo com os requisitos formais cumpridos.',
        ],
        es: [
          'Pruebas de apoyo a los criterios de profesional especial',
          'Cartas de recomendación, cobertura de prensa, patentes, premios o contratos, según el campo. Los evaluadores pesan la sustancia aquí, así que un expediente delgado se rechaza aunque los requisitos formales estén marcados.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Degree certificates and professional licences',
          'Uploaded as scans; certified translations are asked for when the original is not in Chinese or English.',
        ],
        pt: [
          'Diplomas e licenças profissionais',
          'Carregados como digitalizações; traduções certificadas são pedidas quando o original não está em chinês nem em inglês.',
        ],
        es: [
          'Títulos y licencias profesionales',
          'Se suben escaneados; se piden traducciones certificadas cuando el original no está en chino ni en inglés.',
        ],
      },
      {
        en: [
          'Employment history proving years in the field',
          'Letters from employers stating role and dates. The number of years required varies by field and is checked against the criteria published for that ministry.',
        ],
        pt: [
          'Histórico profissional comprovando anos na área',
          'Cartas de empregadores com cargo e datas. O número de anos exigido varia por área e é conferido contra os critérios publicados pelo ministério correspondente.',
        ],
        es: [
          'Historial laboral que acredite años en el campo',
          'Cartas de empleadores con el puesto y las fechas. Los años exigidos varían por campo y se contrastan con los criterios publicados por el ministerio correspondiente.',
        ],
      },
      {
        en: [
          'Salary route as an alternative to credentials',
          'Reaching the income level set for foreign special professionals in a recent month qualifies you without awards or a specific degree. Confirm the threshold currently published before relying on it.',
        ],
        pt: [
          'Rota salarial como alternativa às credenciais',
          'Atingir o nível de renda fixado para profissionais especiais estrangeiros num mês recente qualifica você sem prémios nem diploma específico. Confirme o limiar atualmente publicado antes de contar com ele.',
        ],
        es: [
          'Vía salarial como alternativa a las credenciales',
          'Alcanzar el nivel de ingresos fijado para profesionales especiales extranjeros en un mes reciente le califica sin premios ni un título concreto. Confirme el umbral publicado actualmente antes de basarse en él.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Payslips and tax records for the income claim',
          'The salary route is documented, not declared: pay statements and tax filings from the relevant period have to line up with each other.',
        ],
        pt: [
          'Contracheques e documentos fiscais para a alegação de renda',
          'A rota salarial é documentada, não declarada: holerites e declarações fiscais do período relevante precisam bater entre si.',
        ],
        es: [
          'Nóminas y documentos fiscales para la alegación de ingresos',
          'La vía salarial se documenta, no se declara: las nóminas y las declaraciones fiscales del periodo deben cuadrar entre sí.',
        ],
      },
      {
        en: [
          'Reserve for living costs without an employer',
          'The card arrives with no job attached. Rent deposits are paid several months up front and you may be looking for work for a while.',
        ],
        pt: [
          'Reserva para custo de vida sem empregador',
          'O cartão chega sem emprego vinculado. Depósitos de aluguel são pagos com vários meses adiantados e você pode passar um tempo procurando trabalho.',
        ],
        es: [
          'Reserva para el coste de vida sin empleador',
          'La tarjeta llega sin empleo asociado. Los depósitos de alquiler se pagan con varios meses por adelantado y puede pasar un tiempo buscando trabajo.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Pay the application and card charges online',
          'Paid in two stages through the platform: one for the review and one when the card is produced. Check the amounts in force.',
        ],
        pt: [
          'Pagar os encargos de pedido e de cartão online',
          'Pagos em duas etapas pela plataforma: um pela análise e outro quando o cartão é produzido. Confira os valores em vigor.',
        ],
        es: [
          'Pagar los cargos de solicitud y de tarjeta en línea',
          'Se pagan en dos etapas por la plataforma: uno por la revisión y otro cuando se produce la tarjeta. Consulte los importes en vigor.',
        ],
      },
      {
        en: [
          'Allow for the multi-ministry review',
          'Because several authorities look at the same file, questions come back through the portal and each round adds weeks. Answer promptly; an unanswered query closes the case.',
        ],
        pt: [
          'Prever tempo para a análise entre vários ministérios',
          'Como várias autoridades olham o mesmo processo, questionamentos voltam pelo portal e cada rodada acrescenta semanas. Responda rápido; um pedido sem resposta encerra o caso.',
        ],
        es: [
          'Prever tiempo para la revisión entre varios ministerios',
          'Como varias autoridades miran el mismo expediente, las consultas vuelven por el portal y cada ronda añade semanas. Responda pronto; una consulta sin respuesta cierra el caso.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Health examination at an approved hospital',
          'Required for the residence stage, using the standard form and accepted only within a limited window before issue. It can be done abroad at a designated hospital or after arrival.',
        ],
        pt: [
          'Exame de saúde em hospital aprovado',
          'Exigido na etapa de residência, com o formulário padrão e aceito apenas dentro de uma janela limitada antes da emissão. Pode ser feito no exterior num hospital designado ou depois da chegada.',
        ],
        es: [
          'Examen de salud en un hospital aprobado',
          'Exigido en la etapa de residencia, con el formulario estándar y aceptado solo dentro de una ventana limitada antes de la emisión. Puede hacerse en el extranjero en un hospital designado o tras la llegada.',
        ],
      },
      {
        en: [
          'Photograph captured for the physical card',
          'Taken or supplied when you collect the card, which doubles as your identity document in Taiwan.',
        ],
        pt: [
          'Fotografia captada para o cartão físico',
          'Tirada ou fornecida quando você retira o cartão, que serve também como seu documento de identidade em Taiwan.',
        ],
        es: [
          'Fotografía tomada para la tarjeta física',
          'Se toma o se aporta al recoger la tarjeta, que hace también de documento de identidad en Taiwán.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the card that combines visa, residence and work rights',
          'One document replaces the resident visa, the resident certificate and the work permit, and it lets you work for any employer or none.',
        ],
        pt: [
          'Retirar o cartão que reúne visto, residência e direito ao trabalho',
          'Um único documento substitui o visto de residência, o certificado de residente e a permissão de trabalho, e permite trabalhar para qualquer empregador ou para nenhum.',
        ],
        es: [
          'Recoger la tarjeta que reúne visado, residencia y derecho al trabajo',
          'Un solo documento sustituye al visado de residencia, al certificado de residente y al permiso de trabajo, y le permite trabajar para cualquier empleador o para ninguno.',
        ],
      },
      {
        en: [
          'Register your address at the household registration office',
          'Done at the district office where you live, shortly after arrival, and repeated whenever you move.',
        ],
        pt: [
          'Registar a morada no gabinete de registo domiciliar',
          'Feito no escritório distrital onde você mora, logo após a chegada, e repetido sempre que mudar de endereço.',
        ],
        es: [
          'Registrar el domicilio en la oficina de registro domiciliario',
          'Se hace en la oficina de distrito donde vive, poco después de llegar, y se repite cada vez que se muda.',
        ],
      },
      {
        en: [
          'Enrol in National Health Insurance when you become eligible',
          'Enrolment is compulsory once the qualifying residence period is complete, or immediately if you take a job. Premiums are backdated to the eligibility date, not to the day you sign up.',
        ],
        pt: [
          'Inscrever-se no seguro nacional de saúde ao ficar elegível',
          'A inscrição é obrigatória assim que o período de residência qualificador se completa, ou imediatamente se você assumir um emprego. As contribuições retroagem à data de elegibilidade, não ao dia da inscrição.',
        ],
        es: [
          'Inscribirse en el seguro nacional de salud al ser elegible',
          'La inscripción es obligatoria una vez cumplido el periodo de residencia que califica, o de inmediato si acepta un empleo. Las cuotas se retrotraen a la fecha de elegibilidad, no al día del alta.',
        ],
      },
      {
        en: [
          'Check the tax relief for foreign special professionals',
          'A portion of income above a set level can be excluded for a number of years, but the relief has to be claimed correctly in your filings. Confirm the current rules with the tax office.',
        ],
        pt: [
          'Verificar o alívio fiscal para profissionais especiais estrangeiros',
          'Uma parte da renda acima de certo nível pode ser excluída por alguns anos, mas o benefício precisa ser reivindicado corretamente nas declarações. Confirme as regras atuais com a autoridade fiscal.',
        ],
        es: [
          'Consultar el alivio fiscal para profesionales especiales extranjeros',
          'Una parte de los ingresos por encima de cierto nivel puede excluirse durante algunos años, pero el beneficio hay que reclamarlo correctamente en las declaraciones. Confirme las reglas actuales con la agencia tributaria.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Renew before expiry and count the years towards permanence',
          'Time held on the card counts as legal residence for the permanent certificate, provided you meet the days-per-year requirement each of those years.',
        ],
        pt: [
          'Renovar antes do vencimento e contar os anos para a permanência',
          'O tempo com o cartão conta como residência legal para o certificado permanente, desde que você cumpra a exigência de dias por ano em cada um desses anos.',
        ],
        es: [
          'Renovar antes de caducar y contar los años hacia la permanencia',
          'El tiempo con la tarjeta cuenta como residencia legal para el certificado permanente, siempre que cumpla el requisito de días por año en cada uno de esos años.',
        ],
      },
    ],
  },

  'Work Permit and Alien Resident Certificate': {
    core_documents: [
      {
        en: [
          'Passport covering the contract period',
          'The residence certificate is issued no longer than the passport, so a short-dated passport shortens your permit.',
        ],
        pt: [
          'Passaporte cobrindo o período do contrato',
          'O certificado de residência não é emitido por prazo maior que o do passaporte, então um passaporte com validade curta encurta a sua autorização.',
        ],
        es: [
          'Pasaporte que cubra el periodo del contrato',
          'El certificado de residencia no se emite por más tiempo que el pasaporte, así que un pasaporte de validez corta acorta su autorización.',
        ],
      },
      {
        en: [
          'Employer files the work permit with the labour ministry first',
          'This is the step people invert. Nothing can be applied for at a representative office until the labour authority has approved the permit, and the approval letter is what unlocks the visa.',
        ],
        pt: [
          'Empregador protocola a permissão de trabalho no ministério do trabalho antes',
          'Esta é a etapa que as pessoas invertem. Nada pode ser pedido num escritório de representação enquanto a autoridade laboral não aprovar a permissão, e é a carta de aprovação que destrava o visto.',
        ],
        es: [
          'El empleador presenta primero el permiso laboral ante el ministerio de trabajo',
          'Esta es la etapa que la gente invierte. Nada puede solicitarse en una oficina de representación hasta que la autoridad laboral apruebe el permiso, y es la carta de aprobación la que desbloquea el visado.',
        ],
      },
      {
        en: [
          'Employment contract matching the permit category',
          'Job title, duties and pay must sit inside the category applied for; a generic contract is sent back for rewriting.',
        ],
        pt: [
          'Contrato de trabalho compatível com a categoria da permissão',
          'Cargo, funções e remuneração precisam caber na categoria pedida; um contrato genérico é devolvido para reescrita.',
        ],
        es: [
          'Contrato de trabajo acorde con la categoría del permiso',
          'El puesto, las funciones y la retribución deben encajar en la categoría solicitada; un contrato genérico se devuelve para reescribirlo.',
        ],
      },
      {
        en: [
          'Employer registration and financial statements',
          'The hiring company itself has to qualify — thresholds on paid-in capital or turnover apply, and a young company often cannot sponsor at all.',
        ],
        pt: [
          'Registo e demonstrações financeiras do empregador',
          'A própria empresa contratante precisa qualificar — há patamares de capital integralizado ou de faturamento, e uma empresa recém-criada muitas vezes não pode patrocinar.',
        ],
        es: [
          'Registro y estados financieros del empleador',
          'La propia empresa contratante debe calificar: hay umbrales de capital desembolsado o de facturación, y una empresa joven a menudo no puede patrocinar.',
        ],
      },
      {
        en: [
          'Resident visa applied for with the approved permit',
          'Filed at a representative office abroad. Ask explicitly for a resident visa: a visitor visa issued by mistake cannot be turned into a residence certificate.',
        ],
        pt: [
          'Visto de residência pedido com a permissão aprovada',
          'Protocolado num escritório de representação no exterior. Peça explicitamente um visto de residência: um visto de visitante emitido por engano não pode virar certificado de residência.',
        ],
        es: [
          'Visado de residencia solicitado con el permiso aprobado',
          'Se presenta en una oficina de representación en el extranjero. Pida explícitamente un visado de residencia: un visado de visitante emitido por error no puede convertirse en certificado de residencia.',
        ],
      },
      {
        en: [
          'Authenticated criminal record certificate',
          'Issued in your country of nationality or residence and legalised by a Taiwanese representative office there. Doing it after departure is far harder.',
        ],
        pt: [
          'Certidão de antecedentes criminais autenticada',
          'Emitida no país de nacionalidade ou residência e legalizada por um escritório de representação de Taiwan naquele país. Fazer isso depois de sair é bem mais difícil.',
        ],
        es: [
          'Certificado de antecedentes penales autenticado',
          'Emitido en su país de nacionalidad o residencia y legalizado por una oficina de representación de Taiwán allí. Hacerlo tras haber salido es mucho más difícil.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Diploma authenticated by a representative office',
          'The degree is verified abroad before it is used here. An unauthenticated diploma stalls the labour permit, not the visa, which is why it surprises people.',
        ],
        pt: [
          'Diploma autenticado por um escritório de representação',
          'O diploma é verificado no exterior antes de ser usado aqui. Um diploma não autenticado trava a permissão de trabalho, não o visto, e é por isso que pega as pessoas de surpresa.',
        ],
        es: [
          'Título autenticado por una oficina de representación',
          'El título se verifica en el extranjero antes de usarse aquí. Un título sin autenticar frena el permiso laboral, no el visado, y por eso pilla a la gente por sorpresa.',
        ],
      },
      {
        en: [
          'Experience letters covering the required years',
          'The eligibility test trades degree level against years of relevant work, so a lower qualification can still pass with enough documented experience.',
        ],
        pt: [
          'Cartas de experiência cobrindo os anos exigidos',
          'O teste de elegibilidade troca nível de diploma por anos de trabalho relevante, então uma qualificação menor ainda passa com experiência documentada suficiente.',
        ],
        es: [
          'Cartas de experiencia que cubran los años exigidos',
          'La prueba de elegibilidad intercambia nivel de titulación por años de trabajo relevante, así que una cualificación menor aún pasa con suficiente experiencia documentada.',
        ],
      },
      {
        en: [
          'Professional licence for regulated occupations',
          'Teaching, healthcare and several technical fields need recognition of the licence before the permit can be granted.',
        ],
        pt: [
          'Licença profissional para ocupações regulamentadas',
          'Ensino, saúde e várias áreas técnicas exigem reconhecimento da licença antes de a permissão poder ser concedida.',
        ],
        es: [
          'Licencia profesional para ocupaciones reguladas',
          'La docencia, la sanidad y varios campos técnicos exigen el reconocimiento de la licencia antes de poder conceder el permiso.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Monthly pay at or above the floor for the category',
          'A minimum average monthly salary applies to general professional categories and is checked against the contract. Confirm the level currently in force.',
        ],
        pt: [
          'Remuneração mensal igual ou superior ao piso da categoria',
          'Um salário médio mensal mínimo se aplica às categorias profissionais gerais e é conferido contra o contrato. Confirme o nível atualmente em vigor.',
        ],
        es: [
          'Retribución mensual igual o superior al suelo de la categoría',
          'Un salario medio mensual mínimo se aplica a las categorías profesionales generales y se contrasta con el contrato. Confirme el nivel vigente actualmente.',
        ],
      },
      {
        en: [
          'Cash for deposits before the first payday',
          'Landlords commonly ask for two months of deposit plus a month in advance, and a foreigner without a local guarantor is asked for more.',
        ],
        pt: [
          'Dinheiro para depósitos antes do primeiro salário',
          'Senhorios costumam pedir dois meses de caução mais um mês adiantado, e de um estrangeiro sem fiador local se pede mais.',
        ],
        es: [
          'Efectivo para depósitos antes de la primera nómina',
          'Los arrendadores suelen pedir dos meses de fianza más un mes por adelantado, y a un extranjero sin avalista local se le pide más.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Pay the permit charge and then the resident visa charge',
          'Two separate payments to two separate authorities. Verify both current tariffs before budgeting.',
        ],
        pt: [
          'Pagar o encargo da permissão e depois o do visto de residência',
          'São dois pagamentos separados a duas autoridades distintas. Verifique as duas tarifas vigentes antes de orçar.',
        ],
        es: [
          'Pagar el cargo del permiso y luego el del visado de residencia',
          'Son dos pagos separados a dos autoridades distintas. Verifique ambas tarifas vigentes antes de presupuestar.',
        ],
      },
      {
        en: [
          'Convert the resident visa into a residence certificate on arrival',
          'The conversion is done at an immigration service centre within a short deadline after landing, counted in days rather than weeks. Missing it leaves you without lawful residence even though the visa looks valid.',
        ],
        pt: [
          'Converter o visto de residência em certificado de residência ao chegar',
          'A conversão é feita num centro de atendimento da imigração dentro de um prazo curto após o desembarque, contado em dias e não em semanas. Perder o prazo deixa você sem residência legal mesmo com o visto aparentemente válido.',
        ],
        es: [
          'Convertir el visado de residencia en certificado de residencia al llegar',
          'La conversión se hace en un centro de servicio de inmigración dentro de un plazo corto tras aterrizar, contado en días y no en semanas. Perderlo le deja sin residencia legal aunque el visado parezca vigente.',
        ],
      },
      {
        en: [
          'Pay the certificate charge for the period requested',
          'Priced by the number of years granted, so it varies with the length of your contract.',
        ],
        pt: [
          'Pagar o encargo do certificado conforme o período pedido',
          'Cobrado pelo número de anos concedidos, então varia com a duração do seu contrato.',
        ],
        es: [
          'Pagar el cargo del certificado según el periodo solicitado',
          'Se cobra por el número de años concedidos, así que varía con la duración de su contrato.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Health examination on the official residence form',
          'Carried out either at a designated hospital abroad before you travel or at a qualified hospital after arrival, and only accepted inside a defined validity window.',
        ],
        pt: [
          'Exame de saúde no formulário oficial de residência',
          'Realizado num hospital designado no exterior antes da viagem ou num hospital qualificado depois da chegada, e aceito apenas dentro de uma janela de validade definida.',
        ],
        es: [
          'Examen de salud en el formulario oficial de residencia',
          'Se realiza en un hospital designado en el extranjero antes de viajar o en un hospital cualificado tras la llegada, y solo se acepta dentro de una ventana de validez definida.',
        ],
      },
      {
        en: [
          'Fingerprints and photograph for the residence certificate',
          'Recorded at the immigration service centre during the conversion appointment.',
        ],
        pt: [
          'Impressões digitais e fotografia para o certificado de residência',
          'Registadas no centro de atendimento da imigração na consulta de conversão.',
        ],
        es: [
          'Huellas y fotografía para el certificado de residencia',
          'Se registran en el centro de servicio de inmigración durante la cita de conversión.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Report your address and update it after any move',
          'The address on the certificate is a live legal record; a change has to be notified within days, and an out-of-date address complicates every later application.',
        ],
        pt: [
          'Informar a morada e atualizá-la após qualquer mudança',
          'A morada do certificado é um registo legal vivo; a alteração precisa ser comunicada em poucos dias, e um endereço desatualizado complica todo pedido posterior.',
        ],
        es: [
          'Comunicar el domicilio y actualizarlo tras cualquier mudanza',
          'El domicilio del certificado es un registro legal vivo; el cambio debe notificarse en pocos días, y una dirección desactualizada complica cualquier solicitud posterior.',
        ],
      },
      {
        en: [
          'Join the national health scheme through your employer',
          'An employed resident is enrolled from the start of the job rather than after a waiting period, with contributions split with the employer.',
        ],
        pt: [
          'Entrar no sistema nacional de saúde pelo empregador',
          'Um residente empregado é inscrito desde o início do vínculo, e não após um período de carência, com contribuições divididas com o empregador.',
        ],
        es: [
          'Entrar en el sistema nacional de salud a través del empleador',
          'Un residente empleado se inscribe desde el inicio de la relación laboral, y no tras un periodo de carencia, con cotizaciones repartidas con el empleador.',
        ],
      },
      {
        en: [
          'Get a new permit before changing employer',
          'The permit belongs to the job, not to you. Starting at a new company before its permit is approved is unauthorised work even if the certificate is still valid.',
        ],
        pt: [
          'Obter nova permissão antes de trocar de empregador',
          'A permissão pertence ao emprego, não a você. Começar numa nova empresa antes de a permissão dela ser aprovada é trabalho não autorizado mesmo com o certificado ainda válido.',
        ],
        es: [
          'Obtener un permiso nuevo antes de cambiar de empleador',
          'El permiso pertenece al puesto, no a usted. Empezar en una nueva empresa antes de que se apruebe su permiso es trabajo no autorizado aunque el certificado siga vigente.',
        ],
      },
      {
        en: [
          'Renew inside the window before both documents expire',
          'The permit and the certificate expire on their own dates and are renewed separately. Letting the permit lapse invalidates the residence that rests on it.',
        ],
        pt: [
          'Renovar dentro da janela antes de os dois documentos vencerem',
          'A permissão e o certificado vencem em datas próprias e são renovados separadamente. Deixar a permissão caducar invalida a residência que se apoia nela.',
        ],
        es: [
          'Renovar dentro de la ventana antes de que caduquen ambos documentos',
          'El permiso y el certificado caducan en fechas propias y se renuevan por separado. Dejar caducar el permiso invalida la residencia que se apoya en él.',
        ],
      },
      {
        en: [
          'Count your days in the country each year',
          'Permanent residence later requires a minimum number of days present in every qualifying year, so long trips home can silently reset the clock.',
        ],
        pt: [
          'Contar os seus dias no país a cada ano',
          'A residência permanente depois exige um número mínimo de dias de presença em cada ano qualificador, então viagens longas para casa podem zerar a contagem em silêncio.',
        ],
        es: [
          'Contar sus días en el país cada año',
          'La residencia permanente exige después un número mínimo de días de presencia en cada año que califica, así que los viajes largos a casa pueden reiniciar el cómputo en silencio.',
        ],
        priority: 2,
      },
    ],
  },

  'Permanent Residence (APRC)': {
    core_documents: [
      {
        en: [
          'Current passport and valid residence certificate',
          'You apply from inside the country while still holding lawful residence; the application cannot rescue an expired certificate.',
        ],
        pt: [
          'Passaporte atual e certificado de residência válido',
          'O pedido é feito de dentro do país com residência legal ainda vigente; ele não salva um certificado vencido.',
        ],
        es: [
          'Pasaporte actual y certificado de residencia vigente',
          'La solicitud se hace desde dentro del país con residencia legal aún vigente; no rescata un certificado caducado.',
        ],
      },
      {
        en: [
          'Record of continuous legal residence for the qualifying years',
          'Several consecutive years of residence, each of them with a minimum number of days actually spent in the country. One year below the threshold breaks the chain and the count restarts.',
        ],
        pt: [
          'Histórico de residência legal contínua nos anos qualificadores',
          'Vários anos consecutivos de residência, cada um deles com um número mínimo de dias efetivamente passados no país. Um ano abaixo do limite quebra a cadeia e a contagem recomeça.',
        ],
        es: [
          'Historial de residencia legal continua en los años que califican',
          'Varios años consecutivos de residencia, cada uno con un número mínimo de días realmente pasados en el país. Un año por debajo del umbral rompe la cadena y el cómputo se reinicia.',
        ],
      },
      {
        en: [
          'Application lodged at your local service centre',
          'Filed at the immigration service centre for the district where you are registered, not centrally and not online.',
        ],
        pt: [
          'Pedido protocolado no seu centro de atendimento local',
          'Entregue no centro de atendimento da imigração do distrito onde você está registado, não centralmente nem online.',
        ],
        es: [
          'Solicitud presentada en su centro de servicio local',
          'Se entrega en el centro de servicio de inmigración del distrito donde está registrado, no de forma centralizada ni en línea.',
        ],
      },
      {
        en: [
          'Criminal record certificates from home and from Taiwan',
          'Two documents: a local police record and an authenticated one from your country of nationality, both recent.',
        ],
        pt: [
          'Certidões criminais do país de origem e de Taiwan',
          'Dois documentos: um registo policial local e um autenticado do seu país de nacionalidade, ambos recentes.',
        ],
        es: [
          'Certificados de antecedentes del país de origen y de Taiwán',
          'Dos documentos: un registro policial local y uno autenticado de su país de nacionalidad, ambos recientes.',
        ],
      },
      {
        en: [
          'Transcript of your registered address history',
          'Obtained from the household registration office, it is the official proof of where you have lived and for how long.',
        ],
        pt: [
          'Extrato do histórico da sua morada registada',
          'Obtido no gabinete de registo domiciliar, é a prova oficial de onde você morou e por quanto tempo.',
        ],
        es: [
          'Extracto del historial de su domicilio registrado',
          'Obtenido en la oficina de registro domiciliario, es la prueba oficial de dónde ha vivido y durante cuánto tiempo.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Professional or technical qualification as an alternative test',
          'A recognised special skill or professional standing can be offered instead of the income and asset evidence, which helps applicants whose earnings fluctuate.',
        ],
        pt: [
          'Qualificação profissional ou técnica como teste alternativo',
          'Uma competência especial reconhecida ou posição profissional pode ser oferecida em vez das provas de renda e património, o que ajuda quem tem ganhos que oscilam.',
        ],
        es: [
          'Cualificación profesional o técnica como prueba alternativa',
          'Una competencia especial reconocida o una posición profesional puede ofrecerse en lugar de las pruebas de ingresos y patrimonio, lo que ayuda a quien tiene ganancias fluctuantes.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'No language examination forms part of this application',
          'Unlike naturalisation in many countries, permanent residence here does not test Chinese. Language matters for citizenship, not for this status.',
        ],
        pt: [
          'Nenhum exame de idioma faz parte deste pedido',
          'Diferente da naturalização em muitos países, a residência permanente aqui não avalia chinês. O idioma importa para a cidadania, não para este status.',
        ],
        es: [
          'Ningún examen de idioma forma parte de esta solicitud',
          'A diferencia de la naturalización en muchos países, la residencia permanente aquí no evalúa el chino. El idioma importa para la ciudadanía, no para este estatus.',
        ],
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence of self-sufficiency in income or assets',
          'Measured against a multiple of the national average wage. The figure moves each year, so check the level applying in the year you file.',
        ],
        pt: [
          'Comprovação de autossuficiência em renda ou património',
          'Medida contra um múltiplo do salário médio nacional. O valor muda a cada ano, então confira o nível aplicável no ano em que você protocolar.',
        ],
        es: [
          'Prueba de autosuficiencia en ingresos o patrimonio',
          'Se mide contra un múltiplo del salario medio nacional. La cifra cambia cada año, así que consulte el nivel aplicable en el año en que presente.',
        ],
      },
      {
        en: [
          'Tax payment certificates for the qualifying years',
          'Issued by the tax authority. Unfiled years are a common reason for refusal even when the income itself was sufficient.',
        ],
        pt: [
          'Certidões de pagamento de impostos dos anos qualificadores',
          'Emitidas pela autoridade fiscal. Anos sem declaração entregue são motivo comum de indeferimento mesmo quando a renda em si era suficiente.',
        ],
        es: [
          'Certificados de pago de impuestos de los años que califican',
          'Emitidos por la autoridad tributaria. Los años sin declaración presentada son un motivo habitual de denegación aunque los ingresos en sí fueran suficientes.',
        ],
      },
      {
        en: [
          'Show the qualifying income was earned locally',
          'The test looks at income declared to the domestic tax authority. Overseas earnings that never appeared in a local filing generally do not count towards it.',
        ],
        pt: [
          'Demonstrar que a renda qualificadora foi obtida localmente',
          'O teste olha a renda declarada à autoridade fiscal doméstica. Ganhos no exterior que nunca apareceram numa declaração local em geral não contam para ele.',
        ],
        es: [
          'Demostrar que los ingresos que califican se obtuvieron localmente',
          'La prueba mira los ingresos declarados a la autoridad tributaria interna. Las ganancias en el exterior que nunca aparecieron en una declaración local por lo general no cuentan.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'File while your existing certificate is still running',
          'Applications are accepted only from a person in lawful residence, and the current certificate has to stay valid through the whole assessment.',
        ],
        pt: [
          'Protocolar enquanto o seu certificado atual ainda estiver correndo',
          'Os pedidos só são aceites de quem está em residência legal, e o certificado atual precisa continuar válido durante toda a análise.',
        ],
        es: [
          'Presentar mientras su certificado actual siga en vigor',
          'Las solicitudes solo se aceptan de quien está en residencia legal, y el certificado actual debe seguir vigente durante toda la evaluación.',
        ],
      },
      {
        en: [
          'Pay the permanent certificate charge',
          'A one-off charge collected on issue. Verify the amount currently published rather than relying on figures in forum posts.',
        ],
        pt: [
          'Pagar o encargo do certificado permanente',
          'Um encargo único cobrado na emissão. Verifique o valor atualmente publicado em vez de confiar em números de fóruns.',
        ],
        es: [
          'Pagar el cargo del certificado permanente',
          'Un cargo único que se cobra en la emisión. Verifique el importe publicado actualmente en lugar de fiarse de cifras de foros.',
        ],
      },
      {
        en: [
          'Allow several months for the decision',
          'Assessment commonly runs for months. Renew the ordinary certificate normally in the meantime rather than letting it run out while you wait.',
        ],
        pt: [
          'Prever vários meses para a decisão',
          'A análise costuma levar meses. Renove o certificado comum normalmente nesse intervalo em vez de deixá-lo acabar enquanto espera.',
        ],
        es: [
          'Prever varios meses para la decisión',
          'La evaluación suele durar meses. Renueve el certificado ordinario con normalidad mientras tanto en lugar de dejar que se agote mientras espera.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fresh health examination for the permanent status',
          'A new certificate is required even for someone who has lived here for years, using the official form and the listed tests.',
        ],
        pt: [
          'Novo exame de saúde para o status permanente',
          'É exigido um certificado novo mesmo de quem já mora aqui há anos, no formulário oficial e com os exames listados.',
        ],
        es: [
          'Nuevo examen de salud para el estatus permanente',
          'Se exige un certificado nuevo incluso a quien lleva años viviendo aquí, en el formulario oficial y con las pruebas listadas.',
        ],
      },
      {
        en: [
          'Photograph for the permanent certificate card',
          'Supplied at lodgement, to the specification the service centre publishes.',
        ],
        pt: [
          'Fotografia para o cartão do certificado permanente',
          'Fornecida no protocolo, na especificação que o centro de atendimento publica.',
        ],
        es: [
          'Fotografía para la tarjeta del certificado permanente',
          'Se aporta al presentar, con la especificación que publica el centro de servicio.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Apply separately for the open work permit',
          'The permanent certificate by itself does not authorise employment. A separate permanent work permit is issued by the labour ministry, and holders who skip it are working unlawfully without realising.',
        ],
        pt: [
          'Pedir à parte a permissão de trabalho aberta',
          'O certificado permanente por si só não autoriza emprego. Uma permissão de trabalho permanente à parte é emitida pelo ministério do trabalho, e quem pula essa etapa trabalha irregularmente sem perceber.',
        ],
        es: [
          'Solicitar aparte el permiso de trabajo abierto',
          'El certificado permanente por sí solo no autoriza el empleo. El ministerio de trabajo emite un permiso de trabajo permanente aparte, y quien se lo salta trabaja de forma irregular sin darse cuenta.',
        ],
      },
      {
        en: [
          'Do not stay abroad past the annual absence limit',
          'The permanent status is revoked if you spend more than the permitted stretch outside the country in a year without prior approval. Ask for the absence permission before a long departure.',
        ],
        pt: [
          'Não permanecer no exterior além do limite anual de ausência',
          'O status permanente é revogado se você passar mais do que o período permitido fora do país num ano sem aprovação prévia. Peça a autorização de ausência antes de uma saída longa.',
        ],
        es: [
          'No permanecer en el extranjero más allá del límite anual de ausencia',
          'El estatus permanente se revoca si pasa fuera del país más del periodo permitido en un año sin aprobación previa. Pida la autorización de ausencia antes de una salida larga.',
        ],
      },
      {
        en: [
          'Renew the physical card on its own cycle',
          'The status has no expiry but the card does, and an expired card causes problems at banks and at the border even though your status is intact.',
        ],
        pt: [
          'Renovar o cartão físico no ciclo próprio dele',
          'O status não tem prazo, mas o cartão tem, e um cartão vencido causa problemas em bancos e na fronteira mesmo com o status intacto.',
        ],
        es: [
          'Renovar la tarjeta física en su propio ciclo',
          'El estatus no caduca pero la tarjeta sí, y una tarjeta caducada causa problemas en bancos y en la frontera aunque su estatus esté intacto.',
        ],
      },
      {
        en: [
          'Understand that this is not citizenship',
          'Permanent residents have no household registration and no vote. Naturalisation is a different process and normally requires giving up your original nationality.',
        ],
        pt: [
          'Entender que isto não é cidadania',
          'Residentes permanentes não têm registo domiciliar nem voto. A naturalização é um processo diferente e normalmente exige abrir mão da nacionalidade de origem.',
        ],
        es: [
          'Entender que esto no es la ciudadanía',
          'Los residentes permanentes no tienen registro domiciliario ni voto. La naturalización es un proceso distinto y normalmente exige renunciar a la nacionalidad de origen.',
        ],
        priority: 2,
      },
      {
        en: [
          'Keep the household address registration current',
          'The obligation to notify moves continues after permanence, and a stale address is a frequent cause of missed official correspondence.',
        ],
        pt: [
          'Manter atualizado o registo de morada domiciliar',
          'A obrigação de comunicar mudanças continua após a permanência, e um endereço desatualizado é causa frequente de correspondência oficial perdida.',
        ],
        es: [
          'Mantener al día el registro del domicilio',
          'La obligación de notificar mudanzas continúa tras la permanencia, y una dirección desactualizada es causa frecuente de correspondencia oficial perdida.',
        ],
        priority: 2,
      },
    ],
  },
};
