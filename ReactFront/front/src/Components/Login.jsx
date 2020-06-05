import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';



export default function Login({ handleClose, open }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    var jwt = require('jwt-simple');

    const login = () => (
        axios.post("http://localhost:5000/api/client/login", { username: username, password: password })
            .then(res => {
                if (res.data) {
                    localStorage.setItem("JwtToken", jwt.encode({ username: username, password: password }, "secrethash"));
                    window.location.reload(true);
                } else { setError("Wrong email or password") }
            })
    )

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="outlined"
                        onChange={text => setUsername(text.currentTarget.value)}
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        onChange={text => setPassword(text.currentTarget.value)}
                    />
                    <div style={{ color: 'red' }}>{error}</div>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setError("");
                            login();
                        }
                        } color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}