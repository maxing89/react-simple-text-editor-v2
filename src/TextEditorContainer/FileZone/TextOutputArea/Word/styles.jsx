import styled from 'styled-components';

export const Word = styled.span`
  font-weight: ${props => props.format.bold ? '700' : 'normal'};

  text-decoration: ${props => props.format.underline ? 'underline' : 'none'};

  font-style: ${props => props.format.italic ? 'italic' : 'normal'};

  color: ${props => props.format.color ? props.format.color : '#000000'};
`