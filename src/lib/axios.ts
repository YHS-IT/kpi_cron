import axios from 'axios';
import { plainToClass } from 'class-transformer';
export async function sendRequest(
    method,
    url: string,
    data?: any,
    headers?: any,
){
    const response = await axios({
        method:method,
        url:url,
        data:data
    });
    return response.data; 
    // plainToClass(classType,response.data);
}