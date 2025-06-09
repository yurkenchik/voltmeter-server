import { Controller, Get, HttpStatus, Query } from "@nestjs/common";
import { VoltageService } from "src/voltage/services/voltage.service";
import { PaginationResponseDto } from "src/shared/dto/response/pagination-response.dto";
import { Voltage } from "src/voltage/voltage.schema";
import { PaginationRequestDto } from "src/shared/dto/request/pagination-request.dto";
import {
    GetVoltageReadingsFilterOptionsDto,
} from "src/voltage/dto/request/voltage-readings-filter-options.dto";
import { ApiQuery, ApiResponse } from "@nestjs/swagger";

@Controller('voltage')
export class VoltageController {
    constructor(private readonly voltageService: VoltageService) {}

    @ApiResponse({ type: PaginationResponseDto<Voltage>, status: HttpStatus.OK })
    @ApiQuery({ type: PaginationRequestDto })
    @ApiQuery({ type: GetVoltageReadingsFilterOptionsDto })
    @Get('history')
    async getVoltageReadingsHistory(
        @Query() getVoltageReadingsFilterOptionsDto: GetVoltageReadingsFilterOptionsDto
    ): Promise<PaginationResponseDto<Voltage>> {
        return this.voltageService.getVoltageReadingsHistory(getVoltageReadingsFilterOptionsDto);
    }

    @ApiResponse({ type: [Voltage], status: HttpStatus.OK })
    @ApiQuery({ name: 'limit', type: Number })
    @Get('latest')
    async getLatestReadings(
        @Query('limit') limit: number,
    ): Promise<Array<Voltage>> {
        return this.voltageService.getLatestReadings(limit);
    }
}