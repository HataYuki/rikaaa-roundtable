import window from "./index.spec";
import * as assert from "power-assert";

describe("test", () => {
  before(() => {
    document.body.innerHTML = window.__html__["spec/index.spec.html"];
  });
  it("test", done => {
    const a = 10;
    const b = 10;
    assert(a == b);
    done();
  });
});
