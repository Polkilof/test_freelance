'use strict';

let gulp = require('gulp'),
    gulpsync = require('gulp-sync')(gulp),
    clean = require('gulp-clean'),
    browser = require('browser-sync').create(),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    prefix = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    changed = require('gulp-changed'),
    rigger = require('gulp-rigger'),
    ghPages = require('gulp-gh-pages');

gulp.task('default', gulpsync.sync(['clean', ['html', 'styles', 'noPrefix', 'js', 'js2', 'fonts', 'images', 'browser', 'watch']]));

gulp.task('browser', () => {
    browser.init({
        server: {
            baseDir: "public/",
            injectChanges: true
        }
    });
});

gulp.task('clean', () => {
    return gulp.src('public/', {read: false})
        .pipe(clean());
});

gulp.task('deploy', function() {
  return gulp.src('./public/**/*')
    .pipe(ghPages());
});

gulp.task('html', () => {
    return gulp.src(['src/**/*.html', '!src/inc/*.html', 'src/**/*.php'])
        .pipe(rigger())
        .pipe(gulp.dest('public/'));
});


gulp.task('styles', () => {
  gulp.src('./src/sass/**/*.scss')
    //.pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    //.pipe(sourcemaps.write())
    .pipe(prefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('src/css'))
    .pipe(gulp.dest('public/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('src/css'))
    .pipe(gulp.dest('public/css'))
    .pipe(browser.reload({stream:true}));
});

gulp.task('noPrefix', () => {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: '../../../src/scss'
        }))
        .pipe(gulp.dest('./src/css'))
        .pipe(gulp.dest('./public/css'));
});

// gulp.task('js', () => {
//    return gulp.src('src/js/**/*.js')
//        .pipe(sourcemaps.init())
//        .pipe(concat('bundle.js'))
//        .pipe(gulp.dest('public/js/'))
//        .pipe(babel({presets: ['env']}))
//        .pipe(uglify())
//        .pipe(rename({suffix: '.min'}))
//        .pipe(sourcemaps.write('.'))
//        .pipe(gulp.dest('public/js/'));
// });
gulp.task('js', () => {
  return gulp.src(['./src/js/**/*.js', '!./src/js/**/*.min.js'])
    .pipe(gulp.dest('public/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
    .pipe(browser.reload({stream:true}));
});
gulp.task('js2', () => {
  return gulp.src(['./src/js/**/*.min.js'])
    .pipe(gulp.dest('public/js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
    .pipe(browser.reload({stream:true}));
});

gulp.task('images', () => {
   gulp.src('./src/images/**/*.*')
       .pipe(changed('public/images'))
       .pipe(imagemin({progressive: true, optimizationLevel: 0, interlaced: true}))
       .pipe(gulp.dest('public/images'));
});

gulp.task('fonts', () => {
  gulp.src('./src/fonts/**/*.*')
    .pipe(gulp.dest('public/fonts/'));
});

gulp.task('watch', () => {
    // Watch .html files
    gulp.watch('src/**/*.html', ['html', browser.reload]);
    gulp.watch("public/*.html").on('change', browser.reload);
    // Watch .sass files
    gulp.watch('src/sass/**/*.scss', ['styles', browser.reload]);
    gulp.watch('src/css/**/*.css', ['noPrefix', browser.reload]);
    gulp.watch('src/css/**/*.css.map', ['noPrefix', browser.reload]);
    // Watch .js files
    gulp.watch('src/js/*.js', ['js', browser.reload]);
    gulp.watch('src/js/*.js', ['js2', browser.reload]);
    // Watch image files
    gulp.watch('src/images/**/*', ['images', browser.reload]);
    // Watch .fonts files
    gulp.watch('src/fonts/**/*.*', ['fonts', browser.reload]);
});