import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Backdrop from '../.main/material-ui-swipeable-backdrop.esm';

const useStyles = makeStyles(() => ({
  backdrop: {
    position: 'initial',
    width: 240,
    height: 320,
  },
}));

export default function BasicUsage() {
  const classes = useStyles();
  return <Backdrop classes={{ root: classes.backdrop }} />;
}
