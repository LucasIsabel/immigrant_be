import type { CountryVisaSteps } from './types';

/**
 * Steps for Colombia.
 *
 * Colombia sorts every visa into three letters — V for visitor, M for migrant,
 * R for resident — and the letter, not the specific purpose, is what determines
 * the rights attached. Only the R visa leads to permanent status, and time on a
 * V visa does not count towards it. Choosing the letter is therefore the first
 * real decision, not a formality.
 *
 * The whole process runs on the foreign ministry's online portal, and the
 * cédula de extranjería has to be requested within fifteen days of arrival.
 */
export const colombia: CountryVisaSteps = {
  'Visitor Visa (Type V)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Valid for at least six months, with a blank page. Many nationalities enter visa-free for tourism and need none of this.',
        ],
        pt: [
          'Passaporte válido',
          'Válido por pelo menos seis meses, com uma página em branco. Muitas nacionalidades entram sem visto a turismo e não precisam de nada disso.',
        ],
        es: [
          'Pasaporte vigente',
          'Vigente al menos seis meses, con una página en blanco. Muchas nacionalidades entran sin visado a turismo y no necesitan nada de esto.',
        ],
      },
      {
        en: [
          'Online application on the foreign ministry portal',
          'The form is completed online and the documents are uploaded there; there is no paper file.',
        ],
        pt: [
          'Pedido online no portal da chancelaria',
          'O formulário é preenchido online e os documentos são enviados por lá; não há processo em papel.',
        ],
        es: [
          'Solicitud en línea en el portal de la cancillería',
          'El formulario se completa en línea y los documentos se cargan allí; no hay expediente en papel.',
        ],
      },
      {
        en: [
          'Digital photograph on a white background',
          'Uploaded to the portal, to the format it specifies.',
        ],
        pt: [
          'Fotografia digital em fundo branco',
          'Enviada ao portal, no formato que ele especifica.',
        ],
        es: [
          'Fotografía digital con fondo blanco',
          'Se carga al portal, en el formato que este especifica.',
        ],
      },
      {
        en: [
          'Document supporting the activity',
          'A contract for remote work, a course enrolment, a medical treatment plan — the V visa covers many purposes and each has its own evidence.',
        ],
        pt: [
          'Documento que sustenta a atividade',
          'Contrato de trabalho remoto, matrícula em curso, plano de tratamento médico — o visto V cobre vários propósitos e cada um tem sua comprovação.',
        ],
        es: [
          'Documento que sustenta la actividad',
          'Contrato de trabajo remoto, matrícula en un curso, plan de tratamiento médico: el visado V cubre varios propósitos y cada uno tiene su prueba.',
        ],
      },
      {
        en: [
          'Yellow fever vaccination certificate',
          'Requested for travel to certain regions of the country rather than for entry itself.',
        ],
        pt: [
          'Certificado de vacinação contra febre amarela',
          'Pedido para viajar a certas regiões do país, não para a entrada em si.',
        ],
        es: [
          'Certificado de vacunación contra la fiebre amarilla',
          'Se pide para viajar a ciertas regiones del país, no para la entrada en sí.',
        ],
        priority: 3,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Bank statements from the last three to six months',
          'The threshold is set as a multiple of the Colombian minimum wage and it differs by V subtype.',
        ],
        pt: [
          'Extratos bancários dos últimos três a seis meses',
          'O piso é definido como múltiplo do salário mínimo colombiano e varia conforme o subtipo do V.',
        ],
        es: [
          'Extractos bancarios de los últimos tres a seis meses',
          'El umbral se fija como múltiplo del salario mínimo colombiano y varía según el subtipo de V.',
        ],
      },
      {
        en: [
          'Proof of income from abroad for the remote work subtype',
          'The income has to come from outside Colombia, evidenced by contracts and statements.',
        ],
        pt: [
          'Comprovação de renda vinda do exterior no subtipo de trabalho remoto',
          'A renda precisa vir de fora da Colômbia, comprovada por contratos e extratos.',
        ],
        es: [
          'Prueba de ingresos del exterior en el subtipo de trabajo remoto',
          'Los ingresos deben provenir de fuera de Colombia, acreditados con contratos y extractos.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Pay the study fee first',
          'Colombia charges twice: once for the file to be examined, and again for the visa if it is approved.',
        ],
        pt: [
          'Pagar primeiro a taxa de estudo do processo',
          'A Colômbia cobra duas vezes: uma para o processo ser examinado, e outra pelo visto se ele for aprovado.',
        ],
        es: [
          'Pagar primero la tasa de estudio del expediente',
          'Colombia cobra dos veces: una para que se examine el expediente, y otra por el visado si se aprueba.',
        ],
      },
      {
        en: [
          'Pay the visa issuance fee after approval',
          'Charged only if the visa is granted, and the amount varies by nationality.',
        ],
        pt: [
          'Pagar a taxa de emissão após a aprovação',
          'Cobrada apenas se o visto for concedido, e o valor varia por nacionalidade.',
        ],
        es: [
          'Pagar la tasa de expedición tras la aprobación',
          'Se cobra solo si conceden el visado, y el importe varía según la nacionalidad.',
        ],
      },
      {
        en: [
          'Respond quickly to any request for more documents',
          'The portal gives a short deadline and the file is closed if it passes.',
        ],
        pt: [
          'Responder rápido a qualquer exigência de documentos',
          'O portal dá prazo curto e o processo é encerrado se ele passar.',
        ],
        es: [
          'Responder rápido a cualquier requerimiento de documentos',
          'El portal da un plazo corto y el expediente se cierra si vence.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Health insurance valid in Colombia',
          'Required for most V subtypes, covering the whole stay including repatriation.',
        ],
        pt: [
          'Seguro de saúde válido na Colômbia',
          'Exigido na maioria dos subtipos V, cobrindo toda a estada, inclusive repatriamento.',
        ],
        es: [
          'Seguro de salud válido en Colombia',
          'Exigido en la mayoría de los subtipos V, cubriendo toda la estancia, incluida la repatriación.',
        ],
      },
      {
        en: [
          'Biometric registration at migration',
          'Taken when the foreigner identity card is issued, for stays over three months.',
        ],
        pt: [
          'Registo biométrico na migração',
          'Feito na emissão da cédula de extranjería, em estadas acima de três meses.',
        ],
        es: [
          'Registro biométrico en migración',
          'Se realiza al emitir la cédula de extranjería, en estancias de más de tres meses.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Register with migration within fifteen days of arrival',
          'For visas over three months, this produces the cédula de extranjería. The deadline is short and carries a fine.',
        ],
        pt: [
          'Registar-se na migração em até quinze dias da chegada',
          'Em vistos acima de três meses, é o que gera a cédula de extranjería. O prazo é curto e o atraso gera multa.',
        ],
        es: [
          'Registrarse ante migración en los quince días siguientes a la llegada',
          'En visados de más de tres meses, es lo que genera la cédula de extranjería. El plazo es corto y el retraso conlleva multa.',
        ],
      },
      {
        en: [
          'Understand what the V visa does not give you',
          'It does not allow working for a Colombian employer, and the time does not count towards residence.',
        ],
        pt: [
          'Entender o que o visto V não dá',
          'Ele não permite trabalhar para empregador colombiano, e o tempo não conta para a residência.',
        ],
        es: [
          'Entender lo que el visado V no otorga',
          'No permite trabajar para un empleador colombiano, y el tiempo no cuenta para la residencia.',
        ],
      },
      {
        en: [
          'Plan the change to an M visa if you intend to settle',
          'Only the M and R letters build towards permanent residence.',
        ],
        pt: [
          'Planejar a mudança para visto M se pretende se fixar',
          'Só as letras M e R constroem caminho para a residência permanente.',
        ],
        es: [
          'Planificar el cambio a un visado M si piensa establecerse',
          'Solo las letras M y R construyen camino hacia la residencia permanente.',
        ],
        priority: 2,
      },
    ],
  },

  'Migrant Visa (Type M)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'With at least six months of validity and a blank page.',
        ],
        pt: [
          'Passaporte válido',
          'Com pelo menos seis meses de validade e uma página em branco.',
        ],
        es: [
          'Pasaporte vigente',
          'Con al menos seis meses de validez y una página en blanco.',
        ],
      },
      {
        en: [
          'Online application on the foreign ministry portal',
          'Selecting the correct M subtype: spouse, parent of a Colombian, worker, investor, pensioner or student.',
        ],
        pt: [
          'Pedido online no portal da chancelaria',
          'Selecionando o subtipo M correto: cônjuge, pai ou mãe de colombiano, trabalhador, investidor, pensionista ou estudante.',
        ],
        es: [
          'Solicitud en línea en el portal de la cancillería',
          'Seleccionando el subtipo M correcto: cónyuge, padre o madre de colombiano, trabajador, inversor, pensionado o estudiante.',
        ],
      },
      {
        en: [
          'Document supporting the subtype',
          'A marriage or partnership registration, a Colombian child’s birth certificate, an employment contract, or the investment record.',
        ],
        pt: [
          'Documento que sustenta o subtipo',
          'Registo de casamento ou união, certidão de nascimento de filho colombiano, contrato de trabalho, ou o registo do investimento.',
        ],
        es: [
          'Documento que sustenta el subtipo',
          'Registro de matrimonio o unión, partida de nacimiento de hijo colombiano, contrato de trabajo, o el registro de la inversión.',
        ],
      },
      {
        en: [
          'Apostilled and translated civil documents',
          'Foreign documents need an apostille and an official translation into Spanish.',
        ],
        pt: [
          'Documentos civis apostilados e traduzidos',
          'Documentos estrangeiros exigem apostila e tradução oficial para o espanhol.',
        ],
        es: [
          'Documentos civiles apostillados y traducidos',
          'Los documentos extranjeros exigen apostilla y traducción oficial al español.',
        ],
      },
      {
        en: [
          'Motivation letter',
          'Explaining the ground and the plan, addressed to the visa authority.',
        ],
        pt: [
          'Carta de motivação',
          'Explicando o fundamento e o plano, endereçada à autoridade de vistos.',
        ],
        es: [
          'Carta de motivación',
          'Explicando el fundamento y el plan, dirigida a la autoridad de visados.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Diplomas for regulated professions',
          'Practising requires the qualification to be convalidated by the education ministry, which is slow.',
        ],
        pt: [
          'Diplomas para profissões regulamentadas',
          'Exercer exige convalidação do diploma pelo ministério da educação, o que é lento.',
        ],
        es: [
          'Títulos para profesiones reguladas',
          'Ejercer exige convalidar el título ante el ministerio de educación, lo que es lento.',
        ],
        required: false,
      },
      {
        en: [
          'Enrolment certificate for the student subtype',
          'From an institution recognised by the education ministry.',
        ],
        pt: [
          'Certificado de matrícula no subtipo de estudante',
          'De instituição reconhecida pelo ministério da educação.',
        ],
        es: [
          'Certificado de matrícula en el subtipo de estudiante',
          'De una institución reconocida por el ministerio de educación.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of income at the threshold for the subtype',
          'Expressed as a multiple of the Colombian minimum wage, so it moves each year.',
        ],
        pt: [
          'Comprovação de renda no piso do subtipo',
          'Expresso como múltiplo do salário mínimo colombiano, então muda a cada ano.',
        ],
        es: [
          'Prueba de ingresos en el umbral del subtipo',
          'Se expresa como múltiplo del salario mínimo colombiano, así que cambia cada año.',
        ],
      },
      {
        en: [
          'Investment registered with the central bank',
          'For the investor subtype, the foreign capital must be formally registered.',
        ],
        pt: [
          'Investimento registado no banco central',
          'No subtipo de investidor, o capital estrangeiro precisa estar formalmente registado.',
        ],
        es: [
          'Inversión registrada en el banco central',
          'En el subtipo de inversor, el capital extranjero debe estar formalmente registrado.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Pay the study and issuance fees',
          'Two separate charges, as with the V visa.',
        ],
        pt: [
          'Pagar as taxas de estudo e de emissão',
          'Duas cobranças distintas, como no visto V.',
        ],
        es: [
          'Pagar las tasas de estudio y de expedición',
          'Dos cargos distintos, como en el visado V.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File on the portal from anywhere',
          'The M visa can be requested from inside Colombia or abroad, which is a real advantage over many countries.',
        ],
        pt: [
          'Protocolar no portal de qualquer lugar',
          'O visto M pode ser pedido de dentro da Colômbia ou do exterior, o que é uma vantagem real sobre muitos países.',
        ],
        es: [
          'Presentar en el portal desde cualquier lugar',
          'El visado M puede solicitarse desde dentro de Colombia o desde el exterior, lo que es una ventaja real sobre muchos países.',
        ],
      },
      {
        en: [
          'Attend the interview if one is scheduled',
          'Held at a consulate or by video, mostly for the spouse and partnership subtypes.',
        ],
        pt: [
          'Comparecer à entrevista se for agendada',
          'Feita em consulado ou por vídeo, sobretudo nos subtipos de cônjuge e união.',
        ],
        es: [
          'Acudir a la entrevista si se programa',
          'Se hace en consulado o por vídeo, sobre todo en los subtipos de cónyuge y unión.',
        ],
        required: false,
      },
      {
        en: [
          'Keep the visa valid without long absences',
          'An M visa lapses if you are outside Colombia for more than six continuous months.',
        ],
        pt: [
          'Manter o visto válido sem ausências longas',
          'O visto M caduca se você ficar fora da Colômbia por mais de seis meses contínuos.',
        ],
        es: [
          'Mantener el visado vigente sin ausencias largas',
          'El visado M caduca si permanece fuera de Colombia más de seis meses continuos.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Health insurance or affiliation to the health system',
          'Required for the visa, and affiliation becomes compulsory once you work here.',
        ],
        pt: [
          'Seguro de saúde ou filiação ao sistema de saúde',
          'Exigido para o visto, e a filiação passa a ser obrigatória assim que você trabalha aqui.',
        ],
        es: [
          'Seguro de salud o afiliación al sistema de salud',
          'Exigido para el visado, y la afiliación es obligatoria una vez que trabaja aquí.',
        ],
      },
      {
        en: [
          'Biometric registration for the identity card',
          'Taken at a migration office after arrival.',
        ],
        pt: [
          'Registo biométrico para a cédula',
          'Feito num escritório de migração após a chegada.',
        ],
        es: [
          'Registro biométrico para la cédula',
          'Se realiza en una oficina de migración tras la llegada.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Register with migration within fifteen days',
          'Producing the cédula de extranjería, which is the identity document you will use daily.',
        ],
        pt: [
          'Registar-se na migração em até quinze dias',
          'Gerando a cédula de extranjería, que é o documento de identidade do dia a dia.',
        ],
        es: [
          'Registrarse ante migración en quince días',
          'Genera la cédula de extranjería, que es el documento de identidad de uso diario.',
        ],
      },
      {
        en: [
          'Affiliate to the health and pension system',
          'Compulsory for anyone working formally in Colombia.',
        ],
        pt: [
          'Filiar-se ao sistema de saúde e de pensões',
          'Obrigatório para quem trabalha formalmente na Colômbia.',
        ],
        es: [
          'Afiliarse al sistema de salud y de pensiones',
          'Obligatorio para quien trabaja formalmente en Colombia.',
        ],
      },
      {
        en: [
          'Count the years towards the R visa',
          'The qualifying period depends on the M subtype: shorter for the spouse and parent grounds, longer for work and investment.',
        ],
        pt: [
          'Contar os anos para o visto R',
          'O período qualificado depende do subtipo M: menor nos fundamentos de cônjuge e de pai ou mãe, maior em trabalho e investimento.',
        ],
        es: [
          'Contar los años para el visado R',
          'El periodo cualificado depende del subtipo M: menor en los fundamentos de cónyuge y de padre o madre, mayor en trabajo e inversión.',
        ],
      },
      {
        en: [
          'Renew before the visa expires',
          'A gap breaks the continuity the R visa depends on.',
        ],
        pt: [
          'Renovar antes de o visto vencer',
          'Uma lacuna quebra a continuidade de que o visto R depende.',
        ],
        es: [
          'Renovar antes de que caduque el visado',
          'Un vacío rompe la continuidad de la que depende el visado R.',
        ],
        priority: 2,
      },
    ],
  },

  'Resident Visa (Type R)': {
    core_documents: [
      {
        en: [
          'Valid passport and current cédula de extranjería',
          'The application is normally made while holding a valid M visa.',
        ],
        pt: [
          'Passaporte válido e cédula de extranjería atual',
          'O pedido é feito normalmente com um visto M válido em mãos.',
        ],
        es: [
          'Pasaporte vigente y cédula de extranjería actual',
          'La solicitud se hace normalmente con un visado M vigente.',
        ],
      },
      {
        en: [
          'Evidence of the qualifying period on an M visa',
          'How many years depends on the ground: fewer for the spouse or parent of a Colombian, more for work and investment.',
        ],
        pt: [
          'Comprovação do período qualificado com visto M',
          'Quantos anos depende do fundamento: menos para cônjuge ou pai ou mãe de colombiano, mais em trabalho e investimento.',
        ],
        es: [
          'Prueba del periodo cualificado con visado M',
          'Cuántos años depende del fundamento: menos para cónyuge o padre o madre de colombiano, más en trabajo e inversión.',
        ],
      },
      {
        en: [
          'Record of entries and exits',
          'Obtained from migration; absences of more than six continuous months break the count.',
        ],
        pt: [
          'Certificado de entradas e saídas',
          'Obtido na migração; ausências de mais de seis meses contínuos quebram a contagem.',
        ],
        es: [
          'Certificado de entradas y salidas',
          'Se obtiene en migración; las ausencias de más de seis meses continuos rompen el cómputo.',
        ],
      },
      {
        en: [
          'Colombian criminal record certificate',
          'Issued online by the national police.',
        ],
        pt: [
          'Certidão de antecedentes judiciais colombiana',
          'Emitida online pela polícia nacional.',
        ],
        es: [
          'Certificado de antecedentes judiciales colombiano',
          'Se emite en línea por la policía nacional.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of continuous lawful income',
          'Covering the qualifying period, not just the present month.',
        ],
        pt: [
          'Comprovação de renda lícita contínua',
          'Cobrindo o período qualificado, não apenas o mês atual.',
        ],
        es: [
          'Prueba de ingresos lícitos continuos',
          'Que cubran el periodo cualificado, no solo el mes actual.',
        ],
      },
      {
        en: [
          'Tax returns for the period',
          'They evidence both the income and the continuity of your presence.',
        ],
        pt: [
          'Declarações de imposto do período',
          'Comprovam ao mesmo tempo a renda e a continuidade da presença.',
        ],
        es: [
          'Declaraciones de impuestos del periodo',
          'Acreditan a la vez los ingresos y la continuidad de la presencia.',
        ],
        priority: 2,
      },
      {
        en: [
          'Pay the study and issuance fees',
          'The R visa issuance fee is the highest of the three letters.',
        ],
        pt: [
          'Pagar as taxas de estudo e de emissão',
          'A taxa de emissão do visto R é a mais alta das três letras.',
        ],
        es: [
          'Pagar las tasas de estudio y de expedición',
          'La tasa de expedición del visado R es la más alta de las tres letras.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File on the foreign ministry portal',
          'Under the R category, with the M visa history attached.',
        ],
        pt: [
          'Protocolar no portal da chancelaria',
          'Na categoria R, com o histórico do visto M anexado.',
        ],
        es: [
          'Presentar en el portal de la cancillería',
          'En la categoría R, con el historial del visado M adjunto.',
        ],
      },
      {
        en: [
          'Apply before the M visa expires',
          'Letting it lapse resets the accumulated period.',
        ],
        pt: [
          'Pedir antes de o visto M vencer',
          'Deixá-lo caducar zera o período acumulado.',
        ],
        es: [
          'Solicitar antes de que caduque el visado M',
          'Dejarlo caducar reinicia el periodo acumulado.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Continuous affiliation to the health system',
          'Gaps count against the application.',
        ],
        pt: [
          'Filiação contínua ao sistema de saúde',
          'Lacunas pesam contra o pedido.',
        ],
        es: [
          'Afiliación continua al sistema de salud',
          'Los vacíos pesan en contra de la solicitud.',
        ],
      },
      {
        en: [
          'Biometric registration for the new card',
          'Taken at migration when the R visa is registered.',
        ],
        pt: [
          'Registo biométrico para a nova cédula',
          'Feito na migração quando o visto R é registado.',
        ],
        es: [
          'Registro biométrico para la nueva cédula',
          'Se realiza en migración cuando se registra el visado R.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Register the R visa with migration',
          'Within fifteen days, producing the resident cédula de extranjería.',
        ],
        pt: [
          'Registar o visto R na migração',
          'Em até quinze dias, gerando a cédula de extranjería de residente.',
        ],
        es: [
          'Registrar el visado R ante migración',
          'En quince días, generando la cédula de extranjería de residente.',
        ],
      },
      {
        en: [
          'Do not stay outside Colombia for more than two years',
          'The R visa lapses after a continuous absence beyond that, unlike the six months that apply to the M.',
        ],
        pt: [
          'Não ficar fora da Colômbia por mais de dois anos',
          'O visto R caduca após ausência contínua além disso, diferente dos seis meses que valem para o M.',
        ],
        es: [
          'No permanecer fuera de Colombia más de dos años',
          'El visado R caduca tras una ausencia continua superior, a diferencia de los seis meses que rigen para el M.',
        ],
      },
      {
        en: [
          'Note that the R visa does not expire on its own',
          'It is indefinite, and the card is renewed rather than the status.',
        ],
        pt: [
          'Saber que o visto R não vence por si só',
          'Ele é indefinido, e o que se renova é a cédula, não o status.',
        ],
        es: [
          'Saber que el visado R no caduca por sí solo',
          'Es indefinido, y lo que se renueva es la cédula, no el estatus.',
        ],
      },
      {
        en: [
          'Consider naturalisation after five years of residence',
          'Two years for nationals of Latin American and Caribbean countries, and for the spouse of a Colombian.',
        ],
        pt: [
          'Avaliar a naturalização após cinco anos de residência',
          'Dois anos para nacionais de países latino-americanos e caribenhos, e para cônjuge de colombiano.',
        ],
        es: [
          'Evaluar la naturalización tras cinco años de residencia',
          'Dos años para nacionales de países latinoamericanos y caribeños, y para el cónyuge de un colombiano.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
