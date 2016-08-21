/**
 * LoginControllerController
 *
 * @description :: Server-side logic for managing Logincontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `LoginControllerController.login()`
   */
  login: function (req, res) {

  	if(req.session.me != undefined){
      console.log("User is logged Going to Consultas");
      return res.redirect("/consultas");
    }
  		

 	return res.view("user/login");

  },

  nova_consulta: function (req, res) {

  	if(req.session.me != undefined)
  		return res.view("user/nova_consulta",{
                      layout: 'templates/template'
                  });

 	return res.redirect("/");

  },

  consultas: function (req, res) {

  	if(req.session.me != undefined){
      console.log("Going to Consultas");
      return res.view("user/consultas", {
                        layout: 'templates/template'
                    });
    }
  	

 	return res.redirect("/");

  }

};

