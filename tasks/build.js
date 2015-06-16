'use strict';

var fs = require('fs');
var browserSync = require('browser-sync');
var program = require('commander');

program
  .option('-p, --prod', 'enforce production environment')
  .option('-c, --compress', 'produce a zip package')
  .parse(process.argv);

gulp.task('build:all', [
  'build:slides',
  'build:vendors'
]);

gulp.task('build:vendors', function () {
  var bowerConfig = JSON.parse(fs.readFileSync('./.bowerrc', 'utf8'));

  var src = [
    './' + bowerConfig['directory'] + '/remark/out/*.js'
  ];

  return gulp.src(src)
    .pipe(ignore('*.ts'))
    .pipe(gulp.dest('./build/js/'));
});