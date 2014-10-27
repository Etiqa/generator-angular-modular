(function() {
    'use strict';

    var fs = require('fs'),
        path = require('path'),
        util = require('util'),
        yeoman = require('yeoman-generator'),
        yosay = require('yosay'),
        wiredep = require('wiredep'),
        chalk = require('chalk'),
        ModuleGenerator;


    ModuleGenerator = function ModuleGenerator(args, options) {
        yeoman.generators.Base.apply(this, arguments);
        
        this.sourceRoot(path.join(__dirname, '../../templates/module'));

        this.on('end', function () {});
    };

    util.inherits(ModuleGenerator, yeoman.generators.Base);


    ModuleGenerator.prototype.askForModuleName = function askForAppname() {
        var done = this.async();
        this.prompt([{
            type: 'input',
            name: 'name',
            message: 'What will be the module name ',
            default: this.name || 'dummyModule'
        }], function(props) {
            this.name = props.name;
            this.url = this.name.toLowerCase();
            done();
        }.bind(this));
    };

    ModuleGenerator.prototype.askForAppname = function askForAppname() {
        var done = this.async();
        this.prompt([{
            type: 'input',
            name: 'appName',
            message: 'What is the app name ',
            default: this.appName || 'dummyApp'
        }], function(props) {
            this.appName = props.appName;
            done();
        }.bind(this));
    };

    ModuleGenerator.prototype.askForModules = function askForModules() {
        var done = this.async();
        var prompts = [{
            type: 'checkbox',
            name: 'modules',
            message: 'Which modules would you like to include?',
            choices: [{
                value: 'uiRouter',
                name: 'ui-router.js',
                checked: true
            }]
        }];

        this.prompt(prompts, function(props) {
            var hasMod = function(mod) {
                return props.modules.indexOf(mod) !== -1;
            };
            this.uiRouter = hasMod('uiRouter');

            done();
        }.bind(this));
    };


    ModuleGenerator.prototype.scaffoldingDirectories = function scaffoldingDirectories() {
        this.mkdir('src/'+this.name);
    };

    ModuleGenerator.prototype.generateModuleFiles = function generateModuleFiles(){
        this.template('_dummyCtrl.js', 'src/'+this.name+'/'+this.name+'Ctrl.js');
        this.template('_dummyCtrl.spec.js', 'src/'+this.name+'/'+this.name+'Ctrl.spec.js');
        this.template('_dummy.tpl.html', 'src/'+this.name+'/'+this.name+'.tpl.html');
    };

    module.exports = ModuleGenerator;
})();
