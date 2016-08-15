/**
 * LocalDeTrabalho.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName:'Local_trabalho',
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
      columnName:'local_trabalho'
  	},
    
  	// Add a reference to User
    medicos: {
      collection: 'user',
      via:'localtrabalho',
      through:'medicolocaltrabalho'
    },

    /*localConsulta: {
      collection: 'consulta',
      via: 'local'
    }*/
  },

  addLocalTrabalho: function(input, res){
  	console.log("Add Local de Trabalho");
  	LocalDeTrabalho.findOne({nome:input.nome})
    .exec( function(err,foundLocalTrabalho){
  		if (err) {
    		return res.negotiate(err);
  		}

  		console.log("Found Local");
      console.log(foundLocalTrabalho);
      console.log(input.user);

  		if(foundLocalTrabalho){
  			MedicoLocalTrabalho.addMedicoLocalTrabalho({
          local:foundLocalTrabalho.id,medico:input.user.cpf},
          function(err, register){
            if(err)
              return res.json("ERROR 1:"+err);
            return res.redirect("/");
          });
  		}
  		else{
        LocalDeTrabalho.create({nome:input.nome})
        .exec(function(err, local){
          if(err)
            return res.negotiate(err);
          console.log("Create Local"+local)

         // LocalDeTrabalho.findOne({nome:input.nome})
          //.exec(function(err, register){
             // if(err)
               // return res.negotiate();

          MedicoLocalTrabalho.addMedicoLocalTrabalho({medico:input.user.cpf,
          local:local.id},
            function(err, register){
              console.log(err);
              if(err)
                return res.negotiate();
              return res.redirect("/");
          });
         // });

        });

      }
  		
  	});
  }
};

