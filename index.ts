import * as dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import sequelize from "./db";
import router from "./routes/index";

import errorHandler from "./middleware/errorHandlingMiddleware";
import dbModels from "./models/models";
import path from "path";
const models = dbModels;

const PORT: number = Number(process.env.PORT) || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate().then(() => {
      console.log("Connection has been established successfully.");
    });
    await sequelize.sync().then(() => {
      console.log(`Database & tables created!`);
    });

    app.listen(PORT, () => console.log(`Server run on ${PORT} port!!!`));
  } catch (error) {
    console.log("error: ", "Something went wrong: ", error);
  }
};

start();
