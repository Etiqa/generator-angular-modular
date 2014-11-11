(function(app) {
    'use strict';

    angular.module('<%= appName %>.<%= name %>', [
    <% if(uiRouter){ %>'ui.router',<%} %>
    ]);


}());