DROP TABLE visualizaciones;
DROP TABLE contenidos;
DROP TABLE usuarios;


CREATE TABLE usuarios (
    id_usuario NUMBER PRIMARY KEY,
    nombre VARCHAR2(50),
    pais VARCHAR2(50),
    fecha_registro DATE
);

CREATE TABLE contenidos (
    id_contenido NUMBER PRIMARY KEY,
    titulo VARCHAR2(100),
    genero VARCHAR2(50),
    duracion_min NUMBER,
    rating NUMBER(3,1)
);

CREATE TABLE visualizaciones (
    id_visualizacion NUMBER PRIMARY KEY,
    id_usuario NUMBER,
    id_contenido NUMBER,
    fecha DATE,
    progreso NUMBER,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_contenido) REFERENCES contenidos(id_contenido)
);

INSERT INTO usuarios VALUES (1, 'ana torres', 'Chile', DATE '2023-01-10');
INSERT INTO usuarios VALUES (2, 'LUIS ROJAS', 'Chile', DATE '2023-03-22');
INSERT INTO usuarios VALUES (3, 'mika tanaka', 'Japón', DATE '2022-11-05');
INSERT INTO usuarios VALUES (4, 'john smith', 'USA', DATE '2023-06-30');
INSERT INTO usuarios VALUES (5, 'camila perez', 'Chile', DATE '2023-07-15');
INSERT INTO usuarios VALUES (6, 'diego muñoz', 'Chile', DATE '2023-08-10');
INSERT INTO usuarios VALUES (7, 'sofia garcia', 'Argentina', DATE '2023-02-18');
INSERT INTO usuarios VALUES (8, 'li wei', 'China', DATE '2022-12-01');
INSERT INTO usuarios VALUES (9, 'emma brown', 'UK', DATE '2023-05-05');

INSERT INTO contenidos VALUES (1, 'Attack on Titan', 'Anime', 24, 9.5);
INSERT INTO contenidos VALUES (2, 'Breaking Bad', 'Drama', 47, 9.7);
INSERT INTO contenidos VALUES (3, 'Demon Slayer', 'Anime', 23, 8.9);
INSERT INTO contenidos VALUES (4, 'Stranger Things', 'Sci-Fi', 50, 8.8);
INSERT INTO contenidos VALUES (5, 'One Piece', 'Anime', 22, 9.0);
INSERT INTO contenidos VALUES (6, 'Naruto', 'Anime', 23, 8.7);
INSERT INTO contenidos VALUES (7, 'Dark', 'Sci-Fi', 55, 9.1);
INSERT INTO contenidos VALUES (8, 'The Office', 'Comedy', 22, 8.9);
INSERT INTO contenidos VALUES (9, 'Jujutsu Kaisen', 'Anime', 24, 9.2);
INSERT INTO contenidos VALUES (10, 'Interstellar', 'Sci-Fi', 169, 8.6);

INSERT INTO visualizaciones VALUES (1, 1, 1, DATE '2024-01-01', 100);
INSERT INTO visualizaciones VALUES (2, 1, 3, DATE '2024-01-02', 50);
INSERT INTO visualizaciones VALUES (3, 2, 2, DATE '2024-01-03', 100);
INSERT INTO visualizaciones VALUES (4, 3, 1, DATE '2024-01-04', 80);
INSERT INTO visualizaciones VALUES (5, 4, 4, DATE '2024-01-05', 100);
INSERT INTO visualizaciones VALUES (6, 2, 5, DATE '2024-01-06', 30);
INSERT INTO visualizaciones VALUES (7, 3, 3, DATE '2024-01-07', 100);
INSERT INTO visualizaciones VALUES (8, 5, 1, DATE '2024-01-08', 100);
INSERT INTO visualizaciones VALUES (9, 5, 6, DATE '2024-01-09', 40);
INSERT INTO visualizaciones VALUES (10, 5, 9, DATE '2024-01-10', 100);

INSERT INTO visualizaciones VALUES (11, 6, 2, DATE '2024-01-08', 60);
INSERT INTO visualizaciones VALUES (12, 6, 4, DATE '2024-01-09', 100);
INSERT INTO visualizaciones VALUES (13, 6, 7, DATE '2024-01-10', 20);

INSERT INTO visualizaciones VALUES (14, 7, 3, DATE '2024-01-08', 100);
INSERT INTO visualizaciones VALUES (15, 7, 5, DATE '2024-01-09', 80);
INSERT INTO visualizaciones VALUES (16, 7, 8, DATE '2024-01-10', 100);

INSERT INTO visualizaciones VALUES (17, 8, 1, DATE '2024-01-08', 30);
INSERT INTO visualizaciones VALUES (18, 8, 6, DATE '2024-01-09', 100);
INSERT INTO visualizaciones VALUES (19, 8, 10, DATE '2024-01-10', 50);

INSERT INTO visualizaciones VALUES (20, 9, 2, DATE '2024-01-08', 100);
INSERT INTO visualizaciones VALUES (21, 9, 4, DATE '2024-01-09', 90);
INSERT INTO visualizaciones VALUES (22, 9, 7, DATE '2024-01-10', 100);

-- Usuarios originales con más actividad
INSERT INTO visualizaciones VALUES (23, 1, 5, DATE '2024-01-11', 70);
INSERT INTO visualizaciones VALUES (24, 1, 9, DATE '2024-01-12', 100);

INSERT INTO visualizaciones VALUES (25, 2, 3, DATE '2024-01-11', 40);
INSERT INTO visualizaciones VALUES (26, 2, 8, DATE '2024-01-12', 100);

INSERT INTO visualizaciones VALUES (27, 3, 7, DATE '2024-01-11', 60);
INSERT INTO visualizaciones VALUES (28, 3, 10, DATE '2024-01-12', 100);

INSERT INTO visualizaciones VALUES (29, 4, 2, DATE '2024-01-11', 100);
INSERT INTO visualizaciones VALUES (30, 4, 8, DATE '2024-01-12', 50);

-- Más variabilidad de progreso
INSERT INTO visualizaciones VALUES (31, 6, 1, DATE '2024-01-13', 15);
INSERT INTO visualizaciones VALUES (32, 7, 2, DATE '2024-01-13', 100);
INSERT INTO visualizaciones VALUES (33, 8, 3, DATE '2024-01-13', 75);
INSERT INTO visualizaciones VALUES (34, 9, 5, DATE '2024-01-13', 20);

INSERT INTO visualizaciones VALUES (35, 5, 8, DATE '2024-01-14', 100);
INSERT INTO visualizaciones VALUES (36, 6, 9, DATE '2024-01-14', 95);
INSERT INTO visualizaciones VALUES (37, 7, 10, DATE '2024-01-14', 100);

INSERT INTO visualizaciones VALUES (38, 8, 4, DATE '2024-01-14', 60);
INSERT INTO visualizaciones VALUES (39, 9, 6, DATE '2024-01-14', 100);

INSERT INTO visualizaciones VALUES (40, 1, 7, DATE '2024-01-15', 85);
INSERT INTO visualizaciones VALUES (41, 2, 10, DATE '2024-01-15', 100);
INSERT INTO visualizaciones VALUES (42, 3, 8, DATE '2024-01-15', 30);