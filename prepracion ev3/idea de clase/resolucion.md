# Análisis y Solución — Caso URBAN WHEELS LTDA.

> Este documento cubre **dos ejercicios** encontrados en los archivos entregados (`formab_parte1` y `formab_parte2`). Comparten el mismo negocio y la misma base de datos, pero piden construir **dos procesos PL/SQL distintos**, sobre **dos tablas de resultado distintas**. Ambos ya fueron validados ejecutando la lógica contra los datos reales del script `BD_arriendo_vehiculos_URBAN_WHEELS.sql`: los resultados calculados coinciden, fila por fila, con las tablas de "Resultado esperado" de los PDFs.

## Contexto común a ambos ejercicios

- **Tablas involucradas (ya existen, no se crean):**
  - `VEHICULO_ELECTRICO` — catálogo de la flota (`cod_vehiculo`, `modelo`, `id_tipo_vehiculo`, `valor_arriendo_dia`, etc.).
  - `ARRIENDO_VEHICULO` — historial de arriendos (`cod_vehiculo`, `fecha_ini_arriendo`, `dias_solicitados`, etc.).
  - `TIPO_VEHICULO` — traduce `id_tipo_vehiculo` ('B','S','P','U','T') a su nombre descriptivo.
  - `PARAM_AJUSTE_DEMANDA` — tabla paramétrica con el porcentaje de ajuste por clasificación (ya tiene datos cargados).
  - `RESUMEN_ANUAL_VEHICULO` y `AJUSTE_TARIFA_VEHICULO` — tablas de resultado (ya creadas, vacías; las llenamos nosotros).
- **Año de proceso:** 2025, fijo (no se pide parametrizarlo por el usuario).
- **Formato exigido:** un **bloque PL/SQL anónimo** (`DECLARE ... BEGIN ... END;`), no un procedimiento ni una función.
- **Regla de clasificación de demanda (igual en ambos ejercicios):**

| Cantidad de arriendos en 2025 | Clasificación |
|---|---|
| 6 o más | Alta |
| 3 a 5 | Media |
| 1 a 2 | Baja |
| 0 (sin arriendos) | Sin Demanda |

---

# EJERCICIO 1 — Resumen anual de demanda

## 1. Requerimiento, reformulado sin ambigüedad

> "Construya un bloque PL/SQL anónimo que, para cada vehículo de la tabla `VEHICULO_ELECTRICO`, calcule —usando únicamente los arriendos del año 2025 registrados en `ARRIENDO_VEHICULO`— la cantidad de arriendos, el total de días arrendados, el promedio de días por arriendo, el ingreso generado y la clasificación de demanda del vehículo. El resultado debe insertarse en la tabla `RESUMEN_ANUAL_VEHICULO`, ordenado por código de vehículo, y debe poder volver a ejecutarse sin duplicar datos."

## 2. Qué pide exactamente (checklist de la evaluación)

**Tabla destino:** `RESUMEN_ANUAL_VEHICULO`

| Columna a llenar | Cómo se obtiene |
|---|---|
| `cod_vehiculo`, `tipo_vehiculo`, `modelo` | Directo desde `VEHICULO_ELECTRICO` (y `TIPO_VEHICULO` para el nombre del tipo) |
| `anno_proceso` | Constante 2025 |
| `cantidad_arriendos` | `COUNT(*)` de arriendos 2025 de ese vehículo |
| `total_dias` | `SUM(dias_solicitados)` de esos arriendos |
| `promedio_dias` | `total_dias / cantidad_arriendos`, redondeado a entero; **0 si `cantidad_arriendos = 0`** |
| `ingreso_arriendo` | `valor_arriendo_dia × total_dias` |
| `clasificacion_demanda` | Según la tabla de clasificación, decidida con IF/CASE en PL/SQL |

**Reglas de diseño obligatorias** (esto es lo que realmente califican):
1. `TRUNCATE TABLE RESUMEN_ANUAL_VEHICULO;` al inicio del bloque, para poder re-ejecutar sin error de PK duplicada.
2. Cursor explícito **sin parámetros**, sobre `VEHICULO_ELECTRICO` (con join a `TIPO_VEHICULO`), que traiga **solo** los datos básicos: código, modelo, tipo y valor de arriendo diario. Nada de `COUNT`/`SUM` dentro de ese cursor.
3. `COUNT` y `SUM` se obtienen en **sentencias `SELECT ... INTO` separadas**, dentro del loop, una por cada función de grupo.
4. La clasificación de demanda se decide en PL/SQL con `IF` o `CASE`, no con SQL.
5. Todos los cálculos (promedio, ingreso) se hacen con variables PL/SQL.
6. Inserción ordenada por `cod_vehiculo`.
7. `COMMIT` al final.

## 3. Estrategia de solución (el razonamiento antes de programar)

1. Declarar variables para cada dato que viaja "vehículo por vehículo": código, modelo, tipo, valor diario, cantidad, total días, promedio, ingreso, clasificación.
2. Declarar el cursor `c_vehiculos` con el `SELECT` mínimo exigido (código, modelo, tipo, valor_arriendo_dia), ordenado por `cod_vehiculo` para garantizar el orden de inserción sin depender del orden físico de la tabla.
3. `TRUNCATE` la tabla de resultado.
4. Abrir el cursor con un `LOOP ... EXIT WHEN c_vehiculos%NOTFOUND`.
5. Dentro del loop, por cada vehículo:
   - `SELECT COUNT(*) INTO v_cantidad FROM ARRIENDO_VEHICULO WHERE cod_vehiculo = v_cod AND EXTRACT(YEAR FROM fecha_ini_arriendo) = 2025;`
   - `SELECT NVL(SUM(dias_solicitados),0) INTO v_total_dias FROM ARRIENDO_VEHICULO WHERE ...;` (con `NVL` porque `SUM` sobre cero filas da `NULL`, y la tabla exige `NOT NULL`/default 0).
   - Calcular `v_promedio` con un `IF v_cantidad = 0 THEN 0 ELSE ROUND(v_total_dias / v_cantidad) END IF;` — esto evita división por cero, que en PL/SQL lanza la excepción `ZERO_DIVIDE`.
   - Calcular `v_ingreso := v_valor_dia * v_total_dias;`
   - Clasificar con `IF/ELSIF` según los rangos de la tabla.
   - `INSERT INTO RESUMEN_ANUAL_VEHICULO VALUES (...)`.
6. Cerrar el loop, hacer `COMMIT`.

**Por qué `SELECT...INTO` separados y no uno solo con dos agregaciones:** la consigna lo exige explícitamente ("Los valores que requieran funciones de grupo deben obtenerse en sentencias SELECT por separado"). Es deliberado: el objetivo pedagógico es que el alumno demuestre manejo de múltiples `SELECT INTO` dentro de un cursor, no que optimice combinándolos.

## 4. Solución en código

```sql
-- ============================================================
-- BLOQUE PL/SQL: RESUMEN ANUAL DE DEMANDA POR VEHICULO - 2025
-- Tabla destino: RESUMEN_ANUAL_VEHICULO
-- ============================================================
DECLARE

    -- Cursor explicito SIN parametros: solo datos basicos del vehiculo
    CURSOR c_vehiculos IS
        SELECT v.cod_vehiculo,
               t.nombre_tipo_vehiculo,
               v.modelo,
               v.valor_arriendo_dia
          FROM VEHICULO_ELECTRICO v
          JOIN TIPO_VEHICULO t ON t.id_tipo_vehiculo = v.id_tipo_vehiculo
         ORDER BY v.cod_vehiculo;

    -- Variables para los datos basicos (una fila del cursor)
    v_cod_vehiculo   VEHICULO_ELECTRICO.cod_vehiculo%TYPE;
    v_tipo_vehiculo  TIPO_VEHICULO.nombre_tipo_vehiculo%TYPE;
    v_modelo         VEHICULO_ELECTRICO.modelo%TYPE;
    v_valor_dia      VEHICULO_ELECTRICO.valor_arriendo_dia%TYPE;

    -- Variables para los calculos por vehiculo
    v_cantidad       NUMBER(5);
    v_total_dias     NUMBER(6);
    v_promedio_dias  NUMBER(5);
    v_ingreso        NUMBER(12);
    v_clasificacion  VARCHAR2(15);

    v_anno_proceso   CONSTANT NUMBER(4) := 2025;

BEGIN

    -- Se trunca para permitir reejecutar el bloque sin error de PK duplicada
    EXECUTE IMMEDIATE 'TRUNCATE TABLE RESUMEN_ANUAL_VEHICULO';

    OPEN c_vehiculos;
    LOOP
        FETCH c_vehiculos INTO v_cod_vehiculo, v_tipo_vehiculo, v_modelo, v_valor_dia;
        EXIT WHEN c_vehiculos%NOTFOUND;

        -- (1) Cantidad de arriendos del anio 2025 - SELECT separado, funcion de grupo COUNT
        SELECT COUNT(*)
          INTO v_cantidad
          FROM ARRIENDO_VEHICULO
         WHERE cod_vehiculo = v_cod_vehiculo
           AND EXTRACT(YEAR FROM fecha_ini_arriendo) = v_anno_proceso;

        -- (2) Total de dias arrendados en 2025 - SELECT separado, funcion de grupo SUM
        SELECT NVL(SUM(dias_solicitados), 0)
          INTO v_total_dias
          FROM ARRIENDO_VEHICULO
         WHERE cod_vehiculo = v_cod_vehiculo
           AND EXTRACT(YEAR FROM fecha_ini_arriendo) = v_anno_proceso;

        -- (3) Promedio de dias por arriendo, redondeado a entero; 0 si no hubo arriendos
        IF v_cantidad = 0 THEN
            v_promedio_dias := 0;
        ELSE
            v_promedio_dias := ROUND(v_total_dias / v_cantidad);
        END IF;

        -- (4) Ingreso por arriendo = valor diario del vehiculo x total de dias
        v_ingreso := ROUND(v_valor_dia * v_total_dias);

        -- (5) Clasificacion de demanda, decidida en PL/SQL con IF/ELSIF
        IF v_cantidad >= 6 THEN
            v_clasificacion := 'Alta';
        ELSIF v_cantidad >= 3 THEN
            v_clasificacion := 'Media';
        ELSIF v_cantidad >= 1 THEN
            v_clasificacion := 'Baja';
        ELSE
            v_clasificacion := 'Sin Demanda';
        END IF;

        INSERT INTO RESUMEN_ANUAL_VEHICULO (
            cod_vehiculo, anno_proceso, tipo_vehiculo, modelo,
            cantidad_arriendos, total_dias, promedio_dias,
            ingreso_arriendo, clasificacion_demanda
        ) VALUES (
            v_cod_vehiculo, v_anno_proceso, v_tipo_vehiculo, v_modelo,
            v_cantidad, v_total_dias, v_promedio_dias,
            v_ingreso, v_clasificacion
        );

    END LOOP;
    CLOSE c_vehiculos;

    COMMIT;

    DBMS_OUTPUT.PUT_LINE('Resumen anual de demanda 2025 generado correctamente.');

END;
/
```

### Justificación de decisiones puntuales

- **`EXECUTE IMMEDIATE 'TRUNCATE TABLE ...'`**: `TRUNCATE` es DDL y PL/SQL no lo acepta como sentencia directa; debe lanzarse con `EXECUTE IMMEDIATE`. (Una alternativa válida es usar `DELETE FROM RESUMEN_ANUAL_VEHICULO;` si el profesor prefiere evitar DDL dinámico — ambas cumplen "vaciar la tabla", pero la consigna dice literalmente "TRUNCAR", así que se deja `TRUNCATE`).
- **`EXTRACT(YEAR FROM fecha_ini_arriendo) = 2025`**: filtra por el año de inicio del arriendo. Alternativa equivalente: `fecha_ini_arriendo BETWEEN TO_DATE('01/01/2025','DD/MM/YYYY') AND TO_DATE('31/12/2025','DD/MM/YYYY')`. Se usó `EXTRACT` por claridad, ambas son correctas.
- **`NVL(SUM(...), 0)`**: si un vehículo no tiene arriendos en 2025, `SUM` sobre cero filas devuelve `NULL`. Sin el `NVL`, `v_total_dias` quedaría `NULL` y el `INSERT` fallaría (la columna no admite nulos por default 0, pero además el cálculo del ingreso se rompería).
- **Promedio con `IF` antes de dividir**: si no se valida `v_cantidad = 0` antes, `ROUND(v_total_dias / v_cantidad)` lanza `ORA-01476: divisor is equal to zero` en cuanto llegue a UW013.

## 5. Verificación contra el resultado esperado

Se ejecutó la misma lógica (en Python, replicando exactamente las reglas) contra los `INSERT` reales del script SQL. Resultado para los 14 vehículos, comparado contra la tabla "Resultado esperado" del PDF:

| COD | CANTIDAD | TOTAL_DIAS | PROMEDIO | INGRESO | CLASIFICACION | ¿Coincide con el PDF? |
|---|---|---|---|---|---|---|
| UW001 | 7 | 27 | 4 | 405.000 | Alta | ✅ |
| UW002 | 6 | 21 | 4 | 378.000 | Alta | ✅ |
| UW003 | 4 | 14 | 4 | 308.000 | Media | ✅ |
| UW004 | 4 | 11 | 3 | 275.000 | Media | ✅ |
| UW005 | 8 | 50 | 6 | 3.250.000 | Alta | ✅ |
| UW006 | 3 | 9 | 3 | 180.000 | Media | ✅ |
| UW007 | 3 | 14 | 5 | 392.000 | Media | ✅ |
| UW008 | 3 | 6 | 2 | 108.000 | Media | ✅ |
| UW009 | 6 | 27 | 4 | 945.000 | Alta | ✅ |
| UW010 | 3 | 9 | 3 | 108.000 | Media | ✅ |
| UW011 | 3 | 12 | 4 | 192.000 | Media | ✅ |
| UW012 | 3 | 6 | 2 | 126.000 | Media | ✅ |
| UW013 | 0 | 0 | 0 | 0 | Sin Demanda | ✅ |
| UW014 | 2 | 5 | 2 | 150.000 | Baja | ✅ |

**Las 14 filas coinciden exactamente** con lo que muestra el documento de la evaluación.

---

# EJERCICIO 2 — Propuesta de ajuste de tarifas

## 1. Requerimiento, reformulado sin ambigüedad

> "Construya un bloque PL/SQL anónimo que, para cada vehículo de `VEHICULO_ELECTRICO`, determine su clasificación de demanda según la cantidad de arriendos del año 2025 (misma regla del ejercicio anterior), busque en la tabla paramétrica `PARAM_AJUSTE_DEMANDA` el porcentaje de ajuste correspondiente a esa clasificación, calcule el nuevo valor de arriendo propuesto y la diferencia respecto al valor actual, y determine una observación de gestión. El resultado debe insertarse en `AJUSTE_TARIFA_VEHICULO`, ordenado por código de vehículo, pudiendo re-ejecutarse sin duplicar datos."

## 2. Qué pide exactamente (checklist de la evaluación)

**Tabla destino:** `AJUSTE_TARIFA_VEHICULO`

| Columna a llenar | Cómo se obtiene |
|---|---|
| `cod_vehiculo` | Directo desde `VEHICULO_ELECTRICO` |
| `anno_proceso` | Constante 2025 |
| `clasificacion_demanda` | Según cantidad de arriendos 2025, con IF/CASE en PL/SQL (igual regla que ejercicio 1) |
| `valor_actual` | `valor_arriendo_dia` actual del vehículo |
| `porc_ajuste` | Se busca en `PARAM_AJUSTE_DEMANDA.porc_ajuste`, filtrando por la clasificación ya calculada — **no se hardcodea** |
| `valor_propuesto` | `valor_actual × (1 + porc_ajuste/100)`, redondeado |
| `diferencia` | `valor_propuesto − valor_actual` |
| `observacion` | Texto fijo según clasificación (Alta→"Subir tarifa", Media→"Mantener / ajuste leve", Baja→"Bajar tarifa", Sin Demanda→"Evaluar retiro") |

**Reglas de diseño obligatorias:**
1. `TRUNCATE TABLE AJUSTE_TARIFA_VEHICULO;` al inicio.
2. Cursor explícito **sin parámetros** sobre `VEHICULO_ELECTRICO`, que traiga **solo** código y valor de arriendo diario (más austero que el cursor del ejercicio 1: aquí no se pide modelo ni tipo).
3. El `COUNT` de arriendos 2025 va en `SELECT ... INTO` separado.
4. El porcentaje de ajuste se obtiene con **otro `SELECT ... INTO` separado** contra `PARAM_AJUSTE_DEMANDA`.
5. Clasificación con IF/CASE en PL/SQL.
6. Inserción ordenada por `cod_vehiculo`.
7. `COMMIT` al final.

## 3. Estrategia de solución

1. Declarar variables: código, valor actual, cantidad de arriendos, clasificación, porcentaje, valor propuesto, diferencia, observación.
2. Cursor `c_vehiculos` con `SELECT cod_vehiculo, valor_arriendo_dia FROM VEHICULO_ELECTRICO ORDER BY cod_vehiculo`.
3. `TRUNCATE` la tabla de resultado.
4. Loop por cada vehículo:
   - `SELECT COUNT(*) INTO v_cantidad FROM ARRIENDO_VEHICULO WHERE cod_vehiculo = v_cod AND año = 2025;`
   - Clasificar con IF/ELSIF (misma regla que ejercicio 1) → `v_clasificacion`.
   - `SELECT porc_ajuste INTO v_porc FROM PARAM_AJUSTE_DEMANDA WHERE clasificacion = v_clasificacion;` — este es el paso que diferencia este ejercicio: el porcentaje **no se escribe a mano**, se lee de la tabla paramétrica usando como llave el texto de la clasificación recién calculada.
   - Calcular `v_valor_propuesto := ROUND(v_valor_actual * (1 + v_porc/100));`
   - Calcular `v_diferencia := v_valor_propuesto - v_valor_actual;`
   - Determinar `v_observacion` con IF/ELSIF según la clasificación.
   - `INSERT INTO AJUSTE_TARIFA_VEHICULO VALUES (...)`.
5. Cerrar el loop, `COMMIT`.

**Por qué leer el porcentaje desde la tabla y no repetirlo en un IF:** es una buena práctica de diseño que el ejercicio premia explícitamente ("El porcentaje de ajuste debe obtenerse desde la tabla PARAM_AJUSTE_DEMANDA en una sentencia SELECT por separado"). Si el día de mañana la empresa decide que "Alta" ya no es +12% sino +15%, el cambio se hace con un `UPDATE` a una fila de parámetros, sin tocar el código PL/SQL. Es exactamente el mismo principio que hardcodear vs. parametrizar una constante.

## 4. Solución en código

```sql
-- ============================================================
-- BLOQUE PL/SQL: PROPUESTA DE AJUSTE DE TARIFAS - 2025
-- Tabla destino: AJUSTE_TARIFA_VEHICULO
-- ============================================================
DECLARE

    -- Cursor explicito SIN parametros: solo datos basicos del vehiculo
    CURSOR c_vehiculos IS
        SELECT cod_vehiculo, valor_arriendo_dia
          FROM VEHICULO_ELECTRICO
         ORDER BY cod_vehiculo;

    -- Variables para los datos basicos (una fila del cursor)
    v_cod_vehiculo     VEHICULO_ELECTRICO.cod_vehiculo%TYPE;
    v_valor_actual     VEHICULO_ELECTRICO.valor_arriendo_dia%TYPE;

    -- Variables para los calculos por vehiculo
    v_cantidad         NUMBER(5);
    v_clasificacion    VARCHAR2(15);
    v_porc_ajuste      NUMBER(5,2);
    v_valor_propuesto  NUMBER(7);
    v_diferencia       NUMBER(8);
    v_observacion      VARCHAR2(40);

    v_anno_proceso     CONSTANT NUMBER(4) := 2025;

BEGIN

    -- Se trunca para permitir reejecutar el bloque sin error de PK duplicada
    EXECUTE IMMEDIATE 'TRUNCATE TABLE AJUSTE_TARIFA_VEHICULO';

    OPEN c_vehiculos;
    LOOP
        FETCH c_vehiculos INTO v_cod_vehiculo, v_valor_actual;
        EXIT WHEN c_vehiculos%NOTFOUND;

        -- (1) Cantidad de arriendos del anio 2025 - SELECT separado, funcion de grupo COUNT
        SELECT COUNT(*)
          INTO v_cantidad
          FROM ARRIENDO_VEHICULO
         WHERE cod_vehiculo = v_cod_vehiculo
           AND EXTRACT(YEAR FROM fecha_ini_arriendo) = v_anno_proceso;

        -- (2) Clasificacion de demanda, decidida en PL/SQL con IF/ELSIF
        IF v_cantidad >= 6 THEN
            v_clasificacion := 'Alta';
        ELSIF v_cantidad >= 3 THEN
            v_clasificacion := 'Media';
        ELSIF v_cantidad >= 1 THEN
            v_clasificacion := 'Baja';
        ELSE
            v_clasificacion := 'Sin Demanda';
        END IF;

        -- (3) Porcentaje de ajuste obtenido desde la tabla parametrica - SELECT separado
        SELECT porc_ajuste
          INTO v_porc_ajuste
          FROM PARAM_AJUSTE_DEMANDA
         WHERE clasificacion = v_clasificacion;

        -- (4) Valor propuesto = valor actual x (1 + %/100), redondeado
        v_valor_propuesto := ROUND(v_valor_actual * (1 + v_porc_ajuste / 100));

        -- (5) Diferencia entre el valor propuesto y el actual
        v_diferencia := v_valor_propuesto - v_valor_actual;

        -- (6) Observacion de gestion segun clasificacion
        IF v_clasificacion = 'Alta' THEN
            v_observacion := 'Subir tarifa';
        ELSIF v_clasificacion = 'Media' THEN
            v_observacion := 'Mantener / ajuste leve';
        ELSIF v_clasificacion = 'Baja' THEN
            v_observacion := 'Bajar tarifa';
        ELSE
            v_observacion := 'Evaluar retiro';
        END IF;

        INSERT INTO AJUSTE_TARIFA_VEHICULO (
            cod_vehiculo, anno_proceso, clasificacion_demanda,
            valor_actual, porc_ajuste, valor_propuesto,
            diferencia, observacion
        ) VALUES (
            v_cod_vehiculo, v_anno_proceso, v_clasificacion,
            v_valor_actual, v_porc_ajuste, v_valor_propuesto,
            v_diferencia, v_observacion
        );

    END LOOP;
    CLOSE c_vehiculos;

    COMMIT;

    DBMS_OUTPUT.PUT_LINE('Propuesta de ajuste de tarifas 2025 generada correctamente.');

END;
/
```

### Justificación de decisiones puntuales

- **`SELECT porc_ajuste INTO ... WHERE clasificacion = v_clasificacion`**: como `clasificacion` es la `PRIMARY KEY` de `PARAM_AJUSTE_DEMANDA` y siempre existen las 4 filas (Alta/Media/Baja/Sin Demanda), este `SELECT INTO` siempre encuentra exactamente una fila — no hace falta manejar `NO_DATA_FOUND`, salvo que quieras blindar el bloque ante un futuro borrado accidental de algún parámetro (ver sección de robustez más abajo).
- **`v_porc_ajuste NUMBER(5,2)`**: se declaró con la misma precisión que la columna real (`NUMBER(5,2)`), para que negativos como `-15.00` se asignen sin truncar.
- **Repetir el cálculo de clasificación en este segundo bloque**: aunque ya se calculó en el Ejercicio 1, cada bloque PL/SQL es independiente y autónomo — no puede asumir que `RESUMEN_ANUAL_VEHICULO` ya fue poblado en esta ejecución. Por eso ambos bloques recalculan la clasificación desde cero a partir de `ARRIENDO_VEHICULO`.

## 5. Verificación contra el resultado esperado

| COD | CANTIDAD | CLASIFICACION | VALOR_ACTUAL | PORC_AJUSTE | VALOR_PROPUESTO | DIFERENCIA | OBSERVACION | ¿Coincide con el PDF? |
|---|---|---|---|---|---|---|---|---|
| UW001 | 7 | Alta | 15.000 | 12,00 | 16.800 | 1.800 | Subir tarifa | ✅ |
| UW002 | 6 | Alta | 18.000 | 12,00 | 20.160 | 2.160 | Subir tarifa | ✅ |
| UW003 | 4 | Media | 22.000 | 5,00 | 23.100 | 1.100 | Mantener / ajuste leve | ✅ |
| UW004 | 4 | Media | 25.000 | 5,00 | 26.250 | 1.250 | Mantener / ajuste leve | ✅ |
| UW005 | 8 | Alta | 65.000 | 12,00 | 72.800 | 7.800 | Subir tarifa | ✅ |
| UW006 | 3 | Media | 20.000 | 5,00 | 21.000 | 1.000 | Mantener / ajuste leve | ✅ |
| UW007 | 3 | Media | 28.000 | 5,00 | 29.400 | 1.400 | Mantener / ajuste leve | ✅ |
| UW008 | 3 | Media | 18.000 | 5,00 | 18.900 | 900 | Mantener / ajuste leve | ✅ |
| UW009 | 6 | Alta | 35.000 | 12,00 | 39.200 | 4.200 | Subir tarifa | ✅ |
| UW010 | 3 | Media | 12.000 | 5,00 | 12.600 | 600 | Mantener / ajuste leve | ✅ |
| UW011 | 3 | Media | 16.000 | 5,00 | 16.800 | 800 | Mantener / ajuste leve | ✅ |
| UW012 | 3 | Media | 21.000 | 5,00 | 22.050 | 1.050 | Mantener / ajuste leve | ✅ |
| UW013 | 0 | Sin Demanda | 24.000 | -15,00 | 20.400 | -3.600 | Evaluar retiro | ✅ |
| UW014 | 2 | Baja | 30.000 | -8,00 | 27.600 | -2.400 | Bajar tarifa | ✅ |

**Las 14 filas coinciden exactamente** con la tabla del PDF.

---

# Notas finales: puntos donde el profesor probablemente te pondrá atención extra

1. **Cursor "sin parámetros"**: ambos cursores no reciben argumentos (no es `CURSOR c_x(p_anno NUMBER) IS ...`). El año 2025 se usa como constante dentro del `WHERE` de los `SELECT INTO`, no como parámetro del cursor. Esto es exactamente lo que pide la consigna en "2.2".
2. **"SÓLO los datos básicos del vehículo"**: en el Ejercicio 1 son 4 columnas (código, modelo, tipo, valor diario); en el Ejercicio 2 son solo 2 (código, valor diario). Si tu cursor trae una columna de más (por ejemplo, si metes `autonomia_km` sin necesidad), probablemente pierdas puntos en el criterio de eficiencia/diseño.
3. **Redondeo**: la consigna pide "todos los cálculos deben redondearse a valores enteros". Eso aplica a `promedio_dias`, `ingreso_arriendo`, `valor_propuesto` y `diferencia` (que sale de restar dos enteros, así que ya queda entero). `porc_ajuste` no se redondea a entero porque la tabla destino lo define como `NUMBER(5,2)` y el valor en el PDF mantiene "12", "5", "-8", "-15" sin decimales visibles, pero la columna admite decimales — se deja tal cual viene de la tabla paramétrica.
4. **Posibilidad de ejecutar ambos bloques en cualquier orden**: como cada uno trunca solo su propia tabla y recalcula todo desde `ARRIENDO_VEHICULO`/`VEHICULO_ELECTRICO`, puedes ejecutar el Ejercicio 1, luego el 2, o solo uno de los dos, sin que se afecten entre sí.
5. **Endurecimiento opcional (no exigido, pero suma si el profesor pregunta por excepciones):** se podría envolver cada `SELECT INTO` en un bloque `EXCEPTION WHEN NO_DATA_FOUND` para registrar un caso "vehículo sin parámetro de ajuste" en vez de que el bloque completo aborte. No se incluyó en la solución base porque la consigna no lo pide y agregar manejo de excepciones no solicitado puede leerse como "no entendiste exactamente lo mínimo pedido" en una rúbrica estricta — pero es un buen tema para mencionar oralmente si te preguntan "¿qué pasaría si...?".