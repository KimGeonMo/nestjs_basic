import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    // console.log(exception);
    const message = exception.getResponse();
    const status = exception.getStatus();

    console.log('message:', message);

    response.status(status).json({
      success: false,
      date: new Date().toISOString(),
      message,
    });
  }
}
