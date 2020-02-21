const ts = require("rollup-plugin-typescript");
const license = require("rollup-plugin-license");
const conf = require("./config");

export default [
  {
    input: "src/index.ts",
    plugins: [
      ts({
        tsconfig: "tsconfig.json"
      }),
      license({
        banner: {
          file: "./banner.txt",
          encoding: "utf-8"
        }
      })
    ],
    output: [
      {
        file: "example/webcomponent.dev.js",
        format: "iife"
      }
    ]
  }
];
