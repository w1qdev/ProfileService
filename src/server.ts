import express from "express";
import APIRouter from "./api/routes";

const app = express();
const SERVICE_PORT = process.env.PORT;

app.use(express.json());
app.use("/api", APIRouter);

app.listen(SERVICE_PORT, () => {
  console.log(`Server started on port ${SERVICE_PORT}`);
});
