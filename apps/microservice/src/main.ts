import { NestFactory } from '@nestjs/core';
import { MicroserviceModule } from './microservice.module';

async function bootstrap() {
  try {
    const app = await NestFactory.createApplicationContext(MicroserviceModule);
    app.enableShutdownHooks();

    process.on('SIGTERM', () => {
      void app.close().then(() => process.exit(0));
    });
  } catch {
    process.exit(1);
  }
}
bootstrap();
