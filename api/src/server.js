import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config({ path: path.resolve("../.env") });
import path from "path";
import calculate from "./calculations/metrics.js";
import express from "express";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/api", (req, res) => {
  // TODO: replace with better way to check if address is in valid form
  if (req.body.address != undefined && req.body.address.length != 42) {
    res.status(400).json({ message: "Invalid address" });
  } else {
    calculate(req.body.address).then((data) => res.status(200).json(data));
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
