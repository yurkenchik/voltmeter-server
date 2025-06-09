import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { VoltageStatus } from "src/shared/enums/voltage-status.enum";
import { PaginationRequestDto } from "src/shared/dto/request/pagination-request.dto";

export class GetVoltageReadingsFilterOptionsDto extends PaginationRequestDto {
    @ApiProperty({ enum: ['High', 'Normal', 'Low', 'CriticalLow'] })
    @IsOptional()
    readonly status?: VoltageStatus;
}