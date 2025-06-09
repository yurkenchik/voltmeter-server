import { ApiProperty } from "@nestjs/swagger";
import { VoltageStatus } from "src/shared/enums/voltage-status.enum";

export class AnomalousVoltageRecordDto {
    @ApiProperty()
    readonly _id: string;

    @ApiProperty()
    readonly volts: number;

    @ApiProperty({ enum: VoltageStatus })
    readonly status: VoltageStatus;

    @ApiProperty()
    readonly timestamp: Date;
}

export class AnomaliesResponseDto {
    @ApiProperty({ type: [AnomalousVoltageRecordDto] })
    readonly records: Array<AnomalousVoltageRecordDto>;
}