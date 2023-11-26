import styled from '@emotion/styled';

const ButtonWrap = styled.button`
  padding: 6px 12px;
  border-radius: 20px;
  border: none;
  background-color: #f2f2f2;
  font-size: 14px;
  font-weight: 600;
  margin: 3px;
  cursor: pointer;

  &.active {
    background-color: #ff5454;
    color: white;
  }
`;

const Icon = styled.span`
  display: inline-block;
  margin-right: 6px;
`;

const buttons = [
  { text: '전체', active: true },
  { text: '키즈', active: false },
  { text: '건강식품', active: false },
  { text: '명품관', active: false },
  { text: '신선상품', active: false },
  { text: '당일배송', active: false },
  { text: '특가', active: false },
  { text: '밀키트', active: false },
];

interface MyPageMagazineTabProps {
  tabIdx: number;
  setTabIdx: (n: number) => void;
}

export default function MyPageMagazineTab({
  tabIdx,
  setTabIdx,
}: MyPageMagazineTabProps) {
  return (
    <div>
      {buttons.map((button, index) => (
        <ButtonWrap
          key={button.text}
          className={tabIdx === index ? 'active' : ''}
          onClick={() => setTabIdx(index)}
        >
          {button.active && <Icon>🔍</Icon>}
          {button.text}
        </ButtonWrap>
      ))}
    </div>
  );
}
