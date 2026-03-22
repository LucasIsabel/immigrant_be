# Stitch MCP no Cursor

Este repositório inclui [`.cursor/mcp.json`](../.cursor/mcp.json) com o servidor **stitch** (`npm` package [`stitch-mcp`](https://www.npmjs.com/package/stitch-mcp)), conforme o README oficial do pacote.

## O que você precisa fazer

1. **Substituir o project ID** em `.cursor/mcp.json`:
   - Troque `REPLACE_WITH_YOUR_GCP_PROJECT_ID` pelo ID real do seu projeto no Google Cloud.

2. **Google Cloud + Stitch API** (resumo do README do `stitch-mcp`):

   ```bash
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   gcloud auth application-default set-quota-project YOUR_PROJECT_ID
   gcloud beta services mcp enable stitch.googleapis.com
   gcloud auth application-default login
   ```

3. **Reiniciar o Cursor por completo** (quit + reopen) para recarregar os servidores MCP.

4. **Validar**
   - Cursor → **Settings** → **MCP** / **Tools & MCP**: o servidor `stitch` deve aparecer como conectado.
   - Se falhar: **View → Output** → selecione o canal de MCP e verifique erros de `spawn`, `npx` ou autenticação Google.

## Nota

- A mesma configuração existe em `immigrant_fe/.cursor/mcp.json` se você abrir só o frontend no Cursor.
- Se você já usar `~/.cursor/mcp.json` global, pode mesclar a entrada `stitch` lá em vez de duplicar por projeto.
