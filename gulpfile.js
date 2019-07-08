const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

gulp.task('default', ['styles', 'html', 'scripts', 'images'], () => {
   gulp
       .watch('/index.html', ['html']);
   gulp
       .watch('css/*.css', ['styles']);
   gulp
       .watch('js/*.js', ['scripts']);
   gulp
       .watch('img/*', ['img']);
   browserSync
       .init({
          server: './dist'
       })
});

gulp.task('dist', ['styles', 'html', 'images', 'scripts'], () => {

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

gulp.task('scripts', () => {
   gulp
       .src('js/*.js')
       .pipe(sourcemaps.init())
       .pipe(sourcemaps.write())
       .pipe(gulp.dest('dist/js'));
});

gulp.task('images', () => {
   return gulp
       .src('img/*')
       .pipe(imagemin({
          progressive: true,
          use: [pngquant()]
       }))
       .pipe(gulp.dest('dist/img'))
});
