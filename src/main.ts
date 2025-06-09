import { NestFactory } from '@nestjs/core';
import { Logger } from "@nestjs/common";
import { AppModule } from './app/app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { color } from "src/shared/utils/logger-colors";

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    const logger: Logger = new Logger('Launcher');
    const configService = app.get(ConfigService);

    const PORT: number = configService.get<number>('PORT') || 3000;

    const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
        .setTitle("Voltmeter server API documentation")
        .setDescription("Here you, as will be able all data from backend")
        .setVersion("1.0.0")
        .addTag("Voltmeter server")
        .build();

    app.setGlobalPrefix('api');

    const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("/api/docs", app, document);

    app.enableCors();

    await app.listen(PORT, (): void =>
        logger.log(
            color.underline(color.bold(color.purple(`Server is running on port: ${PORT}`)))
        )
    );
}
bootstrap();
