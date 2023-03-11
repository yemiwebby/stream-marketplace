import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import { verifyToken } from "./middleware/auth.js";
import { login, register } from "./controller/user.js";
import {
  createProduct,
  getAllProducts,
  getProduct,
} from "./controller/product.js";

const app = express();
dotenv.config({ path: ".env.local" });
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  return res.json({ message: "Hello, World ✌️" });
});

app.post("/register", register);
app.post("/login", login);

app.post("/product", verifyToken, createProduct);
app.get("/product", verifyToken, getAllProducts);
app.get("/product/:id", verifyToken, getProduct);

const start = async () => {
  const {
    DB_USERNAME: username,
    DB_PASSWORD: password,
    DB_HOST: host,
    DB_PORT: dbPort,
    APP_PORT: port,
  } = process.env;
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(
      `mongodb://${username}:${password}@${host}:${dbPort}`
    );
    app.listen(port || 8080, () =>
      console.log(`Server started on port ${port}`)
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
