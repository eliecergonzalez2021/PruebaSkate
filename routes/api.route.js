const express = require('express');
const { getSkaters, postUsers, getloginSkater, getAmi} = require('../controllers/user.controlle');
//const { getAmi } = require('../database');
const router = express.Router();
const {requireAuth} = require('../middlewares/requireAuth')

router.get('/', getSkaters)
router.post('/registroUser', postUsers)
router.post('/login', getloginSkater)
router.get('/admiRuta', requireAuth , getAmi)


module.exports = router;
