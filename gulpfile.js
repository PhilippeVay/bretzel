// Requires
var gulp = require('gulp');

// Include plugins
var less = require('gulp-less');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
// var styledown = require('gulp-styledown');

// Common tasks
gulp.task('styles', ['styles-less', 'styles-sass']);
gulp.task('doallthethings', ['styles','scripts']);

// Styles LESS
gulp.task('styles-less', function () {
  return gulp.src('assets/css/*.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(minify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('assets/css/'));
});

// Styles SASS
gulp.task('styles-sass', function () {
  gulp.src('./assets/css/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemaps.init())
    .pipe(minify({keepBreaks:false,keepSpecialComments:0}))
    .pipe(sourcemaps.write())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./assets/css/'));
});

// Scripts
gulp.task('scripts',function() {
  return gulp.src('assets/js/src/*.js')
    .pipe(uglify())
    .pipe(concat('global.min.js'))
    .pipe(gulp.dest('assets/js/'));
});

/*
// Styledown (styleguide)
gulp.task('styleguide', function() {
  gulp.src('assets/css/*.less')
  .pipe(styledown({
    config: 'assets/css/config.md',
    filename: 'styleguide.html'
  }))
  .pipe(gulp.dest('.'));
});
*/

// Watcher
gulp.task('watch', function() {
  browserSync({
    proxy: 'http://localhost:5000'
  });
  gulp.watch(['./assets/css/*.scss'], ['styles-sass', browserSync.reload /*,'styleguide'*/ ]);
  gulp.watch(['./assets/css/*.less'], ['styles-less', browserSync.reload /*,'styleguide'*/ ]);
  gulp.watch(['./assets/js/src/*.js'], ['scripts']);
});

gulp.task('default', ['doallthethings']);
