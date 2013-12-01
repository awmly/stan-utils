module.exports = function(grunt) {

	grunt.initConfig({
		

        pkg:        grunt.file.readJSON('package.json'),

        banner:     '/*!\n' +
                    ' * STAN Plugins <%= pkg.version %>\n' +
                    ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                    ' */\n\n',
	                   	
    	watch: {
            
            options: {
                livereload: true
            },
            
            html: {
                files: ['index.html','examples/*.html']
            },

            js: {
                files: ['src/**/*.js'],
                tasks: ['uglify']
            },

            css: {
                files: ['src/**/*.css'],
                tasks: ['cssmin']
            }

        },


        connect: {

            dev: {
                options: {
                    port: 9001,
                    open: true,
                    livereload:true
                }
            }

        },


		uglify: {

			options: {
				banner: '<%= banner %>',
			},

			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['src/**/*.js']
				}
			}
		
        },

		
		cssmin: {
			
            options: {
                banner: '<%= banner %>',
            },

            dist: {
				files: {
					'dist/<%= pkg.name %>.min.css': ['src/**/*.css']
				}
			}
		
        }

	});
    

    // Load node modules
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');


    // Register tasks
    grunt.registerTask('dev', ['connect', 'watch' ]);
	grunt.registerTask('default', ['uglify', 'cssmin']);

};