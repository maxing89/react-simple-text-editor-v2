import React from 'react';
import * as styles from './styles';
import { Row, Col } from 'antd';
import TextInputArea from './TextInputArea';
import TextOutputArea from './TextOutputArea';
import { Word } from '../../types.js';

interface FileZoneProps {
  onSubmit: (text: string) => void
  onReset: () => void
  onClick: () => void
  onSelection: (selectedWord: Word) => void
  words: Word[] | null
}

const FileZone: React.FC<FileZoneProps> = ({ onSubmit, onReset, onClick, onSelection, words }) => {

  return (
    <styles.TextContainer onClick={onClick}>
      <Row type="flex" gutter={32}>
        <Col sm={12}>
          <TextInputArea 
            onSubmit={onSubmit}
            onReset={onReset}
          />
        </Col>
        <Col sm={12}>
          <TextOutputArea
            words={words}
            onSelection={onSelection}
          />
        </Col>
      </Row>
    </styles.TextContainer>
  )
}

export default FileZone;