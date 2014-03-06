module.exports = function(grunt) {

    var config = {

        pkg: grunt.file.readJSON('package.json'),

        banner: '/*!\n' + ' * STAN Utils <%= pkg.version %>\n' + ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' + ' */\n',

        watch_site: {
            options: {
                livereload: true
            },
            html: {
                files: ['_assets/**/*', '_layouts/*.html', '_includes/*.html', '_includes/**/*.html', '_pages/*.html', '_pages/**/*.html', 'dist/*'],
                tasks: ['jekyll', 'shell:jekyll']
            },
            js: {
                files: ['src/**/*.js'],
                tasks: ['uglify']
            },
            css: {
                files: ['src/**/*.less'],
                tasks: ['concat','less']
            }
        },

        watch_tests: {
            options: {
                livereload: true
            },
            tests: {
                files: ['tests/*', 'src/**/*.js', 'src/**/*.less']
            }
        },

        connect: {
            dev: {
                options: {
                    port: 9001,
                    open: true,
                    livereload: true,
                    hostname:'*',
                    base: '_site'
                }
            },
            tests: {
                options: {
                    port: 9001,
                    open: true,
                    livereload: true,
                    base: ['_assets', 'src', 'tests','bower_components']
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
                files: {
                    'dist/<%= pkg.name %>.min.js': ['src/stan/stan.js', 'src/**/*.js']
                }
            }
        },

        concat: {
          dist: {
            src: ['bower_components/less-prefixer/prefixer.less','src/stan/stan.less', 'src/**/*.less' ,'!src/**/*.inc.less'],
            dest: 'tmp/less.less',
          },
        },

        less: {
            dist: {
                options: {
                    cleancss:true
                },
                files: {
                    'dist/<%= pkg.name %>.min.css': ['tmp/less.less']
                }
            }
        },

        usebanner: {
          dist: {
            options: {
              position: 'top',
              banner: '<%= banner %>',
              linebreak: true
            },
            files: {
              src: [ 'dist/*' ]
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
                    'mkdir -p releases/<%= pkg.version %>',
                    'rm -f releases/<%= pkg.version %>/*',
                    'zip -j releases/<%= pkg.version %>/stan-utils-<%= pkg.version %>.zip dist/*',
                    'cp dist/* releases/<%= pkg.version %>/'
                ].join('&&')
            },
            publish: {
                command: [
                    'scp -i ~/.ssh/sa_rsa -r _site/* saadmin@sadev4.co.uk:/var/www/vhosts/smartarts.co.uk/stan-utils.smartarts.co.uk',
                    'scp -i ~/.ssh/sa_rsa -r releases/* saadmin@sadev4.co.uk:/var/www/vhosts/smartarts.co.uk/stan-utils.smartarts.co.uk/releases'
                ].join('&&')
            },
            tmp: {
                command: 'rm -rf tmp/*'
            },
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
            examples: {
                expand: true,
                cwd: '_site/examples',
                src: ['*.html'],
                dest: '_site/examples'
            }
        }

    }

    // Init grunt config
    grunt.initConfig(config);


    // Load node modules
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-prettify');
    grunt.loadNpmTasks('grunt-banner');

    // Register tasks
    grunt.registerTask('js-less', ['uglify', 'concat', 'less', 'usebanner', 'shell:tmp']);
    grunt.registerTask('site', function() {

        grunt.config('watch', config.watch_site);
        grunt.task.run(['js-less', 'jekyll', 'shell:jekyll', 'connect:dev', 'watch']);

    });
    grunt.registerTask('tests', function() {

        grunt.config('watch', config.watch_tests);
        grunt.task.run(['connect:tests', 'watch']);

    });
    grunt.registerTask('deploy', ['js-less', 'jekyll', 'shell:jekyll', 'htmlmin', 'prettify', 'shell:zip', 'shell:publish']);
    grunt.registerTask('test', ['js-less']);
    grunt.registerTask('default', ['js-less']);

};
