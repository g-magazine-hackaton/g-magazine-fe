import { Swiper, SwiperSlide } from 'swiper/react';
import { css } from '@emotion/react';
import { ReactNode, useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack, IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import { LiaCommentDots } from 'react-icons/lia';
import { GoShareAndroid } from 'react-icons/go';
import { Pagination } from 'swiper/modules';
import { titleAtom } from '@/store/page-info';

import 'swiper/css';
import 'swiper/css/pagination';
import { getMagazineDetail, postLike } from '@/apis/magazine';
import Image from '@/components/ui/image';
import { formatNumber } from '@/lib/utils';

const imageSliderWrapStyle = css`
  position: relative;

  .image {
    width: 100vw;
    height: 100vw;
    border-radius: 0;
  }

  .prev-icon {
    position: absolute;
    top: 10px;
    left: 10px;
    cursor: pointer;
    width: 32px;
    height: 32px;
  }

  .swiper-pagination-bullet-active {
    background-color: #fff;
  }
`;

const productInfoStyle = css`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 8px;
  border-bottom: 1px solid #ddd;

  .image {
    width: 80px;
    height: 80px;
  }

  .info-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;

    .item {
      &-name {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        max-height: 36px;
        font-size: 14px;
        line-height: 18px;
        height: auto;
      }

      &-price {
        display: inline-block;
        font-size: 16px;
        font-family: 'Gmarket Sans';
        line-height: 22px;
        color: #000;
        font-weight: 700;

        &-unit {
          display: inline-block;
          font-size: 14px;
          line-height: 20px;
          vertical-align: bottom;
        }
      }
    }
  }
`;

const contentWrapStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 8px;

  .button-box {
    display: flex;
    gap: 12px;

    > svg {
      width: 28px;
      height: 28px;
    }

    .share-icon {
      margin-left: auto;
    }
  }

  .comment-box {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 4px;

    .comment {
      display: flex;
      align-items: center;
      gap: 8px;

      &-user {
        font-family: Gmarket Sans;
        font-weight: 500;
      }
    }
  }

  .like-text {
    font-family: Gmarket Sans;
  }

  .content {
    min-height: 80px;
    white-space: pre;
  }

  .comment-text {
    color: #8e8e8e;
  }
`;
const commentWrapStyle = css`
  display: flex;
  gap: 8px;
  padding: 8px;

  .profile-image {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  .comment-input {
    background-color: #fff;
    outline: none;
    width: 100%;
  }
`;

const MagazineDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const setTitle = useSetAtom(titleAtom);

  const [data, setData] = useState<{
    magazine: {
      likedCnt?: number;
      magazineContent?: string | ReactNode;
      photoUrls?: string[];
    };
    goods: {
      goodsPageUrl: string;
      goodsPhotoUrl: string;
      goodsName: string;
      goodsPrice: number;
    }[];
    isLike: boolean;
  }>({
    magazine: {},
    goods: [],
    isLike: false,
  });

  const { magazine, goods, isLike } = data;
  const { likedCnt = 0, magazineContent, photoUrls = [] } = magazine || {};
  const { goodsPageUrl, goodsPhotoUrl, goodsPrice, goodsName } = goods[0] || {};
  const LinkIcon = isLike ? IoMdHeart : IoMdHeartEmpty;

  const handleToggleLike = async () => {
    const toggledLike = !isLike;
    const { success } = await postLike({ id, isLike: toggledLike });
    if (!success) return;
    setData((prev) => ({
      ...prev,
      isLike: toggledLike,
      magazine: { ...magazine, likedCnt: likedCnt + (toggledLike ? 1 : -1) },
    }));
  };

  const handlePrev = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!id) return;
    const fetchGetMagazineDetail = async () => {
      const { success, message, data } = await getMagazineDetail(id);
      if (!success) {
        alert(message);
        return;
      }
      setData(data);
    };
    fetchGetMagazineDetail();
  }, [id]);

  useEffect(() => {
    setTitle('매거진 상세');
  }, [setTitle]);

  return (
    <div>
      <div css={imageSliderWrapStyle}>
        <IoIosArrowBack
          className="prev-icon"
          fill="#fff"
          onClick={handlePrev}
        />
        <Swiper pagination modules={[Pagination]}>
          {photoUrls.map((imageUrl, i) => (
            <SwiperSlide key={imageUrl}>
              <Image
                src={imageUrl}
                alt={`${i + 1}번째 이미지`}
                className="image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Link to={goodsPageUrl}>
        <div css={productInfoStyle}>
          <div className="image">
            {goodsPhotoUrl && (
              <Image src={goodsPhotoUrl.split(',')[0]} alt="상품 이미지" />
            )}
          </div>
          <div className="info-box">
            <p className="item-price">
              {formatNumber(goodsPrice)}
              <span className="item-price-unit">원</span>
            </p>
            <p className="item-name">{goodsName}</p>
          </div>
        </div>
      </Link>
      <div css={contentWrapStyle}>
        <div className="button-box">
          <LinkIcon onClick={handleToggleLike} />
          <LiaCommentDots />
          <GoShareAndroid className="share-icon" />
        </div>
        <p className="like-text">
          좋아요 <strong>{likedCnt}</strong>개
        </p>
        <p className="content">{magazineContent}</p>
        <div className="comment-box">
          <div className="comment">
            <span className="comment-user">지후니</span>
            <span className="comment-content">귀여워요 ^^</span>
          </div>
        </div>
        <p className="comment-text">댓글 13개 모두 보기</p>
      </div>
      <div css={commentWrapStyle}>
        <Image
          src="https://cdn.hankooki.com/news/photo/202311/118934_162711_1700520953.jpg"
          className="profile-image"
          isLazy
        />
        <input className="comment-input" placeholder="댓글 남기기.." />
      </div>
    </div>
  );
};

export default MagazineDetail;
