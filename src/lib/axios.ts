import axios from 'axios';
import { plainToClass } from 'class-transformer';
export async function sendRequest<T>(
    method,
    url: string,
    data?: any,
    headers?: any,
    classType?: { new (): T }
){
    const response = await axios({
        method:method,
        url:url,
        data:data
    });
    return plainToClass(classType,response.data);
}