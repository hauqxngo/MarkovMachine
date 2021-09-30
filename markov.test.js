const { MarkovMachine } = require("./markov");

let mm;
let text;
describe("my set of tests", function () {
  beforeEach(() => {
    mm = new MarkovMachine("the cat in the hat");
    text = mm.makeText();
  });

  test("should return an object", function () {
    expect(mm).toEqual(expect.any(Object));
  });

  test("random text should be a string", function () {
    expect(text).toEqual(expect.any(String));
  });

  test("should not be null", function () {
    expect(text).not.toBeNull;
  });

  test("should be less than numWords", function () {
    expect(text.length).toBeLessThanOrEqual(100);
  });
});
