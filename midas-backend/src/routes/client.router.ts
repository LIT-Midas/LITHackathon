import express from "express";
import ClientController from "../controllers/client.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new ClientController();
  const response = await controller.getClients();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new ClientController();
  const response = await controller.createClient(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new ClientController();
  const response = await controller.getClient(req.params.id);
  if (!response) res.status(404).send({message: "No client found"})
  return res.send(response);
});

router.post("/:id", async (req, res) => {
  const controller = new ClientController();
  const response = await controller.updateClient(req.params.id, req.body);
  if (!response) res.status(404).send({message: "No client found"})
  return res.send(response);
});

router.delete("/:id", async (req, res) => {
  const controller = new ClientController();
  const response = await controller.deleteClient(req.params.id);
  if (!response) res.status(404).send({message: "No client found"})
  return res.send({message: "Client deleted successfully!"});
});

export default router