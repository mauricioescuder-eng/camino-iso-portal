# Convenciones del Portal CAMINO Gestión & Datos — Transporte Jorajuria

## Carga de Mantenimientos (manual, por lote, o vía `saveMantenimiento`)

- **Si un repuesto encaja en un casillero fijo del formulario de
  Mantenimientos** (ej. "Filtros y lubricantes - Filtro de aceite",
  "Filtros y lubricantes - Aceite de caja/diferencial", "Motor -
  Sellador de junta", etc.), **siempre** hay que cargarlo ahí con su
  cantidad y costo unitario reales — nunca meterlo como texto suelto
  en "Detalle", aunque sea más rápido. Esto es necesario para que
  "Repuestos por categoría" y "Repuestos más usados" cuenten bien las
  cantidades. Esto incluye repuestos que no tienen un nombre propio
  dedicado pero sí encajan en el "Otro" de su categoría: **ese "Otro"
  también hay que usarlo con cantidad y costo real**, no dejarlo
  vacío con todo en "Detalle" como texto — es el error más fácil de
  cometer (pasó la primera vez: se cargaron 3 ítems con casillero
  fijo pero el resto quedó solo como texto, incluido uno con cantidad
  bien clara en el Excel origen).
  Como cada categoría tiene un solo "Otro" (y un solo casillero por
  nombre fijo), cuando compiten varios repuestos por el mismo
  casillero: elegir el de **mayor costo** para ocupar el casillero
  con cantidad real, y dejar los demás como texto en "Detalle" (o
  pedirle al usuario agregar más casilleros "Otro" al formulario si
  quiere el detalle completo de todos).

- **Los montos que se cargan son siempre el subtotal de la factura,
  sin IVA** (confirmado explícitamente por el usuario varias veces).

- **Un mismo trabajo de mantenimiento real, cargado en dos monedas
  distintas** (parte en pesos, parte en dólares) → van como DOS
  registros separados, el segundo con el campo "Vinculado a otro
  mantenimiento N°" apuntando al primero. El portal los agrupa,
  cuenta el evento una sola vez, y suma el costo combinado.

- El N° de cada mantenimiento que ves en el portal es **calculado en
  el navegador** (no se guarda en la planilla) — se arma ordenando
  todos los mantenimientos por fecha y numerando. Es estable entre
  sesiones/filtros porque se indexa por referencia de objeto, no por
  texto. Para saber a qué N° vincular un registro nuevo, primero hay
  que leer el estado actual (acción `mantenimientos` de la API) y
  recalcular ese orden, no asumirlo de memoria.

- La hoja "Respuestas de formulario 3" (Mantenimientos) tiene varias
  columnas duplicadas por rediseños anteriores del formulario (Área,
  Tipo, Detalle, Km, Taller, N° de factura, Observaciones, Cantidad
  de días en el taller, Próximo mantenimiento, y dos "Costo total").
  Al escribir desde código (`saveMantenimiento` en
  `API_Transporte_Jorajuria.gs`), estos duplicados ya están resueltos
  con `setColTodasCoincidencias`/`setColExacta` — no hay que
  reinventar esa lógica, solo reutilizar esas funciones si se agregan
  más campos.
