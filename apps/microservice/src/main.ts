import { NestFactory } from '@nestjs/core';
import { MicroserviceModule } from './microservice.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(MicroserviceModule, {
      bodyParser: false,
    });

    await app.listen(process.env.PORT_MICROSERVICE ?? 3000);
  } catch {
    process.exit(1);
  }
}
bootstrap();
