import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import Portal from '../portal';
import { getGoods } from '@/apis/magazine';
import { formatNumber } from '@/lib/utils';
import { itemInfoWrapStyle } from '@/pages/magazine/write';
import { IMAGE_URL } from '@/apis/urls';

const popupStyle = css`
  backdrop-filter: brightness(0.7);
  position: fixed;
  align-items: center;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  overflow: hidden;
  display: flex;
`;

const popupInnerStyle = css`
  background-color: rgba(16 18 27 / 60%);
  max-width: 840px;
  width: 90%;
  max-height: 600px;
  border-radius: 1rem;
  margin: auto;
  color: #fff;
  font-family: Gmarket Sans;
  padding: 20px;

  .popup {
    &-header {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }

    &-body {
      height: 530px;
      overflow: auto;

      .select-button {
        background-color: #387bf4;
        border-radius: 8px;
        margin: auto 0;
        padding: 4px 8px;

        &:hover {
          filter: brightness(0.9);
        }
      }
    }
  }
`;

const itemInfoListStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 10px;
`;

const SelectPopup = ({ onSelect }) => {
  const [goods, setGoods] = useState<
    {
      id: string;
      goodsName: string;
      goodsPhotoUrl: string;
      goodsPrice: number;
    }[]
  >([]);

  useEffect(() => {
    const fetchGetGoods = async () => {
      const {
        data: { goods },
      } = await getGoods();
      setGoods(goods);
    };
    fetchGetGoods();
  }, []);

  return (
    <Portal>
      <div css={popupStyle}>
        <div css={popupInnerStyle}>
          <div className="popup-header">매거진 상품 선택</div>
          <div className="popup-body">
            <ul css={itemInfoListStyle}>
              {goods.map(({ id, goodsName, goodsPhotoUrl, goodsPrice }) => (
                <li key={id} css={itemInfoWrapStyle}>
                  <div className="image">
                    {goodsPhotoUrl && (
                      <img
                        src={IMAGE_URL + goodsPhotoUrl.split(',')[0]}
                        alt="상품 이미지"
                      />
                    )}
                  </div>
                  <div className="info-box">
                    <p className="item-name">{goodsName}</p>
                    <p className="item-price">
                      {formatNumber(goodsPrice)}
                      <span className="item-price-unit">원</span>
                    </p>
                  </div>
                  <button
                    className="select-button"
                    onClick={() =>
                      onSelect({ id, goodsName, goodsPhotoUrl, goodsPrice })
                    }
                  >
                    선택
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default SelectPopup;
