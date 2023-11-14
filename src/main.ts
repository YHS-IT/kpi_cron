import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { httpFilter } from './lib/httpFilter';


async function bootstrap() {
  let port = process.env.PORT || 3095;
  const app = await NestFactory.create(AppModule,{ cors:true });
  app.useGlobalFilters(new httpFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true,
      transform:true,
    })
  )
  
  await app.listen(port,()=>{
    console.log(`open PORT : ${port}`)
  });
}
bootstrap();
