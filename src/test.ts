import { cleanup } from "@testing-library/react";
import { defaultImport } from "default-import";
import ResizeObserver from "resize-observer-polyfill";
import { afterEach, vi } from "vitest";

window.ResizeObserver = defaultImport(ResizeObserver);

afterEach(() => {
  cleanup();

  vi.restoreAllMocks();
  vi.resetAllMocks();
});
