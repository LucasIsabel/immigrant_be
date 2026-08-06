import type { CountryVisaSteps } from './types';

/**
 * Steps for Mexico.
 *
 * The step people miss is the canje. A residence visa granted at a consulate
 * abroad is only valid for a single entry and expires shortly after; once in
 * Mexico you have thirty days to exchange it at an INM office for the actual
 * residence card. Missing that window voids the visa and the whole process
 * starts again at the consulate.
 *
 * The other structural rule: residence is applied for at a Mexican consulate
 * outside the country, not from inside on a visitor status. The exceptions are
 * narrow — family ties to a Mexican, and a few humanitarian grounds.
 */
export const mexico: CountryVisaSteps = {
  'Visitor Visa (Visitante / FMM)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Many nationalities enter visa-free for tourism; check yours before applying for anything.',
        ],
        pt: [
          'Passaporte válido',
          'Muitas nacionalidades entram sem visto a turismo; confira a sua antes de pedir qualquer coisa.',
        ],
        es: [
          'Pasaporte vigente',
          'Muchas nacionalidades entran sin visado a turismo; compruebe la suya antes de solicitar nada.',
        ],
      },
      {
        en: [
          'Check whether a US, Canadian or Schengen visa exempts you',
          'Holding a valid visa from certain countries removes the Mexican visa requirement, which many travellers do not realise.',
        ],
        pt: [
          'Verificar se um visto americano, canadense ou Schengen isenta você',
          'Ter visto válido de certos países elimina a exigência de visto mexicano, o que muita gente não sabe.',
        ],
        es: [
          'Comprobar si un visado estadounidense, canadiense o Schengen le exime',
          'Tener un visado vigente de ciertos países elimina el requisito de visado mexicano, algo que muchos viajeros desconocen.',
        ],
      },
      {
        en: [
          'Digital entry form completed before arrival',
          'The paper FMM was retired at most airports; the record is now electronic and the stamp in the passport carries the days granted.',
        ],
        pt: [
          'Formulário de entrada digital preenchido antes da chegada',
          'A FMM em papel foi descontinuada na maioria dos aeroportos; o registo agora é eletrônico e o carimbo no passaporte traz os dias concedidos.',
        ],
        es: [
          'Formulario de ingreso digital completado antes de llegar',
          'La FMM en papel se retiró en la mayoría de los aeropuertos; el registro ahora es electrónico y el sello en el pasaporte lleva los días concedidos.',
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
          'Bank statements or cards; officers assess them against the trip described.',
        ],
        pt: [
          'Comprovação de recursos para a estada',
          'Extratos ou cartões; os oficiais avaliam conforme a viagem descrita.',
        ],
        es: [
          'Prueba de fondos para la estancia',
          'Extractos o tarjetas; los oficiales los valoran según el viaje descrito.',
        ],
      },
      {
        en: [
          'Proof of employment or income',
          'Requested when a visa is required, to support the intention to return.',
        ],
        pt: [
          'Comprovação de emprego ou renda',
          'Pedida quando há exigência de visto, para sustentar a intenção de retorno.',
        ],
        es: [
          'Comprobante de empleo o ingresos',
          'Se pide cuando se exige visado, para sustentar la intención de regresar.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Book a consular appointment if a visa is required',
          'Appointments are booked through the ministry system and slots can be scarce.',
        ],
        pt: [
          'Agendar atendimento consular se houver exigência de visto',
          'Os agendamentos saem pelo sistema do ministério e as vagas podem ser escassas.',
        ],
        es: [
          'Reservar cita consular si se exige visado',
          'Las citas se reservan por el sistema del ministerio y pueden escasear.',
        ],
      },
      {
        en: [
          'Pay the visa fee at the consulate',
          'Paid at the interview and not refunded if refused.',
        ],
        pt: [
          'Pagar a taxa do visto no consulado',
          'Paga na entrevista e não devolvida em caso de indeferimento.',
        ],
        es: [
          'Pagar la tasa del visado en el consulado',
          'Se paga en la entrevista y no se devuelve si deniegan.',
        ],
      },
      {
        en: [
          'Pay the tourist fee if it applies',
          'Charged for stays over a set number of days, and included in the airfare on most flights.',
        ],
        pt: [
          'Pagar a taxa de turista se aplicável',
          'Cobrada em estadas acima de certo número de dias, e já embutida na passagem na maioria dos voos.',
        ],
        es: [
          'Pagar la tasa de turista si aplica',
          'Se cobra en estancias de más de cierto número de días, y suele venir incluida en el billete.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric registration at the border',
          'Fingerprints and photograph taken by migration on entry.',
        ],
        pt: [
          'Registo biométrico na fronteira',
          'Impressões digitais e fotografia recolhidas pela migração na entrada.',
        ],
        es: [
          'Registro biométrico en la frontera',
          'Migración toma huellas y fotografía a la entrada.',
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
          'Check the days written on the entry stamp',
          'The officer decides how long you may stay, and it is often far less than the maximum. Assuming you got the full period is a common cause of overstay.',
        ],
        pt: [
          'Conferir os dias escritos no carimbo de entrada',
          'O oficial decide quanto tempo você pode ficar, e muitas vezes é bem menos que o máximo. Supor que recebeu o prazo cheio é causa comum de overstay.',
        ],
        es: [
          'Revisar los días escritos en el sello de entrada',
          'El oficial decide cuánto puede quedarse, y a menudo es bastante menos que el máximo. Suponer que le dieron el plazo completo es causa común de sobreestadía.',
        ],
      },
      {
        en: [
          'Do not work as a visitor',
          'The visitor status without permission to work covers tourism and business meetings only.',
        ],
        pt: [
          'Não trabalhar como visitante',
          'O status de visitante sem permissão para trabalhar cobre apenas turismo e reuniões de negócios.',
        ],
        es: [
          'No trabajar como visitante',
          'El estatus de visitante sin permiso para trabajar cubre solo turismo y reuniones de negocios.',
        ],
      },
      {
        en: [
          'Do not count on converting to residence from inside Mexico',
          'Residence is applied for at a consulate abroad. The exceptions are narrow: family ties to a Mexican and a few humanitarian grounds.',
        ],
        pt: [
          'Não contar em converter para residência de dentro do México',
          'A residência é pedida num consulado no exterior. As exceções são estreitas: vínculo familiar com mexicano e alguns fundamentos humanitários.',
        ],
        es: [
          'No contar con convertir a residencia desde dentro de México',
          'La residencia se solicita en un consulado en el exterior. Las excepciones son estrechas: vínculo familiar con un mexicano y algunos fundamentos humanitarios.',
        ],
        priority: 2,
      },
    ],
  },

  'Temporary Resident Visa (Residente Temporal)': {
    core_documents: [
      {
        en: [
          'Apply at a Mexican consulate outside Mexico',
          'The residence process begins abroad. Being in the country as a visitor does not let you file, and this is the structural rule to internalise first.',
        ],
        pt: [
          'Pedir num consulado mexicano fora do México',
          'O processo de residência começa no exterior. Estar no país como visitante não permite protocolar, e essa é a regra estrutural a interiorizar antes de tudo.',
        ],
        es: [
          'Solicitar en un consulado mexicano fuera de México',
          'El proceso de residencia empieza en el exterior. Estar en el país como visitante no permite presentarla, y esa es la regla estructural a interiorizar primero.',
        ],
      },
      {
        en: [
          'Valid passport',
          'Original and a copy of every page with stamps.',
        ],
        pt: [
          'Passaporte válido',
          'Original e cópia de todas as páginas com carimbos.',
        ],
        es: [
          'Pasaporte vigente',
          'Original y copia de todas las páginas con sellos.',
        ],
      },
      {
        en: [
          'Consular application form and photograph',
          'Completed at the appointment, with a photograph to the Mexican specification.',
        ],
        pt: [
          'Formulário consular e fotografia',
          'Preenchido no atendimento, com fotografia no padrão mexicano.',
        ],
        es: [
          'Formulario consular y fotografía',
          'Se completa en la cita, con una fotografía según el estándar mexicano.',
        ],
      },
      {
        en: [
          'Document supporting the ground',
          'Financial solvency, a job offer with an INM authorisation, a family tie, or a property in Mexico.',
        ],
        pt: [
          'Documento que sustenta o fundamento',
          'Solvência econômica, oferta de emprego com autorização do INM, vínculo familiar, ou imóvel no México.',
        ],
        es: [
          'Documento que sustenta el fundamento',
          'Solvencia económica, oferta de empleo con autorización del INM, vínculo familiar, o un inmueble en México.',
        ],
      },
      {
        en: [
          'INM authorisation number for the work ground',
          'The Mexican employer obtains it before you go to the consulate; without it the work route does not start.',
        ],
        pt: [
          'Número de autorização do INM no fundamento de trabalho',
          'O empregador mexicano o obtém antes de você ir ao consulado; sem ele a rota de trabalho não começa.',
        ],
        es: [
          'Número de autorización del INM en el fundamento de trabajo',
          'El empleador mexicano lo obtiene antes de que acuda al consulado; sin él la vía de trabajo no arranca.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Bank statements from the last twelve months',
          'For the savings route, showing a balance above the threshold maintained throughout — not a recent deposit.',
        ],
        pt: [
          'Extratos bancários dos últimos doze meses',
          'Na rota de poupança, mostrando saldo acima do piso mantido durante todo o período — não um depósito recente.',
        ],
        es: [
          'Extractos bancarios de los últimos doce meses',
          'En la vía de ahorros, mostrando un saldo por encima del umbral mantenido todo el periodo, no un depósito reciente.',
        ],
      },
      {
        en: [
          'Payslips from the last six months',
          'For the income route, showing a monthly figure above the threshold.',
        ],
        pt: [
          'Holerites dos últimos seis meses',
          'Na rota de renda, mostrando um valor mensal acima do piso.',
        ],
        es: [
          'Nóminas de los últimos seis meses',
          'En la vía de ingresos, mostrando un importe mensual por encima del umbral.',
        ],
      },
      {
        en: [
          'Confirm the threshold at the specific consulate',
          'The figures are tied to the Mexican minimum wage and each consulate publishes its own conversion, so they differ between posts.',
        ],
        pt: [
          'Confirmar o piso no consulado específico',
          'Os valores são atrelados ao salário mínimo mexicano e cada consulado publica a própria conversão, então diferem entre postos.',
        ],
        es: [
          'Confirmar el umbral en el consulado específico',
          'Las cifras están atadas al salario mínimo mexicano y cada consulado publica su propia conversión, así que difieren entre sedes.',
        ],
      },
      {
        en: [
          'Property deed as an alternative',
          'Owning Mexican real estate above a set value can substitute for the income and savings tests.',
        ],
        pt: [
          'Escritura de imóvel como alternativa',
          'Ter imóvel no México acima de certo valor pode substituir os testes de renda e de poupança.',
        ],
        es: [
          'Escritura de un inmueble como alternativa',
          'Tener inmueble en México por encima de cierto valor puede sustituir las pruebas de ingresos y ahorros.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Book the consular appointment',
          'Waiting times vary sharply between consulates; some run months behind.',
        ],
        pt: [
          'Agendar o atendimento consular',
          'Os prazos variam muito entre consulados; alguns estão meses atrasados.',
        ],
        es: [
          'Reservar la cita consular',
          'Los plazos varían mucho entre consulados; algunos van meses atrasados.',
        ],
      },
      {
        en: [
          'Attend the interview and pay the consular fee',
          'The decision is usually given at the appointment itself.',
        ],
        pt: [
          'Comparecer à entrevista e pagar a taxa consular',
          'A decisão costuma ser dada no próprio atendimento.',
        ],
        es: [
          'Acudir a la entrevista y pagar la tasa consular',
          'La decisión suele darse en la propia cita.',
        ],
      },
      {
        en: [
          'Enter Mexico within the visa validity',
          'The consular visa is valid for a single entry and expires within a few months of issue.',
        ],
        pt: [
          'Entrar no México dentro da validade do visto',
          'O visto consular vale para uma única entrada e expira poucos meses após a emissão.',
        ],
        es: [
          'Entrar en México dentro de la validez del visado',
          'El visado consular vale para una sola entrada y caduca a los pocos meses de su emisión.',
        ],
      },
      {
        en: [
          'Declare the residence purpose to the officer on arrival',
          'Ask for the entry to be recorded as canje. Being stamped as a tourist by mistake breaks the process.',
        ],
        pt: [
          'Declarar o propósito de residência ao oficial na chegada',
          'Peça que a entrada seja registada como canje. Ser carimbado como turista por engano quebra o processo.',
        ],
        es: [
          'Declarar el propósito de residencia al oficial al llegar',
          'Pida que la entrada se registre como canje. Que le sellen como turista por error rompe el proceso.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection at the INM',
          'Fingerprints and photograph taken during the canje, for the residence card.',
        ],
        pt: [
          'Coleta de dados biométricos no INM',
          'Impressões digitais e fotografia recolhidas durante o canje, para o cartão de residência.',
        ],
        es: [
          'Recogida de datos biométricos en el INM',
          'Huellas y fotografía tomadas durante el canje, para la tarjeta de residencia.',
        ],
      },
      {
        en: [
          'Private health insurance',
          'Public cover comes only with formal employment, so private insurance fills the gap.',
        ],
        pt: [
          'Seguro de saúde privado',
          'A cobertura pública só vem com emprego formal, então o seguro privado cobre a lacuna.',
        ],
        es: [
          'Seguro de salud privado',
          'La cobertura pública solo llega con el empleo formal, así que el seguro privado cubre el hueco.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Complete the canje at an INM office within thirty days',
          'This is the step that turns the consular visa into the residence card. Missing the window voids the visa and sends you back to the consulate.',
        ],
        pt: [
          'Fazer o canje num escritório do INM em até trinta dias',
          'É o passo que converte o visto consular no cartão de residência. Perder a janela anula o visto e devolve você ao consulado.',
        ],
        es: [
          'Hacer el canje en una oficina del INM en treinta días',
          'Es el paso que convierte el visado consular en la tarjeta de residencia. Perder la ventana anula el visado y le devuelve al consulado.',
        ],
      },
      {
        en: [
          'Collect the residence card',
          'Valid for one year initially, then renewable for up to four years in total.',
        ],
        pt: [
          'Retirar o cartão de residência',
          'Válido por um ano inicialmente, depois renovável até quatro anos no total.',
        ],
        es: [
          'Recoger la tarjeta de residencia',
          'Válida un año inicialmente, luego renovable hasta cuatro años en total.',
        ],
      },
      {
        en: [
          'Get a CURP and an RFC',
          'The population identifier and the tax number, both needed for banking, contracts and payroll.',
        ],
        pt: [
          'Obter o CURP e o RFC',
          'O identificador populacional e o número fiscal, ambos necessários para banco, contratos e folha de pagamento.',
        ],
        es: [
          'Obtener el CURP y el RFC',
          'El identificador poblacional y el número fiscal, ambos necesarios para banca, contratos y nómina.',
        ],
      },
      {
        en: [
          'Ask for permission to work if you did not come on the work ground',
          'The card states whether work is permitted; adding it later is a separate INM procedure.',
        ],
        pt: [
          'Pedir permissão para trabalhar se não veio pelo fundamento de trabalho',
          'O cartão diz se o trabalho é permitido; incluí-lo depois é um procedimento à parte no INM.',
        ],
        es: [
          'Pedir permiso para trabajar si no vino por el fundamento laboral',
          'La tarjeta indica si se permite trabajar; añadirlo después es un trámite aparte en el INM.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Renew before the card expires',
          'Renewal is requested inside Mexico, and four years of temporary residence open the permanent stage.',
        ],
        pt: [
          'Renovar antes de o cartão vencer',
          'A renovação é pedida dentro do México, e quatro anos de residência temporária abrem a etapa permanente.',
        ],
        es: [
          'Renovar antes de que caduque la tarjeta',
          'La renovación se solicita dentro de México, y cuatro años de residencia temporal abren la etapa permanente.',
        ],
      },
    ],
  },

  'Permanent Resident Visa (Residente Permanente)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Plus the current residence card if you are converting from temporary.',
        ],
        pt: [
          'Passaporte válido',
          'Além do cartão de residência atual, se estiver convertendo da temporária.',
        ],
        es: [
          'Pasaporte vigente',
          'Además de la tarjeta de residencia actual, si convierte desde la temporal.',
        ],
      },
      {
        en: [
          'Identify which route applies to you',
          'Four years of temporary residence, a family tie to a Mexican, retirement income, or the points system. The first is the common path and it is requested from inside Mexico.',
        ],
        pt: [
          'Identificar qual rota se aplica a você',
          'Quatro anos de residência temporária, vínculo familiar com mexicano, renda de aposentadoria, ou o sistema de pontos. A primeira é o caminho comum e é pedida de dentro do México.',
        ],
        es: [
          'Identificar qué vía le aplica',
          'Cuatro años de residencia temporal, vínculo familiar con un mexicano, renta de jubilación, o el sistema de puntos. La primera es la vía común y se solicita desde dentro de México.',
        ],
      },
      {
        en: [
          'Evidence of the qualifying period',
          'The chain of residence cards showing four continuous years, or two if married to a Mexican.',
        ],
        pt: [
          'Comprovação do período qualificado',
          'A cadeia de cartões de residência mostrando quatro anos contínuos, ou dois se casado com mexicano.',
        ],
        es: [
          'Prueba del periodo cualificado',
          'La cadena de tarjetas de residencia que muestre cuatro años continuos, o dos si está casado con un mexicano.',
        ],
      },
      {
        en: [
          'Birth or marriage certificate, apostilled',
          'For the family routes, apostilled and translated by an authorised translator.',
        ],
        pt: [
          'Certidão de nascimento ou casamento apostilada',
          'Nas rotas familiares, apostilada e traduzida por perito tradutor autorizado.',
        ],
        es: [
          'Partida de nacimiento o de matrimonio apostillada',
          'En las vías familiares, apostillada y traducida por perito traductor autorizado.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of pension or investment income',
          'For the retirement route, at a threshold higher than the temporary one and confirmed at the consulate.',
        ],
        pt: [
          'Comprovação de aposentadoria ou renda de investimentos',
          'Na rota de aposentadoria, num piso mais alto que o da temporária e confirmado no consulado.',
        ],
        es: [
          'Prueba de pensión o renta de inversiones',
          'En la vía de jubilación, con un umbral más alto que el de la temporal y confirmado en el consulado.',
        ],
        required: false,
      },
      {
        en: [
          'Tax situation in order',
          'Outstanding obligations with the tax authority complicate the application.',
        ],
        pt: [
          'Situação fiscal regularizada',
          'Pendências com a autoridade tributária complicam o pedido.',
        ],
        es: [
          'Situación fiscal regularizada',
          'Los pendientes con la autoridad tributaria complican la solicitud.',
        ],
        priority: 2,
      },
      {
        en: [
          'Pay the INM fees',
          'The permanent card fee is higher than the temporary one and is paid at a bank before the appointment.',
        ],
        pt: [
          'Pagar as taxas do INM',
          'A taxa do cartão permanente é mais alta que a da temporária e é paga em banco antes do atendimento.',
        ],
        es: [
          'Pagar las tasas del INM',
          'La tasa de la tarjeta permanente es más alta que la de la temporal y se paga en un banco antes de la cita.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File at an INM office if converting from temporary',
          'Requested inside Mexico, before the current card expires.',
        ],
        pt: [
          'Protocolar num escritório do INM se estiver convertendo da temporária',
          'Pedido de dentro do México, antes de o cartão atual vencer.',
        ],
        es: [
          'Presentar en una oficina del INM si convierte desde la temporal',
          'Se solicita dentro de México, antes de que caduque la tarjeta actual.',
        ],
      },
      {
        en: [
          'File at a consulate on the retirement or points route',
          'Those routes start abroad and still require the canje after arrival.',
        ],
        pt: [
          'Protocolar num consulado nas rotas de aposentadoria ou de pontos',
          'Essas rotas começam no exterior e ainda exigem o canje após a chegada.',
        ],
        es: [
          'Presentar en un consulado en las vías de jubilación o de puntos',
          'Esas vías empiezan en el exterior y aún exigen el canje tras la llegada.',
        ],
      },
      {
        en: [
          'Do not let the temporary card lapse while waiting',
          'A gap breaks the four-year continuity the conversion depends on.',
        ],
        pt: [
          'Não deixar o cartão temporário caducar durante a espera',
          'Uma lacuna quebra a continuidade de quatro anos de que a conversão depende.',
        ],
        es: [
          'No dejar caducar la tarjeta temporal mientras espera',
          'Un vacío rompe la continuidad de cuatro años de la que depende la conversión.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection at the INM',
          'Fingerprints and photograph for the permanent card.',
        ],
        pt: [
          'Coleta de dados biométricos no INM',
          'Impressões digitais e fotografia para o cartão permanente.',
        ],
        es: [
          'Recogida de datos biométricos en el INM',
          'Huellas y fotografía para la tarjeta permanente.',
        ],
      },
      {
        en: [
          'Enrol in the public health system if employed',
          'Formal employment gives access to IMSS; otherwise private cover applies.',
        ],
        pt: [
          'Inscrever-se no sistema público de saúde se empregado',
          'O emprego formal dá acesso ao IMSS; fora disso vale a cobertura privada.',
        ],
        es: [
          'Inscribirse en el sistema público de salud si trabaja',
          'El empleo formal da acceso al IMSS; fuera de eso rige la cobertura privada.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the permanent residence card',
          'It does not expire and it carries the right to work without further permission.',
        ],
        pt: [
          'Retirar o cartão de residência permanente',
          'Ele não vence e traz o direito de trabalhar sem autorização adicional.',
        ],
        es: [
          'Recoger la tarjeta de residencia permanente',
          'No caduca y otorga el derecho a trabajar sin permiso adicional.',
        ],
      },
      {
        en: [
          'Report a change of address to the INM',
          'A legal obligation with a short deadline, and it matters if you later apply for nationality.',
        ],
        pt: [
          'Comunicar mudança de endereço ao INM',
          'Obrigação legal com prazo curto, e pesa se depois você pedir a nacionalidade.',
        ],
        es: [
          'Comunicar el cambio de domicilio al INM',
          'Obligación legal con plazo corto, y cuenta si después solicita la nacionalidad.',
        ],
      },
      {
        en: [
          'Update the CURP and the RFC',
          'Both records carry the migration status and should reflect the new one.',
        ],
        pt: [
          'Atualizar o CURP e o RFC',
          'Ambos os registos carregam o status migratório e devem refletir o novo.',
        ],
        es: [
          'Actualizar el CURP y el RFC',
          'Ambos registros llevan el estatus migratorio y deben reflejar el nuevo.',
        ],
        priority: 2,
      },
      {
        en: [
          'Consider naturalisation after five years of residence',
          'Two years for the spouse of a Mexican and for nationals of Latin American and Iberian countries.',
        ],
        pt: [
          'Avaliar a naturalização após cinco anos de residência',
          'Dois anos para cônjuge de mexicano e para nacionais de países latino-americanos e ibéricos.',
        ],
        es: [
          'Evaluar la naturalización tras cinco años de residencia',
          'Dos años para el cónyuge de un mexicano y para nacionales de países latinoamericanos e ibéricos.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
