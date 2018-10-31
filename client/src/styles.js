import { injectGlobal } from 'react-emotion';

export const unit = 8;
export const colors = {
  primary: '#220a82',
  secondary: '#14cbc4',
  accent: '#e535ab',
  background: '#f7f8fa',
  grey: '#d8d9e0',
  text: '#343c5a',
  textSecondary: '#747790'
};

export default () => injectGlobal({
  [['html', 'body']]: {
    height: '100%',
  },
  body: {
    margin: 0,
    padding: 0,
    fontFamily: "'Source Sans Pro', sans-serif",
    backgroundColor: colors.background,
    color: colors.text,
  },
  '#root': {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
  },
  '*': {
    boxSizing: 'border-box',
  },
  h1: {
    fontSize: 48,
    lineHeight: 1,
    fontWeight: 600,
  }
});
