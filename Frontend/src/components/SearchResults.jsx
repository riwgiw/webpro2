import React from "react";

import '../App.css'

import { Link , useParams } from "react-router-dom";

function SearchResults({ results }) {

    const uniqueResults = [...new Set(results.map((result) => result.artistname))];

  return (
    <div id="scroll" className="flex flex-col w-full text-white shadow-md rounded-md mt-3 max-h-[200px] overflow-y-scroll font-medium bg-[#191414]">
      {uniqueResults.map((result, index) => (
        <Link
          to={`/calendar/${result}`}
          key={index}
          className="pl-2 py-1 hover:bg-[#242424] cursor-pointer "
        >
          {result}
        </Link>
      ))}
    </div>
  );
}

export default SearchResults;
