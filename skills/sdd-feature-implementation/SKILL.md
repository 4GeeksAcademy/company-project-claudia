---
name: sdd-feature-implementation
description: Implementa una funcionalidad expresamente solicitada a partir de una especificación aprobada y criterios de aceptación verificables, siguiendo las decisiones y patrones existentes del repositorio.
---

# Implementación de funcionalidades con SDD

## Objetivo

Implementar una funcionalidad aprobada y dejar evidencia verificable de cómo satisface sus criterios de aceptación, sin inventar requisitos ni ampliar el alcance.

## Cuándo usarla

Usa esta skill cuando el desarrollador solicite implementar o modificar comportamiento del producto y exista una especificación o descripción aprobada con criterios de aceptación.

No la uses para solicitudes exclusivamente de análisis, revisión, planificación o documentación. La existencia de una spec, un plan o una aprobación de diseño no autoriza por sí sola a implementar; debe existir una solicitud explícita de implementación.

## Inputs necesarios

- La especificación o descripción aprobada de la funcionalidad.
- Criterios de aceptación observables y verificables.
- El alcance solicitado y, si corresponde, las exclusiones conocidas.
- El estado actual del repositorio y el código relacionado con la funcionalidad.
- El contexto aplicable: `memory-bank/projectbrief.md`, `memory-bank/techContext.md`, `docs/security-and-privacy.md` y los ADRs relevantes.

Si falta información que impide determinar el comportamiento esperado, o las fuentes se contradicen, detente y solicita aclaración antes de implementar.

## Procedimiento

1. Confirma que la solicitud autoriza la implementación e identifica la spec y sus criterios de aceptación.
2. Consulta las fuentes de verdad y el código y las pruebas cercanos; sigue los patrones existentes del repositorio y el stack aprobado.
3. Relaciona cada criterio de aceptación con el comportamiento que debe cambiar y con la prueba o verificación que aportará evidencia.
4. Implementa el cambio más pequeño que satisfaga los criterios. No añadas dependencias, capas o arquitectura no aprobadas sin una necesidad justificada.
5. Actualiza pruebas y documentación afectadas junto con contratos, persistencia o consumidores que cambien.
6. Ejecuta las verificaciones pertinentes para las capas afectadas. Usa proveedores simulados y datos sintéticos; no conectes pruebas a proveedores reales sin autorización explícita.
7. Revisa el diff para confirmar que no haya cambios fuera del alcance, PHI, secretos ni contenido sensible.
8. Informa qué se implementó, cómo se cubre cada criterio, qué verificaciones se ejecutaron y qué queda pendiente. No declares exitosas verificaciones que no se ejecutaron.

## Criterios de aceptación de la skill

La implementación solo se considera completa cuando:

- Cada criterio de aceptación está asociado a código y evidencia de verificación, o se identifica explícitamente como bloqueado o no verificable con la información disponible.
- Los criterios de comportamiento tienen pruebas deterministas pertinentes cuando sea posible; las pruebas siguen los patrones existentes y el nivel de riesgo del cambio.
- Se ejecutan y reportan las verificaciones aplicables a las capas modificadas, como pruebas unitarias, integración con Testcontainers, E2E con Playwright, build o lint cuando existan.
- Las decisiones ambiguas de producto, seguridad, privacidad o arquitectura se escalan; no se resuelven por inferencia.
- El diff permanece dentro del alcance solicitado y no introduce datos reales de pacientes, PHI en fixtures o logs, secretos ni dependencias innecesarias.

## Límites

- Esta skill guía la implementación; no sustituye las especificaciones, los ADRs, `AGENTS.md` ni `docs/security-and-privacy.md`.
- No autoriza commits, push ni cambios en rutas protegidas; sigue las instrucciones raíz para esas acciones.
- No define un porcentaje global de cobertura. La cobertura requerida se determina por los criterios de aceptación, las capas afectadas y el riesgo del cambio.
