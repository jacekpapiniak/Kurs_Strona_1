import gulp from 'gulp';
const { src, dest, watch, series } = gulp;
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import terser from 'gulp-terser';
import imagemin from 'gulp-imagemin';
import concat from 'gulp-concat';
import browserSync, { create} from 'browser-sync';

const paths = {
    scss: {
        src: './scss/**/*.scss',
        dest: './dist/css'
    },
    js: {
        src: './js/**/*.js',
        dest: './dist/js'
    },
    html: {
        src: './*.html',
        dest: './dist'
    },
    img: {
        src: './img/**/*.*',
        dest: './dist/img'
    }
}

function styleTask() {
    return src(paths.scss.src, { sourcemaps: true })
        .pipe(concat('style.css'))
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest(paths.scss.dest), { sourcemaps: '.' })
        .pipe(browserSync.stream())
}

function jsTask() {
    return src(paths.js.src, { sourcemaps: true })
        .pipe(concat('all.js'))
        .pipe(terser())
        .pipe(dest(paths.js.dest), { sourcemaps: '.' })
        .pipe(browserSync.stream())
}

function htmlTask() {
    return src(paths.html.src)
        .pipe(dest(paths.html.dest))
}

function imgTask() {
    return src(paths.img.src)
        .pipe(imagemin())
        .pipe(dest(paths.img.dest))
}

function watchTask() {

    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });

    watch(paths.html.src, htmlTask).on('change', browserSync.reload);
    watch(paths.img.src, imgTask);
    watch(paths.scss.src, styleTask);
    watch(paths.js.src, jsTask);
}

const _default = series(
    styleTask,
    jsTask,
    imgTask,
    htmlTask,
    watchTask
);
export { _default as default };