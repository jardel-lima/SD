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
		console.log("medico cpf:",req.session.me);
		Consulta.find({medico: req.session.me}).populate('paciente')
		.exec(function(err,records){
			console.log("Returning Consultas");
			if(err){
				console.log("ERRO: ",err);
				return res.json(err);
			}
				
			if(records){
				console.log("Found Consultas", records);
				return res.json(records);
			}
			
		});
	},

	getConsultaInfo: function(req, res){
		console.log("Getting Consulta Server");
		Consulta.findOne({id: req.param('id')}).populate('paciente')
		.populate('local')
		.exec(function(err,record){
			console.log(record)
			if(err)
				return res.json(err);

			Prescricao.find({consulta: record.id})
			.exec(function(err, record_p){
				if(err)
					return res.json(err);
				record.prescricoes = record_p;
				var data = {consulta:record,prescricoes:record_p};
				console.log("Adding prescricoes");
				console.log(data);
				return res.json(data);
			});
			
		});
	},

};

