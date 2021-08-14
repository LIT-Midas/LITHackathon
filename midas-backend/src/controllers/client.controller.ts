import { Get, Route, Tags,  Post, Body, Path, Delete } from "tsoa";
import { DeleteResult } from "typeorm";
import { Client } from '../models'
import password from 'secure-random-password';
import {getClients, createClient, IClientPayload, getClient, updateClient, deleteClient, verifyClient, IClientVerifyPayload} from '../repositories/client.repository'

@Route("clients")
@Tags("Client")
export default class ClientController {
  @Get("/")
  public async getClients(): Promise<Array<Client>> {
    return getClients()
  }

  @Post("/")
  public async createClient(@Body() body: IClientPayload): Promise<Client> {
    const pass_code = password.randomPassword({ length: 4, characters: password.digits })
    return createClient(body, pass_code)
  }

  @Get("/:id")
  public async getClient(@Path() id: string): Promise<Client | null> {
    return getClient(Number(id))
  }

  @Post("/verify")
  public async verifyClient(@Body() body: IClientVerifyPayload): Promise<Client | null> {
    return verifyClient(body.email, body.access_code)
  }

  @Post("/:id")
  public async updateClient(@Path() id: string, @Body() body: IClientPayload): Promise<Client> {
    return updateClient(Number(id), body)
  }

  @Delete("/:id")
  public async deleteClient(@Path() id: string): Promise<DeleteResult | null> {
    return deleteClient(Number(id))
  }
}