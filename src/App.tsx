import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import { Global } from '@emotion/react';
import Navbar from '@/components/navbar';
import globalStyle from './styles/global';
import BottomNavigation from './components/navbar/BottomNavigation';

function App() {
  const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
  `;

  const Wrap = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin: 48px 0;
  `;

  return (
    <Main>
      <Global styles={globalStyle} />
      <Navbar />
      <Wrap>
        <Outlet />
      </Wrap>
      <BottomNavigation />
    </Main>
  );
}

export default App;
