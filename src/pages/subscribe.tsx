import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSetAtom, useAtom, useAtomValue } from 'jotai';

import { HiAdjustmentsVertical } from 'react-icons/hi2';
import { FaUserPlus } from 'react-icons/fa';
import styled from '@emotion/styled';
import { titleAtom } from '@/store/page-info';
import { MyProfileAtom } from '@/store/my-profile';
import { ROOT_PATH } from '@/temp/global-variables';
import { MyFollowingAtom } from '@/store/my-following';
import { fetch } from '@/apis/api';
import { IMAGE_URL } from '@/apis/urls';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #f7f7f7;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  background: #f7f7f7;
  padding: 6px 12px;
  > strong {
    margin-left: 6px;
    margin-right: 8px;
  }
`;

const Select = styled.select`
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: #fff;
`;

const PowerWrap = styled.span`
  padding: 0px 4px;
  border-radius: 10px;
  line-height: 16px;
  font-size: 12px;
  font-weight: 600;
  margin-left: 2px;
  border: 1px solid #363535;
  color: #363535;
`;

const SubscribeWrap = styled.span`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: center;
  color: #000;
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
  background-color: #000;
`;

const SubscribeItem = styled.li`
  background: white;
  margin: 6px;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: Gmarket Sans;
`;

const ProfileImage = styled.img`
  border-radius: 8px;
  width: 52px;
  height: 52px;
`;

const UserName = styled.span`
  font-weight: 600;
  font-size: 16px;
`;

const Description = styled.span`
  color: grey;
  width: 90%;
  word-break: keep-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Badge = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 4px;
`;

const ActionButton = styled.button`
  background-color: #007bff;
  min-width: 72px;
  color: white;
  border: none;
  padding: 0.5rem 0.8rem;
  border-radius: 4px;
  margin-left: auto;
  cursor: pointer;
  > a {
    color: white;
  }
`;

interface IUserProfile {
  profileContent: string;
  consumerNickname: string;
  profileUrl: string;
  consumerRankImageUrl: string;
  consumerRank: number;
  consumerId: string;
}

interface ISubscribeItemProps {
  user: IUserProfile;
}
const SubscribeItemComponent: React.FC<ISubscribeItemProps> = ({ user }) => (
  <SubscribeItem>
    <ProfileImage
      src={IMAGE_URL + user.profileUrl}
      alt={user.consumerNickname}
    />
    <div
      style={{ display: 'flex', flexDirection: 'column', marginLeft: '14px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <UserName>{user.consumerNickname}</UserName>
        <Badge
          src={IMAGE_URL + user.consumerRankImageUrl}
          alt={user.consumerNickname}
        />
        {user.consumerRank === 5 && <PowerWrap>파워컨슈머</PowerWrap>}
      </div>

      <Description>{user.profileContent}</Description>
    </div>

    <ActionButton>
      <Link to={`${ROOT_PATH}/my-page/${user.consumerId}`}>매거진</Link>
    </ActionButton>
  </SubscribeItem>
);

const FilterUI = () => {
  const [filter, setFilter] = useState('recent');

  return (
    <FilterContainer>
      <HiAdjustmentsVertical
        size={20}
        color="#BDBDBD
"
      />
      <strong>정렬기준</strong>
      <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="recent">최신순</option>
        <option value="rank">랭킹순</option>
      </Select>
    </FilterContainer>
  );
};

const SubScribePage: React.FC = () => {
  const setTitle = useSetAtom(titleAtom);
  const [following, setFollowing] = useAtom(MyFollowingAtom);
  const myProfile = useAtomValue(MyProfileAtom);

  useEffect(() => {
    setTitle('내 구독');
  }, [setTitle]);

  const fetchGetMyPageProfile = async () => {
    try {
      const {
        data: { data, success, message },
      } = await fetch.get(
        `/api/api/consumer/followings?consumerId=${
          localStorage.getItem('id') || 'consumer1'
        }`,
      );
      if (success) {
        setFollowing(data.consumer);
      } else {
        console.log(message);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  useLayoutEffect(() => {
    fetchGetMyPageProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer>
      <div
        style={{
          width: '100%',
          display: 'flex',
          padding: '10px 20px',
          borderBottom: '1px solid #eaeaea',
          fontFamily: 'Gmarket Sans',
        }}
      >
        <div
          style={{
            width: '50%',
            textAlign: 'center',
            color: '#9E9E9E',
            fontWeight: 600,
          }}
        >
          추천 컨슈머
        </div>
        <span
          style={{
            color: '#ccc',
          }}
        >
          |
        </span>
        <SubscribeWrap>
          <FaUserPlus size={18} color="#000" />
          <strong>{myProfile?.followingConsumerIds?.length} 명</strong>
          <SubscribeIcon>구독중</SubscribeIcon>
        </SubscribeWrap>
      </div>
      <FilterUI />
      {following.map((user) => (
        <SubscribeItemComponent key={user.consumerId} user={user} />
      ))}
    </PageContainer>
  );
};

export default SubScribePage;
