-- Apenas um índice: aditivo, sem bloqueio de escrita relevante nesta escala, e
-- invisível para o código antigo. Pode ser aplicado antes do merge.
--
-- CONCURRENTLY seria o certo numa tabela grande e não é possível aqui: o Prisma
-- envolve cada migration numa transação, e o Postgres recusa CREATE INDEX
-- CONCURRENTLY dentro de uma. Com o volume atual (um negócio em produção) o
-- bloqueio é instantâneo; se um dia a tabela crescer, este índice cria-se à mão.

-- CreateIndex
CREATE INDEX "businesses_lat_lng_idx" ON "businesses"("lat", "lng");
