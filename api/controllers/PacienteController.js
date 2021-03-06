/**
 * PacienteController
 *
 * @description :: Server-side logic for managing Pacientes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	novo: function( req, res){
		console.log("Novo Paciente");
		console.log(req.allParams());
		console.log(typeof(parseInt(req.param('pNumero'))));
		Paciente.novo({
		  nome: req.param('pNome'),
	      email: req.param('pEmail'),
	      rg: req.param('pRG'),
	      cpf: req.param('pCPF'),
	      telefone: req.param('pTelefone'),
	      estado: req.param('pEstado'),
	      cidade: req.param('pCidade'),
	      bairro: req.param('pBairro'),
	      rua: req.param('pRua'),
	      numero: req.param('pNumero'),
	      cep: req.param('pCEP'),
	      nascimento:new Date(req.param('pNas'))
		}, function(err, paciente){


			if (err) {
				console.log("Erro: "+err);
				return res.json(400,err);
			}
				
			if (req.wantsJSON) {
				return res.json(200,{paciente_id:paciente.cpf});
			}	

		});
	},

	localizar: function( req, res){
		console.log("Localizar Paciente");
		console.log(req.allParams());
		Paciente.localizar({
			cpf:req.param('pCpf')
		}, function(err, paciente){
			if (err) {
				console.log("Erro: "+err);
				return res.badRequest();
			}
				
			if (req.wantsJSON) {
				if (!paciente) {
					return res.json(200,null);
				}

				return res.json(200,paciente);
			}	
		});
	},

	update_:function(req, res){
		console.log("Updating Paciente");
		console.log(req.allParams());
		//Paciente.update_(req.param("cpf"),req.param("update"), res);
		Paciente.update_(req.param("cpf"),req.param("update"),res);
	}
	
};

