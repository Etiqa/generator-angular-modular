(function(app) {
    'use strict';
    <% if(uiRouter){ %>
    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('<%= name %>', {
            url: '/<%= url %>',
            views: {
                'main': {
                    controller: '<%= name %>Controller',
                    templateUrl: '<%= name %>/<%= name %>.tpl.html'
                }
            },
            data:{ pageTitle: '<%= name %>' }
        });
    }]);
    <%} %>
    app.controller('<%= name %>Controller', ['$scope', function ($scope) {

        var init = function() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.
        };

        init();
    }]);

}(angular.module('<%= appName %>.<%= name %>', [
<% if(uiRouter){ %>'ui.router',<%} %>
])));