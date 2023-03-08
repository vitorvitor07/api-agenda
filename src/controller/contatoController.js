const Contato = require('../models/contatoModel')

exports.index = function(req, res) {
    res.render('contato', { contato: {} })
}

exports.register = async function(req, res) {

    try {
        const contato = new Contato(req.body)
        await contato.register()
    
        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors)        
            req.session.save(() => {
                res.redirect('/contato/index')            
            })
            return
        }
    
        req.flash('sucess', 'Contato registrado com sucesso')
        req.session.save(() => {
            res.redirect(`/contato/index/${contato.contato._id}`)
        })
    } catch(e) {
        console.log(e)
        return res.render('404')
    }
}

exports.editIndex = async function(req, res) {
    try {
        const contact = new Contato(req.body)

        if(!req.params.id) return res.render('404')
        
        const contato = await contact.bucarId(req.params.id)

        if (!contato) return res.render('404')
    
        res.render('contato', { contato: contato })
    } catch(e) {
        console.log(e)
        res.render('404')
    }
}

exports.edit = async function(req, res) {

    try {
        if(!req.params.id) return res.render('404')
        const contato = new Contato(req.body)
        await contato.edit(req.params.id)
        
        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors)        
            req.session.save(() => {
                res.redirect('/contato/index')            
            })
            return
        }
    
        req.flash('sucess', 'Contato atualizado com sucesso')
        req.session.save(() => {
            res.redirect(`/contato/index/${contato.contato._id}`)
        })
    } catch(e) {
        console.log(e) 
        res.render('404')
    }
}

exports.delete = async function(req, res) {
    try {
        console.log(req.params.id)
        if(!req.params.id) return res.render('404')
        const contato = new Contato(req.body)
        await contato.delete(req.params.id)
        
        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors)        
            req.session.save(() => {
                res.redirect('/')            
            })
            return
        }
    
        req.flash('sucess', 'Contato deletado com sucesso')
        req.session.save(() => {
            res.redirect(`/`)
        })
    } catch(e) {
        console.log(e) 
        res.render('404')
    }
}