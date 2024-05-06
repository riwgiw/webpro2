import React, { useState } from "react";
import IconCom from "./IconCom";

import axios from "axios";

function SearchBar({ setResults }) {
  const [inputText, setInputText] = useState("");

  const fetchData = (value) => {
    axios
      .get("http://localhost:3002/get-event")
      .then((res) => {
        console.log(res.data); // Check the response data
        const results = res.data.events.filter((event) => {
          return (
            value &&
            event &&
            event.artistname &&
            event.artistname.toLowerCase().includes(value.toLowerCase())
          );
        });
        console.log(results);
        setResults(results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleChange = (value) => {
    setInputText(value);
    fetchData(value);
  };

  return (
    <div className="flex mt-[30px] w-full max-w-[400px] h-[35px] justify-start bg-[#191414] rounded-md pl-3 items-center overflow-hidden text-green-600">
      <IconCom icon="search" size="17" />
      <input
        type="text"
        className="border-white border border-none h-full w-full ml-2 focus:outline-none font-medium text-[18px] bg-[#191414] text-white"
        placeholder="Type name artist to search..."
        value={inputText}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
