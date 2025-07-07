import React, { useState } from 'react';
import { Modal, TextField, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
  },
}));

const LoginModal = ({ open, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
    onLogin(username, password);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      className={classes.modal}
      style={{
        maxHeight: '400px',
        padding: '15px',
        display: 'block',
        margin: 'auto',
        maxWidth: '397px',
      }}
    >
      <div className={classes.paper}>
        <h2>Login</h2>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </Modal>
  );
};

export default LoginModal;