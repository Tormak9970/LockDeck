import { PythonInterop } from "../lib/controllers/PythonInterop";
import { v4 as uuidv4 } from "uuid";
import { Preset, EditablePreset, PresetsDictionary } from "../components/presets/Presets";
import { LogController } from "../lib/controllers/LogController";

/**
 * Class that handles TabMaster's core state.
 */
export class LockDeckManager {
  private presetsMap: Map<string, Preset>;
  private activePreset: string | null;

  private hasLoaded: boolean;


  public eventBus = new EventTarget();

  /**
   * Creates a new TabMasterManager.
   */
  constructor() {
    this.hasLoaded = false;
    this.presetsMap = new Map<string, Preset>();
    this.activePreset = null;
  }

  setActivePreset(id: string | null) {
    this.activePreset = id;
    this.updateAndSave();
  }

  /**
   * Updates the settings for a preset.
   * @param presetId The id of the preset.
   * @param updatedSettings The new settings for the preset.
   */
  updatePreset(presetId: string, updatedSettings: EditablePreset) {
    this.presetsMap.set(presetId, { id: presetId, ...updatedSettings, position: this.presetsMap.get(presetId)!.position });
    this.updateAndSave();
  }

  /**
   * Reorders the presets.
   * @param newIdsOrder The updated order of presets.
   */
  reorderPresets(newIdsOrder: string[]) {
    for (let i = 0; i < newIdsOrder.length; i++) {
      this.presetsMap.get(newIdsOrder[i])!.position = i;
    }

    this.updateAndSave();
  }

  /**
   * Deletes a preset.
   * @param presetId The id of the preset to delete.
   */
  deletePreset(presetId: string) {
    const preset = this.presetsMap.get(presetId)!;

    if (this.activePreset === preset.id) {
      LogController.throw("Haven't handled what happens when active preset is deleted!");
    }
    
    this.presetsMap.delete(presetId);
    this.updateAndSave();
  }

  /**
   * Creates a new preset.
   * @param newPreset The options for the new preset.
   */
  createPreset(newPreset: EditablePreset) {
    const id = uuidv4();
    this.presetsMap.set(id, { id, ...newPreset, position: this.presetsMap.size });
    this.updateAndSave();
  }

  /**
   * Loads the user's presets from the backend.
   */
  loadPresets = async () => {
    const presets = await PythonInterop.getPresets();
    const activePreset = await PythonInterop.getActivePreset();

    if (presets instanceof Error) {
      LogController.log("Couldn't load presets");
      return;
    }
    if (activePreset instanceof Error) {
      LogController.log("Couldn't load activePreset");
      return;
    }

    for (const preset of Object.values(presets)) {
      this.presetsMap.set(preset.id, preset);
    }

    this.activePreset = activePreset;
  };

  /**
   * Gets the user's presets.
   * @returns The presetsMap.
   */
  getPresets() {
    return {
      presetsMap: this.presetsMap
    };
  }

  /**
   * Gets the active preset id.
   * @returns The active preset id, or null.
   */
  getActivePreset(): string | null {
    return this.activePreset;
  }

  get hasSettingsLoaded() {
    return this.hasLoaded;
  }

  /**
   * Saves the presets to the backend.
   */
  private savePresets() {
    LogController.log('Saving Presets...');

    const presetsDictionary: PresetsDictionary = {};

    this.presetsMap.forEach((preset) => {
      presetsDictionary[preset.id] = preset;
    });

    PythonInterop.setPresets(presetsDictionary);
  }

  /**
   * Saves presets and dispatches event to update context provider.
   */
  private updateAndSave() {
    this.savePresets();
    PythonInterop.setActivePreset(this.activePreset);
    this.update();
  }

  /**
   * Dispatches event to update context provider.
   */
  private update() {
    this.eventBus.dispatchEvent(new Event("stateUpdate"));
  }

  /**
   * Handles any cleanup needed for the lock deck manager.
   */
  dispose() {

  }
}
