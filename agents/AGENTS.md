# Reglas de desarrollo para agentes de IA

**Alcance:** estas reglas aplican cuando se creen, modifiquen, evalúen o prueben archivos bajo `agents/**`. Complementan el `AGENTS.md` de la raíz; no lo sustituyen.

## Reglas

- Antes de cambiar un agente, consulta el objetivo y alcance en `memory-bank/projectbrief.md`, el stack en `memory-bank/techContext.md` y las restricciones pertinentes de `docs/security-and-privacy.md`.
- Cada agente debe tener un propósito delimitado, entradas y salidas definidas, y herramientas limitadas a las necesarias para ese propósito.
- Fundamenta las recomendaciones en fuentes autorizadas y aplicables al contexto. Expón referencias y señala cuando falte evidencia o las fuentes entren en conflicto.
- Valida la salida del modelo contra un contrato antes de utilizarla o persistirla. No trates una respuesta del modelo como autorización para ejecutar una acción.
- Escala a revisión humana los casos de alto riesgo, evidencia insuficiente, información contradictoria o situaciones fuera del alcance aprobado.
- No envíes PHI a OpenAI ni a otro proveedor hasta que el flujo y el uso estén aprobados. Nunca incluyas PHI, documentos, prompts, respuestas o secretos en logs, trazas o métricas.
- Prueba el comportamiento con datos sintéticos y proveedores simulados. Cubre, cuando corresponda, salidas inválidas, fuentes ausentes o contradictorias y escalado a una persona.
