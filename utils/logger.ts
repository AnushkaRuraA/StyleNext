import { createConsola } from "consola";

// Create a customized colored logger
export const logger = createConsola({
  level: 4, // 0: fatal/error, 1: warn, 2: log/info, 3: success, 4: debug, 5: trace
  defaults: {
    tag: "StyleNext",
  },
  formatOptions: {
    colors: true,
    date: true,
  },
});

export default logger;
