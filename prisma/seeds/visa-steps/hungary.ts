import type { CountryVisaSteps } from './types';

/**
 * Steps for Hungary.
 *
 * Hungarian immigration law was rewritten from the ground up and the new rules
 * took effect at the start of 2024: the number of residence titles was cut
 * sharply, several familiar categories disappeared, and guest worker permits
 * were deliberately built as a dead end that does not lead to settlement. Any
 * guide written before that rewrite is unreliable, and this is the single
 * biggest source of wrong expectations about Hungary.
 *
 * Almost everything runs through two channels: the Enter Hungary portal of the
 * immigration directorate for filings, and a consulate abroad for the first
 * application. Filing from inside the country on a tourist visa is not the
 * shortcut it is in some neighbouring states.
 *
 * After arrival the residence card is only half the job. Reporting your
 * accommodation to the authorities within three days, and holding an address
 * card, is what makes banking, healthcare and the tax number possible.
 */
export const hungary: CountryVisaSteps = {
  'Short-Stay Visa (Schengen Type C)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Valid for at least three months beyond the planned departure and issued within the last ten years.',
        ],
        pt: [
          'Passaporte válido',
          'Válido por pelo menos três meses além da saída prevista e emitido nos últimos dez anos.',
        ],
        es: [
          'Pasaporte vigente',
          'Vigente al menos tres meses más allá de la salida prevista y emitido en los últimos diez años.',
        ],
      },
      {
        en: [
          'Completed Schengen visa application form',
          'Filled in through the Hungarian consular service system and printed for the appointment; the data must match the passport exactly.',
        ],
        pt: [
          'Formulário de pedido de visto Schengen preenchido',
          'Preenchido no sistema do serviço consular húngaro e impresso para o atendimento; os dados precisam bater exatamente com o passaporte.',
        ],
        es: [
          'Formulario de solicitud de visado Schengen completado',
          'Rellenado en el sistema del servicio consular húngaro e impreso para la cita; los datos deben coincidir exactamente con el pasaporte.',
        ],
      },
      {
        en: [
          'Recent biometric photograph',
          'Taken within the last six months, on a light background, without glasses.',
        ],
        pt: [
          'Fotografia biométrica recente',
          'Tirada nos últimos seis meses, em fundo claro, sem óculos.',
        ],
        es: [
          'Fotografía biométrica reciente',
          'Tomada en los últimos seis meses, con fondo claro y sin gafas.',
        ],
      },
      {
        en: [
          'Travel itinerary and return ticket reservation',
          'A reservation is enough; buying the ticket before the visa is granted is a risk you take on yourself.',
        ],
        pt: [
          'Itinerário de viagem e reserva de passagem de volta',
          'A reserva basta; comprar a passagem antes da concessão do visto é um risco que você assume sozinho.',
        ],
        es: [
          'Itinerario de viaje y reserva de billete de vuelta',
          'Basta con la reserva; comprar el billete antes de la concesión del visado es un riesgo que asume usted.',
        ],
      },
      {
        en: [
          'Proof of accommodation in Hungary',
          'Hotel bookings for every night of the stay, or a lease if you are renting.',
        ],
        pt: [
          'Comprovativo de alojamento na Hungria',
          'Reservas de hotel para todas as noites da estada, ou contrato de aluguel se for alugar.',
        ],
        es: [
          'Comprobante de alojamiento en Hungría',
          'Reservas de hotel para todas las noches de la estancia, o contrato de alquiler si va a alquilar.',
        ],
      },
      {
        en: [
          'Travel medical insurance',
          'Minimum cover of 30,000 euros for the whole Schengen area, including repatriation.',
        ],
        pt: [
          'Seguro médico de viagem',
          'Cobertura mínima de 30 mil euros para todo o espaço Schengen, incluindo repatriamento.',
        ],
        es: [
          'Seguro médico de viaje',
          'Cobertura mínima de 30 mil euros para todo el espacio Schengen, incluida la repatriación.',
        ],
      },
      {
        en: [
          'Official letter of invitation, if you are staying with a host',
          'Hungary uses an invitation endorsed by the immigration authority, which the host obtains in Hungary. A plain letter written by a friend does not replace it.',
        ],
        pt: [
          'Carta convite oficial, se ficar na casa de um anfitrião',
          'A Hungria usa um convite chancelado pela autoridade de imigração, que o anfitrião obtém na Hungria. Uma carta simples escrita por um amigo não substitui.',
        ],
        es: [
          'Carta de invitación oficial, si se aloja con un anfitrión',
          'Hungría usa una invitación visada por la autoridad de inmigración, que el anfitrión obtiene en Hungría. Una carta simple escrita por un amigo no la sustituye.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of sufficient funds for each day of the stay',
          'A daily amount per person is set by decree and updated periodically; check the figure in force rather than an older number.',
        ],
        pt: [
          'Comprovação de recursos para cada dia da estada',
          'Um valor diário por pessoa é fixado por decreto e atualizado periodicamente; confira o valor vigente em vez de um número antigo.',
        ],
        es: [
          'Prueba de fondos para cada día de la estancia',
          'Un importe diario por persona se fija por decreto y se actualiza periódicamente; consulte la cifra vigente en lugar de un número antiguo.',
        ],
      },
      {
        en: [
          'Bank statements from the last six months',
          'Stamped by the bank. A balance that appears days before the application, with no history behind it, is a common reason for refusal.',
        ],
        pt: [
          'Extratos bancários dos últimos seis meses',
          'Carimbados pelo banco. Um saldo que aparece dias antes do pedido, sem histórico por trás, é motivo comum de recusa.',
        ],
        es: [
          'Extractos bancarios de los últimos seis meses',
          'Sellados por el banco. Un saldo que aparece días antes de la solicitud, sin historial detrás, es motivo frecuente de denegación.',
        ],
      },
      {
        en: [
          'Proof of ties that bring you home',
          'Employment letter with approved leave, company documents if self-employed, or proof of studies. The consulate is judging whether you will return.',
        ],
        pt: [
          'Comprovação de vínculos que trazem você de volta',
          'Carta do empregador com férias aprovadas, documentos da empresa se for autônomo, ou comprovante de estudos. O consulado está avaliando se você vai voltar.',
        ],
        es: [
          'Prueba de vínculos que le hacen volver',
          'Carta del empleador con vacaciones aprobadas, documentos de la empresa si trabaja por cuenta propia, o justificante de estudios. El consulado juzga si usted regresará.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Book an appointment at the consulate or visa centre',
          'Hungary represents and is represented by other Schengen states in several countries, so the office that takes your file may not be Hungarian.',
        ],
        pt: [
          'Agendar atendimento no consulado ou centro de vistos',
          'A Hungria representa e é representada por outros Estados Schengen em vários países, então o posto que recebe seu processo pode não ser húngaro.',
        ],
        es: [
          'Reservar cita en el consulado o centro de visados',
          'Hungría representa y es representada por otros Estados Schengen en varios países, así que la oficina que reciba su expediente puede no ser húngara.',
        ],
      },
      {
        en: [
          'Pay the Schengen visa fee',
          'The amount is set at Schengen level and is not refunded if the visa is refused. Reduced rates apply to certain nationalities under visa facilitation agreements.',
        ],
        pt: [
          'Pagar a taxa do visto Schengen',
          'O valor é definido em nível Schengen e não é devolvido em caso de recusa. Há tarifas reduzidas para certas nacionalidades por acordos de facilitação.',
        ],
        es: [
          'Pagar la tasa del visado Schengen',
          'El importe se fija a nivel Schengen y no se devuelve si deniegan el visado. Hay tarifas reducidas para ciertas nacionalidades por acuerdos de facilitación.',
        ],
      },
      {
        en: [
          'Submit the application inside the allowed window',
          'No earlier than six months before travel and, in practice, at least three weeks ahead; summer and December slots disappear early.',
        ],
        pt: [
          'Entregar o pedido dentro da janela permitida',
          'No máximo seis meses antes da viagem e, na prática, com pelo menos três semanas de antecedência; as vagas de verão e de dezembro somem cedo.',
        ],
        es: [
          'Presentar la solicitud dentro del plazo permitido',
          'Como mucho seis meses antes del viaje y, en la práctica, con al menos tres semanas de antelación; los huecos de verano y de diciembre se agotan pronto.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints and facial image',
          'Stored for 59 months across the Schengen system, so a recent application elsewhere may spare you this step.',
        ],
        pt: [
          'Impressões digitais e imagem facial',
          'Guardadas por 59 meses no sistema Schengen, então um pedido recente noutro país pode poupar você desta etapa.',
        ],
        es: [
          'Huellas dactilares e imagen facial',
          'Se conservan 59 meses en el sistema Schengen, así que una solicitud reciente en otro país puede ahorrarle este paso.',
        ],
      },
      {
        en: [
          'Medical examination',
          'Not required for a short-stay visa; only the travel insurance is checked.',
        ],
        pt: [
          'Exame médico',
          'Não é exigido em visto de curta duração; apenas o seguro de viagem é conferido.',
        ],
        es: [
          'Examen médico',
          'No se exige en visado de corta duración; solo se comprueba el seguro de viaje.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Check the visa sticker before leaving the counter',
          'Number of entries, validity window and days granted are frequently narrower than requested, and corrections are far easier on the spot.',
        ],
        pt: [
          'Conferir o adesivo do visto antes de sair do balcão',
          'Número de entradas, janela de validade e dias concedidos costumam ser menores que o pedido, e corrigir na hora é muito mais fácil.',
        ],
        es: [
          'Revisar la etiqueta del visado antes de salir del mostrador',
          'El número de entradas, la ventana de validez y los días concedidos suelen ser menores que lo solicitado, y corregirlo en el acto es mucho más fácil.',
        ],
      },
      {
        en: [
          'Respect the 90 days in any 180 rule',
          'Counted across the whole Schengen area on a rolling basis, not per country and not per visa.',
        ],
        pt: [
          'Respeitar a regra dos 90 dias em cada 180',
          'Contados em todo o espaço Schengen de forma móvel, não por país nem por visto.',
        ],
        es: [
          'Respetar la regla de 90 días en cada 180',
          'Se cuentan en todo el espacio Schengen de forma móvil, no por país ni por visado.',
        ],
      },
      {
        en: [
          'Report where you are staying within three days of arrival',
          'Third-country nationals must notify the accommodation address to the authorities. Hotels do it for you; a private flat or a friend’s place does not, and the host is the one legally on the hook.',
        ],
        pt: [
          'Informar onde está hospedado em até três dias da chegada',
          'Nacionais de países terceiros precisam comunicar o endereço de alojamento às autoridades. Hotéis fazem isso por você; um apartamento particular ou a casa de um amigo não, e o anfitrião é quem responde legalmente.',
        ],
        es: [
          'Comunicar dónde se aloja en los tres días siguientes a la llegada',
          'Los nacionales de terceros países deben notificar la dirección de alojamiento a las autoridades. Los hoteles lo hacen por usted; un piso particular o la casa de un amigo no, y el anfitrión es quien responde legalmente.',
        ],
      },
      {
        en: [
          'Do not count on switching status from inside Hungary',
          'Under the law in force since 2024, a residence permit is normally applied for at a consulate abroad. Arriving as a tourist and converting is the exception, not the plan.',
        ],
        pt: [
          'Não contar com a troca de status de dentro da Hungria',
          'Sob a lei em vigor desde 2024, a autorização de residência normalmente é pedida num consulado no exterior. Chegar como turista e converter é exceção, não plano.',
        ],
        es: [
          'No contar con cambiar de estatus desde dentro de Hungría',
          'Con la ley vigente desde 2024, el permiso de residencia se solicita normalmente en un consulado en el extranjero. Llegar como turista y convertir es la excepción, no el plan.',
        ],
      },
    ],
  },

  'White Card (Digital Nomad Residence Permit)': {
    core_documents: [
      {
        en: [
          'Passport covering the whole permit period',
          'The White Card is never issued for longer than the passport remains valid.',
        ],
        pt: [
          'Passaporte que cubra todo o período da autorização',
          'O White Card nunca é emitido por prazo maior que a validade do passaporte.',
        ],
        es: [
          'Pasaporte que cubra todo el periodo del permiso',
          'La White Card nunca se expide por más tiempo del que el pasaporte siga vigente.',
        ],
      },
      {
        en: [
          'Evidence that your work is entirely outside Hungary',
          'You must work remotely for a company registered abroad, or hold a share in one and draw income from it. Any Hungarian employer, client relationship or ownership stake disqualifies you.',
        ],
        pt: [
          'Prova de que seu trabalho é inteiramente fora da Hungria',
          'Você precisa trabalhar remotamente para empresa registada no exterior, ou ter participação numa e obter renda dela. Qualquer empregador húngaro, relação de cliente ou participação societária desqualifica.',
        ],
        es: [
          'Prueba de que su trabajo es enteramente fuera de Hungría',
          'Debe trabajar en remoto para una empresa registrada en el extranjero, o tener participación en una y obtener ingresos de ella. Cualquier empleador húngaro, relación de cliente o participación societaria le descalifica.',
        ],
      },
      {
        en: [
          'Employment contract or proof of shareholding abroad',
          'Dated, signed and showing that the work can be performed with information technology from anywhere.',
        ],
        pt: [
          'Contrato de trabalho ou prova de participação societária no exterior',
          'Datado, assinado e mostrando que o trabalho pode ser feito com tecnologia da informação de qualquer lugar.',
        ],
        es: [
          'Contrato de trabajo o prueba de participación societaria en el extranjero',
          'Fechado, firmado y que muestre que el trabajo puede realizarse con tecnología de la información desde cualquier lugar.',
        ],
      },
      {
        en: [
          'Application filed through the Enter Hungary portal',
          'The immigration directorate takes filings electronically; the consulate appointment confirms what was submitted online.',
        ],
        pt: [
          'Pedido protocolado pelo portal Enter Hungary',
          'A direção-geral de imigração recebe os pedidos eletronicamente; o atendimento consular confirma o que foi enviado online.',
        ],
        es: [
          'Solicitud presentada por el portal Enter Hungary',
          'La dirección general de inmigración recibe las solicitudes electrónicamente; la cita consular confirma lo enviado en línea.',
        ],
      },
      {
        en: [
          'Proof of a place to live in Hungary',
          'A lease, a property deed or a notarised statement from the owner. A hotel booking for a few nights is not accepted as accommodation for a residence permit.',
        ],
        pt: [
          'Comprovação de local para morar na Hungria',
          'Contrato de aluguel, escritura ou declaração autenticada do proprietário. Reserva de hotel por algumas noites não é aceita como alojamento para autorização de residência.',
        ],
        es: [
          'Prueba de un lugar donde vivir en Hungría',
          'Contrato de alquiler, escritura o declaración notarial del propietario. Una reserva de hotel de unas noches no se acepta como alojamiento para un permiso de residencia.',
        ],
      },
      {
        en: [
          'Declaration of the purpose of stay',
          'A written statement that you will not take up gainful activity in Hungary. Breaching it later is grounds for withdrawal of the permit.',
        ],
        pt: [
          'Declaração da finalidade da estada',
          'Uma declaração escrita de que você não exercerá atividade remunerada na Hungria. Descumpri-la depois é motivo de retirada da autorização.',
        ],
        es: [
          'Declaración de la finalidad de la estancia',
          'Una declaración escrita de que no ejercerá actividad lucrativa en Hungría. Incumplirla después es causa de retirada del permiso.',
        ],
      },
      {
        en: [
          'Clean criminal record certificate',
          'From your country of nationality and from anywhere you have lived recently, legalised or apostilled and translated.',
        ],
        pt: [
          'Certidão de antecedentes criminais',
          'Do país de nacionalidade e de onde você tenha morado recentemente, legalizada ou apostilada e traduzida.',
        ],
        es: [
          'Certificado de antecedentes penales',
          'Del país de nacionalidad y de donde haya vivido recientemente, legalizado o apostillado y traducido.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Monthly income above the threshold for the White Card',
          'A minimum monthly income is required for the six months before the application. The figure is set by decree and has been revised; confirm the amount in force.',
        ],
        pt: [
          'Renda mensal acima do piso do White Card',
          'Exige-se uma renda mensal mínima nos seis meses anteriores ao pedido. O valor é fixado por decreto e já foi revisto; confirme o montante vigente.',
        ],
        es: [
          'Ingresos mensuales por encima del umbral de la White Card',
          'Se exige un ingreso mensual mínimo en los seis meses anteriores a la solicitud. La cifra se fija por decreto y ha sido revisada; confirme el importe vigente.',
        ],
      },
      {
        en: [
          'Six months of bank statements showing the income arriving',
          'The consistency of the inflow matters more than the balance. One large transfer does not demonstrate remote income.',
        ],
        pt: [
          'Seis meses de extratos mostrando a renda entrando',
          'A regularidade da entrada pesa mais que o saldo. Uma única transferência grande não demonstra renda remota.',
        ],
        es: [
          'Seis meses de extractos que muestren la entrada de los ingresos',
          'La regularidad del ingreso pesa más que el saldo. Una sola transferencia grande no demuestra renta remota.',
        ],
      },
      {
        en: [
          'Health insurance valid in Hungary',
          'You are not covered by the national health system on this permit, so private cover for the full period is mandatory.',
        ],
        pt: [
          'Seguro de saúde válido na Hungria',
          'Você não é coberto pelo sistema nacional de saúde nesta autorização, então cobertura privada para todo o período é obrigatória.',
        ],
        es: [
          'Seguro de salud válido en Hungría',
          'No está cubierto por el sistema nacional de salud con este permiso, así que la cobertura privada para todo el periodo es obligatoria.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply at a Hungarian consulate abroad',
          'The White Card is designed to be requested from outside the country; applying from inside Hungary is only possible in narrow situations.',
        ],
        pt: [
          'Pedir num consulado húngaro no exterior',
          'O White Card foi desenhado para ser solicitado de fora do país; pedir de dentro da Hungria só é possível em situações restritas.',
        ],
        es: [
          'Solicitar en un consulado húngaro en el extranjero',
          'La White Card está pensada para pedirse desde fuera del país; solicitarla desde dentro de Hungría solo es posible en situaciones concretas.',
        ],
      },
      {
        en: [
          'Pay the procedural fee for the residence permit',
          'Charged in the consular currency at the appointment and not refunded if the application is rejected.',
        ],
        pt: [
          'Pagar a taxa de procedimento da autorização de residência',
          'Cobrada na moeda consular no atendimento e não devolvida se o pedido for indeferido.',
        ],
        es: [
          'Pagar la tasa de tramitación del permiso de residencia',
          'Se cobra en la moneda consular en la cita y no se devuelve si rechazan la solicitud.',
        ],
      },
      {
        en: [
          'Attend the personal interview',
          'Consular staff test whether the remote work story holds together; bring the contract and be able to explain what you actually do.',
        ],
        pt: [
          'Comparecer à entrevista pessoal',
          'A equipa consular testa se a história do trabalho remoto se sustenta; leve o contrato e saiba explicar o que você realmente faz.',
        ],
        es: [
          'Acudir a la entrevista personal',
          'El personal consular comprueba si la historia del trabajo remoto se sostiene; lleve el contrato y sepa explicar qué hace realmente.',
        ],
      },
      {
        en: [
          'Wait for approval before travelling',
          'On approval the consulate issues an entry visa to collect the card. Travelling on a tourist entry meanwhile does not speed anything up.',
        ],
        pt: [
          'Aguardar a aprovação antes de viajar',
          'Aprovado o pedido, o consulado emite um visto de entrada para retirar o cartão. Viajar como turista enquanto isso não acelera nada.',
        ],
        es: [
          'Esperar la aprobación antes de viajar',
          'Aprobada la solicitud, el consulado expide un visado de entrada para recoger la tarjeta. Viajar como turista mientras tanto no acelera nada.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric enrolment at the consulate',
          'Fingerprints and photograph are taken when the file is lodged, and the card is produced from them.',
        ],
        pt: [
          'Registo biométrico no consulado',
          'Impressões digitais e fotografia são recolhidas na entrega do processo, e o cartão é produzido a partir delas.',
        ],
        es: [
          'Registro biométrico en el consulado',
          'Las huellas y la fotografía se toman al presentar el expediente, y con ellas se produce la tarjeta.',
        ],
      },
      {
        en: [
          'Keep the insurance certificate current at all times',
          'It is checked again at extension, and a lapse in cover between the two dates is enough to lose the extension.',
        ],
        pt: [
          'Manter o certificado de seguro sempre vigente',
          'Ele é conferido de novo na prorrogação, e uma lacuna de cobertura entre as duas datas basta para perder a prorrogação.',
        ],
        es: [
          'Mantener el certificado de seguro siempre vigente',
          'Se comprueba de nuevo en la prórroga, y un vacío de cobertura entre ambas fechas basta para perderla.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Enter Hungary and collect the residence card',
          'The entry visa has a short validity; enter and present yourself to the immigration office within it or the approval lapses.',
        ],
        pt: [
          'Entrar na Hungria e retirar o cartão de residência',
          'O visto de entrada tem validade curta; entre e apresente-se ao serviço de imigração dentro dela ou a aprovação caduca.',
        ],
        es: [
          'Entrar en Hungría y recoger la tarjeta de residencia',
          'El visado de entrada tiene una validez corta; entre y preséntese en la oficina de inmigración dentro de ella o la aprobación caduca.',
        ],
      },
      {
        en: [
          'Register your address and obtain the address card',
          'The lakcímkártya is a separate document from the residence card and is what banks, mobile operators and clinics actually ask to see.',
        ],
        pt: [
          'Registar a morada e obter o cartão de endereço',
          'O lakcímkártya é um documento separado do cartão de residência e é o que bancos, operadoras e clínicas realmente pedem.',
        ],
        es: [
          'Registrar el domicilio y obtener la tarjeta de dirección',
          'La lakcímkártya es un documento aparte de la tarjeta de residencia y es lo que bancos, operadoras y clínicas piden en realidad.',
        ],
      },
      {
        en: [
          'Know that the White Card is a dead end for settlement',
          'It runs for one year and can be extended once. Time spent on it does not count towards permanent residence or naturalisation, so treat it as a stay, not a first step.',
        ],
        pt: [
          'Saber que o White Card é um beco sem saída para fixação',
          'Vale um ano e pode ser prorrogado uma vez. O tempo nele não conta para residência permanente nem naturalização, então trate-o como uma estada, não um primeiro passo.',
        ],
        es: [
          'Saber que la White Card es un callejón sin salida para asentarse',
          'Dura un año y puede prorrogarse una vez. El tiempo en ella no cuenta para la residencia permanente ni la naturalización, así que trátela como una estancia, no como un primer paso.',
        ],
      },
      {
        en: [
          'Bring family on their own derivative permit',
          'Spouse and minor children apply separately and inherit the same limits, including the ban on working in Hungary.',
        ],
        pt: [
          'Trazer a família com autorização derivada própria',
          'Cônjuge e filhos menores pedem separadamente e herdam os mesmos limites, inclusive a proibição de trabalhar na Hungria.',
        ],
        es: [
          'Traer a la familia con su propio permiso derivado',
          'Cónyuge e hijos menores solicitan por separado y heredan los mismos límites, incluida la prohibición de trabajar en Hungría.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'File the extension at least thirty days before expiry',
          'Late filing is treated as an unlawful stay, and there is no grace period built into the card.',
        ],
        pt: [
          'Protocolar a prorrogação pelo menos trinta dias antes do vencimento',
          'Pedir em atraso é tratado como permanência irregular, e o cartão não traz período de tolerância.',
        ],
        es: [
          'Presentar la prórroga al menos treinta días antes del vencimiento',
          'Presentarla tarde se trata como estancia irregular, y la tarjeta no incluye periodo de gracia.',
        ],
      },
      {
        en: [
          'Declare Hungarian tax residence if you cross the day count',
          'Staying long enough in a calendar year can make you tax resident regardless of where the income is paid; the immigration permit says nothing about tax.',
        ],
        pt: [
          'Declarar residência fiscal húngara se cruzar a contagem de dias',
          'Ficar tempo suficiente num ano civil pode torná-lo residente fiscal independentemente de onde a renda é paga; a autorização de imigração nada diz sobre imposto.',
        ],
        es: [
          'Declarar residencia fiscal húngara si supera el cómputo de días',
          'Permanecer suficiente tiempo en un año natural puede convertirle en residente fiscal sin importar dónde se paguen los ingresos; el permiso migratorio nada dice del impuesto.',
        ],
        priority: 2,
      },
    ],
  },

  'Residence Permit for Employment': {
    core_documents: [
      {
        en: [
          'Passport valid for the full requested period',
          'The permit is cut back to the passport expiry if the passport runs out first.',
        ],
        pt: [
          'Passaporte válido por todo o período solicitado',
          'A autorização é encurtada até o vencimento do passaporte se ele expirar antes.',
        ],
        es: [
          'Pasaporte vigente durante todo el periodo solicitado',
          'El permiso se recorta hasta la caducidad del pasaporte si este vence antes.',
        ],
      },
      {
        en: [
          'Single application covering residence and work',
          'Since the 2024 reform there is one combined procedure instead of a separate work permit and residence permit, and the employer drives most of it.',
        ],
        pt: [
          'Pedido único cobrindo residência e trabalho',
          'Desde a reforma de 2024 há um procedimento combinado em vez de autorização de trabalho e de residência separadas, e o empregador conduz a maior parte.',
        ],
        es: [
          'Solicitud única que cubre residencia y trabajo',
          'Desde la reforma de 2024 hay un procedimiento combinado en lugar de permiso de trabajo y de residencia separados, y el empleador lleva la mayor parte.',
        ],
      },
      {
        en: [
          'Employment contract with a Hungarian employer',
          'Signed, stating job title, working hours, salary and start date. The permit is tied to that employer and that role.',
        ],
        pt: [
          'Contrato de trabalho com empregador húngaro',
          'Assinado, com cargo, jornada, salário e data de início. A autorização fica vinculada a esse empregador e a essa função.',
        ],
        es: [
          'Contrato de trabajo con un empleador húngaro',
          'Firmado, con puesto, jornada, salario y fecha de inicio. El permiso queda vinculado a ese empleador y a ese puesto.',
        ],
      },
      {
        en: [
          'Employer’s vacancy notification to the labour authority',
          'The post must have been advertised to the domestic labour market first. Without that record the immigration file cannot be assessed.',
        ],
        pt: [
          'Comunicação da vaga pelo empregador à autoridade laboral',
          'A vaga precisa ter sido divulgada antes ao mercado de trabalho interno. Sem esse registo o processo de imigração não pode ser avaliado.',
        ],
        es: [
          'Comunicación del puesto por el empleador a la autoridad laboral',
          'El puesto debe haberse ofertado antes al mercado laboral interno. Sin ese registro el expediente migratorio no puede evaluarse.',
        ],
      },
      {
        en: [
          'Electronic filing through the immigration portal',
          'The employer or an authorised representative submits it; you sign a power of attorney so they can act for you.',
        ],
        pt: [
          'Protocolo eletrónico pelo portal de imigração',
          'O empregador ou um representante autorizado envia; você assina uma procuração para que possam atuar por você.',
        ],
        es: [
          'Presentación electrónica por el portal de inmigración',
          'El empleador o un representante autorizado la envía; usted firma un poder para que puedan actuar en su nombre.',
        ],
      },
      {
        en: [
          'Accommodation arranged before the decision',
          'Employers of guest workers are often required to provide or certify housing, and the address goes into the decision.',
        ],
        pt: [
          'Alojamento organizado antes da decisão',
          'Empregadores de trabalhadores convidados frequentemente precisam fornecer ou atestar a moradia, e o endereço entra na decisão.',
        ],
        es: [
          'Alojamiento resuelto antes de la resolución',
          'Los empleadores de trabajadores invitados a menudo deben proporcionar o certificar la vivienda, y la dirección consta en la resolución.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Diplomas and transcripts with official translation',
          'Translated by a recognised body; documents from abroad usually need an apostille as well.',
        ],
        pt: [
          'Diplomas e históricos com tradução oficial',
          'Traduzidos por entidade reconhecida; documentos estrangeiros geralmente precisam também de apostila.',
        ],
        es: [
          'Títulos y expedientes con traducción oficial',
          'Traducidos por un organismo reconocido; los documentos extranjeros suelen necesitar también apostilla.',
        ],
      },
      {
        en: [
          'Recognition of the qualification for regulated professions',
          'Healthcare, engineering, teaching and law require a formal recognition decision before you can be employed, and it takes months on its own.',
        ],
        pt: [
          'Reconhecimento da qualificação para profissões regulamentadas',
          'Saúde, engenharia, ensino e direito exigem uma decisão formal de reconhecimento antes da contratação, e isso leva meses por si só.',
        ],
        es: [
          'Reconocimiento de la titulación para profesiones reguladas',
          'Sanidad, ingeniería, docencia y derecho exigen una resolución formal de reconocimiento antes de poder ser contratado, y lleva meses por sí solo.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Salary at or above the level required for the category',
          'Minimum pay levels are tied to statutory wage figures that change every year; ask the employer to confirm the current one in writing.',
        ],
        pt: [
          'Salário igual ou acima do nível exigido para a categoria',
          'Os pisos remuneratórios estão atrelados a valores legais de salário que mudam todo ano; peça ao empregador para confirmar o vigente por escrito.',
        ],
        es: [
          'Salario igual o superior al nivel exigido para la categoría',
          'Los mínimos salariales están ligados a cifras legales que cambian cada año; pida al empleador que confirme la vigente por escrito.',
        ],
      },
      {
        en: [
          'Proof that you can support yourself on arrival',
          'Funds to cover the gap between landing and the first payday, which can be six weeks.',
        ],
        pt: [
          'Comprovação de que você se sustenta na chegada',
          'Recursos para cobrir o intervalo entre o desembarque e o primeiro pagamento, que pode chegar a seis semanas.',
        ],
        es: [
          'Prueba de que puede mantenerse al llegar',
          'Fondos para cubrir el intervalo entre la llegada y el primer pago, que puede ser de seis semanas.',
        ],
      },
      {
        en: [
          'Health cover until social insurance starts',
          'Public cover begins with employment registration, not with the permit; private insurance bridges the first weeks.',
        ],
        pt: [
          'Cobertura de saúde até a seguridade social começar',
          'A cobertura pública começa com o registo do vínculo, não com a autorização; o seguro privado cobre as primeiras semanas.',
        ],
        es: [
          'Cobertura sanitaria hasta que empiece la seguridad social',
          'La cobertura pública empieza con el alta laboral, no con el permiso; el seguro privado cubre las primeras semanas.',
        ],
      },
      {
        en: [
          'Pay the procedure fee for the combined permit',
          'Paid at filing; the employer often advances it but it is not refunded on refusal.',
        ],
        pt: [
          'Pagar a taxa do procedimento da autorização combinada',
          'Paga no protocolo; o empregador costuma adiantá-la, mas não é devolvida em caso de indeferimento.',
        ],
        es: [
          'Pagar la tasa del procedimiento del permiso combinado',
          'Se paga al presentar; el empleador suele adelantarla, pero no se devuelve si deniegan.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Lodge the first application at a consulate abroad',
          'The general rule since the reform is that the first residence title is applied for outside Hungary, with a limited list of exceptions.',
        ],
        pt: [
          'Apresentar o primeiro pedido num consulado no exterior',
          'A regra geral desde a reforma é que o primeiro título de residência seja pedido fora da Hungria, com uma lista restrita de exceções.',
        ],
        es: [
          'Presentar la primera solicitud en un consulado en el extranjero',
          'La regla general desde la reforma es que el primer título de residencia se solicite fuera de Hungría, con una lista limitada de excepciones.',
        ],
      },
      {
        en: [
          'Check the annual cap before committing to the job',
          'The government sets a yearly ceiling on guest worker admissions by decree. Once it is exhausted, applications wait for the next allocation regardless of merit.',
        ],
        pt: [
          'Verificar o teto anual antes de fechar com a vaga',
          'O governo fixa por decreto um limite anual de admissões de trabalhadores convidados. Esgotado o teto, os pedidos esperam a próxima cota independentemente do mérito.',
        ],
        es: [
          'Comprobar el cupo anual antes de comprometerse con el empleo',
          'El gobierno fija por decreto un techo anual de admisiones de trabajadores invitados. Agotado el cupo, las solicitudes esperan al siguiente reparto sin importar el mérito.',
        ],
      },
      {
        en: [
          'Appear in person for the consular appointment',
          'Even when the employer files electronically, you must attend to sign and give biometrics.',
        ],
        pt: [
          'Comparecer pessoalmente ao atendimento consular',
          'Mesmo quando o empregador protocola eletronicamente, você precisa comparecer para assinar e dar a biometria.',
        ],
        es: [
          'Acudir en persona a la cita consular',
          'Aunque el empleador presente electrónicamente, usted debe acudir a firmar y dar los datos biométricos.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints and facial image for the residence card',
          'Collected at the consulate; the card is manufactured centrally and collected in Hungary.',
        ],
        pt: [
          'Impressões digitais e imagem facial para o cartão de residência',
          'Recolhidas no consulado; o cartão é produzido centralmente e retirado na Hungria.',
        ],
        es: [
          'Huellas e imagen facial para la tarjeta de residencia',
          'Se recogen en el consulado; la tarjeta se fabrica de forma centralizada y se recoge en Hungría.',
        ],
      },
      {
        en: [
          'Occupational health examination before starting work',
          'Hungarian labour law requires an aptitude check by a company doctor before the first shift, repeated periodically. It surprises most newcomers.',
        ],
        pt: [
          'Exame de medicina do trabalho antes de começar',
          'A lei laboral húngara exige uma avaliação de aptidão por médico do trabalho antes do primeiro turno, repetida periodicamente. Surpreende quase todo recém-chegado.',
        ],
        es: [
          'Examen de medicina del trabajo antes de empezar',
          'La ley laboral húngara exige una evaluación de aptitud por el médico de empresa antes del primer turno, repetida periódicamente. Sorprende a casi todo recién llegado.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the tartózkodási engedély card',
          'Issued by the immigration directorate after you arrive; carry it, since identity checks are routine.',
        ],
        pt: [
          'Retirar o cartão tartózkodási engedély',
          'Emitido pela direção-geral de imigração após a chegada; ande com ele, pois as fiscalizações de identidade são rotina.',
        ],
        es: [
          'Recoger la tarjeta tartózkodási engedély',
          'La expide la dirección general de inmigración tras su llegada; llévela consigo, pues los controles de identidad son rutina.',
        ],
      },
      {
        en: [
          'Notify your accommodation address to the authority',
          'Within three days of moving in, and again every time you move. Failing to update it is a common reason for problems at renewal.',
        ],
        pt: [
          'Comunicar o endereço de alojamento à autoridade',
          'Em até três dias após a mudança, e novamente a cada mudança. Não atualizar é motivo comum de problemas na renovação.',
        ],
        es: [
          'Comunicar la dirección de alojamiento a la autoridad',
          'En los tres días siguientes a la mudanza, y de nuevo cada vez que se mude. No actualizarla es motivo frecuente de problemas en la renovación.',
        ],
      },
      {
        en: [
          'Get the tax identification number and the social security number',
          'The adóazonosító jel and the TAJ card come from two different offices and neither arrives automatically with the residence card.',
        ],
        pt: [
          'Obter o número de identificação fiscal e o de segurança social',
          'O adóazonosító jel e o cartão TAJ vêm de dois órgãos diferentes e nenhum chega automaticamente com o cartão de residência.',
        ],
        es: [
          'Obtener el número de identificación fiscal y el de seguridad social',
          'El adóazonosító jel y la tarjeta TAJ proceden de dos oficinas distintas y ninguno llega automáticamente con la tarjeta de residencia.',
        ],
      },
      {
        en: [
          'Report any change of employer immediately',
          'The permit covers one job. Leaving it without notifying the authority makes your stay unlawful within days, not months.',
        ],
        pt: [
          'Comunicar imediatamente qualquer troca de empregador',
          'A autorização cobre um emprego. Sair dele sem avisar a autoridade torna sua permanência irregular em dias, não em meses.',
        ],
        es: [
          'Comunicar de inmediato cualquier cambio de empleador',
          'El permiso cubre un empleo. Dejarlo sin avisar a la autoridad hace su estancia irregular en días, no en meses.',
        ],
      },
      {
        en: [
          'Understand where this permit leads before planning long term',
          'The 2024 law was written to keep guest work temporary: several employment titles have hard maximum durations and do not build towards permanent residence.',
        ],
        pt: [
          'Entender aonde esta autorização leva antes de planear a longo prazo',
          'A lei de 2024 foi escrita para manter o trabalho convidado temporário: vários títulos de emprego têm duração máxima rígida e não constroem caminho para a residência permanente.',
        ],
        es: [
          'Entender adónde lleva este permiso antes de planificar a largo plazo',
          'La ley de 2024 se redactó para mantener temporal el trabajo invitado: varios títulos de empleo tienen duración máxima estricta y no construyen camino hacia la residencia permanente.',
        ],
      },
      {
        en: [
          'Renew before expiry with proof of continuous employment',
          'Payslips and the employer’s declaration are checked; a gap in the record is what usually sinks a renewal.',
        ],
        pt: [
          'Renovar antes do vencimento com prova de emprego contínuo',
          'Holerites e a declaração do empregador são conferidos; uma lacuna no histórico é o que costuma derrubar a renovação.',
        ],
        es: [
          'Renovar antes del vencimiento con prueba de empleo continuo',
          'Se comprueban las nóminas y la declaración del empleador; un vacío en el historial es lo que suele hundir la renovación.',
        ],
      },
    ],
  },

  'Guest Investor Residence Permit': {
    core_documents: [
      {
        en: [
          'Passport with adequate remaining validity',
          'The guest investor title is issued for a long period, so a passport close to expiry forces an early renewal of the card.',
        ],
        pt: [
          'Passaporte com validade restante adequada',
          'O título de investidor convidado é emitido por período longo, então um passaporte perto de vencer força uma renovação antecipada do cartão.',
        ],
        es: [
          'Pasaporte con validez restante suficiente',
          'El título de inversor invitado se expide por un periodo largo, así que un pasaporte próximo a caducar obliga a renovar la tarjeta antes de tiempo.',
        ],
      },
      {
        en: [
          'Choose one of the qualifying investment routes',
          'Units in a real estate fund registered for the programme, purchase of residential property, or a donation to a higher education institution. The minimum for each is set by decree and differs sharply between them.',
        ],
        pt: [
          'Escolher uma das rotas de investimento qualificadas',
          'Cotas de fundo imobiliário registado para o programa, compra de imóvel residencial, ou doação a instituição de ensino superior. O mínimo de cada uma é fixado por decreto e varia muito entre elas.',
        ],
        es: [
          'Elegir una de las vías de inversión cualificadas',
          'Participaciones en un fondo inmobiliario registrado para el programa, compra de vivienda, o donación a una institución de educación superior. El mínimo de cada una se fija por decreto y difiere mucho entre ellas.',
        ],
      },
      {
        en: [
          'Obtain the guest investor visa first',
          'The programme runs in two stages: a visa that lets you enter and complete the investment, then the ten-year permit applied for from inside Hungary.',
        ],
        pt: [
          'Obter primeiro o visto de investidor convidado',
          'O programa corre em duas etapas: um visto que permite entrar e concluir o investimento, e depois a autorização de dez anos pedida de dentro da Hungria.',
        ],
        es: [
          'Obtener primero el visado de inversor invitado',
          'El programa consta de dos etapas: un visado que permite entrar y completar la inversión, y luego el permiso de diez años solicitado desde dentro de Hungría.',
        ],
      },
      {
        en: [
          'Certificate from the fund manager or the deed of purchase',
          'Issued by the entity approved for the programme. An investment made outside the approved structures does not qualify, however large.',
        ],
        pt: [
          'Certificado da gestora do fundo ou escritura de compra',
          'Emitido pela entidade aprovada para o programa. Um investimento feito fora das estruturas aprovadas não qualifica, por maior que seja.',
        ],
        es: [
          'Certificado de la gestora del fondo o escritura de compra',
          'Emitido por la entidad aprobada para el programa. Una inversión hecha fuera de las estructuras aprobadas no cualifica, por grande que sea.',
        ],
      },
      {
        en: [
          'Criminal record certificate and security screening',
          'Applicants are checked against national security criteria, and a refusal on those grounds is not reasoned or appealable in the usual way.',
        ],
        pt: [
          'Certidão criminal e triagem de segurança',
          'Os candidatos são verificados contra critérios de segurança nacional, e uma recusa por esse fundamento não é fundamentada nem recorrível da forma habitual.',
        ],
        es: [
          'Certificado de antecedentes y control de seguridad',
          'Se comprueba a los solicitantes con criterios de seguridad nacional, y una denegación por ese motivo no se motiva ni se recurre de la forma habitual.',
        ],
      },
      {
        en: [
          'Registered address in Hungary',
          'Even property investors must declare where they will actually live, and the address is recorded on the permit.',
        ],
        pt: [
          'Endereço registado na Hungria',
          'Mesmo investidores em imóveis precisam declarar onde vão morar de facto, e o endereço fica registado na autorização.',
        ],
        es: [
          'Domicilio registrado en Hungría',
          'Incluso los inversores inmobiliarios deben declarar dónde vivirán realmente, y la dirección consta en el permiso.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Complete the investment inside the deadline set by the visa',
          'The guest investor visa is short and single-purpose. If the money is not placed before it runs out, the whole application collapses.',
        ],
        pt: [
          'Concluir o investimento dentro do prazo do visto',
          'O visto de investidor convidado é curto e de finalidade única. Se o dinheiro não for aplicado antes de ele vencer, todo o pedido cai.',
        ],
        es: [
          'Completar la inversión dentro del plazo del visado',
          'El visado de inversor invitado es corto y de finalidad única. Si el dinero no se coloca antes de que venza, toda la solicitud se cae.',
        ],
      },
      {
        en: [
          'Documented lawful origin of the funds',
          'Bank trails, tax returns and sale contracts covering where the money came from. Anti-money-laundering review is the slowest part of the file.',
        ],
        pt: [
          'Origem lícita dos recursos documentada',
          'Rastros bancários, declarações fiscais e contratos de venda mostrando de onde veio o dinheiro. A análise antilavagem é a parte mais lenta do processo.',
        ],
        es: [
          'Origen lícito de los fondos documentado',
          'Rastros bancarios, declaraciones fiscales y contratos de venta que muestren de dónde salió el dinero. La revisión antiblanqueo es la parte más lenta del expediente.',
        ],
      },
      {
        en: [
          'Means of subsistence separate from the investment',
          'The invested capital is locked; you still have to show income or savings to live on.',
        ],
        pt: [
          'Meios de subsistência separados do investimento',
          'O capital investido fica bloqueado; ainda assim é preciso mostrar renda ou poupança para viver.',
        ],
        es: [
          'Medios de subsistencia aparte de la inversión',
          'El capital invertido queda inmovilizado; aun así hay que acreditar ingresos o ahorros para vivir.',
        ],
      },
      {
        en: [
          'Comprehensive health insurance for the holder and family',
          'Private cover valid in Hungary, since the permit itself does not enrol you in the public system.',
        ],
        pt: [
          'Seguro de saúde abrangente para o titular e a família',
          'Cobertura privada válida na Hungria, já que a autorização em si não inscreve você no sistema público.',
        ],
        es: [
          'Seguro de salud completo para el titular y la familia',
          'Cobertura privada válida en Hungría, ya que el permiso en sí no le inscribe en el sistema público.',
        ],
      },
      {
        en: [
          'Budget for the fees on top of the investment',
          'The programme carries its own procedural charges, plus fund subscription costs, notary and duty on property. Confirm the current schedule before transferring anything.',
        ],
        pt: [
          'Prever as taxas além do investimento',
          'O programa tem encargos processuais próprios, mais custos de subscrição do fundo, notário e imposto sobre o imóvel. Confirme a tabela vigente antes de transferir qualquer valor.',
        ],
        es: [
          'Presupuestar las tasas además de la inversión',
          'El programa tiene cargos de tramitación propios, más costes de suscripción del fondo, notario e impuesto sobre el inmueble. Confirme el cuadro vigente antes de transferir nada.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply at a consulate designated for the programme',
          'Not every Hungarian mission handles guest investor files; check which one covers your country before booking travel.',
        ],
        pt: [
          'Pedir num consulado designado para o programa',
          'Nem toda representação húngara trata processos de investidor convidado; verifique qual cobre o seu país antes de comprar viagem.',
        ],
        es: [
          'Solicitar en un consulado designado para el programa',
          'No todas las representaciones húngaras tramitan expedientes de inversor invitado; compruebe cuál cubre su país antes de reservar viaje.',
        ],
      },
      {
        en: [
          'File the permit request while the investor visa is still valid',
          'The second-stage application must be lodged in Hungary before the entry visa expires; there is no extension of that window.',
        ],
        pt: [
          'Protocolar o pedido da autorização com o visto de investidor ainda válido',
          'O pedido da segunda etapa precisa ser feito na Hungria antes de o visto de entrada vencer; essa janela não é prorrogada.',
        ],
        es: [
          'Presentar la solicitud del permiso con el visado de inversor aún vigente',
          'La solicitud de segunda etapa debe presentarse en Hungría antes de que caduque el visado de entrada; esa ventana no se prorroga.',
        ],
      },
      {
        en: [
          'Attend in person to sign the file',
          'Representation by a lawyer covers the paperwork but not the appearance, and family members appear too.',
        ],
        pt: [
          'Comparecer pessoalmente para assinar o processo',
          'A representação por advogado cobre a papelada mas não o comparecimento, e os familiares também comparecem.',
        ],
        es: [
          'Acudir en persona a firmar el expediente',
          'La representación por abogado cubre el papeleo pero no la comparecencia, y los familiares también acuden.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric capture for the guest investor card',
          'Fingerprints and photograph for every applicant over the age threshold, including accompanying family.',
        ],
        pt: [
          'Captura biométrica para o cartão de investidor convidado',
          'Impressões digitais e fotografia de cada requerente acima da idade mínima, incluindo a família acompanhante.',
        ],
        es: [
          'Captura biométrica para la tarjeta de inversor invitado',
          'Huellas y fotografía de cada solicitante por encima de la edad mínima, incluida la familia acompañante.',
        ],
      },
      {
        en: [
          'Keep private medical cover in place for the whole period',
          'It is verified at each renewal of the card, ten years apart, and a lapse cannot be repaired retroactively.',
        ],
        pt: [
          'Manter cobertura médica privada durante todo o período',
          'Ela é verificada a cada renovação do cartão, com dez anos de intervalo, e uma lacuna não pode ser reparada retroativamente.',
        ],
        es: [
          'Mantener cobertura médica privada durante todo el periodo',
          'Se verifica en cada renovación de la tarjeta, con diez años de diferencia, y un vacío no puede repararse retroactivamente.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the ten-year residence card',
          'It is one of the longest residence titles in the European Union and is renewable once for a further ten years.',
        ],
        pt: [
          'Retirar o cartão de residência de dez anos',
          'É um dos títulos de residência mais longos da União Europeia e é renovável uma vez por mais dez anos.',
        ],
        es: [
          'Recoger la tarjeta de residencia de diez años',
          'Es uno de los títulos de residencia más largos de la Unión Europea y es renovable una vez por diez años más.',
        ],
      },
      {
        en: [
          'Declare your Hungarian address to the district office',
          'The same three-day rule applies to investors as to everyone else, and the address card unlocks banking and utilities.',
        ],
        pt: [
          'Declarar o endereço húngaro na repartição distrital',
          'A mesma regra de três dias vale para investidores como para todos, e o cartão de endereço destrava banco e serviços.',
        ],
        es: [
          'Declarar su domicilio húngaro en la oficina de distrito',
          'La misma regla de tres días vale para los inversores que para todos, y la tarjeta de dirección desbloquea banca y suministros.',
        ],
      },
      {
        en: [
          'Hold the investment for the minimum period',
          'Selling the fund units or the property early is grounds for withdrawing the permit, and the holding period is counted from the date of acquisition, not the date of the card.',
        ],
        pt: [
          'Manter o investimento pelo período mínimo',
          'Vender as cotas do fundo ou o imóvel antes do prazo é motivo de retirada da autorização, e o período de manutenção conta da data da aquisição, não da data do cartão.',
        ],
        es: [
          'Mantener la inversión durante el periodo mínimo',
          'Vender las participaciones del fondo o el inmueble antes de tiempo es causa de retirada del permiso, y el periodo de tenencia cuenta desde la fecha de adquisición, no desde la de la tarjeta.',
        ],
      },
      {
        en: [
          'Add family members under the same title',
          'Spouse, minor children and dependent parents can be included, each with their own card and their own biometrics.',
        ],
        pt: [
          'Incluir familiares sob o mesmo título',
          'Cônjuge, filhos menores e pais dependentes podem ser incluídos, cada um com cartão e biometria próprios.',
        ],
        es: [
          'Incluir familiares bajo el mismo título',
          'Cónyuge, hijos menores y padres dependientes pueden incluirse, cada uno con su tarjeta y su biometría.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Do not expect a fast track to a Hungarian passport',
          'The investment buys residence, not citizenship. Naturalisation still requires many years of actual residence, a constitutional studies exam and Hungarian language ability.',
        ],
        pt: [
          'Não esperar via rápida para o passaporte húngaro',
          'O investimento compra residência, não cidadania. A naturalização continua exigindo muitos anos de residência efetiva, exame de estudos constitucionais e domínio do húngaro.',
        ],
        es: [
          'No esperar una vía rápida al pasaporte húngaro',
          'La inversión compra residencia, no ciudadanía. La naturalización sigue exigiendo muchos años de residencia efectiva, un examen de estudios constitucionales y dominio del húngaro.',
        ],
      },
      {
        en: [
          'Track how the programme rules change',
          'The routes and their thresholds have already been amended since launch, including the addition and repricing of the property option. Rules at renewal may not be the rules at entry.',
        ],
        pt: [
          'Acompanhar como as regras do programa mudam',
          'As rotas e seus limiares já foram alterados desde o lançamento, incluindo a inclusão e a reprecificação da opção imobiliária. As regras na renovação podem não ser as da entrada.',
        ],
        es: [
          'Seguir cómo cambian las reglas del programa',
          'Las vías y sus umbrales ya se han modificado desde el lanzamiento, incluida la incorporación y el reajuste de la opción inmobiliaria. Las reglas en la renovación pueden no ser las de la entrada.',
        ],
        priority: 2,
      },
    ],
  },
};
