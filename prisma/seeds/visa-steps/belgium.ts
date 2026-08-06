import type { CountryVisaSteps } from './types';

/**
 * Steps for Belgium.
 *
 * The single permit merges work and residence into one request, but it is not
 * one authority: the region — Flanders, Wallonia, Brussels or the
 * German-speaking community — decides the work component under its own rules,
 * and only then does the federal Immigration Office decide the residence part.
 * Salary thresholds, contract templates and integration duties therefore differ
 * depending on where the job is, not on which passport you hold.
 *
 * Nothing is real until the commune says so. Arrival is declared at the town
 * hall within days, a neighbourhood police officer calls at the address to
 * confirm you actually live there, and only after that report does the
 * electronic residence card get produced — with its PIN and PUK arriving in a
 * separate letter.
 *
 * Permanent status comes in two flavours that look alike and are not: the
 * national unlimited permit and the EU long-term resident status. Only the
 * second travels to another member state.
 */
export const belgium: CountryVisaSteps = {
  'Short-Stay Visa (Schengen Type C)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Valid for at least three months beyond the planned departure, issued within the last ten years and with two blank pages.',
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
          'Harmonised Schengen application form',
          'Completed and signed. Belgium accepts it filled in online, but the signature has to be handwritten on the printout.',
        ],
        pt: [
          'Formulário Schengen harmonizado',
          'Preenchido e assinado. A Bélgica aceita o preenchimento online, mas a assinatura tem de ser manuscrita no impresso.',
        ],
        es: [
          'Formulario Schengen armonizado',
          'Cumplimentado y firmado. Bélgica acepta rellenarlo en línea, pero la firma debe ser manuscrita en el impreso.',
        ],
      },
      {
        en: [
          'Two recent photographs',
          'ICAO standard and taken in the last six months; a photo reused from an old application is refused.',
        ],
        pt: [
          'Duas fotografias recentes',
          'Padrão ICAO e tiradas nos últimos seis meses; foto reaproveitada de um pedido antigo é recusada.',
        ],
        es: [
          'Dos fotografías recientes',
          'Norma ICAO y tomadas en los últimos seis meses; una foto reutilizada de una solicitud antigua se rechaza.',
        ],
      },
      {
        en: [
          'Return or onward travel booking',
          'A reservation is enough, but the dates have to match the stay declared on the form.',
        ],
        pt: [
          'Reserva de viagem de volta ou de continuação',
          'Basta a reserva, mas as datas precisam bater com a estada declarada no formulário.',
        ],
        es: [
          'Reserva de viaje de vuelta o de continuación',
          'Basta la reserva, pero las fechas deben coincidir con la estancia declarada en el formulario.',
        ],
      },
      {
        en: [
          'Accommodation proof or a sponsorship undertaking',
          'A hotel booking, or the engagement de prise en charge (annexe 3bis) signed by your host before their own commune. The commune registers it; an unregistered form is worthless.',
        ],
        pt: [
          'Comprovativo de alojamento ou termo de responsabilidade',
          'Reserva de hotel, ou o engagement de prise en charge (anexo 3bis) assinado pelo anfitrião perante a comuna dele. A comuna regista o documento; um formulário não registado não vale nada.',
        ],
        es: [
          'Comprobante de alojamiento o compromiso de manutención',
          'Reserva de hotel, o el engagement de prise en charge (anexo 3bis) firmado por su anfitrión ante su propia comuna. La comuna lo registra; un formulario sin registrar no sirve de nada.',
        ],
      },
      {
        en: [
          'Travel medical insurance',
          'Minimum cover of 30,000 euros valid across the Schengen area, including repatriation.',
        ],
        pt: [
          'Seguro médico de viagem',
          'Cobertura mínima de 30 mil euros válida em todo o espaço Schengen, incluindo repatriamento.',
        ],
        es: [
          'Seguro médico de viaje',
          'Cobertura mínima de 30 mil euros válida en todo el espacio Schengen, incluida la repatriación.',
        ],
      },
      {
        en: [
          'Cover letter with a day-by-day itinerary',
          'Belgium wants the purpose of the trip set out in writing; a vague itinerary is one of the most common grounds for refusal.',
        ],
        pt: [
          'Carta de apresentação com roteiro dia a dia',
          'A Bélgica quer o objetivo da viagem por escrito; um roteiro vago é um dos motivos de recusa mais comuns.',
        ],
        es: [
          'Carta de presentación con itinerario día a día',
          'Bélgica quiere el propósito del viaje por escrito; un itinerario vago es uno de los motivos de denegación más frecuentes.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of means of subsistence',
          'A daily amount per person, and it is lower when a host signs the undertaking than when you stay in a hotel. Confirm the figure in force before you apply.',
        ],
        pt: [
          'Comprovativo de meios de subsistência',
          'Um valor diário por pessoa, menor quando um anfitrião assina o termo do que quando você fica em hotel. Confirme o valor vigente antes de pedir.',
        ],
        es: [
          'Comprobante de medios de subsistencia',
          'Un importe diario por persona, menor cuando un anfitrión firma el compromiso que cuando se aloja en hotel. Confirme la cifra vigente antes de solicitar.',
        ],
      },
      {
        en: [
          'Bank statements from the last three months',
          'The account has to show a regular pattern; a lump sum deposited days before the appointment draws attention rather than confidence.',
        ],
        pt: [
          'Extratos bancários dos últimos três meses',
          'A conta precisa mostrar um padrão regular; um depósito alto feito dias antes do atendimento chama atenção em vez de gerar confiança.',
        ],
        es: [
          'Extractos bancarios de los últimos tres meses',
          'La cuenta debe mostrar un patrón regular; un ingreso grande hecho días antes de la cita llama la atención en lugar de dar confianza.',
        ],
      },
      {
        en: [
          'Proof of ties to your country of residence',
          'Employment letter with approved leave, company papers, studies or property. The consulate is judging whether you will go back.',
        ],
        pt: [
          'Comprovativo de vínculos com o país de residência',
          'Carta do empregador com férias aprovadas, documentos da empresa, estudos ou imóveis. O consulado está a avaliar se você volta.',
        ],
        es: [
          'Comprobante de vínculos con su país de residencia',
          'Carta del empleador con vacaciones aprobadas, documentos de la empresa, estudios o inmuebles. El consulado juzga si va a regresar.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Book the appointment at the centre handling Belgian visas',
          'Belgium outsources to different partners depending on the country, and in several places another Schengen state represents it entirely.',
        ],
        pt: [
          'Agendar no centro que trata dos vistos belgas',
          'A Bélgica terceiriza para parceiros diferentes conforme o país, e em vários lugares outro Estado Schengen a representa por completo.',
        ],
        es: [
          'Reservar cita en el centro que gestiona los visados belgas',
          'Bélgica externaliza a socios distintos según el país, y en varios lugares otro Estado Schengen la representa por completo.',
        ],
      },
      {
        en: [
          'Pay the visa fee',
          'It is not returned if the application is refused. Check the amount and the accepted means of payment beforehand.',
        ],
        pt: [
          'Pagar a taxa do visto',
          'Não é devolvida se o pedido for indeferido. Confira o valor e as formas de pagamento aceites antes.',
        ],
        es: [
          'Pagar la tasa del visado',
          'No se devuelve si deniegan la solicitud. Compruebe antes el importe y los medios de pago aceptados.',
        ],
      },
      {
        en: [
          'Lodge the application in person',
          'No earlier than six months before travelling and, in practice, at least fifteen days before departure.',
        ],
        pt: [
          'Entregar o pedido presencialmente',
          'No máximo seis meses antes da viagem e, na prática, pelo menos quinze dias antes da partida.',
        ],
        es: [
          'Presentar la solicitud en persona',
          'Como mucho seis meses antes de viajar y, en la práctica, al menos quince días antes de la salida.',
        ],
      },
      {
        en: [
          'Allow for referral to the Immigration Office',
          'The consulate can send the file to the Office des Étrangers in Brussels for the decision, which adds weeks that no tracking page warns you about.',
        ],
        pt: [
          'Contar com o encaminhamento ao Office des Étrangers',
          'O consulado pode enviar o processo para o Office des Étrangers em Bruxelas para decisão, o que acrescenta semanas que nenhuma página de acompanhamento avisa.',
        ],
        es: [
          'Contar con la remisión a la Oficina de Extranjería',
          'El consulado puede enviar el expediente a la Oficina de Extranjería en Bruselas para decidir, lo que suma semanas que ninguna página de seguimiento avisa.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric enrolment at the appointment',
          'Fingerprints are stored for 59 months and reused across later Schengen applications.',
        ],
        pt: [
          'Recolha de biometria no atendimento',
          'As impressões ficam guardadas por 59 meses e são reutilizadas em pedidos Schengen posteriores.',
        ],
        es: [
          'Registro biométrico en la cita',
          'Las huellas se conservan 59 meses y se reutilizan en solicitudes Schengen posteriores.',
        ],
      },
      {
        en: [
          'Medical examination',
          'Not required for short stays; it only appears in long-stay files.',
        ],
        pt: [
          'Exame médico',
          'Não é exigido em estadas curtas; só aparece em processos de longa duração.',
        ],
        es: [
          'Examen médico',
          'No se exige en estancias cortas; solo aparece en expedientes de larga duración.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Check the sticker before travelling',
          'Territorial validity, number of entries and the exact number of days granted. The days can be fewer than the date range suggests.',
        ],
        pt: [
          'Conferir a vinheta antes de viajar',
          'Validade territorial, número de entradas e a quantidade exata de dias concedidos. Os dias podem ser menos do que o intervalo de datas sugere.',
        ],
        es: [
          'Revisar la etiqueta antes de viajar',
          'Validez territorial, número de entradas y la cantidad exacta de días concedidos. Los días pueden ser menos de lo que sugiere el rango de fechas.',
        ],
      },
      {
        en: [
          'Declare your arrival at the commune within three working days',
          'Required whenever you are not staying in a hotel or other registered accommodation. The commune issues an annexe 3, and skipping it is a needless problem for the next application.',
        ],
        pt: [
          'Declarar a chegada na comuna em três dias úteis',
          'Obrigatório sempre que você não fica em hotel ou outro alojamento registado. A comuna emite um anexo 3, e ignorar isso vira um problema desnecessário no próximo pedido.',
        ],
        es: [
          'Declarar su llegada en la comuna en tres días hábiles',
          'Obligatorio siempre que no se aloje en hotel u otro alojamiento registrado. La comuna emite un anexo 3, y saltárselo es un problema innecesario para la siguiente solicitud.',
        ],
      },
      {
        en: [
          'Respect the 90 days in any 180 rule',
          'Counted across the whole Schengen area on a rolling basis, including days spent in other member states.',
        ],
        pt: [
          'Respeitar a regra dos 90 dias em cada 180',
          'Contados em todo o espaço Schengen de forma móvel, incluindo dias passados noutros Estados-membros.',
        ],
        es: [
          'Respetar la regla de 90 días en cada 180',
          'Se cuentan en todo el espacio Schengen de forma móvil, incluidos los días pasados en otros Estados miembros.',
        ],
      },
      {
        en: [
          'Do not take up any paid activity',
          'A short-stay visa never authorises work in Belgium, and that includes paid assignments carried out remotely for a Belgian client.',
        ],
        pt: [
          'Não exercer nenhuma atividade remunerada',
          'Um visto de curta duração nunca autoriza trabalho na Bélgica, e isso inclui trabalhos pagos feitos à distância para um cliente belga.',
        ],
        es: [
          'No ejercer ninguna actividad remunerada',
          'Un visado de corta duración nunca autoriza trabajar en Bélgica, y eso incluye encargos pagados hechos en remoto para un cliente belga.',
        ],
      },
      {
        en: [
          'Keep the file for your next application',
          'Belgium looks at your Schengen history. Evidence of a clean previous stay is what shortens the second application.',
        ],
        pt: [
          'Guardar o processo para o próximo pedido',
          'A Bélgica olha para o seu histórico Schengen. A prova de uma estada anterior sem falhas é o que encurta o segundo pedido.',
        ],
        es: [
          'Guardar el expediente para la próxima solicitud',
          'Bélgica mira su historial Schengen. La prueba de una estancia anterior impecable es lo que acorta la segunda solicitud.',
        ],
        priority: 2,
      },
    ],
  },

  'Long-Stay Visa (Type D) / Single Permit': {
    core_documents: [
      {
        en: [
          'Identify which region handles your work authorisation',
          'Flanders, Wallonia, Brussels and the German-speaking community each decide the work component under their own rules; the federal Immigration Office only decides the residence part. Filing with the wrong region costs months.',
        ],
        pt: [
          'Identificar qual região trata da sua autorização de trabalho',
          'Flandres, Valónia, Bruxelas e a comunidade germanófona decidem cada uma a componente de trabalho com regras próprias; o Office des Étrangers federal só decide a parte de residência. Pedir à região errada custa meses.',
        ],
        es: [
          'Identificar qué región tramita su autorización de trabajo',
          'Flandes, Valonia, Bruselas y la comunidad germanófona deciden cada una el componente laboral con sus propias reglas; la Oficina de Extranjería federal solo decide la parte de residencia. Solicitar a la región equivocada cuesta meses.',
        ],
      },
      {
        en: [
          'Valid passport for the long-stay file',
          'It has to cover the whole duration of the permit requested, with a comfortable margin left at the consulate stage.',
        ],
        pt: [
          'Passaporte válido para o processo de longa duração',
          'Precisa cobrir toda a duração da autorização pedida, com margem confortável na fase consular.',
        ],
        es: [
          'Pasaporte vigente para el expediente de larga duración',
          'Debe cubrir toda la duración del permiso solicitado, con un margen holgado en la fase consular.',
        ],
      },
      {
        en: [
          'Long-stay visa application form (visa D)',
          'Signed and lodged at the Belgian consulate once the single permit has been approved, never before.',
        ],
        pt: [
          'Formulário de pedido de visto de longa duração (visto D)',
          'Assinado e entregue no consulado belga depois de a autorização única ser aprovada, nunca antes.',
        ],
        es: [
          'Formulario de solicitud de visado de larga duración (visado D)',
          'Firmado y presentado en el consulado belga una vez aprobado el permiso único, nunca antes.',
        ],
      },
      {
        en: [
          'Employment contract on the regional model',
          'The region checks that the contract follows its own template and that the post is one the labour market rules allow. A freely drafted contract is usually sent back.',
        ],
        pt: [
          'Contrato de trabalho no modelo regional',
          'A região verifica se o contrato segue o modelo próprio e se a função é permitida pelas regras de mercado de trabalho. Um contrato redigido livremente costuma ser devolvido.',
        ],
        es: [
          'Contrato de trabajo con el modelo regional',
          'La región comprueba que el contrato siga su propio modelo y que el puesto esté permitido por las reglas del mercado laboral. Un contrato redactado libremente suele ser devuelto.',
        ],
      },
      {
        en: [
          'Criminal record certificate legalised for Belgium',
          'Required for stays over three months, less than six months old, with apostille or consular legalisation and a sworn translation.',
        ],
        pt: [
          'Certificado de antecedentes legalizado para a Bélgica',
          'Exigido para estadas acima de três meses, com menos de seis meses de emissão, com apostila ou legalização consular e tradução juramentada.',
        ],
        es: [
          'Certificado de antecedentes legalizado para Bélgica',
          'Exigido para estancias de más de tres meses, con menos de seis meses de antigüedad, con apostilla o legalización consular y traducción jurada.',
        ],
      },
      {
        en: [
          'Medical certificate from an approved doctor',
          'Only physicians on the list published by the Belgian post are accepted; a certificate from your usual GP is refused outright.',
        ],
        pt: [
          'Atestado médico de médico credenciado',
          'Só são aceites médicos da lista publicada pela representação belga; um atestado do seu médico habitual é recusado de imediato.',
        ],
        es: [
          'Certificado médico de un médico acreditado',
          'Solo se aceptan médicos de la lista publicada por la representación belga; un certificado de su médico habitual se rechaza sin más.',
        ],
      },
      {
        en: [
          'Legalised civil status documents',
          'Birth and marriage certificates need an apostille or legalisation plus a translation by a sworn translator recognised in Belgium. The commune asks for them again at registration, so get several copies.',
        ],
        pt: [
          'Documentos de estado civil legalizados',
          'Certidões de nascimento e casamento precisam de apostila ou legalização e tradução por tradutor juramentado reconhecido na Bélgica. A comuna vai pedi-las de novo no registo, então tire várias vias.',
        ],
        es: [
          'Documentos de estado civil legalizados',
          'Las partidas de nacimiento y matrimonio necesitan apostilla o legalización y traducción por traductor jurado reconocido en Bélgica. La comuna las pedirá de nuevo en el registro, así que consiga varias copias.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Diploma equivalence from the community NARIC',
          'Flanders and the French Community run separate NARIC services and each takes months. For the highly skilled category it is the equivalence decision, not the diploma itself, that counts.',
        ],
        pt: [
          'Equivalência do diploma pelo NARIC da comunidade',
          'Flandres e a Comunidade Francesa têm serviços NARIC separados e cada um leva meses. Na categoria de altamente qualificado o que conta é a decisão de equivalência, não o diploma em si.',
        ],
        es: [
          'Equivalencia del título por el NARIC de la comunidad',
          'Flandes y la Comunidad Francesa tienen servicios NARIC separados y cada uno tarda meses. En la categoría de altamente cualificado cuenta la resolución de equivalencia, no el título en sí.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Salary at or above the regional threshold',
          'Each region publishes its own gross annual minimum per category and reindexes it every year. Confirm the figure in force for the year the contract begins.',
        ],
        pt: [
          'Salário igual ou acima do piso regional',
          'Cada região publica o próprio mínimo anual bruto por categoria e reajusta todo ano. Confirme o valor vigente no ano em que o contrato começa.',
        ],
        es: [
          'Salario igual o superior al umbral regional',
          'Cada región publica su propio mínimo anual bruto por categoría y lo reindexa cada año. Confirme la cifra vigente en el año en que empieza el contrato.',
        ],
      },
      {
        en: [
          'Pay the federal administrative contribution',
          'The redevance is paid by bank transfer with a structured reference generated for your file. A payment without that exact reference counts as not made and the file is declared inadmissible.',
        ],
        pt: [
          'Pagar a contribuição administrativa federal',
          'A redevance é paga por transferência com uma referência estruturada gerada para o seu processo. Um pagamento sem essa referência exata conta como inexistente e o processo é declarado inadmissível.',
        ],
        es: [
          'Pagar la contribución administrativa federal',
          'La redevance se paga por transferencia con una referencia estructurada generada para su expediente. Un pago sin esa referencia exacta se considera no hecho y el expediente se declara inadmisible.',
        ],
      },
      {
        en: [
          'Health insurance cover from the first day',
          'Cover is required from arrival, before affiliation to a Belgian sickness fund takes effect. A private policy usually bridges the first weeks.',
        ],
        pt: [
          'Cobertura de saúde desde o primeiro dia',
          'A cobertura é exigida desde a chegada, antes de a filiação a uma mutualidade belga produzir efeitos. Uma apólice privada costuma cobrir as primeiras semanas.',
        ],
        es: [
          'Cobertura sanitaria desde el primer día',
          'La cobertura se exige desde la llegada, antes de que surta efecto la afiliación a una mutualidad belga. Una póliza privada suele cubrir las primeras semanas.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Employer files the single permit with the region',
          'The four-month decision deadline starts only when the region declares the file complete, so one missing annex resets the clock entirely.',
        ],
        pt: [
          'O empregador submete a autorização única à região',
          'O prazo de decisão de quatro meses só começa quando a região declara o processo completo, por isso um único anexo em falta reinicia a contagem.',
        ],
        es: [
          'El empleador presenta el permiso único ante la región',
          'El plazo de decisión de cuatro meses solo empieza cuando la región declara completo el expediente, así que un solo anexo que falte reinicia el reloj.',
        ],
      },
      {
        en: [
          'Wait for the regional approval and the annexe 46',
          'The region approves the work component and the federal level then issues an annexe 46, which is what allows the consulate to give you the visa.',
        ],
        pt: [
          'Aguardar a aprovação regional e o anexo 46',
          'A região aprova a componente de trabalho e o nível federal emite depois um anexo 46, que é o que permite ao consulado conceder o visto.',
        ],
        es: [
          'Esperar la aprobación regional y el anexo 46',
          'La región aprueba el componente laboral y el nivel federal emite después un anexo 46, que es lo que permite al consulado concederle el visado.',
        ],
      },
      {
        en: [
          'Apply for the visa with the annexe 46 in hand',
          'Lodged at the Belgian consulate covering your legal residence. Without the annexe the consulate has nothing to act on.',
        ],
        pt: [
          'Pedir o visto já com o anexo 46 em mãos',
          'Entregue no consulado belga que cobre a sua residência legal. Sem o anexo o consulado não tem base para agir.',
        ],
        es: [
          'Solicitar el visado con el anexo 46 en mano',
          'Se presenta en el consulado belga que cubre su residencia legal. Sin el anexo el consulado no tiene base para actuar.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometrics for the visa at the consulate',
          'Fingerprints and photograph are taken when the long-stay file is lodged.',
        ],
        pt: [
          'Biometria para o visto no consulado',
          'Impressões digitais e fotografia são recolhidas quando o processo de longa duração é entregue.',
        ],
        es: [
          'Biometría para el visado en el consulado',
          'Las huellas y la fotografía se toman al presentar el expediente de larga duración.',
        ],
      },
      {
        en: [
          'Tuberculosis screening where the post requires it',
          'Applied to nationals of countries on a published list; the chest X-ray has to come from a centre the mission approves.',
        ],
        pt: [
          'Rastreio de tuberculose quando a representação exigir',
          'Aplicado a nacionais de países numa lista publicada; a radiografia do tórax tem de vir de um centro aprovado pela missão.',
        ],
        es: [
          'Cribado de tuberculosis cuando la representación lo exija',
          'Se aplica a nacionales de países de una lista publicada; la radiografía de tórax debe proceder de un centro aprobado por la misión.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Affiliate with a sickness fund (mutualité)',
          'Belgian public health cover runs through a mutuelle you choose yourself. It does not come automatically with the residence card, and reimbursements start only once you are affiliated.',
        ],
        pt: [
          'Filiar-se a uma mutualidade (mutualité)',
          'A cobertura pública de saúde belga passa por uma mutualidade que você escolhe. Ela não vem automaticamente com o cartão de residência, e os reembolsos só começam depois da filiação.',
        ],
        es: [
          'Afiliarse a una mutualidad (mutualité)',
          'La cobertura sanitaria pública belga pasa por una mutualidad que usted elige. No llega automáticamente con la tarjeta de residencia, y los reembolsos solo empiezan tras la afiliación.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Report to the commune within eight working days',
          'The declaration of arrival at your commune is what opens the registration in the foreigners register. Missing the window jeopardises the whole file.',
        ],
        pt: [
          'Apresentar-se na comuna em oito dias úteis',
          'A declaração de chegada na comuna é o que abre o registo no registo de estrangeiros. Perder o prazo põe todo o processo em risco.',
        ],
        es: [
          'Presentarse en la comuna en ocho días hábiles',
          'La declaración de llegada en su comuna es lo que abre la inscripción en el registro de extranjeros. Perder el plazo pone en riesgo todo el expediente.',
        ],
      },
      {
        en: [
          'Receive the neighbourhood police check at your address',
          'A local officer calls at the address, often unannounced, to confirm you really live there. If you are never in, the registration stalls and so does the card.',
        ],
        pt: [
          'Receber a visita da polícia de bairro na sua morada',
          'Um agente local passa na morada, muitas vezes sem avisar, para confirmar que você mora mesmo ali. Se nunca o encontram, o registo trava e o cartão também.',
        ],
        es: [
          'Recibir la visita del policía de barrio en su domicilio',
          'Un agente local pasa por la dirección, a menudo sin avisar, para confirmar que usted vive allí de verdad. Si nunca le encuentra, la inscripción se paraliza y la tarjeta también.',
        ],
      },
      {
        en: [
          'Collect the electronic residence card and its codes',
          'The card is handed over at the commune while the PIN and PUK arrive in a separate letter. Lose that letter and you have to request new codes and wait again.',
        ],
        pt: [
          'Levantar o cartão eletrónico de residência e os códigos',
          'O cartão é entregue na comuna enquanto o PIN e o PUK chegam em carta separada. Se perder essa carta, tem de pedir novos códigos e esperar outra vez.',
        ],
        es: [
          'Recoger la tarjeta electrónica de residencia y sus códigos',
          'La tarjeta se entrega en la comuna mientras el PIN y el PUK llegan en una carta aparte. Si pierde esa carta, hay que pedir códigos nuevos y esperar de nuevo.',
        ],
      },
      {
        en: [
          'Get your national register number and activate itsme',
          'The national number comes with registration and unlocks the eID and the itsme app, which nearly every Belgian public service and bank now requires.',
        ],
        pt: [
          'Obter o número de registo nacional e ativar o itsme',
          'O número nacional vem com o registo e destrava o eID e a app itsme, hoje exigidos por quase todo serviço público e banco belga.',
        ],
        es: [
          'Obtener el número de registro nacional y activar itsme',
          'El número nacional llega con la inscripción y desbloquea el eID y la app itsme, que hoy exige casi todo servicio público y banco belga.',
        ],
      },
      {
        en: [
          'Renew the single permit before it expires',
          'The renewal is filed at the commune, not at the consulate, and should be started around two months ahead. A lapse ends the right to work immediately.',
        ],
        pt: [
          'Renovar a autorização única antes do vencimento',
          'A renovação é feita na comuna, não no consulado, e deve começar cerca de dois meses antes. Uma interrupção acaba de imediato com o direito de trabalhar.',
        ],
        es: [
          'Renovar el permiso único antes de que caduque',
          'La renovación se presenta en la comuna, no en el consulado, y conviene iniciarla unos dos meses antes. Un lapso acaba de inmediato con el derecho a trabajar.',
        ],
      },
    ],
  },

  'EU Blue Card': {
    core_documents: [
      {
        en: [
          'Valid passport for the Blue Card application',
          'The card is never issued for longer than the passport remains valid, so renew it first if it is close to expiry.',
        ],
        pt: [
          'Passaporte válido para o pedido de Blue Card',
          'O cartão nunca é emitido por prazo maior que a validade do passaporte, então renove-o antes se estiver perto de expirar.',
        ],
        es: [
          'Pasaporte vigente para la solicitud de Tarjeta Azul',
          'La tarjeta nunca se expide por más tiempo del que el pasaporte siga vigente, así que renuévelo antes si está próximo a caducar.',
        ],
      },
      {
        en: [
          'Work contract of at least six months',
          'Belgium transposed the recast directive and cut the minimum engagement; a shorter contract does not qualify, and the document must describe the post as highly qualified.',
        ],
        pt: [
          'Contrato de trabalho de pelo menos seis meses',
          'A Bélgica transpôs a diretiva reformulada e reduziu o vínculo mínimo; um contrato mais curto não qualifica, e o documento tem de descrever a função como altamente qualificada.',
        ],
        es: [
          'Contrato de trabajo de al menos seis meses',
          'Bélgica transpuso la directiva refundida y redujo el vínculo mínimo; un contrato más corto no cualifica, y el documento debe describir el puesto como altamente cualificado.',
        ],
      },
      {
        en: [
          'Blue Card request filed as a single permit',
          'There is no separate Blue Card procedure: the employer files through the same regional then federal channel, selecting the Blue Card category.',
        ],
        pt: [
          'Pedido de Blue Card feito como autorização única',
          'Não existe procedimento separado de Blue Card: o empregador submete pelo mesmo canal regional e depois federal, selecionando a categoria Blue Card.',
        ],
        es: [
          'Solicitud de Tarjeta Azul presentada como permiso único',
          'No hay un procedimiento separado de Tarjeta Azul: el empleador presenta por el mismo canal regional y luego federal, eligiendo la categoría Tarjeta Azul.',
        ],
      },
      {
        en: [
          'Criminal record extract for the Blue Card file',
          'Recent, legalised and translated. An old certificate reused from another application is rejected.',
        ],
        pt: [
          'Certidão criminal para o processo de Blue Card',
          'Recente, legalizada e traduzida. Uma certidão antiga reaproveitada de outro pedido é rejeitada.',
        ],
        es: [
          'Certificado de antecedentes para el expediente de Tarjeta Azul',
          'Reciente, legalizado y traducido. Un certificado antiguo reutilizado de otra solicitud se rechaza.',
        ],
      },
      {
        en: [
          'Legalised birth and marriage certificates',
          'Needed for you and for any family member joining you, and the commune will ask for the originals again after arrival.',
        ],
        pt: [
          'Certidões de nascimento e casamento legalizadas',
          'Necessárias para si e para qualquer familiar que o acompanhe, e a comuna vai pedir os originais de novo depois da chegada.',
        ],
        es: [
          'Partidas de nacimiento y matrimonio legalizadas',
          'Necesarias para usted y para cualquier familiar que le acompañe, y la comuna volverá a pedir los originales tras la llegada.',
        ],
      },
      {
        en: [
          'Medical certificate signed by an approved physician',
          'From the list the Belgian mission publishes, issued shortly before the visa is lodged so it is still valid on the day.',
        ],
        pt: [
          'Atestado médico assinado por médico credenciado',
          'Da lista publicada pela missão belga, emitido pouco antes da entrega do visto para ainda estar válido no dia.',
        ],
        es: [
          'Certificado médico firmado por un médico acreditado',
          'De la lista que publica la misión belga, emitido poco antes de presentar el visado para que siga vigente ese día.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Higher education diploma of at least three years',
          'The qualification has to be recognised through the community NARIC. Without the equivalence decision the Blue Card cannot be granted, whatever the salary offered.',
        ],
        pt: [
          'Diploma superior de pelo menos três anos',
          'A qualificação precisa ser reconhecida pelo NARIC da comunidade. Sem a decisão de equivalência a Blue Card não pode ser concedida, por maior que seja o salário oferecido.',
        ],
        es: [
          'Título superior de al menos tres años',
          'La cualificación debe reconocerse por el NARIC de la comunidad. Sin la resolución de equivalencia no se puede conceder la Tarjeta Azul, por alto que sea el salario ofrecido.',
        ],
      },
      {
        en: [
          'Relevant professional experience for ICT roles',
          'The recast rules let information technology professionals substitute several years of documented experience for the degree. Belgium reads this narrowly, so describe the roles precisely.',
        ],
        pt: [
          'Experiência profissional relevante para funções de TI',
          'As regras reformuladas permitem que profissionais de tecnologia da informação substituam o diploma por vários anos de experiência documentada. A Bélgica interpreta isso de forma restrita, então descreva as funções com precisão.',
        ],
        es: [
          'Experiencia profesional relevante para puestos de TI',
          'Las reglas refundidas permiten que los profesionales de tecnologías de la información sustituyan el título por varios años de experiencia documentada. Bélgica lo interpreta de forma estricta, así que describa los puestos con precisión.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Gross salary above the Blue Card floor',
          'The Blue Card threshold sits above the ordinary highly skilled one and is reindexed yearly by each region. Verify the figure for the year the contract starts.',
        ],
        pt: [
          'Salário bruto acima do piso da Blue Card',
          'O piso da Blue Card fica acima do piso comum de altamente qualificado e é reajustado todo ano por cada região. Verifique o valor do ano em que o contrato começa.',
        ],
        es: [
          'Salario bruto por encima del umbral de la Tarjeta Azul',
          'El umbral de la Tarjeta Azul está por encima del de altamente cualificado ordinario y cada región lo reindexa cada año. Verifique la cifra del año en que empieza el contrato.',
        ],
      },
      {
        en: [
          'Pay the contribution for the Blue Card request',
          'The same federal redevance as any single permit, with the structured reference tied to your file.',
        ],
        pt: [
          'Pagar a contribuição do pedido de Blue Card',
          'A mesma redevance federal de qualquer autorização única, com a referência estruturada ligada ao seu processo.',
        ],
        es: [
          'Pagar la contribución de la solicitud de Tarjeta Azul',
          'La misma redevance federal que cualquier permiso único, con la referencia estructurada ligada a su expediente.',
        ],
      },
      {
        en: [
          'Insurance covering all risks in Belgium',
          'Required from the day of entry and until your sickness fund affiliation is effective.',
        ],
        pt: [
          'Seguro que cubra todos os riscos na Bélgica',
          'Exigido desde o dia da entrada e até a filiação à mutualidade produzir efeitos.',
        ],
        es: [
          'Seguro que cubra todos los riesgos en Bélgica',
          'Exigido desde el día de entrada y hasta que la afiliación a la mutualidad sea efectiva.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Employer submits the Blue Card file to the region',
          'Same regional counter as the ordinary single permit, and the same rule that the deadline starts on completeness.',
        ],
        pt: [
          'O empregador submete o processo de Blue Card à região',
          'O mesmo balcão regional da autorização única comum, e a mesma regra de que o prazo começa quando o processo está completo.',
        ],
        es: [
          'El empleador presenta el expediente de Tarjeta Azul a la región',
          'La misma ventanilla regional que el permiso único ordinario, y la misma regla de que el plazo empieza al estar completo.',
        ],
      },
      {
        en: [
          'Wait for the decision and the entry authorisation',
          'Once both levels have approved, the federal annexe is what the consulate needs before it can act.',
        ],
        pt: [
          'Aguardar a decisão e a autorização de entrada',
          'Depois de os dois níveis aprovarem, o anexo federal é o que o consulado precisa para poder agir.',
        ],
        es: [
          'Esperar la resolución y la autorización de entrada',
          'Una vez que ambos niveles aprueban, el anexo federal es lo que el consulado necesita para poder actuar.',
        ],
      },
      {
        en: [
          'Lodge the visa on the strength of the approval',
          'At the Belgian consulate for your place of legal residence, within the validity of the authorisation.',
        ],
        pt: [
          'Entregar o visto com base na aprovação obtida',
          'No consulado belga do seu local de residência legal, dentro da validade da autorização.',
        ],
        es: [
          'Presentar el visado sobre la base de la aprobación',
          'En el consulado belga de su lugar de residencia legal, dentro de la validez de la autorización.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometrics at the consulate for the Blue Card visa',
          'Fingerprints and photograph, taken when the visa file is handed in.',
        ],
        pt: [
          'Biometria no consulado para o visto de Blue Card',
          'Impressões digitais e fotografia, recolhidas na entrega do processo de visto.',
        ],
        es: [
          'Biometría en el consulado para el visado de Tarjeta Azul',
          'Huellas y fotografía, tomadas al entregar el expediente del visado.',
        ],
      },
      {
        en: [
          'Register with a sickness fund after arriving',
          'Choose a mutuelle in the first weeks; until then only your private policy covers you.',
        ],
        pt: [
          'Inscrever-se numa mutualidade depois de chegar',
          'Escolha uma mutualidade nas primeiras semanas; até lá só a sua apólice privada o cobre.',
        ],
        es: [
          'Inscribirse en una mutualidad tras llegar',
          'Elija una mutualidad en las primeras semanas; hasta entonces solo le cubre su póliza privada.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Have the card issued with the EU Blue Card wording',
          'The residence card must literally carry the words European Blue Card. Later intra-EU mobility and the counting of years abroad depend on that wording being right.',
        ],
        pt: [
          'Garantir que o cartão saia com a menção Blue Card UE',
          'O cartão de residência tem de trazer literalmente a menção Cartão Azul Europeu. A mobilidade futura dentro da UE e a soma de anos noutros países dependem dessa menção estar correta.',
        ],
        es: [
          'Conseguir que la tarjeta lleve la mención Tarjeta Azul UE',
          'La tarjeta de residencia debe llevar literalmente la mención Tarjeta Azul Europea. La movilidad futura dentro de la UE y la suma de años en otros países dependen de que esa mención sea correcta.',
        ],
      },
      {
        en: [
          'Await the police visit at your registered address',
          'The same neighbourhood check as any other newcomer; the card is not produced until the officer reports back.',
        ],
        pt: [
          'Aguardar a visita da polícia na morada registada',
          'A mesma verificação de bairro de qualquer recém-chegado; o cartão só é produzido depois de o agente reportar.',
        ],
        es: [
          'Esperar la visita policial en su domicilio registrado',
          'La misma comprobación de barrio que para cualquier recién llegado; la tarjeta no se produce hasta que el agente informa.',
        ],
      },
      {
        en: [
          'Stay with the same employer for the first year',
          'During the first twelve months a change of employer or of position needs prior authorisation from the region; leaving without it ends the permit.',
        ],
        pt: [
          'Permanecer no mesmo empregador no primeiro ano',
          'Nos primeiros doze meses, mudar de empregador ou de função exige autorização prévia da região; sair sem ela encerra a autorização.',
        ],
        es: [
          'Permanecer con el mismo empleador el primer año',
          'Durante los primeros doce meses, cambiar de empleador o de puesto exige autorización previa de la región; irse sin ella extingue el permiso.',
        ],
      },
      {
        en: [
          'Add up periods spent in other member states',
          'Blue Card holders may combine residence in several EU countries towards long-term resident status, which no ordinary Belgian permit allows. Keep the cards and the proof of dates.',
        ],
        pt: [
          'Somar os períodos vividos noutros Estados-membros',
          'Titulares de Blue Card podem combinar residência em vários países da UE para a residência de longa duração, o que nenhuma autorização belga comum permite. Guarde os cartões e as provas de datas.',
        ],
        es: [
          'Sumar los periodos vividos en otros Estados miembros',
          'Los titulares de Tarjeta Azul pueden combinar residencia en varios países de la UE para el estatuto de residente de larga duración, algo que ningún permiso belga ordinario permite. Guarde las tarjetas y las pruebas de fechas.',
        ],
      },
      {
        en: [
          'Renew the Blue Card before it lapses',
          'The renewal checks that the salary stayed above the threshold for the whole period; a pay cut, part-time move or long unpaid leave can block it.',
        ],
        pt: [
          'Renovar a Blue Card antes de caducar',
          'A renovação verifica se o salário se manteve acima do piso durante todo o período; um corte salarial, passagem a tempo parcial ou licença sem vencimento longa podem travá-la.',
        ],
        es: [
          'Renovar la Tarjeta Azul antes de que caduque',
          'La renovación comprueba que el salario se mantuvo por encima del umbral todo el periodo; una rebaja salarial, pasar a jornada parcial o una excedencia larga pueden bloquearla.',
        ],
      },
    ],
  },

  'Permanent Residence / EU Long-Term Resident': {
    core_documents: [
      {
        en: [
          'Choose between the national and the EU status',
          'The Belgian unlimited permit and the EU long-term resident status are granted on similar conditions, but only the second one travels to another member state. Ask for the right one; converting later means starting over.',
        ],
        pt: [
          'Escolher entre o estatuto nacional e o europeu',
          'A autorização ilimitada belga e o estatuto de residente de longa duração UE são concedidos em condições parecidas, mas só o segundo vale noutro Estado-membro. Peça o certo; converter depois é recomeçar.',
        ],
        es: [
          'Elegir entre el estatuto nacional y el europeo',
          'El permiso ilimitado belga y el estatuto de residente de larga duración UE se conceden en condiciones parecidas, pero solo el segundo sirve en otro Estado miembro. Pida el correcto; convertirlo después es empezar de cero.',
        ],
      },
      {
        en: [
          'Valid passport and current residence card',
          'Both have to be in force on the day the commune registers the application.',
        ],
        pt: [
          'Passaporte válido e cartão de residência atual',
          'Ambos têm de estar em vigor no dia em que a comuna regista o pedido.',
        ],
        es: [
          'Pasaporte vigente y tarjeta de residencia actual',
          'Ambos deben estar en vigor el día en que la comuna registra la solicitud.',
        ],
      },
      {
        en: [
          'Five years of uninterrupted legal residence',
          'Absences of more than six consecutive months, or ten months in total across the period, break the count. Time spent as a student counts only in part, and seasonal permits do not count at all.',
        ],
        pt: [
          'Cinco anos de residência legal ininterrupta',
          'Ausências superiores a seis meses seguidos, ou dez meses no total do período, quebram a contagem. O tempo como estudante conta apenas em parte, e autorizações sazonais não contam.',
        ],
        es: [
          'Cinco años de residencia legal ininterrumpida',
          'Las ausencias de más de seis meses seguidos, o diez meses en total del periodo, rompen el cómputo. El tiempo como estudiante cuenta solo en parte, y los permisos de temporada no cuentan.',
        ],
      },
      {
        en: [
          'File the application at your commune',
          'The counter is the commune where you are registered, not the Immigration Office. The commune forwards the file and issues the acknowledgement.',
        ],
        pt: [
          'Apresentar o pedido na sua comuna',
          'O balcão é a comuna onde você está registado, não o Office des Étrangers. A comuna encaminha o processo e emite o comprovativo.',
        ],
        es: [
          'Presentar la solicitud en su comuna',
          'La ventanilla es la comuna donde está empadronado, no la Oficina de Extranjería. La comuna remite el expediente y emite el resguardo.',
        ],
      },
      {
        en: [
          'Proof of stable accommodation',
          'A lease or property title in your name, together with the registration history the commune already holds on you.',
        ],
        pt: [
          'Comprovativo de alojamento estável',
          'Contrato de arrendamento ou título de propriedade em seu nome, junto com o histórico de registo que a comuna já tem sobre si.',
        ],
        es: [
          'Comprobante de alojamiento estable',
          'Contrato de alquiler o título de propiedad a su nombre, junto con el historial de empadronamiento que la comuna ya tiene de usted.',
        ],
      },
      {
        en: [
          'Criminal record extract and public order check',
          'Belgian and, where relevant, foreign records. A conviction does not automatically bar the status, but it triggers an individual assessment that adds months.',
        ],
        pt: [
          'Certidão criminal e verificação de ordem pública',
          'Registos belgas e, quando aplicável, estrangeiros. Uma condenação não impede automaticamente o estatuto, mas dispara uma avaliação individual que acrescenta meses.',
        ],
        es: [
          'Certificado de antecedentes y control de orden público',
          'Registros belgas y, cuando proceda, extranjeros. Una condena no impide automáticamente el estatuto, pero activa una evaluación individual que añade meses.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Complete the integration pathway of your region',
          'Flanders inburgering, the Walloon integration pathway and the Brussels programme are compulsory for most newcomers and each issues its own certificate. The rules were tightened recently, so check which applies where you actually live.',
        ],
        pt: [
          'Concluir o percurso de integração da sua região',
          'O inburgering flamengo, o percurso de integração valão e o programa de Bruxelas são obrigatórios para a maioria dos recém-chegados e cada um emite o seu certificado. As regras apertaram recentemente, então confira qual se aplica onde você vive de facto.',
        ],
        es: [
          'Completar el itinerario de integración de su región',
          'El inburgering flamenco, el itinerario de integración valón y el programa de Bruselas son obligatorios para la mayoría de recién llegados y cada uno emite su propio certificado. Las reglas se endurecieron hace poco, así que compruebe cuál aplica donde vive realmente.',
        ],
      },
      {
        en: [
          'Language certificate at the level your region asks',
          'Dutch, French or German depending on where you are registered, at the level fixed by the local integration rules.',
        ],
        pt: [
          'Certificado de idioma no nível exigido pela região',
          'Neerlandês, francês ou alemão conforme o local onde você está registado, no nível fixado pelas regras de integração locais.',
        ],
        es: [
          'Certificado de idioma en el nivel que exija su región',
          'Neerlandés, francés o alemán según donde esté empadronado, en el nivel que fijen las normas de integración locales.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Stable and sufficient resources over the period',
          'Assessed against the social integration income and the size of your household, so there is no single published number. Irregular freelance income is the case examined most closely.',
        ],
        pt: [
          'Recursos estáveis e suficientes ao longo do período',
          'Avaliados face ao rendimento de integração social e ao tamanho do agregado, por isso não há um número único publicado. O rendimento irregular de trabalho autónomo é o caso examinado mais de perto.',
        ],
        es: [
          'Recursos estables y suficientes durante el periodo',
          'Se valoran frente a la renta de integración social y el tamaño del hogar, así que no hay una cifra única publicada. Los ingresos irregulares de autónomo son el caso que más se examina.',
        ],
      },
      {
        en: [
          'Health insurance for you and your family',
          'Proof of affiliation to a sickness fund covering everyone in the household included in the application.',
        ],
        pt: [
          'Seguro de saúde para si e para a família',
          'Prova de filiação a uma mutualidade que cubra todos os membros do agregado incluídos no pedido.',
        ],
        es: [
          'Seguro de salud para usted y su familia',
          'Prueba de afiliación a una mutualidad que cubra a todos los miembros del hogar incluidos en la solicitud.',
        ],
      },
      {
        en: [
          'Pay the commune fee and the federal contribution',
          'Two separate payments with two separate references. Confirm both amounts in force, since they are revised without much notice.',
        ],
        pt: [
          'Pagar a taxa da comuna e a contribuição federal',
          'Dois pagamentos separados com duas referências distintas. Confirme os dois valores vigentes, pois são revistos sem muito aviso.',
        ],
        es: [
          'Pagar la tasa comunal y la contribución federal',
          'Dos pagos separados con dos referencias distintas. Confirme ambos importes vigentes, porque se revisan sin mucho aviso.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Get the acknowledgement of receipt (annexe 15)',
          'The annexe 15 covers your stay while the decision is pending and is what you show to an employer or at a border crossing.',
        ],
        pt: [
          'Obter o comprovativo de receção (anexo 15)',
          'O anexo 15 cobre a sua estada enquanto a decisão está pendente e é o que você mostra a um empregador ou numa fronteira.',
        ],
        es: [
          'Obtener el resguardo de recepción (anexo 15)',
          'El anexo 15 cubre su estancia mientras la decisión está pendiente y es lo que muestra a un empleador o en un paso fronterizo.',
        ],
      },
      {
        en: [
          'Watch the five-month decision deadline',
          'The Immigration Office must decide within five months of a complete file, extendable once with reasons notified to you.',
        ],
        pt: [
          'Acompanhar o prazo de decisão de cinco meses',
          'O Office des Étrangers tem de decidir em cinco meses a contar do processo completo, prorrogável uma vez com fundamentos notificados a si.',
        ],
        es: [
          'Vigilar el plazo de decisión de cinco meses',
          'La Oficina de Extranjería debe resolver en cinco meses desde el expediente completo, prorrogable una vez con motivos notificados a usted.',
        ],
      },
      {
        en: [
          'Answer requests for documents within the deadline',
          'A file left incomplete is closed rather than refused, and a closure means restarting the entire procedure from the commune counter.',
        ],
        pt: [
          'Responder aos pedidos de documentos dentro do prazo',
          'Um processo deixado incompleto é encerrado em vez de indeferido, e o encerramento significa recomeçar todo o procedimento desde o balcão da comuna.',
        ],
        es: [
          'Responder a los requerimientos de documentos a tiempo',
          'Un expediente que queda incompleto se archiva en vez de denegarse, y archivarlo significa reiniciar todo el procedimiento desde la ventanilla comunal.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometrics for the new electronic card',
          'Fingerprints and photograph taken at the commune when the status is granted.',
        ],
        pt: [
          'Biometria para o novo cartão eletrónico',
          'Impressões digitais e fotografia recolhidas na comuna quando o estatuto é concedido.',
        ],
        es: [
          'Biometría para la nueva tarjeta electrónica',
          'Huellas y fotografía tomadas en la comuna cuando se concede el estatuto.',
        ],
      },
      {
        en: [
          'Medical examination for this status',
          'Not required: the medical certificate belongs to the first entry procedure, not to the long-term one.',
        ],
        pt: [
          'Exame médico para este estatuto',
          'Não é exigido: o atestado médico pertence ao procedimento de primeira entrada, não ao de longa duração.',
        ],
        es: [
          'Examen médico para este estatuto',
          'No se exige: el certificado médico pertenece al procedimiento de primera entrada, no al de larga duración.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the card D or the card K',
          'Card D is the EU long-term resident card, card K the national unlimited one. Check which was actually issued, because they do not give the same rights abroad.',
        ],
        pt: [
          'Levantar o cartão D ou o cartão K',
          'O cartão D é o de residente de longa duração UE, o cartão K é o ilimitado nacional. Confira qual foi realmente emitido, porque não dão os mesmos direitos no estrangeiro.',
        ],
        es: [
          'Recoger la tarjeta D o la tarjeta K',
          'La tarjeta D es la de residente de larga duración UE, la tarjeta K la ilimitada nacional. Compruebe cuál se expidió de verdad, porque no dan los mismos derechos en el extranjero.',
        ],
      },
      {
        en: [
          'Do not leave the EU for twelve consecutive months',
          'A continuous absence of that length withdraws the EU long-term status, and long absences from Belgium alone also count against you.',
        ],
        pt: [
          'Não sair da UE por doze meses seguidos',
          'Uma ausência contínua desse tamanho retira o estatuto de longa duração UE, e ausências longas só da Bélgica também pesam contra.',
        ],
        es: [
          'No salir de la UE durante doce meses seguidos',
          'Una ausencia continua de esa duración retira el estatuto de larga duración UE, y las ausencias largas solo de Bélgica también cuentan en contra.',
        ],
      },
      {
        en: [
          'Apply quickly if you move to another member state',
          'The EU status opens the door but does not grant residence elsewhere: you have to apply in the new country in the first months after arriving.',
        ],
        pt: [
          'Pedir rápido se mudar para outro Estado-membro',
          'O estatuto UE abre a porta mas não concede residência noutro país: é preciso pedir no novo país nos primeiros meses após a chegada.',
        ],
        es: [
          'Solicitar rápido si se muda a otro Estado miembro',
          'El estatuto UE abre la puerta pero no concede residencia en otro país: hay que solicitarla en el nuevo país en los primeros meses tras llegar.',
        ],
      },
      {
        en: [
          'Renew the card every five years',
          'The status is permanent but the plastic is not. Letting the card expire creates avoidable trouble with employers, banks and border officers.',
        ],
        pt: [
          'Renovar o cartão a cada cinco anos',
          'O estatuto é permanente, o plástico não. Deixar o cartão vencer cria problemas evitáveis com empregadores, bancos e agentes de fronteira.',
        ],
        es: [
          'Renovar la tarjeta cada cinco años',
          'El estatuto es permanente, el plástico no. Dejar caducar la tarjeta crea problemas evitables con empleadores, bancos y agentes de frontera.',
        ],
      },
      {
        en: [
          'Consider Belgian nationality afterwards',
          'Naturalisation asks for proof of social and economic participation on top of the language, and the years already spent on a permit count towards it.',
        ],
        pt: [
          'Avaliar a nacionalidade belga depois disso',
          'A naturalização exige prova de participação social e económica além do idioma, e os anos já passados com autorização contam para ela.',
        ],
        es: [
          'Valorar la nacionalidad belga después',
          'La naturalización exige prueba de participación social y económica además del idioma, y los años ya pasados con permiso cuentan para ella.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
