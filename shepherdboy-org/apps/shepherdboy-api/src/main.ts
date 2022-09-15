// /**
//  * This is not a production server yet!
//  * This is only a minimal backend to get started.
//  */

// import { Logger } from '@nestjs/common';
// import { NestFactory } from '@nestjs/core';

// import { AppModule } from './app/app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const globalPrefix = 'shepherdboy';
//   app.setGlobalPrefix(globalPrefix);
//   const port = process.env.PORT || 3333;
//   await app.listen(port);
//   Logger.log(
//     `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
//   );
// }

// bootstrap();

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './app/core/filter/http-exception.filter';
import { NotFoundInterceptor } from './app/core/interceptor/not-found.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.useGlobalInterceptors(new NotFoundInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages:
        process.env.NODE_ENV === 'PRODUCTION' ? true : false,
    })
  );
  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
