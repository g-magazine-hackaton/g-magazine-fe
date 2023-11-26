/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
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
      height: 90px;
    }

    > span {
      position: absolute;
      top: 4px;
      left: 4px;
      height: 12px;
      line-height: 12px;
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
      padding: 0px 2px;

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
      <Slide
        imageSrc="https://img.seoul.co.kr/img/upload/2020/09/17/SSI_20200917184229_O2.jpg"
        label="New"
        userIcon="user.png"
        userName="메종 판매자 추천: 황상한"
      />
      <Slide
        imageSrc="https://newsimg.sedaily.com/2023/04/18/29OCNX4F36_1.jpg?ver=2019"
        label="Rank"
        userIcon="user.png"
        userName="신세계 의정부점"
      />
      <Slide
        imageSrc="https://image.newsis.com/2023/06/07/NISI20230607_0001283566_web.jpg"
        label="New"
        userIcon="user.png"
        userName="빈폴 공식몰"
      />
      <Slide
        imageSrc="https://cdn.iconsumer.or.kr/news/photo/201709/4011_3251_3249.png"
        label="New"
        userIcon="user.png"
        userName="[최저가] 피코크 전문판매"
      />
      <Slide
        imageSrc="https://blog.kakaocdn.net/dn/bjvu0t/btrDPi80LlJ/FjZRVLqU8ezbh3vjcitXTk/img.png"
        label="Rank"
        userIcon="user.png"
        userName="DIOR"
      />
      <Slide
        imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgeyed1U9PqLmedlJ68mH33lDyobbQkeFqVNYbpB6Zx_QjShXVun6qEsoIZm8XLcj-x1U&usqp=CAU"
        label="New"
        userIcon="user.png"
        userName="쿠폰 무제한, 로보락"
      />
    </div>
  );
};

export default SubscriberUpdateSlider;
