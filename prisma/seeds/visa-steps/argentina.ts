import type { CountryVisaSteps } from './types';

/**
 * Steps for Argentina.
 *
 * For nationals of Mercosur member and associate states — which covers most of
 * South America — the decisive fact is that nationality alone is a ground for
 * residence. No job offer, no sponsor, no minimum income: the criterio
 * nacionalidad gives two years of temporary residence, convertible to permanent.
 * Anyone from the region assembling an employment file is doing far more work
 * than the law asks for, so that check comes first.
 *
 * Everything is filed through RADEX, the online platform, and the residence
 * precaria issued while the case runs is what makes you legal in the meantime.
 */
export const argentina: CountryVisaSteps = {
  'Tourist Visa / Business Visit Visa': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Check first whether your nationality needs a visa at all: most of the Americas and Europe enter visa-free for tourism.',
        ],
        pt: [
          'Passaporte válido',
          'Verifique antes se sua nacionalidade precisa de visto: a maior parte das Américas e da Europa entra sem visto para turismo.',
        ],
        es: [
          'Pasaporte vigente',
          'Compruebe primero si su nacionalidad necesita visado: la mayor parte de América y Europa entra sin visado para turismo.',
        ],
      },
      {
        en: [
          'Identity document instead of a passport for Mercosur nationals',
          'Citizens of member and associate states may enter with their national ID card, without a passport.',
        ],
        pt: [
          'Documento de identidade no lugar do passaporte para nacionais do Mercosul',
          'Cidadãos de Estados membros e associados podem entrar com a carteira de identidade nacional, sem passaporte.',
        ],
        es: [
          'Documento de identidad en lugar del pasaporte para nacionales del Mercosur',
          'Los ciudadanos de Estados miembros y asociados pueden entrar con su documento nacional de identidad, sin pasaporte.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Visa application form and photograph',
          'Only for nationalities that do require a visa, submitted at the consulate.',
        ],
        pt: [
          'Formulário de pedido de visto e fotografia',
          'Apenas para nacionalidades que de fato exigem visto, entregue no consulado.',
        ],
        es: [
          'Formulario de solicitud de visado y fotografía',
          'Solo para nacionalidades que sí requieren visado, presentado en el consulado.',
        ],
        required: false,
      },
      {
        en: [
          'Return or onward ticket',
          'Checked at the border as evidence you are a genuine visitor.',
        ],
        pt: [
          'Bilhete de volta ou de continuação',
          'Conferido na fronteira como prova de que você é visitante genuíno.',
        ],
        es: [
          'Billete de vuelta o de continuación',
          'Se comprueba en la frontera como prueba de que es un visitante genuino.',
        ],
      },
      {
        en: [
          'Proof of accommodation',
          'Hotel booking, or the address and contact of whoever is hosting you.',
        ],
        pt: [
          'Comprovação de alojamento',
          'Reserva de hotel, ou o endereço e contato de quem vai hospedar você.',
        ],
        es: [
          'Comprobante de alojamiento',
          'Reserva de hotel, o la dirección y el contacto de quien le aloja.',
        ],
      },
      {
        en: [
          'Letter of invitation for a business visit',
          'From the Argentine company, describing the meetings and who bears the costs.',
        ],
        pt: [
          'Carta-convite para visita de negócios',
          'Da empresa argentina, descrevendo as reuniões e quem arca com os custos.',
        ],
        es: [
          'Carta de invitación para visita de negocios',
          'De la empresa argentina, describiendo las reuniones y quién asume los costes.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of funds for the stay',
          'Bank statements or cards; no fixed amount is published, and officers apply judgement.',
        ],
        pt: [
          'Comprovação de recursos para a estada',
          'Extratos ou cartões; não há valor fixo publicado, e os oficiais aplicam julgamento.',
        ],
        es: [
          'Prueba de fondos para la estancia',
          'Extractos o tarjetas; no hay importe fijo publicado, y los oficiales aplican criterio.',
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
          'Apply at the consulate if your nationality requires it',
          'There is no online tourist authorisation for most nationalities; it is either visa-free or a consular application.',
        ],
        pt: [
          'Pedir no consulado se sua nacionalidade exigir',
          'Não há autorização turística online para a maioria das nacionalidades; ou é isento, ou é pedido consular.',
        ],
        es: [
          'Solicitar en el consulado si su nacionalidad lo exige',
          'No hay autorización turística en línea para la mayoría de las nacionalidades; o es exento, o es solicitud consular.',
        ],
      },
      {
        en: [
          'Pay the consular fee',
          'Only applies where a visa is required; visa-free entry has no charge.',
        ],
        pt: [
          'Pagar a taxa consular',
          'Só se aplica quando há exigência de visto; a entrada isenta não tem cobrança.',
        ],
        es: [
          'Pagar la tasa consular',
          'Solo aplica cuando se exige visado; la entrada exenta no tiene cargo.',
        ],
        required: false,
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric registration at the border',
          'Fingerprints and photograph are taken by migration on entry.',
        ],
        pt: [
          'Registo biométrico na fronteira',
          'Impressões digitais e fotografia são recolhidas pela migração na entrada.',
        ],
        es: [
          'Registro biométrico en la frontera',
          'Migración toma huellas y fotografía a la entrada.',
        ],
      },
      {
        en: [
          'Travel medical insurance',
          'Not compulsory; public hospitals treat everyone, but private care is faster and insurance is worth having.',
        ],
        pt: [
          'Seguro médico de viagem',
          'Não é obrigatório; hospitais públicos atendem todos, mas a rede privada é mais rápida e o seguro compensa.',
        ],
        es: [
          'Seguro médico de viaje',
          'No es obligatorio; los hospitales públicos atienden a todos, pero la privada es más rápida y el seguro compensa.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Note the stay granted at the border',
          'Usually ninety days, and it is the officer who decides, not the visa.',
        ],
        pt: [
          'Anotar o prazo concedido na fronteira',
          'Em geral noventa dias, e quem decide é o oficial, não o visto.',
        ],
        es: [
          'Anotar el plazo concedido en la frontera',
          'Por lo general noventa días, y quien decide es el oficial, no el visado.',
        ],
      },
      {
        en: [
          'Request an extension before the stay expires',
          'A prórroga de permanencia can be requested once, through the migration office.',
        ],
        pt: [
          'Pedir prorrogação antes de o prazo vencer',
          'A prórroga de permanencia pode ser pedida uma vez, pelo órgão de migração.',
        ],
        es: [
          'Solicitar prórroga antes de que venza el plazo',
          'La prórroga de permanencia puede pedirse una vez, ante el organismo de migración.',
        ],
      },
      {
        en: [
          'Do not work as a tourist',
          'Paid activity requires a residence, and working as a tourist complicates a later application.',
        ],
        pt: [
          'Não trabalhar como turista',
          'Atividade remunerada exige residência, e trabalhar como turista complica um pedido posterior.',
        ],
        es: [
          'No trabajar como turista',
          'La actividad remunerada exige residencia, y trabajar como turista complica una solicitud posterior.',
        ],
      },
      {
        en: [
          'Consider applying for residence from inside the country',
          'Unlike many countries, Argentina allows a change of status without leaving, which makes the tourist entry a viable starting point.',
        ],
        pt: [
          'Avaliar pedir residência de dentro do país',
          'Diferente de muitos países, a Argentina permite mudança de status sem sair, o que torna a entrada como turista um ponto de partida viável.',
        ],
        es: [
          'Evaluar solicitar la residencia desde dentro del país',
          'A diferencia de muchos países, Argentina permite el cambio de estatus sin salir, lo que hace de la entrada como turista un punto de partida viable.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },

  'Working Visa / Labour Contract Visa': {
    core_documents: [
      {
        en: [
          'Check the Mercosur nationality route first',
          'If you hold a member or associate state nationality, residence is granted on nationality alone and no employment file is needed. Confirm this before assembling anything else.',
        ],
        pt: [
          'Checar antes a rota por nacionalidade Mercosul',
          'Se você tem nacionalidade de Estado membro ou associado, a residência é concedida só pela nacionalidade e nenhum processo de emprego é necessário. Confirme isso antes de montar qualquer outra coisa.',
        ],
        es: [
          'Comprobar primero la vía por nacionalidad Mercosur',
          'Si tiene nacionalidad de un Estado miembro o asociado, la residencia se concede solo por la nacionalidad y no hace falta ningún expediente laboral. Confírmelo antes de armar cualquier otra cosa.',
        ],
      },
      {
        en: [
          'Valid passport',
          'Plus the entry stamp or record showing how you came in.',
        ],
        pt: [
          'Passaporte válido',
          'Além do carimbo ou registo de entrada mostrando como você entrou.',
        ],
        es: [
          'Pasaporte vigente',
          'Además del sello o registro de entrada que muestra cómo ingresó.',
        ],
      },
      {
        en: [
          'Birth certificate, apostilled',
          'Apostilled in the country of issue and translated by a sworn translator registered in Argentina.',
        ],
        pt: [
          'Certidão de nascimento apostilada',
          'Apostilada no país de emissão e traduzida por tradutor público matriculado na Argentina.',
        ],
        es: [
          'Partida de nacimiento apostillada',
          'Apostillada en el país de emisión y traducida por traductor público matriculado en Argentina.',
        ],
      },
      {
        en: [
          'Criminal record certificates',
          'From your country of origin, apostilled, and from Argentina once you are here. Both have short validity.',
        ],
        pt: [
          'Certidões de antecedentes penais',
          'Do país de origem, apostilada, e da Argentina depois que você estiver aqui. Ambas têm validade curta.',
        ],
        es: [
          'Certificados de antecedentes penales',
          'Del país de origen, apostillado, y de Argentina una vez que esté aquí. Ambos tienen validez corta.',
        ],
      },
      {
        en: [
          'Employment contract with a registered employer',
          'The company must be registered with migration as an employer of foreign workers.',
        ],
        pt: [
          'Contrato de trabalho com empregador registado',
          'A empresa precisa estar inscrita na migração como empregadora de trabalhadores estrangeiros.',
        ],
        es: [
          'Contrato de trabajo con un empleador registrado',
          'La empresa debe estar inscrita ante migraciones como empleadora de trabajadores extranjeros.',
        ],
      },
      {
        en: [
          'Proof of address in Argentina',
          'A utility bill, lease, or a sworn statement of domicile.',
        ],
        pt: [
          'Comprovante de domicílio na Argentina',
          'Conta de serviço, contrato de locação, ou declaração juramentada de domicílio.',
        ],
        es: [
          'Comprobante de domicilio en Argentina',
          'Una factura de servicios, contrato de alquiler, o declaración jurada de domicilio.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Diplomas for regulated professions',
          'Practising medicine, law or engineering requires the qualification to be recognised by the education ministry first.',
        ],
        pt: [
          'Diplomas para profissões regulamentadas',
          'Exercer medicina, direito ou engenharia exige que a qualificação seja reconhecida antes pelo ministério da educação.',
        ],
        es: [
          'Títulos para profesiones reguladas',
          'Ejercer medicina, derecho o ingeniería exige que la titulación sea reconocida antes por el ministerio de educación.',
        ],
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence of the salary in the contract',
          'It must be a registered employment relationship with contributions, not an informal arrangement.',
        ],
        pt: [
          'Comprovação do salário do contrato',
          'Precisa ser um vínculo registado, com contribuições, não um arranjo informal.',
        ],
        es: [
          'Prueba del salario del contrato',
          'Debe ser una relación laboral registrada, con aportes, no un arreglo informal.',
        ],
      },
      {
        en: [
          'Pay the residence application fee',
          'The tasa de radicación is paid online before the file is reviewed.',
        ],
        pt: [
          'Pagar a taxa do pedido de residência',
          'A tasa de radicación é paga online antes de o processo ser analisado.',
        ],
        es: [
          'Pagar la tasa de la solicitud de residencia',
          'La tasa de radicación se paga en línea antes de que se revise el expediente.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File the application through RADEX',
          'The whole process is online: documents are uploaded and the file is followed there.',
        ],
        pt: [
          'Protocolar o pedido pelo RADEX',
          'Todo o processo é online: os documentos são enviados e o processo é acompanhado por lá.',
        ],
        es: [
          'Presentar la solicitud por RADEX',
          'Todo el proceso es en línea: los documentos se cargan y el expediente se sigue allí.',
        ],
      },
      {
        en: [
          'Attend the appointment at the migration office',
          'To present originals and complete the identity check.',
        ],
        pt: [
          'Comparecer ao atendimento na migração',
          'Para apresentar originais e completar a verificação de identidade.',
        ],
        es: [
          'Acudir a la cita en migraciones',
          'Para presentar originales y completar la verificación de identidad.',
        ],
      },
      {
        en: [
          'Collect the residencia precaria',
          'It is issued while the case is decided and it legalises your stay and your right to work in the meantime.',
        ],
        pt: [
          'Retirar a residencia precaria',
          'Emitida enquanto o caso é decidido, ela legaliza sua permanência e seu direito de trabalhar nesse intervalo.',
        ],
        es: [
          'Retirar la residencia precaria',
          'Se emite mientras se resuelve el caso y legaliza su permanencia y su derecho a trabajar entretanto.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection at migration',
          'Fingerprints and photograph for the residence record.',
        ],
        pt: [
          'Recolha de dados biométricos na migração',
          'Impressões digitais e fotografia para o registo de residência.',
        ],
        es: [
          'Recogida de datos biométricos en migraciones',
          'Huellas y fotografía para el registro de residencia.',
        ],
      },
      {
        en: [
          'Access to public healthcare',
          'Argentina provides free public care regardless of immigration status, so no insurance is required for the application.',
        ],
        pt: [
          'Acesso ao sistema público de saúde',
          'A Argentina oferece atendimento público gratuito independentemente do status migratório, então nenhum seguro é exigido no pedido.',
        ],
        es: [
          'Acceso al sistema público de salud',
          'Argentina brinda atención pública gratuita con independencia del estatus migratorio, así que no se exige seguro para la solicitud.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Get the DNI at the civil registry',
          'The residence grant entitles you to the national identity document, which is what daily life actually runs on.',
        ],
        pt: [
          'Obter o DNI no registo civil',
          'A concessão da residência dá direito ao documento nacional de identidade, que é o que a vida cotidiana de fato exige.',
        ],
        es: [
          'Obtener el DNI en el registro civil',
          'La concesión de la residencia da derecho al documento nacional de identidad, que es lo que la vida diaria realmente exige.',
        ],
      },
      {
        en: [
          'Obtain a CUIL number',
          'The labour identification code, needed to be registered as an employee and to be paid legally.',
        ],
        pt: [
          'Obter o número CUIL',
          'O código de identificação laboral, necessário para ser registado como empregado e receber legalmente.',
        ],
        es: [
          'Obtener el número CUIL',
          'El código de identificación laboral, necesario para estar registrado como empleado y cobrar legalmente.',
        ],
      },
      {
        en: [
          'Renew the temporary residence before it expires',
          'Temporary residence is granted for a defined period and must be renewed to keep continuity.',
        ],
        pt: [
          'Renovar a residência temporária antes do vencimento',
          'A residência temporária é concedida por prazo definido e precisa ser renovada para manter continuidade.',
        ],
        es: [
          'Renovar la residencia temporaria antes de que venza',
          'La residencia temporaria se concede por un plazo definido y debe renovarse para mantener continuidad.',
        ],
      },
      {
        en: [
          'Apply for permanent residence after the qualifying period',
          'Two years of temporary residence on this ground normally opens the permanent application.',
        ],
        pt: [
          'Pedir residência permanente após o período qualificado',
          'Dois anos de residência temporária nesse fundamento em geral abrem o pedido de permanente.',
        ],
        es: [
          'Solicitar la residencia permanente tras el periodo cualificado',
          'Dos años de residencia temporaria en ese fundamento suelen habilitar la solicitud de permanente.',
        ],
        priority: 2,
      },
    ],
  },

  'Student Visa / Long-Term Study': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Or the national ID card if you are a Mercosur national.',
        ],
        pt: [
          'Passaporte válido',
          'Ou a carteira de identidade nacional, se você for nacional do Mercosul.',
        ],
        es: [
          'Pasaporte vigente',
          'O el documento nacional de identidad, si es nacional del Mercosur.',
        ],
      },
      {
        en: [
          'Enrolment certificate from a recognised institution',
          'The school or university must be officially recognised and registered with migration.',
        ],
        pt: [
          'Certificado de matrícula de instituição reconhecida',
          'A escola ou universidade precisa ser oficialmente reconhecida e estar registada na migração.',
        ],
        es: [
          'Certificado de inscripción de una institución reconocida',
          'La escuela o universidad debe estar oficialmente reconocida y registrada ante migraciones.',
        ],
      },
      {
        en: [
          'Birth certificate, apostilled',
          'With a sworn translation done in Argentina.',
        ],
        pt: [
          'Certidão de nascimento apostilada',
          'Com tradução juramentada feita na Argentina.',
        ],
        es: [
          'Partida de nacimiento apostillada',
          'Con traducción jurada hecha en Argentina.',
        ],
      },
      {
        en: [
          'Criminal record certificates',
          'From your country of origin and from Argentina, for applicants over sixteen.',
        ],
        pt: [
          'Certidões de antecedentes penais',
          'Do país de origem e da Argentina, para requerentes acima de dezesseis anos.',
        ],
        es: [
          'Certificados de antecedentes penales',
          'Del país de origen y de Argentina, para solicitantes mayores de dieciséis años.',
        ],
      },
      {
        en: [
          'Proof of address in Argentina',
          'A lease, utility bill or sworn statement of domicile.',
        ],
        pt: [
          'Comprovante de domicílio na Argentina',
          'Contrato de locação, conta de serviço ou declaração juramentada de domicílio.',
        ],
        es: [
          'Comprobante de domicilio en Argentina',
          'Contrato de alquiler, factura de servicios o declaración jurada de domicilio.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Prior academic transcripts and diplomas',
          'Apostilled and translated; the institution may also require them validated for admission.',
        ],
        pt: [
          'Históricos e diplomas anteriores',
          'Apostilados e traduzidos; a instituição pode ainda exigi-los validados para a admissão.',
        ],
        es: [
          'Expedientes y títulos anteriores',
          'Apostillados y traducidos; la institución puede además exigirlos convalidados para la admisión.',
        ],
      },
      {
        en: [
          'Evidence of Spanish where the course requires it',
          'Public universities teach in Spanish and some ask for a proficiency certificate.',
        ],
        pt: [
          'Comprovação de espanhol quando o curso exigir',
          'As universidades públicas ensinam em espanhol e algumas pedem certificado de proficiência.',
        ],
        es: [
          'Prueba de español cuando el curso lo exija',
          'Las universidades públicas enseñan en español y algunas piden certificado de dominio.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Proof of means to support yourself',
          'Your own funds, or a sworn undertaking from whoever supports you with their income documents.',
        ],
        pt: [
          'Comprovação de meios para se sustentar',
          'Recursos próprios, ou declaração juramentada de quem custeia, com os documentos de renda dessa pessoa.',
        ],
        es: [
          'Prueba de medios para mantenerse',
          'Fondos propios, o declaración jurada de quien le mantiene, con sus documentos de ingresos.',
        ],
      },
      {
        en: [
          'Pay the residence application fee',
          'A reduced rate applies to Mercosur nationals.',
        ],
        pt: [
          'Pagar a taxa do pedido de residência',
          'Há valor reduzido para nacionais do Mercosul.',
        ],
        es: [
          'Pagar la tasa de la solicitud de residencia',
          'Hay un importe reducido para nacionales del Mercosur.',
        ],
      },
      {
        en: [
          'Note that public university tuition is free',
          'Undergraduate study at national universities carries no tuition, including for foreigners, which changes the financial picture entirely.',
        ],
        pt: [
          'Saber que a universidade pública é gratuita',
          'A graduação em universidades nacionais não cobra mensalidade, inclusive de estrangeiros, o que muda completamente o quadro financeiro.',
        ],
        es: [
          'Saber que la universidad pública es gratuita',
          'El grado en universidades nacionales no cobra matrícula, tampoco a extranjeros, lo que cambia por completo el panorama financiero.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'File the application through RADEX',
          'Uploaded online, with the appointment booked from the same platform.',
        ],
        pt: [
          'Protocolar o pedido pelo RADEX',
          'Enviado online, com o atendimento agendado pela mesma plataforma.',
        ],
        es: [
          'Presentar la solicitud por RADEX',
          'Se carga en línea, con la cita reservada desde la misma plataforma.',
        ],
      },
      {
        en: [
          'Attend the migration appointment',
          'To present originals and complete the record.',
        ],
        pt: [
          'Comparecer ao atendimento na migração',
          'Para apresentar originais e completar o registo.',
        ],
        es: [
          'Acudir a la cita en migraciones',
          'Para presentar originales y completar el registro.',
        ],
      },
      {
        en: [
          'Collect the residencia precaria',
          'It keeps you legal and lets you get the temporary DNI while the case is decided.',
        ],
        pt: [
          'Retirar a residencia precaria',
          'Ela mantém você legal e permite obter o DNI temporário enquanto o caso é decidido.',
        ],
        es: [
          'Retirar la residencia precaria',
          'Le mantiene en regla y permite obtener el DNI temporal mientras se resuelve el caso.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection at migration',
          'Fingerprints and photograph for the residence record.',
        ],
        pt: [
          'Recolha de dados biométricos na migração',
          'Impressões digitais e fotografia para o registo de residência.',
        ],
        es: [
          'Recogida de datos biométricos en migraciones',
          'Huellas y fotografía para el registro de residencia.',
        ],
      },
      {
        en: [
          'Access to public healthcare',
          'Free and open regardless of immigration status; private cover is optional.',
        ],
        pt: [
          'Acesso ao sistema público de saúde',
          'Gratuito e aberto independentemente do status migratório; a cobertura privada é opcional.',
        ],
        es: [
          'Acceso al sistema público de salud',
          'Gratuito y abierto con independencia del estatus migratorio; la cobertura privada es opcional.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Get the DNI',
          'Needed to enrol formally, open a bank account and get a phone line.',
        ],
        pt: [
          'Obter o DNI',
          'Necessário para se matricular formalmente, abrir conta bancária e ter linha telefónica.',
        ],
        es: [
          'Obtener el DNI',
          'Necesario para matricularse formalmente, abrir cuenta bancaria y tener línea telefónica.',
        ],
      },
      {
        en: [
          'Keep the enrolment active',
          'Student residence depends on continued study, and it is checked at renewal.',
        ],
        pt: [
          'Manter a matrícula ativa',
          'A residência de estudante depende da continuidade do estudo, e isso é conferido na renovação.',
        ],
        es: [
          'Mantener la inscripción activa',
          'La residencia de estudiante depende de la continuidad del estudio, y se comprueba en la renovación.',
        ],
      },
      {
        en: [
          'Renew the residence each year',
          'Renewed with an updated enrolment certificate from the institution.',
        ],
        pt: [
          'Renovar a residência a cada ano',
          'Renovada com um certificado de matrícula atualizado da instituição.',
        ],
        es: [
          'Renovar la residencia cada año',
          'Se renueva con un certificado de inscripción actualizado de la institución.',
        ],
      },
      {
        en: [
          'Consider changing to another ground after graduating',
          'A job or a Mercosur nationality claim can convert the stay into a route to permanent residence.',
        ],
        pt: [
          'Avaliar mudar de fundamento após a formatura',
          'Um emprego ou a nacionalidade Mercosul podem converter a estada numa rota para a residência permanente.',
        ],
        es: [
          'Evaluar cambiar de fundamento tras graduarse',
          'Un empleo o la nacionalidad Mercosur pueden convertir la estancia en una vía hacia la residencia permanente.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },

  'Family Reunification / Permanent Residence': {
    core_documents: [
      {
        en: [
          'Valid passport or national identity document',
          'Mercosur nationals may use the ID card throughout.',
        ],
        pt: [
          'Passaporte válido ou documento nacional de identidade',
          'Nacionais do Mercosul podem usar a carteira de identidade em todo o processo.',
        ],
        es: [
          'Pasaporte vigente o documento nacional de identidad',
          'Los nacionales del Mercosur pueden usar el documento de identidad en todo el trámite.',
        ],
      },
      {
        en: [
          'Evidence of the family tie',
          'Marriage certificate, or the birth certificate linking you to an Argentine or a resident. Apostilled and translated.',
        ],
        pt: [
          'Comprovação do vínculo familiar',
          'Certidão de casamento, ou a certidão de nascimento que liga você a um argentino ou residente. Apostilada e traduzida.',
        ],
        es: [
          'Prueba del vínculo familiar',
          'Certificado de matrimonio, o la partida de nacimiento que le vincula a un argentino o residente. Apostillado y traducido.',
        ],
      },
      {
        en: [
          'Having an Argentine child is itself a ground',
          'A parent of an Argentine-born child qualifies for residence directly, which is one of the most direct routes available.',
        ],
        pt: [
          'Ter filho argentino é fundamento por si só',
          'Pai ou mãe de filho nascido na Argentina qualifica diretamente para a residência, uma das rotas mais diretas que existem.',
        ],
        es: [
          'Tener un hijo argentino es fundamento por sí solo',
          'El padre o la madre de un hijo nacido en Argentina califica directamente para la residencia, una de las vías más directas que existen.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Criminal record certificates',
          'From your country of origin, apostilled, and from Argentina.',
        ],
        pt: [
          'Certidões de antecedentes penais',
          'Do país de origem, apostilada, e da Argentina.',
        ],
        es: [
          'Certificados de antecedentes penales',
          'Del país de origen, apostillado, y de Argentina.',
        ],
      },
      {
        en: [
          'Proof of address in Argentina',
          'Shared with the family member you are joining, where applicable.',
        ],
        pt: [
          'Comprovante de domicílio na Argentina',
          'Compartilhado com o familiar a quem você se une, quando aplicável.',
        ],
        es: [
          'Comprobante de domicilio en Argentina',
          'Compartido con el familiar al que se une, cuando corresponda.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Evidence of lawful means of living',
          'Assessed for permanent residence, though the threshold is not a published figure.',
        ],
        pt: [
          'Comprovação de meios de vida lícitos',
          'Avaliada na residência permanente, embora o piso não seja um valor publicado.',
        ],
        es: [
          'Prueba de medios de vida lícitos',
          'Se evalúa en la residencia permanente, aunque el umbral no es una cifra publicada.',
        ],
      },
      {
        en: [
          'Pay the residence application fee',
          'A reduced rate applies to Mercosur nationals and some family categories are exempt.',
        ],
        pt: [
          'Pagar a taxa do pedido de residência',
          'Há valor reduzido para nacionais do Mercosul e algumas categorias familiares são isentas.',
        ],
        es: [
          'Pagar la tasa de la solicitud de residencia',
          'Hay importe reducido para nacionales del Mercosur y algunas categorías familiares están exentas.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'File through RADEX under the correct ground',
          'Family tie, Mercosur nationality and two years of prior temporary residence are three different grounds with different evidence.',
        ],
        pt: [
          'Protocolar pelo RADEX no fundamento correto',
          'Vínculo familiar, nacionalidade Mercosul e dois anos de residência temporária prévia são três fundamentos distintos, com comprovações distintas.',
        ],
        es: [
          'Presentar por RADEX bajo el fundamento correcto',
          'Vínculo familiar, nacionalidad Mercosur y dos años de residencia temporaria previa son tres fundamentos distintos, con pruebas distintas.',
        ],
      },
      {
        en: [
          'Attend the migration appointment',
          'To present originals and complete the identity check.',
        ],
        pt: [
          'Comparecer ao atendimento na migração',
          'Para apresentar originais e completar a verificação de identidade.',
        ],
        es: [
          'Acudir a la cita en migraciones',
          'Para presentar originales y completar la verificación de identidad.',
        ],
      },
      {
        en: [
          'Keep documents within their validity',
          'Criminal record certificates expire quickly, so request them near the end of the preparation, not at the start.',
        ],
        pt: [
          'Manter os documentos dentro da validade',
          'Certidões de antecedentes vencem rápido, então peça-as no fim da preparação, não no começo.',
        ],
        es: [
          'Mantener los documentos dentro de su validez',
          'Los certificados de antecedentes caducan rápido, así que pídalos al final de la preparación, no al principio.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric data collection at migration',
          'Fingerprints and photograph for the residence record.',
        ],
        pt: [
          'Recolha de dados biométricos na migração',
          'Impressões digitais e fotografia para o registo de residência.',
        ],
        es: [
          'Recogida de datos biométricos en migraciones',
          'Huellas y fotografía para el registro de residencia.',
        ],
      },
      {
        en: [
          'Access to public healthcare',
          'Free regardless of status; no insurance is required for the application.',
        ],
        pt: [
          'Acesso ao sistema público de saúde',
          'Gratuito independentemente do status; nenhum seguro é exigido no pedido.',
        ],
        es: [
          'Acceso al sistema público de salud',
          'Gratuito con independencia del estatus; no se exige seguro para la solicitud.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Get the permanent DNI',
          'Issued without an expiry tied to the residence, unlike the temporary one.',
        ],
        pt: [
          'Obter o DNI permanente',
          'Emitido sem validade atrelada à residência, diferente do temporário.',
        ],
        es: [
          'Obtener el DNI permanente',
          'Se emite sin vencimiento atado a la residencia, a diferencia del temporal.',
        ],
      },
      {
        en: [
          'Note that permanent residence does not expire',
          'It can still be lost by prolonged absence from the country, so keep the ties current.',
        ],
        pt: [
          'Saber que a residência permanente não caduca',
          'Ela ainda pode ser perdida por ausência prolongada do país, então mantenha os vínculos vivos.',
        ],
        es: [
          'Saber que la residencia permanente no caduca',
          'Aún puede perderse por ausencia prolongada del país, así que mantenga los vínculos vigentes.',
        ],
      },
      {
        en: [
          'Consider naturalisation after two years of residence',
          'Argentine citizenship is granted through the courts after a short qualifying period, and it does not require renouncing your original nationality.',
        ],
        pt: [
          'Avaliar a naturalização após dois anos de residência',
          'A cidadania argentina é concedida pela via judicial após um período qualificado curto, e não exige renunciar à nacionalidade de origem.',
        ],
        es: [
          'Evaluar la naturalización tras dos años de residencia',
          'La ciudadanía argentina se concede por vía judicial tras un periodo cualificado corto, y no exige renunciar a la nacionalidad de origen.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },
};
