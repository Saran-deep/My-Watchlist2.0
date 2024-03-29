import Authentication from "./Pages/Authentication";
import CreateUsername from "./Pages/CreateUsername";
import Home from "./Pages/Home";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/Features/Auth/authSlice";
import { useEffect } from "react";
import DetailedView from "./Pages/DetailedView";
import NavBar from "./Components/NavBar/NavBar";
import { getUserWatchList } from "./redux/Features/Watchlist/watchlistSlice";
import SnackBar from "./UI/SnackBar/SnackBar";
import Watchlist from "./Pages/Watchlist";
import SearchResult from "./Pages/SearchResult";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")?.length > 0) return;
    dispatch(getUser());
  }, []);

  const routers = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/auth",
          element: <Authentication />,
        },
        {
          path: "/auth/create-uername",
          element: <CreateUsername />,
        },
        {
          path: "/anime/:id",
          element: <DetailedView />,
        },
        {
          path: "/user/watchlist",
          element: <Watchlist />,
        },
        {
          path: "/search",
          element: <SearchResult />,
        },
        {
          path: "*",
          element: <h1>404</h1>,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userId, username, isLoggedIn } = useSelector(
    (store) => store.auth.user
  );

  useEffect(() => {
    if (!isLoggedIn) return;

    if (!username) {
      navigate("/auth/create-uername", { replace: true });
    }
    dispatch(getUserWatchList());
  }, [isLoggedIn]);

  return (
    <>
      <NavBar />
      <SnackBar />
      <Outlet />
    </>
  );
};
