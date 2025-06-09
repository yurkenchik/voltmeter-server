import { Module } from '@nestjs/common';
import { VoltageService } from './services/voltage.service';
import { VoltageGateway } from './voltage.gateway';
import { SerialListenerService } from "src/voltage/services/serial-listener.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Voltage, VoltageSchema } from "src/voltage/voltage.schema";
import { VoltageController } from "src/voltage/voltage.controller";

@Module({
    controllers: [VoltageController],
    providers: [VoltageService, VoltageGateway, SerialListenerService],
    imports: [MongooseModule.forFeature([{ schema: VoltageSchema, name: Voltage.name }])],
    exports: [VoltageService, SerialListenerService],
})
export class VoltageModule {}
