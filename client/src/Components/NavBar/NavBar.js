import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Link } from "react-router-dom";
import { logoutUser } from "../../redux/Features/Auth/authSlice";
import { FaBell } from "react-icons/fa";
import SidePannel from "../SidePannel";
import useToggle from "../../Utils/useToggle";
import Notification from "../../UI/Notification";
import { BiSearch } from "react-icons/bi";

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
    { label: "WatchList", path: "/user/watchlist" },
    isLoggedIn
      ? { label: "Logout", path: "#" }
      : { label: "Login", path: "/auth" },
  ];

  if (isLoggedIn) {
    navitems.splice(3, 0, { label: "Icon", path: "#" });
  }

  const [showSidePannel, setShowSidePannel] = useToggle(false);

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
        ) : label === "Icon" ? (
          <FaBell
            onClick={() => setShowSidePannel()}
            className=" cursor-pointer"
          />
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
        <nav className="flex flex-row justify-between items-center bg-my-ebonyClay-200 text-my-white-300 mb-[0.75rem] rounded shadow-md">
          <div>
            <h1 className=" p-4 text-xl">My WatchList</h1>
          </div>
          <div className="w-2/5">
            <SearchInput />
          </div>
          <div>
            <ul className=" flex flex-row space-x-5 last:mr-3 text-sm items-center">
              {renderNavItems(navitems)}
            </ul>
          </div>
        </nav>
      </header>
      <div id="dummyContainer"></div>
      <SidePannel show={showSidePannel} toggleShow={setShowSidePannel}>
        <Notification />
        <Notification />
        <Notification />
      </SidePannel>
    </>
  );
}

export default NavBar;

const SearchInput = () => {
  return (
    <div className="w-full">
      <div className=" rounded border focus-within:border-0 focus-within:border-transparent border-placeholder-ash transition-colors duration-150">
        <div className="rounded border focus-within:border-2 focus-within:border-solid focus-within:border-my-ebonyClay-400 box-border border-transparent bg-my-ebonyClay-300 transition-colors duration-150">
          <Form className="flex items-center" method="get" action="/search">
            <input
              type="text"
              name="q"
              autoComplete="off"
              placeholder="Search animes"
              className="w-full rounded text-my-white-100 placeholder:text-placeholder-ash border-0  bg-my-ebonyClay-300 outline-none p-2"
            />
            <button className="mr-2 cursor-pointer">
              <BiSearch fontSize="1.4rem" className="text-placeholder-ash" />
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};
