# Diagramas

## Secuencia PlantUML
```plantuml
@startuml
actor Analista
participant React
participant "API Node.js" as API
participant "Recuperador RAG" as RAG
database "Repositorio autorizado" as DOC
participant LLM
actor Supervisor
Analista -> React: Captura perfil y consulta
React -> API: POST /api/drafts
API -> RAG: Recuperar fragmentos
RAG -> DOC: Buscar con permisos
DOC --> RAG: Fragmentos + metadatos
RAG --> API: Fuentes, versión y vigencia
API -> LLM: Consulta + contexto
LLM --> API: Borrador + afirmaciones
API --> React: Borrador + fuentes + alertas
React --> Analista: Presentar resultado
Analista -> Supervisor: Solicitar revisión
Supervisor --> Analista: Aprobar o solicitar ajustes
note over React,LLM: La IA no aprueba ni envía respuestas.
@enduml
```

## Entidades Mermaid
```mermaid
erDiagram
REQUEST ||--o{ DRAFT_RESPONSE : produces
DRAFT_RESPONSE }o--o{ SOURCE_DOCUMENT : cites
REQUEST { string requestId PK string requesterProfile string question datetime createdAt string status }
DRAFT_RESPONSE { string draftId PK string requestId FK string content string modelMode string approvalStatus datetime generatedAt }
SOURCE_DOCUMENT { string documentId PK string title string version date validUntil string authorizedStatus string sourceLocation }
```

## Arquitectura tentativa AWS
```mermaid
flowchart LR
U[Analista]-->CF[CloudFront]
CF-->S3[S3 Frontend React]
U-->WAF[AWS WAF]
WAF-->ALB[Application Load Balancer]
ALB-->ECS[ECS Fargate API Node.js]
ECS-->RAG[Servicio RAG]
RAG-->OS[OpenSearch Serverless Vector]
RAG-->DOC[S3 documentos autorizados]
ECS-->BR[Amazon Bedrock LLM]
ECS-->DB[RDS PostgreSQL auditoría]
ECS-->CW[CloudWatch]
IAM[IAM KMS Secrets Manager]-. controles .->ECS
```
Arquitectura de referencia no desplegada; validar región, privacidad, seguridad y costos. Para PoC no desplegar todos los servicios hasta validar valor.