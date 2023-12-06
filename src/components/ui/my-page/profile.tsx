import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import ScrapSheet from '@/components/ui/my-page/scrap-sheet';
import { MyProfileAtom } from '@/store/my-profile';
import { ROOT_PATH } from '@/temp/global-variables';
import { formatNumber } from '@/lib/utils';
import Image from '../image';
import { IMAGE_URL } from '@/apis/urls';

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  background-image: linear-gradient(170deg, #497cff 26%, #002041 79%);
  color: white;
  padding: 64px 18px 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: Gmarket Sans;
  position: relative;
`;

const ProfileImageBox = styled.div`
  position: relative;
  width: 33%;
  height: min-content;
`;

const imageStyle = css`
  border-radius: 6px;
  width: 100%;
  height: 100%;
  max-height: 132px;
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
    border: 1px solid #fff;
    border-radius: 8px;
    padding: 0 8px;
    font-size: 12px;
    font-weight: 600;
  }

  .subscriber-count {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    font-weight: 600;
    > span {
      line-height: 18px;
      padding: 0 8px;
      border-radius: 12px;
      font-size: 11px;
    }
  }
`;

const GreetingBox = styled.div`
  width: 100%;
  margin-top: 12px;
  font-size: 15px;
  word-break: keep-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  .nickname {
    display: flex;
    font-size: 18px;
    font-weight: 700;
  }

  .introduce {
    font-family: Pretendard;
  }
`;

const ContentBox = styled.ul`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(72px, auto));
  gap: 8px;
  button {
    width: 100%;
    padding: 2px 8px;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
    color: #222;
    font-weight: 600;
    font-size: 14px;
    min-width: max-content;
  }
`;

const SubscribeWrap = styled.span`
  margin-left: auto;
  display: flex;
  align-items: center;

  > strong {
    font-size: 14px;
    font-weight: 600;
    margin-left: 5px;
  }
`;

const SubscribeIcon = styled.span`
  padding: 2px 4px;
  border-radius: 4px;
  line-height: 16px;
  font-size: 14px;
  color: #fff;
  font-weight: 600;
  margin-right: 3px;

  @media (max-width: 390px) {
    display: none;
  }
`;

const MyPageProfile = () => {
  const [isOpen, setOpen] = useState(false);
  const myProfile = useAtomValue(MyProfileAtom);

  return (
    <HeaderWrapper>
      <ProfileImageBox>
        <Image
          src={myProfile.profileUrl}
          alt="Profile Image"
          css={imageStyle}
        />
        {/* <Link to="../profile">
          <button className="edit-button">수정</button>
        </Link> */}
      </ProfileImageBox>
      <UserInfoArea>
        <NameBox>
          <span className="club-badge">U클럽</span>
          <strong>{formatNumber(myProfile.consumerScore)}P</strong>
          <SubscribeWrap>
            <SubscribeIcon>구독자</SubscribeIcon>
            <FaUserPlus size={16} color="#fff" />
            <strong>
              {formatNumber(myProfile.followerConsumerIds?.length)}
            </strong>
            명
          </SubscribeWrap>
        </NameBox>
        <GreetingBox>
          <div className="nickname">
            {myProfile.consumerNickname || '규라니'}
            <img
              src={IMAGE_URL + myProfile.consumerRankImageUrl}
              alt={myProfile.consumerNickname}
              style={{
                width: '24px',
                marginLeft: '4px',
              }}
            />
          </div>
          <p className="introduce">{myProfile.profileContent || ''}</p>
        </GreetingBox>
        <ContentBox>
          <li>
            <button>
              <Link to={`${ROOT_PATH}/subscribe`}>내 구독</Link>
            </button>
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
