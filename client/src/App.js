import Authentication from "./Pages/Authentication";
import CreateUsername from "./Pages/CreateUsername";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/Features/Auth/authSlice";
import { useEffect } from "react";
import DetailedView from "./Pages/DetailedView";
import NavBar from "./Components/NavBar/NavBar";
import { getUserWatchList } from "./redux/Features/Watchlist/watchlistSlice";
import SnackBar from "./UI/SnackBar/SnackBar";
import Watchlist from "./Pages/Watchlist";

function App() {
  const dispatch = useDispatch();
  const { userId, username, isLoggedIn } = useSelector(
    (store) => store.auth.user
  );

  useEffect(() => {
    if (!localStorage.getItem("accessToken")?.length > 0) return;
    dispatch(getUser());
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    dispatch(getUserWatchList());
  }, [isLoggedIn]);

  return (
    <>
      <NavBar />
      <SnackBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/auth/create-uername" element={<CreateUsername />} />
        <Route path="/anime/:id" element={<DetailedView />} />
        <Route path="user/watchlist" element={<Watchlist />} />
        <Route path="*" element={<h1>404</h1>} />

        {/* <CreateUsername /> */}
        {/* <Authentication /> */}
        {/* <Home /> */}
      </Routes>
    </>
  );
}

export default App;
