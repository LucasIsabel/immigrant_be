import type { CountryVisaSteps } from './types';

/**
 * Steps for Croatia.
 *
 * Croatia joined both the Schengen area and the euro at the start of 2023, so
 * any guide written before then is wrong on two counts at once: the visa is now
 * a full Schengen visa, days spent here count against the 90 in 180 allowance,
 * and every amount is quoted in euro rather than kuna.
 *
 * The OIB — the personal identification number issued by the tax
 * administration — is what actually unlocks daily life: a bank account, a
 * registered lease, a phone contract. It does not arrive with the residence
 * permit and has to be requested separately.
 *
 * The digital nomad route is unusually generous on tax, with income from the
 * foreign employer exempt from Croatian income tax, and unusually strict on
 * everything else: it cannot simply be rolled over, and the time spent on it
 * does not count towards permanent residence.
 */
export const croatia: CountryVisaSteps = {
  'Short-Stay Visa (Schengen Type C)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Issued in the last ten years and valid for three months beyond the date you plan to leave the Schengen area.',
        ],
        pt: [
          'Passaporte válido',
          'Emitido nos últimos dez anos e válido por três meses além da data prevista de saída do espaço Schengen.',
        ],
        es: [
          'Pasaporte vigente',
          'Emitido en los últimos diez años y vigente tres meses más allá de la fecha prevista de salida del espacio Schengen.',
        ],
      },
      {
        en: [
          'Schengen visa application form for Croatia',
          'Since 2023 Croatia issues the full Schengen visa, not the old national one. Application forms and guides from before then describe a procedure that no longer exists.',
        ],
        pt: [
          'Formulário de pedido de visto Schengen para a Croácia',
          'Desde 2023 a Croácia emite o visto Schengen completo, e não o antigo visto nacional. Formulários e guias anteriores descrevem um procedimento que já não existe.',
        ],
        es: [
          'Formulario de solicitud de visado Schengen para Croacia',
          'Desde 2023 Croacia emite el visado Schengen completo, no el antiguo nacional. Los formularios y guías anteriores describen un trámite que ya no existe.',
        ],
      },
      {
        en: [
          'One recent biometric photograph',
          'Taken within the last six months, meeting ICAO dimensions.',
        ],
        pt: [
          'Uma fotografia biométrica recente',
          'Tirada nos últimos seis meses, respeitando as dimensões ICAO.',
        ],
        es: [
          'Una fotografía biométrica reciente',
          'Tomada en los últimos seis meses, con las dimensiones ICAO.',
        ],
      },
      {
        en: [
          'Round-trip travel booking',
          'Showing entry into and exit from the Schengen area on the dates declared in the form.',
        ],
        pt: [
          'Reserva de viagem de ida e volta',
          'Demonstrando entrada e saída do espaço Schengen nas datas declaradas no formulário.',
        ],
        es: [
          'Reserva de viaje de ida y vuelta',
          'Que muestre la entrada y la salida del espacio Schengen en las fechas declaradas en el formulario.',
        ],
      },
      {
        en: [
          'Accommodation booking or a notarised invitation',
          'An invitation from a private host in Croatia has to be certified by a notary or the competent police administration; a plain letter is not accepted.',
        ],
        pt: [
          'Reserva de alojamento ou convite com reconhecimento notarial',
          'O convite de um anfitrião privado na Croácia tem de ser certificado por notário ou pela administração policial competente; uma carta simples não é aceite.',
        ],
        es: [
          'Reserva de alojamiento o invitación con fe notarial',
          'La invitación de un anfitrión privado en Croacia debe certificarla un notario o la administración policial competente; una carta simple no vale.',
        ],
      },
      {
        en: [
          'Travel health insurance for the Schengen area',
          'Minimum cover of 30,000 euros. Note the currency: Croatia adopted the euro in 2023 and no longer works in kuna.',
        ],
        pt: [
          'Seguro de saúde de viagem para o espaço Schengen',
          'Cobertura mínima de 30 mil euros. Atenção à moeda: a Croácia adotou o euro em 2023 e já não trabalha em kunas.',
        ],
        es: [
          'Seguro de salud de viaje para el espacio Schengen',
          'Cobertura mínima de 30 mil euros. Ojo con la moneda: Croacia adoptó el euro en 2023 y ya no opera en kunas.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of means for each day of stay',
          'Croatia sets a daily amount per person, reduced when accommodation is prepaid. Check the figure currently published rather than an old one in kuna.',
        ],
        pt: [
          'Comprovativo de meios por cada dia de estada',
          'A Croácia define um valor diário por pessoa, reduzido quando o alojamento está pago. Confira o montante publicado atualmente, e não um antigo em kunas.',
        ],
        es: [
          'Comprobante de medios por cada día de estancia',
          'Croacia fija un importe diario por persona, menor si el alojamiento está pagado. Consulte la cifra publicada ahora, no una antigua en kunas.',
        ],
      },
      {
        en: [
          'Bank statements covering three months',
          'The movement over time matters more than the closing balance on the day you apply.',
        ],
        pt: [
          'Extratos bancários cobrindo três meses',
          'A movimentação ao longo do tempo pesa mais do que o saldo do dia em que você pede.',
        ],
        es: [
          'Extractos bancarios que cubran tres meses',
          'El movimiento a lo largo del tiempo pesa más que el saldo del día en que solicita.',
        ],
      },
      {
        en: [
          'Confirmation of employment or studies',
          'An employer letter with approved leave, or an enrolment certificate, showing you have reason to return.',
        ],
        pt: [
          'Confirmação de vínculo laboral ou de estudos',
          'Carta do empregador com férias aprovadas, ou certificado de matrícula, mostrando que há motivo para regressar.',
        ],
        es: [
          'Confirmación de empleo o de estudios',
          'Carta del empleador con vacaciones aprobadas, o certificado de matrícula, que muestre que tiene motivos para volver.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply at the Croatian mission or partner centre',
          'In several countries Croatia is represented by another Schengen state or works through an outsourced centre; confirm which one covers your area.',
        ],
        pt: [
          'Pedir na representação croata ou centro parceiro',
          'Em vários países a Croácia é representada por outro Estado Schengen ou trabalha por um centro terceirizado; confirme qual cobre a sua área.',
        ],
        es: [
          'Solicitar en la representación croata o centro asociado',
          'En varios países Croacia está representada por otro Estado Schengen o trabaja mediante un centro externo; confirme cuál cubre su zona.',
        ],
      },
      {
        en: [
          'Pay the visa fee in euro',
          'Non-refundable, including when the visa is refused or granted for fewer days than requested.',
        ],
        pt: [
          'Pagar a taxa de visto em euros',
          'Não reembolsável, inclusive quando o visto é recusado ou concedido por menos dias do que os pedidos.',
        ],
        es: [
          'Pagar la tasa de visado en euros',
          'No reembolsable, incluso si deniegan el visado o lo conceden por menos días de los solicitados.',
        ],
      },
      {
        en: [
          'Respect the submission deadlines',
          'At the earliest six months before the trip and at the latest fifteen days before departure.',
        ],
        pt: [
          'Respeitar os prazos de entrega',
          'No mínimo quinze dias antes da partida e no máximo seis meses antes da viagem.',
        ],
        es: [
          'Respetar los plazos de presentación',
          'Como pronto seis meses antes del viaje y como tarde quince días antes de la salida.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Fingerprints and photograph for the visa system',
          'Stored for 59 months and reused if you apply again to any Schengen state within that period.',
        ],
        pt: [
          'Impressões digitais e fotografia para o sistema de vistos',
          'Guardadas por 59 meses e reaproveitadas se pedir de novo a qualquer Estado Schengen nesse período.',
        ],
        es: [
          'Huellas y fotografía para el sistema de visados',
          'Se conservan 59 meses y se reutilizan si vuelve a solicitar a cualquier Estado Schengen en ese periodo.',
        ],
      },
      {
        en: [
          'Medical assessment',
          'Not required for a short stay; only the travel insurance certificate is verified.',
        ],
        pt: [
          'Avaliação médica',
          'Não é exigida para estadas curtas; apenas o certificado de seguro de viagem é verificado.',
        ],
        es: [
          'Evaluación médica',
          'No se exige para estancias cortas; solo se verifica el certificado del seguro de viaje.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Check the validity and entries on the visa',
          'Compare the dates on the sticker with your booking before travelling; a mismatch is caught at the border, not on departure.',
        ],
        pt: [
          'Conferir a validade e as entradas do visto',
          'Compare as datas da vinheta com a sua reserva antes de viajar; a divergência é apanhada na fronteira, não no embarque.',
        ],
        es: [
          'Revisar la validez y las entradas del visado',
          'Compare las fechas de la etiqueta con su reserva antes de viajar; el desajuste se detecta en la frontera, no al embarcar.',
        ],
      },
      {
        en: [
          'Count Croatian days against your Schengen allowance',
          'Before 2023 time in Croatia was separate from the 90 in 180 rule. It no longer is, and travellers who plan on the old basis overstay without noticing.',
        ],
        pt: [
          'Contar os dias na Croácia dentro da sua cota Schengen',
          'Antes de 2023 o tempo na Croácia era separado da regra dos 90 em 180. Já não é, e quem planeia pela regra antiga excede o prazo sem perceber.',
        ],
        es: [
          'Contar los días en Croacia dentro de su cuota Schengen',
          'Antes de 2023 el tiempo en Croacia era ajeno a la regla de 90 en 180. Ya no lo es, y quien planifica con la regla antigua se excede sin darse cuenta.',
        ],
      },
      {
        en: [
          'Make sure your stay is registered with the police',
          'Hotels report guests automatically, but a private host must file the registration within a short deadline of your arrival and it is their legal obligation.',
        ],
        pt: [
          'Garantir que a sua estada é registada na polícia',
          'Os hotéis comunicam os hóspedes automaticamente, mas um anfitrião privado tem de fazer o registo num prazo curto após a chegada, e a obrigação legal é dele.',
        ],
        es: [
          'Asegurarse de que su estancia se registra ante la policía',
          'Los hoteles comunican a los huéspedes automáticamente, pero un anfitrión privado debe presentar el registro en un plazo breve tras la llegada, y la obligación legal es suya.',
        ],
      },
      {
        en: [
          'Do not take up work on this visa',
          'Employment requires a stay and work permit obtained beforehand; being found working on a visitor visa leads to a re-entry ban.',
        ],
        pt: [
          'Não iniciar trabalho com este visto',
          'O emprego exige autorização de residência e trabalho obtida antes; ser encontrado a trabalhar com visto de visitante gera proibição de reentrada.',
        ],
        es: [
          'No empezar a trabajar con este visado',
          'El empleo exige un permiso de estancia y trabajo obtenido antes; ser hallado trabajando con visado de visitante conlleva prohibición de reentrada.',
        ],
      },
    ],
  },

  'Digital Nomad Residence Permit': {
    core_documents: [
      {
        en: [
          'Prove you work through communication technology for a foreign employer',
          'Employment with a company registered abroad, or your own company outside Croatia. A Croatian employer or Croatian clients make you ineligible for this category.',
        ],
        pt: [
          'Provar que trabalha por meios de comunicação para empregador estrangeiro',
          'Vínculo com empresa registada no exterior, ou empresa própria fora da Croácia. Um empregador croata ou clientes croatas tornam-no inelegível para esta categoria.',
        ],
        es: [
          'Probar que trabaja mediante tecnología de comunicación para un empleador extranjero',
          'Vínculo con una empresa registrada fuera, o su propia sociedad fuera de Croacia. Un empleador croata o clientes croatas le hacen inelegible en esta categoría.',
        ],
      },
      {
        en: [
          'Passport valid beyond the requested stay',
          'It must remain valid for at least three months longer than the period of temporary stay you ask for.',
        ],
        pt: [
          'Passaporte válido para além da estada pedida',
          'Tem de continuar válido por, no mínimo, três meses além do período de estada temporária solicitado.',
        ],
        es: [
          'Pasaporte vigente más allá de la estancia solicitada',
          'Debe seguir vigente al menos tres meses más que el periodo de estancia temporal que solicita.',
        ],
      },
      {
        en: [
          'Application for temporary stay for digital nomads',
          'Filed at a Croatian consulate abroad or, if your nationality is visa exempt, directly at the police administration in Croatia.',
        ],
        pt: [
          'Pedido de estada temporária para nómadas digitais',
          'Entregue num consulado croata no exterior ou, se a sua nacionalidade for isenta de visto, diretamente na administração policial na Croácia.',
        ],
        es: [
          'Solicitud de estancia temporal para nómadas digitales',
          'Se presenta en un consulado croata en el exterior o, si su nacionalidad está exenta de visado, directamente en la administración policial en Croacia.',
        ],
      },
      {
        en: [
          'Criminal record certificate with a sworn court translation',
          'Croatia requires translations by a permanent court interpreter, not by any translation agency, and the certificate must be apostilled.',
        ],
        pt: [
          'Certificado criminal com tradução de intérprete judicial',
          'A Croácia exige tradução por intérprete judicial permanente, e não por qualquer agência, e o certificado tem de ter apostila.',
        ],
        es: [
          'Certificado de antecedentes con traducción de intérprete judicial',
          'Croacia exige traducción por intérprete judicial permanente, no por cualquier agencia, y el certificado debe llevar apostilla.',
        ],
      },
      {
        en: [
          'Proof of address in Croatia',
          'A lease or property deed for the place you will live. It is requested before the permit is granted, so you commit to housing early.',
        ],
        pt: [
          'Comprovativo de morada na Croácia',
          'Contrato de arrendamento ou escritura do imóvel onde vai viver. É pedido antes da concessão, por isso compromete-se com a habitação cedo.',
        ],
        es: [
          'Comprobante de domicilio en Croacia',
          'Contrato de alquiler o escritura del inmueble donde vivirá. Se pide antes de conceder el permiso, así que se compromete con la vivienda pronto.',
        ],
      },
      {
        en: [
          'Photograph and the prescribed application annexes',
          'Croatia uses numbered forms; using the wrong one for your category sends the file back to the start.',
        ],
        pt: [
          'Fotografia e os anexos obrigatórios do pedido',
          'A Croácia usa formulários numerados; usar o errado para a sua categoria devolve o processo ao início.',
        ],
        es: [
          'Fotografía y los anexos obligatorios de la solicitud',
          'Croacia usa formularios numerados; usar el incorrecto para su categoría devuelve el expediente al inicio.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Income above the threshold tied to the average salary',
          'The minimum is a multiple of the Croatian average net wage and is recalculated, so it rises every year. Confirm the amount currently in force.',
        ],
        pt: [
          'Rendimento acima do limiar ligado ao salário médio',
          'O mínimo é um múltiplo do salário líquido médio croata e é recalculado, por isso sobe todos os anos. Confirme o valor atualmente em vigor.',
        ],
        es: [
          'Ingresos por encima del umbral ligado al salario medio',
          'El mínimo es un múltiplo del salario neto medio croata y se recalcula, por lo que sube cada año. Confirme el importe vigente.',
        ],
      },
      {
        en: [
          'Bank statements showing the income arriving',
          'Several months of receipts, or a lump sum covering the entire period of stay if you prefer to prove funds rather than monthly income.',
        ],
        pt: [
          'Extratos bancários mostrando a entrada do rendimento',
          'Vários meses de recebimentos, ou um montante único cobrindo todo o período de estada se preferir provar fundos em vez de rendimento mensal.',
        ],
        es: [
          'Extractos bancarios que muestren la entrada de ingresos',
          'Varios meses de cobros, o una suma única que cubra todo el periodo de estancia si prefiere acreditar fondos en vez de ingresos mensuales.',
        ],
      },
      {
        en: [
          'Health insurance valid in Croatia for the whole stay',
          'A standard travel policy is not accepted; the cover has to run for the full period of the permit.',
        ],
        pt: [
          'Seguro de saúde válido na Croácia por toda a estada',
          'Uma apólice de viagem comum não é aceite; a cobertura tem de durar todo o período da autorização.',
        ],
        es: [
          'Seguro de salud válido en Croacia durante toda la estancia',
          'Una póliza de viaje corriente no se acepta; la cobertura debe durar todo el periodo del permiso.',
        ],
      },
      {
        en: [
          'Pay the administrative fees and the card fee',
          'These are separate payments: the state fee for the decision and the fee for the biometric card, the latter paid when you collect it.',
        ],
        pt: [
          'Pagar as taxas administrativas e a taxa do cartão',
          'São pagamentos separados: a taxa estatal da decisão e a taxa do cartão biométrico, esta última paga no levantamento.',
        ],
        es: [
          'Pagar las tasas administrativas y la tasa de la tarjeta',
          'Son pagos separados: la tasa estatal de la resolución y la de la tarjeta biométrica, esta última al recogerla.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Choose the filing route before gathering documents',
          'Consulate abroad or police administration in Croatia. The two routes ask for the same evidence but on different timelines, and you cannot switch mid-way.',
        ],
        pt: [
          'Escolher a via de entrega antes de reunir documentos',
          'Consulado no exterior ou administração policial na Croácia. As duas vias pedem as mesmas provas, mas em prazos diferentes, e não se troca a meio.',
        ],
        es: [
          'Elegir la vía de presentación antes de reunir documentos',
          'Consulado en el exterior o administración policial en Croacia. Ambas piden las mismas pruebas pero en plazos distintos, y no se puede cambiar a mitad.',
        ],
      },
      {
        en: [
          'Obtain a long-stay visa if your nationality requires one',
          'After approval, visa-required nationals collect a type D visa to enter and finish the process on arrival.',
        ],
        pt: [
          'Obter visto de longa duração se a sua nacionalidade exigir',
          'Após a aprovação, os nacionais sujeitos a visto levantam um visto tipo D para entrar e concluir o processo à chegada.',
        ],
        es: [
          'Obtener un visado de larga duración si su nacionalidad lo exige',
          'Tras la aprobación, los nacionales sujetos a visado recogen un visado tipo D para entrar y completar el trámite al llegar.',
        ],
      },
      {
        en: [
          'Expect to present the documents again in person',
          'The police administration frequently asks for originals it has already seen in copy; carry the whole file with you when you arrive.',
        ],
        pt: [
          'Contar com a apresentação presencial dos documentos de novo',
          'A administração policial pede com frequência originais que já viu em cópia; leve o processo completo consigo quando chegar.',
        ],
        es: [
          'Contar con presentar de nuevo los documentos en persona',
          'La administración policial suele pedir originales que ya vio en copia; lleve el expediente completo cuando llegue.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Give biometrics for the boravišna dozvola',
          'Fingerprints and photograph taken at the police administration; the residence card is produced afterwards and collected in person.',
        ],
        pt: [
          'Fornecer a biometria para a boravišna dozvola',
          'Impressões digitais e fotografia recolhidas na administração policial; o cartão de residência é produzido depois e levantado presencialmente.',
        ],
        es: [
          'Aportar la biometría para la boravišna dozvola',
          'Huellas y fotografía tomadas en la administración policial; la tarjeta de residencia se produce después y se recoge en persona.',
        ],
      },
      {
        en: [
          'Arrange care outside the public health fund',
          'Nomads are not enrolled in the state health fund through this permit, so treatment is covered by the private policy or paid directly.',
        ],
        pt: [
          'Organizar o atendimento fora do fundo público de saúde',
          'Os nómadas não são inscritos no fundo estatal de saúde por esta autorização, por isso o tratamento é coberto pela apólice privada ou pago diretamente.',
        ],
        es: [
          'Organizar la atención fuera del fondo público de salud',
          'Los nómadas no se inscriben en el fondo estatal de salud con este permiso, así que el tratamiento lo cubre la póliza privada o se paga directamente.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Register your address at the police after arrival',
          'The registration of residence has a short deadline counted from entry, and the residence card is not issued until it is done.',
        ],
        pt: [
          'Registar a morada na polícia após a chegada',
          'O registo de residência tem um prazo curto contado desde a entrada, e o cartão de residência não é emitido enquanto não for feito.',
        ],
        es: [
          'Registrar el domicilio en la policía tras la llegada',
          'El registro de residencia tiene un plazo breve contado desde la entrada, y la tarjeta de residencia no se emite hasta hacerlo.',
        ],
      },
      {
        en: [
          'Request an OIB from the tax administration',
          'The personal identification number is issued by the tax office, not by immigration, and without it you cannot open a bank account, sign a lease or take a phone contract.',
        ],
        pt: [
          'Pedir o OIB à administração fiscal',
          'O número de identificação pessoal é emitido pela repartição fiscal, e não pela imigração, e sem ele não se abre conta bancária, não se assina arrendamento nem se contrata telemóvel.',
        ],
        es: [
          'Solicitar el OIB a la administración tributaria',
          'El número de identificación personal lo emite la oficina tributaria, no inmigración, y sin él no puede abrir cuenta bancaria, firmar alquiler ni contratar teléfono.',
        ],
      },
      {
        en: [
          'Collect the biometric residence card',
          'Issued a few weeks after the biometrics; it is the document that proves your status to banks and landlords.',
        ],
        pt: [
          'Levantar o cartão biométrico de residência',
          'Emitido algumas semanas após a biometria; é o documento que prova o seu estatuto a bancos e senhorios.',
        ],
        es: [
          'Recoger la tarjeta biométrica de residencia',
          'Se emite unas semanas después de la biometría; es el documento que acredita su estatus ante bancos y arrendadores.',
        ],
      },
      {
        en: [
          'Use the income tax exemption knowingly',
          'Income from the foreign employer is exempt from Croatian income tax under this regime. That does not settle where you are tax resident overall, and your home country may still tax you.',
        ],
        pt: [
          'Usar a isenção de imposto de renda com consciência',
          'O rendimento vindo do empregador estrangeiro é isento de imposto de renda croata neste regime. Isso não define a sua residência fiscal global, e o seu país de origem pode continuar a tributá-lo.',
        ],
        es: [
          'Usar la exención del impuesto sobre la renta con criterio',
          'Los ingresos del empleador extranjero están exentos del impuesto croata bajo este régimen. Eso no define su residencia fiscal global, y su país de origen puede seguir gravándole.',
        ],
      },
      {
        en: [
          'Know that this permit does not build towards permanent stay',
          'Time spent as a digital nomad does not count towards permanent residence, and the permit cannot simply be rolled over. The maximum duration was changed by a recent amendment to the Aliens Act, so confirm the current cap and the waiting period before reapplying.',
        ],
        pt: [
          'Saber que esta autorização não conta para a residência permanente',
          'O tempo passado como nómada digital não conta para a residência permanente, e a autorização não pode ser simplesmente renovada em seguida. A duração máxima mudou com uma alteração recente à Lei dos Estrangeiros, por isso confirme o teto atual e o período de espera antes de novo pedido.',
        ],
        es: [
          'Saber que este permiso no computa para la residencia permanente',
          'El tiempo como nómada digital no cuenta para la residencia permanente, y el permiso no puede simplemente encadenarse. La duración máxima cambió con una reforma reciente de la Ley de Extranjería, así que confirme el tope actual y el plazo de espera antes de volver a solicitar.',
        ],
      },
      {
        en: [
          'Apply separately for accompanying family members',
          'Spouses and children have their own applications tied to yours, with their own documents and fees; they are not added automatically.',
        ],
        pt: [
          'Pedir separadamente para os familiares acompanhantes',
          'Cônjuge e filhos têm pedidos próprios ligados ao seu, com documentos e taxas próprios; não são incluídos automaticamente.',
        ],
        es: [
          'Solicitar por separado para los familiares acompañantes',
          'El cónyuge y los hijos tienen solicitudes propias vinculadas a la suya, con sus documentos y tasas; no se añaden automáticamente.',
        ],
        priority: 2,
      },
    ],
  },

  'Temporary Stay for Work': {
    core_documents: [
      {
        en: [
          'Employment contract with a Croatian employer',
          'Signed by both parties, stating the post, the salary and the duration; the permit is granted for that job with that company.',
        ],
        pt: [
          'Contrato de trabalho com empregador croata',
          'Assinado por ambas as partes, indicando o cargo, o salário e a duração; a autorização é concedida para aquela vaga naquela empresa.',
        ],
        es: [
          'Contrato de trabajo con un empleador croata',
          'Firmado por ambas partes, con el puesto, el salario y la duración; el permiso se concede para ese empleo en esa empresa.',
        ],
      },
      {
        en: [
          'Passport valid for the permit requested',
          'Valid at least three months longer than the stay applied for, with a copy of the data page for the file.',
        ],
        pt: [
          'Passaporte válido para a autorização pedida',
          'Válido pelo menos três meses além da estada solicitada, com cópia da página de dados para o processo.',
        ],
        es: [
          'Pasaporte vigente para el permiso solicitado',
          'Vigente al menos tres meses más que la estancia solicitada, con copia de la página de datos para el expediente.',
        ],
      },
      {
        en: [
          'Single application for stay and work',
          'Croatia merged the residence and work authorisations into one procedure. The employer normally lodges it, and their documents are part of the file.',
        ],
        pt: [
          'Pedido único de residência e trabalho',
          'A Croácia fundiu as autorizações de residência e trabalho num só procedimento. Normalmente é o empregador que o entrega, e os documentos dele fazem parte do processo.',
        ],
        es: [
          'Solicitud única de estancia y trabajo',
          'Croacia fusionó las autorizaciones de residencia y trabajo en un solo trámite. Suele presentarlo el empleador, y sus documentos forman parte del expediente.',
        ],
      },
      {
        en: [
          'Labour market test opinion from the employment service',
          'The employer must advertise the post and obtain the opinion of the Croatian Employment Service before you can be hired, unless the occupation is on the exempt list.',
        ],
        pt: [
          'Parecer de teste de mercado do serviço de emprego',
          'O empregador tem de anunciar a vaga e obter o parecer do serviço croata de emprego antes de o contratar, salvo se a ocupação estiver na lista de isenções.',
        ],
        es: [
          'Dictamen de prueba de mercado del servicio de empleo',
          'El empleador debe publicar la vacante y obtener el dictamen del servicio croata de empleo antes de contratarle, salvo que la ocupación esté en la lista de exenciones.',
        ],
      },
      {
        en: [
          'Criminal record certificate, apostilled and translated',
          'From your country of origin and any country of recent residence, translated by a permanent court interpreter.',
        ],
        pt: [
          'Certificado criminal com apostila e tradução',
          'Do país de origem e de qualquer país de residência recente, traduzido por intérprete judicial permanente.',
        ],
        es: [
          'Certificado de antecedentes con apostilla y traducción',
          'Del país de origen y de cualquier país de residencia reciente, traducido por intérprete judicial permanente.',
        ],
      },
      {
        en: [
          'Evidence of accommodation for the worker',
          'The address where you will live must be documented; employers who house staff have to provide proof of the premises.',
        ],
        pt: [
          'Comprovativo de alojamento do trabalhador',
          'A morada onde vai viver tem de ser documentada; empregadores que alojam pessoal têm de apresentar prova das instalações.',
        ],
        es: [
          'Comprobante de alojamiento del trabajador',
          'La dirección donde vivirá debe documentarse; los empleadores que alojan a su personal deben aportar prueba del inmueble.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Diploma with Croatian recognition where required',
          'Foreign qualifications go through the national recognition body, and for regulated professions the recognition is a precondition of the permit, not a formality afterwards.',
        ],
        pt: [
          'Diploma com reconhecimento croata quando exigido',
          'As habilitações estrangeiras passam pelo organismo nacional de reconhecimento, e nas profissões regulamentadas o reconhecimento é pré-requisito da autorização, não uma formalidade posterior.',
        ],
        es: [
          'Título con reconocimiento croata cuando se exija',
          'Las titulaciones extranjeras pasan por el organismo nacional de reconocimiento, y en profesiones reguladas el reconocimiento es requisito previo del permiso, no un trámite posterior.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Croatian language for regulated occupations',
          'Healthcare, teaching and legal roles require the language at a working level before the professional chamber will register you.',
        ],
        pt: [
          'Croata para ocupações regulamentadas',
          'Funções na saúde, no ensino e no direito exigem o idioma em nível de trabalho antes de a ordem profissional o inscrever.',
        ],
        es: [
          'Croata para ocupaciones reguladas',
          'Los puestos sanitarios, docentes y jurídicos exigen el idioma a nivel de trabajo antes de que el colegio profesional le inscriba.',
        ],
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Salary at the level applicable to the post',
          'It must match the collective agreement for the sector or, failing that, the usual pay for the occupation in Croatia. Undercutting it blocks the permit.',
        ],
        pt: [
          'Salário no nível aplicável ao cargo',
          'Tem de corresponder ao acordo coletivo do setor ou, na falta dele, à remuneração usual da ocupação na Croácia. Pagar abaixo bloqueia a autorização.',
        ],
        es: [
          'Salario en el nivel aplicable al puesto',
          'Debe corresponder al convenio colectivo del sector o, en su defecto, a la retribución habitual de la ocupación en Croacia. Pagar por debajo bloquea el permiso.',
        ],
      },
      {
        en: [
          'Health cover until the state fund registration takes effect',
          'Enrolment in the health fund starts with the first payroll; private cover has to bridge the gap between arrival and that date.',
        ],
        pt: [
          'Cobertura de saúde até o registo no fundo estatal produzir efeito',
          'A inscrição no fundo de saúde começa com o primeiro processamento salarial; a cobertura privada tem de preencher o intervalo entre a chegada e essa data.',
        ],
        es: [
          'Cobertura sanitaria hasta que surta efecto el alta en el fondo estatal',
          'La inscripción en el fondo de salud empieza con la primera nómina; el seguro privado debe cubrir el intervalo entre la llegada y esa fecha.',
        ],
      },
      {
        en: [
          'Pay the fees for the permit and the card',
          'The state fee for the decision plus the cost of the biometric card, both in euro.',
        ],
        pt: [
          'Pagar as taxas da autorização e do cartão',
          'A taxa estatal da decisão mais o custo do cartão biométrico, ambos em euros.',
        ],
        es: [
          'Pagar las tasas del permiso y de la tarjeta',
          'La tasa estatal de la resolución más el coste de la tarjeta biométrica, ambos en euros.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'The employer files with the police administration',
          'Filing happens at the police administration covering the workplace, or at a Croatian consulate if you are applying from abroad.',
        ],
        pt: [
          'O empregador protocola na administração policial',
          'A entrega é feita na administração policial da área do local de trabalho, ou num consulado croata se pedir a partir do exterior.',
        ],
        es: [
          'El empleador presenta ante la administración policial',
          'La presentación se hace en la administración policial del lugar de trabajo, o en un consulado croata si solicita desde el extranjero.',
        ],
      },
      {
        en: [
          'Use a licensed intermediary when recruiting from abroad',
          'Recent amendments to the Aliens Act oblige employers to work through licensed recruitment agencies for third-country hires and set deadlines for the worker to actually arrive.',
        ],
        pt: [
          'Usar intermediário licenciado ao recrutar no exterior',
          'Alterações recentes à Lei dos Estrangeiros obrigam os empregadores a trabalhar com agências de recrutamento licenciadas para contratações de países terceiros e fixam prazos para a chegada efetiva do trabalhador.',
        ],
        es: [
          'Usar un intermediario autorizado al reclutar en el extranjero',
          'Reformas recientes de la Ley de Extranjería obligan a los empleadores a trabajar con agencias de contratación autorizadas para trabajadores de terceros países y fijan plazos para la llegada efectiva.',
        ],
      },
      {
        en: [
          'Enter Croatia within the deadline after approval',
          'The authorisation lapses if you do not travel and start the job within the period set in the decision; the employer loses the labour market opinion too.',
        ],
        pt: [
          'Entrar na Croácia dentro do prazo após a aprovação',
          'A autorização caduca se não viajar e iniciar o trabalho no período fixado na decisão; o empregador perde também o parecer de mercado.',
        ],
        es: [
          'Entrar en Croacia dentro del plazo tras la aprobación',
          'La autorización caduca si no viaja y empieza el trabajo en el periodo fijado en la resolución; el empleador pierde además el dictamen de mercado.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometrics for the stay and work card',
          'Taken at the police administration after arrival, together with the address registration.',
        ],
        pt: [
          'Biometria para o cartão de residência e trabalho',
          'Recolhida na administração policial após a chegada, junto com o registo de morada.',
        ],
        es: [
          'Biometría para la tarjeta de estancia y trabajo',
          'Se toma en la administración policial tras la llegada, junto con el registro de domicilio.',
        ],
      },
      {
        en: [
          'Occupational medical certificate where the job demands it',
          'Food handling, healthcare, construction and driving roles require a fitness certificate from an authorised occupational medicine clinic.',
        ],
        pt: [
          'Atestado de medicina do trabalho quando a função exigir',
          'Funções em alimentação, saúde, construção e condução exigem atestado de aptidão de uma clínica autorizada de medicina do trabalho.',
        ],
        es: [
          'Certificado de medicina laboral cuando el puesto lo exija',
          'Los puestos de manipulación de alimentos, sanidad, construcción y conducción exigen un certificado de aptitud de una clínica autorizada de medicina laboral.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Register your residence within days of arriving',
          'The deadline to report your address to the police is counted in days, not weeks, and missing it is a fineable offence.',
        ],
        pt: [
          'Registar a residência poucos dias após a chegada',
          'O prazo para comunicar a morada à polícia conta-se em dias, não em semanas, e falhá-lo é infração sujeita a multa.',
        ],
        es: [
          'Registrar la residencia a los pocos días de llegar',
          'El plazo para comunicar el domicilio a la policía se cuenta en días, no en semanas, y incumplirlo es una infracción sancionable.',
        ],
      },
      {
        en: [
          'Obtain your OIB and open a bank account',
          'The tax administration issues the number; without it the employer cannot register you properly and the salary cannot be paid.',
        ],
        pt: [
          'Obter o seu OIB e abrir conta bancária',
          'A administração fiscal emite o número; sem ele o empregador não consegue registá-lo corretamente e o salário não pode ser pago.',
        ],
        es: [
          'Obtener su OIB y abrir una cuenta bancaria',
          'La administración tributaria emite el número; sin él el empleador no puede darle de alta correctamente y el salario no puede pagarse.',
        ],
      },
      {
        en: [
          'Get registered with the health insurance fund',
          'The employer files it, but check that it happened: your medical card depends on it and errors surface only when you need care.',
        ],
        pt: [
          'Ficar inscrito no fundo de seguro de saúde',
          'O empregador trata disso, mas confirme que aconteceu: o seu cartão médico depende disso e os erros só aparecem quando precisa de cuidados.',
        ],
        es: [
          'Quedar inscrito en el fondo de seguro de salud',
          'El empleador lo tramita, pero compruebe que se hizo: su tarjeta sanitaria depende de ello y los errores solo aparecen cuando necesita atención.',
        ],
      },
      {
        en: [
          'Apply again if you change employer or role',
          'The permit is tied to the specific employer and post; starting with a new company before a new permit is granted makes the stay unlawful.',
        ],
        pt: [
          'Pedir de novo se mudar de empregador ou função',
          'A autorização está ligada ao empregador e ao cargo específicos; começar noutra empresa antes de nova autorização torna a permanência ilegal.',
        ],
        es: [
          'Solicitar de nuevo si cambia de empleador o de puesto',
          'El permiso está ligado al empleador y al puesto concretos; empezar en otra empresa antes de tener uno nuevo hace ilegal la estancia.',
        ],
      },
      {
        en: [
          'Renew well before the card expires',
          'Extensions are filed at least sixty days ahead. Letting it lapse breaks the continuity that permanent residence later depends on.',
        ],
        pt: [
          'Renovar bem antes de o cartão expirar',
          'As prorrogações são pedidas com pelo menos sessenta dias de antecedência. Deixar caducar quebra a continuidade de que a residência permanente depende depois.',
        ],
        es: [
          'Renovar bastante antes de que caduque la tarjeta',
          'Las prórrogas se presentan con al menos sesenta días de antelación. Dejarlo caducar rompe la continuidad de la que después depende la residencia permanente.',
        ],
      },
    ],
  },

  'Permanent Residence': {
    core_documents: [
      {
        en: [
          'Application for permanent stay',
          'Filed at the police administration where you are registered, in person, while your temporary permit is still valid.',
        ],
        pt: [
          'Pedido de residência permanente',
          'Entregue presencialmente na administração policial onde está registado, enquanto a sua autorização temporária ainda é válida.',
        ],
        es: [
          'Solicitud de estancia permanente',
          'Se presenta en persona en la administración policial donde está registrado, mientras su permiso temporal siga vigente.',
        ],
      },
      {
        en: [
          'Valid passport and current residence card',
          'Both must be in force on the day of the application; an expired card alone can stop the file being accepted.',
        ],
        pt: [
          'Passaporte válido e cartão de residência atual',
          'Ambos têm de estar em vigor no dia do pedido; só um cartão expirado já impede a aceitação do processo.',
        ],
        es: [
          'Pasaporte vigente y tarjeta de residencia actual',
          'Ambos deben estar en vigor el día de la solicitud; una tarjeta caducada basta para que no acepten el expediente.',
        ],
      },
      {
        en: [
          'Evidence of five years of continuous lawful stay',
          'Absences are capped both per trip and in total. Time as a digital nomad does not count at all, and student stay counts only in part.',
        ],
        pt: [
          'Prova de cinco anos de permanência legal contínua',
          'As ausências têm limite por viagem e no total. O tempo como nómada digital não conta de todo, e a estada de estudante conta apenas em parte.',
        ],
        es: [
          'Prueba de cinco años de estancia legal continua',
          'Las ausencias tienen tope por viaje y en total. El tiempo como nómada digital no computa en absoluto, y la estancia de estudiante solo cuenta en parte.',
        ],
      },
      {
        en: [
          'Registered address throughout the qualifying period',
          'The police check the registration history, not just where you live now; gaps in the record are read as gaps in residence.',
        ],
        pt: [
          'Morada registada durante todo o período qualificante',
          'A polícia consulta o histórico de registo, e não apenas onde vive agora; lacunas no registo são lidas como lacunas de residência.',
        ],
        es: [
          'Domicilio registrado durante todo el periodo cualificante',
          'La policía consulta el historial de registro, no solo dónde vive ahora; los huecos en el registro se leen como huecos de residencia.',
        ],
      },
      {
        en: [
          'Criminal record from Croatia and from your country of origin',
          'Both are required, and the foreign one must be recent, apostilled and translated by a court interpreter.',
        ],
        pt: [
          'Registo criminal croata e do país de origem',
          'Ambos são exigidos, e o estrangeiro tem de ser recente, com apostila e tradução de intérprete judicial.',
        ],
        es: [
          'Antecedentes penales de Croacia y de su país de origen',
          'Se exigen ambos, y el extranjero debe ser reciente, apostillado y traducido por intérprete judicial.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Pass the Croatian language, culture and society exam',
          'It covers the language, the Latin script and the social and constitutional order. Preparation takes months and this is usually what sets the date of the whole application. Those who completed schooling in Croatia are exempt.',
        ],
        pt: [
          'Ser aprovado no exame de língua, cultura e sociedade croatas',
          'Abrange a língua, o alfabeto latino e a ordem social e constitucional. A preparação leva meses e é normalmente isto que define a data de todo o pedido. Quem estudou na Croácia está isento.',
        ],
        es: [
          'Aprobar el examen de lengua, cultura y sociedad croatas',
          'Abarca el idioma, el alfabeto latino y el orden social y constitucional. La preparación lleva meses y suele ser lo que marca la fecha de toda la solicitud. Quien cursó estudios en Croacia está exento.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Stable and regular means of subsistence',
          'Employment income, business income or a pension, documented across the qualifying years rather than only at the moment of applying.',
        ],
        pt: [
          'Meios de subsistência estáveis e regulares',
          'Rendimento de trabalho, de empresa ou pensão, documentado ao longo dos anos qualificantes e não apenas no momento do pedido.',
        ],
        es: [
          'Medios de subsistencia estables y regulares',
          'Ingresos del trabajo, de la empresa o una pensión, documentados a lo largo de los años cualificantes y no solo al solicitar.',
        ],
      },
      {
        en: [
          'Proof of health insurance coverage',
          'Enrolment in the health fund or an equivalent policy, in force and without interruptions during the period assessed.',
        ],
        pt: [
          'Comprovativo de cobertura de seguro de saúde',
          'Inscrição no fundo de saúde ou apólice equivalente, em vigor e sem interrupções no período avaliado.',
        ],
        es: [
          'Comprobante de cobertura de seguro de salud',
          'Alta en el fondo de salud o póliza equivalente, vigente y sin interrupciones durante el periodo evaluado.',
        ],
      },
      {
        en: [
          'Certificate of no outstanding tax debt',
          'Issued by the tax administration. Unpaid contributions from a period of self-employment are the usual surprise here.',
        ],
        pt: [
          'Certidão de inexistência de dívida fiscal',
          'Emitida pela administração fiscal. Contribuições em atraso de um período como autónomo são a surpresa habitual aqui.',
        ],
        es: [
          'Certificado de no tener deuda tributaria',
          'Emitido por la administración tributaria. Las cotizaciones impagadas de una etapa como autónomo son la sorpresa habitual.',
        ],
      },
      {
        en: [
          'Pay the fee for the decision and the new card',
          'Two separate charges, the second collected when the permanent residence card is issued.',
        ],
        pt: [
          'Pagar a taxa da decisão e do novo cartão',
          'São duas cobranças separadas, a segunda no momento da emissão do cartão de residência permanente.',
        ],
        es: [
          'Pagar la tasa de la resolución y la de la nueva tarjeta',
          'Son dos cobros separados, el segundo al emitirse la tarjeta de residencia permanente.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File before the temporary permit runs out',
          'Applying after it expires breaks the continuity the whole application rests on, and the five years start again.',
        ],
        pt: [
          'Entregar antes de a autorização temporária terminar',
          'Pedir depois de expirar quebra a continuidade em que todo o pedido se apoia, e os cinco anos recomeçam.',
        ],
        es: [
          'Presentar antes de que se agote el permiso temporal',
          'Solicitar tras su caducidad rompe la continuidad en que se apoya toda la solicitud, y los cinco años empiezan de nuevo.',
        ],
      },
      {
        en: [
          'Submit certified translations of every foreign document',
          'Only a permanent court interpreter can produce them, and translations older than the certificate they accompany are refused.',
        ],
        pt: [
          'Apresentar tradução certificada de cada documento estrangeiro',
          'Só um intérprete judicial permanente as pode produzir, e traduções mais antigas do que a certidão que acompanham são recusadas.',
        ],
        es: [
          'Aportar traducción certificada de cada documento extranjero',
          'Solo un intérprete judicial permanente puede hacerlas, y se rechazan las traducciones más antiguas que el certificado al que acompañan.',
        ],
      },
      {
        en: [
          'Be ready for additional evidence to be requested',
          'The police may ask for payslips, travel history or an interview to test the continuity of your life in Croatia.',
        ],
        pt: [
          'Estar preparado para pedidos de prova adicional',
          'A polícia pode pedir recibos de vencimento, histórico de viagens ou uma entrevista para testar a continuidade da sua vida na Croácia.',
        ],
        es: [
          'Estar preparado para que pidan pruebas adicionales',
          'La policía puede pedir nóminas, historial de viajes o una entrevista para comprobar la continuidad de su vida en Croacia.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometrics for the permanent residence card',
          'A new set of fingerprints and a photograph are taken when the decision is positive.',
        ],
        pt: [
          'Biometria para o cartão de residência permanente',
          'Novas impressões digitais e fotografia são recolhidas quando a decisão é favorável.',
        ],
        es: [
          'Biometría para la tarjeta de residencia permanente',
          'Se toman huellas y fotografía nuevas cuando la resolución es favorable.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the card and note its renewal cycle',
          'The status is permanent but the card is not: it is reissued every few years, and letting it expire causes practical problems with banks and employers.',
        ],
        pt: [
          'Levantar o cartão e observar o ciclo de renovação',
          'O estatuto é permanente, mas o cartão não: é reemitido de poucos em poucos anos, e deixá-lo caducar cria problemas práticos com bancos e empregadores.',
        ],
        es: [
          'Recoger la tarjeta y anotar su ciclo de renovación',
          'El estatus es permanente, pero la tarjeta no: se reexpide cada pocos años, y dejarla caducar crea problemas prácticos con bancos y empleadores.',
        ],
      },
      {
        en: [
          'Avoid losing the status through long absence',
          'A continuous absence beyond the statutory limit ends permanent stay. If a long posting abroad is coming, ask about it before you leave, not after.',
        ],
        pt: [
          'Evitar perder o estatuto por ausência prolongada',
          'Uma ausência contínua acima do limite legal extingue a residência permanente. Se vem aí uma missão longa no exterior, pergunte antes de partir, não depois.',
        ],
        es: [
          'Evitar perder el estatus por ausencia prolongada',
          'Una ausencia continua por encima del límite legal extingue la residencia permanente. Si viene un destino largo fuera, consúltelo antes de irse, no después.',
        ],
      },
      {
        en: [
          'Ask explicitly about EU long-term resident status',
          'It rests on similar conditions but adds the right to move to another member state. It is granted on request, so it can be missed by simply not asking.',
        ],
        pt: [
          'Perguntar expressamente pelo estatuto de residente de longa duração UE',
          'Assenta em condições semelhantes, mas acrescenta o direito de se mudar para outro Estado-membro. É concedido a pedido, por isso perde-se por simplesmente não o pedir.',
        ],
        es: [
          'Preguntar expresamente por el estatuto de residente de larga duración UE',
          'Se apoya en condiciones parecidas, pero añade el derecho a trasladarse a otro Estado miembro. Se concede a petición, así que se pierde por no pedirlo.',
        ],
      },
      {
        en: [
          'Treat naturalisation as a separate, longer path',
          'Croatian citizenship requires more years, a further examination and, in most cases, releasing your previous citizenship. Permanent residence does not lead into it automatically.',
        ],
        pt: [
          'Tratar a naturalização como caminho separado e mais longo',
          'A cidadania croata exige mais anos, outro exame e, na maioria dos casos, a renúncia à cidadania anterior. A residência permanente não conduz a ela automaticamente.',
        ],
        es: [
          'Tratar la naturalización como una vía aparte y más larga',
          'La ciudadanía croata exige más años, otro examen y, en la mayoría de los casos, renunciar a la nacionalidad anterior. La residencia permanente no lleva a ella automáticamente.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
