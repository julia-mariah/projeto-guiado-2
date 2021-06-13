const mongoose = require('mongoose')
const Titulo = require('../models/titulo')

const criaTitulo = async (req, res) => {
    const titulo = new Titulo({
        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        genero: req.body.genero,
        descricao: req.body.descricao,
        titulo: req.body.titulo,
        estudio: req.body.estudio
    })

    //lembrar de fazer a regra que nao permite criar um titulo que ja existe

    try {
        const novoTitulo = await titulo.save()
        return res.status(201).json(novoTitulo)
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

const mostraTitulos = async (req, res) => {
    const titulos = await Titulo.find().populate('estudio')
    return res.status(200).json(titulos)
}

const mostraTitulosMarvel = async (req, res) => {
    const titulos = await Titulo.find().populate('estudio')
    const titulosFiltrado = titulos.filter(titulo => titulo.estudio.nome == "Marvel")

    return res.status(200).json(titulosFiltrado)
}
const mostraTitulosGhibli = async (req, res) => {
    const titulos = await Titulo.find().populate('estudio')
    const titulosFiltrado = titulos.filter(titulo => titulo.estudio.nome == "Ghibli")

    return res.status(200).json(titulosFiltrado)
}
const mostraTitulosPixar = async (req, res) => {
    const titulos = await Titulo.find().populate('estudio')
    const titulosFiltrado = titulos.filter(titulo => titulo.estudio.nome == "Pixar")

    return res.status(200).json(titulosFiltrado)
}

const atualizaTitulos = async (req, res) => {
    const titulo = await Titulo.findOne({ _id: req.params.id })
    console.log(titulo)
    const {
        titulo: tituloRequirido,
        nome: nomeRequirido,
        genero: generoRequirido,
        descricao: descricaoRequirido
    } = req.body;

    if (nomeRequirido) {
        titulo.nome = nomeRequirido
    }
    if (generoRequirido) {
        titulo.genero = generoRequirido
    }
    if (tituloRequirido) {
        titulo.titulo = tituloRequirido
    }
    if (descricaoRequirido) {
        titulo.descricao = descricaoRequirido
    }
    
    try {
        const updateTitulo = await titulo.save()
        res.status(200).json(updateTitulo)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deletaTitulos = async (req, res) => {
    const titulo = await Titulo.findOne({ _id: req.params.id })
    try {
        const deleteTitulo = await titulo.delete()
        res.status(200).json(deleteTitulo)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

}


module.exports = {
    criaTitulo,
    mostraTitulos,
    mostraTitulosMarvel,
    mostraTitulosGhibli,
    mostraTitulosPixar,
    atualizaTitulos,
    deletaTitulos
}