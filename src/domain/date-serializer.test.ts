import { DateTime } from "luxon";
import { DateSerializer } from "./date-serializer";
import { expect, it } from "vitest";

it("deserializes a date", () => {
  expect(DateSerializer.deserialize("20190831").getTime()).toBe(
    DateTime.local(2019, 8, 31).toJSDate().getTime()
  );
});

it("serializes a date", () => {
  expect(DateSerializer.serialize(DateTime.local(2019, 8, 31).toJSDate())).toBe(
    "20190831"
  );
});

it("keeps equivalence", () => {
  const date = DateTime.local(2019, 8, 31).toJSDate();

  expect(
    DateSerializer.deserialize(DateSerializer.serialize(date)).getTime()
  ).toBe(date.getTime());
});
