const scss = require("./build_sass");
const fs = require("fs-extra");

const delet = "./delet.css";
const addScss = async path => {
  return new Promise(resolve => {
    fs.readFile(path, async (err, data) => {
      const inputcssTarget = data.toString().match(/\$\{\{\{.*\}\}\}/g)[0];
      const scssPath = inputcssTarget.replace("${{{", "").replace("}}}", "");
      const css = await scss(scssPath, delet, { outputStyle: "compressed" });

      const code = data
        .toString()
        .replace(/\$\{\{\{.*\}\}\}/g, css.replace(/\n/g, ""));
      fs.writeFile(path, code, () => {
        fs.removeSync(delet);
        resolve();
      });
    });
  });
};

module.exports = addScss;
