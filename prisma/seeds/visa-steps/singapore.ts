import type { CountryVisaSteps } from './types';

/**
 * Steps for Singapore.
 *
 * The candidate almost never files anything. Visit visas are lodged by a local
 * sponsor or an authorised agent, and every work pass is applied for by the
 * Singapore employer — someone waiting for a portal where they can submit their
 * own case will wait forever.
 *
 * The Employment Pass is decided by two moving parts rather than by documents:
 * a qualifying salary that rises with the applicant’s age, and COMPASS, a points
 * system that also scores the employer’s nationality mix and its share of local
 * staff. A perfectly qualified candidate can be refused because of the company.
 *
 * Nothing is stamped in the passport. The electronic pass sent by email is the
 * only record of how long you may stay, and after approval the medical
 * examination and the identity card are separate steps with their own deadlines.
 */
export const singapore: CountryVisaSteps = {
  'Visitor / Social / Business Visa': {
    core_documents: [
      {
        en: [
          'Passport valid for at least six months',
          'Checked at the checkpoint, not only at the visa stage; entry is refused on short validity even with a valid visa.',
        ],
        pt: [
          'Passaporte com validade mínima de seis meses',
          'Conferido no posto de fronteira, não só na etapa do visto; a entrada é recusada com validade curta mesmo com visto válido.',
        ],
        es: [
          'Pasaporte con al menos seis meses de vigencia',
          'Se comprueba en el puesto fronterizo, no solo en la etapa del visado; deniegan la entrada con vigencia corta aunque el visado esté vigente.',
        ],
      },
      {
        en: [
          'Confirm whether your nationality needs a visa at all',
          'Most passports enter without one. Only a defined list of nationalities applies in advance, and applying when you do not need to wastes weeks.',
        ],
        pt: [
          'Confirmar se sua nacionalidade realmente precisa de visto',
          'A maioria dos passaportes entra sem visto. Só uma lista definida de nacionalidades pede com antecedência, e pedir sem precisar desperdiça semanas.',
        ],
        es: [
          'Confirmar si su nacionalidad realmente necesita visado',
          'La mayoría de los pasaportes entra sin visado. Solo una lista definida de nacionalidades lo solicita con antelación, y hacerlo sin necesidad desperdicia semanas.',
        ],
      },
      {
        en: [
          'Local sponsor or authorised visa agent',
          'The traveller does not file the application. A Singapore citizen, resident, registered company or an authorised agent lodges it on your behalf.',
        ],
        pt: [
          'Patrocinador local ou agente de vistos autorizado',
          'O viajante não protocola o pedido. Um cidadão, residente, empresa registada em Singapura ou um agente autorizado o faz em seu nome.',
        ],
        es: [
          'Patrocinador local o agente de visados autorizado',
          'El viajero no presenta la solicitud. Un ciudadano, residente, empresa registrada en Singapur o un agente autorizado la presenta en su nombre.',
        ],
      },
      {
        en: [
          'Recent photograph in the immigration authority format',
          'White background and taken within the last three months; the online system rejects files that miss the size or format rules.',
        ],
        pt: [
          'Fotografia recente no formato da autoridade de imigração',
          'Fundo branco e tirada nos últimos três meses; o sistema online rejeita arquivos fora das regras de tamanho ou formato.',
        ],
        es: [
          'Fotografía reciente en el formato de la autoridad de inmigración',
          'Fondo blanco y tomada en los últimos tres meses; el sistema en línea rechaza archivos que incumplen el tamaño o el formato.',
        ],
      },
      {
        en: [
          'Return or onward ticket with accommodation details',
          'Asked for at the checkpoint as often as at the visa stage; a one-way ticket without an explanation invites secondary questioning.',
        ],
        pt: [
          'Passagem de volta ou de continuação com dados do alojamento',
          'Pedidos no posto de fronteira tanto quanto na etapa do visto; passagem só de ida sem explicação leva a entrevista adicional.',
        ],
        es: [
          'Billete de regreso o de continuación con datos del alojamiento',
          'Se piden en el puesto fronterizo tanto como en la etapa del visado; un billete de solo ida sin explicación lleva a un interrogatorio adicional.',
        ],
      },
      {
        en: [
          'Letter of introduction for a business visit',
          'From the Singapore company you are meeting, stating the purpose, the dates and who covers the costs.',
        ],
        pt: [
          'Carta de apresentação para visita de negócios',
          'Da empresa em Singapura que vai recebê-lo, indicando o propósito, as datas e quem custeia as despesas.',
        ],
        es: [
          'Carta de presentación para una visita de negocios',
          'De la empresa en Singapur que le recibe, indicando el propósito, las fechas y quién cubre los gastos.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of funds for the length of the visit',
          'Bank statements consistent with the dates and the standard of the trip you describe.',
        ],
        pt: [
          'Comprovação de recursos para a duração da visita',
          'Extratos bancários coerentes com as datas e com o padrão da viagem que você descreve.',
        ],
        es: [
          'Prueba de fondos para la duración de la visita',
          'Extractos bancarios coherentes con las fechas y con el nivel del viaje que describe.',
        ],
      },
      {
        en: [
          'Evidence of employment or business ties at home',
          'The officer is deciding whether you will leave. Ties weigh more than the balance in the account.',
        ],
        pt: [
          'Comprovação de vínculo de trabalho ou de negócio no país de origem',
          'O agente está decidindo se você vai embora. Os vínculos pesam mais do que o saldo na conta.',
        ],
        es: [
          'Prueba de vínculos laborales o empresariales en su país',
          'El agente decide si usted se marchará. Los vínculos pesan más que el saldo de la cuenta.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Submission through the immigration electronic service',
          'Your sponsor or agent files it online. There is no public counter where a tourist can lodge a visa application in person.',
        ],
        pt: [
          'Envio pelo serviço eletrônico da imigração',
          'O patrocinador ou agente protocola online. Não existe guichê público onde um turista possa entregar o pedido pessoalmente.',
        ],
        es: [
          'Presentación por el servicio electrónico de inmigración',
          'Su patrocinador o agente lo presenta en línea. No hay ventanilla pública donde un turista pueda entregar la solicitud en persona.',
        ],
      },
      {
        en: [
          'Pay the visa processing fee',
          'Charged per applicant and not refunded on refusal. Confirm the current amount before paying, as agents add their own service charge.',
        ],
        pt: [
          'Pagar a taxa de processamento do visto',
          'Cobrada por requerente e não devolvida em caso de indeferimento. Confirme o valor vigente antes de pagar, pois agentes somam a própria taxa de serviço.',
        ],
        es: [
          'Pagar la tasa de tramitación del visado',
          'Se cobra por solicitante y no se devuelve si deniegan. Confirme el importe vigente antes de pagar, porque los agentes suman su propia comisión.',
        ],
      },
      {
        en: [
          'Allow a few working days for the outcome',
          'Straightforward files are decided quickly; anything referred for further checks takes considerably longer, so do not book flights around the fast case.',
        ],
        pt: [
          'Prever alguns dias úteis para o resultado',
          'Casos simples saem rápido; qualquer um encaminhado para verificação demora bem mais, então não compre passagens contando com o cenário rápido.',
        ],
        es: [
          'Prever unos días hábiles para la resolución',
          'Los casos sencillos se resuelven rápido; los que pasan a verificación tardan bastante más, así que no compre vuelos contando con el caso rápido.',
        ],
      },
      {
        en: [
          'Understand that the visa is not permission to enter',
          'It only lets you present yourself at the border. The officer at the checkpoint decides whether you enter and for how long.',
        ],
        pt: [
          'Entender que o visto não é autorização de entrada',
          'Ele só permite que você se apresente na fronteira. O agente no posto decide se você entra e por quanto tempo.',
        ],
        es: [
          'Entender que el visado no es permiso de entrada',
          'Solo le permite presentarse en la frontera. El agente del puesto decide si entra y por cuánto tiempo.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Yellow fever certificate when arriving from a risk area',
          'Demanded on arrival from listed countries, including transits above a certain length. Without it you can be quarantined at your own cost.',
        ],
        pt: [
          'Certificado de febre amarela ao chegar de área de risco',
          'Exigido na chegada vindo de países listados, inclusive em conexões acima de certa duração. Sem ele você pode ser posto em quarentena às próprias custas.',
        ],
        es: [
          'Certificado de fiebre amarilla al llegar desde una zona de riesgo',
          'Se exige a la llegada desde países listados, incluidas escalas por encima de cierta duración. Sin él pueden ponerle en cuarentena a su costa.',
        ],
      },
      {
        en: [
          'Travel health insurance for the whole trip',
          'Not compulsory, but visitors pay unsubsidised hospital rates, which are among the highest in the region.',
        ],
        pt: [
          'Seguro de saúde de viagem para toda a estada',
          'Não é obrigatório, mas visitantes pagam tarifas hospitalares sem subsídio, das mais altas da região.',
        ],
        es: [
          'Seguro médico de viaje para todo el trayecto',
          'No es obligatorio, pero los visitantes pagan tarifas hospitalarias sin subsidio, de las más altas de la región.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'File the arrival card in the days before you fly',
          'Submitted online within a short window before arrival by every traveller, including visa-free ones, with a health declaration attached.',
        ],
        pt: [
          'Preencher o cartão de chegada nos dias anteriores ao voo',
          'Enviado online numa janela curta antes da chegada por todos os viajantes, inclusive os isentos de visto, com declaração de saúde anexada.',
        ],
        es: [
          'Presentar la tarjeta de llegada en los días previos al vuelo',
          'Se envía en línea en una ventana corta antes de llegar, por todos los viajeros, incluidos los exentos de visado, con una declaración de salud adjunta.',
        ],
      },
      {
        en: [
          'Read the electronic visit pass sent to your email',
          'Passports are no longer stamped. That email is the only record of the period of stay you were granted, and nobody will remind you of it.',
        ],
        pt: [
          'Ler o passe de visita eletrônico enviado ao seu e-mail',
          'Os passaportes já não são carimbados. Esse e-mail é o único registo do período de permanência concedido, e ninguém vai lembrá-lo dele.',
        ],
        es: [
          'Leer el pase de visita electrónico enviado a su correo',
          'Ya no se sella el pasaporte. Ese correo es el único registro del periodo de estancia concedido, y nadie se lo va a recordar.',
        ],
      },
      {
        en: [
          'Request an extension of stay before the pass expires',
          'Applied for online and granted at discretion, never automatically. Plan the trip so that a refusal does not strand you.',
        ],
        pt: [
          'Pedir a prorrogação da estada antes de o passe vencer',
          'Solicitada online e concedida por decisão discricionária, nunca automática. Planeje a viagem para que um indeferimento não o deixe preso.',
        ],
        es: [
          'Solicitar la prórroga de la estancia antes de que venza el pase',
          'Se pide en línea y se concede de forma discrecional, nunca automática. Planifique el viaje para que una denegación no le deje atrapado.',
        ],
      },
      {
        en: [
          'Do no paid work while holding a visit pass',
          'Even a few days of work for a local client needs a work pass or a filed exemption, and the penalties fall on the company as well as on you.',
        ],
        pt: [
          'Não exercer trabalho remunerado com passe de visita',
          'Mesmo poucos dias de trabalho para um cliente local exigem passe de trabalho ou isenção protocolada, e as penalidades atingem a empresa junto com você.',
        ],
        es: [
          'No realizar trabajo remunerado con un pase de visita',
          'Incluso unos pocos días de trabajo para un cliente local exigen un pase de trabajo o una exención presentada, y las sanciones alcanzan también a la empresa.',
        ],
      },
      {
        en: [
          'Never overstay, not even by a single day',
          'Overstaying brings fines, possible imprisonment and a lasting bar on returning; there is no informal grace period.',
        ],
        pt: [
          'Nunca ultrapassar o prazo, nem por um único dia',
          'Ultrapassar gera multas, possível prisão e um impedimento duradouro de voltar; não existe tolerância informal.',
        ],
        es: [
          'Nunca sobrepasar el plazo, ni por un solo día',
          'Sobrepasarlo acarrea multas, posible prisión y una prohibición duradera de regresar; no hay periodo de gracia informal.',
        ],
      },
    ],
  },

  'Work Passes (Employment Pass, S Pass, Work Permit)': {
    core_documents: [
      {
        en: [
          'Passport valid well beyond the pass period',
          'The pass cannot be issued for longer than the passport allows, which quietly shortens a two-year approval to a few months.',
        ],
        pt: [
          'Passaporte válido bem além do período do passe',
          'O passe não pode ser emitido por prazo maior do que o passaporte permite, o que silenciosamente encurta uma aprovação de dois anos para poucos meses.',
        ],
        es: [
          'Pasaporte vigente mucho más allá del periodo del pase',
          'El pase no puede emitirse por más tiempo del que permite el pasaporte, lo que reduce en silencio una aprobación de dos años a unos meses.',
        ],
      },
      {
        en: [
          'The employer lodges the application, not the candidate',
          'There is no route for an individual to apply for an Employment Pass, S Pass or Work Permit alone. A registered Singapore employer or an appointed employment agent files it.',
        ],
        pt: [
          'O empregador protocola o pedido, não o candidato',
          'Não existe caminho para um indivíduo pedir sozinho um Employment Pass, S Pass ou Work Permit. Um empregador registado em Singapura ou uma agência de emprego designada é quem protocola.',
        ],
        es: [
          'El empleador presenta la solicitud, no el candidato',
          'No hay vía para que un individuo solicite por su cuenta un Employment Pass, S Pass o Work Permit. Lo presenta un empleador registrado en Singapur o una agencia de empleo designada.',
        ],
      },
      {
        en: [
          'Signed employment contract or letter of offer',
          'Job title, fixed monthly salary and start date must match exactly what the employer declares in the application; a later correction means a fresh filing.',
        ],
        pt: [
          'Contrato de trabalho assinado ou carta de oferta',
          'Cargo, salário mensal fixo e data de início têm de bater exatamente com o que o empregador declara no pedido; corrigir depois significa protocolar de novo.',
        ],
        es: [
          'Contrato de trabajo firmado o carta de oferta',
          'Puesto, salario mensual fijo y fecha de inicio deben coincidir exactamente con lo que declara el empleador; corregirlo después implica presentar de nuevo.',
        ],
      },
      {
        en: [
          'Job advertised to residents before the application',
          'Under the fair consideration rules the role must be posted on the national jobs portal for a minimum period before an Employment Pass is filed. Exemptions are narrow and are checked.',
        ],
        pt: [
          'Vaga anunciada a residentes antes do pedido',
          'Pelas regras de consideração justa, a vaga precisa ficar publicada no portal nacional de empregos por um período mínimo antes de se protocolar o Employment Pass. As isenções são estreitas e são verificadas.',
        ],
        es: [
          'Puesto anunciado a residentes antes de la solicitud',
          'Según las reglas de consideración justa, el puesto debe publicarse en el portal nacional de empleo por un periodo mínimo antes de presentar el Employment Pass. Las exenciones son estrechas y se comprueban.',
        ],
      },
      {
        en: [
          'Personal particulars form and digital photograph',
          'Full residential and employment history with no unexplained gaps, plus a photograph in the ministry format.',
        ],
        pt: [
          'Formulário de dados pessoais e fotografia digital',
          'Histórico completo de moradia e de emprego sem lacunas inexplicadas, além de fotografia no formato do ministério.',
        ],
        es: [
          'Formulario de datos personales y fotografía digital',
          'Historial completo de domicilios y de empleo sin lagunas inexplicadas, además de una fotografía en el formato del ministerio.',
        ],
      },
      {
        en: [
          'Check the company quota and the sector rules',
          'S Pass and Work Permit numbers are capped per company by a dependency ratio ceiling, and Work Permits add source-country and sector restrictions. A hire can be blocked purely by the employer’s headcount mix.',
        ],
        pt: [
          'Verificar a cota da empresa e as regras do setor',
          'S Pass e Work Permit têm teto por empresa pela razão de dependência, e o Work Permit ainda soma restrições de país de origem e de setor. Uma contratação pode ser barrada só pela composição do quadro do empregador.',
        ],
        es: [
          'Comprobar el cupo de la empresa y las reglas del sector',
          'El S Pass y el Work Permit tienen tope por empresa según el ratio de dependencia, y el Work Permit añade restricciones de país de origen y de sector. Una contratación puede bloquearse solo por la composición de la plantilla.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Degree verified by an approved screening provider',
          'Qualifications from many institutions must be checked by a third-party verification service. It takes weeks and is routinely started far too late.',
        ],
        pt: [
          'Diploma verificado por prestador de checagem aprovado',
          'Qualificações de muitas instituições precisam ser conferidas por um serviço de verificação terceirizado. Leva semanas e quase sempre é iniciado tarde demais.',
        ],
        es: [
          'Título verificado por un proveedor de comprobación aprobado',
          'Las titulaciones de muchas instituciones deben ser verificadas por un servicio externo. Tarda semanas y casi siempre se inicia demasiado tarde.',
        ],
      },
      {
        en: [
          'Curriculum vitae with a continuous employment history',
          'Gaps and overlapping dates trigger requests for clarification that add weeks; explain career breaks in the file itself.',
        ],
        pt: [
          'Currículo com histórico de emprego contínuo',
          'Lacunas e datas sobrepostas geram pedidos de esclarecimento que somam semanas; explique interrupções de carreira no próprio dossiê.',
        ],
        es: [
          'Currículum con un historial laboral continuo',
          'Las lagunas y las fechas solapadas provocan solicitudes de aclaración que suman semanas; explique las pausas de carrera en el propio expediente.',
        ],
      },
      {
        en: [
          'Professional registration for a regulated occupation',
          'Doctors, lawyers, engineers and teachers clear their sector regulator first. The pass follows the licence, not the other way round.',
        ],
        pt: [
          'Registo profissional em ocupação regulamentada',
          'Médicos, advogados, engenheiros e professores passam antes pelo órgão regulador do setor. O passe vem depois da licença, não o contrário.',
        ],
        es: [
          'Colegiación profesional en una ocupación regulada',
          'Médicos, abogados, ingenieros y docentes pasan primero por su regulador sectorial. El pase sigue a la licencia, no al revés.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Meet the qualifying salary set for your age',
          'The Employment Pass floor rises with the applicant’s age, so the same job clears it for someone in their twenties and fails for someone in their forties. Confirm the figure in force at the time of filing.',
        ],
        pt: [
          'Atingir o piso salarial definido para a sua idade',
          'O piso do Employment Pass sobe com a idade do candidato, então a mesma vaga passa para alguém de vinte e poucos anos e reprova para alguém de quarenta. Confirme o valor vigente na data do protocolo.',
        ],
        es: [
          'Alcanzar el salario mínimo fijado para su edad',
          'El umbral del Employment Pass sube con la edad del solicitante, así que el mismo puesto lo supera alguien de veintipocos y lo incumple alguien de cuarenta. Confirme la cifra vigente al presentar.',
        ],
      },
      {
        en: [
          'Score enough points under the COMPASS framework',
          'Points come from salary and qualifications, but also from how many nationalities the firm employs and its share of local staff. Your application can fail on your employer’s profile rather than yours.',
        ],
        pt: [
          'Somar pontos suficientes no sistema COMPASS',
          'Os pontos vêm de salário e qualificação, mas também de quantas nacionalidades a empresa emprega e da proporção de quadro local. Seu pedido pode cair pelo perfil do empregador, não pelo seu.',
        ],
        es: [
          'Sumar suficientes puntos en el sistema COMPASS',
          'Los puntos vienen del salario y la titulación, pero también de cuántas nacionalidades emplea la empresa y de su proporción de personal local. Su solicitud puede caer por el perfil del empleador, no por el suyo.',
        ],
      },
      {
        en: [
          'Employer pays the monthly levy where it applies',
          'S Pass and Work Permit carry a levy per worker, rising with the proportion of foreign staff. Passing that cost to the employee is an offence.',
        ],
        pt: [
          'Empregador paga a taxa mensal quando aplicável',
          'S Pass e Work Permit têm uma taxa por trabalhador, que sobe conforme a proporção de estrangeiros no quadro. Repassar esse custo ao empregado é infração.',
        ],
        es: [
          'El empleador paga la tasa mensual cuando corresponde',
          'El S Pass y el Work Permit conllevan una tasa por trabajador, que sube según la proporción de personal extranjero. Trasladar ese coste al empleado es una infracción.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Employer submits through the ministry online system',
          'Filed in the manpower ministry portal; the candidate never receives a login and depends on the employer for every update.',
        ],
        pt: [
          'Empregador envia pelo sistema online do ministério',
          'Protocolado no portal do ministério do trabalho; o candidato nunca recebe acesso e depende do empregador para cada atualização.',
        ],
        es: [
          'El empleador presenta por el sistema en línea del ministerio',
          'Se presenta en el portal del ministerio de trabajo; el candidato nunca recibe acceso y depende del empleador para cada actualización.',
        ],
      },
      {
        en: [
          'Pay the application fee and later the issuance fee',
          'Two separate charges: one to lodge the case and another when the pass is actually issued. Budget for both and check current rates.',
        ],
        pt: [
          'Pagar a taxa de pedido e depois a taxa de emissão',
          'São duas cobranças distintas: uma para protocolar o caso e outra quando o passe é de fato emitido. Preveja ambas e confira os valores vigentes.',
        ],
        es: [
          'Pagar la tasa de solicitud y luego la tasa de emisión',
          'Son dos cargos distintos: uno para presentar el caso y otro cuando el pase se emite realmente. Prevea ambos y consulte los importes vigentes.',
        ],
      },
      {
        en: [
          'Receive the In-Principle Approval letter',
          'The approval letter doubles as a single-entry visa and has a short validity. Enter and complete the formalities before it lapses, or the whole case restarts.',
        ],
        pt: [
          'Receber a carta de aprovação em princípio',
          'A carta de aprovação funciona também como visto de entrada única e tem validade curta. Entre e conclua as formalidades antes de ela caducar, ou o caso recomeça do zero.',
        ],
        es: [
          'Recibir la carta de aprobación en principio',
          'La carta de aprobación funciona además como visado de entrada única y tiene una validez corta. Entre y complete los trámites antes de que caduque, o el caso vuelve a empezar.',
        ],
      },
      {
        en: [
          'Appeal or refile if the pass is refused',
          'Appeals go through the employer within a limited window and need new material. Resubmitting the same file changes nothing.',
        ],
        pt: [
          'Recorrer ou reprotocolar se o passe for negado',
          'Os recursos passam pelo empregador dentro de uma janela limitada e exigem material novo. Reenviar o mesmo dossiê não muda nada.',
        ],
        es: [
          'Recurrir o volver a presentar si deniegan el pase',
          'Los recursos pasan por el empleador dentro de una ventana limitada y exigen material nuevo. Reenviar el mismo expediente no cambia nada.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical examination by a locally registered doctor',
          'Required before issuance for the S Pass and Work Permit, and often for the Employment Pass. Screening includes a chest X-ray and blood tests, and it must be done in Singapore.',
        ],
        pt: [
          'Exame médico com médico registado localmente',
          'Exigido antes da emissão para S Pass e Work Permit, e com frequência para o Employment Pass. Inclui radiografia de tórax e exames de sangue, e precisa ser feito em Singapura.',
        ],
        es: [
          'Examen médico con un médico registrado localmente',
          'Se exige antes de la emisión para el S Pass y el Work Permit, y a menudo para el Employment Pass. Incluye radiografía de tórax y análisis de sangre, y debe hacerse en Singapur.',
        ],
      },
      {
        en: [
          'Register fingerprints and photograph after arrival',
          'Done at a pass services centre within the window stated on the approval letter; miss it and the pass is not produced.',
        ],
        pt: [
          'Registar impressões digitais e fotografia após a chegada',
          'Feito num centro de serviços de passes dentro da janela indicada na carta de aprovação; perder o prazo impede a produção do passe.',
        ],
        es: [
          'Registrar huellas y fotografía tras la llegada',
          'Se hace en un centro de servicios de pases dentro de la ventana indicada en la carta de aprobación; si la pierde, el pase no se produce.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the pass card and check every detail on it',
          'Delivered to a registered address a few days after registration. Errors in the name, occupation or employer must be corrected before you rely on it.',
        ],
        pt: [
          'Retirar o cartão do passe e conferir cada dado nele',
          'Entregue num endereço registado poucos dias após o registo. Erros de nome, ocupação ou empregador precisam ser corrigidos antes de você depender dele.',
        ],
        es: [
          'Recoger la tarjeta del pase y revisar cada dato',
          'Se entrega en una dirección registrada pocos días después del registro. Los errores de nombre, ocupación o empleador deben corregirse antes de confiar en ella.',
        ],
      },
      {
        en: [
          'Report changes of job, salary or address',
          'A change of employer or of role requires a new application rather than an update, and working outside the declared occupation invalidates the pass.',
        ],
        pt: [
          'Comunicar mudanças de emprego, salário ou endereço',
          'Trocar de empregador ou de função exige um pedido novo, não uma atualização, e trabalhar fora da ocupação declarada invalida o passe.',
        ],
        es: [
          'Comunicar cambios de empleo, salario o domicilio',
          'Cambiar de empleador o de puesto exige una solicitud nueva, no una actualización, y trabajar fuera de la ocupación declarada invalida el pase.',
        ],
      },
      {
        en: [
          'Bring family only above the salary threshold',
          'A Dependant’s Pass or a family visit pass is open only to pass holders earning above set levels, and the family’s status ends the moment yours does.',
        ],
        pt: [
          'Trazer a família apenas acima do piso salarial',
          'O Dependant’s Pass ou o passe de visita familiar só existe para titulares acima de determinados níveis de salário, e o status da família termina no instante em que o seu termina.',
        ],
        es: [
          'Traer a la familia solo por encima del umbral salarial',
          'El Dependant’s Pass o el pase de visita familiar solo está abierto a titulares por encima de ciertos niveles salariales, y el estatus de la familia acaba en cuanto acaba el suyo.',
        ],
        priority: 2,
      },
      {
        en: [
          'Cancel the pass when the employment ends',
          'The employer must cancel it within days of the last working day, and you are left with a short visit pass to find another sponsor or leave.',
        ],
        pt: [
          'Cancelar o passe quando o emprego terminar',
          'O empregador precisa cancelá-lo em poucos dias após o último dia de trabalho, e você fica com um passe de visita curto para achar outro patrocinador ou sair.',
        ],
        es: [
          'Cancelar el pase cuando termine el empleo',
          'El empleador debe cancelarlo pocos días después del último día trabajado, y a usted le queda un pase de visita corto para hallar otro patrocinador o salir.',
        ],
      },
    ],
  },

  'Long-Term Visit / Dependent / Permanent Residence Passes': {
    core_documents: [
      {
        en: [
          'Passport and the sponsor’s current pass',
          'Every family route hangs on the sponsor’s own pass or citizenship. If theirs is cancelled, the dependant’s ends with it on the same day.',
        ],
        pt: [
          'Passaporte e o passe atual do patrocinador',
          'Toda rota familiar depende do passe ou da cidadania do patrocinador. Se o dele for cancelado, o do dependente termina junto, no mesmo dia.',
        ],
        es: [
          'Pasaporte y el pase vigente del patrocinador',
          'Toda vía familiar depende del pase o la ciudadanía del patrocinador. Si el suyo se cancela, el del dependiente acaba con él, el mismo día.',
        ],
      },
      {
        en: [
          'Identify which pass fits the relationship',
          'The Dependant’s Pass covers legal spouses and children of higher-earning pass holders; the Long Term Visit Pass covers parents, common-law partners and stepchildren, on stricter and more discretionary terms.',
        ],
        pt: [
          'Identificar qual passe corresponde ao vínculo familiar',
          'O Dependant’s Pass cobre cônjuges legais e filhos de titulares com salário mais alto; o Long Term Visit Pass cobre pais, companheiros de união estável e enteados, em condições mais rígidas e discricionárias.',
        ],
        es: [
          'Identificar qué pase corresponde al vínculo familiar',
          'El Dependant’s Pass cubre cónyuges legales e hijos de titulares con salario más alto; el Long Term Visit Pass cubre padres, parejas de hecho e hijastros, en condiciones más estrictas y discrecionales.',
        ],
      },
      {
        en: [
          'Marriage or birth certificate, translated and certified',
          'Documents not in English need a translation certified by the issuing country’s embassy or a notary. Uncertified translations are returned and restart the clock.',
        ],
        pt: [
          'Certidão de casamento ou nascimento, traduzida e certificada',
          'Documentos que não estão em inglês exigem tradução certificada pela embaixada do país emissor ou por notário. Traduções não certificadas são devolvidas e reiniciam a contagem.',
        ],
        es: [
          'Certificado de matrimonio o nacimiento, traducido y certificado',
          'Los documentos que no estén en inglés exigen traducción certificada por la embajada del país emisor o por un notario. Las traducciones sin certificar se devuelven y reinician el plazo.',
        ],
      },
      {
        en: [
          'Application forms and photographs for each family member',
          'One complete set per person, children included; a missing photograph holds the whole family file.',
        ],
        pt: [
          'Formulários e fotografias de cada membro da família',
          'Um conjunto completo por pessoa, incluindo crianças; uma fotografia faltando trava o dossiê inteiro da família.',
        ],
        es: [
          'Formularios y fotografías de cada miembro de la familia',
          'Un juego completo por persona, incluidos los niños; una fotografía que falte bloquea todo el expediente familiar.',
        ],
      },
      {
        en: [
          'Permanent residence file lodged through the immigration portal',
          'A far heavier submission than any pass: full employment history, qualifications, family details and a personal statement, all uploaded in a single sitting.',
        ],
        pt: [
          'Dossiê de residência permanente entregue pelo portal de imigração',
          'Uma submissão bem mais pesada do que qualquer passe: histórico completo de emprego, qualificações, dados familiares e uma declaração pessoal, tudo carregado de uma vez.',
        ],
        es: [
          'Expediente de residencia permanente por el portal de inmigración',
          'Una presentación mucho más pesada que cualquier pase: historial laboral completo, titulaciones, datos familiares y una declaración personal, todo subido de una sola vez.',
        ],
      },
      {
        en: [
          'Explanatory letter for a discretionary case',
          'Parents, stepchildren and unmarried partners are judged case by case, and a clear written account of the dependency is what carries the file.',
        ],
        pt: [
          'Carta explicativa para casos discricionários',
          'Pais, enteados e companheiros não casados são avaliados caso a caso, e um relato escrito claro da dependência é o que sustenta o dossiê.',
        ],
        es: [
          'Carta explicativa para los casos discrecionales',
          'Padres, hijastros y parejas no casadas se evalúan caso por caso, y un relato escrito claro de la dependencia es lo que sostiene el expediente.',
        ],
        priority: 2,
        required: false,
      },
    ],
    education: [
      {
        en: [
          'Educational certificates for the residence assessment',
          'Qualifications weigh in the permanent residence evaluation, so include them even though no checklist formally demands them.',
        ],
        pt: [
          'Certificados de escolaridade para a avaliação de residência',
          'As qualificações pesam na avaliação de residência permanente, então inclua-as mesmo que nenhuma lista as exija formalmente.',
        ],
        es: [
          'Certificados académicos para la evaluación de residencia',
          'Las titulaciones pesan en la evaluación de residencia permanente, así que inclúyalas aunque ninguna lista las exija formalmente.',
        ],
      },
      {
        en: [
          'School registration for children comes after the pass',
          'Places in national schools are allocated only once the pass exists and are limited for non-citizens, which is why international schools become the default fallback.',
        ],
        pt: [
          'Matrícula escolar dos filhos vem depois do passe',
          'Vagas em escolas públicas só são alocadas depois de o passe existir e são limitadas para não cidadãos, e é por isso que as escolas internacionais viram o plano padrão.',
        ],
        es: [
          'La matrícula escolar de los hijos va después del pase',
          'Las plazas en escuelas públicas solo se asignan una vez que existe el pase y son limitadas para no ciudadanos, por eso los colegios internacionales acaban siendo la opción por defecto.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Sponsor income above the threshold for the chosen pass',
          'Different and higher minimum salaries apply to a Dependant’s Pass and to a visit pass for parents. The levels move, so verify the ones in force.',
        ],
        pt: [
          'Renda do patrocinador acima do piso do passe escolhido',
          'Pisos salariais distintos e mais altos valem para o Dependant’s Pass e para o passe de visita destinado a pais. Os níveis mudam, então verifique os vigentes.',
        ],
        es: [
          'Ingresos del patrocinador por encima del umbral del pase',
          'Se aplican salarios mínimos distintos y más altos al Dependant’s Pass y al pase de visita para padres. Los niveles cambian, así que verifique los vigentes.',
        ],
      },
      {
        en: [
          'Income tax notices of assessment for recent years',
          'The residence file is read as a track record, not as a single strong year; gaps in filing are noticed.',
        ],
        pt: [
          'Notificações de lançamento de imposto de renda dos últimos anos',
          'O dossiê de residência é lido como histórico, não como um único ano bom; falhas na entrega das declarações são notadas.',
        ],
        es: [
          'Notificaciones de liquidación del impuesto sobre la renta',
          'El expediente de residencia se lee como una trayectoria, no como un único año bueno; las omisiones en las declaraciones se notan.',
        ],
      },
      {
        en: [
          'Retirement fund contribution history as a pass holder',
          'Contributions already made feed into how economic contribution is judged, and they become compulsory for both you and your employer once residence is granted, cutting take-home pay.',
        ],
        pt: [
          'Histórico de contribuições ao fundo de aposentadoria',
          'As contribuições já feitas entram na leitura da contribuição econômica, e passam a ser obrigatórias para você e para o empregador assim que a residência é concedida, reduzindo o líquido em mãos.',
        ],
        es: [
          'Historial de aportes al fondo de jubilación',
          'Los aportes ya hechos entran en la lectura de la contribución económica, y se vuelven obligatorios para usted y su empleador en cuanto se concede la residencia, recortando el neto.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Employer lodges family passes with or after the main one',
          'Filing them together shortens the wait considerably; filing later means the family arrives on ordinary visit passes and waits without status.',
        ],
        pt: [
          'Empregador protocola os passes familiares junto ou após o principal',
          'Protocolar juntos encurta bastante a espera; protocolar depois faz a família chegar com passes de visita comuns e aguardar sem status.',
        ],
        es: [
          'El empleador presenta los pases familiares junto al principal',
          'Presentarlos a la vez acorta bastante la espera; presentarlos después hace que la familia llegue con pases de visita comunes y espere sin estatus.',
        ],
      },
      {
        en: [
          'Pay the fee at lodgement and again on issuance',
          'The same two-stage charging applies here as to work passes, per family member. Confirm current amounts before transferring.',
        ],
        pt: [
          'Pagar a taxa no protocolo e outra na emissão',
          'A mesma cobrança em duas etapas dos passes de trabalho vale aqui, por membro da família. Confirme os valores vigentes antes de transferir.',
        ],
        es: [
          'Pagar la tasa al presentar y otra al emitir',
          'Aquí rige el mismo cobro en dos etapas que en los pases de trabajo, por miembro de la familia. Confirme los importes vigentes antes de transferir.',
        ],
      },
      {
        en: [
          'Expect many months of processing for residence',
          'Half a year or more is normal, and a refusal arrives without reasons, so nothing tells you what to change before applying again.',
        ],
        pt: [
          'Contar com muitos meses de análise na residência',
          'Meio ano ou mais é o normal, e o indeferimento chega sem motivos, então nada indica o que mudar antes de pedir de novo.',
        ],
        es: [
          'Contar con muchos meses de tramitación en la residencia',
          'Medio año o más es lo normal, y la denegación llega sin motivos, así que nada le indica qué cambiar antes de volver a solicitar.',
        ],
      },
      {
        en: [
          'Keep the underlying pass valid throughout the wait',
          'If the sponsoring pass lapses or is cancelled while a family or residence application is pending, the pending application falls with it.',
        ],
        pt: [
          'Manter válido o passe de base durante toda a espera',
          'Se o passe patrocinador caducar ou for cancelado enquanto o pedido familiar ou de residência tramita, o pedido pendente cai junto.',
        ],
        es: [
          'Mantener vigente el pase de base durante toda la espera',
          'Si el pase patrocinador caduca o se cancela mientras la solicitud familiar o de residencia está pendiente, esa solicitud cae con él.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical examination for long-term and residence passes',
          'A chest X-ray and blood screening at a locally registered clinic, submitted with the file; results have a limited validity, so do not do it too early.',
        ],
        pt: [
          'Exame médico para passes de longa duração e residência',
          'Radiografia de tórax e exames de sangue em clínica registada localmente, entregues com o dossiê; os resultados têm validade limitada, então não faça cedo demais.',
        ],
        es: [
          'Examen médico para pases de larga duración y residencia',
          'Radiografía de tórax y análisis de sangre en una clínica registrada localmente, presentados con el expediente; los resultados caducan, así que no lo haga demasiado pronto.',
        ],
      },
      {
        en: [
          'Fingerprints and photograph at the immigration authority',
          'Taken by appointment when the identity card is produced, for every family member above the age threshold.',
        ],
        pt: [
          'Impressões digitais e fotografia na autoridade de imigração',
          'Colhidas por agendamento quando o cartão de identidade é produzido, para cada membro da família acima da idade mínima.',
        ],
        es: [
          'Huellas y fotografía en la autoridad de inmigración',
          'Se toman con cita cuando se produce la tarjeta de identidad, para cada miembro de la familia por encima de la edad mínima.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Complete registration and collect the identity card',
          'New residents register and collect the card within a set period after approval; letting that deadline pass voids the entry permit itself.',
        ],
        pt: [
          'Concluir o registo e retirar o cartão de identidade',
          'Novos residentes se registam e retiram o cartão num prazo definido após a aprovação; deixar esse prazo passar anula a própria permissão de entrada.',
        ],
        es: [
          'Completar el registro y recoger la tarjeta de identidad',
          'Los nuevos residentes se registran y recogen la tarjeta en un plazo fijado tras la aprobación; dejar pasar ese plazo anula el propio permiso de entrada.',
        ],
      },
      {
        en: [
          'Hold a valid Re-Entry Permit whenever you travel',
          'Permanent residence lapses automatically if you are outside the country without one. It is renewed periodically and is not granted for life.',
        ],
        pt: [
          'Manter um Re-Entry Permit válido sempre que viajar',
          'A residência permanente caduca automaticamente se você estiver fora do país sem ele. Ele é renovado periodicamente e não é concedido para sempre.',
        ],
        es: [
          'Tener un Re-Entry Permit vigente siempre que viaje',
          'La residencia permanente caduca automáticamente si está fuera del país sin él. Se renueva periódicamente y no se concede de por vida.',
        ],
      },
      {
        en: [
          'Obtain consent before a dependant takes a job',
          'A Dependant’s Pass carries no right to work on its own. The prospective employer applies for a letter of consent, and starting before it arrives is an offence for both parties.',
        ],
        pt: [
          'Obter autorização antes de um dependente aceitar emprego',
          'O Dependant’s Pass, por si só, não dá direito de trabalhar. O futuro empregador pede uma carta de consentimento, e começar antes de ela sair é infração para os dois lados.',
        ],
        es: [
          'Obtener consentimiento antes de que un dependiente trabaje',
          'El Dependant’s Pass por sí solo no da derecho a trabajar. El futuro empleador solicita una carta de consentimiento, y empezar antes de que llegue es una infracción para ambas partes.',
        ],
      },
      {
        en: [
          'Plan for national service liability in the family',
          'Male permanent residents and their sons are liable for national service, and deferring or renouncing it damages later applications for everyone in the household.',
        ],
        pt: [
          'Planejar a obrigação de serviço nacional na família',
          'Residentes permanentes do sexo masculino e seus filhos ficam sujeitos ao serviço nacional, e adiar ou renunciar prejudica pedidos futuros de todos na casa.',
        ],
        es: [
          'Prever la obligación de servicio nacional en la familia',
          'Los residentes permanentes varones y sus hijos quedan sujetos al servicio nacional, y aplazarlo o renunciar perjudica solicitudes futuras de todo el hogar.',
        ],
      },
      {
        en: [
          'Start the compulsory retirement fund deductions',
          'Once residence begins, employee and employer contributions start automatically, and the visible drop in monthly pay surprises people who budgeted on their pass-holder salary.',
        ],
        pt: [
          'Iniciar os descontos obrigatórios do fundo de aposentadoria',
          'Assim que a residência começa, as contribuições de empregado e empregador entram automaticamente, e a queda visível no salário mensal surpreende quem se planejou pelo líquido de titular de passe.',
        ],
        es: [
          'Comenzar los descuentos obligatorios del fondo de jubilación',
          'En cuanto empieza la residencia, los aportes de empleado y empleador arrancan automáticamente, y la caída visible del salario mensual sorprende a quien se planificó con el neto de titular de pase.',
        ],
        priority: 2,
      },
    ],
  },
};
