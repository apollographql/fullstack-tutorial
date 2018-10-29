import styled from 'react-emotion';
import { colors, unit } from '../styles';

export default styled('button')(({ isBooked }) => {
  const color = isBooked ? colors.secondary : colors.primary;
  return {
    backgroundColor: 'white',
    border: `1px solid ${color}`,
    color,
    borderRadius: 3,
    padding: unit,
    fontSize: 14,
    width: 200,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: color,
      color: 'white',
    },
  };
});
