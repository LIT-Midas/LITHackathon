import {DeleteResult, getRepository} from "typeorm";
import { Client } from '../models'

export interface IClientPayload {
  name: string;
  email: string;
  claim_id: number;
  access_code: string;
}

export const getClients  = async () :Promise<Array<Client>> => {
  const clientRepository = getRepository(Client);
  return clientRepository.find()
}

export const createClient  = async (payload: IClientPayload) :Promise<Client> => {
  const clientRepository = getRepository(Client);
  const client = new Client()
  return clientRepository.save({
    ...client,
    ...payload
  })
}

export const getClient  = async (id: number) :Promise<Client | null> => {
  const clientRepository = getRepository(Client);
  const client = await clientRepository.findOne({id: id})
  if (!client) return null
  return client
}

export const updateClient  = async (id: number, payload: IClientPayload) :Promise<Client> => {
  const clientRepository = getRepository(Client);
  const client = await clientRepository.findOne({id: id})
  return clientRepository.save({
    ...client,
    ...payload
  })
}

export const deleteClient  = async (id: number) :Promise<DeleteResult | null> => {
  const clientRepository = getRepository(Client);
  const client = await clientRepository.findOne({id: id})
  if (!client) return null
  return clientRepository.delete(id);
}
