import { SerializedStyles, css } from '@emotion/react';
import classNames from 'classnames';
import { CSSProperties } from 'react';
import { IMAGE_URL } from '@/apis/urls';

const imageWrapStyle = css`
  position: relative;
  width: 120px;
  height: 120px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;

  > img {
    width: inherit;
    height: inherit;
    position: absolute;
  }

  &:not(:has(img)) {
    border-radius: 10px;
    border: 1px dashed #ddd;
    min-width: 120px;
  }

  &::after {
    background: rgba(0, 0, 0, 0.04);
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    content: '';
  }
`;

const Image = ({
  src,
  alt = '',
  isLazy = false,
  css,
  height,
  style,
  className = '',
}: {
  height?: string;
  src: string;
  alt?: string;
  isLazy?: boolean;
  css?: SerializedStyles;
  className?: string;
  style?: CSSProperties;
}) => (
  <div
    css={{ ...imageWrapStyle, ...css }}
    className={classNames('image', className)}
    style={style}
  >
    <img
      src={src?.includes('//') ? src : IMAGE_URL + src}
      alt={alt}
      {...(isLazy && {
        loading: 'lazy',
        decoding: 'async',
      })}
      onError={(e) => {
        (e.target as HTMLImageElement).src =
          'https://pics.gmarket.co.kr/pc/single/kr/snowwhite/common/no_image_itemcard_300x300.png';
      }}
      style={{
        height,
      }}
    />
  </div>
);

export default Image;
