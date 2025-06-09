import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Voltage, VoltageSchema } from "src/voltage/voltage.schema";

@Module({
    providers: [StatisticsService],
    controllers: [StatisticsController],
    imports: [MongooseModule.forFeature([{ schema: VoltageSchema, name: Voltage.name }])],
    exports: [StatisticsService],
})
export class StatisticsModule {}
