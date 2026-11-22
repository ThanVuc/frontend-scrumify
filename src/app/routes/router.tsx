import { createBrowserRouter } from "react-router-dom";

import { authRoutes } from "@/features/auth/router";
import { scrumRoutes } from "@/features/scrum/router";
import { RootLayout } from "../layouts";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
        ...scrumRoutes,
        ...authRoutes,
    ],
  },
]);
