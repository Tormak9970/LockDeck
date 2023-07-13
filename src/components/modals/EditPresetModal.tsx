import {
  ConfirmModal,
  Field,
  PanelSection,
  PanelSectionRow,
  TextField
} from "decky-frontend-lib";
import { useState, VFC, useEffect } from "react";
import { PythonInterop } from "../../lib/controllers/PythonInterop";
import { ModalStyles } from "../styles/ModalStyles";
import { EditablePreset } from "../presets/Presets";
import { LockDeckManager } from "../../state/LockDeckManager";
import { LockDeckContextProvider } from "../../state/LockDeckContext";

type EditPresetModalProps = {
  closeModal?: () => void,
  onConfirm: (presetId: string, updatedPreset: EditablePreset) => void,

  presetId?: string,
  presetOptions: EditablePreset,

  lockDeckManager: LockDeckManager
};

/**
 * The modal for editing and creating custom tabs.
 */
export const EditPresetModal: VFC<EditPresetModalProps> = ({ closeModal, onConfirm, presetId, presetOptions, lockDeckManager }) => {
  const [name, setName] = useState<string>(presetOptions.title ?? '');
  // TODO: need state for each property
  const [canSave, setCanSave] = useState<boolean>(false);

  useEffect(() => {
    setCanSave(name != "");
  }, [name]);

  function onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e?.target.value);
  }

  function onSave() {
    if (canSave) {
      const updated: EditablePreset = {
        title: name,
      };
      onConfirm(presetId ?? "", updated);
      closeModal!();
    } else {
      PythonInterop.toast("Error", "Please provide a name before saving");
    }
  }

  return (
    <LockDeckContextProvider lockDeckManager={lockDeckManager}>
      <ModalStyles />
      <div className="lock-deck-modal-scope">
        <ConfirmModal
          bAllowFullSize
          onCancel={closeModal}
          onEscKeypress={closeModal}
          strTitle={
            <div style={{ display: 'flex', marginRight: '15px', width: '100%' }}>
              <div>
                {name ? `Modifying: ${name}` : 'Create New Preset'}
              </div>
            </div>
          }
          onOK={onSave}
        >
          <PanelSection>
            <PanelSectionRow>
              <Field
                label="Name"
                description={<TextField value={name} onChange={onNameChange} />}
              />
            </PanelSectionRow>
          </PanelSection>
          {/* TODO: preview here */}
          {/* TODO: options here */}
        </ConfirmModal>
      </div>
    </LockDeckContextProvider>
  );
};
