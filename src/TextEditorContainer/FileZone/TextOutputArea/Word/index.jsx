import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import * as styles from './styles';
import { extractPunctuation, removePunctuation } from '../../../../helpers';

const Word = (props) => {
  const [wordWithNoPunctuation] = removePunctuation(props.extractedWord.word.value);
  const punctuation = extractPunctuation(props.extractedWord.word.value)

  const handleSelectedWord = () => {
    props.onSelection(props.extractedWord);
  }

  return (
    <Fragment>
        <styles.Word onDoubleClick={handleSelectedWord} format={props.extractedWord.word.format}>{wordWithNoPunctuation}</styles.Word>
        <span>{punctuation}{' '}</span>
    </Fragment>
  )
}

Word.propTypes = {
  onSelection: PropTypes.func,
  word: PropTypes.shape({
    value: PropTypes.string.isRequired,
    format: PropTypes.shape({
      bold: PropTypes.bool,
      underline: PropTypes.bool,
      italic: PropTypes.bool,
      color: PropTypes.string,
    }).isRequired,
  }),
};

Word.defaultProps = {
  onSelection: () => {},
  word: null,
}

export default Word;