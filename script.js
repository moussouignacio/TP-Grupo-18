function validarFormulario() {
    var nombre = document.getElementById("nombre").value;
    var correo = document.getElementById("correo").value;
    var telefono = document.getElementById("telefono").value;
    var hooray = "El formulario ha sido enviado correctamente"
  
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
    
    return alert(hooray)
}
// modifica el menu de reserva al hacer click 


function reserva(){
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
  // incremento o decremento los valores 
  btnMas.onclick = function(){
    if (valor < 10){
      valor++
      contador.innerHTML = valor
    }
    else {
      alert("Para reservas de más de 10 personas ponerse en contacto directamente con nosotros via Email o por teléfono.")
    }
  }
  
  btnMenos.onclick = function(){
    if (valor > 1){
      valor--
      contador.innerHTML = valor
    }
  }


}




