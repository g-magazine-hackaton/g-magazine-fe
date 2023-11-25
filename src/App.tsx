import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import { useAtom } from 'jotai';
import Navbar from '@/components/navbar';

import { userAtom } from '@/store/user';

function App() {
  const [{ id }] = useAtom(userAtom);

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
      <Navbar />
      <Wrap>
        <Outlet />
      </Wrap>
    </Main>
  );
}

export default App;
