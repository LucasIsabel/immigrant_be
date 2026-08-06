import type { CountryVisaSteps } from './types';

/**
 * Steps for Greece.
 *
 * Two numbers govern ordinary life long before any residence card arrives: the
 * AFM, the tax number without which you cannot sign a lease, open an account or
 * buy anything of value, and the AMKA, the social security number that unlocks
 * healthcare. They are issued by different bodies and neither comes with the
 * visa.
 *
 * The golden visa was rewritten in 2024. The property floor is now tiered by
 * area, with the highest level in Attica, Thessaloniki and the popular islands
 * and a lower one elsewhere, and the reform added a minimum surface rule and a
 * ban on letting the qualifying property short term.
 *
 * Residence permits are not decided in Athens by default: the file goes to the
 * immigration directorate of the region where you live, and the blue receipt it
 * issues is what keeps you legal during the months the card takes.
 */
export const greece: CountryVisaSteps = {
  'Short-Stay Visa (Schengen Type C)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Valid for at least three months after the planned departure, issued within the last ten years and with two blank pages.',
        ],
        pt: [
          'Passaporte válido',
          'Válido por pelo menos três meses após a saída prevista, emitido nos últimos dez anos e com duas páginas em branco.',
        ],
        es: [
          'Pasaporte vigente',
          'Vigente al menos tres meses tras la salida prevista, emitido en los últimos diez años y con dos páginas en blanco.',
        ],
      },
      {
        en: [
          'Signed Schengen application form',
          'One form per traveller, including minors, each signed by the applicant or by both parents for a child.',
        ],
        pt: [
          'Formulário Schengen assinado',
          'Um formulário por viajante, incluindo menores, assinado pelo requerente ou pelos dois progenitores no caso de uma criança.',
        ],
        es: [
          'Formulario Schengen firmado',
          'Un formulario por viajero, incluidos los menores, firmado por el solicitante o por ambos progenitores en el caso de un niño.',
        ],
      },
      {
        en: [
          'Two recent passport photographs',
          'Taken in the last six months on a light background, meeting the ICAO standard.',
        ],
        pt: [
          'Duas fotografias recentes tipo passe',
          'Tiradas nos últimos seis meses em fundo claro, cumprindo a norma ICAO.',
        ],
        es: [
          'Dos fotografías recientes tipo pasaporte',
          'Tomadas en los últimos seis meses con fondo claro, conforme a la norma ICAO.',
        ],
      },
      {
        en: [
          'Travel medical insurance',
          'Minimum cover of 30,000 euros valid for the whole Schengen area and for every day of the trip, including repatriation.',
        ],
        pt: [
          'Seguro médico de viagem',
          'Cobertura mínima de 30 mil euros válida em todo o espaço Schengen e em cada dia da viagem, incluindo repatriamento.',
        ],
        es: [
          'Seguro médico de viaje',
          'Cobertura mínima de 30 mil euros válida en todo el espacio Schengen y para cada día del viaje, incluida la repatriación.',
        ],
      },
      {
        en: [
          'Accommodation booked for the whole trip',
          'Island hopping means a chain of bookings; a gap of unbooked nights is one of the details consulates pick up on.',
        ],
        pt: [
          'Alojamento reservado para toda a viagem',
          'Saltar entre ilhas significa uma cadeia de reservas; um intervalo de noites sem reserva é um dos detalhes que os consulados notam.',
        ],
        es: [
          'Alojamiento reservado para todo el viaje',
          'Saltar de isla en isla implica una cadena de reservas; un hueco de noches sin reservar es uno de los detalles que los consulados detectan.',
        ],
      },
      {
        en: [
          'Return or onward ticket reservation',
          'A reservation matching the dates on the form; the ticket itself need not be paid for yet.',
        ],
        pt: [
          'Reserva de bilhete de volta ou de continuação',
          'Uma reserva coerente com as datas do formulário; o bilhete em si ainda não precisa estar pago.',
        ],
        es: [
          'Reserva de billete de vuelta o de continuación',
          'Una reserva coherente con las fechas del formulario; el billete en sí aún no necesita estar pagado.',
        ],
      },
      {
        en: [
          'Cover letter setting out the itinerary',
          'Greek consulates want the route, the internal transport and the reason for the trip described in one place.',
        ],
        pt: [
          'Carta de apresentação com o roteiro',
          'Os consulados gregos querem a rota, os transportes internos e o motivo da viagem descritos num só documento.',
        ],
        es: [
          'Carta de presentación con el itinerario',
          'Los consulados griegos quieren la ruta, los transportes internos y el motivo del viaje descritos en un solo documento.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of means for each day of the stay',
          'Greece publishes a daily amount per person with a minimum floor for short trips. Confirm the figure in force for the year you travel.',
        ],
        pt: [
          'Comprovativo de meios para cada dia da estada',
          'A Grécia publica um valor diário por pessoa com um mínimo para viagens curtas. Confirme o valor vigente no ano em que viaja.',
        ],
        es: [
          'Comprobante de medios para cada día de la estancia',
          'Grecia publica un importe diario por persona con un mínimo para viajes cortos. Confirme la cifra vigente del año en que viaja.',
        ],
      },
      {
        en: [
          'Bank statements from the last six months',
          'Greek posts often ask for six rather than three, and they look at the pattern rather than the closing balance.',
        ],
        pt: [
          'Extratos bancários dos últimos seis meses',
          'As representações gregas costumam pedir seis em vez de três, e olham para o padrão em vez do saldo final.',
        ],
        es: [
          'Extractos bancarios de los últimos seis meses',
          'Las representaciones griegas suelen pedir seis en lugar de tres, y miran el patrón más que el saldo final.',
        ],
      },
      {
        en: [
          'Employment or study certificate with leave dates',
          'A letter stating your position, salary and the approved dates away, or an enrolment certificate for students.',
        ],
        pt: [
          'Declaração de emprego ou estudo com datas de ausência',
          'Uma carta indicando o cargo, o salário e as datas de ausência aprovadas, ou declaração de matrícula para estudantes.',
        ],
        es: [
          'Certificado de empleo o estudios con fechas de ausencia',
          'Una carta que indique el puesto, el salario y las fechas de ausencia aprobadas, o certificado de matrícula para estudiantes.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Book the appointment with the Greek consulate or its partner',
          'Greece uses different outsourcing partners depending on the country, and in some places another Schengen state represents it.',
        ],
        pt: [
          'Agendar no consulado grego ou no parceiro dele',
          'A Grécia usa parceiros de terceirização diferentes conforme o país, e nalguns lugares outro Estado Schengen a representa.',
        ],
        es: [
          'Reservar cita en el consulado griego o su socio',
          'Grecia usa socios de externalización distintos según el país, y en algunos lugares otro Estado Schengen la representa.',
        ],
      },
      {
        en: [
          'Pay the visa fee at the appointment',
          'Collected when the file is handed in and not returned if the visa is refused.',
        ],
        pt: [
          'Pagar a taxa do visto no atendimento',
          'Cobrada na entrega do processo e não devolvida se o visto for recusado.',
        ],
        es: [
          'Pagar la tasa del visado en la cita',
          'Se cobra al entregar el expediente y no se devuelve si deniegan el visado.',
        ],
      },
      {
        en: [
          'Submit no earlier than six months before travelling',
          'And in practice at least fifteen days ahead; summer is the peak season and slots vanish.',
        ],
        pt: [
          'Entregar no máximo seis meses antes da viagem',
          'E na prática pelo menos quinze dias antes; o verão é a época de pico e as vagas desaparecem.',
        ],
        es: [
          'Presentar como mucho seis meses antes de viajar',
          'Y en la práctica al menos quince días antes; el verano es temporada alta y los huecos desaparecen.',
        ],
      },
      {
        en: [
          'Apply to the post covering your legal residence',
          'Greece is strict about consular jurisdiction: applying at a more convenient post gets the file returned unexamined.',
        ],
        pt: [
          'Pedir na representação que cobre a sua residência legal',
          'A Grécia é rigorosa quanto à jurisdição consular: pedir numa representação mais conveniente faz o processo voltar sem exame.',
        ],
        es: [
          'Solicitar en la representación de su residencia legal',
          'Grecia es estricta con la jurisdicción consular: solicitar en una representación más cómoda hace que devuelvan el expediente sin examinarlo.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints taken at the visa appointment',
          'Kept for 59 months and reused for later Schengen applications anywhere in the area.',
        ],
        pt: [
          'Impressões digitais recolhidas no atendimento do visto',
          'Guardadas por 59 meses e reutilizadas em pedidos Schengen posteriores em qualquer ponto do espaço.',
        ],
        es: [
          'Huellas tomadas en la cita del visado',
          'Se conservan 59 meses y se reutilizan en solicitudes Schengen posteriores en cualquier punto del espacio.',
        ],
      },
      {
        en: [
          'Medical examination',
          'Not required for a short stay; only the national categories ask for a health certificate.',
        ],
        pt: [
          'Exame médico',
          'Não é exigido numa estada curta; só as categorias nacionais pedem atestado de saúde.',
        ],
        es: [
          'Examen médico',
          'No se exige en una estancia corta; solo las categorías nacionales piden certificado de salud.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Check the entries and the days on the sticker',
          'A single-entry visa is a problem the moment you plan a day cruise that touches a non-Schengen port.',
        ],
        pt: [
          'Conferir as entradas e os dias na vinheta',
          'Um visto de entrada única vira problema no instante em que você planeia um passeio de barco que toca um porto fora do Schengen.',
        ],
        es: [
          'Revisar las entradas y los días en la etiqueta',
          'Un visado de entrada única es un problema en cuanto planea una excursión en barco que toca un puerto fuera de Schengen.',
        ],
      },
      {
        en: [
          'Plan day trips to the Turkish coast carefully',
          'Crossing to a nearby Turkish island or port leaves Schengen and consumes an entry when you come back. Without a multiple-entry visa the trip ends there.',
        ],
        pt: [
          'Planear com cuidado os passeios à costa turca',
          'Atravessar para uma ilha ou porto turco próximo é sair do Schengen e consome uma entrada ao voltar. Sem visto de múltiplas entradas, a viagem acaba ali.',
        ],
        es: [
          'Planificar con cuidado las excursiones a la costa turca',
          'Cruzar a una isla o puerto turco cercano supone salir de Schengen y consume una entrada al volver. Sin visado de múltiples entradas, el viaje acaba ahí.',
        ],
      },
      {
        en: [
          'Respect the 90 days in any 180 rule',
          'Counted on a rolling basis across the whole Schengen area, not per country visited.',
        ],
        pt: [
          'Respeitar a regra dos 90 dias em cada 180',
          'Contados de forma móvel em todo o espaço Schengen, e não por país visitado.',
        ],
        es: [
          'Respetar la regla de 90 días en cada 180',
          'Se cuentan de forma móvil en todo el espacio Schengen, no por país visitado.',
        ],
      },
      {
        en: [
          'Keep the insurance valid until you leave',
          'Cover has to run to the last day of the visa, not only to the date of the return flight you booked.',
        ],
        pt: [
          'Manter o seguro válido até à partida',
          'A cobertura tem de ir até ao último dia do visto, e não apenas até à data do voo de volta que reservou.',
        ],
        es: [
          'Mantener el seguro vigente hasta la salida',
          'La cobertura debe llegar hasta el último día del visado, no solo hasta la fecha del vuelo de vuelta reservado.',
        ],
      },
      {
        en: [
          'Do not take up work of any kind',
          'A short-stay visa never permits employment or self-employment in Greece, including seasonal work in tourism.',
        ],
        pt: [
          'Não exercer trabalho de qualquer tipo',
          'Um visto de curta duração nunca permite emprego nem trabalho por conta própria na Grécia, incluindo trabalho sazonal no turismo.',
        ],
        es: [
          'No realizar trabajo de ningún tipo',
          'Un visado de corta duración nunca permite empleo ni trabajo por cuenta propia en Grecia, incluido el trabajo de temporada en turismo.',
        ],
      },
    ],
  },

  'National Visa (Type D)': {
    core_documents: [
      {
        en: [
          'Identify the national visa category before applying',
          'Greece grants the type D by purpose: work, study, family reunification, financially independent person, digital nomad. Each has its own file and its own income rule, and the purpose cannot be changed afterwards.',
        ],
        pt: [
          'Identificar a categoria de visto nacional antes de pedir',
          'A Grécia concede o tipo D por finalidade: trabalho, estudo, reagrupamento familiar, pessoa financeiramente independente, nómada digital. Cada uma tem o seu processo e a sua regra de rendimento, e a finalidade não pode ser alterada depois.',
        ],
        es: [
          'Identificar la categoría de visado nacional antes de solicitar',
          'Grecia concede el tipo D por finalidad: trabajo, estudio, reagrupación familiar, persona económicamente independiente, nómada digital. Cada una tiene su expediente y su regla de ingresos, y la finalidad no puede cambiarse después.',
        ],
      },
      {
        en: [
          'Valid passport for the national visa',
          'With validity beyond the year the type D typically grants you to enter and apply for the permit.',
        ],
        pt: [
          'Passaporte válido para o visto nacional',
          'Com validade para além do ano que o tipo D normalmente dá para entrar e pedir a autorização.',
        ],
        es: [
          'Pasaporte vigente para el visado nacional',
          'Con validez más allá del año que el tipo D suele conceder para entrar y solicitar el permiso.',
        ],
      },
      {
        en: [
          'National visa application form',
          'A different form from the Schengen one, signed and filed with the supporting file for your chosen category.',
        ],
        pt: [
          'Formulário de pedido de visto nacional',
          'Um formulário diferente do Schengen, assinado e entregue com o processo de apoio da categoria escolhida.',
        ],
        es: [
          'Formulario de solicitud de visado nacional',
          'Un formulario distinto del Schengen, firmado y presentado con el expediente de apoyo de la categoría elegida.',
        ],
      },
      {
        en: [
          'Criminal record certificate with apostille',
          'Recent, apostilled and translated either by the consulate translation service or by a translator Greece accepts. A translation done by anyone else is refused.',
        ],
        pt: [
          'Certidão criminal com apostila',
          'Recente, apostilada e traduzida pelo serviço de tradução do consulado ou por tradutor que a Grécia aceite. Uma tradução feita por outra pessoa é recusada.',
        ],
        es: [
          'Certificado de antecedentes con apostilla',
          'Reciente, apostillado y traducido por el servicio de traducción del consulado o por un traductor que Grecia acepte. Una traducción hecha por otra persona se rechaza.',
        ],
      },
      {
        en: [
          'Health certificate from a public hospital',
          'Greece asks for a certificate from a public hospital in your country of residence stating you carry no disease of public health concern. A private clinic letter is not accepted.',
        ],
        pt: [
          'Atestado de saúde de um hospital público',
          'A Grécia pede um atestado de hospital público do seu país de residência declarando que não é portador de doença de relevância para a saúde pública. Uma carta de clínica privada não é aceite.',
        ],
        es: [
          'Certificado de salud de un hospital público',
          'Grecia pide un certificado de hospital público de su país de residencia que declare que no padece enfermedad de relevancia para la salud pública. Una carta de clínica privada no se acepta.',
        ],
      },
      {
        en: [
          'Proof of accommodation in Greece',
          'A lease declared to the tax authority, a property title or a hosting statement. An undeclared rental contract has no legal value here.',
        ],
        pt: [
          'Comprovativo de alojamento na Grécia',
          'Um contrato de arrendamento declarado à autoridade fiscal, um título de propriedade ou uma declaração de hospedagem. Um contrato não declarado não tem valor legal aqui.',
        ],
        es: [
          'Comprobante de alojamiento en Grecia',
          'Un contrato de alquiler declarado a la agencia tributaria, un título de propiedad o una declaración de alojamiento. Un contrato no declarado no tiene valor legal aquí.',
        ],
      },
      {
        en: [
          'Documents specific to the purpose declared',
          'An employment approval, a university acceptance letter, a family reunification decision or the remote work contracts, depending on the category.',
        ],
        pt: [
          'Documentos próprios da finalidade declarada',
          'Uma aprovação de emprego, uma carta de aceitação universitária, uma decisão de reagrupamento familiar ou os contratos de trabalho remoto, conforme a categoria.',
        ],
        es: [
          'Documentos propios de la finalidad declarada',
          'Una aprobación de empleo, una carta de admisión universitaria, una resolución de reagrupación familiar o los contratos de trabajo en remoto, según la categoría.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Diploma recognition through DOATAP',
          'Foreign degrees are recognised by DOATAP, and for regulated professions and study routes that decision, not the diploma, is what the file rests on.',
        ],
        pt: [
          'Reconhecimento do diploma pelo DOATAP',
          'Os diplomas estrangeiros são reconhecidos pelo DOATAP, e nas profissões regulamentadas e vias de estudo é essa decisão, não o diploma, que sustenta o processo.',
        ],
        es: [
          'Reconocimiento del título por el DOATAP',
          'Los títulos extranjeros los reconoce el DOATAP, y en las profesiones reguladas y las vías de estudio es esa resolución, no el título, la que sostiene el expediente.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Language proof required by the programme',
          'Greek for most public university courses, English for the international programmes; the institution sets the level.',
        ],
        pt: [
          'Prova de idioma exigida pelo programa',
          'Grego na maioria dos cursos de universidades públicas, inglês nos programas internacionais; a instituição define o nível.',
        ],
        es: [
          'Prueba de idioma exigida por el programa',
          'Griego en la mayoría de los cursos de universidades públicas, inglés en los programas internacionales; la institución fija el nivel.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of income at the level set for your category',
          'The financially independent and digital nomad routes fix a monthly income floor with uplifts for a spouse and each child. The figures were revised recently, so check what applies now.',
        ],
        pt: [
          'Prova de rendimento no nível fixado para a sua categoria',
          'As vias de pessoa financeiramente independente e de nómada digital fixam um piso de rendimento mensal com acréscimos por cônjuge e por filho. Os valores foram revistos recentemente, então confirme o que se aplica agora.',
        ],
        es: [
          'Prueba de ingresos en el nivel fijado para su categoría',
          'Las vías de persona económicamente independiente y de nómada digital fijan un suelo de ingresos mensuales con incrementos por cónyuge y por hijo. Las cifras se revisaron hace poco, así que compruebe qué aplica ahora.',
        ],
      },
      {
        en: [
          'Health insurance valid in Greece for the whole stay',
          'Private cover until you are inside the Greek system; the policy has to name Greece explicitly.',
        ],
        pt: [
          'Seguro de saúde válido na Grécia para toda a estada',
          'Cobertura privada até estar dentro do sistema grego; a apólice tem de mencionar a Grécia explicitamente.',
        ],
        es: [
          'Seguro de salud válido en Grecia para toda la estancia',
          'Cobertura privada hasta estar dentro del sistema griego; la póliza debe mencionar Grecia explícitamente.',
        ],
      },
      {
        en: [
          'Pay the national visa fee',
          'Higher than the Schengen fee and payable at the consulate when the file is lodged.',
        ],
        pt: [
          'Pagar a taxa do visto nacional',
          'Mais alta que a taxa Schengen e paga no consulado no momento da entrega do processo.',
        ],
        es: [
          'Pagar la tasa del visado nacional',
          'Más alta que la tasa Schengen y se abona en el consulado al presentar el expediente.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Lodge the file at the consulate with jurisdiction',
          'Greece checks that you legally reside in the district of the post; a tourist visit to a friendlier consulate does not work.',
        ],
        pt: [
          'Entregar o processo no consulado com jurisdição',
          'A Grécia verifica se você reside legalmente na circunscrição da representação; uma visita turística a um consulado mais simpático não funciona.',
        ],
        es: [
          'Presentar el expediente en el consulado con jurisdicción',
          'Grecia comprueba que usted reside legalmente en la circunscripción de la representación; una visita turística a un consulado más amable no sirve.',
        ],
      },
      {
        en: [
          'Collect the type D visa and note the entry window',
          'It normally gives a year to enter and start the permit process. The visa is only the entry document, never the residence itself.',
        ],
        pt: [
          'Levantar o visto tipo D e observar a janela de entrada',
          'Normalmente dá um ano para entrar e iniciar o processo da autorização. O visto é só o documento de entrada, nunca a residência em si.',
        ],
        es: [
          'Recoger el visado tipo D y observar la ventana de entrada',
          'Suele dar un año para entrar e iniciar el trámite del permiso. El visado es solo el documento de entrada, nunca la residencia en sí.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints for the national visa file',
          'Taken at the consulate when the application is submitted.',
        ],
        pt: [
          'Impressões digitais para o processo de visto nacional',
          'Recolhidas no consulado quando o pedido é submetido.',
        ],
        es: [
          'Huellas para el expediente del visado nacional',
          'Se toman en el consulado al presentar la solicitud.',
        ],
      },
      {
        en: [
          'Additional medical checks where the post asks',
          'Some missions add a chest X-ray or specific screening depending on the country of residence.',
        ],
        pt: [
          'Exames médicos adicionais quando a representação pedir',
          'Algumas missões acrescentam radiografia do tórax ou rastreios específicos conforme o país de residência.',
        ],
        es: [
          'Pruebas médicas adicionales cuando la representación las pida',
          'Algunas misiones añaden radiografía de tórax o cribados concretos según el país de residencia.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Get an AFM at the local tax office',
          'The Greek tax number is needed for a lease, a bank account, a phone contract and almost anything else. Nothing practical starts before it.',
        ],
        pt: [
          'Obter o AFM na repartição de finanças local',
          'O número fiscal grego é preciso para arrendar, abrir conta, contratar telemóvel e quase tudo o resto. Nada de prático começa antes dele.',
        ],
        es: [
          'Obtener el AFM en la oficina tributaria local',
          'El número fiscal griego hace falta para alquilar, abrir cuenta, contratar teléfono y casi todo lo demás. Nada práctico empieza antes de tenerlo.',
        ],
      },
      {
        en: [
          'Get an AMKA for healthcare access',
          'The social security number is issued through a KEP citizen service centre or the insurance body, and it is entirely separate from the tax number.',
        ],
        pt: [
          'Obter o AMKA para aceder à saúde',
          'O número de segurança social é emitido por um centro de atendimento ao cidadão KEP ou pelo organismo segurador, e é completamente separado do número fiscal.',
        ],
        es: [
          'Obtener el AMKA para acceder a la sanidad',
          'El número de seguridad social se emite en un centro de atención al ciudadano KEP o en el organismo asegurador, y es totalmente independiente del número fiscal.',
        ],
      },
      {
        en: [
          'Apply for the residence permit before the visa runs out',
          'The type D only buys you the entry and a window to file. Letting it expire without applying leaves you irregular.',
        ],
        pt: [
          'Pedir a autorização de residência antes de o visto acabar',
          'O tipo D só lhe compra a entrada e uma janela para submeter. Deixá-lo caducar sem pedir deixa-o em situação irregular.',
        ],
        es: [
          'Solicitar el permiso de residencia antes de que caduque el visado',
          'El tipo D solo le da la entrada y una ventana para presentar. Dejarlo caducar sin solicitar le deja en situación irregular.',
        ],
      },
      {
        en: [
          'File with the immigration directorate of your region',
          'The file goes to the regional immigration service where you live, not to a ministry counter in Athens. The wrong office means starting again.',
        ],
        pt: [
          'Submeter na direção de imigração da sua região',
          'O processo vai para o serviço de imigração regional onde você vive, e não a um balcão ministerial em Atenas. O serviço errado significa recomeçar.',
        ],
        es: [
          'Presentar en la dirección de inmigración de su región',
          'El expediente va al servicio de inmigración regional donde vive, no a una ventanilla ministerial en Atenas. La oficina equivocada significa empezar de nuevo.',
        ],
      },
      {
        en: [
          'Keep the blue receipt safe until the card arrives',
          'The confirmation slip legalises your stay and lets you travel while the card is produced, which routinely takes many months.',
        ],
        pt: [
          'Guardar bem o recibo azul até o cartão chegar',
          'O comprovativo legaliza a sua estada e permite viajar enquanto o cartão é produzido, o que costuma levar muitos meses.',
        ],
        es: [
          'Guardar bien el resguardo azul hasta que llegue la tarjeta',
          'El resguardo legaliza su estancia y le permite viajar mientras se produce la tarjeta, lo que suele tardar muchos meses.',
        ],
      },
      {
        en: [
          'Open a Greek bank account with the AFM',
          'Salary, rent and utility payments all run through it, and the account needs both the tax number and proof of address.',
        ],
        pt: [
          'Abrir conta bancária grega com o AFM',
          'Salário, renda e contas de serviços passam por ela, e a conta exige tanto o número fiscal como comprovativo de morada.',
        ],
        es: [
          'Abrir una cuenta bancaria griega con el AFM',
          'El salario, el alquiler y los suministros pasan por ella, y la cuenta exige tanto el número fiscal como un justificante de domicilio.',
        ],
        priority: 2,
      },
    ],
  },

  'Residence Permit for Investors (Golden Visa)': {
    core_documents: [
      {
        en: [
          'Check the investment threshold for the specific area',
          'Since the 2024 reform the property floor is tiered by region, with the highest level in Attica, Thessaloniki and the most popular islands and a lower one elsewhere. Confirm the tier for the exact municipality before you commit.',
        ],
        pt: [
          'Verificar o piso de investimento da zona exata',
          'Desde a reforma de 2024 o piso imobiliário é escalonado por região, com o nível mais alto na Ática, em Salónica e nas ilhas mais procuradas, e um nível mais baixo no resto. Confirme o escalão do município exato antes de se comprometer.',
        ],
        es: [
          'Comprobar el umbral de inversión de la zona exacta',
          'Desde la reforma de 2024 el suelo inmobiliario está escalonado por región, con el nivel más alto en Ática, Salónica y las islas más demandadas, y uno más bajo en el resto. Confirme el tramo del municipio exacto antes de comprometerse.',
        ],
      },
      {
        en: [
          'Valid passport for the investor application',
          'For you and for every family member included, each with enough validity to cover the five-year card.',
        ],
        pt: [
          'Passaporte válido para o pedido de investidor',
          'Para si e para cada familiar incluído, todos com validade suficiente para cobrir o cartão de cinco anos.',
        ],
        es: [
          'Pasaporte vigente para la solicitud de inversor',
          'Para usted y para cada familiar incluido, todos con validez suficiente para cubrir la tarjeta de cinco años.',
        ],
      },
      {
        en: [
          'Get an AFM before signing anything',
          'A Greek tax number is required to buy property, open the account and sign the deed. Investors routinely obtain it through a lawyer before ever setting foot in the country.',
        ],
        pt: [
          'Obter o AFM antes de assinar seja o que for',
          'É preciso um número fiscal grego para comprar imóvel, abrir a conta e assinar a escritura. Investidores costumam obtê-lo através de um advogado antes mesmo de pisar no país.',
        ],
        es: [
          'Obtener el AFM antes de firmar nada',
          'Hace falta un número fiscal griego para comprar inmueble, abrir la cuenta y firmar la escritura. Los inversores suelen obtenerlo mediante un abogado antes incluso de pisar el país.',
        ],
      },
      {
        en: [
          'Power of attorney to a Greek lawyer',
          'Signed before a notary and apostilled. It is what lets the purchase and the application proceed while you are abroad.',
        ],
        pt: [
          'Procuração a um advogado grego',
          'Assinada perante notário e apostilada. É o que permite que a compra e o pedido avancem enquanto você está fora.',
        ],
        es: [
          'Poder notarial a un abogado griego',
          'Firmado ante notario y apostillado. Es lo que permite que la compra y la solicitud avancen mientras usted está fuera.',
        ],
      },
      {
        en: [
          'Notarial deed and land registry transcription',
          'The deed alone is not enough: the transfer has to be transcribed at the land registry or cadastre, and it is that transcription the immigration service looks for.',
        ],
        pt: [
          'Escritura notarial e transcrição no registo predial',
          'A escritura sozinha não basta: a transferência tem de ser transcrita no registo predial ou no cadastro, e é essa transcrição que o serviço de imigração procura.',
        ],
        es: [
          'Escritura notarial y transcripción en el registro',
          'La escritura sola no basta: la transmisión debe transcribirse en el registro de la propiedad o el catastro, y es esa transcripción lo que busca el servicio de inmigración.',
        ],
      },
      {
        en: [
          'Criminal record certificate for each adult applicant',
          'Apostilled and translated, for the investor and for every adult family member joining the application.',
        ],
        pt: [
          'Certidão criminal de cada requerente adulto',
          'Apostilada e traduzida, para o investidor e para cada familiar adulto que entre no pedido.',
        ],
        es: [
          'Certificado de antecedentes de cada solicitante adulto',
          'Apostillado y traducido, para el inversor y para cada familiar adulto que entre en la solicitud.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Transfer the investment funds by bank only',
          'Cash is not accepted. The money has to arrive traceably from an account abroad in the investor name, and the trail is examined.',
        ],
        pt: [
          'Transferir os fundos do investimento só por banco',
          'Dinheiro em espécie não é aceite. O valor tem de chegar de forma rastreável de uma conta no estrangeiro em nome do investidor, e o rasto é examinado.',
        ],
        es: [
          'Transferir los fondos de la inversión solo por banco',
          'No se acepta efectivo. El dinero debe llegar de forma trazable desde una cuenta en el extranjero a nombre del inversor, y se examina el rastro.',
        ],
      },
      {
        en: [
          'Prove the price was paid in full',
          'A partial payment does not qualify, whatever the contract says. The permit is granted on the amount actually settled.',
        ],
        pt: [
          'Provar que o preço foi pago integralmente',
          'Um pagamento parcial não qualifica, diga o contrato o que disser. A autorização é concedida sobre o montante efetivamente liquidado.',
        ],
        es: [
          'Acreditar que el precio se pagó íntegramente',
          'Un pago parcial no cualifica, diga lo que diga el contrato. El permiso se concede sobre el importe realmente liquidado.',
        ],
      },
      {
        en: [
          'Health insurance covering all the applicants',
          'Private cover valid in Greece for the investor and each dependant, for the duration of the permit.',
        ],
        pt: [
          'Seguro de saúde que cubra todos os requerentes',
          'Cobertura privada válida na Grécia para o investidor e cada dependente, pela duração da autorização.',
        ],
        es: [
          'Seguro de salud que cubra a todos los solicitantes',
          'Cobertura privada válida en Grecia para el inversor y cada dependiente, durante la vigencia del permiso.',
        ],
      },
      {
        en: [
          'Pay the government fee per applicant',
          'There is a main fee for the investor and a separate charge for each family member, plus the card production cost. Confirm the current amounts.',
        ],
        pt: [
          'Pagar a taxa governamental por requerente',
          'Há uma taxa principal para o investidor e um encargo separado por cada familiar, mais o custo de produção do cartão. Confirme os valores atuais.',
        ],
        es: [
          'Pagar la tasa gubernamental por solicitante',
          'Hay una tasa principal para el inversor y un cargo aparte por cada familiar, más el coste de producción de la tarjeta. Confirme los importes actuales.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File the application with the regional immigration service',
          'Lodged electronically and completed at the immigration directorate for the area, with the lawyer usually acting on the power of attorney.',
        ],
        pt: [
          'Submeter o pedido no serviço regional de imigração',
          'Entregue eletronicamente e concluído na direção de imigração da zona, normalmente com o advogado a agir ao abrigo da procuração.',
        ],
        es: [
          'Presentar la solicitud en el servicio regional de inmigración',
          'Se presenta electrónicamente y se completa en la dirección de inmigración de la zona, normalmente con el abogado actuando en virtud del poder.',
        ],
      },
      {
        en: [
          'Receive the confirmation receipt while it is pending',
          'The receipt lets you stay in Greece and travel in Schengen while the card is produced, which can take a year or more.',
        ],
        pt: [
          'Receber o comprovativo enquanto o pedido está pendente',
          'O comprovativo permite permanecer na Grécia e viajar no Schengen enquanto o cartão é produzido, o que pode levar um ano ou mais.',
        ],
        es: [
          'Recibir el resguardo mientras la solicitud está pendiente',
          'El resguardo permite permanecer en Grecia y viajar por Schengen mientras se produce la tarjeta, lo que puede tardar un año o más.',
        ],
      },
      {
        en: [
          'Check the minimum surface rule for the property',
          'The reform added a minimum size for the qualifying property, and conversions of commercial buildings or restorations of listed ones follow their own separate rules.',
        ],
        pt: [
          'Verificar a regra de área mínima do imóvel',
          'A reforma acrescentou uma área mínima para o imóvel qualificante, e as conversões de edifícios comerciais ou os restauros de imóveis classificados seguem regras próprias e separadas.',
        ],
        es: [
          'Comprobar la regla de superficie mínima del inmueble',
          'La reforma añadió una superficie mínima para el inmueble que cualifica, y las conversiones de edificios comerciales o las restauraciones de inmuebles catalogados siguen sus propias reglas.',
        ],
      },
      {
        en: [
          'Include the family members in the same application',
          'Spouse, children up to the age limit and the parents of both spouses can be added, but adding them later is a fresh procedure rather than an amendment.',
        ],
        pt: [
          'Incluir os familiares no mesmo pedido',
          'Cônjuge, filhos até ao limite de idade e os pais de ambos os cônjuges podem ser incluídos, mas acrescentá-los depois é um novo procedimento e não uma alteração.',
        ],
        es: [
          'Incluir a los familiares en la misma solicitud',
          'Cónyuge, hijos hasta el límite de edad y los padres de ambos cónyuges pueden añadirse, pero incorporarlos después es un procedimiento nuevo y no una modificación.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints and photograph at the immigration office',
          'Every applicant has to attend in person once, including children over the age threshold. This is the one trip that cannot be delegated to the lawyer.',
        ],
        pt: [
          'Impressões digitais e fotografia no serviço de imigração',
          'Cada requerente tem de comparecer pessoalmente uma vez, incluindo crianças acima do limite de idade. É a única deslocação que não pode ser delegada ao advogado.',
        ],
        es: [
          'Huellas y fotografía en la oficina de inmigración',
          'Cada solicitante debe presentarse en persona una vez, incluidos los niños por encima del límite de edad. Es el único viaje que no puede delegarse en el abogado.',
        ],
      },
      {
        en: [
          'Medical examination for investors',
          'Not required in this category; the health certificate belongs to the national visa routes.',
        ],
        pt: [
          'Exame médico para investidores',
          'Não é exigido nesta categoria; o atestado de saúde pertence às vias de visto nacional.',
        ],
        es: [
          'Examen médico para inversores',
          'No se exige en esta categoría; el certificado de salud pertenece a las vías de visado nacional.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the five-year card that does not allow employment',
          'The investor permit does not authorise salaried work in Greece. You may hold shares and take dividends, but not be employed on it.',
        ],
        pt: [
          'Levantar o cartão de cinco anos que não permite emprego',
          'A autorização de investidor não autoriza trabalho assalariado na Grécia. Pode deter participações e receber dividendos, mas não ser empregado com ela.',
        ],
        es: [
          'Recoger la tarjeta de cinco años que no permite empleo',
          'El permiso de inversor no autoriza trabajo asalariado en Grecia. Puede tener participaciones y cobrar dividendos, pero no estar empleado con él.',
        ],
      },
      {
        en: [
          'Keep the property for the whole period',
          'Selling the qualifying asset to anyone who is not taking over the investment ends the permit for you and for every dependant on it.',
        ],
        pt: [
          'Manter o imóvel durante todo o período',
          'Vender o ativo qualificante a alguém que não assuma o investimento extingue a autorização para si e para todos os dependentes ligados a ela.',
        ],
        es: [
          'Conservar el inmueble durante todo el periodo',
          'Vender el activo que cualifica a alguien que no asuma la inversión extingue el permiso para usted y para todos los dependientes vinculados.',
        ],
      },
      {
        en: [
          'Do not let the property on short-term rental',
          'The 2024 reform bans short-term letting of the qualifying property. Breaching it carries a fine and the withdrawal of the permit.',
        ],
        pt: [
          'Não arrendar o imóvel em regime de curta duração',
          'A reforma de 2024 proíbe o arrendamento de curta duração do imóvel qualificante. Violar isso implica multa e a retirada da autorização.',
        ],
        es: [
          'No alquilar el inmueble en régimen de corta duración',
          'La reforma de 2024 prohíbe el alquiler de corta duración del inmueble que cualifica. Incumplirlo conlleva multa y la retirada del permiso.',
        ],
      },
      {
        en: [
          'Renew every five years while the investment stands',
          'The renewal is a check that the asset is still owned and the insurance still active, and it is filed at the same regional service.',
        ],
        pt: [
          'Renovar a cada cinco anos enquanto o investimento se mantiver',
          'A renovação é uma verificação de que o ativo continua na sua titularidade e o seguro ativo, e é entregue no mesmo serviço regional.',
        ],
        es: [
          'Renovar cada cinco años mientras la inversión se mantenga',
          'La renovación es una comprobación de que el activo sigue en su titularidad y el seguro activo, y se presenta en el mismo servicio regional.',
        ],
      },
      {
        en: [
          'Note that the years do not build towards citizenship',
          'There is no minimum stay, which is the attraction, but naturalisation requires actual physical residence. Time held on paper alone counts for nothing there.',
        ],
        pt: [
          'Saber que os anos não contam para a cidadania',
          'Não há estada mínima, o que é a atração, mas a naturalização exige residência física real. Tempo mantido apenas no papel não conta para nada ali.',
        ],
        es: [
          'Saber que los años no suman para la ciudadanía',
          'No hay estancia mínima, que es el atractivo, pero la naturalización exige residencia física real. El tiempo mantenido solo sobre el papel no cuenta para nada ahí.',
        ],
      },
      {
        en: [
          'Declare the property in the annual tax filing',
          'Greek property is declared in the E9 form and attracts the ENFIA property tax every year, whether or not you spend any time in the country.',
        ],
        pt: [
          'Declarar o imóvel na declaração fiscal anual',
          'O imóvel grego é declarado no formulário E9 e paga o imposto predial ENFIA todos os anos, quer você passe tempo no país ou não.',
        ],
        es: [
          'Declarar el inmueble en la declaración fiscal anual',
          'El inmueble griego se declara en el formulario E9 y tributa cada año por el impuesto ENFIA, pase o no tiempo en el país.',
        ],
      },
    ],
  },

  'Long-Term Resident Status': {
    core_documents: [
      {
        en: [
          'Confirm five years of continuous legal residence',
          'Absences over six consecutive months, or ten months in total across the period, break the count. Time held on a student permit is counted only in part.',
        ],
        pt: [
          'Confirmar cinco anos de residência legal contínua',
          'Ausências acima de seis meses seguidos, ou dez meses no total do período, quebram a contagem. O tempo com autorização de estudante conta apenas em parte.',
        ],
        es: [
          'Confirmar cinco años de residencia legal continua',
          'Las ausencias de más de seis meses seguidos, o diez meses en total del periodo, rompen el cómputo. El tiempo con permiso de estudiante cuenta solo en parte.',
        ],
      },
      {
        en: [
          'Valid passport and current residence permit',
          'The application has to be filed while the existing permit is still valid; a lapse restarts the qualifying period.',
        ],
        pt: [
          'Passaporte válido e autorização de residência atual',
          'O pedido tem de ser entregue enquanto a autorização existente ainda é válida; uma interrupção reinicia o período qualificado.',
        ],
        es: [
          'Pasaporte vigente y permiso de residencia actual',
          'La solicitud debe presentarse mientras el permiso existente siga vigente; un lapso reinicia el periodo cualificado.',
        ],
      },
      {
        en: [
          'Application for long-term resident status',
          'Filed with the immigration directorate of your region, on the form for the EU long-term category rather than an ordinary renewal.',
        ],
        pt: [
          'Pedido de estatuto de residente de longa duração',
          'Entregue na direção de imigração da sua região, no formulário da categoria de longa duração UE e não numa renovação comum.',
        ],
        es: [
          'Solicitud del estatuto de residente de larga duración',
          'Se presenta en la dirección de inmigración de su región, en el formulario de la categoría de larga duración UE y no en una renovación ordinaria.',
        ],
      },
      {
        en: [
          'Proof of stable accommodation',
          'A lease declared to the tax authority or a property deed. Greece checks the declaration, not just the signed contract.',
        ],
        pt: [
          'Comprovativo de alojamento estável',
          'Um arrendamento declarado à autoridade fiscal ou uma escritura de propriedade. A Grécia verifica a declaração, não apenas o contrato assinado.',
        ],
        es: [
          'Comprobante de alojamiento estable',
          'Un alquiler declarado a la agencia tributaria o una escritura de propiedad. Grecia comprueba la declaración, no solo el contrato firmado.',
        ],
      },
      {
        en: [
          'Criminal record and public order assessment',
          'Greek records are pulled during the procedure; a pending case can hold the file until it is resolved.',
        ],
        pt: [
          'Certidão criminal e avaliação de ordem pública',
          'Os registos gregos são consultados durante o procedimento; um processo pendente pode travar o pedido até estar resolvido.',
        ],
        es: [
          'Antecedentes penales y evaluación de orden público',
          'Los registros griegos se consultan durante el procedimiento; una causa pendiente puede bloquear el expediente hasta resolverse.',
        ],
      },
      {
        en: [
          'Tax returns for the qualifying years',
          'The annual E1 filings show you were tax resident and compliant. Missing years are the quiet reason many of these files fail.',
        ],
        pt: [
          'Declarações fiscais dos anos qualificados',
          'As declarações anuais E1 mostram que foi residente fiscal e cumpridor. Anos em falta são o motivo silencioso pelo qual muitos destes processos falham.',
        ],
        es: [
          'Declaraciones fiscales de los años cualificados',
          'Las declaraciones anuales E1 muestran que fue residente fiscal y cumplidor. Los años que falten son la razón silenciosa por la que muchos de estos expedientes fracasan.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Greek language and civic knowledge certificate',
          'The integration examination covers Greek at the required level plus history and culture, and the certificate is a hard condition of the status.',
        ],
        pt: [
          'Certificado de língua grega e conhecimentos cívicos',
          'O exame de integração cobre o grego no nível exigido mais história e cultura, e o certificado é uma condição inultrapassável do estatuto.',
        ],
        es: [
          'Certificado de lengua griega y conocimientos cívicos',
          'El examen de integración cubre el griego en el nivel exigido más historia y cultura, y el certificado es una condición ineludible del estatuto.',
        ],
      },
      {
        en: [
          'Attendance certificate from an integration programme',
          'Completing a recognised integration course can stand in for part of the examination requirement in some situations.',
        ],
        pt: [
          'Certificado de frequência de um programa de integração',
          'Concluir um curso de integração reconhecido pode substituir parte da exigência de exame nalgumas situações.',
        ],
        es: [
          'Certificado de asistencia a un programa de integración',
          'Completar un curso de integración reconocido puede sustituir parte del requisito de examen en algunas situaciones.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Stable income above the threshold for your household',
          'Expressed as a multiple of the annual unskilled worker salary and increased for each dependant, so the target moves whenever that reference does. Check the figure in force.',
        ],
        pt: [
          'Rendimento estável acima do limiar do seu agregado',
          'Expresso como um múltiplo do salário anual do trabalhador não qualificado e aumentado por cada dependente, por isso o alvo muda sempre que essa referência muda. Confirme o valor vigente.',
        ],
        es: [
          'Ingresos estables por encima del umbral de su hogar',
          'Se expresa como un múltiplo del salario anual del trabajador no cualificado y se incrementa por cada dependiente, así que el objetivo se mueve cuando esa referencia cambia. Confirme la cifra vigente.',
        ],
      },
      {
        en: [
          'Health insurance for you and your dependants',
          'Public cover through your employment, or a private policy where you are not in the Greek system.',
        ],
        pt: [
          'Seguro de saúde para si e para os seus dependentes',
          'Cobertura pública pelo seu emprego, ou uma apólice privada se não estiver no sistema grego.',
        ],
        es: [
          'Seguro de salud para usted y sus dependientes',
          'Cobertura pública por su empleo, o una póliza privada si no está en el sistema griego.',
        ],
      },
      {
        en: [
          'Pay the fee for the long-term resident permit',
          'A single fee for the five-year card, paid before the file is registered. Confirm the amount in force.',
        ],
        pt: [
          'Pagar a taxa da autorização de residente de longa duração',
          'Uma taxa única para o cartão de cinco anos, paga antes de o processo ser registado. Confirme o valor vigente.',
        ],
        es: [
          'Pagar la tasa del permiso de residente de larga duración',
          'Una tasa única para la tarjeta de cinco años, abonada antes de registrar el expediente. Confirme el importe vigente.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File before the current permit expires',
          'Filing late converts an upgrade into a new application and can cost you the continuity the status depends on.',
        ],
        pt: [
          'Submeter antes de a autorização atual caducar',
          'Submeter tarde transforma uma progressão num pedido novo e pode custar a continuidade de que o estatuto depende.',
        ],
        es: [
          'Presentar antes de que caduque el permiso actual',
          'Presentar tarde convierte una mejora en una solicitud nueva y puede costarle la continuidad de la que depende el estatuto.',
        ],
      },
      {
        en: [
          'Collect the receipt that covers you while waiting',
          'Processing runs long. The receipt issued at filing is what proves your stay is lawful in the meantime, so carry it.',
        ],
        pt: [
          'Levantar o recibo que o cobre durante a espera',
          'O processamento demora. O recibo emitido na entrega é o que prova que a sua estada é legal entretanto, por isso ande com ele.',
        ],
        es: [
          'Recoger el resguardo que le cubre mientras espera',
          'La tramitación es larga. El resguardo emitido al presentar es lo que prueba que su estancia es legal mientras tanto, así que llévelo encima.',
        ],
      },
      {
        en: [
          'Follow up with the regional service on the file',
          'Requests for extra documents are notified to the address on record, and an unanswered request closes the case.',
        ],
        pt: [
          'Acompanhar o processo junto do serviço regional',
          'Os pedidos de documentos adicionais são notificados para a morada registada, e um pedido sem resposta encerra o caso.',
        ],
        es: [
          'Hacer seguimiento del expediente en el servicio regional',
          'Los requerimientos de documentos adicionales se notifican a la dirección registrada, y un requerimiento sin respuesta archiva el caso.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometrics for the long-term resident card',
          'Fingerprints and photograph taken at the immigration office when the file is registered.',
        ],
        pt: [
          'Biometria para o cartão de residente de longa duração',
          'Impressões digitais e fotografia recolhidas no serviço de imigração quando o processo é registado.',
        ],
        es: [
          'Biometría para la tarjeta de residente de larga duración',
          'Huellas y fotografía tomadas en la oficina de inmigración al registrarse el expediente.',
        ],
      },
      {
        en: [
          'Health certificate for this procedure',
          'Not required: the public hospital certificate belongs to the first entry, not to the long-term upgrade.',
        ],
        pt: [
          'Atestado de saúde para este procedimento',
          'Não é exigido: o atestado de hospital público pertence à primeira entrada, não à progressão para longa duração.',
        ],
        es: [
          'Certificado de salud para este procedimiento',
          'No se exige: el certificado de hospital público pertenece a la primera entrada, no a la mejora a larga duración.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the permit valid for five years',
          'The status itself does not expire while the conditions hold, but the card is renewed every five years on a simplified check.',
        ],
        pt: [
          'Levantar a autorização válida por cinco anos',
          'O estatuto em si não caduca enquanto as condições se mantiverem, mas o cartão é renovado a cada cinco anos com uma verificação simplificada.',
        ],
        es: [
          'Recoger el permiso válido por cinco años',
          'El estatuto en sí no caduca mientras se mantengan las condiciones, pero la tarjeta se renueva cada cinco años con una comprobación simplificada.',
        ],
      },
      {
        en: [
          'Use the equal treatment the status carries',
          'It gives access to employment, social security and education on the same footing as nationals, which no ordinary permit does.',
        ],
        pt: [
          'Usar a igualdade de tratamento que o estatuto traz',
          'Dá acesso a emprego, segurança social e educação em pé de igualdade com os nacionais, o que nenhuma autorização comum faz.',
        ],
        es: [
          'Aprovechar la igualdad de trato que da el estatuto',
          'Da acceso a empleo, seguridad social y educación en igualdad con los nacionales, algo que ningún permiso ordinario permite.',
        ],
      },
      {
        en: [
          'Apply promptly if you move to another member state',
          'The EU status lets you settle elsewhere in the Union, but the new country has to be asked in the first months after you arrive there.',
        ],
        pt: [
          'Pedir depressa se mudar para outro Estado-membro',
          'O estatuto UE permite fixar-se noutro país da União, mas é preciso pedir ao novo país nos primeiros meses após lá chegar.',
        ],
        es: [
          'Solicitar pronto si se muda a otro Estado miembro',
          'El estatuto UE permite establecerse en otro país de la Unión, pero hay que solicitarlo en el nuevo país en los primeros meses tras llegar.',
        ],
      },
      {
        en: [
          'Watch the absence limits that end the status',
          'A continuous absence from the EU beyond twelve months withdraws it, and a long enough stretch away from Greece itself does the same.',
        ],
        pt: [
          'Vigiar os limites de ausência que extinguem o estatuto',
          'Uma ausência contínua da UE superior a doze meses retira-o, e um afastamento suficientemente longo da própria Grécia produz o mesmo efeito.',
        ],
        es: [
          'Vigilar los límites de ausencia que extinguen el estatuto',
          'Una ausencia continua de la UE superior a doce meses lo retira, y un alejamiento suficientemente largo de la propia Grecia produce el mismo efecto.',
        ],
      },
      {
        en: [
          'Consider Greek naturalisation as the next step',
          'Citizenship asks for a longer residence period than this status and its own examination, so plan it as a separate project rather than an automatic sequel.',
        ],
        pt: [
          'Considerar a naturalização grega como passo seguinte',
          'A cidadania exige um período de residência maior do que este estatuto e um exame próprio, por isso planeie-a como um projeto separado e não como continuação automática.',
        ],
        es: [
          'Considerar la naturalización griega como siguiente paso',
          'La ciudadanía exige un periodo de residencia mayor que este estatuto y un examen propio, así que planifíquela como un proyecto aparte y no como continuación automática.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
