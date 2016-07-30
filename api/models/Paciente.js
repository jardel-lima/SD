/**
 * Paciente.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	nome: {
  		type:'string',
  		required: true
  	},

  	email: {
  		type:'email',
  		required: true
  	},

    senha:{
      type:'string'
    },
  	
  	rg: {
  		type:'integer',
  		size: 15
  	},
  	
  	cpf:{
  		type:'integer',
  		size:11,
  		required: true,
      unique:true
  	},
  	
  	telefone:{
  		type:'string'
  	},

  	estado:{
  		type:'string',
  		size: 2
  	},

  	cidade:{
  		type:'string'
  	},

  	bairro:{
  		type:'string'
  	},

  	rua:{
  		type:'string'
  	},

  	numero:{
  		type:'string'
  	},

  	cep:{
  		type:'string'
  	},

  	nascimento:{
  		type:'date'
  	},

    consultas: {
      collection: 'consulta',
      via: 'paciente'
    }

  },

  novo: function(inputs, cb){
    Paciente.create({
      nome: inputs.nome,
      email: inputs.email,
      rg: inputs.rg,
      cpf: inputs.cpf,
      telefone: inputs.telefone,
      estado: inputs.estado,
      cidade: inputs.cidade,
      bairro: inputs.bairro,
      rua: inputs.rua,
      numero: inputs.numero,
      cep: inputs.cep,
      nascimento:inputs.nascimento
    }).exec(cb);
  },

  localizar: function(find, cb){
    Paciente.findOne({
      nome: find.nome,
      email: find.email
    }).exec(cb);
  } 
};

