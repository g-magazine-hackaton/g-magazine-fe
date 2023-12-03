import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { ROOT_PATH } from '@/temp/global-variables';

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
      background: url(//mockupdev.gmarket.co.kr/build/mobile/image/sprite/gnb/sp-gnb.png?v=1700614126178)
        no-repeat;
      background-size: 290px 256px;
    }

    .link__home {
      background-position: -108px 0px;

      &--active {
        background-position: -108px -50px;
      }
    }

    .link__search {
      background-position: -208px -150px;
    }

    .link__myg {
      background-position: -158px -50px;
    }

    .link__rvh {
      background-position: 0px -158px;
    }
  }
`;

const BottomNavigation = () => {
  return (
    <div className="box__bottom-navigation" css={bottomNavigationStyle}>
      <div className="box__bottom-navigation-inner">
        <ul className="list">
          <li className="list-item">
            <Link to={`${ROOT_PATH}/`} className="link link__home" />
          </li>
          <li className="list-item">
            <Link to="#none" className="link link__search" />
          </li>
          <li className="list-item">
            <Link to="my-page" className="link link__myg" />
          </li>
          <li className="list-item">
            <Link to="#none" className="link link__rvh" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BottomNavigation;
