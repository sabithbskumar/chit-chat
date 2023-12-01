import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    async lazy() {
      const { App } = await import("./App");
      return { Component: App };
    },
  },
  {
    path: "/login",
    async lazy() {
      const { LoginPage } = await import("./routes/auth");
      return { Component: LoginPage };
    },
  },
  {
    path: "/signup",
    async lazy() {
      const { SignUpPage } = await import("./routes/auth");
      return { Component: SignUpPage };
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
