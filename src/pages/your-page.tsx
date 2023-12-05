/** @jsxImportSource @emotion/react */
import React, { useState, useLayoutEffect } from 'react';
import { useAtom } from 'jotai';
import styled from '@emotion/styled';

import YourPageProfileComponent from '@/components/ui/your-page/profile';

import { FolderAtom } from '@/store/folder';
import { fetch } from '@/apis/api';
import { YourMagazineAtom } from '@/store/your-magazine';
import Image from '@/components/ui/image';

const TabContainer = styled.div`
  display: flex;
  padding: 2px 0;
  padding-left: 12px;
  margin-top: 12px;
  overflow: auto hidden;
  white-space: nowrap;
  background-color: #fff;
  &::-webkit-scrollbar {
    display: none;
  }
  span {
    flex: none;
    padding: 10px 20px;
    cursor: pointer;
  }
`;

const TabStyle = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0px 11px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  font-weight: 600;
  margin-right: 8px;
  background-color: ${(props) => (props.active ? '#222' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#757575')};
  font-family: Gmarket Sans;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  padding: 10px;
  background-color: #fff;
`;

const GridItem = styled.div`
  width: 100%;
  height: 132px;
  display: flex;
  justify-content: center;
  align-items: center;

  > .image {
    height: 100%;
    width: 100%;
  }
`;

const YourPage: React.FC = () => {
  const [tabIdx, setTabIdx] = useState<string>('1');
  const [myFolder, setMyFolder] = useAtom(FolderAtom);
  const [yourMagazine, setYourMagazine] = useAtom(YourMagazineAtom);

  const fetchGetYourMagazine = async () => {
    try {
      const {
        data: { data, success, message },
      } = await fetch.get(`/api/api/magazine/all?consumerId=consumer1`);
      if (success) {
        setYourMagazine(data.magazines);
      } else {
        console.log(message);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  const fetchGetYourFolder = async () => {
    try {
      const {
        data: { data, success, message },
      } = await fetch.get(`/api/api/magazine/folders?consumerId=consumer2`);
      if (success) {
        setMyFolder(data.folders);
      } else {
        console.log(message);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  const getMagazinesForFolder = () => {
    return yourMagazine.filter((magazine) => magazine.folderId === tabIdx);
  };

  useLayoutEffect(() => {
    fetchGetYourMagazine();
    fetchGetYourFolder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <YourPageProfileComponent />
      <TabContainer>
        {myFolder.map((tab, index) => (
          <TabStyle
            key={tab.id}
            onClick={() => setTabIdx(tab.folderId)}
            active={tabIdx === tab.folderId}
          >
            {tab.folderName}
          </TabStyle>
        ))}
      </TabContainer>

      <GridContainer>
        {getMagazinesForFolder().map((item, index) => (
          <GridItem key={index}>
            <Image
              src={item.photoUrls[0]}
              alt={item.category}
              className="image"
            />
          </GridItem>
        ))}
      </GridContainer>
    </>
  );
};

export default YourPage;
