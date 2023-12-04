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
  border-bottom: 1px solid #eaeaea;
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
  color: #fff;
  font-weight: 600;
  margin-left: 2px;
  background-color: #ff5454;
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
`;

const ProfileImage = styled.img`
  border-radius: 8px;
  width: 52px;
  height: 52px;
`;

const UserName = styled.span`
  font-weight: 600;
  font-size: 18px;
`;

const Description = styled.span`
  color: grey;
`;

const Badge = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 4px;
`;

const ActionButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
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
}

interface ISubscribeItemProps {
  user: IUserProfile;
}
const SubscribeItemComponent: React.FC<ISubscribeItemProps> = ({ user }) => (
  <SubscribeItem>
    <ProfileImage
      src={
        'https://image.ytn.co.kr/general/jpg/2023/0805/202308050900012419_d.jpg' ||
        user.profileUrl
      }
      alt={user.consumerNickname}
    />
    <div
      style={{ display: 'flex', flexDirection: 'column', marginLeft: '18px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <UserName>{user.consumerNickname}</UserName>
        <Badge
          src="https://cdn-icons-png.flaticon.com/512/5899/5899666.png"
          alt={user.consumerNickname}
        />
        <PowerWrap>파워컨슈머</PowerWrap>
      </div>

      <Description>{user.profileContent}</Description>
    </div>

    <ActionButton>
      <Link to={`${ROOT_PATH}/my-page/seller`}>매거진</Link>
    </ActionButton>
  </SubscribeItem>
);

const FilterUI = () => {
  const [filter, setFilter] = useState('recent');
  const myProfile = useAtomValue(MyProfileAtom);

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
      <SubscribeWrap>
        <FaUserPlus
          size={18}
          color="#BDBDBD
"
        />
        <strong>{myProfile.followingConsumerIds.length} 명</strong>
        <SubscribeIcon>구독중</SubscribeIcon>
      </SubscribeWrap>
    </FilterContainer>
  );
};

const SubScribePage: React.FC = () => {
  const setTitle = useSetAtom(titleAtom);
  const [following, setFollowing] = useAtom(MyFollowingAtom);

  useEffect(() => {
    setTitle('내 구독');
  }, [setTitle]);

  const fetchGetMyPageProfile = async () => {
    try {
      const {
        data: { data, success, message },
      } = await fetch.get(`/api/api/consumer/followings?consumerId=consumer1`);
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
      <FilterUI />
      {following.map((user) => (
        <SubscribeItemComponent key={user.consumerId} user={user} />
      ))}
    </PageContainer>
  );
};

export default SubScribePage;
