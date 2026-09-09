import { createBrowserRouter } from "react-router-dom";

import { authRoutes } from "@/features/auth/router";
import { RootLayout } from "../layouts";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
        ...authRoutes,
    ],
  },
]);
