import styled from 'styled-components';
import { Format } from '../../../../types';

interface WordProps {
  format: Format
}
export const Word = styled.span`
  font-weight: ${(props: WordProps) => props.format.bold ? '700' : 'normal'};

  text-decoration: ${(props: WordProps) => props.format.underline ? 'underline' : 'none'};

  font-style: ${(props: WordProps) => props.format.italic ? 'italic' : 'normal'};

  color: ${(props: WordProps) => props.format.color ? props.format.color : '#000000'};
`