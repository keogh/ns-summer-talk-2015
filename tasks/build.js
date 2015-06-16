'use strict';

var gulp = require('gulp');
var fs = require('fs');
var browserSync = require('browser-sync');
var program = require('commander');

var gReplace = require('gulp-replace');
var buffer = require('gulp-buffer');
var include = require('gulp-include');
var ignore = require('gulp-ignore');

program
  .option('-p, --prod', 'enforce production environment')
  .option('-c, --compress', 'produce a zip package')
  .parse(process.argv);

gulp.task('build:all', [
  'build:slides',
  'build:vendors'
]);

gulp.task('build:slides', function () {
  var slides = [];
  JSON.parse(fs.readFileSync('./src/slides.json', 'utf8')).slides.forEach(function (slide) {
    slides.push('slides/' + slide + '.md');
  });

  var replacement = '//= include ' + JSON.stringify(slides);

  return gulp.src('./src/index.html')
    .pipe(gReplace(/\<\!\-\- replace\:slides \-\-\>/, replacement))
    .pipe(buffer())
    .pipe(include())
    .pipe(gulp.dest('./build/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('build:vendors', function () {
  var bowerConfig = JSON.parse(fs.readFileSync('./.bowerrc', 'utf8'));

  var src = [
    './' + bowerConfig['directory'] + '/remark/out/*.js'
  ];

  return gulp.src(src)
    .pipe(ignore('*.ts'))
    .pipe(gulp.dest('./build/js/'));
});