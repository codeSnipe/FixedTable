var gulp = require('gulp');
var jshint = require('gulp-jshint');//语法检查
var concat = require('gulp-concat');//合并文件
var uglify = require('gulp-uglify');//压缩代码
var rename = require('gulp-rename');//重命名
// 语法检查
gulp.task('jshint', function () {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
// 合并文件之后压缩代码
gulp.task('minify', function (){
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('build'))
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('build'));
});
// 监视文件的变化
gulp.task('watch', function () {
    gulp.watch('js/*.js', ['jshint', 'minify']);
});
// 注册缺省任务
gulp.task('default', ['jshint', 'minify', 'watch']);
// gulp.task('default', ['jshint', 'minify']);