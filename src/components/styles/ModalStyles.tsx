import { gamepadDialogClasses } from "decky-frontend-lib";
import { VFC } from "react";

/**
 * All css styling for Lock Deck's modals.
 */
export const ModalStyles: VFC<{}> = ({}) => {
  return (
    <style>{`
      .lock-deck-modal-scope .${gamepadDialogClasses.GamepadDialogContent} .DialogHeader {
        margin-left: 15px;
      }
      
      /* The button item */
      .lock-deck-modal-scope .styled-btn {
        padding: 0 !important;
      }
      .lock-deck-modal-scope .styled-btn .${gamepadDialogClasses.FieldLabel} {
        display: none;
      }
      .lock-deck-modal-scope .styled-btn .${gamepadDialogClasses.FieldChildren} {
        width: 100%;
      }

      .lock-deck-modal-scope .no-sep .${gamepadDialogClasses.Field}.${gamepadDialogClasses.WithBottomSeparatorStandard}::after,
      .lock-deck-modal-scope .no-sep.${gamepadDialogClasses.Field}.${gamepadDialogClasses.WithBottomSeparatorStandard}::after {
        display: none
      }

      /* accordion section start */
      .lock-deck-modal-scope .accordion-start-cont {
        width: 114%;
        margin-left: -40px;
        padding: 0;

        font-size: 14px;
      }
      .lock-deck-modal-scope .accordion-start-cont .accordion-line {
        height: 2px;
        flex-grow: 1;
        
        background: #23262e;
      }
      .lock-deck-modal-scope .accordion-start-cont .accordion-label {
        margin: 0px 5px;
        color: #343945;
      }
      
      /* Focused styles */
      .lock-deck-modal-scope .accordion-start-cont.start-focused {
        background-color: #3d4450 !important;
      }
      .lock-deck-modal-scope .accordion-start-cont.start-focused .accordion-line {
        background: #a9a9a9;
      }
      .lock-deck-modal-scope .accordion-start-cont.start-focused .accordion-label {
        color: #a9a9a9;
      }

      /* red buttons on destructive modals, matches steams */
      .lock-deck-destructive-modal button.${gamepadDialogClasses.Button}.DialogButton.gpfocus.Primary {
        background: #de3618;
        color: #fff
      }
    `}</style>
  );
}
