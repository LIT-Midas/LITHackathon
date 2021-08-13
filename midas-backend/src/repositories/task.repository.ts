import {DeleteResult, getRepository} from "typeorm";
import {Task} from '../models'

export interface ITaskPayload {
  name: string;
  claim_id: number;
  details: string;
  type: string;
  start_date: Date;
}

export const getTasks  = async () :Promise<Array<Task>> => {
  const taskRepository = getRepository(Task);
  return taskRepository.find()
}

export const getClaimTasks  = async (id: number) :Promise<Array<Task>> => {
  const taskRepository = getRepository(Task);
  return taskRepository.find({ where: { claim_id: id } })
}

export const createTask  = async (payload: ITaskPayload) :Promise<Task> => {
  const taskRepository = getRepository(Task);
  const task = new Task()
  if (payload.type && payload.type === "admin_file_soc_wos") {
    const deadlineDate = new Date(payload.start_date)
    deadlineDate.setDate(deadlineDate.getDate() + 8);
    task.deadline_date = deadlineDate
  } else if (payload.type && payload.type === "opposing_file_moa") {
    const deadlineDate = new Date(payload.start_date)
    deadlineDate.setDate(deadlineDate.getDate() + 14);
    task.deadline_date = deadlineDate
  }
  return taskRepository.save({
    ...task,
    ...payload
  })
}

export const getTask  = async (id: number) :Promise<Task | null> => {
  const taskRepository = getRepository(Task);
  const task = await taskRepository.findOne({id: id})
  if (!task) return null
  return task
}

export const updateTask  = async (id: number, payload: ITaskPayload) :Promise<Task> => {
  const taskRepository = getRepository(Task);
  const task = await taskRepository.findOne({id: id})
  return taskRepository.save({
    ...task,
    ...payload
  })
}

export const deleteTask  = async (id: number) :Promise<DeleteResult | null> => {
  const taskRepository = getRepository(Task);
  const task = await taskRepository.findOne({id: id})
  if (!task) return null
  return taskRepository.delete(id);
}