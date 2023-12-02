import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { IoIosArrowBack } from 'react-icons/io';
import { useAtomValue } from 'jotai';
import { titleAtom } from '@/store/page-info';
import { ROOT_PATH } from '@/temp/global-variables';

const StyledNavLink = styled(NavLink)`
  padding: 4px 8px;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: medium;
  border-radius: 10px;

  &.active {
    background-color: #f0f0f0;
    color: #333;
  }

  &:hover {
    color: #007bff;
  }
`;

const Header = styled.header`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  background-color: #fff;
  box-shadow: 0 4px 4px -4px rgba(0, 0, 0, 0.2);
  padding: 0 10px;
  z-index: 999;
  flex-wrap: wrap;

  .prev-icon {
    width: 24px;
    height: 24px;
  }

  h1 {
    font-size: 20px;
    font-weight: 600;

    &.title {
      width: 100%;
      padding-right: 24px;
      text-align: center;
      font-family: Gmarket Sans;
      flex: 1;
    }
  }

  & + div {
    margin: 48px 0;
  }
`;

const Nav = styled.ul`
  display: flex;
  justify-content: space-between;
  gap: 5px;
`;

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const title = useAtomValue(titleAtom);

  const handlePrev = () => {
    navigate(-1);
  };

  // 기존 탑 네비바 사용
  if (pathname.endsWith('my-page'))
    return (
      <Header>
        <h1>🚀 로켓죄송</h1>
        <nav>
          <Nav>
            <li>
              <StyledNavLink to={ROOT_PATH}>메인 페이지</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="my-page">마이 페이지</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="magazine">매거진 페이지</StyledNavLink>
            </li>
          </Nav>
        </nav>
      </Header>
    );

  return (
    <Header id="nav">
      <IoIosArrowBack className="prev-icon" onClick={handlePrev} />
      <h1 className="title">{title}</h1>
    </Header>
  );
};

export default Navbar;
