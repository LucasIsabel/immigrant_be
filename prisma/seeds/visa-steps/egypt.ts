import type { CountryVisaSteps } from './types';

/**
 * Steps for Egypt.
 *
 * Entry is the easy part: many nationalities either buy the visa stamp at a
 * bank kiosk in the arrivals hall or obtain it online days before flying. What
 * follows is not. Residence is granted at the passport and immigration offices,
 * historically the Mogamma in Tahrir, in short renewable terms, and each
 * renewal rebuilds the same file from scratch.
 *
 * Work is a separate authority again. The permit comes from the manpower
 * ministry, is requested by the employer rather than the worker, includes a
 * mandatory HIV test at a designated laboratory inside Egypt, and is capped by
 * a quota limiting how large a share of a company payroll may be foreign. A
 * company already at its ceiling cannot hire you whatever your profile.
 *
 * Buying property opens a residence of its own, but only if the property is
 * fully registered at the real estate registry. A notarised sale contract is
 * not the same thing, and many resale flats have never been registered at all.
 */
export const egypt: CountryVisaSteps = {
  'Tourist Visa / e-Visa': {
    core_documents: [
      {
        en: [
          'Passport valid at least six months from arrival',
          'Checked at check-in and again at immigration. Falling short means no boarding, whatever visa you already hold.',
        ],
        pt: [
          'Passaporte válido por pelo menos seis meses a partir da chegada',
          'Conferido no check-in e de novo na imigração. Ficar aquém significa não embarcar, independentemente do visto que você já tenha.',
        ],
        es: [
          'Pasaporte vigente al menos seis meses desde la llegada',
          'Se comprueba en la facturación y otra vez en inmigración. Quedarse corto significa no embarcar, con visado o sin él.',
        ],
      },
      {
        en: [
          'Choose between the electronic visa and the visa on arrival',
          'Many nationalities can do either. The electronic visa is applied for online days ahead, while the visa on arrival is a stamp bought at a bank kiosk in the arrivals hall before you reach the passport counter.',
        ],
        pt: [
          'Escolher entre o visto eletrónico e o visto na chegada',
          'Muitas nacionalidades podem optar. O visto eletrónico é pedido online dias antes, enquanto o visto na chegada é um selo comprado num guichê de banco no saguão de desembarque, antes do balcão de passaportes.',
        ],
        es: [
          'Elegir entre el visado electrónico y el visado a la llegada',
          'Muchas nacionalidades pueden optar. El visado electrónico se solicita en línea con días de antelación, mientras que el visado a la llegada es un sello que se compra en un mostrador bancario de la sala de llegadas, antes del control de pasaportes.',
        ],
      },
      {
        en: [
          'Printed approval of the electronic visa',
          'Airlines ask for it at boarding and the immigration officer keeps a copy. A screenshot on a phone is not reliably accepted.',
        ],
        pt: [
          'Aprovação impressa do visto eletrónico',
          'As companhias pedem no embarque e o oficial de imigração fica com uma cópia. Uma captura de tela no celular não é aceita com segurança.',
        ],
        es: [
          'Aprobación impresa del visado electrónico',
          'Las aerolíneas la piden al embarcar y el funcionario de inmigración se queda una copia. Una captura de pantalla en el móvil no se acepta de forma fiable.',
        ],
      },
      {
        en: [
          'Confirmed accommodation for the first nights',
          'Hotels register foreign guests with the authorities, which is also how your presence enters the system on arrival.',
        ],
        pt: [
          'Alojamento confirmado para as primeiras noites',
          'Os hotéis registam hóspedes estrangeiros junto às autoridades, e é assim também que a sua presença entra no sistema ao chegar.',
        ],
        es: [
          'Alojamiento confirmado para las primeras noches',
          'Los hoteles registran a los huéspedes extranjeros ante las autoridades, y así es también como su presencia entra en el sistema al llegar.',
        ],
      },
      {
        en: [
          'Return or onward ticket',
          'Asked for at check-in more often than at the border, and a one-way ticket is a common reason for being refused boarding.',
        ],
        pt: [
          'Bilhete de volta ou de continuação',
          'Pedido no check-in com mais frequência do que na fronteira, e passagem só de ida é motivo comum de recusa de embarque.',
        ],
        es: [
          'Billete de vuelta o de continuación',
          'Se pide en la facturación más a menudo que en la frontera, y un billete de solo ida es motivo frecuente de denegación de embarque.',
        ],
      },
      {
        en: [
          'Understand the Sinai-only entry permission',
          'Arrivals at the Sinai resorts can receive a free permit limited to that area for a short stay. It does not allow travel to Cairo or the Nile valley, and using it that way is an immigration offence.',
        ],
        pt: [
          'Entender a permissão de entrada restrita ao Sinai',
          'Quem chega aos resorts do Sinai pode receber uma permissão gratuita limitada àquela área por poucos dias. Ela não permite ir ao Cairo nem ao vale do Nilo, e usá-la assim é infração migratória.',
        ],
        es: [
          'Entender el permiso de entrada limitado al Sinaí',
          'Quien llega a los complejos del Sinaí puede recibir un permiso gratuito limitado a esa zona por pocos días. No permite viajar a El Cairo ni al valle del Nilo, y usarlo así es una infracción migratoria.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Carry hard currency notes for the visa on arrival',
          'The bank kiosk sells the stamp against foreign currency notes in good condition. Cards, local currency and worn notes are refused.',
        ],
        pt: [
          'Levar notas em moeda forte para o visto na chegada',
          'O guichê do banco vende o selo contra notas em moeda estrangeira em bom estado. Cartões, moeda local e notas gastas são recusados.',
        ],
        es: [
          'Llevar billetes en divisa fuerte para el visado a la llegada',
          'El mostrador bancario vende el sello contra billetes en divisa extranjera en buen estado. Se rechazan tarjetas, moneda local y billetes deteriorados.',
        ],
      },
      {
        en: [
          'Proof of means for the stay',
          'Rarely requested at the airport but part of the file when a consular visa is issued, and it should match the length of the trip.',
        ],
        pt: [
          'Comprovação de meios para a estada',
          'Raramente pedida no aeroporto, mas parte do processo quando o visto é emitido no consulado, e deve ser coerente com a duração da viagem.',
        ],
        es: [
          'Prueba de medios para la estancia',
          'Rara vez se pide en el aeropuerto, pero forma parte del expediente cuando el visado se expide en consulado, y debe encajar con la duración del viaje.',
        ],
      },
      {
        en: [
          'Declare currency above the customs threshold',
          'Foreign currency above the limit must be declared on arrival, and the Egyptian pound has its own separate export limit.',
        ],
        pt: [
          'Declarar valores acima do limite aduaneiro',
          'Moeda estrangeira acima do limite precisa ser declarada na chegada, e a libra egípcia tem um limite próprio de saída.',
        ],
        es: [
          'Declarar divisas por encima del umbral aduanero',
          'La divisa extranjera por encima del límite debe declararse a la llegada, y la libra egipcia tiene su propio límite de salida.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply for the electronic visa well before departure',
          'The portal quotes a few working days but approvals can be slower, and airlines will not board a passenger with a pending request.',
        ],
        pt: [
          'Pedir o visto eletrónico bem antes da partida',
          'O portal anuncia poucos dias úteis, mas as aprovações podem demorar mais, e as companhias não embarcam passageiro com pedido em análise.',
        ],
        es: [
          'Solicitar el visado electrónico bastante antes de viajar',
          'El portal indica unos pocos días hábiles, pero las aprobaciones pueden tardar más, y las aerolíneas no embarcan a un pasajero con la solicitud pendiente.',
        ],
      },
      {
        en: [
          'Pay the visa fee in the form each channel accepts',
          'The electronic route takes a card payment while the arrivals kiosk takes cash only. Confirm the amount in force before travelling.',
        ],
        pt: [
          'Pagar a taxa do visto na forma que cada canal aceita',
          'A via eletrónica aceita pagamento com cartão, enquanto o guichê no desembarque só aceita dinheiro. Confirme o valor vigente antes de viajar.',
        ],
        es: [
          'Pagar la tasa del visado como acepte cada canal',
          'La vía electrónica admite pago con tarjeta mientras que el mostrador de llegadas solo acepta efectivo. Confirme el importe vigente antes de viajar.',
        ],
      },
      {
        en: [
          'Use a consulate for longer or multiple-entry needs',
          'Stays beyond the standard thirty days or repeated entries are handled far better by a consular visa than by extending after arrival.',
        ],
        pt: [
          'Recorrer ao consulado para estadas longas ou múltiplas entradas',
          'Permanências além dos trinta dias padrão ou entradas repetidas são muito melhor resolvidas por visto consular do que por prorrogação depois de chegar.',
        ],
        es: [
          'Acudir al consulado para estancias largas o múltiples entradas',
          'Las estancias más allá de los treinta días estándar o las entradas repetidas se resuelven mucho mejor con un visado consular que prorrogando tras la llegada.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Vaccination certificate when arriving from a risk country',
          'Yellow fever and polio requirements apply to arrivals from certain countries and are checked at the health desk before immigration.',
        ],
        pt: [
          'Certificado de vacinação ao chegar de país de risco',
          'Exigências de febre amarela e poliomielite se aplicam a quem chega de certos países e são verificadas no posto sanitário antes da imigração.',
        ],
        es: [
          'Certificado de vacunación al llegar de un país de riesgo',
          'Los requisitos de fiebre amarilla y poliomielitis se aplican a quien llega de ciertos países y se comprueban en el puesto sanitario antes de inmigración.',
        ],
        required: false,
      },
      {
        en: [
          'No medical examination for the tourist stamp',
          'Health screening belongs to the work and residence procedures, so nothing of that kind is asked of a visitor.',
        ],
        pt: [
          'Sem exame médico para o selo de turista',
          'O rastreio de saúde pertence aos procedimentos de trabalho e residência, então nada disso é pedido a um visitante.',
        ],
        es: [
          'Sin reconocimiento médico para el sello de turista',
          'El cribado sanitario pertenece a los procedimientos de trabajo y residencia, así que nada de eso se le pide a un visitante.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Check the number of days written on the stamp',
          'The tourist stamp normally runs thirty days from arrival, and the date the officer writes by hand is the one that governs.',
        ],
        pt: [
          'Conferir o número de dias escrito no carimbo',
          'O selo de turista costuma valer trinta dias a partir da chegada, e a data que o oficial escreve à mão é a que vale.',
        ],
        es: [
          'Comprobar el número de días escrito en el sello',
          'El sello de turista suele durar treinta días desde la llegada, y la fecha que el funcionario escribe a mano es la que manda.',
        ],
      },
      {
        en: [
          'Do not rely on the short grace period after expiry',
          'A brief tolerance exists, after which a fine falls due at departure and repeated overstays can bar you from returning.',
        ],
        pt: [
          'Não contar com o curto período de tolerância após o vencimento',
          'Existe uma tolerância breve, após a qual uma multa é devida na saída e excessos repetidos podem barrar o seu retorno.',
        ],
        es: [
          'No confiar en el breve periodo de gracia tras el vencimiento',
          'Existe una tolerancia corta, tras la cual se debe una multa a la salida y los excesos repetidos pueden impedirle volver.',
        ],
      },
      {
        en: [
          'Extend at the passport office before the stamp runs out',
          'Extensions are granted at the Mogamma in Tahrir or at the governorate passport office, and the queues mean starting several days early.',
        ],
        pt: [
          'Prorrogar no escritório de passaportes antes de o selo vencer',
          'As prorrogações são concedidas no Mogamma, em Tahrir, ou no escritório de passaportes do governorado, e as filas obrigam a começar com vários dias de antecedência.',
        ],
        es: [
          'Prorrogar en la oficina de pasaportes antes de que venza el sello',
          'Las prórrogas se conceden en el Mogamma de Tahrir o en la oficina de pasaportes de la gobernación, y las colas obligan a empezar con varios días de antelación.',
        ],
      },
      {
        en: [
          'Do not work or volunteer on a tourist stamp',
          'Any activity, paid or unpaid, requires the labour ministry permit. Being found working ends the stay and complicates every later application.',
        ],
        pt: [
          'Não trabalhar nem fazer voluntariado com selo de turista',
          'Qualquer atividade, remunerada ou não, exige a autorização do ministério do trabalho. Ser flagrado trabalhando encerra a estada e complica todo pedido futuro.',
        ],
        es: [
          'No trabajar ni hacer voluntariado con el sello de turista',
          'Cualquier actividad, remunerada o no, exige el permiso del ministerio de trabajo. Que le encuentren trabajando termina la estancia y complica toda solicitud posterior.',
        ],
      },
      {
        en: [
          'Keep the passport on you when travelling internally',
          'Checkpoints between governorates ask for it, and some regions require prior permission for foreign travellers.',
        ],
        pt: [
          'Levar o passaporte consigo ao viajar dentro do país',
          'Os postos de controlo entre governorados pedem o documento, e algumas regiões exigem autorização prévia para viajantes estrangeiros.',
        ],
        es: [
          'Llevar el pasaporte encima al viajar por el país',
          'Los controles entre gobernaciones lo piden, y algunas regiones exigen autorización previa para viajeros extranjeros.',
        ],
      },
    ],
  },

  'Tourist Residence Permit': {
    core_documents: [
      {
        en: [
          'Apply at the passport office of your governorate',
          'In Cairo this means the Mogamma in Tahrir or the newer complex that took over its functions. The office is determined by where you live, not by where you entered the country.',
        ],
        pt: [
          'Pedir no escritório de passaportes do seu governorado',
          'No Cairo isso significa o Mogamma, em Tahrir, ou o complexo mais novo que assumiu as funções dele. O escritório é definido por onde você mora, não por onde entrou no país.',
        ],
        es: [
          'Solicitar en la oficina de pasaportes de su gobernación',
          'En El Cairo esto significa el Mogamma de Tahrir o el complejo más nuevo que asumió sus funciones. La oficina la determina dónde vive, no por dónde entró al país.',
        ],
      },
      {
        en: [
          'Valid passport bearing the current entry stamp',
          'The application must be lodged while the stamp is still valid. Applying afterwards means settling the overstay fine before anything else is looked at.',
        ],
        pt: [
          'Passaporte válido com o carimbo de entrada atual',
          'O pedido precisa ser protocolado enquanto o carimbo ainda vale. Pedir depois significa quitar a multa por excesso antes que qualquer outra coisa seja analisada.',
        ],
        es: [
          'Pasaporte vigente con el sello de entrada actual',
          'La solicitud debe presentarse mientras el sello siga vigente. Hacerlo después implica pagar la multa por exceso antes de que se mire nada más.',
        ],
      },
      {
        en: [
          'Registered lease in your own name',
          'The contract has to be registered and accompanied by the identity card of the owner and proof of ownership. An informal arrangement with the landlord does not pass the counter.',
        ],
        pt: [
          'Contrato de arrendamento registado em seu nome',
          'O contrato precisa estar registado e acompanhado do documento de identidade do proprietário e da prova de propriedade. Um acordo informal com o senhorio não passa no balcão.',
        ],
        es: [
          'Contrato de alquiler registrado a su nombre',
          'El contrato debe estar registrado y acompañado del documento de identidad del propietario y la prueba de titularidad. Un acuerdo informal con el casero no pasa el mostrador.',
        ],
      },
      {
        en: [
          'Application form with passport photographs',
          'Completed in Arabic or with an Arabic version attached, and photographs cut to the specification the office displays.',
        ],
        pt: [
          'Formulário de pedido com fotografias tipo passe',
          'Preenchido em árabe ou com uma versão em árabe anexa, e fotografias no formato que o próprio escritório expõe.',
        ],
        es: [
          'Formulario de solicitud con fotografías de pasaporte',
          'Cumplimentado en árabe o con una versión en árabe adjunta, y fotografías en el formato que la propia oficina indica.',
        ],
      },
      {
        en: [
          'Photocopies of everything, made in advance',
          'The office expects copies of the data page, the entry stamp, the visa and the lease. The copy shop queue is longer than the counter queue.',
        ],
        pt: [
          'Fotocópias de tudo, feitas com antecedência',
          'O escritório espera cópias da página de dados, do carimbo de entrada, do visto e do contrato. A fila da copiadora é maior que a do balcão.',
        ],
        es: [
          'Fotocopias de todo, hechas de antemano',
          'La oficina espera copias de la página de datos, el sello de entrada, el visado y el contrato. La cola de la copistería es más larga que la del mostrador.',
        ],
      },
      {
        en: [
          'Letter explaining the purpose of the stay',
          'Study, family, remote work or property ownership. The ground you state is what determines the length of residence granted.',
        ],
        pt: [
          'Carta explicando a finalidade da permanência',
          'Estudo, família, trabalho remoto ou propriedade de imóvel. O fundamento declarado é o que determina o prazo de residência concedido.',
        ],
        es: [
          'Carta explicando el motivo de la estancia',
          'Estudios, familia, trabajo remoto o propiedad inmobiliaria. El motivo declarado es lo que determina el plazo de residencia concedido.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence that you can support yourself',
          'Bank statements or transfers into an Egyptian account. No figure is published, so confirm what your office is asking for that season.',
        ],
        pt: [
          'Prova de que você consegue se sustentar',
          'Extratos bancários ou transferências para uma conta egípcia. Não há valor publicado, então confirme o que o seu escritório está pedindo naquele período.',
        ],
        es: [
          'Prueba de que puede mantenerse por sí mismo',
          'Extractos bancarios o transferencias a una cuenta egipcia. No hay cifra publicada, así que confirme qué está pidiendo su oficina en ese momento.',
        ],
      },
      {
        en: [
          'Pay the residence fee in stamps at the office',
          'Settled in fiscal stamps bought inside the building, with the amount depending on the length of residence granted.',
        ],
        pt: [
          'Pagar a taxa de residência em selos no próprio escritório',
          'Quitada em selos fiscais comprados dentro do prédio, com o valor dependendo do prazo de residência concedido.',
        ],
        es: [
          'Pagar la tasa de residencia en sellos en la propia oficina',
          'Se liquida con sellos fiscales comprados dentro del edificio, y el importe depende del plazo de residencia concedido.',
        ],
      },
      {
        en: [
          'Open an Egyptian bank account early',
          'It makes incoming funds visible locally and is required for utilities, property arrangements and most contracts.',
        ],
        pt: [
          'Abrir cedo uma conta bancária egípcia',
          'Ela torna visíveis localmente os recursos que entram e é exigida para serviços, questões imobiliárias e a maioria dos contratos.',
        ],
        es: [
          'Abrir pronto una cuenta bancaria egipcia',
          'Hace visibles localmente los fondos que entran y es necesaria para los suministros, los asuntos inmobiliarios y casi todos los contratos.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Expect a short permit on a fast renewal cycle',
          'First grants are commonly six months or a year, so the renewal starts almost immediately and the file is rebuilt each time rather than updated.',
        ],
        pt: [
          'Contar com autorização curta e ciclo de renovação rápido',
          'As primeiras concessões costumam ser de seis meses ou um ano, então a renovação começa quase imediatamente e o processo é remontado do zero a cada vez, não apenas atualizado.',
        ],
        es: [
          'Contar con un permiso corto y un ciclo de renovación rápido',
          'Las primeras concesiones suelen ser de seis meses o un año, de modo que la renovación empieza casi enseguida y el expediente se rehace cada vez en vez de actualizarse.',
        ],
      },
      {
        en: [
          'Go early in the morning',
          'The office works limited hours, stops accepting new files well before closing, and Friday and Saturday are the weekend.',
        ],
        pt: [
          'Ir cedo, logo de manhã',
          'O escritório funciona em horário limitado, para de aceitar processos bem antes de fechar, e sexta e sábado são o fim de semana.',
        ],
        es: [
          'Ir temprano por la mañana',
          'La oficina abre en horario reducido, deja de admitir expedientes bastante antes de cerrar, y el viernes y el sábado son el fin de semana.',
        ],
      },
      {
        en: [
          'Keep the receipt showing the collection date',
          'The passport is retained while the residence is stamped, and the receipt is your proof of lawful status until you return for it.',
        ],
        pt: [
          'Guardar o recibo com a data de retirada',
          'O passaporte fica retido enquanto a residência é carimbada, e o recibo é a sua prova de situação regular até você voltar para buscá-lo.',
        ],
        es: [
          'Conservar el resguardo con la fecha de recogida',
          'El pasaporte queda retenido mientras se sella la residencia, y el resguardo es su prueba de situación regular hasta que vuelva a recogerlo.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Photographs and fingerprints where the category requires them',
          'Not taken for every applicant, but some grounds of residence trigger them and the office decides on the spot.',
        ],
        pt: [
          'Fotografias e impressões digitais quando a categoria exigir',
          'Não são recolhidas de todos os requerentes, mas alguns fundamentos de residência as acionam e o escritório decide na hora.',
        ],
        es: [
          'Fotografías y huellas cuando la categoría lo exija',
          'No se toman a todos los solicitantes, pero algunos motivos de residencia las activan y la oficina lo decide en el momento.',
        ],
        required: false,
      },
      {
        en: [
          'Health screening only when employment is involved',
          'This residence carries no medical test in itself, but converting to a work-based residence brings the full set of required analyses.',
        ],
        pt: [
          'Rastreio de saúde apenas quando houver emprego envolvido',
          'Esta residência não implica exame médico em si, mas convertê-la em residência baseada em trabalho traz todo o conjunto de análises exigidas.',
        ],
        es: [
          'Cribado sanitario solo cuando hay empleo de por medio',
          'Esta residencia no lleva prueba médica en sí, pero convertirla en una residencia por trabajo trae todo el conjunto de análisis exigidos.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Check the expiry date written into the passport',
          'The residence is stamped into the passport itself, so renewing the passport means transferring the residence into the new book.',
        ],
        pt: [
          'Conferir a data de validade escrita no passaporte',
          'A residência é carimbada no próprio passaporte, então renovar o passaporte implica transferir a residência para o livro novo.',
        ],
        es: [
          'Comprobar la fecha de caducidad escrita en el pasaporte',
          'La residencia se sella en el propio pasaporte, de modo que renovarlo implica trasladar la residencia al libro nuevo.',
        ],
      },
      {
        en: [
          'Start the renewal a month before it expires',
          'The renewal is the same procedure and not a lighter one, and a lapse between permits is counted as an overstay with its own fine.',
        ],
        pt: [
          'Começar a renovação um mês antes do vencimento',
          'A renovação é o mesmo procedimento, não uma versão simplificada, e um intervalo entre autorizações conta como excesso de permanência, com multa própria.',
        ],
        es: [
          'Iniciar la renovación un mes antes del vencimiento',
          'La renovación es el mismo procedimiento, no una versión ligera, y un vacío entre permisos cuenta como estancia irregular, con su propia multa.',
        ],
      },
      {
        en: [
          'Understand that this residence gives no right to work',
          'Employment requires a permit from the labour ministry. A residence granted on tourist grounds authorises the stay and nothing more.',
        ],
        pt: [
          'Entender que esta residência não dá direito ao trabalho',
          'O emprego exige autorização do ministério do trabalho. Uma residência concedida por fundamento turístico autoriza a permanência e nada além disso.',
        ],
        es: [
          'Entender que esta residencia no da derecho a trabajar',
          'El empleo exige un permiso del ministerio de trabajo. Una residencia concedida por motivos turísticos autoriza la estancia y nada más.',
        ],
      },
      {
        en: [
          'Report a change of address to the office',
          'The permit is tied to the lease you presented, and moving without updating it creates a mismatch at the next renewal.',
        ],
        pt: [
          'Comunicar mudança de endereço ao escritório',
          'A autorização está ligada ao contrato de arrendamento apresentado, e mudar sem atualizar cria uma divergência na renovação seguinte.',
        ],
        es: [
          'Comunicar el cambio de domicilio a la oficina',
          'El permiso está ligado al contrato de alquiler presentado, y mudarse sin actualizarlo crea una discrepancia en la siguiente renovación.',
        ],
      },
      {
        en: [
          'Keep every previous residence stamp',
          'Continuity of residence is what supports later long-term applications and permits for family members, and the old passports are the evidence.',
        ],
        pt: [
          'Guardar todos os carimbos de residência anteriores',
          'A continuidade da residência é o que sustenta pedidos futuros de longa duração e autorizações para familiares, e os passaportes antigos são a prova.',
        ],
        es: [
          'Conservar todos los sellos de residencia anteriores',
          'La continuidad de la residencia es lo que sostiene futuras solicitudes de larga duración y los permisos de los familiares, y los pasaportes antiguos son la prueba.',
        ],
      },
    ],
  },

  'Work Permit and Residence': {
    core_documents: [
      {
        en: [
          'Employer application to the manpower ministry',
          'The permit is requested by the company and not by the worker, and only an employer registered and tax compliant in Egypt can lodge it.',
        ],
        pt: [
          'Pedido do empregador ao ministério da mão de obra',
          'A autorização é solicitada pela empresa e não pelo trabalhador, e só um empregador registado e em dia com o fisco no Egito pode protocolar.',
        ],
        es: [
          'Solicitud del empleador al ministerio de mano de obra',
          'El permiso lo solicita la empresa y no el trabajador, y solo un empleador registrado y al corriente con Hacienda en Egipto puede presentarlo.',
        ],
      },
      {
        en: [
          'Declaration that no Egyptian can fill the post',
          'The employer signs a non-similarity statement confirming that no Egyptian holds the same position in the company, in prescribed wording.',
        ],
        pt: [
          'Declaração de que nenhum egípcio pode ocupar o cargo',
          'O empregador assina uma declaração de não similaridade confirmando que nenhum egípcio ocupa a mesma posição na empresa, em texto prescrito.',
        ],
        es: [
          'Declaración de que ningún egipcio puede cubrir el puesto',
          'El empleador firma una declaración de no similitud confirmando que ningún egipcio ocupa el mismo puesto en la empresa, con la redacción prescrita.',
        ],
      },
      {
        en: [
          'Check the foreign worker quota of the company',
          'Foreign staff may not exceed a set share of the workforce. A company already at its ceiling cannot hire you whatever your profile, and the check comes before everything else.',
        ],
        pt: [
          'Verificar a cota de trabalhadores estrangeiros da empresa',
          'O pessoal estrangeiro não pode ultrapassar uma fração definida do quadro. Uma empresa já no teto não consegue contratar você, qualquer que seja o seu perfil, e essa verificação vem antes de tudo.',
        ],
        es: [
          'Comprobar la cuota de trabajadores extranjeros de la empresa',
          'El personal extranjero no puede superar una proporción fijada de la plantilla. Una empresa que ya está en su techo no puede contratarle sea cual sea su perfil, y esa comprobación va antes que nada.',
        ],
      },
      {
        en: [
          'Passport copies and photographs to specification',
          'Certified copies of the data page and the entry stamp, with the number of photographs the ministry currently requires.',
        ],
        pt: [
          'Cópias do passaporte e fotografias no padrão exigido',
          'Cópias autenticadas da página de dados e do carimbo de entrada, com a quantidade de fotografias que o ministério exige no momento.',
        ],
        es: [
          'Copias del pasaporte y fotografías según especificación',
          'Copias compulsadas de la página de datos y del sello de entrada, con el número de fotografías que el ministerio exija en ese momento.',
        ],
      },
      {
        en: [
          'Employment contract with an Arabic version',
          'Bilingual contracts are common, but the Arabic text is the one the ministry reads and the one that prevails in a dispute.',
        ],
        pt: [
          'Contrato de trabalho com versão em árabe',
          'Contratos bilingues são comuns, mas o texto em árabe é o que o ministério lê e o que prevalece em caso de litígio.',
        ],
        es: [
          'Contrato de trabajo con versión en árabe',
          'Los contratos bilingües son habituales, pero el texto en árabe es el que lee el ministerio y el que prevalece en caso de conflicto.',
        ],
      },
      {
        en: [
          'File within thirty days of entering the country',
          'The application has to be lodged shortly after arrival. Missing that window means restarting from outside Egypt or paying penalties to continue.',
        ],
        pt: [
          'Protocolar em até trinta dias da entrada no país',
          'O pedido precisa ser apresentado logo após a chegada. Perder essa janela significa recomeçar de fora do Egito ou pagar penalidades para prosseguir.',
        ],
        es: [
          'Presentar dentro de los treinta días desde la entrada',
          'La solicitud debe presentarse poco después de llegar. Perder esa ventana implica reiniciar desde fuera de Egipto o pagar sanciones para continuar.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Degrees authenticated by the Egyptian mission abroad',
          'Certificates must be legalised by the foreign ministry of the issuing country and then by the Egyptian embassy there. Doing this after you have already arrived is very difficult.',
        ],
        pt: [
          'Diplomas autenticados pela representação egípcia no exterior',
          'Os certificados precisam ser legalizados pelo ministério das relações exteriores do país emissor e depois pela embaixada egípcia lá. Fazer isso depois de já ter chegado é muito difícil.',
        ],
        es: [
          'Títulos autenticados por la misión egipcia en el extranjero',
          'Los certificados deben legalizarse ante el ministerio de exteriores del país emisor y después ante la embajada egipcia allí. Hacerlo una vez ya ha llegado es muy difícil.',
        ],
      },
      {
        en: [
          'Syndicate membership for regulated professions',
          'Engineering, medicine, law and journalism run through professional syndicates that control who may practise, independently of the work permit.',
        ],
        pt: [
          'Filiação sindical nas profissões regulamentadas',
          'Engenharia, medicina, direito e jornalismo passam por sindicatos profissionais que controlam quem pode exercer, independentemente da autorização de trabalho.',
        ],
        es: [
          'Colegiación en las profesiones reguladas',
          'Ingeniería, medicina, derecho y periodismo pasan por colegios profesionales que controlan quién puede ejercer, al margen del permiso de trabajo.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Pay the work permit charge, which is substantial',
          'Egypt charges a significant amount per permit and per year, normally borne by the employer. Confirm the current tariff, because it is revised.',
        ],
        pt: [
          'Pagar o encargo da autorização, que é elevado',
          'O Egito cobra um valor significativo por autorização e por ano, em geral suportado pelo empregador. Confirme a tarifa vigente, porque ela é revista.',
        ],
        es: [
          'Pagar el canon del permiso, que es elevado',
          'Egipto cobra un importe significativo por permiso y por año, normalmente a cargo del empleador. Confirme la tarifa vigente, porque se revisa.',
        ],
      },
      {
        en: [
          'Registration for social insurance and payroll tax',
          'The company declares the employee to both, and that record is later the evidence of lawful continuous employment.',
        ],
        pt: [
          'Inscrição na segurança social e no imposto sobre a folha',
          'A empresa declara o empregado nos dois, e esse registo é depois a prova de emprego legal contínuo.',
        ],
        es: [
          'Alta en la seguridad social y en el impuesto sobre nóminas',
          'La empresa declara al empleado en ambos, y ese registro es después la prueba de empleo legal continuo.',
        ],
      },
      {
        en: [
          'Salary paid through an Egyptian bank',
          'Local payment supports both the renewal file and the residence application, and simplifies proving means for family members.',
        ],
        pt: [
          'Salário pago através de banco egípcio',
          'O pagamento local sustenta tanto o processo de renovação quanto o pedido de residência, e facilita comprovar meios para os familiares.',
        ],
        es: [
          'Salario pagado a través de un banco egipcio',
          'El pago local respalda tanto el expediente de renovación como la solicitud de residencia, y simplifica acreditar medios para los familiares.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Allow time for the security clearance',
          'A security check runs alongside the labour assessment and is the least predictable part of the timetable, sometimes by months.',
        ],
        pt: [
          'Prever tempo para a verificação de segurança',
          'Uma checagem de segurança corre em paralelo com a análise laboral e é a parte menos previsível do cronograma, às vezes por meses.',
        ],
        es: [
          'Prever tiempo para la verificación de seguridad',
          'Un control de seguridad corre en paralelo a la evaluación laboral y es la parte menos previsible del calendario, a veces por meses.',
        ],
      },
      {
        en: [
          'Lodge the residence application alongside the permit',
          'The work permit authorises employment while a separate stamp authorises the stay. One without the other leaves you incomplete.',
        ],
        pt: [
          'Protocolar o pedido de residência junto com a autorização',
          'A autorização de trabalho permite o emprego enquanto um carimbo separado permite a permanência. Um sem o outro deixa a sua situação incompleta.',
        ],
        es: [
          'Presentar la solicitud de residencia junto con el permiso',
          'El permiso de trabajo autoriza el empleo mientras que un sello aparte autoriza la estancia. Uno sin el otro deja su situación incompleta.',
        ],
      },
      {
        en: [
          'Keep the original permit card safe',
          'It must be produced at labour inspections, at every renewal and when the residence is stamped into the passport.',
        ],
        pt: [
          'Guardar em segurança o cartão original da autorização',
          'Ele precisa ser apresentado em fiscalizações do trabalho, em cada renovação e quando a residência é carimbada no passaporte.',
        ],
        es: [
          'Guardar a buen recaudo la tarjeta original del permiso',
          'Debe presentarse en las inspecciones de trabajo, en cada renovación y cuando se sella la residencia en el pasaporte.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'HIV test at a designated laboratory',
          'Mandatory for work permits and carried out at an approved laboratory inside Egypt. A result obtained abroad is not accepted and a positive result ends the application.',
        ],
        pt: [
          'Teste de HIV em laboratório designado',
          'Obrigatório para autorizações de trabalho e feito em laboratório aprovado dentro do Egito. Resultado obtido no exterior não é aceite e um resultado positivo encerra o pedido.',
        ],
        es: [
          'Prueba de VIH en un laboratorio designado',
          'Obligatoria para los permisos de trabajo y realizada en un laboratorio autorizado dentro de Egipto. Un resultado obtenido fuera no se acepta y un resultado positivo pone fin a la solicitud.',
        ],
      },
      {
        en: [
          'Additional analyses set by the health authority',
          'Hepatitis and general screening are commonly added to the list, and the list itself changes, so confirm it before booking the appointment.',
        ],
        pt: [
          'Análises adicionais definidas pela autoridade de saúde',
          'Hepatites e rastreio geral costumam ser acrescentados à lista, e a própria lista muda, então confirme antes de marcar a consulta.',
        ],
        es: [
          'Análisis adicionales fijados por la autoridad sanitaria',
          'Las hepatitis y un cribado general suelen añadirse a la lista, y la lista misma cambia, así que confírmela antes de pedir cita.',
        ],
      },
      {
        en: [
          'Photographs and fingerprints for the permit file',
          'Taken as part of the ministry file rather than at the passport office, and repeated at each renewal.',
        ],
        pt: [
          'Fotografias e impressões digitais para o processo da autorização',
          'Recolhidas no âmbito do processo do ministério, e não no escritório de passaportes, e repetidas a cada renovação.',
        ],
        es: [
          'Fotografías y huellas para el expediente del permiso',
          'Se toman dentro del expediente del ministerio, no en la oficina de pasaportes, y se repiten en cada renovación.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Match the residence period to the permit period',
          'The residence granted follows the permit, usually a year at a time, so the two renew together and they also lapse together.',
        ],
        pt: [
          'Alinhar o prazo da residência ao prazo da autorização',
          'A residência concedida acompanha a autorização, em geral de ano em ano, então as duas renovam juntas e também caducam juntas.',
        ],
        es: [
          'Ajustar el periodo de residencia al del permiso',
          'La residencia concedida sigue al permiso, normalmente de año en año, así que ambas se renuevan juntas y también caducan juntas.',
        ],
      },
      {
        en: [
          'Begin the renewal at least two months ahead',
          'The medical tests, the quota check and the clearance all repeat. A permit that expires before the renewal completes stops you working legally.',
        ],
        pt: [
          'Iniciar a renovação com pelo menos dois meses de antecedência',
          'Os exames médicos, a verificação de cota e a checagem de segurança se repetem. Uma autorização que vence antes de a renovação sair impede você de trabalhar legalmente.',
        ],
        es: [
          'Iniciar la renovación con al menos dos meses de antelación',
          'Las pruebas médicas, la comprobación de cuota y el control de seguridad se repiten. Un permiso que caduca antes de completar la renovación le impide trabajar legalmente.',
        ],
      },
      {
        en: [
          'Treat a change of employer as a new case',
          'The permit names the company. Resigning ends it, and the new employer starts the whole procedure again, medical tests included.',
        ],
        pt: [
          'Tratar a troca de empregador como processo novo',
          'A autorização nomeia a empresa. Pedir demissão a encerra, e o novo empregador recomeça todo o procedimento, exames médicos inclusive.',
        ],
        es: [
          'Tratar el cambio de empleador como un caso nuevo',
          'El permiso nombra a la empresa. Renunciar lo extingue, y el nuevo empleador reinicia todo el procedimiento, pruebas médicas incluidas.',
        ],
      },
      {
        en: [
          'Register dependants through their own applications',
          'Spouse and children obtain residence linked to yours but each files separately, with marriage and birth certificates authenticated the same way as your degrees.',
        ],
        pt: [
          'Registar os dependentes com pedidos próprios',
          'Cônjuge e filhos obtêm residência vinculada à sua, mas cada um protocola separadamente, com certidões de casamento e nascimento autenticadas do mesmo modo que os seus diplomas.',
        ],
        es: [
          'Registrar a los dependientes con solicitudes propias',
          'El cónyuge y los hijos obtienen residencia vinculada a la suya, pero cada uno presenta por separado, con certificados de matrimonio y nacimiento autenticados igual que sus títulos.',
        ],
      },
      {
        en: [
          'Avoid leaving the country while the file is pending',
          'The passport is often held during processing, and departing in the middle can void the application altogether.',
        ],
        pt: [
          'Evitar sair do país com o processo pendente',
          'O passaporte costuma ficar retido durante a análise, e viajar no meio pode anular completamente o pedido.',
        ],
        es: [
          'Evitar salir del país con el expediente pendiente',
          'El pasaporte suele quedar retenido durante la tramitación, y marcharse a mitad puede anular por completo la solicitud.',
        ],
      },
    ],
  },

  'Residence by Investment': {
    core_documents: [
      {
        en: [
          'Choose between the property route and the deposit route',
          'Residence can rest on buying registered property, on a foreign currency deposit, or on investing in a company. The term granted differs by route and by the amount committed.',
        ],
        pt: [
          'Escolher entre a via da propriedade e a via do depósito',
          'A residência pode se apoiar na compra de imóvel registado, num depósito em moeda estrangeira ou no investimento numa empresa. O prazo concedido varia conforme a via e o montante aplicado.',
        ],
        es: [
          'Elegir entre la vía del inmueble y la vía del depósito',
          'La residencia puede apoyarse en comprar un inmueble registrado, en un depósito en divisa extranjera o en invertir en una empresa. El plazo concedido varía según la vía y el importe comprometido.',
        ],
      },
      {
        en: [
          'Register the property at the real estate registry',
          'A notarised sale contract is not enough. Only a property fully registered at the Real Estate Publicity Department supports the application, and many resale flats have never been registered at all.',
        ],
        pt: [
          'Registar o imóvel no registo predial',
          'Um contrato de compra e venda com firma reconhecida não basta. Só um imóvel plenamente registado no Real Estate Publicity Department sustenta o pedido, e muitos apartamentos de revenda nunca foram registados.',
        ],
        es: [
          'Inscribir el inmueble en el registro de la propiedad',
          'Un contrato de compraventa ante notario no basta. Solo un inmueble plenamente inscrito en el Real Estate Publicity Department sostiene la solicitud, y muchos pisos de segunda mano nunca se han inscrito.',
        ],
      },
      {
        en: [
          'Proof that the funds arrived from abroad',
          'A certificate from an Egyptian bank showing the money came in as hard currency from outside the country. Funds moved locally do not qualify for these routes.',
        ],
        pt: [
          'Prova de que os recursos vieram do exterior',
          'Certidão de um banco egípcio mostrando que o dinheiro entrou em moeda forte vinda de fora do país. Recursos movimentados localmente não se qualificam para estas vias.',
        ],
        es: [
          'Prueba de que los fondos llegaron del extranjero',
          'Certificado de un banco egipcio que muestre que el dinero entró en divisa fuerte desde fuera del país. Los fondos movidos localmente no sirven para estas vías.',
        ],
      },
      {
        en: [
          'Valid passport and lawful status at the time of filing',
          'The application is made from inside Egypt while a tourist stamp or a previous residence is still valid, not after it has run out.',
        ],
        pt: [
          'Passaporte válido e situação regular no momento do pedido',
          'O pedido é feito de dentro do Egito enquanto o selo de turista ou uma residência anterior ainda vale, e não depois de vencer.',
        ],
        es: [
          'Pasaporte vigente y situación regular al presentar',
          'La solicitud se hace desde dentro de Egipto mientras el sello de turista o una residencia anterior siga vigente, no después de que caduque.',
        ],
      },
      {
        en: [
          'Application to the passports and immigration authority',
          'Filed at the governorate office with the ownership documents attached, and the investment authority issues the underlying approval where the route requires one.',
        ],
        pt: [
          'Pedido à autoridade de passaportes e imigração',
          'Protocolado no escritório do governorado com os documentos de propriedade anexos, e a autoridade de investimento emite a aprovação de base quando a via exige.',
        ],
        es: [
          'Solicitud a la autoridad de pasaportes e inmigración',
          'Se presenta en la oficina de la gobernación con los documentos de propiedad adjuntos, y la autoridad de inversión expide la aprobación de base cuando la vía lo exige.',
        ],
      },
      {
        en: [
          'Egyptian tax card and taxpayer registration',
          'Property and company owners are registered with the tax authority, and that certificate forms part of the residence file.',
        ],
        pt: [
          'Cartão fiscal egípcio e inscrição como contribuinte',
          'Proprietários de imóveis e de empresas são registados na autoridade fiscal, e essa certidão faz parte do processo de residência.',
        ],
        es: [
          'Tarjeta fiscal egipcia e inscripción como contribuyente',
          'Los propietarios de inmuebles y de empresas se inscriben ante la autoridad tributaria, y ese certificado forma parte del expediente de residencia.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Meet the threshold in force for the route chosen',
          'Each route has a minimum, revised periodically and sometimes expressed in dollars. Confirm the figure currently applied before committing any money.',
        ],
        pt: [
          'Atingir o limiar vigente para a via escolhida',
          'Cada via tem um mínimo, revisto periodicamente e às vezes expresso em dólares. Confirme o valor aplicado no momento antes de comprometer qualquer quantia.',
        ],
        es: [
          'Alcanzar el umbral vigente para la vía elegida',
          'Cada vía tiene un mínimo, revisado periódicamente y a veces expresado en dólares. Confirme la cifra que se aplica actualmente antes de comprometer dinero.',
        ],
      },
      {
        en: [
          'Hold the investment for the required period',
          'Selling the property or withdrawing the deposit removes the basis of the residence, and the permit falls with it at the next renewal.',
        ],
        pt: [
          'Manter o investimento pelo período exigido',
          'Vender o imóvel ou resgatar o depósito elimina a base da residência, e a autorização cai junto na renovação seguinte.',
        ],
        es: [
          'Mantener la inversión durante el periodo exigido',
          'Vender el inmueble o retirar el depósito elimina la base de la residencia, y el permiso decae con ella en la siguiente renovación.',
        ],
      },
      {
        en: [
          'Pay the permit fees and fiscal stamps',
          'Charged per applicant and settled in stamps at the office, with the amount scaling to the length of residence granted.',
        ],
        pt: [
          'Pagar as taxas da autorização e os selos fiscais',
          'Cobradas por requerente e quitadas em selos no próprio escritório, com o valor variando conforme o prazo de residência concedido.',
        ],
        es: [
          'Pagar las tasas del permiso y los sellos fiscales',
          'Se cobran por solicitante y se liquidan en sellos en la propia oficina, con un importe que escala según el plazo de residencia concedido.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Have every foreign document legalised and translated',
          'Birth and marriage certificates and company papers need the apostille or consular legalisation plus an Arabic translation before they are accepted at all.',
        ],
        pt: [
          'Legalizar e traduzir todos os documentos estrangeiros',
          'Certidões de nascimento e casamento e documentos societários precisam de apostila ou legalização consular, além de tradução para árabe, antes de serem sequer aceites.',
        ],
        es: [
          'Legalizar y traducir todos los documentos extranjeros',
          'Los certificados de nacimiento y matrimonio y los papeles societarios necesitan apostilla o legalización consular más traducción al árabe antes de que se acepten siquiera.',
        ],
      },
      {
        en: [
          'Use a lawyer for the registration stage',
          'The registry procedure is slow and technical, and an unregistered purchase is the single most common reason these applications fail.',
        ],
        pt: [
          'Contratar advogado para a etapa de registo',
          'O procedimento no registo é lento e técnico, e uma compra não registada é de longe o motivo mais comum de esses pedidos fracassarem.',
        ],
        es: [
          'Contratar un abogado para la etapa de inscripción',
          'El procedimiento registral es lento y técnico, y una compra sin inscribir es con diferencia el motivo más común de que estas solicitudes fracasen.',
        ],
      },
      {
        en: [
          'Expect the first term to be shorter than advertised',
          'Longer periods are tied to higher amounts, and the office grants what the file actually proves rather than what a brochure promised.',
        ],
        pt: [
          'Contar que o primeiro prazo seja menor que o anunciado',
          'Prazos mais longos estão atrelados a valores mais altos, e o escritório concede o que o processo realmente comprova, não o que um folheto prometeu.',
        ],
        es: [
          'Contar con que el primer plazo sea menor que el anunciado',
          'Los plazos más largos están ligados a importes mayores, y la oficina concede lo que el expediente realmente acredita, no lo que prometió un folleto.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Photographs and fingerprints at the passport office',
          'Taken when the file is accepted, for the investor and for any family member included in the same application.',
        ],
        pt: [
          'Fotografias e impressões digitais no escritório de passaportes',
          'Recolhidas quando o processo é aceite, do investidor e de qualquer familiar incluído no mesmo pedido.',
        ],
        es: [
          'Fotografías y huellas en la oficina de pasaportes',
          'Se toman cuando se acepta el expediente, al inversor y a cualquier familiar incluido en la misma solicitud.',
        ],
      },
      {
        en: [
          'Medical tests only if you take up employment',
          'Pure investment residence carries no health screening, but accepting a salaried role adds the full work permit procedure with its own analyses.',
        ],
        pt: [
          'Exames médicos apenas se você passar a trabalhar',
          'A residência puramente por investimento não implica rastreio de saúde, mas aceitar um cargo assalariado acrescenta todo o procedimento de autorização de trabalho, com as análises próprias.',
        ],
        es: [
          'Pruebas médicas solo si pasa a trabajar por cuenta ajena',
          'La residencia puramente por inversión no lleva cribado sanitario, pero aceptar un puesto asalariado añade todo el procedimiento de permiso de trabajo con sus propios análisis.',
        ],
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Check the term stamped into the passport',
          'The residence is written into the passport, so verify the period granted matches the route you applied under before leaving the office.',
        ],
        pt: [
          'Conferir o prazo carimbado no passaporte',
          'A residência é escrita no passaporte, então confirme que o período concedido corresponde à via pela qual você pediu antes de sair do escritório.',
        ],
        es: [
          'Comprobar el plazo sellado en el pasaporte',
          'La residencia se escribe en el pasaporte, así que verifique que el periodo concedido coincide con la vía por la que solicitó antes de salir de la oficina.',
        ],
      },
      {
        en: [
          'Renew with fresh proof that the investment still exists',
          'Each renewal repeats the ownership or deposit evidence, and a registration left incomplete means the renewal is refused.',
        ],
        pt: [
          'Renovar com prova atualizada de que o investimento persiste',
          'Cada renovação repete a comprovação de propriedade ou de depósito, e um registo deixado incompleto faz a renovação ser negada.',
        ],
        es: [
          'Renovar con prueba actualizada de que la inversión sigue',
          'Cada renovación repite la acreditación de propiedad o de depósito, y una inscripción dejada incompleta hace que se deniegue la renovación.',
        ],
      },
      {
        en: [
          'Remember that this residence does not authorise work',
          'Managing your own property is one thing; being employed requires the labour ministry permit and counts against the employer quota.',
        ],
        pt: [
          'Lembrar que esta residência não autoriza trabalho',
          'Administrar o próprio imóvel é uma coisa; ser empregado exige a autorização do ministério do trabalho e conta na cota do empregador.',
        ],
        es: [
          'Recordar que esta residencia no autoriza a trabajar',
          'Gestionar su propio inmueble es una cosa; estar empleado exige el permiso del ministerio de trabajo y computa en la cuota del empleador.',
        ],
      },
      {
        en: [
          'Include family members in the same file',
          'Spouse and minor children can be attached to the investor residence, each with civil documents legalised and translated in advance.',
        ],
        pt: [
          'Incluir os familiares no mesmo processo',
          'Cônjuge e filhos menores podem ser vinculados à residência do investidor, cada um com documentos civis legalizados e traduzidos com antecedência.',
        ],
        es: [
          'Incluir a los familiares en el mismo expediente',
          'El cónyuge y los hijos menores pueden vincularse a la residencia del inversor, cada uno con documentos civiles legalizados y traducidos de antemano.',
        ],
      },
      {
        en: [
          'Treat citizenship by investment as a separate programme',
          'Egypt runs a distinct nationality scheme with much higher thresholds and a non-refundable component. It is not an automatic extension of this residence.',
        ],
        pt: [
          'Tratar a cidadania por investimento como programa separado',
          'O Egito mantém um esquema de nacionalidade distinto, com limiares muito mais altos e um componente não reembolsável. Não é uma extensão automática desta residência.',
        ],
        es: [
          'Tratar la ciudadanía por inversión como un programa aparte',
          'Egipto mantiene un esquema de nacionalidad distinto, con umbrales mucho más altos y un componente no reembolsable. No es una extensión automática de esta residencia.',
        ],
      },
    ],
  },
};
