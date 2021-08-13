import { Get, Route, Tags,  Post, Body, Path, Delete } from "tsoa";
import { DeleteResult } from "typeorm";
import {Claim} from '../models'
import { getClaims, IClaimPayload, createClaim, getClaim, getUserClaims, updateClaim, deleteClaim } from "../repositories/claim.repository";

@Route("claims")
@Tags("Claim")
export default class ClaimController {
  @Get("/")
  public async getClaims(): Promise<Array<Claim>> {
    return getClaims()
  }

  @Post("/")
  public async createClaim(@Body() body: IClaimPayload): Promise<Claim> {
    return createClaim(body)
  }

  @Post("/:id")
  public async updateClaim(@Path() id: string, @Body() body: IClaimPayload): Promise<Claim> {
    return updateClaim(Number(id), body)
  }

  @Get("/:id")
  public async getClaim(@Path() id: string): Promise<Claim | null> {
    return getClaim(Number(id))
  }
  
  @Get("/user/:id")
  public async getUserClaims(@Path() id: string): Promise<Claim[] | null> {
    return getUserClaims(Number(id))
  }

  @Delete("/:id")
  public async deleteClaim(@Path() id: string): Promise<DeleteResult | null> {
    return deleteClaim(Number(id))
  }
}