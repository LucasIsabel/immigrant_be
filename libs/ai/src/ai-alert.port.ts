/**
 * Por onde o roteador avisa que algo merece atenção humana, sem saber como.
 *
 * O `AiRouterService` vive em `libs/ai`, compartilhado entre a API e o worker, e
 * o `EventsService` é do microservice — importá-lo aqui inverteria a dependência
 * e amarraria a lib a um dos dois processos. A lib publica a porta; quem tem o
 * canal fornece a implementação.
 *
 * É opcional de propósito: um processo que não fornece nada continua funcionando,
 * só sem alarme. Perder um aviso é ruim; deixar de gerar conteúdo porque o canal
 * de aviso não existe seria pior.
 */
export const AI_ALERT_SINK = 'AI_ALERT_SINK';

export interface AiAlertSink {
  /**
   * O OpenRouter reportou 402 e a cadeia caiu para o fallback.
   *
   * Nada quebra quando isso acontece — e é justamente esse o problema. O
   * conteúdo continua saindo, por um modelo diferente do configurado, com custo
   * e qualidade diferentes, e sem este aviso ninguém fica sabendo até estranhar
   * o resultado.
   */
  creditsExhausted(input: { blockedUntil: Date }): Promise<void>;
}
