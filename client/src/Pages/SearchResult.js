import React from "react";
import { useSearchParams } from "react-router-dom";

function SearchResult() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchKey = searchParams.get("q");

  console.log(searchKey);
  return <div>SearchResult</div>;
}

export default SearchResult;
