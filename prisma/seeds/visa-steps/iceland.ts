import type { CountryVisaSteps } from './types';

/**
 * Steps for Iceland.
 *
 * Iceland sits in Schengen and in the European Economic Area but outside the
 * European Union, so the travel rules are European while the residence and
 * labour rules are entirely national.
 *
 * The kennitala, the national identity number issued by Registers Iceland, is
 * what unlocks ordinary life: bank account, phone contract, tax card, salary
 * paid properly. It does not come with the permit and it only follows a
 * registered legal domicile, which is why the remote work visa leaves people
 * strangely locked out.
 *
 * Work for non-EEA nationals is deliberately narrow. The employer has to
 * advertise across the EEA and justify the hire, the trade union gets to comment
 * on the contract terms, and the Directorate of Labour and the Directorate of
 * Immigration each issue their own decision. The cost of living then shows up
 * again in the support figures every applicant has to meet.
 */
export const iceland: CountryVisaSteps = {
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
          'Schengen application form for Iceland',
          'Iceland applies the Schengen rules without being in the European Union, so the form is common but the decision is Icelandic.',
        ],
        pt: [
          'Formulário Schengen para a Islândia',
          'A Islândia aplica as regras Schengen sem estar na União Europeia, então o formulário é comum mas a decisão é islandesa.',
        ],
        es: [
          'Formulario Schengen para Islandia',
          'Islandia aplica las normas Schengen sin estar en la Unión Europea, así que el formulario es común pero la decisión es islandesa.',
        ],
      },
      {
        en: [
          'Recent photograph to Schengen standard',
          'Taken in the last six months, on a light background, without glasses.',
        ],
        pt: [
          'Fotografia recente no padrão Schengen',
          'Tirada nos últimos seis meses, em fundo claro, sem óculos.',
        ],
        es: [
          'Fotografía reciente en formato Schengen',
          'Tomada en los últimos seis meses, con fondo claro, sin gafas.',
        ],
      },
      {
        en: [
          'Confirmed flights and the itinerary inside the country',
          'Iceland asks for the route you plan to take on the island as well, since distances and weather make the plan matter.',
        ],
        pt: [
          'Voos confirmados e o itinerário dentro do país',
          'A Islândia pede também o percurso que você planeia fazer na ilha, já que distâncias e clima tornam o plano relevante.',
        ],
        es: [
          'Vuelos confirmados y el itinerario dentro del país',
          'Islandia pide también el recorrido previsto en la isla, ya que las distancias y el clima hacen que el plan importe.',
        ],
      },
      {
        en: [
          'Accommodation booking or a confirmed invitation',
          'A private host completes an official invitation form that the Directorate of Immigration confirms before the mission will accept it.',
        ],
        pt: [
          'Reserva de alojamento ou convite confirmado',
          'Um anfitrião particular preenche um formulário oficial de convite que a Direção de Imigração confirma antes de a missão o aceitar.',
        ],
        es: [
          'Reserva de alojamiento o invitación confirmada',
          'Un anfitrión particular rellena un formulario oficial de invitación que la Dirección de Inmigración confirma antes de que la misión lo acepte.',
        ],
      },
      {
        en: [
          'Travel insurance covering 30,000 euros',
          'Valid throughout Schengen, and worth checking that mountain rescue and medical evacuation are included given where visitors actually go.',
        ],
        pt: [
          'Seguro de viagem com cobertura de 30 mil euros',
          'Válido em todo o espaço Schengen, e vale conferir se resgate em montanha e evacuação médica estão incluídos, dado por onde os visitantes andam.',
        ],
        es: [
          'Seguro de viaje con cobertura de 30 mil euros',
          'Válido en todo el espacio Schengen, y conviene comprobar que incluye rescate en montaña y evacuación médica, dado por dónde se mueven los visitantes.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of funds at the Icelandic daily rate',
          'A per-day amount per person, set high because prices are, with a lower figure when accommodation is already paid. Check the amount in force.',
        ],
        pt: [
          'Comprovação de fundos pela diária islandesa',
          'Um valor por dia e por pessoa, alto porque os preços também são, com um valor menor quando o alojamento já está pago. Confirme o montante vigente.',
        ],
        es: [
          'Prueba de fondos según la cuantía diaria islandesa',
          'Un importe por día y por persona, alto porque los precios lo son, con una cifra menor si el alojamiento ya está pagado. Compruebe el importe vigente.',
        ],
      },
      {
        en: [
          'Bank statements for the last three months',
          'They have to show the money was there before the trip was planned, not deposited for the application.',
        ],
        pt: [
          'Extratos bancários dos últimos três meses',
          'Precisam mostrar que o dinheiro já estava lá antes de a viagem ser planeada, e não depositado para o pedido.',
        ],
        es: [
          'Extractos bancarios de los últimos tres meses',
          'Deben mostrar que el dinero ya estaba antes de planear el viaje, y no depositado para la solicitud.',
        ],
      },
      {
        en: [
          'Proof of ties and approved leave',
          'Employment, study or business documents that explain why you are going back.',
        ],
        pt: [
          'Comprovativo de vínculos e de férias aprovadas',
          'Documentos de emprego, estudo ou empresa que expliquem por que você vai voltar.',
        ],
        es: [
          'Comprobante de vínculos y de vacaciones aprobadas',
          'Documentos de empleo, estudio o empresa que expliquen por qué va a regresar.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Check which country represents Iceland where you live',
          'Iceland has few missions and is represented by Denmark or Norway in many places, each with its own appointment system and queue.',
        ],
        pt: [
          'Verificar qual país representa a Islândia onde você vive',
          'A Islândia tem poucas missões e é representada pela Dinamarca ou pela Noruega em muitos lugares, cada uma com o seu sistema de agendamento e a sua fila.',
        ],
        es: [
          'Comprobar qué país representa a Islandia donde usted vive',
          'Islandia tiene pocas misiones y está representada por Dinamarca o Noruega en muchos lugares, cada una con su propio sistema de citas y su cola.',
        ],
      },
      {
        en: [
          'Pay the visa fee',
          'Not refunded on refusal, and paid before or at the appointment depending on the mission handling the file.',
        ],
        pt: [
          'Pagar a taxa de visto',
          'Não devolvida em caso de recusa, e paga antes ou no atendimento, conforme a missão que trata o processo.',
        ],
        es: [
          'Pagar la tasa de visado',
          'No se devuelve si deniegan, y se paga antes o en la cita según la misión que gestione el expediente.',
        ],
      },
      {
        en: [
          'Apply within the allowed window before travel',
          'No earlier than six months ahead, and in practice not in the final weeks, since files are often sent to Reykjavík for a decision.',
        ],
        pt: [
          'Pedir dentro da janela permitida antes da viagem',
          'No máximo seis meses antes e, na prática, não nas últimas semanas, já que os processos costumam ser enviados a Reiquiavique para decisão.',
        ],
        es: [
          'Solicitar dentro de la ventana permitida antes del viaje',
          'Como mucho seis meses antes y, en la práctica, no en las últimas semanas, ya que los expedientes suelen enviarse a Reikiavik para su decisión.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints and photograph for the Schengen system',
          'Stored for 59 months and reused for later applications to any Schengen state, Iceland included.',
        ],
        pt: [
          'Impressões digitais e fotografia para o sistema Schengen',
          'Guardadas por 59 meses e reaproveitadas em pedidos posteriores a qualquer Estado Schengen, incluindo a Islândia.',
        ],
        es: [
          'Huellas y fotografía para el sistema Schengen',
          'Se conservan 59 meses y se reutilizan en solicitudes posteriores a cualquier Estado Schengen, Islandia incluida.',
        ],
      },
      {
        en: [
          'Health screening for a short visit',
          'Not part of a visitor visa. The tuberculosis check only applies to people coming to live in Iceland.',
        ],
        pt: [
          'Rastreio de saúde para uma visita curta',
          'Não faz parte do visto de visitante. O exame de tuberculose só se aplica a quem vem viver na Islândia.',
        ],
        es: [
          'Cribado sanitario para una visita corta',
          'No forma parte del visado de visitante. La prueba de tuberculosis solo se aplica a quien viene a vivir a Islandia.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Check the entries and dates printed on the sticker',
          'A single-entry visa ends the moment you leave, even if the dates still run.',
        ],
        pt: [
          'Conferir as entradas e as datas impressas na vinheta',
          'Um visto de entrada única termina no momento em que você sai, mesmo que as datas ainda corram.',
        ],
        es: [
          'Revisar las entradas y las fechas impresas en la etiqueta',
          'Un visado de entrada única termina en el momento en que sale, aunque las fechas sigan vigentes.',
        ],
      },
      {
        en: [
          'Count Nordic days in the same allowance',
          'Time spent in Denmark, Norway, Sweden and Finland goes into the same 90 in 180, since they are all Schengen states.',
        ],
        pt: [
          'Contar os dias nórdicos na mesma franquia',
          'O tempo passado na Dinamarca, Noruega, Suécia e Finlândia entra nos mesmos 90 em 180, já que são todos Estados Schengen.',
        ],
        es: [
          'Contar los días nórdicos en la misma franquicia',
          'El tiempo en Dinamarca, Noruega, Suecia y Finlandia entra en los mismos 90 en 180, ya que son todos Estados Schengen.',
        ],
      },
      {
        en: [
          'Respect the strict import rules on arrival',
          'Raw meat, dairy and unwashed riding gear are restricted or banned to protect Icelandic livestock, and the controls are real.',
        ],
        pt: [
          'Respeitar as regras estritas de importação na chegada',
          'Carne crua, laticínios e equipamento de equitação por lavar são restritos ou proibidos para proteger o gado islandês, e a fiscalização é real.',
        ],
        es: [
          'Respetar las estrictas normas de importación al llegar',
          'La carne cruda, los lácteos y el equipo de equitación sin lavar están restringidos o prohibidos para proteger la cabaña islandesa, y los controles son reales.',
        ],
      },
      {
        en: [
          'Do not start a residence application from inside',
          'First residence permits are normally decided while you are abroad, and arriving as a visitor first can cost you the application altogether.',
        ],
        pt: [
          'Não iniciar um pedido de residência de dentro do país',
          'As primeiras autorizações de residência são normalmente decididas com você no exterior, e chegar antes como visitante pode custar-lhe o pedido inteiro.',
        ],
        es: [
          'No iniciar una solicitud de residencia desde dentro',
          'Los primeros permisos de residencia se deciden normalmente estando usted fuera, y llegar antes como visitante puede costarle la solicitud entera.',
        ],
      },
    ],
  },

  'Long-Term Remote Work Visa': {
    core_documents: [
      {
        en: [
          'Confirm you fall inside the remote work category',
          'It exists for non-EEA nationals working remotely for an employer or clients outside Iceland. Citizens of the EEA and EFTA move freely and never use it.',
        ],
        pt: [
          'Confirmar que você se enquadra na categoria de trabalho remoto',
          'Ela existe para nacionais de fora do EEE que trabalham remotamente para empregador ou clientes fora da Islândia. Cidadãos do EEE e da EFTA circulam livremente e nunca a usam.',
        ],
        es: [
          'Confirmar que encaja en la categoría de trabajo remoto',
          'Existe para nacionales de fuera del EEE que trabajan en remoto para un empleador o clientes fuera de Islandia. Los ciudadanos del EEE y la AELC circulan libremente y nunca la usan.',
        ],
      },
      {
        en: [
          'Signed application sent to the Directorate of Immigration',
          'The file goes to Útlendingastofnun, which decides it. A consulate cannot grant this visa on its own.',
        ],
        pt: [
          'Pedido assinado enviado à Direção de Imigração',
          'O processo vai para a Útlendingastofnun, que o decide. Um consulado não pode conceder este visto por conta própria.',
        ],
        es: [
          'Solicitud firmada enviada a la Dirección de Inmigración',
          'El expediente va a Útlendingastofnun, que lo decide. Un consulado no puede conceder este visado por su cuenta.',
        ],
      },
      {
        en: [
          'Passport valid three months beyond the stay',
          'And issued within the last ten years, as for any Schengen document.',
        ],
        pt: [
          'Passaporte válido três meses além da estada',
          'E emitido nos últimos dez anos, como para qualquer documento Schengen.',
        ],
        es: [
          'Pasaporte vigente tres meses más allá de la estancia',
          'Y emitido en los últimos diez años, como para cualquier documento Schengen.',
        ],
      },
      {
        en: [
          'Confirmation of work for a foreign employer or clients',
          'A letter permitting remote work, or contracts showing self-employment with clients based outside Iceland.',
        ],
        pt: [
          'Confirmação de trabalho para empregador ou clientes estrangeiros',
          'Uma carta autorizando o trabalho remoto, ou contratos que mostrem atividade autónoma com clientes sediados fora da Islândia.',
        ],
        es: [
          'Confirmación de trabajo para un empleador o clientes extranjeros',
          'Una carta que autorice el trabajo en remoto, o contratos que muestren actividad autónoma con clientes radicados fuera de Islandia.',
        ],
      },
      {
        en: [
          'Criminal record certificate for the file',
          'Recent and, where required, apostilled and translated into English or Icelandic.',
        ],
        pt: [
          'Certidão de antecedentes criminais para o processo',
          'Recente e, quando exigido, apostilada e traduzida para inglês ou islandês.',
        ],
        es: [
          'Certificado de antecedentes penales para el expediente',
          'Reciente y, cuando se exija, apostillado y traducido al inglés o al islandés.',
        ],
      },
      {
        en: [
          'Proof of accommodation in Iceland',
          'The rental market in Reykjavík is tight and expensive, and arranging this from abroad is usually harder than the paperwork itself.',
        ],
        pt: [
          'Comprovativo de alojamento na Islândia',
          'O mercado de arrendamento em Reiquiavique é apertado e caro, e resolver isto do exterior costuma ser mais difícil do que a papelada.',
        ],
        es: [
          'Comprobante de alojamiento en Islandia',
          'El mercado de alquiler en Reikiavik es escaso y caro, y resolverlo desde fuera suele ser más difícil que el papeleo.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Monthly income above the high Icelandic threshold',
          'Set in Icelandic krónur and among the highest anywhere, with a higher figure if a spouse comes along. Check the amount in force before applying.',
        ],
        pt: [
          'Rendimento mensal acima do elevado limiar islandês',
          'Definido em coroas islandesas e dos mais altos que existem, com um valor maior se o cônjuge vier junto. Verifique o montante vigente antes de pedir.',
        ],
        es: [
          'Ingreso mensual por encima del alto umbral islandés',
          'Fijado en coronas islandesas y de los más altos que existen, con una cifra mayor si viene el cónyuge. Compruebe el importe vigente antes de solicitar.',
        ],
      },
      {
        en: [
          'Six months of payslips or account statements',
          'Showing the income arriving regularly, not a single balance held on the day of the application.',
        ],
        pt: [
          'Seis meses de recibos de vencimento ou extratos',
          'Mostrando o rendimento a entrar com regularidade, e não um saldo isolado no dia do pedido.',
        ],
        es: [
          'Seis meses de nóminas o extractos de cuenta',
          'Que muestren el ingreso entrando con regularidad, no un saldo aislado el día de la solicitud.',
        ],
      },
      {
        en: [
          'Health insurance for the entire period',
          'The visa gives no access to Icelandic Health Insurance, so private cover is compulsory and has to be evidenced.',
        ],
        pt: [
          'Seguro de saúde para todo o período',
          'O visto não dá acesso ao seguro de saúde islandês, então a cobertura privada é obrigatória e precisa ser comprovada.',
        ],
        es: [
          'Seguro de salud para todo el periodo',
          'El visado no da acceso al seguro de salud islandés, así que la cobertura privada es obligatoria y debe acreditarse.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Pay the visa fee before the file is examined',
          'The application is not looked at until the payment is registered against your case.',
        ],
        pt: [
          'Pagar a taxa do visto antes de o processo ser analisado',
          'O pedido não é examinado enquanto o pagamento não for registado no seu caso.',
        ],
        es: [
          'Pagar la tasa del visado antes de examinar el expediente',
          'La solicitud no se estudia hasta que el pago queda registrado en su caso.',
        ],
      },
      {
        en: [
          'Apply from outside Iceland',
          'The application is made before travelling. You cannot enter as a tourist and convert the stay into this visa from inside.',
        ],
        pt: [
          'Pedir a partir de fora da Islândia',
          'O pedido é feito antes de viajar. Não é possível entrar como turista e converter a estada neste visto de dentro do país.',
        ],
        es: [
          'Solicitar desde fuera de Islandia',
          'La solicitud se hace antes de viajar. No se puede entrar como turista y convertir la estancia en este visado desde dentro.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Photograph and signature for the long-term visa',
          'Collected where the visa is issued, at the mission representing Iceland in your country.',
        ],
        pt: [
          'Fotografia e assinatura para o visto de longa duração',
          'Recolhidas onde o visto é emitido, na missão que representa a Islândia no seu país.',
        ],
        es: [
          'Fotografía y firma para el visado de larga duración',
          'Se recogen donde se expide el visado, en la misión que representa a Islandia en su país.',
        ],
      },
      {
        en: [
          'Medical examination',
          'Not required for this visa, because it does not create a legal domicile in Iceland.',
        ],
        pt: [
          'Exame médico',
          'Não é exigido neste visto, porque ele não cria domicílio legal na Islândia.',
        ],
        es: [
          'Examen médico',
          'No se exige en este visado, porque no crea domicilio legal en Islandia.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Know that Schengen days already used are deducted',
          'The period granted is reduced by the time you have recently spent in the Schengen area, which shortens many stays unexpectedly.',
        ],
        pt: [
          'Saber que os dias Schengen já usados são descontados',
          'O período concedido é reduzido pelo tempo que você passou recentemente no espaço Schengen, o que encurta muitas estadas de forma inesperada.',
        ],
        es: [
          'Saber que los días Schengen ya usados se descuentan',
          'El periodo concedido se reduce por el tiempo que haya pasado recientemente en el espacio Schengen, lo que acorta muchas estancias de forma inesperada.',
        ],
      },
      {
        en: [
          'Stay under the 183-day tax residency line',
          'The visa is deliberately shorter than the period that would make you an Icelandic tax resident. Extending the stay by another route changes your tax position.',
        ],
        pt: [
          'Ficar abaixo da linha dos 183 dias de residência fiscal',
          'O visto é propositadamente mais curto do que o período que o tornaria residente fiscal islandês. Prolongar a estada por outra via muda a sua posição fiscal.',
        ],
        es: [
          'Quedarse por debajo de la línea de 183 días fiscales',
          'El visado es deliberadamente más corto que el periodo que le convertiría en residente fiscal islandés. Prolongar la estancia por otra vía cambia su situación fiscal.',
        ],
      },
      {
        en: [
          'Do not work for an Icelandic company or client',
          'Any income from an Icelandic employer or customer falls outside the visa and would require a work permit.',
        ],
        pt: [
          'Não trabalhar para empresa ou cliente islandês',
          'Qualquer rendimento de empregador ou cliente islandês fica fora do visto e exigiria uma autorização de trabalho.',
        ],
        es: [
          'No trabajar para una empresa o cliente islandés',
          'Cualquier ingreso de un empleador o cliente islandés queda fuera del visado y exigiría un permiso de trabajo.',
        ],
      },
      {
        en: [
          'Accept that the visa is not renewed or converted',
          'It runs once, cannot become a residence permit, and a new application is only possible after a waiting period spent outside the country.',
        ],
        pt: [
          'Aceitar que o visto não é renovado nem convertido',
          'Ele vale uma vez, não se transforma em autorização de residência, e um novo pedido só é possível após um período de espera passado fora do país.',
        ],
        es: [
          'Aceptar que el visado no se renueva ni se convierte',
          'Vale una sola vez, no se transforma en permiso de residencia, y una nueva solicitud solo es posible tras un periodo de espera fuera del país.',
        ],
      },
      {
        en: [
          'Expect life without a full national identity number',
          'Without legal domicile you do not get the kennitala that opens banks, contracts and public services, so plan payments and a phone line around that gap.',
        ],
        pt: [
          'Contar com a vida sem um número nacional de identidade completo',
          'Sem domicílio legal você não recebe a kennitala que abre bancos, contratos e serviços públicos, então planeie pagamentos e linha telefónica em torno dessa lacuna.',
        ],
        es: [
          'Contar con la vida sin un número nacional de identidad completo',
          'Sin domicilio legal no obtiene la kennitala que abre bancos, contratos y servicios públicos, así que planifique pagos y línea telefónica en torno a ese vacío.',
        ],
      },
    ],
  },

  'Residence Permit for Qualified Professionals': {
    core_documents: [
      {
        en: [
          'Prepare for two parallel decisions',
          'The work permit is granted by the Directorate of Labour and the residence permit by the Directorate of Immigration. Both have to succeed, and each has its own file.',
        ],
        pt: [
          'Preparar-se para duas decisões paralelas',
          'A autorização de trabalho é concedida pela Direção do Trabalho e a de residência pela Direção de Imigração. As duas precisam ser bem-sucedidas, e cada uma tem o seu processo.',
        ],
        es: [
          'Prepararse para dos decisiones paralelas',
          'El permiso de trabajo lo concede la Dirección de Trabajo y el de residencia la Dirección de Inmigración. Ambos deben salir bien, y cada uno tiene su propio expediente.',
        ],
      },
      {
        en: [
          'Employment contract on Icelandic terms',
          'Wages and conditions must be at least as good as the applicable collective agreement, which is what sets pay in Iceland rather than any statutory minimum.',
        ],
        pt: [
          'Contrato de trabalho em termos islandeses',
          'Salário e condições precisam ser pelo menos tão bons quanto a convenção coletiva aplicável, que é o que define a remuneração na Islândia, e não um mínimo legal.',
        ],
        es: [
          'Contrato de trabajo en términos islandeses',
          'El salario y las condiciones deben ser al menos tan buenos como el convenio colectivo aplicable, que es lo que fija la retribución en Islandia, no un mínimo legal.',
        ],
      },
      {
        en: [
          'Valid passport and certified copies of it',
          'Certified by a notary or by the issuing authority; plain photocopies are refused.',
        ],
        pt: [
          'Passaporte válido e cópias certificadas dele',
          'Certificadas por notário ou pela autoridade emissora; fotocópias simples são recusadas.',
        ],
        es: [
          'Pasaporte vigente y copias certificadas del mismo',
          'Certificadas por notario o por la autoridad emisora; las fotocopias simples se rechazan.',
        ],
      },
      {
        en: [
          'Criminal record certificate with apostille',
          'Usually accepted only if issued in the last six months, translated into English, Icelandic or another Nordic language.',
        ],
        pt: [
          'Certidão criminal com apostila',
          'Em geral aceite apenas se emitida nos últimos seis meses, traduzida para inglês, islandês ou outra língua nórdica.',
        ],
        es: [
          'Certificado de antecedentes penales con apostilla',
          'Por lo general aceptado solo si se emitió en los últimos seis meses, traducido al inglés, al islandés u otra lengua nórdica.',
        ],
      },
      {
        en: [
          'Housing confirmation in Iceland',
          'A registered lease or a landlord confirmation, which is what the domicile registration will later be based on.',
        ],
        pt: [
          'Confirmação de habitação na Islândia',
          'Um contrato de arrendamento registado ou uma confirmação do senhorio, que é a base do futuro registo de domicílio.',
        ],
        es: [
          'Confirmación de vivienda en Islandia',
          'Un contrato de alquiler registrado o una confirmación del arrendador, que será la base del futuro registro de domicilio.',
        ],
      },
      {
        en: [
          'Application forms signed by you and the employer',
          'The employer signs a section of the residence permit application, and an unsigned page stops the whole file.',
        ],
        pt: [
          'Formulários assinados por você e pelo empregador',
          'O empregador assina uma secção do pedido de residência, e uma página por assinar trava o processo inteiro.',
        ],
        es: [
          'Formularios firmados por usted y por el empleador',
          'El empleador firma una sección de la solicitud de residencia, y una página sin firmar detiene todo el expediente.',
        ],
      },
    ],
    education: [
      {
        en: [
          'University diploma or proof of specialised expertise',
          'The permit exists for jobs needing a degree or expert knowledge, and the documents have to show the qualification matches the post.',
        ],
        pt: [
          'Diploma universitário ou prova de perícia especializada',
          'A autorização existe para vagas que exigem diploma ou conhecimento especializado, e os documentos precisam mostrar que a qualificação corresponde ao posto.',
        ],
        es: [
          'Título universitario o prueba de conocimiento especializado',
          'El permiso existe para puestos que exigen título o conocimiento experto, y los documentos deben mostrar que la cualificación corresponde al puesto.',
        ],
      },
      {
        en: [
          'Licence for a regulated profession',
          'Health and other regulated occupations need Icelandic authorisation before the job can start, granted by a different authority from the one issuing the permit.',
        ],
        pt: [
          'Licença para profissão regulamentada',
          'Saúde e outras ocupações regulamentadas exigem autorização islandesa antes de o trabalho começar, concedida por uma autoridade diferente da que emite a autorização.',
        ],
        es: [
          'Licencia para una profesión regulada',
          'Sanidad y otras ocupaciones reguladas exigen autorización islandesa antes de empezar el trabajo, concedida por una autoridad distinta de la que expide el permiso.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Salary above the published support figure',
          'The Directorate publishes a minimum monthly support amount, and the cost of living keeps it well above what most applicants expect. Confirm the current number.',
        ],
        pt: [
          'Salário acima do valor de sustento publicado',
          'A Direção publica um montante mensal mínimo de sustento, e o custo de vida mantém-no bem acima do que a maioria espera. Confirme o número atual.',
        ],
        es: [
          'Salario por encima de la cifra de sustento publicada',
          'La Dirección publica un importe mensual mínimo de sustento, y el coste de vida lo mantiene muy por encima de lo que espera la mayoría. Confirme la cifra actual.',
        ],
      },
      {
        en: [
          'Health insurance for the first six months',
          'National health insurance only begins after six months of registered legal domicile, so private cover is compulsory until then.',
        ],
        pt: [
          'Seguro de saúde para os primeiros seis meses',
          'O seguro nacional de saúde só começa após seis meses de domicílio legal registado, então a cobertura privada é obrigatória até lá.',
        ],
        es: [
          'Seguro de salud para los primeros seis meses',
          'El seguro nacional de salud solo empieza tras seis meses de domicilio legal registrado, así que la cobertura privada es obligatoria hasta entonces.',
        ],
      },
      {
        en: [
          'Pay the processing fees for both permits',
          'Separate fees for the residence permit and for the work permit, neither of them refunded on refusal.',
        ],
        pt: [
          'Pagar as taxas de processamento das duas autorizações',
          'Taxas separadas para a autorização de residência e para a de trabalho, nenhuma delas devolvida em caso de recusa.',
        ],
        es: [
          'Pagar las tasas de tramitación de ambos permisos',
          'Tasas separadas para el permiso de residencia y para el de trabajo, ninguna reembolsada si deniegan.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Employer advertises the vacancy across the EEA',
          'The post has to be published through the European employment network, and the employer must justify why no candidate from the area was suitable.',
        ],
        pt: [
          'O empregador divulga a vaga em todo o EEE',
          'O posto precisa ser publicado pela rede europeia de emprego, e o empregador tem de justificar por que nenhum candidato do espaço serviu.',
        ],
        es: [
          'El empleador publica la vacante en todo el EEE',
          'El puesto debe difundirse por la red europea de empleo, y el empleador tiene que justificar por qué ningún candidato del área resultó adecuado.',
        ],
      },
      {
        en: [
          'Trade union given the chance to comment',
          'The relevant union reviews the contract terms before the work permit is issued. It is unusual, it is real, and it can add weeks.',
        ],
        pt: [
          'Sindicato tem oportunidade de se pronunciar',
          'O sindicato competente analisa as condições do contrato antes de a autorização de trabalho ser emitida. É invulgar, é real e pode acrescentar semanas.',
        ],
        es: [
          'El sindicato tiene ocasión de pronunciarse',
          'El sindicato competente revisa las condiciones del contrato antes de expedirse el permiso de trabajo. Es inusual, es real y puede añadir semanas.',
        ],
      },
      {
        en: [
          'Do not travel before the permit is granted',
          'First-time applicants wait abroad for the decision, and arriving early can lead to the application being dismissed rather than merely delayed.',
        ],
        pt: [
          'Não viajar antes de a autorização ser concedida',
          'Quem pede pela primeira vez espera a decisão no exterior, e chegar antes pode levar ao arquivamento do pedido, não apenas a um atraso.',
        ],
        es: [
          'No viajar antes de que se conceda el permiso',
          'Quien solicita por primera vez espera la decisión fuera, y llegar antes puede provocar el archivo de la solicitud, no solo un retraso.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical examination within two weeks of arrival',
          'A tuberculosis screening at an approved clinic. The permit is not completed and the card is not issued until it is done.',
        ],
        pt: [
          'Exame médico em até duas semanas da chegada',
          'Um rastreio de tuberculose numa clínica aprovada. A autorização não se completa e o cartão não é emitido enquanto isso não for feito.',
        ],
        es: [
          'Examen médico en las dos semanas siguientes a la llegada',
          'Un cribado de tuberculosis en una clínica autorizada. El permiso no se completa ni se expide la tarjeta hasta hacerlo.',
        ],
      },
      {
        en: [
          'Fingerprints for the residence card',
          'Taken in Iceland after arrival, at the district commissioner or at the Directorate itself.',
        ],
        pt: [
          'Impressões digitais para o cartão de residência',
          'Recolhidas na Islândia após a chegada, no comissariado distrital ou na própria Direção.',
        ],
        es: [
          'Huellas dactilares para la tarjeta de residencia',
          'Se toman en Islandia tras la llegada, en la comisaría de distrito o en la propia Dirección.',
        ],
      },
      {
        en: [
          'Register with the health clinic for your address',
          'Care runs through the local clinic tied to where you are registered, not through a doctor you choose freely.',
        ],
        pt: [
          'Registar-se na clínica de saúde da sua morada',
          'O atendimento passa pela clínica local ligada ao seu registo de morada, e não por um médico escolhido livremente.',
        ],
        es: [
          'Registrarse en el centro de salud de su domicilio',
          'La atención pasa por el centro local vinculado a su domicilio registrado, no por un médico elegido libremente.',
        ],
        priority: 2,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Register legal domicile and get a kennitala',
          'Registers Iceland issues the national identity number. Nothing works without it: no bank account, no phone contract, no salary paid properly.',
        ],
        pt: [
          'Registar o domicílio legal e obter a kennitala',
          'O registo nacional emite o número de identidade. Nada funciona sem ele: nem conta bancária, nem contrato de telemóvel, nem salário pago corretamente.',
        ],
        es: [
          'Registrar el domicilio legal y obtener la kennitala',
          'El registro nacional expide el número de identidad. Nada funciona sin él: ni cuenta bancaria, ni contrato de móvil, ni salario pagado correctamente.',
        ],
      },
      {
        en: [
          'Get electronic certificates for the national portal',
          'The digital identity tied to your phone number is what opens tax, health and government services online.',
        ],
        pt: [
          'Obter os certificados eletrónicos para o portal nacional',
          'A identidade digital ligada ao seu número de telemóvel é o que abre os serviços fiscais, de saúde e do Estado online.',
        ],
        es: [
          'Obtener los certificados electrónicos del portal nacional',
          'La identidad digital ligada a su número de móvil es lo que abre los servicios fiscales, sanitarios y públicos en línea.',
        ],
      },
      {
        en: [
          'Get a tax card before the first salary',
          'Without it the employer withholds at the highest rate and the personal allowance for that month is simply lost.',
        ],
        pt: [
          'Obter o cartão fiscal antes do primeiro salário',
          'Sem ele o empregador retém na taxa máxima e o abatimento pessoal daquele mês é simplesmente perdido.',
        ],
        es: [
          'Obtener la tarjeta fiscal antes del primer salario',
          'Sin ella el empleador retiene al tipo máximo y la deducción personal de ese mes se pierde sin más.',
        ],
      },
      {
        en: [
          'Apply for a new work permit before changing job',
          'The permit is granted for one specific employer, so a new job means a new application, not a notification.',
        ],
        pt: [
          'Pedir nova autorização de trabalho antes de trocar de emprego',
          'A autorização é concedida para um empregador específico, então um novo emprego significa novo pedido, não uma comunicação.',
        ],
        es: [
          'Solicitar un nuevo permiso de trabajo antes de cambiar de empleo',
          'El permiso se concede para un empleador concreto, así que un nuevo empleo implica una nueva solicitud, no un aviso.',
        ],
      },
      {
        en: [
          'Renew at least four weeks before expiry',
          'Applying in time is what lets you stay in the country while the renewal is processed. Applying late means the right to stay ends with the old permit.',
        ],
        pt: [
          'Renovar pelo menos quatro semanas antes do vencimento',
          'Pedir a tempo é o que permite permanecer no país enquanto a renovação é processada. Pedir tarde faz o direito de permanência acabar com a autorização antiga.',
        ],
        es: [
          'Renovar al menos cuatro semanas antes del vencimiento',
          'Solicitar a tiempo es lo que permite permanecer en el país mientras se tramita la renovación. Solicitar tarde hace que el derecho a estar termine con el permiso antiguo.',
        ],
      },
    ],
  },

  'Permanent Residence Permit': {
    core_documents: [
      {
        en: [
          'Four years of continuous residence on a qualifying permit',
          'Not every permit counts towards it: time held as a student, for example, does not build the qualifying period.',
        ],
        pt: [
          'Quatro anos de residência contínua com autorização qualificante',
          'Nem toda autorização conta para isso: o tempo como estudante, por exemplo, não constrói o período qualificante.',
        ],
        es: [
          'Cuatro años de residencia continua con un permiso cualificante',
          'No todo permiso cuenta para ello: el tiempo como estudiante, por ejemplo, no construye el periodo cualificante.',
        ],
      },
      {
        en: [
          'Valid passport and current residence card',
          'The application is made while the existing permit is still valid, from inside Iceland.',
        ],
        pt: [
          'Passaporte válido e cartão de residência atual',
          'O pedido é feito enquanto a autorização existente ainda é válida, de dentro da Islândia.',
        ],
        es: [
          'Pasaporte vigente y tarjeta de residencia actual',
          'La solicitud se hace mientras el permiso existente sigue vigente, desde dentro de Islandia.',
        ],
      },
      {
        en: [
          'Record of days spent outside Iceland',
          'Absences beyond roughly ninety days in any twelve months break the continuity, and the Directorate checks the travel history against your account.',
        ],
        pt: [
          'Registo dos dias passados fora da Islândia',
          'Ausências acima de cerca de noventa dias em doze meses quebram a continuidade, e a Direção confere o histórico de viagens contra o que você declarou.',
        ],
        es: [
          'Registro de los días pasados fuera de Islandia',
          'Las ausencias superiores a unos noventa días en doce meses rompen la continuidad, y la Dirección coteja el historial de viajes con lo que usted declara.',
        ],
      },
      {
        en: [
          'Confirmation of registered domicile throughout',
          'Registers Iceland is the source of truth. Periods when your address was not registered simply do not count, however long you were here.',
        ],
        pt: [
          'Confirmação de domicílio registado ao longo do período',
          'O registo nacional é a fonte da verdade. Períodos em que a sua morada não estava registada simplesmente não contam, por mais tempo que você tenha estado cá.',
        ],
        es: [
          'Confirmación de domicilio registrado durante todo el periodo',
          'El registro nacional es la fuente de verdad. Los periodos en que su domicilio no estaba registrado sencillamente no cuentan, por mucho tiempo que estuviera aquí.',
        ],
      },
      {
        en: [
          'Criminal record and confirmation of no expulsion',
          'From Iceland and, where relevant, from abroad for the years covered by the application.',
        ],
        pt: [
          'Certidão criminal e confirmação de não expulsão',
          'Da Islândia e, quando aplicável, do exterior, para os anos abrangidos pelo pedido.',
        ],
        es: [
          'Antecedentes penales y confirmación de no expulsión',
          'De Islandia y, cuando corresponda, del extranjero, para los años que abarca la solicitud.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Certificate of 150 hours of Icelandic lessons',
          'Attendance at an approved course, or a passed examination instead. This is the requirement that most often sets the date of the whole application, because the hours take time to accumulate.',
        ],
        pt: [
          'Certificado de 150 horas de aulas de islandês',
          'Frequência num curso aprovado, ou um exame aprovado no lugar disso. É o requisito que mais frequentemente define a data de todo o pedido, porque as horas demoram a somar.',
        ],
        es: [
          'Certificado de 150 horas de clases de islandés',
          'Asistencia a un curso aprobado, o un examen superado en su lugar. Es el requisito que más a menudo fija la fecha de toda la solicitud, porque las horas tardan en acumularse.',
        ],
      },
      {
        en: [
          'Exemption from the language requirement',
          'Granted only in narrow circumstances such as age or health, and never to be assumed. Ask before you rely on it.',
        ],
        pt: [
          'Isenção do requisito de idioma',
          'Concedida apenas em circunstâncias restritas como idade ou saúde, e nunca a ser presumida. Pergunte antes de contar com ela.',
        ],
        es: [
          'Exención del requisito de idioma',
          'Se concede solo en circunstancias estrechas como la edad o la salud, y nunca debe presumirse. Pregunte antes de contar con ella.',
        ],
        priority: 3,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Stable support without municipal assistance',
          'Having received financial assistance from the municipality in the recent period blocks the application outright.',
        ],
        pt: [
          'Sustento estável sem assistência do município',
          'Ter recebido apoio financeiro do município no período recente bloqueia o pedido de vez.',
        ],
        es: [
          'Sustento estable sin asistencia municipal',
          'Haber recibido ayuda económica del municipio en el periodo reciente bloquea la solicitud del todo.',
        ],
      },
      {
        en: [
          'Tax returns filed for the whole period',
          'Iceland cross-checks the declarations, and a missing year has to be regularised before the application can move.',
        ],
        pt: [
          'Declarações fiscais entregues em todo o período',
          'A Islândia cruza as declarações, e um ano em falta precisa ser regularizado antes de o pedido andar.',
        ],
        es: [
          'Declaraciones fiscales presentadas de todo el periodo',
          'Islandia cruza las declaraciones, y un año que falte debe regularizarse antes de que la solicitud avance.',
        ],
      },
      {
        en: [
          'No outstanding debts to public bodies',
          'Unpaid taxes, fees or fines are a bar, and they are easy to overlook because nobody tells you they exist.',
        ],
        pt: [
          'Sem dívidas pendentes com entidades públicas',
          'Impostos, taxas ou multas por pagar são impedimento, e passam despercebidos porque ninguém avisa que existem.',
        ],
        es: [
          'Sin deudas pendientes con entidades públicas',
          'Los impuestos, tasas o multas impagados son un impedimento, y pasan desapercibidos porque nadie avisa de que existen.',
        ],
      },
      {
        en: [
          'Pay the processing fee for the application',
          'Payable when the file is submitted and not refunded if the permit is refused.',
        ],
        pt: [
          'Pagar a taxa de processamento do pedido',
          'Devida na entrega do processo e não devolvida se a autorização for recusada.',
        ],
        es: [
          'Pagar la tasa de tramitación de la solicitud',
          'Se abona al presentar el expediente y no se devuelve si deniegan el permiso.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply at least four weeks before the current permit runs out',
          'Filing in time is what keeps your right to stay alive while the case is being decided.',
        ],
        pt: [
          'Pedir pelo menos quatro semanas antes de a autorização atual terminar',
          'Entregar a tempo é o que mantém vivo o seu direito de permanência enquanto o caso é decidido.',
        ],
        es: [
          'Solicitar al menos cuatro semanas antes de que acabe el permiso actual',
          'Presentar a tiempo es lo que mantiene vivo su derecho a permanecer mientras se decide el caso.',
        ],
      },
      {
        en: [
          'Expect a long examination of the file',
          'Permanent residence cases are checked against several registers at once, and the wait is measured in months rather than weeks.',
        ],
        pt: [
          'Contar com um exame demorado do processo',
          'Os casos de residência permanente são cruzados com vários registos ao mesmo tempo, e a espera mede-se em meses, não em semanas.',
        ],
        es: [
          'Contar con un examen largo del expediente',
          'Los casos de residencia permanente se cotejan con varios registros a la vez, y la espera se mide en meses, no en semanas.',
        ],
        priority: 2,
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometrics for the permanent residence card',
          'A new card is issued once the permit is granted, and the data is taken again for it.',
        ],
        pt: [
          'Biometria para o cartão de residência permanente',
          'Um novo cartão é emitido quando a autorização é concedida, e os dados são recolhidos de novo para ele.',
        ],
        es: [
          'Biometría para la tarjeta de residencia permanente',
          'Se expide una tarjeta nueva cuando se concede el permiso, y los datos se toman de nuevo para ella.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the card and note that it still expires',
          'The permit is unlimited, but the card is reissued periodically and travelling with an expired one causes problems at the border.',
        ],
        pt: [
          'Retirar o cartão e notar que ele ainda caduca',
          'A autorização é ilimitada, mas o cartão é reemitido periodicamente e viajar com um cartão caducado gera problemas na fronteira.',
        ],
        es: [
          'Recoger la tarjeta y tener en cuenta que sí caduca',
          'El permiso es ilimitado, pero la tarjeta se reexpide periódicamente y viajar con una caducada causa problemas en la frontera.',
        ],
      },
      {
        en: [
          'Avoid an absence of eighteen months or more',
          'A continuous stay abroad beyond that length can make the permanent permit lapse, and it lapses without anyone warning you.',
        ],
        pt: [
          'Evitar uma ausência de dezoito meses ou mais',
          'Uma permanência contínua no exterior além desse prazo pode fazer a autorização permanente caducar, e ela caduca sem que ninguém o avise.',
        ],
        es: [
          'Evitar una ausencia de dieciocho meses o más',
          'Una estancia continua en el extranjero más allá de ese plazo puede hacer caducar el permiso permanente, y caduca sin que nadie le avise.',
        ],
      },
      {
        en: [
          'Keep the domicile registration up to date',
          'Moving without updating the address at Registers Iceland breaks the record every other authority reads from.',
        ],
        pt: [
          'Manter o registo de domicílio atualizado',
          'Mudar de casa sem atualizar a morada no registo nacional quebra o cadastro que todas as outras autoridades consultam.',
        ],
        es: [
          'Mantener actualizado el registro de domicilio',
          'Mudarse sin actualizar la dirección en el registro nacional rompe el asiento del que leen todas las demás autoridades.',
        ],
      },
      {
        en: [
          'Plan citizenship as a separate and longer road',
          'Naturalisation asks for more years of residence and a passed Icelandic language examination, which the 150 hours of attendance do not replace.',
        ],
        pt: [
          'Planear a cidadania como um caminho separado e mais longo',
          'A naturalização exige mais anos de residência e um exame de islandês aprovado, que as 150 horas de frequência não substituem.',
        ],
        es: [
          'Planificar la ciudadanía como un camino aparte y más largo',
          'La naturalización exige más años de residencia y un examen de islandés aprobado, que las 150 horas de asistencia no sustituyen.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
