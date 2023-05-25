import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home/index.tsx'
import { Pokedex } from './pages/Pokedex/index.tsx'
import { Legendaries } from './pages/Legendaries/index.tsx';
import { Documentation } from './pages/Documentation/index.tsx';
import ErrorPage from "./pages/Error";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Pokedex",
    element: <Pokedex />,
  },
  {
    path: "/Legendaries",
    element: <Legendaries />,
  },
  {
    path: "/Documentation",
    element: <Documentation />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <Home />
    <Pokedex /> */}
  </React.StrictMode>,
)
