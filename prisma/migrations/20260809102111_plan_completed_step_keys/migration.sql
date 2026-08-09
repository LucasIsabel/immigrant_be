-- O plano deixa de guardar uma cópia dos steps e passa a guardar só a
-- identidade do que foi concluído. O texto vive em `visa_steps`, uma linha por
-- idioma, e é resolvido na leitura — é isso que faz a troca de idioma preservar
-- o progresso.
--
-- Wipe decidido em 2026-08-08: os 8 planos em produção são dado de teste do
-- próprio Lucas (2 usuários, ambos ele, 0 documentos, nenhuma FK apontando para
-- `plans`). O formato antigo guardava a conclusão indexada pelo nome traduzido
-- do step, sem chave — não é convertível para chaves estáveis sem adivinhação,
-- e não há nada aqui que valha preservar.
--
-- O DELETE vem antes do ALTER de propósito: se rodasse depois, planos criados
-- entre o deploy e a limpeza ficariam com `completed_step_keys` vazio e sem os
-- blobs antigos, ou seja, silenciosamente sem progresso.
DELETE FROM "plans";

-- AlterTable
ALTER TABLE "plans" DROP COLUMN "steps",
DROP COLUMN "steps_completed",
DROP COLUMN "steps_remaining",
ADD COLUMN     "completed_step_keys" TEXT[] DEFAULT ARRAY[]::TEXT[];
