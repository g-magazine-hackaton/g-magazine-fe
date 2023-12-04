import { css } from '@emotion/react';
import React, { FC } from 'react';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { Link } from 'react-router-dom';

const sliderStyle = css`
  .keen-slider {
    display: flex;
    overflow: hidden;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    position: relative;
    width: 100%;
  }

  .keen-slider__slide {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    position: relative;
    overflow: hidden;

    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    img,
    a {
      width: 100%;
      height: 90px;
    }

    > span {
      position: absolute;
      top: 4px;
      left: 4px;
      padding: 1px;
      vertical-align: middle;
      color: #fff;
      background-color: #000;
      border-radius: 12px;
      font-size: 10px;
      width: 40px;
      text-align: center;
      font-weight: 600;
    }

    .user {
      width: 100%;

      display: flex;
      align-items: center;
      text-align: center;
      > img {
        height: 16px;
        width: 16px;
      }

      > span {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 13px;
        color: #555;
        font-weight: 600;
        background-color: #000;
        padding: 0 6px;
        color: #fff;
      }
    }
  }
`;

interface SlideProps {
  photoUrls: string;
}

const Slide: FC<SlideProps> = ({ photoUrls }) => (
  <div className="keen-slider__slide">
    <Link to="../magazine/1">
      <img src={photoUrls} alt="슬라이드 이미지" />
    </Link>
  </div>
);

interface MagazineSlideItem {
  photoUrls: string;
}

interface MyPageMagazineSlideProps {
  item: MagazineSlideItem[];
}

const MyPageMagazineSlide: FC<MyPageMagazineSlideProps> = ({ item }) => {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3.8,
      spacing: 8,
    },
  });

  return (
    <div
      css={sliderStyle}
      ref={sliderRef}
      className="keen-slider"
      style={{
        padding: '10px',
      }}
    >
      {item.map((slide, idx) => (
        <React.Fragment key={`${idx + 1} my-slide-magazine`}>
          <Slide
            photoUrls={
              'https://image.ytn.co.kr/general/jpg/2023/0805/202308050900012419_d.jpg' ||
              slide.photoUrls
            }
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default MyPageMagazineSlide;
