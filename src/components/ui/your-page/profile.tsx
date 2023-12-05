import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { useState, useEffect, useLayoutEffect } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { useSetAtom, useAtom, useAtomValue } from 'jotai';
import { YourProfileAtom } from '@/store/your-profile';
import { titleAtom } from '@/store/page-info';
import { ROOT_PATH } from '@/temp/global-variables';
import { fetch } from '@/apis/api';
import { formatNumber } from '@/lib/utils';
import { postFollow } from '@/apis/consumer';
import { MyProfileAtom } from '@/store/my-profile';
import { IMAGE_URL } from '@/apis/urls';

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
  border-radius: 6px;
  min-height: 100px;
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
    border: 1px solid #fff;
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
  min-height: 72px;
`;

const ContentBox = styled.ul`
  margin-top: 12px;
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
  font-size: 13px;
  color: #fff;
  font-weight: 600;
  margin-left: 4px;
  background-color: #ff3399;
`;

const YourPageProfile = () => {
  const [isFollow, setIsFollow] = useState(true);
  const { consumerId: myId } = useAtomValue(MyProfileAtom);
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
    setYourProfile((prev) => ({
      ...prev,
      followerConsumerIds: toggledFollow
        ? [...yourProfile.followerConsumerIds, myId]
        : yourProfile.followerConsumerIds?.filter((id: string) => id === myId),
    }));
  };
  console.log(yourProfile.followerConsumerIds);

  useEffect(() => {
    setTitle('매거진');
  }, [setTitle]);

  const fetchGetYourPageProfile = async () => {
    try {
      const {
        data: { data, success, message },
      } = await fetch.get(
        `/api/api/consumer/detail?consumerId=consumer2&myId=consumer1`,
      );
      if (success) {
        setIsFollow(data.isFollow);
        setYourProfile(data.consumer);
      } else {
        console.log(message);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  useLayoutEffect(() => {
    fetchGetYourPageProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HeaderWrapper>
      <ProfileImageBox>
        <ProfileImage
          src={IMAGE_URL + yourProfile.profileUrl}
          alt="Profile Image"
        />
      </ProfileImageBox>
      <UserInfoArea>
        <NameBox>
          <span className="club-badge">U클럽</span>
          <div className="nickname">{yourProfile.consumerNickname}</div>
          <SubscribeWrap>
            <FaUserPlus
              size={18}
              color="#fff
"
            />
            <strong>
              {formatNumber(yourProfile.followerConsumerIds?.length)} 명
            </strong>
            <SubscribeIcon>구독중</SubscribeIcon>
          </SubscribeWrap>
        </NameBox>
        <GreetingBox>{yourProfile.profileContent}</GreetingBox>
        <ContentBox>
          <li>
            <button
              onClick={onClickFollowToggle}
              style={{
                backgroundColor: isFollow ? '#0e0c32' : '#fff',
                color: isFollow ? '#fff' : '#222',
              }}
            >
              {isFollow ? '팔로우 중' : '팔로우 하기'}
            </button>
          </li>
          <li>
            <button>
              <Link to={`${ROOT_PATH}/rank`}>컨슈머 랭킹</Link>
            </button>
          </li>
        </ContentBox>
      </UserInfoArea>
    </HeaderWrapper>
  );
};

export default YourPageProfile;
