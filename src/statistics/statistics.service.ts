import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Voltage } from 'src/voltage/voltage.schema';
import { Model } from "mongoose";
import { DailyVoltageStatisticsResponseDto } from "src/statistics/dto/response/daily-statistics-response.dto";
import {
    VoltageSummaryStatisticsResponseDto
} from "src/statistics/dto/response/voltage-summary-statistics-response.dto";
import { VoltageStatusCountResponseDto } from "src/statistics/dto/response/voltage-status-count-response.dto";
import { HourlyVoltageStatisticsResponseDto } from "src/statistics/dto/response/hourly-voltage-statistics-response.dto";

@Injectable()
export class StatisticsService {
    constructor(
        @InjectModel(Voltage.name)
        private readonly voltageModel: Model<Voltage>
    ) {}

    async getDailyStatistics(): Promise<DailyVoltageStatisticsResponseDto> {
        const statistics = await this.voltageModel.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                    average: { $avg: "$volts" },
                    min: { $min: "$volts" },
                    max: { $max: "$volts" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: -1 } }
        ]);

        return { statistics };
    }

    async getSummaryStatistics(): Promise<VoltageSummaryStatisticsResponseDto> {
        const [summary] = await this.voltageModel.aggregate([
            {
                $group: {
                    _id: null,
                    minVoltage: { $min: "$volts" },
                    maxVoltage: { $max: "$volts" },
                    averageVoltage: { $avg: "$volts" },
                    totalRecords: { $sum: 1 },
                }
            }
        ]);

        const firstVoltageReading = await this.voltageModel
            .findOne()
            .sort({ timestamp: 1 })
            .limit(1);

        const latestVoltageReading = await this.voltageModel
            .findOne()
            .sort({ timestamp: -1 })
            .limit(1);

        return {
            ...summary,
            firstVoltageReading,
            latestVoltageReading,
        };
    }

    async getStatusCount(): Promise<VoltageStatusCountResponseDto> {
        const statusCount = await this.voltageModel.aggregate([{
            $group: { _id: "$status", count: { $sum: 1 } }
        }]);

        return {
            statuses: statusCount.map((item) => ({
                status: item._id,
                count: item.count,
            })),
        }
    }

    async getHourlyStatistics(date: string): Promise<HourlyVoltageStatisticsResponseDto> {
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 1);

        const statistics = await this.voltageModel.aggregate([
            { $match: { timestamp: { $gte: startDate, $lt: endDate } } },
            { $group: { _id: { $hour: "$timestamp" }, avg: { $avg: "$volts" } }},
            { $sort: { _id: 1 } }
        ]);

        return { date, statistics };
    }
}
