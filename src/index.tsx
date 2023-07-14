import {
  definePlugin,
  DialogButton,
  Field,
  Focusable,
  PanelSection,
  Patch,
  ReorderableEntry,
  ReorderableList,
  ServerAPI,
  showModal,
  staticClasses,
} from "decky-frontend-lib";
import { VFC, Fragment, useState, useEffect } from "react";

import { FaCircleCheck } from "react-icons/fa6";

import { PluginController } from "./lib/controllers/PluginController";
import { PythonInterop } from "./lib/controllers/PythonInterop";

import { LockDeckManager } from "./state/LockDeckManager";

import { QamStyles } from "./components/styles/QamStyles";
import { LockDeckContextProvider, useLockDeckContext } from "./state/LockDeckContext";
import { EditablePreset, Preset, presetDefaults } from "./components/presets/Presets";
import { PluginIcon } from "./components/PluginIcon";
import { PresetActionsButton } from "./components/PresetActionsButton";
import { EditPresetModal } from "./components/modals/EditPresetModal";
import { getLockScreen, patchLockScreen } from "./patches/LockScreenPatch";

declare global {
  let DeckyPluginLoader: any;
  var SteamClient: SteamClient;
  let loginStore: LoginStore;
  //* This casing is correct, idk why it doesn't match the others.
  let securitystore: SecurityStore;
}

type PresetIdEntryType = {
  id: string;
};

interface PresetEntryInteractablesProps {
  entry: ReorderableEntry<PresetIdEntryType>;
}

function makePresetList(presetMap: Map<string, Preset>): Preset[] {
  return Array.from(presetMap.values());
}

/**
 * The Quick Access Menu content for TabMaster.
 */
const Content: VFC<{}> = ({ }) => {
  const { activePreset, presetsMap, lockDeckManager } = useLockDeckContext();
  const [ presetsList, setPresetsList ] = useState<Preset[]>(makePresetList(presetsMap));

  useEffect(() => {
    setPresetsList(makePresetList(presetsMap));
  }, [presetsMap]);

  function PresetEntryInteractables({ entry }: PresetEntryInteractablesProps) {
    const preset = presetsMap.get(entry.data!.id)!;
    return (<PresetActionsButton {...{ preset, lockDeckManager }} />);
  }

  function onAddClicked() {
    showModal(
      <EditPresetModal
        onConfirm={(_: any, newPreset: EditablePreset) => {
          lockDeckManager.createPreset(newPreset);
        }}
        presetOptions={JSON.parse(JSON.stringify(presetDefaults))}

        lockDeckManager={lockDeckManager}
      />
    );
  }

  const entries = presetsList.map((preset) => {
    return {
      label:
        <div className="preset-label-cont">
          <div className="preset-label">{preset.title}</div>
          {activePreset === preset.id ? <FaCircleCheck fill="#0eb01e" /> : <Fragment />}
        </div>,
      position: preset.position,
      data: { id: preset.id }
    };
  });

  return (
    <>
      <QamStyles />
      <div className="lock-deck-scope">
        <div style={{ margin: "5px", marginTop: "0px" }}>
          Here you can add, edit, and activate your lockscreen presets.
        </div>
        <Field className="no-sep">
          <Focusable className="add-preset-btn" style={{ width: "100%" }}>
            <DialogButton onClick={onAddClicked} onOKActionDescription={'Add Preset'}>
              Add Preset
            </DialogButton>
          </Focusable>
        </Field>
        <PanelSection title="Presets">
          <div className="seperator"></div>
          {lockDeckManager.hasSettingsLoaded ? (
            <ReorderableList<PresetIdEntryType>
              entries={entries}
              interactables={PresetEntryInteractables}
              onSave={(entries: ReorderableEntry<PresetIdEntryType>[]) => {
                lockDeckManager.reorderPresets(entries.map(entry => entry.data!.id));
              }}
            />
          ) : (
            <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: "5px" }}>
              Loading...
            </div>
          )}
        </PanelSection>
      </div>
    </>
  );
};


export default definePlugin((serverAPI: ServerAPI) => {
  let lockScreenPatch: Patch | undefined;

  PythonInterop.setServer(serverAPI);
  const lockDeckManager = new LockDeckManager();
  PluginController.setup(serverAPI, lockDeckManager);

  const loginUnregisterer = PluginController.initOnLogin(async () => {
    await lockDeckManager.loadPresets();

    getLockScreen().then((lockScreen) => {
      patchLockScreen(lockScreen, lockDeckManager);
    })
  });

  return {
    title: <div className={staticClasses.Title}>Lock Deck</div>,
    content:
      <LockDeckContextProvider lockDeckManager={lockDeckManager}>
        <Content />
      </LockDeckContextProvider>,
    icon: <PluginIcon />,
    onDismount: () => {
      lockScreenPatch?.unpatch();

      loginUnregisterer.unregister();
      PluginController.dismount();
    },
  };
});

