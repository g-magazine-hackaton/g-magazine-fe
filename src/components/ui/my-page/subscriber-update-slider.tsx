import { css } from '@emotion/react';
import { FC, Fragment, useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { MySubScriberUpdate } from '@/store/my-subscriber-update';
import { fetch } from '@/apis/api';
import { ROOT_PATH } from '@/temp/global-variables';
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

const imageStyle = css`
  width: 100%;
  border-radius: 0;
  height: 90px;
`;

interface SlideProps {
  profileUrl: string;
  label: string;
  consumerNickname: string;
}

const Slide: FC<SlideProps> = ({
  profileUrl,
  label = 'new',
  consumerNickname,
}) => (
  <div className="keen-slider__slide">
    <Image src={profileUrl} alt="슬라이드 이미지" css={imageStyle} />
    <div className="user">
      <span>{consumerNickname}</span>
    </div>
  </div>
);

const SubscriberUpdateSlider: FC = () => {
  const [updatMagazine, setUpdateMagazine] = useAtom(MySubScriberUpdate);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 4,
      spacing: 10,
    },
  });

  const fetchGetMyMagazine = async () => {
    try {
      const {
        data: { data, success, message },
      } = await fetch.get(
        `/api/api/consumer/followings/recent-update?consumerId=${
          localStorage.getItem('id') || 'consumer1'
        }`,
      );
      if (success) {
        setUpdateMagazine(data.consumer);
        setIsDataLoaded(true);
      } else {
        console.log(message);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  useEffect(() => {
    fetchGetMyMagazine();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div css={sliderStyle} style={{ padding: '10px 0' }}>
      {isDataLoaded && (
        <div ref={sliderRef} className="keen-slider">
          {updatMagazine.map((slide) => (
            <Fragment key={slide.consumerNickname}>
              <Link to={`${ROOT_PATH}/my-page/${slide.consumerId}`}>
                <Slide {...slide} />
              </Link>
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubscriberUpdateSlider;
