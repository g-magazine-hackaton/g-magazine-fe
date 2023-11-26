/* eslint-disable react/require-default-props */
/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

interface MyPageSectionProps {
  title: string;
  height?: string;
  icon?: ReactNode;
  count?: ReactNode;
  children: ReactNode;
}

const SectionWrap = styled.div`
  margin-top: 12px;
`;

const TitleArea = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #fff;
  padding: 8px 18px;
  border-bottom: 1px solid #ccc;
  font-size: 18px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.8);
  font-weight: 600;
`;

const ContentsArea = styled.div<{ height?: string }>`
  height: ${({ height }) => height || 'auto'};
  padding: 12px 20px;
  background-color: #fff;
`;

const MyPageSection: React.FC<MyPageSectionProps> = ({
  title,
  icon,
  count,
  height,
  children,
}) => {
  return (
    <SectionWrap>
      <TitleArea>
        {icon}
        {title}
        {count}
      </TitleArea>
      <ContentsArea height={height}>{children}</ContentsArea>
    </SectionWrap>
  );
};

export default MyPageSection;
