const{Pool}=require('pg')
const fs = require('fs')
const path = require('path')

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:root@localhost:5432/skatePark'

const pool = process.env.DATABASE_URL ?
 new Pool({
    connectionString:connectionString,
    ssl:{rejectUnauthorized:false}
}): new Pool({connectionString})


const getSkatersDB = async() =>{
    return pool.query("SELECT * FROM skaters").then(res => res.rows);
}
 
const postSkatersDB = async ({email,nombre,password,anos_experiencia,especialidad,foto}) =>{
  
    const client = await pool.connect();
    const values = [email,nombre,password,anos_experiencia,especialidad,foto]
    const query = {
        text: "INSERT INTO skaters (email,nombre,password,anos_experiencia,especialidad,foto) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
        values,
    };

    try {
        const respuesta = await client.query(query);
        const { id } = respuesta.rows[0];
        console.log(id)
        return {
            ok: true,
            id,
        };
    } catch (error) {
        console.log(error);
        if (error.code === "23505") {
            return {
                ok: false,
                msg: "Ya existe el email registrado",
            };
        }
        return {
            ok: false,
            msg: error.message,
        };
    }finally {
        client.release();
    }
}

const getLoginDB=async (email)=>{
    const client = await pool.connect();
    const query = {
        text: "SELECT * FROM skaters  WHERE email =$1 ",
        values: [email],
    };

    try {
        const respuesta = await client.query(query);

            return {
            ok: true,
            skaters :  respuesta.rows[0],
        };
    } catch (error) {
        console.log(error);
        if (error.code === "23505") {
            return {
                ok: false,
                msg: error.message,
            }         
        }

    }finally {
        client.release();
    }
}

/*const getSkaterAdmiDB =async ()=>{
    return pool.query("SELECT foto, nombre, anos_experiencia, especialidad FROM skaters").then(res => res.rows);
}*/

const getSkaterAdmiDB=async (email)=>{
    const client = await pool.connect();
    const query = {
        text: "SELECT foto, nombre, anos_experiencia, especialidad FROM skaters",
        values: [email],
    };

    try {
        const respuesta = await client.query(query);

            return {
            ok: true,
            skaters :  respuesta.rows[0],
        };
    } catch (error) {
        console.log(error);
        if (error.code === "23505") {
            return {
                ok: false,
                msg: error.message,
            }         
        }

    }finally {
        client.release();
    }
}

const deleteSkatersDB = async({id})=>{
    const values =[id]
    return pool.query( "DELETE FROM skaters where id = $1",values)
}

const updateSkatersDB = async ({nombre,anos_experiencia,especialidad,id}) =>{
    const values = [nombre,anos_experiencia,especialidad,id]
    return pool.query("UPDATE skaters SET nombre = $1, anos_experiencia = $2, especialidad = $3 where email = $4 RETURNING *", values)
}

const migrar = () => {
    const data = fs.readFileSync(path.join(__dirname, 'migracion.sql'), {encoding: "utf-8"})

    pool.query(data)
    .then(() => console.log('listo!'))
    .catch(console.error)
    .finally(() => pool.end())
}



module.exports = {
    getSkatersDB,
    postSkatersDB,
    migrar,
    getSkaterAdmiDB,
    deleteSkatersDB,
    updateSkatersDB,
    getLoginDB
}