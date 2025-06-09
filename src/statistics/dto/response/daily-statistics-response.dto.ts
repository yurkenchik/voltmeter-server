import { ApiProperty } from "@nestjs/swagger";

export class DailyVoltageStatisticsDto {
    @ApiProperty()
    readonly date: string;

    @ApiProperty()
    readonly min: number;

    @ApiProperty()
    readonly max: number;

    @ApiProperty()
    readonly average: number;

    @ApiProperty()
    readonly count: number;
}

export class DailyVoltageStatisticsResponseDto {
    @ApiProperty({ type: [DailyVoltageStatisticsDto] })
    readonly statistics: Array<DailyVoltageStatisticsDto>;
}