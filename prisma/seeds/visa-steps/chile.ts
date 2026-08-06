import type { CountryVisaSteps } from './types';

/**
 * Steps for Chile.
 *
 * The migration law rewrote the single most important rule here: you can no
 * longer arrive as a tourist and change to a residence permit from inside the
 * country. The application is made at a Chilean consulate abroad, and entering
 * as a tourist with that plan now leads nowhere. Any guidance written before
 * that reform gets this backwards, so it is the first step of every residence
 * route below.
 */
export const chile: CountryVisaSteps = {
  'Tourist / Transitory Stay Permit': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Most of the Americas and Europe enter visa-free; check your nationality before applying for anything.',
        ],
        pt: [
          'Passaporte válido',
          'A maior parte das Américas e da Europa entra sem visto; confira sua nacionalidade antes de pedir qualquer coisa.',
        ],
        es: [
          'Pasaporte vigente',
          'La mayor parte de América y Europa entra sin visado; compruebe su nacionalidad antes de solicitar nada.',
        ],
      },
      {
        en: [
          'National identity document for some South American nationals',
          'Citizens of several neighbouring countries may enter with their ID card instead of a passport.',
        ],
        pt: [
          'Documento nacional de identidade para alguns sul-americanos',
          'Cidadãos de vários países vizinhos podem entrar com a carteira de identidade em vez do passaporte.',
        ],
        es: [
          'Documento nacional de identidad para algunos sudamericanos',
          'Los ciudadanos de varios países vecinos pueden entrar con su documento de identidad en lugar del pasaporte.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Return or onward ticket',
          'Checked at the border as evidence of a genuine visit.',
        ],
        pt: [
          'Bilhete de volta ou de continuação',
          'Conferido na fronteira como prova de visita genuína.',
        ],
        es: [
          'Billete de vuelta o de continuación',
          'Se comprueba en la frontera como prueba de una visita genuina.',
        ],
      },
      {
        en: [
          'Proof of accommodation',
          'A booking, or the address of whoever is hosting you.',
        ],
        pt: [
          'Comprovação de alojamento',
          'Uma reserva, ou o endereço de quem vai hospedar você.',
        ],
        es: [
          'Comprobante de alojamiento',
          'Una reserva, o la dirección de quien le aloja.',
        ],
      },
      {
        en: [
          'Tourist card issued at the border',
          'Keep it: it is required when you leave and replacing it is a bureaucratic detour.',
        ],
        pt: [
          'Cartão de turismo emitido na fronteira',
          'Guarde-o: ele é exigido na saída, e substituí-lo é um desvio burocrático.',
        ],
        es: [
          'Tarjeta de turismo emitida en la frontera',
          'Guárdela: se exige al salir, y reponerla es un desvío burocrático.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of funds for the stay',
          'No fixed figure is published; officers assess it against the length of the trip.',
        ],
        pt: [
          'Comprovação de recursos para a estada',
          'Não há valor fixo publicado; os oficiais avaliam conforme a duração da viagem.',
        ],
        es: [
          'Prueba de fondos para la estancia',
          'No hay cifra fija publicada; los oficiales la valoran según la duración del viaje.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply at the consulate only if a visa is required',
          'There is no online travel authorisation for tourism.',
        ],
        pt: [
          'Pedir no consulado só se houver exigência de visto',
          'Não existe autorização de viagem online para turismo.',
        ],
        es: [
          'Solicitar en el consulado solo si se exige visado',
          'No existe autorización de viaje en línea para turismo.',
        ],
      },
      {
        en: [
          'Pay the reciprocity fee if it applies',
          'A few nationalities pay a charge on first arrival, mirroring what Chile is charged.',
        ],
        pt: [
          'Pagar a taxa de reciprocidade se aplicável',
          'Algumas nacionalidades pagam uma taxa na primeira chegada, espelhando o que é cobrado do Chile.',
        ],
        es: [
          'Pagar la tasa de reciprocidad si aplica',
          'Algunas nacionalidades pagan un cargo en la primera llegada, en espejo de lo que se cobra a Chile.',
        ],
        priority: 2,
        required: false,
      },
    ],
    biometrics_health: [
      {
        en: [
          'Migration registration at the border',
          'Entry and exit are recorded electronically.',
        ],
        pt: [
          'Registo migratório na fronteira',
          'Entrada e saída são registadas eletronicamente.',
        ],
        es: [
          'Registro migratorio en la frontera',
          'La entrada y la salida se registran electrónicamente.',
        ],
      },
      {
        en: [
          'Travel medical insurance',
          'Not compulsory, but there is no free public care for tourists.',
        ],
        pt: [
          'Seguro médico de viagem',
          'Não é obrigatório, mas não há atendimento público gratuito para turistas.',
        ],
        es: [
          'Seguro médico de viaje',
          'No es obligatorio, pero no hay atención pública gratuita para turistas.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Note the stay granted at the border',
          'Usually ninety days, decided by the officer rather than fixed in advance.',
        ],
        pt: [
          'Anotar o prazo concedido na fronteira',
          'Em geral noventa dias, decididos pelo oficial e não fixados de antemão.',
        ],
        es: [
          'Anotar el plazo concedido en la frontera',
          'Por lo general noventa días, decididos por el oficial y no fijados de antemano.',
        ],
      },
      {
        en: [
          'Do not count on converting to residence from inside Chile',
          'The migration law removed that path. A residence application is made at a consulate abroad, so arriving as a tourist to settle no longer works.',
        ],
        pt: [
          'Não contar em converter para residência de dentro do Chile',
          'A lei de migração eliminou esse caminho. O pedido de residência é feito num consulado no exterior, então chegar como turista para se fixar não funciona mais.',
        ],
        es: [
          'No contar con convertir a residencia desde dentro de Chile',
          'La ley de migración eliminó esa vía. La solicitud de residencia se hace en un consulado en el exterior, así que llegar como turista para establecerse ya no funciona.',
        ],
      },
      {
        en: [
          'Do not work as a tourist',
          'Working without authorisation is a ground for expulsion and blocks a later residence application.',
        ],
        pt: [
          'Não trabalhar como turista',
          'Trabalhar sem autorização é motivo de expulsão e bloqueia um pedido de residência posterior.',
        ],
        es: [
          'No trabajar como turista',
          'Trabajar sin autorización es causal de expulsión y bloquea una solicitud de residencia posterior.',
        ],
      },
    ],
  },

  'Temporary Residence Visa / Permit': {
    core_documents: [
      {
        en: [
          'Apply from outside Chile, at a consulate',
          'The migration law requires the application to be made abroad. Being in Chile as a tourist does not let you file, and this is the change that catches everyone out.',
        ],
        pt: [
          'Pedir de fora do Chile, num consulado',
          'A lei de migração exige que o pedido seja feito no exterior. Estar no Chile como turista não permite protocolar, e essa é a mudança que pega todo mundo.',
        ],
        es: [
          'Solicitar desde fuera de Chile, en un consulado',
          'La ley de migración exige que la solicitud se haga en el exterior. Estar en Chile como turista no permite presentarla, y ese es el cambio que sorprende a todos.',
        ],
      },
      {
        en: ['Valid passport', 'Covering the period of residence requested.'],
        pt: ['Passaporte válido', 'Cobrindo o período de residência pedido.'],
        es: [
          'Pasaporte vigente',
          'Que cubra el periodo de residencia solicitado.',
        ],
      },
      {
        en: [
          'Application through the online migration platform',
          'The file is created and followed online, then completed at the consulate.',
        ],
        pt: [
          'Pedido pela plataforma online de migração',
          'O processo é criado e acompanhado online, depois completado no consulado.',
        ],
        es: [
          'Solicitud por la plataforma en línea de migración',
          'El expediente se crea y se sigue en línea, luego se completa en el consulado.',
        ],
      },
      {
        en: [
          'Criminal record certificate, apostilled',
          'From every country you lived in over the last years, with a translation into Spanish where needed.',
        ],
        pt: [
          'Certidão de antecedentes penais apostilada',
          'De todo país onde você morou nos últimos anos, com tradução para o espanhol quando necessário.',
        ],
        es: [
          'Certificado de antecedentes penales apostillado',
          'De todo país donde haya vivido en los últimos años, con traducción al español cuando haga falta.',
        ],
      },
      {
        en: [
          'Document supporting the subcategory',
          'An employment contract, an enrolment certificate, or evidence of the family tie — each subcategory has its own.',
        ],
        pt: [
          'Documento que sustenta a subcategoria',
          'Contrato de trabalho, certificado de matrícula, ou comprovação do vínculo familiar — cada subcategoria tem o seu.',
        ],
        es: [
          'Documento que sustenta la subcategoría',
          'Contrato de trabajo, certificado de inscripción, o prueba del vínculo familiar: cada subcategoría tiene el suyo.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Diplomas for regulated professions',
          'Practising medicine, law or engineering requires the qualification to be revalidated by the University of Chile, a slow process worth starting early.',
        ],
        pt: [
          'Diplomas para profissões regulamentadas',
          'Exercer medicina, direito ou engenharia exige revalidação do diploma pela Universidad de Chile, um processo lento que vale começar cedo.',
        ],
        es: [
          'Títulos para profesiones reguladas',
          'Ejercer medicina, derecho o ingeniería exige revalidar el título en la Universidad de Chile, un proceso lento que conviene empezar pronto.',
        ],
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence of means or of an employment contract',
          'A signed contract with a Chilean employer, or proof of income sufficient to support yourself.',
        ],
        pt: [
          'Comprovação de meios ou de contrato de trabalho',
          'Contrato assinado com empregador chileno, ou comprovação de renda suficiente para se sustentar.',
        ],
        es: [
          'Prueba de medios o de contrato de trabajo',
          'Contrato firmado con un empleador chileno, o prueba de ingresos suficientes para mantenerse.',
        ],
      },
      {
        en: [
          'Pay the visa fee',
          'The amount varies by nationality under reciprocity rules.',
        ],
        pt: [
          'Pagar a taxa do visto',
          'O valor varia por nacionalidade, conforme regras de reciprocidade.',
        ],
        es: [
          'Pagar la tasa del visado',
          'El importe varía según la nacionalidad, conforme a reglas de reciprocidad.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Create the application online and book the consular appointment',
          'The platform assigns the appointment once the file is complete.',
        ],
        pt: [
          'Criar o pedido online e agendar o atendimento consular',
          'A plataforma atribui o atendimento quando o processo está completo.',
        ],
        es: [
          'Crear la solicitud en línea y reservar la cita consular',
          'La plataforma asigna la cita cuando el expediente está completo.',
        ],
      },
      {
        en: [
          'Attend the consulate to complete the application',
          'Originals are presented there and the visa is stamped once approved.',
        ],
        pt: [
          'Comparecer ao consulado para completar o pedido',
          'Os originais são apresentados ali e o visto é estampado depois de aprovado.',
        ],
        es: [
          'Acudir al consulado para completar la solicitud',
          'Allí se presentan los originales y el visado se estampa una vez aprobado.',
        ],
      },
      {
        en: [
          'Enter Chile within the visa validity',
          'The visa has a window for first entry, and it starts running from issue rather than from arrival.',
        ],
        pt: [
          'Entrar no Chile dentro da validade do visto',
          'O visto tem uma janela para a primeira entrada, e ela corre desde a emissão, não desde a chegada.',
        ],
        es: [
          'Entrar en Chile dentro de la validez del visado',
          'El visado tiene una ventana para la primera entrada, y corre desde la emisión, no desde la llegada.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric registration on arrival',
          'Taken by migration at the border.',
        ],
        pt: [
          'Registo biométrico na chegada',
          'Feito pela migração na fronteira.',
        ],
        es: [
          'Registro biométrico a la llegada',
          'Lo realiza migración en la frontera.',
        ],
      },
      {
        en: [
          'Enrol in a health system after registering',
          'The public system or a private plan; enrolment follows the identity card.',
        ],
        pt: [
          'Inscrever-se num sistema de saúde após o registo',
          'O sistema público ou um plano privado; a inscrição vem depois da cédula de identidade.',
        ],
        es: [
          'Inscribirse en un sistema de salud tras el registro',
          'El sistema público o un plan privado; la inscripción va después de la cédula de identidad.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Register the visa with the police within thirty days',
          'A legal deadline after arrival, done at the international police office. Missing it carries a fine.',
        ],
        pt: [
          'Registar o visto na polícia em até trinta dias',
          'Prazo legal após a chegada, feito na polícia internacional. Perdê-lo gera multa.',
        ],
        es: [
          'Registrar el visado ante la policía en treinta días',
          'Plazo legal tras la llegada, en la policía internacional. Incumplirlo conlleva multa.',
        ],
      },
      {
        en: [
          'Get the RUT and the identity card',
          'The tax and identity number is what daily life runs on: bank, contracts, health, phone.',
        ],
        pt: [
          'Obter o RUT e a cédula de identidade',
          'O número tributário e de identidade é o que a vida cotidiana exige: banco, contratos, saúde, telefone.',
        ],
        es: [
          'Obtener el RUT y la cédula de identidad',
          'El número tributario y de identidad es lo que la vida diaria exige: banco, contratos, salud, teléfono.',
        ],
      },
      {
        en: [
          'Activate the ClaveÚnica',
          'The national digital identity, needed for nearly every public procedure including the residence renewal.',
        ],
        pt: [
          'Ativar a ClaveÚnica',
          'A identidade digital nacional, necessária para quase todo trâmite público, inclusive a renovação da residência.',
        ],
        es: [
          'Activar la ClaveÚnica',
          'La identidad digital nacional, necesaria para casi todo trámite público, incluida la renovación de la residencia.',
        ],
      },
      {
        en: [
          'Renew before the permit expires',
          'Temporary residence runs for a defined period and continuity is what leads to definitive residence.',
        ],
        pt: [
          'Renovar antes de o permiso vencer',
          'A residência temporária corre por prazo definido, e é a continuidade que leva à residência definitiva.',
        ],
        es: [
          'Renovar antes de que venza el permiso',
          'La residencia temporaria corre por un plazo definido, y es la continuidad la que lleva a la residencia definitiva.',
        ],
        priority: 2,
      },
    ],
  },

  'Definitive Residence (Permanent) Permit': {
    core_documents: [
      {
        en: [
          'Valid passport and current identity card',
          'The application is made from inside Chile, holding a valid temporary residence.',
        ],
        pt: [
          'Passaporte válido e cédula de identidade atual',
          'O pedido é feito de dentro do Chile, com uma residência temporária válida.',
        ],
        es: [
          'Pasaporte vigente y cédula de identidad actual',
          'La solicitud se hace desde dentro de Chile, con una residencia temporaria vigente.',
        ],
      },
      {
        en: [
          'Evidence of the qualifying period of residence',
          'Normally two years of temporary residence, with the required minimum presence in the country.',
        ],
        pt: [
          'Comprovação do período qualificado de residência',
          'Normalmente dois anos de residência temporária, com a presença mínima exigida no país.',
        ],
        es: [
          'Prueba del periodo cualificado de residencia',
          'Normalmente dos años de residencia temporaria, con la presencia mínima exigida en el país.',
        ],
      },
      {
        en: [
          'Record of entries and exits',
          'Obtained from migration; long absences can break the continuity the application rests on.',
        ],
        pt: [
          'Certificado de entradas e saídas',
          'Obtido na migração; ausências longas podem quebrar a continuidade sobre a qual o pedido se apoia.',
        ],
        es: [
          'Certificado de entradas y salidas',
          'Se obtiene en migración; las ausencias largas pueden romper la continuidad en que se apoya la solicitud.',
        ],
      },
      {
        en: [
          'Chilean criminal record certificate',
          'Issued locally and valid for a short period, so request it near the end.',
        ],
        pt: [
          'Certificado de antecedentes chileno',
          'Emitido localmente e válido por período curto, então peça-o no fim.',
        ],
        es: [
          'Certificado de antecedentes chileno',
          'Se emite localmente y vale por poco tiempo, así que pídalo al final.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence of lawful activity during the period',
          'Payslips, contracts, or tax returns covering the residence you are relying on.',
        ],
        pt: [
          'Comprovação de atividade lícita durante o período',
          'Holerites, contratos ou declarações de imposto cobrindo a residência que você invoca.',
        ],
        es: [
          'Prueba de actividad lícita durante el periodo',
          'Liquidaciones, contratos o declaraciones de impuestos que cubran la residencia que invoca.',
        ],
      },
      {
        en: [
          'Tax situation in order',
          'A clearance certificate from the tax authority.',
        ],
        pt: [
          'Situação fiscal regularizada',
          'Certidão de regularidade da autoridade tributária.',
        ],
        es: [
          'Situación fiscal regularizada',
          'Certificado de cumplimiento de la autoridad tributaria.',
        ],
        priority: 2,
      },
      {
        en: [
          'Pay the definitive residence fee',
          'Charged when the application is filed.',
        ],
        pt: [
          'Pagar a taxa da residência definitiva',
          'Cobrada no momento do protocolo.',
        ],
        es: [
          'Pagar la tasa de la residencia definitiva',
          'Se cobra al presentar la solicitud.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File through the online migration platform',
          'From inside Chile, before the temporary residence expires.',
        ],
        pt: [
          'Protocolar pela plataforma online de migração',
          'De dentro do Chile, antes de a residência temporária vencer.',
        ],
        es: [
          'Presentar por la plataforma en línea de migración',
          'Desde dentro de Chile, antes de que venza la residencia temporaria.',
        ],
      },
      {
        en: [
          'Keep the temporary residence valid while waiting',
          'The decision takes months and a gap in status undermines the whole application.',
        ],
        pt: [
          'Manter a residência temporária válida durante a espera',
          'A decisão leva meses, e uma lacuna de status compromete todo o pedido.',
        ],
        es: [
          'Mantener vigente la residencia temporaria mientras espera',
          'La decisión tarda meses, y un vacío de estatus socava toda la solicitud.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints for the new identity card',
          'Taken when the definitive residence is granted.',
        ],
        pt: [
          'Impressões digitais para a nova cédula',
          'Recolhidas quando a residência definitiva é concedida.',
        ],
        es: [
          'Huellas dactilares para la nueva cédula',
          'Se toman cuando se concede la residencia definitiva.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Register the definitive residence with the police',
          'The same international police office, within the deadline given.',
        ],
        pt: [
          'Registar a residência definitiva na polícia',
          'A mesma polícia internacional, dentro do prazo indicado.',
        ],
        es: [
          'Registrar la residencia definitiva ante la policía',
          'La misma policía internacional, dentro del plazo indicado.',
        ],
      },
      {
        en: [
          'Get the new identity card',
          'Issued without the activity restrictions of the temporary permit.',
        ],
        pt: [
          'Obter a nova cédula de identidade',
          'Emitida sem as restrições de atividade do permiso temporário.',
        ],
        es: [
          'Obtener la nueva cédula de identidad',
          'Se emite sin las restricciones de actividad del permiso temporal.',
        ],
      },
      {
        en: [
          'Do not stay outside Chile for a prolonged period',
          'Definitive residence lapses after a long continuous absence unless you request authorisation first.',
        ],
        pt: [
          'Não ficar fora do Chile por período prolongado',
          'A residência definitiva caduca após ausência contínua longa, salvo se você pedir autorização antes.',
        ],
        es: [
          'No permanecer fuera de Chile por un periodo prolongado',
          'La residencia definitiva caduca tras una ausencia continua larga, salvo que solicite autorización antes.',
        ],
      },
      {
        en: [
          'Consider naturalisation after five years',
          'Chilean nationality is available after five years of residence, counted from the first permit.',
        ],
        pt: [
          'Avaliar a naturalização após cinco anos',
          'A nacionalidade chilena está disponível após cinco anos de residência, contados do primeiro permiso.',
        ],
        es: [
          'Evaluar la naturalización tras cinco años',
          'La nacionalidad chilena está disponible tras cinco años de residencia, contados desde el primer permiso.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
