const database = require('../models')

class NivelController {

    static async buscaTodosOsNiveis(req, res) {
        try {
            const todosOsNiveis = await database.Niveis.findAll()
            return res.status(200).json(todosOsNiveis)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async buscaPorId(req, res) {
        const { id } = req.params
        try {
            const umaNivel = await database.Niveis.findOne({ where: { id: id } })
            return res.status(200).json(umaNivel)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    
    static async criaNivel(req, res) {
        const novoNivel = req.body
        try {
            const novoNivelCriado = await database.Niveis.create(novoNivel)
            return res.status(200).json(novoNivelCriado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaNivel(req, res) {
        const { id } = req.params
        const novasInfosNivel = req.body
        try {
            await database.Niveis.update(novasInfosNivel, { where: { id: id } })
            return res.status(200).send('Atualização realizada com sucesso.')
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    
    static async excluiNivel(req, res) {
        const { id } = req.params
        try {
            await database.Niveis.destroy({ where: { id: Number(id) } })
            return res.status(200).send(`Nível de ID ${id} removido com sucesso.`)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

}

module.exports = NivelController