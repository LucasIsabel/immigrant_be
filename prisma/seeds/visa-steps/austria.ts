import type { CountryVisaSteps } from './types';

/**
 * Steps for Austria.
 *
 * Qualified migration runs through the Red-White-Red Card, which is scored on
 * points: the category you fall into decides the minimum score, the documents
 * and the salary floor. Establishing the category first is what keeps the rest
 * of the file from being wasted work.
 *
 * Residence titles are not handed over at the consulate. The application is
 * lodged abroad, and the card is collected in person at the settlement
 * authority in Austria, where the biometrics are taken. Several settlement
 * categories are also capped by an annual quota that is often exhausted in the
 * first weeks of the year.
 *
 * Once in the country, the Meldezettel is due within three days of moving in,
 * and the Integration Agreement requires German at A2 within two years. Both
 * are easy to postpone and both block the renewal later.
 */
export const austria: CountryVisaSteps = {
  'Short-Stay Visa (Type C, up to 90 days)': {
    core_documents: [
      {
        en: [
          'Valid passport with two blank pages',
          'Issued within the last ten years and valid for at least three months after the planned departure; files are refused on this point alone.',
        ],
        pt: [
          'Passaporte válido com duas páginas em branco',
          'Emitido nos últimos dez anos e válido por pelo menos três meses após a saída prevista; processos são recusados só por isso.',
        ],
        es: [
          'Pasaporte vigente con dos páginas en blanco',
          'Emitido en los últimos diez años y vigente al menos tres meses tras la salida prevista; se rechazan expedientes solo por esto.',
        ],
      },
      {
        en: [
          'Completed Schengen application form',
          'The purpose of travel declared here has to match every supporting document; a mismatch is read as an inconsistency, not as an oversight.',
        ],
        pt: [
          'Formulário Schengen preenchido',
          'O motivo da viagem declarado aqui precisa bater com todos os documentos anexos; divergência é lida como inconsistência, não como descuido.',
        ],
        es: [
          'Formulario Schengen cumplimentado',
          'El motivo del viaje declarado aquí debe coincidir con todos los documentos aportados; una divergencia se lee como inconsistencia, no como descuido.',
        ],
      },
      {
        en: [
          'Recent biometric photograph',
          'Passport format on a light background, taken in the last six months.',
        ],
        pt: [
          'Fotografia biométrica recente',
          'Formato passaporte em fundo claro, tirada nos últimos seis meses.',
        ],
        es: [
          'Fotografía biométrica reciente',
          'Formato pasaporte con fondo claro, tomada en los últimos seis meses.',
        ],
      },
      {
        en: [
          'Day-by-day travel plan with transport bookings',
          'Reservations only, but coherent: dates that contradict the accommodation are the most common reason a file is questioned.',
        ],
        pt: [
          'Roteiro dia a dia com reservas de transporte',
          'Apenas reservas, mas coerentes: datas que contradizem a hospedagem são o motivo mais comum de o processo ser questionado.',
        ],
        es: [
          'Itinerario día a día con reservas de transporte',
          'Solo reservas, pero coherentes: fechas que contradicen el alojamiento son el motivo más frecuente de que se cuestione el expediente.',
        ],
      },
      {
        en: [
          'Accommodation booking or an electronic declaration of commitment',
          'A hotel reservation, or an Elektronische Verpflichtungserklärung that the host files with the Austrian police and that binds them financially for your stay.',
        ],
        pt: [
          'Reserva de alojamento ou declaração eletrónica de compromisso',
          'Reserva de hotel, ou uma Elektronische Verpflichtungserklärung que o anfitrião protocola na polícia austríaca e que o obriga financeiramente pela sua estada.',
        ],
        es: [
          'Reserva de alojamiento o declaración electrónica de compromiso',
          'Reserva de hotel, o una Elektronische Verpflichtungserklärung que el anfitrión presenta ante la policía austríaca y que le obliga económicamente durante su estancia.',
        ],
      },
      {
        en: [
          'Travel health insurance for the Schengen area',
          'Minimum cover of 30,000 euros for emergency treatment and repatriation, valid for every day requested and not only for the first week.',
        ],
        pt: [
          'Seguro de saúde de viagem para o espaço Schengen',
          'Cobertura mínima de 30 mil euros para emergências e repatriamento, válida em todos os dias pedidos e não apenas na primeira semana.',
        ],
        es: [
          'Seguro de salud de viaje para el espacio Schengen',
          'Cobertura mínima de 30 mil euros para urgencias y repatriación, válida todos los días solicitados y no solo la primera semana.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of sufficient means for each day of stay',
          'Austria expects a daily amount per person on top of what is already paid; confirm the figure in force, since it is revised and old blog posts quote outdated numbers.',
        ],
        pt: [
          'Comprovação de meios suficientes por dia de estada',
          'A Áustria espera um valor diário por pessoa além do que já está pago; confirme o valor vigente, pois ele é revisto e textos antigos citam números defasados.',
        ],
        es: [
          'Prueba de medios suficientes por cada día de estancia',
          'Austria espera un importe diario por persona además de lo ya pagado; confirme la cifra vigente, porque se revisa y los textos antiguos citan cifras caducas.',
        ],
      },
      {
        en: [
          'Bank statements from the last three months',
          'A balance that appears days before the appointment looks staged and is treated that way.',
        ],
        pt: [
          'Extratos bancários dos últimos três meses',
          'Um saldo que aparece dias antes do atendimento parece encenado e é tratado assim.',
        ],
        es: [
          'Extractos bancarios de los últimos tres meses',
          'Un saldo que aparece días antes de la cita parece preparado y se trata como tal.',
        ],
      },
      {
        en: [
          'Evidence of ties to your country of residence',
          'Employment with approved leave, studies, property or dependants. The consulate is assessing whether you will go back, not whether you can afford the trip.',
        ],
        pt: [
          'Comprovação de vínculos com o país onde reside',
          'Emprego com férias aprovadas, estudos, imóveis ou dependentes. O consulado avalia se você vai voltar, não se você tem dinheiro para a viagem.',
        ],
        es: [
          'Prueba de vínculos con su país de residencia',
          'Empleo con vacaciones aprobadas, estudios, inmuebles o personas a cargo. El consulado evalúa si volverá, no si puede costear el viaje.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Book the appointment at the competent Austrian post',
          'Austria is represented by another Schengen state in several countries, and the competent post depends on where you live rather than on your nationality.',
        ],
        pt: [
          'Agendar na representação austríaca competente',
          'A Áustria é representada por outro Estado Schengen em vários países, e o posto competente depende de onde você mora, não da sua nacionalidade.',
        ],
        es: [
          'Reservar cita en la representación austríaca competente',
          'Austria está representada por otro Estado Schengen en varios países, y el puesto competente depende de dónde vive, no de su nacionalidad.',
        ],
      },
      {
        en: [
          'Pay the Schengen visa fee',
          'Charged per applicant, children included, and never refunded on refusal. Confirm the current amount and the accepted payment method before the appointment.',
        ],
        pt: [
          'Pagar a taxa de visto Schengen',
          'Cobrada por requerente, incluindo crianças, e nunca devolvida em caso de recusa. Confirme o valor atual e a forma de pagamento aceite antes do atendimento.',
        ],
        es: [
          'Pagar la tasa de visado Schengen',
          'Se cobra por solicitante, incluidos los menores, y nunca se devuelve si deniegan. Confirme el importe actual y el medio de pago aceptado antes de la cita.',
        ],
      },
      {
        en: [
          'Lodge the application in person with the originals',
          'No earlier than six months before travel and, as a rule, at least fifteen days before. Copies are kept, originals are inspected on the spot.',
        ],
        pt: [
          'Entregar o pedido presencialmente com os originais',
          'No máximo seis meses antes da viagem e, em regra, pelo menos quinze dias antes. As cópias ficam, os originais são conferidos na hora.',
        ],
        es: [
          'Presentar la solicitud en persona con los originales',
          'Como mucho seis meses antes del viaje y, por norma, al menos quince días antes. Las copias se quedan, los originales se revisan en el acto.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprint and facial image capture',
          'Fingerprints are reused across the Schengen area for 59 months, so a recent visa may spare you this appointment entirely.',
        ],
        pt: [
          'Recolha de impressões digitais e imagem facial',
          'As impressões são reaproveitadas no espaço Schengen por 59 meses, então um visto recente pode dispensar esta ida ao consulado.',
        ],
        es: [
          'Toma de huellas y de imagen facial',
          'Las huellas se reutilizan en el espacio Schengen durante 59 meses, así que un visado reciente puede ahorrarle esta cita.',
        ],
      },
      {
        en: [
          'Medical examination',
          'Not part of a short-stay file; only the insurance cover is assessed.',
        ],
        pt: [
          'Exame médico',
          'Não faz parte do processo de curta duração; avalia-se apenas a cobertura do seguro.',
        ],
        es: [
          'Examen médico',
          'No forma parte del expediente de corta estancia; solo se evalúa la cobertura del seguro.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Read the visa sticker before leaving the counter',
          'The number of entries, the validity window and the duration of stay are three separate fields, and confusing them is what turns a lawful trip into an overstay.',
        ],
        pt: [
          'Ler o autocolante do visto antes de sair do balcão',
          'Número de entradas, janela de validade e duração da estada são três campos distintos, e confundi-los é o que transforma uma viagem legal numa permanência irregular.',
        ],
        es: [
          'Leer la etiqueta del visado antes de salir del mostrador',
          'Número de entradas, ventana de validez y duración de la estancia son tres campos distintos, y confundirlos convierte un viaje legal en una estancia irregular.',
        ],
      },
      {
        en: [
          'Stay within 90 days in any 180',
          'Counted across the whole Schengen area on a rolling basis; Austrian border police check the history at entry.',
        ],
        pt: [
          'Ficar dentro dos 90 dias em cada 180',
          'Contados em todo o espaço Schengen de forma móvel; a polícia de fronteira austríaca verifica o histórico na entrada.',
        ],
        es: [
          'Mantenerse dentro de 90 días en cada 180',
          'Se cuentan en todo el espacio Schengen de forma móvil; la policía de fronteras austríaca revisa el historial en la entrada.',
        ],
      },
      {
        en: [
          'Register at a private address within three days',
          'The Meldezettel duty reaches visitors too. A hotel files it for you; a friend hosting you does not, and the omission is fined.',
        ],
        pt: [
          'Registar-se num endereço particular em três dias',
          'A obrigação do Meldezettel também alcança visitantes. O hotel protocola por você; o amigo que o hospeda não, e a omissão é multada.',
        ],
        es: [
          'Registrarse en un domicilio particular en tres días',
          'La obligación del Meldezettel también alcanza a los visitantes. El hotel lo tramita por usted; el amigo que le aloja no, y la omisión se multa.',
        ],
      },
      {
        en: [
          'Do not take up any work',
          'Employment in Austria requires a permit obtained beforehand. Being found working ends the stay and is recorded against future applications.',
        ],
        pt: [
          'Não exercer qualquer trabalho',
          'Trabalhar na Áustria exige autorização obtida antes. Ser encontrado a trabalhar encerra a estada e fica registado contra pedidos futuros.',
        ],
        es: [
          'No realizar ningún trabajo',
          'Trabajar en Austria exige un permiso obtenido de antemano. Ser hallado trabajando termina la estancia y queda registrado contra solicitudes futuras.',
        ],
      },
    ],
  },

  'National Visa / Long-Stay (Type D) & Residence Permit': {
    core_documents: [
      {
        en: [
          'Travel document covering the whole permit period',
          'A residence title is never issued for longer than the passport is valid, so renewing it first can be worth the delay.',
        ],
        pt: [
          'Documento de viagem cobrindo todo o período do título',
          'Um título de residência nunca é emitido por prazo maior que a validade do passaporte, então renová-lo antes pode compensar o atraso.',
        ],
        es: [
          'Documento de viaje que cubra todo el periodo del título',
          'Un título de residencia nunca se expide por más tiempo que la vigencia del pasaporte, así que renovarlo antes puede compensar la demora.',
        ],
      },
      {
        en: [
          'Application form for the specific residence purpose',
          'Austria has a separate title for each purpose, each with its own form and annexes. Filing on the wrong one means starting the case again from zero.',
        ],
        pt: [
          'Formulário do título correspondente à finalidade',
          'A Áustria tem um título distinto para cada finalidade, cada um com formulário e anexos próprios. Entrar com o errado significa recomeçar o processo do zero.',
        ],
        es: [
          'Formulario del título correspondiente a la finalidad',
          'Austria tiene un título distinto para cada finalidad, cada uno con su formulario y sus anexos. Presentar el equivocado obliga a empezar de cero.',
        ],
      },
      {
        en: [
          'Civil status certificates with apostille',
          'Birth and marriage records legalised and translated by a sworn translator. Many authorities refuse extracts issued more than six months earlier.',
        ],
        pt: [
          'Certidões de estado civil com apostila',
          'Certidões de nascimento e casamento legalizadas e traduzidas por tradutor juramentado. Muitas autoridades recusam extratos emitidos há mais de seis meses.',
        ],
        es: [
          'Certificados de estado civil con apostilla',
          'Partidas de nacimiento y matrimonio legalizadas y traducidas por traductor jurado. Muchas autoridades rechazan extractos emitidos hace más de seis meses.',
        ],
      },
      {
        en: [
          'Police clearance certificate',
          'From every country you have lived in recently, and usually accepted only within a few months of issue, so it is one of the last documents to request.',
        ],
        pt: [
          'Certificado de antecedentes criminais',
          'De todos os países onde viveu recentemente, e em geral aceite só dentro de poucos meses da emissão, por isso é dos últimos documentos a pedir.',
        ],
        es: [
          'Certificado de antecedentes penales',
          'De todos los países donde ha vivido recientemente, y por lo general válido solo unos meses desde su emisión, así que se pide de los últimos.',
        ],
      },
      {
        en: [
          'Proof of locally customary accommodation',
          'A registered lease or an ownership title for a home of adequate size for the whole family. An address borrowed from a friend does not satisfy this and is checked.',
        ],
        pt: [
          'Comprovação de alojamento adequado ao padrão local',
          'Contrato de arrendamento registado ou título de propriedade de casa com tamanho adequado a toda a família. Um endereço emprestado por um amigo não serve e é verificado.',
        ],
        es: [
          'Prueba de alojamiento acorde con el estándar local',
          'Contrato de alquiler registrado o título de propiedad de una vivienda de tamaño adecuado para toda la familia. Una dirección prestada por un amigo no sirve y se comprueba.',
        ],
      },
      {
        en: [
          'Health insurance valid in Austria covering all risks',
          'Travel policies are rejected; the cover has to be equivalent to the Austrian statutory scheme and effective from the day you arrive.',
        ],
        pt: [
          'Seguro de saúde válido na Áustria cobrindo todos os riscos',
          'Apólices de viagem são recusadas; a cobertura precisa equivaler ao regime legal austríaco e valer desde o dia da chegada.',
        ],
        es: [
          'Seguro de salud válido en Austria que cubra todos los riesgos',
          'Las pólizas de viaje se rechazan; la cobertura debe equivaler al régimen legal austríaco y estar vigente desde el día de llegada.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Pre-entry German certificate at A1 level',
          'Family reunification requires it before the application is even lodged, from an institute on the official list. Certificates from unlisted schools are simply not read.',
        ],
        pt: [
          'Certificado de alemão nível A1 antes da entrada',
          'O reagrupamento familiar exige-o antes mesmo de protocolar o pedido, de um instituto da lista oficial. Certificados de escolas fora da lista nem são lidos.',
        ],
        es: [
          'Certificado de alemán nivel A1 antes de la entrada',
          'La reagrupación familiar lo exige incluso antes de presentar la solicitud, de un instituto de la lista oficial. Los certificados de escuelas fuera de la lista ni se leen.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Assessment or recognition of foreign diplomas',
          'Needed whenever the purpose depends on a qualification. Regulated professions go through a formal Nostrifizierung that regularly takes months and cannot be rushed.',
        ],
        pt: [
          'Avaliação ou reconhecimento de diplomas estrangeiros',
          'Necessário sempre que a finalidade depender de uma qualificação. Profissões regulamentadas passam por uma Nostrifizierung formal que leva meses e não se acelera.',
        ],
        es: [
          'Evaluación o reconocimiento de títulos extranjeros',
          'Necesario siempre que la finalidad dependa de una cualificación. Las profesiones reguladas pasan por una Nostrifizierung formal que tarda meses y no se acelera.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Fixed and regular income above the statutory reference rate',
          'Austria applies the social insurance reference rates, adjusted every year and calculated per household after rent above a free allowance is deducted. Check the figure in force.',
        ],
        pt: [
          'Rendimento fixo e regular acima da taxa de referência legal',
          'A Áustria aplica as taxas de referência da segurança social, ajustadas todos os anos e calculadas por agregado depois de descontar a renda acima de uma franquia. Confira o valor vigente.',
        ],
        es: [
          'Ingresos fijos y regulares por encima del tipo de referencia legal',
          'Austria aplica los tipos de referencia de la seguridad social, ajustados cada año y calculados por hogar tras descontar el alquiler que supere una franquicia. Consulte la cifra vigente.',
        ],
      },
      {
        en: [
          'Bank statements and proof of where the income comes from',
          'Savings can be counted, but only if they are genuinely available for the whole period requested and not a loan parked for the application.',
        ],
        pt: [
          'Extratos e comprovação da origem do rendimento',
          'Poupanças podem contar, mas só se estiverem realmente disponíveis por todo o período pedido e não forem um empréstimo estacionado para o processo.',
        ],
        es: [
          'Extractos y prueba del origen de los ingresos',
          'Los ahorros pueden contar, pero solo si están realmente disponibles durante todo el periodo solicitado y no son un préstamo aparcado para la solicitud.',
        ],
      },
      {
        en: [
          'Pay the federal charges when lodging',
          'Split between the application and the later issue of the card, and not refunded if the case is rejected or withdrawn.',
        ],
        pt: [
          'Pagar os encargos federais no protocolo',
          'Divididos entre o pedido e a posterior emissão do cartão, e não devolvidos se o processo for indeferido ou desistido.',
        ],
        es: [
          'Pagar las tasas federales al presentar',
          'Se reparten entre la solicitud y la posterior expedición de la tarjeta, y no se devuelven si se deniega o se desiste.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Lodge the application at the competent Austrian representation',
          'First applications are almost always made abroad, at the post covering your place of residence rather than the nearest one.',
        ],
        pt: [
          'Protocolar o pedido na representação austríaca competente',
          'Primeiros pedidos são quase sempre feitos no exterior, no posto que cobre o seu local de residência e não no mais próximo.',
        ],
        es: [
          'Presentar la solicitud en la representación austríaca competente',
          'Las primeras solicitudes casi siempre se hacen en el extranjero, en el puesto que cubre su lugar de residencia y no en el más cercano.',
        ],
      },
      {
        en: [
          'Check whether your category is capped by an annual quota',
          'The settlement regulation caps certain categories per province each year, and in the busier provinces the places are gone within the first weeks of January.',
        ],
        pt: [
          'Verificar se a sua categoria tem cota anual',
          'O regulamento de fixação limita certas categorias por província a cada ano, e nas províncias mais procuradas as vagas acabam nas primeiras semanas de janeiro.',
        ],
        es: [
          'Comprobar si su categoría tiene cupo anual',
          'El reglamento de asentamiento limita ciertas categorías por provincia cada año, y en las provincias más solicitadas las plazas se agotan en las primeras semanas de enero.',
        ],
      },
      {
        en: [
          'Wait abroad until you are invited to travel',
          'Entering as a tourist while the case is pending does not speed anything up and can be treated as circumventing the procedure.',
        ],
        pt: [
          'Aguardar no exterior até ser convidado a viajar',
          'Entrar como turista com o processo pendente não acelera nada e pode ser tratado como contorno do procedimento.',
        ],
        es: [
          'Esperar en el extranjero hasta que le inviten a viajar',
          'Entrar como turista con el caso pendiente no acelera nada y puede considerarse una elusión del procedimiento.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints taken at the settlement authority in Austria',
          'The card is only produced after you appear in person at the provincial or district authority; nothing about this happens at the consulate.',
        ],
        pt: [
          'Impressões digitais recolhidas na autoridade de residência na Áustria',
          'O cartão só é produzido depois de você comparecer pessoalmente na autoridade provincial ou distrital; nada disso acontece no consulado.',
        ],
        es: [
          'Huellas tomadas en la autoridad de residencia en Austria',
          'La tarjeta solo se produce tras presentarse en persona en la autoridad provincial o de distrito; nada de esto ocurre en el consulado.',
        ],
      },
      {
        en: [
          'Registration with the Austrian health insurance fund',
          'The e-card arrives by post once the employer or the fund registers you; keep private cover running until it does, because the gap is real.',
        ],
        pt: [
          'Inscrição no fundo austríaco de seguro de saúde',
          'O e-card chega pelo correio depois de o empregador ou o fundo o inscrever; mantenha a cobertura privada até lá, porque o intervalo existe de facto.',
        ],
        es: [
          'Alta en el fondo austríaco de seguro de salud',
          'La e-card llega por correo cuando el empleador o el fondo le da de alta; mantenga la cobertura privada hasta entonces, porque el vacío existe.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Enter within the visa validity and collect the title in person',
          'The card is handed over at the immigration authority, only to the holder, and only within the window given in the invitation letter.',
        ],
        pt: [
          'Entrar dentro da validade do visto e retirar o título pessoalmente',
          'O cartão é entregue na autoridade de estrangeiros, só ao titular, e apenas dentro da janela indicada na carta de convite.',
        ],
        es: [
          'Entrar dentro de la validez del visado y recoger el título en persona',
          'La tarjeta se entrega en la autoridad de extranjería, solo al titular, y únicamente dentro del plazo indicado en la carta de invitación.',
        ],
      },
      {
        en: [
          'File the Meldezettel within three days of moving in',
          'The registration form is signed by the landlord and filed at the municipal office. Every later step, from the bank to the tax office, starts by asking for it.',
        ],
        pt: [
          'Entregar o Meldezettel em três dias após a mudança',
          'O formulário de registo é assinado pelo senhorio e entregue no serviço municipal. Todo passo seguinte, do banco às finanças, começa por pedi-lo.',
        ],
        es: [
          'Presentar el Meldezettel en los tres días siguientes a la mudanza',
          'El formulario de empadronamiento lo firma el arrendador y se presenta en la oficina municipal. Cada paso posterior, del banco a Hacienda, empieza pidiéndolo.',
        ],
      },
      {
        en: [
          'Complete Integration Agreement Module 1 within two years',
          'German at A2 level. Not meeting it blocks the renewal and can trigger a fine, and courses fill up long before the deadline approaches.',
        ],
        pt: [
          'Cumprir o Módulo 1 do Acordo de Integração em dois anos',
          'Alemão em nível A2. Não cumprir bloqueia a renovação e pode gerar multa, e os cursos lotam muito antes de o prazo se aproximar.',
        ],
        es: [
          'Completar el Módulo 1 del Acuerdo de Integración en dos años',
          'Alemán en nivel A2. No cumplirlo bloquea la renovación y puede acarrear multa, y los cursos se llenan mucho antes de que se acerque el plazo.',
        ],
      },
      {
        en: [
          'Apply for the renewal before the current title expires',
          'Renewals are filed inside Austria. Letting the title lapse turns a renewal into a first application, quota and consulate included.',
        ],
        pt: [
          'Pedir a renovação antes de o título atual vencer',
          'As renovações são pedidas dentro da Áustria. Deixar o título caducar transforma uma renovação num primeiro pedido, com cota e consulado incluídos.',
        ],
        es: [
          'Solicitar la renovación antes de que caduque el título actual',
          'Las renovaciones se presentan dentro de Austria. Dejar caducar el título convierte una renovación en una primera solicitud, con cupo y consulado incluidos.',
        ],
      },
      {
        en: [
          'Register with the tax office and get a social security number',
          'The social insurance number arrives with the first employment registration; without it, payroll, family benefits and medical appointments all stall.',
        ],
        pt: [
          'Registar-se nas finanças e obter o número de segurança social',
          'O número da segurança social vem com o primeiro registo de emprego; sem ele, folha de pagamento, benefícios familiares e consultas médicas travam.',
        ],
        es: [
          'Darse de alta en Hacienda y obtener el número de seguridad social',
          'El número de seguridad social llega con el primer alta laboral; sin él se atascan la nómina, las prestaciones familiares y las citas médicas.',
        ],
        priority: 2,
      },
    ],
  },

  'Work & Qualified Migration (e.g., Red-White-Red Card)': {
    core_documents: [
      {
        en: [
          'Run the points calculator for your category first',
          'The card is split into categories with different minimum scores, and the category decides every document that follows. Establishing it before collecting anything saves months.',
        ],
        pt: [
          'Rodar a calculadora de pontos da sua categoria primeiro',
          'O cartão divide-se em categorias com pontuações mínimas diferentes, e a categoria define todos os documentos seguintes. Estabelecê-la antes de juntar qualquer papel poupa meses.',
        ],
        es: [
          'Ejecutar primero la calculadora de puntos de su categoría',
          'La tarjeta se divide en categorías con puntuaciones mínimas distintas, y la categoría determina todos los documentos posteriores. Fijarla antes de reunir nada ahorra meses.',
        ],
      },
      {
        en: [
          'Passport valid for the full card period',
          'The card is capped by the passport expiry, and Austria issues this one for two years rather than one since the 2022 reform.',
        ],
        pt: [
          'Passaporte válido por todo o período do cartão',
          'O cartão é limitado pela validade do passaporte, e a Áustria emite-o por dois anos e não por um desde a reforma de 2022.',
        ],
        es: [
          'Pasaporte vigente durante todo el periodo de la tarjeta',
          'La tarjeta queda limitada por la caducidad del pasaporte, y Austria la expide por dos años y no por uno desde la reforma de 2022.',
        ],
      },
      {
        en: [
          'Employer declaration signed by the company',
          'The Arbeitgebererklärung states the post, the pay and the hours. The labour market service checks it against the collective agreement, so an optimistic draft backfires.',
        ],
        pt: [
          'Declaração do empregador assinada pela empresa',
          'A Arbeitgebererklärung indica o cargo, a remuneração e a jornada. O serviço de emprego confere-a com a convenção coletiva, então uma versão otimista sai pela culatra.',
        ],
        es: [
          'Declaración del empleador firmada por la empresa',
          'La Arbeitgebererklärung indica el puesto, la retribución y la jornada. El servicio de empleo la contrasta con el convenio colectivo, así que un borrador optimista se vuelve en contra.',
        ],
      },
      {
        en: [
          'Legalised birth certificate with certified translation',
          'Apostille or consular legalisation depending on your country, plus a translation by a translator recognised in Austria.',
        ],
        pt: [
          'Certidão de nascimento legalizada com tradução certificada',
          'Apostila ou legalização consular conforme o país, mais tradução por tradutor reconhecido na Áustria.',
        ],
        es: [
          'Partida de nacimiento legalizada con traducción certificada',
          'Apostilla o legalización consular según el país, más traducción por un traductor reconocido en Austria.',
        ],
      },
      {
        en: [
          'Structured curriculum vitae with dates and references',
          'Points for experience only count where a former employer confirms the period and the role in writing. Self-declared years score nothing.',
        ],
        pt: [
          'Currículo estruturado com datas e referências',
          'Os pontos por experiência só contam quando um antigo empregador confirma por escrito o período e a função. Anos autodeclarados não pontuam.',
        ],
        es: [
          'Currículum estructurado con fechas y referencias',
          'Los puntos por experiencia solo cuentan si un antiguo empleador confirma por escrito el periodo y el puesto. Los años autodeclarados no puntúan.',
        ],
      },
      {
        en: [
          'Biometric photograph to the Austrian standard',
          'The specification differs slightly from the Schengen visa photo; the authority rejects the wrong size at the counter.',
        ],
        pt: [
          'Fotografia biométrica no padrão austríaco',
          'A especificação difere um pouco da foto de visto Schengen; a autoridade recusa o tamanho errado no balcão.',
        ],
        es: [
          'Fotografía biométrica según el estándar austríaco',
          'La especificación difiere algo de la foto del visado Schengen; la autoridad rechaza el tamaño incorrecto en el mostrador.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Degree or completed vocational qualification',
          'For a shortage occupation, the training has to match an occupation on the list in force that year. The list is revised annually and partly set province by province.',
        ],
        pt: [
          'Diploma superior ou formação profissional concluída',
          'Para ocupação em falta, a formação precisa corresponder a uma ocupação da lista vigente naquele ano. A lista é revista anualmente e em parte definida por província.',
        ],
        es: [
          'Título superior o formación profesional finalizada',
          'Para una ocupación en escasez, la formación debe corresponder a una ocupación de la lista vigente ese año. La lista se revisa cada año y en parte se fija por provincia.',
        ],
      },
      {
        en: [
          'Language certificate in German or English',
          'Both score points since the 2022 reform, which most older guides do not reflect; English alone can be enough in several categories.',
        ],
        pt: [
          'Certificado de idioma em alemão ou inglês',
          'Ambos pontuam desde a reforma de 2022, o que a maioria dos guias antigos não reflete; o inglês sozinho pode bastar em várias categorias.',
        ],
        es: [
          'Certificado de idioma en alemán o inglés',
          'Ambos puntúan desde la reforma de 2022, algo que la mayoría de las guías antiguas no refleja; el inglés solo puede bastar en varias categorías.',
        ],
      },
      {
        en: [
          'Formal recognition for a regulated profession',
          'Where the job is regulated, the card cannot be granted before the competent body recognises you, and that procedure is usually the slowest part of the whole file.',
        ],
        pt: [
          'Reconhecimento formal para profissão regulamentada',
          'Quando a profissão é regulamentada, o cartão não é concedido antes de o órgão competente o reconhecer, e esse procedimento costuma ser a parte mais lenta de todo o processo.',
        ],
        es: [
          'Reconocimiento formal para profesión regulada',
          'Cuando la profesión está regulada, la tarjeta no se concede antes de que el organismo competente le reconozca, y ese trámite suele ser lo más lento del expediente.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Salary meeting both the scheme minimum and the collective agreement',
          'Two separate floors apply and the higher one wins. Both move every year, so confirm the current figures instead of reusing what a colleague was offered last year.',
        ],
        pt: [
          'Salário que atende ao mínimo do esquema e à convenção coletiva',
          'Aplicam-se dois pisos distintos e vale o mais alto. Ambos mudam todo ano, então confirme os valores atuais em vez de reaproveitar o que um colega recebeu no ano passado.',
        ],
        es: [
          'Salario que cumple el mínimo del esquema y el convenio colectivo',
          'Se aplican dos umbrales distintos y prevalece el más alto. Ambos cambian cada año, así que confirme las cifras actuales en lugar de reutilizar la oferta de un colega del año pasado.',
        ],
      },
      {
        en: [
          'Health cover from the first day of the permit',
          'The statutory cover starts with the employment registration; anything before the start date has to be covered privately.',
        ],
        pt: [
          'Cobertura de saúde desde o primeiro dia do título',
          'A cobertura legal começa com o registo do vínculo laboral; o que vier antes da data de início tem de ser coberto de forma privada.',
        ],
        es: [
          'Cobertura sanitaria desde el primer día del título',
          'La cobertura legal comienza con el alta laboral; lo anterior a la fecha de inicio debe cubrirse de forma privada.',
        ],
      },
      {
        en: [
          'Pay the application and issuing charges',
          'Charged in two parts, at filing and at collection, and not refunded if the points assessment comes out short.',
        ],
        pt: [
          'Pagar os encargos de pedido e de emissão',
          'Cobrados em duas partes, no protocolo e na retirada, e não devolvidos se a avaliação de pontos ficar abaixo do mínimo.',
        ],
        es: [
          'Pagar las tasas de solicitud y de expedición',
          'Se cobran en dos partes, al presentar y al recoger, y no se devuelven si la evaluación de puntos queda por debajo del mínimo.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File abroad, or in Austria if you are already lawfully resident',
          'The employer may file on your behalf, but only one of you should: parallel files are treated as duplicates and slow each other down.',
        ],
        pt: [
          'Protocolar no exterior, ou na Áustria se já residir legalmente',
          'O empregador pode protocolar em seu nome, mas só um dos dois deve fazê-lo: processos paralelos são tratados como duplicados e atrasam um ao outro.',
        ],
        es: [
          'Presentar en el extranjero, o en Austria si ya reside legalmente',
          'El empleador puede presentar en su nombre, pero solo uno de los dos debe hacerlo: los expedientes paralelos se tratan como duplicados y se retrasan mutuamente.',
        ],
      },
      {
        en: [
          'Labour market assessment runs in parallel',
          'The employment service scores the file and answers the immigration authority within a statutory deadline; the employer has to stay reachable the whole time or the clock stops.',
        ],
        pt: [
          'A avaliação do mercado de trabalho corre em paralelo',
          'O serviço de emprego pontua o processo e responde à autoridade de estrangeiros num prazo legal; o empregador tem de continuar contactável, senão a contagem para.',
        ],
        es: [
          'La evaluación del mercado laboral corre en paralelo',
          'El servicio de empleo puntúa el expediente y responde a la autoridad de extranjería en un plazo legal; el empleador debe seguir localizable o el plazo se detiene.',
        ],
      },
      {
        en: [
          'Submit a complete file to keep the statutory clock running',
          'Missing documents suspend the deadline rather than pause it politely, and a case left incomplete for long enough is closed without a decision.',
        ],
        pt: [
          'Entregar um processo completo para manter o prazo legal a correr',
          'Documentos em falta suspendem o prazo em vez de o pausar gentilmente, e um processo incompleto por tempo suficiente é arquivado sem decisão.',
        ],
        es: [
          'Entregar un expediente completo para que siga corriendo el plazo legal',
          'Los documentos que faltan suspenden el plazo en lugar de pausarlo, y un expediente incompleto durante suficiente tiempo se archiva sin resolución.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric capture when the card is produced',
          'Taken at the immigration authority in Austria after the decision, not at the consulate where you applied.',
        ],
        pt: [
          'Recolha biométrica na produção do cartão',
          'Feita na autoridade de estrangeiros na Áustria após a decisão, e não no consulado onde você pediu.',
        ],
        es: [
          'Toma de biometría al producir la tarjeta',
          'Se realiza en la autoridad de extranjería en Austria tras la resolución, no en el consulado donde solicitó.',
        ],
      },
      {
        en: [
          'No routine medical examination',
          'Health screening is not part of this route; only the insurance cover is verified.',
        ],
        pt: [
          'Sem exame médico de rotina',
          'A triagem de saúde não faz parte desta via; verifica-se apenas a cobertura do seguro.',
        ],
        es: [
          'Sin examen médico rutinario',
          'El cribado sanitario no forma parte de esta vía; solo se verifica la cobertura del seguro.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the Red-White-Red Card at the immigration authority',
          'You are invited by letter; the card is not posted and cannot be picked up by anyone else.',
        ],
        pt: [
          'Retirar a Rot-Weiß-Rot Karte na autoridade de estrangeiros',
          'Você é convocado por carta; o cartão não é enviado pelo correio nem pode ser retirado por outra pessoa.',
        ],
        es: [
          'Recoger la Rot-Weiß-Rot Karte en la autoridad de extranjería',
          'Se le convoca por carta; la tarjeta no se envía por correo ni puede recogerla otra persona.',
        ],
      },
      {
        en: [
          'Register the address within three days of moving in',
          'The Meldezettel is what the bank, the tax office and the health fund all ask for first, and the three-day deadline is enforced.',
        ],
        pt: [
          'Registar a morada em três dias após a mudança',
          'O Meldezettel é o que o banco, as finanças e o fundo de saúde pedem primeiro, e o prazo de três dias é cobrado.',
        ],
        es: [
          'Registrar el domicilio en los tres días siguientes a la mudanza',
          'El Meldezettel es lo primero que piden el banco, Hacienda y el fondo sanitario, y el plazo de tres días se exige de verdad.',
        ],
      },
      {
        en: [
          'Report a change of employer before starting the new job',
          'The card is tied to the employer it was granted for. A new job needs a new card, and starting before it is granted counts as unlawful employment.',
        ],
        pt: [
          'Comunicar a troca de empregador antes de começar no novo',
          'O cartão está vinculado ao empregador para o qual foi concedido. Uma nova vaga exige novo cartão, e começar antes da concessão conta como trabalho irregular.',
        ],
        es: [
          'Comunicar el cambio de empleador antes de empezar en el nuevo',
          'La tarjeta está vinculada al empleador para el que se concedió. Un nuevo empleo exige una tarjeta nueva, y empezar antes de la concesión cuenta como trabajo irregular.',
        ],
      },
      {
        en: [
          'Apply for the Red-White-Red Card plus once you qualify',
          'It removes the tie to a single employer and opens free access to the labour market, but it requires Integration Agreement Module 1 to be completed first.',
        ],
        pt: [
          'Pedir a Rot-Weiß-Rot Karte plus assim que se qualificar',
          'Ela elimina o vínculo a um único empregador e abre acesso livre ao mercado de trabalho, mas exige o Módulo 1 do Acordo de Integração concluído antes.',
        ],
        es: [
          'Solicitar la Rot-Weiß-Rot Karte plus en cuanto cumpla los requisitos',
          'Elimina el vínculo con un único empleador y abre el acceso libre al mercado laboral, pero exige haber completado antes el Módulo 1 del Acuerdo de Integración.',
        ],
        priority: 2,
      },
      {
        en: [
          'Keep the salary and the working hours as declared',
          'A cut in pay or a move to part time can cost the card at renewal, because the thresholds are tested again each time.',
        ],
        pt: [
          'Manter o salário e a jornada conforme declarados',
          'Um corte de remuneração ou a passagem a tempo parcial podem custar o cartão na renovação, porque os pisos são testados de novo a cada vez.',
        ],
        es: [
          'Mantener el salario y la jornada tal como se declararon',
          'Una bajada de sueldo o el paso a jornada parcial pueden costar la tarjeta en la renovación, porque los umbrales se comprueban de nuevo cada vez.',
        ],
      },
    ],
  },
};
