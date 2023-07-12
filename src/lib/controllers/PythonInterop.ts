import { ServerAPI } from "decky-frontend-lib";
import { validatePresets } from "../Utils";
import { PresetsDictionary } from "../../components/presets/Presets";

/**
 * Class for frontend -> backend communication.
 */
export class PythonInterop {
  private static serverAPI: ServerAPI;

  /**
   * Sets the interop's severAPI.
   * @param serv The ServerAPI for the interop to use.
   */
  static setServer(serv: ServerAPI): void {
    this.serverAPI = serv;
  }

  /**
   * Gets the interop's serverAPI.
   */
  static get server(): ServerAPI { return this.serverAPI; }

  /**
   * Logs a message to the plugin's log file and the frontend console.
   * @param message The message to log.
   */
  static async log(message: String): Promise<void> {
    await this.serverAPI.callPluginMethod<{ message: string, level: number }, boolean>("logMessage", { message: `[front-end]: ${message}`, level: 2 });
  }

  /**
   * Logs a warning to the plugin's log file and the frontend console.
   * @param message The message to log.
   */
  static async warn(message: string): Promise<void> {
    await this.serverAPI.callPluginMethod<{ message: string, level: number }, boolean>("logMessage", { message: `[front-end]: ${message}`, level: 1 });
  }

  /**
   * Logs an error to the plugin's log file and the frontend console.
   * @param message The message to log.
   */
  static async error(message: string): Promise<void> {
    await this.serverAPI.callPluginMethod<{ message: string, level: number }, boolean>("logMessage", { message: `[front-end]: ${message}`, level: 2 });
  }

  /**
   * Gets the plugin's presets.
   * @returns A promise resolving to the plugin's presets.
   */
  static async getPresets(): Promise<PresetsDictionary | Error> {
    let result = await PythonInterop.serverAPI.callPluginMethod<{}, PresetsDictionary>("get_presets", {});

    if (result.success) {
      //* Verify the config data.
      if (!validatePresets(result.result)) {
        PythonInterop.error(`Presets were corrupted.`);
        PythonInterop.setPresets({});
        PythonInterop.toast("Error", "Config corrupted, please restart.");
        return {};
      }

      return result.result;
    } else {
      return new Error(result.result);
    }
  }

  /**
   * Gets the active preset.
   * @returns A promise resolving to the active preset.
   */
  static async getActivePreset(): Promise<string | null | Error> {
    let result = await PythonInterop.serverAPI.callPluginMethod<{}, string | null>("get_active_preset", {});

    if (result.success) {
      return result.result;
    } else {
      return new Error(result.result);
    }
  }

  /**
   * Sets the plugin's presets.
   * @param presets The plugin's presets.
   * @returns A promise resolving to whether or not the presets were successfully set.
   */
  static async setPresets(presets: PresetsDictionary): Promise<void | Error> {
    //* Verify the config
    if (!validatePresets(presets)) {
      PythonInterop.error(`Tabs were corrupted when trying to set.`);
      PythonInterop.toast("Error", "Config corrupted, please restart.");
      return;
    }

    let result = await PythonInterop.serverAPI.callPluginMethod<{ presets: PresetsDictionary, }, void>("set_tabs", { presets: presets });

    if (result.success) {
      return result.result;
    } else {
      return new Error(result.result);
    };
  }

  /**
   * Sets the plugin's active preset.
   * @param activePreset The plugin's active preset.
   * @returns A promise resolving to whether or not the active preset was successfully set.
   */
  static async setActivePreset(activePreset: string | null): Promise<void | Error> {
    let result = await PythonInterop.serverAPI.callPluginMethod<{ active_preset: string | null, }, void>("set_active_preset", { active_preset: activePreset });

    if (result.success) {
      return result.result;
    } else {
      return new Error(result.result);
    };
  }

  /**
   * Shows a toast message.
   * @param title The title of the toast.
   * @param message The message of the toast.
   */
  static toast(title: string, message: string): void {
    return (() => {
      try {
        return this.serverAPI.toaster.toast({
          title: title,
          body: message,
          duration: 8000,
        });
      } catch (e) {
        console.log("Toaster Error", e);
      }
    })();
  }
}
