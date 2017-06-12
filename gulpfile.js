'use strict';

var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');

var sass = require('gulp-sass');
var browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');
var reload = browserSync.reload;
var pug = require('gulp-pug2');

gulp.task('pug', function() {
    return gulp.src('pug/index.pug')
        .pipe(pug({ yourTemplate: 'Locals' }))
        .pipe(gulp.dest(''))
        .pipe(reload({stream:true}));
});



var paths = {
    html:['index.html'],
    css:['css/*.css'],
    scss:['css/style.scss'],
    pug:['pug/*.pug']
};


gulp.task('html', function(){
    gulp.src(paths.html)
        .pipe(reload({stream:true}));
});


gulp.task('sass', function () {
    return gulp.src('css/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css'))
        // .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css'))
        .pipe(reload({stream:true}));
});

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: "./"
        },
        port: 8080,
        open: true,
        notify: false
    });
});


gulp.task('concat', function () {
    return gulp.src('css/*.css')
        .pipe(concatCss("bundle.css"))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('css/'));
});



gulp.task('watcher',function(){
    gulp.watch(paths.scss, ['sass']);
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.pug, ['pug']);
});

gulp.task('default', ['watcher', 'sass', 'browserSync', 'pug']);
