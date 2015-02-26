'use strict';
/* global describe, beforeEach, afterEach, it */

var assert = require('assert'),
    fs = require('fs'),
    path = require('path'),
    grunt = require('grunt'),
    exec = require('child_process').exec;

describe('grunt-google-tts', function () {

    describe('unit tests', function () {

        beforeEach(function (done) {
            exec('rm -r test/downloads &', function (err) {
                if (err) {
                    throw err;
                }
                done();
            });
        });

        it('should write files with lang de', function (done) {
            require('../gruntfile.js')(grunt);
            grunt.tasks('google_tts', {lang: 'de', downloadDir: 'test/downloads'}, function () {
                fs.readdir(path.join(__dirname, './downloads'), function (err, files) {
                    assert.ifError(err);
                    assert.equal(files.length, 6);

                    var checkCnt = files.length;
                    files.forEach(function (file) {
                        fs.stat(path.join(__dirname, './downloads', file), function (err, stats) {
                            assert.ifError(err);
                            assert.ok(stats.size > 4);
                            checkCnt--;
                            if (checkCnt === 0) {
                                done();
                            }
                        });
                    });
                });
            });
        });

        it('should write files with lang en', function (done) {
            require('../gruntfile.js')(grunt);
            grunt.tasks('google_tts', {downloadDir: 'test/downloads'}, function () {
                fs.readdir(path.join(__dirname, './downloads'), function (err, files) {
                    assert.ifError(err);
                    assert.equal(files.length, 6);

                    var checkCnt = files.length;
                    files.forEach(function (file) {
                        fs.stat(path.join(__dirname, './downloads', file), function (err, stats) {
                            assert.ifError(err);
                            assert.ok(stats.size > 4);
                            checkCnt--;
                            if (checkCnt === 0) {
                                done();
                            }
                        });
                    });
                });
            });
        });

        afterEach(function (done) {
            exec('rm -r test/downloads &', function (err) {
                if (err) {
                    throw err;
                }
                done();
            });
        });
    });
});
