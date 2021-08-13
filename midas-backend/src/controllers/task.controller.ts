import { Get, Route, Tags,  Post, Body, Path, Delete } from "tsoa";
import { DeleteResult } from "typeorm";
import {Task} from '../models'
import { getTasks, ITaskPayload, createTask, getTask, getClaimTasks, updateTask, deleteTask } from "../repositories/task.repository";

@Route("tasks")
@Tags("Task")
export default class TaskController {
  @Get("/")
  public async getTasks(): Promise<Array<Task>> {
    return getTasks()
  }

  @Post("/")
  public async createTask(@Body() body: ITaskPayload): Promise<Task> {
    return createTask(body)
  }

  @Post("/:id")
  public async updateTask(@Path() id: string, @Body() body: ITaskPayload): Promise<Task> {
    return updateTask(Number(id), body)
  }

  @Get("/:id")
  public async getTask(@Path() id: string): Promise<Task | null> {
    return getTask(Number(id))
  }
  
  @Get("/claim/:id")
  public async getClaimTasks(@Path() id: string): Promise<Task[] | null> {
    return getClaimTasks(Number(id))
  }

  @Delete("/:id")
  public async deleteTask(@Path() id: string): Promise<DeleteResult | null> {
    return deleteTask(Number(id))
  }
}