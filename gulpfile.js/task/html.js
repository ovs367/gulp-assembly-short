// //Используем деструктуризацию
// const { src, dest } = require("gulp");
// // const browserSync = require("browser-sync").create();

// // Конфигурация
// const path = require("../config/path.js");
// const app = require("../config/app.js");

// //Плагины
// const plumber = require("gulp-plumber");
// const notify = require("gulp-notify");
// const fileInclude = require("gulp-file-include");
// const htmlmin = require("gulp-htmlmin");
// const size = require("gulp-size");
// const webpHtml = require("gulp-webp-html");

//Обработка HTML
const html = () => {
  return $.gulp
    .src($.path.html.src)
    .pipe(
      $.gp.plumber({
        errorHandler: $.gp.notify.onError((error) => ({
          title: "HTML",
          message: error.message,
        })),
      })
    )
    .pipe($.gp.fileInclude())
    .pipe($.gp.webpHtml())
    .pipe($.gp.size({ title: "Before minimization" }))
    .pipe($.gp.htmlmin($.app.htmlmin))
    .pipe($.gp.size({ title: "After minimization" }))
    .pipe($.gulp.dest($.path.html.dest))
    .pipe($.browserSync.stream());
};

//Задачи
module.exports = html;
