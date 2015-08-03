'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var bs = require('browser-sync');
var reload = bs.reload;
var mocha = require('gulp-mocha');

// when = require('gulp-if'),
// shell = require('gulp-shell');

// the paths to our app files
var paths = {
  // all our client app js files, not including 3rd party js files
  scripts: ['client/*.js'],
  html: ['client/*.html', 'client/index.html'],
  styles: ['client/styles/style.css'],
  test: ['specs/**/*.js']
};

gulp.task('test', function () {
  return gulp.src('specs/**/*.js', {read: false})
  // gulp-mocha needs filepaths so you can't have any plugins before it 
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('start', ['serve']);

// , function() {
//   bs({
//     notify: true,
//     // address for server,
//     injectChanges: true,
//     files: paths.scripts.concat(paths.html, paths.styles),
//     proxy: 'localhost:8000'
//   });
// });

// start our node server using nodemon
gulp.task('serve', function() {
  nodemon({
    script: './server/server.js',
    ignore: 'node_modules/**/*.js'
  });
});

gulp.task('default', ['start']);
