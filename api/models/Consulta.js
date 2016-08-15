/**
 * Consulta.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName:'Consulta',
  autoCreatedAt:false,
  autoUpdatedAt:false,

  attributes: {
  	id:{
      type:'interger',
      autoIncrement:true,
      primaryKey:true,
      columnName:'id'
    },

  	local:{
  		model:'localdetrabalho',
      columnName:'local_C'
  	},

  	data:{
  		type:'date',
  		required:true,
      columnName:'data_C'
  	},

    data_revisao:{
      type:'date',
      columnName:'data_CR'
    }, 

    acompanhamento:{
      type:'boolean',
      columnName:'acomp'

    },   

  	temperatura:{
  		type:'float',
      columnName:'temperatura'
  	},

  	peso:{
  		type: 'float',
      columnName:'peso'
  	},

  	altura:{
  		type: 'float',
      columnName:'altura'
  	},

  	obs:{
  		type:'text',
      columnName:'obs'
  	},

  	diag:{
  		type: 'text',
      columnName:'diag'
  	},

    status:{
      type:'string',
      columnName:'status'
    },

    paciente: {
      model: 'paciente',
      columnName:'Paciente_cpf'
    },

    prescricoes: {
        collection: 'prescricao',
        via: 'consulta'
    },

    medico:{
      model:'user',
      columnName:'Medico_cpf'
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
      paciente: inputs.paciente,
      data_revisao: inputs.date_r,
      acomp:inputs.acomp,
      status:'A INICIAR'
    }).exec(cb);
  }

  
};

