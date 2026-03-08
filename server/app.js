import express from "express";
import cors from "cors";
import { loginRouter } from "./routes/login.routes.js";
import { meRouter } from "./routes/me.routes.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/", loginRouter);
app.use("/", meRouter);

app.listen(port, () => {
  console.log("server run on port", port);
});
