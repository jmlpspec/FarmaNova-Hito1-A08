# Comparación ChatGPT vs Claude
El enunciado exige ejecutar los mismos prompts en ambos modelos y comparar resultados. No se inventan salidas de Claude: completar su columna con evidencia real.

| Dimensión | ChatGPT | Claude | Evaluación |
|---|---|---|---|
| Secuencia | Incluye analista, UI, API, RAG, repositorio, LLM y supervisor | Pendiente de ejecutar | Sintaxis, actores y revisión humana |
| Entidades | Request, DraftResponse, SourceDocument | Pendiente | Cardinalidades y trazabilidad |
| Arquitectura | S3, CloudFront, WAF, ALB, ECS, OpenSearch, Bedrock, RDS, IAM/KMS, CloudWatch | Pendiente | Seguridad, costo y complejidad |

Conclusión provisional: la arquitectura es válida como referencia, pero puede sobredimensionar una primera PoC. La comparación definitiva requiere ejecutar los prompts equivalentes en Claude.