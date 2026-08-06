import type { CountryVisaSteps } from './types';

/**
 * Steps for Romania.
 *
 * Romania completed its accession to the Schengen area in stages: internal air
 * and sea border checks fell first, and land borders followed at the start of
 * 2025. The practical consequence is that days spent in Romania now count
 * against the same ninety in one hundred and eighty allowance as the rest of
 * the area, which ends the old habit of using Romania to reset the clock.
 *
 * Visas and residence are handled by two different bodies. A consulate issues
 * the long-stay visa, which is only a ninety-day key to the door; the residence
 * permit itself comes from the immigration inspectorate, and the application
 * must be filed there well before the visa runs out.
 *
 * The document that actually runs your life is the personal numeric code issued
 * with the residence permit. Without it there is no bank account, no employment
 * registration and no access to the health system, and it does not arrive with
 * the visa.
 */
export const romania: CountryVisaSteps = {
  'Short-Stay Visa (Schengen Type C)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Valid for at least three months beyond the intended departure and issued within the last ten years.',
        ],
        pt: [
          'Passaporte válido',
          'Válido por pelo menos três meses além da saída prevista e emitido nos últimos dez anos.',
        ],
        es: [
          'Pasaporte vigente',
          'Vigente al menos tres meses más allá de la salida prevista y emitido en los últimos diez años.',
        ],
      },
      {
        en: [
          'Application filed on the foreign ministry visa portal',
          'Romania takes the form online first and the consulate appointment confirms it. A form filled by hand at the counter is not the route.',
        ],
        pt: [
          'Pedido apresentado no portal de vistos do ministério dos negócios estrangeiros',
          'A Roménia recebe o formulário online primeiro e o atendimento consular o confirma. Formulário preenchido à mão no balcão não é a via.',
        ],
        es: [
          'Solicitud presentada en el portal de visados del ministerio de exteriores',
          'Rumanía recibe el formulario en línea primero y la cita consular lo confirma. Un formulario rellenado a mano en el mostrador no es la vía.',
        ],
      },
      {
        en: [
          'Recent passport photograph',
          'Standard biometric format on a light background, taken within the last six months.',
        ],
        pt: [
          'Fotografia recente tipo passaporte',
          'Formato biométrico padrão em fundo claro, tirada nos últimos seis meses.',
        ],
        es: [
          'Fotografía reciente tipo pasaporte',
          'Formato biométrico estándar sobre fondo claro, tomada en los últimos seis meses.',
        ],
      },
      {
        en: [
          'Travel itinerary with return booking',
          'Dates must line up with the accommodation and the days you are asking for.',
        ],
        pt: [
          'Itinerário de viagem com reserva de volta',
          'As datas precisam bater com o alojamento e com os dias solicitados.',
        ],
        es: [
          'Itinerario de viaje con reserva de vuelta',
          'Las fechas deben coincidir con el alojamiento y con los días solicitados.',
        ],
      },
      {
        en: [
          'Accommodation for every night of the stay',
          'Hotel bookings, a rental agreement, or a host invitation endorsed by the immigration inspectorate.',
        ],
        pt: [
          'Alojamento para todas as noites da estada',
          'Reservas de hotel, contrato de aluguel, ou convite de anfitrião chancelado pela inspeção de imigração.',
        ],
        es: [
          'Alojamiento para todas las noches de la estancia',
          'Reservas de hotel, contrato de alquiler, o invitación de anfitrión visada por la inspección de inmigración.',
        ],
      },
      {
        en: [
          'Travel medical insurance for the Schengen area',
          'Minimum cover of 30,000 euros including repatriation, valid in every state you will pass through.',
        ],
        pt: [
          'Seguro médico de viagem para o espaço Schengen',
          'Cobertura mínima de 30 mil euros incluindo repatriamento, válida em todos os Estados por onde você passar.',
        ],
        es: [
          'Seguro médico de viaje para el espacio Schengen',
          'Cobertura mínima de 30 mil euros incluida la repatriación, válida en todos los Estados por los que pase.',
        ],
      },
      {
        en: [
          'Know that this is now a uniform Schengen visa',
          'Since accession, a visa issued by Romania is valid across the area and a visa issued elsewhere is valid here. National short-stay visas are history.',
        ],
        pt: [
          'Saber que este agora é um visto Schengen uniforme',
          'Desde a adesão, um visto emitido pela Roménia vale em todo o espaço e um visto emitido noutro Estado vale aqui. Os vistos nacionais de curta duração acabaram.',
        ],
        es: [
          'Saber que ahora es un visado Schengen uniforme',
          'Desde la adhesión, un visado emitido por Rumanía vale en todo el espacio y uno emitido en otro Estado vale aquí. Los visados nacionales de corta duración son historia.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Funds for each day of the visit',
          'A daily minimum per person is fixed in national currency and revised periodically; check the amount in force rather than an old figure.',
        ],
        pt: [
          'Recursos para cada dia da visita',
          'Um mínimo diário por pessoa é fixado em moeda nacional e revisto periodicamente; confira o valor vigente em vez de um número antigo.',
        ],
        es: [
          'Fondos para cada día de la visita',
          'Un mínimo diario por persona se fija en moneda nacional y se revisa periódicamente; consulte el importe vigente en lugar de una cifra antigua.',
        ],
      },
      {
        en: [
          'Bank statements covering the last three months',
          'Issued and stamped by the bank, showing a history rather than a balance that appeared last week.',
        ],
        pt: [
          'Extratos bancários dos últimos três meses',
          'Emitidos e carimbados pelo banco, mostrando histórico e não um saldo que apareceu na semana passada.',
        ],
        es: [
          'Extractos bancarios de los últimos tres meses',
          'Emitidos y sellados por el banco, que muestren historial y no un saldo aparecido la semana pasada.',
        ],
      },
      {
        en: [
          'Evidence of what brings you back',
          'An employment letter with approved leave, business registration, or enrolment at a school or university.',
        ],
        pt: [
          'Prova do que traz você de volta',
          'Carta do empregador com férias aprovadas, registo de empresa, ou matrícula em escola ou universidade.',
        ],
        es: [
          'Prueba de lo que le hace regresar',
          'Carta del empleador con vacaciones aprobadas, registro de empresa, o matrícula en un centro educativo.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Book the consular appointment after the online form',
          'Slots are released by the mission covering your country of residence, and they fill quickly before the summer.',
        ],
        pt: [
          'Agendar o atendimento consular depois do formulário online',
          'As vagas são abertas pela representação que cobre o seu país de residência e esgotam rápido antes do verão.',
        ],
        es: [
          'Reservar la cita consular después del formulario en línea',
          'Los huecos los libera la misión que cubre su país de residencia y se agotan rápido antes del verano.',
        ],
      },
      {
        en: [
          'Pay the Schengen visa charge',
          'Set at area level, payable at submission and not refunded on refusal. Facilitation agreements reduce it for some nationalities.',
        ],
        pt: [
          'Pagar o encargo do visto Schengen',
          'Definido em nível do espaço, pago na entrega e não devolvido em caso de recusa. Acordos de facilitação o reduzem para algumas nacionalidades.',
        ],
        es: [
          'Pagar el cargo del visado Schengen',
          'Fijado a nivel del espacio, se paga al presentar y no se devuelve si deniegan. Los acuerdos de facilitación lo reducen para algunas nacionalidades.',
        ],
      },
      {
        en: [
          'Submit inside the permitted period before travel',
          'No earlier than six months ahead and at least fifteen days before departure; leave more margin in high season.',
        ],
        pt: [
          'Entregar dentro do período permitido antes da viagem',
          'No máximo seis meses antes e pelo menos quinze dias antes da partida; deixe mais margem na alta temporada.',
        ],
        es: [
          'Presentar dentro del periodo permitido antes del viaje',
          'Como mucho seis meses antes y al menos quince días antes de la salida; deje más margen en temporada alta.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints and photograph for the visa system',
          'Held for 59 months across the area, so a recent Schengen application elsewhere can spare you the trip.',
        ],
        pt: [
          'Impressões digitais e fotografia para o sistema de vistos',
          'Guardadas por 59 meses em todo o espaço, então um pedido Schengen recente noutro país pode poupar a viagem.',
        ],
        es: [
          'Huellas y fotografía para el sistema de visados',
          'Se conservan 59 meses en todo el espacio, así que una solicitud Schengen reciente en otro país puede ahorrarle el viaje.',
        ],
      },
      {
        en: [
          'Health examination',
          'Not part of a short-stay application; only the travel insurance is verified.',
        ],
        pt: [
          'Exame de saúde',
          'Não faz parte de um pedido de curta duração; apenas o seguro de viagem é verificado.',
        ],
        es: [
          'Examen de salud',
          'No forma parte de una solicitud de corta duración; solo se verifica el seguro de viaje.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Check the sticker for entries and days granted',
          'The number of days written on the visa can be fewer than requested, and it is the number that governs.',
        ],
        pt: [
          'Conferir no adesivo as entradas e os dias concedidos',
          'O número de dias escrito no visto pode ser menor que o pedido, e é ele que vale.',
        ],
        es: [
          'Revisar en la etiqueta las entradas y los días concedidos',
          'El número de días escrito en el visado puede ser menor que el solicitado, y es el que rige.',
        ],
      },
      {
        en: [
          'Count Romanian days inside the common allowance',
          'Since accession, time here is part of the same ninety in one hundred and eighty as everywhere else in the area. Romania no longer works as a way to wait out the clock.',
        ],
        pt: [
          'Contar os dias na Roménia dentro da franquia comum',
          'Desde a adesão, o tempo aqui faz parte dos mesmos noventa em cento e oitenta do resto do espaço. A Roménia já não serve para esperar o relógio virar.',
        ],
        es: [
          'Contar los días en Rumanía dentro del cupo común',
          'Desde la adhesión, el tiempo aquí forma parte de los mismos noventa en ciento ochenta del resto del espacio. Rumanía ya no sirve para dejar correr el reloj.',
        ],
      },
      {
        en: [
          'Carry local currency or a card that works',
          'Romania is in the European Union but not in the euro area; prices are in lei and many small businesses are cash only.',
        ],
        pt: [
          'Levar moeda local ou um cartão que funcione',
          'A Roménia está na União Europeia mas não na zona euro; os preços são em leus e muitos comércios pequenos só aceitam dinheiro.',
        ],
        es: [
          'Llevar moneda local o una tarjeta que funcione',
          'Rumanía está en la Unión Europea pero no en la zona euro; los precios están en leus y muchos comercios pequeños solo aceptan efectivo.',
        ],
        priority: 3,
        required: false,
      },
      {
        en: [
          'Do not take up work or study on this visa',
          'Any paid activity or enrolment needs a long-stay visa obtained beforehand, and there is no conversion from inside the country.',
        ],
        pt: [
          'Não iniciar trabalho nem estudo com este visto',
          'Qualquer atividade remunerada ou matrícula exige visto de longa duração obtido antes, e não há conversão de dentro do país.',
        ],
        es: [
          'No iniciar trabajo ni estudios con este visado',
          'Cualquier actividad remunerada o matrícula exige un visado de larga duración obtenido antes, y no hay conversión desde dentro del país.',
        ],
      },
    ],
  },

  'Digital Nomad Visa': {
    core_documents: [
      {
        en: [
          'Passport valid beyond the requested stay',
          'With at least six months of validity left and blank pages for the visa.',
        ],
        pt: [
          'Passaporte válido além da estada pedida',
          'Com pelo menos seis meses de validade restante e páginas em branco para o visto.',
        ],
        es: [
          'Pasaporte válido más allá de la estancia solicitada',
          'Con al menos seis meses de validez restante y páginas en blanco para el visado.',
        ],
      },
      {
        en: [
          'Proof that the company you work for is registered abroad',
          'Either a contract with a company incorporated outside Romania or ownership of one, held for a minimum number of years before the application.',
        ],
        pt: [
          'Prova de que a empresa para a qual você trabalha é registada no exterior',
          'Contrato com empresa constituída fora da Roménia, ou titularidade de uma delas, mantida por um número mínimo de anos antes do pedido.',
        ],
        es: [
          'Prueba de que la empresa para la que trabaja está registrada en el extranjero',
          'Un contrato con una empresa constituida fuera de Rumanía, o la titularidad de una, mantenida un número mínimo de años antes de la solicitud.',
        ],
      },
      {
        en: [
          'Statement describing the remote activity',
          'A signed letter explaining what you do and confirming it is performed using communications technology, from Romania, for clients outside it.',
        ],
        pt: [
          'Declaração descrevendo a atividade remota',
          'Uma carta assinada explicando o que você faz e confirmando que é executado com tecnologia de comunicação, a partir da Roménia, para clientes fora dela.',
        ],
        es: [
          'Declaración que describa la actividad remota',
          'Una carta firmada que explique qué hace y confirme que se realiza con tecnología de comunicaciones, desde Rumanía, para clientes fuera de ella.',
        ],
      },
      {
        en: [
          'Criminal record certificates from two sources',
          'One from your country of origin or residence and one issued in Romania, both recent, apostilled where needed and translated.',
        ],
        pt: [
          'Certidões criminais de duas origens',
          'Uma do seu país de origem ou residência e uma emitida na Roménia, ambas recentes, apostiladas quando necessário e traduzidas.',
        ],
        es: [
          'Certificados de antecedentes de dos orígenes',
          'Uno de su país de origen o residencia y otro emitido en Rumanía, ambos recientes, apostillados cuando proceda y traducidos.',
        ],
      },
      {
        en: [
          'Tax clearance from your home authority',
          'A document proving your tax obligations are up to date where you are currently resident. Applicants rarely expect this one and it takes weeks to obtain.',
        ],
        pt: [
          'Certidão fiscal da autoridade do seu país',
          'Documento provando que as suas obrigações fiscais estão em dia onde você reside atualmente. Poucos requerentes esperam por este, e ele leva semanas para sair.',
        ],
        es: [
          'Certificado fiscal de la autoridad de su país',
          'Documento que pruebe que sus obligaciones tributarias están al día donde reside actualmente. Pocos solicitantes lo esperan y tarda semanas en obtenerse.',
        ],
      },
      {
        en: [
          'Accommodation arranged in Romania',
          'A lease or a property document. The address goes on the file and is where the immigration inspectorate expects to find you.',
        ],
        pt: [
          'Alojamento organizado na Roménia',
          'Contrato de aluguel ou documento do imóvel. O endereço entra no processo e é onde a inspeção de imigração espera encontrá-lo.',
        ],
        es: [
          'Alojamiento resuelto en Rumanía',
          'Un contrato de alquiler o un documento del inmueble. La dirección consta en el expediente y es donde la inspección de inmigración espera encontrarle.',
        ],
      },
      {
        en: [
          'Sworn translation of every foreign document',
          'Documents must be in Romanian, translated by an authorised translator and legalised. Untranslated originals are simply returned.',
        ],
        pt: [
          'Tradução juramentada de cada documento estrangeiro',
          'Os documentos precisam estar em romeno, traduzidos por tradutor autorizado e legalizados. Originais sem tradução são simplesmente devolvidos.',
        ],
        es: [
          'Traducción jurada de cada documento extranjero',
          'Los documentos deben estar en rumano, traducidos por un traductor autorizado y legalizados. Los originales sin traducir se devuelven sin más.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Income at the multiple of the national average wage required',
          'The threshold is defined as several times the average gross monthly salary published for Romania, so it rises every time that figure is updated. Confirm the current number before applying.',
        ],
        pt: [
          'Renda no múltiplo exigido do salário médio nacional',
          'O piso é definido como várias vezes o salário médio bruto mensal publicado para a Roménia, então sobe sempre que esse valor é atualizado. Confirme o número atual antes de pedir.',
        ],
        es: [
          'Ingresos en el múltiplo exigido del salario medio nacional',
          'El umbral se define como varias veces el salario medio bruto mensual publicado para Rumanía, así que sube cada vez que esa cifra se actualiza. Confirme el número actual antes de solicitar.',
        ],
      },
      {
        en: [
          'Six months of income evidence, not a snapshot',
          'The average is measured over the half year before the application, so a single strong month does not carry the file.',
        ],
        pt: [
          'Seis meses de comprovação de renda, não um retrato',
          'A média é medida no semestre anterior ao pedido, então um único mês forte não sustenta o processo.',
        ],
        es: [
          'Seis meses de prueba de ingresos, no una foto fija',
          'La media se mide en el semestre anterior a la solicitud, así que un solo mes fuerte no sostiene el expediente.',
        ],
      },
      {
        en: [
          'Health insurance valid for the whole period',
          'Cover of at least 30,000 euros, since the nomad permit does not enrol you in the Romanian health system.',
        ],
        pt: [
          'Seguro de saúde válido por todo o período',
          'Cobertura de pelo menos 30 mil euros, já que a autorização de nómada não inscreve você no sistema de saúde romeno.',
        ],
        es: [
          'Seguro de salud válido durante todo el periodo',
          'Cobertura de al menos 30 mil euros, ya que el permiso de nómada no le inscribe en el sistema sanitario rumano.',
        ],
      },
      {
        en: [
          'Pay the long-stay visa charge and the permit charge',
          'Two separate payments, one at the consulate and one later at the immigration inspectorate.',
        ],
        pt: [
          'Pagar o encargo do visto de longa duração e o da autorização',
          'Dois pagamentos separados, um no consulado e outro depois na inspeção de imigração.',
        ],
        es: [
          'Pagar el cargo del visado de larga duración y el del permiso',
          'Dos pagos distintos, uno en el consulado y otro después en la inspección de inmigración.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply at a Romanian mission abroad',
          'The nomad visa is a long-stay category and is granted before you travel; there is no version obtainable on arrival.',
        ],
        pt: [
          'Pedir numa representação romena no exterior',
          'O visto de nómada é uma categoria de longa duração e é concedido antes da viagem; não existe versão obtida na chegada.',
        ],
        es: [
          'Solicitar en una representación rumana en el extranjero',
          'El visado de nómada es una categoría de larga duración y se concede antes de viajar; no existe una versión obtenible a la llegada.',
        ],
      },
      {
        en: [
          'Allow weeks for the documents that come from other authorities',
          'Tax clearance, criminal records and apostilles are outside your control and are the usual reason a file misses its appointment.',
        ],
        pt: [
          'Prever semanas para os documentos que vêm de outras autoridades',
          'Certidão fiscal, antecedentes criminais e apostilas estão fora do seu controlo e são o motivo habitual de um processo perder o agendamento.',
        ],
        es: [
          'Prever semanas para los documentos que vienen de otras autoridades',
          'Certificado fiscal, antecedentes penales y apostillas están fuera de su control y son la razón habitual de que un expediente pierda la cita.',
        ],
      },
      {
        en: [
          'Present the file in person at the appointment',
          'Consular staff check originals against the translations and may ask you to explain the work arrangement.',
        ],
        pt: [
          'Apresentar o processo pessoalmente no atendimento',
          'A equipa consular confere os originais contra as traduções e pode pedir que você explique o arranjo de trabalho.',
        ],
        es: [
          'Presentar el expediente en persona en la cita',
          'El personal consular coteja los originales con las traducciones y puede pedirle que explique el arreglo laboral.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric enrolment for the residence card',
          'Taken at the immigration inspectorate after arrival, not at the consulate, and the card follows from it.',
        ],
        pt: [
          'Registo biométrico para o cartão de residência',
          'Feito na inspeção de imigração após a chegada, não no consulado, e o cartão decorre dele.',
        ],
        es: [
          'Registro biométrico para la tarjeta de residencia',
          'Se realiza en la inspección de inmigración tras la llegada, no en el consulado, y de ahí sale la tarjeta.',
        ],
      },
      {
        en: [
          'Keep the insurance running without a gap',
          'It is checked again when the permit is extended, and a lapse between the two dates cannot be fixed retroactively.',
        ],
        pt: [
          'Manter o seguro sem interrupção',
          'Ele é conferido de novo na prorrogação da autorização, e uma lacuna entre as duas datas não pode ser corrigida retroativamente.',
        ],
        es: [
          'Mantener el seguro sin interrupción',
          'Se comprueba de nuevo al prorrogar el permiso, y un vacío entre ambas fechas no puede arreglarse retroactivamente.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'File with the immigration inspectorate before the visa expires',
          'The long-stay visa lasts ninety days and is only the entry key. The residence permit application must reach the inspectorate at least thirty days before it runs out.',
        ],
        pt: [
          'Protocolar na inspeção de imigração antes de o visto vencer',
          'O visto de longa duração dura noventa dias e é apenas a chave de entrada. O pedido da autorização de residência precisa chegar à inspeção pelo menos trinta dias antes do vencimento.',
        ],
        es: [
          'Presentar en la inspección de inmigración antes de que caduque el visado',
          'El visado de larga duración dura noventa días y es solo la llave de entrada. La solicitud del permiso de residencia debe llegar a la inspección al menos treinta días antes de que expire.',
        ],
      },
      {
        en: [
          'Obtain the personal numeric code',
          'Issued with the residence permit, it is what banks, landlords and clinics use to identify you. Nothing administrative works without it.',
        ],
        pt: [
          'Obter o código numérico pessoal',
          'Emitido com a autorização de residência, é o que bancos, senhorios e clínicas usam para identificá-lo. Nada administrativo funciona sem ele.',
        ],
        es: [
          'Obtener el código numérico personal',
          'Se emite con el permiso de residencia y es lo que bancos, arrendadores y clínicas usan para identificarle. Nada administrativo funciona sin él.',
        ],
      },
      {
        en: [
          'Watch the day count that makes you tax resident',
          'The scheme carries a favourable tax treatment while your presence stays under the threshold in a twelve-month window; cross it and Romanian taxation on worldwide income can follow.',
        ],
        pt: [
          'Vigiar a contagem de dias que torna você residente fiscal',
          'O regime traz tratamento fiscal favorável enquanto a sua presença fica abaixo do limite numa janela de doze meses; ultrapasse-o e a tributação romena sobre renda mundial pode vir junto.',
        ],
        es: [
          'Vigilar el cómputo de días que le hace residente fiscal',
          'El régimen ofrece un trato fiscal favorable mientras su presencia se mantenga bajo el umbral en una ventana de doce meses; supérelo y puede llegar la tributación rumana sobre la renta mundial.',
        ],
      },
      {
        en: [
          'Do not work for Romanian clients or employers',
          'The permit rests on the work being for entities outside Romania. Taking local clients changes the category you should be in.',
        ],
        pt: [
          'Não trabalhar para clientes ou empregadores romenos',
          'A autorização assenta em o trabalho ser para entidades fora da Roménia. Assumir clientes locais muda a categoria em que você deveria estar.',
        ],
        es: [
          'No trabajar para clientes o empleadores rumanos',
          'El permiso se basa en que el trabajo sea para entidades fuera de Rumanía. Tomar clientes locales cambia la categoría en la que debería estar.',
        ],
      },
      {
        en: [
          'Extend before expiry with the income proof refreshed',
          'The extension repeats the income test against the updated average wage, so an amount that qualified last year may not qualify now.',
        ],
        pt: [
          'Prorrogar antes do vencimento com a prova de renda atualizada',
          'A prorrogação repete o teste de renda contra o salário médio atualizado, então um valor que qualificou no ano passado pode não qualificar agora.',
        ],
        es: [
          'Prorrogar antes del vencimiento con la prueba de ingresos actualizada',
          'La prórroga repite la prueba de ingresos frente al salario medio actualizado, así que un importe que valió el año pasado puede no valer ahora.',
        ],
      },
      {
        en: [
          'Check how these years are treated before planning to settle',
          'Do not assume time on the nomad permit counts the same as ordinary residence towards long-term status; verify it with the inspectorate before building plans on it.',
        ],
        pt: [
          'Verificar como estes anos são tratados antes de planear fixar-se',
          'Não presuma que o tempo na autorização de nómada conta como residência comum para o estatuto de longa duração; confirme com a inspeção antes de construir planos sobre isso.',
        ],
        es: [
          'Comprobar cómo se tratan estos años antes de planear asentarse',
          'No dé por hecho que el tiempo en el permiso de nómada cuenta igual que la residencia ordinaria para el estatuto de larga duración; confírmelo con la inspección antes de basar planes en ello.',
        ],
        priority: 2,
      },
    ],
  },

  'Long-Stay Visa (Type D)': {
    core_documents: [
      {
        en: [
          'Passport with six months of validity remaining',
          'And enough blank pages; the long-stay sticker takes a full page.',
        ],
        pt: [
          'Passaporte com seis meses de validade restantes',
          'E páginas em branco suficientes; o adesivo de longa duração ocupa uma página inteira.',
        ],
        es: [
          'Pasaporte con seis meses de validez restantes',
          'Y suficientes páginas en blanco; la etiqueta de larga duración ocupa una página entera.',
        ],
      },
      {
        en: [
          'Identify the correct subtype for your purpose',
          'Employment, study, family reunification, economic activity and religious work are separate letters within the same visa class, each with its own document list. Applying under the wrong one restarts the process.',
        ],
        pt: [
          'Identificar o subtipo correto para a sua finalidade',
          'Emprego, estudo, reagrupamento familiar, atividade económica e trabalho religioso são letras separadas dentro da mesma classe de visto, cada uma com a sua lista de documentos. Pedir pela errada reinicia o processo.',
        ],
        es: [
          'Identificar el subtipo correcto para su finalidad',
          'Empleo, estudios, reagrupación familiar, actividad económica y trabajo religioso son letras distintas dentro de la misma clase de visado, cada una con su propia lista de documentos. Solicitar por la equivocada reinicia el proceso.',
        ],
      },
      {
        en: [
          'Work approval obtained by the employer beforehand',
          'For the employment route the company must first obtain the avizul de angajare from the immigration inspectorate. You cannot apply for the visa until that approval exists.',
        ],
        pt: [
          'Aprovação de trabalho obtida antes pelo empregador',
          'Na via de emprego a empresa precisa obter primeiro o avizul de angajare junto da inspeção de imigração. Você não pode pedir o visto enquanto essa aprovação não existir.',
        ],
        es: [
          'Aprobación de trabajo obtenida antes por el empleador',
          'En la vía de empleo la empresa debe obtener primero el avizul de angajare ante la inspección de inmigración. No puede solicitar el visado hasta que exista esa aprobación.',
        ],
      },
      {
        en: [
          'Signed employment contract or admission letter',
          'Depending on the subtype: the labour contract registered with the authorities, or the enrolment letter from an accredited institution.',
        ],
        pt: [
          'Contrato de trabalho assinado ou carta de admissão',
          'Conforme o subtipo: o contrato laboral registado junto das autoridades, ou a carta de matrícula de instituição acreditada.',
        ],
        es: [
          'Contrato de trabajo firmado o carta de admisión',
          'Según el subtipo: el contrato laboral registrado ante las autoridades, o la carta de matrícula de una institución acreditada.',
        ],
      },
      {
        en: [
          'Criminal record certificate from your country of residence',
          'Recent, apostilled or legalised, and translated into Romanian by an authorised translator.',
        ],
        pt: [
          'Certidão de antecedentes criminais do país de residência',
          'Recente, apostilada ou legalizada, e traduzida para romeno por tradutor autorizado.',
        ],
        es: [
          'Certificado de antecedentes penales de su país de residencia',
          'Reciente, apostillado o legalizado, y traducido al rumano por un traductor autorizado.',
        ],
      },
      {
        en: [
          'Proof of a place to live',
          'A lease, a hotel booking for the first period, or a hosting statement. The address is what the residence application will be built on.',
        ],
        pt: [
          'Comprovação de local para morar',
          'Contrato de aluguel, reserva de hotel para o primeiro período, ou declaração de hospedagem. O endereço é a base do futuro pedido de residência.',
        ],
        es: [
          'Prueba de un lugar donde vivir',
          'Contrato de alquiler, reserva de hotel para el primer periodo, o declaración de alojamiento. La dirección es la base de la futura solicitud de residencia.',
        ],
      },
      {
        en: [
          'Online submission followed by a consular appointment',
          'The form goes through the ministry portal and the originals are handed over in person.',
        ],
        pt: [
          'Submissão online seguida de atendimento consular',
          'O formulário passa pelo portal do ministério e os originais são entregues pessoalmente.',
        ],
        es: [
          'Presentación en línea seguida de una cita consular',
          'El formulario pasa por el portal del ministerio y los originales se entregan en persona.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Diplomas with legalisation and Romanian translation',
          'Required for qualified employment and for study routes, and the originals may be inspected.',
        ],
        pt: [
          'Diplomas com legalização e tradução para romeno',
          'Exigidos em empregos qualificados e nas vias de estudo, e os originais podem ser inspecionados.',
        ],
        es: [
          'Títulos con legalización y traducción al rumano',
          'Exigidos en empleos cualificados y en las vías de estudio, y los originales pueden ser inspeccionados.',
        ],
      },
      {
        en: [
          'Recognition of the qualification by the national centre',
          'Regulated professions need an equivalence decision from the diploma recognition centre before employment. It runs on its own timetable and is often the bottleneck.',
        ],
        pt: [
          'Reconhecimento da qualificação pelo centro nacional',
          'Profissões regulamentadas precisam de uma decisão de equivalência do centro de reconhecimento de diplomas antes da contratação. Ela tem prazo próprio e costuma ser o gargalo.',
        ],
        es: [
          'Reconocimiento de la titulación por el centro nacional',
          'Las profesiones reguladas necesitan una resolución de equivalencia del centro de reconocimiento de títulos antes del empleo. Va a su propio ritmo y suele ser el cuello de botella.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Salary at or above the statutory floor for the category',
          'Employment routes are measured against the guaranteed minimum gross wage, and certain categories require a multiple of it. The base figure changes by government decision.',
        ],
        pt: [
          'Salário igual ou acima do piso legal da categoria',
          'As vias de emprego são medidas contra o salário mínimo bruto garantido, e certas categorias exigem um múltiplo dele. O valor base muda por decisão do governo.',
        ],
        es: [
          'Salario igual o superior al mínimo legal de la categoría',
          'Las vías de empleo se miden contra el salario mínimo bruto garantizado, y ciertas categorías exigen un múltiplo de él. La cifra base cambia por decisión del gobierno.',
        ],
      },
      {
        en: [
          'Means of support for non-working categories',
          'Students and family members must show funds for the whole period, at a level tied to the same statutory wage.',
        ],
        pt: [
          'Meios de subsistência para categorias sem trabalho',
          'Estudantes e familiares precisam mostrar recursos para todo o período, num nível atrelado ao mesmo salário legal.',
        ],
        es: [
          'Medios de subsistencia para categorías sin trabajo',
          'Estudiantes y familiares deben acreditar fondos para todo el periodo, en un nivel ligado al mismo salario legal.',
        ],
      },
      {
        en: [
          'Medical insurance covering the first period',
          'Private cover until you are enrolled in the public health scheme through employment or the residence permit.',
        ],
        pt: [
          'Seguro médico cobrindo o primeiro período',
          'Cobertura privada até você ser inscrito no regime público de saúde pelo emprego ou pela autorização de residência.',
        ],
        es: [
          'Seguro médico que cubra el primer periodo',
          'Cobertura privada hasta que quede inscrito en el régimen público de salud por el empleo o por el permiso de residencia.',
        ],
      },
      {
        en: [
          'Pay the visa charge at the consulate',
          'Charged per application and not returned if the visa is refused.',
        ],
        pt: [
          'Pagar o encargo do visto no consulado',
          'Cobrado por pedido e não devolvido se o visto for recusado.',
        ],
        es: [
          'Pagar el cargo del visado en el consulado',
          'Se cobra por solicitud y no se devuelve si deniegan el visado.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Check the annual admission quota before accepting a job',
          'The government sets a yearly ceiling on new foreign workers by decision. When it is used up, approvals wait for the next year no matter how strong the file is.',
        ],
        pt: [
          'Verificar a quota anual de admissões antes de aceitar uma vaga',
          'O governo fixa por decisão um teto anual de novos trabalhadores estrangeiros. Esgotado, as aprovações esperam o ano seguinte por melhor que seja o processo.',
        ],
        es: [
          'Comprobar el cupo anual de admisiones antes de aceptar un empleo',
          'El gobierno fija por decisión un techo anual de nuevos trabajadores extranjeros. Agotado, las aprobaciones esperan al año siguiente por muy sólido que sea el expediente.',
        ],
      },
      {
        en: [
          'Apply within the validity of the work approval',
          'The employer approval has an expiry date; if the visa application is not made inside it, the employer has to start again.',
        ],
        pt: [
          'Pedir dentro da validade da aprovação de trabalho',
          'A aprovação do empregador tem data de validade; se o pedido de visto não for feito dentro dela, o empregador precisa recomeçar.',
        ],
        es: [
          'Solicitar dentro de la validez de la aprobación de trabajo',
          'La aprobación del empleador tiene fecha de caducidad; si la solicitud de visado no se hace dentro de ella, el empleador debe empezar de nuevo.',
        ],
      },
      {
        en: [
          'Expect the decision to take weeks, not days',
          'Long-stay files are referred back to the authorities in Romania, which is slower than a short-stay decision at the counter.',
        ],
        pt: [
          'Contar com semanas, não dias, para a decisão',
          'Os processos de longa duração são remetidos às autoridades na Roménia, o que é mais lento que uma decisão de curta duração no balcão.',
        ],
        es: [
          'Contar con semanas, no días, para la resolución',
          'Los expedientes de larga duración se remiten a las autoridades en Rumanía, lo que es más lento que una resolución de corta duración en el mostrador.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical certificate confirming no public health risk',
          'A statement that you are free of diseases that would endanger public health, issued shortly before the application.',
        ],
        pt: [
          'Atestado médico confirmando ausência de risco à saúde pública',
          'Uma declaração de que você está livre de doenças que ameacem a saúde pública, emitida pouco antes do pedido.',
        ],
        es: [
          'Certificado médico que confirme la ausencia de riesgo sanitario',
          'Una declaración de que está libre de enfermedades que pongan en peligro la salud pública, emitida poco antes de la solicitud.',
        ],
      },
      {
        en: [
          'Fingerprints taken for the residence document',
          'Collected in Romania at the immigration office when you apply for the permit, not at the consulate.',
        ],
        pt: [
          'Impressões digitais recolhidas para o documento de residência',
          'Recolhidas na Roménia, na repartição de imigração, quando você pede a autorização, e não no consulado.',
        ],
        es: [
          'Huellas dactilares tomadas para el documento de residencia',
          'Se recogen en Rumanía, en la oficina de inmigración, cuando solicita el permiso, no en el consulado.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Treat the visa as a ninety-day key, not a residence right',
          'The long-stay visa authorises entry and a short initial stay. Living in Romania beyond that depends entirely on the permit that follows.',
        ],
        pt: [
          'Tratar o visto como uma chave de noventa dias, não como direito de residência',
          'O visto de longa duração autoriza a entrada e uma estada inicial curta. Morar na Roménia além disso depende inteiramente da autorização seguinte.',
        ],
        es: [
          'Tratar el visado como una llave de noventa días, no como derecho de residencia',
          'El visado de larga duración autoriza la entrada y una estancia inicial corta. Vivir en Rumanía más allá depende enteramente del permiso posterior.',
        ],
      },
      {
        en: [
          'Request the residence permit thirty days before the visa ends',
          'Filed at the territorial office of the immigration inspectorate for the county where you live. Leaving it to the last week is how people fall out of status.',
        ],
        pt: [
          'Pedir a autorização de residência trinta dias antes de o visto acabar',
          'Protocolada na repartição territorial da inspeção de imigração do condado onde você mora. Deixar para a última semana é como as pessoas perdem o estatuto.',
        ],
        es: [
          'Solicitar el permiso de residencia treinta días antes de que acabe el visado',
          'Se presenta en la oficina territorial de la inspección de inmigración del condado donde vive. Dejarlo para la última semana es como la gente pierde el estatus.',
        ],
      },
      {
        en: [
          'Collect the residence card and your personal code',
          'The permis de ședere carries the numeric code that identifies you to every Romanian institution, including the tax and health authorities.',
        ],
        pt: [
          'Retirar o cartão de residência e o seu código pessoal',
          'O permis de ședere traz o código numérico que identifica você perante todas as instituições romenas, incluindo as autoridades fiscal e de saúde.',
        ],
        es: [
          'Recoger la tarjeta de residencia y su código personal',
          'El permis de ședere lleva el código numérico que le identifica ante todas las instituciones rumanas, incluidas las autoridades fiscal y sanitaria.',
        ],
      },
      {
        en: [
          'Report a change of address or employer promptly',
          'Both must be declared to the immigration inspectorate within the deadline in the law, and a change of employer usually needs a new work approval first.',
        ],
        pt: [
          'Comunicar prontamente mudança de morada ou de empregador',
          'Ambas precisam ser declaradas à inspeção de imigração no prazo previsto na lei, e trocar de empregador normalmente exige nova aprovação de trabalho antes.',
        ],
        es: [
          'Comunicar con prontitud el cambio de domicilio o de empleador',
          'Ambos deben declararse a la inspección de inmigración en el plazo previsto en la ley, y cambiar de empleador normalmente exige antes una nueva aprobación de trabajo.',
        ],
      },
      {
        en: [
          'Renew the permit before it expires each year',
          'Most first permits run for a year and are renewed on proof that the underlying purpose still holds.',
        ],
        pt: [
          'Renovar a autorização antes do vencimento a cada ano',
          'A maioria das primeiras autorizações vale um ano e é renovada mediante prova de que a finalidade original ainda se mantém.',
        ],
        es: [
          'Renovar el permiso antes de que caduque cada año',
          'La mayoría de los primeros permisos duran un año y se renuevan acreditando que la finalidad original sigue vigente.',
        ],
      },
      {
        en: [
          'Keep every payslip and permit for the five-year count',
          'Long-term residence is proved with a continuous record, and years of study are counted at a reduced rate. Reconstructing the paperwork later is far harder than filing it as you go.',
        ],
        pt: [
          'Guardar cada holerite e autorização para a contagem dos cinco anos',
          'A residência de longa duração é provada com um histórico contínuo, e os anos de estudo contam de forma reduzida. Reconstruir a papelada depois é muito mais difícil que arquivá-la ao longo do caminho.',
        ],
        es: [
          'Guardar cada nómina y permiso para el cómputo de los cinco años',
          'La residencia de larga duración se prueba con un historial continuo, y los años de estudio cuentan de forma reducida. Reconstruir el papeleo después es mucho más difícil que archivarlo sobre la marcha.',
        ],
        priority: 2,
      },
    ],
  },

  'Long-Term Residence': {
    core_documents: [
      {
        en: [
          'Five years of continuous lawful residence',
          'Held on permits that qualify. Time spent studying is credited at a reduced rate, so five academic years are not five qualifying years.',
        ],
        pt: [
          'Cinco anos de residência legal contínua',
          'Com autorizações que qualificam. O tempo de estudo é creditado de forma reduzida, então cinco anos letivos não são cinco anos qualificantes.',
        ],
        es: [
          'Cinco años de residencia legal continua',
          'Con permisos que cualifican. El tiempo de estudio se computa de forma reducida, así que cinco años académicos no son cinco años cualificantes.',
        ],
      },
      {
        en: [
          'Valid passport and the residence permit in force',
          'The application is made from inside Romania while your current permit is still valid.',
        ],
        pt: [
          'Passaporte válido e a autorização de residência em vigor',
          'O pedido é feito de dentro da Roménia enquanto a sua autorização atual ainda é válida.',
        ],
        es: [
          'Pasaporte vigente y el permiso de residencia en vigor',
          'La solicitud se hace desde dentro de Rumanía mientras su permiso actual siga vigente.',
        ],
      },
      {
        en: [
          'Absences within the permitted limits',
          'A single absence beyond six consecutive months, or absences adding up beyond the ceiling across the five years, breaks the continuity and resets the count.',
        ],
        pt: [
          'Ausências dentro dos limites permitidos',
          'Uma única ausência acima de seis meses seguidos, ou ausências somadas acima do teto ao longo dos cinco anos, quebra a continuidade e zera a contagem.',
        ],
        es: [
          'Ausencias dentro de los límites permitidos',
          'Una sola ausencia de más de seis meses seguidos, o ausencias sumadas por encima del techo a lo largo de los cinco años, rompe la continuidad y reinicia el cómputo.',
        ],
      },
      {
        en: [
          'Certificate of no criminal record in Romania',
          'Issued locally and recent. A conviction during the qualifying period can block the application entirely.',
        ],
        pt: [
          'Certidão de antecedentes criminais na Roménia',
          'Emitida localmente e recente. Uma condenação durante o período qualificado pode bloquear o pedido por completo.',
        ],
        es: [
          'Certificado de antecedentes penales en Rumanía',
          'Emitido localmente y reciente. Una condena durante el periodo cualificado puede bloquear la solicitud por completo.',
        ],
      },
      {
        en: [
          'Housing that meets the minimum space per occupant',
          'Romanian law sets a minimum habitable area per person, and a lease for a flat that is too small for the family registered in it fails this test.',
        ],
        pt: [
          'Moradia que cumpra o espaço mínimo por ocupante',
          'A lei romena fixa uma área habitável mínima por pessoa, e um contrato de um apartamento pequeno demais para a família nele registada reprova neste teste.',
        ],
        es: [
          'Vivienda que cumpla el espacio mínimo por ocupante',
          'La ley rumana fija una superficie habitable mínima por persona, y un contrato de un piso demasiado pequeño para la familia registrada en él no supera esta prueba.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Proof of knowledge of the Romanian language',
          'A certificate or an assessment showing at least a working command. It is a hard condition, not a formality, and it is what most applicants leave until too late.',
        ],
        pt: [
          'Prova de conhecimento da língua romena',
          'Um certificado ou uma avaliação mostrando pelo menos domínio funcional. É uma condição real, não formalidade, e é o que a maioria dos requerentes deixa para tarde demais.',
        ],
        es: [
          'Prueba de conocimiento del idioma rumano',
          'Un certificado o una evaluación que muestre al menos un dominio funcional. Es una condición real, no un trámite, y es lo que la mayoría de solicitantes deja para demasiado tarde.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Stable income for yourself and your dependants',
          'Measured against the national minimum gross wage and counted per family member, so a salary that supported one person may not support three.',
        ],
        pt: [
          'Renda estável para você e os seus dependentes',
          'Medida contra o salário mínimo bruto nacional e contada por familiar, então um salário que sustentava uma pessoa pode não sustentar três.',
        ],
        es: [
          'Ingresos estables para usted y sus dependientes',
          'Medidos contra el salario mínimo bruto nacional y contados por familiar, así que un salario que mantenía a una persona puede no mantener a tres.',
        ],
      },
      {
        en: [
          'Proof of no outstanding debt to the local budget',
          'A tax certificate from the local authority of your address showing you owe nothing. An unpaid car or property tax is enough to stall the file.',
        ],
        pt: [
          'Prova de não ter dívida com o orçamento local',
          'Uma certidão fiscal da autoridade local do seu endereço mostrando que você não deve nada. Um imposto de veículo ou de imóvel em atraso basta para travar o processo.',
        ],
        es: [
          'Prueba de no tener deuda con el presupuesto local',
          'Un certificado fiscal de la autoridad local de su domicilio que muestre que no debe nada. Un impuesto de vehículo o de inmueble impagado basta para frenar el expediente.',
        ],
      },
      {
        en: [
          'Health insurance in force',
          'Public scheme enrolment through employment, or an equivalent policy, valid at the moment of the decision.',
        ],
        pt: [
          'Seguro de saúde em vigor',
          'Inscrição no regime público pelo emprego, ou apólice equivalente, válida no momento da decisão.',
        ],
        es: [
          'Seguro de salud en vigor',
          'Inscripción en el régimen público por el empleo, o una póliza equivalente, vigente en el momento de la resolución.',
        ],
      },
      {
        en: [
          'Pay the charges for the application and the card',
          'Separate amounts, paid before the file is accepted, with the receipts attached.',
        ],
        pt: [
          'Pagar os encargos do pedido e do cartão',
          'Valores separados, pagos antes de o processo ser aceite, com os recibos anexados.',
        ],
        es: [
          'Pagar los cargos de la solicitud y de la tarjeta',
          'Importes separados, pagados antes de que se acepte el expediente, con los recibos adjuntos.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Lodge the file in person at the territorial immigration office',
          'For the county where you are registered. Representatives are not accepted for this category.',
        ],
        pt: [
          'Entregar o processo pessoalmente na repartição territorial de imigração',
          'Na do condado onde você está registado. Representantes não são aceites nesta categoria.',
        ],
        es: [
          'Presentar el expediente en persona en la oficina territorial de inmigración',
          'La del condado donde esté registrado. No se aceptan representantes en esta categoría.',
        ],
      },
      {
        en: [
          'Allow several months for the decision',
          'The legal deadline runs in months, and it can be extended, so apply well before your current permit runs out.',
        ],
        pt: [
          'Prever vários meses para a decisão',
          'O prazo legal corre em meses e pode ser prorrogado, então peça bem antes de a sua autorização atual acabar.',
        ],
        es: [
          'Prever varios meses para la resolución',
          'El plazo legal corre en meses y puede prorrogarse, así que solicite bastante antes de que expire su permiso actual.',
        ],
      },
      {
        en: [
          'Keep the ordinary permit alive while the file is pending',
          'Long-term status does not shelter you retroactively; falling out of status during the wait ends the application.',
        ],
        pt: [
          'Manter a autorização comum viva enquanto o processo corre',
          'O estatuto de longa duração não protege retroativamente; ficar irregular durante a espera encerra o pedido.',
        ],
        es: [
          'Mantener vigente el permiso ordinario mientras el expediente está pendiente',
          'El estatuto de larga duración no le ampara retroactivamente; quedar irregular durante la espera termina la solicitud.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Photograph and fingerprints for the new card',
          'Taken at the immigration office when the file is submitted.',
        ],
        pt: [
          'Fotografia e impressões digitais para o novo cartão',
          'Recolhidas na repartição de imigração no momento da entrega do processo.',
        ],
        es: [
          'Fotografía y huellas dactilares para la nueva tarjeta',
          'Se toman en la oficina de inmigración al presentar el expediente.',
        ],
      },
      {
        en: [
          'Medical statement where the office requests one',
          'Usually a declaration that you present no risk to public health, on the same model used for the long-stay visa.',
        ],
        pt: [
          'Declaração médica quando a repartição pedir',
          'Normalmente uma declaração de que você não representa risco à saúde pública, no mesmo modelo usado no visto de longa duração.',
        ],
        es: [
          'Declaración médica cuando la oficina la solicite',
          'Normalmente una declaración de que no representa riesgo para la salud pública, en el mismo modelo usado para el visado de larga duración.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the long-term resident card',
          'Issued for five years and renewed on request; the status behind it does not expire with the card.',
        ],
        pt: [
          'Retirar o cartão de residente de longa duração',
          'Emitido por cinco anos e renovado a pedido; o estatuto por trás dele não caduca com o cartão.',
        ],
        es: [
          'Recoger la tarjeta de residente de larga duración',
          'Se expide por cinco años y se renueva a petición; el estatus que hay detrás no caduca con la tarjeta.',
        ],
      },
      {
        en: [
          'Use the equal treatment the status carries',
          'Access to employment without a separate work approval, to education and to social protection on the same terms as nationals.',
        ],
        pt: [
          'Usar a igualdade de tratamento que o estatuto traz',
          'Acesso ao emprego sem aprovação de trabalho separada, à educação e à proteção social nas mesmas condições dos nacionais.',
        ],
        es: [
          'Aprovechar la igualdad de trato que otorga el estatus',
          'Acceso al empleo sin aprobación de trabajo separada, a la educación y a la protección social en las mismas condiciones que los nacionales.',
        ],
      },
      {
        en: [
          'Do not assume the status moves with you across the Union',
          'European long-term resident status makes settling in another member state easier, but that state still runs its own procedure and can refuse.',
        ],
        pt: [
          'Não presumir que o estatuto se move com você pela União',
          'O estatuto de residente de longa duração europeu facilita fixar-se noutro Estado-membro, mas esse Estado ainda corre o seu próprio procedimento e pode recusar.',
        ],
        es: [
          'No dar por hecho que el estatus le acompaña por la Unión',
          'El estatus de residente de larga duración europeo facilita asentarse en otro Estado miembro, pero ese Estado sigue aplicando su propio procedimiento y puede denegar.',
        ],
      },
      {
        en: [
          'Guard the status against long absences',
          'Being outside the Union for an extended continuous period, or outside Romania for even longer, is a ground for withdrawal.',
        ],
        pt: [
          'Proteger o estatuto contra ausências longas',
          'Ficar fora da União por período contínuo prolongado, ou fora da Roménia por ainda mais tempo, é motivo de retirada.',
        ],
        es: [
          'Proteger el estatus frente a ausencias largas',
          'Estar fuera de la Unión durante un periodo continuo prolongado, o fuera de Rumanía aún más tiempo, es causa de retirada.',
        ],
      },
      {
        en: [
          'Plan the citizenship route as a separate project',
          'Naturalisation asks for a longer qualifying period than long-term residence, shortened by marriage to a Romanian citizen, plus an interview on the language, the constitution, the national anthem and Romanian culture.',
        ],
        pt: [
          'Planear a via da cidadania como projeto separado',
          'A naturalização exige um período qualificado maior que o da residência de longa duração, encurtado por casamento com cidadão romeno, além de uma entrevista sobre a língua, a constituição, o hino nacional e a cultura romena.',
        ],
        es: [
          'Planificar la vía de la ciudadanía como un proyecto aparte',
          'La naturalización exige un periodo cualificado mayor que el de la residencia de larga duración, acortado por matrimonio con un ciudadano rumano, además de una entrevista sobre el idioma, la constitución, el himno nacional y la cultura rumana.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
