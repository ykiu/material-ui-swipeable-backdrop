import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// Disable transitions globally
// https://material-ui.com/getting-started/faq/#how-can-i-disable-transitions-globally
export default createMuiTheme({
  transitions: {
    // So we have `transition: none;` everywhere
    create: () => 'none',
  },
  overrides: {
    // Name of the component ⚛️
    MuiCssBaseline: {
      // Name of the rule
      '@global': {
        '*, *::before, *::after': {
          transition: 'none !important',
          animation: 'none !important',
        },
      },
    },
  },
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true,
    },
  },
});
