import React from "react";
import CoverImage from "./CoverImage.js/CoverImage";
import ImagePoster from "./ImagePoster/ImagePoster";

function DetailedView() {
  return (
    <section>
      <div className=" w-full flex justify-center h-screen relative">
        <div className=" bg-slate-400 w-full h-2/3 rounded">
          <CoverImage />
        </div>
        <div className="w-full absolute z-10 top-1/2">
          <div className=" w-full flex gap-x-2">
            <div className=" w-1/3 flex justify-center">
              <ImagePoster />
            </div>
            <div className=" w-2/3"></div>
            <div className=" w-1/3"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailedView;
