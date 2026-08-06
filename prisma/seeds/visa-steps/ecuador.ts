import type { CountryVisaSteps } from './types';

/**
 * Steps for Ecuador.
 *
 * The human mobility law is unusually generous on paper — the Mercosur
 * agreement applies here as an associate state, and residence is granted on
 * nationality alone — but the practical constraint is the absence limit. A
 * temporary resident who spends more than ninety days outside Ecuador in the
 * first two years loses the status, and that catches more people than any
 * document ever does.
 *
 * The country is dollarised, so financial thresholds are stated in US dollars
 * and tied to the national basic salary.
 */
export const ecuador: CountryVisaSteps = {
  'Tourist Entry': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Valid for at least six months. Most nationalities enter visa-free for tourism.',
        ],
        pt: [
          'Passaporte válido',
          'Válido por pelo menos seis meses. A maioria das nacionalidades entra sem visto a turismo.',
        ],
        es: [
          'Pasaporte vigente',
          'Vigente al menos seis meses. La mayoría de las nacionalidades entra sin visado a turismo.',
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
          'Visa-free entry needs no advance application.',
        ],
        pt: [
          'Pedir no consulado só se houver exigência de visto',
          'A entrada isenta não exige pedido prévio.',
        ],
        es: [
          'Solicitar en el consulado solo si se exige visado',
          'La entrada exenta no requiere solicitud previa.',
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
          'Health insurance valid in Ecuador',
          'Compulsory for foreigners on paper, and checked in practice when you apply for a residence.',
        ],
        pt: [
          'Seguro de saúde válido no Equador',
          'Obrigatório para estrangeiros no papel, e conferido na prática quando você pede uma residência.',
        ],
        es: [
          'Seguro de salud válido en Ecuador',
          'Obligatorio para extranjeros sobre el papel, y se comprueba en la práctica al solicitar una residencia.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Note the stay granted at the border',
          'Ninety days as a rule, extendable to a longer total within the same year.',
        ],
        pt: [
          'Anotar o prazo concedido na fronteira',
          'Noventa dias como regra, prorrogáveis para um total maior dentro do mesmo ano.',
        ],
        es: [
          'Anotar el plazo concedido en la frontera',
          'Noventa días como regla, prorrogables a un total mayor dentro del mismo año.',
        ],
      },
      {
        en: [
          'Do not work as a tourist',
          'Paid activity requires a residence visa, whatever the arrangement.',
        ],
        pt: [
          'Não trabalhar como turista',
          'Atividade remunerada exige visto de residência, seja qual for o arranjo.',
        ],
        es: [
          'No trabajar como turista',
          'La actividad remunerada exige un visado de residencia, sea cual sea el arreglo.',
        ],
      },
      {
        en: [
          'Start the residence application from inside the country if you plan to stay',
          'Ecuador allows the change from inside, which removes the need to go home and wait.',
        ],
        pt: [
          'Iniciar o pedido de residência de dentro do país, se pretende ficar',
          'O Equador permite a mudança de dentro, o que elimina a necessidade de voltar e esperar.',
        ],
        es: [
          'Iniciar la solicitud de residencia desde dentro del país si piensa quedarse',
          'Ecuador permite el cambio desde dentro, lo que elimina la necesidad de volver y esperar.',
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
          'Proving nationality of a Mercosur member or associate state. Ecuador applies the agreement as an associate, so nationality alone is the ground.',
        ],
        pt: [
          'Passaporte ou documento nacional de identidade',
          'Comprovando nacionalidade de Estado membro ou associado do Mercosul. O Equador aplica o acordo como associado, então a nacionalidade sozinha é o fundamento.',
        ],
        es: [
          'Pasaporte o documento nacional de identidad',
          'Que acredite la nacionalidad de un Estado miembro o asociado del Mercosur. Ecuador aplica el acuerdo como asociado, así que la nacionalidad sola es el fundamento.',
        ],
      },
      {
        en: [
          'Birth certificate, apostilled',
          'Apostilled in the country of issue, with a certified translation if not in Spanish.',
        ],
        pt: [
          'Certidão de nascimento apostilada',
          'Apostilada no país de emissão, com tradução certificada se não estiver em espanhol.',
        ],
        es: [
          'Partida de nacimiento apostillada',
          'Apostillada en el país de emisión, con traducción certificada si no está en español.',
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
          'Record of the legal entry into Ecuador',
          'The migration movement certificate, showing you entered lawfully.',
        ],
        pt: [
          'Registo da entrada legal no Equador',
          'O certificado de movimento migratório, mostrando que você entrou legalmente.',
        ],
        es: [
          'Registro del ingreso legal a Ecuador',
          'El certificado de movimiento migratorio, que muestra que ingresó legalmente.',
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
          'Pay the application and visa fees',
          'Two charges, both stated in US dollars since the country is dollarised.',
        ],
        pt: [
          'Pagar as taxas de solicitação e de visto',
          'Duas cobranças, ambas em dólares, já que o país é dolarizado.',
        ],
        es: [
          'Pagar las tasas de solicitud y de visado',
          'Dos cargos, ambos en dólares, ya que el país está dolarizado.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File on the foreign ministry platform',
          'The application is made online and completed at a migration office.',
        ],
        pt: [
          'Protocolar na plataforma da chancelaria',
          'O pedido é feito online e completado num escritório de migração.',
        ],
        es: [
          'Presentar en la plataforma de la cancillería',
          'La solicitud se hace en línea y se completa en una oficina de migración.',
        ],
      },
      {
        en: [
          'Receive the two-year temporary residence',
          'The Mercosur route grants a temporary residence first; permanent comes after it.',
        ],
        pt: [
          'Receber a residência temporária de dois anos',
          'A rota Mercosul concede primeiro uma residência temporária; a permanente vem depois.',
        ],
        es: [
          'Recibir la residencia temporaria de dos años',
          'La vía Mercosur concede primero una residencia temporaria; la permanente viene después.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Health insurance valid in Ecuador',
          'Compulsory for the whole period of the residence, public or private.',
        ],
        pt: [
          'Seguro de saúde válido no Equador',
          'Obrigatório por todo o período da residência, público ou privado.',
        ],
        es: [
          'Seguro de salud válido en Ecuador',
          'Obligatorio durante todo el periodo de la residencia, público o privado.',
        ],
      },
      {
        en: [
          'Biometric registration for the identity card',
          'Taken when the cédula is issued.',
        ],
        pt: ['Registo biométrico para a cédula', 'Feito na emissão da cédula.'],
        es: [
          'Registro biométrico para la cédula',
          'Se realiza al emitir la cédula.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Register the visa and get the cédula',
          'The Ecuadorian identity card, which is what banks, employers and services ask for.',
        ],
        pt: [
          'Registar o visto e obter a cédula',
          'A identidade equatoriana, que é o que bancos, empregadores e serviços pedem.',
        ],
        es: [
          'Registrar el visado y obtener la cédula',
          'El documento de identidad ecuatoriano, que es lo que piden bancos, empleadores y servicios.',
        ],
      },
      {
        en: [
          'Do not spend more than ninety days a year outside Ecuador',
          'In the first two years of temporary residence this limit applies, and exceeding it costs the status. It is the most common way people lose it.',
        ],
        pt: [
          'Não passar mais de noventa dias por ano fora do Equador',
          'Nos dois primeiros anos de residência temporária esse limite se aplica, e ultrapassá-lo custa o status. É a forma mais comum de perdê-lo.',
        ],
        es: [
          'No pasar más de noventa días al año fuera de Ecuador',
          'En los dos primeros años de residencia temporaria este límite aplica, y excederlo cuesta el estatus. Es la forma más común de perderlo.',
        ],
      },
      {
        en: [
          'Register with social security if you work',
          'Affiliation to the IESS is compulsory for registered employment.',
        ],
        pt: [
          'Inscrever-se na seguridade social se trabalhar',
          'A filiação ao IESS é obrigatória para emprego registado.',
        ],
        es: [
          'Inscribirse en la seguridad social si trabaja',
          'La afiliación al IESS es obligatoria para el empleo registrado.',
        ],
        priority: 2,
      },
      {
        en: [
          'Apply for permanent residence before the two years end',
          'The conversion is requested in the window before expiry.',
        ],
        pt: [
          'Pedir a residência permanente antes dos dois anos',
          'A conversão é pedida na janela anterior ao vencimento.',
        ],
        es: [
          'Solicitar la residencia permanente antes de los dos años',
          'La conversión se solicita en la ventana previa al vencimiento.',
        ],
      },
    ],
  },

  'Temporary Resident Visa': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Valid for at least six months beyond the visa period requested.',
        ],
        pt: [
          'Passaporte válido',
          'Válido por pelo menos seis meses além do período de visto pedido.',
        ],
        es: [
          'Pasaporte vigente',
          'Vigente al menos seis meses más allá del periodo de visado solicitado.',
        ],
      },
      {
        en: [
          'Criminal record certificate, apostilled',
          'From every country you lived in over the last five years, with a certified translation.',
        ],
        pt: [
          'Certidão de antecedentes penais apostilada',
          'De todo país onde você morou nos últimos cinco anos, com tradução certificada.',
        ],
        es: [
          'Certificado de antecedentes penales apostillado',
          'De todo país donde haya vivido en los últimos cinco años, con traducción certificada.',
        ],
      },
      {
        en: [
          'Document supporting the visa category',
          'A work contract, a pension certificate, an investment record, an enrolment certificate or the family tie.',
        ],
        pt: [
          'Documento que sustenta a categoria do visto',
          'Contrato de trabalho, certificado de aposentadoria, registo de investimento, certificado de matrícula ou o vínculo familiar.',
        ],
        es: [
          'Documento que sustenta la categoría del visado',
          'Contrato de trabajo, certificado de pensión, registro de inversión, certificado de matrícula o el vínculo familiar.',
        ],
      },
      {
        en: [
          'Record of the legal entry into Ecuador',
          'The migration movement certificate, if applying from inside the country.',
        ],
        pt: [
          'Registo da entrada legal no Equador',
          'O certificado de movimento migratório, se estiver pedindo de dentro do país.',
        ],
        es: [
          'Registro del ingreso legal a Ecuador',
          'El certificado de movimiento migratorio, si solicita desde dentro del país.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Diplomas for regulated professions',
          'Practising requires the qualification to be registered with the higher education authority.',
        ],
        pt: [
          'Diplomas para profissões regulamentadas',
          'Exercer exige registo da qualificação na autoridade de ensino superior.',
        ],
        es: [
          'Títulos para profesiones reguladas',
          'Ejercer exige registrar la titulación ante la autoridad de educación superior.',
        ],
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Income or assets at the threshold for the category',
          'Set as a multiple of the national basic salary and stated in US dollars, so it moves each year.',
        ],
        pt: [
          'Renda ou patrimônio no piso da categoria',
          'Definido como múltiplo do salário básico nacional e expresso em dólares, então muda a cada ano.',
        ],
        es: [
          'Ingresos o patrimonio en el umbral de la categoría',
          'Se fija como múltiplo del salario básico nacional y se expresa en dólares, así que cambia cada año.',
        ],
      },
      {
        en: [
          'Certified proof of a pension for the rentista category',
          'Issued by the paying institution, apostilled and translated.',
        ],
        pt: [
          'Comprovação certificada de aposentadoria na categoria rentista',
          'Emitida pela instituição pagadora, apostilada e traduzida.',
        ],
        es: [
          'Prueba certificada de una pensión en la categoría rentista',
          'Emitida por la institución pagadora, apostillada y traducida.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Pay the application and visa fees',
          'Two separate charges, in US dollars.',
        ],
        pt: [
          'Pagar as taxas de solicitação e de visto',
          'Duas cobranças distintas, em dólares.',
        ],
        es: [
          'Pagar las tasas de solicitud y de visado',
          'Dos cargos distintos, en dólares.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File on the foreign ministry platform',
          'From inside Ecuador or at a consulate abroad; both are allowed.',
        ],
        pt: [
          'Protocolar na plataforma da chancelaria',
          'De dentro do Equador ou num consulado no exterior; ambos são permitidos.',
        ],
        es: [
          'Presentar en la plataforma de la cancillería',
          'Desde dentro de Ecuador o en un consulado en el exterior; ambos están permitidos.',
        ],
      },
      {
        en: [
          'Attend the appointment to present originals',
          'Apostilles and translations are checked carefully.',
        ],
        pt: [
          'Comparecer ao atendimento para apresentar originais',
          'Apostilas e traduções são conferidas com cuidado.',
        ],
        es: [
          'Acudir a la cita para presentar originales',
          'Las apostillas y traducciones se revisan con cuidado.',
        ],
      },
      {
        en: [
          'Register the visa within the deadline given',
          'Registration after the visa is granted is a separate step and it has its own short deadline.',
        ],
        pt: [
          'Registar o visto dentro do prazo indicado',
          'O registo após a concessão é um passo à parte e tem prazo curto próprio.',
        ],
        es: [
          'Registrar el visado dentro del plazo indicado',
          'El registro tras la concesión es un paso aparte y tiene su propio plazo corto.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Health insurance valid in Ecuador',
          'Compulsory for the whole period of the residence.',
        ],
        pt: [
          'Seguro de saúde válido no Equador',
          'Obrigatório por todo o período da residência.',
        ],
        es: [
          'Seguro de salud válido en Ecuador',
          'Obligatorio durante todo el periodo de la residencia.',
        ],
      },
      {
        en: [
          'Biometric registration for the identity card',
          'Taken when the cédula is issued.',
        ],
        pt: ['Registo biométrico para a cédula', 'Feito na emissão da cédula.'],
        es: [
          'Registro biométrico para la cédula',
          'Se realiza al emitir la cédula.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Register the visa and get the cédula',
          'Without the cédula the visa is of little practical use.',
        ],
        pt: [
          'Registar o visto e obter a cédula',
          'Sem a cédula o visto tem pouca utilidade prática.',
        ],
        es: [
          'Registrar el visado y obtener la cédula',
          'Sin la cédula el visado tiene poca utilidad práctica.',
        ],
      },
      {
        en: [
          'Do not spend more than ninety days a year outside Ecuador',
          'The absence limit applies through the two years of temporary residence and exceeding it costs the status.',
        ],
        pt: [
          'Não passar mais de noventa dias por ano fora do Equador',
          'O limite de ausência vale ao longo dos dois anos de residência temporária, e ultrapassá-lo custa o status.',
        ],
        es: [
          'No pasar más de noventa días al año fuera de Ecuador',
          'El límite de ausencia rige durante los dos años de residencia temporaria, y excederlo cuesta el estatus.',
        ],
      },
      {
        en: [
          'Keep the health insurance current',
          'It is checked again when the residence is renewed or converted.',
        ],
        pt: [
          'Manter o seguro de saúde em dia',
          'Ele é conferido de novo na renovação ou na conversão da residência.',
        ],
        es: [
          'Mantener vigente el seguro de salud',
          'Se comprueba de nuevo al renovar o convertir la residencia.',
        ],
        priority: 2,
      },
      {
        en: [
          'Apply for permanent residence before the two years end',
          'Requested in the window before expiry, with the absence record clean.',
        ],
        pt: [
          'Pedir a residência permanente antes dos dois anos',
          'Pedida na janela anterior ao vencimento, com o histórico de ausências limpo.',
        ],
        es: [
          'Solicitar la residencia permanente antes de los dos años',
          'Se solicita en la ventana previa al vencimiento, con el historial de ausencias limpio.',
        ],
      },
    ],
  },

  'Permanent Resident Visa': {
    core_documents: [
      {
        en: [
          'Valid passport and current cédula',
          'Applied for from inside Ecuador, holding a valid temporary residence.',
        ],
        pt: [
          'Passaporte válido e cédula atual',
          'Pedida de dentro do Equador, com residência temporária válida.',
        ],
        es: [
          'Pasaporte vigente y cédula actual',
          'Se solicita desde dentro de Ecuador, con residencia temporaria vigente.',
        ],
      },
      {
        en: [
          'Evidence of at least twenty-one months of temporary residence',
          'The conversion opens before the two years are complete, which is why the window matters.',
        ],
        pt: [
          'Comprovação de pelo menos vinte e um meses de residência temporária',
          'A conversão abre antes de completar os dois anos, e é por isso que a janela importa.',
        ],
        es: [
          'Prueba de al menos veintiún meses de residencia temporaria',
          'La conversión se abre antes de completar los dos años, y por eso la ventana importa.',
        ],
      },
      {
        en: [
          'Migration movement certificate',
          'Showing you stayed within the ninety-day annual absence limit.',
        ],
        pt: [
          'Certificado de movimento migratório',
          'Mostrando que você ficou dentro do limite anual de noventa dias de ausência.',
        ],
        es: [
          'Certificado de movimiento migratorio',
          'Que muestre que se mantuvo dentro del límite anual de noventa días de ausencia.',
        ],
      },
      {
        en: [
          'Ecuadorian criminal record certificate',
          'Issued locally and valid for a short period.',
        ],
        pt: [
          'Certidão de antecedentes penais equatoriana',
          'Emitida localmente e válida por período curto.',
        ],
        es: [
          'Certificado de antecedentes penales ecuatoriano',
          'Se emite localmente y vale poco tiempo.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence of means of living',
          'Employment, self-employment or the certified income that supported the temporary stage.',
        ],
        pt: [
          'Comprovação de meios de vida',
          'Emprego, atividade autônoma ou a renda certificada que sustentou a etapa temporária.',
        ],
        es: [
          'Prueba de medios de vida',
          'Empleo, actividad por cuenta propia o la renta certificada que sustentó la etapa temporal.',
        ],
      },
      {
        en: [
          'Pay the application and visa fees',
          'Charged again for the permanent stage.',
        ],
        pt: [
          'Pagar as taxas de solicitação e de visto',
          'Cobradas novamente na etapa permanente.',
        ],
        es: [
          'Pagar las tasas de solicitud y de visado',
          'Se cobran de nuevo en la etapa permanente.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File on the foreign ministry platform',
          'In the window before the temporary residence expires.',
        ],
        pt: [
          'Protocolar na plataforma da chancelaria',
          'Na janela anterior ao vencimento da residência temporária.',
        ],
        es: [
          'Presentar en la plataforma de la cancillería',
          'En la ventana previa al vencimiento de la residencia temporaria.',
        ],
      },
      {
        en: [
          'Do not let the temporary residence lapse',
          'Losing it means going back to the start rather than converting.',
        ],
        pt: [
          'Não deixar a residência temporária caducar',
          'Perdê-la significa voltar ao início, em vez de converter.',
        ],
        es: [
          'No dejar caducar la residencia temporaria',
          'Perderla implica volver al inicio, en lugar de convertir.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Health insurance still current',
          'Checked again at the conversion.',
        ],
        pt: [
          'Seguro de saúde ainda vigente',
          'Conferido novamente na conversão.',
        ],
        es: [
          'Seguro de salud aún vigente',
          'Se comprueba de nuevo en la conversión.',
        ],
      },
      {
        en: [
          'Biometric registration for the new card',
          'Taken when the permanent cédula is issued.',
        ],
        pt: [
          'Registo biométrico para a nova cédula',
          'Feito na emissão da cédula permanente.',
        ],
        es: [
          'Registro biométrico para la nueva cédula',
          'Se realiza al emitir la cédula permanente.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Register the permanent visa and get the new cédula',
          'The status no longer expires.',
        ],
        pt: [
          'Registar o visto permanente e obter a nova cédula',
          'O status deixa de vencer.',
        ],
        es: [
          'Registrar el visado permanente y obtener la nueva cédula',
          'El estatus deja de caducar.',
        ],
      },
      {
        en: [
          'Note that the absence limit relaxes but does not disappear',
          'Permanent residents may be outside Ecuador longer, but a continuous absence of over two years still ends the status.',
        ],
        pt: [
          'Saber que o limite de ausência afrouxa mas não some',
          'Residentes permanentes podem ficar mais tempo fora, mas uma ausência contínua superior a dois anos ainda encerra o status.',
        ],
        es: [
          'Saber que el límite de ausencia se relaja pero no desaparece',
          'Los residentes permanentes pueden estar más tiempo fuera, pero una ausencia continua superior a dos años aún extingue el estatus.',
        ],
      },
      {
        en: [
          'Consider naturalisation after three years',
          'Ecuadorian nationality is available after three years of residence, and the constitution allows dual nationality.',
        ],
        pt: [
          'Avaliar a naturalização após três anos',
          'A nacionalidade equatoriana está disponível após três anos de residência, e a constituição permite dupla nacionalidade.',
        ],
        es: [
          'Evaluar la naturalización tras tres años',
          'La nacionalidad ecuatoriana está disponible tras tres años de residencia, y la constitución permite la doble nacionalidad.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
