import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { CiCircleQuestion } from 'react-icons/ci';
import { HiAdjustmentsVertical } from 'react-icons/hi2';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import styled from '@emotion/styled';
import { titleAtom } from '@/store/page-info';
import { RankListMockData } from '@/temp/rank';
import { ROOT_PATH } from '@/temp/global-variables';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #f7f7f7;
`;

const Guide = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  > span {
    margin-left: 4px;
  }
  p {
    font-size: 11px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  background: #f7f7f7;
  padding: 6px 12px;
  border-bottom: 1px solid #eaeaea;
  > strong {
    margin-left: 4px;
    margin-right: 6px;
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

const StyledSection = styled.div`
  background-color: #ffffff;
  margin: 10px;
  padding: 8px 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  strong {
    font-size: 15px;
    color: #333;
  }

  p {
    font-size: 13px;
    color: #666;
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

const FilterUI = () => {
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <FilterContainer>
      <HiAdjustmentsVertical color="#BDBDBD" size={20} />
      <strong>정렬기준</strong>
      <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="mostPopular">컨슈머 랭크</option>
        <option value="sell">제품 판매</option>
      </Select>
      <Guide onClick={openModal}>
        <CiCircleQuestion size={20} />
        <span>랭킹 가이드</span>
      </Guide>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <b>포인트 및 랭크 시스템</b>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p style={{ fontSize: '14px', color: '#868e96' }}>
              각종 매거진 활동을 통해 포인트를 지급받을 수 있으며, 지급된
              포인트는 <b>1만 포인트부터 스마일캐시</b>로 사용할 수 있습니다.
              매달 활동력에 따라 랭크가 변동되며, 각 랭크에 해당하는 뱃지가
              닉네임 옆에 표기됩니다.
            </p>
            <img src="rank.png" alt="랭크" />
          </Typography>

          <StyledSection>
            <div>
              <strong>포인트 기준</strong>
              <p>
                매거진 업로드 100p (상품 연동 시 2배) <br />
                기준 좋아요 개당 5p <br />
                구독자 1명당 10p (일회성)
              </p>
            </div>
            <br />
            <div>
              <strong>랭크 구분</strong>
              <p>
                랭크1. 1 ~ 999P <br /> 랭크2. 1,000p ~ 2,999P <br />
                랭크3. 3,000 ~ 5,999P <br />
                랭크4. 6,000 ~ 9,999P <br />
                랭크5. 1만 ~ <br />
                <br />
                포인트는 한 달 획득 기준입니다.
              </p>
            </div>
          </StyledSection>
        </Box>
      </Modal>
    </FilterContainer>
  );
};

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
      <FilterUI />
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
