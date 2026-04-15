# 🛠️ El Script
### Duoc UC Puerto Montt | Base de Datos Aplicada II

Herramienta interactiva para facilitar la gestión de bases de datos Oracle en entornos académicos. Este script automatiza tareas comunes como creación de usuarios, ejecución de scripts SQL, diagnóstico de conexión y más, con una interfaz de consola.

---

## 🚀 Cómo empezar

### 1. Descargar el proyecto
Puedes obtener este repositorio de dos formas:

*   **Opción A (Recomendada):** Clonar el repositorio usando Git:
    ```bash
    git clone https://github.com/hachimaki-dev/Bases_de_datos_Aplicada_2_005V_DuocUcPMontt_2026.git
    ```
*   **Opción B:** Descargar como archivo ZIP:
    1. Haz clic en el botón verde **"Code"** arriba a la derecha.
    2. Selecciona **"Download ZIP"**.
    3. Extrae la carpeta donde prefieras.

### 2. Ejecutar el script
Navega a la carpeta `El script` y ejecuta el archivo de PowerShell:
1. Clic derecho sobre `ConfigurarOracle.ps1`.
2. Selecciona **"Ejecutar con PowerShell"**.
   * *Si es la primera vez, es posible que debas permitir la ejecución de scripts en tu sistema.*

---

## ⚠️ IMPORTANTE: Requisitos de Entorno

Este script ha sido diseñado **exclusivamente** para funcionar en los entornos enseñados en clase:

1.  **PC Personal (Docker):** Requiere tener Docker corriendo con la imagen `gvenzl/oracle-free:23-slim` (o similar) configurada con el nombre de contenedor `oracle23c`.
2.  **PC del DUOC:** Configurado para conectar con la instancia nativa `ORCL` usando privilegios de `SYSDBA`.

### 🔐 Advertencia de Contraseña (Password)
> [!CAUTION]
> El script tiene la contraseña **`123456`** hardcodeada para las conexiones administrativas (`SYS` / `SYSTEM`).
> 
> *   **Si creaste tu imagen de Docker con una contraseña diferente**, el script no podrá conectarse.
> *   **Para solucionarlo:** Debes abrir `ConfigurarOracle.ps1` con un editor de texto (como Notepad++ o VS Code) y cambiar el valor de `$script:dbPass = "123456"` en la línea 13 por tu propia contraseña.

---

## 📖 ¿Qué hace este script?
El toolbox ofrece un menú interactivo para:
*   **Diagnóstico:** Verifica si SQL*Plus y Docker están operativos.
*   **Gestión de Usuarios:** Listar, crear y eliminar esquemas fácilmente.
*   **Terminal SQL:** Acceso directo a SQL*Plus sin escribir cadenas de conexión complejas.
*   **Herramientas de Estudio:** Incluye un **Cheatsheet** de comandos SQL comunes y permite exportar consultas a CSV.
*   **Acceso Rápido:** Opción directa para configurar el entorno de la Evaluación N1.

---

## 🛠️ Creación Manual de Usuarios (SQL)
Si prefieres no usar el script interactivo y configurar un usuario manualmente desde SQL*Plus (como `SYS` o `SYSTEM`), puedes usar la siguiente plantilla. Solo debes reemplazar `MI_USUARIO` y `MI_PASSWORD` por los valores que desees:

```sql
-- Habilita la creación de usuarios en Oracle 12c/19c/21c/23c
ALTER SESSION SET "_ORACLE_SCRIPT"=TRUE;

-- Crear el usuario
CREATE USER MI_USUARIO IDENTIFIED BY "MI_PASSWORD"
DEFAULT TABLESPACE "USERS"
TEMPORARY TABLESPACE "TEMP";

-- Asignar cuota y permisos básicos
ALTER USER MI_USUARIO QUOTA UNLIMITED ON USERS;
GRANT CREATE SESSION TO MI_USUARIO;
GRANT "RESOURCE" TO MI_USUARIO;
ALTER USER MI_USUARIO DEFAULT ROLE "RESOURCE";
```

---
*Desarrollado por [hachimaki-dev](https://github.com/hachimaki-dev)*
