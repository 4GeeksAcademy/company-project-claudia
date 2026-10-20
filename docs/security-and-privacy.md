# Seguridad y privacidad

## Propósito y alcance

Esta guía recoge los requisitos iniciales de seguridad y privacidad del HealthCore Revenue Cycle Copilot. Aplica al frontend, la API, los workers, PostgreSQL/Supabase, Storage, los proveedores de IA y los servicios de observabilidad y correo.

Es una guía de ingeniería, no una certificación ni una conclusión legal de cumplimiento. Antes de procesar datos reales, los controles, proveedores y acuerdos deben revisarse con las personas responsables de seguridad, privacidad y cumplimiento.

## Datos sanitarios y datos personales

PHI (*Protected Health Information*) es información sanitaria identificable protegida por HIPAA en Estados Unidos. En este proyecto, una reclamación vinculada a una persona puede contener PHI. En Reino Unido, los datos de salud son una categoría especial de datos personales bajo UK GDPR y la normativa británica de protección de datos.

Hasta que se aprueben los proveedores, las regiones y las medidas de protección, desarrollo, pruebas y evaluación usarán únicamente datos sintéticos o debidamente anonimizados. El acceso a datos reales debe limitarse a lo necesario para la función del usuario y el tenant correspondiente.

## Logs, trazas y métricas

- No registrar PHI, datos personales sensibles, contraseñas, tokens de acceso, claves ni secretos en logs, trazas o métricas.
- No registrar cuerpos completos de reclamaciones, documentos, prompts o respuestas del modelo por defecto. Redactar o excluir cualquier campo sensible antes de emitir telemetría.
- Las métricas de uso de IA pueden registrar tenant y usuario mediante identificadores internos, modelo, versión, tokens de entrada y salida, duración, estado y correlación de la ejecución. No deben incluir el contenido procesado.
- Los logs técnicos y las trazas de OpenTelemetry deben permitir diagnosticar errores sin revelar contenido clínico. El acceso a la telemetría debe estar restringido y auditado.
- Los correos enviados por el sistema no deben incluir información clínica ni identificadores de pacientes; deben limitarse a notificaciones y enlaces autenticados.

## Almacenamiento, acceso y retención

- Mantener el acceso a reclamaciones y documentos limitado por identidad, rol y tenant. La API debe validar la autorización en cada operación; no confiar únicamente en filtros enviados por el cliente.
- Proteger datos en tránsito y en reposo mediante las capacidades y configuración verificadas de cada proveedor.
- Guardar en la auditoría quién realizó una acción, sobre qué recurso, cuándo y con qué resultado. La auditoría debe registrar referencias y metadatos, no copiar innecesariamente PHI.
- Definir y documentar periodos de retención, borrado y gestión de solicitudes de acceso antes de producción. Evitar conservar datos de prueba o ejecuciones de IA más tiempo del necesario.
- Guardar PDFs con texto en el MVP. Los documentos escaneados no se procesarán hasta que se incorpore y evalúe una solución OCR.

## Proveedores y transferencias

Supabase, Railway, Cloudflare, el proveedor de IA, Sender y cualquier subprocesador deben revisarse antes de utilizarlos con datos reales. La revisión debe confirmar, como mínimo:

- Región efectiva de almacenamiento y procesamiento, incluidas copias de seguridad y logs.
- Acuerdos de tratamiento de datos y, cuando corresponda, acuerdos requeridos para PHI bajo HIPAA.
- Subprocesadores, retención, eliminación, controles de acceso y opciones de transferencia internacional.
- Que las condiciones del proveedor de IA no permitan usos incompatibles con los datos enviados, como entrenamiento no autorizado o retención no aprobada.

La región europea es la opción prevista para los servicios que procesen los datos del proyecto, pero la región y configuración definitivas deben verificarse para cada proveedor. Usar una región europea no garantiza por sí solo el cumplimiento de UK GDPR, GDPR o HIPAA.

## Decisiones pendientes antes de datos reales

- Aprobar proveedor y modelo de IA, y decidir qué datos pueden enviarse a ellos.
- Verificar regiones, acuerdos, subprocesadores y controles de cada proveedor.
- Definir periodos de retención y borrado para reclamaciones, documentos, auditoría y métricas.
- Revisar el aislamiento entre tenants, los permisos y la gestión de claves y secretos.
- Acordar con las personas responsables de cumplimiento si se requiere una evaluación de impacto y qué proceso seguir ante incidentes o solicitudes de derechos.