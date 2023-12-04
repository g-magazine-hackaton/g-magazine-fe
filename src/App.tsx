import { Outlet, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { Global } from '@emotion/react';
import { useCallback, useLayoutEffect } from 'react';
import { useSetAtom } from 'jotai';
import Navbar from '@/components/navbar';
import globalStyle from './styles/global';
import BottomNavigation from './components/navbar/BottomNavigation';
import { MyProfileAtom } from '@/store/my-profile';
import { fetch } from '@/apis/api';

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
  margin: 0 0 48px 0;
`;

function App() {
  const { pathname } = useLocation();
  const setMyProfile = useSetAtom(MyProfileAtom);
  const fetchGetMyPageProfile = useCallback(async () => {
    try {
      const {
        data: { data, success, message },
      } = await fetch.get(`/api/api/consumer/me?consumerId=consumer1`);
      if (success) {
        setMyProfile(data.consumer);
      } else {
        console.log(message);
      }
    } catch (error) {
      console.error('Error', error);
    }
  }, [setMyProfile]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchGetMyPageProfile();
  }, [fetchGetMyPageProfile, pathname]);

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
