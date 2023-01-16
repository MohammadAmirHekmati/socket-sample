import { Controller, Get, Query } from "@nestjs/common";
import { query } from "express";
import { get } from "http";
import { AppModule } from "./app.module";
import { AppService } from "./app.service";

@Controller()
export class AppController {
    constructor(private appService:AppService) {}

    @Get("manual/price")
    manualPrice(@Query("address") link:string){
        return this.appService.manualPrice(link)
    }

    @Get("test")
    testServer(){
        return {message:"Server is OK"}
    }
}