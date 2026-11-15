# Diagramas y modelo lógico — PoC A08

## 1. Secuencia objetivo (PlantUML)
```plantuml
@startuml
actor Analista
participant "Frontend React" as FE
participant "API Node.js" as API
participant "Recuperador RAG" as RAG
database "Repositorio autorizado" as DOC
participant LLM
actor Supervisor
actor "Regulatorio / Jurídica" as REG

Analista -> FE: Captura perfil y consulta
FE -> API: POST /api/drafts
API -> RAG: Recuperar por consulta, producto y país
RAG -> DOC: Buscar solo documentos vigentes y autorizados
DOC --> RAG: Fragmentos + metadatos
RAG --> API: Fragmentos rankeados y trazabilidad
alt Evidencia insuficiente
  API --> FE: No generar respuesta sustantiva
  FE --> Analista: Escalar a área competente
else Evidencia suficiente
  API -> LLM: Consulta + fragmentos permitidos
  LLM --> API: Borrador + afirmaciones + referencias
  API -> API: Verificar cita, fragmento y vigencia
  API --> FE: Borrador + panel de evidencia + alertas
  Analista -> FE: Verifica y solicita revisión
  FE -> Supervisor: Enviar a revisión
  opt Requiere validación especializada
    Supervisor -> REG: Solicitar validación
    REG --> Supervisor: Aprobado / rechazado / cambios
  end
  Supervisor --> FE: Aprobar o devolver
end
note over FE,LLM: La IA no aprueba ni envía. Sin envío automático.
@enduml
```

## 2. Entidades esenciales y entidades de soporte
Las tres entidades esenciales solicitadas para el MVP son `Request`, `SourceDocument` y `DraftResponse`. Para implementar trazabilidad por afirmación y auditoría se agregan tres entidades de soporte: `DocumentChunk`, `Claim` y `ReviewRecord`.

```mermaid
erDiagram
  REQUEST ||--o{ DRAFT_RESPONSE : genera
  SOURCE_DOCUMENT ||--|{ DOCUMENT_CHUNK : contiene
  DRAFT_RESPONSE ||--|{ CLAIM : contiene
  DOCUMENT_CHUNK ||--o{ CLAIM : sustenta
  DRAFT_RESPONSE ||--o{ REVIEW_RECORD : registra
  REQUEST {
    string request_id PK
    string requester_type
    string product_ref
    string country
    string query_text
    datetime created_at
    string status
  }
  SOURCE_DOCUMENT {
    string document_id PK
    string title
    string doc_type
    string version
    string status
    date effective_from
    date effective_to
    boolean authorized
  }
  DRAFT_RESPONSE {
    string draft_id PK
    string request_id FK
    int version_no
    string generated_text
    string status
    string model_id
    datetime generated_at
    boolean sent_flag
  }
  DOCUMENT_CHUNK {
    string chunk_id PK
    string document_id FK
    int page
    string section
    string text
  }
  CLAIM {
    string claim_id PK
    string draft_id FK
    string chunk_id FK
    string claim_text
    string support_status
  }
  REVIEW_RECORD {
    string review_id PK
    string draft_id FK
    string reviewer_role
    string decision
    string comments
    datetime decided_at
  }
```

## 3. Arquitectura tentativa AWS
```mermaid
flowchart LR
  U[Analista / Supervisor] --> CF[CloudFront + S3 React]
  CF --> WAF[AWS WAF]
  WAF --> API[API Gateway + Lambda o ECS Fargate]
  API --> RAG[Servicio de recuperación RAG]
  RAG --> OS[OpenSearch o Aurora pgvector]
  RAG --> DOC[S3 documentos autorizados]
  API --> LLM[Amazon Bedrock + Guardrails]
  API --> DB[DynamoDB o Aurora PostgreSQL]
  API --> WF[Step Functions revisión]
  WF --> SNS[SNS notificaciones internas]
  SEC[IAM + KMS + Secrets Manager] -. controles .-> API
  OBS[CloudTrail + CloudWatch + X-Ray] -. observabilidad .-> API
```
**Nota:** alternativas como Lambda/ECS, DynamoDB/Aurora y OpenSearch/pgvector requieren selección; no se despliegan todas a la vez. Arquitectura de referencia no implementada. Validar residencia de datos, región, costos, seguridad y sistemas existentes.

## 4. Estado real del prototipo
El código publicado implementa una interfaz React, una API Node.js con `GET /health` y `POST /api/drafts`, validación básica y una respuesta determinista DEMO con fuente ficticia, alertas y aprobación pendiente. No implementa el flujo RAG, un LLM real, las seis entidades persistidas ni workflow de aprobación.
