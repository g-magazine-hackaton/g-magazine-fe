import React, { FC, useLayoutEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FcFolder } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { FolderAtom } from '@/store/folder';
import { MyMagazineAtom } from '@/store/my-magazine';
import { fetch } from '@/apis/api';
import MyPageProfileComponent from '@/components/ui/my-page/profile';
import MyPageSection from '@/components/ui/my-page/section';
import MyPageSubscriberUpdateSlider from '@/components/ui/my-page/subscriber-update-slider';
import MyPageMagazineSlide from '@/components/ui/my-page/magazine-slide';
import Button from '@/components/ui/button';
import Guides from '@/components/ui/my-page/Guides';

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
  margin-top: 18px;
  margin-bottom: 2px;
  width: 100%;
  height: 32px;
  padding: 0 12px;

  > span {
    font-weight: 600;
    font-size: 16px;

    > em {
      display: inline-block;
      padding: 0 6px;
      background-color: #7889ff;
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
  font-size: 18px;
  align-items: center;
  font-weight: 600;
  color: #000;
  padding: 8px;
  position: relative;
  border-radius: 50% 0 0 0;
  border-bottom: 1px solid #eee;
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
const Count: FC = () => <CountWrap>5</CountWrap>;

const MyPage: FC = () => {
  const navigate = useNavigate();
  const [myFolder, setMyFolder] = useAtom(FolderAtom);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [myMagazine, setMyMagazine] = useAtom(MyMagazineAtom);

  const fetchGetMyPageProfile = async () => {
    try {
      const {
        data: { data, success, message },
      } = await fetch.get(`/api/api/magazine/folders?consumerId=consumer1`);
      if (success) {
        setMyFolder(data.folders);
        setIsDataLoaded(true);
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

  const handleGoUpload = () => {
    navigate('../magazine/write');
  };

  const getMagazinesForFolder = (folderId) => {
    return myMagazine.filter((magazine) => magazine.folderId === folderId);
  };

  return (
    <div
      style={{
        backgroundColor: '#eee',
      }}
    >
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
          <FcFolder size={24} />
          <span
            style={{
              marginLeft: '6px',
            }}
          >
            마이 매거진
          </span>
          <Button css={uploadButtonStyle} onClick={handleGoUpload}>
            업로드
          </Button>
        </Heading>
        {myFolder.length > 0 &&
          myFolder?.map((item, idx) => {
            const filteredMagazines = getMagazinesForFolder(item.folderId);
            return (
              <React.Fragment key={`${idx + 1} my-magazine`}>
                <FolderHeader>
                  <span>
                    <em>{myFolder[idx]?.folderName}</em>{' '}
                    {filteredMagazines.length}개
                  </span>
                  <Link to="../magazine/write">
                    <img src="plus.png" alt="업로드 아이콘" />
                  </Link>
                </FolderHeader>
                <MyPageMagazineSlide
                  item={filteredMagazines}
                  isDataLoaded={isDataLoaded}
                />
              </React.Fragment>
            );
          })}
      </MyPageSection>
      {/* <Guides /> */}
    </div>
  );
};

export default MyPage;
