import React from "react";
import { IoMdClose } from "react-icons/io";

function Notification() {
  return (
    <div className="notification w-full rounded bg-skeleton-color flex p-1 h-24 gap-2  cursor-pointer">
      <div>
        <img
          src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx130298-O7nR1Wrav2dH.jpg"
          alt="Anime Poster"
          className="rounded object-cover h-full w-[65px]"
        />
      </div>
      <div>
        <h4 className=" text-sm text-white">The Eminence In Shadow</h4>
        <p className=" text-xs text-white">Episode 19 is Available</p>
      </div>
      <div className="notification__closeIcon h-full ml-auto flex items-center justify-center self-stretch pr-1 invisible opacity-0 transition-all duration-200 ease-in-out">
        <IoMdClose className=" text-white text-xl hover:text-my-ebonyClay-400 cursor-pointer transition-all duration-200 ease-in-out" />
      </div>
    </div>
  );
}

export default Notification;
