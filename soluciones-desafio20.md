# 🔑 Soluciones — Desafío 20: PL/SQL MercadoShop
## SOLO PARA EL PROFESOR — No compartir con alumnos

---

## Ejercicio 1: Saludo personalizado

```sql
DECLARE
    v_nombre VARCHAR2(50) := 'Estudiante';
    v_curso  VARCHAR2(50) := 'BD Aplicada 2';
BEGIN
    DBMS_OUTPUT.PUT_LINE('Hola, ' || v_nombre || '! Bienvenido a ' || v_curso || '.');
END;
/
```

**Salida:** `Hola, Estudiante! Bienvenido a BD Aplicada 2.`

**Errores frecuentes del alumno:**
- Olvidar el `/` al final.
- Usar `=` en vez de `:=`.
- No activar DBMS_OUTPUT.

---

## Ejercicio 2: SELECT INTO

```sql
DECLARE
    v_nombre VARCHAR2(100);
    v_precio NUMBER(10,2);
BEGIN
    SELECT nombre, precio
    INTO v_nombre, v_precio
    FROM productos
    WHERE id_producto = 10;

    DBMS_OUTPUT.PUT_LINE('Producto: ' || v_nombre || ' | Precio: $' || v_precio);
END;
/
```

**Salida:** `Producto: Mouse Gamer | Precio: $25000`

**Errores frecuentes del alumno:**
- Poner el INTO después del FROM.
- No poner WHERE (→ TOO_MANY_ROWS).

---

## Ejercicio 3: Precio con IVA

```sql
DECLARE
    v_precio   NUMBER(10,2);
    v_con_iva  NUMBER(10,2);
BEGIN
    SELECT precio
    INTO v_precio
    FROM productos
    WHERE id_producto = 30;

    v_con_iva := v_precio * 1.19;

    DBMS_OUTPUT.PUT_LINE('Precio neto: $' || v_precio);
    DBMS_OUTPUT.PUT_LINE('Precio con IVA: $' || v_con_iva);
END;
/
```

**Salida:**
```
Precio neto: $120000
Precio con IVA: $142800
```

**Nota:** Algunos alumnos podrían calcular `v_precio + v_precio * 0.19` — es igualmente válido.

---

## Ejercicio 4: Alerta de stock

```sql
DECLARE
    v_nombre VARCHAR2(100);
    v_stock  NUMBER;
    v_estado VARCHAR2(30);
BEGIN
    SELECT nombre, stock
    INTO v_nombre, v_stock
    FROM productos
    WHERE id_producto = 20;

    IF v_stock = 0 THEN
        v_estado := 'SIN STOCK';
    ELSIF v_stock < 5 THEN
        v_estado := 'STOCK CRITICO';
    ELSIF v_stock < 10 THEN
        v_estado := 'STOCK BAJO';
    ELSE
        v_estado := 'STOCK OK';
    END IF;

    DBMS_OUTPUT.PUT_LINE(v_nombre || ' — Stock: ' || v_stock || ' — Estado: ' || v_estado);
END;
/
```

**Salida:** `Teclado Mecánico — Stock: 3 — Estado: STOCK CRITICO`

**Errores frecuentes del alumno:**
- Invertir el orden de los IF (poner `< 10` antes que `< 5` → nunca entra al crítico).
- Olvidar `END IF;`.

---

## Ejercicio 5: Clasificar tipo de cliente

```sql
DECLARE
    v_nombre    VARCHAR2(100);
    v_tipo      VARCHAR2(20);
    v_descuento NUMBER;
BEGIN
    SELECT nombre, tipo_cliente
    INTO v_nombre, v_tipo
    FROM clientes
    WHERE id_cliente = 1;

    IF v_tipo = 'VIP' THEN
        v_descuento := 20;
    ELSIF v_tipo = 'EMPRESA' THEN
        v_descuento := 15;
    ELSE
        v_descuento := 5;
    END IF;

    DBMS_OUTPUT.PUT_LINE('Cliente: ' || v_nombre || ' | Tipo: ' || v_tipo || ' | Descuento: ' || v_descuento || '%');
END;
/
```

**Salida:** `Cliente: Ana Torres | Tipo: VIP | Descuento: 20%`

---

## Ejercicio 6: Tabla de descuentos con FOR

```sql
DECLARE
    v_precio NUMBER(10,2);
    v_desc   NUMBER(10,2);
BEGIN
    SELECT precio
    INTO v_precio
    FROM productos
    WHERE id_producto = 30;

    FOR i IN 1..5 LOOP
        v_desc := v_precio * (1 - i * 10 / 100);
        DBMS_OUTPUT.PUT_LINE('Descuento ' || (i * 10) || '%: $' || v_desc);
    END LOOP;
END;
/
```

**Salida:**
```
Descuento 10%: $108000
Descuento 20%: $96000
Descuento 30%: $84000
Descuento 40%: $72000
Descuento 50%: $60000
```

**Errores frecuentes del alumno:**
- Poner el SELECT INTO dentro del FOR (funciona pero es ineficiente).
- Olvidar `END LOOP;`.

---

## Ejercicio 7: Contador con LOOP

```sql
DECLARE
    v_i    NUMBER := 1;
    v_suma NUMBER := 0;
BEGIN
    LOOP
        v_suma := v_suma + v_i;
        v_i := v_i + 1;
        EXIT WHEN v_i > 10;
    END LOOP;

    DBMS_OUTPUT.PUT_LINE('La suma de 1 a 10 es: ' || v_suma);
END;
/
```

**Salida:** `La suma de 1 a 10 es: 55`

**Nota:** También es válido poner el EXIT WHEN al inicio del loop (antes de sumar), pero el alumno debe ajustar la condición a `v_i > 10` igualmente. Lo importante es que la suma dé 55.

**Variante válida con EXIT al inicio:**
```sql
LOOP
    EXIT WHEN v_i > 10;
    v_suma := v_suma + v_i;
    v_i := v_i + 1;
END LOOP;
```

---

## Ejercicio 8: Revisar todos los productos

```sql
DECLARE
    v_nombre VARCHAR2(100);
    v_stock  NUMBER;
    v_estado VARCHAR2(30);
    v_id     NUMBER;
BEGIN
    FOR i IN 1..4 LOOP
        v_id := i * 10;

        SELECT nombre, stock
        INTO v_nombre, v_stock
        FROM productos
        WHERE id_producto = v_id;

        IF v_stock = 0 THEN
            v_estado := 'SIN STOCK';
        ELSIF v_stock < 5 THEN
            v_estado := 'STOCK CRITICO';
        ELSIF v_stock < 10 THEN
            v_estado := 'STOCK BAJO';
        ELSE
            v_estado := 'STOCK OK';
        END IF;

        DBMS_OUTPUT.PUT_LINE(v_nombre || ' — Stock: ' || v_stock || ' — ' || v_estado);
    END LOOP;
END;
/
```

**Salida:**
```
Mouse Gamer — Stock: 15 — STOCK OK
Teclado Mecánico — Stock: 3 — STOCK CRITICO
Monitor 24" — Stock: 8 — STOCK BAJO
Audífonos Inalámbricos — Stock: 0 — SIN STOCK
```

---

## Ejercicio 9: Bloques anidados — Validar pedido

```sql
DECLARE
    v_total      NUMBER(10,2);
    v_estado     VARCHAR2(20);
    v_id_cliente NUMBER;
BEGIN
    -- Bloque padre: lee el pedido
    SELECT total, estado, id_cliente
    INTO v_total, v_estado, v_id_cliente
    FROM pedidos
    WHERE id_pedido = 100;

    -- Bloque hijo: lee datos del cliente
    DECLARE
        v_nombre_cli VARCHAR2(100);
        v_tipo_cli   VARCHAR2(20);
        v_es_vip     VARCHAR2(5);
    BEGIN
        SELECT nombre, tipo_cliente
        INTO v_nombre_cli, v_tipo_cli
        FROM clientes
        WHERE id_cliente = v_id_cliente;

        IF v_tipo_cli = 'VIP' THEN
            v_es_vip := 'Sí';
        ELSE
            v_es_vip := 'No';
        END IF;

        DBMS_OUTPUT.PUT_LINE('--- Detalle del pedido 100 ---');
        DBMS_OUTPUT.PUT_LINE('Cliente: ' || v_nombre_cli || ' (VIP: ' || v_es_vip || ')');
    END;

    -- Vuelve al padre
    DBMS_OUTPUT.PUT_LINE('Total: $' || v_total);
    DBMS_OUTPUT.PUT_LINE('Estado: ' || v_estado);
END;
/
```

**Salida:**
```
--- Detalle del pedido 100 ---
Cliente: Ana Torres (VIP: Sí)
Total: $95000
Estado: ENTREGADO
```

**Puntos clave de evaluación:**
- El hijo usa `v_id_cliente` del padre (demuestra ámbito).
- Las variables del hijo (`v_nombre_cli`, etc.) NO son accesibles fuera de su bloque.

---

## Ejercicio 10: DESAFÍO INTEGRADOR — Resumen de inventario

```sql
DECLARE
    v_valor_total NUMBER := 0;
    v_nombre      VARCHAR2(100);
    v_precio      NUMBER(10,2);
    v_stock       NUMBER;
    v_valor_bod   NUMBER;
    v_id          NUMBER;
BEGIN
    DBMS_OUTPUT.PUT_LINE('=== RESUMEN DE INVENTARIO ===');

    FOR i IN 1..4 LOOP
        v_id := i * 10;

        SELECT nombre, precio, stock
        INTO v_nombre, v_precio, v_stock
        FROM productos
        WHERE id_producto = v_id;

        v_valor_bod := v_precio * v_stock;
        v_valor_total := v_valor_total + v_valor_bod;

        -- Bloque hijo: clasifica el stock
        DECLARE
            v_estado VARCHAR2(30);
        BEGIN
            IF v_stock = 0 THEN
                v_estado := 'SIN STOCK';
            ELSIF v_stock < 5 THEN
                v_estado := 'STOCK CRITICO';
            ELSIF v_stock < 10 THEN
                v_estado := 'STOCK BAJO';
            ELSE
                v_estado := 'STOCK OK';
            END IF;

            DBMS_OUTPUT.PUT_LINE(v_nombre || ' — Stock: ' || v_stock || ' — Valor: $' || v_valor_bod || ' — ' || v_estado);
        END;
    END LOOP;

    DBMS_OUTPUT.PUT_LINE('=== VALOR TOTAL INVENTARIO: $' || v_valor_total || ' ===');
END;
/
```

**Salida:**
```
=== RESUMEN DE INVENTARIO ===
Mouse Gamer — Stock: 15 — Valor: $375000 — STOCK OK
Teclado Mecánico — Stock: 3 — Valor: $135000 — STOCK CRITICO
Monitor 24" — Stock: 8 — Valor: $960000 — STOCK BAJO
Audífonos Inalámbricos — Stock: 0 — Valor: $0 — SIN STOCK
=== VALOR TOTAL INVENTARIO: $1470000 ===
```

**Verificación aritmética:**
| Producto | Precio | Stock | Valor Bodega |
|---|---|---|---|
| Mouse Gamer | 25.000 | 15 | 375.000 |
| Teclado Mecánico | 45.000 | 3 | 135.000 |
| Monitor 24" | 120.000 | 8 | 960.000 |
| Audífonos Inalámbricos | 35.000 | 0 | 0 |
| **TOTAL** | | | **1.470.000** |

**Criterios de evaluación sugeridos:**
- SELECT INTO correcto: 2 pts
- FOR loop con cálculo de ID: 2 pts
- Acumulador funcional: 2 pts
- Bloque anidado con IF: 2 pts
- Salida formateada correctamente: 2 pts

---

**Nota:** Es válido que un alumno NO use bloque anidado para el IF y lo ponga directamente en el FOR del padre. Lo importante es que la salida sea correcta. El bloque anidado demuestra dominio del concepto de ámbito, pero no debería ser penalizado si no lo usa en el ejercicio 10 (sí se exige en el 9).
