import { v2 as cloudinary } from "cloudinary";
import { env } from "./env.js";

const cloudinaryUrl = new URL(env.CLOUDINARY_URL);

cloudinary.config({
  cloud_name: cloudinaryUrl.hostname,
  api_key: decodeURIComponent(cloudinaryUrl.username),
  api_secret: decodeURIComponent(cloudinaryUrl.password),
  secure: true,
});

export { cloudinary };
