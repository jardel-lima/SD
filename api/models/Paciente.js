/**
 * Paciente.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  //connection: 'mysqlServer',
  tableName:'Paciente',
  autoCreatedAt:false,
  autoUpdatedAt:false,
 
 attributes: {
  	nome: {
  		type:'string',
  		required: true,
      columnName:'nome'
  	},

  	email: {
  		type:'email',
  		required: true,
      columnName:'email'
  	},

    senha:{
      type:'string',
      columnName:'password'
    },
  	
  	rg: {
  		type:'string',
  		size: 20,
      columnName:'rg'
  	},
  	
  	cpf:{
  		type:'string',
  		size:11,
  		primaryKey:true,
      columnName:'cpf'
  	},
  	
  	telefone:{
  		type:'string',
      columnName:'telefone'
  	},

  	estado:{
  		type:'string',
  		size: 2,
      columnName:'estado'
  	},

  	cidade:{
  		type:'string',
      columnName:'cidade'
  	},

  	bairro:{
  		type:'string',
      columnName:'bairro'
  	},

  	rua:{
  		type:'string',
      columnName:'rua'
  	},

  	numero:{
  		type:'integer',
      columnName:'numero'
  	},

  	cep:{
  		type:'string',
      columnName:'cep'
  	},

  	nascimento:{
  		type:'date',
      columnName:'nascimento'
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
      cpf: find.cpf
    }).exec(cb);
  },

  /*update_: function(cpf, params, res){
    Paciente.findOne({cpf:cpf}).exec(
      function(err, register){
        if(err){
          console.log("Error: 1", erro);
          return res.json(500,err);
        }
        else{

          register.nome = params.nome;
          register.email = params.email;
          register.rg = params.rg;
          register.cpf = params.cpf;
          register.telefone = params.telefone;
          register.estado = params.estado;
          register.cidade = params.cidade;  
          register.bairro = params.bairro;
          register.rua = params.rua;
          register.numero = params.numero;
          register.cep = params.cep;
          register.nascimento = params.nascimento; 

          register.save(function(err){
            if(err){
              console.log( "Error: 2", err);
              return res.json(500,err);
            }
            return res.ok();
          });
        }
      });
    },*/
    
    update_:function(cpf, params, res){
      Paciente.update({cpf:cpf},params).exec(
        function(err, register){
          if(err){
            console.log("Error: 1", erro);
            return res.json(500,err);
          }
          else{
              return res.ok();
            }
      });
    }
     // );

 // } 
};

