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

INSERT INTO contenidos VALUES (1, 'Attack on Titan', 'Anime', 24, 9.5);
INSERT INTO contenidos VALUES (2, 'Breaking Bad', 'Drama', 47, 9.7);
INSERT INTO contenidos VALUES (3, 'Demon Slayer', 'Anime', 23, 8.9);
INSERT INTO contenidos VALUES (4, 'Stranger Things', 'Sci-Fi', 50, 8.8);
INSERT INTO contenidos VALUES (5, 'One Piece', 'Anime', 22, 9.0);

INSERT INTO visualizaciones VALUES (1, 1, 1, DATE '2024-01-01', 100);
INSERT INTO visualizaciones VALUES (2, 1, 3, DATE '2024-01-02', 50);
INSERT INTO visualizaciones VALUES (3, 2, 2, DATE '2024-01-03', 100);
INSERT INTO visualizaciones VALUES (4, 3, 1, DATE '2024-01-04', 80);
INSERT INTO visualizaciones VALUES (5, 4, 4, DATE '2024-01-05', 100);
INSERT INTO visualizaciones VALUES (6, 2, 5, DATE '2024-01-06', 30);
INSERT INTO visualizaciones VALUES (7, 3, 3, DATE '2024-01-07', 100);