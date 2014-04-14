var bmConfig = require('./grunt-config'),
	ftpKey = require('./ftp-key'),
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
			},
			prod: {
				options: opts.uglify.prod,
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
		},
		
		ftpush: {
			prod: {
				auth: ftpKey.auth,
				src: './',
				dest: ftpKey.dest,
				exclusions: [
					'.*',
					'library/src/',
					'ftp-key.js',
					'gruntfile.js',
					'grunt-config.js',
					'package.json',
					'CHANGELOG.md',
					'README.md',
					'node_modules',
					'throwaway.css'
				],
				//keep: [],
				simple: true
			}
		}
	});
	
	grunt.registerTask('exit', 'Just exits.', function() {
			process.exit(0);
	});
	
	grunt.registerTask('publish', [
		'uglify:prod',
		'ftpush:prod'
	]);
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-ftpush');
};