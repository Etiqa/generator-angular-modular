(function() {
    'use strict';

    var fs = require('fs'),
        path = require('path'),
        util = require('util'),
        yeoman = require('yeoman-generator'),
        yosay = require('yosay'),
        wiredep = require('wiredep'),
        chalk = require('chalk'),
        Generator;


    Generator = function Generator(args, options) {

        yeoman.generators.Base.apply(this, arguments);

        this.sourceRoot(path.join(__dirname, '../../templates'));

        this.on('end', function () {
            this.installDependencies({ // At the end we install the dependencies
                skipInstall: !!this.options['skip-install'],
                skipMessage: !!this.options['skip-message'],

                //skipInstall: (typeof this.options['skip-install'] === 'undefined' || this.options['skip-install']) ? true : false,
                //skipMessage: (typeof this.options['skip-message'] === 'undefined' || this.options['skip-message']) ? true : false,
                npm : true,
                bower : true,
                callback: this._injectDependencies.bind(this)
            });
        });
    };

    util.inherits(Generator, yeoman.generators.Base);

    Generator.prototype.welcome = function welcome() {
        if (!this.options['skip-welcome-message']) {
            this.log(yosay());
            this.log(
                chalk.magenta(
                    'Welcome to Angular Modular Generator' +
                    '\n'
                )
            );
        }
    };

    Generator.prototype.askForAppname = function askForAppname() {
        var done = this.async();
        this.prompt([{
            type: 'input',
            name: 'appName',
            message: 'What will be the app name ',
            default: this.appName || 'ngModularApp'
        }], function(props) {
            this.appName = props.appName;
            done();
        }.bind(this));
    };

    Generator.prototype.askForNgVersion = function askForNgVersion() {
        var done = this.async();
        this.prompt([{
            type: 'list',
            name: 'ngVer',
            message: 'Choose the Angular version',
            choices: ['1.3', '1.2'],
            default: 0
        }], function(props) {
            this.ngVer = props.ngVer;
            done();
        }.bind(this));
    };

    Generator.prototype.askForModules = function askForModules() {
        var done = this.async();
        var prompts = [{
            type: 'checkbox',
            name: 'modules',
            message: 'Which modules would you like to include?',
            choices: [{
                value: 'bootstrap',
                name: 'bootstrap',
                checked: true
            },{
                value: 'animateModule',
                name: 'angular-animate.js',
                checked: true
            }, {
                value: 'cookiesModule',
                name: 'angular-cookies.js',
                checked: true
            }, {
                value: 'resourceModule',
                name: 'angular-resource.js',
                checked: true
            }, {
                value: 'sanitizeModule',
                name: 'angular-sanitize.js',
                checked: true
            }, {
                value: 'touchModule',
                name: 'angular-touch.js',
                checked: true
            }, {
                value: 'uiRouter',
                name: 'ui-router.js',
                checked: true
            }]
        }];

        this.prompt(prompts, function(props) {
            var hasMod = function(mod) {
                return props.modules.indexOf(mod) !== -1;
            };
            this.bootstrap = hasMod('bootstrap');
            this.animateModule = hasMod('animateModule');
            this.cookiesModule = hasMod('cookiesModule');
            this.resourceModule = hasMod('resourceModule');
            this.sanitizeModule = hasMod('sanitizeModule');
            this.touchModule = hasMod('touchModule');
            this.uiRouter = hasMod('uiRouter');

            done();
        }.bind(this));

    };

    Generator.prototype.scaffoldingDirectories = function scaffoldingDirectories() {
        this.mkdir('src');
        this.mkdir('src/app');
        this.mkdir('src/vendor');
        this.mkdir('build');
        this.mkdir('dist');
    };

    Generator.prototype.copyBowerFile = function copyBowerFile() {
        this.template('root/_bower.json', 'bower.json', this);
        this.copy('root/_bowerrc', '.bowerrc');
    };

    Generator.prototype.generateIndexFile = function generateIndexFile() {
        this.template('app/index.html', 'src/index.src.html');
    };

    Generator.prototype.generateGruntFile = function generateGruntFile(){
        this.template('root/_package.json', 'package.json');
        this.template('root/_Gruntfile.js', 'Gruntfile.js');
        this.mkdir('karma');
        this.copy('root/karma/karma-unit.tpl.js', 'karma/karma-unit.tpl.js');
    };

    Generator.prototype.generateAppFile = function generateAppFile(){
        this.template('app/app.js', 'src/app/app.js');
    };

    Generator.prototype.generateAppTestFile = function generateAppTestFile(){
        this.template('app/app.spec.js', 'src/app/app.spec.js');
    };

    Generator.prototype.generateHomeModule = function generateModules (argument) {
      this.composeWith('angular-modular:module', {
        options : {
            'skip-prompt' : true,
            uiRouter : true,
            appName : this.appName,
            name : 'home'
        }
      });
    };

    /**
    *  Private method (it doesn't get called by the yeoman loop )
    */
    Generator.prototype._injectDependencies = function injectDependencies() {
        wiredep({
            directory: 'src/vendor',
            bowerJson: JSON.parse(fs.readFileSync('bower.json')),
            src: 'src/index.src.html',
            exclude : [/bootstrap\.css/]
        });
    };

    module.exports = Generator;
})();
