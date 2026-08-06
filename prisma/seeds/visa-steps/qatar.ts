import type { CountryVisaSteps } from './types';

/**
 * Steps for Qatar.
 *
 * Nothing beyond a visit happens without a sponsor. The employer, investor
 * partner or family member inside Qatar obtains the entry approval first, and
 * only then does the applicant travel — arriving to "sort it out" locally is
 * not a route. The residence itself is tied to that sponsor, so leaving the job
 * can end the permit and the dependants attached to it.
 *
 * Two local formalities decide whether the file closes: the medical examination
 * and fingerprints, both done in Qatar at designated centres within days of
 * arrival, and the QID card that comes out of them — the card, not the visa
 * stamp, is what unlocks banking, housing, telecoms and family sponsorship.
 * Police clearance must be legalised by the Qatari embassy, which is a heavier
 * chain than an apostille and the single most common cause of delay.
 */
export const qatar: CountryVisaSteps = {
  'Visit Visa': {
    core_documents: [
      {
        en: [
          'Check whether your nationality enters visa-free',
          'Many nationalities receive a visa waiver on arrival and never need to apply in advance. Confirm the current list before paying for anything.',
        ],
        pt: [
          'Verificar se sua nacionalidade entra sem visto',
          'Muitas nacionalidades recebem isenção na chegada e nunca precisam pedir com antecedência. Confirme a lista vigente antes de pagar qualquer coisa.',
        ],
        es: [
          'Comprobar si su nacionalidad entra sin visado',
          'Muchas nacionalidades reciben exención a la llegada y nunca necesitan solicitarlo por adelantado. Confirme la lista vigente antes de pagar nada.',
        ],
      },
      {
        en: [
          'Passport valid at least six months on arrival',
          'Validity is counted from the date of entry, not the date of application. A passport that expires mid-trip is refused at check-in.',
        ],
        pt: [
          'Passaporte válido por seis meses na chegada',
          'A validade é contada a partir da data de entrada, não do pedido. Passaporte que vence no meio da viagem é barrado no check-in.',
        ],
        es: [
          'Pasaporte con seis meses de validez al llegar',
          'La validez se cuenta desde la fecha de entrada, no de la solicitud. Un pasaporte que vence a mitad del viaje se rechaza en el mostrador.',
        ],
      },
      {
        en: [
          'Recent photograph on a white background',
          'Qatari systems reject scans of old photos and images with shadows or headwear that covers the face outline.',
        ],
        pt: [
          'Fotografia recente com fundo branco',
          'Os sistemas cataris recusam digitalizações de fotos antigas e imagens com sombras ou adereços que cubram o contorno do rosto.',
        ],
        es: [
          'Fotografía reciente con fondo blanco',
          'Los sistemas cataríes rechazan escaneos de fotos antiguas e imágenes con sombras o prendas que tapen el contorno de la cara.',
        ],
      },
      {
        en: [
          'Confirmed return or onward ticket',
          'Immigration can ask for it at the counter. A one-way ticket is a routine reason to be pulled aside on arrival.',
        ],
        pt: [
          'Bilhete de volta ou de continuação confirmado',
          'A imigração pode pedi-lo no balcão. Bilhete só de ida é motivo rotineiro para ser retido na chegada.',
        ],
        es: [
          'Billete de vuelta o de continuación confirmado',
          'Inmigración puede pedirlo en el mostrador. Un billete solo de ida es motivo habitual de retención al llegar.',
        ],
      },
      {
        en: [
          'Hotel booking or the address of your host',
          'The accommodation declared must match what you tell the officer; a booking cancelled after approval leaves you without an answer at entry.',
        ],
        pt: [
          'Reserva de hotel ou endereço de quem o recebe',
          'O alojamento declarado precisa coincidir com o que você disser ao agente; reserva cancelada após a aprovação deixa você sem resposta na entrada.',
        ],
        es: [
          'Reserva de hotel o dirección de su anfitrión',
          'El alojamiento declarado debe coincidir con lo que diga al agente; una reserva cancelada tras la aprobación le deja sin respuesta en la entrada.',
        ],
      },
      {
        en: [
          'Invitation from a sponsor resident in Qatar',
          'For a family or friend visit the resident applies on your behalf and answers for your stay. Without a sponsor this route simply does not open.',
        ],
        pt: [
          'Convite de um patrocinador residente no Catar',
          'Em visita a família ou amigos, o residente faz o pedido por você e responde pela sua estadia. Sem patrocinador esta via simplesmente não abre.',
        ],
        es: [
          'Invitación de un patrocinador residente en Catar',
          'En visita a familia o amigos, el residente solicita por usted y responde por su estancia. Sin patrocinador esta vía sencillamente no se abre.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          "Copy of the sponsor's QID and proof of relationship",
          'The sponsor attaches their residence card and, for family visits, a marriage or birth certificate translated into Arabic. Untranslated papers are returned.',
        ],
        pt: [
          'Cópia do QID do patrocinador e prova do vínculo',
          'O patrocinador anexa o cartão de residência e, em visitas familiares, certidão de casamento ou nascimento traduzida para árabe. Documento sem tradução volta.',
        ],
        es: [
          'Copia del QID del patrocinador y prueba del vínculo',
          'El patrocinador adjunta su tarjeta de residencia y, en visitas familiares, acta de matrimonio o nacimiento traducida al árabe. Un papel sin traducir se devuelve.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Credit card issued in your own name',
          'Visitors arriving without a sponsor are commonly asked to show a card in their name; a card belonging to a relative does not count.',
        ],
        pt: [
          'Cartão de crédito emitido em seu próprio nome',
          'Visitantes que chegam sem patrocinador costumam ter de mostrar cartão no próprio nome; cartão de familiar não vale.',
        ],
        es: [
          'Tarjeta de crédito emitida a su propio nombre',
          'A los visitantes que llegan sin patrocinador se les suele pedir una tarjeta a su nombre; la de un familiar no sirve.',
        ],
      },
      {
        en: [
          'Bank statements covering the whole stay',
          'Recent statements, not a single balance screenshot. Sudden deposits shortly before travel invite questions.',
        ],
        pt: [
          'Extratos bancários que cubram toda a estadia',
          'Extratos recentes, não uma única captura de saldo. Depósitos súbitos pouco antes da viagem levantam perguntas.',
        ],
        es: [
          'Extractos bancarios que cubran toda la estancia',
          'Extractos recientes, no una sola captura del saldo. Los depósitos repentinos poco antes del viaje generan preguntas.',
        ],
      },
      {
        en: [
          'Confirm the current minimum funds expected',
          'The figure is set administratively and changes; check what the authorities require now rather than trusting a number seen in a forum.',
        ],
        pt: [
          'Confirmar o valor mínimo de fundos exigido hoje',
          'O montante é definido administrativamente e muda; verifique o que as autoridades exigem agora em vez de confiar em número visto num fórum.',
        ],
        es: [
          'Confirmar el importe mínimo de fondos exigido hoy',
          'La cifra se fija administrativamente y cambia; consulte lo que exigen ahora las autoridades en lugar de fiarse de un número visto en un foro.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply through the official Hayya portal',
          'Applications go through the government platform or the sponsor. Third-party sites charging a markup are not an official channel.',
        ],
        pt: [
          'Fazer o pedido pelo portal oficial Hayya',
          'Os pedidos passam pela plataforma governamental ou pelo patrocinador. Sites de terceiros que cobram ágio não são canal oficial.',
        ],
        es: [
          'Solicitar por el portal oficial Hayya',
          'Las solicitudes pasan por la plataforma gubernamental o el patrocinador. Los sitios de terceros que cobran sobreprecio no son canal oficial.',
        ],
      },
      {
        en: [
          'Pay the visit visa fee in force',
          'Rates differ by duration and number of entries and are revised periodically; confirm the amount on the official channel before paying.',
        ],
        pt: [
          'Pagar a taxa do visto de visita em vigor',
          'Os valores variam por duração e número de entradas e são revistos periodicamente; confirme o montante no canal oficial antes de pagar.',
        ],
        es: [
          'Pagar la tasa del visado de visita vigente',
          'Los importes varían según duración y número de entradas y se revisan periódicamente; confirme la cantidad en el canal oficial antes de pagar.',
        ],
      },
      {
        en: [
          'Carry a printed copy of the approval',
          'Airlines check the approval at boarding. A phone with no battery at the gate is a missed flight, not an inconvenience.',
        ],
        pt: [
          'Levar cópia impressa da aprovação',
          'As companhias aéreas conferem a aprovação no embarque. Telemóvel sem bateria no portão é voo perdido, não um contratempo.',
        ],
        es: [
          'Llevar copia impresa de la aprobación',
          'Las aerolíneas comprueban la aprobación al embarcar. Un móvil sin batería en la puerta es un vuelo perdido, no una molestia.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Buy health insurance from an approved provider',
          'Visitors must hold a policy issued by an insurer licensed in Qatar. A foreign travel policy does not satisfy the requirement.',
        ],
        pt: [
          'Contratar seguro de saúde de operadora aprovada',
          'Os visitantes precisam de apólice emitida por seguradora licenciada no Catar. Seguro de viagem estrangeiro não cumpre a exigência.',
        ],
        es: [
          'Contratar seguro de salud de una aseguradora aprobada',
          'Los visitantes deben tener póliza emitida por una aseguradora autorizada en Catar. Un seguro de viaje extranjero no cumple el requisito.',
        ],
      },
      {
        en: [
          'Keep proof of the policy for the officer at entry',
          'The policy number is checked against the system on arrival, so have it to hand rather than buried in an email.',
        ],
        pt: [
          'Guardar prova da apólice para o agente na entrada',
          'O número da apólice é conferido no sistema na chegada, então tenha-o à mão em vez de perdido num e-mail.',
        ],
        es: [
          'Guardar prueba de la póliza para el agente en la entrada',
          'El número de póliza se coteja con el sistema al llegar, así que téngalo a mano y no enterrado en un correo.',
        ],
      },
      {
        en: [
          'Check the health and vaccination rules in force',
          'Entry health requirements have changed repeatedly in recent years; verify them close to departure, not when booking.',
        ],
        pt: [
          'Verificar as regras sanitárias e de vacinação vigentes',
          'As exigências de saúde na entrada mudaram várias vezes nos últimos anos; confirme perto da partida, não na compra da passagem.',
        ],
        es: [
          'Comprobar las normas sanitarias y de vacunación vigentes',
          'Los requisitos sanitarios de entrada han cambiado varias veces en los últimos años; verifíquelos cerca de la salida, no al reservar.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Count your permitted days from the entry stamp',
          'The clock runs from the stamp, not from the approval date. Overstaying carries a daily fine and can block future entries.',
        ],
        pt: [
          'Contar os dias permitidos a partir do carimbo de entrada',
          'O prazo corre do carimbo, não da data da aprovação. Ficar além do prazo gera multa diária e pode bloquear entradas futuras.',
        ],
        es: [
          'Contar los días permitidos desde el sello de entrada',
          'El plazo corre desde el sello, no desde la fecha de aprobación. Excederlo genera multa diaria y puede bloquear entradas futuras.',
        ],
      },
      {
        en: [
          'Request an extension before the permit expires',
          'Extensions are requested through the official channels while the stay is still valid; once expired, the only outcome is a fine.',
        ],
        pt: [
          'Pedir prorrogação antes de o prazo expirar',
          'A prorrogação é pedida pelos canais oficiais enquanto a estadia ainda é válida; depois de vencida, o único desfecho é multa.',
        ],
        es: [
          'Pedir prórroga antes de que expire el plazo',
          'La prórroga se pide por los canales oficiales mientras la estancia sigue vigente; una vez vencida, el único resultado es la multa.',
        ],
      },
      {
        en: [
          'Do not take up any work on a visit visa',
          'Working without a sponsor-issued permit is an offence for both the worker and whoever hired them, and ends in deportation.',
        ],
        pt: [
          'Não exercer qualquer trabalho com visto de visita',
          'Trabalhar sem autorização emitida por patrocinador é infração para o trabalhador e para quem o contratou, e acaba em deportação.',
        ],
        es: [
          'No realizar ningún trabajo con visado de visita',
          'Trabajar sin permiso emitido por un patrocinador es infracción para el trabajador y para quien le contrató, y acaba en deportación.',
        ],
      },
    ],
  },
  'Work Residence Permit': {
    core_documents: [
      {
        en: [
          'Employer obtains the entry approval before you travel',
          'The sponsor files with the Ministry of Labour and Ministry of Interior first. Arriving on a visit visa hoping to convert it is not a supported route.',
        ],
        pt: [
          'Empregador obtém a aprovação de entrada antes da viagem',
          'O patrocinador dá entrada no Ministério do Trabalho e no do Interior primeiro. Chegar com visto de visita esperando converter não é via prevista.',
        ],
        es: [
          'El empleador obtiene la aprobación de entrada antes del viaje',
          'El patrocinador presenta primero ante el Ministerio de Trabajo y el del Interior. Llegar con visado de visita esperando convertirlo no es una vía prevista.',
        ],
      },
      {
        en: [
          'Employment contract registered with the Ministry of Labour',
          'Only the contract authenticated in the official system is enforceable. A side agreement signed abroad gives you nothing in a labour dispute.',
        ],
        pt: [
          'Contrato de trabalho registado no Ministério do Trabalho',
          'Só o contrato autenticado no sistema oficial é exigível. Um acordo paralelo assinado no exterior não lhe dá nada num litígio laboral.',
        ],
        es: [
          'Contrato de trabajo registrado en el Ministerio de Trabajo',
          'Solo el contrato autenticado en el sistema oficial es exigible. Un acuerdo paralelo firmado fuera no le sirve de nada en un conflicto laboral.',
        ],
      },
      {
        en: [
          'Passport with at least six months remaining',
          'Renew before starting the process: the permit is printed against the passport number and a renewal mid-process forces documents to be redone.',
        ],
        pt: [
          'Passaporte com pelo menos seis meses restantes',
          'Renove antes de iniciar o processo: a autorização é emitida contra o número do passaporte e renovar no meio obriga a refazer documentos.',
        ],
        es: [
          'Pasaporte con al menos seis meses restantes',
          'Renuévelo antes de iniciar el trámite: el permiso se emite contra el número de pasaporte y renovarlo a medias obliga a rehacer documentos.',
        ],
      },
      {
        en: [
          'Police clearance legalised by the Qatari embassy',
          'An apostille is not enough. The certificate needs consular legalisation by the Qatari mission in the issuing country, which takes weeks — start it early.',
        ],
        pt: [
          'Antecedentes criminais legalizados pela embaixada catari',
          'Apostila não basta. O atestado precisa de legalização consular pela missão catari no país emissor, o que leva semanas — comece cedo.',
        ],
        es: [
          'Antecedentes penales legalizados por la embajada catarí',
          'La apostilla no basta. El certificado necesita legalización consular de la misión catarí en el país emisor, lo que tarda semanas — empiece pronto.',
        ],
      },
      {
        en: [
          'Arabic translations by an accredited translator',
          'Documents are filed in Arabic. Translations done by an unaccredited office are rejected and the fee is not refunded.',
        ],
        pt: [
          'Traduções para árabe por tradutor credenciado',
          'Os documentos são protocolados em árabe. Traduções feitas por escritório não credenciado são recusadas e a taxa não é devolvida.',
        ],
        es: [
          'Traducciones al árabe por traductor acreditado',
          'Los documentos se presentan en árabe. Las traducciones hechas por una oficina no acreditada se rechazan y la tasa no se devuelve.',
        ],
      },
      {
        en: [
          "Copy of the employer's commercial registration and computer card",
          'These prove the sponsor may hire foreign staff and that quota is available. If the company lacks quota, your file cannot move at all.',
        ],
        pt: [
          'Cópia do registo comercial e do cartão da empresa patrocinadora',
          'Comprovam que o patrocinador pode contratar estrangeiros e que há cota disponível. Sem cota, o seu processo não anda de forma alguma.',
        ],
        es: [
          'Copia del registro comercial y de la tarjeta de la empresa patrocinadora',
          'Acreditan que el patrocinador puede contratar extranjeros y que hay cupo disponible. Sin cupo, su expediente no avanza en absoluto.',
        ],
      },
      {
        en: [
          'Photographs to Qatari biometric specification',
          'Size, background and framing follow the local standard; photos taken for another country are frequently refused at the counter.',
        ],
        pt: [
          'Fotografias no padrão biométrico catari',
          'Tamanho, fundo e enquadramento seguem a norma local; fotos feitas para outro país são frequentemente recusadas no balcão.',
        ],
        es: [
          'Fotografías según la norma biométrica catarí',
          'Tamaño, fondo y encuadre siguen el estándar local; las fotos hechas para otro país se rechazan a menudo en el mostrador.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Degree certificate attested through the full chain',
          'The diploma is attested by the issuing authority, the foreign ministry of that country and then the Qatari embassy. Skipping one link voids the rest.',
        ],
        pt: [
          'Diploma autenticado por toda a cadeia consular',
          'O diploma é autenticado pela instituição emissora, pelo ministério das relações exteriores daquele país e depois pela embaixada catari. Pular um elo anula o resto.',
        ],
        es: [
          'Título autenticado por toda la cadena consular',
          'El título lo autentica la institución emisora, el ministerio de exteriores de ese país y después la embajada catarí. Saltarse un eslabón anula lo demás.',
        ],
      },
      {
        en: [
          'Professional licence for a regulated occupation',
          'Health, engineering, legal and teaching roles need registration with the relevant Qatari body before you may practise, separately from the visa.',
        ],
        pt: [
          'Licença profissional para ocupação regulamentada',
          'Áreas de saúde, engenharia, direito e ensino exigem registo no órgão catari competente antes de exercer, à parte do visto.',
        ],
        es: [
          'Licencia profesional para ocupación regulada',
          'Sanidad, ingeniería, derecho y docencia exigen registro ante el organismo catarí competente antes de ejercer, aparte del visado.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Confirm the employer bears the recruitment costs',
          'Charging recruitment or permit costs to the worker is prohibited. Being asked to pay is a warning sign about the sponsor, not a normal expense.',
        ],
        pt: [
          'Confirmar que o empregador arca com os custos de recrutamento',
          'Cobrar do trabalhador custos de recrutamento ou de autorização é proibido. Se pedirem que você pague, é sinal de alerta sobre o patrocinador.',
        ],
        es: [
          'Confirmar que el empleador asume los costes de contratación',
          'Cobrar al trabajador los costes de contratación o del permiso está prohibido. Que se lo pidan es una señal de alarma sobre el patrocinador.',
        ],
      },
      {
        en: [
          'Check the salary, housing and transport terms offered',
          'Minimum wage and allowance rules are revised by decree; verify the levels in force and whether housing and transport are provided or paid in cash.',
        ],
        pt: [
          'Conferir salário, moradia e transporte oferecidos',
          'As regras de salário mínimo e de benefícios são revistas por decreto; verifique os patamares vigentes e se moradia e transporte são fornecidos ou pagos em dinheiro.',
        ],
        es: [
          'Verificar salario, alojamiento y transporte ofrecidos',
          'Las normas de salario mínimo y complementos se revisan por decreto; compruebe los niveles vigentes y si alojamiento y transporte se dan en especie o en efectivo.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Sponsor files the work visa application',
          'The application is lodged by the employer through the official platform; the worker cannot open the file alone.',
        ],
        pt: [
          'Patrocinador protocola o pedido de visto de trabalho',
          'O pedido é apresentado pelo empregador na plataforma oficial; o trabalhador não consegue abrir o processo sozinho.',
        ],
        es: [
          'El patrocinador presenta la solicitud de visado de trabajo',
          'La solicitud la presenta el empleador en la plataforma oficial; el trabajador no puede abrir el expediente por su cuenta.',
        ],
      },
      {
        en: [
          'Pay the residence permit charges in force',
          'Permit issuance, medical and card fees are set by regulation and change; ask the sponsor for the current schedule instead of assuming the figures from last year.',
        ],
        pt: [
          'Pagar os encargos vigentes da autorização de residência',
          'Emissão, exame médico e cartão têm valores fixados por regulamento e que mudam; peça ao patrocinador a tabela atual em vez de assumir os valores do ano passado.',
        ],
        es: [
          'Pagar los cargos vigentes del permiso de residencia',
          'Emisión, examen médico y tarjeta tienen importes fijados por reglamento y cambian; pida al patrocinador la tabla actual en vez de suponer los de hace un año.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Complete the Qatar Visa Centre steps before departure',
          'In several countries the medical and fingerprints are done at a Qatar Visa Centre at home. Where it exists, skipping it means being turned back later.',
        ],
        pt: [
          'Concluir as etapas do Qatar Visa Centre antes de partir',
          'Em vários países, o exame médico e as impressões digitais são feitos num Qatar Visa Centre local. Onde ele existe, pular a etapa significa ser barrado depois.',
        ],
        es: [
          'Completar los pasos del Qatar Visa Centre antes de salir',
          'En varios países el examen médico y las huellas se hacen en un Qatar Visa Centre local. Donde existe, saltárselo significa ser rechazado más adelante.',
        ],
      },
      {
        en: [
          'Undergo the mandatory medical examination in Qatar',
          'Blood tests and a chest X-ray at a designated centre within days of arrival. A positive result for certain conditions ends the residence process.',
        ],
        pt: [
          'Fazer o exame médico obrigatório no Catar',
          'Exames de sangue e radiografia do tórax em centro designado poucos dias após a chegada. Resultado positivo para certas condições encerra o processo de residência.',
        ],
        es: [
          'Realizar el examen médico obligatorio en Catar',
          'Análisis de sangre y radiografía de tórax en un centro designado a los pocos días de llegar. Un resultado positivo para ciertas condiciones termina el trámite.',
        ],
      },
      {
        en: [
          'Give fingerprints at the designated biometrics centre',
          'Fingerprinting is a separate appointment from the medical and both must be cleared before the QID is printed.',
        ],
        pt: [
          'Registar impressões digitais no centro de biometria designado',
          'A biometria é um agendamento separado do exame médico e ambos precisam estar concluídos antes de o QID ser emitido.',
        ],
        es: [
          'Registrar las huellas en el centro de biometría designado',
          'La biometría es una cita distinta del examen médico y ambos deben completarse antes de emitir el QID.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the QID residence card',
          'The card, not the entry visa, is what proves your status. Without it you cannot rent, open an account, get a licence or a local phone line.',
        ],
        pt: [
          'Retirar o cartão de residência QID',
          'O cartão, e não o visto de entrada, é o que comprova seu status. Sem ele você não aluga, não abre conta, não tira carta nem linha telefônica local.',
        ],
        es: [
          'Retirar la tarjeta de residencia QID',
          'La tarjeta, no el visado de entrada, es lo que acredita su estatus. Sin ella no puede alquilar, abrir cuenta, sacar licencia ni línea telefónica local.',
        ],
      },
      {
        en: [
          'Activate Metrash2 and keep contact details current',
          'Official notices, renewals and fines arrive through the app. An unregistered phone number means deadlines pass without you hearing about them.',
        ],
        pt: [
          'Ativar o Metrash2 e manter os contactos atualizados',
          'Avisos oficiais, renovações e multas chegam pelo aplicativo. Número não registado significa prazos vencendo sem que você fique sabendo.',
        ],
        es: [
          'Activar Metrash2 y mantener los contactos actualizados',
          'Los avisos oficiales, renovaciones y multas llegan por la aplicación. Un número sin registrar significa plazos que vencen sin enterarse.',
        ],
      },
      {
        en: [
          'Understand what happens if you leave the employer',
          'Residence is tied to the sponsor: ending the job starts a limited window to transfer or leave. Check the notice and transfer rules before resigning.',
        ],
        pt: [
          'Entender o que acontece se você sair do empregador',
          'A residência está ligada ao patrocinador: encerrar o emprego abre uma janela limitada para transferir ou sair. Verifique as regras de aviso prévio e transferência antes de pedir demissão.',
        ],
        es: [
          'Entender qué ocurre si deja al empleador',
          'La residencia está ligada al patrocinador: terminar el empleo abre una ventana limitada para trasladarse o salir. Consulte las reglas de preaviso y traslado antes de renunciar.',
        ],
      },
      {
        en: [
          'Sponsor dependants once your card is issued',
          'Family sponsorship depends on your QID, your salary level and suitable accommodation, and is assessed after your own residence is complete.',
        ],
        pt: [
          'Patrocinar dependentes após a emissão do seu cartão',
          'O patrocínio familiar depende do seu QID, do seu nível salarial e de moradia adequada, e é avaliado depois que a sua residência estiver concluída.',
        ],
        es: [
          'Patrocinar dependientes tras la emisión de su tarjeta',
          'El patrocinio familiar depende de su QID, de su nivel salarial y de una vivienda adecuada, y se evalúa después de completar su propia residencia.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
  'Investor Residence': {
    core_documents: [
      {
        en: [
          'Decide between the property route and the company route',
          'Residence through real estate in designated zones and residence through a licensed company follow different rules; committing to one before checking both wastes months.',
        ],
        pt: [
          'Decidir entre a via imobiliária e a via da empresa',
          'A residência por imóvel em zonas designadas e a residência por empresa licenciada seguem regras distintas; escolher uma sem comparar as duas custa meses.',
        ],
        es: [
          'Decidir entre la vía inmobiliaria y la vía societaria',
          'La residencia por inmueble en zonas designadas y la residencia por empresa licenciada siguen reglas distintas; elegir una sin comparar ambas cuesta meses.',
        ],
      },
      {
        en: [
          'Passport valid well beyond the planned stay',
          'The investor permit is issued against the passport; a short validity shortens the permit itself rather than being ignored.',
        ],
        pt: [
          'Passaporte com validade bem além da estadia prevista',
          'A autorização de investidor é emitida contra o passaporte; validade curta encurta a própria autorização em vez de ser ignorada.',
        ],
        es: [
          'Pasaporte con validez muy superior a la estancia prevista',
          'El permiso de inversor se emite contra el pasaporte; una validez corta acorta el propio permiso en vez de pasarse por alto.',
        ],
      },
      {
        en: [
          'Attested criminal record for the investor file',
          'As with employment, the certificate needs legalisation by the Qatari embassy abroad — an apostille alone is refused at submission.',
        ],
        pt: [
          'Antecedentes autenticados para o processo de investidor',
          'Como no emprego, o atestado precisa de legalização pela embaixada catari no exterior — só a apostila é recusada no protocolo.',
        ],
        es: [
          'Antecedentes autenticados para el expediente de inversor',
          'Como en el empleo, el certificado necesita legalización de la embajada catarí en el extranjero — la apostilla sola se rechaza al presentar.',
        ],
      },
      {
        en: [
          'Title deed or commercial registration in your name',
          'The asset must be registered to the applicant. Holding it through a nominee or an unregistered agreement does not create a right of residence.',
        ],
        pt: [
          'Escritura do imóvel ou registo comercial em seu nome',
          'O bem tem de estar registado no nome do requerente. Mantê-lo por meio de laranja ou acordo não registado não gera direito de residência.',
        ],
        es: [
          'Escritura del inmueble o registro mercantil a su nombre',
          'El activo debe estar registrado a nombre del solicitante. Tenerlo mediante un testaferro o un acuerdo no inscrito no genera derecho de residencia.',
        ],
      },
      {
        en: [
          'Company licence, trade name and lease agreement',
          'For the company route the entity needs a licence, a registered trade name and a real leased address; a virtual office is not accepted for residence purposes.',
        ],
        pt: [
          'Licença da empresa, nome comercial e contrato de arrendamento',
          'Na via da empresa, a entidade precisa de licença, nome comercial registado e endereço arrendado real; escritório virtual não é aceite para fins de residência.',
        ],
        es: [
          'Licencia de la empresa, nombre comercial y contrato de arrendamiento',
          'En la vía societaria, la entidad necesita licencia, nombre comercial registrado y una dirección arrendada real; una oficina virtual no se acepta para la residencia.',
        ],
      },
      {
        en: [
          'Corporate documents translated and attested',
          'Articles of association, shareholder resolutions and powers of attorney are filed in Arabic through an accredited translator and consular attestation.',
        ],
        pt: [
          'Documentos societários traduzidos e autenticados',
          'Estatutos, deliberações de sócios e procurações são protocolados em árabe, por tradutor credenciado e com autenticação consular.',
        ],
        es: [
          'Documentos societarios traducidos y autenticados',
          'Estatutos, acuerdos de socios y poderes se presentan en árabe, mediante traductor acreditado y con legalización consular.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Verify the minimum investment threshold in force',
          'The qualifying amount for property and for capital is set by regulation and has been revised; confirm it with the authority rather than relying on published guides.',
        ],
        pt: [
          'Verificar o valor mínimo de investimento em vigor',
          'O montante qualificador para imóveis e para capital é definido por regulamento e já foi revisto; confirme com o órgão competente em vez de confiar em guias publicados.',
        ],
        es: [
          'Verificar el importe mínimo de inversión vigente',
          'La cuantía que califica para inmuebles y para capital se fija por reglamento y ya se ha revisado; confírmela con el organismo en vez de fiarse de guías publicadas.',
        ],
      },
      {
        en: [
          'Document the lawful source of the funds',
          'Banks and the registry ask where the money came from. Unexplained transfers stall the file at compliance rather than at immigration.',
        ],
        pt: [
          'Documentar a origem lícita dos recursos',
          'Bancos e o registo perguntam de onde veio o dinheiro. Transferências sem explicação travam o processo no compliance, e não na imigração.',
        ],
        es: [
          'Documentar el origen lícito de los fondos',
          'Los bancos y el registro preguntan de dónde salió el dinero. Las transferencias sin explicación atascan el expediente en cumplimiento, no en inmigración.',
        ],
      },
      {
        en: [
          'Budget the recurring costs of keeping the structure',
          'Licence renewal, office lease, accounting and staff sponsorship recur every year; a structure kept only to hold residence still costs money to maintain.',
        ],
        pt: [
          'Orçar os custos recorrentes de manter a estrutura',
          'Renovação de licença, arrendamento, contabilidade e patrocínio de funcionários repetem-se todos os anos; uma estrutura mantida só para segurar a residência continua custando dinheiro.',
        ],
        es: [
          'Presupuestar los costes recurrentes de mantener la estructura',
          'Renovación de licencia, alquiler, contabilidad y patrocinio de empleados se repiten cada año; una estructura mantenida solo para conservar la residencia sigue costando dinero.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File through the official investment single window',
          'Company formation and the residence request run through the government platform and the ministry counters; intermediaries do not replace the official filing.',
        ],
        pt: [
          'Protocolar pela janela única oficial de investimento',
          'A constituição da empresa e o pedido de residência correm pela plataforma governamental e pelos balcões do ministério; intermediários não substituem o protocolo oficial.',
        ],
        es: [
          'Presentar por la ventanilla única oficial de inversión',
          'La constitución de la empresa y la solicitud de residencia van por la plataforma gubernamental y las ventanillas del ministerio; los intermediarios no sustituyen la presentación oficial.',
        ],
      },
      {
        en: [
          'Pay registration and permit charges as currently set',
          'Registration, licensing and residence charges are revised periodically; ask for the current schedule before budgeting the project.',
        ],
        pt: [
          'Pagar os encargos de registo e autorização hoje aplicáveis',
          'Registo, licenciamento e residência têm encargos revistos periodicamente; peça a tabela atual antes de orçar o projeto.',
        ],
        es: [
          'Pagar los cargos de registro y permiso hoy aplicables',
          'Registro, licencia y residencia tienen cargos que se revisan periódicamente; pida la tabla actual antes de presupuestar el proyecto.',
        ],
      },
      {
        en: [
          'Keep the qualifying asset registered to the applicant',
          'Transferring the property or the shares to another party after approval removes the basis of the residence and it can be cancelled.',
        ],
        pt: [
          'Manter o bem qualificador em nome do requerente',
          'Transferir o imóvel ou as quotas a terceiros depois da aprovação retira a base da residência, que pode ser cancelada.',
        ],
        es: [
          'Mantener el activo que califica a nombre del solicitante',
          'Transferir el inmueble o las participaciones a un tercero tras la aprobación elimina la base de la residencia, que puede cancelarse.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Complete the investor medical screening in Qatar',
          'The same designated-centre examination applies to investors and their dependants, done after arrival and before the card is issued.',
        ],
        pt: [
          'Fazer a triagem médica de investidor no Catar',
          'O mesmo exame em centro designado vale para investidores e dependentes, feito após a chegada e antes da emissão do cartão.',
        ],
        es: [
          'Realizar el cribado médico de inversor en Catar',
          'El mismo examen en centro designado se aplica a inversores y dependientes, tras la llegada y antes de emitir la tarjeta.',
        ],
      },
      {
        en: [
          'Register biometrics for the investor permit',
          'Fingerprints are taken locally at the assigned centre; missing the appointment leaves the file open and the card unprinted.',
        ],
        pt: [
          'Registar a biometria para a autorização de investidor',
          'As impressões digitais são recolhidas localmente no centro designado; faltar ao agendamento deixa o processo aberto e o cartão por emitir.',
        ],
        es: [
          'Registrar la biometría para el permiso de inversor',
          'Las huellas se toman localmente en el centro asignado; faltar a la cita deja el expediente abierto y la tarjeta sin emitir.',
        ],
      },
      {
        en: [
          'Take out health cover with a licensed insurer',
          'Cover from an insurer authorised in Qatar is required for you and anyone you sponsor; a foreign policy is not recognised.',
        ],
        pt: [
          'Contratar cobertura de saúde com seguradora licenciada',
          'A cobertura de seguradora autorizada no Catar é exigida para você e para quem patrocinar; apólice estrangeira não é reconhecida.',
        ],
        es: [
          'Contratar cobertura sanitaria con aseguradora autorizada',
          'Se exige cobertura de una aseguradora autorizada en Catar para usted y para quien patrocine; una póliza extranjera no se reconoce.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the residence card issued on the investment',
          'As with employment, the card is what opens banking, utilities and vehicle registration; the approval letter alone does none of that.',
        ],
        pt: [
          'Retirar o cartão de residência emitido pelo investimento',
          'Como no emprego, é o cartão que abre banco, serviços e registo de veículo; a carta de aprovação sozinha não faz nada disso.',
        ],
        es: [
          'Retirar la tarjeta de residencia emitida por la inversión',
          'Como en el empleo, la tarjeta es lo que abre banca, suministros y registro de vehículo; la carta de aprobación sola no hace nada de eso.',
        ],
      },
      {
        en: [
          'Renew by proving the investment is still active',
          'Each renewal checks that the property is still owned or the licence still valid; letting the trade licence lapse ends the residence with it.',
        ],
        pt: [
          'Renovar comprovando que o investimento continua ativo',
          'Cada renovação verifica se o imóvel continua seu ou se a licença segue válida; deixar a licença comercial caducar encerra a residência junto.',
        ],
        es: [
          'Renovar acreditando que la inversión sigue activa',
          'Cada renovación comprueba si el inmueble sigue siendo suyo o la licencia sigue vigente; dejar caducar la licencia comercial acaba también con la residencia.',
        ],
      },
      {
        en: [
          'Check what the permit does and does not allow',
          'Investor residence does not automatically authorise salaried work for a third party, and sponsoring family has its own income and housing conditions.',
        ],
        pt: [
          'Verificar o que a autorização permite e o que não permite',
          'A residência de investidor não autoriza automaticamente trabalho assalariado para terceiros, e patrocinar família tem condições próprias de renda e moradia.',
        ],
        es: [
          'Verificar qué permite y qué no permite el permiso',
          'La residencia de inversor no autoriza automáticamente el trabajo asalariado para terceros, y patrocinar a la familia tiene sus propias condiciones de ingresos y vivienda.',
        ],
      },
    ],
  },
  'Permanent Residency Permit': {
    core_documents: [
      {
        en: [
          'Check the narrow eligibility grounds before applying',
          'Permanent residency is granted under a specific law to a capped number of people each year, with priority to children of Qatari women and to exceptional service. Most residents never qualify.',
        ],
        pt: [
          'Conferir os critérios estreitos antes de se candidatar',
          'A residência permanente é concedida por lei específica a um número limitado de pessoas por ano, com prioridade a filhos de mulheres catarianas e a serviços excecionais. A maioria dos residentes nunca qualifica.',
        ],
        es: [
          'Comprobar los criterios estrechos antes de solicitar',
          'La residencia permanente se concede por una ley específica a un número limitado de personas al año, con prioridad a hijos de mujeres cataríes y a servicios excepcionales. La mayoría de los residentes nunca califica.',
        ],
      },
      {
        en: [
          'Evidence of continuous lawful residence in the country',
          'The required number of years must be lawful and continuous; long absences and gaps between permits reset the count rather than merely pausing it.',
        ],
        pt: [
          'Prova de residência legal contínua no país',
          'Os anos exigidos têm de ser legais e contínuos; ausências longas e intervalos entre autorizações zeram a contagem em vez de apenas a suspender.',
        ],
        es: [
          'Prueba de residencia legal continuada en el país',
          'Los años exigidos deben ser legales y continuos; las ausencias largas y los huecos entre permisos reinician el cómputo en lugar de solo pausarlo.',
        ],
      },
      {
        en: [
          'Full history of passports and previous permits',
          'Copies of every residence permit and the passports covering those years; a missing period is read as a gap in residence, not as a lost document.',
        ],
        pt: [
          'Histórico completo de passaportes e autorizações anteriores',
          'Cópias de cada autorização de residência e dos passaportes daqueles anos; um período em falta é lido como interrupção da residência, não como documento perdido.',
        ],
        es: [
          'Historial completo de pasaportes y permisos anteriores',
          'Copias de cada permiso de residencia y de los pasaportes de esos años; un periodo faltante se lee como interrupción de la residencia, no como documento extraviado.',
        ],
      },
      {
        en: [
          'Certificate of good conduct covering Qatar and abroad',
          'A clean record locally and in the country of nationality is a condition, and past convictions are a direct bar rather than a factor to be weighed.',
        ],
        pt: [
          'Certidão de bons antecedentes no Catar e no exterior',
          'Ficha limpa localmente e no país de nacionalidade é condição, e condenações anteriores são impedimento direto, não um fator a ser ponderado.',
        ],
        es: [
          'Certificado de buena conducta en Catar y en el extranjero',
          'Un historial limpio localmente y en el país de nacionalidad es condición, y las condenas previas son un impedimento directo, no un factor a valorar.',
        ],
      },
      {
        en: [
          'Evidence of Arabic language ability',
          'Command of Arabic is assessed as part of the file. Years of residence without the language do not compensate for it.',
        ],
        pt: [
          'Comprovação de domínio da língua árabe',
          'O domínio do árabe é avaliado como parte do processo. Anos de residência sem a língua não compensam essa falta.',
        ],
        es: [
          'Acreditación de dominio de la lengua árabe',
          'El dominio del árabe se evalúa como parte del expediente. Los años de residencia sin el idioma no lo compensan.',
        ],
      },
      {
        en: [
          'Supporting evidence of service or rare competence',
          'Recognition letters, awards, patents or an employer statement showing the country needs your skills strengthen a file competing for a limited quota.',
        ],
        pt: [
          'Provas de serviços prestados ou competência rara',
          'Cartas de reconhecimento, prémios, patentes ou declaração do empregador mostrando que o país precisa das suas competências reforçam um processo que disputa cota limitada.',
        ],
        es: [
          'Pruebas de servicios prestados o competencia poco común',
          'Cartas de reconocimiento, premios, patentes o una declaración del empleador que muestre que el país necesita sus competencias refuerzan un expediente que compite por un cupo limitado.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of stable and sufficient income',
          'Payslips, contracts and tax or bank records showing you support yourself and your dependants without public assistance.',
        ],
        pt: [
          'Comprovação de renda estável e suficiente',
          'Recibos de vencimento, contratos e registos fiscais ou bancários mostrando que você se sustenta e aos dependentes sem assistência pública.',
        ],
        es: [
          'Prueba de ingresos estables y suficientes',
          'Nóminas, contratos y registros fiscales o bancarios que muestren que se mantiene a sí mismo y a sus dependientes sin ayuda pública.',
        ],
      },
      {
        en: [
          'Confirm the income level expected by the committee',
          'The threshold is administrative and revised over time; ask what applies at the moment of filing instead of using a figure from an older circular.',
        ],
        pt: [
          'Confirmar o nível de renda esperado pelo comité',
          'O patamar é administrativo e revisto ao longo do tempo; pergunte o que se aplica no momento do protocolo em vez de usar valor de uma circular antiga.',
        ],
        es: [
          'Confirmar el nivel de ingresos esperado por el comité',
          'El umbral es administrativo y se revisa con el tiempo; pregunte qué rige en el momento de presentar en lugar de usar una cifra de una circular antigua.',
        ],
      },
      {
        en: [
          'Documents on housing owned or rented long term',
          'Suitable accommodation is part of the assessment; a registered lease or a title deed is stronger than an informal arrangement.',
        ],
        pt: [
          'Documentos de moradia própria ou arrendada a longo prazo',
          'Habitação adequada faz parte da avaliação; contrato de arrendamento registado ou escritura pesa mais do que um acordo informal.',
        ],
        es: [
          'Documentos de vivienda propia o alquilada a largo plazo',
          'Una vivienda adecuada forma parte de la evaluación; un contrato de alquiler registrado o una escritura pesa más que un acuerdo informal.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Submit the file to the permanent residency committee',
          'The application goes to the dedicated committee at the Ministry of Interior, which decides at its discretion; there is no appeal on the merits.',
        ],
        pt: [
          'Entregar o processo ao comité de residência permanente',
          'O pedido vai ao comité específico do Ministério do Interior, que decide discricionariamente; não há recurso quanto ao mérito.',
        ],
        es: [
          'Presentar el expediente al comité de residencia permanente',
          'La solicitud va al comité específico del Ministerio del Interior, que decide discrecionalmente; no hay recurso sobre el fondo.',
        ],
      },
      {
        en: [
          'Pay the charges applicable at the time of filing',
          'Fees are set by regulation and are not refunded if the quota is exhausted or the file is turned down; confirm the current amounts first.',
        ],
        pt: [
          'Pagar os encargos aplicáveis na data do protocolo',
          'As taxas são fixadas por regulamento e não são devolvidas se a cota se esgotar ou o processo for negado; confirme os valores atuais antes.',
        ],
        es: [
          'Pagar los cargos aplicables en la fecha de presentación',
          'Las tasas se fijan por reglamento y no se devuelven si se agota el cupo o se deniega el expediente; confirme antes los importes actuales.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical fitness report for the permanent status',
          'A fresh examination is required for this file even if you have lived in Qatar for years on a renewed permit.',
        ],
        pt: [
          'Laudo de aptidão médica para o estatuto permanente',
          'Um novo exame é exigido para este processo mesmo que você viva no Catar há anos com autorização renovada.',
        ],
        es: [
          'Informe de aptitud médica para el estatuto permanente',
          'Se exige un examen nuevo para este expediente aunque lleve años en Catar con un permiso renovado.',
        ],
      },
      {
        en: [
          'Update fingerprints for the permanent residency file',
          'Biometrics are retaken for the new status; records held under the old sponsored permit are not simply carried across.',
        ],
        pt: [
          'Atualizar a biometria no processo de residência permanente',
          'A biometria é recolhida de novo para o novo estatuto; os registos da autorização patrocinada anterior não passam automaticamente.',
        ],
        es: [
          'Actualizar la biometría en el expediente de residencia permanente',
          'La biometría se toma de nuevo para el nuevo estatuto; los registros del permiso patrocinado anterior no se trasladan sin más.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the permanent residency card',
          'It replaces the sponsored permit and removes the tie to an employer, which is the whole point of the status.',
        ],
        pt: [
          'Retirar o cartão de residência permanente',
          'Ele substitui a autorização patrocinada e remove o vínculo com um empregador, que é o sentido do estatuto.',
        ],
        es: [
          'Retirar la tarjeta de residencia permanente',
          'Sustituye al permiso patrocinado y elimina el vínculo con un empleador, que es el sentido del estatuto.',
        ],
      },
      {
        en: [
          'Learn which rights the status actually grants',
          'It typically opens public health and education, business ownership without a partner and property rights — but it is not citizenship and does not confer a passport.',
        ],
        pt: [
          'Saber quais direitos o estatuto realmente concede',
          'Costuma abrir saúde e educação públicas, propriedade de empresa sem sócio local e direitos sobre imóveis — mas não é cidadania e não dá passaporte.',
        ],
        es: [
          'Conocer qué derechos concede realmente el estatuto',
          'Suele abrir sanidad y educación públicas, propiedad de empresa sin socio local y derechos sobre inmuebles — pero no es ciudadanía ni da pasaporte.',
        ],
      },
      {
        en: [
          'Keep the status alive and free of grounds for withdrawal',
          'Permanent residency can still be revoked, for example on criminal grounds or prolonged absence; check the absence limits before a long stay abroad.',
        ],
        pt: [
          'Manter o estatuto vivo e sem motivos de cassação',
          'A residência permanente ainda pode ser revogada, por exemplo por motivo criminal ou ausência prolongada; verifique os limites de ausência antes de uma longa estadia fora.',
        ],
        es: [
          'Mantener el estatuto vivo y sin causas de retirada',
          'La residencia permanente aún puede revocarse, por ejemplo por motivos penales o ausencia prolongada; consulte los límites de ausencia antes de una estancia larga fuera.',
        ],
      },
    ],
  },
};
