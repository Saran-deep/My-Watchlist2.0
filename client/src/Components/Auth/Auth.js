import React from "react";

function Auth() {
  console.log("Renders");
  return (
    <div className=" flex justify-center items-center w-full h-full">
      <div className=" w-96 h-96 bg-my-black-300 rounded shadow-suttle">
        <h1 className=" text-my-white-100">Login</h1>

        <div className=" p-3 w-full">
          <div className="customInput relative ">
            <input
              type="text"
              placeholder="Your name"
              className="customInput_input focus:border-my-red-100 w-full border-2 border-solid border-my-white-100 rounded outline-none py-2 px-3 box-border duration-[0.3s]"
            />
            <i
              className="customInput_icon fa fa-user fa-lg fa-fw absolute right-0 top-2/4 translate-y-[-50%] "
              aria-hidden="true"
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

// box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

export default Auth;
