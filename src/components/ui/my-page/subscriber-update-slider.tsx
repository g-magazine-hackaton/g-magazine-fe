import { css } from '@emotion/react';
import { FC, Fragment } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { Link } from 'react-router-dom';
import { MyPageFollower } from '@/temp/my-page-follower';

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

    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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

      &.rank {
        background-color: #f89b00;
      }
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
  imageSrc: string;
  label: string;
  userName: string;
}

const Slide: FC<SlideProps> = ({ imageSrc, label, userName }) => (
  <div className="keen-slider__slide">
    <img src={imageSrc} alt="슬라이드 이미지" />
    <span className={label === 'Rank' ? 'rank' : ''}>{label}</span>
    <div className="user">
      <span>{userName}</span>
    </div>
  </div>
);

const SubscriberUpdateSlider: FC = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 4,
      spacing: 12,
    },
  });

  return (
    <div
      css={sliderStyle}
      ref={sliderRef}
      className="keen-slider"
      style={{ padding: '10px 0' }}
    >
      {MyPageFollower.map((slide) => (
        <Fragment key={slide.userName}>
          <Link to={slide.link}>
            <Slide {...slide} />
          </Link>
        </Fragment>
      ))}
    </div>
  );
};

export default SubscriberUpdateSlider;
