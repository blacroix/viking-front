'use strict';

angular.module('viking', ['ngRoute', 'viking.ctrl'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {templateUrl: 'view/home.html', controller: 'HomeCtrl'});
        $routeProvider.otherwise({redirectTo: '/home'});
    }]
);
angular.module('viking.ctrl', []);
