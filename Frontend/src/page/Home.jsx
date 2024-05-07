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
  const [images, setImages] = useState([]);
  const [imageCount, setImageCount] = useState(0);

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
        setImages(filteredData.map((event) => event.eventimage));
        setImageCount(filteredData.length);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const firstEvent = data.length > 0 ? data[0] : null;

  const handleShowMoreClick = () => {
    setShowMore(!showMore);
  };

  let imageComponent = null;

  if (imageCount === 1) {
    imageComponent = (
      <div className={`h-full w-full bg-[#242424] rounded-md`}>
        {data.map((data, index) => (
          <Link to={`/event/${data._id}`} key={index}>
            <img
              src={"/images/" + data.eventimage}
              alt="Event"
              className="object-cover h-full min-w-full w-full rounded-md"
            />
          </Link>
        ))}
      </div>
    );
  } else if (imageCount === 2) {
    imageComponent = (
      <div className={`h-full w-full bg-[#242424] rounded-md flex`}>
        {data.map((data, index) => (
          <Link to={`/event/${data._id}`} key={index} className="h-full min-w-full w-full wrapper2">
            <img
              key={index}
              src={"/images/" + data.eventimage}
              alt="Event"
              className="object-cover h-full min-w-full w-full rounded-md"
            />
          </Link>
        ))}
      </div>
    );
  } else if (imageCount === 3) {
    imageComponent = (
      <div className={`h-full w-full bg-[#242424] rounded-md flex`}>
        {data.map((data, index) => (
          <Link to={`/event/${data._id}`} key={index} className="h-full min-w-full w-full wrapper3">
            <img
              key={index}
              src={"/images/" + data.eventimage}
              alt="Event"
              className="object-cover h-full min-w-full w-full rounded-md"
            />
          </Link>
        ))}
      </div>
    );
  } else if (imageCount === 4) {
    imageComponent = (
      <div className={`h-full w-full bg-[#242424] rounded-md flex`}>
        {data.map((data, index) => (
          <Link to={`/event/${data._id}`} key={index} className="h-full min-w-full w-full wrapper4">
            <img
              key={index}
              src={"/images/" + data.eventimage}
              alt="Event"
              className="object-cover h-full min-w-full w-full rounded-md"
            />
          </Link>
        ))}
      </div>
    );
  } else if (imageCount === 5) {
    imageComponent = (
      <div className={`h-full w-full bg-[#242424] rounded-md flex`}>
        {data.map((data, index) => (
          <Link to={`/event/${data._id}`} key={index} className="h-full min-w-full w-full wrapper5">
            <img
              key={index}
              src={"/images/" + data.eventimage}
              alt="Event"
              className="object-cover h-full min-w-full w-full rounded-md"
            />
          </Link>
        ))}
      </div>
    );
  } else if (imageCount === 6) {
    imageComponent = (
      <div className={`h-full w-full bg-[#242424] rounded-md flex`}>
        {data.map((data, index) => (
          <Link to={`/event/${data._id}`} key={index} className="h-full min-w-full w-full wrapper6">
            <img
              key={index}
              src={"/images/" + data.eventimage}
              alt="Event"
              className="object-cover h-full min-w-full w-full rounded-md"
            />
          </Link>
        ))}
      </div>
    );
  } else if (imageCount >= 7) {
    imageComponent = (
      <div className={`h-full w-full bg-[#242424] rounded-md flex`}>
        {data.map((data, index) => (
          <Link to={`/event/${data._id}`} key={index} className="h-full min-w-full w-full wrapper7">
            <img
              key={index}
              src={"/images/" + data.eventimage}
              alt="Event"
              className="object-cover h-full min-w-full w-full rounded-md"
            />
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-[#191414] w-full h-full min-h-dvh font-poppins">
      <Nav />
      <div className="mx-auto max-w-[1250px] bg-[#191414] mt-[60px]">
        <div className="px-4 sm:px-6 lg:px-8 pt-1">
          <div className="mt-[20px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] max-h-[400px] w-full translate-x-[-1/2] translate-y-[-1/2] rounded-md overflow-hidden">
            {imageComponent}
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
                  src={"/images/" + firstEvent.eventimage}
                  alt="Event"
                  className="object-cover h-full w-full rounded-md"
                />
              </div>
              <div className=" max-w-full md:max-w-[500px] w-full max-h-[350px] h-full py-4 flex flex-col px-2 sm:px-4 md:px-6">
                <p
                  className="w-full min-w-[300px] max-w-[550px] mb-[-10px] font-semibold text-[#1DB954] text-[28px] sm:text-[30px] 
                    md:text-[35px] lg:text-[38px] truncate"
                >
                  {firstEvent.eventname}
                </p>
                <p className="text-[#8A8A8A] font-light mb-[10px] text-[20px]">{firstEvent.artistname}</p>
                <p className="text-white text-[16px] md:h-[100px] truncate">
                  {firstEvent.eventdetail}
                </p>
                <div className="mt-[40px] flex justify-between text-white text-[16px]">
                  <div className="flex items-center">
                    <IconCom icon="clock" size="16" />
                    <div className="ml-[5px]">
                      <CountdownTimer targetDate={firstEvent.startsum} />
                    </div>
                  </div>
                  <div className="hover:text-[#1DB954]">
                    <div className="flex items-center">
                      <p className="mr-[5px] text-[#8A8A8A]">{firstEvent.locationprovice},{firstEvent.locationcountry}</p>
                      <IconCom icon="marker" size="16" />
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
              <div className="min-h-[750px] w-full grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 grid gap-2 md:gap-3">
                {data.slice(1).map((event, index) => (
                  <Link
                    key={index}
                    to={`/event/${event._id}`}
                    className="bg-[#242424] rounded-md h-[360px] max-h-[360px] max-w-[340px] w-full md:mx-3 mb-4 md:mb-6 
                    transition-all duration-300 hover:bg-[#191919] hover:outline-1 hover:outline hover:outline-[#1DB954]"
                  >
                    <div className="max-h-[220px] h-[220px] bg-[#242424] rounded-md">
                      <img
                        src={"./images/" + event.eventimage}
                        alt="Event"
                        className="object-cover h-full w-full rounded-md"
                      />
                    </div>
                    <div className="px-2 sm:px-3 md:px-4">
                      <p className="mt-[5px] truncate w-full font-semibold mb-[-5px] text-[#1DB954] text-[28px] sm:text-[30px] md:text-[32px] overflow-hidden whitespace-nowrap">
                        {event.eventname}
                      </p>
                      <p className="text-[16px] font-light text-[#8A8A8A]">{event.artistname}</p>
                      <div className="mt-[20px] hidden md:flex justify-between text-white text-[16px]">
                        <div className="flex items-center">
                          <IconCom icon="clock" size="16" />
                          <div className="ml-[5px]">
                            <CountdownTimer targetDate={event.startsum} />
                          </div>
                        </div>
                        <div className="">
                          <div className="flex items-center">
                            <p className="mr-[5px] text-[#8A8A8A]">
                              {event.locationprovice},{event.locationcountry}
                            </p>
                            <IconCom icon="marker" size="16" />
                          </div>
                        </div>
                      </div>
                      <div className="flex md:hidden flex-col text-white text-[16px]">
                        <div className="flex items-center mt-1">
                          <IconCom icon="clock" size="16" />
                          <div className="ml-[5px]">
                            <CountdownTimer targetDate={event.startsum} />
                          </div>
                        </div>
                        <div className="">
                          <div className="flex mt-2 items-center">
                            <IconCom icon="marker" size="16" />
                            <p className="ml-[5px] text-[#8A8A8A]">
                              {event.locationprovice},{event.locationcountry}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {data.length > 7 && (
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
