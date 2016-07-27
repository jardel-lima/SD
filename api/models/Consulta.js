/**
 * Consulta.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	
  	local:{
  		type:'string',
  		required:true
  	},

  	data:{
  		type:'date',
  		required:true
  	},

  	temperatura:{
  		type:'float'
  	},

  	peso:{
  		type: 'float'
  	},

  	altura:{
  		type: 'float'
  	},

  	obs:{
  		type:'text'
  	},

  	diag:{
  		type: 'text'
  	},

    paciente: {
      model: 'paciente'
    },

    prescricoes: {
        collection: 'prescricao',
        via: 'consulta'
    },

    medico:{
      model:'user'
    }

  },

  nova: function(inputs, cb){
    Consulta.create({
      local: inputs.local,
      data: inputs.date,
      temperatura: inputs.temperatura,
      peso: inputs.peso,
      altura: inputs.altura,
      obs: inputs.obs,
      diag: inputs.diag,
      medico: inputs.medico,
      paciente: inputs.paciente
    }).exec(cb);
  }

  
};

