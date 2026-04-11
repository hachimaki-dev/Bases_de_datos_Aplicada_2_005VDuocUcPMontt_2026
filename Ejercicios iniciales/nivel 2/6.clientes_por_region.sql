/*
    6. Muestra cuántos clientes tiene cada región (usando id_region).
*/

SELECT * FROM CLIENTE;

--Sin join ....
SELECT c.ID_REGION   AS cantidad_de_Clientes_por_region FROM CLIENTE c  ORDER by c.ID_REGION;



--Con JOin
SELECT c.ID_REGION   AS cantidad_de_Clientes_por_region FROM CLIENTE  INNER JOIN REGION c  ORDER by c.ID_REGION;