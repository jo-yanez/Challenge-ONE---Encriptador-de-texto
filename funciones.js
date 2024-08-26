const advertencia = document.getElementById("advertencia_inicial");
const botonEncriptar = document.getElementById("boton_encriptar");
const botonDesencriptar = document.getElementById("boton_desencriptar");
const cajaTextoRespuesta = document.getElementById("caja_texto_respuesta");
const imagen = document.getElementById("imagen");
const cajaMensajeNoEncontrado = document.getElementById("advertencia_respuesta");
const cajaBotonCopiar = document.getElementById("div_boton_copiar");
const botonCopiar = document.getElementById("boton_copiar");


function hayTextoVacio(text){
	return text.trim() === "";
}


function comprobarRestriccionTexto(mensaje){
	const restricciones = [
        { regex: /[À-ÖØ-öø-ÿ]/, mensaje: "No ingrese acentos\n" },
        { regex: /[A-ZÁ-Ý]/, mensaje: "No ingrese letras mayúsculas\n" },
        { regex: /[`¡!@#$%^&*()_+\-=\[\]{};'¨:"\\|,.<>\/¿?~]/, mensaje: "No ingrese carácteres especiales\n" },
        { regex: /\s{2,}/, mensaje: "Ingrese solo un espacio entre palabras\n" }
    ];

    let hayError = false;
    restricciones.forEach(restriccion => {
        if (restriccion.regex.test(mensaje.texto)) {
            hayError = true;
            mensaje.warnings += restriccion.mensaje;
        }
    });

    if (hayError) {
        mensaje.esValido = false;
    }

    return mensaje;
}


function encriptar(mensaje){
	const reemplazos = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    mensaje.texto = mensaje.texto.replace(/[eioua]/g, match => reemplazos[match]);
    return mensaje;
}


function desencriptar(mensaje){
	const reemplazos = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };

    mensaje.texto = mensaje.texto.replace(/enter|imes|ai|ober|ufat/g, match => reemplazos[match]);
	return mensaje;
}


function funcionEncriptacion(event) {
    const mensaje = {
        texto: document.getElementById('caja_texto').value,
        esValido: true,
        warnings: ""
    };
    
    if (hayTextoVacio(mensaje.texto)) {
        mostrarAdvertencia("El texto está vacío");
        return;
    }

    comprobarRestriccionTexto(mensaje);

    if (!mensaje.esValido) {
        mostrarAdvertencia(mensaje.warnings);
        return;
    }

    if (event.target.id === 'boton_encriptar') {
        encriptar(mensaje);
    } else if (event.target.id === 'boton_desencriptar') {
        desencriptar(mensaje);
    }

    document.getElementById('caja_texto_respuesta').value = mensaje.texto;
    actualizarInterfaz();
    cajaBotonCopiar.style.display = "flex";
    advertencia.textContent = "Sólo letras minúsculas y sin acentos";
    document.getElementById("div_caja_advertencia").classList.remove("caja_error");
}


function mostrarAdvertencia(mensaje) {
    console.warn(mensaje);
    advertencia.textContent = mensaje;
    document.getElementById("div_caja_advertencia").classList.add("caja_error");
    document.getElementById("caja_texto").focus();
    imagen.style.display = "block";
    cajaMensajeNoEncontrado.style.display = "block";
    cajaTextoRespuesta.style.display = "none";
    cajaBotonCopiar.style.display = "none";
}


function actualizarInterfaz() {
    imagen.style.display = "none";
    cajaMensajeNoEncontrado.style.display = "none";
    cajaTextoRespuesta.style.display = "block";
}


function funcionCopiar(e) {
    e.preventDefault();

    const texto = cajaTextoRespuesta.value;

    if (!texto) {
        alert("No hay texto para copiar.");
        return;
    }

    navigator.clipboard.writeText(texto)
        .then(() => {
            alert("Texto copiado!");
        })
        .catch(err => {
            alert("Error al copiar el texto: " + err);
            console.error("Error al copiar el texto: ", err);
        });
}


// botones
botonEncriptar.addEventListener('click', funcionEncriptacion);
botonDesencriptar.addEventListener('click', funcionEncriptacion);
botonCopiar.addEventListener('click', funcionCopiar);