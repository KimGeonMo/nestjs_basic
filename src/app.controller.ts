import { Controller, Get, Req, Body, Param } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

// localhost:3000/cats/hello/testid/name
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello/:id/:name')
  getHelloCustom(
    @Req() req: Request,
    @Body() body,
    @Param() param: { id: string; name: string },
  ): string {
    // Request
    console.log(req);

    // body
    // const body = req.body; // express에서 사용할 때
    console.log('body', body); // @Body를 이용해 사용
    // body { id: 'test' }

    // Params
    // const param = req.params; // express에서 사용할 때
    console.log('param', param); // nest에서 사용할 때
    // param { id: 'testid', name: 'name' }

    return this.appService.getHello();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
