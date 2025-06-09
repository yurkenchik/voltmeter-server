import { Injectable } from "@nestjs/common";
import { SaveVoltageReadingDto } from "src/voltage/dto/request/save-voltage-reading.dto";
import { Voltage } from "src/voltage/voltage.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PaginationResponseDto } from "src/shared/dto/response/pagination-response.dto";
import {
    GetVoltageReadingsFilterOptionsDto,
} from "src/voltage/dto/request/voltage-readings-filter-options.dto";
import { VoltageStatus } from "src/shared/enums/voltage-status.enum";

@Injectable()
export class VoltageService {
    constructor(
        @InjectModel(Voltage.name)
        private readonly voltageModel: Model<Voltage>,
    ) {}

    async saveVoltageReading(saveVoltageReadingDto: SaveVoltageReadingDto): Promise<Voltage> {
        return this.voltageModel.create({
            ...saveVoltageReadingDto,
            timestamp: saveVoltageReadingDto.timestamp ?? new Date(),
        });
    }

    async getLatestReadings(limit: number = 10): Promise<Array<Voltage>> {
        return this.voltageModel
            .find()
            .sort({ timestamp: -1 })
            .limit(limit)
            .exec();
    }

    async getVoltageReadingsHistory(
        getVoltageReadingsFilterOptionsDto: GetVoltageReadingsFilterOptionsDto,
    ): Promise<PaginationResponseDto<Voltage>> {
        const { page = 1, limit = 10, status } = getVoltageReadingsFilterOptionsDto;
        const skip = (Number(page) - 1) * limit;

        const filter: Record<string, VoltageStatus> = {};

        if (status) {
            filter.status = status;
        }

        const [content, total] = await Promise.all([
            this.voltageModel
                .find(filter)
                .sort({ timestamp: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.voltageModel.countDocuments(filter),
        ]);

        const isLastPage = skip + content.length >= total;

        return {
            content,
            total,
            isLastPage,
            page: Number(page),
        };
    }
}
