export interface Format {
  bold: boolean
  underline: boolean
  italic: boolean
  color: string
}

export interface Word {
  id: string
  value: string
  format: Format
}

export interface Synonym {
  word: string
}