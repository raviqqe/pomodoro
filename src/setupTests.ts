import { defaultImport } from "default-import";
import ResizeObserver from "resize-observer-polyfill";

window.ResizeObserver = defaultImport(ResizeObserver);
