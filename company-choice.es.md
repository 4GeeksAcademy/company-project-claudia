# Elección de Empresa — HealthCore

## Por qué elegí HealthCore

Elegí HealthCore porque combina problemas operativos reales con los desafíos de aplicar inteligencia artificial en un entorno altamente regulado y de alto impacto. La empresa opera 12 clínicas entre Estados Unidos y Reino Unido, mientras que su ecosistema tecnológico actual está fragmentado entre diferentes sistemas de historia clínica electrónica (EHR), facturación, programación de citas y generación de informes.

Lo que hace que HealthCore sea especialmente interesante para mí es que introducir IA en este entorno requiere mucho más que construir modelos o agentes capaces de producir respuestas útiles. Los sistemas sanitarios también deben tener en cuenta la fiabilidad, privacidad, seguridad, trazabilidad, restricciones regulatorias y supervisión humana.

Quiero utilizar este proyecto para explorar cómo diseñar sistemas de IA para producción cuyo comportamiento pueda medirse, evaluarse y auditarse, con criterios explícitos para determinar cuándo se puede confiar en una recomendación de la IA y cuándo es necesaria la intervención humana.

## Departamentos de interés

### Ciclo de Ingresos y Facturación

HealthCore tiene actualmente una tasa de rechazo de reclamaciones del 14% en Estados Unidos. Las reclamaciones se envían manualmente, las prácticas de codificación son inconsistentes entre sedes y las reclamaciones rechazadas o impagadas requieren un seguimiento manual considerable.

El departamento necesita revisión de reclamaciones asistida por IA antes de su envío, sugerencias de codificación, análisis de patrones de rechazo, visibilidad unificada de la facturación y flujos automatizados de seguimiento.

Esta área me interesa especialmente porque el procesamiento de reclamaciones proporciona resultados medibles. Las predicciones y recomendaciones de la IA pueden compararse posteriormente con las revisiones humanas y con los resultados reales de los pagadores, creando un ciclo de feedback que puede utilizarse para evaluar y mejorar el sistema con el tiempo.

### Cumplimiento y Gobierno del Dato

HealthCore opera bajo HIPAA en Estados Unidos y UK GDPR en Reino Unido. La información de los pacientes, los registros de acceso y las pistas de auditoría están actualmente distribuidos entre múltiples sistemas.

Esta área es especialmente interesante porque un sistema de IA que opera entre diferentes jurisdicciones y clínicas debe recuperar y utilizar la información correcta respetando al mismo tiempo las restricciones de privacidad, autorización, regulación y organización.

Esto crea una oportunidad para explorar RAG seguro y consciente de las políticas aplicables, fuentes de conocimiento versionadas, protección de PII/PHI, auditabilidad, defensas frente a prompt injection y escalado explícito cuando la información sea insuficiente, contradictoria o se encuentre fuera del nivel de autonomía permitido al sistema.

### Tecnología

HealthCore tiene actualmente múltiples sistemas desconectados, sin una capa de datos compartida, telemetría centralizada ni monitorización.

El departamento de Tecnología necesita una API central, pipelines de datos, monitorización en tiempo real, health checks automatizados y documentación técnica indexada para búsqueda semántica.

Esta área es relevante para el proyecto porque una IA confiable requiere infraestructura alrededor de los propios modelos: observabilidad, tracing, versionado, monitorización, controles de seguridad y capacidad para reconstruir cómo se produjo una determinada decisión asistida por IA.

## Milestone / Reto de Automatización

El milestone que me gustaría explorar es un **flujo de revisión de reclamaciones previo al envío, asistido por IA y con supervisión humana basada en riesgo**.

Antes de enviar una reclamación, el sistema analizaría la reclamación y su información de soporte y recuperaría las reglas de facturación, documentación del pagador, políticas corporativas, procedimientos locales e información regulatoria relevante aplicable a su contexto.

El sistema identificaría posibles problemas, proporcionaría evidencia que respalde sus conclusiones y estimaría el riesgo asociado a la reclamación.

En lugar de confiar automáticamente en cada recomendación de la IA, políticas de decisión explícitas determinarían si el flujo puede continuar, si es necesario solicitar información adicional, si se debe volver a intentar alguna parte del análisis o si un especialista humano debe revisar el caso.

Por tanto, los casos que involucren evidencia insuficiente, políticas contradictorias, condiciones inusuales, decisiones de alto impacto u otras restricciones predefinidas podrían escalarse automáticamente para revisión humana.

Las decisiones humanas y los resultados finales de los pagadores se registrarían como feedback, permitiendo evaluar y monitorizar el rendimiento del sistema a lo largo del tiempo.

## My AI Agent Idea

Propongo un **HealthCore AI Revenue Cycle Copilot**, un agente interno de IA diseñado para asistir al equipo de Ciclo de Ingresos y Facturación.

El agente podría operar de dos formas complementarias: **de manera proactiva**, revisando automáticamente las reclamaciones antes de su envío, y **de manera interactiva**, asistiendo al personal autorizado de Ciclo de Ingresos mediante una interfaz conversacional.

### Modo proactivo: revisión de reclamaciones

Cuando una reclamación esté preparada para su procesamiento, el agente podría:

- Analizar la información estructurada de la reclamación y la documentación de soporte relevante.
- Determinar el contexto de la reclamación, como clínica, jurisdicción, pagador y tipo de reclamación.
- Recuperar las reglas de facturación, documentación del pagador, políticas corporativas, procedimientos locales e información regulatoria aplicables.
- Identificar información ausente, inconsistente o potencialmente problemática.
- Estimar el riesgo de rechazo y el riesgo asociado a la decisión.
- Proporcionar evidencia y referencias que respalden sus conclusiones.
- Recomendar si el flujo normal puede continuar o si es necesaria una revisión humana.

El agente no tendría autonomía ilimitada. Sus acciones estarían gobernadas por políticas explícitas de riesgo y cumplimiento, y situaciones como políticas contradictorias, evidencia insuficiente, decisiones de alto riesgo o problemas de seguridad podrían requerir obligatoriamente intervención humana.

### Modo conversacional: Revenue Cycle Copilot

El mismo agente proporcionaría una interfaz conversacional interna para el personal autorizado de Ciclo de Ingresos y Facturación.

Los usuarios podrían realizar preguntas como:

- "¿Cuál es el estado actual de esta reclamación?"
- "¿Por qué esta reclamación fue clasificada como de alto riesgo?"
- "¿Por qué esta reclamación fue enviada a revisión humana?"
- "¿Qué política respalda esta recomendación?"
- "Muéstrame las reclamaciones que están actualmente esperando revisión."
- "¿Qué patrones de rechazo estamos observando para este pagador?"

El Copilot utilizaría diferentes fuentes de información dependiendo de la pregunta. La información operativa estructurada, como el estado o historial de una reclamación, se obtendría mediante APIs y herramientas autorizadas, mientras que las políticas, procedimientos y otros conocimientos no estructurados se recuperarían mediante RAG.

El agente también podría ejecutar acciones controladas, como crear una tarea de revisión humana o solicitar información adicional, siempre sujeto al rol y permisos del usuario, al nivel de riesgo de la acción y a los requisitos de aprobación correspondientes.

La interfaz conversacional estaría inicialmente diseñada para uso interno del personal de HealthCore, no para pacientes.

### Información y conocimiento necesarios

La plataforma necesitaría acceso controlado a:

- Información e historial de las reclamaciones.
- Documentación clínica relevante.
- Historial de reclamaciones aceptadas y rechazadas.
- Información de la clínica y jurisdicción.
- Reglas de facturación y codificación.
- Documentación específica de los pagadores.
- Políticas corporativas de HealthCore.
- Procedimientos locales de las clínicas.
- Documentación regulatoria y de cumplimiento relevante.
- Identidad, rol, permisos y políticas de acceso de los usuarios.

Las fuentes de conocimiento estarían versionadas y asociadas a metadatos como jurisdicción, clínica, tipo de documento, autoridad y fechas de vigencia. Esto permitiría restringir la recuperación de información a aquella aplicable a cada caso y ayudaría a reconstruir decisiones históricas utilizando la información que estaba vigente en ese momento.

### Resultados y acciones del agente

El agente podría producir:

- Problemas o inconsistencias identificados en una reclamación.
- Riesgo estimado de rechazo o de la decisión.
- Evidencia de soporte y referencias a las fuentes.
- Información ausente o contradictoria.
- Próximas acciones recomendadas.
- Solicitudes de revisión humana.
- Respuestas fundamentadas a las preguntas de usuarios internos.
- Ejecución controlada de herramientas de acuerdo con los permisos del usuario y las políticas de riesgo.
- Una pista de auditoría completa de las decisiones y acciones asistidas por IA.

Cada ejecución relevante de IA sería trazable hasta el modelo, prompt, conocimiento recuperado, llamadas a herramientas, versiones de las políticas y reglas de decisión involucradas.

Un objetivo fundamental del proyecto sería conseguir que las decisiones asistidas por IA sean **medibles, trazables, reproducibles y auditables**, proporcionando evidencia que permita determinar cuándo se puede confiar en una recomendación de la IA y definiendo cuándo la intervención humana es obligatoria.

Por tanto, el proyecto proporcionaría una oportunidad para explorar prácticas de AI Engineering para producción, incluyendo **RAG y evaluación de RAG, versionado de modelos y prompts, observabilidad de IA, risk scoring, flujos human-in-the-loop, seguridad de PII/PHI, auditabilidad, guardrails, detección de drift, pruebas de prompt injection y evaluación de agentes y herramientas**.