import type { CountryVisaSteps } from './types';

/**
 * Steps for Brazil.
 *
 * The migration law replaced the old framework and with it the vocabulary:
 * there is no longer a "permanent visa". A visa only authorises entry; what
 * lets you stay is the autorização de residência, registered with the federal
 * police after arrival. That two-step shape is where most confusion sits.
 *
 * For Mercosur nationals the residence agreement applies here as it does across
 * the bloc — nationality alone is a ground, with no job offer or minimum income
 * required.
 */
export const brazil: CountryVisaSteps = {
  'Visitor Visa (VIVIS)': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Check first whether your nationality needs a visa: much of Europe and South America is exempt, and the exemption lists change with reciprocity policy.',
        ],
        pt: [
          'Passaporte válido',
          'Verifique antes se sua nacionalidade precisa de visto: boa parte da Europa e da América do Sul é isenta, e as listas mudam com a política de reciprocidade.',
        ],
        es: [
          'Pasaporte vigente',
          'Compruebe primero si su nacionalidad necesita visado: buena parte de Europa y Sudamérica está exenta, y las listas cambian con la política de reciprocidad.',
        ],
      },
      {
        en: [
          'Online application on the consular portal',
          'The form is filled in online and produces a receipt that has to be printed.',
        ],
        pt: [
          'Pedido online no portal consular',
          'O formulário é preenchido online e gera um recibo que precisa ser impresso.',
        ],
        es: [
          'Solicitud en línea en el portal consular',
          'El formulario se completa en línea y genera un recibo que debe imprimirse.',
        ],
      },
      {
        en: [
          'Recent photograph',
          'To the specification given on the consular portal.',
        ],
        pt: ['Fotografia recente', 'No padrão indicado no portal consular.'],
        es: [
          'Fotografía reciente',
          'Según el estándar indicado en el portal consular.',
        ],
      },
      {
        en: [
          'Proof of travel and accommodation',
          'Flight reservation and where you will stay, matching the dates declared.',
        ],
        pt: [
          'Comprovação de viagem e alojamento',
          'Reserva de voo e onde vai ficar, coerentes com as datas declaradas.',
        ],
        es: [
          'Prueba de viaje y alojamiento',
          'Reserva de vuelo y dónde se alojará, coherentes con las fechas declaradas.',
        ],
      },
      {
        en: [
          'Yellow fever vaccination certificate',
          'Required by some countries when you leave Brazil, not to enter it. Worth having before travelling to certain regions.',
        ],
        pt: [
          'Certificado de vacinação contra febre amarela',
          'Exigido por alguns países na saída do Brasil, não na entrada. Vale ter antes de viajar para certas regiões.',
        ],
        es: [
          'Certificado de vacunación contra la fiebre amarilla',
          'Lo exigen algunos países al salir de Brasil, no para entrar. Conviene tenerlo antes de viajar a ciertas regiones.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of funds for the stay',
          'Bank statements consistent with the length of the trip.',
        ],
        pt: [
          'Comprovação de recursos para a estada',
          'Extratos bancários coerentes com a duração da viagem.',
        ],
        es: [
          'Prueba de fondos para la estancia',
          'Extractos bancarios coherentes con la duración del viaje.',
        ],
      },
      {
        en: [
          'Letter of invitation for a business visit',
          'From the Brazilian company, stating the purpose and who covers the costs.',
        ],
        pt: [
          'Carta-convite para visita de negócios',
          'Da empresa brasileira, indicando o propósito e quem arca com os custos.',
        ],
        es: [
          'Carta de invitación para visita de negocios',
          'De la empresa brasileña, indicando el propósito y quién cubre los costes.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Complete the application on the consular portal',
          'Only for nationalities that require a visa; exempt travellers apply for nothing.',
        ],
        pt: [
          'Preencher o pedido no portal consular',
          'Apenas para nacionalidades que exigem visto; viajantes isentos não pedem nada.',
        ],
        es: [
          'Completar la solicitud en el portal consular',
          'Solo para nacionalidades que exigen visado; los viajeros exentos no solicitan nada.',
        ],
      },
      {
        en: [
          'Pay the consular fee',
          'The amount follows reciprocity, so it varies sharply by nationality.',
        ],
        pt: [
          'Pagar a taxa consular',
          'O valor segue a reciprocidade, então varia bastante por nacionalidade.',
        ],
        es: [
          'Pagar la tasa consular',
          'El importe sigue la reciprocidad, así que varía bastante según la nacionalidad.',
        ],
      },
      {
        en: [
          'Submit at the consulate or by the accepted channel',
          'Some posts issue electronic visas rather than a sticker in the passport.',
        ],
        pt: [
          'Entregar no consulado ou pelo canal aceito',
          'Alguns postos emitem visto eletrônico em vez de adesivo no passaporte.',
        ],
        es: [
          'Presentar en el consulado o por el canal aceptado',
          'Algunos consulados emiten visado electrónico en lugar de una pegatina en el pasaporte.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric registration at the border',
          'Fingerprints and photograph taken by the federal police on entry.',
        ],
        pt: [
          'Registo biométrico na fronteira',
          'Impressões digitais e fotografia recolhidas pela polícia federal na entrada.',
        ],
        es: [
          'Registro biométrico en la frontera',
          'La policía federal toma huellas y fotografía a la entrada.',
        ],
      },
      {
        en: [
          'Travel medical insurance',
          'Not compulsory, and public emergency care is free for everyone, but private cover is faster.',
        ],
        pt: [
          'Seguro médico de viagem',
          'Não é obrigatório, e o atendimento público de urgência é gratuito para todos, mas a rede privada é mais rápida.',
        ],
        es: [
          'Seguro médico de viaje',
          'No es obligatorio, y la atención pública de urgencia es gratuita para todos, pero la privada es más rápida.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Note the stay granted at the border',
          'Usually up to ninety days, and the total is capped over a twelve-month period.',
        ],
        pt: [
          'Anotar o prazo concedido na fronteira',
          'Em geral até noventa dias, e o total é limitado dentro de um período de doze meses.',
        ],
        es: [
          'Anotar el plazo concedido en la frontera',
          'Por lo general hasta noventa días, y el total está limitado dentro de un periodo de doce meses.',
        ],
      },
      {
        en: [
          'Request an extension at the federal police before it expires',
          'Extension is possible once, up to the annual cap.',
        ],
        pt: [
          'Pedir prorrogação na polícia federal antes do vencimento',
          'A prorrogação é possível uma vez, até o limite anual.',
        ],
        es: [
          'Solicitar prórroga ante la policía federal antes del vencimiento',
          'La prórroga es posible una vez, hasta el tope anual.',
        ],
      },
      {
        en: [
          'Do not work as a visitor',
          'Paid activity requires a residence authorisation, whatever the visa says.',
        ],
        pt: [
          'Não trabalhar como visitante',
          'Atividade remunerada exige autorização de residência, independentemente do que diga o visto.',
        ],
        es: [
          'No trabajar como visitante',
          'La actividad remunerada exige autorización de residencia, diga lo que diga el visado.',
        ],
      },
      {
        en: [
          'Consider requesting residence from inside Brazil',
          'Some grounds, including the Mercosur agreement and family ties, can be requested without leaving the country.',
        ],
        pt: [
          'Avaliar pedir residência de dentro do Brasil',
          'Alguns fundamentos, incluindo o acordo do Mercosul e vínculo familiar, podem ser pedidos sem sair do país.',
        ],
        es: [
          'Evaluar solicitar la residencia desde dentro de Brasil',
          'Algunos fundamentos, incluidos el acuerdo del Mercosur y el vínculo familiar, pueden pedirse sin salir del país.',
        ],
        priority: 2,
        required: false,
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
          'Apostilled in the country of issue and translated by a sworn translator if not in Portuguese or Spanish.',
        ],
        pt: [
          'Certidão de nascimento apostilada',
          'Apostilada no país de emissão e traduzida por tradutor juramentado se não estiver em português ou espanhol.',
        ],
        es: [
          'Partida de nacimiento apostillada',
          'Apostillada en el país de emisión y traducida por traductor jurado si no está en portugués o español.',
        ],
      },
      {
        en: [
          'Criminal record certificates',
          'From every country you lived in over the last five years, apostilled, plus a Brazilian one.',
        ],
        pt: [
          'Certidões de antecedentes criminais',
          'De todo país onde você morou nos últimos cinco anos, apostiladas, mais a brasileira.',
        ],
        es: [
          'Certificados de antecedentes penales',
          'De todo país donde haya vivido en los últimos cinco años, apostillados, más el brasileño.',
        ],
      },
      {
        en: [
          'Sworn declaration of no criminal record abroad',
          'A signed statement covering the period, filed alongside the certificates.',
        ],
        pt: [
          'Declaração de ausência de antecedentes no exterior',
          'Uma declaração assinada cobrindo o período, entregue junto com as certidões.',
        ],
        es: [
          'Declaración jurada de ausencia de antecedentes en el exterior',
          'Una declaración firmada que cubra el periodo, presentada junto con los certificados.',
        ],
      },
      {
        en: [
          'Proof of address in Brazil',
          'A utility bill, lease, or a sworn statement of residence.',
        ],
        pt: [
          'Comprovante de endereço no Brasil',
          'Conta de consumo, contrato de aluguel, ou declaração de residência.',
        ],
        es: [
          'Comprobante de domicilio en Brasil',
          'Factura de servicios, contrato de alquiler, o declaración de residencia.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'No proof of income is required',
          'The Mercosur agreement grants residence on nationality alone — no job offer, no sponsor, no minimum income.',
        ],
        pt: [
          'Não é exigida comprovação de renda',
          'O acordo do Mercosul concede residência apenas pela nacionalidade — sem oferta de emprego, sem patrocinador, sem renda mínima.',
        ],
        es: [
          'No se exige prueba de ingresos',
          'El acuerdo del Mercosur concede la residencia solo por la nacionalidad: sin oferta de empleo, sin patrocinador, sin ingreso mínimo.',
        ],
        required: false,
      },
      {
        en: [
          'Pay the processing and card fees',
          'Two federal charges, paid by GRU before the application is analysed.',
        ],
        pt: [
          'Pagar as taxas de processamento e da carteira',
          'Duas taxas federais, pagas por GRU antes de o pedido ser analisado.',
        ],
        es: [
          'Pagar las tasas de trámite y de la tarjeta',
          'Dos tasas federales, pagadas por GRU antes de que se analice la solicitud.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File the request on the federal police portal',
          'The application is made online and the appointment is booked from the same system.',
        ],
        pt: [
          'Protocolar o pedido no portal da polícia federal',
          'O pedido é feito online e o agendamento sai do mesmo sistema.',
        ],
        es: [
          'Presentar la solicitud en el portal de la policía federal',
          'La solicitud se hace en línea y la cita se reserva desde el mismo sistema.',
        ],
      },
      {
        en: [
          'Attend the federal police appointment',
          'Originals are presented and biometrics are taken there.',
        ],
        pt: [
          'Comparecer ao atendimento na polícia federal',
          'Os originais são apresentados e a biometria é coletada ali.',
        ],
        es: [
          'Acudir a la cita en la policía federal',
          'Allí se presentan los originales y se toma la biometría.',
        ],
      },
      {
        en: [
          'Keep the protocol receipt',
          'It evidences your regular status while the card is produced, and it is what employers accept in the meantime.',
        ],
        pt: [
          'Guardar o protocolo',
          'Ele comprova sua situação regular enquanto a carteira é produzida, e é o que os empregadores aceitam nesse intervalo.',
        ],
        es: [
          'Guardar el resguardo del trámite',
          'Acredita su situación regular mientras se produce la tarjeta, y es lo que aceptan los empleadores entretanto.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection at the federal police',
          'Fingerprints, photograph and signature for the residence card.',
        ],
        pt: [
          'Coleta de dados biométricos na polícia federal',
          'Impressões digitais, fotografia e assinatura para a carteira de residência.',
        ],
        es: [
          'Recogida de datos biométricos en la policía federal',
          'Huellas, fotografía y firma para la tarjeta de residencia.',
        ],
      },
      {
        en: [
          'Access to public healthcare',
          'The public system covers everyone in the country regardless of status, so no insurance is required for the application.',
        ],
        pt: [
          'Acesso ao sistema público de saúde',
          'O SUS cobre todos no país independentemente do status, então nenhum seguro é exigido no pedido.',
        ],
        es: [
          'Acceso al sistema público de salud',
          'El sistema público cubre a todos en el país con independencia del estatus, así que no se exige seguro para la solicitud.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the national migration registry card',
          'The CRNM is the residence document; the two-year Mercosur residence is recorded on it.',
        ],
        pt: [
          'Retirar a Carteira de Registro Nacional Migratório',
          'A CRNM é o documento de residência; a residência Mercosul de dois anos fica registada nela.',
        ],
        es: [
          'Retirar la tarjeta de registro nacional migratorio',
          'La CRNM es el documento de residencia; la residencia Mercosur de dos años queda registrada en ella.',
        ],
      },
      {
        en: [
          'Get a CPF number',
          'The tax number is needed for almost everything: bank, phone, rental contract, employment.',
        ],
        pt: [
          'Obter o CPF',
          'O número fiscal é necessário para quase tudo: banco, telefone, contrato de aluguel, emprego.',
        ],
        es: [
          'Obtener el CPF',
          'El número fiscal es necesario para casi todo: banco, teléfono, contrato de alquiler, empleo.',
        ],
      },
      {
        en: [
          'Get a work card record',
          'The digital CTPS is what registers a formal employment relationship.',
        ],
        pt: [
          'Obter o registo na carteira de trabalho',
          'A CTPS digital é o que registra um vínculo formal de emprego.',
        ],
        es: [
          'Obtener el registro en la libreta de trabajo',
          'La CTPS digital es lo que registra una relación laboral formal.',
        ],
        priority: 2,
      },
      {
        en: [
          'Request the conversion to permanent residence before the two years end',
          'The conversion is requested in the ninety days before expiry, and missing that window means starting over.',
        ],
        pt: [
          'Pedir a transformação em residência permanente antes dos dois anos',
          'A transformação é pedida nos noventa dias anteriores ao vencimento, e perder essa janela significa recomeçar.',
        ],
        es: [
          'Solicitar la conversión a residencia permanente antes de los dos años',
          'La conversión se solicita en los noventa días previos al vencimiento, y perder esa ventana implica empezar de nuevo.',
        ],
      },
    ],
  },

  'Temporary Visa (VITEM)': {
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
          'Identify the correct VITEM subtype',
          'The temporary visa is split into numbered subtypes for work, study, research, investment, family and more. Each has its own document list and applying under the wrong one restarts the process.',
        ],
        pt: [
          'Identificar o subtipo correto de VITEM',
          'O visto temporário é dividido em subtipos numerados para trabalho, estudo, pesquisa, investimento, família e outros. Cada um tem lista própria, e pedir no subtipo errado reinicia o processo.',
        ],
        es: [
          'Identificar el subtipo correcto de VITEM',
          'El visado temporal se divide en subtipos numerados para trabajo, estudio, investigación, inversión, familia y más. Cada uno tiene su lista, y solicitar en el subtipo equivocado reinicia el trámite.',
        ],
      },
      {
        en: [
          'Prior work authorisation for employment subtypes',
          'The Brazilian employer obtains it from the labour ministry before you apply at the consulate.',
        ],
        pt: [
          'Autorização de trabalho prévia nos subtipos de emprego',
          'O empregador brasileiro a obtém no ministério do trabalho antes de você pedir no consulado.',
        ],
        es: [
          'Autorización de trabajo previa en los subtipos de empleo',
          'El empleador brasileño la obtiene en el ministerio de trabajo antes de que usted solicite en el consulado.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Criminal record certificate, apostilled',
          'From your country of residence, with a sworn translation.',
        ],
        pt: [
          'Certidão de antecedentes criminais apostilada',
          'Do país de residência, com tradução juramentada.',
        ],
        es: [
          'Certificado de antecedentes penales apostillado',
          'Del país de residencia, con traducción jurada.',
        ],
      },
      {
        en: [
          'Documents supporting the subtype',
          'An employment contract, a letter of admission, a research agreement, or the investment evidence.',
        ],
        pt: [
          'Documentos que sustentam o subtipo',
          'Contrato de trabalho, carta de admissão, acordo de pesquisa, ou a comprovação do investimento.',
        ],
        es: [
          'Documentos que sustentan el subtipo',
          'Contrato de trabajo, carta de admisión, convenio de investigación, o la prueba de la inversión.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Letter of admission from the institution',
          'For study subtypes, from a recognised Brazilian institution.',
        ],
        pt: [
          'Carta de aceitação da instituição',
          'Nos subtipos de estudo, de instituição brasileira reconhecida.',
        ],
        es: [
          'Carta de admisión de la institución',
          'En los subtipos de estudio, de una institución brasileña reconocida.',
        ],
        required: false,
      },
      {
        en: [
          'Diplomas for regulated professions',
          'Practising medicine, law or engineering requires the qualification to be revalidated by a Brazilian university.',
        ],
        pt: [
          'Diplomas para profissões regulamentadas',
          'Exercer medicina, direito ou engenharia exige revalidação do diploma por universidade brasileira.',
        ],
        es: [
          'Títulos para profesiones reguladas',
          'Ejercer medicina, derecho o ingeniería exige revalidar el título en una universidad brasileña.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence of means for the stay',
          'A salary in the contract, a scholarship, or personal funds, depending on the subtype.',
        ],
        pt: [
          'Comprovação de meios para a estada',
          'Salário no contrato, bolsa, ou recursos próprios, conforme o subtipo.',
        ],
        es: [
          'Prueba de medios para la estancia',
          'Salario en el contrato, beca, o fondos propios, según el subtipo.',
        ],
      },
      {
        en: [
          'Investment amount for the investor subtype',
          'A minimum capital contribution into a Brazilian company, with the transfer registered at the central bank.',
        ],
        pt: [
          'Valor do investimento no subtipo de investidor',
          'Um aporte mínimo de capital em empresa brasileira, com a transferência registada no banco central.',
        ],
        es: [
          'Importe de la inversión en el subtipo de inversor',
          'Un aporte mínimo de capital en una empresa brasileña, con la transferencia registrada en el banco central.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Pay the consular fee',
          'Varies by nationality under reciprocity, and by subtype.',
        ],
        pt: [
          'Pagar a taxa consular',
          'Varia por nacionalidade, conforme reciprocidade, e por subtipo.',
        ],
        es: [
          'Pagar la tasa consular',
          'Varía según la nacionalidad, conforme a reciprocidad, y según el subtipo.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Apply at the consulate with jurisdiction over where you live',
          'Not where you hold nationality, which matters if you live abroad.',
        ],
        pt: [
          'Pedir no consulado com jurisdição sobre onde você mora',
          'Não onde você tem nacionalidade, o que importa se você vive no exterior.',
        ],
        es: [
          'Solicitar en el consulado con jurisdicción sobre donde vive',
          'No donde tiene la nacionalidad, lo que importa si vive en el extranjero.',
        ],
      },
      {
        en: [
          'Enter Brazil within the visa validity',
          'The visa authorises entry within a set window; it is not itself the residence.',
        ],
        pt: [
          'Entrar no Brasil dentro da validade do visto',
          'O visto autoriza a entrada dentro de uma janela; ele não é a residência em si.',
        ],
        es: [
          'Entrar en Brasil dentro de la validez del visado',
          'El visado autoriza la entrada dentro de una ventana; no es en sí la residencia.',
        ],
      },
      {
        en: [
          'Register with the federal police within ninety days of arrival',
          'This is the step that turns the visa into a residence and produces the CRNM. Missing it leaves you irregular.',
        ],
        pt: [
          'Registar-se na polícia federal em até noventa dias da chegada',
          'É o passo que converte o visto em residência e gera a CRNM. Perdê-lo deixa você irregular.',
        ],
        es: [
          'Registrarse en la policía federal en los noventa días siguientes a la llegada',
          'Es el paso que convierte el visado en residencia y genera la CRNM. Perderlo le deja en situación irregular.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection at the federal police',
          'Taken at the registration appointment.',
        ],
        pt: [
          'Coleta de dados biométricos na polícia federal',
          'Feita no atendimento de registo.',
        ],
        es: [
          'Recogida de datos biométricos en la policía federal',
          'Se realiza en la cita de registro.',
        ],
      },
      {
        en: [
          'Access to public healthcare',
          'Available to everyone in the country; private cover is optional.',
        ],
        pt: [
          'Acesso ao sistema público de saúde',
          'Disponível a todos no país; a cobertura privada é opcional.',
        ],
        es: [
          'Acceso al sistema público de salud',
          'Disponible para todos en el país; la cobertura privada es opcional.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the CRNM',
          'The residence card, valid for the period of the authorisation.',
        ],
        pt: [
          'Retirar a CRNM',
          'A carteira de residência, válida pelo período da autorização.',
        ],
        es: [
          'Retirar la CRNM',
          'La tarjeta de residencia, válida por el periodo de la autorización.',
        ],
      },
      {
        en: [
          'Get a CPF and, if working, the digital work card',
          'Both are needed before a formal employment relationship can be registered.',
        ],
        pt: [
          'Obter o CPF e, se for trabalhar, a carteira de trabalho digital',
          'Ambos são necessários antes de um vínculo formal poder ser registado.',
        ],
        es: [
          'Obtener el CPF y, si va a trabajar, la libreta de trabajo digital',
          'Ambos son necesarios antes de que se pueda registrar una relación laboral formal.',
        ],
      },
      {
        en: [
          'Renew before the residence expires',
          'Renewal is requested from the federal police, and a lapse breaks the continuity permanent residence depends on.',
        ],
        pt: [
          'Renovar antes de a residência vencer',
          'A renovação é pedida na polícia federal, e uma lacuna quebra a continuidade de que depende a residência permanente.',
        ],
        es: [
          'Renovar antes de que venza la residencia',
          'La renovación se solicita ante la policía federal, y un vacío rompe la continuidad de la que depende la residencia permanente.',
        ],
      },
      {
        en: [
          'Report a change of address or of employer',
          'The federal police record has to stay current, and this matters at renewal.',
        ],
        pt: [
          'Comunicar mudança de endereço ou de empregador',
          'O registo na polícia federal precisa ficar atualizado, e isso pesa na renovação.',
        ],
        es: [
          'Comunicar el cambio de domicilio o de empleador',
          'El registro en la policía federal debe mantenerse actualizado, y eso cuenta en la renovación.',
        ],
        priority: 2,
      },
    ],
  },

  'Permanent Residence': {
    core_documents: [
      {
        en: [
          'Valid passport and current CRNM',
          'The request is made from inside Brazil, holding a valid residence.',
        ],
        pt: [
          'Passaporte válido e CRNM atual',
          'O pedido é feito de dentro do Brasil, com uma residência válida.',
        ],
        es: [
          'Pasaporte vigente y CRNM actual',
          'La solicitud se hace desde dentro de Brasil, con una residencia vigente.',
        ],
      },
      {
        en: [
          'Note that the law speaks of indefinite residence, not a permanent visa',
          'The old "permanent visa" no longer exists. What you request is an authorisation for residence with an indefinite term.',
        ],
        pt: [
          'Saber que a lei fala em residência por prazo indeterminado, não em visto permanente',
          'O antigo "visto permanente" não existe mais. O que se pede é autorização de residência por prazo indeterminado.',
        ],
        es: [
          'Saber que la ley habla de residencia por plazo indeterminado, no de visado permanente',
          'El antiguo "visado permanente" ya no existe. Lo que se solicita es una autorización de residencia por plazo indeterminado.',
        ],
      },
      {
        en: [
          'Evidence of the ground for indefinite residence',
          'Two years of Mercosur residence, a Brazilian child or spouse, retirement income, or another qualifying ground.',
        ],
        pt: [
          'Comprovação do fundamento da residência indeterminada',
          'Dois anos de residência Mercosul, filho ou cônjuge brasileiro, renda de aposentadoria, ou outro fundamento qualificado.',
        ],
        es: [
          'Prueba del fundamento de la residencia indefinida',
          'Dos años de residencia Mercosur, hijo o cónyuge brasileño, renta de jubilación, u otro fundamento cualificado.',
        ],
      },
      {
        en: [
          'Updated criminal record certificates',
          'Brazilian, and from abroad where you spent time during the period.',
        ],
        pt: [
          'Certidões de antecedentes criminais atualizadas',
          'Brasileiras, e do exterior onde você passou tempo durante o período.',
        ],
        es: [
          'Certificados de antecedentes penales actualizados',
          'Brasileños, y del exterior donde haya pasado tiempo durante el periodo.',
        ],
      },
      {
        en: [
          'Proof of current address in Brazil',
          'Evidencing that you actually live in the country.',
        ],
        pt: [
          'Comprovante de endereço atual no Brasil',
          'Comprovando que você de fato mora no país.',
        ],
        es: [
          'Comprobante de domicilio actual en Brasil',
          'Que acredite que efectivamente vive en el país.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence of means of living',
          'Employment, self-employment or a pension; the standard is that you support yourself.',
        ],
        pt: [
          'Comprovação de meios de vida',
          'Emprego, atividade autônoma ou aposentadoria; o padrão é que você se sustente.',
        ],
        es: [
          'Prueba de medios de vida',
          'Empleo, actividad por cuenta propia o jubilación; el estándar es que se mantenga por sí mismo.',
        ],
      },
      {
        en: [
          'Pay the processing and card fees',
          'Two federal charges, paid by GRU.',
        ],
        pt: [
          'Pagar as taxas de processamento e da carteira',
          'Duas taxas federais, pagas por GRU.',
        ],
        es: [
          'Pagar las tasas de trámite y de la tarjeta',
          'Dos tasas federales, pagadas por GRU.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File on the federal police portal',
          'Under the correct ground, since each has its own evidence.',
        ],
        pt: [
          'Protocolar no portal da polícia federal',
          'No fundamento correto, já que cada um tem comprovação própria.',
        ],
        es: [
          'Presentar en el portal de la policía federal',
          'Bajo el fundamento correcto, ya que cada uno tiene su propia prueba.',
        ],
      },
      {
        en: [
          'Apply in the window before the current residence expires',
          'For the Mercosur conversion this is the ninety days before the two-year mark.',
        ],
        pt: [
          'Pedir na janela anterior ao vencimento da residência atual',
          'Na conversão Mercosul, são os noventa dias anteriores aos dois anos.',
        ],
        es: [
          'Solicitar en la ventana previa al vencimiento de la residencia actual',
          'En la conversión Mercosur, son los noventa días previos a los dos años.',
        ],
      },
      {
        en: [
          'Attend the federal police appointment',
          'Originals are presented and biometrics retaken.',
        ],
        pt: [
          'Comparecer ao atendimento na polícia federal',
          'Os originais são apresentados e a biometria é recoletada.',
        ],
        es: [
          'Acudir a la cita en la policía federal',
          'Se presentan los originales y se vuelve a tomar la biometría.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection for the new card',
          'Fingerprints, photograph and signature.',
        ],
        pt: [
          'Coleta de dados biométricos para a nova carteira',
          'Impressões digitais, fotografia e assinatura.',
        ],
        es: [
          'Recogida de datos biométricos para la nueva tarjeta',
          'Huellas, fotografía y firma.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the indefinite CRNM',
          'The card itself has an expiry and is renewed, but the residence behind it does not lapse.',
        ],
        pt: [
          'Retirar a CRNM por prazo indeterminado',
          'A carteira em si tem validade e é renovada, mas a residência por trás dela não caduca.',
        ],
        es: [
          'Retirar la CRNM por plazo indeterminado',
          'La tarjeta en sí tiene vencimiento y se renueva, pero la residencia que respalda no caduca.',
        ],
      },
      {
        en: [
          'Do not stay outside Brazil for over two years',
          'A continuous absence of more than two years can extinguish the residence.',
        ],
        pt: [
          'Não ficar fora do Brasil por mais de dois anos',
          'Uma ausência contínua superior a dois anos pode extinguir a residência.',
        ],
        es: [
          'No permanecer fuera de Brasil más de dos años',
          'Una ausencia continua superior a dos años puede extinguir la residencia.',
        ],
      },
      {
        en: [
          'Renew the card when it expires',
          'The physical card is renewed even though the residence itself is indefinite.',
        ],
        pt: [
          'Renovar a carteira quando vencer',
          'A carteira física é renovada mesmo que a residência em si seja por prazo indeterminado.',
        ],
        es: [
          'Renovar la tarjeta cuando venza',
          'La tarjeta física se renueva aunque la residencia en sí sea por plazo indeterminado.',
        ],
      },
      {
        en: [
          'Consider naturalisation after the qualifying period',
          'Four years of residence as a rule, and only one year for nationals of Portuguese-speaking countries.',
        ],
        pt: [
          'Avaliar a naturalização após o período qualificado',
          'Quatro anos de residência como regra, e apenas um ano para nacionais de países de língua portuguesa.',
        ],
        es: [
          'Evaluar la naturalización tras el periodo cualificado',
          'Cuatro años de residencia como regla, y solo un año para nacionales de países de lengua portuguesa.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
