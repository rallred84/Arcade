import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Snake from "./components/snake.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <>Error</>,
    children: [
      {
        path: "/",
        element: <>Home</>,
      },
      {
        path: "/snake",
        element: <Snake />,
      },
      {
        path: "/tic-tac-toe",
        element: <>Tic Tac Toe</>,
      },
      {
        path: "/connect-4",
        element: <>Connect 4</>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
