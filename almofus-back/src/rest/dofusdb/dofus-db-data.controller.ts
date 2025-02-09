import { Body, Controller, Post } from '@nestjs/common';
import { DofusDbDataService } from './dofus-db-data.service';
import { InitMobileDatesRequestDto } from './dto/mobile-dates.dto';

@Controller('/dofusdb')
export class DofusDbDataController {
  constructor(private dofusDbDataService: DofusDbDataService) {}

  @Post('/sync')
  async createDofusDbData() {
    await this.dofusDbDataService.syncDofusDbData();
  }

  @Post('/init_mobile_dates')
  async initMobileDates(@Body() initMobileDatesRequest: InitMobileDatesRequestDto) {
    await this.dofusDbDataService.initMobileDates(initMobileDatesRequest.year);
  }
}
