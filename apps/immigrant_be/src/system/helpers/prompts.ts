export function buildCountriesMatchPrompt(
  userInformation: string,
  availableCountries: string[],
): string {
  return `
  Você é um assistente especializado em imigração internacional.
  
  Sua tarefa é analisar os dados fornecidos pelo usuário e recomendar **exatamente 3 países** para imigração, escolhendo apenas entre a lista abaixo de países disponíveis:
  
  ### Informações do usuário:
  ${userInformation}

  ### Lista de países disponíveis:
  ${availableCountries.join(', ')}
  
  ### Regras importantes:
  - Responda **somente em JSON válido** (sem texto adicional).
  - Faca um parse do JSON para garantir que ele esteja no formato correto.
  - O JSON deve seguir estritamente o formato abaixo:
  
  {
    "suggestions": [
      {
        "country": "Nome do país (deve estar na lista acima)",
        "compatibility": 0-100,
        "reasons": ["motivo 1", "motivo 2", "motivo 3"],
        "cities": ["Cidade A", "Cidade B"],
        "visa_options": ["Tipo de visto 1", "Tipo de visto 2", "Tipo de visto 3"],
        "languages": ["Portugues", "Espanhol", "Inglês"],
        "investment_required": "$ 10.000,00 - $ 20.000,00",
        "average_visa_processing_time": "6-12 meses",
        "job_market": "Hight",
        "education_quality": "High",
        "difficulty": "High",
        "health_care": "High"
      },
      ...
    ]
  }
  
  ### Critérios para calcular a compatibilidade:
  - Qualidade de vida
  - Idioma
  - Cultura e integração social
  - Mercado de trabalho
  - Clima
  - Oportunidades de visto ou residência
  - Metas pessoais e profissionais
  - O job market deve ser "High", "Medium" ou "Low"
  - A education quality deve ser "High", "Medium" ou "Low"
  - A difficulty deve ser "High", "Medium" ou "Low" 
  - A health care deve ser "High", "Medium" ou "Low"
  
  ### Exemplo de saída (apenas referência):
  {
    "suggestions": [
      {
        "country": "Canadá",
        "compatibility": 93,
        "reasons": [
          "Política de imigração favorável para profissionais da área de tecnologia",
          "Alta qualidade de vida e segurança",
          "Clima semelhante ao desejado"
        ],
        "cities": ["Toronto", "Vancouver", "Calgary"],
        "visa_options": ["Express Entry", "Work Permit", "Study Permit"],
        "languages": ["Inglês", "Francês", "Espanhol"],
        "investment_required": "$ 10.000,00 - $ 20.000,00",
        "average_visa_processing_time": "6-12 months",
        "job_market": "High",
        "education_quality": "High",
        "difficulty": "High",
        "health_care": "High"
      },
      {
        "country": "Alemanha",
        "compatibility": 86,
        "reasons": [
          "Forte mercado de trabalho para engenheiros",
          "Sistema de saúde e educação pública eficientes",
          "Alta compatibilidade cultural com o perfil descrito"
        ],
        "cities": ["Berlim", "Munique", "Hamburgo"],
        "visa_options": ["Blue Card", "Job Seeker Visa"],
        "languages": ["Alemão", "Inglês", "Espanhol"],
        "investment_required": "$ 10.000,00 - $ 20.000,00",
        "average_visa_processing_time": "6-12 months",
        "job_market": "High",
        "education_quality": "High",
        "difficulty": "High",
        "health_care": "High"
      },
      {
        "country": "Portugal",
        "compatibility": 79,
        "reasons": [
          "Idioma português e acolhimento a imigrantes brasileiros",
          "Processo de residência acessível",
          "Custo de vida razoável para o padrão europeu"
        ],
        "cities": ["Lisboa", "Porto", "Braga"],
        "visa_options": ["Visto D7", "Visto de Trabalho", "Golden Visa"],
        "languages": ["Português", "Espanhol", "Inglês"],
        "investment_required": "$ 10.000,00 - $ 20.000,00",
        "average_visa_processing_time": "6-12 months",
        "job_market": "High",
        "education_quality": "High",
        "difficulty": "High",
        "health_care": "High"
      }
    ]
  }
  `;
}
