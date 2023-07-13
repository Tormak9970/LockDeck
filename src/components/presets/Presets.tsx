export type ScreenPosition = 
  "default" |
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

  showProfileIcon: boolean,
  profileRadius: string, //can be "default"
  profileSize: string,
  profilePosition: ScreenPosition,
  
  showButtons: boolean,
  buttonsSize: string,

  showNumbers: boolean,
  numbersColor: string,
  numbersSize: string,
  numbersPosition: ScreenPosition,

  showDots: boolean,
  dotsColor: string,
  dotsSize: string, //can be "default"
  dotsPosition: ScreenPosition,
}

export type EditablePreset = Omit<Preset, "id" | "position">

export type PresetsDictionary = {
  [presetId: string]: Preset
}
