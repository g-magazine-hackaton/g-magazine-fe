import { css } from '@emotion/react';
import { NavLink } from 'react-router-dom';

const bottomNavigationStyle = css`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 350;

  .list {
    display: flex;
    justify-content: space-around;
    max-width: 768px;
    height: 48px;
    margin: 0 auto;

    .link {
      position: relative;
      display: block;
      width: 48px;
      height: 48px;
      background: url(//script.gmarket.co.kr/build/mobile/image/sprite/gnb/sp-gnb.png?v=1701154578432)
        no-repeat;
      background-size: 290px 256px;
    }

    .link__home {
      background-position: -108px -50px;
    }

    .link__search {
      background-position: -108px 0px;
    }

    .link__myg {
      background-position: 0px -158px;

      &.active {
        background-position: -50px -158px;
      }
    }

    .link__rvh {
      background-position: -100px -158px;
    }
  }
`;

const BottomNavigation = () => {
  return (
    <div className="box__bottom-navigation" css={bottomNavigationStyle}>
      <div className="box__bottom-navigation-inner">
        <ul className="list">
          <li className="list-item">
            <NavLink to="#none" className="link link__home" />
          </li>
          <li className="list-item">
            <NavLink to="#none" className="link link__search" />
          </li>
          <li className="list-item">
            <NavLink to="my-page" className="link link__myg" />
          </li>
          <li className="list-item">
            <NavLink to="#none" className="link link__rvh" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BottomNavigation;
