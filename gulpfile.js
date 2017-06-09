var gulp = require('gulp'),
    gulpUglify = require('gulp-uglify')
gulpNotify = require('gulp-notify'),
    gulpRename = require('gulp-rename'),
    gulpCSS = require('gulp-cssnano');

gulp.task('JSMinToProduction', function () {
    return gulp.src('src/js/*.js')
        .pipe(gulpUglify())
        .pipe(gulpRename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'))
        .pipe(gulpNotify({ message: 'JSMinToProduction success!' }));
});

gulp.task('CSSMinToProduction', function () {
    return gulp.src('src/css/*.css')
        .pipe(gulpCSS())
        .pipe(gulpRename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(gulpNotify({ message: 'CSSMinToProduction success!' }))

});


gulp.task('JSAndCSSForExamples', function () {
    gulp.src('src/js/*.js')
        .pipe(gulp.dest('examples/resources/js'))

    gulp.src('src/css/*.css')
        .pipe(gulp.dest('examples/resources/css'))
        .pipe(gulpNotify({ message: 'JS and CSS Files has been moved to examples/resources' }));
});


gulp.task('watch', function () {
    gulp.watch('src/js/*.js', ['JSAndCSSForExamples']);
    gulp.watch('src/css/*.css', ['JSAndCSSForExamples']);
});