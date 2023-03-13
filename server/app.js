import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import { verifyToken } from "./middleware/auth.js";
import { login, register } from "./controller/user.js";
import { createProduct, getAllProducts, getProduct } from "./controller/product.js";
import { syncUsers } from "./helper/stream.js";
import user from "./model/user.js";

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
    // mongodb+srv://<username>:<password>@marketplace.oibm3y8.mongodb.net/?retryWrites=true&w=majority
    // var db = "mongodb://localhost:27017/example";
    // await mongoose.connect("mongodb://localhost:27017/marketplace");

    await mongoose.connect(`mongodb://${username}:${password}@${host}:${dbPort}`);
    // await mongoose.connect(`mongodb://${username}:${password}@${host}:${dbPort}`, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });

    syncUsers(await user.find({}));

    app.listen(port || 3000, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.error(error, "WETINE DEY");
    process.exit(1);
  }
};

start();
