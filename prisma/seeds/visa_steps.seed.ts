import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

const stepsEn = {
  core_documents: [
    {
      name: 'Valid passport (applicant and sponsor)',
      required: true,
      priority: 1,
      notes:
        'Passport must be valid for the duration of the visa process and stay.',
      checked: false,
    },
    {
      name: 'Completed visa application form',
      required: true,
      priority: 1,
      notes:
        'Correct form depending on family, partner, or dependent visa subclass.',
      checked: false,
    },
    {
      name: 'Passport-sized photographs',
      required: true,
      priority: 2,
      notes: 'Recent photos meeting Australian visa specifications.',
      checked: false,
    },
    {
      name: 'Birth certificate',
      required: true,
      priority: 2,
      notes: 'For applicant and dependents; must show parents names.',
      checked: false,
    },
  ],
  relationship_evidence: [
    {
      name: 'Marriage certificate or registered relationship certificate',
      required: true,
      priority: 1,
      notes: 'Required for spouse or registered partner visas.',
      checked: false,
    },
    {
      name: 'Evidence of de facto relationship',
      required: false,
      priority: 1,
      notes:
        'Joint finances, shared household, social recognition, and commitment evidence.',
      checked: false,
    },
    {
      name: 'Relationship statements',
      required: true,
      priority: 2,
      notes:
        'Personal statements from applicant and sponsor describing the relationship history.',
      checked: false,
    },
    {
      name: 'Evidence of ongoing relationship',
      required: true,
      priority: 2,
      notes:
        'Photos, travel records, messages, joint invitations, or correspondence.',
      checked: false,
    },
  ],
  sponsor_requirements: [
    {
      name: 'Sponsor eligibility evidence',
      required: true,
      priority: 1,
      notes:
        'Proof of Australian citizenship, permanent residence, or eligible New Zealand citizenship.',
      checked: false,
    },
    {
      name: 'Sponsor identification documents',
      required: true,
      priority: 1,
      notes: 'Passport or citizenship certificate of the sponsor.',
      checked: false,
    },
    {
      name: 'Sponsor statutory declaration',
      required: true,
      priority: 2,
      notes: 'Formal declaration supporting the relationship and sponsorship.',
      checked: false,
    },
  ],
  dependent_children: [
    {
      name: 'Child birth certificate',
      required: false,
      priority: 2,
      notes: 'Required if applying with dependent children.',
      checked: false,
    },
    {
      name: 'Proof of dependency',
      required: false,
      priority: 3,
      notes:
        'Evidence that the child is financially dependent on the applicant or sponsor.',
      checked: false,
    },
    {
      name: 'Parental consent documents',
      required: false,
      priority: 2,
      notes:
        'Required if one parent is not migrating or does not have custody.',
      checked: false,
    },
  ],
  health_and_character: [
    {
      name: 'Medical examination results',
      required: true,
      priority: 1,
      notes: 'Must be completed with an approved panel physician.',
      checked: false,
    },
    {
      name: 'Police clearance certificates',
      required: true,
      priority: 1,
      notes: 'Required for all countries lived in for 12 months or more.',
      checked: false,
    },
  ],
  financial_and_supporting: [
    {
      name: 'Evidence of financial support',
      required: true,
      priority: 3,
      notes:
        'Bank statements, payslips, or tax documents demonstrating financial stability.',
      checked: false,
    },
    {
      name: 'Accommodation evidence',
      required: false,
      priority: 4,
      notes:
        'Lease, property ownership, or letter confirming living arrangements in Australia.',
      checked: false,
    },
  ],
  application_and_fees: [
    {
      name: 'Visa application fee payment receipt',
      required: true,
      priority: 1,
      notes: 'Proof of payment for the correct visa subclass.',
      checked: false,
    },
    {
      name: 'Biometrics appointment confirmation',
      required: false,
      priority: 2,
      notes: 'Required if requested after application lodgement.',
      checked: false,
    },
  ],
  post_lodgement_and_approval: [
    {
      name: 'Additional information requests',
      required: false,
      priority: 4,
      notes:
        'Respond promptly to any requests from the Department of Home Affairs.',
      checked: false,
    },
    {
      name: 'Visa grant notice',
      required: false,
      priority: 5,
      notes: 'Official confirmation of visa approval and conditions.',
      checked: false,
    },
  ],
};

const stepsEs = {
  core_documents: [
    {
      name: 'Pasaporte valido (solicitante y patrocinador)',
      required: true,
      priority: 1,
      notes: 'El pasaporte debe ser valido durante el proceso y la estancia.',
      checked: false,
    },
    {
      name: 'Formulario de solicitud de visa completado',
      required: true,
      priority: 1,
      notes: 'Formulario correcto segun familia, pareja o visa de dependiente.',
      checked: false,
    },
    {
      name: 'Fotografias tipo pasaporte',
      required: true,
      priority: 2,
      notes: 'Fotos recientes que cumplen las especificaciones.',
      checked: false,
    },
    {
      name: 'Certificado de nacimiento',
      required: true,
      priority: 2,
      notes: 'Para solicitante y dependientes; debe incluir nombres de padres.',
      checked: false,
    },
  ],
  relationship_evidence: [
    {
      name: 'Certificado de matrimonio o relacion registrada',
      required: true,
      priority: 1,
      notes: 'Requerido para visas de pareja o conyuge.',
      checked: false,
    },
    {
      name: 'Evidencia de relacion de hecho',
      required: false,
      priority: 1,
      notes:
        'Finanzas conjuntas, hogar compartido, reconocimiento social y compromiso.',
      checked: false,
    },
    {
      name: 'Declaraciones de relacion',
      required: true,
      priority: 2,
      notes:
        'Declaraciones personales del solicitante y patrocinador con historia de la relacion.',
      checked: false,
    },
    {
      name: 'Evidencia de relacion continua',
      required: true,
      priority: 2,
      notes:
        'Fotos, viajes, mensajes, invitaciones conjuntas o correspondencia.',
      checked: false,
    },
  ],
  sponsor_requirements: [
    {
      name: 'Evidencia de elegibilidad del patrocinador',
      required: true,
      priority: 1,
      notes:
        'Prueba de ciudadania australiana, residencia permanente o ciudadania NZ elegible.',
      checked: false,
    },
    {
      name: 'Documentos de identificacion del patrocinador',
      required: true,
      priority: 1,
      notes: 'Pasaporte o certificado de ciudadania del patrocinador.',
      checked: false,
    },
    {
      name: 'Declaracion estatutaria del patrocinador',
      required: true,
      priority: 2,
      notes: 'Declaracion formal que respalda la relacion y el patrocinio.',
      checked: false,
    },
  ],
  dependent_children: [
    {
      name: 'Certificado de nacimiento del hijo',
      required: false,
      priority: 2,
      notes: 'Requerido si se aplica con hijos dependientes.',
      checked: false,
    },
    {
      name: 'Prueba de dependencia',
      required: false,
      priority: 3,
      notes:
        'Evidencia de que el hijo depende financieramente del solicitante o patrocinador.',
      checked: false,
    },
    {
      name: 'Documentos de consentimiento parental',
      required: false,
      priority: 2,
      notes: 'Requerido si uno de los padres no migra o no tiene custodia.',
      checked: false,
    },
  ],
  health_and_character: [
    {
      name: 'Resultados de examen medico',
      required: true,
      priority: 1,
      notes: 'Debe realizarse con un medico autorizado.',
      checked: false,
    },
    {
      name: 'Certificados de antecedentes policiales',
      required: true,
      priority: 1,
      notes: 'Requerido para paises donde vivio 12 meses o mas.',
      checked: false,
    },
  ],
  financial_and_supporting: [
    {
      name: 'Evidencia de soporte financiero',
      required: true,
      priority: 3,
      notes:
        'Estados de cuenta, recibos de pago o impuestos que demuestren estabilidad.',
      checked: false,
    },
    {
      name: 'Evidencia de alojamiento',
      required: false,
      priority: 4,
      notes:
        'Contrato de alquiler, propiedad o carta que confirme alojamiento en Australia.',
      checked: false,
    },
  ],
  application_and_fees: [
    {
      name: 'Recibo de pago de la tarifa de visa',
      required: true,
      priority: 1,
      notes: 'Prueba de pago de la tarifa correcta.',
      checked: false,
    },
    {
      name: 'Confirmacion de cita biometrica',
      required: false,
      priority: 2,
      notes: 'Requerido si se solicita despues de la solicitud.',
      checked: false,
    },
  ],
  post_lodgement_and_approval: [
    {
      name: 'Solicitudes de informacion adicional',
      required: false,
      priority: 4,
      notes:
        'Responder rapidamente a solicitudes del Departamento de Home Affairs.',
      checked: false,
    },
    {
      name: 'Aviso de concesion de visa',
      required: false,
      priority: 5,
      notes: 'Confirmacion oficial de aprobacion y condiciones de la visa.',
      checked: false,
    },
  ],
};

const stepsPt = {
  core_documents: [
    {
      name: 'Passaporte valido (solicitante e patrocinador)',
      required: true,
      priority: 1,
      notes: 'O passaporte deve ser valido durante o processo e a estada.',
      checked: false,
    },
    {
      name: 'Formulario de solicitacao de visto preenchido',
      required: true,
      priority: 1,
      notes:
        'Formulario correto conforme familia, parceiro ou visto de dependente.',
      checked: false,
    },
    {
      name: 'Fotos tipo passaporte',
      required: true,
      priority: 2,
      notes: 'Fotos recentes conforme as especificacoes.',
      checked: false,
    },
    {
      name: 'Certidao de nascimento',
      required: true,
      priority: 2,
      notes: 'Para solicitante e dependentes; deve incluir nomes dos pais.',
      checked: false,
    },
  ],
  relationship_evidence: [
    {
      name: 'Certidao de casamento ou uniao registrada',
      required: true,
      priority: 1,
      notes: 'Obrigatorio para vistos de conjuge ou parceiro registrado.',
      checked: false,
    },
    {
      name: 'Evidencias de relacao de fato',
      required: false,
      priority: 1,
      notes:
        'Financas conjuntas, residencia compartilhada, reconhecimento social e compromisso.',
      checked: false,
    },
    {
      name: 'Declaracoes sobre a relacao',
      required: true,
      priority: 2,
      notes:
        'Declaracoes pessoais do solicitante e patrocinador com historico da relacao.',
      checked: false,
    },
    {
      name: 'Evidencias de relacao continua',
      required: true,
      priority: 2,
      notes:
        'Fotos, viagens, mensagens, convites conjuntos ou correspondencia.',
      checked: false,
    },
  ],
  sponsor_requirements: [
    {
      name: 'Evidencia de elegibilidade do patrocinador',
      required: true,
      priority: 1,
      notes:
        'Prova de cidadania australiana, residencia permanente ou cidadania NZ elegivel.',
      checked: false,
    },
    {
      name: 'Documentos de identificacao do patrocinador',
      required: true,
      priority: 1,
      notes: 'Passaporte ou certificado de cidadania do patrocinador.',
      checked: false,
    },
    {
      name: 'Declaracao estatutaria do patrocinador',
      required: true,
      priority: 2,
      notes: 'Declaracao formal que apoia a relacao e o patrocinio.',
      checked: false,
    },
  ],
  dependent_children: [
    {
      name: 'Certidao de nascimento da crianca',
      required: false,
      priority: 2,
      notes: 'Obrigatorio se aplicar com filhos dependentes.',
      checked: false,
    },
    {
      name: 'Prova de dependencia',
      required: false,
      priority: 3,
      notes:
        'Evidencia de que a crianca depende financeiramente do solicitante ou patrocinador.',
      checked: false,
    },
    {
      name: 'Documentos de consentimento parental',
      required: false,
      priority: 2,
      notes: 'Obrigatorio se um dos pais nao migra ou nao tem custodia.',
      checked: false,
    },
  ],
  health_and_character: [
    {
      name: 'Resultados de exame medico',
      required: true,
      priority: 1,
      notes: 'Deve ser feito com medico autorizado.',
      checked: false,
    },
    {
      name: 'Certidoes de antecedentes policiais',
      required: true,
      priority: 1,
      notes: 'Obrigatorio para paises onde viveu 12 meses ou mais.',
      checked: false,
    },
  ],
  financial_and_supporting: [
    {
      name: 'Evidencia de suporte financeiro',
      required: true,
      priority: 3,
      notes:
        'Extratos bancarios, holerites ou impostos que comprovem estabilidade.',
      checked: false,
    },
    {
      name: 'Evidencia de hospedagem',
      required: false,
      priority: 4,
      notes:
        'Contrato de aluguel, propriedade ou carta confirmando acomodacao na Australia.',
      checked: false,
    },
  ],
  application_and_fees: [
    {
      name: 'Recibo de pagamento da taxa de visto',
      required: true,
      priority: 1,
      notes: 'Comprovante de pagamento da taxa correta.',
      checked: false,
    },
    {
      name: 'Confirmacao de agendamento de biometria',
      required: false,
      priority: 2,
      notes: 'Obrigatorio se solicitado apos a solicitacao.',
      checked: false,
    },
  ],
  post_lodgement_and_approval: [
    {
      name: 'Solicitacoes de informacao adicional',
      required: false,
      priority: 4,
      notes:
        'Responder rapidamente a solicitacoes do Departamento de Home Affairs.',
      checked: false,
    },
    {
      name: 'Aviso de concessao do visto',
      required: false,
      priority: 5,
      notes: 'Confirmacao oficial de aprovacao e condicoes do visto.',
      checked: false,
    },
  ],
};

export async function seedVisaSteps() {
  const visaTypes = await prisma.immigrationVisaType.findMany();

  if (!visaTypes.length) {
    console.log('No visa types found. Skipping visa steps seed.');
    return;
  }

  for (const visaType of visaTypes) {
    await prisma.visaSteps.deleteMany({
      where: {
        visa_type_id: visaType.id,
        language: {
          in: ['en', 'es', 'pt'],
        },
      },
    });

    await prisma.visaSteps.createMany({
      data: [
        {
          visa_type_id: visaType.id,
          language: 'en',
          steps: stepsEn,
        },
        {
          visa_type_id: visaType.id,
          language: 'es',
          steps: stepsEs,
        },
        {
          visa_type_id: visaType.id,
          language: 'pt',
          steps: stepsPt,
        },
      ],
    });
  }

  console.log('Visa steps seed completed successfully.');
}
