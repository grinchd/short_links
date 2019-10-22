import { Controller, Get, Post, Body, Req, Redirect, Request } from '@nestjs/common';
import { AppService } from './app.service';


export class MinifyLinkDto {
  readonly link: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('*')
  @Redirect('https://google.com', 302)
  async navigate(@Req() req: Request) {
    const url = await this.appService.getCachedLink(req.url.replace('/', ''));
    return { url };
  }

  @Post('/minify')
  minify(@Body() minifyLinkDto: MinifyLinkDto): Promise<string> {
    return this.appService.minify(minifyLinkDto.link);
  }
}
