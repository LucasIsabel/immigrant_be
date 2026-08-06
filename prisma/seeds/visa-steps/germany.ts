import type { CountryVisaSteps } from './types';

/**
 * Steps for Germany.
 *
 * The Skilled Immigration Act reform changed the landscape here: the EU Blue
 * Card salary thresholds came down, the points-based Opportunity Card was
 * introduced for job seekers, and Blue Card holders now reach settlement in
 * well under the ordinary five years. Anything written before that is out of
 * date on all three counts.
 *
 * The recurring trap is procedural rather than documentary: the national visa
 * only gets you in. Registering the address at the Bürgeramt and then
 * collecting the residence title at the Ausländerbehörde are what actually
 * establish you, and both have their own queues.
 */
export const germany: CountryVisaSteps = {
  'Short-Term (Schengen) Visa (Type C)': {
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
          'VIDEX application form, printed and signed',
          'Germany fills the Schengen form through the VIDEX portal; the printout carries a barcode the mission scans.',
        ],
        pt: [
          'Formulário VIDEX impresso e assinado',
          'A Alemanha preenche o formulário Schengen pelo portal VIDEX; a impressão traz um código de barras que a representação lê.',
        ],
        es: [
          'Formulario VIDEX impreso y firmado',
          'Alemania cumplimenta el formulario Schengen por el portal VIDEX; la impresión lleva un código de barras que la representación escanea.',
        ],
      },
      {
        en: [
          'Two biometric photographs',
          'To the German standard, which is stricter than most on head size and expression.',
        ],
        pt: [
          'Duas fotografias biométricas',
          'No padrão alemão, mais rígido que a maioria quanto ao tamanho da cabeça e à expressão.',
        ],
        es: [
          'Dos fotografías biométricas',
          'Según el estándar alemán, más estricto que la mayoría en tamaño de la cabeza y expresión.',
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
      {
        en: [
          'Return flight reservation',
          'A reservation only — do not buy the ticket before the visa is granted.',
        ],
        pt: [
          'Reserva de voo de volta',
          'Apenas a reserva — não compre o bilhete antes de o visto ser concedido.',
        ],
        es: [
          'Reserva de vuelo de vuelta',
          'Solo la reserva: no compre el billete antes de que concedan el visado.',
        ],
      },
      {
        en: [
          'Proof of accommodation',
          'Hotel booking, or a formal Verpflichtungserklärung signed by your host at their local authority.',
        ],
        pt: [
          'Comprovativo de alojamento',
          'Reserva de hotel, ou uma Verpflichtungserklärung formal assinada pelo anfitrião na repartição local dele.',
        ],
        es: [
          'Comprobante de alojamiento',
          'Reserva de hotel, o una Verpflichtungserklärung formal firmada por el anfitrión en su ayuntamiento.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of means for the stay',
          'Germany works to a daily figure per person. Check the amount in force at the mission covering your area.',
        ],
        pt: [
          'Comprovação de meios para a estada',
          'A Alemanha trabalha com um valor diário por pessoa. Confira o montante em vigor na representação que atende sua região.',
        ],
        es: [
          'Prueba de medios para la estancia',
          'Alemania trabaja con una cifra diaria por persona. Consulte el importe vigente en la representación que cubre su zona.',
        ],
      },
      {
        en: [
          'Bank statements from the last three months',
          'A balance that appeared days before the application is read as staged.',
        ],
        pt: [
          'Extratos bancários dos últimos três meses',
          'Saldo que apareceu dias antes do pedido é lido como montado para a ocasião.',
        ],
        es: [
          'Extractos bancarios de los últimos tres meses',
          'Un saldo que apareció días antes de la solicitud se lee como preparado para la ocasión.',
        ],
      },
      {
        en: [
          'Proof of employment and approved leave',
          'An employer letter with the position, salary and the authorised dates.',
        ],
        pt: [
          'Comprovativo de vínculo laboral e férias aprovadas',
          'Carta do empregador com cargo, salário e as datas autorizadas.',
        ],
        es: [
          'Comprobante de vínculo laboral y vacaciones aprobadas',
          'Carta del empleador con el cargo, el salario y las fechas autorizadas.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Book the appointment at the German mission',
          'Germany handles many Schengen applications directly rather than through an outsourcer, and the queues can be long.',
        ],
        pt: [
          'Agendar atendimento na representação alemã',
          'A Alemanha atende muitos pedidos Schengen diretamente, sem terceirizar, e as filas podem ser longas.',
        ],
        es: [
          'Reservar cita en la representación alemana',
          'Alemania atiende muchas solicitudes Schengen directamente, sin externalizar, y las colas pueden ser largas.',
        ],
      },
      {
        en: [
          'Pay the visa fee',
          'Non-refundable if the application is refused.',
        ],
        pt: [
          'Pagar a taxa do visto',
          'Não reembolsável em caso de indeferimento.',
        ],
        es: [
          'Pagar la tasa del visado',
          'No reembolsable si deniegan la solicitud.',
        ],
      },
      {
        en: [
          'Submit the application in person',
          'Take originals and a full set of copies; the copies are kept.',
        ],
        pt: [
          'Entregar o pedido presencialmente',
          'Leve originais e um jogo completo de cópias; as cópias ficam retidas.',
        ],
        es: [
          'Presentar la solicitud en persona',
          'Lleve originales y un juego completo de copias; las copias se quedan.',
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
          'Counted across the whole Schengen area on a rolling basis, not per calendar year.',
        ],
        pt: [
          'Respeitar a regra dos 90 dias em cada 180',
          'Contados em todo o espaço Schengen de forma móvel, não por ano civil.',
        ],
        es: [
          'Respetar la regla de 90 días en cada 180',
          'Se cuentan en todo el espacio Schengen de forma móvil, no por año natural.',
        ],
      },
      {
        en: [
          'Do not work on a short-stay visa',
          'It covers tourism, family visits and business meetings, never paid activity.',
        ],
        pt: [
          'Não trabalhar com visto de curta duração',
          'Ele cobre turismo, visita a familiares e reuniões de negócios, nunca atividade remunerada.',
        ],
        es: [
          'No trabajar con visado de corta duración',
          'Cubre turismo, visitas familiares y reuniones de negocios, nunca actividad remunerada.',
        ],
      },
    ],
  },

  'Long-Term National Visa / Residence Permit (Type D) for work, study, training, family reunion':
    {
      core_documents: [
        {
          en: [
            'Valid passport',
            'Should cover the intended period of residence.',
          ],
          pt: [
            'Passaporte válido',
            'Deve cobrir o período de residência pretendido.',
          ],
          es: [
            'Pasaporte vigente',
            'Debe cubrir el periodo de residencia previsto.',
          ],
        },
        {
          en: [
            'National visa application form',
            'Different from the Schengen form. State the exact purpose: work, study, training or family reunion.',
          ],
          pt: [
            'Formulário de visto nacional',
            'Diferente do formulário Schengen. Indique o propósito exato: trabalho, estudo, formação ou reagrupamento familiar.',
          ],
          es: [
            'Formulario de visado nacional',
            'Distinto del formulario Schengen. Indique el propósito exacto: trabajo, estudio, formación o reagrupación familiar.',
          ],
        },
        {
          en: ['Two biometric photographs', 'To the German standard.'],
          pt: ['Duas fotografias biométricas', 'No padrão alemão.'],
          es: ['Dos fotografías biométricas', 'Según el estándar alemán.'],
        },
        {
          en: [
            'Document justifying the purpose',
            'An employment contract, a university admission letter, a training contract, or the family documents — this is the backbone of the file.',
          ],
          pt: [
            'Documento que justifica o propósito',
            'Contrato de trabalho, carta de admissão universitária, contrato de formação ou os documentos familiares — é a espinha dorsal do processo.',
          ],
          es: [
            'Documento que justifica el propósito',
            'Contrato de trabajo, carta de admisión universitaria, contrato de formación o los documentos familiares: es la columna del expediente.',
          ],
        },
        {
          en: [
            'Certified translations into German',
            'Foreign documents need a sworn translation, and often an apostille as well.',
          ],
          pt: [
            'Traduções juramentadas para o alemão',
            'Documentos estrangeiros exigem tradução juramentada e, muitas vezes, também apostila.',
          ],
          es: [
            'Traducciones juradas al alemán',
            'Los documentos extranjeros exigen traducción jurada y, a menudo, también apostilla.',
          ],
        },
      ],
      education: [
        {
          en: [
            'Recognition of the foreign qualification',
            'Checked in the ANABIN database, or through a formal recognition procedure. For regulated professions this comes before anything else.',
          ],
          pt: [
            'Reconhecimento da qualificação estrangeira',
            'Consultado na base ANABIN, ou por procedimento formal de reconhecimento. Em profissões regulamentadas, isso vem antes de tudo.',
          ],
          es: [
            'Reconocimiento de la titulación extranjera',
            'Se consulta en la base ANABIN, o mediante un procedimiento formal de reconocimiento. En profesiones reguladas, esto va antes que nada.',
          ],
        },
        {
          en: [
            'Diplomas and academic transcripts',
            'Originals plus sworn translations.',
          ],
          pt: [
            'Diplomas e históricos escolares',
            'Originais mais traduções juramentadas.',
          ],
          es: [
            'Títulos y expedientes académicos',
            'Originales más traducciones juradas.',
          ],
        },
        {
          en: [
            'Proof of German or English at the required level',
            'The level depends on the route: a training contract or family reunion usually needs German, while many skilled roles accept English.',
          ],
          pt: [
            'Comprovação de alemão ou inglês no nível exigido',
            'O nível depende da rota: contrato de formação ou reagrupamento familiar em geral exige alemão, enquanto muitas vagas qualificadas aceitam inglês.',
          ],
          es: [
            'Prueba de alemán o inglés en el nivel exigido',
            'El nivel depende de la vía: un contrato de formación o la reagrupación familiar suele exigir alemán, mientras que muchos puestos cualificados aceptan inglés.',
          ],
        },
      ],
      financial_requirements: [
        {
          en: [
            'Proof of secure livelihood',
            'A salary above the threshold for the route, or a blocked account covering a year for students.',
          ],
          pt: [
            'Comprovação de sustento garantido',
            'Salário acima do piso da rota, ou uma conta bloqueada cobrindo um ano no caso de estudantes.',
          ],
          es: [
            'Prueba de sustento asegurado',
            'Salario por encima del umbral de la vía, o una cuenta bloqueada que cubra un año en el caso de estudiantes.',
          ],
        },
        {
          en: [
            'Blocked account (Sperrkonto)',
            'The standard proof for students and job seekers; the balance is released in monthly instalments.',
          ],
          pt: [
            'Conta bloqueada (Sperrkonto)',
            'É a comprovação padrão para estudantes e candidatos a emprego; o saldo é liberado em parcelas mensais.',
          ],
          es: [
            'Cuenta bloqueada (Sperrkonto)',
            'Es la prueba estándar para estudiantes y buscadores de empleo; el saldo se libera en cuotas mensuales.',
          ],
          priority: 2,
          required: false,
        },
        {
          en: [
            'Salary meeting the EU Blue Card threshold',
            'The thresholds came down with the reform, and are lower still for shortage occupations and recent graduates.',
          ],
          pt: [
            'Salário que atinge o piso do Cartão Azul UE',
            'Os pisos caíram com a reforma, e são ainda menores em profissões em falta e para recém-formados.',
          ],
          es: [
            'Salario que alcanza el umbral de la Tarjeta Azul UE',
            'Los umbrales bajaron con la reforma, y son aún menores en profesiones deficitarias y para recién titulados.',
          ],
          priority: 2,
          required: false,
        },
      ],
      submission_fees: [
        {
          en: [
            'Book the appointment for a national visa',
            'These slots are far scarcer than Schengen ones; in some countries the wait runs to months.',
          ],
          pt: [
            'Agendar atendimento para visto nacional',
            'Essas vagas são muito mais escassas que as Schengen; em alguns países a espera chega a meses.',
          ],
          es: [
            'Reservar cita para visado nacional',
            'Estas citas son mucho más escasas que las Schengen; en algunos países la espera llega a meses.',
          ],
        },
        {
          en: ['Pay the national visa fee', 'Higher than the short-stay fee.'],
          pt: [
            'Pagar a taxa de visto nacional',
            'Mais alta que a de curta duração.',
          ],
          es: [
            'Pagar la tasa de visado nacional',
            'Más alta que la de corta duración.',
          ],
        },
        {
          en: [
            'Wait for the Ausländerbehörde to consent',
            'The mission usually has to consult the immigration office in the German city where you will live, and that is what makes the process slow.',
          ],
          pt: [
            'Aguardar a anuência da Ausländerbehörde',
            'A representação em geral precisa consultar o órgão de imigração da cidade alemã onde você vai morar, e é isso que torna o processo lento.',
          ],
          es: [
            'Esperar la conformidad de la Ausländerbehörde',
            'La representación suele tener que consultar a la oficina de extranjería de la ciudad alemana donde vivirá, y eso es lo que hace lento el proceso.',
          ],
        },
      ],
      biometrics_health: [
        {
          en: [
            'Biometric data collection',
            'Taken when the application is submitted.',
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
            'Health insurance valid in Germany',
            'Cover from the first day. Statutory insurance through the employer, or a private policy that meets the legal minimum.',
          ],
          pt: [
            'Seguro de saúde válido na Alemanha',
            'Cobertura desde o primeiro dia. Seguro legal pelo empregador, ou apólice privada que cumpra o mínimo legal.',
          ],
          es: [
            'Seguro de salud válido en Alemania',
            'Cobertura desde el primer día. Seguro legal por el empleador, o una póliza privada que cumpla el mínimo legal.',
          ],
        },
      ],
      post_approval_steps: [
        {
          en: [
            'Enter Germany within the visa validity',
            'The national visa is normally valid for three months — long enough to travel and start the local formalities.',
          ],
          pt: [
            'Entrar na Alemanha dentro da validade do visto',
            'O visto nacional costuma valer três meses — o suficiente para viajar e iniciar as formalidades locais.',
          ],
          es: [
            'Entrar en Alemania dentro de la validez del visado',
            'El visado nacional suele valer tres meses: lo justo para viajar e iniciar los trámites locales.',
          ],
        },
        {
          en: [
            'Register the address at the Bürgeramt',
            'The Anmeldung has a legal deadline after moving in, and nothing else works without it — no bank account, no tax number, no residence title.',
          ],
          pt: [
            'Registar a morada no Bürgeramt',
            'O Anmeldung tem prazo legal após a mudança, e nada mais funciona sem ele — nem conta bancária, nem número fiscal, nem título de residência.',
          ],
          es: [
            'Registrar el domicilio en el Bürgeramt',
            'El Anmeldung tiene plazo legal tras la mudanza, y nada más funciona sin él: ni cuenta bancaria, ni número fiscal, ni título de residencia.',
          ],
        },
        {
          en: [
            'Apply for the residence title at the Ausländerbehörde',
            'The visa is only the entry document. This appointment is what turns it into an Aufenthaltstitel, and it should be booked before you even arrive.',
          ],
          pt: [
            'Pedir o título de residência na Ausländerbehörde',
            'O visto é só o documento de entrada. É este atendimento que o converte em Aufenthaltstitel, e ele deve ser agendado antes mesmo de você chegar.',
          ],
          es: [
            'Solicitar el título de residencia en la Ausländerbehörde',
            'El visado es solo el documento de entrada. Esta cita es la que lo convierte en Aufenthaltstitel, y conviene reservarla antes incluso de llegar.',
          ],
        },
        {
          en: [
            'Open a bank account and get the tax number',
            'The tax ID arrives by post after the Anmeldung; without it the employer withholds at the highest rate.',
          ],
          pt: [
            'Abrir conta bancária e obter o número fiscal',
            'O tax ID chega pelo correio após o Anmeldung; sem ele o empregador retém na alíquota máxima.',
          ],
          es: [
            'Abrir cuenta bancaria y obtener el número fiscal',
            'El tax ID llega por correo tras el Anmeldung; sin él el empleador retiene al tipo máximo.',
          ],
          priority: 2,
        },
        {
          en: [
            'Enrol in an integration course',
            'Not compulsory on every route, but the German level it gives is required later for settlement and for citizenship.',
          ],
          pt: [
            'Inscrever-se num curso de integração',
            'Não é obrigatório em toda rota, mas o nível de alemão que ele dá é exigido depois para o assentamento e para a cidadania.',
          ],
          es: [
            'Inscribirse en un curso de integración',
            'No es obligatorio en todas las vías, pero el nivel de alemán que aporta se exige después para el asentamiento y para la ciudadanía.',
          ],
          priority: 3,
          required: false,
        },
      ],
    },

  'Settlement Permit (Permanent Residence – Niederlassungserlaubnis)': {
    core_documents: [
      {
        en: ['Valid passport', 'Plus the residence title you currently hold.'],
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
          'Application form for the settlement permit',
          'Filed at the Ausländerbehörde of your city, not at a consulate.',
        ],
        pt: [
          'Formulário de pedido do título de estabelecimento',
          'Protocolado na Ausländerbehörde da sua cidade, não num consulado.',
        ],
        es: [
          'Formulario de solicitud del permiso de establecimiento',
          'Se presenta en la Ausländerbehörde de su ciudad, no en un consulado.',
        ],
      },
      {
        en: [
          'Proof of the qualifying period of residence',
          'Five years as a rule. EU Blue Card holders reach it far sooner — and sooner still with B1 German.',
        ],
        pt: [
          'Comprovação do período qualificado de residência',
          'Cinco anos como regra. Titulares de Cartão Azul UE chegam lá bem antes — e ainda antes com alemão B1.',
        ],
        es: [
          'Prueba del periodo cualificado de residencia',
          'Cinco años como regla. Los titulares de Tarjeta Azul UE llegan mucho antes, y aún antes con alemán B1.',
        ],
      },
      {
        en: [
          'Registration certificate for your address',
          'The Meldebescheinigung, showing where you have lived and since when.',
        ],
        pt: [
          'Certidão de registo da morada',
          'A Meldebescheinigung, mostrando onde você morou e desde quando.',
        ],
        es: [
          'Certificado de registro del domicilio',
          'La Meldebescheinigung, que muestra dónde ha vivido y desde cuándo.',
        ],
      },
      {
        en: [
          'Evidence of adequate housing',
          'A tenancy agreement showing enough space for everyone living there.',
        ],
        pt: [
          'Comprovação de habitação adequada',
          'Contrato de arrendamento mostrando espaço suficiente para todos os que ali vivem.',
        ],
        es: [
          'Prueba de vivienda adecuada',
          'Contrato de alquiler que muestre espacio suficiente para todos los que viven allí.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Certificate of German at the required level',
          'B1 as a rule, and A1 is enough for a Blue Card holder taking the shortest route. This is what most often sets the timing.',
        ],
        pt: [
          'Certificado de alemão no nível exigido',
          'B1 como regra, e A1 basta para titular de Cartão Azul na rota mais curta. É o que mais determina o momento do pedido.',
        ],
        es: [
          'Certificado de alemán en el nivel exigido',
          'B1 como regla, y A1 basta para un titular de Tarjeta Azul por la vía más corta. Es lo que más determina el momento de la solicitud.',
        ],
      },
      {
        en: [
          'Proof of knowledge of the legal and social order',
          'The Leben in Deutschland test, or a German school leaving certificate.',
        ],
        pt: [
          'Comprovação de conhecimento da ordem jurídica e social',
          'O teste Leben in Deutschland, ou um certificado de conclusão escolar alemão.',
        ],
        es: [
          'Prueba de conocimiento del orden jurídico y social',
          'El examen Leben in Deutschland, o un certificado de fin de estudios alemán.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of secure livelihood without state support',
          'Current payslips and an employment contract, or accounts if you are self-employed.',
        ],
        pt: [
          'Comprovação de sustento garantido sem apoio estatal',
          'Holerites atuais e contrato de trabalho, ou contabilidade se for autônomo.',
        ],
        es: [
          'Prueba de sustento asegurado sin ayudas estatales',
          'Nóminas actuales y contrato de trabajo, o contabilidad si trabaja por cuenta propia.',
        ],
      },
      {
        en: [
          'Pension contribution record',
          'A minimum number of months of compulsory contributions. Blue Card holders need fewer, which is part of why their route is quicker.',
        ],
        pt: [
          'Extrato de contribuições à previdência',
          'Um número mínimo de meses de contribuição obrigatória. Titulares de Cartão Azul precisam de menos, o que é parte do motivo de a rota deles ser mais rápida.',
        ],
        es: [
          'Historial de cotizaciones a la pensión',
          'Un número mínimo de meses de cotización obligatoria. Los titulares de Tarjeta Azul necesitan menos, lo que explica en parte que su vía sea más rápida.',
        ],
      },
      {
        en: [
          'Proof of health insurance',
          'Continuous cover throughout the period of residence.',
        ],
        pt: [
          'Comprovação de seguro de saúde',
          'Cobertura contínua ao longo de todo o período de residência.',
        ],
        es: [
          'Prueba de seguro de salud',
          'Cobertura continua a lo largo de todo el periodo de residencia.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Book the appointment at the Ausländerbehörde',
          'Waiting times vary sharply by city; Berlin and Munich are the slowest.',
        ],
        pt: [
          'Agendar atendimento na Ausländerbehörde',
          'Os prazos variam muito por cidade; Berlim e Munique são os mais lentos.',
        ],
        es: [
          'Reservar cita en la Ausländerbehörde',
          'Los plazos varían mucho según la ciudad; Berlín y Múnich son los más lentos.',
        ],
      },
      {
        en: [
          'Pay the settlement permit fee',
          'Reduced for holders of certain titles.',
        ],
        pt: [
          'Pagar a taxa do título de estabelecimento',
          'Reduzida para titulares de determinados títulos.',
        ],
        es: [
          'Pagar la tasa del permiso de establecimiento',
          'Reducida para titulares de determinados títulos.',
        ],
      },
      {
        en: [
          'Apply before the current title expires',
          'Letting it lapse breaks the continuity the whole application rests on.',
        ],
        pt: [
          'Pedir antes de o título atual vencer',
          'Deixá-lo caducar quebra a continuidade sobre a qual todo o pedido se apoia.',
        ],
        es: [
          'Solicitar antes de que caduque el título actual',
          'Dejarlo caducar rompe la continuidad sobre la que se apoya toda la solicitud.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection for the card',
          'Taken at the appointment; the card arrives by post weeks later.',
        ],
        pt: [
          'Recolha de dados biométricos para o cartão',
          'Feita no atendimento; o cartão chega pelo correio semanas depois.',
        ],
        es: [
          'Recogida de datos biométricos para la tarjeta',
          'Se realiza en la cita; la tarjeta llega por correo semanas después.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the settlement permit',
          'It is open-ended and no longer tied to an employer or a purpose.',
        ],
        pt: [
          'Retirar o título de estabelecimento',
          'Ele é por prazo indeterminado e deixa de estar vinculado a um empregador ou a um propósito.',
        ],
        es: [
          'Recoger el permiso de establecimiento',
          'Es indefinido y deja de estar ligado a un empleador o a un propósito.',
        ],
      },
      {
        en: [
          'Note that long absences can still end it',
          'Leaving Germany for more than six months without prior authorisation extinguishes the permit.',
        ],
        pt: [
          'Saber que ausências longas ainda podem extingui-lo',
          'Sair da Alemanha por mais de seis meses sem autorização prévia extingue o título.',
        ],
        es: [
          'Saber que las ausencias largas aún pueden extinguirlo',
          'Salir de Alemania más de seis meses sin autorización previa extingue el permiso.',
        ],
      },
      {
        en: [
          'Consider applying for citizenship',
          'The reform shortened the qualifying period and allows dual nationality, so for many people it now follows soon after settlement.',
        ],
        pt: [
          'Avaliar o pedido de cidadania',
          'A reforma encurtou o prazo e passou a permitir dupla nacionalidade, então para muita gente ela agora vem pouco depois do assentamento.',
        ],
        es: [
          'Evaluar la solicitud de ciudadanía',
          'La reforma acortó el plazo y permite la doble nacionalidad, así que para mucha gente ahora llega poco después del asentamiento.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
