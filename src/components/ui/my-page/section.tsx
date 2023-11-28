/* eslint-disable react/require-default-props */
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

interface MyPageSectionProps {
  title?: string;
  height?: string;
  icon?: ReactNode;
  count?: ReactNode;
  children: ReactNode;
  round?: string;
  mt?: string;
}

const SectionWrap = styled.div<{ mt?: string }>`
  margin-top: ${({ mt }) => mt || '20px'};
`;

const TitleArea = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  background-color: #fff;
  padding: 10px 18px;
  border-bottom: 1px solid #f0f8ff;
  font-size: 18px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.8);
  font-weight: 600;
`;

const ContentsArea = styled.div<{ height?: string; round?: string }>`
  min-height: ${({ height }) => height || 'auto'};
  padding: 12px 18px;
  background-color: #fff;
  border-radius: ${({ round }) => (round === 'round' ? '40px' : 0)};
  box-shadow: ${({ round }) =>
    round === 'round' ? '0px 4px 8px rgba(0, 0, 0, 0.6)' : 0};
`;

const MyPageSection: React.FC<MyPageSectionProps> = ({
  title,
  icon,
  count,
  height,
  children,
  round,
  mt,
}) => {
  return (
    <SectionWrap mt={mt}>
      {title && (
        <TitleArea>
          {icon}
          {title}
          {count}
        </TitleArea>
      )}
      <ContentsArea height={height} round={round}>
        {children}
      </ContentsArea>
    </SectionWrap>
  );
};

export default MyPageSection;
