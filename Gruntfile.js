/**
 * Created by jakub on 31.10.16.
 */
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dev: {
                src: ["src/css/*", "src/fonts/*", "src/js/lib/*", "!src/js/own_scripts"]
            },
            build: {
                src: "build/*"
            }
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                src: 'bower_components/materialize/sass/materialize.scss',
                dest: "src/css/materialize.css"
            }
        },
        autoprefixer: {
            dev: {
                options: {
                    browsers: ["last 30 version"]
                },
                src: "src/css/*.css"
            }
        },
        jshint: {
            dev: {
                src: "src/js/own_scripts/**/*.js"
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            prod: {
                files: {
                    "build/js/own_scripts/scripts.js": "src/js/own_scripts/**/*.js",
                    "build/js/lib.js": ["src/js/**/*.js", "!src/js/own_scripts"]
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            dev: {
                files: ["src/**/*"]
            },
            build: {
                files: ["build/**/*"]
            }
        },
        connect: {
            dev: {
                options: {
                    port: 9090,
                    hostname: 'localhost',
                    livereload: true,
                    base: ['src/']
                }
            },
            build: {
                options: {
                    port: 8081,
                    hostname: 'localhost',
                    livereload: true,
                    base: ['build/']
                }

            }
        },
        copy: {
            devJquery: {
                expand: true,
                cwd: "bower_components/jquery/dist/",
                src: "jquery.min.js",
                dest: 'src/js/lib/'
            },
            devMaterialize: {
                expand: true,
                cwd: "bower_components/materialize/dist/js/",
                src: "materialize.min.js",
                dest: 'src/js/lib/'
            },
            devFonts: {
                expand: true,
                cwd: "bower_components/materialize/dist/fonts/",
                src: "**",
                dest: 'src/fonts/'

            },
            buildHtml: {
                expand: true,
                cwd: "src/",
                src: ["index.html", "pages/*"],
                dest: 'build/'

            },
            buildJs: {
                expand: true,
                cwd: "src/js/",
                src: "**",
                dest: 'build/js/'
            },
            buildCss: {
                expand: true,
                cwd: "src/css/",
                src: "**",
                dest: 'build/css/'
            },
            buildFonts: {
                expand: true,
                cwd: "src/fonts/",
                src: "**",
                dest: 'build/fonts/'
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'build/',
                        src: ['js/**/*.js'],
                        dest: 'build/'
                    }
                ]
            }
        },
        cssmin: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'build/css',
                    src: ['*.css'],
                    dest: 'build/css',
                    ext: '.css'
                }]
            }
        },
        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'build/',
                        src: ['index.html', 'pages/**/*.html'],
                        dest: 'build/'
                    }
                ]

            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-targethtml');
    grunt.registerTask('default', [
        'clean:dev',
        'jshint',
        'sass:dev',
        'copy:devJquery',
        'copy:devMaterialize',
        'copy:devFonts'
    ]);
    grunt.registerTask('serve', ['default', 'connect:dev']);
    grunt.registerTask('serveWatch', ['serve', 'watch:dev']);
    grunt.registerTask('build', [
        'default',
        'clean:build',
        'copy:buildHtml',
        'copy:buildJs',
        'copy:buildCss',
        'copy:buildFonts',
        'uglify:build',
        'cssmin:build',
        'htmlmin:build'
    ]);
    grunt.registerTask('buildServe', [
        'build',
        'watch:build',
        'connect:build'
    ]);

};