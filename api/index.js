require('../database');
const express = require('express');
const app = express();
const routes = require('./routes/routes.js');
const swaggerDocs = require('./routes/swagger.js');
const port = 3000;


//Reciba el cuerpo de los servicios
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);


app.listen(port, function() {
    console.log('Servidor API en: ' + port);
    swaggerDocs(app, port);
});