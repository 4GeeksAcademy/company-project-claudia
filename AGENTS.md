# HealthCore Agent Instructions

Estas reglas aplican al trabajo de desarrollo en este repositorio.

## Fuentes de verdad

- `docs/security-and-privacy.md` define las restricciones de seguridad y privacidad.
- Los ADRs aprobados gobiernan las decisiones que documenten, sin relajar los requisitos de seguridad y privacidad.
- `memory-bank/techContext.md` registra el stack y las decisiones técnicas actuales; actualízalo cuando cambien.
- `memory-bank/projectbrief.md` define el problema, el alcance y los objetivos del producto.
- Las decisiones específicas de HealthCore prevalecen sobre las recomendaciones genéricas de la plantilla.
- Si hay requisitos contradictorios o incompletos, explica el conflicto y pide aclaración; no inventes una decisión.

## Inicio de cada tarea

- Al comenzar cada sesión o tarea, lee `AGENTS.md`, `memory-bank/projectbrief.md` y `memory-bank/techContext.md`.
- Consulta `docs/security-and-privacy.md` cuando el trabajo afecte datos, permisos, IA, logs, proveedores o infraestructura; consulta también los ADRs relevantes antes de cambiar decisiones que documenten.

## Flujo de trabajo

- Ajusta la investigación al riesgo. Para cambios triviales, revisa solo el contexto necesario; antes de cambios de comportamiento, datos, permisos, contratos o IA, consulta las especificaciones y reglas pertinentes.
- Antes de implementar un cambio de comportamiento, identifica sus criterios de aceptación. Si no están definidos, acláralos.
- Mantén los cambios enfocados y conserva los cambios existentes que no formen parte de la tarea.
- Considera un cambio completo solo después de ejecutar las verificaciones pertinentes.
- En el resumen final, indica qué verificaste y qué queda pendiente. No afirmes que una prueba pasó si no se ejecutó.

## Antes de cada commit

Solo crea un commit cuando el desarrollador lo haya solicitado explícitamente. Antes de cada commit, sigue estos pasos en orden:

1. Confirma que la solicitud autoriza crear el commit; una petición de implementar cambios no lo autoriza por sí sola.
2. Revisa `git status` y los diffs staged y unstaged; identifica cambios ajenos y no los incluyas.
3. Ejecuta las pruebas y verificaciones pertinentes. Si fallan o no pueden ejecutarse, informa el resultado y no hagas el commit sin autorización explícita para continuar pese a ello.
4. Prepara únicamente los archivos de esta tarea y revisa el diff staged para detectar cambios no relacionados, secretos, PHI o datos sensibles.
5. Crea el commit autorizado. No hagas push salvo que el desarrollador lo solicite explícitamente.

## Rutas protegidas

No modifiques ni elimines estos archivos o configuraciones sin confirmación explícita del desarrollador para ese cambio concreto:

- `AGENTS.md`
- `memory-bank/projectbrief.md`
- `memory-bank/techContext.md`
- `docs/security-and-privacy.md`
- ADRs aprobados, incluyendo los que se documenten bajo `docs/adr/`
- `.github/workflows/` y configuraciones de despliegue o producción bajo `infra/`
- Archivos de secretos o credenciales. Nunca incluyas sus valores en logs, diffs compartidos, commits o respuestas.

## Principios de implementación

- Aplica KISS y YAGNI: elige la solución más sencilla que cumpla los requisitos; no añadas capacidades especulativas.
- Aplica DRY y SOLID con criterio. Evita duplicar reglas de negocio, pero no crees abstracciones, interfaces o capas sin una necesidad concreta.
- Usa nombres, tipos, estados y errores explícitos. Mantén la lógica de negocio en el backend, no en controllers ni componentes de UI.
- No impongas Clean Architecture ni otra arquitectura no aprobada. Respeta las fronteras que se hayan decidido.
- Ubica los frontends bajo `uis/` y las APIs o workers bajo `services/`; consulta el README de cada carpeta y `memory-bank/techContext.md` antes de añadir proyectos. No crees un segundo árbol `frontend/` o `backend/` en la raíz.
- Al cambiar contratos, persistencia o eventos, actualiza sus consumidores y pruebas.
- Para trabajos asíncronos y llamadas externas, considera fallos parciales, cancelación, idempotencia y reintentos.
- Añade comentarios para explicar decisiones o contexto no obvio, no para narrar el código.
- No añadas paquetes, servicios o dependencias sin una necesidad concreta y una justificación de mantenimiento y seguridad.

## Seguridad, tenants e IA

- Sigue `docs/security-and-privacy.md`: no incluyas PHI, datos sensibles, secretos, documentos, prompts o respuestas en logs, trazas o métricas.
- Usa datos sintéticos en desarrollo y pruebas hasta que proveedores, regiones, acuerdos y controles estén aprobados para datos reales.
- El backend debe validar identidad, permisos y tenant en cada operación. No confíes en la autorización del frontend ni en identificadores de tenant enviados por el cliente.
- Mantén la clave de OpenAI en el backend. No envíes PHI al proveedor hasta que el flujo y su uso estén aprobados.
- Valida las salidas de IA antes de utilizarlas. Las recomendaciones deben ser trazables y escalarse a una persona cuando falte evidencia, haya conflicto o el caso supere el riesgo permitido.
- Registra el consumo de IA con metadatos mínimos por usuario y tenant, sin guardar por defecto el contenido procesado.

## Pruebas

- Añade pruebas deterministas y enfocadas para el comportamiento que cambie.
- Usa Testcontainers para pruebas de integración y Playwright para pruebas E2E, según corresponda al flujo.
- No conectes pruebas automáticamente a proveedores reales; usa dobles de prueba salvo autorización explícita.
- Los tests deben usar datos sintéticos, nunca PHI real.
