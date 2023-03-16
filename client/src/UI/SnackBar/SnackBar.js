import React, { useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import { closeSnackBar } from "../../redux/Features/SnackBar/snackbarSlice";
import { useDispatch, useSelector } from "react-redux";

function SnackBar() {
  const dispatch = useDispatch();
  const { message, show } = useSelector((store) => store.snackbar);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(closeSnackBar());
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [show]);

  return (
    <div
      className={`fixed sm:bottom-6 bottom-2 sm:left-6 z-50 left-2 right-2 sm:right-[unset] sm:min-w-[288px] ${
        show
          ? "transform ease-out duration-300 transition translate-x-0"
          : "transform ease-in duration-150 transition translate-x-[-110%]"
      }`}
    >
      {show && (
        <div className="flex items-center justify-between px-4 py-3 rounded shadow-md bg-my-white-100 sm:gap-2 ">
          <p className="text-my-ebonyClay-100 text-sm font-medium">{message}</p>
          <button
            className="hover:text-my-ebonyClay-100 text-my-ebonyClay-300 focus:outline-none transition-all duration-200 ease-in-out"
            onClick={() => dispatch(closeSnackBar())}
          >
            <MdOutlineClose className=" text-xl" />
          </button>
        </div>
      )}
    </div>
  );
}

export default SnackBar;
