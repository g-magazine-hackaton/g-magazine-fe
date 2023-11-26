/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React from 'react';

const HeaderWrapper = styled.div`
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
  display: flex;
  align-items: center;
  .club-badge {
    height: 22px;
    background-color: rgb(8, 31, 63);
    border-radius: 8px;
    padding: 0 4px;
    font-size: 12px;
    font-weight: 600;
    margin-right: 6px;
  }
  .nickname {
    font-size: 18px;
    font-weight: 600;
  }
  .subscriber-count {
    margin-left: auto;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    > span {
      background: #ff3399;
      line-height: 18px;
      padding: 1px 4px;
      border-radius: 12px;
      margin-right: 4px;
      font-size: 12px;
    }
  }
`;

const GreetingBox = styled.div`
  margin-top: 12px;
  font-size: 15px;
`;

const CashBox = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .cash-amount {
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

const ContentBox = styled.ul`
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

const MyPageProfile = () => {
  return (
    <HeaderWrapper>
      <ProfileImage
        src="https://cdn.hankooki.com/news/photo/202311/118934_162711_1700520953.jpg"
        alt="Profile Image"
      />
      <UserInfoArea>
        <NameBox>
          <span className="club-badge">U클럽</span>
          <div className="nickname">규라니</div>
          <div className="subscriber-count">
            <span>팔로워</span>37명
          </div>
        </NameBox>
        <GreetingBox>👋 헤이 모두들 안녕, 내가 누군지 알아?</GreetingBox>
        <CashBox>
          <span className="cash-amount">
            <img src="gold.png" alt="Smiley Cash" />
            125,000P
          </span>
          <CashUseButton>사용하기</CashUseButton>
        </CashBox>
        <ContentBox>
          <li>마이 구독</li>
          <li>스크랩</li>
          <li>컨슈머 랭킹</li>
        </ContentBox>
      </UserInfoArea>
    </HeaderWrapper>
  );
};

export default MyPageProfile;
