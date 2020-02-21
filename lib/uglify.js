const uglify = require("uglify-es");
const fs = require("fs-extra");

const mifnify = path => {
  let licenseComments = [];
  return new Promise(resolve => {
    fs.readFile(path, (err, data) => {
      const result = uglify.minify(data.toString(), {
        output: {
          comments: (node, comment) => {
            if (/@license/.test(comment.value))
              licenseComments.push(comment.value);
          }
        }
      });

      licenseComments = licenseComments.map(comment => `/*${comment}*/\n`);

      const code = licenseComments
        .concat([result.code])
        .reduce((a, c) => a + c);

      fs.writeFile(path, code, () => {
        resolve(code);
      });
    });
  });
};

module.exports = mifnify;
