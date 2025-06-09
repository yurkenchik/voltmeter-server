import { HttpException, HttpStatus } from "@nestjs/common";

export class ReceivedNotNumericSerialDataException extends HttpException {
    constructor() {
        super(
            'Received non-numeric serial data',
            HttpStatus.BAD_REQUEST
        );
    }
}