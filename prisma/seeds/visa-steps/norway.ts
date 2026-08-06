import type { CountryVisaSteps } from './types';

/**
 * Steps for Norway.
 *
 * Norway is in Schengen and the EEA but not in the EU, which matters in one
 * practical way: EU directives on blue cards and long-term residence do not
 * apply, so the routes are purely national.
 *
 * The skilled worker permit has a hard gate people underestimate — the job must
 * genuinely require completed higher education or a vocational qualification,
 * and the pay must match Norwegian collective standards. A general job offer,
 * however well paid, does not qualify if the role itself is unskilled.
 *
 * After arrival, the personal number from the tax office is what makes
 * ordinary life work, and the permanent residence route now includes Norwegian
 * language and social studies requirements.
 */
export const norway: CountryVisaSteps = {
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
          'Online application in the immigration portal',
          'Filed through the UDI application portal, which produces a checklist and a cover sheet.',
        ],
        pt: [
          'Pedido online no portal de imigração',
          'Feito pelo portal da UDI, que gera uma lista de verificação e uma folha de rosto.',
        ],
        es: [
          'Solicitud en línea en el portal de inmigración',
          'Se hace por el portal de la UDI, que genera una lista de verificación y una portada.',
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
          'A hotel booking, or a signed invitation from your host in Norway.',
        ],
        pt: [
          'Comprovativo de alojamento ou convite',
          'Reserva de hotel, ou convite assinado do anfitrião na Noruega.',
        ],
        es: [
          'Comprobante de alojamiento o invitación',
          'Reserva de hotel, o invitación firmada del anfitrión en Noruega.',
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
          'Norway sets a daily figure, and it is high — the cost of living is among the steepest in Europe.',
        ],
        pt: [
          'Comprovativo de meios para a estada',
          'A Noruega fixa um valor diário, e ele é alto — o custo de vida está entre os maiores da Europa.',
        ],
        es: [
          'Comprobante de medios para la estancia',
          'Noruega fija una cifra diaria, y es alta: el coste de vida está entre los más elevados de Europa.',
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
          'Pay the visa fee online',
          'Charged when the application is submitted through the portal.',
        ],
        pt: [
          'Pagar a taxa do visto online',
          'Cobrada no envio do pedido pelo portal.',
        ],
        es: [
          'Pagar la tasa del visado en línea',
          'Se cobra al enviar la solicitud por el portal.',
        ],
      },
      {
        en: [
          'Book the appointment to hand in the documents',
          'At a Norwegian mission or a partner application centre.',
        ],
        pt: [
          'Agendar o atendimento para entregar os documentos',
          'Numa representação norueguesa ou num centro parceiro.',
        ],
        es: [
          'Reservar la cita para entregar los documentos',
          'En una representación noruega o en un centro asociado.',
        ],
      },
      {
        en: [
          'Submit within six months of the intended travel',
          'Applications made earlier than that are not accepted.',
        ],
        pt: [
          'Entregar no máximo seis meses antes da viagem pretendida',
          'Pedidos feitos antes disso não são aceites.',
        ],
        es: [
          'Presentar como mucho seis meses antes del viaje previsto',
          'Las solicitudes hechas antes no se aceptan.',
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
          'Norway is in Schengen, so the days count together with every member state.',
        ],
        pt: [
          'Respeitar a regra dos 90 dias em cada 180',
          'A Noruega está no Schengen, então os dias contam junto com os de todos os Estados-membros.',
        ],
        es: [
          'Respetar la regla de 90 días en cada 180',
          'Noruega está en Schengen, así que los días cuentan junto con los de todos los Estados miembros.',
        ],
      },
      {
        en: [
          'Do not work on a short-stay visa',
          'Even short assignments need a permit applied for in advance.',
        ],
        pt: [
          'Não trabalhar com visto de curta duração',
          'Mesmo trabalhos curtos exigem autorização pedida com antecedência.',
        ],
        es: [
          'No trabajar con visado de corta duración',
          'Incluso los encargos cortos requieren un permiso solicitado con antelación.',
        ],
      },
    ],
  },

  'Residence Permit for Skilled Workers': {
    core_documents: [
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
          'Confirm the role genuinely requires a skilled qualification',
          'The permit is for jobs that require completed higher education or a vocational qualification. A well-paid but unskilled role does not qualify, whatever the salary.',
        ],
        pt: [
          'Confirmar que a função realmente exige qualificação',
          'A autorização é para vagas que exigem ensino superior concluído ou qualificação técnica. Uma função bem paga mas não qualificada não serve, qualquer que seja o salário.',
        ],
        es: [
          'Confirmar que el puesto realmente exige cualificación',
          'El permiso es para empleos que exigen educación superior completa o una cualificación profesional. Un puesto bien pagado pero no cualificado no sirve, sea cual sea el salario.',
        ],
      },
      {
        en: [
          'Offer of employment on the official form',
          'Signed by both you and the employer, on the standard form, stating salary and working conditions.',
        ],
        pt: [
          'Oferta de emprego no formulário oficial',
          'Assinada por você e pelo empregador, no formulário padrão, com salário e condições de trabalho.',
        ],
        es: [
          'Oferta de empleo en el formulario oficial',
          'Firmada por usted y por el empleador, en el formulario estándar, con salario y condiciones de trabajo.',
        ],
      },
      {
        en: [
          'Online application in the immigration portal',
          'Filed and followed through the UDI portal, with the documents uploaded there.',
        ],
        pt: [
          'Pedido online no portal de imigração',
          'Protocolado e acompanhado pelo portal da UDI, com os documentos enviados por lá.',
        ],
        es: [
          'Solicitud en línea en el portal de inmigración',
          'Se presenta y se sigue por el portal de la UDI, con los documentos cargados allí.',
        ],
      },
      {
        en: [
          'Documentation of accommodation in Norway',
          'A rental contract or a written confirmation of where you will live.',
        ],
        pt: [
          'Documentação de alojamento na Noruega',
          'Contrato de aluguel ou confirmação escrita de onde você vai morar.',
        ],
        es: [
          'Documentación del alojamiento en Noruega',
          'Contrato de alquiler o confirmación escrita de dónde vivirá.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Diplomas and academic transcripts',
          'Evidencing the completed qualification the role requires, with translations where needed.',
        ],
        pt: [
          'Diplomas e históricos escolares',
          'Comprovando a qualificação concluída que a função exige, com traduções quando necessário.',
        ],
        es: [
          'Títulos y expedientes académicos',
          'Que acrediten la titulación completa que exige el puesto, con traducciones cuando haga falta.',
        ],
      },
      {
        en: [
          'Recognition of the foreign qualification',
          'Assessed by the Norwegian agency for quality assurance in education; for regulated professions, authorisation from the relevant board comes first.',
        ],
        pt: [
          'Reconhecimento da qualificação estrangeira',
          'Avaliado pela agência norueguesa de garantia de qualidade no ensino; em profissões regulamentadas, a autorização do órgão competente vem antes.',
        ],
        es: [
          'Reconocimiento de la titulación extranjera',
          'Lo evalúa la agencia noruega de aseguramiento de la calidad educativa; en profesiones reguladas, la autorización del organismo competente va antes.',
        ],
      },
      {
        en: [
          'Evidence of vocational qualification',
          'For trades, the certificate plus documentation of the practical training completed.',
        ],
        pt: [
          'Comprovação de qualificação técnica',
          'Nos ofícios, o certificado mais a documentação da formação prática concluída.',
        ],
        es: [
          'Prueba de cualificación profesional',
          'En los oficios, el certificado más la documentación de la formación práctica completada.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Salary matching Norwegian standards',
          'It must match the collective agreement for the sector, or the normal pay for the occupation. Undercutting local pay is itself a ground for refusal.',
        ],
        pt: [
          'Salário compatível com os padrões noruegueses',
          'Precisa corresponder ao acordo coletivo do setor, ou à remuneração normal da ocupação. Pagar abaixo do local é por si só motivo de indeferimento.',
        ],
        es: [
          'Salario acorde con los estándares noruegos',
          'Debe corresponder al convenio colectivo del sector, o a la retribución normal de la ocupación. Pagar por debajo de lo local es por sí solo motivo de denegación.',
        ],
      },
      {
        en: [
          'Full-time position',
          'The role generally has to be full-time; part-time work rarely supports a skilled worker permit.',
        ],
        pt: [
          'Vaga em tempo integral',
          'A função em geral precisa ser em tempo integral; trabalho parcial raramente sustenta uma autorização de trabalhador qualificado.',
        ],
        es: [
          'Puesto a tiempo completo',
          'El puesto por lo general debe ser a tiempo completo; el trabajo parcial rara vez sustenta un permiso de trabajador cualificado.',
        ],
      },
      {
        en: [
          'Pay the application fee',
          'Charged when the application is submitted and not refunded on refusal.',
        ],
        pt: [
          'Pagar a taxa do pedido',
          'Cobrada no envio e não devolvida em caso de indeferimento.',
        ],
        es: [
          'Pagar la tasa de la solicitud',
          'Se cobra al enviar y no se devuelve si deniegan.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Submit the application before travelling',
          'As a rule the permit must be granted before you enter, though some skilled applicants may apply from inside Norway if they are there lawfully.',
        ],
        pt: [
          'Enviar o pedido antes de viajar',
          'Como regra a autorização precisa ser concedida antes da entrada, embora alguns qualificados possam pedir de dentro da Noruega se estiverem lá legalmente.',
        ],
        es: [
          'Enviar la solicitud antes de viajar',
          'Como regla el permiso debe concederse antes de entrar, aunque algunos cualificados pueden solicitar desde dentro de Noruega si están allí legalmente.',
        ],
      },
      {
        en: [
          'Book the appointment to hand in the documents',
          'At a Norwegian mission or a partner centre, where identity is verified.',
        ],
        pt: [
          'Agendar o atendimento para entregar os documentos',
          'Numa representação norueguesa ou centro parceiro, onde a identidade é verificada.',
        ],
        es: [
          'Reservar la cita para entregar los documentos',
          'En una representación noruega o centro asociado, donde se verifica la identidad.',
        ],
      },
      {
        en: [
          'Book the police appointment before arriving',
          'Slots at the police are scarce in the larger cities and the appointment has a deadline after arrival — booking it early avoids a real bottleneck.',
        ],
        pt: [
          'Agendar o atendimento na polícia antes de chegar',
          'As vagas na polícia são escassas nas cidades maiores e o atendimento tem prazo após a chegada — agendar cedo evita um gargalo real.',
        ],
        es: [
          'Reservar la cita policial antes de llegar',
          'Las citas en la policía escasean en las ciudades grandes y la cita tiene plazo tras la llegada: reservarla pronto evita un cuello de botella real.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection at the police',
          'Fingerprints and photograph for the residence card, taken at the appointment after arrival.',
        ],
        pt: [
          'Recolha de dados biométricos na polícia',
          'Impressões digitais e fotografia para o cartão de residência, no atendimento após a chegada.',
        ],
        es: [
          'Recogida de datos biométricos en la policía',
          'Huellas y fotografía para la tarjeta de residencia, en la cita tras la llegada.',
        ],
      },
      {
        en: [
          'Tuberculosis test after arrival',
          'Required from nationals of certain countries for stays over three months, done in Norway.',
        ],
        pt: [
          'Teste de tuberculose após a chegada',
          'Exigido a nacionais de determinados países em estadas acima de três meses, feito na Noruega.',
        ],
        es: [
          'Prueba de tuberculosis tras la llegada',
          'Exigida a nacionales de ciertos países en estancias de más de tres meses, se hace en Noruega.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Report to the police within the deadline after arrival',
          'The permit is not complete until this appointment happens and the residence card is ordered.',
        ],
        pt: [
          'Apresentar-se à polícia dentro do prazo após a chegada',
          'A autorização não fica completa até esse atendimento acontecer e o cartão de residência ser encomendado.',
        ],
        es: [
          'Presentarse ante la policía dentro del plazo tras la llegada',
          'El permiso no queda completo hasta que ocurre esa cita y se solicita la tarjeta de residencia.',
        ],
      },
      {
        en: [
          'Register with the tax office to get a personal number',
          'The fødselsnummer is what unlocks a bank account, a tax card and access to public services.',
        ],
        pt: [
          'Registar-se na receita para obter o número pessoal',
          'O fødselsnummer é o que destrava conta bancária, cartão fiscal e acesso a serviços públicos.',
        ],
        es: [
          'Registrarse en la oficina tributaria para obtener el número personal',
          'El fødselsnummer es lo que desbloquea la cuenta bancaria, la tarjeta fiscal y el acceso a los servicios públicos.',
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
          'The skilled worker permit is tied to the specific job it was granted for.',
        ],
        pt: [
          'Pedir nova autorização antes de trocar de empregador ou de função',
          'A autorização de trabalhador qualificado é vinculada à vaga específica para a qual foi concedida.',
        ],
        es: [
          'Solicitar un nuevo permiso antes de cambiar de empleador o de puesto',
          'El permiso de trabajador cualificado está ligado al empleo concreto para el que se concedió.',
        ],
      },
      {
        en: [
          'Start the Norwegian language training early',
          'Permanent residence requires Norwegian and social studies, and the courses take time to complete.',
        ],
        pt: [
          'Começar cedo o curso de norueguês',
          'A residência permanente exige norueguês e estudos sociais, e os cursos levam tempo para concluir.',
        ],
        es: [
          'Empezar pronto la formación en noruego',
          'La residencia permanente exige noruego y estudios sociales, y los cursos llevan tiempo.',
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
          'Letter of admission to a full-time programme',
          'From an accredited Norwegian institution; the study has to be full-time and lead to a qualification.',
        ],
        pt: [
          'Carta de admissão em programa de tempo integral',
          'De instituição norueguesa credenciada; o estudo precisa ser em tempo integral e levar a uma titulação.',
        ],
        es: [
          'Carta de admisión a un programa a tiempo completo',
          'De una institución noruega acreditada; el estudio debe ser a tiempo completo y conducir a una titulación.',
        ],
      },
      {
        en: [
          'Online application in the immigration portal',
          'Filed through the UDI portal with the documents uploaded.',
        ],
        pt: [
          'Pedido online no portal de imigração',
          'Protocolado pelo portal da UDI com os documentos enviados.',
        ],
        es: [
          'Solicitud en línea en el portal de inmigración',
          'Se presenta por el portal de la UDI con los documentos cargados.',
        ],
      },
      {
        en: [
          'Documentation of accommodation',
          'Student housing confirmation or a rental contract.',
        ],
        pt: [
          'Documentação de alojamento',
          'Confirmação de residência estudantil ou contrato de aluguel.',
        ],
        es: [
          'Documentación del alojamiento',
          'Confirmación de residencia estudiantil o contrato de alquiler.',
        ],
      },
      {
        en: [
          'Plan of study and statement of purpose',
          'Explaining the programme and what you intend to do afterwards.',
        ],
        pt: [
          'Plano de estudos e declaração de propósito',
          'Explicando o programa e o que você pretende fazer depois.',
        ],
        es: [
          'Plan de estudios y declaración de propósito',
          'Explicando el programa y qué pretende hacer después.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Previous diplomas and transcripts',
          'The studies that qualified you for admission, translated where needed.',
        ],
        pt: [
          'Diplomas e históricos anteriores',
          'Os estudos que qualificaram você para a admissão, traduzidos quando necessário.',
        ],
        es: [
          'Títulos y expedientes anteriores',
          'Los estudios que le cualificaron para la admisión, traducidos cuando haga falta.',
        ],
      },
      {
        en: [
          'Proof of English or Norwegian for the programme',
          'The level is set by the institution; most master programmes are taught in English.',
        ],
        pt: [
          'Comprovação de inglês ou norueguês para o programa',
          'O nível é definido pela instituição; a maioria dos mestrados é lecionada em inglês.',
        ],
        es: [
          'Prueba de inglés o noruego para el programa',
          'El nivel lo fija la institución; la mayoría de los másteres se imparte en inglés.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Funds for the academic year in a Norwegian account',
          'The amount is tied to the state loan fund rate and normally has to be deposited into a Norwegian bank or the institution’s account before the permit is granted.',
        ],
        pt: [
          'Recursos para o ano letivo numa conta norueguesa',
          'O valor é atrelado à taxa do fundo estatal de empréstimo e normalmente precisa ser depositado em banco norueguês ou na conta da instituição antes de a autorização ser concedida.',
        ],
        es: [
          'Fondos para el año académico en una cuenta noruega',
          'El importe está ligado a la tasa del fondo estatal de préstamos y normalmente debe depositarse en un banco noruego o en la cuenta de la institución antes de conceder el permiso.',
        ],
      },
      {
        en: [
          'Evidence the funds are your own',
          'A loan or a scholarship counts; money briefly parked by a third party does not.',
        ],
        pt: [
          'Comprovação de que os recursos são seus',
          'Empréstimo ou bolsa contam; dinheiro estacionado brevemente por terceiro não.',
        ],
        es: [
          'Prueba de que los fondos son suyos',
          'Un préstamo o una beca cuentan; dinero aparcado brevemente por un tercero no.',
        ],
      },
    ],
    submission_fees: [
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
      {
        en: [
          'Hand in the documents at a mission',
          'Where identity is verified before the case is decided.',
        ],
        pt: [
          'Entregar os documentos numa representação',
          'Onde a identidade é verificada antes de o caso ser decidido.',
        ],
        es: [
          'Entregar los documentos en una representación',
          'Donde se verifica la identidad antes de resolver el caso.',
        ],
      },
      {
        en: [
          'Apply well before the term starts',
          'Student applications are seasonal and the queues peak before the academic year.',
        ],
        pt: [
          'Pedir bem antes do início do semestre',
          'Os pedidos de estudante são sazonais e as filas atingem o pico antes do ano letivo.',
        ],
        es: [
          'Solicitar bastante antes del inicio del semestre',
          'Las solicitudes de estudiante son estacionales y las colas se disparan antes del año académico.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection at the police',
          'Taken at the appointment after arrival, for the residence card.',
        ],
        pt: [
          'Recolha de dados biométricos na polícia',
          'Feita no atendimento após a chegada, para o cartão de residência.',
        ],
        es: [
          'Recogida de datos biométricos en la policía',
          'Se realiza en la cita tras la llegada, para la tarjeta de residencia.',
        ],
      },
      {
        en: [
          'Tuberculosis test after arrival',
          'Required from nationals of certain countries for stays over three months.',
        ],
        pt: [
          'Teste de tuberculose após a chegada',
          'Exigido a nacionais de determinados países em estadas acima de três meses.',
        ],
        es: [
          'Prueba de tuberculosis tras la llegada',
          'Exigida a nacionales de ciertos países en estancias de más de tres meses.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Report to the police after arrival',
          'Within the deadline given, to complete the permit and order the card.',
        ],
        pt: [
          'Apresentar-se à polícia após a chegada',
          'Dentro do prazo indicado, para completar a autorização e encomendar o cartão.',
        ],
        es: [
          'Presentarse ante la policía tras la llegada',
          'Dentro del plazo indicado, para completar el permiso y solicitar la tarjeta.',
        ],
      },
      {
        en: [
          'Register with the tax office',
          'To get the personal number and a tax card if you will work part-time.',
        ],
        pt: [
          'Registar-se na receita',
          'Para obter o número pessoal e um cartão fiscal se for trabalhar meio período.',
        ],
        es: [
          'Registrarse en la oficina tributaria',
          'Para obtener el número personal y una tarjeta fiscal si va a trabajar a tiempo parcial.',
        ],
      },
      {
        en: [
          'Respect the limit on working hours',
          'Part-time work is capped during term, with more allowed in the holidays.',
        ],
        pt: [
          'Respeitar o limite de horas de trabalho',
          'O trabalho parcial tem teto durante o semestre, com mais horas permitidas nas férias.',
        ],
        es: [
          'Respetar el límite de horas de trabajo',
          'El trabajo parcial tiene tope durante el semestre, con más horas permitidas en vacaciones.',
        ],
      },
      {
        en: [
          'Show academic progress at each renewal',
          'The permit is renewed yearly and progress in the programme is checked.',
        ],
        pt: [
          'Comprovar progresso acadêmico a cada renovação',
          'A autorização é renovada anualmente e o progresso no programa é conferido.',
        ],
        es: [
          'Acreditar progreso académico en cada renovación',
          'El permiso se renueva anualmente y se comprueba el progreso en el programa.',
        ],
      },
      {
        en: [
          'Consider the job-seeker permit after graduating',
          'It allows staying on to look for skilled work, and it has to be applied for before the student permit expires.',
        ],
        pt: [
          'Avaliar a autorização de busca de emprego após a formatura',
          'Ela permite ficar procurando trabalho qualificado, e precisa ser pedida antes de a autorização de estudante vencer.',
        ],
        es: [
          'Evaluar el permiso de búsqueda de empleo tras graduarse',
          'Permite quedarse a buscar trabajo cualificado, y debe solicitarse antes de que caduque el permiso de estudiante.',
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
          'Applied for from inside Norway, holding a valid permit.',
        ],
        pt: [
          'Passaporte válido e cartão de residência atual',
          'Pedida de dentro da Noruega, com uma autorização válida.',
        ],
        es: [
          'Pasaporte vigente y tarjeta de residencia actual',
          'Se solicita desde dentro de Noruega, con un permiso vigente.',
        ],
      },
      {
        en: [
          'Evidence of the qualifying period of residence',
          'Several years of continuous permits that count towards permanence. A student permit does not count, which surprises many people.',
        ],
        pt: [
          'Comprovação do período qualificado de residência',
          'Vários anos de autorizações contínuas que contam para a permanência. Autorização de estudante não conta, o que surpreende muita gente.',
        ],
        es: [
          'Prueba del periodo cualificado de residencia',
          'Varios años de permisos continuos que cuentan para la permanencia. El permiso de estudiante no cuenta, lo que sorprende a mucha gente.',
        ],
      },
      {
        en: [
          'Record of absences from Norway',
          'Long or frequent absences break the continuity the application depends on.',
        ],
        pt: [
          'Registo de ausências da Noruega',
          'Ausências longas ou frequentes quebram a continuidade de que o pedido depende.',
        ],
        es: [
          'Registro de ausencias de Noruega',
          'Las ausencias largas o frecuentes rompen la continuidad de la que depende la solicitud.',
        ],
      },
      {
        en: [
          'Clean criminal record',
          'A conviction extends the qualifying period rather than merely counting against you.',
        ],
        pt: [
          'Ficha criminal limpa',
          'Uma condenação estende o período qualificado, em vez de apenas pesar contra você.',
        ],
        es: [
          'Antecedentes penales limpios',
          'Una condena extiende el periodo cualificado, en lugar de solo pesar en su contra.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Certificate of Norwegian at the required level',
          'An oral test at the level set for permanent residence, from an approved centre.',
        ],
        pt: [
          'Certificado de norueguês no nível exigido',
          'Um teste oral no nível definido para a residência permanente, em centro aprovado.',
        ],
        es: [
          'Certificado de noruego en el nivel exigido',
          'Un examen oral en el nivel fijado para la residencia permanente, de un centro aprobado.',
        ],
      },
      {
        en: [
          'Completed social studies course and test',
          'Taken in a language you understand, and it is a separate requirement from the language test.',
        ],
        pt: [
          'Curso e teste de estudos sociais concluídos',
          'Feitos num idioma que você compreenda, e é exigência separada do teste de idioma.',
        ],
        es: [
          'Curso y examen de estudios sociales completados',
          'Realizados en un idioma que entienda, y es un requisito separado del examen de idioma.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Income above the threshold for the qualifying period',
          'Assessed over the preceding twelve months, and it is a real bar rather than a formality.',
        ],
        pt: [
          'Renda acima do piso no período qualificado',
          'Avaliada nos doze meses anteriores, e é uma barreira real, não formalidade.',
        ],
        es: [
          'Ingresos por encima del umbral en el periodo cualificado',
          'Se evalúan en los doce meses anteriores, y es una barrera real, no un formalismo.',
        ],
      },
      {
        en: [
          'No reliance on social assistance',
          'Having received certain benefits during the qualifying period blocks the application.',
        ],
        pt: [
          'Não ter dependido de assistência social',
          'Ter recebido certos benefícios durante o período qualificado bloqueia o pedido.',
        ],
        es: [
          'No haber dependido de la asistencia social',
          'Haber recibido ciertas prestaciones durante el periodo cualificado bloquea la solicitud.',
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
          'Apply in the window before the current permit expires',
          'Filed through the immigration portal, from inside Norway.',
        ],
        pt: [
          'Pedir na janela anterior ao vencimento da autorização atual',
          'Protocolado pelo portal de imigração, de dentro da Noruega.',
        ],
        es: [
          'Solicitar en la ventana previa al vencimiento del permiso actual',
          'Se presenta por el portal de inmigración, desde dentro de Noruega.',
        ],
      },
      {
        en: [
          'Book the police appointment',
          'Documents are handed in and identity verified there.',
        ],
        pt: [
          'Agendar o atendimento na polícia',
          'Os documentos são entregues e a identidade verificada ali.',
        ],
        es: [
          'Reservar la cita policial',
          'Allí se entregan los documentos y se verifica la identidad.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection for the new card',
          'Taken at the police appointment.',
        ],
        pt: [
          'Recolha de dados biométricos para o novo cartão',
          'Feita no atendimento da polícia.',
        ],
        es: [
          'Recogida de datos biométricos para la nueva tarjeta',
          'Se realiza en la cita policial.',
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
          'Do not stay outside Norway for more than two years',
          'A continuous absence beyond that extinguishes the permanent permit.',
        ],
        pt: [
          'Não ficar fora da Noruega por mais de dois anos',
          'Uma ausência contínua além disso extingue a autorização permanente.',
        ],
        es: [
          'No permanecer fuera de Noruega más de dos años',
          'Una ausencia continua superior extingue el permiso permanente.',
        ],
      },
      {
        en: [
          'Consider citizenship after the qualifying period',
          'Norway now allows dual nationality, and the language and social studies already completed count towards it.',
        ],
        pt: [
          'Avaliar a cidadania após o período qualificado',
          'A Noruega hoje permite dupla nacionalidade, e o idioma e os estudos sociais já concluídos contam para ela.',
        ],
        es: [
          'Evaluar la ciudadanía tras el periodo cualificado',
          'Noruega ahora permite la doble nacionalidad, y el idioma y los estudios sociales ya completados cuentan para ella.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
