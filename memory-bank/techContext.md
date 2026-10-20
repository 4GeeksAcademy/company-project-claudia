# Tech Context — HealthCore Revenue Cycle Copilot

## Propósito

Este documento registra el stack elegido para el proyecto y distingue las decisiones acordadas de los detalles que siguen pendientes. Sustituye para este proyecto las recomendaciones genéricas de la plantilla, como usar FastAPI: el backend elegido es ASP.NET Core.

## Estructura de aplicaciones en el monorepo

Este mapa documenta dónde vivirá el código de producto cuando se implementen las aplicaciones; no implica que deban crearse ahora.

- Los proyectos frontend de la empresa viven bajo `uis/`, siguiendo `uis/README.es.md`.
- El sitio público de HealthCore vivirá en `uis/website/`. Su marca y contenido deben alinearse con `BRIEFING.md`.
- La aplicación interna vivirá en `uis/backoffice/`, separada del sitio público y con su propio layout. La ruta `/` es la entrada de cada aplicación; no determina por sí sola la URL de despliegue.
- Las APIs y los workers viven bajo `services/`, siguiendo `services/README.es.md`. La API central y el worker se implementarán allí como servicios .NET según sus límites funcionales.
- No crear árboles paralelos como `frontend/` o `backend/` en la raíz. Antes de añadir una aplicación o servicio, consultar el README de su carpeta y documentar su objetivo y ejecución.

Las subcarpetas `uis/website/` y `uis/backoffice/` todavía no contienen aplicaciones; se crearán cuando corresponda implementar esos hitos.

## Stack acordado

| Área | Tecnología / decisión | Uso |
| --- | --- | --- |
| Frontend | Angular + TypeScript | Aplicación web para el personal autorizado. |
| Backend | ASP.NET Core Web API + C# | API de negocio, autorización, integración con IA y acceso a datos. |
| Autenticación | Usuarios y tablas propias; JWT emitidos y validados por el backend .NET | No se usará Supabase Auth. Se utilizarán bibliotecas estándar de .NET para firmar y validar tokens; no se implementará criptografía propia. |
| Base de datos | PostgreSQL gestionado con Supabase | Datos de negocio, usuarios, auditoría, métricas de IA y tabla durable de trabajos. |
| Búsqueda vectorial | `pgvector` en PostgreSQL | Vectores de documentos para recuperación RAG; no se añadirá una base vectorial separada inicialmente. |
| Almacenamiento de archivos | Supabase Storage | PDFs y documentos asociados, sujeto a validar región, controles y acuerdos antes de datos reales. |
| Proveedor de IA | OpenAI API | Acceso a modelos desde el backend. La API key nunca se expondrá al frontend. El uso de API se presupuestará por consumo; una suscripción de ChatGPT no equivale a créditos de API. |
| Procesamiento documental inicial | PDFs con texto extraíble, sin OCR | Los PDFs escaneados quedan fuera del MVP hasta seleccionar e incorporar OCR. |
| Trabajos en segundo plano | Worker .NET + tabla durable de trabajos en PostgreSQL | Un trigger/notificación puede despertar al worker; la tabla es la fuente durable y el worker debe poder consultar trabajos pendientes si pierde una notificación. |
| Email | Mailpit en desarrollo; Sender en producción | Los correos serán notificaciones y enlaces autenticados, sin PHI ni contenido clínico. |
| Observabilidad | Logs + OpenTelemetry | Trazas, métricas y logs técnicos sin PHI, secretos ni contenido de reclamaciones. |
| Métricas de IA | Tablas propias en PostgreSQL, asociadas a usuario y tenant | Tokens de entrada/salida, modelo, duración, estado y referencias de ejecución; no almacenar el prompt, la respuesta ni el documento clínico por defecto. |
| Pruebas | Unitarias, integración con Testcontainers y E2E con Playwright | Los runners concretos para las pruebas unitarias quedan por elegir. |
| Contenedores | Docker y Docker Compose | Desarrollo local y ejecución reproducible de los componentes que se puedan contenerizar. |
| Despliegue | Cloudflare + Railway; servicios de aplicación en Europa | Cloudflare para el punto de entrada y/o entrega del frontend; Railway para API y worker. El producto concreto de Cloudflare y la configuración de cada servicio siguen pendientes. |

## Flujo de trabajos

1. La API crea el registro del trabajo en PostgreSQL dentro de la transacción correspondiente.
2. Un trigger puede emitir una notificación para despertar al worker y reducir la latencia.
3. El worker reclama trabajos pendientes desde la tabla, ejecuta el procesamiento y guarda el resultado.
4. El worker debe recuperar trabajos mediante consulta aunque se pierda una notificación. Los reintentos deben ser limitados y el procesamiento debe ser idempotente para tolerar duplicados.

La notificación es una señal, no el almacenamiento durable de la cola. Los campos definitivos de estado, bloqueo, reintentos y errores se definirán al implementar el worker.

## Requisitos de seguridad para el stack

- No se utilizará Supabase Auth: la identidad de usuario y los JWT pertenecen a la aplicación .NET.
- El backend validará permisos y tenant en cada operación; el frontend no será una frontera de autorización.
- No enviar PHI a OpenAI ni a otros subprocesadores hasta aprobar el caso de uso, los términos, la retención, los acuerdos y las configuraciones aplicables.
- Mantener PHI, prompts, respuestas y documentos fuera de logs, trazas y métricas. Registrar metadatos mínimos para diagnosticar y medir el uso.
- Usar datos sintéticos en desarrollo y pruebas hasta validar proveedores, regiones y controles para datos reales.
- Revisar HIPAA, UK GDPR, transferencias internacionales, residencia, copias de seguridad y subprocesadores antes de producción. La elección de una región europea no garantiza por sí sola el cumplimiento.
- Consultar [security-and-privacy.md](../docs/security-and-privacy.md) para los requisitos detallados.

## Decisiones pendientes

- Región de Supabase. Se recomienda evaluar una región europea para alinear la base de datos con Railway y los datos del Reino Unido; Virginia podría reducir latencia para clínicas de EE. UU., pero implica revisar cuidadosamente residencia y transferencias. La región no está confirmada.
- Modelos de OpenAI para chat y embeddings, límites de datos enviados, presupuesto, cuotas y estrategia de evaluación.
- Formato y extracción de PDFs, límites de tamaño y manejo de documentos no válidos; OCR queda fuera del MVP.
- Producto de Cloudflare, topología de red y estrategia de CI/CD.
- Mecanismo de despliegue y escalado del worker, estrategia de bloqueo, reintentos y cola de fallidos.
- Política de expiración, renovación, revocación y almacenamiento de JWT; roles y permisos de usuario.
- Estrategia de aislamiento por tenant en PostgreSQL, incluidas las políticas de Row Level Security si se adoptan.
- Retención de datos de negocio, auditoría, métricas de IA y archivos; rotación de secretos y claves.
- Frameworks y runners de pruebas unitarias para Angular y .NET.
- Costes y requisitos contractuales y regulatorios de OpenAI, Supabase, Railway, Cloudflare y Sender antes de procesar datos reales.
