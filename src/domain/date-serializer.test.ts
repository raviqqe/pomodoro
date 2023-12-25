import { expect, it } from "vitest";
import { DateSerializer } from "./date-serializer.js";

it("deserializes a date", () => {
  expect(DateSerializer.deserialize("20190831").getTime()).toBe(
    new Date(2019, 7, 31).getTime(),
  );
});

it("serializes a date", () => {
  expect(DateSerializer.serialize(new Date(2019, 7, 31))).toBe("20190831");
});

it("keeps equivalence", () => {
  const date = new Date(2019, 8, 31);

  expect(
    DateSerializer.deserialize(DateSerializer.serialize(date)).getTime(),
  ).toBe(date.getTime());
});
