/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Lottie from 'react-lottie';
import InfiniteScroll from 'react-infinite-scroll-component';
import YourPageProfileComponent from '@/components/ui/your-page/profile';
import { YourMagazineListMockData } from '@/temp/your-magazine';
import loadingAnimation from '@/assets/loading.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const LottieWrapper = styled.div`
  margin: 12px 0;
`;

const TabContainer = styled.div`
  display: flex;
  padding: 9px 0;
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
  border: 1px solid rgb(0, 0, 0);
  border-radius: 4px;
  box-sizing: border-box;
  color: rgb(0, 0, 0);
  font-weight: 600;
  margin-right: 8px;
  background-color: ${(props) => (props.active ? '#222' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#222')};
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px;
  background-color: #fff;
`;

const GridItem = styled.div`
  width: 100%;
  height: 132px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  > img {
    height: 100%;
    width: 100%;
  }
`;

interface Magazine {
  category: string;
  image: string;
}

const YourPage: React.FC = () => {
  const [tabIdx, setTabIdx] = useState<number>(0);
  const [items, setItems] = useState<Magazine[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    setItems(YourMagazineListMockData.slice(0, 21));
  }, []);

  const tabs = [
    '전체',
    '메종키츠네',
    '웨스트비비안우드',
    '구찌',
    '디올',
    '까르띠에',
  ];

  const fetchMoreData = () => {
    if (items.length >= YourMagazineListMockData.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems(
        items.concat(
          YourMagazineListMockData.slice(items.length, items.length + 21),
        ),
      );
    }, 300);
  };

  return (
    <>
      <YourPageProfileComponent />
      <TabContainer>
        {tabs.map((tab, index) => (
          <TabStyle
            key={tab}
            onClick={() => setTabIdx(index)}
            active={index === tabIdx}
          >
            {tab}
          </TabStyle>
        ))}
      </TabContainer>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <LottieWrapper>
            <Lottie options={defaultOptions} height={36} width={72} />
          </LottieWrapper>
        }
      >
        <GridContainer>
          {items.map((item, index) => (
            <GridItem key={index}>
              <img src={item.image} alt={item.category} />
            </GridItem>
          ))}
        </GridContainer>
      </InfiniteScroll>
    </>
  );
};

export default YourPage;
