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
					'library/dist/js/jstn.<%= pkg.version %>.js': src.js.all
				}
			},
			prod: {
				options: opts.uglify.prod,
				files: {
					'library/dist/js/jstn.<%= pkg.version %>.js': src.js.all
				}
			}
		},
		
		sass: {
			options: {
				style: 'compressed'
			},
			src: {
				files: {
					'library/dist/css/jstn.<%= pkg.version %>.css': 'library/src/scss/imports.scss'
				}
			}
		},
		
		sass_import_compiler: {
			main: {
				files: {
					'library/src/scss/imports.scss': src.scss
				}
			}
		},
		
		watch: {
			
			grunt: {
				options: {
					reload: true,
					atBegin: true
				},
				files: [
					'gruntfile.js',
					'grunt-config.js'
				],
				tasks: [
					'sass_import_compiler:main',
					'sass:src'
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
		
		ftpush: {
			prod: {
				auth: ftpKey.auth,
				src: './',
				dest: ftpKey.dest,
				exclusions: ftpKey.exclusions,
				//keep: [],
				simple: true
			}
		}
	});
	
	grunt.registerTask('publish', [
		'uglify:prod',
		'ftpush:prod'
	]);
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-ftpush');
	grunt.loadNpmTasks('sass-import-compiler');
};