'use strict';

module.exports = function (grunt) {

    var fs = require('fs'),
        path = require('path'),
        url = require('url'),
        http = require('http'),
        exec = require('child_process').exec;

    grunt.registerMultiTask('google_tts', 'Parses json files and loads audio assets via google text to speech api', function () {

        var done = this.async(),
            options = this.options({
                lang: grunt.option('lang') || 'en',
                downloadDir: grunt.option('downloadDir') || 'downloads'
            }),
            textArr = [],
            self = this,
            doneCnt;

        exec('mkdir -p ' + options.downloadDir, function (err) {
            if (err) {
                return done(err);
            }

            self.files.forEach(function (f) {
                f.src.forEach(function (filePath) {
                    var parsedJSON = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
                    function extractStrings(arg) {
                        if (typeof arg === 'string') {
                            textArr.push(arg);
                        } else if (arg && typeof arg === 'object') {
                            Object.keys(arg).forEach(function (key) {
                                extractStrings(arg[key]);
                            });
                        }
                    }
                    extractStrings(parsedJSON);
                });
            });

            function requestData(text, callback) {
                var fileName = text + '.mp3',
                    file = fs.createWriteStream(path.join(options.downloadDir, fileName)),
                    ur = url.parse('translate.google.com/translate_tts', true);

                ur.query = {
                    'tl': options.lang,
                    'q': text
                };

                var formated = url.parse(url.format(ur), true);

                var reqOptions = {
                    host: 'translate.google.com',
                    path: formated.path,
                    headers: {
                        'user-agent': 'Mozilla/5.0'
                    }
                };

                var req = http.request(reqOptions, function (res) {
                    var data = [];

                    res.on('data', function (chunk) {
                        file.write(chunk);
                        data.push(chunk);
                    }).on('end', function () {
                        file.end();
                        var buffer = Buffer.concat(data);
                        if (buffer.length === 0) {
                            callback(new Error('Retrieved empty data!'));
                        } else {
                            callback(null, buffer);
                        }
                    });
                });

                req.on('error', function (err) {
                    callback(err);
                });

                req.end();
            }

            doneCnt = textArr.length;
            textArr.forEach(function (text) {
                requestData(text, function (err, data) {
                    if (err) {
                        return done(err);
                    } else if (!data) {
                        return done(new Error('No data received!'));
                    } else if (data) {
                        doneCnt--;
                        if (doneCnt === 0) {
                            done();
                        }
                    }
                });
            });
        });
    });
};
