import React, { createContext } from "react";
import ReactDOM from "react-dom";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Story } from "./pages/Story";
import { Questions } from "./pages/Questions";
import { BubbleInput } from "./pages/BubbleInput";
import { Form } from "./pages/Form";
import { Profile } from "./pages/Profile";
import { PostRegister, Register } from "./pages/Register";
import { Info } from "./pages/Info";
import { AnatomyOfASeed } from "./pages/AnatomyOfASeed";
import { Created } from "./pages/Created";
import { UserContextProvider } from "./lib/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="story" element={<Story />} />
          <Route path="question" element={<Questions />} />
          <Route path="bubble-input" element={<BubbleInput />} />
          <Route path="upload" element={<Form />} />
          <Route path="register" element={<Register />} />
          <Route path="post-register" element={<PostRegister />} />
          <Route path="info" element={<Info />} />
          <Route path="created" element={<Created />} />
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
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
