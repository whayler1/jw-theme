var bmConfig = require('./grunt-config'),
	src = bmConfig,
	opts = bmConfig.options;

module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		jshint: {
			options: {
				'-W108': true
			},
			src: [
				src.js.src
			]
		},
		
		uglify: {
			src: {
				options: opts.uglify.dev,
				files: {
					'library/dist/js/jstn.js': src.js.all
				}
			}
		},
		
		sass: {
			options: {
				style: 'compressed'
			},
			src: {
				files: {
					'library/dist/css/jstn.css': 'library/src/scss/imports.scss'
				}
			}
		},
		
		watch: {
			grunt: {
				options: {
					nospawn: true
				},
				files: [
					'gruntfile.js',
					'grunt-config.js'
				],
				tasks: [
					'exit'
				]
			},
			
			scriptsSrc: {
				files: src.js.all,
				tasks: [
					'jshint:src',
					'uglify:src'
				]
			},
			
			styleSrc: {
				files: src.scss,
				tasks: [
					'shell:srcCss',
					'sass:src'
				]
			}
		},
		
		shell: {
			watchHack: {
				options: {
					stdout: true,
					stderr: true
				},
				command: [
					'while true',
					'do grunt watch',
					'echo -e "\nRESTART"',
					'done'
				].join(';')
			},
			srcCss: {
				options: {
					stdout: true,
					stderr: true
				},
				command: src.cssCommand
			}
		}
	});
	
	grunt.registerTask('exit', 'Just exits.', function() {
	    process.exit(0);
	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-shell');
};