import express from "express";
import ClaimController from "../controllers/claim.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new ClaimController();
  const response = await controller.getClaims();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new ClaimController();
  const response = await controller.createClaim(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new ClaimController();
  const response = await controller.getClaim(req.params.id);
  if (!response) res.status(404).send({message: "No claim found"})
  return res.send(response);
});

router.get("/user/:id", async (req, res) => {
  const controller = new ClaimController();
  const response = await controller.getUserClaims(req.params.id);
  if (!response) res.status(404).send({message: "No claims found"})
  return res.send(response);
});

router.post("/:id", async (req, res) => {
  const controller = new ClaimController();
  const response = await controller.updateClaim(req.params.id, req.body);
  if (!response) res.status(404).send({message: "No claim found"})
  return res.send(response);
});

router.delete("/:id", async (req, res) => {
  const controller = new ClaimController();
  const response = await controller.deleteClaim(req.params.id);
  if (!response) res.status(404).send({message: "No claim found"})
  return res.send({message: "Claim deleted successfully!"});
});

export default router;