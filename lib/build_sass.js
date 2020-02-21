const sass = require("node-sass");
const packageImporter = require("node-sass-package-importer");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const fs = require("fs-extra");

/**
 * sassをレンダリングして書き出す。戻り値のレンダリング済みのcssを返す。promise
 * @param {*} entry entriy file path
 * @param {*} outputPath output file path
 * @param {*} sassConfig config of sass
 * @param {*} prefixerConf config of autoprefixer
 */
const build = (
  entry,
  outputPath,
  sassConfig = {},
  prefixerConf = {
    grid: true,
    overrideBrowserslist: ["> 1%", "last 2 versions", "Firefox ESR"]
  }
) => {
  const sassDefaultConf = {
    importer: packageImporter()
  };

  return new Promise((resolve, reject) => {
    sass.render(
      { file: entry, ...sassDefaultConf, ...sassConfig },
      (err, data) => {
        if (data === null || err) reject(err);

        postcss([autoprefixer(prefixerConf)])
          .process(data.css, {
            from: entry
          })
          .then(result =>
            fs.writeFile(outputPath, result.css, () => resolve(result.css))
          );
      }
    );
  });
};

module.exports = build;
