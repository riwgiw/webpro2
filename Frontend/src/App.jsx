import { BrowserRouter, Routes, Route , Link } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import Signup from "./page/Signup";
import AdminUser from "./page/AdminUser";
import AdminEvent from "./page/AdminEvent";
import EditUser from "./page/EditUser";
import CreateEvent from "./page/CreateEvent";
import EditEvent from "./page/EditEvent";
import Eventpage from "./page/Eventpage";
import Calendar from "./page/Calendar";

import { useState, useEffect } from "react";

import axios from "axios";

function App() {
  const [userRole, setUserRole] = useState(false);


  useEffect(() => {
    // ส่งคำขอไปยังเซิร์ฟเวอร์เพื่อรับข้อมูลของผู้ใช้ที่เข้าสู่ระบบ

    axios
      .get("http://localhost:3002")
      .then((res) => {
        if (res.data.valid) {
          setUserRole(res.data.role === "admin");
        } else {
          setUserRole(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/login"
          element={<Login setUserRole={setUserRole} />}
        ></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/event/:id" element={<Eventpage />}></Route>
        <Route path="/calendar/:artistname" element={<Calendar />}></Route>
        {userRole ? (
          <> 
            <Route path="/manageuser" element={<AdminUser />}></Route>
            <Route path="/manageevent" element={<AdminEvent />}></Route>
            <Route path="/edituser/:id" element={<EditUser />}></Route>
            <Route path="/createevent" element={<CreateEvent />}></Route>
            {/* ตรวจสอบ userRole ก่อนแสดง route นี้ */}
            <Route path="/editevent/:id" element={<EditEvent />}></Route>
          </>
        ) : (
          <>
            <Route path="/manageuser" element={<Home />}></Route>
            <Route path="/manageevent" element={<Home />}></Route>
            <Route path="/edituser/:id" element={<Home />}></Route>
            <Route path="/createevent" element={<Home />}></Route>
            <Route path="/editevent/:id" element={<Home />}></Route>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
