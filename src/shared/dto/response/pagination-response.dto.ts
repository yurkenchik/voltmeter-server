import { ApiProperty } from "@nestjs/swagger";

export class PaginationResponseDto<ContentType> {
    @ApiProperty({ type: [Object] })
    readonly content: Array<ContentType>;

    @ApiProperty()
    readonly total: number;

    @ApiProperty()
    readonly isLastPage: boolean;

    @ApiProperty()
    readonly page: number;
}