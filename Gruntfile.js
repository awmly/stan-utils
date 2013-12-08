module.exports = function(grunt) {

	grunt.initConfig({
		

        pkg:        grunt.file.readJSON('package.json'),

        banner:     '/*!\n' +
                    ' * STAN Plugins <%= pkg.version %>\n' +
                    ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                    ' */\n',
	                   	
    	watch: {
            
            options: {
                livereload: true
            },
            
            html: {
                files: ['_assets/**/*','_layouts/*.html','_includes/*.html','_includes/**/*.html','_pages/*.html','_pages/**/*.html','dist/*'],
                tasks: ['jekyll','shell:jekyll']
            },

            js: {
                files: ['src/**/*.js','src/core.js'],
                tasks: ['uglify']
            },

            css: {
                files: ['src/**/*.css','src/core.css'],
                tasks: ['cssmin']
            }

        },


        connect: {

            dev: {
                options: {
                    port: 9001,
                    open: true,
                    livereload: true,
                    base: '_site'
                }
            }

        },

        jekyll: {

            dev: {
                options: {
                    config: '_config.yml'
                }

            }

        },


		uglify: {

			dist: {
                options: {
                    banner: '<%= banner %>',
                },
				files: {
					'dist/<%= pkg.name %>.min.js': ['src/**/*.js','src/core.js']
				}
			}
		
        },

		
		cssmin: {

            dist: {
                options: {
                    banner: '<%= banner %>',
                },
				files: {
					'dist/<%= pkg.name %>.min.css': ['src/**/*.css','src/core.css']
				}
			}
		
        },

        shell: {

            jekyll: {
                command: [
                    'mv _site/dist _site/_assets/dist',
                    'mv _site/_pages/* _site/',
                    'rm -rf _site/_pages'
                ].join('&&')
            },

            zip: {
                command: [
                    'rm -f releases/stan-plugins-<%= pkg.version %>.zip',
                    'zip -j releases/stan-plugins-<%= pkg.version %>.zip dist/*'
                ].join('&&')
            },

            publish: {
                command: 'scp -P 7722 -r _site/* ftp@aw1.me:/var/www/git.aw1.me/stan-plugins/'
            }

        },

        htmlmin: { 

            dist: {                          
                options: {                          
                    removeComments: true,
                    collapseWhitespace: true,
                    removeEmptyAttributes: true
                },
                files: [{
                    expand: true,
                    cwd: '_site',
                    src: ['*.html'],
                    dest: '_site'
                }]
            }

        },

        prettify: {
            options: {
                indent: 4,
                wrap_line_length: 120,
                brace_style: 'end-expand',
                unformatted: ['code', 'pre']
            },
            all: {
                expand: true,
                cwd: '_site/examples',
                src: ['*.html'],
                dest: '_site/examples'
            }
        }

	});
    

    // Load node modules
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-prettify');

    // Register tasks
    grunt.registerTask('deploy', ['jekyll', 'shell:jekyll', 'htmlmin', 'prettify', 'shell:zip', 'shell:publish']);
    grunt.registerTask('site', ['uglify', 'cssmin', 'jekyll', 'shell:jekyll', 'connect', 'watch']);
	grunt.registerTask('default', ['uglify', 'cssmin', 'jekyll', 'shell:jekyll']);

};