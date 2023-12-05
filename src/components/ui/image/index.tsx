import { css } from '@emotion/react';
import { IMAGE_URL } from '@/apis/urls';

const imageWrapStyle = css``;

const Image = ({ src, alt = '', isLazy = false }) => {
  return (
    <div css={imageWrapStyle} className="image">
      <img
        src={IMAGE_URL + src}
        alt={alt}
        {...(isLazy && {
          loading: 'lazy',
          decoding: 'async',
        })}
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            'https://pics.gmarket.co.kr/pc/single/kr/snowwhite/common/no_image_itemcard_300x300.png';
        }}
      />
    </div>
  );
};

export default Image;
