import { Get, Route, Tags,  Post, Body, Path, Delete } from "tsoa";
import { DeleteResult } from "typeorm";
import {Receiver} from '../models'
import {getReceivers, createReceiver, IReceiverPayload, getReceiver, updateReceiver, deleteReceiver, IReceiverVerifyPayload, verifyReceiver} from '../repositories/receiver.repository'

@Route("receivers")
@Tags("Receiver")
export default class UserController {
  @Get("/")
  public async getReceivers(): Promise<Array<Receiver>> {
    return getReceivers()
  }

  @Post("/")
  public async createReceiver(@Body() body: IReceiverPayload): Promise<Receiver> {
    return createReceiver(body)
  }

  @Get("/:id")
  public async getReceiver(@Path() id: string): Promise<Receiver | null> {
    return getReceiver(Number(id))
  }

  @Post("/:id")
  public async updateReceiver(@Path() id: string, @Body() body: IReceiverPayload): Promise<Receiver> {
    return updateReceiver(Number(id), body)
  }

  @Post("/verify")
  public async verifyReceiver(@Body() body: IReceiverVerifyPayload): Promise<boolean> {
    return verifyReceiver(body.email, body.access_code)
  }

  @Delete("/:id")
  public async deleteReceiver(@Path() id: string): Promise<DeleteResult | null> {
    return deleteReceiver(Number(id))
  }
}