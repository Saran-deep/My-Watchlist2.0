import React, { useEffect } from "react";
import Badge from "../../../UI/Badge/Badge";
import Button from "../../../UI/Button/Button";
import MetaData from "../../../UI/MetaData/MetaData";

function HeroSection() {
  const bannerImageURL =
    "https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAk83.jpg";
  const greadient =
    "linear-gradient(0deg, rgba(15,16,43,0.896796218487395) 5%, rgba(15,16,43,0.7) 20%, rgba(15,16,43,0.6222864145658263) 26%, rgba(255,255,255,0) 73%)";
  // "linear-gradient(0deg, rgba(15,15,15,0.896796218487395) 5%, rgba(15,15,15,0.6222864145658263) 30%, rgba(255,255,255,0) 70%)";

  // <div className=" h-full w-full rounded relative">
  //     <img src={bannerImageURL} className="object-cover w-full h-full" />
  //     <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-my-ebonyClay-100"></div>
  //   </div>

  return (
    <div id="heroSection" className="h-3/4 bg-slate-500 rounded relative">
      <img
        src={bannerImageURL}
        className="object-cover w-full h-full rounded"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-my-ebonyClay-100">
        <div className="flex">
          <div className="mb-16 pl-10 self-end space-y-3.5 last:after:content-['\B7']">
            <h1 className="text-5xl text-white">Jujutsu Kaisen</h1>
            <div className="">
              <MetaData items={["2020", "Action", "Drama"]} />
            </div>
            <p className=" text-my-white-100">
              Status: <Badge>COMPLETED</Badge>
            </p>

            <Button primary={true}>ADD TO WATCHLIST</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div
      id="heroSection"
      style={{ backgroundImage: `${greadient}, url(${bannerImageURL})` }}
      className="h-3/4 bg-slate-500 rounded bg-no-repeat bg-cover bg-center flex"
    >
      <div className="mb-16 pl-10 self-end space-y-3.5 last:after:content-['\B7']">
        <h1 className="text-5xl text-white">Jujutsu Kaisen</h1>
        <div className="">
          <MetaData items={["2020", "Action", "Drama"]} />
        </div>
        <p className=" text-my-white-100">
          Status: <Badge>COMPLETED</Badge>
        </p>

        <Button primary={true}>ADD TO WATCHLIST</Button>
      </div>
    </div> */
}

export default HeroSection;
