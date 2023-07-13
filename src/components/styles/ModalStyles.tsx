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

      /* The button item wrapper */
      .lock-deck-modal-scope .filter-entry .${gamepadDialogClasses.Field} {
        padding: 0;
        margin: 0;
      }
      /* The button item label */
      .lock-deck-modal-scope .filter-entry .${gamepadDialogClasses.FieldLabel} {
        display: none;
      }
      /* The button item */
      .lock-deck-modal-scope .filter-entry .${gamepadDialogClasses.FieldChildren} > button.${gamepadDialogClasses.Button}.DialogButton {
        padding: 10px;
        min-width: 45px;
      }

      .lock-deck-modal-scope .no-sep .${gamepadDialogClasses.Field}.${gamepadDialogClasses.WithBottomSeparatorStandard}::after,
      .lock-deck-modal-scope .no-sep.${gamepadDialogClasses.Field}.${gamepadDialogClasses.WithBottomSeparatorStandard}::after {
        display: none
      }

      /* Filter section start */
      .lock-deck-modal-scope .filter-start-cont {
        width: 114%;
        margin-left: -40px;
        padding: 0;

        font-size: 14px;
      }
      .lock-deck-modal-scope .filter-start-cont .filter-line {
        height: 2px;
        flex-grow: 1;
        
        background: #23262e;
      }
      .lock-deck-modal-scope .filter-start-cont .filter-label {
        margin: 0px 5px;
        color: #343945;
      }
      
      /* Focused styles */
      .lock-deck-modal-scope .filter-start-cont.start-focused {
        background-color: #3d4450 !important;
      }
      .lock-deck-modal-scope .filter-start-cont.start-focused .filter-line {
        background: #a9a9a9;
      }
      .lock-deck-modal-scope .filter-start-cont.start-focused .filter-label {
        color: #a9a9a9;
      }

      /* merge entries */
      .lock-deck-modal-scope .merge-filter-entries .merge-filter-entry {
        margin: 5px;
      }

      /* red buttons on destructive modals, matches steams */
      .lock-deck-destructive-modal button.${gamepadDialogClasses.Button}.DialogButton.gpfocus.Primary {
        background: #de3618;
        color: #fff
      }

      /* merge entries */
      .lock-deck-modal-scope .merge-filter-entries .merge-filter-entry {
        margin: 5px;
      }
    `}</style>
  );
}
