// Scroll in menu 
window.addEventListener('scroll', function(){
    const header = document.querySelector('header');
    header.classList.toggle("sticky", window.scrollY > 0);
});

function toggleMenu(){
    const menuToggle = document.querySelector('.menuToggle');
    const navigation = document.querySelector('.navigation');
    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');
}


// Validation form
const form = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario, inputs');

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    mensaje: /^[A-Za-z0-9.\s]{5,1000}$/
}

const campos = {
    user: false,
    email: false,
    message: false
}

const validateForm = (e) => {

    switch (e.target.name) {
        case "user":
            validarCampo(expresiones.nombre, e.target, e.target.name);
        break;
        case "email":
            validarCampo(expresiones.correo, e.target, e.target.name);
        break;
        case "message":
            validarCampo(expresiones.mensaje, e.target, e.target.name);
        break;
    }

}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.getElementById(`group_${campo}`).classList.remove('inputBox-incorrect');
        document.getElementById(`group_${campo}`).classList.add('inputBox-correct');
        document.querySelector(`#group_${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#group_${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#groupi_${campo} .formInputError`).classList.remove('formInputError-active');
        campos[campo] = true;
    } else {
        document.getElementById(`group_${campo}`).classList.remove('inputBox-correct');
        if (input.value !== '') {
            document.getElementById(`group_${campo}`).classList.add('inputBox-incorrect');
            document.querySelector(`#group_${campo} i`).classList.add('fa-times-circle');
            document.querySelector(`#groupi_${campo} .formInputError`).classList.add('formInputError-active');
        } else {
          document.getElementById(`group_${campo}`).classList.remove('inputBox-incorrect');
          document.querySelector(`#group_${campo} i`).classList.remove('fa-times-circle');
          document.querySelector(`#groupi_${campo} .formInputError`).classList.remove('formInputError-active');  
        }
        document.querySelector(`#group_${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#group_${campo} i`).classList.remove('fa-check-circle');
        campos[campo] = false;

    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();//no hace nada al dar al boton enviar

    if(campos.user && campos.email && campos.message) {
        formulario.reset();


        // REVISAR
        document.getElementById('formMessageSucces').classList.add('formMessageSucces-active');
        setTimeout( () => {
            document.getElementById('formMessageSucces').classList.remove('formMessageSucces-active');
        }, 5000 );

        document.querySelectorAll('.inputBox-correct').forEach( (icono) => {
            icono.classList.remove('inputBox-correct');
        }); 
        ///////////////////////////////////

        document.getElementById('formMessageError').classList.remove('formMessageError-active');

    } else {
        document.getElementById('formMessageError').classList.add('formMessageError-active');
    }

});