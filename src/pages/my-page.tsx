import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import MyPageProfileComponent from '@/components/ui/my-page/profile';
import MyPageSection from '@/components/ui/my-page/section';
import MyPageSubscriberUpdateSlider from '@/components/ui/my-page/subscriber-update-slider';
import MyPageMagazineSlide from '@/components/ui/my-page/magazine-slide';
import { MagazineListMockData } from '@/temp/magazine';
import Button from '@/components/ui/button';

const UpdateWrap = styled.span`
  padding: 0px 4px;
  border-radius: 10px;
  line-height: 16px;
  font-size: 12px;
  color: #fff;
  background-color: #ff5454;
`;

const CountWrap = styled.span`
  border-radius: 50%;
  width: 24px;
  height: 24px;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: #ff5454;
  font-size: 14px;
`;

const FolderHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  margin-bottom: 2px;
  width: 100%;
  height: 32px;
  padding: 0 12px;
  > span {
    font-weight: 600;
    font-size: 17px;

    > em {
      display: inline-block;
      padding: 0 6px;
      background-color: #0028ac;
      color: #fff;
      border-radius: 6px;
      font-size: 14px;
    }
  }
  img {
    width: 16px;
  }
`;

const Heading = styled.h1`
  display: flex;
  margin-top: 20px;
  font-size: 18px;
  font-weight: 600;
  color: #000;
  padding: 4px;
  position: relative;
  border-radius: 50% 0 0 0;
  border-bottom: 1px solid #eee;

  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 4px;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #01a900;
  }
`;

const uploadButtonStyle = css`
  color: #548ef5;
  background-color: transparent;
  padding: 0;
  margin-left: auto;
  font-family: Gmarket Sans;
  font-size: 16px;
  border-width: 0;
`;

const UpdateUser: FC = () => <UpdateWrap>new</UpdateWrap>;
const Count: FC = () => <CountWrap>3</CountWrap>;

const MyPage: FC = () => {
  const navigate = useNavigate();
  const titles = [
    '전체',
    '키즈',
    '건강식품',
    '명품관',
    '신선상품',
    '기타',
    '기타',
    '기타',
  ];

  const handleGoUpload = () => {
    navigate('../magazine/write');
  };

  return (
    <>
      <MyPageProfileComponent />
      <MyPageSection
        title="매거진 업데이트"
        icon={<UpdateUser />}
        count={<Count />}
      >
        <MyPageSubscriberUpdateSlider />
      </MyPageSection>

      <MyPageSection height="428px" round="round" mt="32px">
        <Heading>
          <span>마이 매거진</span>
          <Button css={uploadButtonStyle} onClick={handleGoUpload}>
            업로드
          </Button>
        </Heading>
        {MagazineListMockData.map((item, idx) => (
          <React.Fragment key={`${idx + 1} my-magazine`}>
            <FolderHeader>
              <span>
                <em>{titles[idx]}</em> 42개
              </span>
              <Link to="../magazine/write">
                <img src="plus.png" alt="업로드 아이콘" />
              </Link>
            </FolderHeader>
            <MyPageMagazineSlide item={item} />
          </React.Fragment>
        ))}
      </MyPageSection>
    </>
  );
};

export default MyPage;
