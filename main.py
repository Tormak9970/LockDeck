import asyncio
import os
import decky_plugin
from settings import SettingsManager
from typing import TypeVar, Dict, List


def log(txt):
  decky_plugin.logger.info(txt)

def warn(txt):
  decky_plugin.logger.warn(txt)

def error(txt):
  decky_plugin.logger.error(txt)

Initialized = False

class Plugin:

  presets: Dict[str, dict] = None
  active_preset: str = None

  settings: SettingsManager

  async def logMessage(self, message, level):
    if level == 0:
      log(message)
    elif level == 1:
      warn(message)
    elif level == 2:
      error(message)

  # Plugin settings getters
  async def get_presets(self) -> Dict[str, dict] | None:
    """
    Waits until presets are loaded, then returns the presets

    :return: The presets
    """
    while Plugin.presets is None:
      await asyncio.sleep(0.1)
      
    log(f"Got presets {Plugin.presets}")
    return Plugin.presets
  
  async def get_active_preset(self) -> str | None:
    """
    Waits until the active preset is loaded, then returns it

    :return: The active preset
    """
    while Plugin.active_preset is None:
      await asyncio.sleep(0.1)
      
    log(f"Got active preset {Plugin.active_preset}")
    return Plugin.active_preset

  # Plugin settings setters
  async def set_presets(self, presets: Dict[str, dict]):
    Plugin.presets = presets
    await Plugin.set_setting(self, "presets", Plugin.presets)

  async def set_active_preset(self, active_preset: str):
    Plugin.active_preset = active_preset
    await Plugin.set_setting(self, "activePreset", Plugin.active_preset)

  async def read(self) -> None:
    """
    Reads the json from disk
    """
    Plugin.settings.read()
    Plugin.presets = await Plugin.get_setting(self, "presets", {})
    Plugin.active_preset = await Plugin.get_setting(self, "activePreset", "")

  T = TypeVar("T")

  # Plugin settingsManager wrappers
  async def get_setting(self, key, default: T) -> T:
    """
    Gets the specified setting from the json

    :param key: The key to get
    :param default: The default value
    :return: The value, or default if not found
    """
    return Plugin.settings.getSetting(key, default)

  async def set_setting(self, key, value: T) -> T:
    """
    Sets the specified setting in the json

    :param key: The key to set
    :param value: The value to set it to
    :return: The new value
    """
    Plugin.settings.setSetting(key, value)
    return value

  # Asyncio-compatible long-running code, executed in a task when the plugin is loaded
  async def _main(self):
    global Initialized

    if Initialized:
      return

    Initialized = True

    Plugin.settings = SettingsManager(name="settings", settings_directory=os.environ["DECKY_PLUGIN_SETTINGS_DIR"])
    await Plugin.read(self)

    log("Initializing Lock Deck.")

  # Function called first during the unload process, utilize this to handle your plugin being removed
  async def _unload(self):
    decky_plugin.logger.info("Unloading Lock Deck.")

  # Migrations that should be performed before entering `_main()`.
  async def _migration(self):
    pass
