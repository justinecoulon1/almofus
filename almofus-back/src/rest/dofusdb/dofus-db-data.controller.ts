import { Controller } from '@nestjs/common';
import { DofusDbDataService } from './dofus-db-data.service';

@Controller('/dofusdb')
export class DofusDbDataController {
    constructor(private dofusDbDataService: DofusDbDataService) { }

}
