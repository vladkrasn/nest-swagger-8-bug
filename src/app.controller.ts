import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ObjectListInput } from './demonstration.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(
    @Query() input: ObjectListInput
  ): string {
    return this.appService.getHello();
  }
}
