import type { CountryVisaSteps } from './types';

/**
 * Steps for Australia.
 *
 * Australian visas are entirely digital — there has been no visa label in the
 * passport for years, and status is checked online through VEVO. Everything is
 * lodged in ImmiAccount.
 *
 * Three requirements recur across almost every subclass and are worth treating
 * as a single block: health, character and English. The character requirement
 * in particular catches people out, because it asks for police certificates
 * from every country you lived in for twelve months or more over the last ten
 * years, and those take time to obtain.
 *
 * The four categories here are umbrellas covering many subclasses, so the steps
 * stay at the level they share and name the subclass only where it changes what
 * you must do.
 */
export const australia: CountryVisaSteps = {
  'Visitor & Short-Term Stay Visas': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'The visa is linked electronically to the passport number; renewing the passport means notifying the department.',
        ],
        pt: [
          'Passaporte válido',
          'O visto fica vinculado eletronicamente ao número do passaporte; renovar o passaporte exige avisar o departamento.',
        ],
        es: [
          'Pasaporte vigente',
          'El visado queda vinculado electrónicamente al número de pasaporte; renovarlo obliga a avisar al departamento.',
        ],
      },
      {
        en: [
          'Check which subclass applies to you',
          'Some nationalities use the ETA or eVisitor, which are cheap and near-instant; everyone else lodges a Visitor visa. Applying under the wrong one wastes the charge.',
        ],
        pt: [
          'Verificar qual subclasse se aplica a você',
          'Algumas nacionalidades usam a ETA ou o eVisitor, baratos e quase instantâneos; as demais protocolam o Visitor visa. Pedir na subclasse errada desperdiça a taxa.',
        ],
        es: [
          'Comprobar qué subclase le aplica',
          'Algunas nacionalidades usan la ETA o el eVisitor, baratos y casi instantáneos; las demás presentan el Visitor visa. Solicitar en la subclase equivocada desperdicia la tasa.',
        ],
      },
      {
        en: [
          'ImmiAccount application',
          'Everything is lodged and tracked online; there is no paper form.',
        ],
        pt: [
          'Pedido no ImmiAccount',
          'Tudo é protocolado e acompanhado online; não existe formulário em papel.',
        ],
        es: [
          'Solicitud en ImmiAccount',
          'Todo se presenta y se sigue en línea; no existe formulario en papel.',
        ],
      },
      {
        en: [
          'Travel itinerary and accommodation',
          'Dates, flights and where you will stay.',
        ],
        pt: ['Itinerário e alojamento', 'Datas, voos e onde você vai ficar.'],
        es: ['Itinerario y alojamiento', 'Fechas, vuelos y dónde se alojará.'],
      },
      {
        en: [
          'Evidence of ties to your home country',
          'Employment, studies, property or dependants. The genuine temporary entrant test is what most refusals turn on.',
        ],
        pt: [
          'Comprovação de vínculos com seu país',
          'Emprego, estudos, imóveis ou dependentes. O teste de genuine temporary entrant é sobre o que gira a maioria das negativas.',
        ],
        es: [
          'Prueba de arraigo en su país',
          'Empleo, estudios, propiedades o dependientes. El test de genuine temporary entrant es sobre lo que giran la mayoría de las denegaciones.',
        ],
      },
      {
        en: [
          'Letter of invitation from your host',
          'If visiting family, with their status in Australia and the relationship to you.',
        ],
        pt: [
          'Carta-convite do anfitrião',
          'Se for visitar família, com a situação dela na Austrália e o vínculo com você.',
        ],
        es: [
          'Carta de invitación del anfitrión',
          'Si visita a familiares, con su situación en Australia y el vínculo con usted.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Bank statements from the last three to six months',
          'Australia sets no fixed figure; the officer weighs the balance against the trip you describe.',
        ],
        pt: [
          'Extratos bancários dos últimos três a seis meses',
          'A Austrália não fixa um valor; o oficial pesa o saldo contra a viagem que você descreve.',
        ],
        es: [
          'Extractos bancarios de los últimos tres a seis meses',
          'Australia no fija un importe; el oficial contrasta el saldo con el viaje que usted describe.',
        ],
      },
      {
        en: [
          'Proof of employment or income',
          'An employer letter with approved leave, or business documents if self-employed.',
        ],
        pt: [
          'Comprovação de emprego ou renda',
          'Carta do empregador com férias aprovadas, ou documentos da empresa se for autônomo.',
        ],
        es: [
          'Comprobante de empleo o ingresos',
          'Carta del empleador con vacaciones aprobadas, o documentos de la empresa si trabaja por cuenta propia.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Lodge the application in ImmiAccount',
          'The ETA is lodged through its own app rather than the main portal.',
        ],
        pt: [
          'Protocolar o pedido no ImmiAccount',
          'A ETA é protocolada por um aplicativo próprio, não pelo portal principal.',
        ],
        es: [
          'Presentar la solicitud en ImmiAccount',
          'La ETA se presenta por su propia aplicación, no por el portal principal.',
        ],
      },
      {
        en: [
          'Pay the visa application charge',
          'It varies enormously between the ETA and a full Visitor visa, and it is not refunded on refusal.',
        ],
        pt: [
          'Pagar a visa application charge',
          'Varia muito entre a ETA e o Visitor visa completo, e não é reembolsada em caso de negativa.',
        ],
        es: [
          'Pagar la visa application charge',
          'Varía mucho entre la ETA y el Visitor visa completo, y no se reembolsa si deniegan.',
        ],
      },
      {
        en: [
          'Upload the supporting documents',
          'Attach everything at lodgement; a decision can be made without asking you for more.',
        ],
        pt: [
          'Anexar os documentos de suporte',
          'Anexe tudo já no protocolo; a decisão pode sair sem que peçam nada a mais.',
        ],
        es: [
          'Adjuntar los documentos de apoyo',
          'Adjunte todo ya al presentar; la decisión puede salir sin que le pidan nada más.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometrics collection where required',
          'Requested for some nationalities and lodgement locations, at an Australian visa application centre.',
        ],
        pt: [
          'Recolha de biometria quando exigida',
          'Pedida para algumas nacionalidades e locais de protocolo, num centro de pedidos australiano.',
        ],
        es: [
          'Recogida de biometría cuando se exija',
          'Se pide para algunas nacionalidades y lugares de presentación, en un centro de solicitudes australiano.',
        ],
        required: false,
      },
      {
        en: [
          'Health examination',
          'Not usual for short visits, but requested for longer stays, for some countries, and if you plan to work in healthcare or with children.',
        ],
        pt: [
          'Exame de saúde',
          'Não é usual em visitas curtas, mas é pedido em estadas longas, para alguns países, e se você pretende trabalhar na saúde ou com crianças.',
        ],
        es: [
          'Examen de salud',
          'No es habitual en visitas cortas, pero se pide en estancias largas, para algunos países, y si piensa trabajar en sanidad o con niños.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Save the grant notification',
          'There is no label in the passport. The grant letter and VEVO are your proof.',
        ],
        pt: [
          'Guardar a notificação de concessão',
          'Não há etiqueta no passaporte. A carta de concessão e o VEVO são a sua prova.',
        ],
        es: [
          'Guardar la notificación de concesión',
          'No hay etiqueta en el pasaporte. La carta de concesión y VEVO son su prueba.',
        ],
      },
      {
        en: [
          'Check the conditions attached to the visa',
          'Conditions such as no further stay or no work are coded on the grant and are enforced strictly.',
        ],
        pt: [
          'Conferir as condições anexadas ao visto',
          'Condições como no further stay ou proibição de trabalho vêm codificadas na concessão e são aplicadas com rigor.',
        ],
        es: [
          'Revisar las condiciones adjuntas al visado',
          'Condiciones como no further stay o prohibición de trabajar vienen codificadas en la concesión y se aplican con rigor.',
        ],
      },
      {
        en: [
          'Declare food, plant and animal products on arrival',
          'Australian biosecurity is unusually strict and undeclared items attract fines on the spot.',
        ],
        pt: [
          'Declarar produtos de origem animal e vegetal na chegada',
          'A biossegurança australiana é excepcionalmente rígida e itens não declarados geram multa na hora.',
        ],
        es: [
          'Declarar productos de origen animal y vegetal al llegar',
          'La bioseguridad australiana es excepcionalmente estricta y los artículos no declarados generan multas en el acto.',
        ],
      },
      {
        en: [
          'Do not overstay',
          'An overstay creates an exclusion period that blocks future Australian visas.',
        ],
        pt: [
          'Não ultrapassar o prazo de permanência',
          'O overstay gera um período de exclusão que bloqueia vistos australianos futuros.',
        ],
        es: [
          'No exceder el plazo de estancia',
          'La sobreestadía genera un periodo de exclusión que bloquea futuros visados australianos.',
        ],
        priority: 2,
      },
    ],
  },

  'Work & Skilled Migration Visas': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'For you and for every family member included in the application.',
        ],
        pt: [
          'Passaporte válido',
          'Para você e para cada familiar incluído no pedido.',
        ],
        es: [
          'Pasaporte vigente',
          'Para usted y para cada familiar incluido en la solicitud.',
        ],
      },
      {
        en: [
          'Expression of Interest in SkillSelect',
          'Points-tested subclasses start with an EOI and an invitation. You cannot lodge the visa until you are invited.',
        ],
        pt: [
          'Expression of Interest no SkillSelect',
          'As subclasses por pontos começam com uma EOI e um convite. Você não pode protocolar o visto antes de ser convidado.',
        ],
        es: [
          'Expression of Interest en SkillSelect',
          'Las subclases por puntos empiezan con una EOI y una invitación. No puede presentar el visado hasta ser invitado.',
        ],
      },
      {
        en: [
          'Nomination by an employer or a state',
          'Employer-sponsored and state-nominated subclasses need this before the visa stage.',
        ],
        pt: [
          'Nomeação por empregador ou por um estado',
          'Subclasses patrocinadas por empregador ou nomeadas por estado exigem isso antes da etapa do visto.',
        ],
        es: [
          'Nominación por un empleador o por un estado',
          'Las subclases patrocinadas por empleador o nominadas por un estado la exigen antes de la etapa del visado.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Police certificates for the character requirement',
          'From every country you lived in for twelve months or more over the last ten years. These take the longest to obtain — start early.',
        ],
        pt: [
          'Certidões de antecedentes para o requisito de character',
          'De todo país onde você morou doze meses ou mais nos últimos dez anos. São as que mais demoram a sair — comece cedo.',
        ],
        es: [
          'Certificados de antecedentes para el requisito de character',
          'De todo país donde haya vivido doce meses o más en los últimos diez años. Son los que más tardan: empiece pronto.',
        ],
      },
      {
        en: [
          'Identity and civil status documents',
          'Birth certificate, and marriage or divorce certificates where applicable.',
        ],
        pt: [
          'Documentos de identidade e estado civil',
          'Certidão de nascimento, e certidões de casamento ou divórcio quando aplicável.',
        ],
        es: [
          'Documentos de identidad y estado civil',
          'Partida de nacimiento, y certificados de matrimonio o divorcio cuando corresponda.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Positive skills assessment',
          'Issued by the assessing authority for your occupation. It is a separate process, with its own fee and its own months of waiting.',
        ],
        pt: [
          'Skills assessment positiva',
          'Emitida pela autoridade avaliadora da sua ocupação. É um processo à parte, com taxa própria e meses próprios de espera.',
        ],
        es: [
          'Skills assessment positiva',
          'La emite la autoridad evaluadora de su ocupación. Es un proceso aparte, con su propia tasa y sus propios meses de espera.',
        ],
      },
      {
        en: [
          'English test results',
          'IELTS, PTE or an accepted equivalent. The score does more than qualify you — it scores points on the test.',
        ],
        pt: [
          'Resultados de teste de inglês',
          'IELTS, PTE ou equivalente aceito. A nota faz mais que qualificar — ela pontua no teste de pontos.',
        ],
        es: [
          'Resultados de prueba de inglés',
          'IELTS, PTE o un equivalente aceptado. La puntuación hace más que calificar: suma puntos en el test.',
        ],
      },
      {
        en: [
          'Diplomas and academic transcripts',
          'Supporting both the skills assessment and the points claimed for qualifications.',
        ],
        pt: [
          'Diplomas e históricos escolares',
          'Sustentando tanto a skills assessment quanto os pontos reivindicados por qualificação.',
        ],
        es: [
          'Títulos y expedientes académicos',
          'Sustentan tanto la skills assessment como los puntos reclamados por titulación.',
        ],
      },
      {
        en: [
          'Employment reference letters',
          'Stating role, duties, hours and dates. Points for experience stand or fall on these.',
        ],
        pt: [
          'Cartas de referência profissional',
          'Com função, atribuições, carga horária e datas. Os pontos por experiência dependem inteiramente delas.',
        ],
        es: [
          'Cartas de referencia laboral',
          'Con puesto, funciones, jornada y fechas. Los puntos por experiencia dependen enteramente de ellas.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence of funds for settlement',
          'Not a formal threshold on most skilled subclasses, but you need enough to arrive and establish yourself.',
        ],
        pt: [
          'Comprovação de recursos para a instalação',
          'Não é um piso formal na maioria das subclasses qualificadas, mas é preciso ter o suficiente para chegar e se estabelecer.',
        ],
        es: [
          'Prueba de fondos para el asentamiento',
          'No es un umbral formal en la mayoría de las subclases cualificadas, pero necesita lo suficiente para llegar y establecerse.',
        ],
        required: false,
      },
      {
        en: [
          'Salary meeting the income threshold',
          'Employer-sponsored subclasses set a minimum salary that is indexed and reviewed periodically.',
        ],
        pt: [
          'Salário que atinge o piso de renda',
          'As subclasses patrocinadas por empregador fixam um salário mínimo indexado e revisado periodicamente.',
        ],
        es: [
          'Salario que alcanza el umbral de ingresos',
          'Las subclases patrocinadas por empleador fijan un salario mínimo indexado y revisado periódicamente.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Submit the EOI and wait for an invitation',
          'Invitation rounds run periodically and the cut-off score moves with demand for your occupation.',
        ],
        pt: [
          'Enviar a EOI e aguardar o convite',
          'As rodadas de convite acontecem periodicamente e a nota de corte se move com a demanda pela sua ocupação.',
        ],
        es: [
          'Enviar la EOI y esperar la invitación',
          'Las rondas de invitación son periódicas y la nota de corte se mueve con la demanda de su ocupación.',
        ],
      },
      {
        en: [
          'Lodge the visa within the invitation deadline',
          'The invitation lapses; missing it means going back into the pool.',
        ],
        pt: [
          'Protocolar o visto dentro do prazo do convite',
          'O convite caduca; perdê-lo significa voltar para o pool.',
        ],
        es: [
          'Presentar el visado dentro del plazo de la invitación',
          'La invitación caduca; perderla significa volver al pool.',
        ],
      },
      {
        en: [
          'Pay the visa application charge',
          'One of the highest in the world, and there is an additional charge for each family member.',
        ],
        pt: [
          'Pagar a visa application charge',
          'Uma das mais altas do mundo, e há cobrança adicional por familiar.',
        ],
        es: [
          'Pagar la visa application charge',
          'Una de las más altas del mundo, y hay un cargo adicional por cada familiar.',
        ],
      },
      {
        en: [
          'Attach the full evidence at lodgement',
          'A decision-ready application is processed far faster than one the case officer has to chase.',
        ],
        pt: [
          'Anexar toda a comprovação já no protocolo',
          'Um pedido decision-ready é analisado muito mais rápido que um em que o oficial precisa cobrar documentos.',
        ],
        es: [
          'Adjuntar toda la prueba ya al presentar',
          'Una solicitud decision-ready se tramita mucho más rápido que una en la que el oficial tenga que reclamar documentos.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Health examination with a panel physician',
          'For you and every family member, even those not travelling. Only clinics approved by the department may perform it.',
        ],
        pt: [
          'Exame de saúde com médico credenciado',
          'Para você e cada familiar, mesmo os que não viajam. Só clínicas aprovadas pelo departamento podem fazê-lo.',
        ],
        es: [
          'Examen de salud con médico acreditado',
          'Para usted y cada familiar, incluso los que no viajan. Solo clínicas aprobadas por el departamento pueden realizarlo.',
        ],
      },
      {
        en: [
          'Biometrics collection where required',
          'Depends on nationality and on where the application is lodged.',
        ],
        pt: [
          'Recolha de biometria quando exigida',
          'Depende da nacionalidade e de onde o pedido é protocolado.',
        ],
        es: [
          'Recogida de biometría cuando se exija',
          'Depende de la nacionalidad y de dónde se presente la solicitud.',
        ],
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Enter before the initial entry date',
          'The grant sets a first-entry deadline. Missing it can invalidate the visa.',
        ],
        pt: [
          'Entrar antes da initial entry date',
          'A concessão fixa um prazo de primeira entrada. Perdê-lo pode invalidar o visto.',
        ],
        es: [
          'Entrar antes de la initial entry date',
          'La concesión fija un plazo de primera entrada. Perderlo puede invalidar el visado.',
        ],
      },
      {
        en: [
          'Apply for a tax file number',
          'Without it your employer withholds at the top marginal rate.',
        ],
        pt: [
          'Solicitar o tax file number',
          'Sem ele o empregador retém na alíquota marginal máxima.',
        ],
        es: [
          'Solicitar el tax file number',
          'Sin él su empleador retiene al tipo marginal máximo.',
        ],
      },
      {
        en: [
          'Enrol in Medicare if the visa allows it',
          'Permanent visas give access; most temporary ones require private health cover instead.',
        ],
        pt: [
          'Inscrever-se no Medicare se o visto permitir',
          'Vistos permanentes dão acesso; a maioria dos temporários exige plano de saúde privado no lugar.',
        ],
        es: [
          'Inscribirse en Medicare si el visado lo permite',
          'Los visados permanentes dan acceso; la mayoría de los temporales exige seguro privado en su lugar.',
        ],
        priority: 2,
      },
      {
        en: [
          'Comply with any regional condition',
          'Regional subclasses require living and working in a designated area, and that compliance is what unlocks permanent residence later.',
        ],
        pt: [
          'Cumprir eventual condição regional',
          'Subclasses regionais exigem morar e trabalhar em área designada, e é esse cumprimento que destrava a residência permanente depois.',
        ],
        es: [
          'Cumplir cualquier condición regional',
          'Las subclases regionales exigen vivir y trabajar en un área designada, y ese cumplimiento es lo que desbloquea la residencia permanente después.',
        ],
      },
    ],
  },

  'Family, Partner & Dependent Visas': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'For the applicant and for any dependent children included.',
        ],
        pt: [
          'Passaporte válido',
          'Para o requerente e para os filhos dependentes incluídos.',
        ],
        es: [
          'Pasaporte vigente',
          'Para el solicitante y para los hijos dependientes incluidos.',
        ],
      },
      {
        en: [
          'Evidence of the relationship',
          'Marriage certificate, or evidence of a de facto relationship of at least twelve months unless it is registered.',
        ],
        pt: [
          'Comprovação do relacionamento',
          'Certidão de casamento, ou comprovação de união de facto de pelo menos doze meses, salvo se registada.',
        ],
        es: [
          'Prueba de la relación',
          'Certificado de matrimonio, o prueba de una relación de hecho de al menos doce meses, salvo que esté registrada.',
        ],
      },
      {
        en: [
          'Evidence across the four required aspects',
          'Australia assesses financial, household, social and commitment aspects. Missing one of the four weakens the whole case, so gather them deliberately.',
        ],
        pt: [
          'Comprovação nos quatro aspectos exigidos',
          'A Austrália avalia os aspectos financeiro, doméstico, social e de compromisso. Faltar um dos quatro enfraquece todo o caso, então junte-os de propósito.',
        ],
        es: [
          'Prueba en los cuatro aspectos exigidos',
          'Australia evalúa los aspectos financiero, doméstico, social y de compromiso. Que falte uno de los cuatro debilita todo el caso, así que reúnalos deliberadamente.',
        ],
      },
      {
        en: [
          'Sponsorship application by the partner',
          'The Australian citizen or permanent resident lodges their own sponsorship, which is assessed separately.',
        ],
        pt: [
          'Pedido de patrocínio pelo parceiro',
          'O cidadão ou residente permanente australiano protocola o próprio patrocínio, avaliado à parte.',
        ],
        es: [
          'Solicitud de patrocinio por la pareja',
          'El ciudadano o residente permanente australiano presenta su propio patrocinio, que se evalúa aparte.',
        ],
      },
      {
        en: [
          'Police certificates for the character requirement',
          'From every country lived in for twelve months or more over the last ten years, for both partners.',
        ],
        pt: [
          'Certidões de antecedentes para o requisito de character',
          'De todo país onde se morou doze meses ou mais nos últimos dez anos, para ambos os parceiros.',
        ],
        es: [
          'Certificados de antecedentes para el requisito de character',
          'De todo país donde se haya vivido doce meses o más en los últimos diez años, para ambos miembros de la pareja.',
        ],
      },
      {
        en: [
          'Statutory declarations from people who know you both',
          'Written by Australian citizens or permanent residents on the prescribed form.',
        ],
        pt: [
          'Declarações juramentadas de quem conhece o casal',
          'Escritas por cidadãos ou residentes permanentes australianos, no formulário prescrito.',
        ],
        es: [
          'Declaraciones juradas de quienes conocen a la pareja',
          'Escritas por ciudadanos o residentes permanentes australianos, en el formulario prescrito.',
        ],
        priority: 2,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence of shared finances',
          'Joint accounts, shared bills, property held together — the financial aspect of the relationship test.',
        ],
        pt: [
          'Comprovação de finanças compartilhadas',
          'Contas conjuntas, contas de consumo partilhadas, bens em comum — o aspecto financeiro do teste de relacionamento.',
        ],
        es: [
          'Prueba de finanzas compartidas',
          'Cuentas conjuntas, facturas compartidas, bienes en común: el aspecto financiero del test de relación.',
        ],
      },
      {
        en: [
          'Assurance of support where required',
          'Some family subclasses require a financial undertaking, sometimes backed by a bond.',
        ],
        pt: [
          'Assurance of support quando exigida',
          'Algumas subclasses familiares exigem um compromisso financeiro, por vezes garantido por caução.',
        ],
        es: [
          'Assurance of support cuando se exija',
          'Algunas subclases familiares exigen un compromiso financiero, a veces respaldado por una fianza.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Lodge the visa and the sponsorship in ImmiAccount',
          'Both are needed; a visa application without an approved sponsorship goes nowhere.',
        ],
        pt: [
          'Protocolar o visto e o patrocínio no ImmiAccount',
          'Os dois são necessários; pedido de visto sem patrocínio aprovado não avança.',
        ],
        es: [
          'Presentar el visado y el patrocinio en ImmiAccount',
          'Ambos son necesarios; una solicitud de visado sin patrocinio aprobado no avanza.',
        ],
      },
      {
        en: [
          'Pay the visa application charge',
          'The partner visa is among the most expensive anywhere, and the charge covers both the temporary and the permanent stage.',
        ],
        pt: [
          'Pagar a visa application charge',
          'O visto de parceiro está entre os mais caros do mundo, e a taxa cobre tanto a etapa temporária quanto a permanente.',
        ],
        es: [
          'Pagar la visa application charge',
          'El visado de pareja está entre los más caros del mundo, y la tasa cubre tanto la etapa temporal como la permanente.',
        ],
      },
      {
        en: [
          'Choose onshore or offshore lodgement carefully',
          'Where you lodge determines whether you may remain in Australia while it is decided, and you generally cannot switch afterwards.',
        ],
        pt: [
          'Escolher com cuidado entre protocolo onshore e offshore',
          'Onde você protocola define se pode permanecer na Austrália durante a análise, e em geral não dá para trocar depois.',
        ],
        es: [
          'Elegir con cuidado entre presentación onshore y offshore',
          'Dónde presenta determina si puede permanecer en Australia mientras se resuelve, y por lo general no se puede cambiar después.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Health examination with a panel physician',
          'For the applicant and every dependant included.',
        ],
        pt: [
          'Exame de saúde com médico credenciado',
          'Para o requerente e cada dependente incluído.',
        ],
        es: [
          'Examen de salud con médico acreditado',
          'Para el solicitante y cada dependiente incluido.',
        ],
      },
      {
        en: [
          'Biometrics collection where required',
          'Depends on nationality and lodgement location.',
        ],
        pt: [
          'Recolha de biometria quando exigida',
          'Depende da nacionalidade e do local de protocolo.',
        ],
        es: [
          'Recogida de biometría cuando se exija',
          'Depende de la nacionalidad y del lugar de presentación.',
        ],
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Receive the temporary partner visa first',
          'The permanent stage is assessed roughly two years after lodgement, not after grant.',
        ],
        pt: [
          'Receber primeiro o visto de parceiro temporário',
          'A etapa permanente é avaliada cerca de dois anos após o protocolo, não após a concessão.',
        ],
        es: [
          'Recibir primero el visado de pareja temporal',
          'La etapa permanente se evalúa unos dos años después de la presentación, no de la concesión.',
        ],
      },
      {
        en: [
          'Keep gathering relationship evidence after the grant',
          'The permanent stage asks for evidence covering the period since lodgement. Collecting it as you go is far easier than reconstructing it.',
        ],
        pt: [
          'Continuar juntando provas do relacionamento após a concessão',
          'A etapa permanente pede provas do período desde o protocolo. Juntá-las ao longo do caminho é muito mais fácil que reconstruí-las.',
        ],
        es: [
          'Seguir reuniendo pruebas de la relación tras la concesión',
          'La etapa permanente pide pruebas del periodo desde la presentación. Reunirlas sobre la marcha es mucho más fácil que reconstruirlas.',
        ],
      },
      {
        en: [
          'Report a change in the relationship',
          'A separation must be notified; concealing it has consequences for both partners.',
        ],
        pt: [
          'Comunicar mudanças no relacionamento',
          'Uma separação precisa ser comunicada; ocultá-la tem consequências para ambos os parceiros.',
        ],
        es: [
          'Comunicar cambios en la relación',
          'Una separación debe notificarse; ocultarla tiene consecuencias para ambos.',
        ],
      },
      {
        en: [
          'Apply for the permanent stage when eligible',
          'The department invites you; missing that window puts the whole pathway at risk.',
        ],
        pt: [
          'Pedir a etapa permanente quando elegível',
          'O departamento convida você; perder essa janela põe todo o caminho em risco.',
        ],
        es: [
          'Solicitar la etapa permanente cuando sea elegible',
          'El departamento le invita; perder esa ventana pone en riesgo todo el itinerario.',
        ],
        priority: 2,
      },
    ],
  },

  'Business, Investor & Permanent Residence Visas': {
    core_documents: [
      {
        en: ['Valid passport', 'For you and for every family member included.'],
        pt: ['Passaporte válido', 'Para você e para cada familiar incluído.'],
        es: ['Pasaporte vigente', 'Para usted y para cada familiar incluido.'],
      },
      {
        en: [
          'Check which programme is still open',
          'The business innovation and investment stream closed to new applicants and the department redirected the effort to an innovation-focused permanent visa. Confirm what is accepting applications before building a file.',
        ],
        pt: [
          'Verificar qual programa continua aberto',
          'A vertente de inovação e investimento empresarial fechou para novos pedidos e o departamento redirecionou o esforço para um visto permanente focado em inovação. Confirme o que está aceitando pedidos antes de montar um processo.',
        ],
        es: [
          'Comprobar qué programa sigue abierto',
          'La vía de innovación e inversión empresarial cerró a nuevos solicitantes y el departamento redirigió el esfuerzo a un visado permanente centrado en la innovación. Confirme qué está aceptando solicitudes antes de armar un expediente.',
        ],
      },
      {
        en: [
          'Nomination or endorsement, depending on the stream',
          'A state or territory nomination, or a nomination from a recognised organisation.',
        ],
        pt: [
          'Nomeação ou endosso, conforme a vertente',
          'Nomeação de um estado ou território, ou nomeação de uma organização reconhecida.',
        ],
        es: [
          'Nominación o aval, según la vía',
          'Nominación de un estado o territorio, o nominación de una organización reconocida.',
        ],
      },
      {
        en: [
          'Police certificates for the character requirement',
          'From every country lived in for twelve months or more over the last ten years.',
        ],
        pt: [
          'Certidões de antecedentes para o requisito de character',
          'De todo país onde se morou doze meses ou mais nos últimos dez anos.',
        ],
        es: [
          'Certificados de antecedentes para el requisito de character',
          'De todo país donde se haya vivido doce meses o más en los últimos diez años.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Evidence of an internationally recognised record',
          'For the innovation-focused route, the case rests on a track record of exceptional achievement in an eligible sector.',
        ],
        pt: [
          'Comprovação de trajetória reconhecida internacionalmente',
          'Na rota focada em inovação, o caso se apoia num histórico de realização excepcional num setor elegível.',
        ],
        es: [
          'Prueba de una trayectoria reconocida internacionalmente',
          'En la vía centrada en la innovación, el caso se apoya en un historial de logros excepcionales en un sector elegible.',
        ],
      },
      {
        en: [
          'Qualifications, patents, publications or awards',
          'Whatever objectively evidences standing in the field.',
        ],
        pt: [
          'Qualificações, patentes, publicações ou prêmios',
          'O que comprovar objetivamente a projeção na área.',
        ],
        es: [
          'Titulaciones, patentes, publicaciones o premios',
          'Lo que acredite objetivamente su posición en el campo.',
        ],
      },
      {
        en: [
          'English test results',
          'Or payment of the second instalment charge where functional English cannot be shown.',
        ],
        pt: [
          'Resultados de teste de inglês',
          'Ou pagamento da segunda parcela da taxa quando o inglês funcional não puder ser demonstrado.',
        ],
        es: [
          'Resultados de prueba de inglés',
          'O pago del segundo plazo de la tasa cuando no pueda demostrarse el inglés funcional.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence of net assets and business turnover',
          'The thresholds differ by stream; confirm the figures in force rather than relying on older guidance.',
        ],
        pt: [
          'Comprovação de patrimônio líquido e faturamento do negócio',
          'Os pisos variam conforme a vertente; confirme os valores em vigor em vez de confiar em orientação antiga.',
        ],
        es: [
          'Prueba de patrimonio neto y facturación del negocio',
          'Los umbrales varían según la vía; confirme las cifras vigentes en lugar de fiarse de guías antiguas.',
        ],
      },
      {
        en: [
          'Lawful source of funds',
          'Tax returns, audited accounts and bank records tracing where the capital came from.',
        ],
        pt: [
          'Origem lícita dos recursos',
          'Declarações de imposto, demonstrações auditadas e extratos rastreando de onde veio o capital.',
        ],
        es: [
          'Origen lícito de los fondos',
          'Declaraciones de impuestos, cuentas auditadas y extractos que rastreen de dónde vino el capital.',
        ],
      },
      {
        en: [
          'Business ownership and management evidence',
          'Company registrations, shareholding structure and financial statements for the relevant years.',
        ],
        pt: [
          'Comprovação de propriedade e gestão do negócio',
          'Registos societários, estrutura acionária e demonstrações financeiras dos anos relevantes.',
        ],
        es: [
          'Prueba de propiedad y gestión del negocio',
          'Registros societarios, estructura accionarial y estados financieros de los años relevantes.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Submit an Expression of Interest',
          'Both the business and the innovation routes begin with an EOI and require an invitation to proceed.',
        ],
        pt: [
          'Enviar uma Expression of Interest',
          'Tanto a rota de negócios quanto a de inovação começam com uma EOI e exigem convite para seguir.',
        ],
        es: [
          'Enviar una Expression of Interest',
          'Tanto la vía de negocios como la de innovación empiezan con una EOI y exigen invitación para continuar.',
        ],
      },
      {
        en: [
          'Lodge the visa in ImmiAccount after invitation',
          'With the full financial and business evidence attached.',
        ],
        pt: [
          'Protocolar o visto no ImmiAccount após o convite',
          'Com toda a comprovação financeira e empresarial anexada.',
        ],
        es: [
          'Presentar el visado en ImmiAccount tras la invitación',
          'Con toda la prueba financiera y empresarial adjunta.',
        ],
      },
      {
        en: [
          'Pay the visa application charge',
          'Among the highest of any Australian visa, plus a charge for each family member.',
        ],
        pt: [
          'Pagar a visa application charge',
          'Entre as mais altas de qualquer visto australiano, mais cobrança por familiar.',
        ],
        es: [
          'Pagar la visa application charge',
          'Entre las más altas de cualquier visado australiano, más un cargo por cada familiar.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Health examination with a panel physician',
          'For every applicant, including family members not travelling.',
        ],
        pt: [
          'Exame de saúde com médico credenciado',
          'Para cada requerente, inclusive familiares que não viajam.',
        ],
        es: [
          'Examen de salud con médico acreditado',
          'Para cada solicitante, incluidos los familiares que no viajan.',
        ],
      },
      {
        en: [
          'Biometrics collection where required',
          'Depends on nationality and lodgement location.',
        ],
        pt: [
          'Recolha de biometria quando exigida',
          'Depende da nacionalidade e do local de protocolo.',
        ],
        es: [
          'Recogida de biometría cuando se exija',
          'Depende de la nacionalidad y del lugar de presentación.',
        ],
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Enter before the initial entry date',
          'The grant sets a first-entry deadline for every person included.',
        ],
        pt: [
          'Entrar antes da initial entry date',
          'A concessão fixa um prazo de primeira entrada para cada pessoa incluída.',
        ],
        es: [
          'Entrar antes de la initial entry date',
          'La concesión fija un plazo de primera entrada para cada persona incluida.',
        ],
      },
      {
        en: [
          'Meet the business or investment commitments made',
          'On the provisional streams, the permanent stage depends on having actually done what you undertook to do.',
        ],
        pt: [
          'Cumprir os compromissos de negócio ou investimento assumidos',
          'Nas vertentes provisórias, a etapa permanente depende de você ter de fato feito o que se comprometeu a fazer.',
        ],
        es: [
          'Cumplir los compromisos de negocio o inversión asumidos',
          'En las vías provisionales, la etapa permanente depende de haber hecho realmente lo que se comprometió a hacer.',
        ],
      },
      {
        en: [
          'Enrol in Medicare',
          'Permanent visa holders are eligible from arrival.',
        ],
        pt: [
          'Inscrever-se no Medicare',
          'Titulares de visto permanente são elegíveis desde a chegada.',
        ],
        es: [
          'Inscribirse en Medicare',
          'Los titulares de visado permanente son elegibles desde la llegada.',
        ],
      },
      {
        en: [
          'Watch the travel facility on the permanent visa',
          'Permanent residence carries a five-year travel facility; after that a resident return visa is needed to re-enter.',
        ],
        pt: [
          'Atentar para a travel facility do visto permanente',
          'A residência permanente traz uma travel facility de cinco anos; depois disso é preciso um resident return visa para reentrar.',
        ],
        es: [
          'Vigilar la travel facility del visado permanente',
          'La residencia permanente lleva una travel facility de cinco años; después hace falta un resident return visa para reentrar.',
        ],
        priority: 2,
      },
      {
        en: [
          'Count the years towards citizenship',
          'Four years of lawful residence, the last twelve months as a permanent resident.',
        ],
        pt: [
          'Contar os anos para a cidadania',
          'Quatro anos de residência legal, sendo os últimos doze meses como residente permanente.',
        ],
        es: [
          'Contar los años para la ciudadanía',
          'Cuatro años de residencia legal, siendo los últimos doce meses como residente permanente.',
        ],
        priority: 3,
        required: false,
      },
    ],
  },
};
