import type { CountryVisaSteps } from './types';

/**
 * Steps for Peru.
 *
 * Migration is handled by Migraciones through its online platform, and the
 * carné de extranjería is the document that makes a residence usable. Two
 * details recur: the change of migration status is requested from inside the
 * country, and the annual foreigner fee has to be kept up to date — falling
 * behind on it is a common and avoidable way to complicate a renewal.
 */
export const peru: CountryVisaSteps = {
  'Tourist Entry': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Most of the Americas and Europe enter visa-free; check your nationality first.',
        ],
        pt: [
          'Passaporte válido',
          'A maior parte das Américas e da Europa entra sem visto; confira sua nacionalidade antes.',
        ],
        es: [
          'Pasaporte vigente',
          'La mayor parte de América y Europa entra sin visado; compruebe primero su nacionalidad.',
        ],
      },
      {
        en: [
          'National identity document for some South American nationals',
          'Citizens of several neighbouring countries may enter with their ID card.',
        ],
        pt: [
          'Documento nacional de identidade para alguns sul-americanos',
          'Cidadãos de vários países vizinhos podem entrar com a carteira de identidade.',
        ],
        es: [
          'Documento nacional de identidad para algunos sudamericanos',
          'Los ciudadanos de varios países vecinos pueden entrar con su documento de identidad.',
        ],
        priority: 2,
        required: false,
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
          'No published figure; officers assess it against the trip described.',
        ],
        pt: [
          'Comprovação de recursos para a estada',
          'Não há valor publicado; os oficiais avaliam conforme a viagem descrita.',
        ],
        es: [
          'Prueba de fondos para la estancia',
          'No hay cifra publicada; los oficiales la valoran según el viaje descrito.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply at the consulate only if a visa is required',
          'There is no online travel authorisation for tourism.',
        ],
        pt: [
          'Pedir no consulado só se houver exigência de visto',
          'Não existe autorização de viagem online para turismo.',
        ],
        es: [
          'Solicitar en el consulado solo si se exige visado',
          'No existe autorización de viaje en línea para turismo.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Migration registration at the border',
          'The entry is recorded electronically; there is no longer a paper card.',
        ],
        pt: [
          'Registo migratório na fronteira',
          'A entrada é registada eletronicamente; não há mais cartão em papel.',
        ],
        es: [
          'Registro migratorio en la frontera',
          'La entrada se registra electrónicamente; ya no hay tarjeta en papel.',
        ],
      },
      {
        en: [
          'Yellow fever vaccination',
          'Recommended for travel to the Amazon regions rather than required for entry.',
        ],
        pt: [
          'Vacinação contra febre amarela',
          'Recomendada para viagens à Amazônia, não exigida para a entrada.',
        ],
        es: [
          'Vacunación contra la fiebre amarilla',
          'Recomendada para viajar a las regiones amazónicas, no exigida para la entrada.',
        ],
        priority: 3,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Note the stay granted at the border',
          'Up to ninety days as a rule, and the total is capped over a twelve-month period.',
        ],
        pt: [
          'Anotar o prazo concedido na fronteira',
          'Até noventa dias como regra, e o total é limitado dentro de doze meses.',
        ],
        es: [
          'Anotar el plazo concedido en la frontera',
          'Hasta noventa días como regla, y el total está limitado dentro de doce meses.',
        ],
      },
      {
        en: [
          'Do not overstay',
          'Peru charges a daily fine for every day beyond the authorised stay, payable on exit.',
        ],
        pt: [
          'Não ultrapassar o prazo',
          'O Peru cobra multa diária por cada dia além do prazo autorizado, paga na saída.',
        ],
        es: [
          'No exceder el plazo',
          'Perú cobra una multa diaria por cada día más allá del plazo autorizado, pagadera a la salida.',
        ],
      },
      {
        en: [
          'Do not work as a tourist',
          'Paid activity requires a change of migration status first.',
        ],
        pt: [
          'Não trabalhar como turista',
          'Atividade remunerada exige antes uma mudança de qualidade migratória.',
        ],
        es: [
          'No trabajar como turista',
          'La actividad remunerada exige antes un cambio de calidad migratoria.',
        ],
      },
    ],
  },

  'Work Visa': {
    core_documents: [
      {
        en: ['Valid passport', 'Covering the period of the intended stay.'],
        pt: ['Passaporte válido', 'Cobrindo o período da estada pretendida.'],
        es: [
          'Pasaporte vigente',
          'Que cubra el periodo de la estancia prevista.',
        ],
      },
      {
        en: [
          'Employment contract approved by the labour ministry',
          'The contract is registered and approved before the migration status is requested. It is the employer who starts this.',
        ],
        pt: [
          'Contrato de trabalho aprovado pelo ministério do trabalho',
          'O contrato é registado e aprovado antes de a qualidade migratória ser pedida. Quem inicia isso é o empregador.',
        ],
        es: [
          'Contrato de trabajo aprobado por el ministerio de trabajo',
          'El contrato se registra y aprueba antes de solicitar la calidad migratoria. Lo inicia el empleador.',
        ],
      },
      {
        en: [
          'Criminal record certificates',
          'From your country of origin, apostilled, and from Interpol in Peru.',
        ],
        pt: [
          'Certidões de antecedentes penais',
          'Do país de origem, apostilada, e da Interpol no Peru.',
        ],
        es: [
          'Certificados de antecedentes penales',
          'Del país de origen, apostillado, y de Interpol en Perú.',
        ],
      },
      {
        en: [
          'Sworn declaration of address',
          'Stating where you will live in Peru.',
        ],
        pt: [
          'Declaração juramentada de domicílio',
          'Indicando onde você vai morar no Peru.',
        ],
        es: [
          'Declaración jurada de domicilio',
          'Indicando dónde vivirá en Perú.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Diplomas for regulated professions',
          'Practising requires the qualification to be registered with the relevant professional college.',
        ],
        pt: [
          'Diplomas para profissões regulamentadas',
          'Exercer exige registo da qualificação no colégio profissional correspondente.',
        ],
        es: [
          'Títulos para profesiones reguladas',
          'Ejercer exige registrar la titulación en el colegio profesional correspondiente.',
        ],
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Salary stated in the approved contract',
          'Peru limits how much of a company’s payroll may go to foreign workers, so the employer has to have room under that cap.',
        ],
        pt: [
          'Salário previsto no contrato aprovado',
          'O Peru limita quanto da folha de uma empresa pode ir para trabalhadores estrangeiros, então o empregador precisa ter espaço nesse teto.',
        ],
        es: [
          'Salario previsto en el contrato aprobado',
          'Perú limita cuánto de la planilla de una empresa puede ir a trabajadores extranjeros, así que el empleador debe tener margen bajo ese tope.',
        ],
      },
      {
        en: [
          'Pay the migration fees',
          'Charged for the status change and again for the foreigner card.',
        ],
        pt: [
          'Pagar as taxas de migração',
          'Cobradas pela mudança de qualidade e novamente pelo carné.',
        ],
        es: [
          'Pagar las tasas de migración',
          'Se cobran por el cambio de calidad y de nuevo por el carné.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File the change of migration status online',
          'Through the Migraciones platform, from inside Peru.',
        ],
        pt: [
          'Protocolar a mudança de qualidade migratória online',
          'Pela plataforma da Migraciones, de dentro do Peru.',
        ],
        es: [
          'Presentar el cambio de calidad migratoria en línea',
          'Por la plataforma de Migraciones, desde dentro de Perú.',
        ],
      },
      {
        en: [
          'Attend the appointment at Migraciones',
          'To present originals and complete the identity check.',
        ],
        pt: [
          'Comparecer ao atendimento na Migraciones',
          'Para apresentar originais e completar a verificação de identidade.',
        ],
        es: [
          'Acudir a la cita en Migraciones',
          'Para presentar originales y completar la verificación de identidad.',
        ],
      },
      {
        en: [
          'Keep the tourist status valid while it is decided',
          'Falling into an irregular stay during the process complicates the outcome.',
        ],
        pt: [
          'Manter o status de turista válido enquanto é decidido',
          'Cair em permanência irregular durante o processo complica o resultado.',
        ],
        es: [
          'Mantener vigente el estatus de turista mientras se resuelve',
          'Caer en permanencia irregular durante el trámite complica el resultado.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric registration at Migraciones',
          'Fingerprints and photograph for the foreigner card.',
        ],
        pt: [
          'Registo biométrico na Migraciones',
          'Impressões digitais e fotografia para o carné de extranjería.',
        ],
        es: [
          'Registro biométrico en Migraciones',
          'Huellas y fotografía para el carné de extranjería.',
        ],
      },
      {
        en: [
          'Affiliation to a health system',
          'Employers must affiliate registered workers; private cover applies otherwise.',
        ],
        pt: [
          'Filiação a um sistema de saúde',
          'Os empregadores precisam filiar trabalhadores registados; fora disso vale a cobertura privada.',
        ],
        es: [
          'Afiliación a un sistema de salud',
          'Los empleadores deben afiliar a los trabajadores registrados; fuera de eso rige la cobertura privada.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the carné de extranjería',
          'The foreigner identity card, which is what banks, employers and services ask for.',
        ],
        pt: [
          'Retirar o carné de extranjería',
          'A identidade de estrangeiro, que é o que bancos, empregadores e serviços pedem.',
        ],
        es: [
          'Retirar el carné de extranjería',
          'La identidad de extranjero, que es lo que piden bancos, empleadores y servicios.',
        ],
      },
      {
        en: [
          'Get a RUC if you will invoice',
          'The tax number, needed for self-employed activity.',
        ],
        pt: [
          'Obter o RUC se for faturar',
          'O número fiscal, necessário para atividade autônoma.',
        ],
        es: [
          'Obtener el RUC si va a facturar',
          'El número fiscal, necesario para la actividad por cuenta propia.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Pay the annual foreigner fee',
          'A yearly charge that has to be kept current; falling behind is a common and avoidable problem at renewal.',
        ],
        pt: [
          'Pagar a taxa anual de estrangeiro',
          'Uma cobrança anual que precisa ficar em dia; ficar atrasado é um problema comum e evitável na renovação.',
        ],
        es: [
          'Pagar la tasa anual de extranjería',
          'Un cargo anual que debe mantenerse al día; atrasarse es un problema común y evitable en la renovación.',
        ],
      },
      {
        en: [
          'Renew the status before it expires',
          'Renewal is requested online and continuity is what leads to permanent residence.',
        ],
        pt: [
          'Renovar a qualidade antes do vencimento',
          'A renovação é pedida online, e a continuidade é o que leva à residência permanente.',
        ],
        es: [
          'Renovar la calidad antes de que venza',
          'La renovación se solicita en línea, y la continuidad es lo que lleva a la residencia permanente.',
        ],
      },
    ],
  },

  'Rentista Visa': {
    core_documents: [
      {
        en: ['Valid passport', 'Covering the period of the intended stay.'],
        pt: ['Passaporte válido', 'Cobrindo o período da estada pretendida.'],
        es: [
          'Pasaporte vigente',
          'Que cubra el periodo de la estancia prevista.',
        ],
      },
      {
        en: [
          'Evidence of a permanent income from abroad',
          'A pension, an annuity or rental income paid from outside Peru. This route is for passive income, not for work.',
        ],
        pt: [
          'Comprovação de renda permanente vinda do exterior',
          'Aposentadoria, renda vitalícia ou aluguéis pagos de fora do Peru. Esta rota é para renda passiva, não para trabalho.',
        ],
        es: [
          'Prueba de una renta permanente del exterior',
          'Una pensión, una renta vitalicia o alquileres pagados desde fuera de Perú. Esta vía es para renta pasiva, no para trabajo.',
        ],
      },
      {
        en: [
          'Certification of the income by the paying institution',
          'Issued by the pension fund or bank, apostilled and translated into Spanish.',
        ],
        pt: [
          'Certificação da renda pela instituição pagadora',
          'Emitida pelo fundo de pensão ou banco, apostilada e traduzida para o espanhol.',
        ],
        es: [
          'Certificación de la renta por la institución pagadora',
          'Emitida por el fondo de pensiones o el banco, apostillada y traducida al español.',
        ],
      },
      {
        en: [
          'Criminal record certificates',
          'From your country of origin, apostilled, and from Interpol in Peru.',
        ],
        pt: [
          'Certidões de antecedentes penais',
          'Do país de origem, apostilada, e da Interpol no Peru.',
        ],
        es: [
          'Certificados de antecedentes penales',
          'Del país de origen, apostillado, y de Interpol en Perú.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Income above the monthly threshold',
          'A fixed minimum, with an increment for each dependant. Confirm the figure in force before applying.',
        ],
        pt: [
          'Renda acima do piso mensal',
          'Um mínimo fixo, com acréscimo por dependente. Confirme o valor em vigor antes de pedir.',
        ],
        es: [
          'Ingresos por encima del umbral mensual',
          'Un mínimo fijo, con incremento por cada dependiente. Confirme la cifra vigente antes de solicitar.',
        ],
      },
      {
        en: [
          'Evidence the income is permanent',
          'A temporary or discretionary payment does not qualify; it has to be durable by its nature.',
        ],
        pt: [
          'Comprovação de que a renda é permanente',
          'Um pagamento temporário ou discricionário não qualifica; precisa ser duradouro por natureza.',
        ],
        es: [
          'Prueba de que la renta es permanente',
          'Un pago temporal o discrecional no califica; debe ser duradero por naturaleza.',
        ],
      },
      {
        en: [
          'Pay the migration fees',
          'Charged for the status and for the foreigner card.',
        ],
        pt: [
          'Pagar as taxas de migração',
          'Cobradas pela qualidade migratória e pelo carné.',
        ],
        es: [
          'Pagar las tasas de migración',
          'Se cobran por la calidad migratoria y por el carné.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File the application with Migraciones',
          'The rentista status can be requested from inside Peru or at a consulate abroad.',
        ],
        pt: [
          'Protocolar o pedido na Migraciones',
          'A qualidade de rentista pode ser pedida de dentro do Peru ou num consulado no exterior.',
        ],
        es: [
          'Presentar la solicitud ante Migraciones',
          'La calidad de rentista puede solicitarse desde dentro de Perú o en un consulado en el exterior.',
        ],
      },
      {
        en: [
          'Attend the appointment to present originals',
          'The income certification is examined closely, so bring the full chain of documents.',
        ],
        pt: [
          'Comparecer ao atendimento para apresentar originais',
          'A certificação de renda é examinada de perto, então leve toda a cadeia de documentos.',
        ],
        es: [
          'Acudir a la cita para presentar originales',
          'La certificación de renta se examina con detalle, así que lleve toda la cadena de documentos.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric registration at Migraciones',
          'Fingerprints and photograph for the foreigner card.',
        ],
        pt: [
          'Registo biométrico na Migraciones',
          'Impressões digitais e fotografia para o carné.',
        ],
        es: [
          'Registro biométrico en Migraciones',
          'Huellas y fotografía para el carné.',
        ],
      },
      {
        en: [
          'Private health insurance',
          'Rentistas are not affiliated through an employer, so private cover is the practical route.',
        ],
        pt: [
          'Seguro de saúde privado',
          'Rentistas não são filiados por um empregador, então a cobertura privada é o caminho prático.',
        ],
        es: [
          'Seguro de salud privado',
          'Los rentistas no se afilian a través de un empleador, así que la cobertura privada es la vía práctica.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the carné de extranjería',
          'It records the rentista status, which does not authorise working for a Peruvian employer.',
        ],
        pt: [
          'Retirar o carné de extranjería',
          'Ele registra a qualidade de rentista, que não autoriza trabalhar para empregador peruano.',
        ],
        es: [
          'Retirar el carné de extranjería',
          'Registra la calidad de rentista, que no autoriza trabajar para un empleador peruano.',
        ],
      },
      {
        en: [
          'Note the tax exemption on the foreign income',
          'Income certified under this status is generally exempt from Peruvian income tax. Confirm the current terms with an adviser.',
        ],
        pt: [
          'Observar a isenção fiscal sobre a renda estrangeira',
          'A renda certificada sob essa qualidade em geral é isenta de imposto de renda peruano. Confirme os termos atuais com um assessor.',
        ],
        es: [
          'Observar la exención fiscal sobre la renta extranjera',
          'La renta certificada bajo esta calidad suele estar exenta del impuesto a la renta peruano. Confirme los términos actuales con un asesor.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Pay the annual foreigner fee',
          'Kept current, as for every other residence status.',
        ],
        pt: [
          'Pagar a taxa anual de estrangeiro',
          'Mantida em dia, como em qualquer outra qualidade de residência.',
        ],
        es: [
          'Pagar la tasa anual de extranjería',
          'Al día, como en cualquier otra calidad de residencia.',
        ],
      },
      {
        en: [
          'Change status if you start working',
          'Taking a job with a Peruvian employer requires moving to the work status.',
        ],
        pt: [
          'Mudar de qualidade se começar a trabalhar',
          'Assumir emprego com empregador peruano exige migrar para a qualidade de trabalho.',
        ],
        es: [
          'Cambiar de calidad si empieza a trabajar',
          'Aceptar un empleo con un empleador peruano exige pasar a la calidad de trabajo.',
        ],
        priority: 2,
      },
    ],
  },

  'Permanent Residence': {
    core_documents: [
      {
        en: [
          'Valid passport and current carné de extranjería',
          'Applied for from inside Peru, holding a valid residence status.',
        ],
        pt: [
          'Passaporte válido e carné de extranjería atual',
          'Pedida de dentro do Peru, com uma qualidade de residência válida.',
        ],
        es: [
          'Pasaporte vigente y carné de extranjería actual',
          'Se solicita desde dentro de Perú, con una calidad de residencia vigente.',
        ],
      },
      {
        en: [
          'Evidence of the qualifying period of residence',
          'Normally three years of continuous residence on a qualifying status.',
        ],
        pt: [
          'Comprovação do período qualificado de residência',
          'Normalmente três anos de residência contínua numa qualidade qualificante.',
        ],
        es: [
          'Prueba del periodo cualificado de residencia',
          'Normalmente tres años de residencia continua en una calidad cualificante.',
        ],
      },
      {
        en: [
          'Record of entries and exits',
          'Obtained from Migraciones; long absences break the continuity.',
        ],
        pt: [
          'Certificado de entradas e saídas',
          'Obtido na Migraciones; ausências longas quebram a continuidade.',
        ],
        es: [
          'Certificado de entradas y salidas',
          'Se obtiene en Migraciones; las ausencias largas rompen la continuidad.',
        ],
      },
      {
        en: [
          'Interpol criminal record certificate',
          'Issued in Peru and valid for a short period, so request it near the end.',
        ],
        pt: [
          'Certidão de antecedentes da Interpol',
          'Emitida no Peru e válida por período curto, então peça-a no fim.',
        ],
        es: [
          'Certificado de antecedentes de Interpol',
          'Se emite en Perú y vale poco tiempo, así que pídalo al final.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence of lawful activity during the period',
          'Payslips, invoices or the certified income that supported the earlier status.',
        ],
        pt: [
          'Comprovação de atividade lícita durante o período',
          'Holerites, notas fiscais ou a renda certificada que sustentou a qualidade anterior.',
        ],
        es: [
          'Prueba de actividad lícita durante el periodo',
          'Boletas, facturas o la renta certificada que sustentó la calidad anterior.',
        ],
      },
      {
        en: [
          'Annual foreigner fee up to date',
          'Outstanding fees have to be settled before the application is accepted.',
        ],
        pt: [
          'Taxa anual de estrangeiro em dia',
          'Taxas em aberto precisam ser quitadas antes de o pedido ser aceito.',
        ],
        es: [
          'Tasa anual de extranjería al día',
          'Las tasas pendientes deben saldarse antes de que se acepte la solicitud.',
        ],
      },
      {
        en: [
          'Pay the permanent residence fee',
          'Charged when the application is filed.',
        ],
        pt: [
          'Pagar a taxa de residência permanente',
          'Cobrada no momento do protocolo.',
        ],
        es: [
          'Pagar la tasa de residencia permanente',
          'Se cobra al presentar la solicitud.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File online with Migraciones',
          'Before the current status expires, to keep the continuity intact.',
        ],
        pt: [
          'Protocolar online na Migraciones',
          'Antes de a qualidade atual vencer, para manter a continuidade intacta.',
        ],
        es: [
          'Presentar en línea ante Migraciones',
          'Antes de que venza la calidad actual, para mantener intacta la continuidad.',
        ],
      },
      {
        en: [
          'Attend the appointment to present originals',
          'The residence history is checked against the migration records.',
        ],
        pt: [
          'Comparecer ao atendimento para apresentar originais',
          'O histórico de residência é conferido contra os registos migratórios.',
        ],
        es: [
          'Acudir a la cita para presentar originales',
          'El historial de residencia se coteja con los registros migratorios.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric registration for the new card',
          'Fingerprints and photograph taken at Migraciones.',
        ],
        pt: [
          'Registo biométrico para o novo carné',
          'Impressões digitais e fotografia recolhidas na Migraciones.',
        ],
        es: [
          'Registro biométrico para el nuevo carné',
          'Huellas y fotografía tomadas en Migraciones.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the permanent carné de extranjería',
          'The status no longer expires, though the card itself is renewed.',
        ],
        pt: [
          'Retirar o carné de extranjería permanente',
          'A qualidade deixa de vencer, embora o carné em si seja renovado.',
        ],
        es: [
          'Retirar el carné de extranjería permanente',
          'La calidad deja de vencer, aunque el carné en sí se renueva.',
        ],
      },
      {
        en: [
          'Keep paying the annual foreigner fee',
          'It continues to apply after permanent residence is granted.',
        ],
        pt: [
          'Continuar pagando a taxa anual de estrangeiro',
          'Ela continua se aplicando depois de concedida a residência permanente.',
        ],
        es: [
          'Seguir pagando la tasa anual de extranjería',
          'Sigue aplicándose después de concedida la residencia permanente.',
        ],
      },
      {
        en: [
          'Do not stay outside Peru for more than a continuous year',
          'Prolonged absence can extinguish the residence unless authorised in advance.',
        ],
        pt: [
          'Não ficar fora do Peru por mais de um ano contínuo',
          'A ausência prolongada pode extinguir a residência, salvo autorização prévia.',
        ],
        es: [
          'No permanecer fuera de Perú más de un año continuo',
          'La ausencia prolongada puede extinguir la residencia, salvo autorización previa.',
        ],
      },
      {
        en: [
          'Consider naturalisation after two years of residence',
          'Peruvian nationality is available after two years of legal residence.',
        ],
        pt: [
          'Avaliar a naturalização após dois anos de residência',
          'A nacionalidade peruana está disponível após dois anos de residência legal.',
        ],
        es: [
          'Evaluar la naturalización tras dos años de residencia',
          'La nacionalidad peruana está disponible tras dos años de residencia legal.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
