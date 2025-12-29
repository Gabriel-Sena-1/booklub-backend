import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Booklub API')
    .setDescription('API de usuários, livros e progresso de leitura 📚')
    .setVersion('1.0')
    .addBearerAuth() // 🔒 caso use JWT futuramente
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // acessa em http://localhost:3000/docs

  await app.listen(3000);
}

bootstrap();
