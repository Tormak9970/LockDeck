import { MenuItem, showModal, ConfirmModal, Menu, showContextMenu, DialogButton } from "decky-frontend-lib"
import { VFC } from "react"
import { FaEllipsisH } from "react-icons/fa"
import { EditablePreset, Preset } from "./presets/Presets"
import { LockDeckManager } from "../state/LockDeckManager"
import { EditPresetModal } from "./modals/EditPresetModal"

interface PresetActionsContextMenuProps {
  preset: Preset,
  lockDeckManager: LockDeckManager
}

/**
 * The context menu for preset actions.
 */
export const PresetActionsContextMenu: VFC<PresetActionsContextMenuProps> = ({ preset, lockDeckManager }) => {
  return (
    <Menu label="Actions">
      <MenuItem onSelected={() => {
        showModal(
          <EditPresetModal
            onConfirm={(presetId: string, updatedPreset: EditablePreset) => {
              lockDeckManager.updatePreset(presetId, updatedPreset);
            }}
            presetId={preset.id}
            presetOptions={JSON.parse(JSON.stringify(preset)) as EditablePreset}
            lockDeckManager={lockDeckManager}
          />
        )
      }}>
        Edit
      </MenuItem>
      <MenuItem onSelected={() => {
        showModal(
          <ConfirmModal
            className={'lock-deck-destructive-modal'}
            onOK={() => {
              lockDeckManager.deletePreset(preset.id);
            }}
            bDestructiveWarning={true}
            strTitle="WARNING!"
          >
            Are you sure you want to delete this preset? This can't be undone.
          </ConfirmModal>
        )
      }}>
        Delete
      </MenuItem>
    </Menu>
  )
}

interface PresetActionButtionProps {
  preset: Preset,
  lockDeckManager: LockDeckManager
}

/**
 * The preset action button.
 */
export const PresetActionsButton: VFC<PresetActionButtionProps> = (props) => {
  const onClick = () => {
    showContextMenu(<PresetActionsContextMenu {...props} />);
  }

  return (
    <DialogButton
      style={{ height: "40px", minWidth: "40px", width: "40px", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px" }}
      onClick={onClick}
      onOKButton={onClick}
      onOKActionDescription="Open preset options"
    >
      <FaEllipsisH />
    </DialogButton>
  )
}
