# 🔥 Desafío 20 — PL/SQL: Bloques Anónimos, SELECT INTO, IF y Bucles
## Base de Datos Aplicada 2 · BDY1102 · DuocUC Puerto Montt

---

## 🗄️ Paso 0: Ejecuta este script COMPLETO antes de comenzar

Copia y pega este bloque **íntegro** en Oracle SQL Developer y ejecútalo. Esto creará las tablas y datos necesarios para todos los ejercicios.

```sql
-- =============================================
-- SCRIPT DE PREPARACIÓN: MERCADOSHOP
-- Desafío 20 · PL/SQL · BD Aplicada 2
-- Ejecutar COMPLETO antes de comenzar
-- =============================================

DROP TABLE detalles_pedidos CASCADE CONSTRAINTS PURGE;
DROP TABLE pedidos CASCADE CONSTRAINTS PURGE;
DROP TABLE productos CASCADE CONSTRAINTS PURGE;
DROP TABLE clientes CASCADE CONSTRAINTS PURGE;

CREATE TABLE clientes (
    id_cliente NUMBER PRIMARY KEY,
    nombre VARCHAR2(100) NOT NULL,
    correo VARCHAR2(100) UNIQUE,
    tipo_cliente VARCHAR2(20) DEFAULT 'REGULAR',
    CHECK (tipo_cliente IN ('REGULAR', 'VIP', 'EMPRESA'))
);

CREATE TABLE productos (
    id_producto NUMBER PRIMARY KEY,
    nombre VARCHAR2(100) NOT NULL,
    precio NUMBER(10,2) NOT NULL,
    stock NUMBER NOT NULL,
    CHECK (precio >= 0),
    CHECK (stock >= 0)
);

CREATE TABLE pedidos (
    id_pedido NUMBER PRIMARY KEY,
    id_cliente NUMBER NOT NULL,
    fecha DATE NOT NULL,
    total NUMBER(10,2) DEFAULT 0,
    estado VARCHAR2(20) DEFAULT 'PENDIENTE',
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    CHECK (estado IN ('PENDIENTE', 'PROCESANDO', 'ENVIADO', 'ENTREGADO', 'CANCELADO')),
    CHECK (total >= 0)
);

CREATE TABLE detalles_pedidos (
    id_detalle NUMBER PRIMARY KEY,
    id_pedido NUMBER NOT NULL,
    id_producto NUMBER NOT NULL,
    cantidad NUMBER NOT NULL,
    precio_unitario NUMBER(10,2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto),
    CHECK (cantidad > 0),
    CHECK (precio_unitario >= 0)
);

INSERT INTO clientes VALUES (1, 'Ana Torres', 'ana.torres@tienda.com', 'VIP');
INSERT INTO clientes VALUES (2, 'Luis Rojas', 'luis.rojas@tienda.com', 'REGULAR');
INSERT INTO clientes VALUES (3, 'Mika Tanaka', 'mika.tanaka@tienda.com', 'REGULAR');
INSERT INTO clientes VALUES (4, 'Kevin Diaz', 'kevin.diaz@tienda.com', 'EMPRESA');

INSERT INTO productos VALUES (10, 'Mouse Gamer', 25000.00, 15);
INSERT INTO productos VALUES (20, 'Teclado Mecánico', 45000.00, 3);
INSERT INTO productos VALUES (30, 'Monitor 24"', 120000.00, 8);
INSERT INTO productos VALUES (40, 'Audífonos Inalámbricos', 35000.00, 0);

INSERT INTO pedidos VALUES (100, 1, DATE '2026-05-10', 95000.00, 'ENTREGADO');
INSERT INTO pedidos VALUES (101, 2, DATE '2026-05-12', 25000.00, 'PROCESANDO');
INSERT INTO pedidos VALUES (102, 3, DATE '2026-06-01', 0.00, 'PENDIENTE');

INSERT INTO detalles_pedidos VALUES (1, 100, 10, 2, 25000.00);
INSERT INTO detalles_pedidos VALUES (2, 100, 20, 1, 45000.00);
INSERT INTO detalles_pedidos VALUES (3, 101, 10, 1, 25000.00);

COMMIT;
```

> ✅ **Verificación rápida:** Ejecuta `SELECT * FROM productos;` — deberías ver 4 filas.

---

## Contexto

Trabajas como desarrollador junior en **MercadoShop**, una tienda de tecnología online. Tu jefe te ha pedido que automatices ciertos procesos usando PL/SQL. Cada ejercicio representa un requerimiento real de la tienda.

> 💡 **Recuerda:** Para ver la salida de `DBMS_OUTPUT.PUT_LINE`, activa el panel de salida en SQL Developer: menú **Ver → Salida DBMS** y luego haz clic en el botón verde **+**.

---

## 🟢 Ejercicio 1: Mi primer bloque — Saludo personalizado
**Temas:** Declaración de variables, `:=`, `DBMS_OUTPUT.PUT_LINE`

Declara dos variables: `v_nombre` (con tu nombre) y `v_curso` (con el texto `'BD Aplicada 2'`). Imprime un mensaje que diga:

```
Hola, [tu nombre]! Bienvenido a BD Aplicada 2.
```

---

## 🟢 Ejercicio 2: Leer desde la BD — SELECT INTO
**Temas:** `SELECT INTO`, variables, tipos de dato

Usando `SELECT INTO`, lee el **nombre** y el **precio** del producto con `id_producto = 10` desde la tabla `productos`. Guárdalos en dos variables y luego imprime:

```
Producto: Mouse Gamer | Precio: $25000
```

---

## 🟢 Ejercicio 3: Precio con IVA
**Temas:** `SELECT INTO`, cálculos aritméticos

Lee el precio del producto con `id_producto = 30` desde la tabla `productos`. Calcula el precio con IVA (19%) y luego imprime ambos valores:

```
Precio neto: $120000
Precio con IVA: $142800
```

---

## 🟡 Ejercicio 4: Alerta de stock
**Temas:** `SELECT INTO`, `IF / ELSIF / ELSE`

Lee el `stock` y el `nombre` del producto con `id_producto = 20` desde la tabla `productos`. Según el stock, imprime un estado:

- Stock = 0 → `'❌ SIN STOCK'`
- Stock < 5 → `'⚠️ STOCK CRÍTICO'`
- Stock < 10 → `'🔶 STOCK BAJO'`
- Stock >= 10 → `'✅ STOCK OK'`

El mensaje final debe ser:
```
Teclado Mecánico — Stock: 3 — Estado: ⚠️ STOCK CRÍTICO
```

---

## 🟡 Ejercicio 5: Clasificar tipo de cliente
**Temas:** `SELECT INTO`, `IF / ELSIF / ELSE`

Lee el `nombre` y el `tipo_cliente` del cliente con `id_cliente = 1`. Según el tipo:

- `'VIP'` → descuento del 20%
- `'EMPRESA'` → descuento del 15%
- `'REGULAR'` → descuento del 5%

Imprime:
```
Cliente: Ana Torres | Tipo: VIP | Descuento: 20%
```

---

## 🟡 Ejercicio 6: Tabla de descuentos con FOR
**Temas:** Bucle `FOR`, `SELECT INTO`, cálculos

Usando un bucle `FOR` de 1 a 5, imprime una tabla que muestre el precio del producto `id_producto = 30` (Monitor 24") con descuentos escalonados del 10% al 50%:

```
Descuento 10%: $108000
Descuento 20%: $96000
Descuento 30%: $84000
Descuento 40%: $72000
Descuento 50%: $60000
```

---

## 🔴 Ejercicio 7: Contador con LOOP
**Temas:** Bucle `LOOP`, `EXIT WHEN`, acumulador

Sin usar `FOR`, crea un bloque que use `LOOP` para sumar los números del 1 al 10. Al final, imprime:

```
La suma de 1 a 10 es: 55
```

---

## 🔴 Ejercicio 8: Revisar todos los productos
**Temas:** Bucle `FOR`, `SELECT INTO` dentro de bucle, `IF`

Usando un bucle `FOR` que itere por los `id_producto` conocidos (10, 20, 30, 40), lee el nombre y stock de cada producto con `SELECT INTO` y clasifica su estado según las mismas reglas del ejercicio 4. Imprime una línea por producto:

```
Mouse Gamer — Stock: 15 — ✅ STOCK OK
Teclado Mecánico — Stock: 3 — ⚠️ STOCK CRÍTICO
Monitor 24" — Stock: 8 — 🔶 STOCK BAJO
Audífonos Inalámbricos — Stock: 0 — ❌ SIN STOCK
```

> **Pista:** Los IDs de producto son 10, 20, 30, 40. Puedes iterar `FOR i IN 1..4` y calcular el ID como `i * 10`.

---

## 🔴 Ejercicio 9: Bloques anidados — Validar pedido
**Temas:** Bloques anidados, ámbito de variables, `SELECT INTO`, `IF`

Crea un bloque padre que lea los datos del pedido con `id_pedido = 100` (su `total`, `estado` e `id_cliente`). Dentro, crea un bloque hijo que lea el nombre y tipo de cliente asociado a ese pedido usando el `id_cliente` que obtuviste en el padre. El bloque hijo debe imprimir si el cliente es VIP o no. El bloque padre imprime el resumen del pedido.

Salida esperada:
```
--- Detalle del pedido 100 ---
Cliente: Ana Torres (VIP: Sí)
Total: $95000
Estado: ENTREGADO
```

---

## 🔴🔴 Ejercicio 10: DESAFÍO INTEGRADOR — Resumen de inventario completo
**Temas:** `SELECT INTO`, `IF`, `FOR`, bloques anidados, acumuladores

Crea un bloque PL/SQL que haga lo siguiente:

1. **Bloque padre:** Declara un acumulador `v_valor_total` para el valor total del inventario.
2. **Bucle FOR** de 1 a 4 (para recorrer los productos con IDs 10, 20, 30, 40):
   - Dentro del bucle, usa `SELECT INTO` para leer el `nombre`, `precio` y `stock` de cada producto.
   - Calcula el **valor en bodega** de ese producto: `precio × stock`.
   - Acumula el valor en `v_valor_total`.
   - **Bloque hijo:** Clasifica el estado del stock (mismas reglas del ej. 4) e imprime la línea del producto.
3. **Después del bucle**, imprime el valor total del inventario.

Salida esperada:
```
=== RESUMEN DE INVENTARIO ===
Mouse Gamer — Stock: 15 — Valor: $375000 — ✅ STOCK OK
Teclado Mecánico — Stock: 3 — Valor: $135000 — ⚠️ STOCK CRÍTICO
Monitor 24" — Stock: 8 — Valor: $960000 — 🔶 STOCK BAJO
Audífonos Inalámbricos — Stock: 0 — Valor: $0 — ❌ SIN STOCK
=== VALOR TOTAL INVENTARIO: $1470000 ===
```

---

**¡Buena suerte, desarrollador! 🚀**
