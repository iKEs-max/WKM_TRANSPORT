import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/Layout";
import { Home } from "./components/Home";
import { RoutesPage } from "./components/RoutesPage";
import { Booking } from "./components/Booking";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "routes", Component: RoutesPage },
      { path: "book", Component: Booking },
      { path: "*", Component: NotFound },
    ],
  },
]);
