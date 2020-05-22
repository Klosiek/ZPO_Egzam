import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, ClickAwayListener, Popper, Paper, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress } from '@material-ui/core';
import axios from 'axios';
import { set } from 'mongoose';

export default function OrderElement({ name, setProgressBar, progressBar }) {
    const [isDone, setDone] = useState(false);

    return (
        <div
            onClick={() => {
                setProgressBar(progressBar + 1)
                setDone(!isDone)
                if (isDone) setProgressBar(progressBar - 1)
            }
            }
            style={{ height: '100px', width: '100px', textAlign: 'center', backgroundColor: isDone ? 'green' : 'white', cursor: 'pointer' }}
        >
            <img src="unnamed.png" alt="img" height="50px"></img><br></br>
            {name}
        </div >
    )
}