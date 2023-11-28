import { css } from '@emotion/react';
import { Fragment } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

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
    > img {
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

const Slide = ({ image }: { image: string }) => (
  <div className="keen-slider__slide">
    <img src={image} alt="슬라이드 이미지" />
  </div>
);

type MagazineSlideItem = {
  image: string;
};

const MyPageMagazineSlide = ({ item }: { item: MagazineSlideItem[] }) => {
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
      {item.map((slide, idx) => {
        const arrIndex = `${idx + 1} my-slide-magazine`;
        return (
          <Fragment key={arrIndex}>
            <Slide image={slide.image} />
          </Fragment>
        );
      })}
    </div>
  );
};

export default MyPageMagazineSlide;
