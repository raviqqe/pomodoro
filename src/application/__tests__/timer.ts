import { Timer } from "../timer";
import * as utilities from "../../domain/utilities";

it("counts down a pomodoro", async () => {
  const spy = jest.spyOn(utilities, "sleep");
  spy.mockResolvedValue(undefined);

  let expectedSeconds: number = 60;

  for await (const seconds of new Timer().start(expectedSeconds)) {
    expect(seconds).toBe(expectedSeconds);
    expectedSeconds--;
  }

  expect(expectedSeconds).toBe(-1);
});
