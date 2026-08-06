import type { CountryVisaSteps } from './types';

/**
 * Steps for Morocco.
 *
 * Residence is a police matter, not a consular one. The carte de séjour is
 * applied for at the commissariat covering your address, within days of
 * settling and before the ninety-day entry allowance runs out, and it is then
 * renewed every year until enough continuous years accumulate for the long-term
 * card. Nothing about it happens online.
 *
 * Work runs through a second authority. The employment contract must be signed
 * on the official model form and endorsed by the labour ministry, and the
 * endorsement rests on an ANAPEC attestation that the vacancy was published and
 * no suitable Moroccan candidate came forward. Bilateral agreements and family
 * ties exempt some applicants from that step, which is worth establishing
 * before anything else.
 *
 * Every foreign civil document needs legalisation and a sworn translation into
 * Arabic or French by a translator accredited in Morocco. A translation done
 * abroad is routinely refused at the counter.
 */
export const morocco: CountryVisaSteps = {
  'Tourist Entry': {
    core_documents: [
      {
        en: [
          'Check whether your nationality needs a visa at all',
          'Many passports enter visa free for ninety days while others must obtain an electronic authorisation or apply at a consulate. The rule depends on nationality and it changes.',
        ],
        pt: [
          'Verificar se a sua nacionalidade precisa de visto',
          'Muitos passaportes entram sem visto por noventa dias, enquanto outros precisam de autorização eletrónica ou de pedido no consulado. A regra depende da nacionalidade e muda.',
        ],
        es: [
          'Comprobar si su nacionalidad necesita visado',
          'Muchos pasaportes entran sin visado durante noventa días mientras otros deben obtener una autorización electrónica o solicitar en consulado. La regla depende de la nacionalidad y cambia.',
        ],
      },
      {
        en: [
          'Passport valid for at least six months from arrival',
          'Border officers turn away travellers whose passport falls short of this even when no visa is required at all.',
        ],
        pt: [
          'Passaporte válido por pelo menos seis meses a contar da chegada',
          'Os agentes de fronteira barram quem tem passaporte aquém disso mesmo quando não é exigido visto nenhum.',
        ],
        es: [
          'Pasaporte vigente al menos seis meses desde la llegada',
          'Los agentes de frontera rechazan a quien no llega a ese margen incluso cuando no se exige visado alguno.',
        ],
      },
      {
        en: [
          'Printed electronic travel authorisation where required',
          'Airlines ask for the printed approval at boarding, and a screenshot on a phone is not always accepted at the gate.',
        ],
        pt: [
          'Autorização eletrónica de viagem impressa, quando exigida',
          'As companhias aéreas pedem a aprovação impressa no embarque, e uma captura de tela no celular nem sempre é aceita no portão.',
        ],
        es: [
          'Autorización electrónica de viaje impresa, cuando se exija',
          'Las aerolíneas piden la aprobación impresa en el embarque, y una captura de pantalla en el móvil no siempre se acepta en la puerta.',
        ],
      },
      {
        en: [
          'Proof of accommodation for the whole stay',
          'A hotel booking, or a certificate of lodging signed by your host and stamped by the local authority of their district.',
        ],
        pt: [
          'Comprovativo de alojamento para toda a estada',
          'Reserva de hotel, ou certidão de hospedagem assinada pelo anfitrião e carimbada pela autoridade local do bairro dele.',
        ],
        es: [
          'Comprobante de alojamiento para toda la estancia',
          'Reserva de hotel, o certificado de alojamiento firmado por su anfitrión y sellado por la autoridad local de su distrito.',
        ],
      },
      {
        en: [
          'Return or onward ticket within ninety days',
          'The officer at the border compares the departure date against the stay allowed and can shorten the stamp accordingly.',
        ],
        pt: [
          'Bilhete de volta ou de continuação dentro dos noventa dias',
          'O agente na fronteira compara a data de saída com a estada permitida e pode encurtar o carimbo por causa disso.',
        ],
        es: [
          'Billete de vuelta o de continuación dentro de los noventa días',
          'El agente de frontera compara la fecha de salida con la estancia permitida y puede acortar el sello en consecuencia.',
        ],
      },
      {
        en: [
          'Entry and departure card completed',
          'Handed out on the flight or at the border post. The departure half is asked for again when you leave the country.',
        ],
        pt: [
          'Ficha de entrada e saída preenchida',
          'Distribuída no voo ou no posto de fronteira. A metade de saída é pedida de novo quando você deixa o país.',
        ],
        es: [
          'Ficha de entrada y salida cumplimentada',
          'Se reparte en el vuelo o en el puesto fronterizo. La mitad de salida se pide de nuevo al abandonar el país.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of funds for the length of the stay',
          'Officers may ask for cards, cash or statements. There is no published figure, so confirm what is being expected for the season you travel.',
        ],
        pt: [
          'Comprovação de recursos para a duração da estada',
          'Os agentes podem pedir cartões, dinheiro ou extratos. Não há valor publicado, então confirme o que está sendo exigido na época em que viajar.',
        ],
        es: [
          'Prueba de fondos para la duración de la estancia',
          'Los agentes pueden pedir tarjetas, efectivo o extractos. No hay cifra publicada, así que confirme qué se está exigiendo en la temporada en que viaje.',
        ],
      },
      {
        en: [
          'Declare foreign currency above the reporting limit',
          'Amounts over the threshold must be declared to customs on arrival. Without that declaration you cannot legally take the money back out.',
        ],
        pt: [
          'Declarar moeda estrangeira acima do limite de comunicação',
          'Valores acima do limite precisam ser declarados à alfândega na chegada. Sem essa declaração você não pode levar o dinheiro de volta legalmente.',
        ],
        es: [
          'Declarar la divisa extranjera por encima del límite',
          'Los importes que superen el umbral deben declararse en aduana a la llegada. Sin esa declaración no puede sacar el dinero legalmente.',
        ],
      },
      {
        en: [
          'Do not plan to leave the country with dirhams',
          'The dirham is a closed currency and cannot be exported beyond a small allowance. Convert back before the airport and keep the exchange receipts.',
        ],
        pt: [
          'Não planejar sair do país com dirhams',
          'O dirham é moeda fechada e não pode ser exportado além de uma pequena franquia. Reconverta antes do aeroporto e guarde os recibos de câmbio.',
        ],
        es: [
          'No planear salir del país con dírhams',
          'El dírham es una moneda cerrada y no puede exportarse más allá de un pequeño margen. Reconvierta antes del aeropuerto y guarde los recibos de cambio.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Pay the consular or electronic visa fee',
          'Charged where a visa is required, per applicant, and not refunded if the request is turned down. Confirm the amount in force for your nationality.',
        ],
        pt: [
          'Pagar a taxa consular ou de visto eletrónico',
          'Cobrada quando há exigência de visto, por requerente, e não devolvida se o pedido for negado. Confirme o valor vigente para a sua nacionalidade.',
        ],
        es: [
          'Pagar la tasa consular o del visado electrónico',
          'Se cobra cuando se exige visado, por solicitante, y no se devuelve si deniegan. Confirme el importe vigente para su nacionalidad.',
        ],
      },
      {
        en: [
          'Apply several weeks before travelling',
          'Consular files and electronic approvals both take longer in the high season, and airlines will not board you on a pending application.',
        ],
        pt: [
          'Pedir várias semanas antes de viajar',
          'Processos consulares e aprovações eletrónicas demoram mais na alta temporada, e as companhias não embarcam ninguém com pedido em análise.',
        ],
        es: [
          'Solicitar varias semanas antes de viajar',
          'Tanto los expedientes consulares como las aprobaciones electrónicas tardan más en temporada alta, y las aerolíneas no embarcan con una solicitud pendiente.',
        ],
      },
      {
        en: [
          'Book the consulate appointment through the official channel',
          'Intermediaries reselling appointments are common and the consulate will not honour a booking made outside its own system.',
        ],
        pt: [
          'Agendar no consulado pelo canal oficial',
          'Intermediários que revendem horários são comuns e o consulado não honra agendamento feito fora do sistema próprio.',
        ],
        es: [
          'Reservar la cita consular por el canal oficial',
          'Los intermediarios que revenden citas son habituales y el consulado no atiende una reserva hecha fuera de su propio sistema.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric enrolment for consular applicants',
          'Fingerprints and a photograph are taken at the consulate or its partner centre when a visa sticker is issued.',
        ],
        pt: [
          'Recolha biométrica para requerentes consulares',
          'Impressões digitais e fotografia são feitas no consulado ou no centro parceiro quando há emissão de adesivo de visto.',
        ],
        es: [
          'Registro biométrico para solicitantes consulares',
          'Las huellas y la fotografía se toman en el consulado o su centro asociado cuando se expide una etiqueta de visado.',
        ],
      },
      {
        en: [
          'Vaccination certificate when arriving from a risk area',
          'Required from travellers coming from or transiting countries where yellow fever is present, and checked at the health desk on arrival.',
        ],
        pt: [
          'Certificado de vacinação ao chegar de área de risco',
          'Exigido de quem vem de países com febre amarela ou faz escala neles, e conferido no posto sanitário na chegada.',
        ],
        es: [
          'Certificado de vacunación al llegar de zona de riesgo',
          'Se exige a quien procede de países con fiebre amarilla o hace escala en ellos, y se comprueba en el puesto sanitario a la llegada.',
        ],
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Declare yourself to the police if staying in a private home',
          'Hotels report their guests automatically. Someone hosted privately must be declared at the nearest police station within three days of arrival.',
        ],
        pt: [
          'Declarar-se à polícia se ficar em casa particular',
          'Os hotéis comunicam os hóspedes automaticamente. Quem é hospedado em casa particular precisa ser declarado na esquadra mais próxima em até três dias da chegada.',
        ],
        es: [
          'Declararse ante la policía si se aloja en casa particular',
          'Los hoteles comunican a sus huéspedes automáticamente. Quien se aloja en un domicilio particular debe declararse en la comisaría más cercana en los tres días siguientes.',
        ],
      },
      {
        en: [
          'Count the ninety days from the entry stamp',
          'The allowance runs per entry from the date stamped, not per calendar year, and the handwritten date is the one that counts.',
        ],
        pt: [
          'Contar os noventa dias a partir do carimbo de entrada',
          'A franquia corre por entrada, a partir da data carimbada, e não por ano civil; vale a data escrita à mão.',
        ],
        es: [
          'Contar los noventa días desde el sello de entrada',
          'El plazo corre por entrada desde la fecha sellada, no por año natural, y la fecha escrita a mano es la que cuenta.',
        ],
      },
      {
        en: [
          'Request an extension before the ninety days run out',
          'Applied for at the police station of your district with a written justification. Leaving and re-entering to reset the clock is treated as an abuse and can be refused at the border.',
        ],
        pt: [
          'Pedir prorrogação antes de esgotar os noventa dias',
          'Solicitada na esquadra do seu bairro com justificação escrita. Sair e reentrar para zerar a contagem é tratado como abuso e pode ser barrado na fronteira.',
        ],
        es: [
          'Pedir la prórroga antes de agotar los noventa días',
          'Se solicita en la comisaría de su distrito con una justificación escrita. Salir y reentrar para reiniciar el cómputo se considera abuso y puede rechazarse en la frontera.',
        ],
      },
      {
        en: [
          'Expect a fine at departure after an overstay',
          'It is settled at the airport before boarding, and repeated overstays lead to refusal of entry on the next trip.',
        ],
        pt: [
          'Contar com multa na saída em caso de excesso de permanência',
          'É paga no aeroporto antes do embarque, e excessos repetidos levam à recusa de entrada na viagem seguinte.',
        ],
        es: [
          'Contar con una multa a la salida si se excede la estancia',
          'Se paga en el aeropuerto antes de embarcar, y los excesos repetidos llevan a que le nieguen la entrada en el siguiente viaje.',
        ],
      },
      {
        en: [
          'Do not work or trade on a tourist entry',
          'Any paid activity requires an endorsed contract or a company registration. Being found working ends the stay and blocks a later residence file.',
        ],
        pt: [
          'Não trabalhar nem comerciar com entrada de turista',
          'Qualquer atividade remunerada exige contrato visado ou registo de empresa. Ser flagrado trabalhando encerra a estada e trava um futuro processo de residência.',
        ],
        es: [
          'No trabajar ni comerciar con una entrada de turista',
          'Cualquier actividad remunerada exige un contrato visado o el registro de una empresa. Que le encuentren trabajando termina la estancia y bloquea un futuro expediente de residencia.',
        ],
      },
    ],
  },

  'Carte de Séjour (Residence Card)': {
    core_documents: [
      {
        en: [
          'File at the police prefecture covering your address',
          'The application is made at the commissariat of the district where you live, within days of settling and before the ninety-day entry allowance expires. Filing late already means a fine and a poor start.',
        ],
        pt: [
          'Protocolar na prefeitura de polícia da sua morada',
          'O pedido é feito no comissariado do bairro onde você mora, poucos dias depois de se instalar e antes de esgotar a franquia de noventa dias. Protocolar tarde já significa multa e um começo ruim.',
        ],
        es: [
          'Presentar en la prefectura de policía de su domicilio',
          'La solicitud se hace en la comisaría del distrito donde vive, a los pocos días de instalarse y antes de que expire el plazo de noventa días. Presentar tarde ya supone multa y un mal comienzo.',
        ],
      },
      {
        en: [
          'Passport with the entry stamp plus copies of every page',
          'The prefecture keeps a full set of copies, and the entry stamp is what fixes the date your ninety days began.',
        ],
        pt: [
          'Passaporte com o carimbo de entrada e cópias de todas as páginas',
          'A prefeitura fica com um jogo completo de cópias, e o carimbo de entrada é o que fixa a data em que seus noventa dias começaram.',
        ],
        es: [
          'Pasaporte con el sello de entrada y copias de todas las páginas',
          'La prefectura se queda un juego completo de copias, y el sello de entrada es lo que fija la fecha en que empezaron sus noventa días.',
        ],
      },
      {
        en: [
          'Application form with several passport photographs',
          'Prefectures typically ask for six to eight identical photographs, and for the whole file in more than one copy.',
        ],
        pt: [
          'Formulário de pedido com várias fotografias tipo passe',
          'As prefeituras costumam pedir de seis a oito fotografias iguais, e o processo inteiro em mais de uma via.',
        ],
        es: [
          'Formulario de solicitud con varias fotografías de carné',
          'Las prefecturas suelen pedir de seis a ocho fotografías idénticas, y el expediente entero por duplicado o más.',
        ],
      },
      {
        en: [
          'Birth certificate legalised and sworn-translated',
          'The translation into Arabic or French must be done by a translator accredited in Morocco. A translation prepared abroad is routinely refused.',
        ],
        pt: [
          'Certidão de nascimento legalizada e com tradução juramentada',
          'A tradução para árabe ou francês precisa ser feita por tradutor credenciado em Marrocos. Tradução preparada no exterior é recusada com frequência.',
        ],
        es: [
          'Partida de nacimiento legalizada y con traducción jurada',
          'La traducción al árabe o al francés debe hacerla un traductor acreditado en Marruecos. Una traducción hecha en el extranjero se rechaza habitualmente.',
        ],
      },
      {
        en: [
          'Proof of your address in Morocco',
          'A registered lease, a recent utility bill, or a certificate of lodging signed by the owner with a copy of their national identity card.',
        ],
        pt: [
          'Comprovativo da sua morada em Marrocos',
          'Contrato de arrendamento registado, conta de serviço recente, ou certidão de hospedagem assinada pelo proprietário com cópia do documento de identidade dele.',
        ],
        es: [
          'Comprobante de su domicilio en Marruecos',
          'Contrato de alquiler registrado, factura de suministro reciente, o certificado de alojamiento firmado por el propietario con copia de su documento nacional.',
        ],
      },
      {
        en: [
          'Criminal record certificate from your home country',
          'Recent, legalised and translated. Some prefectures also ask for a Moroccan bulletin once you have been in the country for a while.',
        ],
        pt: [
          'Certidão de antecedentes criminais do seu país de origem',
          'Recente, legalizada e traduzida. Algumas prefeituras pedem também um boletim marroquino depois de algum tempo no país.',
        ],
        es: [
          'Certificado de antecedentes penales de su país de origen',
          'Reciente, legalizado y traducido. Algunas prefecturas piden además un boletín marroquí una vez que lleva un tiempo en el país.',
        ],
      },
      {
        en: [
          'Documents proving the category you apply under',
          'Endorsed employment contract, school enrolment, marriage certificate or proof of private means. The supporting file differs entirely from one category to another.',
        ],
        pt: [
          'Documentos que provem a categoria sob a qual você pede',
          'Contrato de trabalho visado, matrícula escolar, certidão de casamento ou prova de meios próprios. O conjunto de provas muda inteiramente de uma categoria para outra.',
        ],
        es: [
          'Documentos que acrediten la categoría bajo la que solicita',
          'Contrato de trabajo visado, matrícula escolar, certificado de matrimonio o prueba de medios propios. El expediente de apoyo cambia por completo según la categoría.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence of stable resources',
          'Payslips, a pension statement or bank records showing you can live without public support. The amount expected is judged against your category, so confirm what your prefecture asks for.',
        ],
        pt: [
          'Comprovação de recursos estáveis',
          'Holerites, extrato de pensão ou registos bancários mostrando que você consegue viver sem apoio público. O valor esperado é avaliado conforme a categoria, então confirme o que a sua prefeitura exige.',
        ],
        es: [
          'Prueba de recursos estables',
          'Nóminas, justificante de pensión o registros bancarios que muestren que puede vivir sin apoyo público. El importe esperado se juzga según su categoría, así que confirme qué pide su prefectura.',
        ],
      },
      {
        en: [
          'Buy the fiscal stamps for the card',
          'The fee is paid in timbres fiscaux bought from a tobacconist or the treasury office rather than handed over at the counter.',
        ],
        pt: [
          'Comprar os selos fiscais do cartão',
          'A taxa é paga em timbres fiscaux comprados numa tabacaria ou na tesouraria, e não entregue em dinheiro no balcão.',
        ],
        es: [
          'Comprar los sellos fiscales de la tarjeta',
          'La tasa se paga en timbres fiscaux comprados en un estanco o en la tesorería, no en efectivo en el mostrador.',
        ],
      },
      {
        en: [
          'Open a Moroccan bank account early',
          'A local account makes resources easy to evidence and is needed for the lease, the utilities and most contracts.',
        ],
        pt: [
          'Abrir cedo uma conta bancária marroquina',
          'Uma conta local torna os recursos fáceis de comprovar e é necessária para o arrendamento, os serviços e a maioria dos contratos.',
        ],
        es: [
          'Abrir pronto una cuenta bancaria marroquí',
          'Una cuenta local facilita acreditar los recursos y hace falta para el alquiler, los suministros y casi todos los contratos.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Assemble the dossier in several complete copies',
          'Prefectures ask for the file in duplicate or triplicate. A single missing copy sends you home for the day and the queue starts again tomorrow.',
        ],
        pt: [
          'Montar o dossiê em várias vias completas',
          'As prefeituras pedem o processo em duas ou três vias. Faltando uma única cópia você volta para casa e a fila recomeça no dia seguinte.',
        ],
        es: [
          'Preparar el expediente en varias copias completas',
          'Las prefecturas piden el archivo por duplicado o triplicado. Que falte una sola copia le manda a casa y la cola vuelve a empezar al día siguiente.',
        ],
      },
      {
        en: [
          'Collect the récépissé when you submit',
          'This receipt proves lawful residence while the card is being produced and has to be carried. Without it you are undocumented on paper.',
        ],
        pt: [
          'Recolher o récépissé no momento da entrega',
          'Esse recibo comprova residência legal enquanto o cartão é produzido e precisa ser levado consigo. Sem ele você está indocumentado no papel.',
        ],
        es: [
          'Recoger el récépissé al presentar el expediente',
          'Ese resguardo acredita la residencia legal mientras se produce la tarjeta y hay que llevarlo encima. Sin él está indocumentado sobre el papel.',
        ],
      },
      {
        en: [
          'Follow the file up in person at the prefecture',
          'There is no reliable online tracking. The file tends to advance on the days you go and ask about it.',
        ],
        pt: [
          'Acompanhar o processo pessoalmente na prefeitura',
          'Não existe acompanhamento online confiável. O processo tende a andar nos dias em que você vai lá perguntar.',
        ],
        es: [
          'Hacer el seguimiento en persona en la prefectura',
          'No hay un seguimiento en línea fiable. El expediente suele avanzar los días en que uno va a preguntar.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints taken at the prefecture',
          'Captured when the file is accepted, which is also when the officer checks that every copy is present.',
        ],
        pt: [
          'Impressões digitais recolhidas na prefeitura',
          'Feitas quando o processo é aceite, momento em que o agente também confere se todas as vias estão presentes.',
        ],
        es: [
          'Huellas dactilares tomadas en la prefectura',
          'Se toman cuando se acepta el expediente, momento en que el agente comprueba también que están todas las copias.',
        ],
      },
      {
        en: [
          'Medical certificate from an approved doctor',
          'Some prefectures and some categories require it, and it must be recent at the time the file is accepted.',
        ],
        pt: [
          'Atestado médico de médico credenciado',
          'Algumas prefeituras e algumas categorias exigem, e ele precisa estar recente na data em que o processo é aceite.',
        ],
        es: [
          'Certificado médico de un facultativo autorizado',
          'Algunas prefecturas y algunas categorías lo exigen, y debe ser reciente en la fecha en que se acepta el expediente.',
        ],
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Check the category printed on the card',
          'The card states the ground on which it was granted. Working on a card issued for study or family reasons is unlawful employment.',
        ],
        pt: [
          'Conferir a categoria impressa no cartão',
          'O cartão indica o fundamento da concessão. Trabalhar com um cartão emitido por motivo de estudo ou família é trabalho ilegal.',
        ],
        es: [
          'Comprobar la categoría impresa en la tarjeta',
          'La tarjeta indica el motivo por el que se concedió. Trabajar con una tarjeta expedida por estudios o por familia es empleo ilegal.',
        ],
      },
      {
        en: [
          'Carry the card at all times',
          'Identity checks are routine and it is the card, not the passport, that the officer expects a resident to produce.',
        ],
        pt: [
          'Levar o cartão sempre consigo',
          'As verificações de identidade são rotineiras e é o cartão, não o passaporte, que o agente espera que um residente apresente.',
        ],
        es: [
          'Llevar la tarjeta siempre encima',
          'Los controles de identidad son rutinarios y es la tarjeta, no el pasaporte, lo que el agente espera que presente un residente.',
        ],
      },
      {
        en: [
          'Begin the renewal two months before expiry',
          'The first card runs for a single year, and renewing late means going through the whole initial procedure again from scratch.',
        ],
        pt: [
          'Começar a renovação dois meses antes do vencimento',
          'O primeiro cartão vale um único ano, e renovar tarde significa repetir todo o procedimento inicial do zero.',
        ],
        es: [
          'Iniciar la renovación dos meses antes del vencimiento',
          'La primera tarjeta dura un solo año, y renovar tarde implica repetir todo el procedimiento inicial desde cero.',
        ],
      },
      {
        en: [
          'Declare any change of address',
          'The card is attached to the prefecture of your address, and moving without notifying complicates the next renewal considerably.',
        ],
        pt: [
          'Declarar qualquer mudança de morada',
          'O cartão está ligado à prefeitura da sua morada, e mudar sem comunicar complica bastante a renovação seguinte.',
        ],
        es: [
          'Declarar cualquier cambio de domicilio',
          'La tarjeta está ligada a la prefectura de su domicilio, y mudarse sin avisar complica bastante la siguiente renovación.',
        ],
      },
      {
        en: [
          'Keep every expired card and receipt',
          'The long-term card is granted on continuous years of residence, and the old cards are the only proof that those years were unbroken.',
        ],
        pt: [
          'Guardar todos os cartões vencidos e recibos',
          'O cartão de longa duração é concedido por anos contínuos de residência, e os cartões antigos são a única prova de que esses anos foram ininterruptos.',
        ],
        es: [
          'Conservar todas las tarjetas caducadas y los resguardos',
          'La tarjeta de larga duración se concede por años continuos de residencia, y las tarjetas antiguas son la única prueba de que fueron ininterrumpidos.',
        ],
      },
    ],
  },

  'Work Permit': {
    core_documents: [
      {
        en: [
          'Employment contract on the official model form',
          'Morocco uses a prescribed contract for foreign employees. A company template, however complete, is not accepted for the ministry endorsement.',
        ],
        pt: [
          'Contrato de trabalho no formulário-modelo oficial',
          'Marrocos usa um contrato prescrito para empregados estrangeiros. Um modelo próprio da empresa, por mais completo, não é aceite para o visto do ministério.',
        ],
        es: [
          'Contrato de trabajo en el formulario modelo oficial',
          'Marruecos usa un contrato prescrito para empleados extranjeros. Una plantilla propia de la empresa, por completa que sea, no se acepta para el visado ministerial.',
        ],
      },
      {
        en: [
          'ANAPEC attestation that no Moroccan candidate was found',
          'The national employment agency must certify that the vacancy was published and that no suitable Moroccan applicant came forward. This attestation is the heart of the file.',
        ],
        pt: [
          'Atestado da ANAPEC de que não houve candidato marroquino',
          'A agência nacional de emprego precisa certificar que a vaga foi divulgada e que nenhum candidato marroquino adequado se apresentou. Esse atestado é o coração do processo.',
        ],
        es: [
          'Certificado de ANAPEC de que no hubo candidato marroquí',
          'La agencia nacional de empleo debe certificar que la vacante se publicó y que no se presentó ningún candidato marroquí idóneo. Ese certificado es el núcleo del expediente.',
        ],
      },
      {
        en: [
          'Ministry endorsement stamped on the contract',
          'The labour ministry visas the contract, and the employee may not start before it is granted. Work performed earlier exposes both the company and the worker to penalties.',
        ],
        pt: [
          'Visto do ministério carimbado no contrato',
          'O ministério do emprego visa o contrato, e o empregado não pode começar antes disso. Trabalho prestado antes expõe empresa e trabalhador a sanções.',
        ],
        es: [
          'Visado del ministerio estampado en el contrato',
          'El ministerio de empleo visa el contrato, y el empleado no puede empezar antes de que se conceda. Trabajar antes expone a la empresa y al trabajador a sanciones.',
        ],
      },
      {
        en: [
          'Check whether an exemption applies to you',
          'Nationals covered by bilateral agreements, spouses of Moroccan citizens and certain other categories are released from the ANAPEC step. Establishing this at the outset can save months.',
        ],
        pt: [
          'Verificar se alguma isenção se aplica a você',
          'Nacionais abrangidos por acordos bilaterais, cônjuges de cidadãos marroquinos e algumas outras categorias ficam dispensados da etapa da ANAPEC. Apurar isso logo no início pode poupar meses.',
        ],
        es: [
          'Comprobar si le corresponde alguna exención',
          'Los nacionales cubiertos por acuerdos bilaterales, los cónyuges de ciudadanos marroquíes y ciertas categorías quedan exentos del paso de ANAPEC. Aclararlo al principio puede ahorrar meses.',
        ],
      },
      {
        en: [
          'Company documents of the employer',
          'Commercial register extract, proof of tax standing and social security affiliation. The ministry examines the employer at least as closely as the employee.',
        ],
        pt: [
          'Documentos societários do empregador',
          'Extrato do registo comercial, prova de regularidade fiscal e filiação à segurança social. O ministério examina o empregador ao menos com o mesmo rigor que o empregado.',
        ],
        es: [
          'Documentos societarios del empleador',
          'Extracto del registro mercantil, prueba de estar al corriente con Hacienda y afiliación a la seguridad social. El ministerio examina al empleador al menos con el mismo rigor que al empleado.',
        ],
      },
      {
        en: [
          'Passport copies and photographs of the employee',
          'Certified copies of the data page and of the current entry stamp, with photographs to the ministry specification.',
        ],
        pt: [
          'Cópias do passaporte e fotografias do empregado',
          'Cópias autenticadas da página de dados e do carimbo de entrada atual, com fotografias no padrão exigido pelo ministério.',
        ],
        es: [
          'Copias del pasaporte y fotografías del empleado',
          'Copias compulsadas de la página de datos y del sello de entrada vigente, con fotografías según la especificación del ministerio.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Diplomas legalised and sworn-translated',
          'Into Arabic or French by an accredited translator. The ministry compares the qualification directly against the post described in the contract.',
        ],
        pt: [
          'Diplomas legalizados e com tradução juramentada',
          'Para árabe ou francês por tradutor credenciado. O ministério compara a formação diretamente com o cargo descrito no contrato.',
        ],
        es: [
          'Títulos legalizados y con traducción jurada',
          'Al árabe o al francés por un traductor acreditado. El ministerio compara la titulación directamente con el puesto descrito en el contrato.',
        ],
      },
      {
        en: [
          'Proof of the experience that justifies the recruitment',
          'Employer references establishing the specialisation that no local candidate offered, which is what the attestation rests on.',
        ],
        pt: [
          'Prova da experiência que justifica a contratação',
          'Referências de empregadores anteriores que estabeleçam a especialização que nenhum candidato local oferecia, que é o que sustenta o atestado.',
        ],
        es: [
          'Prueba de la experiencia que justifica la contratación',
          'Referencias de empleadores anteriores que acrediten la especialización que ningún candidato local ofrecía, que es lo que sostiene el certificado.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Salary consistent with the post declared',
          'Pay well below the market for the role undermines the argument that the skills were unavailable locally. Confirm the legal minimum in force and the customary range for the position.',
        ],
        pt: [
          'Salário coerente com o cargo declarado',
          'Remuneração bem abaixo do mercado para a função enfraquece o argumento de que as competências não existiam localmente. Confirme o mínimo legal vigente e a faixa usual do cargo.',
        ],
        es: [
          'Salario coherente con el puesto declarado',
          'Una retribución muy por debajo del mercado para el puesto debilita el argumento de que no había esas competencias localmente. Confirme el mínimo legal vigente y el rango habitual del puesto.',
        ],
      },
      {
        en: [
          'Registration with the social security fund',
          'The employer must declare you to the CNSS from the first month, and those contributions are what later evidence continuous lawful work.',
        ],
        pt: [
          'Inscrição no fundo de segurança social',
          'O empregador precisa declarar você à CNSS desde o primeiro mês, e essas contribuições são o que depois comprova trabalho legal contínuo.',
        ],
        es: [
          'Alta en el fondo de seguridad social',
          'El empleador debe declararle a la CNSS desde el primer mes, y esas cotizaciones son lo que después acredita trabajo legal continuo.',
        ],
      },
      {
        en: [
          'Fiscal stamps and processing charges',
          'Paid in stamps and per document, which means budgeting for the contract, the attestation and the residence card separately.',
        ],
        pt: [
          'Selos fiscais e encargos de processamento',
          'Pagos em selos e por documento, o que significa orçar separadamente o contrato, o atestado e o cartão de residência.',
        ],
        es: [
          'Sellos fiscales y gastos de tramitación',
          'Se pagan en sellos y por documento, lo que obliga a presupuestar por separado el contrato, el certificado y la tarjeta de residencia.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'The employer files the case, not the worker',
          'The procedure belongs to the company. An individual cannot lodge it alone, so an offer from an employer unwilling to do the paperwork goes nowhere.',
        ],
        pt: [
          'Quem protocola é o empregador, não o trabalhador',
          'O procedimento pertence à empresa. Um indivíduo não consegue protocolar sozinho, então uma proposta de empregador que não queira fazer a papelada não vai a lugar nenhum.',
        ],
        es: [
          'Quien presenta el expediente es el empleador, no el trabajador',
          'El procedimiento corresponde a la empresa. Un particular no puede presentarlo solo, así que una oferta de un empleador que no quiera hacer el papeleo no lleva a ninguna parte.',
        ],
      },
      {
        en: [
          'Plan for three procedures in sequence',
          'The attestation, then the contract endorsement, then the residence card. Each one must finish before the next begins, and each has its own waiting time.',
        ],
        pt: [
          'Planejar três procedimentos em sequência',
          'O atestado, depois o visto do contrato, depois o cartão de residência. Cada um precisa terminar antes de o seguinte começar, e cada um tem o seu prazo próprio.',
        ],
        es: [
          'Planificar tres procedimientos en secuencia',
          'El certificado, luego el visado del contrato, luego la tarjeta de residencia. Cada uno debe terminar antes de que empiece el siguiente, y cada uno tiene su propio plazo.',
        ],
      },
      {
        en: [
          'Track the file at the labour delegation',
          'The regional delegation holds the case between the attestation and the endorsement, and progress is checked there in person.',
        ],
        pt: [
          'Acompanhar o processo na delegação do trabalho',
          'A delegação regional guarda o caso entre o atestado e o visto, e o andamento é verificado lá, pessoalmente.',
        ],
        es: [
          'Seguir el expediente en la delegación de trabajo',
          'La delegación regional custodia el caso entre el certificado y el visado, y el avance se consulta allí en persona.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical examination where the sector requires it',
          'Food handling, healthcare and childcare roles carry their own health checks under the labour code, independently of immigration.',
        ],
        pt: [
          'Exame médico quando o setor exigir',
          'Funções em alimentação, saúde e cuidado infantil têm exames próprios previstos no código do trabalho, independentemente da imigração.',
        ],
        es: [
          'Reconocimiento médico cuando el sector lo exija',
          'Los puestos de manipulación de alimentos, sanidad y cuidado infantil llevan sus propios controles según el código laboral, al margen de inmigración.',
        ],
        required: false,
      },
      {
        en: [
          'Fingerprints belong to the residence stage',
          'The labour ministry takes no biometrics. They are collected later by the police when the residence card file is accepted.',
        ],
        pt: [
          'A biometria pertence à etapa de residência',
          'O ministério do emprego não recolhe biometria. Ela é feita depois pela polícia, quando o processo do cartão de residência é aceite.',
        ],
        es: [
          'La biometría corresponde a la etapa de residencia',
          'El ministerio de empleo no toma biometría. La recoge después la policía, cuando se acepta el expediente de la tarjeta de residencia.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Apply for the residence card as an employee',
          'The endorsed contract authorises work, not residence. The card is a separate application at the police prefecture, made within days of the endorsement.',
        ],
        pt: [
          'Pedir o cartão de residência na qualidade de empregado',
          'O contrato visado autoriza o trabalho, não a residência. O cartão é um pedido separado na prefeitura de polícia, feito poucos dias após o visto.',
        ],
        es: [
          'Solicitar la tarjeta de residencia como asalariado',
          'El contrato visado autoriza el trabajo, no la residencia. La tarjeta es una solicitud aparte en la prefectura de policía, hecha a los pocos días del visado.',
        ],
      },
      {
        en: [
          'Renew the endorsement each time the contract expires',
          'The ministry visa is tied to the contract term and renews alongside the card. The two expiry dates rarely coincide, so track both separately.',
        ],
        pt: [
          'Renovar o visto sempre que o contrato vencer',
          'O visto do ministério está ligado ao prazo do contrato e renova junto com o cartão. As duas datas de vencimento raramente coincidem, então acompanhe cada uma.',
        ],
        es: [
          'Renovar el visado cada vez que venza el contrato',
          'El visado del ministerio está ligado al plazo del contrato y se renueva junto con la tarjeta. Las dos fechas rara vez coinciden, así que controle ambas.',
        ],
      },
      {
        en: [
          'Do not change employer without a new endorsement',
          'A new contract needs a new attestation and a new ministry visa. There is no transfer of an existing authorisation between companies.',
        ],
        pt: [
          'Não trocar de empregador sem novo visto',
          'Um contrato novo exige novo atestado e novo visto do ministério. Não existe transferência de autorização já concedida entre empresas.',
        ],
        es: [
          'No cambiar de empleador sin un nuevo visado',
          'Un contrato nuevo exige un nuevo certificado y un nuevo visado ministerial. No existe traspaso de la autorización ya concedida entre empresas.',
        ],
      },
      {
        en: [
          'Obtain a Moroccan tax identification number',
          'Payroll withholding and any later property or business dealings run through it, and it is asked for at renewals.',
        ],
        pt: [
          'Obter número de identificação fiscal marroquino',
          'A retenção na folha e qualquer negócio imobiliário ou empresarial futuro passam por ele, e ele é pedido nas renovações.',
        ],
        es: [
          'Obtener el número de identificación fiscal marroquí',
          'La retención en nómina y cualquier operación inmobiliaria o empresarial futura pasan por él, y se pide en las renovaciones.',
        ],
      },
      {
        en: [
          'Keep certified copies of every endorsed contract',
          'They are the proof of continuous lawful employment that the long-term residence card is built on.',
        ],
        pt: [
          'Guardar cópias autenticadas de cada contrato visado',
          'São a prova de emprego legal contínuo sobre a qual se apoia o cartão de residência de longa duração.',
        ],
        es: [
          'Guardar copias compulsadas de cada contrato visado',
          'Son la prueba de empleo legal continuo sobre la que se construye la tarjeta de residencia de larga duración.',
        ],
      },
    ],
  },

  'Long-Term Residence Card': {
    core_documents: [
      {
        en: [
          'Prove several continuous years of lawful residence',
          'The long-term card rests on unbroken regular residence, commonly four years. A renewal allowed to lapse breaks the chain and the count starts again.',
        ],
        pt: [
          'Comprovar vários anos contínuos de residência legal',
          'O cartão de longa duração se apoia em residência regular ininterrupta, em geral quatro anos. Uma renovação deixada vencer quebra a cadeia e a contagem recomeça.',
        ],
        es: [
          'Acreditar varios años continuos de residencia legal',
          'La tarjeta de larga duración se apoya en una residencia regular ininterrumpida, habitualmente cuatro años. Una renovación caducada rompe la cadena y el cómputo vuelve a empezar.',
        ],
      },
      {
        en: [
          'All previous residence cards and receipts',
          'Originals and copies in date order, including the récépissés issued between one card and the next, which cover the gaps.',
        ],
        pt: [
          'Todos os cartões de residência anteriores e recibos',
          'Originais e cópias em ordem cronológica, incluindo os récépissés emitidos entre um cartão e o seguinte, que cobrem os intervalos.',
        ],
        es: [
          'Todas las tarjetas de residencia anteriores y resguardos',
          'Originales y copias en orden cronológico, incluidos los récépissés expedidos entre una tarjeta y la siguiente, que cubren los huecos.',
        ],
      },
      {
        en: [
          'Application lodged at the prefecture of your address',
          'The same office that handles the annual card handles this one, and it will consult its own record of your file.',
        ],
        pt: [
          'Pedido protocolado na prefeitura da sua morada',
          'A mesma repartição que cuida do cartão anual cuida deste, e ela vai consultar o histórico que mantém do seu processo.',
        ],
        es: [
          'Solicitud presentada en la prefectura de su domicilio',
          'La misma oficina que gestiona la tarjeta anual gestiona esta, y consultará el historial que guarda de su expediente.',
        ],
      },
      {
        en: [
          'Renewed criminal record certificates',
          'The Moroccan bulletin and, in many prefectures, one from your country of origin as well, both recently issued.',
        ],
        pt: [
          'Certidões de antecedentes criminais renovadas',
          'O boletim marroquino e, em muitas prefeituras, também um do seu país de origem, ambos de emissão recente.',
        ],
        es: [
          'Certificados de antecedentes penales renovados',
          'El boletín marroquí y, en muchas prefecturas, también uno de su país de origen, ambos de emisión reciente.',
        ],
      },
      {
        en: [
          'Updated proof that you actually live here',
          'Lease, utility bills and correspondence across the qualifying years, showing residence in fact rather than a card kept alive from abroad.',
        ],
        pt: [
          'Prova atualizada de que você realmente mora aqui',
          'Arrendamento, contas de serviços e correspondência ao longo dos anos qualificantes, mostrando residência de fato e não um cartão mantido à distância.',
        ],
        es: [
          'Prueba actualizada de que realmente vive aquí',
          'Alquiler, facturas de suministros y correspondencia a lo largo de los años cualificantes, que muestren residencia de hecho y no una tarjeta mantenida desde fuera.',
        ],
      },
      {
        en: [
          'Family documents when the card rests on a Moroccan spouse',
          'The marriage certificate must be transcribed in the Moroccan civil registry. A marriage celebrated abroad and never transcribed does not count for this route.',
        ],
        pt: [
          'Documentos familiares quando o cartão se apoia em cônjuge marroquino',
          'A certidão de casamento precisa estar transcrita no registo civil marroquino. Um casamento celebrado no exterior e nunca transcrito não conta para esta via.',
        ],
        es: [
          'Documentos familiares cuando la tarjeta se apoya en cónyuge marroquí',
          'El certificado de matrimonio debe estar transcrito en el registro civil marroquí. Un matrimonio celebrado fuera y nunca transcrito no vale para esta vía.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence of stable income across the whole period',
          'Payslips, tax returns or business accounts for each qualifying year. A stretch of undeclared activity shows up as a gap in the record.',
        ],
        pt: [
          'Comprovação de rendimento estável em todo o período',
          'Holerites, declarações fiscais ou contabilidade da empresa por cada ano qualificante. Um trecho de atividade não declarada aparece como lacuna no histórico.',
        ],
        es: [
          'Prueba de ingresos estables durante todo el periodo',
          'Nóminas, declaraciones fiscales o cuentas de la empresa por cada año cualificante. Un tramo de actividad no declarada aparece como un hueco en el historial.',
        ],
      },
      {
        en: [
          'Certificate of tax compliance in Morocco',
          'Issued by the tax administration. Outstanding obligations stall the file at the prefecture before it is even assessed.',
        ],
        pt: [
          'Certidão de regularidade fiscal em Marrocos',
          'Emitida pela administração fiscal. Obrigações pendentes travam o processo na prefeitura antes mesmo de ser analisado.',
        ],
        es: [
          'Certificado de estar al corriente con Hacienda en Marruecos',
          'Lo expide la administración tributaria. Las obligaciones pendientes bloquean el expediente en la prefectura antes incluso de evaluarlo.',
        ],
      },
      {
        en: [
          'Fiscal stamps at the long-term card value',
          'Bought in advance and attached to the file, at a higher value than the stamps used for the annual card.',
        ],
        pt: [
          'Selos fiscais no valor do cartão de longa duração',
          'Comprados com antecedência e anexados ao processo, num valor mais alto que o dos selos usados no cartão anual.',
        ],
        es: [
          'Sellos fiscales por el valor de la tarjeta de larga duración',
          'Comprados con antelación y adjuntados al expediente, por un valor superior al de los sellos de la tarjeta anual.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply while the current card is still valid',
          'Filing after it has expired turns the case into a fresh application and loses the accumulated years that justify the long-term card.',
        ],
        pt: [
          'Pedir enquanto o cartão atual ainda estiver válido',
          'Protocolar depois de vencido transforma o caso num pedido novo e perde os anos acumulados que justificam o cartão de longa duração.',
        ],
        es: [
          'Solicitar mientras la tarjeta actual siga vigente',
          'Presentar después de caducada convierte el caso en una solicitud nueva y pierde los años acumulados que justifican la tarjeta de larga duración.',
        ],
      },
      {
        en: [
          'Expect the prefecture to hold the file for months',
          'It consults other services before deciding, and the receipt issued at submission is what covers your status meanwhile.',
        ],
        pt: [
          'Contar que a prefeitura fique meses com o processo',
          'Ela consulta outros serviços antes de decidir, e o recibo emitido na entrega é o que cobre a sua situação nesse meio-tempo.',
        ],
        es: [
          'Contar con que la prefectura retenga el expediente meses',
          'Consulta a otros servicios antes de resolver, y el resguardo entregado al presentar es lo que cubre su situación mientras tanto.',
        ],
      },
      {
        en: [
          'Prepare the file in several bound copies',
          'The volume is larger than for the annual card because it covers every year, so organise it by year rather than by document type.',
        ],
        pt: [
          'Preparar o processo em várias vias encadernadas',
          'O volume é maior que o do cartão anual porque cobre todos os anos, então organize por ano em vez de por tipo de documento.',
        ],
        es: [
          'Preparar el expediente en varias copias encuadernadas',
          'El volumen es mayor que el de la tarjeta anual porque cubre todos los años, así que organícelo por año y no por tipo de documento.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Updated fingerprints and photographs',
          'Retaken for the new card even though the prefecture already holds a set from the annual renewals.',
        ],
        pt: [
          'Impressões digitais e fotografias atualizadas',
          'Refeitas para o novo cartão mesmo que a prefeitura já tenha um conjunto das renovações anuais.',
        ],
        es: [
          'Huellas y fotografías actualizadas',
          'Se vuelven a tomar para la nueva tarjeta aunque la prefectura ya conserve un juego de las renovaciones anuales.',
        ],
      },
      {
        en: [
          'Medical certificate if the prefecture asks for one',
          'Not systematic at this stage, but some offices request it, and refusing to provide it stalls the file rather than ending it.',
        ],
        pt: [
          'Atestado médico se a prefeitura pedir',
          'Não é sistemático nesta fase, mas algumas repartições pedem, e recusar-se a apresentar trava o processo em vez de encerrá-lo.',
        ],
        es: [
          'Certificado médico si la prefectura lo pide',
          'No es sistemático en esta fase, pero algunas oficinas lo solicitan, y negarse a aportarlo bloquea el expediente en lugar de cerrarlo.',
        ],
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Check the validity printed on the resident card',
          'The long-term card runs for a decade, so verify that the term granted matches what your category allows before leaving the counter.',
        ],
        pt: [
          'Conferir a validade impressa no cartão de residente',
          'O cartão de longa duração vale uma década, então confira se o prazo concedido corresponde ao que a sua categoria permite antes de sair do balcão.',
        ],
        es: [
          'Comprobar la vigencia impresa en la tarjeta de residente',
          'La tarjeta de larga duración dura una década, así que verifique que el plazo concedido coincide con lo que permite su categoría antes de irse del mostrador.',
        ],
      },
      {
        en: [
          'Avoid long absences from Morocco',
          'The card rests on actually residing here, and an extended continuous absence can cost it even though it has years left to run.',
        ],
        pt: [
          'Evitar ausências longas de Marrocos',
          'O cartão se apoia em residir de fato aqui, e uma ausência contínua prolongada pode custá-lo mesmo faltando anos para o vencimento.',
        ],
        es: [
          'Evitar ausencias largas de Marruecos',
          'La tarjeta se apoya en residir realmente aquí, y una ausencia continua prolongada puede costarla aunque le queden años de vigencia.',
        ],
      },
      {
        en: [
          'Notify the prefecture whenever you move',
          'The registered address is what identifies your file, and an untraceable holder is a problem at the next check.',
        ],
        pt: [
          'Comunicar à prefeitura sempre que mudar de casa',
          'A morada registada é o que identifica o seu processo, e um titular ilocalizável vira problema na verificação seguinte.',
        ],
        es: [
          'Avisar a la prefectura cada vez que se mude',
          'El domicilio registrado es lo que identifica su expediente, y un titular ilocalizable es un problema en el siguiente control.',
        ],
      },
      {
        en: [
          'Remember the card is not a work authorisation',
          'Salaried employment still runs through an endorsed contract unless you fall under an exemption. The card solves residence, not labour.',
        ],
        pt: [
          'Lembrar que o cartão não é autorização de trabalho',
          'O emprego assalariado continua passando por contrato visado, salvo se você estiver isento. O cartão resolve a residência, não a questão laboral.',
        ],
        es: [
          'Recordar que la tarjeta no es autorización de trabajo',
          'El empleo asalariado sigue pasando por un contrato visado salvo que le ampare una exención. La tarjeta resuelve la residencia, no lo laboral.',
        ],
      },
      {
        en: [
          'Treat naturalisation as a separate question',
          'Moroccan nationality requires long residence plus sufficient Arabic and remains discretionary. The long-term card does not lead there automatically.',
        ],
        pt: [
          'Tratar a naturalização como questão à parte',
          'A nacionalidade marroquina exige longa residência mais árabe suficiente e continua discricionária. O cartão de longa duração não leva a ela automaticamente.',
        ],
        es: [
          'Tratar la naturalización como una cuestión aparte',
          'La nacionalidad marroquí exige larga residencia más árabe suficiente y sigue siendo discrecional. La tarjeta de larga duración no conduce a ella automáticamente.',
        ],
      },
    ],
  },
};
