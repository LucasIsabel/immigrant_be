import type { CountryVisaSteps } from './types';

/**
 * Steps for United States.
 *
 * These sets were already live in production before this file existed — they
 * were created through the admin screen, which stores raw JSON and validates
 * nothing. Importing them verbatim makes the seed the source of truth without
 * regressing copy that is already in front of users.
 */
export const unitedStates: CountryVisaSteps = {
  'Nonimmigrant Visas (temporary stay)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Generally valid for at least 6 months beyond the intended stay, unless your country is exempt.',
        ],
        pt: [
          'Passaporte válido',
          'Em geral com validade de pelo menos 6 meses além da estadia pretendida, salvo se seu país for isento.',
        ],
        es: [
          'Pasaporte vigente',
          'Por lo general válido al menos 6 meses más allá de la estancia prevista, salvo que tu país esté exento.',
        ],
      },
      {
        en: [
          'DS-160 confirmation page',
          'Print the page with the barcode; you cannot attend the interview without it.',
        ],
        pt: [
          'Página de confirmação do DS-160',
          'Imprima a página com o código de barras; sem ela não há entrevista.',
        ],
        es: [
          'Página de confirmación del DS-160',
          'Imprime la página con el código de barras; sin ella no hay entrevista.',
        ],
      },
      {
        en: [
          'Photo to U.S. visa specification',
          'Square format, white background, uploaded with the DS-160.',
        ],
        pt: [
          'Foto no padrão de visto dos EUA',
          'Formato quadrado, fundo branco, enviada junto com o DS-160.',
        ],
        es: [
          'Fotografía según el estándar de visado de EE. UU.',
          'Formato cuadrado, fondo blanco, cargada junto con el DS-160.',
        ],
      },
      {
        en: [
          'Evidence of ties to your home country',
          'Employment, property, family. Central to overcoming the presumption of immigrant intent.',
        ],
        pt: [
          'Comprovação de vínculos com o país de origem',
          'Emprego, imóveis, família. É o ponto central para superar a presunção de intenção imigratória.',
        ],
        es: [
          'Prueba de vínculos con tu país de origen',
          'Empleo, bienes, familia. Es clave para superar la presunción de intención migratoria.',
        ],
      },
      {
        en: [
          'Previous passports with U.S. visas',
          'Useful to demonstrate a history of compliance.',
        ],
        pt: [
          'Passaportes antigos com vistos americanos',
          'Ajudam a demonstrar histórico de cumprimento das regras.',
        ],
        es: [
          'Pasaportes anteriores con visados estadounidenses',
          'Ayudan a demostrar un historial de cumplimiento.',
        ],
        priority: 3,
        required: false,
      },
    ],
    education: [
      {
        en: [
          'Form I-20 or DS-2019',
          'I-20 for F and M categories, DS-2019 for J. Issued by the SEVP-approved school or sponsor.',
        ],
        pt: [
          'Formulário I-20 ou DS-2019',
          'I-20 para as categorias F e M, DS-2019 para J. Emitido pela instituição ou patrocinador aprovado pelo SEVP.',
        ],
        es: [
          'Formulario I-20 o DS-2019',
          'I-20 para las categorías F y M, DS-2019 para J. Lo emite la institución o el patrocinador aprobado por el SEVP.',
        ],
        required: false,
      },
      {
        en: [
          'SEVIS I-901 fee receipt',
          'Must be paid before the interview for student and exchange categories.',
        ],
        pt: [
          'Comprovante da taxa SEVIS I-901',
          'Precisa ser pago antes da entrevista nas categorias de estudante e intercâmbio.',
        ],
        es: [
          'Comprobante de la tasa SEVIS I-901',
          'Debe pagarse antes de la entrevista en las categorías de estudiante e intercambio.',
        ],
        required: false,
      },
      {
        en: [
          'Academic records and test scores',
          'Transcripts, diplomas, TOEFL, SAT or GRE as applicable.',
        ],
        pt: [
          'Histórico escolar e resultados de testes',
          'Históricos, diplomas, TOEFL, SAT ou GRE, conforme o caso.',
        ],
        es: [
          'Expedientes académicos y resultados de exámenes',
          'Expedientes, títulos, TOEFL, SAT o GRE según corresponda.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of funds to cover the entire stay',
          'Bank statements, pay stubs and tax returns.',
        ],
        pt: [
          'Comprovação de fundos para toda a estadia',
          'Extratos bancários, holerites e declarações de imposto de renda.',
        ],
        es: [
          'Prueba de fondos para toda la estancia',
          'Extractos bancarios, nóminas y declaraciones de impuestos.',
        ],
      },
      {
        en: [
          'Employment or income verification letter',
          'Confirming position, salary and approved leave, where relevant.',
        ],
        pt: [
          'Carta de comprovação de emprego ou renda',
          'Confirmando cargo, salário e férias aprovadas, quando aplicável.',
        ],
        es: [
          'Carta de verificación de empleo o ingresos',
          'Confirmando cargo, salario y permiso aprobado, cuando corresponda.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Sponsor documentation',
          'If a third party is covering your expenses.',
        ],
        pt: [
          'Documentação do patrocinador',
          'Caso um terceiro esteja custeando suas despesas.',
        ],
        es: [
          'Documentación del patrocinador',
          'Si un tercero cubre tus gastos.',
        ],
        priority: 3,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'File the USCIS petition first, if required',
          'Petition-based categories such as H, L, O and P need an approved I-129 before the consular stage.',
        ],
        pt: [
          'Protocolar antes a petição no USCIS, se exigida',
          'Categorias baseadas em petição como H, L, O e P precisam de um I-129 aprovado antes da etapa consular.',
        ],
        es: [
          'Presentar antes la petición ante USCIS, si se exige',
          'Las categorías basadas en petición como H, L, O y P requieren un I-129 aprobado antes de la etapa consular.',
        ],
        required: false,
      },
      {
        en: [
          'Complete the DS-160 online',
          'Any error requires filling out a new form from scratch.',
        ],
        pt: [
          'Preencher o DS-160 online',
          'Qualquer erro obriga a refazer o formulário do zero.',
        ],
        es: [
          'Completar el DS-160 en línea',
          'Cualquier error obliga a rehacer el formulario desde cero.',
        ],
      },
      {
        en: [
          'Pay the MRV application fee',
          'Amount varies by visa category; non-refundable even if the visa is denied.',
        ],
        pt: [
          'Pagar a taxa MRV',
          'O valor varia conforme a categoria; não é reembolsável mesmo se o visto for negado.',
        ],
        es: [
          'Pagar la tasa MRV',
          'El importe varía según la categoría; no es reembolsable aunque denieguen el visado.',
        ],
      },
      {
        en: [
          'Schedule the consular interview',
          'Wait times vary widely by post; book as early as possible.',
        ],
        pt: [
          'Agendar a entrevista consular',
          'Os prazos variam muito por posto; agende o quanto antes.',
        ],
        es: [
          'Agendar la entrevista consular',
          'Los tiempos de espera varían mucho por consulado; reserva cuanto antes.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprint collection',
          'Taken at the Applicant Service Center or at the consulate on the interview day.',
        ],
        pt: [
          'Coleta de impressões digitais',
          'Feita no Centro de Atendimento ao Solicitante ou no consulado, no dia da entrevista.',
        ],
        es: [
          'Toma de huellas dactilares',
          'Se realiza en el Centro de Atención al Solicitante o en el consulado el día de la entrevista.',
        ],
      },
      {
        en: [
          'Medical exam',
          'Not generally required for nonimmigrant categories.',
        ],
        pt: [
          'Exame médico',
          'Em geral não é exigido nas categorias de não-imigrante.',
        ],
        es: [
          'Examen médico',
          'Por lo general no se exige en las categorías de no inmigrante.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the passport and check the visa foil',
          'Verify name, category, validity and number of entries.',
        ],
        pt: [
          'Retirar o passaporte e conferir o visto',
          'Verifique nome, categoria, validade e número de entradas.',
        ],
        es: [
          'Recoger el pasaporte y revisar el visado',
          'Verifica nombre, categoría, vigencia y número de entradas.',
        ],
      },
      {
        en: [
          'Present yourself to the CBP officer at the port of entry',
          'The visa authorises travel; CBP decides admission and the period of stay.',
        ],
        pt: [
          'Apresentar-se ao agente do CBP no porto de entrada',
          'O visto autoriza a viagem; quem decide a admissão e o tempo de permanência é o CBP.',
        ],
        es: [
          'Presentarte ante el agente del CBP en el puerto de entrada',
          'El visado autoriza el viaje; el CBP decide la admisión y el tiempo de estancia.',
        ],
      },
      {
        en: [
          'Check your I-94 record online',
          'The I-94 date, not the visa expiry, defines how long you may lawfully remain.',
        ],
        pt: [
          'Consultar seu registro I-94 online',
          'É a data do I-94, e não a validade do visto, que define até quando você pode permanecer legalmente.',
        ],
        es: [
          'Consultar tu registro I-94 en línea',
          'Es la fecha del I-94, no la vigencia del visado, la que define hasta cuándo puedes permanecer legalmente.',
        ],
      },
      {
        en: [
          'File with USCIS to extend or change status',
          'Must be filed before the I-94 expires. Overstaying triggers re-entry bars.',
        ],
        pt: [
          'Protocolar no USCIS para estender ou mudar de status',
          'Precisa ser feito antes de o I-94 expirar. Overstay gera impedimentos de reentrada.',
        ],
        es: [
          'Presentar ante USCIS la extensión o el cambio de estatus',
          'Debe hacerse antes de que venza el I-94. La permanencia irregular genera prohibiciones de reingreso.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
  'Immigrant Visas (permanent residence)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Must stay valid for at least 60 days beyond the visa validity period.',
        ],
        pt: [
          'Passaporte válido',
          'Precisa permanecer válido por pelo menos 60 dias além do prazo de validade do visto.',
        ],
        es: [
          'Pasaporte vigente',
          'Debe seguir vigente al menos 60 días más allá del período de validez del visado.',
        ],
      },
      {
        en: [
          'Birth certificate',
          'Long-form, issued by the civil registry, with certified translation.',
        ],
        pt: [
          'Certidão de nascimento',
          'Inteiro teor, emitida pelo cartório de registro civil, com tradução juramentada.',
        ],
        es: [
          'Partida de nacimiento',
          'En formato completo, emitida por el registro civil, con traducción certificada.',
        ],
      },
      {
        en: [
          'Marriage and divorce certificates',
          'For every current and previous marriage of the applicant and the spouse.',
        ],
        pt: [
          'Certidões de casamento e divórcio',
          'De todos os casamentos atuais e anteriores do candidato e do cônjuge.',
        ],
        es: [
          'Actas de matrimonio y divorcio',
          'De todos los matrimonios actuales y anteriores del solicitante y del cónyuge.',
        ],
        required: false,
      },
      {
        en: [
          'Police certificates',
          'From your country of nationality and from every country where you lived 12 months or more since age 16.',
        ],
        pt: [
          'Certidões de antecedentes criminais',
          'Do país de nacionalidade e de todos os países onde morou 12 meses ou mais depois dos 16 anos.',
        ],
        es: [
          'Certificados de antecedentes penales',
          'Del país de nacionalidad y de todos los países donde residiste 12 meses o más desde los 16 años.',
        ],
      },
      {
        en: [
          'Military records',
          'Required if you ever served in any country armed forces.',
        ],
        pt: [
          'Certificado de reservista / registros militares',
          'Exigido se você já serviu às forças armadas de qualquer país.',
        ],
        es: [
          'Registros militares',
          'Exigidos si has servido en las fuerzas armadas de cualquier país.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Court and prison records',
          'Required for any arrest or conviction, even if the record was later expunged.',
        ],
        pt: [
          'Registros judiciais e prisionais',
          'Exigidos em caso de qualquer prisão ou condenação, mesmo que o registro tenha sido posteriormente cancelado.',
        ],
        es: [
          'Registros judiciales y penitenciarios',
          'Exigidos ante cualquier arresto o condena, aunque el registro se haya cancelado después.',
        ],
        priority: 2,
        required: false,
      },
    ],
    education: [
      {
        en: [
          'Diplomas, transcripts and professional licences',
          'Central to employment-based categories.',
        ],
        pt: [
          'Diplomas, históricos e registros profissionais',
          'Fundamentais nas categorias baseadas em emprego.',
        ],
        es: [
          'Títulos, expedientes y licencias profesionales',
          'Fundamentales en las categorías basadas en empleo.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Labor certification (PERM)',
          'Approved by the Department of Labor before the I-140 in the relevant employment categories.',
        ],
        pt: [
          'Labor certification (PERM)',
          'Aprovada pelo Department of Labor antes do I-140 nas categorias de emprego aplicáveis.',
        ],
        es: [
          'Labor certification (PERM)',
          'Aprobada por el Department of Labor antes del I-140 en las categorías de empleo aplicables.',
        ],
        required: false,
      },
      {
        en: [
          'Evidence of extraordinary ability',
          'For EB-1 and national interest waiver petitions: awards, publications, citations, press coverage.',
        ],
        pt: [
          'Comprovação de habilidade extraordinária',
          'Para petições EB-1 e national interest waiver: prêmios, publicações, citações, cobertura de imprensa.',
        ],
        es: [
          'Prueba de habilidad extraordinaria',
          'Para peticiones EB-1 y national interest waiver: premios, publicaciones, citas, cobertura de prensa.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Form I-864 Affidavit of Support',
          'Signed by the petitioner; a legally enforceable contract with the U.S. government.',
        ],
        pt: [
          'Formulário I-864 Affidavit of Support',
          'Assinado pelo peticionário; é um contrato juridicamente exigível com o governo dos EUA.',
        ],
        es: [
          'Formulario I-864 Affidavit of Support',
          'Firmado por el peticionario; es un contrato jurídicamente exigible con el gobierno de EE. UU.',
        ],
      },
      {
        en: [
          'Petitioner tax returns and proof of income',
          'Income must reach at least 125% of the federal poverty guidelines for the household size.',
        ],
        pt: [
          'Declarações de imposto e comprovação de renda do peticionário',
          'A renda precisa atingir ao menos 125% da linha federal de pobreza para o tamanho do domicílio.',
        ],
        es: [
          'Declaraciones de impuestos y prueba de ingresos del peticionario',
          'Los ingresos deben alcanzar al menos el 125% del umbral federal de pobreza para el tamaño del hogar.',
        ],
      },
      {
        en: [
          'Joint sponsor documentation',
          'Needed when the petitioner income falls short of the threshold.',
        ],
        pt: [
          'Documentação do co-patrocinador',
          'Necessária quando a renda do peticionário fica abaixo do limite.',
        ],
        es: [
          'Documentación del copatrocinador',
          'Necesaria cuando los ingresos del peticionario no alcanzan el umbral.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Petitioner files the I-130 or I-140 with USCIS',
          'I-130 for family-based cases, I-140 for employment-based cases.',
        ],
        pt: [
          'Peticionário protocola o I-130 ou I-140 no USCIS',
          'I-130 para casos familiares, I-140 para casos baseados em emprego.',
        ],
        es: [
          'El peticionario presenta el I-130 o I-140 ante USCIS',
          'I-130 para casos familiares, I-140 para casos basados en empleo.',
        ],
      },
      {
        en: [
          'Wait for the priority date to become current',
          'Track the monthly Visa Bulletin; waits can run for years in oversubscribed categories.',
        ],
        pt: [
          'Aguardar a priority date ficar current',
          'Acompanhe o Visa Bulletin mensal; a espera pode durar anos em categorias congestionadas.',
        ],
        es: [
          'Esperar a que la priority date esté current',
          'Sigue el Visa Bulletin mensual; la espera puede durar años en categorías saturadas.',
        ],
      },
      {
        en: [
          'National Visa Center processing',
          'Pay the IV and AOS fees, then upload the civil documents to CEAC.',
        ],
        pt: [
          'Processamento no National Visa Center',
          'Pagar as taxas IV e AOS e enviar os documentos civis pelo CEAC.',
        ],
        es: [
          'Tramitación en el National Visa Center',
          'Pagar las tasas IV y AOS y subir los documentos civiles a CEAC.',
        ],
      },
      {
        en: [
          'Attend the consular interview',
          'Bring the originals of every document submitted to the NVC.',
        ],
        pt: [
          'Comparecer à entrevista consular',
          'Leve os originais de todos os documentos enviados ao NVC.',
        ],
        es: [
          'Asistir a la entrevista consular',
          'Lleva los originales de todos los documentos enviados al NVC.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical exam by a panel physician',
          'Only physicians authorised by the embassy; results are valid for a limited period.',
        ],
        pt: [
          'Exame médico com panel physician',
          'Somente médicos autorizados pela embaixada; o resultado tem validade limitada.',
        ],
        es: [
          'Examen médico con panel physician',
          'Solo médicos autorizados por la embajada; el resultado tiene vigencia limitada.',
        ],
      },
      {
        en: [
          'Required vaccination record',
          'Missing vaccines can be administered by the panel physician at the appointment.',
        ],
        pt: [
          'Carteira de vacinação exigida',
          'Vacinas faltantes podem ser aplicadas pelo próprio panel physician na consulta.',
        ],
        es: [
          'Cartilla de vacunación exigida',
          'Las vacunas faltantes puede aplicarlas el propio panel physician en la cita.',
        ],
      },
      {
        en: [
          'Biometrics collection',
          'Fingerprints and photo during consular processing.',
        ],
        pt: [
          'Coleta de biometria',
          'Impressões digitais e foto durante o processamento consular.',
        ],
        es: [
          'Toma de biometría',
          'Huellas y fotografía durante el trámite consular.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Receive the sealed immigrant visa packet',
          'Do not open it. It must be handed unopened to the CBP officer.',
        ],
        pt: [
          'Receber o pacote lacrado do visto de imigrante',
          'Não abra. Ele precisa ser entregue lacrado ao agente do CBP.',
        ],
        es: [
          'Recibir el paquete sellado del visado de inmigrante',
          'No lo abras. Debe entregarse cerrado al agente del CBP.',
        ],
      },
      {
        en: [
          'Pay the USCIS Immigrant Fee',
          'Pay it before travelling; the Green Card is not produced until this fee is paid.',
        ],
        pt: [
          'Pagar a USCIS Immigrant Fee',
          'Pague antes de viajar; o Green Card só é produzido depois desse pagamento.',
        ],
        es: [
          'Pagar la USCIS Immigrant Fee',
          'Págala antes de viajar; la Green Card no se produce hasta que se abone esta tasa.',
        ],
      },
      {
        en: [
          'Enter the U.S. and receive the I-551 stamp',
          'The stamp serves as temporary proof of permanent residence.',
        ],
        pt: [
          'Entrar nos EUA e receber o carimbo I-551',
          'O carimbo serve como comprovante provisório de residência permanente.',
        ],
        es: [
          'Entrar a EE. UU. y recibir el sello I-551',
          'El sello sirve como prueba provisional de residencia permanente.',
        ],
      },
      {
        en: [
          'Apply for a Social Security Number',
          'Can be requested with the visa application or at a local SSA office after arrival.',
        ],
        pt: [
          'Solicitar o Social Security Number',
          'Pode ser pedido junto com a aplicação do visto ou em um posto local do SSA após a chegada.',
        ],
        es: [
          'Solicitar el Social Security Number',
          'Puede pedirse junto con la solicitud del visado o en una oficina local del SSA tras la llegada.',
        ],
        priority: 2,
      },
      {
        en: [
          'Maintain continuous residence',
          'Long absences can be treated as abandonment and jeopardise naturalisation.',
        ],
        pt: [
          'Manter residência contínua',
          'Ausências longas podem ser tratadas como abandono e comprometer a naturalização.',
        ],
        es: [
          'Mantener residencia continua',
          'Las ausencias prolongadas pueden considerarse abandono y comprometer la naturalización.',
        ],
        priority: 2,
      },
    ],
  },

  'Visitor Visa (B-1/B-2)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Must stay valid for six months beyond the intended stay, unless your country is exempt from that rule.',
        ],
        pt: [
          'Passaporte válido',
          'Precisa continuar válido por seis meses além da estada pretendida, salvo se seu país for isento dessa regra.',
        ],
        es: [
          'Pasaporte vigente',
          'Debe seguir vigente seis meses más allá de la estancia prevista, salvo que su país esté exento de esa regla.',
        ],
      },
      {
        en: [
          'Photograph to US specification',
          '5x5 cm, white background, taken in the last six months, no glasses.',
        ],
        pt: [
          'Foto no padrão norte-americano',
          '5x5 cm, fundo branco, tirada nos últimos seis meses, sem óculos.',
        ],
        es: [
          'Fotografía según el estándar estadounidense',
          '5x5 cm, fondo blanco, tomada en los últimos seis meses, sin gafas.',
        ],
      },
      {
        en: [
          'DS-160 confirmation page',
          'Print it: the consulate locates your application by the barcode on this page.',
        ],
        pt: [
          'Página de confirmação do DS-160',
          'Imprima: o consulado localiza seu processo pelo código de barras dessa página.',
        ],
        es: [
          'Página de confirmación del DS-160',
          'Imprímala: el consulado localiza su trámite por el código de barras de esa página.',
        ],
      },
      {
        en: [
          'Evidence of ties to your home country',
          'The officer must presume you intend to immigrate; employment, property and family are what rebut it. This is the most common reason for refusal.',
        ],
        pt: [
          'Comprovação de vínculos com seu país',
          'O oficial é obrigado a presumir intenção de imigrar; emprego, imóveis e família são o que derruba essa presunção. É o motivo mais comum de negativa.',
        ],
        es: [
          'Prueba de arraigo en su país',
          'El oficial debe presumir intención de inmigrar; empleo, propiedades y familia son lo que desvirtúa esa presunción. Es el motivo más común de denegación.',
        ],
      },
      {
        en: [
          'Itinerary or letter of invitation',
          'For B-1, a letter from the US company describing the meetings; for B-2, hotel and flight bookings.',
        ],
        pt: [
          'Itinerário ou carta-convite',
          'No B-1, carta da empresa americana descrevendo as reuniões; no B-2, reservas de hotel e passagens.',
        ],
        es: [
          'Itinerario o carta de invitación',
          'En el B-1, carta de la empresa estadounidense describiendo las reuniones; en el B-2, reservas de hotel y vuelos.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof you can pay for the trip',
          'Bank statements from the last three to six months, consistent with the itinerary you present.',
        ],
        pt: [
          'Comprovação de que você custeia a viagem',
          'Extratos bancários dos últimos três a seis meses, coerentes com o itinerário apresentado.',
        ],
        es: [
          'Prueba de que puede costear el viaje',
          'Extractos bancarios de los últimos tres a seis meses, coherentes con el itinerario presentado.',
        ],
      },
      {
        en: [
          'Documents of whoever funds the trip',
          'If a third party pays, bring a sponsorship letter and their financial documents.',
        ],
        pt: [
          'Documentos de quem financia a viagem',
          'Se um terceiro paga, leve carta de patrocínio e os documentos financeiros dele.',
        ],
        es: [
          'Documentos de quien financia el viaje',
          'Si un tercero paga, lleve carta de patrocinio y sus documentos financieros.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Complete the DS-160 online',
          'Any error requires filling out a new form from scratch.',
        ],
        pt: [
          'Preencher o DS-160 online',
          'Qualquer erro obriga a refazer o formulário do zero.',
        ],
        es: [
          'Completar el DS-160 en línea',
          'Cualquier error obliga a rehacer el formulario desde cero.',
        ],
      },
      {
        en: [
          'Pay the MRV application fee',
          'Non-refundable even if the visa is denied. Check the current amount on the consulate page.',
        ],
        pt: [
          'Pagar a taxa MRV',
          'Não é reembolsável mesmo se o visto for negado. Confira o valor atual na página do consulado.',
        ],
        es: [
          'Pagar la tasa MRV',
          'No es reembolsable aunque denieguen el visado. Consulte el importe vigente en la página del consulado.',
        ],
      },
      {
        en: [
          'Schedule the consular interview',
          'Waiting times vary widely by post; check the estimate before booking travel.',
        ],
        pt: [
          'Agendar a entrevista consular',
          'A fila varia muito de posto para posto; confira a estimativa antes de comprar passagem.',
        ],
        es: [
          'Agendar la entrevista consular',
          'La espera varía mucho según el consulado; consulte la estimación antes de comprar billetes.',
        ],
      },
      {
        en: [
          'Attend the interview',
          'Answer only what is asked. The decision usually comes the same day.',
        ],
        pt: [
          'Comparecer à entrevista',
          'Responda apenas o que for perguntado. A decisão costuma sair no mesmo dia.',
        ],
        es: [
          'Asistir a la entrevista',
          'Responda solo lo que le pregunten. La decisión suele salir el mismo día.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprint collection',
          'Taken at the Applicant Service Center or at the consulate on the interview day.',
        ],
        pt: [
          'Coleta de impressões digitais',
          'Feita no Centro de Atendimento ao Solicitante ou no consulado, no dia da entrevista.',
        ],
        es: [
          'Toma de huellas dactilares',
          'Se realiza en el Centro de Atención al Solicitante o en el consulado el día de la entrevista.',
        ],
      },
      {
        en: ['Medical exam', 'Not required for the visitor category.'],
        pt: ['Exame médico', 'Não é exigido na categoria de visitante.'],
        es: ['Examen médico', 'No se exige en la categoría de visitante.'],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the passport with the visa',
          'Delivered by courier or picked up, depending on the post.',
        ],
        pt: [
          'Retirar o passaporte com o visto',
          'Entregue por transportadora ou retirado no local, conforme o posto.',
        ],
        es: [
          'Retirar el pasaporte con el visado',
          'Se entrega por mensajería o se recoge en el lugar, según el consulado.',
        ],
      },
      {
        en: [
          'Understand that the visa is not a guarantee of entry',
          'It only authorises you to travel to a port of entry; CBP decides admission there.',
        ],
        pt: [
          'Entender que o visto não garante a entrada',
          'Ele só autoriza viajar até o ponto de entrada; quem decide a admissão ali é o CBP.',
        ],
        es: [
          'Entender que el visado no garantiza la entrada',
          'Solo autoriza viajar hasta el punto de entrada; quien decide la admisión allí es CBP.',
        ],
      },
      {
        en: [
          'Check the I-94 admission record',
          'How long you may stay is the date on the I-94, not the visa expiry. Confusing the two is the most common cause of overstay.',
        ],
        pt: [
          'Conferir o registro I-94',
          'O prazo de permanência é a data do I-94, não a validade do visto. Confundir os dois é a causa mais comum de overstay.',
        ],
        es: [
          'Consultar el registro I-94',
          'El plazo de estancia es la fecha del I-94, no la vigencia del visado. Confundirlos es la causa más común de sobreestadía.',
        ],
      },
      {
        en: [
          'Do not work or enrol in a degree programme',
          'Visitor status permits neither; doing so jeopardises any future visa.',
        ],
        pt: [
          'Não trabalhar nem cursar programa de graduação',
          'O status de visitante não permite nenhum dos dois; fazê-lo compromete qualquer visto futuro.',
        ],
        es: [
          'No trabajar ni cursar un programa de grado',
          'El estatus de visitante no permite ninguna de las dos cosas; hacerlo compromete cualquier visado futuro.',
        ],
        priority: 2,
      },
    ],
  },

  'Student Visa (F-1/M-1)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Must cover the whole intended stay, with the six-month margin.',
        ],
        pt: [
          'Passaporte válido',
          'Precisa cobrir toda a estada pretendida, com a margem de seis meses.',
        ],
        es: [
          'Pasaporte vigente',
          'Debe cubrir toda la estancia prevista, con el margen de seis meses.',
        ],
      },
      {
        en: [
          'Form I-20 signed by you and by the DSO',
          'Issued by an SEVP-certified school after it registers you in SEVIS. Check every detail: a wrong name or funding figure invalidates it.',
        ],
        pt: [
          'Formulário I-20 assinado por você e pelo DSO',
          'Emitido por escola certificada pelo SEVP depois de registrar você no SEVIS. Confira cada dado: nome ou valor de custeio errado o invalida.',
        ],
        es: [
          'Formulario I-20 firmado por usted y por el DSO',
          'Lo emite una escuela certificada por SEVP tras registrarle en SEVIS. Revise cada dato: un nombre o importe erróneo lo invalida.',
        ],
      },
      {
        en: [
          'Photograph to US specification',
          '5x5 cm, white background, taken in the last six months.',
        ],
        pt: [
          'Foto no padrão norte-americano',
          '5x5 cm, fundo branco, tirada nos últimos seis meses.',
        ],
        es: [
          'Fotografía según el estándar estadounidense',
          '5x5 cm, fondo blanco, tomada en los últimos seis meses.',
        ],
      },
      {
        en: [
          'DS-160 confirmation page',
          'The number on it links your interview to the application.',
        ],
        pt: [
          'Página de confirmação do DS-160',
          'O número dela vincula sua entrevista ao processo.',
        ],
        es: [
          'Página de confirmación del DS-160',
          'Su número vincula la entrevista con el trámite.',
        ],
      },
      {
        en: [
          'Evidence of intent to return home',
          'The student visa is temporary: you have to show what brings you back after the course.',
        ],
        pt: [
          'Comprovação de intenção de voltar ao país',
          'O visto de estudante é temporário: você precisa mostrar o que o traz de volta depois do curso.',
        ],
        es: [
          'Prueba de intención de regresar a su país',
          'El visado de estudiante es temporal: debe demostrar qué le hace volver tras el curso.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Letter of admission from the school',
          'Must match exactly the programme and dates on the I-20.',
        ],
        pt: [
          'Carta de aceitação da instituição',
          'Precisa bater exatamente com o programa e as datas do I-20.',
        ],
        es: [
          'Carta de admisión de la institución',
          'Debe coincidir exactamente con el programa y las fechas del I-20.',
        ],
      },
      {
        en: [
          'Transcripts and diplomas',
          'From the studies that qualified you for admission.',
        ],
        pt: [
          'Históricos escolares e diplomas',
          'Dos estudos que deram base à sua admissão.',
        ],
        es: [
          'Expedientes académicos y diplomas',
          'De los estudios que sustentaron su admisión.',
        ],
      },
      {
        en: [
          'English proficiency test',
          'TOEFL, IELTS or whatever the school accepts. The requirement comes from the school, not the consulate.',
        ],
        pt: [
          'Teste de proficiência em inglês',
          'TOEFL, IELTS ou o que a instituição aceitar. A exigência é da escola, não do consulado.',
        ],
        es: [
          'Prueba de dominio del inglés',
          'TOEFL, IELTS o lo que acepte la institución. La exigencia es de la escuela, no del consulado.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Standardised test scores',
          'SAT, GRE or GMAT, only where the programme requires them.',
        ],
        pt: [
          'Notas de testes padronizados',
          'SAT, GRE ou GMAT, só onde o programa exigir.',
        ],
        es: [
          'Puntuaciones de pruebas estandarizadas',
          'SAT, GRE o GMAT, solo donde el programa lo exija.',
        ],
        priority: 3,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of funds for the first academic year',
          'Must cover the tuition and living costs stated on the I-20, and be available now rather than promised.',
        ],
        pt: [
          'Comprovação de recursos para o primeiro ano letivo',
          'Precisa cobrir mensalidade e custo de vida declarados no I-20, e estar disponível agora, não prometido.',
        ],
        es: [
          'Prueba de fondos para el primer año académico',
          'Debe cubrir matrícula y costo de vida declarados en el I-20, y estar disponible ya, no prometido.',
        ],
      },
      {
        en: [
          "Sponsor's financial documents",
          'If a family member funds you, their statements, income proof and a letter stating the commitment.',
        ],
        pt: [
          'Documentos financeiros do patrocinador',
          'Se um familiar custeia, extratos, comprovante de renda e carta declarando o compromisso.',
        ],
        es: [
          'Documentos financieros del patrocinador',
          'Si un familiar le costea, sus extractos, comprobante de ingresos y carta declarando el compromiso.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Scholarship or assistantship letter',
          'Reduces how much you have to prove yourself; it is already reflected on the I-20.',
        ],
        pt: [
          'Carta de bolsa ou assistantship',
          'Reduz quanto você precisa comprovar por conta própria; já aparece refletida no I-20.',
        ],
        es: [
          'Carta de beca o asistentía',
          'Reduce cuánto debe demostrar por su cuenta; ya se refleja en el I-20.',
        ],
        priority: 3,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Pay the SEVIS I-901 fee',
          'Pay it at least three days before the interview and take the receipt. It is separate from the visa fee.',
        ],
        pt: [
          'Pagar a taxa SEVIS I-901',
          'Pague pelo menos três dias antes da entrevista e leve o recibo. É separada da taxa do visto.',
        ],
        es: [
          'Pagar la tasa SEVIS I-901',
          'Páguela al menos tres días antes de la entrevista y lleve el recibo. Es independiente de la tasa del visado.',
        ],
      },
      {
        en: [
          'Complete the DS-160 online',
          'Enter the SEVIS number exactly as it appears on the I-20.',
        ],
        pt: [
          'Preencher o DS-160 online',
          'Informe o número SEVIS exatamente como está no I-20.',
        ],
        es: [
          'Completar el DS-160 en línea',
          'Indique el número SEVIS exactamente como figura en el I-20.',
        ],
      },
      {
        en: [
          'Pay the MRV application fee',
          'Check the current amount on the consulate page; it is non-refundable.',
        ],
        pt: [
          'Pagar a taxa MRV',
          'Confira o valor atual na página do consulado; não é reembolsável.',
        ],
        es: [
          'Pagar la tasa MRV',
          'Consulte el importe vigente en la página del consulado; no es reembolsable.',
        ],
      },
      {
        en: [
          'Schedule and attend the consular interview',
          'Be ready to explain the course, why that school, and what you do with the degree afterwards.',
        ],
        pt: [
          'Agendar e comparecer à entrevista consular',
          'Esteja pronto para explicar o curso, por que aquela instituição e o que fará com o diploma depois.',
        ],
        es: [
          'Agendar y asistir a la entrevista consular',
          'Prepárese para explicar el curso, por qué esa institución y qué hará con el título después.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprint collection',
          'Taken at the Applicant Service Center or at the consulate on the interview day.',
        ],
        pt: [
          'Coleta de impressões digitais',
          'Feita no Centro de Atendimento ao Solicitante ou no consulado, no dia da entrevista.',
        ],
        es: [
          'Toma de huellas dactilares',
          'Se realiza en el Centro de Atención al Solicitante o en el consulado el día de la entrevista.',
        ],
      },
      {
        en: [
          'Vaccinations required by the school',
          'Not a consular requirement, but most universities block enrolment without the record.',
        ],
        pt: [
          'Vacinas exigidas pela instituição',
          'Não é exigência consular, mas a maioria das universidades bloqueia a matrícula sem o comprovante.',
        ],
        es: [
          'Vacunas exigidas por la institución',
          'No es requisito consular, pero la mayoría de las universidades bloquea la matrícula sin el comprobante.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the passport with the visa',
          'Check that the name and the SEVIS number are right before travelling.',
        ],
        pt: [
          'Retirar o passaporte com o visto',
          'Confira nome e número SEVIS antes de viajar.',
        ],
        es: [
          'Retirar el pasaporte con el visado',
          'Verifique nombre y número SEVIS antes de viajar.',
        ],
      },
      {
        en: [
          'Do not arrive more than 30 days before the start date',
          'Entry earlier than the window on the I-20 is refused at the border.',
        ],
        pt: [
          'Não chegar mais de 30 dias antes do início',
          'Entrada antes da janela do I-20 é recusada na fronteira.',
        ],
        es: [
          'No llegar más de 30 días antes del inicio',
          'La entrada antes de la ventana del I-20 se rechaza en la frontera.',
        ],
      },
      {
        en: [
          'Report to the DSO on arrival',
          'It activates your SEVIS record. Failing to appear terminates the record and your status with it.',
        ],
        pt: [
          'Apresentar-se ao DSO ao chegar',
          'É o que ativa seu registro no SEVIS. Não comparecer encerra o registro e, com ele, seu status.',
        ],
        es: [
          'Presentarse ante el DSO al llegar',
          'Es lo que activa su registro SEVIS. No presentarse cancela el registro y, con él, su estatus.',
        ],
      },
      {
        en: [
          'Keep a full course load',
          'Dropping below full-time without the DSO authorising it ends your status immediately.',
        ],
        pt: [
          'Manter carga horária integral',
          'Cair abaixo do tempo integral sem autorização do DSO encerra seu status na hora.',
        ],
        es: [
          'Mantener la carga académica completa',
          'Bajar del tiempo completo sin autorización del DSO cancela su estatus de inmediato.',
        ],
      },
      {
        en: [
          'Check the rules before taking any job',
          'On-campus work is capped; anything off campus needs CPT or OPT authorised in advance.',
        ],
        pt: [
          'Conferir as regras antes de aceitar trabalho',
          'Trabalho no campus tem limite; fora dele exige CPT ou OPT autorizados com antecedência.',
        ],
        es: [
          'Consultar las reglas antes de aceptar un empleo',
          'El trabajo en el campus tiene límite; fuera de él exige CPT u OPT autorizados con antelación.',
        ],
        priority: 2,
      },
    ],
  },

  'Exchange Visitor Visa (J-1)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Must cover the programme period plus the six-month margin.',
        ],
        pt: [
          'Passaporte válido',
          'Precisa cobrir o período do programa mais a margem de seis meses.',
        ],
        es: [
          'Pasaporte vigente',
          'Debe cubrir el periodo del programa más el margen de seis meses.',
        ],
      },
      {
        en: [
          'Form DS-2019 issued by the sponsor',
          'Only a State Department designated sponsor can issue it. It states the category, the dates and the funding.',
        ],
        pt: [
          'Formulário DS-2019 emitido pelo patrocinador',
          'Só um sponsor designado pelo Departamento de Estado pode emiti-lo. Nele constam categoria, datas e fonte de custeio.',
        ],
        es: [
          'Formulario DS-2019 emitido por el patrocinador',
          'Solo un sponsor designado por el Departamento de Estado puede emitirlo. Indica categoría, fechas y financiación.',
        ],
      },
      {
        en: [
          'Photograph to US specification',
          '5x5 cm, white background, taken in the last six months.',
        ],
        pt: [
          'Foto no padrão norte-americano',
          '5x5 cm, fundo branco, tirada nos últimos seis meses.',
        ],
        es: [
          'Fotografía según el estándar estadounidense',
          '5x5 cm, fondo blanco, tomada en los últimos seis meses.',
        ],
      },
      {
        en: [
          'DS-160 confirmation page',
          'Fill in the SEVIS number from the DS-2019.',
        ],
        pt: [
          'Página de confirmação do DS-160',
          'Informe o número SEVIS que consta no DS-2019.',
        ],
        es: [
          'Página de confirmación del DS-160',
          'Indique el número SEVIS que figura en el DS-2019.',
        ],
      },
      {
        en: [
          'Evidence of ties to your home country',
          'Weighs more here than in other categories, because the exchange presumes a return.',
        ],
        pt: [
          'Comprovação de vínculos com seu país',
          'Pesa mais aqui do que em outras categorias, porque o intercâmbio pressupõe retorno.',
        ],
        es: [
          'Prueba de arraigo en su país',
          'Pesa más aquí que en otras categorías, porque el intercambio presupone el regreso.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Programme acceptance or placement letter',
          'From the host institution or the placement organisation.',
        ],
        pt: [
          'Carta de aceitação ou colocação no programa',
          'Da instituição anfitriã ou da organização que faz a colocação.',
        ],
        es: [
          'Carta de aceptación o colocación en el programa',
          'De la institución anfitriona o de la organización que gestiona la colocación.',
        ],
      },
      {
        en: [
          'Credentials for your J-1 category',
          'What counts depends on the category: research scholar, trainee, au pair or camp counsellor each ask for different proof.',
        ],
        pt: [
          'Credenciais da sua categoria J-1',
          'O que vale depende da categoria: research scholar, trainee, au pair e camp counsellor exigem comprovações diferentes.',
        ],
        es: [
          'Credenciales de su categoría J-1',
          'Lo que cuenta depende de la categoría: research scholar, trainee, au pair y camp counsellor exigen pruebas distintas.',
        ],
      },
      {
        en: [
          'Evidence you can function in English',
          'The sponsor is required to verify it, by interview, test or a school certificate.',
        ],
        pt: [
          'Comprovação de que você se vira em inglês',
          'O sponsor é obrigado a verificar isso, por entrevista, teste ou certificado de escola.',
        ],
        es: [
          'Prueba de que puede desenvolverse en inglés',
          'El sponsor está obligado a verificarlo, por entrevista, prueba o certificado escolar.',
        ],
        priority: 2,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of the funding shown on the DS-2019',
          'The amounts the sponsor declared have to match what you can actually document.',
        ],
        pt: [
          'Comprovação do custeio declarado no DS-2019',
          'Os valores que o sponsor declarou precisam bater com o que você consegue documentar.',
        ],
        es: [
          'Prueba de la financiación declarada en el DS-2019',
          'Los importes que declaró el sponsor deben coincidir con lo que usted pueda documentar.',
        ],
      },
      {
        en: [
          'Documentation of the funding source',
          'Whether the money is government, sponsor or personal decides whether the two-year rule applies to you.',
        ],
        pt: [
          'Documentação da origem do custeio',
          'Se o dinheiro é do governo, do sponsor ou seu é o que decide se a regra dos dois anos se aplica a você.',
        ],
        es: [
          'Documentación del origen de la financiación',
          'Que el dinero sea gubernamental, del sponsor o propio decide si le aplica la regla de los dos años.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Pay the SEVIS I-901 fee',
          'The J amount differs from the F amount. Some categories are exempt — check with the sponsor.',
        ],
        pt: [
          'Pagar a taxa SEVIS I-901',
          'O valor do J é diferente do valor do F. Algumas categorias são isentas — confirme com o sponsor.',
        ],
        es: [
          'Pagar la tasa SEVIS I-901',
          'El importe del J difiere del del F. Algunas categorías están exentas: confírmelo con el sponsor.',
        ],
      },
      {
        en: [
          'Complete the DS-160 online',
          'Any error requires filling out a new form from scratch.',
        ],
        pt: [
          'Preencher o DS-160 online',
          'Qualquer erro obriga a refazer o formulário do zero.',
        ],
        es: [
          'Completar el DS-160 en línea',
          'Cualquier error obliga a rehacer el formulario desde cero.',
        ],
      },
      {
        en: [
          'Pay the MRV application fee',
          'Some government-sponsored programmes are exempt; confirm before paying.',
        ],
        pt: [
          'Pagar a taxa MRV',
          'Alguns programas patrocinados por governo são isentos; confirme antes de pagar.',
        ],
        es: [
          'Pagar la tasa MRV',
          'Algunos programas patrocinados por gobiernos están exentos; confírmelo antes de pagar.',
        ],
      },
      {
        en: [
          'Schedule and attend the consular interview',
          'Explain the programme, the host institution and what you do with the experience back home.',
        ],
        pt: [
          'Agendar e comparecer à entrevista consular',
          'Explique o programa, a instituição anfitriã e o que fará com a experiência de volta ao país.',
        ],
        es: [
          'Agendar y asistir a la entrevista consular',
          'Explique el programa, la institución anfitriona y qué hará con la experiencia al regresar.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprint collection',
          'Taken at the Applicant Service Center or at the consulate on the interview day.',
        ],
        pt: [
          'Coleta de impressões digitais',
          'Feita no Centro de Atendimento ao Solicitante ou no consulado, no dia da entrevista.',
        ],
        es: [
          'Toma de huellas dactilares',
          'Se realiza en el Centro de Atención al Solicitante o en el consulado el día de la entrevista.',
        ],
      },
      {
        en: [
          'Take out the health insurance the programme requires',
          'Medical, evacuation and repatriation cover is compulsory for the whole programme, and for any dependants. Dropping it ends your status.',
        ],
        pt: [
          'Contratar o seguro-saúde exigido pelo programa',
          'Cobertura médica, de evacuação e de repatriação é obrigatória durante todo o programa, e para os dependentes. Ficar sem ela encerra seu status.',
        ],
        es: [
          'Contratar el seguro de salud que exige el programa',
          'La cobertura médica, de evacuación y de repatriación es obligatoria durante todo el programa, y para los dependientes. Quedarse sin ella cancela su estatus.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the passport with the visa',
          'Check that the category on the visa matches the DS-2019.',
        ],
        pt: [
          'Retirar o passaporte com o visto',
          'Confira se a categoria impressa no visto bate com a do DS-2019.',
        ],
        es: [
          'Retirar el pasaporte con el visado',
          'Verifique que la categoría impresa en el visado coincida con la del DS-2019.',
        ],
      },
      {
        en: [
          'Do not arrive more than 30 days before the programme starts',
          'The same window applies as for students.',
        ],
        pt: [
          'Não chegar mais de 30 dias antes do início do programa',
          'Vale a mesma janela dos estudantes.',
        ],
        es: [
          'No llegar más de 30 días antes del inicio del programa',
          'Rige la misma ventana que para los estudiantes.',
        ],
      },
      {
        en: [
          'Check whether the two-year home residency rule applies',
          'Rule 212(e) is triggered by government funding or by your field appearing on the skills list. While it is unmet, it blocks H, L and permanent residence.',
        ],
        pt: [
          'Verificar se a regra dos dois anos se aplica',
          'A regra 212(e) é disparada por custeio governamental ou pela sua área estar na skills list. Enquanto não cumprida, ela bloqueia H, L e residência permanente.',
        ],
        es: [
          'Verificar si aplica la regla de los dos años',
          'La regla 212(e) se activa por financiación gubernamental o porque su área figure en la skills list. Mientras no se cumpla, bloquea H, L y la residencia permanente.',
        ],
      },
      {
        en: [
          'Report to the responsible officer on arrival',
          'It validates your SEVIS record, exactly as the DSO does for students.',
        ],
        pt: [
          'Apresentar-se ao responsible officer ao chegar',
          'É o que valida seu registro no SEVIS, igual ao que o DSO faz com estudantes.',
        ],
        es: [
          'Presentarse ante el responsible officer al llegar',
          'Es lo que valida su registro SEVIS, igual que hace el DSO con los estudiantes.',
        ],
      },
      {
        en: [
          'Request a waiver of 212(e) early if you plan to stay',
          'The process runs through the State Department and takes months; starting late strands people between statuses.',
        ],
        pt: [
          'Pedir waiver do 212(e) cedo, se pretende ficar',
          'O processo corre no Departamento de Estado e leva meses; começar tarde deixa a pessoa entre status.',
        ],
        es: [
          'Solicitar pronto el waiver del 212(e) si piensa quedarse',
          'El trámite se lleva en el Departamento de Estado y tarda meses; empezar tarde deja a la persona entre estatus.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },

  'Specialty Occupation Visa (H-1B)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Should cover the petition period, with the six-month margin.',
        ],
        pt: [
          'Passaporte válido',
          'Deve cobrir o período da petição, com a margem de seis meses.',
        ],
        es: [
          'Pasaporte vigente',
          'Debe cubrir el periodo de la petición, con el margen de seis meses.',
        ],
      },
      {
        en: [
          'I-797 approval notice for the I-129',
          'The employer receives it. Take the original or a copy to the interview.',
        ],
        pt: [
          'Notificação de aprovação I-797 do I-129',
          'Quem a recebe é o empregador. Leve o original ou uma cópia à entrevista.',
        ],
        es: [
          'Notificación de aprobación I-797 del I-129',
          'La recibe el empleador. Lleve el original o una copia a la entrevista.',
        ],
      },
      {
        en: [
          'Photograph to US specification',
          '5x5 cm, white background, taken in the last six months.',
        ],
        pt: [
          'Foto no padrão norte-americano',
          '5x5 cm, fundo branco, tirada nos últimos seis meses.',
        ],
        es: [
          'Fotografía según el estándar estadounidense',
          '5x5 cm, fondo blanco, tomada en los últimos seis meses.',
        ],
      },
      {
        en: [
          'DS-160 confirmation page',
          'Enter the receipt number of the approved petition.',
        ],
        pt: [
          'Página de confirmação do DS-160',
          'Informe o número de recibo da petição aprovada.',
        ],
        es: [
          'Página de confirmación del DS-160',
          'Indique el número de recibo de la petición aprobada.',
        ],
      },
      {
        en: [
          'Copy of the certified Labor Condition Application',
          'Form ETA-9035, certified by the Department of Labor before the petition was filed.',
        ],
        pt: [
          'Cópia da Labor Condition Application certificada',
          'Formulário ETA-9035, certificado pelo Departamento do Trabalho antes do protocolo da petição.',
        ],
        es: [
          'Copia de la Labor Condition Application certificada',
          'Formulario ETA-9035, certificado por el Departamento de Trabajo antes de presentar la petición.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Degree certificates and transcripts',
          'The role must require at least a bachelor in a specific field, and you must hold it.',
        ],
        pt: [
          'Diplomas e históricos escolares',
          'A vaga precisa exigir no mínimo bacharelado em área específica, e você precisa tê-lo.',
        ],
        es: [
          'Títulos y expedientes académicos',
          'El puesto debe exigir al menos una licenciatura en un área específica, y usted debe tenerla.',
        ],
      },
      {
        en: [
          'Credential evaluation of a foreign degree',
          'An equivalency report to a US bachelor, from a recognised evaluator.',
        ],
        pt: [
          'Equivalência do diploma estrangeiro',
          'Laudo de equivalência a um bacharelado americano, feito por avaliador reconhecido.',
        ],
        es: [
          'Homologación del título extranjero',
          'Informe de equivalencia a una licenciatura estadounidense, de un evaluador reconocido.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Professional licence',
          'Where the occupation requires one in the state of employment.',
        ],
        pt: [
          'Registro profissional',
          'Onde a ocupação exigir licença no estado de trabalho.',
        ],
        es: [
          'Licencia profesional',
          'Cuando la ocupación la exija en el estado de empleo.',
        ],
        priority: 3,
        required: false,
      },
      {
        en: [
          'Experience letters in place of a degree',
          'Three years of specialised experience may substitute for each year of university study.',
        ],
        pt: [
          'Cartas de experiência no lugar do diploma',
          'Três anos de experiência especializada podem substituir cada ano de estudo universitário.',
        ],
        es: [
          'Cartas de experiencia en lugar del título',
          'Tres años de experiencia especializada pueden sustituir cada año de estudio universitario.',
        ],
        priority: 3,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Offer letter stating the salary',
          'Must reach the prevailing wage for the occupation in that location, not merely the market rate.',
        ],
        pt: [
          'Carta de oferta com o salário',
          'Precisa atingir o prevailing wage da ocupação naquela localidade, não apenas o valor de mercado.',
        ],
        es: [
          'Carta de oferta con el salario',
          'Debe alcanzar el prevailing wage de la ocupación en esa localidad, no solo el valor de mercado.',
        ],
      },
      {
        en: [
          'Evidence the employer can pay the wage',
          'Financial statements or tax returns, above all from smaller companies.',
        ],
        pt: [
          'Comprovação de que o empregador consegue pagar',
          'Demonstrações financeiras ou declarações de imposto, sobretudo em empresas menores.',
        ],
        es: [
          'Prueba de que el empleador puede pagar',
          'Estados financieros o declaraciones de impuestos, sobre todo en empresas pequeñas.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Employer registers you in the H-1B lottery',
          'Electronic registration in the annual window. The cap is allocated by random selection — most registrations are not picked.',
        ],
        pt: [
          'Empregador registra você no sorteio do H-1B',
          'Registro eletrônico na janela anual. A cota é sorteada — a maior parte dos registros não é selecionada.',
        ],
        es: [
          'El empleador le registra en el sorteo del H-1B',
          'Registro electrónico en la ventana anual. El cupo se asigna por sorteo: la mayoría de los registros no sale seleccionada.',
        ],
      },
      {
        en: [
          'Employer files the I-129 after selection',
          'Only registrations that are selected move on to the petition.',
        ],
        pt: [
          'Empregador protocola o I-129 após a seleção',
          'Só registros selecionados avançam para a petição.',
        ],
        es: [
          'El empleador presenta el I-129 tras la selección',
          'Solo los registros seleccionados pasan a la petición.',
        ],
      },
      {
        en: [
          'Complete the DS-160 online',
          'Only after the petition is approved.',
        ],
        pt: [
          'Preencher o DS-160 online',
          'Só depois de a petição estar aprovada.',
        ],
        es: [
          'Completar el DS-160 en línea',
          'Solo después de que la petición esté aprobada.',
        ],
      },
      {
        en: [
          'Pay the MRV application fee',
          'Petition-based categories pay a different amount from tourist and student ones.',
        ],
        pt: [
          'Pagar a taxa MRV',
          'Categorias baseadas em petição pagam valor diferente do de turismo e estudo.',
        ],
        es: [
          'Pagar la tasa MRV',
          'Las categorías basadas en petición pagan un importe distinto al de turismo y estudio.',
        ],
      },
      {
        en: [
          'Schedule and attend the consular interview',
          'The questions are about the role, the employer and your qualification for it.',
        ],
        pt: [
          'Agendar e comparecer à entrevista consular',
          'As perguntas são sobre a função, o empregador e sua qualificação para ela.',
        ],
        es: [
          'Agendar y asistir a la entrevista consular',
          'Las preguntas son sobre el puesto, el empleador y su cualificación para él.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprint collection',
          'Taken at the Applicant Service Center or at the consulate on the interview day.',
        ],
        pt: [
          'Coleta de impressões digitais',
          'Feita no Centro de Atendimento ao Solicitante ou no consulado, no dia da entrevista.',
        ],
        es: [
          'Toma de huellas dactilares',
          'Se realiza en el Centro de Atención al Solicitante o en el consulado el día de la entrevista.',
        ],
      },
      {
        en: ['Medical exam', 'Not required for nonimmigrant work categories.'],
        pt: [
          'Exame médico',
          'Não é exigido nas categorias de trabalho de não-imigrante.',
        ],
        es: [
          'Examen médico',
          'No se exige en las categorías de trabajo de no inmigrante.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the passport with the visa',
          'Check that the employer name printed on it is correct.',
        ],
        pt: [
          'Retirar o passaporte com o visto',
          'Confira se o nome do empregador impresso está correto.',
        ],
        es: [
          'Retirar el pasaporte con el visado',
          'Verifique que el nombre del empleador impreso sea correcto.',
        ],
      },
      {
        en: [
          'Do not enter more than 10 days before the petition start date',
          'The H window is far narrower than the student one.',
        ],
        pt: [
          'Não entrar mais de 10 dias antes do início da petição',
          'A janela do H é bem mais estreita que a do estudante.',
        ],
        es: [
          'No entrar más de 10 días antes del inicio de la petición',
          'La ventana del H es mucho más estrecha que la del estudiante.',
        ],
      },
      {
        en: [
          'Keep copies of the I-797 and the LCA',
          'You will need them for every extension and for any change of employer.',
        ],
        pt: [
          'Guardar cópias do I-797 e da LCA',
          'Você precisará delas em toda prorrogação e em qualquer troca de empregador.',
        ],
        es: [
          'Guardar copias del I-797 y de la LCA',
          'Las necesitará en cada prórroga y en cualquier cambio de empleador.',
        ],
      },
      {
        en: [
          'Understand that the status is tied to the employer',
          'A new employer must file its own petition before you start. Leaving without a transfer ends the status.',
        ],
        pt: [
          'Entender que o status é vinculado ao empregador',
          'Um novo empregador precisa protocolar a própria petição antes de você começar. Sair sem transferência encerra o status.',
        ],
        es: [
          'Entender que el estatus está ligado al empleador',
          'Un nuevo empleador debe presentar su propia petición antes de que empiece. Salir sin traslado cancela el estatus.',
        ],
      },
      {
        en: [
          'Track the six-year limit',
          'Extensions beyond it require a permanent residence process already under way.',
        ],
        pt: [
          'Acompanhar o limite de seis anos',
          'Prorrogar além dele exige um processo de residência permanente já em andamento.',
        ],
        es: [
          'Vigilar el límite de seis años',
          'Prorrogar más allá exige un proceso de residencia permanente ya en marcha.',
        ],
        priority: 2,
      },
    ],
  },

  'Intracompany Transfer Visa (L-1)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Should cover the petition period, with the six-month margin.',
        ],
        pt: [
          'Passaporte válido',
          'Deve cobrir o período da petição, com a margem de seis meses.',
        ],
        es: [
          'Pasaporte vigente',
          'Debe cubrir el periodo de la petición, con el margen de seis meses.',
        ],
      },
      {
        en: [
          'I-797 approval notice, or the I-129S under a blanket L',
          'Companies with a blanket approval skip the individual petition and go straight to the consulate with the I-129S.',
        ],
        pt: [
          'Notificação I-797, ou o I-129S no blanket L',
          'Empresas com aprovação blanket pulam a petição individual e vão direto ao consulado com o I-129S.',
        ],
        es: [
          'Notificación I-797, o el I-129S en el blanket L',
          'Las empresas con aprobación blanket se saltan la petición individual y acuden al consulado con el I-129S.',
        ],
      },
      {
        en: [
          'Photograph to US specification',
          '5x5 cm, white background, taken in the last six months.',
        ],
        pt: [
          'Foto no padrão norte-americano',
          '5x5 cm, fundo branco, tirada nos últimos seis meses.',
        ],
        es: [
          'Fotografía según el estándar estadounidense',
          '5x5 cm, fondo blanco, tomada en los últimos seis meses.',
        ],
      },
      {
        en: [
          'DS-160 confirmation page',
          'Any error requires filling out a new form from scratch.',
        ],
        pt: [
          'Página de confirmação do DS-160',
          'Qualquer erro obriga a refazer o formulário do zero.',
        ],
        es: [
          'Página de confirmación del DS-160',
          'Cualquier error obliga a rehacer el formulario desde cero.',
        ],
      },
      {
        en: [
          'Evidence of the relationship between the companies',
          'Parent, branch, subsidiary or affiliate — proven by shareholding structure, not merely asserted.',
        ],
        pt: [
          'Comprovação do vínculo entre as empresas',
          'Matriz, filial, subsidiária ou coligada — comprovado pela estrutura societária, não apenas afirmado.',
        ],
        es: [
          'Prueba del vínculo entre las empresas',
          'Matriz, sucursal, filial o afiliada: se demuestra con la estructura societaria, no basta afirmarlo.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Proof of one year of employment abroad',
          'Continuous, within the three years before the transfer. This is the requirement that most often sinks the petition.',
        ],
        pt: [
          'Comprovação de um ano de trabalho no exterior',
          'Contínuo, dentro dos três anos anteriores à transferência. É o requisito que mais derruba a petição.',
        ],
        es: [
          'Prueba de un año de trabajo en el exterior',
          'Continuo, dentro de los tres años previos al traslado. Es el requisito que más veces tumba la petición.',
        ],
      },
      {
        en: [
          'Detailed description of your role',
          'L-1A managerial or executive, L-1B specialised knowledge. The distinction decides your maximum stay.',
        ],
        pt: [
          'Descrição detalhada da sua função',
          'L-1A gerencial ou executiva, L-1B conhecimento especializado. A distinção define seu prazo máximo.',
        ],
        es: [
          'Descripción detallada de su función',
          'L-1A directiva o ejecutiva, L-1B conocimiento especializado. La distinción define su plazo máximo.',
        ],
      },
      {
        en: [
          'Organisation charts before and after the transfer',
          'They show who reports to you, which is what supports an L-1A.',
        ],
        pt: [
          'Organogramas antes e depois da transferência',
          'Mostram quem se reporta a você, que é o que sustenta um L-1A.',
        ],
        es: [
          'Organigramas antes y después del traslado',
          'Muestran quién le reporta, que es lo que sustenta un L-1A.',
        ],
        priority: 2,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Offer letter for the US role',
          'Stating job title, duties, salary and duration.',
        ],
        pt: [
          'Carta de oferta para a função nos EUA',
          'Com cargo, atribuições, salário e duração.',
        ],
        es: [
          'Carta de oferta para el puesto en EE. UU.',
          'Con cargo, funciones, salario y duración.',
        ],
      },
      {
        en: [
          'Evidence the US entity is trading',
          'For a new office, proof of premises and a business plan for the first year.',
        ],
        pt: [
          'Comprovação de que a entidade americana opera',
          'Em escritório novo, comprovação de instalações e plano de negócios do primeiro ano.',
        ],
        es: [
          'Prueba de que la entidad estadounidense opera',
          'En oficina nueva, prueba de instalaciones y plan de negocio del primer año.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Employer files the I-129 with the L supplement',
          'There is no annual cap or lottery here, unlike the H-1B.',
        ],
        pt: [
          'Empregador protocola o I-129 com o suplemento L',
          'Aqui não há cota anual nem sorteio, ao contrário do H-1B.',
        ],
        es: [
          'El empleador presenta el I-129 con el suplemento L',
          'Aquí no hay cupo anual ni sorteo, a diferencia del H-1B.',
        ],
      },
      {
        en: [
          'Complete the DS-160 online',
          'Enter the petition receipt number, or the blanket data.',
        ],
        pt: [
          'Preencher o DS-160 online',
          'Informe o número de recibo da petição, ou os dados do blanket.',
        ],
        es: [
          'Completar el DS-160 en línea',
          'Indique el número de recibo de la petición, o los datos del blanket.',
        ],
      },
      {
        en: [
          'Pay the MRV application fee',
          'Petition-based categories pay a different amount. Blanket L has an extra fee.',
        ],
        pt: [
          'Pagar a taxa MRV',
          'Categorias baseadas em petição pagam valor diferente. O blanket L tem taxa adicional.',
        ],
        es: [
          'Pagar la tasa MRV',
          'Las categorías basadas en petición pagan un importe distinto. El blanket L tiene una tasa adicional.',
        ],
      },
      {
        en: [
          'Schedule and attend the consular interview',
          'Under a blanket L the consulate assesses eligibility itself, so the interview weighs more.',
        ],
        pt: [
          'Agendar e comparecer à entrevista consular',
          'No blanket L quem avalia a elegibilidade é o próprio consulado, então a entrevista pesa mais.',
        ],
        es: [
          'Agendar y asistir a la entrevista consular',
          'En el blanket L es el propio consulado quien evalúa la elegibilidad, así que la entrevista pesa más.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprint collection',
          'Taken at the Applicant Service Center or at the consulate on the interview day.',
        ],
        pt: [
          'Coleta de impressões digitais',
          'Feita no Centro de Atendimento ao Solicitante ou no consulado, no dia da entrevista.',
        ],
        es: [
          'Toma de huellas dactilares',
          'Se realiza en el Centro de Atención al Solicitante o en el consulado el día de la entrevista.',
        ],
      },
      {
        en: ['Medical exam', 'Not required for nonimmigrant work categories.'],
        pt: [
          'Exame médico',
          'Não é exigido nas categorias de trabalho de não-imigrante.',
        ],
        es: [
          'Examen médico',
          'No se exige en las categorías de trabajo de no inmigrante.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the passport with the visa',
          'Check whether it says L-1A or L-1B: the maximum stay differs.',
        ],
        pt: [
          'Retirar o passaporte com o visto',
          'Confira se está L-1A ou L-1B: o prazo máximo é diferente.',
        ],
        es: [
          'Retirar el pasaporte con el visado',
          'Verifique si dice L-1A o L-1B: el plazo máximo difiere.',
        ],
      },
      {
        en: [
          'Note the maximum stay for your subcategory',
          'Seven years for L-1A, five for L-1B, counted cumulatively across all your US stays.',
        ],
        pt: [
          'Anotar o prazo máximo da sua subcategoria',
          'Sete anos no L-1A, cinco no L-1B, contados de forma cumulativa somando todas as suas estadas nos EUA.',
        ],
        es: [
          'Anotar el plazo máximo de su subcategoría',
          'Siete años en L-1A, cinco en L-1B, contados de forma acumulada sumando todas sus estancias en EE. UU.',
        ],
      },
      {
        en: [
          'Keep the petition documents for extensions',
          'A new office L-1 starts with only one year and has to prove it is trading in order to renew.',
        ],
        pt: [
          'Guardar os documentos da petição para prorrogações',
          'Um L-1 de escritório novo começa com apenas um ano e precisa comprovar operação para renovar.',
        ],
        es: [
          'Guardar los documentos de la petición para prórrogas',
          'Un L-1 de oficina nueva empieza con solo un año y debe demostrar que opera para renovar.',
        ],
      },
      {
        en: [
          'Consider the EB-1C route to permanent residence',
          'L-1A managers often qualify without needing labour certification, which cuts years off the process.',
        ],
        pt: [
          'Avaliar a rota EB-1C para residência permanente',
          'Gerentes em L-1A costumam qualificar sem precisar de labor certification, o que corta anos do processo.',
        ],
        es: [
          'Evaluar la vía EB-1C hacia la residencia permanente',
          'Los gerentes en L-1A suelen calificar sin necesidad de labor certification, lo que recorta años del proceso.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },

  'EB-5 Immigrant Investor Visa': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Required for every family member included in the application.',
        ],
        pt: [
          'Passaporte válido',
          'Exigido para cada familiar incluído no pedido.',
        ],
        es: [
          'Pasaporte vigente',
          'Exigido para cada familiar incluido en la solicitud.',
        ],
      },
      {
        en: [
          'Birth certificate and civil status documents',
          'Marriage, divorce or death certificates where applicable, for the whole family.',
        ],
        pt: [
          'Certidão de nascimento e documentos de estado civil',
          'Certidões de casamento, divórcio ou óbito quando aplicável, para toda a família.',
        ],
        es: [
          'Partida de nacimiento y documentos de estado civil',
          'Certificados de matrimonio, divorcio o defunción cuando corresponda, para toda la familia.',
        ],
      },
      {
        en: [
          'Police certificates',
          'From every country where you lived six months or more since turning 16.',
        ],
        pt: [
          'Certidões de antecedentes criminais',
          'De todo país onde você morou seis meses ou mais desde os 16 anos.',
        ],
        es: [
          'Certificados de antecedentes penales',
          'De todo país donde haya vivido seis meses o más desde los 16 años.',
        ],
      },
      {
        en: [
          'Photograph to US specification',
          '5x5 cm, white background, for each applicant.',
        ],
        pt: [
          'Foto no padrão norte-americano',
          '5x5 cm, fundo branco, para cada requerente.',
        ],
        es: [
          'Fotografía según el estándar estadounidense',
          '5x5 cm, fondo blanco, para cada solicitante.',
        ],
      },
      {
        en: [
          'Receipt and approval of Form I-526E',
          'The petition that establishes the investment. Everything downstream depends on it.',
        ],
        pt: [
          'Recibo e aprovação do Formulário I-526E',
          'É a petição que estabelece o investimento. Todo o resto depende dela.',
        ],
        es: [
          'Recibo y aprobación del Formulario I-526E',
          'Es la petición que establece la inversión. Todo lo demás depende de ella.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence of the invested amount',
          'The threshold is lower inside a targeted employment area. Confirm the figure in force on the day you invest.',
        ],
        pt: [
          'Comprovação do valor investido',
          'O piso é menor dentro de uma targeted employment area. Confirme o valor vigente na data do aporte.',
        ],
        es: [
          'Prueba del importe invertido',
          'El umbral es menor dentro de una targeted employment area. Confirme la cifra vigente el día de la inversión.',
        ],
      },
      {
        en: [
          'Complete lawful source of funds trail',
          'The heaviest part of the case: tax returns, sale contracts and bank records tracing every dollar from where it was earned to the enterprise.',
        ],
        pt: [
          'Rastreio completo da origem lícita dos recursos',
          'A parte mais pesada do processo: declarações de imposto, contratos de venda e extratos rastreando cada dólar da origem até o empreendimento.',
        ],
        es: [
          'Rastreo completo del origen lícito de los fondos',
          'La parte más pesada del caso: declaraciones de impuestos, contratos de venta y extractos que rastrean cada dólar desde su origen hasta la empresa.',
        ],
      },
      {
        en: [
          'Proof that the capital is at risk',
          'The money must be irrevocably committed to the enterprise; funds parked in escrow indefinitely do not count.',
        ],
        pt: [
          'Comprovação de que o capital está em risco',
          'O dinheiro precisa estar irrevogavelmente comprometido com o empreendimento; recurso parado em escrow por tempo indefinido não conta.',
        ],
        es: [
          'Prueba de que el capital está en riesgo',
          'El dinero debe estar irrevocablemente comprometido con la empresa; fondos estancados en escrow indefinidamente no cuentan.',
        ],
      },
      {
        en: [
          'Business plan showing ten full-time jobs',
          'Created or preserved for qualifying US workers within two years.',
        ],
        pt: [
          'Plano de negócios demonstrando dez empregos em tempo integral',
          'Criados ou preservados para trabalhadores americanos qualificados dentro de dois anos.',
        ],
        es: [
          'Plan de negocio que demuestre diez empleos a tiempo completo',
          'Creados o preservados para trabajadores estadounidenses cualificados en un plazo de dos años.',
        ],
      },
      {
        en: [
          'Regional centre documents',
          'If you invest through one, the offering memorandum and the subscription agreement. Check that the centre is currently designated.',
        ],
        pt: [
          'Documentos do regional center',
          'Se investir por um deles, o offering memorandum e o contrato de subscrição. Verifique se o centro está designado no momento.',
        ],
        es: [
          'Documentos del regional center',
          'Si invierte a través de uno, el offering memorandum y el contrato de suscripción. Verifique que el centro esté designado actualmente.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'File Form I-526E',
          'Filed by the investor, not by an employer. Processing takes years.',
        ],
        pt: [
          'Protocolar o Formulário I-526E',
          'Protocolado pelo próprio investidor, não por um empregador. A análise leva anos.',
        ],
        es: [
          'Presentar el Formulario I-526E',
          'Lo presenta el propio inversor, no un empleador. El análisis tarda años.',
        ],
      },
      {
        en: [
          'Choose consular processing or adjustment of status',
          'DS-260 abroad, or Form I-485 if you are already lawfully in the US.',
        ],
        pt: [
          'Escolher processamento consular ou ajuste de status',
          'DS-260 no exterior, ou Formulário I-485 se você já estiver legalmente nos EUA.',
        ],
        es: [
          'Elegir procesamiento consular o ajuste de estatus',
          'DS-260 en el exterior, o Formulario I-485 si ya está legalmente en EE. UU.',
        ],
      },
      {
        en: [
          'Pay the immigrant visa fees',
          'Separate from the investment and from the petition fee.',
        ],
        pt: [
          'Pagar as taxas do visto de imigrante',
          'Separadas do investimento e da taxa da petição.',
        ],
        es: [
          'Pagar las tasas del visado de inmigrante',
          'Independientes de la inversión y de la tasa de la petición.',
        ],
      },
      {
        en: [
          'Attend the immigrant visa interview',
          'The questions cover the source of the funds and your role in the enterprise.',
        ],
        pt: [
          'Comparecer à entrevista de visto de imigrante',
          'As perguntas cobrem a origem dos recursos e seu papel no empreendimento.',
        ],
        es: [
          'Asistir a la entrevista de visado de inmigrante',
          'Las preguntas cubren el origen de los fondos y su papel en la empresa.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: ['Fingerprint collection', 'For every applicant aged 14 or over.'],
        pt: [
          'Coleta de impressões digitais',
          'Para cada requerente de 14 anos ou mais.',
        ],
        es: [
          'Toma de huellas dactilares',
          'Para cada solicitante de 14 años o más.',
        ],
      },
      {
        en: [
          'Medical exam by a panel physician',
          'Mandatory in immigrant categories. Only doctors approved by the consulate may perform it.',
        ],
        pt: [
          'Exame médico com médico credenciado',
          'Obrigatório nas categorias de imigrante. Só médicos aprovados pelo consulado podem fazê-lo.',
        ],
        es: [
          'Examen médico con médico acreditado',
          'Obligatorio en las categorías de inmigrante. Solo médicos aprobados por el consulado pueden realizarlo.',
        ],
      },
      {
        en: [
          'Vaccination record',
          'Part of the medical exam; missing doses can be given on the spot.',
        ],
        pt: [
          'Comprovante de vacinação',
          'Faz parte do exame médico; doses em falta podem ser aplicadas na hora.',
        ],
        es: [
          'Comprobante de vacunación',
          'Forma parte del examen médico; las dosis faltantes pueden aplicarse en el momento.',
        ],
        priority: 2,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Enter on the immigrant visa',
          'Conditional permanent residence begins on the day you are admitted.',
        ],
        pt: [
          'Entrar com o visto de imigrante',
          'A residência permanente condicional começa no dia da admissão.',
        ],
        es: [
          'Entrar con el visado de inmigrante',
          'La residencia permanente condicional empieza el día de la admisión.',
        ],
      },
      {
        en: [
          'Receive the conditional green card',
          'Valid for two years, for you and for the family included.',
        ],
        pt: [
          'Receber o green card condicional',
          'Válido por dois anos, para você e para a família incluída.',
        ],
        es: [
          'Recibir la green card condicional',
          'Válida por dos años, para usted y para la familia incluida.',
        ],
      },
      {
        en: [
          'File Form I-829 to remove the conditions',
          'In the 90 days before the two-year card expires, proving the jobs were created. Missing the window costs the residence.',
        ],
        pt: [
          'Protocolar o Formulário I-829 para remover as condições',
          'Nos 90 dias anteriores ao vencimento do cartão de dois anos, comprovando que os empregos foram criados. Perder a janela custa a residência.',
        ],
        es: [
          'Presentar el Formulario I-829 para retirar las condiciones',
          'En los 90 días previos al vencimiento de la tarjeta de dos años, demostrando que los empleos se crearon. Perder la ventana cuesta la residencia.',
        ],
      },
      {
        en: [
          'Track the residence requirement for naturalisation',
          'The clock starts from the conditional residence, not from removal of the conditions.',
        ],
        pt: [
          'Acompanhar o requisito de residência para naturalização',
          'A contagem começa na residência condicional, não na remoção das condições.',
        ],
        es: [
          'Vigilar el requisito de residencia para la naturalización',
          'El cómputo empieza en la residencia condicional, no al retirar las condiciones.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
