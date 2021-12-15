import "reflect-metadata";
import express from "express";
import { PipeDrive } from "./handlers";
import { container } from "tsyringe";

const app = express();
const pipeDrive = container.resolve(PipeDrive);

app.use(express.json());
app.get("/pipedrive/business", async (request, response) => {
  await pipeDrive.handle();
  return response.status(201).send("Pedidos criados na Bling com sucesso!");
});

app.listen(9090, () => {
  console.log("Server is running!");
});
