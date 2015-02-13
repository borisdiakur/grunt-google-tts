'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            options: JSON.parse(require('fs').readFileSync('.jshintrc')),
            all: ['**/*.js', '!node_modules/**/*', '!coverage/**/*']
        },

        // Configuration to be run (and then tested).
        'google_tts': {
            options: {
                lang: 'de',
                downloadDir: 'test/downloads'
            },
            files: ['test/fixtures/**/*.json']
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nsp-package');

    grunt.registerTask('hint', ['jshint']);
    grunt.registerTask('audit', ['validate-package']);
    grunt.registerTask('default', ['hint', 'audit']);
};
