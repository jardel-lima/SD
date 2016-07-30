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
				return res.badRequest();
			}
				
			if (req.wantsJSON) {
				return res.ok({paciente_id:paciente.id});
			}	

		});
	},

	localizar: function( req, res){
		console.log("Localizar Paciente");
		console.log(req.allParams());
		Paciente.localizar({
			nome: req.param('pNome'),
			email: req.param('pEmail')
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
	}
	
};

