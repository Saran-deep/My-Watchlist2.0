import React from "react";
import InputWrapper from "../../Utils/InputWrapper";

function TextInput(props) {
  const { error, endAdornment, classname, register, ...rest } = props;

  return (
    <InputWrapper error={error} classname={classname}>
      <div className="flex items-center">
        <input
          type="text"
          autoComplete="off"
          {...register(rest.name)}
          {...rest}
          className=" rounded text-my-white-100 placeholder:text-placeholder-ash border-0  bg-my-ebonyClay-300 w-full outline-none p-2"
        />
        {endAdornment ? (
          <div className="mr-2 cursor-pointer">{endAdornment}</div>
        ) : (
          " "
        )}
      </div>
    </InputWrapper>
  );
}

export default TextInput;
