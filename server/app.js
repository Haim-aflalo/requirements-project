import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.routes.js";
import { reportsRouter } from "./routes/reports.routes.js";
import { adminRouter } from "./routes/admin.routes.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/reports", reportsRouter);
app.use("/admin", adminRouter);

app.listen(port, () => {
  console.log("server run on port", port);
});
