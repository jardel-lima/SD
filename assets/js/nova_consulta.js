var app = angular.module('novaConsulta',['ngCookies']);
//var dateFormat = require('dateformat');
var consulta_id = null;

app.controller('novaConsultaController', function($scope,$http,$filter,$cookies){
	
	var paciente_cpf = null;
	
	var prescricao_id = [];
	var qtdMed = 1;


	var date = new Date();
	$scope.edit_paciente = false;
	$scope.update_paciente = false;
	$scope.localList = []
	$scope.msg_paciente = false;
	
	$scope.edit_consulta = false;
	$scope.update_consulta = false;

	$scope.edit = false;
	$scope.update = false;
	$scope.show_consulta = false;
	$scope.show_prescricoes = false;

	$scope.modal_title = "Atenção";
	$scope.modal_body = "Algo errado";

	$scope.adicionar = false;

	$scope.cData = $filter('date')( date ,'dd/MM/yyyy');
	$scope.rDate  = $filter('date')(date.setMonth(date.getMonth()+6),'dd/MM/yyyy');
	
	$scope.showModal = function(id){
		$("#"+id).modal('show') ;
	};

	

	$scope.collapsePanel = function(panelId, iconId, show){
		var element = document.getElementById(panelId);
		
		if(show)
			element.classList.toggle('in');

		if(element.classList.contains('in')){
			document.getElementById(iconId).classList.remove("glyphicon-menu-down");
			document.getElementById(iconId).classList.add("glyphicon-menu-up");
		}else{
			document.getElementById(iconId).classList.remove("glyphicon-menu-up");
			document.getElementById(iconId).classList.add("glyphicon-menu-down");
		}
	};

	$scope.pSalvar = function(){
	
		//console.log(date);
		var pNasc = $scope.pNasc? $scope.pNasc.split('/'): '01/01/01';
		pNasc = pNasc[2]+'-'+pNasc[1]+'-'+(Number(pNasc[0])+1);
		//console.log(typeof(parseInt($scope.pNumero)));

		var parameters = JSON.stringify({ pNome:$scope.pNome,
			 pEmail:$scope.pEmail,
			 pRG:$scope.pRG,
			 pCPF:$scope.pCPF,
			 pTelefone:$scope.pTelefone,
			 pEstado:$scope.pEstado,
			 pCidade:$scope.pCidade,
			 pBairro:$scope.pBairro,
			 pRua:$scope.pRua,
			 pNumero:$scope.pNumero,
			 pCEP:$scope.pCEP,
			 pNas:pNasc});

			console.log(parameters);

			$http.post("/novo_paciente", parameters).
				success(function(data, status, headers, config) {
					// this callback will be called asynchronously
					// when the response is available
					//console.log(data);
					console.log("Novo Paciente: 0K");
					paciente_cpf = data.paciente_id;
					$scope.edit_paciente = true;
					$scope.show_consulta = true;
					document.getElementById('panelConsulta').scrollIntoView();
					$scope.collapsePanel('panelConsulta','iconConsulta',$scope.show_consulta);
					
					console.log(paciente_cpf);
				  }).
				  error(function(data, status, headers, config) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.modal_title = "ERRO";
					console.log(data);
					$scope.modal_body = "Erro ao Cadastrar Paciente!!! Campos incorretos ou email já cadastrado!!!";
					$scope.showModal('alert_modal');
					
					//
				  });
	};

	$scope.cSalvar = function(){
	
		//console.log(date);
		var rDate = $scope.rDate;
		if(rDate.length>0){
			rDate = $scope.rDate.split('/');
			rDate = rDate[2]+'-'+rDate[1]+'-'+(Number(rDate[0])+1);
		}



		var parameters = JSON.stringify({ 
			cLocal: $scope.cLocal,
			pTemp: $scope.pTemp,
			pPeso: $scope.pPeso,
			pAlt: $scope.pAlt,
			cObs: $scope.cObs,
			cDiag: $scope.cDiag,
			cDateR: rDate,
			acomp:$scope.acomp?true:false,
			paciente: paciente_cpf});

			console.log(parameters);
			
			$http.post("/nova_consulta", parameters).
				success(function(data, status, headers, config) {
					// this callback will be called asynchronously
					// when the response is available
					console.log(data);
					consulta_id = data.consulta_id;
					$scope.show_prescricoes = true;
					$scope.edit_consulta = true;
					document.getElementById('panelConsulta').scrollIntoView();
					$scope.collapsePanel('panelPrescricoes','iconPrescricoes',$scope.show_prescricoes);
					console.log("Nova Consulta: 0K");
				
				  }).
				  error(function(data, status, headers, config) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					console.log("Login Error");
					$scope.modal_title = "ERRO";
					console.log(data);
					$scope.modal_body = "Erro ao Cadastrar Consulta!!!\n Verifique os campos.";
					$scope.showModal('alert_modal');
					//
				  });
	};

	$scope.pLocalizar = function(){
	
		//console.log(date);
		var parameters = JSON.stringify({ 
			pCpf:$scope.pCPF}
			);

			console.log(parameters);

			$http.post("/pesquisar_paciente", parameters).
				success(function(data, status, headers, config) {
					// this callback will be called asynchronously
					// when the response is available
					console.log(status)
					console.log(data);
					if(data){
						$scope.pNome = data.nome;
						$scope.pEmail = data.email;
						$scope.pRG  = data.rg;
						$scope.pCPF  = data.cpf;
						$scope.pTelefone = data.telefone;
						$scope.pEstado = data.estado;
						$scope.pCidade = data.cidade;
						$scope.pBairro = data.bairro;
						$scope.pRua = data.rua;
						$scope.pNumero = data.numero;
						$scope.pCEP = data.cep;
						$scope.pNasc = $filter('date')(data.nascimento,'dd/MM/yyyy');
						paciente_cpf = data.cpf;
						$scope.edit_paciente = true;
						$scope.show_consulta = true;
						$scope.collapsePanel('panelConsulta','iconConsulta',$scope.show_consulta);
						document.getElementById('panelConsulta').scrollIntoView();
							
					}else{
						$scope.modal_title = "ATENÇÃO";
						console.log(data);
						$scope.modal_body = "CPF não encontrado!!!\n";
						$scope.showModal('alert_modal');
					}
					

				}).
				error(function(data, status, headers, config) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					//
				});
	};

	$scope.prAdcionar = function(id){
		//console.log($scope['prMedicamento'+id]);
		console.log(id);
		var parameters = JSON.stringify({ 
			medicamento: $scope['prMedicamento'+id],
			concentracao: $scope['prConcentracao'+id],
			dosagem: $scope['prDosagem'+id],
			dosagem_tipo: $scope['prDosagemTipo'+id],
			turno_matutino: $scope['prMatutino'+id]?true:false,
			turno_vespertino: $scope['prVespertino'+id]?true:false,
			turno_noturno: $scope['prNoturno'+id]?true:false,
			periodo: $scope['prPeriodo'+id],
			periodo_tipo: $scope['prPeriodoTipo'+id],
			duracao: $scope['prDuracao'+id],
			duracao_tipo: $scope['prDuracaoTipo'+id],
			obs:$scope['prObs'+id],
			consulta: consulta_id,
		});

			console.log(parameters);
			
			if(id !=1)
				return null;

			$http.post("/adcionar_prescricao", parameters).
				success(function(data, status, headers, config) {
					// this callback will be called asynchronously
					// when the response is available
					console.log("Prescrição Adcionada!");
					disablePrescricao(id);
					$scope.adicionar = true;
					 $( "#prSalvar"+id ).hide();

				}).
				error(function(data, status, headers, config) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.modal_title = "ERRO";
					console.log(data);
					$scope.modal_body = "Erro ao Cadastrar Prescrição!!!\n Verifique os campos";
					$scope.showModal('alert_modal');
					console.log("Erro!!!");
				});
	};

	$scope.voltar = function(){
		location.assign('/consultas');
	};

	$scope.addMecicamento =  function(){
		qtdMed++;

		var objPai = document.getElementById("prPai");
		//Criando o elemento DIV;
		//var objFilho = document.createElement("div");
		//Definindo atributos ao objFilho:
		//objFilho.setAttribute("id","prFilho"+qtdMed);

		//Inserindo o elemento no pai:
		//objPai.appendChild(objFilho);
		//Escrevendo algo no filho recém-criado:
		
		//document.getElementById("prFilho"+qtdMed).innerHTML =  new_med;
		var new_med =
		"<div class='panel-group'>"+
			"<div class='panel panel-primary' style ='border-color:green;'>"+
				"<div class='panel-heading'  style='background-color:green' ng-click='collapsePanel('med"+qtdMed+"','iconMed"+qtdMed+"')'>Medicamento "+
					"<span id='iconMed"+qtdMed+"' class='glyphicon glyphicon-menu-up' aria-hidden='true'></span>"+
				"</div>"+
		 		"<div id='med"+qtdMed+"' class='panel-body panel-collapse collapse in'>"+
		 			"<div class='col-md-12'>"+
				  		"<form>"+
		 					"<fieldset id='fieldset"+qtdMed+"'>"+
					  			"<div calss='row'>"+
					  				//"<div class='col-md-12'>"+
						  				"<div class='col-md-8'>"+
											"<div class='input-group'>"+
												"<span class='input-group-addon'>Nome</span>"+
												"<input  id='prMedicamento"+qtdMed+"' class='form-control class"+qtdMed+"'  required type='text' ng-model='prMedicamento"+qtdMed+"' ng-disabled='edit'>"+
										    "</div>"+			
										"</div>"+
										"<div class='col-md-4'>"+
										   	"<div class='input-group'>"+
										   		"<span class='input-group-addon'>Concentração</span>"+
										   		"<input id='prConcentracao"+qtdMed+"' class='form-control class"+qtdMed+"' ng-model='prConcentracao1' type='text' ng-disabled='edit'>"+
										   	"</div>"+
										"</div>"+
									//"</div>"+	
								"</div></br></br>"+
								"<div class='row'>"+
									"<div class='col-md-12'>"+
										"<div class='col-md-2'>"+
									    	"<div class='input-group'>"+
									      		"<span class='input-group-addon'>Dosagem</span>"+
									      		"<input id='prDosagem"+qtdMed+"'  class='form-control class"+qtdMed+"' required ng-model='prDosagem"+qtdMed+"' type='text' ng-disabled='edit'>"+
											"</div>"+   
										"</div>"+
										"<div class='col-md-2'>"+
										   	"<select id='prDosagemTipo"+qtdMed+"' ng-model='prDosagemTipo"+qtdMed+"' class='form-control class"+qtdMed+"' ng-disabled='edit'>"+
										      "<option value='unidades'>unidades</option>"+
										      "<option value='ml'>ml</option>"+
										      "<option value='colheres'>colheres</option>"+
										   	"</select>"+	
										"</div>"+
										"<div class='col-md-8'>"+
											"<div class='form-group'>"+
										  		"<label class='col-md-2 control-label'>Turno:</label>"+
												"<div class='col-md-6'>"+
										   			"<label class='checkbox-inline'>"+
													"<input id='prMatutino"+qtdMed+"' ng-model='prMatutino"+qtdMed+"' type='checkbox' ng-disabled='edit'>"+
										      					"Matutino"+
											    	"</label>"+
										    		"<label class='checkbox-inline' >"+
											      		"<input id='prVespertino"+qtdMed+"' ng-model='prVespertino"+qtdMed+"' type='checkbox' ng-disabled='edit'>"+
											      		"Vespertino"+
											    	"</label>"+
											    	"<label class='checkbox-inline'>"+
											    		"<input id='prNoturno"+qtdMed+"' ng-model='prNoturno"+qtdMed+"' type='checkbox' ng-disabled='edit'>"+
											      				"Noturno"+
											    	"</label>"+
											  	"</div>"+
											"</div>"+
										"</div>"+
									"</div>"+
								"</div>"+
								"</br>"+
								"<div class='row'>"+
									"<div class='col-md-12'>"+
										"<div class='col-md-3'>"+
										   	"<div class='input-group'>"+
											    "<span class='input-group-addon'>A cada</span>"+
											    "<input id='prPeriodo"+qtdMed+"' ng-model='prPeriodo"+qtdMed+"' class='form-control class"+qtdMed+"' required type='text' ng-disabled='edit'>"+
											"</div>"+
										"</div>"+
										"<div class='col-md-3'>"+
											"<div class='form-group'>"+
												"<select id='prPeriodoTipo"+qtdMed+"' ng-model='prPeriodoTipo"+qtdMed+"' class='form-control class"+qtdMed+"' ng-disabled='edit'>"+
													"<option value='horas'>horas</option>"+
													"<option value='dias'>dias</option>"+
													"<option value='semanas'>semanas</option>"+
												"</select>"+
											"</div>"+
										"</div>"+
										"<div class='col-md-3'>"+
										   	"<div class='input-group'>"+
										   		"<span class='input-group-addon'>Duração</span>"+
										      		"<input id='prDuracao"+qtdMed+"' ng-model='prDuracao"+qtdMed+"' class='form-control class"+qtdMed+"' required type='text' ng-disabled='edit'>"+
											"</div>"+
										"</div>"+
										"<div class='col-md-3'>"+
											"<div class='form-group'>"+
										    	"<select id='prDuracaoTipo"+qtdMed+"' ng-model='prDuracaoTipo"+qtdMed+"' class='form-control class"+qtdMed+"' ng-disabled='edit'>"+
										      		"<option value='vezes'>vezes</option>"+
										      		"<option value='dias'>dias</option>"+
										      		"<option value='meses'>meses</option>"+
										      		"<option value='anos'>anos</option>"+
										    	"</select>"+
										 	"</div>"+
										"</div>"+
									"</div>"+
								"</div>"+
								"<div class='row'>"+
									"<div class='col-md-12'>"+
										"<div class='form-group' >"+
									  		"<label class='col-md-2 control-label'>Observações</label>"+
									  		"<div class='col-md-10'> "+                    
									    		"<textarea id='prObs"+qtdMed+"'style='width: 100%; height: 150px;' class='form-control class"+qtdMed+"' ng-model='prObs"+qtdMed+"' ng-disabled='edit'></textarea>"+
									  		"</div>"+
										"</div>"+
									"</div>"+
								"</div>"+
								//"</br>"+

							"</fieldset>"+ 
					   	"</form>"+

						"<div class='row'>"+
							"<div class='col-md-12'>"+
								"<button id='prSalvar"+qtdMed+"' class='btn btn-default' onclick='prAdcionar("+qtdMed+")' ng-hide='edit || update'>Salvar</button>"+
									  			"<!--<button  class='btn btn-default' ng-click='' ng-hide='!update'>Atualizar</button>"+
									  			"<button id='prSalvar1' class='btn btn-default' ng-click='' ng-hide='!edit' hide >Apagar</button>-->"+
							"</div>"+
						"</div>"+
					"</div>"+
				"</div>"+
			"</div>"+
		"</div>"+
	"</br></br>";

		$("#prPai").append(new_med);
		
	};

	$scope.updatePaciente = function(){
		console.log("Updating Paciente");
		var pNasc = $scope.pNasc.split('/');
		pNasc = pNasc[2]+'-'+pNasc[1]+'-'+(Number(pNasc[0])+1);
		//console.log(typeof(parseInt($scope.pNumero)));

		var update ={
			nome: $scope.pNome,
      		email: $scope.pEmail,
      		rg: $scope.pRG,
      		cpf: $scope.pCPF,
      		telefone: $scope.pTelefone,
      		estado: $scope.pEstado,
      		cidade: $scope.pCidade,
      		bairro: $scope.pBairro,
      		rua: $scope.pRua,
      		numero: $scope.pNumero,
      		cep: $scope.pCEP,
      		nascimento:pNasc
  		};

		var parameters = JSON.stringify({ 
			cpf : paciente_cpf,
			update : update
		});

		console.log(parameters);

		$http.post("/update_paciente", parameters).
			success(function(data, status, headers, config) {
				console.log("Updating Paciente: 0K");
				
				$scope.edit_paciente = true;
				$scope.show_consulta = true;
				
			}).
			error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				$scope.modal_title = "ERRO";
				console.log(data);
				$scope.modal_body = "Erro ao Atualizar Paciente!!!\n Verifique os campos";
				$scope.showModal('alert_modal');
				
				//
			});
	};

	$scope.updateConsulta = function(){
		console.log("Updating Consulta");

		var rDate = $scope.rDate;
		if(rDate.length>0){
			rDate = $scope.rDate.split('/');
			rDate = rDate[2]+'-'+rDate[1]+'-'+(Number(rDate[0])+1);
		}

		var update = {
			local: $scope.cLocal,
			temperatura: $scope.pTemp,
			peso: $scope.pPeso,
			altura: $scope.pAlt,
			obs: $scope.cObs,
			diag: $scope.cDiag,
			data_revisao: rDate,
			paciente: paciente_cpf,
			acomp:$scope.acomp?true:false
		}

		var parameters = JSON.stringify({ 
			id: consulta_id,
			update:update
		});

		console.log(parameters);

		$http.post("/update_consulta", parameters).
			success(function(data, status, headers, config) {
				console.log("Updating Consulta: 0K");
				
				$scope.edit_consulta = true;
				
			}).
			error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				$scope.modal_title = "ERRO";
				console.log(data);
				$scope.modal_body = "Erro ao Atualizar Consulta!!!\n Verifique os campos";
				$scope.showModal('alert_modal');
				
				//
			});
	};

	$scope.closeMsg = function(){
		console.log("Close Mensage");
		$scope.msg_paciente = null;
		var parameters = JSON.stringify({id: consulta_id});

		$http.post("/close_msg", parameters).
			success(function(data, status, headers, config) {
				console.log("Closing Mensage: 0K");
				
				
			}).
			error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				$scope.modal_title = "ERRO";
				console.log(data);
				$scope.modal_body = "Erro ao Fechar Mensagem!!!";
				$scope.showModal('alert_modal');
				
				//
			});
	}

	disablePrescricao = function(id){
		document.getElementById('prMedicamento'+id).disabled = true;
		document.getElementById('prConcentracao'+id).disabled = true;
		document.getElementById('prDosagem'+id).disabled = true;
		document.getElementById('prDosagemTipo'+id).disabled = true;
		document.getElementById('prMatutino'+id).disabled = true;
		document.getElementById('prVespertino'+id).disabled = true;
		document.getElementById('prNoturno'+id).disabled = true;
		document.getElementById('prPeriodo'+id).disabled = true;
		document.getElementById('prPeriodoTipo'+id).disabled = true;
		document.getElementById('prDuracao'+id).disabled = true;
		document.getElementById('prDuracaoTipo'+id).disabled = true;
		document.getElementById('prObs'+id).disabled = true;
	};

	loadPaciente = function(data){
		paciente_cpf = data.cpf;
		$scope.pNome = data.nome;
		$scope.pEmail = data.email;
		$scope.pRG = data.rg;
		$scope.pCPF = data.cpf;
		$scope.pTelefone = data.telefone;
		$scope.pEstado = data.estado;
		$scope.pCidade = data.cidade;
		$scope.pBairro = data.bairro;
		$scope.pRua = data.rua;
		$scope.pNumero = data.numero;
		$scope.pCEP = data.cep;
		$scope.pNasc = $filter('date')(new Date(data.nascimento),'dd/MM/yyyy');
	};

	loadPrescricao = function(data, id){
		//console.log(data);
		//$scope['prMedicamento'+id] = "test";
		prescricao_id.push(data.id)
		$('#prMedicamento'+id).val(data.medicamento);
		$('#prConcentracao'+id).val(data.concentracao);
		$('#prDosagem'+id).val(data.dosagem);
		$('#prDosagemTipo'+id).val(data.dosagem_tipo);
		$('#prMatutino'+id).val(data.turno_matutino);
		$('#prVespertino'+id).val(data.turno_vespertino);
		$('#prNoturno'+id).val(data.turno_noturno);
		$('#prPeriodo'+id).val(data.periodo);
		$('#prPeriodoTipo'+id).val(data.periodo_tipo);
		$('#prDuracao'+id).val(data.duracao);
		$('#prDuracaoTipo'+id).val(data.duracao_tipo);
		$('#prObs'+id).val(data.obs);
	};

	loadConsulta = function(consulta){
		consulta_id = consulta.id;
		$scope.cLocal = consulta.local.nome;
		$scope.pTemp = consulta.temperatura;
		$scope.pPeso = consulta.peso;
		$scope.pAlt = consulta.altura;
		$scope.cObs = consulta.obs;
		$scope.cDiag = consulta.diag;
		$scope.msg_paciente = consulta.msg;
		$scope.rDate = $filter('date')(new Date(consulta.data_revisao),'dd/MM/yyyy');
		$scope.acomp = consulta.acompanhamento;
		$scope.cData = $filter('date')( new Date(consulta.data) ,'dd/MM/yyyy');
	};

	loadData = function (id){
		var parameters = JSON.stringify({ id:id});

		$http.post("/get_consulta_info",parameters).
		success(function(data, status, headers, config) {
			console.log(data);
			console.log("Load Consulta");
			var consulta = data.consulta;

			loadConsulta(data.consulta);

			loadPaciente(consulta.paciente);

			$scope.show_consulta = true;
			
			var presc_n = 0;

			while(presc_n < data.prescricoes.length){
				$scope.show_prescricoes = true;
				console.log(data.prescricoes[presc_n]);
				if(presc_n>0){
					$scope.addMecicamento();
					$("#fieldset"+qtdMed).attr("disabled", "disabled");
					$( "#prSalvar"+qtdMed ).hide();
				}else
					$( "#prSalvar"+1 ).hide();
				loadPrescricao(data.prescricoes[presc_n], presc_n+1);
				$( "#prSalvar"+id ).hide();
				presc_n++;
			}

			
		  }).
		  error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
			console.log("Login Error");
			console.log(data);
			//
		  });

	};
	
	init = function(){
		var id = $cookies.get('consultaId');
		console.log("id:"+id); 
		if(id){
			$cookies.remove('consultaId');
			console.log("Getting Consulta")
			$scope.edit = true;
			$scope.edit_paciente = true;
			$scope.edit_consulta = true;
			
			loadData(id);
		}
		$http.post("/get_locais_trabalho").
		success(function(data, status, headers, config) {
			
			console.log("Local Trabalho");
			console.log(data);
			$scope.localList = data;
			/*for(var i ; i < data.length; i++){
				$scope.localList.push(data[i].nome);
			}*/
			console.log($scope.localList);
		  }).
		  error(function(data, status, headers, config) {
		
		  });
	};

	iniciarPacienteTest = function(){
		$scope.pNome = 'test';
		$scope.pEmail  = 'test@test.com';
		$scope.pRG  = '123456';
		$scope.pCPF  = '123456';
		$scope.pTelefone = '123456';
		$scope.pEstado = 'BA';
		$scope.pCidade = 'test';
		$scope.pBairro = 'test';
		$scope.pRua = 'test';
		$scope.pNumero = 123;
		$scope.pCEP = '123456';
		$scope.pNasc = '12/03/1991';
	};

	iniciarConsultaTest = function(){
		$scope.cLocal = 'Unimed';
		$scope.pTemp = '27.9';
		$scope.pPeso = '60';
		$scope.pAlt = '1.70';
		$scope.cObs = 'Observação';
		$scope.cDiag = 'Diagnostico';
	};

	init();

	//iniciarConsultaTest();
	//iniciarPacienteTest();

});

 var prAdcionar=function(id){
 	console.log(id);
 	console.log($("prMedicamento"+id).val());
 	var parameters = JSON.stringify({ 
			medicamento: $('#prMedicamento'+id).val(),
			concentracao: $('#prConcentracao'+id).val(),
			dosagem: $('#prDosagem'+id).val(),
			dosagem_tipo: $('#prDosagemTipo'+id).val(),
			turno_matutino: $('#prMatutino'+id).val()?true:false,
			turno_vespertino: $('#prVespertino'+id).val()?true:false,
			turno_noturno: $('#prNoturno'+id).val()?true:false,
			periodo: $('#prPeriodo'+id).val(),
			periodo_tipo: $('#prPeriodoTipo'+id).val(),
			duracao: $('#prDuracao'+id).val(),
			duracao_tipo: $('#prDuracaoTipo'+id).val(),
			obs:$('#prObs'+id).val(),
			consulta: consulta_id
		});

 	console.log(parameters);
 	

 	var xhttp = new XMLHttpRequest();

 	xhttp.onreadystatechange = function() {
	  if (xhttp.readyState == 4 )
	  	if (xhttp.status == 200) 
	  	{
	  	 $("#fieldset"+id).attr("disabled", "disabled");
	  	 $( "#prSalvar"+id ).hide();
	     console.log(xhttp.responseText);
	  	}
	  	else{
	  		alert("Erro ao Cadastrar Prescrição!!!\n Verifique os campos");
	  	}
	};

 	

 	xhttp.open("POST", "/adcionar_prescricao", true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send(parameters);
 	
 	/*.post("/adcionar_prescricao", parameters, function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });*/	

 }