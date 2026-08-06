import type { CountryVisaSteps } from './types';

/**
 * Steps for Hong Kong.
 *
 * The first thing to internalise is that this is a separate immigration
 * jurisdiction with its own Immigration Department: a Chinese visa does not
 * admit you here, and a Hong Kong visa does not admit you to the mainland. The
 * second is the identity card — anyone permitted to stay beyond one hundred and
 * eighty days must register for a Hong Kong Identity Card within thirty days of
 * arrival and carry an identity document at all times. The third is the seven
 * year rule: continuous ordinary residence for seven years is the gateway to the
 * right of abode, which is why every earlier step is really a step in that
 * count. Visas are issued electronically now, and you print and carry the e-Visa
 * yourself.
 */
export const hongKong: CountryVisaSteps = {
  'Visitor Entry': {
    core_documents: [
      {
        en: [
          'Passport valid well beyond the intended stay',
          'Several months of validity past your departure date, and the document must be one recognised for entry here.',
        ],
        pt: [
          'Passaporte válido bem além da estada pretendida',
          'Vários meses de validade após a data de saída, e o documento precisa ser um dos reconhecidos para entrada aqui.',
        ],
        es: [
          'Pasaporte vigente bastante más allá de la estancia prevista',
          'Varios meses de validez tras la fecha de salida, y el documento debe ser uno de los reconocidos para entrar aquí.',
        ],
      },
      {
        en: [
          'Check the visa-free period set for your nationality',
          'Hong Kong publishes its own list, with permitted periods that vary widely by nationality. A visa for mainland China grants you nothing here, and the reverse is also true.',
        ],
        pt: [
          'Verificar o período de isenção definido para sua nacionalidade',
          'Hong Kong publica a própria lista, com períodos permitidos que variam muito por nacionalidade. Um visto para a China continental não vale nada aqui, e o contrário também é verdade.',
        ],
        es: [
          'Comprobar el periodo de exención fijado para su nacionalidad',
          'Hong Kong publica su propia lista, con periodos permitidos que varían mucho por nacionalidad. Un visado para China continental no sirve de nada aquí, y a la inversa también.',
        ],
      },
      {
        en: [
          'Onward or return ticket for the visit',
          'Immigration officers ask for it at the counter, and airlines check it before boarding.',
        ],
        pt: [
          'Passagem de saída ou de volta para a visita',
          'Os agentes de imigração pedem no balcão, e as companhias aéreas conferem antes do embarque.',
        ],
        es: [
          'Billete de salida o de vuelta para la visita',
          'Los agentes de inmigración lo piden en el mostrador, y las aerolíneas lo revisan antes de embarcar.',
        ],
      },
      {
        en: [
          'Accommodation details and a contact in Hong Kong',
          'The address where you will stay and, for business trips, the company you are meeting.',
        ],
        pt: [
          'Dados do alojamento e um contato em Hong Kong',
          'O endereço onde você ficará e, em viagens de negócios, a empresa que vai receber você.',
        ],
        es: [
          'Datos del alojamiento y un contacto en Hong Kong',
          'La dirección donde se alojará y, en viajes de negocios, la empresa con la que se reúne.',
        ],
      },
      {
        en: [
          'Visit visa application form for nationalities that need one',
          'Completed with photographs and the sponsor or contact details, and submitted before travelling.',
        ],
        pt: [
          'Formulário de visto de visita para nacionalidades que precisam',
          'Preenchido com fotografias e os dados do patrocinador ou contato, e enviado antes da viagem.',
        ],
        es: [
          'Formulario de visado de visita para nacionalidades que lo necesiten',
          'Cumplimentado con fotografías y los datos del patrocinador o contacto, y presentado antes de viajar.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Adequate funds for the length of the visit',
          'Hong Kong is expensive and officers do consider whether your means match the stay you are asking for.',
        ],
        pt: [
          'Recursos adequados para a duração da visita',
          'Hong Kong é cara e os agentes de fato consideram se os seus meios correspondem à estada que você pede.',
        ],
        es: [
          'Fondos adecuados para la duración de la visita',
          'Hong Kong es cara y los agentes sí valoran si sus medios se corresponden con la estancia que solicita.',
        ],
      },
      {
        en: [
          'Evidence of employment or study abroad',
          'Shows the visit is temporary, which matters more here than the amount in your account.',
        ],
        pt: [
          'Comprovação de emprego ou estudo no exterior',
          'Mostra que a visita é temporária, o que pesa mais aqui do que o valor na sua conta.',
        ],
        es: [
          'Prueba de empleo o estudio en el extranjero',
          'Muestra que la visita es temporal, algo que pesa más aquí que el importe en su cuenta.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply to the Immigration Department or through a Chinese mission',
          'Applications go to the department directly, or to a Chinese diplomatic mission where no Hong Kong office exists — the mission acts as a post box, not as the decision maker.',
        ],
        pt: [
          'Pedir ao Departamento de Imigração ou por uma missão chinesa',
          'Os pedidos vão diretamente ao departamento, ou a uma missão diplomática chinesa onde não houver escritório de Hong Kong — a missão funciona como caixa postal, não como quem decide.',
        ],
        es: [
          'Solicitar al Departamento de Inmigración o por una misión china',
          'Las solicitudes van directamente al departamento, o a una misión diplomática china donde no haya oficina de Hong Kong: la misión actúa como buzón, no como quien decide.',
        ],
      },
      {
        en: [
          'Pay the fee and print the electronic visa',
          'Visas are issued as electronic documents that you print yourself and present at the border. Arriving without the printout causes problems the airline will not solve for you. Check the current fee.',
        ],
        pt: [
          'Pagar a taxa e imprimir o visto eletrónico',
          'Os vistos são emitidos como documentos eletrónicos que você mesmo imprime e apresenta na fronteira. Chegar sem a impressão causa problemas que a companhia aérea não resolve por você. Confira a taxa vigente.',
        ],
        es: [
          'Pagar la tasa e imprimir el visado electrónico',
          'Los visados se emiten como documentos electrónicos que usted mismo imprime y presenta en la frontera. Llegar sin la impresión causa problemas que la aerolínea no le resolverá. Consulte la tasa vigente.',
        ],
      },
      {
        en: [
          'Allow the stated processing time before booking',
          'The department publishes an indicative turnaround; buying non-refundable tickets before the visa is issued is the usual mistake.',
        ],
        pt: [
          'Prever o prazo de análise informado antes de comprar passagem',
          'O departamento publica um prazo indicativo; comprar bilhetes não reembolsáveis antes de o visto sair é o erro habitual.',
        ],
        es: [
          'Prever el plazo de tramitación indicado antes de reservar',
          'El departamento publica un plazo orientativo; comprar billetes no reembolsables antes de que se emita el visado es el error habitual.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Photograph and personal particulars for the application',
          'Supplied with the form; visitors are not called to a separate biometric appointment.',
        ],
        pt: [
          'Fotografia e dados pessoais para o pedido',
          'Entregues com o formulário; visitantes não são chamados a um agendamento biométrico separado.',
        ],
        es: [
          'Fotografía y datos personales para la solicitud',
          'Se aportan con el formulario; a los visitantes no se les cita a una sesión biométrica aparte.',
        ],
      },
      {
        en: [
          'Private medical cover for the trip',
          'Public hospitals charge non-residents at a far higher tariff, billed per day of admission.',
        ],
        pt: [
          'Cobertura médica privada para a viagem',
          'Hospitais públicos cobram de não residentes uma tarifa muito mais alta, faturada por dia de internação.',
        ],
        es: [
          'Cobertura médica privada para el viaje',
          'Los hospitales públicos cobran a los no residentes una tarifa mucho más alta, facturada por día de ingreso.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Keep the landing slip issued on arrival',
          'Entry is recorded on a slip rather than a passport stamp. It shows your permitted stay and its conditions, and losing it makes proving your status awkward.',
        ],
        pt: [
          'Guardar o comprovativo de entrada emitido na chegada',
          'A entrada é registada num comprovativo, não num carimbo no passaporte. Ele mostra a permanência autorizada e as condições dela, e perdê-lo torna difícil comprovar seu status.',
        ],
        es: [
          'Conservar el comprobante de entrada emitido a la llegada',
          'La entrada se registra en un comprobante, no en un sello de pasaporte. Muestra su estancia permitida y sus condiciones, y perderlo complica acreditar su estatus.',
        ],
      },
      {
        en: [
          'Do not work, study or start a business as a visitor',
          'The prohibition covers unpaid work and volunteering too, and it is one of the conditions of stay printed on the landing slip.',
        ],
        pt: [
          'Não trabalhar, estudar nem abrir negócio como visitante',
          'A proibição abrange também trabalho não remunerado e voluntariado, e é uma das condições de permanência impressas no comprovativo de entrada.',
        ],
        es: [
          'No trabajar, estudiar ni abrir un negocio como visitante',
          'La prohibición abarca también el trabajo no remunerado y el voluntariado, y es una de las condiciones de estancia impresas en el comprobante de entrada.',
        ],
      },
      {
        en: [
          'Request an extension with reasons before the limit',
          'Extensions of a visitor stay are granted only on justified grounds. Rolling them for convenience is refused, and repeated short exits to reset the clock draw scrutiny.',
        ],
        pt: [
          'Pedir prorrogação com justificativa antes do limite',
          'Prorrogações de estada de visitante só são concedidas com motivo justificado. Renová-las por conveniência é recusado, e saídas curtas repetidas para zerar o prazo levantam suspeita.',
        ],
        es: [
          'Pedir la prórroga con motivos antes del límite',
          'Las prórrogas de una estancia de visitante solo se conceden con motivo justificado. Encadenarlas por conveniencia se rechaza, y las salidas cortas repetidas para reiniciar el plazo levantan sospechas.',
        ],
      },
      {
        en: [
          'Expect to apply from outside for any employment status',
          'Switching from visitor to a work or residence status inside Hong Kong is normally not permitted, so a job offer received while visiting means applying from abroad.',
        ],
        pt: [
          'Contar com pedir de fora qualquer status de emprego',
          'Mudar de visitante para status de trabalho ou residência dentro de Hong Kong normalmente não é permitido, então uma proposta recebida durante a visita implica pedir do exterior.',
        ],
        es: [
          'Contar con solicitar desde fuera cualquier estatus de empleo',
          'Cambiar de visitante a un estatus de trabajo o residencia dentro de Hong Kong normalmente no se permite, así que una oferta recibida durante la visita implica solicitar desde el extranjero.',
        ],
        priority: 2,
      },
    ],
  },

  'General Employment Policy': {
    core_documents: [
      {
        en: [
          'Valid travel document for the whole engagement',
          'The permission to stay is never granted beyond the validity of the passport it is attached to.',
        ],
        pt: [
          'Documento de viagem válido para todo o vínculo',
          'A permissão de permanência nunca é concedida além da validade do passaporte a que está vinculada.',
        ],
        es: [
          'Documento de viaje válido para todo el vínculo',
          'El permiso de estancia nunca se concede más allá de la validez del pasaporte al que está vinculado.',
        ],
      },
      {
        en: [
          'Confirmed job offer from a sponsoring employer',
          'There is no route here for someone job hunting on this policy. The company sponsors you and files its half of the application in parallel with yours.',
        ],
        pt: [
          'Proposta de emprego confirmada de um empregador patrocinador',
          'Não existe rota aqui para quem está procurando emprego nesta política. A empresa patrocina você e protocola a metade dela do pedido em paralelo à sua.',
        ],
        es: [
          'Oferta de empleo confirmada de un empleador patrocinador',
          'No hay vía aquí para quien busca empleo bajo esta política. La empresa le patrocina y presenta su mitad de la solicitud en paralelo a la suya.',
        ],
      },
      {
        en: [
          'Sponsorship undertaking and business registration of the employer',
          'The company gives a formal undertaking regarding your maintenance and repatriation, backed by its registration and financial standing.',
        ],
        pt: [
          'Compromisso de patrocínio e registo comercial do empregador',
          'A empresa assume um compromisso formal quanto ao seu sustento e repatriação, respaldado pelo registo e pela situação financeira dela.',
        ],
        es: [
          'Compromiso de patrocinio y registro mercantil del empleador',
          'La empresa asume un compromiso formal sobre su manutención y repatriación, respaldado por su registro y su situación financiera.',
        ],
      },
      {
        en: [
          'Justification that the post cannot be readily filled locally',
          'This is the substantive test the whole application turns on. A generic statement fails; the employer explains what makes the role specialist and what its local recruitment produced.',
        ],
        pt: [
          'Justificativa de que o cargo não pode ser preenchido localmente',
          'Este é o teste substantivo em que todo o pedido se apoia. Uma declaração genérica não passa; o empregador explica o que torna a função especializada e o que o recrutamento local produziu.',
        ],
        es: [
          'Justificación de que el puesto no puede cubrirse localmente',
          'Esta es la prueba de fondo sobre la que gira toda la solicitud. Una declaración genérica no pasa; el empleador explica qué hace especializado el puesto y qué produjo su reclutamiento local.',
        ],
      },
      {
        en: [
          'Employment application form with photograph',
          'The applicant form is filed by you while the employer files the sponsor form; a file with only one half sits unprocessed.',
        ],
        pt: [
          'Formulário de pedido de emprego com fotografia',
          'O formulário do requerente é entregue por você enquanto o empregador entrega o formulário do patrocinador; um processo com só uma metade fica parado.',
        ],
        es: [
          'Formulario de solicitud de empleo con fotografía',
          'El formulario del solicitante lo presenta usted mientras el empleador presenta el del patrocinador; un expediente con solo una mitad queda sin tramitar.',
        ],
      },
      {
        en: [
          'Employment contract setting out post, pay and benefits',
          'It has to describe the same role the justification describes; discrepancies between the two documents are the most common cause of a request for further information.',
        ],
        pt: [
          'Contrato de trabalho com cargo, remuneração e benefícios',
          'Ele precisa descrever a mesma função que a justificativa descreve; divergências entre os dois documentos são a causa mais comum de pedido de informação adicional.',
        ],
        es: [
          'Contrato de trabajo con puesto, retribución y beneficios',
          'Debe describir el mismo puesto que describe la justificación; las discrepancias entre ambos documentos son la causa más común de un requerimiento de información adicional.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Degree certificate with transcripts',
          'Copies of the qualification claimed, with translations where the original is not in English or Chinese.',
        ],
        pt: [
          'Diploma com histórico académico',
          'Cópias da qualificação alegada, com traduções quando o original não estiver em inglês ou chinês.',
        ],
        es: [
          'Título con expedientes académicos',
          'Copias de la titulación alegada, con traducciones cuando el original no esté en inglés o chino.',
        ],
      },
      {
        en: [
          'Technical qualifications and proven experience as a substitute',
          'A degree is not strictly indispensable: good technical qualifications together with documented specialist experience can carry the application instead.',
        ],
        pt: [
          'Qualificações técnicas e experiência comprovada como substituto',
          'O diploma não é estritamente indispensável: boas qualificações técnicas somadas a experiência especializada documentada podem sustentar o pedido no lugar dele.',
        ],
        es: [
          'Cualificaciones técnicas y experiencia probada como sustituto',
          'El título no es estrictamente indispensable: unas buenas cualificaciones técnicas junto con experiencia especializada documentada pueden sostener la solicitud en su lugar.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Curriculum vitae matched to the specialist requirement',
          'Written so a reviewer can see the link between your background and the exact skill the employer says is scarce locally.',
        ],
        pt: [
          'Currículo alinhado ao requisito de especialização',
          'Escrito de modo que o avaliador veja a ligação entre a sua trajetória e a competência exata que o empregador diz ser escassa localmente.',
        ],
        es: [
          'Currículum alineado con el requisito de especialización',
          'Redactado para que el evaluador vea el vínculo entre su trayectoria y la competencia exacta que el empleador dice que escasea localmente.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Remuneration at the market level for the post',
          'There is no published salary floor, but pay below the local market rate for that role defeats the application by itself. Benchmark against current market data before signing.',
        ],
        pt: [
          'Remuneração no nível de mercado para o cargo',
          'Não há piso salarial publicado, mas remuneração abaixo da taxa local de mercado para aquela função derruba o pedido sozinha. Compare com dados de mercado atuais antes de assinar.',
        ],
        es: [
          'Retribución al nivel de mercado para el puesto',
          'No hay suelo salarial publicado, pero una retribución por debajo de la tarifa local de mercado para ese puesto tumba la solicitud por sí sola. Compare con datos de mercado actuales antes de firmar.',
        ],
      },
      {
        en: [
          'Funds for the first months of settling in',
          'Residential leases are typically signed with two months of deposit plus one in advance, all paid before your first salary arrives.',
        ],
        pt: [
          'Recursos para os primeiros meses de instalação',
          'Contratos de arrendamento costumam ser assinados com dois meses de caução mais um adiantado, tudo pago antes de chegar o primeiro salário.',
        ],
        es: [
          'Fondos para los primeros meses de instalación',
          'Los contratos de alquiler suelen firmarse con dos meses de fianza más uno por adelantado, todo pagado antes de que llegue el primer salario.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Submit online or by post to the Immigration Department',
          'The department accepts applications electronically or on paper, and the two halves of the file are matched by reference; quote it consistently.',
        ],
        pt: [
          'Enviar online ou pelo correio ao Departamento de Imigração',
          'O departamento aceita pedidos eletronicamente ou em papel, e as duas metades do processo são casadas pela referência; cite-a de forma consistente.',
        ],
        es: [
          'Enviar en línea o por correo al Departamento de Inmigración',
          'El departamento acepta solicitudes electrónicamente o en papel, y las dos mitades del expediente se casan por la referencia; cítela de forma consistente.',
        ],
      },
      {
        en: [
          'Pay the visa fee after approval in principle',
          'You are notified that the application succeeded and only then pay; nothing is charged up front. Confirm the current amount at that stage.',
        ],
        pt: [
          'Pagar a taxa do visto após a aprovação em princípio',
          'Você é notificado de que o pedido foi bem-sucedido e só então paga; nada é cobrado antecipadamente. Confirme o valor vigente nessa etapa.',
        ],
        es: [
          'Pagar la tasa del visado tras la aprobación en principio',
          'Se le notifica que la solicitud prosperó y solo entonces paga; no se cobra nada por adelantado. Confirme el importe vigente en esa etapa.',
        ],
      },
      {
        en: [
          'Print the electronic visa and present it at the border',
          'The e-Visa reaches you as a file. Print it, keep it with the passport, and hand it over on arrival — it is not stored in any system the airline can read.',
        ],
        pt: [
          'Imprimir o visto eletrónico e apresentá-lo na fronteira',
          'O visto eletrónico chega como um ficheiro. Imprima, guarde junto com o passaporte e entregue na chegada — ele não está em nenhum sistema que a companhia aérea consiga consultar.',
        ],
        es: [
          'Imprimir el visado electrónico y presentarlo en la frontera',
          'El visado electrónico le llega como un archivo. Imprímalo, guárdelo con el pasaporte y entréguelo al llegar: no está en ningún sistema que la aerolínea pueda consultar.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometrics captured at the identity card registration',
          'Fingerprints and a photograph are taken at the registration office after arrival, not during the visa application.',
        ],
        pt: [
          'Biometria recolhida no registo do cartão de identidade',
          'Impressões digitais e fotografia são recolhidas no posto de registo após a chegada, não durante o pedido de visto.',
        ],
        es: [
          'Biometría tomada en el registro de la tarjeta de identidad',
          'Las huellas y la fotografía se toman en la oficina de registro tras la llegada, no durante la solicitud de visado.',
        ],
      },
      {
        en: [
          'No medical examination is required on this route',
          'Unusual among work visas in the region: there is no health certificate or chest screening to arrange. Health cover is still your own responsibility until you settle in.',
        ],
        pt: [
          'Nenhum exame médico é exigido nesta rota',
          'Algo incomum entre os vistos de trabalho da região: não há certificado de saúde nem triagem torácica a providenciar. A cobertura de saúde ainda é responsabilidade sua até você se estabelecer.',
        ],
        es: [
          'No se exige examen médico en esta vía',
          'Algo inusual entre los visados de trabajo de la región: no hay certificado de salud ni cribado torácico que gestionar. La cobertura sanitaria sigue siendo responsabilidad suya hasta que se instale.',
        ],
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Register for a Hong Kong Identity Card within thirty days',
          'Anyone permitted to stay beyond one hundred and eighty days must register within thirty days of arrival. The deadline is statutory and running late is an offence, not a formality.',
        ],
        pt: [
          'Registar-se para o Cartão de Identidade de Hong Kong em trinta dias',
          'Quem é autorizado a permanecer além de cento e oitenta dias precisa se registar em até trinta dias da chegada. O prazo é legal e atrasar é uma infração, não uma formalidade.',
        ],
        es: [
          'Registrarse para la Tarjeta de Identidad de Hong Kong en treinta días',
          'Quien tenga permiso para permanecer más de ciento ochenta días debe registrarse dentro de los treinta días de su llegada. El plazo es legal y retrasarse es una infracción, no un trámite.',
        ],
      },
      {
        en: [
          'Carry an identity document at all times',
          'Officers can ask any person to produce proof of identity in the street. The card, not a photocopy, is what satisfies the requirement.',
        ],
        pt: [
          'Andar sempre com um documento de identidade',
          'Os agentes podem exigir de qualquer pessoa a comprovação de identidade na rua. É o cartão, não uma fotocópia, que cumpre a exigência.',
        ],
        es: [
          'Llevar siempre un documento de identidad',
          'Los agentes pueden exigir a cualquier persona que acredite su identidad en la calle. Es la tarjeta, no una fotocopia, lo que cumple el requisito.',
        ],
      },
      {
        en: [
          'Obtain a fresh approval before changing employer',
          'Your permission is tied to the sponsoring company. A new job needs a new application approved before your first day, and resigning without one leaves you with no basis to stay.',
        ],
        pt: [
          'Obter nova aprovação antes de trocar de empregador',
          'Sua permissão está atrelada à empresa patrocinadora. Um novo emprego exige um novo pedido aprovado antes do primeiro dia, e pedir demissão sem isso deixa você sem base para permanecer.',
        ],
        es: [
          'Obtener una nueva aprobación antes de cambiar de empleador',
          'Su permiso está ligado a la empresa patrocinadora. Un nuevo empleo exige una nueva solicitud aprobada antes del primer día, y renunciar sin ella le deja sin base para permanecer.',
        ],
      },
      {
        en: [
          'Apply for an extension of stay ahead of the expiry date',
          'Extensions follow a set pattern of successive periods and are applied for a few weeks before the current limit. Applying on the last day risks a gap in status.',
        ],
        pt: [
          'Pedir a prorrogação de permanência antes da data de vencimento',
          'As prorrogações seguem um padrão fixo de períodos sucessivos e são pedidas algumas semanas antes do limite atual. Pedir no último dia arrisca uma lacuna no status.',
        ],
        es: [
          'Solicitar la prórroga de estancia antes de la fecha de caducidad',
          'Las prórrogas siguen un patrón fijo de periodos sucesivos y se solicitan unas semanas antes del límite actual. Solicitarla el último día arriesga un vacío de estatus.',
        ],
      },
      {
        en: [
          'Bring the family under the dependant policy',
          'A spouse and children under eighteen can join you, and a dependant here may take up employment without any further permission — a genuinely unusual feature.',
        ],
        pt: [
          'Trazer a família pela política de dependentes',
          'Cônjuge e filhos menores de dezoito anos podem acompanhar você, e um dependente aqui pode assumir emprego sem qualquer permissão adicional — uma característica realmente incomum.',
        ],
        es: [
          'Traer a la familia por la política de dependientes',
          'El cónyuge y los hijos menores de dieciocho años pueden acompañarle, y un dependiente aquí puede trabajar sin permiso adicional alguno: una característica realmente inusual.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Keep the residence unbroken towards the seven year mark',
          'Continuous ordinary residence for seven years opens the right of abode. Long postings abroad on the same employment can interrupt that count, so plan absences deliberately.',
        ],
        pt: [
          'Manter a residência sem interrupção rumo à marca de sete anos',
          'Sete anos de residência ordinária contínua abrem o direito de residência permanente. Destacamentos longos no exterior pelo mesmo emprego podem interromper essa contagem, então planeje as ausências com intenção.',
        ],
        es: [
          'Mantener la residencia sin cortes hacia la marca de siete años',
          'Siete años de residencia ordinaria continua abren el derecho de residencia permanente. Los destinos largos en el extranjero por el mismo empleo pueden interrumpir ese cómputo, así que planifique las ausencias con intención.',
        ],
      },
    ],
  },

  'Top Talent Pass Scheme': {
    core_documents: [
      {
        en: [
          'Travel document held throughout the pass',
          'The permission granted cannot exceed your passport, and renewing the passport mid-pass means updating the record.',
        ],
        pt: [
          'Documento de viagem mantido durante todo o passe',
          'A permissão concedida não pode ultrapassar o passaporte, e renová-lo no meio do passe implica atualizar o registo.',
        ],
        es: [
          'Documento de viaje mantenido durante todo el pase',
          'El permiso concedido no puede exceder su pasaporte, y renovarlo a mitad del pase implica actualizar el registro.',
        ],
      },
      {
        en: [
          'Decide which qualifying category you fall into',
          'The scheme runs parallel categories — one based on past income, others on graduating from an eligible university — with different evidence and, for one of them, an annual quota.',
        ],
        pt: [
          'Definir em qual categoria qualificadora você se enquadra',
          'O programa tem categorias paralelas — uma baseada em renda passada, outras em formação numa universidade elegível — com provas diferentes e, numa delas, uma cota anual.',
        ],
        es: [
          'Definir en qué categoría cualificadora encaja',
          'El programa tiene categorías paralelas —una basada en ingresos pasados, otras en haber estudiado en una universidad elegible— con pruebas distintas y, en una de ellas, un cupo anual.',
        ],
      },
      {
        en: [
          'Apply online through the dedicated electronic service',
          'The whole application is filed and tracked electronically, and decisions on straightforward files come back notably faster than on sponsored work routes.',
        ],
        pt: [
          'Pedir online pelo serviço eletrónico dedicado',
          'Todo o pedido é entregue e acompanhado eletronicamente, e decisões sobre processos simples voltam bem mais rápido do que nas rotas de trabalho patrocinado.',
        ],
        es: [
          'Solicitar en línea por el servicio electrónico dedicado',
          'Toda la solicitud se presenta y se sigue electrónicamente, y las decisiones sobre expedientes sencillos vuelven bastante más rápido que en las vías de trabajo patrocinado.',
        ],
      },
      {
        en: [
          'Declaration that no employer sponsors you',
          'This is the defining feature of the scheme: no job offer, no company undertaking, no local sponsor is needed at any point.',
        ],
        pt: [
          'Declaração de que nenhum empregador patrocina você',
          'Esta é a característica que define o programa: nenhuma proposta de emprego, nenhum compromisso de empresa, nenhum patrocinador local é necessário em momento algum.',
        ],
        es: [
          'Declaración de que ningún empleador le patrocina',
          'Esta es la característica que define el programa: ninguna oferta de empleo, ningún compromiso de empresa, ningún patrocinador local es necesario en ningún momento.',
        ],
      },
      {
        en: [
          'Documents for dependants filed at the same time',
          'A spouse and children can be included, and lodging their applications alongside yours avoids a second round of processing later.',
        ],
        pt: [
          'Documentos dos dependentes entregues ao mesmo tempo',
          'Cônjuge e filhos podem ser incluídos, e protocolar os pedidos deles junto com o seu evita uma segunda rodada de processamento depois.',
        ],
        es: [
          'Documentos de los dependientes presentados a la vez',
          'El cónyuge y los hijos pueden incluirse, y presentar sus solicitudes junto con la suya evita una segunda ronda de tramitación después.',
        ],
        priority: 2,
        required: false,
      },
    ],
    education: [
      {
        en: [
          'Degree from a university on the eligible list',
          'The list of recognised institutions is published and revised periodically. Check that your university appears on the version current at the moment you apply, not an older one.',
        ],
        pt: [
          'Diploma de universidade que conste na lista elegível',
          'A lista de instituições reconhecidas é publicada e revista periodicamente. Confira se a sua universidade aparece na versão vigente no momento do pedido, não numa antiga.',
        ],
        es: [
          'Título de una universidad que figure en la lista elegible',
          'La lista de instituciones reconocidas se publica y se revisa periódicamente. Compruebe que su universidad aparece en la versión vigente en el momento de solicitar, no en una antigua.',
        ],
      },
      {
        en: [
          'Certified copies and translations of the qualification',
          'Awarding documents rather than provisional letters, translated where they are not in English or Chinese.',
        ],
        pt: [
          'Cópias certificadas e traduções da qualificação',
          'Documentos de conclusão, não cartas provisórias, traduzidos quando não estiverem em inglês ou chinês.',
        ],
        es: [
          'Copias certificadas y traducciones de la titulación',
          'Documentos de expedición y no cartas provisionales, traducidos cuando no estén en inglés o chino.',
        ],
      },
      {
        en: [
          'Employment history showing years since graduation',
          'The graduate category splits by how much work experience you have, and the branch for recent graduates with little experience is the one subject to an annual limit.',
        ],
        pt: [
          'Histórico de emprego mostrando os anos desde a formatura',
          'A categoria de graduados se divide pela quantidade de experiência de trabalho, e o ramo dos recém-formados com pouca experiência é o que está sujeito a um limite anual.',
        ],
        es: [
          'Historial de empleo que muestre los años desde la graduación',
          'La categoría de graduados se divide por la cantidad de experiencia laboral, y la rama de recién graduados con poca experiencia es la sujeta a un límite anual.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Income evidence for the earnings-based category',
          'Tax returns, payslips and employer letters covering the reference year. The qualifying level is published and revised; confirm the figure in force rather than assuming.',
        ],
        pt: [
          'Comprovação de renda para a categoria baseada em ganhos',
          'Declarações fiscais, contracheques e cartas do empregador cobrindo o ano de referência. O nível qualificador é publicado e revisto; confirme o valor em vigor em vez de supor.',
        ],
        es: [
          'Prueba de ingresos para la categoría basada en ganancias',
          'Declaraciones fiscales, nóminas y cartas del empleador que cubran el año de referencia. El nivel que califica se publica y se revisa; confirme la cifra en vigor en lugar de suponerla.',
        ],
      },
      {
        en: [
          'Means to support yourself and any dependants',
          'The pass arrives without income attached. Housing costs here are among the highest anywhere and are paid up front.',
        ],
        pt: [
          'Meios para sustentar você e eventuais dependentes',
          'O passe chega sem renda vinculada. Os custos de habitação aqui estão entre os mais altos do mundo e são pagos antecipadamente.',
        ],
        es: [
          'Medios para mantenerse a sí mismo y a sus dependientes',
          'El pase llega sin ingresos asociados. Los costes de vivienda aquí están entre los más altos del mundo y se pagan por adelantado.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Settle the fee once the application succeeds',
          'Payment is requested after approval, per person including dependants. Verify the amount published at that moment.',
        ],
        pt: [
          'Quitar a taxa depois de o pedido ser aprovado',
          'O pagamento é solicitado após a aprovação, por pessoa incluindo dependentes. Verifique o valor publicado naquele momento.',
        ],
        es: [
          'Abonar la tasa una vez que la solicitud prospere',
          'El pago se solicita tras la aprobación, por persona incluyendo dependientes. Verifique el importe publicado en ese momento.',
        ],
      },
      {
        en: [
          'Enter within the validity of the issued document',
          'Approval comes with a window in which you must arrive. Letting it lapse means starting the application again from the beginning.',
        ],
        pt: [
          'Entrar dentro da validade do documento emitido',
          'A aprovação vem com uma janela em que você precisa chegar. Deixá-la vencer significa recomeçar o pedido do zero.',
        ],
        es: [
          'Entrar dentro de la validez del documento emitido',
          'La aprobación viene con una ventana en la que debe llegar. Dejarla caducar significa empezar la solicitud de nuevo.',
        ],
      },
      {
        en: [
          'Watch the annual quota on the capped branch',
          'Where a limit applies it is allocated through the year and closes once filled, so timing your application matters in a way it does not on other routes.',
        ],
        pt: [
          'Acompanhar a cota anual do ramo limitado',
          'Onde há limite, ele é distribuído ao longo do ano e fecha quando preenchido, então o momento do pedido importa de um jeito que não importa nas outras rotas.',
        ],
        es: [
          'Vigilar el cupo anual de la rama limitada',
          'Donde hay límite, se asigna a lo largo del año y se cierra al llenarse, así que el momento de solicitar importa de un modo que no importa en otras vías.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Photograph and fingerprints taken for the identity card',
          'Recorded at the registration office after you arrive, as part of the card appointment.',
        ],
        pt: [
          'Fotografia e impressões digitais para o cartão de identidade',
          'Registadas no posto de registo depois da chegada, como parte do agendamento do cartão.',
        ],
        es: [
          'Fotografía y huellas tomadas para la tarjeta de identidad',
          'Se registran en la oficina de registro tras su llegada, como parte de la cita de la tarjeta.',
        ],
      },
      {
        en: [
          'Private health insurance until you are settled',
          'Public care is subsidised for residents, but private cover bridges the arrival period and is what most employers here provide anyway.',
        ],
        pt: [
          'Seguro de saúde privado até você se estabelecer',
          'O atendimento público é subsidiado para residentes, mas a cobertura privada cobre o período de chegada e é o que a maioria dos empregadores daqui oferece de qualquer forma.',
        ],
        es: [
          'Seguro de salud privado hasta que se instale',
          'La atención pública está subvencionada para los residentes, pero la cobertura privada cubre el periodo de llegada y es lo que la mayoría de los empleadores de aquí ofrece igualmente.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Complete the identity card registration after arrival',
          'The same thirty day deadline applies to pass holders. Book the appointment before you fly, because slots fill up.',
        ],
        pt: [
          'Concluir o registo do cartão de identidade após a chegada',
          'O mesmo prazo de trinta dias vale para os titulares do passe. Agende antes de voar, porque os horários se esgotam.',
        ],
        es: [
          'Completar el registro de la tarjeta de identidad tras llegar',
          'El mismo plazo de treinta días rige para los titulares del pase. Reserve la cita antes de volar, porque los huecos se agotan.',
        ],
      },
      {
        en: [
          'Work for anyone or start your own business freely',
          'The pass carries no employment restriction, so you can take a job, change it, freelance or set up a company without asking permission each time.',
        ],
        pt: [
          'Trabalhar para quem quiser ou abrir o próprio negócio livremente',
          'O passe não traz restrição de emprego, então você pode assumir um trabalho, trocá-lo, atuar como autónomo ou abrir uma empresa sem pedir permissão a cada vez.',
        ],
        es: [
          'Trabajar para quien quiera o montar su propio negocio libremente',
          'El pase no lleva restricción de empleo, así que puede aceptar un trabajo, cambiarlo, trabajar por cuenta propia o montar una empresa sin pedir permiso cada vez.',
        ],
      },
      {
        en: [
          'Show you have taken up work when you seek to stay on',
          'Extension is not automatic. You are expected to demonstrate employment or a business in operation, at a level of pay consistent with the local market.',
        ],
        pt: [
          'Demonstrar que assumiu trabalho ao pedir para continuar',
          'A prorrogação não é automática. Espera-se que você comprove emprego ou negócio em funcionamento, com remuneração coerente com o mercado local.',
        ],
        es: [
          'Demostrar que ha tomado trabajo al pedir continuar',
          'La prórroga no es automática. Se espera que acredite empleo o un negocio en marcha, con una retribución coherente con el mercado local.',
        ],
      },
      {
        en: [
          'Treat the first period as time limited',
          'The initial pass runs for a fixed stretch and is not renewed on the same terms. Plan the transition to an employment-based permission well before it ends.',
        ],
        pt: [
          'Tratar o primeiro período como tempo limitado',
          'O passe inicial vale por um prazo fixo e não é renovado nos mesmos termos. Planeje a transição para uma permissão baseada em emprego bem antes do fim.',
        ],
        es: [
          'Tratar el primer periodo como tiempo limitado',
          'El pase inicial dura un plazo fijo y no se renueva en los mismos términos. Planifique la transición a un permiso basado en el empleo mucho antes de que acabe.',
        ],
        priority: 2,
      },
      {
        en: [
          'Accumulate residence towards permanent status',
          'Years spent here under the scheme count towards the seven year residence requirement, provided Hong Kong is genuinely where you live.',
        ],
        pt: [
          'Acumular residência rumo ao status permanente',
          'Os anos passados aqui sob o programa contam para o requisito de sete anos de residência, desde que Hong Kong seja de fato onde você vive.',
        ],
        es: [
          'Acumular residencia hacia el estatus permanente',
          'Los años pasados aquí bajo el programa cuentan para el requisito de siete años de residencia, siempre que Hong Kong sea realmente donde vive.',
        ],
      },
    ],
  },

  'Right of Abode': {
    core_documents: [
      {
        en: [
          'Passport and your current Hong Kong identity card',
          'Both are presented in person; the application is made from inside the territory while you hold a valid permission to stay.',
        ],
        pt: [
          'Passaporte e o seu cartão de identidade atual de Hong Kong',
          'Ambos são apresentados presencialmente; o pedido é feito de dentro do território enquanto você tem permissão de permanência válida.',
        ],
        es: [
          'Pasaporte y su tarjeta de identidad actual de Hong Kong',
          'Ambos se presentan en persona; la solicitud se hace desde dentro del territorio mientras tiene un permiso de estancia vigente.',
        ],
      },
      {
        en: [
          'Seven years of continuous ordinary residence immediately before applying',
          'Both words carry weight. Continuous means without a break that severs the period, and ordinary means Hong Kong was your settled home rather than a base you passed through.',
        ],
        pt: [
          'Sete anos de residência ordinária contínua imediatamente antes do pedido',
          'As duas palavras pesam. Contínua significa sem uma interrupção que rompa o período, e ordinária significa que Hong Kong era o seu lar estabelecido, não uma base de passagem.',
        ],
        es: [
          'Siete años de residencia ordinaria continua inmediatamente antes de solicitar',
          'Ambas palabras pesan. Continua significa sin una interrupción que rompa el periodo, y ordinaria significa que Hong Kong era su hogar establecido, no una base de paso.',
        ],
      },
      {
        en: [
          'Application for verification of eligibility',
          'The formal route by which a non-Chinese national has permanent resident status confirmed and the identity card endorsed.',
        ],
        pt: [
          'Pedido de verificação de elegibilidade',
          'A via formal pela qual um não nacional chinês tem o status de residente permanente confirmado e o cartão de identidade endossado.',
        ],
        es: [
          'Solicitud de verificación de elegibilidad',
          'La vía formal por la que un no nacional chino ve confirmado su estatus de residente permanente y endosada su tarjeta de identidad.',
        ],
      },
      {
        en: [
          'Statutory declaration taking Hong Kong as your only permanent home',
          'A sworn statement, not a checkbox. It is weighed against where your family, your habitual residence and your principal ties actually are.',
        ],
        pt: [
          'Declaração juramentada adotando Hong Kong como seu único lar permanente',
          'Uma declaração sob juramento, não uma caixinha marcada. Ela é pesada contra onde a sua família, a sua residência habitual e os seus vínculos principais de fato estão.',
        ],
        es: [
          'Declaración jurada de tomar Hong Kong como su único hogar permanente',
          'Una declaración bajo juramento, no una casilla marcada. Se pondera frente a dónde están realmente su familia, su residencia habitual y sus vínculos principales.',
        ],
      },
      {
        en: [
          'Documentary history of your stay',
          'Old visas, extension labels, employment records and school records for children, covering the whole qualifying period. Gaps have to be explained by you, not assumed away.',
        ],
        pt: [
          'Histórico documental da sua permanência',
          'Vistos antigos, etiquetas de prorrogação, registos de emprego e registos escolares dos filhos, cobrindo todo o período qualificador. As lacunas cabe a você explicar, não são presumidas.',
        ],
        es: [
          'Historial documental de su estancia',
          'Visados antiguos, etiquetas de prórroga, registros de empleo y registros escolares de los hijos, cubriendo todo el periodo que califica. Los vacíos le toca explicarlos a usted, no se presumen.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Tax returns and salary records for the qualifying years',
          'Assessments from the revenue department are the cleanest evidence that you were living and working here rather than visiting frequently.',
        ],
        pt: [
          'Declarações fiscais e registos salariais dos anos qualificadores',
          'As notificações do fisco são a prova mais limpa de que você morava e trabalhava aqui, e não apenas visitava com frequência.',
        ],
        es: [
          'Declaraciones fiscales y registros salariales de los años que califican',
          'Las liquidaciones de la agencia tributaria son la prueba más limpia de que vivía y trabajaba aquí, y no de que visitaba con frecuencia.',
        ],
      },
      {
        en: [
          'Proof of a home maintained in the territory',
          'Tenancy agreements or a property title across the period. Where a family lives is one of the factors weighed in deciding whether residence was ordinary.',
        ],
        pt: [
          'Prova de um lar mantido no território',
          'Contratos de arrendamento ou título de propriedade ao longo do período. Onde a família mora é um dos fatores pesados para decidir se a residência foi ordinária.',
        ],
        es: [
          'Prueba de un hogar mantenido en el territorio',
          'Contratos de arrendamiento o un título de propiedad a lo largo del periodo. Dónde vive la familia es uno de los factores que se ponderan para decidir si la residencia fue ordinaria.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Attend the registration office in person',
          'The application is lodged face to face with the originals, and the officer may raise questions about your absences on the spot.',
        ],
        pt: [
          'Comparecer pessoalmente ao posto de registo',
          'O pedido é entregue presencialmente com os originais, e o agente pode levantar perguntas sobre as suas ausências na hora.',
        ],
        es: [
          'Acudir en persona a la oficina de registro',
          'La solicitud se presenta cara a cara con los originales, y el agente puede plantear preguntas sobre sus ausencias en el momento.',
        ],
      },
      {
        en: [
          'Check what is charged for the verification and the new card',
          'The verification and the replacement card are handled together but are not necessarily priced the same way. Confirm what applies to your case before attending.',
        ],
        pt: [
          'Verificar o que é cobrado pela verificação e pelo novo cartão',
          'A verificação e a substituição do cartão são tratadas juntas, mas não necessariamente têm o mesmo tipo de cobrança. Confirme o que se aplica ao seu caso antes de comparecer.',
        ],
        es: [
          'Comprobar qué se cobra por la verificación y por la nueva tarjeta',
          'La verificación y la sustitución de la tarjeta se tramitan juntas, pero no necesariamente se tarifan igual. Confirme qué aplica a su caso antes de acudir.',
        ],
      },
      {
        en: [
          'Keep your existing permission valid while the case is decided',
          'The verification takes time. Continue renewing your current status normally; letting it expire during the wait undermines the very continuity you are claiming.',
        ],
        pt: [
          'Manter válida a permissão atual enquanto o caso é decidido',
          'A verificação leva tempo. Continue renovando o seu status atual normalmente; deixá-lo vencer durante a espera mina justamente a continuidade que você alega.',
        ],
        es: [
          'Mantener vigente su permiso actual mientras se decide el caso',
          'La verificación lleva tiempo. Siga renovando su estatus actual con normalidad; dejarlo caducar durante la espera socava justo la continuidad que alega.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints and photograph for the permanent card',
          'Recaptured for the new card even though you already hold one, because the card carries a different endorsement.',
        ],
        pt: [
          'Impressões digitais e fotografia para o cartão permanente',
          'Recolhidas de novo para o novo cartão mesmo que você já tenha um, porque o cartão traz um endosso diferente.',
        ],
        es: [
          'Huellas y fotografía para la tarjeta permanente',
          'Se vuelven a tomar para la nueva tarjeta aunque ya tenga una, porque la tarjeta lleva un endoso distinto.',
        ],
      },
      {
        en: [
          'No medical assessment is part of this procedure',
          'Nothing about health enters the decision; it turns entirely on residence, intention and record.',
        ],
        pt: [
          'Nenhuma avaliação médica faz parte deste procedimento',
          'Nada relativo à saúde entra na decisão; ela se apoia inteiramente em residência, intenção e histórico.',
        ],
        es: [
          'Ninguna evaluación médica forma parte de este procedimiento',
          'Nada relativo a la salud entra en la decisión; se apoya enteramente en residencia, intención e historial.',
        ],
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the permanent identity card with its endorsement',
          'The card states that the holder has the right of abode, and that line is what employers, banks and border officers read.',
        ],
        pt: [
          'Retirar o cartão de identidade permanente com o endosso',
          'O cartão declara que o titular tem direito de residência permanente, e é essa linha que empregadores, bancos e agentes de fronteira leem.',
        ],
        es: [
          'Recoger la tarjeta de identidad permanente con su endoso',
          'La tarjeta declara que el titular tiene derecho de residencia permanente, y es esa línea la que leen empleadores, bancos y agentes de frontera.',
        ],
      },
      {
        en: [
          'Live and work without any condition of stay',
          'No sponsor, no permit, no extension deadlines. This is the point at which immigration stops being part of your routine.',
        ],
        pt: [
          'Viver e trabalhar sem qualquer condição de permanência',
          'Sem patrocinador, sem autorização, sem prazos de prorrogação. É o ponto em que a imigração deixa de fazer parte da sua rotina.',
        ],
        es: [
          'Vivir y trabajar sin ninguna condición de estancia',
          'Sin patrocinador, sin permiso, sin plazos de prórroga. Es el punto en que inmigración deja de formar parte de su rutina.',
        ],
      },
      {
        en: [
          'A long absence can cost a non-Chinese national the right of abode',
          'Stay away continuously beyond the statutory period and the status lapses, leaving a lesser right to land that lets you return and work but is not the same thing. Return periodically.',
        ],
        pt: [
          'Uma ausência longa pode custar o direito de residência a quem não é nacional chinês',
          'Ficar fora continuamente além do período legal faz o status caducar, restando um direito menor de desembarque que permite voltar e trabalhar, mas não é a mesma coisa. Volte periodicamente.',
        ],
        es: [
          'Una ausencia larga puede costar el derecho de residencia a quien no es nacional chino',
          'Permanecer fuera de forma continua más allá del periodo legal hace caducar el estatus, dejando un derecho menor de desembarco que permite volver y trabajar, pero no es lo mismo. Regrese periódicamente.',
        ],
      },
      {
        en: [
          'Chinese nationals follow a different qualifying route',
          'Permanent status for Chinese citizens rests on birth or descent rather than on the seven year count, so a mixed family may qualify by two separate paths.',
        ],
        pt: [
          'Nacionais chineses seguem uma via de qualificação diferente',
          'O status permanente de cidadãos chineses se apoia em nascimento ou ascendência, e não na contagem de sete anos, então uma família mista pode qualificar por duas vias distintas.',
        ],
        es: [
          'Los nacionales chinos siguen una vía de calificación distinta',
          'El estatus permanente de los ciudadanos chinos se apoya en el nacimiento o la ascendencia, no en el cómputo de siete años, así que una familia mixta puede calificar por dos vías distintas.',
        ],
        priority: 2,
      },
      {
        en: [
          'Sponsor family members once you hold the status',
          'A permanent resident can sponsor dependants under the family policy, which is normally simpler than the route you came through yourself.',
        ],
        pt: [
          'Patrocinar familiares depois de obter o status',
          'Um residente permanente pode patrocinar dependentes pela política familiar, o que normalmente é mais simples do que a rota pela qual você mesmo passou.',
        ],
        es: [
          'Patrocinar a familiares una vez obtenido el estatus',
          'Un residente permanente puede patrocinar a dependientes por la política familiar, lo que normalmente es más sencillo que la vía por la que usted mismo pasó.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
