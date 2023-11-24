import { Outlet } from 'react-router-dom';
import { useAtom } from 'jotai';
import Navbar from '@/components/navbar';

import { userAtom } from '@/store/user';

function App() {
  const [{ id }] = useAtom(userAtom);
  return (
    <>
      <Navbar />
      <main className="column flex min-h-screen items-center justify-center">
        <Outlet />
        <div>유저: {id}</div>
      </main>
    </>
  );
}

export default App;
