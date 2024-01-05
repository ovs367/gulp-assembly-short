global.$ = {
  //Пакеты
  gulp: require("gulp"),
  gp: require("gulp-load-plugins")(),
  sass: require("sass"),
  browserSync: require("browser-sync").create(),
  //Конфигурация
  path: require("./config/path.js"),
  app: require("./config/app.js"),
  webpack: require("webpack-stream"),
  del: require("del"),
};

const requireDir = require("require-dir");
const task = requireDir("./task", { recurse: true });

const watcher = () => {
  $.gulp.watch($.path.pug.watch, task.pug);
  //$.gulp.watch($.path.html.watch, task.html);
  //$.gulp.watch($.path.css.watch, task.css);
  $.gulp.watch($.path.scss.watch, task.scss);
  $.gulp.watch($.path.js.watch, task.js);
  $.gulp.watch($.path.img.watch, task.img);
  $.gulp.watch($.path.font.watch, task.font);
};

const build = $.gulp.series(
  task.clear,
  $.gulp.parallel(task.pug, task.scss, task.js, task.img, task.font)
);

const dev = $.gulp.series(build, $.gulp.parallel(task.server, watcher));

//Задачи
exports.html = html;
exports.pug = task.pug;
exports.watch = watcher;
exports.clear = clear;
exports.css = task.css;
exports.scss = task.scss;
exports.js = task.js;
exports.img = task.img;
exports.font = task.font;

exports.default = $.app.isProd ? build : dev;
