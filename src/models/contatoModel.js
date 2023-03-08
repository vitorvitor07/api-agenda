const mongoose = require('mongoose')
const validator = require('validator')

const contatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now }
})

const contatoModel = mongoose.model('Contato', contatoSchema)

class Contato {

    constructor(body) {
        this.body = body
        this.errors = []
        this.contato = null
    }

    async register() {
        this.valida()
        if (this.errors.length > 0) return
        this.contato = await contatoModel.create(this.body)
    }

    async bucarId(id) {
        if (typeof id !== 'string') return
        const contact = await contatoModel.findById(id)
        return contact

    }

    valida() {
        this.cleanUp()
        if (this.body.email && !validator.isEmail(this.body.email)) {
            this.errors.push("E-mail inválido!")
        }
        if (!this.body.nome) this.errors.push('Nome é um campo obrigatório')
        if (!this.body.telefone && !this.body.email) {
            this.errors.push('O contato deve conter pele menos um telefone ou um e-mail')
        }
    }

    cleanUp() {
        for (let key in this.body) { // in para fazer loop nas chaves
            if (typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }
        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone,
        }
    }

    async edit(id) {
        if (typeof id !== 'string') return
        this.valida()
        if (this.errors.length > 0) return
        this.contato = await contatoModel.findByIdAndUpdate(id, this.body, { new: true }) // new: true retorna os dados atualizados
    }

    async buscaContatos() {
        const contatos = await contatoModel.find()
            .sort({ criadoEm: -1 }) // -1 para ordem decrescente
        return contatos
    } 

    async delete(id) {
        if (typeof id !== 'string') return
    
        const contato = await contatoModel.findOneAndDelete({ _id:id })
        console.log(contato)
        return contato
    }

}

module.exports = Contato