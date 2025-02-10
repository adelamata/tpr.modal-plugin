const { src, dest, watch, series, parallel } = require("gulp");
const uglify = require("gulp-uglify");
const notify = require("gulp-notify");
const rename = require("gulp-rename");
const cssnano = require("gulp-cssnano");

function jsMinToProduction() {
  return src("src/js/*.js")
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("dist/js"))
    .pipe(notify({ message: "JSMinToProduction success!" }));
}

function cssMinToProduction() {
  return src("src/css/*.css")
    .pipe(cssnano())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("dist/css"))
    .pipe(notify({ message: "CSSMinToProduction success!" }));
}

function jsAndCssForExamples() {
  return (
    src("src/js/*.js").pipe(dest("examples/resources/js")),
    src("src/css/*.css")
      .pipe(dest("examples/resources/css"))
      .pipe(
        notify({
          message: "JS and CSS Files have been moved to examples/resources",
        })
      )
  );
}

function watchFiles() {
  watch("src/js/*.js", jsAndCssForExamples);
  watch("src/css/*.css", jsAndCssForExamples);
}

exports.jsMinToProduction = jsMinToProduction;
exports.cssMinToProduction = cssMinToProduction;
exports.jsAndCssForExamples = jsAndCssForExamples;
exports.watch = watchFiles;
exports.default = parallel(jsMinToProduction, cssMinToProduction);
