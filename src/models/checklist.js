// pode ter muitas tasks relacionadas

const mongoose = require('mongoose')

// aqui estamos criando um esquema de estruturas de dados que o checklist vai possuir
// um nome, que vai ser do tipo string, e vai ser requirido
const cheklistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
})

module.exports = mongoose.model('Checklist', cheklistSchema)