export type ScreenPosition = 
  "center-center" | "center-left" | "center-right" |
  "top-center" | "top-left" | "top-right" |
  "bottom-center" | "bottom-left" | "bottom-right"

export type TransitionType = "fade" | "slide" | "flip" | "twist"

export type Preset = {
  id: string,
  title: string,
  position: number,

  backgroundColor: string | null,
  images: string[],
  transitionType: TransitionType,

  showIcon: boolean,
  showButtons: boolean,

  showNumbers: boolean,
  numbersColor: string,
  numbersSize: string,
  numbersPosition: ScreenPosition,

  showDots: boolean,
  dotsColor: string,
  dotsSize: string,
  dotsPosition: ScreenPosition,
}

export type EditablePreset = Omit<Preset, "id">

export type PresetsDictionary = {
  [presetId: string]: Preset
}
