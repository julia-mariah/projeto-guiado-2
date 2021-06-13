const mongoose = require('mongoose')
const Estudio = require('../models/estudio')

const criaEstudio = async (req, res) => {
    const estudio = new Estudio({
        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        criadoEm: req.body.criadoEm
    })

    const estudioJaExiste = await Estudio.findOne({nome: req.body.nome})
    if(estudioJaExiste) {
        return res.status(409).json({error: "Estudio já cadastrado!"})
    }

    try {
        const novoEstudio = await estudio.save()
        res.status(201).json(novoEstudio)
    }catch (err) {
        res.status(500).json({message: err.message})
    }
}

const mostraEstudios = async (req, res) => {
    try {
        const estudios = await Estudio.find()
        return res.status(200).json(estudios)
    } catch (err){
        return res.status(500).json({message: err.message})
    }
    
}

const atualizaEstudios = async (req, res) => {
    const estudio = await Estudio.findOne({_id: req.params.id})
    console.log(estudio)
    estudio.nome = req.body.nome
    console.log(estudio)
    try {
        const updateEstudio = await estudio.save()
        res.status(200).json(updateEstudio)
    }catch (err) {
        res.status(500).json({message: err.message})
    }
}

const deletaEstudios = async (req, res) => {
    const estudio = await Estudio.findOne({_id: req.params.id})
    try {
        const deleteEstudio = await estudio.delete()
        res.status(200).json(deleteEstudio)
    }catch (err) {
        res.status(500).json({message: err.message})
    }

}

module.exports = { 
    criaEstudio,
    mostraEstudios,
    atualizaEstudios,
    deletaEstudios
}

