import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import { Global } from '@emotion/react';
import Navbar from '@/components/navbar';
import globalStyle from './styles/global';

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
    margin-top: 48px;
  `;

  return (
    <Main>
      <Global styles={globalStyle} />
      <Navbar />
      <Wrap>
        <Outlet />
      </Wrap>
    </Main>
  );
}

export default App;
