module.exports = function(grunt){

	grunt.initConfig({
		watch: {
			jade: {
				files: ['app/views/**'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['public/js/**', 'app/models/*.js', 'app/schemas/**/*.js','app/controllers/*.js','config/*.js','app.js'],
				//tasks: ['jshint'],
				options: {
					livereload: true
				}
			}
		},
		nodemon: {
			dev: {
				options: {
					file: 'app.js',
					args: [],
					ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
					watchedExtensions: ['js'],
					watchedFolders: ['./'],
					debug: true,
					delayTime: 1,
					env: {
						PORT: 3000
					},
					cwd: __dirname
				}
			}
		},
		concurrent: {
			//tasks: ['watch', 'jshint', 'less', 'uglify'],
			//tasks: ['nodemon', 'watch', 'jshint', 'less', 'uglify'],
			tasks: ['nodemon', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		},
		mochaTest: {
			options:{
				reporter: 'spec'
			},
			src: ['test/**/*.js']
		},
		jshint: {
			options:{
				jshintrc: '.jshintrc',
				ignores: ['public/libs/**/*.js']
			},
			all:['public/js/*.js', 'test/**/*.js', 'app/**/*.js']
		},
		less: {
			development: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: {
					'public/build/index.css': 'public/less/index.less'
				}
			}
		},
		uglify: {
			development: {
				files: {
					'public/build/admin.min.js': 'public/js/admin.js',
					'public/build/detail.min.js': [
						'public/js/detail.js'
					]
				}
			}
		}
	})

	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-nodemon')
	grunt.loadNpmTasks('grunt-concurrent')
	grunt.loadNpmTasks('grunt-mocha-test')
	grunt.loadNpmTasks('grunt-contrib-jshint')
	grunt.loadNpmTasks('grunt-contrib-less')
	grunt.loadNpmTasks('grunt-contrib-uglify')	

	grunt.option('force', true)

	grunt.registerTask('default', ['concurrent'])
	grunt.registerTask('test', ['mochaTest'])
	
}