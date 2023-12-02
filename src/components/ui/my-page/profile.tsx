import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../button';
import ScrapSheet from '@/components/ui/my-page/scrap-sheet';
import { ROOT_PATH } from '@/temp/global-variables';

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  background-color: #007aff;
  color: white;
  padding: 16px 18px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: Gmarket Sans;
`;

const ProfileImageBox = styled.div`
  position: relative;
  width: 33%;
  height: min-content;

  .edit-button {
    position: absolute;
    top: 10px;
    left: 10px;
    color: #fff;
    padding: 4px 10px;
    font-size: 12px;
    border: none;

    &:hover {
      filter: brightness(1.2);
    }
  }
`;

const ProfileImage = styled.img`
  border-radius: 10px;
`;

const UserInfoArea = styled.div`
  width: 64%;
`;

const NameBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  .club-badge {
    line-height: 22px;
    background-color: rgb(8, 31, 63);
    border-radius: 8px;
    padding: 0 8px;
    font-size: 12px;
    font-weight: 600;
  }
  .nickname {
    font-size: 18px;
    font-weight: 700;
  }
  .subscriber-count {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    font-weight: 600;
    > span {
      background: #ff3399;
      line-height: 18px;
      padding: 0 8px;
      border-radius: 12px;
      font-size: 11px;
    }
  }
`;

const GreetingBox = styled.div`
  margin-top: 12px;
  font-size: 15px;
  word-break: keep-all;
`;

const CashBox = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .cash-amount {
    display: flex;
    align-items: center;
    gap: 8px;
    img {
      width: 30px;
      height: 30px;
    }
    font-size: 18px;
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(72px, auto));
  gap: 8px;
  button {
    width: 100%;
    padding: 2px 8px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
    color: #222;
    border: 2px solid #dee2e6;
    font-weight: 600;
    font-size: 14px;
  }
`;

const MyPageProfile = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <HeaderWrapper>
      <ProfileImageBox>
        <ProfileImage
          src="https://cdn.hankooki.com/news/photo/202311/118934_162711_1700520953.jpg"
          alt="Profile Image"
        />
        <Link to="../profile">
          <Button className="edit-button">수정</Button>
        </Link>
      </ProfileImageBox>
      <UserInfoArea>
        <NameBox>
          <span className="club-badge">U클럽</span>
          <div className="nickname">규라니</div>
          <div className="subscriber-count">
            <span>구독자</span>37명
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
          <li>
            <button>마이 구독</button>
          </li>
          <li>
            <button onClick={() => setOpen(true)}>스크랩</button>
          </li>
          <li>
            <button>
              <Link to={`${ROOT_PATH}/rank`}>컨슈머 랭킹</Link>
            </button>
          </li>
        </ContentBox>
      </UserInfoArea>
      <ScrapSheet isOpen={isOpen} setOpen={setOpen} />
    </HeaderWrapper>
  );
};

export default MyPageProfile;
