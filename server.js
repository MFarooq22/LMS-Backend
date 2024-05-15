import app from "./app.js";
import { connectDB } from "./config/database.js";
import cloudinary from "cloudinary";
import nodeCron from "node-cron";
import { Stats } from "./models/Stats.js";


cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
})

// 0 0 0 5 * *
// 0 0 0 1 * *
nodeCron.schedule("0 0 1 * * *", async () => {
    try {
      await Stats.create({});
    } catch (error) {
      console.log(error);
    }
  });
  

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is Running on port: ${process.env.PORT}`);
    })
})
