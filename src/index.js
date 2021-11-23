import React from "react";
import ReactDOM from "react-dom";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Page1 } from "./pages/Page1";
import { Questions } from "./components/Questions";
import { BubbleInput } from "./pages/BubbleInput";
import { Form } from "./pages/Form";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="page1" element={<Page1 />} />
        <Route path="question" element={<Questions />} />
        <Route path="bubble-input" element={<BubbleInput />} />
        <Route path="upload" element={<Form />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>404 - There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
