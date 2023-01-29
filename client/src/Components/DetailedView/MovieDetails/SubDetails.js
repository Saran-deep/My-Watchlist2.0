import React from "react";
import Skeleton from "../../../UI/Skeleton/Skeleton";

function SubDetails(props) {
  const { subDeatilsList, isLoading } = props;
  return (
    <div>
      {isLoading ? (
        <Skeleton className="h-6 w-32" />
      ) : (
        <h2 className="text-xl text-my-white-100 pb-2">Details</h2>
      )}
      <ul className="list-none divide-y divide-my-ebonyClay-300">
        {isLoading ? (
          <ShowLoader />
        ) : (
          subDeatilsList?.map((item) => {
            return (
              <li
                className="flex text-my-white-100 py-1 items-center"
                key={item.key}
              >
                <div className="w-1/4 font-light">
                  <p>{item.key}</p>
                </div>
                <div className="w-3/4 text-my-white-200 font-light text-sm">
                  {item.renderCloudChip ? (
                    <CloudChip itemsArray={item.values} />
                  ) : (
                    <p>{item.values}</p>
                  )}
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

export default SubDetails;

const CloudChip = ({ itemsArray }) => {
  return (
    <div className=" space-y-2">
      {itemsArray?.map((item) => (
        <div
          className="mr-2 inline-block px-3 py-[2px] bg-my-ebonyClay-300 rounded-full text-my-white-100 text-sm font-light"
          key={item}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

const ShowLoader = () => {
  return (
    <div className=" space-y-2 mt-3">
      <Skeleton className=" h-3 w-full" />
      <Skeleton className=" h-3 w-full" />
      <Skeleton className=" h-3 w-full" />
    </div>
  );
};
