import React, { useState, Fragment } from 'react';
import * as styles from './styles';
import { Row, Col, Button } from 'antd';

interface TextInputAreaProps {
  onSubmit: (text: string | undefined) => void
  onReset: () => void
}

const TextInputArea: React.FC<TextInputAreaProps> = ({ onSubmit, onReset }) => {
  const [input, setInput] = useState<string>();
  const [submitted, setSubmitted] = useState<boolean>(false)

  const handleOnChange = (e: { target: { value: string | undefined } }) => {
    setInput(e.target.value);
  }

  const handleOnClick = () => {
    setSubmitted(true);
    onSubmit(input);
  }

  const handleOnReset = () => {
    setInput(undefined);
    setSubmitted(false);
    onReset();
  }

  return (
    <Fragment>
      <styles.TextInputArea
        placeholder="Enter any text..."
        rows={10}
        cols={80}
        onChange={handleOnChange}
        disabled={submitted && input}
        autoFocus={true}
        value={input}
      />
      <Row type="flex" gutter={16}>
        <Col sm={3}> 
          <Button disabled={!submitted} type="default" onClick={handleOnReset}>Reset</Button>
        </Col>
        <Col sm={3}>
          <Button disabled={submitted || !input}  type="primary" onClick={handleOnClick}>Save</Button>
        </Col>
      </Row>
    </Fragment>
  )
}

export default TextInputArea;

