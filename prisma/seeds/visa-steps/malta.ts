import type { CountryVisaSteps } from './types';

/**
 * Steps for Malta.
 *
 * Two different agencies decide who lives here. Identità handles ordinary
 * residence, single permits and the eResidence card; Residency Malta Agency
 * runs the investment and nomad programmes. Filing with the wrong one is a
 * common way to lose weeks.
 *
 * The residence-by-investment route (MPRP) can only be filed through a licensed
 * agent — the agency does not accept applications directly. Malta's separate
 * citizenship-by-naturalisation-for-investment scheme has been contested at EU
 * level and has been reshaped more than once, so nothing about its timing or
 * availability should be assumed.
 *
 * The Nomad Residence Permit is its own route, not a variation of a work
 * permit, and it stopped being a tax-free arrangement: a 2023 legal notice put
 * the authorised income under a flat tax. Treat it as taxable in Malta.
 */
export const malta: CountryVisaSteps = {
  'Short-Stay Visa (Schengen Type C)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Issued within the last ten years, valid for three months beyond your departure, with two blank pages.',
        ],
        pt: [
          'Passaporte válido',
          'Emitido nos últimos dez anos, válido por três meses além da saída e com duas páginas livres.',
        ],
        es: [
          'Pasaporte vigente',
          'Emitido en los últimos diez años, vigente tres meses más allá de la salida y con dos páginas libres.',
        ],
      },
      {
        en: [
          'Schengen application form for Malta',
          'Malta must be your main destination or first point of entry; in several countries Malta is represented by another Schengen state, so check which mission takes your file.',
        ],
        pt: [
          'Formulário Schengen dirigido a Malta',
          'Malta precisa ser o destino principal ou a primeira entrada; em vários países Malta é representada por outro Estado Schengen, então confira qual posto recebe o processo.',
        ],
        es: [
          'Formulario Schengen dirigido a Malta',
          'Malta debe ser el destino principal o la primera entrada; en varios países Malta está representada por otro Estado Schengen, así que confirme qué misión recibe el expediente.',
        ],
      },
      {
        en: [
          'Two recent biometric photographs',
          'Taken in the last six months, on a plain light background.',
        ],
        pt: [
          'Duas fotografias biométricas recentes',
          'Tiradas nos últimos seis meses, em fundo claro e liso.',
        ],
        es: [
          'Dos fotografías biométricas recientes',
          'Tomadas en los últimos seis meses, con fondo claro y liso.',
        ],
      },
      {
        en: [
          'Return travel booking',
          'A reservation is enough; do not buy tickets before the decision, as the fee is lost either way.',
        ],
        pt: [
          'Reserva de viagem de retorno',
          'Basta a reserva; não compre bilhetes antes da decisão, porque a taxa é perdida de qualquer forma.',
        ],
        es: [
          'Reserva de viaje de regreso',
          'Basta la reserva; no compre billetes antes de la decisión, porque la tasa se pierde igualmente.',
        ],
      },
      {
        en: [
          'Proof of accommodation in Malta',
          'A hotel booking, or a host declaration signed before a Maltese local council or notary; an informal letter is not accepted.',
        ],
        pt: [
          'Comprovativo de alojamento em Malta',
          'Reserva de hotel, ou declaração do anfitrião assinada perante um conselho local maltês ou notário; uma carta informal não é aceite.',
        ],
        es: [
          'Comprobante de alojamiento en Malta',
          'Reserva de hotel, o declaración del anfitrión firmada ante un consejo local maltés o notario; una carta informal no se acepta.',
        ],
      },
      {
        en: [
          'Travel medical insurance for the Schengen area',
          'Minimum cover of 30,000 euros including repatriation, valid in every Schengen state and not only in Malta.',
        ],
        pt: [
          'Seguro médico de viagem para o espaço Schengen',
          'Cobertura mínima de 30 mil euros incluindo repatriação, válida em todos os Estados Schengen e não apenas em Malta.',
        ],
        es: [
          'Seguro médico de viaje para el espacio Schengen',
          'Cobertura mínima de 30 mil euros con repatriación, válida en todos los Estados Schengen y no solo en Malta.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of means for each day of the stay',
          'Malta publishes a daily amount per person; confirm the figure in force, as it is revised and older guides quote outdated numbers.',
        ],
        pt: [
          'Comprovativo de meios para cada dia da estada',
          'Malta publica um valor diário por pessoa; confirme o montante vigente, porque é revisto e os guias antigos citam números desatualizados.',
        ],
        es: [
          'Comprobante de medios para cada día de la estancia',
          'Malta publica un importe diario por persona; confirme la cifra vigente, ya que se revisa y las guías antiguas citan números caducos.',
        ],
      },
      {
        en: [
          'Bank statements from the last three months',
          'Stamped by the bank, with the balance consistent with the trip described.',
        ],
        pt: [
          'Extratos bancários dos últimos três meses',
          'Carimbados pelo banco, com saldo coerente com a viagem descrita.',
        ],
        es: [
          'Extractos bancarios de los últimos tres meses',
          'Sellados por el banco, con un saldo coherente con el viaje descrito.',
        ],
      },
      {
        en: [
          'Proof of ties to your country of residence',
          'Employer letter with approved leave, company documents or enrolment proof; weak ties are the most frequent reason for refusal.',
        ],
        pt: [
          'Comprovativo de vínculos no país de residência',
          'Carta do empregador com férias aprovadas, documentos da empresa ou prova de matrícula; vínculos fracos são o motivo mais frequente de recusa.',
        ],
        es: [
          'Comprobante de vínculos en su país de residencia',
          'Carta del empleador con vacaciones aprobadas, documentos de la empresa o prueba de matrícula; los vínculos débiles son el motivo más frecuente de denegación.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Book the appointment at the centre handling Malta',
          'Malta outsources collection to a partner network, and slots in the summer season disappear months in advance.',
        ],
        pt: [
          'Agendar no centro que atende Malta',
          'Malta terceiriza a recolha a uma rede parceira, e as vagas na temporada de verão desaparecem meses antes.',
        ],
        es: [
          'Reservar cita en el centro que atiende a Malta',
          'Malta externaliza la recogida a una red asociada, y las citas de la temporada de verano se agotan con meses de antelación.',
        ],
      },
      {
        en: [
          'Pay the visa fee at submission',
          'Charged per applicant, in euro, and never refunded if the visa is refused.',
        ],
        pt: [
          'Pagar a taxa de visto na entrega',
          'Cobrada por requerente, em euros, e nunca devolvida se o visto for recusado.',
        ],
        es: [
          'Pagar la tasa de visado al presentar',
          'Se cobra por solicitante, en euros, y no se devuelve si deniegan el visado.',
        ],
      },
      {
        en: [
          'Submit within the application window',
          'No earlier than six months before travel and at least fifteen days ahead; last-minute files are routinely rejected on timing alone.',
        ],
        pt: [
          'Entregar dentro da janela de pedido',
          'No máximo seis meses antes da viagem e pelo menos quinze dias de antecedência; pedidos de última hora são recusados só pelo prazo.',
        ],
        es: [
          'Presentar dentro de la ventana de solicitud',
          'Como mucho seis meses antes del viaje y al menos quince días de antelación; los expedientes de última hora se rechazan solo por el plazo.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection',
          'Fingerprints stay on file for 59 months and are reused across Schengen applications.',
        ],
        pt: [
          'Recolha de dados biométricos',
          'As impressões ficam registadas por 59 meses e são reaproveitadas entre pedidos Schengen.',
        ],
        es: [
          'Recogida de datos biométricos',
          'Las huellas quedan registradas 59 meses y se reutilizan entre solicitudes Schengen.',
        ],
      },
      {
        en: [
          'Medical examination',
          'Not required for a short-stay visa; only the insurance certificate is checked.',
        ],
        pt: [
          'Exame médico',
          'Não é exigido em visto de curta duração; apenas o certificado de seguro é conferido.',
        ],
        es: [
          'Examen médico',
          'No se exige en visado de corta duración; solo se comprueba el certificado del seguro.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the passport and check the sticker',
          'Verify the number of entries and whether the visa carries a territorial limitation to Malta only.',
        ],
        pt: [
          'Retirar o passaporte e conferir a vinheta',
          'Verifique o número de entradas e se o visto traz limitação territorial apenas a Malta.',
        ],
        es: [
          'Recoger el pasaporte y revisar la etiqueta',
          'Compruebe el número de entradas y si el visado lleva una limitación territorial solo a Malta.',
        ],
      },
      {
        en: [
          'Respect the 90 days in any 180 rule',
          'Counted on a rolling basis across the whole Schengen area, not per country.',
        ],
        pt: [
          'Respeitar a regra dos 90 dias em cada 180',
          'Contados de forma móvel em todo o espaço Schengen, e não por país.',
        ],
        es: [
          'Respetar la regla de 90 días en cada 180',
          'Se cuentan de forma móvil en todo el espacio Schengen, no por país.',
        ],
      },
      {
        en: [
          'Do not switch to residence from inside Malta',
          'A visitor cannot convert to a residence permit while in the country; residence categories are applied for from abroad or under a specific programme.',
        ],
        pt: [
          'Não converter para residência estando em Malta',
          'Um visitante não pode converter-se em residente estando no país; as categorias de residência pedem-se do exterior ou dentro de um programa específico.',
        ],
        es: [
          'No convertir a residencia estando en Malta',
          'Un visitante no puede pasar a permiso de residencia dentro del país; las categorías de residencia se solicitan desde fuera o mediante un programa concreto.',
        ],
      },
      {
        en: [
          'Keep evidence of your entry and exit',
          'Boarding passes and stamps settle disputes about days used when you next apply.',
        ],
        pt: [
          'Guardar prova de entrada e saída',
          'Cartões de embarque e carimbos resolvem discussões sobre dias usados no pedido seguinte.',
        ],
        es: [
          'Guardar prueba de entrada y salida',
          'Tarjetas de embarque y sellos resuelven las disputas sobre días usados en la próxima solicitud.',
        ],
        priority: 2,
      },
    ],
  },

  'National Long-Stay Visa (Type D)': {
    core_documents: [
      {
        en: [
          'National visa application form',
          'A different form and a different unit from the Schengen visa; the decision is taken in Malta, not by the mission that receives it.',
        ],
        pt: [
          'Formulário de visto nacional',
          'Formulário e unidade diferentes dos do visto Schengen; a decisão é tomada em Malta, não pelo posto que recebe o pedido.',
        ],
        es: [
          'Formulario de visado nacional',
          'Formulario y unidad distintos de los del visado Schengen; la decisión se toma en Malta, no en la misión que lo recibe.',
        ],
      },
      {
        en: [
          'Passport covering the whole intended stay',
          'Valid for the requested period plus three months, with the biographic page copied.',
        ],
        pt: [
          'Passaporte que cubra toda a estada pretendida',
          'Válido pelo período pedido mais três meses, com cópia da página biográfica.',
        ],
        es: [
          'Pasaporte que cubra toda la estancia prevista',
          'Vigente por el periodo solicitado más tres meses, con copia de la página biográfica.',
        ],
      },
      {
        en: [
          'The document that justifies the long stay',
          'An approved single permit, a university acceptance letter or a family link. The Type D is never granted on its own reasoning; it follows an underlying authorisation.',
        ],
        pt: [
          'O documento que justifica a estada longa',
          'Um single permit aprovado, carta de aceitação universitária ou vínculo familiar. O tipo D nunca é concedido por si só; ele acompanha uma autorização de base.',
        ],
        es: [
          'El documento que justifica la estancia larga',
          'Un single permit aprobado, una carta de admisión universitaria o un vínculo familiar. El tipo D nunca se concede por sí solo; sigue a una autorización de base.',
        ],
      },
      {
        en: [
          'Police conduct certificate',
          'Issued in the last six months by every country where you lived recently, apostilled or legalised.',
        ],
        pt: [
          'Certificado de registo criminal',
          'Emitido nos últimos seis meses por todos os países onde viveu recentemente, com apostila ou legalização.',
        ],
        es: [
          'Certificado de antecedentes penales',
          'Emitido en los últimos seis meses por cada país donde residió recientemente, con apostilla o legalización.',
        ],
      },
      {
        en: [
          'Lease registered with the Housing Authority',
          'Malta requires residential leases to be registered by the landlord; an unregistered contract will not support the residence card that follows the visa.',
        ],
        pt: [
          'Contrato de arrendamento registado na Housing Authority',
          'Malta exige que os arrendamentos sejam registados pelo senhorio; um contrato não registado não sustenta o cartão de residência que vem depois do visto.',
        ],
        es: [
          'Contrato de alquiler registrado en la Housing Authority',
          'Malta exige que el arrendador registre los alquileres; un contrato sin registrar no sostiene la tarjeta de residencia posterior al visado.',
        ],
      },
      {
        en: [
          'Civil status certificates, legalised',
          'Birth and, where relevant, marriage certificates with apostille and a translation into English or Maltese.',
        ],
        pt: [
          'Certidões de estado civil legalizadas',
          'Certidão de nascimento e, se aplicável, de casamento, com apostila e tradução para inglês ou maltês.',
        ],
        es: [
          'Certificados de estado civil legalizados',
          'Partida de nacimiento y, si procede, de matrimonio, con apostilla y traducción al inglés o al maltés.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Qualification recognition through MQRIC',
          'The Malta Qualifications Recognition Information Centre compares your degree to the Maltese framework. It takes weeks and is a precondition for skilled and regulated roles.',
        ],
        pt: [
          'Reconhecimento de habilitações pelo MQRIC',
          'O centro maltês de reconhecimento de qualificações compara o seu diploma com o quadro nacional. Leva semanas e é pré-requisito para funções qualificadas e regulamentadas.',
        ],
        es: [
          'Reconocimiento de titulación por el MQRIC',
          'El centro maltés de reconocimiento de cualificaciones compara su título con el marco nacional. Tarda semanas y es requisito previo para puestos cualificados y regulados.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Evidence of language for the course or role',
          'English is an official language in Malta and most programmes are taught in it; the level is set by the institution or the regulator.',
        ],
        pt: [
          'Prova de idioma para o curso ou a função',
          'O inglês é língua oficial em Malta e a maioria dos programas é lecionada nele; o nível é definido pela instituição ou pelo regulador.',
        ],
        es: [
          'Prueba de idioma para el curso o el puesto',
          'El inglés es lengua oficial en Malta y la mayoría de los programas se imparten en él; el nivel lo fija la institución o el regulador.',
        ],
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Stable income or maintenance funds for the period',
          'Salary, scholarship or savings covering the whole stay; the reference amount is tied to national minimum levels, so check the current one.',
        ],
        pt: [
          'Rendimento estável ou fundos de subsistência para o período',
          'Salário, bolsa ou poupança que cubram toda a estada; o valor de referência acompanha os mínimos nacionais, então confira o vigente.',
        ],
        es: [
          'Ingresos estables o fondos de manutención para el periodo',
          'Salario, beca o ahorros que cubran toda la estancia; el importe de referencia sigue a los mínimos nacionales, así que consulte el vigente.',
        ],
      },
      {
        en: [
          'Health insurance valid in Malta',
          'Access to the public system comes only after social security contributions start, so private cover must bridge the first months.',
        ],
        pt: [
          'Seguro de saúde válido em Malta',
          'O acesso ao sistema público só começa depois de iniciadas as contribuições sociais, por isso a cobertura privada tem de cobrir os primeiros meses.',
        ],
        es: [
          'Seguro de salud válido en Malta',
          'El acceso al sistema público solo empieza tras iniciarse las cotizaciones sociales, así que el seguro privado debe cubrir los primeros meses.',
        ],
      },
      {
        en: [
          'Pay the national visa fee',
          'Higher than the Schengen fee and not refunded if the underlying authorisation is later withdrawn.',
        ],
        pt: [
          'Pagar a taxa do visto nacional',
          'Mais alta que a taxa Schengen e não devolvida se a autorização de base for depois retirada.',
        ],
        es: [
          'Pagar la tasa del visado nacional',
          'Más alta que la tasa Schengen y no se devuelve si la autorización de base se retira después.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File at the mission accredited for your country',
          'Malta has few missions and covers whole regions from one post; identify it before assembling documents.',
        ],
        pt: [
          'Entregar no posto acreditado para o seu país',
          'Malta tem poucos postos e cobre regiões inteiras a partir de um só; identifique-o antes de reunir os documentos.',
        ],
        es: [
          'Presentar en la misión acreditada para su país',
          'Malta tiene pocas misiones y cubre regiones enteras desde una sola; identifíquela antes de reunir los documentos.',
        ],
      },
      {
        en: [
          'Provide translations into English or Maltese',
          'Both are official languages; translations must come from a certified translator and be attached to the original.',
        ],
        pt: [
          'Apresentar traduções para inglês ou maltês',
          'Ambas são línguas oficiais; as traduções têm de ser feitas por tradutor certificado e anexadas ao original.',
        ],
        es: [
          'Aportar traducciones al inglés o al maltés',
          'Ambas son lenguas oficiales; las traducciones deben hacerlas un traductor certificado e ir unidas al original.',
        ],
      },
      {
        en: [
          'Plan for a decision that can take months',
          'The file travels to Malta for assessment. Do not resign or terminate a lease on the assumption of a quick answer.',
        ],
        pt: [
          'Planear uma decisão que pode levar meses',
          'O processo viaja para Malta para avaliação. Não se demita nem rescinda um arrendamento contando com resposta rápida.',
        ],
        es: [
          'Contar con una decisión que puede tardar meses',
          'El expediente viaja a Malta para su evaluación. No renuncie a su empleo ni rescinda un alquiler esperando una respuesta rápida.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric enrolment for the visa',
          'Fingerprints and photograph taken at the mission when the file is lodged.',
        ],
        pt: [
          'Registo biométrico para o visto',
          'Impressões digitais e fotografia recolhidas no posto no momento da entrega.',
        ],
        es: [
          'Registro biométrico para el visado',
          'Huellas y fotografía tomadas en la misión al presentar el expediente.',
        ],
      },
      {
        en: [
          'Medical certificate for certain nationalities',
          'A chest X-ray or a general health certificate may be demanded at the residence permit stage depending on where you come from.',
        ],
        pt: [
          'Atestado médico para certas nacionalidades',
          'Uma radiografia ao tórax ou um atestado de saúde geral pode ser exigido na fase da autorização de residência, conforme a origem.',
        ],
        es: [
          'Certificado médico para ciertas nacionalidades',
          'Puede exigirse una radiografía de tórax o un certificado de salud general en la fase del permiso de residencia, según el origen.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Apply for the eResidence card at Identità after arrival',
          'The Type D is only an entry document. The residence card is a separate application filed in Malta, and travelling without booking it wastes the visa validity.',
        ],
        pt: [
          'Pedir o cartão eResidence na Identità após a chegada',
          'O tipo D é apenas um documento de entrada. O cartão de residência é um pedido separado feito em Malta, e viajar sem o agendar desperdiça a validade do visto.',
        ],
        es: [
          'Solicitar la tarjeta eResidence en Identità tras llegar',
          'El tipo D es solo un documento de entrada. La tarjeta de residencia es una solicitud aparte presentada en Malta, y viajar sin reservarla desperdicia la vigencia del visado.',
        ],
      },
      {
        en: [
          'Obtain a Maltese tax number',
          'Requested from the tax authority, separately from immigration; without it payroll cannot be run correctly.',
        ],
        pt: [
          'Obter o número fiscal maltês',
          'Pedido à autoridade fiscal, separadamente da imigração; sem ele a folha de pagamento não pode ser processada corretamente.',
        ],
        es: [
          'Obtener el número fiscal maltés',
          'Se pide a la autoridad tributaria, aparte de inmigración; sin él la nómina no puede procesarse correctamente.',
        ],
      },
      {
        en: [
          'Register for social security',
          'A separate registration again, and the point from which public healthcare entitlement begins to build.',
        ],
        pt: [
          'Inscrever-se na segurança social',
          'Mais um registo separado, e o momento a partir do qual se começa a construir o direito à saúde pública.',
        ],
        es: [
          'Inscribirse en la seguridad social',
          'Otro registro aparte, y el momento desde el cual se empieza a generar el derecho a la sanidad pública.',
        ],
      },
      {
        en: [
          'Start the renewal well before the card expires',
          'Renewal appointments are scarce and processing is slow; keep the submission receipt, as it is what evidences lawful stay while you wait.',
        ],
        pt: [
          'Iniciar a renovação bem antes de o cartão expirar',
          'As marcações de renovação são escassas e o processamento é lento; guarde o comprovativo de entrega, que é o que prova a permanência legal durante a espera.',
        ],
        es: [
          'Iniciar la renovación mucho antes de que caduque la tarjeta',
          'Las citas de renovación escasean y la tramitación es lenta; guarde el resguardo de presentación, que es lo que acredita la estancia legal mientras espera.',
        ],
      },
      {
        en: [
          'Report any change of employer or address',
          'The permit is tied to the underlying authorisation, and an unreported change can invalidate the card.',
        ],
        pt: [
          'Comunicar qualquer mudança de empregador ou morada',
          'A autorização está ligada ao fundamento de base, e uma mudança não comunicada pode invalidar o cartão.',
        ],
        es: [
          'Comunicar cualquier cambio de empleador o domicilio',
          'El permiso está ligado a la autorización de base, y un cambio no comunicado puede invalidar la tarjeta.',
        ],
      },
    ],
  },

  'Malta Permanent Residence Programme (MPRP)': {
    core_documents: [
      {
        en: [
          'Appoint a licensed agent',
          'Residency Malta Agency accepts MPRP files only through agents it licenses. There is no way to apply directly, and the agent mandate must be signed before anything is filed.',
        ],
        pt: [
          'Nomear um agente licenciado',
          'A Residency Malta Agency só aceita processos do MPRP através de agentes por ela licenciados. Não há como pedir diretamente, e o mandato do agente tem de ser assinado antes de qualquer entrega.',
        ],
        es: [
          'Designar un agente autorizado',
          'La Residency Malta Agency solo acepta expedientes del MPRP a través de agentes que ella autoriza. No es posible solicitar directamente, y el mandato del agente debe firmarse antes de presentar nada.',
        ],
      },
      {
        en: [
          'Passports for the main applicant and every dependant',
          'Each person on the application needs their own valid passport, including children.',
        ],
        pt: [
          'Passaportes do requerente principal e de cada dependente',
          'Cada pessoa incluída no pedido precisa do seu próprio passaporte válido, inclusive as crianças.',
        ],
        es: [
          'Pasaportes del solicitante principal y de cada dependiente',
          'Cada persona incluida en la solicitud necesita su propio pasaporte vigente, incluidos los menores.',
        ],
      },
      {
        en: [
          'Full disclosure in the application forms',
          'The programme runs a multi-tier due diligence. An omission discovered afterwards is grounds to revoke the certificate, years later if necessary.',
        ],
        pt: [
          'Divulgação integral nos formulários do pedido',
          'O programa aplica uma diligência devida em vários níveis. Uma omissão descoberta depois é motivo para revogar o certificado, mesmo anos mais tarde.',
        ],
        es: [
          'Divulgación completa en los formularios de solicitud',
          'El programa aplica una diligencia debida en varios niveles. Una omisión descubierta después es motivo para revocar el certificado, incluso años más tarde.',
        ],
      },
      {
        en: [
          'Police conduct certificates for all adult applicants',
          'From every country where an applicant lived for more than six months over the last decade, not only the current one.',
        ],
        pt: [
          'Certificados criminais de todos os requerentes adultos',
          'De cada país onde um requerente viveu mais de seis meses na última década, e não apenas do atual.',
        ],
        es: [
          'Certificados de antecedentes de todos los solicitantes adultos',
          'De cada país donde un solicitante vivió más de seis meses en la última década, no solo del actual.',
        ],
      },
      {
        en: [
          'Sworn declaration on source of wealth and funds',
          'The origin of the money must be traced and documented, not merely stated; this is where most files stall.',
        ],
        pt: [
          'Declaração juramentada sobre origem do património e dos fundos',
          'A origem do dinheiro tem de ser rastreada e documentada, não apenas declarada; é aqui que a maioria dos processos trava.',
        ],
        es: [
          'Declaración jurada sobre origen del patrimonio y de los fondos',
          'El origen del dinero debe rastrearse y documentarse, no solo declararse; es donde más expedientes se atascan.',
        ],
      },
      {
        en: [
          'Evidence that dependants are genuinely dependent',
          'For adult children and parents, financial dependency has to be proven with records; a declaration on its own is refused.',
        ],
        pt: [
          'Prova de que os dependentes são realmente dependentes',
          'Para filhos adultos e pais, a dependência financeira tem de ser provada com registos; uma declaração isolada é recusada.',
        ],
        es: [
          'Prueba de que los dependientes lo son realmente',
          'Para hijos adultos y padres, la dependencia económica debe probarse con registros; una declaración por sí sola se rechaza.',
        ],
      },
      {
        en: [
          'Legalised civil documents for the family',
          'Birth and marriage certificates with apostille and certified translation for every person included.',
        ],
        pt: [
          'Documentos civis legalizados da família',
          'Certidões de nascimento e casamento com apostila e tradução certificada para cada pessoa incluída.',
        ],
        es: [
          'Documentos civiles legalizados de la familia',
          'Partidas de nacimiento y matrimonio con apostilla y traducción certificada para cada persona incluida.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Qualifying property, bought or leased',
          'The minimum value differs between the south of Malta and Gozo and the rest of the islands. The thresholds have been revised before, so work from the current rules.',
        ],
        pt: [
          'Imóvel qualificado, comprado ou arrendado',
          'O valor mínimo difere entre o sul de Malta e Gozo e o resto das ilhas. Os limites já foram revistos, por isso trabalhe com as regras vigentes.',
        ],
        es: [
          'Inmueble cualificado, comprado o alquilado',
          'El valor mínimo difiere entre el sur de Malta y Gozo y el resto de las islas. Los umbrales ya se han revisado, así que use las reglas vigentes.',
        ],
      },
      {
        en: [
          'Hold the property for the retention period',
          'The property must be kept for a fixed number of years after approval. Selling or ending the lease early puts the residence itself at risk.',
        ],
        pt: [
          'Manter o imóvel pelo período de retenção',
          'O imóvel tem de ser mantido por um número fixo de anos após a aprovação. Vender ou terminar o arrendamento antes coloca a própria residência em risco.',
        ],
        es: [
          'Mantener el inmueble durante el periodo de retención',
          'El inmueble debe conservarse un número fijo de años tras la aprobación. Venderlo o terminar el alquiler antes pone en riesgo la propia residencia.',
        ],
      },
      {
        en: [
          'Government contribution',
          'The amount depends on whether you buy or lease and grows with each additional dependant; confirm the figures currently in force.',
        ],
        pt: [
          'Contribuição governamental',
          'O valor depende de comprar ou arrendar e aumenta a cada dependente adicional; confirme os montantes atualmente em vigor.',
        ],
        es: [
          'Contribución gubernamental',
          'El importe depende de si compra o alquila y crece con cada dependiente adicional; confirme las cifras actualmente vigentes.',
        ],
      },
      {
        en: [
          'Donation to a registered philanthropic organisation',
          'A separate payment from the contribution, made to an NGO registered in Malta and evidenced with a receipt.',
        ],
        pt: [
          'Doação a uma organização filantrópica registada',
          'Um pagamento distinto da contribuição, feito a uma ONG registada em Malta e comprovado com recibo.',
        ],
        es: [
          'Donación a una organización filantrópica registrada',
          'Un pago distinto de la contribución, hecho a una ONG registrada en Malta y acreditado con recibo.',
        ],
      },
      {
        en: [
          'Administrative and due diligence fees',
          'Charged per applicant and per dependant, payable in stages and never refunded, including when the file is rejected.',
        ],
        pt: [
          'Taxas administrativas e de diligência devida',
          'Cobradas por requerente e por dependente, pagas em fases e nunca devolvidas, inclusive se o processo for indeferido.',
        ],
        es: [
          'Tasas administrativas y de diligencia debida',
          'Se cobran por solicitante y por dependiente, se pagan por fases y no se devuelven, tampoco si el expediente se rechaza.',
        ],
      },
      {
        en: [
          'Declared capital assets at the required level',
          'A minimum of assets must be held, with part of it liquid. The composition matters as much as the total, so check the rule in force.',
        ],
        pt: [
          'Ativos patrimoniais declarados no nível exigido',
          'É preciso deter um mínimo de ativos, com parte deles líquidos. A composição importa tanto quanto o total, por isso verifique a regra vigente.',
        ],
        es: [
          'Activos patrimoniales declarados en el nivel exigido',
          'Debe mantenerse un mínimo de activos, con una parte líquida. La composición importa tanto como el total, así que revise la regla vigente.',
        ],
      },
      {
        en: [
          'All-risk health insurance covering Malta',
          'For every applicant, and it must remain valid for as long as the residence certificate is held.',
        ],
        pt: [
          'Seguro de saúde all-risk com cobertura em Malta',
          'Para cada requerente, e tem de continuar válido enquanto o certificado de residência for mantido.',
        ],
        es: [
          'Seguro de salud a todo riesgo con cobertura en Malta',
          'Para cada solicitante, y debe seguir vigente mientras se conserve el certificado de residencia.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'The agent lodges the file with Residency Malta Agency',
          'Filing is electronic and the agent remains the channel for every later exchange with the agency.',
        ],
        pt: [
          'O agente protocola o processo na Residency Malta Agency',
          'A entrega é eletrónica e o agente continua a ser o canal para todas as trocas posteriores com a agência.',
        ],
        es: [
          'El agente presenta el expediente ante la Residency Malta Agency',
          'La presentación es electrónica y el agente sigue siendo el canal de todo intercambio posterior con la agencia.',
        ],
      },
      {
        en: [
          'Pay the fees in the stages required',
          'Part on submission and the balance after the letter of approval in principle; missing the second deadline voids the approval.',
        ],
        pt: [
          'Pagar as taxas nas fases exigidas',
          'Parte na entrega e o restante após a carta de aprovação em princípio; perder o segundo prazo anula a aprovação.',
        ],
        es: [
          'Pagar las tasas en las fases exigidas',
          'Una parte al presentar y el resto tras la carta de aprobación en principio; incumplir el segundo plazo anula la aprobación.',
        ],
      },
      {
        en: [
          'Answer due diligence questions promptly',
          'The processing clock effectively stops while the agency waits for you, and slow replies are the main cause of long cases.',
        ],
        pt: [
          'Responder depressa às perguntas de diligência devida',
          'O relógio do processamento praticamente para enquanto a agência espera por si, e as respostas lentas são a principal causa de processos longos.',
        ],
        es: [
          'Responder con rapidez a las consultas de diligencia debida',
          'El reloj de tramitación se detiene mientras la agencia le espera, y las respuestas lentas son la causa principal de expedientes largos.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Attend biometric capture in Malta',
          'Every applicant, including children, must appear in person once the file is approved in principle; this cannot be done from abroad.',
        ],
        pt: [
          'Comparecer à recolha biométrica em Malta',
          'Todos os requerentes, inclusive crianças, têm de comparecer pessoalmente após a aprovação em princípio; não se faz do exterior.',
        ],
        es: [
          'Acudir a la toma de datos biométricos en Malta',
          'Todos los solicitantes, incluidos los menores, deben presentarse en persona tras la aprobación en principio; no puede hacerse desde el extranjero.',
        ],
      },
      {
        en: [
          'Keep the insurance policy continuously renewed',
          'Compliance checks look at whether the cover lapsed at any point, not only at whether it exists today.',
        ],
        pt: [
          'Manter a apólice de seguro continuamente renovada',
          'As verificações de conformidade olham se a cobertura falhou em algum momento, e não apenas se existe hoje.',
        ],
        es: [
          'Mantener la póliza de seguro renovada sin interrupción',
          'Los controles de cumplimiento miran si la cobertura se interrumpió en algún momento, no solo si existe hoy.',
        ],
        priority: 2,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Complete the property and payments within the deadline',
          'After the letter of approval in principle there is a fixed window to finalise the property and the contributions; the approval expires if it passes.',
        ],
        pt: [
          'Concluir o imóvel e os pagamentos dentro do prazo',
          'Após a carta de aprovação em princípio há uma janela fixa para finalizar o imóvel e as contribuições; a aprovação caduca se ela passar.',
        ],
        es: [
          'Completar el inmueble y los pagos dentro del plazo',
          'Tras la carta de aprobación en principio hay una ventana fija para cerrar el inmueble y las contribuciones; la aprobación caduca si vence.',
        ],
      },
      {
        en: [
          'Collect the residence certificate and the cards',
          'The certificate is the status; the eResidence cards are the documents you carry and they are renewed on their own cycle.',
        ],
        pt: [
          'Levantar o certificado de residência e os cartões',
          'O certificado é o estatuto; os cartões eResidence são os documentos que se transportam e têm o seu próprio ciclo de renovação.',
        ],
        es: [
          'Recoger el certificado de residencia y las tarjetas',
          'El certificado es el estatus; las tarjetas eResidence son los documentos que se llevan y se renuevan en su propio ciclo.',
        ],
      },
      {
        en: [
          'Pass the annual compliance checks',
          'For the first years the agency verifies that the property, the insurance and the asset position are still in place. Failing to report a change can cost the certificate.',
        ],
        pt: [
          'Passar nas verificações anuais de conformidade',
          'Nos primeiros anos a agência confirma que o imóvel, o seguro e a posição patrimonial se mantêm. Não comunicar uma alteração pode custar o certificado.',
        ],
        es: [
          'Superar las comprobaciones anuales de cumplimiento',
          'Durante los primeros años la agencia verifica que el inmueble, el seguro y la posición patrimonial siguen vigentes. No comunicar un cambio puede costar el certificado.',
        ],
      },
      {
        en: [
          'Understand what the status does not include',
          'It is residence, not citizenship, and it does not by itself authorise employment in Malta or residence in another EU state. Working needs a separate authorisation.',
        ],
        pt: [
          'Entender o que o estatuto não inclui',
          'É residência, não cidadania, e não autoriza por si só trabalhar em Malta nem residir noutro Estado da UE. Trabalhar exige autorização separada.',
        ],
        es: [
          'Entender lo que el estatus no incluye',
          'Es residencia, no ciudadanía, y no autoriza por sí solo trabajar en Malta ni residir en otro Estado de la UE. Trabajar exige una autorización aparte.',
        ],
      },
      {
        en: [
          'Take tax advice before moving your affairs',
          'Holding Maltese residence does not automatically make you tax resident, and the remittance rules are specific. Decide this deliberately rather than by accident.',
        ],
        pt: [
          'Procurar aconselhamento fiscal antes de mover os seus assuntos',
          'Ter residência maltesa não o torna automaticamente residente fiscal, e as regras de remessa são específicas. Decida isso de forma deliberada, não por acidente.',
        ],
        es: [
          'Buscar asesoramiento fiscal antes de mover sus asuntos',
          'Tener residencia maltesa no le convierte automáticamente en residente fiscal, y las reglas de remesa son específicas. Decídalo de forma deliberada, no por accidente.',
        ],
        priority: 2,
      },
    ],
  },

  'Nomad Residence Permit': {
    core_documents: [
      {
        en: [
          'Prove the work is performed for entities outside Malta',
          'An employment contract with a foreign company, ownership of a company registered abroad, or freelance contracts with clients abroad. Maltese employers and clients disqualify you.',
        ],
        pt: [
          'Provar que o trabalho é feito para entidades fora de Malta',
          'Contrato de trabalho com empresa estrangeira, participação em empresa registada no exterior, ou contratos freelance com clientes de fora. Empregadores e clientes malteses desqualificam o pedido.',
        ],
        es: [
          'Probar que el trabajo se realiza para entidades fuera de Malta',
          'Contrato laboral con una empresa extranjera, propiedad de una sociedad registrada fuera, o contratos freelance con clientes del exterior. Empleadores y clientes malteses le descalifican.',
        ],
      },
      {
        en: [
          'Passport valid for the permit period',
          'Third-country nationals only; EU citizens do not use this route and register as EU residents instead.',
        ],
        pt: [
          'Passaporte válido para o período da autorização',
          'Apenas nacionais de países terceiros; cidadãos da UE não usam esta via e registam-se como residentes da UE.',
        ],
        es: [
          'Pasaporte vigente para el periodo del permiso',
          'Solo nacionales de terceros países; los ciudadanos de la UE no usan esta vía y se registran como residentes de la UE.',
        ],
      },
      {
        en: [
          'Application form and letter of intent',
          'Filed directly with Residency Malta Agency by email. Unlike the investment programme, this route needs no licensed agent.',
        ],
        pt: [
          'Formulário de pedido e carta de intenção',
          'Enviados diretamente à Residency Malta Agency por email. Ao contrário do programa de investimento, esta via não precisa de agente licenciado.',
        ],
        es: [
          'Formulario de solicitud y carta de intención',
          'Se envían directamente a la Residency Malta Agency por correo electrónico. A diferencia del programa de inversión, esta vía no requiere agente autorizado.',
        ],
      },
      {
        en: [
          'Curriculum vitae',
          'The agency reads it against the contracts to confirm the work really is location independent.',
        ],
        pt: [
          'Curriculum vitae',
          'A agência lê-o contra os contratos para confirmar que o trabalho é mesmo independente de localização.',
        ],
        es: [
          'Curriculum vitae',
          'La agencia lo contrasta con los contratos para confirmar que el trabajo es realmente independiente de la ubicación.',
        ],
      },
      {
        en: [
          'Address in Malta for the permit',
          'A hotel booking may be accepted for the initial submission, but it has to be replaced by a lease or purchase agreement before the permit is issued.',
        ],
        pt: [
          'Morada em Malta para a autorização',
          'Uma reserva de hotel pode ser aceite na entrega inicial, mas tem de ser substituída por contrato de arrendamento ou compra antes da emissão.',
        ],
        es: [
          'Domicilio en Malta para el permiso',
          'Una reserva de hotel puede aceptarse en la presentación inicial, pero debe sustituirse por un contrato de alquiler o compra antes de emitir el permiso.',
        ],
      },
      {
        en: [
          'Police conduct certificate for the nomad file',
          'Recent, from your country of residence, and accompanied by a certified translation where it is not in English.',
        ],
        pt: [
          'Certificado de registo criminal para o processo de nómada',
          'Recente, do país de residência, e acompanhado de tradução certificada quando não estiver em inglês.',
        ],
        es: [
          'Certificado de antecedentes para el expediente de nómada',
          'Reciente, del país de residencia, y acompañado de traducción certificada si no está en inglés.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Meet the minimum gross annual income',
          'The threshold is set in the programme guidelines and has been raised since launch. Confirm the current figure; the income must arise outside Malta.',
        ],
        pt: [
          'Atingir o rendimento bruto anual mínimo',
          'O limiar está nas orientações do programa e já foi aumentado desde o lançamento. Confirme o valor atual; o rendimento tem de ter origem fora de Malta.',
        ],
        es: [
          'Alcanzar el ingreso bruto anual mínimo',
          'El umbral figura en las directrices del programa y se ha elevado desde su lanzamiento. Confirme la cifra actual; los ingresos deben originarse fuera de Malta.',
        ],
      },
      {
        en: [
          'Show several months of income history',
          'Payslips or invoices together with bank statements. Regularity is what is assessed, not a single large deposit made before applying.',
        ],
        pt: [
          'Mostrar vários meses de histórico de rendimento',
          'Recibos de vencimento ou faturas junto com extratos bancários. Avalia-se a regularidade, não um único depósito grande feito antes do pedido.',
        ],
        es: [
          'Mostrar varios meses de historial de ingresos',
          'Nóminas o facturas junto con extractos bancarios. Se evalúa la regularidad, no un único depósito grande hecho antes de solicitar.',
        ],
      },
      {
        en: [
          'Health insurance covering all risks in Malta',
          'For you and any accompanying family member, valid for the full permit period.',
        ],
        pt: [
          'Seguro de saúde com cobertura de todos os riscos em Malta',
          'Para si e para qualquer familiar acompanhante, válido por todo o período da autorização.',
        ],
        es: [
          'Seguro de salud que cubra todos los riesgos en Malta',
          'Para usted y para cualquier familiar acompañante, válido durante todo el periodo del permiso.',
        ],
      },
      {
        en: [
          'Pay the administrative fee per person',
          'Charged for the main applicant and for each dependant included in the file.',
        ],
        pt: [
          'Pagar a taxa administrativa por pessoa',
          'Cobrada ao requerente principal e a cada dependente incluído no processo.',
        ],
        es: [
          'Pagar la tasa administrativa por persona',
          'Se cobra al solicitante principal y a cada dependiente incluido en el expediente.',
        ],
      },
      {
        en: [
          'Budget for tax on the authorised income',
          'A 2023 legal notice put income earned under this permit under a flat rate of Maltese tax. Treat the permit as taxable in Malta; older articles describing it as tax free are out of date.',
        ],
        pt: [
          'Prever imposto sobre o rendimento autorizado',
          'Um aviso legal de 2023 colocou o rendimento obtido ao abrigo desta autorização sob uma taxa fixa de imposto maltês. Trate a autorização como tributável em Malta; artigos antigos que a descrevem como isenta estão desatualizados.',
        ],
        es: [
          'Prever el impuesto sobre los ingresos autorizados',
          'Un aviso legal de 2023 sometió los ingresos obtenidos bajo este permiso a un tipo fijo de impuesto maltés. Considérelo tributable en Malta; los artículos antiguos que lo describen como exento están desfasados.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Send the application to the agency nomad unit',
          'Submission is by email to a dedicated address; incomplete files are returned rather than held, which restarts the wait.',
        ],
        pt: [
          'Enviar o pedido à unidade de nómadas da agência',
          'A entrega é por email para um endereço dedicado; processos incompletos são devolvidos em vez de retidos, o que reinicia a espera.',
        ],
        es: [
          'Enviar la solicitud a la unidad de nómadas de la agencia',
          'La presentación es por correo a una dirección específica; los expedientes incompletos se devuelven en vez de retenerse, lo que reinicia la espera.',
        ],
      },
      {
        en: [
          'Wait for approval in principle before committing',
          'Do not resign, ship belongings or sign a long lease until the letter arrives; a refusal at this stage is not appealable in any quick way.',
        ],
        pt: [
          'Esperar a aprovação em princípio antes de se comprometer',
          'Não se demita, não envie pertences nem assine arrendamento longo antes de a carta chegar; uma recusa nesta fase não tem recurso rápido.',
        ],
        es: [
          'Esperar la aprobación en principio antes de comprometerse',
          'No renuncie, no envíe pertenencias ni firme un alquiler largo antes de recibir la carta; una denegación en esta fase no tiene recurso rápido.',
        ],
      },
      {
        en: [
          'Collect the national visa if your nationality needs one',
          'Visa-required nationals get a national visa to enter and complete the process; visa-exempt nationals travel and finish it in Malta.',
        ],
        pt: [
          'Levantar o visto nacional se a sua nacionalidade exigir',
          'Nacionais sujeitos a visto recebem um visto nacional para entrar e concluir o processo; os isentos viajam e terminam em Malta.',
        ],
        es: [
          'Recoger el visado nacional si su nacionalidad lo exige',
          'Los nacionales sujetos a visado reciben un visado nacional para entrar y completar el trámite; los exentos viajan y lo terminan en Malta.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Attend biometrics in Malta for the residence card',
          'Booked after approval; the card is only issued once the appointment is done and the final address is registered.',
        ],
        pt: [
          'Comparecer à biometria em Malta para o cartão de residência',
          'Agendada após a aprovação; o cartão só é emitido depois do atendimento e do registo da morada definitiva.',
        ],
        es: [
          'Acudir a la biometría en Malta para la tarjeta de residencia',
          'Se reserva tras la aprobación; la tarjeta solo se emite una vez hecha la cita y registrado el domicilio definitivo.',
        ],
      },
      {
        en: [
          'Arrange private healthcare in practice',
          'Nomad permit holders are outside the contributory public system, so a family doctor and any treatment are paid privately or through the policy.',
        ],
        pt: [
          'Organizar na prática o acesso à saúde privada',
          'Titulares da autorização de nómada estão fora do sistema público contributivo, por isso médico de família e tratamentos são pagos privadamente ou pela apólice.',
        ],
        es: [
          'Organizar en la práctica la atención sanitaria privada',
          'Los titulares del permiso de nómada quedan fuera del sistema público contributivo, así que el médico de cabecera y los tratamientos se pagan de forma privada o por la póliza.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the nomad residence card',
          'Check the expiry date on it; the permit runs for a limited term and the renewal window is short.',
        ],
        pt: [
          'Levantar o cartão de residência de nómada',
          'Confira a data de validade; a autorização tem prazo limitado e a janela de renovação é curta.',
        ],
        es: [
          'Recoger la tarjeta de residencia de nómada',
          'Revise la fecha de caducidad; el permiso tiene un plazo limitado y la ventana de renovación es corta.',
        ],
      },
      {
        en: [
          'Renew each year on fresh evidence',
          'Renewal is not automatic: income, insurance and the lease are examined again, and a year where earnings fell below the threshold ends the permit.',
        ],
        pt: [
          'Renovar todos os anos com provas novas',
          'A renovação não é automática: rendimento, seguro e arrendamento são examinados de novo, e um ano com ganhos abaixo do limiar encerra a autorização.',
        ],
        es: [
          'Renovar cada año con pruebas nuevas',
          'La renovación no es automática: ingresos, seguro y alquiler se examinan de nuevo, y un año con ganancias por debajo del umbral termina el permiso.',
        ],
      },
      {
        en: [
          'Do not take on Maltese clients or an employer',
          'Moving the source of income into Malta breaks the basis of the permit and is grounds for revocation, even if the work is remote.',
        ],
        pt: [
          'Não aceitar clientes ou empregador malteses',
          'Mover a fonte de rendimento para Malta quebra o fundamento da autorização e é motivo de revogação, mesmo que o trabalho seja remoto.',
        ],
        es: [
          'No aceptar clientes ni empleador malteses',
          'Trasladar la fuente de ingresos a Malta rompe el fundamento del permiso y es motivo de revocación, aunque el trabajo sea remoto.',
        ],
      },
      {
        en: [
          'Plan for the maximum total duration',
          'The permit cannot be held indefinitely. If you intend to settle, start looking at a work or investment route well before the ceiling is reached.',
        ],
        pt: [
          'Planear em função da duração total máxima',
          'A autorização não pode ser mantida indefinidamente. Se pretende fixar-se, comece a estudar uma via de trabalho ou investimento bem antes de atingir o teto.',
        ],
        es: [
          'Planificar según la duración total máxima',
          'El permiso no puede mantenerse indefinidamente. Si piensa asentarse, empiece a estudiar una vía de trabajo o inversión mucho antes de llegar al tope.',
        ],
      },
      {
        en: [
          'Notify the agency of any change in your situation',
          'A new address, a change of employer or client base, or a dependant joining you must all be reported while the permit is live.',
        ],
        pt: [
          'Comunicar à agência qualquer mudança na sua situação',
          'Nova morada, mudança de empregador ou de carteira de clientes, ou a chegada de um dependente têm de ser comunicadas enquanto a autorização estiver ativa.',
        ],
        es: [
          'Comunicar a la agencia cualquier cambio en su situación',
          'Un nuevo domicilio, un cambio de empleador o de cartera de clientes, o la llegada de un dependiente deben comunicarse mientras el permiso esté vigente.',
        ],
      },
    ],
  },
};
