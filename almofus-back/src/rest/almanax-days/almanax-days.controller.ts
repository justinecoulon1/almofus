import { Controller } from '@nestjs/common';
import { AlmanaxDaysService } from './almanax-days.service';

@Controller('/days')
export class AlmanaxDaysController {
  constructor(private readonly almanaxDaysService: AlmanaxDaysService) {}
}
