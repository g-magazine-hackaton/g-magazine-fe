import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import styled from '@emotion/styled';
import { titleAtom } from '@/store/page-info';
import { RankListMockData } from '@/temp/rank';
import { ROOT_PATH } from '@/temp/global-variables';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #f7f7f7;
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

const RankNumber = styled.span`
  font-weight: 700;
  font-size: 24px;
  margin-right: 1rem;
`;

const RankItem = styled.li`
  background: white;
  margin: 0.5rem;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProfileImage = styled.img`
  border-radius: 50%;
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
  crownIconUrl: string;
}

interface IRankItemProps {
  user: IUserProfile;
  onActionClick: (userId: string) => void;
  rank: number;
}
const RankItemComponent: React.FC<IRankItemProps> = ({
  user,
  onActionClick,
  rank,
}) => (
  <RankItem>
    <RankNumber>{rank}</RankNumber>
    <ProfileImage src={user.profileImageUrl} alt={user.name} />
    <div
      style={{ display: 'flex', flexDirection: 'column', marginLeft: '18px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <UserName>{user.name}</UserName>
        <Badge src={user.crownIconUrl} alt={user.name} />
        {user.isPower && <PowerWrap>파워컨슈머</PowerWrap>}
      </div>

      <Description>{user.description}</Description>
    </div>

    <ActionButton onClick={() => onActionClick(user.id)}>
      <Link to={`${ROOT_PATH}/my-page/seller`}>매거진</Link>
    </ActionButton>
  </RankItem>
);

const RankPage: React.FC = () => {
  const [userProfiles, setUserProfiles] = useState<IUserProfile[]>([]);
  const setTitle = useSetAtom(titleAtom);

  useEffect(() => {
    setUserProfiles(RankListMockData);
  }, []);

  const handleActionClick = () => {
    //
  };

  useEffect(() => {
    setTitle('컨슈머 랭킹');
  }, [setTitle]);

  return (
    <PageContainer>
      {userProfiles.map((user, index) => (
        <RankItemComponent
          key={user.id}
          user={user}
          onActionClick={handleActionClick}
          rank={index + 1}
        />
      ))}
    </PageContainer>
  );
};

export default RankPage;
