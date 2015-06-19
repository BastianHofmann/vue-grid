var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    html = require('html-browserify');

gulp.task('default', function() {
  gulp.src('src/grid.js')
      .pipe(browserify({
        insertGlobals: true,
        debug: true,
        transform: html
      }))
      .pipe(gulp.dest('build'))
})

gulp.task('watch', function() {
  gulp.watch(['src/**/*'], ['default'])
})
