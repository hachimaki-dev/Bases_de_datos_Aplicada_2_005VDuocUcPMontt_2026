/* =====================================================================
   TABLAS ADICIONALES PARA DESAFÍO CLON EV3
   Contexto: Análisis de Productividad y Bonificaciones de Empleados
   ===================================================================== */

-- Limpiar si existen
DROP TABLE AJUSTE_BONO_EMP CASCADE CONSTRAINTS;
DROP TABLE RESUMEN_PRODUCTIVIDAD_EMP CASCADE CONSTRAINTS;
DROP TABLE PARAM_AJUSTE_BONO CASCADE CONSTRAINTS;

/* ---------------------------------------------------------------------
   TABLA PARA LA PARTE 1 DEL DESAFÍO CLON
   --------------------------------------------------------------------- */
CREATE TABLE RESUMEN_PRODUCTIVIDAD_EMP (
    numrun_emp                  NUMBER(10)    NOT NULL,
    anno_proceso                NUMBER(4)     NOT NULL,
    nombre_completo             VARCHAR2(60)  NOT NULL,
    antiguedad_anios            NUMBER(3)     DEFAULT 0,
    cant_vehiculos_asignados    NUMBER(5)     DEFAULT 0,
    total_arriendos_gestionados NUMBER(6)     DEFAULT 0,
    total_dias_arrendados       NUMBER(6)     DEFAULT 0,
    bono_calculado              NUMBER(10)    DEFAULT 0,
    clasificacion_productividad VARCHAR2(20)  NOT NULL,
    CONSTRAINT PK_RESUMEN_PROD PRIMARY KEY (numrun_emp, anno_proceso)
);

/* ---------------------------------------------------------------------
   TABLA DE PARÁMETROS PARA LA PARTE 2 DEL DESAFÍO CLON
   --------------------------------------------------------------------- */
CREATE TABLE PARAM_AJUSTE_BONO (
    clasificacion  VARCHAR2(20) NOT NULL CONSTRAINT PK_PARAM_BONO PRIMARY KEY,
    porc_ajuste    NUMBER(5,2)  NOT NULL,
    accion_rh      VARCHAR2(50) NOT NULL
);

INSERT INTO PARAM_AJUSTE_BONO VALUES ('Alta', 15.00, 'Aprobar bono y enviar felicitaciones');
INSERT INTO PARAM_AJUSTE_BONO VALUES ('Media', 5.00, 'Aprobar bono base');
INSERT INTO PARAM_AJUSTE_BONO VALUES ('Baja', 0.00, 'Agendar capacitación de ventas');
INSERT INTO PARAM_AJUSTE_BONO VALUES ('Sin Actividad', -10.00, 'Evaluar continuidad y reasignar flota');

/* ---------------------------------------------------------------------
   TABLA PARA LA PARTE 2 DEL DESAFÍO CLON (RESULTADO FINAL)
   --------------------------------------------------------------------- */
CREATE TABLE AJUSTE_BONO_EMP (
    numrun_emp            NUMBER(10)   NOT NULL,
    anno_proceso          NUMBER(4)    NOT NULL,
    clasificacion         VARCHAR2(20) NOT NULL,
    bono_actual           NUMBER(10)   NOT NULL,
    porc_ajuste           NUMBER(5,2)  NOT NULL,
    bono_propuesto        NUMBER(10)   NOT NULL,
    diferencia            NUMBER(10)   NOT NULL,
    accion_recomendada    VARCHAR2(50) NOT NULL,
    CONSTRAINT PK_AJUSTE_BONO PRIMARY KEY (numrun_emp, anno_proceso)
);

COMMIT;

PROMPT Tablas adicionales para el Desafio Clon creadas con exito.
