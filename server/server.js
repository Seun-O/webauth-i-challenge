const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const db = require("./database/dbHelpers");
const server = express();

const sessionConfig = {
  name: "APPPI", //Session ID,
  secret: "keep it safe, keep it secret",
  cookie: {
    maxAge: 1000 * 30,
    secure: false, // true in prod,
    httpOnly: true // can't be accessed by JS
  },
  resave: false,
  saveUninitialized: false // Laws preventing the automatic saving of cookies
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.get("/api", (req, res) => {
  res.status(200).json({ message: "I am a server!" });
});

/*
  Method: Post
  Route: api/register
  Middleware: hashes the password the user enters and stores it in the database
  Returns: the created information.
*/

server.post("/api/register", passHash, async (req, res) => {
  try {
    const data = await db.addUser(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

/*
  Method: Post
  Route: api/login
  Middleware: Compares entered password with hashed password in the database, and authorizes user if they match
  Creates a session for the user and sends it as a cookie which is saved for 30 seconds
*/
server.post("/api/login", authZ, async (req, res) => {
  try {
    res.status(200).json({ id: req.id, message: "Logged in" });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

/*
  Method: Get
  Route: api/users
  Middleware: protects route to check if a user is logged in.
  Returns: list of users in the database
*/

server.get("/api/users", protected, async (req, res) => {
  try {
    const data = await db.getUsers();
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

//Middleware created to hash incoming passwords and set usernames to lowercase in the database
//Middleware to hash a password and creates requirement for password length
function passHash(req, res, next) {
  try {
    const user = req.body;
    if (user.password.length < 8) {
      res.status(400).json({
        message:
          "Password length too short.Password must be 8 characters or more"
      });
    }
    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;
    user.username = user.username.toLowerCase();
    next();
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
}

// Middleware to authenticate a user when they login. Creates a session based on the user that was returned from the database
async function authZ(req, res, next) {
  try {
    const body = req.body;
    const user = await db.find(body.username);
    if (!user) {
      res.status(400).json({ message: "Enter a valid username and password" });
    }
    if (user && bcrypt.compareSync(body.password, user.password)) {
      req.id = user.id;
      req.session.user = user;
      next();
    } else {
      res.status(401).json({ message: "Invalid Credentials! Try again." });
    }
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
}

// Middleware to restrict endpoint -- Checks to see if there is a session and a sessions user
function protected(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "Please login!" });
  }
}

module.exports = server;
