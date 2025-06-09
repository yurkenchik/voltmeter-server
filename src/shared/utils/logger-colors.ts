export const color = {
    black: (msg: string) => `\x1b[30m${msg}\x1b[0m`,
    red: (msg: string) => `\x1b[31m${msg}\x1b[0m`,
    green: (msg: string) => `\x1b[32m${msg}\x1b[0m`,
    yellow: (msg: string) => `\x1b[33m${msg}\x1b[0m`,
    blue: (msg: string) => `\x1b[34m${msg}\x1b[0m`,
    purple: (msg: string) => `\x1b[35m${msg}\x1b[0m`,
    cyan: (msg: string) => `\x1b[36m${msg}\x1b[0m`,
    white: (msg: string) => `\x1b[37m${msg}\x1b[0m`,

    bold: (msg: string) => `\x1b[1m${msg}\x1b[0m`,
    underline: (msg: string) => `\x1b[4m${msg}\x1b[0m`,
    reversed: (msg: string) => `\x1b[7m${msg}\x1b[0m`,
};