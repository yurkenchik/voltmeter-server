import { ApiProperty } from "@nestjs/swagger";

export class MeasuredVoltageResponseDto {
    @ApiProperty()
    readonly value: number;
}