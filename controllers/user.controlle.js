const jwt =require('jsonwebtoken')
const { getSkatersDB, postSkatersDB,getLoginDB, getSkaterAdmiDB } = require('../database');
const {nanoid}= require('nanoid');
const bcryptjs = require('bcryptjs');
const path = require('path');



const getSkaters=async (req, res) => {
    getSkatersDB()
    .then(rows => res.json({ok: true, skaters: rows}))
    .catch (error => res.json({ok: false, msg: error}))
}

const postUsers = async (req, res) => {
    //LLAMAR FOTO
    const {foto} = req.files 

    //ENCRIPTAR LA FOTO
    const pathFoto =`${nanoid()}.${foto.mimetype.split('/')[1]}`

    //ENCRIPTAR LA CONTRASEÑA
    const salt = await bcryptjs.genSalt(10)
    const hash = await bcryptjs.hash(req.body.password, salt)


    //guardar foto
    foto.mv(path.join(__dirname,"../public/img", pathFoto), async(err)=>{
        if(err) return next(err)       
        res.json({ok: true, msg: "todo listo 👌"})
    })
     
    req.body.foto = pathFoto
    req.body.password = hash

    const respuesta = await postSkatersDB(req.body)
        
    //crear token
    const playload ={id:respuesta.id} 
    const token= jwt.sign(playload,process.env.JWT_SECRET)    
    console.log("🚀 ~ file: user.controlle.js ~ line 38 ~ postUsers ~ token", token)

    return ( token)
}

const getloginSkater=async (req, res) =>{

    const { email, password } = req.body;
    //const email = emaillogin;
    //const password = passwordlogin;

    try {
         
        // validar campos del body
        if (!email?.trim() || !password?.trim()) {
            console.log('campos vacios')
        }

        // ver si email existe en DB
        const respuesta = await getLoginDB(email);
        const { skaters } = respuesta;
        if (!respuesta.ok) {
            throw new Error("email incorrecto");
        }

        if (skaters.email !== email) {
            throw new Error("No existe el email registrado");
        }
        // ver si el password coincide con el pass del DB
        /*const comparePassword = await bcryptjs.compare(password, skaters.password);
        if (!comparePassword) {
            console.log('contraseña incorrecta');
            res.json({res:"la contraseña incorrecta"})
        }*/

        // generar JWT
        const payload = { id: skaters.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        console.log(skaters,token)
        res.json({skaters,token})
        return ({
            ok: true,
            token,
        });
       
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: error.message,
        });
    }
}

const getAmi = async(req, res) =>{
    const respuesta = await getSkaterAdmiDB()


    try {
        (rows => res.json({ok: true, skaters: rows}))
    } catch (error) {
        (error => res.json({ok: false, msg: error})) 
    }
    return res.json({ ok: true, respuesta });
}
//const getAmi = async(req, res) =>{
    
    
    /*try {
        const respuesta = await getSkaterAdmiDB()
        return res.json({ok: true, skaters: rows})
        
       
    } catch (error) {
      return res.json({ok: false, msg: error})
    }*/
    
    // .then(rows => res.json({ok: true, skaters: rows}))
    // .catch (error => res.json({ok: false, msg: error})) 
//}



module.exports={
    getSkaters,
    postUsers,
    getloginSkater,
    getAmi
}