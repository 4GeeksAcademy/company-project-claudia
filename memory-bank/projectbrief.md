# Project Brief: HealthCore Revenue Cycle Copilot

## Descripción del negocio

HealthCore es una empresa de atención sanitaria ambulatoria fundada en 2011 y con sede en Austin, Texas. Opera 12 clínicas: 9 en Estados Unidos y 3 en el Reino Unido. Ofrece atención primaria, consultas especializadas, gestión de enfermedades crónicas y programas de prevención. Cuenta con aproximadamente 200 empleados y unos ingresos anuales de 28 millones de dólares.

La empresa busca ofrecer atención accesible y de calidad, con citas rápidas y una experiencia sencilla para los pacientes. Su crecimiento, sin embargo, ha superado la capacidad de sus sistemas actuales: las clínicas dependen de plataformas de historia clínica, facturación y citas distintas, sin una capa de datos compartida ni una visión operativa unificada. HealthCore opera bajo HIPAA en Estados Unidos y UK GDPR en el Reino Unido, por lo que la privacidad, el control de acceso y la trazabilidad son requisitos esenciales.

## Problema que resuelve el proyecto

El equipo de Ciclo de Ingresos y Facturación gestiona reclamaciones mediante procesos en gran parte manuales y con prácticas de codificación inconsistentes entre sedes. En Estados Unidos, aproximadamente el 14 % de las reclamaciones son rechazadas o denegadas, por encima de la referencia del sector indicada en el contexto de HealthCore. La revisión y el seguimiento manual dificultan detectar errores antes del envío, entender los patrones de rechazo y tener una visión unificada del estado de las reclamaciones.

El proyecto aborda este problema asistiendo al personal en la revisión previa al envío, identificando datos ausentes, inconsistencias y riesgos potenciales, y mostrando evidencia que respalde sus conclusiones. No sustituye la decisión profesional: los casos de alto riesgo, con evidencia insuficiente o información contradictoria deben escalarse a revisión humana.

## Objetivos del proyecto

- Diseñar un **HealthCore AI Revenue Cycle Copilot** interno para el personal autorizado de facturación.
- Revisar reclamaciones antes de su envío y señalar posibles errores, información incompleta y factores de riesgo.
- Recuperar las reglas de facturación, documentación de pagadores, políticas internas y procedimientos aplicables al contexto de cada reclamación.
- Presentar recomendaciones con evidencia y referencias a sus fuentes, y permitir consultas conversacionales sobre reclamaciones y patrones de rechazo.
- Aplicar políticas explícitas de riesgo, permisos y cumplimiento para decidir cuándo el flujo puede continuar y cuándo es obligatoria la revisión humana.
- Registrar las fuentes, versiones, decisiones y acciones relevantes para que las recomendaciones sean trazables y auditables.
- Medir el rendimiento del sistema usando revisiones humanas y resultados finales de los pagadores como feedback, con el fin de evaluar y mejorar el flujo.

El objetivo general es reducir errores evitables y trabajo manual en la revisión de reclamaciones, mejorar la capacidad de análisis del equipo y hacerlo de forma segura, medible y con supervisión humana adecuada.

## Requisitos de seguridad y privacidad

El sistema puede procesar PHI y datos de salud sujetos a HIPAA en Estados Unidos y UK GDPR en Reino Unido. Por defecto, PHI, datos personales sensibles, documentos, prompts y respuestas no deben incluirse en logs, trazas ni métricas; la telemetría de IA registrará metadatos de uso y consumo sin el contenido clínico. Se usarán datos sintéticos hasta validar proveedores, regiones, acuerdos y controles para datos reales. Los requisitos detallados están en [docs/security-and-privacy.md](../docs/security-and-privacy.md).