const database = require('../models')
const { Op } = require("sequelize")

const { TurmasServices } = require('../services')
const turmasService = new TurmasServices()
class TurmaController {

    static async buscaTodasAsTurmas(req, res) {
        const { data_inicio, data_fim } = req.query
        const where = {}
        data_inicio && data_fim ? where.data_inicio = {[Op.between]: [data_inicio, data_fim]} : null
        try {
            const todasAsTurmas = await database.Turmas.findAll({ where })
            return res.status(200).json(todasAsTurmas)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async buscaPorId(req, res) {
        const { id } = req.params
        try {
            const umaTurma = await database.Turmas.findOne({ where: { id: id } })
            return res.status(200).json(umaTurma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    
    static async criaTurma(req, res) {
        const novaTurma = req.body
        try {
            const novaTurmaCriada = await database.Turmas.create(novaTurma)
            return res.status(200).json(novaTurmaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaTurma(req, res) {
        const { id } = req.params
        const novasInfosTurma = req.body
        try {
            await database.Turmas.update(novasInfosTurma, { where: { id: id } })
            return res.status(200).send('Atualização realizada com sucesso.')
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    
    static async excluiTurma(req, res) {
        const { id } = req.params
        try {
            await database.Turmas.destroy({ where: { id: Number(id) } })
            return res.status(200).send(`Turma de ID ${id} removida com sucesso.`)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraTurma(req, res) {
        const { id } = req.params
        try {
            await database.Turmas.restore( { where: { id: Number(id) } } )
            return res.status(200).json( {mensagem: `id ${id} restaurado.`} )
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = TurmaController