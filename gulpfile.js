var gulp = require('gulp-help')(require('gulp'));
var util = require('gulp-util');
var eslint = require('gulp-eslint');
var jscs = require('gulp-jscs');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');

gulp.task('default', ['test', 'lint'], function () {
  // This will only run if the lint task is successful...
});

gulp.task('lint', 'Validate JS Styling and Code Analysis', function () {

  var fileStream = gulp.src(['api/**/*.js']);

  log('Running JSCS ...')
  fileStream = fileStream.pipe(jscs());

  log('Running ESLint ...')
  fileStream = fileStream.pipe(eslint())
    .pipe(eslint.format('compact'))
    // To have the process exit with an error code (1) on lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());

  return fileStream;

});

gulp.task('pre-test', 'performs code instrumentation for coverage during unit tests', function () {
  return gulp.src(['api/**/*.js', '!api/**/*.test.js'])

    // Covering files
    .pipe(istanbul({ includeUntested: true }))

    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

gulp.task('test', 'Runs unit tests', ['pre-test', 'lint'], function () {

  return gulp.src(['api/**/*.test.js'])
    .pipe(mocha({ reporter: 'spec' })) //nyan

    // Creating the reports after tests ran
    .pipe(istanbul.writeReports({
      dir: './coverage',
      reporters: ['lcov', 'json', 'text-summary'] //'text',
    }))

  // Enforce a coverage of at least 90%
  //.pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});

gulp.task('integration-test', 'Starts Sails app and runs integration tests', function () {

  return gulp.src(['integration-test/*.test.js'])
    .pipe(mocha())
    .once('error', function () {
      process.exit(1);
    })
    .once('end', function () {
      process.exit();
      util.log(util.colors.blue('Karma completed succesfully...'));
    });

})

function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        util.log(util.colors.blue(msg[item]));
      }
    }
  }
  else {
    util.log(util.colors.blue(msg));
  }
}
