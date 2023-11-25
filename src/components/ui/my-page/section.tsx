/* eslint-disable react/require-default-props */
/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

interface MyPageSectionProps {
  title: string;
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

const ContentsArea = styled.div`
  min-height: 80px;
  padding: 12px 20px;
  background-color: #fff;
`;

const MyPageSection: React.FC<MyPageSectionProps> = ({
  title,
  icon,
  count,
  children,
}) => {
  return (
    <SectionWrap>
      <TitleArea>
        {icon}
        {title}
        {count}
      </TitleArea>
      <ContentsArea>{children}</ContentsArea>
    </SectionWrap>
  );
};

export default MyPageSection;
