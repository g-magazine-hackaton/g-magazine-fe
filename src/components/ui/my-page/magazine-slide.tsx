import { css } from '@emotion/react';
import React, { FC, Fragment } from 'react';

import { useKeenSlider } from 'keen-slider/react';
import { Link } from 'react-router-dom';
import Image from '../image';
import { IMAGE_URL } from '@/apis/urls';

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
    a,
    .image {
      width: 100%;
      height: 90px;
      border-radius: 0;
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
      <Image src={photoUrls} alt="슬라이드 이미지" className="image" />
    </Link>
  </div>
);

interface MagazineSlideItem {
  photoUrls: string;
}

interface MyPageMagazineSlideProps {
  item: MagazineSlideItem[];
  isDataLoaded: boolean;
}

const MyPageMagazineSlide: FC<MyPageMagazineSlideProps> = ({
  item,
  isDataLoaded,
}) => {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3.8,
      spacing: 8,
    },
  });
  return (
    <div>
      {isDataLoaded && (
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
              <Slide photoUrls={IMAGE_URL + slide.photoUrls} />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPageMagazineSlide;
