import React from "react";
import { render } from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";

import { App } from "./todo/app";
import { ThemeProvider } from "./todo/ThemeContext";
import "todomvc-app-css/index.css";
import "todomvc-common/base.css";

render(
    <ThemeProvider>
        <HashRouter>
            <Routes>
                <Route path="*" element={<App />} />
            </Routes>
        </HashRouter>
    </ThemeProvider>,
    document.getElementById("root")
);
