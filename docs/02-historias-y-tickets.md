# Historias de usuario

**US-01 Capturar solicitud:** Como analista, quiero registrar perfil y consulta para iniciar el proceso asistido. Criterios: campos obligatorios, identificador y validación.

**US-02 Recuperar fuentes:** Como analista, quiero recuperar documentos pertinentes y metadatos para sustentar el borrador. Criterios: ID, título, versión, vigencia y fragmento; no usar fuentes vencidas/no autorizadas.

**US-03 Generar borrador:** Como analista, quiero un borrador adaptado al perfil y vinculado a fuentes. Criterios: afirmaciones trazables, alertas y estado borrador.

**US-04 Revisar/aprobar:** Como supervisor, quiero aprobar o devolver el borrador. Criterios: estados, responsable y fecha; no enviar sin aprobación.

**US-05 Trazabilidad:** Como analista, quiero conservar solicitud, fuentes y versión final. Criterios: historial y relación con ticket.

## Primera historia seleccionada
US-01. La primera tarea implementada es el endpoint `POST /api/drafts`, con validación y respuesta estructurada DEMO. No representa integración real con LLM.

## Tickets
| ID | Título | Criterios de aceptación | Prioridad | Horas |
|---|---|---|---|---:|
| FN-A08-01 | API Express | `GET /health` responde 200; configuración externa | Alta | 2 |
| FN-A08-02 | Validar solicitud | 400 ante campos faltantes; 422 sin fuentes | Alta | 3 |
| FN-A08-03 | Respuesta estructurada | Borrador, afirmaciones, fuentes, alertas y aprobación requerida | Alta | 3 |
| FN-A08-04 | Interfaz React | Captura perfil/consulta y presenta resultado/errores | Media | 4 |
| FN-A08-05 | Pruebas y documentación | Pruebas automatizadas y guía reproducible | Alta | 3 |

Estimación inicial: 15 horas.