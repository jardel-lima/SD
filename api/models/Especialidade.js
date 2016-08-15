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
      autoIncrement:true,
      primaryKey:true,
      columnName:'id'
    },

  	nome:{
  		type:"string",
      columnName:'especialidade'
  	},

  	// Add a reference to User/*
    medicos: {
      collection: 'user',
      via:'especialidade',
      through:'medicoespecialidade'
    }
  },


  addEspecialidade: function(input, res){
  	console.log("Add Especialidade");
  	Especialidade.findOne({nome:input.especialidade})
    .exec( function(err,foundEspecialidade){
  	  if (err) {
    		return null;
  		}

  		console.log('Found Especialidade: '+foundEspecialidade);

  		if(foundEspecialidade){
  			
        MedicoEspecialidade.addMedicoEspecialidade(
          {especialidade: foundEspecialidade.id,
          medico: input.user.cpf}, 
          function(err, created){
            if(err)
              return res.json("Error1:"+err);
            // return res.redirect("/");
        });

  		}
  		else{
  			
        Especialidade.create({nome:input.especialidade})
        .exec(function(err, createEspecialidade){
          if (err){
            return res.negotiate(err);
          }
          
          console.log('Create Especialidade');
          console.log(createEspecialidade.id);
        
        
          MedicoEspecialidade.addMedicoEspecialidade({especialidade: createEspecialidade.id,
          medico: input.user.cpf}, 
          function(err, created){
            if(err)
              return res.json("Error2:"+err);
            
          });

  

        
        });

  	  }
  	});
  }
};

