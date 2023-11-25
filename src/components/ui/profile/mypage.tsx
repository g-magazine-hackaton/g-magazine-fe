/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

import React from 'react';

const MyPageHeader: React.FC = () => {
  const HeaderWrap = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    background-color: #007aff;
    color: white;
    padding: 16px 18px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  `;
  const ProfileImage = styled.img`
    width: 33%;
    height: min-content;
    border-radius: 10px;
    margin-bottom: 0.2rem;
  `;
  const UserInfoArea = styled.div`
    width: 64%;
  `;

  const NameBox = styled.div`
    width: 100%;
    display: flex;
    .universal-club {
      height: 22px;
      background-color: rgb(8, 31, 63);
      border-radius: 8px;
      padding: 0 4px;
      font-size: 12px;
      font-weight: 600;
    }
    .nick-name {
      font-size: 18px;
      font-weight: 600;
      margin-left: 6px;
    }
    .subscribe-user {
      display: flex;
      align-items: center;
      margin-left: auto;
      font-size: 14px;
      font-weight: 600;
    }
    .subscribe-use-img {
      height: 18px;
      margin-right: 4px;
    }
  `;

  const GreetBox = styled.div`
    margin-top: 12px;
    font-size: 15px;
  `;

  const CashBox = styled.div`
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    span {
      display: flex;
      align-items: center;
      img {
        width: 30px;
        margin-right: 4px;
      }
      font-size: 20px;
      font-weight: 600;
    }
  `;

  const CashUseButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #004aff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    &:hover {
      background-color: #003aff;
    }
  `;

  const ContentsBox = styled.ul`
    margin-top: 32px;
    display: flex;
    justify-content: space-between;
    li {
      padding: 0 7px;
      border-radius: 8px;
      background-color: #fff;
      box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
      color: #222;
      border: 2px solid #dee2e6;
      font-weight: 600;
      font-size: 1rem;
    }
  `;
  return (
    <HeaderWrap>
      <ProfileImage
        src="https://cdn.hankooki.com/news/photo/202311/118934_162711_1700520953.jpg"
        alt="프로필 이미지"
      />
      <UserInfoArea>
        <NameBox>
          <span className="universal-club">U클럽</span>
          <div className="nick-name">규라니</div>
          <div className="subscribe-user">
            <img
              className="subscribe-use-img"
              alt="프로필 이미지"
              src="subscribe-icon.png"
            />
            37 명
          </div>
        </NameBox>
        <GreetBox>👋 헤이 모두들 안녕, 내가 누군지 알아?</GreetBox>
        <CashBox>
          <span>
            <img
              src="smiley-icon.png"
              className="subscribe-use-img"
              alt="스마일캐시"
            />
            125,000P
          </span>
          <CashUseButton>사용하기</CashUseButton>
        </CashBox>
        <ContentsBox>
          <li>마이 구독</li>
          <li>스크랩</li>
          <li>컨슈머 랭킹</li>
        </ContentsBox>
      </UserInfoArea>
    </HeaderWrap>
  );
};

export default MyPageHeader;
