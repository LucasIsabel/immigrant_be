import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MicroserviceModule } from './microservice.module';

async function bootstrap() {
  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      MicroserviceModule,
      {
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT ?? '6379'),
          password: process.env.REDIS_PASSWORD,
          username: process.env.REDIS_USERNAME,
          wildcards: true,
          retryStrategy: (times: number) => {
            const delay = Math.min(times * 50, 2000);
            return delay;
          },
          reconnectOnError: (err: Error) => {
            const targetError = 'READONLY';
            if (err.message.includes(targetError)) {
              return true;
            }
            return false;
          },
        },
      },
    );

    await app.listen();
    console.log('Microservice is listening');
  } catch (error) {
    console.error('Error starting microservice:', error);
    process.exit(1);
  }
}
bootstrap();
