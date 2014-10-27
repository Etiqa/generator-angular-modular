(function(app){
    'use strict';
    <% if(uiRouter){ %>
        app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
            $urlRouterProvider.otherwise('home');
        }]);
    <%} %>
    app.controller('AppController', ['$rootScope', '$scope', '$state',
        function($rootScope, $scope, $state){
        /**
         * This function is executed on controller starts; if the user tries to access to a restricted page,
         * we send him to the login page
         */
        function init(){

        }
        init();
    }]);
}(angular.module('<%= appName%>', [
    <% if(animateModule){ %>'ngAnimate',<%} %>
    <% if(uiRouter){ %>'ui.router.state',
    'ui.router',<%} %>
    <% if(resourceModule){ %>'ngResource',<%} %>
    <% if(cookiesModule){ %>'ipCookie',<%} %>
    <% if(sanitizeModule){ %>'ngSanitize',<%} %>
    <% if(touchModule){ %>'ngTouch'<%} %>
])));
