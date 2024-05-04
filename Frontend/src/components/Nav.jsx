import React, { useState, useEffect } from "react";
import IconCom from "./IconCom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

function Nav() {
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [open, setOpen] = useState(false);

  const [results, setResults] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3002")
      .then((res) => {
        if (res.data.valid) {
          setName(res.data.username);
          setIsLoggedIn(true);
          setIsAdmin(res.data.role === "admin");
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);

    // Toggle body scrolling
    // document.body.style.overflow = showPopup ? "auto" : "hidden";
  };

  const handleLogout = () => {
    axios
      .post("http://localhost:3002/logout", {}, { withCredentials: true }) // Include withCredentials option
      .then(() => {
        setName("");
        setIsLoggedIn(false);
        setIsAdmin(false);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const hundleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className={`w-full min-h-[60px] bg-[#1DB954] font-poppins text-white top-0 z-50 ${open ? 'sticky mb-[-60px] !important' : 'fixed'}`}>
      <div className="max-w-[1250px] mx-auto h-full bg-[#1DB954] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px]">
          <div className="flex items-center">
            <a href="/">
              <IconCom icon="monster" size="50" />
            </a>
          </div>
          {/* nav-link */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {isLoggedIn ? (
                <>
                  {isAdmin ? (
                    <>
                      <a
                        href="/manageuser"
                        className="text-slate-200 hover:bg-[#1CAA4E] 
                    hover:text-white block px-3 py-2 rounded-md text-[20px] font-semibold text-start"
                      >
                        Admin Manager
                      </a>
                    </>
                  ) : null}
                  <button
                    onClick={togglePopup}
                    className="flex items-center px-3 py-2 transition-all duration-500 text-slate-200 hover:bg-[#1CAA4E] hover:text-white rounded-md"
                  >
                    <IconCom icon="search" size="16" />
                    <p className="ml-2 text-[20px] font-semibold">Search</p>
                  </button>
                  <a
                    href="/calendar"
                    className="transition-all duration-500 text-slate-200 hover:bg-[#1CAA4E] hover:text-white px-3 py-2 rounded-md text-[20px] font-semibold"
                  >
                    Calendar
                  </a>
                  <p className="text-slate-200 text-[20px] font-semibold px-3 py-2">
                    {name.toUpperCase()}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="transition-all duration-500 bg-[#942423] text-slate-200 hover:bg-[#7D1D1C] hover:text-white px-3 py-2 rounded-md text-[20px] font-semibold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/"
                    className="transition-all duration-500 text-slate-200 hover:bg-[#1CAA4E] hover:text-white px-3 py-2 rounded-md text-[20px] font-semibold"
                  >
                    Calendar
                  </a>
                  <a
                    href="/signup"
                    className="transition-all duration-500 bg-black text-slate-200 hover:bg-slate-900 hover:text-white px-3 py-2 rounded-md text-[20px] font-semibold"
                  >
                    Sign up
                  </a>
                  <a
                    href="/login"
                    className="transition-all duration-500 text-slate-200 hover:bg-[#1CAA4E] hover:text-white px-3 py-2 rounded-md text-[20px] font-semibold"
                  >
                    Login
                  </a>
                </>
              )}
            </div>
          </div>
          {/* humburger button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={hundleMenu}
              className="inline-flex items-center justify-center p-2 
                        rounded-md text-slate-200 hover:text-white hover:bg-[#1CAA4E] focus:outline-none 
                        focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1DB954] focus:ring-white"
            >
              <span className="sr-only">Open Main Menu</span>
              {open ? (
                <IconCom icon="x" size="25" />
              ) : (
                <IconCom icon="bars" size="25" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* mobile-menu */}
      {open && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isLoggedIn ? (
              <>
                {isAdmin ? (
                  <>
                    <a
                      href="/manageuser"
                      className="text-slate-200 hover:bg-[#1CAA4E] 
                    hover:text-white block px-3 py-2 rounded-md text-[20px] font-semibold text-start"
                    >
                      Admin Manager
                    </a>
                  </>
                ) : null}
                <button 
                onClick={togglePopup}
                className="text-slate-200 hover:bg-[#1CAA4E] 
                hover:text-white flex px-3 py-2 rounded-md text-[20px] font-semibold text-start flex-row w-full items-center">
                  <IconCom icon="search" size='16' />
                  <p className="ml-2">Search</p>
                </button>
                <a
                  href="/"
                  className="text-slate-200 hover:bg-[#1CAA4E] 
                hover:text-white block px-3 py-2 rounded-md text-[20px] font-semibold text-start"
                >
                  Calendar
                </a>
                <p className="text-slate-200 text-[20px] font-semibold block px-3 py-2 text-start">
                  {name.toUpperCase()}
                </p>
                <a
                  onClick={handleLogout}
                  className="text-slate-200 hover:bg-[#7D1D1C] bg-[#942423]
                  hover:text-white block px-3 py-2 rounded-md text-[20px] font-semibold text-start"
                >
                  Logout
                </a>
              </>
            ) : (
              <>
                <a
                  href="/"
                  className="text-slate-200 hover:bg-[#1CAA4E] 
                hover:text-white block px-3 py-2 rounded-md text-[20px] font-semibold text-start"
                >
                  Calendar
                </a>
                <a
                  href="/signup"
                  className="transition-all duration-500 bg-black block text-slate-200 hover:bg-slate-900 hover:text-white px-3 py-2 rounded-md text-[20px] font-semibold text-start"
                >
                  Sign up
                </a>
                <a
                  href="/login"
                  className="transition-all duration-500 block text-slate-200 hover:bg-[#1CAA4E] hover:text-white px-3 py-2 rounded-md text-[20px] font-semibold text-start"
                >
                  Login
                </a>
              </>
            )}
          </div>
        </div>
      )}
      {showPopup && (
        <>
          {/* Backdrop */}
          <div
            onClick={togglePopup}
            className="fixed top-0 left-0 w-full h-full bg-opacity-50 backdrop-filter backdrop-blur z-40"
          ></div>
          {/* Popup Content */}
          <div className="z-50 fixed top-20 inset-x-0 flex items-center justify-center mb-5">
            <div className="px-5 py-3 w-full h-full max-w-[420px] max-h-[170px] bg-[#191919] rounded-md shadow-lg text-white">
              <div className="flex justify-between py-2">
                <p className="font-semibold text-[20px]">Search</p>
                <button
                  onClick={togglePopup}
                  className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-[#242424] hover:bg-[#942423]"
                >
                  <IconCom icon="x" />
                </button>
              </div>
              <SearchBar setResults={setResults} />
              <SearchResults results={results} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Nav;
