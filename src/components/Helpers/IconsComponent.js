import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
});

export default function IconsComponent() {
  const classes = useStyles();
  return (
    <Grid container justify="center" alignItems="center">
      <Avatar alt="Remy Sharp" src="https://image.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg" className={classes.avatar} />
    </Grid>
  );
}