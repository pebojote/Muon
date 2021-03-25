import React from 'react';
import Container from '@material-ui/core/Container';
import './App.global.css';
import MiniDrawer from './component/templates/mini-drawer';
import Home from './component/home';
// import Popular from './component/templates/popular';

const pages = [Home];

function App() {
  return (
    <Container maxWidth="lg">
      <MiniDrawer Navigate={pages} />
    </Container>
  );
}

export default App;
