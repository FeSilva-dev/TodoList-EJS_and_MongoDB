const express = require('express')

const router = express.Router()

const Checklist = require('../models/checklist') //importando o model aqui para poder usar

router.get('/', async (req, res) => {
    try{
        // Estou usando o metodo find do mongoose para poder retornar todos os valores
        // não estou passando nada como parametro especifico
        let checklists = await Checklist.find({}) 

        // Estou retornando tudo com um status code 200 de OK, e passando tudo para json
        res.status(200).render('checklists/index', { checklists: checklists})
        // res.status(200).json(checklists)
    }catch(error){
        res.status(500).render('pages/error', {error: 'Erro ao exibir as listas'})
    }
})

router.get('/new', async (req, res) => {
    try{
        let checklist = new Checklist()
        res.status(200).render('checklists/new', { checklist: checklist})
    }catch(error){
        res.status(500).render('pages/error', { error: 'Erro ao carregar o formulario'})
    }
})

router.get('/:id/edit', async (req, res) => {
    try{
        let checklist = await Checklist.findById(req.params.id)
        res.status(200).render('checklists/edit', {checklist: checklist})
    }catch(error){
        res.status(500).render('pages/error', { error: 'Erro ao exibir edição'})
    }
})

router.post('/', async (req, res) => {
    let { name } = req.body.checklist // Aqui estou desestruturando o name de toda a requisição que foi feita 
    let checklist = new Checklist({name})

    // Vamos criar as coisas utilizando o model
    // Vamos deixar isso de forma assincrona
    try{
        await checklist.save()
        res.redirect('/checklists')
    } catch(error){
        res.status(422).render('checklists/new', { checklists: { ...checklist, error }})
    }
})

router.get('/:id', async (req, res) => {
    try{
        let checklist = await Checklist.findById(req.params.id).populate('tasks')
        res.status(200).render('checklists/show', { checklist: checklist})
    }catch(error){
        res.status(500).render('pages/error', {error: 'Erro ao exibir as listas'})
    }
})

router.put('/:id', async (req, res) => {
    const { name } = req.body.checklist
    let checklist = await Checklist.findById(req.params.id)

    try{
        // O new:true serve para que assim que eu atualize
        // ele mostre o valor ja atualizado
        // Estamos passando o findById para que ele busque pelo id, e ja atualize, e o parametro que eu quero atualizar é o name
        await checklist.update({name})
        res.redirect('/checklists')
    }catch(error){
        let errors = error.erros
        res.status(422).render('checklists/edit', {checklist: { ...checklist, errors}})
    }
})

router.delete('/:id', async (req, res) => {
    try{
        // Aqui estou passando o findAndRemove para que ele busque pelo id, e automaticamente exclua
        // O unico parametro que eu preciso passar é o id de qual vai ser excluido
        let checklist = await Checklist.findByIdAndRemove(req.params.id) 
        res.redirect('/checklists/deleted')
    }catch(error){
        res.status(500).render('pages/error', {error: 'Erro ao deletar a lista de tarefas'})
    }
})


module.exports = router