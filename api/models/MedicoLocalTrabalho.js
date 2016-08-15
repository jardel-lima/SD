/**
 * MedicicoLocalTrabalho.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  tableName:'Medico_has_Local_Trabalho',
  autoCreatedAt:false,
  autoUpdatedAt:false,

  attributes: {
  	medico:{
  		model:'user',
  		columnName:'Medico_cpf',
      primaryKey:true,
  	},
  	localtrabalho:{
  		model:'localdetrabalho',
  		columnName:'id',
      primaryKey:true,
  	}

  },

  addMedicoLocalTrabalho: function(input,cb){
    console.log(input);
    MedicoLocalTrabalho.create({localtrabalho:input.local,medico:input.medico}).exec(cb);
  }
};

