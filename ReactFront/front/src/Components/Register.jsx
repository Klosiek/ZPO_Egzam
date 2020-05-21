import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';



export default function Register({ handleClose, open }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");

    const register = () => (
        axios.post("http://localhost:5000/api/addUser", { username: username, password: password }).then(res => console.dir(res))
    )

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Register</DialogTitle>
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
                    <TextField
                        margin="dense"
                        id="password2"
                        label="Re-password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        onChange={text => setPassword2(text.currentTarget.value)}
                    />
                    <div style={{ color: 'red' }}>{error}</div>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setError("");
                            if (password !== password2) {
                                setError("Passwords are different");
                            }
                            else if (password.length < 6) {
                                setError("Password is too short {min: 6 chars}")
                            } else {
                                register();
                                handleClose();
                                alert("Thank you for being with us");
                            }
                        }
                        } color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}