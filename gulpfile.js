'use strict';

//dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var changed = require('gulp-changed');


//SCSS/CSS
var SCSS_src = './src/Assets/scss/**/*.scss';
var SCSS_dest = './src/Assets/css';

//compile scss
gulp.task('compile_scss', function() {
  gulp.src(SCSS_src)
  	.pipe(sass().on('error', sass.logError))
  	.pipe(minifyCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(changed(SCSS_dest))
    .pipe(gulp.dest(SCSS_dest));
});

//detect changegs in scss
gulp.task('watch_scss', function() {
  gulp.watch(SCSS_src, ['compile_scss']);
});

//run
gulp.task('default', ['watch_scss']);
