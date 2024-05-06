import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import IconCom from "../components/IconCom";

import axios from "axios";

import { Link, useParams, useNavigate } from "react-router-dom";

function AdminEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const eventPerPage = 10;
  const totalPages = Math.ceil(data.length / eventPerPage);
  const indexOfLastEvent = currentPage * eventPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventPerPage;
  const currentEvents = Array.isArray(data)
    ? data.slice(indexOfFirstEvent, indexOfLastEvent)
    : [];

  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3002/get-event")
      .then((res) => {
        // Log the response data
        console.log(res.data.events)
        setData(res.data.events);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const togglePopup = (event) => {
    setShowPopup(!showPopup);
    setSelectedEvent(event);

    // Toggle body scrolling
    document.body.style.overflow = showPopup ? "auto" : "hidden";
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleEdit = () => {
    togglePopup();
  };

  const handleDelete = (id) => {
    togglePopup();
    const confirmed = window.confirm("Are you sure to delete this event?");
    if (confirmed) {
      axios
        .delete("http://localhost:3002/deleteevent/" + id)
        .then((res) => {
          // setData(prevData => prevData.filter(event => event.id !== id));
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="bg-[#191414] w-full h-full min-h-dvh font-poppins">
      <Nav />
      <div className="w-full min-h-[60px] bg-[#242424] mt-[60px] fixed top-0">
        <div className="max-w-[1250px] mx-auto h-full bg-[#242424] px-4 sm:px-6 lg:px-8">
          <div className="h-[60px] flex items-center justify-center sm:justify-start  text-white font-semibold">
            <Link to='/manageuser' className="transition-all duration-500 px-3 py-2 hover:bg-[#191919] rounded-lg text-[16px] sm:text-[18px] md:text-[20px]">
              Manage Users
            </Link>
            <button className="transition-all duration-500 px-3 py-2 ml-[20px] rounded-lg bg-black text-[17px] sm:text-[18px] md:text-[20px]">
              Manage Events
            </button>
          </div>
        </div>
      </div>
      <div className="mt-[120px] px-2 sm:px-4 lg:px-6 max-w-[1250px] mx-auto h-full">
        <div className="hidden sm:block my-[30px]">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-[#1DB954] text-[35px] md:text-[40px]">
              Manage Events
            </p>
            <Link
              to="/createevent"
              className="min-h-[40px] max-h-[40px] h-full px-2 bg-[#1DB954] flex justify-center items-center rounded-md text-white font-semibold transition-all duration-300 hover:bg-[#1CAA4E]"
            >
              + Create Events
            </Link>
          </div>
        </div>
        <div className="block sm:hidden my-[30px]">
          <div className="flex flex-col">
            <p className="font-semibold text-[#1DB954] text-[35px] md:text-[40px] mb-[20px]">
              Manage Events
            </p>
            <Link to='/createevent' className="min-h-[40px] max-h-[40px] h-full min-w-[150px] max-w-[150px] w-full bg-[#1DB954] flex justify-center items-center rounded-md text-white font-semibold">
              + Create Events
            </Link>
          </div>
        </div>
        <div className="min-h-[840px] max-h-[840px] min-w-[382px] max-w-[1210px] h-full w-full rounded-md flex flex-col">
          <div className="block md:hidden">
            <div className="w-full min-h-[70px] max-h-[70px] h-full flex flex-row items-center px-4 text-white justify-between bg-[#242424] rounded-t-md">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="transition-all duration-300 min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full flex justify-center items-center rounded-lg bg-[#1DB954] text-[16px] hover:bg-[#191919]"
              >
                <IconCom icon="left" size="22" />
              </button>
              <p className="text-[#8A8A8A] text-[16px] font-medium">
                Page {currentPage} of {totalPages}
              </p>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="transition-all duration-300 min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full flex justify-center items-center rounded-lg bg-[#1DB954] text-[16px] hover:bg-[#191919]"
              >
                <IconCom icon="right" size="22" />
              </button>
            </div>
          </div>
          <table className="table text-[#8A8A8A] text-[16px] min-h-[70px] max-h-[70px] h-full w-full items-center bg-[#242424] md:rounded-t-md">
            <thead className="table-header-group">
              <tr className="md:table-row hidden">
                <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                  Name Event
                </th>
                <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                  Artist
                </th>
                <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                  Type
                </th>
                <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                  Created At
                </th>
                <th className="h-[70px] table-cell text-left align-middle px-4"></th>
              </tr>
            </thead>
            <tbody className="table-row-group">
              {currentEvents.map((event, index) => (
                <React.Fragment key={index}>
                  <tr className="text-white border-y border-solid border-[#191414] hidden md:table-row hover:bg-[#2B2B2B] transition-all duration-300">
                    <td className="max-w-[90px] sm:max-w-[130px] md:max-w-[200px] h-[70px] table-cell text-left align-middle px-4">
                      <div className="flex items-center">
                        <div className="min-h-[45px] min-w-[45px] max-h-[45px] max-w-[45px] w-full h-full bg-[#1DB954] rounded-lg flex justify-center items-center mr-[8px]">
                          <img
                            key={index}
                            src={"./images/" + event.eventimage}
                            alt="Event"
                            className="object-cover h-full w-full rounded-md"
                          />
                        </div>
                        <p className="truncate overflow-hidden whitespace-nowrap">
                          {event.eventname}
                        </p>
                      </div>
                    </td>
                    <td className="h-[70px] table-cell text-left align-middle px-4">
                      {event.artistname}
                    </td>
                    <td className="h-[70px] table-cell text-left align-middle px-4 text-[13px] font-semibold">
                      {(() => {
                        switch (event.eventtype) {
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
                                <p>{event.eventtype}</p>
                              </div>
                            );
                        }
                      })()}
                    </td>
                    <td className="h-[70px] table-cell text-left align-middle px-4">
                      {event.formattedCreatedAt}
                    </td>
                    <td className="h-[70px] table-cell text-left align-middle px-4">
                      <div className="flex justify-end">
                        <Link to={`/editevent/${event._id}`} 
                        className="min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full bg-[#1DB954] rounded-lg flex justify-center items-center transition-all duration-300 hover:bg-[#1CAA4E]">
                          <IconCom icon="edit" />
                        </Link>
                        <button 
                        onClick={() => handleDelete(event._id)}
                        className="ml-4 min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full bg-[#942423] rounded-lg flex justify-center items-center transition-all duration-300 hover:bg-[#7D1D1C]">
                          <IconCom icon="trash" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr
                    key={index}
                    className="table-row md:hidden border-y border-solid border-[#191414] hover:bg-[#2B2B2B]"
                  >
                    <td className="h-[70px] table-cell text-left align-middle px-4">
                      <div className="flex">
                        <div className="min-h-[45px] min-w-[45px] max-h-[45px] max-w-[45px] w-full h-full bg-[#1DB954] rounded-lg flex justify-center items-center mr-[8px]">
                          <img
                            key={index}
                            src={"./images/" + event.eventimage}
                            alt="Event"
                            className="object-cover h-full w-full rounded-md"
                          />
                        </div>
                        <div className="flex flex-col max-w-[120px] ">
                          <p className="text-white truncate overflow-hidden whitespace-nowrap">
                            {event.eventname}
                          </p>
                          <p className="font-light">{event.artistname}</p>
                        </div>
                      </div>
                    </td>
                    <td className="h-[70px] table-cell text-left align-middle px-4 text-[13px] font-semibold">
                      <div className="flex items-center text-white justify-end">
                        {(() => {
                          switch (event.eventtype) {
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
                                  <p>{event.eventtype}</p>
                                </div>
                              );
                          }
                        })()}
                        <button
                          onClick={() => togglePopup(event)}
                          className="ml-4 min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full bg-[#1DB954] rounded-lg flex justify-center items-center transition-all duration-300 hover:bg-[#1CAA4E]"
                        >
                          <IconCom icon="point" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          {/* Bottom content */}
          <div className="w-full min-h-[70px] min-w-[382px] max-h-[70px] h-full flex flex-row items-center px-4 text-white justify-between bg-[#242424] rounded-b-md">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="transition-all duration-300 min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full flex justify-center items-center rounded-lg bg-[#1DB954] text-[16px] hover:bg-[#191919]"
            >
              <IconCom icon="left" size="22" />
            </button>
            <p className="text-[#8A8A8A] text-[16px] font-medium">
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="transition-all duration-300 min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full flex justify-center items-center rounded-lg bg-[#1DB954] text-[16px] hover:bg-[#191919]"
            >
              <IconCom icon="right" size="22" />
            </button>
          </div>
        </div>
      </div>
      {showPopup && (
        <>
          {/* Backdrop */}
          <div
            className="fixed top-0 left-0 w-full h-full bg-opacity-50 backdrop-filter backdrop-blur z-10"
            onClick={togglePopup}
          ></div>
          {/* Popup Content */}
          <div className="fixed z-20 bottom-0 inset-x-0 flex items-center justify-center mb-5">
            <div className="px-5 py-3 w-full h-full max-w-[420px] max-h-[170px] bg-[#191919] rounded-md shadow-lg text-white">
              <div className="flex justify-between py-2">
                <p className="font-semibold text-[20px]">Select</p>
                <button
                  onClick={togglePopup}
                  className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-[#242424] hover:bg-[#942423]"
                >
                  <IconCom icon="x" />
                </button>
              </div>
              <Link
                to={selectedEvent ? `/editevent/${selectedEvent._id}` : '#'}
                onClick={handleEdit}
                className="transition-all duration-300 mb-2 w-full flex items-center px-4 py-3 text-sm text-left rounded-md hover:bg-[#242424]"
              >
                <IconCom icon="edit" />
                <p className="ml-[10px] text-[16px] font-medium">Edit</p>
              </Link>
              <button
                onClick={() => selectedEvent && handleDelete(selectedEvent._id)}
                className="transition-all duration-300 flex w-full items-center px-4 py-3 text-sm text-left bg-[#581615] rounded-md hover:bg-[#942423]"
              >
                <IconCom icon="trash" />
                <p className="ml-[10px] text-[16px] font-medium">Delete</p>
              </button>
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

export default AdminEvent;
