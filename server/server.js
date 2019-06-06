const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const db = require("./database/dbHelpers");

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/api", (req, res) => {
  res.status(200).json({ message: "I am a server!" });
});

server.post("/api/register", passHash, async (req, res) => {
  try {
    const data = await db.addUser(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

server.post("/api/login", authZ, async (req, res) => {
  try {
    res.status(200).json({ id: req.id, message: "Logged in" });
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

// Middleware created to hash incoming passwords and set usernames to lowercase in the database

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

async function authZ(req, res, next) {
  try {
    const body = req.body;
    const user = await db.find(body.username);
    if (!user) {
      res.status(400).json({ message: "Enter a valid username and password" });
    }
    if (user && bcrypt.compareSync(body.password, user.password)) {
      req.id = user.id;
      console.log(user.id);
      next();
    } else {
      res.status(401).json({ message: "Invalid Credentials! Try again." });
    }
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
}

module.exports = server;
