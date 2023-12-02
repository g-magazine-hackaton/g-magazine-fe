import { css } from '@emotion/react';
import { ChangeEvent } from 'react';

const textAreaStyle = css`
  width: 100%;
  background-color: #fff;
  outline: none;
`;

const TextArea = ({
  className,
  rows = 3,
  value,
  onChange,
}: {
  className?: string;
  rows?: number;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <textarea
      className={className}
      css={textAreaStyle}
      rows={rows}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextArea;
