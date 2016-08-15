/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `UserController.login()`
   */
  login: function (req, res) {
  	
  	console.log("Login");
  	console.log(req.allParams());
  	
     return res.login({
		email: req.param('email'),
		password: req.param('password')
		});
  },


  /**
   * `UserController.logout()`
   */
  logout: function (req, res) {
		// "Forget" the user from the session.
	// Subsequent requests from this user agent will NOT have `req.session.me`.

	req.session.me = null;
	console.log('Logout')
	// If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
	// send a simple response letting the user agent know they were logged out
	// successfully.
	if (req.wantsJSON) {
	return res.ok('Logged out successfully!');
	}
	// Otherwise if this is an HTML-wanting browser, do a redirect.
	return res.redirect('/');
  },

 /* addEspecialidade: function(especialidade, user ,res){
  	Especialidade.addEspecialidade(
		{especialidade:especialidade,
		 user:user
	}, res);
  },*/


  /**
   * `UserController.signup()`
   */
  signup: function (req, res) {

  	
    // Attempt to signup a user using the provided parameters
    console.log("Signup");
    console.log(req.allParams());

	User.signup({
	name: req.param('nome'),
	email: req.param('email'),
	password: req.param('senha'),
	cpf:req.param('cpf')
	}, function (err, user) {
	// res.negotiate() will determine if this is a validation error
	// or some kind of unexpected server error, then call `res.badRequest()`
	// or `res.serverError()` accordingly.
	

		if (err){
			console.log("Erro: "+err);
			return res.view('user/signup',{erro:"Email já Cadastrado"});
		}
		 
		// Go ahead and log this user in as well.
		// We do this by "remembering" the user in the session.
		// Subsequent requests from this user agent will have `req.session.me` set.
		req.session.me = user.cpf;
		// If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
		// send a 200 response letting the user agent know the signup was successful.

		CRM.newCrm(
			{crm:req.param('crm'),
			 id:user.cpf
		});

		//UserController.addEspecialidade(req.param('especialidade'), user ,res);

		Especialidade.addEspecialidade(
			{especialidade:req.param('especialidade'),
			user:user}, res);

		LocalDeTrabalho.addLocalTrabalho({nome:req.param('local'),user:user},res); 


 		}
	);
	}
};

