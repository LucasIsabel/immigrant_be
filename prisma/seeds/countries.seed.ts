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
        '≈€31,752/year in income for the digital nomad visa, plus application fees',
      language_requirement: 'Spanish (basic to intermediate)',
      job_market: 'Moderate',
      benefits: [
        'Pleasant Mediterranean climate',
        'Affordable cost of living for Western Europe',
        'Rich cultural life and strong regional identity',
        'Citizenship after 10 years, or 2 for Ibero-American nationals',
      ],
      challenges: [
        'Persistently high unemployment',
        'Slow provincial bureaucracy',
        'Low local salaries relative to Western Europe',
      ],
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
          source: 'https://www.exteriores.gob.es/',
        },
        {
          category: 'Long-Stay / National Visa (Type D) / Residence Permit',
          description:
            'Visa for non-EU nationals to live, work, or study in Spain for more than 90 days (residence permit routes: work, student, non‐lucrative, family).',
          source:
            'https://www.inclusion.gob.es/web/migraciones/',
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
      processing_time: '3–8 weeks for applications made outside the UK',
      investment_required:
        'Visa fee plus Immigration Health Surcharge and Certificate of Sponsorship fee',
      language_requirement: 'English (B1 or above)',
      job_market: 'Strong',
      benefits: [
        'High earning potential',
        'Access to a global job market',
        'English-speaking environment',
        'Settlement possible after five years',
      ],
      challenges: [
        'Expensive cost of living, especially in London',
        'Frequent immigration policy changes',
        'High cumulative visa and health surcharge costs',
      ],
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
          source: 'https://www.gov.uk/browse/visas-immigration',
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
        '80% of PR applications within 6 months; add 3–4 months when applying from abroad',
      investment_required:
        'IRCC fees plus proof of settlement funds (≈CAD 13,000 for a single applicant)',
      language_requirement: 'English or French (CLB 7+)',
      job_market: 'Strong',
      benefits: [
        'Publicly funded healthcare',
        'High-quality education system',
        'Strong multicultural integration',
        'Clear path from temporary status to permanent residence',
      ],
      challenges: [
        'Harsh winters across most of the country',
        'High cost of living in Toronto and Vancouver',
        'Competitive Express Entry cut-off scores',
      ],
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
        'Skilled (Permanent): ~10 months; Skilled (Temporary): ~98 days median',
      investment_required: 'Application fees plus proof of funds (≈AUD 20,000)',
      language_requirement: 'English (IELTS 6 or above)',
      job_market: 'Strong',
      benefits: [
        'High quality of life',
        'Medicare public healthcare',
        'Low crime rates',
        'Strong wages and workplace protections',
      ],
      challenges: [
        'High housing costs in major cities',
        'Geographic distance from Europe and the Americas',
        'Points-tested migration with fluctuating cut-offs',
      ],
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
        '≈1 week for consular issuance once the Certificate of Eligibility is granted',
      investment_required: 'Consular fees plus proof of funds (≈¥500,000)',
      language_requirement: 'Japanese (JLPT N2 recommended)',
      job_market: 'Moderate',
      benefits: [
        'Advanced infrastructure and public transport',
        'Very high public safety',
        'Universal health insurance',
        'Points-based fast track to permanent residence for skilled professionals',
      ],
      challenges: [
        'Significant language barrier',
        'Demanding cultural and workplace integration',
        'Long working hours in traditional sectors',
      ],
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
          source: 'https://www.moj.go.jp/isa/',
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
      processing_time:
        '2–4 months for the EU Blue Card and the Skilled Worker visa',
      investment_required:
        'Application fees plus proof of funds (≈€11,904/year in a blocked account)',
      language_requirement:
        'German (B1 recommended; some roles accept English)',
      job_market: 'Strong',
      benefits: [
        'Large and stable economy',
        'Statutory health insurance system',
        'Free or low-cost higher education',
        'Permanent residence possible after 21–33 months with the EU Blue Card',
      ],
      challenges: [
        'Language barrier outside international companies',
        'Paper-heavy public administration',
        'Tight housing market in major cities',
      ],
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
      processing_time: 'Skilled Migrant Category: ~12–16 months',
      investment_required: 'Application fees plus proof of funds (≈NZD 20,000)',
      language_requirement: 'English (IELTS 6.5 or above)',
      job_market: 'Moderate',
      benefits: [
        'High quality of life and work-life balance',
        'Outstanding natural environment',
        'Low crime rates',
        'Straightforward residence pathway for skilled workers',
      ],
      challenges: [
        'Geographic isolation and expensive flights',
        'Small domestic job market',
        'High housing costs in Auckland',
      ],
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
      processing_time: 'Critical Skills Employment Permit: ~8–12 weeks',
      investment_required: 'Permit fees plus proof of funds (≈€12,000)',
      language_requirement: 'English',
      job_market: 'Strong',
      benefits: [
        'English-speaking EU member state',
        'Major hub for technology and pharmaceutical employers',
        'Welcoming culture for newcomers',
        'Citizenship possible after five years of reckonable residence',
      ],
      challenges: [
        'Severe housing shortage and high rents',
        'Rainy climate year round',
        'High cost of living in Dublin',
      ],
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
            'https://www.irishimmigration.ie/',
        },
        {
          category: 'Transit Visa',
          description:
            'Visa required in certain cases for transiting through Irish airports.',
          source:
            'https://www.irishimmigration.ie/',
        },
        {
          category: 'Multiple Entry Visa',
          description:
            'Visa allowing several entries for stays under the dates specified, for certain eligible circumstances.',
          source:
            'https://www.irishimmigration.ie/',
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
      investment_required:
        'Varies by route: from ≈€30,000 in proven income up to €300,000 for investor categories',
      language_requirement: 'French (basic; B1 for naturalisation)',
      job_market: 'Strong',
      benefits: [
        'Strong public healthcare system',
        'Rich cultural life',
        'Free movement within the EU',
        'Talent Passport offers a multi-year route for skilled workers',
      ],
      challenges: [
        'Layered bureaucracy',
        'High cost of living in Paris',
        'Language barrier outside international workplaces',
      ],
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
          source: 'https://france-visas.gouv.fr/',
        },
        {
          category: 'Talent Passport / Skilled Worker Visas',
          description:
            'Specific long-stay visas designed for highly skilled professionals, research, entrepreneurs, etc.',
          source:
            'https://france-visas.gouv.fr/',
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
      processing_time: 'Work permit: 1–4 months; Schengen visa: up to 15 days',
      investment_required:
        'Application fees plus a salary meeting the statutory maintenance requirement',
      language_requirement: 'Swedish (English widely spoken at work)',
      job_market: 'Moderate',
      benefits: [
        'High quality of life',
        'Generous parental leave and social benefits',
        'Widespread English proficiency',
        'Free higher education for EU citizens',
      ],
      challenges: [
        'High cost of living',
        'Long, dark winters',
        'Tight housing queues in Stockholm',
      ],
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
        {
          language: 'en',
          description:
            'Schengen visas are normally decided within 15 days, according to the Swedish Migration Agency and Swedish consulates.',
        },
        {
          language: 'es',
          description:
            'Los visados Schengen suelen resolverse en un plazo de 15 días, según la Agencia Sueca de Migración y los consulados suecos.',
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
          source: 'https://www.migrationsverket.se/en/',
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
      processing_time: '2–3 months',
      investment_required:
        'Permit fees plus proof of means (CHF 100,000–300,000 for non-working residence routes)',
      language_requirement: 'German, French or Italian depending on the canton',
      job_market: 'Strong',
      benefits: [
        'Among the highest salaries in the world',
        'Economic and political stability',
        'Excellent public services and infrastructure',
        'Central location within Europe',
      ],
      challenges: [
        'Very high cost of living',
        'Strict quotas for non-EU workers',
        'Highly competitive job market for foreigners',
      ],
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
      processing_time: '6–24 months, varying heavily by visa category',
      investment_required:
        'EB-5: US$800,000 in a targeted employment area, or US$1,050,000 otherwise',
      language_requirement: 'English (no formal test for most categories)',
      job_market: 'Strong',
      benefits: [
        'Largest economy and deepest job market in the world',
        'Highest salaries in technology and specialised fields',
        'Strong culture of innovation and entrepreneurship',
        'Wide cultural diversity in major metropolitan areas',
      ],
      challenges: [
        'Complex, lengthy and quota-limited processes',
        'Expensive private healthcare tied to employment',
        'Green card backlogs of years or decades for some nationalities',
      ],
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
      processing_time: '10–40 business days',
      investment_required:
        'Employment Pass: salary above the statutory minimum; Global Investor Programme: from SGD 10 million',
      language_requirement: 'English (official working language)',
      job_market: 'Strong',
      benefits: [
        'Low personal income tax rates',
        'Major global financial hub',
        'Very high public safety',
        'English as the language of business and administration',
      ],
      challenges: [
        'Very high cost of living and housing',
        'Highly competitive job market',
        'Permanent residence is selective and quota-bound',
      ],
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
      processing_time: '2–8 weeks',
      investment_required:
        'Employment visa fees from ≈US$1,360; Golden Visa investment routes from AED 2 million',
      language_requirement: 'Arabic official; English widely used at work',
      job_market: 'Strong',
      benefits: [
        'No personal income tax',
        'Modern infrastructure and global connectivity',
        'Highly multicultural workforce',
        'Golden Visa offers 10-year renewable residence',
      ],
      challenges: [
        'Extreme summer heat',
        'Most residence permits are tied to an employer',
        'No path to citizenship for most residents',
      ],
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
      investment_required:
        'D-8 corporate investment from ≈KRW 100 million; F-2 routes vary by programme',
      language_requirement:
        'Korean (TOPIK levels required for some residence categories)',
      job_market: 'Moderate',
      benefits: [
        'Advanced digital and transport infrastructure',
        'Strong technology and manufacturing sectors',
        'National health insurance covering residents',
        'High public safety',
      ],
      challenges: [
        'Significant language barrier',
        'Demanding corporate work culture',
        'Long working hours in traditional industries',
      ],
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
      processing_time:
        '2–4 weeks under the fast-track scheme for recognised sponsors',
      investment_required:
        'Fees from €405; the highly skilled migrant route requires a salary above the annual threshold',
      language_requirement:
        'Dutch (English widely spoken and accepted at work)',
      job_market: 'Strong',
      benefits: [
        'High quality of life and work-life balance',
        'Excellent connectivity across Europe',
        'Very international working environment',
        '30% ruling tax advantage for qualifying newcomers',
      ],
      challenges: [
        'Severe housing shortage',
        'Rainy and grey climate',
        'High cost of living in Amsterdam and Utrecht',
      ],
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
            'https://ind.nl/en',
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
      investment_required:
        'Elective residency: ≈€31,000/year in passive income; investor visa from €250,000',
      language_requirement: 'Italian (basic; B1 for citizenship)',
      job_market: 'Moderate',
      benefits: [
        'Rich cultural and historical heritage',
        'Renowned food and lifestyle',
        'Accessible public healthcare for residents',
        'Citizenship by descent available to many applicants',
      ],
      challenges: [
        'Layered and slow bureaucracy',
        'Sluggish labour market and low wages',
        'Marked economic gap between north and south',
      ],
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
          source: 'https://vistoperitalia.esteri.it/',
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
      investment_required:
        'Application fees from ≈US$1,500; investor routes from ≈US$10,000',
      language_requirement: 'Spanish (basic)',
      job_market: 'Weak',
      benefits: [
        'Low cost of living in US dollar terms',
        'Simplified residence for Mercosur nationals',
        'Naturalisation possible after two years of residence',
        'Strong cultural life and natural diversity',
      ],
      challenges: [
        'Chronic economic instability',
        'High inflation eroding local salaries',
        'Currency and capital controls',
      ],
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
            'https://www.argentina.gob.ar/interior/migraciones',
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
      investment_required:
        'Application fees plus proof of income; investment routes from ≈US$25,000',
      language_requirement: 'Spanish (basic)',
      job_market: 'Moderate',
      benefits: [
        'Strong political and institutional stability',
        'Good environment for entrepreneurs',
        'Reliable public services by regional standards',
        'Permanent residence possible after two years',
      ],
      challenges: [
        'Slow and document-heavy immigration bureaucracy',
        'Language barrier outside Santiago',
        'High cost of living in the capital',
      ],
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
      investment_required:
        'Application fees plus proof of funds; the Red-White-Red Card requires meeting a points threshold',
      language_requirement: 'German (A1 before arrival for most routes)',
      job_market: 'Strong',
      benefits: [
        'Very high quality of life',
        'Excellent healthcare system',
        'Safe cities with strong public transport',
        'Central location within the EU',
      ],
      challenges: [
        'Demanding German language requirements',
        'Complex points-based selection',
        'Quota limits on some residence categories',
      ],
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
      investment_required:
        'Application fees plus proof of funds, from ≈US$3,000 depending on the route',
      language_requirement: 'Polish (basic; required for permanent residence)',
      job_market: 'Moderate',
      benefits: [
        'Low cost of living within the EU',
        'Growing demand for technical and IT roles',
        'Steady economic growth',
        'Central location for travel across Europe',
      ],
      challenges: [
        'Language barrier in public services',
        'Polish is demanding to learn',
        'Processing times vary widely by voivodeship',
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
      investment_required:
        'Application fees plus proof of funds (≈€6,720/year for students)',
      language_requirement:
        'Finnish or Swedish (English accepted in many workplaces)',
      job_market: 'Moderate',
      benefits: [
        'Consistently ranked among the happiest countries in the world',
        'Free education and strong public services',
        'Clean environment and abundant nature',
        'Good work-life balance',
      ],
      challenges: [
        'Long, dark and extremely cold winters',
        'Finnish is a difficult language to learn',
        'Competitive job market for non-Finnish speakers',
      ],
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
    {
      name: 'Portugal',
      flag: '🇵🇹',
      region: 'Europe',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'D7 Passive Income Visa',
        'D8 Digital Nomad Visa',
        'Work Visa (D1/D3)',
        'Student Visa (D4)',
      ],
      processing_time: '60–90 days',
      investment_required:
        'D7: ≈€10,440/year in passive income; D8: ≈€3,480/month in remote income',
      language_requirement: 'Portuguese (A2 required for citizenship)',
      job_market: 'Moderate',
      benefits: [
        'Path to citizenship after 5 years',
        'Affordable cost of living within the EU',
        'CPLP agreement eases entry for Portuguese-speaking nationals',
        'Mild climate and high safety',
      ],
      challenges: [
        'AIMA backlogs and long appointment queues',
        'Pressured housing market in Lisbon and Porto',
        'Low local salaries',
      ],
      popular_cities: ['Lisboa', 'Porto', 'Braga', 'Faro'],
      created_at: '2026-08-04T00:00:00Z',
      updated_at: '2026-08-04T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      descriptions: [
        {
          language: 'pt',
          description:
            'Portugal oferece vistos de residência D1 a D8, incluindo o D7 para renda passiva e o D8 para nômades digitais, com caminho para cidadania em 5 anos.',
        },
        {
          language: 'en',
          description:
            'Portugal offers D1 to D8 residence visas, including the D7 for passive income and the D8 for digital nomads, with a path to citizenship after 5 years.',
        },
        {
          language: 'es',
          description:
            'Portugal ofrece visados de residencia D1 a D8, incluido el D7 para rentas pasivas y el D8 para nómadas digitales, con vía a la ciudadanía a los 5 años.',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Short-Stay Visa (Schengen Type C)',
          description:
            'Visa for stays of up to 90 days in any 180-day period for tourism, business or family visits.',
          source: 'https://vistos.mne.gov.pt/',
        },
        {
          category: 'Temporary Stay Visa',
          description:
            'Visa for stays longer than 90 days but under one year, covering remote work, medical treatment and seasonal work.',
          source: 'https://vistos.mne.gov.pt/',
        },
        {
          category: 'Residence Visa (Type D)',
          description:
            'Long-term visa for work (D1/D3), entrepreneurship (D2), study (D4), family reunification and passive income (D7).',
          source: 'https://aima.gov.pt/',
        },
        {
          category: 'Permanent Residence / Long-Term Resident',
          description:
            'Available after five years of legal residence, granting stable residence rights and access to citizenship.',
          source: 'https://aima.gov.pt/',
        },
      ],
    },
    {
      name: 'Mexico',
      flag: '🇲🇽',
      region: 'North America',
      difficulty: 'Easy',
      difficulty_score: 2,
      visa_options: [
        'Temporary Resident Visa',
        'Permanent Resident Visa',
        'Visitor Visa (FMM)',
        'Work Visa with job offer',
      ],
      processing_time: '10–30 days',
      investment_required:
        'Temporary residency: ≈US$4,300/month in income or ≈US$73,000 in savings',
      language_requirement: 'Spanish (basic)',
      job_market: 'Moderate',
      benefits: [
        'Low cost of living',
        'Proximity and time-zone overlap with the United States',
        'Accessible temporary residency requirements',
        'Large established expat and digital nomad community',
      ],
      challenges: [
        'Security varies considerably by region',
        'INM bureaucracy and inconsistent consulate criteria',
        'Large informal labour market',
      ],
      popular_cities: [
        'Ciudad de México',
        'Guadalajara',
        'Mérida',
        'Playa del Carmen',
      ],
      created_at: '2026-08-04T00:00:00Z',
      updated_at: '2026-08-04T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      descriptions: [
        {
          language: 'pt',
          description:
            'O México oferece residência temporária e permanente com requisitos de renda acessíveis, sendo um dos principais destinos de nômades digitais das Américas.',
        },
        {
          language: 'en',
          description:
            'Mexico offers temporary and permanent residency with accessible income requirements, and is one of the main digital nomad destinations in the Americas.',
        },
        {
          language: 'es',
          description:
            'México ofrece residencia temporal y permanente con requisitos de ingresos accesibles, y es uno de los principales destinos de nómadas digitales de América.',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Visitor Visa (Visitante / FMM)',
          description:
            'Short-term entry for tourism or business for up to 180 days, without permission to work locally.',
          source: 'https://www.gob.mx/inm',
        },
        {
          category: 'Temporary Resident Visa (Residente Temporal)',
          description:
            'Residency from one to four years based on income, savings, family ties or a job offer.',
          source: 'https://www.gob.mx/inm',
        },
        {
          category: 'Permanent Resident Visa (Residente Permanente)',
          description:
            'Indefinite residency with work rights, reached by income, retirement, family ties or after four years as a temporary resident.',
          source: 'https://www.gob.mx/inm',
        },
      ],
    },
    {
      name: 'Norway',
      flag: '🇳🇴',
      region: 'Europe',
      difficulty: 'Hard',
      difficulty_score: 4,
      visa_options: [
        'Skilled Worker Residence Permit',
        'Job Seeker Visa',
        'Student Residence Permit',
        'Family Immigration',
      ],
      processing_time: '1–4 months',
      investment_required:
        'Skilled worker: salary matching Norwegian collective agreement levels',
      language_requirement: 'Norwegian (B1 for permanent residence)',
      job_market: 'Strong',
      benefits: [
        'High salaries and strong worker protections',
        'Comprehensive welfare state',
        'Strong work-life balance',
        'Outstanding natural environment',
      ],
      challenges: [
        'Very high cost of living',
        'Difficult language for newcomers',
        'Long, dark winters',
      ],
      popular_cities: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger'],
      created_at: '2026-08-04T00:00:00Z',
      updated_at: '2026-08-04T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      descriptions: [
        {
          language: 'pt',
          description:
            'A Noruega concede autorizações de residência para trabalhadores qualificados, estudantes e reunificação familiar, com salários altos e forte proteção social.',
        },
        {
          language: 'en',
          description:
            'Norway grants residence permits for skilled workers, students and family reunification, with high salaries and strong social protection.',
        },
        {
          language: 'es',
          description:
            'Noruega concede permisos de residencia para trabajadores cualificados, estudiantes y reagrupación familiar, con salarios altos y fuerte protección social.',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Short-Stay Visa (Schengen Type C)',
          description:
            'Visa for stays of up to 90 days in any 180-day period for tourism or business.',
          source: 'https://www.udi.no/en/',
        },
        {
          category: 'Residence Permit for Skilled Workers',
          description:
            'Permit for qualified professionals with a concrete job offer meeting Norwegian pay and qualification standards.',
          source: 'https://www.udi.no/en/',
        },
        {
          category: 'Student Residence Permit',
          description:
            'Permit for full-time studies at an accredited Norwegian institution, with limited work rights.',
          source: 'https://www.udi.no/en/',
        },
        {
          category: 'Permanent Residence Permit',
          description:
            'Available after three years of continuous residence, subject to language and social studies requirements.',
          source: 'https://www.udi.no/en/',
        },
      ],
    },
    {
      name: 'Denmark',
      flag: '🇩🇰',
      region: 'Europe',
      difficulty: 'Hard',
      difficulty_score: 4,
      visa_options: [
        'Pay Limit Scheme',
        'Positive List Scheme',
        'Student Residence Permit',
        'Family Reunification',
      ],
      processing_time: '1–3 months',
      investment_required:
        'Pay Limit Scheme: annual salary above the statutory threshold set each year',
      language_requirement: 'Danish (required for permanent residence)',
      job_market: 'Strong',
      benefits: [
        'Free education and healthcare',
        'Consistently high quality of life',
        'Short working week and strong labour rights',
        'Efficient digital public services',
      ],
      challenges: [
        'High income tax burden',
        'Restrictive immigration rules',
        'Social integration can be slow for newcomers',
      ],
      popular_cities: ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg'],
      created_at: '2026-08-04T00:00:00Z',
      updated_at: '2026-08-04T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      descriptions: [
        {
          language: 'pt',
          description:
            'A Dinamarca concede residência principalmente por vias de trabalho qualificado, como o Pay Limit Scheme e a Positive List, além de estudo e reunificação familiar.',
        },
        {
          language: 'en',
          description:
            'Denmark grants residence mainly through skilled work routes such as the Pay Limit Scheme and the Positive List, alongside study and family reunification.',
        },
        {
          language: 'es',
          description:
            'Dinamarca concede residencia principalmente por vías de trabajo cualificado, como el Pay Limit Scheme y la Positive List, además de estudio y reagrupación familiar.',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Short-Stay Visa (Schengen Type C)',
          description:
            'Visa for stays of up to 90 days in any 180-day period for tourism or business.',
          source: 'https://www.nyidanmark.dk/en-GB',
        },
        {
          category: 'Work Residence Permit (Pay Limit / Positive List)',
          description:
            'Permit for professionals with a job offer meeting the salary threshold or in a shortage occupation.',
          source: 'https://www.nyidanmark.dk/en-GB',
        },
        {
          category: 'Student Residence Permit',
          description:
            'Permit for higher education at an accredited Danish institution, with limited work rights.',
          source: 'https://www.nyidanmark.dk/en-GB',
        },
        {
          category: 'Permanent Residence Permit',
          description:
            'Available after several years of lawful residence, subject to employment, language and civic requirements.',
          source: 'https://www.nyidanmark.dk/en-GB',
        },
      ],
    },
    {
      name: 'Belgium',
      flag: '🇧🇪',
      region: 'Europe',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Single Permit (work and residence)',
        'EU Blue Card',
        'Student Visa',
        'Family Reunification',
      ],
      processing_time: '2–4 months',
      investment_required:
        'Single Permit: employment contract meeting the salary threshold of the relevant region',
      language_requirement: 'Dutch, French or German depending on the region',
      job_market: 'Strong',
      benefits: [
        'Hosts the main EU institutions and international organisations',
        'Central location within Western Europe',
        'High-quality healthcare system',
        'Multilingual working environment',
      ],
      challenges: [
        'High tax burden',
        'Administrative complexity split across regions',
        'Grey and rainy climate',
      ],
      popular_cities: ['Brussels', 'Antwerp', 'Ghent', 'Leuven'],
      created_at: '2026-08-04T00:00:00Z',
      updated_at: '2026-08-04T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      descriptions: [
        {
          language: 'pt',
          description:
            'A Bélgica concentra as instituições da UE e concede residência principalmente pelo Single Permit, que reúne autorização de trabalho e residência num só pedido.',
        },
        {
          language: 'en',
          description:
            'Belgium hosts the main EU institutions and grants residence mainly through the Single Permit, which combines work and residence authorisation in one application.',
        },
        {
          language: 'es',
          description:
            'Bélgica concentra las instituciones de la UE y concede residencia principalmente mediante el Single Permit, que reúne autorización de trabajo y residencia en una sola solicitud.',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Short-Stay Visa (Schengen Type C)',
          description:
            'Visa for stays of up to 90 days in any 180-day period for tourism, business or family visits.',
          source: 'https://dofi.ibz.be/en',
        },
        {
          category: 'Long-Stay Visa (Type D) / Single Permit',
          description:
            'Combined work and residence authorisation for stays over 90 days, issued by the region where the employer is based.',
          source: 'https://dofi.ibz.be/en',
        },
        {
          category: 'EU Blue Card',
          description:
            'Permit for highly qualified workers with a higher education degree and a salary above the regional threshold.',
          source: 'https://dofi.ibz.be/en',
        },
        {
          category: 'Permanent Residence / EU Long-Term Resident',
          description:
            'Available after five years of continuous lawful residence in Belgium.',
          source: 'https://dofi.ibz.be/en',
        },
      ],
    },
    {
      name: 'Czechia',
      flag: '🇨🇿',
      region: 'Europe',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Employee Card',
        'EU Blue Card',
        'Long-Term Business Visa (Živnostenské oprávnění)',
        'Student Long-Term Visa',
      ],
      processing_time: '60–90 days',
      investment_required:
        'Proof of funds of roughly CZK 110,000 for long-term stay applications',
      language_requirement: 'Czech (A2 for permanent residence)',
      job_market: 'Strong',
      benefits: [
        'Low cost of living for an EU member state',
        'Consistently low unemployment',
        'Central location with easy travel across Europe',
        'Accessible freelance (živno) route',
      ],
      challenges: [
        'Czech is a demanding language to learn',
        'Slow and paperwork-heavy administration',
        'Language barrier outside Prague',
      ],
      popular_cities: ['Prague', 'Brno', 'Ostrava', 'Plzeň'],
      created_at: '2026-08-04T00:00:00Z',
      updated_at: '2026-08-04T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      descriptions: [
        {
          language: 'pt',
          description:
            'A Chéquia oferece o Employee Card para trabalho, o Cartão Azul da UE para qualificados e o visto de longa duração para autônomos, com custo de vida baixo para a UE.',
        },
        {
          language: 'en',
          description:
            'Czechia offers the Employee Card for work, the EU Blue Card for highly qualified professionals and a long-term visa for freelancers, with a low cost of living for the EU.',
        },
        {
          language: 'es',
          description:
            'Chequia ofrece la Employee Card para trabajo, la Tarjeta Azul de la UE para cualificados y el visado de larga duración para autónomos, con bajo coste de vida para la UE.',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Short-Stay Visa (Schengen Type C)',
          description:
            'Visa for stays of up to 90 days in any 180-day period for tourism or business.',
          source: 'https://ipc.gov.cz/en/',
        },
        {
          category: 'Long-Term Visa / Employee Card',
          description:
            'Combined work and residence permit tied to a specific position registered in the central vacancy database.',
          source: 'https://ipc.gov.cz/en/',
        },
        {
          category: 'Long-Term Business Visa (Trade Licence)',
          description:
            'Long-term visa for self-employed activity carried out under a Czech trade licence.',
          source: 'https://ipc.gov.cz/en/',
        },
        {
          category: 'Permanent Residence',
          description:
            'Available after five years of continuous residence, subject to a Czech language examination.',
          source: 'https://ipc.gov.cz/en/',
        },
      ],
    },
    {
      name: 'Greece',
      flag: '🇬🇷',
      region: 'Europe',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Golden Visa (real estate)',
        'Digital Nomad Visa',
        'Financially Independent Person Visa',
        'Work Visa',
      ],
      processing_time: '2–6 months',
      investment_required:
        'Golden Visa: €250,000 to €800,000 in real estate depending on the region',
      language_requirement: 'Greek (basic; B1 for citizenship)',
      job_market: 'Weak',
      benefits: [
        'One of the more accessible Golden Visa programmes in the EU',
        'Mediterranean climate',
        'Low cost of living relative to Western Europe',
        'No minimum stay requirement for the Golden Visa',
      ],
      challenges: [
        'Weak local labour market and low wages',
        'Slow bureaucracy',
        'Economy still recovering from the debt crisis',
      ],
      popular_cities: ['Athens', 'Thessaloniki', 'Patras', 'Heraklion'],
      created_at: '2026-08-04T00:00:00Z',
      updated_at: '2026-08-04T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      descriptions: [
        {
          language: 'pt',
          description:
            'A Grécia tem um dos Golden Visas mais acessíveis da UE, além de vistos para nômades digitais e pessoas financeiramente independentes.',
        },
        {
          language: 'en',
          description:
            'Greece runs one of the more accessible Golden Visa programmes in the EU, alongside visas for digital nomads and financially independent people.',
        },
        {
          language: 'es',
          description:
            'Grecia tiene uno de los Golden Visa más accesibles de la UE, además de visados para nómadas digitales y personas económicamente independientes.',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Short-Stay Visa (Schengen Type C)',
          description:
            'Visa for stays of up to 90 days in any 180-day period for tourism or business.',
          source: 'https://www.mfa.gr/en/visas/',
        },
        {
          category: 'National Visa (Type D)',
          description:
            'Long-stay visa for work, study, family reunification or financially independent residence.',
          source: 'https://www.mfa.gr/en/visas/',
        },
        {
          category: 'Residence Permit for Investors (Golden Visa)',
          description:
            'Renewable five-year residence permit granted through qualifying real estate or capital investment.',
          source: 'https://www.mfa.gr/en/visas/',
        },
        {
          category: 'Long-Term Resident Status',
          description:
            'Available after five years of legal residence, subject to income and integration requirements.',
          source: 'https://www.mfa.gr/en/visas/',
        },
      ],
    },
    {
      name: 'Thailand',
      flag: '🇹🇭',
      region: 'Asia',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Long-Term Resident (LTR) Visa',
        'Destination Thailand Visa (DTV)',
        'Non-Immigrant B (work)',
        'Thailand Privilege (Elite) Visa',
      ],
      processing_time: '15–60 days',
      investment_required:
        'LTR: US$80,000 annual income or US$500,000 in assets; Privilege Visa: from THB 900,000',
      language_requirement: 'Thai (not required for most visa routes)',
      job_market: 'Moderate',
      benefits: [
        'Low cost of living with high quality of life',
        'LTR visa valid for up to 10 years',
        'Strong infrastructure for foreign residents',
        'Affordable and high-standard private healthcare',
      ],
      challenges: [
        'Permanent residence is highly restricted and rarely granted',
        'Many occupations are legally reserved for Thai nationals',
        'Frequent reporting and renewal obligations',
      ],
      popular_cities: ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya'],
      created_at: '2026-08-04T00:00:00Z',
      updated_at: '2026-08-04T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      descriptions: [
        {
          language: 'pt',
          description:
            'A Tailândia oferece o visto LTR de até 10 anos, o DTV para trabalho remoto e o Privilege Visa por adesão, mas a residência permanente é bastante restrita.',
        },
        {
          language: 'en',
          description:
            'Thailand offers the LTR visa valid for up to 10 years, the DTV for remote work and the membership-based Privilege Visa, though permanent residence remains highly restricted.',
        },
        {
          language: 'es',
          description:
            'Tailandia ofrece el visado LTR de hasta 10 años, el DTV para trabajo remoto y el Privilege Visa por membresía, aunque la residencia permanente es muy restringida.',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Tourist Visa / Visa Exemption',
          description:
            'Short-term entry for tourism, with duration depending on nationality and entry route.',
          source: 'https://www.immigration.go.th/',
        },
        {
          category: 'Non-Immigrant Visa (B, O, ED)',
          description:
            'Category covering employment (B), family or retirement (O) and study (ED), normally issued for 90 days and extended in country.',
          source: 'https://www.immigration.go.th/',
        },
        {
          category: 'Long-Term Resident (LTR) Visa',
          description:
            'Ten-year visa for wealthy global citizens, pensioners, remote professionals and highly skilled specialists.',
          source: 'https://ltr.boi.go.th/',
        },
        {
          category: 'Permanent Residence',
          description:
            'Granted under an annual national quota after several consecutive years on qualifying extensions of stay.',
          source: 'https://www.immigration.go.th/',
        },
      ],
    },
    {
      name: 'Brazil',
      flag: '🇧🇷',
      region: 'South America',
      difficulty: 'Easy',
      difficulty_score: 2,
      visa_options: [
        'VITEM XIV Digital Nomad Visa',
        'VITEM V Work Visa',
        'VITEM IV Student Visa',
        'Mercosur Residence Agreement',
      ],
      processing_time: '30–90 days',
      investment_required:
        'Digital nomad: US$1,500/month in income or US$18,000 in available funds',
      language_requirement: 'Portuguese (basic)',
      job_market: 'Moderate',
      benefits: [
        'Simplified residence for Mercosur nationals',
        'Low cost of living outside the main capitals',
        'Naturalisation possible after four years of residence',
        'Universal public healthcare system (SUS)',
      ],
      challenges: [
        'Heavy and document-intensive bureaucracy',
        'Security varies sharply by city and neighbourhood',
        'Pronounced regional inequality',
      ],
      popular_cities: [
        'São Paulo',
        'Rio de Janeiro',
        'Florianópolis',
        'Curitiba',
      ],
      created_at: '2026-08-04T00:00:00Z',
      updated_at: '2026-08-04T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      descriptions: [
        {
          language: 'pt',
          description:
            'O Brasil oferece residência facilitada para nacionais do Mercosul, além do visto de nômade digital VITEM XIV e naturalização possível após quatro anos.',
        },
        {
          language: 'en',
          description:
            'Brazil offers simplified residence for Mercosur nationals, the VITEM XIV digital nomad visa, and naturalisation after four years of residence.',
        },
        {
          language: 'es',
          description:
            'Brasil ofrece residencia simplificada para nacionales del Mercosur, el visado de nómada digital VITEM XIV y naturalización tras cuatro años de residencia.',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Visitor Visa (VIVIS)',
          description:
            'Short-stay visa for tourism, business or transit, with no local work rights.',
          source: 'https://www.gov.br/mre/pt-br',
        },
        {
          category: 'Temporary Visa (VITEM)',
          description:
            'Category covering work (V), study (IV), family reunion (XI) and remote work (XIV), granted for a defined period.',
          source: 'https://www.gov.br/mj/pt-br/assuntos/seus-direitos/migracoes',
        },
        {
          category: 'Mercosur Residence',
          description:
            'Residence granted to nationals of Mercosur member and associated states under the regional residence agreement.',
          source: 'https://www.gov.br/mj/pt-br/assuntos/seus-direitos/migracoes',
        },
        {
          category: 'Permanent Residence',
          description:
            'Indefinite residence granted through family ties, investment, retirement or conversion from temporary residence.',
          source: 'https://www.gov.br/mj/pt-br/assuntos/seus-direitos/migracoes',
        },
      ],
    },
    {
      name: 'Uruguay',
      flag: '🇺🇾',
      region: 'South America',
      difficulty: 'Easy',
      difficulty_score: 2,
      visa_options: [
        'Mercosur Residence',
        'Permanent Residence',
        'Temporary Residence',
        'Digital Nomad Permit',
      ],
      processing_time: '3–8 months',
      investment_required:
        'Proof of stable monthly income of roughly US$1,500, or qualifying property investment',
      language_requirement: 'Spanish (basic)',
      job_market: 'Moderate',
      benefits: [
        'Strong political and institutional stability',
        'Direct path to permanent residence for Mercosur nationals',
        'Comparatively high safety for the region',
        'Territorial tax treatment for new residents',
      ],
      challenges: [
        'High cost of living by regional standards',
        'Small domestic market limits job opportunities',
        'Residence processing can be slow',
      ],
      popular_cities: [
        'Montevideo',
        'Punta del Este',
        'Colonia del Sacramento',
        'Salto',
      ],
      created_at: '2026-08-04T00:00:00Z',
      updated_at: '2026-08-04T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      descriptions: [
        {
          language: 'pt',
          description:
            'O Uruguai concede residência permanente direta a nacionais do Mercosul e residência por renda comprovada, com forte estabilidade institucional.',
        },
        {
          language: 'en',
          description:
            'Uruguay grants direct permanent residence to Mercosur nationals and residence based on proven income, backed by strong institutional stability.',
        },
        {
          language: 'es',
          description:
            'Uruguay concede residencia permanente directa a nacionales del Mercosur y residencia por ingresos acreditados, con fuerte estabilidad institucional.',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Tourist Entry',
          description:
            'Short-term entry for tourism, generally up to 90 days and extendable once.',
          source: 'https://www.gub.uy/ministerio-relaciones-exteriores/',
        },
        {
          category: 'Temporary Residence',
          description:
            'Residence for a defined period based on work, study, research or scientific activity.',
          source: 'https://www.gub.uy/ministerio-relaciones-exteriores/',
        },
        {
          category: 'Mercosur Residence',
          description:
            'Simplified residence for nationals of Mercosur member and associated states, convertible to permanent status.',
          source: 'https://www.gub.uy/ministerio-relaciones-exteriores/',
        },
        {
          category: 'Permanent Residence',
          description:
            'Indefinite residence granted through family ties, proven income or conversion from temporary residence.',
          source: 'https://www.gub.uy/ministerio-relaciones-exteriores/',
        },
      ],
    },
    {
      name: 'Panama',
      flag: '🇵🇦',
      region: 'North America',
      difficulty: 'Easy',
      difficulty_score: 2,
      visa_options: [
        'Friendly Nations Visa',
        'Pensionado (Retiree) Visa',
        'Qualified Investor Visa',
        'Short Stay Remote Worker Visa',
      ],
      processing_time: '3–6 months',
      investment_required:
        'Friendly Nations: US$5,000 bank deposit plus an economic tie; Qualified Investor: from US$300,000',
      language_requirement: 'Spanish (basic)',
      job_market: 'Moderate',
      benefits: [
        'Territorial tax system — foreign income is not taxed locally',
        'US dollar used as legal tender',
        'Pensionado programme with wide statutory discounts',
        'Regional logistics and banking hub',
      ],
      challenges: [
        'Applications legally require a local lawyer',
        'High cost of living in Panama City',
        'Marked inequality outside the capital',
      ],
      popular_cities: ['Panama City', 'Boquete', 'Coronado', 'David'],
      created_at: '2026-08-04T00:00:00Z',
      updated_at: '2026-08-04T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      descriptions: [
        {
          language: 'pt',
          description:
            'O Panamá oferece o Friendly Nations Visa, o programa Pensionado para aposentados e tributação territorial, com o dólar americano como moeda oficial.',
        },
        {
          language: 'en',
          description:
            'Panama offers the Friendly Nations Visa, the Pensionado programme for retirees and territorial taxation, with the US dollar as legal tender.',
        },
        {
          language: 'es',
          description:
            'Panamá ofrece el Friendly Nations Visa, el programa Pensionado para jubilados y tributación territorial, con el dólar estadounidense como moneda de curso legal.',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Tourist Entry',
          description:
            'Short-term entry for tourism, with duration depending on nationality.',
          source: 'https://www.migracion.gob.pa/',
        },
        {
          category: 'Friendly Nations Visa',
          description:
            'Temporary residence for nationals of listed countries, based on a job offer or economic activity in Panama, convertible to permanent residence.',
          source: 'https://www.migracion.gob.pa/',
        },
        {
          category: 'Pensionado (Retiree) Visa',
          description:
            'Permanent residence for retirees with a guaranteed lifetime pension, granting access to statutory discounts.',
          source: 'https://www.migracion.gob.pa/',
        },
        {
          category: 'Qualified Investor Visa',
          description:
            'Permanent residence granted through qualifying investment in real estate, securities or a fixed-term deposit.',
          source: 'https://www.migracion.gob.pa/',
        },
      ],
    },
    {
      name: 'Costa Rica',
      flag: '🇨🇷',
      region: 'North America',
      difficulty: 'Easy',
      difficulty_score: 2,
      visa_options: [
        'Rentista Visa',
        'Pensionado Visa',
        'Digital Nomad Visa',
        'Inversionista Visa',
      ],
      processing_time: '3–9 months',
      investment_required:
        'Rentista: US$2,500/month for two years; Inversionista: from US$150,000',
      language_requirement: 'Spanish (basic)',
      job_market: 'Weak',
      benefits: [
        'Long-standing political stability and no standing army',
        'Outstanding biodiversity and natural environment',
        'Public healthcare system (CCSS) open to legal residents',
        'Established digital nomad legislation',
      ],
      challenges: [
        'High cost of living by regional standards',
        'Local labour market largely closed to foreign residents',
        'Slow immigration processing times',
      ],
      popular_cities: ['San José', 'Escazú', 'Tamarindo', 'Atenas'],
      created_at: '2026-08-04T00:00:00Z',
      updated_at: '2026-08-04T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      descriptions: [
        {
          language: 'pt',
          description:
            'A Costa Rica oferece as vias Rentista, Pensionado e Inversionista, além de visto específico para nômades digitais, com forte estabilidade política.',
        },
        {
          language: 'en',
          description:
            'Costa Rica offers the Rentista, Pensionado and Inversionista routes, plus a dedicated digital nomad visa, backed by long-standing political stability.',
        },
        {
          language: 'es',
          description:
            'Costa Rica ofrece las vías Rentista, Pensionado e Inversionista, además de un visado específico para nómadas digitales, con fuerte estabilidad política.',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Tourist Entry',
          description:
            'Short-term entry for tourism, with the authorised period set by the immigration officer on arrival.',
          source: 'https://www.migracion.go.cr/',
        },
        {
          category: 'Temporary Residence (Rentista / Inversionista)',
          description:
            'Two-year renewable residence based on guaranteed income or qualifying investment in the country.',
          source: 'https://www.migracion.go.cr/',
        },
        {
          category: 'Digital Nomad Visa',
          description:
            'One-year renewable stay for remote workers earning income from outside Costa Rica.',
          source: 'https://www.migracion.go.cr/',
        },
        {
          category: 'Permanent Residence',
          description:
            'Available after three years of temporary residence, or immediately through first-degree family ties to a Costa Rican citizen.',
          source: 'https://www.migracion.go.cr/',
        },
      ],
    },
  ];

  for (const countryData of countries) {
    const { descriptions, immigration_visa_types, ...countryInfo } =
      countryData;

    // `background_image` is NOT NULL but may legitimately be an empty string
    // while the artwork has not been uploaded to R2 yet. Do not substitute a
    // placeholder here: the frontend already guards on the empty value, and a
    // fake URL would hide which countries are still missing their image.
    const countryDataWithImage = {
      ...countryInfo,
      background_image: countryInfo.background_image ?? '',
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
      // Reconcile by (country_id, category) instead of wiping and recreating.
      // Deleting a visa type cascades to visa_steps and sets plans.selected_visa_type_id
      // to NULL, so re-running the seed used to destroy real user data.
      const existingVisaTypes = await prisma.immigrationVisaType.findMany({
        where: { country_id: country.id },
      });

      for (const visaType of immigration_visa_types) {
        const match = existingVisaTypes.find(
          (existing) => existing.category === visaType.category,
        );

        if (match) {
          // Update in place so the id survives and dependent rows stay linked.
          await prisma.immigrationVisaType.update({
            where: { id: match.id },
            data: {
              description: visaType.description,
              source: visaType.source,
            },
          });
        } else {
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

      // Categories present in the database but absent from the seed are reported,
      // never deleted: removing one would cascade into visa_steps and user plans.
      const seededCategories = new Set(
        immigration_visa_types.map((visaType) => visaType.category),
      );
      const staleVisaTypes = existingVisaTypes.filter(
        (existing) => !seededCategories.has(existing.category),
      );

      for (const stale of staleVisaTypes) {
        console.warn(
          `[seed] ${country.name}: visa type "${stale.category}" (${stale.id}) exists in the database but not in the seed. Left untouched — delete it manually if it is really obsolete.`,
        );
      }
    }
  }

  console.log('Seed completed successfully :)');
}
