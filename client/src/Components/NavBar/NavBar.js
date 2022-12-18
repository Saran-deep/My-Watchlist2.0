import React from "react";

function NavBar() {
  const navitems = ["Home", "Contacts", "WatchList", "Account"];

  const renderNavItems = (items) => {
    return items.map((item) => (
      <li className=" list-none " key={item}>
        <a href="#" className=" no-underline">
          {item}
        </a>
      </li>
    ));
  };
  return (
    <header id="header" className=" fixed top-0 left-0 w-full p-[0.75rem]">
      <nav className=" flex flex-row justify-between items-center bg-my-black-200 text-my-white-300 mb-[0.75rem] rounded shadow-md shadow-my-black-300">
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
  );
}

export default NavBar;
