import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

const categories = [
  { name: 'Vistos e Permissões', slug: 'vistos-e-permissoes' },
  { name: 'Processos por País', slug: 'processos-por-pais' },
  { name: 'Custo de Vida', slug: 'custo-de-vida' },
  { name: 'Trabalho e Mercado Profissional', slug: 'trabalho-e-mercado-profissional' },
  { name: 'Documentação e Burocracia', slug: 'documentacao-e-burocracia' },
  { name: 'Planejamento Financeiro', slug: 'planejamento-financeiro' },
  { name: 'Estudo no Exterior', slug: 'estudo-no-exterior' },
  { name: 'Empreender no Exterior', slug: 'empreender-no-exterior' },
  { name: 'Mudanças na Lei e Atualizações Oficiais', slug: 'mudancas-na-lei-e-atualizacoes-oficiais' },
  { name: 'Guias Passo a Passo', slug: 'guias-passo-a-passo' },
  { name: 'Erros Comuns no Processo', slug: 'erros-comuns-no-processo' },
  { name: 'Validação de Diploma e Profissões Regulamentadas', slug: 'validacao-de-diploma-e-profissoes-regulamentadas' },
  { name: 'Moradia e Primeiros Passos', slug: 'moradia-e-primeiros-passos' },
  { name: 'Sistema de Saúde', slug: 'sistema-de-saude' },
  { name: 'Educação para Filhos', slug: 'educacao-para-filhos' },
  { name: 'Impostos para Imigrantes', slug: 'impostos-para-imigrantes' },
  { name: 'Cidadania e Residência Permanente', slug: 'cidadania-e-residencia-permanente' },
  { name: 'Entrevistas e Histórias Reais', slug: 'entrevistas-e-historias-reais' },
  { name: 'Ferramentas e Recursos Úteis', slug: 'ferramentas-e-recursos-uteis' },
];

export async function seedBlogCategories() {
  console.log('Seeding blog categories...');

  for (const category of categories) {
    await prisma.blogCategory.upsert({
      where: { slug: category.slug },
      create: category,
      update: { name: category.name },
    });
  }

  console.log(`Seeded ${categories.length} blog categories.`);
}
