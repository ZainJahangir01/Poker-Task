import express from "express";
import { setupDeckerController } from "./src/controllers/decker";
const app = express();

setupDeckerController(app);

app.listen(4000);
