import { Get, Route, Tags,  Post, Body, Path, Delete, UploadedFiles, Request } from "tsoa";
import { DeleteResult } from "typeorm";
import {Document} from '../models'
import { getDocuments, IDocumentPayload, createDocument, getDocument, getClaimDocuments, updateDocument, deleteDocument } from "../repositories/document.repository";

@Route("documents")
@Tags("Document")
export default class TaskController {
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

  @Delete("/:id")
  public async deleteDocument(@Path() id: string): Promise<DeleteResult | null> {
    return deleteDocument(Number(id))
  }
}