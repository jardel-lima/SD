/**
 * Prescricao.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  	medicamento:{
  		type:'string'
  	},

  	concentracao:{
  		type:'string'
  	},

  	dosagem: {
  		type:'integer',
  		required: true,
  	},

  	dosagem_tipo: {
  		type:'string',
  		enum:['unidades','ml','colheres']
  	},

  	turno:{
  		type:'string',
  		enum:['Matutino','Vespertino','Noturno']
  	},

  	periodo:{
  		type:'integer'
  	},

  	periodo_tipo:{
  		type:'string',
  		enum:['horas','dias','semanas']
  	},

  	duracao:{
  		type:'integer',
  	},

  	duracao_tipo:{
  		type:'string',
  		enum:['vezes','dias','meses','anos']
  	},

  	consulta: {
      model: 'consulta'
 	}

 	

  }

  
};

