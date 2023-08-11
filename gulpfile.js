const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const sync = require('browser-sync').create()
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const del = require('del')

function html() {
    return src('src/**.html')
        .pipe(include({prefix:'@@'}))
        .pipe(htmlmin({
            collapseWhitespace:true,
        }))
        .pipe(dest('dist'))
}

function scss() {
    return src('src/styles/**.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions']
        }))
        .pipe(csso())
        .pipe(concat('index.css'))
        .pipe(dest('dist'))
}

function clear() {
    return del('dist')
}

function serve() {
    sync.init({
        server:'./dist'
    })
    watch('src/**.html', series(html)).on('change', sync.reload)
    watch('src/styles/**.scss', series(scss)).on('change', sync.reload)
    watch('src/scripts/**.js', series(copyScripts)).on('change', sync.reload)
}

function copyAssets() {
    return src('src/assets/**')
        .pipe(dest('dist/assets'))
}

function copyScripts() {
    return src('src/scripts/**')
        .pipe(concat('index.js'))
        .pipe(dest('dist'))
}

exports.build = series(clear, scss, html, copyAssets, copyScripts)
exports.serve = series(clear, scss, html, copyAssets,copyScripts, serve)
exports.clear = clear