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
				libScripts + 'modernizr/modernizr.custom.04420.js'
			],
			src: [
				utilScripts + 'class-manager.js',
				utilScripts + 'add-event-listener.js',
				utilScripts + 'remove-event-listener.js',
				srcScripts + 'consts.js',
				srcScripts + 'dropdown.js'
			]
		},
		
		scss: [
			srcScss + 'mixins.scss',
			srcScss + 'normalize.scss',
			srcScss + 'base.scss',
			srcScss + 'social-list.scss',
			srcScss + 'header.scss',
			srcScss + 'footer.scss',
			srcScss + 'article.scss'
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

bmConfig.cssCommand = 'echo "';

for(var i = 0; i < bmConfig.scss.length; i++) {
	
	var scss = bmConfig.scss[i];
	
	scss = scss.replace(srcScss, '');
	scss = scss.replace(/\.scss/, '');
	
	bmConfig.cssCommand += '@import \\"' + scss + '\\";\n';
}

bmConfig.cssCommand += '" > ' + srcScss + 'imports.scss';

module.exports = bmConfig;