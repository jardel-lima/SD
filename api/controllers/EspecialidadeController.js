/**
 * EspecialidadeController
 *
 * @description :: Server-side logic for managing Especialidades
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/*addEspecialidade: function(input){
		console.log("Add Especialidade");
	  	Especialidade.findOne({nome:input.especialidade}).exec( function(err,foundEspecialidade){
	  		if (err) {
	    		return null;
	  		}

	  		console.log(foundEspecialidade);

	  		if(foundEspecialidade){
	  			
	  			//input.user.especialidades.add(foundEspecialidade.id);
	        MedicoEspecialidade.addMedicoEspecialidade({especialidade: foundEspecialidade.id,
	        	medico: input.user.cpf}, 
	          function(err, created){
	            if(err)
	              return null;
	          });
	  		}
	  		else{
	  			Especialidade.create({nome:input.especialidade})
	  			.exec(function(err, especialidade){
	          		if (err){
	            		return null;
	          		}
	          
	          		console.log(especialidade);

		          MedicoEspecialidade.addMedicoEspecialidade({especilidade: especialidade.id,
		            medico: input.user.cpf}, 
		            function(err, created){
		              if(err)
		                return null;
		          });

	        });

	       // input.user.especialidades.add({nome:input.especialidade});
	  		}

	     // input.user.save(function(err) {});

	  	});
	}*/
};

