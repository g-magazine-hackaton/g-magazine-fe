/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';
import InfiniteScroll from 'react-infinite-scroll-component';
import YourPageProfileComponent from '@/components/ui/your-page/profile';

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
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 10px;
  background-color: #fff;
`;

const GridItem = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const YourPage = () => {
  const [tabIdx, setTabIdx] = useState(0);
  const [items, setItems] = useState(Array.from({ length: 20 }));
  const [hasMore, setHasMore] = useState(true);
  const tabs = [
    '전체',
    '메종키츠네',
    '웨스트비비안우드',
    '구찌',
    '디올',
    '까르띠에',
  ];

  const fetchMoreData = () => {
    if (items.length >= 60) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 12 })));
    }, 500);
  };

  return (
    <div>
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
        loader={<h4>로딩중</h4>}
      >
        <GridContainer>
          {items.map((_, index) => (
            <GridItem key={index}>Item {index + 1}</GridItem>
          ))}
        </GridContainer>
      </InfiniteScroll>
    </div>
  );
};

export default YourPage;
