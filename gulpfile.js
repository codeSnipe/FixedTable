var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    jshint = require('gulp-jshint'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename');
gulp.task('default',['jshint','uglify','cssmin','imagemin'],function(){});
gulp.task('jshint',function(){
   return gulp.src("app/develop/*.js")
       .pipe(jshint())
       .pipe(jshint.reporter('default'));
});
gulp.task('uglify',function(){
   return gulp.src("app/develop/*.js")
       .pipe(uglify())
       .pipe(rename(function(path){
           path.extname = ".min.js";
       }))
       .pipe(gulp.dest("app/release"));
});
gulp.task('cssmin',function(){
   return gulp.src('app/develop/*.css')
       .pipe(cssmin())
       .pipe(rename(function(path){
           path.extname = ".min.css";
       }))
       .pipe(gulp.dest('app/release'));
});
gulp.task('imagemin',function(){
    return gulp.src("app/develop/images/*.png")
        .pipe(imagemin())
        .pipe(gulp.dest('app/release/images'));
});