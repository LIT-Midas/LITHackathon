import {DeleteResult, getRepository} from "typeorm";
import { Document, Receiver } from '../models'

export interface IReceiverPayload {
  name: string;
  email: string;
  claim_id: number;
}

export interface IReceiverVerifyPayload {
  email: string;
  access_code: string;
}

export const getReceivers  = async () :Promise<Array<Receiver>> => {
  const receiverRepository = getRepository(Receiver);
  return receiverRepository.find()
}

export const createReceiver = async (payload: IReceiverPayload, pass_code: string): Promise<Receiver> => {
  const receiverRepository = getRepository(Receiver);
  const receiver = new Receiver()
  return receiverRepository.save({
    ...receiver,
    ...payload,
    access_code: pass_code
  })
}

export const getReceiver  = async (id: number) :Promise<Receiver | null> => {
  const receiverRepository = getRepository(Receiver);
  const receiver = await receiverRepository.findOne({id: id})
  if (!receiver) return null
  return receiver
}

export const updateReceiver  = async (id: number, payload: IReceiverPayload) :Promise<Receiver> => {
  const receiverRepository = getRepository(Receiver);
  const receiver = await receiverRepository.findOne({id: id})
  return receiverRepository.save({
    ...receiver,
    ...payload
  })
}

export const deleteReceiver  = async (id: number) :Promise<DeleteResult | null> => {
  const receiverRepository = getRepository(Receiver);
  const receiver = await receiverRepository.findOne({id: id})
  if (!receiver) return null
  return receiverRepository.delete(id);
}

export const verifyReceiver  = async (email: string, access_code: string) :Promise<Receiver | null> => {
  const receiverRepository = getRepository(Receiver);
  const receiver = await receiverRepository.findOne({ where: { email: email, access_code: access_code }})
  if (!receiver) return null
  return receiver
}

export const getReceiversByClaim = async (id: number): Promise<Receiver[] | null> => {
  const receiverRepository = getRepository(Receiver);
  const receivers = await receiverRepository.find({ where: { claim_id: id }})
  if (!receivers) return null
  return receivers
}