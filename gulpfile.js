var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

function handleError(err) {
  console.log(err.message);
  this.emit('end');
}

gulp.task('buildjs', function() {
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
  .pipe(gulp.dest('dist'))
});

gulp.task('syncjs', ['buildjs'], function() {
  gulp
    .src('dist/bundle.js')
    .pipe(gulp.dest('../api/public'))
});

gulp.task('watchjs', function() {
  gulp.watch(['src/js/**'], ['buildjs', 'syncjs']);
})

gulp.task('default', ['watchjs', 'syncjs']);
