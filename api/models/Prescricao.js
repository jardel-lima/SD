/**
 * Prescricao.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName:'Prescricao',
  autoCreatedAt:false,
  autoUpdatedAt:false,

  attributes: {
    id:{
      type:'interger',
      autoIncrement:true,
      primarykey:true,
      columnName:'id'
    },

  	medicamento:{
  		type:'string',
      columnName:'medicamento'
  	},

  	concentracao:{
  		type:'string',
      columnName:'concentracao'
  	},

  	dosagem: {
  		type:'integer',
  		required: true,
      columnName:'dosagem'
  	},

  	dosagem_tipo: {
  		type:'string',
  		enum:['unidades','ml','colheres'],
      columnName:'dosagem_tipo'
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

    status:{
      type:'string'
    },

  	consulta: {
      model: 'consulta',
      columnName:'id_Consulta'
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

