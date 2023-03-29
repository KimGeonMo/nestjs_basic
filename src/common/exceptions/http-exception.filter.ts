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
    const message = exception.message as
      | string
      | { statusCode: number; message: string };
    const status = exception.getStatus();

    this.logger.debug(`tpyeof message : ${typeof message}`);

    if (typeof message === 'string') {
      response.status(status).json({
        success: false,
        date: new Date().toISOString(),
        message,
      });
    } else {
      response.status(status).json({
        success: false,
        date: new Date().toISOString(),
        ...message,
      });
    }
  }
}
