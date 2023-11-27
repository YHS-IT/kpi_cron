import { Injectable, Inject } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { Cron, CronExpression } from "@nestjs/schedule";
import { apiKey } from "../common/apiKey";
import { DbJob } from "src/cron/dbjob";
import { DateTimeUtil } from "../lib/dateTimeFormat";
import { sendRequest } from "src/lib/axios";
import { GlobalStore } from "src/lib/store";
import { LocalDateTime } from "js-joda";

	@Injectable()
	export class CronService {
		constructor(
			@Inject(WINSTON_MODULE_PROVIDER) 
			private readonly logger:Logger,
			private dbService:DbJob,
		){}

		
		// @Cron(CronExpression.EVERY_10_SECONDS)
		// async testCron(){
		// 	for(let info of apiKey){
		// 		const {id,key,standard_oper,standard_lot}  = info;
		// 		await this.levelOne(key,id);
		// 		await this.getOperate(key,id,standard_oper);
		// 		await this.getLotPrdct(key,id,standard_lot);
		// 	}
		// }

		async levelOne(){
			let date = DateTimeUtil.now();
			for await(let info of apiKey){
				let {id,key} = info;
				let data =  {
					"KPILEVEL1":[{
							kpiCertKey:key,
							ocrDttm:DateTimeUtil.toString(DateTimeUtil.minusDate(date,1)),
							systmOprYn:"Y",
							trsDttm:DateTimeUtil.toString(date)
					}]
				};
				let response = await sendRequest('post',`${GlobalStore.kpi_domain}/kpiLv1/kpiLv1Insert`,data,'');	
				console.log(response);
			}
		}

		async levelTwo(){
			let date = DateTimeUtil.now();
			console.log(typeof date);
			for await(let info of apiKey){
				let {id,key,standard_oper,standard_lot} = info;		
				let axios_data = { "KPILEVEL2":[] }	;		
				let oper_data = await this.getOperate(id,key,date,standard_oper);
				if(oper_data){axios_data.KPILEVEL2.push(oper_data)};		
				let lot_data = await this.getLotPrdct(id,key,date,standard_lot);		
				if(lot_data){axios_data.KPILEVEL2.push(lot_data)};		
		
				let response = axios_data.KPILEVEL2.length ? await sendRequest('post',`${GlobalStore.kpi_domain}/kpiLv2/kpiLv2Insert`,axios_data,'') : 'NO data';	
				console.log(response);
			}
		}
	
		async levelThree(){
			let date = DateTimeUtil.now();

			for await(let info of apiKey){
				let {id,key,standard_oper,standard_lot} = info;		
				let axios_data = { "KPILEVEL3":[] }	;
				let oper_data = await this.getOperate(id,key,date,standard_oper,'lv3');
				if(oper_data){axios_data.KPILEVEL3.push(oper_data)};		
				let lot_data = await this.getLotPrdct(id,key,date,standard_lot,'lv3');		
				if(lot_data){axios_data.KPILEVEL3.push(lot_data)};
				let response = axios_data.KPILEVEL3.length ? await sendRequest('post',`${GlobalStore.kpi_domain}/kpiLv3/kpiLv3Insert`,axios_data,'') : 'NO data';	
				
				console.log(response);
			}

		}

		async getOperate(id:number,key:string,date:LocalDateTime,standard_oper:number,level?:string){
			let res = await this.dbService.getOperate(id);

			if(res.total_time == 0) return null;

			let val = Math.round((res.work_time/res.total_time)*100) ;

			let form = await this.getOperForm(date,key);

			return level ?  {...form, unt:'%', msmtVl: val +''} :  {...form, achrt: Math.round( ( ( val - standard_oper ) / standard_oper ) *100 ) + ''} ; 
		}

		async getLotPrdct(id:number,key:string,date:LocalDateTime,standard_lot:number,level?:string){
			let res = await this.dbService.getLotPrdct(id);

			if(!res.diff_lot) return null;

			let val =  Math.abs(res.diff_lot) ;

			let form = await this.getLotForm(date,key);

			return level ?  {...form, unt:'%', msmtVl: val +''} : {...form, achrt:Math.round ( ( ( standard_lot - val ) / standard_lot ) * 100 ) + '' }
		}

		async getOperForm(date,key){
			if(!date || !key || (!key && !date) ) return null;	
			let common_data = {
				kpiCertKey:key,
				ocrDttm:DateTimeUtil.toString(DateTimeUtil.minusDate(date,1)),
				kpiFldCd:"P",
				kpiDtlCd:"A",
				kpiDtlNm:"가동률 증가",
				trsDttm:DateTimeUtil.toString(date)
			}
			return common_data ;
		}

		async getLotForm(date,key){
			if(!date || !key || (!key && !date) ) return null;	
				let common_data ={
						kpiCertKey:key,
						ocrDttm:DateTimeUtil.toString(DateTimeUtil.minusDate(date,1)),
						kpiFldCd:"D",
						kpiDtlCd:"Z",
						kpiDtlNm:"LOT완료예측시간오차율",
						trsDttm:DateTimeUtil.toString(date)
				};
				return common_data ; 	
		}



		// async kpiService(){
		// 	for await (let info of apiKey){
		// 		const {id,key,standard_oper,standard_lot}  = info;
		// 		await this.levelOne(key,id);

		// 		await this.getOperate(key,id,standard_oper);

		// 		await this.getLotPrdct(key,id,standard_lot);
		// 	}
		// }

		// async levelOne(key:string,id:number){
		// 	let date = DateTimeUtil.now();
			
		// 	let data =  {
		// 		"KPILEVEL1":[{
		// 				kpiCertKey:key,
		// 				ocrDttm:DateTimeUtil.toString(DateTimeUtil.minusDate(date,1)),
		// 				systmOprYn:"Y",
		// 				trsDttm:DateTimeUtil.toString(date)
		// 		}]
		// 	};

		// 	sendRequest('post',`${GlobalStore.kpi_domain}/kpiLv1/kpiLv1InsertTst`,data,'').then(res=>{
		// 			// console.log(res);		
		// 		this.logger.info(`level:1 , 회사: ${id} , msg: ${res.okMsg}`);
		// 	}).catch(err=>{
		// 		this.logger.error(`level:1 , 회사: ${id} , msg: ${err.message}`);
		// 	});
		// }

		// async levelTwo(levelTwo_data:Object,id:number){
		// 	let data = {
		// 		"KPILEVEL2":[
		// 			{...levelTwo_data}
		// 		]
		// 	}
		// 	sendRequest('post',`${GlobalStore.kpi_domain}/kpiLv2/kpiLv2InsertTst`,data,'').then(res=>{
		// 		this.logger.info(`level:2 , 회사: ${id} , msg: ${res.okMsg}`);
		// 	}).catch(err=>{
		// 		this.logger.error(`level:2 , 회사: ${id} , msg: ${err.message}`);
		// 	})
		// }

		// async levelThree(levelThree_data:Object,id:number){
		// 	let data = {
		// 		"KPILEVEL3":[
		// 			{...levelThree_data}
		// 		]
		// 	}
		// 	sendRequest('post',`${GlobalStore.kpi_domain}/kpiLv3/kpiLv3InsertTst`,data,'').then(res=>{
		// 		this.logger.info(`level:3 , 회사: ${id} , msg: ${res.okMsg}`);
		// 	}).catch(err=>{
		// 		this.logger.error(`level:3 , 회사: ${id} , msg: ${err.message}`);
		// 	})
		// }

		// async getOperate(key:string,id:number,standard_oper:number){
		// 	let res = await this.dbService.getOperate(id);
		// 	console.log(res.work_t);
		// 	if (!res.work_time) return null;	
			
		// 	let val = Math.round((res.work_time/res.total_time)*100) ;

		// 	let date = DateTimeUtil.now();
			
		// 	let common_data= {
		// 		kpiCertKey:key,
		// 		ocrDttm:DateTimeUtil.toString(DateTimeUtil.minusDate(date,1)),
		// 		kpiFldCd:"P",
		// 		kpiDtlCd:"A",
		// 		kpiDtlNm:"가동률 증가",
		// 		trsDttm:DateTimeUtil.toString(date)
		// 	};
			
		// 	let levelTwo_data = { ...common_data, achrt: Math.round( ( ( val - standard_oper ) / standard_oper ) *100 ) + '' };
			
		// 	await this.levelTwo(levelTwo_data,id);
			
		// 	let levelThree_data = { ...common_data, unt:'%', msmtVl:val + '' };
			
		// 	await this.levelThree(levelThree_data,id);

		// }

		// async getLotPrdct(key:string,id:number,standard_lot:number) {
		// 	let res = await this.dbService.getLotPrdct(id);
		// 	console.log(res.diff_lot);
		// 	if(!res.diff_lot) return null ;	
			
		// 	let val =  Math.abs(res.diff_lot) ;
			
		// 	let date = DateTimeUtil.now();
			
		// 	let common_data ={
		// 		kpiCertKey:key,
		// 		ocrDttm:DateTimeUtil.toString(DateTimeUtil.minusDate(date,1)),
		// 		kpiFldCd:"D",
		// 		kpiDtlCd:"Z",
		// 		kpiDtlNm:"LOT완료예측시간오차율",
		// 		trsDttm:DateTimeUtil.toString(date)
		// 	};
		// 	let levelTwo_data = {...common_data, achrt:Math.round ( ( ( standard_lot - val ) / standard_lot ) * 100 ) + '' } ;
			
		// 	await this.levelTwo(levelTwo_data,id);

		// 	let levelThree_data = {...common_data, unt:'%', msmtVl: val +''} ;
			
		// 	await this.levelThree(levelThree_data,id);
			
		// }

	}