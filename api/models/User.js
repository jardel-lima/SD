/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs :: http://sailsjs.org/#!documentation/models
*/
module.exports = {
	//connection: 'mysqlServer',
	tableName:'Medico',
	autoCreatedAt:false,
	autoUpdatedAt:false,
	attributes: {

		name:{
			type:'string',
			required: true,
			columnName:'name'
		},

		cpf:{
			type:'string',
			size:11,
			required: true,
			primaryKey: true,
			columnName:'cpf'
		},
		
		email: {
			type: 'email',
			required: true,
			unique: true,
			columnName:'email'
		},

		password: {
			type: 'string',
			required: true,
			columnName:'password'
		},

		// Add a reference to Pets
	    crms: {
	      collection: 'crm',
	      via: 'owner',
	    },
		
	    // Add a reference to Pets
	    especialidades: {
	      collection: 'especialidade',
	      via: 'medico',
      	  through:'medicoespecialidade'
	    },

	    // Add a reference to Pets
	    locaisDeTrabalho: {
	      collection: 'localdetrabalho',
	      via: 'medico',
      	  through:'medicolocaltrabalho'
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
			cpf:inputs.cpf,
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
		email: inputs.email/*,
		// TODO: But encrypt the password first
		password: inputs.password*/
		})
		.exec(cb);
	}
};

