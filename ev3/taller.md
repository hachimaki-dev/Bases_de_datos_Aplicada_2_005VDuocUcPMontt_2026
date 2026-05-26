# Taller de Preparación EP2 · BDY1102
## Bases de Datos Aplicadas (Oracle 19c)

Este taller está diseñado para entrenar las habilidades y la lógica necesarias para enfrentar con éxito la **Evaluación Parcial 2 (EP2)**. Para asegurar un aprendizaje efectivo, el taller sigue una estructura **progresiva** (🟢 Básico, 🟡 Intermedio, 🔴 Avanzado) y utiliza escenarios basados en la misma base de datos oficial (`BDY1102_EV2_FC`) pero en contextos de negocio completamente diferentes a los de la evaluación real.

---

## 🗺️ Estructura del Taller
El taller se compone de tres bloques principales de habilidades:

1. **Bloque A: UPDATE + CASE** (Lógica condicional masiva, manejo de fechas, redondeos).
2. **Bloque B: Vistas y Funciones de Ventana** (Joins, agregaciones analíticas, seguridad DDL).
3. **Bloque C: Optimización e Índices** (Lectura de planes de ejecución, creación de índices selectivos).

---

## 🔐 Punto de Partida: Requerimiento 1 Resuelto (DCL)
Antes de iniciar los bloques, es indispensable que ejecutes el script de creación de usuarios y roles. Esto establece la base de seguridad necesaria.

```sql
-- Ejecutar conectado como SYSTEM o ADMIN
-- 1. TABLESPACES
CREATE TABLESPACE TS_APRENDIENDO
  DATAFILE 'ts_aprendiendo.dbf' SIZE 160M AUTOEXTEND ON;
CREATE TEMPORARY TABLESPACE TS_TEMP_APRENDIENDO
  TEMPFILE 'ts_temp_aprendiendo.dbf' SIZE 90M;
CREATE TABLESPACE TS_REPORTE
  DATAFILE 'ts_reporte.dbf' SIZE 40M AUTOEXTEND ON;
CREATE TEMPORARY TABLESPACE TS_TEMP_REPORTE
  TEMPFILE 'ts_temp_reporte.dbf' SIZE 40M;

-- 2. ROLES
CREATE ROLE ROL_ADMIN;
GRANT CREATE SESSION, CREATE TABLE, CREATE SEQUENCE,
      CREATE VIEW, CREATE ANY INDEX, CREATE PUBLIC SYNONYM
  TO ROL_ADMIN;

CREATE ROLE ROL_REPORTES;
GRANT CREATE SESSION, CREATE SYNONYM TO ROL_REPORTES;

-- 3. USUARIOS
CREATE USER APRENDIENDO_SQL IDENTIFIED BY "Pass_1234"
  DEFAULT TABLESPACE TS_APRENDIENDO
  TEMPORARY TABLESPACE TS_TEMP_APRENDIENDO
  QUOTA UNLIMITED ON TS_APRENDIENDO;
GRANT ROL_ADMIN TO APRENDIENDO_SQL;

CREATE USER REPORTE_SQL IDENTIFIED BY "Pass_5678"
  DEFAULT TABLESPACE TS_REPORTE
  TEMPORARY TABLESPACE TS_TEMP_REPORTE
  QUOTA UNLIMITED ON TS_REPORTE;
GRANT ROL_REPORTES TO REPORTE_SQL;

-- 4. PRIVILEGIOS DE OBJETO (Principio de menor privilegio)
-- Otorgar accesos de lectura para reportes a REPORTE_SQL
GRANT SELECT ON APRENDIENDO_SQL.EMPLEADO               TO REPORTE_SQL;
GRANT SELECT ON APRENDIENDO_SQL.PERSONA                TO REPORTE_SQL;
GRANT SELECT ON APRENDIENDO_SQL.DEPARTAMENTO           TO REPORTE_SQL;
GRANT SELECT ON APRENDIENDO_SQL.VACACIONES             TO REPORTE_SQL;
GRANT SELECT ON APRENDIENDO_SQL.PROYECTO               TO REPORTE_SQL;
GRANT SELECT ON APRENDIENDO_SQL.TIPO_EMPLEADO          TO REPORTE_SQL;
GRANT SELECT ON APRENDIENDO_SQL.TAREA                  TO REPORTE_SQL;
GRANT SELECT ON APRENDIENDO_SQL.LICENCIA_MEDICA        TO REPORTE_SQL;
GRANT SELECT ON APRENDIENDO_SQL.DIRECCION              TO REPORTE_SQL;
GRANT SELECT ON APRENDIENDO_SQL.CONTACTO_EMERGENCIA    TO REPORTE_SQL;
GRANT SELECT ON APRENDIENDO_SQL.ASISTENCIA             TO REPORTE_SQL;
GRANT SELECT ON APRENDIENDO_SQL.EMPLEADO_PROYECTO      TO REPORTE_SQL;
GRANT SELECT ON APRENDIENDO_SQL.DETALLE_SUELDO         TO REPORTE_SQL;

-- Escritura/Lectura en tablas de gestión transaccional
GRANT SELECT, INSERT, UPDATE, DELETE ON APRENDIENDO_SQL.EMPLEADO_CAPACITACION TO REPORTE_SQL;
GRANT SELECT, INSERT, UPDATE, DELETE ON APRENDIENDO_SQL.CAPACITACION           TO REPORTE_SQL;
GRANT SELECT, INSERT, UPDATE, DELETE ON APRENDIENDO_SQL.TELEFONO               TO REPORTE_SQL;
GRANT SELECT, INSERT, UPDATE, DELETE ON APRENDIENDO_SQL.CONTACTO_EMERGENCIA    TO REPORTE_SQL;
```

---

## 🔄 BLOQUE A: UPDATE con CASE (Lógica Condicional DML)

### 📘 Conceptos Clave
* **`CASE` dentro de `SET`:** Permite aplicar diferentes cambios a filas individuales en una sola pasada de base de datos.
* **Manejo de Fechas en Oracle:**
  * Restar dos fechas (`FECHA1 - FECHA2`) da la diferencia en **días**.
  * `MONTHS_BETWEEN(fecha1, fecha2)` calcula la diferencia en **meses**.
  * Dividir por `12` y aplicar `TRUNC()` permite obtener la antigüedad o duración exacta en **años completos**: `TRUNC(MONTHS_BETWEEN(SYSDATE, FECHA_INICIO) / 12)`.
* **Redondeo:** `ROUND(expresion, 0)` aproxima al entero más cercano. Debe envolver todo el cálculo matemático.

### 🎯 Ejemplo Guiado: Calificaciones de Capacitaciones
Se desea actualizar de forma masiva la columna `CALIFICACION` en la tabla `EMPLEADO_CAPACITACION` de acuerdo al número de días que el alumno tardó en aprobar el curso (diferencia entre `FECHA_INSCRIPCION` y `FECHA_APROBACION`):
* Menos de 15 días: **95**
* Entre 15 y 30 días: **80**
* Entre 31 y 60 días: **65**
* Más de 60 días: **50**
* *Condición:* Solo para inscripciones con estado `'APROBADO'` y que tengan `FECHA_APROBACION` registrada.

#### Paso 1: SELECT de verificación
```sql
SELECT CODIGO_EMPLEADO, CODIGO_CAPACITACION,
       (FECHA_APROBACION - FECHA_INSCRIPCION) AS DIAS_TARDADOS,
       CASE
         WHEN (FECHA_APROBACION - FECHA_INSCRIPCION) < 15 THEN 95
         WHEN (FECHA_APROBACION - FECHA_INSCRIPCION) BETWEEN 15 AND 30 THEN 80
         WHEN (FECHA_APROBACION - FECHA_INSCRIPCION) BETWEEN 31 AND 60 THEN 65
         ELSE 50
       END AS CALIFICACION_PROPUESTA
FROM APRENDIENDO_SQL.EMPLEADO_CAPACITACION
WHERE ESTADO = 'APROBADO' AND FECHA_APROBACION IS NOT NULL;
```

#### Paso 2: Ejecución del UPDATE masivo
```sql
UPDATE APRENDIENDO_SQL.EMPLEADO_CAPACITACION
SET CALIFICACION = CASE
                     WHEN (FECHA_APROBACION - FECHA_INSCRIPCION) < 15 THEN 95
                     WHEN (FECHA_APROBACION - FECHA_INSCRIPCION) BETWEEN 15 AND 30 THEN 80
                     WHEN (FECHA_APROBACION - FECHA_INSCRIPCION) BETWEEN 31 AND 60 THEN 65
                     ELSE 50
                   END
WHERE ESTADO = 'APROBADO' AND FECHA_APROBACION IS NOT NULL;
COMMIT;
```

---

### 🟢 Ejercicio A.1 (Nivel Básico): Control de Estado de Proyectos
**Escenario:** El área de administración necesita mantener al día el campo `ESTADO` de la tabla `PROYECTO` en base a sus fechas registradas:
* Si el proyecto ya cuenta con una fecha de término real (`FECHA_FIN_REAL` no es nula), debe cambiar a `'FINALIZADO'`.
* Si el proyecto no tiene fecha de término real pero su fecha de término estimada (`FECHA_FIN_ESTIMADA`) ya pasó (es menor que la fecha actual `SYSDATE`), su estado debe ser `'ATRASADO'`.
* En cualquier otro caso, el proyecto debe mantenerse como `'ACTIVO'`.

<details>
<summary>💡 Pistas para Resolver</summary>

* Usa `IS NOT NULL` para evaluar la existencia de la fecha de término real.
* Recuerda usar `TRUNC(SYSDATE)` para comparar solo la fecha de hoy, ignorando la hora del sistema.
* Utiliza una sola sentencia `UPDATE` sin cláusula `WHERE` (ya que necesitas evaluar todos los proyectos).
</details>

<details>
<summary>🔑 Solución Paso a Paso</summary>

```sql
-- 1. Verificación previa con SELECT
SELECT CODIGO, NOMBRE, FECHA_FIN_REAL, FECHA_FIN_ESTIMADA, ESTADO AS ESTADO_ACTUAL,
       CASE
         WHEN FECHA_FIN_REAL IS NOT NULL THEN 'FINALIZADO'
         WHEN FECHA_FIN_ESTIMADA < TRUNC(SYSDATE) THEN 'ATRASADO'
         ELSE 'ACTIVO'
       END AS ESTADO_NUEVO
FROM APRENDIENDO_SQL.PROYECTO;

-- 2. Ejecución del UPDATE condicional
UPDATE APRENDIENDO_SQL.PROYECTO
SET ESTADO = CASE
               WHEN FECHA_FIN_REAL IS NOT NULL THEN 'FINALIZADO'
               WHEN FECHA_FIN_ESTIMADA < TRUNC(SYSDATE) THEN 'ATRASADO'
               ELSE 'ACTIVO'
             END;

-- Confirmar transacción
COMMIT;
```
</details>

---

### 🟡 Ejercicio A.2 (Nivel Intermedio): Asignación de Horas por Rol
**Escenario:** La gerencia de operaciones definió una política estándar de asignación de horas semanales para evitar sobrecargas de trabajo. Debes actualizar la columna `HORAS_SEMANALES` de la tabla `EMPLEADO_PROYECTO` aplicando las siguientes reglas según el texto registrado en la columna `ROL_PROYECTO`:
* Si el rol contiene la palabra `'Líder'`, asignar **40** horas.
* Si el rol contiene la palabra `'Analista'`, asignar **35** horas.
* Si el rol contiene la palabra `'Programador'`, asignar **30** horas.
* Para cualquier otro rol de proyecto, asignar **20** horas.
* *Condición:* Solo debes actualizar las asignaciones que se encuentren vigentes en la actualidad (es decir, donde `FECHA_TERMINO` sea nula).

<details>
<summary>💡 Pistas para Resolver</summary>

* Para buscar palabras parciales dentro de un campo de texto en un `CASE`, utiliza el operador `LIKE` con comodines `%` (ej. `ROL_PROYECTO LIKE '%Líder%'`).
* **⚠️ Importante:** Oracle es **case-sensitive** con `LIKE`. Si los datos están en mayúsculas (`'LÍDER'`), usa `UPPER(ROL_PROYECTO) LIKE '%LÍDER%'` para asegurarte de encontrar coincidencias.
* Asegúrate de agregar el filtro `WHERE FECHA_TERMINO IS NULL` al final del `UPDATE` para no afectar asignaciones históricas ya terminadas.
</details>

<details>
<summary>🔑 Solución Paso a Paso</summary>

```sql
-- 1. Consultar cambios que se realizarán
SELECT CODIGO_EMPLEADO, CODIGO_PROYECTO, ROL_PROYECTO, HORAS_SEMANALES AS HORAS_ACTUALES,
       CASE
         WHEN ROL_PROYECTO LIKE '%Líder%' THEN 40
         WHEN ROL_PROYECTO LIKE '%Analista%' THEN 35
         WHEN ROL_PROYECTO LIKE '%Programador%' THEN 30
         ELSE 20
       END AS HORAS_NUEVAS
FROM APRENDIENDO_SQL.EMPLEADO_PROYECTO
WHERE FECHA_TERMINO IS NULL;

-- 2. Aplicar el UPDATE en la tabla
UPDATE APRENDIENDO_SQL.EMPLEADO_PROYECTO
SET HORAS_SEMANALES = CASE
                        WHEN ROL_PROYECTO LIKE '%Líder%' THEN 40
                        WHEN ROL_PROYECTO LIKE '%Analista%' THEN 35
                        WHEN ROL_PROYECTO LIKE '%Programador%' THEN 30
                        ELSE 20
                      END
WHERE FECHA_TERMINO IS NULL;

-- Confirmar cambios
COMMIT;
```
</details>

---

### 🔴 Ejercicio A.3 (Nivel Avanzado - Examen): Reajuste de Presupuesto de Proyectos por Duración
**Escenario:** El departamento de Finanzas requiere reajustar de forma masiva los presupuestos de la tabla `PROYECTO` basándose en la duración estimada de cada proyecto en meses completos (calculada como la diferencia de meses entre la fecha de inicio `FECHA_INICIO` y la fecha de término estimada `FECHA_FIN_ESTIMADA`). Los incrementos presupuestarios son los siguientes:
* Proyectos con una duración estimada de **24 meses o más**: **+15%** en su presupuesto.
* Proyectos con una duración de **entre 12 y 23 meses** completos: **+10%**.
* Proyectos con una duración de **entre 6 y 11 meses** completos: **+5%**.
* Proyectos con una duración **menor a 6 meses**: **+2%**.
* *Requisito:* La actualización debe realizarse en una única sentencia, redondeando el nuevo presupuesto calculado al entero más cercano. El ajuste se debe aplicar a todos los proyectos registrados.

<details>
<summary>💡 Pistas para Resolver</summary>

* Calcula los meses estimados de duración del proyecto utilizando `TRUNC(MONTHS_BETWEEN(FECHA_FIN_ESTIMADA, FECHA_INICIO))`.
* Para incrementar un valor en $15\%$, multiplícalo por `1.15` (o `1 + 0.15`).
* Envuelve toda la operación matemática en la función `ROUND(..., 0)` para cumplir con la regla del redondeo al entero más cercano.
</details>

<details>
<summary>🔑 Solución Paso a Paso</summary>

```sql
-- 1. Verificación previa por proyecto
SELECT CODIGO, NOMBRE, FECHA_INICIO, FECHA_FIN_ESTIMADA,
       TRUNC(MONTHS_BETWEEN(FECHA_FIN_ESTIMADA, FECHA_INICIO)) AS MESES_DURACION,
       PRESUPUESTO AS PRESUPUESTO_ACTUAL,
       ROUND(
         PRESUPUESTO * (
           1 + CASE
             WHEN TRUNC(MONTHS_BETWEEN(FECHA_FIN_ESTIMADA, FECHA_INICIO)) >= 24 THEN 0.15
             WHEN TRUNC(MONTHS_BETWEEN(FECHA_FIN_ESTIMADA, FECHA_INICIO)) BETWEEN 12 AND 23 THEN 0.10
             WHEN TRUNC(MONTHS_BETWEEN(FECHA_FIN_ESTIMADA, FECHA_INICIO)) BETWEEN 6 AND 11 THEN 0.05
             ELSE 0.02
           END
         ), 0
       ) AS PRESUPUESTO_PROPUESTO
FROM APRENDIENDO_SQL.PROYECTO;

-- 2. Ejecutar la actualización en una sola consulta
UPDATE APRENDIENDO_SQL.PROYECTO
SET PRESUPUESTO = ROUND(
  PRESUPUESTO * (
    1 + CASE
      WHEN TRUNC(MONTHS_BETWEEN(FECHA_FIN_ESTIMADA, FECHA_INICIO)) >= 24 THEN 0.15
      WHEN TRUNC(MONTHS_BETWEEN(FECHA_FIN_ESTIMADA, FECHA_INICIO)) BETWEEN 12 AND 23 THEN 0.10
      WHEN TRUNC(MONTHS_BETWEEN(FECHA_FIN_ESTIMADA, FECHA_INICIO)) BETWEEN 6 AND 11 THEN 0.05
      ELSE 0.02
    END
  ), 0
);

-- Guardar cambios
COMMIT;
```
</details>

---

## 👁️ BLOQUE B: Vistas y Funciones de Ventana

### 📘 Conceptos Clave
* **`LEFT JOIN` vs `INNER JOIN`:**
  * `INNER JOIN` exige coincidencia en ambas tablas. Si un empleado no tiene vacaciones registradas, desaparece del resultado.
  * `LEFT JOIN` preserva todos los registros de la tabla izquierda (ej. todos los empleados) y completa con `NULL` las columnas de la tabla derecha cuando no hay coincidencias.
* **Funciones analíticas / de ventana (`OVER`):**
  * Permiten realizar agregaciones (como `SUM` o `COUNT`) sin agrupar (`GROUP BY`) ni colapsar las filas individuales del SELECT.
  * Sintaxis: `COUNT(columna) OVER (PARTITION BY columna_grupo)`.
* **Seguridad y buenas prácticas en Vistas:**
  * Para crear una vista en otro esquema: `CREATE OR REPLACE VIEW esquema_destino.nombre_vista AS ...`.
  * `WITH READ ONLY` añade una restricción de seguridad que impide actualizar datos a través de la vista (lanza error ORA-42399).

### 🎯 Ejemplo Guiado: Historial de Vacaciones por Empleado
Se requiere una vista de solo lectura que muestre el historial detallado de vacaciones solicitadas por cada empleado y la sumatoria acumulada de días solicitados por cada uno.

```sql
-- Ejecutado con privilegios CREATE ANY VIEW (por ejemplo, SYSTEM o APRENDIENDO_SQL)
CREATE OR REPLACE VIEW REPORTE_SQL.VIEW_VACACIONES_EMPLEADOS AS
SELECT
    PE.APELLIDO_PAT || ' ' || PE.NOMBRES AS EMPLEADO,
    V.FECHA_INICIO,
    V.FECHA_FIN,
    V.DIAS_SOLICITADOS,
    V.ESTADO,
    SUM(V.DIAS_SOLICITADOS) OVER (PARTITION BY V.CODIGO_EMPLEADO) AS TOTAL_DIAS_EMPLEADO
FROM
    APRENDIENDO_SQL.VACACIONES V
    JOIN APRENDIENDO_SQL.EMPLEADO E ON V.CODIGO_EMPLEADO = E.CODIGO
    JOIN APRENDIENDO_SQL.PERSONA PE ON E.RUT_PERSONA = PE.RUT
ORDER BY PE.APELLIDO_PAT, V.FECHA_INICIO
WITH READ ONLY;
```

---

### 🟢 Ejercicio B.1 (Nivel Básico): Vista de Contactos de Emergencia
**Escenario:** El equipo de soporte médico interno requiere acceder de forma rápida a los datos de contacto de emergencia de los colaboradores. Crea una vista simple llamada `REPORTE_SQL.VIEW_CONTACTOS_EMPLEADOS` que muestre:
* RUT y nombre completo del empleado (formato: `APELLIDO_PAT APELLIDO_MAT, NOMBRES`).
* Nombre del contacto de emergencia.
* Parentesco del contacto.
* Teléfono del contacto.

<details>
<summary>💡 Pistas para Resolver</summary>

* Deberás relacionar las tablas: `EMPLEADO` (que contiene el `RUT_PERSONA`), `PERSONA` (que contiene nombres/apellidos) y `CONTACTO_EMERGENCIA` (que se conecta con la persona a través de `RUT_PERSONA`).
* Usa el operador `||` para concatenar los textos de nombres y apellidos.
* Guarda la vista bajo el usuario `REPORTE_SQL` y no olvides incluir la cláusula de solo lectura.
</details>

<details>
<summary>🔑 Solución Paso a Paso</summary>

```sql
-- Ejecutar conectado como SYSTEM (o como un usuario con privilegios de creación de vistas en otros esquemas)
CREATE OR REPLACE VIEW REPORTE_SQL.VIEW_CONTACTOS_EMPLEADOS AS
SELECT
    E.CODIGO AS CODIGO_EMPLEADO,
    PE.RUT AS RUT_EMPLEADO,
    PE.APELLIDO_PAT || ' ' || PE.APELLIDO_MAT || ', ' || PE.NOMBRES AS NOMBRE_EMPLEADO,
    CE.NOMBRE_CONTACTO AS CONTACTO_EMERGENCIA,
    CE.PARENTESCO,
    CE.TELEFONO AS TELEFONO_EMERGENCIA
FROM
    APRENDIENDO_SQL.EMPLEADO E
    JOIN APRENDIENDO_SQL.PERSONA PE ON E.RUT_PERSONA = PE.RUT
    JOIN APRENDIENDO_SQL.CONTACTO_EMERGENCIA CE ON PE.RUT = CE.RUT_PERSONA
WITH READ ONLY;

-- Prueba de consulta a la vista
SELECT * FROM REPORTE_SQL.VIEW_CONTACTOS_EMPLEADOS;
```
</details>

---

### 🟡 Ejercicio B.2 (Nivel Intermedio): Vista de Estado de Capacitaciones
**Escenario:** El departamento de desarrollo organizacional necesita supervisar las capacitaciones que están activas o planificadas a futuro. Crea una vista llamada `REPORTE_SQL.VIEW_CAPACITACIONES_DETALLE` que cumpla con los siguientes requerimientos:
* Mostrar datos para **todas las capacitaciones cuya fecha de término sea mayor o igual al día de hoy** (es decir, vigentes o futuras).
* Columnas a incluir:
  1. Código y nombre de la capacitación.
  2. Modalidad de capacitación e Instructor.
  3. Nombre del departamento que la organiza (desde la tabla `DEPARTAMENTO`).
  4. Nombre completo del empleado inscrito (formato: `APELLIDO_PAT || ' ' || NOMBRES`).
  5. Calificación obtenida y estado de su inscripción.
  6. **Total de inscritos** en cada capacitación en particular (usando funciones analíticas).
* *Regla crítica:* Debes mostrar la capacitación incluso si todavía no tiene ningún empleado inscrito en ella.
* *Seguridad:* La vista debe pertenecer al esquema `REPORTE_SQL` y tener restricción de solo lectura. Ordena el resultado por el nombre de la capacitación y luego por el apellido paterno del empleado.

<details>
<summary>💡 Pistas para Resolver</summary>

* Filtra la fecha utilizando `WHERE C.FECHA_FIN >= TRUNC(SYSDATE)`.
* Para mantener capacitaciones sin alumnos inscritos en el reporte, aplica un `LEFT JOIN` desde `CAPACITACION` hacia `EMPLEADO_CAPACITACION`.
* Para contar los alumnos inscritos sin colapsar el resultado, emplea:
  `COUNT(EC.CODIGO_EMPLEADO) OVER (PARTITION BY C.CODIGO) AS TOTAL_INSCRITOS`.
</details>

<details>
<summary>🔑 Solución Paso a Paso</summary>

```sql
CREATE OR REPLACE VIEW REPORTE_SQL.VIEW_CAPACITACIONES_DETALLE AS
SELECT
    C.CODIGO AS CODIGO_CAPACITACION,
    C.NOMBRE AS NOMBRE_CAPACITACION,
    C.MODALIDAD,
    C.INSTRUCTOR,
    DEP.NOMBRE AS DEPARTAMENTO_ORGANIZADOR,
    PE.APELLIDO_PAT || ' ' || PE.NOMBRES AS EMPLEADO_INSCRITO,
    EC.ESTADO AS ESTADO_INSCRIPCION,
    EC.CALIFICACION,
    COUNT(EC.CODIGO_EMPLEADO) OVER (PARTITION BY C.CODIGO) AS TOTAL_INSCRITOS
FROM
    APRENDIENDO_SQL.CAPACITACION C
    JOIN APRENDIENDO_SQL.DEPARTAMENTO DEP ON C.CODIGO_DEPARTAMENTO = DEP.CODIGO
    LEFT JOIN APRENDIENDO_SQL.EMPLEADO_CAPACITACION EC ON C.CODIGO = EC.CODIGO_CAPACITACION
    LEFT JOIN APRENDIENDO_SQL.EMPLEADO E ON EC.CODIGO_EMPLEADO = E.CODIGO
    LEFT JOIN APRENDIENDO_SQL.PERSONA PE ON E.RUT_PERSONA = PE.RUT
WHERE
    C.FECHA_FIN >= TRUNC(SYSDATE)
ORDER BY
    C.NOMBRE,
    PE.APELLIDO_PAT
WITH READ ONLY;
```
</details>

---

### 🔴 Ejercicio B.3 (Nivel Avanzado - Examen): Reporte Anual de Vacaciones Aprobadas por Departamento
**Escenario:** El área de Control de Gestión requiere auditar los días de vacaciones tomados por cada empleado durante el año en curso. Crea una vista llamada `REPORTE_SQL.VIEW_RESUMEN_VACACIONES_APROBADAS` de solo lectura. Debe extraer información de **todas las vacaciones aprobadas cuyo inicio (`FECHA_INICIO`) sea dentro de este año**.
* Columnas del reporte:
  1. RUT del empleado.
  2. Nombre completo del empleado (formato: `APELLIDO_PAT APELLIDO_MAT, NOMBRES`).
  3. Nombre del departamento donde trabaja el empleado (relación `EMPLEADO` -> `TIPO_EMPLEADO` -> `DEPARTAMENTO`).
  4. Nombre completo del Jefe que aprobó la solicitud (columna `CODIGO_EMPLEADO_APRUEBA` en la tabla `VACACIONES` vinculada a su respectivo empleado y persona).
  5. Días solicitados en esa solicitud de vacaciones en particular.
  6. **Total acumulado de días de vacaciones aprobados en el departamento** del empleado para este año (usando una función de ventana).
  7. **Cantidad total de solicitudes de vacaciones aprobadas** que tiene este empleado en particular en lo que va del año (usando una función de ventana).
* *Reglas críticas:*
  * Considerar únicamente solicitudes con estado `'APROBADA'` y cuya `FECHA_INICIO` comience a partir del 1 de enero del año actual.
  * Debes incluir en el informe a **todos los empleados** registrados en la empresa, incluso si no han solicitado o no se les han aprobado vacaciones en lo que va del año (en tal caso, los campos de vacaciones y del aprobador figurarán nulos).
  * El listado debe ordenarse ascendentemente por el nombre del departamento del empleado y por su apellido paterno.

<details>
<summary>💡 Pistas para Resolver</summary>

* Para filtrar por el año actual de forma dinámica, puedes evaluar: `V.FECHA_INICIO >= TRUNC(SYSDATE, 'YYYY')`.
* Tienes dos relaciones distintas con `EMPLEADO` y `PERSONA`: una para los datos del empleado que se toma las vacaciones y otra para los datos del jefe que aprueba la solicitud (`CODIGO_EMPLEADO_APRUEBA`). Utiliza alias claros como `EE`/`PE` (empleado/persona) y `EA`/`PA` (aprobador/persona aprobador) para evitar colisiones.
* Usa `LEFT JOIN` desde la tabla principal de empleados hacia la tabla `VACACIONES` filtrada por año/estado, para no perder a los empleados que no tienen registros de vacaciones este año.
</details>

<details>
<summary>🔑 Solución Paso a Paso</summary>

```sql
CREATE OR REPLACE VIEW REPORTE_SQL.VIEW_RESUMEN_VACACIONES_APROBADAS AS
SELECT
    PE.RUT AS RUT_EMPLEADO,
    PE.APELLIDO_PAT || ' ' || PE.APELLIDO_MAT || ', ' || PE.NOMBRES AS NOMBRE_EMPLEADO,
    DEP.NOMBRE AS DEPARTAMENTO,
    PAP.APELLIDO_PAT || ' ' || PAP.APELLIDO_MAT || ', ' || PAP.NOMBRES AS JEFE_APROBADOR,
    V.DIAS_SOLICITADOS,
    SUM(V.DIAS_SOLICITADOS) OVER (PARTITION BY DEP.CODIGO) AS TOTAL_DIAS_DEP_ANIO,
    COUNT(V.CODIGO) OVER (PARTITION BY E.CODIGO) AS CANTIDAD_SOLICITUDES_ANIO
FROM
    APRENDIENDO_SQL.EMPLEADO E
    JOIN APRENDIENDO_SQL.PERSONA PE ON E.RUT_PERSONA = PE.RUT
    JOIN APRENDIENDO_SQL.TIPO_EMPLEADO TE ON E.CODIGO_TIPO_EMPLEADO = TE.CODIGO
    JOIN APRENDIENDO_SQL.DEPARTAMENTO DEP ON TE.CODIGO_DEPARTAMENTO = DEP.CODIGO
    -- LEFT JOIN para incluir empleados sin vacaciones en el año actual
    LEFT JOIN APRENDIENDO_SQL.VACACIONES V 
        ON E.CODIGO = V.CODIGO_EMPLEADO 
        AND V.ESTADO = 'APROBADA'
        AND V.FECHA_INICIO >= TRUNC(SYSDATE, 'YYYY')
    -- Obtener datos de la jefatura que aprueba la vacación
    LEFT JOIN APRENDIENDO_SQL.EMPLEADO EAP ON V.CODIGO_EMPLEADO_APRUEBA = EAP.CODIGO
    LEFT JOIN APRENDIENDO_SQL.PERSONA PAP ON EAP.RUT_PERSONA = PAP.RUT
ORDER BY
    DEP.NOMBRE,
    PE.APELLIDO_PAT
WITH READ ONLY;
```
</details>

---

## ⚡ BLOQUE C: Optimización e Índices (Planes de Ejecución)

### 📘 Conceptos Clave
* **¿Cómo interpretar un plan de ejecución?**
  * `TABLE ACCESS FULL`: Operación ineficiente en tablas medianas/grandes. Lee cada registro del disco.
  * `INDEX RANGE SCAN`: Búsqueda eficiente. Recorre un segmento del índice según un filtro de rango (`>`, `<`, `BETWEEN`, `LIKE`).
  * `INDEX UNIQUE SCAN`: Acceso instantáneo. Ocurre cuando el filtro busca directamente por la clave primaria o columna con restricción `UNIQUE`.
* **Estrategias para crear Índices:**
  * **Índice Simple:** Se crea sobre una columna que suele filtrarse de manera individual en el `WHERE`.
  * **Índice Compuesto:** Se diseña cuando el `WHERE` asocia dos o más columnas simultáneamente mediante el operador lógico `AND`. La columna de comparación exacta (`=`) debe colocarse en primer lugar dentro de la definición del índice.
  * **El efecto limitador del operador `OR`:** Si tu filtro utiliza `WHERE columna1 = X OR columna2 = Y`, un índice compuesto no ayudará. Se requieren **índices simples independientes** en cada una de las columnas involucradas para que el optimizador pueda combinarlos (*Bitmap Index Merge*).
  * **Uso de Funciones en columnas:** Si buscas usando `WHERE TO_CHAR(fecha, 'YYYY') = '2026'`, invalidarás cualquier índice estándar sobre `fecha`. Es preferible reescribir la query usando rangos: `WHERE fecha BETWEEN ... AND ...`.

### 🎯 Ejemplo Guiado: Diagnóstico de una consulta lenta
Analicemos la siguiente consulta que lista empleados de tipo específico con más de 5 años de antigüedad:

```sql
SELECT P.NOMBRES, P.APELLIDO_PAT, TE.NOMBRE AS TIPO, E.FECHA_CONTRATO
FROM APRENDIENDO_SQL.EMPLEADO E
JOIN APRENDIENDO_SQL.PERSONA P ON E.RUT_PERSONA = P.RUT
JOIN APRENDIENDO_SQL.TIPO_EMPLEADO TE ON E.CODIGO_TIPO_EMPLEADO = TE.CODIGO
WHERE E.FECHA_CONTRATO < ADD_MONTHS(SYSDATE, -60)
ORDER BY E.FECHA_CONTRATO;
```

#### Paso 1: Generar el Plan de Ejecución original
```sql
EXPLAIN PLAN FOR
SELECT P.NOMBRES, P.APELLIDO_PAT, TE.NOMBRE, E.FECHA_CONTRATO
FROM APRENDIENDO_SQL.EMPLEADO E
JOIN APRENDIENDO_SQL.PERSONA P ON E.RUT_PERSONA = P.RUT
JOIN APRENDIENDO_SQL.TIPO_EMPLEADO TE ON E.CODIGO_TIPO_EMPLEADO = TE.CODIGO
WHERE E.FECHA_CONTRATO < ADD_MONTHS(SYSDATE, -60);

-- Mostrar el plan
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY());
```
*Diagnóstico:* En la salida, se observa una operación `TABLE ACCESS FULL` para la tabla `EMPLEADO` debido al filtro `E.FECHA_CONTRATO`.

#### Paso 2: Crear el índice optimizado
```sql
CREATE INDEX IDX_EMPLEADO_FCONTRATO 
  ON APRENDIENDO_SQL.EMPLEADO(FECHA_CONTRATO);
```

#### Paso 3: Verificar la mejora
Al ejecutar nuevamente el `EXPLAIN PLAN`, verás que el optimizador de Oracle ahora realiza un `INDEX RANGE SCAN` en `IDX_EMPLEADO_FCONTRATO`, reduciendo drásticamente el costo de I/O de la consulta.

---

### 🟢 Ejercicio C.1 (Nivel Básico): Búsqueda por RUT de Persona
**Escenario:** El departamento de atención al cliente ejecuta de manera constante consultas para validar las direcciones registradas por RUT de persona:

```sql
SELECT PE.RUT, PE.NOMBRES, PE.APELLIDO_PAT, DIR.CALLE, DIR.NUMERO
FROM APRENDIENDO_SQL.PERSONA PE
INNER JOIN APRENDIENDO_SQL.DIRECCION DIR ON PE.RUT = DIR.RUT_PERSONA
WHERE PE.RUT = '17283940-5';
```

Analiza el plan de ejecución y responde: ¿Qué índice se está utilizando y qué operación ejecuta Oracle en las tablas `PERSONA` y `DIRECCION`? ¿Es óptimo el rendimiento?

<details>
<summary>💡 Pistas para Resolver</summary>

* Observa las claves primarias (PK) de ambas tablas en el Anexo A:
  * `PERSONA` tiene `PERSONA_PK` sobre `RUT`.
  * `DIRECCION` tiene `DIRECCION_PK` sobre `(RUT_PERSONA, CODIGO_COMUNA)`.
* Oracle crea automáticamente índices únicos para dar soporte a las PKs.
</details>

<details>
<summary>🔑 Solución Paso a Paso</summary>

```sql
-- 1. Analizar plan actual
EXPLAIN PLAN FOR
SELECT PE.RUT, PE.NOMBRES, PE.APELLIDO_PAT, DIR.CALLE, DIR.NUMERO
FROM APRENDIENDO_SQL.PERSONA PE
INNER JOIN APRENDIENDO_SQL.DIRECCION DIR ON PE.RUT = DIR.RUT_PERSONA
WHERE PE.RUT = '17283940-5';

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY());
```

**Análisis de Resultados:**
1. Para la tabla `PERSONA`, se realiza un `INDEX UNIQUE SCAN` sobre el índice `PERSONA_PK`, lo cual es óptimo (Costo = 0).
2. Para la tabla `DIRECCION`, dado que la clave primaria de la tabla es compuesta (`RUT_PERSONA, CODIGO_COMUNA`), y el RUT es la primera columna del índice de la clave primaria, Oracle puede utilizar directamente el índice de la PK (`DIRECCION_PK`) realizando un `INDEX RANGE SCAN` o similar.
3. **Conclusión:** Dado que las columnas de filtro y de relación ya están completamente cubiertas por los índices automáticos creados por las claves primarias (PK), **no se requiere crear ningún índice adicional**. La consulta ya se ejecuta a la máxima velocidad teórica.
</details>

---

### 🟡 Ejercicio C.2 (Nivel Intermedio): Optimización con Filtro Compuesto (AND)
**Escenario:** El departamento de Recursos Humanos emite constantemente un reporte detallado con las solicitudes de vacaciones que se encuentran en estado pendiente de aprobación y que fueron ingresadas en el último mes (30 días). La consulta utilizada es la siguiente:

```sql
SELECT E.RUT_PERSONA, V.FECHA_INICIO, V.DIAS_SOLICITADOS, V.ESTADO
FROM APRENDIENDO_SQL.VACACIONES V
INNER JOIN APRENDIENDO_SQL.EMPLEADO E ON V.CODIGO_EMPLEADO = E.CODIGO
WHERE V.ESTADO = 'SOLICITADA' 
  AND V.FECHA_SOLICITUD >= TRUNC(SYSDATE) - 30
ORDER BY V.FECHA_SOLICITUD;
```

Genera el plan de ejecución, detecta los cuellos de botella y crea el índice compuesto óptimo considerando el orden correcto de las columnas.

<details>
<summary>💡 Pistas para Resolver</summary>

* Una consulta con un filtro por igualdad (`ESTADO = 'SOLICITADA'`) y un filtro por rango (`FECHA_SOLICITUD >= ...`) conectados por un `AND` se beneficia de un **índice compuesto** en la tabla de origen de los filtros.
* Regla de selectividad para índices compuestos: Coloca siempre primero la columna que evalúe una igualdad exacta y en segundo lugar la columna que realice la evaluación por rangos o la ordenación.
</details>

<details>
<summary>🔑 Solución Paso a Paso</summary>

```sql
-- 1. Generar plan original (Mostrará TABLE ACCESS FULL en VACACIONES)
EXPLAIN PLAN FOR
SELECT E.RUT_PERSONA, V.FECHA_INICIO, V.DIAS_SOLICITADOS, V.ESTADO
FROM APRENDIENDO_SQL.VACACIONES V
INNER JOIN APRENDIENDO_SQL.EMPLEADO E ON V.CODIGO_EMPLEADO = E.CODIGO
WHERE V.ESTADO = 'SOLICITADA' 
  AND V.FECHA_SOLICITUD >= TRUNC(SYSDATE) - 30;

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY());

-- 2. Crear índice compuesto optimizado
-- La igualdad (ESTADO) va primero, luego el rango (FECHA_SOLICITUD)
CREATE INDEX IDX_VACACIONES_EST_SOLICITUD
  ON APRENDIENDO_SQL.VACACIONES(ESTADO, FECHA_SOLICITUD);

-- 3. Volver a verificar el plan de ejecución
EXPLAIN PLAN FOR
SELECT E.RUT_PERSONA, V.FECHA_INICIO, V.DIAS_SOLICITADOS, V.ESTADO
FROM APRENDIENDO_SQL.VACACIONES V
INNER JOIN APRENDIENDO_SQL.EMPLEADO E ON V.CODIGO_EMPLEADO = E.CODIGO
WHERE V.ESTADO = 'SOLICITADA' 
  AND V.FECHA_SOLICITUD >= TRUNC(SYSDATE) - 30;

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY());
```

**Resultado:** Tras añadir el índice, el plan de la tabla `VACACIONES` cambiará de un costoso `TABLE ACCESS FULL` a un eficiente `INDEX RANGE SCAN` utilizando `IDX_VACACIONES_EST_SOLICITUD`.
</details>

---

### 🔴 Ejercicio C.3 (Nivel Avanzado - Examen): Optimización con Filtro OR
**Escenario:** El departamento de Asistencia necesita monitorear las anomalías en los registros diarios. Ejecutan una consulta para listar los días donde el empleado registró un atraso (`TIPO_MARCACION = 'ATRASO'`) **O** donde el registro posee una observación especial marcada como `'SIN_JUSTIFICAR'`:

```sql
SELECT E.RUT_PERSONA, A.FECHA, A.HORA_ENTRADA, A.TIPO_MARCACION, A.OBSERVACION
FROM APRENDIENDO_SQL.ASISTENCIA A
INNER JOIN APRENDIENDO_SQL.EMPLEADO E ON A.CODIGO_EMPLEADO = E.CODIGO
WHERE A.TIPO_MARCACION = 'ATRASO' 
   OR A.OBSERVACION = 'SIN_JUSTIFICAR'
ORDER BY A.FECHA;
```

Genera el plan de ejecución, analiza por qué un índice compuesto no resolvería este problema y diseña la solución de indexación óptima.

<details>
<summary>💡 Pistas para Resolver</summary>

* El operador `OR` en el `WHERE` obliga a que el motor de base de datos deba ser capaz de buscar eficientemente tanto por la primera condición como por la segunda de manera independiente.
* Un índice compuesto no puede ser utilizado si la primera columna del índice no viene en la condición de forma restrictiva en uno de los lados de la disyunción.
* Para solucionarlo, debes crear **dos índices simples separados**: uno sobre la columna `TIPO_MARCACION` y otro sobre `OBSERVACION`. Oracle realizará un acceso por rangos a ambos índices y fusionará las filas resultantes mediante una operación de unión (`Bitmap OR` / `CONCATENATION`).
</details>

<details>
<summary>🔑 Solución Paso a Paso</summary>

```sql
-- 1. Generar plan original (Mostrará TABLE ACCESS FULL en ASISTENCIA)
EXPLAIN PLAN FOR
SELECT E.RUT_PERSONA, A.FECHA, A.HORA_ENTRADA, A.TIPO_MARCACION, A.OBSERVACION
FROM APRENDIENDO_SQL.ASISTENCIA A
INNER JOIN APRENDIENDO_SQL.EMPLEADO E ON A.CODIGO_EMPLEADO = E.CODIGO
WHERE A.TIPO_MARCACION = 'ATRASO' 
   OR A.OBSERVACION = 'SIN_JUSTIFICAR';

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY());

-- 2. Crear los dos índices simples separados
CREATE INDEX IDX_ASISTENCIA_TIPO_MARC 
  ON APRENDIENDO_SQL.ASISTENCIA(TIPO_MARCACION);

CREATE INDEX IDX_ASISTENCIA_OBSERV 
  ON APRENDIENDO_SQL.ASISTENCIA(OBSERVACION);

-- 3. Volver a evaluar el plan de ejecución
EXPLAIN PLAN FOR
SELECT E.RUT_PERSONA, A.FECHA, A.HORA_ENTRADA, A.TIPO_MARCACION, A.OBSERVACION
FROM APRENDIENDO_SQL.ASISTENCIA A
INNER JOIN APRENDIENDO_SQL.EMPLEADO E ON A.CODIGO_EMPLEADO = E.CODIGO
WHERE A.TIPO_MARCACION = 'ATRASO' 
   OR A.OBSERVACION = 'SIN_JUSTIFICAR';

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY());
```

**Explicación del Plan:**
Con estos dos índices independientes, el motor de Oracle realiza un barrido por rango (`INDEX RANGE SCAN`) para cada uno por separado y luego combina sus punteros de fila (RowIDs) mediante una operación de unión de bitmaps (`BITMAP OR`). Esto evita por completo el escaneo secuencial de toda la tabla `ASISTENCIA`, reduciendo el tiempo de respuesta.
</details>

---

### 🔴 Ejercicio C.4 (Nivel Avanzado - Examen): Optimización de Rangos de Fechas
**Escenario:** Se emite de forma diaria un listado con las licencias médicas vigentes iniciadas durante el año en curso para llevar un control de ausentismo laboral:

```sql
SELECT E.RUT_PERSONA, L.FECHA_INICIO, L.DIAS, L.ESTADO
FROM APRENDIENDO_SQL.LICENCIA_MEDICA L
INNER JOIN APRENDIENDO_SQL.EMPLEADO E ON L.CODIGO_EMPLEADO = E.CODIGO
WHERE L.FECHA_INICIO BETWEEN TRUNC(SYSDATE, 'YYYY') AND SYSDATE
ORDER BY L.FECHA_INICIO;
```

Genera el plan de ejecución y crea el índice óptimo para evitar un `TABLE ACCESS FULL` en la tabla `LICENCIA_MEDICA`.

<details>
<summary>💡 Pistas para Resolver</summary>

* Aunque se utiliza la función `TRUNC` en la condición, esta se aplica sobre la constante de sistema `SYSDATE`, no sobre la columna de la tabla `FECHA_INICIO`. Por lo tanto, un índice estándar en la columna `FECHA_INICIO` sí podrá ser utilizado.
* Crea un índice simple sobre la columna de fecha de inicio para que la base de datos pueda saltar directamente al rango buscado.
</details>

<details>
<summary>🔑 Solución Paso a Paso</summary>

```sql
-- 1. Generar plan original (TABLE ACCESS FULL en LICENCIA_MEDICA)
EXPLAIN PLAN FOR
SELECT E.RUT_PERSONA, L.FECHA_INICIO, L.DIAS, L.ESTADO
FROM APRENDIENDO_SQL.LICENCIA_MEDICA L
INNER JOIN APRENDIENDO_SQL.EMPLEADO E ON L.CODIGO_EMPLEADO = E.CODIGO
WHERE L.FECHA_INICIO BETWEEN TRUNC(SYSDATE, 'YYYY') AND SYSDATE;

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY());

-- 2. Crear índice simple sobre la columna de fecha de inicio
CREATE INDEX IDX_LICENCIA_MED_FECHA_INI
  ON APRENDIENDO_SQL.LICENCIA_MEDICA(FECHA_INICIO);

-- 3. Volver a evaluar el plan de ejecución
EXPLAIN PLAN FOR
SELECT E.RUT_PERSONA, L.FECHA_INICIO, L.DIAS, L.ESTADO
FROM APRENDIENDO_SQL.LICENCIA_MEDICA L
INNER JOIN APRENDIENDO_SQL.EMPLEADO E ON L.CODIGO_EMPLEADO = E.CODIGO
WHERE L.FECHA_INICIO BETWEEN TRUNC(SYSDATE, 'YYYY') AND SYSDATE;

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY());
```

**Resultado:** Tras añadir el índice, el optimizador de Oracle cambiará su estrategia a un `INDEX RANGE SCAN` utilizando `IDX_LICENCIA_MED_FECHA_INI`, reduciendo el costo de consulta y el número de lecturas en disco.
</details>

---

## 📋 Lista de Autoevaluación para el Alumno
Antes de rendir la evaluación, asegúrate de marcar como aprendidos los siguientes puntos:

### DCL y Seguridad
* [ ] Sé cómo configurar `TABLESPACE` de datos y temporales para nuevos esquemas.
* [ ] Sé cómo crear `ROLES` de sistema y asignarles privilegios globales en bloque.
* [ ] Entiendo cuándo otorgar privilegios individuales sobre tablas específicas (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) en lugar de usar roles del sistema.

### Lógica Condicional (UPDATE + CASE)
* [ ] Puedo anidar condiciones de múltiples columnas dentro de un bloque `CASE`.
* [ ] Domino el uso de `TRUNC(MONTHS_BETWEEN(FECHA_FIN, FECHA_INICIO))` para obtener la duración en meses completos entre dos columnas de tipo fecha.
* [ ] Entiendo la importancia de usar `ROUND(..., 0)` para redondear resultados matemáticos a valores enteros válidos.

### DDL y Vistas Analíticas
* [ ] Sé cómo escribir una vista que pertenezca a un esquema y consulte tablas de otro.
* [ ] Sé cuándo usar un `LEFT JOIN` para no perder registros de la tabla izquierda en la consulta de origen (por ejemplo, empleados sin vacaciones o sin proyectos).
* [ ] Puedo aplicar funciones analíticas `SUM() OVER(PARTITION BY ...)` u otras para calcular subtotales sin perder filas individuales.
* [ ] Entiendo la seguridad implícita al definir `WITH READ ONLY` al final de la vista.

### Rendimiento y Optimización
* [ ] Sé generar y leer el árbol jerárquico de un `EXPLAIN PLAN`.
* [ ] Puedo diferenciar un plan con `TABLE ACCESS FULL` de uno con `INDEX RANGE SCAN` o `INDEX UNIQUE SCAN`.
* [ ] Puedo decidir cuándo es preferible crear un índice compuesto (`col1, col2`) versus crear dos índices simples separados, dependiendo de los operadores `AND` y `OR` en el `WHERE`.
* [ ] Reconozco que las funciones aplicadas a las constantes del sistema (como `TRUNC(SYSDATE)`) no dañan el uso del índice, mientras que aplicarlas a las columnas de la tabla sí lo hace.
