import React, { useEffect, useState, useRef } from "react";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import IconCom from "../components/IconCom";

import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";

import FullCalendar from "@fullcalendar/react"; // Import FullCalendar component
import dayGridPlugin from "@fullcalendar/daygrid"; // Import dayGrid plugin
import interactionPlugin from "@fullcalendar/interaction";

import axios from "axios";
import { useParams } from "react-router-dom";


function Calendar() {
  const [Allevents, setAllevents] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [allEventsClicked, setAllEventsClicked] = useState(false);

  const [data, setData] = useState([]);

  const { artistname } = useParams();

  const calendarRef = useRef(null);

  useEffect(() => {
    const calendar = calendarRef.current.getApi();
    calendar.render();

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/get-calendar/" + artistname
        );
        console.log(response.data);
        setData(response.data);
        if (response.data.valid) {
          navigate("/");
        } else {
          navigate("/calendar/:artistname");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [artistname]);

  const randomEvent =
    data.length > 0 ? data[Math.floor(Math.random() * data.length)] : null;

  const handleUpClick = () => {
    setAllevents(false);
    setAllEventsClicked(false);
  };

  const handleAllClick = () => {
    setAllevents(true);
    setAllEventsClicked(true);
    setShowMore(false);
  };

  const handleShowClick = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  const color = (eventType) => {
    switch (eventType) {
      case "concert":
        return "#542217";
      case "festival":
        return "#535417";
      case "pubbar":
        return "#175445";
      case "internal":
        return "#2E1754";
      default:
        return "#000000"; // Default color if event type is not found
    }
  };

  const allevents = data.map((event) => ({
    title: event.eventtype,
    start: event.startsum,
    end: event.endsum,
    url: `/event/${event._id}`,
    color: color(event.eventtype),
  }));

  return (
    <div className="bg-[#191414] w-full h-full min-h-dvh font-poppins">
      <Nav />
      <div className="mx-auto max-w-[1250px] bg-[#191414] mt-[60px]">
        <div className="px-2 sm:px-4 lg:px-6">
          <div className="mt-[40px] flex flex-col w-full items-center">
            <div className="mt-[40px] w-full min-h-[200px] max-h-[200px] h-full flex justify-center">
              <div className="text-white h-[200px] max-w-[350px] w-full bg-[#242424] rounded-lg flex flex-row justify-center items-center">
                {randomEvent && (
                  <div className="max-w-[150px] max-h-[150px] h-full w-full rounded-3xl bg-[#1DB954]">
                    <img
                      src={"/images/" + randomEvent.artistimage}
                      alt="Event"
                      className="object-cover h-full w-full rounded-md"
                    />
                  </div>
                )}
                <div className="ml-[20px]">
                  <p className="font-medium text-[22px] md:text-[28px]">
                    {randomEvent && randomEvent.artistname}
                  </p>
                  {randomEvent && (
                    <a href={randomEvent.artistspotify}>
                      <div className="mt-[20px] flex items-center w-[95px] h-[40px] md:w-[110px] md:h-[45px] bg-[#1DB954] justify-center rounded-md">
                        <IconCom icon="spotify" size="20" />
                        <p className="ml-[5px] text-[15px] md:text-[16px]">
                          Spotify
                        </p>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <p className="my-[20px] text-[#1DB954] font-semibold text-[35px] md:text-[40px]">
            Calendar
          </p>

          <div
            className="max-w-[1210px] h-full w-full rounded-md bg-white p-3"
          >
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              initialDate={new Date()}
              eventColor="green"
              events={allevents}
            />
          </div>

          <div className="my-[20px] flex font-semibold items-center">
            {Allevents ? (
              <>
                <button
                  className="transition-all duration-500 text-[#147235] text-[22px] sm:text-[25px] md:text-[28px] 
                            hover:text-[24px] sm:hover:text-[28px] md:hover:text-[32px] hover:text-[#1DB954]"
                  onClick={handleUpClick}
                >
                  Upcoming Events
                </button>
                <button
                  className="ml-[40px] text-[#1DB954] text-[27px] sm:text-[29px] md:text-[32px]"
                  onClick={handleAllClick}
                >
                  All Events
                </button>
              </>
            ) : (
              <>
                <button
                  className="text-[#1DB954] text-[27px] sm:text-[29px] md:text-[32px]"
                  onClick={handleUpClick}
                >
                  Upcoming Events
                </button>
                <button
                  className="transition-all duration-500 ml-[40px] text-[#147235] text-[22px] sm:text-[25px] md:text-[28px] 
                            hover:text-[24px] sm:hover:text-[28px] md:hover:text-[32px] hover:text-[#1DB954]"
                  onClick={handleAllClick}
                >
                  All Events
                </button>
              </>
            )}
          </div>
          <div className="min-h-[360px] max-w-[1210px] h-full w-full">
            {data
              .slice(0, showMore || Allevents ? data.length : 3)
              .map((data, index) => (
                <div
                  key={index}
                  className="text-[16px] text-white px-2 sm:px-4 md:px-6 max-w-[1210px] w-full min-h-[80px] max-h-[80px] h-full 
                  sm:min-h-[90px] sm:max-h-[90px] md:min-h-[90px] md:max-h-[90px] hover:bg-[#242424] rounded-lg flex flex-row items-center my-3"
                >
                  <div
                    className="min-h-[60px] min-w-[60px] max-h-[60px] max-w-[60px] sm:min-h-[60px] sm:min-w-[60px] sm:max-h-[60px] sm:max-w-[60px] 
                            md:min-h-[60px] md:min-w-[60px] md:max-h-[60px] md:max-w-[60px] h-full w-full bg-[#1DB954] rounded-md"
                  >
                    <img
                      src={"/images/" + data.eventimage}
                      alt="Event"
                      className="object-cover h-full w-full rounded-md"
                    />
                  </div>
                  <div className="hidden sm:block ml-[15px] w-full">
                    <div className="flex">
                      <p className="px-2 w-full truncate sm:min-w-[150px] sm:max-w-[250px] md:min-w-[250px] md:max-w-[350px] overflow-hidden whitespace-nowrap">
                        {data.eventname}
                      </p>
                      <p className="px-0 md:px-2 min-w-[120px] max-w-[120px] w-full">
                        {data.formattedCreatedAt}
                      </p>
                      <a
                        href="/"
                        className="px-2 max-w-[500px] w-full flex items-center justify-end"
                      >
                        <p className="mr-[10px]">{data.locationcountry}</p>
                        <IconCom icon="marker" size="18" />
                      </a>
                    </div>
                  </div>
                  <div className="sm:hidden ml-2 sm:ml-4 md:ml-6 w-full">
                    <p className="truncate max-w-[270px] sm:max-w-[350px] w-full overflow-hidden whitespace-nowrap text-[18px] font-medium">
                      {data.eventname}
                    </p>
                    <div className="flex flex-row w-full justify-between">
                      <p className="my-[5px] text-[#8A8A8A] text-[14px] w-1/2">
                        {data.formattedCreatedAt}
                      </p>
                      <a
                        href="/"
                        className="mr-[5px] w-1/2 flex items-center text-[#8A8A8A] text-[14px] justify-end"
                      >
                        <p className="mr-[10px]">{data.locationcountry}</p>
                        <IconCom icon="marker" size="14" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {!allEventsClicked &&
            data.length > 3 && ( // Condition to hide "Show more" button
              <div className="flex justify-center items-end w-full max-h-[80px] h-[80px]">
                <div
                  className="px-4 py-2 rounded-md bg-[#1DB954] text-white text-[20px] font-semibold cursor-pointer"
                  onClick={handleShowClick}
                >
                  <p>{showMore ? "Show less" : "Show more"}</p>
                </div>
              </div>
            )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Calendar;
