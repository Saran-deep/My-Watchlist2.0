import Authentication from "./Pages/Authentication";
import CreateUsername from "./Pages/CreateUsername";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/Features/Auth/authSlice";
import { useEffect } from "react";
import DetailedView from "./Components/DetailedView/DetailedView";
import NavBar from "./Components/NavBar/NavBar";

function App() {
  const dispatch = useDispatch();
  const { userId, username } = useSelector((store) => store.auth.user);

  useEffect(() => {
    
    if (!localStorage.getItem("accessToken")?.length > 0) return;
    dispatch(getUser());
  }, []);

 

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/auth/create-uername" element={<CreateUsername />} />
        <Route path="/anime" element={<DetailedView />} />
        <Route path="*" element={<h1>404</h1>} />

        {/* <CreateUsername /> */}
        {/* <Authentication /> */}
        {/* <Home /> */}
      </Routes>
    </>
  );
}

export default App;
