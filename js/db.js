window.bdAmpliadaSQL = `DROP TABLE calificaciones CASCADE CONSTRAINTS PURGE;
DROP TABLE visualizaciones CASCADE CONSTRAINTS PURGE;
DROP TABLE suscripciones CASCADE CONSTRAINTS PURGE;
DROP TABLE contenido_categoria CASCADE CONSTRAINTS PURGE;
DROP TABLE contenidos CASCADE CONSTRAINTS PURGE;
DROP TABLE categorias CASCADE CONSTRAINTS PURGE;
DROP TABLE dispositivos CASCADE CONSTRAINTS PURGE;
DROP TABLE planes CASCADE CONSTRAINTS PURGE;
DROP TABLE plataformas CASCADE CONSTRAINTS PURGE;
DROP TABLE usuarios CASCADE CONSTRAINTS PURGE;
DROP TABLE paises CASCADE CONSTRAINTS PURGE;


CREATE TABLE paises (
    id_pais NUMBER PRIMARY KEY,
    nombre_pais VARCHAR2(50) UNIQUE NOT NULL
);

CREATE TABLE usuarios (
    id_usuario NUMBER PRIMARY KEY,
    nombre VARCHAR2(50) NOT NULL,
    id_pais NUMBER NOT NULL,
    fecha_registro DATE NOT NULL,
    FOREIGN KEY (id_pais) REFERENCES paises(id_pais)
);

CREATE TABLE categorias (
    id_categoria NUMBER PRIMARY KEY,
    nombre_categoria VARCHAR2(50) UNIQUE NOT NULL
);

CREATE TABLE contenidos (
    id_contenido NUMBER PRIMARY KEY,
    titulo VARCHAR2(100) NOT NULL,
    duracion_min NUMBER NOT NULL,
    rating NUMBER(3,1) NOT NULL,
    fecha_estreno DATE,
    CHECK (rating BETWEEN 0 AND 10),
    CHECK (duracion_min > 0)
);

CREATE TABLE contenido_categoria (
    id_contenido NUMBER NOT NULL,
    id_categoria NUMBER NOT NULL,
    PRIMARY KEY (id_contenido, id_categoria),
    FOREIGN KEY (id_contenido) REFERENCES contenidos(id_contenido),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

CREATE TABLE plataformas (
    id_plataforma NUMBER PRIMARY KEY,
    nombre_plataforma VARCHAR2(50) UNIQUE NOT NULL,
    id_pais NUMBER NOT NULL,
    FOREIGN KEY (id_pais) REFERENCES paises(id_pais)
);

CREATE TABLE planes (
    id_plan NUMBER PRIMARY KEY,
    nombre_plan VARCHAR2(30) UNIQUE NOT NULL,
    precio_mensual NUMBER(8,2) NOT NULL,
    CHECK (precio_mensual >= 0)
);

CREATE TABLE dispositivos (
    id_dispositivo NUMBER PRIMARY KEY,
    tipo_dispositivo VARCHAR2(30) UNIQUE NOT NULL
);

CREATE TABLE suscripciones (
    id_suscripcion NUMBER PRIMARY KEY,
    id_usuario NUMBER NOT NULL,
    id_plataforma NUMBER NOT NULL,
    id_plan NUMBER NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_plataforma) REFERENCES plataformas(id_plataforma),
    FOREIGN KEY (id_plan) REFERENCES planes(id_plan)
);

CREATE TABLE visualizaciones (
    id_visualizacion NUMBER PRIMARY KEY,
    id_suscripcion NUMBER NOT NULL,
    id_contenido NUMBER NOT NULL,
    id_dispositivo NUMBER NOT NULL,
    fecha DATE NOT NULL,
    progreso NUMBER NOT NULL,
    FOREIGN KEY (id_suscripcion) REFERENCES suscripciones(id_suscripcion),
    FOREIGN KEY (id_contenido) REFERENCES contenidos(id_contenido),
    FOREIGN KEY (id_dispositivo) REFERENCES dispositivos(id_dispositivo),
    CHECK (progreso BETWEEN 0 AND 100)
);

CREATE TABLE calificaciones (
    id_calificacion NUMBER PRIMARY KEY,
    id_usuario NUMBER NOT NULL,
    id_contenido NUMBER NOT NULL,
    fecha DATE NOT NULL,
    puntuacion NUMBER(3,1) NOT NULL,
    comentario VARCHAR2(200),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_contenido) REFERENCES contenidos(id_contenido),
    CHECK (puntuacion BETWEEN 0 AND 10)
);


INSERT INTO paises VALUES (1, 'Chile');
INSERT INTO paises VALUES (2, 'Japón');
INSERT INTO paises VALUES (3, 'USA');
INSERT INTO paises VALUES (4, 'Argentina');
INSERT INTO paises VALUES (5, 'China');
INSERT INTO paises VALUES (6, 'UK');
INSERT INTO paises VALUES (7, 'Corea del Sur');
INSERT INTO paises VALUES (8, 'México');

INSERT INTO usuarios VALUES (1, 'ana torres', 1, DATE '2023-01-10');
INSERT INTO usuarios VALUES (2, 'LUIS ROJAS', 1, DATE '2023-03-22');
INSERT INTO usuarios VALUES (3, 'mika tanaka', 2, DATE '2022-11-05');
INSERT INTO usuarios VALUES (4, 'john smith', 3, DATE '2023-06-30');
INSERT INTO usuarios VALUES (5, 'camila perez', 1, DATE '2023-07-15');
INSERT INTO usuarios VALUES (6, 'diego muñoz', 1, DATE '2023-08-10');
INSERT INTO usuarios VALUES (7, 'sofia garcia', 4, DATE '2023-02-18');
INSERT INTO usuarios VALUES (8, 'li wei', 5, DATE '2022-12-01');
INSERT INTO usuarios VALUES (9, 'emma brown', 6, DATE '2023-05-05');
INSERT INTO usuarios VALUES (10, 'hana kim', 7, DATE '2023-09-12');

INSERT INTO categorias VALUES (1, 'Anime');
INSERT INTO categorias VALUES (2, 'Drama');
INSERT INTO categorias VALUES (3, 'Sci-Fi');
INSERT INTO categorias VALUES (4, 'Comedy');
INSERT INTO categorias VALUES (5, 'Action');
INSERT INTO categorias VALUES (6, 'Thriller');

INSERT INTO contenidos VALUES (1, 'Attack on Titan', 24, 9.5, DATE '2013-09-01');
INSERT INTO contenidos VALUES (2, 'Breaking Bad', 47, 9.7, DATE '2008-01-20');
INSERT INTO contenidos VALUES (3, 'Demon Slayer', 23, 8.9, DATE '2019-04-06');
INSERT INTO contenidos VALUES (4, 'Stranger Things', 50, 8.8, DATE '2016-07-15');
INSERT INTO contenidos VALUES (5, 'One Piece', 22, 9.0, DATE '1999-10-20');
INSERT INTO contenidos VALUES (6, 'Naruto', 23, 8.7, DATE '2002-10-03');
INSERT INTO contenidos VALUES (7, 'Dark', 55, 9.1, DATE '2017-12-01');
INSERT INTO contenidos VALUES (8, 'The Office', 22, 8.9, DATE '2005-03-24');
INSERT INTO contenidos VALUES (9, 'Jujutsu Kaisen', 24, 9.2, DATE '2020-10-03');
INSERT INTO contenidos VALUES (10, 'Interstellar', 169, 8.6, DATE '2014-11-07');
INSERT INTO contenidos VALUES (11, 'Fullmetal Alchemist: Brotherhood', 24, 9.3, DATE '2009-04-05');
INSERT INTO contenidos VALUES (12, 'Better Call Saul', 47, 9.6, DATE '2015-02-08');

INSERT INTO contenido_categoria VALUES (1, 1);
INSERT INTO contenido_categoria VALUES (1, 5);
INSERT INTO contenido_categoria VALUES (2, 2);
INSERT INTO contenido_categoria VALUES (2, 6);
INSERT INTO contenido_categoria VALUES (3, 1);
INSERT INTO contenido_categoria VALUES (3, 5);
INSERT INTO contenido_categoria VALUES (4, 3);
INSERT INTO contenido_categoria VALUES (4, 6);
INSERT INTO contenido_categoria VALUES (5, 1);
INSERT INTO contenido_categoria VALUES (5, 5);
INSERT INTO contenido_categoria VALUES (6, 1);
INSERT INTO contenido_categoria VALUES (6, 5);
INSERT INTO contenido_categoria VALUES (7, 3);
INSERT INTO contenido_categoria VALUES (7, 6);
INSERT INTO contenido_categoria VALUES (8, 4);
INSERT INTO contenido_categoria VALUES (8, 2);
INSERT INTO contenido_categoria VALUES (9, 1);
INSERT INTO contenido_categoria VALUES (9, 5);
INSERT INTO contenido_categoria VALUES (10, 3);
INSERT INTO contenido_categoria VALUES (10, 2);
INSERT INTO contenido_categoria VALUES (11, 1);
INSERT INTO contenido_categoria VALUES (11, 5);
INSERT INTO contenido_categoria VALUES (11, 2);
INSERT INTO contenido_categoria VALUES (12, 2);
INSERT INTO contenido_categoria VALUES (12, 6);

INSERT INTO plataformas VALUES (1, 'Netflix', 3);
INSERT INTO plataformas VALUES (2, 'Crunchyroll', 2);
INSERT INTO plataformas VALUES (3, 'Prime Video', 3);
INSERT INTO plataformas VALUES (4, 'Max', 3);
INSERT INTO plataformas VALUES (5, 'Disney+', 3);

INSERT INTO planes VALUES (1, 'Basico', 6.99);
INSERT INTO planes VALUES (2, 'Estandar', 10.99);
INSERT INTO planes VALUES (3, 'Premium', 14.99);
INSERT INTO planes VALUES (4, 'Familiar', 17.99);

INSERT INTO dispositivos VALUES (1, 'Smart TV');
INSERT INTO dispositivos VALUES (2, 'Laptop');
INSERT INTO dispositivos VALUES (3, 'Tablet');
INSERT INTO dispositivos VALUES (4, 'Mobile');
INSERT INTO dispositivos VALUES (5, 'Desktop');

INSERT INTO suscripciones VALUES (1, 1, 1, 2, DATE '2023-01-10', DATE '2024-01-10');
INSERT INTO suscripciones VALUES (2, 2, 1, 3, DATE '2023-03-22', DATE '2024-03-22');
INSERT INTO suscripciones VALUES (3, 3, 2, 2, DATE '2022-11-05', DATE '2024-11-05');
INSERT INTO suscripciones VALUES (4, 4, 1, 1, DATE '2023-06-30', DATE '2024-06-30');
INSERT INTO suscripciones VALUES (5, 5, 3, 2, DATE '2023-07-15', DATE '2024-07-15');
INSERT INTO suscripciones VALUES (6, 6, 4, 3, DATE '2023-08-10', DATE '2024-08-10');
INSERT INTO suscripciones VALUES (7, 7, 1, 2, DATE '2023-02-18', DATE '2024-02-18');
INSERT INTO suscripciones VALUES (8, 8, 2, 1, DATE '2022-12-01', DATE '2024-12-01');
INSERT INTO suscripciones VALUES (9, 9, 1, 2, DATE '2023-05-05', DATE '2024-05-05');
INSERT INTO suscripciones VALUES (10, 10, 5, 3, DATE '2023-09-12', DATE '2024-09-12');
INSERT INTO suscripciones VALUES (11, 1, 2, 1, DATE '2024-01-11', DATE '2025-01-11');
INSERT INTO suscripciones VALUES (12, 5, 5, 1, DATE '2024-01-14', DATE '2025-01-14');

INSERT INTO visualizaciones VALUES (1, 1, 1, 4, DATE '2024-01-01', 100);
INSERT INTO visualizaciones VALUES (2, 1, 3, 3, DATE '2024-01-02', 50);
INSERT INTO visualizaciones VALUES (3, 2, 2, 2, DATE '2024-01-03', 100);
INSERT INTO visualizaciones VALUES (4, 3, 1, 1, DATE '2024-01-04', 80);
INSERT INTO visualizaciones VALUES (5, 4, 4, 4, DATE '2024-01-05', 100);
INSERT INTO visualizaciones VALUES (6, 5, 5, 3, DATE '2024-01-06', 30);
INSERT INTO visualizaciones VALUES (7, 6, 3, 2, DATE '2024-01-07', 100);
INSERT INTO visualizaciones VALUES (8, 7, 1, 1, DATE '2024-01-08', 100);
INSERT INTO visualizaciones VALUES (9, 8, 6, 5, DATE '2024-01-09', 40);
INSERT INTO visualizaciones VALUES (10, 9, 9, 4, DATE '2024-01-10', 100);

INSERT INTO visualizaciones VALUES (11, 1, 2, 2, DATE '2024-01-08', 60);
INSERT INTO visualizaciones VALUES (12, 2, 4, 1, DATE '2024-01-09', 100);
INSERT INTO visualizaciones VALUES (13, 3, 7, 3, DATE '2024-01-10', 20);
INSERT INTO visualizaciones VALUES (14, 4, 3, 4, DATE '2024-01-11', 100);
INSERT INTO visualizaciones VALUES (15, 5, 8, 1, DATE '2024-01-12', 80);
INSERT INTO visualizaciones VALUES (16, 6, 10, 5, DATE '2024-01-13', 100);
INSERT INTO visualizaciones VALUES (17, 7, 11, 2, DATE '2024-01-13', 15);
INSERT INTO visualizaciones VALUES (18, 8, 12, 3, DATE '2024-01-14', 95);
INSERT INTO visualizaciones VALUES (19, 9, 7, 1, DATE '2024-01-14', 100);
INSERT INTO visualizaciones VALUES (20, 10, 4, 4, DATE '2024-01-15', 75);
INSERT INTO visualizaciones VALUES (21, 11, 9, 2, DATE '2024-01-15', 100);
INSERT INTO visualizaciones VALUES (22, 12, 5, 1, DATE '2024-01-15', 50);
INSERT INTO visualizaciones VALUES (23, 1, 10, 2, DATE '2024-01-16', 100);
INSERT INTO visualizaciones VALUES (24, 5, 11, 4, DATE '2024-01-16', 100);
INSERT INTO visualizaciones VALUES (25, 6, 2, 5, DATE '2024-01-16', 45);
INSERT INTO visualizaciones VALUES (26, 7, 8, 3, DATE '2024-01-17', 100);
INSERT INTO visualizaciones VALUES (27, 8, 1, 2, DATE '2024-01-17', 30);
INSERT INTO visualizaciones VALUES (28, 9, 6, 4, DATE '2024-01-17', 100);
INSERT INTO visualizaciones VALUES (29, 10, 12, 1, DATE '2024-01-18', 90);
INSERT INTO visualizaciones VALUES (30, 3, 10, 2, DATE '2024-01-18', 100);

INSERT INTO calificaciones VALUES (1, 1, 1, DATE '2024-01-05', 9.8, 'muy intensa y bien animada');
INSERT INTO calificaciones VALUES (2, 2, 2, DATE '2024-01-06', 9.7, 'escritura brutal');
INSERT INTO calificaciones VALUES (3, 3, 3, DATE '2024-01-07', 9.0, 'gran ritmo y musica');
INSERT INTO calificaciones VALUES (4, 4, 4, DATE '2024-01-08', 8.8, 'engancha desde el inicio');
INSERT INTO calificaciones VALUES (5, 5, 5, DATE '2024-01-09', 9.1, 'clasico total');
INSERT INTO calificaciones VALUES (6, 6, 6, DATE '2024-01-10', 8.7, 'muy recordable');
INSERT INTO calificaciones VALUES (7, 7, 7, DATE '2024-01-11', 9.2, 'excelente atmosfera');
INSERT INTO calificaciones VALUES (8, 8, 8, DATE '2024-01-12', 8.9, 'humor simple y efectivo');
INSERT INTO calificaciones VALUES (9, 9, 9, DATE '2024-01-13', 9.3, 'combate y estilo top');
INSERT INTO calificaciones VALUES (10, 10, 10, DATE '2024-01-14', 8.6, 'visualmente potente');
INSERT INTO calificaciones VALUES (11, 1, 11, DATE '2024-01-15', 9.4, 'muy bien hecha');
INSERT INTO calificaciones VALUES (12, 5, 12, DATE '2024-01-16', 9.6, 'guion impresionante');
INSERT INTO calificaciones VALUES (13, 2, 8, DATE '2024-01-17', 8.8, 'muy entretenida');
INSERT INTO calificaciones VALUES (14, 3, 10, DATE '2024-01-18', 8.7, 'larga pero valiosa');
INSERT INTO calificaciones VALUES (15, 4, 7, DATE '2024-01-19', 9.1, 'oscura y muy buena');

commit;


--DLC de la BD

-- =========================
-- PAISES
-- =========================
INSERT INTO paises VALUES (9, 'España');
INSERT INTO paises VALUES (10, 'Brasil');
INSERT INTO paises VALUES (11, 'Colombia'); -- país sin usuarios, ideal para LEFT JOIN

-- =========================
-- USUARIOS
-- =========================
INSERT INTO usuarios VALUES (11, 'maria lopez', 8, DATE '2024-02-01');
INSERT INTO usuarios VALUES (12, 'pedro ramirez', 9, DATE '2024-02-10');
INSERT INTO usuarios VALUES (13, 'soledad navarro', 10, DATE '2024-03-05');
INSERT INTO usuarios VALUES (14, 'kevin diaz', 3, DATE '2024-03-12');
INSERT INTO usuarios VALUES (15, 'julia fernandez', 1, DATE '2024-03-18');
INSERT INTO usuarios VALUES (16, 'taro yamada', 2, DATE '2024-04-01');

-- Usuarios 13 y 16 quedan sin suscripción a propósito,
-- para practicar LEFT JOIN entre usuarios y suscripciones.

-- =========================
-- CATEGORIAS
-- =========================
INSERT INTO categorias VALUES (7, 'Mystery'); -- categoría sin contenidos
INSERT INTO categorias VALUES (8, 'Romance'); -- categoría sin contenidos

-- =========================
-- CONTENIDOS
-- =========================
INSERT INTO contenidos VALUES (13, 'Chainsaw Man', 24, 8.7, DATE '2022-10-11');
INSERT INTO contenidos VALUES (14, 'The Last of Us', 45, 8.9, DATE '2023-01-15');
INSERT INTO contenidos VALUES (15, 'Violet Evergarden', 24, 9.1, DATE '2018-01-11');
INSERT INTO contenidos VALUES (16, 'Arcane', 40, 9.2, DATE '2021-11-06');
INSERT INTO contenidos VALUES (17, 'The Boys', 60, 8.7, DATE '2019-07-26');
INSERT INTO contenidos VALUES (18, 'Your Name', 106, 9.2, DATE '2016-08-26');
INSERT INTO contenidos VALUES (19, 'Frieren: Beyond Journey''s End', 24, 9.3, DATE '2023-09-29');
INSERT INTO contenidos VALUES (20, 'Oppenheimer', 181, 8.8, DATE '2023-07-21');

-- =========================
-- CONTENIDO_CATEGORIA
-- =========================
INSERT INTO contenido_categoria VALUES (13, 1);
INSERT INTO contenido_categoria VALUES (13, 5);
INSERT INTO contenido_categoria VALUES (13, 6);

INSERT INTO contenido_categoria VALUES (14, 2);
INSERT INTO contenido_categoria VALUES (14, 6);

INSERT INTO contenido_categoria VALUES (15, 1);
INSERT INTO contenido_categoria VALUES (15, 2);

INSERT INTO contenido_categoria VALUES (16, 3);
INSERT INTO contenido_categoria VALUES (16, 5);

INSERT INTO contenido_categoria VALUES (17, 5);
INSERT INTO contenido_categoria VALUES (17, 6);

INSERT INTO contenido_categoria VALUES (18, 2);

INSERT INTO contenido_categoria VALUES (19, 1);
INSERT INTO contenido_categoria VALUES (19, 2);

INSERT INTO contenido_categoria VALUES (20, 2);
INSERT INTO contenido_categoria VALUES (20, 6);

-- =========================
-- PLATAFORMAS
-- =========================
INSERT INTO plataformas VALUES (6, 'Mubi', 1);
INSERT INTO plataformas VALUES (7, 'AnimeOne', 2);
INSERT INTO plataformas VALUES (8, 'Hulu', 11); -- plataforma en país sin usuarios

-- =========================
-- PLANES
-- =========================
INSERT INTO planes VALUES (5, 'Lite', 4.99);
INSERT INTO planes VALUES (6, 'Ultra', 19.99);

-- =========================
-- DISPOSITIVOS
-- =========================
INSERT INTO dispositivos VALUES (6, 'Console');
INSERT INTO dispositivos VALUES (7, 'Web Browser');
INSERT INTO dispositivos VALUES (8, 'Projector');

-- =========================
-- SUSCRIPCIONES
-- =========================
INSERT INTO suscripciones VALUES (13, 11, 8, 5, DATE '2024-02-01', NULL);
INSERT INTO suscripciones VALUES (14, 12, 6, 6, DATE '2024-02-10', DATE '2025-02-10');
INSERT INTO suscripciones VALUES (15, 13, 7, 1, DATE '2024-03-05', NULL);
INSERT INTO suscripciones VALUES (16, 14, 1, 4, DATE '2024-03-12', DATE '2025-03-12');
INSERT INTO suscripciones VALUES (17, 15, 2, 3, DATE '2024-03-18', NULL);
INSERT INTO suscripciones VALUES (18, 16, 7, 2, DATE '2024-04-01', NULL);

-- Suscripciones extra para usuarios que ya existían:
INSERT INTO suscripciones VALUES (19, 1, 3, 1, DATE '2025-01-01', NULL);
INSERT INTO suscripciones VALUES (20, 1, 2, 2, DATE '2025-06-01', NULL);
INSERT INTO suscripciones VALUES (21, 5, 5, 4, DATE '2025-07-01', DATE '2026-07-01');
INSERT INTO suscripciones VALUES (22, 2, 6, 5, DATE '2025-08-01', NULL);

-- =========================
-- VISUALIZACIONES
-- =========================
INSERT INTO visualizaciones VALUES (31, 13, 13, 4, DATE '2024-02-03', 100);
INSERT INTO visualizaciones VALUES (32, 13, 16, 7, DATE '2024-02-04', 35);

INSERT INTO visualizaciones VALUES (33, 14, 15, 1, DATE '2024-02-11', 100);
INSERT INTO visualizaciones VALUES (34, 14, 19, 1, DATE '2024-02-12', 70);

INSERT INTO visualizaciones VALUES (35, 15, 13, 2, DATE '2024-03-06', 20);
INSERT INTO visualizaciones VALUES (36, 15, 15, 2, DATE '2024-03-07', 100);

INSERT INTO visualizaciones VALUES (37, 16, 14, 6, DATE '2024-03-13', 80);
INSERT INTO visualizaciones VALUES (38, 16, 20, 6, DATE '2024-03-14', 100);

INSERT INTO visualizaciones VALUES (39, 17, 18, 1, DATE '2024-03-19', 100);
INSERT INTO visualizaciones VALUES (40, 17, 16, 8, DATE '2024-03-20', 60);

INSERT INTO visualizaciones VALUES (41, 18, 19, 7, DATE '2024-04-02', 100);
INSERT INTO visualizaciones VALUES (42, 18, 17, 7, DATE '2024-04-03', 45);

INSERT INTO visualizaciones VALUES (43, 19, 2, 7, DATE '2025-01-02', 100);
INSERT INTO visualizaciones VALUES (44, 20, 12, 1, DATE '2025-06-02', 50);
INSERT INTO visualizaciones VALUES (45, 21, 11, 8, DATE '2025-07-02', 100);
INSERT INTO visualizaciones VALUES (46, 22, 10, 6, DATE '2025-08-02', 100);
INSERT INTO visualizaciones VALUES (47, 22, 4, 6, DATE '2025-08-03', 25);

-- =========================
-- CALIFICACIONES
-- =========================
INSERT INTO calificaciones VALUES (16, 11, 13, DATE '2024-02-05', 9.0, 'muy frenetica');
INSERT INTO calificaciones VALUES (17, 12, 13, DATE '2024-02-06', 8.8, 'caotica pero buena');

INSERT INTO calificaciones VALUES (18, 13, 14, DATE '2024-03-08', 9.1, 'emocionante');
INSERT INTO calificaciones VALUES (19, 14, 14, DATE '2024-03-09', 9.1, 'muy solida');

INSERT INTO calificaciones VALUES (20, 15, 15, DATE '2024-03-10', 9.4, 'poetica y sensible');

INSERT INTO calificaciones VALUES (21, 1, 16, DATE '2024-03-11', 9.2, 'animacion brutal');
INSERT INTO calificaciones VALUES (22, 2, 16, DATE '2024-03-12', 9.2, 'visual top');

INSERT INTO calificaciones VALUES (23, 5, 17, DATE '2024-03-13', 8.6, 'oscura y divertida');
INSERT INTO calificaciones VALUES (24, 7, 17, DATE '2024-03-14', 8.6, 'gran ironia');

INSERT INTO calificaciones VALUES (25, 8, 18, DATE '2024-03-15', 9.5, 'emocionante');
INSERT INTO calificaciones VALUES (26, 9, 18, DATE '2024-03-16', 9.3, 'muy hermosa');

INSERT INTO calificaciones VALUES (27, 11, 19, DATE '2024-03-17', 9.6, 'sutil y profunda');
-- Dejo Oppenheimer sin calificación para practicar LEFT JOIN contenidos-calificaciones.

commit;
`;
