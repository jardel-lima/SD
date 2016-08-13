/**
 * CRM.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
 
  tableName:'CRM',
  autoCreatedAt:false,
  autoUpdatedAt:false,
  attributes: {
	
    crm: {
  		type: 'string',
  		primaryKey:true,
      columnName:'CRM'
  	},

	// Add a reference to User
    owner: {
      model: 'user',
      columnName:'Medico_cpf'
    }

  },

  newCrm: function( input){
  	console.log("Add CRM");
  	CRM.create({crm: input.crm,
  				owner:input.id}).exec(
	  				function cb (err, crm) {
						if (err) return res.negotiate(err);
					}
  				);
  }
  				
};

