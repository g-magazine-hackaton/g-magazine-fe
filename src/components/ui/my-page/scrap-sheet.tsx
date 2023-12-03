/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Sheet from 'react-modal-sheet';
import styled from '@emotion/styled';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { Box } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import { ScrapListMockData } from '@/temp/scrap';

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
      {data.map((x: { image: string }, index: number) => (
        <Item key={index}>
          <ImageContainer src={x.image} alt={x.image} />
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
  return (
    <Sheet
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      snapPoints={[600, 400, 100, 0]}
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Scroller>
          <MasonrySection title="recent" data={ScrapListMockData[0]} />
          <MasonrySection title="all" data={ScrapListMockData[1]} />
        </Sheet.Scroller>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default ScrapSheet;
