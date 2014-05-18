var bmConfig,
	srcPath = 'library/src/',
	srcScripts = srcPath + 'js/src/',
	libScripts = srcPath + 'js/libs/',
	utilScripts = srcPath + 'js/util/',
	srcScss = srcPath + 'scss/';

bmConfig = {
		js: {
			libs: [
				/*libScripts + 'html5shiv/html5shiv.js',*/ 
				libScripts + 'modernizr/modernizr.custom.26518.js',
			],
			src: [
				utilScripts + 'jw.js',
				utilScripts + 'dom/class-manager.js',
				utilScripts + 'dom/event-listener.js',
				//utilScripts + 'add-event-listener.js',
				//utilScripts + 'remove-event-listener.js',
				utilScripts + 'easing.js',
				srcScripts + 'consts.js',
				srcScripts + 'dropdown.js',
				srcScripts + 'carousel.js'
			]
		},
		
		scss: [
			srcScss + 'mixins.scss',
			srcScss + 'normalize.scss',
			srcScss + 'base.scss',
			srcScss + 'social-list.scss',
			srcScss + 'header.scss',
			srcScss + 'footer.scss',
			srcScss + 'article.scss',
			srcScss + 'carousel.scss'
		]
	};

bmConfig.options = {
	uglify: {
		dev: {
			beautify: true,
			mangle: false
		},
		prod: {
			mangle: true
		}
	}
};

bmConfig.js.all = bmConfig.js.libs.concat(bmConfig.js.src);

module.exports = bmConfig;