import styled from 'react-emotion';

export const StyledActionButton = styled('button')(({ isBooked }) => ({
  backgroundColor: 'white',
  border: isBooked ? '1px solid #eb193e' : '1px solid #00194b',
  color: isBooked ? '#eb193e' : '#00194b',
  borderRadius: '3px',
  paddingTop: '8px',
  paddingBottom: '8px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '14px',
  marginTop: '16px',
  width: '200px',
  ':hover': {
    backgroundColor: isBooked ? '#eb193e' : '#00194b',
    color: 'white',
  },
}));
