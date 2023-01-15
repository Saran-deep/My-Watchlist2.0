import React from "react";

function CoverImage() {
  const bannerImageURL =
    "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg";
  const greadient =
    "linear-gradient(0deg, rgba(15,16,43,0.896796218487395) 5%, rgba(15,16,43,0.7) 20%, rgba(15,16,43,0.6222864145658263) 26%, rgba(255,255,255,0) 73%)";
  return (
    <div
      style={{ backgroundImage: `${greadient}, url(${bannerImageURL})` }}
      className=" h-full w-full rounded bg-no-repeat bg-cover bg-center"
    ></div>
  );
}

export default CoverImage;
