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

        this._parseAppName();

        this.uiRouter = this.options.uiRouter;
        this.appName  = this.appName || this.options.appName;
        this.name = this.options.name;
        this.url = (this.name) ? this.name.toLowerCase() : '';

        this.sourceRoot(path.join(__dirname, '../../templates/module'));

        this.on('end', function () {
            this._addAsDependency();
        });
    };

    util.inherits(ModuleGenerator, yeoman.generators.Base);


    ModuleGenerator.prototype.askForModuleName = function askForAppname() {
        if(!this.options['skip-prompt']){
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
        }
    };

    ModuleGenerator.prototype.askForAppname = function askForAppname() {
        if(!this.options['skip-prompt']){
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
        }
    };

    ModuleGenerator.prototype.askForModules = function askForModules() {
        if(!this.options['skip-prompt']){
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
        }
    };


    ModuleGenerator.prototype.scaffoldingDirectories = function scaffoldingDirectories() {
        this.mkdir('src/app/'+this.name);
    };

    ModuleGenerator.prototype.generateModuleFiles = function generateModuleFiles(){
        this.template('_dummyCtrl.js', 'src/app/'+this.name+'/'+this.name+'Ctrl.js');
        this.template('_dummyCtrl.spec.js', 'src/app/'+this.name+'/'+this.name+'Ctrl.spec.js');
        this.template('_dummy.tpl.html', 'src/app/'+this.name+'/'+this.name+'.tpl.html');
    };

    ModuleGenerator.prototype._parseAppName = function _parseAppName(){
        var filePath = 'src/app/app.js',
            pattern = /}\(angular\.module\(\'([a-z09_]+)', \[[\n\r]/gim,
            appJsContent = '',
            matches = [],
            appName = '';

        if(fs.existsSync(filePath)){
            appJsContent = this.readFileAsString(filePath);
            matches = appJsContent.match(pattern);
            if(matches.length){
                appName = matches[0].replace(pattern, '$1');
                this.appName = appName;
            }
        }
    };

    ModuleGenerator.prototype._addAsDependency = function _addAsDependency(){
        var appJsContent = this.readFileAsString('src/app/app.js');
        if(appJsContent.match(/\/\/hookForModules[ -w]*[\n\r]/gim)){
            appJsContent = appJsContent.replace(/(\/\/hookForModules[ -w]*[\n\r])/gim, '$1    \''+this.appName + '.' + this.name+'\',\n\r');
            this.writeFileFromString(appJsContent, 'src/app/app.js');
        }
    };

    module.exports = ModuleGenerator;
})();
