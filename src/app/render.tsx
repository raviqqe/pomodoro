import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App.js";
import { globalStyle } from "./style.js";

export const render = (element: HTMLElement): void =>
  createRoot(element).render(
    <StrictMode>
      <style className={globalStyle} />
      <App />
    </StrictMode>,
  );
