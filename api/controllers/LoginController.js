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

  	console.log(req.session.me);

  	if(req.session.me != undefined)
  		return res.redirect("/consultas");

 	return res.view("user/login");

    
  }
};

