/**
 * Especialidade.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName:'Especialidade',
  autoCreatedAt:false,
  autoUpdatedAt:false,

  attributes: {

    id:{
      type:'interger',
      autoincrement:true,
      primaryKey:true,
      columnName:'id'
    },

  	nome:{
  		type:"string",
      columnName:'especialidade'
  	},

  	// Add a reference to User/*
    owners: {
      collection: 'user',
      via:'especialidade',
      through:'medicoespecialidade'
    }
  },
/*
  addEspecialidade: function(input){
  	console.log("Add Especialidade");
  	Especialidade.findOne({nome:input.especialidade}).exec( function(err,foundEspecialidade){
  		if (err) {
    		return res.negotiate(err);
  		}

  		console.log(foundEspecialidade);

  		if(foundEspecialidade){
  			
  			input.user.especialidades.add(foundEspecialidade.id);
  		}
  		else{
  			input.user.especialidades.add({nome:input.especialidade});
  		}
  	});
  }*/
};

