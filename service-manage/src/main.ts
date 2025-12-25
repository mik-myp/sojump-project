import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
  });

  const config = new DocumentBuilder()
    .setTitle('API 文档')
    .setDescription('接口说明')
    .setVersion('1.0.0')
    .addBearerAuth() // 支持 Authorization: Bearer xxx
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // http://localhost:8888/docs

  await app.listen(process.env.PORT ?? 8888);
}
bootstrap();
