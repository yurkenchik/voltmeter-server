import { ApiProperty } from "@nestjs/swagger";
import { VoltageStatus } from "src/shared/enums/voltage-status.enum";

export class SaveVoltageReadingDto {
    @ApiProperty()
    readonly volts: number;

    @ApiProperty()
    readonly timestamp: Date;

    @ApiProperty()
    readonly status: VoltageStatus;
}