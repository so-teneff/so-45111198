import { foo } from "../src/module";
import { bar } from "./bar";

jest.mock("./bar");

describe("module", () => {
  let result;

  beforeAll(() => {
    bar.mockReturnValue("fake bar");
    result = foo();
  });

  it("foo", () => {
    expect(result).toEqual("I am foo. bar is fake bar");
  });
});
