import React from 'react';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/core/styles';
import MiniDrawer from './component/templates/mini-drawer';
import Home from './component/home';
import theme from './theme';
// import './App.global.css';
// import Popular from './component/templates/popular';

const pages = [Home];

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <MiniDrawer Navigate={pages} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
