import sqlite3
from datetime import datetime
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# @app.route("/")
# def index():
#     return render_template('index.html')

# Conexión a la base de datos
def conectar_bd():
    conn = sqlite3.connect('restaurante.db')  # Nombre de la base de datos
    return conn

# Cierre de la conexión a la base de datos
def cerrar_bd(conn):
    conn.close()

# Crear la tabla de reservas (si no existe)
def crear_tabla_reservas():
    conn = conectar_bd()
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
    cursor.close()
    conn.close()

# Agregar una reserva
@app.route("/reservas", methods=["POST"])
def agregar_reserva(nombre, fecha_reserva, hora_reserva, capacidad):
    data = request.get_json()
    if "nombre" not in data or "fecha_reserva" not in data or "hora_reserva" not in data or "capacidad" not in data:
        return jsonify({"Error: Falta uno o más campos requeridos"}), 400
    try:
        if fecha_reserva_valida(fecha_reserva, hora_reserva):
            conn = conectar_bd()
            cursor = conn.cursor()
            cursor.execute('INSERT INTO reservas (nombre, fecha_reserva, hora_reserva, capacidad) VALUES (?, ?, ?, ?)', (data[nombre], data[fecha_reserva], data[hora_reserva], data[capacidad]))
            conn.commit()
            cursor.close()
            conn.close()
            return jsonify({"Reserva agregada correctamente"}), 201
        else:
            print("La fecha y la hora de la reserva no son válidas, intente nuevamente")
    except:
        return jsonify({"Error al dar de alta el producto"}), 500

# Eliminar una reserva por su ID
def eliminar_reserva(reserva_id):
    conn = conectar_bd()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM reservas WHERE id = ?', (reserva_id,))
    conn.commit()
    cursor.close()
    conn.close()
    print('Reserva eliminada exitosamente.')

# Modificar una reserva por su ID
def modificar_reserva(reserva_id, nombre, fecha_reserva, hora_reserva, capacidad):
    conn = conectar_bd()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE reservas
        SET nombre = ?, fecha_reserva = ?, hora_reserva = ?, capacidad = ?
        WHERE id = ?
    ''', (nombre, fecha_reserva, hora_reserva, capacidad, reserva_id))
    conn.commit()
    cursor.close()
    conn.close()
    print('Reserva modificada exitosamente.')

# Consultar la tabla de reservas
@app.route("/reservas", methods=["GET"])
def consultar_tabla():
    try:
        conn = conectar_bd()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM reservas')
        reservas = cursor.fetchall()
        # print('ID\tNombre\tFecha\tHora\tCapacidad')
        # for reserva in reservas:
        #     print('{}\t{}\t{}\t{}\t{}'.format(reserva[0], reserva[1], reserva[2], reserva[3], reserva[4]))
        cursor.close()
        conn.close()
        respuesta = []
        for reserva in reservas:
            respuesta.append({
                "id": reserva[0],
                "nombre": reserva[1],
                "fecha_reserva": reserva[2],
                "hora_reserva": reserva[3],
                "capacidad": reserva[4]
            })
        return jsonify(respuesta)
    except:
        return jsonify("Error al listar los productos")
    
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

# agregar_reserva("Pepe", "2023-06-29", "19:45", 3)
# agregar_reserva("Mario", "2023-06-30", "20:00", 5)
# agregar_reserva("Loana", "2023-06-30", "20:30", 2)

@app.route("/", methods=["GET"])
def inicio():
    return("Hola Codo a Codo API")

if __name__ == "__main__":
    crear_tabla_reservas()
    app.run()

