var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', function() {
  return browserify({
    extensions: ['.js', '.jsx'],
    entries: ['src/index.jsx'],
    debug: true
  })
  .transform(babelify, { presets: ['es2015', 'react'] })
  .bundle()
  .on('error', function (err) { console.log('Error: ' + err.message)})
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist'))
});

gulp.task('default', ['build']);
