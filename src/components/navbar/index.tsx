import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';

import { ROOT_PATH } from '@/temp/global-variables';

const StyledNavLink = styled(NavLink)`
  padding: 4px 8px;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: medium;
  border-radius: 10px;
  margin: 5px;
  z-index: 999;

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
  box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.2);
  padding: 0 4px;
  h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const Nav = styled.ul`
  display: flex;
  justify-content: space-between;
`;

export default function Navbar() {
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
}
