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
      job_market: 'Moderate',
      popular_cities: [
        'Madrid',
        'Barcelona',
        'Valencia',
      ],
      created_at: '2025-07-05T00:00:00Z',
      updated_at: '2025-07-05T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/spain.png',
      translations: [
        {
          language: 'pt',
          description:
            'A Espanha oferece vistos de trabalho, estudos e residência não-lucrativa/digital nomad, com prazos entre 15 e 45 dias úteis.',
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
          processing_time: '15–45 days',
          investment_required:
            'Digital nomad visa: €34,188/year (200% of the minimum wage), plus application fees',
          language_requirement: 'Spanish (basic to intermediate)',
        },
        {
          language: 'en',
          description:
            'Spain offers work, student, and non-lucrative/digital nomad residence visas, processed within 15 to 45 working days.',
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
          processing_time: '15–45 days',
          investment_required:
            'Digital nomad visa: €34,188/year (200% of the minimum wage), plus application fees',
          language_requirement: 'Spanish (basic to intermediate)',
        },
        {
          language: 'es',
          description:
            'España ofrece visados de trabajo, estudios y residencia no lucrativa/digital nomad, procesados entre 15 y 45 días hábiles.',
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
          processing_time: '15–45 days',
          investment_required:
            'Digital nomad visa: €34,188/year (200% of the minimum wage), plus application fees',
          language_requirement: 'Spanish (basic to intermediate)',
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
          source: 'https://www.inclusion.gob.es/web/migraciones/',
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
      job_market: 'Strong',
      popular_cities: [
        'London',
        'Manchester',
        'Edinburgh',
      ],
      created_at: '2025-07-05T00:00:00Z',
      updated_at: '2025-07-05T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/united_kingdom.png',
      translations: [
        {
          language: 'pt',
          description:
            'O Reino Unido oferece o Skilled Worker Visa com decisão em cerca de 3 semanas (externo) e até 8 semanas interno.',
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
          processing_time: '3 weeks from outside the UK; 8 weeks to switch or extend from inside',
          investment_required:
            'Visa fee plus Immigration Health Surcharge and Certificate of Sponsorship fee',
          language_requirement: 'English (B1 or above)',
        },
        {
          language: 'en',
          description:
            'The UK offers the Skilled Worker Visa, typically decided within 3 weeks outside the UK and 8 weeks inside.',
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
          processing_time: '3 weeks from outside the UK; 8 weeks to switch or extend from inside',
          investment_required:
            'Visa fee plus Immigration Health Surcharge and Certificate of Sponsorship fee',
          language_requirement: 'English (B1 or above)',
        },
        {
          language: 'es',
          description:
            'El Reino Unido ofrece el Skilled Worker Visa, con decisión en unas 3 semanas desde el exterior y 8 dentro.',
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
          processing_time: '3 weeks from outside the UK; 8 weeks to switch or extend from inside',
          investment_required:
            'Visa fee plus Immigration Health Surcharge and Certificate of Sponsorship fee',
          language_requirement: 'English (B1 or above)',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Visitor & Short-Stay Visas',
          description:
            'Visas for tourism, business, short stays up to six months or airport transit.',
          source: 'https://www.gov.uk/browse/visas-immigration/tourist-short-stay-visas',
        },
        {
          category: 'Work Visas',
          description:
            'Visas for work including the Skilled Worker visa, Graduate visa, Health & Care Worker visa, etc.',
          source: 'https://www.gov.uk/browse/visas-immigration/work-visas',
        },
        {
          category: 'Study Visas',
          description:
            'Visas for students to study in the UK, including full-time study and graduate routes.',
          source: 'https://www.gov.uk/browse/visas-immigration/study-visas',
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
      job_market: 'Strong',
      popular_cities: [
        'Toronto',
        'Vancouver',
        'Montreal',
      ],
      created_at: '2025-07-05T00:00:00Z',
      updated_at: '2025-07-05T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/canada.png',
      translations: [
        {
          language: 'pt',
          description:
            'O sistema Express Entry processa 80% dos pedidos em até 6 meses, e aplicações fora do Canadá levam +3‑4 meses para retorno de documentos.',
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
          processing_time:
            '80% of PR applications within 6 months; add 3–4 months when applying from abroad',
          investment_required:
            'IRCC fees plus settlement funds of ≈CAD 15,300 for a single applicant, indexed yearly',
          language_requirement: 'English or French (CLB 7+)',
        },
        {
          language: 'en',
          description:
            'Canada\'s Express Entry system processes 80% of permanent residency applications in 6 months, with an additional 3–4 months for passport return when applying abroad.',
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
          processing_time:
            '80% of PR applications within 6 months; add 3–4 months when applying from abroad',
          investment_required:
            'IRCC fees plus settlement funds of ≈CAD 15,300 for a single applicant, indexed yearly',
          language_requirement: 'English or French (CLB 7+)',
        },
        {
          language: 'es',
          description:
            'El sistema Express Entry de Canadá procesa el 80 % de solicitudes de residencia permanente en 6 meses, con 3–4 meses adicionales para devolución de pasaporte en el exterior.',
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
          processing_time:
            '80% of PR applications within 6 months; add 3–4 months when applying from abroad',
          investment_required:
            'IRCC fees plus settlement funds of ≈CAD 15,300 for a single applicant, indexed yearly',
          language_requirement: 'English or French (CLB 7+)',
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
      job_market: 'Strong',
      popular_cities: [
        'Sydney',
        'Melbourne',
        'Brisbane',
      ],
      created_at: '2025-07-05T00:00:00Z',
      updated_at: '2025-07-05T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/new_zealand.png',
      translations: [
        {
          language: 'pt',
          description:
            'O visto Skilled Permanente leva cerca de 10 meses, e o temporário (482) tem tempo mediano de 98 dias, segundo governo austríaco.',
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
          processing_time:
            'Skilled (Permanent): ~10 months; Skilled (Temporary): ~98 days median',
          investment_required:
            'Visa charges only — no fixed settlement funds; the 190 needs a state-set financial declaration',
          language_requirement: 'English (IELTS 6 or above)',
        },
        {
          language: 'en',
          description:
            'Australia\'s permanent skilled visas take around 10 months, while the temporary 482 visa has a median processing time of 98 days, according to Home Affairs.',
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
          processing_time:
            'Skilled (Permanent): ~10 months; Skilled (Temporary): ~98 days median',
          investment_required:
            'Visa charges only — no fixed settlement funds; the 190 needs a state-set financial declaration',
          language_requirement: 'English (IELTS 6 or above)',
        },
        {
          language: 'es',
          description:
            'Los visados cualificados permanentes de Australia tardan unos 10 meses, mientras que el 482 temporal tiene un tiempo medio de 98 días, según el Ministerio.',
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
          processing_time:
            'Skilled (Permanent): ~10 months; Skilled (Temporary): ~98 days median',
          investment_required:
            'Visa charges only — no fixed settlement funds; the 190 needs a state-set financial declaration',
          language_requirement: 'English (IELTS 6 or above)',
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
      job_market: 'Moderate',
      popular_cities: [
        'Tokyo',
        'Osaka',
        'Fukuoka',
      ],
      created_at: '2025-07-05T00:00:00Z',
      updated_at: '2025-07-05T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/australia.png',
      translations: [
        {
          language: 'pt',
          description:
            'O visto japonês é emitido em cerca de uma semana (após aprovação), de acordo com o MFA do Japão.',
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
          processing_time:
            '≈1 week for consular issuance once the Certificate of Eligibility is granted',
          investment_required: 'Consular fees plus proof of funds (≈¥500,000)',
          language_requirement: 'Japanese (JLPT N2 recommended)',
        },
        {
          language: 'en',
          description:
            'Japan issues visas within approximately one week post-approval, per the Ministry of Foreign Affairs.',
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
          processing_time:
            '≈1 week for consular issuance once the Certificate of Eligibility is granted',
          investment_required: 'Consular fees plus proof of funds (≈¥500,000)',
          language_requirement: 'Japanese (JLPT N2 recommended)',
        },
        {
          language: 'es',
          description:
            'Japón emite visados en aproximadamente una semana tras la aprobación, según el Ministerio de Asuntos Exteriores.',
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
          processing_time:
            '≈1 week for consular issuance once the Certificate of Eligibility is granted',
          investment_required: 'Consular fees plus proof of funds (≈¥500,000)',
          language_requirement: 'Japanese (JLPT N2 recommended)',
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
      visa_options: [
        'EU Blue Card',
        'Skilled Workers Visa',
        'Job Seeker Visa',
      ],
      job_market: 'Strong',
      popular_cities: [
        'Berlin',
        'Munich',
        'Frankfurt',
      ],
      created_at: '2025-07-05T00:00:00Z',
      updated_at: '2025-07-05T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/japan.png',
      translations: [
        {
          language: 'pt',
          description:
            'A Alemanha processa pedidos de Blue Card e Skilled Workers Visa em 2–4 meses, segundo o BAMF.',
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
          processing_time:
            '2–4 months for the EU Blue Card and the Skilled Worker visa',
          investment_required:
            'Application fees plus proof of funds (≈€11,904/year in a blocked account)',
          language_requirement:
            'German (B1 recommended; some roles accept English)',
        },
        {
          language: 'en',
          description:
            'Germany processes EU Blue Card and Skilled Worker visas within 2–4 months, per the Federal Office for Migration and Refugees (BAMF).',
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
          processing_time:
            '2–4 months for the EU Blue Card and the Skilled Worker visa',
          investment_required:
            'Application fees plus proof of funds (≈€11,904/year in a blocked account)',
          language_requirement:
            'German (B1 recommended; some roles accept English)',
        },
        {
          language: 'es',
          description:
            'Alemania procesa los visados Blue Card y de trabajadores cualificados en 2–4 meses, según la BAMF.',
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
          processing_time:
            '2–4 months for the EU Blue Card and the Skilled Worker visa',
          investment_required:
            'Application fees plus proof of funds (≈€11,904/year in a blocked account)',
          language_requirement:
            'German (B1 recommended; some roles accept English)',
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
      job_market: 'Moderate',
      popular_cities: [
        'Auckland',
        'Wellington',
        'Christchurch',
      ],
      created_at: '2025-07-05T00:00:00Z',
      updated_at: '2025-07-05T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/new_zealand.png',
      translations: [
        {
          language: 'pt',
          description:
            'O visto Skilled Migrant leva aproximadamente 12–16 meses, conforme o Immigration NZ.',
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
          processing_time: 'Skilled Migrant Category: ~12–16 months',
          investment_required:
            'Application fees plus proof of funds (≈NZD 20,000)',
          language_requirement: 'English (IELTS 6.5 or above)',
        },
        {
          language: 'en',
          description:
            'The Skilled Migrant visa takes about 12–16 months, according to Immigration New Zealand.',
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
          processing_time: 'Skilled Migrant Category: ~12–16 months',
          investment_required:
            'Application fees plus proof of funds (≈NZD 20,000)',
          language_requirement: 'English (IELTS 6.5 or above)',
        },
        {
          language: 'es',
          description:
            'El visado Skilled Migrant tarda aproximadamente 12–16 meses, según Immigration New Zealand.',
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
          processing_time: 'Skilled Migrant Category: ~12–16 months',
          investment_required:
            'Application fees plus proof of funds (≈NZD 20,000)',
          language_requirement: 'English (IELTS 6.5 or above)',
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
      job_market: 'Strong',
      popular_cities: [
        'Dublin',
        'Cork',
        'Galway',
      ],
      created_at: '2025-07-05T00:00:00Z',
      updated_at: '2025-07-05T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/ireland.png',
      translations: [
        {
          language: 'pt',
          description:
            'O Critical Skills Employment Permit leva aproximadamente 8–12 semanas, conforme o INIS.',
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
          processing_time: 'Critical Skills Employment Permit: ~8–12 weeks',
          investment_required: 'Permit fees plus proof of funds (≈€12,000)',
          language_requirement: 'English',
        },
        {
          language: 'en',
          description:
            'The Critical Skills Employment Permit takes about 8–12 weeks, according to the Irish Naturalisation and Immigration Service.',
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
          processing_time: 'Critical Skills Employment Permit: ~8–12 weeks',
          investment_required: 'Permit fees plus proof of funds (≈€12,000)',
          language_requirement: 'English',
        },
        {
          language: 'es',
          description:
            'El Critical Skills Employment Permit tarda unas 8–12 semanas, según el INIS irlandés.',
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
          processing_time: 'Critical Skills Employment Permit: ~8–12 weeks',
          investment_required: 'Permit fees plus proof of funds (≈€12,000)',
          language_requirement: 'English',
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
          source: 'https://www.irishimmigration.ie/',
        },
        {
          category: 'Transit Visa',
          description:
            'Visa required in certain cases for transiting through Irish airports.',
          source: 'https://www.irishimmigration.ie/',
        },
        {
          category: 'Multiple Entry Visa',
          description:
            'Visa allowing several entries for stays under the dates specified, for certain eligible circumstances.',
          source: 'https://www.irishimmigration.ie/',
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
      job_market: 'Strong',
      popular_cities: [
        'Paris',
        'Lyon',
        'Marseille',
      ],
      created_at: '2025-07-05T00:00:00Z',
      updated_at: '2025-07-05T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/france.png',
      translations: [
        {
          language: 'pt',
          description:
            'O “Passeport Talent” exige investimento de €30 k (empreendedor) a €300 k (investidor), com visto emitido em até 2 meses pelo France‑Visas.',
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
          processing_time: '1–2 months',
          investment_required:
            'Varies by route: from ≈€30,000 in proven income up to €300,000 for investor categories',
          language_requirement: 'French (basic; B1 for naturalisation)',
        },
        {
          language: 'en',
          description:
            'The “Passeport Talent” requires an investment from €30k (entrepreneur) to €300k (investor), with the visa issued within up to 2 months by France-Visas.',
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
          processing_time: '1–2 months',
          investment_required:
            'Varies by route: from ≈€30,000 in proven income up to €300,000 for investor categories',
          language_requirement: 'French (basic; B1 for naturalisation)',
        },
        {
          language: 'es',
          description:
            'El “Passeport Talent” exige una inversión de 30.000 € (emprendedor) a 300.000 € (inversor), con visado emitido en hasta 2 meses por France-Visas.',
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
          processing_time: '1–2 months',
          investment_required:
            'Varies by route: from ≈€30,000 in proven income up to €300,000 for investor categories',
          language_requirement: 'French (basic; B1 for naturalisation)',
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
          source: 'https://france-visas.gouv.fr/',
        },
      ],
    },
    {
      name: 'Sweden',
      flag: '🇸🇪',
      region: 'Europe',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Work Permit (Skilled)',
        'EU Blue Card',
        'Student Visa',
      ],
      job_market: 'Moderate',
      popular_cities: [
        'Stockholm',
        'Gothenburg',
        'Malmö',
      ],
      created_at: '2025-07-05T00:00:00Z',
      updated_at: '2025-07-05T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/sweden.png',
      translations: [
        {
          language: 'pt',
          description:
            'Schengen visa normalmente decidido em até 15 dias, conforme Migration Agency e consulados suecos.',
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
          processing_time:
            'Work permit: 1–4 months; Schengen visa: up to 15 days',
          investment_required:
            'Work permit: SEK 34,470/month, equal to 90% of the national median salary',
          language_requirement: 'Swedish (English widely spoken at work)',
        },
        {
          language: 'en',
          description:
            'Schengen visas are normally decided within 15 days, according to the Swedish Migration Agency and Swedish consulates.',
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
          processing_time:
            'Work permit: 1–4 months; Schengen visa: up to 15 days',
          investment_required:
            'Work permit: SEK 34,470/month, equal to 90% of the national median salary',
          language_requirement: 'Swedish (English widely spoken at work)',
        },
        {
          language: 'es',
          description:
            'Los visados Schengen suelen resolverse en un plazo de 15 días, según la Agencia Sueca de Migración y los consulados suecos.',
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
          processing_time:
            'Work permit: 1–4 months; Schengen visa: up to 15 days',
          investment_required:
            'Work permit: SEK 34,470/month, equal to 90% of the national median salary',
          language_requirement: 'Swedish (English widely spoken at work)',
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
      visa_options: [
        'L Permit (Work)',
        'Swiss ICT Permit',
        'Student Visa',
      ],
      job_market: 'Strong',
      popular_cities: [
        'Zurich',
        'Geneva',
        'Basel',
      ],
      created_at: '2025-07-05T00:00:00Z',
      updated_at: '2025-07-05T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/switzerland.png',
      translations: [
        {
          language: 'pt',
          description:
            'O visto de trabalho suíço L Permit demora entre 2 e 3 meses, segundo Migration Switzerland.',
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
          processing_time: '2–3 months',
          investment_required:
            'Lump-sum taxation route: minimum taxable base of CHF 435,000, higher in some cantons',
          language_requirement:
            'German, French or Italian depending on the canton',
        },
        {
          language: 'en',
          description:
            'The Swiss L Permit work visa takes between 2 and 3 months, according to Migration Switzerland.',
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
          processing_time: '2–3 months',
          investment_required:
            'Lump-sum taxation route: minimum taxable base of CHF 435,000, higher in some cantons',
          language_requirement:
            'German, French or Italian depending on the canton',
        },
        {
          language: 'es',
          description:
            'La visa de trabajo suiza L Permit tarda entre 2 y 3 meses, según Migration Switzerland.',
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
          processing_time: '2–3 months',
          investment_required:
            'Lump-sum taxation route: minimum taxable base of CHF 435,000, higher in some cantons',
          language_requirement:
            'German, French or Italian depending on the canton',
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
      job_market: 'Strong',
      popular_cities: [
        'New York',
        'San Francisco',
        'Los Angeles',
      ],
      created_at: '2025-07-06T00:00:00Z',
      updated_at: '2025-07-06T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/united_states.png',
      translations: [
        {
          language: 'pt',
          description:
            'O visto EB‑5 exige investimento de US$ 800 000 (TEA) ou US$ 1.050 000, além de taxas. O H‑1B tem tarifas que variam e o E‑2 geralmente exige investimento de pelo menos US$ 100 000. Fonte: USCIS e Wikipedia EB‑5.',
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
          processing_time: '6–24 months, varying heavily by visa category',
          investment_required:
            'EB-5: US$800,000 in a targeted employment area, or US$1,050,000 otherwise',
          language_requirement: 'English (no formal test for most categories)',
        },
        {
          language: 'en',
          description:
            'The EB-5 visa requires an investment of US$800,000 (TEA) or US$1,050,000, plus fees. The H-1B has varying fees and the E-2 generally requires an investment of at least US$100,000. Source: USCIS and Wikipedia EB-5.',
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
          processing_time: '6–24 months, varying heavily by visa category',
          investment_required:
            'EB-5: US$800,000 in a targeted employment area, or US$1,050,000 otherwise',
          language_requirement: 'English (no formal test for most categories)',
        },
        {
          language: 'es',
          description:
            'La visa EB-5 requiere una inversión de US$800,000 (TEA) o US$1,050,000, además de tasas. La H-1B tiene tarifas variables y la E-2 generalmente requiere una inversión de al menos US$100,000. Fuente: USCIS y Wikipedia EB-5.',
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
          processing_time: '6–24 months, varying heavily by visa category',
          investment_required:
            'EB-5: US$800,000 in a targeted employment area, or US$1,050,000 otherwise',
          language_requirement: 'English (no formal test for most categories)',
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
      job_market: 'Strong',
      popular_cities: [
        'Singapore',
      ],
      created_at: '2025-07-06T00:00:00Z',
      updated_at: '2025-07-06T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/singapore.png',
      translations: [
        {
          language: 'pt',
          description:
            'O Employment Pass é processado em cerca de 10 dias úteis ou até 8 semanas para empresas estrangeiras, com serviços custando ~US$4 900 (€4k) e taxas para issuance de SGD225‑255 (€143‑€163).',
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
          processing_time: '10–40 business days',
          investment_required:
            'Employment Pass: salary above the statutory minimum; Global Investor Programme: from SGD 10 million',
          language_requirement: 'English (official working language)',
        },
        {
          language: 'en',
          description:
            'The Employment Pass is processed in about 10 business days or up to 8 weeks for foreign companies, with services costing around US$4,900 (€4k) and issuance fees of SGD225-255 (€143-€163).',
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
          processing_time: '10–40 business days',
          investment_required:
            'Employment Pass: salary above the statutory minimum; Global Investor Programme: from SGD 10 million',
          language_requirement: 'English (official working language)',
        },
        {
          language: 'es',
          description:
            'El Employment Pass se procesa en unos 10 días hábiles o hasta 8 semanas para empresas extranjeras, con servicios que cuestan alrededor de US$4,900 (€4k) y tasas de emisión de SGD225-255 (€143-€163).',
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
          processing_time: '10–40 business days',
          investment_required:
            'Employment Pass: salary above the statutory minimum; Global Investor Programme: from SGD 10 million',
          language_requirement: 'English (official working language)',
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
      job_market: 'Strong',
      popular_cities: [
        'Dubai',
        'Abu Dhabi',
        'Sharjah',
      ],
      created_at: '2025-07-06T00:00:00Z',
      updated_at: '2025-07-06T00:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/united_arab_emirates.png',
      translations: [
        {
          language: 'pt',
          description:
            'O visto de trabalho (2 anos) custa entre AED 5 000‑10 000 (~US$ 1 360‑2 720) mais Emirates ID e saúde. O Green/Investor visa exige solvência ou investimento de AED 10 milhões (~US$ 2,720,000).',
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
          processing_time: '2–8 weeks',
          investment_required:
            'Employment visa fees from ≈US$1,360; Golden Visa investment routes from AED 2 million',
          language_requirement: 'Arabic official; English widely used at work',
        },
        {
          language: 'en',
          description:
            'The 2-year work visa costs between AED 5,000-10,000 (~US$1,360-2,720) plus Emirates ID and health. The Green/Investor visa requires solvency or an investment of AED 10 million (~US$2,720,000).',
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
          processing_time: '2–8 weeks',
          investment_required:
            'Employment visa fees from ≈US$1,360; Golden Visa investment routes from AED 2 million',
          language_requirement: 'Arabic official; English widely used at work',
        },
        {
          language: 'es',
          description:
            'La visa de trabajo de 2 años cuesta entre AED 5,000-10,000 (~US$1,360-2,720) más Emirates ID y salud. La Green/Investor visa exige solvencia o una inversión de AED 10 millones (~US$2,720,000).',
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
          processing_time: '2–8 weeks',
          investment_required:
            'Employment visa fees from ≈US$1,360; Golden Visa investment routes from AED 2 million',
          language_requirement: 'Arabic official; English widely used at work',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Tourist / Visit Visa',
          description:
            'Visas for tourism or visiting the UAE, including single-entry, multiple-entry, 30-day and 60-day stays.',
          source:
            'https://u.ae/en/information-and-services/visa-and-emirates-id',
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
      job_market: 'Moderate',
      popular_cities: [
        'Seoul',
        'Busan',
        'Incheon',
      ],
      created_at: '2025-07-06T12:00:00Z',
      updated_at: '2025-07-06T12:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/south_korea.png',
      translations: [
        {
          language: 'pt',
          description:
            'As emissões de vistos de trabalho e corporativos levam de 2 a 4 semanas; investimento mínimo de $45 000 (D‑8) a $90 000 para status F‑2 residencial por investimento.',
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
          processing_time: '2–4 weeks',
          investment_required:
            'D-8 corporate investment from ≈KRW 100 million; F-2 routes vary by programme',
          language_requirement:
            'Korean (TOPIK levels required for some residence categories)',
        },
        {
          language: 'en',
          description:
            'Work and corporate visa issuances take 2 to 4 weeks; minimum investment of $45,000 (D-8) to $90,000 for F-2 residency by investment status.',
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
          processing_time: '2–4 weeks',
          investment_required:
            'D-8 corporate investment from ≈KRW 100 million; F-2 routes vary by programme',
          language_requirement:
            'Korean (TOPIK levels required for some residence categories)',
        },
        {
          language: 'es',
          description:
            'La emisión de visados de trabajo y corporativos tarda de 2 a 4 semanas; inversión mínima de $45,000 (D-8) a $90,000 para el estatus de residencia F-2 por inversión.',
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
          processing_time: '2–4 weeks',
          investment_required:
            'D-8 corporate investment from ≈KRW 100 million; F-2 routes vary by programme',
          language_requirement:
            'Korean (TOPIK levels required for some residence categories)',
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
      job_market: 'Strong',
      popular_cities: [
        'Amsterdam',
        'Rotterdam',
        'The Hague',
      ],
      created_at: '2025-07-06T12:00:00Z',
      updated_at: '2025-07-06T12:00:00Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/netherlands.png',
      translations: [
        {
          language: 'pt',
          description:
            'A Permissão para Migrantes Altamente Qualificados custa €405, com processo de 2–4 semanas para empregadores reconhecidos, conforme IND.',
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
          processing_time:
            '2–4 weeks under the fast-track scheme for recognised sponsors',
          investment_required:
            'Fees from €405; highly skilled migrant salary from €5,942/month, or €4,357 under 30',
          language_requirement:
            'Dutch (English widely spoken and accepted at work)',
        },
        {
          language: 'en',
          description:
            'The Highly Skilled Migrant Permit costs €405, with a 2–4 week process for recognized employers, according to IND.',
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
          processing_time:
            '2–4 weeks under the fast-track scheme for recognised sponsors',
          investment_required:
            'Fees from €405; highly skilled migrant salary from €5,942/month, or €4,357 under 30',
          language_requirement:
            'Dutch (English widely spoken and accepted at work)',
        },
        {
          language: 'es',
          description:
            'El Permiso para Migrantes Altamente Cualificados cuesta €405, con un proceso de 2–4 semanas para empleadores reconocidos, según IND.',
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
          processing_time:
            '2–4 weeks under the fast-track scheme for recognised sponsors',
          investment_required:
            'Fees from €405; highly skilled migrant salary from €5,942/month, or €4,357 under 30',
          language_requirement:
            'Dutch (English widely spoken and accepted at work)',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Short-Stay Schengen Visa (up to 90 days)',
          description:
            'Visa for stays up to 90 days in the Netherlands (and Schengen area) for tourism, business, visiting family.',
          source:
            'https://www.government.nl/topics/immigration-to-the-netherlands',
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
          source: 'https://ind.nl/en',
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
      job_market: 'Moderate',
      popular_cities: [
        'Rome',
        'Milan',
        'Florence',
      ],
      created_at: '2025-07-05T23:06:42.460912Z',
      updated_at: '2025-07-05T23:06:42.460912Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/italy.png',
      translations: [
        {
          language: 'pt',
          description:
            'A Itália oferece o visto de residência eletiva para quem possui renda passiva. O processo pode levar até 4 meses, com comprovação de fundos de ao menos €31 mil por ano.',
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
          processing_time: '2–4 months',
          investment_required:
            'Elective residency: ≈€31,000/year in passive income; investor visa from €250,000',
          language_requirement: 'Italian (basic; B1 for citizenship)',
        },
        {
          language: 'en',
          description:
            'Italy offers the elective residence visa for those with passive income. The process can take up to 4 months, requiring proof of funds of at least €31,000 per year.',
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
          processing_time: '2–4 months',
          investment_required:
            'Elective residency: ≈€31,000/year in passive income; investor visa from €250,000',
          language_requirement: 'Italian (basic; B1 for citizenship)',
        },
        {
          language: 'es',
          description:
            'Italia ofrece la visa de residencia electiva para quienes tienen ingresos pasivos. El proceso puede tardar hasta 4 meses, requiriendo comprobante de fondos de al menos €31,000 por año.',
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
          processing_time: '2–4 months',
          investment_required:
            'Elective residency: ≈€31,000/year in passive income; investor visa from €250,000',
          language_requirement: 'Italian (basic; B1 for citizenship)',
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
      job_market: 'Weak',
      popular_cities: [
        'Buenos Aires',
        'Córdoba',
        'Rosario',
      ],
      created_at: '2025-07-05T23:06:42.460912Z',
      updated_at: '2025-07-05T23:06:42.460912Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/argentina.png',
      translations: [
        {
          language: 'pt',
          description:
            'A Argentina oferece vistos temporários e permanentes de forma acessível, sendo possível aplicar com comprovação de renda modesta ou vínculo com empresas locais.',
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
          processing_time: '1–2 months',
          investment_required:
            'Application fees from ≈US$1,500; investor routes from ≈US$10,000',
          language_requirement: 'Spanish (basic)',
        },
        {
          language: 'en',
          description:
            'Argentina offers temporary and permanent visas in an accessible way, and it is possible to apply with modest income proof or ties to local companies.',
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
          processing_time: '1–2 months',
          investment_required:
            'Application fees from ≈US$1,500; investor routes from ≈US$10,000',
          language_requirement: 'Spanish (basic)',
        },
        {
          language: 'es',
          description:
            'Argentina ofrece visados temporales y permanentes de forma accesible, siendo posible aplicar con comprobante de ingresos modestos o vínculo con empresas locales.',
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
          processing_time: '1–2 months',
          investment_required:
            'Application fees from ≈US$1,500; investor routes from ≈US$10,000',
          language_requirement: 'Spanish (basic)',
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
          source: 'https://www.argentina.gob.ar/interior/migraciones',
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
      job_market: 'Moderate',
      popular_cities: [
        'Santiago',
        'Valparaíso',
        'Concepción',
      ],
      created_at: '2025-07-05T23:06:42.460912Z',
      updated_at: '2025-07-05T23:06:42.460912Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/chile.png',
      translations: [
        {
          language: 'pt',
          description:
            'O Chile permite a residência temporária para trabalho e investimento. Os valores exigidos começam em torno de $5.000 USD, com análise caso a caso.',
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
          processing_time: '2–3 months',
          investment_required:
            'Application fees plus proof of income; investment routes from ≈US$25,000',
          language_requirement: 'Spanish (basic)',
        },
        {
          language: 'en',
          description:
            'Chile allows temporary residence for work and investment. The required amounts start at around $5,000 USD, with case-by-case analysis.',
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
          processing_time: '2–3 months',
          investment_required:
            'Application fees plus proof of income; investment routes from ≈US$25,000',
          language_requirement: 'Spanish (basic)',
        },
        {
          language: 'es',
          description:
            'Chile permite la residencia temporal para trabajo e inversión. Los valores exigidos comienzan en torno a $5,000 USD, con análisis caso a caso.',
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
          processing_time: '2–3 months',
          investment_required:
            'Application fees plus proof of income; investment routes from ≈US$25,000',
          language_requirement: 'Spanish (basic)',
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
      job_market: 'Strong',
      popular_cities: [
        'Vienna',
        'Salzburg',
        'Graz',
      ],
      created_at: '2025-07-05T23:06:42.460912Z',
      updated_at: '2025-07-05T23:06:42.460912Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/austria.png',
      translations: [
        {
          language: 'pt',
          description:
            'A Áustria exige comprovação financeira, seguro saúde e contratos formais. A Red-White-Red Card é ideal para profissionais qualificados e investidores.',
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
          processing_time: '2–4 months',
          investment_required:
            'Red-White-Red Card: 70 of 100 points; Other Key Workers need €3,465/month gross',
          language_requirement: 'German (A1 before arrival for most routes)',
        },
        {
          language: 'en',
          description:
            'Austria requires financial proof, health insurance, and formal contracts. The Red-White-Red Card is ideal for qualified professionals and investors.',
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
          processing_time: '2–4 months',
          investment_required:
            'Red-White-Red Card: 70 of 100 points; Other Key Workers need €3,465/month gross',
          language_requirement: 'German (A1 before arrival for most routes)',
        },
        {
          language: 'es',
          description:
            'Austria exige comprobante financiero, seguro de salud y contratos formales. La Red-White-Red Card es ideal para profesionales calificados e inversores.',
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
          processing_time: '2–4 months',
          investment_required:
            'Red-White-Red Card: 70 of 100 points; Other Key Workers need €3,465/month gross',
          language_requirement: 'German (A1 before arrival for most routes)',
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
      job_market: 'Moderate',
      popular_cities: [
        'Warsaw',
        'Krakow',
        'Wroclaw',
      ],
      created_at: '2025-07-05T23:06:42.460912Z',
      updated_at: '2025-07-05T23:06:42.460912Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/poland.png',
      translations: [
        {
          language: 'pt',
          description:
            'A Polônia é uma das portas de entrada mais acessíveis na Europa. Os vistos nacionais D permitem moradia e trabalho com requisitos financeiros moderados.',
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
          processing_time: '1–3 months',
          investment_required:
            'Application fees plus proof of funds, from ≈US$3,000 depending on the route',
          language_requirement:
            'Polish (basic; required for permanent residence)',
        },
        {
          language: 'en',
          description:
            'Poland is one of the most accessible gateways in Europe. National D visas allow residence and work with moderate financial requirements.',
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
          processing_time: '1–3 months',
          investment_required:
            'Application fees plus proof of funds, from ≈US$3,000 depending on the route',
          language_requirement:
            'Polish (basic; required for permanent residence)',
        },
        {
          language: 'es',
          description:
            'Polonia es una de las puertas de entrada más accesibles de Europa. Las visas nacionales D permiten residencia y trabajo con requisitos financieros moderados.',
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
          processing_time: '1–3 months',
          investment_required:
            'Application fees plus proof of funds, from ≈US$3,000 depending on the route',
          language_requirement:
            'Polish (basic; required for permanent residence)',
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
      job_market: 'Moderate',
      popular_cities: [
        'Helsinki',
        'Tampere',
        'Turku',
      ],
      created_at: '2025-07-05T23:06:42.460912Z',
      updated_at: '2025-07-05T23:06:42.460912Z',
      background_image:
        'https://pub-ad0067402a7e426380c50f5f62ee7fad.r2.dev/finlland.png',
      translations: [
        {
          language: 'pt',
          description:
            'A Finlândia exige comprovação de fundos para estudantes e empreendedores. O Startup Permit é ideal para empresas de base tecnológica e exige plano de negócio validado.',
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
          processing_time: '2–3 months',
          investment_required:
            'Application fees plus proof of funds (≈€6,720/year for students)',
          language_requirement:
            'Finnish or Swedish (English accepted in many workplaces)',
        },
        {
          language: 'en',
          description:
            'Finland requires proof of funds for students and entrepreneurs. The Startup Permit is ideal for technology-based companies and requires a validated business plan.',
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
          processing_time: '2–3 months',
          investment_required:
            'Application fees plus proof of funds (≈€6,720/year for students)',
          language_requirement:
            'Finnish or Swedish (English accepted in many workplaces)',
        },
        {
          language: 'es',
          description:
            'Finlandia exige comprobante de fondos para estudiantes y emprendedores. El Startup Permit es ideal para empresas de base tecnológica y exige un plan de negocios validado.',
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
          processing_time: '2–3 months',
          investment_required:
            'Application fees plus proof of funds (≈€6,720/year for students)',
          language_requirement:
            'Finnish or Swedish (English accepted in many workplaces)',
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
      job_market: 'Moderate',
      popular_cities: [
        'Lisboa',
        'Porto',
        'Braga',
        'Faro',
      ],
      created_at: '2026-08-04T00:00:00Z',
      updated_at: '2026-08-04T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'Portugal oferece vistos de residência D1 a D8, incluindo o D7 para renda passiva e o D8 para nômades digitais, com caminho para cidadania em 5 anos.',
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
          processing_time: '60–90 days',
          investment_required:
            'D7: €920/month; D8: €3,680/month — both indexed to the national minimum wage',
          language_requirement: 'Portuguese (A2 required for citizenship)',
        },
        {
          language: 'en',
          description:
            'Portugal offers D1 to D8 residence visas, including the D7 for passive income and the D8 for digital nomads, with a path to citizenship after 5 years.',
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
          processing_time: '60–90 days',
          investment_required:
            'D7: €920/month; D8: €3,680/month — both indexed to the national minimum wage',
          language_requirement: 'Portuguese (A2 required for citizenship)',
        },
        {
          language: 'es',
          description:
            'Portugal ofrece visados de residencia D1 a D8, incluido el D7 para rentas pasivas y el D8 para nómadas digitales, con vía a la ciudadanía a los 5 años.',
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
          processing_time: '60–90 days',
          investment_required:
            'D7: €920/month; D8: €3,680/month — both indexed to the national minimum wage',
          language_requirement: 'Portuguese (A2 required for citizenship)',
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
      job_market: 'Moderate',
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
      translations: [
        {
          language: 'pt',
          description:
            'O México oferece residência temporária e permanente com requisitos de renda acessíveis, sendo um dos principais destinos de nômades digitais das Américas.',
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
          processing_time: '10–30 days',
          investment_required:
            'Temporary residency: US$4,200/month in income or US$70,000 in savings, UMA-indexed',
          language_requirement: 'Spanish (basic)',
        },
        {
          language: 'en',
          description:
            'Mexico offers temporary and permanent residency with accessible income requirements, and is one of the main digital nomad destinations in the Americas.',
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
          processing_time: '10–30 days',
          investment_required:
            'Temporary residency: US$4,200/month in income or US$70,000 in savings, UMA-indexed',
          language_requirement: 'Spanish (basic)',
        },
        {
          language: 'es',
          description:
            'México ofrece residencia temporal y permanente con requisitos de ingresos accesibles, y es uno de los principales destinos de nómadas digitales de América.',
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
          processing_time: '10–30 days',
          investment_required:
            'Temporary residency: US$4,200/month in income or US$70,000 in savings, UMA-indexed',
          language_requirement: 'Spanish (basic)',
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
      job_market: 'Strong',
      popular_cities: [
        'Oslo',
        'Bergen',
        'Trondheim',
        'Stavanger',
      ],
      created_at: '2026-08-04T00:00:00Z',
      updated_at: '2026-08-04T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'A Noruega concede autorizações de residência para trabalhadores qualificados, estudantes e reunificação familiar, com salários altos e forte proteção social.',
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
          processing_time: '1–4 months',
          investment_required:
            'Skilled worker: salary matching Norwegian collective agreement levels',
          language_requirement: 'Norwegian (B1 for permanent residence)',
        },
        {
          language: 'en',
          description:
            'Norway grants residence permits for skilled workers, students and family reunification, with high salaries and strong social protection.',
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
          processing_time: '1–4 months',
          investment_required:
            'Skilled worker: salary matching Norwegian collective agreement levels',
          language_requirement: 'Norwegian (B1 for permanent residence)',
        },
        {
          language: 'es',
          description:
            'Noruega concede permisos de residencia para trabajadores cualificados, estudiantes y reagrupación familiar, con salarios altos y fuerte protección social.',
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
          processing_time: '1–4 months',
          investment_required:
            'Skilled worker: salary matching Norwegian collective agreement levels',
          language_requirement: 'Norwegian (B1 for permanent residence)',
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
      job_market: 'Strong',
      popular_cities: [
        'Copenhagen',
        'Aarhus',
        'Odense',
        'Aalborg',
      ],
      created_at: '2026-08-04T00:00:00Z',
      updated_at: '2026-08-04T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'A Dinamarca concede residência principalmente por vias de trabalho qualificado, como o Pay Limit Scheme e a Positive List, além de estudo e reunificação familiar.',
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
          processing_time: '1–3 months',
          investment_required:
            'Pay Limit Scheme: annual salary above the statutory threshold set each year',
          language_requirement: 'Danish (required for permanent residence)',
        },
        {
          language: 'en',
          description:
            'Denmark grants residence mainly through skilled work routes such as the Pay Limit Scheme and the Positive List, alongside study and family reunification.',
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
          processing_time: '1–3 months',
          investment_required:
            'Pay Limit Scheme: annual salary above the statutory threshold set each year',
          language_requirement: 'Danish (required for permanent residence)',
        },
        {
          language: 'es',
          description:
            'Dinamarca concede residencia principalmente por vías de trabajo cualificado, como el Pay Limit Scheme y la Positive List, además de estudio y reagrupación familiar.',
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
          processing_time: '1–3 months',
          investment_required:
            'Pay Limit Scheme: annual salary above the statutory threshold set each year',
          language_requirement: 'Danish (required for permanent residence)',
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
      job_market: 'Strong',
      popular_cities: [
        'Brussels',
        'Antwerp',
        'Ghent',
        'Leuven',
      ],
      created_at: '2026-08-04T00:00:00Z',
      updated_at: '2026-08-04T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'A Bélgica concentra as instituições da UE e concede residência principalmente pelo Single Permit, que reúne autorização de trabalho e residência num só pedido.',
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
          processing_time: '2–4 months',
          investment_required:
            'Single Permit: employment contract meeting the salary threshold of the relevant region',
          language_requirement:
            'Dutch, French or German depending on the region',
        },
        {
          language: 'en',
          description:
            'Belgium hosts the main EU institutions and grants residence mainly through the Single Permit, which combines work and residence authorisation in one application.',
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
          processing_time: '2–4 months',
          investment_required:
            'Single Permit: employment contract meeting the salary threshold of the relevant region',
          language_requirement:
            'Dutch, French or German depending on the region',
        },
        {
          language: 'es',
          description:
            'Bélgica concentra las instituciones de la UE y concede residencia principalmente mediante el Single Permit, que reúne autorización de trabajo y residencia en una sola solicitud.',
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
          processing_time: '2–4 months',
          investment_required:
            'Single Permit: employment contract meeting the salary threshold of the relevant region',
          language_requirement:
            'Dutch, French or German depending on the region',
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
      job_market: 'Strong',
      popular_cities: [
        'Prague',
        'Brno',
        'Ostrava',
        'Plzeň',
      ],
      created_at: '2026-08-04T00:00:00Z',
      updated_at: '2026-08-04T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'A Chéquia oferece o Employee Card para trabalho, o Cartão Azul da UE para qualificados e o visto de longa duração para autônomos, com custo de vida baixo para a UE.',
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
          processing_time: '60–90 days',
          investment_required:
            'Proof of funds of roughly CZK 110,000 for long-term stay applications',
          language_requirement: 'Czech (A2 for permanent residence)',
        },
        {
          language: 'en',
          description:
            'Czechia offers the Employee Card for work, the EU Blue Card for highly qualified professionals and a long-term visa for freelancers, with a low cost of living for the EU.',
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
          processing_time: '60–90 days',
          investment_required:
            'Proof of funds of roughly CZK 110,000 for long-term stay applications',
          language_requirement: 'Czech (A2 for permanent residence)',
        },
        {
          language: 'es',
          description:
            'Chequia ofrece la Employee Card para trabajo, la Tarjeta Azul de la UE para cualificados y el visado de larga duración para autónomos, con bajo coste de vida para la UE.',
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
          processing_time: '60–90 days',
          investment_required:
            'Proof of funds of roughly CZK 110,000 for long-term stay applications',
          language_requirement: 'Czech (A2 for permanent residence)',
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
      job_market: 'Weak',
      popular_cities: [
        'Athens',
        'Thessaloniki',
        'Patras',
        'Heraklion',
      ],
      created_at: '2026-08-04T00:00:00Z',
      updated_at: '2026-08-04T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'A Grécia tem um dos Golden Visas mais acessíveis da UE, além de vistos para nômades digitais e pessoas financeiramente independentes.',
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
          processing_time: '2–6 months',
          investment_required:
            'Golden Visa: €800,000 in Attica, Thessaloniki and the larger islands; €400,000 elsewhere',
          language_requirement: 'Greek (basic; B1 for citizenship)',
        },
        {
          language: 'en',
          description:
            'Greece runs one of the more accessible Golden Visa programmes in the EU, alongside visas for digital nomads and financially independent people.',
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
          processing_time: '2–6 months',
          investment_required:
            'Golden Visa: €800,000 in Attica, Thessaloniki and the larger islands; €400,000 elsewhere',
          language_requirement: 'Greek (basic; B1 for citizenship)',
        },
        {
          language: 'es',
          description:
            'Grecia tiene uno de los Golden Visa más accesibles de la UE, además de visados para nómadas digitales y personas económicamente independientes.',
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
          processing_time: '2–6 months',
          investment_required:
            'Golden Visa: €800,000 in Attica, Thessaloniki and the larger islands; €400,000 elsewhere',
          language_requirement: 'Greek (basic; B1 for citizenship)',
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
      job_market: 'Moderate',
      popular_cities: [
        'Bangkok',
        'Chiang Mai',
        'Phuket',
        'Pattaya',
      ],
      created_at: '2026-08-04T00:00:00Z',
      updated_at: '2026-08-04T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'A Tailândia oferece o visto LTR de até 10 anos, o DTV para trabalho remoto e o Privilege Visa por adesão, mas a residência permanente é bastante restrita.',
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
          processing_time: '15–60 days',
          investment_required:
            'LTR: US$80,000/year in passive income; Privilege Visa from THB 650,000',
          language_requirement: 'Thai (not required for most visa routes)',
        },
        {
          language: 'en',
          description:
            'Thailand offers the LTR visa valid for up to 10 years, the DTV for remote work and the membership-based Privilege Visa, though permanent residence remains highly restricted.',
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
          processing_time: '15–60 days',
          investment_required:
            'LTR: US$80,000/year in passive income; Privilege Visa from THB 650,000',
          language_requirement: 'Thai (not required for most visa routes)',
        },
        {
          language: 'es',
          description:
            'Tailandia ofrece el visado LTR de hasta 10 años, el DTV para trabajo remoto y el Privilege Visa por membresía, aunque la residencia permanente es muy restringida.',
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
          processing_time: '15–60 days',
          investment_required:
            'LTR: US$80,000/year in passive income; Privilege Visa from THB 650,000',
          language_requirement: 'Thai (not required for most visa routes)',
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
      job_market: 'Moderate',
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
      translations: [
        {
          language: 'pt',
          description:
            'O Brasil oferece residência facilitada para nacionais do Mercosul, além do visto de nômade digital VITEM XIV e naturalização possível após quatro anos.',
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
          processing_time: '30–90 days',
          investment_required:
            'Digital nomad: US$1,500/month in income or US$18,000 in available funds',
          language_requirement: 'Portuguese (basic)',
        },
        {
          language: 'en',
          description:
            'Brazil offers simplified residence for Mercosur nationals, the VITEM XIV digital nomad visa, and naturalisation after four years of residence.',
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
          processing_time: '30–90 days',
          investment_required:
            'Digital nomad: US$1,500/month in income or US$18,000 in available funds',
          language_requirement: 'Portuguese (basic)',
        },
        {
          language: 'es',
          description:
            'Brasil ofrece residencia simplificada para nacionales del Mercosur, el visado de nómada digital VITEM XIV y naturalización tras cuatro años de residencia.',
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
          processing_time: '30–90 days',
          investment_required:
            'Digital nomad: US$1,500/month in income or US$18,000 in available funds',
          language_requirement: 'Portuguese (basic)',
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
          source:
            'https://www.gov.br/mj/pt-br/assuntos/seus-direitos/migracoes',
        },
        {
          category: 'Mercosur Residence',
          description:
            'Residence granted to nationals of Mercosur member and associated states under the regional residence agreement.',
          source:
            'https://www.gov.br/mj/pt-br/assuntos/seus-direitos/migracoes',
        },
        {
          category: 'Permanent Residence',
          description:
            'Indefinite residence granted through family ties, investment, retirement or conversion from temporary residence.',
          source:
            'https://www.gov.br/mj/pt-br/assuntos/seus-direitos/migracoes',
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
      job_market: 'Moderate',
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
      translations: [
        {
          language: 'pt',
          description:
            'O Uruguai concede residência permanente direta a nacionais do Mercosul e residência por renda comprovada, com forte estabilidade institucional.',
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
          processing_time: '3–8 months',
          investment_required:
            'Proof of stable monthly income of roughly US$1,500, or qualifying property investment',
          language_requirement: 'Spanish (basic)',
        },
        {
          language: 'en',
          description:
            'Uruguay grants direct permanent residence to Mercosur nationals and residence based on proven income, backed by strong institutional stability.',
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
          processing_time: '3–8 months',
          investment_required:
            'Proof of stable monthly income of roughly US$1,500, or qualifying property investment',
          language_requirement: 'Spanish (basic)',
        },
        {
          language: 'es',
          description:
            'Uruguay concede residencia permanente directa a nacionales del Mercosur y residencia por ingresos acreditados, con fuerte estabilidad institucional.',
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
          processing_time: '3–8 months',
          investment_required:
            'Proof of stable monthly income of roughly US$1,500, or qualifying property investment',
          language_requirement: 'Spanish (basic)',
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
      job_market: 'Moderate',
      popular_cities: [
        'Panama City',
        'Boquete',
        'Coronado',
        'David',
      ],
      created_at: '2026-08-04T00:00:00Z',
      updated_at: '2026-08-04T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'O Panamá oferece o Friendly Nations Visa, o programa Pensionado para aposentados e tributação territorial, com o dólar americano como moeda oficial.',
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
          processing_time: '3–6 months',
          investment_required:
            'Friendly Nations: US$5,000 bank deposit plus an economic tie; Qualified Investor: from US$300,000',
          language_requirement: 'Spanish (basic)',
        },
        {
          language: 'en',
          description:
            'Panama offers the Friendly Nations Visa, the Pensionado programme for retirees and territorial taxation, with the US dollar as legal tender.',
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
          processing_time: '3–6 months',
          investment_required:
            'Friendly Nations: US$5,000 bank deposit plus an economic tie; Qualified Investor: from US$300,000',
          language_requirement: 'Spanish (basic)',
        },
        {
          language: 'es',
          description:
            'Panamá ofrece el Friendly Nations Visa, el programa Pensionado para jubilados y tributación territorial, con el dólar estadounidense como moneda de curso legal.',
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
          processing_time: '3–6 months',
          investment_required:
            'Friendly Nations: US$5,000 bank deposit plus an economic tie; Qualified Investor: from US$300,000',
          language_requirement: 'Spanish (basic)',
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
      job_market: 'Weak',
      popular_cities: [
        'San José',
        'Escazú',
        'Tamarindo',
        'Atenas',
      ],
      created_at: '2026-08-04T00:00:00Z',
      updated_at: '2026-08-04T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'A Costa Rica oferece as vias Rentista, Pensionado e Inversionista, além de visto específico para nômades digitais, com forte estabilidade política.',
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
          processing_time: '3–9 months',
          investment_required:
            'Rentista: US$2,500/month for two years; Inversionista: from US$150,000',
          language_requirement: 'Spanish (basic)',
        },
        {
          language: 'en',
          description:
            'Costa Rica offers the Rentista, Pensionado and Inversionista routes, plus a dedicated digital nomad visa, backed by long-standing political stability.',
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
          processing_time: '3–9 months',
          investment_required:
            'Rentista: US$2,500/month for two years; Inversionista: from US$150,000',
          language_requirement: 'Spanish (basic)',
        },
        {
          language: 'es',
          description:
            'Costa Rica ofrece las vías Rentista, Pensionado e Inversionista, además de un visado específico para nómadas digitales, con fuerte estabilidad política.',
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
          processing_time: '3–9 months',
          investment_required:
            'Rentista: US$2,500/month for two years; Inversionista: from US$150,000',
          language_requirement: 'Spanish (basic)',
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
    {
      name: 'Malta',
      flag: '🇲🇹',
      region: 'Europe',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Malta Permanent Residence Programme (MPRP)',
        'Nomad Residence Permit',
        'Key Employee Initiative',
        'Student Visa',
      ],
      job_market: 'Moderate',
      popular_cities: [
        'Valletta',
        'Sliema',
        'St. Julian\'s',
        'Gozo',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'Malta oferece o programa de residência permanente MPRP e o Nomad Residence Permit, com o inglês como língua co-oficial e acesso à UE e ao Schengen.',
          benefits: [
            'English is an official language',
            'EU and Schengen member state',
            'Mediterranean climate year round',
            'Strong iGaming and financial services sectors',
          ],
          challenges: [
            'Very small domestic market',
            'High and rising housing costs',
            'Heavy traffic and population density',
          ],
          processing_time:
            '4–6 months for the MPRP; 30–40 days for the Nomad Residence Permit',
          investment_required:
            'MPRP: €99,000 in government payments plus property from €375,000 to buy or €14,000/year to rent',
          language_requirement: 'English (co-official language)',
        },
        {
          language: 'en',
          description:
            'Malta offers the MPRP permanent residence programme and the Nomad Residence Permit, with English as a co-official language and EU and Schengen access.',
          benefits: [
            'English is an official language',
            'EU and Schengen member state',
            'Mediterranean climate year round',
            'Strong iGaming and financial services sectors',
          ],
          challenges: [
            'Very small domestic market',
            'High and rising housing costs',
            'Heavy traffic and population density',
          ],
          processing_time:
            '4–6 months for the MPRP; 30–40 days for the Nomad Residence Permit',
          investment_required:
            'MPRP: €99,000 in government payments plus property from €375,000 to buy or €14,000/year to rent',
          language_requirement: 'English (co-official language)',
        },
        {
          language: 'es',
          description:
            'Malta ofrece el programa de residencia permanente MPRP y el Nomad Residence Permit, con el inglés como lengua cooficial y acceso a la UE y a Schengen.',
          benefits: [
            'English is an official language',
            'EU and Schengen member state',
            'Mediterranean climate year round',
            'Strong iGaming and financial services sectors',
          ],
          challenges: [
            'Very small domestic market',
            'High and rising housing costs',
            'Heavy traffic and population density',
          ],
          processing_time:
            '4–6 months for the MPRP; 30–40 days for the Nomad Residence Permit',
          investment_required:
            'MPRP: €99,000 in government payments plus property from €375,000 to buy or €14,000/year to rent',
          language_requirement: 'English (co-official language)',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Short-Stay Visa (Schengen Type C)',
          description:
            'Visa for stays of up to 90 days in any 180-day period for tourism or business.',
          source: 'https://identita.gov.mt/',
        },
        {
          category: 'National Long-Stay Visa (Type D)',
          description:
            'Visa for stays over 90 days for work, study or family reasons.',
          source: 'https://identita.gov.mt/',
        },
        {
          category: 'Malta Permanent Residence Programme (MPRP)',
          description:
            'Permanent residence granted through a government contribution and a qualifying property lease or purchase.',
          source: 'https://residencymalta.gov.mt/',
        },
        {
          category: 'Nomad Residence Permit',
          description:
            'One-year renewable permit for remote workers employed or contracted outside Malta.',
          source: 'https://residencymalta.gov.mt/',
        },
      ],
    },
    {
      name: 'Croatia',
      flag: '🇭🇷',
      region: 'Europe',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Digital Nomad Residence Permit',
        'Work Permit',
        'Student Residence',
        'Family Reunification',
      ],
      job_market: 'Moderate',
      popular_cities: [
        'Zagreb',
        'Split',
        'Dubrovnik',
        'Rijeka',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'A Croácia oferece autorização de residência para nômades digitais com isenção de imposto sobre renda estrangeira, além das vias de trabalho e estudo.',
          benefits: [
            'Digital nomad permit exempts foreign income from local tax',
            'EU member and part of the Schengen area since 2023',
            'Extensive Adriatic coastline',
            'Moderate cost of living for the EU',
          ],
          challenges: [
            'Croatian is demanding to learn',
            'Limited local labour market',
            'Economy heavily dependent on seasonal tourism',
          ],
          processing_time: '30–60 days',
          investment_required:
            'Digital nomad: €3,622.50/month, or €43,470 in savings for a 12-month stay',
          language_requirement: 'Croatian (required for permanent residence)',
        },
        {
          language: 'en',
          description:
            'Croatia offers a digital nomad residence permit that exempts foreign income from local tax, alongside the usual work and study routes.',
          benefits: [
            'Digital nomad permit exempts foreign income from local tax',
            'EU member and part of the Schengen area since 2023',
            'Extensive Adriatic coastline',
            'Moderate cost of living for the EU',
          ],
          challenges: [
            'Croatian is demanding to learn',
            'Limited local labour market',
            'Economy heavily dependent on seasonal tourism',
          ],
          processing_time: '30–60 days',
          investment_required:
            'Digital nomad: €3,622.50/month, or €43,470 in savings for a 12-month stay',
          language_requirement: 'Croatian (required for permanent residence)',
        },
        {
          language: 'es',
          description:
            'Croacia ofrece un permiso de residencia para nómadas digitales que exime del impuesto local sobre la renta extranjera, además de las vías de trabajo y estudio.',
          benefits: [
            'Digital nomad permit exempts foreign income from local tax',
            'EU member and part of the Schengen area since 2023',
            'Extensive Adriatic coastline',
            'Moderate cost of living for the EU',
          ],
          challenges: [
            'Croatian is demanding to learn',
            'Limited local labour market',
            'Economy heavily dependent on seasonal tourism',
          ],
          processing_time: '30–60 days',
          investment_required:
            'Digital nomad: €3,622.50/month, or €43,470 in savings for a 12-month stay',
          language_requirement: 'Croatian (required for permanent residence)',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Short-Stay Visa (Schengen Type C)',
          description:
            'Visa for stays of up to 90 days in any 180-day period for tourism or business.',
          source: 'https://mup.gov.hr/en',
        },
        {
          category: 'Digital Nomad Residence Permit',
          description:
            'Temporary stay of up to one year for remote workers not employed by a Croatian company.',
          source: 'https://mup.gov.hr/en',
        },
        {
          category: 'Temporary Stay for Work',
          description:
            'Residence and work permit tied to a Croatian employer or self-employment.',
          source: 'https://mup.gov.hr/en',
        },
        {
          category: 'Permanent Residence',
          description:
            'Available after five years of continuous legal residence, subject to language requirements.',
          source: 'https://mup.gov.hr/en',
        },
      ],
    },
    {
      name: 'Estonia',
      flag: '🇪🇪',
      region: 'Europe',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Digital Nomad Visa (Type D)',
        'Startup Visa',
        'EU Blue Card',
        'Student Residence Permit',
      ],
      job_market: 'Strong',
      popular_cities: [
        'Tallinn',
        'Tartu',
        'Pärnu',
        'Narva',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'A Estônia foi o primeiro país a criar um visto formal de nômade digital e oferece serviços públicos totalmente digitais, além do Startup Visa.',
          benefits: [
            'First country in the world to create a formal digital nomad visa',
            'e-Residency and fully digital public services',
            'Strong startup ecosystem relative to population',
            'Lean and fast administration',
          ],
          challenges: [
            'Estonian is a difficult language for most learners',
            'Long, dark winters',
            'Small domestic market',
          ],
          processing_time: '15–30 days',
          investment_required:
            'Digital nomad: roughly €4,500/month in gross income over the previous six months',
          language_requirement: 'Estonian (B1 for permanent residence)',
        },
        {
          language: 'en',
          description:
            'Estonia was the first country to create a formal digital nomad visa and offers fully digital public services, alongside the Startup Visa.',
          benefits: [
            'First country in the world to create a formal digital nomad visa',
            'e-Residency and fully digital public services',
            'Strong startup ecosystem relative to population',
            'Lean and fast administration',
          ],
          challenges: [
            'Estonian is a difficult language for most learners',
            'Long, dark winters',
            'Small domestic market',
          ],
          processing_time: '15–30 days',
          investment_required:
            'Digital nomad: roughly €4,500/month in gross income over the previous six months',
          language_requirement: 'Estonian (B1 for permanent residence)',
        },
        {
          language: 'es',
          description:
            'Estonia fue el primer país en crear un visado formal de nómada digital y ofrece servicios públicos totalmente digitales, además del Startup Visa.',
          benefits: [
            'First country in the world to create a formal digital nomad visa',
            'e-Residency and fully digital public services',
            'Strong startup ecosystem relative to population',
            'Lean and fast administration',
          ],
          challenges: [
            'Estonian is a difficult language for most learners',
            'Long, dark winters',
            'Small domestic market',
          ],
          processing_time: '15–30 days',
          investment_required:
            'Digital nomad: roughly €4,500/month in gross income over the previous six months',
          language_requirement: 'Estonian (B1 for permanent residence)',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Short-Stay Visa (Schengen Type C)',
          description: 'Visa for stays of up to 90 days in any 180-day period.',
          source: 'https://www.politsei.ee/en',
        },
        {
          category: 'Digital Nomad Visa (Type D)',
          description:
            'Long-stay visa for remote workers with an employer or clients outside Estonia.',
          source: 'https://www.politsei.ee/en',
        },
        {
          category: 'Startup Visa',
          description:
            'Route for founders of innovative startups validated by an expert committee.',
          source: 'https://www.startupestonia.ee/',
        },
        {
          category: 'Long-Term Residence Permit',
          description:
            'Available after five years of residence, subject to Estonian language and income requirements.',
          source: 'https://www.politsei.ee/en',
        },
      ],
    },
    {
      name: 'Hungary',
      flag: '🇭🇺',
      region: 'Europe',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'White Card (Digital Nomad)',
        'Work Permit',
        'Student Residence Permit',
        'Guest Investor Residence',
      ],
      job_market: 'Moderate',
      popular_cities: [
        'Budapest',
        'Debrecen',
        'Szeged',
        'Pécs',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'A Hungria oferece o White Card para trabalhadores remotos e o Guest Investor Residence, com um dos custos de vida mais baixos da UE.',
          benefits: [
            'Low cost of living within the EU',
            'White Card route for remote workers',
            'Central location for travel across Europe',
            'Rich thermal spa and cultural scene',
          ],
          challenges: [
            'Hungarian is linguistically isolated and hard to learn',
            'Restrictive immigration policy',
            'Low local wages',
          ],
          processing_time: '30–70 days',
          investment_required:
            'White Card: roughly €3,000/month in income; Guest Investor Programme: from €250,000',
          language_requirement: 'Hungarian (required for naturalisation)',
        },
        {
          language: 'en',
          description:
            'Hungary offers the White Card for remote workers and the Guest Investor Residence, with one of the lowest costs of living in the EU.',
          benefits: [
            'Low cost of living within the EU',
            'White Card route for remote workers',
            'Central location for travel across Europe',
            'Rich thermal spa and cultural scene',
          ],
          challenges: [
            'Hungarian is linguistically isolated and hard to learn',
            'Restrictive immigration policy',
            'Low local wages',
          ],
          processing_time: '30–70 days',
          investment_required:
            'White Card: roughly €3,000/month in income; Guest Investor Programme: from €250,000',
          language_requirement: 'Hungarian (required for naturalisation)',
        },
        {
          language: 'es',
          description:
            'Hungría ofrece la White Card para trabajadores remotos y el Guest Investor Residence, con uno de los costes de vida más bajos de la UE.',
          benefits: [
            'Low cost of living within the EU',
            'White Card route for remote workers',
            'Central location for travel across Europe',
            'Rich thermal spa and cultural scene',
          ],
          challenges: [
            'Hungarian is linguistically isolated and hard to learn',
            'Restrictive immigration policy',
            'Low local wages',
          ],
          processing_time: '30–70 days',
          investment_required:
            'White Card: roughly €3,000/month in income; Guest Investor Programme: from €250,000',
          language_requirement: 'Hungarian (required for naturalisation)',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Short-Stay Visa (Schengen Type C)',
          description: 'Visa for stays of up to 90 days in any 180-day period.',
          source: 'https://oif.gov.hu/',
        },
        {
          category: 'White Card (Digital Nomad Residence Permit)',
          description:
            'One-year renewable permit for remote workers earning income from outside Hungary.',
          source: 'https://oif.gov.hu/',
        },
        {
          category: 'Residence Permit for Employment',
          description:
            'Permit tied to a Hungarian employer, issued together with the work authorisation.',
          source: 'https://oif.gov.hu/',
        },
        {
          category: 'Guest Investor Residence Permit',
          description:
            'Ten-year residence granted through qualifying investment in real estate funds or bonds.',
          source: 'https://oif.gov.hu/',
        },
      ],
    },
    {
      name: 'Turkey',
      flag: '🇹🇷',
      region: 'Europe',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Citizenship by Investment',
        'Short-Term Residence Permit',
        'Work Permit',
        'Digital Nomad Visa',
      ],
      job_market: 'Moderate',
      popular_cities: [
        'Istanbul',
        'Ankara',
        'Izmir',
        'Antalya',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'A Turquia tem uma das vias mais rápidas de cidadania por investimento e oferece vistos de residência de curto prazo e para nômades digitais.',
          benefits: [
            'One of the fastest citizenship-by-investment routes in the world',
            'Low cost of living',
            'Bridge location between Europe and Asia',
            'Affordable and high-standard private healthcare',
          ],
          challenges: [
            'High inflation and currency volatility',
            'Political instability',
            'Residence restricted in districts with high foreigner density',
          ],
          processing_time: '1–6 months depending on the route',
          investment_required:
            'Citizenship by investment: from US$400,000 in real estate held for three years',
          language_requirement: 'Turkish (required for citizenship)',
        },
        {
          language: 'en',
          description:
            'Turkey runs one of the fastest citizenship-by-investment routes in the world, alongside short-term residence and digital nomad permits.',
          benefits: [
            'One of the fastest citizenship-by-investment routes in the world',
            'Low cost of living',
            'Bridge location between Europe and Asia',
            'Affordable and high-standard private healthcare',
          ],
          challenges: [
            'High inflation and currency volatility',
            'Political instability',
            'Residence restricted in districts with high foreigner density',
          ],
          processing_time: '1–6 months depending on the route',
          investment_required:
            'Citizenship by investment: from US$400,000 in real estate held for three years',
          language_requirement: 'Turkish (required for citizenship)',
        },
        {
          language: 'es',
          description:
            'Turquía tiene una de las vías más rápidas de ciudadanía por inversión, además de permisos de residencia de corta duración y para nómadas digitales.',
          benefits: [
            'One of the fastest citizenship-by-investment routes in the world',
            'Low cost of living',
            'Bridge location between Europe and Asia',
            'Affordable and high-standard private healthcare',
          ],
          challenges: [
            'High inflation and currency volatility',
            'Political instability',
            'Residence restricted in districts with high foreigner density',
          ],
          processing_time: '1–6 months depending on the route',
          investment_required:
            'Citizenship by investment: from US$400,000 in real estate held for three years',
          language_requirement: 'Turkish (required for citizenship)',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Tourist Visa / e-Visa',
          description:
            'Short-term entry for tourism or business, with duration depending on nationality.',
          source: 'https://www.evisa.gov.tr/en/',
        },
        {
          category: 'Short-Term Residence Permit',
          description:
            'Renewable residence for property owners, remote workers and long-stay visitors.',
          source: 'https://www.goc.gov.tr/',
        },
        {
          category: 'Work Permit',
          description:
            'Permit tied to a Turkish employer, granted together with residence rights.',
          source: 'https://www.csgb.gov.tr/',
        },
        {
          category: 'Citizenship by Investment',
          description:
            'Turkish citizenship granted through qualifying real estate, capital or deposit investment.',
          source: 'https://www.goc.gov.tr/',
        },
      ],
    },
    {
      name: 'Colombia',
      flag: '🇨🇴',
      region: 'South America',
      difficulty: 'Easy',
      difficulty_score: 2,
      visa_options: [
        'Visa V Digital Nomad',
        'Visa M Migrant',
        'Visa R Resident',
        'Work Visa',
      ],
      job_market: 'Moderate',
      popular_cities: [
        'Bogotá',
        'Medellín',
        'Cartagena',
        'Cali',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'A Colômbia oferece o visto V de nômade digital com validade de até dois anos, além das vias M de migrante e R de residente.',
          benefits: [
            'Low cost of living',
            'Digital nomad visa valid for up to two years',
            'Time zone aligned with the United States',
            'Stable climate throughout the year',
          ],
          challenges: [
            'Security varies sharply by region',
            'Apostille-heavy bureaucracy',
            'Uneven infrastructure outside the main cities',
          ],
          processing_time: '10–30 days',
          investment_required:
            'Digital nomad: roughly US$1,000/month in income; investor route from roughly US$130,000',
          language_requirement: 'Spanish (basic to intermediate)',
        },
        {
          language: 'en',
          description:
            'Colombia offers the V digital nomad visa valid for up to two years, alongside the M migrant and R resident routes.',
          benefits: [
            'Low cost of living',
            'Digital nomad visa valid for up to two years',
            'Time zone aligned with the United States',
            'Stable climate throughout the year',
          ],
          challenges: [
            'Security varies sharply by region',
            'Apostille-heavy bureaucracy',
            'Uneven infrastructure outside the main cities',
          ],
          processing_time: '10–30 days',
          investment_required:
            'Digital nomad: roughly US$1,000/month in income; investor route from roughly US$130,000',
          language_requirement: 'Spanish (basic to intermediate)',
        },
        {
          language: 'es',
          description:
            'Colombia ofrece el visado V de nómada digital con vigencia de hasta dos años, además de las vías M de migrante y R de residente.',
          benefits: [
            'Low cost of living',
            'Digital nomad visa valid for up to two years',
            'Time zone aligned with the United States',
            'Stable climate throughout the year',
          ],
          challenges: [
            'Security varies sharply by region',
            'Apostille-heavy bureaucracy',
            'Uneven infrastructure outside the main cities',
          ],
          processing_time: '10–30 days',
          investment_required:
            'Digital nomad: roughly US$1,000/month in income; investor route from roughly US$130,000',
          language_requirement: 'Spanish (basic to intermediate)',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Visitor Visa (Type V)',
          description:
            'Short and medium-term visa covering tourism, business and remote work.',
          source: 'https://www.cancilleria.gov.co/',
        },
        {
          category: 'Migrant Visa (Type M)',
          description:
            'Multi-year visa for work, investment, family ties or retirement.',
          source: 'https://www.cancilleria.gov.co/',
        },
        {
          category: 'Resident Visa (Type R)',
          description:
            'Indefinite residence granted after several years on a Migrant visa or by direct investment.',
          source: 'https://www.cancilleria.gov.co/',
        },
      ],
    },
    {
      name: 'Paraguay',
      flag: '🇵🇾',
      region: 'South America',
      difficulty: 'Easy',
      difficulty_score: 2,
      visa_options: [
        'Permanent Residence',
        'Mercosur Residence',
        'SUACE Investor Residence',
        'Temporary Residence',
      ],
      job_market: 'Weak',
      popular_cities: [
        'Asunción',
        'Ciudad del Este',
        'Encarnación',
        'San Lorenzo',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'O Paraguai tem um dos processos de residência mais acessíveis do mundo, com tributação territorial e residência facilitada para o Mercosul.',
          benefits: [
            'Among the most accessible residence processes in the world',
            'Territorial tax system — foreign income is not taxed locally',
            'Very low cost of living',
            'Mercosur member with regional mobility',
          ],
          challenges: [
            'Limited local labour market',
            'Modest infrastructure outside Asunción',
            'Extreme summer heat',
          ],
          processing_time: '2–4 months',
          investment_required:
            'Permanent residence: roughly US$5,000 in a local bank deposit; investor route from roughly US$70,000',
          language_requirement: 'Spanish (Guaraní is co-official)',
        },
        {
          language: 'en',
          description:
            'Paraguay has one of the most accessible residence processes in the world, with territorial taxation and simplified residence for Mercosur nationals.',
          benefits: [
            'Among the most accessible residence processes in the world',
            'Territorial tax system — foreign income is not taxed locally',
            'Very low cost of living',
            'Mercosur member with regional mobility',
          ],
          challenges: [
            'Limited local labour market',
            'Modest infrastructure outside Asunción',
            'Extreme summer heat',
          ],
          processing_time: '2–4 months',
          investment_required:
            'Permanent residence: roughly US$5,000 in a local bank deposit; investor route from roughly US$70,000',
          language_requirement: 'Spanish (Guaraní is co-official)',
        },
        {
          language: 'es',
          description:
            'Paraguay tiene uno de los procesos de residencia más accesibles del mundo, con tributación territorial y residencia simplificada para el Mercosur.',
          benefits: [
            'Among the most accessible residence processes in the world',
            'Territorial tax system — foreign income is not taxed locally',
            'Very low cost of living',
            'Mercosur member with regional mobility',
          ],
          challenges: [
            'Limited local labour market',
            'Modest infrastructure outside Asunción',
            'Extreme summer heat',
          ],
          processing_time: '2–4 months',
          investment_required:
            'Permanent residence: roughly US$5,000 in a local bank deposit; investor route from roughly US$70,000',
          language_requirement: 'Spanish (Guaraní is co-official)',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Tourist Entry',
          description:
            'Short-term entry for tourism, with duration depending on nationality.',
          source: 'https://www.migraciones.gov.py/',
        },
        {
          category: 'Temporary Residence',
          description:
            'Residence for a defined period based on work, study or family ties.',
          source: 'https://www.migraciones.gov.py/',
        },
        {
          category: 'Mercosur Residence',
          description:
            'Simplified residence for nationals of Mercosur member and associated states.',
          source: 'https://www.migraciones.gov.py/',
        },
        {
          category: 'Permanent Residence',
          description:
            'Indefinite residence granted through a bank deposit, family ties or qualifying investment.',
          source: 'https://www.migraciones.gov.py/',
        },
      ],
    },
    {
      name: 'Malaysia',
      flag: '🇲🇾',
      region: 'Asia',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Malaysia My Second Home (MM2H)',
        'DE Rantau Nomad Pass',
        'Employment Pass',
        'Student Pass',
      ],
      job_market: 'Moderate',
      popular_cities: [
        'Kuala Lumpur',
        'Penang',
        'Johor Bahru',
        'Kota Kinabalu',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'A Malásia oferece o MM2H para residência de longa duração e o DE Rantau para nômades digitais, com inglês amplamente falado.',
          benefits: [
            'English widely used in business and daily life',
            'Low cost of living',
            'MM2H offers long-term renewable residence',
            'Affordable, high-standard private healthcare',
          ],
          challenges: [
            'MM2H requirements have changed repeatedly in recent years',
            'Permanent residence is rarely granted',
            'Constant heat and humidity',
          ],
          processing_time: '2–6 months',
          investment_required:
            'MM2H: fixed deposit from RM500,000 depending on the tier',
          language_requirement: 'Malay official; English widely spoken',
        },
        {
          language: 'en',
          description:
            'Malaysia offers MM2H for long-term residence and the DE Rantau pass for digital nomads, with English widely spoken.',
          benefits: [
            'English widely used in business and daily life',
            'Low cost of living',
            'MM2H offers long-term renewable residence',
            'Affordable, high-standard private healthcare',
          ],
          challenges: [
            'MM2H requirements have changed repeatedly in recent years',
            'Permanent residence is rarely granted',
            'Constant heat and humidity',
          ],
          processing_time: '2–6 months',
          investment_required:
            'MM2H: fixed deposit from RM500,000 depending on the tier',
          language_requirement: 'Malay official; English widely spoken',
        },
        {
          language: 'es',
          description:
            'Malasia ofrece el MM2H para residencia de larga duración y el DE Rantau para nómadas digitales, con el inglés ampliamente hablado.',
          benefits: [
            'English widely used in business and daily life',
            'Low cost of living',
            'MM2H offers long-term renewable residence',
            'Affordable, high-standard private healthcare',
          ],
          challenges: [
            'MM2H requirements have changed repeatedly in recent years',
            'Permanent residence is rarely granted',
            'Constant heat and humidity',
          ],
          processing_time: '2–6 months',
          investment_required:
            'MM2H: fixed deposit from RM500,000 depending on the tier',
          language_requirement: 'Malay official; English widely spoken',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Social Visit Pass',
          description:
            'Short-term entry for tourism or business, with duration depending on nationality.',
          source: 'https://www.imi.gov.my/',
        },
        {
          category: 'Employment Pass',
          description:
            'Work and residence pass tied to a Malaysian employer, issued by category of salary and skill.',
          source: 'https://www.imi.gov.my/',
        },
        {
          category: 'Malaysia My Second Home (MM2H)',
          description:
            'Long-term renewable residence granted through a fixed deposit and proof of income.',
          source: 'https://www.imi.gov.my/',
        },
        {
          category: 'DE Rantau Nomad Pass',
          description:
            'Pass for remote professionals in digital fields working for clients outside Malaysia.',
          source: 'https://mdec.my/derantau',
        },
      ],
    },
    {
      name: 'Israel',
      flag: '🇮🇱',
      region: 'Asia',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Aliyah (Law of Return)',
        'B/1 Work Visa',
        'A/2 Student Visa',
        'A/5 Temporary Residence',
      ],
      job_market: 'Strong',
      popular_cities: [
        'Tel Aviv',
        'Jerusalem',
        'Haifa',
        'Be\'er Sheva',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'Israel concede cidadania a judeus e seus descendentes pela Lei do Retorno, com pacote de absorção para novos imigrantes e setor de tecnologia forte.',
          benefits: [
            'Law of Return grants citizenship to Jews and their descendants',
            'Absorption package of benefits for new immigrants',
            'Very strong technology and research sector',
            'Universal health coverage',
          ],
          challenges: [
            'High cost of living, especially housing',
            'Regional security situation',
            'Military service obligations apply to some age groups',
          ],
          processing_time: '1–6 months depending on the route',
          investment_required:
            'Aliyah has no financial requirement; proof of Jewish ancestry is required instead',
          language_requirement:
            'Hebrew (free ulpan courses provided to new immigrants)',
        },
        {
          language: 'en',
          description:
            'Israel grants citizenship to Jews and their descendants under the Law of Return, with an absorption package for new immigrants and a strong technology sector.',
          benefits: [
            'Law of Return grants citizenship to Jews and their descendants',
            'Absorption package of benefits for new immigrants',
            'Very strong technology and research sector',
            'Universal health coverage',
          ],
          challenges: [
            'High cost of living, especially housing',
            'Regional security situation',
            'Military service obligations apply to some age groups',
          ],
          processing_time: '1–6 months depending on the route',
          investment_required:
            'Aliyah has no financial requirement; proof of Jewish ancestry is required instead',
          language_requirement:
            'Hebrew (free ulpan courses provided to new immigrants)',
        },
        {
          language: 'es',
          description:
            'Israel concede la ciudadanía a judíos y sus descendientes por la Ley del Retorno, con un paquete de absorción para nuevos inmigrantes y un fuerte sector tecnológico.',
          benefits: [
            'Law of Return grants citizenship to Jews and their descendants',
            'Absorption package of benefits for new immigrants',
            'Very strong technology and research sector',
            'Universal health coverage',
          ],
          challenges: [
            'High cost of living, especially housing',
            'Regional security situation',
            'Military service obligations apply to some age groups',
          ],
          processing_time: '1–6 months depending on the route',
          investment_required:
            'Aliyah has no financial requirement; proof of Jewish ancestry is required instead',
          language_requirement:
            'Hebrew (free ulpan courses provided to new immigrants)',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Tourist Visa (B/2)',
          description: 'Short-term entry for tourism, generally up to 90 days.',
          source:
            'https://www.gov.il/en/departments/population_and_immigration_authority',
        },
        {
          category: 'Work Visa (B/1)',
          description: 'Work and residence permit tied to an Israeli employer.',
          source:
            'https://www.gov.il/en/departments/population_and_immigration_authority',
        },
        {
          category: 'Aliyah (Law of Return)',
          description:
            'Immigration and citizenship for Jews, their children and grandchildren, and their spouses.',
          source: 'https://www.gov.il/en/departments/jewish_agency',
        },
        {
          category: 'Temporary Residence (A/5)',
          description:
            'Renewable residence for spouses of citizens and other qualifying categories.',
          source:
            'https://www.gov.il/en/departments/population_and_immigration_authority',
        },
      ],
    },
    {
      name: 'Qatar',
      flag: '🇶🇦',
      region: 'Asia',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Work Residence Permit',
        'Permanent Residency Permit',
        'Family Residence Visa',
        'Investor Residence',
      ],
      job_market: 'Strong',
      popular_cities: [
        'Doha',
        'Al Rayyan',
        'Lusail',
        'Al Wakrah',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'O Catar não cobra imposto de renda sobre pessoa física e oferece residência por trabalho ou investimento imobiliário, com infraestrutura moderna.',
          benefits: [
            'No personal income tax',
            'High salaries for skilled expatriates',
            'Modern infrastructure and global connectivity',
            'Very low crime rates',
          ],
          challenges: [
            'Most residence permits are tied to an employer',
            'Permanent residency is quota-limited and rarely granted',
            'Extreme summer heat',
          ],
          processing_time: '1–3 months',
          investment_required:
            'Investor residency: from QAR 1,000,000 in qualifying real estate',
          language_requirement: 'Arabic official; English used widely at work',
        },
        {
          language: 'en',
          description:
            'Qatar levies no personal income tax and offers residence through employment or qualifying real estate investment, with modern infrastructure.',
          benefits: [
            'No personal income tax',
            'High salaries for skilled expatriates',
            'Modern infrastructure and global connectivity',
            'Very low crime rates',
          ],
          challenges: [
            'Most residence permits are tied to an employer',
            'Permanent residency is quota-limited and rarely granted',
            'Extreme summer heat',
          ],
          processing_time: '1–3 months',
          investment_required:
            'Investor residency: from QAR 1,000,000 in qualifying real estate',
          language_requirement: 'Arabic official; English used widely at work',
        },
        {
          language: 'es',
          description:
            'Catar no cobra impuesto sobre la renta personal y ofrece residencia por empleo o inversión inmobiliaria, con infraestructura moderna.',
          benefits: [
            'No personal income tax',
            'High salaries for skilled expatriates',
            'Modern infrastructure and global connectivity',
            'Very low crime rates',
          ],
          challenges: [
            'Most residence permits are tied to an employer',
            'Permanent residency is quota-limited and rarely granted',
            'Extreme summer heat',
          ],
          processing_time: '1–3 months',
          investment_required:
            'Investor residency: from QAR 1,000,000 in qualifying real estate',
          language_requirement: 'Arabic official; English used widely at work',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Visit Visa',
          description:
            'Short-term entry for tourism or business, with duration depending on nationality.',
          source: 'https://portal.moi.gov.qa/',
        },
        {
          category: 'Work Residence Permit',
          description:
            'Residence tied to a Qatari employer, covering the employee and eligible dependants.',
          source: 'https://portal.moi.gov.qa/',
        },
        {
          category: 'Investor Residence',
          description:
            'Residence granted through qualifying real estate purchase above the statutory threshold.',
          source: 'https://portal.moi.gov.qa/',
        },
        {
          category: 'Permanent Residency Permit',
          description:
            'Indefinite residence granted under an annual quota to qualifying long-term residents.',
          source: 'https://portal.moi.gov.qa/',
        },
      ],
    },
    {
      name: 'Indonesia',
      flag: '🇮🇩',
      region: 'Asia',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Second Home Visa',
        'E33G Remote Worker KITAS',
        'Investor KITAS',
        'Golden Visa',
      ],
      job_market: 'Moderate',
      popular_cities: [
        'Jakarta',
        'Denpasar',
        'Ubud',
        'Bandung',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'A Indonésia oferece o Second Home Visa e o KITAS de trabalhador remoto, que não tributa renda estrangeira, com Bali como polo consolidado.',
          benefits: [
            'Low cost of living',
            'Remote worker route does not tax income earned abroad',
            'Bali is an established hub for remote professionals',
            'Enormous geographic and cultural diversity',
          ],
          challenges: [
            'Visa rules change frequently',
            'Local administration varies between provinces',
            'Uneven infrastructure outside major centres',
          ],
          processing_time: '1–3 months',
          investment_required:
            'Second Home Visa: roughly IDR 2 billion held in a state bank; remote worker route: US$60,000 in annual income',
          language_requirement: 'Indonesian (basic)',
        },
        {
          language: 'en',
          description:
            'Indonesia offers the Second Home Visa and the remote worker KITAS, which does not tax foreign income, with Bali as an established hub.',
          benefits: [
            'Low cost of living',
            'Remote worker route does not tax income earned abroad',
            'Bali is an established hub for remote professionals',
            'Enormous geographic and cultural diversity',
          ],
          challenges: [
            'Visa rules change frequently',
            'Local administration varies between provinces',
            'Uneven infrastructure outside major centres',
          ],
          processing_time: '1–3 months',
          investment_required:
            'Second Home Visa: roughly IDR 2 billion held in a state bank; remote worker route: US$60,000 in annual income',
          language_requirement: 'Indonesian (basic)',
        },
        {
          language: 'es',
          description:
            'Indonesia ofrece el Second Home Visa y el KITAS de trabajador remoto, que no grava la renta extranjera, con Bali como polo consolidado.',
          benefits: [
            'Low cost of living',
            'Remote worker route does not tax income earned abroad',
            'Bali is an established hub for remote professionals',
            'Enormous geographic and cultural diversity',
          ],
          challenges: [
            'Visa rules change frequently',
            'Local administration varies between provinces',
            'Uneven infrastructure outside major centres',
          ],
          processing_time: '1–3 months',
          investment_required:
            'Second Home Visa: roughly IDR 2 billion held in a state bank; remote worker route: US$60,000 in annual income',
          language_requirement: 'Indonesian (basic)',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Visa on Arrival / Tourist Visa',
          description:
            'Short-term entry for tourism, extendable once for most nationalities.',
          source: 'https://www.imigrasi.go.id/',
        },
        {
          category: 'Remote Worker KITAS (E33G)',
          description:
            'One-year permit for remote professionals earning income from employers outside Indonesia.',
          source: 'https://www.imigrasi.go.id/',
        },
        {
          category: 'Second Home Visa',
          description:
            'Five or ten-year residence granted through a deposit in a state bank or qualifying property.',
          source: 'https://www.imigrasi.go.id/',
        },
        {
          category: 'Investor KITAS',
          description:
            'Residence tied to shareholding in an Indonesian company above the statutory threshold.',
          source: 'https://www.imigrasi.go.id/',
        },
      ],
    },
    {
      name: 'Romania',
      flag: '🇷🇴',
      region: 'Europe',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Digital Nomad Visa',
        'Long-Stay Visa (Type D)',
        'EU Blue Card',
        'Student Visa',
      ],
      job_market: 'Moderate',
      popular_cities: [
        'Bucharest',
        'Cluj-Napoca',
        'Timișoara',
        'Brașov',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'A Romênia oferece visto de nômade digital e vias de trabalho na UE, com custo de vida baixo e uma das melhores infraestruturas de internet da Europa.',
          benefits: [
            'Low cost of living within the EU',
            'Among the fastest internet infrastructure in Europe',
            'Growing technology sector',
            'Romanian is a Romance language, easier for Latin speakers',
          ],
          challenges: [
            'Slow administration',
            'Low local wages',
            'Infrastructure uneven outside the major cities',
          ],
          processing_time: '30–60 days',
          investment_required:
            'Digital nomad: roughly €3,700/month in income over the previous six months',
          language_requirement: 'Romanian (basic)',
        },
        {
          language: 'en',
          description:
            'Romania offers a digital nomad visa and EU work routes, with a low cost of living and some of the fastest internet infrastructure in Europe.',
          benefits: [
            'Low cost of living within the EU',
            'Among the fastest internet infrastructure in Europe',
            'Growing technology sector',
            'Romanian is a Romance language, easier for Latin speakers',
          ],
          challenges: [
            'Slow administration',
            'Low local wages',
            'Infrastructure uneven outside the major cities',
          ],
          processing_time: '30–60 days',
          investment_required:
            'Digital nomad: roughly €3,700/month in income over the previous six months',
          language_requirement: 'Romanian (basic)',
        },
        {
          language: 'es',
          description:
            'Rumanía ofrece visado de nómada digital y vías de trabajo en la UE, con bajo coste de vida y una de las mejores infraestructuras de internet de Europa.',
          benefits: [
            'Low cost of living within the EU',
            'Among the fastest internet infrastructure in Europe',
            'Growing technology sector',
            'Romanian is a Romance language, easier for Latin speakers',
          ],
          challenges: [
            'Slow administration',
            'Low local wages',
            'Infrastructure uneven outside the major cities',
          ],
          processing_time: '30–60 days',
          investment_required:
            'Digital nomad: roughly €3,700/month in income over the previous six months',
          language_requirement: 'Romanian (basic)',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Short-Stay Visa (Schengen Type C)',
          description: 'Visa for stays of up to 90 days in any 180-day period.',
          source: 'https://igi.mai.gov.ro/en/',
        },
        {
          category: 'Digital Nomad Visa',
          description:
            'Long-stay visa for remote workers with employers or clients outside Romania.',
          source: 'https://igi.mai.gov.ro/en/',
        },
        {
          category: 'Long-Stay Visa (Type D)',
          description:
            'Visa for work, study, business or family reunification beyond 90 days.',
          source: 'https://igi.mai.gov.ro/en/',
        },
        {
          category: 'Long-Term Residence',
          description:
            'Available after five years of continuous legal residence.',
          source: 'https://igi.mai.gov.ro/en/',
        },
      ],
    },
    {
      name: 'Luxembourg',
      flag: '🇱🇺',
      region: 'Europe',
      difficulty: 'Hard',
      difficulty_score: 4,
      visa_options: [
        'Salaried Worker Authorisation',
        'EU Blue Card',
        'Investor Residence',
        'Student Residence Permit',
      ],
      job_market: 'Strong',
      popular_cities: [
        'Luxembourg City',
        'Esch-sur-Alzette',
        'Differdange',
        'Dudelange',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'Luxemburgo concentra instituições da UE e o setor financeiro, com os salários mais altos do bloco e ambiente de trabalho trilíngue.',
          benefits: [
            'Among the highest salaries in the European Union',
            'Major financial and EU institutional hub',
            'Trilingual working environment',
            'Central position within Western Europe',
          ],
          challenges: [
            'Extremely high housing costs',
            'Very small territory and job market',
            'Three official languages raise the integration bar',
          ],
          processing_time: '2–4 months',
          investment_required:
            'Investor residence: from €500,000 in a new or existing company',
          language_requirement:
            'Luxembourgish, French or German depending on the role',
        },
        {
          language: 'en',
          description:
            'Luxembourg hosts EU institutions and a major financial sector, with among the highest salaries in the bloc and a trilingual working environment.',
          benefits: [
            'Among the highest salaries in the European Union',
            'Major financial and EU institutional hub',
            'Trilingual working environment',
            'Central position within Western Europe',
          ],
          challenges: [
            'Extremely high housing costs',
            'Very small territory and job market',
            'Three official languages raise the integration bar',
          ],
          processing_time: '2–4 months',
          investment_required:
            'Investor residence: from €500,000 in a new or existing company',
          language_requirement:
            'Luxembourgish, French or German depending on the role',
        },
        {
          language: 'es',
          description:
            'Luxemburgo concentra instituciones de la UE y el sector financiero, con los salarios más altos del bloque y un entorno laboral trilingüe.',
          benefits: [
            'Among the highest salaries in the European Union',
            'Major financial and EU institutional hub',
            'Trilingual working environment',
            'Central position within Western Europe',
          ],
          challenges: [
            'Extremely high housing costs',
            'Very small territory and job market',
            'Three official languages raise the integration bar',
          ],
          processing_time: '2–4 months',
          investment_required:
            'Investor residence: from €500,000 in a new or existing company',
          language_requirement:
            'Luxembourgish, French or German depending on the role',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Short-Stay Visa (Schengen Type C)',
          description: 'Visa for stays of up to 90 days in any 180-day period.',
          source: 'https://guichet.public.lu/en.html',
        },
        {
          category: 'Long-Stay Visa (Type D)',
          description:
            'Visa for work, study or family reunification beyond 90 days.',
          source: 'https://guichet.public.lu/en.html',
        },
        {
          category: 'EU Blue Card',
          description:
            'Permit for highly qualified workers with a degree and a salary above the national threshold.',
          source: 'https://guichet.public.lu/en.html',
        },
        {
          category: 'Permanent Residence',
          description:
            'Available after five years of continuous legal residence.',
          source: 'https://guichet.public.lu/en.html',
        },
      ],
    },
    {
      name: 'Cyprus',
      flag: '🇨🇾',
      region: 'Europe',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Permanent Residence by Investment',
        'Digital Nomad Visa',
        'Work Permit',
        'Student Visa',
      ],
      job_market: 'Moderate',
      popular_cities: [
        'Nicosia',
        'Limassol',
        'Larnaca',
        'Paphos',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'O Chipre oferece residência permanente por investimento a partir de €300.000 e visto de nômade digital, com regime fiscal favorável a não-domiciliados.',
          benefits: [
            'English widely spoken in business and services',
            'Favourable tax regime for non-domiciled residents',
            'Mediterranean climate year round',
            'EU member state',
          ],
          challenges: [
            'Not part of the Schengen area',
            'Small domestic market',
            'Island division limits movement in the north',
          ],
          processing_time: '6 months for the fast-track investment route',
          investment_required:
            'Permanent residence: €300,000 in new-build property plus €50,000/year in secured income',
          language_requirement:
            'Greek official; English widely used in business',
        },
        {
          language: 'en',
          description:
            'Cyprus offers permanent residence by investment from €300,000 and a digital nomad visa, with a favourable tax regime for non-domiciled residents.',
          benefits: [
            'English widely spoken in business and services',
            'Favourable tax regime for non-domiciled residents',
            'Mediterranean climate year round',
            'EU member state',
          ],
          challenges: [
            'Not part of the Schengen area',
            'Small domestic market',
            'Island division limits movement in the north',
          ],
          processing_time: '6 months for the fast-track investment route',
          investment_required:
            'Permanent residence: €300,000 in new-build property plus €50,000/year in secured income',
          language_requirement:
            'Greek official; English widely used in business',
        },
        {
          language: 'es',
          description:
            'Chipre ofrece residencia permanente por inversión desde 300.000 € y visado de nómada digital, con un régimen fiscal favorable para no domiciliados.',
          benefits: [
            'English widely spoken in business and services',
            'Favourable tax regime for non-domiciled residents',
            'Mediterranean climate year round',
            'EU member state',
          ],
          challenges: [
            'Not part of the Schengen area',
            'Small domestic market',
            'Island division limits movement in the north',
          ],
          processing_time: '6 months for the fast-track investment route',
          investment_required:
            'Permanent residence: €300,000 in new-build property plus €50,000/year in secured income',
          language_requirement:
            'Greek official; English widely used in business',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Short-Stay Visa',
          description:
            'Visa for stays of up to 90 days for tourism or business.',
          source: 'https://www.moi.gov.cy/',
        },
        {
          category: 'Digital Nomad Visa',
          description:
            'One-year renewable residence for remote workers earning income from abroad.',
          source: 'https://www.moi.gov.cy/',
        },
        {
          category: 'Employment Permit',
          description: 'Work and residence permit tied to a Cypriot employer.',
          source: 'https://www.moi.gov.cy/',
        },
        {
          category: 'Permanent Residence by Investment',
          description:
            'Fast-track permanent residence granted through qualifying property or capital investment.',
          source: 'https://www.moi.gov.cy/',
        },
      ],
    },
    {
      name: 'Iceland',
      flag: '🇮🇸',
      region: 'Europe',
      difficulty: 'Hard',
      difficulty_score: 4,
      visa_options: [
        'Long-Term Remote Work Visa',
        'Work Permit for Qualified Professionals',
        'Student Residence Permit',
        'Family Reunification',
      ],
      job_market: 'Moderate',
      popular_cities: [
        'Reykjavík',
        'Akureyri',
        'Hafnarfjörður',
        'Kópavogur',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'A Islândia oferece visto de trabalho remoto de longa duração e autorizações para profissionais qualificados, com altíssima segurança e forte proteção social.',
          benefits: [
            'Among the safest countries in the world',
            'Dramatic natural landscapes and geothermal energy',
            'Strong gender equality and social protections',
            'Widespread English proficiency',
          ],
          challenges: [
            'Very high cost of living',
            'Long, dark winters',
            'Tiny labour market with few openings',
          ],
          processing_time: '2–3 months',
          investment_required:
            'Remote work visa: roughly ISK 1,000,000/month in income',
          language_requirement: 'Icelandic (English widely spoken)',
        },
        {
          language: 'en',
          description:
            'Iceland offers a long-term remote work visa and permits for qualified professionals, with very high safety and strong social protections.',
          benefits: [
            'Among the safest countries in the world',
            'Dramatic natural landscapes and geothermal energy',
            'Strong gender equality and social protections',
            'Widespread English proficiency',
          ],
          challenges: [
            'Very high cost of living',
            'Long, dark winters',
            'Tiny labour market with few openings',
          ],
          processing_time: '2–3 months',
          investment_required:
            'Remote work visa: roughly ISK 1,000,000/month in income',
          language_requirement: 'Icelandic (English widely spoken)',
        },
        {
          language: 'es',
          description:
            'Islandia ofrece un visado de trabajo remoto de larga duración y permisos para profesionales cualificados, con altísima seguridad y fuerte protección social.',
          benefits: [
            'Among the safest countries in the world',
            'Dramatic natural landscapes and geothermal energy',
            'Strong gender equality and social protections',
            'Widespread English proficiency',
          ],
          challenges: [
            'Very high cost of living',
            'Long, dark winters',
            'Tiny labour market with few openings',
          ],
          processing_time: '2–3 months',
          investment_required:
            'Remote work visa: roughly ISK 1,000,000/month in income',
          language_requirement: 'Icelandic (English widely spoken)',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Short-Stay Visa (Schengen Type C)',
          description: 'Visa for stays of up to 90 days in any 180-day period.',
          source: 'https://utl.is/index.php/en/',
        },
        {
          category: 'Long-Term Remote Work Visa',
          description:
            'Six-month visa for high-income remote workers employed outside Iceland.',
          source: 'https://utl.is/index.php/en/',
        },
        {
          category: 'Residence Permit for Qualified Professionals',
          description:
            'Permit for workers with skills in shortage, tied to an Icelandic employer.',
          source: 'https://utl.is/index.php/en/',
        },
        {
          category: 'Permanent Residence Permit',
          description:
            'Available after four years of continuous legal residence and Icelandic language study.',
          source: 'https://utl.is/index.php/en/',
        },
      ],
    },
    {
      name: 'Peru',
      flag: '🇵🇪',
      region: 'South America',
      difficulty: 'Easy',
      difficulty_score: 2,
      visa_options: [
        'Rentista Visa',
        'Work Visa',
        'Investor Visa',
        'Mercosur Residence',
      ],
      job_market: 'Moderate',
      popular_cities: [
        'Lima',
        'Arequipa',
        'Cusco',
        'Trujillo',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'O Peru oferece a via Rentista para quem tem renda permanente, residência facilitada pelo Mercosul e naturalização possível após dois anos.',
          benefits: [
            'Low cost of living',
            'Simplified residence for Mercosur nationals',
            'Rich cultural heritage and internationally recognised gastronomy',
            'Naturalisation possible after two years of residence',
          ],
          challenges: [
            'Political instability in recent years',
            'Uneven public services',
            'Marked inequality between Lima and the interior',
          ],
          processing_time: '1–3 months',
          investment_required:
            'Rentista: roughly US$1,000/month in permanent income; investor route from roughly US$135,000',
          language_requirement: 'Spanish (basic)',
        },
        {
          language: 'en',
          description:
            'Peru offers the Rentista route for those with permanent income, simplified Mercosur residence and naturalisation after two years.',
          benefits: [
            'Low cost of living',
            'Simplified residence for Mercosur nationals',
            'Rich cultural heritage and internationally recognised gastronomy',
            'Naturalisation possible after two years of residence',
          ],
          challenges: [
            'Political instability in recent years',
            'Uneven public services',
            'Marked inequality between Lima and the interior',
          ],
          processing_time: '1–3 months',
          investment_required:
            'Rentista: roughly US$1,000/month in permanent income; investor route from roughly US$135,000',
          language_requirement: 'Spanish (basic)',
        },
        {
          language: 'es',
          description:
            'Perú ofrece la vía Rentista para quienes tienen renta permanente, residencia simplificada por el Mercosur y naturalización tras dos años.',
          benefits: [
            'Low cost of living',
            'Simplified residence for Mercosur nationals',
            'Rich cultural heritage and internationally recognised gastronomy',
            'Naturalisation possible after two years of residence',
          ],
          challenges: [
            'Political instability in recent years',
            'Uneven public services',
            'Marked inequality between Lima and the interior',
          ],
          processing_time: '1–3 months',
          investment_required:
            'Rentista: roughly US$1,000/month in permanent income; investor route from roughly US$135,000',
          language_requirement: 'Spanish (basic)',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Tourist Entry',
          description:
            'Short-term entry for tourism, with the authorised period set on arrival.',
          source: 'https://www.gob.pe/migraciones',
        },
        {
          category: 'Rentista Visa',
          description:
            'Residence for foreigners with permanent income generated outside Peru.',
          source: 'https://www.gob.pe/migraciones',
        },
        {
          category: 'Work Visa',
          description:
            'Residence tied to an employment contract with a Peruvian company.',
          source: 'https://www.gob.pe/migraciones',
        },
        {
          category: 'Permanent Residence',
          description:
            'Indefinite residence granted after qualifying periods on temporary status or by family ties.',
          source: 'https://www.gob.pe/migraciones',
        },
      ],
    },
    {
      name: 'Dominican Republic',
      flag: '🇩🇴',
      region: 'North America',
      difficulty: 'Easy',
      difficulty_score: 2,
      visa_options: [
        'Rentista and Pensionado Residence',
        'Investor Residence',
        'Work Visa',
        'Temporary Residence',
      ],
      job_market: 'Weak',
      popular_cities: [
        'Santo Domingo',
        'Santiago',
        'Punta Cana',
        'Puerto Plata',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'A República Dominicana tem via rápida de residência para aposentados e rentistas, com cidadania possível após seis meses de residência permanente.',
          benefits: [
            'Fast-track residence for pensioners and rentiers',
            'Low cost of living',
            'Caribbean climate and extensive coastline',
            'Citizenship possible after six months of permanent residence',
          ],
          challenges: [
            'Limited local labour market for foreigners',
            'Uneven infrastructure outside tourist areas',
            'Exposure to the Atlantic hurricane season',
          ],
          processing_time: '2–5 months',
          investment_required:
            'Pensionado: roughly US$1,500/month in pension income; investor route from US$200,000',
          language_requirement: 'Spanish (basic)',
        },
        {
          language: 'en',
          description:
            'The Dominican Republic offers a fast-track residence route for pensioners and rentiers, with citizenship possible after six months of permanent residence.',
          benefits: [
            'Fast-track residence for pensioners and rentiers',
            'Low cost of living',
            'Caribbean climate and extensive coastline',
            'Citizenship possible after six months of permanent residence',
          ],
          challenges: [
            'Limited local labour market for foreigners',
            'Uneven infrastructure outside tourist areas',
            'Exposure to the Atlantic hurricane season',
          ],
          processing_time: '2–5 months',
          investment_required:
            'Pensionado: roughly US$1,500/month in pension income; investor route from US$200,000',
          language_requirement: 'Spanish (basic)',
        },
        {
          language: 'es',
          description:
            'La República Dominicana tiene una vía rápida de residencia para jubilados y rentistas, con ciudadanía posible tras seis meses de residencia permanente.',
          benefits: [
            'Fast-track residence for pensioners and rentiers',
            'Low cost of living',
            'Caribbean climate and extensive coastline',
            'Citizenship possible after six months of permanent residence',
          ],
          challenges: [
            'Limited local labour market for foreigners',
            'Uneven infrastructure outside tourist areas',
            'Exposure to the Atlantic hurricane season',
          ],
          processing_time: '2–5 months',
          investment_required:
            'Pensionado: roughly US$1,500/month in pension income; investor route from US$200,000',
          language_requirement: 'Spanish (basic)',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Tourist Entry',
          description:
            'Short-term entry for tourism, generally up to 30 days and extendable.',
          source: 'https://www.migracion.gob.do/',
        },
        {
          category: 'Temporary Residence',
          description:
            'One-year renewable residence for work, study or family reasons.',
          source: 'https://www.migracion.gob.do/',
        },
        {
          category: 'Pensionado / Rentista Residence',
          description:
            'Fast-track residence for retirees and those with stable passive income.',
          source: 'https://www.migracion.gob.do/',
        },
        {
          category: 'Permanent Residence',
          description:
            'Indefinite residence granted after temporary status or through qualifying investment.',
          source: 'https://www.migracion.gob.do/',
        },
      ],
    },
    {
      name: 'Ecuador',
      flag: '🇪🇨',
      region: 'South America',
      difficulty: 'Easy',
      difficulty_score: 2,
      visa_options: [
        'Rentista Visa',
        'Professional Visa',
        'Investor Visa',
        'Mercosur Residence',
      ],
      job_market: 'Weak',
      popular_cities: [
        'Quito',
        'Guayaquil',
        'Cuenca',
        'Loja',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'O Equador usa o dólar americano como moeda oficial e tem requisitos de residência acessíveis, com as vias Rentista, Profissional e de Investidor.',
          benefits: [
            'The US dollar is the official currency, removing exchange risk',
            'Very low cost of living',
            'Accessible residence requirements',
            'Diverse geography from the Andes to the Amazon and the coast',
          ],
          challenges: [
            'Rising insecurity in coastal cities',
            'Limited local job market for foreigners',
            'Political and economic volatility',
          ],
          processing_time: '1–3 months',
          investment_required:
            'Rentista: roughly US$1,350/month in stable income; investor route from roughly US$47,000',
          language_requirement: 'Spanish (basic)',
        },
        {
          language: 'en',
          description:
            'Ecuador uses the US dollar as its official currency and has accessible residence requirements, through the Rentista, Professional and Investor routes.',
          benefits: [
            'The US dollar is the official currency, removing exchange risk',
            'Very low cost of living',
            'Accessible residence requirements',
            'Diverse geography from the Andes to the Amazon and the coast',
          ],
          challenges: [
            'Rising insecurity in coastal cities',
            'Limited local job market for foreigners',
            'Political and economic volatility',
          ],
          processing_time: '1–3 months',
          investment_required:
            'Rentista: roughly US$1,350/month in stable income; investor route from roughly US$47,000',
          language_requirement: 'Spanish (basic)',
        },
        {
          language: 'es',
          description:
            'Ecuador usa el dólar estadounidense como moneda oficial y tiene requisitos de residencia accesibles, mediante las vías Rentista, Profesional e Inversionista.',
          benefits: [
            'The US dollar is the official currency, removing exchange risk',
            'Very low cost of living',
            'Accessible residence requirements',
            'Diverse geography from the Andes to the Amazon and the coast',
          ],
          challenges: [
            'Rising insecurity in coastal cities',
            'Limited local job market for foreigners',
            'Political and economic volatility',
          ],
          processing_time: '1–3 months',
          investment_required:
            'Rentista: roughly US$1,350/month in stable income; investor route from roughly US$47,000',
          language_requirement: 'Spanish (basic)',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Tourist Entry',
          description:
            'Short-term entry for tourism, generally up to 90 days per year.',
          source: 'https://www.cancilleria.gob.ec/',
        },
        {
          category: 'Temporary Resident Visa',
          description:
            'Two-year residence for work, study, investment or stable income.',
          source: 'https://www.cancilleria.gob.ec/',
        },
        {
          category: 'Mercosur Residence',
          description:
            'Simplified residence for nationals of Mercosur member and associated states.',
          source: 'https://www.cancilleria.gob.ec/',
        },
        {
          category: 'Permanent Resident Visa',
          description:
            'Indefinite residence available after 21 months on temporary status.',
          source: 'https://www.cancilleria.gob.ec/',
        },
      ],
    },
    {
      name: 'Vietnam',
      flag: '🇻🇳',
      region: 'Asia',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Work Permit and Temporary Residence Card',
        'Investor Visa (DT)',
        'Business Visa (DN)',
        'Student Visa',
      ],
      job_market: 'Moderate',
      popular_cities: [
        'Ho Chi Minh City',
        'Hanoi',
        'Da Nang',
        'Nha Trang',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'O Vietnã oferece autorização de trabalho com cartão de residência temporária e vistos de investidor, com custo de vida muito baixo e economia em rápido crescimento.',
          benefits: [
            'Very low cost of living',
            'One of the fastest-growing economies in Asia',
            'Established expatriate communities in the main cities',
            'Strong demand for foreign engineers and language teachers',
          ],
          challenges: [
            'No general route to permanent residence for most foreigners',
            'Work permits are tied to the employer',
            'Vietnamese is tonal and difficult for most learners',
          ],
          processing_time: '1–2 months',
          investment_required:
            'Investor visa tiers begin at roughly VND 3 billion in registered capital',
          language_requirement:
            'Vietnamese (English used in international companies)',
        },
        {
          language: 'en',
          description:
            'Vietnam offers work permits with a temporary residence card and investor visas, with a very low cost of living and a fast-growing economy.',
          benefits: [
            'Very low cost of living',
            'One of the fastest-growing economies in Asia',
            'Established expatriate communities in the main cities',
            'Strong demand for foreign engineers and language teachers',
          ],
          challenges: [
            'No general route to permanent residence for most foreigners',
            'Work permits are tied to the employer',
            'Vietnamese is tonal and difficult for most learners',
          ],
          processing_time: '1–2 months',
          investment_required:
            'Investor visa tiers begin at roughly VND 3 billion in registered capital',
          language_requirement:
            'Vietnamese (English used in international companies)',
        },
        {
          language: 'es',
          description:
            'Vietnam ofrece permisos de trabajo con tarjeta de residencia temporal y visados de inversor, con un coste de vida muy bajo y una economía en rápido crecimiento.',
          benefits: [
            'Very low cost of living',
            'One of the fastest-growing economies in Asia',
            'Established expatriate communities in the main cities',
            'Strong demand for foreign engineers and language teachers',
          ],
          challenges: [
            'No general route to permanent residence for most foreigners',
            'Work permits are tied to the employer',
            'Vietnamese is tonal and difficult for most learners',
          ],
          processing_time: '1–2 months',
          investment_required:
            'Investor visa tiers begin at roughly VND 3 billion in registered capital',
          language_requirement:
            'Vietnamese (English used in international companies)',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Tourist Visa / e-Visa',
          description:
            'Short-term entry for tourism, issued online for most nationalities.',
          source: 'https://evisa.gov.vn/',
        },
        {
          category: 'Business Visa (DN)',
          description:
            'Entry for commercial activity with a sponsoring Vietnamese company.',
          source: 'https://evisa.gov.vn/',
        },
        {
          category: 'Work Permit and Temporary Residence Card',
          description:
            'Work authorisation tied to an employer, with a residence card of up to two years.',
          source: 'https://dolab.gov.vn/',
        },
        {
          category: 'Investor Visa (DT)',
          description:
            'Multi-year visa granted by tier according to the capital invested in a Vietnamese company.',
          source: 'https://evisa.gov.vn/',
        },
      ],
    },
    {
      name: 'Philippines',
      flag: '🇵🇭',
      region: 'Asia',
      difficulty: 'Easy',
      difficulty_score: 2,
      visa_options: [
        'Special Resident Retiree Visa (SRRV)',
        '9(g) Pre-Arranged Employment Visa',
        'Special Investor Resident Visa',
        'Student Visa',
      ],
      job_market: 'Weak',
      popular_cities: [
        'Manila',
        'Cebu',
        'Davao',
        'Baguio',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'As Filipinas têm o inglês como língua oficial e oferecem o SRRV, residência renovável por tempo indeterminado para aposentados e investidores.',
          benefits: [
            'English is an official language and widely spoken',
            'Very low cost of living',
            'SRRV offers indefinite renewable residence',
            'Large archipelago with varied places to live',
          ],
          challenges: [
            'Limited local labour market for foreigners',
            'Frequent typhoons',
            'Congested infrastructure in Metro Manila',
          ],
          processing_time: '1–3 months',
          investment_required:
            'SRRV: deposit from US$10,000 for pensioners, higher for applicants without a pension',
          language_requirement:
            'Filipino and English are both official languages',
        },
        {
          language: 'en',
          description:
            'The Philippines has English as an official language and offers the SRRV, an indefinitely renewable residence for retirees and investors.',
          benefits: [
            'English is an official language and widely spoken',
            'Very low cost of living',
            'SRRV offers indefinite renewable residence',
            'Large archipelago with varied places to live',
          ],
          challenges: [
            'Limited local labour market for foreigners',
            'Frequent typhoons',
            'Congested infrastructure in Metro Manila',
          ],
          processing_time: '1–3 months',
          investment_required:
            'SRRV: deposit from US$10,000 for pensioners, higher for applicants without a pension',
          language_requirement:
            'Filipino and English are both official languages',
        },
        {
          language: 'es',
          description:
            'Filipinas tiene el inglés como lengua oficial y ofrece el SRRV, una residencia renovable indefinidamente para jubilados e inversores.',
          benefits: [
            'English is an official language and widely spoken',
            'Very low cost of living',
            'SRRV offers indefinite renewable residence',
            'Large archipelago with varied places to live',
          ],
          challenges: [
            'Limited local labour market for foreigners',
            'Frequent typhoons',
            'Congested infrastructure in Metro Manila',
          ],
          processing_time: '1–3 months',
          investment_required:
            'SRRV: deposit from US$10,000 for pensioners, higher for applicants without a pension',
          language_requirement:
            'Filipino and English are both official languages',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Tourist Visa / Visa Waiver',
          description:
            'Short-term entry for tourism, extendable in country for most nationalities.',
          source: 'https://immigration.gov.ph/',
        },
        {
          category: 'Pre-Arranged Employment Visa 9(g)',
          description: 'Work and residence visa tied to a Philippine employer.',
          source: 'https://immigration.gov.ph/',
        },
        {
          category: 'Special Resident Retiree Visa (SRRV)',
          description:
            'Indefinite renewable residence granted through a bank deposit, with reduced thresholds for pensioners.',
          source: 'https://pra.gov.ph/',
        },
        {
          category: 'Special Investor Resident Visa',
          description:
            'Residence granted through qualifying investment in a Philippine company.',
          source: 'https://boi.gov.ph/',
        },
      ],
    },
    {
      name: 'Taiwan',
      flag: '🇹🇼',
      region: 'Asia',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Employment Gold Card',
        'Work Permit and ARC',
        'Entrepreneur Visa',
        'Student Visa',
      ],
      job_market: 'Strong',
      popular_cities: [
        'Taipei',
        'Kaohsiung',
        'Taichung',
        'Tainan',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'Taiwan oferece o Employment Gold Card, que reúne visto, autorização de trabalho e residência num pedido só, com seguro de saúde universal bem avaliado.',
          benefits: [
            'Employment Gold Card bundles visa, work permit and residence in one application',
            'Universal health insurance rated among the best in the world',
            'Very high public safety',
            'Leading semiconductor and technology sector',
          ],
          challenges: [
            'Mandarin is demanding for most learners',
            'Exposure to typhoons and earthquakes',
            'Geopolitical uncertainty',
          ],
          processing_time: '1–2 months',
          investment_required:
            'The Gold Card is granted on professional criteria rather than a fixed investment amount',
          language_requirement:
            'Mandarin (English used in technology and academia)',
        },
        {
          language: 'en',
          description:
            'Taiwan offers the Employment Gold Card, which bundles visa, work permit and residence in a single application, with highly rated universal health insurance.',
          benefits: [
            'Employment Gold Card bundles visa, work permit and residence in one application',
            'Universal health insurance rated among the best in the world',
            'Very high public safety',
            'Leading semiconductor and technology sector',
          ],
          challenges: [
            'Mandarin is demanding for most learners',
            'Exposure to typhoons and earthquakes',
            'Geopolitical uncertainty',
          ],
          processing_time: '1–2 months',
          investment_required:
            'The Gold Card is granted on professional criteria rather than a fixed investment amount',
          language_requirement:
            'Mandarin (English used in technology and academia)',
        },
        {
          language: 'es',
          description:
            'Taiwán ofrece la Employment Gold Card, que reúne visado, permiso de trabajo y residencia en una sola solicitud, con un seguro de salud universal bien valorado.',
          benefits: [
            'Employment Gold Card bundles visa, work permit and residence in one application',
            'Universal health insurance rated among the best in the world',
            'Very high public safety',
            'Leading semiconductor and technology sector',
          ],
          challenges: [
            'Mandarin is demanding for most learners',
            'Exposure to typhoons and earthquakes',
            'Geopolitical uncertainty',
          ],
          processing_time: '1–2 months',
          investment_required:
            'The Gold Card is granted on professional criteria rather than a fixed investment amount',
          language_requirement:
            'Mandarin (English used in technology and academia)',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Visitor Visa',
          description:
            'Short-term entry for tourism or business, with duration depending on nationality.',
          source: 'https://www.boca.gov.tw/',
        },
        {
          category: 'Employment Gold Card',
          description:
            'Four-in-one card combining resident visa, work permit, residence card and re-entry permit for qualified professionals.',
          source: 'https://goldcard.nat.gov.tw/',
        },
        {
          category: 'Work Permit and Alien Resident Certificate',
          description:
            'Work authorisation tied to a Taiwanese employer, with a residence certificate.',
          source: 'https://www.immigration.gov.tw/',
        },
        {
          category: 'Permanent Residence (APRC)',
          description:
            'Available after five years of continuous legal residence with qualifying income.',
          source: 'https://www.immigration.gov.tw/',
        },
      ],
    },
    {
      name: 'Hong Kong',
      flag: '🇭🇰',
      region: 'Asia',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Top Talent Pass Scheme',
        'Quality Migrant Admission Scheme',
        'General Employment Policy',
        'Student Visa',
      ],
      job_market: 'Strong',
      popular_cities: [
        'Hong Kong Island',
        'Kowloon',
        'New Territories',
        'Sha Tin',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'Hong Kong oferece esquemas de talento como o Top Talent Pass, com tributação baixa e residência permanente após sete anos de permanência contínua.',
          benefits: [
            'Low and simple personal tax rates',
            'Major global financial hub',
            'English widely used in business and government',
            'Permanent residence after seven years of continuous stay',
          ],
          challenges: [
            'Among the most expensive housing markets in the world',
            'Very small average living spaces',
            'Political changes since 2020 have shifted the environment',
          ],
          processing_time: '4–8 weeks',
          investment_required:
            'Talent schemes are points or credential based rather than investment based',
          language_requirement:
            'Cantonese and English are both official languages',
        },
        {
          language: 'en',
          description:
            'Hong Kong offers talent schemes such as the Top Talent Pass, with low taxation and permanent residence after seven years of continuous stay.',
          benefits: [
            'Low and simple personal tax rates',
            'Major global financial hub',
            'English widely used in business and government',
            'Permanent residence after seven years of continuous stay',
          ],
          challenges: [
            'Among the most expensive housing markets in the world',
            'Very small average living spaces',
            'Political changes since 2020 have shifted the environment',
          ],
          processing_time: '4–8 weeks',
          investment_required:
            'Talent schemes are points or credential based rather than investment based',
          language_requirement:
            'Cantonese and English are both official languages',
        },
        {
          language: 'es',
          description:
            'Hong Kong ofrece esquemas de talento como el Top Talent Pass, con baja tributación y residencia permanente tras siete años de estancia continua.',
          benefits: [
            'Low and simple personal tax rates',
            'Major global financial hub',
            'English widely used in business and government',
            'Permanent residence after seven years of continuous stay',
          ],
          challenges: [
            'Among the most expensive housing markets in the world',
            'Very small average living spaces',
            'Political changes since 2020 have shifted the environment',
          ],
          processing_time: '4–8 weeks',
          investment_required:
            'Talent schemes are points or credential based rather than investment based',
          language_requirement:
            'Cantonese and English are both official languages',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Visitor Entry',
          description:
            'Visa-free or visa-required short entry for tourism, depending on nationality.',
          source: 'https://www.immd.gov.hk/eng/',
        },
        {
          category: 'General Employment Policy',
          description:
            'Employment visa for professionals with a confirmed offer from a Hong Kong employer.',
          source: 'https://www.immd.gov.hk/eng/',
        },
        {
          category: 'Top Talent Pass Scheme',
          description:
            'Two-year visa for high earners and graduates of top-ranked universities, without a prior job offer.',
          source: 'https://www.immd.gov.hk/eng/',
        },
        {
          category: 'Right of Abode',
          description:
            'Permanent residence granted after seven years of continuous ordinary residence.',
          source: 'https://www.immd.gov.hk/eng/',
        },
      ],
    },
    {
      name: 'China',
      flag: '🇨🇳',
      region: 'Asia',
      difficulty: 'Hard',
      difficulty_score: 4,
      visa_options: [
        'Z Work Visa and Residence Permit',
        'R Visa for High-Level Talent',
        'X1 Student Visa',
        'Permanent Residence',
      ],
      job_market: 'Moderate',
      popular_cities: [
        'Shanghai',
        'Beijing',
        'Shenzhen',
        'Guangzhou',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'A China concede o visto Z de trabalho com autorização de residência e o visto R para talentos de alto nível, com mercado interno vasto e infraestrutura avançada.',
          benefits: [
            'Vast domestic market and career opportunities',
            'Advanced infrastructure and extensive high-speed rail',
            'Low cost of living outside the first-tier cities',
            'Strong demand for specialised foreign professionals',
          ],
          challenges: [
            'Permanent residence is notoriously difficult to obtain',
            'Significant language barrier outside international companies',
            'Internet restrictions and limited administrative transparency',
          ],
          processing_time: '1–3 months',
          investment_required:
            'Work routes require an employer; permanent residence thresholds are set regionally',
          language_requirement:
            'Mandarin (required for most roles outside multinationals)',
        },
        {
          language: 'en',
          description:
            'China grants the Z work visa with a residence permit and the R visa for high-level talent, with a vast domestic market and advanced infrastructure.',
          benefits: [
            'Vast domestic market and career opportunities',
            'Advanced infrastructure and extensive high-speed rail',
            'Low cost of living outside the first-tier cities',
            'Strong demand for specialised foreign professionals',
          ],
          challenges: [
            'Permanent residence is notoriously difficult to obtain',
            'Significant language barrier outside international companies',
            'Internet restrictions and limited administrative transparency',
          ],
          processing_time: '1–3 months',
          investment_required:
            'Work routes require an employer; permanent residence thresholds are set regionally',
          language_requirement:
            'Mandarin (required for most roles outside multinationals)',
        },
        {
          language: 'es',
          description:
            'China concede el visado Z de trabajo con permiso de residencia y el visado R para talento de alto nivel, con un vasto mercado interno e infraestructura avanzada.',
          benefits: [
            'Vast domestic market and career opportunities',
            'Advanced infrastructure and extensive high-speed rail',
            'Low cost of living outside the first-tier cities',
            'Strong demand for specialised foreign professionals',
          ],
          challenges: [
            'Permanent residence is notoriously difficult to obtain',
            'Significant language barrier outside international companies',
            'Internet restrictions and limited administrative transparency',
          ],
          processing_time: '1–3 months',
          investment_required:
            'Work routes require an employer; permanent residence thresholds are set regionally',
          language_requirement:
            'Mandarin (required for most roles outside multinationals)',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Tourist Visa (L)',
          description:
            'Short-term entry for tourism, with duration depending on nationality and consulate.',
          source: 'https://www.nia.gov.cn/',
        },
        {
          category: 'Work Visa (Z) and Residence Permit',
          description:
            'Employment visa converted into a residence permit after arrival, tied to the employer.',
          source: 'https://www.nia.gov.cn/',
        },
        {
          category: 'Talent Visa (R)',
          description:
            'Visa for high-level foreign talent in fields prioritised by the state.',
          source: 'https://www.nia.gov.cn/',
        },
        {
          category: 'Permanent Residence',
          description:
            'Indefinite residence granted to a limited number of applicants by investment, employment or family ties.',
          source: 'https://www.nia.gov.cn/',
        },
      ],
    },
    {
      name: 'India',
      flag: '🇮🇳',
      region: 'Asia',
      difficulty: 'Hard',
      difficulty_score: 4,
      visa_options: [
        'Employment Visa',
        'Business Visa',
        'Overseas Citizen of India (OCI)',
        'Student Visa',
      ],
      job_market: 'Moderate',
      popular_cities: [
        'Bengaluru',
        'Mumbai',
        'Delhi',
        'Hyderabad',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'A Índia usa amplamente o inglês em contexto profissional e oferece o visto de emprego e o status OCI, que garante entrada vitalícia a pessoas de origem indiana.',
          benefits: [
            'English widely used in professional and official settings',
            'Very low cost of living',
            'Large and fast-growing technology sector',
            'OCI status offers lifelong entry for people of Indian origin',
          ],
          challenges: [
            'No general path to citizenship for foreigners',
            'Heavy and paper-based bureaucracy',
            'Air quality and infrastructure strain in the major cities',
          ],
          processing_time: '2–6 weeks',
          investment_required:
            'Employment visa requires an annual salary above the statutory threshold',
          language_requirement:
            'English is widely used in business and administration',
        },
        {
          language: 'en',
          description:
            'India uses English widely in professional settings and offers the employment visa and OCI status, which grants lifelong entry to people of Indian origin.',
          benefits: [
            'English widely used in professional and official settings',
            'Very low cost of living',
            'Large and fast-growing technology sector',
            'OCI status offers lifelong entry for people of Indian origin',
          ],
          challenges: [
            'No general path to citizenship for foreigners',
            'Heavy and paper-based bureaucracy',
            'Air quality and infrastructure strain in the major cities',
          ],
          processing_time: '2–6 weeks',
          investment_required:
            'Employment visa requires an annual salary above the statutory threshold',
          language_requirement:
            'English is widely used in business and administration',
        },
        {
          language: 'es',
          description:
            'India usa ampliamente el inglés en el ámbito profesional y ofrece el visado de empleo y el estatus OCI, que garantiza entrada vitalicia a personas de origen indio.',
          benefits: [
            'English widely used in professional and official settings',
            'Very low cost of living',
            'Large and fast-growing technology sector',
            'OCI status offers lifelong entry for people of Indian origin',
          ],
          challenges: [
            'No general path to citizenship for foreigners',
            'Heavy and paper-based bureaucracy',
            'Air quality and infrastructure strain in the major cities',
          ],
          processing_time: '2–6 weeks',
          investment_required:
            'Employment visa requires an annual salary above the statutory threshold',
          language_requirement:
            'English is widely used in business and administration',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Tourist Visa / e-Visa',
          description:
            'Short-term entry for tourism, issued online for most nationalities.',
          source: 'https://indianvisaonline.gov.in/',
        },
        {
          category: 'Employment Visa',
          description:
            'Work visa tied to an Indian employer, subject to a minimum salary threshold.',
          source: 'https://indianfrro.gov.in/',
        },
        {
          category: 'Business Visa',
          description:
            'Entry for commercial activity without taking up local employment.',
          source: 'https://indianvisaonline.gov.in/',
        },
        {
          category: 'Overseas Citizen of India (OCI)',
          description:
            'Lifelong visa and residence rights for people of Indian origin and their spouses.',
          source: 'https://ociservices.gov.in/',
        },
      ],
    },
    {
      name: 'Saudi Arabia',
      flag: '🇸🇦',
      region: 'Asia',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Premium Residency',
        'Work Visa and Iqama',
        'Investor Visa',
        'Student Visa',
      ],
      job_market: 'Strong',
      popular_cities: [
        'Riyadh',
        'Jeddah',
        'Dammam',
        'Al Khobar',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'A Arábia Saudita oferece a Premium Residency, que dispensa patrocinador local, sem imposto de renda sobre pessoa física e com forte demanda por profissionais especializados.',
          benefits: [
            'No personal income tax',
            'Premium Residency removes the need for a local sponsor',
            'Rapid economic diversification under Vision 2030',
            'High salaries for specialised professionals',
          ],
          challenges: [
            'Most work visas remain tied to an employer sponsor',
            'Strict social and legal norms',
            'Extreme summer heat',
          ],
          processing_time: '1–3 months',
          investment_required:
            'Premium Residency: one-off fee of SAR 800,000, or SAR 100,000 per year for the renewable tier',
          language_requirement: 'Arabic (English used in many corporate roles)',
        },
        {
          language: 'en',
          description:
            'Saudi Arabia offers Premium Residency, which removes the need for a local sponsor, with no personal income tax and strong demand for specialised professionals.',
          benefits: [
            'No personal income tax',
            'Premium Residency removes the need for a local sponsor',
            'Rapid economic diversification under Vision 2030',
            'High salaries for specialised professionals',
          ],
          challenges: [
            'Most work visas remain tied to an employer sponsor',
            'Strict social and legal norms',
            'Extreme summer heat',
          ],
          processing_time: '1–3 months',
          investment_required:
            'Premium Residency: one-off fee of SAR 800,000, or SAR 100,000 per year for the renewable tier',
          language_requirement: 'Arabic (English used in many corporate roles)',
        },
        {
          language: 'es',
          description:
            'Arabia Saudí ofrece la Premium Residency, que elimina la necesidad de un patrocinador local, sin impuesto sobre la renta personal y con fuerte demanda de profesionales especializados.',
          benefits: [
            'No personal income tax',
            'Premium Residency removes the need for a local sponsor',
            'Rapid economic diversification under Vision 2030',
            'High salaries for specialised professionals',
          ],
          challenges: [
            'Most work visas remain tied to an employer sponsor',
            'Strict social and legal norms',
            'Extreme summer heat',
          ],
          processing_time: '1–3 months',
          investment_required:
            'Premium Residency: one-off fee of SAR 800,000, or SAR 100,000 per year for the renewable tier',
          language_requirement: 'Arabic (English used in many corporate roles)',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Visit Visa / Tourist e-Visa',
          description:
            'Short-term entry for tourism or business, issued online for eligible nationalities.',
          source: 'https://visa.mofa.gov.sa/',
        },
        {
          category: 'Work Visa and Iqama',
          description:
            'Employment visa converted into a residence permit sponsored by the employer.',
          source: 'https://www.moi.gov.sa/',
        },
        {
          category: 'Premium Residency',
          description:
            'Residence without a local sponsor, in a permanent tier or an annually renewable tier.',
          source: 'https://www.moi.gov.sa/',
        },
        {
          category: 'Investor Visa',
          description:
            'Residence granted through qualifying investment in a Saudi company or project.',
          source: 'https://misa.gov.sa/',
        },
      ],
    },
    {
      name: 'South Africa',
      flag: '🇿🇦',
      region: 'Africa',
      difficulty: 'Moderate',
      difficulty_score: 3,
      visa_options: [
        'Critical Skills Work Visa',
        'General Work Visa',
        'Business Visa',
        'Permanent Residence',
      ],
      job_market: 'Moderate',
      popular_cities: [
        'Cape Town',
        'Johannesburg',
        'Durban',
        'Pretoria',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'A África do Sul oferece o Critical Skills Work Visa com caminho para residência permanente, com o inglês entre as línguas oficiais e custo de vida baixo.',
          benefits: [
            'English widely spoken across business and administration',
            'Low cost of living by Western standards',
            'Established permanent residence route for critical skills',
            'Outstanding natural environment and climate',
          ],
          challenges: [
            'High crime rates in several major cities',
            'Electricity load shedding and infrastructure instability',
            'Slow and unpredictable visa processing',
          ],
          processing_time: '2–6 months',
          investment_required:
            'Business visa: from ZAR 5,000,000 in capital, with exemptions for priority sectors',
          language_requirement:
            'English is one of the official languages and dominant in business',
        },
        {
          language: 'en',
          description:
            'South Africa offers the Critical Skills Work Visa with a path to permanent residence, with English among the official languages and a low cost of living.',
          benefits: [
            'English widely spoken across business and administration',
            'Low cost of living by Western standards',
            'Established permanent residence route for critical skills',
            'Outstanding natural environment and climate',
          ],
          challenges: [
            'High crime rates in several major cities',
            'Electricity load shedding and infrastructure instability',
            'Slow and unpredictable visa processing',
          ],
          processing_time: '2–6 months',
          investment_required:
            'Business visa: from ZAR 5,000,000 in capital, with exemptions for priority sectors',
          language_requirement:
            'English is one of the official languages and dominant in business',
        },
        {
          language: 'es',
          description:
            'Sudáfrica ofrece el Critical Skills Work Visa con vía a la residencia permanente, con el inglés entre las lenguas oficiales y un bajo coste de vida.',
          benefits: [
            'English widely spoken across business and administration',
            'Low cost of living by Western standards',
            'Established permanent residence route for critical skills',
            'Outstanding natural environment and climate',
          ],
          challenges: [
            'High crime rates in several major cities',
            'Electricity load shedding and infrastructure instability',
            'Slow and unpredictable visa processing',
          ],
          processing_time: '2–6 months',
          investment_required:
            'Business visa: from ZAR 5,000,000 in capital, with exemptions for priority sectors',
          language_requirement:
            'English is one of the official languages and dominant in business',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Visitor Visa',
          description:
            'Short-term entry for tourism or business, with duration depending on nationality.',
          source: 'https://www.dha.gov.za/',
        },
        {
          category: 'Critical Skills Work Visa',
          description:
            'Work visa for occupations on the national critical skills list, with a route to permanent residence.',
          source: 'https://www.dha.gov.za/',
        },
        {
          category: 'General Work Visa',
          description:
            'Work visa tied to an employer that has demonstrated no suitable local candidate.',
          source: 'https://www.dha.gov.za/',
        },
        {
          category: 'Permanent Residence',
          description:
            'Indefinite residence granted through critical skills, business, family ties or five years of work.',
          source: 'https://www.dha.gov.za/',
        },
      ],
    },
    {
      name: 'Morocco',
      flag: '🇲🇦',
      region: 'Africa',
      difficulty: 'Easy',
      difficulty_score: 2,
      visa_options: [
        'Carte de Séjour (Residence Card)',
        'Work Permit',
        'Investor Residence',
        'Student Residence',
      ],
      job_market: 'Weak',
      popular_cities: [
        'Casablanca',
        'Marrakesh',
        'Rabat',
        'Tangier',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'O Marrocos permite entrada sem visto por até 90 dias para muitas nacionalidades e concede a Carte de Séjour, com custo de vida baixo e francês amplamente falado.',
          benefits: [
            'Visa-free entry for many nationalities for up to 90 days',
            'Very low cost of living',
            'Close proximity and short flights to Europe',
            'French widely spoken in business and administration',
          ],
          challenges: [
            'Limited local labour market for foreigners',
            'Slow and paper-based bureaucracy',
            'Arabic or French is needed for daily life',
          ],
          processing_time: '2–4 months',
          investment_required:
            'Residence requires proof of sufficient means; investor thresholds vary by sector',
          language_requirement:
            'Arabic and Amazigh official; French widely used in business',
        },
        {
          language: 'en',
          description:
            'Morocco allows visa-free entry for up to 90 days for many nationalities and grants the Carte de Séjour, with a low cost of living and French widely spoken.',
          benefits: [
            'Visa-free entry for many nationalities for up to 90 days',
            'Very low cost of living',
            'Close proximity and short flights to Europe',
            'French widely spoken in business and administration',
          ],
          challenges: [
            'Limited local labour market for foreigners',
            'Slow and paper-based bureaucracy',
            'Arabic or French is needed for daily life',
          ],
          processing_time: '2–4 months',
          investment_required:
            'Residence requires proof of sufficient means; investor thresholds vary by sector',
          language_requirement:
            'Arabic and Amazigh official; French widely used in business',
        },
        {
          language: 'es',
          description:
            'Marruecos permite la entrada sin visado hasta 90 días para muchas nacionalidades y concede la Carte de Séjour, con bajo coste de vida y francés ampliamente hablado.',
          benefits: [
            'Visa-free entry for many nationalities for up to 90 days',
            'Very low cost of living',
            'Close proximity and short flights to Europe',
            'French widely spoken in business and administration',
          ],
          challenges: [
            'Limited local labour market for foreigners',
            'Slow and paper-based bureaucracy',
            'Arabic or French is needed for daily life',
          ],
          processing_time: '2–4 months',
          investment_required:
            'Residence requires proof of sufficient means; investor thresholds vary by sector',
          language_requirement:
            'Arabic and Amazigh official; French widely used in business',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Tourist Entry',
          description:
            'Visa-free or visa-required short entry for tourism, depending on nationality.',
          source: 'https://www.consulat.ma/',
        },
        {
          category: 'Carte de Séjour (Residence Card)',
          description:
            'Residence card for stays beyond 90 days, renewable and tied to a declared purpose.',
          source: 'https://www.consulat.ma/',
        },
        {
          category: 'Work Permit',
          description:
            'Employment authorisation validated by the labour authorities and tied to a Moroccan employer.',
          source: 'https://www.emploi.gov.ma/',
        },
        {
          category: 'Long-Term Residence Card',
          description:
            'Ten-year renewable card available after several years of continuous legal residence.',
          source: 'https://www.consulat.ma/',
        },
      ],
    },
    {
      name: 'Egypt',
      flag: '🇪🇬',
      region: 'Africa',
      difficulty: 'Easy',
      difficulty_score: 2,
      visa_options: [
        'Residence by Investment',
        'Work Permit',
        'Tourist Residence Permit',
        'Student Residence',
      ],
      job_market: 'Weak',
      popular_cities: [
        'Cairo',
        'Alexandria',
        'Giza',
        'Hurghada',
      ],
      created_at: '2026-08-05T00:00:00Z',
      updated_at: '2026-08-05T00:00:00Z',
      // Intentionally blank: artwork will be uploaded to R2 manually.
      background_image: '',
      translations: [
        {
          language: 'pt',
          description:
            'O Egito oferece residência por investimento com caminho para cidadania, custo de vida muito baixo e clima quente o ano inteiro.',
          benefits: [
            'Very low cost of living',
            'Residence by investment route with a path to citizenship',
            'Warm climate throughout the year',
            'Major historical and archaeological heritage',
          ],
          challenges: [
            'Heavy bureaucracy',
            'Currency volatility',
            'Limited local labour market for foreigners',
          ],
          processing_time: '1–3 months',
          investment_required:
            'Residence by property purchase: US$50,000 for one year, US$100,000 for three, US$200,000 for five',
          language_requirement:
            'Arabic (English used in international business)',
        },
        {
          language: 'en',
          description:
            'Egypt offers residence by investment with a path to citizenship, a very low cost of living and a warm climate year round.',
          benefits: [
            'Very low cost of living',
            'Residence by investment route with a path to citizenship',
            'Warm climate throughout the year',
            'Major historical and archaeological heritage',
          ],
          challenges: [
            'Heavy bureaucracy',
            'Currency volatility',
            'Limited local labour market for foreigners',
          ],
          processing_time: '1–3 months',
          investment_required:
            'Residence by property purchase: US$50,000 for one year, US$100,000 for three, US$200,000 for five',
          language_requirement:
            'Arabic (English used in international business)',
        },
        {
          language: 'es',
          description:
            'Egipto ofrece residencia por inversión con vía a la ciudadanía, un coste de vida muy bajo y clima cálido todo el año.',
          benefits: [
            'Very low cost of living',
            'Residence by investment route with a path to citizenship',
            'Warm climate throughout the year',
            'Major historical and archaeological heritage',
          ],
          challenges: [
            'Heavy bureaucracy',
            'Currency volatility',
            'Limited local labour market for foreigners',
          ],
          processing_time: '1–3 months',
          investment_required:
            'Residence by property purchase: US$50,000 for one year, US$100,000 for three, US$200,000 for five',
          language_requirement:
            'Arabic (English used in international business)',
        },
      ],
      immigration_visa_types: [
        {
          category: 'Tourist Visa / e-Visa',
          description:
            'Short-term entry for tourism, issued online or on arrival for many nationalities.',
          source: 'https://visa2egypt.gov.eg/',
        },
        {
          category: 'Tourist Residence Permit',
          description:
            'Renewable residence permit for long-stay visitors without local employment.',
          source: 'https://www.moi.gov.eg/',
        },
        {
          category: 'Work Permit and Residence',
          description:
            'Employment authorisation tied to an Egyptian employer, with matching residence.',
          source: 'https://www.manpower.gov.eg/',
        },
        {
          category: 'Residence by Investment',
          description:
            'Residence granted by tier through deposit, property or business investment, with a route to citizenship.',
          source: 'https://www.gafi.gov.eg/',
        },
      ],
    },
  ];

  for (const countryData of countries) {
    const { translations, immigration_visa_types, ...countryInfo } =
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

    if (translations) {
      for (const translation of translations) {
        const { language, ...copy } = translation;

        await prisma.countryTranslation.upsert({
          where: {
            country_id_language: { country_id: country.id, language },
          },
          update: copy,
          create: { country_id: country.id, language, ...copy },
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
