import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { HiOutlineChevronLeft } from 'react-icons/hi2';
import { RiEditBoxLine } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { titleAtom } from '@/store/page-info';

const Header = styled.header<{ showTitle: boolean; isScrollTop: boolean }>`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  background-color: ${({ showTitle, isScrollTop }) => {
    if (showTitle) return '#fff';
    return isScrollTop ? 'transparent' : '#497CFF';
  }};
  padding: 0 10px;
  z-index: 999;
  flex-wrap: wrap;
  transition: 0.3s;

  .right-button-box {
    display: flex;
    align-items: center;
  }

  .prev-icon,
  .edit-icon {
    width: 24px;
    height: 24px;
  }

  .link__cart,
  .link__alarm {
    position: relative;
    float: left;
    width: 30px;
    height: 30px;
    margin-right: 14px;

    .sprite__mypage1 {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 26px;
      height: 24px;
      margin: -12px 0 0 -13px;
      background-position: -119px -220px !important;
    }

    .sprite__mypage2 {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 22px;
      height: 25px;
      margin: -12px 0 0 -11px;
      background-position: -95px -219px !important;
    }

    .sprite__mypage1,
    .sprite__mypage2 {
      overflow: hidden;
      display: inline-block;
      font-size: 0;
      background: url(//pics.gmarket.co.kr/mobile/sprite/kr/mypage/sprite__mypage.png?v=20230804)
        no-repeat;
      background-size: 200px auto;
    }

    .text__number {
      position: absolute;
      top: -2px;
      right: -4px;
      min-width: 16px;
      height: 16px;
      padding: 0 3px;
      border-radius: 8px;
      background-color: #0028ac;
      font-size: 9px;
      color: #fff;
      line-height: 16px;
      text-align: center;
    }
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
    margin: ${({ showTitle }) => (showTitle ? '48px 0' : '0 0 48px 0')};
  }
`;

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const title = useAtomValue(titleAtom);
  const [isScrollTop, setIsScrollTop] = useState(true);

  // 상세 네비바 사용
  const showTitle = !![
    '/profile',
    '/write',
    '/rank',
    '/subscribe',
    '/magazine/',
  ].find((path) => pathname.includes(path));
  const iconColor = showTitle ? '#000' : '#fff';

  const handlePrev = () => {
    navigate(-1);
  };

  const handleGoEdit = () => {
    navigate('profile');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrollTop(window.scrollY === 0);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Header id="nav" showTitle={showTitle} isScrollTop={isScrollTop}>
      <HiOutlineChevronLeft
        className="prev-icon"
        stroke={iconColor}
        onClick={handlePrev}
      />
      {showTitle && <h1 className="title">{title}</h1>}
      {!showTitle && (
        <div className="right-button-box">
          <a href="#none" className="link__alarm">
            <span className="sprite__mypage1">알림 갯수</span>
            <span className="text__number">3</span>
          </a>
          <a href="#none" className="link__cart">
            <span className="sprite__mypage2">장바구니 상품</span>
            <span className="text__number">4</span>
          </a>
          <RiEditBoxLine
            className="edit-icon"
            fill={iconColor}
            onClick={handleGoEdit}
          />
        </div>
      )}
    </Header>
  );
};

export default Navbar;
