import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { StatisticService } from './statistic.service';

@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Get()
  @Public()
  async statistic() {
    return await this.statisticService.statistic();
  }
}
