import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { StatisticsService } from "src/statistics/statistics.service";
import { DailyVoltageStatisticsResponseDto } from "src/statistics/dto/response/daily-statistics-response.dto";
import { ApiParam, ApiResponse } from "@nestjs/swagger";
import {
    VoltageSummaryStatisticsResponseDto
} from "src/statistics/dto/response/voltage-summary-statistics-response.dto";
import { VoltageStatusCountResponseDto } from './dto/response/voltage-status-count-response.dto';
import { HourlyVoltageStatisticsResponseDto } from "src/statistics/dto/response/hourly-voltage-statistics-response.dto";

@Controller('statistics')
export class StatisticsController {
    constructor(private readonly statisticsService: StatisticsService) {}

    @ApiResponse({ type: DailyVoltageStatisticsResponseDto, status: HttpStatus.OK })
    @Get('daily')
    async getDailyStatistics(): Promise<DailyVoltageStatisticsResponseDto> {
        return this.statisticsService.getDailyStatistics();
    }

    @ApiResponse({ type: VoltageSummaryStatisticsResponseDto, status: HttpStatus.OK })
    @Get('summary')
    async getSummaryStatistics(): Promise<VoltageSummaryStatisticsResponseDto> {
        return this.statisticsService.getSummaryStatistics();
    }

    @ApiResponse({ type: VoltageStatusCountResponseDto, status: HttpStatus.OK })
    @Get('status-count')
    async getStatusCount(): Promise<VoltageStatusCountResponseDto> {
        return this.statisticsService.getStatusCount();
    }

    @ApiResponse({ type: HourlyVoltageStatisticsResponseDto, status: HttpStatus.OK })
    @ApiParam({ name: 'date', type: String })
    @Get('hourly/:date')
    async getHourlyStatistics(
        @Param('date') date: string,
    ): Promise<HourlyVoltageStatisticsResponseDto> {
        return this.statisticsService.getHourlyStatistics(date);
    }
}
