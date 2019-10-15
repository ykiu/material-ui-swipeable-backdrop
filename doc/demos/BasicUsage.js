import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import Backdrop from '../../src/Backdrop';

const useStyles = makeStyles(() => ({
  backdrop: {
    position: 'relative',
    width: 240,
    height: 320,
  },
}));

export default function BasicUsage() {
  const classes = useStyles();
  const [backLayerOpen, setBackLayerOpen] = useState(false);
  const handleBackLayerClose = useCallback(() => {
    setBackLayerOpen(false);
  }, []);
  const handleBackLayerOpen = useCallback(() => {
    setBackLayerOpen(true);
  }, []);

  return (
    <Backdrop
      classes={{ root: classes.backdrop }}
      backLayerOpen={backLayerOpen}
      onBackLayerClose={handleBackLayerClose}
      onBackLayerOpen={handleBackLayerOpen}
    />
  );
}
