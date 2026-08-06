import type { CountryVisaSteps } from './types';

/**
 * Steps for Thailand.
 *
 * Three facts shape almost every long stay. The first is the ninety-day
 * report: anyone who stays continuously for more than ninety days has to tell
 * immigration where they live, again and again, for as long as they remain.
 * It generates more fines than any other rule in the country because nothing
 * reminds you of it.
 *
 * The second is the re-entry permit. A one-year extension of stay dies the
 * moment you leave the country without one, and the airport counter will not
 * warn you. The third is that the visa and the right to work are separate
 * instruments: a Non-Immigrant B lets you enter, and only the work permit the
 * employer obtains afterwards lets you earn.
 */
export const thailand: CountryVisaSteps = {
  'Tourist Visa / Visa Exemption': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Validity has to extend well past the intended stay, and the check happens at the boarding gate as well as at immigration.',
        ],
        pt: [
          'Passaporte válido',
          'A validade precisa ir bem além da estada pretendida, e a conferência acontece tanto no portão de embarque quanto na imigração.',
        ],
        es: [
          'Pasaporte vigente',
          'La vigencia debe superar con holgura la estancia prevista, y la comprobación ocurre tanto en la puerta de embarque como en inmigración.',
        ],
      },
      {
        en: [
          'Decide between visa exemption and a tourist visa',
          'Many nationalities enter without a visa, but the exemption grants a shorter stay than the tourist visa. Choosing the exemption because it is easier can cost you weeks.',
        ],
        pt: [
          'Decidir entre isenção de visto e visto de turista',
          'Muitas nacionalidades entram sem visto, mas a isenção concede estada mais curta do que o visto de turista. Escolher a isenção por ser mais fácil pode custar semanas.',
        ],
        es: [
          'Decidir entre exención de visado y visado de turista',
          'Muchas nacionalidades entran sin visado, pero la exención concede una estancia más corta que el visado de turista. Elegir la exención por comodidad puede costarle semanas.',
        ],
      },
      {
        en: [
          'Thailand Digital Arrival Card (TDAC)',
          'Filed online shortly before arrival by every traveller, including those entering visa-free. It replaced the paper arrival card and airlines increasingly check it at check-in.',
        ],
        pt: [
          'Cartão de chegada digital da Tailândia (TDAC)',
          'Preenchido online pouco antes da chegada por todo viajante, inclusive quem entra sem visto. Substituiu o cartão de papel e as companhias aéreas cada vez mais conferem no check-in.',
        ],
        es: [
          'Tarjeta de llegada digital de Tailandia (TDAC)',
          'Se presenta en línea poco antes de llegar por cada viajero, incluidos los que entran sin visado. Sustituyó a la tarjeta de papel y las aerolíneas la comprueban cada vez más en el check-in.',
        ],
      },
      {
        en: [
          'Tourist visa application on the official e-Visa portal',
          'Thai missions no longer take walk-in tourist applications in most countries; the whole file is uploaded and the visa arrives as a PDF.',
        ],
        pt: [
          'Pedido de visto de turista no portal oficial de e-Visa',
          'As missões tailandesas já não aceitam pedidos presenciais de turismo na maioria dos países; o processo inteiro é enviado online e o visto chega em PDF.',
        ],
        es: [
          'Solicitud de visado de turista en el portal oficial de e-Visa',
          'Las misiones tailandesas ya no aceptan solicitudes presenciales de turismo en la mayoría de los países; todo el expediente se sube y el visado llega en PDF.',
        ],
      },
      {
        en: [
          'Confirmed onward or return travel',
          'Airlines are fined for carrying a passenger who is refused entry, so they enforce this harder than immigration does. A one-way ticket is the most common reason for being denied boarding.',
        ],
        pt: [
          'Passagem de saída ou de volta confirmada',
          'As companhias aéreas são multadas por transportar passageiro que tenha entrada recusada, então cobram isso com mais rigor que a própria imigração. A passagem só de ida é o motivo mais comum de embarque negado.',
        ],
        es: [
          'Billete de salida o de regreso confirmado',
          'Las aerolíneas son multadas por transportar a un pasajero al que se le deniega la entrada, así que lo exigen con más rigor que la propia inmigración. El billete de solo ida es el motivo más común de embarque denegado.',
        ],
      },
      {
        en: [
          'Address of your first accommodation in Thailand',
          'Needed for the arrival card and asked for at the counter; it also has to match what your hotel or landlord reports to immigration.',
        ],
        pt: [
          'Endereço da primeira acomodação na Tailândia',
          'Necessário no cartão de chegada e perguntado no guichê; também precisa bater com o que o hotel ou o senhorio informa à imigração.',
        ],
        es: [
          'Dirección del primer alojamiento en Tailandia',
          'Necesaria en la tarjeta de llegada y se pregunta en la ventanilla; además debe coincidir con lo que el hotel o el arrendador comunica a inmigración.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of funds at the level set for your entry type',
          'There is a per-person amount, higher for families, that officers may ask to see in cash or on a statement. Check the figure currently published before you fly.',
        ],
        pt: [
          'Comprovação de recursos no nível exigido para o seu tipo de entrada',
          'Há um valor por pessoa, maior para famílias, que o oficial pode pedir em dinheiro ou em extrato. Confira o número em vigor antes de viajar.',
        ],
        es: [
          'Prueba de fondos en el nivel exigido para su tipo de entrada',
          'Hay un importe por persona, mayor para familias, que el oficial puede pedir en efectivo o en extracto. Compruebe la cifra vigente antes de volar.',
        ],
      },
      {
        en: [
          'Bank statement with a real transaction history',
          'A single large deposit made days before applying reads as borrowed money and is a frequent cause of refusal on the e-Visa.',
        ],
        pt: [
          'Extrato bancário com histórico real de movimentação',
          'Um único depósito grande feito poucos dias antes do pedido soa como dinheiro emprestado e é causa frequente de recusa no e-Visa.',
        ],
        es: [
          'Extracto bancario con historial real de movimientos',
          'Un único ingreso grande hecho pocos días antes de solicitar parece dinero prestado y es causa frecuente de denegación en el e-Visa.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Pay the tourist visa fee online',
          'Charged per application and not refunded if the visa is refused. Rates differ between single and multiple entry; confirm the current one on the portal.',
        ],
        pt: [
          'Pagar a taxa do visto de turista online',
          'Cobrada por pedido e não devolvida em caso de recusa. Os valores diferem entre entrada única e múltipla; confirme o vigente no portal.',
        ],
        es: [
          'Pagar la tasa del visado de turista en línea',
          'Se cobra por solicitud y no se devuelve si se deniega. Las tarifas difieren entre entrada única y múltiple; confirme la vigente en el portal.',
        ],
      },
      {
        en: [
          'Submit and wait for the e-Visa decision',
          'Usually a matter of days to a couple of weeks, but it slows sharply in the high season around the end of the year.',
        ],
        pt: [
          'Enviar e aguardar a decisão do e-Visa',
          'Em geral de alguns dias a duas semanas, mas fica bem mais lento na alta temporada, perto do fim do ano.',
        ],
        es: [
          'Enviar y esperar la resolución del e-Visa',
          'Por lo general de unos días a dos semanas, pero se ralentiza mucho en temporada alta, cerca de fin de año.',
        ],
      },
      {
        en: [
          'Enter before the visa validity expires, not before the stay ends',
          'The validity on the visa is the deadline to arrive. The length of stay is a separate number, counted from the day you land. Confusing the two is the classic mistake.',
        ],
        pt: [
          'Entrar antes de expirar a validade do visto, não o prazo de estada',
          'A validade no visto é o prazo para chegar. A duração da estada é outro número, contado do dia em que você pousa. Confundir os dois é o erro clássico.',
        ],
        es: [
          'Entrar antes de que caduque la validez del visado, no la estancia',
          'La validez del visado es el plazo para llegar. La duración de la estancia es otro número, contado desde el día en que aterriza. Confundirlos es el error clásico.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Digital photograph meeting the portal specification',
          'The e-Visa rejects photographs with shadows, glasses or a coloured background, and a rejected upload restarts the queue position.',
        ],
        pt: [
          'Fotografia digital conforme a especificação do portal',
          'O e-Visa rejeita fotos com sombras, óculos ou fundo colorido, e um envio rejeitado devolve você ao fim da fila.',
        ],
        es: [
          'Fotografía digital según la especificación del portal',
          'El e-Visa rechaza fotos con sombras, gafas o fondo de color, y una carga rechazada le devuelve al final de la cola.',
        ],
      },
      {
        en: [
          'Travel medical insurance',
          'Not compulsory for tourists, but private hospitals require payment or a guarantee upfront and a motorbike accident is the single most common claim.',
        ],
        pt: [
          'Seguro médico de viagem',
          'Não é obrigatório para turistas, mas os hospitais privados exigem pagamento ou garantia antecipada, e acidente de moto é de longe o sinistro mais comum.',
        ],
        es: [
          'Seguro médico de viaje',
          'No es obligatorio para turistas, pero los hospitales privados exigen pago o garantía por adelantado, y el accidente de moto es con diferencia el siniestro más común.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Read the date the officer writes in your passport',
          'The stamp, not the visa, fixes your last legal day. Officers sometimes grant less than the maximum, and overstay is counted from that handwritten date.',
        ],
        pt: [
          'Ler a data que o oficial escreve no seu passaporte',
          'O carimbo, e não o visto, fixa o seu último dia legal. Às vezes o oficial concede menos que o máximo, e o overstay é contado a partir dessa data manuscrita.',
        ],
        es: [
          'Leer la fecha que el oficial escribe en su pasaporte',
          'El sello, y no el visado, fija su último día legal. A veces el oficial concede menos del máximo, y la estancia irregular se cuenta desde esa fecha manuscrita.',
        ],
      },
      {
        en: [
          'Extend once at an immigration office if you need longer',
          'A single extension of a few weeks is normally granted for a fee at any provincial immigration office, but only while the current permission is still valid.',
        ],
        pt: [
          'Estender uma vez num escritório de imigração se precisar de mais tempo',
          'Uma única extensão de algumas semanas costuma ser concedida mediante taxa em qualquer escritório provincial de imigração, mas só enquanto a permissão atual ainda for válida.',
        ],
        es: [
          'Ampliar una vez en una oficina de inmigración si necesita más tiempo',
          'Suele concederse una única prórroga de algunas semanas mediante tasa en cualquier oficina provincial de inmigración, pero solo mientras el permiso actual siga vigente.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Never overstay, even by one day',
          'A daily fine applies immediately, and beyond certain thresholds Thailand imposes multi-year entry bans that no later visa can override.',
        ],
        pt: [
          'Nunca ficar além do prazo, nem por um dia',
          'A multa diária começa de imediato, e acima de certos limites a Tailândia aplica proibições de entrada de vários anos que nenhum visto posterior desfaz.',
        ],
        es: [
          'Nunca exceder el plazo, ni un solo día',
          'La multa diaria empieza de inmediato, y por encima de ciertos umbrales Tailandia impone prohibiciones de entrada de varios años que ningún visado posterior anula.',
        ],
      },
      {
        en: [
          'Do not work, including remote work for a foreign client',
          'Any work performed on Thai soil legally requires a work permit, whoever pays for it. Enforcement against remote workers is uneven but the rule is not.',
        ],
        pt: [
          'Não trabalhar, inclusive remotamente para cliente estrangeiro',
          'Qualquer trabalho realizado em solo tailandês legalmente exige autorização de trabalho, seja quem for que pague. A fiscalização sobre nômades é irregular, mas a regra não é.',
        ],
        es: [
          'No trabajar, ni siquiera en remoto para un cliente extranjero',
          'Cualquier trabajo realizado en suelo tailandés exige legalmente un permiso de trabajo, sin importar quién lo pague. La fiscalización sobre nómadas es despareja, la norma no.',
        ],
      },
      {
        en: [
          'Limit consecutive land border crossings',
          'Entries by land under the visa exemption are capped per calendar year, and a pattern of back-to-back border runs draws refusal of entry.',
        ],
        pt: [
          'Limitar as travessias terrestres consecutivas',
          'As entradas por via terrestre com isenção de visto são limitadas por ano civil, e um padrão de border runs seguidos leva à recusa de entrada.',
        ],
        es: [
          'Limitar los cruces terrestres consecutivos',
          'Las entradas por vía terrestre con exención de visado están limitadas por año natural, y un patrón de border runs seguidos provoca la denegación de entrada.',
        ],
      },
    ],
  },

  'Non-Immigrant Visa (B, O, ED)': {
    core_documents: [
      {
        en: [
          'Passport with enough blank pages for the extensions',
          'Each yearly extension, re-entry permit and ninety-day slip takes space. Renewing the passport mid-stay means transferring the stamps at immigration.',
        ],
        pt: [
          'Passaporte com páginas em branco suficientes para as extensões',
          'Cada extensão anual, permissão de reentrada e comprovante de noventa dias ocupa espaço. Renovar o passaporte no meio da estada obriga a transferir os carimbos na imigração.',
        ],
        es: [
          'Pasaporte con suficientes páginas en blanco para las prórrogas',
          'Cada prórroga anual, permiso de reentrada y comprobante de noventa días ocupa espacio. Renovar el pasaporte a mitad de estancia obliga a trasladar los sellos en inmigración.',
        ],
      },
      {
        en: [
          'Identify the correct sub-category before applying',
          'B is for business and employment, O covers family, retirement and volunteering, ED covers study. The category cannot be switched after issue without leaving and starting again.',
        ],
        pt: [
          'Identificar a subcategoria correta antes de pedir',
          'B é para negócios e emprego, O cobre família, aposentadoria e voluntariado, ED cobre estudo. A categoria não pode ser trocada depois da emissão sem sair e recomeçar.',
        ],
        es: [
          'Identificar la subcategoría correcta antes de solicitar',
          'B es para negocios y empleo, O cubre familia, jubilación y voluntariado, ED cubre estudios. La categoría no puede cambiarse tras la emisión sin salir y empezar de nuevo.',
        ],
      },
      {
        en: [
          'Invitation letter from the Thai employer or institution',
          'On letterhead, signed, naming the position or the course. This is what ties your file to a real sponsor in Thailand.',
        ],
        pt: [
          'Carta-convite do empregador ou da instituição tailandesa',
          'Em papel timbrado, assinada, indicando o cargo ou o curso. É o que liga o seu processo a um patrocinador real na Tailândia.',
        ],
        es: [
          'Carta de invitación del empleador o la institución tailandesa',
          'En papel con membrete, firmada, indicando el puesto o el curso. Es lo que vincula su expediente a un patrocinador real en Tailandia.',
        ],
      },
      {
        en: [
          'Corporate documents of the Thai sponsor',
          'Company registration, list of shareholders, VAT registration and the latest financial statements. A company with weak filings cannot support a work permit later.',
        ],
        pt: [
          'Documentos societários do patrocinador tailandês',
          'Registo da empresa, lista de acionistas, inscrição no VAT e as demonstrações financeiras mais recentes. Uma empresa com escrituração fraca não sustenta a autorização de trabalho depois.',
        ],
        es: [
          'Documentos societarios del patrocinador tailandés',
          'Registro de la empresa, lista de accionistas, alta en el VAT y los últimos estados financieros. Una empresa con contabilidad débil no sostiene después el permiso de trabajo.',
        ],
      },
      {
        en: [
          'Pre-approval of the work permit filed by the employer',
          'For the B category the employer normally files a work permit pre-approval before you apply for the visa, and its reference number goes into your application.',
        ],
        pt: [
          'Pré-aprovação da autorização de trabalho protocolada pelo empregador',
          'Na categoria B o empregador normalmente protocola uma pré-aprovação da autorização de trabalho antes do seu pedido de visto, e o número dela entra no seu formulário.',
        ],
        es: [
          'Preaprobación del permiso de trabajo presentada por el empleador',
          'En la categoría B el empleador suele presentar una preaprobación del permiso de trabajo antes de que usted solicite el visado, y su número de referencia va en el formulario.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Acceptance letter and ministry approval for the ED category',
          'A language school or university place is not enough on its own; the institution must also hold the approval that lets it sponsor foreign students.',
        ],
        pt: [
          'Carta de aceitação e aprovação ministerial na categoria ED',
          'Uma vaga em escola de idiomas ou universidade não basta por si só; a instituição também precisa ter a aprovação que a autoriza a patrocinar estudantes estrangeiros.',
        ],
        es: [
          'Carta de aceptación y aprobación ministerial en la categoría ED',
          'Una plaza en una escuela de idiomas o universidad no basta por sí sola; la institución también debe tener la aprobación que la habilita a patrocinar estudiantes extranjeros.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Marriage or family certificates for the O category',
          'Legalised and translated into Thai. Marriage-based stays are additionally verified by a home visit from immigration at extension time.',
        ],
        pt: [
          'Certidões de casamento ou de família na categoria O',
          'Legalizadas e traduzidas para o tailandês. As estadas por casamento ainda passam por visita domiciliar da imigração na hora da extensão.',
        ],
        es: [
          'Certificados de matrimonio o de familia en la categoría O',
          'Legalizados y traducidos al tailandés. Las estancias por matrimonio se verifican además con una visita domiciliaria de inmigración al prorrogar.',
        ],
        priority: 2,
        required: false,
      },
    ],
    education: [
      {
        en: [
          'Degree certificate and transcripts, legalised',
          'Required for the work permit rather than the visa, and the legalisation chain through your foreign ministry and the Thai embassy takes weeks on its own.',
        ],
        pt: [
          'Diploma e histórico escolar, legalizados',
          'Exigidos para a autorização de trabalho, não para o visto, e a cadeia de legalização pelo seu ministério das relações exteriores e pela embaixada tailandesa leva semanas por si só.',
        ],
        es: [
          'Título y expediente académico, legalizados',
          'Se exigen para el permiso de trabajo, no para el visado, y la cadena de legalización por su cancillería y la embajada tailandesa lleva semanas por sí sola.',
        ],
      },
      {
        en: [
          'Check the list of occupations reserved for Thai nationals',
          'A long list of jobs is closed to foreigners outright. If your role falls inside it, no employer and no salary can produce a work permit.',
        ],
        pt: [
          'Conferir a lista de ocupações reservadas a tailandeses',
          'Uma longa lista de profissões é fechada a estrangeiros por completo. Se a sua função estiver nela, nenhum empregador e nenhum salário produzem autorização de trabalho.',
        ],
        es: [
          'Consultar la lista de ocupaciones reservadas a tailandeses',
          'Una larga lista de oficios está cerrada por completo a extranjeros. Si su puesto está en ella, ningún empleador ni salario producen un permiso de trabajo.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Salary meeting the minimum set for your nationality',
          'Thailand publishes a minimum monthly salary table that differs by country of citizenship. Being paid below your own line blocks the work permit, not the visa.',
        ],
        pt: [
          'Salário atingindo o mínimo fixado para a sua nacionalidade',
          'A Tailândia publica uma tabela de salário mínimo mensal que varia conforme o país de cidadania. Receber abaixo da sua linha bloqueia a autorização de trabalho, não o visto.',
        ],
        es: [
          'Salario que alcance el mínimo fijado para su nacionalidad',
          'Tailandia publica una tabla de salario mínimo mensual que varía según el país de ciudadanía. Cobrar por debajo de su línea bloquea el permiso de trabajo, no el visado.',
        ],
      },
      {
        en: [
          'Employer ratio of Thai staff and registered capital',
          'The company needs a set number of Thai employees on social security and a minimum registered capital for each foreign worker it sponsors. Small employers fail here.',
        ],
        pt: [
          'Proporção de empregados tailandeses e capital social do empregador',
          'A empresa precisa de um número fixo de empregados tailandeses na previdência e de um capital social mínimo por cada trabalhador estrangeiro que patrocina. Empregadores pequenos travam aqui.',
        ],
        es: [
          'Proporción de empleados tailandeses y capital social del empleador',
          'La empresa necesita un número fijo de empleados tailandeses en la seguridad social y un capital social mínimo por cada trabajador extranjero que patrocina. Los empleadores pequeños fallan aquí.',
        ],
      },
      {
        en: [
          'Seasoned bank deposit for the retirement or marriage route',
          'The O category accepts a deposit in a Thai bank or a monthly income instead. The deposit has to sit in the account for months before and after the extension, not just on the day.',
        ],
        pt: [
          'Depósito bancário com carência na rota de aposentadoria ou casamento',
          'A categoria O aceita um depósito em banco tailandês ou, em alternativa, uma renda mensal. O depósito precisa ficar parado meses antes e depois da extensão, não só no dia.',
        ],
        es: [
          'Depósito bancario con permanencia en la vía de jubilación o matrimonio',
          'La categoría O acepta un depósito en un banco tailandés o, en su lugar, un ingreso mensual. El depósito debe permanecer meses antes y después de la prórroga, no solo ese día.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Choose single entry or multiple entry deliberately',
          'A single entry visa is consumed the first time you land, so any trip out of Thailand afterwards depends on a re-entry permit bought inside the country.',
        ],
        pt: [
          'Escolher entrada única ou múltipla de forma consciente',
          'O visto de entrada única se esgota no primeiro pouso, então qualquer viagem para fora da Tailândia depois disso depende de uma permissão de reentrada comprada dentro do país.',
        ],
        es: [
          'Elegir entrada única o múltiple de forma deliberada',
          'El visado de entrada única se consume al aterrizar la primera vez, así que cualquier viaje fuera de Tailandia después depende de un permiso de reentrada comprado dentro del país.',
        ],
      },
      {
        en: [
          'Pay the non-immigrant visa fee',
          'Multiple entry costs several times the single entry rate. Confirm the amount published by the mission handling your application.',
        ],
        pt: [
          'Pagar a taxa do visto não imigrante',
          'A entrada múltipla custa várias vezes o valor da entrada única. Confirme o montante publicado pela missão que analisa o seu pedido.',
        ],
        es: [
          'Pagar la tasa del visado de no inmigrante',
          'La entrada múltiple cuesta varias veces la tarifa de entrada única. Confirme el importe publicado por la misión que tramita su solicitud.',
        ],
      },
      {
        en: [
          'Enter Thailand within the validity printed on the visa',
          'The visa gives you an initial permission of about three months on arrival, which is far shorter than the year most people assume they have bought.',
        ],
        pt: [
          'Entrar na Tailândia dentro da validade impressa no visto',
          'O visto dá uma permissão inicial de cerca de três meses na chegada, bem menos que o ano que a maioria das pessoas supõe ter comprado.',
        ],
        es: [
          'Entrar en Tailandia dentro de la validez impresa en el visado',
          'El visado da un permiso inicial de unos tres meses a la llegada, mucho menos que el año que la mayoría supone haber comprado.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical certificate for the work permit file',
          'A Thai doctor certifies you are free of the specified diseases. It is issued in Thailand, is only valid for a short window, and the work permit stalls without it.',
        ],
        pt: [
          'Atestado médico para o processo da autorização de trabalho',
          'Um médico tailandês certifica que você está livre das doenças especificadas. É emitido na Tailândia, vale por pouco tempo, e a autorização de trabalho trava sem ele.',
        ],
        es: [
          'Certificado médico para el expediente del permiso de trabajo',
          'Un médico tailandés certifica que está libre de las enfermedades especificadas. Se emite en Tailandia, vale poco tiempo, y el permiso de trabajo se detiene sin él.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Obtain the work permit before your first day of work',
          'The visa authorises presence, never earning. Starting work while the permit is pending is an offence for both you and the employer.',
        ],
        pt: [
          'Obter a autorização de trabalho antes do primeiro dia de trabalho',
          'O visto autoriza a presença, nunca a remuneração. Começar a trabalhar com a autorização pendente é infração para você e para o empregador.',
        ],
        es: [
          'Obtener el permiso de trabajo antes del primer día de trabajo',
          'El visado autoriza la presencia, nunca la remuneración. Empezar a trabajar con el permiso pendiente es una infracción para usted y para el empleador.',
        ],
      },
      {
        en: [
          'Extend the permission to stay to one year at immigration',
          'Filed inside Thailand before the initial permission runs out, with the work permit already in hand. Miss the date and you restart the whole visa from abroad.',
        ],
        pt: [
          'Estender a permissão de permanência para um ano na imigração',
          'Protocolado dentro da Tailândia antes que a permissão inicial acabe, já com a autorização de trabalho em mãos. Perder a data faz você recomeçar todo o visto do exterior.',
        ],
        es: [
          'Prorrogar el permiso de permanencia a un año en inmigración',
          'Se presenta dentro de Tailandia antes de que acabe el permiso inicial, ya con el permiso de trabajo en mano. Perder la fecha le obliga a reiniciar todo el visado desde el exterior.',
        ],
      },
      {
        en: [
          'File the ninety-day address report every ninety days',
          'Every foreigner staying continuously past ninety days reports their address, in person, by post or online, in a window around the due date. The fine is automatic and nothing reminds you.',
        ],
        pt: [
          'Fazer o reporte de endereço a cada noventa dias',
          'Todo estrangeiro que fica continuamente além de noventa dias informa o endereço, presencialmente, pelo correio ou online, numa janela em torno do vencimento. A multa é automática e nada avisa você.',
        ],
        es: [
          'Presentar el informe de domicilio cada noventa días',
          'Todo extranjero que permanezca continuamente más de noventa días informa su domicilio, en persona, por correo o en línea, en una ventana alrededor del vencimiento. La multa es automática y nada se lo recuerda.',
        ],
      },
      {
        en: [
          'Buy a re-entry permit before every departure',
          'Leaving Thailand on a one-year extension without one cancels the permission to stay the moment you exit, and it cannot be recovered from outside.',
        ],
        pt: [
          'Comprar a permissão de reentrada antes de cada saída',
          'Sair da Tailândia com uma extensão de um ano sem ela cancela a permissão de permanência no instante em que você atravessa a fronteira, e não há como recuperá-la de fora.',
        ],
        es: [
          'Comprar el permiso de reentrada antes de cada salida',
          'Salir de Tailandia con una prórroga de un año sin él cancela el permiso de permanencia en el momento de cruzar, y no puede recuperarse desde fuera.',
        ],
      },
      {
        en: [
          'Make sure your landlord or hotel files the residence notification',
          'The owner of the property, not you, must notify immigration within twenty-four hours of your arrival. A missing notification blocks your extension, and the fine lands on you.',
        ],
        pt: [
          'Garantir que o senhorio ou o hotel faça a notificação de residência',
          'O proprietário do imóvel, e não você, deve notificar a imigração em vinte e quatro horas da sua chegada. A falta dela trava a sua extensão, e a multa sobra para você.',
        ],
        es: [
          'Asegurarse de que el arrendador o el hotel presente la notificación de residencia',
          'El propietario del inmueble, no usted, debe notificar a inmigración en veinticuatro horas desde su llegada. Su ausencia bloquea la prórroga, y la multa recae sobre usted.',
        ],
      },
      {
        en: [
          'Return the work permit when the job ends',
          'The permit belongs to the employer relationship. When it ends, your permission to stay is cut to a short grace period, often only days.',
        ],
        pt: [
          'Devolver a autorização de trabalho quando o emprego terminar',
          'A autorização pertence ao vínculo com o empregador. Quando ele acaba, a sua permissão de permanência é reduzida a um prazo curto, muitas vezes de poucos dias.',
        ],
        es: [
          'Devolver el permiso de trabajo cuando termine el empleo',
          'El permiso pertenece a la relación con el empleador. Al terminar, su permiso de permanencia se reduce a un plazo corto, a menudo de pocos días.',
        ],
      },
    ],
  },

  'Long-Term Resident (LTR) Visa': {
    core_documents: [
      {
        en: [
          'Passport valid for the application period',
          'The visa itself runs for ten years, issued as five plus five, so plan on renewing the passport during it.',
        ],
        pt: [
          'Passaporte válido para o período do pedido',
          'O próprio visto vale dez anos, emitido como cinco mais cinco, então conte com renovar o passaporte durante ele.',
        ],
        es: [
          'Pasaporte vigente para el periodo de la solicitud',
          'El visado dura diez años, emitido como cinco más cinco, así que cuente con renovar el pasaporte durante ese tiempo.',
        ],
      },
      {
        en: [
          'Choose the LTR category that fits you',
          'Wealthy global citizen, wealthy pensioner, work-from-Thailand professional and highly skilled professional have different tests. The category decides the evidence, so pick before you gather anything.',
        ],
        pt: [
          'Escolher a categoria de LTR que se encaixa em você',
          'Cidadão global de alto patrimônio, pensionista, profissional que trabalha da Tailândia e profissional altamente qualificado têm testes diferentes. A categoria define as provas, então escolha antes de reunir qualquer coisa.',
        ],
        es: [
          'Elegir la categoría de LTR que le corresponde',
          'Ciudadano global de alto patrimonio, pensionista, profesional que trabaja desde Tailandia y profesional altamente cualificado tienen pruebas distintas. La categoría define la evidencia, así que elija antes de reunir nada.',
        ],
      },
      {
        en: [
          'Register on the Board of Investment application system',
          'The LTR is run by the investment board, not by immigration or an embassy. The whole qualification stage happens on their portal.',
        ],
        pt: [
          'Registar-se no sistema de pedidos do Board of Investment',
          'O LTR é administrado pelo conselho de investimentos, não pela imigração nem por uma embaixada. Toda a etapa de qualificação acontece no portal deles.',
        ],
        es: [
          'Registrarse en el sistema de solicitudes del Board of Investment',
          'El LTR lo gestiona el consejo de inversiones, no inmigración ni una embajada. Toda la etapa de calificación ocurre en su portal.',
        ],
      },
      {
        en: [
          'Employment contract with the overseas employer',
          'The work-from-Thailand route requires a current contract with a company established abroad; income earned from a Thai company does not count towards it.',
        ],
        pt: [
          'Contrato de trabalho com o empregador no exterior',
          'A rota de trabalho a partir da Tailândia exige contrato vigente com empresa constituída no exterior; renda paga por empresa tailandesa não conta para ela.',
        ],
        es: [
          'Contrato de trabajo con el empleador en el extranjero',
          'La vía de trabajar desde Tailandia exige un contrato vigente con una empresa constituida en el extranjero; los ingresos de una empresa tailandesa no cuentan para ella.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Evidence about the employer itself',
          'The overseas company has to be a public company or show revenue over the last three years above the programme threshold. Many applicants qualify personally but their employer does not.',
        ],
        pt: [
          'Comprovação sobre o próprio empregador',
          'A empresa estrangeira precisa ser de capital aberto ou demonstrar receita nos últimos três anos acima do patamar do programa. Muitos candidatos se qualificam pessoalmente, mas o empregador não.',
        ],
        es: [
          'Evidencia sobre el propio empleador',
          'La empresa extranjera debe cotizar en bolsa o demostrar ingresos en los últimos tres años por encima del umbral del programa. Muchos solicitantes califican personalmente pero su empleador no.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Include dependants in the same application',
          'Spouse and children can be added, and unlike most Thai categories a limited number of dependants ride on the principal file rather than filing separately.',
        ],
        pt: [
          'Incluir dependentes no mesmo pedido',
          'Cônjuge e filhos podem ser adicionados e, ao contrário da maioria das categorias tailandesas, um número limitado de dependentes segue no processo do titular em vez de pedir à parte.',
        ],
        es: [
          'Incluir a los dependientes en la misma solicitud',
          'Cónyuge e hijos pueden añadirse y, a diferencia de la mayoría de las categorías tailandesas, un número limitado de dependientes va en el expediente del titular en lugar de solicitar aparte.',
        ],
        priority: 2,
        required: false,
      },
    ],
    education: [
      {
        en: [
          'Degree and documented years of experience',
          'The professional categories set a minimum number of years in the relevant field, and a master’s degree or higher can reduce or replace part of that requirement.',
        ],
        pt: [
          'Diploma e anos de experiência documentados',
          'As categorias profissionais fixam um mínimo de anos na área, e um mestrado ou titulação superior pode reduzir ou substituir parte dessa exigência.',
        ],
        es: [
          'Título y años de experiencia documentados',
          'Las categorías profesionales fijan un mínimo de años en el campo, y un máster o titulación superior puede reducir o sustituir parte de ese requisito.',
        ],
      },
      {
        en: [
          'Show your work sits in a targeted industry',
          'The highly skilled route only accepts employment in the industries the government has prioritised, or in a Thai university or research institute.',
        ],
        pt: [
          'Demonstrar que o seu trabalho está numa indústria priorizada',
          'A rota de altamente qualificado só aceita emprego nas indústrias que o governo priorizou, ou em universidade ou instituto de pesquisa tailandês.',
        ],
        es: [
          'Demostrar que su trabajo está en una industria priorizada',
          'La vía de altamente cualificado solo acepta empleo en las industrias que el gobierno ha priorizado, o en una universidad o instituto de investigación tailandés.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Personal income over the last two years',
          'Evidenced by tax returns and payslips, not by bank balance alone. The threshold differs by category, so check the figure published for yours.',
        ],
        pt: [
          'Renda pessoal dos últimos dois anos',
          'Comprovada por declarações de imposto e recibos de salário, não apenas por saldo bancário. O patamar varia por categoria, então confira o número publicado para a sua.',
        ],
        es: [
          'Ingresos personales de los últimos dos años',
          'Acreditados con declaraciones de impuestos y nóminas, no solo con saldo bancario. El umbral difiere por categoría, así que compruebe la cifra publicada para la suya.',
        ],
      },
      {
        en: [
          'Assets as an alternative to the income test',
          'Applicants who fall short on income can qualify on total assets instead, which is what makes the pensioner and global citizen routes reachable for people who have stopped earning.',
        ],
        pt: [
          'Patrimônio como alternativa ao teste de renda',
          'Quem não atinge a renda pode qualificar-se pelo patrimônio total, e é isso que torna as rotas de pensionista e de cidadão global alcançáveis para quem parou de receber salário.',
        ],
        es: [
          'Patrimonio como alternativa a la prueba de ingresos',
          'Quien no alcanza el ingreso puede calificar por patrimonio total, y eso es lo que hace alcanzables las vías de pensionista y ciudadano global para quien dejó de percibir salario.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Investment held in Thai assets for the whole period',
          'The wealthy global citizen route requires an investment in Thai government bonds, property or direct investment that must stay in place; selling it ends the visa.',
        ],
        pt: [
          'Investimento mantido em ativos tailandeses por todo o período',
          'A rota de cidadão global exige investimento em títulos públicos tailandeses, imóveis ou investimento direto, que precisa permanecer; vendê-lo encerra o visto.',
        ],
        es: [
          'Inversión mantenida en activos tailandeses durante todo el periodo',
          'La vía de ciudadano global exige inversión en bonos del Estado tailandés, inmuebles o inversión directa, que debe mantenerse; venderla termina el visado.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Pension or passive income for the retiree route',
          'A stable recurring income stream is assessed, and a lower income can be topped up by an investment in Thailand under the same category.',
        ],
        pt: [
          'Pensão ou renda passiva na rota de aposentado',
          'Avalia-se um fluxo de renda recorrente estável, e uma renda menor pode ser complementada por um investimento na Tailândia dentro da mesma categoria.',
        ],
        es: [
          'Pensión o renta pasiva en la vía de jubilado',
          'Se evalúa un flujo de ingresos recurrente estable, y un ingreso menor puede complementarse con una inversión en Tailandia dentro de la misma categoría.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Submit the file and wait for the qualification endorsement',
          'The investment board reviews the whole case first and issues an endorsement letter. Only then does a visa exist to be collected.',
        ],
        pt: [
          'Enviar o processo e aguardar o endosso de qualificação',
          'O conselho de investimentos analisa todo o caso primeiro e emite uma carta de endosso. Só então passa a existir um visto para retirar.',
        ],
        es: [
          'Enviar el expediente y esperar el endoso de calificación',
          'El consejo de inversiones revisa todo el caso primero y emite una carta de endoso. Solo entonces existe un visado que recoger.',
        ],
      },
      {
        en: [
          'Pay the visa fee once endorsed',
          'Charged per person, including dependants, and covering the full ten-year term. Confirm the current amount rather than budgeting from an old figure.',
        ],
        pt: [
          'Pagar a taxa do visto após o endosso',
          'Cobrada por pessoa, incluindo dependentes, e cobrindo todo o prazo de dez anos. Confirme o valor vigente em vez de orçar por um número antigo.',
        ],
        es: [
          'Pagar la tasa del visado tras el endoso',
          'Se cobra por persona, incluidos los dependientes, y cubre todo el plazo de diez años. Confirme el importe vigente en lugar de presupuestar con una cifra antigua.',
        ],
      },
      {
        en: [
          'Collect the visa abroad or at the one stop centre',
          'You can take the endorsement to a Thai embassy or, if you are already in Thailand on another status, finish it at the one stop service centre in Bangkok.',
        ],
        pt: [
          'Retirar o visto no exterior ou no centro de atendimento único',
          'Você pode levar o endosso a uma embaixada tailandesa ou, se já estiver na Tailândia com outro status, concluir no centro de serviço único em Banguecoque.',
        ],
        es: [
          'Recoger el visado en el exterior o en el centro de atención única',
          'Puede llevar el endoso a una embajada tailandesa o, si ya está en Tailandia con otro estatus, terminarlo en el centro de servicio único de Bangkok.',
        ],
      },
      {
        en: [
          'Use the endorsement before it lapses',
          'The qualification letter has its own expiry. Letting it run out means going through the assessment again with refreshed financial evidence.',
        ],
        pt: [
          'Usar o endosso antes que ele caduque',
          'A carta de qualificação tem prazo próprio. Deixá-la vencer significa refazer a avaliação com comprovação financeira atualizada.',
        ],
        es: [
          'Usar el endoso antes de que caduque',
          'La carta de calificación tiene su propio plazo. Dejarla vencer implica repetir la evaluación con evidencia financiera actualizada.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Health insurance or an equivalent guarantee',
          'A policy with a stated minimum coverage, Thai social security enrolment, or a deposit held in a bank account are the accepted alternatives.',
        ],
        pt: [
          'Seguro de saúde ou garantia equivalente',
          'Uma apólice com cobertura mínima declarada, inscrição na previdência tailandesa ou um depósito mantido em conta bancária são as alternativas aceitas.',
        ],
        es: [
          'Seguro de salud o garantía equivalente',
          'Una póliza con cobertura mínima declarada, el alta en la seguridad social tailandesa o un depósito en una cuenta bancaria son las alternativas aceptadas.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Report your address once a year instead of every ninety days',
          'This is the single largest practical benefit of the LTR: it replaces the ninety-day reporting cycle that governs every other long stay in Thailand.',
        ],
        pt: [
          'Reportar o endereço uma vez por ano em vez de a cada noventa dias',
          'Esse é o maior benefício prático do LTR: substitui o ciclo de reportes de noventa dias que rege todas as outras estadas longas na Tailândia.',
        ],
        es: [
          'Informar su domicilio una vez al año en lugar de cada noventa días',
          'Ese es el mayor beneficio práctico del LTR: sustituye el ciclo de informes de noventa días que rige todas las demás estancias largas en Tailandia.',
        ],
      },
      {
        en: [
          'Obtain the digital work permit if you will work',
          'The LTR comes with its own streamlined work permit issued at the one stop centre, but it is still a separate document you have to request.',
        ],
        pt: [
          'Obter a autorização de trabalho digital se for trabalhar',
          'O LTR vem com uma autorização de trabalho simplificada emitida no centro de serviço único, mas ainda é um documento à parte que você precisa solicitar.',
        ],
        es: [
          'Obtener el permiso de trabajo digital si va a trabajar',
          'El LTR incluye un permiso de trabajo simplificado emitido en el centro de servicio único, pero sigue siendo un documento aparte que debe solicitar.',
        ],
      },
      {
        en: [
          'Travel freely without a re-entry permit',
          'The LTR is multiple entry by design, so the trap that catches holders of one-year extensions does not apply here.',
        ],
        pt: [
          'Viajar livremente sem permissão de reentrada',
          'O LTR é de entrada múltipla por concepção, então a armadilha que pega quem tem extensão de um ano não se aplica aqui.',
        ],
        es: [
          'Viajar libremente sin permiso de reentrada',
          'El LTR es de entrada múltiple por diseño, así que la trampa que atrapa a quienes tienen prórroga de un año no aplica aquí.',
        ],
      },
      {
        en: [
          'Keep meeting the qualifying conditions until the five-year review',
          'The second half of the ten years is granted only if income, insurance and investment still hold. Letting the insurance lapse is the usual failure.',
        ],
        pt: [
          'Continuar cumprindo as condições até a revisão de cinco anos',
          'A segunda metade dos dez anos só é concedida se renda, seguro e investimento continuarem válidos. Deixar o seguro caducar é a falha mais comum.',
        ],
        es: [
          'Seguir cumpliendo las condiciones hasta la revisión de cinco años',
          'La segunda mitad de los diez años solo se concede si ingresos, seguro e inversión se mantienen. Dejar caducar el seguro es el fallo habitual.',
        ],
      },
      {
        en: [
          'Understand your Thai tax position',
          'The highly skilled category carries a reduced flat rate on Thai employment income, and separately, spending enough days in the country makes you a tax resident on remitted income.',
        ],
        pt: [
          'Entender a sua posição fiscal na Tailândia',
          'A categoria de altamente qualificado tem alíquota fixa reduzida sobre renda de trabalho tailandesa e, à parte, passar dias suficientes no país torna você residente fiscal sobre a renda remetida.',
        ],
        es: [
          'Entender su posición fiscal en Tailandia',
          'La categoría de altamente cualificado tiene un tipo fijo reducido sobre la renta laboral tailandesa y, aparte, pasar suficientes días en el país le convierte en residente fiscal sobre la renta remitida.',
        ],
        priority: 2,
      },
    ],
  },

  'Permanent Residence': {
    core_documents: [
      {
        en: [
          'Passport with three unbroken years of yearly extensions',
          'You must already hold a non-immigrant visa extended year after year, with no gap. A single lapse resets the clock to zero.',
        ],
        pt: [
          'Passaporte com três anos ininterruptos de extensões anuais',
          'Você já precisa ter um visto não imigrante estendido ano após ano, sem lacuna. Uma única interrupção zera a contagem.',
        ],
        es: [
          'Pasaporte con tres años ininterrumpidos de prórrogas anuales',
          'Ya debe tener un visado de no inmigrante prorrogado año tras año, sin interrupciones. Un solo corte pone el contador a cero.',
        ],
      },
      {
        en: [
          'Apply only while the annual quota window is open',
          'Applications are accepted for a limited period, usually announced late in the year and open for weeks. Outside that window nothing can be filed at all.',
        ],
        pt: [
          'Pedir apenas enquanto a janela da cota anual estiver aberta',
          'Os pedidos são aceitos por um período limitado, normalmente anunciado no fim do ano e aberto por algumas semanas. Fora dessa janela nada pode ser protocolado.',
        ],
        es: [
          'Solicitar solo mientras esté abierta la ventana del cupo anual',
          'Las solicitudes se aceptan durante un periodo limitado, normalmente anunciado a fin de año y abierto unas semanas. Fuera de esa ventana no puede presentarse nada.',
        ],
      },
      {
        en: [
          'Choose your residence category',
          'Investment, employment, expert, family support and humanity are separate routes with separate evidence, and each competes inside the same national quota.',
        ],
        pt: [
          'Escolher a sua categoria de residência',
          'Investimento, emprego, especialista, apoio familiar e humanidade são rotas separadas com provas separadas, e cada uma disputa dentro da mesma cota nacional.',
        ],
        es: [
          'Elegir su categoría de residencia',
          'Inversión, empleo, experto, apoyo familiar y humanidad son vías separadas con pruebas separadas, y cada una compite dentro del mismo cupo nacional.',
        ],
      },
      {
        en: [
          'Employer letter with position, tenure and duties',
          'For the employment route the same employer relationship generally has to underpin the whole three-year qualifying period.',
        ],
        pt: [
          'Carta do empregador com cargo, tempo de casa e funções',
          'Na rota de emprego, em geral o mesmo vínculo empregatício precisa sustentar todo o período de três anos exigido.',
        ],
        es: [
          'Carta del empleador con puesto, antigüedad y funciones',
          'En la vía de empleo, por lo general la misma relación laboral debe sostener todo el periodo de tres años exigido.',
        ],
      },
      {
        en: [
          'Police clearance from Thailand and your home country',
          'Any criminal record, and any immigration penalty on your Thai file, weighs directly against the application.',
        ],
        pt: [
          'Certidão de antecedentes da Tailândia e do seu país de origem',
          'Qualquer antecedente criminal, e qualquer penalidade de imigração no seu histórico tailandês, pesa diretamente contra o pedido.',
        ],
        es: [
          'Certificado de antecedentes de Tailandia y de su país de origen',
          'Cualquier antecedente penal, y cualquier sanción migratoria en su historial tailandés, pesa directamente contra la solicitud.',
        ],
      },
      {
        en: [
          'Evidence of where you actually live',
          'Lease or title deed, utility bills and the house registration of the property, corroborating the address you have been reporting to immigration.',
        ],
        pt: [
          'Comprovação de onde você mora de fato',
          'Contrato de arrendamento ou escritura, contas de serviços e o registo da casa do imóvel, corroborando o endereço que você vem informando à imigração.',
        ],
        es: [
          'Prueba de dónde vive realmente',
          'Contrato de alquiler o escritura, facturas de servicios y el registro de la casa del inmueble, que corroboren la dirección que ha venido informando a inmigración.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Conversational Thai for the interview',
          'There is no certificate to submit, but you are interviewed in Thai and expected to answer. Applicants who have lived years in Thailand without the language fail here.',
        ],
        pt: [
          'Tailandês conversacional para a entrevista',
          'Não há certificado a apresentar, mas você é entrevistado em tailandês e precisa responder. Candidatos que viveram anos na Tailândia sem a língua caem aqui.',
        ],
        es: [
          'Tailandés conversacional para la entrevista',
          'No hay certificado que presentar, pero le entrevistan en tailandés y se espera que responda. Los solicitantes que llevan años en Tailandia sin el idioma caen aquí.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Personal income tax returns for three consecutive years',
          'Filed and paid in Thailand, with receipts. Someone paid abroad who never filed Thai tax cannot document the qualifying period at all.',
        ],
        pt: [
          'Declarações de imposto de renda pessoa física de três anos consecutivos',
          'Entregues e pagas na Tailândia, com comprovantes. Quem recebe no exterior e nunca declarou imposto tailandês não consegue documentar o período exigido.',
        ],
        es: [
          'Declaraciones de impuesto sobre la renta de tres años consecutivos',
          'Presentadas y pagadas en Tailandia, con justificantes. Quien cobra en el extranjero y nunca declaró impuestos tailandeses no puede documentar el periodo exigido.',
        ],
      },
      {
        en: [
          'Income above the threshold for your marital status',
          'The bar is set lower for applicants married to a Thai national and higher for single applicants. Confirm the figures currently in force before committing to a year of filings.',
        ],
        pt: [
          'Renda acima do patamar correspondente ao seu estado civil',
          'A exigência é menor para quem é casado com pessoa tailandesa e maior para solteiros. Confirme os valores em vigor antes de se comprometer com um ano de declarações.',
        ],
        es: [
          'Ingresos por encima del umbral según su estado civil',
          'El listón es más bajo para quien está casado con una persona tailandesa y más alto para solteros. Confirme las cifras en vigor antes de comprometerse a un año de declaraciones.',
        ],
      },
      {
        en: [
          'Non-refundable fee at lodgement',
          'Charged when the file is accepted, regardless of the outcome, and separate from the far larger fee due if residence is granted.',
        ],
        pt: [
          'Taxa não reembolsável no protocolo',
          'Cobrada quando o processo é aceito, independentemente do resultado, e separada da taxa bem maior devida se a residência for concedida.',
        ],
        es: [
          'Tasa no reembolsable en la presentación',
          'Se cobra al aceptar el expediente, sea cual sea el resultado, y es distinta de la tasa mucho mayor que se debe si se concede la residencia.',
        ],
      },
      {
        en: [
          'Grant fee payable on approval',
          'Substantially reduced for spouses and children of Thai nationals compared with other applicants. Check the rates in force at the time of approval.',
        ],
        pt: [
          'Taxa de concessão devida na aprovação',
          'Bem reduzida para cônjuges e filhos de tailandeses em comparação com os demais requerentes. Confira os valores vigentes no momento da aprovação.',
        ],
        es: [
          'Tasa de concesión pagadera al aprobarse',
          'Bastante reducida para cónyuges e hijos de tailandeses frente a los demás solicitantes. Compruebe las tarifas vigentes en el momento de la aprobación.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File in person at the immigration bureau in Bangkok',
          'Residence applications are not handled by provincial offices, so the trip to the capital is part of the process.',
        ],
        pt: [
          'Protocolar presencialmente no escritório de imigração em Banguecoque',
          'Pedidos de residência não são tratados por escritórios provinciais, então a viagem à capital faz parte do processo.',
        ],
        es: [
          'Presentar en persona en la oficina de inmigración de Bangkok',
          'Las solicitudes de residencia no las tramitan las oficinas provinciales, así que el viaje a la capital forma parte del proceso.',
        ],
      },
      {
        en: [
          'Accept that the quota per nationality is very small',
          'A fixed number of places is available to each nationality every year, in the low hundreds. Qualifying does not mean being selected.',
        ],
        pt: [
          'Aceitar que a cota por nacionalidade é muito pequena',
          'Há um número fixo de vagas por nacionalidade a cada ano, na casa das centenas baixas. Qualificar-se não significa ser selecionado.',
        ],
        es: [
          'Aceptar que el cupo por nacionalidad es muy reducido',
          'Hay un número fijo de plazas por nacionalidad cada año, en el orden de unos pocos cientos. Calificar no significa ser seleccionado.',
        ],
      },
      {
        en: [
          'Expect the decision to take years',
          'The file passes through immigration, the police and ministerial approval. Two to three years from lodgement to answer is normal.',
        ],
        pt: [
          'Contar que a decisão leve anos',
          'O processo passa pela imigração, pela polícia e por aprovação ministerial. De dois a três anos entre protocolo e resposta é o normal.',
        ],
        es: [
          'Contar con que la decisión tarde años',
          'El expediente pasa por inmigración, la policía y la aprobación ministerial. De dos a tres años entre presentación y respuesta es lo normal.',
        ],
      },
      {
        en: [
          'Keep extending your current visa while you wait',
          'The application does not protect your status. Renewals, ninety-day reports and re-entry permits all continue exactly as before, and a lapse kills the pending file.',
        ],
        pt: [
          'Continuar estendendo o visto atual enquanto espera',
          'O pedido não protege o seu status. Renovações, reportes de noventa dias e permissões de reentrada continuam exatamente como antes, e uma falha derruba o processo pendente.',
        ],
        es: [
          'Seguir prorrogando su visado actual mientras espera',
          'La solicitud no protege su estatus. Renovaciones, informes de noventa días y permisos de reentrada continúan igual que antes, y un lapso mata el expediente pendiente.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints taken at immigration and the police',
          'Collected as part of the criminal record check inside Thailand, in addition to any prints already on your file.',
        ],
        pt: [
          'Impressões digitais recolhidas na imigração e na polícia',
          'Coletadas como parte da verificação de antecedentes dentro da Tailândia, além das digitais que já constem do seu histórico.',
        ],
        es: [
          'Huellas dactilares tomadas en inmigración y en la policía',
          'Se recogen como parte de la verificación de antecedentes dentro de Tailandia, además de las huellas que ya consten en su expediente.',
        ],
      },
      {
        en: [
          'Medical certificate from a Thai hospital',
          'Confirming freedom from the prohibited conditions and from drug dependence, issued shortly before lodgement.',
        ],
        pt: [
          'Atestado médico de hospital tailandês',
          'Confirmando ausência das condições proibidas e de dependência química, emitido pouco antes do protocolo.',
        ],
        es: [
          'Certificado médico de un hospital tailandés',
          'Que confirme la ausencia de las condiciones prohibidas y de dependencia de drogas, emitido poco antes de presentar.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the residence certificate and the blue house book',
          'Permanent residents are entered in the household registration in the blue book, which is what proves residence for banking, property and school enrolment.',
        ],
        pt: [
          'Retirar o certificado de residência e o livro azul da casa',
          'Residentes permanentes são inscritos no registo domiciliar no livro azul, que é o que comprova residência para banco, imóveis e matrícula escolar.',
        ],
        es: [
          'Recoger el certificado de residencia y el libro azul de la casa',
          'Los residentes permanentes se inscriben en el registro domiciliario en el libro azul, que es lo que acredita residencia para banca, inmuebles y matrícula escolar.',
        ],
      },
      {
        en: [
          'Register with the local police for the alien book',
          'A separate alien registration book is issued by the police within a short deadline after approval and has to be kept updated whenever you move.',
        ],
        pt: [
          'Registar-se na polícia local para obter o livro de estrangeiro',
          'Um livro de registo de estrangeiro à parte é emitido pela polícia num prazo curto após a aprovação e precisa ser atualizado sempre que você mudar de endereço.',
        ],
        es: [
          'Registrarse en la policía local para el libro de extranjero',
          'La policía emite un libro de registro de extranjero aparte en un plazo corto tras la aprobación, y debe mantenerse actualizado cada vez que cambie de domicilio.',
        ],
      },
      {
        en: [
          'Get a residence endorsement before travelling abroad',
          'Permanent residence itself does not include the right to return. Leaving without the endorsement in your passport forfeits the status you spent years obtaining.',
        ],
        pt: [
          'Obter o endosso de residência antes de viajar ao exterior',
          'A residência permanente em si não inclui o direito de retornar. Sair sem o endosso no passaporte faz perder o status que levou anos para conseguir.',
        ],
        es: [
          'Obtener el endoso de residencia antes de viajar al extranjero',
          'La residencia permanente en sí no incluye el derecho de regreso. Salir sin el endoso en el pasaporte hace perder el estatus que le costó años conseguir.',
        ],
      },
      {
        en: [
          'Keep the work permit if you continue working',
          'Residence removes the visa and the ninety-day report, but it does not by itself authorise employment; the work permit still has to be maintained.',
        ],
        pt: [
          'Manter a autorização de trabalho se continuar trabalhando',
          'A residência elimina o visto e o reporte de noventa dias, mas não autoriza emprego por si só; a autorização de trabalho ainda precisa ser mantida.',
        ],
        es: [
          'Mantener el permiso de trabajo si sigue trabajando',
          'La residencia elimina el visado y el informe de noventa días, pero no autoriza el empleo por sí sola; el permiso de trabajo debe seguir vigente.',
        ],
      },
      {
        en: [
          'Consider naturalisation after several years as a resident',
          'Permanent residence is the prerequisite for citizenship, which adds a further residence period, a language and culture test and a separate quota.',
        ],
        pt: [
          'Considerar a naturalização após alguns anos como residente',
          'A residência permanente é o pré-requisito da cidadania, que acrescenta mais um período de residência, um teste de língua e cultura e uma cota separada.',
        ],
        es: [
          'Considerar la naturalización tras varios años como residente',
          'La residencia permanente es el requisito previo de la ciudadanía, que añade otro periodo de residencia, un examen de idioma y cultura y un cupo aparte.',
        ],
        priority: 2,
      },
    ],
  },
};
