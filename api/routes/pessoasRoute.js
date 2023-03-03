const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router.get('/pessoas', PessoaController.buscaTodasAsPessoas)
router.get('/pessoas/ativas', PessoaController.buscaPessoasAtivas)
router.get('/pessoas/:id', PessoaController.buscaPorId)
router.post('/pessoas', PessoaController.criaPessoa)
router.put('/pessoas/:id', PessoaController.atualizaPessoa)
router.delete('/pessoas/:id', PessoaController.excluiPessoa)
router.delete('/pessoas/:id/fisico', PessoaController.excluiPessoaDefinitivo)
router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
router.post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa)
router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.buscaUmaMatricula)
router.get('/pessoas/:estudanteId/matricula', PessoaController.buscaMatriculas)
router.get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.buscaMatriculasPorTurma)
router.get('/pessoas/turma/lotadas', PessoaController.buscaTurmasLotadas)
router.post('/pessoas/:estudanteId/matricula', PessoaController.criaMatricula)
router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizaMatricula)
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.excluiMatricula)
router.get('/pessoas/:id/consultadeletado', PessoaController.consultaRegistroApagado)

module.exports = router