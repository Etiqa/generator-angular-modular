(function(app){
    'use strict';

        /*
         * App configuration
         */
        <% if(uiRouter){ %>
        function configFn($stateProvider, $urlRouterProvider){
            $urlRouterProvider.otherwise('home');
        }
        <%} %>
        /*
         * App controller
         */
        function Controller($rootScope, $state){

            // Function declarations

            // ...

        }

        // Use prototype and controller instead $scope

        app<% if(uiRouter){ %>
            .config(['$stateProvider', '$urlRouterProvider', configFn ])<%} %>
            .controller('AppController', ['$rootScope', '$state', Controller ]);

}(angular.module('<%= appName%>', [
    <% if(animateModule){ %>'ngAnimate',<%} %>
    <% if(uiRouter){ %>'ui.router.state',
    'ui.router',<%} %>
    <% if(resourceModule){ %>'ngResource',<%} %>
    <% if(cookiesModule){ %>'ipCookie',<%} %>
    <% if(sanitizeModule){ %>'ngSanitize',<%} %>
    <% if(touchModule){ %>'ngTouch',<%} %>
    'templates-app',
    'templates-common'
])));
