import styled from '@emotion/styled';
import { useState, useEffect, useLayoutEffect } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { useSetAtom, useAtom, useAtomValue } from 'jotai';
import { css } from '@emotion/react';
import { YourProfileAtom } from '@/store/your-profile';
import { titleAtom } from '@/store/page-info';
import { fetch } from '@/apis/api';
import { formatNumber } from '@/lib/utils';
import { postFollow } from '@/apis/consumer';
import { MyProfileAtom } from '@/store/my-profile';
import Image from '../image';
import { IMAGE_URL } from '@/apis/urls';

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  background-image: linear-gradient(170deg, #497cff 26%, #002041 79%);
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
`;
const ContentBox = styled.ul`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(72px, auto));
  gap: 8px;
  button {
    width: 100%;
    padding: 2px 8px;
    border-radius: 8px;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    color: #222;
    border: 2px solid #dee2e6;
    font-weight: 600;
    font-size: 14px;
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
`;

const YourPageProfile = () => {
  const [isFollow, setIsFollow] = useState(true);
  const { consumerId: myId } = useAtomValue(MyProfileAtom);
  const [count, setCount] = useState(0);
  const [yourProfile, setYourProfile] = useAtom(YourProfileAtom);
  const setTitle = useSetAtom(titleAtom);

  const onClickFollowToggle = async () => {
    const toggledFollow = !isFollow;
    const { success } = await postFollow({
      consumerId: yourProfile.consumerId,
      isFollow: toggledFollow,
    });
    if (!success) return;

    setIsFollow(toggledFollow);
    if (toggledFollow) {
      setCount(count + 1);
    } else {
      setCount(count - 1);
    }
    setYourProfile((prev) => ({
      ...prev,
      followerConsumerIds: toggledFollow
        ? [...yourProfile.followerConsumerIds, myId]
        : yourProfile.followerConsumerIds?.filter((id: string) => id === myId),
    }));
  };

  const fetchGetYourPageProfile = async () => {
    try {
      const {
        data: { data, success, message },
      } = await fetch.get(
        `/api/api/consumer/detail?consumerId=consumer2&myId=consumer1`,
      );
      if (success) {
        setCount(data.consumer.followerConsumerIds?.length);
        setIsFollow(data.isFollow);
        setYourProfile(data.consumer);
      } else {
        console.log(message);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  useEffect(() => {
    setTitle('매거진');
  }, [setTitle]);

  useLayoutEffect(() => {
    fetchGetYourPageProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HeaderWrapper>
      <ProfileImageBox>
        <Image
          src={yourProfile.profileUrl}
          alt="Profile Image"
          css={imageStyle}
        />
      </ProfileImageBox>
      <UserInfoArea>
        <NameBox>
          <span className="club-badge">U클럽</span>
          <strong>{formatNumber(yourProfile.consumerScore)}P</strong>
          <SubscribeWrap>
            <SubscribeIcon>구독자</SubscribeIcon>
            <FaUserPlus size={16} color="#fff" />
            <strong>{formatNumber(count)}</strong>명
          </SubscribeWrap>
        </NameBox>
        <GreetingBox>
          <div className="nickname">
            {yourProfile.consumerNickname}
            <img
              src={IMAGE_URL + yourProfile.consumerRankImageUrl}
              alt={yourProfile.consumerNickname}
              style={{
                width: '24px',
                marginLeft: '4px',
              }}
            />
          </div>
          {yourProfile.profileContent}
        </GreetingBox>
        <ContentBox>
          <li>
            <button
              onClick={onClickFollowToggle}
              style={{
                backgroundColor: isFollow ? '#0e0c32' : '#fff',
                color: isFollow ? '#fff' : '#222',
              }}
            >
              {isFollow ? '구독중' : '구독하기'}
            </button>
          </li>
        </ContentBox>
      </UserInfoArea>
    </HeaderWrapper>
  );
};

export default YourPageProfile;
