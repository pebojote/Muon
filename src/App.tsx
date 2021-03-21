import React from 'react';
import Container from '@material-ui/core/Container';
import './App.global.css';
import MiniDrawer from './component/templates/mini-drawer';
import home from './component/home';
import StickyHeadTable from './component/templates/table';

const pages = [home, StickyHeadTable];

function App() {
  return (
    <Container maxWidth="lg" style={{ backgroundColor: '#74ebd5' }}>
      <MiniDrawer Navigate={pages} />
    </Container>
  );
}

export default App;
