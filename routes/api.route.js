const express = require('express');
const { getSkaters, postUsers, getloginSkater} = require('../controllers/user.controlle');
const { getAmi } = require('../database');
const router = express.Router();
const {requireAuth} = require('../middlewares/requireAuth')

router.get('/', getSkaters)
router.post('/registroUser', postUsers)
router.post('/login', getloginSkater)
//router.get('/admi', requireAuth , getAmi)

//profe me funciona el codigo sólo cuanto comento o borro esa linea de codigo
//Mi intencion es lograr que me funcione el INICIAR SESIÓN.
module.exports = router;
