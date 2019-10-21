import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';


export class MinifyLinkDto {
  readonly link: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/minify')
  minify(@Body() minifyLinkDto: MinifyLinkDto): Promise<string> {
    return this.appService.minify(minifyLinkDto.link);
  }
}
