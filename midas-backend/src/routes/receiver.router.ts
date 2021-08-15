import express from "express";
import ReceiverController from "../controllers/receiver.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new ReceiverController();
  const response = await controller.getReceivers();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new ReceiverController();
  const response = await controller.createReceiver(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new ReceiverController();
  const response = await controller.getReceiver(req.params.id);
  if (!response) res.status(404).send({message: "No receiver found"})
  return res.send(response);
});

router.get("/claim/:id", async (req, res) => {
  const controller = new ReceiverController();
  const response = await controller.getReceiversByClaim(req.params.id);
  if (!response) res.status(404).send({message: "No receiver found"})
  return res.send(response);
});

router.post("/:id", async (req, res) => {
  const controller = new ReceiverController();
  const response = await controller.updateReceiver(req.params.id, req.body);
  if (!response) res.status(404).send({message: "No receiver found"})
  return res.send(response);
});

router.post("/document/:id", async (req, res) => {
  const controller = new ReceiverController();
  const response = await controller.addDocument(req.params.id, req.body);
  if (!response) res.status(404).send({message: "No documents found"})
  return res.send(response);
});

router.post("/verify", async (req, res) => {
  const controller = new ReceiverController();
  const response = await controller.verifyReceiver(req.body);
  return res.send(response);
});

router.delete("/:id", async (req, res) => {
  const controller = new ReceiverController();
  const response = await controller.deleteReceiver(req.params.id);
  if (!response) res.status(404).send({message: "No receiver found"})
  return res.send({message: "Receiver deleted successfully!"});
});

export default router