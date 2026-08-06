import type { CountryVisaSteps } from './types';

/**
 * Steps for South Africa.
 *
 * The rule that catches most people is that status cannot be changed from
 * inside the country: someone who entered as a visitor generally has to leave
 * and apply again from abroad, and only narrow exceptional circumstances are
 * accepted. Planning the entry category correctly is therefore not a detail.
 *
 * Two evaluations sit in front of the qualified routes and both take months.
 * SAQA must benchmark the foreign degree before a work visa is filed, and
 * regulated occupations must also register with their South African council.
 * The critical skills list itself is revised and has already been rewritten
 * substantially, so the occupation has to be checked against the current list
 * rather than against what worked for someone else.
 *
 * Police clearance is required from every country lived in for twelve months
 * or more since turning eighteen, and travelling minors need the unabridged
 * birth certificate showing both parents. Both requirements surprise families
 * at the airport far more often than they should.
 */
export const southAfrica: CountryVisaSteps = {
  'Visitor Visa': {
    core_documents: [
      {
        en: [
          'Passport with two blank facing pages',
          'Valid for at least thirty days beyond the intended departure date. Airlines refuse boarding when the two facing pages are missing, whatever the visa says.',
        ],
        pt: [
          'Passaporte com duas páginas em branco frente a frente',
          'Válido por pelo menos trinta dias após a data prevista de saída. Companhias aéreas negam embarque quando faltam as duas páginas frente a frente, independentemente do visto.',
        ],
        es: [
          'Pasaporte con dos páginas en blanco enfrentadas',
          'Vigente al menos treinta días más allá de la fecha prevista de salida. Las aerolíneas niegan el embarque cuando faltan las dos páginas enfrentadas, diga lo que diga el visado.',
        ],
      },
      {
        en: [
          'Completed visitor visa application form',
          'Form DHA-84, signed by hand. Forms that are unsigned or left partly blank are handed back at the counter instead of being assessed.',
        ],
        pt: [
          'Formulário de pedido de visto de visitante preenchido',
          'Formulário DHA-84, assinado à mão. Formulários sem assinatura ou parcialmente em branco são devolvidos no balcão em vez de serem analisados.',
        ],
        es: [
          'Formulario de solicitud de visado de visitante completo',
          'Formulario DHA-84, firmado a mano. Los formularios sin firma o parcialmente en blanco se devuelven en el mostrador en lugar de evaluarse.',
        ],
      },
      {
        en: [
          'Two identical passport photographs',
          'Recent, in colour, on a plain light background. One stays with the centre and the other is attached to the file.',
        ],
        pt: [
          'Duas fotografias iguais tipo passaporte',
          'Recentes, coloridas, em fundo claro liso. Uma fica com o centro de atendimento e a outra é anexada ao processo.',
        ],
        es: [
          'Dos fotografías idénticas tipo pasaporte',
          'Recientes, en color, con fondo claro liso. Una se queda en el centro y la otra se adjunta al expediente.',
        ],
      },
      {
        en: [
          'Confirmed return or onward ticket',
          'The period stamped at the border is often matched to this date, so an open-ended ticket invites a shorter stay than you asked for.',
        ],
        pt: [
          'Passagem de volta ou de continuação confirmada',
          'O prazo carimbado na fronteira costuma ser ajustado a essa data, então bilhete em aberto acaba resultando numa estada menor do que a pedida.',
        ],
        es: [
          'Billete de vuelta o de continuación confirmado',
          'El plazo sellado en la frontera suele ajustarse a esa fecha, de modo que un billete abierto acaba dando una estancia menor que la solicitada.',
        ],
      },
      {
        en: [
          'Proof of accommodation or an invitation letter',
          'Hotel reservations, or a letter from your host giving their address with a copy of their identity document.',
        ],
        pt: [
          'Comprovativo de alojamento ou carta convite',
          'Reservas de hotel, ou carta do anfitrião com o endereço dele e cópia do documento de identidade.',
        ],
        es: [
          'Comprobante de alojamiento o carta de invitación',
          'Reservas de hotel, o carta del anfitrión con su domicilio y copia de su documento de identidad.',
        ],
      },
      {
        en: [
          'Unabridged birth certificate for any traveller under eighteen',
          'South Africa requires the full certificate naming both parents. The short form issued by default in many countries is refused, and ordering the long form takes weeks.',
        ],
        pt: [
          'Certidão de nascimento completa para menores de dezoito anos',
          'A África do Sul exige a certidão integral com o nome dos dois pais. A versão resumida emitida por padrão em muitos países é recusada, e pedir a completa leva semanas.',
        ],
        es: [
          'Partida de nacimiento íntegra para menores de dieciocho años',
          'Sudáfrica exige el certificado completo con el nombre de ambos progenitores. La versión resumida que se emite por defecto en muchos países se rechaza, y pedir la íntegra tarda semanas.',
        ],
      },
      {
        en: [
          'Parental consent affidavit when a minor travels with one parent',
          'Sworn shortly before travel and accompanied by a copy of the absent parent passport. Missing it stops the family at check-in, not at immigration.',
        ],
        pt: [
          'Declaração juramentada de consentimento parental para menor com um só responsável',
          'Feita pouco antes da viagem e acompanhada de cópia do passaporte do pai ou mãe ausente. Sem ela a família é barrada no check-in, não na imigração.',
        ],
        es: [
          'Declaración jurada de consentimiento parental cuando el menor viaja con un solo progenitor',
          'Otorgada poco antes del viaje y acompañada de copia del pasaporte del progenitor ausente. Sin ella la familia queda detenida en la facturación, no en inmigración.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Bank statements for the last three months',
          'Stamped by the bank or printed from the account with the holder name visible; screenshots of a banking app are commonly rejected.',
        ],
        pt: [
          'Extratos bancários dos últimos três meses',
          'Carimbados pelo banco ou emitidos com o nome do titular visível; capturas de tela do aplicativo costumam ser recusadas.',
        ],
        es: [
          'Extractos bancarios de los últimos tres meses',
          'Sellados por el banco o emitidos con el nombre del titular visible; las capturas de pantalla de la aplicación suelen rechazarse.',
        ],
      },
      {
        en: [
          'Proof of sufficient funds for the whole stay',
          'No figure is published. The officer weighs the balance against the length and nature of the trip, so confirm what the mission handling your file expects.',
        ],
        pt: [
          'Comprovação de recursos suficientes para toda a estada',
          'Não há valor publicado. O agente pesa o saldo contra a duração e o tipo da viagem, então confirme o que a representação que analisa seu processo espera.',
        ],
        es: [
          'Prueba de fondos suficientes para toda la estancia',
          'No hay cifra publicada. El funcionario compara el saldo con la duración y el tipo de viaje, así que confirme qué espera la representación que tramita su expediente.',
        ],
      },
      {
        en: [
          'Evidence of ties to your country of residence',
          'An employer letter, study registration or property. This is what answers the real question, which is whether you intend to leave.',
        ],
        pt: [
          'Comprovação de vínculos com seu país de residência',
          'Carta do empregador, matrícula de estudo ou bens. É isso que responde à pergunta real, que é se você pretende voltar.',
        ],
        es: [
          'Prueba de arraigo en su país de residencia',
          'Carta del empleador, matrícula de estudios o bienes. Es lo que responde a la pregunta real, que es si piensa marcharse.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Book an appointment at a VFS Global centre',
          'South Africa outsources intake. Applications posted or emailed straight to a mission are not processed at all.',
        ],
        pt: [
          'Agendar atendimento num centro VFS Global',
          'A África do Sul terceiriza a recepção. Pedidos enviados por correio ou e-mail direto à representação simplesmente não são processados.',
        ],
        es: [
          'Reservar cita en un centro VFS Global',
          'Sudáfrica externaliza la recepción. Las solicitudes enviadas por correo o correo electrónico a la representación no se tramitan.',
        ],
      },
      {
        en: [
          'Pay the visitor visa fee at submission',
          'Charged per applicant including children, and never refunded, including when the application is refused. Confirm the amount in force for your country.',
        ],
        pt: [
          'Pagar a taxa do visto de visitante na entrega',
          'Cobrada por requerente, inclusive crianças, e nunca devolvida, mesmo em caso de indeferimento. Confirme o valor vigente para o seu país.',
        ],
        es: [
          'Pagar la tasa del visado de visitante al presentar',
          'Se cobra por solicitante, incluidos los niños, y no se devuelve nunca, tampoco si deniegan. Confirme el importe vigente para su país.',
        ],
      },
      {
        en: [
          'Apply in the country where you are lawfully resident',
          'A mission will decline a file from someone who is merely visiting that country on a short-stay permission.',
        ],
        pt: [
          'Pedir no país onde você reside legalmente',
          'A representação recusa o processo de quem apenas está de passagem naquele país com uma autorização de curta duração.',
        ],
        es: [
          'Solicitar en el país donde reside legalmente',
          'La representación rechaza el expediente de quien solo está de paso en ese país con una autorización de corta duración.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints and photograph at the centre',
          'Captured at submission. The applicant must appear in person even when an agent prepared the whole file.',
        ],
        pt: [
          'Impressões digitais e fotografia no centro',
          'Recolhidas na entrega. O requerente precisa comparecer pessoalmente mesmo que um despachante tenha montado todo o processo.',
        ],
        es: [
          'Huellas y fotografía en el centro',
          'Se toman al presentar. El solicitante debe acudir en persona aunque un gestor haya preparado todo el expediente.',
        ],
      },
      {
        en: [
          'Yellow fever vaccination certificate',
          'Demanded from travellers arriving from or transiting a country at risk. Without it entry can be refused on the spot at the airport.',
        ],
        pt: [
          'Certificado de vacinação contra febre amarela',
          'Exigido de quem chega de país de risco ou faz escala nele. Sem ele a entrada pode ser recusada na hora, no aeroporto.',
        ],
        es: [
          'Certificado de vacunación contra la fiebre amarilla',
          'Se exige a quien llega de un país de riesgo o hace escala en él. Sin él la entrada puede denegarse en el propio aeropuerto.',
        ],
      },
      {
        en: [
          'Medical and radiological report for longer stays',
          'Visitor visas beyond three months attract the same health reports as the work categories, including a chest x-ray report.',
        ],
        pt: [
          'Relatório médico e radiológico para estadas mais longas',
          'Vistos de visitante acima de três meses exigem os mesmos laudos de saúde das categorias de trabalho, incluindo o laudo de raio-x de tórax.',
        ],
        es: [
          'Informe médico y radiológico para estancias más largas',
          'Los visados de visitante de más de tres meses exigen los mismos informes sanitarios que las categorías laborales, incluida la radiografía de tórax.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Check the stamp given at the port of entry',
          'The immigration officer decides the actual period allowed and it can be shorter than the visa. The stamp governs, not the sticker.',
        ],
        pt: [
          'Conferir o carimbo dado no posto de entrada',
          'O oficial de imigração define o prazo real permitido e ele pode ser menor que o do visto. Vale o carimbo, não o adesivo.',
        ],
        es: [
          'Revisar el sello puesto en el puesto de entrada',
          'El funcionario de inmigración fija el plazo real permitido y puede ser menor que el del visado. Manda el sello, no la etiqueta.',
        ],
      },
      {
        en: [
          'Do not try to change status from inside South Africa',
          'Someone who entered as a visitor generally cannot switch to a work or study visa without leaving the country. Only narrow exceptional circumstances are accepted, and this is the single most common mistake.',
        ],
        pt: [
          'Não tentar mudar de status de dentro da África do Sul',
          'Quem entrou como visitante em geral não pode passar para visto de trabalho ou estudo sem sair do país. Só circunstâncias excepcionais bem estreitas são aceitas, e esse é o erro mais comum de todos.',
        ],
        es: [
          'No intentar cambiar de estatus desde dentro de Sudáfrica',
          'Quien entró como visitante por lo general no puede pasar a un visado de trabajo o estudio sin salir del país. Solo se aceptan circunstancias excepcionales muy acotadas, y este es el error más frecuente.',
        ],
      },
      {
        en: [
          'Apply for an extension well before the stamp expires',
          'Filed with the Department of Home Affairs at least sixty days ahead. A late application is treated as an overstay, not as a pending request.',
        ],
        pt: [
          'Pedir prorrogação bem antes de o carimbo vencer',
          'Protocolada no Department of Home Affairs com pelo menos sessenta dias de antecedência. Pedido tardio é tratado como permanência irregular, não como requerimento pendente.',
        ],
        es: [
          'Solicitar la prórroga bastante antes de que venza el sello',
          'Se presenta ante el Department of Home Affairs con al menos sesenta días de antelación. Una solicitud tardía se trata como estancia irregular, no como petición pendiente.',
        ],
      },
      {
        en: [
          'Never overstay, not even by a single day',
          'An overstay leads to being declared an undesirable person, which bars re-entry for twelve months and up to five years depending on the length.',
        ],
        pt: [
          'Nunca ficar além do prazo, nem por um único dia',
          'A permanência irregular leva à declaração de pessoa indesejada, que barra o reingresso por doze meses e até cinco anos conforme o tempo excedido.',
        ],
        es: [
          'No exceder el plazo ni un solo día',
          'La estancia irregular lleva a la declaración de persona indeseable, que impide reingresar durante doce meses y hasta cinco años según lo excedido.',
        ],
      },
      {
        en: [
          'Do not take up work on a visitor visa',
          'Short work engagements need a specific authorisation endorsed on the visa. Unauthorised work ends the current visa and poisons future applications.',
        ],
        pt: [
          'Não trabalhar com visto de visitante',
          'Trabalhos curtos exigem autorização específica averbada no visto. Trabalho não autorizado encerra o visto atual e contamina pedidos futuros.',
        ],
        es: [
          'No trabajar con visado de visitante',
          'Los trabajos breves requieren una autorización específica anotada en el visado. Trabajar sin autorización anula el visado actual y perjudica futuras solicitudes.',
        ],
      },
    ],
  },

  'Critical Skills Work Visa': {
    core_documents: [
      {
        en: [
          'Confirm the occupation appears on the current critical skills list',
          'The list is revised and has already been rewritten substantially. An occupation that qualified someone two years ago may not be there now, and the wording of your job must match the entry.',
        ],
        pt: [
          'Confirmar que a ocupação está na lista de competências críticas vigente',
          'A lista é revista e já foi reescrita de forma substancial. Uma ocupação que qualificou alguém há dois anos pode não estar mais lá, e a descrição da sua função precisa bater com o item da lista.',
        ],
        es: [
          'Confirmar que la ocupación figura en la lista de competencias críticas vigente',
          'La lista se revisa y ya fue reescrita de forma sustancial. Una ocupación que sirvió a alguien hace dos años puede ya no estar, y la denominación de su puesto debe coincidir con la entrada.',
        ],
      },
      {
        en: [
          'Passport covering the whole permit period',
          'The visa is never issued beyond passport validity, so renewing the passport first avoids seeing a five-year permit cut down to one.',
        ],
        pt: [
          'Passaporte que cubra todo o período da autorização',
          'O visto nunca é emitido além da validade do passaporte, então renovar o passaporte antes evita ver uma autorização de cinco anos reduzida a um.',
        ],
        es: [
          'Pasaporte que cubra todo el periodo del permiso',
          'El visado nunca se expide más allá de la vigencia del pasaporte, así que renovarlo antes evita que un permiso de cinco años quede reducido a uno.',
        ],
      },
      {
        en: [
          'Temporary residence visa application form',
          'Form DHA-1738, completed in full and signed in person at the moment of submission rather than in advance.',
        ],
        pt: [
          'Formulário de pedido de residência temporária',
          'Formulário DHA-1738, preenchido por completo e assinado presencialmente no momento da entrega, não antes.',
        ],
        es: [
          'Formulario de solicitud de residencia temporal',
          'Formulario DHA-1738, cumplimentado por completo y firmado en persona en el momento de la presentación, no antes.',
        ],
      },
      {
        en: [
          'Police clearance from every country lived in for twelve months or more',
          'Counted from the age of eighteen. Each certificate has its own lead time and this is the step that most often holds the file back.',
        ],
        pt: [
          'Atestado de antecedentes de cada país onde morou doze meses ou mais',
          'Contando a partir dos dezoito anos. Cada certidão tem seu próprio prazo de emissão e é essa a etapa que mais atrasa o processo.',
        ],
        es: [
          'Certificado de antecedentes de cada país donde vivió doce meses o más',
          'Contando desde los dieciocho años. Cada certificado tiene su propio plazo de emisión y es el paso que más retrasa el expediente.',
        ],
      },
      {
        en: [
          'Employment contract or a signed offer of employment',
          'Matching the critical skills occupation claimed and setting out salary, duties and duration in the same terms as the list entry.',
        ],
        pt: [
          'Contrato de trabalho ou proposta de emprego assinada',
          'Coerente com a ocupação de competência crítica alegada e detalhando salário, atribuições e duração nos mesmos termos do item da lista.',
        ],
        es: [
          'Contrato de trabajo u oferta de empleo firmada',
          'Coherente con la ocupación de competencia crítica alegada y con salario, funciones y duración en los mismos términos que la entrada de la lista.',
        ],
      },
      {
        en: [
          'Marriage and birth certificates for accompanying family',
          'Unabridged versions, legalised or apostilled, with sworn translations where they are not in English.',
        ],
        pt: [
          'Certidões de casamento e nascimento da família acompanhante',
          'Em versão completa, legalizadas ou apostiladas, com tradução juramentada quando não estiverem em inglês.',
        ],
        es: [
          'Certificados de matrimonio y nacimiento de la familia acompañante',
          'En versión íntegra, legalizados o apostillados, con traducción jurada cuando no estén en inglés.',
        ],
      },
    ],
    education: [
      {
        en: [
          'SAQA evaluation of the foreign qualification',
          'The South African Qualifications Authority must benchmark the degree before the visa is filed, and the evaluation itself takes months. Start it before anything else.',
        ],
        pt: [
          'Avaliação do diploma estrangeiro pela SAQA',
          'A South African Qualifications Authority precisa equiparar o diploma antes de o visto ser protocolado, e a avaliação em si leva meses. Comece por ela, antes de tudo.',
        ],
        es: [
          'Evaluación del título extranjero por la SAQA',
          'La South African Qualifications Authority debe homologar el título antes de presentar el visado, y la evaluación en sí tarda meses. Empiece por ahí, antes que nada.',
        ],
      },
      {
        en: [
          'Registration with the relevant professional body',
          'Engineers, health professionals and several other occupations must be registered with their South African council, and the confirmation letter forms part of the visa file.',
        ],
        pt: [
          'Registo no conselho profissional correspondente',
          'Engenheiros, profissionais de saúde e várias outras ocupações precisam estar registados no conselho sul-africano da área, e a carta de confirmação faz parte do processo de visto.',
        ],
        es: [
          'Inscripción en el colegio profesional correspondiente',
          'Ingenieros, profesionales sanitarios y otras ocupaciones deben inscribirse en su consejo sudafricano, y la carta de confirmación forma parte del expediente del visado.',
        ],
      },
      {
        en: [
          'Proof of post-qualification experience',
          'Letters from each employer confirming at least five years in the occupation, with dates and duties, on letterhead and signed.',
        ],
        pt: [
          'Comprovação de experiência após a formação',
          'Cartas de cada empregador confirmando pelo menos cinco anos na ocupação, com datas e atribuições, em papel timbrado e assinadas.',
        ],
        es: [
          'Prueba de experiencia posterior a la titulación',
          'Cartas de cada empleador que confirmen al menos cinco años en la ocupación, con fechas y funciones, en papel con membrete y firmadas.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Pay the temporary residence application fee',
          'Charged per applicant including children, due at submission, and not refunded if the visa is refused.',
        ],
        pt: [
          'Pagar a taxa de pedido de residência temporária',
          'Cobrada por requerente, inclusive crianças, devida na entrega e não devolvida se o visto for negado.',
        ],
        es: [
          'Pagar la tasa de solicitud de residencia temporal',
          'Se cobra por solicitante, incluidos los niños, se paga al presentar y no se devuelve si deniegan el visado.',
        ],
      },
      {
        en: [
          'Salary and conditions in line with the local market',
          'Do not rely on a figure heard from someone else. Confirm the terms customary for the occupation, because the adjudicator compares them against your contract.',
        ],
        pt: [
          'Salário e condições alinhados ao mercado local',
          'Não confie num valor ouvido de terceiros. Confirme as condições usuais da ocupação, porque o analista as compara com o seu contrato.',
        ],
        es: [
          'Salario y condiciones acordes con el mercado local',
          'No se fíe de una cifra que le contaron. Confirme las condiciones habituales de la ocupación, porque el evaluador las compara con su contrato.',
        ],
      },
      {
        en: [
          'Means of support when applying without a job offer',
          'The visa can be granted while you look for work, and then you must show you can sustain yourself in the meantime.',
        ],
        pt: [
          'Meios de subsistência ao pedir sem proposta de emprego',
          'O visto pode ser concedido enquanto você procura trabalho, e nesse caso é preciso demonstrar que consegue se manter nesse intervalo.',
        ],
        es: [
          'Medios de subsistencia al solicitar sin oferta de empleo',
          'El visado puede concederse mientras busca trabajo, y entonces hay que demostrar que puede mantenerse durante ese periodo.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Submit in person at a VFS Global centre abroad',
          'The application belongs in your country of residence. Entering as a tourist in order to apply from inside is refused as a matter of course.',
        ],
        pt: [
          'Entregar pessoalmente num centro VFS Global no exterior',
          'O pedido pertence ao seu país de residência. Entrar como turista para protocolar de dentro é recusado por princípio.',
        ],
        es: [
          'Presentar en persona en un centro VFS Global en el exterior',
          'La solicitud corresponde a su país de residencia. Entrar como turista para presentarla desde dentro se rechaza por norma.',
        ],
      },
      {
        en: [
          'Allow several months between filing and the start date',
          'Employers who fix a start date without slack end up reissuing the contract, and a reissued contract restarts parts of the assessment.',
        ],
        pt: [
          'Prever vários meses entre o protocolo e a data de início',
          'Empregadores que fixam data de início sem folga acabam reemitindo o contrato, e contrato reemitido reinicia partes da análise.',
        ],
        es: [
          'Prever varios meses entre la presentación y la fecha de inicio',
          'Los empleadores que fijan una fecha de inicio sin holgura acaban reexpidiendo el contrato, y eso reinicia partes de la evaluación.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric capture at the moment of submission',
          'Fingerprints and photograph are taken at the centre and every family member attends in person, including children.',
        ],
        pt: [
          'Recolha biométrica no momento da entrega',
          'Impressões digitais e fotografia são feitas no centro e cada familiar comparece pessoalmente, inclusive as crianças.',
        ],
        es: [
          'Toma de biometría en el momento de la presentación',
          'Las huellas y la fotografía se toman en el centro y cada familiar acude en persona, incluidos los niños.',
        ],
      },
      {
        en: [
          'Medical report from a registered practitioner',
          'Valid for six months only, so doing it too early forces a repeat before the decision comes through.',
        ],
        pt: [
          'Laudo médico emitido por profissional registado',
          'Válido por apenas seis meses, então fazê-lo cedo demais obriga a repetir antes de sair a decisão.',
        ],
        es: [
          'Informe médico emitido por un facultativo colegiado',
          'Válido solo seis meses, de modo que hacerlo demasiado pronto obliga a repetirlo antes de que salga la decisión.',
        ],
      },
      {
        en: [
          'Radiological report on tuberculosis',
          'A chest x-ray report is required. Pregnant applicants and young children are excused on presentation of proof.',
        ],
        pt: [
          'Laudo radiológico sobre tuberculose',
          'É exigido laudo de raio-x de tórax. Grávidas e crianças pequenas ficam dispensadas mediante comprovação.',
        ],
        es: [
          'Informe radiológico sobre tuberculosis',
          'Se exige informe de radiografía de tórax. Las solicitantes embarazadas y los niños pequeños quedan exentos presentando prueba.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Check the occupation endorsed on the visa',
          'The visa is issued for the specific critical skills occupation. Working outside it, even for the same employer, invalidates the permit.',
        ],
        pt: [
          'Conferir a ocupação averbada no visto',
          'O visto é emitido para a ocupação de competência crítica específica. Trabalhar fora dela, mesmo no mesmo empregador, invalida a autorização.',
        ],
        es: [
          'Comprobar la ocupación anotada en el visado',
          'El visado se expide para la ocupación de competencia crítica concreta. Trabajar fuera de ella, incluso con el mismo empleador, invalida el permiso.',
        ],
      },
      {
        en: [
          'Lodge proof of employment within twelve months of arrival',
          'A visa granted without a job offer requires the signed contract to be filed with Home Affairs within a year, otherwise it is withdrawn.',
        ],
        pt: [
          'Apresentar comprovação de emprego em até doze meses da chegada',
          'Visto concedido sem proposta de emprego exige que o contrato assinado seja entregue ao Home Affairs em até um ano, sob pena de cancelamento.',
        ],
        es: [
          'Presentar prueba de empleo en los doce meses siguientes a la llegada',
          'Un visado concedido sin oferta de empleo exige presentar el contrato firmado ante Home Affairs en el plazo de un año, o se revoca.',
        ],
      },
      {
        en: [
          'Register with SARS and obtain a tax number',
          'The employer cannot run payroll properly without it, and the tax record later serves as evidence of continuous employment.',
        ],
        pt: [
          'Registar-se na SARS e obter número fiscal',
          'O empregador não consegue rodar a folha corretamente sem ele, e o histórico fiscal depois serve como prova de emprego contínuo.',
        ],
        es: [
          'Inscribirse en la SARS y obtener número fiscal',
          'El empleador no puede gestionar la nómina correctamente sin él, y el historial fiscal sirve después como prueba de empleo continuo.',
        ],
      },
      {
        en: [
          'File a new application before changing employer',
          'The endorsement is employer specific. Starting the new job first counts as unauthorised work even if the occupation is identical.',
        ],
        pt: [
          'Protocolar novo pedido antes de trocar de empregador',
          'A averbação é vinculada ao empregador. Começar o novo emprego antes conta como trabalho não autorizado mesmo que a ocupação seja idêntica.',
        ],
        es: [
          'Presentar una nueva solicitud antes de cambiar de empleador',
          'La anotación está ligada al empleador. Empezar el nuevo empleo antes cuenta como trabajo no autorizado aunque la ocupación sea idéntica.',
        ],
      },
      {
        en: [
          'Plan the permanent residence route from the start',
          'Critical skills holders have their own permanent residence category, and with a permanent job offer it opens far earlier than the general five-year rule.',
        ],
        pt: [
          'Planejar desde o início o caminho da residência permanente',
          'Titulares de competências críticas têm categoria própria de residência permanente, e com proposta de emprego permanente ela abre bem antes da regra geral de cinco anos.',
        ],
        es: [
          'Planificar desde el principio la vía a la residencia permanente',
          'Los titulares de competencias críticas tienen su propia categoría de residencia permanente, y con una oferta de empleo permanente se abre mucho antes que la regla general de cinco años.',
        ],
      },
    ],
  },

  'General Work Visa': {
    core_documents: [
      {
        en: [
          'Certificate from the Department of Employment and Labour',
          'A different department must certify that no suitable South African citizen or permanent resident was found for the post. Without it the file cannot succeed, and obtaining it is the longest part of the whole process.',
        ],
        pt: [
          'Certificado do Department of Employment and Labour',
          'Um ministério diferente precisa atestar que nenhum cidadão ou residente permanente sul-africano adequado foi encontrado para a vaga. Sem ele o processo não anda, e obtê-lo é a etapa mais longa de todas.',
        ],
        es: [
          'Certificado del Department of Employment and Labour',
          'Un ministerio distinto debe certificar que no se encontró ningún ciudadano o residente permanente sudafricano adecuado para el puesto. Sin él el expediente no prospera, y conseguirlo es la parte más larga.',
        ],
      },
      {
        en: [
          'Proof that the post was advertised nationally',
          'Recent advertisements in the national press, the responses received, and written reasons why each local candidate was unsuitable.',
        ],
        pt: [
          'Prova de que a vaga foi anunciada em âmbito nacional',
          'Anúncios recentes na imprensa nacional, as candidaturas recebidas e as razões escritas de por que cada candidato local não servia.',
        ],
        es: [
          'Prueba de que el puesto se anunció a nivel nacional',
          'Anuncios recientes en la prensa nacional, las candidaturas recibidas y las razones escritas de por qué cada candidato local no servía.',
        ],
      },
      {
        en: [
          'Passport valid for the full period requested',
          'With two blank facing pages, since the visa label needs a full page of its own.',
        ],
        pt: [
          'Passaporte válido por todo o período pedido',
          'Com duas páginas em branco frente a frente, já que o adesivo do visto ocupa uma página inteira.',
        ],
        es: [
          'Pasaporte vigente durante todo el periodo solicitado',
          'Con dos páginas en blanco enfrentadas, ya que la etiqueta del visado ocupa una página entera.',
        ],
      },
      {
        en: [
          'Signed contract of employment',
          'On company letterhead, stating salary, duties and duration. The visa is granted for the contract period, capped at five years.',
        ],
        pt: [
          'Contrato de trabalho assinado',
          'Em papel timbrado da empresa, com salário, atribuições e duração. O visto é concedido pelo prazo do contrato, limitado a cinco anos.',
        ],
        es: [
          'Contrato de trabajo firmado',
          'En papel con membrete de la empresa, con salario, funciones y duración. El visado se concede por el plazo del contrato, con tope de cinco años.',
        ],
      },
      {
        en: [
          'Job description and company structure chart',
          'Showing where the post sits in the organisation and why the skills are needed at that level.',
        ],
        pt: [
          'Descrição do cargo e organograma da empresa',
          'Mostrando onde a vaga se encaixa na organização e por que as competências são necessárias naquele nível.',
        ],
        es: [
          'Descripción del puesto y organigrama de la empresa',
          'Mostrando dónde encaja el puesto en la organización y por qué se necesitan esas competencias a ese nivel.',
        ],
      },
      {
        en: [
          'Police clearance certificates for every country of residence',
          'Any country lived in for twelve months or more since turning eighteen, each certificate recent at the date of submission.',
        ],
        pt: [
          'Certidões de antecedentes de todos os países de residência',
          'Qualquer país onde tenha morado doze meses ou mais desde os dezoito anos, cada certidão recente na data da entrega.',
        ],
        es: [
          'Certificados de antecedentes de todos los países de residencia',
          'Cualquier país donde haya vivido doce meses o más desde los dieciocho años, cada certificado reciente en la fecha de presentación.',
        ],
      },
    ],
    education: [
      {
        en: [
          'SAQA certificate of evaluation',
          'The foreign qualification must be benchmarked against the South African framework before submission, and the certificate is issued in the applicant name only.',
        ],
        pt: [
          'Certificado de avaliação da SAQA',
          'O diploma estrangeiro precisa ser equiparado ao quadro sul-africano antes da entrega, e o certificado sai apenas em nome do requerente.',
        ],
        es: [
          'Certificado de evaluación de la SAQA',
          'El título extranjero debe homologarse al marco sudafricano antes de presentar, y el certificado se expide solo a nombre del solicitante.',
        ],
      },
      {
        en: [
          'Council registration where the occupation is regulated',
          'Health, engineering, legal and teaching roles need a registration letter from the South African body that controls the profession.',
        ],
        pt: [
          'Registo em conselho quando a ocupação é regulamentada',
          'Funções de saúde, engenharia, direito e ensino exigem carta de registo do órgão sul-africano que regula a profissão.',
        ],
        es: [
          'Inscripción en el consejo cuando la ocupación está regulada',
          'Los puestos sanitarios, de ingeniería, jurídicos y docentes exigen carta de inscripción del organismo sudafricano que regula la profesión.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Salary not inferior to that of local employees',
          'The employer must certify in writing that pay and benefits match what a South African in the same role receives. This is the substance of the labour test, not a formality.',
        ],
        pt: [
          'Salário não inferior ao dos empregados locais',
          'O empregador precisa atestar por escrito que remuneração e benefícios equivalem ao que um sul-africano na mesma função recebe. É o cerne do teste de mercado, não formalidade.',
        ],
        es: [
          'Salario no inferior al de los empleados locales',
          'El empleador debe certificar por escrito que la retribución y los beneficios equivalen a los de un sudafricano en el mismo puesto. Es el fondo de la prueba laboral, no un trámite.',
        ],
      },
      {
        en: [
          'Employer undertaking on repatriation costs',
          'The company formally accepts responsibility for the cost of returning you and your family if the employment ends.',
        ],
        pt: [
          'Compromisso do empregador quanto aos custos de repatriamento',
          'A empresa assume formalmente a responsabilidade pelo custo de devolver você e sua família ao país de origem se o vínculo terminar.',
        ],
        es: [
          'Compromiso del empleador sobre los costes de repatriación',
          'La empresa asume formalmente el coste de devolverle a usted y a su familia al país de origen si termina la relación laboral.',
        ],
      },
      {
        en: [
          'Pay the application fee for every applicant',
          'Dependants are charged separately, the fee is due at submission and it is not refunded when the application fails.',
        ],
        pt: [
          'Pagar a taxa de pedido por cada requerente',
          'Dependentes são cobrados à parte, a taxa vence na entrega e não é devolvida quando o pedido é negado.',
        ],
        es: [
          'Pagar la tasa de solicitud por cada solicitante',
          'Los dependientes se cobran aparte, la tasa se paga al presentar y no se devuelve si la solicitud fracasa.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Lodge the application at VFS Global in your own country',
          'The file is submitted abroad, before travelling, because this category cannot be applied for from inside South Africa as a visitor.',
        ],
        pt: [
          'Protocolar o pedido na VFS Global do seu próprio país',
          'O processo é entregue no exterior, antes da viagem, porque esta categoria não pode ser pedida de dentro da África do Sul na condição de visitante.',
        ],
        es: [
          'Presentar la solicitud en VFS Global de su propio país',
          'El expediente se entrega en el exterior, antes de viajar, porque esta categoría no puede solicitarse desde dentro de Sudáfrica como visitante.',
        ],
      },
      {
        en: [
          'Start the process four to six months ahead',
          'The labour certificate and the visa adjudication run in sequence, not in parallel, so the two waiting times add up.',
        ],
        pt: [
          'Iniciar o processo com quatro a seis meses de antecedência',
          'O certificado do trabalho e a análise do visto correm em sequência, não em paralelo, então os dois prazos se somam.',
        ],
        es: [
          'Iniciar el proceso con cuatro a seis meses de antelación',
          'El certificado laboral y la evaluación del visado van en secuencia, no en paralelo, de modo que los dos plazos se suman.',
        ],
      },
      {
        en: [
          'Include a covering letter tying the file together',
          'A short letter mapping each requirement to the document that satisfies it noticeably reduces requests for further information.',
        ],
        pt: [
          'Incluir uma carta de apresentação que amarre o processo',
          'Uma carta curta ligando cada exigência ao documento que a satisfaz reduz sensivelmente os pedidos de informação complementar.',
        ],
        es: [
          'Incluir una carta de presentación que enlace el expediente',
          'Una carta breve que vincule cada requisito con el documento que lo cumple reduce notablemente las peticiones de información adicional.',
        ],
        priority: 2,
        required: false,
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometrics taken at the application centre',
          'Fingerprints and a photograph for each applicant, captured at submission and not transferable from an earlier application.',
        ],
        pt: [
          'Biometria recolhida no centro de atendimento',
          'Impressões digitais e fotografia de cada requerente, feitas na entrega e não aproveitáveis de um pedido anterior.',
        ],
        es: [
          'Biometría tomada en el centro de solicitudes',
          'Huellas y fotografía de cada solicitante, tomadas al presentar y no reutilizables de una solicitud anterior.',
        ],
      },
      {
        en: [
          'Medical report still valid when the decision is made',
          'It lapses after six months, and a report that expires mid-assessment has to be redone and resubmitted.',
        ],
        pt: [
          'Laudo médico ainda válido no momento da decisão',
          'Ele caduca em seis meses, e um laudo que vence no meio da análise precisa ser refeito e reenviado.',
        ],
        es: [
          'Informe médico todavía vigente cuando se resuelve',
          'Caduca a los seis meses, y un informe que vence a mitad de la evaluación hay que rehacerlo y volver a presentarlo.',
        ],
      },
      {
        en: [
          'Chest radiological report for tuberculosis screening',
          'Required for each applicant over the age threshold, with exemptions for young children and pregnant applicants.',
        ],
        pt: [
          'Laudo radiológico de tórax para rastreio de tuberculose',
          'Exigido de cada requerente acima da idade limite, com dispensa para crianças pequenas e gestantes.',
        ],
        es: [
          'Informe radiológico de tórax para cribado de tuberculosis',
          'Exigido a cada solicitante por encima del umbral de edad, con exención para niños pequeños y embarazadas.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Confirm the visa names the employer and the position',
          'The endorsement fixes both. A promotion into a different role needs a fresh application, not an amendment.',
        ],
        pt: [
          'Confirmar que o visto nomeia o empregador e o cargo',
          'A averbação fixa os dois. Uma promoção para função diferente exige pedido novo, não uma simples alteração.',
        ],
        es: [
          'Confirmar que el visado nombra al empleador y el puesto',
          'La anotación fija ambos. Un ascenso a un puesto distinto exige una solicitud nueva, no una modificación.',
        ],
      },
      {
        en: [
          'Report to Home Affairs when the employment ends',
          'The employer is obliged to report it and the visa falls away with the job, leaving no grace period to find another one.',
        ],
        pt: [
          'Comunicar ao Home Affairs quando o vínculo terminar',
          'O empregador é obrigado a comunicar e o visto cai junto com o emprego, sem período de tolerância para procurar outro.',
        ],
        es: [
          'Comunicar a Home Affairs cuando termine el empleo',
          'El empleador está obligado a comunicarlo y el visado decae con el empleo, sin periodo de gracia para buscar otro.',
        ],
      },
      {
        en: [
          'Renew at least sixty days before expiry',
          'Renewals are filed inside South Africa at a VFS centre. Leaving it later means waiting outside the country for the outcome.',
        ],
        pt: [
          'Renovar com pelo menos sessenta dias de antecedência',
          'As renovações são protocoladas dentro da África do Sul num centro VFS. Deixar para depois significa esperar o resultado fora do país.',
        ],
        es: [
          'Renovar al menos sesenta días antes del vencimiento',
          'Las renovaciones se presentan dentro de Sudáfrica en un centro VFS. Dejarlo para después implica esperar el resultado fuera del país.',
        ],
      },
      {
        en: [
          'Obtain a tax number and keep every payslip',
          'Continuous documented employment is exactly what the later permanent residence application is built on.',
        ],
        pt: [
          'Obter número fiscal e guardar todos os holerites',
          'Emprego contínuo e documentado é precisamente a base sobre a qual o pedido futuro de residência permanente se apoia.',
        ],
        es: [
          'Obtener número fiscal y guardar todas las nóminas',
          'El empleo continuo y documentado es exactamente la base sobre la que se construye la futura solicitud de residencia permanente.',
        ],
      },
      {
        en: [
          'Count the five years toward direct residence',
          'Five years of continuous work on this visa opens the direct residence route, but only if the periods were genuinely unbroken between permits.',
        ],
        pt: [
          'Contar os cinco anos para a residência direta',
          'Cinco anos de trabalho contínuo com este visto abrem a via de residência direta, mas só se os períodos foram realmente ininterruptos entre autorizações.',
        ],
        es: [
          'Contar los cinco años para la residencia directa',
          'Cinco años de trabajo continuo con este visado abren la vía de residencia directa, pero solo si los periodos fueron realmente ininterrumpidos entre permisos.',
        ],
      },
    ],
  },

  'Permanent Residence': {
    core_documents: [
      {
        en: [
          'Identify the correct permanent residence category',
          'Direct residence after five years of continuous work is one route; residence on other grounds covers critical skills, spouses, retirees and the financially independent. They use different forms and different evidence entirely.',
        ],
        pt: [
          'Identificar a categoria correta de residência permanente',
          'A residência direta após cinco anos de trabalho contínuo é uma via; a residência por outros fundamentos abrange competências críticas, cônjuges, aposentados e independentes financeiros. As vias usam formulários e provas completamente diferentes.',
        ],
        es: [
          'Identificar la categoría correcta de residencia permanente',
          'La residencia directa tras cinco años de trabajo continuo es una vía; la residencia por otros motivos cubre competencias críticas, cónyuges, jubilados e independientes económicos. Usan formularios y pruebas del todo distintos.',
        ],
      },
      {
        en: [
          'Permanent residence application form',
          'Form BI-947, completed for every applicant including minor children, each with their own set of supporting documents.',
        ],
        pt: [
          'Formulário de pedido de residência permanente',
          'Formulário BI-947, preenchido para cada requerente, inclusive filhos menores, cada um com seu próprio conjunto de documentos.',
        ],
        es: [
          'Formulario de solicitud de residencia permanente',
          'Formulario BI-947, cumplimentado por cada solicitante, incluidos los hijos menores, cada uno con su propio juego de documentos.',
        ],
      },
      {
        en: [
          'Police clearance from every country of residence since eighteen',
          'For any stay of twelve months or more. These certificates have a short shelf life, so order them once the rest of the file is nearly ready.',
        ],
        pt: [
          'Antecedentes de todos os países de residência desde os dezoito anos',
          'Para qualquer permanência de doze meses ou mais. Essas certidões têm validade curta, então peça-as quando o resto do processo já estiver quase pronto.',
        ],
        es: [
          'Antecedentes de todos los países de residencia desde los dieciocho',
          'Para cualquier estancia de doce meses o más. Estos certificados caducan pronto, así que pídalos cuando el resto del expediente esté casi listo.',
        ],
      },
      {
        en: [
          'Full birth certificate and civil status documents',
          'Unabridged and legalised, with sworn translations. A divorce decree or death certificate is required wherever a previous marriage ended.',
        ],
        pt: [
          'Certidão de nascimento completa e documentos de estado civil',
          'Integrais e legalizados, com tradução juramentada. Averbação de divórcio ou certidão de óbito é exigida sempre que houve casamento anterior encerrado.',
        ],
        es: [
          'Partida de nacimiento íntegra y documentos de estado civil',
          'Íntegros y legalizados, con traducción jurada. Se exige sentencia de divorcio o certificado de defunción cuando terminó un matrimonio anterior.',
        ],
      },
      {
        en: [
          'Valid passport and a current temporary residence visa',
          'The temporary visa has to stay valid throughout, because the permanent decision takes years and lapsing in the meantime is fatal to the file.',
        ],
        pt: [
          'Passaporte válido e visto de residência temporária vigente',
          'O visto temporário precisa continuar válido o tempo todo, porque a decisão permanente leva anos e deixá-lo vencer no meio derruba o processo.',
        ],
        es: [
          'Pasaporte vigente y visado de residencia temporal en vigor',
          'El visado temporal debe seguir vigente todo el tiempo, porque la decisión permanente tarda años y dejarlo caducar entre tanto arruina el expediente.',
        ],
      },
      {
        en: [
          'Curriculum vitae and a motivation letter',
          'Setting out the history of your stay and why the chosen category applies, which helps an adjudicator who sees the file years after it was built.',
        ],
        pt: [
          'Currículo e carta de motivação',
          'Descrevendo o histórico da sua permanência e por que a categoria escolhida se aplica, o que ajuda o analista que verá o processo anos depois de ele ter sido montado.',
        ],
        es: [
          'Currículum y carta de motivación',
          'Exponiendo el historial de su estancia y por qué se aplica la categoría elegida, lo que ayuda al evaluador que verá el expediente años después de armarlo.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Fresh SAQA evaluation for qualification-based categories',
          'The critical skills and qualification routes need the benchmarking again if the earlier certificate has expired or the qualification has changed since.',
        ],
        pt: [
          'Nova avaliação da SAQA nas categorias baseadas em diploma',
          'As vias de competências críticas e de qualificação exigem nova equiparação se o certificado anterior venceu ou se a formação mudou desde então.',
        ],
        es: [
          'Nueva evaluación SAQA en las categorías basadas en el título',
          'Las vías de competencias críticas y de cualificación exigen repetir la homologación si el certificado anterior caducó o la titulación cambió.',
        ],
      },
      {
        en: [
          'Professional body confirmation of good standing',
          'For regulated occupations, a current letter is needed rather than the one already used for the temporary work visa.',
        ],
        pt: [
          'Declaração do conselho profissional de situação regular',
          'Para ocupações regulamentadas é preciso uma carta atual, e não a mesma já usada no visto de trabalho temporário.',
        ],
        es: [
          'Certificado del colegio profesional de estar al corriente',
          'Para las ocupaciones reguladas hace falta una carta actual, no la que ya se usó para el visado de trabajo temporal.',
        ],
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence of continuous employment over the qualifying period',
          'Payslips, tax certificates and employer letters covering each year. A gap between one visa and the next breaks continuity and resets the clock.',
        ],
        pt: [
          'Comprovação de emprego contínuo ao longo do período qualificante',
          'Holerites, informes fiscais e cartas dos empregadores cobrindo cada ano. Uma lacuna entre um visto e o seguinte quebra a continuidade e zera a contagem.',
        ],
        es: [
          'Prueba de empleo continuo durante el periodo cualificante',
          'Nóminas, certificados fiscales y cartas de los empleadores por cada año. Un vacío entre un visado y el siguiente rompe la continuidad y reinicia el cómputo.',
        ],
      },
      {
        en: [
          'Permanent employment offer where the category demands it',
          'A permanent contract, not a fixed term, is what the critical skills and general work routes require at this stage.',
        ],
        pt: [
          'Proposta de emprego permanente quando a categoria exigir',
          'Um contrato por prazo indeterminado, não temporário, é o que as vias de competências críticas e de trabalho geral exigem nesta fase.',
        ],
        es: [
          'Oferta de empleo permanente cuando la categoría lo exija',
          'Un contrato indefinido, no temporal, es lo que exigen en esta fase las vías de competencias críticas y de trabajo general.',
        ],
      },
      {
        en: [
          'Proof of net worth for the financially independent route',
          'A separate category exists for applicants with assets above a set threshold plus a once-off levy. Confirm both current figures before relying on it.',
        ],
        pt: [
          'Comprovação de patrimônio na via de independência financeira',
          'Existe categoria própria para quem tem patrimônio acima de um limite definido, mais uma taxa única. Confirme os dois valores vigentes antes de contar com ela.',
        ],
        es: [
          'Prueba de patrimonio para la vía de independencia económica',
          'Existe una categoría propia para quien supera un umbral de patrimonio, más un gravamen único. Confirme ambas cifras vigentes antes de contar con ella.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Pay the permanent residence fee for each applicant',
          'Substantially higher than a temporary visa fee, charged per person and not refunded whatever the outcome.',
        ],
        pt: [
          'Pagar a taxa de residência permanente por requerente',
          'Bem mais alta que a de um visto temporário, cobrada por pessoa e não devolvida qualquer que seja o resultado.',
        ],
        es: [
          'Pagar la tasa de residencia permanente por solicitante',
          'Bastante más alta que la de un visado temporal, se cobra por persona y no se devuelve sea cual sea el resultado.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Submit at a VFS Global centre inside South Africa',
          'Unlike the temporary categories, this application is lodged from within the country while holding a valid temporary visa.',
        ],
        pt: [
          'Entregar num centro VFS Global dentro da África do Sul',
          'Diferentemente das categorias temporárias, este pedido é protocolado de dentro do país, com um visto temporário válido em mãos.',
        ],
        es: [
          'Presentar en un centro VFS Global dentro de Sudáfrica',
          'A diferencia de las categorías temporales, esta solicitud se presenta desde dentro del país teniendo un visado temporal vigente.',
        ],
      },
      {
        en: [
          'Expect the decision to take a very long time',
          'Backlogs measured in years are normal, so keep renewing the temporary visa in the meantime instead of waiting for an answer.',
        ],
        pt: [
          'Contar com uma decisão que demora muitíssimo',
          'Filas medidas em anos são normais, então continue renovando o visto temporário nesse intervalo em vez de esperar por uma resposta.',
        ],
        es: [
          'Contar con una decisión que tarda muchísimo',
          'Los atascos medidos en años son normales, así que siga renovando el visado temporal mientras tanto en lugar de esperar respuesta.',
        ],
      },
      {
        en: [
          'Keep the submission receipt and every payment slip',
          'They are the evidence of a pending application, which matters at every subsequent renewal and at the border.',
        ],
        pt: [
          'Guardar o comprovante de entrega e todos os recibos de pagamento',
          'São a prova de pedido pendente, o que importa em cada renovação seguinte e também na fronteira.',
        ],
        es: [
          'Conservar el resguardo de presentación y todos los recibos',
          'Son la prueba de una solicitud pendiente, algo que cuenta en cada renovación posterior y también en la frontera.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometrics and photographs for each applicant',
          'Taken at submission for everyone on the file, with children attending in person alongside the main applicant.',
        ],
        pt: [
          'Biometria e fotografias de cada requerente',
          'Recolhidas na entrega para todos do processo, com as crianças comparecendo pessoalmente junto ao requerente principal.',
        ],
        es: [
          'Biometría y fotografías de cada solicitante',
          'Se toman al presentar para todos los del expediente, con los niños acudiendo en persona junto al solicitante principal.',
        ],
      },
      {
        en: [
          'Medical and radiological reports for the whole family',
          'Every applicant including children needs their own set, and the six-month validity applies here just as it does to temporary visas.',
        ],
        pt: [
          'Laudos médicos e radiológicos de toda a família',
          'Cada requerente, inclusive crianças, precisa dos seus, e a validade de seis meses vale aqui igual como nos vistos temporários.',
        ],
        es: [
          'Informes médicos y radiológicos de toda la familia',
          'Cada solicitante, incluidos los niños, necesita los suyos, y la validez de seis meses rige aquí igual que en los visados temporales.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the permanent residence certificate',
          'Issued as a paper certificate with a reference number, and it is the document every other institution will ask to see.',
        ],
        pt: [
          'Retirar o certificado de residência permanente',
          'Emitido como certificado em papel com número de referência, e é o documento que todas as demais instituições vão pedir.',
        ],
        es: [
          'Recoger el certificado de residencia permanente',
          'Se expide como certificado en papel con número de referencia, y es el documento que pedirán todas las demás instituciones.',
        ],
      },
      {
        en: [
          'Apply separately for the identity document',
          'The smart identity card is a further application at Home Affairs. Daily life depends on it far more than on the residence certificate itself.',
        ],
        pt: [
          'Pedir o documento de identidade em processo separado',
          'O cartão de identidade é um pedido adicional no Home Affairs. A vida cotidiana depende muito mais dele do que do próprio certificado de residência.',
        ],
        es: [
          'Solicitar aparte el documento de identidad',
          'La tarjeta de identidad es una solicitud adicional en Home Affairs. La vida diaria depende de ella mucho más que del propio certificado de residencia.',
        ],
      },
      {
        en: [
          'Do not stay outside the country for three years',
          'Permanent residence lapses if the holder is absent from South Africa for three continuous years, and reinstating it is not straightforward.',
        ],
        pt: [
          'Não permanecer três anos fora do país',
          'A residência permanente caduca se o titular ficar três anos contínuos fora da África do Sul, e reativá-la não é simples.',
        ],
        es: [
          'No permanecer tres años fuera del país',
          'La residencia permanente caduca si el titular pasa tres años continuos fuera de Sudáfrica, y recuperarla no es sencillo.',
        ],
      },
      {
        en: [
          'Register with SARS as a resident taxpayer',
          'Permanent residence changes your tax position to worldwide income, which is worth planning for before the first tax year closes.',
        ],
        pt: [
          'Registar-se na SARS como contribuinte residente',
          'A residência permanente muda sua posição fiscal para renda mundial, o que vale planejar antes de fechar o primeiro ano fiscal.',
        ],
        es: [
          'Inscribirse en la SARS como contribuyente residente',
          'La residencia permanente cambia su situación fiscal a renta mundial, algo que conviene planificar antes de cerrar el primer ejercicio.',
        ],
      },
      {
        en: [
          'Note the further wait before naturalisation',
          'Citizenship requires additional years of permanent residence plus physical presence, so the certificate is a starting point rather than the end of the road.',
        ],
        pt: [
          'Observar a espera adicional até a naturalização',
          'A cidadania exige mais anos de residência permanente e presença física, então o certificado é um ponto de partida, não o fim do caminho.',
        ],
        es: [
          'Tener en cuenta la espera adicional hasta la naturalización',
          'La ciudadanía exige años adicionales de residencia permanente y presencia física, de modo que el certificado es un punto de partida, no el final.',
        ],
      },
    ],
  },
};
