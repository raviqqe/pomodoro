import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./react/App.js";
import { globalStyle } from "./react/style.js";

export const render = (element: HTMLElement) => {
  const root = createRoot(element);

  root.render(
    <StrictMode>
      <style className={globalStyle} />
      <App />
    </StrictMode>,
  );
};
