const bcryptjs = require('bcryptjs')
const mongoose = require('mongoose')
const validator = require('validator')

const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const LoginModel = mongoose.model('Login', LoginSchema)

class Login {
    constructor(body) {
        this.body = body
        this.user = null
        this.errors = []
    }

    async login() {
        this.valida()
        if (this.errors > 0) return

        this.user = await LoginModel.findOne({ email: this.body.email })

        if (!this.user) {
            this.errors.push('E-mail ou senha incorreto')
            return
        }
        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('E-mail ou senha incorreto')
            this.user = null
            return
        }

    }

    async register() {

        this.valida()

        if (this.errors > 0) return

        await this.userExist()

        const salt = bcryptjs.genSaltSync()

        this.body.password = bcryptjs.hashSync(this.body.password, salt)
        this.user = await LoginModel.create(this.body)

    }

    async userExist() {
        this.user = await LoginModel.findOne({ email: this.body.email })
        if (this.user) this.errors.push('Usuário já existente')
    }

    valida() {
        this.cleanUp()

        if (!validator.isEmail(this.body.email)) {
            this.errors.push("E-mail inválido!")
        }

        if (this.body.password.length < 3 || this.body.password.length > 50) {
            this.errors.push('Senha Inválida! A senha deve conter 3 até 50 caracteres')
        }



    }

    cleanUp() {
        for (let key in this.body) { // in para fazer loop nas chaves
            if (typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }

}

module.exports = Login