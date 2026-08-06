import type { CountryVisaSteps } from './types';

/**
 * Steps for Luxembourg.
 *
 * Nothing begins at an embassy. Any stay over three months starts with a
 * temporary authorisation to stay, requested by post from the Immigration
 * Directorate while you are still abroad; the type D visa is only issued once
 * that authorisation exists, and a file opened from inside the country is
 * refused.
 *
 * The clock after landing is unusually short. The declaration of arrival is due
 * at the commune within three days, and a compulsory medical examination has to
 * be done in Luxembourg before the residence permit itself is delivered.
 *
 * The administration works in French, German and Luxembourgish, so anything in
 * another language needs a sworn translation — and Luxembourgish specifically is
 * the language naturalisation later tests.
 */
export const luxembourg: CountryVisaSteps = {
  'Short-Stay Visa (Schengen Type C)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Valid for at least three months beyond the planned departure, issued in the last ten years and with two blank pages.',
        ],
        pt: [
          'Passaporte válido',
          'Válido por pelo menos três meses além da saída prevista, emitido nos últimos dez anos e com duas páginas em branco.',
        ],
        es: [
          'Pasaporte vigente',
          'Vigente al menos tres meses más allá de la salida prevista, emitido en los últimos diez años y con dos páginas en blanco.',
        ],
      },
      {
        en: [
          'Benelux harmonised application form',
          'Luxembourg, Belgium and the Netherlands share a single form, and in many countries a Belgian or Dutch mission receives the file on behalf of Luxembourg.',
        ],
        pt: [
          'Formulário harmonizado Benelux',
          'Luxemburgo, Bélgica e Países Baixos partilham um único formulário, e em muitos países uma missão belga ou neerlandesa recebe o processo em nome do Luxemburgo.',
        ],
        es: [
          'Formulario armonizado Benelux',
          'Luxemburgo, Bélgica y Países Bajos comparten un único formulario, y en muchos países una misión belga o neerlandesa recibe el expediente en nombre de Luxemburgo.',
        ],
      },
      {
        en: [
          'Two recent identity photographs',
          'ICAO format, taken within the last six months, on a light background.',
        ],
        pt: [
          'Duas fotografias de identidade recentes',
          'Formato ICAO, tiradas nos últimos seis meses, em fundo claro.',
        ],
        es: [
          'Dos fotografías de identidad recientes',
          'Formato ICAO, tomadas en los últimos seis meses, con fondo claro.',
        ],
      },
      {
        en: [
          'Return travel booking',
          'A reservation is enough; buying the ticket before the decision only increases what you lose on a refusal.',
        ],
        pt: [
          'Reserva de viagem de volta',
          'Basta a reserva; comprar a passagem antes da decisão só aumenta o prejuízo em caso de recusa.',
        ],
        es: [
          'Reserva de viaje de vuelta',
          'Basta la reserva; comprar el billete antes de la decisión solo aumenta la pérdida si deniegan.',
        ],
      },
      {
        en: [
          'Proof of accommodation or a taking-in-charge declaration',
          'Either a hotel booking, or a prise en charge signed by a resident and certified by their commune, which makes the host financially liable for you.',
        ],
        pt: [
          'Comprovativo de alojamento ou declaração de tomada a cargo',
          'Reserva de hotel, ou uma prise en charge assinada por um residente e certificada pela comuna dele, que torna o anfitrião financeiramente responsável por você.',
        ],
        es: [
          'Comprobante de alojamiento o declaración de toma a cargo',
          'Reserva de hotel, o una prise en charge firmada por un residente y certificada por su comuna, que hace al anfitrión responsable económico de usted.',
        ],
      },
      {
        en: [
          'Travel medical insurance',
          'Minimum cover of 30,000 euros, valid in every Schengen state and for the whole period requested.',
        ],
        pt: [
          'Seguro médico de viagem',
          'Cobertura mínima de 30 mil euros, válida em todos os Estados Schengen e por todo o período pedido.',
        ],
        es: [
          'Seguro médico de viaje',
          'Cobertura mínima de 30 mil euros, válida en todos los Estados Schengen y durante todo el periodo solicitado.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of means for each day of the stay',
          'A daily amount per person, reduced when a host has signed the taking-in-charge. Confirm the figure in force rather than an amount found online.',
        ],
        pt: [
          'Comprovativo de meios para cada dia da estada',
          'Um valor diário por pessoa, reduzido quando um anfitrião assina a tomada a cargo. Confirme o valor vigente em vez de um número achado na internet.',
        ],
        es: [
          'Comprobante de medios para cada día de la estancia',
          'Un importe diario por persona, reducido cuando un anfitrión firma la toma a cargo. Confirme la cifra vigente en lugar de un importe hallado en internet.',
        ],
      },
      {
        en: [
          'Bank statements for the last three months',
          'A balance that appeared a few days before the application is read as borrowed money.',
        ],
        pt: [
          'Extratos bancários dos últimos três meses',
          'Um saldo que apareceu poucos dias antes do pedido é lido como dinheiro emprestado.',
        ],
        es: [
          'Extractos bancarios de los últimos tres meses',
          'Un saldo que apareció pocos días antes de la solicitud se interpreta como dinero prestado.',
        ],
      },
      {
        en: [
          'Proof of ties to your country of residence',
          'Employment, studies, property or family. The consulate is deciding whether you will go home, not whether you can pay.',
        ],
        pt: [
          'Comprovativo de vínculos com o país de residência',
          'Emprego, estudos, imóveis ou família. O consulado decide se você vai voltar, não se você consegue pagar.',
        ],
        es: [
          'Comprobante de vínculos con su país de residencia',
          'Empleo, estudios, propiedades o familia. El consulado decide si volverá, no si puede pagar.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Check which mission is competent for you',
          'Luxembourg has few consulates and relies on Benelux representation agreements. Filing at the wrong mission costs weeks.',
        ],
        pt: [
          'Verificar qual missão é competente para você',
          'O Luxemburgo tem poucos consulados e recorre a acordos de representação Benelux. Entregar na missão errada custa semanas.',
        ],
        es: [
          'Comprobar qué misión es competente para usted',
          'Luxemburgo tiene pocos consulados y recurre a acuerdos de representación Benelux. Presentar en la misión equivocada cuesta semanas.',
        ],
      },
      {
        en: [
          'Pay the visa fee when filing',
          'It is not refunded on refusal, and it is charged in local currency at the mission exchange rate.',
        ],
        pt: [
          'Pagar a taxa de visto na entrega',
          'Não é devolvida em caso de recusa, e é cobrada em moeda local à taxa de câmbio da missão.',
        ],
        es: [
          'Pagar la tasa de visado al presentar',
          'No se devuelve si deniegan, y se cobra en moneda local al tipo de cambio de la misión.',
        ],
      },
      {
        en: [
          'File between six months and fifteen days before travel',
          'Earlier is not accepted; later leaves no margin if additional documents are requested.',
        ],
        pt: [
          'Entregar entre seis meses e quinze dias antes da viagem',
          'Antes disso não é aceite; depois não sobra margem se pedirem documentos adicionais.',
        ],
        es: [
          'Presentar entre seis meses y quince días antes del viaje',
          'Antes no se acepta; después no queda margen si piden documentos adicionales.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints and photograph for the visa information system',
          'Kept for 59 months across Schengen applications, so a later application may reuse them.',
        ],
        pt: [
          'Impressões digitais e fotografia para o sistema de informação de vistos',
          'Guardadas por 59 meses entre pedidos Schengen, de modo que um pedido posterior pode reaproveitá-las.',
        ],
        es: [
          'Huellas y fotografía para el sistema de información de visados',
          'Se conservan 59 meses entre solicitudes Schengen, por lo que una solicitud posterior puede reutilizarlas.',
        ],
      },
      {
        en: [
          'Medical examination',
          'Not required for a short stay. It becomes compulsory as soon as the intended stay passes three months.',
        ],
        pt: [
          'Exame médico',
          'Não é exigido em estada curta. Passa a ser obrigatório assim que a estada pretendida ultrapassa três meses.',
        ],
        es: [
          'Examen médico',
          'No se exige en estancia corta. Pasa a ser obligatorio en cuanto la estancia prevista supera tres meses.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Check the territorial validity printed on the sticker',
          'A visa limited to certain states does not open the whole Schengen area, and the number of entries matters as much as the dates.',
        ],
        pt: [
          'Conferir a validade territorial impressa na vinheta',
          'Um visto limitado a certos Estados não abre todo o espaço Schengen, e o número de entradas importa tanto quanto as datas.',
        ],
        es: [
          'Revisar la validez territorial impresa en la etiqueta',
          'Un visado limitado a ciertos Estados no abre todo el espacio Schengen, y el número de entradas importa tanto como las fechas.',
        ],
      },
      {
        en: [
          'Keep within 90 days in any 180',
          'Counted across all Schengen states together, including the days spent in neighbouring Belgium, France and Germany.',
        ],
        pt: [
          'Manter-se dentro dos 90 dias em cada 180',
          'Contados no conjunto dos Estados Schengen, incluindo os dias passados na vizinha Bélgica, França e Alemanha.',
        ],
        es: [
          'Mantenerse dentro de los 90 días en cada 180',
          'Se cuentan en el conjunto de los Estados Schengen, incluidos los días pasados en la vecina Bélgica, Francia y Alemania.',
        ],
      },
      {
        en: [
          'Do not try to turn the visit into residence',
          'Luxembourg refuses residence files opened from inside the country. The temporary authorisation has to be granted before you arrive.',
        ],
        pt: [
          'Não tentar transformar a visita em residência',
          'O Luxemburgo recusa processos de residência abertos de dentro do país. A autorização temporária precisa ser concedida antes de você chegar.',
        ],
        es: [
          'No intentar convertir la visita en residencia',
          'Luxemburgo rechaza expedientes de residencia abiertos desde dentro del país. La autorización temporal debe concederse antes de su llegada.',
        ],
      },
      {
        en: [
          'Keep the boarding passes and the exit stamp',
          'They are the only evidence you left on time if a later application questions your record.',
        ],
        pt: [
          'Guardar os cartões de embarque e o carimbo de saída',
          'São a única prova de que você saiu no prazo se um pedido futuro questionar o seu histórico.',
        ],
        es: [
          'Guardar las tarjetas de embarque y el sello de salida',
          'Son la única prueba de que salió a tiempo si una solicitud posterior cuestiona su historial.',
        ],
        priority: 2,
      },
    ],
  },

  'Long-Stay Visa (Type D)': {
    core_documents: [
      {
        en: [
          'Request the temporary authorisation to stay first',
          'The autorisation de séjour temporaire is asked of the Immigration Directorate from abroad, before any visa. Without it the type D visa simply cannot be issued.',
        ],
        pt: [
          'Pedir primeiro a autorização temporária de estada',
          'A autorisation de séjour temporaire é pedida à Direção da Imigração desde o exterior, antes de qualquer visto. Sem ela o visto D não pode ser emitido.',
        ],
        es: [
          'Solicitar primero la autorización temporal de estancia',
          'La autorisation de séjour temporaire se pide a la Dirección de Inmigración desde el extranjero, antes de cualquier visado. Sin ella el visado D no puede expedirse.',
        ],
      },
      {
        en: [
          'Valid passport covering the intended stay',
          'A copy of every written page goes into the file, not only the identity page.',
        ],
        pt: [
          'Passaporte válido cobrindo a estada pretendida',
          'Vai para o processo uma cópia de todas as páginas escritas, não apenas a de identificação.',
        ],
        es: [
          'Pasaporte vigente que cubra la estancia prevista',
          'Al expediente se adjunta copia de todas las páginas escritas, no solo la de identificación.',
        ],
      },
      {
        en: [
          'Signed letter setting out the ground of stay',
          'Work, study, family or private reasons. The ground chosen decides which annexes are required and cannot be changed later without a new authorisation.',
        ],
        pt: [
          'Carta assinada indicando o motivo da estada',
          'Trabalho, estudo, família ou motivos particulares. O motivo escolhido define quais anexos são exigidos e não pode ser trocado depois sem nova autorização.',
        ],
        es: [
          'Carta firmada que indique el motivo de la estancia',
          'Trabajo, estudio, familia o motivos particulares. El motivo elegido define qué anexos se exigen y no puede cambiarse después sin una nueva autorización.',
        ],
      },
      {
        en: [
          'Full birth certificate, legalised or apostilled',
          'A recent full copy, not an extract. The apostille or consular legalisation is verified separately from the document itself.',
        ],
        pt: [
          'Certidão de nascimento em inteiro teor, legalizada ou apostilada',
          'Uma cópia integral recente, não um extrato. A apostila ou legalização consular é verificada à parte do próprio documento.',
        ],
        es: [
          'Partida de nacimiento literal, legalizada o apostillada',
          'Una copia íntegra reciente, no un extracto. La apostilla o legalización consular se verifica aparte del propio documento.',
        ],
      },
      {
        en: [
          'Sworn translation into French, German or English',
          'The administration works in French, German and Luxembourgish. A document in Portuguese or Spanish without a sworn translation stops the file.',
        ],
        pt: [
          'Tradução juramentada para francês, alemão ou inglês',
          'A administração funciona em francês, alemão e luxemburguês. Um documento em português ou espanhol sem tradução juramentada trava o processo.',
        ],
        es: [
          'Traducción jurada al francés, alemán o inglés',
          'La administración funciona en francés, alemán y luxemburgués. Un documento en portugués o español sin traducción jurada bloquea el expediente.',
        ],
      },
      {
        en: [
          'Criminal record certificate from every country lived in',
          'Covering the last five years of residence, and usually accepted only if issued within the previous six months.',
        ],
        pt: [
          'Certidão de antecedentes criminais de cada país onde morou',
          'Cobrindo os últimos cinco anos de residência, e em geral aceite apenas se emitida nos seis meses anteriores.',
        ],
        es: [
          'Certificado de antecedentes penales de cada país donde vivió',
          'Que cubra los últimos cinco años de residencia, y normalmente aceptado solo si se emitió en los seis meses anteriores.',
        ],
      },
      {
        en: [
          'Proof of accommodation in Luxembourg',
          'A lease or a host declaration. Housing is scarce and expensive, and this is usually the hardest annex to produce from abroad.',
        ],
        pt: [
          'Comprovativo de alojamento no Luxemburgo',
          'Um contrato de arrendamento ou declaração de anfitrião. A habitação é escassa e cara, e este costuma ser o anexo mais difícil de obter do exterior.',
        ],
        es: [
          'Comprobante de alojamiento en Luxemburgo',
          'Un contrato de alquiler o una declaración de anfitrión. La vivienda es escasa y cara, y suele ser el anexo más difícil de conseguir desde fuera.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Recognition of your diploma by the Ministry of Higher Education',
          'Foreign qualifications are entered in the national register of certificates. Qualified employment and regulated professions both depend on that entry.',
        ],
        pt: [
          'Reconhecimento do diploma pelo Ministério do Ensino Superior',
          'As qualificações estrangeiras são inscritas no registo nacional de títulos. Tanto o emprego qualificado quanto as profissões regulamentadas dependem dessa inscrição.',
        ],
        es: [
          'Reconocimiento del título por el Ministerio de Enseñanza Superior',
          'Las cualificaciones extranjeras se inscriben en el registro nacional de títulos. Tanto el empleo cualificado como las profesiones reguladas dependen de esa inscripción.',
        ],
        priority: 2,
      },
      {
        en: [
          'Professional authorisation for a regulated activity',
          'Health, law, crafts and commerce each have their own authorisation, granted by a different ministry from the one issuing the residence permit.',
        ],
        pt: [
          'Autorização profissional para atividade regulamentada',
          'Saúde, direito, ofícios e comércio têm cada um a sua autorização, concedida por um ministério diferente do que emite a autorização de residência.',
        ],
        es: [
          'Autorización profesional para actividad regulada',
          'Sanidad, derecho, oficios y comercio tienen cada uno su propia autorización, concedida por un ministerio distinto del que expide el permiso de residencia.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of stable and sufficient resources',
          'Measured against the national reference amount, which is revised periodically. Confirm the level in force instead of a figure quoted in an article.',
        ],
        pt: [
          'Comprovação de recursos estáveis e suficientes',
          'Medidos contra o montante nacional de referência, revisto periodicamente. Confirme o nível vigente em vez de um valor citado num artigo.',
        ],
        es: [
          'Prueba de recursos estables y suficientes',
          'Se miden contra el importe nacional de referencia, revisado periódicamente. Confirme el nivel vigente en lugar de una cifra citada en un artículo.',
        ],
      },
      {
        en: [
          'Health insurance valid from the day of arrival',
          'Private cover is needed until affiliation to the national health fund takes effect, and the gap is rarely as short as expected.',
        ],
        pt: [
          'Seguro de saúde válido desde o dia da chegada',
          'É preciso cobertura privada até a afiliação à caixa nacional de saúde produzir efeito, e o intervalo raramente é tão curto quanto se espera.',
        ],
        es: [
          'Seguro de salud válido desde el día de llegada',
          'Hace falta cobertura privada hasta que surta efecto la afiliación a la caja nacional de salud, y el intervalo rara vez es tan corto como se espera.',
        ],
      },
      {
        en: [
          'Pay the chancery fee by bank transfer',
          'The file is only opened once the transfer arrives, and the payment reference has to identify the applicant.',
        ],
        pt: [
          'Pagar a taxa de chancelaria por transferência bancária',
          'O processo só é aberto quando a transferência chega, e a referência do pagamento precisa identificar o requerente.',
        ],
        es: [
          'Pagar la tasa de cancillería por transferencia bancaria',
          'El expediente solo se abre cuando llega la transferencia, y la referencia del pago debe identificar al solicitante.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Send the file by registered post to the Immigration Directorate',
          'Several categories are still handled on paper, and an emailed copy does not start the process.',
        ],
        pt: [
          'Enviar o processo por carta registada à Direção da Imigração',
          'Várias categorias ainda são tratadas em papel, e uma cópia por email não inicia o processo.',
        ],
        es: [
          'Enviar el expediente por correo certificado a la Dirección de Inmigración',
          'Varias categorías se tramitan todavía en papel, y una copia por correo electrónico no inicia el trámite.',
        ],
      },
      {
        en: [
          'Apply for the type D visa within the authorisation validity',
          'The authorisation is valid for a limited window; a visa requested after it lapses means starting the whole file again. The appointment is often at a Belgian consulate acting for Luxembourg, with its own calendar.',
        ],
        pt: [
          'Pedir o visto D dentro da validade da autorização',
          'A autorização vale por uma janela limitada; um visto pedido depois de ela caducar significa recomeçar todo o processo. O atendimento é muitas vezes num consulado belga atuando pelo Luxemburgo, com agenda própria.',
        ],
        es: [
          'Solicitar el visado D dentro de la vigencia de la autorización',
          'La autorización vale por una ventana limitada; un visado solicitado tras su caducidad obliga a rehacer todo el expediente. La cita suele ser en un consulado belga que actúa por Luxemburgo, con su propia agenda.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric enrolment for the long-stay visa',
          'Fingerprints and photograph are taken when the type D application is filed at the mission.',
        ],
        pt: [
          'Recolha biométrica para o visto de longa duração',
          'Impressões digitais e fotografia são recolhidas quando o pedido de visto D é entregue na missão.',
        ],
        es: [
          'Registro biométrico para el visado de larga duración',
          'Las huellas y la fotografía se toman al presentar la solicitud de visado D en la misión.',
        ],
      },
      {
        en: [
          'Compulsory medical examination after arrival',
          'A chest X-ray and blood test with an approved doctor in Luxembourg, done in the first weeks after you land.',
        ],
        pt: [
          'Exame médico obrigatório após a chegada',
          'Radiografia de tórax e exame de sangue com um médico aprovado no Luxemburgo, feitos nas primeiras semanas após a chegada.',
        ],
        es: [
          'Examen médico obligatorio tras la llegada',
          'Radiografía de tórax y análisis de sangre con un médico autorizado en Luxemburgo, realizados en las primeras semanas tras llegar.',
        ],
      },
      {
        en: [
          'Medical certificate sent to the Health Directorate',
          'The residence permit is not issued until the certificate confirming fitness reaches the administration, so the exam is a gate, not a formality.',
        ],
        pt: [
          'Atestado médico enviado à Direção da Saúde',
          'A autorização de residência não é emitida enquanto o atestado de aptidão não chega à administração, então o exame é uma barreira, não uma formalidade.',
        ],
        es: [
          'Certificado médico enviado a la Dirección de Sanidad',
          'El permiso de residencia no se expide hasta que el certificado de aptitud llega a la administración, así que el examen es una barrera, no un trámite.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Declaration of arrival at the commune within three days',
          'Made at the town hall of the address where you live. The deadline is counted in days, not weeks, and everything else follows from this registration.',
        ],
        pt: [
          'Declaração de chegada na comuna em até três dias',
          'Feita na prefeitura da morada onde você vive. O prazo é contado em dias, não em semanas, e todo o resto decorre deste registo.',
        ],
        es: [
          'Declaración de llegada en la comuna en tres días',
          'Se hace en el ayuntamiento del domicilio donde vive. El plazo se cuenta en días, no en semanas, y todo lo demás depende de este registro.',
        ],
      },
      {
        en: [
          'Apply for the residence permit within three months of arrival',
          'The type D visa only covers the entry. The permit itself is a separate request to the Immigration Directorate.',
        ],
        pt: [
          'Pedir o título de residência em até três meses da chegada',
          'O visto D cobre apenas a entrada. O título em si é um pedido separado à Direção da Imigração.',
        ],
        es: [
          'Solicitar el permiso de residencia en tres meses desde la llegada',
          'El visado D solo cubre la entrada. El permiso en sí es una solicitud aparte a la Dirección de Inmigración.',
        ],
      },
      {
        en: [
          'Collect the biometric card and register with social security',
          'Affiliation at the joint social security centre is what opens the health fund and gives you the national identification number.',
        ],
        pt: [
          'Retirar o cartão biométrico e inscrever-se na segurança social',
          'A afiliação ao centro comum da segurança social é o que abre a caixa de saúde e lhe dá o número de identificação nacional.',
        ],
        es: [
          'Recoger la tarjeta biométrica e inscribirse en la seguridad social',
          'La afiliación al centro común de seguridad social es lo que abre la caja de salud y le da el número de identificación nacional.',
        ],
      },
      {
        en: [
          'Ask for a new authorisation before changing purpose',
          'The permit is tied to the ground it was granted for; moving from study to work, or between employers, needs a fresh decision.',
        ],
        pt: [
          'Pedir nova autorização antes de mudar de motivo',
          'O título está vinculado ao motivo pelo qual foi concedido; passar de estudo para trabalho, ou trocar de empregador, exige nova decisão.',
        ],
        es: [
          'Pedir una nueva autorización antes de cambiar de motivo',
          'El permiso está ligado al motivo por el que se concedió; pasar de estudio a trabajo, o cambiar de empleador, exige una nueva decisión.',
        ],
      },
      {
        en: [
          'Start French, German or Luxembourgish early',
          'Courses at the national language institute are subsidised, and Luxembourgish is the language later tested for naturalisation.',
        ],
        pt: [
          'Começar cedo francês, alemão ou luxemburguês',
          'Os cursos do instituto nacional de línguas são subsidiados, e o luxemburguês é a língua depois avaliada na naturalização.',
        ],
        es: [
          'Empezar pronto con el francés, el alemán o el luxemburgués',
          'Los cursos del instituto nacional de lenguas están subvencionados, y el luxemburgués es la lengua que después se evalúa en la naturalización.',
        ],
        priority: 2,
      },
    ],
  },

  'EU Blue Card': {
    core_documents: [
      {
        en: [
          'Confirm the job qualifies as highly skilled',
          'The Blue Card needs a post matching a higher qualification and a contract long enough to support it. A shorter or lower-graded job goes down the ordinary salaried route instead.',
        ],
        pt: [
          'Confirmar que a vaga se qualifica como altamente qualificada',
          'O Cartão Azul exige um posto compatível com uma qualificação superior e um contrato longo o bastante para sustentá-lo. Uma vaga mais curta ou de nível inferior segue pela via salarial comum.',
        ],
        es: [
          'Confirmar que el puesto califica como altamente cualificado',
          'La Tarjeta Azul exige un puesto acorde con una cualificación superior y un contrato lo bastante largo para sostenerla. Un empleo más corto o de menor nivel va por la vía salarial ordinaria.',
        ],
      },
      {
        en: [
          'Employment contract or binding job offer signed',
          'It has to state the salary, the function and a duration that covers the card being requested.',
        ],
        pt: [
          'Contrato de trabalho ou proposta vinculativa assinada',
          'Precisa indicar o salário, a função e uma duração que cubra o cartão pedido.',
        ],
        es: [
          'Contrato de trabajo u oferta vinculante firmada',
          'Debe indicar el salario, la función y una duración que cubra la tarjeta solicitada.',
        ],
      },
      {
        en: [
          'Valid passport and a full copy of it',
          'The card is never issued for a period longer than the passport runs.',
        ],
        pt: [
          'Passaporte válido e cópia integral dele',
          'O cartão nunca é emitido por prazo maior do que a validade do passaporte.',
        ],
        es: [
          'Pasaporte vigente y copia íntegra del mismo',
          'La tarjeta nunca se expide por un plazo mayor que la vigencia del pasaporte.',
        ],
      },
      {
        en: [
          'Temporary authorisation filed by post before travelling',
          'The Blue Card follows the same rule as any long stay in Luxembourg: the authorisation comes first, from abroad, and only then the visa.',
        ],
        pt: [
          'Autorização temporária enviada por correio antes de viajar',
          'O Cartão Azul segue a mesma regra de qualquer estada longa no Luxemburgo: a autorização vem primeiro, do exterior, e só depois o visto.',
        ],
        es: [
          'Autorización temporal enviada por correo antes de viajar',
          'La Tarjeta Azul sigue la misma regla que cualquier estancia larga en Luxemburgo: la autorización va primero, desde el extranjero, y solo después el visado.',
        ],
      },
      {
        en: [
          'Legalised civil status documents with sworn translation',
          'Birth certificate, and marriage certificate for family members, apostilled and translated into French, German or English.',
        ],
        pt: [
          'Documentos de estado civil legalizados com tradução juramentada',
          'Certidão de nascimento, e de casamento para familiares, apostiladas e traduzidas para francês, alemão ou inglês.',
        ],
        es: [
          'Documentos de estado civil legalizados con traducción jurada',
          'Partida de nacimiento, y de matrimonio para los familiares, apostilladas y traducidas al francés, alemán o inglés.',
        ],
      },
      {
        en: [
          'Recent criminal record certificate for the file',
          'From each country of residence over the last five years, generally not older than six months.',
        ],
        pt: [
          'Certidão criminal recente para o processo',
          'De cada país de residência nos últimos cinco anos, em geral com menos de seis meses.',
        ],
        es: [
          'Certificado de antecedentes penales reciente para el expediente',
          'De cada país de residencia en los últimos cinco años, por lo general con menos de seis meses.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Higher education diploma of at least three years',
          'Registered with the Ministry of Higher Education. That recognition is a separate procedure from the immigration file and is usually what delays it.',
        ],
        pt: [
          'Diploma de ensino superior de pelo menos três anos',
          'Inscrito no Ministério do Ensino Superior. Esse reconhecimento é um procedimento separado do processo migratório e costuma ser o que o atrasa.',
        ],
        es: [
          'Título de educación superior de al menos tres años',
          'Inscrito en el Ministerio de Enseñanza Superior. Ese reconocimiento es un trámite aparte del expediente migratorio y suele ser lo que lo retrasa.',
        ],
      },
      {
        en: [
          'Professional experience as an alternative to the diploma',
          'Several years of relevant experience are accepted in place of a degree only in certain sectors, notably information and communication technology.',
        ],
        pt: [
          'Experiência profissional como alternativa ao diploma',
          'Vários anos de experiência relevante são aceites no lugar do diploma apenas em certos setores, sobretudo tecnologias de informação e comunicação.',
        ],
        es: [
          'Experiencia profesional como alternativa al título',
          'Varios años de experiencia relevante se aceptan en lugar del título solo en ciertos sectores, sobre todo tecnologías de la información y la comunicación.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Gross salary above the Blue Card threshold',
          'Set as a multiple of the national average wage and revised every year, with a reduced level for shortage occupations. Verify the current figure before signing.',
        ],
        pt: [
          'Salário bruto acima do piso do Cartão Azul',
          'Definido como um múltiplo do salário médio nacional e revisto todos os anos, com um nível reduzido para ocupações em falta. Verifique o valor atual antes de assinar.',
        ],
        es: [
          'Salario bruto por encima del umbral de la Tarjeta Azul',
          'Fijado como múltiplo del salario medio nacional y revisado cada año, con un nivel reducido para ocupaciones en escasez. Verifique la cifra actual antes de firmar.',
        ],
      },
      {
        en: [
          'Health cover from the first day of work',
          'Affiliation to the national fund starts with the employer declaration, and private cover has to bridge whatever gap remains.',
        ],
        pt: [
          'Cobertura de saúde desde o primeiro dia de trabalho',
          'A afiliação à caixa nacional começa com a declaração do empregador, e a cobertura privada precisa cobrir o intervalo que restar.',
        ],
        es: [
          'Cobertura sanitaria desde el primer día de trabajo',
          'La afiliación a la caja nacional empieza con la declaración del empleador, y la cobertura privada debe cubrir el intervalo restante.',
        ],
      },
      {
        en: [
          'Pay the fees for the authorisation and for the card',
          'Two separate bank transfers: one when the authorisation is requested, one when the card is issued.',
        ],
        pt: [
          'Pagar as taxas da autorização e do cartão',
          'Duas transferências bancárias distintas: uma no pedido da autorização, outra na emissão do cartão.',
        ],
        es: [
          'Pagar las tasas de la autorización y de la tarjeta',
          'Dos transferencias bancarias distintas: una al pedir la autorización y otra al expedirse la tarjeta.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Submit the Blue Card file to the Immigration Directorate',
          'Sent by registered post, with the employer documents attached to yours in a single package.',
        ],
        pt: [
          'Entregar o processo do Cartão Azul à Direção da Imigração',
          'Enviado por carta registada, com os documentos do empregador anexados aos seus num único envio.',
        ],
        es: [
          'Presentar el expediente de Tarjeta Azul a la Dirección de Inmigración',
          'Se envía por correo certificado, con los documentos del empleador adjuntos a los suyos en un solo paquete.',
        ],
      },
      {
        en: [
          'Obtain the type D visa once the authorisation is approved',
          'Requested at the competent mission and only valid within the window the authorisation gives you.',
        ],
        pt: [
          'Obter o visto D depois de aprovada a autorização',
          'Pedido na missão competente e válido apenas dentro da janela que a autorização concede.',
        ],
        es: [
          'Obtener el visado D una vez aprobada la autorización',
          'Se solicita en la misión competente y solo vale dentro de la ventana que concede la autorización.',
        ],
      },
      {
        en: [
          'Employer declares the vacancy to the employment agency',
          'The national employment agency must have been notified of the post. The omission is the employer failing, but the refusal lands on you.',
        ],
        pt: [
          'Empregador declara a vaga à agência de emprego',
          'A agência nacional de emprego precisa ter sido notificada do posto. A omissão é falha do empregador, mas a recusa cai sobre você.',
        ],
        es: [
          'El empleador declara la vacante a la agencia de empleo',
          'La agencia nacional de empleo debe haber sido notificada del puesto. La omisión es del empleador, pero la denegación recae sobre usted.',
        ],
        priority: 2,
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometrics taken at the visa appointment',
          'Fingerprints and photograph at the mission handling the file on behalf of Luxembourg.',
        ],
        pt: [
          'Biometria recolhida no atendimento do visto',
          'Impressões digitais e fotografia na missão que trata o processo em nome do Luxemburgo.',
        ],
        es: [
          'Biometría tomada en la cita del visado',
          'Huellas y fotografía en la misión que gestiona el expediente en nombre de Luxemburgo.',
        ],
      },
      {
        en: [
          'Medical check with an approved doctor after arriving',
          'The same tuberculosis screening required of every long-stay applicant, and a condition for the card to be delivered.',
        ],
        pt: [
          'Consulta médica com médico aprovado após a chegada',
          'O mesmo rastreio de tuberculose exigido a qualquer requerente de longa duração, e condição para o cartão ser entregue.',
        ],
        es: [
          'Revisión médica con un médico autorizado tras llegar',
          'El mismo cribado de tuberculosis exigido a todo solicitante de larga duración, y condición para que se entregue la tarjeta.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Register at the commune within three days of arriving',
          'The declaration of arrival opens the address registration that every later step reads from.',
        ],
        pt: [
          'Registar-se na comuna em três dias após chegar',
          'A declaração de chegada abre o registo de morada que todos os passos seguintes consultam.',
        ],
        es: [
          'Registrarse en la comuna en tres días tras llegar',
          'La declaración de llegada abre el registro de domicilio del que dependen todos los pasos siguientes.',
        ],
      },
      {
        en: [
          'Request the Blue Card itself within three months',
          'Filed at the Immigration Directorate with the medical certificate and the proof of registration from the commune.',
        ],
        pt: [
          'Pedir o próprio Cartão Azul em até três meses',
          'Entregue na Direção da Imigração com o atestado médico e o comprovativo de registo emitido pela comuna.',
        ],
        es: [
          'Solicitar la propia Tarjeta Azul en tres meses',
          'Se presenta en la Dirección de Inmigración con el certificado médico y el comprobante de registro de la comuna.',
        ],
      },
      {
        en: [
          'Get approval before changing employer or function',
          'In the first years a change has to be authorised in advance. Starting the new job first is what invalidates the card.',
        ],
        pt: [
          'Obter aprovação antes de mudar de empregador ou função',
          'Nos primeiros anos a mudança precisa ser autorizada antes. Começar o novo emprego primeiro é o que invalida o cartão.',
        ],
        es: [
          'Obtener aprobación antes de cambiar de empleador o función',
          'En los primeros años el cambio debe autorizarse antes. Empezar el nuevo empleo primero es lo que invalida la tarjeta.',
        ],
      },
      {
        en: [
          'Bring family without waiting the usual delay',
          'Blue Card holders can apply for family reunification immediately, with no minimum period of prior residence.',
        ],
        pt: [
          'Trazer a família sem esperar o prazo habitual',
          'Titulares do Cartão Azul podem pedir o reagrupamento familiar de imediato, sem período mínimo de residência prévia.',
        ],
        es: [
          'Traer a la familia sin esperar el plazo habitual',
          'Los titulares de Tarjeta Azul pueden pedir la reagrupación familiar de inmediato, sin periodo mínimo de residencia previa.',
        ],
        priority: 2,
      },
      {
        en: [
          'Count Blue Card time towards EU long-term residence',
          'Periods spent as a Blue Card holder in other member states can be added together, which is the practical advantage over an ordinary work permit.',
        ],
        pt: [
          'Somar o tempo de Cartão Azul para a residência de longa duração UE',
          'Os períodos passados como titular do Cartão Azul noutros Estados-Membros podem ser somados, e essa é a vantagem prática sobre uma autorização de trabalho comum.',
        ],
        es: [
          'Sumar el tiempo de Tarjeta Azul para la residencia de larga duración UE',
          'Los periodos como titular de Tarjeta Azul en otros Estados miembros pueden acumularse, y esa es la ventaja práctica frente a un permiso de trabajo ordinario.',
        ],
        priority: 2,
      },
    ],
  },

  'Permanent Residence': {
    core_documents: [
      {
        en: [
          'Valid passport and current residence permit',
          'The application is filed from inside Luxembourg while your existing permit is still valid.',
        ],
        pt: [
          'Passaporte válido e título de residência atual',
          'O pedido é feito de dentro do Luxemburgo enquanto o título atual ainda está válido.',
        ],
        es: [
          'Pasaporte vigente y permiso de residencia actual',
          'La solicitud se presenta desde dentro de Luxemburgo mientras el permiso actual sigue vigente.',
        ],
      },
      {
        en: [
          'Proof of five years of continuous legal residence',
          'Counted from the permits actually held. Time spent as a student generally counts only for half.',
        ],
        pt: [
          'Comprovação de cinco anos de residência legal contínua',
          'Contados a partir dos títulos efetivamente detidos. O tempo como estudante em geral conta apenas pela metade.',
        ],
        es: [
          'Prueba de cinco años de residencia legal continua',
          'Se cuentan a partir de los permisos realmente poseídos. El tiempo como estudiante por lo general cuenta solo por la mitad.',
        ],
      },
      {
        en: [
          'Record of your absences over the five years',
          'No single absence beyond six consecutive months and no more than ten months in total, otherwise the count restarts from zero.',
        ],
        pt: [
          'Registo das suas ausências ao longo dos cinco anos',
          'Nenhuma ausência isolada acima de seis meses seguidos e no máximo dez meses no total, caso contrário a contagem recomeça do zero.',
        ],
        es: [
          'Registro de sus ausencias a lo largo de los cinco años',
          'Ninguna ausencia aislada superior a seis meses seguidos y como máximo diez meses en total, o el cómputo vuelve a empezar de cero.',
        ],
      },
      {
        en: [
          'Certificate of residence issued by your commune',
          'Taken from the population register, which is the administration reading back its own record of where you lived.',
        ],
        pt: [
          'Certificado de residência emitido pela sua comuna',
          'Extraído do registo da população, que é a administração relendo o próprio registo de onde você morou.',
        ],
        es: [
          'Certificado de residencia expedido por su comuna',
          'Extraído del padrón, que es la administración releyendo su propio registro de dónde vivió usted.',
        ],
      },
      {
        en: [
          'Criminal record certificate for the application',
          'A conviction does not automatically bar the status, but it is weighed against the length and quality of your residence.',
        ],
        pt: [
          'Certidão criminal para o pedido',
          'Uma condenação não barra automaticamente o estatuto, mas é ponderada contra a duração e a qualidade da sua residência.',
        ],
        es: [
          'Certificado de antecedentes penales para la solicitud',
          'Una condena no impide automáticamente el estatuto, pero se pondera frente a la duración y la calidad de su residencia.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Stable resources without recourse to social assistance',
          'Shown over the recent period. Having drawn certain social benefits is what most often blocks an otherwise complete file.',
        ],
        pt: [
          'Recursos estáveis sem recurso à assistência social',
          'Demonstrados no período recente. Ter recebido certos benefícios sociais é o que mais frequentemente bloqueia um processo por outro lado completo.',
        ],
        es: [
          'Recursos estables sin recurrir a la asistencia social',
          'Acreditados en el periodo reciente. Haber cobrado ciertas prestaciones sociales es lo que más a menudo bloquea un expediente por lo demás completo.',
        ],
      },
      {
        en: [
          'Health insurance covering all risks',
          'Affiliation to the national health fund for you and for every dependant included in the household.',
        ],
        pt: [
          'Seguro de saúde cobrindo todos os riscos',
          'Afiliação à caixa nacional de saúde para você e para cada dependente do agregado.',
        ],
        es: [
          'Seguro de salud que cubra todos los riesgos',
          'Afiliación a la caja nacional de salud para usted y para cada dependiente del hogar.',
        ],
      },
      {
        en: [
          'Adequate accommodation for the household',
          'A lease or title deed, with the size of the dwelling assessed against the number of people living in it.',
        ],
        pt: [
          'Alojamento adequado para o agregado familiar',
          'Contrato de arrendamento ou escritura, com o tamanho da habitação avaliado face ao número de pessoas que nela vivem.',
        ],
        es: [
          'Alojamiento adecuado para la unidad familiar',
          'Contrato de alquiler o escritura, con el tamaño de la vivienda valorado frente al número de personas que la habitan.',
        ],
      },
      {
        en: [
          'Pay the fee for the long-term resident permit',
          'By bank transfer before filing, with the receipt joined to the application itself.',
        ],
        pt: [
          'Pagar a taxa do título de residente de longa duração',
          'Por transferência bancária antes de entregar, com o comprovativo junto ao próprio pedido.',
        ],
        es: [
          'Pagar la tasa del permiso de residente de larga duración',
          'Por transferencia bancaria antes de presentar, con el justificante unido a la propia solicitud.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File before the current permit expires',
          'A gap between permits breaks the continuity the whole application rests on, and it cannot be repaired afterwards.',
        ],
        pt: [
          'Entregar antes de o título atual caducar',
          'Uma lacuna entre títulos quebra a continuidade sobre a qual todo o pedido se apoia, e não pode ser reparada depois.',
        ],
        es: [
          'Presentar antes de que caduque el permiso actual',
          'Un vacío entre permisos rompe la continuidad en la que se apoya toda la solicitud, y no se puede reparar después.',
        ],
      },
      {
        en: [
          'Send originals or certified copies by post',
          'Incomplete files are suspended rather than refused, and every day of suspension is a day the decision is not running.',
        ],
        pt: [
          'Enviar originais ou cópias certificadas pelo correio',
          'Processos incompletos ficam suspensos em vez de recusados, e cada dia de suspensão é um dia em que a decisão não corre.',
        ],
        es: [
          'Enviar originales o copias certificadas por correo',
          'Los expedientes incompletos quedan suspendidos en lugar de denegados, y cada día de suspensión es un día en que la decisión no avanza.',
        ],
      },
      {
        en: [
          'Allow several months for the decision',
          'The legal deadline only starts running from a complete file, so each missing annex resets the wait.',
        ],
        pt: [
          'Contar com vários meses até a decisão',
          'O prazo legal só começa a correr a partir de um processo completo, então cada anexo em falta reinicia a espera.',
        ],
        es: [
          'Contar con varios meses hasta la decisión',
          'El plazo legal solo empieza a correr desde un expediente completo, de modo que cada anexo que falte reinicia la espera.',
        ],
        priority: 2,
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data for the long-term resident card',
          'Taken once the status is granted; the card carries the express mention of EU long-term resident.',
        ],
        pt: [
          'Dados biométricos para o cartão de residente de longa duração',
          'Recolhidos quando o estatuto é concedido; o cartão traz a menção expressa de residente de longa duração UE.',
        ],
        es: [
          'Datos biométricos para la tarjeta de residente de larga duración',
          'Se toman cuando se concede el estatuto; la tarjeta lleva la mención expresa de residente de larga duración UE.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Check that the card shows the long-term resident mention',
          'That exact wording is what lets you move to another member state under easier conditions later.',
        ],
        pt: [
          'Conferir se o cartão traz a menção de residente de longa duração',
          'É exatamente essa menção que lhe permite mais tarde mudar-se para outro Estado-Membro em condições facilitadas.',
        ],
        es: [
          'Comprobar que la tarjeta lleva la mención de residente de larga duración',
          'Es exactamente esa mención la que le permite después trasladarse a otro Estado miembro en condiciones facilitadas.',
        ],
      },
      {
        en: [
          'Renew the card every five years',
          'The status itself is permanent, but the card is a document with its own expiry date, and that is what people forget.',
        ],
        pt: [
          'Renovar o cartão a cada cinco anos',
          'O estatuto em si é permanente, mas o cartão é um documento com validade própria, e é isso que as pessoas esquecem.',
        ],
        es: [
          'Renovar la tarjeta cada cinco años',
          'El estatuto en sí es permanente, pero la tarjeta es un documento con su propia caducidad, y eso es lo que se olvida.',
        ],
      },
      {
        en: [
          'Avoid the absences that extinguish the status',
          'Leaving the European Union for two consecutive years, or Luxembourg for six, can end the status without any notification.',
        ],
        pt: [
          'Evitar as ausências que extinguem o estatuto',
          'Sair da União Europeia por dois anos seguidos, ou do Luxemburgo por seis, pode extinguir o estatuto sem qualquer notificação.',
        ],
        es: [
          'Evitar las ausencias que extinguen el estatuto',
          'Salir de la Unión Europea dos años seguidos, o de Luxemburgo seis, puede extinguir el estatuto sin notificación alguna.',
        ],
      },
      {
        en: [
          'Prepare the Luxembourgish test for naturalisation',
          'Citizenship adds a spoken Luxembourgish examination and a civic course on living together in the Grand Duchy, neither of which permanent residence asked for.',
        ],
        pt: [
          'Preparar o teste de luxemburguês para a naturalização',
          'A cidadania acrescenta um exame oral de luxemburguês e um curso cívico sobre viver em conjunto no Grão-Ducado, nenhum dos quais a residência permanente exigiu.',
        ],
        es: [
          'Preparar la prueba de luxemburgués para la naturalización',
          'La ciudadanía añade un examen oral de luxemburgués y un curso cívico sobre la convivencia en el Gran Ducado, ninguno de los cuales exigió la residencia permanente.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
