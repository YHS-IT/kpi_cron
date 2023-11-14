import { Injectable, Inject } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { Cron, CronExpression } from "@nestjs/schedule";
import { apiKey } from "secret/apiKey";
import { DbJob } from "src/cron/dbjob";
import { DateTimeUtil } from "../lib/dateTimeFormat";
import { sendRequest } from "src/lib/axios";
import { GlobalStore } from "src/lib/store";


	@Injectable()
	export class CronService {
		constructor(
			@Inject(WINSTON_MODULE_PROVIDER) 
			private readonly logger:Logger,
			private dbService:DbJob,
		){}
		
	 
		@Cron(CronExpression.EVERY_10_SECONDS)
		async testCron(){
			// this.levelOne();
		}

		@Cron('0 30 00 * * *')
		async kpiService(){
			this.levelOne();
		}

		async levelOne(){
			let date = DateTimeUtil.now();
			for(let info of apiKey){
				const {id,key}  = info;
				let data =  {
					"KPILEVEL1":[{
						kpiCertKey:key,
						ocrDttm:DateTimeUtil.toString(DateTimeUtil.minusDate(date,1)),
						systmOprYn:"Y",
						trsDttm:DateTimeUtil.toString(date)
					}]
				};
				sendRequest('post',`${GlobalStore.kpi_domain}/kpiLv1/kpiLv1InsertTst`,data,'').then(res=>{
					this.logger.info(`회사: ${id} ,msg : complete`);
				}).catch(err=>{
					this.logger.error(`회사: ${id} ,msg : ${err.message}`);
				})
			}
			
			this.logger.info('Lv1');
		}

		levelTwo(){
			this.logger.info('Lv2');
		}

		levelThree(){
			this.logger.info('Lv3');
		}

	}