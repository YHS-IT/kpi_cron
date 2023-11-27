import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { WinstonModule } from 'nest-winston';
import { winstonLogger } from './lib/winstonLogger';
import { ConfigModule } from '@nestjs/config';
import { CustomLogger } from './lib/typeorm.customLogger';
import { CronModule } from './cron/cron.module';
import { Logger } from 'winston';
import { CronController } from './cron/cron.controller';
@Module({
  imports: [
    // winstonLogger
    WinstonModule.forRoot(winstonLogger()),
    // .env file
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: process.env.NODE_ENV ? '.env.prod' : '.env',
    }),
    // db 연결 
    TypeOrmModule.forRoot({
      type:'mysql',
      host:process.env.DB_HOST,
      port:parseInt(process.env.DB_PORT),
      database:process.env.DB_DATABASE,
      username:process.env.DB_USER,
      password:process.env.DB_PASSWORD,
      timezone: 'Asia/Seoul',
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
      entities:[
        __dirname +'/entities/*{.ts,.js}'
      ],
      poolSize:10,
      extra:{
        socketPath: process.env.DB_SOCKETPATH
      },
      logger: new CustomLogger(true),
    }),
    CronModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
