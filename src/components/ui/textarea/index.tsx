import { css } from '@emotion/react';

const textAreaStyle = css`
  width: 100%;
  background-color: #fff;
  outline: none;
  resize: none;
`;

const TextArea = ({
  className,
  rows = 3,
  placeholder,
  value,
  onChange,
}: {
  className?: string;
  rows?: number;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <textarea
      className={className}
      css={textAreaStyle}
      placeholder={placeholder}
      rows={rows}
      value={value}
      onChange={({ target }) => onChange(target.value)}
    />
  );
};

export default TextArea;
