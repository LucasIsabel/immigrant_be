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

### Idioma da resposta:
${language}

Escreva **todo o conteúdo** neste idioma — motivos, cidades, opções de visto,
tudo. Com **uma exceção**, descrita a seguir.

### Lista de países disponíveis (use somente estes):
${availableCountries.join(', ')}

### A exceção: o campo \`country\`

O campo \`country\` é **identificador, não texto de tela**. Copie o nome
**exatamente como aparece na lista acima**, em inglês, caractere por caractere.
Não traduza, não adapte, não acrescente nem remova nada.

Para exibir o nome no idioma do usuário existe um campo separado,
\`country_label\`. É lá que vai "Nova Zelândia"; em \`country\` vai
"New Zealand".

Se você traduzir o \`country\`, o sistema não encontra o país e a resposta
chega ao usuário sem foto, sem bandeira e sem os vistos disponíveis.

### Gere um JSON EXATO com o formato a seguir:
{
  "suggestions": [
    {
      "country": "nome EXATO da lista acima, sempre em inglês",
      "country_label": "o mesmo país escrito no idioma da resposta",
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

### Regra de diversificação:
O usuário mencionou interesse em um ou mais países específicos. **Evite** incluir esses países nas 3 recomendações, pois o objetivo é apresentar alternativas que o usuário talvez não tenha considerado. A única exceção é se o perfil do usuário se encaixar excepcionalmente bem nesse país em **todos** os critérios objetivos — nesse caso, inclua-o com uma explicação clara do motivo.

Agora gere **somente o JSON**.
  `;
}
