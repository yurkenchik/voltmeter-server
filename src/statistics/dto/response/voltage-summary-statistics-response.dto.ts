import { ApiProperty } from "@nestjs/swagger";
import { Voltage } from "src/voltage/voltage.schema";

export class VoltageSummaryStatisticsResponseDto {
    @ApiProperty()
    readonly _id: number;

    @ApiProperty()
    readonly minVoltage: number;

    @ApiProperty()
    readonly maxVoltage: number;

    @ApiProperty()
    readonly averageVoltage: number;

    @ApiProperty()
    readonly totalRecords: number;

    @ApiProperty({ type: Voltage })
    readonly firstVoltageReading: Voltage;

    @ApiProperty({ type: Voltage })
    readonly latestVoltageReading: Voltage;
}