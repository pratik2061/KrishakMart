import "dotenv/config";
import express, { urlencoded } from "express";
import routes from "./Routes/index";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Public")));
app.use(
  cors({
    // origin : process.env.CLIENT_URL,
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());

app.use(routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("server is running on ", PORT);
});
