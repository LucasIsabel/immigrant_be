import type { CountryVisaSteps } from './types';

/**
 * Steps for the Netherlands.
 *
 * The mechanism that defines almost every long stay here is the MVV, and the
 * fact that it is normally applied for *by a sponsor in the Netherlands*
 * through the TEV procedure — not by the applicant at a consulate. For a
 * recognised sponsor the whole thing is faster still. Somebody expecting to
 * walk into an embassy and hand in a file has the model wrong.
 *
 * After arrival, two registrations gate everything else: collecting the
 * residence card at the IND and registering in the BRP at the municipality,
 * which is what produces the BSN.
 */
export const netherlands: CountryVisaSteps = {
  'Short-Stay Schengen Visa (up to 90 days)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Valid for at least three months beyond departure, issued within the last ten years, with two blank pages.',
        ],
        pt: [
          'Passaporte válido',
          'Válido por pelo menos três meses além da saída, emitido nos últimos dez anos, com duas páginas em branco.',
        ],
        es: [
          'Pasaporte vigente',
          'Vigente al menos tres meses más allá de la salida, emitido en los últimos diez años, con dos páginas en blanco.',
        ],
      },
      {
        en: [
          'Schengen application form, signed',
          'One per traveller, including minors.',
        ],
        pt: [
          'Formulário Schengen preenchido e assinado',
          'Um por viajante, inclusive menores.',
        ],
        es: [
          'Formulario Schengen cumplimentado y firmado',
          'Uno por viajero, incluidos menores.',
        ],
      },
      {
        en: [
          'One recent photograph',
          'To the Dutch specification, which is stricter than most on background and head position.',
        ],
        pt: [
          'Uma fotografia recente',
          'No padrão neerlandês, mais rígido que a maioria quanto a fundo e posição da cabeça.',
        ],
        es: [
          'Una fotografía reciente',
          'Según el estándar neerlandés, más estricto que la mayoría en fondo y posición de la cabeza.',
        ],
      },
      {
        en: [
          'Return flight reservation',
          'A reservation only; do not buy the ticket before the visa is granted.',
        ],
        pt: [
          'Reserva de voo de volta',
          'Apenas a reserva; não compre o bilhete antes de o visto ser concedido.',
        ],
        es: [
          'Reserva de vuelo de vuelta',
          'Solo la reserva; no compre el billete antes de que concedan el visado.',
        ],
      },
      {
        en: [
          'Proof of accommodation',
          'Hotel booking, or a completed proof of sponsorship and private accommodation form signed by your host at their municipality.',
        ],
        pt: [
          'Comprovativo de alojamento',
          'Reserva de hotel, ou o formulário de garantia e alojamento particular preenchido e assinado pelo anfitrião no município dele.',
        ],
        es: [
          'Comprobante de alojamiento',
          'Reserva de hotel, o el formulario de garantía y alojamiento particular cumplimentado y firmado por el anfitrión en su ayuntamiento.',
        ],
      },
      {
        en: [
          'Travel medical insurance',
          'Minimum cover of 30,000 euros, valid across the Schengen area for the whole stay.',
        ],
        pt: [
          'Seguro médico de viagem',
          'Cobertura mínima de 30 mil euros, válida no espaço Schengen durante toda a estada.',
        ],
        es: [
          'Seguro médico de viaje',
          'Cobertura mínima de 30 mil euros, válida en el espacio Schengen durante toda la estancia.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of means of subsistence',
          'A daily amount per person. If a host signs the sponsorship form, they show the funds instead of you.',
        ],
        pt: [
          'Comprovativo de meios de subsistência',
          'Um valor diário por pessoa. Se um anfitrião assina o formulário de garantia, é ele quem comprova os recursos, não você.',
        ],
        es: [
          'Comprobante de medios de subsistencia',
          'Un importe diario por persona. Si un anfitrión firma el formulario de garantía, es él quien acredita los fondos, no usted.',
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
          'Book the appointment at the visa application centre',
          'The Netherlands outsources collection, and in several countries another Schengen state handles Dutch applications.',
        ],
        pt: [
          'Agendar atendimento no centro de pedidos de visto',
          'Os Países Baixos terceirizam a recolha, e em vários países outro Estado Schengen atende os pedidos neerlandeses.',
        ],
        es: [
          'Reservar cita en el centro de solicitudes de visado',
          'Países Bajos externaliza la recogida, y en varios países otro Estado Schengen atiende las solicitudes neerlandesas.',
        ],
      },
      {
        en: [
          'Pay the visa fee and the service charge',
          'Two separate amounts, neither refunded on refusal.',
        ],
        pt: [
          'Pagar a taxa de visto e a taxa de serviço',
          'Dois valores distintos, nenhum reembolsado em caso de indeferimento.',
        ],
        es: [
          'Pagar la tasa de visado y la tasa de servicio',
          'Dos importes distintos, ninguno reembolsable si deniegan.',
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
          'Fingerprints stay on file for 59 months and can be reused in a later Schengen application.',
        ],
        pt: [
          'Recolha de dados biométricos',
          'As impressões ficam registadas por 59 meses e podem ser reaproveitadas num pedido Schengen posterior.',
        ],
        es: [
          'Recogida de datos biométricos',
          'Las huellas quedan registradas 59 meses y pueden reutilizarse en una solicitud Schengen posterior.',
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
          'Check the validity, the number of entries and the days granted.',
        ],
        pt: [
          'Retirar o passaporte com o visto',
          'Confira a validade, o número de entradas e os dias concedidos.',
        ],
        es: [
          'Recoger el pasaporte con el visado',
          'Verifique la validez, el número de entradas y los días concedidos.',
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
          'Do not work on a short-stay visa',
          'Tourism, family visits and business meetings only.',
        ],
        pt: [
          'Não trabalhar com visto de curta duração',
          'Apenas turismo, visita a familiares e reuniões de negócios.',
        ],
        es: [
          'No trabajar con visado de corta duración',
          'Solo turismo, visitas familiares y reuniones de negocios.',
        ],
      },
    ],
  },

  'Airport Transit Visa': {
    core_documents: [
      {
        en: [
          'Check first whether your nationality needs one',
          'The airport transit visa list is short. Most travellers changing planes at Schiphol need nothing at all, and applying anyway wastes the fee.',
        ],
        pt: [
          'Verificar antes se sua nacionalidade precisa de um',
          'A lista de trânsito aeroportuário é curta. A maioria de quem faz conexão em Schiphol não precisa de nada, e pedir mesmo assim desperdiça a taxa.',
        ],
        es: [
          'Comprobar primero si su nacionalidad lo necesita',
          'La lista de tránsito aeroportuario es corta. La mayoría de quienes hacen escala en Schiphol no necesita nada, y solicitarlo igualmente desperdicia la tasa.',
        ],
      },
      {
        en: [
          'Valid passport',
          'Valid for at least three months beyond the transit date.',
        ],
        pt: [
          'Passaporte válido',
          'Válido por pelo menos três meses além da data do trânsito.',
        ],
        es: [
          'Pasaporte vigente',
          'Vigente al menos tres meses más allá de la fecha del tránsito.',
        ],
      },
      {
        en: [
          'Schengen application form marked as transit',
          'The same form as a short stay, with the transit purpose selected.',
        ],
        pt: [
          'Formulário Schengen marcado como trânsito',
          'O mesmo formulário da estada curta, com o propósito de trânsito selecionado.',
        ],
        es: [
          'Formulario Schengen marcado como tránsito',
          'El mismo formulario de la estancia corta, con el propósito de tránsito seleccionado.',
        ],
      },
      {
        en: [
          'Confirmed onward ticket',
          'Showing the whole journey, with the connection at Schiphol and the final destination.',
        ],
        pt: [
          'Bilhete de continuação confirmado',
          'Mostrando toda a jornada, com a conexão em Schiphol e o destino final.',
        ],
        es: [
          'Billete de continuación confirmado',
          'Que muestre todo el trayecto, con la conexión en Schiphol y el destino final.',
        ],
      },
      {
        en: [
          'Visa for the final destination',
          'If the destination country requires one, it has to be granted before the transit visa is issued.',
        ],
        pt: [
          'Visto do destino final',
          'Se o país de destino exigir um, ele precisa estar concedido antes de o visto de trânsito ser emitido.',
        ],
        es: [
          'Visado del destino final',
          'Si el país de destino lo exige, debe estar concedido antes de emitir el visado de tránsito.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence of funds for the journey',
          'A light requirement, since you never enter the country.',
        ],
        pt: [
          'Comprovação de recursos para a jornada',
          'Exigência leve, já que você nunca entra no país.',
        ],
        es: [
          'Prueba de fondos para el trayecto',
          'Requisito ligero, ya que nunca entra en el país.',
        ],
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply well before the flight',
          'A transit visa cannot be obtained on arrival at the airport.',
        ],
        pt: [
          'Pedir bem antes do voo',
          'O visto de trânsito não pode ser obtido na chegada ao aeroporto.',
        ],
        es: [
          'Solicitar bastante antes del vuelo',
          'El visado de tránsito no se puede obtener al llegar al aeropuerto.',
        ],
      },
      {
        en: ['Pay the transit visa fee', 'Lower than the short-stay fee.'],
        pt: [
          'Pagar a taxa de visto de trânsito',
          'Mais baixa que a de curta duração.',
        ],
        es: [
          'Pagar la tasa de visado de tránsito',
          'Más baja que la de corta duración.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection',
          'Taken when the application is submitted, as for any Schengen visa.',
        ],
        pt: [
          'Recolha de dados biométricos',
          'Feita na entrega do pedido, como em qualquer visto Schengen.',
        ],
        es: [
          'Recogida de datos biométricos',
          'Se realiza al presentar la solicitud, como en cualquier visado Schengen.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Stay inside the international transit area',
          'This visa does not permit entering the Netherlands, not even overnight.',
        ],
        pt: [
          'Permanecer dentro da área de trânsito internacional',
          'Este visto não permite entrar nos Países Baixos, nem para pernoitar.',
        ],
        es: [
          'Permanecer dentro de la zona de tránsito internacional',
          'Este visado no permite entrar en Países Bajos, ni siquiera para pernoctar.',
        ],
      },
      {
        en: [
          'Apply for a short-stay visa if you need to leave the airport',
          'An overnight stop outside the transit area needs the ordinary Schengen visa instead.',
        ],
        pt: [
          'Pedir visto de curta duração se precisar sair do aeroporto',
          'Uma parada com pernoite fora da área de trânsito exige o visto Schengen comum.',
        ],
        es: [
          'Solicitar un visado de corta duración si necesita salir del aeropuerto',
          'Una parada con pernoctación fuera de la zona de tránsito exige el visado Schengen ordinario.',
        ],
      },
    ],
  },

  'MVV Authorisation & Long-Stay Visa (for stays over 90 days)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Should cover the period of residence applied for.',
        ],
        pt: [
          'Passaporte válido',
          'Deve cobrir o período de residência pedido.',
        ],
        es: [
          'Pasaporte vigente',
          'Debe cubrir el periodo de residencia solicitado.',
        ],
      },
      {
        en: [
          'Check whether you are exempt from the MVV',
          'Nationals of a handful of countries are exempt and go straight to the residence permit. Everyone else needs the authorisation first.',
        ],
        pt: [
          'Verificar se você é isento de MVV',
          'Nacionais de um punhado de países são isentos e vão direto ao título de residência. Os demais precisam da autorização antes.',
        ],
        es: [
          'Comprobar si está exento de MVV',
          'Los nacionales de unos pocos países están exentos y van directamente al permiso de residencia. Los demás necesitan la autorización antes.',
        ],
      },
      {
        en: [
          'Sponsor in the Netherlands',
          'An employer, an educational institution or a family member files the TEV application with the IND on your behalf. You do not lodge it at a consulate.',
        ],
        pt: [
          'Patrocinador nos Países Baixos',
          'Um empregador, uma instituição de ensino ou um familiar protocola o pedido TEV junto ao IND em seu nome. Você não protocola num consulado.',
        ],
        es: [
          'Patrocinador en Países Bajos',
          'Un empleador, una institución educativa o un familiar presenta la solicitud TEV ante el IND en su nombre. Usted no la presenta en un consulado.',
        ],
      },
      {
        en: [
          'Birth certificate, legalised',
          'Apostilled or legalised and translated by a sworn translator. The IND is strict about this.',
        ],
        pt: [
          'Certidão de nascimento legalizada',
          'Apostilada ou legalizada e traduzida por tradutor juramentado. O IND é rigoroso nisso.',
        ],
        es: [
          'Partida de nacimiento legalizada',
          'Apostillada o legalizada y traducida por traductor jurado. El IND es estricto con esto.',
        ],
      },
      {
        en: [
          'Antecedents certificate',
          'A signed declaration about your criminal history, part of the standard IND pack.',
        ],
        pt: [
          'Declaração de antecedentes',
          'Uma declaração assinada sobre seu histórico criminal, parte do pacote padrão do IND.',
        ],
        es: [
          'Declaración de antecedentes',
          'Una declaración firmada sobre su historial penal, parte del paquete estándar del IND.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Civic integration exam abroad',
          'Required on some family migration routes, taken at a Dutch mission before the MVV is issued.',
        ],
        pt: [
          'Exame de integração cívica no exterior',
          'Exigido em algumas rotas de migração familiar, feito numa representação neerlandesa antes de o MVV ser emitido.',
        ],
        es: [
          'Examen de integración cívica en el extranjero',
          'Exigido en algunas vías de migración familiar, se hace en una representación neerlandesa antes de emitir el MVV.',
        ],
        required: false,
      },
      {
        en: [
          'Diplomas and academic transcripts',
          'Legalised, and evaluated where the route depends on the level of the qualification.',
        ],
        pt: [
          'Diplomas e históricos escolares',
          'Legalizados, e avaliados quando a rota depende do nível da qualificação.',
        ],
        es: [
          'Títulos y expedientes académicos',
          'Legalizados, y evaluados cuando la vía depende del nivel de la titulación.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Sponsor’s income meeting the threshold',
          'Assessed against the Dutch minimum wage and it must be durable, not a one-off month.',
        ],
        pt: [
          'Renda do patrocinador atingindo o piso',
          'Avaliada contra o salário mínimo neerlandês, e precisa ser duradoura, não um mês isolado.',
        ],
        es: [
          'Ingresos del patrocinador que alcancen el umbral',
          'Se evalúan contra el salario mínimo neerlandés, y deben ser duraderos, no un mes aislado.',
        ],
      },
      {
        en: [
          'Salary meeting the criterion for the route',
          'The highly skilled migrant threshold is set annually and differs for applicants under 30.',
        ],
        pt: [
          'Salário atingindo o critério da rota',
          'O piso do migrante altamente qualificado é fixado anualmente e é diferente para menores de 30 anos.',
        ],
        es: [
          'Salario que alcance el criterio de la vía',
          'El umbral del migrante altamente cualificado se fija anualmente y difiere para menores de 30 años.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Proof of funds for students',
          'A set amount for the academic year, often paid into the institution’s account in advance.',
        ],
        pt: [
          'Comprovação de recursos para estudantes',
          'Um valor determinado para o ano letivo, muitas vezes depositado antecipadamente na conta da instituição.',
        ],
        es: [
          'Prueba de fondos para estudiantes',
          'Un importe determinado para el año académico, a menudo ingresado por adelantado en la cuenta de la institución.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Sponsor lodges the TEV application with the IND',
          'A recognised sponsor gets a much shorter decision period, which is why employers register as one.',
        ],
        pt: [
          'Patrocinador protocola o pedido TEV no IND',
          'Um patrocinador reconhecido tem prazo de decisão bem menor, e é por isso que empregadores se registam como tal.',
        ],
        es: [
          'El patrocinador presenta la solicitud TEV ante el IND',
          'Un patrocinador reconocido obtiene un plazo de decisión mucho menor, y por eso los empleadores se registran como tal.',
        ],
      },
      {
        en: [
          'Pay the IND fee',
          'Paid by whoever lodges the application, and not refunded on refusal.',
        ],
        pt: [
          'Pagar a taxa do IND',
          'Paga por quem protocola o pedido, e não devolvida em caso de indeferimento.',
        ],
        es: [
          'Pagar la tasa del IND',
          'La paga quien presenta la solicitud, y no se devuelve si deniegan.',
        ],
      },
      {
        en: [
          'Collect the MVV sticker at the Dutch mission',
          'Once the IND approves, you have three months to collect it and travel.',
        ],
        pt: [
          'Retirar o adesivo MVV na representação neerlandesa',
          'Aprovado pelo IND, você tem três meses para retirá-lo e viajar.',
        ],
        es: [
          'Recoger la pegatina MVV en la representación neerlandesa',
          'Una vez que el IND aprueba, tiene tres meses para recogerla y viajar.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection at the mission',
          'Taken when you collect the MVV.',
        ],
        pt: [
          'Recolha de dados biométricos na representação',
          'Feita quando você retira o MVV.',
        ],
        es: [
          'Recogida de datos biométricos en la representación',
          'Se realiza cuando recoge el MVV.',
        ],
      },
      {
        en: [
          'Tuberculosis test after arrival',
          'Required from nationals of certain countries, done in the Netherlands within three months of arrival, not before departure.',
        ],
        pt: [
          'Teste de tuberculose após a chegada',
          'Exigido a nacionais de determinados países, feito nos Países Baixos em até três meses da chegada, não antes da partida.',
        ],
        es: [
          'Prueba de tuberculosis tras la llegada',
          'Exigida a nacionales de ciertos países, se hace en Países Bajos en los tres meses siguientes a la llegada, no antes de viajar.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Travel within the MVV validity',
          'The MVV is valid for 90 days and is the entry document, not the residence itself.',
        ],
        pt: [
          'Viajar dentro da validade do MVV',
          'O MVV vale 90 dias e é o documento de entrada, não a residência em si.',
        ],
        es: [
          'Viajar dentro de la validez del MVV',
          'El MVV vale 90 días y es el documento de entrada, no la residencia en sí.',
        ],
      },
      {
        en: [
          'Collect the residence card at an IND desk',
          'Booked in advance; the card is what actually evidences your right to stay.',
        ],
        pt: [
          'Retirar o cartão de residência num balcão do IND',
          'Agendado com antecedência; o cartão é o que de fato comprova seu direito de permanecer.',
        ],
        es: [
          'Recoger la tarjeta de residencia en una oficina del IND',
          'Con cita previa; la tarjeta es lo que realmente acredita su derecho a permanecer.',
        ],
      },
      {
        en: [
          'Register in the BRP at the municipality',
          'This produces the BSN, without which you cannot be paid, insured or taxed correctly.',
        ],
        pt: [
          'Registar-se no BRP no município',
          'É o que gera o BSN, sem o qual não dá para receber salário, ter seguro nem ser tributado corretamente.',
        ],
        es: [
          'Inscribirse en el BRP en el ayuntamiento',
          'Es lo que genera el BSN, sin el cual no puede cobrar, asegurarse ni tributar correctamente.',
        ],
      },
      {
        en: [
          'Take out Dutch health insurance',
          'Compulsory within four months of arrival for most residents, and there are fines for not doing it.',
        ],
        pt: [
          'Contratar seguro de saúde neerlandês',
          'Obrigatório em até quatro meses da chegada para a maioria dos residentes, e há multa por não fazê-lo.',
        ],
        es: [
          'Contratar un seguro de salud neerlandés',
          'Obligatorio en los cuatro meses siguientes a la llegada para la mayoría de los residentes, y hay multas por no hacerlo.',
        ],
        priority: 2,
      },
    ],
  },

  'Residence Permit / Work & Study Visas': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Plus the MVV, if your nationality required one.',
        ],
        pt: [
          'Passaporte válido',
          'Além do MVV, se sua nacionalidade exigiu um.',
        ],
        es: [
          'Pasaporte vigente',
          'Además del MVV, si su nacionalidad lo exigió.',
        ],
      },
      {
        en: [
          'Employment contract or letter of enrolment',
          'The document that defines the purpose the permit is granted for.',
        ],
        pt: [
          'Contrato de trabalho ou carta de matrícula',
          'O documento que define o propósito para o qual o título é concedido.',
        ],
        es: [
          'Contrato de trabajo o carta de matrícula',
          'El documento que define el propósito para el que se concede el permiso.',
        ],
      },
      {
        en: [
          'Recognised sponsor registration',
          'Employers and institutions must be on the IND public register to sponsor highly skilled migrants or students.',
        ],
        pt: [
          'Registo de patrocinador reconhecido',
          'Empregadores e instituições precisam constar do registo público do IND para patrocinar migrantes altamente qualificados ou estudantes.',
        ],
        es: [
          'Registro de patrocinador reconocido',
          'Empleadores e instituciones deben figurar en el registro público del IND para patrocinar a migrantes altamente cualificados o estudiantes.',
        ],
      },
      {
        en: [
          'Antecedents certificate',
          'Signed as part of the application pack.',
        ],
        pt: [
          'Declaração de antecedentes',
          'Assinada como parte do pacote do pedido.',
        ],
        es: [
          'Declaración de antecedentes',
          'Firmada como parte del paquete de la solicitud.',
        ],
      },
      {
        en: [
          'Proof of a Dutch address',
          'A rental contract, needed both for the permit and for the municipal registration.',
        ],
        pt: [
          'Comprovativo de morada nos Países Baixos',
          'Um contrato de arrendamento, necessário tanto para o título quanto para o registo municipal.',
        ],
        es: [
          'Comprobante de domicilio en Países Bajos',
          'Un contrato de alquiler, necesario tanto para el permiso como para el registro municipal.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Qualification evaluation where required',
          'Some routes turn on the level of the degree, and the assessment is done by the designated Dutch body.',
        ],
        pt: [
          'Avaliação da qualificação quando exigida',
          'Algumas rotas dependem do nível do diploma, e a avaliação é feita pelo órgão neerlandês designado.',
        ],
        es: [
          'Evaluación de la titulación cuando se exija',
          'Algunas vías dependen del nivel del título, y la evaluación la hace el organismo neerlandés designado.',
        ],
        required: false,
      },
      {
        en: [
          'Proof of English or Dutch for the course',
          'Set by the institution; most master programmes are taught in English.',
        ],
        pt: [
          'Comprovação de inglês ou neerlandês para o curso',
          'Definida pela instituição; a maioria dos mestrados é lecionada em inglês.',
        ],
        es: [
          'Prueba de inglés o neerlandés para el curso',
          'La fija la institución; la mayoría de los másteres se imparte en inglés.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Salary or funds meeting the criterion',
          'Checked again when the permit is renewed, so a salary that drops below the threshold puts the permit at risk.',
        ],
        pt: [
          'Salário ou recursos atingindo o critério',
          'Reconferidos na renovação do título, então salário que cai abaixo do piso põe o título em risco.',
        ],
        es: [
          'Salario o fondos que alcancen el criterio',
          'Se comprueban de nuevo al renovar el permiso, así que un salario que caiga por debajo del umbral pone el permiso en riesgo.',
        ],
      },
      {
        en: [
          'Apply for the expatriate tax facility if eligible',
          'The scheme reduces taxable income for incoming employees; the employer applies and the terms have been revised more than once, so check what applies now.',
        ],
        pt: [
          'Pedir o regime fiscal para expatriados se elegível',
          'O regime reduz a base tributável de empregados vindos do exterior; quem pede é o empregador, e as regras já foram revistas mais de uma vez — confira o que vale agora.',
        ],
        es: [
          'Solicitar el régimen fiscal para expatriados si es elegible',
          'El régimen reduce la base imponible de los empleados que llegan del extranjero; lo solicita el empleador, y las condiciones se han revisado más de una vez: compruebe qué rige ahora.',
        ],
        priority: 3,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Sponsor lodges the residence permit application',
          'Usually combined with the MVV in a single TEV procedure.',
        ],
        pt: [
          'Patrocinador protocola o pedido de título de residência',
          'Em geral combinado com o MVV num único procedimento TEV.',
        ],
        es: [
          'El patrocinador presenta la solicitud del permiso de residencia',
          'Por lo general combinada con el MVV en un único procedimiento TEV.',
        ],
      },
      {
        en: [
          'Pay the IND fee for the permit',
          'Separate from the fee for any later change of purpose.',
        ],
        pt: [
          'Pagar a taxa do IND pelo título',
          'Separada da taxa de uma eventual mudança de propósito depois.',
        ],
        es: [
          'Pagar la tasa del IND por el permiso',
          'Independiente de la tasa de un eventual cambio de propósito después.',
        ],
      },
      {
        en: [
          'Apply for renewal before expiry',
          'A gap in the permit breaks the continuous residence that permanent status depends on.',
        ],
        pt: [
          'Pedir a renovação antes do vencimento',
          'Uma lacuna no título quebra a residência contínua de que depende o status permanente.',
        ],
        es: [
          'Solicitar la renovación antes del vencimiento',
          'Un vacío en el permiso rompe la residencia continua de la que depende el estatus permanente.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection at the IND',
          'Taken when the residence card is issued.',
        ],
        pt: [
          'Recolha de dados biométricos no IND',
          'Feita na emissão do cartão de residência.',
        ],
        es: [
          'Recogida de datos biométricos en el IND',
          'Se realiza al emitir la tarjeta de residencia.',
        ],
      },
      {
        en: [
          'Dutch health insurance within four months',
          'Compulsory for residents who work here; students on some routes use a different arrangement.',
        ],
        pt: [
          'Seguro de saúde neerlandês em até quatro meses',
          'Obrigatório para residentes que trabalham no país; estudantes em algumas rotas usam um arranjo diferente.',
        ],
        es: [
          'Seguro de salud neerlandés en cuatro meses',
          'Obligatorio para residentes que trabajan en el país; los estudiantes en algunas vías usan un arreglo distinto.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the residence card and check the endorsement',
          'The back of the card states whether you may work freely, only with a permit, or not at all.',
        ],
        pt: [
          'Retirar o cartão de residência e conferir a anotação',
          'O verso do cartão diz se você pode trabalhar livremente, só com autorização, ou não pode.',
        ],
        es: [
          'Recoger la tarjeta de residencia y revisar la anotación',
          'El reverso de la tarjeta indica si puede trabajar libremente, solo con permiso, o no puede.',
        ],
      },
      {
        en: [
          'Register with a general practitioner',
          'In the Dutch system the GP is the gateway to all other care.',
        ],
        pt: [
          'Registar-se num médico de família',
          'No sistema neerlandês o médico de família é a porta de entrada para todo o resto do cuidado.',
        ],
        es: [
          'Registrarse con un médico de cabecera',
          'En el sistema neerlandés el médico de cabecera es la puerta a toda la demás atención.',
        ],
        priority: 2,
      },
      {
        en: [
          'Activate DigiD',
          'The national digital identity, needed for taxes, healthcare and almost every public service.',
        ],
        pt: [
          'Ativar o DigiD',
          'A identidade digital nacional, necessária para impostos, saúde e quase todo serviço público.',
        ],
        es: [
          'Activar DigiD',
          'La identidad digital nacional, necesaria para impuestos, sanidad y casi todo servicio público.',
        ],
      },
      {
        en: [
          'Plan for the civic integration requirement',
          'Permanent residence and naturalisation both require passing the integration exam, which takes time to prepare for.',
        ],
        pt: [
          'Planejar o requisito de integração cívica',
          'Tanto a residência permanente quanto a naturalização exigem aprovação no exame de integração, que leva tempo para preparar.',
        ],
        es: [
          'Planificar el requisito de integración cívica',
          'Tanto la residencia permanente como la naturalización exigen aprobar el examen de integración, que lleva tiempo preparar.',
        ],
        priority: 3,
        required: false,
      },
    ],
  },
};
