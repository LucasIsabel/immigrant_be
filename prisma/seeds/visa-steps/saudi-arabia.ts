import type { CountryVisaSteps } from './types';

/**
 * Steps for Saudi Arabia.
 *
 * Outside the Premium Residency route, everything hangs on the sponsor. The
 * employer first obtains a visa block from the ministry against its own quota;
 * only then does an authorisation number reach the applicant, and only then can
 * an embassy file be opened. Someone gathering documents before the block
 * exists is preparing for a process that has not started.
 *
 * Two details sink more files than any legal subtlety: the medical examination
 * has to be done at an accredited centre in the country of origin, not at any
 * clinic, and diplomas and police certificates must be legalised by the Saudi
 * mission rather than merely apostilled. After arrival the Iqama is the identity
 * document and is renewed every year.
 *
 * Premium Residency is the deliberate exception: it is self-sponsored, bought
 * either once or annually, and no kafeel appears anywhere in it.
 */
export const saudiArabia: CountryVisaSteps = {
  'Visit Visa / Tourist e-Visa': {
    core_documents: [
      {
        en: [
          'Passport valid for at least six months',
          'Counted from the date of entry, not the date of application; a short passport still gets an e-visa and is then turned away at the border.',
        ],
        pt: [
          'Passaporte com validade mínima de seis meses',
          'Contada a partir da entrada, não do pedido; um passaporte curto ainda recebe o e-visa e depois é barrado na fronteira.',
        ],
        es: [
          'Pasaporte con al menos seis meses de vigencia',
          'Se cuenta desde la entrada, no desde la solicitud; un pasaporte corto igual obtiene el e-visa y luego es rechazado en la frontera.',
        ],
      },
      {
        en: [
          'Check whether your nationality qualifies online',
          'Only a defined list of countries can use the electronic route; everyone else needs a host inside the kingdom to request the visa first.',
        ],
        pt: [
          'Verificar se sua nacionalidade se qualifica online',
          'Só uma lista definida de países usa a via eletrônica; os demais precisam de um anfitrião dentro do reino para pedir o visto antes.',
        ],
        es: [
          'Comprobar si su nacionalidad califica en línea',
          'Solo una lista definida de países usa la vía electrónica; el resto necesita un anfitrión dentro del reino que solicite el visado antes.',
        ],
      },
      {
        en: [
          'Recent photograph on a plain background',
          'The portal rejects images with glasses, shadows or anything covering the face, and that rejection is the most frequent reason a form bounces.',
        ],
        pt: [
          'Fotografia recente em fundo liso',
          'O portal recusa imagens com óculos, sombras ou algo cobrindo o rosto, e essa recusa é o motivo mais frequente de o formulário voltar.',
        ],
        es: [
          'Fotografía reciente con fondo liso',
          'El portal rechaza imágenes con gafas, sombras o algo que cubra el rostro, y ese rechazo es el motivo más frecuente de que el formulario vuelva.',
        ],
      },
      {
        en: [
          'Hotel booking or the address of your host',
          'The form asks where each night will be spent, so an open itinerary stalls the application.',
        ],
        pt: [
          'Reserva de hotel ou endereço do anfitrião',
          'O formulário pergunta onde cada noite será passada, então um itinerário em aberto trava o pedido.',
        ],
        es: [
          'Reserva de hotel o domicilio del anfitrión',
          'El formulario pregunta dónde se pasará cada noche, así que un itinerario abierto detiene la solicitud.',
        ],
      },
      {
        en: [
          'Return or onward ticket',
          'Airlines check it at boarding for Saudi Arabia even when the visa has already been granted.',
        ],
        pt: [
          'Passagem de volta ou de continuação',
          'As companhias aéreas conferem no embarque para a Arábia Saudita mesmo com o visto já concedido.',
        ],
        es: [
          'Billete de vuelta o de continuación',
          'Las aerolíneas lo comprueban al embarcar hacia Arabia Saudí incluso con el visado ya concedido.',
        ],
      },
      {
        en: [
          'Invitation issued by a Saudi host',
          'Only for family and business visits outside the electronic route: the host applies inside the country and sends you the authorisation number, never the reverse.',
        ],
        pt: [
          'Convite emitido por um anfitrião saudita',
          'Só para visitas de família e de negócios fora da via eletrônica: o anfitrião pede dentro do país e envia a você o número de autorização, nunca o contrário.',
        ],
        es: [
          'Invitación emitida por un anfitrión saudí',
          'Solo para visitas familiares y de negocios fuera de la vía electrónica: el anfitrión solicita dentro del país y le envía el número de autorización, nunca al revés.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of funds for the whole visit',
          'Card and bank statements are what gets asked for at secondary inspection when the stay looks longer than the money supports.',
        ],
        pt: [
          'Comprovação de recursos para toda a visita',
          'Extratos de cartão e de banco são o que pedem na inspeção secundária quando a estada parece mais longa do que o dinheiro sustenta.',
        ],
        es: [
          'Prueba de fondos para toda la visita',
          'Los extractos de tarjeta y de banco son lo que piden en la inspección secundaria cuando la estancia parece más larga de lo que el dinero sostiene.',
        ],
      },
      {
        en: [
          'Payment card issued in your own name',
          'The portal charges the fee and the compulsory policy together, and a card belonging to someone else is declined with the application lost.',
        ],
        pt: [
          'Cartão de pagamento emitido no seu nome',
          'O portal cobra a taxa e a apólice obrigatória juntas, e um cartão de terceiro é recusado com o pedido perdido.',
        ],
        es: [
          'Tarjeta de pago emitida a su nombre',
          'El portal cobra la tasa y la póliza obligatoria juntas, y una tarjeta de un tercero se rechaza y la solicitud se pierde.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply on the official electronic visa portal',
          'Reseller sites charge a markup for the same form and keep your data; the government channel is the only one that issues.',
        ],
        pt: [
          'Pedir no portal oficial de visto eletrônico',
          'Sites revendedores cobram ágio pelo mesmo formulário e ficam com seus dados; o canal do governo é o único que emite.',
        ],
        es: [
          'Solicitar en el portal oficial de visado electrónico',
          'Los sitios revendedores cobran un sobreprecio por el mismo formulario y se quedan con sus datos; el canal del gobierno es el único que emite.',
        ],
      },
      {
        en: [
          'Pay the visa fee and the insurance charge',
          'Confirm the amounts in force before paying: the total is charged upfront and is not returned if the application is refused.',
        ],
        pt: [
          'Pagar a taxa do visto e o valor do seguro',
          'Confirme os valores vigentes antes de pagar: o total é cobrado na hora e não é devolvido se o pedido for indeferido.',
        ],
        es: [
          'Pagar la tasa del visado y el cargo del seguro',
          'Confirme los importes vigentes antes de pagar: el total se cobra por adelantado y no se devuelve si la solicitud es denegada.',
        ],
      },
      {
        en: [
          'Go through the embassy if you are not eligible online',
          'That path begins with the sponsor inside the kingdom and takes weeks rather than the minutes the electronic route takes.',
        ],
        pt: [
          'Ir pela embaixada se não for elegível online',
          'Esse caminho começa com o patrocinador dentro do reino e leva semanas, não os minutos da via eletrônica.',
        ],
        es: [
          'Ir por la embajada si no es elegible en línea',
          'Esa vía empieza con el patrocinador dentro del reino y tarda semanas, no los minutos de la vía electrónica.',
        ],
      },
      {
        en: [
          'Print the approved visa and read its validity window',
          'The days allowed per entry and the overall validity are two different numbers, and confusing them is exactly how overstays happen.',
        ],
        pt: [
          'Imprimir o visto aprovado e ler a janela de validade',
          'Os dias permitidos por entrada e a validade total são dois números diferentes, e confundi-los é exatamente como nascem as estadas irregulares.',
        ],
        es: [
          'Imprimir el visado aprobado y leer su ventana de validez',
          'Los días permitidos por entrada y la validez total son dos cifras distintas, y confundirlas es justo como se producen las estancias irregulares.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints and photograph at the port of entry',
          'Collected on arrival, so the electronic route needs no biometric appointment beforehand.',
        ],
        pt: [
          'Impressões digitais e fotografia no ponto de entrada',
          'Coletadas na chegada, então a via eletrônica não exige agendamento biométrico antes.',
        ],
        es: [
          'Huellas y fotografía en el punto de entrada',
          'Se toman a la llegada, así que la vía electrónica no exige cita biométrica previa.',
        ],
      },
      {
        en: [
          'Health insurance bundled with the electronic visa',
          'It comes inside the fee and cannot be swapped for your own policy; check what it actually covers before extending the trip.',
        ],
        pt: [
          'Seguro de saúde embutido no visto eletrônico',
          'Vem dentro da taxa e não pode ser trocado pela sua própria apólice; confira o que ele de fato cobre antes de esticar a viagem.',
        ],
        es: [
          'Seguro de salud incluido en el visado electrónico',
          'Viene dentro de la tasa y no puede sustituirse por su propia póliza; compruebe qué cubre realmente antes de alargar el viaje.',
        ],
      },
      {
        en: [
          'Meningococcal vaccination certificate when required',
          'Demanded during the pilgrimage seasons and for arrivals from certain countries; confirm the requirement before flying, not at the gate.',
        ],
        pt: [
          'Certificado de vacinação meningocócica quando exigido',
          'Cobrado nas temporadas de peregrinação e para quem chega de certos países; confirme a exigência antes de voar, não no portão.',
        ],
        es: [
          'Certificado de vacunación meningocócica cuando se exija',
          'Se exige en las temporadas de peregrinación y a quienes llegan de ciertos países; confirme el requisito antes de volar, no en la puerta.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Respect the number of days allowed per entry',
          'A fine accrues for every day beyond the limit and can be followed by a ban on returning.',
        ],
        pt: [
          'Respeitar o número de dias permitido por entrada',
          'Uma multa corre por cada dia além do limite e pode ser seguida de proibição de retorno.',
        ],
        es: [
          'Respetar los días permitidos por cada entrada',
          'Se acumula una multa por cada día más allá del límite y puede seguir una prohibición de regreso.',
        ],
      },
      {
        en: [
          'Do not work or trade while on a visit status',
          'Any paid activity, including invoicing a local client remotely, is grounds for deportation.',
        ],
        pt: [
          'Não trabalhar nem comercializar em status de visita',
          'Qualquer atividade remunerada, inclusive faturar remotamente para um cliente local, é motivo de deportação.',
        ],
        es: [
          'No trabajar ni comerciar con estatus de visita',
          'Cualquier actividad remunerada, incluso facturar a distancia a un cliente local, es motivo de deportación.',
        ],
      },
      {
        en: [
          'Perform Umrah with this visa if you wish',
          'It is allowed on the tourist route, but Hajj runs on its own permit and quota and is not covered here.',
        ],
        pt: [
          'Fazer a Umrah com este visto se quiser',
          'É permitido na via turística, mas o Hajj corre por permissão e cota próprias e não está coberto aqui.',
        ],
        es: [
          'Realizar la Umrah con este visado si lo desea',
          'Está permitido en la vía turística, pero el Hach corre por su propio permiso y cupo y no queda cubierto aquí.',
        ],
        required: false,
      },
      {
        en: [
          'Leave before expiry instead of counting on an extension',
          'Extensions on this status are limited and discretionary, so planning around one is planning around a refusal.',
        ],
        pt: [
          'Sair antes do vencimento em vez de contar com prorrogação',
          'Prorrogações nesse status são limitadas e discricionárias, então planejar em cima de uma é planejar em cima de uma negativa.',
        ],
        es: [
          'Salir antes del vencimiento en vez de contar con una prórroga',
          'Las prórrogas en este estatus son limitadas y discrecionales, así que planificar con una es planificar con una negativa.',
        ],
        priority: 2,
      },
      {
        en: [
          'Do not expect to convert this into residence',
          'A residence card only follows an employer obtaining a work block and your re-entry on it, so the change cannot be made from inside.',
        ],
        pt: [
          'Não esperar converter isso em residência',
          'O cartão de residência só vem depois de um empregador obter um bloco de trabalho e de você reentrar com ele, então a mudança não se faz por dentro.',
        ],
        es: [
          'No esperar convertir esto en residencia',
          'La tarjeta de residencia solo llega tras un empleador obtener un bloque de trabajo y su reentrada con él, así que el cambio no se hace desde dentro.',
        ],
      },
    ],
  },

  'Work Visa and Iqama': {
    core_documents: [
      {
        en: [
          'Employer obtains the visa block from the ministry',
          'Nothing exists before this: the block comes out of the company quota under the Saudization bands, and no document of yours can create one.',
        ],
        pt: [
          'Empregador obtém o bloco de visto junto ao ministério',
          'Nada existe antes disso: o bloco sai da cota da empresa nas faixas de saudização, e nenhum documento seu cria um.',
        ],
        es: [
          'El empleador obtiene el bloque de visado en el ministerio',
          'Nada existe antes de eso: el bloque sale del cupo de la empresa según las bandas de saudización, y ningún documento suyo crea uno.',
        ],
      },
      {
        en: [
          'Visa authorisation number sent by the sponsor',
          'Released once the block is assigned to your nationality and job title; the embassy file is opened with this number and not before.',
        ],
        pt: [
          'Número de autorização de visto enviado pelo patrocinador',
          'Liberado quando o bloco é atribuído à sua nacionalidade e cargo; o processo na embaixada abre com esse número e não antes.',
        ],
        es: [
          'Número de autorización de visado enviado por el patrocinador',
          'Se libera cuando el bloque se asigna a su nacionalidad y puesto; el expediente en la embajada se abre con ese número y no antes.',
        ],
      },
      {
        en: [
          'Passport valid for at least six months',
          'It also needs blank pages, because the residence stamps take a full page each.',
        ],
        pt: [
          'Passaporte com validade mínima de seis meses',
          'Também precisa de páginas em branco, porque os carimbos de residência ocupam uma página cada.',
        ],
        es: [
          'Pasaporte con al menos seis meses de vigencia',
          'También necesita páginas en blanco, porque los sellos de residencia ocupan una página cada uno.',
        ],
      },
      {
        en: [
          'Employment contract signed with the Saudi sponsor',
          'The job title in it has to match the one on the block word for word, otherwise the visa is not stamped.',
        ],
        pt: [
          'Contrato de trabalho assinado com o patrocinador saudita',
          'O cargo nele precisa bater com o do bloco palavra por palavra, senão o visto não é carimbado.',
        ],
        es: [
          'Contrato de trabajo firmado con el patrocinador saudí',
          'El puesto que figura debe coincidir con el del bloque palabra por palabra, o el visado no se sella.',
        ],
      },
      {
        en: [
          'Police clearance certificate legalised by the Saudi embassy',
          'An apostille is not enough: the chain runs notary, foreign ministry, then Saudi mission, and skipping a link means starting over.',
        ],
        pt: [
          'Certidão de antecedentes legalizada pela embaixada saudita',
          'Apostila não basta: a cadeia passa por cartório, chancelaria e missão saudita, e pular um elo significa recomeçar.',
        ],
        es: [
          'Certificado de antecedentes legalizado por la embajada saudí',
          'La apostilla no basta: la cadena pasa por notaría, cancillería y misión saudí, y saltarse un eslabón obliga a empezar de nuevo.',
        ],
      },
      {
        en: [
          'Marriage and birth certificates for accompanying family',
          'Same legalisation chain as the rest, and families routinely arrive months late because these were left for the end.',
        ],
        pt: [
          'Certidões de casamento e nascimento da família acompanhante',
          'Mesma cadeia de legalização do resto, e famílias costumam chegar meses depois por terem deixado isso para o fim.',
        ],
        es: [
          'Certificados de matrimonio y nacimiento de la familia acompañante',
          'La misma cadena de legalización que el resto, y las familias suelen llegar meses tarde por haberlo dejado para el final.',
        ],
        priority: 2,
        required: false,
      },
    ],
    education: [
      {
        en: [
          'Degree certificate attested by the Saudi mission',
          'Attestation rather than apostille, and the field of study has to be consistent with the job title on the block.',
        ],
        pt: [
          'Diploma autenticado pela missão saudita',
          'Autenticação consular, não apostila, e a área de formação precisa ser coerente com o cargo do bloco.',
        ],
        es: [
          'Título autenticado por la misión saudí',
          'Autenticación consular, no apostilla, y el área de estudio debe ser coherente con el puesto del bloque.',
        ],
      },
      {
        en: [
          'Professional registration for regulated occupations',
          'Health, engineering and teaching roles need clearance from the relevant Saudi council before the visa can be issued.',
        ],
        pt: [
          'Registro profissional para ocupações regulamentadas',
          'Funções de saúde, engenharia e ensino exigem liberação do conselho saudita da área antes de o visto sair.',
        ],
        es: [
          'Registro profesional para ocupaciones reguladas',
          'Los puestos de salud, ingeniería y docencia exigen la habilitación del consejo saudí del área antes de que salga el visado.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Salary consistent between contract and block',
          'A figure that differs between the two suspends the file, and the amount is later checked against the wage protection system.',
        ],
        pt: [
          'Salário coerente entre contrato e bloco',
          'Um valor divergente entre os dois suspende o processo, e o montante é depois conferido no sistema de proteção salarial.',
        ],
        es: [
          'Salario coherente entre contrato y bloque',
          'Una cifra distinta entre ambos suspende el expediente, y el importe se coteja después con el sistema de protección salarial.',
        ],
      },
      {
        en: [
          'Provision for the dependant levy',
          'A monthly charge applies for each family member on your residence; confirm the rate in force, since many employers do not absorb it.',
        ],
        pt: [
          'Provisão para a taxa de dependentes',
          'Há cobrança mensal por cada familiar na sua residência; confirme o valor vigente, já que muitos empregadores não a absorvem.',
        ],
        es: [
          'Provisión para la tasa de dependientes',
          'Se cobra un importe mensual por cada familiar en su residencia; confirme la tarifa vigente, ya que muchos empleadores no la asumen.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Open the application in the online visa system',
          'The form is filed before any appointment and produces the barcode that the counter asks for.',
        ],
        pt: [
          'Abrir o pedido no sistema de vistos online',
          'O formulário é enviado antes de qualquer agendamento e gera o código de barras que o guichê pede.',
        ],
        es: [
          'Abrir la solicitud en el sistema de visados en línea',
          'El formulario se presenta antes de cualquier cita y genera el código de barras que pide la ventanilla.',
        ],
      },
      {
        en: [
          'Lodge the documents at the accredited visa centre',
          'The Saudi missions do not receive applicants directly, so only the appointed centre takes the file.',
        ],
        pt: [
          'Entregar os documentos no centro de vistos credenciado',
          'As missões sauditas não recebem requerentes diretamente, então só o centro designado aceita o processo.',
        ],
        es: [
          'Presentar los documentos en el centro de visados acreditado',
          'Las misiones saudíes no reciben solicitantes directamente, así que solo el centro designado admite el expediente.',
        ],
      },
      {
        en: [
          'Pay the issuance and stamping fees',
          'Confirm the current schedule; the amounts change from year to year and nothing is refunded if the file is rejected.',
        ],
        pt: [
          'Pagar as taxas de emissão e de carimbo',
          'Confirme a tabela vigente; os valores mudam de ano para ano e nada é devolvido se o processo for recusado.',
        ],
        es: [
          'Pagar las tasas de emisión y de sellado',
          'Confirme el baremo vigente; los importes cambian de un año a otro y nada se devuelve si el expediente es rechazado.',
        ],
      },
      {
        en: [
          'Travel within the validity of the entry visa',
          'It lapses a few months after issue, and letting it expire wastes the whole block your employer spent months securing.',
        ],
        pt: [
          'Viajar dentro da validade do visto de entrada',
          'Ele caduca poucos meses após a emissão, e deixá-lo vencer joga fora o bloco inteiro que o empregador levou meses para conseguir.',
        ],
        es: [
          'Viajar dentro de la validez del visado de entrada',
          'Caduca pocos meses tras la emisión, y dejarlo vencer desperdicia el bloque entero que el empleador tardó meses en conseguir.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical examination at an accredited centre at home',
          'It must be done at a centre approved for Saudi files in your country of origin; a report from any other clinic is rejected outright, and this ends more processes than any other single step.',
        ],
        pt: [
          'Exame médico em centro credenciado no país de origem',
          'Precisa ser feito em centro aprovado para processos sauditas no seu país; laudo de qualquer outra clínica é recusado de plano, e isso encerra mais processos do que qualquer outra etapa.',
        ],
        es: [
          'Examen médico en un centro acreditado del país de origen',
          'Debe hacerse en un centro aprobado para expedientes saudíes en su país; un informe de cualquier otra clínica se rechaza de plano, y eso termina más procesos que cualquier otra etapa.',
        ],
      },
      {
        en: [
          'Fingerprints and photograph at the visa centre',
          'Taken when the file is lodged abroad and repeated on arrival in the kingdom.',
        ],
        pt: [
          'Impressões digitais e fotografia no centro de vistos',
          'Coletadas na entrega do processo no exterior e repetidas na chegada ao reino.',
        ],
        es: [
          'Huellas y fotografía en el centro de visados',
          'Se toman al presentar el expediente en el extranjero y se repiten al llegar al reino.',
        ],
      },
      {
        en: [
          'Second medical examination after arrival',
          'Carried out locally and required before the residence card can be issued, so book it in the first days rather than the last.',
        ],
        pt: [
          'Segundo exame médico após a chegada',
          'Feito localmente e exigido antes de o cartão de residência ser emitido, então marque nos primeiros dias, não nos últimos.',
        ],
        es: [
          'Segundo examen médico tras la llegada',
          'Se realiza localmente y se exige antes de emitir la tarjeta de residencia, así que resérvelo los primeros días, no los últimos.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Employer applies for the Iqama within ninety days',
          'The deadline runs from your entry; the fine lands on the company but the irregular status lands on you.',
        ],
        pt: [
          'Empregador solicita a Iqama em até noventa dias',
          'O prazo corre da sua entrada; a multa cai sobre a empresa, mas a situação irregular cai sobre você.',
        ],
        es: [
          'El empleador solicita la Iqama en noventa días',
          'El plazo corre desde su entrada; la multa recae en la empresa, pero la situación irregular recae en usted.',
        ],
      },
      {
        en: [
          'Carry the residence card at all times',
          'It replaces the passport as identification for everything, from a phone line to a tenancy agreement.',
        ],
        pt: [
          'Andar sempre com o cartão de residência',
          'Ele substitui o passaporte como identificação em tudo, de uma linha telefônica a um contrato de aluguel.',
        ],
        es: [
          'Llevar siempre encima la tarjeta de residencia',
          'Sustituye al pasaporte como identificación para todo, desde una línea telefónica hasta un contrato de alquiler.',
        ],
      },
      {
        en: [
          'Renew the residence card every year before it expires',
          'The cycle is annual and lateness is fined per day; the sponsor files it, but the consequence of forgetting is yours to live with.',
        ],
        pt: [
          'Renovar o cartão de residência todo ano antes de vencer',
          'O ciclo é anual e o atraso é multado por dia; o patrocinador protocola, mas quem convive com a consequência do esquecimento é você.',
        ],
        es: [
          'Renovar la tarjeta de residencia cada año antes de vencer',
          'El ciclo es anual y el retraso se multa por día; el patrocinador lo tramita, pero quien vive la consecuencia del olvido es usted.',
        ],
      },
      {
        en: [
          'Obtain an exit and re-entry permit before leaving',
          'Departing without one cancels the residence, and the permit itself has a window you must come back inside.',
        ],
        pt: [
          'Obter permissão de saída e reentrada antes de viajar',
          'Sair sem ela cancela a residência, e a própria permissão tem um prazo dentro do qual você precisa voltar.',
        ],
        es: [
          'Obtener permiso de salida y reentrada antes de viajar',
          'Salir sin él cancela la residencia, y el propio permiso tiene un plazo dentro del cual debe regresar.',
        ],
      },
      {
        en: [
          'Change employer through the official transfer route',
          'The labour reform allows a move under conditions; simply walking away from the job triggers an absconding report and a ban.',
        ],
        pt: [
          'Trocar de empregador pela via oficial de transferência',
          'A reforma trabalhista permite a mudança sob condições; simplesmente abandonar o emprego gera registro de fuga e proibição de retorno.',
        ],
        es: [
          'Cambiar de empleador por la vía oficial de traspaso',
          'La reforma laboral permite el cambio bajo condiciones; abandonar el empleo sin más genera un informe de fuga y una prohibición.',
        ],
      },
    ],
  },

  'Premium Residency': {
    core_documents: [
      {
        en: [
          'Choose between the permanent and the renewable category',
          'One is a single payment for life, the other is charged every year; check the current amounts, because this choice shapes the entire file.',
        ],
        pt: [
          'Escolher entre a categoria permanente e a renovável',
          'Uma é pagamento único vitalício, a outra é cobrada todo ano; confira os valores vigentes, porque essa escolha molda o processo inteiro.',
        ],
        es: [
          'Elegir entre la categoría permanente y la renovable',
          'Una es un pago único vitalicio, la otra se cobra cada año; consulte los importes vigentes, porque esa elección moldea todo el expediente.',
        ],
      },
      {
        en: [
          'Passport valid for the period requested',
          'Renewals of the passport later require updating the record, so a document about to expire creates work twice.',
        ],
        pt: [
          'Passaporte válido para o período solicitado',
          'Renovar o passaporte depois obriga a atualizar o cadastro, então um documento prestes a vencer gera trabalho em dobro.',
        ],
        es: [
          'Pasaporte vigente para el periodo solicitado',
          'Renovar el pasaporte después obliga a actualizar el registro, así que un documento por caducar genera trabajo doble.',
        ],
      },
      {
        en: [
          'Application filed on the premium residency portal',
          'You apply for yourself: no sponsor appears anywhere in this route, which is exactly what separates it from every other residence in the country.',
        ],
        pt: [
          'Pedido feito no portal da residência premium',
          'Você pede por conta própria: nenhum patrocinador aparece nesta rota, e é exatamente isso que a separa de qualquer outra residência no país.',
        ],
        es: [
          'Solicitud presentada en el portal de residencia premium',
          'Usted solicita por su cuenta: ningún patrocinador aparece en esta vía, y eso es justo lo que la separa de cualquier otra residencia del país.',
        ],
      },
      {
        en: [
          'Criminal record certificate legalised for Saudi use',
          'A clean record is a substantive condition here, not a formality, and a conviction closes the file at the screening stage.',
        ],
        pt: [
          'Certidão criminal legalizada para uso saudita',
          'Ficha limpa é condição de mérito aqui, não formalidade, e uma condenação encerra o processo já na triagem.',
        ],
        es: [
          'Certificado de antecedentes penales legalizado para uso saudí',
          'Un historial limpio es una condición de fondo aquí, no un trámite, y una condena cierra el expediente ya en el filtrado.',
        ],
      },
      {
        en: [
          'Evidence of the category you qualify under',
          'Special talent, investor, entrepreneur and property owner each carry their own document set, and choosing the wrong one restarts the process.',
        ],
        pt: [
          'Comprovação da categoria pela qual você se qualifica',
          'Talento especial, investidor, empreendedor e proprietário de imóvel têm conjuntos de documentos próprios, e escolher o errado reinicia o processo.',
        ],
        es: [
          'Prueba de la categoría por la que califica',
          'Talento especial, inversor, emprendedor y propietario de inmueble tienen sus propios documentos, y elegir mal reinicia el proceso.',
        ],
      },
      {
        en: [
          'Current residence status if you apply from inside',
          'Holders of an ordinary residence can switch, but the existing sponsor is notified and the handover needs to be planned before filing.',
        ],
        pt: [
          'Status de residência atual se pedir de dentro do país',
          'Quem tem residência comum pode migrar, mas o patrocinador atual é notificado e a transição precisa ser planejada antes de protocolar.',
        ],
        es: [
          'Estatus de residencia actual si solicita desde dentro',
          'Quien tiene residencia ordinaria puede cambiar, pero se notifica al patrocinador actual y el traspaso debe planificarse antes de presentar.',
        ],
        priority: 2,
        required: false,
      },
    ],
    education: [
      {
        en: [
          'Attested degrees and professional credentials',
          'The special talent route is assessed by the Saudi authority for your field, and qualifications without consular attestation are not even evaluated.',
        ],
        pt: [
          'Diplomas e credenciais profissionais autenticados',
          'A rota de talento especial é avaliada pela autoridade saudita da sua área, e qualificações sem autenticação consular sequer são analisadas.',
        ],
        es: [
          'Títulos y credenciales profesionales autenticados',
          'La vía de talento especial la evalúa la autoridad saudí de su campo, y las titulaciones sin autenticación consular ni siquiera se analizan.',
        ],
      },
      {
        en: [
          'Recommendation from a recognised body in your field',
          'It strengthens the talent assessment; without one the case rests entirely on paperwork and scores lower.',
        ],
        pt: [
          'Recomendação de entidade reconhecida na sua área',
          'Reforça a avaliação de talento; sem ela o caso se apoia só em papelada e pontua menos.',
        ],
        es: [
          'Recomendación de una entidad reconocida en su campo',
          'Refuerza la evaluación de talento; sin ella el caso se apoya solo en papeleo y puntúa menos.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of solvency and the origin of your funds',
          'Screening looks at where the money came from as closely as how much of it there is.',
        ],
        pt: [
          'Comprovação de solvência e da origem dos recursos',
          'A triagem olha de onde veio o dinheiro com o mesmo cuidado com que olha quanto ele é.',
        ],
        es: [
          'Prueba de solvencia y del origen de sus fondos',
          'El filtrado mira de dónde vino el dinero con la misma atención con que mira cuánto es.',
        ],
      },
      {
        en: [
          'Evidence of the qualifying investment or property',
          'Confirm the minimum value in force for your category; property has to be owned outright, and anything mortgaged does not count.',
        ],
        pt: [
          'Comprovação do investimento ou imóvel qualificador',
          'Confirme o valor mínimo vigente para sua categoria; o imóvel precisa ser quitado, e o que estiver hipotecado não conta.',
        ],
        es: [
          'Prueba de la inversión o del inmueble que califica',
          'Confirme el valor mínimo vigente para su categoría; el inmueble debe estar libre de cargas, y lo hipotecado no cuenta.',
        ],
      },
      {
        en: [
          'Provision for the premium residency fee',
          'Charged once in the permanent category and every year in the other; verify the figure in force and note that it is not returned.',
        ],
        pt: [
          'Provisão para a taxa da residência premium',
          'Cobrada uma vez na categoria permanente e todo ano na outra; verifique o valor vigente e saiba que ele não é devolvido.',
        ],
        es: [
          'Provisión para la tasa de la residencia premium',
          'Se cobra una vez en la categoría permanente y cada año en la otra; verifique el importe vigente y tenga en cuenta que no se devuelve.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Submit and wait for the security and eligibility screening',
          'This stage decides everything and takes months; there is no expedited channel to buy your way into.',
        ],
        pt: [
          'Enviar e aguardar a triagem de segurança e elegibilidade',
          'Essa etapa decide tudo e leva meses; não há canal acelerado que se possa comprar.',
        ],
        es: [
          'Enviar y esperar el filtrado de seguridad y elegibilidad',
          'Esa etapa lo decide todo y tarda meses; no hay canal acelerado que se pueda comprar.',
        ],
      },
      {
        en: [
          'Pay the issuance amount only after approval',
          'Nothing substantial is charged upfront, so a demand for advance payment is coming from an intermediary, not from the authority.',
        ],
        pt: [
          'Pagar o valor de emissão só depois da aprovação',
          'Nada relevante é cobrado antes, então cobrança antecipada vem de intermediário, não da autoridade.',
        ],
        es: [
          'Pagar el importe de emisión solo tras la aprobación',
          'Nada relevante se cobra por adelantado, así que un cobro anticipado viene de un intermediario, no de la autoridad.',
        ],
      },
      {
        en: [
          'Keep your present status valid while the file is pending',
          'Letting an existing visa lapse during the wait creates an irregular stay that the screening will then find.',
        ],
        pt: [
          'Manter o status atual válido enquanto o processo corre',
          'Deixar um visto existente caducar durante a espera cria uma permanência irregular que a triagem vai encontrar.',
        ],
        es: [
          'Mantener vigente su estatus actual mientras se tramita',
          'Dejar caducar un visado existente durante la espera crea una estancia irregular que el filtrado acabará detectando.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical examination and private health cover',
          'You arrange and pay for the insurance yourself, since there is no employer here to enrol you in anything.',
        ],
        pt: [
          'Exame médico e cobertura de saúde privada',
          'Você contrata e paga o seguro por conta própria, já que aqui não há empregador para inscrever você em nada.',
        ],
        es: [
          'Examen médico y cobertura sanitaria privada',
          'Usted contrata y paga el seguro por su cuenta, ya que aquí no hay empleador que le inscriba en nada.',
        ],
      },
      {
        en: [
          'Biometrics at the premium residency centre',
          'Collected in the kingdom after approval, which means at least one trip before the card exists.',
        ],
        pt: [
          'Biometria no centro de residência premium',
          'Coletada no reino após a aprovação, o que significa ao menos uma viagem antes de o cartão existir.',
        ],
        es: [
          'Biometría en el centro de residencia premium',
          'Se toma en el reino tras la aprobación, lo que implica al menos un viaje antes de que exista la tarjeta.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the premium residency card',
          'It serves as your identity document and lets you enter and leave without asking anyone for a permit.',
        ],
        pt: [
          'Retirar o cartão de residência premium',
          'Ele serve como documento de identidade e permite entrar e sair sem pedir permissão a ninguém.',
        ],
        es: [
          'Recoger la tarjeta de residencia premium',
          'Sirve como documento de identidad y permite entrar y salir sin pedir permiso a nadie.',
        ],
      },
      {
        en: [
          'Sponsor your own family members',
          'Spouse, children and parents hang from you directly, so no employer controls whether they can stay.',
        ],
        pt: [
          'Patrocinar seus próprios familiares',
          'Cônjuge, filhos e pais ficam vinculados a você diretamente, então nenhum empregador controla se eles podem ficar.',
        ],
        es: [
          'Patrocinar a sus propios familiares',
          'Cónyuge, hijos y padres dependen directamente de usted, así que ningún empleador controla si pueden quedarse.',
        ],
      },
      {
        en: [
          'Own property and run a business without a local partner',
          'That entitlement is what the fee buys, but real estate in Makkah and Madinah stays out of reach regardless.',
        ],
        pt: [
          'Ter imóveis e negócio sem sócio local',
          'Esse direito é o que a taxa compra, mas imóveis em Meca e Medina continuam fora de alcance de qualquer forma.',
        ],
        es: [
          'Tener inmuebles y negocio sin socio local',
          'Ese derecho es lo que compra la tasa, pero los inmuebles en La Meca y Medina siguen fuera de alcance igualmente.',
        ],
      },
      {
        en: [
          'Renew the annual category before it lapses',
          'The permanent one never expires; the renewable one simply ends if a yearly payment is missed, and reinstatement is not automatic.',
        ],
        pt: [
          'Renovar a categoria anual antes que ela caduque',
          'A permanente nunca vence; a renovável simplesmente acaba se um pagamento anual for perdido, e a reativação não é automática.',
        ],
        es: [
          'Renovar la categoría anual antes de que caduque',
          'La permanente nunca vence; la renovable simplemente termina si se pierde un pago anual, y la reactivación no es automática.',
        ],
      },
    ],
  },

  'Investor Visa': {
    core_documents: [
      {
        en: [
          'Investment licence from the investment ministry',
          'The entity is licensed before anyone is admitted: the residence hangs from the licence, not from you, so the company exists before the visa does.',
        ],
        pt: [
          'Licença de investimento do ministério de investimentos',
          'A empresa é licenciada antes de qualquer pessoa entrar: a residência pende da licença, não de você, então a empresa existe antes do visto.',
        ],
        es: [
          'Licencia de inversión del ministerio de inversiones',
          'La entidad se licencia antes de admitir a nadie: la residencia pende de la licencia, no de usted, así que la empresa existe antes que el visado.',
        ],
      },
      {
        en: [
          'Parent company documents legalised by the Saudi embassy',
          'Commercial register, articles of association, audited accounts and the resolution appointing the manager, all attested abroad before filing.',
        ],
        pt: [
          'Documentos da matriz legalizados pela embaixada saudita',
          'Registro comercial, contrato social, contas auditadas e a ata que nomeia o gerente, todos autenticados no exterior antes do protocolo.',
        ],
        es: [
          'Documentos de la matriz legalizados por la embajada saudí',
          'Registro mercantil, estatutos, cuentas auditadas y el acta que nombra al gerente, todos autenticados en el extranjero antes de presentar.',
        ],
      },
      {
        en: [
          'Passport valid for at least six months',
          'The manager travels several times during setup, so remaining validity should cover the whole incorporation period.',
        ],
        pt: [
          'Passaporte com validade mínima de seis meses',
          'O gerente viaja várias vezes durante a montagem, então a validade restante deve cobrir todo o período de constituição.',
        ],
        es: [
          'Pasaporte con al menos seis meses de vigencia',
          'El gerente viaja varias veces durante la puesta en marcha, así que la vigencia restante debe cubrir toda la constitución.',
        ],
      },
      {
        en: [
          'Commercial registration with the Ministry of Commerce',
          'Issued after the licence; without it there is no bank account, no employees and no visa blocks.',
        ],
        pt: [
          'Registro comercial no Ministério do Comércio',
          'Emitido depois da licença; sem ele não há conta bancária, nem funcionários, nem blocos de visto.',
        ],
        es: [
          'Registro mercantil en el Ministerio de Comercio',
          'Se emite tras la licencia; sin él no hay cuenta bancaria, ni empleados, ni bloques de visado.',
        ],
      },
      {
        en: [
          'National address and chamber of commerce membership',
          'Other agencies verify both later, and a missing national address quietly blocks access to the government portals.',
        ],
        pt: [
          'Endereço nacional e filiação à câmara de comércio',
          'Outros órgãos verificam os dois depois, e a falta do endereço nacional bloqueia silenciosamente o acesso aos portais do governo.',
        ],
        es: [
          'Dirección nacional y afiliación a la cámara de comercio',
          'Otros organismos verifican ambos después, y la falta de dirección nacional bloquea en silencio el acceso a los portales del gobierno.',
        ],
      },
      {
        en: [
          'Criminal record certificate for the appointed manager',
          'Legalised through the same chain as the company papers, and requested early because it has its own validity period.',
        ],
        pt: [
          'Certidão criminal do gerente nomeado',
          'Legalizada pela mesma cadeia dos papéis da empresa, e pedida cedo porque tem prazo de validade próprio.',
        ],
        es: [
          'Certificado de antecedentes del gerente designado',
          'Legalizado por la misma cadena que los papeles de la empresa, y solicitado pronto porque tiene su propio plazo de validez.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Attested qualifications of the general manager',
          'The manager’s residence is tied to the position, so the credentials have to fit the licensed activity.',
        ],
        pt: [
          'Qualificações autenticadas do gerente-geral',
          'A residência do gerente está atrelada ao cargo, então as credenciais precisam corresponder à atividade licenciada.',
        ],
        es: [
          'Titulaciones autenticadas del gerente general',
          'La residencia del gerente está ligada al cargo, así que las credenciales deben encajar con la actividad licenciada.',
        ],
      },
      {
        en: [
          'Sector regulator approval for restricted activities',
          'Healthcare, education and engineering need a second licence on top of the investment one, obtained before operations may begin.',
        ],
        pt: [
          'Aprovação do regulador setorial em atividades restritas',
          'Saúde, educação e engenharia exigem uma segunda licença além da de investimento, obtida antes de a operação começar.',
        ],
        es: [
          'Aprobación del regulador sectorial en actividades restringidas',
          'Sanidad, educación e ingeniería exigen una segunda licencia además de la de inversión, obtenida antes de iniciar operaciones.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Capital required for your licence category',
          'The threshold differs sharply between trading, services and industrial activities; confirm the current figure and be ready to evidence the deposit.',
        ],
        pt: [
          'Capital exigido para a sua categoria de licença',
          'O piso varia muito entre comércio, serviços e indústria; confirme o valor atual e esteja pronto para comprovar o depósito.',
        ],
        es: [
          'Capital exigido para su categoría de licencia',
          'El umbral varía mucho entre comercio, servicios e industria; confirme la cifra actual y prepárese para acreditar el depósito.',
        ],
      },
      {
        en: [
          'Audited financial statements of the foreign parent',
          'Normally for the most recent financial year and attested; a newly formed parent with no accounts is a common blocker.',
        ],
        pt: [
          'Demonstrações financeiras auditadas da matriz estrangeira',
          'Em geral do último exercício e autenticadas; uma matriz recém-criada sem contas é um obstáculo comum.',
        ],
        es: [
          'Estados financieros auditados de la matriz extranjera',
          'Normalmente del último ejercicio y autenticados; una matriz recién creada sin cuentas es un obstáculo habitual.',
        ],
      },
      {
        en: [
          'Provision for annual licence and government fees',
          'Renewals recur every year and lapse quietly; check the schedule in force when budgeting the first three years.',
        ],
        pt: [
          'Provisão para licença anual e taxas governamentais',
          'As renovações se repetem todo ano e caducam sem aviso; consulte a tabela vigente ao orçar os primeiros três anos.',
        ],
        es: [
          'Provisión para la licencia anual y las tasas del gobierno',
          'Las renovaciones se repiten cada año y caducan sin aviso; consulte el baremo vigente al presupuestar los tres primeros años.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File the application on the investment portal',
          'Everything runs online, and an activity code that does not match your business has to be corrected before anything else moves.',
        ],
        pt: [
          'Protocolar o pedido no portal de investimentos',
          'Tudo corre online, e um código de atividade que não bate com o seu negócio precisa ser corrigido antes de qualquer outra coisa andar.',
        ],
        es: [
          'Presentar la solicitud en el portal de inversiones',
          'Todo se tramita en línea, y un código de actividad que no encaja con su negocio debe corregirse antes de que avance nada más.',
        ],
      },
      {
        en: [
          'Pay the licence issuance fee',
          'Verify the amount in force; it is charged for each year of validity requested, so a longer licence costs proportionally more upfront.',
        ],
        pt: [
          'Pagar a taxa de emissão da licença',
          'Verifique o valor vigente; ela é cobrada por ano de validade pedido, então uma licença mais longa custa proporcionalmente mais na largada.',
        ],
        es: [
          'Pagar la tasa de emisión de la licencia',
          'Verifique el importe vigente; se cobra por cada año de validez solicitado, así que una licencia más larga cuesta proporcionalmente más al inicio.',
        ],
      },
      {
        en: [
          'Request the visa blocks for yourself and your staff',
          'Even as the owner you enter on a block issued by your own company through the labour portal, which is why incorporation comes first.',
        ],
        pt: [
          'Solicitar os blocos de visto para você e sua equipe',
          'Mesmo como dono, você entra com um bloco emitido pela sua própria empresa no portal trabalhista, e é por isso que a constituição vem antes.',
        ],
        es: [
          'Solicitar los bloques de visado para usted y su personal',
          'Incluso como dueño entra con un bloque emitido por su propia empresa en el portal laboral, y por eso la constitución va primero.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical examination at an approved centre abroad',
          'The same accreditation rule applies as to any worker: the report has to come from a centre recognised for Saudi files in your country.',
        ],
        pt: [
          'Exame médico em centro aprovado no exterior',
          'Vale a mesma regra de credenciamento de qualquer trabalhador: o laudo precisa vir de centro reconhecido para processos sauditas no seu país.',
        ],
        es: [
          'Examen médico en un centro aprobado en el extranjero',
          'Rige la misma regla de acreditación que para cualquier trabajador: el informe debe venir de un centro reconocido para expedientes saudíes en su país.',
        ],
      },
      {
        en: [
          'Fingerprints and photograph for the entry visa',
          'Collected at the visa centre abroad and taken again at the port of entry.',
        ],
        pt: [
          'Impressões digitais e fotografia para o visto de entrada',
          'Coletadas no centro de vistos no exterior e tiradas de novo no ponto de entrada.',
        ],
        es: [
          'Huellas y fotografía para el visado de entrada',
          'Se toman en el centro de visados en el extranjero y otra vez en el punto de entrada.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Issue the investor residence card after arrival',
          'Applied for by your own company within the deadline counted from your entry date, not from the licence date.',
        ],
        pt: [
          'Emitir o cartão de residência de investidor após a chegada',
          'Pedido pela sua própria empresa dentro do prazo contado da data de entrada, não da data da licença.',
        ],
        es: [
          'Emitir la tarjeta de residencia de inversor tras la llegada',
          'La solicita su propia empresa dentro del plazo contado desde su fecha de entrada, no desde la fecha de la licencia.',
        ],
      },
      {
        en: [
          'Open the corporate bank account',
          'It takes considerably longer than founders expect and generally needs the manager physically present with a residence card already in hand.',
        ],
        pt: [
          'Abrir a conta bancária da empresa',
          'Leva bem mais tempo do que os fundadores esperam e em geral exige o gerente presente com o cartão de residência já em mãos.',
        ],
        es: [
          'Abrir la cuenta bancaria de la empresa',
          'Tarda bastante más de lo que esperan los fundadores y suele exigir al gerente presente con la tarjeta de residencia ya en mano.',
        ],
      },
      {
        en: [
          'Register with the social insurance, tax and labour platforms',
          'Payroll, value added tax and the labour portals each have a separate registration, and one omission freezes your ability to hire.',
        ],
        pt: [
          'Registrar-se nas plataformas previdenciária, fiscal e trabalhista',
          'Folha, imposto sobre valor agregado e portais trabalhistas têm cadastros separados, e uma omissão congela sua capacidade de contratar.',
        ],
        es: [
          'Registrarse en las plataformas de seguridad social, fiscal y laboral',
          'Nómina, impuesto al valor añadido y portales laborales tienen registros separados, y una omisión congela su capacidad de contratar.',
        ],
      },
      {
        en: [
          'Meet the localisation quota for your band',
          'The share of Saudi employees decides whether further blocks are released; falling out of band stops recruitment before it stops anything else.',
        ],
        pt: [
          'Cumprir a cota de nacionalização da sua faixa',
          'A proporção de empregados sauditas define se novos blocos são liberados; cair de faixa trava a contratação antes de travar qualquer outra coisa.',
        ],
        es: [
          'Cumplir el cupo de nacionalización de su banda',
          'La proporción de empleados saudíes define si se liberan más bloques; caer de banda detiene la contratación antes que ninguna otra cosa.',
        ],
      },
      {
        en: [
          'Renew the licence and the residence each year',
          'They expire on different dates, and the residence cannot be renewed once the licence behind it has lapsed.',
        ],
        pt: [
          'Renovar a licença e a residência a cada ano',
          'Elas vencem em datas diferentes, e a residência não pode ser renovada depois que a licença que a sustenta caducou.',
        ],
        es: [
          'Renovar la licencia y la residencia cada año',
          'Vencen en fechas distintas, y la residencia no puede renovarse una vez caducada la licencia que la sostiene.',
        ],
      },
    ],
  },
};
