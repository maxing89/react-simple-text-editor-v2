import React, { Fragment } from 'react';
import * as styles from './styles';
import { extractPunctuation, removePunctuation } from '../../../../helpers';
import { Word as WordType } from '../../../../types';

interface WordProps {
  extractedWord: WordType
  onSelection: (selectedWord: WordType) => void
}

const Word: React.FC<WordProps> = ({ extractedWord, onSelection }) => {
  const [wordWithNoPunctuation] = removePunctuation(extractedWord.value);
  const punctuation = extractPunctuation(extractedWord.value)

  const handleSelectedWord = () => {
    onSelection(extractedWord);
  }

  return (
    <Fragment>
        <styles.Word onDoubleClick={handleSelectedWord} format={extractedWord.format}>{wordWithNoPunctuation}</styles.Word>
        <span>{punctuation}{' '}</span>
    </Fragment>
  )
}

export default Word;