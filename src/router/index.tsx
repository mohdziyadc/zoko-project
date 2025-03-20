import FavoritesPage from "@/pages/FavoritesPage";
import HomePage from "@/pages/Homepage";
import MovieDetailsPage from "@/pages/MovieDetailsPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "movie/:id",
    element: <MovieDetailsPage />,
  },
  {
    path: "favorites",
    element: <FavoritesPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
