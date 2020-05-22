import React, { useEffect, useState } from 'react';
import NavBar from './Navbar';
import PizzaElement from './PizzaElement';
import OrderElement from './OrderElement';
import { ThemeProvider, createMuiTheme, Container, Backdrop, Paper } from '@material-ui/core';
import CssBaseline from "@material-ui/core/CssBaseline";
import { StylesProvider, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const theme = createMuiTheme({
    palette: {
        background: {
            default: "#FAFAFA"
        }
    }
});

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    paper: {
        height: '400px',
        width: '300px'
    }

}));

function MainPage() {
    const classes = useStyles();
    const [pizzas, setPizzas] = useState([]);
    const [orders, setOrders] = useState([]);
    const [isChiefMenu, setChiefMenu] = useState(false);
    const [isBackdropOpen, setBackdropOpen] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/getAllPizzas")
            .then(res => {
                if (res.data) setPizzas(res.data.items);
            })
    }, []);

    useEffect(() => {
        axios.get("http://localhost:5000/api/getAllOrders")
            .then(res => {
                if (res.data) setOrders(res.data.items);
            })
    }, []);

    useEffect(() => {
        axios.get("http://localhost:5000/api/getRaport")
            .then(res => {

            })
    }, []);

    return (
        <>
            <StylesProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <NavBar
                        setChiefMenu={(isChiefMenu) => {
                            setChiefMenu(isChiefMenu);
                        }}
                        isChiefMenu={isChiefMenu}
                        setBackdropOpen={(isBackdropOpen) => {
                            setBackdropOpen(isBackdropOpen);
                        }}
                    />
                    {!isChiefMenu && <Container>
                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                            {pizzas && pizzas.map(x => <PizzaElement name={x.name} ingredients={x.ingredients} price={x.price} />)}
                        </div>
                    </Container>}
                    <Backdrop className={classes.backdrop} open={isBackdropOpen} onClick={() => setBackdropOpen(false)}>
                        <Paper
                            elevation={3}
                            className={classes.paper}
                        >
                            {data}
                        </Paper>
                    </Backdrop>
                    {isChiefMenu && <Container>
                        {orders && orders.map(x => <OrderElement
                            price={x.price}
                            pizzas={x.pizzas}
                        />
                        )}
                    </Container>}
                </ThemeProvider>
            </StylesProvider>
        </>
    );
}

export default MainPage;