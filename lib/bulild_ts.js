const exex = require("child_process").exec;

/**
 * rollupでバンドルしつつ、ファイルを書き出す。基本rollup.config.jsを参照
 * @param {*} entry entry file
 * @param {*} outputPath output file path
 * @param {*} fileName file name
 * @param {*} target "develop" or "production"
 */
const build = (entry, outputPath, fileName, target) => {
  return new Promise(resolve => {
    exex(
      `R_ENTRY=${entry} R_OUTPUT=${outputPath} R_FILENAME=${fileName} TARGET=${target} rollup -c`,
      () => {
        resolve();
      }
    );
  });
};

module.exports = build;
