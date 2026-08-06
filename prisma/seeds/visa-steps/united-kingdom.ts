import type { CountryVisaSteps } from './types';

/**
 * Steps for the United Kingdom.
 *
 * Two things date any older checklist. Biometric residence permits were retired
 * and replaced by the digital eVisa held in a UKVI account, so there is no card
 * to collect on arrival. And the immigration health surcharge is paid up front,
 * for the whole permission, as part of the online application — not on arrival
 * and not per use.
 *
 * The four categories here are umbrellas: "Work Visas" covers Skilled Worker,
 * Global Talent and the rest. The steps stay at the level every route in the
 * umbrella shares, and name the sub-route where the requirement genuinely
 * differs.
 */
export const unitedKingdom: CountryVisaSteps = {
  'Visitor & Short-Stay Visas': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Must have a blank page for the vignette and be valid for the whole visit.',
        ],
        pt: [
          'Passaporte válido',
          'Precisa ter uma página em branco para a vinheta e estar válido durante toda a visita.',
        ],
        es: [
          'Pasaporte vigente',
          'Debe tener una página en blanco para la viñeta y estar vigente durante toda la visita.',
        ],
      },
      {
        en: [
          'Online application on gov.uk',
          'The whole form is completed online before any appointment; there is no paper version.',
        ],
        pt: [
          'Pedido online no gov.uk',
          'Todo o formulário é preenchido online antes de qualquer agendamento; não existe versão em papel.',
        ],
        es: [
          'Solicitud en línea en gov.uk',
          'Todo el formulario se completa en línea antes de cualquier cita; no existe versión en papel.',
        ],
      },
      {
        en: [
          'Travel itinerary and accommodation booking',
          'Dates that match what you declared in the form.',
        ],
        pt: [
          'Itinerário de viagem e reserva de alojamento',
          'Com datas coerentes com o que você declarou no formulário.',
        ],
        es: [
          'Itinerario de viaje y reserva de alojamiento',
          'Con fechas coherentes con lo declarado en el formulario.',
        ],
      },
      {
        en: [
          'Letter of invitation from your host',
          'If you are staying with someone, with their address, status in the UK and relationship to you.',
        ],
        pt: [
          'Carta-convite do anfitrião',
          'Se for ficar na casa de alguém, com endereço, situação dele no Reino Unido e o vínculo com você.',
        ],
        es: [
          'Carta de invitación del anfitrión',
          'Si se aloja con alguien, con su dirección, su situación en el Reino Unido y su vínculo con usted.',
        ],
        priority: 2,
        required: false,
      },
      {
        en: [
          'Evidence of ties to your country of residence',
          'Employment, studies, property or dependants — what shows you will leave at the end of the visit.',
        ],
        pt: [
          'Comprovação de vínculos com seu país de residência',
          'Emprego, estudos, imóveis ou dependentes — o que mostra que você sairá ao fim da visita.',
        ],
        es: [
          'Prueba de arraigo en su país de residencia',
          'Empleo, estudios, propiedades o dependientes: lo que demuestra que se marchará al final de la visita.',
        ],
      },
    ],
    financial_requirements: [
      {
        en: [
          'Bank statements from the last six months',
          'The UK sets no fixed figure: the caseworker judges whether the balance fits the trip you described.',
        ],
        pt: [
          'Extratos bancários dos últimos seis meses',
          'O Reino Unido não fixa um valor: o analista julga se o saldo é compatível com a viagem que você descreveu.',
        ],
        es: [
          'Extractos bancarios de los últimos seis meses',
          'El Reino Unido no fija un importe: el evaluador juzga si el saldo encaja con el viaje descrito.',
        ],
      },
      {
        en: [
          'Proof of income',
          'Payslips, or tax returns and company documents if you are self-employed.',
        ],
        pt: [
          'Comprovação de renda',
          'Holerites, ou declarações de imposto e documentos da empresa se você for autônomo.',
        ],
        es: [
          'Comprobante de ingresos',
          'Nóminas, o declaraciones de impuestos y documentos de la empresa si trabaja por cuenta propia.',
        ],
      },
      {
        en: [
          'Documents of whoever funds the trip',
          'If someone else pays, their statements and a letter stating the commitment.',
        ],
        pt: [
          'Documentos de quem financia a viagem',
          'Se outra pessoa paga, os extratos dela e uma carta declarando o compromisso.',
        ],
        es: [
          'Documentos de quien financia el viaje',
          'Si paga otra persona, sus extractos y una carta declarando el compromiso.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Pay the visa fee online',
          'The amount depends on the validity chosen: six months, two, five or ten years.',
        ],
        pt: [
          'Pagar a taxa do visto online',
          'O valor depende da validade escolhida: seis meses, dois, cinco ou dez anos.',
        ],
        es: [
          'Pagar la tasa del visado en línea',
          'El importe depende de la validez elegida: seis meses, dos, cinco o diez años.',
        ],
      },
      {
        en: [
          'Book the appointment at the visa application centre',
          'Only after paying; the system releases slots once the fee clears.',
        ],
        pt: [
          'Agendar atendimento no centro de pedidos de visto',
          'Só depois do pagamento; o sistema libera as vagas quando a taxa é compensada.',
        ],
        es: [
          'Reservar cita en el centro de solicitudes de visado',
          'Solo tras el pago; el sistema libera las citas cuando se acredita la tasa.',
        ],
      },
      {
        en: [
          'Upload the supporting documents',
          'Sent digitally beforehand or scanned at the centre; originals are not kept.',
        ],
        pt: [
          'Enviar os documentos de suporte',
          'Enviados digitalmente antes ou digitalizados no centro; os originais não ficam retidos.',
        ],
        es: [
          'Enviar los documentos de apoyo',
          'Se envían digitalmente antes o se escanean en el centro; los originales no se retienen.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric appointment',
          'Fingerprints and photograph taken at the application centre.',
        ],
        pt: [
          'Atendimento biométrico',
          'Impressões digitais e fotografia recolhidas no centro de pedidos.',
        ],
        es: [
          'Cita biométrica',
          'Huellas dactilares y fotografía tomadas en el centro de solicitudes.',
        ],
      },
      {
        en: [
          'Tuberculosis test certificate',
          'Required from residents of certain countries, from a clinic approved by the Home Office. Check whether yours is on the list.',
        ],
        pt: [
          'Certificado de teste de tuberculose',
          'Exigido a residentes de determinados países, feito em clínica aprovada pelo Home Office. Verifique se o seu está na lista.',
        ],
        es: [
          'Certificado de prueba de tuberculosis',
          'Exigido a residentes de ciertos países, en una clínica aprobada por el Home Office. Compruebe si el suyo está en la lista.',
        ],
        priority: 2,
        required: false,
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Collect the passport with the vignette',
          'Check the dates: the permission runs from the date printed, not from the date you arrive.',
        ],
        pt: [
          'Retirar o passaporte com a vinheta',
          'Confira as datas: a permissão corre a partir da data impressa, não da data em que você chega.',
        ],
        es: [
          'Recoger el pasaporte con la viñeta',
          'Verifique las fechas: el permiso corre desde la fecha impresa, no desde su llegada.',
        ],
      },
      {
        en: [
          'Do not work or study on a visitor visa',
          'Some short courses and business activities are allowed; paid work is not, under any arrangement.',
        ],
        pt: [
          'Não trabalhar nem estudar com visto de visitante',
          'Alguns cursos curtos e atividades de negócios são permitidos; trabalho remunerado não é, sob nenhum arranjo.',
        ],
        es: [
          'No trabajar ni estudiar con visado de visitante',
          'Algunos cursos cortos y actividades de negocios están permitidos; el trabajo remunerado no, bajo ningún acuerdo.',
        ],
      },
      {
        en: [
          'Do not spend most of the year in the UK as a visitor',
          'A long-validity visa is not residence. Repeated back-to-back visits get refused at the border.',
        ],
        pt: [
          'Não passar a maior parte do ano no Reino Unido como visitante',
          'Visto de validade longa não é residência. Visitas seguidas e repetidas acabam recusadas na fronteira.',
        ],
        es: [
          'No pasar la mayor parte del año en el Reino Unido como visitante',
          'Un visado de validez larga no es residencia. Las visitas seguidas y repetidas terminan rechazadas en la frontera.',
        ],
        priority: 2,
      },
    ],
  },

  'Work Visas': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Must cover the period of permission you are applying for.',
        ],
        pt: [
          'Passaporte válido',
          'Precisa cobrir o período de permissão que você está pedindo.',
        ],
        es: [
          'Pasaporte vigente',
          'Debe cubrir el periodo de permiso que solicita.',
        ],
      },
      {
        en: [
          'Certificate of Sponsorship reference number',
          'Issued by a licensed sponsor and valid for three months. Without it, a Skilled Worker application cannot even start.',
        ],
        pt: [
          'Número de referência do Certificate of Sponsorship',
          'Emitido por um patrocinador licenciado e válido por três meses. Sem ele, um pedido de Skilled Worker nem começa.',
        ],
        es: [
          'Número de referencia del Certificate of Sponsorship',
          'Lo emite un patrocinador con licencia y vale tres meses. Sin él, una solicitud de Skilled Worker ni siquiera empieza.',
        ],
      },
      {
        en: [
          'Online application on gov.uk',
          'Choose the exact route: Skilled Worker, Health and Care, Global Talent or Scale-up. Switching later means applying again.',
        ],
        pt: [
          'Pedido online no gov.uk',
          'Escolha a rota exata: Skilled Worker, Health and Care, Global Talent ou Scale-up. Mudar depois significa pedir de novo.',
        ],
        es: [
          'Solicitud en línea en gov.uk',
          'Elija la vía exacta: Skilled Worker, Health and Care, Global Talent o Scale-up. Cambiar después implica solicitar otra vez.',
        ],
      },
      {
        en: [
          'Criminal record certificate',
          'Required for certain occupations, including healthcare, education and social care.',
        ],
        pt: [
          'Certidão de antecedentes criminais',
          'Exigida em certas ocupações, incluindo saúde, educação e assistência social.',
        ],
        es: [
          'Certificado de antecedentes penales',
          'Exigido en ciertas ocupaciones, incluidas sanidad, educación y servicios sociales.',
        ],
        priority: 2,
        required: false,
      },
    ],
    education: [
      {
        en: [
          'Proof of English at the required level',
          'An approved test, a degree taught in English, or nationality from an exempt country.',
        ],
        pt: [
          'Comprovação de inglês no nível exigido',
          'Teste aprovado, diploma cursado em inglês, ou nacionalidade de país isento.',
        ],
        es: [
          'Prueba de inglés en el nivel exigido',
          'Un examen aprobado, un título cursado en inglés, o nacionalidad de un país exento.',
        ],
      },
      {
        en: [
          'Qualifications for the role',
          'Diplomas and certificates supporting the occupation code on the Certificate of Sponsorship.',
        ],
        pt: [
          'Qualificações para a função',
          'Diplomas e certificados que sustentam o código ocupacional indicado no Certificate of Sponsorship.',
        ],
        es: [
          'Cualificaciones para el puesto',
          'Títulos y certificados que respaldan el código ocupacional indicado en el Certificate of Sponsorship.',
        ],
      },
      {
        en: [
          'Endorsement from an approved body',
          'Global Talent runs on an endorsement instead of a sponsor, and that is obtained first.',
        ],
        pt: [
          'Endosso de entidade aprovada',
          'O Global Talent funciona com endosso em vez de patrocinador, e ele é obtido antes.',
        ],
        es: [
          'Aval de una entidad aprobada',
          'Global Talent funciona con un aval en lugar de patrocinador, y se obtiene antes.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Salary meeting the threshold for the route',
          'There is a general threshold and one specific to the occupation code; the higher of the two applies.',
        ],
        pt: [
          'Salário que atinge o piso da rota',
          'Há um piso geral e outro específico do código ocupacional; vale o maior dos dois.',
        ],
        es: [
          'Salario que alcanza el umbral de la vía',
          'Hay un umbral general y otro propio del código ocupacional; se aplica el mayor de los dos.',
        ],
      },
      {
        en: [
          'Proof of personal maintenance funds',
          'A set amount held for 28 consecutive days, unless the sponsor certifies maintenance on the Certificate of Sponsorship.',
        ],
        pt: [
          'Comprovação de fundos de manutenção pessoal',
          'Valor determinado mantido por 28 dias consecutivos, salvo se o patrocinador certificar a manutenção no Certificate of Sponsorship.',
        ],
        es: [
          'Prueba de fondos de manutención personal',
          'Un importe determinado mantenido 28 días consecutivos, salvo que el patrocinador certifique la manutención en el Certificate of Sponsorship.',
        ],
      },
    ],
    submission_fees: [
      {
        en: [
          'Pay the visa fee online',
          'It varies by route and by the length of permission requested.',
        ],
        pt: [
          'Pagar a taxa do visto online',
          'Varia conforme a rota e o tempo de permissão pedido.',
        ],
        es: [
          'Pagar la tasa del visado en línea',
          'Varía según la vía y el tiempo de permiso solicitado.',
        ],
      },
      {
        en: [
          'Pay the immigration health surcharge',
          'Charged up front for the whole period of permission, per person. It is usually the largest single cost of the application.',
        ],
        pt: [
          'Pagar o immigration health surcharge',
          'Cobrado antecipadamente por todo o período de permissão, por pessoa. Costuma ser o maior custo isolado do pedido.',
        ],
        es: [
          'Pagar el immigration health surcharge',
          'Se cobra por adelantado por todo el periodo de permiso, por persona. Suele ser el mayor coste individual de la solicitud.',
        ],
      },
      {
        en: [
          'Book the appointment at the visa application centre',
          'A priority service exists in most countries, at extra cost.',
        ],
        pt: [
          'Agendar atendimento no centro de pedidos de visto',
          'Existe serviço prioritário na maioria dos países, com custo adicional.',
        ],
        es: [
          'Reservar cita en el centro de solicitudes de visado',
          'Existe un servicio prioritario en la mayoría de los países, con coste adicional.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric appointment',
          'Fingerprints and photograph, or the ID Check app where your nationality allows it.',
        ],
        pt: [
          'Atendimento biométrico',
          'Impressões digitais e fotografia, ou o aplicativo ID Check quando sua nacionalidade permite.',
        ],
        es: [
          'Cita biométrica',
          'Huellas y fotografía, o la aplicación ID Check cuando su nacionalidad lo permite.',
        ],
      },
      {
        en: [
          'Tuberculosis test certificate',
          'Required from residents of certain countries for any stay over six months.',
        ],
        pt: [
          'Certificado de teste de tuberculose',
          'Exigido a residentes de determinados países para qualquer estada acima de seis meses.',
        ],
        es: [
          'Certificado de prueba de tuberculosis',
          'Exigido a residentes de ciertos países para cualquier estancia superior a seis meses.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Create the UKVI account and access the eVisa',
          'Permission is digital. There is no card: you prove your status by sharing a code from the account.',
        ],
        pt: [
          'Criar a conta UKVI e acessar o eVisa',
          'A permissão é digital. Não há cartão: você comprova o status compartilhando um código gerado na conta.',
        ],
        es: [
          'Crear la cuenta UKVI y acceder al eVisa',
          'El permiso es digital. No hay tarjeta: acredita su estatus compartiendo un código generado en la cuenta.',
        ],
      },
      {
        en: [
          'Start work only on the date on the Certificate of Sponsorship',
          'Starting earlier, or in a different role, breaches the sponsorship.',
        ],
        pt: [
          'Começar a trabalhar apenas na data do Certificate of Sponsorship',
          'Começar antes, ou em função diferente, viola o patrocínio.',
        ],
        es: [
          'Empezar a trabajar solo en la fecha del Certificate of Sponsorship',
          'Empezar antes, o en otro puesto, incumple el patrocinio.',
        ],
      },
      {
        en: [
          'Tell the Home Office if the job changes',
          'A change of employer, occupation code or salary generally requires a new application.',
        ],
        pt: [
          'Comunicar ao Home Office se o emprego mudar',
          'Troca de empregador, de código ocupacional ou de salário em geral exige novo pedido.',
        ],
        es: [
          'Comunicar al Home Office si el empleo cambia',
          'Un cambio de empleador, de código ocupacional o de salario suele exigir una nueva solicitud.',
        ],
      },
      {
        en: [
          'Count the time towards settlement',
          'Most work routes lead to indefinite leave to remain after a qualifying period, provided the permission is continuous.',
        ],
        pt: [
          'Contar o tempo para o settlement',
          'A maioria das rotas de trabalho leva a indefinite leave to remain após um período qualificado, desde que a permissão seja contínua.',
        ],
        es: [
          'Contar el tiempo para el settlement',
          'La mayoría de las vías de trabajo conduce al indefinite leave to remain tras un periodo cualificado, siempre que el permiso sea continuo.',
        ],
        priority: 2,
      },
    ],
  },

  'Study Visas': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'Must cover the course period plus the extra months the permission grants.',
        ],
        pt: [
          'Passaporte válido',
          'Precisa cobrir o período do curso mais os meses extras que a permissão concede.',
        ],
        es: [
          'Pasaporte vigente',
          'Debe cubrir el periodo del curso más los meses extra que concede el permiso.',
        ],
      },
      {
        en: [
          'Confirmation of Acceptance for Studies (CAS)',
          'Issued by a licensed student sponsor, valid for six months and usable once.',
        ],
        pt: [
          'Confirmation of Acceptance for Studies (CAS)',
          'Emitido por instituição licenciada, válido por seis meses e utilizável uma única vez.',
        ],
        es: [
          'Confirmation of Acceptance for Studies (CAS)',
          'Lo emite una institución con licencia, vale seis meses y se usa una sola vez.',
        ],
      },
      {
        en: [
          'Online application on gov.uk',
          'The CAS number links the application to your place on the course.',
        ],
        pt: [
          'Pedido online no gov.uk',
          'O número do CAS vincula o pedido à sua vaga no curso.',
        ],
        es: [
          'Solicitud en línea en gov.uk',
          'El número del CAS vincula la solicitud con su plaza en el curso.',
        ],
      },
      {
        en: [
          'Parental consent and evidence of care arrangements',
          'For applicants under 18, with both parents consenting to the travel and the accommodation.',
        ],
        pt: [
          'Consentimento parental e comprovação de acolhimento',
          'Para menores de 18 anos, com ambos os pais consentindo a viagem e o alojamento.',
        ],
        es: [
          'Consentimiento parental y prueba del acogimiento',
          'Para menores de 18 años, con ambos progenitores consintiendo el viaje y el alojamiento.',
        ],
        priority: 3,
        required: false,
      },
    ],
    education: [
      {
        en: [
          'Qualifications listed on the CAS',
          'Exactly the documents the institution used to offer you the place.',
        ],
        pt: [
          'Qualificações listadas no CAS',
          'Exatamente os documentos que a instituição usou para lhe oferecer a vaga.',
        ],
        es: [
          'Cualificaciones indicadas en el CAS',
          'Exactamente los documentos que la institución usó para ofrecerle la plaza.',
        ],
      },
      {
        en: [
          'Proof of English at the level for the course',
          'A Secure English Language Test, unless the institution assessed you itself and recorded that on the CAS.',
        ],
        pt: [
          'Comprovação de inglês no nível do curso',
          'Um Secure English Language Test, salvo se a instituição avaliou você diretamente e registou isso no CAS.',
        ],
        es: [
          'Prueba de inglés en el nivel del curso',
          'Un Secure English Language Test, salvo que la institución le evaluara y lo registrara en el CAS.',
        ],
      },
      {
        en: [
          'ATAS clearance',
          'Required for certain postgraduate courses in sensitive scientific and technological fields.',
        ],
        pt: [
          'Certificado ATAS',
          'Exigido em certos cursos de pós-graduação em áreas científicas e tecnológicas sensíveis.',
        ],
        es: [
          'Certificado ATAS',
          'Exigido en ciertos cursos de posgrado en áreas científicas y tecnológicas sensibles.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Funds for tuition and living costs',
          'Course fees for the first year plus a monthly living amount, higher in London than elsewhere.',
        ],
        pt: [
          'Recursos para mensalidade e custo de vida',
          'Mensalidade do primeiro ano mais um valor mensal de subsistência, maior em Londres que no resto do país.',
        ],
        es: [
          'Fondos para matrícula y coste de vida',
          'Matrícula del primer año más un importe mensual de subsistencia, mayor en Londres que en el resto del país.',
        ],
      },
      {
        en: [
          'Funds held for 28 consecutive days',
          'The statement must end no more than 31 days before the application. This rule fails more applications than any other.',
        ],
        pt: [
          'Fundos mantidos por 28 dias consecutivos',
          'O extrato precisa terminar no máximo 31 dias antes do pedido. Essa regra reprova mais pedidos do que qualquer outra.',
        ],
        es: [
          'Fondos mantenidos 28 días consecutivos',
          'El extracto debe terminar como máximo 31 días antes de la solicitud. Esta regla suspende más solicitudes que ninguna otra.',
        ],
      },
      {
        en: [
          'Official financial sponsorship letter',
          'If a government or an international body funds you, it replaces the personal funds requirement.',
        ],
        pt: [
          'Carta de patrocínio financeiro oficial',
          'Se um governo ou organismo internacional custeia, ela substitui a exigência de fundos próprios.',
        ],
        es: [
          'Carta de patrocinio financiero oficial',
          'Si un gobierno u organismo internacional le financia, sustituye el requisito de fondos propios.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Pay the visa fee online',
          'Applying from inside the UK costs more than applying from abroad.',
        ],
        pt: [
          'Pagar a taxa do visto online',
          'Pedir de dentro do Reino Unido custa mais do que pedir do exterior.',
        ],
        es: [
          'Pagar la tasa del visado en línea',
          'Solicitar desde dentro del Reino Unido cuesta más que hacerlo desde el extranjero.',
        ],
      },
      {
        en: [
          'Pay the immigration health surcharge',
          'Students pay a reduced rate, still charged up front for the whole period.',
        ],
        pt: [
          'Pagar o immigration health surcharge',
          'Estudantes pagam taxa reduzida, ainda assim cobrada antecipadamente por todo o período.',
        ],
        es: [
          'Pagar el immigration health surcharge',
          'Los estudiantes pagan una tasa reducida, igualmente cobrada por adelantado por todo el periodo.',
        ],
      },
      {
        en: [
          'Book the appointment at the visa application centre',
          'Apply no earlier than six months before the course starts.',
        ],
        pt: [
          'Agendar atendimento no centro de pedidos de visto',
          'Peça no máximo seis meses antes do início do curso.',
        ],
        es: [
          'Reservar cita en el centro de solicitudes de visado',
          'Solicite como mucho seis meses antes del inicio del curso.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric appointment',
          'Fingerprints and photograph, or the ID Check app where your nationality allows it.',
        ],
        pt: [
          'Atendimento biométrico',
          'Impressões digitais e fotografia, ou o aplicativo ID Check quando sua nacionalidade permite.',
        ],
        es: [
          'Cita biométrica',
          'Huellas y fotografía, o la aplicación ID Check cuando su nacionalidad lo permite.',
        ],
      },
      {
        en: [
          'Tuberculosis test certificate',
          'Required from residents of certain countries for any stay over six months.',
        ],
        pt: [
          'Certificado de teste de tuberculose',
          'Exigido a residentes de determinados países para qualquer estada acima de seis meses.',
        ],
        es: [
          'Certificado de prueba de tuberculosis',
          'Exigido a residentes de ciertos países para cualquier estancia superior a seis meses.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Create the UKVI account and access the eVisa',
          'Your permission lives in the account; universities check it by the share code.',
        ],
        pt: [
          'Criar a conta UKVI e acessar o eVisa',
          'Sua permissão vive na conta; as universidades a verificam pelo share code.',
        ],
        es: [
          'Crear la cuenta UKVI y acceder al eVisa',
          'Su permiso vive en la cuenta; las universidades lo verifican con el share code.',
        ],
      },
      {
        en: [
          'Enrol at the institution on arrival',
          'The sponsor reports enrolment to the Home Office. Not turning up gets the sponsorship withdrawn.',
        ],
        pt: [
          'Fazer a matrícula na instituição ao chegar',
          'A instituição reporta a matrícula ao Home Office. Não aparecer leva à retirada do patrocínio.',
        ],
        es: [
          'Matricularse en la institución al llegar',
          'La institución informa de la matrícula al Home Office. No presentarse conlleva la retirada del patrocinio.',
        ],
      },
      {
        en: [
          'Respect the limit on working hours',
          'Term-time work is capped, and the cap depends on the level of the course.',
        ],
        pt: [
          'Respeitar o limite de horas de trabalho',
          'O trabalho durante o período letivo tem teto, e o teto depende do nível do curso.',
        ],
        es: [
          'Respetar el límite de horas de trabajo',
          'El trabajo durante el periodo lectivo tiene tope, y el tope depende del nivel del curso.',
        ],
      },
      {
        en: [
          'Consider the Graduate route before the permission ends',
          'It allows staying on to work after the course, but it has to be applied for while the student permission is still valid.',
        ],
        pt: [
          'Avaliar a rota Graduate antes do fim da permissão',
          'Ela permite ficar trabalhando após o curso, mas precisa ser pedida enquanto a permissão de estudante ainda é válida.',
        ],
        es: [
          'Evaluar la vía Graduate antes de que acabe el permiso',
          'Permite quedarse a trabajar tras el curso, pero debe solicitarse mientras el permiso de estudiante siga vigente.',
        ],
        priority: 2,
        required: false,
      },
    ],
  },

  'Family & Settlement Visas': {
    core_documents: [
      {
        en: [
          'Valid passport',
          'For every family member included in the application.',
        ],
        pt: ['Passaporte válido', 'Para cada familiar incluído no pedido.'],
        es: [
          'Pasaporte vigente',
          'Para cada familiar incluido en la solicitud.',
        ],
      },
      {
        en: [
          'Evidence of the relationship',
          'Marriage or civil partnership certificate, or birth certificates for children.',
        ],
        pt: [
          'Comprovação do vínculo familiar',
          'Certidão de casamento ou de união civil, ou certidões de nascimento no caso de filhos.',
        ],
        es: [
          'Prueba del vínculo familiar',
          'Certificado de matrimonio o de pareja de hecho, o partidas de nacimiento en el caso de los hijos.',
        ],
      },
      {
        en: [
          'Evidence the relationship is genuine and subsisting',
          'Messages, photographs, joint travel, shared bills. Volume matters less than continuity over time.',
        ],
        pt: [
          'Comprovação de que a relação é genuína e subsistente',
          'Mensagens, fotografias, viagens em conjunto, contas partilhadas. O volume importa menos que a continuidade ao longo do tempo.',
        ],
        es: [
          'Prueba de que la relación es genuina y subsistente',
          'Mensajes, fotografías, viajes juntos, facturas compartidas. El volumen importa menos que la continuidad en el tiempo.',
        ],
      },
      {
        en: [
          "Proof of the sponsor's status in the UK",
          'British citizenship, settled status or the relevant permission, plus proof of their address.',
        ],
        pt: [
          'Comprovação do status do patrocinador no Reino Unido',
          'Cidadania britânica, settled status ou a permissão aplicável, além de comprovativo de morada.',
        ],
        es: [
          'Prueba del estatus del patrocinador en el Reino Unido',
          'Ciudadanía británica, settled status o el permiso aplicable, además de comprobante de domicilio.',
        ],
      },
      {
        en: [
          'Evidence of adequate accommodation',
          'The home must not be overcrowded under the statutory definition.',
        ],
        pt: [
          'Comprovação de alojamento adequado',
          'A habitação não pode estar superlotada segundo a definição legal.',
        ],
        es: [
          'Prueba de alojamiento adecuado',
          'La vivienda no puede estar sobreocupada según la definición legal.',
        ],
      },
    ],
    education: [
      {
        en: [
          'Proof of English at the required level',
          'The level rises at each stage: one level to enter, a higher one to extend, and a higher one still for settlement.',
        ],
        pt: [
          'Comprovação de inglês no nível exigido',
          'O nível sobe a cada etapa: um para entrar, outro mais alto para prorrogar, e outro ainda maior para o settlement.',
        ],
        es: [
          'Prueba de inglés en el nivel exigido',
          'El nivel sube en cada etapa: uno para entrar, otro mayor para prorrogar, y otro aún mayor para el settlement.',
        ],
      },
      {
        en: [
          'Life in the UK test',
          'Required for indefinite leave to remain, not for the initial visa. Book it well before the application.',
        ],
        pt: [
          'Teste Life in the UK',
          'Exigido para o indefinite leave to remain, não para o visto inicial. Agende-o bem antes do pedido.',
        ],
        es: [
          'Examen Life in the UK',
          'Exigido para el indefinite leave to remain, no para el visado inicial. Resérvelo bastante antes de la solicitud.',
        ],
        priority: 2,
        required: false,
      },
    ],
    financial_requirements: [
      {
        en: [
          'Sponsor income meeting the minimum threshold',
          'Confirm the figure in force: it was raised recently and further increases have been announced.',
        ],
        pt: [
          'Renda do patrocinador no piso mínimo',
          'Confirme o valor em vigor: ele foi elevado recentemente e há novos aumentos anunciados.',
        ],
        es: [
          'Ingresos del patrocinador en el umbral mínimo',
          'Confirme la cifra vigente: se elevó recientemente y hay nuevos aumentos anunciados.',
        ],
      },
      {
        en: [
          'Payslips and bank statements for six months',
          'They have to match each other to the penny; a discrepancy is treated as unevidenced income.',
        ],
        pt: [
          'Holerites e extratos bancários de seis meses',
          'Precisam bater entre si até o centavo; divergência é tratada como renda não comprovada.',
        ],
        es: [
          'Nóminas y extractos bancarios de seis meses',
          'Deben coincidir entre sí hasta el céntimo; una discrepancia se trata como ingreso no acreditado.',
        ],
      },
      {
        en: [
          'Employment contract or self-employment accounts',
          'For the self-employed the assessed period is the full tax year, which changes what counts.',
        ],
        pt: [
          'Contrato de trabalho ou contabilidade de autônomo',
          'Para autônomos o período avaliado é o ano fiscal completo, o que muda o que conta.',
        ],
        es: [
          'Contrato de trabajo o contabilidad de autónomo',
          'Para autónomos el periodo evaluado es el año fiscal completo, lo que cambia qué cuenta.',
        ],
      },
      {
        en: [
          'Cash savings, if income falls short',
          'Savings can make up the difference, but they must have been held for six months.',
        ],
        pt: [
          'Poupança, se a renda não alcançar o piso',
          'A poupança pode cobrir a diferença, mas precisa estar mantida há seis meses.',
        ],
        es: [
          'Ahorros, si los ingresos no alcanzan el umbral',
          'Los ahorros pueden cubrir la diferencia, pero deben mantenerse desde hace seis meses.',
        ],
        priority: 2,
        required: false,
      },
    ],
    submission_fees: [
      {
        en: [
          'Pay the visa fee online',
          'Family routes are among the most expensive, and the fee is per applicant.',
        ],
        pt: [
          'Pagar a taxa do visto online',
          'As rotas familiares estão entre as mais caras, e a taxa é por requerente.',
        ],
        es: [
          'Pagar la tasa del visado en línea',
          'Las vías familiares están entre las más caras, y la tasa es por solicitante.',
        ],
      },
      {
        en: [
          'Pay the immigration health surcharge',
          'Charged for the whole period of permission, for each person included.',
        ],
        pt: [
          'Pagar o immigration health surcharge',
          'Cobrado por todo o período de permissão, para cada pessoa incluída.',
        ],
        es: [
          'Pagar el immigration health surcharge',
          'Se cobra por todo el periodo de permiso, para cada persona incluida.',
        ],
      },
      {
        en: [
          'Book the appointment at the visa application centre',
          'Family routes take longer to decide than work or study ones.',
        ],
        pt: [
          'Agendar atendimento no centro de pedidos de visto',
          'As rotas familiares levam mais tempo para decisão que as de trabalho ou estudo.',
        ],
        es: [
          'Reservar cita en el centro de solicitudes de visado',
          'Las vías familiares tardan más en resolverse que las de trabajo o estudio.',
        ],
      },
    ],
    biometrics_health: [
      {
        en: [
          'Biometric appointment',
          'For every applicant, including children.',
        ],
        pt: [
          'Atendimento biométrico',
          'Para cada requerente, incluindo crianças.',
        ],
        es: ['Cita biométrica', 'Para cada solicitante, incluidos los niños.'],
      },
      {
        en: [
          'Tuberculosis test certificate',
          'Required from residents of certain countries, for each applicant over 11.',
        ],
        pt: [
          'Certificado de teste de tuberculose',
          'Exigido a residentes de determinados países, para cada requerente acima de 11 anos.',
        ],
        es: [
          'Certificado de prueba de tuberculosis',
          'Exigido a residentes de ciertos países, para cada solicitante mayor de 11 años.',
        ],
      },
    ],
    post_approval_steps: [
      {
        en: [
          'Create the UKVI account and access the eVisa',
          'Each family member has their own account and their own share code.',
        ],
        pt: [
          'Criar a conta UKVI e acessar o eVisa',
          'Cada familiar tem a própria conta e o próprio share code.',
        ],
        es: [
          'Crear la cuenta UKVI y acceder al eVisa',
          'Cada familiar tiene su propia cuenta y su propio share code.',
        ],
      },
      {
        en: [
          'Extend the permission before it expires',
          'The family route reaches settlement in stages, and each stage has to be applied for in time.',
        ],
        pt: [
          'Prorrogar a permissão antes do vencimento',
          'A rota familiar chega ao settlement em etapas, e cada etapa precisa ser pedida a tempo.',
        ],
        es: [
          'Prorrogar el permiso antes de que caduque',
          'La vía familiar llega al settlement por etapas, y cada etapa debe solicitarse a tiempo.',
        ],
      },
      {
        en: [
          'Keep evidence of cohabitation throughout',
          'Each stage asks for it again, covering the period since the previous application. Gathering it as you go is far easier than reconstructing it later.',
        ],
        pt: [
          'Manter provas de coabitação ao longo de todo o período',
          'Cada etapa volta a pedi-las, cobrindo o intervalo desde o pedido anterior. Juntá-las ao longo do caminho é muito mais fácil que reconstruí-las depois.',
        ],
        es: [
          'Conservar pruebas de convivencia durante todo el periodo',
          'Cada etapa vuelve a pedirlas, cubriendo el intervalo desde la solicitud anterior. Reunirlas sobre la marcha es mucho más fácil que reconstruirlas después.',
        ],
      },
      {
        en: [
          'Apply for indefinite leave to remain at the end of the route',
          'It requires the qualifying period, the English level and the Life in the UK test, all together.',
        ],
        pt: [
          'Pedir indefinite leave to remain ao fim da rota',
          'Exige o período qualificado, o nível de inglês e o teste Life in the UK, tudo em conjunto.',
        ],
        es: [
          'Solicitar el indefinite leave to remain al final de la vía',
          'Exige el periodo cualificado, el nivel de inglés y el examen Life in the UK, todo junto.',
        ],
        priority: 2,
      },
    ],
  },
};
