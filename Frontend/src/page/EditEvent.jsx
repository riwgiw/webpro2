import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import IconCom from "../components/IconCom";

import axios from "axios";

import { Link, useNavigate, useParams } from "react-router-dom";

function EditEvent() {
  const { id } = useParams();

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const [previewImage1, setPreviewImage1] = useState(null);
  const [previewImage2, setPreviewImage2] = useState(null);

  const [initialEventname, setInitialEventname] = useState("");
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
        setInitialEventname(response.data.eventname);
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
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const onInputChange1 = (e) => {
    const file = e.target.files[0];
    setImage1(file);

    // Preview image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage1(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage1(null);
    }
  };

  const onInputChange2 = (e) => {
    const file = e.target.files[0];
    setImage2(file);

    // Preview image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage2(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage2(null);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updateData = {
      eventname,
      eventdetail,
      eventtype,
      artistname,
      artistspotify,
      locationname,
      locationprovice,
      locationcountry,
      locationembed,
      locationgooglemap,
      startday,
      startmonth,
      startyear,
      starthour,
      startminute,
      endday,
      endmonth,
      endyear,
      endhour,
      endminute,
    };

    const formData = new FormData();

    // Append image1 only if it exists
    if (image1) {
      formData.append("eventimage", image1);
    }

    // Append image2 only if it exists
    if (image2) {
      formData.append("artistimage", image2);
    }

    // Append other updateData fields
    for (let key in updateData) {
      formData.append(key, updateData[key]);
    }

    axios
      .put("http://localhost:3002/update-event/" + id, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-[#191414] w-full h-full min-h-dvh font-poppins">
      <Nav />
      <div className="w-full min-h-[60px] bg-[#242424] mt-[60px] fixed top-0 z-40">
        <div className="max-w-[1250px] mx-auto h-full bg-[#242424] px-4 sm:px-6 lg:px-8">
          <div className="h-[60px] flex items-center justify-center sm:justify-start  text-white font-semibold">
            <Link
              to="/manageuser"
              className="transition-all duration-500 px-3 py-2 hover:bg-[#191919] rounded-lg text-[16px] sm:text-[18px] md:text-[20px]"
            >
              Manage Users
            </Link>
            <Link
              to="/manageevent"
              className="transition-all duration-500 px-3 py-2 ml-[20px] rounded-lg bg-black text-[17px] sm:text-[18px] md:text-[20px]"
            >
              Manage Events
            </Link>
          </div>
        </div>
      </div>
      <div className="-z-40 mt-[120px] px-2 sm:px-4 md:px-6 lg:px-16 max-w-[1250px] mx-auto h-full flex justify-center">
        <div className="mt-[30px] w-full flex flex-col items-center">
          <div className="h-[80px] md:h-[70px] w-full flex flex-row items-center">
            <Link
              to="/manageevent"
              className="flex px-3 py-2 rounded-lg items-center border-2 border-solid border-[#8A8A8A] text-white hover:bg-[#242424]"
            >
              <IconCom icon="left" size="18" />
              <p className="ml-[2px] text-[14px]">Back</p>
            </Link>
            <div className="ml-[15px] flex flex-col justify-evenly h-full w-full">
              <p className="hidden md:block text-[#1DB954] md:max-w-[500px] w-full font-medium text-[16px] truncate overflow-hidden whitespace-nowrap">
                {id}-{initialEventname}
              </p>
              <div className="block md:hidden text-[#1DB954] w-full font-medium text-[16px]">
                <p>{id}</p>
                <p className="max-w-[265px] w-full truncate overflow-hidden whitespace-nowrap">
                  {initialEventname}
                </p>
              </div>
              <p className="text-white font-semibold text-[20px]">Edit Event</p>
            </div>
          </div>
          <form
            onSubmit={handleUpdate}
            className="mt-[10px] rounded-md bg-[#242424] w-full h-full p-[20px] text-[14px]"
          >
            <div className="hidden md:flex w-full h-full">
              <div className="w-1/2 h-full text-white text-[14px] font-medium">
                <p className="mb-[10px]">Image</p>
                <div className="w-full h-0 rounded-md aspect-w-1 aspect-h-1 bg-[#191414] my-[10px] text-black">
                  {previewImage1 ? (
                    <img
                      src={previewImage1}
                      alt="Preview 1"
                      className="object-cover h-full w-full rounded-md"
                    />
                  ) : (
                    <img
                      src={"/images/" + eventimage}
                      alt="Event"
                      className="object-cover h-full w-full rounded-md"
                    />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onInputChange1}
                  className="px-3 py-2 my-[10px] h-[40px] w-full rounded-md bg-[#191414] flex text-white 
                  file:border-0 file:bg-[#191414] file:text-[14px] file:font-semibold file:text-white"
                ></input>
                <p className="mt-[15px] mb-[10px]">Artist</p>
                <div className="w-full h-0 rounded-md aspect-w-1 aspect-h-1 bg-white my-[10px]">
                  {previewImage2 ? (
                    <img
                      src={previewImage2}
                      alt="Preview 2"
                      className="object-cover h-full w-full rounded-md"
                    />
                  ) : (
                    <img
                      src={"/images/" + artistimage}
                      alt="Artist"
                      className="object-cover h-full w-full rounded-md"
                    />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onInputChange2}
                  className="px-3 py-2 my-[10px] h-[40px] w-full rounded-md bg-[#191414] flex text-white 
                  file:border-0 file:bg-[#191414] file:text-[14px] file:font-semibold file:text-white"
                ></input>
                <p className="mt-[15px] mb-[10px]">Name Artist</p>
                <input
                  type="text"
                  value={artistname}
                  onChange={(e) => setArtistname(e.target.value)}
                  name="artistname"
                  placeholder="Artist"
                  className="h-[40px] w-full rounded-md pl-2 focus:outline-none bg-[#191414] text-white
                  focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                />
                <p className="mt-[15px] mb-[10px]">Spotify Link</p>
                <input
                  type="text"
                  value={artistspotify}
                  onChange={(e) => setArtistspotify(e.target.value)}
                  name="artistspotify"
                  placeholder="Spotify"
                  className="h-[40px] w-full rounded-md pl-2 focus:outline-none bg-[#191414] text-white
                  focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                />
              </div>

              <div className="w-1/2 h-full pl-[20px] text-white text-[14px] font-medium">
                <p className="mb-[10px]">Name Event</p>
                <input
                  type="text"
                  value={eventname}
                  onChange={(e) => setEventname(e.target.value)}
                  name="eventname"
                  placeholder="Event"
                  className="h-[40px] w-full rounded-md pl-2 focus:outline-none bg-[#191414] text-white
                  focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                />
                <p className="mt-[15px] mb-[10px]">Detail Event</p>
                <textarea
                  type="text"
                  value={eventdetail}
                  onChange={(e) => setEventdetail(e.target.value)}
                  name="eventdetail"
                  className="w-full pl-2 pt-2 rounded-md bg-[#191414] text-white focus:outline-none
                  focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                  id=""
                  rows="8"
                  placeholder="Tell about event"
                ></textarea>
                <p className="mt-[15px] mb-[10px]">Type Event</p>
                <select
                  value={eventtype}
                  onChange={(e) => setEventtype(e.target.value)}
                  name="eventtype"
                  className="h-[40px] w-full rounded-md px-2 bg-[#191414] text-white focus:outline-none
                  focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                >
                  <option>Select Type</option>
                  <option value="pubbar">Pub/Bar</option>
                  <option value="festival">Festival</option>
                  <option value="concert">Concert</option>
                  <option value="internal">Internal</option>
                </select>

                <p className="mt-[15px] mb-[10px]">Name Location</p>
                <input
                  type="text"
                  value={locationname}
                  onChange={(e) => setLocationname(e.target.value)}
                  name="locationname"
                  placeholder="Location"
                  className="h-[40px] w-full rounded-md pl-2 bg-[#191414] text-white focus:outline-none
                  focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                />
                <div className="mt-[15px] mb-[10px] flex">
                  <div className="w-1/2 pr-[5px]">
                    <p className="mb-[10px]">Provice</p>
                    <input
                      type="text"
                      value={locationprovice}
                      onChange={(e) => setLocationprovice(e.target.value)}
                      name="locationprovice"
                      placeholder="Provice"
                      className="h-[40px] w-full rounded-md pl-2 bg-[#191414] text-white focus:outline-none
                      focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                    />
                  </div>
                  <div className="pl-[5px] w-1/2">
                    <p className="mb-[10px]">Country</p>
                    <input
                      type="text"
                      value={locationcountry}
                      onChange={(e) => setLocationcountry(e.target.value)}
                      name="locationcountry"
                      placeholder="Country"
                      className="h-[40px] w-full rounded-md pl-2 bg-[#191414] text-white focus:outline-none
                      focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                    />
                  </div>
                </div>
                <div className="mt-[15px] mb-[10px] flex">
                  <div className="w-1/2 pr-[5px]">
                    <p className="mb-[10px]">Embed link</p>
                    <input
                      type="text"
                      value={locationembed}
                      onChange={(e) => setLocationembed(e.target.value)}
                      name="locationembed"
                      placeholder="Embed link"
                      className="h-[40px] w-full rounded-md pl-2 bg-[#191414] text-white focus:outline-none
                      focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                    />
                  </div>
                  <div className="pl-[5px] w-1/2">
                    <p className="mb-[10px]">Google map</p>
                    <input
                      type="text"
                      value={locationgooglemap}
                      onChange={(e) => setLocationgooglemap(e.target.value)}
                      name="locationgooglemap"
                      placeholder="Link Google map"
                      className="h-[40px] w-full rounded-md pl-2 bg-[#191414] text-white focus:outline-none
                      focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                    />
                  </div>
                </div>
                <p className="mt-[15px] mb-[10px]">Time Event</p>
                <div className="mt-[10px] mb-[10px] flex flex-col items-center">
                  <div className="w-full h-[100px] rounded-md outline-2 outline outline-[#8A8A8A] px-[2px] py-[2px] mb-[10px] flex">
                    <div className="h-full w-[30px] bg-[#191414] rounded-l-md text-white flex flex-col items-center pt-1">
                      <IconCom icon="calendarcorrect" size="16" />
                      <p className="rotate-90 mt-5 text-[16px] font-semibold">
                        START
                      </p>
                    </div>
                    <div className="px-2 w-full h-full flex flex-col xl:flex-row justify-around items-center">
                      <div className="flex">
                        <select
                          value={startday}
                          onChange={(e) => setStartday(e.target.value)}
                          name="startday"
                          className="h-[30px] w-[55px] flex rounded-lg pl-1 bg-[#191414] text-white focus:outline-none
                          focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                        >
                          <option>DAY</option>
                          {Array.from({ length: 31 }, (_, index) => (
                            <option
                              key={index + 1}
                              value={
                                index + 1 < 10 ? `0${index + 1}` : index + 1
                              }
                            >
                              {index + 1}
                            </option>
                          ))}
                        </select>
                        <select
                          value={startmonth}
                          onChange={(e) => setStartmonth(e.target.value)}
                          name="startmonth"
                          className="ml-2 h-[30px] w-[120px] flex justify-center items-center rounded-lg pl-1 bg-[#191414] text-white focus:outline-none
                          focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                        >
                          <option>MONTH</option>
                          {[
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
                          ].map((month, index) => (
                            <option
                              key={index}
                              value={
                                index + 1 < 10 ? `0${index + 1}` : index + 1
                              }
                            >
                              {month.toUpperCase()}
                            </option>
                          ))}
                        </select>
                        <select
                          value={startyear}
                          onChange={(e) => setStartyear(e.target.value)}
                          name="startyear"
                          className="ml-2 h-[30px] w-[60px] flex justify-center items-center rounded-lg pl-1 bg-[#191414] text-white focus:outline-none
                          focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                        >
                          <option>YEAR</option>
                          {Array.from({ length: 15 }, (_, index) => (
                            <option key={index} value={2024 + index}>
                              {2024 + index}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center outline outline-[#8A8A8A] outline-2 px-2 py-1 rounded-md">
                        <IconCom icon="clock" size="16" />
                        <select
                          value={starthour}
                          onChange={(e) => setStarthour(e.target.value)}
                          name="starthour"
                          className="ml-1 h-[30px] w-[50px] flex justify-center items-center rounded-lg pl-1 bg-[#191414] text-white focus:outline-none
                          focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                        >
                          <option>HH</option>
                          {Array.from({ length: 24 }, (_, index) => (
                            <option
                              key={index}
                              value={index < 10 ? `0${index}` : index}
                            >
                              {index}
                            </option>
                          ))}
                        </select>
                        <p className="text-[16px] font-semibold mx-1">:</p>
                        <select
                          value={startminute}
                          onChange={(e) => setStartminute(e.target.value)}
                          name="startminute"
                          className="h-[30px] w-[55px] flex justify-center items-center rounded-lg pl-1 bg-[#191414] text-white focus:outline-none
                          focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                        >
                          <option>MM</option>
                          {Array.from({ length: 60 }, (_, index) => (
                            <option
                              key={index}
                              value={index < 10 ? `0${index}` : index}
                            >
                              {index < 10 ? `0${index}` : index}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <IconCom icon="doubledown" size="20" />
                  <div className="w-full h-[100px] rounded-md outline-2 outline outline-[#8A8A8A] px-[2px] py-[2px] mt-[10px] flex">
                    <div className="h-full w-[30px] bg-[#191414] rounded-l-md text-white flex flex-col items-center pt-1">
                      <IconCom icon="calendarx" size="16" />
                      <p className="rotate-90 mt-3 text-[16px] font-semibold">
                        END
                      </p>
                    </div>
                    <div className="px-2 w-full h-full flex flex-col xl:flex-row justify-around items-center">
                      <div className="flex">
                        <select
                          value={endday}
                          onChange={(e) => setEndday(e.target.value)}
                          name="endday"
                          className="h-[30px] w-[55px] flex rounded-lg pl-1 bg-[#191414] text-white focus:outline-none
                          focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                        >
                          <option>DAY</option>
                          {Array.from({ length: 31 }, (_, index) => (
                            <option
                              key={index + 1}
                              value={
                                index + 1 < 10 ? `0${index + 1}` : index + 1
                              }
                            >
                              {index + 1}
                            </option>
                          ))}
                        </select>
                        <select
                          value={endmonth}
                          onChange={(e) => setEndmonth(e.target.value)}
                          name="endmonth"
                          className="ml-2 h-[30px] w-[120px] flex justify-center items-center rounded-lg pl-1 bg-[#191414] text-white focus:outline-none
                          focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                        >
                          <option>MONTH</option>
                          {[
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
                          ].map((month, index) => (
                            <option
                              key={index}
                              value={
                                index + 1 < 10 ? `0${index + 1}` : index + 1
                              }
                            >
                              {month.toUpperCase()}
                            </option>
                          ))}
                        </select>
                        <select
                          value={endyear}
                          onChange={(e) => setEndyear(e.target.value)}
                          name="endyear"
                          className="ml-2 h-[30px] w-[60px] flex justify-center items-center rounded-lg pl-1 bg-[#191414] text-white focus:outline-none
                          focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                        >
                          <option>YEAR</option>
                          {Array.from({ length: 15 }, (_, index) => (
                            <option key={index} value={2024 + index}>
                              {2024 + index}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center outline outline-[#8A8A8A] outline-2 px-2 py-1 rounded-md">
                        <IconCom icon="clock" size="16" />
                        <select
                          value={endhour}
                          onChange={(e) => setEndhour(e.target.value)}
                          name="endhour"
                          className="ml-1 h-[30px] w-[50px] flex justify-center items-center rounded-lg pl-1 bg-[#191414] text-white focus:outline-none
                          focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                        >
                          <option>HH</option>
                          {Array.from({ length: 24 }, (_, index) => (
                            <option
                              key={index}
                              value={index < 10 ? `0${index}` : index}
                            >
                              {index}
                            </option>
                          ))}
                        </select>
                        <p className="text-[16px] font-semibold mx-1">:</p>
                        <select
                          value={endminute}
                          onChange={(e) => setEndminute(e.target.value)}
                          name="endminute"
                          className="h-[30px] w-[55px] flex justify-center items-center rounded-lg pl-1 bg-[#191414] text-white focus:outline-none
                          focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                        >
                          <option>MM</option>
                          {Array.from({ length: 60 }, (_, index) => (
                            <option
                              key={index}
                              value={index < 10 ? `0${index}` : index}
                            >
                              {index < 10 ? `0${index}` : index}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="h-[40px] w-full rounded-lg mt-[40px] bg-[#1DB954] text-center font-semibold text-white transition-all duration-300 hover:bg-[#1CAA4E]"
                >
                  Save
                </button>
              </div>
            </div>
            <div className="block md:hidden w-full h-full text-white text-[14px] font-medium">
              <p className="mb-[10px]">Image</p>
              <div className="w-full h-0 rounded-md aspect-w-1 aspect-h-1 bg-white my-[10px]">
                {previewImage1 ? (
                  <img
                    src={previewImage1}
                    alt="Preview 1"
                    className="object-cover h-full w-full rounded-md"
                  />
                ) : (
                  <img
                    src={"/images/" + eventimage}
                    alt="Event"
                    className="object-cover h-full w-full rounded-md"
                  />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={onInputChange1}
                className="px-3 py-2 my-[10px] h-[40px] w-full rounded-md bg-[#191414] flex text-white 
                file:border-0 file:bg-[#191414] file:text-[14px] file:font-semibold file:text-white"
              ></input>
              <p className="mt-[15px] mb-[10px]">Artist</p>
              <div className="w-full h-0 rounded-md aspect-w-1 aspect-h-1 bg-white my-[10px]">
                {previewImage2 ? (
                  <img
                    src={previewImage2}
                    alt="Preview 2"
                    className="object-cover h-full w-full rounded-md"
                  />
                ) : (
                  <img
                    src={"/images/" + artistimage}
                    alt="Artist"
                    className="object-cover h-full w-full rounded-md"
                  />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={onInputChange2}
                className="px-3 py-2 my-[10px] h-[40px] w-full rounded-md bg-[#191414] flex text-white 
                file:border-0 file:bg-[#191414] file:text-[14px] file:font-semibold file:text-white"
              ></input>
              <p className="mt-[15px] mb-[10px]">Name Artist</p>
              <input
                type="text"
                value={artistname}
                onChange={(e) => setArtistname(e.target.value)}
                name="artistname"
                placeholder="Artist"
                className="h-[40px] w-full rounded-md pl-2 focus:outline-none bg-[#191414] text-white
                focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
              />
              <p className="mt-[15px] mb-[10px]">Spotify Link</p>
              <input
                type="text"
                value={artistspotify}
                onChange={(e) => setArtistspotify(e.target.value)}
                name="artistspotify"
                placeholder="Spotify"
                className="h-[40px] w-full rounded-md pl-2 focus:outline-none bg-[#191414] text-white
                focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
              />
              <p className="mt-[15px] mb-[10px]">Name Event</p>
              <input
                type="text"
                value={eventname}
                onChange={(e) => setEventname(e.target.value)}
                name="eventname"
                placeholder="Event"
                className="h-[40px] w-full rounded-md pl-2 focus:outline-none bg-[#191414] text-white
                focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
              />
              <p className="mt-[15px] mb-[10px]">Detail Event</p>
              <textarea
                className="w-full pl-2 pt-2 rounded-md bg-[#191414] text-white focus:outline-none
                focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                type="text"
                value={eventdetail}
                onChange={(e) => setEventdetail(e.target.value)}
                name="eventdetail"
                id=""
                rows="8"
                placeholder="Tell about event"
              ></textarea>
              <p className="mt-[15px] mb-[10px]">Type Event</p>
              <select
                value={eventtype}
                onChange={(e) => setEventtype(e.target.value)}
                name="eventtype"
                className="h-[40px] w-full rounded-md px-2 bg-[#191414] text-white focus:outline-none
                focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
              >
                <option>Select Type</option>
                <option value="pubbar">Pub/Bar</option>
                <option value="festival">Festival</option>
                <option value="concert">Concert</option>
                <option value="internal">Internal</option>
              </select>

              <p className="mt-[15px] mb-[10px]">Name Location</p>
              <input
                type="text"
                value={locationname}
                onChange={(e) => setLocationname(e.target.value)}
                name="locationname"
                placeholder="Location"
                className="h-[40px] w-full rounded-md pl-2 bg-[#191414] text-white focus:outline-none
                focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
              />
              <div className="mt-[15px] mb-[10px] flex">
                <div className="w-1/2 pr-[5px]">
                  <p className="mb-[10px]">Provice</p>
                  <input
                    type="text"
                    value={locationprovice}
                    onChange={(e) => setLocationprovice(e.target.value)}
                    name="locationprovice"
                    placeholder="Provice"
                    className="h-[40px] w-full rounded-md pl-2 bg-[#191414] text-white focus:outline-none
                    focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                  />
                </div>
                <div className="pl-[5px] w-1/2">
                  <p className="mb-[10px]">Country</p>
                  <input
                    type="text"
                    value={locationcountry}
                    onChange={(e) => setLocationcountry(e.target.value)}
                    name="locationcountry"
                    placeholder="Country"
                    className="h-[40px] w-full rounded-md pl-2 bg-[#191414] text-white focus:outline-none
                    focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                  />
                </div>
              </div>
              <div className="mt-[15px] mb-[10px] flex">
                <div className="w-1/2 pr-[5px]">
                  <p className="mb-[10px]">Embed link</p>
                  <input
                    type="text"
                    value={locationembed}
                    onChange={(e) => setLocationembed(e.target.value)}
                    name="locationembed"
                    placeholder="Embed link"
                    className="h-[40px] w-full rounded-md pl-2 bg-[#191414] text-white focus:outline-none
                    focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                  />
                </div>
                <div className="pl-[5px] w-1/2">
                  <p className="mb-[10px]">Google map</p>
                  <input
                    type="text"
                    value={locationgooglemap}
                    onChange={(e) => setLocationgooglemap(e.target.value)}
                    name="locationgooglemap"
                    placeholder="Link Google map"
                    className="h-[40px] w-full rounded-md pl-2 bg-[#191414] text-white focus:outline-none
                    focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                  />
                </div>
              </div>
              <p className="mt-[15px] mb-[10px]">Time Event</p>
              <div className="mt-[10px] mb-[10px] flex flex-col items-center">
                <div className="w-full h-[100px] rounded-md outline-2 outline outline-[#8A8A8A] px-[2px] py-[2px] mb-[10px] flex">
                  <div className="h-full w-[30px] bg-[#191414] rounded-l-md text-white flex flex-col items-center pt-1">
                    <IconCom icon="calendarcorrect" size="16" />
                    <p className="rotate-90 mt-5 text-[16px] font-semibold">
                      START
                    </p>
                  </div>
                  <div className="px-2 w-full h-full flex flex-col sm:flex-row justify-around sm:justify-evenly items-center">
                    <div className="flex">
                      <select
                        value={startday}
                        onChange={(e) => setStartday(e.target.value)}
                        name="startday"
                        className="h-[30px] w-[55px] flex rounded-lg pl-1 bg-[#191414] text-white focus:outline-none
                        focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                      >
                        <option>DAY</option>
                        {Array.from({ length: 31 }, (_, index) => (
                          <option
                            key={index + 1}
                            value={index + 1 < 10 ? `0${index + 1}` : index + 1}
                          >
                            {index + 1}
                          </option>
                        ))}
                      </select>
                      <select
                        value={startmonth}
                        onChange={(e) => setStartmonth(e.target.value)}
                        name="startmonth"
                        className="ml-2 h-[30px] w-[120px] flex justify-center items-center rounded-lg pl-1 bg-[#191414] text-white focus:outline-none
                        focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                      >
                        <option>MONTH</option>
                        {[
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
                        ].map((month, index) => (
                          <option
                            key={index}
                            value={index + 1 < 10 ? `0${index + 1}` : index + 1}
                          >
                            {month.toUpperCase()}
                          </option>
                        ))}
                      </select>
                      <select
                        value={startyear}
                        onChange={(e) => setStartyear(e.target.value)}
                        name="startyear"
                        className="ml-2 h-[30px] w-[60px] flex justify-center items-center rounded-lg pl-1 bg-[#191414] text-white focus:outline-none
                        focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                      >
                        <option>YEAR</option>
                        {Array.from({ length: 15 }, (_, index) => (
                          <option key={index} value={2024 + index}>
                            {2024 + index}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center outline outline-[#8A8A8A] outline-2 px-2 py-1 rounded-md">
                      <IconCom icon="clock" size="16" />
                      <select
                        value={starthour}
                        onChange={(e) => setStarthour(e.target.value)}
                        name="starthour"
                        className="ml-1 h-[30px] w-[50px] flex justify-center items-center rounded-lg pl-1 bg-[#191414] text-white focus:outline-none
                        focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                      >
                        <option>HH</option>
                        {Array.from({ length: 24 }, (_, index) => (
                          <option
                            key={index}
                            value={index < 10 ? `0${index}` : index}
                          >
                            {index}
                          </option>
                        ))}
                      </select>
                      <p className="text-[16px] font-semibold mx-1">:</p>
                      <select
                        value={startminute}
                        onChange={(e) => setStartminute(e.target.value)}
                        name="startminute"
                        className="h-[30px] w-[55px] flex justify-center items-center rounded-lg pl-1 bg-[#191414] text-white focus:outline-none
                        focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                      >
                        <option>MM</option>
                        {Array.from({ length: 60 }, (_, index) => (
                          <option
                            key={index}
                            value={index < 10 ? `0${index}` : index}
                          >
                            {index < 10 ? `0${index}` : index}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <IconCom icon="doubledown" size="20" />
                <div className="w-full h-[100px] rounded-md outline-2 outline outline-[#8A8A8A] px-[2px] py-[2px] mt-[10px] flex">
                  <div className="h-full w-[30px] bg-[#191414] rounded-l-md text-white flex flex-col items-center pt-1">
                    <IconCom icon="calendarx" size="16" />
                    <p className="rotate-90 mt-3 text-[16px] font-semibold">
                      END
                    </p>
                  </div>
                  <div className="px-2 w-full h-full flex flex-col sm:flex-row justify-around sm:justify-evenly items-center">
                    <div className="flex">
                      <select
                        value={endday}
                        onChange={(e) => setEndday(e.target.value)}
                        name="endday"
                        className="h-[30px] w-[55px] flex rounded-lg pl-1 bg-[#191414] text-white focus:outline-none
                        focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                      >
                        <option>DAY</option>
                        {Array.from({ length: 31 }, (_, index) => (
                          <option
                            key={index + 1}
                            value={index + 1 < 10 ? `0${index + 1}` : index + 1}
                          >
                            {index + 1}
                          </option>
                        ))}
                      </select>
                      <select
                        value={endmonth}
                        onChange={(e) => setEndmonth(e.target.value)}
                        name="endmonth"
                        className="ml-2 h-[30px] w-[120px] flex justify-center items-center rounded-lg pl-1 bg-[#191414] text-white focus:outline-none
                        focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                      >
                        <option>MONTH</option>
                        {[
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
                        ].map((month, index) => (
                          <option
                            key={index}
                            value={index + 1 < 10 ? `0${index + 1}` : index + 1}
                          >
                            {month.toUpperCase()}
                          </option>
                        ))}
                      </select>
                      <select
                        value={endyear}
                        onChange={(e) => setEndyear(e.target.value)}
                        name="endyear"
                        className="ml-2 h-[30px] w-[60px] flex justify-center items-center rounded-lg pl-1 bg-[#191414] text-white focus:outline-none
                        focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                      >
                        <option>YEAR</option>
                        {Array.from({ length: 15 }, (_, index) => (
                          <option key={index} value={2024 + index}>
                            {2024 + index}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center outline outline-[#8A8A8A] outline-2 px-2 py-1 rounded-md">
                      <IconCom icon="clock" size="16" />
                      <select
                        value={endhour}
                        onChange={(e) => setEndhour(e.target.value)}
                        name="endhour"
                        className="ml-1 h-[30px] w-[50px] flex justify-center items-center rounded-lg pl-1 bg-[#191414] text-white focus:outline-none
                        focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                      >
                        <option>HH</option>
                        {Array.from({ length: 24 }, (_, index) => (
                          <option
                            key={index}
                            value={index < 10 ? `0${index}` : index}
                          >
                            {index}
                          </option>
                        ))}
                      </select>
                      <p className="text-[16px] font-semibold mx-1">:</p>
                      <select
                        value={endminute}
                        onChange={(e) => setEndminute(e.target.value)}
                        name="endminute"
                        className="h-[30px] w-[55px] flex justify-center items-center rounded-lg pl-1 bg-[#191414] text-white focus:outline-none
                        focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
                      >
                        <option>MM</option>
                        {Array.from({ length: 60 }, (_, index) => (
                          <option
                            key={index}
                            value={index < 10 ? `0${index}` : index}
                          >
                            {index < 10 ? `0${index}` : index}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="h-[40px] w-full rounded-lg mt-[40px] bg-[#1DB954] text-center font-semibold text-white hover:bg-[#1CAA4E]"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditEvent;
