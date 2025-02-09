const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const jsonToScss = require('gulp-json-to-scss');
const rename = require('gulp-rename');

// Task to convert JSON config to SCSS
gulp.task('json-to-scss', function () {
  return gulp.src('config/config.json')
    .pipe(jsonToScss({
      delim: '-',
      ext: '.scss',
      prefix: '$'
    }))
    .pipe(rename('_config.scss'))
    .pipe(gulp.dest('scss/utilities'));
});

// Task to compile Sass to CSS
gulp.task('sass', function () {
  return gulp.src('scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'));
});

// Task to watch for changes in SCSS and JSON files
gulp.task('watch', function () {
  gulp.watch('config/config.json', gulp.series('json-to-scss', 'sass'));
  gulp.watch('scss/**/*.scss', gulp.series('sass'));
});

// Default task to run all tasks
gulp.task('default', gulp.series('json-to-scss', 'sass', 'watch'));
