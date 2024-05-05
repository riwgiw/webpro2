const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const multer = require("multer");

const UserModel = require("./User");
const EventModel = require("./Event");

const app = express();
const port = 3002;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

//Mongo Connect Start

const mongoUrl = "mongodb+srv://admin:1234@lastimage.tfnifwt.mongodb.net/musicdb";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.log(err));

//Mongo Connect End

//Image

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../Frontend/public/images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

//Image End


//API

app.put("/update-event/:id", upload.fields([{ name: 'eventimage', maxCount: 1 }, { name: 'artistimage', maxCount: 1 }]), async (req, res) => {
  const id = req.params.id;

  const startsum = `${req.body.startyear}-${req.body.startmonth}-${req.body.startday}T${req.body.starthour}:${req.body.startminute}:00`;
  const endsum = `${req.body.endyear}-${req.body.endmonth}-${req.body.endday}T${req.body.endhour}:${req.body.endminute}:00`;
  try {
    let updateData = {
      eventname: req.body.eventname,
      eventdetail: req.body.eventdetail,
      eventtype: req.body.eventtype,
      artistname: req.body.artistname,
      artistspotify: req.body.artistspotify,
      locationname: req.body.locationname,
      locationprovice: req.body.locationprovice,
      locationcountry: req.body.locationcountry,
      locationembed: req.body.locationembed,
      locationgooglemap: req.body.locationgooglemap,
      startday: req.body.startday,
      startmonth: req.body.startmonth,
      startyear: req.body.startyear,
      starthour: req.body.starthour,
      startminute: req.body.startminute,
      startsum: startsum,
      endday: req.body.endday,
      endmonth: req.body.endmonth,
      endyear: req.body.endyear,
      endhour: req.body.endhour,
      endminute: req.body.endminute,
      endsum: endsum,
    };

    // Check if eventimage exists before accessing it
    if (req.files['eventimage']) {
      updateData.eventimage = req.files['eventimage'][0].filename;
    }

    // Check if artistimage exists before accessing it
    if (req.files['artistimage']) {
      updateData.artistimage = req.files['artistimage'][0].filename;
    }

    const updatedEvent = await EventModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Error updating event" });
  }
});

app.get("/get-calendar/:artistname", async (req, res) => {
  try {
    const events = await EventModel.find({ artistname: req.params.artistname }).lean();

    const formattedEvents = events.map((event) => ({
      ...event,
      formattedCreatedAt: new Date(event.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Bangkok",
      }),
    }));

    console.log(events)
    if (!events) {
      return res.status(404).json({ error: "Events not found" });
    }
    res.json(formattedEvents);
  } catch (error) {
    console.error("Error fetching event by artistname:", error);
    res.status(500).json({ error: "Error fetching event by artistname" });
  }
});

app.get("/get-event/:id", async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id).lean();
    console.log(event)
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    res.status(500).json({ error: "Error fetching event by ID" });
  }
});

app.post("/createevent", upload.fields([{ name: 'eventimage', maxCount: 1 }, { name: 'artistimage', maxCount: 1 }]), async (req, res) => {
  try {
    const startsum = `${req.body.startyear}-${req.body.startmonth}-${req.body.startday}T${req.body.starthour}:${req.body.startminute}:00`;
    const endsum = `${req.body.endyear}-${req.body.endmonth}-${req.body.endday}T${req.body.endhour}:${req.body.endminute}:00`;

    const newEvent = new EventModel({
      eventname: req.body.eventname,
      eventdetail: req.body.eventdetail,
      eventtype: req.body.eventtype,
      artistname: req.body.artistname,
      artistspotify: req.body.artistspotify,
      locationname: req.body.locationname,
      locationprovice: req.body.locationprovice,
      locationcountry: req.body.locationcountry,
      locationembed: req.body.locationembed,
      locationgooglemap: req.body.locationgooglemap,
      startday: req.body.startday,
      startmonth: req.body.startmonth,
      startyear: req.body.startyear,
      starthour: req.body.starthour,
      startminute: req.body.startminute,
      startsum: startsum,
      endday: req.body.endday,
      endmonth: req.body.endmonth,
      endyear: req.body.endyear,
      endhour: req.body.endhour,
      endminute: req.body.endminute,
      endsum: endsum,
      eventimage: req.files['eventimage'][0].filename,
      artistimage: req.files['artistimage'][0].filename,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error("Error creating event", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/get-event", async (req, res) => {
  try {
    const events = await EventModel.find().lean();
    const formattedEvents = events.map((event) => ({
      ...event,
      formattedCreatedAt: new Date(event.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Bangkok",
      }),
    }));
    if (req.session.username) {
      return res.json({
        valid: true,
        username: req.session.username,
        role: req.session.role,
        events: formattedEvents,
      });
    } else {
      return res.json({ valid: false, events: formattedEvents });
    }
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Error fetching users" });
  }
});


app.delete("/deleteevent/:id", (req, res) => {
  const id = req.params.id;
  EventModel.findByIdAndDelete({ _id: id })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});


app.get("/", async (req, res) => {
  try {
    const users = await UserModel.find().lean();
    const formattedUsers = users.map((user) => ({
      ...user,
      formattedCreatedAt: new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Bangkok",
      }),
    }));
    if (req.session.username) {
      return res.json({
        valid: true,
        username: req.session.username,
        role: req.session.role,
        users: formattedUsers,
      });
    } else {
      return res.json({ valid: false, users: formattedUsers });
    }
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Error fetching users" });
  }
});

app.get("/get/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).lean();
    console.log(user)
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "Error fetching user by ID" });
  }
});

app.post("/signup", async (req, res) => {
  try {
    // Check if username or email already exists
    const existingUser = await UserModel.findOne({
      $or: [
        { username: req.body.username },
        { email: req.body.email }
      ]
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new UserModel({
      username: req.body.username,
      email: req.body.email,
      role: "user",
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error in user signup:", error);
    res.status(500).json({ error: "Error in user signup" });
  }
});

app.post("/login", async (req, res) => {
  try {
    console.log("Login request received with username:", req.body.username);
    

    const user = await UserModel.findOne({
      username: req.body.username,
    });

    console.log("User found in database:", user);

    if (user) {
      const match = await bcrypt.compare(req.body.password, user.password); // Compare hashed password

      if (match) {
        req.session.username = user.username;
        req.session.role = user.role;
        console.log("Login successful. User:", user.username);
        console.log("Role User:", user.role);
        return res.json({ Login: true });
      } else {
        console.log("Incorrect password provided for user:", user.username);
        return res.json({ Login: false });
      }
    } else {
      console.log("User not found in database.");
      return res.json({ Login: false });
    }
  } catch (error) {
    console.error("Error in user login:", error);
    res.status(500).json({ error: "Error in user login" });
  }
});

app.post("/logout", (req, res) => {
  try {
    if (req.session.username) {
      req.session.destroy(); // Destroy the session
      res.clearCookie("connect.sid"); // Clear session cookie
      res.status(200).json({ message: "Logout successful" });
    } else {
      res.status(400).json({ message: "No active session found" });
    }
  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({ error: "Error in logout" });
  }
});

app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let updateData = {
      username: req.body.username,
      email: req.body.email,
      role: req.body.role,
    };

    // Check if password needs to be updated and hash it
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      updateData.password = hashedPassword;
    }

    // Update the user
    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" });
  }
});

app.delete("/deleteuser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});



app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
