import { cleanup } from "@testing-library/react";
import { defaultImport } from "default-import";
import ResizeObserver from "resize-observer-polyfill";
import { afterEach } from "vitest";

window.ResizeObserver = defaultImport(ResizeObserver);

afterEach(() => {
  cleanup();
});
