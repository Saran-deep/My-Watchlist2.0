import React from "react";

function InputWrapper(props) {
  const { error, classname } = props;

  return (
    <div className={`${classname ? classname : " "} `}>
      <div
        className={`rounded border focus-within:border-0 focus-within:border-transparent border-placeholder-ash transition-colors duration-150 ${
          error ? "!border-my-red-100" : " "
        }`}
      >
        <div
          className={`rounded border focus-within:border-2 focus-within:border-solid focus-within:border-my-ebonyClay-400 box-border border-transparent bg-my-ebonyClay-300 transition-colors duration-150 ${
            error ? "!border-my-red-100" : " "
          }`}
        >
          {props.children}
        </div>
      </div>
      {error ? (
        <p className=" text-my-red-100 text-left pt-[2px] pl-[2px] font-normal text-xs capitalize">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}

export default InputWrapper;
