import type { CountryVisaSteps } from './types';

/**
 * Steps for Vietnam.
 *
 * Three facts shape almost every checklist here. The e-visa is now open to all
 * nationalities and can be issued for multiple entries with a longer validity
 * than older guides describe, so the "thirty days, single entry" advice still
 * circulating online is simply out of date.
 *
 * For anything involving work, the order is fixed and unforgiving: the employer
 * first proves the position cannot be filled locally, then obtains the work
 * permit, and only after the permit exists can the temporary residence card be
 * applied for. Nothing runs in parallel, and no stage can be skipped.
 *
 * Finally, residence registration with the ward police is a recurring duty, not
 * a one-off arrival formality. Hotels file it for their guests automatically;
 * anyone renting a flat has to do it in person, and again after every move and
 * every trip abroad.
 */
export const vietnam: CountryVisaSteps = {
  'Tourist Visa / e-Visa': {
    core_documents: [
      {
        en: [
          'Passport valid for at least six months',
          'Counted from the date of entry, not from the application. Two blank pages are also expected at the gate.',
        ],
        pt: [
          'Passaporte válido por pelo menos seis meses',
          'Contados a partir da data de entrada, não do pedido. Duas páginas em branco também são esperadas no posto.',
        ],
        es: [
          'Pasaporte con al menos seis meses de vigencia',
          'Se cuentan desde la fecha de entrada, no desde la solicitud. También se esperan dos páginas en blanco en el puesto.',
        ],
      },
      {
        en: [
          'Colour scan of the passport data page',
          'The whole page, flat and without glare. A cropped or dark upload is the most common reason an application fails, and the fee is not returned.',
        ],
        pt: [
          'Digitalização colorida da página de dados do passaporte',
          'A página inteira, plana e sem reflexo. Um envio cortado ou escuro é o motivo mais comum de recusa, e a taxa não volta.',
        ],
        es: [
          'Escaneo en color de la página de datos del pasaporte',
          'La página entera, plana y sin reflejos. Un archivo recortado u oscuro es el motivo más común de rechazo, y la tasa no se devuelve.',
        ],
      },
      {
        en: [
          'Recent portrait photograph without glasses',
          'White background, face straight on, no headwear. It is compared against the scanned passport page.',
        ],
        pt: [
          'Fotografia de rosto recente sem óculos',
          'Fundo branco, rosto de frente, sem adornos na cabeça. Ela é comparada com a página do passaporte digitalizada.',
        ],
        es: [
          'Fotografía de rostro reciente sin gafas',
          'Fondo blanco, cara de frente, sin prendas en la cabeza. Se compara con la página del pasaporte escaneada.',
        ],
      },
      {
        en: [
          'Address of your first accommodation in Vietnam',
          'The form wants the street address and the name of the hotel or host. Leaving it vague stops the submission.',
        ],
        pt: [
          'Endereço do primeiro alojamento no Vietnã',
          'O formulário quer o endereço completo e o nome do hotel ou do anfitrião. Deixar vago trava o envio.',
        ],
        es: [
          'Dirección del primer alojamiento en Vietnam',
          'El formulario pide la dirección completa y el nombre del hotel o del anfitrión. Dejarlo impreciso bloquea el envío.',
        ],
      },
      {
        en: [
          'Declare the entry and exit checkpoints',
          'You are bound to the gates you named. Landing at a different airport or crossing at another border post can mean being turned back.',
        ],
        pt: [
          'Declarar os postos de entrada e de saída',
          'Você fica vinculado aos postos que indicou. Pousar em outro aeroporto ou cruzar por outra fronteira pode significar ser barrado.',
        ],
        es: [
          'Declarar los puestos de entrada y de salida',
          'Queda vinculado a los puestos que indicó. Aterrizar en otro aeropuerto o cruzar por otra frontera puede suponer que le devuelvan.',
        ],
      },
      {
        en: [
          'Choose single or multiple entry before paying',
          'The e-visa now covers all nationalities and can be issued for multiple entries with a longer validity than older guides describe. The choice cannot be amended afterwards.',
        ],
        pt: [
          'Escolher entrada única ou múltipla antes de pagar',
          'O e-visa hoje abrange todas as nacionalidades e pode sair com múltiplas entradas e validade maior do que dizem os guias antigos. A escolha não é alterável depois.',
        ],
        es: [
          'Elegir entrada única o múltiple antes de pagar',
          'El e-visado hoy alcanza a todas las nacionalidades y puede emitirse con entradas múltiples y una validez mayor de la que citan las guías antiguas. La elección no se puede cambiar después.',
        ],
      },
      {
        en: [
          'Check whether your nationality has a unilateral exemption',
          'Several nationalities enter visa-free, but for a shorter window than the e-visa grants. Taking the exemption and then wanting to stay longer forces a border run.',
        ],
        pt: [
          'Verificar se sua nacionalidade tem isenção unilateral',
          'Várias nacionalidades entram sem visto, mas por um período menor que o do e-visa. Aceitar a isenção e depois querer ficar mais obriga a sair e voltar.',
        ],
        es: [
          'Comprobar si su nacionalidad tiene exención unilateral',
          'Varias nacionalidades entran sin visado, pero por un plazo menor que el del e-visado. Aceptar la exención y luego querer quedarse más obliga a salir y volver.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Funds available for the whole trip',
          'Not uploaded with the application, but border officers may ask. Card statements on your phone are enough.',
        ],
        pt: [
          'Recursos disponíveis para toda a viagem',
          'Não são enviados com o pedido, mas o agente de fronteira pode perguntar. Extratos no celular bastam.',
        ],
        es: [
          'Fondos disponibles para todo el viaje',
          'No se suben con la solicitud, pero el agente de frontera puede preguntar. Basta con extractos en el móvil.',
        ],
        priority: 2,
      },
      {
        en: [
          'Onward or return ticket',
          'Airlines check it at boarding because they are fined for carrying a passenger who is refused entry.',
        ],
        pt: [
          'Passagem de saída ou de volta',
          'As companhias conferem no embarque porque são multadas se levarem um passageiro que acabe barrado.',
        ],
        es: [
          'Billete de salida o de vuelta',
          'Las aerolíneas lo comprueban al embarcar porque las multan si llevan a un pasajero al que luego rechazan.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply on the official government e-visa portal',
          'Look-alike sites charge several times the real price for the same form. Only the government domain issues the visa itself.',
        ],
        pt: [
          'Pedir no portal oficial de e-visa do governo',
          'Sites imitadores cobram várias vezes o preço real pelo mesmo formulário. Só o domínio do governo emite o visto de verdade.',
        ],
        es: [
          'Solicitar en el portal oficial de e-visado del gobierno',
          'Los sitios imitadores cobran varias veces el precio real por el mismo formulario. Solo el dominio gubernamental emite el visado.',
        ],
      },
      {
        en: [
          'Pay the e-visa fee online',
          'It is not refunded if the application is refused, and it differs between single and multiple entry. Confirm the current amount on the portal.',
        ],
        pt: [
          'Pagar a taxa do e-visa online',
          'Ela não é devolvida se o pedido for negado, e muda entre entrada única e múltipla. Confirme o valor vigente no portal.',
        ],
        es: [
          'Pagar la tasa del e-visado en línea',
          'No se devuelve si deniegan la solicitud, y cambia entre entrada única y múltiple. Confirme el importe vigente en el portal.',
        ],
      },
      {
        en: [
          'Save the registration code from the receipt',
          'It is the only way to look up the result later. There is no reminder email once the code is lost.',
        ],
        pt: [
          'Guardar o código de registo do comprovativo',
          'É a única forma de consultar o resultado depois. Não existe e-mail de lembrete quando o código se perde.',
        ],
        es: [
          'Guardar el código de registro del comprobante',
          'Es la única manera de consultar el resultado después. No hay correo de recordatorio si se pierde el código.',
        ],
      },
      {
        en: [
          'Allow several working days for processing',
          'Longer around Tết and other national holidays. Non-refundable flights bought before approval are a gamble.',
        ],
        pt: [
          'Prever vários dias úteis de análise',
          'Mais tempo perto do Tết e de outros feriados nacionais. Passagens não reembolsáveis compradas antes da aprovação são uma aposta.',
        ],
        es: [
          'Prever varios días hábiles de tramitación',
          'Más tiempo cerca del Tết y de otros feriados nacionales. Los vuelos no reembolsables comprados antes de la aprobación son una apuesta.',
        ],
      },
      {
        en: [
          'Print the approved e-visa on paper',
          'Check-in staff routinely refuse a phone screen, and the printout is collected at the border gate.',
        ],
        pt: [
          'Imprimir o e-visa aprovado em papel',
          'O pessoal do check-in costuma recusar a tela do celular, e a impressão é recolhida no posto de fronteira.',
        ],
        es: [
          'Imprimir el e-visado aprobado en papel',
          'El personal de facturación suele rechazar la pantalla del móvil, y la impresión se recoge en el puesto fronterizo.',
        ],
      },
      {
        en: [
          'Consider the approval letter route for visa on arrival',
          'A sponsor obtains a pre-approval letter and the visa is stamped at the airport. It only works at international airports, never at a land crossing.',
        ],
        pt: [
          'Considerar a rota da carta de aprovação para visto na chegada',
          'Um patrocinador obtém a carta prévia e o visto é carimbado no aeroporto. Só funciona em aeroportos internacionais, nunca em fronteira terrestre.',
        ],
        es: [
          'Considerar la vía de la carta de aprobación para visado a la llegada',
          'Un patrocinador obtiene la carta previa y el visado se sella en el aeropuerto. Solo sirve en aeropuertos internacionales, nunca en un paso terrestre.',
        ],
        priority: 3,
        required: false,
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints and photograph at the border gate',
          'Taken on entry. The e-visa involves no appointment or interview beforehand.',
        ],
        pt: [
          'Impressões digitais e fotografia no posto de fronteira',
          'Recolhidas na entrada. O e-visa não envolve nenhuma marcação ou entrevista antes.',
        ],
        es: [
          'Huellas y fotografía en el puesto fronterizo',
          'Se toman a la entrada. El e-visado no implica ninguna cita ni entrevista previa.',
        ],
      },
      {
        en: [
          'Travel health insurance',
          'Visitors have no public cover and international hospitals ask for a payment guarantee before treating.',
        ],
        pt: [
          'Seguro de saúde de viagem',
          'Visitantes não têm cobertura pública e os hospitais internacionais pedem garantia de pagamento antes de atender.',
        ],
        es: [
          'Seguro de salud de viaje',
          'Los visitantes no tienen cobertura pública y los hospitales internacionales piden garantía de pago antes de atender.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Read the stamped date, not the visa validity',
          'The stamp fixes how long you may stay. Overstaying is fined for each day and can bar you from returning.',
        ],
        pt: [
          'Ler a data carimbada, não a validade do visto',
          'O carimbo fixa quanto tempo você pode ficar. O excesso de permanência é multado por dia e pode impedir seu retorno.',
        ],
        es: [
          'Leer la fecha sellada, no la validez del visado',
          'El sello fija cuánto tiempo puede quedarse. Exceder la estancia se multa por día y puede impedirle volver.',
        ],
      },
      {
        en: [
          'Make sure your stay is registered with the ward police',
          'Hotels file it for you automatically. If you rent a room or stay with friends, someone has to take your passport to the local station, and it repeats at every new address.',
        ],
        pt: [
          'Garantir que sua estada seja registada na polícia do bairro',
          'Os hotéis fazem isso por você automaticamente. Se você aluga um quarto ou fica com amigos, alguém precisa levar seu passaporte ao posto local, e isso se repete a cada novo endereço.',
        ],
        es: [
          'Asegurarse de que su estancia quede registrada en la policía del barrio',
          'Los hoteles lo tramitan solos. Si alquila una habitación o se queda con amigos, alguien debe llevar su pasaporte a la comisaría local, y se repite en cada nueva dirección.',
        ],
      },
      {
        en: [
          'Do no paid work on this status',
          'It covers tourism and visiting people only. Working remotely for a Vietnamese client on a tourist entry is what gets people fined and deported.',
        ],
        pt: [
          'Não exercer trabalho remunerado com este status',
          'Ele cobre apenas turismo e visitas. Trabalhar remotamente para um cliente vietnamita numa entrada de turismo é o que leva a multa e deportação.',
        ],
        es: [
          'No realizar trabajo remunerado con este estatus',
          'Solo cubre turismo y visitas. Trabajar en remoto para un cliente vietnamita con una entrada de turismo es lo que acaba en multa y expulsión.',
        ],
      },
      {
        en: [
          'Plan the exit instead of counting on an extension',
          'Extending from inside the country is discretionary, usually goes through an agency, and is often refused. Book the departure before you need it.',
        ],
        pt: [
          'Planejar a saída em vez de contar com prorrogação',
          'Prorrogar de dentro do país é discricionário, costuma passar por agência e é negado com frequência. Reserve a saída antes de precisar dela.',
        ],
        es: [
          'Planificar la salida en vez de contar con una prórroga',
          'Prorrogar desde dentro del país es discrecional, suele pasar por una agencia y se deniega a menudo. Reserve la salida antes de necesitarla.',
        ],
        priority: 2,
      },
    ],
  },

  'Business Visa (DN)': {
    core_documents: [
      {
        en: [
          'Passport with at least six months left and blank pages',
          'The DN visa and its temporary residence stamp both take space in the passport.',
        ],
        pt: [
          'Passaporte com pelo menos seis meses restantes e páginas em branco',
          'O visto DN e o carimbo de residência temporária ocupam espaço no passaporte.',
        ],
        es: [
          'Pasaporte con al menos seis meses restantes y páginas en blanco',
          'El visado DN y su sello de residencia temporal ocupan espacio en el pasaporte.',
        ],
      },
      {
        en: [
          'A company registered in Vietnam willing to sponsor you',
          'There is no DN without a local entity behind it. Buying a sponsorship from an agency with no real link to your visit is what gets the visa cancelled later.',
        ],
        pt: [
          'Uma empresa registada no Vietnã disposta a patrociná-lo',
          'Não existe DN sem uma entidade local por trás. Comprar patrocínio de uma agência sem vínculo real com a visita é o que faz o visto ser cancelado depois.',
        ],
        es: [
          'Una empresa registrada en Vietnam dispuesta a patrocinarle',
          'No hay DN sin una entidad local detrás. Comprar el patrocinio a una agencia sin vínculo real con su visita es lo que hace que luego anulen el visado.',
        ],
      },
      {
        en: [
          'Entry approval obtained by the sponsor from immigration',
          'The sponsor files in Vietnam and receives the approval before you do anything at an embassy. This stage is where the decision is actually made.',
        ],
        pt: [
          'Aprovação de entrada obtida pelo patrocinador junto à imigração',
          'O patrocinador protocola no Vietnã e recebe a aprovação antes de você fazer qualquer coisa numa embaixada. É nessa etapa que a decisão realmente acontece.',
        ],
        es: [
          'Aprobación de entrada obtenida por el patrocinador ante inmigración',
          'El patrocinador presenta el trámite en Vietnam y recibe la aprobación antes de que usted haga nada en una embajada. En esa etapa se toma la decisión de verdad.',
        ],
      },
      {
        en: [
          'Invitation letter setting out the purpose and the dates',
          'Meetings, an audit, equipment commissioning. What it says must match what you tell the officer at the gate.',
        ],
        pt: [
          'Carta-convite indicando a finalidade e as datas',
          'Reuniões, auditoria, instalação de equipamento. O que ela diz precisa bater com o que você disser ao agente no posto.',
        ],
        es: [
          'Carta de invitación que indique la finalidad y las fechas',
          'Reuniones, una auditoría, la puesta en marcha de un equipo. Lo que dice debe coincidir con lo que le cuente al agente en el puesto.',
        ],
      },
      {
        en: [
          'Sponsor’s business licence and company seal',
          'Attached to the sponsor’s filing. A company whose licence is suspended cannot sponsor anyone.',
        ],
        pt: [
          'Licença de funcionamento e selo da empresa patrocinadora',
          'Anexados ao protocolo do patrocinador. Uma empresa com licença suspensa não pode patrocinar ninguém.',
        ],
        es: [
          'Licencia de actividad y sello de la empresa patrocinadora',
          'Se adjuntan al trámite del patrocinador. Una empresa con la licencia suspendida no puede patrocinar a nadie.',
        ],
      },
      {
        en: [
          'Immigration forms completed by the sponsoring company',
          'The standard NA forms are signed and stamped by the company, not by you. Sending them yourself gets the file returned.',
        ],
        pt: [
          'Formulários de imigração preenchidos pela empresa patrocinadora',
          'Os formulários NA padrão são assinados e carimbados pela empresa, não por você. Enviá-los por conta própria faz o processo voltar.',
        ],
        es: [
          'Formularios de inmigración cumplimentados por la empresa patrocinadora',
          'Los formularios NA estándar los firma y sella la empresa, no usted. Enviarlos por su cuenta hace que devuelvan el expediente.',
        ],
      },
      {
        en: [
          'Passport photographs to embassy specification',
          'Plain background and recent. Bring spares; the stamping counter often keeps one.',
        ],
        pt: [
          'Fotografias de passaporte no padrão da embaixada',
          'Fundo liso e recentes. Leve extras; o guichê de carimbo costuma ficar com uma.',
        ],
        es: [
          'Fotografías de pasaporte según el estándar de la embajada',
          'Fondo liso y recientes. Lleve de sobra; la ventanilla de sellado suele quedarse con una.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Written confirmation of who covers your costs',
          'Usually the inviting company. Splitting responsibility vaguely between you and the sponsor invites questions at the gate.',
        ],
        pt: [
          'Confirmação escrita de quem custeia sua estada',
          'Em geral a empresa que convida. Dividir a responsabilidade de forma vaga entre você e o patrocinador gera perguntas no posto.',
        ],
        es: [
          'Confirmación escrita de quién cubre sus gastos',
          'Normalmente la empresa que invita. Repartir la responsabilidad de forma vaga entre usted y el patrocinador genera preguntas en el puesto.',
        ],
      },
      {
        en: [
          'Means of payment on arrival',
          'The stamping counter at the airport works in cash and rarely takes cards. Arriving with only a card is a real problem there.',
        ],
        pt: [
          'Meio de pagamento na chegada',
          'O guichê de carimbo no aeroporto trabalha com dinheiro e raramente aceita cartão. Chegar só com cartão é um problema concreto ali.',
        ],
        es: [
          'Medio de pago a la llegada',
          'La ventanilla de sellado del aeropuerto trabaja en efectivo y rara vez acepta tarjeta. Llegar solo con tarjeta es un problema real allí.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Decide where the visa will be collected',
          'The approval names one embassy or one airport. Turning up somewhere else means the sponsor has to file again.',
        ],
        pt: [
          'Definir onde o visto será retirado',
          'A aprovação indica uma embaixada ou um aeroporto. Aparecer em outro lugar obriga o patrocinador a protocolar de novo.',
        ],
        es: [
          'Definir dónde se recogerá el visado',
          'La aprobación designa una embajada o un aeropuerto. Presentarse en otro sitio obliga al patrocinador a tramitarlo otra vez.',
        ],
      },
      {
        en: [
          'Sponsor pays the entry approval charge',
          'Billed in Vietnam before the letter is released. Agencies add a service margin on top of the official amount.',
        ],
        pt: [
          'Patrocinador paga o encargo da aprovação de entrada',
          'Cobrado no Vietnã antes de a carta ser liberada. Agências acrescentam uma margem de serviço sobre o valor oficial.',
        ],
        es: [
          'El patrocinador paga el cargo de la aprobación de entrada',
          'Se cobra en Vietnam antes de liberar la carta. Las agencias añaden un margen de servicio sobre el importe oficial.',
        ],
      },
      {
        en: [
          'Pay the stamping fee at the counter',
          'It varies with the validity and the number of entries, so check the current schedule and bring the exact amount.',
        ],
        pt: [
          'Pagar a taxa de carimbo no guichê',
          'Ela varia conforme a validade e o número de entradas, então confira a tabela vigente e leve o valor exato.',
        ],
        es: [
          'Pagar la tasa de sellado en la ventanilla',
          'Varía según la validez y el número de entradas, así que consulte la tabla vigente y lleve el importe exacto.',
        ],
      },
      {
        en: [
          'Allow time for the approval to be issued',
          'It usually takes working days rather than hours, and slows around national holidays. Book flexible flights.',
        ],
        pt: [
          'Prever tempo até a emissão da aprovação',
          'Costuma levar dias úteis, não horas, e fica mais lenta perto de feriados nacionais. Reserve voos flexíveis.',
        ],
        es: [
          'Prever tiempo hasta la emisión de la aprobación',
          'Suele llevar días hábiles, no horas, y se ralentiza cerca de los feriados nacionales. Reserve vuelos flexibles.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Photograph and fingerprints at the stamping counter',
          'Collected when the visa is placed in the passport, before you reach the immigration line proper.',
        ],
        pt: [
          'Fotografia e impressões digitais no guichê de carimbo',
          'Recolhidas quando o visto é colado no passaporte, antes de você chegar à fila da imigração propriamente dita.',
        ],
        es: [
          'Fotografía y huellas en la ventanilla de sellado',
          'Se toman cuando el visado se pega en el pasaporte, antes de llegar a la fila de inmigración propiamente dicha.',
        ],
      },
      {
        en: [
          'Business travel insurance',
          'Not demanded at the counter, but company travel policies and the sponsor often require it in writing.',
        ],
        pt: [
          'Seguro de viagem de negócios',
          'Não é exigido no guichê, mas políticas de viagem corporativas e o patrocinador costumam pedi-lo por escrito.',
        ],
        es: [
          'Seguro de viaje de negocios',
          'No se exige en la ventanilla, pero las políticas de viaje corporativas y el patrocinador suelen pedirlo por escrito.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Keep within what DN allows',
          'Meetings, negotiations, supervision and training are fine. Being on a local payroll is not, and that needs a work permit instead.',
        ],
        pt: [
          'Manter-se dentro do que o DN permite',
          'Reuniões, negociações, supervisão e treinamento estão ok. Estar na folha de pagamento local não está, e isso exige um work permit.',
        ],
        es: [
          'Mantenerse dentro de lo que permite el DN',
          'Reuniones, negociaciones, supervisión y formación están bien. Estar en la nómina local no lo está, y eso exige un permiso de trabajo.',
        ],
      },
      {
        en: [
          'Register the address where you are staying with the local police',
          'The hotel handles it; a company apartment or a rented flat does not. Someone must present your passport at the ward station, and it must be redone after each trip out of the country.',
        ],
        pt: [
          'Registar na polícia local o endereço onde você está',
          'O hotel resolve; um apartamento da empresa ou alugado não. Alguém precisa apresentar seu passaporte no posto do bairro, e isso se refaz a cada viagem para fora do país.',
        ],
        es: [
          'Registrar ante la policía local la dirección donde se aloja',
          'El hotel lo resuelve; un piso de empresa o alquilado no. Alguien debe presentar su pasaporte en la comisaría del barrio, y hay que repetirlo tras cada viaje fuera del país.',
        ],
      },
      {
        en: [
          'Watch the temporary residence stamp date',
          'It can be shorter than the visa validity. The stamp is what an officer checks, and the fine runs from the day it expires.',
        ],
        pt: [
          'Acompanhar a data do carimbo de residência temporária',
          'Ela pode ser menor que a validade do visto. É o carimbo que o agente confere, e a multa corre a partir do dia em que ele vence.',
        ],
        es: [
          'Vigilar la fecha del sello de residencia temporal',
          'Puede ser más corta que la validez del visado. Es el sello lo que revisa el agente, y la multa corre desde el día en que caduca.',
        ],
      },
      {
        en: [
          'Ask the sponsor to start any extension early',
          'Extensions and conversions are filed by the company inside Vietnam and take weeks, so starting in the final days rarely works.',
        ],
        pt: [
          'Pedir ao patrocinador que inicie qualquer prorrogação cedo',
          'Prorrogações e conversões são protocoladas pela empresa dentro do Vietnã e levam semanas, então começar nos últimos dias quase nunca dá certo.',
        ],
        es: [
          'Pedir al patrocinador que inicie cualquier prórroga con antelación',
          'Las prórrogas y conversiones las presenta la empresa dentro de Vietnam y llevan semanas, así que empezar en los últimos días casi nunca funciona.',
        ],
      },
      {
        en: [
          'Tell the sponsor when your plans change',
          'The sponsor remains answerable for you while the visa is live, including for where you are staying and when you leave.',
        ],
        pt: [
          'Avisar o patrocinador quando seus planos mudarem',
          'O patrocinador continua respondendo por você enquanto o visto estiver ativo, inclusive por onde você está hospedado e quando sai.',
        ],
        es: [
          'Avisar al patrocinador cuando cambien sus planes',
          'El patrocinador sigue respondiendo por usted mientras el visado esté activo, incluido dónde se aloja y cuándo se marcha.',
        ],
        priority: 2,
      },
    ],
  },

  'Work Permit and Temporary Residence Card': {
    core_documents: [
      {
        en: [
          'Passport with as much validity as possible',
          'The residence card can never outlast the passport, so a passport with a year left caps the card at a year regardless of your contract.',
        ],
        pt: [
          'Passaporte com o máximo de validade possível',
          'O cartão de residência nunca ultrapassa o passaporte, então um passaporte com um ano restante limita o cartão a um ano, qualquer que seja seu contrato.',
        ],
        es: [
          'Pasaporte con la mayor validez posible',
          'La tarjeta de residencia nunca supera al pasaporte, así que un pasaporte con un año restante limita la tarjeta a un año, sea cual sea su contrato.',
        ],
      },
      {
        en: [
          'Employer approval to use foreign labour for the position',
          'Before anything else, the employer gets the provincial authority to accept that the role cannot be filled locally. This precedes the permit by weeks and is the step companies forget to start.',
        ],
        pt: [
          'Aprovação do uso de mão de obra estrangeira para o cargo',
          'Antes de tudo, o empregador obtém da autoridade provincial o aceite de que a vaga não pode ser preenchida localmente. Isso antecede o permit em semanas e é a etapa que as empresas esquecem de iniciar.',
        ],
        es: [
          'Aprobación del uso de mano de obra extranjera para el puesto',
          'Antes que nada, el empleador consigue que la autoridad provincial acepte que la vacante no puede cubrirse localmente. Esto precede al permiso en semanas y es el paso que las empresas olvidan iniciar.',
        ],
      },
      {
        en: [
          'Criminal record certificate',
          'From your home country if you have been in Vietnam less than six months, otherwise the Vietnamese one. It is only accepted while recent, so requesting it too early wastes it.',
        ],
        pt: [
          'Certidão de antecedentes criminais',
          'Do seu país se você está no Vietnã há menos de seis meses, senão a vietnamita. Só é aceita enquanto recente, então pedi-la cedo demais a desperdiça.',
        ],
        es: [
          'Certificado de antecedentes penales',
          'De su país si lleva menos de seis meses en Vietnam, si no el vietnamita. Solo se acepta mientras es reciente, así que pedirlo demasiado pronto lo desperdicia.',
        ],
      },
      {
        en: [
          'Consular legalisation of every foreign document',
          'Legalisation at the Vietnamese mission plus a certified Vietnamese translation. A local notary stamp alone is not enough and is the most common cause of rework.',
        ],
        pt: [
          'Legalização consular de todo documento estrangeiro',
          'Legalização na missão vietnamita mais tradução juramentada para o vietnamita. Só o reconhecimento de firma local não basta e é a causa mais comum de retrabalho.',
        ],
        es: [
          'Legalización consular de cada documento extranjero',
          'Legalización en la misión vietnamita más traducción jurada al vietnamita. El sello de un notario local por sí solo no basta y es la causa más común de rehacer todo.',
        ],
      },
      {
        en: [
          'Work permit application filed by the employer',
          'The company files with the provincial labour department, always before the residence card. The order is fixed: no permit, no card.',
        ],
        pt: [
          'Pedido de work permit protocolado pelo empregador',
          'A empresa protocola no departamento provincial de trabalho, sempre antes do cartão de residência. A ordem é fixa: sem permit, não há cartão.',
        ],
        es: [
          'Solicitud de permiso de trabajo presentada por el empleador',
          'La empresa la presenta en el departamento provincial de trabajo, siempre antes de la tarjeta de residencia. El orden es fijo: sin permiso no hay tarjeta.',
        ],
      },
      {
        en: [
          'A sponsored visa to enter the country in the first place',
          'You arrive on an employer-sponsored entry, not as a tourist. Converting from a tourist entry generally means leaving and coming back in.',
        ],
        pt: [
          'Um visto patrocinado para entrar no país antes de tudo',
          'Você chega com uma entrada patrocinada pelo empregador, não como turista. Converter a partir de uma entrada de turismo em geral obriga a sair e voltar.',
        ],
        es: [
          'Un visado patrocinado para entrar al país en primer lugar',
          'Usted llega con una entrada patrocinada por el empleador, no como turista. Convertir desde una entrada de turismo suele obligar a salir y volver a entrar.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Degree certificate matching the role',
          'The qualification has to line up with the job title on the contract. A degree in an unrelated field forces the experience route instead.',
        ],
        pt: [
          'Diploma compatível com a função',
          'A formação precisa corresponder ao cargo indicado no contrato. Um diploma de área não relacionada obriga a usar a rota da experiência.',
        ],
        es: [
          'Título compatible con el puesto',
          'La titulación debe corresponderse con el cargo del contrato. Un título de un área no relacionada obliga a usar la vía de la experiencia.',
        ],
      },
      {
        en: [
          'Letters proving at least three years of relevant experience',
          'Signed by former employers, legalised, and stating a job title that matches. Vague letters saying only the dates are rejected.',
        ],
        pt: [
          'Cartas comprovando ao menos três anos de experiência na área',
          'Assinadas por empregadores anteriores, legalizadas e indicando um cargo compatível. Cartas vagas que só citam as datas são recusadas.',
        ],
        es: [
          'Cartas que acrediten al menos tres años de experiencia afín',
          'Firmadas por empleadores anteriores, legalizadas e indicando un cargo que coincida. Las cartas vagas que solo citan fechas se rechazan.',
        ],
      },
      {
        en: [
          'Sector certificate where the role demands one',
          'Teaching posts in particular are assessed on a recognised teaching qualification as much as on the degree.',
        ],
        pt: [
          'Certificado setorial quando a função exigir',
          'Vagas de ensino, em especial, são avaliadas por uma qualificação docente reconhecida tanto quanto pelo diploma.',
        ],
        es: [
          'Certificado sectorial cuando el puesto lo exija',
          'Los puestos docentes, en particular, se evalúan por una cualificación de enseñanza reconocida tanto como por el título.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Labour contract stating salary, title and term',
          'The contract length drives how long the permit can run, up to the statutory maximum. Signing a longer contract does not buy a longer permit.',
        ],
        pt: [
          'Contrato de trabalho com salário, cargo e prazo',
          'A duração do contrato determina até quando o permit pode valer, respeitado o máximo legal. Assinar contrato mais longo não compra permit mais longo.',
        ],
        es: [
          'Contrato laboral con salario, cargo y plazo',
          'La duración del contrato determina hasta cuándo puede regir el permiso, dentro del máximo legal. Firmar un contrato más largo no compra un permiso más largo.',
        ],
      },
      {
        en: [
          'Enrolment in compulsory social and health insurance',
          'Foreign employees are covered by the mandatory schemes. Confirm the contribution rates in force, as they have been phased in over time.',
        ],
        pt: [
          'Inscrição nos seguros social e de saúde obrigatórios',
          'Empregados estrangeiros são cobertos pelos regimes obrigatórios. Confirme as alíquotas de contribuição vigentes, pois foram sendo escalonadas ao longo do tempo.',
        ],
        es: [
          'Alta en los seguros social y de salud obligatorios',
          'Los empleados extranjeros están cubiertos por los regímenes obligatorios. Confirme los tipos de cotización vigentes, ya que se han ido implantando por etapas.',
        ],
      },
      {
        en: [
          'Personal tax code registered with the tax office',
          'Crossing the residency threshold in days present changes how your income is taxed, so register early and track your days.',
        ],
        pt: [
          'Código fiscal pessoal registado na receita',
          'Cruzar o limiar de residência em dias de permanência muda a forma de tributar sua renda, então registe cedo e acompanhe seus dias.',
        ],
        es: [
          'Código fiscal personal registrado en la agencia tributaria',
          'Cruzar el umbral de residencia en días de permanencia cambia cómo se grava su renta, así que regístrese pronto y lleve la cuenta de sus días.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Pay the work permit charge to the provincial department',
          'It is set province by province, so the figure quoted for another city will not match. Confirm the local one.',
        ],
        pt: [
          'Pagar o encargo do work permit ao departamento provincial',
          'Ele é fixado província a província, então o valor citado para outra cidade não vai bater. Confirme o local.',
        ],
        es: [
          'Pagar el cargo del permiso de trabajo al departamento provincial',
          'Se fija provincia por provincia, así que la cifra que citan para otra ciudad no coincidirá. Confirme la local.',
        ],
      },
      {
        en: [
          'Apply for the residence card once the permit is issued',
          'The card application quotes the permit number. Filing before the permit exists is simply rejected, not queued.',
        ],
        pt: [
          'Pedir o cartão de residência depois que o permit for emitido',
          'O pedido do cartão cita o número do permit. Protocolar antes de o permit existir é recusado, não fica na fila.',
        ],
        es: [
          'Solicitar la tarjeta de residencia una vez emitido el permiso',
          'La solicitud de la tarjeta cita el número del permiso. Presentarla antes de que exista el permiso se rechaza, no queda en cola.',
        ],
      },
      {
        en: [
          'Pay the card fee for the validity band you qualify for',
          'The charge steps up with the length granted, and the length follows the permit. Check the schedule in force.',
        ],
        pt: [
          'Pagar a taxa do cartão na faixa de validade a que você se qualifica',
          'O valor sobe conforme o prazo concedido, e o prazo segue o permit. Consulte a tabela vigente.',
        ],
        es: [
          'Pagar la tasa de la tarjeta según la franja de validez que le corresponde',
          'El importe sube con el plazo concedido, y el plazo sigue al permiso. Consulte la tabla vigente.',
        ],
      },
      {
        en: [
          'Budget for the whole chain of stages',
          'Position approval, then permit, then card. Each takes weeks, none can be run in parallel, and a start date agreed without that runway slips.',
        ],
        pt: [
          'Reservar tempo para toda a cadeia de etapas',
          'Aprovação do cargo, depois permit, depois cartão. Cada uma leva semanas, nenhuma corre em paralelo, e uma data de início combinada sem essa folga escorrega.',
        ],
        es: [
          'Reservar tiempo para toda la cadena de etapas',
          'Aprobación del puesto, luego permiso, luego tarjeta. Cada una lleva semanas, ninguna corre en paralelo, y una fecha de inicio pactada sin ese margen se retrasa.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical certificate from a hospital licensed to issue one',
          'Only facilities on the approved list count. A certificate from your doctor abroad or a random clinic is thrown out, and it expires within months.',
        ],
        pt: [
          'Atestado médico de hospital licenciado para emiti-lo',
          'Só valem unidades da lista aprovada. Um atestado do seu médico no exterior ou de uma clínica qualquer é descartado, e ele vence em poucos meses.',
        ],
        es: [
          'Certificado médico de un hospital autorizado para emitirlo',
          'Solo valen los centros de la lista aprobada. Un certificado de su médico en el extranjero o de una clínica cualquiera se descarta, y caduca en pocos meses.',
        ],
      },
      {
        en: [
          'Photograph and fingerprints for the residence card',
          'Taken at the immigration office when the card application is lodged, with the specified photo size.',
        ],
        pt: [
          'Fotografia e impressões digitais para o cartão de residência',
          'Recolhidas no escritório de imigração no protocolo do pedido do cartão, com a foto no tamanho especificado.',
        ],
        es: [
          'Fotografía y huellas para la tarjeta de residencia',
          'Se toman en la oficina de inmigración al presentar la solicitud de la tarjeta, con la foto en el tamaño especificado.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Complete the residence registration at the ward police station',
          'This is the duty foreigners most often miss. Renting rather than staying in a hotel means going yourself with the passport and the lease, and doing it again after every move and every re-entry.',
        ],
        pt: [
          'Concluir o registo de residência no posto policial do bairro',
          'É a obrigação que os estrangeiros mais deixam passar. Alugar em vez de ficar em hotel significa ir pessoalmente com passaporte e contrato, e repetir a cada mudança e a cada reentrada.',
        ],
        es: [
          'Completar el registro de residencia en la comisaría del barrio',
          'Es la obligación que más se les escapa a los extranjeros. Alquilar en vez de alojarse en un hotel implica ir en persona con el pasaporte y el contrato, y repetirlo tras cada mudanza y cada reentrada.',
        ],
      },
      {
        en: [
          'Carry the card and use it instead of a visa to re-enter',
          'The card replaces the entry visa while it is valid, which is its main practical benefit over repeated sponsored visas.',
        ],
        pt: [
          'Andar com o cartão e usá-lo no lugar de visto para reentrar',
          'O cartão substitui o visto de entrada enquanto for válido, e essa é sua principal vantagem prática sobre vistos patrocinados repetidos.',
        ],
        es: [
          'Llevar la tarjeta y usarla en lugar del visado para reentrar',
          'La tarjeta sustituye al visado de entrada mientras esté vigente, y esa es su principal ventaja práctica frente a visados patrocinados repetidos.',
        ],
      },
      {
        en: [
          'Treat a change of employer as a new application',
          'The permit is tied to one company and one position. Moving jobs restarts the chain; it is not transferred, and the card falls with the permit.',
        ],
        pt: [
          'Tratar a troca de empregador como um novo pedido',
          'O permit está atrelado a uma empresa e a um cargo. Mudar de emprego recomeça a cadeia; ele não é transferido, e o cartão cai junto com o permit.',
        ],
        es: [
          'Tratar el cambio de empleador como una solicitud nueva',
          'El permiso está atado a una empresa y a un puesto. Cambiar de trabajo reinicia la cadena; no se transfiere, y la tarjeta cae junto con el permiso.',
        ],
      },
      {
        en: [
          'Start the renewal months ahead of expiry',
          'Renewal repeats the medical and much of the paperwork. Letting the permit lapse means leaving the country and beginning again from the position approval.',
        ],
        pt: [
          'Iniciar a renovação meses antes do vencimento',
          'A renovação repete o exame médico e boa parte da papelada. Deixar o permit caducar obriga a sair do país e recomeçar desde a aprovação do cargo.',
        ],
        es: [
          'Iniciar la renovación meses antes del vencimiento',
          'La renovación repite el examen médico y buena parte del papeleo. Dejar caducar el permiso obliga a salir del país y empezar de nuevo desde la aprobación del puesto.',
        ],
      },
    ],
  },

  'Investor Visa (DT)': {
    core_documents: [
      {
        en: [
          'Passport covering the investor term you are seeking',
          'DT terms run in bands, and a short passport quietly caps whichever band your capital would otherwise earn.',
        ],
        pt: [
          'Passaporte que cubra o prazo de investidor pretendido',
          'Os prazos do DT vêm em faixas, e um passaporte curto limita silenciosamente a faixa que seu capital daria.',
        ],
        es: [
          'Pasaporte que cubra el plazo de inversor pretendido',
          'Los plazos del DT van por franjas, y un pasaporte corto limita en silencio la franja que su capital daría.',
        ],
      },
      {
        en: [
          'Investment registration certificate',
          'Issued by the provincial planning authority. Immigration only looks at your file once this exists, so the licensing work comes first.',
        ],
        pt: [
          'Certificado de registo de investimento',
          'Emitido pela autoridade provincial de planeamento. A imigração só olha seu processo depois que ele existe, então o licenciamento vem primeiro.',
        ],
        es: [
          'Certificado de registro de inversión',
          'Lo emite la autoridad provincial de planificación. Inmigración solo mira su expediente cuando existe, así que el licenciamiento va primero.',
        ],
      },
      {
        en: [
          'Enterprise registration certificate naming you',
          'Your name has to appear as owner, founding member or legal representative. Holding shares through a local nominee does not produce a DT.',
        ],
        pt: [
          'Certificado de registo da empresa com seu nome',
          'Seu nome precisa constar como sócio, fundador ou representante legal. Ter quotas por meio de um laranja local não gera um DT.',
        ],
        es: [
          'Certificado de registro de la empresa con su nombre',
          'Su nombre debe figurar como socio, fundador o representante legal. Tener participaciones a través de un testaferro local no genera un DT.',
        ],
      },
      {
        en: [
          'Evidence the capital was actually paid in',
          'The certificate sets a deadline for the contribution. Missing it can unwind the company, and the visa built on it goes with it.',
        ],
        pt: [
          'Comprovação de que o capital foi realmente integralizado',
          'O certificado fixa um prazo para o aporte. Perdê-lo pode desfazer a empresa, e o visto construído sobre ela vai junto.',
        ],
        es: [
          'Prueba de que el capital se desembolsó realmente',
          'El certificado fija un plazo para la aportación. Incumplirlo puede deshacer la empresa, y el visado construido sobre ella se va con ella.',
        ],
      },
      {
        en: [
          'Lease for a real registered office',
          'The address is verified and has to suit the licensed activity. Virtual office addresses are frequently turned down at registration.',
        ],
        pt: [
          'Contrato de arrendamento de uma sede real',
          'O endereço é verificado e precisa ser adequado à atividade licenciada. Endereços de escritório virtual são recusados com frequência no registo.',
        ],
        es: [
          'Contrato de arrendamiento de una sede real',
          'La dirección se verifica y debe ser adecuada a la actividad licenciada. Las direcciones de oficina virtual se rechazan a menudo en el registro.',
        ],
      },
      {
        en: [
          'Entry approval requested by your own company',
          'Once incorporated, the company sponsors you the same way any employer would. Until then there is nobody in Vietnam able to file for you.',
        ],
        pt: [
          'Aprovação de entrada solicitada pela sua própria empresa',
          'Uma vez constituída, a empresa patrocina você como faria qualquer empregador. Até lá, não há ninguém no Vietnã que possa protocolar por você.',
        ],
        es: [
          'Aprobación de entrada solicitada por su propia empresa',
          'Una vez constituida, la empresa le patrocina igual que lo haría cualquier empleador. Hasta entonces no hay nadie en Vietnam que pueda presentarlo por usted.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Capital contribution sized to the band you want',
          'The DT sub-classes are separated by capital thresholds that have been revised more than once. Work from the current thresholds, not from an old guide.',
        ],
        pt: [
          'Aporte de capital dimensionado para a faixa desejada',
          'As subclasses do DT são separadas por limiares de capital que já foram revistos mais de uma vez. Trabalhe com os limiares atuais, não com um guia antigo.',
        ],
        es: [
          'Aportación de capital dimensionada a la franja deseada',
          'Las subclases del DT se separan por umbrales de capital que se han revisado más de una vez. Trabaje con los umbrales actuales, no con una guía antigua.',
        ],
      },
      {
        en: [
          'Direct investment capital account at a licensed bank',
          'The money must arrive through that dedicated account. Transfers into a personal account do not count as contributed capital and are painful to unwind.',
        ],
        pt: [
          'Conta de capital de investimento direto num banco licenciado',
          'O dinheiro precisa entrar por essa conta específica. Transferências para conta pessoal não contam como capital integralizado e são penosas de desfazer.',
        ],
        es: [
          'Cuenta de capital de inversión directa en un banco licenciado',
          'El dinero debe entrar por esa cuenta específica. Las transferencias a una cuenta personal no cuentan como capital aportado y son penosas de deshacer.',
        ],
      },
      {
        en: [
          'Documented origin of the funds',
          'Bank confirmations or audited statements from abroad, legalised. Unexplained sums stall the registration rather than the visa.',
        ],
        pt: [
          'Origem documentada dos recursos',
          'Declarações bancárias ou demonstrações auditadas do exterior, legalizadas. Valores sem explicação travam o registo, não o visto.',
        ],
        es: [
          'Origen documentado de los fondos',
          'Confirmaciones bancarias o estados auditados del extranjero, legalizados. Los importes sin explicar atascan el registro, no el visado.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File the licensing application with the provincial authority',
          'This is the long stage and the fees depend on the sector. Some activities are conditional and add an extra approval on top.',
        ],
        pt: [
          'Protocolar o pedido de licenciamento na autoridade provincial',
          'Esta é a etapa longa e as taxas dependem do setor. Algumas atividades são condicionadas e acrescentam uma aprovação extra.',
        ],
        es: [
          'Presentar la solicitud de licencia ante la autoridad provincial',
          'Esta es la etapa larga y las tasas dependen del sector. Algunas actividades son condicionadas y añaden una aprobación extra.',
        ],
      },
      {
        en: [
          'Pay the visa issuance charge for the term granted',
          'It rises with the length and the number of entries. Confirm the current schedule instead of budgeting from an old quote.',
        ],
        pt: [
          'Pagar o encargo de emissão do visto pelo prazo concedido',
          'Ele sobe conforme a duração e o número de entradas. Confirme a tabela vigente em vez de orçar por uma cotação antiga.',
        ],
        es: [
          'Pagar el cargo de emisión del visado por el plazo concedido',
          'Sube según la duración y el número de entradas. Confirme la tabla vigente en vez de presupuestar con una cotización antigua.',
        ],
      },
      {
        en: [
          'Apply for an investor residence card if your band allows it',
          'The lower capital bands get a visa but no card. Knowing which side of the line you are on changes how often you must renew.',
        ],
        pt: [
          'Pedir o cartão de residência de investidor se sua faixa permitir',
          'As faixas de capital mais baixas dão visto, mas não cartão. Saber de que lado da linha você está muda a frequência com que precisa renovar.',
        ],
        es: [
          'Solicitar la tarjeta de residencia de inversor si su franja lo permite',
          'Las franjas de capital más bajas dan visado pero no tarjeta. Saber de qué lado de la línea está cambia con qué frecuencia debe renovar.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Sequence the licensing before the immigration filings',
          'Company registration comes first, sponsorship second, card last. Trying to shortcut with a tourist entry while the licence is pending wastes both.',
        ],
        pt: [
          'Sequenciar o licenciamento antes dos protocolos de imigração',
          'Registo da empresa primeiro, patrocínio depois, cartão por último. Tentar atalhar com uma entrada de turismo enquanto a licença corre desperdiça os dois.',
        ],
        es: [
          'Secuenciar el licenciamiento antes de los trámites de inmigración',
          'Registro de la empresa primero, patrocinio después, tarjeta al final. Intentar atajar con una entrada de turismo mientras la licencia se tramita desperdicia ambas cosas.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical certificate when the card is requested',
          'Required for the residence card, from a hospital on the approved list, and only accepted while recent.',
        ],
        pt: [
          'Atestado médico quando o cartão for solicitado',
          'Exigido para o cartão de residência, de um hospital da lista aprovada, e só aceito enquanto recente.',
        ],
        es: [
          'Certificado médico cuando se solicita la tarjeta',
          'Se exige para la tarjeta de residencia, de un hospital de la lista aprobada, y solo se acepta mientras es reciente.',
        ],
        required: false,
      },
      {
        en: [
          'Photograph and fingerprints at the immigration office',
          'Collected when the investor card is lodged; the DT visa alone is stamped without an appointment.',
        ],
        pt: [
          'Fotografia e impressões digitais no escritório de imigração',
          'Recolhidas no protocolo do cartão de investidor; o visto DT sozinho é carimbado sem marcação.',
        ],
        es: [
          'Fotografía y huellas en la oficina de inmigración',
          'Se toman al presentar la tarjeta de inversor; el visado DT por sí solo se sella sin cita previa.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Register where you live with the neighbourhood police',
          'Owning a company does not exempt you. If you rent an apartment rather than stay in a hotel, you present yourself at the ward station, and again after each move or return from abroad.',
        ],
        pt: [
          'Registar onde você mora na polícia do bairro',
          'Ter empresa não isenta você. Se aluga um apartamento em vez de ficar em hotel, você se apresenta no posto do bairro, e de novo a cada mudança ou volta do exterior.',
        ],
        es: [
          'Registrar dónde vive ante la policía del vecindario',
          'Tener empresa no le exime. Si alquila un apartamento en vez de alojarse en un hotel, se presenta en la comisaría del barrio, y otra vez tras cada mudanza o regreso del extranjero.',
        ],
      },
      {
        en: [
          'Confirm the work permit exemption for your own company',
          'Capital-contributing owners are generally exempt, but the exemption is still declared to the labour department. Assuming it is automatic leaves you working without cover.',
        ],
        pt: [
          'Confirmar a dispensa de work permit na sua própria empresa',
          'Sócios que aportam capital costumam ser dispensados, mas a dispensa ainda é declarada ao departamento de trabalho. Presumir que é automática deixa você trabalhando descoberto.',
        ],
        es: [
          'Confirmar la exención de permiso de trabajo en su propia empresa',
          'Los socios que aportan capital suelen estar exentos, pero la exención igual se declara al departamento de trabajo. Darla por automática le deja trabajando sin cobertura.',
        ],
      },
      {
        en: [
          'Keep the company filing and reporting on time',
          'Monthly and annual tax returns, licence reporting, audited accounts. A dormant or delinquent company is what sinks the renewal, not the immigration file.',
        ],
        pt: [
          'Manter as obrigações e declarações da empresa em dia',
          'Declarações fiscais mensais e anuais, relatórios de licença, contas auditadas. Uma empresa parada ou inadimplente é o que afunda a renovação, não o processo de imigração.',
        ],
        es: [
          'Mantener al día las obligaciones y declaraciones de la empresa',
          'Declaraciones fiscales mensuales y anuales, informes de licencia, cuentas auditadas. Una empresa inactiva o morosa es lo que hunde la renovación, no el expediente de inmigración.',
        ],
      },
      {
        en: [
          'Report changes to the investment registration',
          'New capital, a new address, a different activity or a change of legal representative all have to be amended on the certificate before immigration sees a mismatch.',
        ],
        pt: [
          'Comunicar alterações no registo de investimento',
          'Novo capital, novo endereço, atividade diferente ou troca de representante legal precisam ser alterados no certificado antes que a imigração veja uma divergência.',
        ],
        es: [
          'Comunicar los cambios en el registro de inversión',
          'Nuevo capital, nueva dirección, actividad distinta o cambio de representante legal deben modificarse en el certificado antes de que inmigración vea una discrepancia.',
        ],
      },
      {
        en: [
          'Renew in step with the investment certificate',
          'Your stay follows the life of the project. If the certificate is nearing its end, extend the project before asking to extend yourself.',
        ],
        pt: [
          'Renovar em sintonia com o certificado de investimento',
          'Sua permanência acompanha a vida do projeto. Se o certificado se aproxima do fim, prorrogue o projeto antes de pedir para prorrogar você.',
        ],
        es: [
          'Renovar en sintonía con el certificado de inversión',
          'Su estancia sigue la vida del proyecto. Si el certificado se acerca a su fin, prorrogue el proyecto antes de pedir prorrogarse usted.',
        ],
        priority: 2,
      },
    ],
  },
};
