# FarmaNova PoC A08 — Hito 1

Prototipo académico para apoyar al analista de Información Médica en la elaboración de borradores técnicos B2B.

## Estado implementado
- Frontend React para capturar perfil y consulta.
- Backend Node.js/Express.
- `GET /health` y `POST /api/drafts`.
- Validación básica y prueba automatizada.
- Respuesta determinista DEMO con fuente ficticia, alertas y aprobación humana pendiente.

## No implementado
No hay integración real con LLM, RAG vectorial, repositorio documental, persistencia de entidades, autenticación empresarial, workflow de aprobación ni despliegue AWS. Los diagramas describen una arquitectura objetivo.

## Ejecución local
Backend:
```bash
cd backend
npm install
npm test
npm run dev
```
Frontend, en otra terminal:
```bash
cd frontend
npm install
npm run dev
```
Abrir `http://localhost:5173`. Backend: `http://localhost:3001/health`.

## Seguridad
No usar información real de pacientes ni documentos confidenciales. No usar en producción ni para decisiones clínicas. No subir `.env`, secretos ni `node_modules`.

## Documentación
- `docs/01-alcance.md`: alcance y métricas.
- `docs/02-historias-y-tickets.md`: historias y tickets.
- `docs/03-diagramas.md`: secuencia, entidades y arquitectura objetivo.
- `docs/04-comparacion-LLM.md`: comparación real ChatGPT vs. Claude.
