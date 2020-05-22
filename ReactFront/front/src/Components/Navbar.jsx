import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { AppBar, MenuItem, Toolbar, Typography, Button, IconButton, ListItemIcon, ListItemText, Menu } from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Register from './Register';
import Login from './Login';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    button: {
        color: 'white',
        fontSize: '20px'
    }

}));

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));


const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);


export default function NavBar({ setChiefMenu }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        axios.post("http://localhost:5000/api/client/login", { username: localStorage.getItem("Username"), password: localStorage.getItem("Password") })
            .then(res => {
                if (res.data) setIsLoggedIn(true);
            })
    }, []);

    const getBasket = () => {
        axios.get("http://localhost:5000/api/client/getBasket", { params: { username: localStorage.getItem("Username"), password: localStorage.getItem("Password") } })
            .then(res => {
                if (res.data) setPizzas(res.data.orders);
                console.dir(res.data.orders);
            })
    }

    const applyOrder = () => {
        axios.post("http://localhost:5000/api/client/applyOrder", { username: localStorage.getItem("Username"), password: localStorage.getItem("Password"), pizzas: pizzas }
        ).then(res => window.location.reload())
    }

    const [openRegister, setOpenRegister] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [showBasket, setShowBasket] = useState(false);
    const [pizzas, setPizzas] = useState([]);
    const basketContainerRef = useRef(null);

    const handleClickOpenRegister = () => {
        setOpenRegister(true);
    };

    const handleCloseRegister = () => {
        setOpenRegister(false);
    };

    const handleClickOpenLogin = () => {
        setOpenLogin(true);
    };

    const handleCloseLogin = () => {
        setOpenLogin(false);
    };

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Button
                            className={classes.button}
                            onClick={() =>
                                setChiefMenu(false)
                            }
                        >
                            Menu
                        </Button>
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        <Button
                            className={classes.button}
                            onClick={() =>
                                setChiefMenu(true)
                            }
                        >
                            Chief menu
                        </Button>
                    </Typography>
                    <Button
                        color="inherit"

                    >
                        Raport
                        </Button>
                    {!isLoggedIn && <>
                        <Button
                            color="inherit"
                            onClick={() => handleClickOpenLogin()}
                        >
                            Login
                    </Button>
                        <Button
                            color="inherit"
                            onClick={() => handleClickOpenRegister()}
                        >
                            Register
                    </Button>
                    </>}
                    {isLoggedIn &&
                        <Button
                            color="inherit"
                            onClick={() => {
                                localStorage.setItem("Username", "");
                                localStorage.setItem("Password", "");
                                window.location.reload();
                            }}
                        >
                            Logout
                        </Button>}
                    <Register handleClose={handleCloseRegister} open={openRegister} />
                    <Login handleClose={handleCloseLogin} open={openLogin} />
                    {isLoggedIn && <IconButton>
                        <ShoppingBasketIcon
                            ref={basketContainerRef}
                            onClick={() => {
                                getBasket();
                                setShowBasket(true);
                            }}
                        />
                        {pizzas && <StyledMenu
                            id="customized-menu"
                            anchorEl={basketContainerRef.current}
                            keepMounted
                            open={showBasket}
                            onClose={() => setShowBasket(false)}
                        >
                            {pizzas.map(x =>
                                (<StyledMenuItem>
                                    <ListItemIcon>
                                        <img src="unnamed.png" alt="img" height="30px"></img>
                                    </ListItemIcon>
                                    <ListItemText primary={x.name} />
                                </StyledMenuItem>)
                            )}
                            <MenuItem>
                                {"Cena: " + pizzas.reduce((total, arg) => total + arg.price, 0) + "zł"}
                            </MenuItem>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    applyOrder();
                                    alert("Zamówienie zostalo zrealizowane, dziękujemy!");
                                }}
                            >
                                Apply Order
                            </Button>
                        </StyledMenu>}
                    </IconButton>}
                </Toolbar>
            </AppBar>
        </div>
    );
}