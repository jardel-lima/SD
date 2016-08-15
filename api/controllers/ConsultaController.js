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

		LocalDeTrabalho.findOne({nome:req.param('cLocal')})
		.exec(function(err, register){
			if(err)
				return res.res.badRequest();
			
			Consulta.nova({
					local: register.id,
					temperatura: req.param('pTemp'),
					peso: req.param('pPeso'),
					altura: req.param('pAlt'),
					obs: req.param('cObs'),
					diag: req.param('cDiag'),
					medico: req.session.me,
					paciente: req.param('paciente'),
					date: new Date(),
					acomp: req.param('acomp'),
					date_r: new Date(req.param('cDateR'))
				}, function(err, consulta){
						if (err) {
							console.log("Erro: "+err);
							return res.badRequest();
						}

						console.log(consulta);

						
						return res.json(200,{consulta_id:consulta.id});
						
						/*if (req.wantsJSON) {
							return res.json(200,{consulta_id:consulta.id});
						}	*/
					}
			);
			
		});
		
	},

	getConsultas: function(req , res){
		console.log("Getting Consultas");
		Consulta.find({medico: req.session.me}).populate('paciente')
		.exec(function(err,records){
			if(err)
				return res.json(err);
			return res.json(records);
		});
	}
};

