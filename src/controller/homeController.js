const Contato = require('../models/contatoModel')

exports.paginaInicial = async function(req, res) {   
    try {
        const contatos = new Contato()
        const contatosBuscados = await contatos.buscaContatos()
        res.render('index', { contatos: contatosBuscados })
    } catch(e) {
        console.log(e)
    }
}

