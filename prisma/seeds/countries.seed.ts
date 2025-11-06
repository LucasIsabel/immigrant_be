import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export async function seedCountries() {
  const countries = [
    {
      name: 'Spain',
      flag: '🇪🇸',
      region: 'Europe',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Work Visa',
        'Student Visa',
        'Non-lucrative Residence Visa',
      ],
      processing_time: '15–45 days',
      investment_required:
        '≈€31,752 (income requirement for digital nomad) + other fees',
      language_requirement: 'Spanish (basic to intermediate)',
      job_market: 'Moderate',
      benefits: [
        'Pleasant climate',
        'Affordable cost of living',
        'Rich culture',
      ],
      challenges: ['High unemployment', 'Bureaucracy'],
      popular_cities: ['Madrid', 'Barcelona', 'Valencia'],
      created_at: '2025-07-05T00:00:00Z',
      updated_at: '2025-07-05T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/spain.png',
      descriptions: [
        {
          language: 'pt',
          description:
            'A Espanha oferece vistos de trabalho, estudos e residência não-lucrativa/digital nomad, com prazos entre 15 e 45 dias úteis.',
        },
        {
          language: 'en',
          description:
            'Spain offers work, student, and non-lucrative/digital nomad residence visas, processed within 15 to 45 working days.',
        },
        {
          language: 'es',
          description:
            'España ofrece visados de trabajo, estudios y residencia no lucrativa/digital nomad, procesados entre 15 y 45 días hábiles.',
        },
      ],
    },
    {
      name: 'United Kingdom',
      flag: '🇬🇧',
      region: 'Europe',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Skilled Worker Visa',
        'Student Visa (Tier 4)',
        'Global Talent Visa',
      ],
      processing_time: '3–8 weeks (outside UK)',
      investment_required:
        'Certificate Fee + Immigration Health Surcharge + visa fee',
      language_requirement: 'English (B1+)',
      job_market: 'High',
      benefits: [
        'High earning potential',
        'Access to global job market',
        'English-speaking environment',
      ],
      challenges: ['Expensive cost of living', 'Frequent policy changes'],
      popular_cities: ['London', 'Manchester', 'Edinburgh'],
      created_at: '2025-07-05T00:00:00Z',
      updated_at: '2025-07-05T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/united_kingdom.png',
      descriptions: [
        {
          language: 'pt',
          description:
            'O Reino Unido oferece o Skilled Worker Visa com decisão em cerca de 3 semanas (externo) e até 8 semanas interno.',
        },
        {
          language: 'en',
          description:
            'The UK offers the Skilled Worker Visa, typically decided within 3 weeks outside the UK and 8 weeks inside.',
        },
        {
          language: 'es',
          description:
            'El Reino Unido ofrece el Skilled Worker Visa, con decisión en unas 3 semanas desde el exterior y 8 dentro.',
        },
      ],
    },
    {
      name: 'Canada',
      flag: '🇨🇦',
      region: 'North America',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Express Entry (PR)',
        'Skilled Worker Work Permit',
        'Study Permit',
      ],
      processing_time:
        '80% dos pedidos PR em até 6 meses; +3‑4 meses para quem aplica fora do Canadá',
      investment_required: 'Taxas IRCC + prova de fundos (~CAD 13.000)',
      language_requirement: 'English/French (CLB 7+)',
      job_market: 'High',
      benefits: ['Saúde pública', 'Educação de qualidade', 'Alta diversidade'],
      challenges: ['Inverno rigoroso', 'Custo de vida em cidades grandes'],
      popular_cities: ['Toronto', 'Vancouver', 'Montreal'],
      created_at: '2025-07-05T00:00:00Z',
      updated_at: '2025-07-05T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/canada.png',
      descriptions: [
        {
          language: 'pt',
          description:
            'O sistema Express Entry processa 80% dos pedidos em até 6 meses, e aplicações fora do Canadá levam +3‑4 meses para retorno de documentos.',
        },
        {
          language: 'en',
          description:
            "Canada's Express Entry system processes 80% of permanent residency applications in 6 months, with an additional 3–4 months for passport return when applying abroad.",
        },
        {
          language: 'es',
          description:
            'El sistema Express Entry de Canadá procesa el 80 % de solicitudes de residencia permanente en 6 meses, con 3–4 meses adicionales para devolución de pasaporte en el exterior.',
        },
      ],
    },
    {
      name: 'Australia',
      flag: '🇦🇺',
      region: 'Oceania',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Skilled Migration Visa (Permanent)',
        'Temporary Skilled Visa (Subclass 482)',
        'Student Visa',
      ],
      processing_time:
        'Skilled (Permanent): ~10 meses; Skilled (Temporary): ~98 dias medianos',
      investment_required: 'Taxas + comprovação de fundos (~AUD 20.000)',
      language_requirement: 'English (IELTS 6+)',
      job_market: 'High',
      benefits: ['Qualidade de vida', 'Saúde pública (Medicare)', 'Segurança'],
      challenges: ['Alto custo habitacional', 'Distância geográfica'],
      popular_cities: ['Sydney', 'Melbourne', 'Brisbane'],
      created_at: '2025-07-05T00:00:00Z',
      updated_at: '2025-07-05T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/new_zealand.png',
      descriptions: [
        {
          language: 'pt',
          description:
            'O visto Skilled Permanente leva cerca de 10 meses, e o temporário (482) tem tempo mediano de 98 dias, segundo governo austríaco.',
        },
        {
          language: 'en',
          description:
            "Australia's permanent skilled visas take around 10 months, while the temporary 482 visa has a median processing time of 98 days, according to Home Affairs.",
        },
        {
          language: 'es',
          description:
            'Los visados cualificados permanentes de Australia tardan unos 10 meses, mientras que el 482 temporal tiene un tiempo medio de 98 días, según el Ministerio.',
        },
      ],
    },
    {
      name: 'Japan',
      flag: '🇯🇵',
      region: 'Asia',
      difficulty: 'Hard',
      difficulty_score: 4,
      visa_options: [
        'Highly Skilled Professional Visa',
        'Work Visa (General)',
        'Business Manager Visa',
      ],
      processing_time:
        '≈1 semana (emissão de visto no consulado, se documentos completos)',
      investment_required:
        'Taxas consulares + comprovação financeira (~¥500.000)',
      language_requirement: 'Japanese (N2+ recomendado)',
      job_market: 'Moderate',
      benefits: ['Infraestrutura avançada', 'Segurança', 'Cultura única'],
      challenges: ['Barreira linguística', 'Integração cultural'],
      popular_cities: ['Tokyo', 'Osaka', 'Fukuoka'],
      created_at: '2025-07-05T00:00:00Z',
      updated_at: '2025-07-05T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/australia.png',
      descriptions: [
        {
          language: 'pt',
          description:
            'O visto japonês é emitido em cerca de uma semana (após aprovação), de acordo com o MFA do Japão.',
        },
        {
          language: 'en',
          description:
            'Japan issues visas within approximately one week post-approval, per the Ministry of Foreign Affairs.',
        },
        {
          language: 'es',
          description:
            'Japón emite visados en aproximadamente una semana tras la aprobación, según el Ministerio de Asuntos Exteriores.',
        },
      ],
    },
    {
      name: 'Germany',
      flag: '🇩🇪',
      region: 'Europe',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: ['EU Blue Card', 'Skilled Workers Visa', 'Job Seeker Visa'],
      processing_time: '2–4 meses (Blue Card e Skilled Visa)',
      investment_required:
        'Taxas legais + comprovação financeira (~€9.744 ano)',
      language_requirement: 'German (B1+ recomendado)',
      job_market: 'High',
      benefits: ['Economia forte', 'Sistema de saúde social', 'Alta segurança'],
      challenges: ['A barreira linguística', 'Burocracia estatal'],
      popular_cities: ['Berlin', 'Munich', 'Frankfurt'],
      created_at: '2025-07-05T00:00:00Z',
      updated_at: '2025-07-05T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/japan.png',
      descriptions: [
        {
          language: 'pt',
          description:
            'A Alemanha processa pedidos de Blue Card e Skilled Workers Visa em 2–4 meses, segundo o BAMF.',
        },
        {
          language: 'en',
          description:
            'Germany processes EU Blue Card and Skilled Worker visas within 2–4 months, per the Federal Office for Migration and Refugees (BAMF).',
        },
        {
          language: 'es',
          description:
            'Alemania procesa los visados Blue Card y de trabajadores cualificados en 2–4 meses, según la BAMF.',
        },
      ],
    },
    {
      name: 'New Zealand',
      flag: '🇳🇿',
      region: 'Oceania',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Skilled Migrant Category',
        'Work to Residence',
        'Student Visa',
      ],
      processing_time: 'Skilled Migrant: ~12–16 meses',
      investment_required: 'Taxas + comprovação de fundos (~NZD 20.000)',
      language_requirement: 'English (IELTS 6.5+)',
      job_market: 'Moderate',
      benefits: [
        'Qualidade de vida',
        'Natureza exuberante',
        'Baixa criminalidade',
      ],
      challenges: ['Isolamento geográfico', 'Mercado de trabalho limitado'],
      popular_cities: ['Auckland', 'Wellington', 'Christchurch'],
      created_at: '2025-07-05T00:00:00Z',
      updated_at: '2025-07-05T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/new_zealand.png',
      descriptions: [
        {
          language: 'pt',
          description:
            'O visto Skilled Migrant leva aproximadamente 12–16 meses, conforme o Immigration NZ.',
        },
        {
          language: 'en',
          description:
            'The Skilled Migrant visa takes about 12–16 months, according to Immigration New Zealand.',
        },
        {
          language: 'es',
          description:
            'El visado Skilled Migrant tarda aproximadamente 12–16 meses, según Immigration New Zealand.',
        },
      ],
    },
    {
      name: 'Ireland',
      flag: '🇮🇪',
      region: 'Europe',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Critical Skills Employment Permit',
        'General Employment Permit',
        'Student Visa',
      ],
      processing_time: 'Critical Skills: ~8–12 semanas',
      investment_required: 'Taxas + comprovação de fundos (~€12.000)',
      language_requirement: 'English',
      job_market: 'High',
      benefits: ['Crescimento econômico', 'Cultura acolhedora', 'Acesso à UE'],
      challenges: ['Custos altos de moradia', 'Clima chuvoso'],
      popular_cities: ['Dublin', 'Cork', 'Galway'],
      created_at: '2025-07-05T00:00:00Z',
      updated_at: '2025-07-05T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/ireland.png',
      descriptions: [
        {
          language: 'pt',
          description:
            'O Critical Skills Employment Permit leva aproximadamente 8–12 semanas, conforme o INIS.',
        },
        {
          language: 'en',
          description:
            'The Critical Skills Employment Permit takes about 8–12 weeks, according to the Irish Naturalisation and Immigration Service.',
        },
        {
          language: 'es',
          description:
            'El Critical Skills Employment Permit tarda unas 8–12 semanas, según el INIS irlandés.',
        },
      ],
    },
    {
      name: 'France',
      flag: '🇫🇷',
      region: 'Europe',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Passeport Talent (Skilled/Business/Investor)',
        'Work Visa (Salarié)',
        'Student Visa',
      ],
      processing_time: '1–2 months',
      investment_required: '€30,000 - €300,000',
      language_requirement: 'French (basic)',
      job_market: 'High',
      benefits: ['Bom sistema de saúde', 'Cultura rica', 'Acesso à UE'],
      challenges: ['Burocracia', 'Alto custo de vida em Paris'],
      popular_cities: ['Paris', 'Lyon', 'Marseille'],
      created_at: '2025-07-05T00:00:00Z',
      updated_at: '2025-07-05T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/france.png',
      descriptions: [
        {
          language: 'pt',
          description:
            'O “Passeport Talent” exige investimento de €30 k (empreendedor) a €300 k (investidor), com visto emitido em até 2 meses pelo France‑Visas.',
        },
        {
          language: 'en',
          description:
            'The “Passeport Talent” requires an investment from €30k (entrepreneur) to €300k (investor), with the visa issued within up to 2 months by France-Visas.',
        },
        {
          language: 'es',
          description:
            'El “Passeport Talent” exige una inversión de 30.000 € (emprendedor) a 300.000 € (inversor), con visado emitido en hasta 2 meses por France-Visas.',
        },
      ],
    },
    {
      name: 'Sweden',
      flag: '🇸🇪',
      region: 'Europe',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: ['Work Permit (Skilled)', 'EU Blue Card', 'Student Visa'],
      processing_time: '≤15 dias (Schengen visa)',
      investment_required: 'SEK 100,000 - SEK 300,000',
      language_requirement: 'Swedish/English (basic)',
      job_market: 'Moderate',
      benefits: [
        'Alta qualidade de vida',
        'Boa integração',
        'Sistema social forte',
      ],
      challenges: ['Custo alto de vida', 'Clima frio'],
      popular_cities: ['Stockholm', 'Gothenburg', 'Malmö'],
      created_at: '2025-07-05T00:00:00Z',
      updated_at: '2025-07-05T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/sweden.png',
      descriptions: [
        {
          language: 'pt',
          description:
            'Schengen visa normalmente decidido em até 15 dias, conforme Migration Agency e consulados suecos.',
        },
      ],
    },
    {
      name: 'Switzerland',
      flag: '🇨🇭',
      region: 'Europe',
      difficulty: 'Hard',
      difficulty_score: 4,
      visa_options: ['L Permit (Work)', 'Swiss ICT Permit', 'Student Visa'],
      processing_time: '2–3 meses',
      investment_required: 'CHF 100,000 - CHF 300,000',
      language_requirement: 'German/French/Italian (basic)',
      job_market: 'High',
      benefits: [
        'Salários altos',
        'Estabilidade econômica',
        'Serviços públicos de qualidade',
      ],
      challenges: ['Custos elevados', 'Concorrência por vagas restritas'],
      popular_cities: ['Zurich', 'Geneva', 'Basel'],
      created_at: '2025-07-05T00:00:00Z',
      updated_at: '2025-07-05T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/switzerland.png',
      descriptions: [
        {
          language: 'pt',
          description:
            'O visto de trabalho suíço L Permit demora entre 2 e 3 meses, segundo Migration Switzerland.',
        },
        {
          language: 'en',
          description:
            'The Swiss L Permit work visa takes between 2 and 3 months, according to Migration Switzerland.',
        },
        {
          language: 'es',
          description:
            'La visa de trabajo suiza L Permit tarda entre 2 y 3 meses, según Migration Switzerland.',
        },
      ],
    },
    {
      name: 'United States',
      flag: '🇺🇸',
      region: 'North America',
      difficulty: 'Hard',
      difficulty_score: 5,
      visa_options: [
        'EB-5 Immigrant Investor Visa',
        'H-1B Work Visa',
        'E-2 Treaty Investor Visa',
      ],
      processing_time: '6–24 months (varia conforme categoria)',
      investment_required: '$800,000 - $1,050,000',
      language_requirement: 'English (basic)',
      job_market: 'High',
      benefits: [
        'Oportunidades econômicas vastas',
        'Diversidade cultural',
        'Inovação tecnológica',
      ],
      challenges: ['Processo burocrático complexo', 'Sistema de saúde caro'],
      popular_cities: ['New York', 'San Francisco', 'Los Angeles'],
      created_at: '2025-07-06T00:00:00Z',
      updated_at: '2025-07-06T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/united_states.png',
      descriptions: [
        {
          language: 'pt',
          description:
            'O visto EB‑5 exige investimento de US$ 800 000 (TEA) ou US$ 1.050 000, além de taxas. O H‑1B tem tarifas que variam e o E‑2 geralmente exige investimento de pelo menos US$ 100 000. Fonte: USCIS e Wikipedia EB‑5.',
        },
        {
          language: 'en',
          description:
            'The EB-5 visa requires an investment of US$800,000 (TEA) or US$1,050,000, plus fees. The H-1B has varying fees and the E-2 generally requires an investment of at least US$100,000. Source: USCIS and Wikipedia EB-5.',
        },
        {
          language: 'es',
          description:
            'La visa EB-5 requiere una inversión de US$800,000 (TEA) o US$1,050,000, además de tasas. La H-1B tiene tarifas variables y la E-2 generalmente requiere una inversión de al menos US$100,000. Fuente: USCIS y Wikipedia EB-5.',
        },
      ],
    },
    {
      name: 'Singapore',
      flag: '🇸🇬',
      region: 'Asia',
      difficulty: 'Moderate',
      difficulty_score: 4,
      visa_options: [
        'Employment Pass',
        'EntrePass',
        'Global Investor Programme',
      ],
      processing_time: '10–40 dias úteis',
      investment_required: '€4,000 - €30,000',
      language_requirement: 'English (basic)',
      job_market: 'High',
      benefits: [
        'Baixos impostos',
        'Centro financeiro global',
        'Ambiente seguro',
      ],
      challenges: ['Custo de vida muito alto', 'Mercado competitivo'],
      popular_cities: ['Singapore'],
      created_at: '2025-07-06T00:00:00Z',
      updated_at: '2025-07-06T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/singapore.png',
      descriptions: [
        {
          language: 'pt',
          description:
            'O Employment Pass é processado em cerca de 10 dias úteis ou até 8 semanas para empresas estrangeiras, com serviços custando ~US$4 900 (€4k) e taxas para issuance de SGD225‑255 (€143‑€163).',
        },
        {
          language: 'en',
          description:
            'The Employment Pass is processed in about 10 business days or up to 8 weeks for foreign companies, with services costing around US$4,900 (€4k) and issuance fees of SGD225-255 (€143-€163).',
        },
        {
          language: 'es',
          description:
            'El Employment Pass se procesa en unos 10 días hábiles o hasta 8 semanas para empresas extranjeras, con servicios que cuestan alrededor de US$4,900 (€4k) y tasas de emisión de SGD225-255 (€143-€163).',
        },
      ],
    },
    {
      name: 'United Arab Emirates',
      flag: '🇦🇪',
      region: 'Asia',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Employment Visa (2 anos)',
        'Green Visa (Self-employed)',
        'Investor Visa',
      ],
      processing_time: '2–8 semanas',
      investment_required: '$1,360 - $4,090',
      language_requirement: 'English (basic)',
      job_market: 'High',
      benefits: [
        'Sem impostos',
        'Infraestrutura moderna',
        'Ambiente multicultural',
      ],
      challenges: ['Clima extremo', 'Regras de residência específicas'],
      popular_cities: ['Dubai', 'Abu Dhabi', 'Sharjah'],
      created_at: '2025-07-06T00:00:00Z',
      updated_at: '2025-07-06T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/united_arab_emirates.png',
      descriptions: [
        {
          language: 'pt',
          description:
            'O visto de trabalho (2 anos) custa entre AED 5 000‑10 000 (~US$ 1 360‑2 720) mais Emirates ID e saúde. O Green/Investor visa exige solvência ou investimento de AED 10 milhões (~US$ 2,720,000).',
        },
        {
          language: 'en',
          description:
            'The 2-year work visa costs between AED 5,000-10,000 (~US$1,360-2,720) plus Emirates ID and health. The Green/Investor visa requires solvency or an investment of AED 10 million (~US$2,720,000).',
        },
        {
          language: 'es',
          description:
            'La visa de trabajo de 2 años cuesta entre AED 5,000-10,000 (~US$1,360-2,720) más Emirates ID y salud. La Green/Investor visa exige solvencia o una inversión de AED 10 millones (~US$2,720,000).',
        },
      ],
    },
    {
      name: 'South Korea',
      flag: '🇰🇷',
      region: 'Asia',
      difficulty: 'Moderate',
      difficulty_score: 4,
      visa_options: [
        'E‑7 Skilled Worker Visa',
        'D‑8 Corporate Investment Visa',
        'F‑2 Residency by Investment',
      ],
      processing_time: '2–4 weeks',
      investment_required: '$45,000 - $90,000',
      language_requirement: 'Korean (basic)',
      job_market: 'Moderate',
      benefits: [
        'Infraestrutura moderna',
        'Boa qualidade de vida',
        'Mercado tecnológico sólido',
      ],
      challenges: ['Barreira linguística', 'Cultura corporativa intensa'],
      popular_cities: ['Seoul', 'Busan', 'Incheon'],
      created_at: '2025-07-06T12:00:00Z',
      updated_at: '2025-07-06T12:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/south_korea.png',
      descriptions: [
        {
          language: 'pt',
          description:
            'As emissões de vistos de trabalho e corporativos levam de 2 a 4 semanas; investimento mínimo de $45 000 (D‑8) a $90 000 para status F‑2 residencial por investimento.',
        },
        {
          language: 'en',
          description:
            'Work and corporate visa issuances take 2 to 4 weeks; minimum investment of $45,000 (D-8) to $90,000 for F-2 residency by investment status.',
        },
        {
          language: 'es',
          description:
            'La emisión de visados de trabajo y corporativos tarda de 2 a 4 semanas; inversión mínima de $45,000 (D-8) a $90,000 para el estatus de residencia F-2 por inversión.',
        },
      ],
    },
    {
      name: 'Netherlands',
      flag: '🇳🇱',
      region: 'Europe',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Highly Skilled Migrant Permit',
        'EU Blue Card',
        'Startup Visa',
      ],
      processing_time: '2–4 weeks (fast-track for employer-sponsored)',
      investment_required: '€405 - €15,000',
      language_requirement: 'English (basic)',
      job_market: 'High',
      benefits: [
        'Alta qualidade de vida',
        'Boa mobilidade na Europa',
        'Ambiente internacional',
      ],
      challenges: ['Clima chuvoso', 'Custos elevados em Amsterdam'],
      popular_cities: ['Amsterdam', 'Rotterdam', 'The Hague'],
      created_at: '2025-07-06T12:00:00Z',
      updated_at: '2025-07-06T12:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/netherlands.png',
      descriptions: [
        {
          language: 'pt',
          description:
            'A Permissão para Migrantes Altamente Qualificados custa €405, com processo de 2–4 semanas para empregadores reconhecidos, conforme IND.',
        },
        {
          language: 'en',
          description:
            'The Highly Skilled Migrant Permit costs €405, with a 2–4 week process for recognized employers, according to IND.',
        },
        {
          language: 'es',
          description:
            'El Permiso para Migrantes Altamente Cualificados cuesta €405, con un proceso de 2–4 semanas para empleadores reconocidos, según IND.',
        },
      ],
    },
    {
      name: 'Italy',
      flag: '🇮🇹',
      region: 'Europe',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Elective Residency Visa',
        'Self-employment Visa',
        'Student Visa',
      ],
      processing_time: '2–4 months',
      investment_required: '€7,000 - €50,000',
      language_requirement: 'Italian (basic)',
      job_market: 'Moderate',
      benefits: [
        'Rica herança cultural',
        'Gastronomia de renome',
        'Sistema de saúde acessível',
      ],
      challenges: ['Burocracia estatal', 'Mercado de trabalho lento'],
      popular_cities: ['Rome', 'Milan', 'Florence'],
      created_at: '2025-07-05T23:06:42.460912Z',
      updated_at: '2025-07-05T23:06:42.460912Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/italy.png',
      descriptions: [
        {
          language: 'pt',
          description:
            'A Itália oferece o visto de residência eletiva para quem possui renda passiva. O processo pode levar até 4 meses, com comprovação de fundos de ao menos €31 mil por ano.',
        },
        {
          language: 'en',
          description:
            'Italy offers the elective residence visa for those with passive income. The process can take up to 4 months, requiring proof of funds of at least €31,000 per year.',
        },
        {
          language: 'es',
          description:
            'Italia ofrece la visa de residencia electiva para quienes tienen ingresos pasivos. El proceso puede tardar hasta 4 meses, requiriendo comprobante de fondos de al menos €31,000 por año.',
        },
      ],
    },
    {
      name: 'Argentina',
      flag: '🇦🇷',
      region: 'South America',
      difficulty: 'Easy',
      difficulty_score: 2,
      visa_options: [
        'Temporary Residence',
        'Digital Nomad Visa',
        'Permanent Residence',
      ],
      processing_time: '1–2 months',
      investment_required: '$1,500 - $10,000',
      language_requirement: 'Spanish (basic)',
      job_market: 'Low',
      benefits: [
        'Custo de vida acessível',
        'Beleza natural e cultura',
        'Facilidade de residência permanente',
      ],
      challenges: ['Instabilidade econômica', 'Inflação alta'],
      popular_cities: ['Buenos Aires', 'Córdoba', 'Rosario'],
      created_at: '2025-07-05T23:06:42.460912Z',
      updated_at: '2025-07-05T23:06:42.460912Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/argentina.png',
      descriptions: [
        {
          language: 'pt',
          description:
            'A Argentina oferece vistos temporários e permanentes de forma acessível, sendo possível aplicar com comprovação de renda modesta ou vínculo com empresas locais.',
        },
        {
          language: 'en',
          description:
            'Argentina offers temporary and permanent visas in an accessible way, and it is possible to apply with modest income proof or ties to local companies.',
        },
        {
          language: 'es',
          description:
            'Argentina ofrece visados temporales y permanentes de forma accesible, siendo posible aplicar con comprobante de ingresos modestos o vínculo con empresas locales.',
        },
      ],
    },
    {
      name: 'Chile',
      flag: '🇨🇱',
      region: 'South America',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Temporary Residency Visa',
        'Work Visa',
        'Investment Visa',
      ],
      processing_time: '2–3 months',
      investment_required: '$5,000 - $25,000',
      language_requirement: 'Spanish (basic)',
      job_market: 'Moderate',
      benefits: [
        'Estabilidade política',
        'Boas oportunidades para empreendedores',
        'Serviços públicos razoáveis',
      ],
      challenges: ['Alta burocracia migratória', 'Barreira linguística'],
      popular_cities: ['Santiago', 'Valparaíso', 'Concepción'],
      created_at: '2025-07-05T23:06:42.460912Z',
      updated_at: '2025-07-05T23:06:42.460912Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/chile.png',
      descriptions: [
        {
          language: 'pt',
          description:
            'O Chile permite a residência temporária para trabalho e investimento. Os valores exigidos começam em torno de $5.000 USD, com análise caso a caso.',
        },
        {
          language: 'en',
          description:
            'Chile allows temporary residence for work and investment. The required amounts start at around $5,000 USD, with case-by-case analysis.',
        },
        {
          language: 'es',
          description:
            'Chile permite la residencia temporal para trabajo e inversión. Los valores exigidos comienzan en torno a $5,000 USD, con análisis caso a caso.',
        },
      ],
    },
    {
      name: 'Austria',
      flag: '🇦🇹',
      region: 'Europe',
      difficulty: 'Hard',
      difficulty_score: 4,
      visa_options: [
        'Red-White-Red Card',
        'Job Seeker Visa',
        'Student Residence Permit',
      ],
      processing_time: '2–4 months',
      investment_required: '€15,000 - €50,000',
      language_requirement: 'German (basic)',
      job_market: 'High',
      benefits: [
        'Alta qualidade de vida',
        'Ambiente seguro',
        'Sistema de saúde excelente',
      ],
      challenges: ['Idioma exigente', 'Processos seletivos complexos'],
      popular_cities: ['Vienna', 'Salzburg', 'Graz'],
      created_at: '2025-07-05T23:06:42.460912Z',
      updated_at: '2025-07-05T23:06:42.460912Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/austria.png',
      descriptions: [
        {
          language: 'pt',
          description:
            'A Áustria exige comprovação financeira, seguro saúde e contratos formais. A Red-White-Red Card é ideal para profissionais qualificados e investidores.',
        },
        {
          language: 'en',
          description:
            'Austria requires financial proof, health insurance, and formal contracts. The Red-White-Red Card is ideal for qualified professionals and investors.',
        },
        {
          language: 'es',
          description:
            'Austria exige comprobante financiero, seguro de salud y contratos formales. La Red-White-Red Card es ideal para profesionales calificados e inversores.',
        },
      ],
    },
    {
      name: 'Poland',
      flag: '🇵🇱',
      region: 'Europe',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'National Visa D',
        'Temporary Residence Permit',
        'Work Permit',
      ],
      processing_time: '1–3 months',
      investment_required: '$3,000 - $12,000',
      language_requirement: 'Polish (basic)',
      job_market: 'Moderate',
      benefits: [
        'Custo de vida baixo na UE',
        'Boas oportunidades para trabalho técnico',
        'Crescimento econômico estável',
      ],
      challenges: [
        'Barreira linguística',
        'Serviços públicos limitados em inglês',
      ],
      popular_cities: ['Warsaw', 'Krakow', 'Wroclaw'],
      created_at: '2025-07-05T23:06:42.460912Z',
      updated_at: '2025-07-05T23:06:42.460912Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/poland.png',
      descriptions: [
        {
          language: 'pt',
          description:
            'A Polônia é uma das portas de entrada mais acessíveis na Europa. Os vistos nacionais D permitem moradia e trabalho com requisitos financeiros moderados.',
        },
        {
          language: 'en',
          description:
            'Poland is one of the most accessible gateways in Europe. National D visas allow residence and work with moderate financial requirements.',
        },
        {
          language: 'es',
          description:
            'Polonia es una de las puertas de entrada más accesibles de Europa. Las visas nacionales D permiten residencia y trabajo con requisitos financieros moderados.',
        },
      ],
    },
    {
      name: 'Finland',
      flag: '🇫🇮',
      region: 'Europe',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Residence Permit for Work',
        'Startup Permit',
        'Student Residence Permit',
      ],
      processing_time: '2–3 months',
      investment_required: '€6,720 - €30,000',
      language_requirement: 'English/Finnish (basic)',
      job_market: 'Moderate',
      benefits: [
        'Alta qualidade de vida',
        'Educação gratuita',
        'Natureza exuberante',
      ],
      challenges: ['Clima extremo', 'Mercado competitivo para estrangeiros'],
      popular_cities: ['Helsinki', 'Tampere', 'Turku'],
      created_at: '2025-07-05T23:06:42.460912Z',
      updated_at: '2025-07-05T23:06:42.460912Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/finlland.png',
      descriptions: [
        {
          language: 'pt',
          description:
            'A Finlândia exige comprovação de fundos para estudantes e empreendedores. O Startup Permit é ideal para empresas de base tecnológica e exige plano de negócio validado.',
        },
        {
          language: 'en',
          description:
            'Finland requires proof of funds for students and entrepreneurs. The Startup Permit is ideal for technology-based companies and requires a validated business plan.',
        },
        {
          language: 'es',
          description:
            'Finlandia exige comprobante de fondos para estudiantes y emprendedores. El Startup Permit es ideal para empresas de base tecnológica y exige un plan de negocios validado.',
        },
      ],
    },
  ];

  for (const countryData of countries) {
    const { descriptions, ...countryInfo } = countryData;

    // Ensure background_image is always present
    const countryDataWithImage = {
      ...countryInfo,
      background_image:
        countryInfo.background_image ||
        'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=800&h=600&fit=crop',
    };

    const country = await prisma.country.upsert({
      where: { name: countryDataWithImage.name },
      update: countryDataWithImage,
      create: countryDataWithImage,
    });

    if (descriptions) {
      for (const description of descriptions) {
        await prisma.countryDescription.upsert({
          where: {
            country_id_language: {
              country_id: country.id,
              language: description.language,
            },
          },
          update: {
            description: description.description,
          },
          create: {
            country_id: country.id,
            language: description.language,
            description: description.description,
          },
        });
      }
    }
  }

  console.log('Seed completed successfully :)');
}
