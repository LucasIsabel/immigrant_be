import type { CountryVisaSteps } from './types';

/**
 * Steps for Portugal.
 *
 * SEF was wound up in 2023 and its competences passed to AIMA, so anything
 * still naming SEF is out of date. The residence-permit appointment happens at
 * AIMA after arrival — the visa alone is only the entry document, which is the
 * distinction that trips people up most here.
 */
export const portugal: CountryVisaSteps = {
  'Short-Stay Visa (Schengen Type C)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Valid for at least three months beyond the departure date and issued within the last ten years.',
        ],
        pt: [
          'Passaporte válido',
          'Válido por pelo menos três meses além da data de saída e emitido nos últimos dez anos.',
        ],
        es: [
          'Pasaporte vigente',
          'Vigente al menos tres meses más allá de la fecha de salida y emitido en los últimos diez años.',
        ],
      },
      {
        en: [
          'Schengen application form, signed',
          'One form per traveller, including minors, each signed by the person responsible.',
        ],
        pt: [
          'Formulário Schengen preenchido e assinado',
          'Um formulário por viajante, inclusive menores, cada um assinado por quem responde por ele.',
        ],
        es: [
          'Formulario Schengen cumplimentado y firmado',
          'Un formulario por viajero, incluidos menores, cada uno firmado por su responsable.',
        ],
      },
      {
        en: [
          'Two passport photographs',
          'Recent, on a light background, meeting the ICAO standard.',
        ],
        pt: [
          'Duas fotografias tipo passe',
          'Recentes, em fundo claro, conforme a norma ICAO.',
        ],
        es: [
          'Dos fotografías tipo carné',
          'Recientes, con fondo claro, conforme a la norma ICAO.',
        ],
      },
      {
        en: [
          'Return flight reservation',
          'A reservation is enough — do not buy the ticket before the visa is granted.',
        ],
        pt: [
          'Reserva de voo de ida e volta',
          'Basta a reserva — não compre o bilhete antes de o visto ser concedido.',
        ],
        es: [
          'Reserva de vuelo de ida y vuelta',
          'Basta con la reserva: no compre el billete antes de que concedan el visado.',
        ],
      },
      {
        en: [
          'Proof of accommodation',
          'Hotel booking, rental contract, or a termo de responsabilidade from your host certified at a junta de freguesia.',
        ],
        pt: [
          'Comprovativo de alojamento',
          'Reserva de hotel, contrato de arrendamento ou termo de responsabilidade do anfitrião reconhecido na junta de freguesia.',
        ],
        es: [
          'Comprobante de alojamiento',
          'Reserva de hotel, contrato de arrendamiento o termo de responsabilidade del anfitrión certificado en la junta de freguesia.',
        ],
      },
      {
        en: [
          'Travel medical insurance',
          'Minimum cover of 30,000 euros, valid across the whole Schengen area for the entire stay.',
        ],
        pt: [
          'Seguro médico de viagem',
          'Cobertura mínima de 30 mil euros, válida em todo o espaço Schengen durante toda a estada.',
        ],
        es: [
          'Seguro médico de viaje',
          'Cobertura mínima de 30 mil euros, válida en todo el espacio Schengen durante toda la estancia.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of means of subsistence',
          'Portugal sets a fixed amount plus a daily amount per person. Check the figure in force before you book the appointment.',
        ],
        pt: [
          'Comprovativo de meios de subsistência',
          'Portugal exige um valor fixo mais um valor por dia e por pessoa. Confira o montante em vigor antes de marcar o atendimento.',
        ],
        es: [
          'Comprobante de medios de subsistencia',
          'Portugal exige un importe fijo más una cantidad por día y persona. Consulte la cifra vigente antes de reservar la cita.',
        ],
      },
      {
        en: [
          'Bank statements from the last three months',
          'They have to show a consistent balance, not a deposit made days before the application.',
        ],
        pt: [
          'Extratos bancários dos últimos três meses',
          'Precisam mostrar saldo consistente, não um depósito feito dias antes do pedido.',
        ],
        es: [
          'Extractos bancarios de los últimos tres meses',
          'Deben mostrar un saldo consistente, no un depósito hecho días antes de la solicitud.',
        ],
      },
      {
        en: [
          'Proof of employment and approved leave',
          'A letter from the employer stating the position, salary and the dates of authorised leave.',
        ],
        pt: [
          'Comprovativo de vínculo laboral e férias aprovadas',
          'Carta do empregador com cargo, salário e as datas de férias autorizadas.',
        ],
        es: [
          'Comprobante de vínculo laboral y vacaciones aprobadas',
          'Carta del empleador con el cargo, el salario y las fechas de vacaciones autorizadas.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Book an appointment at the visa application centre',
          'Portugal outsources collection; the slot, not the consulate queue, is what sets your timeline.',
        ],
        pt: [
          'Marcar atendimento no centro de pedidos de visto',
          'Portugal terceiriza a recolha; quem define seu prazo é a vaga de atendimento, não a fila do consulado.',
        ],
        es: [
          'Reservar cita en el centro de solicitudes de visado',
          'Portugal externaliza la recogida; lo que marca su plazo es la cita, no la cola del consulado.',
        ],
      },
      {
        en: [
          'Pay the visa fee and the service charge',
          'Two separate amounts: the consular fee and the centre’s own charge.',
        ],
        pt: [
          'Pagar a taxa de visto e a taxa de serviço',
          'São dois valores distintos: a taxa consular e a taxa do próprio centro.',
        ],
        es: [
          'Pagar la tasa de visado y la tasa de servicio',
          'Son dos importes distintos: la tasa consular y la del propio centro.',
        ],
      },
      {
        en: [
          'Submit the application in person',
          'Take originals and copies; the centre keeps the copies.',
        ],
        pt: [
          'Entregar o pedido presencialmente',
          'Leve originais e cópias; o centro fica com as cópias.',
        ],
        es: [
          'Presentar la solicitud en persona',
          'Lleve originales y copias; el centro se queda con las copias.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection',
          'Fingerprints stay on file for 59 months, so a later Schengen application may reuse them.',
        ],
        pt: [
          'Recolha de dados biométricos',
          'As impressões ficam registadas por 59 meses, então um pedido Schengen posterior pode reaproveitá-las.',
        ],
        es: [
          'Recogida de datos biométricos',
          'Las huellas quedan registradas 59 meses, así que una solicitud Schengen posterior puede reutilizarlas.',
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
          'Check the validity dates and the number of entries granted before you travel.',
        ],
        pt: [
          'Levantar o passaporte com o visto',
          'Confira as datas de validade e o número de entradas concedidas antes de viajar.',
        ],
        es: [
          'Recoger el pasaporte con el visado',
          'Verifique las fechas de validez y el número de entradas concedidas antes de viajar.',
        ],
      },
      {
        en: [
          'Respect the 90 days in any 180 rule',
          'The count is across the whole Schengen area, not Portugal alone, and it is rolling rather than per calendar year.',
        ],
        pt: [
          'Respeitar a regra dos 90 dias em cada 180',
          'A contagem é de todo o espaço Schengen, não só de Portugal, e é móvel, não por ano civil.',
        ],
        es: [
          'Respetar la regla de 90 días en cada 180',
          'El cómputo es de todo el espacio Schengen, no solo de Portugal, y es móvil, no por año natural.',
        ],
      },
      {
        en: [
          'Do not work on a short-stay visa',
          'It permits tourism, family visits and business meetings, but not paid activity.',
        ],
        pt: [
          'Não trabalhar com visto de curta duração',
          'Ele permite turismo, visita a familiares e reuniões de negócios, mas não atividade remunerada.',
        ],
        es: [
          'No trabajar con visado de corta duración',
          'Permite turismo, visitas familiares y reuniones de negocios, pero no actividad remunerada.',
        ],
      },
    ],
  },

  'Temporary Stay Visa': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Must cover the whole intended stay plus three months.',
        ],
        pt: [
          'Passaporte válido',
          'Precisa cobrir toda a estada pretendida mais três meses.',
        ],
        es: [
          'Pasaporte vigente',
          'Debe cubrir toda la estancia prevista más tres meses.',
        ],
      },
      {
        en: [
          'National visa application form',
          'Different from the Schengen form used for short stays.',
        ],
        pt: [
          'Formulário de pedido de visto nacional',
          'Diferente do formulário Schengen usado nas estadas curtas.',
        ],
        es: [
          'Formulario de solicitud de visado nacional',
          'Distinto del formulario Schengen usado en las estancias cortas.',
        ],
      },
      {
        en: [
          'Two passport photographs',
          'Recent, on a light background, meeting the ICAO standard.',
        ],
        pt: [
          'Duas fotografias tipo passe',
          'Recentes, em fundo claro, conforme a norma ICAO.',
        ],
        es: [
          'Dos fotografías tipo carné',
          'Recientes, con fondo claro, conforme a la norma ICAO.',
        ],
      },
      {
        en: [
          'Criminal record certificate',
          'From your country of nationality and from anywhere you lived over a year, apostilled and recent.',
        ],
        pt: [
          'Certificado de registo criminal',
          'Do país de nacionalidade e de onde tenha residido mais de um ano, apostilado e recente.',
        ],
        es: [
          'Certificado de antecedentes penales',
          'Del país de nacionalidad y de donde haya residido más de un año, apostillado y reciente.',
        ],
      },
      {
        en: [
          'Authorisation to consult the Portuguese criminal record',
          'A specific signed form. Omitting it is one of the commonest reasons a file is returned.',
        ],
        pt: [
          'Autorização de consulta do registo criminal português',
          'É um formulário próprio, assinado. Esquecê-lo é um dos motivos mais comuns de devolução do processo.',
        ],
        es: [
          'Autorización para consultar el registro penal portugués',
          'Es un formulario propio, firmado. Omitirlo es uno de los motivos más comunes de devolución del expediente.',
        ],
      },
      {
        en: [
          'Document justifying the purpose of the stay',
          'What counts depends on the ground: medical treatment, seasonal work, a course under a year, or a remote work contract.',
        ],
        pt: [
          'Documento que justifica o motivo da estada',
          'O que vale depende do fundamento: tratamento médico, trabalho sazonal, curso de menos de um ano ou contrato de trabalho remoto.',
        ],
        es: [
          'Documento que justifica el motivo de la estancia',
          'Lo que cuenta depende del fundamento: tratamiento médico, trabajo de temporada, curso de menos de un año o contrato de trabajo remoto.',
        ],
      },
      {
        en: [
          'Proof of accommodation in Portugal',
          'Rental contract, property deed or a certified termo de responsabilidade.',
        ],
        pt: [
          'Comprovativo de alojamento em Portugal',
          'Contrato de arrendamento, escritura ou termo de responsabilidade reconhecido.',
        ],
        es: [
          'Comprobante de alojamiento en Portugal',
          'Contrato de arrendamiento, escritura o termo de responsabilidade certificado.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of means of subsistence for the period',
          'Usually indexed to the Portuguese minimum wage, multiplied by the months you will stay.',
        ],
        pt: [
          'Comprovativo de meios de subsistência para o período',
          'Em geral indexado ao salário mínimo português, multiplicado pelos meses de permanência.',
        ],
        es: [
          'Comprobante de medios de subsistencia para el periodo',
          'Suele indexarse al salario mínimo portugués, multiplicado por los meses de estancia.',
        ],
      },
      {
        en: [
          'Bank statements from the last six months',
          'A longer window than for short stays, because the consulate is assessing stability rather than a single trip.',
        ],
        pt: [
          'Extratos bancários dos últimos seis meses',
          'Janela maior que a das estadas curtas, porque aqui o consulado avalia estabilidade, não uma viagem isolada.',
        ],
        es: [
          'Extractos bancarios de los últimos seis meses',
          'Ventana mayor que en las estancias cortas, porque aquí el consulado evalúa estabilidad, no un viaje aislado.',
        ],
      },
      {
        en: [
          'Portuguese tax number (NIF)',
          'Not always demanded for the visa, but you cannot rent, open an account or sign anything without it.',
        ],
        pt: [
          'Número de identificação fiscal (NIF)',
          'Nem sempre exigido para o visto, mas sem ele não se arrenda, não se abre conta e não se assina nada.',
        ],
        es: [
          'Número de identificación fiscal (NIF)',
          'No siempre se exige para el visado, pero sin él no se alquila, no se abre cuenta ni se firma nada.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Book an appointment at the visa application centre',
          'National visas take longer than Schengen ones; count on months rather than weeks.',
        ],
        pt: [
          'Marcar atendimento no centro de pedidos de visto',
          'Vistos nacionais demoram mais que os Schengen; conte com meses, não semanas.',
        ],
        es: [
          'Reservar cita en el centro de solicitudes de visado',
          'Los visados nacionales tardan más que los Schengen; cuente con meses, no semanas.',
        ],
      },
      {
        en: [
          'Pay the national visa fee',
          'Higher than the short-stay fee and not refunded if the application is refused.',
        ],
        pt: [
          'Pagar a taxa de visto nacional',
          'Mais alta que a de curta duração e não devolvida em caso de indeferimento.',
        ],
        es: [
          'Pagar la tasa de visado nacional',
          'Más alta que la de corta duración y no se devuelve si deniegan la solicitud.',
        ],
      },
      {
        en: [
          'Submit the file in person',
          'Every foreign document needs an apostille and, where it is not in Portuguese, a certified translation.',
        ],
        pt: [
          'Entregar o processo presencialmente',
          'Todo documento estrangeiro precisa de apostila e, se não estiver em português, de tradução certificada.',
        ],
        es: [
          'Presentar el expediente en persona',
          'Todo documento extranjero necesita apostilla y, si no está en portugués, traducción certificada.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection',
          'Taken when you submit the application.',
        ],
        pt: [
          'Recolha de dados biométricos',
          'Feita no momento da entrega do pedido.',
        ],
        es: [
          'Recogida de datos biométricos',
          'Se realiza al presentar la solicitud.',
        ],
      },
      {
        en: [
          'Health insurance valid in Portugal',
          'Must cover the whole period, including repatriation. Travel insurance for a fortnight is not accepted.',
        ],
        pt: [
          'Seguro de saúde válido em Portugal',
          'Precisa cobrir todo o período, incluindo repatriamento. Seguro de viagem de quinze dias não é aceite.',
        ],
        es: [
          'Seguro de salud válido en Portugal',
          'Debe cubrir todo el periodo, incluida la repatriación. Un seguro de viaje de quince días no se acepta.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the passport with the visa',
          'It comes with two entries and is valid for four months, enough to reach Portugal and go to the appointment.',
        ],
        pt: [
          'Levantar o passaporte com o visto',
          'Ele vem com duas entradas e validade de quatro meses, suficiente para chegar a Portugal e ir ao atendimento.',
        ],
        es: [
          'Recoger el pasaporte con el visado',
          'Viene con dos entradas y validez de cuatro meses, suficiente para llegar a Portugal y acudir a la cita.',
        ],
      },
      {
        en: [
          'Attend the AIMA appointment',
          'The date usually comes already scheduled with the visa. The visa gets you in; this appointment is what turns it into a residence permit.',
        ],
        pt: [
          'Comparecer ao atendimento na AIMA',
          'A data costuma vir já marcada junto com o visto. O visto serve para entrar; é este atendimento que o converte em autorização de residência.',
        ],
        es: [
          'Acudir a la cita en AIMA',
          'La fecha suele venir ya asignada con el visado. El visado sirve para entrar; es esta cita la que lo convierte en autorización de residencia.',
        ],
      },
      {
        en: [
          'Register with the tax authority and with social security',
          'Needed in order to work, to sign a lease and to access public healthcare.',
        ],
        pt: [
          'Inscrever-se nas Finanças e na Segurança Social',
          'Necessário para trabalhar, arrendar e aceder ao sistema público de saúde.',
        ],
        es: [
          'Inscribirse en Hacienda y en la Seguridad Social',
          'Necesario para trabajar, alquilar y acceder al sistema público de salud.',
        ],
        priority: 2,
      },
      {
        en: [
          'Note that temporary stay does not lead to permanent residence',
          'The time counts differently from a residence visa. If the plan is to settle, the Type D route is the right one.',
        ],
        pt: [
          'Saber que a estada temporária não conduz à residência permanente',
          'O tempo conta de forma diferente do visto de residência. Se o plano é fixar-se, a rota certa é a do tipo D.',
        ],
        es: [
          'Saber que la estancia temporal no conduce a la residencia permanente',
          'El tiempo cuenta de forma distinta que en el visado de residencia. Si el plan es establecerse, la vía correcta es la del tipo D.',
        ],
        priority: 2,
      },
    ],
  },

  'Residence Visa (Type D)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Valid for at least three months beyond the visa period requested.',
        ],
        pt: [
          'Passaporte válido',
          'Válido por pelo menos três meses além do período de visto pedido.',
        ],
        es: [
          'Pasaporte vigente',
          'Vigente al menos tres meses más allá del periodo de visado solicitado.',
        ],
      },
      {
        en: [
          'National visa application form',
          'State the exact subtype you are applying under; the supporting documents change with it.',
        ],
        pt: [
          'Formulário de pedido de visto nacional',
          'Indique exatamente o subtipo pedido; a documentação de suporte muda conforme ele.',
        ],
        es: [
          'Formulario de solicitud de visado nacional',
          'Indique exactamente el subtipo solicitado; la documentación de apoyo cambia con él.',
        ],
      },
      {
        en: [
          'Two passport photographs',
          'Recent, on a light background, meeting the ICAO standard.',
        ],
        pt: [
          'Duas fotografias tipo passe',
          'Recentes, em fundo claro, conforme a norma ICAO.',
        ],
        es: [
          'Dos fotografías tipo carné',
          'Recientes, con fondo claro, conforme a la norma ICAO.',
        ],
      },
      {
        en: [
          'Criminal record certificate, apostilled',
          'From your country of nationality and from anywhere you lived over a year. Validity is short, so request it late in the process.',
        ],
        pt: [
          'Certificado de registo criminal apostilado',
          'Do país de nacionalidade e de onde tenha residido mais de um ano. A validade é curta, então peça-o no fim do processo.',
        ],
        es: [
          'Certificado de antecedentes penales apostillado',
          'Del país de nacionalidad y de donde haya residido más de un año. Su validez es corta, así que solicítelo al final del proceso.',
        ],
      },
      {
        en: [
          'Authorisation to consult the Portuguese criminal record',
          'A separate signed form, required in every residence application.',
        ],
        pt: [
          'Autorização de consulta do registo criminal português',
          'Formulário próprio e assinado, exigido em todo pedido de residência.',
        ],
        es: [
          'Autorización para consultar el registro penal portugués',
          'Formulario propio y firmado, exigido en toda solicitud de residencia.',
        ],
      },
      {
        en: [
          'Document supporting the chosen subtype',
          'An employment contract, a business plan, proof of passive income, or a remote work contract — one of these is the backbone of the file.',
        ],
        pt: [
          'Documento que sustenta o subtipo escolhido',
          'Contrato de trabalho, plano de negócios, comprovativo de rendimento passivo ou contrato de trabalho remoto — um deles é a espinha dorsal do processo.',
        ],
        es: [
          'Documento que sustenta el subtipo elegido',
          'Contrato de trabajo, plan de negocio, prueba de renta pasiva o contrato de trabajo remoto: uno de ellos es la columna del expediente.',
        ],
      },
      {
        en: [
          'Proof of accommodation in Portugal',
          'A registered rental contract or a property deed. A hotel booking is generally not accepted for residence.',
        ],
        pt: [
          'Comprovativo de alojamento em Portugal',
          'Contrato de arrendamento registado ou escritura. Reserva de hotel em geral não é aceite para residência.',
        ],
        es: [
          'Comprobante de alojamiento en Portugal',
          'Contrato de arrendamiento registrado o escritura. Una reserva de hotel por lo general no se acepta para residencia.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Diplomas and academic transcripts',
          'For the highly qualified activity subtype, and for study-based residence.',
        ],
        pt: [
          'Diplomas e históricos escolares',
          'Para o subtipo de atividade altamente qualificada e para residência com base em estudo.',
        ],
        es: [
          'Títulos y expedientes académicos',
          'Para el subtipo de actividad altamente cualificada y para la residencia basada en estudios.',
        ],
        required: false,
      },
      {
        en: [
          'Recognition of the foreign qualification',
          'Regulated professions require recognition by the competent Portuguese body before you may practise.',
        ],
        pt: [
          'Reconhecimento da habilitação estrangeira',
          'Profissões regulamentadas exigem reconhecimento pela ordem portuguesa competente antes do exercício.',
        ],
        es: [
          'Reconocimiento de la titulación extranjera',
          'Las profesiones reguladas exigen el reconocimiento del colegio portugués competente antes de ejercer.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of regular income or sufficient savings',
          'The reference is the Portuguese minimum wage over twelve months, with an increment for each family member.',
        ],
        pt: [
          'Comprovativo de rendimento regular ou poupança suficiente',
          'A referência é o salário mínimo português ao longo de doze meses, com acréscimo por familiar.',
        ],
        es: [
          'Comprobante de ingresos regulares o ahorros suficientes',
          'La referencia es el salario mínimo portugués durante doce meses, con un incremento por cada familiar.',
        ],
      },
      {
        en: [
          'Portuguese bank account',
          'Opening one before you travel is possible with a NIF and speeds up everything that follows.',
        ],
        pt: [
          'Conta bancária portuguesa',
          'É possível abrir antes de viajar, com NIF, e isso acelera tudo o que vem depois.',
        ],
        es: [
          'Cuenta bancaria portuguesa',
          'Se puede abrir antes de viajar, con NIF, y agiliza todo lo que viene después.',
        ],
        priority: 2,
      },
      {
        en: [
          'Bank statements from the last six months',
          'The consulate looks for a steady pattern, not a balance that appeared right before the application.',
        ],
        pt: [
          'Extratos bancários dos últimos seis meses',
          'O consulado procura um padrão estável, não um saldo que apareceu pouco antes do pedido.',
        ],
        es: [
          'Extractos bancarios de los últimos seis meses',
          'El consulado busca un patrón estable, no un saldo que apareció justo antes de la solicitud.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Book an appointment at the visa application centre',
          'Slots for residence visas are scarcer than for short stays; plan several months ahead.',
        ],
        pt: [
          'Marcar atendimento no centro de pedidos de visto',
          'As vagas para visto de residência são mais escassas que as de curta duração; planeie com meses de antecedência.',
        ],
        es: [
          'Reservar cita en el centro de solicitudes de visado',
          'Las citas para visado de residencia son más escasas que las de corta duración; planifique con meses de antelación.',
        ],
      },
      {
        en: [
          'Pay the residence visa fee',
          'There is a second fee later, for issuing the residence permit itself in Portugal.',
        ],
        pt: [
          'Pagar a taxa de visto de residência',
          'Há uma segunda taxa mais adiante, para emissão do título de residência já em Portugal.',
        ],
        es: [
          'Pagar la tasa de visado de residencia',
          'Hay una segunda tasa más adelante, para emitir el título de residencia ya en Portugal.',
        ],
      },
      {
        en: [
          'Submit the file in person',
          'Everything foreign needs an apostille and a certified translation into Portuguese.',
        ],
        pt: [
          'Entregar o processo presencialmente',
          'Tudo o que for estrangeiro precisa de apostila e tradução certificada para português.',
        ],
        es: [
          'Presentar el expediente en persona',
          'Todo lo extranjero necesita apostilla y traducción certificada al portugués.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection',
          'Taken when you submit the application, and again at AIMA in Portugal.',
        ],
        pt: [
          'Recolha de dados biométricos',
          'Feita na entrega do pedido e novamente na AIMA, já em Portugal.',
        ],
        es: [
          'Recogida de datos biométricos',
          'Se realiza al presentar la solicitud y de nuevo en AIMA, ya en Portugal.',
        ],
      },
      {
        en: [
          'Health insurance covering the first period',
          'Valid until you join the national health service after registering your residence.',
        ],
        pt: [
          'Seguro de saúde para o período inicial',
          'Válido até você entrar no serviço nacional de saúde após registar a residência.',
        ],
        es: [
          'Seguro de salud para el periodo inicial',
          'Válido hasta que se incorpore al servicio nacional de salud tras registrar la residencia.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Enter Portugal within the visa validity',
          'The visa is valid for four months and two entries — it is the entry document, not the residence itself.',
        ],
        pt: [
          'Entrar em Portugal dentro da validade do visto',
          'O visto vale quatro meses e duas entradas — ele é o documento de entrada, não a residência em si.',
        ],
        es: [
          'Entrar en Portugal dentro de la validez del visado',
          'El visado vale cuatro meses y dos entradas: es el documento de entrada, no la residencia en sí.',
        ],
      },
      {
        en: [
          'Attend the AIMA appointment to collect the residence permit',
          'This is the step that turns the visa into a residence title. Missing it wastes the whole process.',
        ],
        pt: [
          'Comparecer à AIMA para obter o título de residência',
          'É o passo que converte o visto em título de residência. Faltar a ele inutiliza todo o processo.',
        ],
        es: [
          'Acudir a AIMA para obtener el título de residencia',
          'Es el paso que convierte el visado en título de residencia. Faltar a él inutiliza todo el trámite.',
        ],
      },
      {
        en: [
          'Register the address at the local council',
          'The atestado de residência supports later applications, including nationality.',
        ],
        pt: [
          'Registar a morada na junta de freguesia',
          'O atestado de residência sustenta pedidos futuros, inclusive o de nacionalidade.',
        ],
        es: [
          'Registrar el domicilio en la junta de freguesia',
          'El atestado de residência respalda solicitudes futuras, incluida la de nacionalidad.',
        ],
        priority: 2,
      },
      {
        en: [
          'Renew the permit before it expires',
          'The first title is temporary. Letting it lapse breaks the continuity that permanent residence depends on.',
        ],
        pt: [
          'Renovar o título antes do vencimento',
          'O primeiro título é temporário. Deixá-lo caducar quebra a continuidade de que depende a residência permanente.',
        ],
        es: [
          'Renovar el título antes de que caduque',
          'El primer título es temporal. Dejarlo caducar rompe la continuidad de la que depende la residencia permanente.',
        ],
      },
      {
        en: [
          'Start learning Portuguese early',
          'A2 level is required for permanent residence and for nationality; five years pass faster than the certificate arrives.',
        ],
        pt: [
          'Começar cedo a aprender português',
          'O nível A2 é exigido para residência permanente e para a nacionalidade; cinco anos passam mais depressa do que o certificado chega.',
        ],
        es: [
          'Empezar pronto a aprender portugués',
          'El nivel A2 se exige para la residencia permanente y para la nacionalidad; cinco años pasan más rápido de lo que llega el certificado.',
        ],
        priority: 3,
        required: false,
      },
    ],
  },

  'Permanent Residence / Long-Term Resident': {
    core_documents: [
      {
        en: ['Valid passport', 'Plus the residence permit you currently hold.'],
        pt: [
          'Passaporte válido',
          'Além do título de residência de que é atualmente titular.',
        ],
        es: [
          'Pasaporte vigente',
          'Además del título de residencia del que sea titular actualmente.',
        ],
      },
      {
        en: [
          'Proof of five years of legal residence',
          'Continuous, counted from the first temporary permit. Absences beyond the permitted limit reset the count.',
        ],
        pt: [
          'Comprovativo de cinco anos de residência legal',
          'Contínuos, contados a partir do primeiro título temporário. Ausências acima do limite permitido zeram a contagem.',
        ],
        es: [
          'Prueba de cinco años de residencia legal',
          'Continuos, contados desde el primer título temporal. Las ausencias por encima del límite permitido reinician el cómputo.',
        ],
      },
      {
        en: [
          'Updated criminal record certificate',
          'Portuguese, and from your country of nationality.',
        ],
        pt: [
          'Certificado de registo criminal atualizado',
          'Português e do país de nacionalidade.',
        ],
        es: [
          'Certificado de antecedentes penales actualizado',
          'Portugués y del país de nacionalidad.',
        ],
      },
      {
        en: [
          'Proof of address in Portugal',
          'A registered lease, a deed, or a certificate from the junta de freguesia.',
        ],
        pt: [
          'Comprovativo de morada em Portugal',
          'Contrato de arrendamento registado, escritura ou atestado da junta de freguesia.',
        ],
        es: [
          'Comprobante de domicilio en Portugal',
          'Contrato de arrendamiento registrado, escritura o certificado de la junta de freguesia.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Certificate of Portuguese at A2 level',
          'From a recognised centre, or a school certificate. This is what most often delays the application.',
        ],
        pt: [
          'Certificado de português nível A2',
          'De centro reconhecido, ou certificado escolar. É o que mais atrasa o pedido.',
        ],
        es: [
          'Certificado de portugués nivel A2',
          'De un centro reconocido, o certificado escolar. Es lo que más retrasa la solicitud.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of stable and regular means of subsistence',
          'Assessed over the period, not on a single month.',
        ],
        pt: [
          'Comprovativo de meios de subsistência estáveis e regulares',
          'Avaliados ao longo do período, não num único mês.',
        ],
        es: [
          'Comprobante de medios de subsistencia estables y regulares',
          'Se evalúan a lo largo del periodo, no en un solo mes.',
        ],
      },
      {
        en: [
          'Tax situation in order',
          'A clearance certificate from the tax authority and from social security.',
        ],
        pt: [
          'Situação fiscal regularizada',
          'Certidão de não dívida das Finanças e da Segurança Social.',
        ],
        es: [
          'Situación fiscal regularizada',
          'Certificado de estar al corriente con Hacienda y la Seguridad Social.',
        ],
      },
      {
        en: [
          'Income tax returns for the period of residence',
          'They evidence both the income and the continuity of your stay.',
        ],
        pt: [
          'Declarações de IRS do período de residência',
          'Comprovam ao mesmo tempo o rendimento e a continuidade da permanência.',
        ],
        es: [
          'Declaraciones de IRPF del periodo de residencia',
          'Acreditan a la vez los ingresos y la continuidad de la estancia.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: ['Apply at AIMA', 'Filed inside Portugal, not at a consulate.'],
        pt: [
          'Submeter o pedido na AIMA',
          'É feito dentro de Portugal, não num consulado.',
        ],
        es: [
          'Presentar la solicitud en AIMA',
          'Se hace dentro de Portugal, no en un consulado.',
        ],
      },
      {
        en: [
          'Pay the permanent residence fee',
          'Different from the temporary permit renewal fee.',
        ],
        pt: [
          'Pagar a taxa de residência permanente',
          'Diferente da taxa de renovação do título temporário.',
        ],
        es: [
          'Pagar la tasa de residencia permanente',
          'Distinta de la tasa de renovación del título temporal.',
        ],
      },
      {
        en: [
          'Keep the temporary permit valid while the decision is pending',
          'Analysis takes months and letting the current title lapse in the meantime creates a gap.',
        ],
        pt: [
          'Manter o título temporário válido enquanto aguarda a decisão',
          'A análise leva meses e deixar o título atual caducar nesse intervalo cria uma lacuna.',
        ],
        es: [
          'Mantener vigente el título temporal mientras se resuelve',
          'El análisis tarda meses y dejar caducar el título actual en ese intervalo genera un vacío.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: ['Biometric data collection', 'Taken at the AIMA appointment.'],
        pt: ['Recolha de dados biométricos', 'Feita no atendimento da AIMA.'],
        es: ['Recogida de datos biométricos', 'Se realiza en la cita de AIMA.'],
      },
      {
        en: [
          'Registration with the national health service',
          'Evidence of it also helps to show continuity of residence.',
        ],
        pt: [
          'Inscrição no serviço nacional de saúde',
          'O comprovativo também ajuda a demonstrar continuidade de residência.',
        ],
        es: [
          'Inscripción en el servicio nacional de salud',
          'El comprobante también ayuda a demostrar la continuidad de la residencia.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the permanent residence title',
          'Renewed every five years, but the right itself no longer expires.',
        ],
        pt: [
          'Levantar o título de residência permanente',
          'Renovado a cada cinco anos, mas o direito em si já não caduca.',
        ],
        es: [
          'Recoger el título de residencia permanente',
          'Se renueva cada cinco años, pero el derecho en sí ya no caduca.',
        ],
      },
      {
        en: [
          'Note that long absences can still cost you the status',
          'Leaving the European Union for a prolonged period may end long-term resident status.',
        ],
        pt: [
          'Saber que ausências longas ainda podem custar o estatuto',
          'Sair da União Europeia por período prolongado pode fazer cessar o estatuto de residente de longa duração.',
        ],
        es: [
          'Saber que las ausencias largas aún pueden costar el estatus',
          'Salir de la Unión Europea por un periodo prolongado puede hacer cesar el estatus de residente de larga duración.',
        ],
      },
      {
        en: [
          'Consider applying for nationality',
          'The legal residence requirement runs in parallel, and for many people it is reached around the same time.',
        ],
        pt: [
          'Avaliar o pedido de nacionalidade',
          'O requisito de residência legal corre em paralelo e, para muita gente, é atingido por volta da mesma altura.',
        ],
        es: [
          'Evaluar la solicitud de nacionalidad',
          'El requisito de residencia legal corre en paralelo y, para mucha gente, se alcanza por la misma época.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
