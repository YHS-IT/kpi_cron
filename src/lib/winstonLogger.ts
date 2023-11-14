import { format, transports } from 'winston';
import { utilities } from 'nest-winston';
export const winstonLogger = ()=> {

    return {
        transports: [
            new transports.Console({
                level:'debug',
                format: getDevFormat(),
            })
        ]
    }
}

const getDevFormat = () => {

    return format.combine(
        format.label({label:'dev'}),
        format.timestamp({
            format:'YYYY-MM-DD HH:mm:ss'
        }),
        format.colorize(),
        format.ms(),
        utilities.format.nestLike(),
        printFormat
    )

}

const printFormat = format.printf(({level,message,label,timestamp,ms})=>{
    return `${timestamp} ${ms} [${label}] ${level}: ${message}`;
})