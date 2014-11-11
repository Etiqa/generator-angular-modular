(function(module) {
    'use strict';

        <% if(uiRouter){ %>
        /*
         * App configuration
         */
        function configFn($stateProvider){
            $stateProvider.state('<%= name %>', {
                url: '/<%= url %>',
                views: {
                    'main': {
                        controller: '<%= name %>Controller as <%= name %>',
                        templateUrl: '<%= name %>/<%= name %>.tpl.html'
                    }
                },
                data:{ pageTitle: '<%= name %>' }
            });
        }
        <%} else {%>
        /*
         * App configuration
         */
        function configFn(){

        }
        <%}%>
        /*
         * App controller
         */
        function Controller () {


            this.pageTitle = '<%= name %>';

        }

        // Use prototype and controller instead $scope
        //
        Controller.prototype.sayHello = function () {
            return 'Welcome to ' + this.pageTitle;
        };




        module<% if(uiRouter){ %>
            .config(['$stateProvider', configFn])<%} else {%>
            .config([configFn])<%}%>
            .controller('<%= name %>Controller', [Controller]);


}(angular.module('<%= appName %>.<%= name %>', [
<% if(uiRouter){ %>'ui.router',<%} %>
])));