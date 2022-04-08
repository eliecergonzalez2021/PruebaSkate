const { Router } = require("express")
const {getSkatersDB} = require("../database/index")
const router = Router()

router.get("/", async (req, res) => {
    const rows = await getSkatersDB()
    res.render("index", {rows})
})

router.get("/login", (req, res) => {
    res.render("iniciarSeccion")
})

router.get("/registroUser", (req, res) => {
    res.render("registroUsuario")
})


router.get("/registrarperfil", (req, res) => {
    res.render("registroPerfil")
})




module.exports = router