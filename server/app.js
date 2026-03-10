import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.routes.js";
import { reportsRouter } from "./routes/reports.routes.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/reports", reportsRouter);
app.get("/hello", (req, res) => {
  const h = req.query;
  console.log(h);
});

app.listen(port, () => {
  console.log("server run on port", port);
});
