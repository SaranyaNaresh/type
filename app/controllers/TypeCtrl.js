

(function () {
    var accountTypeApp = angular.module("accountTypeApp");

    var TypeCtrl = function ($scope, $http)
    {
    	$scope.working = 'Angular is Working';

    	var onError = function (error) {
            $scope.error = error.data;
        };

    	var onTypeGetCompleted = function(response){
    		$scope.types = response.data;
            console.log($scope.types);
    	}
    	

        var refresh = function(){
        	$http.get('/types')
        		.then(onTypeGetCompleted, onError);
        	console.log('Response received...');
        }

        refresh();

        var onGetByIdCompleted = function(response){
            $scope.type = response.data;
            console.log(response.data);
        };

        $scope.searchType = function(id){
            $http.get('/type/' + id)
                    .then(onGetByIdCompleted, onError);
            console.log(id);
        };
        //end get person by Id

        //add new person
        var onAddTypeCompleted = function(response){
            $scope.type = response.data;
            console.log(response.data);
            refresh();
        };
        $scope.addType = function(type){
            $http.post('/addType', type)
                    .then(onAddTypeCompleted, onError);
            console.log(type);
        };

        $scope.deleteType = function(id){
            $http.delete('/deleteType/' + id)
                .then(onAccountTypeDeleteCompleted,  onError);
            console.log(id);
        };

        var onTypeDeleteCompleted = function(response){
            $scope.type = response.data;
            console.log(response.data);
            refresh();
        };
        //end delete person

        //update person
        $scope.updateType = function(type){
            $http.put("/updateType", type)
                .then(onUpdateTypeCompleted, onError);
                    console.log(type);
        };

        var onUpdateTypeCompleted = function(response){
            $scope.type = null;//response.data;
            console.log(response.data);
            refresh();
        };
        //end update person
    }
    accountTypeApp.controller('TypeCtrl', TypeCtrl);
}());