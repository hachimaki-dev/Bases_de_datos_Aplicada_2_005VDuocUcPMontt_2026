Perfecto. Voy a explicarlo como si estuviéramos leyendo tu BD como un sistema real de streaming, porque así los `JOIN` dejan de ser teoría suelta y pasan a tener sentido práctico.

En tu modelo hay relaciones muy naturales: `usuarios` vive en `paises`, `suscripciones` conecta usuarios con plataformas y planes, `visualizaciones` cuelga de suscripciones, contenidos y dispositivos, y `contenido_categoria` resuelve una relación de muchos a muchos entre contenidos y categorías. Esa estructura es ideal para aprender `JOIN`, porque casi todas las consultas interesantes nacen de unir tablas.

La idea central es esta: un `JOIN` sirve para reconstruir información dispersa en varias tablas. Cada tabla guarda una parte de la historia, y el `JOIN` la vuelve a juntar. En Oracle, la forma moderna y recomendada es usar la sintaxis ANSI:

```sql
SELECT ...
FROM tabla1 t1
JOIN tabla2 t2 ON t1.columna = t2.columna;
```

## 1) INNER JOIN: solo trae coincidencias

Este es el `JOIN` más importante para empezar. Devuelve solamente las filas donde hay match en ambas tablas. Si una fila no encuentra pareja, desaparece del resultado.

Por ejemplo, si quieres ver los usuarios con su país:

```sql
SELECT u.id_usuario, u.nombre, p.nombre_pais
FROM usuarios u
INNER JOIN paises p
    ON u.id_pais = p.id_pais
ORDER BY u.id_usuario;
```

Qué hace mentalmente: toma cada usuario, busca su país, y solo lo muestra si existe coincidencia.
Con tus datos, esto funciona perfecto porque todos los usuarios tienen país válido.

También puedes usar `USING` cuando el nombre de la columna es igual en ambas tablas:

```sql
SELECT u.id_usuario, u.nombre, p.nombre_pais
FROM usuarios u
JOIN paises p USING (id_pais);
```

Eso es más limpio cuando la columna clave se llama igual en ambas tablas.

## 2) LEFT JOIN: trae todo lo de la izquierda, aunque no haya match

Este es muy pedagógico porque muestra la diferencia entre “tener datos relacionados” y “no tenerlos”.
El `LEFT JOIN` conserva todas las filas de la tabla de la izquierda, y completa con `NULL` lo que no encuentre en la derecha.

Ejemplo muy bueno con tu BD: países y usuarios. Así puedes detectar países sin usuarios.

```sql
SELECT p.id_pais, p.nombre_pais, u.id_usuario, u.nombre
FROM paises p
LEFT JOIN usuarios u
    ON p.id_pais = u.id_pais
ORDER BY p.id_pais, u.id_usuario;
```

Aquí vas a ver algo importante: `México` aparece aunque no tenga usuarios registrados.
Eso es lo que diferencia al `LEFT JOIN` del `INNER JOIN`: el país no desaparece solo porque no tenga coincidencia.

Si quieres pensar en esto visualmente: el `LEFT JOIN` dice “muéstrame mi tabla completa, y si la otra tiene algo relacionado, agrégalo”.

## 3) RIGHT JOIN: lo mismo, pero al revés

`RIGHT JOIN` es exactamente la idea contraria al `LEFT JOIN`: conserva todo lo de la tabla de la derecha.

Por ejemplo:

```sql
SELECT u.id_usuario, u.nombre, s.id_suscripcion, s.fecha_inicio
FROM usuarios u
RIGHT JOIN suscripciones s
    ON u.id_usuario = s.id_usuario
ORDER BY s.id_suscripcion;
```

En tu caso, como todas las suscripciones apuntan a usuarios existentes, el resultado se verá parecido a un `INNER JOIN`.
Pero el valor didáctico está en entender que el lado “protegido” es el derecho.

En práctica profesional, mucha gente prefiere escribir `LEFT JOIN` cambiando el orden de las tablas, porque suele leerse mejor. `RIGHT JOIN` existe, pero se usa menos.

## 4) FULL OUTER JOIN: trae todo de ambos lados

Este conserva todas las filas de ambas tablas. Donde no haya match, rellena con `NULL`.

Ejemplo con países y usuarios:

```sql
SELECT p.id_pais, p.nombre_pais, u.id_usuario, u.nombre
FROM paises p
FULL OUTER JOIN usuarios u
    ON p.id_pais = u.id_pais
ORDER BY p.id_pais, u.id_usuario;
```

Aquí verías países sin usuarios, y también usuarios sin país si existieran.
En tu esquema, por las claves foráneas, casi no deberías tener “huérfanos”, así que este tipo de `JOIN` se usa más cuando estás integrando datos incompletos, migrando información o revisando inconsistencias.

Ojo importante: en bases bien normalizadas como la tuya, el `FULL OUTER JOIN` a veces no muestra grandes sorpresas, justamente porque las restricciones de integridad ya evitan muchos desajustes.

## 5) CROSS JOIN: todas las combinaciones posibles

Este no busca coincidencias. Simplemente combina cada fila de una tabla con cada fila de la otra. Es un producto cartesiano.

Por ejemplo, si quisieras generar todas las combinaciones entre planes y dispositivos:

```sql
SELECT pl.nombre_plan, d.tipo_dispositivo
FROM planes pl
CROSS JOIN dispositivos d
ORDER BY pl.nombre_plan, d.tipo_dispositivo;
```

Si tienes 4 planes y 5 dispositivos, obtendrás 20 filas.
Sirve para escenarios como matrices de pruebas, combinaciones teóricas o generación de catálogos. Pero hay que usarlo con cuidado, porque puede explotar el número de filas muy rápido.

En una frase: `CROSS JOIN` no relaciona, multiplica.

## 6) SELF JOIN: una tabla consigo misma

Este no es un tipo “separado” al estilo de los anteriores, pero es una técnica muy importante. Se usa cuando quieres comparar filas de una misma tabla.

Un ejemplo útil en tu BD: encontrar pares de usuarios del mismo país.

```sql
SELECT
    u1.nombre AS usuario_1,
    u2.nombre AS usuario_2,
    p.nombre_pais
FROM usuarios u1
JOIN usuarios u2
    ON u1.id_pais = u2.id_pais
   AND u1.id_usuario < u2.id_usuario
JOIN paises p
    ON u1.id_pais = p.id_pais
ORDER BY p.nombre_pais, usuario_1, usuario_2;
```

La condición `u1.id_usuario < u2.id_usuario` evita repetir parejas al revés y también evita que un usuario se compare consigo mismo.

Esto es muy útil para detectar similitudes, vecinos, duplicados, jerarquías o comparaciones internas en una misma entidad.

## 7) La joya de tu modelo: JOIN en cadena con tablas puente

Tu tabla `contenido_categoria` es la típica tabla puente de una relación muchos a muchos. Aquí los `JOIN` ya no son solo entre dos tablas, sino entre tres.

Si quieres ver el título del contenido junto con su categoría:

```sql
SELECT c.titulo, cat.nombre_categoria
FROM contenidos c
JOIN contenido_categoria cc
    ON c.id_contenido = cc.id_contenido
JOIN categorias cat
    ON cc.id_categoria = cat.id_categoria
ORDER BY c.titulo, cat.nombre_categoria;
```

Este patrón es fundamental en bases relacionales reales.
La tabla puente existe porque un contenido puede tener varias categorías, y una categoría puede pertenecer a varios contenidos. Sin esa tabla intermedia, la normalización se rompería o terminarías repitiendo datos.

Otro ejemplo muy bueno es seguir una cadena de relaciones:

```sql
SELECT
    u.nombre,
    p.nombre_pais,
    pl.nombre_plataforma,
    pln.nombre_plan
FROM suscripciones s
JOIN usuarios u
    ON s.id_usuario = u.id_usuario
JOIN paises p
    ON u.id_pais = p.id_pais
JOIN plataformas pl
    ON s.id_plataforma = pl.id_plataforma
JOIN planes pln
    ON s.id_plan = pln.id_plan
ORDER BY u.nombre;
```

Aquí estás reconstruyendo el contexto completo de una suscripción.
Eso es exactamente lo que hace un sistema bien diseñado: distribuye la información y luego la vuelve a componer cuando la necesitas.

## INNER, LEFT, RIGHT, FULL: la regla mental más útil

Piensa así:

* `INNER JOIN`: solo lo que coincide.
* `LEFT JOIN`: todo lo de la izquierda, y si falta algo a la derecha, queda `NULL`.
* `RIGHT JOIN`: todo lo de la derecha, y si falta algo a la izquierda, queda `NULL`.
* `FULL OUTER JOIN`: todo de ambos lados.
* `CROSS JOIN`: todas las combinaciones posibles.
* `SELF JOIN`: una tabla comparada consigo misma.

Si quieres una imagen mental muy simple:
`INNER` es intersección, `LEFT` es “todo lo mío”, `RIGHT` es “todo lo tuyo”, `FULL` es “todo de ambos”, y `CROSS` es “combínalo todo con todo”.

## Qué conviene practicar en tu BD

Para entrenar de verdad, estas consultas son las más valiosas:

```sql
-- Usuarios con país
SELECT u.nombre, p.nombre_pais
FROM usuarios u
JOIN paises p ON u.id_pais = p.id_pais;
```

```sql
-- Países aunque no tengan usuarios
SELECT p.nombre_pais, u.nombre
FROM paises p
LEFT JOIN usuarios u ON p.id_pais = u.id_pais;
```

```sql
-- Contenido con sus categorías
SELECT c.titulo, cat.nombre_categoria
FROM contenidos c
JOIN contenido_categoria cc ON c.id_contenido = cc.id_contenido
JOIN categorias cat ON cc.id_categoria = cat.id_categoria;
```

```sql
-- Suscripción completa: usuario, país, plataforma y plan
SELECT u.nombre, p.nombre_pais, pl.nombre_plataforma, pn.nombre_plan
FROM suscripciones s
JOIN usuarios u ON s.id_usuario = u.id_usuario
JOIN paises p ON u.id_pais = p.id_pais
JOIN plataformas pl ON s.id_plataforma = pl.id_plataforma
JOIN planes pn ON s.id_plan = pn.id_plan;
```

Si quieres, en el siguiente paso te puedo convertir todo esto en una guía de estudio más compacta, con ejercicios resueltos y sin texto de relleno, lista para practicar en Oracle SQL Developer.
