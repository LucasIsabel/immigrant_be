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
      immigration_visa_types: [
        {
          category: 'Short-Stay Visa (Schengen Type C)',
          description:
            'Visa for stays up to 90 days in any 180-day period in Spain/Schengen (tourism, business).',
          source: 'https://feather-insurance.com/en-es/blog/spain-visa-types',
        },
        {
          category: 'Long-Stay / National Visa (Type D) / Residence Permit',
          description:
            'Visa for non-EU nationals to live, work, or study in Spain for more than 90 days (residence permit routes: work, student, non‐lucrative, family).',
          source:
            'https://www.immigrationspain.es/en/visas-and-residence-permits-in-spain/',
        },
        {
          category: 'Permanent Residence / EU Long-Term Resident',
          description:
            'After a period of legal residence (typically 5 years) a foreigner may apply for long-term residence/settlement in Spain.',
          source:
            'https://administracion.gob.es/pag_Home/en/Tu-espacio-europeo/derechos-obligaciones/ciudadanos/residencia/obtencion-residencia/residencia-permanente.html',
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
      immigration_visa_types: [
        {
          category: 'Visitor & Short-Stay Visas',
          description:
            'Visas for tourism, business, short stays up to six months or airport transit.',
          source: 'https://www.gov.uk/browse/visas-immigration/visit-the-uk',
        },
        {
          category: 'Work Visas',
          description:
            'Visas for work including the Skilled Worker visa, Graduate visa, Health & Care Worker visa, etc.',
          source: 'https://www.gov.uk/browse/visas-immigration/work-in-the-uk',
        },
        {
          category: 'Study Visas',
          description:
            'Visas for students to study in the UK, including full-time study and graduate routes.',
          source: 'https://www.gov.uk/browse/visas-immigration/student-visa',
        },
        {
          category: 'Family & Settlement Visas',
          description:
            'Visas for family reunion, dependants, settlement (indefinite leave to remain).',
          source: 'https://www.qc-immigration.com/our-services/uk-visa-types',
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
            'El sistema Express Entry de Canadá procesa el 80 % de solicitudes de residencia permanente en 6 meses, con 3–4 meses adicionales para devolución de pasaporte en el exterior.',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Permanent Residence (PR)',
          description:
            'Programs for living permanently in Canada such as Express Entry, Provincial Nominee Programs, family sponsorships.',
          source:
            'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada.html',
        },
        {
          category: 'Temporary Work Permit',
          description:
            'Permit for foreign nationals to work temporarily in Canada.',
          source:
            'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada.html',
        },
        {
          category: 'Study Permit',
          description:
            'Permit for foreign nationals to study at Canadian designated learning institutions.',
          source:
            'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html',
        },
        {
          category: 'Visitor Visa / Electronic Travel Authorization (eTA)',
          description:
            'Visitor visa or eTA for visiting, tourism, business or transit.',
          source:
            'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html',
        },
        {
          category: 'Refugee & Asylum Programs',
          description:
            'Programs for refugees and protected persons to settle in Canada.',
          source:
            'https://www.canada.ca/en/immigration-refugees-citizenship/services/refugees.html',
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
            'Los visados cualificados permanentes de Australia tardan unos 10 meses, mientras que el 482 temporal tiene un tiempo medio de 98 días, según el Ministerio.',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Visitor & Short-Term Stay Visas',
          description:
            'Visas for visitors, tourists, short-term business/training stays in Australia. (See Visa listing: visitor, studying/training, family/partner)',
          source:
            'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing',
        },
        {
          category: 'Work & Skilled Migration Visas',
          description:
            'Visas for foreign nationals to work temporarily or permanently — includes Skilled Independent (subclass 189), Skilled Nominated (190), Skilled Regional (491) etc.',
          source: 'https://www.smartmoveaustralia.gov.au/skilled-visas',
        },
        {
          category: 'Family, Partner & Dependent Visas',
          description:
            'Visas for family reunion, partner, parent, other family-stream permanent visas.',
          source:
            'https://immi.homeaffairs.gov.au/visas/permanent-resident/visa-options',
        },
        {
          category: 'Business, Investor & Permanent Residence Visas',
          description:
            'Business or investor-stream permanent visas; transition to Australian permanent residence.',
          source:
            'https://immi.homeaffairs.gov.au/visas/permanent-resident/visa-options',
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
      immigration_visa_types: [
        {
          category: 'Short-Term Stay Visa',
          description:
            'For tourism, business, visiting friends/relatives, transit — stays up to 90 days (in many cases); no remunerative activity.',
          source: 'https://www.mofa.go.jp/j_info/visit/visa/',
        },
        {
          category: 'Work / Long-Term Stay Visas',
          description:
            'Includes status of residence such as Highly Skilled Professional, Business Manager, Engineer/Specialist in Humanities/International Services, etc.',
          source: 'https://www.mofa.go.jp/j_info/visit/visa/long/index.html',
        },
        {
          category: 'Specified Visas (Designated Activities etc.)',
          description:
            'Visas for specified activities such as spouse/child of Japanese national, long-term resident, trainees, Working Holiday, etc.',
          source: 'https://www.mofa.go.jp/ca/fna/page22e_001037.html',
        },
        {
          category: 'Diplomatic / Official Visas',
          description:
            'For diplomatic agents, official mission staff, administrative/technical staff of diplomatic missions.',
          source: 'https://www.mofa.go.jp/j_info/visit/visa/long/index.html',
        },
        {
          category: 'Permanent Residence (Status of Residence)',
          description:
            'Foreign nationals permitted to reside permanently in Japan (indefinite stay) under certain conditions.',
          source: 'https://www.office-kasahara.jp/visa_list_english',
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
      immigration_visa_types: [
        {
          category: 'Short-Term (Schengen) Visa (Type C)',
          description:
            'For stays up to 90 days in a 180-day period for tourism, business, etc.',
          source:
            'https://www.auswaertiges-amt.de/en/visa-service/215870-215870',
        },
        {
          category:
            'Long-Term National Visa / Residence Permit (Type D) for work, study, training, family reunion',
          description:
            'Visas and residence permits for stays over 90 days for employment, study/training, family reunification; under the new Skilled Immigration Act there are residence permits including settlement permit (Niederlassungserlaubnis).',
          source: 'https://www.make-it-in-germany.com/en/visa-residence/types',
        },
        {
          category:
            'Settlement Permit (Permanent Residence – Niederlassungserlaubnis)',
          description:
            'Permission to live permanently in Germany under certain conditions.',
          source:
            'https://www.make-it-in-germany.com/en/visa-residence/skilled-immigration-act',
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
      immigration_visa_types: [
        {
          category: 'Visitor Visa / NZeTA (Electronic Travel Authority)',
          description:
            'For short-term stays (holiday/business/visit) or travel authorisation via NZeTA.',
          source: 'https://www.immigration.govt.nz/visas/',
        },
        {
          category: 'Work Visas (including Working Holiday)',
          description:
            'Visas to work temporarily in New Zealand, including those that lead to residence.',
          source: 'https://www.govt.nz/browse/immigration-and-visas/',
        },
        {
          category: 'Student Visa',
          description:
            'For international students studying full time in New Zealand for more than 3 months.',
          source: 'https://www.immigration.govt.nz/visas/',
        },
        {
          category: 'Resident Visa / Permanent Residence Pathway',
          description:
            'Visas leading to permanent residence (e.g., Skilled Migrant Category, Work to Residence).',
          source: 'https://www.immigration.govt.nz/visas/',
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
      immigration_visa_types: [
        {
          category: 'Short-Stay Visa (C category)',
          description:
            'Visa issued for visits of up to 90 days (tourism, business, visiting family/friends).',
          source: 'https://www.irishimmigration.ie/about-irish-visas/',
        },
        {
          category: 'Long-Stay Visa (D category)',
          description:
            'Visa issued for stays over 90 days (studying, working, joining family).',
          source: 'https://www.irishimmigration.ie/about-irish-visas/',
        },
        {
          category: 'Re-Entry Visa',
          description:
            'Visa for non-EU/EEA nationals already holding immigration permission in Ireland who wish to leave and re-enter.',
          source:
            'https://dublin.ie/live/official-procedures/immigration-visas/',
        },
        {
          category: 'Transit Visa',
          description:
            'Visa required in certain cases for transiting through Irish airports.',
          source:
            'https://dublin.ie/live/official-procedures/immigration-visas/',
        },
        {
          category: 'Multiple Entry Visa',
          description:
            'Visa allowing several entries for stays under the dates specified, for certain eligible circumstances.',
          source:
            'https://dublin.ie/live/official-procedures/immigration-visas/',
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
            'O “Passeport Talent” exige investimento de €30 k (empreendedor) a €300 k (investidor), com visto emitido em até 2 meses pelo France‑Visas.',
        },
        {
          language: 'en',
          description:
            'The “Passeport Talent” requires an investment from €30k (entrepreneur) to €300k (investor), with the visa issued within up to 2 months by France-Visas.',
        },
        {
          language: 'es',
          description:
            'El “Passeport Talent” exige una inversión de 30.000 € (emprendedor) a 300.000 € (inversor), con visado emitido en hasta 2 meses por France-Visas.',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Short-Stay Visa (Schengen Type C)',
          description:
            'Visa allowing stays up to 90 days in the Schengen Area including France (for tourism, business, family visits).',
          source: 'https://france-visas.gouv.fr/en/short-stay-visa',
        },
        {
          category: 'Long-Stay Visa (National Visa – VLS-TS etc.)',
          description:
            'Visa for stays over 3 months in France (studies, work, family reunification, settlement).',
          source: 'https://www.welcometofrance.com/en/rubrique/visa',
        },
        {
          category: 'Talent Passport / Skilled Worker Visas',
          description:
            'Specific long-stay visas designed for highly skilled professionals, research, entrepreneurs, etc.',
          source:
            'https://relocate.world/en/articles/visa-types-france-2025-guide',
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
      immigration_visa_types: [
        {
          category: 'Short-stay Visa (Schengen visa up to 90 days)',
          description:
            'Visa for non-EU/EEA nationals to visit Sweden for tourism, business, etc, up to 90 days in any 180-day period.',
          source:
            'https://www.migrationsverket.se/en/you-want-to-apply/visiting-sweden.html',
        },
        {
          category:
            'Residence Permit (for stay over 90 days – work, study, family reunification)',
          description:
            'A permit required if staying more than three months; includes work permits and study permits.',
          source: 'https://studyinsweden.se/moving-to-sweden/permits-visas/',
        },
        {
          category: 'Permanent Residence / Long-Term Residence',
          description:
            'After legal residence for certain years (e.g., 4 years for work) you may be eligible for permanent residence.',
          source:
            'https://home-affairs.ec.europa.eu/policies/migration-and-asylum/eu-immigration-portal/highly-qualified-worker-sweden_en',
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
            'O visto de trabalho suíço L Permit demora entre 2 e 3 meses, segundo Migration Switzerland.',
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
      immigration_visa_types: [
        {
          category: 'Schengen Visa (Type C, up to 90 days)',
          description:
            'Visa for stays up to 90 days in Switzerland (and the Schengen Area) for tourism, business, etc.',
          source:
            'https://www.eda.admin.ch/countries/usa/en/home/visa/entry-ch.html',
        },
        {
          category: 'National Visa / Residence Permit (Type D, over 90 days)',
          description:
            'Visa for stays longer than 90 days, e.g., for study, family reunification, long-term stay.',
          source:
            'https://www.eda.admin.ch/countries/usa/en/home/visa/entry-ch.html',
        },
        {
          category: 'Work Permit / Labour Permit',
          description:
            'For non-EU/EFTA nationals wishing to work in Switzerland, a combined permit process is required (visa + permit).',
          source:
            'https://www.ch.ch/en/foreign-nationals-in-switzerland/working-in-switzerland/',
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
            'O visto EB‑5 exige investimento de US$ 800 000 (TEA) ou US$ 1.050 000, além de taxas. O H‑1B tem tarifas que variam e o E‑2 geralmente exige investimento de pelo menos US$ 100 000. Fonte: USCIS e Wikipedia EB‑5.',
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
      immigration_visa_types: [
        {
          category: 'Nonimmigrant Visas (temporary stay)',
          description:
            'Visas issued for temporary stay: tourism/business (B), work (H, L, O, P), students (F, M), exchange visitors (J), etc.',
          source:
            'https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/all-visa-categories.html',
        },
        {
          category: 'Immigrant Visas (permanent residence)',
          description:
            'Visas for foreign nationals who intend to live permanently in the U.S., including family-based, employment-based, special immigrant, diversity visas.',
          source:
            'https://travel.state.gov/content/travel/en/us-visas/immigrate.html',
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
            'O Employment Pass é processado em cerca de 10 dias úteis ou até 8 semanas para empresas estrangeiras, com serviços custando ~US$4 900 (€4k) e taxas para issuance de SGD225‑255 (€143‑€163).',
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
      immigration_visa_types: [
        {
          category: 'Visitor / Social / Business Visa',
          description:
            'Visas for individuals travelling to Singapore for holiday, social visit, business or conference.',
          source:
            'https://www.mfa.gov.sg/Overseas-Mission/Bangkok/Consular-Services/Visa-Information',
        },
        {
          category: 'Work Passes (Employment Pass, S Pass, Work Permit)',
          description:
            'Passes required for foreign professionals, skilled workers, domestic workers etc who intend to work in Singapore.',
          source: 'https://www.mom.gov.sg/passes-and-permits',
        },
        {
          category: 'Long-Term Visit / Dependent / Permanent Residence Passes',
          description:
            'Passes for family dependents of pass-holders, long-term stay, and routes toward permanent residence in Singapore.',
          source: 'https://ask.gov.sg/ica',
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
            'O visto de trabalho (2 anos) custa entre AED 5 000‑10 000 (~US$ 1 360‑2 720) mais Emirates ID e saúde. O Green/Investor visa exige solvência ou investimento de AED 10 milhões (~US$ 2,720,000).',
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
      immigration_visa_types: [
        {
          category: 'Tourist / Visit Visa',
          description:
            'Visas for tourism or visiting the UAE, including single-entry, multiple-entry, 30-day and 60-day stays.',
          source:
            'https://u.ae/en/information-and-services/visa-and-emirates-id/visas',
        },
        {
          category: 'Residence Visa / Work / Long Term Stay',
          description:
            'Residence visas for working in the UAE, remote work arrangements, retired persons, golden visa etc.',
          source:
            'https://u.ae/en/information-and-services/visa-and-emirates-id/residence-visas',
        },
        {
          category: 'Golden / Long-Term Residency Program',
          description:
            'Special long-term residence visas (5-10 years) for investors, experts, remote workers, retirees in the UAE.',
          source: 'https://adro.gov.ae/Visas/Types-of-Visas',
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
            'As emissões de vistos de trabalho e corporativos levam de 2 a 4 semanas; investimento mínimo de $45 000 (D‑8) a $90 000 para status F‑2 residencial por investimento.',
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
      immigration_visa_types: [
        {
          category: 'Short-Term Visas (C, D categories etc)',
          description:
            'Visas for short-term visits, transit, tourism, business in Korea.',
          source: 'https://www.visa.go.kr/?LANG_TYPE=EN',
        },
        {
          category: 'Long-Stay / Work / Student / Skilled Visas (D, E, F etc)',
          description:
            'Visas for students (D-2), trainees (D-4), corporate investment (D-8), professional employment (E-5), permanent residency F-5, etc.',
          source: 'https://www.moj.go.kr/immigration_eng/1864/subview.do',
        },
        {
          category: 'Permanent Residency / Immigration Investor Scheme',
          description:
            'Skilled Worker Points System Visa, Immigrant Investor Scheme, permanent settlement routes in Korea.',
          source: 'https://www.moj.go.kr/immigration_eng/1864/subview.do',
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
      immigration_visa_types: [
        {
          category: 'Short-Stay Schengen Visa (up to 90 days)',
          description:
            'Visa for stays up to 90 days in the Netherlands (and Schengen area) for tourism, business, visiting family.',
          source:
            'https://www.government.nl/topics/immigration-to-the-netherlands/question-and-answer/which-visa-do-i-need-to-travel-to-the-netherlands',
        },
        {
          category: 'Airport Transit Visa',
          description:
            'Visa required for transiting through Dutch airports under certain conditions.',
          source:
            'https://www.netherlandsworldwide.nl/visa-the-netherlands/types-of-visa',
        },
        {
          category:
            'MVV Authorisation & Long-Stay Visa (for stays over 90 days)',
          description:
            'An ‘MVV’ is a provisional residence permit/entry visa for stays longer than 90 days for certain nationalities before getting a residence permit.',
          source: 'https://ind.nl/en/provisional-residence-permit-mvv',
        },
        {
          category: 'Residence Permit / Work & Study Visas',
          description:
            'Visas/residence permits for non-EU nationals to live, work, study in the Netherlands.',
          source:
            'https://remote.com/blog/relocation/work-visas-and-permits-netherlands',
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
      immigration_visa_types: [
        {
          category: 'Short-Stay (Schengen) Visa',
          description:
            'Visa for stays up to 90 days for tourism, business, family visits.',
          source: 'https://vistoperitalia.esteri.it/',
        },
        {
          category: 'Long-Stay National Visa / Residence Permit',
          description:
            'Visa for stays over 90 days (study, work, family reunification) leading to a residence permit (permesso di soggiorno).',
          source:
            'https://home-affairs.ec.europa.eu/policies/migration-and-asylum/eu-immigration-portal/employed-worker-italy_en',
        },
        {
          category: 'Investor / Self-Employment Visa',
          description:
            'Specific visa route for self-employed persons or investors in Italy.',
          source: 'https://immigration-italy.com/',
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
      immigration_visa_types: [
        {
          category: 'Tourist Visa / Business Visit Visa',
          description:
            'Visas for tourism (up to 90 days) or business (up to 60 days) in Argentina.',
          source: 'https://cancilleria.gob.ar/en/visas',
        },
        {
          category: 'Working Visa / Labour Contract Visa',
          description:
            'Visa for foreign nationals working under labour contract or being transferred to Argentina for employment.',
          source:
            'https://www.imminetwork.com/countries/argentina/visa-and-services/',
        },
        {
          category: 'Student Visa / Long-Term Study',
          description:
            'Visa for studies in Argentina, either for less than or greater than 365 days.',
          source: 'https://cancilleria.gob.ar/en/visas',
        },
        {
          category: 'Family Reunification / Permanent Residence',
          description:
            'Visa for family reunification of foreign nationals, nationality visa (for some MERCOSUR nationals) and routes toward permanent residence.',
          source: 'https://cancilleria.gob.ar/en/visas',
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
      immigration_visa_types: [
        {
          category: 'Tourist / Transitory Stay Permit',
          description:
            'Permit for foreign nationals staying temporarily (e.g., tourism, business) up to certain days; visa may be required depending on nationality.',
          source: 'https://serviciomigraciones.cl/en/home/',
        },
        {
          category: 'Temporary Residence Visa / Permit',
          description:
            'Visa/permit for foreign nationals to reside temporarily in Chile (family ties, investment, employment) for defined periods.',
          source:
            'https://www.chile.gob.cl/chile/blog/todos/temporary-resident-visa-maximum-length-of-one-year',
        },
        {
          category: 'Definitive Residence (Permanent) Permit',
          description:
            'Permit for permanent residence in Chile after fulfilling certain temporary residence conditions.',
          source: 'https://serviciomigraciones.cl/en/home/',
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
      immigration_visa_types: [
        {
          category: 'Short-Stay Visa (Type C, up to 90 days)',
          description:
            'Visa for stays up to 90 days within a 180-day period in Austria/Schengen for tourism, business etc.',
          source:
            'https://www.oesterreich.gv.at/en/themen/menschen_aus_anderen_staaten/visum_fuer_oesterreich/Seite.3550020',
        },
        {
          category: 'National Visa / Long-Stay (Type D) & Residence Permit',
          description:
            'Visa D for entry and stay beyond 90 days (work, study, family); also permits residence and possibly eventual settlement.',
          source:
            'https://www.oead.at/en/to-austria/entry-and-residence/visa-c-or-visa-d',
        },
        {
          category: 'Work & Qualified Migration (e.g., Red-White-Red Card)',
          description:
            'Special permit for qualified third-country nationals for work and settling in Austria.',
          source:
            'https://www.migration.gv.at/en/types-of-immigration/permanent-immigration/',
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
      immigration_visa_types: [
        {
          category: 'Schengen Visa (Type C, up to 90 days)',
          description:
            'Visa for staying up to 90 days in Poland (and Schengen area) for tourism, business etc.',
          source: 'https://migrant.info.pl/en/Visas',
        },
        {
          category: 'National Visa (Type D, stays over 90 days up to 1 year)',
          description:
            'Visa D permitting entry and consecutive stay in Poland for longer than 90 days and up to one year.',
          source: 'https://www.gov.pl/web/diplomacy/visas',
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
      immigration_visa_types: [
        {
          category: 'Short-Stay Visa (Schengen Type C)',
          description:
            'Visa for stays up to 90 days in Finland / Schengen for tourism, business, etc.',
          source: 'https://um.fi/visa-to-visit-finland',
        },
        {
          category: 'National Visa (Type D) / Residence Permit',
          description:
            'Visa for stays longer than 90 days (work, study, family reunification) in Finland.',
          source:
            'https://home-affairs.ec.europa.eu/policies/migration-and-asylum/eu-immigration-portal/international-service-provider-finland_en',
        },
        {
          category: 'Residence Permit / Permanent Residence',
          description:
            'Fixed-term or permanent residence permits for foreign nationals in Finland.',
          source: 'https://www.migri.fi/en/residence-permit-types',
        },
      ],
    },
  ];

  for (const countryData of countries) {
    const { descriptions, immigration_visa_types, ...countryInfo } =
      countryData;

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

    if (immigration_visa_types) {
      // Delete existing visa types for this country to avoid duplicates
      await prisma.immigrationVisaType.deleteMany({
        where: { country_id: country.id },
      });

      // Create new visa types
      for (const visaType of immigration_visa_types) {
        await prisma.immigrationVisaType.create({
          data: {
            country_id: country.id,
            category: visaType.category,
            description: visaType.description,
            source: visaType.source,
          },
        });
      }
    }
  }

  console.log('Seed completed successfully :)');
}
