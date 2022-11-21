const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

app.post("/enviar", (req, res) => {
    const mensaje = req.body.mensaje || ""
    console.log(mensaje);
    res.send({mensaje})
})

app.listen(8080, () => {
    console.log("Server running...");
})