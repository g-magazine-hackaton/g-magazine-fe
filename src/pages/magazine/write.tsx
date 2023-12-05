import { css } from '@emotion/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { IoIosAdd, IoIosClose } from 'react-icons/io';
import { useSetAtom } from 'jotai';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import Button from '@/components/ui/button';
import TextArea from '@/components/ui/textarea';
import { titleAtom } from '@/store/page-info';
import SelectPopup from '@/components/ui/mazagine/SelectPopup';
import { formatNumber } from '@/lib/utils';
import { GoodsInfo, getFolders, postMagazine } from '@/apis/magazine';
import { uploadImage } from '@/apis/image';
import Image from '@/components/ui/image';

const pageWrapperStyle = css`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
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
  align-items: center;
  justify-content: space-between;

  .title {
    font-size: 14px;
    font-weight: 700;
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
  margin: 20px 0;

  &:hover {
    filter: brightness(0.95);
  }

  &:disabled {
    background-color: #dedede;
    color: #fff;
    border: none;
    filter: none;
    cursor: default;
  }
`;

export const itemInfoWrapStyle = css`
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
        word-break: break-all;
      }

      &-price {
        display: inline-block;
        font-size: 16px;
        font-family: 'Gmarket Sans';
        line-height: 22px;
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
      z-index: 1;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
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

    &.active {
      background-color: #319795;
      color: #fff;
    }
  }
`;

const MagazineWrite = () => {
  const setTitle = useSetAtom(titleAtom);
  const navigate = useNavigate();
  const [selectedItemData, setSelectedItemData] = useState<GoodsInfo | null>(
    null,
  );
  const [showPopup, setShowPopup] = useState(true);
  const [folders, setFolders] = useState<
    { folderId: string; folderName: string }[]
  >([]);
  const [data, setData] = useState({
    images: [],
    content: '',
    folder: '',
  });
  const { images, content, folder } = data;
  const {
    goodsPhotoUrl,
    goodsName,
    goodsPrice = 0,
    goodsSelectedOption,
  } = selectedItemData || {};
  const isWriteAvailable =
    images.length > 0 && content && folder && selectedItemData;

  const handleChangeData = (key: string, value: string | unknown[]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleDeleteImage = (index: number) => {
    const filteredImages = images.filter((_, i) => i !== index);
    handleChangeData('images', filteredImages);
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleUploadImage = async ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = target.files?.[0];
    if (!uploadedFile) return;

    const {
      success,
      files: [file],
      message,
    } = await uploadImage(uploadedFile);
    if (!success) {
      alert(message);
      return;
    }

    handleChangeData('images', [...images, file.replace('uploads', '')]);
    target.value = '';
  };

  const handleClickChip = (folder: string) => {
    handleChangeData('folder', folder);
  };

  const handleWrite = async () => {
    const { success, message } = await postMagazine({
      folder,
      content,
      goodsId: selectedItemData?.id,
      images,
    });

    if (!success) {
      alert(message);
      return;
    }
    navigate('../my-page');
  };

  const handleSelect = (goodsInfo: GoodsInfo) => {
    setSelectedItemData(goodsInfo);
  };

  useEffect(() => {
    setTitle('매거진 업로드');

    const fetchGetFolders = async () => {
      const {
        data: { folders },
      } = await getFolders();
      setFolders(folders);
    };
    fetchGetFolders();
  }, [setTitle]);

  return (
    <>
      <div css={pageWrapperStyle}>
        <div css={sectionWrapStyle}>
          <div css={sectionTitleWrapStyle}>
            <h4 className="title">업로드할 상품 선택</h4>
            <Button css={changeButtonStyle} onClick={handleOpenPopup}>
              변경
            </Button>
          </div>
          <div css={itemInfoWrapStyle}>
            <div className="image">
              {goodsPhotoUrl && (
                <Image src={goodsPhotoUrl} alt="상품 이미지" isLazy />
              )}
            </div>
            <div className="info-box">
              {selectedItemData ? (
                <>
                  <p className="item-name">{goodsName}</p>
                  <p className="item-price">
                    {formatNumber(goodsPrice)}
                    <span className="item-price-unit">원</span>
                    {goodsSelectedOption && (
                      <p className="item-option">
                        선택 옵션 : {goodsSelectedOption}
                      </p>
                    )}
                  </p>
                </>
              ) : (
                <p style={{ textAlign: 'center' }}>상품을 선택해 주세요</p>
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
                <Image src={url} alt={`${i + 1}번째 이미지`} isLazy />
              </div>
            ))}
            <label className="image-wrap">
              <IoIosAdd className="add-icon" />
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadImage}
              />
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
            placeholder="구매하신 상품에 대한 내용만 작성 가능하며, 윤리적, 법적, G마켓 내부 규정에 어긋나는 내용을 작성하실 경우 안내 없이 삭제될 수 있습니다. (최소 10자)"
            value={content}
            onChange={(value) => handleChangeData('content', value)}
          />
        </div>

        <div css={sectionWrapStyle}>
          <div css={sectionTitleWrapStyle}>
            <h4 className="title">업로드할 폴더 선택</h4>
            <FaPlus />
          </div>
          <div css={chipSliderWrapStyle}>
            {folders?.map(({ folderId, folderName }) => (
              <button
                key={folderId}
                className={classNames('chip', {
                  active: folder === folderName,
                })}
                onClick={() => handleClickChip(folderName)}
              >
                {folderName}
              </button>
            ))}
          </div>
        </div>

        <Button
          css={uploadButtonStyle}
          disabled={!isWriteAvailable}
          onClick={handleWrite}
        >
          업로드
        </Button>
      </div>
      {showPopup && (
        <SelectPopup
          onSelect={handleSelect}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default MagazineWrite;
