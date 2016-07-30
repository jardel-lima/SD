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

  	turno_matutino:{
  		type:'boolean',
  	},

    turno_vespertino:{
     type:'boolean',
    },

    turno_noturno:{
      type:'boolean',
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

  },

  adcionar: function(inputs, cb){
    Prescricao.create({
      medicamento: inputs.medicamento,
      concentracao: inputs.concentracao,
      dosagem: inputs.dosagem,
      dosagem_tipo: inputs.dosagem_tipo,
      turno_matutino: inputs.turno_matutino,
      turno_vespertino: inputs.turno_vespertino,
      turno_noturno: inputs.turno_noturno,
      periodo: inputs.periodo,
      periodo_tipo: inputs.periodo_tipo,
      duracao: inputs.duracao,
      duracao_tipo: inputs.duracao_tipo,
      consulta: inputs.consulta
    }).exec(cb);
  }

  
};

