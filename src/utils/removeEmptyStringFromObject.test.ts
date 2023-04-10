import { it, describe, expect } from "vitest";
import { removeEmptyStringFromObject } from "./removeEmptyStringFromObject";

describe(removeEmptyStringFromObject.name, () => {
  it("removes the properties which have empty string as value", () => {
    const obj = {
      a: "a",
      b: "",
      c: "c",
      d: "",
    };
    const expectedResult = {
      a: "a",
      c: "c",
    };

    const result = removeEmptyStringFromObject(obj);

    expect(result).toEqual(expectedResult);
  });

  it("doesn't remove deep properties", () => {
    const obj = {
      a: "a",
      b: {
        c: "",
      },
    };
    const expectedResult = {
      a: "a",
      b: {
        c: "",
      },
    };

    const result = removeEmptyStringFromObject(obj);

    expect(result).toEqual(expectedResult);
  });
});
