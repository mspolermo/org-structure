import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function start() {
    const PORT = process.env.PORT || 5001;
    const app = await NestFactory.create(AppModule);

    const clientOrigin = 'http://localhost:5173'; // Порт клиента
    const extensionOrigin =
        'chrome-extension://pogagdbencbpdbamblmemmgllkalooia'; // ИД расширения

    app.enableCors({
        origin: [clientOrigin, extensionOrigin],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        allowedHeaders: 'Content-Type, Authorization',
    });

    const config = new DocumentBuilder()
        .setTitle('Организационная структура')
        .setDescription('Документация REST API оргструктуры компании')
        .setVersion('0.0.1')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(PORT, () => {
        console.log('Server started on PORT: ' + PORT);
    });
}

start();
