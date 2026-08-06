import type { CountryVisaSteps } from './types';

/**
 * Steps for India.
 *
 * Nearly everything happens on an online portal, and the outcome arrives as a
 * PDF rather than a sticker — which is why the printed visa has to travel with
 * you. Airlines and immigration counters both ask for the paper copy, and a
 * screen is regularly refused at boarding.
 *
 * The e-Visa covers tourism and business for many nationalities but is a
 * dead end: it cannot be converted into another category from inside the
 * country, so a change of purpose means leaving and applying again. For any
 * long-duration visa, registration with the FRRO within fourteen days of
 * arrival is a legal deadline, and it is the step most often missed.
 *
 * The OCI is a separate road entirely — a lifelong visa granted by descent,
 * not a form of Indian citizenship. Treating the two as the same thing is the
 * most common misunderstanding in this country.
 */
export const india: CountryVisaSteps = {
  'Tourist Visa / e-Visa': {
    core_documents: [
      {
        en: [
          'Passport with six months validity and blank pages',
          'Two blank facing pages are checked at the counter, and a passport short on validity is stopped at boarding rather than on arrival.',
        ],
        pt: [
          'Passaporte com seis meses de validade e páginas em branco',
          'Duas páginas em branco lado a lado são conferidas no guichê, e um passaporte com validade curta é barrado no embarque, não na chegada.',
        ],
        es: [
          'Pasaporte con seis meses de validez y páginas en blanco',
          'Se comprueban dos páginas en blanco enfrentadas, y un pasaporte con poca validez se detiene en el embarque, no a la llegada.',
        ],
      },
      {
        en: [
          'Check whether your nationality is eligible for the e-Visa',
          'The electronic route covers many nationalities but not all; those left out apply for a sticker visa at a mission, on a longer timeline.',
        ],
        pt: [
          'Verificar se sua nacionalidade tem direito ao e-Visa',
          'A via eletrônica cobre muitas nacionalidades, mas não todas; quem fica de fora pede visto adesivo numa representação, com prazo maior.',
        ],
        es: [
          'Comprobar si su nacionalidad accede al e-Visa',
          'La vía electrónica cubre muchas nacionalidades, pero no todas; quien queda fuera solicita visado adhesivo en una misión, con plazos mayores.',
        ],
      },
      {
        en: [
          'Colour scan of the passport biographical page',
          'It has to be fully legible. A dark or cropped scan leaves the application sitting as pending without any clear error message.',
        ],
        pt: [
          'Digitalização colorida da página de identificação do passaporte',
          'Precisa estar totalmente legível. Uma digitalização escura ou cortada deixa o pedido parado como pendente, sem mensagem de erro clara.',
        ],
        es: [
          'Escaneo en color de la página de datos del pasaporte',
          'Debe ser totalmente legible. Un escaneo oscuro o recortado deja la solicitud pendiente sin ningún mensaje de error claro.',
        ],
      },
      {
        en: [
          'Digital photograph in the format the portal demands',
          'Square, white background, face fully visible. This upload is the single most frequent point of failure in the whole application.',
        ],
        pt: [
          'Fotografia digital no formato exigido pelo portal',
          'Quadrada, fundo branco, rosto inteiramente visível. Esse envio é o ponto de falha mais frequente de todo o pedido.',
        ],
        es: [
          'Fotografía digital en el formato que exige el portal',
          'Cuadrada, fondo blanco, rostro completamente visible. Esa carga es el punto de fallo más frecuente de toda la solicitud.',
        ],
      },
      {
        en: [
          'Confirmed address of stay in India',
          'A hotel booking or the full address of whoever is hosting you; the form will not accept an incomplete one.',
        ],
        pt: [
          'Endereço confirmado de hospedagem na Índia',
          'Reserva de hotel ou o endereço completo de quem vai receber você; o formulário não aceita um endereço incompleto.',
        ],
        es: [
          'Dirección confirmada de alojamiento en la India',
          'Una reserva de hotel o la dirección completa de quien le aloja; el formulario no acepta una dirección incompleta.',
        ],
      },
      {
        en: [
          'Return or onward ticket',
          'The airline checks this at check-in, long before Indian immigration ever sees you.',
        ],
        pt: [
          'Passagem de volta ou de continuação',
          'A companhia aérea confere isso no check-in, muito antes de a imigração indiana ver você.',
        ],
        es: [
          'Billete de vuelta o de continuación',
          'La aerolínea lo comprueba en el mostrador, mucho antes de que le vea inmigración en la India.',
        ],
      },
      {
        en: [
          'Details of any previous Indian visa or refusal',
          'The form asks for your history; omitting an earlier trip or a past refusal is treated as a false declaration, not as forgetfulness.',
        ],
        pt: [
          'Dados de vistos indianos anteriores ou recusas',
          'O formulário pergunta o histórico; omitir uma viagem anterior ou uma recusa é tratado como declaração falsa, não como esquecimento.',
        ],
        es: [
          'Datos de visados indios anteriores o denegaciones',
          'El formulario pide su historial; omitir un viaje anterior o una denegación se trata como declaración falsa, no como un olvido.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Bank statements showing funds for the trip',
          'An officer can ask for them on arrival, and the balance should look plausible for the length of the itinerary declared.',
        ],
        pt: [
          'Extratos bancários mostrando recursos para a viagem',
          'Um agente pode pedi-los na chegada, e o saldo deve ser plausível para a duração do itinerário declarado.',
        ],
        es: [
          'Extractos bancarios que muestren fondos para el viaje',
          'Un agente puede pedirlos a la llegada, y el saldo debe ser plausible para la duración del itinerario declarado.',
        ],
      },
      {
        en: [
          'Sponsor letter when someone else pays',
          'Accompanied by that person own statements and proof of status; a bare letter without financial backing carries little weight.',
        ],
        pt: [
          'Carta do patrocinador quando outra pessoa custeia',
          'Acompanhada dos extratos e da comprovação de status dessa pessoa; uma carta solta, sem lastro financeiro, pesa pouco.',
        ],
        es: [
          'Carta del patrocinador cuando paga otra persona',
          'Acompañada de los extractos y la prueba de estatus de esa persona; una carta suelta, sin respaldo financiero, pesa poco.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply only on the official government portal',
          'Lookalike sites charge a markup for the same free form and have no connection to immigration; verify the domain before entering anything.',
        ],
        pt: [
          'Pedir somente no portal oficial do governo',
          'Sites parecidos cobram sobretaxa pelo mesmo formulário gratuito e não têm ligação com a imigração; confira o domínio antes de digitar qualquer coisa.',
        ],
        es: [
          'Solicitar únicamente en el portal oficial del gobierno',
          'Sitios parecidos cobran un sobreprecio por el mismo formulario gratuito y no tienen vínculo con inmigración; verifique el dominio antes de escribir nada.',
        ],
      },
      {
        en: [
          'Apply inside the advance window the portal allows',
          'The e-Visa can only be requested within a limited number of days before travel; applying too early is as fatal as applying too late.',
        ],
        pt: [
          'Pedir dentro da janela de antecedência permitida pelo portal',
          'O e-Visa só pode ser solicitado dentro de um número limitado de dias antes da viagem; pedir cedo demais é tão fatal quanto pedir tarde demais.',
        ],
        es: [
          'Solicitar dentro de la ventana de antelación que permite el portal',
          'El e-Visa solo puede pedirse dentro de un número limitado de días antes del viaje; solicitarlo demasiado pronto es tan fatal como hacerlo tarde.',
        ],
      },
      {
        en: [
          'Pay the electronic visa fee',
          'The amount varies by nationality and by the length of the visa; check the schedule in force, and expect no refund if the application is refused.',
        ],
        pt: [
          'Pagar a taxa do visto eletrônico',
          'O valor varia por nacionalidade e pela duração do visto; confira a tabela vigente e não conte com reembolso se o pedido for negado.',
        ],
        es: [
          'Pagar la tasa del visado electrónico',
          'El importe varía según nacionalidad y duración del visado; consulte la tarifa vigente y no cuente con reembolso si se deniega la solicitud.',
        ],
      },
      {
        en: [
          'Wait for the authorisation email and check the spam folder',
          'The decision usually takes a few business days and arrives by email; nothing is stamped into the passport beforehand.',
        ],
        pt: [
          'Aguardar o e-mail de autorização e conferir a caixa de spam',
          'A decisão costuma levar alguns dias úteis e chega por e-mail; nada é carimbado no passaporte antes disso.',
        ],
        es: [
          'Esperar el correo de autorización y revisar la carpeta de spam',
          'La decisión suele tardar unos días hábiles y llega por correo; nada se sella en el pasaporte antes de eso.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometrics taken at the airport on arrival',
          'Fingerprints and a photograph at the immigration counter; there is no prior appointment on the electronic route.',
        ],
        pt: [
          'Biometria coletada no aeroporto na chegada',
          'Impressões digitais e fotografia no guichê de imigração; não há agendamento prévio na via eletrônica.',
        ],
        es: [
          'Biometría tomada en el aeropuerto a la llegada',
          'Huellas y fotografía en el mostrador de inmigración; no hay cita previa en la vía electrónica.',
        ],
      },
      {
        en: [
          'Yellow fever certificate if your route passes an at-risk country',
          'The rule follows the itinerary, not your residence, so a stopover triggers it; without the card you can be held in quarantine on arrival.',
        ],
        pt: [
          'Certificado de febre amarela se a rota passar por país de risco',
          'A regra segue o itinerário, não sua residência, então uma conexão já aciona a exigência; sem a caderneta você pode ser retido em quarentena na chegada.',
        ],
        es: [
          'Certificado de fiebre amarilla si su ruta pasa por un país de riesgo',
          'La regla sigue el itinerario, no su residencia, así que una escala ya la activa; sin la cartilla puede quedar retenido en cuarentena al llegar.',
        ],
      },
      {
        en: [
          'Travel medical insurance',
          'Not compulsory, but visitors are treated in private hospitals that bill upfront, before any question of reimbursement.',
        ],
        pt: [
          'Seguro médico de viagem',
          'Não é obrigatório, mas visitantes são atendidos em hospitais privados que cobram na hora, antes de qualquer discussão sobre reembolso.',
        ],
        es: [
          'Seguro médico de viaje',
          'No es obligatorio, pero los visitantes se atienden en hospitales privados que cobran por adelantado, antes de hablar de reembolso.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Print the approved visa and carry it on the flight',
          'India expects a paper copy at boarding and at the counter; a screenshot on a phone is regularly refused.',
        ],
        pt: [
          'Imprimir o visto aprovado e levá-lo na viagem',
          'A Índia espera uma cópia em papel no embarque e no guichê; uma captura de tela no celular é recusada com frequência.',
        ],
        es: [
          'Imprimir el visado aprobado y llevarlo en el viaje',
          'India espera una copia en papel en el embarque y en el mostrador; una captura de pantalla en el móvil se rechaza a menudo.',
        ],
      },
      {
        en: [
          'Enter through a designated airport or seaport',
          'The electronic visa is only valid at the listed ports of entry, so arriving at a land border means being turned back.',
        ],
        pt: [
          'Entrar por aeroporto ou porto designado',
          'O visto eletrônico só vale nos pontos de entrada listados, então chegar por fronteira terrestre significa ser barrado.',
        ],
        es: [
          'Entrar por un aeropuerto o puerto designado',
          'El visado electrónico solo vale en los puntos de entrada listados, así que llegar por frontera terrestre implica ser rechazado.',
        ],
      },
      {
        en: [
          'Do not count on converting this visa inside India',
          'It cannot be changed into an employment or study category from within the country; that means leaving and applying afresh from abroad.',
        ],
        pt: [
          'Não contar em converter esse visto de dentro da Índia',
          'Ele não pode ser mudado para categoria de trabalho ou estudo de dentro do país; é preciso sair e pedir de novo no exterior.',
        ],
        es: [
          'No contar con convertir este visado desde dentro de la India',
          'No puede cambiarse a una categoría de trabajo o estudio desde el país; hay que salir y solicitar de nuevo en el exterior.',
        ],
      },
      {
        en: [
          'Respect the cumulative days allowed in a year',
          'Some tourist categories cap total days per calendar year regardless of how many entries the visa permits.',
        ],
        pt: [
          'Respeitar o total de dias permitido por ano',
          'Algumas categorias de turismo limitam os dias somados no ano civil, independentemente de quantas entradas o visto permite.',
        ],
        es: [
          'Respetar el total de días permitido por año',
          'Algunas categorías de turismo limitan los días acumulados en el año natural, sin importar cuántas entradas permita el visado.',
        ],
      },
      {
        en: [
          'Get a separate permit for protected or restricted areas',
          'Several states and island groups need their own permit; the visa on its own does not admit you to them.',
        ],
        pt: [
          'Obter permissão separada para áreas protegidas ou restritas',
          'Vários estados e arquipélagos exigem autorização própria; o visto sozinho não dá acesso a eles.',
        ],
        es: [
          'Obtener un permiso aparte para zonas protegidas o restringidas',
          'Varios estados y archipiélagos exigen su propio permiso; el visado por sí solo no le da acceso a ellos.',
        ],
        priority: 2,
      },
    ],
  },

  'Employment Visa': {
    core_documents: [
      {
        en: [
          'Passport with a full year of validity remaining',
          'Missions commonly refuse passports that expire before the period being requested; renew first rather than mid-process.',
        ],
        pt: [
          'Passaporte com um ano inteiro de validade restante',
          'As representações costumam recusar passaportes que vencem antes do período pedido; renove antes, e não no meio do processo.',
        ],
        es: [
          'Pasaporte con un año completo de validez restante',
          'Las misiones suelen rechazar pasaportes que caducan antes del periodo solicitado; renueve antes y no a mitad del trámite.',
        ],
      },
      {
        en: [
          'Employment visa application filled on the online portal',
          'The form is completed online and then printed for submission; the printout must carry the same reference number as the electronic record.',
        ],
        pt: [
          'Pedido de visto de trabalho preenchido no portal online',
          'O formulário é preenchido online e depois impresso para entrega; a via impressa precisa ter o mesmo número de referência do registro eletrônico.',
        ],
        es: [
          'Solicitud de visado de trabajo cumplimentada en el portal en línea',
          'El formulario se rellena en línea y luego se imprime para presentarlo; la copia impresa debe llevar el mismo número de referencia que el registro electrónico.',
        ],
      },
      {
        en: [
          'Appointment letter and contract from the Indian entity',
          'It must state the role, the duration and the full remuneration; a vague offer letter is the usual cause of a query that costs weeks.',
        ],
        pt: [
          'Carta de nomeação e contrato da entidade indiana',
          'Precisa indicar a função, a duração e a remuneração completa; uma carta de oferta vaga é a causa habitual de uma exigência que custa semanas.',
        ],
        es: [
          'Carta de nombramiento y contrato de la entidad india',
          'Debe indicar el puesto, la duración y la remuneración completa; una carta de oferta vaga es la causa habitual de un requerimiento que cuesta semanas.',
        ],
      },
      {
        en: [
          'Employer justification for hiring a foreign national',
          'The category exists only for roles that qualified Indians are not readily available to fill, so the letter has to explain the skill gap concretely.',
        ],
        pt: [
          'Justificativa do empregador para contratar um estrangeiro',
          'A categoria existe só para funções que indianos qualificados não estão prontamente disponíveis para ocupar, então a carta precisa explicar a lacuna de forma concreta.',
        ],
        es: [
          'Justificación del empleador para contratar a un extranjero',
          'La categoría existe solo para puestos que indios cualificados no están disponibles para cubrir, así que la carta debe explicar la brecha de forma concreta.',
        ],
      },
      {
        en: [
          'Registration documents of the sponsoring company',
          'Incorporation certificate and tax registrations, plus the sponsor undertaking covering your conduct and your departure at the end.',
        ],
        pt: [
          'Documentos de registro da empresa patrocinadora',
          'Certidão de constituição e inscrições fiscais, além do termo de responsabilidade do patrocinador sobre sua conduta e sua saída ao final.',
        ],
        es: [
          'Documentos de registro de la empresa patrocinadora',
          'Certificado de constitución e inscripciones fiscales, más el compromiso del patrocinador sobre su conducta y su salida al final.',
        ],
      },
      {
        en: [
          'Photographs to the specification of the mission',
          'Square format on a white background; the sizes accepted for other countries are routinely rejected here.',
        ],
        pt: [
          'Fotografias no padrão exigido pela representação',
          'Formato quadrado com fundo branco; os tamanhos aceitos por outros países são rejeitados aqui de forma rotineira.',
        ],
        es: [
          'Fotografías según el estándar de la misión',
          'Formato cuadrado con fondo blanco; los tamaños que aceptan otros países se rechazan aquí de forma rutinaria.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Degree certificates and professional qualifications',
          'The role has to match what you are qualified for; an unrelated degree weakens the skill-gap argument the whole application rests on.',
        ],
        pt: [
          'Diplomas e qualificações profissionais',
          'A função precisa corresponder à sua qualificação; um diploma sem relação enfraquece o argumento de lacuna em que todo o pedido se apoia.',
        ],
        es: [
          'Títulos y cualificaciones profesionales',
          'El puesto debe corresponder a su titulación; un título sin relación debilita el argumento de brecha en que se apoya toda la solicitud.',
        ],
      },
      {
        en: [
          'Detailed curriculum vitae with employment history',
          'Unexplained gaps and employers that cannot be verified trigger a referral, which adds weeks to the decision.',
        ],
        pt: [
          'Currículo detalhado com histórico de empregos',
          'Lacunas sem explicação e empregadores que não podem ser verificados geram encaminhamento para análise, o que soma semanas à decisão.',
        ],
        es: [
          'Currículum detallado con historial laboral',
          'Los vacíos sin explicar y los empleadores que no pueden verificarse generan una remisión a análisis, lo que suma semanas a la decisión.',
        ],
      },
      {
        en: [
          'Apostille or attestation of the academic documents',
          'Legalisation happens in the country that issued the diploma, so it cannot be arranged after you have already arrived in India.',
        ],
        pt: [
          'Apostilamento ou legalização dos documentos acadêmicos',
          'A legalização é feita no país que emitiu o diploma, então não dá para resolver isso depois de já ter chegado à Índia.',
        ],
        es: [
          'Apostilla o legalización de los documentos académicos',
          'La legalización se hace en el país que emitió el título, así que no puede resolverse después de haber llegado a la India.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence that the salary clears the annual threshold',
          'This category carries a minimum yearly salary; confirm the figure currently in force, and note that some roles such as teachers and ethnic cooks sit outside it.',
        ],
        pt: [
          'Comprovação de que o salário supera o piso anual',
          'Esta categoria tem um salário mínimo anual; confirme o valor vigente e observe que algumas funções, como professores e cozinheiros étnicos, ficam fora dele.',
        ],
        es: [
          'Prueba de que el salario supera el umbral anual',
          'Esta categoría tiene un salario mínimo anual; confirme la cifra vigente y tenga en cuenta que algunos puestos, como docentes y cocineros étnicos, quedan fuera.',
        ],
      },
      {
        en: [
          'Breakdown of pay including allowances and perks',
          'The threshold is measured on total remuneration rather than basic pay, so housing and other allowances count only if they are documented.',
        ],
        pt: [
          'Detalhamento da remuneração com adicionais e benefícios',
          'O piso é medido sobre a remuneração total, e não sobre o salário-base, então moradia e outros adicionais só contam se estiverem documentados.',
        ],
        es: [
          'Desglose de la retribución con complementos y beneficios',
          'El umbral se mide sobre la retribución total y no sobre el salario base, así que la vivienda y otros complementos solo cuentan si están documentados.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply at the mission or the outsourced visa centre',
          'Employment visas are never issued electronically; the e-Visa route does not cover work of any kind.',
        ],
        pt: [
          'Pedir na representação ou no centro de vistos terceirizado',
          'Vistos de trabalho nunca são emitidos eletronicamente; a via do e-Visa não cobre trabalho de nenhum tipo.',
        ],
        es: [
          'Solicitar en la misión o en el centro de visados externalizado',
          'Los visados de trabajo nunca se emiten electrónicamente; la vía del e-Visa no cubre el trabajo de ningún tipo.',
        ],
      },
      {
        en: [
          'Pay the fee set for your nationality',
          'Fees follow reciprocity and differ widely between passports; check the current schedule, and they are not returned on refusal.',
        ],
        pt: [
          'Pagar a taxa fixada para sua nacionalidade',
          'As taxas seguem reciprocidade e variam muito entre passaportes; confira a tabela vigente, e elas não são devolvidas em caso de recusa.',
        ],
        es: [
          'Pagar la tasa fijada para su nacionalidad',
          'Las tasas siguen la reciprocidad y varían mucho entre pasaportes; consulte la tarifa vigente, y no se devuelven si hay denegación.',
        ],
      },
      {
        en: [
          'Allow time for referral to the authorities in India',
          'Certain nationalities and sensitive sectors need prior clearance from Delhi, which can stretch the wait by several weeks.',
        ],
        pt: [
          'Prever tempo para o encaminhamento às autoridades na Índia',
          'Certas nacionalidades e setores sensíveis exigem autorização prévia de Délhi, o que pode esticar a espera em várias semanas.',
        ],
        es: [
          'Prever tiempo para la remisión a las autoridades en la India',
          'Ciertas nacionalidades y sectores sensibles exigen autorización previa de Delhi, lo que puede alargar la espera varias semanas.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometrics at the visa application centre',
          'Fingerprints and a photograph are taken in person; slots in busy cities are booked weeks ahead, so plan around that.',
        ],
        pt: [
          'Biometria no centro de solicitação de vistos',
          'Impressões digitais e fotografia são coletadas presencialmente; as vagas em cidades movimentadas são marcadas com semanas de antecedência.',
        ],
        es: [
          'Biometría en el centro de solicitud de visados',
          'Las huellas y la fotografía se toman en persona; las citas en ciudades concurridas se reservan con semanas de antelación.',
        ],
      },
      {
        en: [
          'Medical report where the mission asks for one',
          'Some posts require an HIV or general medical certificate for long stays, and its validity is short, so taking it too early wastes it.',
        ],
        pt: [
          'Laudo médico quando a representação exigir',
          'Alguns postos pedem certificado de HIV ou exame médico geral para estadas longas, e a validade é curta, então fazer cedo demais desperdiça o exame.',
        ],
        es: [
          'Informe médico cuando la misión lo exija',
          'Algunos puestos piden certificado de VIH o un reconocimiento general para estancias largas, y su validez es corta, así que hacerlo pronto lo desperdicia.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Yellow fever vaccination certificate',
          'Demanded when you arrive from or transit an at-risk country, and the check happens at the arrival counter before anything else.',
        ],
        pt: [
          'Certificado de vacinação contra febre amarela',
          'Exigido quando você vem de país de risco ou faz conexão por um deles, e a conferência acontece no guichê de chegada antes de qualquer outra coisa.',
        ],
        es: [
          'Certificado de vacunación contra la fiebre amarilla',
          'Se exige cuando llega desde un país de riesgo o hace escala en uno, y la comprobación ocurre en el mostrador de llegada antes que nada.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Register with the FRRO within fourteen days of arrival',
          'The deadline is short and it is the step most often missed; registering late means fines and trouble when you try to leave the country.',
        ],
        pt: [
          'Registrar-se no FRRO em até catorze dias da chegada',
          'O prazo é curto e é a etapa mais esquecida; registrar-se atrasado significa multas e problemas na hora de sair do país.',
        ],
        es: [
          'Registrarse en el FRRO dentro de catorce días de la llegada',
          'El plazo es corto y es el paso que más se olvida; registrarse tarde significa multas y problemas al intentar salir del país.',
        ],
      },
      {
        en: [
          'Obtain the residential permit and keep the address current',
          'Any move, and any change in the office you report to, has to be notified; the permit is what proves lawful residence day to day.',
        ],
        pt: [
          'Obter a autorização de residência e manter o endereço atualizado',
          'Qualquer mudança de casa, e qualquer alteração no escritório ao qual você se reporta, precisa ser comunicada; a autorização é o que comprova residência legal no dia a dia.',
        ],
        es: [
          'Obtener el permiso de residencia y mantener la dirección al día',
          'Cualquier mudanza, y cualquier cambio en la oficina a la que reporta, debe comunicarse; el permiso es lo que acredita la residencia legal a diario.',
        ],
      },
      {
        en: [
          'Do not change employer without a fresh approval',
          'The visa is tied to the sponsoring company, so moving jobs generally requires a new application, frequently from outside India.',
        ],
        pt: [
          'Não trocar de empregador sem uma nova aprovação',
          'O visto está vinculado à empresa patrocinadora, então mudar de emprego em geral exige novo pedido, muitas vezes de fora da Índia.',
        ],
        es: [
          'No cambiar de empleador sin una nueva aprobación',
          'El visado está vinculado a la empresa patrocinadora, así que cambiar de trabajo suele exigir una nueva solicitud, a menudo desde fuera de la India.',
        ],
      },
      {
        en: [
          'File the extension before the visa expires',
          'Extensions are granted in India on the employer request; letting the date pass turns a routine renewal into a penalty case.',
        ],
        pt: [
          'Protocolar a prorrogação antes de o visto vencer',
          'As prorrogações são concedidas na Índia a pedido do empregador; deixar a data passar transforma uma renovação de rotina em processo com multa.',
        ],
        es: [
          'Presentar la prórroga antes de que caduque el visado',
          'Las prórrogas se conceden en la India a petición del empleador; dejar pasar la fecha convierte una renovación rutinaria en un caso sancionador.',
        ],
      },
    ],
  },

  'Business Visa': {
    core_documents: [
      {
        en: [
          'Passport valid well beyond the planned visits',
          'Business visas often run for years, and the mission will not grant validity that outlasts the passport it is placed in.',
        ],
        pt: [
          'Passaporte válido bem além das visitas planejadas',
          'Vistos de negócios costumam durar anos, e a representação não concede validade que ultrapasse a do passaporte em que ele é colocado.',
        ],
        es: [
          'Pasaporte válido mucho más allá de las visitas previstas',
          'Los visados de negocios suelen durar años, y la misión no concede una validez que supere la del pasaporte en que se coloca.',
        ],
      },
      {
        en: [
          'Application form with the details of both companies',
          'Yours and the Indian counterpart; inconsistencies between the form and the letters attached are what send a file into extra checks.',
        ],
        pt: [
          'Formulário com os dados das duas empresas',
          'A sua e a contraparte indiana; inconsistências entre o formulário e as cartas anexadas são o que joga o processo em verificações extras.',
        ],
        es: [
          'Formulario con los datos de ambas empresas',
          'La suya y la contraparte india; las inconsistencias entre el formulario y las cartas adjuntas son lo que manda el expediente a comprobaciones adicionales.',
        ],
      },
      {
        en: [
          'Invitation letter from the Indian company',
          'It must set out the nature of the business, the cities to be visited and who bears the costs, not merely welcome you.',
        ],
        pt: [
          'Carta-convite da empresa indiana',
          'Precisa expor a natureza do negócio, as cidades a serem visitadas e quem arca com os custos, e não apenas dar as boas-vindas.',
        ],
        es: [
          'Carta de invitación de la empresa india',
          'Debe exponer la naturaleza del negocio, las ciudades a visitar y quién asume los costes, y no limitarse a darle la bienvenida.',
        ],
      },
      {
        en: [
          'Letter from your employer or your own company',
          'On letterhead, confirming your position and that the trip is being made on the company account rather than as a private visit.',
        ],
        pt: [
          'Carta do seu empregador ou da sua própria empresa',
          'Em papel timbrado, confirmando seu cargo e que a viagem corre por conta da empresa, e não como visita particular.',
        ],
        es: [
          'Carta de su empleador o de su propia empresa',
          'En papel con membrete, confirmando su cargo y que el viaje corre a cuenta de la empresa, no como visita particular.',
        ],
      },
      {
        en: [
          'Proof that the business is registered and trading',
          'Incorporation papers and recent accounts; a company formed weeks before the application attracts obvious scrutiny.',
        ],
        pt: [
          'Prova de que a empresa está registrada e em atividade',
          'Documentos de constituição e demonstrações recentes; uma empresa aberta semanas antes do pedido atrai escrutínio evidente.',
        ],
        es: [
          'Prueba de que la empresa está registrada y en actividad',
          'Documentos de constitución y cuentas recientes; una sociedad creada semanas antes de la solicitud atrae un escrutinio evidente.',
        ],
      },
      {
        en: [
          'History of your earlier travel to India',
          'The form asks for it and consular records already hold it, so an omission reads as concealment rather than as an oversight.',
        ],
        pt: [
          'Histórico das suas viagens anteriores à Índia',
          'O formulário pergunta e os registros consulares já têm essa informação, então omitir soa como ocultação, não como descuido.',
        ],
        es: [
          'Historial de sus viajes anteriores a la India',
          'El formulario lo pide y los registros consulares ya lo tienen, así que omitirlo se lee como ocultación y no como un descuido.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence of financial standing behind the trip',
          'Company accounts or personal statements; the category assumes a business with real turnover, and thin evidence is read as a disguised visit.',
        ],
        pt: [
          'Comprovação de solidez financeira por trás da viagem',
          'Balanços da empresa ou extratos pessoais; a categoria pressupõe um negócio com faturamento real, e provas frágeis soam como visita disfarçada.',
        ],
        es: [
          'Prueba de solvencia financiera detrás del viaje',
          'Cuentas de la empresa o extractos personales; la categoría presupone un negocio con facturación real, y una prueba débil se lee como visita encubierta.',
        ],
      },
      {
        en: [
          'Undertaking that you will draw no Indian salary',
          'This visa permits meetings, sales and technical discussions, never sitting on an Indian payroll; being paid locally is what makes it employment.',
        ],
        pt: [
          'Termo de que você não receberá salário indiano',
          'Este visto permite reuniões, vendas e discussões técnicas, nunca estar na folha de pagamento indiana; receber localmente é o que caracteriza emprego.',
        ],
        es: [
          'Compromiso de que no cobrará salario indio',
          'Este visado permite reuniones, ventas y discusiones técnicas, nunca estar en nómina india; cobrar localmente es lo que configura empleo.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Choose between the electronic route and the sticker visa',
          'The online business visa is faster but shorter and restricted to designated ports; multi-year validity comes only from a mission.',
        ],
        pt: [
          'Escolher entre a via eletrônica e o visto adesivo',
          'O visto de negócios online é mais rápido, porém mais curto e limitado a portos designados; validade de vários anos só sai numa representação.',
        ],
        es: [
          'Elegir entre la vía electrónica y el visado adhesivo',
          'El visado de negocios en línea es más rápido, pero más corto y limitado a puertos designados; la validez de varios años solo sale de una misión.',
        ],
      },
      {
        en: [
          'Pay the fee for the validity you selected',
          'Priced by nationality and by the length of the visa; confirm the current amount before paying, since nothing is returned afterwards.',
        ],
        pt: [
          'Pagar a taxa correspondente à validade escolhida',
          'O preço varia por nacionalidade e pela duração do visto; confirme o valor vigente antes de pagar, já que nada é devolvido depois.',
        ],
        es: [
          'Pagar la tasa correspondiente a la validez elegida',
          'El precio varía por nacionalidad y por la duración del visado; confirme el importe vigente antes de pagar, ya que nada se devuelve después.',
        ],
      },
      {
        en: [
          'Keep the application reference for queries',
          'Business files are referred for checks more often than tourist ones, and answering a query quickly is what keeps the timeline intact.',
        ],
        pt: [
          'Guardar o número de referência do pedido para exigências',
          'Processos de negócios vão para verificação com mais frequência que os de turismo, e responder rápido a uma exigência é o que preserva o cronograma.',
        ],
        es: [
          'Guardar el número de referencia para los requerimientos',
          'Los expedientes de negocios pasan a comprobación más a menudo que los de turismo, y responder rápido es lo que preserva el calendario.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints and photograph on entry',
          'Collected at the immigration counter on each arrival, even when the visa was issued as a sticker abroad.',
        ],
        pt: [
          'Impressões digitais e fotografia na entrada',
          'Coletadas no guichê de imigração a cada chegada, mesmo quando o visto foi emitido como adesivo no exterior.',
        ],
        es: [
          'Huellas y fotografía en la entrada',
          'Se toman en el mostrador de inmigración en cada llegada, incluso cuando el visado se emitió como adhesivo en el exterior.',
        ],
      },
      {
        en: [
          'Yellow fever card when your route demands it',
          'Frequent travellers change routing often, and a single stopover in an at-risk country is enough to make it compulsory on that trip.',
        ],
        pt: [
          'Caderneta de febre amarela quando a rota exigir',
          'Quem viaja com frequência muda de conexão o tempo todo, e uma única escala em país de risco já a torna obrigatória naquela viagem.',
        ],
        es: [
          'Cartilla de fiebre amarilla cuando la ruta lo exija',
          'Quien viaja a menudo cambia de escala continuamente, y una sola parada en un país de riesgo ya la hace obligatoria en ese viaje.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Travel with a printed copy of the visa',
          'Airlines and Indian immigration both ask for the paper document, and an electronic version alone can stop you at the gate.',
        ],
        pt: [
          'Viajar com uma cópia impressa do visto',
          'Companhias aéreas e a imigração indiana pedem o documento em papel, e só a versão eletrônica pode barrar você no portão.',
        ],
        es: [
          'Viajar con una copia impresa del visado',
          'Las aerolíneas y la inmigración india piden el documento en papel, y solo la versión electrónica puede detenerle en la puerta.',
        ],
      },
      {
        en: [
          'Watch the maximum stay allowed per visit',
          'A multi-year visa still caps how long each continuous stay may last; total validity is not permission to remain throughout.',
        ],
        pt: [
          'Observar a permanência máxima por visita',
          'Um visto de vários anos ainda limita quanto pode durar cada estada contínua; validade total não é permissão para ficar o tempo inteiro.',
        ],
        es: [
          'Vigilar la estancia máxima permitida por visita',
          'Un visado de varios años sigue limitando cuánto puede durar cada estancia continua; la validez total no es permiso para quedarse todo el tiempo.',
        ],
      },
      {
        en: [
          'Register locally if one stay passes a hundred and eighty days',
          'Registration is triggered by the length of a single continuous stay, not by the validity printed on the visa.',
        ],
        pt: [
          'Registrar-se localmente se uma estada passar de cento e oitenta dias',
          'O registro é acionado pela duração de uma única estada contínua, e não pela validade impressa no visto.',
        ],
        es: [
          'Registrarse localmente si una estancia supera los ciento ochenta días',
          'El registro se activa por la duración de una sola estancia continua, no por la validez impresa en el visado.',
        ],
      },
      {
        en: [
          'Keep records of the business actually conducted',
          'Useful on re-entry when the pattern of visits is questioned, and necessary if the same partner later sponsors you for work.',
        ],
        pt: [
          'Guardar registros dos negócios efetivamente realizados',
          'Úteis na reentrada quando o padrão de visitas é questionado, e necessários se o mesmo parceiro depois patrocinar você para trabalho.',
        ],
        es: [
          'Conservar registros de los negocios efectivamente realizados',
          'Útiles en la reentrada cuando se cuestiona el patrón de visitas, y necesarios si el mismo socio le patrocina después para trabajar.',
        ],
      },
      {
        en: [
          'Apply from abroad to move onto a work category',
          'Conversion inside the country is not available, so the employment application is lodged at a mission outside India.',
        ],
        pt: [
          'Pedir do exterior para migrar a uma categoria de trabalho',
          'A conversão dentro do país não existe, então o pedido de trabalho é protocolado numa representação fora da Índia.',
        ],
        es: [
          'Solicitar desde el exterior para pasar a una categoría laboral',
          'La conversión dentro del país no existe, así que la solicitud de trabajo se presenta en una misión fuera de la India.',
        ],
        priority: 2,
      },
    ],
  },

  'Overseas Citizen of India (OCI)': {
    core_documents: [
      {
        en: [
          'Proof of eligible Indian ancestry',
          'Eligibility runs through a parent, grandparent or great-grandparent who was an Indian citizen, or through marriage to one after a qualifying period.',
        ],
        pt: [
          'Prova de ascendência indiana elegível',
          'A elegibilidade passa por pai, mãe, avô, avó ou bisavô que tenha sido cidadão indiano, ou por casamento com um deles após um período qualificado.',
        ],
        es: [
          'Prueba de ascendencia india elegible',
          'La elegibilidad pasa por un padre, abuelo o bisabuelo que fuera ciudadano indio, o por matrimonio con uno de ellos tras un periodo cualificado.',
        ],
      },
      {
        en: [
          'Current foreign passport of the applicant',
          'The card is linked to that passport number, so applying just before renewing the passport creates re-issue work you could have avoided.',
        ],
        pt: [
          'Passaporte estrangeiro atual do requerente',
          'O cartão fica vinculado ao número desse passaporte, então pedir logo antes de renovar cria um trabalho de reemissão que dava para evitar.',
        ],
        es: [
          'Pasaporte extranjero actual del solicitante',
          'La tarjeta queda vinculada a ese número de pasaporte, así que solicitarla justo antes de renovarlo genera una reexpedición evitable.',
        ],
      },
      {
        en: [
          'Evidence of your present nationality',
          'A naturalisation certificate or national identity document; the route is only open to foreign nationals, never to current Indian citizens.',
        ],
        pt: [
          'Comprovação da sua nacionalidade atual',
          'Certificado de naturalização ou documento nacional de identidade; a via só está aberta a estrangeiros, nunca a cidadãos indianos atuais.',
        ],
        es: [
          'Prueba de su nacionalidad actual',
          'Certificado de naturalización o documento nacional de identidad; la vía solo está abierta a extranjeros, nunca a ciudadanos indios actuales.',
        ],
      },
      {
        en: [
          'Indian document belonging to the ancestor',
          'The ancestor passport, identity card or similar record is the heart of the file; where it is lost, an old school or land record has to stand in.',
        ],
        pt: [
          'Documento indiano pertencente ao ascendente',
          'O passaporte, a carteira de identidade ou registro semelhante do ascendente é o coração do processo; se estiver perdido, um antigo registro escolar ou de terras precisa substituí-lo.',
        ],
        es: [
          'Documento indio perteneciente al antepasado',
          'El pasaporte, la cédula o un registro similar del antepasado es el corazón del expediente; si se perdió, un viejo registro escolar o de tierras debe sustituirlo.',
        ],
      },
      {
        en: [
          'Surrender certificate if you once held an Indian passport',
          'India does not allow dual citizenship, so a former citizen must show the old passport was formally surrendered before anything can be granted.',
        ],
        pt: [
          'Certidão de renúncia se você já teve passaporte indiano',
          'A Índia não admite dupla cidadania, então quem já foi cidadão precisa mostrar que o passaporte antigo foi formalmente entregue antes de qualquer concessão.',
        ],
        es: [
          'Certificado de renuncia si tuvo pasaporte indio',
          'India no admite la doble ciudadanía, así que quien fue ciudadano debe mostrar que entregó formalmente el pasaporte antiguo antes de cualquier concesión.',
        ],
      },
      {
        en: [
          'Documents linking you to that ancestor',
          'Birth and marriage certificates forming an unbroken chain; one missing link in the middle stops the whole application.',
        ],
        pt: [
          'Documentos que ligam você a esse ascendente',
          'Certidões de nascimento e casamento formando uma cadeia sem falhas; um único elo faltando no meio trava o pedido inteiro.',
        ],
        es: [
          'Documentos que le vinculan a ese antepasado',
          'Certificados de nacimiento y matrimonio que formen una cadena ininterrumpida; un solo eslabón que falte detiene toda la solicitud.',
        ],
      },
      {
        en: [
          'Online registration form with photograph and signature',
          'Both are uploaded to an exact pixel and background specification, and a wrong file here is the single most frequent cause of rejection.',
        ],
        pt: [
          'Formulário de registro online com fotografia e assinatura',
          'Ambas são enviadas segundo uma especificação exata de pixels e fundo, e um arquivo errado aqui é a causa isolada mais frequente de rejeição.',
        ],
        es: [
          'Formulario de registro en línea con fotografía y firma',
          'Ambas se cargan con una especificación exacta de píxeles y fondo, y un archivo incorrecto aquí es la causa aislada más frecuente de rechazo.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'No income or funds requirement applies',
          'This road is decided by descent rather than by means, so bank statements are neither requested nor of any help to the case.',
        ],
        pt: [
          'Não se aplica exigência de renda ou de recursos',
          'Esta rota é decidida por ascendência, e não por capacidade financeira, então extratos bancários não são pedidos nem ajudam o processo.',
        ],
        es: [
          'No se aplica requisito de ingresos ni de fondos',
          'Esta vía se decide por ascendencia y no por medios económicos, así que los extractos bancarios ni se piden ni ayudan al expediente.',
        ],
        required: false,
      },
      {
        en: [
          'Budget for legalisation and translation of records',
          'Apostilles, sworn translations and couriering originals across countries usually cost more than the registration fee itself.',
        ],
        pt: [
          'Prever custos de legalização e tradução dos registros',
          'Apostilas, traduções juramentadas e envio de originais entre países costumam custar mais do que a própria taxa de registro.',
        ],
        es: [
          'Prever costes de legalización y traducción de los registros',
          'Apostillas, traducciones juradas y el envío de originales entre países suelen costar más que la propia tasa de registro.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Submit the application on the official services portal',
          'Only the government site registers the file; agents charge for completing a form that is free to fill in yourself.',
        ],
        pt: [
          'Enviar o pedido no portal oficial de serviços',
          'Só o site do governo registra o processo; despachantes cobram para preencher um formulário que você mesmo preenche de graça.',
        ],
        es: [
          'Presentar la solicitud en el portal oficial de servicios',
          'Solo el sitio del gobierno registra el expediente; los gestores cobran por rellenar un formulario que usted puede completar gratis.',
        ],
      },
      {
        en: [
          'Pay the registration fee for where you are applying',
          'The amount differs between applying inside India and applying at a mission abroad; check the figure shown on the portal for your location.',
        ],
        pt: [
          'Pagar a taxa de registro do local onde você pede',
          'O valor difere entre pedir dentro da Índia e pedir numa representação no exterior; confira a cifra exibida no portal para o seu local.',
        ],
        es: [
          'Pagar la tasa de registro del lugar donde solicita',
          'El importe difiere entre solicitar dentro de la India y hacerlo en una misión en el exterior; consulte la cifra que muestra el portal para su ubicación.',
        ],
      },
      {
        en: [
          'Send the printed file and the original documents',
          'The paper set goes to the mission or its outsourced centre and must match the online submission exactly, page for page.',
        ],
        pt: [
          'Enviar o processo impresso e os documentos originais',
          'O conjunto em papel vai para a representação ou seu centro terceirizado e precisa bater exatamente com o envio online, página por página.',
        ],
        es: [
          'Enviar el expediente impreso y los documentos originales',
          'El juego en papel va a la misión o a su centro externalizado y debe coincidir exactamente con el envío en línea, página por página.',
        ],
      },
      {
        en: [
          'Allow several months for the decision',
          'The grant follows clearance from authorities in India, so booking travel around an expected approval date is how people lose money here.',
        ],
        pt: [
          'Prever vários meses até a decisão',
          'A concessão depende de liberação das autoridades na Índia, então marcar viagem contando com uma data provável de aprovação é como se perde dinheiro aqui.',
        ],
        es: [
          'Prever varios meses hasta la decisión',
          'La concesión depende del visto bueno de las autoridades en la India, así que reservar viajes contando con una fecha probable es como se pierde dinero aquí.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Attend the mission for biometrics when called',
          'Not every post asks applicants to appear, and being summoned is a routine step rather than a signal that something is wrong.',
        ],
        pt: [
          'Comparecer à representação para biometria quando chamado',
          'Nem todo posto pede a presença do requerente, e ser convocado é etapa de rotina, não sinal de que algo está errado.',
        ],
        es: [
          'Acudir a la misión para la biometría cuando le convoquen',
          'No todos los puestos piden que el solicitante comparezca, y ser convocado es un paso rutinario, no una señal de problema.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Thumb impression for applicants who cannot sign',
          'Minors and others unable to sign supply an impression to the same strict specification; a blank signature field simply holds the file.',
        ],
        pt: [
          'Impressão digital do polegar para quem não pode assinar',
          'Menores e outras pessoas impossibilitadas de assinar fornecem a impressão na mesma especificação rígida; um campo de assinatura vazio simplesmente trava o processo.',
        ],
        es: [
          'Huella del pulgar para quienes no pueden firmar',
          'Los menores y otras personas que no pueden firmar aportan la huella con la misma especificación estricta; un campo de firma vacío bloquea el expediente.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the card and the lifelong visa it carries',
          'That visa is what removes the need to apply for entry before each trip, and it is the practical benefit most holders come for.',
        ],
        pt: [
          'Retirar o cartão e o visto vitalício que vem com ele',
          'Esse visto é o que elimina a necessidade de pedir entrada antes de cada viagem, e é o benefício prático que a maioria busca.',
        ],
        es: [
          'Recoger la tarjeta y el visado vitalicio que lleva',
          'Ese visado es lo que elimina la necesidad de solicitar entrada antes de cada viaje, y es el beneficio práctico que casi todos buscan.',
        ],
      },
      {
        en: [
          'Understand that this status is not Indian citizenship',
          'There is no vote, no public office, no government post and no right to buy agricultural land; confusing the two is the classic mistake here.',
        ],
        pt: [
          'Entender que esse status não é cidadania indiana',
          'Não há voto, cargo eletivo, emprego público nem direito de comprar terra agrícola; confundir as duas coisas é o erro clássico aqui.',
        ],
        es: [
          'Entender que ese estatus no es la ciudadanía india',
          'No hay voto, cargo público, empleo estatal ni derecho a comprar tierra agrícola; confundir ambas cosas es el error clásico aquí.',
        ],
      },
      {
        en: [
          'Re-issue the card in the age windows the rules set',
          'A new card is required after each new passport up to a young adult age, and once again later in life; travelling with a mismatch causes trouble at check-in.',
        ],
        pt: [
          'Reemitir o cartão nas faixas etárias previstas nas regras',
          'É preciso um cartão novo a cada novo passaporte até o início da vida adulta, e mais uma vez em idade mais avançada; viajar com divergência gera problema no check-in.',
        ],
        es: [
          'Reexpedir la tarjeta en las franjas de edad que fijan las normas',
          'Hace falta una tarjeta nueva con cada pasaporte hasta el inicio de la vida adulta, y otra vez en edad avanzada; viajar con discordancia da problemas en el mostrador.',
        ],
      },
      {
        en: [
          'Carry the card together with the foreign passport',
          'The lifelong visa is attached to that passport, so the two documents have to travel as a pair on every entry and exit.',
        ],
        pt: [
          'Levar o cartão junto com o passaporte estrangeiro',
          'O visto vitalício está atrelado a esse passaporte, então os dois documentos precisam viajar como um par em cada entrada e saída.',
        ],
        es: [
          'Llevar la tarjeta junto con el pasaporte extranjero',
          'El visado vitalicio está ligado a ese pasaporte, así que ambos documentos deben viajar en pareja en cada entrada y salida.',
        ],
      },
      {
        en: [
          'Keep your registered particulars up to date',
          'A change of address or of nationality has to be notified, and the status can be cancelled for concealment or on the other grounds set in law.',
        ],
        pt: [
          'Manter atualizados os dados registrados',
          'Mudança de endereço ou de nacionalidade precisa ser comunicada, e o status pode ser cancelado por ocultação ou pelos demais motivos previstos em lei.',
        ],
        es: [
          'Mantener actualizados los datos registrados',
          'Un cambio de domicilio o de nacionalidad debe comunicarse, y el estatus puede cancelarse por ocultación o por los demás motivos previstos en la ley.',
        ],
        priority: 2,
      },
    ],
  },
};
