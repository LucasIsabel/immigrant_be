export enum StepType {
  TARGET = 'TARGET',
  ENGLISH = 'ENGLISH',
  BUDGET = 'BUDGET',
  EDUCATION = 'EDUCATION',
  PROFESSIONAL = 'PROFESSIONAL',
  CLIMATE = 'CLIMATE',
  FAMILY = 'FAMILY',
  COUNTRY = 'COUNTRY',
  /**
   * Passaporte do usuário.
   *
   * O prompt de match já manda a IA considerar "vistos ou oportunidades de
   * residência" como critério, e isso é impossível de avaliar sem saber a
   * nacionalidade: elegibilidade, acordos (Mercosul, livre circulação na UE),
   * vistos de ascendência e tempo de processamento são todos função do
   * passaporte. Sem este passo, dois perfis idênticos com passaportes
   * diferentes recebiam a mesma resposta.
   */
  NATIONALITY = 'NATIONALITY',
}
