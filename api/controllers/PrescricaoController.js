/**
 * PrescricaoController
 *
 * @description :: Server-side logic for managing Prescricaos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	adcionar: function(req, res){
		console.log("Adcinar Prescrição");
		console.log(req.allParams());
		Prescricao.adcionar({
			medicamento: req.param('medicamento'),
			concentracao: req.param('concentracao'),
			dosagem: req.param('dosagem'),
			dosagem_tipo: req.param('dosagem_tipo'),
			turno_matutino: req.param('turno_matutino'),
			turno_vespertino: req.param('turno_vespertino'),
			turno_noturno: req.param('turno_noturno'),
			periodo: req.param('periodo'),
			periodo_tipo: req.param('periodo_tipo'),
			duracao: req.param('duracao'),
			duracao_tipo: req.param('duracao_tipo'),
			consulta: req.param('consulta')
		}, function(err, prescricao){
			if (err) {
				console.log("Erro: "+err);
				return res.badRequest();
			}
				
			if (req.wantsJSON) {
				return res.ok();
			}	

		});
	}
	
};

