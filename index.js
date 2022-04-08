require('dotenv').config();
const express = require('express');
//const path = require('path');
const routes = require('./routes');
const middlewares = require('./middlewares');

const {
    create
} = require("express-handlebars")

const app = express();

const hbs = create({
    extname: "hbs"
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

middlewares.load(app)
routes.load(app)

app.get('/Admin', async (req, res) => {

    try {
        
        const usuarios = await getUsuarios()
        res.render('Admin', { usuarios })

    } catch (e) {
        res.status(500).send({
            error: `Algo salio mal 🙅‍♂️ ${e}`,
            code: 500 
        })
    }

})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server UP 👌😎, Puerto http://localhost:${PORT}`))