# Business Pages — Phase 2 Design: Templates

**Data:** 2026-03-29
**Escopo:** BE endpoint de página pública + FE templates base e tipo-específicos (scaffolding)

---

## Contexto

A Fase 1 entregou o schema de banco de dados (`business_pages`, `business_page_reviews`, `publisher_qualifications`), a migration, o endpoint `GET /api/v1/business-pages/check-slug` e a rota FE `/my-city/pg/[businessType]/[key]` (retornando 404 ainda).

A Fase 2 conecta a rota pública a dados reais e entrega templates renderizáveis.

---

## 1. Backend — Endpoint de Página Pública

### Endpoint

```
GET /api/v1/business-pages/public/:slug
```

**Comportamento:**
- Busca `BusinessPage` pelo campo `slug`
- Se não existir ou `status !== APPROVED` → retorna **404**
- Se existir e `status === APPROVED` → retorna o objeto da página

**Resposta (200):**
```typescript
interface BusinessPagePublicResponseDto {
  id: string;
  slug: string;
  businessType: string;  // ex: "restaurante"
  status: "APPROVED";
  approvedContent: BusinessPageContent;
  approvedAt: string;
}
```

**Módulo:** `BusinessPagesModule` (já existente)
- Adicionar método `findPublicBySlug(slug: string)` no `BusinessPagesRepository`
- Adicionar método `getPublicPage(slug: string)` no `BusinessPagesService`
- Adicionar `GET /business-pages/public/:slug` no `BusinessPagesController` com `@AllowAnonymous()`

---

## 2. Schema do `approved_content`

O campo `approved_content` (JSONB) segue esta interface TypeScript, compartilhada entre BE (validação de tipos) e FE (rendering):

```typescript
interface BusinessPageContent {
  // Campos base — compartilhados por todos os templates
  name: string;
  description?: string;
  logoUrl?: string;
  coverPhotoUrl?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  address?: string;
  city: string;
  lat?: number;
  lng?: number;
  openingHours?: {
    weekdays?: string;  // ex: "09:00–18:00"
    weekend?: string;   // ex: "10:00–14:00" | "Fechado"
  };

  // Conteúdo tipo-específico — definido na Fase 3
  typeData?: Record<string, unknown>;
}
```

**Pré-população:** ao criar uma `BusinessPage`, o `approved_content` é inicializado com os campos equivalentes do `Business` (name, city, phone, email, address, lat, lng).

---

## 3. Frontend — Templates

### Estrutura de arquivos

```
components/my-city/BusinessPageTemplates/
├── BaseTemplate.tsx          ← header + badge + contatos + mapa + horários
├── ScaffoldPlaceholder.tsx   ← componente visual dashed-border para seções pendentes
├── RestauranteTemplate.tsx   ← base + scaffold cardápio
├── ClinicaTemplate.tsx       ← base + scaffold especialidades
├── LojaTemplate.tsx          ← base + scaffold vitrine
├── ServicoTemplate.tsx       ← base + scaffold serviços/portfólio
├── HotelTemplate.tsx         ← base + scaffold quartos
├── AcademiaTemplate.tsx      ← base + scaffold modalidades/grade
├── SalaoTemplate.tsx         ← base + scaffold serviços/agenda
└── index.ts                  ← mapa businessType → componente

lib/business-pages/
├── api.ts                    ← adicionar fetchPublicPage(slug): retorna null em 404
└── types.ts                  ← BusinessPageContent interface (compartilhada)
```

### BaseTemplate — seções

| Seção | Conteúdo |
|-------|----------|
| Header | logoUrl, name, businessType label, badge Aberto/Fechado |
| Contatos | Botões: Ligar (phone), WhatsApp, Email, Site |
| Mapa | Link para Google Maps (não embed — evita necessidade de API key). Se lat/lng disponível: `https://maps.google.com/?q={lat},{lng}`. Fallback: `https://maps.google.com/?q={address},{city}` |
| Horários | openingHours.weekdays e openingHours.weekend |
| Descrição | description (se presente) |

### Badge Aberto/Fechado

Calculado client-side com base em `openingHours`:
- Parseia o horário de hoje (weekday vs weekend)
- Compara com a hora atual do browser
- Exibe `🟢 Aberto` ou `🔴 Fechado`
- Fallback: badge não exibido se `openingHours` não estiver preenchido

### Templates tipo-específicos (scaffold)

Cada template importa e renderiza o `BaseTemplate` e adiciona uma seção scaffold com `border-dashed`:

```tsx
export function RestauranteTemplate({ content }: { content: BusinessPageContent }) {
  return (
    <>
      <BaseTemplate content={content} />
      <section className="...">
        {/* scaffold — cardápio em Fase 3 */}
        <ScaffoldPlaceholder label="Cardápio" />
      </section>
    </>
  );
}
```

### Roteamento de templates (`index.ts`)

```typescript
const TEMPLATE_MAP: Record<BusinessPageType, ComponentType<{ content: BusinessPageContent }>> = {
  restaurante: RestauranteTemplate,
  clinica: ClinicaTemplate,
  loja: LojaTemplate,
  servico: ServicoTemplate,
  hotel: HotelTemplate,
  academia: AcademiaTemplate,
  salao: SalaoTemplate,
};
```

### Atualização do `page.tsx`

```typescript
// app/my-city/pg/[businessType]/[key]/page.tsx
export default async function BusinessPublicPage({ params }) {
  const { businessType, key } = await params;
  if (!isValidBusinessPageType(businessType)) notFound();

  const page = await fetchPublicPage(key);  // retorna null se não APPROVED
  if (!page) notFound();

  const Template = TEMPLATE_MAP[businessType];
  return (
    <Layout>
      <Template content={page.approvedContent} />
    </Layout>
  );
}
```

---

## 4. Fora de escopo da Fase 2

- Formulário de edição de `approved_content` (Fase 3 — fluxo de submissão)
- Conteúdo completo das seções tipo-específicas (Fase 3)
- OG image dinâmica (`opengraph-image.tsx`) (Fase 5)
- Sistema de avaliações e analytics (Fases futuras)

---

## 5. Critérios de aceitação

- [ ] `GET /api/v1/business-pages/public/:slug` retorna 404 para páginas não aprovadas
- [ ] `GET /api/v1/business-pages/public/:slug` retorna `approved_content` para páginas aprovadas
- [ ] Rota `/my-city/pg/restaurante/slug-aprovado` renderiza `RestauranteTemplate` com dados reais
- [ ] Rota `/my-city/pg/invalido/qualquer-slug` retorna 404
- [ ] Badge Aberto/Fechado calculado corretamente para horário de funcionamento preenchido
- [ ] Seções tipo-específicas exibem placeholder visual (dashed border) quando `typeData` está vazio
- [ ] Skeleton loader exibido durante o carregamento (`loading.tsx`)
