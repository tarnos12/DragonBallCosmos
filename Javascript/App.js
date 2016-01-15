'use strict';

var dbcapp = angular.module(
    'DBC',
    [
        'ui.bootstrap',
        'ngRoute',
        'ngSanitize',
        'ui.select'
    ]
);

dbcapp.config(function ($routeProvider, $locationProvider) {
	$routeProvider
    .when('/changelog',
    {
    	templateUrl: 'Views/changelog.html',
    	controller: 'ChangelogController',
    	controllerAs: 'cl'
    })
    .when('/menu',
    {
    	templateUrl: 'Views/menu.html',
    	controller: 'MenuController',
    	controllerAs: 'menuCtrl'
    })
	.when('/',
    {
    	templateUrl: 'Views/menu.html',
    	controller: 'MenuController',
    	controllerAs: 'menuCtrl'
    });

});