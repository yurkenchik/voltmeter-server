import { ApiProperty } from "@nestjs/swagger";
import { VoltageStatus } from "src/shared/enums/voltage-status.enum";

export class VoltageStatusCountDto {
    @ApiProperty({ enum: ['High', 'Normal', 'Low', 'CriticalLow'] })
    readonly status: VoltageStatus;

    @ApiProperty()
    readonly count: number;
}

export class VoltageStatusCountResponseDto {
    @ApiProperty({ type: [VoltageStatusCountDto] })
    readonly statuses: Array<VoltageStatusCountDto>;
}