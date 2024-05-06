import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

function Signup() {
  const [values, setValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (event) => {
    setValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3002")
      .then((res) => {
        if (res.data.valid) {
          navigate("/");
        } else {
          navigate("/signup");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/signup', values);
      console.log(response);
      navigate('/login');
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      }
    }
  };

  return (
    <div className="bg-[#191414] w-full h-full min-h-dvh font-poppins">
      <Nav />
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-[1250px] bg-[#191414] mt-[60px] pt-[40px]"
      >
        <div className="mx-auto rounded-md bg-[#242424] min-h-[420px] pb-3 h-full w-[420px] flex flex-col items-center">
          <p className="text-[#1DB954] font-bold text-[35px] mt-[45px]">
            Sign up
          </p>
          <input
            type="text"
            className="h-[40px] w-[340px] rounded-md mt-[40px] pl-2 focus:outline-none bg-[#191414] 
            focus:ring-0 focus:ring-[#191414] focus:ring-offset-2 focus:ring-offset-[#1DB954] text-white"
            placeholder="Create username"
            onChange={handleInput}
            name="username"
          />
          <input
            type="text"
            className="h-[40px] w-[340px] rounded-md mt-[20px] pl-2 focus:outline-none bg-[#191414] 
            focus:ring-0 focus:ring-offset-2 focus:ring-offset-[#1DB954] text-white"
            placeholder="Your email"
            onChange={handleInput}
            name="email"
          />
          <input
            type="password"
            className="h-[40px] w-[340px] rounded-md mt-[20px] pl-2 focus:outline-none bg-[#191414] 
            focus:ring-0 focus:ring-offset-2 focus:ring-offset-[#1DB954] text-white"
            placeholder="Create password"
            onChange={handleInput}
            name="password"
          />
          {errorMessage && (
            <p className="text-red-500 mt-1">{errorMessage}</p>
          )}
          <button className="h-[40px] w-[340px] rounded-3xl mt-[40px] bg-[#1DB954] text-center font-semibold text-white">
            Sign up
          </button>
          <a
            href="/login"
            className="text-white font-medium text-[12px] mt-[5px] hover:text-[#1DB954]"
          >
            <p>Already have account? Log in.</p>
          </a>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default Signup;
