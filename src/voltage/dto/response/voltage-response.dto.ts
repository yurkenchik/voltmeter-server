import { ApiProperty } from "@nestjs/swagger";
import { VoltageStatus } from "src/shared/enums/voltage-status.enum";

export class VoltageResponseDto {
    @ApiProperty()
    readonly value: number;

    @ApiProperty()
    readonly timestamp: Date;

    @ApiProperty()
    readonly status: VoltageStatus;
}