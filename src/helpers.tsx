import { Word, Synonym } from "./types";

export function convertTextIntoArray(text: string): Word[] {
  return text.split(' ')
    .map((wordWithNoSpace, index) => {
      return {
        id: wordWithNoSpace.toLowerCase().concat(`-${index}`),
        value: wordWithNoSpace,
        format: {
          bold: false,
          underline: false,
          italic: false,
          color: '#000000',
        }
      };
    });
}

export function extractPunctuation(word: string) {
  const puntuaction = word.match(/,|\.|!|\?|\(|\)|:|\s/g)
  return puntuaction ? [puntuaction] : null
}

export function removePunctuation(word: string) {
  const wordWithNoPunctuation = word.split(/\W+/);
  return [wordWithNoPunctuation] || null
}

export function changeSelectedWordFormat(selectedWord: Word, checked: boolean | string, selectedFormat: string): Word {
  return {
    id: selectedWord.id,
    value: selectedWord.value,
    format: {
      bold: selectedFormat === 'bold' ? checked ? true : false : selectedWord.format.bold,
      underline: selectedFormat === 'underline' ? checked ? true : false : selectedWord.format.underline,
      italic: selectedFormat === 'italic' ? checked ? true : false : selectedWord.format.italic,
      color: selectedFormat === 'color' ? checked ? checked as string : '#000000' : selectedWord.format.color,
    }
  }
}

export function changeWordFormat(currentText: Word[], selectedWord: Word, checked: boolean, selectedFormat: string): Word[] {
  return currentText.map(word => {
    if (word.id === selectedWord.id) {
      return changeSelectedWordFormat(selectedWord, checked, selectedFormat);
    }
    return word
  })
}

export function changeSelectedWordValue(selectedWord: Word, synonym: Synonym): Word {
  return {
    id: selectedWord?.id,
    value: synonym.word,
    format: {
      ...selectedWord?.format
    }
  }
}

export function replaceWordWithSynonym(currentText: Word[], selectedWord: Word, synonym: Synonym) {
  return currentText.map(word => {
    if (word.id === selectedWord.id) {
      return changeSelectedWordValue(selectedWord, synonym);
    }
    return word;
  })
}