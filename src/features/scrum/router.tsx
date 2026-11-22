import type { RouteObject } from "react-router-dom";
import { ProjectsPage, ScrumLayout } from "./pages";

export const scrumRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ScrumLayout />,
    children: [
      {
        index: true,
        element: null,
      },
      {
        path: "projects",
        element: <ProjectsPage />,
      },
      {
        path: "supports",
        element: null,
      },
    ],
  },
];
