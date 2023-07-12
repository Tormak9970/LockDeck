import { ServerAPI } from "decky-frontend-lib";
import { PythonInterop } from "./PythonInterop";
import { SteamController } from "./SteamController";
import { LogController } from "./LogController";
import { LockDeckManager } from "../../state/LockDeckManager";

/**
 * Main controller class for the plugin.
 */
export class PluginController {
  // @ts-ignore
  private static server: ServerAPI;
  private static lockDeckManager: LockDeckManager;

  private static steamController: SteamController;

  /**
   * Sets the plugin's serverAPI.
   * @param server The serverAPI to use.
   */
  static setup(server: ServerAPI, tabMasterManager: LockDeckManager): void {
    this.server = server;
    this.lockDeckManager = tabMasterManager;
    this.steamController = new SteamController();
  }

  /**
   * Sets the plugin to initialize once the user logs in.
   * @returns The unregister function for the login hook.
   */
  static initOnLogin(onMount: () => Promise<void>): Unregisterer {
    return this.steamController.registerForAuthStateChange(async () => {
      // LogController.log(`User logged in. [DEBUG] username: ${username}.`);
      if (await this.steamController.waitForServicesToInitialize()) {
        PluginController.init();
        onMount();
      } else {
        PythonInterop.toast("Error", "Lock Deck failed to initialize, try restarting.");
      }
    }, null, true, true);
  }

  /**
   * Initializes the Plugin.
   */
  static async init(): Promise<void> {
    LogController.log("PluginController initialized.");
  }

  /**
   * Function to run when the plugin dismounts.
   */
  static dismount(): void {
    this.lockDeckManager.dispose();
    LogController.log("PluginController dismounted.");
  }
}
