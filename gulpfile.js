var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');

function handleError(err) {
  console.log(err.message);
  this.emit('end');
}

gulp.task('build:css', function() {
  gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('sync:css', ['build:css'], function() {
  gulp
    .src('dist/css/**/*.css')
    .pipe(gulp.dest('../api/public/css'));
});

gulp.task('build:js', function() {
  return browserify({
    extensions: ['.js', '.jsx'],
    entries: ['src/js/app.js'],
    debug: true
  })
  .on('error', handleError)
  .transform(babelify, { presets: ['es2015', 'react'], ignore: "node_modules/**" })
  .on('error', handleError)
  .bundle()
  .on('error', handleError)
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist/js'))
});

gulp.task('sync:js', ['build:js'], function() {
  gulp
    .src('dist/js/bundle.js')
    .pipe(gulp.dest('../api/public/js'))
});

gulp.task('sync:html', function() {
  gulp
    .src('dist/**/*.html')
    .pipe(gulp.dest('../api/public'));
});

gulp.task('build', ['build:js', 'build:css', 'sync:js', 'sync:css', 'sync:html']);

gulp.task('watch', function() {
  gulp.watch(['src/js/**/*'], ['build:js', 'sync:js']);
  gulp.watch(['src/sass/**/*'], ['build:css', 'sync:css']);
  gulp.watch(['dist/**/*.html'], ['sync:html'])
});

gulp.task('default', ['build', 'watch']);
