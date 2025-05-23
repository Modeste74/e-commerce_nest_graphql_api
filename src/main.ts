import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Intialize Passport middleware to handle JWT
  app.use(passport.initialize());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();