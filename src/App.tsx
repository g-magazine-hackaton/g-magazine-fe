import { Outlet, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { Global } from '@emotion/react';
import { useEffect } from 'react';
import Navbar from '@/components/navbar';
import globalStyle from './styles/global';
import BottomNavigation from './components/navbar/BottomNavigation';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #fff;
`;

const Wrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 48px 0;
`;

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

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
