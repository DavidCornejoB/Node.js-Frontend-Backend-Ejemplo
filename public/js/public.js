const botonEnviar = document.getElementById('boton-mensaje')
const inputMensaje = document.getElementById('input-mensaje')
const mensajesServidor = document.getElementById('mensajes-servidor')
const mensajesCliente = document.getElementById('mensajes-cliente')

let mensajesServer = []
let mensajesClient = []

botonEnviar.addEventListener('click', enviarMensaje)

function verMensajesCliente() {
    let mensajeEnviado

    if (mensajesClient.length != 0) {
        mensajesClient.forEach((mensaje) => {
            mensajeEnviado = `
                <h3>Enviado: ${mensaje}</h3>
            `
        })

        mensajesCliente.innerHTML = mensajeEnviado
    }
}

function verMensajesServidor() {
    let mensajeEnviado

    if (mensajesServer.length != 0) {
        mensajesServer.forEach((mensaje) => {
            mensajeEnviado = `
                <p>Servidor: ${mensaje}</p>
            `
        })
    
        mensajesServidor.innerHTML += mensajeEnviado
    }
}

function presionarEnter(event) {
    if (event.key === 'Enter') {
        enviarMensaje()
    }
}

function enviarMensaje() {
    let mensaje = inputMensaje.value

    fetch("http://localhost:8080/enviar", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mensaje
        })
    }).then(function (res) {
        if (res.ok) {
            res.json().then(function ({mensaje}) {
                mensajesServer.push(mensaje)
                verMensajesServidor()
            })
        }
    })

    mensajesClient.push(mensaje)
    verMensajesCliente()
}

window.addEventListener('keydown', presionarEnter)
