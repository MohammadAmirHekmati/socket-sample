import { OnModuleInit } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
const axios = require('axios')
import {Server, Socket} from "socket.io"
import { PriceResponseDto } from "../dto/api.response";
const WebSocket = require('ws');
@WebSocketGateway({
    path: '/test/',
    cors: {
      origin: '*',
    },
    pingTimeout:60000
  })
export class BinanceGateway{
    @WebSocketServer()
    server:Server

    channel_one:string[]=[]
    channel_two:string[]=[]
    channel_three:string[]=[]

    @SubscribeMessage("channel_1")
    channelOneHandler(@MessageBody()  exchanges, @ConnectedSocket() client:Socket){
        // client.join(roomName)
        this.channel_one=this.channel_one.concat(exchanges.filter(item=>{
            const findDuplicate=this.channel_one.find(itemExchange=>itemExchange==item)
            if (!findDuplicate) 
                return item
        }))

        const socket = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${this.channel_one.join("/")}`)
            socket.on("message",(data)=>{
                const jsonConvert = JSON.parse(data.toString())
                this.server.emit("channel_one",jsonConvert)
            })
    }

    @SubscribeMessage("channel_2")
    channelTwoHandler(@MessageBody() exchanges:string[],@ConnectedSocket() client:Socket){
        // client.join(roomName)
        this.channel_two=this.channel_two.concat(exchanges.filter(item=>{
            const findDuplicate=this.channel_two.find(itemExchange=>itemExchange==item)
            if (!findDuplicate) 
                return item
        }))
        const socket = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${this.channel_two.join("/")}`)
            socket.on("message",(data)=>{
                const jsonConvert = JSON.parse(data.toString())
                this.server.emit("channel_two",jsonConvert)
            })
    }

    @SubscribeMessage("channel_3")
    channelThreeHandler(@MessageBody() exchanges:string[],@ConnectedSocket() client:Socket){
        // client.join(roomName)
        this.channel_three=this.channel_three.concat(exchanges.filter(item=>{
            const findDuplicate=this.channel_three.find(itemExchange=>itemExchange==item)
            if (!findDuplicate) 
                return item
        }))
        const socket = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${this.channel_three.join("/")}`)
            socket.on("message",(data)=>{
                const jsonConvert = JSON.parse(data.toString())
                this.server.emit("channel_three",jsonConvert)
            })
    }


    @Cron(CronExpression.EVERY_30_MINUTES)
    async tetherPrice(){
        const priceRq=await axios.get("https://data.tetherland.com/api/v4/currencies-list")
    const result:PriceResponseDto=priceRq.data
    const tetherPrice=result.data.currencies.find(item=>item.symbol=='USDT').toman_amount
       const stringifiedPrice= tetherPrice.toString()
    this.server.emit("usdt_price",Number(stringifiedPrice.concat("0")))
    }
}
