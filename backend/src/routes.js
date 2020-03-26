const express = require('express');

//const connection = require('./database/connection');
//a importação da conexão não é mais necessário dentro desse arquivo a partir do momento em que criei um controlador para
//armazenar o escopo das rotas referentes às ongs, pois é esse escopo que precisa da conexão com o banco de dados

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

    

module.exports = routes;

//esse arquivo armazena apenas os métodos das rotas
//é no arquivo do controlador das ongs que ficam os escopos dessas rotas
//essa divisão é para deixar a aplicação mais escalável