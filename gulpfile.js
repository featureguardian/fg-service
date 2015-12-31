var gulp = require('gulp');
var eslint = require('gulp-eslint');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');

gulp.task('default', ['lint'], function () {
  // This will only run if the lint task is successful...
});

gulp.task('lint', function () {

  return gulp.src(['api/**/*.js', '!api/**/*test.js'])

    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())

    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())

    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});

gulp.task('pre-test', function () {
  return gulp.src(['api/**/*.js', '!api/**/*.test.js'])

    // Covering files
    .pipe(istanbul({includeUntested: true}))

    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function () {
  return gulp.src(['api/**/*.test.js'])
    .pipe(mocha())

    // Creating the reports after tests ran
    .pipe(istanbul.writeReports())

  // Enforce a coverage of at least 90%
  //.pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});

gulp.task('integration-test', function () {

  return gulp.src(['integration-test/*.test.js'])
    .pipe(mocha());

})
