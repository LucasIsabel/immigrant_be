import type { CountryVisaSteps } from './types';

/**
 * Steps for Italy.
 *
 * Two features shape almost everything here. Most work routes run through the
 * decreto flussi, an annual quota opened on a fixed date and exhausted within
 * minutes — so the constraint is the calendar, not the paperwork. And the visa
 * is never the end: the permesso di soggiorno is applied for from inside Italy,
 * by post, within eight days of arrival, and it is that deadline people miss.
 */
export const italy: CountryVisaSteps = {
  'Short-Stay (Schengen) Visa': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Valid for at least three months beyond departure and issued within the last ten years.',
        ],
        pt: [
          'Passaporte válido',
          'Válido por pelo menos três meses além da saída e emitido nos últimos dez anos.',
        ],
        es: [
          'Pasaporte vigente',
          'Vigente al menos tres meses más allá de la salida y emitido en los últimos diez años.',
        ],
      },
      {
        en: [
          'Schengen application form, signed',
          'One per traveller, including minors.',
        ],
        pt: [
          'Formulário Schengen preenchido e assinado',
          'Um por viajante, inclusive menores.',
        ],
        es: [
          'Formulario Schengen cumplimentado y firmado',
          'Uno por viajero, incluidos menores.',
        ],
      },
      {
        en: [
          'Two recent photographs',
          'Passport format, on a light background.',
        ],
        pt: [
          'Duas fotografias recentes',
          'Formato passaporte, em fundo claro.',
        ],
        es: [
          'Dos fotografías recientes',
          'Formato pasaporte, con fondo claro.',
        ],
      },
      {
        en: [
          'Return flight reservation',
          'A reservation only, matching the dates declared on the form.',
        ],
        pt: [
          'Reserva de voo de volta',
          'Apenas a reserva, coerente com as datas declaradas no formulário.',
        ],
        es: [
          'Reserva de vuelo de vuelta',
          'Solo la reserva, coherente con las fechas declaradas en el formulario.',
        ],
      },
      {
        en: [
          'Proof of accommodation',
          'Hotel booking, or a signed invitation from your host with a copy of their identity document.',
        ],
        pt: [
          'Comprovativo de alojamento',
          'Reserva de hotel, ou convite assinado do anfitrião com cópia do documento de identidade dele.',
        ],
        es: [
          'Comprobante de alojamiento',
          'Reserva de hotel, o invitación firmada del anfitrión con copia de su documento de identidad.',
        ],
      },
      {
        en: [
          'Travel medical insurance',
          'Minimum cover of 30,000 euros, valid across the Schengen area for the whole stay.',
        ],
        pt: [
          'Seguro médico de viagem',
          'Cobertura mínima de 30 mil euros, válida no espaço Schengen durante toda a estada.',
        ],
        es: [
          'Seguro médico de viaje',
          'Cobertura mínima de 30 mil euros, válida en el espacio Schengen durante toda la estancia.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of means of subsistence',
          'Italy publishes a table with amounts that vary by length of trip and number of travellers.',
        ],
        pt: [
          'Comprovativo de meios de subsistência',
          'A Itália publica uma tabela com valores que variam conforme a duração da viagem e o número de viajantes.',
        ],
        es: [
          'Comprobante de medios de subsistencia',
          'Italia publica una tabla con importes que varían según la duración del viaje y el número de viajeros.',
        ],
      },
      {
        en: [
          'Bank statements from the last three months',
          'The balance has to be consistent with the trip described.',
        ],
        pt: [
          'Extratos bancários dos últimos três meses',
          'O saldo precisa ser coerente com a viagem descrita.',
        ],
        es: [
          'Extractos bancarios de los últimos tres meses',
          'El saldo debe ser coherente con el viaje descrito.',
        ],
      },
      {
        en: [
          'Proof of employment and approved leave',
          'An employer letter, or business documents if you are self-employed.',
        ],
        pt: [
          'Comprovativo de vínculo laboral e férias aprovadas',
          'Carta do empregador, ou documentos da empresa se for autônomo.',
        ],
        es: [
          'Comprobante de vínculo laboral y vacaciones aprobadas',
          'Carta del empleador, o documentos de la empresa si trabaja por cuenta propia.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Book the appointment at the visa application centre',
          'Italy outsources collection in most countries.',
        ],
        pt: [
          'Agendar atendimento no centro de pedidos de visto',
          'A Itália terceiriza a recolha na maioria dos países.',
        ],
        es: [
          'Reservar cita en el centro de solicitudes de visado',
          'Italia externaliza la recogida en la mayoría de los países.',
        ],
      },
      {
        en: [
          'Pay the visa fee and the service charge',
          'Two separate amounts, neither refunded on refusal.',
        ],
        pt: [
          'Pagar a taxa de visto e a taxa de serviço',
          'Dois valores distintos, nenhum reembolsado em caso de indeferimento.',
        ],
        es: [
          'Pagar la tasa de visado y la tasa de servicio',
          'Dos importes distintos, ninguno reembolsable si deniegan.',
        ],
      },
      {
        en: ['Submit the application in person', 'Take originals and copies.'],
        pt: ['Entregar o pedido presencialmente', 'Leve originais e cópias.'],
        es: ['Presentar la solicitud en persona', 'Lleve originales y copias.'],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection',
          'Fingerprints stay on file for 59 months across Schengen applications.',
        ],
        pt: [
          'Recolha de dados biométricos',
          'As impressões ficam registadas por 59 meses entre pedidos Schengen.',
        ],
        es: [
          'Recogida de datos biométricos',
          'Las huellas quedan registradas 59 meses entre solicitudes Schengen.',
        ],
      },
      {
        en: ['Medical examination', 'Not required for short-stay visas.'],
        pt: ['Exame médico', 'Não é exigido em vistos de curta duração.'],
        es: ['Examen médico', 'No se exige en visados de corta duración.'],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the passport with the visa',
          'Check the dates and the number of entries granted.',
        ],
        pt: [
          'Retirar o passaporte com o visto',
          'Confira as datas e o número de entradas concedidas.',
        ],
        es: [
          'Recoger el pasaporte con el visado',
          'Verifique las fechas y el número de entradas concedidas.',
        ],
      },
      {
        en: [
          'Declare your presence if staying in a private home',
          'Hotels report guests automatically; staying with friends requires a declaration to the police within eight days.',
        ],
        pt: [
          'Declarar a presença se ficar em casa particular',
          'Hotéis reportam hóspedes automaticamente; ficar na casa de conhecidos exige declaração à polícia em oito dias.',
        ],
        es: [
          'Declarar la presencia si se aloja en un domicilio particular',
          'Los hoteles informan de los huéspedes automáticamente; alojarse con conocidos exige declaración a la policía en ocho días.',
        ],
      },
      {
        en: [
          'Respect the 90 days in any 180 rule',
          'Counted across the whole Schengen area, on a rolling basis.',
        ],
        pt: [
          'Respeitar a regra dos 90 dias em cada 180',
          'Contados em todo o espaço Schengen, de forma móvel.',
        ],
        es: [
          'Respetar la regla de 90 días en cada 180',
          'Se cuentan en todo el espacio Schengen, de forma móvil.',
        ],
      },
    ],
  },

  'Long-Stay National Visa / Residence Permit': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Should cover the period of residence requested.',
        ],
        pt: [
          'Passaporte válido',
          'Deve cobrir o período de residência pedido.',
        ],
        es: [
          'Pasaporte vigente',
          'Debe cubrir el periodo de residencia solicitado.',
        ],
      },
      {
        en: [
          'National visa application form',
          'Different from the Schengen form; state the exact ground for the stay.',
        ],
        pt: [
          'Formulário de visto nacional',
          'Diferente do formulário Schengen; indique o fundamento exato da estada.',
        ],
        es: [
          'Formulario de visado nacional',
          'Distinto del formulario Schengen; indique el fundamento exacto de la estancia.',
        ],
      },
      {
        en: [
          'Nulla osta issued by the Sportello Unico',
          'For subordinate work, the employer obtains this authorisation in Italy before you can apply. It is the gate to the whole process.',
        ],
        pt: [
          'Nulla osta emitido pelo Sportello Unico',
          'No trabalho subordinado, o empregador obtém essa autorização na Itália antes de você poder pedir. É a porta de todo o processo.',
        ],
        es: [
          'Nulla osta emitido por el Sportello Unico',
          'En el trabajo por cuenta ajena, el empleador obtiene esa autorización en Italia antes de que usted pueda solicitar. Es la puerta de todo el proceso.',
        ],
      },
      {
        en: [
          'Criminal record certificate, apostilled',
          'With a sworn translation into Italian.',
        ],
        pt: [
          'Certidão de antecedentes criminais apostilada',
          'Com tradução juramentada para o italiano.',
        ],
        es: [
          'Certificado de antecedentes penales apostillado',
          'Con traducción jurada al italiano.',
        ],
      },
      {
        en: [
          'Proof of accommodation in Italy',
          'A registered lease, a deed, or a formal declaration of hospitality.',
        ],
        pt: [
          'Comprovativo de alojamento na Itália',
          'Contrato de locação registado, escritura ou declaração formal de hospitalidade.',
        ],
        es: [
          'Comprobante de alojamiento en Italia',
          'Contrato de alquiler registrado, escritura o declaración formal de hospitalidad.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Diplomas with declaration of value',
          'The dichiarazione di valore, issued by the Italian consulate, is what makes a foreign qualification legible to Italian authorities.',
        ],
        pt: [
          'Diplomas com declaração de valor',
          'A dichiarazione di valore, emitida pelo consulado italiano, é o que torna uma qualificação estrangeira legível para as autoridades italianas.',
        ],
        es: [
          'Títulos con declaración de valor',
          'La dichiarazione di valore, emitida por el consulado italiano, es lo que hace legible una titulación extranjera para las autoridades italianas.',
        ],
        required: false,
      },
      {
        en: [
          'University pre-enrolment on Universitaly',
          'For study visas the pre-enrolment is done on the ministry portal before the visa application.',
        ],
        pt: [
          'Pré-matrícula universitária no Universitaly',
          'Nos vistos de estudo a pré-matrícula é feita no portal do ministério antes do pedido de visto.',
        ],
        es: [
          'Preinscripción universitaria en Universitaly',
          'En los visados de estudio la preinscripción se hace en el portal del ministerio antes de solicitar el visado.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Proof of Italian where the course requires it',
          'Degree programmes taught in Italian generally ask for B1 or B2.',
        ],
        pt: [
          'Comprovação de italiano quando o curso exigir',
          'Cursos de graduação lecionados em italiano em geral pedem B1 ou B2.',
        ],
        es: [
          'Prueba de italiano cuando el curso lo exija',
          'Los programas impartidos en italiano suelen pedir B1 o B2.',
        ],
        priority: 3,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of means of subsistence',
          'Indexed to the Italian social allowance, and the threshold rises with each family member.',
        ],
        pt: [
          'Comprovativo de meios de subsistência',
          'Indexado ao assegno sociale italiano, e o piso sobe a cada familiar.',
        ],
        es: [
          'Comprobante de medios de subsistencia',
          'Indexado al assegno sociale italiano, y el umbral sube por cada familiar.',
        ],
      },
      {
        en: [
          'Employment contract signed in Italy',
          'The contratto di soggiorno, which links the job to the accommodation.',
        ],
        pt: [
          'Contrato de trabalho assinado na Itália',
          'O contratto di soggiorno, que vincula o emprego ao alojamento.',
        ],
        es: [
          'Contrato de trabajo firmado en Italia',
          'El contratto di soggiorno, que vincula el empleo con el alojamiento.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Bank statements from the last six months',
          'Showing a steady pattern rather than a single recent deposit.',
        ],
        pt: [
          'Extratos bancários dos últimos seis meses',
          'Mostrando padrão estável, não um depósito recente isolado.',
        ],
        es: [
          'Extractos bancarios de los últimos seis meses',
          'Que muestren un patrón estable, no un depósito reciente aislado.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Watch the decreto flussi window',
          'Work quotas open on a fixed date and are exhausted in minutes. Everything must be ready before the window, not after.',
        ],
        pt: [
          'Acompanhar a janela do decreto flussi',
          'As cotas de trabalho abrem em data fixa e se esgotam em minutos. Tudo precisa estar pronto antes da janela, não depois.',
        ],
        es: [
          'Vigilar la ventana del decreto flussi',
          'Los cupos de trabajo abren en fecha fija y se agotan en minutos. Todo debe estar listo antes de la ventana, no después.',
        ],
      },
      {
        en: [
          'Book the appointment at the consulate',
          'The application is made where you legally reside, which matters if you live outside your country of nationality.',
        ],
        pt: [
          'Agendar atendimento no consulado',
          'O pedido é feito onde você reside legalmente, o que importa se você mora fora do país de nacionalidade.',
        ],
        es: [
          'Reservar cita en el consulado',
          'La solicitud se hace donde reside legalmente, lo que importa si vive fuera de su país de nacionalidad.',
        ],
      },
      {
        en: [
          'Pay the national visa fee',
          'Paid at submission and not refunded on refusal.',
        ],
        pt: [
          'Pagar a taxa de visto nacional',
          'Paga na entrega e não devolvida em caso de indeferimento.',
        ],
        es: [
          'Pagar la tasa de visado nacional',
          'Se paga al presentar y no se devuelve si deniegan.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection',
          'Taken at the consulate, and again at the Questura in Italy.',
        ],
        pt: [
          'Recolha de dados biométricos',
          'Feita no consulado e novamente na Questura, já na Itália.',
        ],
        es: [
          'Recogida de datos biométricos',
          'Se realiza en el consulado y de nuevo en la Questura, ya en Italia.',
        ],
      },
      {
        en: [
          'Health insurance for the first period',
          'Valid until you register with the national health service.',
        ],
        pt: [
          'Seguro de saúde para o período inicial',
          'Válido até a inscrição no serviço nacional de saúde.',
        ],
        es: [
          'Seguro de salud para el periodo inicial',
          'Válido hasta la inscripción en el servicio nacional de salud.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Apply for the permesso di soggiorno within eight days of arrival',
          'Submitted by post using the kit at a Poste Italiane counter. The deadline is short and missing it puts your stay in irregularity from the start.',
        ],
        pt: [
          'Pedir o permesso di soggiorno em até oito dias da chegada',
          'Enviado pelo correio com o kit num guichê dos Poste Italiane. O prazo é curto e perdê-lo coloca sua estada em irregularidade desde o início.',
        ],
        es: [
          'Solicitar el permesso di soggiorno en un plazo de ocho días desde la llegada',
          'Se envía por correo con el kit en una ventanilla de Poste Italiane. El plazo es corto y perderlo deja su estancia en situación irregular desde el principio.',
        ],
      },
      {
        en: [
          'Attend the Questura appointment',
          'The date comes on the postal receipt. Fingerprints are taken there and the card is issued afterwards.',
        ],
        pt: [
          'Comparecer ao atendimento na Questura',
          'A data vem no recibo dos correios. As impressões são recolhidas lá e o cartão é emitido depois.',
        ],
        es: [
          'Acudir a la cita en la Questura',
          'La fecha viene en el resguardo de correos. Allí se toman las huellas y la tarjeta se emite después.',
        ],
      },
      {
        en: [
          'Obtain the codice fiscale',
          'Nothing works without it: no contract, no bank account, no health card.',
        ],
        pt: [
          'Obter o codice fiscale',
          'Nada funciona sem ele: nem contrato, nem conta bancária, nem cartão de saúde.',
        ],
        es: [
          'Obtener el codice fiscale',
          'Nada funciona sin él: ni contrato, ni cuenta bancaria, ni tarjeta sanitaria.',
        ],
      },
      {
        en: [
          'Register residence at the comune',
          'The residenza anagrafica is what starts the clock for long-term residence and for citizenship.',
        ],
        pt: [
          'Registar residência no comune',
          'A residenza anagrafica é o que inicia a contagem para a residência de longa duração e para a cidadania.',
        ],
        es: [
          'Registrar la residencia en el comune',
          'La residenza anagrafica es lo que inicia el cómputo para la residencia de larga duración y para la ciudadanía.',
        ],
        priority: 2,
      },
      {
        en: [
          'Renew the permesso before it expires',
          'Renewal is applied for in advance and by the same postal route.',
        ],
        pt: [
          'Renovar o permesso antes do vencimento',
          'A renovação é pedida com antecedência e pela mesma via postal.',
        ],
        es: [
          'Renovar el permesso antes de que caduque',
          'La renovación se solicita con antelación y por la misma vía postal.',
        ],
      },
    ],
  },

  'Investor / Self-Employment Visa': {
    core_documents: [
      {
        en: ['Valid passport', 'Valid for the period of residence requested.'],
        pt: ['Passaporte válido', 'Válido pelo período de residência pedido.'],
        es: [
          'Pasaporte vigente',
          'Vigente por el periodo de residencia solicitado.',
        ],
      },
      {
        en: [
          'Nulla osta from the Investor Visa Committee',
          'Investors apply online to the committee first and receive this authorisation before approaching the consulate.',
        ],
        pt: [
          'Nulla osta do Comitê Investor Visa',
          'Investidores pedem online ao comitê primeiro e recebem essa autorização antes de procurar o consulado.',
        ],
        es: [
          'Nulla osta del Comité Investor Visa',
          'Los inversores solicitan primero en línea al comité y reciben esa autorización antes de acudir al consulado.',
        ],
      },
      {
        en: [
          'Criminal record certificate, apostilled',
          'With a sworn translation into Italian.',
        ],
        pt: [
          'Certidão de antecedentes criminais apostilada',
          'Com tradução juramentada para o italiano.',
        ],
        es: [
          'Certificado de antecedentes penales apostillado',
          'Con traducción jurada al italiano.',
        ],
      },
      {
        en: [
          'Proof of accommodation in Italy',
          'A lease or a deed in the region where the activity will be based.',
        ],
        pt: [
          'Comprovativo de alojamento na Itália',
          'Contrato de locação ou escritura na região onde a atividade terá sede.',
        ],
        es: [
          'Comprobante de alojamiento en Italia',
          'Contrato de alquiler o escritura en la región donde tendrá sede la actividad.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Professional qualifications for the activity',
          'For self-employment, the licence or registration the profession requires in Italy.',
        ],
        pt: [
          'Qualificações profissionais para a atividade',
          'No trabalho autônomo, a licença ou o registo que a profissão exige na Itália.',
        ],
        es: [
          'Cualificaciones profesionales para la actividad',
          'En el trabajo por cuenta propia, la licencia o el registro que la profesión exija en Italia.',
        ],
        required: false,
      },
      {
        en: [
          'Business plan for the venture',
          'Required for the innovative startup route, and it is what the committee actually assesses.',
        ],
        pt: [
          'Plano de negócios do empreendimento',
          'Exigido na rota de startup inovadora, e é o que o comitê de fato avalia.',
        ],
        es: [
          'Plan de negocio del emprendimiento',
          'Exigido en la vía de startup innovadora, y es lo que el comité realmente evalúa.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence of the investment amount',
          'The threshold differs sharply by target: an innovative startup, an established company, a philanthropic project or government bonds. Confirm the figures in force.',
        ],
        pt: [
          'Comprovação do valor investido',
          'O piso varia muito conforme o destino: startup inovadora, empresa constituída, projeto filantrópico ou títulos públicos. Confirme os valores em vigor.',
        ],
        es: [
          'Prueba del importe invertido',
          'El umbral varía mucho según el destino: startup innovadora, empresa constituida, proyecto filantrópico o bonos del Estado. Confirme las cifras vigentes.',
        ],
      },
      {
        en: [
          'Proof of the lawful origin of the funds',
          'Tax returns, sale contracts and bank records tracing where the capital came from.',
        ],
        pt: [
          'Comprovação da origem lícita dos recursos',
          'Declarações de imposto, contratos de venda e extratos rastreando de onde veio o capital.',
        ],
        es: [
          'Prueba del origen lícito de los fondos',
          'Declaraciones de impuestos, contratos de venta y extractos que rastreen de dónde vino el capital.',
        ],
      },
      {
        en: [
          'Commitment to make the investment',
          'A signed declaration undertaking to invest within three months of entry.',
        ],
        pt: [
          'Compromisso de realizar o investimento',
          'Declaração assinada com o compromisso de investir em até três meses da entrada.',
        ],
        es: [
          'Compromiso de realizar la inversión',
          'Declaración firmada comprometiéndose a invertir en los tres meses siguientes a la entrada.',
        ],
      },
      {
        en: [
          'Proof of resources beyond the investment',
          'Enough to live on without relying on the invested capital.',
        ],
        pt: [
          'Comprovação de recursos além do investimento',
          'Suficientes para viver sem depender do capital investido.',
        ],
        es: [
          'Prueba de recursos más allá de la inversión',
          'Suficientes para vivir sin depender del capital invertido.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply to the committee on the investor visa portal',
          'Entirely online and free of charge. The decision normally comes within thirty days.',
        ],
        pt: [
          'Pedir ao comitê no portal do investor visa',
          'Totalmente online e sem custo. A decisão costuma sair em até trinta dias.',
        ],
        es: [
          'Solicitar al comité en el portal del investor visa',
          'Totalmente en línea y sin coste. La decisión suele llegar en treinta días.',
        ],
      },
      {
        en: [
          'Book the consular appointment with the nulla osta in hand',
          'The consular stage only opens once the committee has authorised you.',
        ],
        pt: [
          'Agendar o consulado já com o nulla osta em mãos',
          'A etapa consular só abre depois de o comitê ter autorizado.',
        ],
        es: [
          'Reservar la cita consular ya con el nulla osta en mano',
          'La etapa consular solo se abre una vez que el comité ha autorizado.',
        ],
      },
      {
        en: [
          'Pay the national visa fee',
          'Note that self-employment outside the investor route falls under the decreto flussi quotas, with a very different timeline.',
        ],
        pt: [
          'Pagar a taxa de visto nacional',
          'Note que o trabalho autônomo fora da rota de investidor cai nas cotas do decreto flussi, com um calendário bem diferente.',
        ],
        es: [
          'Pagar la tasa de visado nacional',
          'Tenga en cuenta que el trabajo por cuenta propia fuera de la vía de inversor entra en los cupos del decreto flussi, con un calendario muy distinto.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection',
          'Taken at the consulate, and again at the Questura in Italy.',
        ],
        pt: [
          'Recolha de dados biométricos',
          'Feita no consulado e novamente na Questura, já na Itália.',
        ],
        es: [
          'Recogida de datos biométricos',
          'Se realiza en el consulado y de nuevo en la Questura, ya en Italia.',
        ],
      },
      {
        en: [
          'Health insurance covering Italy',
          'For the whole first period, until you register with the national health service.',
        ],
        pt: [
          'Seguro de saúde com cobertura na Itália',
          'Para todo o período inicial, até a inscrição no serviço nacional de saúde.',
        ],
        es: [
          'Seguro de salud con cobertura en Italia',
          'Para todo el periodo inicial, hasta la inscripción en el servicio nacional de salud.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Apply for the permesso di soggiorno within eight days of arrival',
          'The investor permit is issued for two years and is renewable for three more.',
        ],
        pt: [
          'Pedir o permesso di soggiorno em até oito dias da chegada',
          'O permesso de investidor é emitido por dois anos e renovável por mais três.',
        ],
        es: [
          'Solicitar el permesso di soggiorno en un plazo de ocho días desde la llegada',
          'El permesso de inversor se emite por dos años y es renovable por tres más.',
        ],
      },
      {
        en: [
          'Make the investment within three months of entry',
          'And send the committee the evidence. Failing to do so revokes the permit.',
        ],
        pt: [
          'Realizar o investimento em até três meses da entrada',
          'E enviar a comprovação ao comitê. Não fazê-lo revoga o permesso.',
        ],
        es: [
          'Realizar la inversión en los tres meses siguientes a la entrada',
          'Y enviar la prueba al comité. No hacerlo revoca el permiso.',
        ],
      },
      {
        en: [
          'Maintain the investment for the whole period',
          'Withdrawing the capital early ends the permit, including on renewal.',
        ],
        pt: [
          'Manter o investimento durante todo o período',
          'Retirar o capital antes do tempo encerra o permesso, inclusive na renovação.',
        ],
        es: [
          'Mantener la inversión durante todo el periodo',
          'Retirar el capital antes de tiempo extingue el permiso, también en la renovación.',
        ],
      },
      {
        en: [
          'Obtain the codice fiscale and open a VAT number if trading',
          'The partita IVA is required for self-employed activity.',
        ],
        pt: [
          'Obter o codice fiscale e abrir partita IVA se for exercer atividade',
          'A partita IVA é exigida para atividade autônoma.',
        ],
        es: [
          'Obtener el codice fiscale y abrir partita IVA si va a ejercer',
          'La partita IVA se exige para la actividad por cuenta propia.',
        ],
        priority: 2,
      },
    ],
  },
};
