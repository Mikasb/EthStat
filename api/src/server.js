import dotenv from "dotenv";
dotenv.config({ path: path.resolve("../.env") });
import path from "path";
import express from "express";
import ethPrice from "./etherscan/ethPrice.js";
import cors from "cors";

const app = express();

app.use(cors());
// Get current ETH price
ethPrice();

app.get("/api", (req, res) => {
  res.json({ greeting: "hello" });
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
