import React, { useEffect, useState } from 'react';
import './App.css';
import NavBar from './Components/Navbar';
import PizzaElement from './Components/PizzaElement';
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

function App() {
  const [pizzas, setPizzas] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/getAllPizzas")
      .then(res => {
        if (res.data) setPizzas(res.data.items);
      })
  }, []);

  return (
    <>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NavBar />
          <Container>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
              {pizzas && pizzas.map(x => <PizzaElement name={x.name} ingredients={x.ingredients} price={x.price} />)}
            </div>
          </Container>
        </ThemeProvider>
      </StylesProvider>
    </>
  );
}

export default App;
