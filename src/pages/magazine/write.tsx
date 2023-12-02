import { css } from '@emotion/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { IoIosAdd, IoIosClose } from 'react-icons/io';
import Button from '@/components/ui/button';
import TextArea from '@/components/ui/textarea';

const pageWrapperStyle = css`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const sectionWrapStyle = css`
  padding: 20px 0;

  .content-area {
    border-radius: 10px;
    border: 1px solid #efefef;
    padding: 20px 16px;
  }

  &:not(:last-of-type) {
    border-bottom: 1px solid #efefef;
  }
`;

const sectionTitleWrapStyle = css`
  display: flex;
  margin-bottom: 12px;

  .title {
    font-size: 14px;
  }
`;

const changeButtonStyle = css`
  color: #548ef5;
  background-color: transparent;
  padding: 0;
  margin-left: auto;
  font-family: Gmarket Sans;
  font-size: 14px;
  border-width: 0;
`;

const uploadButtonStyle = css`
  width: 100%;
  padding: 12px 0;
  background-color: #387bf4;
  color: #fff;
  border-radius: 0;
  font-family: Gmarket Sans;
  font-weight: 700;
  font-size: 15px;

  &:hover {
    filter: brightness(0.95);
  }
`;

const itemInfoWrapStyle = css`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .image {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 8px;
    overflow: hidden;

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      content: '';
      background-color: rgba(0, 0, 0, 0.04);
    }
  }

  .info-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;

    .item {
      &-name {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        max-height: 54px;
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
          line-height: 22px;
          vertical-align: bottom;
        }
      }

      &-option {
        font-size: 12px;
        line-height: 16px;
        color: #757575;
        font-weight: normal;
        vertical-align: top;
      }
    }
  }
`;

const imageSliderWrapStyle = css`
  display: flex;
  gap: 12px;

  .image-wrap {
    position: relative;
    width: 120px;
    height: 120px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    .add-icon {
      width: 24px;
      height: 24px;
    }

    &:not(:has(img)) {
      border-radius: 10px;
      border: 1px dashed #ddd;
    }

    .delete-button {
      position: absolute;
      top: -8px;
      right: -8px;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      background-color: #fff;
    }

    > img {
      width: inherit;
      height: inherit;
      border-radius: 10px;
    }

    > input {
      display: none;
    }
  }
`;

const chipSliderWrapStyle = css`
  width: 100%;
  overflow: auto;
  display: flex;
  gap: 8px;
  white-space: nowrap;

  .chip {
    background-color: #c4f1f9;
    color: #086f83;
    line-height: 1.2;
    border-radius: 8px;
    padding: 6px 12px;
    font-family: Gmarket Sans;
    cursor: pointer;
  }
`;

const MagazineWrite = () => {
  const [selectedItemData, setSelectedItemData] = useState<{
    imageUrl: string;
    itemName: string;
    itemPrice: number;
    options?: string[];
  } | null>(null);
  const [folders, setFolders] = useState(['']);
  const [data, setData] = useState({
    images: [
      'https://cdn.hankooki.com/news/photo/202311/118934_162711_1700520953.jpg',
    ],
    content: '',
  });
  const { images, content } = data;
  const { imageUrl, itemName, itemPrice, options } = selectedItemData || {};

  const handleChangeData = (key: string, value: string | unknown[]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleDeleteImage = (index: number) => {
    const filteredImages = images.filter((_, i) => i !== index);
    handleChangeData('images', filteredImages);
  };

  const handleUploadImage = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0];
    if (!file) return;

    // TODO: 이미지 업로드 API 호출
    console.log(file);
  };

  const handleClickChangeItem = () => {
    // TODO: API 연동, 팝업 표출
  };

  const handleWrite = () => {
    // TODO: API 연동
  };

  useEffect(() => {
    // TODO: API 호출
    setFolders(['리빙박스', '겨울옷 리뷰', '맛도리 리뷰', '여름 옷']);
    setSelectedItemData({
      imageUrl:
        'http://gdimg.gmarket.co.kr/2634329458/still/400?ver=1696386024',
      itemName:
        '남자 빅사이즈 오리지널 M1965 밀리터리 피쉬테일 롱 오버핏 개파카 미군 야상 다운라이크 패딩 점퍼',
      itemPrice: 94800,
      options: ['L(100)'],
    });
  }, []);

  return (
    <div css={pageWrapperStyle}>
      <div css={sectionWrapStyle}>
        <div css={sectionTitleWrapStyle}>
          <h4 className="title">업로드할 상품 선택</h4>
          <Button css={changeButtonStyle} onClick={handleClickChangeItem}>
            변경
          </Button>
        </div>
        <div css={itemInfoWrapStyle}>
          <div className="image">
            {imageUrl && <img src={imageUrl} alt="상품 이미지" />}
          </div>
          <div className="info-box">
            {selectedItemData ? (
              <>
                <p className="item-name">{itemName}</p>
                <p className="item-price">
                  {itemPrice?.toLocaleString()}
                  <span className="item-price-unit">원</span>
                </p>
                <p className="item-option">선택 옵션 : {options?.join(', ')}</p>
              </>
            ) : (
              <>상품을 선택해 주세요</>
            )}
          </div>
        </div>
      </div>

      <div css={sectionWrapStyle}>
        <div css={sectionTitleWrapStyle}>
          <h4 className="title">이미지 업로드</h4>
        </div>
        <div css={imageSliderWrapStyle}>
          {images.map((url, i) => (
            <div className="image-wrap" key={url}>
              <IoIosClose
                className="delete-button"
                onClick={() => handleDeleteImage(i)}
              />
              <img src={url} alt={`${i + 1}번째 이미지`} />
            </div>
          ))}
          <label className="image-wrap">
            <IoIosAdd className="add-icon" />
            <input type="file" accept="image/*" onChange={handleUploadImage} />
          </label>
        </div>
      </div>

      <div css={sectionWrapStyle}>
        <div css={sectionTitleWrapStyle}>
          <h4 className="title">본문 작성하기</h4>
        </div>
        <TextArea
          rows={4}
          className="content-area"
          placeholder="구매하신 상품에 대한 내용만 작성 가능하며, 윤리적, 법적, G마켓 내부 규정에 어긋나는 내용을 작성하실 경우 안내 없이 삭제될 수있습니다. (최소 10자)"
          value={content}
          onChange={(value) => handleChangeData('content', value)}
        />
      </div>

      <div css={sectionWrapStyle}>
        <div css={sectionTitleWrapStyle}>
          <h4 className="title">업로드할 폴더 선택</h4>
        </div>
        <div css={chipSliderWrapStyle}>
          {folders.map((text) => (
            <span key={text} className="chip">
              {text}
            </span>
          ))}
        </div>
      </div>

      <Button css={uploadButtonStyle} onClick={handleWrite}>
        업로드
      </Button>
    </div>
  );
};

export default MagazineWrite;
