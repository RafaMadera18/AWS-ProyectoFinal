import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly existingRoutes = ['/alumnos', '/profesores'];

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    }

    // Convertir 404 a 405 si la ruta existe pero el método no está soportado
    if (
      status === HttpStatus.NOT_FOUND &&
      exception instanceof NotFoundException
    ) {
      const path = request.path;
      const isExistingRoute = this.existingRoutes.includes(path);

      if (isExistingRoute) {
        status = HttpStatus.METHOD_NOT_ALLOWED;
        message = {
          statusCode: 405,
          message: 'Method Not Allowed',
          error: 'Method Not Allowed',
        };
      }
    }

    response.status(status).json(message);
  }
}
