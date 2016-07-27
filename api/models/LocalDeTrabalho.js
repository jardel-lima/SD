/**
 * LocalDeTrabalho.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	nome:{
  		type:"string",
  	},

  	// Add a reference to User
    owner: {
      collection: 'user',
      via:'locaisDeTrabalho'
    }
  },

  addLocalTrabalho: function(input){
  	console.log("Add Local de Trabalho");
  	LocalDeTrabalho.findOne({nome:input.localtrabalho}).exec( function(err,foundLocalTrabalho){
  		if (err) {
    		return res.negotiate(err);
  		}

  		console.log(foundLocalTrabalho);

  		if(foundLocalTrabalho){
  			input.user.locaisDeTrabalho.add(foundLocalTrabalho.id);
  		}
  		else{
  			input.user.locaisDeTrabalho.add({nome:input.localtrabalho});
  		}

  		input.user.save(function(err) {});
  	});
  }
};

