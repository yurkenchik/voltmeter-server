import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ReadlineParser, SerialPort } from "serialport";
import { ConfigService } from "@nestjs/config";
import {
    ReceivedNotNumericSerialDataException
} from "src/shared/exceptions/received-not-numeric-serial-data.exception";
import { VoltageService } from "src/voltage/services/voltage.service";
import { getVoltsStatus } from "src/shared/utils/get-volts-status";
import { color } from "src/shared/utils/logger-colors";
import { MeasuredVoltageResponseDto } from "src/statistics/dto/response/measured-voltage-response.dto";

@Injectable()
export class SerialListenerService implements OnModuleInit {
    private readonly logger: Logger = new Logger(SerialListenerService.name);
    private serialPort: SerialPort;
    private readlineParser: ReadlineParser;

    constructor(
        private readonly voltageService: VoltageService,
        private readonly configService: ConfigService,
    ) {}

    onModuleInit(): void {
        this.initializeSerialPort(
            this.configService.get<string>('SERIAL_PORT_PATH'),
            Number(this.configService.get<number>('SERIAL_PORT_BAUD_RATE')),
        );

        this.logger.log(color.cyan('Serial port listener initialized'));
    }

    initializeSerialPort(path: string, baudRate: number): void {
        this.serialPort = new SerialPort({ path, baudRate });
        this.readlineParser = this.serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));

        this.setUpListeners();
    }

    private setUpListeners(): void {
        this.readlineParser.on('data', (line: string) => this.handleSerialPortResponseData(line));
        this.serialPort.on('error', (error: Error) => this.handleError(error));
        this.serialPort.on('close', () => this.handleClose());
    }

    private async handleSerialPortResponseData(serialPortLine: string): Promise<void> {
        const measuredVoltageData: MeasuredVoltageResponseDto = JSON.parse(serialPortLine.trim());
        const { value } = measuredVoltageData;

        if (isNaN(value)) {
            throw new ReceivedNotNumericSerialDataException();
        }

        await this.voltageService.saveVoltageReading({
            volts: value,
            timestamp: new Date(),
            status: getVoltsStatus(value),
        });
    }

    private handleError(error: Error): void {
        this.logger.error('Serial port error:', error.message);
    }

    private handleClose(): void {
        this.logger.log('Serial port closed');
    }

    public closeConnection() {
        this.serialPort.close();
    }

    public reconnect(): void {
        this.closeConnection();
        setTimeout(() =>
            this.initializeSerialPort(this.serialPort.path, this.serialPort.baudRate),
        1000
        );
    }
}