import type { CountryVisaSteps } from './types';

/**
 * Steps for Costa Rica.
 *
 * The cost people forget is the Caja. Every resident must affiliate to the
 * social security system and pay a monthly contribution calculated on declared
 * income — it is a condition of the residence, not an optional health plan, and
 * it is checked at every renewal. Budgets built only around the income
 * threshold miss it.
 *
 * The digital nomad route is the exception to most of this: it is not a
 * residence, so it carries no Caja obligation and no path to permanence.
 */
export const costaRica: CountryVisaSteps = {
  'Tourist Entry': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Valid for at least one day beyond the intended stay for many nationalities, but airlines often apply a stricter rule — check both.',
        ],
        pt: [
          'Passaporte válido',
          'Válido por pelo menos um dia além da estada pretendida para muitas nacionalidades, mas as companhias aéreas costumam aplicar regra mais rígida — confira as duas.',
        ],
        es: [
          'Pasaporte vigente',
          'Vigente al menos un día más allá de la estancia prevista para muchas nacionalidades, pero las aerolíneas suelen aplicar una regla más estricta: compruebe ambas.',
        ],
      },
      {
        en: [
          'Return or onward ticket',
          'Enforced strictly, and airlines check it at boarding as well as migration at the border.',
        ],
        pt: [
          'Bilhete de volta ou de continuação',
          'Cobrado com rigor, e as companhias conferem no embarque além da migração na fronteira.',
        ],
        es: [
          'Billete de vuelta o de continuación',
          'Se exige con rigor, y las aerolíneas lo comprueban al embarcar además de migración en la frontera.',
        ],
      },
      {
        en: [
          'Proof of accommodation',
          'A booking, or the address of whoever is hosting you.',
        ],
        pt: [
          'Comprovação de alojamento',
          'Uma reserva, ou o endereço de quem vai hospedar você.',
        ],
        es: [
          'Comprobante de alojamiento',
          'Una reserva, o la dirección de quien le aloja.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of funds for the stay',
          'A minimum per month of intended stay; officers may ask to see it.',
        ],
        pt: [
          'Comprovação de recursos para a estada',
          'Um mínimo por mês de permanência pretendida; os oficiais podem pedir para ver.',
        ],
        es: [
          'Prueba de fondos para la estancia',
          'Un mínimo por mes de estancia prevista; los oficiales pueden pedir verlo.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'No advance application for visa-free nationalities',
          'Most of the Americas and Europe present themselves at the border.',
        ],
        pt: [
          'Sem pedido prévio para nacionalidades isentas',
          'A maior parte das Américas e da Europa se apresenta na fronteira.',
        ],
        es: [
          'Sin solicitud previa para nacionalidades exentas',
          'La mayor parte de América y Europa se presenta en la frontera.',
        ],
      },
      {
        en: [
          'Pay the exit tax when leaving',
          'Charged on departure and usually included in the airfare, but not always.',
        ],
        pt: [
          'Pagar a taxa de saída ao partir',
          'Cobrada na saída e normalmente incluída na passagem, mas nem sempre.',
        ],
        es: [
          'Pagar la tasa de salida al partir',
          'Se cobra a la salida y suele venir incluida en el billete, pero no siempre.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Migration registration at the border',
          'Entry and exit are recorded electronically.',
        ],
        pt: [
          'Registo migratório na fronteira',
          'Entrada e saída são registadas eletronicamente.',
        ],
        es: [
          'Registro migratorio en la frontera',
          'La entrada y la salida se registran electrónicamente.',
        ],
      },
      {
        en: [
          'Travel medical insurance',
          'Not compulsory for tourists, but public care is not free for them.',
        ],
        pt: [
          'Seguro médico de viagem',
          'Não é obrigatório para turistas, mas o atendimento público não é gratuito para eles.',
        ],
        es: [
          'Seguro médico de viaje',
          'No es obligatorio para turistas, pero la atención pública no es gratuita para ellos.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Note the days granted at the border',
          'Up to a maximum decided by the officer; assuming the full period is a common cause of overstay.',
        ],
        pt: [
          'Anotar os dias concedidos na fronteira',
          'Até um máximo decidido pelo oficial; supor o prazo cheio é causa comum de overstay.',
        ],
        es: [
          'Anotar los días concedidos en la frontera',
          'Hasta un máximo decidido por el oficial; suponer el plazo completo es causa común de sobreestadía.',
        ],
      },
      {
        en: [
          'Do not rely on border runs to reset the clock',
          'Leaving and returning to renew a tourist stay is increasingly refused, and repeated runs get flagged.',
        ],
        pt: [
          'Não contar com border runs para zerar o prazo',
          'Sair e voltar para renovar estada de turista é cada vez mais recusado, e saídas repetidas ficam marcadas.',
        ],
        es: [
          'No contar con border runs para reiniciar el plazo',
          'Salir y volver para renovar la estancia de turista se rechaza cada vez más, y las salidas repetidas quedan marcadas.',
        ],
      },
      {
        en: [
          'Do not work as a tourist',
          'Paid activity requires a residence with work authorisation.',
        ],
        pt: [
          'Não trabalhar como turista',
          'Atividade remunerada exige residência com autorização de trabalho.',
        ],
        es: [
          'No trabajar como turista',
          'La actividad remunerada exige una residencia con autorización de trabajo.',
        ],
      },
    ],
  },

  'Temporary Residence (Rentista / Inversionista)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Every page copied and authenticated; the original is shown at the appointment.',
        ],
        pt: [
          'Passaporte válido',
          'Todas as páginas copiadas e autenticadas; o original é apresentado no atendimento.',
        ],
        es: [
          'Pasaporte vigente',
          'Todas las páginas copiadas y autenticadas; el original se muestra en la cita.',
        ],
      },
      {
        en: [
          'Birth certificate, apostilled',
          'Issued within the last six months, apostilled, and translated by an official translator in Costa Rica.',
        ],
        pt: [
          'Certidão de nascimento apostilada',
          'Emitida nos últimos seis meses, apostilada, e traduzida por tradutor oficial na Costa Rica.',
        ],
        es: [
          'Partida de nacimiento apostillada',
          'Emitida en los últimos seis meses, apostillada, y traducida por traductor oficial en Costa Rica.',
        ],
      },
      {
        en: [
          'Criminal record certificate, apostilled',
          'From your country of residence for the last three years, also recent and translated.',
        ],
        pt: [
          'Certidão de antecedentes criminais apostilada',
          'Do país de residência nos últimos três anos, também recente e traduzida.',
        ],
        es: [
          'Certificado de antecedentes penales apostillado',
          'Del país de residencia en los últimos tres años, también reciente y traducido.',
        ],
      },
      {
        en: [
          'Registration with the consulate of your country',
          'Costa Rica asks for proof that you are registered with your own embassy or consulate there.',
        ],
        pt: [
          'Registo no consulado do seu país',
          'A Costa Rica pede comprovação de que você está registado na sua própria embaixada ou consulado lá.',
        ],
        es: [
          'Registro en el consulado de su país',
          'Costa Rica pide prueba de que está registrado en su propia embajada o consulado allí.',
        ],
      },
      {
        en: [
          'Fingerprint record from the judicial police',
          'Taken in Costa Rica at the OIJ, as part of the application.',
        ],
        pt: [
          'Registo de impressões digitais na polícia judiciária',
          'Feito na Costa Rica no OIJ, como parte do pedido.',
        ],
        es: [
          'Registro de huellas en la policía judicial',
          'Se hace en Costa Rica en el OIJ, como parte de la solicitud.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Guaranteed income for the rentista route',
          'A fixed monthly amount guaranteed for two years, evidenced by a bank letter or a deposit held in a Costa Rican bank.',
        ],
        pt: [
          'Renda garantida na rota rentista',
          'Um valor mensal fixo garantido por dois anos, comprovado por carta bancária ou depósito mantido em banco costarriquenho.',
        ],
        es: [
          'Ingreso garantizado en la vía rentista',
          'Un importe mensual fijo garantizado por dos años, acreditado con carta bancaria o un depósito en un banco costarricense.',
        ],
      },
      {
        en: [
          'Investment above the threshold for the inversionista route',
          'In real estate, a registered business or qualifying assets. Confirm the figure in force before committing.',
        ],
        pt: [
          'Investimento acima do piso na rota inversionista',
          'Em imóveis, empresa registada ou ativos qualificados. Confirme o valor vigente antes de se comprometer.',
        ],
        es: [
          'Inversión por encima del umbral en la vía inversionista',
          'En inmuebles, una empresa registrada o activos que califiquen. Confirme la cifra vigente antes de comprometerse.',
        ],
        required: false,
      },
      {
        en: [
          'Budget for the monthly Caja contribution',
          'Affiliation to the social security system is compulsory for residents and the contribution is calculated on declared income. It is a permanent cost, not a one-off.',
        ],
        pt: [
          'Prever a contribuição mensal à Caja',
          'A filiação à seguridade social é obrigatória para residentes e a contribuição é calculada sobre a renda declarada. É custo permanente, não pontual.',
        ],
        es: [
          'Presupuestar la cotización mensual a la Caja',
          'La afiliación a la seguridad social es obligatoria para residentes y la cotización se calcula sobre la renta declarada. Es un coste permanente, no puntual.',
        ],
      },
      {
        en: [
          'Pay the application and card fees',
          'Government charges, paid at a bank before filing.',
        ],
        pt: [
          'Pagar as taxas de solicitação e do cartão',
          'Cobranças governamentais, pagas em banco antes do protocolo.',
        ],
        es: [
          'Pagar las tasas de solicitud y de la tarjeta',
          'Cargos gubernamentales, pagados en un banco antes de presentar.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File with the migration directorate',
          'The application is made in Costa Rica, and it can be started while you are there on a tourist entry.',
        ],
        pt: [
          'Protocolar na direção de migração',
          'O pedido é feito na Costa Rica, e pode ser iniciado enquanto você está lá com entrada de turista.',
        ],
        es: [
          'Presentar ante la dirección de migración',
          'La solicitud se hace en Costa Rica, y puede iniciarse mientras está allí con entrada de turista.',
        ],
      },
      {
        en: [
          'Keep your tourist status valid while it is decided',
          'Decisions commonly take many months, and the receipt of filing does not by itself extend a tourist stay.',
        ],
        pt: [
          'Manter o status de turista válido enquanto é decidido',
          'As decisões costumam levar muitos meses, e o comprovante de protocolo não estende por si só a estada de turista.',
        ],
        es: [
          'Mantener vigente el estatus de turista mientras se resuelve',
          'Las decisiones suelen tardar muchos meses, y el resguardo de presentación no extiende por sí solo la estancia de turista.',
        ],
      },
      {
        en: [
          'Respond to any request within the deadline given',
          'Migration issues a formal notice and the file is archived if it is not answered.',
        ],
        pt: [
          'Responder a qualquer exigência dentro do prazo',
          'A migração emite notificação formal e o processo é arquivado se não for respondida.',
        ],
        es: [
          'Responder a cualquier requerimiento dentro del plazo',
          'Migración emite una notificación formal y el expediente se archiva si no se responde.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Affiliate to the Caja after approval',
          'Compulsory, and the residence card is not issued until the affiliation is done.',
        ],
        pt: [
          'Filiar-se à Caja após a aprovação',
          'Obrigatório, e o cartão de residência não é emitido enquanto a filiação não estiver feita.',
        ],
        es: [
          'Afiliarse a la Caja tras la aprobación',
          'Obligatorio, y la tarjeta de residencia no se emite hasta completar la afiliación.',
        ],
      },
      {
        en: [
          'Biometric registration for the DIMEX card',
          'Fingerprints and photograph taken when the card is issued.',
        ],
        pt: [
          'Registo biométrico para o cartão DIMEX',
          'Impressões digitais e fotografia recolhidas na emissão do cartão.',
        ],
        es: [
          'Registro biométrico para la tarjeta DIMEX',
          'Huellas y fotografía tomadas al emitir la tarjeta.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the DIMEX card',
          'The foreigner identity document, needed for banking, contracts and healthcare.',
        ],
        pt: [
          'Retirar o cartão DIMEX',
          'O documento de identidade de estrangeiro, necessário para banco, contratos e saúde.',
        ],
        es: [
          'Recoger la tarjeta DIMEX',
          'El documento de identidad de extranjero, necesario para banca, contratos y sanidad.',
        ],
      },
      {
        en: [
          'Keep the Caja contributions current',
          'Arrears block the renewal outright, and this is the most common reason a renewal stalls.',
        ],
        pt: [
          'Manter as contribuições à Caja em dia',
          'Atrasos bloqueiam a renovação de imediato, e é o motivo mais comum de uma renovação travar.',
        ],
        es: [
          'Mantener al día las cotizaciones a la Caja',
          'Los atrasos bloquean la renovación de plano, y es el motivo más común de que una renovación se atasque.',
        ],
      },
      {
        en: [
          'Note that the rentista status does not permit employment',
          'You may own and run a business and receive dividends, but not be an employee.',
        ],
        pt: [
          'Saber que o status rentista não permite emprego',
          'Você pode ter e gerir empresa e receber dividendos, mas não ser empregado.',
        ],
        es: [
          'Saber que el estatus rentista no permite empleo',
          'Puede tener y dirigir una empresa y recibir dividendos, pero no ser empleado.',
        ],
      },
      {
        en: [
          'Renew every two years',
          'With the income or investment still evidenced, and three years of temporary residence open the permanent stage.',
        ],
        pt: [
          'Renovar a cada dois anos',
          'Com a renda ou o investimento ainda comprovados, e três anos de residência temporária abrem a etapa permanente.',
        ],
        es: [
          'Renovar cada dos años',
          'Con los ingresos o la inversión aún acreditados, y tres años de residencia temporal abren la etapa permanente.',
        ],
        priority: 2,
      },
    ],
  },

  'Digital Nomad Visa': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Covering the twelve months the permit is granted for.',
        ],
        pt: [
          'Passaporte válido',
          'Cobrindo os doze meses para os quais a autorização é concedida.',
        ],
        es: [
          'Pasaporte vigente',
          'Que cubra los doce meses para los que se concede el permiso.',
        ],
      },
      {
        en: [
          'Online application on the migration platform',
          'Filed digitally, which makes this the lightest of the Costa Rican routes.',
        ],
        pt: [
          'Pedido online na plataforma de migração',
          'Protocolado digitalmente, o que torna esta a mais leve das rotas costarriquenhas.',
        ],
        es: [
          'Solicitud en línea en la plataforma de migración',
          'Se presenta digitalmente, lo que la convierte en la más ligera de las vías costarricenses.',
        ],
      },
      {
        en: [
          'Evidence that the work is remote and foreign',
          'An employment contract or client contracts with companies outside Costa Rica. Income from a Costa Rican source disqualifies you.',
        ],
        pt: [
          'Comprovação de que o trabalho é remoto e estrangeiro',
          'Contrato de trabalho ou contratos com clientes fora da Costa Rica. Renda de fonte costarriquenha desqualifica.',
        ],
        es: [
          'Prueba de que el trabajo es remoto y extranjero',
          'Contrato de trabajo o contratos con clientes fuera de Costa Rica. Los ingresos de fuente costarricense le descalifican.',
        ],
      },
      {
        en: [
          'Sworn statement of the remote activity',
          'Declaring the nature of the work and that it is performed for foreign clients or employers.',
        ],
        pt: [
          'Declaração juramentada da atividade remota',
          'Declarando a natureza do trabalho e que ele é prestado a clientes ou empregadores estrangeiros.',
        ],
        es: [
          'Declaración jurada de la actividad remota',
          'Declarando la naturaleza del trabajo y que se presta a clientes o empleadores extranjeros.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Monthly income above the threshold',
          'A fixed figure for a single applicant, higher if family members are included. Confirm the amounts in force.',
        ],
        pt: [
          'Renda mensal acima do piso',
          'Um valor fixo para requerente sozinho, maior se incluir familiares. Confirme os montantes vigentes.',
        ],
        es: [
          'Ingresos mensuales por encima del umbral',
          'Una cifra fija para el solicitante solo, mayor si incluye familiares. Confirme los importes vigentes.',
        ],
      },
      {
        en: [
          'Bank statements from the last twelve months',
          'Showing the income was sustained, not a single good month.',
        ],
        pt: [
          'Extratos bancários dos últimos doze meses',
          'Mostrando que a renda se sustentou, não um único mês bom.',
        ],
        es: [
          'Extractos bancarios de los últimos doce meses',
          'Que muestren que el ingreso se sostuvo, no un solo mes bueno.',
        ],
      },
      {
        en: [
          'Note the exemption from income tax on the foreign income',
          'The programme exempts the foreign-source income from Costa Rican income tax, which is a large part of its appeal.',
        ],
        pt: [
          'Observar a isenção de imposto sobre a renda estrangeira',
          'O programa isenta a renda de fonte estrangeira do imposto de renda costarriquenho, e isso é boa parte do seu atrativo.',
        ],
        es: [
          'Observar la exención del impuesto sobre la renta extranjera',
          'El programa exime la renta de fuente extranjera del impuesto sobre la renta costarricense, y eso es buena parte de su atractivo.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Pay the application fee online',
          'Charged when the application is submitted.',
        ],
        pt: [
          'Pagar a taxa de solicitação online',
          'Cobrada no momento do envio do pedido.',
        ],
        es: [
          'Pagar la tasa de solicitud en línea',
          'Se cobra al enviar la solicitud.',
        ],
      },
      {
        en: [
          'Enter within the period given after approval',
          'The permit is activated by entering the country, and the window is limited.',
        ],
        pt: [
          'Entrar dentro do prazo dado após a aprovação',
          'A autorização é ativada pela entrada no país, e a janela é limitada.',
        ],
        es: [
          'Entrar dentro del plazo dado tras la aprobación',
          'El permiso se activa al entrar en el país, y la ventana es limitada.',
        ],
      },
      {
        en: [
          'Request the extension before the first year ends',
          'The permit runs for a year and can be extended once, provided you spent enough time in the country.',
        ],
        pt: [
          'Pedir a prorrogação antes de terminar o primeiro ano',
          'A autorização vale um ano e pode ser prorrogada uma vez, desde que você tenha passado tempo suficiente no país.',
        ],
        es: [
          'Solicitar la prórroga antes de que acabe el primer año',
          'El permiso dura un año y puede prorrogarse una vez, siempre que haya pasado tiempo suficiente en el país.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Private health insurance for the whole period',
          'Compulsory for this route, and it replaces the Caja rather than adding to it.',
        ],
        pt: [
          'Seguro de saúde privado por todo o período',
          'Obrigatório nesta rota, e ele substitui a Caja em vez de somar a ela.',
        ],
        es: [
          'Seguro de salud privado por todo el periodo',
          'Obligatorio en esta vía, y sustituye a la Caja en lugar de sumarse a ella.',
        ],
      },
      {
        en: [
          'No Caja affiliation is required',
          'Because this is a stay permit and not a residence, the compulsory social security contribution does not apply.',
        ],
        pt: [
          'Não é exigida filiação à Caja',
          'Como isto é uma autorização de permanência e não uma residência, a contribuição obrigatória à seguridade social não se aplica.',
        ],
        es: [
          'No se exige afiliación a la Caja',
          'Como esto es un permiso de estancia y no una residencia, la cotización obligatoria a la seguridad social no aplica.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Get a DIMEX card for the permit',
          'It allows opening a bank account and driving on your home licence for the period.',
        ],
        pt: [
          'Obter o cartão DIMEX da autorização',
          'Ele permite abrir conta bancária e dirigir com a habilitação do seu país durante o período.',
        ],
        es: [
          'Obtener la tarjeta DIMEX del permiso',
          'Permite abrir cuenta bancaria y conducir con su licencia de origen durante el periodo.',
        ],
      },
      {
        en: [
          'Do not work for Costa Rican clients or employers',
          'The permit covers foreign-source income only; local work breaches it.',
        ],
        pt: [
          'Não trabalhar para clientes ou empregadores costarriquenhos',
          'A autorização cobre apenas renda de fonte estrangeira; trabalho local a viola.',
        ],
        es: [
          'No trabajar para clientes o empleadores costarricenses',
          'El permiso cubre solo renta de fuente extranjera; el trabajo local lo incumple.',
        ],
      },
      {
        en: [
          'Understand that this time does not build towards residence',
          'The digital nomad permit is not a residence and the period does not count towards permanent status.',
        ],
        pt: [
          'Entender que esse tempo não constrói caminho para a residência',
          'A autorização de nômade digital não é residência e o período não conta para o status permanente.',
        ],
        es: [
          'Entender que este tiempo no construye camino hacia la residencia',
          'El permiso de nómada digital no es una residencia y el periodo no cuenta para el estatus permanente.',
        ],
      },
      {
        en: [
          'Change to a residence route if you intend to settle',
          'The rentista or inversionista routes are the ones that lead somewhere permanent.',
        ],
        pt: [
          'Mudar para uma rota de residência se pretende se fixar',
          'As rotas rentista ou inversionista são as que levam a algo permanente.',
        ],
        es: [
          'Cambiar a una vía de residencia si piensa establecerse',
          'Las vías rentista o inversionista son las que llevan a algo permanente.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },

  'Permanent Residence': {
    core_documents: [
      {
        en: [
          'Valid passport and current DIMEX card',
          'Applied for from inside Costa Rica, holding a valid temporary residence.',
        ],
        pt: [
          'Passaporte válido e cartão DIMEX atual',
          'Pedida de dentro da Costa Rica, com residência temporária válida.',
        ],
        es: [
          'Pasaporte vigente y tarjeta DIMEX actual',
          'Se solicita desde dentro de Costa Rica, con residencia temporal vigente.',
        ],
      },
      {
        en: [
          'Evidence of three years of temporary residence',
          'Or a first-degree family tie to a Costa Rican, which grants permanent residence directly without the temporary stage.',
        ],
        pt: [
          'Comprovação de três anos de residência temporária',
          'Ou vínculo familiar de primeiro grau com costarriquenho, que dá residência permanente direto, sem etapa temporária.',
        ],
        es: [
          'Prueba de tres años de residencia temporal',
          'O un vínculo familiar de primer grado con un costarricense, que otorga residencia permanente directa, sin etapa temporal.',
        ],
      },
      {
        en: [
          'Updated criminal record certificates',
          'Costa Rican, and from your country of origin, both recent.',
        ],
        pt: [
          'Certidões de antecedentes criminais atualizadas',
          'Costarriquenha e do país de origem, ambas recentes.',
        ],
        es: [
          'Certificados de antecedentes penales actualizados',
          'Costarricense y del país de origen, ambos recientes.',
        ],
      },
      {
        en: [
          'Proof of the family tie for the direct route',
          'A Costa Rican child, spouse or parent, evidenced by the civil registry.',
        ],
        pt: [
          'Comprovação do vínculo familiar na rota direta',
          'Filho, cônjuge ou pai costarriquenho, comprovado pelo registo civil.',
        ],
        es: [
          'Prueba del vínculo familiar en la vía directa',
          'Un hijo, cónyuge o progenitor costarricense, acreditado por el registro civil.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Caja contributions up to date',
          'Arrears block the application outright; this is checked before anything else.',
        ],
        pt: [
          'Contribuições à Caja em dia',
          'Atrasos bloqueiam o pedido de imediato; isso é conferido antes de tudo.',
        ],
        es: [
          'Cotizaciones a la Caja al día',
          'Los atrasos bloquean la solicitud de plano; se comprueba antes que nada.',
        ],
      },
      {
        en: [
          'Evidence of means of living',
          'Income, business or investment covering the period of residence.',
        ],
        pt: [
          'Comprovação de meios de vida',
          'Renda, empresa ou investimento cobrindo o período de residência.',
        ],
        es: [
          'Prueba de medios de vida',
          'Ingresos, negocio o inversión que cubran el periodo de residencia.',
        ],
      },
      {
        en: [
          'Pay the application and card fees',
          'Government charges, paid at a bank before filing.',
        ],
        pt: [
          'Pagar as taxas de solicitação e do cartão',
          'Cobranças governamentais, pagas em banco antes do protocolo.',
        ],
        es: [
          'Pagar las tasas de solicitud y de la tarjeta',
          'Cargos gubernamentales, pagados en un banco antes de presentar.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File with the migration directorate',
          'Before the temporary residence expires, to keep the continuity intact.',
        ],
        pt: [
          'Protocolar na direção de migração',
          'Antes de a residência temporária vencer, para manter a continuidade intacta.',
        ],
        es: [
          'Presentar ante la dirección de migración',
          'Antes de que venza la residencia temporal, para mantener intacta la continuidad.',
        ],
      },
      {
        en: [
          'Expect a long decision period',
          'Permanent residence commonly takes many months; keep renewing the temporary status meanwhile.',
        ],
        pt: [
          'Contar com prazo longo de decisão',
          'A residência permanente costuma levar muitos meses; siga renovando o status temporário enquanto isso.',
        ],
        es: [
          'Contar con un plazo largo de decisión',
          'La residencia permanente suele tardar muchos meses; siga renovando el estatus temporal mientras tanto.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Continuous Caja affiliation',
          'Gaps in the contribution history count against the application.',
        ],
        pt: [
          'Filiação contínua à Caja',
          'Lacunas no histórico de contribuição pesam contra o pedido.',
        ],
        es: [
          'Afiliación continua a la Caja',
          'Los vacíos en el historial de cotización pesan en contra de la solicitud.',
        ],
      },
      {
        en: [
          'Biometric registration for the new card',
          'Fingerprints and photograph for the permanent DIMEX.',
        ],
        pt: [
          'Registo biométrico para o novo cartão',
          'Impressões digitais e fotografia para o DIMEX permanente.',
        ],
        es: [
          'Registro biométrico para la nueva tarjeta',
          'Huellas y fotografía para el DIMEX permanente.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the permanent DIMEX card',
          'Permanent residence carries free access to the labour market, unlike the rentista status.',
        ],
        pt: [
          'Retirar o cartão DIMEX permanente',
          'A residência permanente traz acesso livre ao mercado de trabalho, diferente do status rentista.',
        ],
        es: [
          'Recoger la tarjeta DIMEX permanente',
          'La residencia permanente da acceso libre al mercado laboral, a diferencia del estatus rentista.',
        ],
      },
      {
        en: [
          'Keep paying the Caja',
          'The obligation continues after permanent residence is granted.',
        ],
        pt: [
          'Continuar pagando a Caja',
          'A obrigação continua depois de concedida a residência permanente.',
        ],
        es: [
          'Seguir pagando la Caja',
          'La obligación continúa tras concederse la residencia permanente.',
        ],
      },
      {
        en: [
          'Renew the card periodically',
          'The status does not expire but the physical card does.',
        ],
        pt: [
          'Renovar o cartão periodicamente',
          'O status não vence, mas o cartão físico sim.',
        ],
        es: [
          'Renovar la tarjeta periódicamente',
          'El estatus no caduca, pero la tarjeta física sí.',
        ],
      },
      {
        en: [
          'Consider naturalisation after the qualifying period',
          'Seven years of residence as a rule, five for nationals of Spanish-speaking countries and for the spouse of a Costa Rican.',
        ],
        pt: [
          'Avaliar a naturalização após o período qualificado',
          'Sete anos de residência como regra, cinco para nacionais de países hispanofalantes e para cônjuge de costarriquenho.',
        ],
        es: [
          'Evaluar la naturalización tras el periodo cualificado',
          'Siete años de residencia como regla, cinco para nacionales de países hispanohablantes y para el cónyuge de un costarricense.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
