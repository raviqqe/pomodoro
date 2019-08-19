import { Timer } from "../timer";
import * as utilities from "../../domain/utilities";

it("starts", async () => {
  const spy = jest.spyOn(utilities, "sleep");
  spy.mockResolvedValue(undefined);

  await new Timer({ presentTime: jest.fn(), presentPaused: jest.fn() }).start(
    42
  );
});
