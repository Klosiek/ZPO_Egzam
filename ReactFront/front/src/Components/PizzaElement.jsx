import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, ClickAwayListener, Popper, Paper, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import axios from 'axios';

const useStyles2 = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        textAlign: 'center',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
}));

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    scrollContainer: {
        height: 400,
        overflow: 'auto',
        marginBottom: theme.spacing(3),
    },
    scroll: {
        position: 'relative',
        width: '230%',
        backgroundColor: theme.palette.background.paper,
        height: '230%',
    },
    legend: {
        marginTop: theme.spacing(2),
        maxWidth: 300,
    },
    paper: {
        maxWidth: 400,
        overflow: 'auto',
    },
    select: {
        width: 200,
    },
    popper: {
        width: 150,
        zIndex: 1,
        '&[x-placement*="bottom"] $arrow': {
            top: 0,
            left: 0,
            marginTop: '-0.9em',
            width: '3em',
            height: '1em',
            '&::before': {
                borderWidth: '0 1em 1em 1em',
                borderColor: `transparent transparent ${theme.palette.background.paper} transparent`,
            },
        },
        '&[x-placement*="top"] $arrow': {
            bottom: 0,
            left: 0,
            marginBottom: '-0.9em',
            width: '3em',
            height: '1em',
            '&::before': {
                borderWidth: '1em 1em 0 1em',
                borderColor: `${theme.palette.background.paper} transparent transparent transparent`,
            },
        },
        '&[x-placement*="right"] $arrow': {
            left: 0,
            marginLeft: '-0.9em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 1em 1em 0',
                borderColor: `transparent ${theme.palette.background.paper} transparent transparent`,
            },
        },
        '&[x-placement*="left"] $arrow': {
            right: 0,
            marginRight: '-0.9em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 0 1em 1em',
                borderColor: `transparent transparent transparent ${theme.palette.background.paper}`,
            },
        },
    },
    arrow: {
        position: 'absolute',
        fontSize: 7,
        width: '3em',
        height: '3em',
        '&::before': {
            content: '""',
            margin: 'auto',
            display: 'block',
            width: 0,
            height: 0,
            borderStyle: 'solid',
        },
    },
    button: {
        justifyContent: 'center',
    },
}));

export default function PizzaElement(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        axios.post("http://localhost:5000/api/client/login", { username: localStorage.getItem("Username"), password: localStorage.getItem("Password") })
            .then(res => {
                if (res.data) setIsLoggedIn(true);
            })
    }, []);

    const addToBasket = () => {
        axios.post("http://localhost:5000/api/client/addItem", { username: localStorage.getItem("Username"), password: localStorage.getItem("Password"), name: props.name, ingredients: props.ingredients, price: props.price }
        )
    }

    const [tooltipAnchorElement, setTooltipAnchorElement] = useState(null);
    const pizzaContainerRef = useRef(null);
    const [open, setOpen] = useState(false);
    const handleClickButton = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    useEffect(() => {
        setTooltipAnchorElement(pizzaContainerRef.current);
    }, []);

    const classes2 = useStyles2();
    const classes = useStyles();

    return (
        <>
            <Popper
                open={open && isLoggedIn}
                anchorEl={tooltipAnchorElement}
                placement="bottom"
                className={classes.popper}
            >
                <Paper className={classes.paper}>
                    <DialogTitle>{props.name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{props.ingredients}</DialogContentText>
                    </DialogContent>
                    <DialogActions
                        className={classes.button}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => addToBasket()}
                        >
                            Add to basket
                    </Button>
                    </DialogActions>
                </Paper>
            </Popper>



            <ClickAwayListener onClickAway={() => setOpen(false)}>
                <div className={classes2.root} ref={pizzaContainerRef}>
                    <Paper
                        onClick={handleClickButton}
                        elevation={3}
                    >
                        <div style={{ display: "flex", flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                            <div>{props.name}</div>
                            <div><img src="unnamed.png" alt="img" height="50px"></img></div>
                            <div>{props.price + "zł"}</div>
                        </div>
                    </Paper>
                </div>
            </ClickAwayListener>
        </>
    );
}