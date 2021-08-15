const { series, src, dest, watch } = require('gulp');
var sass = require('gulp-sass')(require('sass'));

function buildStyles() {
  return src('./sass/*.scss')
    .pipe(sass())
    .pipe(dest('./css'));
};

function wacthArchivo(){
    watch('./sass/*.scss', buildStyles)
}

exports.buildStyles = buildStyles;
exports.wacthArchivo = wacthArchivo;