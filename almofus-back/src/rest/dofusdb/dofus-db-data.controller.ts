import { Controller, Post } from '@nestjs/common';
import { DofusDbDataService } from './dofus-db-data.service';

@Controller('/dofusdb')
export class DofusDbDataController {
  constructor(private dofusDbDataService: DofusDbDataService) {}

  @Post()
  async createDofusDbData() {
    await this.dofusDbDataService.mapDofusDbDataToEntities();
  }
}
