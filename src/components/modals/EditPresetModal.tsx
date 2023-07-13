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
import { EditablePreset, ScreenPosition, TransitionType } from "../presets/Presets";
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
  const [name, setName] = useState<string>(presetOptions.title);

  const [backgroundColor, setBackgroundColor] = useState<string>(presetOptions.backgroundColor);
  const [images, setImages] = useState<string[]>(presetOptions.images);
  const [transitionType, setTransitionType] = useState<TransitionType>(presetOptions.transitionType);

  const [showProfileIcon, setShowProfileIcon] = useState<boolean>(presetOptions.showProfileIcon);
  const [profileRadius, setProfileRadius] = useState<string>(presetOptions.profileRadius);
  const [profileSize, setProfileSize] = useState<string>(presetOptions.profileSize);
  const [profilePosition, setProfilePosition] = useState<ScreenPosition>(presetOptions.profilePosition);

  const [showButtons, setShowButtons] = useState<boolean>(presetOptions.showButtons);
  const [buttonsSize, setButtonsSize] = useState<string>(presetOptions.buttonsSize);
  
  const [showNumbers, setShowNumbers] = useState<boolean>(presetOptions.showNumbers);
  const [numbersColor, setNumbersColor] = useState<string>(presetOptions.numbersColor);
  const [numbersSize, setNumbersSize] = useState<string>(presetOptions.numbersSize);
  const [numbersPosition, setNumbersPosition] = useState<ScreenPosition>(presetOptions.numbersPosition);
  
  const [showDots, setShowDots] = useState<boolean>(presetOptions.showDots);
  const [dotsColor, setDotsColor] = useState<string>(presetOptions.dotsColor);
  const [dotsSize, setDotsSize] = useState<string>(presetOptions.dotsSize);
  const [dotsPosition, setDotsPosition] = useState<ScreenPosition>(presetOptions.dotsPosition);

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

        backgroundColor,
        images,
        transitionType,

        showProfileIcon,
        profileRadius,
        profileSize,
        profilePosition,
        
        showButtons,
        buttonsSize,

        showNumbers,
        numbersColor,
        numbersSize,
        numbersPosition,

        showDots,
        dotsColor,
        dotsSize,
        dotsPosition,
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
