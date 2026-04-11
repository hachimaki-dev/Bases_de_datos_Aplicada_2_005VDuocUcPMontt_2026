/*
    3. Muestra el nombre del cliente en mayúsculas junto con su 
    apellido paterno, usando funciones de texto.
*/
select * from CLIENTE;
SELECT UPPER(c.PNOMBRE_CLI) || ' ' || UPPER(c.APPATERNO_CLI) as NOMBRE_DEL_USUARIO FROM CLIENTE c;