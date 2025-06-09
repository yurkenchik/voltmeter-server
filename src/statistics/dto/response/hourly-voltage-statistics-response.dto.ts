import { ApiProperty } from "@nestjs/swagger";

export class HourlyVoltageStatDto {
    @ApiProperty()
    readonly hour: number;

    @ApiProperty()
    readonly min: number;

    @ApiProperty()
    readonly max: number;

    @ApiProperty()
    readonly average: number;

    @ApiProperty()
    readonly count: number;
}

export class HourlyVoltageStatisticsResponseDto {
    @ApiProperty()
    readonly date: string;

    @ApiProperty({ type: [HourlyVoltageStatDto] })
    readonly statistics: Array<HourlyVoltageStatDto>;
}