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
			medicamento: req.param('prMedicamento'),
			concentracao: req.param('prConcentracao'),
			dosagem: req.param('prDosagem'),
			dosagem_tipo: req.param('prDosagemTipo'),
			turno_matutino: req.param('prMatutino'),
			turno_vespertino: req.param('prVespertino'),
			turno_noturno: req.param('prNoturno'),
			periodo: req.param('prPeriodo'),
			periodo_tipo: req.param('prPeriodoTipo'),
			duracao: req.param('prDuracao'),
			duracao_tipo: req.param('prDuracaoTipo'),
			consulta: req.param('prConsulta')
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

