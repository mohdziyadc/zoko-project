import FavoritesPage from "@/FavoritesPage";
import HomePage from "@/Homepage";
import MovieDetailsPage from "@/MovieDetailsPage";
import NotFoundPage from "@/NotFoundPage";
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
