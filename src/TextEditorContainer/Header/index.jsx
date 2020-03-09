import React, { Fragment } from 'react';
import * as styles from './styles.jsx';
import { Switch, Icon, Divider, Input, Row, Col, Spin } from 'antd';
import PropTypes from 'prop-types';
import { removePunctuation } from '../../helpers'

const Header = (props) => {

  const onChangeUnderline = (checked, event) => {
    props.onChangeFormat(checked, 'underline');
  }

  const onChangeItalic = (checked, event) => {
    props.onChangeFormat(checked, 'italic');
  }

  const onChangeBold = (checked, event) => {
    props.onChangeFormat(checked, 'bold');
  }

  const onChangeColor = (event) => {
    props.onChangeFormat(event.target.value, 'color');
  }

  let wordWithNoPunctuation = null;

  if (props.selectedWord) {
    [wordWithNoPunctuation] = removePunctuation(props.selectedWord.word.value)
  }

  return (
    <styles.Header 
      title="Simple Text Editor"
      footer={
        <Fragment>
          <Row type="flex">
            <styles.ToogleCol sm={2}> 
              <styles.FontStyleTitle>Bold</styles.FontStyleTitle>
              <Switch
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
                onChange={onChangeBold}
                checked={props.format.bold}
              />
            </styles.ToogleCol>
            <styles.ToogleCol sm={2}>
              <styles.FontStyleTitle>Italic</styles.FontStyleTitle>
              <Switch
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
                onChange={onChangeItalic}
                checked={props.format.italic}
              />
            </styles.ToogleCol>
            <styles.ToogleCol sm={3}>
              <styles.FontStyleTitle>Underline</styles.FontStyleTitle>
              <Switch
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
                onChange={onChangeUnderline}
                checked={props.format.underline}
              />
              <Divider type="vertical" />
            </styles.ToogleCol>
            <Col sm={3}>
              <Input 
                placeholder="#212121"
                onChange={onChangeColor}
                value={props.format.color}
              />
            </Col>
            <styles.SynonymsCol sm={14}>
              <styles.SynonymContainer>
                {props.loadingSynonyms ? (
                  <Spin />
                ) : (
                  props.synonyms.length > 0 ? (
                      props.synonyms.map((synonym) => {
                        return <styles.Synonym key={synonym.word} onClick={props.onSelectSynonym.bind(this, synonym)}>{synonym.word}</styles.Synonym>
                      })
                  ) : (
                    props.selectedWord ? 
                      <styles.NoSynonymsMessage>{`No synonyms available for ${wordWithNoPunctuation[0]}`}</styles.NoSynonymsMessage>
                    : null
                  )
                )}
              </styles.SynonymContainer>
            </styles.SynonymsCol>
          </Row>
        </Fragment>
      }
    />
  );
}

Header.propTypes = {
  format: PropTypes.shape({
    bold: PropTypes.bool,
    underline: PropTypes.bool,
    italic: PropTypes.bool,
    color: PropTypes.string,
  }),
};

Header.defaultProps = {
  format: {
    bold: false,
    underline: false,
    italic: false,
    color: '#000000',
  }
}

export default Header;