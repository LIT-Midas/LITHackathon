import {DeleteResult, getRepository} from "typeorm";
import { Claim, Client, Task } from '../models'
import password from 'secure-random-password';
import sendGridMail from '@sendgrid/mail';

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY!);

export interface IClaimPayload {
  name: string;
  user_id: number;
  client_name: string;
  client_email: string;
  description: string;
  contact_number: string;
  start_date: Date;
}

export const getClaims  = async () :Promise<Array<Claim>> => {
  const claimRepository = getRepository(Claim);
  return claimRepository.find()
}

export const getUserClaims  = async (id: number) :Promise<Array<Claim>> => {
  const claimRepository = getRepository(Claim);
  return claimRepository.find({ where: { user_id: id } })
}

export const createClaim  = async (payload: IClaimPayload) :Promise<Claim> => {
  const claimRepository = getRepository(Claim);
  const taskRepository = getRepository(Task);
  const clientRepository = getRepository(Client);
  const claim = new Claim()
  const newClaim = await claimRepository.save({
    ...claim,
    ...payload
  })
  const pass_code = password.randomPassword({ length: 4, characters: password.digits })
  const client = clientRepository.create({
    name: payload.client_name,
    email: payload.client_email,
    claim_id: newClaim.id,
    access_code: pass_code,
  });
  const task = taskRepository.create({
    name: "Claim created",
    claim_id: newClaim.id,
    start_date: payload.start_date,
    completed_date: payload.start_date
  });
  await taskRepository.save(task);
  await clientRepository.save(client);
  newClaim.client_id = client.id
  return claimRepository.save(newClaim)
}

export const getClaim  = async (id: number) :Promise<Claim | null> => {
  const claimRepository = getRepository(Claim);
  const claim = await claimRepository.findOne({id: id})
  if (!claim) return null
  return claim
}

export const updateClaim  = async (id: number, payload: IClaimPayload) :Promise<Claim> => {
  const claimRepository = getRepository(Claim);
  const claim = await claimRepository.findOne({id: id})
  return claimRepository.save({
    ...claim,
    ...payload
  })
}

export const deleteClaim  = async (id: number) :Promise<DeleteResult | null> => {
  const claimRepository = getRepository(Claim);
  const claim = await claimRepository.findOne({id: id})
  if (!claim) return null
  return claimRepository.delete(id);
}