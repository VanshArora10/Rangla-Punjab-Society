
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import React from 'react'
import Layout from ".//layout/Layout"
import Home from "./pages/Home";
// import NewsEvents from "./pages/NewsEvents";
import About from "./pages/About";
import FocusAreas from "./pages/FocusAreas";
import KeyPartner from "./pages/KeyPartner";
import Donations from "./pages/Donations";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";

function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "focus-areas",
            element: <FocusAreas />,
          },
          {
            path: "key-partner",
            element: <KeyPartner />,
          },
          {
            path: "donations",
            element: <Donations />,
          },
          {
            path: "contact",
            element: <Contact />,
          },
          {
            path: "donate",
            element: <Donate />,
          },
        ]
      }
    ]
  )
  return (
    <RouterProvider router={router} />
  );
}

export default App