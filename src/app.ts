import express from "express";
import { connectToDatabase } from "./db";
import bodyParser from "body-parser";
import { baseRouter } from "./modules/routes/base-router";
import paginate from "express-paginate";
import cors from "cors";

require("dotenv").config();
const app: express.Application = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 8000;
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
connectToDatabase();
app.use(paginate.middleware());
app.use("/api/v1", baseRouter);
