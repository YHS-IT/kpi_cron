import { Controller, Get } from '@nestjs/common';
import { CronService } from './cron.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/cron')
@ApiTags('Cron')

export class CronController {
  constructor(private readonly cronService: CronService) {}
  @ApiOperation({summary: 'Kpi Level1 데이터를 넣는 api'})
  @Get('/levelOne')
  async levelOne() {
    await this.cronService.levelOne();
  }

  @ApiOperation({summary: 'Kpi Level2 데이터를 넣는 api'})
  @Get('/levelTwo')
  async levelTwo() {
    await this.cronService.levelTwo();
  }

  @ApiOperation({summary: 'Kpi Level3 데이터를 넣는 api'})
  @Get('/levelThree')
  async levelThree() {
    await this.cronService.levelThree();
  }

}