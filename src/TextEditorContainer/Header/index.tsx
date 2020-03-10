import React, { Fragment } from 'react';
import * as styles from './styles';
import { Switch, Icon, Divider, Input, Row, Col, Spin } from 'antd';
import { removePunctuation } from '../../helpers'
import { Word, Format, Synonym } from '../../types'
import { SwitchChangeEventHandler } from 'antd/lib/switch';

interface HeaderProps {
  onChangeFormat: (checked: string | boolean | undefined, format: string) => void
  selectedWord: Word | null
  format: Format
  loadingSynonyms: boolean
  synonyms: Synonym[]
  onSelectSynonym: (synonym: Synonym) => void
}

const Header: React.FC<HeaderProps> = ({
  onChangeFormat,
  selectedWord,
  format,
  loadingSynonyms,
  synonyms,
  onSelectSynonym
}) => {

  const onChangeUnderline: SwitchChangeEventHandler = (checked: boolean, _event: MouseEvent) => {
    onChangeFormat(checked, 'underline');
  }

  const onChangeItalic: SwitchChangeEventHandler = (checked: boolean, _event: MouseEvent) => {
    onChangeFormat(checked, 'italic');
  }

  const onChangeBold: SwitchChangeEventHandler = (checked: boolean, _event: MouseEvent) => {
    onChangeFormat(checked, 'bold');
  }

  const onChangeColor = (e: { target: { value: string | undefined } }) => {
    onChangeFormat(e.target.value, 'color');
  }

  let wordWithNoPunctuation

  if (selectedWord) {
    [wordWithNoPunctuation] = removePunctuation(selectedWord.value)
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
                checked={format.bold}
              />
            </styles.ToogleCol>
            <styles.ToogleCol sm={2}>
              <styles.FontStyleTitle>Italic</styles.FontStyleTitle>
              <Switch
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
                onChange={onChangeItalic}
                checked={format.italic}
              />
            </styles.ToogleCol>
            <styles.ToogleCol sm={3}>
              <styles.FontStyleTitle>Underline</styles.FontStyleTitle>
              <Switch
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
                onChange={onChangeUnderline}
                checked={format.underline}
              />
              <Divider type="vertical" />
            </styles.ToogleCol>
            <Col sm={3}>
              <Input 
                placeholder="#212121"
                onChange={onChangeColor}
                value={format.color}
              />
            </Col>
            <styles.SynonymsCol sm={14}>
              <styles.SynonymContainer>
                {loadingSynonyms ? (
                  <Spin />
                ) : (
                  synonyms.length > 0 ? (
                      synonyms.map((synonym) => {
                        return <styles.Synonym key={synonym.word} onClick={() => onSelectSynonym(synonym)}>{synonym.word}</styles.Synonym>
                      })
                  ) : (
                    selectedWord ? 
                      <styles.NoSynonymsMessage>{`No synonyms available for ${wordWithNoPunctuation && wordWithNoPunctuation[0]}`}</styles.NoSynonymsMessage>
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

export default Header;