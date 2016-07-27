/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs :: http://sailsjs.org/#!documentation/models
*/
module.exports = {
	attributes: {
		name:{
			type:'string',
			required: true
		},
		email: {
			type: 'email',
			required: true,
			unique: true
		},
		password: {
			type: 'string',
			required: true
		},

		// Add a reference to Pets
	    crms: {
	      collection: 'crm',
	      via: 'owner',
	    },

	    // Add a reference to Pets
	    especialidades: {
	      collection: 'especialidade',
	      via: 'owner',
      	  dominant: true
	    },

	    // Add a reference to Pets
	    locaisDeTrabalho: {
	      collection: 'localdetrabalho',
	      via: 'owner',
      	  dominant: true
	    },

	    consultas: {
	      collection: 'consulta',
	      via: 'medico'
	    }
	},
	/**
	* Create a new user using the provided inputs,
	* but encrypt the password first.
	*
	* @param {Object} inputs
	* • name {String}
	* • email {String}
	* • password {String}
	* @param {Function} cb
	*/
	signup: function (inputs, cb) {
		// Create a user
		User.create({
			name: inputs.name,
			email: inputs.email,
			// TODO: But encrypt the password first
			password: inputs.password
		})
		.exec(cb);
	},
	/**
	* Check validness of a login using the provided inputs.
	* But encrypt the password first.
	*
	* @param {Object} inputs
	* • email {String}
	* • password {String}
	* @param {Function} cb
	*/
	attemptLogin: function (inputs, cb) {
		// Create a user
		User.findOne({
		email: inputs.email,
		// TODO: But encrypt the password first
		password: inputs.password
		})
		.exec(cb);
	}
};

