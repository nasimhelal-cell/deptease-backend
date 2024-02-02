import http from "http";
import dotenv from "dotenv";
import app from "./app/app.js";
import connectDB from "./DB/connection.js";
import mongoose from "mongoose";
dotenv.config();

const server = http.createServer(app);
const PORT = process.env.PORT || 4444;

connectDB()
  .then(() => {
    console.log("DataBase Connected.......");
    server.listen(PORT, () => {
      console.log(`server is listening at port : ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  })
//   .finally(() => {
//     if (mongoose.connection.readyState === 1) {
//       mongoose.connection.close();
//       console.log("Database connection closed.");
//     }
//   });
