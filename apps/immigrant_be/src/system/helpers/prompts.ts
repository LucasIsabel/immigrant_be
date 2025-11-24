export function buildCountriesMatchPrompt(
  userInformation: string,
  availableCountries: string[],
  language: string,
): string {
  return `Você é um assistente especializado em imigração internacional.

Sua tarefa:
Com base nas informações do usuário, selecione **exatamente 3 países**, escolhidos **somente** da lista fornecida, e gere a resposta **EXCLUSIVAMENTE em JSON válido**.

NÃO escreva explicações, comentários, introduções ou texto fora do JSON.

### Informações do usuário:
${userInformation}

### Idioma para toda a resposta:
${language}

### Lista de países disponíveis (use somente estes):
${availableCountries.join(', ')}

### Gere um JSON EXATO com o formato a seguir:
{
  "suggestions": [
    {
      "country": "um país da lista disponível",
      "compatibility": número inteiro entre 0 e 100,
      "reasons": ["motivo 1", "motivo 2", "motivo 3"],
      "cities": ["cidade 1", "cidade 2"],
      "visa_options": ["opção 1", "opção 2", "opção 3"],
      "languages": ["idioma 1", "idioma 2"],
      "investment_required": "string",
      "average_visa_processing_time": "string",
      "job_market": "High" | "Medium" | "Low",
      "education_quality": "High" | "Medium" | "Low",
      "difficulty": "High" | "Medium" | "Low",
      "health_care": "High" | "Medium" | "Low"
    }
  ]
}

### Critérios que você deve considerar para calcular compatibilidade:
- Qualidade de vida
- Idioma
- Cultura e integração social
- Mercado de trabalho
- Clima
- Vistos ou oportunidades de residência
- Metas pessoais e profissionais

Agora gere **somente o JSON**.
  `;
}
