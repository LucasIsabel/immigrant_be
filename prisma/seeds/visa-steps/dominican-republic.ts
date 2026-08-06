import type { CountryVisaSteps } from './types';

/**
 * Steps for the Dominican Republic.
 *
 * The residence process has a shape worth knowing in advance: a residence visa
 * is obtained at a Dominican consulate abroad, and only then, within sixty days
 * of arriving, is the residence itself filed with the migration directorate.
 * Two stages, two institutions, and a deadline between them.
 *
 * The medical examination is done at migration's own facility in Santo Domingo,
 * not by your doctor at home — a certificate brought from abroad is not
 * accepted.
 *
 * Pensioners and people with steady foreign income have a much shorter path:
 * the special law grants permanent residence quickly and skips the ordinary
 * temporary stage entirely.
 */
export const dominicanRepublic: CountryVisaSteps = {
  'Tourist Entry': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Most of the Americas and Europe enter visa-free for tourism.',
        ],
        pt: [
          'Passaporte válido',
          'A maior parte das Américas e da Europa entra sem visto a turismo.',
        ],
        es: [
          'Pasaporte vigente',
          'La mayor parte de América y Europa entra sin visado a turismo.',
        ],
      },
      {
        en: [
          'Electronic entry and exit form',
          'Completed online before travelling; it replaced the paper forms and produces a QR code used at both ends.',
        ],
        pt: [
          'Formulário eletrônico de entrada e saída',
          'Preenchido online antes de viajar; substituiu os formulários em papel e gera um QR code usado nas duas pontas.',
        ],
        es: [
          'Formulario electrónico de entrada y salida',
          'Se completa en línea antes de viajar; sustituyó a los formularios en papel y genera un código QR usado en ambos extremos.',
        ],
      },
      {
        en: [
          'Return or onward ticket',
          'Checked at the border as evidence of a genuine visit.',
        ],
        pt: [
          'Bilhete de volta ou de continuação',
          'Conferido na fronteira como prova de visita genuína.',
        ],
        es: [
          'Billete de vuelta o de continuación',
          'Se comprueba en la frontera como prueba de una visita genuina.',
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
          'No published figure; officers assess it against the trip.',
        ],
        pt: [
          'Comprovação de recursos para a estada',
          'Não há valor publicado; os oficiais avaliam conforme a viagem.',
        ],
        es: [
          'Prueba de fondos para la estancia',
          'No hay cifra publicada; los oficiales la valoran según el viaje.',
        ],
      },
      {
        en: [
          'Tourist card fee',
          'Now included in the airfare on most flights rather than paid separately on arrival.',
        ],
        pt: [
          'Taxa do cartão de turista',
          'Hoje já incluída na passagem na maioria dos voos, em vez de paga à parte na chegada.',
        ],
        es: [
          'Tasa de la tarjeta de turista',
          'Hoy viene incluida en el billete en la mayoría de los vuelos, en lugar de pagarse aparte al llegar.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Complete the electronic form before flying',
          'Without the QR code you are held up at the airport on both entry and exit.',
        ],
        pt: [
          'Preencher o formulário eletrônico antes de voar',
          'Sem o QR code você é retido no aeroporto tanto na entrada quanto na saída.',
        ],
        es: [
          'Completar el formulario electrónico antes de volar',
          'Sin el código QR le retienen en el aeropuerto tanto a la entrada como a la salida.',
        ],
      },
      {
        en: [
          'Apply at the consulate if a visa is required',
          'Some nationalities need a tourist visa obtained in advance.',
        ],
        pt: [
          'Pedir no consulado se houver exigência de visto',
          'Algumas nacionalidades precisam de visto de turista obtido com antecedência.',
        ],
        es: [
          'Solicitar en el consulado si se exige visado',
          'Algunas nacionalidades necesitan un visado de turista obtenido con antelación.',
        ],
        required: false,
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
          'Not compulsory, but there is no public cover for visitors.',
        ],
        pt: [
          'Seguro médico de viagem',
          'Não é obrigatório, mas não há cobertura pública para visitantes.',
        ],
        es: [
          'Seguro médico de viaje',
          'No es obligatorio, pero no hay cobertura pública para visitantes.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Note the stay granted at the border',
          'Thirty days as a rule, and extending it is done by paying a surcharge on departure rather than at an office.',
        ],
        pt: [
          'Anotar o prazo concedido na fronteira',
          'Trinta dias como regra, e prorrogar é feito pagando um acréscimo na saída, não num escritório.',
        ],
        es: [
          'Anotar el plazo concedido en la frontera',
          'Treinta días como regla, y prorrogarlo se hace pagando un recargo a la salida, no en una oficina.',
        ],
      },
      {
        en: [
          'Pay the overstay surcharge on departure if you stayed longer',
          'It scales with how long you overstayed and is settled at the airport.',
        ],
        pt: [
          'Pagar o acréscimo por excesso de permanência na saída',
          'Ele aumenta conforme o tempo excedido e é acertado no aeroporto.',
        ],
        es: [
          'Pagar el recargo por exceso de estancia a la salida',
          'Aumenta según el tiempo excedido y se liquida en el aeropuerto.',
        ],
        priority: 2,
        required: false,
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
      {
        en: [
          'Note that residence starts at a consulate abroad',
          'A tourist entry cannot be converted from inside the country; the residence visa is obtained outside first.',
        ],
        pt: [
          'Saber que a residência começa num consulado no exterior',
          'A entrada de turista não pode ser convertida de dentro do país; o visto de residência é obtido fora antes.',
        ],
        es: [
          'Saber que la residencia empieza en un consulado en el exterior',
          'La entrada de turista no puede convertirse desde dentro del país; el visado de residencia se obtiene fuera primero.',
        ],
      },
    ],
  },

  'Pensionado / Rentista Residence': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Original plus copies of every page, for both the consular and the migration stage.',
        ],
        pt: [
          'Passaporte válido',
          'Original mais cópias de todas as páginas, para a etapa consular e a de migração.',
        ],
        es: [
          'Pasaporte vigente',
          'Original más copias de todas las páginas, para la etapa consular y la de migración.',
        ],
      },
      {
        en: [
          'Residence visa obtained at a Dominican consulate',
          'The process starts abroad; this visa is what allows you to file for residence after arriving.',
        ],
        pt: [
          'Visto de residência obtido num consulado dominicano',
          'O processo começa no exterior; esse visto é o que permite protocolar a residência depois de chegar.',
        ],
        es: [
          'Visado de residencia obtenido en un consulado dominicano',
          'El proceso empieza en el exterior; ese visado es lo que permite presentar la residencia tras llegar.',
        ],
      },
      {
        en: [
          'Certification of the pension or the steady income',
          'From the paying institution, apostilled and translated into Spanish by a court-authorised translator.',
        ],
        pt: [
          'Certificação da aposentadoria ou da renda estável',
          'Da instituição pagadora, apostilada e traduzida para o espanhol por tradutor judicial autorizado.',
        ],
        es: [
          'Certificación de la pensión o de la renta estable',
          'De la institución pagadora, apostillada y traducida al español por un traductor judicial autorizado.',
        ],
      },
      {
        en: [
          'Birth certificate and criminal record certificate',
          'Both apostilled, recent and translated.',
        ],
        pt: [
          'Certidão de nascimento e certidão de antecedentes criminais',
          'Ambas apostiladas, recentes e traduzidas.',
        ],
        es: [
          'Partida de nacimiento y certificado de antecedentes penales',
          'Ambos apostillados, recientes y traducidos.',
        ],
      },
      {
        en: [
          'Guarantee letter from a Dominican guarantor',
          'A citizen or resident who vouches for you, with a copy of their identity document.',
        ],
        pt: [
          'Carta de garantia de um fiador dominicano',
          'Um cidadão ou residente que responde por você, com cópia do documento de identidade dele.',
        ],
        es: [
          'Carta de garantía de un garante dominicano',
          'Un ciudadano o residente que responde por usted, con copia de su documento de identidad.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Monthly pension above the threshold',
          'A fixed monthly figure for the pensionado route, with an increment for each dependant. Confirm the amount in force.',
        ],
        pt: [
          'Aposentadoria mensal acima do piso',
          'Um valor mensal fixo na rota pensionado, com acréscimo por dependente. Confirme o montante vigente.',
        ],
        es: [
          'Pensión mensual por encima del umbral',
          'Un importe mensual fijo en la vía pensionado, con incremento por cada dependiente. Confirme el importe vigente.',
        ],
      },
      {
        en: [
          'Steady foreign income for the rentista route',
          'From investments, rentals or a business abroad, at a higher threshold than the pension route.',
        ],
        pt: [
          'Renda estrangeira estável na rota rentista',
          'De investimentos, aluguéis ou negócio no exterior, num piso mais alto que o da rota de aposentadoria.',
        ],
        es: [
          'Renta extranjera estable en la vía rentista',
          'De inversiones, alquileres o un negocio en el exterior, con un umbral más alto que la vía de pensión.',
        ],
        required: false,
      },
      {
        en: [
          'Bank statements evidencing the payments',
          'Showing the income actually arrives, not only that it was awarded.',
        ],
        pt: [
          'Extratos comprovando os pagamentos',
          'Mostrando que a renda de fato entra, não apenas que foi concedida.',
        ],
        es: [
          'Extractos que acrediten los pagos',
          'Que muestren que la renta efectivamente entra, no solo que fue concedida.',
        ],
      },
      {
        en: [
          'Note the tax and customs benefits',
          'The special law carries exemptions on importing household goods and a vehicle, and on some taxes. They are a substantial part of the route’s value.',
        ],
        pt: [
          'Observar os benefícios fiscais e aduaneiros',
          'A lei especial traz isenções na importação de bens domésticos e de um veículo, e em alguns tributos. São parte substancial do valor da rota.',
        ],
        es: [
          'Observar los beneficios fiscales y aduaneros',
          'La ley especial trae exenciones en la importación de enseres y de un vehículo, y en algunos impuestos. Son parte sustancial del valor de la vía.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Obtain the residence visa at the consulate first',
          'With the pension certification already apostilled and translated.',
        ],
        pt: [
          'Obter antes o visto de residência no consulado',
          'Com a certificação da aposentadoria já apostilada e traduzida.',
        ],
        es: [
          'Obtener antes el visado de residencia en el consulado',
          'Con la certificación de la pensión ya apostillada y traducida.',
        ],
      },
      {
        en: [
          'File with the migration directorate within sixty days of arrival',
          'This is the deadline between the two stages, and missing it means going back to the consulate.',
        ],
        pt: [
          'Protocolar na direção de migração em até sessenta dias da chegada',
          'É o prazo entre as duas etapas, e perdê-lo significa voltar ao consulado.',
        ],
        es: [
          'Presentar ante la dirección de migración en sesenta días desde la llegada',
          'Es el plazo entre las dos etapas, y perderlo implica volver al consulado.',
        ],
      },
      {
        en: [
          'Pay the migration fees',
          'Several separate charges: the visa, the residence application and the card.',
        ],
        pt: [
          'Pagar as taxas de migração',
          'Várias cobranças distintas: o visto, o pedido de residência e o cartão.',
        ],
        es: [
          'Pagar las tasas de migración',
          'Varios cargos distintos: el visado, la solicitud de residencia y la tarjeta.',
        ],
      },
      {
        en: [
          'Expect a much shorter decision than the ordinary route',
          'The special law sets a fast deadline, which is why pensioners use it rather than the general temporary residence.',
        ],
        pt: [
          'Contar com decisão bem mais rápida que na rota comum',
          'A lei especial fixa prazo curto, e é por isso que aposentados a usam em vez da residência temporária geral.',
        ],
        es: [
          'Contar con una decisión mucho más rápida que en la vía ordinaria',
          'La ley especial fija un plazo corto, y por eso los pensionados la usan en lugar de la residencia temporal general.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical examination at the migration facility',
          'Done in Santo Domingo at migration’s own laboratory. A certificate from your doctor abroad is not accepted.',
        ],
        pt: [
          'Exame médico na unidade da migração',
          'Feito em Santo Domingo no laboratório da própria migração. Certificado do seu médico no exterior não é aceite.',
        ],
        es: [
          'Examen médico en la unidad de migración',
          'Se hace en Santo Domingo en el laboratorio de la propia migración. Un certificado de su médico en el exterior no se acepta.',
        ],
      },
      {
        en: [
          'Biometric registration for the residence card',
          'Fingerprints and photograph taken at the same appointment.',
        ],
        pt: [
          'Registo biométrico para o cartão de residência',
          'Impressões digitais e fotografia recolhidas no mesmo atendimento.',
        ],
        es: [
          'Registro biométrico para la tarjeta de residencia',
          'Huellas y fotografía tomadas en la misma cita.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Receive permanent residence directly',
          'The special law skips the ordinary temporary stage, which is its main advantage.',
        ],
        pt: [
          'Receber residência permanente diretamente',
          'A lei especial pula a etapa temporária comum, e essa é a sua principal vantagem.',
        ],
        es: [
          'Recibir la residencia permanente directamente',
          'La ley especial se salta la etapa temporal ordinaria, y esa es su principal ventaja.',
        ],
      },
      {
        en: [
          'Get the cédula for foreigners',
          'The identity document needed for banking, contracts and utilities.',
        ],
        pt: [
          'Obter a cédula para estrangeiros',
          'O documento de identidade necessário para banco, contratos e serviços.',
        ],
        es: [
          'Obtener la cédula para extranjeros',
          'El documento de identidad necesario para banca, contratos y servicios.',
        ],
      },
      {
        en: [
          'Use the import exemptions within the period allowed',
          'The household goods and vehicle exemptions have a time window from the grant.',
        ],
        pt: [
          'Usar as isenções de importação dentro do prazo permitido',
          'As isenções de bens domésticos e de veículo têm janela de tempo a partir da concessão.',
        ],
        es: [
          'Usar las exenciones de importación dentro del plazo permitido',
          'Las exenciones de enseres y vehículo tienen una ventana de tiempo desde la concesión.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Renew the card periodically',
          'The residence is permanent but the card is renewed, and lapses complicate a later naturalisation.',
        ],
        pt: [
          'Renovar o cartão periodicamente',
          'A residência é permanente, mas o cartão é renovado, e lapsos complicam uma naturalização futura.',
        ],
        es: [
          'Renovar la tarjeta periódicamente',
          'La residencia es permanente, pero la tarjeta se renueva, y los lapsos complican una naturalización futura.',
        ],
      },
    ],
  },

  'Temporary Residence': {
    core_documents: [
      {
        en: [
          'Residence visa obtained at a Dominican consulate',
          'The ordinary route also starts abroad; you cannot convert a tourist entry from inside the country.',
        ],
        pt: [
          'Visto de residência obtido num consulado dominicano',
          'A rota comum também começa no exterior; não dá para converter uma entrada de turista de dentro do país.',
        ],
        es: [
          'Visado de residencia obtenido en un consulado dominicano',
          'La vía ordinaria también empieza en el exterior; no se puede convertir una entrada de turista desde dentro del país.',
        ],
      },
      {
        en: ['Valid passport', 'Original and copies of every page.'],
        pt: ['Passaporte válido', 'Original e cópias de todas as páginas.'],
        es: ['Pasaporte vigente', 'Original y copias de todas las páginas.'],
      },
      {
        en: [
          'Birth certificate, apostilled and translated',
          'Recent, apostilled, and translated by a court-authorised translator.',
        ],
        pt: [
          'Certidão de nascimento apostilada e traduzida',
          'Recente, apostilada, e traduzida por tradutor judicial autorizado.',
        ],
        es: [
          'Partida de nacimiento apostillada y traducida',
          'Reciente, apostillada, y traducida por un traductor judicial autorizado.',
        ],
      },
      {
        en: [
          'Criminal record certificate, apostilled',
          'From your country of residence, recent and translated.',
        ],
        pt: [
          'Certidão de antecedentes criminais apostilada',
          'Do país de residência, recente e traduzida.',
        ],
        es: [
          'Certificado de antecedentes penales apostillado',
          'Del país de residencia, reciente y traducido.',
        ],
      },
      {
        en: [
          'Document supporting the ground',
          'An employment contract with a Dominican company, an enrolment certificate, or evidence of the family tie.',
        ],
        pt: [
          'Documento que sustenta o fundamento',
          'Contrato de trabalho com empresa dominicana, certificado de matrícula, ou comprovação do vínculo familiar.',
        ],
        es: [
          'Documento que sustenta el fundamento',
          'Contrato de trabajo con una empresa dominicana, certificado de matrícula, o prueba del vínculo familiar.',
        ],
      },
      {
        en: [
          'Guarantee letter from a Dominican guarantor',
          'Required across the residence routes here.',
        ],
        pt: [
          'Carta de garantia de um fiador dominicano',
          'Exigida em todas as rotas de residência daqui.',
        ],
        es: [
          'Carta de garantía de un garante dominicano',
          'Exigida en todas las vías de residencia de aquí.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence of means of living',
          'A salary, a business or savings sufficient to support yourself.',
        ],
        pt: [
          'Comprovação de meios de vida',
          'Salário, empresa ou poupança suficientes para se sustentar.',
        ],
        es: [
          'Prueba de medios de vida',
          'Salario, negocio o ahorros suficientes para mantenerse.',
        ],
      },
      {
        en: [
          'Pay the visa, application and card fees',
          'Several separate charges across the two stages.',
        ],
        pt: [
          'Pagar as taxas de visto, de solicitação e do cartão',
          'Várias cobranças distintas ao longo das duas etapas.',
        ],
        es: [
          'Pagar las tasas de visado, de solicitud y de la tarjeta',
          'Varios cargos distintos a lo largo de las dos etapas.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File with the migration directorate within sixty days of arrival',
          'The same deadline as the special route; missing it voids the consular visa.',
        ],
        pt: [
          'Protocolar na direção de migração em até sessenta dias da chegada',
          'O mesmo prazo da rota especial; perdê-lo anula o visto consular.',
        ],
        es: [
          'Presentar ante la dirección de migración en sesenta días desde la llegada',
          'El mismo plazo que la vía especial; perderlo anula el visado consular.',
        ],
      },
      {
        en: [
          'Attend the appointment in Santo Domingo',
          'The medical examination and the biometrics are done there on the same day.',
        ],
        pt: [
          'Comparecer ao atendimento em Santo Domingo',
          'O exame médico e a biometria são feitos lá no mesmo dia.',
        ],
        es: [
          'Acudir a la cita en Santo Domingo',
          'El examen médico y la biometría se hacen allí el mismo día.',
        ],
      },
      {
        en: [
          'Expect a longer decision than the special law route',
          'The ordinary temporary residence takes months rather than weeks.',
        ],
        pt: [
          'Contar com decisão mais demorada que na rota da lei especial',
          'A residência temporária comum leva meses, não semanas.',
        ],
        es: [
          'Contar con una decisión más lenta que en la vía de la ley especial',
          'La residencia temporal ordinaria tarda meses, no semanas.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical examination at the migration facility',
          'Done locally at migration’s laboratory, not by a doctor abroad.',
        ],
        pt: [
          'Exame médico na unidade da migração',
          'Feito localmente no laboratório da migração, não por médico no exterior.',
        ],
        es: [
          'Examen médico en la unidad de migración',
          'Se hace localmente en el laboratorio de migración, no por un médico en el exterior.',
        ],
      },
      {
        en: [
          'Biometric registration for the residence card',
          'Fingerprints and photograph at the same appointment.',
        ],
        pt: [
          'Registo biométrico para o cartão de residência',
          'Impressões digitais e fotografia no mesmo atendimento.',
        ],
        es: [
          'Registro biométrico para la tarjeta de residencia',
          'Huellas y fotografía en la misma cita.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the temporary residence card',
          'Valid for one year and renewed annually.',
        ],
        pt: [
          'Retirar o cartão de residência temporária',
          'Válido por um ano e renovado anualmente.',
        ],
        es: [
          'Recoger la tarjeta de residencia temporal',
          'Válida un año y se renueva anualmente.',
        ],
      },
      {
        en: [
          'Get the cédula for foreigners',
          'Needed to open a bank account, sign contracts and be paid.',
        ],
        pt: [
          'Obter a cédula para estrangeiros',
          'Necessária para abrir conta, assinar contratos e receber salário.',
        ],
        es: [
          'Obtener la cédula para extranjeros',
          'Necesaria para abrir cuenta, firmar contratos y cobrar.',
        ],
      },
      {
        en: [
          'Renew every year without a gap',
          'Each renewal repeats the medical examination, and a lapse breaks the continuity permanent residence depends on.',
        ],
        pt: [
          'Renovar todo ano sem lacuna',
          'Cada renovação repete o exame médico, e um lapso quebra a continuidade de que depende a residência permanente.',
        ],
        es: [
          'Renovar cada año sin vacíos',
          'Cada renovación repite el examen médico, y un lapso rompe la continuidad de la que depende la residencia permanente.',
        ],
      },
      {
        en: [
          'Count the renewals towards permanent residence',
          'The ordinary route reaches the permanent stage after a set number of consecutive annual renewals.',
        ],
        pt: [
          'Contar as renovações para a residência permanente',
          'A rota comum chega à etapa permanente após um número determinado de renovações anuais consecutivas.',
        ],
        es: [
          'Contar las renovaciones para la residencia permanente',
          'La vía ordinaria llega a la etapa permanente tras un número determinado de renovaciones anuales consecutivas.',
        ],
        priority: 2,
      },
    ],
  },

  'Permanent Residence': {
    core_documents: [
      {
        en: [
          'Valid passport and current residence card',
          'Applied for from inside the country, holding a valid temporary residence.',
        ],
        pt: [
          'Passaporte válido e cartão de residência atual',
          'Pedida de dentro do país, com residência temporária válida.',
        ],
        es: [
          'Pasaporte vigente y tarjeta de residencia actual',
          'Se solicita desde dentro del país, con residencia temporal vigente.',
        ],
      },
      {
        en: [
          'Evidence of the consecutive annual renewals',
          'The chain of temporary cards without a gap between them.',
        ],
        pt: [
          'Comprovação das renovações anuais consecutivas',
          'A cadeia de cartões temporários sem lacuna entre eles.',
        ],
        es: [
          'Prueba de las renovaciones anuales consecutivas',
          'La cadena de tarjetas temporales sin vacíos entre ellas.',
        ],
      },
      {
        en: [
          'Updated criminal record certificate',
          'Dominican, issued locally and recent.',
        ],
        pt: [
          'Certidão de antecedentes criminais atualizada',
          'Dominicana, emitida localmente e recente.',
        ],
        es: [
          'Certificado de antecedentes penales actualizado',
          'Dominicano, emitido localmente y reciente.',
        ],
      },
      {
        en: [
          'Guarantee letter from a Dominican guarantor',
          'Required again at this stage.',
        ],
        pt: [
          'Carta de garantia de um fiador dominicano',
          'Exigida novamente nesta etapa.',
        ],
        es: [
          'Carta de garantía de un garante dominicano',
          'Se exige de nuevo en esta etapa.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence of means of living during the period',
          'Payslips, business records or the certified income relied on earlier.',
        ],
        pt: [
          'Comprovação de meios de vida durante o período',
          'Holerites, registos da empresa ou a renda certificada invocada antes.',
        ],
        es: [
          'Prueba de medios de vida durante el periodo',
          'Nóminas, registros del negocio o la renta certificada invocada antes.',
        ],
      },
      {
        en: [
          'Pay the application and card fees',
          'Charged again for the permanent stage.',
        ],
        pt: [
          'Pagar as taxas de solicitação e do cartão',
          'Cobradas novamente na etapa permanente.',
        ],
        es: [
          'Pagar las tasas de solicitud y de la tarjeta',
          'Se cobran de nuevo en la etapa permanente.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File with the migration directorate',
          'Before the current temporary card expires.',
        ],
        pt: [
          'Protocolar na direção de migração',
          'Antes de o cartão temporário atual vencer.',
        ],
        es: [
          'Presentar ante la dirección de migración',
          'Antes de que caduque la tarjeta temporal actual.',
        ],
      },
      {
        en: [
          'Do not let a renewal lapse while waiting',
          'A gap in the chain sends you back to the start of the count.',
        ],
        pt: [
          'Não deixar uma renovação caducar durante a espera',
          'Uma lacuna na cadeia devolve você ao início da contagem.',
        ],
        es: [
          'No dejar caducar una renovación mientras espera',
          'Un vacío en la cadena le devuelve al inicio del cómputo.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical examination at the migration facility',
          'Repeated for the permanent stage, as at every renewal.',
        ],
        pt: [
          'Exame médico na unidade da migração',
          'Repetido na etapa permanente, como em toda renovação.',
        ],
        es: [
          'Examen médico en la unidad de migración',
          'Se repite en la etapa permanente, como en cada renovación.',
        ],
      },
      {
        en: [
          'Biometric registration for the new card',
          'Fingerprints and photograph for the permanent residence card.',
        ],
        pt: [
          'Registo biométrico para o novo cartão',
          'Impressões digitais e fotografia para o cartão de residência permanente.',
        ],
        es: [
          'Registro biométrico para la nueva tarjeta',
          'Huellas y fotografía para la tarjeta de residencia permanente.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the permanent residence card',
          'It carries free access to the labour market.',
        ],
        pt: [
          'Retirar o cartão de residência permanente',
          'Ele traz acesso livre ao mercado de trabalho.',
        ],
        es: [
          'Recoger la tarjeta de residencia permanente',
          'Da acceso libre al mercado laboral.',
        ],
      },
      {
        en: [
          'Update the cédula',
          'The identity document reflects the new status and is used everywhere.',
        ],
        pt: [
          'Atualizar a cédula',
          'O documento de identidade reflete o novo status e é usado em todo lugar.',
        ],
        es: [
          'Actualizar la cédula',
          'El documento de identidad refleja el nuevo estatus y se usa en todas partes.',
        ],
      },
      {
        en: [
          'Renew the card when it expires',
          'The status is permanent but the card is periodically renewed.',
        ],
        pt: [
          'Renovar o cartão quando vencer',
          'O status é permanente, mas o cartão é renovado periodicamente.',
        ],
        es: [
          'Renovar la tarjeta cuando caduque',
          'El estatus es permanente, pero la tarjeta se renueva periódicamente.',
        ],
      },
      {
        en: [
          'Consider naturalisation after the qualifying period',
          'Available after a period of permanent residence, shorter for the spouse of a Dominican and for people investing in the country.',
        ],
        pt: [
          'Avaliar a naturalização após o período qualificado',
          'Disponível após um período de residência permanente, menor para cônjuge de dominicano e para quem investe no país.',
        ],
        es: [
          'Evaluar la naturalización tras el periodo cualificado',
          'Disponible tras un periodo de residencia permanente, menor para el cónyuge de un dominicano y para quienes invierten en el país.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
