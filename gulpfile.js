
// Core node modules.
var path = require('path');
var fs = require('fs');

// Third party node modules.
var browserify = require('browserify');
var babelify = require('babelify');
var gulp = require('gulp');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');

// Vinyl modules.
var transform = require('vinyl-transform');
var source = require('vinyl-source-stream');

// Gulp modules.
var less = require('gulp-less');
var batch = require('gulp-batch');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var minifyCSS = require('gulp-minify-css');

/**
 * Watches for changes to certain files and builds the site accordingly.
 */
gulp.task('watch', function() {
  watch('./src/styles/**/*.less', batch(function (events, done) {
    gulp.start('less', done);
  }));

  watch('./src/scripts/**/*.js', batch(function (events, done) {
    gulp.start('browserify', done);
  }));
});

/**
 * Compiles es6 code into a browserify bundle.
 */
gulp.task('browserify', function () {
  fs.readdirSync('./src/scripts').forEach(function(file) {
    if (file.indexOf('.js') === -1) {
      return;
    }

    browserify('./src/scripts/' + file, { debug: true })
      .transform(babelify)
      .bundle()
      .pipe(source(file))
      .pipe(gulp.dest('./dist/scripts/'));
  });
});

/**
 * Runs your CSS through the JavaScript version of Less rather than the
 * Squarespace custom Less compiler.
 */
gulp.task('less', function () {
  var autoprefix = new LessPluginAutoPrefix({ browsers: ["last 3 versions"] });

  return gulp.src('./src/styles/*.less')
    .pipe(less({
      plugins: [ autoprefix ],
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/styles'));
});

/**
 * Make watch the default task.
 */
gulp.task('default', ['build', 'watch']);

/**
 * Create a build task that does everything, including cache invalidation.
 */
gulp.task('build', ['less', 'browserify']);
