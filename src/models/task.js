// pode ter somente 1 checklist relacionado

const mongoose = require('mongoose')

// aqui estamos criando um esquema de estruturas de dados que o checklist vai possuir
// um nome, que vai ser do tipo string, e vai ser requirido
// e uma propriedade chamada done, que vai ser um boolean, e vai começar com valor false
const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    // Aqui estamos colocando que a task sempre vai ser associado a um objectId de um checklist
    checklist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Checklist',
        required: true
    }
})

module.exports = mongoose.model('Task', taskSchema)