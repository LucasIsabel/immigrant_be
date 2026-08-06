import type { CountryVisaSteps } from './types';

/**
 * Steps for Panama.
 *
 * Two things shape every route here. Applications must be filed by a Panamanian
 * lawyer with a power of attorney — you cannot walk into migration and hand in
 * your own file — and that legal cost is a real part of the budget.
 *
 * And the Friendly Nations visa changed fundamentally: it used to be granted on
 * nationality plus a token economic activity, and now requires a genuine
 * economic tie — a real job with a work permit, a substantial property purchase,
 * or a fixed-term deposit. Any guidance describing the old, easy version is out
 * of date, so that check comes first.
 */
export const panama: CountryVisaSteps = {
  'Tourist Entry': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Valid for at least three months. Most of the Americas and Europe enter visa-free.',
        ],
        pt: [
          'Passaporte válido',
          'Válido por pelo menos três meses. A maior parte das Américas e da Europa entra sem visto.',
        ],
        es: [
          'Pasaporte vigente',
          'Vigente al menos tres meses. La mayor parte de América y Europa entra sin visado.',
        ],
      },
      {
        en: [
          'Return or onward ticket',
          'Checked at the border and enforced more strictly than in most of the region.',
        ],
        pt: [
          'Bilhete de volta ou de continuação',
          'Conferido na fronteira e cobrado com mais rigor que na maior parte da região.',
        ],
        es: [
          'Billete de vuelta o de continuación',
          'Se comprueba en la frontera y se exige con más rigor que en la mayor parte de la región.',
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
      {
        en: [
          'Yellow fever vaccination certificate',
          'Required if you are arriving from a country where the disease is present.',
        ],
        pt: [
          'Certificado de vacinação contra febre amarela',
          'Exigido se você chega de um país onde a doença está presente.',
        ],
        es: [
          'Certificado de vacunación contra la fiebre amarilla',
          'Exigido si llega desde un país donde la enfermedad está presente.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of funds for the stay',
          'Panama expects a minimum amount in cash or on a card, and officers do ask to see it.',
        ],
        pt: [
          'Comprovação de recursos para a estada',
          'O Panamá espera um valor mínimo em dinheiro ou no cartão, e os oficiais realmente pedem para ver.',
        ],
        es: [
          'Prueba de fondos para la estancia',
          'Panamá espera un importe mínimo en efectivo o en tarjeta, y los oficiales sí piden verlo.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'No advance application for visa-free nationalities',
          'You present yourself at the border; there is no online authorisation.',
        ],
        pt: [
          'Sem pedido prévio para nacionalidades isentas',
          'Você se apresenta na fronteira; não há autorização online.',
        ],
        es: [
          'Sin solicitud previa para nacionalidades exentas',
          'Se presenta en la frontera; no hay autorización en línea.',
        ],
      },
      {
        en: [
          'Apply at the consulate if a visa is required',
          'Some nationalities need an authorised visa, which takes weeks.',
        ],
        pt: [
          'Pedir no consulado se houver exigência de visto',
          'Algumas nacionalidades precisam de visto autorizado, o que leva semanas.',
        ],
        es: [
          'Solicitar en el consulado si se exige visado',
          'Algunas nacionalidades necesitan un visado autorizado, que tarda semanas.',
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
          'Up to ninety days for most nationalities, decided by the officer.',
        ],
        pt: [
          'Anotar o prazo concedido na fronteira',
          'Até noventa dias para a maioria das nacionalidades, decidido pelo oficial.',
        ],
        es: [
          'Anotar el plazo concedido en la frontera',
          'Hasta noventa días para la mayoría de las nacionalidades, decidido por el oficial.',
        ],
      },
      {
        en: [
          'Do not work as a tourist',
          'Paid activity requires a residence and a separate work permit.',
        ],
        pt: [
          'Não trabalhar como turista',
          'Atividade remunerada exige residência e uma permissão de trabalho à parte.',
        ],
        es: [
          'No trabajar como turista',
          'La actividad remunerada exige residencia y un permiso de trabajo aparte.',
        ],
      },
      {
        en: [
          'Start a residence application from inside the country if you plan to stay',
          'Panama allows it while you are on a tourist entry, through a lawyer.',
        ],
        pt: [
          'Iniciar um pedido de residência de dentro do país, se pretende ficar',
          'O Panamá permite isso enquanto você está com entrada de turista, por meio de um advogado.',
        ],
        es: [
          'Iniciar una solicitud de residencia desde dentro del país si piensa quedarse',
          'Panamá lo permite mientras está con entrada de turista, mediante un abogado.',
        ],
        priority: 2,
      },
    ],
  },

  'Friendly Nations Visa': {
    core_documents: [
      {
        en: [
          'Check that your nationality is on the list',
          'The programme covers a defined set of countries. If yours is not on it, this route is closed regardless of your profile.',
        ],
        pt: [
          'Verificar se sua nacionalidade está na lista',
          'O programa cobre um conjunto definido de países. Se o seu não estiver, esta rota está fechada, qualquer que seja seu perfil.',
        ],
        es: [
          'Comprobar que su nacionalidad está en la lista',
          'El programa cubre un conjunto definido de países. Si el suyo no está, esta vía está cerrada sea cual sea su perfil.',
        ],
      },
      {
        en: [
          'Understand that a real economic tie is now required',
          'The reform ended the old version. You now need a job with a work permit, a substantial property purchase, or a fixed-term bank deposit — a token company no longer works.',
        ],
        pt: [
          'Entender que agora é exigido um vínculo econômico real',
          'A reforma acabou com a versão antiga. Agora é preciso emprego com permissão de trabalho, compra substancial de imóvel, ou depósito bancário a prazo — uma empresa de fachada não serve mais.',
        ],
        es: [
          'Entender que ahora se exige un vínculo económico real',
          'La reforma acabó con la versión antigua. Ahora hace falta empleo con permiso de trabajo, compra sustancial de inmueble, o depósito bancario a plazo: una empresa de fachada ya no sirve.',
        ],
      },
      {
        en: [
          'Valid passport with the entry stamp',
          'Every page copied and notarised by a Panamanian notary.',
        ],
        pt: [
          'Passaporte válido com o carimbo de entrada',
          'Todas as páginas copiadas e autenticadas por notário panamenho.',
        ],
        es: [
          'Pasaporte vigente con el sello de entrada',
          'Todas las páginas copiadas y autenticadas ante notario panameño.',
        ],
      },
      {
        en: [
          'Criminal record certificate, apostilled',
          'From your country of origin or residence, issued within the last six months.',
        ],
        pt: [
          'Certidão de antecedentes criminais apostilada',
          'Do país de origem ou de residência, emitida nos últimos seis meses.',
        ],
        es: [
          'Certificado de antecedentes penales apostillado',
          'Del país de origen o de residencia, emitido en los últimos seis meses.',
        ],
      },
      {
        en: [
          'Power of attorney for a Panamanian lawyer',
          'The application is filed by the lawyer, not by you. This is a legal requirement, not a convenience.',
        ],
        pt: [
          'Procuração para um advogado panamenho',
          'O pedido é protocolado pelo advogado, não por você. É exigência legal, não conveniência.',
        ],
        es: [
          'Poder para un abogado panameño',
          'La solicitud la presenta el abogado, no usted. Es un requisito legal, no una comodidad.',
        ],
      },
      {
        en: ['Five passport photographs', 'To the Panamanian specification.'],
        pt: ['Cinco fotografias tipo passaporte', 'No padrão panamenho.'],
        es: ['Cinco fotografías tipo pasaporte', 'Según el estándar panameño.'],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence of the chosen economic tie',
          'An employment contract registered with the labour ministry, a property title above the threshold, or a certificate of a fixed-term deposit.',
        ],
        pt: [
          'Comprovação do vínculo econômico escolhido',
          'Contrato de trabalho registado no ministério do trabalho, título de imóvel acima do piso, ou certificado de depósito a prazo.',
        ],
        es: [
          'Prueba del vínculo económico elegido',
          'Contrato de trabajo registrado en el ministerio de trabajo, título de propiedad por encima del umbral, o certificado de un depósito a plazo.',
        ],
      },
      {
        en: [
          'Bank reference letter',
          'From a Panamanian bank, which means opening an account first — itself a slow step for foreigners.',
        ],
        pt: [
          'Carta de referência bancária',
          'De um banco panamenho, o que exige abrir conta antes — um passo lento por si só para estrangeiros.',
        ],
        es: [
          'Carta de referencia bancaria',
          'De un banco panameño, lo que exige abrir cuenta antes: un paso lento de por sí para extranjeros.',
        ],
      },
      {
        en: [
          'Deposit into the national bank account',
          'A sum held in your name at the state bank, released once the residence is granted.',
        ],
        pt: [
          'Depósito na conta do banco nacional',
          'Uma quantia em seu nome no banco estatal, liberada quando a residência é concedida.',
        ],
        es: [
          'Depósito en la cuenta del banco nacional',
          'Una suma a su nombre en el banco estatal, liberada cuando se concede la residencia.',
        ],
      },
      {
        en: [
          'Budget for the legal fees',
          'Panamanian counsel is mandatory and the fee is typically the largest single cost of the process.',
        ],
        pt: [
          'Prever os honorários advocatícios',
          'A representação por advogado panamenho é obrigatória e o honorário costuma ser o maior custo isolado do processo.',
        ],
        es: [
          'Presupuestar los honorarios legales',
          'La representación por abogado panameño es obligatoria y el honorario suele ser el mayor coste individual del proceso.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'File through the lawyer at the migration service',
          'The whole file is submitted at once; a missing document restarts the queue.',
        ],
        pt: [
          'Protocolar pelo advogado no serviço de migração',
          'Todo o processo é entregue de uma vez; um documento faltando reinicia a fila.',
        ],
        es: [
          'Presentar mediante el abogado ante el servicio de migración',
          'Todo el expediente se entrega de una vez; un documento faltante reinicia la cola.',
        ],
      },
      {
        en: [
          'Pay the migration and repatriation fees',
          'Two separate government charges, on top of the lawyer.',
        ],
        pt: [
          'Pagar as taxas de migração e de repatriação',
          'Duas cobranças governamentais distintas, além do advogado.',
        ],
        es: [
          'Pagar las tasas de migración y de repatriación',
          'Dos cargos gubernamentales distintos, además del abogado.',
        ],
      },
      {
        en: [
          'Collect the provisional card',
          'Issued while the case is decided; it legalises your stay in the meantime.',
        ],
        pt: [
          'Retirar o carné provisório',
          'Emitido enquanto o caso é decidido; ele legaliza sua permanência nesse intervalo.',
        ],
        es: [
          'Retirar el carné provisional',
          'Se emite mientras se resuelve el caso; legaliza su permanencia entretanto.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical certificate from a Panamanian doctor',
          'A local health check, including basic blood tests.',
        ],
        pt: [
          'Certificado médico de médico panamenho',
          'Um exame de saúde local, incluindo exames de sangue básicos.',
        ],
        es: [
          'Certificado médico de un médico panameño',
          'Un examen de salud local, incluidos análisis de sangre básicos.',
        ],
      },
      {
        en: [
          'Biometric registration at migration',
          'Fingerprints and photograph for the residence card.',
        ],
        pt: [
          'Registo biométrico na migração',
          'Impressões digitais e fotografia para o carné de residência.',
        ],
        es: [
          'Registro biométrico en migración',
          'Huellas y fotografía para el carné de residencia.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Receive the two-year temporary residence',
          'The reform added this stage; permanent residence no longer comes immediately.',
        ],
        pt: [
          'Receber a residência temporária de dois anos',
          'A reforma acrescentou essa etapa; a residência permanente não vem mais de imediato.',
        ],
        es: [
          'Recibir la residencia temporaria de dos años',
          'La reforma añadió esta etapa; la residencia permanente ya no llega de inmediato.',
        ],
      },
      {
        en: [
          'Get the cédula and, if working, a separate work permit',
          'The residence and the right to work are two different permissions in Panama.',
        ],
        pt: [
          'Obter a cédula e, se for trabalhar, uma permissão de trabalho à parte',
          'A residência e o direito de trabalhar são duas permissões diferentes no Panamá.',
        ],
        es: [
          'Obtener la cédula y, si va a trabajar, un permiso de trabajo aparte',
          'La residencia y el derecho a trabajar son dos permisos distintos en Panamá.',
        ],
      },
      {
        en: [
          'Maintain the economic tie throughout',
          'Ending the employment or selling the property before the permanent stage undermines the conversion.',
        ],
        pt: [
          'Manter o vínculo econômico durante todo o período',
          'Encerrar o emprego ou vender o imóvel antes da etapa permanente compromete a conversão.',
        ],
        es: [
          'Mantener el vínculo económico durante todo el periodo',
          'Terminar el empleo o vender el inmueble antes de la etapa permanente socava la conversión.',
        ],
      },
      {
        en: [
          'Apply for permanent residence before the two years end',
          'Filed through the lawyer, with the economic tie still evidenced.',
        ],
        pt: [
          'Pedir a residência permanente antes dos dois anos',
          'Protocolada pelo advogado, com o vínculo econômico ainda comprovado.',
        ],
        es: [
          'Solicitar la residencia permanente antes de los dos años',
          'Se presenta mediante el abogado, con el vínculo económico aún acreditado.',
        ],
        priority: 2,
      },
    ],
  },

  'Pensionado (Retiree) Visa': {
    core_documents: [
      {
        en: [
          'Valid passport with the entry stamp',
          'Every page copied and notarised in Panama.',
        ],
        pt: [
          'Passaporte válido com o carimbo de entrada',
          'Todas as páginas copiadas e autenticadas no Panamá.',
        ],
        es: [
          'Pasaporte vigente con el sello de entrada',
          'Todas las páginas copiadas y autenticadas en Panamá.',
        ],
      },
      {
        en: [
          'Certification of a lifetime pension',
          'From the government body or private fund paying it, apostilled and translated. It has to be for life, not for a term.',
        ],
        pt: [
          'Certificação de aposentadoria vitalícia',
          'Do órgão governamental ou fundo privado que a paga, apostilada e traduzida. Precisa ser vitalícia, não por prazo.',
        ],
        es: [
          'Certificación de una pensión vitalicia',
          'Del organismo gubernamental o fondo privado que la paga, apostillada y traducida. Debe ser vitalicia, no por plazo.',
        ],
      },
      {
        en: [
          'Criminal record certificate, apostilled',
          'Issued within the last six months.',
        ],
        pt: [
          'Certidão de antecedentes criminais apostilada',
          'Emitida nos últimos seis meses.',
        ],
        es: [
          'Certificado de antecedentes penales apostillado',
          'Emitido en los últimos seis meses.',
        ],
      },
      {
        en: [
          'Power of attorney for a Panamanian lawyer',
          'Mandatory, as for every residence route here.',
        ],
        pt: [
          'Procuração para um advogado panamenho',
          'Obrigatória, como em toda rota de residência aqui.',
        ],
        es: [
          'Poder para un abogado panameño',
          'Obligatorio, como en toda vía de residencia aquí.',
        ],
      },
      {
        en: ['Passport photographs', 'To the Panamanian specification.'],
        pt: ['Fotografias tipo passaporte', 'No padrão panamenho.'],
        es: ['Fotografías tipo pasaporte', 'Según el estándar panameño.'],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Monthly pension above the threshold',
          'A fixed monthly figure, lower if you also buy property in Panama above a set value. Confirm the amounts in force.',
        ],
        pt: [
          'Aposentadoria mensal acima do piso',
          'Um valor mensal fixo, menor se você também comprar imóvel no Panamá acima de certo valor. Confirme os montantes vigentes.',
        ],
        es: [
          'Pensión mensual por encima del umbral',
          'Un importe mensual fijo, menor si además compra un inmueble en Panamá por encima de cierto valor. Confirme los importes vigentes.',
        ],
      },
      {
        en: [
          'Evidence the pension is actually being paid',
          'Bank statements showing the deposits, not only the award letter.',
        ],
        pt: [
          'Comprovação de que a aposentadoria está de fato sendo paga',
          'Extratos mostrando os depósitos, não apenas a carta de concessão.',
        ],
        es: [
          'Prueba de que la pensión se está pagando efectivamente',
          'Extractos que muestren los depósitos, no solo la carta de concesión.',
        ],
      },
      {
        en: [
          'Budget for the legal and government fees',
          'Lower than the Friendly Nations route, since there is no deposit to place.',
        ],
        pt: [
          'Prever honorários e taxas governamentais',
          'Menores que na rota Friendly Nations, já que não há depósito a fazer.',
        ],
        es: [
          'Presupuestar honorarios y tasas gubernamentales',
          'Menores que en la vía Friendly Nations, ya que no hay depósito que colocar.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File through the lawyer at the migration service',
          'The pensionado route is filed from inside Panama, on a tourist entry.',
        ],
        pt: [
          'Protocolar pelo advogado no serviço de migração',
          'A rota pensionado é protocolada de dentro do Panamá, com entrada de turista.',
        ],
        es: [
          'Presentar mediante el abogado ante el servicio de migración',
          'La vía pensionado se presenta desde dentro de Panamá, con entrada de turista.',
        ],
      },
      {
        en: [
          'Pay the migration fees',
          'Government charges, separate from the legal fee.',
        ],
        pt: [
          'Pagar as taxas de migração',
          'Cobranças governamentais, separadas do honorário advocatício.',
        ],
        es: [
          'Pagar las tasas de migración',
          'Cargos gubernamentales, separados del honorario legal.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical certificate from a Panamanian doctor',
          'A local health check, part of the standard file.',
        ],
        pt: [
          'Certificado médico de médico panamenho',
          'Um exame de saúde local, parte do processo padrão.',
        ],
        es: [
          'Certificado médico de un médico panameño',
          'Un examen de salud local, parte del expediente estándar.',
        ],
      },
      {
        en: [
          'Biometric registration at migration',
          'Fingerprints and photograph for the pensionado card.',
        ],
        pt: [
          'Registo biométrico na migração',
          'Impressões digitais e fotografia para o carné de pensionado.',
        ],
        es: [
          'Registro biométrico en migración',
          'Huellas y fotografía para el carné de pensionado.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Receive permanent residence directly',
          'Unlike the Friendly Nations route, the pensionado programme grants permanent status without a temporary stage.',
        ],
        pt: [
          'Receber residência permanente diretamente',
          'Diferente da rota Friendly Nations, o programa pensionado concede status permanente sem etapa temporária.',
        ],
        es: [
          'Recibir la residencia permanente directamente',
          'A diferencia de la vía Friendly Nations, el programa pensionado concede el estatus permanente sin etapa temporal.',
        ],
      },
      {
        en: [
          'Use the pensionado discounts',
          'The status carries statutory discounts on transport, healthcare, utilities and entertainment, which are a substantial part of its value.',
        ],
        pt: [
          'Usar os descontos de pensionado',
          'O status traz descontos legais em transporte, saúde, serviços públicos e lazer, que são parte substancial do seu valor.',
        ],
        es: [
          'Usar los descuentos de pensionado',
          'El estatus lleva descuentos legales en transporte, sanidad, servicios y ocio, que son parte sustancial de su valor.',
        ],
      },
      {
        en: [
          'Note that this status does not permit working',
          'The pensionado visa is for living on the pension; taking a job requires a separate permit and a different status.',
        ],
        pt: [
          'Saber que esse status não permite trabalhar',
          'O visto de pensionado é para viver da aposentadoria; assumir emprego exige permissão à parte e outro status.',
        ],
        es: [
          'Saber que este estatus no permite trabajar',
          'El visado de pensionado es para vivir de la pensión; aceptar un empleo exige un permiso aparte y otro estatus.',
        ],
      },
      {
        en: [
          'Keep the pension certification current',
          'It is checked again if you later apply for naturalisation.',
        ],
        pt: [
          'Manter a certificação da aposentadoria atualizada',
          'Ela é conferida de novo se você depois pedir a naturalização.',
        ],
        es: [
          'Mantener actualizada la certificación de la pensión',
          'Se comprueba de nuevo si después solicita la naturalización.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },

  'Qualified Investor Visa': {
    core_documents: [
      {
        en: ['Valid passport', 'Every page copied and notarised in Panama.'],
        pt: [
          'Passaporte válido',
          'Todas as páginas copiadas e autenticadas no Panamá.',
        ],
        es: [
          'Pasaporte vigente',
          'Todas las páginas copiadas y autenticadas en Panamá.',
        ],
      },
      {
        en: [
          'Power of attorney for a Panamanian lawyer',
          'Mandatory. This route can be completed without you ever entering Panama, but only through counsel.',
        ],
        pt: [
          'Procuração para um advogado panamenho',
          'Obrigatória. Esta rota pode ser concluída sem você jamais entrar no Panamá, mas só por meio do advogado.',
        ],
        es: [
          'Poder para un abogado panameño',
          'Obligatorio. Esta vía puede completarse sin que usted entre nunca en Panamá, pero solo mediante el abogado.',
        ],
      },
      {
        en: [
          'Criminal record certificate, apostilled',
          'Issued within the last six months.',
        ],
        pt: [
          'Certidão de antecedentes criminais apostilada',
          'Emitida nos últimos seis meses.',
        ],
        es: [
          'Certificado de antecedentes penales apostillado',
          'Emitido en los últimos seis meses.',
        ],
      },
      {
        en: [
          'Documents evidencing the investment',
          'A property title, a securities account statement, or a fixed-term deposit certificate, depending on the option chosen.',
        ],
        pt: [
          'Documentos que comprovam o investimento',
          'Título de imóvel, extrato de conta de valores mobiliários, ou certificado de depósito a prazo, conforme a opção escolhida.',
        ],
        es: [
          'Documentos que acreditan la inversión',
          'Título de propiedad, extracto de cuenta de valores, o certificado de depósito a plazo, según la opción elegida.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Investment above the threshold for the chosen option',
          'Real estate, a securities portfolio or a bank deposit, each with its own minimum. Confirm the figures in force before committing.',
        ],
        pt: [
          'Investimento acima do piso da opção escolhida',
          'Imóvel, carteira de valores mobiliários ou depósito bancário, cada um com seu mínimo. Confirme os valores vigentes antes de se comprometer.',
        ],
        es: [
          'Inversión por encima del umbral de la opción elegida',
          'Inmueble, cartera de valores o depósito bancario, cada uno con su mínimo. Confirme las cifras vigentes antes de comprometerse.',
        ],
      },
      {
        en: [
          'Evidence of the lawful origin of the funds',
          'The money must come from abroad and be traceable to a lawful source.',
        ],
        pt: [
          'Comprovação da origem lícita dos recursos',
          'O dinheiro precisa vir do exterior e ser rastreável até uma origem lícita.',
        ],
        es: [
          'Prueba del origen lícito de los fondos',
          'El dinero debe provenir del exterior y ser rastreable hasta una fuente lícita.',
        ],
      },
      {
        en: [
          'Commitment to hold the investment for five years',
          'Selling the asset before that period ends puts the residence at risk.',
        ],
        pt: [
          'Compromisso de manter o investimento por cinco anos',
          'Vender o ativo antes desse prazo põe a residência em risco.',
        ],
        es: [
          'Compromiso de mantener la inversión cinco años',
          'Vender el activo antes de ese plazo pone en riesgo la residencia.',
        ],
      },
      {
        en: [
          'Budget for the legal and government fees',
          'The highest of the Panamanian routes, matching the size of the investment.',
        ],
        pt: [
          'Prever honorários e taxas governamentais',
          'Os mais altos entre as rotas panamenhas, à altura do tamanho do investimento.',
        ],
        es: [
          'Presupuestar honorarios y tasas gubernamentales',
          'Los más altos entre las vías panameñas, acordes al tamaño de la inversión.',
        ],
        priority: 2,
      },
    ],
    submission_fees: [
      {
        en: [
          'Make the investment before filing',
          'The application evidences a completed investment; a commitment to invest is not enough.',
        ],
        pt: [
          'Fazer o investimento antes de protocolar',
          'O pedido comprova um investimento já realizado; um compromisso de investir não basta.',
        ],
        es: [
          'Realizar la inversión antes de presentar',
          'La solicitud acredita una inversión ya realizada; un compromiso de invertir no basta.',
        ],
      },
      {
        en: [
          'File through the lawyer',
          'The programme has a statutory decision deadline, which makes it the fastest route here.',
        ],
        pt: [
          'Protocolar pelo advogado',
          'O programa tem prazo legal de decisão, o que o torna a rota mais rápida daqui.',
        ],
        es: [
          'Presentar mediante el abogado',
          'El programa tiene un plazo legal de decisión, lo que lo convierte en la vía más rápida de aquí.',
        ],
      },
      {
        en: [
          'Pay the migration and repatriation fees',
          'Government charges, separate from the legal fee.',
        ],
        pt: [
          'Pagar as taxas de migração e de repatriação',
          'Cobranças governamentais, separadas do honorário advocatício.',
        ],
        es: [
          'Pagar las tasas de migración y de repatriación',
          'Cargos gubernamentales, separados del honorario legal.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric registration at migration',
          'Done on your first visit, if the file was submitted while you were abroad.',
        ],
        pt: [
          'Registo biométrico na migração',
          'Feito na sua primeira visita, se o processo foi entregue enquanto você estava no exterior.',
        ],
        es: [
          'Registro biométrico en migración',
          'Se hace en su primera visita, si el expediente se presentó mientras estaba en el extranjero.',
        ],
      },
      {
        en: [
          'Medical certificate from a Panamanian doctor',
          'Part of the standard file, done locally.',
        ],
        pt: [
          'Certificado médico de médico panamenho',
          'Parte do processo padrão, feito localmente.',
        ],
        es: [
          'Certificado médico de un médico panameño',
          'Parte del expediente estándar, hecho localmente.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Receive permanent residence directly',
          'The investor route grants permanent status without a temporary stage.',
        ],
        pt: [
          'Receber residência permanente diretamente',
          'A rota de investidor concede status permanente sem etapa temporária.',
        ],
        es: [
          'Recibir la residencia permanente directamente',
          'La vía de inversor concede el estatus permanente sin etapa temporal.',
        ],
      },
      {
        en: [
          'Collect the cédula on a visit to Panama',
          'The identity card requires you to be present at least once.',
        ],
        pt: [
          'Retirar a cédula numa visita ao Panamá',
          'A cédula de identidade exige que você esteja presente ao menos uma vez.',
        ],
        es: [
          'Recoger la cédula en una visita a Panamá',
          'La cédula de identidad exige que esté presente al menos una vez.',
        ],
      },
      {
        en: [
          'Hold the investment for the full five years',
          'Migration verifies it, and disposing of the asset early can revoke the residence.',
        ],
        pt: [
          'Manter o investimento pelos cinco anos completos',
          'A migração verifica isso, e desfazer-se do ativo antes pode revogar a residência.',
        ],
        es: [
          'Mantener la inversión los cinco años completos',
          'Migración lo verifica, y deshacerse del activo antes puede revocar la residencia.',
        ],
      },
      {
        en: [
          'Consider naturalisation after five years',
          'Panamanian nationality is available after five years of permanent residence, and it requires renouncing the previous one.',
        ],
        pt: [
          'Avaliar a naturalização após cinco anos',
          'A nacionalidade panamenha está disponível após cinco anos de residência permanente, e exige renunciar à anterior.',
        ],
        es: [
          'Evaluar la naturalización tras cinco años',
          'La nacionalidad panameña está disponible tras cinco años de residencia permanente, y exige renunciar a la anterior.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
