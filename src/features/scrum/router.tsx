import type { RouteObject } from "react-router-dom";
import {
  PbiDetailPage,
  PbiListPage,
  ProjectLayout,
  ProjectOverviewPage,
  ProjectsPage,
  ScrumLayout,
} from "./pages";

export const scrumRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ScrumLayout />,
    children: [
      {
        index: true,
        element: <ProjectOverviewPage />,
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
  {
    path: "/projects/:id",
    element: <ProjectLayout />,
    children: [
      {
        index: true,
        element: <ProjectOverviewPage />,
      },
      {
        path: "pbis",
        element: <PbiListPage />,
      },
      {
        path: "pbis/:pbiId",
        element: <PbiDetailPage />,
      },
      {
        path: "tasks",
        element: null,
      },
      {
        path: "epics",
        element: null,
      },
      {
        path: "sprints/active",
        element: null,
      },
      {
        path: "sprints",
        element: null,
      },
    ],
  },
];
