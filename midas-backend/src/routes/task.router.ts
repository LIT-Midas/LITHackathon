import express from "express";
import TaskController from "../controllers/task.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new TaskController();
  const response = await controller.getTasks();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new TaskController();
  const response = await controller.createTask(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new TaskController();
  const response = await controller.getTask(req.params.id);
  if (!response) res.status(404).send({message: "No task found"})
  return res.send(response);
});

router.get("/user/:id", async (req, res) => {
  const controller = new TaskController();
  const response = await controller.getClaimTasks(req.params.id);
  if (!response) res.status(404).send({message: "No tasks found"})
  return res.send(response);
});

router.post("/:id", async (req, res) => {
  const controller = new TaskController();
  const response = await controller.updateTask(req.params.id, req.body);
  if (!response) res.status(404).send({message: "No task found"})
  return res.send(response);
});

router.delete("/:id", async (req, res) => {
  const controller = new TaskController();
  const response = await controller.deleteTask(req.params.id);
  if (!response) res.status(404).send({message: "No task found"})
  return res.send({message: "Task deleted successfully!"});
});

export default router;