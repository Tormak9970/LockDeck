import { gamepadDialogClasses, quickAccessControlsClasses } from "decky-frontend-lib";
import { VFC } from "react";

/**
 * All css styling for the Quick Access Menu part of Lock Deck.
 */
export const QamStyles: VFC<{}> = ({}) => {
  return (
    <style>{`
      .lock-deck-scope {
        width: inherit;
        height: inherit;

        flex: 1 1 1px;
        scroll-padding: 48px 0px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-content: stretch;
      }

      .lock-deck-scope .${quickAccessControlsClasses.PanelSection} {
        padding: 0px;
      }
      .lock-deck-scope .${quickAccessControlsClasses.PanelSectionTitle} {
        margin-top: 3px;
        margin-left: 5px;
      }

      .lock-deck-scope .${gamepadDialogClasses.FieldChildren} {
        margin: 0px 16px;
      }
      .lock-deck-scope .${gamepadDialogClasses.FieldLabel} {
        margin-left: 16px;
      }

      .lock-deck-scope .add-preset-btn .${gamepadDialogClasses.Field}.${gamepadDialogClasses.WithBottomSeparatorStandard}::after {
        display: none;
      }
      .lock-deck-scope .add-preset-btn .${gamepadDialogClasses.FieldLabel} {
        display: none;
      }
      .lock-deck-scope .add-preset-btn .${gamepadDialogClasses.FieldChildren} {
        width: calc(100% - 32px);
      }

      .lock-deck-scope .seperator {
        width: 100%;
        height: 1px;
        background: #23262e;
      }

      .lock-deck-scope .hidden-preset-btn button.${gamepadDialogClasses.Button}.DialogButton {
        min-width: 50px;
      }


      .lock-deck-scope .preset-label-cont {
        display: flex;
        align-items: center;
      }

      .lock-deck-scope .preset-label-cont .preset-label {
        margin-right: 5px;
      }

      .lock-deck-scope .no-sep .${gamepadDialogClasses.FieldLabel},
      .lock-deck-scope .no-sep .${gamepadDialogClasses.Field}.${gamepadDialogClasses.WithBottomSeparatorStandard}::after,
      .lock-deck-scope .no-sep.${gamepadDialogClasses.Field}.${gamepadDialogClasses.WithBottomSeparatorStandard}::after {
        display: none
      }

      .lock-deck-scope .no-sep .${gamepadDialogClasses.FieldChildren} {
        width: 100%;
      }
    `}</style>
  );
}
