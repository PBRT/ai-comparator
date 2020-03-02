import { isInvalidID } from "../validateID";

const validIDs = ["123", 123, 0, 1, "1", "1000000000"];
const invalidIDs = [
  "123abc",
  "1abc1",
  "abc123",
  "a1a",
  "-123abc",
  "-123",
  "-1",
  -1,
  -1000,
  "Infinity",
  "-Infinity"
];

describe("ID Validator function", () => {
  it("should mark it as valid ID", () => {
    validIDs.forEach(id => {
      expect(isInvalidID(id)).toEqual(false);
    });
  });
  it("should mark it as invalid ID", () => {
    invalidIDs.forEach(id => {
      expect(isInvalidID(id)).toEqual(true);
    });
  });
});
