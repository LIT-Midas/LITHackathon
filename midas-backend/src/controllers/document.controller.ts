import { Get, Route, Tags,  Post, Body, Path, Delete, UploadedFiles, Request } from "tsoa";
import { DeleteResult } from "typeorm";
import {Document} from '../models'
import { getDocuments, IDocumentPayload, createDocument, getDocument, getClaimDocuments, updateDocument, deleteDocument, downloadDocument, updateDocumentFormData, IS3Payload, createS3Document, generateDocumentPresignedUrl } from "../repositories/document.repository";

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

  // @Get("/multiPresigned")
  // public async generateMultiplePresignedUrl(@Path() id: string): Promise<any | null> {
  //   return generateMultiplePresignedUrl(Number(id))
  // }

  @Post("/bootstrap")
  public async createS3Document(@Body() body: IS3Payload): Promise<any | null> {
    return createS3Document(body)
  }

  // @Post("/bootstrap")
  // public async updateDocumentFormData(@Body() body: IS3Payload): Promise<any | null> {
  //   return updateDocumentFormData(body)
  // }

  @Delete("/:id")
  public async deleteDocument(@Path() id: string): Promise<DeleteResult | null> {
    return deleteDocument(Number(id))
  }
}