import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaroMachineStdwork } from 'src/entities/BaroMachineStdwork';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';
import { DbJob } from './dbjob';
import { BaroMachineReport } from 'src/entities/BaroMachineReport';

@Module({
    imports:[
        TypeOrmModule.forFeature([
            BaroMachineStdwork,
            BaroMachineReport
        ]),
        ScheduleModule.forRoot(),
    ],
    controllers: [],
    providers: [ CronService ,DbJob],

})
export class CronModule {}
