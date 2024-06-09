import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import IconCom from "../components/IconCom";

import axios from "axios";

import { Link, useParams, useNavigate } from "react-router-dom";

function AdminUser() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const totalPages = Math.ceil(data.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = Array.isArray(data)
    ? data.slice(indexOfFirstUser, indexOfLastUser)
    : [];

  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  
  useEffect(() => {
    axios
      .get("http://localhost:3002/")
      .then((res) => {
        // Log the response data
        setData(res.data.users);
      })
      .catch((err) => console.log(err));
  }, []);

  const togglePopup = (user) => {
    setShowPopup(!showPopup);
    setSelectedUser(user);

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

  const ConfirmDelete = () => {
    confirm("Are you sure to delete this user")
  }

  const handleDelete = (id) => {
    ConfirmDelete()
    togglePopup();
    axios
      .delete("http://localhost:3002/deleteuser/" + id)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };


  return (
    <div className="bg-[#191414] w-full h-full min-h-dvh font-kanit">
      <Nav className='z-20' />
      <div className="mt-[60px] w-full min-h-[60px] bg-[#242424] fixed top-0 z-10">
        <div className="max-w-[1250px] mx-auto h-full bg-[#242424] px-4 sm:px-6 lg:px-8">
          <div className="h-[60px] flex items-center justify-center sm:justify-start  text-white font-medium">
            <button className="transition-all duration-500 px-3 py-2 mr-[20px] rounded-lg bg-black text-[17px] sm:text-[18px] md:text-[20px]">
              Manage Users
            </button>
            <Link to='/manageevent' className="transition-all duration-500 px-3 py-2 hover:bg-[#191919] rounded-lg text-[16px] sm:text-[18px] md:text-[20px]">
              Manage Events
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-[120px] px-2 sm:px-4 lg:px-6 max-w-[1250px] mx-auto h-full">
        <p className="font-medium text-[#1DB954] text-[35px] md:text-[40px] my-[30px]">
          Manage Users
        </p>
        <div className="min-h-[840px] max-h-[840px] min-w-[382px] max-w-[1210px] h-full w-full rounded-md flex flex-col">
          <div className="block md:hidden">
            <div className="w-full min-h-[70px] max-h-[70px] h-full flex flex-row items-center px-4 text-white justify-between bg-[#242424] rounded-t-md">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full flex justify-center items-center rounded-lg bg-[#1DB954] text-[16px] hover:bg-[#191919] transition-all duration-300"
              >
                <IconCom icon="left" size="22" />
              </button>
              <p className="text-[#8A8A8A] text-[16px] font-medium">
                Page {currentPage} of {totalPages}
              </p>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full flex justify-center items-center rounded-lg bg-[#1DB954] text-[16px] hover:bg-[#191919] transition-all duration-300"
              >
                <IconCom icon="right" size="22" />
              </button>
            </div>
          </div>
          {data.length > 0 && (
            <table className="table text-[#8A8A8A] text-[16px] min-h-[70px] max-h-[70px] h-full w-full items-center bg-[#242424] md:rounded-t-md">
              <thead className="table-header-group">
                <tr className="md:table-row hidden">
                  <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                    Name
                  </th>
                  <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                    Email
                  </th>
                  <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                    Role
                  </th>
                  <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                    Created At
                  </th>
                  <th className="h-[70px] table-cell text-left align-middle px-4"></th>
                </tr>
              </thead>
              <tbody className="table-row-group">
                {currentUsers.map((user, index) => (
                  <React.Fragment key={index}>
                    <tr className="text-white border-y border-solid border-[#191414] hidden md:table-row hover:bg-[#2B2B2B] transition-all duration-300">
                      <td className="h-[70px] table-cell text-left align-middle px-4">
                        {user.username}
                      </td>
                      <td className="h-[70px] table-cell text-left align-middle px-4">
                        {user.email}
                      </td>
                      <td className="h-[70px] table-cell text-left align-middle px-4 text-[13px] font-medium">
                        {user.role === "admin" ? (
                          <div className="px-2 py-0 rounded-2xl bg-[#172554] flex items-center justify-center border border-solid border-[#8A8A8A]">
                            <p>ADMIN</p>
                          </div>
                        ) : (
                          <div className="px-2 py-0 rounded-2xl bg-[#052E16] flex items-center justify-center border border-solid border-[#8A8A8A]">
                            <p>USER</p>
                          </div>
                        )}
                      </td>
                      <td className="h-[70px] table-cell text-left align-middle px-4">
                        {user.formattedCreatedAt}
                      </td>
                      <td className="h-[70px] table-cell text-left align-middle px-4">
                        <div className="flex justify-end">
                          <Link
                            to={`/edituser/${user._id}`}
                            className="transition-all duration-300 hover:bg-[#1CAA4E] min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full bg-[#1DB954] rounded-lg flex justify-center items-center"
                          >
                            <IconCom icon="edit" />
                          </Link>
                          <button 
                            onClick={() => handleDelete(user._id)}
                            className="transition-all duration-300 hover:bg-[#7D1D1C] ml-4 min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full bg-[#942423] rounded-lg flex justify-center items-center">
                            <IconCom icon="trash" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr
                      key={index}
                      className="table-row md:hidden border-y border-solid border-[#191414] hover:bg-[#2B2B2B] transition-all duration-300"
                    >
                      <td className="h-[70px] table-cell text-left align-middle px-4">
                        <div className="flex flex-col">
                          <p className="text-white">{user.username}</p>
                          <p className="font-extralight">{user.email}</p>
                        </div>
                      </td>
                      <td className="h-[70px] table-cell text-left align-middle px-4 text-[13px] font-medium">
                        <div className="flex items-center text-white justify-end">
                          {user.role === "admin" ? (
                            <div className="px-2 py-0 rounded-2xl bg-[#172554] flex items-center justify-center border border-solid border-[#8A8A8A]">
                              <p>ADMIN</p>
                            </div>
                          ) : (
                            <div className="px-2 py-0 rounded-2xl bg-[#052E16] flex items-center justify-center border border-solid border-[#8A8A8A]">
                              <p>USER</p>
                            </div>
                          )}
                          <button
                            onClick={() => togglePopup(user)}
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
          )}
          {/* Bottom content */}
          <div className="w-full min-h-[70px] min-w-[382px] max-h-[70px] h-full flex flex-row items-center px-4 text-white justify-between bg-[#242424] rounded-b-md">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full flex justify-center items-center rounded-lg bg-[#1DB954] text-[16px] hover:bg-[#191919] transition-all duration-300"
            >
              <IconCom icon="left" size="22" />
            </button>
            <p className="text-[#8A8A8A] text-[16px] font-medium">
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full flex justify-center items-center rounded-lg bg-[#1DB954] text-[16px] hover:bg-[#191919] transition-all duration-300"
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
                <p className="font-medium text-[20px]">Select</p>
                <button
                  onClick={togglePopup}
                  className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-[#242424] hover:bg-[#942423]"
                >
                  <IconCom icon="x" />
                </button>
              </div>
              <Link
                to={`/edituser/${selectedUser._id}`}
                onClick={handleEdit}
                className="mb-2 w-full flex items-center px-4 py-3 text-sm text-left rounded-md hover:bg-[#242424] transition-all duration-300"
              >
                <IconCom icon="edit" />
                <p className="ml-[10px] text-[16px] font-medium">Edit</p>
              </Link>
              <button
                onClick={() => handleDelete(selectedUser._id)}
                className="flex w-full items-center px-4 py-3 text-sm text-left bg-[#581615] rounded-md hover:bg-[#942423] transition-all duration-300"
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

export default AdminUser;
