import { Get, Route, Tags,  Post, Body, Path, Delete, Request } from "tsoa";
import { DeleteResult } from "typeorm";
import {Document} from '../models'
import { IRecordOfAny } from "../models/document";
import { getDocuments, IDocumentPayload, createDocument, getDocument, getClaimDocuments, updateDocument, deleteDocument, downloadDocument, updateDocumentFormData, IS3Payload, createS3Document, generateDocumentPresignedUrl, generateMultiplePresignedUrl, getDocumentByKey } from "../repositories/document.repository";

export interface IS3FormDataPayload {
  form_data: IRecordOfAny[];
  job_id: string
}

@Route("documents")
@Tags("Document")
export default class DocumentController {
  @Get("/")
  public async getDocuments(): Promise<Array<Document>> {
    return getDocuments()
  }

  @Post("/")
  public async createDocument(@Request() req: any): Promise<null> {
    return createDocument(req.body, req.files)
  }

  @Post("/:id")
  public async updateDocument(@Path() id: string, @Body() body: IDocumentPayload): Promise<Document> {
    return updateDocument(Number(id), body)
  }

  @Get("/:id")
  public async getDocument(@Path() id: string): Promise<Document | null> {
    return getDocument(Number(id))
  }

  @Post("/key")
  public async getDocumentByKey(@Body() body: {key: string}): Promise<Document | null> {
    return getDocumentByKey(body.key)
  }
  
  @Get("/claim/:id")
  public async getClaimDocuments(@Path() id: string): Promise<Document[] | null> {
    return getClaimDocuments(Number(id))
  }

  @Get("/download/:id")
  public async downloadDocument(@Path() id: string): Promise<any | null> {
    return downloadDocument(Number(id))
  }

  @Get("/presignedUrl/:id")
  public async generateDocumentPresignedUrl(@Path() id: string): Promise<any | null> {
    return generateDocumentPresignedUrl(Number(id))
  }

  @Post("/multiPresigned")
  public async generateMultiplePresignedUrl(@Body() ids: {id: number}[]): Promise<any | null> {
    return generateMultiplePresignedUrl(ids)
  }

  @Post("/bootstrap")
  public async createS3Document(@Body() body: IS3Payload): Promise<any | null> {
    return createS3Document(body)
  }

  @Post("/formdata")
  public async updateDocumentFormData(@Body() body: IS3FormDataPayload): Promise<any | null> {
    return updateDocumentFormData(body.form_data, body.job_id)
  }

  @Delete("/:id")
  public async deleteDocument(@Path() id: string): Promise<DeleteResult | null> {
    return deleteDocument(Number(id))
  }
}