# ============================================================================
#  Oracle Interactive Toolbox v5.0
#  Autor: https://github.com/hachimaki-dev
#  Duoc UC - Puerto Montt | Base de Datos Aplicada II
# ============================================================================

# --- Encoding y ventana ---
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$Host.UI.RawUI.WindowTitle = "Oracle Interactive Toolbox v5.0 | Duoc UC Puerto Montt"

# --- Configuración global ---
$script:dbPass        = "123456"
$script:containerName = "oracle23c"
$script:version       = "v5.0"
$script:sessionStart  = Get-Date
$script:sessionLog    = @()
$script:connStrBase   = ""
$script:adminUser     = ""
$script:isDocker      = $false
$script:serviceName   = ""

# --- Paleta de colores ---
$c = @{
    Neon    = "Cyan"
    Accent  = "Cyan"
    Success = "Green"
    Warn    = "Yellow"
    Error   = "Red"
    Dim     = "Gray"
    Info    = "White"
    Title   = "White"
}

# ============================================================================
#  FUNCIONES DE INTERFAZ
# ============================================================================

function Show-Banner {
    Clear-Host
    Write-Host "================================================================================" -ForegroundColor DarkGray
    Write-Host "  H A C H I M A K I   D E V  -  O R A C L E   T O O L B O X" -ForegroundColor Cyan
    Write-Host "  DUOC UC - PUERTO MONTT" -ForegroundColor DarkGray
    Write-Host "================================================================================" -ForegroundColor DarkGray
    Write-Host ""
}

function Show-PanelTitle {
    param([string]$Title)
    Write-Host ""
    Write-Host " ▶ $Title " -ForegroundColor Cyan
    Write-Host "--------------------------------------------------------------------------------" -ForegroundColor DarkGray
}

function Show-SubPanel {
    param([string]$Title)
    Write-Host ""
    Write-Host "   ℹ $Title" -ForegroundColor Cyan
}

function Show-Info {
    param([string]$Message)
    Write-Host "   ℹ $Message" -ForegroundColor Blue
}

function Show-Success {
    param([string]$Message)
    Write-Host "   ✔ $Message" -ForegroundColor Green
}

function Show-Warn {
    param([string]$Message)
    Write-Host "   ⚠ $Message" -ForegroundColor Yellow
}

function Show-Error {
    param([string]$Message)
    Write-Host "   ✖ $Message" -ForegroundColor Red
}

function Show-Spinner {
    param(
        [string]$Message,
        [int]$DurationMs = 0 # Eliminamos el sleep artificial, el parámetro no se usa operativamente.
    )
    Write-Host "   ⠋ $Message..." -ForegroundColor Cyan
}

function Show-Timer {
    # Solo dejamos esto vacío si se usaba en otros lados y no queremos fallos de sintaxis
}

function Pause-Lab {
    Write-Host ""
    Write-Host "   (Presiona ENTER para continuar)" -ForegroundColor DarkGray
    Read-Host | Out-Null
}

function Log-Session {
    param([string]$Action)
    $entry = "[{0}] {1}" -f (Get-Date -Format "HH:mm:ss"), $Action
    $script:sessionLog += $entry
}

function Show-SecurityWarning {
    Write-Host ""
    Show-Warn "RECORDATORIO IMPORTANTE DE SEGURIDAD"
    Write-Host "   El script usa la contraseña '" -NoNewline -ForegroundColor Gray
    Write-Host $script:dbPass -NoNewline -ForegroundColor White
    Write-Host "' por defecto." -ForegroundColor Gray
    Write-Host "   Si tu entorno tiene una diferente, la conexión fallará." -ForegroundColor Gray
    Write-Host "   Edita este script para cambiarla si es necesario." -ForegroundColor Gray
    Write-Host ""
}

# ============================================================================
#  FUNCIONES DE VALIDACION
# ============================================================================

function Validar-Usuario {
    param([string]$usuario)
    return $usuario -match "^[a-zA-Z][a-zA-Z0-9_]{2,29}$"
}

# ============================================================================
#  FUNCIONES DE DIAGNOSTICO
# ============================================================================

function Test-SystemHealth {
    Show-PanelTitle "DIAGNOSTICO DEL SISTEMA"
    Write-Host ""

    # Verificar sqlplus
    $sqlplusOk = $false
    if ($script:isDocker) {
        try {
            $check = docker exec $script:containerName which sqlplus 2>&1
            if ($LASTEXITCODE -eq 0) { $sqlplusOk = $true }
        } catch { }
    } else {
        try {
            $check = Get-Command sqlplus -ErrorAction SilentlyContinue
            if ($check) { $sqlplusOk = $true }
        } catch { }
    }

    if ($sqlplusOk) {
        Show-Success "SQL*Plus encontrado"
    } else {
        Show-Error "SQL*Plus no encontrado en el PATH"
    }

    # Verificar Docker si aplica
    if ($script:isDocker) {
        try {
            $dockerStatus = docker inspect -f '{{.State.Running}}' $script:containerName 2>&1
            if ($dockerStatus -eq "true") {
                Show-Success "Contenedor '$($script:containerName)' corriendo"
            } else {
                Show-Warn "Contenedor '$($script:containerName)' existe pero no esta corriendo"
            }
        } catch {
            Show-Error "No se encontro el contenedor '$($script:containerName)'"
        }
    }

    # Verificar conectividad Oracle
    Show-Spinner "Verificando conexion Oracle" 600
    $testSql = @"
SET HEADING OFF
SET FEEDBACK OFF
SELECT 'ORACLE_OK' FROM DUAL;
EXIT;
"@
    try {
        $result = ""
        if ($script:isDocker) {
            $result = $testSql | docker exec -i $script:containerName sqlplus -s $script:adminUser 2>&1
        } else {
            $result = $testSql | sqlplus -s $script:adminUser 2>&1
        }
        if ($result -match "ORACLE_OK") {
            Show-Success "Conexion a Oracle verificada"
        } else {
            Show-Warn "Respuesta inesperada de Oracle (puede requerir revisar credenciales)"
        }
    } catch {
        Show-Error "No se pudo conectar a Oracle: $($_.Exception.Message)"
    }

    # Info del sistema
    Write-Host ""
    Show-SubPanel "INFORMACION DEL ENTORNO"
    Write-Host ""
    Show-Info "SO: $([System.Environment]::OSVersion.VersionString)"
    Show-Info "PowerShell: $($PSVersionTable.PSVersion)"
    Show-Info "Servicio Oracle: $($script:serviceName)"
    Show-Info "Modo: $(if ($script:isDocker) { 'Docker' } else { 'Nativo' })"
    Show-Timer

    Log-Session "Diagnostico del sistema ejecutado"
    Pause-Lab
}

# ============================================================================
#  FUNCIONES SQL CORE
# ============================================================================

function Ejecutar-SQL {
    param (
        [string]$cadenaConexion,
        [string]$comandos
    )
    try {
        if ($script:isDocker) {
            $comandos | docker exec -i $script:containerName sqlplus -s $cadenaConexion
        } else {
            $comandos | sqlplus -s $cadenaConexion
        }
    } catch {
        Show-Error "Error ejecutando SQL: $($_.Exception.Message)"
    }
}

function Listar-Usuarios {
    Show-PanelTitle "USUARIOS / ESQUEMAS REGISTRADOS"
    Show-Spinner "Consultando base de datos" 500

    $sql = @"
SET HEADING OFF
SET FEEDBACK OFF
SET PAGESIZE 0
SET LINESIZE 200
SELECT '  >> ' || username
FROM all_users
WHERE oracle_maintained = 'N'
ORDER BY username;
EXIT;
"@

    Ejecutar-SQL $script:adminUser $sql
    Log-Session "Listado de usuarios consultado"
    Pause-Lab
}

function Crear-Usuario {
    Show-PanelTitle "CREAR NUEVO USUARIO / ESQUEMA"
    Write-Host ""

    $u = Read-Host "  >> Nombre del nuevo usuario"

    if (-not (Validar-Usuario $u)) {
        Show-Error "Nombre invalido. Usa letras, numeros o guion bajo. Debe empezar con letra (3-30 chars)."
        Pause-Lab
        return
    }

    $p = Read-Host "  >> Contrasena para $u"

    if ([string]::IsNullOrWhiteSpace($p)) {
        Show-Error "La contrasena no puede estar vacia."
        Pause-Lab
        return
    }

    Show-Spinner "Creando usuario y asignando permisos" 600

    $sql = @"
CREATE USER $u IDENTIFIED BY "$p";
GRANT CONNECT, RESOURCE TO $u;
ALTER USER $u QUOTA UNLIMITED ON USERS;
EXIT;
"@

    Ejecutar-SQL $script:adminUser $sql
    Show-Success "Usuario '$u' creado con permisos CONNECT, RESOURCE."
    Log-Session "Usuario creado: $u"
    Pause-Lab
}

function Eliminar-Usuario {
    Show-PanelTitle "ELIMINAR USUARIO / ESQUEMA"
    Write-Host ""
    Show-Warn "CUIDADO: Esto eliminara el usuario y TODOS sus objetos (tablas, datos, etc.)"
    Write-Host ""

    $u = Read-Host "  >> Usuario a eliminar"

    if ([string]::IsNullOrWhiteSpace($u)) {
        Show-Error "Nombre vacio."
        Pause-Lab
        return
    }

    Write-Host ""
    $confirm = Read-Host "  >> Escriba 'CONFIRMAR' para eliminar el usuario '$u'"

    if ($confirm -ne "CONFIRMAR") {
        Show-Info "Operacion cancelada."
        Pause-Lab
        return
    }

    Show-Spinner "Eliminando usuario $u" 500

    $sql = @"
DROP USER $u CASCADE;
EXIT;
"@

    Ejecutar-SQL $script:adminUser $sql
    Show-Success "Usuario '$u' eliminado con CASCADE."
    Log-Session "Usuario eliminado: $u"
    Pause-Lab
}

function Conectar-Usuario {
    Show-PanelTitle "TERMINAL SQL*PLUS INTERACTIVA"
    Write-Host ""

    $u = Read-Host "  >> Usuario"
    $p = Read-Host "  >> Contrasena"

    if ([string]::IsNullOrWhiteSpace($u) -or [string]::IsNullOrWhiteSpace($p)) {
        Show-Error "Usuario o contrasena vacios."
        Pause-Lab
        return
    }

    Write-Host ""
    Write-Host "  +--------------------------------------------------------------+" -ForegroundColor $c.Accent
    Write-Host "  |  ACCESO DIRECTO A SQL*PLUS                                   |" -ForegroundColor $c.Success
    Write-Host "  |  Escribe EXIT para volver al menu                            |" -ForegroundColor $c.Success
    Write-Host "  |  Tip: SET LINESIZE 200; SET PAGESIZE 50; para mejor formato  |" -ForegroundColor DarkCyan
    Write-Host "  +--------------------------------------------------------------+" -ForegroundColor $c.Accent
    Write-Host ""

    Log-Session "Sesion interactiva iniciada como: $u"

    try {
        if ($script:isDocker) {
            docker exec -it $script:containerName sqlplus "$u/$p@$($script:connStrBase)"
        } else {
            sqlplus "$u/$p@$($script:connStrBase)"
        }
    } catch {
        Show-Error "No se pudo abrir la sesion interactiva."
    }
}

# ============================================================================
#  FUNCIONES ACADEMICAS
# ============================================================================

function Describir-Tabla {
    Show-PanelTitle "DESCRIBIR TABLA (ESTRUCTURA)"
    Write-Host ""

    $u = Read-Host "  >> Usuario/esquema dueno de la tabla"
    $t = Read-Host "  >> Nombre de la tabla"

    if ([string]::IsNullOrWhiteSpace($u) -or [string]::IsNullOrWhiteSpace($t)) {
        Show-Error "Datos incompletos."
        Pause-Lab
        return
    }

    Show-Spinner "Obteniendo estructura" 400

    $sql = @"
SET LINESIZE 200
SET PAGESIZE 100
SET HEADING ON
SET FEEDBACK OFF
COLUMN column_name FORMAT A30
COLUMN data_type FORMAT A20
COLUMN nullable FORMAT A8
COLUMN data_length FORMAT 9999
COLUMN data_precision FORMAT 9999

SELECT
    column_name       AS "COLUMNA",
    data_type         AS "TIPO",
    data_length       AS "LARGO",
    data_precision    AS "PRECISION",
    CASE nullable WHEN 'Y' THEN 'SI' ELSE 'NO' END AS "NULO?"
FROM all_tab_columns
WHERE owner = UPPER('$u')
  AND table_name = UPPER('$t')
ORDER BY column_id;
EXIT;
"@

    Write-Host ""
    Ejecutar-SQL $script:adminUser $sql
    Log-Session "DESC de tabla: $u.$t"
    Pause-Lab
}

function Ejecutar-ArchivoSQL {
    Show-PanelTitle "EJECUTAR ARCHIVO .SQL"
    Write-Host ""
    Show-Info "Archivos .sql en el directorio actual:"
    Write-Host ""

    $sqlFiles = Get-ChildItem -Path "." -Filter "*.sql" -File | Sort-Object Name
    if ($sqlFiles.Count -eq 0) {
        Show-Warn "No se encontraron archivos .sql en el directorio actual."
        Pause-Lab
        return
    }

    $i = 1
    foreach ($file in $sqlFiles) {
        $sizeKB = [math]::Round($file.Length / 1KB, 1)
        Write-Host "  [$i] $($file.Name)" -NoNewline -ForegroundColor Cyan
        Write-Host " ($sizeKB KB)" -ForegroundColor DarkGray
        $i++
    }

    Write-Host ""
    $u = Read-Host "  >> Usuario con el que ejecutar"
    $p = Read-Host "  >> Contrasena"
    $sel = Read-Host "  >> Numero del archivo"

    $idx = [int]$sel - 1
    if ($idx -lt 0 -or $idx -ge $sqlFiles.Count) {
        Show-Error "Seleccion invalida."
        Pause-Lab
        return
    }

    $filePath = $sqlFiles[$idx].FullName
    $fileName = $sqlFiles[$idx].Name

    Show-Spinner "Ejecutando $fileName" 800

    $connStr = "$u/$p@$($script:connStrBase)"
    try {
        $content = Get-Content $filePath -Raw
        $sqlCmd = $content + "`nEXIT;`n"
        Ejecutar-SQL $connStr $sqlCmd
        Show-Success "Archivo '$fileName' ejecutado correctamente."
        Log-Session "Archivo SQL ejecutado: $fileName (como $u)"
    } catch {
        Show-Error "Error al ejecutar el archivo: $($_.Exception.Message)"
    }

    Pause-Lab
}

function Exportar-CSV {
    Show-PanelTitle "EXPORTAR CONSULTA A CSV"
    Write-Host ""
    Show-Info "Ejecuta un SELECT y guarda el resultado en CSV para abrir en Excel."
    Write-Host ""

    $u = Read-Host "  >> Usuario"
    $p = Read-Host "  >> Contrasena"
    Write-Host ""
    Show-Info "Escribe tu SELECT (una sola linea, sin punto y coma):"
    $query = Read-Host "  >> SQL"

    if ([string]::IsNullOrWhiteSpace($query)) {
        Show-Error "Consulta vacia."
        Pause-Lab
        return
    }

    $outFile = "export_$(Get-Date -Format 'yyyyMMdd_HHmmss').csv"

    Show-Spinner "Ejecutando consulta y exportando" 600

    $sql = @"
SET HEADING ON
SET FEEDBACK OFF
SET PAGESIZE 0
SET LINESIZE 2000
SET COLSEP ','
SET TRIMSPOOL ON
SET TRIMOUT ON
SPOOL $outFile
$query;
SPOOL OFF
EXIT;
"@

    $connStr = "$u/$p@$($script:connStrBase)"
    Ejecutar-SQL $connStr $sql

    if (Test-Path $outFile) {
        Show-Success "Exportado a: $outFile"
        Show-Info "Abrelo con Excel o cualquier editor de texto."
    } else {
        Show-Warn "El archivo no se creo. Verifica la consulta SQL."
    }

    Log-Session "Exportacion CSV: $outFile"
    Pause-Lab
}

function Mostrar-Historial {
    Show-PanelTitle "HISTORIAL DE SESION"
    Write-Host ""

    if ($script:sessionLog.Count -eq 0) {
        Show-Info "No hay acciones registradas en esta sesion."
    } else {
        $i = 1
        foreach ($entry in $script:sessionLog) {
            Write-Host "  $i. $entry" -ForegroundColor Gray
            $i++
        }
    }

    Write-Host ""
    Show-Timer
    Pause-Lab
}

function Listar-Tablas {
    Show-PanelTitle "LISTAR TABLAS DE UN ESQUEMA"
    Write-Host ""

    $u = Read-Host "  >> Usuario/esquema"

    if ([string]::IsNullOrWhiteSpace($u)) {
        Show-Error "Nombre vacio."
        Pause-Lab
        return
    }

    Show-Spinner "Consultando tablas de $u" 400

    $sql = @"
SET HEADING ON
SET FEEDBACK OFF
SET PAGESIZE 100
SET LINESIZE 200
COLUMN table_name FORMAT A40
COLUMN num_rows FORMAT 999999

SELECT
    t.table_name   AS "TABLA",
    t.num_rows     AS "FILAS (estimado)"
FROM all_tables t
WHERE t.owner = UPPER('$u')
ORDER BY t.table_name;
EXIT;
"@

    Write-Host ""
    Ejecutar-SQL $script:adminUser $sql
    Log-Session "Tablas listadas del esquema: $u"
    Pause-Lab
}

function Contar-Registros {
    Show-PanelTitle "CONTAR REGISTROS DE UNA TABLA"
    Write-Host ""

    $u = Read-Host "  >> Usuario/esquema"
    $t = Read-Host "  >> Nombre de la tabla"

    if ([string]::IsNullOrWhiteSpace($u) -or [string]::IsNullOrWhiteSpace($t)) {
        Show-Error "Datos incompletos."
        Pause-Lab
        return
    }

    Show-Spinner "Contando registros" 300

    $sql = @"
SET HEADING OFF
SET FEEDBACK OFF
SELECT '  >> Total de registros en $($t.ToUpper()): ' || COUNT(*) FROM $u.$t;
EXIT;
"@

    Ejecutar-SQL $script:adminUser $sql
    Log-Session "COUNT(*) en $u.$t"
    Pause-Lab
}

function Show-Cheatsheet {
    Show-PanelTitle "CHEATSHEET RAPIDO - ORACLE SQL"
    Write-Host ""

    $sections = @(
        @{
            Title = "SELECCION BASICA"
            Lines = @(
                "SELECT col1, col2 FROM tabla;"
                "SELECT * FROM tabla WHERE condicion;"
                "SELECT DISTINCT col FROM tabla;"
            )
        },
        @{
            Title = "JOINS"
            Lines = @(
                "SELECT ... FROM t1 JOIN t2 ON t1.id = t2.id;"
                "SELECT ... FROM t1 LEFT JOIN t2 ON t1.id = t2.id;"
                "-- INNER JOIN = solo coincidencias"
                "-- LEFT JOIN  = todo de la izquierda + coincidencias"
            )
        },
        @{
            Title = "FUNCIONES DE TEXTO"
            Lines = @(
                "UPPER('abc')        => 'ABC'"
                "LOWER('ABC')        => 'abc'"
                "SUBSTR('HELLO',1,3) => 'HEL'"
                "TRIM('  hola  ')    => 'hola'"
                "LENGTH('abc')       => 3"
                "|| (concatenar)     => 'A' || 'B' = 'AB'"
            )
        },
        @{
            Title = "FUNCIONES DE FECHA"
            Lines = @(
                "SYSDATE                           => fecha actual"
                "ADD_MONTHS(fecha, n)              => suma n meses"
                "MONTHS_BETWEEN(f1, f2)            => diferencia en meses"
                "EXTRACT(YEAR FROM fecha)          => extrae el anio"
                "TO_CHAR(fecha, 'DD/MM/YYYY')      => formato texto"
                "DATE '2026-03-31'                 => literal de fecha"
            )
        },
        @{
            Title = "FUNCIONES DE GRUPO"
            Lines = @(
                "COUNT(*), COUNT(col)  => contar filas"
                "SUM(col)              => sumar"
                "AVG(col)              => promedio"
                "MAX(col), MIN(col)    => mayor y menor"
                "GROUP BY col1, col2   => agrupar"
                "HAVING condicion      => filtrar grupos"
            )
        },
        @{
            Title = "CASE WHEN"
            Lines = @(
                "CASE"
                "  WHEN condicion1 THEN resultado1"
                "  WHEN condicion2 THEN resultado2"
                "  ELSE resultado_default"
                "END AS alias"
            )
        },
        @{
            Title = "NVL Y COALESCE"
            Lines = @(
                "NVL(col, valor_si_null)            => reemplaza NULL"
                "NVL2(col, si_no_null, si_null)     => condicional"
                "COALESCE(c1, c2, c3)               => primer no-null"
            )
        },
        @{
            Title = "ORDENAMIENTO"
            Lines = @(
                "ORDER BY col ASC       => ascendente (default)"
                "ORDER BY col DESC      => descendente"
                "ORDER BY col1, col2    => multiples columnas"
            )
        },
        @{
            Title = "DDL RAPIDO (para el lab)"
            Lines = @(
                "CREATE TABLE t (col1 TYPE, col2 TYPE, ...);"
                "ALTER TABLE t ADD col TYPE;"
                "DROP TABLE t CASCADE CONSTRAINTS;"
                "INSERT INTO t (c1,c2) VALUES (v1,v2);"
                "INSERT INTO t SELECT ... FROM ...;"
            )
        },
        @{
            Title = "TIPS DE FORMATO EN SQL*PLUS"
            Lines = @(
                "SET LINESIZE 200;     => ancho de linea"
                "SET PAGESIZE 50;      => filas por pagina"
                "COLUMN col FORMAT A20; => ancho de columna texto"
                "COLUMN col FORMAT 9999; => formato numerico"
            )
        }
    )

    foreach ($section in $sections) {
        Show-SubPanel $section.Title
        foreach ($line in $section.Lines) {
            Write-Host "      $line" -ForegroundColor Gray
        }
    }

    Write-Host ""
    Log-Session "Cheatsheet consultado"
    Pause-Lab
}

# ============================================================================
#  ACCESO RAPIDO A LA PRUEBA
# ============================================================================

function AccesoRapido-Prueba {
    $evalUser = "user_evaluacion1"
    $evalPass = "123456"
    $scriptFile = "Prueba_Parcial_1_MOTO_RENT.sql"
    $scriptPath = Join-Path $PSScriptRoot $scriptFile

    Show-PanelTitle "ACCESO RAPIDO A LA PRUEBA"
    Write-Host ""
    Write-Host " ▶ MOTO RENT CHILE LTDA. - Evaluación Parcial N.1" -ForegroundColor Cyan
    Write-Host ""

    # --- Verificar que el archivo .sql existe ---
    if (-not (Test-Path $scriptPath)) {
        Show-Error "No se encontro el archivo '$scriptFile' en el directorio actual."
        Show-Info "Asegurate de que el script este junto a ConfigurarOracle.ps1"
        Pause-Lab
        return
    }
    Show-Success "Script '$scriptFile' localizado."

    # --- Verificar si el usuario ya existe ---
    $checkSql = @"
SET HEADING OFF
SET FEEDBACK OFF
SET PAGESIZE 0
SELECT username FROM all_users WHERE username = UPPER('$evalUser');
EXIT;
"@

    Show-Spinner "Verificando si el usuario '$evalUser' existe" 500
    $existResult = ""
    try {
        if ($script:isDocker) {
            $existResult = $checkSql | docker exec -i $script:containerName sqlplus -s $script:adminUser 2>&1
        } else {
            $existResult = $checkSql | sqlplus -s $script:adminUser 2>&1
        }
    } catch { }

    $userExists = $existResult -match "(?i)$evalUser"

    if ($userExists) {
        # --- Usuario ya existe ---
        Show-Success "El usuario '$evalUser' ya existe."
        Write-Host ""
        Write-Host "  +--------------------------------------------------------------+" -ForegroundColor DarkCyan
        Write-Host "  |  El usuario ya esta configurado. Elige una opcion:           |" -ForegroundColor Gray
        Write-Host "  +--------------------------------------------------------------+" -ForegroundColor DarkCyan
        Write-Host ""
        Write-Host "  [1] " -NoNewline -ForegroundColor $c.Accent
        Write-Host "Conectar directamente a SQL*Plus" -ForegroundColor $c.Neon
        Write-Host "  [2] " -NoNewline -ForegroundColor $c.Accent
        Write-Host "Reiniciar BD " -NoNewline -ForegroundColor $c.Warn
        Write-Host "(DROP + re-ejecutar script completo)" -ForegroundColor $c.Dim
        Write-Host "  [0] " -NoNewline -ForegroundColor $c.Accent
        Write-Host "Volver al menu" -ForegroundColor $c.Info
        Write-Host ""

        $subChoice = Read-Host "  >> Opcion"

        switch ($subChoice) {
            "1" {
                # Solo conectar
                Write-Host ""
                Show-Spinner "Conectando a SQL*Plus como $evalUser" 400
                Write-Host ""
                Write-Host "  +--------------------------------------------------------------+" -ForegroundColor $c.Accent
                Write-Host "  |  SESION SQL*PLUS  |  USUARIO: $($evalUser.PadRight(29))|" -ForegroundColor $c.Success
                Write-Host "  |  Escribe EXIT para volver al menu                            |" -ForegroundColor $c.Success
                Write-Host "  +--------------------------------------------------------------+" -ForegroundColor $c.Accent
                Write-Host ""

                Log-Session "Acceso rapido: conexion directa como $evalUser"

                try {
                    if ($script:isDocker) {
                        docker exec -it $script:containerName sqlplus "$evalUser/$evalPass@$($script:connStrBase)"
                    } else {
                        sqlplus "$evalUser/$evalPass@$($script:connStrBase)"
                    }
                } catch {
                    Show-Error "No se pudo abrir la sesion interactiva."
                    Pause-Lab
                }
                return
            }
            "2" {
                # Reiniciar: DROP y recrear
                Write-Host ""
                Show-Warn "Esto eliminara TODOS los objetos del usuario '$evalUser' y volvera a cargar el script."
                $confirm = Read-Host "  >> Escribe 'REINICIAR' para confirmar"

                if ($confirm -ne "REINICIAR") {
                    Show-Info "Operacion cancelada."
                    Pause-Lab
                    return
                }

                Show-Spinner "Eliminando usuario $evalUser" 500
                $dropSql = @"
DROP USER $evalUser CASCADE;
EXIT;
"@
                Ejecutar-SQL $script:adminUser $dropSql
                Show-Success "Usuario '$evalUser' eliminado."
                Log-Session "Acceso rapido: usuario $evalUser eliminado para reinicio"
                # Continua abajo para recrear...
            }
            default {
                return
            }
        }
    }

    # --- Crear usuario ---
    Write-Host ""
    Show-Spinner "Creando usuario '$evalUser'" 600

    $createSql = @"
    ALTER SESSION SET "_ORACLE_SCRIPT"=true;
CREATE USER $evalUser IDENTIFIED BY "$evalPass";
GRANT CONNECT, RESOURCE TO $evalUser;
ALTER USER $evalUser QUOTA UNLIMITED ON USERS;
EXIT;
"@

    $createResult = Ejecutar-SQL $script:adminUser $createSql
    if ($createResult -match "ORA-") {
        Show-Error "Error al crear el usuario. Revisa la salida:"
        Write-Host $createResult -ForegroundColor Red
        Pause-Lab
        return
    }
    Show-Success "Usuario '$evalUser' creado con permisos CONNECT, RESOURCE."
    Log-Session "Acceso rapido: usuario $evalUser creado"

    # --- Ejecutar script de la BD ---
    Write-Host ""
    Show-Spinner "Cargando base de datos MOTO RENT ($scriptFile)" 1200

    $connStr = "$evalUser/$evalPass@$($script:connStrBase)"
    try {
        $content = Get-Content $scriptPath -Raw
        $sqlCmd = $content + "`nEXIT;`n"
        $loadResult = Ejecutar-SQL $connStr $sqlCmd

        # Verificar si hubo errores graves
        if ($loadResult -match "ORA-00955|already exists") {
            Show-Warn "Algunas tablas ya existian (se ignoraron). El script puede requerir un reinicio limpio."
        }
        Show-Success "Base de datos MOTO RENT cargada exitosamente."
        Log-Session "Acceso rapido: script $scriptFile ejecutado"
    } catch {
        Show-Error "Error al ejecutar el script: $($_.Exception.Message)"
        Pause-Lab
        return
    }

    # --- Verificar tablas creadas ---
    Write-Host ""
    Show-Spinner "Verificando tablas creadas" 400

    $verifySql = @"
SET HEADING ON
SET FEEDBACK ON
SET PAGESIZE 50
SET LINESIZE 120
COLUMN table_name FORMAT A35
SELECT table_name FROM user_tables ORDER BY table_name;
EXIT;
"@

    Write-Host ""
    Show-SubPanel "TABLAS CARGADAS EN $($evalUser.ToUpper())"
    Write-Host ""
    Ejecutar-SQL $connStr $verifySql

    # --- Lanzar SQL*Plus interactivo ---
    Write-Host ""
    Write-Host "  +--------------------------------------------------------------+" -ForegroundColor $c.Accent
    Write-Host "  |  TODO LISTO - Entrando a SQL*Plus como $($evalUser.PadRight(22))|" -ForegroundColor $c.Success
    Write-Host "  |  Escribe EXIT para volver al menu                            |" -ForegroundColor $c.Success
    Write-Host "  |                                                              |" -ForegroundColor DarkCyan
    Write-Host "  |  TIP: SELECT table_name FROM user_tables;                    |" -ForegroundColor DarkCyan
    Write-Host "  +--------------------------------------------------------------+" -ForegroundColor $c.Accent
    Write-Host ""

    Log-Session "Acceso rapido: sesion interactiva iniciada como $evalUser"

    try {
        if ($script:isDocker) {
            docker exec -it $script:containerName sqlplus "$evalUser/$evalPass@$($script:connStrBase)"
        } else {
            sqlplus "$evalUser/$evalPass@$($script:connStrBase)"
        }
    } catch {
        Show-Error "No se pudo abrir la sesion interactiva."
        Pause-Lab
    }
}

# ============================================================================
#  MENU PRINCIPAL
# ============================================================================

function Show-Menu {
    Show-PanelTitle "MENU PRINCIPAL"
    Write-Host ""

    $options = @(
        @{ Key = "1"; Label = "Listar usuarios / esquemas";   Icon = ">" }
        @{ Key = "2"; Label = "Crear usuario";                Icon = "+" }
        @{ Key = "3"; Label = "Eliminar usuario";             Icon = "-" }
        @{ Key = "4"; Label = "Conectarse a SQL*Plus";        Icon = "#" }
        @{ Key = ""; Label = ""; Icon = "" }
        @{ Key = "5"; Label = "Listar tablas de un esquema";  Icon = "T" }
        @{ Key = "6"; Label = "Describir tabla (estructura)"; Icon = "D" }
        @{ Key = "7"; Label = "Contar registros de tabla";    Icon = "N" }
        @{ Key = ""; Label = ""; Icon = "" }
        @{ Key = "8"; Label = "Ejecutar archivo .sql";        Icon = "@" }
        @{ Key = "9"; Label = "Exportar consulta a CSV";      Icon = "E" }
        @{ Key = ""; Label = ""; Icon = "" }
        @{ Key = "C"; Label = "Cheatsheet Oracle SQL";        Icon = "?" }
        @{ Key = "H"; Label = "Diagnostico del sistema";      Icon = "!" }
        @{ Key = "L"; Label = "Ver historial de sesion";      Icon = "~" }
        @{ Key = ""; Label = ""; Icon = "" }
        @{ Key = "P"; Label = "ACCESO RAPIDO A LA PRUEBA";    Icon = "*" }
        @{ Key = ""; Label = ""; Icon = "" }
        @{ Key = "0"; Label = "Salir";                        Icon = "X" }
    )

    foreach ($opt in $options) {
        if ($opt.Key -eq "") {
            Write-Host ""
        } else {
            Write-Host "  [$($opt.Icon)] " -NoNewline -ForegroundColor $c.Accent
            Write-Host "($($opt.Key)) " -NoNewline -ForegroundColor $c.Neon
            Write-Host $opt.Label -ForegroundColor $c.Info
        }
    }

    Write-Host ""
}

# ============================================================================
#  INICIO - SELECCION DE ENTORNO
# ============================================================================

Show-Banner

Show-PanelTitle "SELECCION DE ENTORNO"
Write-Host ""
Write-Host "  [1] " -NoNewline -ForegroundColor $c.Accent
Write-Host "Mi PC Personal " -NoNewline -ForegroundColor $c.Neon
Write-Host "(Docker + Oracle 23c Free)" -ForegroundColor $c.Dim
Write-Host "  [2] " -NoNewline -ForegroundColor $c.Accent
Write-Host "PC del DUOC " -NoNewline -ForegroundColor $c.Neon
Write-Host "(Oracle nativo / ORCL)" -ForegroundColor $c.Dim
Write-Host ""

$opcion = Read-Host "  >> Opcion"

switch ($opcion) {
    "1" {
        $script:serviceName = "FREEPDB1"
        $script:connStrBase = "//localhost:1521/$($script:serviceName)"
        $script:adminUser = "system/$($script:dbPass)@$($script:connStrBase)"
        $script:isDocker = $true
        Show-Success "Modo Docker activo | Contenedor: $($script:containerName)"
    }
    "2" {
        $script:serviceName = "ORCL"
        $script:connStrBase = "//localhost:1521/$($script:serviceName)"
        $script:adminUser = "sys/$($script:dbPass)@$($script:connStrBase) as sysdba"
        $script:isDocker = $false
        Show-Success "Modo nativo activo | Servicio: ORCL"
    }
    default {
        Show-Error "Opcion invalida. Saliendo..."
        exit
    }
}

Show-SecurityWarning
Log-Session "Entorno seleccionado: $(if ($script:isDocker) { 'Docker' } else { 'Nativo' })"

# ============================================================================
#  LOOP PRINCIPAL
# ============================================================================

do {
    Clear-Host
    Show-Banner

    $envLabel = if ($script:isDocker) { "Docker ($($script:containerName))" } else { "Nativo (DUOC)" }
    $elapsed = (Get-Date) - $script:sessionStart
    $timerStr = "{0:D2}:{1:D2}:{2:D2}" -f [int]$elapsed.TotalHours, $elapsed.Minutes, $elapsed.Seconds
    Write-Host " --------------------------------------------------------------------------------" -ForegroundColor DarkGray
    Write-Host "   SVC: $($script:serviceName)  |  ENV: $envLabel  |  T: $timerStr" -ForegroundColor Cyan
    Write-Host " --------------------------------------------------------------------------------" -ForegroundColor DarkGray

    Show-Menu
    $accion = Read-Host "  >> Elige una opcion"

    switch ($accion) {
        "1" { Listar-Usuarios }
        "2" { Crear-Usuario }
        "3" { Eliminar-Usuario }
        "4" { Conectar-Usuario }
        "5" { Listar-Tablas }
        "6" { Describir-Tabla }
        "7" { Contar-Registros }
        "8" { Ejecutar-ArchivoSQL }
        "9" { Exportar-CSV }
        "C" { Show-Cheatsheet }
        "c" { Show-Cheatsheet }
        "H" { Test-SystemHealth }
        "h" { Test-SystemHealth }
        "L" { Mostrar-Historial }
        "l" { Mostrar-Historial }
        "P" { AccesoRapido-Prueba }
        "p" { AccesoRapido-Prueba }
        "0" {
            Show-PanelTitle "FIN DE SESION"
            Write-Host ""
            Show-Info "Acciones realizadas: $($script:sessionLog.Count)"
            Write-Host ""
            Show-Success "Sesión cerrada. Hasta la próxima."
        }
        default {
            Show-Error "Opcion invalida."
            Pause-Lab
        }
    }

} while ($accion -ne "0")

# --- Firma final ---
Write-Host ""
Write-Host "================================================================================" -ForegroundColor DarkGray
Write-Host "  Oracle Interactive Toolbox $($script:version)" -ForegroundColor Cyan
Write-Host "  Autor: hachimaki-dev | Duoc UC Puerto Montt" -ForegroundColor DarkGray
Write-Host "================================================================================" -ForegroundColor DarkGray
Write-Host ""