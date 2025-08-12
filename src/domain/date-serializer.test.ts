import { expect, it } from "vitest";
import { deserializeDate, serializeDate } from "./date-serializer.js";

it("deserializes a date", () => {
  expect(deserializeDate("20190831").getTime()).toBe(
    new Date(2019, 7, 31).getTime(),
  );
});

it("serializes a date", () => {
  expect(serializeDate(new Date(2019, 7, 31))).toBe("20190831");
});

it("keeps equivalence", () => {
  const date = new Date(2019, 8, 31);

  expect(deserializeDate(serializeDate(date)).getTime()).toBe(date.getTime());
});
