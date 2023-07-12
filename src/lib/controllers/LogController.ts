import { PythonInterop } from "./PythonInterop";

export class LogController {
  /**
   * Logs a message to the plugin's log file and the frontend console.
   * @param message The message to log.
   */
	static log(...args: any[]) {
    console.log(
      `%c Lock Deck %c INFO %c`,
      'background: #0eb01e; color: black;',
      'background: #1abc9c; color: black;',
      'background: transparent;',
      ...args
    );
    PythonInterop.log(args.join(" "));
  }

  /**
   * Logs a warning to the plugin's log file and the frontend console.
   */
	static warn(...args: any[]) {
    console.warn(
      `%c Lock Deck %c WARNING %c`,
      'background: #0eb01e; color: black;',
      'background: #e3c907; color: black;',
      'background: transparent;',
      ...args
    );
    PythonInterop.warn(args.join(" "));
  }

  /**
   * Logs an error to the plugin's log file and the frontend console.
   */
	static error(...args: any[]) {
    console.error(
      `%c Lock Deck %c ERROR %c`,
      'background: #0eb01e; color: black;',
      'background: #c70808; color: black;',
      'background: transparent;',
      ...args
    );
    PythonInterop.error(args.join(" "));
  }

  /**
   * Throws a new error and logs it to the plugin's log file.
   */
	static throw(...args: any[]) {
    PythonInterop.error(args.join(" "));
    throw new Error([`%c Lock Deck %c ERROR %c`, 'background: #0eb01e; color: black;', 'background: #c70808; color: black;', 'background: transparent;', ...args].join(' '));
  }
}
