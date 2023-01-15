import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/Features/Auth/authSlice";

function NavBar() {
  const { userId, username, isLoggedIn } = useSelector(
    (store) => store.auth.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    addNavbarTopMargin();
  }, []);

  const addNavbarTopMargin = () => {
    const header = document.getElementById("header");
    const navHeight = header.clientHeight;
    const headerPaddingTop = window.getComputedStyle(header).paddingTop;
    const heroMargin =
      navHeight -
      headerPaddingTop.substring(0, headerPaddingTop.length - 2) * 2;
    document.getElementById("dummyContainer").style.height = heroMargin + "px";
  };

  const navitems = [
    { label: "Home", path: "/" },
    { label: "Contacts", path: "/" },
    { label: "WatchList", path: "/" },
    isLoggedIn
      ? { label: "Logout", path: "#" }
      : { label: "Login", path: "/auth" },
  ];

  const renderNavItems = (items) => {
    return items.map(({ label, path }) => (
      <li className=" list-none " key={label}>
        {label === "Logout" ? (
          <Link
            to={path}
            className=" no-underline"
            onClick={() => dispatch(logoutUser())}
          >
            {label}
          </Link>
        ) : (
          <Link to={path} className=" no-underline">
            {label}
          </Link>
        )}
      </li>
    ));
  };
  return (
    <>
      <header
        id="header"
        className=" fixed top-0 left-0 w-full p-[0.75rem] z-50"
      >
        <nav className=" flex flex-row justify-between items-center bg-my-ebonyClay-200 text-my-white-300 mb-[0.75rem] rounded shadow-md">
          <div>
            <h1 className=" p-4 text-xl">My WatchList</h1>
          </div>
          <div>
            <ul className=" flex flex-row space-x-5 last:mr-3 text-sm">
              {renderNavItems(navitems)}
            </ul>
          </div>
        </nav>
      </header>
      <div id="dummyContainer"></div>
    </>
  );
}

export default NavBar;
