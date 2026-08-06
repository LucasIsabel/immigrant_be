import type { CountryVisaSteps } from './types';

/**
 * Steps for Poland.
 *
 * Residence permits are decided by the voivodeship office of the province where
 * you actually live, not by the consulate that issued the visa. Mazowieckie,
 * covering Warsaw, is notorious: appointment slots are booked months ahead and
 * decisions routinely overrun the statutory deadline. The application has to be
 * lodged no later than the last day of legal stay, or it is left unexamined
 * regardless of how strong it is.
 *
 * Work is split in two. Nationals of a small group of neighbouring countries can
 * be employed on a simple employer declaration; everyone else needs a work
 * permit. A 2025 reform rewrote the employment rules and moved much of the
 * procedure into an electronic system, so guides written before it describe
 * steps that no longer exist.
 *
 * The PESEL number is the key to ordinary life: health care, taxes and the
 * trusted profile used for online administration all hang off it, and it does
 * not arrive with the visa.
 */
export const poland: CountryVisaSteps = {
  'Schengen Visa (Type C, up to 90 days)': {
    core_documents: [
      {
        en: [
          'Passport issued within the last ten years',
          'Valid for at least three months beyond the intended departure, with two free pages for the sticker.',
        ],
        pt: [
          'Passaporte emitido nos últimos dez anos',
          'Válido por pelo menos três meses além da saída prevista, com duas páginas livres para o autocolante.',
        ],
        es: [
          'Pasaporte emitido en los últimos diez años',
          'Vigente al menos tres meses más allá de la salida prevista, con dos páginas libres para la etiqueta.',
        ],
      },
      {
        en: [
          'Registration in the consular appointment system',
          'Poland runs applications through its own online system. The form is completed there, printed and signed, and the printout has to match the online record exactly.',
        ],
        pt: [
          'Registo no sistema consular de agendamento',
          'A Polónia conduz os pedidos por um sistema online próprio. O formulário é preenchido lá, impresso e assinado, e a impressão tem de bater exatamente com o registo online.',
        ],
        es: [
          'Registro en el sistema consular de citas',
          'Polonia tramita las solicitudes por un sistema en línea propio. El formulario se rellena allí, se imprime y se firma, y la copia impresa debe coincidir exactamente con el registro en línea.',
        ],
      },
      {
        en: [
          'Photograph in the Polish format',
          'Colour, light background, taken in the last six months; the required size differs from that of some other Schengen states.',
        ],
        pt: [
          'Fotografia no formato polaco',
          'A cores, fundo claro, tirada nos últimos seis meses; o tamanho exigido difere do de alguns outros Estados Schengen.',
        ],
        es: [
          'Fotografía en el formato polaco',
          'En color, fondo claro, tomada en los últimos seis meses; el tamaño exigido difiere del de algunos otros Estados Schengen.',
        ],
      },
      {
        en: [
          'Travel medical insurance for the whole trip',
          'At least 30,000 euros of cover, valid in every Schengen state and for every single day of the visa requested.',
        ],
        pt: [
          'Seguro médico de viagem para toda a viagem',
          'Cobertura mínima de 30 mil euros, válida em todos os Estados Schengen e em cada dia do visto pedido.',
        ],
        es: [
          'Seguro médico de viaje para todo el viaje',
          'Cobertura mínima de 30 mil euros, válida en todos los Estados Schengen y en cada día del visado solicitado.',
        ],
      },
      {
        en: [
          'Proof of accommodation for the whole stay',
          'Hotel bookings, or an invitation entered by the host in the register kept by the provincial office. A private letter written by hand is routinely refused.',
        ],
        pt: [
          'Comprovação de alojamento para toda a estada',
          'Reservas de hotel, ou um convite inscrito pelo anfitrião no registo mantido pelo serviço provincial. Uma carta particular escrita à mão é rotineiramente recusada.',
        ],
        es: [
          'Prueba de alojamiento para toda la estancia',
          'Reservas de hotel, o una invitación inscrita por el anfitrión en el registro que lleva la oficina provincial. Una carta particular manuscrita se rechaza de forma rutinaria.',
        ],
      },
      {
        en: [
          'Return or onward transport reservation',
          'A confirmed booking that matches the dates on the form; buying the ticket outright before the decision is a risk you do not need to take.',
        ],
        pt: [
          'Reserva de transporte de volta ou de continuação',
          'Uma reserva confirmada coerente com as datas do formulário; comprar o bilhete antes da decisão é um risco desnecessário.',
        ],
        es: [
          'Reserva de transporte de vuelta o de continuación',
          'Una reserva confirmada acorde con las fechas del formulario; comprar el billete antes de la resolución es un riesgo innecesario.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Means of subsistence at the rate set by regulation',
          'Poland fixes a daily amount per person by regulation, with a higher figure for very short trips and a separate sum for the return journey. Confirm the current rate.',
        ],
        pt: [
          'Meios de subsistência à taxa fixada por regulamento',
          'A Polónia fixa por regulamento um valor diário por pessoa, com um valor maior para viagens muito curtas e uma quantia separada para o regresso. Confirme a taxa atual.',
        ],
        es: [
          'Medios de subsistencia según la tarifa fijada por reglamento',
          'Polonia fija por reglamento un importe diario por persona, con una cifra mayor para viajes muy cortos y una suma aparte para el regreso. Confirme la tarifa actual.',
        ],
      },
      {
        en: [
          'Bank statements covering three months',
          'Regular movement over the period counts for more than a single large deposit made shortly before the appointment.',
        ],
        pt: [
          'Extratos bancários cobrindo três meses',
          'Movimentação regular no período pesa mais do que um único depósito grande feito pouco antes do atendimento.',
        ],
        es: [
          'Extractos bancarios de tres meses',
          'El movimiento regular durante el periodo pesa más que un único ingreso grande hecho poco antes de la cita.',
        ],
      },
      {
        en: [
          'Documents showing your situation at home',
          'Work, studies or a registered business. The consulate weighs the reason you would come back at least as heavily as the funds.',
        ],
        pt: [
          'Documentos que mostrem a sua situação no país de origem',
          'Trabalho, estudos ou empresa registada. O consulado pesa o motivo do seu regresso pelo menos tanto quanto os recursos.',
        ],
        es: [
          'Documentos que muestren su situación en el país de origen',
          'Trabajo, estudios o empresa registrada. El consulado pondera el motivo de su regreso al menos tanto como los fondos.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Book the appointment at the consulate with jurisdiction',
          'Consulates cover fixed regions, and applying at the wrong one wastes the slot. In high-demand posts the slots are gone weeks in advance.',
        ],
        pt: [
          'Agendar no consulado com jurisdição sobre a sua área',
          'Os consulados cobrem regiões fixas, e pedir no errado desperdiça a vaga. Nos postos mais procurados as vagas acabam semanas antes.',
        ],
        es: [
          'Reservar cita en el consulado con jurisdicción sobre su zona',
          'Los consulados cubren regiones fijas, y solicitar en el equivocado desperdicia la cita. En los puestos más solicitados las citas se agotan semanas antes.',
        ],
      },
      {
        en: [
          'Pay the visa fee at submission',
          'Charged per applicant, including children, and not refunded on refusal. Confirm the amount and the accepted payment method beforehand.',
        ],
        pt: [
          'Pagar a taxa de visto no momento da entrega',
          'Cobrada por requerente, incluindo crianças, e não devolvida em caso de recusa. Confirme antes o valor e a forma de pagamento aceite.',
        ],
        es: [
          'Pagar la tasa de visado al presentar',
          'Se cobra por solicitante, incluidos los menores, y no se devuelve si deniegan. Confirme antes el importe y el medio de pago aceptado.',
        ],
      },
      {
        en: [
          'Appear in person with the original documents',
          'Copies stay in the file and originals are checked at the counter; a missing original ends the appointment and the slot is lost.',
        ],
        pt: [
          'Comparecer pessoalmente com os documentos originais',
          'As cópias ficam no processo e os originais são conferidos no balcão; a falta de um original encerra o atendimento e a vaga é perdida.',
        ],
        es: [
          'Comparecer en persona con los documentos originales',
          'Las copias se quedan en el expediente y los originales se revisan en el mostrador; la falta de un original termina la cita y se pierde el turno.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints and facial image',
          'Stored across the Schengen area for 59 months, so a recent visa from any member state may exempt you.',
        ],
        pt: [
          'Impressões digitais e imagem facial',
          'Guardadas no espaço Schengen por 59 meses, então um visto recente de qualquer Estado-membro pode dispensá-lo.',
        ],
        es: [
          'Huellas dactilares e imagen facial',
          'Se conservan en el espacio Schengen durante 59 meses, así que un visado reciente de cualquier Estado miembro puede eximirle.',
        ],
      },
      {
        en: [
          'Medical examination',
          'Not required for a short stay; only the insurance is looked at.',
        ],
        pt: [
          'Exame médico',
          'Não exigido em estada curta; olha-se apenas para o seguro.',
        ],
        es: [
          'Examen médico',
          'No se exige en estancia corta; solo se mira el seguro.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Check the visa sticker before leaving the consulate',
          'Number of entries, period of validity and number of days allowed are three separate fields, and only the last one is the length of your stay.',
        ],
        pt: [
          'Conferir o autocolante do visto antes de sair do consulado',
          'Número de entradas, período de validade e número de dias permitidos são três campos distintos, e só o último é a duração da sua estada.',
        ],
        es: [
          'Revisar la etiqueta del visado antes de salir del consulado',
          'Número de entradas, periodo de validez y número de días permitidos son tres campos distintos, y solo el último es la duración de su estancia.',
        ],
      },
      {
        en: [
          'Keep within 90 days in any 180 days',
          'Counted for the whole Schengen area, and Polish border guards check the travel history at the crossing.',
        ],
        pt: [
          'Manter-se dentro de 90 dias em cada 180',
          'Contados para todo o espaço Schengen, e a guarda de fronteira polaca verifica o histórico de viagens na passagem.',
        ],
        es: [
          'Mantenerse dentro de 90 días en cada 180',
          'Se cuentan para todo el espacio Schengen, y la guardia de fronteras polaca revisa el historial de viajes en el paso.',
        ],
      },
      {
        en: [
          'Register your address if you stay over thirty days',
          'Zameldowanie is filed at the municipal office and is free. A hotel does it automatically; a private host does not, and the duty is yours.',
        ],
        pt: [
          'Registar a morada se ficar mais de trinta dias',
          'O zameldowanie é feito no serviço municipal e é gratuito. O hotel trata disso automaticamente; um anfitrião particular não, e o dever é seu.',
        ],
        es: [
          'Empadronarse si permanece más de treinta días',
          'El zameldowanie se hace en la oficina municipal y es gratuito. El hotel lo tramita automáticamente; un anfitrión particular no, y el deber es suyo.',
        ],
      },
      {
        en: [
          'Do not work while on a visitor visa',
          'Poland requires a separate work title even for a few days of paid work; being caught brings an entry ban recorded in the national register.',
        ],
        pt: [
          'Não trabalhar com visto de visitante',
          'A Polónia exige um título de trabalho separado mesmo para poucos dias de trabalho remunerado; ser apanhado gera proibição de entrada registada no registo nacional.',
        ],
        es: [
          'No trabajar con un visado de visitante',
          'Polonia exige un título de trabajo aparte incluso para unos pocos días remunerados; ser descubierto acarrea una prohibición de entrada inscrita en el registro nacional.',
        ],
      },
    ],
  },

  'National Visa (Type D, stays over 90 days up to 1 year)': {
    core_documents: [
      {
        en: [
          'Passport valid beyond the visa requested',
          'It has to stay valid at least three months after the visa expires and hold enough free pages for the sticker and the stamps.',
        ],
        pt: [
          'Passaporte válido para além do visto pedido',
          'Tem de permanecer válido pelo menos três meses após o fim do visto e ter páginas livres suficientes para o autocolante e os carimbos.',
        ],
        es: [
          'Pasaporte vigente más allá del visado solicitado',
          'Debe seguir vigente al menos tres meses tras la caducidad del visado y tener páginas libres para la etiqueta y los sellos.',
        ],
      },
      {
        en: [
          'National visa application completed online and signed',
          'The purpose chosen in the system decides which annexes are demanded and cannot be changed afterwards without starting a new application.',
        ],
        pt: [
          'Pedido de visto nacional preenchido online e assinado',
          'A finalidade escolhida no sistema define quais anexos são exigidos e não pode ser alterada depois sem iniciar um novo pedido.',
        ],
        es: [
          'Solicitud de visado nacional cumplimentada en línea y firmada',
          'La finalidad elegida en el sistema determina qué anexos se exigen y no puede cambiarse después sin iniciar una solicitud nueva.',
        ],
      },
      {
        en: [
          'Document proving the ground for the long stay',
          'A work permit, an employer declaration, a letter of admission or a company registration. A national visa is never granted without one of them.',
        ],
        pt: [
          'Documento que comprove o fundamento da estada longa',
          'Uma autorização de trabalho, uma declaração do empregador, uma carta de admissão ou o registo de empresa. Um visto nacional nunca é concedido sem um deles.',
        ],
        es: [
          'Documento que acredite el fundamento de la estancia larga',
          'Un permiso de trabajo, una declaración del empleador, una carta de admisión o el registro de una empresa. Un visado nacional nunca se concede sin uno de ellos.',
        ],
      },
      {
        en: [
          'Photograph to the Polish specification',
          'The same format as for the short-stay file, and equally rejected at the counter when the size is wrong.',
        ],
        pt: [
          'Fotografia na especificação polaca',
          'O mesmo formato do processo de curta duração, e igualmente recusada no balcão quando o tamanho está errado.',
        ],
        es: [
          'Fotografía según la especificación polaca',
          'El mismo formato que en el expediente de corta estancia, e igualmente rechazada en el mostrador si el tamaño no es correcto.',
        ],
      },
      {
        en: [
          'Insurance covering the entire visa period',
          'Travel cover of at least 30,000 euros until Polish public insurance starts through employment or voluntary contributions; a gap of even a week is queried.',
        ],
        pt: [
          'Seguro cobrindo todo o período do visto',
          'Cobertura de viagem de pelo menos 30 mil euros até o seguro público polaco começar por vínculo laboral ou contribuições voluntárias; um intervalo de uma semana já é questionado.',
        ],
        es: [
          'Seguro que cubra todo el periodo del visado',
          'Cobertura de viaje de al menos 30 mil euros hasta que empiece el seguro público polaco por empleo o cotizaciones voluntarias; un vacío de una semana ya se cuestiona.',
        ],
      },
      {
        en: [
          'Proof of a place to live in Poland',
          'A lease, or an accommodation statement from the employer or the university, with the address you will later register.',
        ],
        pt: [
          'Comprovação de local de residência na Polónia',
          'Um contrato de arrendamento, ou uma declaração de alojamento do empregador ou da universidade, com a morada que você depois vai registar.',
        ],
        es: [
          'Prueba de un lugar donde vivir en Polonia',
          'Un contrato de alquiler, o una declaración de alojamiento del empleador o de la universidad, con la dirección que después empadronará.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Admission letter and previous diplomas',
          'For study purposes the diplomas need an apostille and a sworn translation into Polish; an unsworn translation is sent back.',
        ],
        pt: [
          'Carta de admissão e diplomas anteriores',
          'Para fins de estudo os diplomas precisam de apostila e tradução juramentada para polaco; tradução simples é devolvida.',
        ],
        es: [
          'Carta de admisión y títulos anteriores',
          'Para estudios los títulos requieren apostilla y traducción jurada al polaco; una traducción simple se devuelve.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Proof of the language of instruction',
          'Universities set the level, but the consulate may probe whether the course and your language actually match, because enrolments used purely to obtain a visa are a known problem.',
        ],
        pt: [
          'Comprovação do idioma de ensino',
          'As universidades definem o nível, mas o consulado pode sondar se o curso e o seu idioma realmente combinam, porque matrículas feitas só para obter visto são um problema conhecido.',
        ],
        es: [
          'Prueba del idioma de instrucción',
          'Las universidades fijan el nivel, pero el consulado puede indagar si el curso y su idioma encajan de verdad, porque las matrículas hechas solo para lograr un visado son un problema conocido.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Funds for the whole stay and for the return',
          'Set per month by regulation and higher than the tourist figure. A salary contract can cover part of it, but the first months usually have to be shown as savings.',
        ],
        pt: [
          'Recursos para toda a estada e para o regresso',
          'Definidos por mês em regulamento e superiores ao valor turístico. Um contrato de trabalho pode cobrir parte, mas os primeiros meses costumam ter de ser mostrados como poupança.',
        ],
        es: [
          'Fondos para toda la estancia y para el regreso',
          'Fijados por mes en el reglamento y superiores a la cifra turística. Un contrato laboral puede cubrir una parte, pero los primeros meses suelen tener que acreditarse como ahorro.',
        ],
      },
      {
        en: [
          'Bank statements or a sponsor declaration',
          'A sponsor has to document their own income, not merely sign a promise; unsupported declarations carry almost no weight.',
        ],
        pt: [
          'Extratos bancários ou declaração de patrocinador',
          'O patrocinador tem de documentar o próprio rendimento, não apenas assinar uma promessa; declarações sem comprovação quase não pesam.',
        ],
        es: [
          'Extractos bancarios o declaración de un patrocinador',
          'El patrocinador debe documentar sus propios ingresos, no solo firmar una promesa; las declaraciones sin respaldo apenas pesan.',
        ],
      },
      {
        en: [
          'Pay the national visa fee',
          'Charged in the currency used by the consulate and not refunded if the application is refused; the amount differs from the Schengen fee.',
        ],
        pt: [
          'Pagar a taxa do visto nacional',
          'Cobrada na moeda usada pelo consulado e não devolvida se o pedido for recusado; o valor difere da taxa Schengen.',
        ],
        es: [
          'Pagar la tasa del visado nacional',
          'Se cobra en la moneda que usa el consulado y no se devuelve si deniegan la solicitud; el importe difiere de la tasa Schengen.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Submit in person at the competent consulate',
          'National visas are only issued abroad. A tourist stay inside Poland cannot be converted into one, whatever an agency promises.',
        ],
        pt: [
          'Entregar pessoalmente no consulado competente',
          'Vistos nacionais só são emitidos no exterior. Uma estada de turismo dentro da Polónia não pode ser convertida num, prometa o que prometer uma agência.',
        ],
        es: [
          'Presentar en persona en el consulado competente',
          'Los visados nacionales solo se expiden en el extranjero. Una estancia turística dentro de Polonia no puede convertirse en uno, prometa lo que prometa una agencia.',
        ],
      },
      {
        en: [
          'Allow for processing longer than a short-stay case',
          'The statutory limit for a national visa is longer, and busy posts use it in full; booking flights around the optimistic case is how people lose money.',
        ],
        pt: [
          'Contar com prazo maior do que num processo de curta duração',
          'O limite legal do visto nacional é maior, e os postos movimentados usam-no por inteiro; comprar voos com base no cenário otimista é como se perde dinheiro.',
        ],
        es: [
          'Contar con un plazo mayor que en un expediente de corta estancia',
          'El límite legal del visado nacional es más largo, y los puestos con mucha demanda lo agotan; comprar vuelos según el escenario optimista es como se pierde dinero.',
        ],
      },
      {
        en: [
          'Keep a complete copy of the file',
          'The provincial office will ask for the same documents when you apply for the residence card, and consulates do not return what they keep.',
        ],
        pt: [
          'Guardar uma cópia completa do processo',
          'O serviço provincial vai pedir os mesmos documentos quando você requerer o cartão de residência, e os consulados não devolvem o que retêm.',
        ],
        es: [
          'Conservar una copia completa del expediente',
          'La oficina provincial pedirá los mismos documentos cuando solicite la tarjeta de residencia, y los consulados no devuelven lo que retienen.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data taken at the consulate',
          'Collected at the same appointment as the submission; the Schengen exemption for recent fingerprints does not apply to national visas.',
        ],
        pt: [
          'Dados biométricos recolhidos no consulado',
          'Colhidos no mesmo atendimento da entrega; a dispensa Schengen por impressões recentes não se aplica a vistos nacionais.',
        ],
        es: [
          'Datos biométricos tomados en el consulado',
          'Se recogen en la misma cita de la presentación; la exención Schengen por huellas recientes no se aplica a los visados nacionales.',
        ],
      },
      {
        en: [
          'No health screening in the standard case',
          'Medical documents are only requested for specific purposes, such as certain regulated jobs or medical treatment as the ground of stay.',
        ],
        pt: [
          'Sem triagem de saúde no caso padrão',
          'Documentos médicos só são pedidos para finalidades específicas, como certas profissões regulamentadas ou tratamento médico como fundamento da estada.',
        ],
        es: [
          'Sin cribado sanitario en el caso estándar',
          'Los documentos médicos solo se piden para finalidades concretas, como ciertas profesiones reguladas o el tratamiento médico como motivo de la estancia.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Enter Poland and begin the declared activity',
          'The purpose written on the visa is what the border guard and, later, the provincial office will hold you to; drifting into something else undermines the next application.',
        ],
        pt: [
          'Entrar na Polónia e iniciar a atividade declarada',
          'A finalidade escrita no visto é aquela que a guarda de fronteira e, depois, o serviço provincial vão cobrar; desviar-se para outra coisa mina o pedido seguinte.',
        ],
        es: [
          'Entrar en Polonia y comenzar la actividad declarada',
          'La finalidad escrita en el visado es la que le exigirán la guardia de fronteras y, después, la oficina provincial; desviarse hacia otra cosa debilita la siguiente solicitud.',
        ],
      },
      {
        en: [
          'Obtain a PESEL number',
          'Requested at the municipal office. Without it you cannot use public health care properly, file taxes cleanly or set up the trusted profile that most online administration requires.',
        ],
        pt: [
          'Obter o número PESEL',
          'Pedido no serviço municipal. Sem ele você não usa bem a saúde pública, não declara impostos de forma limpa nem cria o perfil confiável que a administração online exige.',
        ],
        es: [
          'Obtener el número PESEL',
          'Se solicita en la oficina municipal. Sin él no puede usar bien la sanidad pública, ni declarar impuestos con orden, ni crear el perfil de confianza que exige la administración en línea.',
        ],
      },
      {
        en: [
          'Confirm that the employer registered you for social insurance',
          'Registration is due within days of starting work. If it is missing, your insurance is void and the gap shows up years later in the permanent residence file.',
        ],
        pt: [
          'Confirmar que o empregador o inscreveu na segurança social',
          'A inscrição é devida poucos dias após o início do trabalho. Se faltar, o seu seguro é nulo e a lacuna reaparece anos depois no processo de residência permanente.',
        ],
        es: [
          'Confirmar que el empleador le dio de alta en la seguridad social',
          'El alta debe hacerse a los pocos días de empezar a trabajar. Si falta, su seguro es nulo y el vacío reaparece años después en el expediente de residencia permanente.',
        ],
      },
      {
        en: [
          'File the address registration within thirty days',
          'Done at the municipality of the address; the landlord has to consent, which is worth agreeing before you sign the lease rather than after.',
        ],
        pt: [
          'Fazer o registo de morada em até trinta dias',
          'Feito no município da morada; o senhorio tem de consentir, algo que vale acordar antes de assinar o contrato e não depois.',
        ],
        es: [
          'Realizar el empadronamiento en treinta días',
          'Se hace en el municipio de la dirección; el arrendador debe consentir, algo que conviene pactar antes de firmar el contrato y no después.',
        ],
      },
      {
        en: [
          'Apply for a residence card before the visa runs out',
          'A national visa cannot normally be extended inside Poland. The next step is a temporary residence permit, and it has to be lodged while the visa is still valid.',
        ],
        pt: [
          'Pedir o cartão de residência antes de o visto terminar',
          'Um visto nacional normalmente não é prorrogado dentro da Polónia. O passo seguinte é a autorização de residência temporária, e tem de ser pedida com o visto ainda válido.',
        ],
        es: [
          'Solicitar la tarjeta de residencia antes de que caduque el visado',
          'Un visado nacional normalmente no se prorroga dentro de Polonia. El paso siguiente es el permiso de residencia temporal, y debe presentarse con el visado aún vigente.',
        ],
      },
    ],
  },

  'Temporary Residence Permit (karta pobytu)': {
    core_documents: [
      {
        en: [
          'Book the appointment at the voivodeship office months ahead',
          'The office of the province where you live decides the case. In Mazowieckie the wait for a slot is measured in months, so the appointment is booked before the file is even complete.',
        ],
        pt: [
          'Agendar no urząd wojewódzki com meses de antecedência',
          'O serviço da província onde você mora decide o processo. Em Mazowieckie a espera por uma vaga mede-se em meses, então o agendamento é feito antes mesmo de o processo estar completo.',
        ],
        es: [
          'Reservar cita en el urząd wojewódzki con meses de antelación',
          'La oficina de la provincia donde vive resuelve el caso. En Mazowieckie la espera por un turno se mide en meses, así que la cita se reserva antes incluso de completar el expediente.',
        ],
      },
      {
        en: [
          'Application form in the version currently published',
          'The form is revised periodically and offices reject superseded versions outright, so download it the week you file rather than reusing a copy from a forum.',
        ],
        pt: [
          'Formulário de pedido na versão atualmente publicada',
          'O formulário é revisto periodicamente e os serviços recusam versões antigas de imediato, então baixe-o na semana da entrega em vez de reaproveitar uma cópia de fórum.',
        ],
        es: [
          'Formulario de solicitud en la versión publicada actualmente',
          'El formulario se revisa periódicamente y las oficinas rechazan de plano las versiones superadas, así que descárguelo la semana en que presente y no reutilice una copia de un foro.',
        ],
      },
      {
        en: [
          'Passport plus photocopies of every used page',
          'The complete set is expected, and some provinces also want the blank visa pages copied. Missing pages are the classic reason a file is held as incomplete.',
        ],
        pt: [
          'Passaporte e fotocópias de todas as páginas usadas',
          'Espera-se o conjunto completo, e algumas províncias querem também as páginas de visto em branco. Páginas em falta são o motivo clássico de o processo ficar incompleto.',
        ],
        es: [
          'Pasaporte y fotocopias de todas las páginas usadas',
          'Se espera el juego completo, y algunas provincias quieren también copiadas las páginas de visado en blanco. Las páginas que faltan son la causa clásica de un expediente incompleto.',
        ],
      },
      {
        en: [
          'Four photographs to the Polish standard',
          'More than most countries ask for, and they must be recent; reusing the consulate photo from a year earlier is refused.',
        ],
        pt: [
          'Quatro fotografias no padrão polaco',
          'Mais do que a maioria dos países pede, e têm de ser recentes; reaproveitar a foto do consulado de um ano atrás é recusado.',
        ],
        es: [
          'Cuatro fotografías según el estándar polaco',
          'Más de las que pide la mayoría de los países, y deben ser recientes; reutilizar la foto del consulado de hace un año se rechaza.',
        ],
      },
      {
        en: [
          'Employer annex completed and signed',
          'The annex comes from the employer and states the post, the pay and the hours. A missing signature on it is the single most common reason files sit unexamined.',
        ],
        pt: [
          'Anexo do empregador preenchido e assinado',
          'O anexo vem do empregador e indica o cargo, a remuneração e a jornada. A falta de assinatura nele é o motivo mais comum de processos ficarem parados.',
        ],
        es: [
          'Anexo del empleador cumplimentado y firmado',
          'El anexo lo emite el empleador e indica el puesto, la retribución y la jornada. La falta de firma en él es el motivo más frecuente de expedientes parados.',
        ],
      },
      {
        en: [
          'Evidence of where you live in Poland',
          'A lease in your name or a statement from the person you live with, matching the province whose office you are applying to.',
        ],
        pt: [
          'Comprovação de onde você mora na Polónia',
          'Contrato de arrendamento em seu nome ou declaração de quem mora com você, coerente com a província cujo serviço você aciona.',
        ],
        es: [
          'Prueba de dónde vive en Polonia',
          'Contrato de alquiler a su nombre o declaración de la persona con quien vive, coherente con la provincia cuya oficina resuelve.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Stable and regular income above the statutory minimum',
          'Measured per person in the household against the social assistance threshold, while the salary must also reach the national minimum wage. Both figures are revised yearly.',
        ],
        pt: [
          'Rendimento estável e regular acima do mínimo legal',
          'Medido por pessoa do agregado contra o limiar da assistência social, e o salário tem ainda de atingir o mínimo nacional. Ambos os valores são revistos anualmente.',
        ],
        es: [
          'Ingresos estables y regulares por encima del mínimo legal',
          'Se miden por persona del hogar frente al umbral de la asistencia social, y el salario debe además alcanzar el mínimo nacional. Ambas cifras se revisan cada año.',
        ],
      },
      {
        en: [
          'Health insurance through the public fund',
          'Either through employment or through voluntary contributions. Private travel cover, which was enough for the visa, is not accepted here.',
        ],
        pt: [
          'Seguro de saúde pelo fundo público',
          'Por vínculo laboral ou por contribuições voluntárias. A cobertura privada de viagem, que bastou para o visto, não é aceite aqui.',
        ],
        es: [
          'Seguro de salud a través del fondo público',
          'Por empleo o por cotizaciones voluntarias. La cobertura privada de viaje, que bastó para el visado, no se acepta aquí.',
        ],
      },
      {
        en: [
          'Pay the stamp duty and, later, the card fee',
          'Two separate payments: the duty when the application is lodged, the production fee only once the permit is granted. Confirm the current amounts before paying.',
        ],
        pt: [
          'Pagar a taxa de selo e, depois, a taxa do cartão',
          'Dois pagamentos distintos: a taxa na entrega do pedido, a taxa de produção só depois de a autorização ser concedida. Confirme os valores atuais antes de pagar.',
        ],
        es: [
          'Pagar el impuesto de actos y, después, la tasa de la tarjeta',
          'Dos pagos distintos: el impuesto al presentar la solicitud, la tasa de producción solo una vez concedido el permiso. Confirme los importes actuales antes de pagar.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Lodge the application no later than the last day of legal stay',
          'One day late and the whole application is left unexamined, however strong the merits. This deadline defeats more applicants than any document.',
        ],
        pt: [
          'Protocolar o pedido até ao último dia de estada legal',
          'Um dia de atraso e todo o pedido fica sem análise, por mais sólido que seja o mérito. Este prazo derruba mais gente do que qualquer documento.',
        ],
        es: [
          'Presentar la solicitud como muy tarde el último día de estancia legal',
          'Un día tarde y toda la solicitud queda sin examinar, por sólido que sea el fondo. Este plazo tumba a más solicitantes que cualquier documento.',
        ],
      },
      {
        en: [
          'Apply in person so the fingerprints can be taken',
          'The file cannot be completed by post and nobody can stand in for you; a representative may deliver papers, but not your hands.',
        ],
        pt: [
          'Pedir presencialmente para que as impressões sejam recolhidas',
          'O processo não se completa pelo correio e ninguém pode substituí-lo; um representante pode entregar papéis, mas não as suas mãos.',
        ],
        es: [
          'Solicitar en persona para que se tomen las huellas',
          'El expediente no se completa por correo y nadie puede sustituirle; un representante puede entregar papeles, pero no sus manos.',
        ],
      },
      {
        en: [
          'Get the stamp confirming lawful stay while the case runs',
          'It legalises your presence in Poland but is not a travel document. Leaving the country while the case is pending usually means you cannot return without a valid visa.',
        ],
        pt: [
          'Obter o carimbo que confirma a estada legal durante o processo',
          'Ele legaliza a sua presença na Polónia mas não é documento de viagem. Sair do país com o processo pendente costuma significar que você não consegue voltar sem visto válido.',
        ],
        es: [
          'Obtener el sello que confirma la estancia legal mientras dura el caso',
          'Legaliza su presencia en Polonia pero no es un documento de viaje. Salir del país con el caso pendiente suele significar que no podrá volver sin un visado vigente.',
        ],
      },
      {
        en: [
          'Expect the statutory deadline to be exceeded',
          'The law sets a period for the decision that busy provinces routinely overrun by many months. Plan work, travel and family visits around reality, not around the deadline.',
        ],
        pt: [
          'Contar com o prazo legal a ser ultrapassado',
          'A lei fixa um período para a decisão que as províncias movimentadas ultrapassam rotineiramente em muitos meses. Planeie trabalho, viagens e visitas pela realidade, não pelo prazo.',
        ],
        es: [
          'Contar con que se supere el plazo legal',
          'La ley fija un periodo para resolver que las provincias con más carga superan de forma habitual por muchos meses. Planifique trabajo, viajes y visitas por la realidad, no por el plazo.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints recorded when the file is lodged',
          'Taken at the counter at the moment of submission; without them the application is treated as not properly filed.',
        ],
        pt: [
          'Impressões digitais registadas na entrega do processo',
          'Recolhidas no balcão no momento da entrega; sem elas o pedido é tratado como não corretamente protocolado.',
        ],
        es: [
          'Huellas registradas al presentar el expediente',
          'Se toman en el mostrador en el momento de la entrega; sin ellas la solicitud se considera mal presentada.',
        ],
      },
      {
        en: [
          'Medical documents only for specific grounds',
          'Ordinary work and family cases require no examination; treatment-based permits and a few regulated jobs are the exception.',
        ],
        pt: [
          'Documentos médicos apenas para fundamentos específicos',
          'Casos comuns de trabalho e família não exigem exame; autorizações por tratamento e algumas profissões regulamentadas são a exceção.',
        ],
        es: [
          'Documentos médicos solo para fundamentos concretos',
          'Los casos ordinarios de trabajo y familia no exigen examen; los permisos por tratamiento y algunas profesiones reguladas son la excepción.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the residence card in person',
          'You are notified when it is ready. Read the purpose and the validity printed on it: they are not always what you asked for, and appealing has a short deadline.',
        ],
        pt: [
          'Retirar o cartão de residência pessoalmente',
          'Você é avisado quando está pronto. Leia a finalidade e a validade impressas: nem sempre são as pedidas, e o recurso tem prazo curto.',
        ],
        es: [
          'Recoger la tarjeta de residencia en persona',
          'Se le avisa cuando está lista. Lea la finalidad y la validez impresas: no siempre son las solicitadas, y el recurso tiene un plazo corto.',
        ],
      },
      {
        en: [
          'Notify the office within fifteen working days if the job ends',
          'For a permit granted on the basis of work, failing to report losing the job is itself a ground to withdraw the permit, separately from the loss of income.',
        ],
        pt: [
          'Avisar o serviço em quinze dias úteis se o emprego terminar',
          'Numa autorização concedida com base no trabalho, não comunicar a perda do emprego é por si só motivo para revogar a autorização, além da perda de rendimento.',
        ],
        es: [
          'Avisar a la oficina en quince días hábiles si termina el empleo',
          'En un permiso concedido por trabajo, no comunicar la pérdida del empleo es en sí motivo para retirar el permiso, aparte de la pérdida de ingresos.',
        ],
      },
      {
        en: [
          'Register the address at the municipal office',
          'The card does not register you anywhere; the municipality does, and the record is what the tax office and the health fund consult.',
        ],
        pt: [
          'Registar a morada no serviço municipal',
          'O cartão não o regista em lugar nenhum; o município sim, e é esse registo que as finanças e o fundo de saúde consultam.',
        ],
        es: [
          'Empadronarse en la oficina municipal',
          'La tarjeta no le inscribe en ningún sitio; el municipio sí, y ese registro es el que consultan Hacienda y el fondo sanitario.',
        ],
      },
      {
        en: [
          'Apply for a PESEL number if you do not have one yet',
          'It unlocks the health service, the tax office and the trusted profile used to sign documents online, and none of that comes with the card.',
        ],
        pt: [
          'Pedir o número PESEL se ainda não o tiver',
          'Ele destrava o serviço de saúde, as finanças e o perfil confiável usado para assinar documentos online, e nada disso vem com o cartão.',
        ],
        es: [
          'Solicitar el número PESEL si aún no lo tiene',
          'Desbloquea el servicio de salud, Hacienda y el perfil de confianza para firmar documentos en línea, y nada de eso viene con la tarjeta.',
        ],
      },
      {
        en: [
          'Start the next application well before the card expires',
          'The last-day rule applies again and the appointment queue has not got shorter; three months of margin is a sensible minimum.',
        ],
        pt: [
          'Iniciar o pedido seguinte bem antes de o cartão vencer',
          'A regra do último dia aplica-se de novo e a fila de agendamento não encurtou; três meses de margem são um mínimo sensato.',
        ],
        es: [
          'Iniciar la siguiente solicitud mucho antes de que caduque la tarjeta',
          'La regla del último día vuelve a aplicarse y la cola de citas no se ha acortado; tres meses de margen son un mínimo razonable.',
        ],
      },
    ],
  },

  'Permanent Residence Permit': {
    core_documents: [
      {
        en: [
          'Establish which ground you qualify under',
          'Polish origin or a Card of the Pole, marriage to a Polish citizen with a qualifying period of residence, or a long continuous stay. The ground decides the documents and the waiting time.',
        ],
        pt: [
          'Determinar sob qual fundamento você se qualifica',
          'Origem polaca ou Cartão do Polaco, casamento com cidadão polaco somado a um período de residência, ou uma estada longa e contínua. O fundamento define os documentos e o tempo de espera.',
        ],
        es: [
          'Determinar bajo qué fundamento cumple los requisitos',
          'Origen polaco o Tarjeta del Polaco, matrimonio con ciudadano polaco más un periodo de residencia, o una estancia larga y continua. El fundamento define los documentos y la espera.',
        ],
      },
      {
        en: [
          'Completed application on the current permanent residence form',
          'A different form from the temporary permit, with its own annexes; using the temporary one restarts the process.',
        ],
        pt: [
          'Pedido preenchido no formulário atual de residência permanente',
          'Formulário distinto do da autorização temporária, com anexos próprios; usar o temporário faz recomeçar o processo.',
        ],
        es: [
          'Solicitud cumplimentada en el formulario vigente de residencia permanente',
          'Es un formulario distinto al del permiso temporal, con sus propios anexos; usar el temporal reinicia el proceso.',
        ],
      },
      {
        en: [
          'Passport with copies of the pages in use',
          'The stamps in it are also the evidence of your travel history, which is checked against the continuity you claim.',
        ],
        pt: [
          'Passaporte com cópias das páginas em uso',
          'Os carimbos nele são também a prova do seu histórico de viagens, confrontado com a continuidade que você alega.',
        ],
        es: [
          'Pasaporte con copias de las páginas en uso',
          'Sus sellos son también la prueba de su historial de viajes, que se contrasta con la continuidad que alega.',
        ],
      },
      {
        en: [
          'Photographs meeting the official specification',
          'Recent ones; photographs taken for the previous card are not carried over.',
        ],
        pt: [
          'Fotografias conforme a especificação oficial',
          'Recentes; as fotografias tiradas para o cartão anterior não são aproveitadas.',
        ],
        es: [
          'Fotografías conformes con la especificación oficial',
          'Recientes; las fotografías tomadas para la tarjeta anterior no se reutilizan.',
        ],
      },
      {
        en: [
          'Documents proving the ground relied on',
          'Birth records for Polish descent, a marriage certificate plus evidence of a genuine shared life, or the unbroken chain of previous permits.',
        ],
        pt: [
          'Documentos que comprovem o fundamento invocado',
          'Registos de nascimento para ascendência polaca, certidão de casamento mais provas de vida em comum real, ou a cadeia ininterrupta de autorizações anteriores.',
        ],
        es: [
          'Documentos que acrediten el fundamento invocado',
          'Partidas de nacimiento para la ascendencia polaca, certificado de matrimonio más pruebas de convivencia real, o la cadena ininterrumpida de permisos anteriores.',
        ],
      },
      {
        en: [
          'Evidence of uninterrupted residence',
          'Absences are capped both per trip and in total across the qualifying period. A single long stay abroad can reset years of accumulated time.',
        ],
        pt: [
          'Comprovação de residência ininterrupta',
          'As ausências têm limite por viagem e no total do período qualificante. Uma única estada longa no exterior pode zerar anos acumulados.',
        ],
        es: [
          'Prueba de residencia ininterrumpida',
          'Las ausencias tienen tope por viaje y en el total del periodo cualificante. Una sola estancia larga en el extranjero puede borrar años acumulados.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Certificate of Polish at the required level',
          'A state examination certificate or a diploma from a Polish school. This requirement catches out applicants who assumed permanent residence was only about time served.',
        ],
        pt: [
          'Certificado de polaco no nível exigido',
          'Certificado de exame estatal ou diploma de escola polaca. Este requisito apanha de surpresa quem achou que a residência permanente era só uma questão de tempo cumprido.',
        ],
        es: [
          'Certificado de polaco en el nivel exigido',
          'Certificado de examen estatal o título de una escuela polaca. Este requisito sorprende a quien supuso que la residencia permanente era solo cuestión de tiempo cumplido.',
        ],
      },
      {
        en: [
          'Book the state language examination early',
          'Sittings are held on fixed dates a few times a year and fill up, so the exam calendar often sets the timing of the whole application.',
        ],
        pt: [
          'Marcar cedo o exame estatal de idioma',
          'As provas ocorrem em datas fixas poucas vezes por ano e esgotam, então o calendário do exame acaba por definir o momento de todo o pedido.',
        ],
        es: [
          'Reservar pronto el examen estatal de idioma',
          'Las convocatorias son en fechas fijas pocas veces al año y se llenan, así que el calendario del examen suele fijar el momento de toda la solicitud.',
        ],
        priority: 2,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Stable income and public health cover for the long-term resident route',
          'The EU long-term resident permit, unlike some domestic grounds, tests income per household member and requires cover from the public fund.',
        ],
        pt: [
          'Rendimento estável e cobertura pública na via de residente de longa duração',
          'A autorização de residente de longa duração da UE, ao contrário de alguns fundamentos nacionais, avalia o rendimento por pessoa do agregado e exige cobertura do fundo público.',
        ],
        es: [
          'Ingresos estables y cobertura pública en la vía de residente de larga duración',
          'El permiso de residente de larga duración de la UE, a diferencia de algunos fundamentos nacionales, evalúa los ingresos por miembro del hogar y exige cobertura del fondo público.',
        ],
      },
      {
        en: [
          'Proof that you have no unpaid public liabilities',
          'Tax and social insurance arrears surface during the check and stall the case until they are cleared, which can take longer than the permit itself.',
        ],
        pt: [
          'Prova de que não há dívidas públicas em aberto',
          'Atrasos fiscais e de segurança social aparecem na verificação e travam o processo até serem regularizados, o que pode demorar mais do que a própria autorização.',
        ],
        es: [
          'Prueba de que no tiene deudas públicas pendientes',
          'Los atrasos fiscales y de seguridad social afloran en la comprobación y bloquean el caso hasta saldarlos, lo que puede tardar más que el propio permiso.',
        ],
      },
      {
        en: [
          'Pay the stamp duty for the permanent permit',
          'Higher than for a temporary permit and separate from the card production fee charged afterwards.',
        ],
        pt: [
          'Pagar a taxa de selo da autorização permanente',
          'Mais alta do que a da autorização temporária e separada da taxa de produção do cartão cobrada depois.',
        ],
        es: [
          'Pagar el impuesto de actos del permiso permanente',
          'Más alto que el del permiso temporal y aparte de la tasa de producción de la tarjeta que se cobra después.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File at the provincial office before the current title expires',
          'The same rule as the temporary permit: lodged after the last day of legal stay, the application is not examined at all.',
        ],
        pt: [
          'Protocolar no serviço provincial antes de o título atual vencer',
          'A mesma regra da autorização temporária: entregue após o último dia de estada legal, o pedido nem é analisado.',
        ],
        es: [
          'Presentar en la oficina provincial antes de que caduque el título actual',
          'La misma regla que en el permiso temporal: presentada tras el último día de estancia legal, la solicitud ni se examina.',
        ],
      },
      {
        en: [
          'Attend in person for the fingerprints and any interview',
          'Marriage-based cases are commonly followed by separate interviews of both spouses, held apart and compared.',
        ],
        pt: [
          'Comparecer pessoalmente para as impressões e eventual entrevista',
          'Casos baseados em casamento costumam ter entrevistas separadas dos dois cônjuges, feitas em separado e comparadas.',
        ],
        es: [
          'Acudir en persona para las huellas y la eventual entrevista',
          'Los casos basados en matrimonio suelen incluir entrevistas separadas de ambos cónyuges, hechas por separado y comparadas.',
        ],
      },
      {
        en: [
          'Expect a longer examination than for a temporary permit',
          'Background checks by the police and the border guard are routine on this route and add months on top of the usual queue.',
        ],
        pt: [
          'Contar com uma análise mais longa que a da autorização temporária',
          'Verificações da polícia e da guarda de fronteira são rotina nesta via e somam meses à fila habitual.',
        ],
        es: [
          'Contar con un examen más largo que el del permiso temporal',
          'Las comprobaciones de la policía y de la guardia de fronteras son rutina en esta vía y suman meses a la cola habitual.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric capture for the long-validity card',
          'Taken when the file is lodged; the resulting card is issued for a much longer period than a temporary one.',
        ],
        pt: [
          'Recolha biométrica para o cartão de longa validade',
          'Feita na entrega do processo; o cartão resultante é emitido por um período muito maior que o temporário.',
        ],
        es: [
          'Toma biométrica para la tarjeta de larga validez',
          'Se realiza al presentar el expediente; la tarjeta resultante se expide por un periodo mucho mayor que la temporal.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the card and note what actually expires',
          'The status is indefinite; the plastic card is not. Letting the card lapse does not remove your right to stay, but it does block banks, employers and border crossings.',
        ],
        pt: [
          'Retirar o cartão e perceber o que de facto caduca',
          'O estatuto é por tempo indeterminado; o cartão de plástico não. Deixá-lo caducar não retira o seu direito de permanência, mas trava bancos, empregadores e passagens de fronteira.',
        ],
        es: [
          'Recoger la tarjeta y entender qué caduca realmente',
          'El estatuto es indefinido; la tarjeta de plástico no. Dejarla caducar no le quita el derecho a residir, pero bloquea bancos, empleadores y pasos fronterizos.',
        ],
      },
      {
        en: [
          'Report changes of address to the office',
          'The obligation continues after the permit is granted, and an unreported move is what turns a routine renewal into a problem.',
        ],
        pt: [
          'Comunicar mudanças de morada ao serviço',
          'A obrigação continua depois de concedida a autorização, e uma mudança não comunicada é o que transforma uma renovação de rotina num problema.',
        ],
        es: [
          'Comunicar los cambios de domicilio a la oficina',
          'La obligación sigue tras la concesión del permiso, y una mudanza no comunicada es lo que convierte una renovación rutinaria en un problema.',
        ],
      },
      {
        en: [
          'Know what causes the permit to be withdrawn',
          'A long absence from Poland ends it, and for the EU long-term resident permit the absence is measured from the whole European Union, not just from Poland.',
        ],
        pt: [
          'Saber o que provoca a revogação da autorização',
          'Uma ausência longa da Polónia extingue-a, e na autorização de residente de longa duração da UE a ausência mede-se em relação a toda a União Europeia, não só à Polónia.',
        ],
        es: [
          'Saber qué provoca la retirada del permiso',
          'Una ausencia prolongada de Polonia lo extingue, y en el permiso de residente de larga duración de la UE la ausencia se mide respecto a toda la Unión Europea, no solo a Polonia.',
        ],
      },
      {
        en: [
          'Consider citizenship once the residence requirement is met',
          'Naturalisation adds a further qualifying period spent specifically on permanent residence and its own language certificate, so the clock does not simply carry over.',
        ],
        pt: [
          'Avaliar a cidadania depois de cumprido o requisito de residência',
          'A naturalização acrescenta um período adicional cumprido especificamente com residência permanente e um certificado de idioma próprio, então a contagem não se transfere sem mais.',
        ],
        es: [
          'Valorar la ciudadanía una vez cumplido el requisito de residencia',
          'La naturalización añade un periodo adicional cumplido específicamente con residencia permanente y su propio certificado de idioma, así que el cómputo no se traslada sin más.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },

  'EU Blue Card': {
    core_documents: [
      {
        en: [
          'Employment contract of the minimum required duration',
          'The recast European rules shortened the minimum contract length that Poland applies, and contracts drafted against the older rule are still circulating. Check what applies now.',
        ],
        pt: [
          'Contrato de trabalho com a duração mínima exigida',
          'As regras europeias reformuladas encurtaram a duração mínima de contrato que a Polónia aplica, e ainda circulam contratos redigidos pela regra antiga. Verifique o que vale agora.',
        ],
        es: [
          'Contrato de trabajo con la duración mínima exigida',
          'Las normas europeas refundidas acortaron la duración mínima de contrato que aplica Polonia, y siguen circulando contratos redactados con la regla antigua. Compruebe qué rige ahora.',
        ],
      },
      {
        en: [
          'Passport valid for the period of the contract',
          'The card cannot outlast the travel document, so a passport close to expiry shortens the permit granted.',
        ],
        pt: [
          'Passaporte válido pelo período do contrato',
          'O cartão não pode ultrapassar o documento de viagem, então um passaporte perto de vencer encurta a autorização concedida.',
        ],
        es: [
          'Pasaporte vigente durante el periodo del contrato',
          'La tarjeta no puede exceder al documento de viaje, así que un pasaporte próximo a caducar acorta el permiso concedido.',
        ],
      },
      {
        en: [
          'Application form for highly qualified employment',
          'The Blue Card is a temporary residence permit with its own annex; the ordinary work annex is not interchangeable with it.',
        ],
        pt: [
          'Formulário de pedido para trabalho altamente qualificado',
          'O Cartão Azul é uma autorização de residência temporária com anexo próprio; o anexo comum de trabalho não é intercambiável.',
        ],
        es: [
          'Formulario de solicitud para empleo altamente cualificado',
          'La Tarjeta Azul es un permiso de residencia temporal con su propio anexo; el anexo laboral ordinario no es intercambiable.',
        ],
      },
      {
        en: [
          'Employer annex describing the qualified post',
          'It has to show why the job requires higher qualifications, not merely that it is well paid; a generic job description weakens the whole file.',
        ],
        pt: [
          'Anexo do empregador descrevendo o posto qualificado',
          'Tem de mostrar por que a vaga exige qualificação superior, e não apenas que é bem paga; uma descrição genérica enfraquece todo o processo.',
        ],
        es: [
          'Anexo del empleador que describa el puesto cualificado',
          'Debe mostrar por qué el puesto exige cualificación superior, no solo que está bien pagado; una descripción genérica debilita todo el expediente.',
        ],
      },
      {
        en: [
          'Evidence of a place to live in Poland',
          'A lease or a statement from the employer, with the address matching the province where the application is filed.',
        ],
        pt: [
          'Comprovação de local de residência na Polónia',
          'Contrato de arrendamento ou declaração do empregador, com morada coerente com a província onde o pedido é entregue.',
        ],
        es: [
          'Prueba de un lugar donde vivir en Polonia',
          'Contrato de alquiler o declaración del empleador, con la dirección acorde con la provincia donde se presenta la solicitud.',
        ],
      },
      {
        en: [
          'Photographs to the official standard',
          'The same specification as any residence card, and the same rejection at the counter when the size is wrong.',
        ],
        pt: [
          'Fotografias no padrão oficial',
          'A mesma especificação de qualquer cartão de residência, e a mesma recusa no balcão quando o tamanho está errado.',
        ],
        es: [
          'Fotografías según el estándar oficial',
          'La misma especificación que cualquier tarjeta de residencia, y el mismo rechazo en el mostrador si el tamaño no es correcto.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Higher education diploma covering at least three years of study',
          'Legalised or apostilled and translated by a sworn translator, and it has to relate to the job offered; an unrelated degree does not carry the application.',
        ],
        pt: [
          'Diploma de ensino superior de pelo menos três anos de estudo',
          'Legalizado ou apostilado e traduzido por tradutor juramentado, e tem de relacionar-se com a vaga oferecida; um diploma sem relação não sustenta o pedido.',
        ],
        es: [
          'Título de educación superior de al menos tres años de estudio',
          'Legalizado o apostillado y traducido por traductor jurado, y debe guardar relación con el puesto ofrecido; un título sin relación no sostiene la solicitud.',
        ],
      },
      {
        en: [
          'Professional experience as an alternative to a degree',
          'The recast rules allow qualifying experience instead of a diploma for certain occupations, notably in information technology. Confirm the number of years currently accepted.',
        ],
        pt: [
          'Experiência profissional como alternativa ao diploma',
          'As regras reformuladas admitem experiência qualificante em vez de diploma em certas ocupações, sobretudo em tecnologia da informação. Confirme quantos anos são aceites atualmente.',
        ],
        es: [
          'Experiencia profesional como alternativa al título',
          'Las normas refundidas admiten experiencia cualificante en lugar de título en ciertas ocupaciones, sobre todo en tecnologías de la información. Confirme cuántos años se aceptan ahora.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Authorisation to practise a regulated profession',
          'Where the job is regulated, the card cannot be granted until the professional body recognises you, and that body works to its own calendar.',
        ],
        pt: [
          'Autorização para exercer profissão regulamentada',
          'Quando a profissão é regulamentada, o cartão não é concedido até o órgão profissional o reconhecer, e esse órgão trabalha no calendário dele.',
        ],
        es: [
          'Autorización para ejercer una profesión regulada',
          'Cuando la profesión está regulada, la tarjeta no se concede hasta que el colegio profesional le reconozca, y ese organismo va a su propio calendario.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Salary at or above the Blue Card threshold',
          'Set as a multiple of the average gross salary published by the statistical office and recalculated every year. A contract signed against last year figure fails.',
        ],
        pt: [
          'Salário igual ou superior ao limiar do Cartão Azul',
          'Definido como um múltiplo do salário médio bruto publicado pelo instituto de estatística e recalculado todo ano. Um contrato assinado pelo valor do ano passado é rejeitado.',
        ],
        es: [
          'Salario igual o superior al umbral de la Tarjeta Azul',
          'Se fija como un múltiplo del salario bruto medio que publica el instituto de estadística y se recalcula cada año. Un contrato firmado con la cifra del año pasado se rechaza.',
        ],
      },
      {
        en: [
          'Public health cover through the employment',
          'The registration made by the employer is what activates it; private insurance is not a substitute for this permit.',
        ],
        pt: [
          'Cobertura pública de saúde pelo vínculo laboral',
          'É o registo feito pelo empregador que a ativa; seguro privado não substitui isso nesta autorização.',
        ],
        es: [
          'Cobertura sanitaria pública por el empleo',
          'La activa el alta que hace el empleador; el seguro privado no lo sustituye en este permiso.',
        ],
      },
      {
        en: [
          'Pay the duty and the card production fee',
          'Charged at two different moments, as for any residence permit; keep the receipts, since the office asks for them at collection.',
        ],
        pt: [
          'Pagar a taxa e o custo de produção do cartão',
          'Cobrados em dois momentos distintos, como em qualquer autorização de residência; guarde os comprovativos, pois o serviço pede-os na retirada.',
        ],
        es: [
          'Pagar la tasa y el coste de producción de la tarjeta',
          'Se cobran en dos momentos distintos, como en cualquier permiso de residencia; guarde los justificantes, porque la oficina los pide al recoger.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Lodge the application at the provincial office in person',
          'Filed where you live, with the same last-day-of-legal-stay deadline as every other residence permit.',
        ],
        pt: [
          'Entregar o pedido pessoalmente no serviço provincial',
          'Protocolado onde você mora, com o mesmo prazo do último dia de estada legal de qualquer outra autorização de residência.',
        ],
        es: [
          'Presentar la solicitud en persona en la oficina provincial',
          'Se presenta donde vive, con el mismo plazo del último día de estancia legal que cualquier otro permiso de residencia.',
        ],
      },
      {
        en: [
          'Check what the 2025 employment reform changed',
          'It moved parts of the procedure into an electronic system and reworked the labour market test. Guides written before it describe steps that no longer exist.',
        ],
        pt: [
          'Verificar o que a reforma laboral de 2025 mudou',
          'Ela levou partes do procedimento para um sistema eletrónico e reformulou o teste do mercado de trabalho. Guias anteriores descrevem etapas que já não existem.',
        ],
        es: [
          'Comprobar qué cambió la reforma laboral de 2025',
          'Llevó partes del procedimiento a un sistema electrónico y rehízo la prueba del mercado laboral. Las guías anteriores describen pasos que ya no existen.',
        ],
      },
      {
        en: [
          'Obtain the stamp that legalises your stay while the case runs',
          'The same limitation applies as to any pending residence case: it does not let you re-enter Poland after leaving.',
        ],
        pt: [
          'Obter o carimbo que legaliza a estada durante o processo',
          'Aplica-se a mesma limitação de qualquer processo de residência pendente: ele não permite reentrar na Polónia depois de sair.',
        ],
        es: [
          'Obtener el sello que legaliza la estancia mientras dura el caso',
          'Se aplica la misma limitación que a cualquier caso de residencia pendiente: no le permite volver a entrar en Polonia tras salir.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints taken at submission',
          'Collected at the counter, which is why the application cannot be sent by post or filed by a representative alone.',
        ],
        pt: [
          'Impressões digitais recolhidas na entrega',
          'Colhidas no balcão, razão pela qual o pedido não pode ser enviado pelo correio nem entregue só por um representante.',
        ],
        es: [
          'Huellas tomadas al presentar',
          'Se recogen en el mostrador, por eso la solicitud no puede enviarse por correo ni presentarla solo un representante.',
        ],
      },
      {
        en: [
          'No medical examination on this route',
          'Only the health insurance registration is verified.',
        ],
        pt: [
          'Sem exame médico nesta via',
          'Verifica-se apenas o registo no seguro de saúde.',
        ],
        es: [
          'Sin examen médico en esta vía',
          'Solo se verifica el alta en el seguro de salud.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the card and check the annotation on it',
          'It has to carry the EU Blue Card annotation. That wording is exactly what another member state looks for if you later move, so an error is worth correcting immediately.',
        ],
        pt: [
          'Retirar o cartão e conferir a anotação nele',
          'Ele tem de trazer a menção de Cartão Azul UE. É precisamente essa redação que outro Estado-membro procura se você se mudar depois, então um erro vale corrigir de imediato.',
        ],
        es: [
          'Recoger la tarjeta y revisar la anotación',
          'Debe llevar la mención de Tarjeta Azul UE. Ese texto es justo lo que busca otro Estado miembro si luego se traslada, así que un error conviene corregirlo de inmediato.',
        ],
      },
      {
        en: [
          'Ask for consent before changing employer in the early period',
          'Job changes in the first stretch of the card need notification or approval; starting the new job first and reporting later can cost the permit.',
        ],
        pt: [
          'Pedir consentimento antes de trocar de empregador no período inicial',
          'Mudanças de emprego no primeiro trecho do cartão exigem comunicação ou aprovação; começar no novo emprego e avisar depois pode custar a autorização.',
        ],
        es: [
          'Pedir consentimiento antes de cambiar de empleador en el periodo inicial',
          'Los cambios de empleo en el primer tramo de la tarjeta exigen comunicación o aprobación; empezar en el nuevo empleo y avisar después puede costar el permiso.',
        ],
      },
      {
        en: [
          'Keep the evidence of every Blue Card period',
          'Time on a Blue Card counts towards EU long-term resident status, and periods spent in other member states can be added, but only if you can document them.',
        ],
        pt: [
          'Guardar a prova de cada período com Cartão Azul',
          'O tempo com Cartão Azul conta para o estatuto de residente de longa duração da UE, e períodos noutros Estados-membros podem somar, mas só se você conseguir documentá-los.',
        ],
        es: [
          'Conservar la prueba de cada periodo con Tarjeta Azul',
          'El tiempo con Tarjeta Azul cuenta para el estatuto de residente de larga duración de la UE, y los periodos en otros Estados miembros pueden sumarse, pero solo si puede documentarlos.',
        ],
      },
      {
        en: [
          'Register the address and obtain a PESEL number',
          'Neither comes with the card, and both are asked for by the tax office, the bank and the health fund in your first weeks.',
        ],
        pt: [
          'Registar a morada e obter o número PESEL',
          'Nenhum dos dois vem com o cartão, e ambos são pedidos pelas finanças, pelo banco e pelo fundo de saúde nas primeiras semanas.',
        ],
        es: [
          'Empadronarse y obtener el número PESEL',
          'Ninguno de los dos viene con la tarjeta, y ambos se los pedirán Hacienda, el banco y el fondo sanitario en las primeras semanas.',
        ],
      },
      {
        en: [
          'Track the salary threshold at every renewal',
          'The threshold moves each year with the published average wage, so a salary that qualified when the card was granted may fall short when it is renewed.',
        ],
        pt: [
          'Acompanhar o limiar salarial a cada renovação',
          'O limiar sobe todo ano com o salário médio publicado, então uma remuneração que qualificou na concessão pode ficar abaixo na renovação.',
        ],
        es: [
          'Vigilar el umbral salarial en cada renovación',
          'El umbral sube cada año con el salario medio publicado, así que una retribución que valió en la concesión puede quedarse corta en la renovación.',
        ],
      },
    ],
  },
};
