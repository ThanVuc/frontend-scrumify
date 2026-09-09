import type { RouteObject } from "react-router-dom";
import { AuthPage } from "./pages";

export const authRoutes: RouteObject[] = [
  {
    path: "",
    children: [
      {
        path: "auth",
        element: <AuthPage />,
      }
    ],
  },
];
