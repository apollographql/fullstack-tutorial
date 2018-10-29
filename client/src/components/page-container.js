import styled from 'react-emotion';
import { unit, maxWidth } from '../styles';

export default styled('div')({
  maxWidth,
  margin: '0 auto',
  padding: `${unit * 2}px ${unit}px`,
});
