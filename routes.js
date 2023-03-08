const express = require('express')
const route = express.Router()
const homeController = require('./src/controller/homeController')
const loginController = require('./src/controller/loginController')
const contatoController = require('./src/controller/contatoController')

const { checaLogin } = require('./src/middlewares/middleware')

// Exemplo de middleware

route.get('/', homeController.paginaInicial)

// Rotas de login
route.get('/login/index', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

// Rotas de contato
route.get('/contato/index', checaLogin, contatoController.index)
route.post('/contato/register', contatoController.register)
route.get('/contato/index/:id', contatoController.editIndex)
route.post('/contato/edit/:id', contatoController.edit)
route.get('/contato/delete/:id', contatoController.delete)

module.exports = route