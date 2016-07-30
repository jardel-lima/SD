/**
 * ConsultaController
 *
 * @description :: Server-side logic for managing Consultas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	nova: function(req , res){
		console.log("Novo Consulta");
		console.log(req.allParams());
		Consulta.nova({
			local: req.param('cLocal'),
			temperatura: req.param('pTemp'),
			peso: req.param('pPeso'),
			altura: req.param('pAlt'),
			obs: req.param('cObs'),
			diag: req.param('cDiag'),
			medico: req.session.me,
			paciente: req.param('paciente'),
			date: new Date()
		}, function(err, consulta){
				if (err) {
					console.log("Erro: "+err);
					return res.badRequest();
				}
					
				if (req.wantsJSON) {
					return res.ok({consulta_id:consulta.id});
				}	
		});
	}
};

