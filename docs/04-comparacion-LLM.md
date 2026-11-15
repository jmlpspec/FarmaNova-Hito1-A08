# Comparación ChatGPT vs. Claude — PoC A08

## Método
Se entregó a ambos modelos el mismo encargo: diseñar la PoC A08 de generación de borradores técnicos B2B con RAG y producir diagrama de secuencia, modelo de entidades, arquitectura AWS, riesgos y controles. La respuesta de Claude se recibió como documento PDF de nueve páginas. La comparación se basa en los artefactos observados, no en supuestos.

## Comparación

| Dimensión | ChatGPT | Claude | Evaluación |
|---|---|---|---|
| Secuencia | Flujo general: analista, React, API, RAG, repositorio, LLM y supervisor. | Detalla registro, recuperación, evidencia insuficiente, generación acotada, revisión y validación especializada. | Claude modela mejor excepciones y estados; ChatGPT ofrece una vista inicial más simple. |
| Entidades | Request, SourceDocument y DraftResponse. | Añade Claim, ReviewRecord y DocumentChunk. | Claude mejora la trazabilidad de cada afirmación hasta el fragmento fuente y el registro de revisión. |
| Fuentes | Metadatos de documento, versión y vigencia. | Añade autorización, producto, país, vigencia, checksum y revalidación. | Claude define controles documentales más verificables. |
| Revisión | Supervisor obligatorio; Regulatorio/Jurídica en casos sensibles. | Estados, responsables, decisiones, comentarios y auditoría de revisión. | Claude detalla mejor el ciclo de aprobación. |
| Arquitectura AWS | S3, CloudFront, WAF, ALB, ECS Fargate, OpenSearch, Bedrock, RDS, IAM/KMS y CloudWatch. | Considera alternativas Lambda/ECS, Cognito, Step Functions, DynamoDB/Aurora, OpenSearch/pgvector, Bedrock Guardrails, Comprehend y observabilidad ampliada. | Claude ofrece más opciones; no deben desplegarse todas simultáneamente. |
| Riesgos | Alucinación, obsolescencia, privacidad y revisión humana. | Amplía a 13 riesgos, incluyendo prompt injection, automation bias, farmacovigilancia, país/idioma y propiedad intelectual. | Claude presenta un análisis de riesgos más exhaustivo. |

## Síntesis adoptada
- Se conserva la simplicidad del prototipo React + Node.js como demostrador de interfaz y contrato API.
- Para la evolución funcional se adoptan Claim, DocumentChunk y ReviewRecord como entidades de soporte a las tres entidades esenciales Request, SourceDocument y DraftResponse.
- Se incorpora el principio de evidencia insuficiente: sin fragmentos pertinentes, autorizados y vigentes, no se genera respuesta sustantiva.
- Cada afirmación deberá vincularse a un fragmento documental verificable.
- La revisión humana será obligatoria y la validación de Regulatorio/Jurídica se activará según una matriz formal por definir.
- No habrá envío automático ni integración productiva en esta PoC.

## Limitaciones y honestidad de implementación
El prototipo ejecutado usa generación determinista DEMO y un documento ficticio suministrado por el frontend. No implementa RAG vectorial, LLM real, repositorio documental, autenticación empresarial, flujo de aprobaciones ni servicios AWS. Los diagramas y controles anteriores describen el diseño objetivo, no capacidades desplegadas.

La arquitectura de Claude presenta alternativas excluyentes que requieren decisión: API Gateway + Lambda o ECS; DynamoDB o Aurora; OpenSearch o pgvector. La selección debe depender de volumen, latencia, residencia de datos, seguridad, costos y sistemas actuales, que aún deben levantarse.

## Conclusión
ChatGPT fue útil para construir una primera base ejecutable de interacción. Claude aportó mayor profundidad en trazabilidad, gobierno documental, estados de aprobación y análisis de riesgos. La decisión recomendada es combinar la simplicidad del MVP con los controles de diseño de Claude, implementándolos por etapas y validando cada capacidad con evidencia.
