const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['styles'], () => {
   gulp
       .watch('css/*.css', ['styles']);
   gulp
       .watch('/index.html', ['html']);
   browserSync
       .init({
          server: './dist'
       })
});

gulp.task('dist', ['html', 'styles'], () => {

});

gulp.task('html', () => {
   gulp
       .src('./index.html')
       .pipe(gulp.dest('./dist'))
});

gulp.task('styles', () => {
   gulp
       .src('css/*.css')
       .pipe(sourcemaps.init())
       .pipe(cleanCSS())
       .pipe(autoprefixer({
          browsers: ['last 2 versions']
       }))
       .pipe(sourcemaps.write())
       .pipe(gulp.dest('dist/css'))
       .pipe(browserSync.stream());
});
