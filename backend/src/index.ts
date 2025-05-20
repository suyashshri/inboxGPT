import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import router from "./routes/routes";

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Servert is running at http://localhost:${PORT}`);
});
