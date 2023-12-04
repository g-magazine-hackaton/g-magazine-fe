/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import Sheet from 'react-modal-sheet';
import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { useAtom } from 'jotai';
import { Box } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import { MyMagazineAtom } from '@/store/my-magazine';
import { ScrapAtom } from '@/store/scrap';
import { fetch } from '@/apis/api';

interface MasonrySectionProps {
  title: 'recent' | 'all';
  data: any;
}

const Item = muiStyled(Paper)(() => ({
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}));

const NewWrap = styled.span`
  padding: 4px 6px;
  border-radius: 4px;
  line-height: 16px;
  font-size: 14px;
  color: #fff;
  background-color: #000;
  margin-right: 4px;
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
  text-align: center;
  border-bottom: 1px solid #eee;
  padding: 8px 0;
`;

const ImageContainer = styled.img`
  width: 100%;
  height: 100%;
`;

const MasonrySection: React.FC<MasonrySectionProps> = ({ title, data }) => (
  <Box sx={{ width: '100%' }}>
    <SectionTitle>
      {title === 'recent' && <NewWrap>최근</NewWrap>}
      {title === 'recent' ? '7일 스크랩' : '전체 스크랩'}
    </SectionTitle>
    <Masonry columns={3} spacing={1}>
      {data.map((x: { photoUrls: string }, index: number) => (
        <Item key={index}>
          <ImageContainer src={x.photoUrls} alt={x.photoUrls} />
        </Item>
      ))}
    </Masonry>
  </Box>
);

interface ScrapSheetProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const ScrapSheet: React.FC<ScrapSheetProps> = ({ isOpen, setOpen }) => {
  const [myMagazine, setMyMagazine] = useAtom(MyMagazineAtom);
  const [myScrap, setMyScrap] = useAtom(ScrapAtom);

  const filteredData = myMagazine.filter((item) =>
    myScrap.includes(item.magazineId),
  );

  const fetchGetMyScrap = async () => {
    try {
      const {
        data: { data, success, message },
      } = await fetch.get(`/api/api/consumer/consumer1/scraps`);
      if (success) {
        setMyScrap(data.scrappedMagazineIds);
      } else {
        console.log(message);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  useEffect(() => {
    fetchGetMyScrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Sheet
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      snapPoints={[600, 400, 100, 0]}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Scroller>
          {/* <MasonrySection title="recent" data={ScrapListMockData[0]} /> */}
          <MasonrySection title="all" data={filteredData} />
        </Sheet.Scroller>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default ScrapSheet;
