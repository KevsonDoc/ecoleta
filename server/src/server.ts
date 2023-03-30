import express from "express";
import path from "path";
import routes from "./routes";
import cors from "cors";
import { errors } from "celebrate";

const app = express();

app.use(cors());
app.use(express.json()); //Colocando express para entender json
app.use(routes); // Mágica das rotas sendo importadas para o arquivo principal

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.use(errors());

app.listen(3333, () =>
  console.log("\n============ || SERVER IS RUNNING || ============\n"),
);
