import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { HiAdjustmentsVertical } from 'react-icons/hi2';
import { FaUserPlus } from 'react-icons/fa';
import styled from '@emotion/styled';
import { titleAtom } from '@/store/page-info';
import { SubscribeListMockData } from '@/temp/subscribe';
import { ROOT_PATH } from '@/temp/global-variables';

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
  id: string;
  name: string;
  isPower: boolean;
  description: string;
  profileImageUrl: string;
  crownIconUrl?: string;
}

interface ISubscribeItemProps {
  user: IUserProfile;
  onActionClick: (userId: string) => void;
}
const SubscribeItemComponent: React.FC<ISubscribeItemProps> = ({
  user,
  onActionClick,
}) => (
  <SubscribeItem>
    <ProfileImage src={user.profileImageUrl} alt={user.name} />
    <div
      style={{ display: 'flex', flexDirection: 'column', marginLeft: '18px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <UserName>{user.name}</UserName>
        {user.crownIconUrl && <Badge src={user.crownIconUrl} alt={user.name} />}
        {user.isPower && <PowerWrap>파워컨슈머</PowerWrap>}
      </div>

      <Description>{user.description}</Description>
    </div>

    <ActionButton onClick={() => onActionClick(user.id)}>
      <Link to={`${ROOT_PATH}/my-page/seller`}>매거진</Link>
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
      <SubscribeWrap>
        <FaUserPlus
          size={18}
          color="#BDBDBD
"
        />
        <strong>132명</strong>
        <SubscribeIcon>구독중</SubscribeIcon>
      </SubscribeWrap>
    </FilterContainer>
  );
};

const SubScribePage: React.FC = () => {
  const [userProfiles, setUserProfiles] = useState<IUserProfile[]>([]);
  const setTitle = useSetAtom(titleAtom);

  useEffect(() => {
    setUserProfiles(SubscribeListMockData);
  }, []);

  const handleActionClick = () => {
    //
  };

  useEffect(() => {
    setTitle('내 구독');
  }, [setTitle]);

  return (
    <PageContainer>
      <FilterUI />
      {userProfiles.map((user) => (
        <SubscribeItemComponent
          key={user.id}
          user={user}
          onActionClick={handleActionClick}
        />
      ))}
    </PageContainer>
  );
};

export default SubScribePage;
