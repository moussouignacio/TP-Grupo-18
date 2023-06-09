function validarFormulario() {
  var nombre = document.getElementById("nombre").value;
  var correo = document.getElementById("correo").value;
  var telefono = document.getElementById("telefono").value;

  // Validar que los campos no estén vacíos
  if (nombre === "" || correo === "" || telefono === "") {
    alert("Por favor, completa todos los campos");
    return false;
  }

  // Validar formato de correo electrónico
  var correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correoValido.test(correo)) {
    alert("Por favor, ingresa un correo electrónico válido");
    return false;
  }

  // Validar formato de número de teléfono
  var telefonoValido = /^\d{10}$/;
  if (!telefonoValido.test(telefono)) {
    alert("Por favor, ingresa un número de teléfono válido de 10 dígitos");
    return false;
  }
}

const $form = document.querySelector("#form")

$form.addEventListener("submit", handleSubmit) 

async function handleSubmit(event) {
  event.preventDefault()
  const form = new FormData(this)
  const response = await fetch(this.action, {
    method: this.method,
    body: form,
    headers: {
      "Accept": "application/json"
    }
  })
 
  if (response.ok) {
    this.reset()
    alert("Gracias por suscribirte a nuestras noticias.")
  }
}

const URL = "http://127.0.0.1:5000"

fetch(URL + "/reservas")
  .then(function(response){
    if (response.ok){
        return response.json();
    } else {
      throw new Error("Error al obtener las reservas")
    }
  })
  .then(function (data){
    data.forEach(function (reserva) {
      console.log(reserva.id)
      console.log(reserva.nombre)
      console.log(reserva.fecha_reserva)
      console.log(reserva.hora_reserva)
    })
  })
  

  // modifica el menu de reserva al hacer click 

  function reserva() {
    // declaro los botones 

    const btn = document.querySelector(".btn-reservas")
    btn.innerHTML = "Cuántos comensales vendran?"
    btn.className = "btn-reservas1"

    const btnMas = document.querySelector(".txt1-reservas")
    btnMas.innerHTML = "+"
    btnMas.className = "btn-mas"

    const btnMenos = document.createElement("button")
    const txt = document.createTextNode("-")
    btnMenos.appendChild(txt)
    btnMenos.className = "btn-menos"
    document.getElementById("recuadro-reservas").appendChild(btnMenos)

    var valor = 1
    const contador = document.createElement("span")
    contador.innerHTML = "1"
    contador.className = "contador"
    document.getElementById("recuadro-reservas").appendChild(contador)

    const siguiente = document.createElement("button")
    const siguiente1 = document.createTextNode("Siguiente")
    siguiente.appendChild(siguiente1)
    siguiente.className = "btn-siguiente"
    document.getElementById("recuadro-reservas").appendChild(siguiente)

    // incremento o decremento los valores 
    btnMas.onclick = function () {
      if (valor < 10) {
        valor++
        contador.innerHTML = valor
      }
      else {
        alert("Para reservas de más de 10 personas ponerse en contacto directamente con nosotros via Email o por teléfono.")
      }
    }

    btnMenos.onclick = function () {
      if (valor > 1) {
        valor--
        contador.innerHTML = valor
      }
    }
    // clickear en siguiente y definir la fecha 
    siguiente.onclick = function () {
      contador.remove()
      btn.remove()
      btnMas.remove()
      btnMenos.remove()
      siguiente.remove()

      const form = document.createElement("form")
      form.setAttribute("action", "")
      form.className = "form"

      const label = document.createElement("label")
      label.innerHTML = "Ingrese la fecha deseada"
      label.className = "etiqueta"

      const siguiente2 = document.createElement("submit")
      const siguiente3 = document.createTextNode("Siguiente")
      siguiente2.className = "btn-siguiente1"
      siguiente2.appendChild(siguiente3)
      siguiente2.setAttribute("type", "submit")
      siguiente2.setAttribute("value", "submit")

      const fecha = document.createElement("input")
      fecha.setAttribute("type", "datetime-local")
      fecha.className = "input-fecha"

      document.getElementById("recuadro-reservas").appendChild(siguiente2)
      document.getElementById("recuadro-reservas").appendChild(form)
      document.getElementById("recuadro-reservas").appendChild(label)
      document.getElementById("recuadro-reservas").appendChild(fecha)

      // const fechaReserva = fecha.value

      

      siguiente2.onclick = function () {
        label.remove()
        fecha.remove()
        siguiente2.remove()

        const label1 = document.createElement("label")
        label1.innerHTML = "Ingrese su nombre"
        label1.className = "etiqueta"

        const siguiente4 = document.createElement("submit")
        const siguiente5 = document.createTextNode("Siguiente")
        siguiente4.className = "btn-siguiente1"
        siguiente4.appendChild(siguiente5)
        siguiente4.setAttribute("type", "submit")
        siguiente4.setAttribute("value", "submit")

        const nombre = document.createElement("input")
        nombre.setAttribute("type", "text")
        nombre.className = "input-nombre"

        // const nombreReserva = nombre.value

        document.getElementById("recuadro-reservas").appendChild(siguiente4)
        // document.getElementById("recuadro-reservas").appendChild(form)
        document.getElementById("recuadro-reservas").appendChild(label1)
        document.getElementById("recuadro-reservas").appendChild(nombre)

        var dateTimeValue = fecha.value
        var dateTime = new Date(dateTimeValue)
        var fechaFinal = dateTime.toLocaleDateString()
        var horaFinal = dateTime.toLocaleTimeString()

        siguiente4.onclick = agregarReserva;

        function agregarReserva(event) {
          event.preventDefault();

          var reserva = {
            nombre: nombre.value,
            fecha_reserva: fechaFinal,
            hora_reserva: horaFinal,
            capacidad: valor
          }
          console.log(reserva)

          var URL = "http://127.0.0.1:5000/"
          fetch(URL + "reservas", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(reserva)
          })

            .then(function (response) {
              if (response.ok) {
                // alert(`Se ha creado una reserva a nombre ${reserva[nombre]} para el día ${reserva.fecha_reserva}`)
                return response.json();
              } else {
                // alert("Se ha producido un error al agregar la reserva")
                // location.reload()
                throw new Error("Error al agregar la reserva")
              }
            })
            .then(function (data) {
              alert(`Se ha creado una reserva a nombre ${reserva[nombre]} para el día ${reserva.fecha_reserva}`)
            })
        }
      }
    }

  }


