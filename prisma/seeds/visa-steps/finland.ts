import type { CountryVisaSteps } from './types';

/**
 * Steps for Finland.
 *
 * Two authorities share the work and they are easy to confuse: short-stay
 * Schengen visas belong to the foreign ministry and its missions, while every
 * residence permit is decided by the Finnish Immigration Service through the
 * Enter Finland online portal. Filing online is only half the application — you
 * must also appear in person at a service point to prove your identity and give
 * biometrics, and until you do, the case is not processed at all. That single
 * visit explains most of the delays people cannot account for.
 *
 * The personal identity code is now issued together with the first residence
 * permit, but the municipality of residence is registered separately at the
 * digital agency, and it is the municipality registration that opens access to
 * local health care and services.
 *
 * Finland has also been tightening the far end of the path: the qualifying
 * period and the conditions for permanent residence and for citizenship have
 * been revised recently, so guidance written a couple of years ago understates
 * what is required.
 */
export const finland: CountryVisaSteps = {
  'Short-Stay Visa (Schengen Type C)': {
    core_documents: [
      {
        en: [
          'Passport issued within the last ten years',
          'Valid for at least three months after the planned departure, with two blank pages left for the sticker.',
        ],
        pt: [
          'Passaporte emitido nos últimos dez anos',
          'Válido por pelo menos três meses após a saída prevista, com duas páginas em branco para o autocolante.',
        ],
        es: [
          'Pasaporte emitido en los últimos diez años',
          'Vigente al menos tres meses tras la salida prevista, con dos páginas en blanco para la etiqueta.',
        ],
      },
      {
        en: [
          'Schengen application form completed for the Finnish mission',
          'The form is the harmonised one, but the appointment system and the checklist are set country by country, so follow the list of the post you are applying to.',
        ],
        pt: [
          'Formulário Schengen preenchido para a representação finlandesa',
          'O formulário é o harmonizado, mas o sistema de agendamento e a lista de documentos variam por país, então siga a lista do posto onde vai pedir.',
        ],
        es: [
          'Formulario Schengen cumplimentado para la representación finlandesa',
          'El formulario es el armonizado, pero el sistema de citas y la lista de documentos varían por país, así que siga la lista del puesto donde solicita.',
        ],
      },
      {
        en: [
          'Photograph meeting the Schengen standard',
          'Recent, on a light background; the mission compares it with the image already stored from earlier applications.',
        ],
        pt: [
          'Fotografia conforme o padrão Schengen',
          'Recente, em fundo claro; a representação compara-a com a imagem já guardada de pedidos anteriores.',
        ],
        es: [
          'Fotografía conforme al estándar Schengen',
          'Reciente, con fondo claro; la representación la compara con la imagen ya guardada de solicitudes anteriores.',
        ],
      },
      {
        en: [
          'Travel medical insurance for the Schengen area',
          'At least 30,000 euros of cover for emergency care and repatriation, valid for the whole period requested and not only for the booked dates.',
        ],
        pt: [
          'Seguro médico de viagem para o espaço Schengen',
          'Cobertura mínima de 30 mil euros para urgências e repatriamento, válida por todo o período pedido e não apenas nas datas reservadas.',
        ],
        es: [
          'Seguro médico de viaje para el espacio Schengen',
          'Cobertura mínima de 30 mil euros para urgencias y repatriación, válida durante todo el periodo solicitado y no solo en las fechas reservadas.',
        ],
      },
      {
        en: [
          'Accommodation booking or an invitation from your host',
          'Finland does not use a formal sponsorship form for short visits, so the invitation itself has to carry the host details, the address and the contact information.',
        ],
        pt: [
          'Reserva de alojamento ou convite do anfitrião',
          'A Finlândia não usa um formulário oficial de patrocínio para visitas curtas, então o próprio convite tem de trazer os dados do anfitrião, a morada e os contactos.',
        ],
        es: [
          'Reserva de alojamiento o invitación del anfitrión',
          'Finlandia no usa un formulario oficial de patrocinio para visitas cortas, así que la propia invitación debe llevar los datos del anfitrión, la dirección y los contactos.',
        ],
      },
      {
        en: [
          'Return travel reservation and itinerary',
          'Reservations rather than paid tickets, but they must line up with the accommodation and the dates on the form.',
        ],
        pt: [
          'Reserva de viagem de volta e roteiro',
          'Reservas em vez de bilhetes pagos, mas têm de ser coerentes com o alojamento e as datas do formulário.',
        ],
        es: [
          'Reserva de viaje de vuelta e itinerario',
          'Reservas en lugar de billetes pagados, pero deben cuadrar con el alojamiento y las fechas del formulario.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of funds for each day of the visit',
          'Finland expects a daily amount per person, reduced when the accommodation is prepaid or provided by the host. Confirm the figure currently applied.',
        ],
        pt: [
          'Comprovação de recursos para cada dia da visita',
          'A Finlândia espera um valor diário por pessoa, reduzido quando o alojamento está pago ou é oferecido pelo anfitrião. Confirme o valor aplicado atualmente.',
        ],
        es: [
          'Prueba de fondos para cada día de la visita',
          'Finlandia espera un importe diario por persona, reducido cuando el alojamiento está pagado o lo aporta el anfitrión. Confirme la cifra aplicada actualmente.',
        ],
      },
      {
        en: [
          'Bank statements from the last three months',
          'The pattern over the period matters; a transfer arriving days before the appointment invites questions rather than answering them.',
        ],
        pt: [
          'Extratos bancários dos últimos três meses',
          'O padrão ao longo do período é o que conta; uma transferência que chega dias antes do atendimento levanta perguntas em vez de as responder.',
        ],
        es: [
          'Extractos bancarios de los últimos tres meses',
          'Lo que cuenta es el patrón del periodo; una transferencia que llega días antes de la cita genera preguntas en lugar de responderlas.',
        ],
      },
      {
        en: [
          'Evidence of employment, studies or business at home',
          'The mission reads it as the reason you will return, which weighs at least as much as the balance in the account.',
        ],
        pt: [
          'Comprovação de emprego, estudos ou empresa no país de origem',
          'A representação lê isso como o motivo do seu regresso, que pesa pelo menos tanto quanto o saldo na conta.',
        ],
        es: [
          'Prueba de empleo, estudios o negocio en el país de origen',
          'La representación lo lee como el motivo de su regreso, que pesa al menos tanto como el saldo de la cuenta.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply at the Finnish mission or partner centre with jurisdiction',
          'Finland is represented by another Schengen state in some countries, and short-stay visas are handled by the foreign ministry rather than by the immigration service.',
        ],
        pt: [
          'Pedir na representação finlandesa ou centro parceiro competente',
          'A Finlândia é representada por outro Estado Schengen em alguns países, e os vistos de curta duração são tratados pelo ministério dos negócios estrangeiros, não pelo serviço de imigração.',
        ],
        es: [
          'Solicitar en la representación finlandesa o centro asociado competente',
          'Finlandia está representada por otro Estado Schengen en algunos países, y los visados de corta estancia los gestiona el ministerio de exteriores, no el servicio de inmigración.',
        ],
      },
      {
        en: [
          'Pay the visa fee and any service charge',
          'The visa fee is charged per applicant and not refunded on refusal; outsourced centres add their own charge on top of it.',
        ],
        pt: [
          'Pagar a taxa de visto e eventual taxa de serviço',
          'A taxa de visto é cobrada por requerente e não é devolvida em caso de recusa; os centros terceirizados somam uma taxa própria.',
        ],
        es: [
          'Pagar la tasa de visado y el posible cargo de servicio',
          'La tasa de visado se cobra por solicitante y no se devuelve si deniegan; los centros externalizados añaden su propio cargo.',
        ],
      },
      {
        en: [
          'Submit no earlier than six months before travelling',
          'And leave a comfortable margin: peak seasons at the busier posts stretch the decision well beyond the usual few days.',
        ],
        pt: [
          'Entregar no máximo seis meses antes da viagem',
          'E deixe uma margem confortável: nas épocas de pico dos postos mais movimentados a decisão estica bem além dos poucos dias habituais.',
        ],
        es: [
          'Presentar como mucho seis meses antes del viaje',
          'Y deje un margen holgado: en temporada alta, en los puestos con más carga la resolución se alarga bastante más de los pocos días habituales.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints and facial image at the appointment',
          'Kept for 59 months across the Schengen area, so a recent visa from any member state can spare you the trip.',
        ],
        pt: [
          'Impressões digitais e imagem facial no atendimento',
          'Guardadas por 59 meses no espaço Schengen, então um visto recente de qualquer Estado-membro pode poupar-lhe a deslocação.',
        ],
        es: [
          'Huellas e imagen facial en la cita',
          'Se conservan 59 meses en el espacio Schengen, así que un visado reciente de cualquier Estado miembro puede ahorrarle el desplazamiento.',
        ],
      },
      {
        en: [
          'Medical examination',
          'Not part of a short-stay application; the insurance policy is the only health document assessed.',
        ],
        pt: [
          'Exame médico',
          'Não faz parte de um pedido de curta duração; a apólice de seguro é o único documento de saúde avaliado.',
        ],
        es: [
          'Examen médico',
          'No forma parte de una solicitud de corta estancia; la póliza de seguro es el único documento sanitario que se evalúa.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Check the visa sticker before you travel',
          'Entries, validity period and days of stay are three distinct fields, and only the last one tells you how long you may actually remain.',
        ],
        pt: [
          'Conferir o autocolante do visto antes de viajar',
          'Entradas, período de validade e dias de estada são três campos distintos, e só o último diz quanto tempo você pode realmente ficar.',
        ],
        es: [
          'Revisar la etiqueta del visado antes de viajar',
          'Entradas, periodo de validez y días de estancia son tres campos distintos, y solo el último dice cuánto tiempo puede permanecer de verdad.',
        ],
      },
      {
        en: [
          'Respect the 90 days in any 180 rule',
          'Counted across the entire Schengen area on a rolling basis, and trips to the neighbouring countries all count towards the same total.',
        ],
        pt: [
          'Respeitar a regra dos 90 dias em cada 180',
          'Contados em todo o espaço Schengen de forma móvel, e as idas aos países vizinhos entram todas no mesmo total.',
        ],
        es: [
          'Respetar la regla de 90 días en cada 180',
          'Se cuentan en todo el espacio Schengen de forma móvil, y los viajes a los países vecinos suman al mismo total.',
        ],
      },
      {
        en: [
          'Note that a short-stay visa never allows work',
          'Working in Finland requires a residence permit granted for that purpose by the immigration service, and no visa can be converted into one from inside the country.',
        ],
        pt: [
          'Saber que um visto de curta duração nunca permite trabalhar',
          'Trabalhar na Finlândia exige uma autorização de residência concedida para esse fim pelo serviço de imigração, e nenhum visto se converte nela de dentro do país.',
        ],
        es: [
          'Saber que un visado de corta estancia nunca permite trabajar',
          'Trabajar en Finlandia exige un permiso de residencia concedido para ese fin por el servicio de inmigración, y ningún visado se convierte en uno desde dentro del país.',
        ],
      },
      {
        en: [
          'Carry the supporting documents through the border check',
          'Border guards may ask for the same insurance, accommodation and funds you filed with the application; holding a visa does not remove the right to check.',
        ],
        pt: [
          'Levar os documentos de apoio na passagem de fronteira',
          'A guarda de fronteira pode pedir o mesmo seguro, alojamento e recursos que você juntou ao pedido; ter visto não elimina o direito de verificação.',
        ],
        es: [
          'Llevar los documentos justificativos en el control fronterizo',
          'La guardia de fronteras puede pedir el mismo seguro, alojamiento y fondos que aportó con la solicitud; tener visado no elimina el derecho a comprobar.',
        ],
      },
    ],
  },

  'National Visa (Type D) / Residence Permit': {
    core_documents: [
      {
        en: [
          'Application filed in the online immigration portal',
          'The electronic channel is the standard one: a paper application costs more, is processed more slowly and cannot be tracked in the same way.',
        ],
        pt: [
          'Pedido submetido no portal online de imigração',
          'O canal eletrónico é o padrão: um pedido em papel custa mais, é processado mais devagar e não pode ser acompanhado da mesma forma.',
        ],
        es: [
          'Solicitud presentada en el portal en línea de inmigración',
          'El canal electrónico es el estándar: una solicitud en papel cuesta más, se tramita más despacio y no puede seguirse de la misma manera.',
        ],
      },
      {
        en: [
          'Passport valid for the whole permit period',
          'A permit is never granted beyond the expiry of the travel document, so a passport with a year left produces a permit with a year on it.',
        ],
        pt: [
          'Passaporte válido por todo o período da autorização',
          'Uma autorização nunca é concedida além da validade do documento de viagem, então um passaporte com um ano restante gera uma autorização de um ano.',
        ],
        es: [
          'Pasaporte vigente durante todo el periodo del permiso',
          'Un permiso nunca se concede más allá de la caducidad del documento de viaje, así que un pasaporte con un año restante produce un permiso de un año.',
        ],
      },
      {
        en: [
          'Document establishing the ground for the permit',
          'An employment contract, a letter of admission or a documented family relationship. The ground decides the permit type and the processing route, including whether a fast track exists.',
        ],
        pt: [
          'Documento que estabelece o fundamento da autorização',
          'Um contrato de trabalho, uma carta de admissão ou uma relação familiar documentada. O fundamento define o tipo de autorização e a via de tramitação, inclusive se há via rápida.',
        ],
        es: [
          'Documento que establece el fundamento del permiso',
          'Un contrato de trabajo, una carta de admisión o una relación familiar documentada. El fundamento determina el tipo de permiso y la vía de tramitación, incluida la existencia de vía rápida.',
        ],
      },
      {
        en: [
          'Terms of employment confirmed by the employer',
          'The employer completes their own part in the portal. For many work permits the case simply does not start moving until they have done it, and applicants often wait without knowing why.',
        ],
        pt: [
          'Condições de trabalho confirmadas pelo empregador',
          'O empregador preenche a parte dele no portal. Em muitas autorizações de trabalho o processo simplesmente não anda até isso ser feito, e o requerente espera sem saber porquê.',
        ],
        es: [
          'Condiciones laborales confirmadas por el empleador',
          'El empleador completa su propia parte en el portal. En muchos permisos de trabajo el caso no avanza hasta que lo hace, y el solicitante espera sin saber por qué.',
        ],
        priority: 2,
      },
      {
        en: [
          'Civil status certificates legalised for use in Finland',
          'Apostille or consular legalisation, plus a translation by an authorised translator into Finnish, Swedish or English.',
        ],
        pt: [
          'Certidões de estado civil legalizadas para uso na Finlândia',
          'Apostila ou legalização consular, mais tradução por tradutor autorizado para finlandês, sueco ou inglês.',
        ],
        es: [
          'Certificados de estado civil legalizados para su uso en Finlandia',
          'Apostilla o legalización consular, más traducción por un traductor autorizado al finés, sueco o inglés.',
        ],
      },
      {
        en: [
          'Insurance cover at the level your permit requires',
          'The level depends on the permit and the length of stay: students and short permits need broader private cover, while workers are largely covered through the employment.',
        ],
        pt: [
          'Cobertura de seguro no nível exigido pela sua autorização',
          'O nível depende da autorização e da duração: estudantes e autorizações curtas precisam de cobertura privada mais ampla, enquanto trabalhadores ficam cobertos em grande parte pelo vínculo.',
        ],
        es: [
          'Cobertura de seguro en el nivel que exige su permiso',
          'El nivel depende del permiso y de la duración: estudiantes y permisos cortos necesitan una cobertura privada más amplia, mientras los trabajadores quedan cubiertos en gran medida por el empleo.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Admission letter and previous qualifications',
          'For a study permit, the institution and the programme both have to be ones Finland recognises; a short course at a private provider does not support a permit.',
        ],
        pt: [
          'Carta de admissão e qualificações anteriores',
          'Para autorização de estudo, a instituição e o programa têm de ser reconhecidos pela Finlândia; um curso curto num fornecedor privado não sustenta uma autorização.',
        ],
        es: [
          'Carta de admisión y titulaciones previas',
          'Para un permiso de estudios, la institución y el programa deben estar reconocidos por Finlandia; un curso corto en un proveedor privado no sostiene un permiso.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Recognition of a foreign degree for regulated work',
          'Health care and teaching are licensed by separate authorities, and that licence regularly takes longer than the residence permit itself.',
        ],
        pt: [
          'Reconhecimento de diploma estrangeiro para profissão regulamentada',
          'Saúde e ensino são licenciados por autoridades separadas, e essa licença costuma demorar mais do que a própria autorização de residência.',
        ],
        es: [
          'Reconocimiento de título extranjero para profesión regulada',
          'La sanidad y la enseñanza las licencian autoridades separadas, y esa licencia suele tardar más que el propio permiso de residencia.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Secure means of support for the whole permit period',
          'A monthly figure applies, different for workers, students and family members, and it is reviewed periodically. Confirm the amount currently in use rather than an older one.',
        ],
        pt: [
          'Meios de subsistência garantidos por todo o período da autorização',
          'Aplica-se um valor mensal, diferente para trabalhadores, estudantes e familiares, e é revisto periodicamente. Confirme o valor em uso hoje em vez de um mais antigo.',
        ],
        es: [
          'Medios de subsistencia garantizados durante todo el permiso',
          'Se aplica un importe mensual, distinto para trabajadores, estudiantes y familiares, y se revisa periódicamente. Confirme la cifra vigente en lugar de una más antigua.',
        ],
      },
      {
        en: [
          'Bank statements or a scholarship decision',
          'Funds have to be genuinely available to you; a parent account that you cannot draw on does not satisfy the requirement.',
        ],
        pt: [
          'Extratos bancários ou decisão de bolsa',
          'Os recursos têm de estar realmente disponíveis para você; uma conta dos pais da qual não pode sacar não cumpre o requisito.',
        ],
        es: [
          'Extractos bancarios o resolución de beca',
          'Los fondos deben estar realmente a su disposición; una cuenta de los padres de la que no puede disponer no cumple el requisito.',
        ],
      },
      {
        en: [
          'Pay the processing fee when submitting',
          'Charged online at submission and not refunded if the permit is refused; the amount differs between the electronic and the paper channel.',
        ],
        pt: [
          'Pagar a taxa de tramitação ao submeter',
          'Cobrada online na submissão e não devolvida se a autorização for recusada; o valor difere entre o canal eletrónico e o de papel.',
        ],
        es: [
          'Pagar la tasa de tramitación al presentar',
          'Se cobra en línea al presentar y no se devuelve si deniegan el permiso; el importe difiere entre el canal electrónico y el de papel.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Prove your identity at a service point within the deadline',
          'After filing online you must attend in person at a Finnish mission or a partner service point, and the application is not processed until you do. This step causes most unexplained delays.',
        ],
        pt: [
          'Comprovar a identidade num ponto de atendimento dentro do prazo',
          'Depois de submeter online você tem de comparecer pessoalmente numa representação finlandesa ou num ponto de atendimento parceiro, e o pedido não é processado enquanto isso não acontecer.',
        ],
        es: [
          'Acreditar su identidad en un punto de atención dentro del plazo',
          'Tras presentar en línea debe acudir en persona a una representación finlandesa o a un punto de atención asociado, y la solicitud no se tramita hasta que lo haga.',
        ],
      },
      {
        en: [
          'Bring the original documents to the identity visit',
          'Uploaded copies are not enough on their own; the originals are inspected at the counter and their absence sends you back for a second appointment.',
        ],
        pt: [
          'Levar os documentos originais à visita de identificação',
          'As cópias carregadas não bastam por si; os originais são conferidos no balcão e a falta deles obriga a um segundo agendamento.',
        ],
        es: [
          'Llevar los documentos originales a la visita de identificación',
          'Las copias subidas no bastan por sí solas; los originales se revisan en el mostrador y su ausencia obliga a una segunda cita.',
        ],
      },
      {
        en: [
          'Ask whether a long-stay visa comes with your permit',
          'Finland grants a national D visa alongside the residence permit for certain specialists, students, researchers and their families, letting them travel immediately instead of waiting for the card.',
        ],
        pt: [
          'Perguntar se um visto de longa duração acompanha a sua autorização',
          'A Finlândia concede um visto nacional D junto com a autorização de residência a certos especialistas, estudantes, investigadores e suas famílias, permitindo viajar de imediato em vez de esperar pelo cartão.',
        ],
        es: [
          'Preguntar si un visado de larga duración acompaña a su permiso',
          'Finlandia concede un visado nacional D junto con el permiso de residencia a ciertos especialistas, estudiantes, investigadores y sus familias, lo que permite viajar de inmediato en vez de esperar la tarjeta.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data captured at the service point',
          'Fingerprints and a photograph for the residence permit card, taken at the same visit as the identity check.',
        ],
        pt: [
          'Dados biométricos recolhidos no ponto de atendimento',
          'Impressões digitais e fotografia para o cartão de autorização de residência, na mesma visita da verificação de identidade.',
        ],
        es: [
          'Datos biométricos recogidos en el punto de atención',
          'Huellas y fotografía para la tarjeta de permiso de residencia, en la misma visita que la comprobación de identidad.',
        ],
      },
      {
        en: [
          'Health screening in defined cases only',
          'It is not routine; specific work sectors and some family cases can trigger a screening requirement after arrival.',
        ],
        pt: [
          'Triagem de saúde apenas em casos definidos',
          'Não é rotina; setores específicos de trabalho e alguns casos familiares podem gerar exigência de triagem após a chegada.',
        ],
        es: [
          'Cribado sanitario solo en casos definidos',
          'No es rutinario; ciertos sectores laborales y algunos casos familiares pueden generar una exigencia de cribado tras la llegada.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Receive or collect the residence permit card',
          'The card is produced after the decision and delivered through the mission or by post. The decision letter itself is not a travel document.',
        ],
        pt: [
          'Receber ou levantar o cartão de autorização de residência',
          'O cartão é produzido após a decisão e entregue pela representação ou por correio. A carta de decisão em si não é documento de viagem.',
        ],
        es: [
          'Recibir o recoger la tarjeta de permiso de residencia',
          'La tarjeta se produce tras la resolución y se entrega por la representación o por correo. La carta de resolución en sí no es un documento de viaje.',
        ],
      },
      {
        en: [
          'Note the personal identity code issued with the permit',
          'The immigration service now assigns the identity code with the first permit. Without it, banks, employers and health services have no way to register you.',
        ],
        pt: [
          'Anotar o código de identidade pessoal emitido com a autorização',
          'O serviço de imigração agora atribui o código de identidade junto com a primeira autorização. Sem ele, bancos, empregadores e serviços de saúde não têm como registá-lo.',
        ],
        es: [
          'Anotar el código de identidad personal emitido con el permiso',
          'El servicio de inmigración ahora asigna el código de identidad junto con el primer permiso. Sin él, bancos, empleadores y servicios sanitarios no pueden registrarle.',
        ],
      },
      {
        en: [
          'Register your municipality of residence at the digital agency',
          'A separate registration from both the permit and the identity code. The municipality of residence is what opens access to local services and to public health care.',
        ],
        pt: [
          'Registar o município de residência na agência digital',
          'Um registo separado tanto da autorização como do código de identidade. O município de residência é o que abre o acesso aos serviços locais e à saúde pública.',
        ],
        es: [
          'Registrar su municipio de residencia en la agencia digital',
          'Un registro separado tanto del permiso como del código de identidad. El municipio de residencia es lo que abre el acceso a los servicios locales y a la sanidad pública.',
        ],
      },
      {
        en: [
          'Get a tax card before the first payday',
          'Without one the employer withholds at the highest rate, and reclaiming the difference takes until the following tax year.',
        ],
        pt: [
          'Obter o cartão fiscal antes do primeiro pagamento',
          'Sem ele o empregador retém à taxa mais alta, e recuperar a diferença leva até ao ano fiscal seguinte.',
        ],
        es: [
          'Obtener la tarjeta fiscal antes del primer pago',
          'Sin ella el empleador retiene al tipo más alto, y recuperar la diferencia lleva hasta el ejercicio fiscal siguiente.',
        ],
        priority: 2,
      },
      {
        en: [
          'Watch the deadline to find new work if the job ends',
          'A permit holder who loses the job has a limited period to find another before the permit is at risk, and the period is longer for specialists than for other workers.',
        ],
        pt: [
          'Vigiar o prazo para achar novo emprego se o trabalho acabar',
          'Quem perde o emprego tem um período limitado para encontrar outro antes de a autorização ficar em risco, e esse período é maior para especialistas do que para os demais trabalhadores.',
        ],
        es: [
          'Vigilar el plazo para encontrar otro empleo si el trabajo termina',
          'Quien pierde el empleo dispone de un periodo limitado para hallar otro antes de que peligre el permiso, y ese periodo es mayor para los especialistas que para el resto.',
        ],
      },
    ],
  },

  'Residence Permit / Permanent Residence': {
    core_documents: [
      {
        en: [
          'Extension application filed before the current permit expires',
          'Lodged in the online service. Filing in time normally lets you keep working while the case runs, but travelling before the new decision can still cause problems at the border.',
        ],
        pt: [
          'Pedido de prorrogação submetido antes de a autorização atual vencer',
          'Feito no serviço online. Entregar a tempo normalmente permite continuar a trabalhar durante o processo, mas viajar antes da nova decisão ainda pode dar problema na fronteira.',
        ],
        es: [
          'Solicitud de prórroga presentada antes de que caduque el permiso actual',
          'Se presenta en el servicio en línea. Hacerlo a tiempo suele permitir seguir trabajando mientras dura el caso, pero viajar antes de la nueva resolución aún puede dar problemas en la frontera.',
        ],
      },
      {
        en: [
          'Evidence of continuous residence on a qualifying permit',
          'Only time spent on a continuous permit counts. Years on a temporary permit, including seasonal work and part of the student track, do not build towards permanent residence.',
        ],
        pt: [
          'Comprovação de residência contínua com autorização qualificante',
          'Só conta o tempo passado com autorização contínua. Anos com autorização temporária, incluindo trabalho sazonal e parte da via de estudante, não constroem residência permanente.',
        ],
        es: [
          'Prueba de residencia continua con un permiso cualificante',
          'Solo cuenta el tiempo con permiso continuo. Los años con permiso temporal, incluidos el trabajo estacional y parte de la vía de estudiante, no construyen residencia permanente.',
        ],
      },
      {
        en: [
          'Passport valid at the moment of the decision',
          'An expired travel document stalls an otherwise complete file, and renewing it mid-case means updating the application.',
        ],
        pt: [
          'Passaporte válido no momento da decisão',
          'Um documento de viagem caducado trava um processo que estaria completo, e renová-lo a meio obriga a atualizar o pedido.',
        ],
        es: [
          'Pasaporte vigente en el momento de la resolución',
          'Un documento de viaje caducado bloquea un expediente por lo demás completo, y renovarlo a mitad obliga a actualizar la solicitud.',
        ],
      },
      {
        en: [
          'Record of the time you spent outside Finland',
          'Absences beyond the permitted total break the continuity and reset the clock. Keep boarding passes and stamps, because the burden of showing the pattern is yours.',
        ],
        pt: [
          'Registo do tempo passado fora da Finlândia',
          'Ausências acima do total permitido quebram a continuidade e reiniciam a contagem. Guarde cartões de embarque e carimbos, porque o ónus de mostrar o padrão é seu.',
        ],
        es: [
          'Registro del tiempo pasado fuera de Finlandia',
          'Las ausencias por encima del total permitido rompen la continuidad y reinician el cómputo. Guarde tarjetas de embarque y sellos, porque la carga de mostrar el patrón es suya.',
        ],
      },
      {
        en: [
          'Confirmation that the original ground still holds',
          'The permanent permit is granted on the basis you have been holding. Losing the job or the relationship shortly before the decision can sink an application built on years of residence.',
        ],
        pt: [
          'Confirmação de que o fundamento original se mantém',
          'A autorização permanente é concedida com base naquilo que você vinha detendo. Perder o emprego ou a relação pouco antes da decisão pode afundar um pedido construído em anos de residência.',
        ],
        es: [
          'Confirmación de que el fundamento original sigue vigente',
          'El permiso permanente se concede sobre la base que usted venía teniendo. Perder el empleo o la relación poco antes de la resolución puede hundir una solicitud construida en años de residencia.',
        ],
      },
      {
        en: [
          'Clean record with the authorities',
          'Offences, unpaid obligations and inaccurate statements in earlier applications are all reviewed on this route, including things that passed unnoticed at the time.',
        ],
        pt: [
          'Histórico limpo junto das autoridades',
          'Infrações, obrigações por pagar e declarações inexatas em pedidos anteriores são todas revistas nesta via, incluindo coisas que passaram despercebidas na época.',
        ],
        es: [
          'Historial limpio ante las autoridades',
          'Las infracciones, las obligaciones impagadas y las declaraciones inexactas de solicitudes anteriores se revisan todas en esta vía, incluso cosas que pasaron desapercibidas entonces.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Prepare for the language and integration conditions in force',
          'Finland has been legislating to tighten permanent residence, adding conditions on top of the residence period. Check the rules applying on the day you apply, not an older summary.',
        ],
        pt: [
          'Preparar-se para as condições de idioma e integração vigentes',
          'A Finlândia tem legislado para apertar a residência permanente, somando condições ao período de residência. Verifique as regras válidas no dia do pedido, não um resumo antigo.',
        ],
        es: [
          'Prepararse para las condiciones de idioma e integración vigentes',
          'Finlandia ha ido legislando para endurecer la residencia permanente, añadiendo condiciones al periodo de residencia. Consulte las normas del día en que solicite, no un resumen antiguo.',
        ],
      },
      {
        en: [
          'Keep the certificates from integration training',
          'Municipal integration courses give a documented level that is useful both here and later for naturalisation, and the places are subsidised while you are a new resident.',
        ],
        pt: [
          'Guardar os certificados da formação de integração',
          'Os cursos municipais de integração dão um nível documentado útil aqui e depois na naturalização, e as vagas são subsidiadas enquanto você é residente recente.',
        ],
        es: [
          'Conservar los certificados de la formación de integración',
          'Los cursos municipales de integración dan un nivel documentado útil aquí y luego en la naturalización, y las plazas están subvencionadas mientras es residente reciente.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Sufficient income across the qualifying period',
          'Relying on income support during the years being counted can block the permit, and the income examined is the household one rather than yours alone.',
        ],
        pt: [
          'Rendimento suficiente ao longo do período qualificante',
          'Depender de apoio ao rendimento durante os anos contados pode bloquear a autorização, e o rendimento analisado é o do agregado e não apenas o seu.',
        ],
        es: [
          'Ingresos suficientes a lo largo del periodo cualificante',
          'Depender de ayudas a la renta durante los años computados puede bloquear el permiso, y los ingresos examinados son los del hogar y no solo los suyos.',
        ],
      },
      {
        en: [
          'Tax records covering the whole period',
          'Filed returns and paid taxes are the simplest evidence of a continuous, lawful and self-supporting stay, and they are easier to produce than reconstructing payslips.',
        ],
        pt: [
          'Registos fiscais cobrindo todo o período',
          'Declarações entregues e impostos pagos são a prova mais simples de uma estada contínua, legal e autossustentada, e são mais fáceis de obter do que reconstruir holerites.',
        ],
        es: [
          'Registros fiscales que cubran todo el periodo',
          'Las declaraciones presentadas y los impuestos pagados son la prueba más sencilla de una estancia continua, legal y autosuficiente, y son más fáciles de obtener que reconstruir nóminas.',
        ],
      },
      {
        en: [
          'Pay the fee for the permanent permit',
          'A separate fee from the extension permit; confirm the current amount in the online service before submitting, as it is revised periodically.',
        ],
        pt: [
          'Pagar a taxa da autorização permanente',
          'Uma taxa distinta da autorização de prorrogação; confirme o valor atual no serviço online antes de submeter, pois é revisto periodicamente.',
        ],
        es: [
          'Pagar la tasa del permiso permanente',
          'Una tasa distinta de la del permiso de prórroga; confirme el importe actual en el servicio en línea antes de presentar, porque se revisa periódicamente.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Submit through the online service and identify yourself if asked',
          'An application filed from inside Finland does not always require a visit, but a new card always requires biometrics, so expect at least one appointment.',
        ],
        pt: [
          'Submeter pelo serviço online e identificar-se se for pedido',
          'Um pedido feito de dentro da Finlândia nem sempre exige visita, mas um cartão novo exige sempre biometria, então conte com pelo menos um agendamento.',
        ],
        es: [
          'Presentar por el servicio en línea e identificarse si se lo piden',
          'Una solicitud hecha desde dentro de Finlandia no siempre exige visita, pero una tarjeta nueva siempre exige biometría, así que cuente con al menos una cita.',
        ],
      },
      {
        en: [
          'Apply while you still hold a valid permit',
          'A gap between permits breaks the continuity that the whole application rests on, and continuity cannot be repaired retrospectively.',
        ],
        pt: [
          'Pedir enquanto ainda detém uma autorização válida',
          'Uma lacuna entre autorizações quebra a continuidade sobre a qual todo o pedido se apoia, e a continuidade não se conserta retroativamente.',
        ],
        es: [
          'Solicitar mientras aún tiene un permiso vigente',
          'Un vacío entre permisos rompe la continuidad en la que se apoya toda la solicitud, y la continuidad no se repara con efecto retroactivo.',
        ],
      },
      {
        en: [
          'Allow for a longer examination than an extension',
          'Permanent permits are checked more closely than extensions and there is no fast track for them, whatever route you came in on.',
        ],
        pt: [
          'Contar com uma análise mais longa que a de uma prorrogação',
          'As autorizações permanentes são verificadas mais a fundo que as prorrogações e não têm via rápida, seja qual for a via pela qual você entrou.',
        ],
        es: [
          'Contar con un examen más largo que el de una prórroga',
          'Los permisos permanentes se revisan con más detalle que las prórrogas y no tienen vía rápida, sea cual sea la vía por la que entró.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'New biometrics for the permanent card',
          'Fingerprints and photograph are taken again; the ones stored for the earlier permit are not reused for a new card.',
        ],
        pt: [
          'Nova biometria para o cartão permanente',
          'Impressões digitais e fotografia são recolhidas de novo; as guardadas para a autorização anterior não são reaproveitadas num cartão novo.',
        ],
        es: [
          'Nueva biometría para la tarjeta permanente',
          'Las huellas y la fotografía se toman de nuevo; las guardadas para el permiso anterior no se reutilizan en una tarjeta nueva.',
        ],
      },
      {
        en: [
          'No medical requirement at this stage',
          'Health is not assessed for permanent residence; only your registration and income history are.',
        ],
        pt: [
          'Sem exigência médica nesta fase',
          'A saúde não é avaliada na residência permanente; apenas o seu registo e o histórico de rendimento.',
        ],
        es: [
          'Sin exigencia médica en esta fase',
          'La salud no se evalúa en la residencia permanente; solo su registro y su historial de ingresos.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Understand that the card expires but the status does not',
          'The permanent permit is open-ended while the plastic card is renewed periodically. Letting the card lapse causes trouble at the border even though your right to live here is untouched.',
        ],
        pt: [
          'Perceber que o cartão caduca mas o estatuto não',
          'A autorização permanente é por tempo indeterminado, enquanto o cartão de plástico é renovado periodicamente. Deixá-lo caducar dá problema na fronteira mesmo com o seu direito intacto.',
        ],
        es: [
          'Entender que la tarjeta caduca pero el estatuto no',
          'El permiso permanente es indefinido mientras la tarjeta de plástico se renueva periódicamente. Dejarla caducar da problemas en la frontera aunque su derecho a residir siga intacto.',
        ],
      },
      {
        en: [
          'Keep the population register entry up to date',
          'Address changes go to the digital agency, and every other authority relies on that record rather than asking you.',
        ],
        pt: [
          'Manter atualizado o registo na base populacional',
          'As mudanças de morada vão para a agência digital, e todas as outras autoridades apoiam-se nesse registo em vez de perguntarem a você.',
        ],
        es: [
          'Mantener actualizada la inscripción en el registro de población',
          'Los cambios de domicilio se comunican a la agencia digital, y las demás autoridades se apoyan en ese registro en lugar de preguntarle.',
        ],
      },
      {
        en: [
          'Know what causes the permanent permit to lapse',
          'A long continuous absence from Finland ends it. The allowance is more generous than for a temporary permit, but it is not unlimited and it is checked on return.',
        ],
        pt: [
          'Saber o que faz a autorização permanente caducar',
          'Uma ausência contínua e longa da Finlândia extingue-a. A tolerância é maior que na autorização temporária, mas não é ilimitada e é verificada no regresso.',
        ],
        es: [
          'Saber qué hace caducar el permiso permanente',
          'Una ausencia continua y prolongada de Finlandia lo extingue. La tolerancia es mayor que en el permiso temporal, pero no es ilimitada y se comprueba al regresar.',
        ],
      },
      {
        en: [
          'Consider the EU long-term resident status as well',
          'It carries mobility rights to other member states that the national permanent permit does not, and it is applied for separately even when the residence period is the same.',
        ],
        pt: [
          'Ponderar também o estatuto de residente de longa duração da UE',
          'Ele traz direitos de mobilidade para outros Estados-membros que a autorização permanente nacional não dá, e é pedido em separado mesmo quando o período de residência é o mesmo.',
        ],
        es: [
          'Valorar también el estatuto de residente de larga duración de la UE',
          'Aporta derechos de movilidad a otros Estados miembros que el permiso permanente nacional no da, y se solicita por separado aunque el periodo de residencia sea el mismo.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Check the citizenship conditions before counting on them',
          'The residence period required for naturalisation was lengthened recently and a language test applies, so the years that earned permanent residence do not automatically satisfy it.',
        ],
        pt: [
          'Conferir as condições de cidadania antes de contar com elas',
          'O período de residência exigido para a naturalização foi alargado recentemente e aplica-se um teste de idioma, então os anos que renderam a residência permanente não a satisfazem automaticamente.',
        ],
        es: [
          'Revisar las condiciones de ciudadanía antes de contar con ellas',
          'El periodo de residencia exigido para la naturalización se alargó recientemente y se aplica una prueba de idioma, así que los años que dieron la residencia permanente no la satisfacen automáticamente.',
        ],
      },
    ],
  },
};
