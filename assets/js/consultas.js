var app = angular.module('consultas',['ngCookies']);
//var consultasList = [1,2,3,5];
//var dateFormat = require('dateformat');
app.controller('consultasController', /*[/*'$cookies','$http',/*'$filter','$scope', */function($scope,$http,$cookies,$interval){
	
	$scope.consultaList = [];
	$scope.qtdMsg = 0;
	$scope.modal_body = '';
	$scope.modal_tile = 

	

	$scope.nova_consulta = function(){
		console.log("Nova Consulta");
		location.assign("https://localhost:443/nova_consulta")
		console.log("OK");
				
	};
	$scope.loadConsulta = function(id){
		console.log(id);
		$cookies.put('consultaId',id);
		location.assign("https://localhost:443/nova_consulta");
	};

	init = function(){
		$http.post('/get_consultas')
		.success(function(data, status, headers, config){
			
			if(data.length>0){
				console.log(data);
				console.log(data[0]);
				var paciente = data[0].paciente ;
				console.log(paciente.nome);
				$scope.consultaList = data;
				console.log($scope.consultaList);

				for(var i = 0; i < data.length ; i++){
					
					if(data[i].msg)
						$scope.qtdMsg++;
				}

				if($scope.qtdMsg>0){
					$scope.modal_title = "Atenção";
					$scope.modal_body = "Você tem "+$scope.qtdMsg+" Mensagens."
					$("#alert_modal").modal('show') ;
				}		
			}
		})
		.error(function(data, status, headers, config) {
			console.log(data);

		});
	};

	init();

	$interval(function(){
		console.log("Checking for new msg");
		$http.post('/get_number_msg')
		.success(function(data, status, headers, config){
			console.log(data);
			if(data.qtd > $scope.qtdMsg){
				init();
			}
		})
		.error(function(data, status, headers, config) {
			console.log(data);

		});
	},1*60*1000,5);

	

});
