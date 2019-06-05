const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/api", (req, res) => {
  res.status(200).json({ message: "I am a server!" });
});

module.exports = server;
