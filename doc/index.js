import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import Main from './Main';
import AppFrame from './AppFrame';

function App() {
  return (
    <CssBaseline>
      <ThemeProvider theme={createMuiTheme({})}>
        <AppFrame main={<Main />} />
      </ThemeProvider>
    </CssBaseline>
  );
}

// eslint-disable-next-line no-undef
ReactDOM.render(<App />, document.getElementById('root'));
