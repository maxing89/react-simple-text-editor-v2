import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Word from './Word';
import { Tooltip } from 'antd';

const TextOutputArea = (props) => {
  return (
    <Tooltip 
        visible={props.words ? true : false}
        title="Double click in any word to edit it"
        placement="left"
        arrowPointAtCenter
    >
      <Fragment>
        {props.words && (
            props.words.map(word => {
            return (
                <Word
                  key={word.id}
                  extractedWord={word}
                  onSelection={props.onSelection}
                />
            )   
            })
        )}
      </Fragment>
    </Tooltip>
  )
}

TextOutputArea.propTypes = {
  onSelection: PropTypes.func,
  words: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      word: PropTypes.shape({
        value: PropTypes.string.isRequired,
        format: PropTypes.shape({
          bold: PropTypes.bool,
          underline: PropTypes.bool,
          italic: PropTypes.bool,
          color: PropTypes.string,
        }),
      }),
    }),
  ),
};

Word.defaultProps = {
  onSelection: () => {},
  words: [],
}

export default TextOutputArea;