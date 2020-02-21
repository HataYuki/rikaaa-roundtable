const gulp = require("gulp");
const path = require("path");
const buildPug = require("./lib/build_pug");
const buildSass = require("./lib/build_sass");
const bs = require("browser-sync");
const exex = require("child_process").exec;

const webpack = require("webpack");
const webpackConf = require("./webpack.config");
const karma = require("karma").Server;
const karmaConf = require("./karma.config");

const fs = require("fs-extra");

const minify = require("./lib/uglify");
const addScss = require("./lib/addScss");

const conf = require("./config");

gulp.task("pug", async cb => {
  await buildPug(
    path.resolve("assets", "index.pug"),
    path.resolve("example", "index.html")
  );
  cb();
});

gulp.task("scss", async cb => {
  await buildSass(
    path.resolve("assets", "style.scss"),
    path.resolve("example", "style.css")
  );
  cb();
});

gulp.task("ts", cb => {
  exex("yarn run rollup --config rollup.dev.config.js", () => {
    addScss("example/webcomponent.dev.js");
    cb();
  });
});

gulp.task("copyImg", cb => {
  fs.copy("assets/images", "example/images").then(() => cb());
});
gulp.task("copyJs", cb => {
  fs.copy("assets/index.js", "example/index.js").then(() => cb());
});

gulp.task(
  "develop",
  gulp.series("pug", "scss", "ts", "copyImg", "copyJs", cb => {
    bs.init({
      server: "example"
    });

    gulp.watch("assets/index.pug", gulp.task("pug"));
    gulp.watch("assets/style.scss", gulp.task("scss"));
    gulp.watch(["src/**/*.ts", "src/**/*.scss"], gulp.task("ts"));
    gulp.watch("assets/images/*", gulp.task("copyImg"));
    gulp.watch("assets/index.js", gulp.task("copyJs"));

    gulp.watch(
      [
        "example/**/*.html",
        "example/**/*.css",
        "example/**/*.js",
        "example/images/"
      ],
      cb => {
        bs.reload();
        cb();
      }
    );

    cb();
  })
);

gulp.task(
  "production",
  gulp.series("ts", async cb => {
    exex("yarn run rollup --config rollup.prod.config.js", async () => {
      await addScss(`dist/${conf.fileName}`);
      await addScss(`dist/${conf.mapFileName}`);
      await minify(`dist/${conf.fileName}`).then(() => cb());
    });
  })
);

gulp.task("spec", cb => {
  const compiler = webpack(webpackConf);
  compiler.run(() => cb());
});
gulp.task("karma", cb => {
  const server = new karma(karmaConf);
  server.start();
  cb();
});

gulp.task(
  "test",
  gulp.series("spec", "karma", cb => {
    gulp.watch("spec/**/*.spec.ts", gulp.task("spec"));
    cb();
  })
);
