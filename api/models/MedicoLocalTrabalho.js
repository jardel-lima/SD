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
  		columnName:'Medico_cpf'
  	},
  	localTrabalho:{
  		model:'localdetrabalho',
  		columnName:'id'
  	}

  }
};

