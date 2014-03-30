var cp = require('child_process');
var fs = require('fs');
var gulp = require('gulp');

var argv = require('minimist')(process.argv.slice(2));

var concat = require('gulp-concat');
var inject = require('gulp-inject');
var gulpif = require('gulp-if');
var ngmin = require('gulp-ngmin');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');

var PRODUCTION = !!argv.release;
var DIST = 'dist';

gulp.task('default', ['build']);
gulp.task('build', ['inject:html']);

gulp.task('watch', function() {
  gulp.watch([
    'js/**/*.js',
    'scss/**/*.scss',
    'template/**/*.html',
    'index.template.html'
  ], ['build']);
});

gulp.task('clean', function(done) {
  cp.exec('rm -rf ' + DIST, done);
});

gulp.task('index', ['clean'], function() {
  return gulp.src('index.template.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest(DIST));
});
gulp.task('assets', ['index'], function() {
  return gulp.src('assets/**/*')
    .pipe(gulp.dest(DIST));
});
var vendorFiles = [
  'bower_components/moment/moment.js',
  'bower_components/firebase/firebase.js',
  'bower_components/firebase-simple-login/firebase-simple-login.js',
  'bower_components/angular/angular.js',
  'bower_components/angular-animate/angular-animate.js',
  'bower_components/angularfire/angularfire.js',
  'bower_components/angular-bindonce/bindonce.js'
];
gulp.task('compile:vendor', ['assets'], function() {
  return gulp.src(vendorFiles, {base: '.'})
    .pipe(gulpif(PRODUCTION, uglify()))
    .pipe(gulp.dest(DIST));
});
gulp.task('inject:vendor', ['compile:vendor'], function() {
  var vendorStream = gulp.src(vendorFiles);

  return gulp.src(DIST+'/index.html')
    .pipe(inject(vendorStream, {
      starttag: '<!-- inject:vendor:js -->',
      addRootSlash: false
    }))
    .pipe(gulp.dest(DIST));
});
gulp.task('compile:js', ['inject:vendor'], function() {
  return gulp.src('js/**/*.js', {base: '.'})
    .pipe(ngmin())
    .pipe(gulpif(PRODUCTION, uglify()))
    .pipe(gulp.dest(DIST));
});
gulp.task('inject:js', ['compile:js'], function() {
  var jsStream = gulp.src('js/**/*.js');

  return gulp.src(DIST+'/index.html')
    .pipe(inject(jsStream, { addRootSlash: false }))
    .pipe(gulp.dest(DIST));
});
gulp.task('compile:css', ['inject:js'], function() {
  gulp.src('scss/main.scss', {base: '.'})
    .pipe(sass())
    .pipe(gulpif(PRODUCTION, minifyCss()))
    .pipe(concat('style.css'))
    .pipe(gulp.dest(DIST + '/css'));
});
gulp.task('inject:html', ['compile:css'], function() {
  var templateStream = gulp.src('template/**/*.html', {base:'.'});

  return gulp.src(DIST+'/index.html')
    .pipe(inject(templateStream, {
      addRootSlash: false,
      transform: function(filepath, file) {
        return '<script type="text/ng-template" id="' + file.relative + '">' + 
          file.contents.toString() + '</script>';
      }
    }))
    .pipe(gulp.dest(DIST));
});
