import {DeleteResult, getRepository} from "typeorm";
import { Document } from '../models'
import { S3 } from 'aws-sdk';

export interface IDocumentPayload {
  claim_id: number;
  upload_person_id: number;
  persona: string;
}

export interface IS3FilePayload {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  key: string;
  acl: string;
  contentType: string;
  location: string;
  metadata: any;
}

export const getDocuments  = async () :Promise<Array<Document>> => {
  const documentRepository = getRepository(Document);
  return documentRepository.find()
}

export const getClaimDocuments  = async (id: number) :Promise<Array<Document>> => {
  const documentRepository = getRepository(Document);
  return documentRepository.find({ where: { claim_id: id }})
}

export const getReceiverDocuments  = async (id: number) :Promise<Array<Document>> => {
  const documentRepository = getRepository(Document);
  return documentRepository.find({ where: { receiver_id: id }})
}

export const createDocument = async (payload: IDocumentPayload, files: Array<IS3FilePayload>): Promise<null> => {
  const documentRepository = getRepository(Document);
  files.forEach(async file => {
    const document = new Document()
    await documentRepository.save({
      ...document,
      ...payload,
      name: file.key,
      upload_url: file.location,
      type: file.mimetype,
    })
  })
  return null
}

export const getDocument  = async (id: number) :Promise<Document | null> => {
  const documentRepository = getRepository(Document);
  const document = await documentRepository.findOne({id: id})
  if (!document) return null
  return document
}

export const updateDocument  = async (id: number, payload: IDocumentPayload) :Promise<Document> => {
  const documentRepository = getRepository(Document);
  const document = await documentRepository.findOne({id: id})
  return documentRepository.save({
    ...document,
    ...payload
  })
}

export const deleteDocument  = async (id: number) :Promise<DeleteResult | null> => {
  const documentRepository = getRepository(Document);
  const document = await documentRepository.findOne({id: id})
  if (!document) return null
  return documentRepository.delete(id);
}