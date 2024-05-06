import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import IconCom from "../components/IconCom";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

function EditUser() {
  const { id } = useParams();

  const [initialUsername, setInitialUsername] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/get/" + id);
        console.log(response)
        setInitialUsername(response.data.username);
        setUsername(response.data.username);
        setEmail(response.data.email);
        setRole(response.data.role);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);


  const handleUpdate = (e) => {
    e.preventDefault();

    const updateData = {
      username,
      email,
      role,
    };

    if (password.trim() !== "") {
      updateData.password = password; // Include password only if it's not empty
    }

    axios
      .put("http://localhost:3002/update/" + id, updateData)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-[#191414] w-full h-full min-h-dvh font-poppins">
      <Nav />
      <div className="w-full min-h-[60px] bg-[#242424] mt-[60px] fixed top-0 z-10">
        <div className="max-w-[1250px] mx-auto h-full bg-[#242424] px-4 sm:px-6 lg:px-8">
          <div className="h-[60px] flex items-center justify-center sm:justify-start  text-white font-semibold">
            <Link to='/manageuser' className="transition-all duration-500 px-3 py-2 mr-[20px] rounded-lg bg-black text-[17px] sm:text-[18px] md:text-[20px]">
              Manage Users
            </Link>
            <Link to='/manageevent' className="transition-all duration-500 px-3 py-2 hover:bg-[#191919] rounded-lg text-[16px] sm:text-[18px] md:text-[20px]">
              Manage Events
            </Link>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleUpdate}
        className="mt-[120px] px-2 sm:px-4 lg:px-6 max-w-[1250px] mx-auto h-full flex justify-center"
      >
        <div className="mt-[30px] h-[540px] w-[420px] flex flex-col items-center">
          <div className="h-[70px] w-full flex flex-row items-center">
            <Link
              to={"/manageuser"}
              className="flex px-3 py-2 rounded-lg items-center border-2 border-solid border-[#8A8A8A] text-white hover:bg-[#242424] transition-all duration-300"
            >
              <IconCom icon="left" size="18" />
              <p className="ml-[2px] text-[14px]">Back</p>
            </Link>
            <div className="ml-[15px] flex flex-col justify-evenly h-full">
              <p className="text-[#1DB954] font-medium text-[16px]">
                {id}-{initialUsername}
              </p>
              <p className="text-white font-semibold text-[20px]">Edit User</p>
            </div>
          </div>
          <div className="mt-[10px] rounded-md bg-[#242424] w-full h-[460px] p-[20px] text-[14px]">
            <p className="text-white font-medium text-[14px]">Username</p>
            <input
              type="text"
              className="h-[40px] w-full rounded-md my-[10px] pl-2 focus:outline-none bg-[#191414] text-white
              focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className="mt-[10px] text-white font-medium text-[14px]">
              Email
            </p>
            <input
              type="text"
              className="h-[40px] w-full rounded-md my-[10px] pl-2 focus:outline-none bg-[#191414] text-white
              focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="mt-[10px] text-white font-medium text-[14px]">Role</p>
            <select
              className="h-[40px] w-full rounded-md my-[10px] px-2 focus:outline-none bg-[#191414] text-white
              focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <p className="mt-[10px] text-white font-medium text-[14px]">
              Change Password
            </p>
            <input
              type="password"
              className="h-[40px] w-full rounded-md my-[10px] pl-2 focus:outline-none bg-[#191414] text-white
              focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954]"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
            type="submit"
            className="mt-[20px] h-[40px] w-full rounded-md bg-[#1DB954] font-medium text-white text-[16px] transition-all duration-300 hover:bg-[#1CAA4E]">
              Save
            </button>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default EditUser;
