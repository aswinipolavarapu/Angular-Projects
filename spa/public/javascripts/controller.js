var app = angular.module('myApp',['ngRoute', 'zingchart-angularjs', 'angularUtils.directives.dirPagination']);

//alert('hiiiiiiiii');

app.config(function($routeProvider) {
   // alert('hiiiiiiiii');
    $routeProvider
        .when('/', {
            templateUrl : 'home.html',
            controller : 'homeController'
        })
        .when('/todopagination', {
            templateUrl : 'todopagination.html',
            controller  : 'todopaginationController'
        })

        .when('/graph', {
            templateUrl : 'graph.html',
            controller  : 'graphController'
        })

        .when('/normalmsg', {
            templateUrl : 'normalmsg.html',
            controller  : 'normalmsgController'
        })


        .otherwise({redirectTo: '/'});
});

app.controller('homeController', function($scope) {
    $scope.message = 'Welcome to the Single Page Application';
});

app.controller('todopaginationController', function($scope, $http) {
    /*$scope.facts = [
        { title : "The Earth revolves around the sun."},
        { title : "The Earth revolves around the sun."},
        { title : "The Earth revolves around the sun."},
        { title : "The Earth revolves around the sun."},
        { title : "The Earth revolves around the sun."},
        { title : "The Earth revolves around the sun."},
        { title : "The Earth revolves around the sun."},
        { title : "The Earth revolves around the sun."},
        { title : "The Earth revolves around the sun."},
        { title : "The Earth revolves around the sun."},
        { title : "The Earth revolves around the sun."},
        { title : "The Earth revolves around the sun."},
        { title : "The Earth revolves around the sun."},
        { title : "The Earth revolves around the sun."},
        { title : "The Earth revolves around the sun."},
        { title : "The Earth revolves around the sun."},
        { title : "The Earth revolves around the sun."},
        { title : "The Earth revolves around the sun."}
    ];*/


    var refresh = function () {
        $http.get('/todotasklist').then(function(res) {
            //console.log(res.data);
            //console.log('hai');
            $scope.tasklist = res.data;
            $scope.task = {};
        });
    };

    refresh();

    $scope.addTask = function(valid) {
        if(valid){
            console.log($scope.task.info);
            $http(
                {
                    method: 'POST',
                    url: '/todotasklist',
                    data: $scope.task
                }).then(function (response) {
                $scope.task = "";
                console.log('POST Response: ' + response.statusText);
                refresh();
            });
        }
    };


    $scope.removeTask = function(id){
        console.log("remove function");
        console.log(id);
        $http({
            method: 'delete',
            url: '/todotasklist/'+id,
            data: $scope.task
        }).then(function(response) {
            $scope.task = response.data;
            refresh();
        });
    };

    $scope.editTask = function(id){
        console.log(id);
        $http({
            method: 'get',
            url: '/todotasklist/'+id,
            data: $scope.task
        }).then(function(response) {
            $scope.task = response.data;
        });
    };

    $scope.updateTask = function(valid){
        if(valid){
            $http({
                method: 'put',
                url: '/todotasklist/'+ $scope.task._id,
                data: $scope.task
            }).then(function(response) {
                refresh();
            });
        }

    };
});


app.controller('graphController', function($scope) {
    console.log("hello graph controller");
    $scope.myJson = {
        type : 'line',
        series : [
            { values : [10, 20, 30 ,40] },
            { values : [50, 60 ,70 ,80] }
        ]
    };
});

app.controller('normalmsgController',['$scope','$http','$window', function($scope,$http,$window) {

   $scope.message = 'Hello Bhavana!';
}]);


app.directive('isActiveNav', [ '$location', function($location) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            scope.location = $location;
            scope.$watch('location.path()', function(currentPath) {
                if('/#' + currentPath === element[0].attributes['href'].nodeValue) {
                    element.parent().addClass('active');
                } else {
                    element.parent().removeClass('active');
                }
            });
        }
    };
}]);
