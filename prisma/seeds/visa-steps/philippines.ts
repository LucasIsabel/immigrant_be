import type { CountryVisaSteps } from './types';

/**
 * Steps for the Philippines.
 *
 * Three things shape almost every case here. First, the exit is regulated as
 * tightly as the entry: anyone who has stayed beyond six months needs an
 * Emigration Clearance Certificate to board a departing flight, and most people
 * only learn this at the airport counter. Second, permission to work and
 * permission to stay come from two different ministries — the Alien Employment
 * Permit from the labour department, the 9(g) visa from the Bureau of
 * Immigration — and the labour side must go first. Third, residence carries
 * recurring duties: the ACR I-Card for foreigners and the annual report filed at
 * the start of every calendar year, which quietly invalidates a status when
 * skipped.
 */
export const philippines: CountryVisaSteps = {
  'Tourist Visa / Visa Waiver': {
    core_documents: [
      {
        en: [
          'Valid passport with at least six months of validity',
          'Airlines refuse boarding when the passport expires within six months of arrival, and immigration applies the same rule at the counter.',
        ],
        pt: [
          'Passaporte válido com pelo menos seis meses de validade',
          'Companhias aéreas negam embarque quando o passaporte vence em menos de seis meses da chegada, e a imigração aplica a mesma regra no balcão.',
        ],
        es: [
          'Pasaporte vigente con al menos seis meses de validez',
          'Las aerolíneas niegan el embarque cuando el pasaporte caduca en menos de seis meses desde la llegada, e inmigración aplica la misma regla en el mostrador.',
        ],
      },
      {
        en: [
          'Check whether your nationality enters under the visa waiver',
          'Most nationalities are admitted for a short initial period with no visa at all; applying at a consulate anyway costs time and money for nothing.',
        ],
        pt: [
          'Verificar se sua nacionalidade entra pela isenção de visto',
          'A maioria das nacionalidades é admitida por um período inicial curto sem visto nenhum; pedir num consulado mesmo assim custa tempo e dinheiro à toa.',
        ],
        es: [
          'Comprobar si su nacionalidad entra por la exención de visado',
          'La mayoría de las nacionalidades es admitida por un periodo inicial corto sin visado alguno; solicitarlo igualmente en un consulado cuesta tiempo y dinero para nada.',
        ],
      },
      {
        en: [
          'Onward or return ticket dated inside the admitted period',
          'The airline checks this at boarding, not only immigration, because the carrier is fined if you are turned back.',
        ],
        pt: [
          'Passagem de saída ou de volta datada dentro do período admitido',
          'A companhia aérea confere isso no embarque, não só a imigração, porque a transportadora é multada se você for barrado.',
        ],
        es: [
          'Billete de salida o de vuelta fechado dentro del periodo admitido',
          'La aerolínea lo revisa al embarcar, no solo inmigración, porque el transportista es multado si le devuelven.',
        ],
      },
      {
        en: [
          'Accommodation booking and a local contact address',
          'The arrival card asks for an address in the Philippines; leaving that line blank invites secondary questioning.',
        ],
        pt: [
          'Reserva de alojamento e endereço de contato local',
          'O cartão de desembarque pede um endereço nas Filipinas; deixar essa linha em branco convida a uma entrevista secundária.',
        ],
        es: [
          'Reserva de alojamiento y una dirección de contacto local',
          'La tarjeta de desembarque pide una dirección en Filipinas; dejar esa línea en blanco invita a una entrevista secundaria.',
        ],
      },
      {
        en: [
          'Consular application form for visa-required nationalities',
          'Filed at an embassy or consulate before travelling, with the photograph and supporting papers each post specifies.',
        ],
        pt: [
          'Formulário consular para nacionalidades que precisam de visto',
          'Entregue numa embaixada ou consulado antes de viajar, com a fotografia e os documentos que cada posto especifica.',
        ],
        es: [
          'Formulario consular para nacionalidades que requieren visado',
          'Se presenta en una embajada o consulado antes de viajar, con la fotografía y los documentos que cada oficina especifique.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of funds for the whole visit',
          'Bank statements or cards in your own name; a visitor arriving with no visible means can be asked to produce them at the border.',
        ],
        pt: [
          'Comprovação de recursos para toda a visita',
          'Extratos bancários ou cartões no seu nome; um visitante que chega sem meios visíveis pode ser obrigado a apresentá-los na fronteira.',
        ],
        es: [
          'Prueba de fondos para toda la visita',
          'Extractos bancarios o tarjetas a su nombre; a un visitante que llega sin medios visibles pueden exigírselos en la frontera.',
        ],
      },
      {
        en: [
          'Budget for the stacked extension charges',
          'Each extension at the Bureau of Immigration adds several separate line items on top of the visa fee itself, so a long tourist stay costs far more than the headline figure suggests. Confirm the schedule in force.',
        ],
        pt: [
          'Reservar orçamento para as taxas acumuladas de extensão',
          'Cada extensão no Bureau of Immigration soma vários itens separados além da taxa do visto em si, então uma estada turística longa custa bem mais do que o valor anunciado sugere. Confirme a tabela em vigor.',
        ],
        es: [
          'Presupuestar los cargos acumulados de prórroga',
          'Cada prórroga en el Bureau of Immigration suma varias partidas separadas además de la tasa del visado, así que una estancia turística larga cuesta mucho más de lo que sugiere la cifra anunciada. Confirme la tarifa en vigor.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Enter under the waiver or with the consular visa',
          'The officer sets the initial period on arrival, and it can be shorter than the published maximum.',
        ],
        pt: [
          'Entrar pela isenção ou com o visto consular',
          'O agente define o período inicial na chegada, e ele pode ser menor que o máximo publicado.',
        ],
        es: [
          'Entrar por la exención o con el visado consular',
          'El agente fija el periodo inicial a la llegada, y puede ser menor que el máximo publicado.',
        ],
      },
      {
        en: [
          'Extend at an immigration office before the stamp expires',
          'Overstaying accrues a daily fine plus a penalty, and the whole amount is settled before you are cleared to leave.',
        ],
        pt: [
          'Estender num escritório de imigração antes de o carimbo vencer',
          'A permanência irregular acumula multa diária mais penalidade, e o valor inteiro é quitado antes de você ser liberado para sair.',
        ],
        es: [
          'Prorrogar en una oficina de inmigración antes de que caduque el sello',
          'La estancia irregular acumula multa diaria más recargo, y el importe entero se liquida antes de que le autoricen a salir.',
        ],
      },
      {
        en: [
          'Track the ceiling on total tourist stay',
          'The cumulative months allowed differ between visa-required and visa-free nationals; once the ceiling is reached, only a change of status keeps you legal.',
        ],
        pt: [
          'Acompanhar o teto de permanência total como turista',
          'O total de meses permitido difere entre quem precisa de visto e quem é isento; alcançado o teto, só a mudança de status mantém você regular.',
        ],
        es: [
          'Vigilar el tope de estancia total como turista',
          'El total de meses permitido difiere entre quienes requieren visado y quienes están exentos; alcanzado el tope, solo un cambio de estatus le mantiene en regla.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometrics and photograph at the arrival counter',
          'Captured on entry; there is no biometric appointment beforehand for visitors.',
        ],
        pt: [
          'Biometria e fotografia no balcão de chegada',
          'Recolhidas na entrada; não há agendamento biométrico prévio para visitantes.',
        ],
        es: [
          'Biometría y fotografía en el mostrador de llegada',
          'Se toman a la entrada; no hay cita biométrica previa para los visitantes.',
        ],
      },
      {
        en: [
          'Travel medical insurance for the visit',
          'Visitors pay private rates in full, and hospitals commonly ask for a deposit before admitting a patient.',
        ],
        pt: [
          'Seguro médico de viagem para a visita',
          'Visitantes pagam tarifas privadas integrais, e hospitais costumam pedir depósito antes de internar um paciente.',
        ],
        es: [
          'Seguro médico de viaje para la visita',
          'Los visitantes pagan tarifas privadas íntegras, y los hospitales suelen pedir un depósito antes de ingresar a un paciente.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Register for the ACR I-Card once the stay passes the threshold',
          'Beyond the first couple of months the Bureau of Immigration issues this foreigner card, and the extension counter will not process you without it.',
        ],
        pt: [
          'Registar-se para o ACR I-Card quando a estada passar do limite',
          'Passados os primeiros meses, o Bureau of Immigration emite esse cartão de estrangeiro, e o guichê de extensão não atende sem ele.',
        ],
        es: [
          'Registrarse para la ACR I-Card cuando la estancia supere el umbral',
          'Pasados los primeros meses, el Bureau of Immigration emite esa tarjeta de extranjero, y la ventanilla de prórroga no le atiende sin ella.',
        ],
      },
      {
        en: [
          'Obtain the Emigration Clearance Certificate before departing',
          'Anyone who has stayed beyond six months needs this exit clearance to board, and most people discover it at the airport on the day of the flight. Apply several days ahead.',
        ],
        pt: [
          'Obter o Emigration Clearance Certificate antes de partir',
          'Quem ficou mais de seis meses precisa dessa liberação de saída para embarcar, e a maioria descobre isso no aeroporto no dia do voo. Peça com vários dias de antecedência.',
        ],
        es: [
          'Obtener el Emigration Clearance Certificate antes de salir',
          'Quien haya permanecido más de seis meses necesita esa autorización de salida para embarcar, y la mayoría se entera en el aeropuerto el día del vuelo. Solicítela con varios días de antelación.',
        ],
      },
      {
        en: [
          'Do not take up any work while on tourist status',
          'Paid activity, including remote work billed to a client in the country, breaches the admission and can end in deportation and a blacklist entry.',
        ],
        pt: [
          'Não exercer qualquer trabalho em status de turista',
          'Atividade remunerada, inclusive trabalho remoto faturado a um cliente no país, viola a admissão e pode terminar em deportação e inclusão na lista negra.',
        ],
        es: [
          'No ejercer ningún trabajo en estatus de turista',
          'La actividad remunerada, incluido el trabajo remoto facturado a un cliente en el país, incumple la admisión y puede acabar en deportación e inscripción en la lista negra.',
        ],
      },
      {
        en: [
          'Keep every extension receipt together',
          'The exit clearance and any later change of status are assessed against this paper trail, and a missing stamp becomes yours to prove.',
        ],
        pt: [
          'Guardar juntos todos os recibos de extensão',
          'A liberação de saída e qualquer mudança de status posterior são avaliadas por esse rastro de papel, e um carimbo faltante passa a ser você quem terá de provar.',
        ],
        es: [
          'Guardar juntos todos los recibos de prórroga',
          'La autorización de salida y cualquier cambio de estatus posterior se evalúan con ese rastro documental, y un sello ausente le toca demostrarlo a usted.',
        ],
        priority: 2,
      },
      {
        en: [
          'Plan a change of status well before the ceiling',
          'Converting to a work or resident visa from inside the country takes months, and it cannot be started once you are already out of status.',
        ],
        pt: [
          'Planejar a mudança de status bem antes do teto',
          'Converter para visto de trabalho ou de residente de dentro do país leva meses, e não pode ser iniciada depois que você já está irregular.',
        ],
        es: [
          'Planificar el cambio de estatus mucho antes del tope',
          'Convertir a un visado de trabajo o de residente desde dentro del país lleva meses, y no puede iniciarse una vez que ya está fuera de estatus.',
        ],
        priority: 2,
      },
    ],
  },

  'Pre-Arranged Employment Visa 9(g)': {
    core_documents: [
      {
        en: [
          'Passport valid beyond the employment contract',
          'The visa is granted for the term of the contract and cannot outlast the travel document.',
        ],
        pt: [
          'Passaporte válido além do contrato de trabalho',
          'O visto é concedido pelo prazo do contrato e não pode ultrapassar o documento de viagem.',
        ],
        es: [
          'Pasaporte vigente más allá del contrato de trabajo',
          'El visado se concede por el plazo del contrato y no puede exceder el documento de viaje.',
        ],
      },
      {
        en: [
          'Employer petition filed with the Bureau of Immigration',
          'You are not the applicant here: the company petitions for you, and the visa belongs to that employment relationship, not to you personally.',
        ],
        pt: [
          'Petição do empregador protocolada no Bureau of Immigration',
          'Aqui você não é o requerente: a empresa peticiona por você, e o visto pertence a essa relação de emprego, não a você pessoalmente.',
        ],
        es: [
          'Petición del empleador presentada ante el Bureau of Immigration',
          'Aquí usted no es el solicitante: la empresa peticiona por usted, y el visado pertenece a esa relación laboral, no a usted personalmente.',
        ],
      },
      {
        en: [
          'Alien Employment Permit issued by the labour department',
          'A separate instrument from a separate ministry. It is published for public objection before issue, and the visa petition goes nowhere without it.',
        ],
        pt: [
          'Alien Employment Permit emitido pelo ministério do trabalho',
          'É um instrumento à parte, de outro ministério. Ele é publicado para objeção pública antes da emissão, e a petição de visto não anda sem ele.',
        ],
        es: [
          'Alien Employment Permit emitido por el ministerio de trabajo',
          'Es un instrumento aparte, de otro ministerio. Se publica para objeción pública antes de emitirse, y la petición de visado no avanza sin él.',
        ],
      },
      {
        en: [
          'Signed employment contract stating post and term',
          'The job title, duties and duration must match what the labour permit says, word for word; a mismatch sends both files back.',
        ],
        pt: [
          'Contrato de trabalho assinado com cargo e prazo',
          'O cargo, as funções e a duração precisam coincidir com o que a permissão de trabalho diz, palavra por palavra; divergência devolve os dois processos.',
        ],
        es: [
          'Contrato de trabajo firmado con el puesto y el plazo',
          'El puesto, las funciones y la duración deben coincidir con lo que dice el permiso laboral, palabra por palabra; una discrepancia devuelve ambos expedientes.',
        ],
      },
      {
        en: [
          'Corporate papers of the petitioning company',
          'Registration with the securities regulator, the general information sheet, the latest tax return and the local business permit.',
        ],
        pt: [
          'Documentos societários da empresa peticionária',
          'Registo no regulador de valores mobiliários, ficha de informações gerais, última declaração fiscal e alvará municipal.',
        ],
        es: [
          'Documentos societarios de la empresa peticionaria',
          'Registro ante el regulador de valores, la ficha de información general, la última declaración fiscal y la licencia municipal.',
        ],
      },
      {
        en: [
          'Police clearance from your country of residence',
          'Authenticated for use abroad, and normally accepted only while recent — an old certificate is rejected.',
        ],
        pt: [
          'Certidão de antecedentes do seu país de residência',
          'Autenticada para uso no exterior, e em geral aceita apenas enquanto recente — uma certidão antiga é recusada.',
        ],
        es: [
          'Certificado de antecedentes de su país de residencia',
          'Autenticado para uso en el extranjero, y por lo general aceptado solo mientras sea reciente: un certificado antiguo se rechaza.',
        ],
      },
      {
        en: [
          'Evidence the post could not be filled locally',
          'The labour market test underpins the permit; the employer documents its search and why no resident candidate met the requirement.',
        ],
        pt: [
          'Prova de que o cargo não pôde ser preenchido localmente',
          'O teste de mercado de trabalho sustenta a permissão; o empregador documenta a busca e por que nenhum candidato residente atendeu ao requisito.',
        ],
        es: [
          'Prueba de que el puesto no pudo cubrirse localmente',
          'La prueba de mercado laboral sostiene el permiso; el empleador documenta su búsqueda y por qué ningún candidato residente cumplió el requisito.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Degree certificates authenticated for use abroad',
          'Apostilled or consularised in the issuing country. Doing it after you land is far slower and sometimes impossible.',
        ],
        pt: [
          'Diplomas autenticados para uso no exterior',
          'Apostilados ou consularizados no país emissor. Fazer isso depois de desembarcar é muito mais lento e às vezes inviável.',
        ],
        es: [
          'Títulos autenticados para uso en el extranjero',
          'Apostillados o legalizados en el país emisor. Hacerlo después de aterrizar es mucho más lento y a veces inviable.',
        ],
      },
      {
        en: [
          'Special temporary permit from the professional regulator',
          'Regulated professions — engineering, medicine, accountancy and others — need a permit from the professional commission on top of the labour permit.',
        ],
        pt: [
          'Permissão temporária especial do conselho profissional',
          'Profissões regulamentadas — engenharia, medicina, contabilidade e outras — exigem uma permissão da comissão profissional além da permissão de trabalho.',
        ],
        es: [
          'Permiso temporal especial del colegio profesional',
          'Las profesiones reguladas —ingeniería, medicina, contabilidad y otras— exigen un permiso de la comisión profesional además del permiso laboral.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Curriculum vitae with reference letters',
          'Used to show the specialist experience that justifies hiring from abroad rather than locally.',
        ],
        pt: [
          'Currículo com cartas de referência',
          'Usados para demonstrar a experiência especializada que justifica contratar do exterior em vez de localmente.',
        ],
        es: [
          'Currículum con cartas de referencia',
          'Sirven para demostrar la experiencia especializada que justifica contratar del extranjero en lugar de localmente.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Salary consistent with what the labour permit declares',
          'The declared pay is on file with two agencies; paying less than declared exposes the employer and can void the permit at renewal.',
        ],
        pt: [
          'Salário coerente com o que a permissão de trabalho declara',
          'A remuneração declarada consta em duas agências; pagar menos do que o declarado expõe o empregador e pode anular a permissão na renovação.',
        ],
        es: [
          'Salario coherente con lo que declara el permiso laboral',
          'La remuneración declarada consta en dos organismos; pagar menos de lo declarado expone al empleador y puede anular el permiso en la renovación.',
        ],
      },
      {
        en: [
          'Agree in writing who pays the government charges',
          'The permit, the visa, the card and the professional permits each carry their own charges. Contracts often stay silent and the worker ends up paying. Check the current amounts before signing.',
        ],
        pt: [
          'Acordar por escrito quem paga os encargos oficiais',
          'A permissão, o visto, o cartão e as permissões profissionais têm encargos próprios. Contratos costumam silenciar e o trabalhador acaba pagando. Confira os valores vigentes antes de assinar.',
        ],
        es: [
          'Acordar por escrito quién paga los cargos oficiales',
          'El permiso, el visado, la tarjeta y los permisos profesionales llevan cargos propios. Los contratos suelen callarlo y el trabajador acaba pagando. Consulte los importes vigentes antes de firmar.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'File the labour permit before the visa petition',
          'The order is fixed. Starting with immigration only produces a file that waits, because the permit is a prerequisite document.',
        ],
        pt: [
          'Protocolar a permissão de trabalho antes da petição de visto',
          'A ordem é fixa. Começar pela imigração só gera um processo que fica parado, porque a permissão é documento pré-requisito.',
        ],
        es: [
          'Presentar el permiso laboral antes de la petición de visado',
          'El orden es fijo. Empezar por inmigración solo genera un expediente detenido, porque el permiso es un documento previo.',
        ],
      },
      {
        en: [
          'Convert your admission status if you are already in the country',
          'Someone hired while on a tourist stamp converts from inside rather than flying out, but must keep the tourist extensions current throughout the conversion.',
        ],
        pt: [
          'Converter o status de admissão se já estiver no país',
          'Quem é contratado estando com carimbo de turista converte de dentro em vez de sair do país, mas precisa manter as extensões de turista em dia durante toda a conversão.',
        ],
        es: [
          'Convertir el estatus de admisión si ya está en el país',
          'Quien es contratado estando con sello de turista convierte desde dentro en vez de salir del país, pero debe mantener al día las prórrogas de turista durante toda la conversión.',
        ],
      },
      {
        en: [
          'Request a provisional work permit to cover the wait',
          'The full process runs for months. The provisional permit is what makes it lawful to start working before the 9(g) is implemented.',
        ],
        pt: [
          'Pedir uma permissão provisória de trabalho para cobrir a espera',
          'O processo completo leva meses. A permissão provisória é o que torna lícito começar a trabalhar antes de o 9(g) ser implementado.',
        ],
        es: [
          'Solicitar un permiso provisional de trabajo para cubrir la espera',
          'El proceso completo dura meses. El permiso provisional es lo que hace lícito empezar a trabajar antes de que se implemente el 9(g).',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical examination at an accredited clinic',
          'Includes chest imaging and blood work; results are only valid for a limited window, so do not take them too early.',
        ],
        pt: [
          'Exame médico em clínica credenciada',
          'Inclui imagem do tórax e exames de sangue; os resultados só valem por uma janela limitada, então não os faça cedo demais.',
        ],
        es: [
          'Examen médico en una clínica acreditada',
          'Incluye imagen de tórax y analítica de sangre; los resultados solo valen una ventana limitada, así que no se los haga demasiado pronto.',
        ],
      },
      {
        en: [
          'Fingerprints and photograph for the foreigner card',
          'Taken in person at an immigration office once the visa is implemented, not at a consulate abroad.',
        ],
        pt: [
          'Impressões digitais e fotografia para o cartão de estrangeiro',
          'Recolhidas presencialmente num escritório de imigração depois de o visto ser implementado, não num consulado no exterior.',
        ],
        es: [
          'Huellas y fotografía para la tarjeta de extranjero',
          'Se toman presencialmente en una oficina de inmigración una vez implementado el visado, no en un consulado en el extranjero.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the ACR I-Card and carry it with you',
          'It is the identity document for a foreign resident and is asked for at banks, telecoms and police checks.',
        ],
        pt: [
          'Retirar o ACR I-Card e andar com ele',
          'É o documento de identidade do residente estrangeiro e é pedido em bancos, operadoras e abordagens policiais.',
        ],
        es: [
          'Recoger la ACR I-Card y llevarla consigo',
          'Es el documento de identidad del residente extranjero y se lo piden en bancos, operadoras y controles policiales.',
        ],
      },
      {
        en: [
          'File the annual report at the start of each year',
          'Every registered foreigner reports in person to immigration in the opening weeks of the calendar year. Missing it brings a fine and can block your next renewal.',
        ],
        pt: [
          'Fazer o relatório anual no começo de cada ano',
          'Todo estrangeiro registado se apresenta pessoalmente à imigração nas primeiras semanas do ano civil. Faltar gera multa e pode travar a renovação seguinte.',
        ],
        es: [
          'Presentar el informe anual al comienzo de cada año',
          'Todo extranjero registrado se presenta en persona ante inmigración en las primeras semanas del año natural. Faltar acarrea multa y puede bloquear la siguiente renovación.',
        ],
      },
      {
        en: [
          'Downgrade the visa when the employment ends',
          'Resigning does not end the status by itself. Until it is formally downgraded to a temporary visitor status you remain on the employer’s file, and departure can be held up.',
        ],
        pt: [
          'Rebaixar o visto quando o emprego terminar',
          'Pedir demissão não encerra o status por si só. Enquanto ele não for formalmente rebaixado para status de visitante temporário, você segue vinculado ao processo do empregador, e a saída do país pode ser travada.',
        ],
        es: [
          'Degradar el visado cuando termine el empleo',
          'Renunciar no extingue el estatus por sí solo. Mientras no se degrade formalmente a un estatus de visitante temporal, usted sigue vinculado al expediente del empleador, y la salida del país puede quedar bloqueada.',
        ],
      },
      {
        en: [
          'Renew the labour permit and the visa on the same cycle',
          'They expire independently. An expired labour permit strips the legal basis of a visa that still looks valid in your passport.',
        ],
        pt: [
          'Renovar a permissão de trabalho e o visto no mesmo ciclo',
          'Elas vencem de forma independente. Uma permissão de trabalho vencida retira a base legal de um visto que ainda parece válido no passaporte.',
        ],
        es: [
          'Renovar el permiso laboral y el visado en el mismo ciclo',
          'Caducan de forma independiente. Un permiso laboral caducado quita la base legal a un visado que aún parece vigente en el pasaporte.',
        ],
      },
      {
        en: [
          'Secure the exit clearance when you leave for good',
          'A final departure from resident status requires clearance from immigration, and it is applied for in advance rather than at the airport.',
        ],
        pt: [
          'Providenciar a liberação de saída ao deixar o país em definitivo',
          'A saída definitiva a partir de um status de residente exige liberação da imigração, e ela é pedida com antecedência, não no aeroporto.',
        ],
        es: [
          'Gestionar la autorización de salida al marcharse definitivamente',
          'La salida definitiva desde un estatus de residente exige autorización de inmigración, y se solicita con antelación, no en el aeropuerto.',
        ],
      },
    ],
  },

  'Special Resident Retiree Visa (SRRV)': {
    core_documents: [
      {
        en: [
          'Passport valid for the application and the enrolment',
          'It has to stay valid through the whole process, which involves two in-person stages months apart.',
        ],
        pt: [
          'Passaporte válido para o pedido e para a inscrição',
          'Precisa continuar válido durante todo o processo, que tem duas etapas presenciais separadas por meses.',
        ],
        es: [
          'Pasaporte vigente para la solicitud y la inscripción',
          'Debe seguir vigente durante todo el proceso, que tiene dos etapas presenciales separadas por meses.',
        ],
      },
      {
        en: [
          'Apply to the retirement authority, not to immigration',
          'This route is administered by a dedicated government retirement authority. The Bureau of Immigration only implements what that authority endorses.',
        ],
        pt: [
          'Pedir à autoridade de aposentadoria, não à imigração',
          'Esta rota é administrada por uma autoridade governamental de aposentadoria dedicada. O Bureau of Immigration apenas implementa o que essa autoridade endossa.',
        ],
        es: [
          'Solicitar ante la autoridad de jubilación, no ante inmigración',
          'Esta vía la administra una autoridad gubernamental de jubilación dedicada. El Bureau of Immigration solo implementa lo que esa autoridad endosa.',
        ],
      },
      {
        en: [
          'Choose the retiree option that matches your age and pension',
          'The scheme has several variants with different age bands and different deposit levels, and one of them is reserved for former citizens and for foreign veterans.',
        ],
        pt: [
          'Escolher a opção de aposentado compatível com sua idade e pensão',
          'O programa tem várias variantes com faixas etárias e níveis de depósito diferentes, e uma delas é reservada a ex-cidadãos e a veteranos estrangeiros.',
        ],
        es: [
          'Elegir la opción de jubilado acorde con su edad y su pensión',
          'El programa tiene varias variantes con franjas de edad y niveles de depósito distintos, y una de ellas se reserva a antiguos ciudadanos y a veteranos extranjeros.',
        ],
      },
      {
        en: [
          'Authenticated police clearance from abroad',
          'Issued in your country of origin or residence and legalised. A separate local clearance is required if you have already been in the country for a stretch.',
        ],
        pt: [
          'Certidão policial estrangeira autenticada',
          'Emitida no seu país de origem ou de residência e legalizada. Uma certidão local à parte é exigida se você já estiver no país há algum tempo.',
        ],
        es: [
          'Certificado policial extranjero autenticado',
          'Emitido en su país de origen o de residencia y legalizado. Se exige un certificado local aparte si ya lleva un tiempo en el país.',
        ],
      },
      {
        en: [
          'Civil status documents for accompanying dependants',
          'Marriage and birth certificates, legalised. A spouse and a limited number of children can be included, and extra dependants each raise the deposit.',
        ],
        pt: [
          'Documentos de estado civil dos dependentes acompanhantes',
          'Certidões de casamento e de nascimento, legalizadas. Cônjuge e um número limitado de filhos podem ser incluídos, e cada dependente extra aumenta o depósito.',
        ],
        es: [
          'Documentos de estado civil de los dependientes acompañantes',
          'Certificados de matrimonio y de nacimiento, legalizados. Se puede incluir al cónyuge y a un número limitado de hijos, y cada dependiente adicional eleva el depósito.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Time deposit in an accredited bank under your own name',
          'The deposit is the heart of the scheme. It must sit in a bank the authority accredits and stay in your name. Check the level currently required for your chosen variant.',
        ],
        pt: [
          'Depósito a prazo em banco credenciado no seu próprio nome',
          'O depósito é o coração do programa. Precisa ficar num banco credenciado pela autoridade e permanecer em seu nome. Confira o valor atualmente exigido na variante escolhida.',
        ],
        es: [
          'Depósito a plazo en un banco acreditado a su propio nombre',
          'El depósito es el núcleo del programa. Debe estar en un banco acreditado por la autoridad y permanecer a su nombre. Consulte el nivel exigido actualmente en la variante elegida.',
        ],
      },
      {
        en: [
          'Proof of a monthly pension for the reduced-deposit route',
          'Documented pension income lowers the deposit substantially, but the pension has to be verifiable and paid regularly, not a one-off payout.',
        ],
        pt: [
          'Comprovação de pensão mensal para a rota de depósito reduzido',
          'Renda de pensão documentada reduz bastante o depósito, mas a pensão precisa ser verificável e paga com regularidade, não um pagamento único.',
        ],
        es: [
          'Prueba de una pensión mensual para la vía de depósito reducido',
          'Unos ingresos de pensión documentados reducen bastante el depósito, pero la pensión debe ser verificable y abonarse con regularidad, no un pago único.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Annual authority fee for you and for each dependant',
          'A recurring charge separate from the deposit, billed every year for the principal and per dependant. Non-payment is a ground for cancelling the status.',
        ],
        pt: [
          'Taxa anual da autoridade para você e para cada dependente',
          'Um encargo recorrente separado do depósito, cobrado todo ano do titular e por dependente. O não pagamento é motivo para cancelar o status.',
        ],
        es: [
          'Tasa anual de la autoridad por usted y por cada dependiente',
          'Un cargo recurrente distinto del depósito, facturado cada año al titular y por dependiente. El impago es causa de cancelación del estatus.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Pay the one-time processing charge to the authority',
          'Charged per principal applicant, with an additional amount per dependant. Confirm the figures in force before remitting.',
        ],
        pt: [
          'Pagar o encargo único de processamento à autoridade',
          'Cobrado por requerente titular, com um valor adicional por dependente. Confirme os valores em vigor antes de remeter.',
        ],
        es: [
          'Pagar el cargo único de tramitación a la autoridad',
          'Se cobra por solicitante titular, con un importe adicional por dependiente. Confirme las cifras en vigor antes de remitir.',
        ],
      },
      {
        en: [
          'Lodge through an authority office or an accredited agent',
          'Marketing agents are formally accredited and handle most files; using an unaccredited intermediary is a common way to lose money here.',
        ],
        pt: [
          'Protocolar por um escritório da autoridade ou agente credenciado',
          'Os agentes são formalmente credenciados e conduzem a maioria dos processos; usar um intermediário não credenciado é uma forma comum de perder dinheiro aqui.',
        ],
        es: [
          'Presentar por una oficina de la autoridad o un agente acreditado',
          'Los agentes están formalmente acreditados y llevan la mayoría de los expedientes; usar un intermediario no acreditado es una forma habitual de perder dinero aquí.',
        ],
      },
      {
        en: [
          'Leave the deposit untouched until conversion is permitted',
          'It is locked while the status depends on it. Touching it before the authority allows a conversion puts the visa at risk immediately.',
        ],
        pt: [
          'Deixar o depósito intocado até a conversão ser permitida',
          'Ele fica bloqueado enquanto o status depender dele. Mexer nele antes de a autoridade autorizar uma conversão coloca o visto em risco imediato.',
        ],
        es: [
          'Dejar el depósito intacto hasta que se permita la conversión',
          'Queda bloqueado mientras el estatus dependa de él. Tocarlo antes de que la autoridad autorice una conversión pone el visado en riesgo inmediato.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical clearance covering the required tests',
          'A recent examination with the specific tests the authority lists. Applicants already in the country normally do it locally at an accredited facility.',
        ],
        pt: [
          'Liberação médica cobrindo os exames exigidos',
          'Um exame recente com os testes específicos que a autoridade lista. Quem já está no país normalmente o faz localmente numa unidade credenciada.',
        ],
        es: [
          'Aptitud médica que cubra las pruebas exigidas',
          'Un examen reciente con las pruebas específicas que la autoridad enumera. Quien ya está en el país suele hacerlo localmente en un centro acreditado.',
        ],
      },
      {
        en: [
          'Photograph for the retiree identity card',
          'Taken during enrolment, together with the signature and fingerprints recorded on file.',
        ],
        pt: [
          'Fotografia para o cartão de identidade de aposentado',
          'Tirada na inscrição, junto com a assinatura e as impressões digitais registadas no processo.',
        ],
        es: [
          'Fotografía para la tarjeta de identidad de jubilado',
          'Se toma en la inscripción, junto con la firma y las huellas registradas en el expediente.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Receive the retiree card that stands in for the foreigner card',
          'The scheme issues its own identity card, so holders do not maintain a separate ACR I-Card the way other residents do.',
        ],
        pt: [
          'Receber o cartão de aposentado que substitui o cartão de estrangeiro',
          'O programa emite um cartão de identidade próprio, então os titulares não mantêm um ACR I-Card à parte como os demais residentes.',
        ],
        es: [
          'Recibir la tarjeta de jubilado que sustituye a la de extranjero',
          'El programa emite su propia tarjeta de identidad, así que los titulares no mantienen una ACR I-Card aparte como los demás residentes.',
        ],
      },
      {
        en: [
          'Note the exemption from the annual report and exit clearance',
          'This is the practical advantage of the route: holders are relieved of the yearly immigration report and of the exit clearance other long-stay foreigners must obtain.',
        ],
        pt: [
          'Observar a isenção do relatório anual e da liberação de saída',
          'Esta é a vantagem prática da rota: os titulares ficam dispensados do relatório anual à imigração e da liberação de saída que os demais estrangeiros de longa permanência precisam obter.',
        ],
        es: [
          'Observar la exención del informe anual y de la autorización de salida',
          'Esta es la ventaja práctica de la vía: los titulares quedan eximidos del informe anual ante inmigración y de la autorización de salida que deben obtener los demás extranjeros de larga estancia.',
        ],
      },
      {
        en: [
          'Convert the deposit into property only under the allowed forms',
          'After a qualifying period the deposit can go into a condominium unit or a long-term lease, since foreigners cannot own land. The authority must approve the conversion first.',
        ],
        pt: [
          'Converter o depósito em imóvel só nas formas permitidas',
          'Após um período de carência, o depósito pode ir para uma unidade de condomínio ou um arrendamento de longo prazo, já que estrangeiros não podem ser donos de terra. A autoridade precisa aprovar a conversão antes.',
        ],
        es: [
          'Convertir el depósito en inmueble solo en las formas permitidas',
          'Tras un periodo de carencia, el depósito puede ir a una unidad en condominio o a un arrendamiento de largo plazo, ya que los extranjeros no pueden poseer tierra. La autoridad debe aprobar antes la conversión.',
        ],
        priority: 2,
      },
      {
        en: [
          'Obtain a work permit separately if you intend to work',
          'Residence as a retiree does not carry the right to work; taking a job still requires the labour permit like any other foreign worker.',
        ],
        pt: [
          'Obter uma permissão de trabalho à parte se pretende trabalhar',
          'A residência como aposentado não traz o direito de trabalhar; assumir um emprego ainda exige a permissão do ministério do trabalho como qualquer outro estrangeiro.',
        ],
        es: [
          'Obtener un permiso de trabajo aparte si piensa trabajar',
          'La residencia como jubilado no conlleva el derecho a trabajar; aceptar un empleo sigue exigiendo el permiso del ministerio de trabajo como a cualquier otro extranjero.',
        ],
      },
      {
        en: [
          'Withdrawing the deposit cancels the status',
          'The visa exists only as long as the qualifying investment does. Cancellation triggers a departure obligation and the deposit is released only after the status is formally closed.',
        ],
        pt: [
          'Sacar o depósito cancela o status',
          'O visto existe apenas enquanto o investimento qualificador existir. O cancelamento gera obrigação de deixar o país, e o depósito só é liberado depois de o status ser formalmente encerrado.',
        ],
        es: [
          'Retirar el depósito cancela el estatus',
          'El visado existe solo mientras exista la inversión que lo califica. La cancelación genera la obligación de salir, y el depósito se libera solo después de cerrar formalmente el estatus.',
        ],
      },
    ],
  },

  'Special Investor Resident Visa': {
    core_documents: [
      {
        en: [
          'Passport valid throughout the investment period',
          'The status is indefinite in principle, but it is tied to a travel document that has to be kept current and re-stamped on renewal.',
        ],
        pt: [
          'Passaporte válido durante todo o período do investimento',
          'O status é indefinido em princípio, mas está atrelado a um documento de viagem que precisa ser mantido em dia e recarimbado na renovação.',
        ],
        es: [
          'Pasaporte vigente durante todo el periodo de la inversión',
          'El estatus es indefinido en principio, pero está ligado a un documento de viaje que hay que mantener al día y volver a sellar en la renovación.',
        ],
      },
      {
        en: [
          'Apply through the national investment board',
          'A third agency again: the investment board assesses the economic side and endorses the case to immigration, which issues the visa.',
        ],
        pt: [
          'Pedir pelo conselho nacional de investimentos',
          'Mais uma agência distinta: o conselho de investimentos avalia o lado econômico e endossa o caso à imigração, que emite o visto.',
        ],
        es: [
          'Solicitar a través del consejo nacional de inversiones',
          'Otra agencia distinta: el consejo de inversiones evalúa el lado económico y endosa el caso a inmigración, que emite el visado.',
        ],
      },
      {
        en: [
          'Evidence the target company qualifies for the scheme',
          'The money has to go into an enterprise in a preferred area of investment or into shares of a company listed on the stock exchange. A private venture outside those categories does not count.',
        ],
        pt: [
          'Prova de que a empresa alvo se qualifica no programa',
          'O dinheiro precisa ir para uma empresa em área preferencial de investimento ou para ações de companhia listada em bolsa. Um negócio privado fora dessas categorias não conta.',
        ],
        es: [
          'Prueba de que la empresa destino califica para el programa',
          'El dinero debe ir a una empresa en un área preferente de inversión o a acciones de una compañía cotizada en bolsa. Un negocio privado fuera de esas categorías no cuenta.',
        ],
      },
      {
        en: [
          'Clearance certificates from police and immigration',
          'Foreign police records plus a local immigration clearance, all authenticated and recent.',
        ],
        pt: [
          'Certidões de nada consta da polícia e da imigração',
          'Antecedentes policiais estrangeiros mais uma certidão local de imigração, todos autenticados e recentes.',
        ],
        es: [
          'Certificados de antecedentes de policía y de inmigración',
          'Antecedentes policiales extranjeros más un certificado local de inmigración, todos autenticados y recientes.',
        ],
      },
      {
        en: [
          'Forms and endorsement for accompanying family',
          'Spouse and unmarried minor children can be included under the same investment, with legalised civil documents.',
        ],
        pt: [
          'Formulários e endosso para a família acompanhante',
          'Cônjuge e filhos menores solteiros podem ser incluídos sob o mesmo investimento, com documentos civis legalizados.',
        ],
        es: [
          'Formularios y endoso para la familia acompañante',
          'Cónyuge e hijos menores solteros pueden incluirse bajo la misma inversión, con documentos civiles legalizados.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Certificate of inward remittance registered with the central bank',
          'The funds must arrive from abroad through the banking system and be registered, otherwise the investment does not exist for this purpose no matter how real it is. Confirm the amount currently required.',
        ],
        pt: [
          'Certificado de remessa recebida registado no banco central',
          'Os recursos precisam chegar do exterior pelo sistema bancário e ser registados, senão o investimento não existe para este fim por mais real que seja. Confirme o valor atualmente exigido.',
        ],
        es: [
          'Certificado de remesa entrante registrado en el banco central',
          'Los fondos deben llegar del exterior por el sistema bancario y quedar registrados; de lo contrario la inversión no existe a estos efectos por más real que sea. Confirme el importe exigido actualmente.',
        ],
      },
      {
        en: [
          'Keep the investment in place for the life of the visa',
          'This is not a one-off entry ticket. The holding is verified periodically and the status falls with it.',
        ],
        pt: [
          'Manter o investimento aplicado durante toda a vida do visto',
          'Não é um bilhete de entrada de uma vez só. A participação é verificada periodicamente e o status cai junto com ela.',
        ],
        es: [
          'Mantener la inversión colocada durante toda la vida del visado',
          'No es un billete de entrada de una sola vez. La participación se verifica periódicamente y el estatus cae con ella.',
        ],
      },
      {
        en: [
          'Declaration that the funds are your own',
          'Borrowed capital and money held for a third party are excluded; the board looks at the source, not only at the balance.',
        ],
        pt: [
          'Declaração de que os recursos são seus',
          'Capital emprestado e dinheiro mantido para terceiros são excluídos; o conselho olha a origem, não só o saldo.',
        ],
        es: [
          'Declaración de que los fondos son propios',
          'El capital prestado y el dinero mantenido para un tercero quedan excluidos; el consejo mira el origen, no solo el saldo.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File with the investment board and pay the processing charges',
          'Separate charges apply to the application, to the endorsement and to the visa implementation. Check the current schedule.',
        ],
        pt: [
          'Protocolar no conselho de investimentos e pagar os encargos',
          'Há encargos separados para o pedido, para o endosso e para a implementação do visto. Confira a tabela vigente.',
        ],
        es: [
          'Presentar ante el consejo de inversiones y pagar los cargos',
          'Hay cargos separados por la solicitud, por el endoso y por la implementación del visado. Consulte la tarifa vigente.',
        ],
      },
      {
        en: [
          'Serve the probationary period before the indefinite status',
          'The visa is first issued provisionally while the investment is verified, and it only becomes indefinite once the board confirms the money went where it said it would.',
        ],
        pt: [
          'Cumprir o período probatório antes do status indefinido',
          'O visto é emitido primeiro em caráter provisório enquanto o investimento é verificado, e só passa a indefinido quando o conselho confirma que o dinheiro foi para onde foi declarado.',
        ],
        es: [
          'Cumplir el periodo probatorio antes del estatus indefinido',
          'El visado se emite primero de forma provisional mientras se verifica la inversión, y solo pasa a indefinido cuando el consejo confirma que el dinero fue adonde se declaró.',
        ],
      },
      {
        en: [
          'Report the investment to the board every year',
          'An annual compliance filing showing the holding is intact. It is easy to forget because it goes to a different agency from the immigration report.',
        ],
        pt: [
          'Reportar o investimento ao conselho todo ano',
          'Uma prestação de contas anual mostrando que a participação está intacta. É fácil de esquecer porque vai para uma agência diferente da do relatório de imigração.',
        ],
        es: [
          'Reportar la inversión al consejo todos los años',
          'Una declaración anual de cumplimiento que muestre que la participación está intacta. Es fácil de olvidar porque va a una agencia distinta de la del informe de inmigración.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Health certificate with the tests the scheme lists',
          'A recent medical examination including the specific screening the programme names, done at an accepted facility.',
        ],
        pt: [
          'Certificado de saúde com os exames que o programa lista',
          'Um exame médico recente incluindo a triagem específica que o programa nomeia, feito numa unidade aceita.',
        ],
        es: [
          'Certificado de salud con las pruebas que enumera el programa',
          'Un examen médico reciente que incluya el cribado específico que nombra el programa, hecho en un centro aceptado.',
        ],
      },
      {
        en: [
          'Photograph and fingerprints for the identity card',
          'Recorded at an immigration office when the visa is implemented, for you and for every included dependant.',
        ],
        pt: [
          'Fotografia e impressões digitais para o cartão de identidade',
          'Registadas num escritório de imigração quando o visto é implementado, para você e para cada dependente incluído.',
        ],
        es: [
          'Fotografía y huellas para la tarjeta de identidad',
          'Se registran en una oficina de inmigración cuando se implementa el visado, para usted y para cada dependiente incluido.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the ACR I-Card as an investor',
          'Unlike the retiree route, this one keeps you inside the ordinary foreigner registration system with its own card.',
        ],
        pt: [
          'Retirar o ACR I-Card na condição de investidor',
          'Diferente da rota de aposentado, esta mantém você dentro do sistema comum de registo de estrangeiros, com cartão próprio.',
        ],
        es: [
          'Recoger la ACR I-Card en condición de inversor',
          'A diferencia de la vía de jubilado, esta le mantiene dentro del sistema ordinario de registro de extranjeros, con tarjeta propia.',
        ],
      },
      {
        en: [
          'File the immigration annual report in the first months of the year',
          'This obligation applies here, so an investor has two yearly filings to remember: one to the board, one to immigration.',
        ],
        pt: [
          'Entregar o relatório anual à imigração nos primeiros meses do ano',
          'Essa obrigação se aplica aqui, então um investidor tem dois relatórios anuais a lembrar: um ao conselho, outro à imigração.',
        ],
        es: [
          'Presentar el informe anual ante inmigración en los primeros meses del año',
          'Esa obligación aplica aquí, así que un inversor tiene dos presentaciones anuales que recordar: una al consejo y otra a inmigración.',
        ],
      },
      {
        en: [
          'Obtain a labour permit before working in the company',
          'Owning a stake does not authorise employment. Drawing a salary or holding an operational role still requires the employment permit.',
        ],
        pt: [
          'Obter permissão laboral antes de trabalhar na empresa',
          'Ser sócio não autoriza emprego. Receber salário ou ocupar cargo operacional continua exigindo a permissão de trabalho.',
        ],
        es: [
          'Obtener el permiso laboral antes de trabajar en la empresa',
          'Ser socio no autoriza el empleo. Cobrar un salario u ocupar un cargo operativo sigue exigiendo el permiso de trabajo.',
        ],
      },
      {
        en: [
          'Notify the board before selling or reducing the holding',
          'A transfer made quietly is treated as withdrawal of the qualifying investment and cancels the status retroactively.',
        ],
        pt: [
          'Avisar o conselho antes de vender ou reduzir a participação',
          'Uma transferência feita em silêncio é tratada como retirada do investimento qualificador e cancela o status retroativamente.',
        ],
        es: [
          'Avisar al consejo antes de vender o reducir la participación',
          'Una transferencia hecha en silencio se trata como retirada de la inversión que califica y cancela el estatus con efecto retroactivo.',
        ],
      },
      {
        en: [
          'Secure exit clearance before a final departure',
          'Leaving the country for good from this status requires clearance from immigration, requested in advance of the flight.',
        ],
        pt: [
          'Garantir a liberação de saída antes de uma partida definitiva',
          'Deixar o país em definitivo a partir deste status exige liberação da imigração, pedida antes do voo.',
        ],
        es: [
          'Conseguir la autorización de salida antes de una partida definitiva',
          'Dejar el país definitivamente desde este estatus exige autorización de inmigración, solicitada antes del vuelo.',
        ],
        priority: 2,
      },
    ],
  },
};
