import React, { Fragment } from 'react';
import WordComponent from './Word';
import { Tooltip } from 'antd';
import { Word } from '../../../types';

interface TextOutputAreaProps {
  words: Word[] | null
  onSelection: (selectedWord: Word) => void
}

const TextOutputArea: React.FC<TextOutputAreaProps> = ({ words, onSelection }) => {
  return (
    <Tooltip 
        visible={words ? true : false}
        title="Double click in any word to edit it"
        placement="left"
        arrowPointAtCenter
    >
      <Fragment>
        {words && (
            words.map(word => {
            return (
                <WordComponent
                  key={word.id}
                  extractedWord={word}
                  onSelection={onSelection}
                />
            )   
            })
        )}
      </Fragment>
    </Tooltip>
  )
}

export default TextOutputArea;