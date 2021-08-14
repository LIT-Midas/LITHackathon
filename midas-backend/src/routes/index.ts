import express from "express";
import PingController from "../controllers/ping.controller";
import UserRouter from "./user.router";
import ClaimRouter from "./claim.router";
import TaskRouter from "./task.router";
import ClientRouter from "./client.router";
import DocumentRouter from "./document.router";
import ReceiverRouter from "./receiver.router";

const router = express.Router();

router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.use("/users", UserRouter)
router.use("/claims", ClaimRouter)
router.use("/tasks", TaskRouter)
router.use("/clients", ClientRouter)
router.use("/documents", DocumentRouter)
router.use("/receivers", ReceiverRouter)

export default router;
