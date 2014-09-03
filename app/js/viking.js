'use strict';

angular.module('viking', [
    'ngRoute',
    'highcharts-ng',
    'ngMaterial',
    'btford.socket-io',
    'viking.ctrl'
]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'view/home.html', controller: 'HomeCtrl'});
    $routeProvider.otherwise({redirectTo: '/home'});
}]).factory('$socket', ['socketFactory', function (socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://ec2-54-186-153-191.us-west-2.compute.amazonaws.com:8888')
    });
}]);
angular.module('viking.ctrl', []);
