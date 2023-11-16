import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaroMachineReport } from "src/entities/BaroMachineReport";
import { BaroMachineStdwork } from "src/entities/BaroMachineStdwork";
import { Repository } from "typeorm";

@Injectable()
export class DbJob{
    constructor(
        @InjectRepository(BaroMachineStdwork) 
        private baroMachineStdwork:Repository<BaroMachineStdwork>,
        @InjectRepository(BaroMachineReport)
        private baroMachineReport:Repository<BaroMachineReport>    
    ){}
       
    async getOperate(id){
        let query = await this.baroMachineStdwork
        .createQueryBuilder('stdwork')
        .select(['sum(if(work_time/total_time * 100 >=30, work_time,0 )) work_time','sum(if(work_time/total_time * 100 >=30, total_time,0 )) total_time'])
        .where('stdwork.ent_id = :id',{id})
        .andWhere('stdwork.date = curdate() - interval 1 day')
        return query.getRawOne();
    }

    async getLotPrdct(id){
        let query = await this.baroMachineReport
        .createQueryBuilder('baro')
        .select('round( avg( ( 1 - ( ( (avg_period * count + 3600)  )  / ( time_to_sec( timediff( end_time, start_time ) ) ) ) ) * 100 ) ) diff_lot')
        .where('baro.ent_id = :id',{id})
        .andWhere('baro.date = curdate() - interval 1 day')
        .andWhere('baro.mkey not in(68,69,70,71,79)')
        return query.getRawOne();
    }


}