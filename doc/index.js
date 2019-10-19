import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import Main from './Main';
import AppFrame from './AppFrame';
import theme from './theme';

function App() {
  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <AppFrame main={<Main />} />
      </ThemeProvider>
    </CssBaseline>
  );
}

// eslint-disable-next-line no-undef
ReactDOM.render(<App />, document.getElementById('root'));
