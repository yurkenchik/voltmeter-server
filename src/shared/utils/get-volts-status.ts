import { VoltageStatus } from "src/shared/enums/voltage-status.enum";

export function getVoltsStatus(volts: number): VoltageStatus {
    switch (true) {
        case volts >= 4.5:
            return VoltageStatus.HIGH;
        case volts >= 3.3:
            return VoltageStatus.NORMAL;
        case volts >= 2.0:
            return VoltageStatus.LOW;
        default:
            return VoltageStatus.CRITICAL_LOW;
    }
}