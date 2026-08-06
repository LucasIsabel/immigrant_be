import type { CountryVisaSteps } from './types';

/**
 * Steps for the United Arab Emirates.
 *
 * Outside the Golden route, nothing exists without a sponsor. A mainland
 * employer, a free zone company, a hotel or an airline holds the file, and the
 * residence is legally tied to that sponsor: leaving the job cancels the visa
 * and starts a short countdown to find another one or leave the country.
 *
 * Two things gate every residence: the medical fitness test, whose results are
 * decisive rather than formal, and the Emirates ID, without which no bank
 * account, lease, phone line or driving licence is possible.
 *
 * The Golden Visa inverts the logic. It is long term, self-sponsored, survives
 * long absences abroad and lets the holder sponsor family without a salary
 * ceiling — which is exactly why the eligibility evidence is heavier.
 */
export const unitedArabEmirates: CountryVisaSteps = {
  'Tourist / Visit Visa': {
    core_documents: [
      {
        en: [
          'Passport valid for at least six months',
          'Counted from the date of entry, not the date of application; airlines refuse boarding on this alone.',
        ],
        pt: [
          'Passaporte válido por pelo menos seis meses',
          'Contados a partir da data de entrada, não da data do pedido; as companhias aéreas negam embarque só por isso.',
        ],
        es: [
          'Pasaporte con al menos seis meses de vigencia',
          'Se cuentan desde la fecha de entrada, no desde la solicitud; las aerolíneas deniegan el embarque solo por eso.',
        ],
      },
      {
        en: [
          'Check whether your nationality gets a visa on arrival',
          'A long list of passports is stamped at the airport with nothing filed in advance, and applying anyway costs money for a document you did not need.',
        ],
        pt: [
          'Verificar se sua nacionalidade recebe visto na chegada',
          'Uma longa lista de passaportes é carimbada no aeroporto sem nada protocolado antes, e pedir mesmo assim custa dinheiro por um documento que você não precisava.',
        ],
        es: [
          'Comprobar si su nacionalidad obtiene visado a la llegada',
          'Una larga lista de pasaportes se sella en el aeropuerto sin presentar nada antes, y solicitarlo igual cuesta dinero por un documento que no necesitaba.',
        ],
      },
      {
        en: [
          'A sponsor files the visit visa for you',
          'Even a tourist visa has a sponsor: the airline you fly with, the hotel you booked, a licensed tour operator or a resident relative. You do not apply directly as an individual.',
        ],
        pt: [
          'Um patrocinador protocola o visto de visita por você',
          'Mesmo o visto de turista tem patrocinador: a companhia aérea, o hotel reservado, uma operadora licenciada ou um parente residente. Você não pede diretamente como pessoa física.',
        ],
        es: [
          'Un patrocinador presenta el visado de visita por usted',
          'Incluso el visado de turista tiene patrocinador: la aerolínea, el hotel reservado, un operador turístico licenciado o un familiar residente. Usted no solicita directamente como particular.',
        ],
      },
      {
        en: [
          'Know which authority handles your emirate',
          'Dubai files go through its own residency directorate while the other emirates go through the federal identity authority. Using the wrong channel means starting again.',
        ],
        pt: [
          'Saber qual autoridade cuida do seu emirado',
          'Os pedidos de Dubai passam pela diretoria de residência própria, enquanto os demais emirados passam pela autoridade federal de identidade. Usar o canal errado significa recomeçar.',
        ],
        es: [
          'Saber qué autoridad gestiona su emirato',
          'Los expedientes de Dubái pasan por su propia dirección de residencia, mientras que los demás emiratos van por la autoridad federal de identidad. Usar el canal equivocado obliga a empezar de nuevo.',
        ],
      },
      {
        en: [
          'Colour photograph with a white background',
          'Digital file to the authority specification; scanned passport photos are commonly rejected by the portal.',
        ],
        pt: [
          'Fotografia colorida com fundo branco',
          'Arquivo digital na especificação da autoridade; fotos de passaporte escaneadas são comumente rejeitadas pelo portal.',
        ],
        es: [
          'Fotografía en color con fondo blanco',
          'Archivo digital según la especificación de la autoridad; las fotos de pasaporte escaneadas suelen ser rechazadas por el portal.',
        ],
      },
      {
        en: [
          'Confirmed return ticket and address of stay',
          'A hotel booking or the host address with their identity document; a one-way ticket is a standard reason for refusal at the counter.',
        ],
        pt: [
          'Passagem de volta confirmada e endereço da estada',
          'Reserva de hotel ou o endereço do anfitrião com o documento de identidade dele; passagem só de ida é motivo comum de recusa no guichê.',
        ],
        es: [
          'Billete de vuelta confirmado y dirección de la estancia',
          'Reserva de hotel o la dirección del anfitrión con su documento de identidad; el billete de solo ida es un motivo habitual de denegación en el mostrador.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Bank statements covering the recent months',
          'Usually three to six months, stamped by the bank, showing you can cover the stay without working.',
        ],
        pt: [
          'Extratos bancários dos últimos meses',
          'Em geral de três a seis meses, carimbados pelo banco, mostrando que você cobre a estada sem trabalhar.',
        ],
        es: [
          'Extractos bancarios de los últimos meses',
          'Por lo general de tres a seis meses, sellados por el banco, que muestren que puede cubrir la estancia sin trabajar.',
        ],
      },
      {
        en: [
          'Proof that someone covers your costs if you are hosted',
          'The resident sponsor supplies their residence visa, identity card and salary certificate; a weak sponsor file sinks a strong visitor file.',
        ],
        pt: [
          'Prova de quem custeia você quando há anfitrião',
          'O patrocinador residente fornece o visto de residência, o cartão de identidade e o comprovante de salário; um dossiê fraco do patrocinador derruba um dossiê forte do visitante.',
        ],
        es: [
          'Prueba de quién cubre sus gastos si le alojan',
          'El patrocinador residente aporta su visado de residencia, su tarjeta de identidad y su certificado salarial; un expediente débil del patrocinador hunde uno fuerte del visitante.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply through the approved channel and receive the e-visa',
          'The result arrives as a PDF by email. Print it and carry it; some airlines still ask for it at check-in.',
        ],
        pt: [
          'Pedir pelo canal aprovado e receber o visto eletrônico',
          'O resultado chega em PDF por e-mail. Imprima e leve consigo; algumas companhias ainda o pedem no check-in.',
        ],
        es: [
          'Solicitar por el canal aprobado y recibir el visado electrónico',
          'El resultado llega en PDF por correo. Imprímalo y llévelo; algunas aerolíneas todavía lo piden en el mostrador.',
        ],
      },
      {
        en: [
          'Pay the visa fee and the service charges',
          'The government fee is only part of it: sponsors and typing centres add their own charges and often a refundable deposit. Ask for the full breakdown before paying.',
        ],
        pt: [
          'Pagar a taxa do visto e os encargos de serviço',
          'A taxa do governo é só uma parte: patrocinadores e centros de digitação somam encargos próprios e muitas vezes um depósito reembolsável. Peça a composição completa antes de pagar.',
        ],
        es: [
          'Pagar la tasa del visado y los cargos de servicio',
          'La tasa oficial es solo una parte: patrocinadores y centros de tramitación añaden sus propios cargos y a menudo un depósito reembolsable. Pida el desglose completo antes de pagar.',
        ],
      },
      {
        en: [
          'Watch the validity window, not just the length of stay',
          'The visa must be used within a set period after issue, and the permitted stay only starts counting on entry. People lose the visa by issuing it too early.',
        ],
        pt: [
          'Observar a janela de validade, não só a duração da estada',
          'O visto precisa ser usado dentro de um prazo após a emissão, e a permanência permitida só começa a contar na entrada. Muita gente perde o visto por emiti-lo cedo demais.',
        ],
        es: [
          'Vigilar la ventana de validez, no solo la duración de la estancia',
          'El visado debe usarse dentro de un plazo tras su emisión, y la estancia permitida solo empieza a contar al entrar. Mucha gente pierde el visado por emitirlo demasiado pronto.',
        ],
      },
      {
        en: [
          'Consider an extension instead of a visa run',
          'Several visit categories can be extended in country for a fee, which is cheaper and safer than leaving and re-entering to reset the clock.',
        ],
        pt: [
          'Considerar a prorrogação em vez de sair e voltar',
          'Várias categorias de visita podem ser prorrogadas no país mediante taxa, o que é mais barato e mais seguro do que sair e reentrar para zerar a contagem.',
        ],
        es: [
          'Considerar la prórroga en lugar de salir y volver',
          'Varias categorías de visita pueden prorrogarse dentro del país pagando una tasa, lo que es más barato y seguro que salir y reentrar para reiniciar el plazo.',
        ],
        priority: 2,
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical insurance covering the whole visit',
          'Required at application for several visit categories and expected at the border. Public hospital care is not free for visitors.',
        ],
        pt: [
          'Seguro médico cobrindo toda a visita',
          'Exigido no pedido em várias categorias de visita e esperado na fronteira. O atendimento em hospital público não é gratuito para visitantes.',
        ],
        es: [
          'Seguro médico que cubra toda la visita',
          'Se exige al solicitar en varias categorías de visita y se espera en la frontera. La atención en hospital público no es gratuita para visitantes.',
        ],
      },
      {
        en: [
          'No fitness test is required for a visit',
          'The blood tests and chest X-ray belong to the residence process. A visitor is only photographed and iris-scanned at the border.',
        ],
        pt: [
          'Não há exame de aptidão para a visita',
          'Os exames de sangue e a radiografia de tórax pertencem ao processo de residência. O visitante só é fotografado e tem a íris lida na fronteira.',
        ],
        es: [
          'No hay prueba de aptitud para la visita',
          'Los análisis de sangre y la radiografía de tórax pertenecen al proceso de residencia. Al visitante solo se le fotografía y se le escanea el iris en la frontera.',
        ],
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Enter before the visa window closes',
          'An unused visa expires on its own and the fee is not refunded; reissuing means the whole application again.',
        ],
        pt: [
          'Entrar antes de a janela do visto fechar',
          'Um visto não usado expira sozinho e a taxa não é devolvida; reemitir significa refazer todo o pedido.',
        ],
        es: [
          'Entrar antes de que se cierre la ventana del visado',
          'Un visado sin usar caduca por sí solo y la tasa no se devuelve; reemitirlo implica rehacer toda la solicitud.',
        ],
      },
      {
        en: [
          'Track the permitted days from the entry stamp',
          'Overstay fines accrue for every single day, are collected at the airport before you can leave, and can end in a re-entry ban.',
        ],
        pt: [
          'Acompanhar os dias permitidos a partir do carimbo de entrada',
          'As multas por excesso de permanência correm a cada dia, são cobradas no aeroporto antes de você poder sair e podem terminar em proibição de reentrada.',
        ],
        es: [
          'Contar los días permitidos desde el sello de entrada',
          'Las multas por exceso de estancia corren cada día, se cobran en el aeropuerto antes de poder salir y pueden acabar en una prohibición de reentrada.',
        ],
      },
      {
        en: [
          'Do not work while on a visit status',
          'Any paid activity, including short consulting for a local company, needs a work permit or a formal temporary work permission.',
        ],
        pt: [
          'Não trabalhar enquanto estiver em status de visita',
          'Qualquer atividade remunerada, inclusive consultoria curta para empresa local, exige permissão de trabalho ou uma autorização temporária formal.',
        ],
        es: [
          'No trabajar mientras esté en estatus de visita',
          'Cualquier actividad remunerada, incluida una consultoría breve para una empresa local, exige permiso de trabajo o una autorización temporal formal.',
        ],
      },
      {
        en: [
          'Change to residence from inside only where allowed',
          'Some visit categories can be converted in country by paying a status change fee; others force an exit and re-entry on an employment entry permit. Confirm before you sign a contract.',
        ],
        pt: [
          'Mudar para residência por dentro só quando permitido',
          'Algumas categorias de visita podem ser convertidas no país pagando uma taxa de mudança de status; outras obrigam a sair e reentrar com permissão de entrada por emprego. Confirme antes de assinar contrato.',
        ],
        es: [
          'Cambiar a residencia desde dentro solo cuando se permite',
          'Algunas categorías de visita pueden convertirse en el país pagando una tasa de cambio de estatus; otras obligan a salir y reentrar con un permiso de entrada por empleo. Confírmelo antes de firmar un contrato.',
        ],
      },
    ],
  },

  'Residence Visa / Work / Long Term Stay': {
    core_documents: [
      {
        en: [
          'Passport with the validity required by the sponsor',
          'Companies commonly demand more than six months because the residence is issued against the passport and a short one shortens the permit.',
        ],
        pt: [
          'Passaporte com a validade exigida pelo patrocinador',
          'As empresas costumam exigir mais de seis meses porque a residência é emitida contra o passaporte, e um prazo curto encurta a autorização.',
        ],
        es: [
          'Pasaporte con la vigencia que exige el patrocinador',
          'Las empresas suelen exigir más de seis meses porque la residencia se emite contra el pasaporte, y una vigencia corta acorta el permiso.',
        ],
      },
      {
        en: [
          'A licensed employer or free zone company sponsors you',
          'The sponsoring entity needs a valid establishment card and an available quota. Without a sponsor there is no work residence at all, whatever your qualifications.',
        ],
        pt: [
          'Um empregador licenciado ou empresa de zona franca patrocina você',
          'A entidade patrocinadora precisa de cartão de estabelecimento válido e de cota disponível. Sem patrocinador não existe residência de trabalho, por mais qualificado que você seja.',
        ],
        es: [
          'Un empleador licenciado o empresa de zona franca le patrocina',
          'La entidad patrocinadora necesita una tarjeta de establecimiento vigente y cupo disponible. Sin patrocinador no existe residencia de trabajo, por muy cualificado que sea.',
        ],
      },
      {
        en: [
          'Employment offer registered with the labour authority',
          'The offer is filed and signed before the work permit is issued, and its terms bind the later contract; a mismatch between offer and contract stops the file.',
        ],
        pt: [
          'Oferta de emprego registada na autoridade laboral',
          'A oferta é protocolada e assinada antes da emissão da permissão de trabalho, e os termos dela vinculam o contrato posterior; divergência entre oferta e contrato trava o processo.',
        ],
        es: [
          'Oferta de empleo registrada en la autoridad laboral',
          'La oferta se presenta y se firma antes de emitir el permiso de trabajo, y sus términos vinculan el contrato posterior; una discrepancia entre oferta y contrato detiene el expediente.',
        ],
      },
      {
        en: [
          'Entry permit issued before you travel',
          'The employment entry permit is what you fly on, and it has a short validity from issue. Enter within it or the employer pays to reissue.',
        ],
        pt: [
          'Permissão de entrada emitida antes de você viajar',
          'A permissão de entrada por emprego é o que você usa para voar, e tem validade curta desde a emissão. Entre dentro dela ou o empregador paga para reemitir.',
        ],
        es: [
          'Permiso de entrada emitido antes de viajar',
          'El permiso de entrada por empleo es con lo que vuela, y tiene una validez corta desde su emisión. Entre dentro de ella o el empleador paga por reemitirlo.',
        ],
      },
      {
        en: [
          'Educational certificates fully attested',
          'The chain runs from a notary at home, to your foreign ministry, to the Emirati embassy there, and finally to the Emirati foreign ministry. It takes weeks and cannot be started after arrival.',
        ],
        pt: [
          'Certificados de escolaridade totalmente autenticados',
          'A cadeia vai do notário no país de origem ao seu ministério das relações exteriores, depois à embaixada emiradense lá e por fim ao ministério emiradense. Leva semanas e não dá para começar depois de chegar.',
        ],
        es: [
          'Certificados académicos plenamente legalizados',
          'La cadena va del notario en su país a su ministerio de exteriores, luego a la embajada emiratí allí y por último al ministerio emiratí. Lleva semanas y no puede iniciarse tras llegar.',
        ],
      },
      {
        en: [
          'Photographs and personal data in the authority format',
          'White background and precise dimensions; the identity authority rejects images that do not match, holding the identity card behind it.',
        ],
        pt: [
          'Fotografias e dados pessoais no formato da autoridade',
          'Fundo branco e dimensões precisas; a autoridade de identidade rejeita imagens fora do padrão, travando o cartão de identidade atrás disso.',
        ],
        es: [
          'Fotografías y datos personales en el formato de la autoridad',
          'Fondo blanco y dimensiones exactas; la autoridad de identidad rechaza imágenes que no cumplen, y con ello se retrasa la tarjeta de identidad.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Certificate equivalency from the education ministry',
          'Some professions require the degree to be recognised as equivalent locally, which is a separate step after attestation and can reveal that a qualification does not map.',
        ],
        pt: [
          'Equivalência do diploma pelo ministério da educação',
          'Algumas profissões exigem que o diploma seja reconhecido como equivalente localmente, o que é uma etapa separada após a autenticação e pode revelar que a qualificação não corresponde.',
        ],
        es: [
          'Equivalencia del título por el ministerio de educación',
          'Algunas profesiones exigen que el título se reconozca como equivalente localmente, un paso aparte tras la legalización que puede revelar que la titulación no encaja.',
        ],
      },
      {
        en: [
          'Professional licence from the health or sector regulator',
          'Doctors, nurses, teachers and engineers pass an examination and registration with the relevant emirate authority before the work permit is granted.',
        ],
        pt: [
          'Licença profissional do regulador de saúde ou do setor',
          'Médicos, enfermeiros, professores e engenheiros passam por exame e registo na autoridade do emirado antes de a permissão de trabalho ser concedida.',
        ],
        es: [
          'Licencia profesional del regulador sanitario o sectorial',
          'Médicos, enfermeros, docentes e ingenieros pasan un examen y un registro ante la autoridad del emirato antes de que se conceda el permiso de trabajo.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Experience letters matching the declared skill level',
          'The work permit is classified by skill level, and the classification drives both the fees and your ability to sponsor family later.',
        ],
        pt: [
          'Cartas de experiência compatíveis com o nível declarado',
          'A permissão de trabalho é classificada por nível de qualificação, e essa classificação define tanto as taxas quanto sua capacidade de patrocinar a família depois.',
        ],
        es: [
          'Cartas de experiencia acordes al nivel declarado',
          'El permiso de trabajo se clasifica por nivel de cualificación, y esa clasificación determina tanto las tasas como su capacidad de patrocinar familia después.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Salary paid through the wage protection system',
          'Wages must flow through the monitored payroll system that matches the registered contract. Cash payments leave you with no proof and expose the employer to sanctions.',
        ],
        pt: [
          'Salário pago pelo sistema de proteção salarial',
          'Os salários precisam passar pelo sistema de folha monitorado que corresponde ao contrato registado. Pagamento em dinheiro deixa você sem prova e expõe o empregador a sanções.',
        ],
        es: [
          'Salario abonado por el sistema de protección salarial',
          'Los salarios deben pasar por el sistema de nómina supervisado que coincide con el contrato registrado. El pago en efectivo le deja sin prueba y expone al empleador a sanciones.',
        ],
      },
      {
        en: [
          'Minimum income to sponsor a spouse or children',
          'Family sponsorship opens only above an income level, with a higher one to sponsor parents, and accommodation evidence such as a registered tenancy contract. Check the level in force.',
        ],
        pt: [
          'Renda mínima para patrocinar cônjuge ou filhos',
          'O patrocínio familiar só abre acima de um nível de renda, com nível mais alto para patrocinar pais, e exige comprovação de moradia como contrato de aluguel registado. Confira o nível vigente.',
        ],
        es: [
          'Ingreso mínimo para patrocinar cónyuge o hijos',
          'El patrocinio familiar solo se abre por encima de cierto nivel de ingresos, con uno mayor para patrocinar padres, y exige prueba de vivienda como un contrato de alquiler registrado. Consulte el nivel vigente.',
        ],
        priority: 2,
      },
      {
        en: [
          'The employer bears the permit and residence costs',
          'Work permit, medical test and identity card fees are the company obligation. Deducting them from your salary or holding your passport is unlawful, however common it is.',
        ],
        pt: [
          'O empregador arca com os custos da permissão e da residência',
          'As taxas de permissão de trabalho, exame médico e cartão de identidade são obrigação da empresa. Descontá-las do seu salário ou reter seu passaporte é ilegal, por mais comum que seja.',
        ],
        es: [
          'El empleador asume los costes del permiso y la residencia',
          'Las tasas del permiso de trabajo, la prueba médica y la tarjeta de identidad son obligación de la empresa. Descontarlas de su salario o retener su pasaporte es ilegal, por común que sea.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Sponsor files the work permit with the labour authority',
          'For mainland jobs this goes to the labour ministry; for free zone jobs the free zone authority runs its own equivalent process and its own fee schedule.',
        ],
        pt: [
          'Patrocinador protocola a permissão de trabalho na autoridade laboral',
          'Nos empregos de mainland isso vai ao ministério do trabalho; nos de zona franca a própria autoridade da zona conduz o processo equivalente com tabela de taxas própria.',
        ],
        es: [
          'El patrocinador presenta el permiso de trabajo ante la autoridad laboral',
          'En los empleos de mainland esto va al ministerio de trabajo; en los de zona franca la propia autoridad de la zona lleva el proceso equivalente con su propia tabla de tasas.',
        ],
      },
      {
        en: [
          'Change status or enter on the employment permit',
          'If you are already in the country as a visitor, the sponsor pays a status change fee instead of sending you out and back. Both routes exist and cost differently.',
        ],
        pt: [
          'Mudar de status ou entrar com a permissão de emprego',
          'Se você já está no país como visitante, o patrocinador paga uma taxa de mudança de status em vez de mandá-lo sair e voltar. As duas rotas existem e custam diferente.',
        ],
        es: [
          'Cambiar de estatus o entrar con el permiso de empleo',
          'Si ya está en el país como visitante, el patrocinador paga una tasa de cambio de estatus en lugar de hacerle salir y volver. Ambas vías existen y cuestan distinto.',
        ],
      },
      {
        en: [
          'Complete every formality inside the permit window',
          'Medical test, identity card and residence issuance all have to be finished within the period stamped on the entry permit, and daily fines start the moment it lapses.',
        ],
        pt: [
          'Concluir todas as formalidades dentro da janela da permissão',
          'Exame médico, cartão de identidade e emissão da residência precisam ser concluídos dentro do prazo carimbado na permissão de entrada, e as multas diárias começam assim que ele vence.',
        ],
        es: [
          'Completar todos los trámites dentro de la ventana del permiso',
          'La prueba médica, la tarjeta de identidad y la emisión de la residencia deben terminarse dentro del plazo sellado en el permiso de entrada, y las multas diarias empiezan en cuanto vence.',
        ],
      },
      {
        en: [
          'Residence is issued electronically, not stamped',
          'The residence is now a digital record linked to the identity card rather than a sticker in the passport, so keep the approval and the card together as your proof.',
        ],
        pt: [
          'A residência é emitida eletronicamente, sem carimbo',
          'A residência hoje é um registo digital ligado ao cartão de identidade, e não um adesivo no passaporte, então guarde a aprovação junto com o cartão como prova.',
        ],
        es: [
          'La residencia se emite electrónicamente, sin sello',
          'Hoy la residencia es un registro digital vinculado a la tarjeta de identidad, no una pegatina en el pasaporte, así que guarde la aprobación junto con la tarjeta como prueba.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical fitness test at an approved centre',
          'Blood screening and a chest X-ray at a government-approved centre. This is not a formality: a positive result for the screened conditions ends the residence and leads to removal.',
        ],
        pt: [
          'Exame de aptidão médica em centro aprovado',
          'Exames de sangue e radiografia de tórax em centro aprovado pelo governo. Não é formalidade: resultado positivo para as condições rastreadas encerra a residência e leva à saída compulsória.',
        ],
        es: [
          'Prueba de aptitud médica en un centro aprobado',
          'Análisis de sangre y radiografía de tórax en un centro aprobado por el gobierno. No es un trámite: un resultado positivo en las condiciones cribadas termina la residencia y conduce a la expulsión.',
        ],
      },
      {
        en: [
          'Biometrics for the Emirates identity card',
          'Fingerprints and a facial scan at an accredited centre. The card is the key to a bank account, a lease, a phone line and a driving licence, so nothing else can start before it.',
        ],
        pt: [
          'Biometria para o cartão de identidade emiradense',
          'Impressões digitais e leitura facial em centro credenciado. O cartão é a chave para conta bancária, contrato de aluguel, linha telefônica e carta de condução, então nada mais começa antes dele.',
        ],
        es: [
          'Biometría para la tarjeta de identidad emiratí',
          'Huellas y escaneo facial en un centro acreditado. La tarjeta es la llave para la cuenta bancaria, el alquiler, la línea de móvil y el permiso de conducir, así que nada empieza antes de ella.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the identity card and register the address',
          'The card arrives within days of the biometrics; register your tenancy with the emirate so utilities and family sponsorship can proceed.',
        ],
        pt: [
          'Retirar o cartão de identidade e registar o endereço',
          'O cartão chega poucos dias após a biometria; registe seu contrato de aluguel no emirado para que utilidades e patrocínio familiar possam avançar.',
        ],
        es: [
          'Recoger la tarjeta de identidad y registrar el domicilio',
          'La tarjeta llega pocos días después de la biometría; registre su contrato de alquiler en el emirato para que los suministros y el patrocinio familiar puedan avanzar.',
        ],
      },
      {
        en: [
          'Understand that the residence dies with the job',
          'Resignation or dismissal cancels the residence and starts a short grace period to find another sponsor or leave; family members sponsored by you fall at the same moment.',
        ],
        pt: [
          'Entender que a residência morre junto com o emprego',
          'Demissão ou dispensa cancela a residência e inicia um período de graça curto para achar outro patrocinador ou sair; os familiares patrocinados por você caem no mesmo instante.',
        ],
        es: [
          'Entender que la residencia muere con el empleo',
          'La renuncia o el despido cancela la residencia e inicia un breve periodo de gracia para hallar otro patrocinador o salir; los familiares que usted patrocina caen en el mismo momento.',
        ],
      },
      {
        en: [
          'Do not stay outside the country too long',
          'A continuous absence beyond the permitted period voids an ordinary residence automatically, even if the card still shows a future expiry date.',
        ],
        pt: [
          'Não ficar fora do país por tempo demais',
          'Uma ausência contínua além do período permitido anula automaticamente a residência comum, mesmo que o cartão ainda mostre uma data futura de vencimento.',
        ],
        es: [
          'No permanecer demasiado tiempo fuera del país',
          'Una ausencia continua más allá del periodo permitido anula automáticamente la residencia ordinaria, aunque la tarjeta siga mostrando una fecha futura de caducidad.',
        ],
      },
      {
        en: [
          'Renew before expiry and keep health cover active',
          'Ordinary residences run in short cycles and renewal repeats the medical test and the card. Employer-provided health insurance is mandatory and its lapse blocks the renewal.',
        ],
        pt: [
          'Renovar antes do vencimento e manter a cobertura de saúde ativa',
          'As residências comuns correm em ciclos curtos e a renovação repete o exame médico e o cartão. O seguro de saúde fornecido pelo empregador é obrigatório e sua interrupção trava a renovação.',
        ],
        es: [
          'Renovar antes de la caducidad y mantener la cobertura sanitaria',
          'Las residencias ordinarias corren en ciclos cortos y la renovación repite la prueba médica y la tarjeta. El seguro de salud del empleador es obligatorio y su interrupción bloquea la renovación.',
        ],
      },
    ],
  },

  'Golden / Long-Term Residency Program': {
    core_documents: [
      {
        en: [
          'Valid passport for the long-term application',
          'The residence runs for several years, so a passport close to expiry forces a renewal before the file is even submitted.',
        ],
        pt: [
          'Passaporte válido para o pedido de longo prazo',
          'A residência dura vários anos, então um passaporte perto do vencimento obriga a renová-lo antes mesmo de submeter o dossiê.',
        ],
        es: [
          'Pasaporte vigente para la solicitud de largo plazo',
          'La residencia dura varios años, de modo que un pasaporte próximo a caducar obliga a renovarlo antes incluso de presentar el expediente.',
        ],
      },
      {
        en: [
          'Establish which eligibility category you fall under',
          'Investors, property owners, entrepreneurs, specialised talent, scientists, outstanding students and frontline workers are assessed under entirely different evidence rules. Choosing the wrong one wastes the fee.',
        ],
        pt: [
          'Definir sob qual categoria de elegibilidade você se enquadra',
          'Investidores, proprietários de imóveis, empreendedores, talentos especializados, cientistas, estudantes de destaque e profissionais da linha de frente são avaliados por regras de prova completamente diferentes. Escolher errado desperdiça a taxa.',
        ],
        es: [
          'Definir bajo qué categoría de elegibilidad encaja',
          'Inversores, propietarios, emprendedores, talento especializado, científicos, estudiantes destacados y personal de primera línea se evalúan con reglas de prueba totalmente distintas. Elegir mal desperdicia la tasa.',
        ],
      },
      {
        en: [
          'No employer or local sponsor is needed',
          'This is the structural difference from every other residence here: the holder sponsors themselves, so leaving a job does not touch the status.',
        ],
        pt: [
          'Não é preciso empregador nem patrocinador local',
          'Esta é a diferença estrutural em relação a todas as outras residências aqui: o titular patrocina a si mesmo, então sair de um emprego não afeta o status.',
        ],
        es: [
          'No hace falta empleador ni patrocinador local',
          'Esta es la diferencia estructural frente a todas las demás residencias aquí: el titular se patrocina a sí mismo, así que dejar un empleo no afecta al estatus.',
        ],
      },
      {
        en: [
          'Category evidence such as title deed or trade licence',
          'A property route needs the registered title deed and a valuation certificate; an entrepreneur route needs the licence and an accredited incubator or auditor letter.',
        ],
        pt: [
          'Prova da categoria como escritura ou licença comercial',
          'A rota de imóvel exige a escritura registada e um laudo de avaliação; a rota de empreendedor exige a licença e uma carta de incubadora credenciada ou de auditor.',
        ],
        es: [
          'Prueba de la categoría como escritura o licencia comercial',
          'La vía inmobiliaria exige la escritura registrada y un certificado de tasación; la vía de emprendedor exige la licencia y una carta de incubadora acreditada o de auditor.',
        ],
      },
      {
        en: [
          'Nomination letter where the category requires one',
          'Several talent categories are not open applications at all: a federal or emirate authority nominates you, and without that letter there is nothing to file.',
        ],
        pt: [
          'Carta de indicação quando a categoria exigir',
          'Várias categorias de talento não são de livre candidatura: uma autoridade federal ou do emirado indica você, e sem essa carta não há o que protocolar.',
        ],
        es: [
          'Carta de nominación cuando la categoría lo exija',
          'Varias categorías de talento no son de libre solicitud: una autoridad federal o del emirato le nomina, y sin esa carta no hay nada que presentar.',
        ],
        priority: 2,
        required: false,
      },
    ],
    education: [
      {
        en: [
          'Attested degrees with an endorsement from a recognised body',
          'The specialised talent route asks for the qualification plus a letter from an accredited institution confirming the field and the level of the work.',
        ],
        pt: [
          'Diplomas autenticados com endosso de órgão reconhecido',
          'A rota de talento especializado pede a qualificação mais uma carta de instituição credenciada confirmando a área e o nível do trabalho.',
        ],
        es: [
          'Títulos legalizados con aval de un organismo reconocido',
          'La vía de talento especializado pide la titulación más una carta de una institución acreditada que confirme el campo y el nivel del trabajo.',
        ],
      },
      {
        en: [
          'Scientific council ratification for researchers',
          'Scientists are assessed by a dedicated council on publications, patents and citations, not by a document checklist.',
        ],
        pt: [
          'Ratificação do conselho científico para pesquisadores',
          'Cientistas são avaliados por um conselho específico com base em publicações, patentes e citações, não por uma lista de documentos.',
        ],
        es: [
          'Ratificación del consejo científico para investigadores',
          'A los científicos les evalúa un consejo específico según publicaciones, patentes y citas, no según una lista de documentos.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Academic results for the outstanding student route',
          'Local school leavers and graduates of ranked universities qualify on grade thresholds, and the school or university confirms the result directly.',
        ],
        pt: [
          'Resultados acadêmicos na rota de estudante de destaque',
          'Concluintes de escolas locais e formados de universidades bem colocadas qualificam por notas mínimas, e a escola ou universidade confirma o resultado diretamente.',
        ],
        es: [
          'Resultados académicos en la vía de estudiante destacado',
          'Los egresados de escuelas locales y de universidades bien clasificadas califican por notas mínimas, y el centro confirma el resultado directamente.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Meet the investment threshold set for your route',
          'Property, fund and company routes each carry their own minimum, and the amounts are revised. Verify the figure currently in force rather than relying on an article.',
        ],
        pt: [
          'Atingir o piso de investimento definido para a sua rota',
          'As rotas de imóvel, fundo e empresa têm cada uma seu mínimo, e os valores são revistos. Confirme o número em vigor em vez de confiar em uma matéria.',
        ],
        es: [
          'Alcanzar el umbral de inversión fijado para su vía',
          'Las vías de inmueble, fondo y empresa tienen cada una su mínimo, y los importes se revisan. Verifique la cifra vigente en lugar de fiarse de un artículo.',
        ],
      },
      {
        en: [
          'Prove the source and status of the invested funds',
          'A bank or developer letter confirming the payment, and confirmation of how much of the asset is mortgaged, since financed portions may not count towards the threshold.',
        ],
        pt: [
          'Comprovar a origem e a situação dos recursos investidos',
          'Carta do banco ou da incorporadora confirmando o pagamento, e confirmação de quanto do ativo está hipotecado, já que parcelas financiadas podem não contar para o piso.',
        ],
        es: [
          'Acreditar el origen y la situación de los fondos invertidos',
          'Carta del banco o de la promotora que confirme el pago, y constancia de cuánto del activo está hipotecado, ya que la parte financiada puede no contar para el umbral.',
        ],
      },
      {
        en: [
          'Salary level and contract for the talent route',
          'Specialised professionals qualify on a monthly salary floor together with a valid employment contract, so this route is not fully independent of an employer at entry.',
        ],
        pt: [
          'Nível salarial e contrato na rota de talento',
          'Profissionais especializados qualificam por um piso de salário mensal somado a um contrato de trabalho válido, então essa rota não é totalmente independente de empregador na entrada.',
        ],
        es: [
          'Nivel salarial y contrato en la vía de talento',
          'Los profesionales especializados califican por un salario mensual mínimo junto con un contrato de trabajo vigente, así que esta vía no es del todo independiente de un empleador al inicio.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply through the identity authority or the emirate channel',
          'Federal smart services handle most cases while Dubai runs its own portal, and free zones can submit for their licensed companies. Pick one and do not duplicate the file.',
        ],
        pt: [
          'Pedir pela autoridade de identidade ou pelo canal do emirado',
          'Os serviços federais atendem a maioria dos casos, enquanto Dubai opera portal próprio, e zonas francas podem submeter pelas empresas licenciadas. Escolha um canal e não duplique o dossiê.',
        ],
        es: [
          'Solicitar por la autoridad de identidad o el canal del emirato',
          'Los servicios federales atienden la mayoría de los casos, mientras Dubái opera su propio portal, y las zonas francas pueden presentar por sus empresas licenciadas. Elija un canal y no duplique el expediente.',
        ],
      },
      {
        en: [
          'Pay the application and long-term issuance fees',
          'Higher than an ordinary residence because the permit runs for years, and there are separate charges for each dependant added later.',
        ],
        pt: [
          'Pagar as taxas de pedido e de emissão de longo prazo',
          'Mais altas que numa residência comum porque a autorização vale por anos, e há cobranças separadas por cada dependente incluído depois.',
        ],
        es: [
          'Pagar las tasas de solicitud y de emisión a largo plazo',
          'Más altas que en una residencia ordinaria porque el permiso dura años, y hay cargos separados por cada dependiente añadido después.',
        ],
      },
      {
        en: [
          'Cancel any existing residence before the switch',
          'You cannot hold two residences at once. The current employer must cancel theirs, which briefly leaves you without status, so time the two steps together.',
        ],
        pt: [
          'Cancelar qualquer residência existente antes da troca',
          'Não é possível manter duas residências ao mesmo tempo. O empregador atual precisa cancelar a dele, o que deixa você brevemente sem status, então sincronize as duas etapas.',
        ],
        es: [
          'Cancelar cualquier residencia existente antes del cambio',
          'No se pueden mantener dos residencias a la vez. El empleador actual debe cancelar la suya, lo que le deja brevemente sin estatus, así que sincronice ambos pasos.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fitness screening before the long-term permit issues',
          'The same approved-centre blood tests and X-ray apply here; the length of the visa does not exempt anyone from it.',
        ],
        pt: [
          'Triagem de aptidão antes de emitir a autorização de longo prazo',
          'Valem aqui os mesmos exames de sangue e radiografia em centro aprovado; a duração do visto não isenta ninguém.',
        ],
        es: [
          'Cribado de aptitud antes de emitir el permiso de largo plazo',
          'Aquí rigen los mismos análisis y radiografía en centro aprobado; la duración del visado no exime a nadie.',
        ],
      },
      {
        en: [
          'Identity card issued for the full residence period',
          'The card is produced with a validity matching the long-term permit instead of the short cycle of an employment residence, so the renewal burden drops sharply.',
        ],
        pt: [
          'Cartão de identidade emitido pelo período completo da residência',
          'O cartão sai com validade igual à da autorização de longo prazo, em vez do ciclo curto de uma residência por emprego, o que reduz muito o esforço de renovação.',
        ],
        es: [
          'Tarjeta de identidad emitida por todo el periodo de residencia',
          'La tarjeta se emite con una validez igual a la del permiso de largo plazo, en lugar del ciclo corto de una residencia por empleo, lo que reduce mucho la carga de renovación.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Sponsor family and staff without a salary ceiling',
          'The holder may sponsor spouse, children of any age and domestic workers, and the family keeps the status for the remainder of the term even if the holder dies.',
        ],
        pt: [
          'Patrocinar família e funcionários sem teto salarial',
          'O titular pode patrocinar cônjuge, filhos de qualquer idade e trabalhadores domésticos, e a família mantém o status pelo restante do prazo mesmo em caso de falecimento do titular.',
        ],
        es: [
          'Patrocinar a la familia y al personal sin techo salarial',
          'El titular puede patrocinar cónyuge, hijos de cualquier edad y empleados domésticos, y la familia conserva el estatus por el resto del plazo incluso si el titular fallece.',
        ],
      },
      {
        en: [
          'Long absences abroad do not cancel this status',
          'Unlike an ordinary residence, staying outside the country for extended periods does not void it, which is the practical reason many people pursue this route.',
        ],
        pt: [
          'Ausências longas no exterior não cancelam este status',
          'Diferente de uma residência comum, ficar fora do país por períodos prolongados não o anula, e é essa a razão prática pela qual muita gente busca esta rota.',
        ],
        es: [
          'Las ausencias largas en el extranjero no cancelan este estatus',
          'A diferencia de una residencia ordinaria, permanecer fuera del país periodos prolongados no lo anula, y esa es la razón práctica por la que muchos buscan esta vía.',
        ],
      },
      {
        en: [
          'Maintain the qualifying condition for the whole term',
          'Selling the property, closing the company or losing the accreditation that supported the file can end the residence before its printed expiry.',
        ],
        pt: [
          'Manter a condição qualificadora durante todo o prazo',
          'Vender o imóvel, fechar a empresa ou perder o credenciamento que sustentou o dossiê pode encerrar a residência antes da validade impressa.',
        ],
        es: [
          'Mantener la condición que le calificó durante todo el plazo',
          'Vender el inmueble, cerrar la empresa o perder la acreditación que sostuvo el expediente puede terminar la residencia antes de su caducidad impresa.',
        ],
      },
      {
        en: [
          'Keep health insurance valid for you and dependants',
          'Cover is compulsory for every resident and is checked at each renewal; a lapse for one dependant holds the whole family renewal.',
        ],
        pt: [
          'Manter o seguro de saúde válido para você e dependentes',
          'A cobertura é obrigatória para todo residente e é conferida a cada renovação; a interrupção para um dependente trava a renovação de toda a família.',
        ],
        es: [
          'Mantener el seguro de salud vigente para usted y sus dependientes',
          'La cobertura es obligatoria para todo residente y se comprueba en cada renovación; una interrupción en un dependiente bloquea la renovación de toda la familia.',
        ],
      },
      {
        en: [
          'Do not expect this to lead to citizenship',
          'Long-term residence is renewable but is not a naturalisation track; citizenship remains exceptional and is granted by nomination, so plan your life around residence, not a passport.',
        ],
        pt: [
          'Não esperar que isso leve à cidadania',
          'A residência de longo prazo é renovável, mas não é um caminho de naturalização; a cidadania continua excepcional e concedida por indicação, então planeje sua vida em torno da residência, não de um passaporte.',
        ],
        es: [
          'No esperar que esto conduzca a la ciudadanía',
          'La residencia de largo plazo es renovable pero no es una vía de naturalización; la ciudadanía sigue siendo excepcional y se concede por nominación, así que planifique su vida en torno a la residencia, no a un pasaporte.',
        ],
        priority: 2,
      },
    ],
  },
};
