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
			for(let info of apiKey){
				const {id,key}  = info;
				// this.levelOne(key,id);
				this.levelTwo(key,id);
			}
		}

		@Cron('0 30 0 * * *')
		async kpiService(){
			// this.levelOne();
		}

		async levelOne(key:string,id:number){
			let date = DateTimeUtil.now();

			let data =  {
				"KPILEVEL1":[{
					kpiCertKey:key,
					ocrDttm:DateTimeUtil.toString(DateTimeUtil.minusDate(date,1)),
					systmOprYn:"Y",
					trsDttm:DateTimeUtil.toString(date)
				}]
			};
				sendRequest('post',`${GlobalStore.kpi_domain}/kpiLv1/kpiLv1InsertTst`,data,'').then(res=>{
					// console.log(res);		
					 this.logger.info(`회사: ${id}  ,msg : ${res.okMsg}`);
				}).catch(err=>{
					this.logger.error(`회사: ${id} ,msg : ${err.message}`);
				})
			
			this.logger.info('Lv1');
		}

		async levelTwo(key:string,id:number){
			this.logger.info('Lv2');
			let data = {
				"KPILEVEL2":[]
			}
			let oper = await this.getOperate(key,id);
			let lot_prdct = await this.getLotPrdct(key,id); 
			console.log(oper,lot_prdct);
		}

		levelThree(){
			this.logger.info('Lv3');
		}

		async getOperate(key:string,id:number){
			let res = await this.dbService.getOperate(id);
			let average ;	
			if(!res.work_time && !res.total_time){
				average = 30;
			}else{
				console.log(Math.round((res.work_time/res.total_time)*100));

			}
			let levelTwo_data= {
				kpiCertKey:key,
				ocrDttm:'',
				kpiFidCd:"P",
				kpiDtlCd:"A",
				kpiDtlNm:"가동률 증가",
				achrt:'',
				trsDttm:DateTimeUtil.toString()
			}
			return res;
		}

		async getLotPrdct(key:string,id:number) {
			let res = await this.dbService.getLotPrdct(id);
			console.log(Math.abs(res.diff_lot));
			let Date = DateTimeUtil.now();
			let levelTwo_data ={
				kpiCertKey:key,
				ocrDttm:DateTimeUtil.toString,
				kpiFidCd:"D",
				kpiDtlCd:"Z",
				kpiDtlNm:"LOT완료예측시간오차율",
				achrt:'',
				trsDttm:DateTimeUtil.toString()
			}
			return res;
		}

	}