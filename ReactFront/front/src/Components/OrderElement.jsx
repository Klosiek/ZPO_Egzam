import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, ClickAwayListener, Popper, Paper, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress } from '@material-ui/core';
import axios from 'axios';
import OrderPizza from './OrderPizza';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
    paper: {
        width: '100%'
    }
}));

export default function OrderElement({ price, pizzas }) {
    const [progressBar, setProgressBar] = useState(0);
    const calc = 100 / (pizzas && Object.keys(pizzas).length) * progressBar
    const classes = useStyles();

    const removeOrder = () => {
        axios.post("http://localhost:5000/api/removeOrder", { pizzas: pizzas, price: price }
        ).then(res => window.location.reload())
    }

    return (
        <>
            <div className={classes.root}>
                <Paper
                    className={classes.paper}
                    elevation={3}
                >
                    Order price: <strong>{price} zł</strong>
                    <div
                        style={{ display: 'flex', flexDirection: 'row' }}
                    >
                        {pizzas && pizzas.map(x =>
                            <OrderPizza
                                name={x.name}
                                setProgressBar={(progressBar) => {
                                    setProgressBar(progressBar);
                                }}
                                progressBar={progressBar}
                            />
                        )}
                    </div>
                    <LinearProgress
                        className={classes.progressBar}
                        variant="determinate"
                        value={calc}
                        color="secondary"
                    />
                    <div style={{ textAlign: 'right', width: '200px', marginLeft: '1032px', marginTop: '-45px' }}>
                        {calc === 100 && <Button
                            onClick={() => removeOrder()}
                            variant='contained'
                            color='primary'
                        >
                            Close order
                        </Button>}
                    </div>

                </Paper>
            </div>

        </>
    )

}