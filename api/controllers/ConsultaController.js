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

	getNot: function(req, res){
		console.log("Getting Notification");
		Consulta.find({Medico_cpf:req.session.me}).exec(
			function(err, registers){
				if(err){
					console.log("Error: 1 ",err);
					return res.json(500,err);
				}
				var notifications = []
				if(records.length>0){
					for( var record in records){
						if(record.msg && record.msg.length>0){
							notifications.push(record);
						}
					}
					console.log("Not: ",notifications);
					return res.json(200,notifications);
				}
				return res.ok();
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

	get_number_msg: function(req, res){
		console.log("Get msg Number");
		Consulta.find({medico:req.session.me, msg:{'!':null}}).
		exec(function(err, records){
			if(err){
				console.log("Error: 1 ",err);
				return res.json(500,err);
			}
			else{
				return res.json(200,{qtd:records.length});
			}
		});
	},

	update_:function(req, res){
		console.log("Updating Consulta");
		console.log(req.allParams());
		//Paciente.update_(req.param("cpf"),req.param("update"), res);
		var update = req.param("update");

		LocalDeTrabalho.findOne({nome:update.local})
	    .exec( function(err,register){
	  		if (err) {
	    		return res.negotiate(err);
	  		}
	  		update.local = register.id;
			Consulta.update_(req.param("id"),update,res);
		});
		//update['medico'] = req.session.me;
	},

	close_msg: function(req, res){
		console.log("Clossing Msg");
		console.log(req.allParams());

		Consulta.update({id:req.param("id")},{msg:null}).exec(
			function(err, register){
				if(err){
					console.log("Error: 2 - ", err);
					return res.json(500,err);
				}
				return res.ok();
			});
	}
/*
	update_:function(req, res){
		console.log("Updating Consulta");
		console.log(req.allParams());
		//Paciente.update_(req.param("cpf"),req.param("update"), res);
		var update = req.param("update");
		update['medico'] = req.session.me;

		var acomp = update.acomp?1:0;

		var str_1 ="SET foreign_key_checks = 0";
		var str_2="UPDATE `Consulta` SET `local_C`='"+update.local+"',"+
		"`temperatura`="+update.temperatura+",`peso`="+update.peso+
		",`altura`="+update.altura+",`obs`='"+update.obs+"',`diag`='"+update.diag+"',"+
		"`data_CR`='"+update.data_revisao+"',`acomp`="+acomp+" WHERE id = "+req.param("id");
		var str_3 = "SET foreign_key_checks = 1";

		console.log("sql: ",str_1);

		Consulta.query(str_1,
			function(err, results) {
		 		if (err) {
		 			console.log("Erro 1:",err);
		 			return res.json(500,err);
		 		}	
		 		console.log("sql: ",str_1);
			  	Consulta.query(str_2,
				function(err, results) {
			 		if (err) {
			 			console.log("Erro 2:",err);
			 			return res.json(500,err);
			 		}	
			  		console.log("sql: ",str_3);
				  	Consulta.query(str_3,
					function(err, results) {
				 		if (err) {
				 			console.log("Erro 3:",err);
				 			return res.json(500,err);
				 		}	
				  		
				  		return res.ok(results.rows);
					});
				});
		  		
		});

		//Consulta.update_(req.param("id"),update,res);
	}

*/

};

