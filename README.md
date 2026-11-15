# FarmaNova PoC A08
MVP académico para apoyar al analista de Información Médica con borradores técnicos basados en fuentes autorizadas. La aprobación humana es obligatoria.

## Ejecutar
Backend: `cd backend && npm install && npm run dev` (puerto 3001).
Frontend: `cd frontend && npm install && npm run dev` (Vite, normalmente 5173).

Prueba backend: `GET http://localhost:3001/health` y `POST /api/drafts`.

Esta primera iteración utiliza una respuesta determinista DEMO y documentos ficticios suministrados por el frontend. No implementa RAG vectorial ni una integración real con LLM. No usar en producción ni para decisiones clínicas.

## Publicar en GitHub
Crear repositorio público vacío y ejecutar:
```bash
git init
git add .
git commit -m "Initial FarmaNova A08 PoC"
git branch -M main
git remote add origin https://github.com/USUARIO/REPO.git
git push -u origin main
```
No subir `.env`, claves ni `node_modules`.