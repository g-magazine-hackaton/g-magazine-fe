import { css } from '@emotion/react';
import MockImage from '@/assets/img_mock_gmarket.jpg';
import MainCarousel from '@/components/ui/home/MainCarousel';

const homeMockStyle = css`
  width: 100%;
  height: auto;
  pointer-events: none;
`;

const homeWrapStyle = css`
  width: 100%;
  max-width: 768px;
  height: auto;
  margin: 0 auto;
`;

export default function Homepage() {
  return (
    <div css={homeWrapStyle}>
      <img css={homeMockStyle} src={MockImage} alt="홈페이지 목업" />
      <MainCarousel />
    </div>
  );
}
