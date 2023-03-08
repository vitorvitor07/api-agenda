const mongoose = require('mongoose')

const homeSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true
    },
    senha: {
        type: String
    }
})

const homeModel = mongoose.model('Home', homeSchema)

module.exports = homeModel