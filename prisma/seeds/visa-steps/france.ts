import type { CountryVisaSteps } from './types';

/**
 * Steps for France.
 *
 * The detail that catches almost everyone is the VLS-TS. It is a long-stay visa
 * that *acts as* a residence permit for the first year, but only once it has
 * been validated online within three months of arrival. Skipping that
 * validation leaves you irregular while holding what looks like a valid visa,
 * and it blocks the renewal a year later.
 *
 * Everything starts on the France-Visas portal, which produces the reference
 * number the application centre works from.
 */
export const france: CountryVisaSteps = {
  'Short-Stay Visa (Schengen Type C)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Valid for at least three months beyond departure, issued within the last ten years, with two blank pages.',
        ],
        pt: [
          'Passaporte válido',
          'Válido por pelo menos três meses além da saída, emitido nos últimos dez anos, com duas páginas em branco.',
        ],
        es: [
          'Pasaporte vigente',
          'Vigente al menos tres meses más allá de la salida, emitido en los últimos diez años, con dos páginas en blanco.',
        ],
      },
      {
        en: [
          'France-Visas application and receipt',
          'The form is completed on the national portal, which issues the reference number the centre works from.',
        ],
        pt: [
          'Pedido e recibo do France-Visas',
          'O formulário é preenchido no portal nacional, que emite o número de referência com que o centro trabalha.',
        ],
        es: [
          'Solicitud y resguardo de France-Visas',
          'El formulario se completa en el portal nacional, que emite el número de referencia con el que trabaja el centro.',
        ],
      },
      {
        en: [
          'Two recent photographs',
          'To French specification, on a light background.',
        ],
        pt: ['Duas fotografias recentes', 'No padrão francês, em fundo claro.'],
        es: [
          'Dos fotografías recientes',
          'Según el estándar francés, con fondo claro.',
        ],
      },
      {
        en: [
          'Return flight reservation',
          'A reservation only, matching the dates on the application.',
        ],
        pt: [
          'Reserva de voo de volta',
          'Apenas a reserva, coerente com as datas do pedido.',
        ],
        es: [
          'Reserva de vuelo de vuelta',
          'Solo la reserva, coherente con las fechas de la solicitud.',
        ],
      },
      {
        en: [
          'Proof of accommodation',
          'Hotel booking, or an attestation d’accueil obtained by your host at their mairie.',
        ],
        pt: [
          'Comprovativo de alojamento',
          'Reserva de hotel, ou uma attestation d’accueil obtida pelo anfitrião na mairie dele.',
        ],
        es: [
          'Comprobante de alojamiento',
          'Reserva de hotel, o una attestation d’accueil obtenida por el anfitrión en su mairie.',
        ],
      },
      {
        en: [
          'Travel medical insurance',
          'Minimum cover of 30,000 euros, valid across the Schengen area for the whole stay.',
        ],
        pt: [
          'Seguro médico de viagem',
          'Cobertura mínima de 30 mil euros, válida no espaço Schengen durante toda a estada.',
        ],
        es: [
          'Seguro médico de viaje',
          'Cobertura mínima de 30 mil euros, válida en el espacio Schengen durante toda la estancia.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of means of subsistence',
          'A daily amount per person, lower if you have prepaid accommodation or an attestation d’accueil.',
        ],
        pt: [
          'Comprovativo de meios de subsistência',
          'Um valor diário por pessoa, menor se você tiver alojamento pré-pago ou attestation d’accueil.',
        ],
        es: [
          'Comprobante de medios de subsistencia',
          'Un importe diario por persona, menor si tiene alojamiento prepagado o attestation d’accueil.',
        ],
      },
      {
        en: [
          'Bank statements from the last three months',
          'They must fit the trip described, not just show a large closing balance.',
        ],
        pt: [
          'Extratos bancários dos últimos três meses',
          'Precisam ser compatíveis com a viagem descrita, não apenas exibir um saldo final alto.',
        ],
        es: [
          'Extractos bancarios de los últimos tres meses',
          'Deben encajar con el viaje descrito, no solo mostrar un saldo final elevado.',
        ],
      },
      {
        en: [
          'Proof of employment and approved leave',
          'An employer letter, or company documents if you are self-employed.',
        ],
        pt: [
          'Comprovativo de vínculo laboral e férias aprovadas',
          'Carta do empregador, ou documentos da empresa se for autônomo.',
        ],
        es: [
          'Comprobante de vínculo laboral y vacaciones aprobadas',
          'Carta del empleador, o documentos de la empresa si trabaja por cuenta propia.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Complete the application on France-Visas',
          'The portal also tells you exactly which documents your case requires.',
        ],
        pt: [
          'Preencher o pedido no France-Visas',
          'O portal também informa exatamente quais documentos o seu caso exige.',
        ],
        es: [
          'Completar la solicitud en France-Visas',
          'El portal también indica exactamente qué documentos exige su caso.',
        ],
      },
      {
        en: [
          'Book the appointment at the visa application centre',
          'France outsources collection to a provider that varies by country.',
        ],
        pt: [
          'Agendar atendimento no centro de pedidos de visto',
          'A França terceiriza a recolha a um prestador que varia conforme o país.',
        ],
        es: [
          'Reservar cita en el centro de solicitudes de visado',
          'Francia externaliza la recogida a un proveedor que varía según el país.',
        ],
      },
      {
        en: [
          'Pay the visa fee and the service charge',
          'Two separate amounts; neither is refunded on refusal.',
        ],
        pt: [
          'Pagar a taxa de visto e a taxa de serviço',
          'Dois valores distintos; nenhum é reembolsado em caso de indeferimento.',
        ],
        es: [
          'Pagar la tasa de visado y la tasa de servicio',
          'Dos importes distintos; ninguno se reembolsa si deniegan.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection',
          'Fingerprints stay on file for 59 months and can be reused later.',
        ],
        pt: [
          'Recolha de dados biométricos',
          'As impressões ficam registadas por 59 meses e podem ser reaproveitadas depois.',
        ],
        es: [
          'Recogida de datos biométricos',
          'Las huellas quedan registradas 59 meses y pueden reutilizarse después.',
        ],
      },
      {
        en: ['Medical examination', 'Not required for short-stay visas.'],
        pt: ['Exame médico', 'Não é exigido em vistos de curta duração.'],
        es: ['Examen médico', 'No se exige en visados de corta duración.'],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the passport with the visa',
          'Check the validity, the number of entries and the days granted.',
        ],
        pt: [
          'Retirar o passaporte com o visto',
          'Confira a validade, o número de entradas e os dias concedidos.',
        ],
        es: [
          'Recoger el pasaporte con el visado',
          'Verifique la validez, el número de entradas y los días concedidos.',
        ],
      },
      {
        en: [
          'Respect the 90 days in any 180 rule',
          'Counted across the whole Schengen area, on a rolling basis.',
        ],
        pt: [
          'Respeitar a regra dos 90 dias em cada 180',
          'Contados em todo o espaço Schengen, de forma móvel.',
        ],
        es: [
          'Respetar la regla de 90 días en cada 180',
          'Se cuentan en todo el espacio Schengen, de forma móvil.',
        ],
      },
      {
        en: [
          'Do not work on a short-stay visa',
          'Tourism, family visits and business meetings only.',
        ],
        pt: [
          'Não trabalhar com visto de curta duração',
          'Apenas turismo, visita a familiares e reuniões de negócios.',
        ],
        es: [
          'No trabajar con visado de corta duración',
          'Solo turismo, visitas familiares y reuniones de negocios.',
        ],
      },
    ],
  },

  'Long-Stay Visa (National Visa – VLS-TS etc.)': {
    core_documents: [
      {
        en: ['Valid passport', 'Should cover the period of stay requested.'],
        pt: [
          'Passaporte válido',
          'Deve cobrir o período de permanência pedido.',
        ],
        es: [
          'Pasaporte vigente',
          'Debe cubrir el periodo de estancia solicitado.',
        ],
      },
      {
        en: [
          'Long-stay application on France-Visas',
          'The portal generates a personalised checklist from the reason you select, so choosing the wrong reason produces the wrong list.',
        ],
        pt: [
          'Pedido de longa duração no France-Visas',
          'O portal gera uma lista personalizada a partir do motivo que você seleciona, então motivo errado produz lista errada.',
        ],
        es: [
          'Solicitud de larga duración en France-Visas',
          'El portal genera una lista personalizada a partir del motivo que elija, así que un motivo equivocado produce una lista equivocada.',
        ],
      },
      {
        en: ['Two recent photographs', 'To French specification.'],
        pt: ['Duas fotografias recentes', 'No padrão francês.'],
        es: ['Dos fotografías recientes', 'Según el estándar francés.'],
      },
      {
        en: [
          'Document justifying the reason for the stay',
          'An employment contract with work authorisation, a Campus France admission, or the family documents.',
        ],
        pt: [
          'Documento que justifica o motivo da estada',
          'Contrato de trabalho com autorização de trabalho, admissão via Campus France, ou os documentos familiares.',
        ],
        es: [
          'Documento que justifica el motivo de la estancia',
          'Contrato de trabajo con autorización de trabajo, admisión vía Campus France, o los documentos familiares.',
        ],
      },
      {
        en: [
          'Proof of accommodation in France',
          'A lease, a deed, or an attestation d’hébergement with the host’s proof of address.',
        ],
        pt: [
          'Comprovativo de alojamento na França',
          'Contrato de locação, escritura, ou attestation d’hébergement com o comprovativo de morada do anfitrião.',
        ],
        es: [
          'Comprobante de alojamiento en Francia',
          'Contrato de alquiler, escritura, o attestation d’hébergement con el comprobante de domicilio del anfitrión.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Campus France procedure completed',
          'Students go through Études en France before the consulate, and the interview there is part of the assessment.',
        ],
        pt: [
          'Procedimento Campus France concluído',
          'Estudantes passam pelo Études en France antes do consulado, e a entrevista lá faz parte da avaliação.',
        ],
        es: [
          'Procedimiento Campus France completado',
          'Los estudiantes pasan por Études en France antes del consulado, y la entrevista allí forma parte de la evaluación.',
        ],
        required: false,
      },
      {
        en: [
          'Diplomas and academic transcripts',
          'With a sworn translation into French where required.',
        ],
        pt: [
          'Diplomas e históricos escolares',
          'Com tradução juramentada para o francês quando exigido.',
        ],
        es: [
          'Títulos y expedientes académicos',
          'Con traducción jurada al francés cuando se exija.',
        ],
      },
      {
        en: [
          'Proof of French at the required level',
          'Required for study in French and for some family routes; many skilled roles do not ask for it.',
        ],
        pt: [
          'Comprovação de francês no nível exigido',
          'Exigido para estudo em francês e para algumas rotas familiares; muitas vagas qualificadas não pedem.',
        ],
        es: [
          'Prueba de francés en el nivel exigido',
          'Exigido para estudiar en francés y para algunas vías familiares; muchos puestos cualificados no lo piden.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of sufficient resources',
          'Students are held to a monthly figure tied to the French social scale; workers show the contracted salary.',
        ],
        pt: [
          'Comprovação de recursos suficientes',
          'Estudantes são avaliados por um valor mensal ligado à escala social francesa; trabalhadores comprovam o salário contratado.',
        ],
        es: [
          'Prueba de recursos suficientes',
          'A los estudiantes se les exige un importe mensual ligado a la escala social francesa; los trabajadores acreditan el salario contratado.',
        ],
      },
      {
        en: [
          'Bank statements from the last three to six months',
          'Consistent with the resources declared.',
        ],
        pt: [
          'Extratos bancários dos últimos três a seis meses',
          'Coerentes com os recursos declarados.',
        ],
        es: [
          'Extractos bancarios de los últimos tres a seis meses',
          'Coherentes con los recursos declarados.',
        ],
      },
      {
        en: [
          'Guarantor’s undertaking',
          'If someone in France supports you, their attestation with proof of their income.',
        ],
        pt: [
          'Compromisso do fiador',
          'Se alguém na França o sustenta, a attestation dessa pessoa com comprovação de renda.',
        ],
        es: [
          'Compromiso del garante',
          'Si alguien en Francia le mantiene, su attestation con prueba de sus ingresos.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Book the appointment for a long-stay visa',
          'These slots are scarcer than short-stay ones; apply up to three months before departure.',
        ],
        pt: [
          'Agendar atendimento para visto de longa duração',
          'Essas vagas são mais escassas que as de curta duração; peça até três meses antes da partida.',
        ],
        es: [
          'Reservar cita para visado de larga duración',
          'Estas citas son más escasas que las de corta duración; solicite hasta tres meses antes de viajar.',
        ],
      },
      {
        en: [
          'Pay the long-stay visa fee',
          'Higher than the short-stay one; some student cases are exempt.',
        ],
        pt: [
          'Pagar a taxa de visto de longa duração',
          'Mais alta que a de curta duração; alguns casos de estudante são isentos.',
        ],
        es: [
          'Pagar la tasa de visado de larga duración',
          'Más alta que la de corta duración; algunos casos de estudiante están exentos.',
        ],
      },
      {
        en: [
          'Submit the file in person',
          'Foreign documents generally need a sworn translation into French.',
        ],
        pt: [
          'Entregar o processo presencialmente',
          'Documentos estrangeiros em geral exigem tradução juramentada para o francês.',
        ],
        es: [
          'Presentar el expediente en persona',
          'Los documentos extranjeros suelen exigir traducción jurada al francés.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection',
          'Taken when the application is submitted.',
        ],
        pt: [
          'Recolha de dados biométricos',
          'Feita no momento da entrega do pedido.',
        ],
        es: [
          'Recogida de datos biométricos',
          'Se realiza al presentar la solicitud.',
        ],
      },
      {
        en: [
          'Health insurance for the first months',
          'Valid until you are affiliated to the French social security system.',
        ],
        pt: [
          'Seguro de saúde para os primeiros meses',
          'Válido até a filiação ao sistema francês de seguridade social.',
        ],
        es: [
          'Seguro de salud para los primeros meses',
          'Válido hasta la afiliación al sistema francés de seguridad social.',
        ],
      },
      {
        en: [
          'Medical examination after arrival',
          'Required on some routes and arranged by the immigration office, not before departure.',
        ],
        pt: [
          'Exame médico após a chegada',
          'Exigido em algumas rotas e organizado pelo órgão de imigração, não antes da partida.',
        ],
        es: [
          'Examen médico tras la llegada',
          'Exigido en algunas vías y organizado por la oficina de inmigración, no antes de viajar.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Validate the VLS-TS online within three months of arrival',
          'This is the step that turns the visa into a residence permit. Without it you are irregular while holding a visa that still looks valid.',
        ],
        pt: [
          'Validar o VLS-TS online em até três meses da chegada',
          'É o passo que converte o visto em título de residência. Sem ele você fica irregular segurando um visto que ainda parece válido.',
        ],
        es: [
          'Validar el VLS-TS en línea en los tres meses siguientes a la llegada',
          'Es el paso que convierte el visado en permiso de residencia. Sin él queda irregular con un visado que aún parece válido.',
        ],
      },
      {
        en: [
          'Pay the residence tax stamp',
          'The timbre fiscal is bought online and is part of the validation.',
        ],
        pt: [
          'Pagar o selo fiscal de residência',
          'O timbre fiscal é comprado online e faz parte da validação.',
        ],
        es: [
          'Pagar el sello fiscal de residencia',
          'El timbre fiscal se compra en línea y forma parte de la validación.',
        ],
      },
      {
        en: [
          'Register with social security and get the numéro de sécurité sociale',
          'Needed for healthcare reimbursement and for most administrative steps.',
        ],
        pt: [
          'Inscrever-se na seguridade social e obter o numéro de sécurité sociale',
          'Necessário para reembolso de saúde e para a maioria dos trâmites administrativos.',
        ],
        es: [
          'Inscribirse en la seguridad social y obtener el numéro de sécurité sociale',
          'Necesario para el reembolso sanitario y para la mayoría de los trámites administrativos.',
        ],
        priority: 2,
      },
      {
        en: [
          'Apply for renewal on the ANEF portal before expiry',
          'The renewal is applied for in the two months before the visa runs out, and it produces a proper residence card.',
        ],
        pt: [
          'Pedir a renovação no portal ANEF antes do vencimento',
          'A renovação é pedida nos dois meses anteriores ao fim do visto, e dá origem a um cartão de residência propriamente dito.',
        ],
        es: [
          'Solicitar la renovación en el portal ANEF antes del vencimiento',
          'La renovación se solicita en los dos meses previos al fin del visado, y da lugar a una tarjeta de residencia propiamente dicha.',
        ],
      },
    ],
  },

  'Talent Passport / Skilled Worker Visas': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Should cover the multi-year period the card is issued for.',
        ],
        pt: [
          'Passaporte válido',
          'Deve cobrir o período plurianual para o qual o cartão é emitido.',
        ],
        es: [
          'Pasaporte vigente',
          'Debe cubrir el periodo plurianual para el que se emite la tarjeta.',
        ],
      },
      {
        en: [
          'Application on France-Visas under the talent category',
          'Select the exact sub-category: qualified employee, EU Blue Card, company founder, investor, researcher or artist. Each has its own evidence.',
        ],
        pt: [
          'Pedido no France-Visas na categoria talent',
          'Selecione a subcategoria exata: assalariado qualificado, Cartão Azul UE, fundador de empresa, investidor, pesquisador ou artista. Cada uma tem sua própria comprovação.',
        ],
        es: [
          'Solicitud en France-Visas en la categoría talent',
          'Seleccione la subcategoría exacta: asalariado cualificado, Tarjeta Azul UE, fundador de empresa, inversor, investigador o artista. Cada una tiene su propia prueba.',
        ],
      },
      {
        en: ['Two recent photographs', 'To French specification.'],
        pt: ['Duas fotografias recentes', 'No padrão francês.'],
        es: ['Dos fotografías recientes', 'Según el estándar francés.'],
      },
      {
        en: [
          'Employment contract, or the hosting agreement for researchers',
          'The convention d’accueil is signed by an approved research institution and replaces the work authorisation.',
        ],
        pt: [
          'Contrato de trabalho, ou a convenção de acolhimento para pesquisadores',
          'A convention d’accueil é assinada por instituição de pesquisa credenciada e substitui a autorização de trabalho.',
        ],
        es: [
          'Contrato de trabajo, o el convenio de acogida para investigadores',
          'La convention d’accueil la firma una institución de investigación acreditada y sustituye la autorización de trabajo.',
        ],
      },
      {
        en: [
          'Proof of accommodation in France',
          'A lease or a deed; a hotel booking is generally not accepted for a multi-year card.',
        ],
        pt: [
          'Comprovativo de alojamento na França',
          'Contrato de locação ou escritura; reserva de hotel em geral não é aceite para um cartão plurianual.',
        ],
        es: [
          'Comprobante de alojamiento en Francia',
          'Contrato de alquiler o escritura; una reserva de hotel por lo general no se acepta para una tarjeta plurianual.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Master’s degree or equivalent qualification',
          'Required for the qualified employee and EU Blue Card sub-categories.',
        ],
        pt: [
          'Diploma de mestrado ou qualificação equivalente',
          'Exigido nas subcategorias de assalariado qualificado e Cartão Azul UE.',
        ],
        es: [
          'Título de máster o cualificación equivalente',
          'Exigido en las subcategorías de asalariado cualificado y Tarjeta Azul UE.',
        ],
      },
      {
        en: [
          'Recognition of the foreign qualification',
          'An ENIC-NARIC comparability statement, where the degree was awarded outside France.',
        ],
        pt: [
          'Reconhecimento da qualificação estrangeira',
          'Uma atestação de comparabilidade ENIC-NARIC, quando o diploma foi obtido fora da França.',
        ],
        es: [
          'Reconocimiento de la titulación extranjera',
          'Una atestación de comparabilidad ENIC-NARIC, cuando el título se obtuvo fuera de Francia.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Endorsement from an approved incubator',
          'The route for startup founders runs on this endorsement rather than on an employment contract.',
        ],
        pt: [
          'Endosso de incubadora credenciada',
          'A rota de fundadores de startup funciona com esse endosso em vez de um contrato de trabalho.',
        ],
        es: [
          'Aval de una incubadora acreditada',
          'La vía de fundadores de startup funciona con ese aval en lugar de un contrato de trabajo.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Salary above the threshold for the sub-category',
          'Set as a multiple of the French minimum wage, and it differs between the qualified employee route and the EU Blue Card.',
        ],
        pt: [
          'Salário acima do piso da subcategoria',
          'Definido como um múltiplo do salário mínimo francês, e difere entre a rota de assalariado qualificado e o Cartão Azul UE.',
        ],
        es: [
          'Salario por encima del umbral de la subcategoría',
          'Se fija como un múltiplo del salario mínimo francés, y difiere entre la vía de asalariado cualificado y la Tarjeta Azul UE.',
        ],
      },
      {
        en: [
          'Evidence of the investment or the business project',
          'For the investor and founder routes, the amount committed and the plan behind it.',
        ],
        pt: [
          'Comprovação do investimento ou do projeto empresarial',
          'Nas rotas de investidor e de fundador, o valor comprometido e o plano por trás dele.',
        ],
        es: [
          'Prueba de la inversión o del proyecto empresarial',
          'En las vías de inversor y de fundador, el importe comprometido y el plan que lo respalda.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Complete the application on France-Visas',
          'The portal builds the document list from the sub-category you choose.',
        ],
        pt: [
          'Preencher o pedido no France-Visas',
          'O portal monta a lista de documentos a partir da subcategoria escolhida.',
        ],
        es: [
          'Completar la solicitud en France-Visas',
          'El portal construye la lista de documentos a partir de la subcategoría elegida.',
        ],
      },
      {
        en: [
          'Pay the talent visa fee',
          'Plus the residence tax stamp later, when the card is issued.',
        ],
        pt: [
          'Pagar a taxa do visto talent',
          'Mais o selo fiscal de residência depois, quando o cartão for emitido.',
        ],
        es: [
          'Pagar la tasa del visado talent',
          'Más el sello fiscal de residencia después, cuando se emita la tarjeta.',
        ],
      },
      {
        en: [
          'Include the family in the same application',
          'Spouse and children get a family card on this route, and applying together avoids a separate reunification procedure.',
        ],
        pt: [
          'Incluir a família no mesmo pedido',
          'Cônjuge e filhos recebem cartão de família nesta rota, e pedir junto evita um procedimento separado de reagrupamento.',
        ],
        es: [
          'Incluir a la familia en la misma solicitud',
          'Cónyuge e hijos reciben tarjeta de familia en esta vía, y solicitar juntos evita un procedimiento aparte de reagrupación.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection',
          'Taken at the visa application centre, and again for the card in France.',
        ],
        pt: [
          'Recolha de dados biométricos',
          'Feita no centro de pedidos, e novamente para o cartão já na França.',
        ],
        es: [
          'Recogida de datos biométricos',
          'Se realiza en el centro de solicitudes, y de nuevo para la tarjeta ya en Francia.',
        ],
      },
      {
        en: [
          'Health insurance until affiliation',
          'Cover for the gap before French social security starts.',
        ],
        pt: [
          'Seguro de saúde até a filiação',
          'Cobertura para o intervalo até a seguridade social francesa começar.',
        ],
        es: [
          'Seguro de salud hasta la afiliación',
          'Cobertura para el intervalo hasta que empiece la seguridad social francesa.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Apply for the multi-year card on the ANEF portal',
          'The talent route gives a card valid for up to four years, rather than the annual renewal cycle of the ordinary VLS-TS.',
        ],
        pt: [
          'Pedir o cartão plurianual no portal ANEF',
          'A rota talent dá um cartão válido por até quatro anos, em vez do ciclo anual de renovação do VLS-TS comum.',
        ],
        es: [
          'Solicitar la tarjeta plurianual en el portal ANEF',
          'La vía talent da una tarjeta válida hasta cuatro años, en lugar del ciclo anual de renovación del VLS-TS ordinario.',
        ],
      },
      {
        en: [
          'Register with social security and open a bank account',
          'Both are needed before the first salary can be paid normally.',
        ],
        pt: [
          'Inscrever-se na seguridade social e abrir conta bancária',
          'Ambos são necessários antes de o primeiro salário poder ser pago normalmente.',
        ],
        es: [
          'Inscribirse en la seguridad social y abrir una cuenta bancaria',
          'Ambos son necesarios antes de que el primer salario pueda pagarse con normalidad.',
        ],
      },
      {
        en: [
          'Tell the prefecture if the job or the project changes',
          'The card is tied to the sub-category it was granted under.',
        ],
        pt: [
          'Comunicar à prefeitura se o emprego ou o projeto mudar',
          'O cartão está vinculado à subcategoria sob a qual foi concedido.',
        ],
        es: [
          'Comunicar a la prefectura si cambia el empleo o el proyecto',
          'La tarjeta está ligada a la subcategoría bajo la que se concedió.',
        ],
      },
      {
        en: [
          'Count the years towards a ten-year resident card',
          'Time on a talent card counts, and the route to long-term residence is shorter than most.',
        ],
        pt: [
          'Contar os anos para o cartão de residente de dez anos',
          'O tempo no cartão talent conta, e a rota até a residência de longa duração é mais curta que a maioria.',
        ],
        es: [
          'Contar los años para la tarjeta de residente de diez años',
          'El tiempo en la tarjeta talent cuenta, y la vía hacia la residencia de larga duración es más corta que la mayoría.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
