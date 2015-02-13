# grunt-google-tts

> Extracts values of type string from json files and loads audio assets via google text to speech api.

[![Build Status](https://api.travis-ci.org/borisdiakur/grunt-google-tts.png?branch=master)](https://travis-ci.org/borisdiakur/grunt-google-tts)
[![Coverage Status](https://img.shields.io/coveralls/borisdiakur/grunt-google-tts.svg)](https://coveralls.io/r/borisdiakur/grunt-google-tts)
[![Dependency Status](https://gemnasium.com/borisdiakur/grunt-google-tts.svg)](https://gemnasium.com/borisdiakur/grunt-google-tts)

[![NPM](https://nodei.co/npm/grunt-google-tts.png?downloads=true)](https://nodei.co/npm/grunt-google-tts/)

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-google-tts --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-google-tts');
```

## The "google_tts" task

### Overview
In your project's Gruntfile, add a section named `google_tts` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  'google_tts': {
    options: {
      // Task-specific options go here.
    },
    files: [/* glob patterns */]
  }
});
```

### Options

#### options.lang
Type: `String`

The language code (ISO 639).

#### options.downloadDir
Type: `String`

The download directory.

### Usage Example

```js
grunt.initConfig({
  'google_tts': {
    options: {
      lang: 'de',
      downloadDir: 'myDownloads'
    },
    files: ['some/folder/**/*.json']
  }
});
```

## Contributing

Issues and Pull-requests are welcome. If you want to submit a patch, please make sure that you follow this simple rule:

> All code in any code-base should look like a single person typed it, no matter how
many people contributed. — [idiomatic.js](https://github.com/rwldrn/idiomatic.js/)

Lint with:
```shell
npm run jshint
```

Test with:
```shell
npm run mocha
```

Check code coverage with:

```shell
npm run istanbul
```

Then please commit with a __detailed__ commit message.
