import React, { useEffect, useState } from 'react';
import NavBar from './Navbar';
import PizzaElement from './PizzaElement';
import OrderElement from './OrderElement';
import { ThemeProvider, createMuiTheme, Container } from '@material-ui/core';
import CssBaseline from "@material-ui/core/CssBaseline";
import { StylesProvider } from '@material-ui/core/styles';
import axios from 'axios';

const theme = createMuiTheme({
    palette: {
        background: {
            default: "#FAFAFA"
        }
    }
});

function MainPage() {
    const [pizzas, setPizzas] = useState([]);
    const [orders, setOrders] = useState([]);
    const [isChiefMenu, setChiefMenu] = useState(false);
    const [orderToRemove, setOrderToRemove] = useState();

    useEffect(() => {
        axios.get("http://localhost:5000/api/getAllPizzas")
            .then(res => {
                if (res.data) setPizzas(res.data.items);
            })
    }, []);

    useEffect(() => {
        axios.get("http://localhost:5000/api/getAllOrders")
            .then(res => {
                console.dir(res.data.items)
                if (res.data) setOrders(res.data.items);
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
                    />
                    {!isChiefMenu && <Container>
                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                            {pizzas && pizzas.map(x => <PizzaElement name={x.name} ingredients={x.ingredients} price={x.price} />)}
                        </div>
                    </Container>}
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