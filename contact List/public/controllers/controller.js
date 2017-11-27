var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination']);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http){

    var refresh = function () {
        $http.get('/contactlist').then(function(res) {
            console.log(res.data);
            console.log('hai');
            $scope.contactlist = res.data;
            $scope.contact = {};
        });
    };

    refresh();


    $scope.addContact = function(valid) {
        if(valid){
            $http(
                {
                    method: 'POST',
                    url: '/contactlist',
                    data: $scope.contact
                }).then(function (response) {
                $scope.contact = "";
                console.log('POST Response: ' + response.statusText);
                refresh();
            });
        }
    };


    $scope.remove = function(id){
        console.log("remove function");
        $http({
            method: 'delete',
            url: '/contactlist/'+id,
            data: $scope.contact
        }).then(function(response) {
            $scope.contact = response.data;
            refresh();
        });
    };

    $scope.edit = function(id){
        console.log("edit function");
        $http({
            method: 'get',
            url: '/contactlist/'+id,
            data: $scope.contact
        }).then(function(response) {
            $scope.contact = response.data;
        });
    };

    $scope.update = function(valid){
        if(valid){
            $http({
                method: 'put',
                url: '/contactlist/'+ $scope.contact._id,
                data: $scope.contact
            }).then(function(response) {
                refresh();
            });
        }

    };

}]);