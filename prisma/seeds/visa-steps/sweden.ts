import type { CountryVisaSteps } from './types';

/**
 * Steps for Sweden.
 *
 * The concept that gates everything after arrival is the personnummer. Without
 * it you cannot open a bank account, get a phone contract, register with a
 * health centre or be paid normally — and it is issued by the tax agency, not
 * by the migration agency, on a separate visit. People arrive expecting the
 * residence permit to be enough and find that it is only half the story.
 *
 * Work permits also carry a rule worth knowing before negotiating an offer: the
 * job must have been advertised across the EU and EEA before it can be offered
 * to a non-EU candidate, and the salary must meet a maintenance threshold that
 * has been raised.
 */
export const sweden: CountryVisaSteps = {
  'Short-stay Visa (Schengen visa up to 90 days)': {
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
          'Online Schengen application',
          'Filed through the migration agency website, which produces the form to print and sign.',
        ],
        pt: [
          'Pedido Schengen online',
          'Feito pelo site da agência de migração, que gera o formulário para imprimir e assinar.',
        ],
        es: [
          'Solicitud Schengen en línea',
          'Se hace por el sitio de la agencia de migración, que genera el formulario para imprimir y firmar.',
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
          'A hotel booking, or a signed invitation from your host with a copy of their identity document.',
        ],
        pt: [
          'Comprovativo de alojamento ou convite',
          'Reserva de hotel, ou convite assinado do anfitrião com cópia do documento de identidade dele.',
        ],
        es: [
          'Comprobante de alojamiento o invitación',
          'Reserva de hotel, o invitación firmada del anfitrión con copia de su documento de identidad.',
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
          'A daily amount per person, lower if your accommodation and meals are already paid for.',
        ],
        pt: [
          'Comprovativo de meios de subsistência',
          'Um valor diário por pessoa, menor se alojamento e refeições já estiverem pagos.',
        ],
        es: [
          'Comprobante de medios de subsistencia',
          'Un importe diario por persona, menor si el alojamiento y las comidas ya están pagados.',
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
          'Book the appointment at the mission or partner centre',
          'Sweden is represented by another Schengen state in several countries; check who handles applications where you live.',
        ],
        pt: [
          'Agendar atendimento na representação ou centro parceiro',
          'A Suécia é representada por outro Estado Schengen em vários países; verifique quem atende onde você mora.',
        ],
        es: [
          'Reservar cita en la representación o centro asociado',
          'Suecia está representada por otro Estado Schengen en varios países; compruebe quién atiende donde vive.',
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
          'Working requires a permit applied for and granted before you travel.',
        ],
        pt: [
          'Não trabalhar com visto de curta duração',
          'Trabalhar exige uma autorização pedida e concedida antes de você viajar.',
        ],
        es: [
          'No trabajar con visado de corta duración',
          'Trabajar exige un permiso solicitado y concedido antes de viajar.',
        ],
      },
    ],
  },

  'Residence Permit (for stay over 90 days – work, study, family reunification)':
    {
      core_documents: [
        {
          en: [
            'Valid passport',
            'The permit is never granted for longer than the passport validity, so renew it first if it is close to expiring.',
          ],
          pt: [
            'Passaporte válido',
            'A autorização nunca é concedida por prazo maior que a validade do passaporte, então renove-o antes se estiver perto de vencer.',
          ],
          es: [
            'Pasaporte vigente',
            'El permiso nunca se concede por más tiempo que la vigencia del pasaporte, así que renuévelo antes si está por caducar.',
          ],
        },
        {
          en: [
            'Online application with the migration agency',
            'Everything is filed and followed digitally; the employer or institution completes their part first.',
          ],
          pt: [
            'Pedido online na agência de migração',
            'Tudo é protocolado e acompanhado digitalmente; o empregador ou a instituição preenche a parte deles antes.',
          ],
          es: [
            'Solicitud en línea ante la agencia de migración',
            'Todo se presenta y se sigue digitalmente; el empleador o la institución completa su parte antes.',
          ],
        },
        {
          en: [
            'Formal job offer from the Swedish employer',
            'Stating salary, working hours and the terms of employment, and it must match a collective agreement or industry practice.',
          ],
          pt: [
            'Oferta formal de emprego do empregador sueco',
            'Com salário, jornada e condições de trabalho, e precisa estar alinhada a acordo coletivo ou à prática do setor.',
          ],
          es: [
            'Oferta formal de empleo del empleador sueco',
            'Con salario, jornada y condiciones de trabajo, y debe ajustarse a un convenio colectivo o a la práctica del sector.',
          ],
        },
        {
          en: [
            'Evidence the job was advertised across the EU and EEA',
            'The vacancy has to have been open to European candidates for a set period before being offered to you. The employer handles it, but it delays the timeline.',
          ],
          pt: [
            'Comprovação de que a vaga foi anunciada na UE e no EEE',
            'A vaga precisa ter ficado aberta a candidatos europeus por um período antes de ser oferecida a você. Quem cuida disso é o empregador, mas atrasa o cronograma.',
          ],
          es: [
            'Prueba de que la vacante se anunció en la UE y el EEE',
            'La vacante debe haber estado abierta a candidatos europeos durante un periodo antes de ofrecérsela a usted. Lo gestiona el empleador, pero retrasa el calendario.',
          ],
        },
        {
          en: [
            'Documents evidencing the family tie',
            'Marriage or birth certificates for the reunification route, apostilled and translated.',
          ],
          pt: [
            'Documentos que comprovam o vínculo familiar',
            'Certidões de casamento ou nascimento na rota de reagrupamento, apostiladas e traduzidas.',
          ],
          es: [
            'Documentos que acrediten el vínculo familiar',
            'Certificados de matrimonio o nacimiento en la vía de reagrupación, apostillados y traducidos.',
          ],
          priority: 2,
          required: false,
        },
      ],
      education: [
        {
          en: [
            'Letter of admission from the institution',
            'For study permits, from a recognised Swedish university, with the first instalment of fees paid.',
          ],
          pt: [
            'Carta de admissão da instituição',
            'Nas autorizações de estudo, de universidade sueca reconhecida, com a primeira parcela das taxas paga.',
          ],
          es: [
            'Carta de admisión de la institución',
            'En los permisos de estudio, de una universidad sueca reconocida, con el primer plazo de las tasas pagado.',
          ],
          required: false,
        },
        {
          en: [
            'Recognition for regulated professions',
            'Healthcare and teaching require the qualification to be recognised by the relevant Swedish board before you may practise.',
          ],
          pt: [
            'Reconhecimento para profissões regulamentadas',
            'Saúde e ensino exigem reconhecimento da qualificação pelo órgão sueco competente antes do exercício.',
          ],
          es: [
            'Reconocimiento para profesiones reguladas',
            'Sanidad y enseñanza exigen que la titulación sea reconocida por el organismo sueco competente antes de ejercer.',
          ],
          priority: 2,
          required: false,
        },
      ],
      financial_requirements: [
        {
          en: [
            'Salary meeting the maintenance requirement',
            'The threshold was raised and is tied to the national median wage, so confirm the figure in force rather than relying on older guidance.',
          ],
          pt: [
            'Salário que atinge o requisito de manutenção',
            'O piso foi elevado e está atrelado ao salário mediano nacional, então confirme o valor vigente em vez de confiar em orientação antiga.',
          ],
          es: [
            'Salario que alcanza el requisito de manutención',
            'El umbral se elevó y está ligado al salario mediano nacional, así que confirme la cifra vigente en lugar de fiarse de guías antiguas.',
          ],
        },
        {
          en: [
            'Proof of funds for students',
            'A monthly amount for each month of study, held in your own account.',
          ],
          pt: [
            'Comprovação de recursos para estudantes',
            'Um valor mensal por cada mês de estudo, na sua própria conta.',
          ],
          es: [
            'Prueba de fondos para estudiantes',
            'Un importe mensual por cada mes de estudio, en su propia cuenta.',
          ],
          priority: 2,
          required: false,
        },
        {
          en: [
            'Sponsor’s income and housing for family reunification',
            'The person in Sweden must show sufficient income and a home of adequate size.',
          ],
          pt: [
            'Renda e habitação do patrocinador no reagrupamento familiar',
            'A pessoa na Suécia precisa comprovar renda suficiente e uma habitação de tamanho adequado.',
          ],
          es: [
            'Ingresos y vivienda del patrocinador en la reagrupación familiar',
            'La persona en Suecia debe acreditar ingresos suficientes y una vivienda de tamaño adecuado.',
          ],
          priority: 2,
          required: false,
        },
      ],
      submission_fees: [
        {
          en: [
            'Employer or institution starts the application',
            'They fill in their section online and you are then invited to complete yours.',
          ],
          pt: [
            'Empregador ou instituição inicia o pedido',
            'Eles preenchem a parte deles online e depois você é convidado a completar a sua.',
          ],
          es: [
            'El empleador o la institución inicia la solicitud',
            'Rellenan su parte en línea y luego se le invita a completar la suya.',
          ],
        },
        {
          en: [
            'Pay the application fee online',
            'Charged when the application is submitted and not refunded on refusal.',
          ],
          pt: [
            'Pagar a taxa do pedido online',
            'Cobrada no envio e não devolvida em caso de indeferimento.',
          ],
          es: [
            'Pagar la tasa de la solicitud en línea',
            'Se cobra al enviar y no se devuelve si deniegan.',
          ],
        },
        {
          en: [
            'Attend a mission to give biometrics',
            'Once the permit is granted, you visit a Swedish mission to have the residence permit card produced.',
          ],
          pt: [
            'Comparecer a uma representação para dar biometria',
            'Concedida a autorização, você vai a uma representação sueca para o cartão de residência ser produzido.',
          ],
          es: [
            'Acudir a una representación para dar biometría',
            'Concedido el permiso, acude a una representación sueca para que se produzca la tarjeta de residencia.',
          ],
        },
      ],
      biometrics_health: [
        {
          en: [
            'Biometric data collection for the permit card',
            'Fingerprints and photograph, taken at a Swedish mission before travelling.',
          ],
          pt: [
            'Recolha de dados biométricos para o cartão',
            'Impressões digitais e fotografia, feitas numa representação sueca antes de viajar.',
          ],
          es: [
            'Recogida de datos biométricos para la tarjeta',
            'Huellas y fotografía, tomadas en una representación sueca antes de viajar.',
          ],
        },
        {
          en: [
            'Health insurance for the first period',
            'Needed until you are registered in the population register and covered by the public system.',
          ],
          pt: [
            'Seguro de saúde para o período inicial',
            'Necessário até você estar no registo populacional e coberto pelo sistema público.',
          ],
          es: [
            'Seguro de salud para el periodo inicial',
            'Necesario hasta estar en el padrón poblacional y cubierto por el sistema público.',
          ],
        },
      ],
      post_approval_steps: [
        {
          en: [
            'Collect the residence permit card',
            'Delivered before you travel, or at a service centre after arriving.',
          ],
          pt: [
            'Retirar o cartão de autorização de residência',
            'Entregue antes de viajar, ou num centro de atendimento após a chegada.',
          ],
          es: [
            'Recoger la tarjeta de permiso de residencia',
            'Se entrega antes de viajar, o en un centro de atención tras llegar.',
          ],
        },
        {
          en: [
            'Register with the tax agency to get a personnummer',
            'This is the step that unlocks everything else: bank account, healthcare, phone contract, payroll. It is a separate visit from the migration agency.',
          ],
          pt: [
            'Registar-se na agência tributária para obter o personnummer',
            'É o passo que destrava tudo o mais: conta bancária, saúde, contrato de telefone, folha de pagamento. É uma visita separada da agência de migração.',
          ],
          es: [
            'Registrarse en la agencia tributaria para obtener el personnummer',
            'Es el paso que desbloquea todo lo demás: cuenta bancaria, sanidad, contrato de teléfono, nómina. Es una visita aparte de la agencia de migración.',
          ],
        },
        {
          en: [
            'Get a Swedish ID card once you have the personnummer',
            'Banks and public services often ask for it rather than the residence permit card.',
          ],
          pt: [
            'Obter uma identidade sueca depois do personnummer',
            'Bancos e serviços públicos costumam pedi-la em vez do cartão de residência.',
          ],
          es: [
            'Obtener un documento de identidad sueco tras el personnummer',
            'Bancos y servicios públicos suelen pedirlo en lugar de la tarjeta de residencia.',
          ],
          priority: 2,
        },
        {
          en: [
            'Keep working for the employer named on the permit',
            'A work permit is tied to the employer and the occupation for the first period; changing either needs a new application.',
          ],
          pt: [
            'Continuar trabalhando para o empregador indicado na autorização',
            'A autorização de trabalho fica vinculada ao empregador e à ocupação no primeiro período; trocar qualquer um exige novo pedido.',
          ],
          es: [
            'Seguir trabajando para el empleador indicado en el permiso',
            'El permiso de trabajo está ligado al empleador y a la ocupación en el primer periodo; cambiar cualquiera exige una nueva solicitud.',
          ],
        },
        {
          en: [
            'Apply for renewal before the permit expires',
            'Renewal from inside Sweden, and continuity is what leads to permanent residence.',
          ],
          pt: [
            'Pedir a renovação antes de a autorização vencer',
            'A renovação é feita de dentro da Suécia, e a continuidade é o que leva à residência permanente.',
          ],
          es: [
            'Solicitar la renovación antes de que caduque el permiso',
            'La renovación se hace desde dentro de Suecia, y la continuidad es lo que lleva a la residencia permanente.',
          ],
        },
      ],
    },

  'Permanent Residence / Long-Term Residence': {
    core_documents: [
      {
        en: [
          'Valid passport and current residence permit card',
          'The application is made from inside Sweden.',
        ],
        pt: [
          'Passaporte válido e cartão de residência atual',
          'O pedido é feito de dentro da Suécia.',
        ],
        es: [
          'Pasaporte vigente y tarjeta de residencia actual',
          'La solicitud se hace desde dentro de Suecia.',
        ],
      },
      {
        en: [
          'Evidence of the qualifying period of residence',
          'Several years of continuous permits. The period and the conditions were tightened, so check what applies to your permit type.',
        ],
        pt: [
          'Comprovação do período qualificado de residência',
          'Vários anos de autorizações contínuas. O prazo e as condições foram endurecidos, então confira o que se aplica ao seu tipo de autorização.',
        ],
        es: [
          'Prueba del periodo cualificado de residencia',
          'Varios años de permisos continuos. El plazo y las condiciones se endurecieron, así que compruebe qué aplica a su tipo de permiso.',
        ],
      },
      {
        en: [
          'Evidence of an orderly way of life',
          'A clean record; convictions and unpaid debts registered with the enforcement authority count against the application.',
        ],
        pt: [
          'Comprovação de vida em ordem',
          'Ficha limpa; condenações e dívidas registadas na autoridade de execução pesam contra o pedido.',
        ],
        es: [
          'Prueba de una vida ordenada',
          'Historial limpio; condenas y deudas registradas ante la autoridad de ejecución pesan en contra de la solicitud.',
        ],
      },
      {
        en: [
          'Registration in the population register',
          'A certificate showing where and since when you have been registered.',
        ],
        pt: [
          'Registo no cadastro populacional',
          'Uma certidão mostrando onde e desde quando você está registado.',
        ],
        es: [
          'Inscripción en el padrón poblacional',
          'Un certificado que muestre dónde y desde cuándo está registrado.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Ability to support yourself',
          'Employment, self-employment or another lasting income. This maintenance requirement is what most often postpones the application.',
        ],
        pt: [
          'Capacidade de se sustentar',
          'Emprego, atividade autônoma ou outra renda duradoura. É esse requisito de manutenção que mais adia o pedido.',
        ],
        es: [
          'Capacidad de mantenerse',
          'Empleo, actividad por cuenta propia u otra renta duradera. Este requisito de manutención es lo que más aplaza la solicitud.',
        ],
      },
      {
        en: [
          'Evidence the income is durable',
          'A permanent contract, or a fixed-term one long enough to count. Short temporary work usually does not satisfy it.',
        ],
        pt: [
          'Comprovação de que a renda é duradoura',
          'Contrato permanente, ou por prazo determinado longo o suficiente para contar. Trabalho temporário curto em geral não satisfaz.',
        ],
        es: [
          'Prueba de que el ingreso es duradero',
          'Un contrato permanente, o uno temporal lo bastante largo para contar. El trabajo temporal corto no suele bastar.',
        ],
      },
      {
        en: [
          'Pay the application fee',
          'Charged when the application is submitted.',
        ],
        pt: ['Pagar a taxa do pedido', 'Cobrada no momento do envio.'],
        es: [
          'Pagar la tasa de la solicitud',
          'Se cobra al enviar la solicitud.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply online before the current permit expires',
          'A gap between permits breaks the continuity the application rests on.',
        ],
        pt: [
          'Pedir online antes de a autorização atual vencer',
          'Uma lacuna entre autorizações quebra a continuidade sobre a qual o pedido se apoia.',
        ],
        es: [
          'Solicitar en línea antes de que caduque el permiso actual',
          'Un vacío entre permisos rompe la continuidad en que se apoya la solicitud.',
        ],
      },
      {
        en: [
          'Keep working while the decision is pending',
          'You may continue on the previous permit’s terms if you applied before it expired.',
        ],
        pt: [
          'Continuar trabalhando enquanto a decisão está pendente',
          'Você pode seguir nas condições da autorização anterior se pediu antes de ela vencer.',
        ],
        es: [
          'Seguir trabajando mientras se resuelve',
          'Puede continuar en las condiciones del permiso anterior si solicitó antes de que caducara.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection for the new card',
          'Taken at a service centre when the permanent permit is granted.',
        ],
        pt: [
          'Recolha de dados biométricos para o novo cartão',
          'Feita num centro de atendimento quando a autorização permanente é concedida.',
        ],
        es: [
          'Recogida de datos biométricos para la nueva tarjeta',
          'Se realiza en un centro de atención cuando se concede el permiso permanente.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the permanent residence permit card',
          'The permit itself is open-ended; the card is renewed periodically.',
        ],
        pt: [
          'Retirar o cartão de residência permanente',
          'A autorização em si é por prazo indeterminado; o cartão é renovado periodicamente.',
        ],
        es: [
          'Recoger la tarjeta de residencia permanente',
          'El permiso en sí es indefinido; la tarjeta se renueva periódicamente.',
        ],
      },
      {
        en: [
          'Note that long absences can end it',
          'Spending an extended period outside Sweden can cause the permanent permit to lapse.',
        ],
        pt: [
          'Saber que ausências longas podem extingui-la',
          'Passar um período prolongado fora da Suécia pode fazer a autorização permanente caducar.',
        ],
        es: [
          'Saber que las ausencias largas pueden extinguirlo',
          'Pasar un periodo prolongado fuera de Suecia puede hacer caducar el permiso permanente.',
        ],
      },
      {
        en: [
          'Start preparing for the citizenship requirements early',
          'Language and civics tests are being introduced for naturalisation, so plan for them rather than assuming residence alone is enough.',
        ],
        pt: [
          'Começar cedo a preparar os requisitos de cidadania',
          'Testes de idioma e de conhecimentos cívicos estão sendo introduzidos para a naturalização, então planeje-os em vez de supor que a residência basta.',
        ],
        es: [
          'Empezar pronto a preparar los requisitos de ciudadanía',
          'Se están introduciendo exámenes de idioma y de conocimientos cívicos para la naturalización, así que planifíquelos en lugar de suponer que basta la residencia.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
