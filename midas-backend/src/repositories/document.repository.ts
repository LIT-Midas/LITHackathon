import {DeleteResult, getRepository} from "typeorm";
import { Document } from '../models'
import { S3 } from 'aws-sdk';

export interface IDocumentPayload {
  uploader_name: string;
  claim_id: number;
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

export interface IS3Payload {
  parent: string;
  type: string;
  data: {
    name: string;
    job_id: string;
  }[]
}

export const getDocuments  = async () :Promise<Array<Document>> => {
  const documentRepository = getRepository(Document);
  return documentRepository.find()
}

export const getClaimDocuments  = async (id: number) :Promise<Array<Document>> => {
  const documentRepository = getRepository(Document);
  return documentRepository.find({ where: { claim_id: id }})
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

export const createS3Document = async (payload: IS3Payload): Promise<null> => {
  const documentRepository = getRepository(Document);
  const parentDocument = await documentRepository.findOne({ name: payload.parent })
  if(!parentDocument) return null
  payload.data.forEach(async d => {
    const document = new Document()
    await documentRepository.save({
      ...document,
      claim_id: parentDocument!.claim_id,
      name: d.name,
      job_id: d.job_id,
      type: payload.type,
    })
  })
  return null
}

export const downloadDocument = async (id: number): Promise<any | null> => {
  const s3 = new S3();
  const documentRepository = getRepository(Document);
  const document = await documentRepository.findOne({id: id})
  if (!document) return null
  const stream = await s3.getObject({
    Bucket: `${process.env.AWS_BUCKET_NAME}`,
    Key: document.name
  }).createReadStream();
  return {
    stream,
    info: document
  }
}

export const generateDocumentPresignedUrl = async (id: number): Promise<any> => {
  const s3 = new S3();
  const documentRepository = getRepository(Document);
  const document = await documentRepository.findOne({ id: id })
  if (!document) return null
  return s3.getSignedUrlPromise('getObject', {
    Bucket: `${process.env.AWS_BUCKET_NAME}`,
    Key: document.name
  })
}

export const generateMultiplePresignedUrl = async (ids: number[]): Promise<any> => {
  const s3 = new S3();
  const documentRepository = getRepository(Document);
  const signedUrl: any = []
  ids.forEach(async id => {
    const document = await documentRepository.findOne({ id: id })
    if (!document) return null
    signedUrl.push(s3.getSignedUrlPromise('getObject', {
      Bucket: `${process.env.AWS_BUCKET_NAME}`,
      Key: document.name
    }))
  })
  return Promise.all(signedUrl)
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

export const updateDocumentFormData = async (name: string, form_data: any, job_id: string): Promise<Document> => {
  const documentRepository = getRepository(Document);
  const document = await documentRepository.findOne({ name: name })
  return documentRepository.save({
    ...document,
    form_data: form_data,
    job_id: job_id
  })
}

export const deleteDocument  = async (id: number) :Promise<DeleteResult | null> => {
  const documentRepository = getRepository(Document);
  const document = await documentRepository.findOne({id: id})
  if (!document) return null
  return documentRepository.delete(id);
}