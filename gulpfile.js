const { series, src, dest, watch } = require('gulp');
const gulpWebp = require('gulp-webp');
const sass = require('gulp-sass')(require('sass'));

function buildStyles() {
  return src('./sass/*.scss')
    .pipe(sass())
    .pipe(dest('./css'));
};

function watchArchivo(){
    watch('./sass/*.scss', buildStyles);
}


exports.buildStyles = buildStyles;
exports.watchArchivo = watchArchivo;