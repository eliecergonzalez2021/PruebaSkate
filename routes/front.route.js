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

router.get("/admiRuta", async (req, res) => {
    const rows = await getSkaterAdmiDB()
    res.render("admi", {rows})
})

/*router.put("/editarPerfil", (req, res) => {
    res.render("editar")
})
router.delete("/eliminarPerfil", (req, res) => {
    res.render("eliminar")
})*/


module.exports = router