const pug = require("pug");
const fs = require("fs-extra");

/**
 * pugをレンダリングする。戻り値として、htmlを返す。
 * @param {*} entry レンダリングするパグのエントリーポイントのパス。
 * @param {*} ouputPuth レンダリング後のhtmlの書き出し先
 * @param {*} config pugの設定。
 */
const build = (entry, ouputPuth, config = {}) => {
  return new Promise(resolve => {
    const fn = pug.compileFile(entry, config);
    fs.writeFile(ouputPuth, fn(), () => resolve(fn()));
  });
};

module.exports = build;
