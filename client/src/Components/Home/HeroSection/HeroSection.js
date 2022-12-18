import React, { useEffect } from "react";
import Badge from "../../../UI/Badge/Badge";
import Button from "../../../UI/Button/Button";

function HeroSection() {
  useEffect(() => {
    addNavbarTopMargin();
  }, []);

  const bannerImageURL =
    "https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAk83.jpg";
  const greadient =
    "linear-gradient(0deg, rgba(15,15,15,0.896796218487395) 5%, rgba(15,15,15,0.7) 20%, rgba(15,15,15,0.6222864145658263) 26%, rgba(255,255,255,0) 73%)";
  // "linear-gradient(0deg, rgba(15,15,15,0.896796218487395) 5%, rgba(15,15,15,0.6222864145658263) 30%, rgba(255,255,255,0) 70%)";

  const addNavbarTopMargin = () => {
    const header = document.getElementById("header");
    const navHeight = header.clientHeight;
    const headerPaddingTop = window.getComputedStyle(header).paddingTop;
    const heroMargin =
      navHeight -
      headerPaddingTop.substring(0, headerPaddingTop.length - 2) * 2;
    document.getElementById("heroSection").style.marginTop = heroMargin + "px";
  };

  return (
    <div
      id="heroSection"
      style={{ backgroundImage: `${greadient}, url(${bannerImageURL})` }}
      className="h-3/4 bg-slate-500 rounded bg-no-repeat bg-cover bg-center flex"
    >
      <div className="mb-16 pl-10 self-end space-y-3.5 last:after:content-['\B7']">
        <h1 className="text-5xl text-white">Jujutsu Kaisen</h1>
        <div className="">
          <span className="text-my-white-200 font-medium meta-data">2020</span>
          <span className="text-my-white-200 font-medium meta-data">
            Action
          </span>
          <span className="text-my-white-200 font-medium meta-data">Drama</span>
        </div>
        <p className=" text-my-white-100">
          Status: <Badge>COMPLETED</Badge>
        </p>

        <Button primary={true}>ADD TO WATCHLIST</Button>
      </div>
    </div>
  );
}

export default HeroSection;
