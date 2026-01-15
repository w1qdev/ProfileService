import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

export const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Home Page</div>,
    },
    {
      path: "/auth",
      element: <div>Auth Page</div>,
    },
  ]);

  return <RouterProvider router={router} />;
};
