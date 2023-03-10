const { where } = require('sequelize')
const database = require('../models')
const Sequelize = require('sequelize')

const { PessoasServices } = require('../services')
const pessoasService = new PessoasServices()

class PessoaController {

    static async buscaPessoasAtivas(req, res) {
        try {
            const todasAsPessoasAtivas = await pessoasService.buscaRegistrosAtivos()
            return res.status(200).json(todasAsPessoasAtivas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async buscaTodasAsPessoas(req, res) {
        try {
            const todasAsPessoas = await pessoasService.buscaTodosOsRegistros()
            return res.status(200).json(todasAsPessoas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async buscaPorId(req, res) {
        const { id } = req.params
        try {
            const umaPessoa = await database.Pessoas.findOne({ where: { id: id } })
            return res.status(200).json(umaPessoa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    
    static async criaPessoa(req, res) {
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(200).json(novaPessoaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaPessoa(req, res) {
        const { id } = req.params
        const novasInfosPessoa = req.body
        try {
            await database.Pessoas.update(novasInfosPessoa, { where: { id: id } })
            return res.status(200).send('Atualização realizada com sucesso.')
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    
    static async excluiPessoa(req, res) {
        const { id } = req.params
        try {
            await database.Pessoas.destroy({ where: { id: Number(id) } })
            return res.status(200).send(`Pessoa de ID ${id} removida com sucesso.`)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //exclusão física, 'hard delete'
    static async excluiPessoaDefinitivo(req, res) {
        const { id } = req.params
        try {
            await database.Pessoas.destroy({ where: { id: Number(id) }, force: true })
            return res.status(200).send(`Pessoa de ID ${id} removida com sucesso. (definitivamente do banco)`)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    //retorno de um soft delete, registro apagado logicamente (com deletedAt not null)
    static async consultaRegistroApagado(req, res) {
        try {
            const id = req.params.id

            let pessoa = await database.Pessoas.findOne({
                paranoid: false,
                where: { id: Number(id) }
            })
            return res.status(200).json(pessoa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraPessoa(req, res) {
        const { id } = req.params
        try {
            await database.Pessoas.restore( { where: { id: Number(id) } } )
            return res.status(200).json( {mensagem: `id ${id} restaurado.`} )
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    // /pessoas/:estudanteId/matricula/:matriculaId
    static async buscaUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            const umaMatricula = await database.Matriculas.findOne(
                { where: 
                    {
                        id: matriculaId, 
                        estudante_id: estudanteId 
                    } 
                })
            return res.status(200).json(umaMatricula)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaMatricula(req, res) {
        const { estudanteId } = req.params
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return res.status(200).json(novaMatriculaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        const novasInfosMatricula = req.body
        try {
            await database.Matriculas.update(novasInfosMatricula,
                { where: {
                        id: matriculaId,
                        estudante_id: estudanteId
                }})
            return res.status(200).send('Atualização de Matrícula realizada com sucesso.')
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async excluiMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            await database.Matriculas.destroy({ where: { id: Number(matriculaId) } })
            const estudante = await database.Pessoas.findOne({ where: { id: estudanteId } })
            return res.status(200).send(`Matrícula ${matriculaId} do aluno(a) ${estudante.nome} removida com sucesso.`)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async buscaMatriculas(req, res) {
        const { estudanteId } = req.params
        try {
            const pessoa = await database.Pessoas.findOne({ where: { id: Number(estudanteId) } })
            const matriculas = await pessoa.getAulasMatriculadas()
            return res.status(200).json(matriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async buscaMatriculasPorTurma(req, res) {
        const { turmaId } = req.params
        try {
            const matriculas = await database.Matriculas.findAndCountAll({ 
                where: { 
                    turma_id: Number(turmaId),
                    status: 'confirmado',
                },
                limit: 20,
                order: [['estudante_id', 'desc']]
            })
            return res.status(200).json(matriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async buscaTurmasLotadas(req, res) {
        const lotacaoTurma = 2
        try {
            const turmasLotadas = await database.Matriculas.findAndCountAll({ 
                where: { 
                    status: 'confirmado',
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
            })
            return res.status(200).json(turmasLotadas.rows)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async cancelaPessoa(req, res) {
        const { estudanteId } = req.params
        try {
            // database.sequelize.transaction(async (transacao) => {
            //     await database.Pessoas.update(
            //         { ativo:false },
            //         { where: { id: Number(estudanteId) }},
            //         { transaction: transacao })
    
            //     await database.Matriculas.update(
            //         { status: 'cancelado' },
            //         { where: { estudante_id: Number(estudanteId) }},
            //         { transaction: transacao })
                await pessoasService.cancelaPessoaEMatriculas(Number(estudanteId))
                return res.status(200).json({ message: `matrículas ref. a estudante ${estudanteId} canceladas.` })
            // })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController
