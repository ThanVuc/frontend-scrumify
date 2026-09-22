import type { RouteObject } from "react-router-dom";
import { AuthPage } from "./pages";

export const authRoutes: RouteObject[] = [
  {
    path: "auth",
    children: [
      {
        path: "",
        element: <AuthPage />,
      }
    ],
  },
];
