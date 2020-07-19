import axios from 'axios'
import {storageService} from './storage.service'
const IP_ADDRESS = 'ip-address'

async function getIp(){
    var ip = storageService.load(IP_ADDRESS)
    if (!ip) {
        try {
            const res= await axios.get('https://ipapi.co/json/')
            ip = res.data.ip
            storageService.store(IP_ADDRESS, ip)
        }
        catch (err){
            console.log(err);
        }
    }
    return ip
}

export const ipService = {
    getIp
}