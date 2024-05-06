import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import IconCom from "../components/IconCom";
import CountdownTimer from "../components/CountdownTimer";

import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

import "../App.css";

function Home() {
  const { id } = useParams();
  const [showMore, setShowMore] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/get-event")
      .then((res) => {
        const sortedData = res.data.events.sort(
          (a, b) => new Date(a.startsum) - new Date(b.startsum)
        );
        const filteredData = sortedData.filter(
          (event) => new Date(event.startsum) > new Date()
        );
        setData(filteredData);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const firstEvent = data.length > 0 ? data[0] : null;

  const handleShowMoreClick = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="bg-[#191414] w-full h-full min-h-dvh font-poppins">
      <Nav />
      <div className="mx-auto max-w-[1250px] bg-[#191414] mt-[60px]">
        <div className="px-4 sm:px-6 lg:px-8 pt-1">
          <div className="mt-[20px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] max-h-[400px] w-full">
            <div className=" h-full w-full bg-[#242424] rounded-md"></div>
          </div>
          <div className="my-[20px]">
            <p className="font-semibold text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] text-[#1DB954]">
              Upcoming Event
            </p>
          </div>
          {firstEvent && (
            <Link
              to={`/event/${firstEvent._id}`}
              className="bg-[#242424] min-h-[350px] w-full flex flex-col md:flex-row justify-start items-center rounded-md transition-all duration-300 hover:bg-[#191919] hover:outline-1 hover:outline hover:outline-[#1DB954]"
            >
              <div className="min-h-[275px] h-[275px] sm:h-[275px] md:h-[350px] lg:h-[350px] max-w-[770px] w-full bg-[#242424] rounded-md">
                <img
                  src={"./images/" + firstEvent.eventimage}
                  alt="Event"
                  className="object-cover h-full w-full rounded-md"
                />
              </div>
              <div className=" max-w-full md:max-w-[500px] w-full max-h-[350px] h-full py-4 flex flex-col px-2 sm:px-4 md:px-6">
                <p
                  className="w-full min-w-[300px] max-w-[550px] mb-[15px] font-semibold text-[#1DB954] text-[26px] sm:text-[28px] 
                    md:text-[33px] lg:text-[36px] truncate"
                >
                  {firstEvent.eventname}
                </p>
                <p className="text-white text-[16px] md:h-[100px] truncate">
                  {firstEvent.eventdetail}
                </p>
                <div className="mt-[40px] flex justify-between text-white text-[16px] font-medium">
                  <div className="flex items-center">
                    <IconCom icon="clock" size="20" />
                    <div className="ml-[5px]">
                      <CountdownTimer targetDate={firstEvent.startsum} />
                    </div>
                  </div>
                  <div className="hover:text-[#1DB954]">
                    <div className="flex items-center">
                      <p className="mr-[5px]">{firstEvent.locationgooglemap}</p>
                      <IconCom icon="marker" size="20" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}
          <div className="my-[20px]">
            <p className="font-semibold text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] text-[#1DB954]">
              All Events
            </p>
          </div>
          <div className="">
            <div className="min-h-[830px] w-full flex flex-col justify-start">
              <div className="min-h-[750px] w-full flex flex-wrap justify-center px-0">
                {data.slice(1).map((event, index) => (
                  <Link
                    key={index}
                    to={`/event/${event._id}`}
                    className="bg-[#242424] rounded-md h-[350px] max-h-[350px] max-w-[340px] w-full md:mx-3 mb-4 md:mb-6 
                    transition-all duration-300 hover:bg-[#191919] hover:outline-1 hover:outline hover:outline-[#1DB954]"
                  >
                    <div className="max-h-[220px] h-[220px] bg-[#242424] rounded-md">
                      <img
                        src={"./images/" + event.eventimage}
                        alt="Event"
                        className="object-cover h-full w-full rounded-md"
                      />
                    </div>
                    <div className="px-2 sm:px-4 md:px-6">
                      <p className="mt-[10px] truncate w-full font-semibold text-[#1DB954] text-[26px] sm:text-[28px] md:text-[30px] overflow-hidden whitespace-nowrap">
                        {event.eventname}
                      </p>
                      <div className="mt-[40px] flex justify-between text-white text-[16px] font-medium">
                        <div className="flex items-center">
                          <IconCom icon="days" size="20" />
                          <div className="ml-[5px]">
                            <CountdownTimer targetDate={event.startsum} />
                          </div>
                        </div>
                        <div className="hover:text-[#1DB954]">
                          <div className="flex">
                            <p className="mr-[5px]">
                              {event.locationgooglemap}
                            </p>
                            <IconCom icon="marker" size="20" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {data.length > 6 && (
                <div className="flex justify-center items-end w-full max-h-[80px] h-[80px]">
                  <div
                    className="px-4 py-2 rounded-md bg-[#1DB954] text-white text-[20px] font-semibold cursor-pointer"
                    onClick={handleShowMoreClick}
                  >
                    <p>{showMore ? "Show less" : "Show more"}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Home;
