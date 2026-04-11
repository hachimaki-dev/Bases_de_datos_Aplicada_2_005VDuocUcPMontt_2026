/*
    1. Muestra numrun_cli, pnombre_cli, appaterno_cli y renta de la tabla CLIENTE, 
    ordenados por apellido paterno en forma ascendente.
*/

SELECT NUMRUN_CLI, PNOMBRE_CLI, APPATERNO_CLI, RENTA FROM CLIENTE
order by APPATERNO_CLI ASC;