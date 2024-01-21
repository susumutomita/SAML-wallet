import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from 'react';
import { App } from './App';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
