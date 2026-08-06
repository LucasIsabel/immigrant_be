import type { CountryVisaSteps } from './types';

/**
 * Steps for China.
 *
 * Nothing about a work move starts with the applicant. The Chinese employer
 * first obtains the work permit notification through the foreigners work
 * management system; only with that letter in hand can a Z visa be lodged at
 * all. Someone trying to assemble a case at a consulate has the order inverted.
 *
 * Arrival is a chain of short, unforgiving deadlines: registration at the local
 * police station within a couple of days — automatic if you are in a hotel, a
 * personal errand if you rent — a medical examination at a designated Chinese
 * facility, and the conversion of the Z visa into a residence permit within
 * thirty days. Miss the conversion and the Z visa simply expires, turning a
 * lawful arrival into an overstay.
 *
 * Permanent residence exists but is granted through a closed list of narrow
 * categories and is famously hard to obtain; it is also not a route to a
 * Chinese passport, since dual nationality is not recognised.
 */
export const china: CountryVisaSteps = {
  'Tourist Visa (L)': {
    core_documents: [
      {
        en: [
          'Valid passport with blank visa pages',
          'Consulates want validity well beyond the trip and at least two blank facing pages; a full or damaged passport is turned away at the counter.',
        ],
        pt: [
          'Passaporte válido com páginas em branco',
          'Os consulados exigem validade bem além da viagem e ao menos duas páginas em branco lado a lado; passaporte cheio ou danificado é recusado no balcão.',
        ],
        es: [
          'Pasaporte vigente con páginas en blanco',
          'Los consulados exigen validez bastante posterior al viaje y al menos dos páginas en blanco enfrentadas; un pasaporte lleno o dañado se rechaza en ventanilla.',
        ],
      },
      {
        en: [
          'Printed and signed online application form',
          'The form is completed on the official portal and printed; corrections made by hand on the printout invalidate it and force a fresh submission.',
        ],
        pt: [
          'Formulário online impresso e assinado',
          'O formulário é preenchido no portal oficial e impresso; correções feitas à mão na via impressa a invalidam e obrigam a refazer o envio.',
        ],
        es: [
          'Formulario en línea impreso y firmado',
          'El formulario se completa en el portal oficial y se imprime; las correcciones hechas a mano sobre la copia impresa la invalidan y obligan a rehacer el envío.',
        ],
      },
      {
        en: [
          'Photograph to the Chinese specification',
          'White background, ears and eyebrows visible, no glasses. Photos accepted by other countries are routinely rejected here and reprinted on the spot.',
        ],
        pt: [
          'Fotografia no padrão chinês',
          'Fundo branco, orelhas e sobrancelhas visíveis, sem óculos. Fotos aceitas por outros países são recusadas com frequência aqui e refeitas na hora.',
        ],
        es: [
          'Fotografía según la norma china',
          'Fondo blanco, orejas y cejas visibles, sin gafas. Las fotos que aceptan otros países se rechazan a menudo aquí y hay que repetirlas allí mismo.',
        ],
      },
      {
        en: [
          'Return flight and hotel bookings for the entire stay',
          'Every night has to be accounted for, and the dates must match the itinerary declared on the form.',
        ],
        pt: [
          'Reservas de voo de volta e de hotel para toda a estadia',
          'Cada noite precisa estar coberta, e as datas devem bater com o itinerário declarado no formulário.',
        ],
        es: [
          'Reservas de vuelo de vuelta y de hotel para toda la estancia',
          'Cada noche debe estar cubierta, y las fechas tienen que coincidir con el itinerario declarado en el formulario.',
        ],
      },
      {
        en: [
          'Copies of previous Chinese visas and old passports',
          'Anyone who has held one before must show it; leaving a past stay out of the file reads as concealment rather than forgetfulness.',
        ],
        pt: [
          'Cópias de vistos chineses anteriores e de passaportes antigos',
          'Quem já teve um precisa apresentá-lo; omitir uma estadia passada soa como ocultação, não como esquecimento.',
        ],
        es: [
          'Copias de visados chinos anteriores y de pasaportes antiguos',
          'Quien ya tuvo uno debe presentarlo; omitir una estancia pasada suena a ocultación y no a olvido.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Invitation letter from a host in China',
          'Needed when a person or company receives you, with their identity document or business licence attached; a private host takes the place of hotel bookings.',
        ],
        pt: [
          'Carta-convite de um anfitrião na China',
          'Necessária quando uma pessoa ou empresa recebe você, com documento de identidade ou licença comercial anexados; anfitrião particular substitui as reservas de hotel.',
        ],
        es: [
          'Carta de invitación de un anfitrión en China',
          'Se exige cuando una persona o empresa le recibe, con su documento de identidad o licencia comercial adjuntos; el anfitrión particular sustituye a las reservas de hotel.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Bank statements for the recent months',
          'The balance should plausibly cover the trip; a large deposit made days before applying draws more suspicion than a modest balance.',
        ],
        pt: [
          'Extratos bancários dos últimos meses',
          'O saldo deve cobrir a viagem de forma plausível; um depósito alto feito dias antes do pedido levanta mais suspeita do que um saldo modesto.',
        ],
        es: [
          'Extractos bancarios de los últimos meses',
          'El saldo debe cubrir el viaje de forma plausible; un depósito elevado hecho días antes de solicitar levanta más sospecha que un saldo modesto.',
        ],
      },
      {
        en: [
          'Proof of ties to your country of residence',
          'An employer letter, enrolment record or property document showing you have reason to go back. Young applicants without ties are the most refused group.',
        ],
        pt: [
          'Comprovação de vínculos com o país onde você mora',
          'Carta do empregador, matrícula ou documento de imóvel mostrando que você tem motivo para voltar. Jovens sem vínculos são o grupo mais recusado.',
        ],
        es: [
          'Prueba de arraigo en su país de residencia',
          'Carta del empleador, matrícula o documento de propiedad que muestre que tiene motivos para volver. Los jóvenes sin arraigo son el grupo más denegado.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Book an appointment at the visa application centre',
          'In most countries applications go through the service centre rather than the consulate, by appointment only; turning up without a slot wastes the trip.',
        ],
        pt: [
          'Agendar horário no centro de pedidos de visto',
          'Na maioria dos países os pedidos passam pelo centro de serviços, não pelo consulado, e só com agendamento; aparecer sem horário desperdiça a viagem.',
        ],
        es: [
          'Reservar cita en el centro de solicitud de visados',
          'En la mayoría de los países las solicitudes pasan por el centro de servicios y no por el consulado, solo con cita; presentarse sin ella malgasta el viaje.',
        ],
      },
      {
        en: [
          'Pay the visa fee at the counter',
          'Rates follow reciprocity, so they differ by nationality and by number of entries. Confirm the tariff in force and the accepted payment method beforehand.',
        ],
        pt: [
          'Pagar a taxa do visto no balcão',
          'Os valores seguem reciprocidade, variando por nacionalidade e número de entradas. Confirme antes a tabela vigente e a forma de pagamento aceita.',
        ],
        es: [
          'Pagar la tasa del visado en ventanilla',
          'Los importes siguen la reciprocidad, así que varían por nacionalidad y número de entradas. Confirme antes la tarifa vigente y el medio de pago aceptado.',
        ],
      },
      {
        en: [
          'Choose between standard and expedited handling',
          'Express and rush options cost more and are not always available; standard processing runs several working days.',
        ],
        pt: [
          'Escolher entre atendimento padrão e acelerado',
          'As opções expressa e urgente custam mais e nem sempre estão disponíveis; o prazo padrão leva vários dias úteis.',
        ],
        es: [
          'Elegir entre tramitación estándar y acelerada',
          'Las opciones exprés y urgente cuestan más y no siempre están disponibles; el plazo estándar tarda varios días hábiles.',
        ],
      },
      {
        en: [
          'Collect the passport once the decision is made',
          'Picked up with the receipt or sent by courier. The passport stays at the centre throughout, so do not book other travel in that window.',
        ],
        pt: [
          'Retirar o passaporte após a decisão',
          'Retirado com o recibo ou enviado por transportadora. O passaporte fica no centro durante todo o período, então não marque outra viagem nessa janela.',
        ],
        es: [
          'Recoger el pasaporte una vez resuelto',
          'Se retira con el resguardo o se envía por mensajería. El pasaporte queda en el centro todo ese tiempo, así que no reserve otro viaje en esa ventana.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprint collection at the centre',
          'Applies to most applicants between fourteen and seventy and has to be done in person, so a third party cannot lodge the file for you.',
        ],
        pt: [
          'Coleta de impressões digitais no centro',
          'Vale para a maioria dos requerentes entre catorze e setenta anos e precisa ser presencial, então um terceiro não pode protocolar por você.',
        ],
        es: [
          'Toma de huellas en el centro',
          'Se aplica a la mayoría de los solicitantes entre catorce y setenta años y debe hacerse en persona, así que un tercero no puede presentar el expediente por usted.',
        ],
      },
      {
        en: [
          'Travel medical insurance for the trip',
          'Not demanded for this category, but foreigners pay upfront at Chinese hospitals and the international clinics used by visitors are expensive.',
        ],
        pt: [
          'Seguro médico de viagem',
          'Não é exigido nesta categoria, mas estrangeiros pagam antecipado nos hospitais chineses e as clínicas internacionais usadas por visitantes são caras.',
        ],
        es: [
          'Seguro médico de viaje',
          'No se exige en esta categoría, pero los extranjeros pagan por adelantado en los hospitales chinos y las clínicas internacionales que usan los visitantes son caras.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Enter before the date printed on the visa',
          'The visa carries an enter-before date and, separately, a duration of stay per entry. Reading one as the other is the classic way to overstay.',
        ],
        pt: [
          'Entrar antes da data impressa no visto',
          'O visto traz uma data limite de entrada e, à parte, uma duração de permanência por entrada. Confundir as duas é a forma clássica de ficar irregular.',
        ],
        es: [
          'Entrar antes de la fecha impresa en el visado',
          'El visado lleva una fecha límite de entrada y, aparte, una duración de estancia por entrada. Confundir una con otra es la forma clásica de excederse.',
        ],
      },
      {
        en: [
          'Have your address registered with the police after arrival',
          'Hotels file it at check-in, but anyone staying in a rental or a private home must go to the station within a day or two, and again after each re-entry.',
        ],
        pt: [
          'Ter o endereço registrado na polícia após a chegada',
          'Hotéis fazem isso no check-in, mas quem fica em imóvel alugado ou casa de conhecidos precisa ir à delegacia em um ou dois dias, e de novo a cada reentrada.',
        ],
        es: [
          'Registrar su domicilio en la policía tras la llegada',
          'Los hoteles lo tramitan al hacer el check-in, pero quien se aloja en un alquiler o en casa particular debe acudir a comisaría en uno o dos días, y otra vez tras cada reentrada.',
        ],
      },
      {
        en: [
          'Do not take up work or study on this status',
          'Even unpaid work or a short course breaches the category and is grounds for a fine, detention and removal.',
        ],
        pt: [
          'Não trabalhar nem estudar com este status',
          'Mesmo trabalho não remunerado ou um curso curto viola a categoria e é motivo para multa, detenção e retirada do país.',
        ],
        es: [
          'No trabajar ni estudiar con este estatus',
          'Incluso el trabajo no remunerado o un curso corto incumple la categoría y es motivo de multa, detención y expulsión.',
        ],
      },
      {
        en: [
          'Request an extension before the stay expires',
          'The exit-entry administration handles extensions and expects several days notice; asking on the last permitted day generally fails.',
        ],
        pt: [
          'Pedir prorrogação antes de a permanência vencer',
          'A administração de entrada e saída cuida das prorrogações e espera vários dias de antecedência; pedir no último dia permitido em geral não funciona.',
        ],
        es: [
          'Solicitar la prórroga antes de que venza la estancia',
          'La administración de entradas y salidas gestiona las prórrogas y espera varios días de antelación; pedirla el último día permitido casi nunca prospera.',
        ],
        priority: 2,
      },
    ],
  },

  'Work Visa (Z) and Residence Permit': {
    core_documents: [
      {
        en: [
          'Work permit notification obtained by the employer',
          'The Chinese employer applies for it online before anything else. Without this letter the visa cannot even be lodged, and there is no way to begin the process on your own.',
        ],
        pt: [
          'Notificação de permissão de trabalho obtida pelo empregador',
          'O empregador chinês a solicita online antes de qualquer outra coisa. Sem essa carta o visto nem pode ser protocolado, e não há como iniciar o processo por conta própria.',
        ],
        es: [
          'Notificación de permiso de trabajo obtenida por el empleador',
          'El empleador chino la solicita en línea antes que cualquier otra cosa. Sin esa carta el visado ni siquiera puede presentarse, y no hay forma de empezar el trámite por su cuenta.',
        ],
      },
      {
        en: [
          'Passport with a year of remaining validity',
          'Consulates refuse documents close to expiry because the residence permit issued later cannot outlast the passport it is placed in.',
        ],
        pt: [
          'Passaporte com um ano de validade restante',
          'Os consulados recusam documentos perto do vencimento porque a autorização de residência emitida depois não pode durar mais que o passaporte onde é colada.',
        ],
        es: [
          'Pasaporte con un año de validez restante',
          'Los consulados rechazan documentos cercanos a caducar porque el permiso de residencia que se emite después no puede durar más que el pasaporte donde se coloca.',
        ],
      },
      {
        en: [
          'Application form completed on the official portal',
          'Filled online, then printed and signed by hand. Declaring an employer or job title different from the notification letter stops the file at the counter.',
        ],
        pt: [
          'Formulário preenchido no portal oficial',
          'Preenchido online, depois impresso e assinado à mão. Declarar empregador ou cargo diferente do que consta na carta de notificação trava o processo no balcão.',
        ],
        es: [
          'Formulario completado en el portal oficial',
          'Se rellena en línea, luego se imprime y se firma a mano. Declarar un empleador o puesto distinto del de la carta de notificación detiene el expediente en ventanilla.',
        ],
      },
      {
        en: [
          'Employment contract with the Chinese entity',
          'Job title, salary and workplace must match the permit application exactly; amending any of them afterwards means redoing the permit from the start.',
        ],
        pt: [
          'Contrato de trabalho com a entidade chinesa',
          'Cargo, salário e local de trabalho precisam bater exatamente com o pedido da permissão; alterar qualquer um depois significa refazer a permissão do zero.',
        ],
        es: [
          'Contrato de trabajo con la entidad china',
          'Puesto, salario y centro de trabajo deben coincidir exactamente con la solicitud del permiso; cambiar cualquiera después obliga a rehacer el permiso desde cero.',
        ],
      },
      {
        en: [
          'Criminal record certificate covering recent years',
          'Issued by every country you lived in recently, and it expires quickly — obtaining it too early in the process means paying for it twice.',
        ],
        pt: [
          'Certidão de antecedentes criminais dos últimos anos',
          'Emitida por cada país onde você morou recentemente, e com validade curta — tirá-la cedo demais no processo significa pagar por ela duas vezes.',
        ],
        es: [
          'Certificado de antecedentes penales de los últimos años',
          'Emitido por cada país donde vivió recientemente, y caduca rápido: obtenerlo demasiado pronto en el proceso significa pagarlo dos veces.',
        ],
      },
      {
        en: [
          'Apostille or consular legalisation of foreign documents',
          'China joined the Apostille Convention in 2023, so many papers no longer need consular legalisation — but only from member states, and the receiving province decides what it accepts.',
        ],
        pt: [
          'Apostila ou legalização consular dos documentos estrangeiros',
          'A China aderiu à Convenção da Apostila em 2023, então muitos papéis dispensam legalização consular — mas só vindos de países membros, e a província receptora decide o que aceita.',
        ],
        es: [
          'Apostilla o legalización consular de los documentos extranjeros',
          'China se adhirió al Convenio de la Apostilla en 2023, así que muchos papeles ya no necesitan legalización consular, pero solo desde estados miembros, y la provincia receptora decide qué acepta.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Degree certificate authenticated for use in China',
          'Authenticated through the apostille route or a Chinese embassy; a diploma verified only in your home country is rejected at the permit stage.',
        ],
        pt: [
          'Diploma autenticado para uso na China',
          'Autenticado pela via da apostila ou por embaixada chinesa; diploma verificado apenas no país de origem é recusado na etapa da permissão.',
        ],
        es: [
          'Título autenticado para su uso en China',
          'Autenticado por la vía de la apostilla o por una embajada china; un título verificado solo en el país de origen se rechaza en la etapa del permiso.',
        ],
      },
      {
        en: [
          'Two years of relevant experience after graduating',
          'Proved with reference letters on letterhead carrying contact details, which the authorities do call to verify.',
        ],
        pt: [
          'Dois anos de experiência relevante após a formatura',
          'Comprovada com cartas de referência em papel timbrado e com contatos, para os quais as autoridades de fato ligam para conferir.',
        ],
        es: [
          'Dos años de experiencia relevante tras titularse',
          'Se acredita con cartas de referencia en papel membretado y con datos de contacto, a los que las autoridades sí llaman para comprobar.',
        ],
      },
      {
        en: [
          'Teaching qualification for language teaching roles',
          'Teaching posts add a recognised certificate and, in most provinces, nationality and degree restrictions that no employer can waive.',
        ],
        pt: [
          'Certificação docente para vagas de ensino de idiomas',
          'Vagas de ensino somam um certificado reconhecido e, na maioria das províncias, restrições de nacionalidade e de diploma que nenhum empregador pode dispensar.',
        ],
        es: [
          'Certificación docente para puestos de enseñanza de idiomas',
          'Los puestos docentes suman un certificado reconocido y, en la mayoría de las provincias, restricciones de nacionalidad y titulación que ningún empleador puede eximir.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Salary meeting the threshold of the permit category',
          'The classification scores pay against the local average wage, which differs by city and is revised yearly; confirm the figure in force for the province.',
        ],
        pt: [
          'Salário que atinja o piso da categoria da permissão',
          'A classificação pontua a remuneração contra o salário médio local, que varia por cidade e é revisado todo ano; confirme o valor vigente na província.',
        ],
        es: [
          'Salario que alcance el umbral de la categoría del permiso',
          'La clasificación puntúa la retribución frente al salario medio local, que varía por ciudad y se revisa cada año; confirme la cifra vigente en la provincia.',
        ],
      },
      {
        en: [
          'Funds for the first months before payroll starts',
          'Housing deposits and the wait for a Chinese bank account mean the first salary often lands well after you have already been paying for things.',
        ],
        pt: [
          'Recursos para os primeiros meses antes de entrar na folha',
          'Depósitos de aluguel e a espera pela conta bancária chinesa fazem o primeiro salário cair bem depois de você já estar pagando contas.',
        ],
        es: [
          'Fondos para los primeros meses antes de entrar en nómina',
          'Las fianzas de vivienda y la espera por la cuenta bancaria china hacen que el primer salario llegue bastante después de que ya esté pagando gastos.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Employer files the permit application in the online system',
          'This is the substantive stage and takes weeks; anything wrong surfaces here, long before a consulate ever sees the file.',
        ],
        pt: [
          'Empregador protocola o pedido da permissão no sistema online',
          'Esta é a etapa de mérito e leva semanas; qualquer erro aparece aqui, muito antes de um consulado ver o processo.',
        ],
        es: [
          'El empleador presenta la solicitud del permiso en el sistema en línea',
          'Esta es la etapa de fondo y lleva semanas; cualquier error aflora aquí, mucho antes de que un consulado vea el expediente.',
        ],
      },
      {
        en: [
          'Lodge the Z visa application at the visa centre',
          'Presented with the notification letter, by appointment, through the service centre rather than directly at the consulate in most countries.',
        ],
        pt: [
          'Protocolar o pedido do visto Z no centro de vistos',
          'Apresentado com a carta de notificação, com hora marcada, pelo centro de serviços e não diretamente no consulado na maioria dos países.',
        ],
        es: [
          'Presentar la solicitud del visado Z en el centro de visados',
          'Se entrega con la carta de notificación, con cita previa, por el centro de servicios y no directamente en el consulado en la mayoría de los países.',
        ],
      },
      {
        en: [
          'Pay the fee and pick the processing speed',
          'The tariff depends on nationality under reciprocity rules and is revised; check the current schedule for your country before going to the counter.',
        ],
        pt: [
          'Pagar a taxa e escolher a velocidade de processamento',
          'A tabela depende da nacionalidade por regras de reciprocidade e é revisada; confira os valores atuais para o seu país antes de ir ao balcão.',
        ],
        es: [
          'Pagar la tasa y elegir la velocidad de tramitación',
          'La tarifa depende de la nacionalidad por reglas de reciprocidad y se revisa; consulte el importe actual para su país antes de ir a la ventanilla.',
        ],
      },
      {
        en: [
          'Enter China inside the Z visa validity',
          'It is a single entry document that expires a few months after issue and only authorises the short stay in which the residence permit has to be arranged.',
        ],
        pt: [
          'Entrar na China dentro da validade do visto Z',
          'É documento de entrada única, vence poucos meses após a emissão e só autoriza a estadia curta em que a autorização de residência precisa ser providenciada.',
        ],
        es: [
          'Entrar en China dentro de la validez del visado Z',
          'Es un documento de entrada única, caduca pocos meses tras su emisión y solo autoriza la estancia corta en la que hay que gestionar el permiso de residencia.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints taken at the visa application centre',
          'Required in person from most applicants; using an agent to submit the paperwork does not remove this step.',
        ],
        pt: [
          'Impressões digitais colhidas no centro de pedidos',
          'Exigidas presencialmente da maioria dos requerentes; usar um despachante para entregar os papéis não elimina esta etapa.',
        ],
        es: [
          'Huellas tomadas en el centro de solicitudes',
          'Se exigen en persona a la mayoría de los solicitantes; usar un gestor para entregar los papeles no elimina este paso.',
        ],
      },
      {
        en: [
          'Medical examination at an approved Chinese facility',
          'Blood tests, chest X-ray and an ECG at a designated centre after arrival. Examinations done abroad are frequently rejected and have to be repeated locally.',
        ],
        pt: [
          'Exame médico em unidade chinesa aprovada',
          'Exames de sangue, raio-X de tórax e eletrocardiograma em centro designado após a chegada. Exames feitos no exterior costumam ser recusados e precisam ser refeitos ali.',
        ],
        es: [
          'Examen médico en un centro chino autorizado',
          'Análisis de sangre, radiografía de tórax y electrocardiograma en un centro designado tras la llegada. Los exámenes hechos en el extranjero suelen rechazarse y hay que repetirlos allí.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Register with the local police within the first days',
          'A hotel does it automatically at check-in, but anyone renting must go to the station in person with the lease and the landlord, and repeat it after every trip abroad.',
        ],
        pt: [
          'Registrar-se na polícia local nos primeiros dias',
          'O hotel faz isso sozinho no check-in, mas quem aluga precisa ir à delegacia pessoalmente com o contrato e o proprietário, e repetir depois de cada viagem ao exterior.',
        ],
        es: [
          'Registrarse en la policía local en los primeros días',
          'El hotel lo hace solo al hacer el check-in, pero quien alquila debe ir a comisaría en persona con el contrato y el propietario, y repetirlo tras cada viaje al extranjero.',
        ],
      },
      {
        en: [
          'Collect the physical work permit card',
          'Issued by the local bureau after arrival and required as an input to the residence permit application, so delay here delays everything after it.',
        ],
        pt: [
          'Retirar o cartão físico da permissão de trabalho',
          'Emitido pelo órgão local após a chegada e exigido como insumo do pedido de residência, então atraso aqui atrasa tudo o que vem depois.',
        ],
        es: [
          'Recoger la tarjeta física del permiso de trabajo',
          'La emite la oficina local tras la llegada y se exige como insumo de la solicitud de residencia, así que un retraso aquí retrasa todo lo posterior.',
        ],
      },
      {
        en: [
          'Convert the Z visa into a residence permit within thirty days',
          'Miss the window and the Z visa simply expires, turning a lawful arrival into an overstay with fines and trouble at the airport on the way out.',
        ],
        pt: [
          'Converter o visto Z em autorização de residência em até trinta dias',
          'Perder o prazo faz o visto Z simplesmente vencer, transformando uma chegada regular em permanência irregular, com multas e problema no aeroporto na saída.',
        ],
        es: [
          'Convertir el visado Z en permiso de residencia en treinta días',
          'Perder el plazo hace que el visado Z caduque sin más, convirtiendo una llegada legal en una estancia irregular, con multas y problemas en el aeropuerto al salir.',
        ],
      },
      {
        en: [
          'Tell the authorities when the job or the address changes',
          'The permit is tied to one employer and one home; resigning ends it, and the replacement has to be arranged before the current one lapses.',
        ],
        pt: [
          'Avisar as autoridades quando mudar de emprego ou de endereço',
          'A autorização está atrelada a um empregador e a uma moradia; pedir demissão a encerra, e a substituta precisa ser providenciada antes de a atual caducar.',
        ],
        es: [
          'Avisar a las autoridades al cambiar de empleo o de domicilio',
          'El permiso está ligado a un empleador y a una vivienda; renunciar lo extingue, y el sustituto debe gestionarse antes de que caduque el actual.',
        ],
      },
      {
        en: [
          'Open a bank account linked to a Chinese mobile number',
          'Daily life runs on mobile payments tied to a local account and number, and cash is refused often enough to matter.',
        ],
        pt: [
          'Abrir conta bancária vinculada a um número de celular chinês',
          'O dia a dia roda sobre pagamentos por celular ligados a conta e número locais, e dinheiro em espécie é recusado com frequência suficiente para atrapalhar.',
        ],
        es: [
          'Abrir una cuenta bancaria vinculada a un móvil chino',
          'La vida diaria funciona con pagos por móvil atados a una cuenta y un número locales, y el efectivo se rechaza con bastante frecuencia.',
        ],
        priority: 2,
      },
    ],
  },

  'Talent Visa (R)': {
    core_documents: [
      {
        en: [
          'Confirmation letter for high-end foreign talent',
          'Issued by the competent Chinese authority to the inviting institution, never to you. There is no way to self-nominate into this category.',
        ],
        pt: [
          'Carta de confirmação de talento estrangeiro de alto nível',
          'Emitida pela autoridade chinesa competente à instituição convidante, nunca a você. Não existe autoindicação nesta categoria.',
        ],
        es: [
          'Carta de confirmación de talento extranjero de alto nivel',
          'La emite la autoridad china competente a la institución que invita, nunca a usted. No existe la autopostulación en esta categoría.',
        ],
      },
      {
        en: [
          'Passport valid for the whole intended stay',
          'The permit granted afterwards can run for several years, so a document near expiry caps what you are actually given.',
        ],
        pt: [
          'Passaporte válido por toda a permanência pretendida',
          'A autorização concedida depois pode durar vários anos, então um documento perto de vencer limita o que você realmente recebe.',
        ],
        es: [
          'Pasaporte válido para toda la estancia prevista',
          'El permiso que se concede después puede durar varios años, así que un documento próximo a caducar limita lo que realmente le otorgan.',
        ],
      },
      {
        en: [
          'Visa form quoting the confirmation reference',
          'The application asks for the number of the talent letter; leaving it blank drops your file into the ordinary work queue and loses the fast track.',
        ],
        pt: [
          'Formulário de visto citando o número da confirmação',
          'O pedido solicita o número da carta de talento; deixá-lo em branco joga o processo na fila comum de trabalho e perde a via rápida.',
        ],
        es: [
          'Formulario de visado que cite el número de la confirmación',
          'La solicitud pide el número de la carta de talento; dejarlo en blanco lanza el expediente a la cola ordinaria de trabajo y pierde la vía rápida.',
        ],
      },
      {
        en: [
          'Evidence of international recognition in your field',
          'Prizes, patents, senior appointments or publications. The assessment is documentary, so a reputation that is not on paper counts for nothing.',
        ],
        pt: [
          'Comprovação de reconhecimento internacional na sua área',
          'Prêmios, patentes, cargos de liderança ou publicações. A avaliação é documental, então reputação que não está no papel não vale nada.',
        ],
        es: [
          'Prueba de reconocimiento internacional en su campo',
          'Premios, patentes, cargos de dirección o publicaciones. La evaluación es documental, así que una reputación que no está en papel no cuenta.',
        ],
      },
      {
        en: [
          'Agreement with the receiving Chinese institution',
          'The institution carries the sponsorship and is who the authorities hold responsible; swapping it later restarts the assessment from the beginning.',
        ],
        pt: [
          'Acordo com a instituição chinesa receptora',
          'A instituição carrega o patrocínio e é quem as autoridades responsabilizam; trocá-la depois reinicia a avaliação do começo.',
        ],
        es: [
          'Acuerdo con la institución china receptora',
          'La institución asume el patrocinio y es a quien las autoridades responsabilizan; cambiarla después reinicia la evaluación desde el principio.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Doctorate or an equivalent senior qualification',
          'Legalised the same way as any other foreign diploma; several profiles qualify on achievement instead, so this is one route in rather than the only one.',
        ],
        pt: [
          'Doutorado ou qualificação sênior equivalente',
          'Legalizado como qualquer outro diploma estrangeiro; vários perfis qualificam por realização em vez disso, então este é um caminho de entrada, não o único.',
        ],
        es: [
          'Doctorado o titulación sénior equivalente',
          'Legalizado igual que cualquier otro título extranjero; varios perfiles califican por logros en su lugar, así que esta es una vía de entrada y no la única.',
        ],
        required: false,
      },
      {
        en: [
          'Record of years in a leading position',
          'Seniority is scored as heavily as the diploma, so an employment history with unexplained gaps costs points where it is tightest.',
        ],
        pt: [
          'Histórico de anos em posição de liderança',
          'A senioridade pontua tanto quanto o diploma, então um histórico profissional com lacunas sem explicação custa pontos justamente onde aperta.',
        ],
        es: [
          'Historial de años en un puesto de dirección',
          'La antigüedad puntúa tanto como el título, así que un historial laboral con huecos sin explicar cuesta puntos justo donde más aprieta.',
        ],
      },
      {
        en: [
          'Points assessment under the talent classification',
          'Applicants are sorted into tiers A, B and C on salary, age, education and Chinese language; only the top tier opens this route.',
        ],
        pt: [
          'Avaliação por pontos na classificação de talentos',
          'Os requerentes são separados nos níveis A, B e C por salário, idade, formação e domínio do chinês; só o topo abre esta rota.',
        ],
        es: [
          'Evaluación por puntos en la clasificación de talento',
          'Los solicitantes se ordenan en los niveles A, B y C por salario, edad, formación y dominio del chino; solo el nivel superior abre esta vía.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Pay set as a multiple of the local average wage',
          'The multiple is defined provincially and revised every year, so confirm the figure in force where the institution sits rather than a number quoted online.',
        ],
        pt: [
          'Remuneração fixada como múltiplo do salário médio local',
          'O múltiplo é definido por província e revisado todo ano, então confirme o valor vigente onde a instituição fica, e não um número citado na internet.',
        ],
        es: [
          'Retribución fijada como múltiplo del salario medio local',
          'El múltiplo lo define cada provincia y se revisa cada año, así que confirme la cifra vigente donde está la institución y no un número citado en internet.',
        ],
      },
      {
        en: [
          'Exemption from the pay test for recognised achievement',
          'Certain prizes, patents and national programmes qualify regardless of what the job pays, which is the whole point of the category.',
        ],
        pt: [
          'Dispensa do teste de remuneração por realização reconhecida',
          'Certos prêmios, patentes e programas nacionais qualificam independentemente do que o cargo paga, e é justamente esse o sentido da categoria.',
        ],
        es: [
          'Exención de la prueba retributiva por logros reconocidos',
          'Ciertos premios, patentes y programas nacionales califican con independencia de lo que pague el puesto, que es justo el sentido de la categoría.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Institution files the talent application online',
          'Handled through the foreigners work management system, where the authorities commit to a shorter review than for ordinary permits.',
        ],
        pt: [
          'Instituição protocola o pedido de talento online',
          'Feito pelo sistema de gestão do trabalho de estrangeiros, onde as autoridades assumem prazo de análise menor que o das permissões comuns.',
        ],
        es: [
          'La institución presenta la solicitud de talento en línea',
          'Se tramita por el sistema de gestión del trabajo de extranjeros, donde las autoridades asumen un plazo de revisión menor que el de los permisos ordinarios.',
        ],
      },
      {
        en: [
          'Lodge the R visa request with priority handling',
          'Presented at the visa centre with the confirmation letter; it jumps ahead of the ordinary queue but still needs a booked appointment.',
        ],
        pt: [
          'Protocolar o pedido do visto R com tratamento prioritário',
          'Apresentado no centro de vistos com a carta de confirmação; passa na frente da fila comum, mas ainda exige horário agendado.',
        ],
        es: [
          'Presentar la solicitud del visado R con trato prioritario',
          'Se entrega en el centro de visados con la carta de confirmación; adelanta a la cola ordinaria, pero sigue necesitando cita reservada.',
        ],
      },
      {
        en: [
          'Check the entries and validity actually granted',
          'This category can carry multiple entries and long validity, but what you received is printed on the visa, and travelling on an assumption strands you outside.',
        ],
        pt: [
          'Conferir as entradas e a validade efetivamente concedidas',
          'Esta categoria pode vir com múltiplas entradas e validade longa, mas o que você recebeu está impresso no visto, e viajar por suposição deixa você preso fora do país.',
        ],
        es: [
          'Comprobar las entradas y la validez realmente concedidas',
          'Esta categoría puede traer múltiples entradas y validez larga, pero lo concedido está impreso en el visado, y viajar por suposición le deja fuera del país.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints recorded when the request is filed',
          'Taken in person at the centre; the fast-track treatment shortens the review but does not waive this.',
        ],
        pt: [
          'Impressões digitais registradas na entrega do pedido',
          'Colhidas presencialmente no centro; o tratamento acelerado encurta a análise, mas não dispensa isso.',
        ],
        es: [
          'Huellas registradas al presentar la solicitud',
          'Se toman en persona en el centro; el trato acelerado acorta la revisión, pero no exime de esto.',
        ],
      },
      {
        en: [
          'Health certificate from a designated hospital',
          'Needed for the residence permit stage after arrival and issued only by an approved facility, so foreign results are usually not accepted.',
        ],
        pt: [
          'Atestado de saúde de hospital designado',
          'Necessário na etapa da residência após a chegada e emitido só por unidade aprovada, então resultados estrangeiros em geral não são aceitos.',
        ],
        es: [
          'Certificado de salud de un hospital designado',
          'Se necesita en la etapa de residencia tras la llegada y solo lo emite un centro autorizado, así que los resultados extranjeros no suelen aceptarse.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Report to the police station covering your home',
          'Within days of arriving, and again each time you move or re-enter the country. A hotel only covers the nights actually spent in the hotel.',
        ],
        pt: [
          'Apresentar-se à delegacia da área onde você mora',
          'Em poucos dias após chegar, e de novo a cada mudança ou reentrada no país. O hotel só cobre as noites de fato passadas nele.',
        ],
        es: [
          'Presentarse en la comisaría de su zona de residencia',
          'A los pocos días de llegar, y otra vez con cada mudanza o reentrada al país. El hotel solo cubre las noches pasadas realmente en él.',
        ],
      },
      {
        en: [
          'Exchange the visa for a residence permit within thirty days',
          'Talent permits can be issued for up to five years, but only if the exchange happens inside the window; after it the visa is dead and the stay is irregular.',
        ],
        pt: [
          'Trocar o visto por autorização de residência em até trinta dias',
          'Autorizações de talento podem sair por até cinco anos, mas só se a troca ocorrer dentro do prazo; passado ele o visto morre e a permanência fica irregular.',
        ],
        es: [
          'Canjear el visado por permiso de residencia en treinta días',
          'Los permisos de talento pueden emitirse hasta por cinco años, pero solo si el canje ocurre dentro del plazo; pasado este el visado muere y la estancia queda irregular.',
        ],
      },
      {
        en: [
          'Arrange accompanying permits for your family',
          'Spouse and children receive matching residence permits that let them live in China but do not by themselves authorise work.',
        ],
        pt: [
          'Providenciar autorizações de acompanhantes para a família',
          'Cônjuge e filhos recebem autorizações de residência equivalentes, que permitem morar na China mas não autorizam trabalhar por si só.',
        ],
        es: [
          'Gestionar los permisos de acompañante para su familia',
          'Cónyuge e hijos reciben permisos de residencia equivalentes, que permiten vivir en China pero no autorizan trabajar por sí mismos.',
        ],
      },
      {
        en: [
          'Track the years that count towards permanent residence',
          'This is one of the few realistic routes to the green card, and the count rests on continuous residence and an unbroken tax record.',
        ],
        pt: [
          'Acompanhar os anos que contam para a residência permanente',
          'Esta é uma das poucas rotas realistas ao green card, e a contagem se apoia em residência contínua e histórico fiscal sem falhas.',
        ],
        es: [
          'Llevar la cuenta de los años que valen para la residencia permanente',
          'Esta es una de las pocas vías realistas a la green card, y el cómputo se apoya en residencia continua y un historial fiscal sin lagunas.',
        ],
        priority: 2,
      },
    ],
  },

  'Permanent Residence': {
    core_documents: [
      {
        en: [
          'Valid passport and current residence permit',
          'The application is made from inside China while lawfully resident; it cannot be lodged from abroad or during a gap between permits.',
        ],
        pt: [
          'Passaporte válido e autorização de residência atual',
          'O pedido é feito de dentro da China, com residência regular; não pode ser protocolado do exterior nem durante um intervalo entre autorizações.',
        ],
        es: [
          'Pasaporte vigente y permiso de residencia actual',
          'La solicitud se hace desde dentro de China, con residencia regular; no puede presentarse desde el extranjero ni durante un hueco entre permisos.',
        ],
      },
      {
        en: [
          'Identify which qualifying category applies to you',
          'The list is closed — investment, senior employment, family reunion and notable contribution — and partly meeting several of them does not add up to meeting one.',
        ],
        pt: [
          'Identificar qual categoria de qualificação se aplica a você',
          'A lista é fechada — investimento, emprego sênior, reunião familiar e contribuição notável — e cumprir parcialmente várias delas não equivale a cumprir uma.',
        ],
        es: [
          'Identificar qué categoría de calificación le aplica',
          'La lista es cerrada — inversión, empleo sénior, reagrupación familiar y contribución notable — y cumplir en parte varias de ellas no equivale a cumplir una.',
        ],
      },
      {
        en: [
          'Application form for the permanent resident status',
          'Filed at the exit-entry administration of the province where you are registered, not at the ministry in Beijing, and each province adds its own document list.',
        ],
        pt: [
          'Formulário de pedido do status de residente permanente',
          'Protocolado na administração de entrada e saída da província onde você está registrado, não no ministério em Pequim, e cada província acrescenta sua própria lista.',
        ],
        es: [
          'Formulario de solicitud del estatus de residente permanente',
          'Se presenta en la administración de entradas y salidas de la provincia donde está registrado, no en el ministerio en Pekín, y cada provincia añade su propia lista.',
        ],
      },
      {
        en: [
          'Non-criminal record from China and from abroad',
          'Both are required, the foreign one legalised, and both carry short validity windows that often expire during the long review, so expect to reissue them.',
        ],
        pt: [
          'Certidão negativa criminal da China e do exterior',
          'As duas são exigidas, a estrangeira legalizada, e ambas têm validade curta que costuma vencer durante a longa análise, então conte em tirá-las de novo.',
        ],
        es: [
          'Certificado de antecedentes de China y del extranjero',
          'Se exigen ambos, el extranjero legalizado, y los dos tienen validez corta que suele caducar durante la larga revisión, así que cuente con volver a pedirlos.',
        ],
      },
      {
        en: [
          'Marriage and birth certificates for family-based routes',
          'The family route counts years married and years actually lived in China, both documented year by year rather than asserted.',
        ],
        pt: [
          'Certidões de casamento e nascimento nas rotas familiares',
          'A rota familiar conta anos de casamento e anos realmente vividos na China, ambos comprovados ano a ano e não apenas afirmados.',
        ],
        es: [
          'Certificados de matrimonio y nacimiento en las vías familiares',
          'La vía familiar cuenta años de matrimonio y años realmente vividos en China, ambos acreditados año por año y no solo afirmados.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Recommendation from your employer or a state body',
          'The talent and contribution routes rest on an institution putting its name behind you, which in practice is the real bottleneck.',
        ],
        pt: [
          'Recomendação do seu empregador ou de um órgão estatal',
          'As rotas de talento e contribuição dependem de uma instituição pôr o nome dela por você, e na prática esse é o verdadeiro gargalo.',
        ],
        es: [
          'Recomendación de su empleador o de un organismo estatal',
          'Las vías de talento y contribución dependen de que una institución ponga su nombre por usted, y en la práctica ese es el verdadero cuello de botella.',
        ],
        priority: 2,
        required: false,
      },
    ],
    education: [
      {
        en: [
          'Authenticated senior qualification for the talent route',
          'Held to the same legalisation standard as at the work permit stage, and a diploma accepted years ago may have to be authenticated again.',
        ],
        pt: [
          'Qualificação sênior autenticada para a rota de talento',
          'Sujeita ao mesmo padrão de legalização da etapa da permissão de trabalho, e um diploma aceito anos atrás pode ter de ser autenticado de novo.',
        ],
        es: [
          'Titulación sénior autenticada para la vía de talento',
          'Sujeta al mismo estándar de legalización que en la etapa del permiso de trabajo, y un título aceptado hace años puede tener que autenticarse otra vez.',
        ],
        required: false,
      },
      {
        en: [
          'Evidence of contribution recognised inside China',
          'National awards, official appointments or achievements documented by a Chinese authority; importance you declare about yourself carries no weight.',
        ],
        pt: [
          'Comprovação de contribuição reconhecida dentro da China',
          'Prêmios nacionais, nomeações oficiais ou realizações documentadas por autoridade chinesa; relevância que você mesmo declara não tem peso algum.',
        ],
        es: [
          'Prueba de contribución reconocida dentro de China',
          'Premios nacionales, nombramientos oficiales o logros documentados por una autoridad china; la importancia que usted mismo declara no tiene ningún peso.',
        ],
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Four consecutive years of qualifying employment',
          'Counted with a minimum number of months physically in the country each year, so a long posting abroad silently resets the clock back to zero.',
        ],
        pt: [
          'Quatro anos consecutivos de emprego qualificado',
          'Contados com um mínimo de meses fisicamente no país a cada ano, então uma missão longa no exterior zera a contagem silenciosamente.',
        ],
        es: [
          'Cuatro años consecutivos de empleo calificado',
          'Se cuentan con un mínimo de meses físicamente en el país cada año, así que una estancia larga fuera reinicia el cómputo en silencio.',
        ],
      },
      {
        en: [
          'Income tax records matching the salary you declared',
          'A gap between the pay used for the work permit and the tax actually withheld is one of the most common reasons a file fails.',
        ],
        pt: [
          'Registros de imposto de renda coerentes com o salário declarado',
          'Uma divergência entre a remuneração usada na permissão de trabalho e o imposto de fato retido é um dos motivos mais comuns de o processo cair.',
        ],
        es: [
          'Registros del impuesto sobre la renta acordes al salario declarado',
          'Un desajuste entre la retribución usada para el permiso de trabajo y el impuesto realmente retenido es uno de los motivos más comunes de rechazo.',
        ],
      },
      {
        en: [
          'Investment held for consecutive years without withdrawal',
          'The investment route needs a stable audited holding across the whole qualifying period; taking money out midway breaks it. Confirm the amount currently required in that province.',
        ],
        pt: [
          'Investimento mantido por anos consecutivos sem retirada',
          'A rota de investimento exige participação estável e auditada por todo o período qualificante; sacar no meio a quebra. Confirme o valor exigido hoje naquela província.',
        ],
        es: [
          'Inversión mantenida años consecutivos sin retiradas',
          'La vía de inversión exige una participación estable y auditada durante todo el periodo; sacar dinero a mitad la rompe. Confirme el importe exigido hoy en esa provincia.',
        ],
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'File with the provincial exit-entry administration',
          'Only the public security authority where you are registered will take it, and a file assembled for another province is sent back rather than forwarded.',
        ],
        pt: [
          'Protocolar na administração provincial de entrada e saída',
          'Só a autoridade de segurança pública onde você está registrado aceita, e um processo montado para outra província é devolvido em vez de encaminhado.',
        ],
        es: [
          'Presentar ante la administración provincial de entradas y salidas',
          'Solo la autoridad de seguridad pública donde está registrado lo admite, y un expediente armado para otra provincia se devuelve en lugar de reenviarse.',
        ],
      },
      {
        en: [
          'Pay the application and the card issuance charges',
          'They are charged separately, the second only once approval comes through; confirm both current amounts rather than budgeting from an old figure.',
        ],
        pt: [
          'Pagar as taxas de análise e de emissão do cartão',
          'São cobradas em separado, a segunda só depois de sair a aprovação; confirme os dois valores atuais em vez de orçar por um número antigo.',
        ],
        es: [
          'Pagar las tasas de solicitud y de emisión de la tarjeta',
          'Se cobran por separado, la segunda solo cuando llega la aprobación; confirme ambos importes vigentes en vez de presupuestar con una cifra antigua.',
        ],
      },
      {
        en: [
          'Expect a review measured in many months',
          'The file goes up to the Ministry of Public Security for approval, there is no published service standard, and the grant rate is famously low.',
        ],
        pt: [
          'Contar com uma análise medida em muitos meses',
          'O processo sobe ao Ministério da Segurança Pública para aprovação, não há prazo de atendimento publicado, e a taxa de concessão é notoriamente baixa.',
        ],
        es: [
          'Contar con una revisión medida en muchos meses',
          'El expediente sube al Ministerio de Seguridad Pública para su aprobación, no hay plazo de atención publicado, y la tasa de concesión es notoriamente baja.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints and photograph for the identity card',
          'Taken at the exit-entry administration for the foreign permanent resident card, separately from anything given earlier at a visa centre.',
        ],
        pt: [
          'Impressões digitais e foto para o cartão de identidade',
          'Colhidas na administração de entrada e saída para o cartão de residente permanente estrangeiro, à parte do que já foi dado antes num centro de vistos.',
        ],
        es: [
          'Huellas y fotografía para la tarjeta de identidad',
          'Se toman en la administración de entradas y salidas para la tarjeta de residente permanente extranjero, aparte de lo entregado antes en un centro de visados.',
        ],
      },
      {
        en: [
          'Medical certificate from a designated Chinese hospital',
          'Issued only by an approved facility, and it ages quickly relative to how long the decision takes, so timing it wrong means repeating it.',
        ],
        pt: [
          'Atestado médico de hospital chinês designado',
          'Emitido só por unidade aprovada, e envelhece rápido diante do tempo que a decisão leva, então errar o momento significa refazê-lo.',
        ],
        es: [
          'Certificado médico de un hospital chino designado',
          'Lo emite solo un centro autorizado, y caduca rápido frente al tiempo que tarda la decisión, así que equivocar el momento obliga a repetirlo.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the foreign permanent resident identity card',
          'The current version is machine readable and works for trains, hotels, banking and mobile payments, which earlier cards notoriously did not.',
        ],
        pt: [
          'Retirar o cartão de identidade de residente permanente estrangeiro',
          'A versão atual é legível por máquina e funciona em trens, hotéis, bancos e pagamentos por celular, o que as versões anteriores notoriamente não faziam.',
        ],
        es: [
          'Recoger la tarjeta de identidad de residente permanente extranjero',
          'La versión actual es legible por máquina y sirve para trenes, hoteles, bancos y pagos por móvil, cosa que las anteriores notoriamente no hacían.',
        ],
      },
      {
        en: [
          'Keep the minimum physical presence in the country',
          'Dropping below the required time in China can end the status; it rewards actually living there and does not survive being away indefinitely.',
        ],
        pt: [
          'Manter a presença física mínima no país',
          'Ficar abaixo do tempo exigido na China pode encerrar o status; ele premia morar de fato lá e não sobrevive a ausências indefinidas.',
        ],
        es: [
          'Mantener la presencia física mínima en el país',
          'Bajar del tiempo exigido en China puede extinguir el estatus; premia vivir allí de verdad y no sobrevive a ausencias indefinidas.',
        ],
      },
      {
        en: [
          'Renew the card before it expires',
          'Adults renew on a long cycle and minors far more often; the status itself is open-ended, but the plastic in your pocket is not.',
        ],
        pt: [
          'Renovar o cartão antes do vencimento',
          'Adultos renovam num ciclo longo e menores bem mais vezes; o status em si é por prazo indeterminado, mas o plástico no bolso não é.',
        ],
        es: [
          'Renovar la tarjeta antes de que caduque',
          'Los adultos renuevan en un ciclo largo y los menores mucho más seguido; el estatus en sí es indefinido, pero el plástico del bolsillo no lo es.',
        ],
      },
      {
        en: [
          'Do not treat this as a step towards citizenship',
          'China does not recognise dual nationality and naturalisation is rare; taking it would mean giving up the passport you already hold.',
        ],
        pt: [
          'Não tratar isso como um passo rumo à cidadania',
          'A China não reconhece dupla nacionalidade e a naturalização é rara; obtê-la significaria abrir mão do passaporte que você já tem.',
        ],
        es: [
          'No tomar esto como un paso hacia la ciudadanía',
          'China no reconoce la doble nacionalidad y la naturalización es rara; obtenerla implicaría renunciar al pasaporte que ya tiene.',
        ],
        priority: 2,
      },
    ],
  },
};
