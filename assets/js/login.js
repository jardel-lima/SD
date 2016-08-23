//var alert_ = ;
		//var alertDiv = document.getElementById("alertDiv");
		
		//
/*
		//console.log("Alert: "+alert_);

		var app = angular.module('loginApp', []);
		
		app.controller('loginCtrl', function($scope,$window) {
			$scope.alert = "John";
			/*if($window.alert_.length!=0){
				//$scope.alert = $window.alert;
				//alertDiv.classList.remove("invisible");
			}*/
				
		/*});*/
		
		var formApp = angular.module("loginApp", []);

		formApp.controller('loginCtrl', function($scope,$http) {
			
			$scope.alert = "";
			$scope.email = "";
			$scope.password = "";

			$scope.submit = function(){
				
				if($scope.email.length == 0 || $scope.password.length == 0)
					return;
				var parameter = JSON.stringify({email:$scope.email, password:$scope.password});
				
				console.log(parameter);
				
				$http.post("/login", parameter).
				success(function(data, status, headers, config) {
					// this callback will be called asynchronously
					// when the response is available
					console.log(data);
					console.log("Login: 0K")
					location.assign("https://localhost:443/");
				  }).
				  error(function(data, status, headers, config) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					$scope.alert = data;
					alertDiv.classList.remove("invisible");
					console.log("Login Error");
					$scope.email = "";
					$scope.password = "";
				  });
			
			}			
         });