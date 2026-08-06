import type { CountryVisaSteps } from './types';

/**
 * Steps for Cyprus.
 *
 * Cyprus is in the European Union but not in the Schengen area. A Schengen
 * sticker is not a Cypriot visa, days spent here do not consume the 90 in 180
 * allowance, and fingerprints given for a Schengen file are not reused. Almost
 * every assumption imported from mainland Europe has to be checked again.
 *
 * The island is divided. The Republic controls the south, and entering through
 * an airport or port in the north counts as illegal entry no matter how routine
 * the flight felt — which then contaminates every residence application.
 *
 * The investment routes were rewritten after the citizenship-by-investment
 * programme was abolished in 2020, and the permanent residence rules changed
 * again in 2023. Guides written before then describe schemes that no longer
 * exist, so anything about investing in Cyprus needs to be dated before it is
 * trusted.
 */
export const cyprus: CountryVisaSteps = {
  'Short-Stay Visa': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Valid for at least three months after the intended departure. Cyprus stamps entry and exit itself, independently of Schengen.',
        ],
        pt: [
          'Passaporte válido',
          'Válido por pelo menos três meses após a saída prevista. O Chipre carimba entrada e saída por conta própria, à parte do Schengen.',
        ],
        es: [
          'Pasaporte vigente',
          'Vigente al menos tres meses después de la salida prevista. Chipre sella entrada y salida por su cuenta, al margen de Schengen.',
        ],
      },
      {
        en: [
          'Check whether a Schengen visa admits you instead',
          'Holders of a valid multiple-entry Schengen visa or residence permit may enter without a Cypriot visa. A single-entry visa already used does not qualify.',
        ],
        pt: [
          'Verificar se um visto Schengen já permite a entrada',
          'Titulares de visto Schengen de múltiplas entradas válido ou de autorização de residência podem entrar sem visto cipriota. Um visto de entrada única já utilizado não serve.',
        ],
        es: [
          'Comprobar si un visado Schengen ya le permite entrar',
          'Los titulares de un visado Schengen de múltiples entradas vigente o de un permiso de residencia pueden entrar sin visado chipriota. Un visado de entrada única ya usado no sirve.',
        ],
      },
      {
        en: [
          'National short-stay application form',
          'Cyprus issues its own visa on its own form. The Schengen application and the Schengen sticker have no value here.',
        ],
        pt: [
          'Formulário nacional de estada curta',
          'O Chipre emite o próprio visto no próprio formulário. O pedido Schengen e a vinheta Schengen não têm valor aqui.',
        ],
        es: [
          'Formulario nacional de estancia corta',
          'Chipre expide su propio visado en su propio formulario. La solicitud Schengen y la etiqueta Schengen no valen aquí.',
        ],
      },
      {
        en: [
          'Recent passport photograph',
          'In colour, on a white background, taken within the last six months.',
        ],
        pt: [
          'Fotografia recente tipo passe',
          'A cores, em fundo branco, tirada nos últimos seis meses.',
        ],
        es: [
          'Fotografía reciente tipo pasaporte',
          'En color, con fondo blanco, tomada en los últimos seis meses.',
        ],
      },
      {
        en: [
          'Return ticket and full itinerary',
          'The dates have to match the stay requested. Open-ended trips are refused as a matter of course.',
        ],
        pt: [
          'Bilhete de volta e itinerário completo',
          'As datas precisam coincidir com a estada pedida. Viagens sem data de retorno são recusadas por princípio.',
        ],
        es: [
          'Billete de vuelta e itinerario completo',
          'Las fechas deben coincidir con la estancia solicitada. Los viajes sin fecha de regreso se deniegan por principio.',
        ],
      },
      {
        en: [
          'Confirmed accommodation for every night',
          'Hotel bookings, or an invitation from a host with a copy of their identity document and proof of their address.',
        ],
        pt: [
          'Alojamento confirmado para todas as noites',
          'Reservas de hotel, ou convite de um anfitrião com cópia do documento de identidade e comprovativo de morada dele.',
        ],
        es: [
          'Alojamiento confirmado para todas las noches',
          'Reservas de hotel, o invitación de un anfitrión con copia de su documento de identidad y comprobante de su domicilio.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of funds for the whole stay',
          'Bank statements over the recent months. The consulate looks for a pattern of income, not a single deposit made before applying.',
        ],
        pt: [
          'Comprovação de fundos para toda a estada',
          'Extratos bancários dos últimos meses. O consulado procura um padrão de rendimento, não um único depósito feito antes do pedido.',
        ],
        es: [
          'Prueba de fondos para toda la estancia',
          'Extractos bancarios de los últimos meses. El consulado busca un patrón de ingresos, no un único depósito hecho antes de solicitar.',
        ],
      },
      {
        en: [
          'Travel medical insurance valid in Cyprus',
          'A policy written for the Schengen area does not automatically cover Cyprus. Read the territorial scope clause before buying.',
        ],
        pt: [
          'Seguro médico de viagem válido no Chipre',
          'Uma apólice escrita para o espaço Schengen não cobre automaticamente o Chipre. Leia a cláusula de âmbito territorial antes de comprar.',
        ],
        es: [
          'Seguro médico de viaje válido en Chipre',
          'Una póliza escrita para el espacio Schengen no cubre automáticamente Chipre. Lea la cláusula de ámbito territorial antes de contratar.',
        ],
      },
      {
        en: [
          'Evidence of employment or studies at home',
          'Payslips, an approved leave request or an enrolment certificate, to show a reason to return.',
        ],
        pt: [
          'Prova de emprego ou estudos no país de origem',
          'Recibos de vencimento, pedido de férias aprovado ou certificado de matrícula, para mostrar um motivo de retorno.',
        ],
        es: [
          'Prueba de empleo o estudios en su país',
          'Nóminas, una solicitud de vacaciones aprobada o un certificado de matrícula, para mostrar un motivo de regreso.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Find the consulate that covers your country',
          'Cyprus has a thin consular network and often works through honorary consulates or a neighbouring embassy, each with its own document list.',
        ],
        pt: [
          'Localizar o consulado que cobre o seu país',
          'O Chipre tem uma rede consular reduzida e muitas vezes atua por consulados honorários ou uma embaixada vizinha, cada um com a sua lista de documentos.',
        ],
        es: [
          'Localizar el consulado que cubre su país',
          'Chipre tiene una red consular reducida y a menudo opera por consulados honorarios o una embajada vecina, cada uno con su propia lista de documentos.',
        ],
      },
      {
        en: [
          'Pay the visa fee at submission',
          'Not refunded on refusal, and in several posts payable only in cash or by bank draft.',
        ],
        pt: [
          'Pagar a taxa de visto na entrega',
          'Não devolvida em caso de recusa, e em vários postos só aceita em dinheiro ou cheque bancário.',
        ],
        es: [
          'Pagar la tasa de visado al presentar',
          'No se devuelve si deniegan, y en varios puestos solo se acepta en efectivo o mediante cheque bancario.',
        ],
      },
      {
        en: [
          'Allow extra time for referred applications',
          'Many nationalities are referred to the Migration Department in Nicosia for approval, which adds weeks on top of the consular timeline.',
        ],
        pt: [
          'Prever tempo extra para pedidos remetidos a Nicósia',
          'Muitas nacionalidades são remetidas ao Departamento de Migração em Nicósia para aprovação, o que acrescenta semanas ao prazo consular.',
        ],
        es: [
          'Prever tiempo extra para solicitudes remitidas a Nicosia',
          'Muchas nacionalidades se remiten al Departamento de Migración en Nicosia para su aprobación, lo que añade semanas al plazo consular.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data taken at the consulate',
          'Cyprus is outside the Schengen visa information system, so fingerprints given for a Schengen application are not reused here.',
        ],
        pt: [
          'Dados biométricos recolhidos no consulado',
          'O Chipre está fora do sistema de informação de vistos Schengen, portanto as impressões dadas num pedido Schengen não são reaproveitadas aqui.',
        ],
        es: [
          'Datos biométricos tomados en el consulado',
          'Chipre está fuera del sistema de información de visados Schengen, así que las huellas dadas en una solicitud Schengen no se reutilizan aquí.',
        ],
      },
      {
        en: [
          'Health screening for a short visit',
          'Not required for tourism. Medical tests only appear once you apply to stay and work on the island.',
        ],
        pt: [
          'Rastreio de saúde para uma visita curta',
          'Não é exigido em turismo. Os exames médicos só aparecem quando você pede para ficar e trabalhar na ilha.',
        ],
        es: [
          'Cribado sanitario para una visita corta',
          'No se exige en turismo. Los exámenes médicos solo aparecen cuando solicita quedarse y trabajar en la isla.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Enter only through a legal port of entry',
          'Larnaca and Paphos airports and the ports in the south. Arriving through the north is treated as illegal entry by the Republic and taints every later application.',
        ],
        pt: [
          'Entrar apenas por um ponto de entrada legal',
          'Aeroportos de Lárnaca e Pafos e os portos do sul. Chegar pelo norte é tratado como entrada ilegal pela República e contamina qualquer pedido posterior.',
        ],
        es: [
          'Entrar solo por un puesto de entrada legal',
          'Aeropuertos de Lárnaca y Pafos y los puertos del sur. Llegar por el norte se considera entrada ilegal para la República y contamina cualquier solicitud posterior.',
        ],
      },
      {
        en: [
          'Understand how crossing the Green Line works',
          'The designated crossing points are open, but you must have entered legally in the south first. Doing it the other way round is not recognised.',
        ],
        pt: [
          'Entender como funciona a travessia da Linha Verde',
          'Os pontos de passagem designados estão abertos, mas você precisa ter entrado legalmente pelo sul antes. Fazer o caminho inverso não é reconhecido.',
        ],
        es: [
          'Entender cómo funciona cruzar la Línea Verde',
          'Los puntos de paso designados están abiertos, pero antes hay que haber entrado legalmente por el sur. Hacerlo al revés no se reconoce.',
        ],
      },
      {
        en: [
          'Do not count these days against Schengen',
          'Time in Cyprus does not consume the 90 in 180 allowance, and Schengen days do not consume the Cypriot one. The two counters run separately.',
        ],
        pt: [
          'Não contar estes dias contra o Schengen',
          'O tempo no Chipre não consome a franquia de 90 em 180, e os dias Schengen não consomem a cipriota. Os dois contadores correm em separado.',
        ],
        es: [
          'No contar estos días contra Schengen',
          'El tiempo en Chipre no consume la franquicia de 90 en 180, y los días Schengen no consumen la chipriota. Los dos contadores corren por separado.',
        ],
      },
      {
        en: [
          'Leave before the stamp expires',
          'Overstaying is recorded against you and leads to entry bans that also block later residence applications.',
        ],
        pt: [
          'Sair antes de o carimbo expirar',
          'A permanência excedida fica registada contra você e gera proibições de entrada que também travam pedidos de residência futuros.',
        ],
        es: [
          'Salir antes de que caduque el sello',
          'La estancia excedida queda registrada en su contra y genera prohibiciones de entrada que también bloquean solicitudes de residencia posteriores.',
        ],
      },
    ],
  },

  'Digital Nomad Visa': {
    core_documents: [
      {
        en: [
          'Check that places are still open under the quota',
          'The scheme runs on a capped number of permits, already raised once. When the cap is reached applications simply stop being accepted, so confirm availability before preparing anything.',
        ],
        pt: [
          'Verificar se ainda há vagas dentro da quota',
          'O regime funciona com um número limitado de permissões, já ampliado uma vez. Atingido o teto, os pedidos deixam de ser aceites, então confirme a disponibilidade antes de preparar seja o que for.',
        ],
        es: [
          'Comprobar si quedan plazas dentro del cupo',
          'El régimen funciona con un número limitado de permisos, ya ampliado una vez. Alcanzado el tope, las solicitudes dejan de aceptarse, así que confirme la disponibilidad antes de preparar nada.',
        ],
      },
      {
        en: [
          'Passport valid well beyond the permit',
          'Plus a copy of every page that carries a stamp, since the entry history is examined.',
        ],
        pt: [
          'Passaporte válido bem além do período da permissão',
          'Mais cópia de todas as páginas com carimbo, já que o histórico de entradas é examinado.',
        ],
        es: [
          'Pasaporte vigente bastante más allá del permiso',
          'Además de copia de cada página con sello, porque se examina el historial de entradas.',
        ],
      },
      {
        en: [
          'Proof that the employer or clients are abroad',
          'Company registration documents from outside Cyprus, or client contracts. Working for a Cypriot company is incompatible with this permit.',
        ],
        pt: [
          'Prova de que o empregador ou os clientes estão no exterior',
          'Documentos de registo da empresa fora do Chipre, ou contratos com clientes. Trabalhar para empresa cipriota é incompatível com esta permissão.',
        ],
        es: [
          'Prueba de que el empleador o los clientes están fuera',
          'Documentos de registro de la empresa fuera de Chipre, o contratos con clientes. Trabajar para una empresa chipriota es incompatible con este permiso.',
        ],
      },
      {
        en: [
          'Employer letter confirming remote work is allowed',
          'Stating the role, the salary and that the duties can be performed from anywhere in the world.',
        ],
        pt: [
          'Carta do empregador confirmando que o trabalho remoto é permitido',
          'Indicando a função, o salário e que as tarefas podem ser executadas de qualquer lugar do mundo.',
        ],
        es: [
          'Carta del empleador confirmando que se permite el trabajo remoto',
          'Indicando el puesto, el salario y que las funciones pueden realizarse desde cualquier lugar del mundo.',
        ],
      },
      {
        en: [
          'Criminal record certificate with apostille',
          'From your country of origin and any country of recent residence, usually accepted only within three months of issue.',
        ],
        pt: [
          'Certidão de antecedentes criminais com apostila',
          'Do país de origem e de qualquer país de residência recente, em geral aceite apenas dentro de três meses da emissão.',
        ],
        es: [
          'Certificado de antecedentes penales con apostilla',
          'Del país de origen y de cualquier país de residencia reciente, normalmente aceptado solo dentro de los tres meses desde su emisión.',
        ],
      },
      {
        en: [
          'Lease agreement stamped by the tax department',
          'A rental contract only counts as proof of address once the stamp duty has been paid on it. This catches almost every applicant by surprise.',
        ],
        pt: [
          'Contrato de arrendamento selado pelo departamento fiscal',
          'Um contrato de aluguer só conta como comprovativo de morada depois de pago o imposto de selo. Isto apanha quase todos os requerentes de surpresa.',
        ],
        es: [
          'Contrato de alquiler timbrado por el departamento fiscal',
          'Un contrato de alquiler solo cuenta como comprobante de domicilio tras pagar el impuesto de timbre. Esto pilla por sorpresa a casi todos los solicitantes.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Monthly net income above the required level',
          'Proved over several months and increased for a spouse and each dependant. Confirm the current threshold rather than an amount quoted in an older article.',
        ],
        pt: [
          'Rendimento líquido mensal acima do nível exigido',
          'Comprovado ao longo de vários meses e aumentado por cônjuge e por cada dependente. Confirme o limiar atual em vez de um valor citado num artigo antigo.',
        ],
        es: [
          'Ingreso neto mensual por encima del nivel exigido',
          'Acreditado durante varios meses y aumentado por cónyuge y por cada dependiente. Confirme el umbral actual en lugar de una cifra citada en un artículo antiguo.',
        ],
      },
      {
        en: [
          'Bank statements showing the income arriving',
          'The money has to be received from abroad; income generated in Cyprus contradicts the basis of the permit.',
        ],
        pt: [
          'Extratos bancários mostrando o rendimento a entrar',
          'O dinheiro precisa ser recebido do exterior; rendimento gerado no Chipre contradiz a base da permissão.',
        ],
        es: [
          'Extractos bancarios que muestren la entrada de ingresos',
          'El dinero debe recibirse del extranjero; los ingresos generados en Chipre contradicen la base del permiso.',
        ],
      },
      {
        en: [
          'Private health insurance for the whole family',
          'The permit gives no access to the national health system, so cover has to be bought and kept for the full period.',
        ],
        pt: [
          'Seguro de saúde privado para toda a família',
          'A permissão não dá acesso ao sistema nacional de saúde, então a cobertura precisa ser comprada e mantida por todo o período.',
        ],
        es: [
          'Seguro de salud privado para toda la familia',
          'El permiso no da acceso al sistema nacional de salud, así que la cobertura debe contratarse y mantenerse todo el periodo.',
        ],
      },
      {
        en: [
          'Pay the application and residence card fees',
          'Separate amounts for the permit itself and for the card, payable at the Migration Department for each family member.',
        ],
        pt: [
          'Pagar as taxas do pedido e do cartão de residência',
          'Valores separados para a permissão e para o cartão, pagos no Departamento de Migração por cada membro da família.',
        ],
        es: [
          'Pagar las tasas de solicitud y de tarjeta de residencia',
          'Importes separados para el permiso y para la tarjeta, pagaderos en el Departamento de Migración por cada miembro de la familia.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply at the Civil Registry and Migration Department',
          'Filed in person in Nicosia, or through a Cypriot consulate before travelling if you prefer to arrive with the decision in hand.',
        ],
        pt: [
          'Apresentar o pedido no Departamento de Registo Civil e Migração',
          'Entregue presencialmente em Nicósia, ou por um consulado cipriota antes de viajar, se preferir chegar já com a decisão.',
        ],
        es: [
          'Presentar la solicitud en el Departamento de Registro Civil y Migración',
          'Se entrega en persona en Nicosia, o por un consulado chipriota antes de viajar si prefiere llegar con la decisión en mano.',
        ],
      },
      {
        en: [
          'Respect the deadline after a legal entry',
          'If you enter first and apply from inside, the application must be lodged within a short window after arrival, or it is rejected on that ground alone.',
        ],
        pt: [
          'Respeitar o prazo após a entrada legal',
          'Se você entrar primeiro e pedir de dentro, o pedido precisa ser protocolado numa janela curta após a chegada, ou é indeferido só por isso.',
        ],
        es: [
          'Respetar el plazo tras la entrada legal',
          'Si entra primero y solicita desde dentro, la solicitud debe presentarse en una ventana corta tras la llegada, o se rechaza solo por ese motivo.',
        ],
      },
      {
        en: [
          'Bring originals, not scans, to the counter',
          'Documents are checked against originals on the spot, and one missing apostille sends you home for the day.',
        ],
        pt: [
          'Levar originais, não digitalizações, ao balcão',
          'Os documentos são conferidos contra os originais na hora, e uma apostila em falta manda você de volta para casa naquele dia.',
        ],
        es: [
          'Llevar originales, no escaneos, al mostrador',
          'Los documentos se cotejan con los originales en el acto, y una apostilla que falte le devuelve a casa por ese día.',
        ],
        priority: 2,
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints for the residence card',
          'Taken at the Migration Department when the file is accepted, with a separate appointment for each family member.',
        ],
        pt: [
          'Impressões digitais para o cartão de residência',
          'Recolhidas no Departamento de Migração quando o processo é aceite, com atendimento separado para cada familiar.',
        ],
        es: [
          'Huellas dactilares para la tarjeta de residencia',
          'Se toman en el Departamento de Migración al aceptarse el expediente, con cita separada para cada familiar.',
        ],
      },
      {
        en: [
          'Register for the Alien Registration Certificate',
          'The ARC is issued after the permit and is the number banks, landlords and hospitals will ask for before anything else.',
        ],
        pt: [
          'Registar-se para o Certificado de Registo de Estrangeiro',
          'O ARC é emitido depois da permissão e é o número que bancos, senhorios e hospitais pedem antes de qualquer outra coisa.',
        ],
        es: [
          'Registrarse para el Certificado de Registro de Extranjero',
          'El ARC se expide tras el permiso y es el número que bancos, arrendadores y hospitales piden antes que nada.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Keep family members out of the local labour market',
          'A spouse and children can accompany you, but they are barred from any employment or economic activity in Cyprus while on this permit.',
        ],
        pt: [
          'Manter os familiares fora do mercado de trabalho local',
          'Cônjuge e filhos podem acompanhar você, mas ficam proibidos de qualquer emprego ou atividade económica no Chipre enquanto durar esta permissão.',
        ],
        es: [
          'Mantener a los familiares fuera del mercado laboral local',
          'El cónyuge y los hijos pueden acompañarle, pero tienen prohibido cualquier empleo o actividad económica en Chipre mientras dure este permiso.',
        ],
      },
      {
        en: [
          'Watch the 183-day tax residency line',
          'Crossing it makes you a Cypriot tax resident, and Cyprus also has a rule that can make you resident after only 60 days under specific conditions.',
        ],
        pt: [
          'Vigiar a linha dos 183 dias de residência fiscal',
          'Ultrapassá-la torna você residente fiscal cipriota, e o Chipre ainda tem uma regra que pode torná-lo residente com apenas 60 dias em condições específicas.',
        ],
        es: [
          'Vigilar la línea de los 183 días de residencia fiscal',
          'Superarla le convierte en residente fiscal chipriota, y Chipre además tiene una regla que puede hacerle residente con solo 60 días en condiciones concretas.',
        ],
      },
      {
        en: [
          'Renew before the first year ends',
          'The permit runs for a year and can be extended for two more, but the extension is applied for while the current one is still valid.',
        ],
        pt: [
          'Renovar antes de terminar o primeiro ano',
          'A permissão vale um ano e pode ser prorrogada por mais dois, mas a prorrogação é pedida enquanto a atual ainda está válida.',
        ],
        es: [
          'Renovar antes de que acabe el primer año',
          'El permiso dura un año y puede prorrogarse dos más, pero la prórroga se solicita mientras el actual sigue vigente.',
        ],
      },
      {
        en: [
          'Do not expect this time to count for citizenship',
          'The permit is temporary by design and does not build towards long-term residence or naturalisation.',
        ],
        pt: [
          'Não esperar que este tempo conte para a cidadania',
          'A permissão é temporária por conceção e não constrói caminho para a residência de longa duração nem para a naturalização.',
        ],
        es: [
          'No esperar que este tiempo cuente para la ciudadanía',
          'El permiso es temporal por diseño y no construye camino hacia la residencia de larga duración ni la naturalización.',
        ],
      },
    ],
  },

  'Employment Permit': {
    core_documents: [
      {
        en: [
          'Confirm which employment route the company uses',
          'A company registered with the business facilitation unit hires third-country staff directly; any other employer goes through the ordinary labour market test. The route decides everything that follows.',
        ],
        pt: [
          'Confirmar qual via de emprego a empresa usa',
          'Uma empresa registada na unidade de facilitação de negócios contrata pessoal de países terceiros diretamente; qualquer outro empregador passa pelo teste de mercado de trabalho comum. A via define tudo o que vem depois.',
        ],
        es: [
          'Confirmar qué vía de empleo usa la empresa',
          'Una empresa registrada en la unidad de facilitación de negocios contrata personal de terceros países directamente; cualquier otro empleador pasa por la prueba de mercado laboral ordinaria. La vía define todo lo demás.',
        ],
      },
      {
        en: [
          'Employment contract sealed by the Labour Department',
          'The contract is stamped by the department before it has any value for the permit. An unsealed contract is just paper.',
        ],
        pt: [
          'Contrato de trabalho selado pelo Departamento do Trabalho',
          'O contrato é carimbado pelo departamento antes de ter qualquer valor para a permissão. Um contrato sem selo é apenas papel.',
        ],
        es: [
          'Contrato de trabajo sellado por el Departamento de Trabajo',
          'El contrato lo timbra el departamento antes de que tenga valor alguno para el permiso. Un contrato sin sello es solo papel.',
        ],
      },
      {
        en: [
          'Valid passport and copies of all used pages',
          'The permit is never issued for longer than the passport remains valid.',
        ],
        pt: [
          'Passaporte válido e cópias de todas as páginas usadas',
          'A permissão nunca é emitida por prazo maior do que a validade do passaporte.',
        ],
        es: [
          'Pasaporte vigente y copias de todas las páginas usadas',
          'El permiso nunca se expide por más tiempo del que el pasaporte siga vigente.',
        ],
      },
      {
        en: [
          'Recent criminal record from your country',
          'Apostilled and translated, plus a separate certificate from any country you have lived in recently.',
        ],
        pt: [
          'Certidão criminal recente do seu país',
          'Apostilada e traduzida, mais uma certidão separada de qualquer país onde você tenha vivido recentemente.',
        ],
        es: [
          'Antecedentes penales recientes de su país',
          'Apostillados y traducidos, más un certificado aparte de cualquier país donde haya vivido recientemente.',
        ],
      },
      {
        en: [
          'Employer bank guarantee for repatriation',
          'The company has to lodge a guarantee covering the cost of sending you home. It is the employer obligation, but the permit waits on it.',
        ],
        pt: [
          'Garantia bancária do empregador para repatriamento',
          'A empresa precisa depositar uma garantia que cubra o custo de mandar você de volta. A obrigação é do empregador, mas a permissão fica à espera dela.',
        ],
        es: [
          'Aval bancario del empleador para la repatriación',
          'La empresa debe depositar un aval que cubra el coste de enviarle de vuelta. La obligación es del empleador, pero el permiso queda a la espera.',
        ],
      },
      {
        en: [
          'Proof of housing with a stamped rental contract',
          'The same stamp duty rule as everywhere else in Cyprus: an unstamped lease is not accepted as proof of address.',
        ],
        pt: [
          'Comprovativo de habitação com contrato de aluguer selado',
          'A mesma regra de imposto de selo válida em todo o Chipre: um arrendamento sem selo não é aceite como comprovativo de morada.',
        ],
        es: [
          'Comprobante de vivienda con contrato de alquiler timbrado',
          'La misma regla del impuesto de timbre que rige en toda Chipre: un alquiler sin timbrar no se acepta como comprobante de domicilio.',
        ],
      },
    ],
    education: [
      {
        en: [
          'University degree or professional qualification',
          'Apostilled and translated into Greek or English. The highly skilled route depends on the qualification matching the post described in the contract.',
        ],
        pt: [
          'Diploma universitário ou qualificação profissional',
          'Apostilado e traduzido para grego ou inglês. A via de altamente qualificados depende de a qualificação corresponder ao posto descrito no contrato.',
        ],
        es: [
          'Título universitario o cualificación profesional',
          'Apostillado y traducido al griego o al inglés. La vía de altamente cualificados depende de que la cualificación corresponda al puesto descrito en el contrato.',
        ],
      },
      {
        en: [
          'Greek certificate that shortens the road to citizenship',
          'Not needed for the permit itself, but a recognised language certificate reduces the years of residence required for naturalisation. Starting early pays.',
        ],
        pt: [
          'Certificado de grego que encurta o caminho para a cidadania',
          'Não é preciso para a permissão em si, mas um certificado de língua reconhecido reduz os anos de residência exigidos para a naturalização. Começar cedo compensa.',
        ],
        es: [
          'Certificado de griego que acorta el camino a la ciudadanía',
          'No hace falta para el permiso en sí, pero un certificado de idioma reconocido reduce los años de residencia exigidos para la naturalización. Empezar pronto compensa.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Gross salary meeting the minimum for the route',
          'Highly skilled posts carry a minimum monthly gross figure that is revised from time to time. Check the level in force before signing anything.',
        ],
        pt: [
          'Salário bruto que atinge o mínimo da via escolhida',
          'Os postos altamente qualificados têm um valor bruto mensal mínimo revisto de tempos a tempos. Verifique o nível vigente antes de assinar qualquer coisa.',
        ],
        es: [
          'Salario bruto que alcanza el mínimo de la vía elegida',
          'Los puestos altamente cualificados tienen un importe bruto mensual mínimo que se revisa periódicamente. Compruebe el nivel vigente antes de firmar nada.',
        ],
      },
      {
        en: [
          'Registration with social insurance by the employer',
          'Enrolment in the social insurance services and the national health system starts with the employer and conditions your access to care.',
        ],
        pt: [
          'Inscrição na segurança social feita pelo empregador',
          'A inscrição nos serviços de segurança social e no sistema nacional de saúde começa pelo empregador e condiciona o seu acesso a cuidados.',
        ],
        es: [
          'Alta en la seguridad social a cargo del empleador',
          'El alta en los servicios de seguridad social y en el sistema nacional de salud parte del empleador y condiciona su acceso a la atención sanitaria.',
        ],
      },
      {
        en: [
          'Private cover until the national system starts',
          'Inpatient and outpatient care, accident and repatriation, for the gap before contributions give you access.',
        ],
        pt: [
          'Cobertura privada até o sistema nacional começar',
          'Internamento e ambulatório, acidente e repatriamento, para o intervalo antes de as contribuições lhe darem acesso.',
        ],
        es: [
          'Cobertura privada hasta que arranque el sistema nacional',
          'Hospitalización y ambulatorio, accidente y repatriación, para el intervalo previo a que las cotizaciones le den acceso.',
        ],
      },
      {
        en: [
          'Pay the permit and registration fees',
          'Charged per applicant, with a separate amount for each dependant added to the file.',
        ],
        pt: [
          'Pagar as taxas de permissão e de registo',
          'Cobradas por requerente, com um valor separado por cada dependente acrescentado ao processo.',
        ],
        es: [
          'Pagar las tasas de permiso y de registro',
          'Se cobran por solicitante, con un importe aparte por cada dependiente añadido al expediente.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Employer files the application in Nicosia',
          'The company, not you, lodges the file at the Migration Department. You cannot apply for yourself under this category.',
        ],
        pt: [
          'O empregador protocola o pedido em Nicósia',
          'A empresa, e não você, entrega o processo no Departamento de Migração. Nesta categoria você não pode pedir por conta própria.',
        ],
        es: [
          'El empleador presenta la solicitud en Nicosia',
          'La empresa, no usted, entrega el expediente en el Departamento de Migración. En esta categoría no puede solicitar por su cuenta.',
        ],
      },
      {
        en: [
          'Advertise the post through the public employment service',
          'Required outside the facilitated route: the vacancy must be published and no suitable local or European candidate found before a third-country national is hired.',
        ],
        pt: [
          'Divulgar a vaga pelo serviço público de emprego',
          'Exigido fora da via facilitada: a vaga precisa ser publicada e nenhum candidato local ou europeu adequado encontrado antes de contratar alguém de país terceiro.',
        ],
        es: [
          'Publicar el puesto por el servicio público de empleo',
          'Exigido fuera de la vía facilitada: la vacante debe publicarse y no hallarse ningún candidato local o europeo adecuado antes de contratar a alguien de un tercer país.',
        ],
      },
      {
        en: [
          'Enter only after the entry permit is issued',
          'Arriving as a tourist and switching status from inside is not the intended path and is refused more often than not.',
        ],
        pt: [
          'Entrar apenas depois de emitida a autorização de entrada',
          'Chegar como turista e mudar de estatuto de dentro não é o caminho previsto e é recusado na maior parte das vezes.',
        ],
        es: [
          'Entrar solo después de expedirse el permiso de entrada',
          'Llegar como turista y cambiar de estatus desde dentro no es el camino previsto y se deniega la mayoría de las veces.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical tests carried out in Cyprus',
          'Blood tests and a chest X-ray at an approved laboratory, submitted with the file and repeated at every renewal.',
        ],
        pt: [
          'Exames médicos realizados no Chipre',
          'Análises de sangue e radiografia de tórax em laboratório aprovado, entregues com o processo e repetidos em cada renovação.',
        ],
        es: [
          'Pruebas médicas realizadas en Chipre',
          'Análisis de sangre y radiografía de tórax en un laboratorio autorizado, entregados con el expediente y repetidos en cada renovación.',
        ],
      },
      {
        en: [
          'Biometrics and the alien registration number',
          'Fingerprints, photograph and the registration number that identifies you in every public system on the island.',
        ],
        pt: [
          'Biometria e o número de registo de estrangeiro',
          'Impressões digitais, fotografia e o número de registo que identifica você em todos os sistemas públicos da ilha.',
        ],
        es: [
          'Biometría y el número de registro de extranjero',
          'Huellas, fotografía y el número de registro que le identifica en todos los sistemas públicos de la isla.',
        ],
      },
      {
        en: [
          'Register with a personal doctor once covered',
          'Access to the national health system runs through a personal doctor you choose and register with online.',
        ],
        pt: [
          'Registar-se num médico pessoal assim que tiver cobertura',
          'O acesso ao sistema nacional de saúde passa por um médico pessoal que você escolhe e regista online.',
        ],
        es: [
          'Registrarse con un médico personal al tener cobertura',
          'El acceso al sistema nacional de salud pasa por un médico personal que usted elige y registra en línea.',
        ],
        priority: 2,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the residence and employment card',
          'Check the employer name printed on it: the permit authorises that job and no other.',
        ],
        pt: [
          'Retirar o cartão de residência e trabalho',
          'Confira o nome do empregador impresso nele: a permissão autoriza aquele emprego e nenhum outro.',
        ],
        es: [
          'Recoger la tarjeta de residencia y empleo',
          'Revise el nombre del empleador impreso en ella: el permiso autoriza ese empleo y ningún otro.',
        ],
      },
      {
        en: [
          'Get a new permit before changing employer',
          'Changing company or role without a new permit makes your stay irregular from the first day in the new job.',
        ],
        pt: [
          'Obter nova permissão antes de trocar de empregador',
          'Mudar de empresa ou de função sem nova permissão torna a sua estada irregular já no primeiro dia do novo emprego.',
        ],
        es: [
          'Obtener un nuevo permiso antes de cambiar de empleador',
          'Cambiar de empresa o de función sin un nuevo permiso hace irregular su estancia desde el primer día en el nuevo empleo.',
        ],
      },
      {
        en: [
          'Start the renewal months before expiry',
          'Renewals require fresh medical tests and a fresh criminal record, and the queue at the department is long.',
        ],
        pt: [
          'Iniciar a renovação meses antes do vencimento',
          'As renovações exigem novos exames médicos e nova certidão criminal, e a fila no departamento é longa.',
        ],
        es: [
          'Iniciar la renovación meses antes del vencimiento',
          'Las renovaciones exigen nuevas pruebas médicas y nuevos antecedentes penales, y la cola en el departamento es larga.',
        ],
      },
      {
        en: [
          'Track the years towards long-term resident status',
          'Continuous legal employment can lead to long-term residence, and the highly skilled route has its own shortened path to naturalisation.',
        ],
        pt: [
          'Acompanhar os anos rumo ao estatuto de residente de longa duração',
          'O emprego legal contínuo pode levar à residência de longa duração, e a via de altamente qualificados tem o seu próprio caminho encurtado para a naturalização.',
        ],
        es: [
          'Seguir los años hacia el estatuto de residente de larga duración',
          'El empleo legal continuo puede llevar a la residencia de larga duración, y la vía de altamente cualificados tiene su propio camino acortado a la naturalización.',
        ],
        priority: 2,
      },
    ],
  },

  'Permanent Residence by Investment': {
    core_documents: [
      {
        en: [
          'Choose one of the permitted investment categories',
          'New residential property bought from a developer, commercial property, share capital of a Cypriot company with staff, or units in a Cypriot investment fund. The category fixes every other condition.',
        ],
        pt: [
          'Escolher uma das categorias de investimento permitidas',
          'Imóvel residencial novo comprado a um promotor, imóvel comercial, capital social de empresa cipriota com pessoal, ou unidades de um fundo de investimento cipriota. A categoria fixa todas as outras condições.',
        ],
        es: [
          'Elegir una de las categorías de inversión permitidas',
          'Vivienda nueva comprada a un promotor, inmueble comercial, capital social de una empresa chipriota con empleados, o participaciones en un fondo de inversión chipriota. La categoría fija todas las demás condiciones.',
        ],
      },
      {
        en: [
          'Contract of sale deposited at the Land Registry',
          'The contract has to be stamped and lodged with the registry. Until it is deposited, the investment does not count for the application.',
        ],
        pt: [
          'Contrato de compra e venda depositado no Registo Predial',
          'O contrato precisa ser selado e depositado no registo. Enquanto não for depositado, o investimento não conta para o pedido.',
        ],
        es: [
          'Contrato de compraventa depositado en el Registro de la Propiedad',
          'El contrato debe timbrarse y depositarse en el registro. Mientras no se deposite, la inversión no cuenta para la solicitud.',
        ],
      },
      {
        en: [
          'Valid passports for the whole family',
          'Copies of every page for the applicant, the spouse and each dependant included in the file.',
        ],
        pt: [
          'Passaportes válidos de toda a família',
          'Cópias de todas as páginas do requerente, do cônjuge e de cada dependente incluído no processo.',
        ],
        es: [
          'Pasaportes vigentes de toda la familia',
          'Copias de todas las páginas del solicitante, del cónyuge y de cada dependiente incluido en el expediente.',
        ],
      },
      {
        en: [
          'Marriage and birth certificates, apostilled',
          'With certified translations into Greek or English for every family member added to the application.',
        ],
        pt: [
          'Certidões de casamento e nascimento, apostiladas',
          'Com traduções certificadas para grego ou inglês para cada familiar acrescentado ao pedido.',
        ],
        es: [
          'Certificados de matrimonio y nacimiento, apostillados',
          'Con traducciones certificadas al griego o al inglés para cada familiar añadido a la solicitud.',
        ],
      },
      {
        en: [
          'Clean record for the applicant and the spouse',
          'From the country of origin and of residence. A record, or appearing on a sanctions list, ends the application immediately.',
        ],
        pt: [
          'Ficha limpa do requerente e do cônjuge',
          'Do país de origem e de residência. Antecedentes, ou constar de uma lista de sanções, encerram o pedido de imediato.',
        ],
        es: [
          'Historial limpio del solicitante y del cónyuge',
          'Del país de origen y de residencia. Un antecedente, o figurar en una lista de sanciones, termina la solicitud de inmediato.',
        ],
      },
      {
        en: [
          'Documented source of the invested funds',
          'The money must be transferred from abroad, from the applicant own account, into a Cypriot bank, and its origin explained in full.',
        ],
        pt: [
          'Origem documentada dos fundos investidos',
          'O dinheiro precisa ser transferido do exterior, da conta do próprio requerente, para um banco cipriota, e a sua origem explicada por inteiro.',
        ],
        es: [
          'Origen documentado de los fondos invertidos',
          'El dinero debe transferirse desde el extranjero, desde la cuenta del propio solicitante, a un banco chipriota, y su origen explicarse por completo.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Secured annual income earned abroad',
          'A fixed annual income from sources outside Cyprus, increased for the spouse and for each dependant. The amounts changed with the 2023 reform, so confirm the current ones.',
        ],
        pt: [
          'Rendimento anual assegurado obtido no exterior',
          'Um rendimento anual fixo de fontes fora do Chipre, aumentado por cônjuge e por cada dependente. Os valores mudaram com a reforma de 2023, então confirme os atuais.',
        ],
        es: [
          'Renta anual asegurada obtenida en el extranjero',
          'Una renta anual fija de fuentes fuera de Chipre, aumentada por cónyuge y por cada dependiente. Los importes cambiaron con la reforma de 2023, así que confirme los actuales.',
        ],
      },
      {
        en: [
          'Proof that the investment is fully paid',
          'Bank transfers matching the contract. Instalments still owed to the developer do not satisfy the requirement.',
        ],
        pt: [
          'Prova de que o investimento está integralmente pago',
          'Transferências bancárias coerentes com o contrato. Parcelas ainda devidas ao promotor não cumprem o requisito.',
        ],
        es: [
          'Prueba de que la inversión está totalmente pagada',
          'Transferencias bancarias acordes con el contrato. Los plazos aún pendientes con el promotor no cumplen el requisito.',
        ],
      },
      {
        en: [
          'Health insurance for every person in the file',
          'Private cover for the whole family, renewed annually for as long as the status lasts.',
        ],
        pt: [
          'Seguro de saúde para cada pessoa do processo',
          'Cobertura privada para toda a família, renovada anualmente enquanto o estatuto durar.',
        ],
        es: [
          'Seguro de salud para cada persona del expediente',
          'Cobertura privada para toda la familia, renovada anualmente mientras dure el estatuto.',
        ],
      },
      {
        en: [
          'Pay the application and card fees per person',
          'Charged individually, including for the children included in the same application.',
        ],
        pt: [
          'Pagar as taxas de pedido e de cartão por pessoa',
          'Cobradas individualmente, inclusive pelos filhos incluídos no mesmo pedido.',
        ],
        es: [
          'Pagar las tasas de solicitud y de tarjeta por persona',
          'Se cobran individualmente, incluidos los hijos incluidos en la misma solicitud.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File under the fast-track regulation in Nicosia',
          'The accelerated route has its own checklist and a target decision time, which only begins once the file is genuinely complete.',
        ],
        pt: [
          'Protocolar pela via acelerada em Nicósia',
          'A via acelerada tem a sua própria lista de verificação e um prazo-alvo de decisão, que só começa quando o processo está realmente completo.',
        ],
        es: [
          'Presentar por la vía acelerada en Nicosia',
          'La vía acelerada tiene su propia lista de verificación y un plazo objetivo de decisión, que solo empieza cuando el expediente está realmente completo.',
        ],
      },
      {
        en: [
          'Treat older information about the scheme with caution',
          'The rules were rewritten in 2023 and the separate citizenship-by-investment programme was abolished in 2020. Anything written before then describes a scheme that no longer exists.',
        ],
        pt: [
          'Tratar com cautela informações antigas sobre o regime',
          'As regras foram reescritas em 2023 e o programa separado de cidadania por investimento foi encerrado em 2020. Tudo o que foi escrito antes disso descreve um regime que já não existe.',
        ],
        es: [
          'Tratar con cautela la información antigua sobre el régimen',
          'Las normas se reescribieron en 2023 y el programa aparte de ciudadanía por inversión se abolió en 2020. Todo lo escrito antes describe un régimen que ya no existe.',
        ],
      },
      {
        en: [
          'Include dependants in the same application',
          'Adult children in full-time education up to a cut-off age and dependent parents can be added, each one raising the income required.',
        ],
        pt: [
          'Incluir os dependentes no mesmo pedido',
          'Filhos adultos em estudo a tempo inteiro até uma idade limite e pais dependentes podem ser acrescentados, cada um elevando o rendimento exigido.',
        ],
        es: [
          'Incluir a los dependientes en la misma solicitud',
          'Los hijos adultos en estudios a tiempo completo hasta una edad límite y los padres dependientes pueden añadirse, y cada uno eleva la renta exigida.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Attend in person for the biometric appointment',
          'Every applicant above the age threshold has to appear. A lawyer or agent cannot do this part on your behalf.',
        ],
        pt: [
          'Comparecer pessoalmente ao atendimento biométrico',
          'Todo requerente acima da idade limite precisa comparecer. Um advogado ou representante não pode fazer esta parte por você.',
        ],
        es: [
          'Acudir en persona a la cita biométrica',
          'Todo solicitante por encima de la edad límite debe comparecer. Un abogado o representante no puede hacer esta parte por usted.',
        ],
      },
      {
        en: [
          'Medical certificates where they are required',
          'Health checks are asked of applicants who will spend long periods on the island, and insurance has to be in place regardless.',
        ],
        pt: [
          'Atestados médicos quando forem exigidos',
          'Exames de saúde são pedidos a requerentes que vão passar períodos longos na ilha, e o seguro precisa existir de qualquer forma.',
        ],
        es: [
          'Certificados médicos cuando se exijan',
          'Se piden reconocimientos a los solicitantes que pasarán periodos largos en la isla, y el seguro debe existir en cualquier caso.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Visit Cyprus at least once every two years',
          'The status is cancelled if you do not set foot in the country within that period, which catches investors who never intended to live here.',
        ],
        pt: [
          'Visitar o Chipre pelo menos uma vez a cada dois anos',
          'O estatuto é cancelado se você não pisar no país dentro desse período, o que apanha investidores que nunca pretenderam morar aqui.',
        ],
        es: [
          'Visitar Chipre al menos una vez cada dos años',
          'El estatuto se cancela si no pisa el país dentro de ese periodo, lo que sorprende a inversores que nunca pensaron vivir aquí.',
        ],
      },
      {
        en: [
          'Submit the annual proof that everything is retained',
          'Each year you must show the investment is still held, the income still received, the insurance still valid and the record still clean. Missing it cancels the permit.',
        ],
        pt: [
          'Entregar a prova anual de que tudo se mantém',
          'A cada ano você precisa mostrar que o investimento continua detido, o rendimento continua a entrar, o seguro continua válido e a ficha continua limpa. Falhar cancela a permissão.',
        ],
        es: [
          'Presentar la prueba anual de que todo se mantiene',
          'Cada año debe demostrar que la inversión sigue en su poder, la renta sigue entrando, el seguro sigue vigente y el historial sigue limpio. Omitirlo cancela el permiso.',
        ],
      },
      {
        en: [
          'Do not take employment in Cyprus',
          'The applicant and the spouse may not be employed locally. Being a director of the company invested in, and drawing dividends, is the exception.',
        ],
        pt: [
          'Não aceitar emprego no Chipre',
          'O requerente e o cônjuge não podem ser empregados localmente. Ser administrador da empresa em que investiram, e receber dividendos, é a exceção.',
        ],
        es: [
          'No aceptar empleo en Chipre',
          'El solicitante y el cónyuge no pueden estar empleados localmente. Ser administrador de la empresa en la que invirtieron, y cobrar dividendos, es la excepción.',
        ],
      },
      {
        en: [
          'Get an alien registration certificate for each holder',
          'Every family member receives their own, and it is what banks, schools and hospitals ask for.',
        ],
        pt: [
          'Obter um certificado de registo de estrangeiro para cada titular',
          'Cada familiar recebe o seu, e é ele que bancos, escolas e hospitais pedem.',
        ],
        es: [
          'Obtener un certificado de registro de extranjero por titular',
          'Cada familiar recibe el suyo, y es lo que piden bancos, colegios y hospitales.',
        ],
      },
      {
        en: [
          'Keep residence and citizenship apart in your plan',
          'Permanent residence does not lead to a passport on its own. Naturalisation still requires years of actual physical presence and Greek language.',
        ],
        pt: [
          'Manter residência e cidadania separadas no seu plano',
          'A residência permanente não leva, por si só, a um passaporte. A naturalização continua a exigir anos de presença física real e a língua grega.',
        ],
        es: [
          'Mantener residencia y ciudadanía separadas en su plan',
          'La residencia permanente no conduce por sí sola a un pasaporte. La naturalización sigue exigiendo años de presencia física real y el idioma griego.',
        ],
      },
    ],
  },
};
