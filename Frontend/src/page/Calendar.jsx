import React, { useEffect, useState, useRef } from "react";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import IconCom from "../components/IconCom";
import CountdownTimer from "../components/CountdownTimer";

import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";

import FullCalendar from "@fullcalendar/react"; // Import FullCalendar component
import dayGridPlugin from "@fullcalendar/daygrid"; // Import dayGrid plugin
import interactionPlugin from "@fullcalendar/interaction";

import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";

function Calendar() {
  const [Allevents, setAllevents] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [allEventsClicked, setAllEventsClicked] = useState(false);

  const [defaultdata, setDefaultdata] = useState([]);
  const [updata, setUpData] = useState([]);
  const [alldata, setAllData] = useState([]);

  const { artistname } = useParams();

  const calendarRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const calendar = calendarRef.current.getApi();
    calendar.render();

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/get-calendar/" + artistname
        );
        console.log(response.data);
        const sortedData = response.data.sort(
          (a, b) => new Date(a.startsum) - new Date(b.startsum)
        );
        const filteredData = sortedData.filter(
          (event) => new Date(event.startsum) > new Date()
        );
        setDefaultdata(filteredData);
        setUpData(filteredData);
        setAllData(sortedData);

        const res = await axios.get("http://localhost:3002");
        if (res.data.valid) {
          navigate(`/calendar/${artistname}`);
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [artistname]);

  const randomEvent =
    alldata.length > 0
      ? alldata[Math.floor(Math.random() * alldata.length)]
      : null;

  const handleUpClick = () => {
    setAllevents(false);
    setAllEventsClicked(false);
    setUpData(defaultdata);
  };

  const handleAllClick = () => {
    setAllevents(true);
    setAllEventsClicked(true);
    setShowMore(false);
    setUpData(alldata);
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

  const allevents = alldata.map((event) => ({
    title: event.eventtype,
    start: event.startsum,
    end: event.endsum,
    url: `/event/${event._id}`,
    color: color(event.eventtype),
  }));

  const markers = alldata.map((data, index) => (
    <Marker
      key={index}
      position={[data.locationlatitude, data.locationlongitude]}
    >
      <Tooltip direction="right">{data.eventname}</Tooltip>
      <Popup>
        <p className="font-medium text-[15px]">{data.eventname}</p>
        <img
          src={"/images/" + data.eventimage}
          alt="Event"
          className="rounded-md my-1"
        />
        <CountdownTimer targetDate={data.startsum} />
        <a href={`/event/${data._id}`}>Read more</a>
      </Popup>
    </Marker>
  ));

  return (
    <div className="bg-[#191414] w-full h-full min-h-dvh font-kanit">
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
                  <p className="font-medium text-[26px] md:text-[28px]">
                    {randomEvent && randomEvent.artistname}
                  </p>
                  {randomEvent && (
                    <Link
                      to={randomEvent.artistspotify}
                      className="mt-[20px] flex items-center w-[95px] h-[40px] md:w-[110px] md:h-[45px] bg-[#1DB954] justify-center rounded-md 
                    transition-all duration-300 hover:bg-[#1CAA4E]"
                    >
                      <IconCom icon="spotify" size="20" />
                      <p className="ml-[5px] text-[15px] md:text-[16px]">
                        Spotify
                      </p>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <p className="my-[20px] text-[#1DB954] font-semibold text-[35px] md:text-[40px]">
            Calendar
          </p>

          <div className="max-w-[1210px] h-full w-full rounded-md bg-white p-3">
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              initialDate={new Date()}
              eventColor="green"
              events={allevents}
            />
          </div>

          <p className="my-[20px] text-[#1DB954] font-semibold text-[35px] md:text-[40px]">
            Map
          </p>
          <div className="z-0 max-w-[1210px] h-[700px] w-full rounded-md bg-white p-1">
            <MapContainer
              className="z-0 h-full rounded-md"
              center={[13, 100]}
              zoom={6}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {markers}
            </MapContainer>
          </div>

          <div className="my-[20px] flex font-medium items-center">
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
            {updata
              .slice(0, showMore || Allevents ? updata.length : 3)
              .map((data, index) => (
                <Link
                  to={`/event/${data._id}`}
                  key={index}
                  className="transition-all duration-300 text-[16px] text-white px-1 sm:px-2 md:px-4 max-w-[1210px] w-full min-h-[80px] max-h-[80px] h-full 
                  sm:min-h-[90px] sm:max-h-[90px] md:min-h-[90px] md:max-h-[90px] hover:bg-[#242424] rounded-lg flex flex-row items-center my-3"
                >
                  <div
                    className="min-h-[60px] min-w-[60px] max-h-[60px] max-w-[60px] h-full w-full bg-[#1DB954] rounded-md"
                  >
                    <img
                      src={"/images/" + data.eventimage}
                      alt="Event"
                      className="object-cover min-h-[60px] min-w-[60px] h-full w-full rounded-md"
                    />
                  </div>
                  <div className="hidden sm:block ml-2 w-full">
                    <div className="flex items-center">
                      <p className="px-1 w-full truncate sm:min-w-[100px] sm:max-w-[100px] md:min-w-[200px] md:max-w-[200px] lg:min-w-[300px] lg:max-w-[300px] xl:min-w-[400px] xl:max-w-[400px] 2xl:min-w-[500px] 2xl:max-w-[500px] overflow-hidden whitespace-nowrap">
                        {data.eventname}
                      </p>
                      <div className="min-w-[90px] max-w-[90px] w-full mx-2">
                        {(() => {
                          switch (data.eventtype) {
                            case "concert":
                              return (
                                <div className="px-2 py-0 rounded-2xl bg-[#542217] flex items-center justify-center border border-solid border-[#8A8A8A]">
                                  <p>concert</p>
                                </div>
                              );
                            case "festival":
                              return (
                                <div className="px-2 py-0 rounded-2xl bg-[#535417] flex items-center justify-center border border-solid border-[#8A8A8A]">
                                  <p>festival</p>
                                </div>
                              );
                            case "pubbar":
                              return (
                                <div className="px-2 py-0 rounded-2xl bg-[#175445] flex items-center justify-center border border-solid border-[#8A8A8A]">
                                  <p>pub/bar</p>
                                </div>
                              );
                            case "internal":
                              return (
                                <div className="px-2 py-0 rounded-2xl bg-[#2E1754] flex items-center justify-center border border-solid border-[#8A8A8A]">
                                  <p>internal</p>
                                </div>
                              );
                            default:
                              return (
                                <div className="px-2 py-0 rounded-2xl bg-[#54174E] flex items-center justify-center border border-solid border-[#8A8A8A]">
                                  <p>{data.eventtype}</p>
                                </div>
                              );
                          }
                        })()}
                      </div>
                      <div className="px-0 md:px-2 min-w-[120px] max-w-[140px] w-full flex justify-center">
                        {new Date(data.startsum) > new Date() ? (
                          <CountdownTimer targetDate={data.startsum} />
                        ) : (
                          <p>Out of time</p>
                        )}
                      </div>
                      <div className="pl-2 min-w-[100px] max-w-[300px] w-full flex items-center justify-end">
                        <p className="mr-[5px]">
                          {data.locationprovice},{data.locationcountry}
                        </p>
                      </div>
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
                      <div
                        href="/"
                        className="mr-[5px] max-w-[200px] w-full flex items-center text-[#8A8A8A] text-[14px] justify-end"
                      >
                        <p className="mr-[5px]">
                          {data.locationprovice},{data.locationcountry}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          {!allEventsClicked &&
            updata.length > 3 && ( // Condition to hide "Show more" button
              <div className="flex justify-center items-end w-full max-h-[80px] h-[80px]">
                <div
                  className="px-4 py-2 rounded-md bg-[#1DB954] text-white text-[20px] font-medium cursor-pointer transition-all duration-300 hover:bg-[#1CAA4E]"
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
