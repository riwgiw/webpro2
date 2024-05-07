import React, { useEffect, useState } from "react";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import IconCom from "../components/IconCom";
import convertHTMLToReact from "../components/convertHTMLToReact";

import axios from "axios";

import { Link, useNavigate, useParams } from "react-router-dom";

function getShortMonth(monthNumber) {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  // ตรวจสอบว่าเลขเดือนอยู่ในช่วง 1-12 หรือไม่
  if (monthNumber >= 1 && monthNumber <= 12) {
    return months[monthNumber - 1]; // ลบออก 1 เนื่องจากเริ่มต้นจาก index 0
  } else {
    return ""; // ถ้าไม่อยู่ในช่วงนี้ให้ส่งค่าว่างกลับ
  }
}

function getLongMonth(monthNumber) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // ตรวจสอบว่าเลขเดือนอยู่ในช่วง 1-12 หรือไม่
  if (monthNumber >= 1 && monthNumber <= 12) {
    return months[monthNumber - 1]; // ลบออก 1 เนื่องจากเริ่มต้นจาก index 0
  } else {
    return ""; // ถ้าไม่อยู่ในช่วงนี้ให้ส่งค่าว่างกลับ
  }
}

function getDayName(dateString) {
  const date = new Date(dateString);
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayIndex = date.getDay();
  return dayNames[dayIndex];
}

function Eventpage() {
  const { id } = useParams();

  const [eventname, setEventname] = useState("");
  const [eventdetail, setEventdetail] = useState("");
  const [eventtype, setEventtype] = useState("");

  const [artistname, setArtistname] = useState("");
  const [artistspotify, setArtistspotify] = useState("");

  const [locationname, setLocationname] = useState("");
  const [locationprovice, setLocationprovice] = useState("");
  const [locationcountry, setLocationcountry] = useState("");
  const [locationembed, setLocationembed] = useState("");
  const [locationgooglemap, setLocationgooglemap] = useState("");

  const [startday, setStartday] = useState("");
  const [startmonth, setStartmonth] = useState("");
  const [startyear, setStartyear] = useState("");
  const [starthour, setStarthour] = useState("");
  const [startminute, setStartminute] = useState("");

  const [startsum, setStartsum] = useState("");

  const [endday, setEndday] = useState("");
  const [endmonth, setEndmonth] = useState("");
  const [endyear, setEndyear] = useState("");
  const [endhour, setEndhour] = useState("");
  const [endminute, setEndminute] = useState("");

  const [eventimage, setEventimage] = useState("");
  const [artistimage, setArtistimage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3002/get-event/" + id
        );
        console.log(response);
        setEventname(response.data.eventname);
        setEventdetail(response.data.eventdetail);
        setEventtype(response.data.eventtype);
        setArtistname(response.data.artistname);
        setArtistspotify(response.data.artistspotify);
        setLocationname(response.data.locationname);
        setLocationprovice(response.data.locationprovice);
        setLocationcountry(response.data.locationcountry);
        setLocationembed(response.data.locationembed);
        setLocationgooglemap(response.data.locationgooglemap);
        setStartday(response.data.startday);
        setStartmonth(response.data.startmonth);
        setStartyear(response.data.startyear);
        setStarthour(response.data.starthour);
        setStartminute(response.data.startminute);
        setEndday(response.data.endday);
        setEndmonth(response.data.endmonth);
        setEndyear(response.data.endyear);
        setEndhour(response.data.endhour);
        setEndminute(response.data.endminute);

        setEventimage(response.data.eventimage);
        setArtistimage(response.data.artistimage);

        setStartsum(response.data.startsum);
        const res = await axios.get("http://localhost:3002");
        if (res.data.valid) {
          navigate(`/event/${id}`);
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const embedLink = locationembed
    .replace('width="600"', 'width="100%"')
    .replace('height="450"', 'height="400"');

  // Function to convert HTML string to React element
  const convertEmbedToReact = (embedString) => {
    return convertHTMLToReact(embedString);
  };

  return (
    <div className="bg-[#191414] w-full h-full min-h-dvh font-poppins">
      <Nav />
      <div className="mx-auto max-w-[1250px] bg-[#191414] mt-[60px]">
        <div className="hidden md:block px-6 sm:px-8 lg:px-10">
          <div className="flex">
            <div className="w-[400px] max-w-[400px] h-full">
              <div className="mt-[40px] w-[400px] h-[400px] max-w-[400px] max-h-[400px] rounded-md bg-[#242424]">
                <img
                  src={"/images/" + eventimage}
                  alt="Event"
                  className="object-cover h-full w-full rounded-md"
                />
              </div>
              <div className="px-[10px] py-[15px] mt-[40px] w-full max-w-[400px] min-h-[90px] rounded-md bg-[#242424] flex text-wrap items-center text-white text-[24px] overflow-hidden">
                <div className="min-w-[75px] w-[75px] max-w-[75px] h-[75px] max-h-[75px] rounded-full bg-[#1DB954]">
                  <img
                    src={"/images/" + artistimage}
                    alt="Event"
                    className="object-cover h-full w-full rounded-full"
                  />
                </div>
                <div className="ml-[20px] w-9/12 break-words">{artistname}</div>
              </div>
            </div>
            <div className="pr-[10px] ml-[40px] min-w-0 max-w-[710px] w-full">
              <p className="mt-[40px] font-semibold text-[52px] w-full break-words text-[#1DB954]">
                {eventname}
              </p>
              <div className="mt-[30px] max-h-[50px] w-full flex">
                <div className="h-[50px] w-[50px] border-y-[3px] border-x-[3px] border-solid border-[#1DB954] bg-[#191414] rounded-xl">
                  <div className="w-full h-2/5 bg-[#1DB954] text-center flex justify-center">
                    <p className="text-[12px] text-white">
                      {getShortMonth(startmonth)}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <p className="text-[16px] mt-[1px] text-white">
                      {startday}
                    </p>
                  </div>
                </div>
                <div className="ml-[20px] h-full flex flex-col text-white justify-center">
                  <p className="-mt-[2px] font-medium text-[20px]">
                    {getDayName(startsum)}, {getLongMonth(startmonth)}{" "}
                    {startday}
                  </p>
                  <p className="mt-[2px] font-light text-[14px]">
                    {starthour}:{startminute} - {endhour}:{endminute} GMT+7
                  </p>
                </div>
              </div>
              <div className="mt-[30px] h-[50px] max-h-[50px] flex">
                <a
                  href={locationgooglemap}
                  className="h-[50px] w-[50px] flex justify-center items-center text-white border-y-[3px] border-x-[3px] border-solid border-[#1DB954] bg-[#191414] rounded-xl"
                >
                  <IconCom icon="marker" size="20" />
                </a>
                <div className="ml-[20px] h-full flex flex-col text-white justify-center items-center">
                  <div>
                    <p className="font-medium text-[20px]">
                      {locationname} {locationprovice},{locationcountry}
                    </p>
                  </div>
                </div>
              </div>

              <div className="min-w-0 max-w-[665px] min-h-[400px] max-h-[400px] bg-[#242424] w-full h-full mt-[30px] rounded-md overflow-hidden">
                {convertEmbedToReact(embedLink)}
              </div>
              <p className="text-[#1DB954] font-semibold text-[24px] mt-[20px]">
                About Event
              </p>
              <div className="min-w-0 max-w-[665px] min-h-0 max-h-[2px] w-full h-full bg-[#858585] mt-[10px] rounded-md"></div>
              <div className="mt-[30px] min-w-0 max-w-[665px] min-h-0">
                <p className="text-white text-[20px] w-full break-words">
                  {eventdetail}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden px-6 sm:px-8 lg:px-10 flex flex-col justify-center items-center">
          <div className="mt-[40px] w-[400px] h-[400px] max-w-[400px] max-h-[400px] rounded-md bg-[#242424]">
            <img
              src={"/images/" + eventimage}
              alt="Event"
              className="object-cover h-full w-full rounded-md"
            />
          </div>
          <p className="mt-[40px] font-semibold text-[45px] w-full break-words text-[#1DB954]">
            {eventname}
          </p>
          <div className="mt-[30px] max-h-[50px] w-full flex">
            <div className="flex">
              <div className="h-[50px] w-[50px] border-y-[3px] border-x-[3px] border-solid border-[#1DB954] bg-[#191414] rounded-xl">
                <div className="w-full h-2/5 bg-[#1DB954] text-center flex justify-center">
                  <p className="text-[12px] text-white">{getShortMonth(startmonth)}</p>
                </div>
                <div className="flex justify-center">
                  <p className="text-[16px] mt-[1px] text-white">{startday}</p>
                </div>
              </div>
              <div className="ml-[20px] h-full flex flex-col text-white justify-center">
                <p className="-mt-[2px] font-medium text-[20px]">
                    {getDayName(startsum)}, {getLongMonth(startmonth)}{" "}
                    {startday}
                </p>
                <p className="mt-[2px] font-light text-[14px]">
                  {starthour}:{startminute} - {endhour}:{endminute} GMT+7
                </p>
              </div>
            </div>
          </div>
          <div className="mt-[30px] h-[50px] w-full max-h-[50px] flex">
            <a
              href={locationgooglemap}
              className="h-[50px] w-[50px] flex justify-center items-center text-white border-y-[3px] border-x-[3px] border-solid border-[#1DB954] bg-[#191414] rounded-xl"
            >
              <IconCom icon="marker" size="20" />
            </a>
            <div className="ml-[20px] h-full flex flex-col text-white justify-center items-center">
              <div>
                <p className="font-medium text-[20px]">
                  {locationname} {locationprovice},{locationcountry}
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-[665px] min-h-[400px] max-h-[400px] bg-[#242424] w-full h-full mt-[30px] rounded-md text-white overflow-hidden">
            {convertEmbedToReact(embedLink)}
          </div>

          <p className="text-[#1DB954] font-semibold text-[24px] mt-[20px]">
            About Event
          </p>
          <div className="min-w-0 min-h-[2px] w-full h-full bg-[#858585] mt-[10px] rounded-md"></div>
          <div className="mt-[30px] min-w-0 max-w-[665px] min-h-0 w-full">
            <p className="text-white text-[18px] w-full break-words">{eventdetail}</p>
          </div>
          <div className="px-[10px] py-[15px] mt-[40px] w-full max-w-[400px] min-h-[90px] rounded-md bg-[#242424] flex text-wrap items-center text-white text-[22px] overflow-hidden">
            <div className="min-w-[75px] w-[75px] max-w-[75px] h-[75px] max-h-[75px] rounded-full bg-[#1DB954]">
              <img
                src={"/images/" + artistimage}
                alt="Event"
                className="object-cover h-full w-full rounded-full"
              />
            </div>
            <div className="ml-[20px] w-9/12 break-words">{artistname}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Eventpage;
