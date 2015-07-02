module.exports = function  (grunt) {
	grunt.initConfig({
		watch: {
			files: ['./ts/*/*.ts'],
			tasks: ['typescript:main2R','typescript:main3R','typescript:mainQF','typescript:mainSF','typescript:mainF']
		},
		typescript: {
			main2R: {
				src: ['ts/2R/Main2R.ts'],
				dest: 'js/2R/Main2R.js',
				options: {
					noImplicitAny: true,
					module: 'commonjs',
					target: 'es5',
					comments: true
				}
			},
      main3R: {
        src: ['ts/3R/Main3R.ts'],
        dest: 'js/3R/Main3R.js',
        options: {
					noImplicitAny: true,
					module: 'commonjs',
					target: 'es5',
					comments: true
				}
      },
      mainQF: {
        src: ['ts/QF/MainQF.ts'],
        dest: 'js/QF/MainQF.js',
        options: {
					noImplicitAny: true,
					module: 'commonjs',
					target: 'es5',
					comments: true
				}
      },
      mainSF: {
        src: ['ts/SF/MainSF.ts'],
        dest: 'js/SF/MainSF.js',
        options: {
					noImplicitAny: true,
					module: 'commonjs',
					target: 'es5',
					comments: true
				}
      },
      mainF: {
        src: ['ts/F/MainF.ts'],
        dest: 'js/F/MainF.js',
        options: {
					noImplicitAny: true,
					module: 'commonjs',
					target: 'es5',
					comments: true
				}
      },
		},

		sass: {
			options: {
				style: 'compressed',
				sourcemap: true,
				noCache: true
			},
			styles: {
				src: ['sass/style.scss'],
				dest: 'css/style.css'
			}
		}
	});

	grunt.registerTask(
		"default",
		"Compile the typescript codes and SASS files",
		["typescript:main2R","typescript:main3R","typescript:mainQF","typescript:mainSF","typescript:mainF","sass","watch"]);

	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
};
