
var gulp = require("gulp");
const { series, parallel } = require('gulp');
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var concatCss = require('gulp-concat-css');


function style () {
  return gulp.src("./source/less/**/*.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
     .pipe(concatCss("style.css"))
    .pipe(gulp.dest("source/css/"))
    .pipe(server.stream());
}


function serve () {
 server.init({
    server: './source',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("./source/less/**/*.less", style);
  gulp.watch("./source/*.html").on("change", server.reload);

}

exports.build = style
exports.default = series(style, serve)
