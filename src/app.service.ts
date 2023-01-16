const axios = require('axios')

export class AppService{
    async manualPrice(link:string){
        try {
            const request=await axios.get(link)
            return request.data
        } catch (error) {
            console.log("---------- error finded -----------")
            console.log(error)
            console.log("---------- link -----------")
            console.log(link)
        }
        
    }
}