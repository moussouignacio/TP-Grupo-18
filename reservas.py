import sqlite3
from datetime import datetime

# Conexión a la base de datos
def conectar_bd():
    conn = sqlite3.connect('restaurante.db')  # Nombre de la base de datos
    return conn

# Cierre de la conexión a la base de datos
def cerrar_bd(conn):
    conn.close()

# Crear la tabla de reservas (si no existe)
def crear_tabla_reservas(conn):
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS reservas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT,
            fecha_reserva TEXT,
            hora_reserva TEXT,
            capacidad INTEGER
        )
    ''')
    conn.commit()

# Agregar una reserva
def agregar_reserva(conn, nombre, fecha_reserva, hora_reserva, capacidad):
    if fecha_reserva_valida(fecha_reserva, hora_reserva):
        cursor = conn.cursor()
        cursor.execute('INSERT INTO reservas (nombre, fecha_reserva, hora_reserva, capacidad) VALUES (?, ?, ?, ?)', (nombre, fecha_reserva, hora_reserva, capacidad))
        conn.commit()
        print('Reserva agregada exitosamente.')
    else:
        print("La fecha y la hora de la reserva no son válidas, intente nuevamente")

# Eliminar una reserva por su ID
def eliminar_reserva(conn, reserva_id):
    cursor = conn.cursor()
    cursor.execute('DELETE FROM reservas WHERE id = ?', (reserva_id,))
    conn.commit()
    print('Reserva eliminada exitosamente.')

# Modificar una reserva por su ID
def modificar_reserva(conn, reserva_id, nombre, fecha_reserva, hora_reserva, capacidad):
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE reservas
        SET nombre = ?, fecha_reserva = ?, hora_reserva = ?, capacidad = ?
        WHERE id = ?
    ''', (nombre, fecha_reserva, hora_reserva, capacidad, reserva_id))
    conn.commit()
    print('Reserva modificada exitosamente.')

# Consultar la tabla de reservas
def consultar_tabla(conn):
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM reservas')
    reservas = cursor.fetchall()
    print('ID\tNombre\tFecha\tHora\tCapacidad')
    for reserva in reservas:
        print('{}\t{}\t{}\t{}\t{}'.format(reserva[0], reserva[1], reserva[2], reserva[3], reserva[4]))

# Verificar si una fecha de reserva es válida
def fecha_reserva_valida(fecha_reserva, hora_reserva):
    ahora = datetime.now()
    fecha_hora_reserva = datetime.strptime(fecha_reserva + ' ' + hora_reserva, '%Y-%m-%d %H:%M')
    if fecha_hora_reserva < ahora:
        return False
    # Resto de la lógica para verificar si hay disponibilidad y si la hora está dentro del horario dispuesto
    return True

# if fecha_reserva_valida("2021-06-30", "18:00") == True:
#     agregar_reserva(conn, "Juan", "2021-06-30", "18:00", 4)






# Ejemplo de uso
conn = conectar_bd()
# crear_tabla_reservas(conn)
consultar_tabla(conn)
agregar_reserva(conn,"Juan", "2023-06-30", "18:00", 4)
# eliminar_reserva(conn, 1)
consultar_tabla(conn)
cerrar_bd(conn)

