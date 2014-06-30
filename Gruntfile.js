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
                tasks: ['concat_sourcemap', 'uglify']
            },
            css: {
                files: ['src/**/*.less'],
                tasks: ['less_imports', 'less']
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
                    hostname: '*',
                    base: '_site'
                }
            },
            tests: {
                options: {
                    port: 9001,
                    open: true,
                    livereload: true,
                    base: ['_assets', 'src', 'tests', 'bower_components']
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

        concat_sourcemap: {
          options: {
            sourcesContent: true
          },
          target: {
            files: {
              'dist/<%= pkg.name %>.js': ['src/stan/stan.js', 'src/**/*.js']
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

        less_imports: {
            stan: {
                files: {
                    'src/stan/stan.less': ['bower_components/less-prefixer/prefixer.less', 'src/**/*.less', '!src/stan/stan.less', '!src/**/*.inc.less']
                }
            }
        },

        less: {
            main: {
                options: {
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapFilename: "dist/<%= pkg.name %>.css.map",
                    sourceMapURL: "<%= pkg.name %>.css.map"
                },
                files: {
                    'dist/<%= pkg.name %>.css': ['src/stan/stan.less']
                }
            },
            minify: {
                options: {
                    cleancss: true,
                    report: 'min,'
                },
                files: {
                    'dist/<%= pkg.name %>.min.css': ['src/stan/stan.less']
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
                    src: ['dist/*.js', 'dist/*.css', '!dist/*.map']
                }
            }
        },

        shell: {
            jekyll: {
                command: [
                    'mv _site/dist _site/_assets/dist',
                    'mv _site/_pages/* _site/',
                    'rm -rf _site/_pages',
                    'cp _pages/.htaccess _site/.htaccess'
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
                    "rsync -trp --rsh='ssh -i ~/.ssh/sa_rsa' releases/ saadmin@sadev4.co.uk:/var/www/vhosts/smartarts.co.uk/stan-utils.smartarts.co.uk/releases/",
                    "rsync -trp --rsh='ssh -i ~/.ssh/sa_rsa' _site/ saadmin@sadev4.co.uk:/var/www/vhosts/smartarts.co.uk/stan-utils.smartarts.co.uk/"
                ].join('&&')
            },
            set_permissions:{
              command:[
                        "find _site/* -type d -print0 | xargs -0 chmod 0755",
                        "find _site/* -type f -print0 | xargs -0 chmod 0644",
                        "find releases/* -type d -print0 | xargs -0 chmod 0755",
                        "find releases/* -type f -print0 | xargs -0 chmod 0644"
                      ].join('&&')
            },
            atom: {
              command: 'atom ./'
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
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-concat-sourcemap');
    grunt.loadNpmTasks('grunt-less-imports');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-prettify');
    grunt.loadNpmTasks('grunt-banner');

    // Register tasks
    grunt.registerTask('js-less', ['concat_sourcemap', 'uglify', 'less_imports', 'less', 'usebanner', 'shell:tmp']);
    grunt.registerTask('site', function() {

        grunt.config('watch', config.watch_site);
        grunt.task.run(['js-less', 'jekyll', 'shell:jekyll', 'shell:atom', 'connect:dev', 'watch']);

    });
    grunt.registerTask('tests', function() {

        grunt.config('watch', config.watch_tests);
        grunt.task.run(['connect:tests', 'watch']);

    });
    grunt.registerTask('deploy', ['js-less', 'jekyll', 'shell:jekyll', 'htmlmin', 'prettify', 'shell:zip', 'shell:set_permissions', 'shell:publish']);
    grunt.registerTask('test', ['js-less']);
    grunt.registerTask('default', ['js-less']);

};
