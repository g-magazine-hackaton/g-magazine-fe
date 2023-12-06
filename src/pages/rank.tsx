import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSetAtom, useAtom } from 'jotai';
import { CiCircleQuestion } from 'react-icons/ci';
import { HiAdjustmentsVertical } from 'react-icons/hi2';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { RankAtom } from '@/store/rank';
import { titleAtom } from '@/store/page-info';
import { ROOT_PATH } from '@/temp/global-variables';
import { fetch } from '@/apis/api';
import Image from '@/components/ui/image';

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
  font-weight: 600;
  margin-left: 2px;
  border: 1px solid #363535;
  color: #363535;
`;

const RankNumber = styled.span`
  font-weight: 700;
  font-size: 24px;
`;

const RankItem = styled.li`
  background: white;
  margin: 0.5rem;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  gap: 0 6px;
  flex-wrap: wrap;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: Gmarket Sans;
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

const imageStyle = css`
  border-radius: 50%;
  width: 52px;
  height: 52px;
`;

interface IUserProfile {
  consumerNickname: string;
  profileContent: string;
  profileUrl: string;
  consumerId: string;
}

interface IRankItemProps {
  user: IUserProfile;
  rank: number;
}
const RankItemComponent: React.FC<IRankItemProps> = ({ user, rank }) => (
  <RankItem>
    <RankNumber>{rank}</RankNumber>
    <Image css={imageStyle} src={user.profileUrl} alt={user.consumerNickname} />
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '54%',
      }}
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
      <Link to={`${ROOT_PATH}/my-page/${user.consumerId}`}>매거진</Link>
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
  const [rank, setRank] = useAtom(RankAtom);
  const fetchGetRank = useCallback(async () => {
    try {
      const {
        data: { data, success, message },
      } = await fetch.get(`/api/api/consumer/rank`);
      if (success) {
        setRank(data.consumers);
      } else {
        console.log(message);
      }
    } catch (error) {
      console.error('Error', error);
    }
  }, [setRank]);

  const setTitle = useSetAtom(titleAtom);

  useEffect(() => {
    fetchGetRank();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTitle('컨슈머 랭킹');
  }, [setTitle]);

  return (
    <PageContainer>
      <FilterUI />
      {rank.map((user, index) => (
        <RankItemComponent key={user.consumerId} user={user} rank={index + 1} />
      ))}
    </PageContainer>
  );
};

export default RankPage;
