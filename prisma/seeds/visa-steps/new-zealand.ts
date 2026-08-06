import type { CountryVisaSteps } from './types';

/**
 * Steps for New Zealand.
 *
 * Everything is lodged through an Immigration Online account and every visa is
 * digital — there is no label in the passport.
 *
 * The employer-assisted work route runs in three stages that have to happen in
 * order: the employer gets accredited, the specific job passes a check, and
 * only then does the person apply. Someone with a job offer from an
 * unaccredited employer has nothing yet, and that is the most common
 * misunderstanding here.
 */
export const newZealand: CountryVisaSteps = {
  'Visitor Visa / NZeTA (Electronic Travel Authority)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Valid for at least three months beyond your intended departure. The visa is linked electronically to it.',
        ],
        pt: [
          'Passaporte válido',
          'Válido por pelo menos três meses além da saída prevista. O visto fica vinculado eletronicamente a ele.',
        ],
        es: [
          'Pasaporte vigente',
          'Vigente al menos tres meses más allá de la salida prevista. El visado queda vinculado electrónicamente a él.',
        ],
      },
      {
        en: [
          'Check whether you need the NZeTA or a full visitor visa',
          'Visa-waiver nationals request the NZeTA, which is cheap and quick; everyone else lodges a visitor visa. Applying under the wrong one wastes the fee.',
        ],
        pt: [
          'Verificar se você precisa da NZeTA ou do visto de visitante completo',
          'Nacionalidades isentas pedem a NZeTA, barata e rápida; as demais protocolam visto de visitante. Pedir no caminho errado desperdiça a taxa.',
        ],
        es: [
          'Comprobar si necesita la NZeTA o un visado de visitante completo',
          'Las nacionalidades exentas piden la NZeTA, barata y rápida; las demás presentan un visado de visitante. Solicitar por la vía equivocada desperdicia la tasa.',
        ],
      },
      {
        en: [
          'Immigration Online account application',
          'Everything is lodged and tracked online; there is no paper form.',
        ],
        pt: [
          'Pedido na conta do Immigration Online',
          'Tudo é protocolado e acompanhado online; não existe formulário em papel.',
        ],
        es: [
          'Solicitud en la cuenta de Immigration Online',
          'Todo se presenta y se sigue en línea; no existe formulario en papel.',
        ],
      },
      {
        en: [
          'Travel itinerary and accommodation',
          'Flights and where you will stay, matching the dates declared.',
        ],
        pt: [
          'Itinerário e alojamento',
          'Voos e onde vai ficar, coerentes com as datas declaradas.',
        ],
        es: [
          'Itinerario y alojamiento',
          'Vuelos y dónde se alojará, coherentes con las fechas declaradas.',
        ],
      },
      {
        en: [
          'Evidence of ties to your home country',
          'Employment, studies, property or dependants — what shows you are a genuine visitor who will leave.',
        ],
        pt: [
          'Comprovação de vínculos com seu país',
          'Emprego, estudos, imóveis ou dependentes — o que mostra que você é visitante genuíno e vai sair.',
        ],
        es: [
          'Prueba de arraigo en su país',
          'Empleo, estudios, propiedades o dependientes: lo que demuestra que es un visitante genuino y se marchará.',
        ],
      },
      {
        en: [
          'Onward or return ticket',
          'Or evidence you can buy one; officers do check this on arrival.',
        ],
        pt: [
          'Bilhete de volta ou de continuação',
          'Ou comprovação de que você consegue comprá-lo; os oficiais conferem isso na chegada.',
        ],
        es: [
          'Billete de vuelta o de continuación',
          'O prueba de que puede comprarlo; los oficiales lo comprueban a la llegada.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of funds for the stay',
          'A monthly amount per person, lower if your accommodation is already paid for.',
        ],
        pt: [
          'Comprovação de recursos para a estada',
          'Um valor mensal por pessoa, menor se o alojamento já estiver pago.',
        ],
        es: [
          'Prueba de fondos para la estancia',
          'Un importe mensual por persona, menor si el alojamiento ya está pagado.',
        ],
      },
      {
        en: [
          'Bank statements from the last three to six months',
          'Consistent with the trip described, not a balance that appeared last week.',
        ],
        pt: [
          'Extratos bancários dos últimos três a seis meses',
          'Coerentes com a viagem descrita, não um saldo que apareceu na semana passada.',
        ],
        es: [
          'Extractos bancarios de los últimos tres a seis meses',
          'Coherentes con el viaje descrito, no un saldo que apareció la semana pasada.',
        ],
      },
      {
        en: [
          'Sponsorship form if someone else funds the trip',
          'A New Zealand sponsor completes the prescribed form and shows their own means.',
        ],
        pt: [
          'Formulário de patrocínio se outra pessoa custeia a viagem',
          'Um patrocinador na Nova Zelândia preenche o formulário próprio e comprova os recursos dele.',
        ],
        es: [
          'Formulario de patrocinio si otra persona financia el viaje',
          'Un patrocinador en Nueva Zelanda completa el formulario prescrito y acredita sus propios medios.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Lodge the request online',
          'The NZeTA is requested through its own app or website, not through the main visa portal.',
        ],
        pt: [
          'Protocolar o pedido online',
          'A NZeTA é pedida por aplicativo ou site próprio, não pelo portal principal de vistos.',
        ],
        es: [
          'Presentar la solicitud en línea',
          'La NZeTA se pide por su propia aplicación o sitio, no por el portal principal de visados.',
        ],
      },
      {
        en: [
          'Pay the visa fee and the visitor levy',
          'The conservation and tourism levy is charged on top of the application and is a separate line.',
        ],
        pt: [
          'Pagar a taxa do visto e a taxa de visitante',
          'A taxa de conservação e turismo é cobrada por cima do pedido e é uma linha separada.',
        ],
        es: [
          'Pagar la tasa del visado y la tasa de visitante',
          'La tasa de conservación y turismo se cobra aparte de la solicitud y es una línea separada.',
        ],
      },
      {
        en: [
          'Upload the supporting documents',
          'Attach everything at lodgement; a decision may be made without asking for more.',
        ],
        pt: [
          'Anexar os documentos de suporte',
          'Anexe tudo já no protocolo; a decisão pode sair sem que peçam mais nada.',
        ],
        es: [
          'Adjuntar los documentos de apoyo',
          'Adjunte todo ya al presentar; la decisión puede salir sin pedir nada más.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Chest x-ray or medical certificate',
          'Required for stays over six months, or from certain countries. Not usual for a short holiday.',
        ],
        pt: [
          'Raio-X de tórax ou certificado médico',
          'Exigido em estadas acima de seis meses, ou vindas de certos países. Não é usual em férias curtas.',
        ],
        es: [
          'Radiografía de tórax o certificado médico',
          'Exigido en estancias de más de seis meses, o desde ciertos países. No es habitual en unas vacaciones cortas.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Travel medical insurance',
          'Not a formal requirement for visitors, but there is no public cover for you and treatment is expensive.',
        ],
        pt: [
          'Seguro médico de viagem',
          'Não é exigência formal para visitantes, mas não há cobertura pública para você e o atendimento é caro.',
        ],
        es: [
          'Seguro médico de viaje',
          'No es un requisito formal para visitantes, pero no hay cobertura pública para usted y la atención es cara.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Save the approval notification',
          'There is no label in the passport; the electronic record is your proof.',
        ],
        pt: [
          'Guardar a notificação de aprovação',
          'Não há etiqueta no passaporte; o registo eletrônico é a sua prova.',
        ],
        es: [
          'Guardar la notificación de aprobación',
          'No hay etiqueta en el pasaporte; el registro electrónico es su prueba.',
        ],
      },
      {
        en: [
          'Complete the traveller declaration before arriving',
          'Submitted online in the days before the flight; it covers both customs and biosecurity.',
        ],
        pt: [
          'Preencher a declaração de viajante antes de chegar',
          'Enviada online nos dias anteriores ao voo; cobre alfândega e biossegurança.',
        ],
        es: [
          'Completar la declaración de viajero antes de llegar',
          'Se envía en línea en los días previos al vuelo; cubre aduana y bioseguridad.',
        ],
      },
      {
        en: [
          'Declare all food, plant and animal products',
          'New Zealand biosecurity is among the strictest anywhere and undeclared items attract an instant fine.',
        ],
        pt: [
          'Declarar todos os produtos de origem animal e vegetal',
          'A biossegurança neozelandesa está entre as mais rígidas do mundo e itens não declarados geram multa imediata.',
        ],
        es: [
          'Declarar todos los productos de origen animal y vegetal',
          'La bioseguridad neozelandesa está entre las más estrictas del mundo y los artículos no declarados generan multa inmediata.',
        ],
      },
      {
        en: [
          'Do not work on a visitor visa',
          'Limited business meetings are allowed, but paid work is not, under any arrangement.',
        ],
        pt: [
          'Não trabalhar com visto de visitante',
          'Reuniões de negócios limitadas são permitidas, mas trabalho remunerado não é, sob nenhum arranjo.',
        ],
        es: [
          'No trabajar con visado de visitante',
          'Se permiten reuniones de negocios limitadas, pero el trabajo remunerado no, bajo ningún acuerdo.',
        ],
        priority: 2,
      },
    ],
  },

  'Work Visas (including Working Holiday)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'The visa is never granted for longer than the passport validity.',
        ],
        pt: [
          'Passaporte válido',
          'O visto nunca é concedido por prazo maior que a validade do passaporte.',
        ],
        es: [
          'Pasaporte vigente',
          'El visado nunca se concede por más tiempo que la vigencia del pasaporte.',
        ],
      },
      {
        en: [
          'Job offer from an accredited employer',
          'On the employer-assisted route the company must already hold accreditation. An offer from an unaccredited employer is not yet a basis for anything.',
        ],
        pt: [
          'Oferta de emprego de empregador credenciado',
          'Na rota assistida por empregador, a empresa já precisa ter o credenciamento. Oferta de empregador não credenciado ainda não serve de base para nada.',
        ],
        es: [
          'Oferta de empleo de un empleador acreditado',
          'En la vía asistida por empleador, la empresa ya debe tener la acreditación. Una oferta de un empleador no acreditado todavía no sirve de base para nada.',
        ],
      },
      {
        en: [
          'Job check approval for the specific role',
          'The second stage: the employer has that particular vacancy approved before you may apply.',
        ],
        pt: [
          'Aprovação do job check para a vaga específica',
          'A segunda etapa: o empregador tem aquela vaga em particular aprovada antes de você poder pedir.',
        ],
        es: [
          'Aprobación del job check para el puesto concreto',
          'La segunda etapa: el empleador tiene esa vacante en concreto aprobada antes de que usted pueda solicitar.',
        ],
      },
      {
        en: [
          'Police certificates',
          'From your country of citizenship and anywhere you lived twelve months or more, for stays over twenty-four months.',
        ],
        pt: [
          'Certidões de antecedentes criminais',
          'Do país de cidadania e de onde tenha morado doze meses ou mais, para estadas acima de vinte e quatro meses.',
        ],
        es: [
          'Certificados de antecedentes penales',
          'Del país de ciudadanía y de donde haya vivido doce meses o más, para estancias superiores a veinticuatro meses.',
        ],
      },
      {
        en: [
          'Working holiday scheme confirmation',
          'A separate route with an age limit, a national quota and a once-in-a-lifetime rule. It does not need an employer.',
        ],
        pt: [
          'Confirmação do programa de working holiday',
          'É uma rota à parte, com limite de idade, cota por país e regra de uma vez na vida. Não exige empregador.',
        ],
        es: [
          'Confirmación del programa de working holiday',
          'Es una vía aparte, con límite de edad, cupo por país y regla de una sola vez en la vida. No exige empleador.',
        ],
        priority: 2,
        required: false,
      },
    ],
    education: [
      {
        en: [
          'Qualifications and work experience for the role',
          'Diplomas and reference letters supporting the occupation and pay band claimed.',
        ],
        pt: [
          'Qualificações e experiência para a função',
          'Diplomas e cartas de referência que sustentam a ocupação e a faixa salarial declarada.',
        ],
        es: [
          'Cualificaciones y experiencia para el puesto',
          'Títulos y cartas de referencia que respalden la ocupación y la banda salarial declarada.',
        ],
      },
      {
        en: [
          'Occupational registration where required',
          'Nursing, teaching, engineering and the trades need New Zealand registration before you may practise.',
        ],
        pt: [
          'Registo ocupacional quando exigido',
          'Enfermagem, ensino, engenharia e ofícios técnicos exigem registo neozelandês antes do exercício.',
        ],
        es: [
          'Registro ocupacional cuando se exija',
          'Enfermería, enseñanza, ingeniería y los oficios exigen registro neozelandés antes de ejercer.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'English language evidence',
          'Required on some work routes; an accepted test, or evidence of study or work in an English-speaking country.',
        ],
        pt: [
          'Comprovação de inglês',
          'Exigida em algumas rotas de trabalho; teste aceito, ou comprovação de estudo ou trabalho em país anglófono.',
        ],
        es: [
          'Prueba de inglés',
          'Exigida en algunas vías de trabajo; un examen aceptado, o prueba de estudio o trabajo en un país anglófono.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Salary at or above the required rate',
          'Several work routes tie the visa, and the pathway to residence, to the pay rate. Confirm the rate in force.',
        ],
        pt: [
          'Salário igual ou acima da taxa exigida',
          'Várias rotas de trabalho vinculam o visto, e o caminho para a residência, à taxa salarial. Confirme a taxa em vigor.',
        ],
        es: [
          'Salario igual o superior a la tasa exigida',
          'Varias vías de trabajo vinculan el visado, y el camino a la residencia, a la tasa salarial. Confirme la tasa vigente.',
        ],
      },
      {
        en: [
          'Proof of funds for the working holiday route',
          'A set amount to support yourself on arrival, since you have no job lined up.',
        ],
        pt: [
          'Comprovação de recursos na rota de working holiday',
          'Um valor determinado para se sustentar ao chegar, já que você não tem emprego arranjado.',
        ],
        es: [
          'Prueba de fondos en la vía de working holiday',
          'Un importe determinado para mantenerse al llegar, ya que no tiene empleo concertado.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Confirm the employer accreditation and job check are done',
          'These two stages are the employer’s, and they take weeks. Your application cannot start before both are complete.',
        ],
        pt: [
          'Confirmar que o credenciamento e o job check estão feitos',
          'Essas duas etapas são do empregador e levam semanas. Seu pedido não pode começar antes de as duas estarem concluídas.',
        ],
        es: [
          'Confirmar que la acreditación y el job check están hechos',
          'Esas dos etapas son del empleador y llevan semanas. Su solicitud no puede empezar antes de que ambas estén completas.',
        ],
      },
      {
        en: [
          'Lodge the visa in Immigration Online',
          'With the job check reference number from the employer.',
        ],
        pt: [
          'Protocolar o visto no Immigration Online',
          'Com o número de referência do job check fornecido pelo empregador.',
        ],
        es: [
          'Presentar el visado en Immigration Online',
          'Con el número de referencia del job check que facilita el empleador.',
        ],
      },
      {
        en: [
          'Pay the visa fee and the levy',
          'Both charged at lodgement and neither refunded if the application is declined.',
        ],
        pt: [
          'Pagar a taxa do visto e a levy',
          'Ambas cobradas no protocolo e nenhuma devolvida se o pedido for indeferido.',
        ],
        es: [
          'Pagar la tasa del visado y la levy',
          'Ambas se cobran al presentar y ninguna se devuelve si deniegan la solicitud.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical examination and chest x-ray',
          'Required for stays over twelve months, with a panel physician. Valid for three years once done.',
        ],
        pt: [
          'Exame médico e raio-X de tórax',
          'Exigidos em estadas acima de doze meses, com médico credenciado. Valem três anos depois de feitos.',
        ],
        es: [
          'Examen médico y radiografía de tórax',
          'Exigidos en estancias de más de doce meses, con médico acreditado. Valen tres años una vez hechos.',
        ],
      },
      {
        en: [
          'Health insurance for the working holiday route',
          'Compulsory on that scheme, covering the whole period including repatriation.',
        ],
        pt: [
          'Seguro de saúde na rota de working holiday',
          'Obrigatório nesse programa, cobrindo todo o período, inclusive repatriamento.',
        ],
        es: [
          'Seguro de salud en la vía de working holiday',
          'Obligatorio en ese programa, cubriendo todo el periodo, incluida la repatriación.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Check the conditions on the visa',
          'Employer-assisted visas name the employer, the role and the region. Working outside those terms breaches the visa.',
        ],
        pt: [
          'Conferir as condições do visto',
          'Vistos assistidos por empregador nomeiam empregador, função e região. Trabalhar fora desses termos viola o visto.',
        ],
        es: [
          'Revisar las condiciones del visado',
          'Los visados asistidos por empleador nombran al empleador, el puesto y la región. Trabajar fuera de esos términos incumple el visado.',
        ],
      },
      {
        en: [
          'Apply for an IRD number',
          'Without it you are taxed at the highest rate from the first payslip.',
        ],
        pt: [
          'Solicitar o número IRD',
          'Sem ele você é tributado na alíquota máxima já no primeiro holerite.',
        ],
        es: [
          'Solicitar el número IRD',
          'Sin él tributa al tipo máximo desde la primera nómina.',
        ],
      },
      {
        en: [
          'Enrol with a doctor and check your health cover',
          'Work visa holders on longer visas get publicly funded care; shorter ones do not.',
        ],
        pt: [
          'Inscrever-se num médico e conferir sua cobertura de saúde',
          'Titulares de vistos de trabalho mais longos têm atendimento público; os mais curtos não.',
        ],
        es: [
          'Inscribirse con un médico y comprobar su cobertura sanitaria',
          'Los titulares de visados de trabajo más largos tienen atención pública; los más cortos no.',
        ],
        priority: 2,
      },
      {
        en: [
          'Apply for a new visa before changing employer',
          'The employer-assisted visa does not transfer; a new employer needs their own accreditation and job check.',
        ],
        pt: [
          'Pedir novo visto antes de trocar de empregador',
          'O visto assistido por empregador não é transferível; um novo empregador precisa do próprio credenciamento e job check.',
        ],
        es: [
          'Solicitar un nuevo visado antes de cambiar de empleador',
          'El visado asistido por empleador no se transfiere; un nuevo empleador necesita su propia acreditación y job check.',
        ],
      },
    ],
  },

  'Student Visa': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Should cover the course period plus the extra months the visa grants.',
        ],
        pt: [
          'Passaporte válido',
          'Deve cobrir o período do curso mais os meses extras que o visto concede.',
        ],
        es: [
          'Pasaporte vigente',
          'Debe cubrir el periodo del curso más los meses extra que concede el visado.',
        ],
      },
      {
        en: [
          'Offer of place from an approved provider',
          'The institution must be approved by the education authority; a course at an unapproved provider does not support a visa.',
        ],
        pt: [
          'Carta de oferta de vaga de instituição aprovada',
          'A instituição precisa ser aprovada pela autoridade de ensino; curso em instituição não aprovada não sustenta visto.',
        ],
        es: [
          'Carta de oferta de plaza de una institución aprobada',
          'La institución debe estar aprobada por la autoridad educativa; un curso en una institución no aprobada no sustenta un visado.',
        ],
      },
      {
        en: [
          'Receipt for the tuition paid',
          'Fees are normally paid before the visa is granted, into the provider’s account.',
        ],
        pt: [
          'Comprovante do pagamento da mensalidade',
          'As taxas costumam ser pagas antes de o visto ser concedido, na conta da instituição.',
        ],
        es: [
          'Comprobante del pago de la matrícula',
          'Las tasas suelen pagarse antes de conceder el visado, en la cuenta de la institución.',
        ],
      },
      {
        en: [
          'Immigration Online account application',
          'Lodged and tracked entirely online.',
        ],
        pt: [
          'Pedido na conta do Immigration Online',
          'Protocolado e acompanhado inteiramente online.',
        ],
        es: [
          'Solicitud en la cuenta de Immigration Online',
          'Se presenta y se sigue enteramente en línea.',
        ],
      },
      {
        en: [
          'Guardianship and accommodation arrangements',
          'For students under 18, with the provider confirming the arrangements.',
        ],
        pt: [
          'Arranjos de tutela e alojamento',
          'Para estudantes menores de 18 anos, com a instituição confirmando os arranjos.',
        ],
        es: [
          'Arreglos de tutela y alojamiento',
          'Para estudiantes menores de 18 años, con la institución confirmando los arreglos.',
        ],
        priority: 3,
        required: false,
      },
    ],
    education: [
      {
        en: [
          'Academic transcripts and diplomas',
          'The studies that qualified you for the offer of place.',
        ],
        pt: [
          'Históricos escolares e diplomas',
          'Os estudos que qualificaram você para a oferta de vaga.',
        ],
        es: [
          'Expedientes académicos y diplomas',
          'Los estudios que le cualificaron para la oferta de plaza.',
        ],
      },
      {
        en: [
          'English language evidence',
          'The level is set by the provider and by the level of the course.',
        ],
        pt: [
          'Comprovação de inglês',
          'O nível é definido pela instituição e pelo nível do curso.',
        ],
        es: [
          'Prueba de inglés',
          'El nivel lo fija la institución y el nivel del curso.',
        ],
      },
      {
        en: [
          'Statement of your study plan',
          'Why this course, why New Zealand, and what you intend to do afterwards. The genuine intent assessment turns on this.',
        ],
        pt: [
          'Declaração do seu plano de estudos',
          'Por que este curso, por que a Nova Zelândia e o que pretende fazer depois. A avaliação de intenção genuína gira em torno disso.',
        ],
        es: [
          'Declaración de su plan de estudios',
          'Por qué este curso, por qué Nueva Zelanda y qué pretende hacer después. La evaluación de intención genuina gira en torno a esto.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of living costs for the study period',
          'An annual amount over and above the tuition already paid.',
        ],
        pt: [
          'Comprovação de custo de vida para o período de estudo',
          'Um valor anual além da mensalidade já paga.',
        ],
        es: [
          'Prueba de coste de vida para el periodo de estudio',
          'Un importe anual además de la matrícula ya pagada.',
        ],
      },
      {
        en: [
          'Evidence of the return airfare',
          'Either a ticket or extra funds set aside to buy one.',
        ],
        pt: [
          'Comprovação da passagem de volta',
          'Um bilhete, ou recursos extras reservados para comprá-lo.',
        ],
        es: [
          'Prueba del billete de vuelta',
          'Un billete, o fondos extra reservados para comprarlo.',
        ],
      },
      {
        en: [
          'Financial undertaking from a sponsor',
          'If family funds you, their documents and a formal undertaking.',
        ],
        pt: [
          'Compromisso financeiro de um patrocinador',
          'Se a família custeia, os documentos dela e um compromisso formal.',
        ],
        es: [
          'Compromiso financiero de un patrocinador',
          'Si la familia le costea, sus documentos y un compromiso formal.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Lodge the student visa in Immigration Online',
          'Apply well before the course starts; processing varies with the season.',
        ],
        pt: [
          'Protocolar o visto de estudante no Immigration Online',
          'Peça bem antes do início do curso; a análise varia conforme a época do ano.',
        ],
        es: [
          'Presentar el visado de estudiante en Immigration Online',
          'Solicite bastante antes del inicio del curso; la tramitación varía según la temporada.',
        ],
      },
      {
        en: ['Pay the visa fee and the levy', 'Both charged at lodgement.'],
        pt: ['Pagar a taxa do visto e a levy', 'Ambas cobradas no protocolo.'],
        es: [
          'Pagar la tasa del visado y la levy',
          'Ambas se cobran al presentar.',
        ],
      },
      {
        en: [
          'Upload all supporting documents',
          'A complete application is decided far faster than one that needs chasing.',
        ],
        pt: [
          'Anexar todos os documentos de suporte',
          'Um pedido completo é decidido muito mais rápido que um que precisa ser cobrado.',
        ],
        es: [
          'Adjuntar todos los documentos de apoyo',
          'Una solicitud completa se resuelve mucho más rápido que una que hay que reclamar.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical examination and chest x-ray',
          'Required for courses over twelve months, with a panel physician.',
        ],
        pt: [
          'Exame médico e raio-X de tórax',
          'Exigidos em cursos acima de doze meses, com médico credenciado.',
        ],
        es: [
          'Examen médico y radiografía de tórax',
          'Exigidos en cursos de más de doce meses, con médico acreditado.',
        ],
      },
      {
        en: [
          'Health and travel insurance',
          'Compulsory for the whole period of study and checked by the provider at enrolment.',
        ],
        pt: [
          'Seguro de saúde e viagem',
          'Obrigatório por todo o período de estudo e conferido pela instituição na matrícula.',
        ],
        es: [
          'Seguro de salud y viaje',
          'Obligatorio durante todo el periodo de estudio y comprobado por la institución en la matrícula.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Enrol with the provider on arrival',
          'The provider reports enrolment; not turning up ends the basis of the visa.',
        ],
        pt: [
          'Fazer a matrícula na instituição ao chegar',
          'A instituição reporta a matrícula; não comparecer encerra a base do visto.',
        ],
        es: [
          'Matricularse en la institución al llegar',
          'La institución informa de la matrícula; no presentarse acaba con la base del visado.',
        ],
      },
      {
        en: [
          'Respect the limit on working hours',
          'Term-time work is capped and depends on the level of the course; some courses allow none.',
        ],
        pt: [
          'Respeitar o limite de horas de trabalho',
          'O trabalho no período letivo tem teto e depende do nível do curso; alguns cursos não permitem nenhum.',
        ],
        es: [
          'Respetar el límite de horas de trabajo',
          'El trabajo en periodo lectivo tiene tope y depende del nivel del curso; algunos cursos no permiten ninguno.',
        ],
      },
      {
        en: [
          'Apply for an IRD number before working',
          'Required even for part-time student work.',
        ],
        pt: [
          'Solicitar o número IRD antes de trabalhar',
          'Exigido mesmo para trabalho estudantil de meio período.',
        ],
        es: [
          'Solicitar el número IRD antes de trabajar',
          'Exigido incluso para el trabajo estudiantil a tiempo parcial.',
        ],
      },
      {
        en: [
          'Consider the post-study work visa before the visa ends',
          'It allows staying on to work after graduating, and eligibility depends on the level and length of the qualification.',
        ],
        pt: [
          'Avaliar o visto de trabalho pós-estudo antes do fim do visto',
          'Ele permite ficar trabalhando após a formatura, e a elegibilidade depende do nível e da duração da qualificação.',
        ],
        es: [
          'Evaluar el visado de trabajo post-estudio antes de que acabe el visado',
          'Permite quedarse a trabajar tras graduarse, y la elegibilidad depende del nivel y la duración de la titulación.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },

  'Resident Visa / Permanent Residence Pathway': {
    core_documents: [
      {
        en: ['Valid passport', 'For you and for every family member included.'],
        pt: ['Passaporte válido', 'Para você e para cada familiar incluído.'],
        es: ['Pasaporte vigente', 'Para usted y para cada familiar incluido.'],
      },
      {
        en: [
          'Expression of Interest under the skilled category',
          'Selected from the pool once you meet the points threshold. You cannot lodge the residence application before being invited.',
        ],
        pt: [
          'Expression of Interest na categoria qualificada',
          'Selecionada do pool quando você atinge o limiar de pontos. Não dá para protocolar o pedido de residência antes de ser convidado.',
        ],
        es: [
          'Expression of Interest en la categoría cualificada',
          'Se selecciona del pool cuando alcanza el umbral de puntos. No puede presentar la solicitud de residencia antes de ser invitado.',
        ],
      },
      {
        en: [
          'Check whether your occupation is on the Green List',
          'Some roles have a straight-to-residence pathway that skips the points route entirely, which is much faster.',
        ],
        pt: [
          'Verificar se sua ocupação está na Green List',
          'Algumas funções têm caminho direto para a residência, que pula inteiramente a rota de pontos e é bem mais rápido.',
        ],
        es: [
          'Comprobar si su ocupación está en la Green List',
          'Algunos puestos tienen una vía directa a la residencia que se salta por completo la ruta de puntos, y es mucho más rápida.',
        ],
      },
      {
        en: [
          'Police certificates',
          'From your country of citizenship and anywhere you lived twelve months or more since turning 17.',
        ],
        pt: [
          'Certidões de antecedentes criminais',
          'Do país de cidadania e de onde tenha morado doze meses ou mais desde os 17 anos.',
        ],
        es: [
          'Certificados de antecedentes penales',
          'Del país de ciudadanía y de donde haya vivido doce meses o más desde los 17 años.',
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
          'Qualification recognised for the points claimed',
          'Assessed against the New Zealand framework where the qualification is not on the exempt list.',
        ],
        pt: [
          'Qualificação reconhecida para os pontos reivindicados',
          'Avaliada contra o quadro neozelandês quando a qualificação não está na lista de isenções.',
        ],
        es: [
          'Titulación reconocida para los puntos reclamados',
          'Se evalúa contra el marco neozelandés cuando la titulación no está en la lista de exentas.',
        ],
      },
      {
        en: [
          'English language evidence at the required level',
          'An accepted test, or evidence of qualifying study or work experience in English.',
        ],
        pt: [
          'Comprovação de inglês no nível exigido',
          'Teste aceito, ou comprovação de estudo ou experiência de trabalho qualificantes em inglês.',
        ],
        es: [
          'Prueba de inglés en el nivel exigido',
          'Un examen aceptado, o prueba de estudio o experiencia laboral cualificantes en inglés.',
        ],
      },
      {
        en: [
          'Occupational registration where the role requires it',
          'Full New Zealand registration, not just eligibility to apply for it.',
        ],
        pt: [
          'Registo ocupacional quando a função exigir',
          'Registo neozelandês completo, não apenas a elegibilidade para pedi-lo.',
        ],
        es: [
          'Registro ocupacional cuando el puesto lo exija',
          'Registro neozelandés completo, no solo la elegibilidad para solicitarlo.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Skilled employment at or above the required pay rate',
          'The pay rate is central to how points are scored, so confirm the rate in force before lodging.',
        ],
        pt: [
          'Emprego qualificado com salário igual ou acima da taxa exigida',
          'A taxa salarial é central na pontuação, então confirme a taxa em vigor antes de protocolar.',
        ],
        es: [
          'Empleo cualificado con salario igual o superior a la tasa exigida',
          'La tasa salarial es central en la puntuación, así que confirme la tasa vigente antes de presentar.',
        ],
      },
      {
        en: [
          'Employment agreement with an accredited employer',
          'The job that supports the residence claim has to be ongoing and with an accredited company.',
        ],
        pt: [
          'Contrato de trabalho com empregador credenciado',
          'O emprego que sustenta o pedido de residência precisa ser contínuo e com empresa credenciada.',
        ],
        es: [
          'Contrato de trabajo con un empleador acreditado',
          'El empleo que sustenta la solicitud de residencia debe ser continuo y con una empresa acreditada.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Submit the EOI and wait for selection',
          'Selections run periodically from the pool.',
        ],
        pt: [
          'Enviar a EOI e aguardar a seleção',
          'As seleções acontecem periodicamente a partir do pool.',
        ],
        es: [
          'Enviar la EOI y esperar la selección',
          'Las selecciones se hacen periódicamente a partir del pool.',
        ],
      },
      {
        en: [
          'Lodge the residence application within the deadline',
          'The invitation lapses; missing it means submitting a fresh EOI.',
        ],
        pt: [
          'Protocolar o pedido de residência dentro do prazo',
          'O convite caduca; perdê-lo significa enviar uma EOI nova.',
        ],
        es: [
          'Presentar la solicitud de residencia dentro del plazo',
          'La invitación caduca; perderla implica enviar una EOI nueva.',
        ],
      },
      {
        en: [
          'Pay the residence application fee',
          'Substantially higher than temporary visa fees, and charged per application including family.',
        ],
        pt: [
          'Pagar a taxa do pedido de residência',
          'Bem mais alta que as taxas de vistos temporários, e cobrada por pedido, incluindo a família.',
        ],
        es: [
          'Pagar la tasa de la solicitud de residencia',
          'Bastante más alta que las tasas de visados temporales, y se cobra por solicitud, incluida la familia.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical examination and chest x-ray',
          'For every person included, with a panel physician. Residence has a higher health standard than temporary visas.',
        ],
        pt: [
          'Exame médico e raio-X de tórax',
          'Para cada pessoa incluída, com médico credenciado. A residência tem padrão de saúde mais exigente que os vistos temporários.',
        ],
        es: [
          'Examen médico y radiografía de tórax',
          'Para cada persona incluida, con médico acreditado. La residencia tiene un estándar de salud más exigente que los visados temporales.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Enter before the travel conditions expire',
          'A first resident visa carries travel conditions with an end date, and they are not indefinite.',
        ],
        pt: [
          'Entrar antes de as travel conditions expirarem',
          'O primeiro visto de residente traz travel conditions com data de fim, e elas não são indefinidas.',
        ],
        es: [
          'Entrar antes de que caduquen las travel conditions',
          'El primer visado de residente lleva travel conditions con fecha de fin, y no son indefinidas.',
        ],
      },
      {
        en: [
          'Apply for the permanent resident visa when eligible',
          'Usually after two years meeting the commitment criteria. It is what removes the travel conditions for good.',
        ],
        pt: [
          'Pedir o visto de residente permanente quando elegível',
          'Em geral após dois anos cumprindo os critérios de compromisso. É o que remove as travel conditions em definitivo.',
        ],
        es: [
          'Solicitar el visado de residente permanente cuando sea elegible',
          'Normalmente tras dos años cumpliendo los criterios de compromiso. Es lo que elimina las travel conditions de forma definitiva.',
        ],
      },
      {
        en: [
          'Register with a doctor and confirm health entitlement',
          'Residents are entitled to publicly funded healthcare.',
        ],
        pt: [
          'Inscrever-se num médico e confirmar o direito à saúde',
          'Residentes têm direito ao atendimento público de saúde.',
        ],
        es: [
          'Inscribirse con un médico y confirmar el derecho sanitario',
          'Los residentes tienen derecho a la atención sanitaria pública.',
        ],
        priority: 2,
      },
      {
        en: [
          'Count the years towards citizenship',
          'Five years of residence with a set minimum presence in each of them.',
        ],
        pt: [
          'Contar os anos para a cidadania',
          'Cinco anos de residência com uma presença mínima determinada em cada um deles.',
        ],
        es: [
          'Contar los años para la ciudadanía',
          'Cinco años de residencia con una presencia mínima determinada en cada uno de ellos.',
        ],
        priority: 3,
        required: false,
      },
    ],
  },
};
