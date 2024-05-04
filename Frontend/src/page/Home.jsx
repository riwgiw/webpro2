import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import IconCom from "../components/IconCom";

import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

function CountdownTimer({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div>
      {timeLeft.days > 0 && (
        <span>
          {timeLeft.days} day&nbsp;
        </span>
      )}
      {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? (
        "Out of time"
      ) : (
        <>
          {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:
          {formatTime(timeLeft.seconds)} 
        </>
      )}
    </div>
  );
}

function Home() {
  const { id } = useParams();
  const [showMore, setShowMore] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/get-event")
      .then((res) => {
        const sortedData = res.data.events.sort((a, b) => new Date(a.startsum) - new Date(b.startsum));
        const filteredData = sortedData.filter(event => new Date(event.startsum) > new Date());
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
      <Nav/>
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
            <Link to={`/event/${firstEvent._id}`}  className="min-h-[350px] w-full flex flex-col lg:flex-row justify-start items-center">
              <div className="min-h-[275px] h-[275px] sm:h-[275px] md:h-[312.5px] lg:h-[350px] max-w-[650px] w-full bg-[#242424] rounded-md">
                <img
                  src={"./images/" + firstEvent.eventimage}
                  alt="Event"
                  className="object-cover h-full w-full rounded-md"
                />
              </div>
              <div className="max-w-[650px] w-full h-full py-[20px] flex flex-col px-5">
                <p
                  className="w-full min-w-[300px] max-w-[550px] mb-[20px] font-semibold text-[#1DB954] text-[24px] sm:text-[26px] 
                    md:text-[31px] lg:text-[36px] text-ellipsis line-clamp-1"
                >
                  {firstEvent.eventname}
                </p>
                <p className="text-white text-[16px] text-ellipsis line-clamp-6">
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
              <div className="min-h-[750px] w-full flex flex-wrap justify-center">
                {data.slice(1).map((event, index) => (
                  <Link
                    key={index}
                    to={`/event/${event._id}`}
                    className="h-[350px] max-h-[350px] max-w-[370px] w-[370px] mx-[10px] mb-[25px] md:mb-[30px]"
                  >
                    <div className="max-h-[220px] h-[220px] bg-[#242424] rounded-md">
                      <img
                        src={"./images/" + event.eventimage}
                        alt="Event"
                        className="object-cover h-full w-full rounded-md"
                      />
                    </div>
                    <p className="mt-[20px] truncate w-full font-semibold text-[#1DB954] text-[26px] sm:text-[28px] md:text-[30px] overflow-hidden whitespace-nowrap">
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
                          <p className="mr-[5px]">{event.locationgooglemap}</p>
                          <IconCom icon="marker" size="20" />
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
