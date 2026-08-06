import type { CountryVisaSteps } from './types';

/**
 * Steps for Malaysia.
 *
 * The first thing to internalise is that a visa and a pass are different
 * objects. The visa is permission to travel to the border; the pass, stamped
 * or endorsed after arrival, is permission to stay and sets its own length.
 * People plan around the visa and are surprised by the pass.
 *
 * The second is that the Employment Pass is banded by salary into categories
 * that decide the pass length and whether dependants can come at all, and that
 * the employer needs approval from the regulator of its own sector before
 * immigration will even look at the file. The third is that MM2H was rebuilt
 * into tiers with far heavier financial and physical presence conditions than
 * the programme it replaced.
 */
export const malaysia: CountryVisaSteps = {
  'Social Visit Pass': {
    core_documents: [
      {
        en: [
          'Passport valid for at least six months',
          'Counted from the date of arrival, not from the date you book. Airlines check it at the counter and will refuse boarding.',
        ],
        pt: [
          'Passaporte válido por pelo menos seis meses',
          'Contados a partir da data de chegada, não da data da compra. As companhias aéreas conferem no balcão e recusam o embarque.',
        ],
        es: [
          'Pasaporte con al menos seis meses de vigencia',
          'Contados desde la fecha de llegada, no desde la fecha de compra. Las aerolíneas lo comprueban en el mostrador y deniegan el embarque.',
        ],
      },
      {
        en: [
          'Check whether your nationality needs an entry visa',
          'Many passports enter visa-free, others need an eVISA, and a few need a visa with reference approved from inside Malaysia. The three routes have nothing in common.',
        ],
        pt: [
          'Verificar se a sua nacionalidade precisa de visto de entrada',
          'Muitos passaportes entram sem visto, outros precisam de eVISA, e alguns precisam de visto com referência aprovado de dentro da Malásia. As três rotas não têm nada em comum.',
        ],
        es: [
          'Comprobar si su nacionalidad necesita visado de entrada',
          'Muchos pasaportes entran sin visado, otros necesitan eVISA, y algunos necesitan un visado con referencia aprobado desde dentro de Malasia. Las tres vías no se parecen en nada.',
        ],
      },
      {
        en: [
          'Malaysia Digital Arrival Card (MDAC)',
          'Submitted online in the days before arrival by nearly every foreign traveller. It is free on the official site, and third-party sites charge for filling in the same form.',
        ],
        pt: [
          'Cartão de chegada digital da Malásia (MDAC)',
          'Enviado online nos dias anteriores à chegada por quase todo viajante estrangeiro. É gratuito no site oficial, e sites de terceiros cobram para preencher o mesmo formulário.',
        ],
        es: [
          'Tarjeta de llegada digital de Malasia (MDAC)',
          'Se envía en línea en los días previos a la llegada por casi todo viajero extranjero. Es gratuita en el sitio oficial, y sitios de terceros cobran por rellenar el mismo formulario.',
        ],
      },
      {
        en: [
          'Confirmed onward or return ticket',
          'Immigration officers ask to see it at the counter, and a booking for a date beyond the pass they intend to grant will be questioned.',
        ],
        pt: [
          'Passagem de saída ou de retorno confirmada',
          'Os oficiais de imigração pedem para ver no guichê, e uma reserva para data além do pass que pretendem conceder será questionada.',
        ],
        es: [
          'Billete de salida o de regreso confirmado',
          'Los oficiales de inmigración piden verlo en la ventanilla, y una reserva para una fecha posterior al pase que piensan conceder será cuestionada.',
        ],
      },
      {
        en: [
          'Accommodation booking or a host address',
          'Written down on the arrival card and checked against what you say at the counter. Inconsistency here is the usual trigger for secondary questioning.',
        ],
        pt: [
          'Reserva de acomodação ou endereço do anfitrião',
          'Anotado no cartão de chegada e conferido com o que você diz no guichê. Inconsistência aqui é o gatilho habitual para a entrevista secundária.',
        ],
        es: [
          'Reserva de alojamiento o dirección del anfitrión',
          'Se anota en la tarjeta de llegada y se contrasta con lo que dice en la ventanilla. La inconsistencia aquí es el detonante habitual del interrogatorio secundario.',
        ],
      },
      {
        en: [
          'Letter from the Malaysian company for a business visit',
          'A business visit still runs on a social visit pass, but the invitation has to make clear you are attending meetings rather than working.',
        ],
        pt: [
          'Carta da empresa malaia em caso de visita de negócios',
          'A visita de negócios ainda usa o social visit pass, mas o convite precisa deixar claro que você vai a reuniões e não trabalhar.',
        ],
        es: [
          'Carta de la empresa malaya en caso de visita de negocios',
          'La visita de negocios sigue usando el social visit pass, pero la invitación debe dejar claro que asiste a reuniones y no a trabajar.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Funds proportionate to the length of the visit',
          'Officers may ask for cash, a card or a statement. There is no published figure, which means the judgement is theirs.',
        ],
        pt: [
          'Recursos proporcionais à duração da visita',
          'O oficial pode pedir dinheiro, cartão ou extrato. Não há valor publicado, o que significa que o julgamento é dele.',
        ],
        es: [
          'Fondos proporcionales a la duración de la visita',
          'El oficial puede pedir efectivo, tarjeta o extracto. No hay cifra publicada, lo que significa que el criterio es suyo.',
        ],
      },
      {
        en: [
          'Budget the entry visa fee separately from the pass',
          'The fee paid for the visa buys the right to travel to Malaysia. The pass granted at the border is a separate act and carries no additional charge.',
        ],
        pt: [
          'Orçar a taxa do visto de entrada separadamente do pass',
          'A taxa paga pelo visto compra o direito de viajar até a Malásia. O pass concedido na fronteira é um ato separado e não tem cobrança adicional.',
        ],
        es: [
          'Presupuestar la tasa del visado de entrada aparte del pase',
          'La tasa pagada por el visado compra el derecho a viajar a Malasia. El pase concedido en la frontera es un acto aparte y no tiene cargo adicional.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply through the official eVISA portal only',
          'A crowd of lookalike sites resell the same application with a markup and no accountability if the file is rejected.',
        ],
        pt: [
          'Pedir apenas pelo portal oficial de eVISA',
          'Uma multidão de sites parecidos revende o mesmo pedido com sobretaxa e sem responsabilidade nenhuma se o processo for rejeitado.',
        ],
        es: [
          'Solicitar únicamente por el portal oficial de eVISA',
          'Una multitud de sitios parecidos revende la misma solicitud con recargo y sin responsabilidad alguna si el expediente es rechazado.',
        ],
      },
      {
        en: [
          'Pay the eVISA processing charge',
          'Non-refundable on refusal. Rates differ by nationality and by single or multiple entry; confirm the current one on the portal.',
        ],
        pt: [
          'Pagar a taxa de processamento do eVISA',
          'Não reembolsável em caso de recusa. Os valores variam por nacionalidade e por entrada única ou múltipla; confirme o vigente no portal.',
        ],
        es: [
          'Pagar el cargo de tramitación del eVISA',
          'No reembolsable si se deniega. Las tarifas varían por nacionalidad y por entrada única o múltiple; confirme la vigente en el portal.',
        ],
      },
      {
        en: [
          'Travel within the visa validity, which is not your stay',
          'The visa validity is the window to arrive. The number of days you may remain is decided at the counter and stamped separately.',
        ],
        pt: [
          'Viajar dentro da validade do visto, que não é a sua estada',
          'A validade do visto é a janela para chegar. O número de dias que você pode ficar é decidido no guichê e carimbado à parte.',
        ],
        es: [
          'Viajar dentro de la validez del visado, que no es su estancia',
          'La validez del visado es la ventana para llegar. Los días que puede permanecer se deciden en la ventanilla y se sellan aparte.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Digital photograph to the eVISA specification',
          'White background, no glasses, recent. A rejected image sends the whole application back to the start of the queue.',
        ],
        pt: [
          'Fotografia digital conforme a especificação do eVISA',
          'Fundo branco, sem óculos, recente. Uma imagem rejeitada devolve todo o pedido ao início da fila.',
        ],
        es: [
          'Fotografía digital según la especificación del eVISA',
          'Fondo blanco, sin gafas, reciente. Una imagen rechazada devuelve toda la solicitud al principio de la cola.',
        ],
      },
      {
        en: [
          'Yellow fever certificate if you have transited an affected country',
          'Malaysia enforces this on arrival for travellers coming from or through listed countries, and refuses entry without it.',
        ],
        pt: [
          'Certificado de febre amarela se você passou por país afetado',
          'A Malásia cobra isso na chegada de quem vem de países listados ou passou por eles, e recusa a entrada sem o certificado.',
        ],
        es: [
          'Certificado de fiebre amarilla si ha transitado por un país afectado',
          'Malasia lo exige a la llegada a quien viene de países listados o ha pasado por ellos, y deniega la entrada sin él.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Check the number of days the officer actually granted',
          'The maximum for your nationality is a ceiling, not an entitlement. The stamp decides, and overstay is calculated from it.',
        ],
        pt: [
          'Conferir quantos dias o oficial realmente concedeu',
          'O máximo da sua nacionalidade é um teto, não um direito. O carimbo decide, e o overstay é calculado a partir dele.',
        ],
        es: [
          'Comprobar cuántos días concedió realmente el oficial',
          'El máximo de su nacionalidad es un techo, no un derecho. El sello decide, y la estancia irregular se calcula desde él.',
        ],
      },
      {
        en: [
          'Do not work or run a business on this pass',
          'It covers tourism, family visits, meetings and conferences. Any paid activity, including for a foreign employer while sitting in Malaysia, falls outside it.',
        ],
        pt: [
          'Não trabalhar nem tocar um negócio com este pass',
          'Ele cobre turismo, visita a familiares, reuniões e conferências. Qualquer atividade remunerada, inclusive para empregador estrangeiro estando na Malásia, fica fora dele.',
        ],
        es: [
          'No trabajar ni llevar un negocio con este pase',
          'Cubre turismo, visitas familiares, reuniones y congresos. Cualquier actividad remunerada, incluso para un empleador extranjero estando en Malasia, queda fuera.',
        ],
      },
      {
        en: [
          'Treat an extension as discretionary, not routine',
          'Extensions are applied for at an immigration office before expiry and are commonly refused for nationalities that already receive the longest pass.',
        ],
        pt: [
          'Tratar a extensão como discricionária, não como rotina',
          'A extensão é pedida num escritório de imigração antes do vencimento e costuma ser negada para nacionalidades que já recebem o pass mais longo.',
        ],
        es: [
          'Tratar la prórroga como discrecional, no como rutina',
          'La prórroga se solicita en una oficina de inmigración antes del vencimiento y suele denegarse a nacionalidades que ya reciben el pase más largo.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Avoid a pattern of short exits and immediate returns',
          'Hopping to a neighbouring country to reset the pass is visible in the system, and repeated resets lead to a shorter pass or refusal of entry.',
        ],
        pt: [
          'Evitar o padrão de saídas curtas com retorno imediato',
          'Pular para um país vizinho para reiniciar o pass fica visível no sistema, e reinícios repetidos levam a um pass mais curto ou à recusa de entrada.',
        ],
        es: [
          'Evitar el patrón de salidas cortas con regreso inmediato',
          'Saltar a un país vecino para reiniciar el pase queda visible en el sistema, y los reinicios repetidos llevan a un pase más corto o a la denegación de entrada.',
        ],
      },
      {
        en: [
          'Settle any overstay before departure',
          'Overstaying is a compoundable offence with a daily charge and, past a threshold, a blacklist entry that blocks return for years.',
        ],
        pt: [
          'Resolver qualquer overstay antes de partir',
          'Ficar além do prazo é infração passível de composição com cobrança diária e, acima de certo limite, inclusão numa lista negra que bloqueia o retorno por anos.',
        ],
        es: [
          'Resolver cualquier exceso de estancia antes de salir',
          'Exceder el plazo es una infracción con cargo diario y, superado cierto umbral, una inclusión en lista negra que bloquea el regreso durante años.',
        ],
      },
    ],
  },

  'Employment Pass': {
    core_documents: [
      {
        en: [
          'Passport with long remaining validity',
          'The pass is never granted for longer than the passport allows, so a passport expiring next year caps a two-year contract at one.',
        ],
        pt: [
          'Passaporte com longa validade restante',
          'O pass nunca é concedido por mais tempo do que o passaporte permite, então um passaporte que vence no ano que vem limita a um ano um contrato de dois.',
        ],
        es: [
          'Pasaporte con amplia vigencia restante',
          'El pase nunca se concede por más tiempo del que permite el pasaporte, así que un pasaporte que caduca el año próximo limita a uno un contrato de dos años.',
        ],
      },
      {
        en: [
          'Employer registration with the Expatriate Services Division',
          'Your company must first be registered as an employer of expatriates. Nothing about your application can start before that account exists.',
        ],
        pt: [
          'Registo do empregador na Expatriate Services Division',
          'A sua empresa precisa primeiro estar registada como empregadora de expatriados. Nada do seu pedido pode começar antes de essa conta existir.',
        ],
        es: [
          'Registro del empleador en la Expatriate Services Division',
          'Su empresa debe estar primero registrada como empleadora de expatriados. Nada de su solicitud puede empezar antes de que exista esa cuenta.',
        ],
      },
      {
        en: [
          'Approval from the regulator of the employer’s sector',
          'Manufacturing, oil and gas, finance and several other sectors have their own approving body that must clear the position before immigration sees it. This step surprises almost everyone.',
        ],
        pt: [
          'Aprovação do órgão regulador do setor do empregador',
          'Manufatura, óleo e gás, finanças e vários outros setores têm um órgão aprovador próprio que precisa liberar a vaga antes de a imigração ver o processo. Essa etapa surpreende quase todo mundo.',
        ],
        es: [
          'Aprobación del organismo regulador del sector del empleador',
          'Manufactura, petróleo y gas, finanzas y varios sectores más tienen un organismo aprobador propio que debe autorizar el puesto antes de que inmigración lo vea. Esa etapa sorprende a casi todos.',
        ],
      },
      {
        en: [
          'Identify which Employment Pass category applies',
          'Categories are set by salary band and contract length. The category determines the pass duration and whether you may bring dependants at all, so it is not a formality.',
        ],
        pt: [
          'Identificar qual categoria de Employment Pass se aplica',
          'As categorias são definidas por faixa salarial e duração do contrato. A categoria determina a validade do pass e se você pode trazer dependentes, então não é formalidade.',
        ],
        es: [
          'Identificar qué categoría de Employment Pass corresponde',
          'Las categorías se fijan por banda salarial y duración del contrato. La categoría determina la vigencia del pase y si puede traer dependientes, así que no es un trámite menor.',
        ],
      },
      {
        en: [
          'Signed employment contract with the Malaysian entity',
          'It has to state the job title, the salary and a term consistent with the category being applied for.',
        ],
        pt: [
          'Contrato de trabalho assinado com a entidade malaia',
          'Precisa indicar o cargo, o salário e um prazo coerente com a categoria pedida.',
        ],
        es: [
          'Contrato de trabajo firmado con la entidad malaya',
          'Debe indicar el cargo, el salario y un plazo coherente con la categoría solicitada.',
        ],
      },
      {
        en: [
          'Expatriate post approval for the position',
          'The company obtains permission for the role itself, separately from permission for you as the person filling it.',
        ],
        pt: [
          'Aprovação do posto de expatriado para a vaga',
          'A empresa obtém permissão para a própria função, separadamente da permissão para você como a pessoa que a ocupa.',
        ],
        es: [
          'Aprobación del puesto de expatriado para la vacante',
          'La empresa obtiene permiso para el puesto en sí, aparte del permiso para usted como la persona que lo ocupa.',
        ],
      },
      {
        en: [
          'Company incorporation and shareholding documents',
          'Registration certificate, latest returns and the ownership structure, because the capital requirement depends on whether the company is locally or foreign owned.',
        ],
        pt: [
          'Documentos de constituição e composição societária da empresa',
          'Certidão de registo, últimas declarações e a estrutura de propriedade, porque a exigência de capital depende de a empresa ser de capital local ou estrangeiro.',
        ],
        es: [
          'Documentos de constitución y accionariado de la empresa',
          'Certificado de registro, últimas declaraciones y la estructura de propiedad, porque el requisito de capital depende de si la empresa es de capital local o extranjero.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Degree certificate and academic transcripts',
          'Verified against the issuing institution. A degree from an unaccredited or unverifiable institution stops the file dead.',
        ],
        pt: [
          'Diploma e histórico escolar',
          'Verificados junto à instituição emissora. Um diploma de instituição não credenciada ou não verificável trava o processo por completo.',
        ],
        es: [
          'Título y expediente académico',
          'Verificados con la institución emisora. Un título de una institución no acreditada o no verificable detiene el expediente por completo.',
        ],
      },
      {
        en: [
          'Documented years of relevant experience',
          'The number of years required rises as the qualification level falls, so experience can substitute for a degree only up to a point.',
        ],
        pt: [
          'Anos de experiência relevante documentados',
          'O número de anos exigido sobe conforme o nível de qualificação cai, então a experiência substitui o diploma apenas até certo ponto.',
        ],
        es: [
          'Años de experiencia relevante documentados',
          'El número de años exigido sube a medida que baja el nivel de titulación, así que la experiencia sustituye al título solo hasta cierto punto.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Salary at or above the floor for the category',
          'Each category has a minimum monthly salary, and being a small amount short pushes you into a shorter, more restricted category. Check the figure currently in force.',
        ],
        pt: [
          'Salário igual ou acima do piso da categoria',
          'Cada categoria tem um salário mensal mínimo, e ficar um pouco abaixo empurra você para uma categoria mais curta e restrita. Confira o valor em vigor.',
        ],
        es: [
          'Salario igual o superior al piso de la categoría',
          'Cada categoría tiene un salario mensual mínimo, y quedarse un poco por debajo le empuja a una categoría más corta y restringida. Compruebe la cifra en vigor.',
        ],
      },
      {
        en: [
          'Employer paid-up capital at the required level',
          'The minimum depends on the ownership structure: wholly local, joint venture or wholly foreign owned companies face different thresholds.',
        ],
        pt: [
          'Capital integralizado do empregador no nível exigido',
          'O mínimo depende da estrutura societária: empresas totalmente locais, joint ventures ou de capital totalmente estrangeiro enfrentam patamares diferentes.',
        ],
        es: [
          'Capital desembolsado del empleador en el nivel exigido',
          'El mínimo depende de la estructura de propiedad: empresas totalmente locales, joint ventures o de capital totalmente extranjero afrontan umbrales distintos.',
        ],
      },
      {
        en: [
          'Annual levy and pass issuance charges',
          'Paid by the employer for every year of the pass, on top of the processing charge, and again for each dependant pass.',
        ],
        pt: [
          'Levy anual e taxas de emissão do pass',
          'Pagos pelo empregador por cada ano do pass, além da taxa de processamento, e novamente por cada pass de dependente.',
        ],
        es: [
          'Levy anual y tasas de emisión del pase',
          'Los paga el empleador por cada año del pase, además del cargo de tramitación, y de nuevo por cada pase de dependiente.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Employer submits the application through the online system',
          'You cannot lodge it yourself, and there is no walk-in counter for the applicant. Everything moves at the employer’s pace.',
        ],
        pt: [
          'O empregador submete o pedido pelo sistema online',
          'Você não pode protocolar sozinho, e não há guichê presencial para o requerente. Tudo anda no ritmo do empregador.',
        ],
        es: [
          'El empleador presenta la solicitud por el sistema en línea',
          'Usted no puede presentarla por su cuenta, y no hay ventanilla presencial para el solicitante. Todo avanza al ritmo del empleador.',
        ],
      },
      {
        en: [
          'Wait for the approval letter, then the visa with reference',
          'Approval alone does not let you fly. Nationals who need a visa must then collect a reference visa at a Malaysian mission before travelling.',
        ],
        pt: [
          'Aguardar a carta de aprovação e depois o visto com referência',
          'A aprovação sozinha não permite voar. Quem precisa de visto tem então de retirar um visto com referência numa missão malaia antes de viajar.',
        ],
        es: [
          'Esperar la carta de aprobación y luego el visado con referencia',
          'La aprobación por sí sola no permite volar. Quien necesita visado debe recoger después un visado con referencia en una misión malaya antes de viajar.',
        ],
      },
      {
        en: [
          'Enter Malaysia only after the reference visa is issued',
          'Arriving as a tourist to convert the status on the spot does not work; the pass has to be endorsed against the reference visa.',
        ],
        pt: [
          'Entrar na Malásia só depois de emitido o visto com referência',
          'Chegar como turista para converter o status no local não funciona; o pass precisa ser endossado contra o visto com referência.',
        ],
        es: [
          'Entrar en Malasia solo después de emitido el visado con referencia',
          'Llegar como turista para convertir el estatus sobre la marcha no funciona; el pase debe endosarse contra el visado con referencia.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical examination at an approved clinic',
          'Carried out at a panel clinic and submitted before the pass is endorsed. A failed screening ends the application rather than delaying it.',
        ],
        pt: [
          'Exame médico em clínica credenciada',
          'Realizado em clínica do painel e entregue antes do endosso do pass. Uma triagem reprovada encerra o pedido em vez de apenas atrasá-lo.',
        ],
        es: [
          'Examen médico en una clínica acreditada',
          'Se realiza en una clínica del panel y se entrega antes del endoso del pase. Un cribado no superado termina la solicitud en lugar de retrasarla.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Have the pass endorsed shortly after arrival',
          'There is a short deadline between entering on the reference visa and getting the pass stickered into the passport. Missing it invalidates the approval.',
        ],
        pt: [
          'Ter o pass endossado logo após a chegada',
          'Há um prazo curto entre entrar com o visto de referência e ter o pass colado no passaporte. Perdê-lo invalida a aprovação.',
        ],
        es: [
          'Hacer endosar el pase poco después de llegar',
          'Hay un plazo corto entre entrar con el visado de referencia y que el pase quede adherido al pasaporte. Perderlo invalida la aprobación.',
        ],
      },
      {
        en: [
          'Apply for dependant passes as a separate filing',
          'Spouse and children are not automatic and are unavailable in the lowest category. Each pass has its own fee and its own approval.',
        ],
        pt: [
          'Pedir os passes de dependentes como processo separado',
          'Cônjuge e filhos não são automáticos e ficam indisponíveis na categoria mais baixa. Cada pass tem taxa e aprovação próprias.',
        ],
        es: [
          'Solicitar los pases de dependientes como expediente aparte',
          'Cónyuge e hijos no son automáticos y no están disponibles en la categoría más baja. Cada pase tiene su propia tasa y aprobación.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Understand that the pass belongs to one employer',
          'Changing jobs means the old pass is cancelled and a new application is made from scratch; there is no transfer, and the gap between them is a gap in your legal status.',
        ],
        pt: [
          'Entender que o pass pertence a um único empregador',
          'Trocar de emprego significa cancelar o pass antigo e fazer um pedido novo do zero; não há transferência, e o intervalo entre eles é um vazio no seu status legal.',
        ],
        es: [
          'Entender que el pase pertenece a un solo empleador',
          'Cambiar de trabajo implica cancelar el pase anterior y presentar una solicitud nueva desde cero; no hay traspaso, y el intervalo entre ambos es un vacío en su estatus legal.',
        ],
      },
      {
        en: [
          'Start the renewal months before expiry',
          'Renewal repeats the sector approval and the medical, and an expired pass cannot be renewed, only replaced by a fresh application from outside the country.',
        ],
        pt: [
          'Iniciar a renovação meses antes do vencimento',
          'A renovação repete a aprovação setorial e o exame médico, e um pass vencido não pode ser renovado, apenas substituído por pedido novo feito de fora do país.',
        ],
        es: [
          'Iniciar la renovación meses antes del vencimiento',
          'La renovación repite la aprobación sectorial y el examen médico, y un pase caducado no puede renovarse, solo sustituirse por una solicitud nueva desde fuera del país.',
        ],
      },
      {
        en: [
          'Cancel the pass properly when you leave the country',
          'An uncancelled pass leaves you recorded as present in Malaysia and blocks any future application. The employer files the cancellation; make sure it happened.',
        ],
        pt: [
          'Cancelar o pass corretamente ao deixar o país',
          'Um pass não cancelado deixa você registado como presente na Malásia e bloqueia qualquer pedido futuro. O empregador protocola o cancelamento; garanta que aconteceu.',
        ],
        es: [
          'Cancelar el pase correctamente al salir del país',
          'Un pase sin cancelar le deja registrado como presente en Malasia y bloquea cualquier solicitud futura. El empleador presenta la cancelación; asegúrese de que ocurrió.',
        ],
      },
      {
        en: [
          'Track your days for tax residency',
          'Crossing the day threshold in a calendar year changes your rate sharply, and the first partial year is often taxed at the non-resident rate.',
        ],
        pt: [
          'Acompanhar os seus dias para a residência fiscal',
          'Cruzar o limite de dias no ano civil muda bastante a sua alíquota, e o primeiro ano parcial costuma ser tributado à alíquota de não residente.',
        ],
        es: [
          'Llevar la cuenta de sus días para la residencia fiscal',
          'Cruzar el umbral de días en el año natural cambia mucho su tipo impositivo, y el primer año parcial suele tributar al tipo de no residente.',
        ],
        priority: 2,
      },
    ],
  },

  'Malaysia My Second Home (MM2H)': {
    core_documents: [
      {
        en: [
          'Passport valid well beyond the application',
          'The pass is issued for a multi-year term and the passport has to support it; renewing mid-term means re-endorsing the pass.',
        ],
        pt: [
          'Passaporte válido bem além do pedido',
          'O pass é emitido por um prazo de vários anos e o passaporte precisa suportá-lo; renová-lo no meio do prazo obriga a reendossar o pass.',
        ],
        es: [
          'Pasaporte vigente mucho más allá de la solicitud',
          'El pase se emite por un plazo de varios años y el pasaporte debe soportarlo; renovarlo a mitad de plazo obliga a reendosar el pase.',
        ],
      },
      {
        en: [
          'Choose the MM2H tier you are applying under',
          'The programme is split into tiers with different deposits, property values and pass lengths. The rules changed substantially, so guidance written for the old programme is misleading.',
        ],
        pt: [
          'Escolher o nível de MM2H sob o qual você vai pedir',
          'O programa é dividido em níveis com depósitos, valores de imóvel e durações de pass diferentes. As regras mudaram bastante, então orientações escritas para o programa antigo enganam.',
        ],
        es: [
          'Elegir el nivel de MM2H bajo el que va a solicitar',
          'El programa está dividido en niveles con depósitos, valores de inmueble y duraciones de pase distintos. Las reglas cambiaron mucho, así que las guías escritas para el programa anterior confunden.',
        ],
      },
      {
        en: [
          'Engage a licensed MM2H agent',
          'Applications are only accepted through agents licensed for the programme. Their fee is on top of every government charge and is not regulated.',
        ],
        pt: [
          'Contratar um agente MM2H licenciado',
          'Os pedidos só são aceitos por meio de agentes licenciados para o programa. O honorário deles vem por cima de toda taxa governamental e não é regulado.',
        ],
        es: [
          'Contratar a un agente MM2H con licencia',
          'Las solicitudes solo se aceptan a través de agentes con licencia para el programa. Sus honorarios se suman a cada tasa gubernamental y no están regulados.',
        ],
      },
      {
        en: [
          'Letter of good conduct from your country of residence',
          'Issued by the police or the relevant authority, recent, and covering the countries where you have lived rather than only your nationality.',
        ],
        pt: [
          'Certidão de bons antecedentes do seu país de residência',
          'Emitida pela polícia ou pela autoridade competente, recente, e cobrindo os países onde você morou, não apenas a sua nacionalidade.',
        ],
        es: [
          'Certificado de buena conducta de su país de residencia',
          'Emitido por la policía o la autoridad competente, reciente, y que cubra los países donde ha vivido, no solo su nacionalidad.',
        ],
      },
      {
        en: [
          'Letter of intent and personal profile',
          'A written statement of why you want to live in Malaysia and what you will do there, submitted with a curriculum vitae.',
        ],
        pt: [
          'Carta de intenção e perfil pessoal',
          'Uma declaração escrita de por que você quer viver na Malásia e o que fará lá, entregue com um currículo.',
        ],
        es: [
          'Carta de intención y perfil personal',
          'Una declaración escrita de por qué quiere vivir en Malasia y qué hará allí, presentada junto con un currículum.',
        ],
      },
      {
        en: [
          'Marriage and birth certificates for accompanying family',
          'Legalised and translated. Parents and, in the higher tiers, a wider set of dependants can be included on one file.',
        ],
        pt: [
          'Certidões de casamento e de nascimento dos familiares acompanhantes',
          'Legalizadas e traduzidas. Pais e, nos níveis mais altos, um conjunto mais amplo de dependentes podem entrar num único processo.',
        ],
        es: [
          'Certificados de matrimonio y nacimiento de los familiares acompañantes',
          'Legalizados y traducidos. Padres y, en los niveles más altos, un conjunto más amplio de dependientes pueden ir en un solo expediente.',
        ],
      },
      {
        en: [
          'Check whether the Sarawak programme suits you better',
          'Sarawak runs its own version with separate criteria and a separate authority, and holding one does not give rights in the other territory.',
        ],
        pt: [
          'Verificar se o programa de Sarawak serve melhor a você',
          'Sarawak mantém a própria versão, com critérios e autoridade separados, e ter uma não dá direitos no outro território.',
        ],
        es: [
          'Comprobar si el programa de Sarawak le conviene más',
          'Sarawak mantiene su propia versión, con criterios y autoridad separados, y tener una no da derechos en el otro territorio.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Fixed deposit in a Malaysian bank at the tier level',
          'Placed after conditional approval and locked. A portion may be released later for approved purposes such as medical care or education, but the balance must remain.',
        ],
        pt: [
          'Depósito a prazo em banco malaio no valor do nível',
          'Feito após a aprovação condicional e bloqueado. Uma parte pode ser liberada depois para fins aprovados, como saúde ou educação, mas o saldo precisa permanecer.',
        ],
        es: [
          'Depósito a plazo en un banco malayo según el nivel',
          'Se constituye tras la aprobación condicional y queda bloqueado. Una parte puede liberarse después para fines aprobados, como salud o educación, pero el saldo debe permanecer.',
        ],
      },
      {
        en: [
          'Offshore income at the monthly level required',
          'Income has to originate outside Malaysia and be evidenced over a sustained period, not shown as a single transfer.',
        ],
        pt: [
          'Renda offshore no nível mensal exigido',
          'A renda precisa ter origem fora da Malásia e ser comprovada ao longo de um período contínuo, não apresentada como uma transferência única.',
        ],
        es: [
          'Ingresos offshore en el nivel mensual exigido',
          'Los ingresos deben originarse fuera de Malasia y acreditarse durante un periodo sostenido, no mostrarse como una única transferencia.',
        ],
      },
      {
        en: [
          'Purchase of residential property at the minimum value',
          'The higher tiers require buying property above a set value and holding it for a minimum period, which removes the flexibility the old programme had.',
        ],
        pt: [
          'Compra de imóvel residencial no valor mínimo',
          'Os níveis mais altos exigem comprar imóvel acima de um valor definido e mantê-lo por um período mínimo, o que tira a flexibilidade que o programa antigo tinha.',
        ],
        es: [
          'Compra de vivienda por el valor mínimo exigido',
          'Los niveles más altos exigen comprar un inmueble por encima de un valor fijado y mantenerlo un periodo mínimo, lo que elimina la flexibilidad del programa anterior.',
        ],
      },
      {
        en: [
          'Participation fee, pass fee and agent charges',
          'Three separate costs, payable per applicant and per dependant. Confirm all of them in the current guidelines before committing.',
        ],
        pt: [
          'Taxa de participação, taxa do pass e honorários do agente',
          'Três custos distintos, devidos por requerente e por dependente. Confirme todos nas diretrizes vigentes antes de se comprometer.',
        ],
        es: [
          'Tasa de participación, tasa del pase y honorarios del agente',
          'Tres costes distintos, debidos por solicitante y por dependiente. Confirme todos en las directrices vigentes antes de comprometerse.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Lodge the file with the programme’s one stop centre',
          'The agent submits to the centre run under the tourism ministry, which assesses the case before immigration is involved.',
        ],
        pt: [
          'Protocolar o processo no centro único do programa',
          'O agente entrega ao centro que funciona sob o ministério do turismo, que avalia o caso antes de a imigração entrar.',
        ],
        es: [
          'Presentar el expediente en el centro único del programa',
          'El agente lo entrega al centro que opera bajo el ministerio de turismo, que evalúa el caso antes de que intervenga inmigración.',
        ],
      },
      {
        en: [
          'Receive conditional approval and then satisfy the conditions',
          'The approval letter is not the pass. You then have a limited period to place the deposit, complete the medical and appear for endorsement.',
        ],
        pt: [
          'Receber a aprovação condicional e depois cumprir as condições',
          'A carta de aprovação não é o pass. Você tem então um prazo limitado para constituir o depósito, fazer o exame médico e comparecer para o endosso.',
        ],
        es: [
          'Recibir la aprobación condicional y luego cumplir las condiciones',
          'La carta de aprobación no es el pase. Después tiene un plazo limitado para constituir el depósito, hacer el examen médico y presentarse al endoso.',
        ],
      },
      {
        en: [
          'Travel to Malaysia for the pass endorsement',
          'The sticker is placed in the passport in Malaysia, so the process cannot be finished entirely from abroad.',
        ],
        pt: [
          'Viajar à Malásia para o endosso do pass',
          'O adesivo é colado no passaporte dentro da Malásia, então o processo não pode ser concluído inteiramente do exterior.',
        ],
        es: [
          'Viajar a Malasia para el endoso del pase',
          'La etiqueta se coloca en el pasaporte dentro de Malasia, así que el proceso no puede completarse por entero desde el extranjero.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical report from a Malaysian clinic',
          'A foreign medical report is not accepted for endorsement; the examination is repeated locally after arrival.',
        ],
        pt: [
          'Relatório médico de clínica malaia',
          'Um relatório médico estrangeiro não é aceito para o endosso; o exame é refeito localmente após a chegada.',
        ],
        es: [
          'Informe médico de una clínica malaya',
          'Un informe médico extranjero no se acepta para el endoso; el examen se repite localmente tras la llegada.',
        ],
      },
      {
        en: [
          'Medical insurance valid in Malaysia',
          'Required for the whole family on the pass, with waivers possible above a certain age or where cover is impossible to obtain.',
        ],
        pt: [
          'Seguro de saúde válido na Malásia',
          'Exigido para toda a família no pass, com dispensas possíveis acima de certa idade ou quando a cobertura for impossível de contratar.',
        ],
        es: [
          'Seguro médico válido en Malasia',
          'Exigido para toda la familia del pase, con exenciones posibles por encima de cierta edad o cuando la cobertura sea imposible de contratar.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Meet the minimum days in Malaysia each year',
          'The revised programme requires a cumulative number of days physically in the country per year. Treating MM2H as a visa you never use now costs you the pass.',
        ],
        pt: [
          'Cumprir o mínimo de dias na Malásia a cada ano',
          'O programa revisto exige um número cumulativo de dias fisicamente no país por ano. Tratar o MM2H como um visto que você nunca usa agora custa o pass.',
        ],
        es: [
          'Cumplir el mínimo de días en Malasia cada año',
          'El programa revisado exige un número acumulado de días físicamente en el país por año. Tratar el MM2H como un visado que nunca usa ahora le cuesta el pase.',
        ],
      },
      {
        en: [
          'Do not take employment on this pass',
          'MM2H is a residence programme, not a work route. Narrow exceptions exist for limited part-time work with prior approval, but a job requires an Employment Pass.',
        ],
        pt: [
          'Não aceitar emprego com este pass',
          'O MM2H é um programa de residência, não uma rota de trabalho. Há exceções estreitas para trabalho parcial limitado com aprovação prévia, mas um emprego exige Employment Pass.',
        ],
        es: [
          'No aceptar empleo con este pase',
          'MM2H es un programa de residencia, no una vía de trabajo. Hay excepciones estrechas para trabajo parcial limitado con aprobación previa, pero un empleo exige Employment Pass.',
        ],
      },
      {
        en: [
          'Keep the deposit and property in place for the whole term',
          'Withdrawing the deposit or selling the property before the holding period ends terminates the pass for you and everyone on it.',
        ],
        pt: [
          'Manter o depósito e o imóvel durante todo o prazo',
          'Sacar o depósito ou vender o imóvel antes do fim do período de retenção encerra o pass para você e para todos que estão nele.',
        ],
        es: [
          'Mantener el depósito y el inmueble durante todo el plazo',
          'Retirar el depósito o vender el inmueble antes de que acabe el periodo de tenencia termina el pase para usted y para todos los incluidos.',
        ],
      },
      {
        en: [
          'Renew at the end of the term and prove the conditions again',
          'Renewal is not automatic: the financial conditions, the insurance and the presence requirement are all re-examined against the rules in force then, not the rules you joined under.',
        ],
        pt: [
          'Renovar ao fim do prazo e comprovar as condições outra vez',
          'A renovação não é automática: condições financeiras, seguro e exigência de presença são reexaminados sob as regras vigentes na época, não as regras da sua adesão.',
        ],
        es: [
          'Renovar al final del plazo y volver a acreditar las condiciones',
          'La renovación no es automática: condiciones financieras, seguro y requisito de presencia se reexaminan bajo las reglas vigentes entonces, no bajo las de su adhesión.',
        ],
      },
      {
        en: [
          'Report changes in your family circumstances',
          'A dependant who marries, turns the age limit or is removed from the file loses their own pass, and this is not applied retroactively in your favour.',
        ],
        pt: [
          'Comunicar mudanças na situação familiar',
          'Um dependente que se casa, atinge o limite de idade ou sai do processo perde o próprio pass, e isso não é aplicado retroativamente a seu favor.',
        ],
        es: [
          'Comunicar los cambios en su situación familiar',
          'Un dependiente que se casa, alcanza el límite de edad o sale del expediente pierde su propio pase, y esto no se aplica retroactivamente a su favor.',
        ],
        priority: 2,
      },
    ],
  },

  'DE Rantau Nomad Pass': {
    core_documents: [
      {
        en: [
          'Passport valid for the full pass period',
          'The pass cannot outlast the passport, and a short-dated passport shortens the grant rather than delaying it.',
        ],
        pt: [
          'Passaporte válido por todo o período do pass',
          'O pass não pode durar mais que o passaporte, e um passaporte de validade curta encurta a concessão em vez de adiá-la.',
        ],
        es: [
          'Pasaporte vigente durante todo el periodo del pase',
          'El pase no puede durar más que el pasaporte, y un pasaporte con poca vigencia acorta la concesión en lugar de aplazarla.',
        ],
      },
      {
        en: [
          'Apply on the DE Rantau platform run by the digital agency',
          'The programme is administered by the national digital economy agency, not by an embassy, and the entire application is online with no agent involved.',
        ],
        pt: [
          'Pedir na plataforma DE Rantau operada pela agência digital',
          'O programa é administrado pela agência nacional de economia digital, não por uma embaixada, e todo o pedido é online, sem agente envolvido.',
        ],
        es: [
          'Solicitar en la plataforma DE Rantau operada por la agencia digital',
          'El programa lo administra la agencia nacional de economía digital, no una embajada, y toda la solicitud es en línea, sin agente de por medio.',
        ],
      },
      {
        en: [
          'Show that your work falls in an eligible digital field',
          'Software, cloud, cybersecurity, data, digital marketing and similar roles qualify. Remote work outside the listed fields is not covered, however well paid.',
        ],
        pt: [
          'Demonstrar que o seu trabalho está numa área digital elegível',
          'Software, cloud, cibersegurança, dados, marketing digital e funções similares qualificam. Trabalho remoto fora das áreas listadas não é coberto, por melhor que pague.',
        ],
        es: [
          'Demostrar que su trabajo está en un campo digital elegible',
          'Software, nube, ciberseguridad, datos, marketing digital y funciones similares califican. El trabajo remoto fuera de los campos listados no está cubierto, por bien pagado que esté.',
        ],
      },
      {
        en: [
          'Active contracts with clients or an employer abroad',
          'Freelancers are asked for several current contracts rather than one, to show the income is not about to disappear.',
        ],
        pt: [
          'Contratos ativos com clientes ou empregador no exterior',
          'De freelancers pedem vários contratos vigentes, e não apenas um, para mostrar que a renda não está prestes a desaparecer.',
        ],
        es: [
          'Contratos activos con clientes o un empleador en el extranjero',
          'A los autónomos se les piden varios contratos vigentes, no solo uno, para mostrar que el ingreso no está a punto de desaparecer.',
        ],
      },
      {
        en: [
          'Curriculum vitae and professional portfolio',
          'Used to confirm the field of work matches the contracts submitted; a mismatch between the two is a common reason for rejection.',
        ],
        pt: [
          'Currículo e portfólio profissional',
          'Usados para confirmar que a área de atuação bate com os contratos apresentados; a divergência entre os dois é motivo comum de rejeição.',
        ],
        es: [
          'Currículum y portafolio profesional',
          'Sirven para confirmar que el campo de trabajo coincide con los contratos presentados; el desajuste entre ambos es motivo común de rechazo.',
        ],
      },
      {
        en: [
          'Personal bond according to your nationality',
          'A refundable bond is lodged at a rate that varies by country of citizenship. It is not a fee, but it does have to be funded before endorsement.',
        ],
        pt: [
          'Fiança pessoal conforme a sua nacionalidade',
          'Uma caução reembolsável é depositada em valor que varia conforme o país de cidadania. Não é uma taxa, mas precisa estar paga antes do endosso.',
        ],
        es: [
          'Fianza personal según su nacionalidad',
          'Se deposita una fianza reembolsable cuyo importe varía según el país de ciudadanía. No es una tasa, pero debe estar pagada antes del endoso.',
        ],
      },
      {
        en: [
          'Dependant applications filed alongside the main one',
          'Spouse and children can be included, each with their own documents and their own charge, and adding them later is slower than doing it at once.',
        ],
        pt: [
          'Pedidos de dependentes apresentados junto com o principal',
          'Cônjuge e filhos podem ser incluídos, cada um com documentos e cobrança próprios, e acrescentá-los depois é mais lento do que fazer tudo de uma vez.',
        ],
        es: [
          'Solicitudes de dependientes presentadas junto con la principal',
          'Cónyuge e hijos pueden incluirse, cada uno con sus documentos y su cargo, y añadirlos después es más lento que hacerlo de una vez.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Annual income above the programme threshold',
          'Set in United States dollars and applied to the applicant alone, not to household income. Verify the current threshold on the official platform.',
        ],
        pt: [
          'Renda anual acima do patamar do programa',
          'Definida em dólares americanos e aplicada apenas ao requerente, não à renda do domicílio. Verifique o patamar vigente na plataforma oficial.',
        ],
        es: [
          'Ingresos anuales por encima del umbral del programa',
          'Fijado en dólares estadounidenses y aplicado solo al solicitante, no a la renta del hogar. Verifique el umbral vigente en la plataforma oficial.',
        ],
      },
      {
        en: [
          'Recent payslips, invoices and bank statements',
          'Several consecutive months, showing the money actually arriving. A contract stating a rate is not accepted as proof that you are paid it.',
        ],
        pt: [
          'Recibos, faturas e extratos bancários recentes',
          'Vários meses consecutivos, mostrando o dinheiro efetivamente entrando. Um contrato que declara um valor não é aceito como prova de que você o recebe.',
        ],
        es: [
          'Nóminas, facturas y extractos bancarios recientes',
          'Varios meses consecutivos, mostrando el dinero entrando de verdad. Un contrato que declara una tarifa no se acepta como prueba de que la cobra.',
        ],
      },
      {
        en: [
          'Tax documents from your country of residence',
          'They corroborate the declared income and are one of the few ways to evidence self-employed earnings convincingly.',
        ],
        pt: [
          'Documentos fiscais do seu país de residência',
          'Corroboram a renda declarada e são uma das poucas formas de comprovar de modo convincente os ganhos de autônomo.',
        ],
        es: [
          'Documentos fiscales de su país de residencia',
          'Corroboran los ingresos declarados y son una de las pocas formas de acreditar de modo convincente las ganancias de autónomo.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Submit directly, without an intermediary',
          'Unlike MM2H, no licensed agent is required, and paying one buys you nothing the platform does not already provide.',
        ],
        pt: [
          'Submeter diretamente, sem intermediário',
          'Ao contrário do MM2H, não é exigido agente licenciado, e pagar um não compra nada que a plataforma já não ofereça.',
        ],
        es: [
          'Presentar directamente, sin intermediario',
          'A diferencia de MM2H, no se exige agente con licencia, y pagar uno no le compra nada que la plataforma no ofrezca ya.',
        ],
      },
      {
        en: [
          'Pay the application charge for yourself and each dependant',
          'Charged per person and not refunded if the case is rejected. Confirm the current amounts before submitting.',
        ],
        pt: [
          'Pagar a taxa de pedido para você e para cada dependente',
          'Cobrada por pessoa e não devolvida se o caso for rejeitado. Confirme os valores vigentes antes de enviar.',
        ],
        es: [
          'Pagar el cargo de solicitud por usted y por cada dependiente',
          'Se cobra por persona y no se devuelve si el caso es rechazado. Confirme los importes vigentes antes de enviar.',
        ],
      },
      {
        en: [
          'Wait for the approval letter before booking flights',
          'Assessment usually takes weeks, and arriving as a tourist in anticipation puts you in the wrong status to complete the endorsement.',
        ],
        pt: [
          'Aguardar a carta de aprovação antes de comprar passagens',
          'A análise costuma levar semanas, e chegar como turista por antecipação coloca você no status errado para concluir o endosso.',
        ],
        es: [
          'Esperar la carta de aprobación antes de reservar vuelos',
          'La evaluación suele tardar semanas, y llegar como turista por adelantado le deja en el estatus equivocado para completar el endoso.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Health screening at an approved clinic after arrival',
          'Done in Malaysia and required before the pass is endorsed; the result is submitted by the clinic, not by you.',
        ],
        pt: [
          'Triagem de saúde em clínica credenciada após a chegada',
          'Feita na Malásia e exigida antes do endosso do pass; o resultado é enviado pela clínica, não por você.',
        ],
        es: [
          'Cribado de salud en una clínica acreditada tras la llegada',
          'Se hace en Malasia y se exige antes del endoso del pase; el resultado lo envía la clínica, no usted.',
        ],
      },
      {
        en: [
          'Health insurance covering your stay in Malaysia',
          'A policy valid in Malaysia for the whole pass period, for you and each dependant included on the file.',
        ],
        pt: [
          'Seguro de saúde cobrindo a sua estada na Malásia',
          'Uma apólice válida na Malásia por todo o período do pass, para você e para cada dependente incluído no processo.',
        ],
        es: [
          'Seguro de salud que cubra su estancia en Malasia',
          'Una póliza válida en Malasia durante todo el periodo del pase, para usted y para cada dependiente incluido en el expediente.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Complete the pass endorsement within the deadline after entry',
          'Approval and endorsement are different events. The pass only exists once it is placed in the passport at an immigration office.',
        ],
        pt: [
          'Concluir o endosso do pass no prazo após a entrada',
          'Aprovação e endosso são eventos distintos. O pass só existe quando é colocado no passaporte num escritório de imigração.',
        ],
        es: [
          'Completar el endoso del pase en el plazo tras la entrada',
          'Aprobación y endoso son eventos distintos. El pase solo existe cuando se coloca en el pasaporte en una oficina de inmigración.',
        ],
      },
      {
        en: [
          'Keep your income sources outside Malaysia',
          'Taking on a Malaysian employer or Malaysian clients is outside the pass; that work requires an Employment Pass instead.',
        ],
        pt: [
          'Manter as fontes de renda fora da Malásia',
          'Assumir um empregador ou clientes malaios está fora do pass; esse trabalho exige um Employment Pass em vez dele.',
        ],
        es: [
          'Mantener sus fuentes de ingresos fuera de Malasia',
          'Asumir un empleador o clientes malayos queda fuera del pase; ese trabajo exige un Employment Pass en su lugar.',
        ],
      },
      {
        en: [
          'Plan for the limited renewal window',
          'The pass is granted for a period of months up to a year or two and can be renewed only a limited number of times. It is not a path that keeps extending indefinitely.',
        ],
        pt: [
          'Planejar a janela limitada de renovação',
          'O pass é concedido por um período de meses até um ou dois anos e pode ser renovado apenas um número limitado de vezes. Não é um caminho que se estende indefinidamente.',
        ],
        es: [
          'Planificar la ventana limitada de renovación',
          'El pase se concede por un periodo de meses hasta uno o dos años y solo puede renovarse un número limitado de veces. No es una vía que se extienda indefinidamente.',
        ],
      },
      {
        en: [
          'Watch the day count that makes you a tax resident',
          'Spending more than half the year in Malaysia changes your tax position there, and may also affect residency in the country you left.',
        ],
        pt: [
          'Acompanhar a contagem de dias que torna você residente fiscal',
          'Passar mais de meio ano na Malásia muda a sua posição fiscal lá, e pode afetar também a residência no país que você deixou.',
        ],
        es: [
          'Vigilar el conteo de días que le convierte en residente fiscal',
          'Pasar más de medio año en Malasia cambia su posición fiscal allí, y puede afectar también a la residencia en el país que dejó.',
        ],
      },
      {
        en: [
          'Note that this pass does not lead to permanent residence',
          'Time on the nomad pass builds nothing towards settlement, so anyone planning to stay long term should be moving to another route in parallel.',
        ],
        pt: [
          'Saber que este pass não leva à residência permanente',
          'O tempo no pass de nômade não constrói nada rumo à fixação, então quem planeja ficar a longo prazo deve estar migrando para outra rota em paralelo.',
        ],
        es: [
          'Saber que este pase no conduce a la residencia permanente',
          'El tiempo en el pase de nómada no construye nada hacia el arraigo, así que quien planee quedarse a largo plazo debería estar migrando a otra vía en paralelo.',
        ],
        priority: 2,
      },
    ],
  },
};
