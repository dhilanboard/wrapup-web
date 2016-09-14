'use strict';

//include plugins
var gulp                = require('gulp'),
    sass                = require('gulp-sass'),
    browserSync         = require('browser-sync').create(),
    autoprefixer        = require('gulp-autoprefixer'),
    jshint              = require('gulp-jshint'),
    inject              = require('gulp-inject'),
    sourcemaps          = require('gulp-sourcemaps'),
    concat              = require('gulp-concat'),
    rename              = require('gulp-rename'),
    imagemin            = require('gulp-imagemin'),
    uglify              = require('gulp-uglify');


// SCSS Task
gulp.task('sass', function() {
    gulp.src('client/src/app/scss/**/*.scss')
        .pipe(autoprefixer())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./client/src/app/css'))
        .pipe(browserSync.reload({stream: true}));
});

// JS Hint Task
gulp.task('jshint', function() {
    return gulp.src('client/src/app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//script paths
var jsFiles = 'client/src/assets/javascript/**/*.js',
    jsDest = './client/src/app/js';

// JS Concat | Uglify
gulp.task('scripts', function() {
    return gulp.src(jsFiles)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

// Image Optimization
gulp.task('imageop', function(){
    gulp.src('client/src/assets/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./client/src/app/images'));
});

// Injecting CSS + JS
gulp.task('index', function () {
    gulp.src('./client/src/app/**/*.html')
      .pipe(inject(gulp.src(['./client/src/app/js/jquery-3.1.0.min.js', './client/src/app/js/vendor.min.js', './client/src/app/js/wrapup.js'], {read: false}), {relative: true}))
      .pipe(inject(gulp.src('./client/src/app/**/*.css', {read: false}), {relative: true}))
      .pipe(gulp.dest('./client/src/app'));
});

// Browser Sync
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        injectChanges: true,
        server: {
            baseDir: 'client/src/app/'
        }
    });

    gulp.watch('client/src/app/**/*.scss', ['sass']);
//    gulp.watch('client/src/app/**/*.js', ['jshint']);
    gulp.watch('client/src/app/**/*.js', ['scripts']);
    gulp.watch('client/src/app/*.html').on('change', function(){
        browserSync.reload();
    });
});


gulp.task('default', ['index', 'scripts', 'imageop', 'serve']);













