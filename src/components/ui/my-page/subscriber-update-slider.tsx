import { css } from '@emotion/react';
import { Fragment } from 'react';
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
    box-sizing: border-box;
  }

  .keen-slider__slide {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border: 1px solid #eee;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    overflow: hidden;
    position: relative;

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
      display: flex;
      align-items: center;

      > img {
        height: 16px;
        width: 16px;
      }

      > span {
        width: 92px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 13px;
        color: #555;
      }
    }
  }
`;

interface SlideProps {
  imageSrc: string;
  label: string;
  userIcon: string;
  userName: string;
}

const Slide = ({ imageSrc, label, userIcon, userName }: SlideProps) => (
  <div className="keen-slider__slide">
    <img src={imageSrc} alt="슬라이드 이미지" />
    <span className={label === 'Rank' ? 'rank' : ''}>{label}</span>
    <div className="user">
      <img src={userIcon} alt="유저 아이콘" />
      &nbsp;
      <span>{userName}</span>
    </div>
  </div>
);

const SubscriberUpdateSlider = () => {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3.7,
      spacing: 10,
    },
  });

  return (
    <div css={sliderStyle} ref={sliderRef} className="keen-slider">
      {MyPageFollower.map((slide) => {
        return (
          <Fragment key={slide.userName}>
            <Link to={slide.link}>
              <Slide {...slide} />
            </Link>
          </Fragment>
        );
      })}
    </div>
  );
};

export default SubscriberUpdateSlider;
