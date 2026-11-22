import "dotenv/config";
import express from "express";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.listen(port, "0.0.0.0", () => {
    console.log(`Server running at port ${port}`);
});