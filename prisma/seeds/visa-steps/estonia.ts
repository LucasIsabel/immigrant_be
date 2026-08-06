import type { CountryVisaSteps } from './types';

/**
 * Steps for Estonia.
 *
 * The first thing to get right is what e-Residency is not. It is a
 * state-issued digital identity for signing documents and running an Estonian
 * company remotely — it gives no right to enter, stay or live in Estonia, and
 * it is not a visa. Applying for it while meaning to move here is the single
 * most common mistake made about this country.
 *
 * Ordinary immigration runs against an annual quota capped at a small fraction
 * of the population. It is exhausted within days of opening each year, which is
 * why the exempt categories — startup founders and employees, ICT specialists,
 * top specialists, academics — matter so much: they bypass the queue entirely.
 *
 * Estonia launched the world's first dedicated digital nomad visa, but it is a
 * long-stay visa and not a residence permit: it builds nothing towards
 * long-term residence. Once you do hold a residence permit, the personal
 * identification code and the ID-kaart are what make the country usable.
 */
export const estonia: CountryVisaSteps = {
  'Short-Stay Visa (Schengen Type C)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Issued within the last ten years and valid for at least three months after you leave the Schengen area.',
        ],
        pt: [
          'Passaporte válido',
          'Emitido nos últimos dez anos e válido por pelo menos três meses após a saída do espaço Schengen.',
        ],
        es: [
          'Pasaporte vigente',
          'Emitido en los últimos diez años y vigente al menos tres meses después de salir del espacio Schengen.',
        ],
      },
      {
        en: [
          'Schengen application addressed to Estonia',
          'Estonia must be your main destination or, where the trip is evenly split, your first point of entry. Applying to the wrong state is a standard ground for refusal.',
        ],
        pt: [
          'Pedido Schengen dirigido à Estónia',
          'A Estónia tem de ser o destino principal ou, se a viagem estiver dividida por igual, a primeira entrada. Pedir ao Estado errado é motivo corrente de recusa.',
        ],
        es: [
          'Solicitud Schengen dirigida a Estonia',
          'Estonia debe ser su destino principal o, si el viaje se reparte por igual, su primer punto de entrada. Solicitar al Estado equivocado es motivo habitual de denegación.',
        ],
      },
      {
        en: [
          'Photograph to ICAO standard',
          'Recent, in colour, with a neutral expression and a light background.',
        ],
        pt: [
          'Fotografia no padrão ICAO',
          'Recente, a cores, com expressão neutra e fundo claro.',
        ],
        es: [
          'Fotografía en formato ICAO',
          'Reciente, en color, con expresión neutra y fondo claro.',
        ],
      },
      {
        en: [
          'Travel itinerary with a confirmed return',
          'Reservations covering entry, internal movements and departure, consistent with the dates in the form.',
        ],
        pt: [
          'Itinerário de viagem com retorno confirmado',
          'Reservas cobrindo a entrada, os deslocamentos internos e a saída, coerentes com as datas do formulário.',
        ],
        es: [
          'Itinerario de viaje con regreso confirmado',
          'Reservas que cubran la entrada, los desplazamientos internos y la salida, coherentes con las fechas del formulario.',
        ],
      },
      {
        en: [
          'Accommodation booking or an invitation filed with the PBGB',
          'Estonian hosts submit invitations electronically to the Police and Border Guard Board and get them registered; an informal letter carries no weight.',
        ],
        pt: [
          'Reserva de alojamento ou convite registado na PBGB',
          'Os anfitriões estónios submetem os convites eletronicamente à Polícia e Guarda de Fronteira e obtêm o registo; uma carta informal não tem peso.',
        ],
        es: [
          'Reserva de alojamiento o invitación registrada ante la PBGB',
          'Los anfitriones estonios presentan las invitaciones electrónicamente ante la Policía y Guardia de Fronteras y las registran; una carta informal no tiene valor.',
        ],
      },
      {
        en: [
          'Travel insurance valid across Schengen',
          'Minimum cover of 30,000 euros including medical repatriation, valid for the entire period requested.',
        ],
        pt: [
          'Seguro de viagem válido em todo o Schengen',
          'Cobertura mínima de 30 mil euros incluindo repatriação médica, válida por todo o período pedido.',
        ],
        es: [
          'Seguro de viaje válido en todo Schengen',
          'Cobertura mínima de 30 mil euros con repatriación médica, válida durante todo el periodo solicitado.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of means per day of stay',
          'Estonia publishes a daily amount per person. Confirm the figure currently in force rather than relying on a number found in an older guide.',
        ],
        pt: [
          'Comprovativo de meios por dia de estada',
          'A Estónia publica um valor diário por pessoa. Confirme o montante em vigor em vez de confiar num número encontrado num guia antigo.',
        ],
        es: [
          'Comprobante de medios por día de estancia',
          'Estonia publica un importe diario por persona. Confirme la cifra vigente en lugar de fiarse de un número de una guía antigua.',
        ],
      },
      {
        en: [
          'Bank statements from the previous three months',
          'They should show income arriving regularly, not a transfer made shortly before the appointment.',
        ],
        pt: [
          'Extratos bancários dos três meses anteriores',
          'Devem mostrar rendimento a entrar com regularidade, e não uma transferência feita pouco antes do atendimento.',
        ],
        es: [
          'Extractos bancarios de los tres meses anteriores',
          'Deben mostrar ingresos que entran con regularidad, no una transferencia hecha poco antes de la cita.',
        ],
      },
      {
        en: [
          'Evidence of employment, business or study',
          'A letter from the employer with approved leave, company registration papers or an enrolment certificate.',
        ],
        pt: [
          'Prova de vínculo laboral, empresarial ou de estudo',
          'Carta do empregador com férias aprovadas, documentos de registo da empresa ou certificado de matrícula.',
        ],
        es: [
          'Prueba de empleo, actividad empresarial o estudios',
          'Carta del empleador con vacaciones aprobadas, documentos de registro de la empresa o certificado de matrícula.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Book at an Estonian mission or its representing partner',
          'Estonia has a small diplomatic network and is represented by other Schengen states in many countries, sometimes with applications routed through Finland.',
        ],
        pt: [
          'Marcar num posto estónio ou no parceiro que o representa',
          'A Estónia tem uma rede diplomática pequena e é representada por outros Estados Schengen em muitos países, por vezes com os pedidos encaminhados pela Finlândia.',
        ],
        es: [
          'Reservar en una misión estonia o en el socio que la representa',
          'Estonia tiene una red diplomática pequeña y está representada por otros Estados Schengen en muchos países, a veces con los expedientes canalizados por Finlandia.',
        ],
      },
      {
        en: [
          'Pay the Schengen visa fee',
          'Charged per applicant and not returned if the application is refused or withdrawn.',
        ],
        pt: [
          'Pagar a taxa do visto Schengen',
          'Cobrada por requerente e não devolvida se o pedido for recusado ou retirado.',
        ],
        es: [
          'Pagar la tasa del visado Schengen',
          'Se cobra por solicitante y no se devuelve si la solicitud se deniega o se retira.',
        ],
      },
      {
        en: [
          'Submit inside the permitted window',
          'From six months before the trip and no later than fifteen days before departure.',
        ],
        pt: [
          'Entregar dentro da janela permitida',
          'A partir de seis meses antes da viagem e até quinze dias antes da partida.',
        ],
        es: [
          'Presentar dentro de la ventana permitida',
          'Desde seis meses antes del viaje y a más tardar quince días antes de la salida.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprint and photograph capture',
          'Held in the visa information system for 59 months and reused across later Schengen applications.',
        ],
        pt: [
          'Recolha de impressões digitais e fotografia',
          'Guardadas no sistema de informação de vistos por 59 meses e reaproveitadas em pedidos Schengen posteriores.',
        ],
        es: [
          'Toma de huellas y fotografía',
          'Se conservan en el sistema de información de visados 59 meses y se reutilizan en solicitudes Schengen posteriores.',
        ],
      },
      {
        en: [
          'Health examination',
          'Not part of a short-stay application; the insurance policy is the only health document checked.',
        ],
        pt: [
          'Exame de saúde',
          'Não faz parte do pedido de curta duração; a apólice de seguro é o único documento de saúde verificado.',
        ],
        es: [
          'Examen de salud',
          'No forma parte de la solicitud de corta duración; la póliza de seguro es el único documento sanitario que se revisa.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect and verify the visa sticker',
          'Check the number of entries, the validity window and the total days granted, which may be fewer than requested.',
        ],
        pt: [
          'Levantar e conferir a vinheta do visto',
          'Verifique o número de entradas, a janela de validade e o total de dias concedidos, que pode ser inferior ao pedido.',
        ],
        es: [
          'Recoger y verificar la etiqueta del visado',
          'Compruebe el número de entradas, la ventana de validez y el total de días concedidos, que puede ser menor de lo solicitado.',
        ],
      },
      {
        en: [
          'Keep within 90 days in any 180',
          'Counted across the whole Schengen area on a rolling basis, including days spent in neighbouring countries on the same trip.',
        ],
        pt: [
          'Manter-se dentro dos 90 dias em cada 180',
          'Contados em todo o espaço Schengen de forma móvel, incluindo os dias passados em países vizinhos na mesma viagem.',
        ],
        es: [
          'Mantenerse dentro de los 90 días en cada 180',
          'Se cuentan en todo el espacio Schengen de forma móvil, incluidos los días en países vecinos del mismo viaje.',
        ],
      },
      {
        en: [
          'Remember that e-Residency does not replace this visa',
          'An e-Residency digital ID lets you sign documents and run an Estonian company from anywhere, but it grants no right to enter or remain. Holders still need a visa to travel here.',
        ],
        pt: [
          'Lembrar que a e-Residency não substitui este visto',
          'A identidade digital da e-Residency permite assinar documentos e gerir uma empresa estónia de qualquer lugar, mas não concede direito de entrada ou permanência. Os titulares continuam a precisar de visto para viajar.',
        ],
        es: [
          'Recordar que la e-Residency no sustituye a este visado',
          'La identidad digital de e-Residency permite firmar documentos y gestionar una empresa estonia desde cualquier lugar, pero no concede derecho a entrar ni a permanecer. Sus titulares siguen necesitando visado para viajar.',
        ],
      },
      {
        en: [
          'Do not plan to convert the stay from inside the country',
          'A short-stay visa cannot be turned into a residence permit while you are here; residence applications are made at a mission abroad, with narrow exceptions.',
        ],
        pt: [
          'Não contar com converter a estada estando no país',
          'Um visto de curta duração não se transforma em autorização de residência aqui dentro; os pedidos de residência fazem-se num posto no exterior, com exceções estreitas.',
        ],
        es: [
          'No contar con convertir la estancia desde dentro del país',
          'Un visado de corta duración no se transforma aquí en permiso de residencia; las solicitudes de residencia se hacen en una misión en el exterior, con excepciones muy limitadas.',
        ],
      },
    ],
  },

  'Digital Nomad Visa (Type D)': {
    core_documents: [
      {
        en: [
          'Confirm you meet the location-independent test',
          'You must work for an employer registered abroad, own a company registered abroad, or freelance mainly for clients abroad, and the work must be doable through telecommunications.',
        ],
        pt: [
          'Confirmar que cumpre o teste de independência de localização',
          'Tem de trabalhar para empregador registado no exterior, deter empresa registada no exterior ou prestar serviços sobretudo a clientes de fora, e o trabalho tem de ser possível por telecomunicações.',
        ],
        es: [
          'Confirmar que cumple la prueba de independencia de ubicación',
          'Debe trabajar para un empleador registrado fuera, poseer una empresa registrada fuera o prestar servicios sobre todo a clientes del exterior, y el trabajo debe poder hacerse por telecomunicaciones.',
        ],
      },
      {
        en: [
          'Passport valid beyond the visa period',
          'Valid for at least three months after the visa expires and issued within the last ten years.',
        ],
        pt: [
          'Passaporte válido para além do período do visto',
          'Válido por pelo menos três meses após o fim do visto e emitido nos últimos dez anos.',
        ],
        es: [
          'Pasaporte vigente más allá del periodo del visado',
          'Vigente al menos tres meses tras la caducidad del visado y emitido en los últimos diez años.',
        ],
      },
      {
        en: [
          'Long-stay visa application with the nomad annex',
          'A dedicated form for digital nomads accompanies the standard D visa application; both must be filled in.',
        ],
        pt: [
          'Pedido de visto de longa duração com o anexo de nómada',
          'Um formulário dedicado a nómadas digitais acompanha o pedido padrão de visto D; ambos têm de ser preenchidos.',
        ],
        es: [
          'Solicitud de visado de larga duración con el anexo de nómada',
          'Un formulario específico para nómadas digitales acompaña a la solicitud estándar de visado D; hay que rellenar ambos.',
        ],
      },
      {
        en: [
          'Employer letter or client contracts',
          'Evidence of the remote arrangement itself: who you work for, since when, and confirmation that the role is performed remotely.',
        ],
        pt: [
          'Carta do empregador ou contratos de clientes',
          'Prova do próprio arranjo remoto: para quem trabalha, desde quando, e confirmação de que a função é exercida à distância.',
        ],
        es: [
          'Carta del empleador o contratos de clientes',
          'Prueba del propio acuerdo remoto: para quién trabaja, desde cuándo, y confirmación de que el puesto se desempeña a distancia.',
        ],
      },
      {
        en: [
          'Photograph and accommodation details for the stay',
          'Where you will live in Estonia, at least for the first period, with a booking or a lease.',
        ],
        pt: [
          'Fotografia e dados de alojamento para a estada',
          'Onde vai viver na Estónia, pelo menos no primeiro período, com reserva ou contrato de arrendamento.',
        ],
        es: [
          'Fotografía y datos de alojamiento para la estancia',
          'Dónde vivirá en Estonia, al menos en el primer periodo, con reserva o contrato de alquiler.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Six months of income above the minimum threshold',
          'The monthly gross minimum is set by regulation and is reviewed. You must evidence the six months preceding the application, not a projection of future earnings.',
        ],
        pt: [
          'Seis meses de rendimento acima do limiar mínimo',
          'O mínimo mensal bruto é fixado por regulamento e é revisto. Tem de comprovar os seis meses anteriores ao pedido, e não uma projeção de ganhos futuros.',
        ],
        es: [
          'Seis meses de ingresos por encima del umbral mínimo',
          'El mínimo mensual bruto se fija por reglamento y se revisa. Debe acreditar los seis meses previos a la solicitud, no una proyección de ingresos futuros.',
        ],
      },
      {
        en: [
          'Bank statements and tax documents corroborating the income',
          'Estonia cross-checks the declared income against what actually landed in the account; discrepancies sink the application.',
        ],
        pt: [
          'Extratos bancários e documentos fiscais que confirmem o rendimento',
          'A Estónia cruza o rendimento declarado com o que efetivamente entrou na conta; divergências afundam o pedido.',
        ],
        es: [
          'Extractos bancarios y documentos fiscales que corroboren los ingresos',
          'Estonia coteja los ingresos declarados con lo que realmente entró en la cuenta; las discrepancias hunden la solicitud.',
        ],
      },
      {
        en: [
          'Health insurance covering Estonia for the visa period',
          'Minimum cover applies and the policy must be valid from the day of entry; nomads have no access to the state health fund.',
        ],
        pt: [
          'Seguro de saúde com cobertura na Estónia pelo período do visto',
          'Há cobertura mínima exigida e a apólice tem de ser válida desde o dia da entrada; os nómadas não têm acesso ao fundo estatal de saúde.',
        ],
        es: [
          'Seguro de salud con cobertura en Estonia durante el visado',
          'Se exige una cobertura mínima y la póliza debe ser válida desde el día de entrada; los nómadas no acceden al fondo estatal de salud.',
        ],
      },
      {
        en: [
          'Pay the long-stay visa state fee',
          'Paid at application, per person, and not refunded if the visa is refused.',
        ],
        pt: [
          'Pagar a taxa estatal do visto de longa duração',
          'Paga no momento do pedido, por pessoa, e não devolvida se o visto for recusado.',
        ],
        es: [
          'Pagar la tasa estatal del visado de larga duración',
          'Se paga al solicitar, por persona, y no se devuelve si deniegan el visado.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply in person at an Estonian embassy or consulate',
          'The nomad visa cannot be issued inside Estonia, and the network of missions is small. Factor the travel to the nearest one into your plan.',
        ],
        pt: [
          'Pedir presencialmente numa embaixada ou consulado da Estónia',
          'O visto de nómada não pode ser emitido dentro da Estónia, e a rede de postos é pequena. Inclua no plano a viagem até o mais próximo.',
        ],
        es: [
          'Solicitar en persona en una embajada o consulado de Estonia',
          'El visado de nómada no puede emitirse dentro de Estonia, y la red de misiones es pequeña. Cuente en su plan con el viaje hasta la más cercana.',
        ],
      },
      {
        en: [
          'Allow for the standard processing period',
          'Decisions take weeks and stretch further when the mission verifies the employer or the client contracts abroad.',
        ],
        pt: [
          'Prever o período normal de processamento',
          'As decisões levam semanas e alongam-se quando o posto verifica o empregador ou os contratos de clientes no exterior.',
        ],
        es: [
          'Prever el periodo normal de tramitación',
          'Las decisiones tardan semanas y se alargan cuando la misión verifica al empleador o los contratos de clientes en el extranjero.',
        ],
      },
      {
        en: [
          'Do not resign or give notice before the decision',
          'Refusal rates are meaningful and the reasons are often about the evidence, not about you. Wait for the visa in hand.',
        ],
        pt: [
          'Não se demitir nem entregar aviso prévio antes da decisão',
          'As taxas de recusa são relevantes e os motivos costumam ser sobre a prova, não sobre si. Espere pelo visto na mão.',
        ],
        es: [
          'No renunciar ni preavisar antes de la decisión',
          'Las tasas de denegación son significativas y los motivos suelen referirse a la prueba, no a usted. Espere a tener el visado.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Give fingerprints at the mission',
          'Taken when the application is lodged; they are stored and reused for subsequent applications.',
        ],
        pt: [
          'Fornecer impressões digitais no posto',
          'Recolhidas na entrega do pedido; são guardadas e reaproveitadas em pedidos seguintes.',
        ],
        es: [
          'Aportar huellas dactilares en la misión',
          'Se toman al presentar la solicitud; se almacenan y se reutilizan en solicitudes posteriores.',
        ],
      },
      {
        en: [
          'Carry the insurance certificate at the border',
          'No medical examination is required, but border officers can ask to see the policy on entry and refuse admission without it.',
        ],
        pt: [
          'Levar o certificado de seguro na fronteira',
          'Não é exigido exame médico, mas os agentes de fronteira podem pedir a apólice na entrada e recusar a admissão sem ela.',
        ],
        es: [
          'Llevar el certificado de seguro en la frontera',
          'No se exige examen médico, pero los agentes fronterizos pueden pedir la póliza al entrar y denegar la admisión sin ella.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Check how long the visa was actually granted for',
          'The long-stay version runs up to a year, and a short-stay variant exists for briefer trips; the length granted may be shorter than the maximum.',
        ],
        pt: [
          'Verificar por quanto tempo o visto foi realmente concedido',
          'A versão de longa duração vai até um ano, e existe uma variante de curta duração para estadas mais breves; o prazo concedido pode ser menor que o máximo.',
        ],
        es: [
          'Comprobar por cuánto tiempo se concedió realmente el visado',
          'La versión de larga duración llega hasta un año, y existe una variante de corta duración para viajes más breves; el plazo concedido puede ser menor que el máximo.',
        ],
      },
      {
        en: [
          'Take advice on tax residence before you settle in',
          'Spending more than half the year in Estonia can make you tax resident here, and the visa itself grants no exemption. Decide this deliberately.',
        ],
        pt: [
          'Procurar aconselhamento sobre residência fiscal antes de se instalar',
          'Passar mais de metade do ano na Estónia pode torná-lo residente fiscal aqui, e o visto em si não concede isenção. Decida isso de forma deliberada.',
        ],
        es: [
          'Buscar asesoramiento sobre residencia fiscal antes de instalarse',
          'Pasar más de medio año en Estonia puede convertirle en residente fiscal aquí, y el visado en sí no concede exención. Decídalo de forma deliberada.',
        ],
      },
      {
        en: [
          'Understand that this visa is not residence',
          'It creates no residence permit, gives no personal identification code by itself, and the time spent on it counts towards neither long-term residence nor citizenship.',
        ],
        pt: [
          'Entender que este visto não é residência',
          'Não cria autorização de residência, não dá por si só código de identificação pessoal, e o tempo nele não conta nem para a residência de longa duração nem para a cidadania.',
        ],
        es: [
          'Entender que este visado no es residencia',
          'No crea permiso de residencia, no otorga por sí solo código de identificación personal, y el tiempo en él no computa ni para la residencia de larga duración ni para la ciudadanía.',
        ],
      },
      {
        en: [
          'Do not mix this up with the e-Residency programme',
          'They are different applications to different bodies for different purposes. A digital ID card for company management will not let you live here, and this visa will not give you one.',
        ],
        pt: [
          'Não confundir isto com o programa de e-Residency',
          'São pedidos diferentes, a órgãos diferentes, com finalidades diferentes. Um cartão de identidade digital para gerir empresas não permite viver aqui, e este visto não lhe dá um.',
        ],
        es: [
          'No confundir esto con el programa de e-Residency',
          'Son solicitudes distintas, ante organismos distintos y con fines distintos. Una tarjeta de identidad digital para gestionar empresas no permite vivir aquí, y este visado no le da una.',
        ],
      },
      {
        en: [
          'Plan the exit or the next route before the visa ends',
          'There is a ceiling on how long you can stay on this basis, and a fresh application is judged from scratch with time spent outside Estonia taken into account.',
        ],
        pt: [
          'Planear a saída ou a via seguinte antes de o visto terminar',
          'Há um teto para quanto tempo se pode permanecer nesta base, e um novo pedido é avaliado do zero, considerando o tempo passado fora da Estónia.',
        ],
        es: [
          'Planificar la salida o la siguiente vía antes de que acabe el visado',
          'Hay un tope de tiempo que se puede permanecer con esta base, y una nueva solicitud se evalúa desde cero teniendo en cuenta el tiempo pasado fuera de Estonia.',
        ],
      },
    ],
  },

  'Startup Visa': {
    core_documents: [
      {
        en: [
          'Get a positive decision from the Startup Committee',
          'A panel of Estonian founders and investors assesses whether your company qualifies as a startup. Nothing else can proceed without it, the evaluation is free, and it takes about ten working days.',
        ],
        pt: [
          'Obter decisão favorável do Startup Committee',
          'Um painel de fundadores e investidores estónios avalia se a sua empresa se qualifica como startup. Nada avança sem isso, a avaliação é gratuita e leva cerca de dez dias úteis.',
        ],
        es: [
          'Obtener una decisión favorable del Startup Committee',
          'Un panel de fundadores e inversores estonios evalúa si su empresa califica como startup. Nada avanza sin eso, la evaluación es gratuita y tarda unos diez días hábiles.',
        ],
      },
      {
        en: [
          'Business plan for a scalable technology model',
          'Consultancies, lifestyle businesses, holding structures and local service companies are rejected at the committee stage; repeatability and growth potential are what is assessed.',
        ],
        pt: [
          'Plano de negócio de um modelo tecnológico escalável',
          'Consultorias, negócios de estilo de vida, estruturas holding e empresas de serviços locais são recusados na fase do comité; avalia-se a repetibilidade e o potencial de crescimento.',
        ],
        es: [
          'Plan de negocio de un modelo tecnológico escalable',
          'Consultorías, negocios de estilo de vida, estructuras holding y empresas de servicios locales se rechazan en la fase del comité; se evalúa la repetibilidad y el potencial de crecimiento.',
        ],
      },
      {
        en: [
          'Passport covering the period applied for',
          'Valid for the whole visa or permit period, plus the margin the authority requires.',
        ],
        pt: [
          'Passaporte que cubra o período solicitado',
          'Válido por todo o período do visto ou da autorização, mais a margem exigida pela autoridade.',
        ],
        es: [
          'Pasaporte que cubra el periodo solicitado',
          'Vigente durante todo el periodo del visado o del permiso, más el margen que exija la autoridad.',
        ],
      },
      {
        en: [
          'Choose between the D visa and the residence permit',
          'The visa is quicker and shorter; the temporary residence permit for enterprise takes longer but gives residence, family rights and a path onwards. Decide before filing.',
        ],
        pt: [
          'Escolher entre o visto D e a autorização de residência',
          'O visto é mais rápido e mais curto; a autorização temporária de residência para empresa demora mais, mas dá residência, direitos familiares e caminho de continuidade. Decida antes de entregar.',
        ],
        es: [
          'Elegir entre el visado D y el permiso de residencia',
          'El visado es más rápido y más corto; el permiso temporal de residencia para empresa tarda más, pero da residencia, derechos familiares y una vía de continuidad. Decida antes de presentar.',
        ],
      },
      {
        en: [
          'Founder and team curricula vitae',
          'The committee weighs whether the team can actually execute the plan, so relevant track record matters more than credentials.',
        ],
        pt: [
          'Currículos do fundador e da equipa',
          'O comité pondera se a equipa consegue realmente executar o plano, por isso o histórico relevante pesa mais do que as credenciais.',
        ],
        es: [
          'Currículos del fundador y del equipo',
          'El comité valora si el equipo puede ejecutar realmente el plan, así que la trayectoria relevante pesa más que las credenciales.',
        ],
      },
      {
        en: [
          'Estonian company registered in the Business Register',
          'The company can be incorporated remotely with an e-Residency digital ID. This is the one place where the two things genuinely connect, and it still is not residence.',
        ],
        pt: [
          'Empresa estónia registada no Registo Comercial',
          'A empresa pode ser constituída à distância com a identidade digital da e-Residency. É o único ponto em que as duas coisas realmente se ligam, e continua a não ser residência.',
        ],
        es: [
          'Empresa estonia registrada en el Registro Mercantil',
          'La sociedad puede constituirse a distancia con la identidad digital de e-Residency. Es el único punto donde ambas cosas se conectan de verdad, y sigue sin ser residencia.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Subsistence funds for yourself and any family',
          'A monthly minimum per person applies for the whole period, higher when relatives come with you. Check the current coefficient.',
        ],
        pt: [
          'Fundos de subsistência para si e para a família',
          'Aplica-se um mínimo mensal por pessoa para todo o período, mais elevado quando os familiares o acompanham. Verifique o coeficiente atual.',
        ],
        es: [
          'Fondos de subsistencia para usted y su familia',
          'Se aplica un mínimo mensual por persona durante todo el periodo, mayor si le acompañan familiares. Consulte el coeficiente vigente.',
        ],
      },
      {
        en: [
          'Investment or capital evidence for the enterprise route',
          'The ordinary business permit requires investment into the Estonian company, but founders approved by the committee are treated differently. Confirm which condition applies to your file.',
        ],
        pt: [
          'Prova de investimento ou capital na via empresarial',
          'A autorização comum de negócios exige investimento na empresa estónia, mas os fundadores aprovados pelo comité são tratados de forma diferente. Confirme qual condição se aplica ao seu processo.',
        ],
        es: [
          'Prueba de inversión o capital en la vía empresarial',
          'El permiso ordinario de negocios exige inversión en la sociedad estonia, pero los fundadores aprobados por el comité reciben otro trato. Confirme qué condición se aplica a su expediente.',
        ],
      },
      {
        en: [
          'Health insurance covering Estonia for the founder',
          'Required until the company registers you as an employee and health fund coverage begins.',
        ],
        pt: [
          'Seguro de saúde com cobertura na Estónia para o fundador',
          'Exigido até a empresa o registar como trabalhador e começar a cobertura do fundo de saúde.',
        ],
        es: [
          'Seguro de salud con cobertura en Estonia para el fundador',
          'Exigido hasta que la empresa le dé de alta como empleado y comience la cobertura del fondo de salud.',
        ],
      },
      {
        en: [
          'Pay the state fee for the chosen route',
          'The visa and the residence permit carry different fees, and both are lost if the application fails.',
        ],
        pt: [
          'Pagar a taxa estatal da via escolhida',
          'O visto e a autorização de residência têm taxas diferentes, e ambas se perdem se o pedido falhar.',
        ],
        es: [
          'Pagar la tasa estatal de la vía elegida',
          'El visado y el permiso de residencia tienen tasas distintas, y ambas se pierden si la solicitud fracasa.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File at a mission abroad or at a PBGB service office',
          'The Police and Border Guard Board takes applications from people already staying lawfully in Estonia; everyone else applies at a mission.',
        ],
        pt: [
          'Entregar num posto no exterior ou num balcão da PBGB',
          'A Polícia e Guarda de Fronteira recebe pedidos de quem já está legalmente na Estónia; os restantes pedem num posto consular.',
        ],
        es: [
          'Presentar en una misión en el exterior o en una oficina de la PBGB',
          'La Policía y Guardia de Fronteras admite solicitudes de quienes ya están legalmente en Estonia; el resto solicita en una misión.',
        ],
      },
      {
        en: [
          'Use the exemption from the immigration quota',
          'The general annual quota is a small fraction of the population and is exhausted within days of opening each January. Startup founders and their employees sit outside it, which is the practical value of this route.',
        ],
        pt: [
          'Aproveitar a isenção da quota de imigração',
          'A quota anual geral é uma fração pequena da população e esgota-se poucos dias após abrir, em janeiro. Fundadores de startups e seus trabalhadores ficam fora dela, e é esse o valor prático desta via.',
        ],
        es: [
          'Aprovechar la exención de la cuota de inmigración',
          'La cuota anual general es una fracción pequeña de la población y se agota a los pocos días de abrirse en enero. Los fundadores de startups y sus empleados quedan fuera de ella, y ese es el valor práctico de esta vía.',
        ],
      },
      {
        en: [
          'Provide documents in Estonian, English or Russian',
          'Anything in another language needs a certified translation, and foreign public documents need an apostille.',
        ],
        pt: [
          'Apresentar documentos em estónio, inglês ou russo',
          'O que estiver noutra língua precisa de tradução certificada, e os documentos públicos estrangeiros precisam de apostila.',
        ],
        es: [
          'Aportar documentos en estonio, inglés o ruso',
          'Lo que esté en otro idioma necesita traducción certificada, y los documentos públicos extranjeros necesitan apostilla.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometrics for the residence card at the PBGB or a mission',
          'Fingerprints and a photograph are taken for the card; the appointment is separate from lodging the application.',
        ],
        pt: [
          'Biometria para o cartão de residência na PBGB ou num posto',
          'São recolhidas impressões digitais e fotografia para o cartão; o atendimento é separado da entrega do pedido.',
        ],
        es: [
          'Biometría para la tarjeta de residencia en la PBGB o una misión',
          'Se toman huellas y fotografía para la tarjeta; la cita es distinta de la presentación de la solicitud.',
        ],
      },
      {
        en: [
          'Keep insurance in force until health fund cover starts',
          'Cover through the Health Insurance Fund begins only once the company declares and pays social tax for you, which takes a payroll cycle.',
        ],
        pt: [
          'Manter o seguro em vigor até começar a cobertura do fundo de saúde',
          'A cobertura pelo fundo de seguro de saúde só começa quando a empresa declara e paga o imposto social por si, o que leva um ciclo de folha de pagamento.',
        ],
        es: [
          'Mantener el seguro vigente hasta que empiece la cobertura del fondo',
          'La cobertura del fondo de seguro de salud solo comienza cuando la empresa declara y paga el impuesto social por usted, lo que lleva un ciclo de nómina.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Obtain your Estonian personal identification code',
          'The isikukood is the key to every register and service. It comes with the residence permit process, not with company registration.',
        ],
        pt: [
          'Obter o seu código de identificação pessoal estónio',
          'O isikukood é a chave para todos os registos e serviços. Vem com o processo de autorização de residência, e não com o registo da empresa.',
        ],
        es: [
          'Obtener su código de identificación personal estonio',
          'El isikukood es la llave de todos los registros y servicios. Llega con el trámite del permiso de residencia, no con el registro de la empresa.',
        ],
      },
      {
        en: [
          'Register your place of residence with the municipality',
          'This has to be done within a month of arriving. The permit can be revoked if your address never reaches the population register, and it is easy to forget because nothing prompts you.',
        ],
        pt: [
          'Registar o seu local de residência no município',
          'Tem de ser feito no prazo de um mês após a chegada. A autorização pode ser revogada se a morada nunca chegar ao registo da população, e é fácil esquecer porque nada o lembra.',
        ],
        es: [
          'Registrar su lugar de residencia en el municipio',
          'Debe hacerse en el plazo de un mes tras la llegada. El permiso puede revocarse si su dirección nunca llega al registro de población, y es fácil olvidarlo porque nada se lo recuerda.',
        ],
      },
      {
        en: [
          'Collect the ID-kaart and activate its certificates',
          'The physical identity card is what signs contracts, files taxes and opens banking. The PIN envelope is issued separately and the certificates must be activated before anything works.',
        ],
        pt: [
          'Levantar o ID-kaart e ativar os seus certificados',
          'O cartão de identidade físico é o que assina contratos, entrega impostos e abre o banco. O envelope com os PIN é entregue à parte e os certificados têm de ser ativados antes de tudo funcionar.',
        ],
        es: [
          'Recoger el ID-kaart y activar sus certificados',
          'La tarjeta de identidad física es la que firma contratos, presenta impuestos y abre el banco. El sobre con los PIN se entrega aparte y los certificados deben activarse antes de que nada funcione.',
        ],
      },
      {
        en: [
          'Report changes in the company to the authority',
          'A change of shareholding, address or activity has to be notified. The permit rests on the startup continuing to exist and operate as described.',
        ],
        pt: [
          'Comunicar à autoridade as alterações na empresa',
          'Mudança de participação social, morada ou atividade tem de ser comunicada. A autorização assenta na continuidade da startup a existir e operar como descrito.',
        ],
        es: [
          'Comunicar a la autoridad los cambios en la empresa',
          'Un cambio de participación, domicilio o actividad debe notificarse. El permiso se apoya en que la startup siga existiendo y operando como se describió.',
        ],
      },
      {
        en: [
          'Show real progress at extension time',
          'Extensions look at whether the company actually trades, raises money or hires, not at how good the original plan read.',
        ],
        pt: [
          'Demonstrar progresso real no momento da prorrogação',
          'As prorrogações olham se a empresa realmente fatura, capta investimento ou contrata, e não para o quão bom era o plano inicial.',
        ],
        es: [
          'Demostrar progreso real en el momento de la prórroga',
          'Las prórrogas miran si la empresa realmente factura, capta inversión o contrata, no lo bien redactado que estaba el plan inicial.',
        ],
      },
      {
        en: [
          'Keep the two identities straight',
          'Holding an e-Residency card alongside a residence permit is normal, but only the permit gives you the right to live here. Never present one in place of the other.',
        ],
        pt: [
          'Manter as duas identidades bem separadas',
          'Ter um cartão de e-Residency ao lado de uma autorização de residência é normal, mas só a autorização dá o direito de viver aqui. Nunca apresente um no lugar do outro.',
        ],
        es: [
          'Mantener bien separadas las dos identidades',
          'Tener una tarjeta de e-Residency junto a un permiso de residencia es normal, pero solo el permiso da derecho a vivir aquí. Nunca presente uno en lugar del otro.',
        ],
        priority: 2,
      },
    ],
  },

  'Long-Term Residence Permit': {
    core_documents: [
      {
        en: [
          'Application for long-term resident status',
          'Filed with the Police and Border Guard Board, in person, while you still hold a valid temporary residence permit.',
        ],
        pt: [
          'Pedido de estatuto de residente de longa duração',
          'Entregue presencialmente à Polícia e Guarda de Fronteira, enquanto ainda detém autorização de residência temporária válida.',
        ],
        es: [
          'Solicitud de estatus de residente de larga duración',
          'Se presenta en persona ante la Policía y Guardia de Fronteras, mientras aún tiene un permiso de residencia temporal válido.',
        ],
      },
      {
        en: [
          'Valid passport and current residence card',
          'Both in force at the moment of filing; a lapsed card interrupts the chain the application depends on.',
        ],
        pt: [
          'Passaporte válido e cartão de residência atual',
          'Ambos em vigor no momento da entrega; um cartão caducado interrompe a cadeia de que o pedido depende.',
        ],
        es: [
          'Pasaporte vigente y tarjeta de residencia actual',
          'Ambos en vigor al presentar; una tarjeta caducada rompe la cadena de la que depende la solicitud.',
        ],
      },
      {
        en: [
          'Five years of permanent residence in Estonia',
          'Measured by actual presence on a temporary residence permit. Time spent on a visa, including the digital nomad visa, does not count towards it at all.',
        ],
        pt: [
          'Cinco anos de residência permanente na Estónia',
          'Medidos pela presença efetiva com autorização de residência temporária. O tempo passado com visto, inclusive o de nómada digital, não conta de todo.',
        ],
        es: [
          'Cinco años de residencia permanente en Estonia',
          'Medidos por la presencia efectiva con permiso de residencia temporal. El tiempo con visado, incluido el de nómada digital, no computa en absoluto.',
        ],
      },
      {
        en: [
          'Address entered in the population register',
          'The register entry, not the lease, is what proves where you have lived. Years of tenancy with no registration will not be accepted as residence.',
        ],
        pt: [
          'Morada inscrita no registo da população',
          'É a inscrição no registo, e não o contrato de arrendamento, que prova onde viveu. Anos de arrendamento sem registo não são aceites como residência.',
        ],
        es: [
          'Domicilio inscrito en el registro de población',
          'Es la inscripción en el registro, no el contrato de alquiler, lo que prueba dónde ha vivido. Años de arrendamiento sin registro no se aceptan como residencia.',
        ],
      },
      {
        en: [
          'Absence of a threat to public order',
          'Criminal records and outstanding proceedings are checked; certain convictions bar the status regardless of how long you have lived here.',
        ],
        pt: [
          'Ausência de ameaça à ordem pública',
          'São verificados antecedentes criminais e processos pendentes; certas condenações impedem o estatuto independentemente do tempo que já viveu aqui.',
        ],
        es: [
          'Ausencia de amenaza para el orden público',
          'Se comprueban antecedentes penales y procedimientos abiertos; ciertas condenas impiden el estatus por mucho tiempo que lleve aquí.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Estonian language at B1 with a state exam certificate',
          'The state examination is the usual bottleneck: preparation courses are subsidised but places are limited, and exam sessions fill up months ahead. Start before the fifth year, not after it.',
        ],
        pt: [
          'Estónio ao nível B1 com certificado do exame estatal',
          'O exame estatal é o gargalo habitual: os cursos de preparação são subsidiados, mas as vagas são limitadas e as sessões esgotam meses antes. Comece antes do quinto ano, não depois.',
        ],
        es: [
          'Estonio en nivel B1 con certificado del examen estatal',
          'El examen estatal es el cuello de botella habitual: los cursos de preparación están subvencionados, pero las plazas son limitadas y las convocatorias se llenan con meses de antelación. Empiece antes del quinto año, no después.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Permanent legal income for you and your dependants',
          'Wages, business income or a pension, evidenced over the qualifying period rather than at a single moment.',
        ],
        pt: [
          'Rendimento legal permanente para si e para os seus dependentes',
          'Salário, rendimento de empresa ou pensão, comprovados ao longo do período qualificante e não num único momento.',
        ],
        es: [
          'Ingresos legales permanentes para usted y sus dependientes',
          'Salario, ingresos de la empresa o pensión, acreditados a lo largo del periodo cualificante y no en un solo momento.',
        ],
      },
      {
        en: [
          'Health insurance in force without gaps',
          'Cover through the Health Insurance Fund or an equivalent policy; a break in cover during the qualifying years is treated as a failure of the condition.',
        ],
        pt: [
          'Seguro de saúde em vigor sem interrupções',
          'Cobertura pelo fundo de seguro de saúde ou apólice equivalente; uma quebra de cobertura nos anos qualificantes é tratada como incumprimento da condição.',
        ],
        es: [
          'Seguro de salud vigente sin interrupciones',
          'Cobertura por el fondo de seguro de salud o póliza equivalente; una interrupción durante los años cualificantes se trata como incumplimiento de la condición.',
        ],
      },
      {
        en: [
          'Statement of no tax debt',
          'Issued by the Tax and Customs Board. Unpaid social tax from a period of self-employment is the classic obstacle.',
        ],
        pt: [
          'Declaração de inexistência de dívida fiscal',
          'Emitida pela autoridade tributária e aduaneira. O imposto social em atraso de um período como autónomo é o obstáculo clássico.',
        ],
        es: [
          'Certificado de no tener deuda tributaria',
          'Emitido por la autoridad tributaria y aduanera. El impuesto social impagado de una etapa como autónomo es el obstáculo clásico.',
        ],
      },
      {
        en: [
          'Pay the state fee for long-term residence',
          'Payable when the application is lodged and not returned if the status is refused.',
        ],
        pt: [
          'Pagar a taxa estatal da residência de longa duração',
          'Devida na entrega do pedido e não devolvida se o estatuto for recusado.',
        ],
        es: [
          'Pagar la tasa estatal de la residencia de larga duración',
          'Se abona al presentar la solicitud y no se devuelve si deniegan el estatus.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Book an appointment at a PBGB service office',
          'Appointments are made online and slots are often weeks out, so book before the documents are all gathered rather than after.',
        ],
        pt: [
          'Marcar atendimento num balcão da PBGB',
          'As marcações são feitas online e as vagas costumam estar a semanas de distância, por isso marque antes de reunir todos os documentos, e não depois.',
        ],
        es: [
          'Reservar cita en una oficina de la PBGB',
          'Las citas se piden en línea y los huecos suelen estar a semanas vista, así que reserve antes de reunir todos los documentos, no después.',
        ],
      },
      {
        en: [
          'Apply while the temporary permit is still running',
          'Applying after it expires means losing the continuity, and the five years start counting again from zero.',
        ],
        pt: [
          'Pedir enquanto a autorização temporária ainda está em vigor',
          'Pedir depois de expirar significa perder a continuidade, e os cinco anos recomeçam do zero.',
        ],
        es: [
          'Solicitar mientras el permiso temporal sigue vigente',
          'Solicitar tras su caducidad supone perder la continuidad, y los cinco años vuelven a contar desde cero.',
        ],
      },
      {
        en: [
          'Legalise and translate the foreign documents',
          'Apostille where required and a certified translation into Estonian, English or Russian for anything issued abroad.',
        ],
        pt: [
          'Legalizar e traduzir os documentos estrangeiros',
          'Apostila quando exigida e tradução certificada para estónio, inglês ou russo de tudo o que for emitido no exterior.',
        ],
        es: [
          'Legalizar y traducir los documentos extranjeros',
          'Apostilla cuando se exija y traducción certificada al estonio, inglés o ruso de todo lo emitido en el extranjero.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints and photograph for the new residence card',
          'A fresh set is taken for the long-term resident card even if you gave them for previous permits.',
        ],
        pt: [
          'Impressões digitais e fotografia para o novo cartão de residência',
          'É recolhido um novo conjunto para o cartão de residente de longa duração, mesmo que já as tenha dado em autorizações anteriores.',
        ],
        es: [
          'Huellas y fotografía para la nueva tarjeta de residencia',
          'Se toma un juego nuevo para la tarjeta de residente de larga duración, aunque ya las diera en permisos anteriores.',
        ],
      },
      {
        en: [
          'Do not let cover lapse while the case is decided',
          'The insurance condition is assessed on the day of the decision as well as over the qualifying period; a gap during the wait can undo the whole application.',
        ],
        pt: [
          'Não deixar a cobertura falhar enquanto o processo é decidido',
          'A condição de seguro é avaliada no dia da decisão e também ao longo do período qualificante; uma falha durante a espera pode desfazer todo o pedido.',
        ],
        es: [
          'No dejar que la cobertura decaiga mientras se resuelve el caso',
          'La condición del seguro se evalúa el día de la resolución y también durante el periodo cualificante; un vacío durante la espera puede echar abajo toda la solicitud.',
        ],
        priority: 2,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the long-term resident card',
          'The status does not expire, but the card is reissued on a fixed cycle and the certificates on it have to be renewed with it.',
        ],
        pt: [
          'Levantar o cartão de residente de longa duração',
          'O estatuto não caduca, mas o cartão é reemitido num ciclo fixo e os certificados nele têm de ser renovados com ele.',
        ],
        es: [
          'Recoger la tarjeta de residente de larga duración',
          'El estatus no caduca, pero la tarjeta se reexpide en un ciclo fijo y los certificados que lleva deben renovarse con ella.',
        ],
      },
      {
        en: [
          'Watch the absence limits that can end the status',
          'A long continuous stay outside Estonia, or a longer one outside the European Union, terminates long-term resident status. Check before accepting a posting abroad.',
        ],
        pt: [
          'Vigiar os limites de ausência que podem extinguir o estatuto',
          'Uma permanência contínua longa fora da Estónia, ou uma mais longa fora da União Europeia, extingue o estatuto de residente de longa duração. Verifique antes de aceitar uma missão no exterior.',
        ],
        es: [
          'Vigilar los límites de ausencia que pueden extinguir el estatus',
          'Una estancia continua larga fuera de Estonia, o una más larga fuera de la Unión Europea, extingue el estatus de residente de larga duración. Compruébelo antes de aceptar un destino fuera.',
        ],
      },
      {
        en: [
          'Use the mobility that comes with EU long-term status',
          'Unlike a purely national permit, this status allows you to apply to move to another member state under defined conditions.',
        ],
        pt: [
          'Aproveitar a mobilidade que vem com o estatuto UE de longa duração',
          'Ao contrário de uma autorização puramente nacional, este estatuto permite pedir a mudança para outro Estado-membro em condições definidas.',
        ],
        es: [
          'Aprovechar la movilidad que trae el estatus UE de larga duración',
          'A diferencia de un permiso puramente nacional, este estatus permite solicitar el traslado a otro Estado miembro en condiciones definidas.',
        ],
      },
      {
        en: [
          'Treat citizenship as a separate and stricter track',
          'Naturalisation adds a longer qualifying period, an examination on the constitution and the citizenship act, and Estonia does not permit dual citizenship for those who naturalise.',
        ],
        pt: [
          'Tratar a cidadania como via separada e mais exigente',
          'A naturalização acrescenta um período qualificante mais longo, um exame sobre a constituição e a lei da cidadania, e a Estónia não permite dupla cidadania a quem se naturaliza.',
        ],
        es: [
          'Tratar la ciudadanía como una vía aparte y más exigente',
          'La naturalización añade un periodo cualificante más largo, un examen sobre la constitución y la ley de ciudadanía, y Estonia no permite la doble nacionalidad a quien se naturaliza.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
