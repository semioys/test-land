const gulp = require('gulp'),
      browserSync = require('browser-sync').create(),
      pug = require('gulp-pug'),
      sass = require('gulp-sass'),
      spritesmith = require('gulp.spritesmith'),
      rimraf = require('rimraf'),
      rename = require("gulp-rename");

// Setup server
gulp.task('server', function() {
  browserSync.init({
      server: {
        port: 9000,
        baseDir: "build"
      }
  });
  gulp.watch('build/**/*').on('change', browserSync.reload);
});

// Compile pug
gulp.task('templates:compile', function buildHTML() {
  return gulp.src('source/templates/index.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('build'))
});

// Compile sass
gulp.task('styles:compile', function () {
  return gulp.src('source/styles/main.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }
    ).on('error', sass.logError))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('build/css'));
});

// Convert sprites
gulp.task('sprite', function (cb) {
  const spriteData = gulp.src('source/iamges/icons/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    imgPath: '../images/sprite.png',
    cssName: 'sprite.css'
  }));
  
  spriteData.img.pipe(gulp.dest('build/images/'));
  spriteData.css.pipe(gulp.dest('source/styles/global/'));
  cb();
});

// Delete
gulp.task('clean', function(cb) {
  return rimraf('build', cb);
});

// Copy fonts
gulp.task('copy:fonts', function() {
  return gulp.src('source/fonts/**/*.*')
    .pipe(gulp.dest('build/fonts'));
});

// Copy images
gulp.task('copy:images', function() {
  return gulp.src('source/images/**/*.*')
    .pipe(gulp.dest('build/images'));
});

// Copy All
gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images'));

// Watchers
gulp.task('watch', function() {
  gulp.watch('source/template/**/*.pug', gulp.series('templates:compile'));
  gulp.watch('source/styles/**/*.scss', gulp.series('styles:compile'));  
});

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('templates:compile', 'styles:compile', 'sprite', 'copy'),
    gulp.parallel('watch', 'server')
  )
);