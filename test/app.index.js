var expect = require('chai').expect,
    Generator = require('../generators/app/index.js'),
    ModuleGenerator = require('../generators/module/index.js'),
    fs = require('fs'),
    path = require('path'),
    helpers = require('yeoman-generator').test,
    generator,
    moduleGenerator;

    before(function(done) {
        helpers
            .testDirectory(path.join(__dirname, 'tmp'), function(err) {
                if (err) {
                    done(err);
                }
                generator = helpers.createGenerator(
                    'ngModular:app', 
                    ['../../generators/app'],
                    false,
                    {
                    	'skip-welcome-message' : true,
                    	'skip-install' : true
                    }
                );
                helpers.mockPrompt(generator, {
                    appName: 'fooApp',
                    ngVer : '1.3',
                    modules : [
                    	'animateModule',
                    	'cookiesModule',
                    	'resourceModule',
                    	'sanitizeModule',
                    	'touchModule',
                    	'uiRouter'
                    ]
                });
                generator.run({}, function(){
                    moduleGenerator = helpers.createGenerator('ngModular:module', 
                        ['../../generators/app',
                        '../../generators/module'],
                        ['ngModular:app']
                    );
                    helpers.mockPrompt(moduleGenerator, {
                        moduleName: 'fooModule'
                    });
                    done();
                });
                
            });
    });


    describe('Main Generator', function() {
		it('should has a ask for the appname method', function() {
            expect(Generator.prototype).to.include.key('askForAppname');
        });

        it('should ask the module to pre-install', function(){
        	expect(Generator.prototype).to.include.key('askForModules');
        });

        it('should ask the Angular version', function(){
        	expect(Generator.prototype).to.include.key('askForNgVersion');
        });
	
		it('should set the appName', function() {
			expect(generator.appName).to.equal('fooApp');
		});

		it('should set the Angular version', function() {
			expect(generator.ngVer).to.equal('1.3');
		});

		it('should set the module to pre-install', function(){
			var checkAll = generator.animateModule && generator.cookiesModule && generator.resourceModule && generator.sanitizeModule && generator.touchModule && generator.uiRouter;
			expect(checkAll).to.equal(true);
		});

		it('should generate all the directories', function(){
        	helpers.assertFile(['src/', 'src/vendor/', 'build/', 'dist/']);
        });

        it('should generate the bower.json file', function(){
        	helpers.assertFile(['bower.json']);
        });

		it('should generate a index.html file', function(){
        	helpers.assertFile(['src/index.src.html']);
        });

		describe('index.src.html file', function() {
			it('should has the appname as <title>', function(){
	        	helpers.assertFileContent('src/index.src.html', /<title>fooApp<\/title>/);
	        });
		});

        it('should generate a Gruntfile', function(){
            helpers.assertFile(['Gruntfile.js']);
        });

        it('should generate a Gruntfile', function(){
            helpers.assertFile(['Gruntfile.js']);
        });

        it('should generate a app.js file', function(){
            helpers.assertFile(['src/app/app.js']);
        });
        it('should generate a app.spec.js file', function(){
            helpers.assertFile(['src/app/app.spec.js']);
        });

        describe('Module Generator', function() {
            it('should exist', function() {
                expect(ModuleGenerator).to.exist;
            });

            it('should ask the module name', function(){
                expect(ModuleGenerator.prototype).to.include.key('askForModuleName');
            });

            it('should set the moduleName', function() {
                expect(moduleGenerator.moduleName).to.equal('fooModule');
            });

        });
    });
