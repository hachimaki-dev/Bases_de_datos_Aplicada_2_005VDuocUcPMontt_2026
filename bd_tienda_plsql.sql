-- bd_tienda_plsql.sql
-- Base de datos pequeña para realizar pruebas y ejercicios en PL/SQL (Clase 3)
-- Compatible con Oracle SQL Developer

DROP TABLE detalles_pedidos CASCADE CONSTRAINTS PURGE;
DROP TABLE pedidos CASCADE CONSTRAINTS PURGE;
DROP TABLE productos CASCADE CONSTRAINTS PURGE;
DROP TABLE clientes CASCADE CONSTRAINTS PURGE;

-- 1. Tabla de Clientes
CREATE TABLE clientes (
    id_cliente NUMBER PRIMARY KEY,
    nombre VARCHAR2(100) NOT NULL,
    correo VARCHAR2(100) UNIQUE,
    tipo_cliente VARCHAR2(20) DEFAULT 'REGULAR',
    CHECK (tipo_cliente IN ('REGULAR', 'VIP', 'EMPRESA'))
);

-- 2. Tabla de Productos
CREATE TABLE productos (
    id_producto NUMBER PRIMARY KEY,
    nombre VARCHAR2(100) NOT NULL,
    precio NUMBER(10,2) NOT NULL,
    stock NUMBER NOT NULL,
    CHECK (precio >= 0),
    CHECK (stock >= 0)
);

-- 3. Tabla de Pedidos (Cabecera)
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

-- 4. Tabla de Detalles de Pedidos (Líneas de Pedido)
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

-- ==========================================
-- INSERCIÓN DE DATOS DE PRUEBA
-- ==========================================

-- Clientes
INSERT INTO clientes VALUES (1, 'Ana Torres', 'ana.torres@tienda.com', 'VIP');
INSERT INTO clientes VALUES (2, 'Luis Rojas', 'luis.rojas@tienda.com', 'REGULAR');
INSERT INTO clientes VALUES (3, 'Mika Tanaka', 'mika.tanaka@tienda.com', 'REGULAR');
INSERT INTO clientes VALUES (4, 'Kevin Diaz', 'kevin.diaz@tienda.com', 'EMPRESA');

-- Productos
INSERT INTO productos VALUES (10, 'Mouse Gamer', 25000.00, 15);
INSERT INTO productos VALUES (20, 'Teclado Mecánico', 45000.00, 3);   -- Stock crítico / bajo (< 5)
INSERT INTO productos VALUES (30, 'Monitor 24"', 120000.00, 8);    -- Stock regular (< 10)
INSERT INTO productos VALUES (40, 'Audífonos Inalámbricos', 35000.00, 0); -- Sin stock (0)

-- Pedidos
INSERT INTO pedidos VALUES (100, 1, DATE '2026-05-10', 95000.00, 'ENTREGADO');
INSERT INTO pedidos VALUES (101, 2, DATE '2026-05-12', 25000.00, 'PROCESANDO');
INSERT INTO pedidos VALUES (102, 3, DATE '2026-06-01', 0.00, 'PENDIENTE'); -- Pedido vacío para testear

-- Detalles de Pedidos
INSERT INTO detalles_pedidos VALUES (1, 100, 10, 2, 25000.00); -- 2 Mouse Gamer ($50000)
INSERT INTO detalles_pedidos VALUES (2, 100, 20, 1, 45000.00); -- 1 Teclado Mecánico ($45000)
INSERT INTO detalles_pedidos VALUES (3, 101, 10, 1, 25000.00); -- 1 Mouse Gamer ($25000)

COMMIT;
