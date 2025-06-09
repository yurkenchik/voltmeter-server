import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppService {
    constructor(private readonly configService: ConfigService) {}

    checkServer(): string {
        return `Server is working and running on port: ${
            this.configService.get<number>('PORT')
        }`;
    }
}
