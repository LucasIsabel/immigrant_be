import type { CountryVisaSteps } from './types';

/**
 * Steps for Paraguay.
 *
 * Paraguay is among the most accessible countries in the region: the Mercosur
 * agreement grants residence on nationality alone, and even the ordinary route
 * has a low financial threshold. The permanent residence that used to be
 * granted almost immediately now runs through a temporary stage first, so
 * guidance promising instant permanent residence is out of date.
 *
 * Everything is filed with the Dirección General de Migraciones, and the cédula
 * de identidad is what turns the residence into something usable.
 */
export const paraguay: CountryVisaSteps = {
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
          'National identity document for Mercosur nationals',
          'Citizens of member and associate states may enter with their ID card.',
        ],
        pt: [
          'Documento nacional de identidade para nacionais do Mercosul',
          'Cidadãos de Estados membros e associados podem entrar com a carteira de identidade.',
        ],
        es: [
          'Documento nacional de identidad para nacionales del Mercosur',
          'Los ciudadanos de Estados miembros y asociados pueden entrar con su documento de identidad.',
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
    ],
    submission_fees: [
      {
        en: [
          'Apply at the consulate only if a visa is required',
          'Some nationalities can obtain a visa on arrival; confirm before travelling.',
        ],
        pt: [
          'Pedir no consulado só se houver exigência de visto',
          'Algumas nacionalidades conseguem visto na chegada; confirme antes de viajar.',
        ],
        es: [
          'Solicitar en el consulado solo si se exige visado',
          'Algunas nacionalidades pueden obtener visado a la llegada; confírmelo antes de viajar.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Migration registration at the border',
          'Entry and exit are recorded.',
        ],
        pt: [
          'Registo migratório na fronteira',
          'Entrada e saída são registadas.',
        ],
        es: [
          'Registro migratorio en la frontera',
          'La entrada y la salida se registran.',
        ],
      },
      {
        en: [
          'Travel medical insurance',
          'Not compulsory, but there is no free public care for tourists.',
        ],
        pt: [
          'Seguro médico de viagem',
          'Não é obrigatório, mas não há atendimento público gratuito para turistas.',
        ],
        es: [
          'Seguro médico de viaje',
          'No es obligatorio, pero no hay atención pública gratuita para turistas.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Note the stay granted at the border',
          'Usually ninety days, extendable once at the migration office.',
        ],
        pt: [
          'Anotar o prazo concedido na fronteira',
          'Em geral noventa dias, prorrogáveis uma vez no órgão de migração.',
        ],
        es: [
          'Anotar el plazo concedido en la frontera',
          'Por lo general noventa días, prorrogables una vez ante migración.',
        ],
      },
      {
        en: [
          'Do not work as a tourist',
          'Paid activity requires a residence, even one still being processed.',
        ],
        pt: [
          'Não trabalhar como turista',
          'Atividade remunerada exige residência, ainda que em processamento.',
        ],
        es: [
          'No trabajar como turista',
          'La actividad remunerada exige una residencia, aunque esté en trámite.',
        ],
      },
      {
        en: [
          'Start the residence application from inside the country if you plan to stay',
          'Paraguay allows it while you are on a tourist entry.',
        ],
        pt: [
          'Iniciar o pedido de residência de dentro do país, se pretende ficar',
          'O Paraguai permite isso enquanto você está com entrada de turista.',
        ],
        es: [
          'Iniciar la solicitud de residencia desde dentro del país si piensa quedarse',
          'Paraguay lo permite mientras está con entrada de turista.',
        ],
        priority: 2,
      },
    ],
  },

  'Mercosur Residence': {
    core_documents: [
      {
        en: [
          'Passport or national identity document',
          'Proving nationality of a Mercosur member or associate state, which is the whole basis of this route.',
        ],
        pt: [
          'Passaporte ou documento nacional de identidade',
          'Comprovando nacionalidade de Estado membro ou associado do Mercosul, que é toda a base desta rota.',
        ],
        es: [
          'Pasaporte o documento nacional de identidad',
          'Que acredite la nacionalidad de un Estado miembro o asociado del Mercosur, que es toda la base de esta vía.',
        ],
      },
      {
        en: [
          'Birth certificate, apostilled',
          'Apostilled in the country of issue; documents in Spanish and Portuguese are accepted without translation.',
        ],
        pt: [
          'Certidão de nascimento apostilada',
          'Apostilada no país de emissão; documentos em espanhol e português são aceites sem tradução.',
        ],
        es: [
          'Partida de nacimiento apostillada',
          'Apostillada en el país de emisión; los documentos en español y portugués se aceptan sin traducción.',
        ],
      },
      {
        en: [
          'Criminal record certificate from your country',
          'Apostilled, covering the last five years of residence.',
        ],
        pt: [
          'Certidão de antecedentes penais do seu país',
          'Apostilada, cobrindo os últimos cinco anos de residência.',
        ],
        es: [
          'Certificado de antecedentes penales de su país',
          'Apostillado, cubriendo los últimos cinco años de residencia.',
        ],
      },
      {
        en: [
          'Paraguayan criminal record certificate',
          'Obtained locally, from the police and the judiciary.',
        ],
        pt: [
          'Certidão de antecedentes penais paraguaia',
          'Obtida localmente, na polícia e no judiciário.',
        ],
        es: [
          'Certificado de antecedentes penales paraguayo',
          'Se obtiene localmente, en la policía y el poder judicial.',
        ],
      },
      {
        en: [
          'Sworn declaration of entry and of no criminal record',
          'Signed before a notary in Paraguay.',
        ],
        pt: [
          'Declaração juramentada de entrada e de ausência de antecedentes',
          'Assinada perante escrivão no Paraguai.',
        ],
        es: [
          'Declaración jurada de ingreso y de ausencia de antecedentes',
          'Firmada ante escribano en Paraguay.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'No proof of income is required',
          'The Mercosur route grants residence on nationality alone, with no job offer or minimum income.',
        ],
        pt: [
          'Não é exigida comprovação de renda',
          'A rota Mercosul concede residência apenas pela nacionalidade, sem oferta de emprego nem renda mínima.',
        ],
        es: [
          'No se exige prueba de ingresos',
          'La vía Mercosur concede la residencia solo por la nacionalidad, sin oferta de empleo ni ingreso mínimo.',
        ],
        required: false,
      },
      {
        en: [
          'Pay the migration fees',
          'Modest compared with most countries, paid before the file is analysed.',
        ],
        pt: [
          'Pagar as taxas de migração',
          'Modestas em comparação com a maioria dos países, pagas antes da análise do processo.',
        ],
        es: [
          'Pagar las tasas de migración',
          'Modestas en comparación con la mayoría de los países, se pagan antes de analizar el expediente.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File with the migration directorate',
          'The application is made in person in Asunción or at a regional office.',
        ],
        pt: [
          'Protocolar na direção de migrações',
          'O pedido é feito presencialmente em Assunção ou num escritório regional.',
        ],
        es: [
          'Presentar ante la dirección de migraciones',
          'La solicitud se hace en persona en Asunción o en una oficina regional.',
        ],
      },
      {
        en: [
          'Receive the two-year temporary residence',
          'The Mercosur route now grants a temporary residence first; permanent comes after it.',
        ],
        pt: [
          'Receber a residência temporária de dois anos',
          'A rota Mercosul agora concede primeiro uma residência temporária; a permanente vem depois dela.',
        ],
        es: [
          'Recibir la residencia temporaria de dos años',
          'La vía Mercosur ahora concede primero una residencia temporaria; la permanente viene después.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical certificate from a Paraguayan doctor',
          'A local health check, not a certificate brought from abroad.',
        ],
        pt: [
          'Certificado médico de médico paraguaio',
          'Um exame de saúde local, não um certificado trazido de fora.',
        ],
        es: [
          'Certificado médico de un médico paraguayo',
          'Un examen de salud local, no un certificado traído del exterior.',
        ],
      },
      {
        en: [
          'Fingerprints for the identity card',
          'Taken when the cédula is issued.',
        ],
        pt: [
          'Impressões digitais para a cédula de identidade',
          'Recolhidas na emissão da cédula.',
        ],
        es: [
          'Huellas dactilares para la cédula de identidad',
          'Se toman al emitir la cédula.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Get the cédula de identidad',
          'The Paraguayan ID card, which is what banks, employers and services actually ask for.',
        ],
        pt: [
          'Obter a cédula de identidad',
          'A identidade paraguaia, que é o que bancos, empregadores e serviços de fato pedem.',
        ],
        es: [
          'Obtener la cédula de identidad',
          'El documento paraguayo, que es lo que bancos, empleadores y servicios realmente piden.',
        ],
      },
      {
        en: [
          'Get a tax identification number',
          'The RUC is needed to invoice or to be registered as an employee.',
        ],
        pt: [
          'Obter o número de identificação fiscal',
          'O RUC é necessário para emitir nota ou ser registado como empregado.',
        ],
        es: [
          'Obtener el número de identificación fiscal',
          'El RUC es necesario para facturar o estar registrado como empleado.',
        ],
        priority: 2,
      },
      {
        en: [
          'Convert to permanent residence after the temporary period',
          'Requested before the two years expire, with updated certificates.',
        ],
        pt: [
          'Converter para residência permanente após o período temporário',
          'Pedida antes de os dois anos vencerem, com certidões atualizadas.',
        ],
        es: [
          'Convertir a residencia permanente tras el periodo temporal',
          'Se solicita antes de que venzan los dos años, con certificados actualizados.',
        ],
      },
    ],
  },

  'Temporary Residence': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'This is the route for nationals outside Mercosur; check that route first if you might qualify.',
        ],
        pt: [
          'Passaporte válido',
          'Esta é a rota para nacionais de fora do Mercosul; confira antes aquela rota se você puder qualificar.',
        ],
        es: [
          'Pasaporte vigente',
          'Esta es la vía para nacionales de fuera del Mercosur; compruebe antes esa vía si pudiera calificar.',
        ],
      },
      {
        en: [
          'Birth certificate, apostilled and translated',
          'Translated by a sworn translator registered in Paraguay if not in Spanish.',
        ],
        pt: [
          'Certidão de nascimento apostilada e traduzida',
          'Traduzida por tradutor juramentado registado no Paraguai se não estiver em espanhol.',
        ],
        es: [
          'Partida de nacimiento apostillada y traducida',
          'Traducida por traductor jurado registrado en Paraguay si no está en español.',
        ],
      },
      {
        en: [
          'Criminal record certificates',
          'From your country of origin, apostilled, and from Paraguay.',
        ],
        pt: [
          'Certidões de antecedentes penais',
          'Do país de origem, apostilada, e do Paraguai.',
        ],
        es: [
          'Certificados de antecedentes penales',
          'Del país de origen, apostillado, y de Paraguay.',
        ],
      },
      {
        en: [
          'Document supporting the ground for the stay',
          'An employment contract, an enrolment certificate, an investment record, or evidence of the family tie.',
        ],
        pt: [
          'Documento que sustenta o fundamento da estada',
          'Contrato de trabalho, certificado de matrícula, registo de investimento, ou comprovação do vínculo familiar.',
        ],
        es: [
          'Documento que sustenta el fundamento de la estancia',
          'Contrato de trabajo, certificado de inscripción, registro de inversión, o prueba del vínculo familiar.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of lawful means of living',
          'A bank deposit, regular income or an investment. The threshold is low by regional standards but it does exist.',
        ],
        pt: [
          'Comprovação de meios de vida lícitos',
          'Depósito bancário, renda regular ou investimento. O piso é baixo para o padrão regional, mas existe.',
        ],
        es: [
          'Prueba de medios de vida lícitos',
          'Un depósito bancario, ingresos regulares o una inversión. El umbral es bajo para el estándar regional, pero existe.',
        ],
      },
      {
        en: [
          'Pay the migration fees',
          'Charged for the application and again for the identity card.',
        ],
        pt: [
          'Pagar as taxas de migração',
          'Cobradas pelo pedido e novamente pela cédula de identidade.',
        ],
        es: [
          'Pagar las tasas de migración',
          'Se cobran por la solicitud y de nuevo por la cédula de identidad.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File with the migration directorate in person',
          'The application can be started while you are in the country on a tourist entry.',
        ],
        pt: [
          'Protocolar presencialmente na direção de migrações',
          'O pedido pode ser iniciado enquanto você está no país com entrada de turista.',
        ],
        es: [
          'Presentar en persona ante la dirección de migraciones',
          'La solicitud puede iniciarse mientras está en el país con entrada de turista.',
        ],
      },
      {
        en: [
          'Expect a longer decision than the Mercosur route',
          'The ordinary route requires more evidence and takes correspondingly longer.',
        ],
        pt: [
          'Contar com decisão mais demorada que na rota Mercosul',
          'A rota comum exige mais comprovação e leva proporcionalmente mais tempo.',
        ],
        es: [
          'Contar con una decisión más lenta que en la vía Mercosur',
          'La vía ordinaria exige más pruebas y tarda proporcionalmente más.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Medical certificate from a Paraguayan doctor',
          'A local health check; a certificate from abroad is not accepted.',
        ],
        pt: [
          'Certificado médico de médico paraguaio',
          'Um exame de saúde local; certificado trazido de fora não é aceite.',
        ],
        es: [
          'Certificado médico de un médico paraguayo',
          'Un examen de salud local; un certificado del exterior no se acepta.',
        ],
      },
      {
        en: [
          'Fingerprints for the identity card',
          'Taken when the cédula is issued.',
        ],
        pt: [
          'Impressões digitais para a cédula de identidade',
          'Recolhidas na emissão da cédula.',
        ],
        es: [
          'Huellas dactilares para la cédula de identidad',
          'Se toman al emitir la cédula.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Get the cédula de identidad',
          'Issued with the same validity as the residence granted.',
        ],
        pt: [
          'Obter a cédula de identidad',
          'Emitida com a mesma validade da residência concedida.',
        ],
        es: [
          'Obtener la cédula de identidad',
          'Se emite con la misma validez que la residencia concedida.',
        ],
      },
      {
        en: [
          'Get a RUC to work or invoice',
          'Required to be registered formally, whether employed or self-employed.',
        ],
        pt: [
          'Obter o RUC para trabalhar ou faturar',
          'Necessário para estar registado formalmente, como empregado ou autônomo.',
        ],
        es: [
          'Obtener el RUC para trabajar o facturar',
          'Necesario para estar registrado formalmente, como empleado o autónomo.',
        ],
      },
      {
        en: [
          'Renew before the residence expires',
          'Continuity is what leads to the permanent stage.',
        ],
        pt: [
          'Renovar antes de a residência vencer',
          'A continuidade é o que leva à etapa permanente.',
        ],
        es: [
          'Renovar antes de que venza la residencia',
          'La continuidad es lo que lleva a la etapa permanente.',
        ],
        priority: 2,
      },
    ],
  },

  'Permanent Residence': {
    core_documents: [
      {
        en: [
          'Valid passport and current cédula',
          'Applied for from inside Paraguay, holding a valid temporary residence.',
        ],
        pt: [
          'Passaporte válido e cédula atual',
          'Pedida de dentro do Paraguai, com residência temporária válida.',
        ],
        es: [
          'Pasaporte vigente y cédula actual',
          'Se solicita desde dentro de Paraguay, con residencia temporaria vigente.',
        ],
      },
      {
        en: [
          'Evidence of the temporary residence period',
          'Normally two years, with the required presence in the country.',
        ],
        pt: [
          'Comprovação do período de residência temporária',
          'Normalmente dois anos, com a presença exigida no país.',
        ],
        es: [
          'Prueba del periodo de residencia temporaria',
          'Normalmente dos años, con la presencia exigida en el país.',
        ],
      },
      {
        en: [
          'Updated criminal record certificates',
          'Paraguayan, and from your country of origin if you spent time there.',
        ],
        pt: [
          'Certidões de antecedentes penais atualizadas',
          'Paraguaia, e do país de origem se você passou tempo lá.',
        ],
        es: [
          'Certificados de antecedentes penales actualizados',
          'Paraguayo, y del país de origen si pasó tiempo allí.',
        ],
      },
      {
        en: [
          'Proof of address in Paraguay',
          'Evidencing that you actually live in the country.',
        ],
        pt: [
          'Comprovante de domicílio no Paraguai',
          'Comprovando que você de fato mora no país.',
        ],
        es: [
          'Comprobante de domicilio en Paraguay',
          'Que acredite que efectivamente vive en el país.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence of means of living',
          'Employment, self-employment or passive income covering the period.',
        ],
        pt: [
          'Comprovação de meios de vida',
          'Emprego, atividade autônoma ou renda passiva cobrindo o período.',
        ],
        es: [
          'Prueba de medios de vida',
          'Empleo, actividad por cuenta propia o renta pasiva que cubran el periodo.',
        ],
      },
      {
        en: [
          'Pay the conversion fees',
          'Charged for the process and for reissuing the identity card.',
        ],
        pt: [
          'Pagar as taxas da conversão',
          'Cobradas pelo processo e pela reemissão da cédula.',
        ],
        es: [
          'Pagar las tasas de la conversión',
          'Se cobran por el trámite y por reemitir la cédula.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File with the migration directorate',
          'Before the temporary residence expires; letting it lapse resets the period.',
        ],
        pt: [
          'Protocolar na direção de migrações',
          'Antes de a residência temporária vencer; deixá-la caducar zera o período.',
        ],
        es: [
          'Presentar ante la dirección de migraciones',
          'Antes de que venza la residencia temporaria; dejarla caducar reinicia el periodo.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Updated medical certificate',
          'From a Paraguayan doctor, as for the temporary stage.',
        ],
        pt: [
          'Certificado médico atualizado',
          'De médico paraguaio, como na etapa temporária.',
        ],
        es: [
          'Certificado médico actualizado',
          'De un médico paraguayo, como en la etapa temporal.',
        ],
      },
      {
        en: [
          'Fingerprints for the new identity card',
          'Taken when the permanent cédula is issued.',
        ],
        pt: [
          'Impressões digitais para a nova cédula',
          'Recolhidas na emissão da cédula permanente.',
        ],
        es: [
          'Huellas dactilares para la nueva cédula',
          'Se toman al emitir la cédula permanente.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Get the permanent cédula',
          'Issued without a residence-linked expiry.',
        ],
        pt: [
          'Obter a cédula permanente',
          'Emitida sem validade atrelada à residência.',
        ],
        es: [
          'Obtener la cédula permanente',
          'Se emite sin vencimiento atado a la residencia.',
        ],
      },
      {
        en: [
          'Keep the tie to the country alive',
          'Permanent residence can be lost through prolonged absence.',
        ],
        pt: [
          'Manter o vínculo com o país vivo',
          'A residência permanente pode ser perdida por ausência prolongada.',
        ],
        es: [
          'Mantener vivo el vínculo con el país',
          'La residencia permanente puede perderse por ausencia prolongada.',
        ],
      },
      {
        en: [
          'Consider naturalisation after three years',
          'Paraguayan nationality is available after three years of permanent residence.',
        ],
        pt: [
          'Avaliar a naturalização após três anos',
          'A nacionalidade paraguaia está disponível após três anos de residência permanente.',
        ],
        es: [
          'Evaluar la naturalización tras tres años',
          'La nacionalidad paraguaya está disponible tras tres años de residencia permanente.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
