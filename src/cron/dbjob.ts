import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaroMachineStdwork } from "src/entities/BaroMachineStdwork";
import { Repository } from "typeorm";

@Injectable()
export class DbJob{
    constructor(
        @InjectRepository(BaroMachineStdwork) 
        private baroMachineStdwork:Repository<BaroMachineStdwork>
    ){}
       
    async getOperate(id){
        let query = await this.baroMachineStdwork
        .createQueryBuilder('stdwork')
        .select('*')
        .where('stdwork.ent_id = :id',{id})
        .andWhere('stdwork.date = curdate() - interval 1 day')

        return query.getRawMany();
    }



}