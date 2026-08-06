import type { CountryVisaSteps } from './types';

/**
 * Steps for Turkey.
 *
 * Turkey is neither in the European Union nor in the Schengen area, and that
 * single fact undoes most assumptions people arrive with: a Schengen visa does
 * not admit you, days spent in Turkey do not eat into the Schengen allowance,
 * and a Turkish residence permit or passport grants nothing inside the Union.
 *
 * Residence is not a consular product. You enter on an e-Visa or visa exemption
 * and then apply for the ikamet from inside the country through the e-ikamet
 * system of the migration authority, before your legal stay runs out. Miss that
 * window and there is no repair from within Turkey.
 *
 * Two rules catch people out repeatedly. Neighbourhoods where foreign residents
 * exceed a set share of the population are closed to new registrations, so an
 * address in the wrong street can sink an otherwise perfect file. And the
 * investment route to citizenship works off an official appraisal, not the
 * price on the contract, with the property locked for three years.
 */
export const turkey: CountryVisaSteps = {
  'Tourist Visa / e-Visa': {
    core_documents: [
      {
        en: [
          'Passport with enough validity for the whole trip',
          'Turkey asks for validity of at least sixty days beyond the end of the stay your visa allows, and many airlines apply a six-month rule of their own.',
        ],
        pt: [
          'Passaporte com validade suficiente para toda a viagem',
          'A Turquia exige validade de pelo menos sessenta dias além do fim da estada permitida pelo visto, e muitas companhias aéreas aplicam uma regra própria de seis meses.',
        ],
        es: [
          'Pasaporte con validez suficiente para todo el viaje',
          'Turquía exige una validez de al menos sesenta días más allá del final de la estancia que permite el visado, y muchas aerolíneas aplican una regla propia de seis meses.',
        ],
      },
      {
        en: [
          'Check which route your nationality actually uses',
          'Some passports enter visa free, some use the electronic visa, and some must obtain a sticker visa at a consulate. Assuming the wrong one is the most common mistake.',
        ],
        pt: [
          'Verificar qual via a sua nacionalidade realmente usa',
          'Alguns passaportes entram sem visto, outros usam o visto eletrónico e outros precisam de visto adesivo num consulado. Presumir a via errada é o erro mais comum.',
        ],
        es: [
          'Comprobar qué vía usa realmente su nacionalidad',
          'Algunos pasaportes entran sin visado, otros usan el visado electrónico y otros deben obtener un visado adhesivo en un consulado. Suponer la vía equivocada es el error más frecuente.',
        ],
      },
      {
        en: [
          'Apply only on the official electronic visa portal',
          'Dozens of look-alike sites resell the same application with a large markup and no legal standing. The official one is the government domain for electronic visas.',
        ],
        pt: [
          'Pedir apenas no portal oficial de visto eletrónico',
          'Dezenas de sites parecidos revendem o mesmo pedido com margem alta e nenhuma validade legal. O oficial é o domínio governamental de vistos eletrónicos.',
        ],
        es: [
          'Solicitar solo en el portal oficial de visado electrónico',
          'Decenas de sitios parecidos revenden la misma solicitud con un gran recargo y sin validez legal. El oficial es el dominio gubernamental de visados electrónicos.',
        ],
      },
      {
        en: [
          'Meet the prerequisite conditions attached to some nationalities',
          'For several passports the electronic visa is only granted if you also hold a valid visa or residence permit from a Schengen state, the United Kingdom, Ireland or the United States, plus a hotel booking and a return ticket.',
        ],
        pt: [
          'Cumprir as condições prévias ligadas a certas nacionalidades',
          'Para vários passaportes o visto eletrónico só é concedido se você também tiver visto ou autorização de residência válidos de um Estado Schengen, do Reino Unido, da Irlanda ou dos Estados Unidos, além de reserva de hotel e passagem de volta.',
        ],
        es: [
          'Cumplir las condiciones previas ligadas a ciertas nacionalidades',
          'Para varios pasaportes el visado electrónico solo se concede si además posee un visado o permiso de residencia válido de un Estado Schengen, del Reino Unido, de Irlanda o de Estados Unidos, más reserva de hotel y billete de vuelta.',
        ],
      },
      {
        en: [
          'Carry a printed copy of the approved electronic visa',
          'Airlines check it at boarding and the border officer may ask for it even though it is linked to the passport number.',
        ],
        pt: [
          'Levar cópia impressa do visto eletrónico aprovado',
          'As companhias aéreas conferem no embarque e o agente de fronteira pode pedir mesmo estando vinculado ao número do passaporte.',
        ],
        es: [
          'Llevar copia impresa del visado electrónico aprobado',
          'Las aerolíneas lo comprueban en el embarque y el agente de frontera puede pedirlo aunque esté vinculado al número de pasaporte.',
        ],
      },
      {
        en: [
          'Onward or return ticket',
          'Border officers do ask for it, and the airline can refuse boarding without one.',
        ],
        pt: [
          'Passagem de saída ou de volta',
          'Os agentes de fronteira pedem, e a companhia aérea pode negar embarque sem ela.',
        ],
        es: [
          'Billete de salida o de vuelta',
          'Los agentes de frontera lo piden, y la aerolínea puede denegar el embarque sin él.',
        ],
      },
      {
        en: [
          'Address of where you will be staying',
          'A hotel confirmation or the full address of your host, written down. Turkish entry cards ask for it.',
        ],
        pt: [
          'Endereço de onde você vai ficar',
          'Confirmação de hotel ou o endereço completo do anfitrião, por escrito. Os cartões de entrada turcos pedem isso.',
        ],
        es: [
          'Dirección de donde se alojará',
          'Confirmación del hotel o la dirección completa de su anfitrión, por escrito. Las tarjetas de entrada turcas lo piden.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Funds proportionate to the length of the visit',
          'A daily figure per person may be asked for at the border. The amount is set administratively and changes with the exchange rate, so check the current guidance.',
        ],
        pt: [
          'Recursos proporcionais à duração da visita',
          'Um valor diário por pessoa pode ser pedido na fronteira. O montante é fixado administrativamente e muda com o câmbio, então confira a orientação atual.',
        ],
        es: [
          'Fondos proporcionales a la duración de la visita',
          'En la frontera puede pedirse una cifra diaria por persona. El importe se fija administrativamente y cambia con el tipo de cambio, así que consulte la guía actual.',
        ],
      },
      {
        en: [
          'A card that works in Turkey',
          'Some foreign cards are declined by local terminals and cash exchange rates at the airport are poor. Arrive with a working payment method.',
        ],
        pt: [
          'Um cartão que funcione na Turquia',
          'Alguns cartões estrangeiros são recusados por terminais locais e o câmbio no aeroporto é ruim. Chegue com um meio de pagamento funcional.',
        ],
        es: [
          'Una tarjeta que funcione en Turquía',
          'Algunas tarjetas extranjeras son rechazadas por los terminales locales y el cambio en el aeropuerto es malo. Llegue con un medio de pago operativo.',
        ],
        priority: 3,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Pay the electronic visa charge on the government portal',
          'Some nationalities pay nothing, others pay a set amount. Payment on the official site is by card and the approval usually arrives in minutes.',
        ],
        pt: [
          'Pagar a taxa do visto eletrónico no portal governamental',
          'Algumas nacionalidades não pagam nada, outras pagam um valor fixo. O pagamento no site oficial é por cartão e a aprovação costuma chegar em minutos.',
        ],
        es: [
          'Pagar la tasa del visado electrónico en el portal gubernamental',
          'Algunas nacionalidades no pagan nada, otras pagan un importe fijo. El pago en el sitio oficial es con tarjeta y la aprobación suele llegar en minutos.',
        ],
      },
      {
        en: [
          'Use the consular route if the electronic visa is unavailable',
          'Sticker visas are handled by Turkish missions and take weeks, with an interview and full supporting documents.',
        ],
        pt: [
          'Usar a via consular se o visto eletrónico não estiver disponível',
          'Vistos adesivos são tratados pelas representações turcas e levam semanas, com entrevista e documentação completa.',
        ],
        es: [
          'Usar la vía consular si el visado electrónico no está disponible',
          'Los visados adhesivos los gestionan las representaciones turcas y tardan semanas, con entrevista y documentación completa.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Apply before travel, not on arrival',
          'Visa on arrival has been withdrawn for most nationalities, and airlines will not board you on the expectation of getting one at the airport.',
        ],
        pt: [
          'Pedir antes de viajar, não na chegada',
          'O visto na chegada foi retirado para a maioria das nacionalidades, e as companhias não embarcam você na expectativa de obter um no aeroporto.',
        ],
        es: [
          'Solicitar antes de viajar, no a la llegada',
          'El visado a la llegada se ha retirado para la mayoría de nacionalidades, y las aerolíneas no le embarcarán esperando obtener uno en el aeropuerto.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'No biometric appointment for the electronic visa',
          'Fingerprints are only taken on the consular route, or later when you apply for residence inside Turkey.',
        ],
        pt: [
          'Sem atendimento biométrico para o visto eletrónico',
          'As impressões digitais só são recolhidas na via consular, ou depois, quando você pedir residência dentro da Turquia.',
        ],
        es: [
          'Sin cita biométrica para el visado electrónico',
          'Las huellas solo se toman por la vía consular, o después, cuando solicite residencia dentro de Turquía.',
        ],
      },
      {
        en: [
          'Travel health insurance for the visit',
          'Not compulsory for a tourist entry, but public hospitals bill foreigners at full rate and private care is expensive.',
        ],
        pt: [
          'Seguro de saúde de viagem para a visita',
          'Não é obrigatório na entrada turística, mas hospitais públicos cobram tarifa integral de estrangeiros e o atendimento privado é caro.',
        ],
        es: [
          'Seguro médico de viaje para la visita',
          'No es obligatorio en la entrada turística, pero los hospitales públicos facturan a los extranjeros a tarifa completa y la atención privada es cara.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Count your days against the Turkish rule, not the Schengen one',
          'Turkey applies its own ninety days in any one hundred and eighty. It is a separate allowance from the Schengen one and the two never offset each other.',
        ],
        pt: [
          'Contar os dias pela regra turca, não pela Schengen',
          'A Turquia aplica os seus próprios noventa dias em cada cento e oitenta. É uma franquia separada da Schengen e as duas nunca se compensam.',
        ],
        es: [
          'Contar los días por la regla turca, no por la Schengen',
          'Turquía aplica sus propios noventa días en cada ciento ochenta. Es un cupo separado del Schengen y ambos nunca se compensan.',
        ],
      },
      {
        en: [
          'Do not treat a border run as a reset',
          'Leaving and re-entering does not restart the allowance. The system tracks cumulative days and refuses entry once they are used up.',
        ],
        pt: [
          'Não tratar uma saída e volta como reinício',
          'Sair e reentrar não reinicia a franquia. O sistema acompanha os dias acumulados e recusa a entrada quando eles acabam.',
        ],
        es: [
          'No tratar una salida y regreso como reinicio',
          'Salir y volver a entrar no reinicia el cupo. El sistema registra los días acumulados y deniega la entrada cuando se agotan.',
        ],
      },
      {
        en: [
          'Avoid overstaying even by a few days',
          'Overstay triggers a fine payable on exit and an entry ban whose length grows with the excess, from months to years.',
        ],
        pt: [
          'Evitar exceder o prazo mesmo por poucos dias',
          'O excesso gera multa paga na saída e uma proibição de entrada cuja duração cresce com o excedente, de meses a anos.',
        ],
        es: [
          'Evitar exceder el plazo aunque sea por pocos días',
          'El exceso genera una multa pagadera a la salida y una prohibición de entrada cuya duración crece con el exceso, de meses a años.',
        ],
      },
      {
        en: [
          'Have your host declare you if you stay in a private home',
          'Accommodation providers report guests to the authorities. Hotels do it automatically; a private host is legally responsible for doing it themselves.',
        ],
        pt: [
          'Fazer o anfitrião declarar você se ficar em casa particular',
          'Quem hospeda comunica os hóspedes às autoridades. Hotéis fazem automaticamente; um anfitrião particular é legalmente responsável por fazer isso por conta própria.',
        ],
        es: [
          'Hacer que su anfitrión le declare si se aloja en casa particular',
          'Quien aloja comunica a los huéspedes a las autoridades. Los hoteles lo hacen automáticamente; un anfitrión particular es legalmente responsable de hacerlo él mismo.',
        ],
      },
      {
        en: [
          'Start the residence application while still legally in the country',
          'A tourist entry cannot be extended. If you intend to stay longer, the ikamet file must be opened before your permitted days expire.',
        ],
        pt: [
          'Iniciar o pedido de residência ainda estando legal no país',
          'A entrada turística não pode ser prorrogada. Se pretende ficar mais tempo, o processo de ikamet precisa ser aberto antes de os dias permitidos acabarem.',
        ],
        es: [
          'Iniciar la solicitud de residencia estando aún legal en el país',
          'La entrada turística no puede prorrogarse. Si piensa quedarse más tiempo, el expediente de ikamet debe abrirse antes de que expiren los días permitidos.',
        ],
      },
    ],
  },

  'Short-Term Residence Permit': {
    core_documents: [
      {
        en: [
          'Passport valid well beyond the requested permit',
          'The permit cannot end later than sixty days before the passport expires, so a short passport shortens the ikamet automatically.',
        ],
        pt: [
          'Passaporte válido bem além da autorização pedida',
          'A autorização não pode terminar depois de sessenta dias antes do vencimento do passaporte, então um passaporte curto encurta o ikamet automaticamente.',
        ],
        es: [
          'Pasaporte válido bastante más allá del permiso solicitado',
          'El permiso no puede terminar después de sesenta días antes de la caducidad del pasaporte, así que un pasaporte corto acorta el ikamet automáticamente.',
        ],
      },
      {
        en: [
          'Open the file in the electronic residence system',
          'The application is made online through the migration authority portal, which generates the form and books the appointment. There is no walk-in alternative.',
        ],
        pt: [
          'Abrir o processo no sistema eletrónico de residência',
          'O pedido é feito online no portal da autoridade de migração, que gera o formulário e agenda o atendimento. Não existe alternativa por balcão.',
        ],
        es: [
          'Abrir el expediente en el sistema electrónico de residencia',
          'La solicitud se hace en línea en el portal de la autoridad de migración, que genera el formulario y reserva la cita. No hay alternativa presencial sin cita.',
        ],
      },
      {
        en: [
          'File while your entry is still valid',
          'The application must be started before the visa or visa-free stay ends. Filing a day late means leaving the country and starting again from abroad.',
        ],
        pt: [
          'Protocolar enquanto a sua entrada ainda é válida',
          'O pedido precisa ser iniciado antes de o visto ou a estada isenta acabar. Protocolar um dia depois significa sair do país e recomeçar do exterior.',
        ],
        es: [
          'Presentar mientras su entrada siga vigente',
          'La solicitud debe iniciarse antes de que termine el visado o la estancia exenta. Presentarla un día tarde implica salir del país y empezar de nuevo desde el extranjero.',
        ],
      },
      {
        en: [
          'Four biometric photographs in the Turkish format',
          'White background, taken within the last six months. Photographs in another country’s format are routinely rejected at the counter.',
        ],
        pt: [
          'Quatro fotografias biométricas no formato turco',
          'Fundo branco, tiradas nos últimos seis meses. Fotos no formato de outro país são recusadas rotineiramente no balcão.',
        ],
        es: [
          'Cuatro fotografías biométricas en formato turco',
          'Fondo blanco, tomadas en los últimos seis meses. Las fotos en el formato de otro país se rechazan de forma habitual en el mostrador.',
        ],
      },
      {
        en: [
          'Notarised lease or title deed for your address',
          'A rental contract has to be signed at a notary to count, and the deed is required if you own. A hotel receipt only works for short declared stays.',
        ],
        pt: [
          'Contrato de aluguel autenticado ou escritura do imóvel',
          'O contrato de aluguel precisa ser assinado em cartório para valer, e a escritura é exigida se você for proprietário. Recibo de hotel só serve para estadas curtas declaradas.',
        ],
        es: [
          'Contrato de alquiler notarial o escritura del inmueble',
          'El contrato de alquiler debe firmarse ante notario para contar, y la escritura se exige si es propietario. Un recibo de hotel solo sirve para estancias cortas declaradas.',
        ],
      },
      {
        en: [
          'Confirm the neighbourhood is open to new foreign registration',
          'Districts where foreign residents pass a set share of the population are closed to new applications, and well over a thousand neighbourhoods are on that list. Check the address before signing a lease.',
        ],
        pt: [
          'Confirmar que o bairro está aberto a novo registo de estrangeiros',
          'Bairros onde os residentes estrangeiros passam de uma percentagem definida da população estão fechados a novos pedidos, e bem mais de mil bairros estão nessa lista. Verifique o endereço antes de assinar o contrato.',
        ],
        es: [
          'Confirmar que el barrio está abierto a nuevo registro de extranjeros',
          'Los barrios donde los residentes extranjeros superan un porcentaje fijado de la población están cerrados a nuevas solicitudes, y bastante más de mil barrios están en esa lista. Compruebe la dirección antes de firmar el contrato.',
        ],
      },
      {
        en: [
          'Signed application form and appointment slip',
          'Printed from the portal, signed in wet ink, and submitted with the whole file in the order the system lists.',
        ],
        pt: [
          'Formulário de pedido assinado e comprovativo de agendamento',
          'Impressos do portal, assinados à mão e entregues com todo o processo na ordem que o sistema indica.',
        ],
        es: [
          'Formulario de solicitud firmado y comprobante de cita',
          'Impresos del portal, firmados a mano y entregados con todo el expediente en el orden que indica el sistema.',
        ],
      },
      {
        en: [
          'State a genuine and documented reason for staying',
          'Tourism, property ownership, medical treatment, a language course or family. Vague tourism applications, especially renewals, are refused far more often than they used to be.',
        ],
        pt: [
          'Declarar um motivo genuíno e documentado para ficar',
          'Turismo, propriedade de imóvel, tratamento médico, curso de idiomas ou família. Pedidos genéricos por turismo, sobretudo renovações, são recusados muito mais do que antes.',
        ],
        es: [
          'Declarar un motivo genuino y documentado para quedarse',
          'Turismo, propiedad de un inmueble, tratamiento médico, curso de idiomas o familia. Las solicitudes genéricas por turismo, sobre todo las renovaciones, se deniegan mucho más que antes.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Declaration of regular income for the whole period',
          'A monthly minimum is expected, usually expressed against the national minimum wage. The reference figure moves with each wage revision, so confirm the current one.',
        ],
        pt: [
          'Declaração de renda regular para todo o período',
          'Espera-se um mínimo mensal, geralmente expresso em relação ao salário mínimo nacional. O valor de referência muda a cada revisão salarial, então confirme o atual.',
        ],
        es: [
          'Declaración de ingresos regulares para todo el periodo',
          'Se espera un mínimo mensual, normalmente expresado frente al salario mínimo nacional. La cifra de referencia cambia con cada revisión salarial, así que confirme la actual.',
        ],
      },
      {
        en: [
          'Bank document supporting the declaration',
          'A statement or balance letter, ideally from a Turkish account. Opening one now needs the foreigner identity number, so plan the order of steps.',
        ],
        pt: [
          'Documento bancário que sustente a declaração',
          'Extrato ou carta de saldo, de preferência de conta turca. Abrir uma hoje exige o número de identidade de estrangeiro, então planeie a ordem dos passos.',
        ],
        es: [
          'Documento bancario que respalde la declaración',
          'Un extracto o carta de saldo, preferiblemente de una cuenta turca. Abrir una hoy exige el número de identidad de extranjero, así que planifique el orden de los pasos.',
        ],
      },
      {
        en: [
          'Health insurance valid in Turkey for the exact permit dates',
          'A local policy or the public scheme. The cover must start and end with the permit; a policy that is a day short is sent back.',
        ],
        pt: [
          'Seguro de saúde válido na Turquia nas datas exatas da autorização',
          'Uma apólice local ou o regime público. A cobertura precisa começar e terminar com a autorização; uma apólice um dia mais curta é devolvida.',
        ],
        es: [
          'Seguro de salud válido en Turquía en las fechas exactas del permiso',
          'Una póliza local o el régimen público. La cobertura debe empezar y terminar con el permiso; una póliza un día más corta se devuelve.',
        ],
      },
      {
        en: [
          'Pay the permit charge and the card charge separately',
          'Two different payments at the tax office or online, and both receipts go into the file. Applicants routinely forget the card one.',
        ],
        pt: [
          'Pagar separadamente o encargo da autorização e o do cartão',
          'Dois pagamentos diferentes na repartição fiscal ou online, e os dois recibos entram no processo. Os requerentes esquecem o do cartão com frequência.',
        ],
        es: [
          'Pagar por separado el cargo del permiso y el de la tarjeta',
          'Dos pagos distintos en la oficina tributaria o en línea, y ambos recibos van al expediente. Los solicitantes olvidan el de la tarjeta con frecuencia.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Attend the appointment at the provincial migration office',
          'For first applications you appear in person at the office for the province of your address, not the one nearest to you.',
        ],
        pt: [
          'Comparecer ao atendimento na direção provincial de migração',
          'Nos primeiros pedidos você comparece pessoalmente na repartição da província do seu endereço, não na mais próxima de você.',
        ],
        es: [
          'Acudir a la cita en la dirección provincial de migración',
          'En las primeras solicitudes acude en persona a la oficina de la provincia de su domicilio, no a la más cercana a usted.',
        ],
      },
      {
        en: [
          'Deliver the complete file within the deadline given',
          'Some provinces accept the documents by registered post after the online filing, with a short window that starts on the appointment date.',
        ],
        pt: [
          'Entregar o processo completo dentro do prazo indicado',
          'Algumas províncias aceitam os documentos por correio registado após o protocolo online, com uma janela curta que começa na data do agendamento.',
        ],
        es: [
          'Entregar el expediente completo dentro del plazo indicado',
          'Algunas provincias aceptan los documentos por correo certificado tras la presentación en línea, con una ventana corta que empieza en la fecha de la cita.',
        ],
      },
      {
        en: [
          'Keep the receipt that proves lawful stay while you wait',
          'The application document lets you remain in Turkey during processing, but leaving the country during that time can void it.',
        ],
        pt: [
          'Guardar o comprovativo que prova estada legal durante a espera',
          'O documento do pedido permite permanecer na Turquia durante a análise, mas sair do país nesse período pode anulá-lo.',
        ],
        es: [
          'Conservar el resguardo que acredita estancia legal durante la espera',
          'El documento de la solicitud permite permanecer en Turquía durante la tramitación, pero salir del país en ese periodo puede anularlo.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints taken at the migration office',
          'Required for first applications and for some renewals; the card cannot be produced before this is done.',
        ],
        pt: [
          'Impressões digitais recolhidas na repartição de migração',
          'Exigidas nos primeiros pedidos e em algumas renovações; o cartão não pode ser produzido antes disso.',
        ],
        es: [
          'Huellas dactilares tomadas en la oficina de migración',
          'Se exigen en las primeras solicitudes y en algunas renovaciones; la tarjeta no puede producirse antes de hacerlo.',
        ],
      },
      {
        en: [
          'Insurance obligation depends on your age',
          'Applicants over the age threshold are exempt from the insurance requirement; everyone below it must hold cover for the whole permit.',
        ],
        pt: [
          'A obrigação de seguro depende da sua idade',
          'Requerentes acima do limite de idade ficam isentos da exigência de seguro; todos abaixo dele precisam manter cobertura por toda a autorização.',
        ],
        es: [
          'La obligación de seguro depende de su edad',
          'Los solicitantes por encima del umbral de edad quedan exentos del requisito de seguro; todos los que estén por debajo deben tener cobertura durante todo el permiso.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Receive the card by post at the declared address',
          'The postal service delivers only to the address on the application and only to you. A wrong or temporary address means the card goes back.',
        ],
        pt: [
          'Receber o cartão pelo correio no endereço declarado',
          'O serviço postal entrega apenas no endereço do pedido e apenas a você. Endereço errado ou temporário faz o cartão voltar.',
        ],
        es: [
          'Recibir la tarjeta por correo en la dirección declarada',
          'El servicio postal entrega solo en la dirección de la solicitud y solo a usted. Una dirección equivocada o temporal hace que la tarjeta vuelva.',
        ],
      },
      {
        en: [
          'Note your foreigner identity number',
          'The eleven-digit number printed on the card, beginning with ninety-nine, is what opens bank accounts, phone lines, tax records and the state services portal.',
        ],
        pt: [
          'Anotar o seu número de identidade de estrangeiro',
          'O número de onze dígitos impresso no cartão, começando por noventa e nove, é o que abre contas bancárias, linhas telefónicas, registos fiscais e o portal de serviços do Estado.',
        ],
        es: [
          'Anotar su número de identidad de extranjero',
          'El número de once dígitos impreso en la tarjeta, que empieza por noventa y nueve, es lo que abre cuentas bancarias, líneas de teléfono, registros fiscales y el portal de servicios del Estado.',
        ],
      },
      {
        en: [
          'Register the address at the civil registry office',
          'A separate step from the permit, due within twenty working days of receiving the card, and required again after every move.',
        ],
        pt: [
          'Registar a morada na repartição do registo civil',
          'Um passo separado da autorização, devido em até vinte dias úteis após receber o cartão, e exigido de novo a cada mudança.',
        ],
        es: [
          'Registrar el domicilio en la oficina del registro civil',
          'Un paso aparte del permiso, que vence a los veinte días hábiles de recibir la tarjeta, y exigido de nuevo tras cada mudanza.',
        ],
      },
      {
        en: [
          'Watch how long you spend outside Turkey',
          'Extended absence within a permit year is a ground for cancellation, because the permit assumes you are actually living there.',
        ],
        pt: [
          'Atenção ao tempo que passa fora da Turquia',
          'Ausência prolongada dentro de um ano de autorização é motivo de cancelamento, porque a autorização pressupõe que você mora lá de facto.',
        ],
        es: [
          'Vigilar cuánto tiempo pasa fuera de Turquía',
          'Una ausencia prolongada dentro de un año de permiso es causa de cancelación, porque el permiso presume que usted vive allí realmente.',
        ],
      },
      {
        en: [
          'Renew within the sixty days before expiry',
          'Renewals open two months ahead and cannot be filed after the card has lapsed; late is treated as a new application from scratch.',
        ],
        pt: [
          'Renovar nos sessenta dias anteriores ao vencimento',
          'As renovações abrem dois meses antes e não podem ser feitas depois de o cartão caducar; atrasar é tratado como pedido novo do zero.',
        ],
        es: [
          'Renovar en los sesenta días previos al vencimiento',
          'Las renovaciones se abren dos meses antes y no pueden presentarse tras caducar la tarjeta; llegar tarde se trata como una solicitud nueva desde cero.',
        ],
      },
      {
        en: [
          'Understand which years count towards long-term residence',
          'Long-term status needs eight uninterrupted years of residence, but time held purely for tourism or study does not count towards it.',
        ],
        pt: [
          'Entender quais anos contam para a residência de longa duração',
          'O estatuto de longa duração exige oito anos ininterruptos de residência, mas o tempo mantido só por turismo ou estudo não conta para ele.',
        ],
        es: [
          'Entender qué años cuentan para la residencia de larga duración',
          'El estatuto de larga duración exige ocho años ininterrumpidos de residencia, pero el tiempo mantenido solo por turismo o estudio no cuenta para él.',
        ],
      },
    ],
  },

  'Work Permit': {
    core_documents: [
      {
        en: [
          'The employer files the application, not you',
          'Turkish work permits are applied for by the company through the labour ministry system with an electronic signature. There is no way to apply on your own behalf as a new arrival.',
        ],
        pt: [
          'Quem protocola é o empregador, não você',
          'As autorizações de trabalho turcas são pedidas pela empresa no sistema do ministério do trabalho com assinatura eletrónica. Não há como pedir por conta própria como recém-chegado.',
        ],
        es: [
          'Quien presenta la solicitud es el empleador, no usted',
          'Los permisos de trabajo turcos los solicita la empresa en el sistema del ministerio de trabajo con firma electrónica. No hay forma de solicitarlo por cuenta propia como recién llegado.',
        ],
      },
      {
        en: [
          'Work visa reference number from a Turkish mission',
          'If you are abroad, you start at the consulate, get a reference number, and the employer must complete the filing within ten working days or the reference dies.',
        ],
        pt: [
          'Número de referência de visto de trabalho numa representação turca',
          'Se estiver no exterior, você começa no consulado, obtém um número de referência, e o empregador precisa concluir o protocolo em dez dias úteis ou a referência caduca.',
        ],
        es: [
          'Número de referencia de visado de trabajo en una misión turca',
          'Si está en el extranjero, empieza en el consulado, obtiene un número de referencia y el empleador debe completar la presentación en diez días hábiles o la referencia caduca.',
        ],
      },
      {
        en: [
          'Employment contract signed by both sides',
          'Setting out the role, the workplace, the salary and the duration. The permit is granted for that job at that workplace.',
        ],
        pt: [
          'Contrato de trabalho assinado pelas duas partes',
          'Definindo a função, o local de trabalho, o salário e a duração. A autorização é concedida para aquele cargo naquele local.',
        ],
        es: [
          'Contrato de trabajo firmado por ambas partes',
          'Que fije el puesto, el centro de trabajo, el salario y la duración. El permiso se concede para ese empleo en ese centro.',
        ],
      },
      {
        en: [
          'Passport copy translated and notarised',
          'A sworn translation certified by a Turkish notary; a translation done abroad is usually not accepted.',
        ],
        pt: [
          'Cópia do passaporte traduzida e autenticada',
          'Tradução juramentada certificada por notário turco; tradução feita no exterior geralmente não é aceite.',
        ],
        es: [
          'Copia del pasaporte traducida y notarizada',
          'Traducción jurada certificada por un notario turco; una traducción hecha en el extranjero normalmente no se acepta.',
        ],
      },
      {
        en: [
          'Company registration and financial documents',
          'Trade registry gazette, tax certificate and the latest balance sheet, uploaded by the employer to prove the company qualifies to hire foreigners.',
        ],
        pt: [
          'Documentos de registo e financeiros da empresa',
          'Diário do registo comercial, certidão fiscal e o último balanço, carregados pelo empregador para provar que a empresa pode contratar estrangeiros.',
        ],
        es: [
          'Documentos de registro y financieros de la empresa',
          'Boletín del registro mercantil, certificado fiscal y el último balance, subidos por el empleador para probar que la empresa puede contratar extranjeros.',
        ],
      },
      {
        en: [
          'Know that the permit also serves as your residence document',
          'A granted work permit is valid as a residence permit, so there is no separate ikamet application on top of it.',
        ],
        pt: [
          'Saber que a autorização também serve como documento de residência',
          'Uma autorização de trabalho concedida vale como autorização de residência, então não há pedido de ikamet separado além dela.',
        ],
        es: [
          'Saber que el permiso sirve también como documento de residencia',
          'Un permiso de trabajo concedido vale como permiso de residencia, así que no hay una solicitud de ikamet aparte.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Diploma with sworn translation and notarisation',
          'Required for most qualified roles, and the original may be requested for inspection.',
        ],
        pt: [
          'Diploma com tradução juramentada e autenticação',
          'Exigido na maioria das funções qualificadas, e o original pode ser pedido para conferência.',
        ],
        es: [
          'Título con traducción jurada y notarización',
          'Exigido en la mayoría de puestos cualificados, y puede pedirse el original para su comprobación.',
        ],
      },
      {
        en: [
          'Equivalence decision for regulated professions',
          'Engineers, architects, teachers and health professionals need a recognition decision from the higher education authority before the permit can be issued. It runs on its own timetable, often months.',
        ],
        pt: [
          'Decisão de equivalência para profissões regulamentadas',
          'Engenheiros, arquitetos, professores e profissionais de saúde precisam de uma decisão de reconhecimento da autoridade de ensino superior antes de a autorização ser emitida. Ela corre em prazo próprio, muitas vezes meses.',
        ],
        es: [
          'Resolución de equivalencia para profesiones reguladas',
          'Ingenieros, arquitectos, docentes y profesionales sanitarios necesitan una resolución de reconocimiento de la autoridad de educación superior antes de que se expida el permiso. Va a su propio ritmo, a menudo meses.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Salary matched to the multiple required for your occupation',
          'The minimum is expressed as a multiple of the national minimum wage and differs by role, with senior and specialist positions requiring the highest multiples. The base wage is revised regularly.',
        ],
        pt: [
          'Salário compatível com o múltiplo exigido para a sua ocupação',
          'O mínimo é expresso como múltiplo do salário mínimo nacional e varia por função, com cargos seniores e especializados exigindo os múltiplos mais altos. O salário base é revisto regularmente.',
        ],
        es: [
          'Salario ajustado al múltiplo exigido para su ocupación',
          'El mínimo se expresa como múltiplo del salario mínimo nacional y varía según el puesto, con los cargos superiores y especializados exigiendo los múltiplos más altos. El salario base se revisa con regularidad.',
        ],
      },
      {
        en: [
          'Employer must satisfy the local employment quota',
          'A set number of Turkish citizens must be on the payroll for each foreign worker, and the company must meet a paid-in capital or turnover floor. Small companies often fail here.',
        ],
        pt: [
          'O empregador precisa cumprir a quota de emprego local',
          'Um número definido de cidadãos turcos precisa estar na folha por cada trabalhador estrangeiro, e a empresa precisa atingir um piso de capital integralizado ou de faturação. Empresas pequenas costumam falhar aqui.',
        ],
        es: [
          'El empleador debe cumplir la cuota de empleo local',
          'Un número determinado de ciudadanos turcos debe figurar en nómina por cada trabajador extranjero, y la empresa debe alcanzar un mínimo de capital desembolsado o de facturación. Las empresas pequeñas suelen fallar aquí.',
        ],
      },
      {
        en: [
          'Permit charge and valuable paper charge',
          'Two amounts paid after approval and before the document is issued; approval lapses if they are not paid within the deadline given.',
        ],
        pt: [
          'Encargo da autorização e encargo do papel de valor',
          'Dois valores pagos após a aprovação e antes da emissão do documento; a aprovação caduca se não forem pagos no prazo dado.',
        ],
        es: [
          'Cargo del permiso y cargo del papel valorado',
          'Dos importes pagados tras la aprobación y antes de expedir el documento; la aprobación caduca si no se pagan en el plazo indicado.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Electronic filing with the company’s digital signature',
          'The ministry system requires a registered electronic signature held by the employer or its accountant. Without it nothing can be submitted.',
        ],
        pt: [
          'Protocolo eletrónico com a assinatura digital da empresa',
          'O sistema do ministério exige assinatura eletrónica registada em poder do empregador ou do seu contabilista. Sem ela nada pode ser enviado.',
        ],
        es: [
          'Presentación electrónica con la firma digital de la empresa',
          'El sistema del ministerio exige una firma electrónica registrada en poder del empleador o de su contable. Sin ella no puede enviarse nada.',
        ],
      },
      {
        en: [
          'Applying from inside Turkey needs an existing residence permit',
          'Only holders of a valid residence permit with at least six months left can be applied for domestically; everyone else goes through a consulate.',
        ],
        pt: [
          'Pedir de dentro da Turquia exige autorização de residência já existente',
          'Só quem tem autorização de residência válida com pelo menos seis meses restantes pode ser pedido internamente; os demais passam por um consulado.',
        ],
        es: [
          'Solicitar desde dentro de Turquía exige un permiso de residencia previo',
          'Solo se puede solicitar internamente para quienes tengan un permiso de residencia válido con al menos seis meses restantes; el resto pasa por un consulado.',
        ],
      },
      {
        en: [
          'Collect the entry visa after approval if you are abroad',
          'The mission issues a work visa on the approved permit, and you must travel within its validity.',
        ],
        pt: [
          'Retirar o visto de entrada após a aprovação se estiver no exterior',
          'A representação emite um visto de trabalho com base na autorização aprovada, e você precisa viajar dentro da validade dele.',
        ],
        es: [
          'Recoger el visado de entrada tras la aprobación si está en el extranjero',
          'La misión expide un visado de trabajo sobre el permiso aprobado, y debe viajar dentro de su validez.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Photograph in the official biometric standard',
          'Uploaded with the application; a photograph that fails the format check stalls the whole file.',
        ],
        pt: [
          'Fotografia no padrão biométrico oficial',
          'Carregada com o pedido; uma foto reprovada na verificação de formato trava todo o processo.',
        ],
        es: [
          'Fotografía en el estándar biométrico oficial',
          'Se sube con la solicitud; una foto que falle la comprobación de formato bloquea todo el expediente.',
        ],
      },
      {
        en: [
          'Sector health report where the job requires it',
          'Food handling, childcare and healthcare roles need a health certificate before the first day of work.',
        ],
        pt: [
          'Laudo de saúde setorial quando a função exige',
          'Funções em manipulação de alimentos, cuidado infantil e saúde exigem atestado sanitário antes do primeiro dia de trabalho.',
        ],
        es: [
          'Informe sanitario sectorial cuando el puesto lo exige',
          'Los puestos de manipulación de alimentos, cuidado infantil y sanidad exigen certificado sanitario antes del primer día de trabajo.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Social security registration gives you public health cover',
          'The employer must register you with the social security institution before you start, and that registration is what opens access to public healthcare.',
        ],
        pt: [
          'O registo na segurança social dá cobertura pública de saúde',
          'O empregador precisa registá-lo na instituição de segurança social antes do início, e é esse registo que abre o acesso à saúde pública.',
        ],
        es: [
          'El alta en la seguridad social le da cobertura sanitaria pública',
          'El empleador debe darle de alta en la institución de seguridad social antes de empezar, y ese alta es lo que abre el acceso a la sanidad pública.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Enter and start work within the deadlines on the decision',
          'Entry must happen inside the visa window and employment must begin within a short period of the permit start date, or the permit is cancelled.',
        ],
        pt: [
          'Entrar e começar a trabalhar dentro dos prazos da decisão',
          'A entrada precisa ocorrer na janela do visto e o emprego precisa começar num curto prazo a partir da data de início da autorização, ou ela é cancelada.',
        ],
        es: [
          'Entrar y empezar a trabajar dentro de los plazos de la resolución',
          'La entrada debe producirse en la ventana del visado y el empleo debe comenzar en un plazo corto desde la fecha de inicio del permiso, o se cancela.',
        ],
      },
      {
        en: [
          'Declare your residential address to the population directorate',
          'Within twenty working days of arrival. It is a separate obligation from the permit and is checked when you renew.',
        ],
        pt: [
          'Declarar o endereço residencial na direção de população',
          'Em até vinte dias úteis da chegada. É uma obrigação separada da autorização e é conferida na renovação.',
        ],
        es: [
          'Declarar su domicilio en la dirección de población',
          'En los veinte días hábiles siguientes a la llegada. Es una obligación aparte del permiso y se comprueba al renovar.',
        ],
      },
      {
        en: [
          'Treat the permit as tied to one employer and one workplace',
          'Changing company, branch or even the registered workplace requires a fresh application. Working elsewhere in the meantime is unauthorised employment with fines for both sides.',
        ],
        pt: [
          'Tratar a autorização como vinculada a um empregador e a um local',
          'Trocar de empresa, de filial ou até do local de trabalho registado exige novo pedido. Trabalhar noutro lugar nesse meio-tempo é emprego não autorizado, com multa para os dois lados.',
        ],
        es: [
          'Tratar el permiso como ligado a un empleador y a un centro de trabajo',
          'Cambiar de empresa, de sucursal o incluso del centro registrado exige una solicitud nueva. Trabajar en otro sitio mientras tanto es empleo no autorizado, con multas para ambas partes.',
        ],
      },
      {
        en: [
          'File the extension in the window before expiry',
          'Extension requests open a fixed number of days before the end date and cannot be made once the permit has lapsed.',
        ],
        pt: [
          'Protocolar a prorrogação na janela anterior ao vencimento',
          'Os pedidos de prorrogação abrem um número fixo de dias antes da data final e não podem ser feitos depois de a autorização caducar.',
        ],
        es: [
          'Presentar la prórroga en la ventana previa al vencimiento',
          'Las prórrogas se abren un número fijo de días antes de la fecha final y no pueden pedirse una vez caducado el permiso.',
        ],
      },
      {
        en: [
          'Aim for the independent permit only after long lawful work',
          'A permit not tied to an employer exists but requires many years of lawful residence and work in Turkey first.',
        ],
        pt: [
          'Mirar a autorização independente só após longo trabalho legal',
          'Existe uma autorização não vinculada a empregador, mas ela exige antes muitos anos de residência e trabalho legais na Turquia.',
        ],
        es: [
          'Aspirar al permiso independiente solo tras un largo trabajo legal',
          'Existe un permiso no ligado a un empleador, pero exige antes muchos años de residencia y trabajo legales en Turquía.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Remember the permit gives no rights outside Turkey',
          'Turkey is outside the European Union and the Schengen area, so this document does not help you travel or work in Europe.',
        ],
        pt: [
          'Lembrar que a autorização não dá direitos fora da Turquia',
          'A Turquia está fora da União Europeia e do espaço Schengen, então este documento não ajuda a viajar nem a trabalhar na Europa.',
        ],
        es: [
          'Recordar que el permiso no da derechos fuera de Turquía',
          'Turquía está fuera de la Unión Europea y del espacio Schengen, así que este documento no ayuda a viajar ni a trabajar en Europa.',
        ],
      },
    ],
  },

  'Citizenship by Investment': {
    core_documents: [
      {
        en: [
          'Pick an eligible investment category',
          'Property purchase, a fixed capital contribution, a bank deposit, government bonds, investment fund shares or creating jobs. Each has its own minimum, and those minimums have been raised more than once.',
        ],
        pt: [
          'Escolher uma categoria de investimento elegível',
          'Compra de imóvel, aporte de capital fixo, depósito bancário, títulos públicos, cotas de fundos ou criação de empregos. Cada uma tem o seu mínimo, e esses mínimos já foram elevados mais de uma vez.',
        ],
        es: [
          'Elegir una categoría de inversión elegible',
          'Compra de inmueble, aportación de capital fijo, depósito bancario, bonos del Estado, participaciones de fondos o creación de empleo. Cada una tiene su mínimo, y esos mínimos se han elevado más de una vez.',
        ],
      },
      {
        en: [
          'Official valuation report by a licensed appraiser',
          'On the property route it is the appraised value, not the price on the contract, that has to reach the threshold. A property bought at the right price can still fail the valuation.',
        ],
        pt: [
          'Laudo de avaliação oficial por avaliador licenciado',
          'Na rota imobiliária, é o valor avaliado, e não o preço do contrato, que precisa atingir o mínimo. Um imóvel comprado pelo preço certo ainda pode reprovar na avaliação.',
        ],
        es: [
          'Informe de tasación oficial por un tasador autorizado',
          'En la vía inmobiliaria es el valor tasado, no el precio del contrato, el que debe alcanzar el umbral. Un inmueble comprado al precio correcto aún puede fallar en la tasación.',
        ],
      },
      {
        en: [
          'Certificate of conformity for the investment',
          'Issued by the ministry responsible for the chosen route, confirming the investment qualifies. Nothing proceeds without it.',
        ],
        pt: [
          'Certificado de conformidade do investimento',
          'Emitido pelo ministério responsável pela rota escolhida, confirmando que o investimento qualifica. Nada avança sem ele.',
        ],
        es: [
          'Certificado de conformidad de la inversión',
          'Emitido por el ministerio responsable de la vía elegida, que confirma que la inversión cualifica. Nada avanza sin él.',
        ],
      },
      {
        en: [
          'Title deed carrying the three-year restriction',
          'The land registry records an annotation preventing sale for three years. Buying a property that already carries someone else’s annotation does not qualify.',
        ],
        pt: [
          'Escritura com a restrição de três anos averbada',
          'O registo de imóveis averba uma anotação que impede a venda por três anos. Comprar um imóvel que já carrega a anotação de outra pessoa não qualifica.',
        ],
        es: [
          'Escritura con la restricción de tres años anotada',
          'El registro de la propiedad inscribe una anotación que impide la venta durante tres años. Comprar un inmueble que ya arrastra la anotación de otra persona no cualifica.',
        ],
      },
      {
        en: [
          'Civil status documents, apostilled and translated',
          'Birth certificates, marriage certificate and, where relevant, divorce or custody papers, all legalised in the country of origin and translated by a sworn translator in Turkey.',
        ],
        pt: [
          'Documentos de estado civil, apostilados e traduzidos',
          'Certidões de nascimento, certidão de casamento e, quando for o caso, papéis de divórcio ou guarda, todos legalizados no país de origem e traduzidos por tradutor juramentado na Turquia.',
        ],
        es: [
          'Documentos de estado civil, apostillados y traducidos',
          'Partidas de nacimiento, certificado de matrimonio y, cuando proceda, papeles de divorcio o custodia, todos legalizados en el país de origen y traducidos por traductor jurado en Turquía.',
        ],
      },
      {
        en: [
          'Investor residence permit obtained before the citizenship file',
          'A specific residence permit for investors is granted first and must be in hand when the naturalisation application is lodged.',
        ],
        pt: [
          'Autorização de residência de investidor obtida antes do processo de cidadania',
          'Uma autorização de residência específica para investidores é concedida primeiro e precisa estar em mãos quando o pedido de naturalização é protocolado.',
        ],
        es: [
          'Permiso de residencia de inversor obtenido antes del expediente de ciudadanía',
          'Primero se concede un permiso de residencia específico para inversores, que debe estar en su poder cuando se presente la solicitud de naturalización.',
        ],
      },
      {
        en: [
          'Confirm the seller is not a disqualifying party',
          'Purchases from your own family, from a company you control, or from another foreigner who previously used the same property for the programme are excluded.',
        ],
        pt: [
          'Confirmar que o vendedor não é uma parte impeditiva',
          'Compras da própria família, de empresa que você controla, ou de outro estrangeiro que já usou o mesmo imóvel no programa ficam excluídas.',
        ],
        es: [
          'Confirmar que el vendedor no es una parte excluyente',
          'Se excluyen las compras a la propia familia, a una empresa que usted controle, o a otro extranjero que ya usó el mismo inmueble para el programa.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Route the funds through a Turkish bank with proof',
          'The transfer must be documented by bank receipts showing the money entering the country in foreign currency, converted according to the rules in force. Cash payments do not count.',
        ],
        pt: [
          'Canalizar os recursos por um banco turco com comprovação',
          'A transferência precisa ser documentada por recibos bancários mostrando o dinheiro entrando no país em moeda estrangeira, convertido conforme as regras vigentes. Pagamentos em dinheiro não contam.',
        ],
        es: [
          'Canalizar los fondos por un banco turco con justificantes',
          'La transferencia debe documentarse con recibos bancarios que muestren el dinero entrando al país en divisa, convertido según las reglas vigentes. Los pagos en efectivo no cuentan.',
        ],
      },
      {
        en: [
          'Threshold measured in United States dollars, not lira',
          'The minimums are set in foreign currency, so lira devaluation does not lower the bar. Confirm the amount currently in force before committing.',
        ],
        pt: [
          'Mínimo medido em dólares americanos, não em liras',
          'Os mínimos são fixados em moeda estrangeira, então a desvalorização da lira não reduz a exigência. Confirme o montante vigente antes de se comprometer.',
        ],
        es: [
          'Umbral medido en dólares estadounidenses, no en liras',
          'Los mínimos se fijan en divisa, así que la devaluación de la lira no baja el listón. Confirme el importe vigente antes de comprometerse.',
        ],
      },
      {
        en: [
          'Hold the investment for the full three years',
          'Selling, withdrawing or redeeming early can lead to the citizenship being revoked, and the commitment is registered against the asset.',
        ],
        pt: [
          'Manter o investimento pelos três anos completos',
          'Vender, sacar ou resgatar antes pode levar à revogação da cidadania, e o compromisso fica registado contra o ativo.',
        ],
        es: [
          'Mantener la inversión los tres años completos',
          'Vender, retirar o rescatar antes puede llevar a la revocación de la ciudadanía, y el compromiso queda inscrito sobre el activo.',
        ],
      },
      {
        en: [
          'Budget the transaction costs on top of the threshold',
          'Title deed duty, appraisal, notary, sworn translation, earthquake insurance and agent commission are all extra and are not counted towards the minimum.',
        ],
        pt: [
          'Orçar os custos da transação além do mínimo',
          'Imposto de transmissão, avaliação, notário, tradução juramentada, seguro sísmico e comissão de corretagem são todos extras e não contam para o mínimo.',
        ],
        es: [
          'Presupuestar los costes de la operación además del umbral',
          'Impuesto de transmisión, tasación, notario, traducción jurada, seguro de terremoto y comisión de agencia son todos extras y no cuentan para el mínimo.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Lodge the naturalisation application at the designated directorate',
          'Filed in Turkey, with the investment certificate, the residence permit and the full civil documentation for every family member included.',
        ],
        pt: [
          'Protocolar o pedido de naturalização na direção designada',
          'Feito na Turquia, com o certificado de investimento, a autorização de residência e toda a documentação civil de cada familiar incluído.',
        ],
        es: [
          'Presentar la solicitud de naturalización en la dirección designada',
          'Se presenta en Turquía, con el certificado de inversión, el permiso de residencia y toda la documentación civil de cada familiar incluido.',
        ],
      },
      {
        en: [
          'Appear in person with the whole family',
          'Every applicant, including children, is seen and recorded. A power of attorney covers the property purchase but not this appearance.',
        ],
        pt: [
          'Comparecer pessoalmente com toda a família',
          'Cada requerente, incluindo crianças, é atendido e registado. A procuração cobre a compra do imóvel, mas não este comparecimento.',
        ],
        es: [
          'Comparecer en persona con toda la familia',
          'Cada solicitante, incluidos los niños, es atendido y registrado. El poder cubre la compra del inmueble, pero no esta comparecencia.',
        ],
      },
      {
        en: [
          'Expect the process to run in months, not weeks',
          'Even the fast investor route involves security checks, and timelines quoted by intermediaries are usually optimistic.',
        ],
        pt: [
          'Contar com meses, não semanas, de processo',
          'Mesmo a via rápida do investidor envolve verificações de segurança, e os prazos citados por intermediários costumam ser otimistas.',
        ],
        es: [
          'Contar con meses, no semanas, de tramitación',
          'Incluso la vía rápida del inversor implica controles de seguridad, y los plazos que citan los intermediarios suelen ser optimistas.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric capture for the identity card and passport',
          'Taken for each family member once citizenship is approved, at the population directorate.',
        ],
        pt: [
          'Captura biométrica para o bilhete de identidade e o passaporte',
          'Recolhida de cada familiar após a aprovação da cidadania, na direção de população.',
        ],
        es: [
          'Captura biométrica para el documento de identidad y el pasaporte',
          'Se toma a cada familiar una vez aprobada la ciudadanía, en la dirección de población.',
        ],
      },
      {
        en: [
          'No medical examination in this route',
          'Health screening is not part of the investment programme; only identity and security checks apply.',
        ],
        pt: [
          'Sem exame médico nesta rota',
          'A triagem de saúde não faz parte do programa de investimento; aplicam-se apenas verificações de identidade e segurança.',
        ],
        es: [
          'Sin examen médico en esta vía',
          'El cribado sanitario no forma parte del programa de inversión; solo se aplican controles de identidad y seguridad.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the Turkish identity card',
          'The kimlik is issued after the decision is registered and carries your citizen identity number, replacing the foreigner number.',
        ],
        pt: [
          'Retirar o bilhete de identidade turco',
          'O kimlik é emitido após o registo da decisão e traz o seu número de identidade de cidadão, substituindo o número de estrangeiro.',
        ],
        es: [
          'Recoger el documento de identidad turco',
          'El kimlik se expide tras registrar la resolución y lleva su número de identidad de ciudadano, que sustituye al número de extranjero.',
        ],
      },
      {
        en: [
          'Apply for the passport separately',
          'It is a distinct application with its own fee and booklet charge, made after the identity card exists.',
        ],
        pt: [
          'Pedir o passaporte separadamente',
          'É um pedido distinto, com taxa própria e encargo do caderno, feito depois de existir o bilhete de identidade.',
        ],
        es: [
          'Solicitar el pasaporte por separado',
          'Es una solicitud distinta, con su propia tasa y cargo por la libreta, hecha después de existir el documento de identidad.',
        ],
      },
      {
        en: [
          'Include spouse and minor children, but not adult ones',
          'The application covers the spouse and children under eighteen. Adult children need their own qualifying route.',
        ],
        pt: [
          'Incluir cônjuge e filhos menores, mas não os maiores',
          'O pedido cobre o cônjuge e os filhos com menos de dezoito anos. Filhos adultos precisam de rota qualificante própria.',
        ],
        es: [
          'Incluir al cónyuge y a los hijos menores, pero no a los adultos',
          'La solicitud cubre al cónyuge y a los hijos menores de dieciocho años. Los hijos adultos necesitan su propia vía cualificante.',
        ],
      },
      {
        en: [
          'Check what your original nationality does with dual citizenship',
          'Turkey permits holding both, but your own country may not, and some states require prior authorisation before you acquire another nationality.',
        ],
        pt: [
          'Verificar o que a sua nacionalidade original faz com a dupla cidadania',
          'A Turquia permite ter as duas, mas o seu país pode não permitir, e alguns Estados exigem autorização prévia antes de adquirir outra nacionalidade.',
        ],
        es: [
          'Comprobar qué hace su nacionalidad original con la doble ciudadanía',
          'Turquía permite tener ambas, pero su país puede no hacerlo, y algunos Estados exigen autorización previa antes de adquirir otra nacionalidad.',
        ],
      },
      {
        en: [
          'Look into the military service position for male citizens',
          'Turkish citizenship carries conscription obligations for men, with exemptions and paid alternatives that depend on age and where you were naturalised from. Get advice before, not after.',
        ],
        pt: [
          'Informar-se sobre o serviço militar para cidadãos do sexo masculino',
          'A cidadania turca traz obrigações de recrutamento para homens, com isenções e alternativas pagas que dependem da idade e da origem da naturalização. Busque orientação antes, não depois.',
        ],
        es: [
          'Informarse sobre el servicio militar para ciudadanos varones',
          'La ciudadanía turca conlleva obligaciones de reclutamiento para los hombres, con exenciones y alternativas de pago que dependen de la edad y del origen de la naturalización. Asesórese antes, no después.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Do not expect a Turkish passport to open Europe',
          'It is a strong document in many regions, but Turkey is outside the European Union and the Schengen area, so European travel still needs a visa.',
        ],
        pt: [
          'Não esperar que o passaporte turco abra a Europa',
          'É um documento forte em muitas regiões, mas a Turquia está fora da União Europeia e do espaço Schengen, então viajar à Europa continua exigindo visto.',
        ],
        es: [
          'No esperar que el pasaporte turco abra Europa',
          'Es un documento fuerte en muchas regiones, pero Turquía está fuera de la Unión Europea y del espacio Schengen, así que viajar a Europa sigue exigiendo visado.',
        ],
      },
    ],
  },
};
