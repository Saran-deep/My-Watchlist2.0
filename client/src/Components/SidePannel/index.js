import React, { useEffect } from "react";

function SidePannel({ show, toggleShow, children }) {
  useEffect(() => {
    addNavbarTopMargin();
  }, [show]);

  const addNavbarTopMargin = () => {
    const header = document.getElementById("header");
    const navHeight = header.clientHeight;
    const paddingTop = window.getComputedStyle(header).paddingTop;
    const headerPaddingTop = Number(
      paddingTop.substring(0, paddingTop.length - 2)
    );
    const heroMargin = navHeight - headerPaddingTop;
    const sidePanel = document.getElementById("sidePannel");
    if (!sidePanel) return;
    sidePanel.style.top = heroMargin + "px";
    sidePanel.style.height = `calc(100% - ${heroMargin}px - ${
      headerPaddingTop - 5
    }px)`;
  };

  return (
    <>
      <div
        className=" fixed top-0 right-0 backdrop-blur-sm h-full w-full z-40 transition-all ease-in-out duration-200"
        onClick={() => toggleShow()}
        style={{
          visibility: show ? "visible" : "hidden",
          opacity: show ? 1 : 0,
        }}
      ></div>
      <div
        style={{
          visibility: show ? "visible" : "hidden",
          opacity: show ? 1 : 0,
        }}
        id="sidePannel"
        className="fixed h-full md:w-1/3 right-0 bg-my-ebonyClay-200 z-50 mr-3 rounded shadow-md transition-all ease-in-out duration-200 p-2 space-y-2"
      >
        <div id="sidePannel-content">{children}</div>
      </div>
    </>
  );
}

export default SidePannel;
