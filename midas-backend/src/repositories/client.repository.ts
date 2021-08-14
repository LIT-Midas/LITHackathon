import {DeleteResult, getRepository} from "typeorm";
import { Client } from '../models'
import sendGridMail from '@sendgrid/mail';

export interface IClientPayload {
  name: string;
  email: string;
  claim_id: number;
}

export interface IClientVerifyPayload {
  email: string;
  access_code: string;
}

export const getClients  = async () :Promise<Array<Client>> => {
  const clientRepository = getRepository(Client);
  return clientRepository.find()
}

export const createClient = async (payload: IClientPayload, access_code: string): Promise<Client> => {
  const clientRepository = getRepository(Client);
  const client = new Client()
  const newClient = clientRepository.save({
    ...client,
    ...payload,
    access_code: access_code
  })
  const msg = {
    from: 'darren.chia.2018@smu.edu.sg',
    templateId: 'd-7c2e2c212b9b4a92912fe43ffcd7440c',
    personalizations: [
      {
        to: [
          {
            email: payload.email
          }
        ],
        dynamic_template_data: {
          client: payload.name,
          url: `https://frontend.d8h8v440m42u9.amplifyapp.com/auth/login/upload/${payload.claim_id}`,
          access_code: access_code,
        }
      }
    ]
  }
  sendGridMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error: any) => {
      console.error(error)
    })
  return newClient
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

export const verifyClient  = async (email: string, access_code: string) :Promise<Client | null> => {
  const clientRepository = getRepository(Client);
  const client = await clientRepository.findOne({ where: { email: email, access_code: access_code }})
  if (!client) return null
  return client
}