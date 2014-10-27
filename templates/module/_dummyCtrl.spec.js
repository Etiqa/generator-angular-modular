describe('<%= name %>Controller', function () {
    'use strict';

    describe('is a dummy controller', function () {
        var ctrl = angular.module('<%= appName %>.<%= name %>');

        it('should pass a dummy test', inject(function () {
            expect(true).toBeTruthy();
        }));
    });
});

