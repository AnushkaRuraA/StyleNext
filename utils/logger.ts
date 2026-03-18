import { createConsola } from "consola";

// Create a customized colored logger
export const consolaLogger = createConsola({
  level: 4, 
  defaults: {
    tag: "StyleNext",
  },
});

const logger = {
    info: (msg: string, ...args: any[]) => consolaLogger.info(msg, ...args),
    success: (msg: string, ...args: any[]) => consolaLogger.success(msg, ...args),
    warn: (msg: string, ...args: any[]) => consolaLogger.warn(msg, ...args),
    error: (msg: string, ...args: any[]) => consolaLogger.error(msg, ...args),
    api: (method: string, url: string, status: number, time?: number) => {
        const msg = `${method} ${url} ${status}${time ? ` (${time}ms)` : ''}`;
        if (status >= 200 && status < 300) {
            consolaLogger.success(msg);
        } else if (status >= 400 && status < 500) {
            consolaLogger.warn(msg);
        } else {
            consolaLogger.error(msg);
        }
    }
};

export default logger;
