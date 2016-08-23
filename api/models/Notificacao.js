/**
 * Notifificacao.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	tableName:'Notificacao',
  	autoCreatedAt:false,
  	autoUpdatedAt:false,
	attributes: {
		id:{
			type:'interger',
		    autoIncrement:true,
		    primaryKey:true
		},

		id_consulta:{
			type:'interger'
		},

		id_prescricao:{
			//model:'prescricao'
			type:'interger'
		},

		id_sender:{
			type:'string'
		},

		id_receiver:{
			type:'string'
		},

		seen:{
			type:'boolean'
		},

		msg:{
			type:'string'
		}
  	},

  	get_messages : function(id,cb){
  		//Notificacao.find({id_receiver})
  	}
};

