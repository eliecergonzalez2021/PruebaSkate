const { Router } = require("express")
const {getSkatersDB} = require("../database/index")
const router = Router()

router.get("/", async (req, res) => {
    const rows = await getSkatersDB()
    res.render("index", {rows})
})

router.get("/login", (req, res) => {
    res.render("iniciarSesion")
})

router.get("/registroUser", (req, res) => {
    res.render("registroUsuario")
})


router.get("/editarPerfil", (req, res) => {
    res.render("registroPerfil")
})


router.get("/admi", (req, res) => {
    res.render("admi")
})

/*router.delete("/eliminarPerfil", (req, res) => {
    res.render("eliminar")
})*/


module.exports = router