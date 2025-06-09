import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { VoltageStatus } from "src/shared/enums/voltage-status.enum";

@Schema()
export class Voltage {
    @Prop()
    volts: number;

    @Prop()
    timestamp: Date;

    @Prop()
    status: VoltageStatus;
}

export const VoltageSchema = SchemaFactory.createForClass(Voltage);