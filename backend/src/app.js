import "dotenv/config";
import express from "express";
import { cookieParser } from "cookie-parser";
import router from "./routes/main";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}));

app.use("/api", router);

const port = process.env.PORT || 5000;

app.listen(port, "0.0.0.0", () => {
    console.log(`Server running at port ${port}`);
});