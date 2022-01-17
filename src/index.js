import React from "react";
import ReactDOM from "react-dom";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Page1 } from "./pages/Page1";
import { Questions } from "./components/Questions";
import { BubbleInput } from "./pages/BubbleInput";
import { Profile } from "./pages/Profile";
import { PostRegister, Register } from "./pages/Register";
import { Info } from "./pages/Info";
import { AnatomyOfASeed } from "./pages/AnatomyOfASeed";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="page1" element={<Page1 />} />
        <Route path="question" element={<Questions />} />
        <Route path="bubble-input" element={<BubbleInput />} />
        <Route path="register" element={<Register />} />
        <Route path="post-register" element={<PostRegister />} />
        <Route path="info" element={<Info />} />
        <Route path="anatomy-of-a-seed" element={<AnatomyOfASeed />} />
        {/* TODO: /profile/id see: https://reactrouter.com/docs/en/v6/getting-started/tutorial#listing-the-invoices*/}
        <Route path="profile" element={<Profile />} />
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
