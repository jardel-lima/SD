/**
 * MedicocoEspecialidade.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    //connection: 'localDiskDb',
  tableName:'Especialidade_has_Medico',
  autoCreatedAt:false,
  autoUpdatedAt:false,

  attributes: {
  	medico:{
  		model:'user',
  		columnName:'Medico_cpf',
  		//primarykey:true,
  		
  	},
  	especialidade:{
  		model:'especialidade',
  		columnName:'id',
  		//primarykey:true,
  	}
  }
};

