// //Используем деструктуризацию
// const { src, dest } = require("gulp");

// // Конфигурация
// const path = require("../config/path.js");
// const app = require("../config/app.js");

// //Плагины
// const plumber = require("gulp-plumber");
// const notify = require("gulp-notify");
// const concat = require("gulp-concat");
// const cssimport = require("gulp-cssimport");
// const autoprefixer = require("gulp-autoprefixer");
// const csso = require("gulp-csso");
// const rename = require("gulp-rename");
// const size = require("gulp-size");
// const shorthand = require("gulp-shorthand");
// const groupCssMediaQueries = require("gulp-group-css-media-queries");
// const webpCss = require("gulp-webp-css");

//Обработка CSS
const css = () => {
  return $.gulp
    .src($.path.css.src, { sourcemaps: $.app.isDev })
    .pipe(
      $.gp.plumber({
        errorHandler: $.gp.notify.onError((error) => ({
          title: "CSS",
          message: error.message,
        })),
      })
    )
    .pipe($.gp.concat("main.css"))
    .pipe($.gp.cssimport())
    .pipe($.gp.webpCss())
    .pipe($.gp.autoprefixer())
    .pipe($.gp.shorthand())
    .pipe($.gp.groupCssMediaQueries())
    .pipe($.gp.size({ title: "main.css" }))
    .pipe($.gulp.dest($.path.css.dest, { sourcemaps: $.app.isDev }))
    .pipe($.gp.rename({ suffix: ".min" }))
    .pipe($.gp.csso())
    .pipe($.gp.size({ title: "main.min.css" }))
    .pipe($.gulp.dest($.path.css.dest, { sourcemaps: $.app.isDev }))
    .pipe($.browserSync.stream());
};

module.exports = css;
