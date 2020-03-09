import React, { useState, Fragment } from 'react';
import * as styles from './styles.jsx';
import { Row, Col, Button } from 'antd';
import PropTypes from 'prop-types';

const TextInputArea = (props) => {
  const [input, setInput] = useState(null);
  const [submitted, setSubmitted] = useState(false)

  const handleOnChange = (e) => {
    e.persist();
    setInput(e.target.value);
  }

  const handleOnClick = () => {
    setSubmitted(true);
    props.onSubmit(input);
  }

  const handleOnReset = () => {
    setInput(null);
    setSubmitted(false);
    props.onReset();
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

TextInputArea.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
};
  
TextInputArea.defaultProps = {
  onSubmit: () => {},
  onReset: () => {},
};

export default TextInputArea;

